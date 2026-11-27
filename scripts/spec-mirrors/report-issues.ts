/**
 * Keeps one GitHub issue per spec mirror whose nightly "Update Specs" run
 * fails (spec-mirrors.yml).
 *
 *   GH_TOKEN=... GH_REPO=alchemy-run/distilled node scripts/spec-mirrors/report-issues.ts [--dry-run]
 *
 * It reads the newest finished `update-specs.yml` run of every
 * `distilled-mirror/spec-mirror-*` repository. A mirror fails when that run
 * failed, or when the workflow is disabled or has not finished a run in
 * STALE_HOURS (GitHub turns off a schedule after 60 days without a commit,
 * and a mirror whose upstream does not change makes no commits).
 *
 * - A failing mirror with no issue gets a new one.
 * - A failing mirror with an open issue updates its body (the last failed
 *   run). It comments only when the reason changed, so three weeks of the
 *   same failure is one issue and no new comments.
 * - A failing mirror whose issue is closed reopens it with a comment.
 * - A passing mirror closes its open issue with a comment.
 *
 * A mirror without the workflow (a blocked mirror, see SpecRepos.ts) is
 * skipped. With --dry-run it prints what it would do and writes nothing.
 */

const ORG = "distilled-mirror";
const WORKFLOW = "update-specs.yml";
const TITLE_PREFIX = "Nightly spec fetch failed: ";
const STALE_HOURS = 48;
const CONCURRENCY = 8;

const env = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
};
const token = env("GH_TOKEN");
const repo = env("GH_REPO");
const dryRun = process.argv.includes("--dry-run");
const today = new Date().toISOString().slice(0, 10);

class NotFound extends Error {}

const api = async <T>(path: string, init?: { method: string; body: unknown }): Promise<T> => {
  const response = await fetch(`https://api.github.com/${path}`, {
    method: init?.method ?? "GET",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "x-github-api-version": "2022-11-28",
      ...(init ? { "content-type": "application/json" } : {}),
    },
    body: init ? JSON.stringify(init.body) : undefined,
  });
  if (response.status === 404) throw new NotFound(path);
  if (!response.ok) {
    throw new Error(
      `${init?.method ?? "GET"} ${path}: ${response.status} ${await response.text()}`,
    );
  }
  return (await response.json()) as T;
};

/** Every page of a list endpoint; `pick` takes the items out of one page. */
const paginate = async <T, P>(path: string, pick: (page: P) => T[]): Promise<T[]> => {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const sep = path.includes("?") ? "&" : "?";
    const batch = pick(await api<P>(`${path}${sep}per_page=100&page=${page}`));
    items.push(...batch);
    if (batch.length < 100) return items;
  }
};

/** Runs `fn` on every item, at most CONCURRENCY at a time, in order. */
const pool = async <T, R>(items: T[], fn: (item: T) => Promise<R>): Promise<R[]> => {
  const results: R[] = [];
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]!);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return results;
};

interface Run {
  id: number;
  conclusion: string | null;
  event: string;
  html_url: string;
  created_at: string;
  head_sha: string;
}
interface Job {
  name: string;
  conclusion: string | null;
  html_url: string;
  steps?: Array<{ name: string; conclusion: string | null }>;
}

type Status =
  | { mirror: string; state: "skip" }
  | { mirror: string; state: "pass"; run: Run }
  | {
      mirror: string;
      state: "fail";
      /** What failed, stable across nights with the same failure. */
      reason: string;
      lines: string[];
      run?: Run;
    };

const check = async (mirror: string): Promise<Status> => {
  const base = `repos/${ORG}/${mirror}/actions/workflows/${WORKFLOW}`;
  let workflow: { state: string; html_url: string };
  try {
    workflow = await api(base);
  } catch (error) {
    if (error instanceof NotFound) return { mirror, state: "skip" };
    throw error;
  }
  const { workflow_runs } = await api<{ workflow_runs: Run[] }>(
    `${base}/runs?status=completed&per_page=10`,
  );
  // A cancelled or skipped run says nothing about the fetch.
  const run = workflow_runs.find((r) => r.conclusion !== "cancelled" && r.conclusion !== "skipped");

  if (workflow.state !== "active") {
    return {
      mirror,
      state: "fail",
      reason: `workflow ${workflow.state}`,
      lines: [
        `The [${WORKFLOW}](${workflow.html_url}) workflow is \`${workflow.state}\`, so no nightly fetch runs.`,
        "Enable it in the mirror's Actions tab.",
      ],
      run,
    };
  }
  const hours = run ? (Date.now() - Date.parse(run.created_at)) / 3_600_000 : Infinity;
  if (hours > STALE_HOURS) {
    return {
      mirror,
      state: "fail",
      reason: "no recent run",
      lines: [
        run
          ? `The newest finished run started ${run.created_at}, more than ${STALE_HOURS} hours ago: ${run.html_url}`
          : `The [${WORKFLOW}](${workflow.html_url}) workflow has no finished run.`,
      ],
      run,
    };
  }
  if (run!.conclusion === "success") return { mirror, state: "pass", run: run! };

  const { jobs } = await api<{ jobs: Job[] }>(
    `repos/${ORG}/${mirror}/actions/runs/${run!.id}/jobs`,
  );
  const failed = jobs.filter((job) => job.conclusion !== "success" && job.conclusion !== "skipped");
  const steps = failed.flatMap((job) =>
    (job.steps ?? [])
      .filter((step) => step.conclusion === "failure")
      .map((step) => ({ job, step: step.name })),
  );
  return {
    mirror,
    state: "fail",
    reason: steps.length
      ? steps.map((s) => s.step).join(" | ")
      : `run ${run!.conclusion ?? "failed"}`,
    lines: steps.length
      ? ["Failed steps:", ...steps.map((s) => `- [${s.step}](${s.job.html_url})`)]
      : [`The run ended with \`${run!.conclusion}\`: ${run!.html_url}`],
    run,
  };
};

interface Issue {
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
}

const marker = (name: string, body: string | null) =>
  new RegExp(`<!-- ${name}: (.*?) -->`).exec(body ?? "")?.[1];

const write = async (description: string, path: string, method: string, body: unknown) => {
  console.log(`${dryRun ? "[dry run] " : ""}${description}`);
  if (dryRun) console.log(`  ${method} ${path}\n  ${JSON.stringify(body)}`);
  else await api(path, { method, body });
};

const mirrors = (
  await paginate<{ name: string; archived: boolean }, Array<{ name: string; archived: boolean }>>(
    `orgs/${ORG}/repos?type=public`,
    (page) => page,
  )
)
  .filter((r) => r.name.startsWith("spec-mirror-") && !r.archived)
  .map((r) => r.name)
  .sort();

const statuses = await pool(mirrors, check);

// The search index can lag a few minutes, which only matters if two runs
// start back to back.
const issues = await paginate<Issue, { items: Issue[] }>(
  `search/issues?q=${encodeURIComponent(`repo:${repo} is:issue in:title "${TITLE_PREFIX.trim()}"`)}`,
  (page) => page.items,
);
const issueFor = (mirror: string) =>
  issues
    .filter(
      (i) => i.title === `${TITLE_PREFIX}${mirror}` || marker("spec-mirror", i.body) === mirror,
    )
    .sort(
      (a, b) => Number(b.state === "open") - Number(a.state === "open") || b.number - a.number,
    )[0];

let failing = 0;
for (const status of statuses) {
  if (status.state === "skip") continue;
  const issue = issueFor(status.mirror);
  const open = issue?.state === "open" ? issue : undefined;

  if (status.state === "pass") {
    if (!open) continue;
    await write(
      `${status.mirror}: passes, closing #${open.number}`,
      `repos/${repo}/issues/${open.number}/comments`,
      "POST",
      { body: `Passed on ${today}: ${status.run.html_url}` },
    );
    await write(
      `${status.mirror}: close #${open.number}`,
      `repos/${repo}/issues/${open.number}`,
      "PATCH",
      {
        state: "closed",
        state_reason: "completed",
      },
    );
    continue;
  }

  failing++;
  const runLink = status.run
    ? `${status.run.created_at.slice(0, 10)}: ${status.run.html_url}`
    : `${today}: no run`;
  const first = (open && marker("spec-mirror-first", open.body)) ?? runLink;
  const body = [
    `The nightly spec fetch of [${ORG}/${status.mirror}](https://github.com/${ORG}/${status.mirror}) fails, so the mirror stops getting spec updates.`,
    "",
    ...status.lines,
    "",
    `First reported: ${first}`,
    `Last failed: ${runLink}`,
    "",
    "The mirror's fetch script lives in `stacks/distilled-submodules/spec-repos/<package>/fetch-specs.ts`. A deploy of the `distilled-submodules` stack copies it to the mirror's `.meta/fetch-specs.ts`.",
    "",
    "`.github/workflows/spec-mirrors.yml` keeps this one issue: it comments only when the reason changes, and closes the issue when the mirror's nightly run passes.",
    `<!-- spec-mirror: ${status.mirror} -->`,
    `<!-- spec-mirror-reason: ${status.reason} -->`,
    `<!-- spec-mirror-first: ${first} -->`,
  ].join("\n");
  const comment = (headline: string) => [`${headline}: ${runLink}`, "", status.reason].join("\n");

  if (!issue) {
    await write(
      `${status.mirror}: open an issue (${status.reason})`,
      `repos/${repo}/issues`,
      "POST",
      {
        title: `${TITLE_PREFIX}${status.mirror}`,
        body,
      },
    );
  } else if (!open) {
    await write(
      `${status.mirror}: reopen #${issue.number} (${status.reason})`,
      `repos/${repo}/issues/${issue.number}`,
      "PATCH",
      { state: "open", body },
    );
    await write(
      `${status.mirror}: comment on #${issue.number}`,
      `repos/${repo}/issues/${issue.number}/comments`,
      "POST",
      { body: comment("Failing again") },
    );
  } else {
    await write(
      `${status.mirror}: update #${open.number} (${status.reason})`,
      `repos/${repo}/issues/${open.number}`,
      "PATCH",
      { body },
    );
    if (marker("spec-mirror-reason", open.body) !== status.reason) {
      await write(
        `${status.mirror}: comment on #${open.number}, the reason changed`,
        `repos/${repo}/issues/${open.number}/comments`,
        "POST",
        { body: comment("The failure changed") },
      );
    }
  }
}

const checked = statuses.filter((s) => s.state !== "skip").length;
console.log(`${checked} mirrors checked, ${failing} failing, ${statuses.length - checked} skipped`);
