/**
 * Managed by alchemy-run/distilled — stacks/distilled-submodules/scaffold/report-issues.ts.
 * Edit it there; a deploy of the `distilled-submodules` stack overwrites this file.
 *
 * The last steps of update-specs.yml run it to keep this mirror's issues in
 * alchemy-run/distilled:
 *
 *   node report-issues.ts failed    the run failed: open, comment on or reopen
 *                                   "Nightly spec fetch failed: <mirror>"
 *   node report-issues.ts passed    the run passed: close that issue if open
 *   node report-issues.ts updated   the run pushed new specs: open
 *                                   "Spec updated: <mirror>", or comment on
 *                                   the open one
 *
 * Environment:
 *   ISSUES_TOKEN        installation token of the spec-mirror GitHub App
 *                       (Issues: write on alchemy-run/distilled only)
 *   RUN_TOKEN           this run's GITHUB_TOKEN, to read its own jobs
 *   ISSUES_REPO         where the issues live (alchemy-run/distilled)
 *   COMMIT              `updated` only: the commit the run pushed
 *   GITHUB_*            set by Actions
 *
 * The titles and the `<!-- spec-mirror: ... -->` marker match the issues the
 * old central check (spec-mirrors.yml) opened, so its issues keep working.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const env = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

const mode = process.argv[2];
if (mode !== "failed" && mode !== "passed" && mode !== "updated") {
  throw new Error(`usage: node report-issues.ts failed|passed|updated (got ${mode})`);
}

const issuesRepo = env("ISSUES_REPO");
const server = env("GITHUB_SERVER_URL");
const mirrorRepo = env("GITHUB_REPOSITORY");
const mirror = mirrorRepo.split("/")[1]!;
const runUrl = `${server}/${mirrorRepo}/actions/runs/${env("GITHUB_RUN_ID")}`;
const today = new Date().toISOString().slice(0, 10);
// Every spec-repos/<package>/package.json is named `<package>-spec`.
const pkg = (
  JSON.parse(readFileSync(new URL("package.json", import.meta.url), "utf8")) as { name: string }
).name.replace(/-spec$/, "");

const FAILED_TITLE = `Nightly spec fetch failed: ${mirror}`;
const FAILED_MARKER = `<!-- spec-mirror: ${mirror} -->`;
const UPDATED_TITLE = `Spec updated: ${mirror}`;
const UPDATED_MARKER = `<!-- spec-mirror-updated: ${mirror} -->`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * One GitHub REST call. Every mirror shares the App's one installation, and
 * so its rate limits (search: 30 a minute), so a rate-limited call waits for
 * the reset and tries again.
 */
const api = async <T>(
  token: string,
  path: string,
  init?: { method: string; body: unknown },
): Promise<T> => {
  for (let attempt = 1; ; attempt++) {
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
    if (response.ok) return (await response.json()) as T;

    const limited =
      response.status === 429 ||
      (response.status === 403 &&
        (response.headers.get("retry-after") !== null ||
          response.headers.get("x-ratelimit-remaining") === "0"));
    if (limited && attempt < 5) {
      const retryAfter = Number(response.headers.get("retry-after") ?? "0") * 1000;
      const reset = Number(response.headers.get("x-ratelimit-reset") ?? "0") * 1000 - Date.now();
      const wait = Math.min(Math.max(retryAfter, reset, 5_000), 120_000);
      console.log(`${path}: rate limited, retrying in ${Math.round(wait / 1000)} s`);
      await sleep(wait);
      continue;
    }
    throw new Error(
      `${init?.method ?? "GET"} ${path}: ${response.status} ${await response.text()}`,
    );
  }
};

const issuesToken = env("ISSUES_TOKEN");
const issues = <T>(path: string, init?: { method: string; body: unknown }) =>
  api<T>(issuesToken, path, init);

interface Issue {
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
  html_url: string;
}

/** This mirror's issue with `title` or `marker`: the open one, else the newest. */
const findIssue = async (title: string, marker: string, state: "open" | "all") => {
  const query = `repo:${issuesRepo} is:issue in:title "${title}"${state === "open" ? " is:open" : ""}`;
  const { items } = await issues<{ items: Issue[] }>(
    `search/issues?q=${encodeURIComponent(query)}&per_page=100`,
  );
  return items
    .filter((issue) => issue.title === title || (issue.body ?? "").includes(marker))
    .sort(
      (a, b) => Number(b.state === "open") - Number(a.state === "open") || b.number - a.number,
    )[0];
};

const comment = (issue: Issue, body: string) =>
  issues(`repos/${issuesRepo}/issues/${issue.number}/comments`, { method: "POST", body: { body } });

const log = (message: string) => console.log(`${mirror}: ${message}`);

/**
 * `text` as a Markdown code span. A file name comes from the provider's
 * spec and can hold backticks, which would end a one-backtick span and let
 * the rest of the name write Markdown into the issue. The span's fence is
 * one backtick longer than the longest run in `text`, so no run ends it.
 */
const codeSpan = (text: string) => {
  const longest = Math.max(0, ...(text.match(/`+/g) ?? []).map((run) => run.length));
  if (longest === 0) return `\`${text}\``;
  const fence = "`".repeat(longest + 1);
  // The spaces keep a leading or trailing backtick apart from the fence.
  return `${fence} ${text} ${fence}`;
};

interface Job {
  name: string;
  html_url: string;
  steps?: Array<{ name: string; number: number; conclusion: string | null }>;
}

/** The failed steps of this run, as Markdown links to the step's log. */
const failedSteps = async () => {
  const { jobs } = await api<{ jobs: Job[] }>(
    env("RUN_TOKEN"),
    `repos/${mirrorRepo}/actions/runs/${env("GITHUB_RUN_ID")}/attempts/${env("GITHUB_RUN_ATTEMPT")}/jobs`,
  );
  return jobs.flatMap((job) =>
    (job.steps ?? [])
      .filter((step) => step.conclusion === "failure")
      .map((step) => `[${step.name}](${job.html_url}#step:${step.number}:1)`),
  );
};

if (mode === "failed") {
  const steps = await failedSteps();
  const what = steps.length
    ? `Failed step${steps.length > 1 ? "s" : ""}: ${steps.join(", ")}`
    : `No step reports a failure; see the run: ${runUrl}`;
  const issue = await findIssue(FAILED_TITLE, FAILED_MARKER, "all");

  if (!issue) {
    const body = [
      `The nightly spec fetch of [${mirrorRepo}](${server}/${mirrorRepo}) failed, so the mirror stops getting spec updates for \`@distilled.cloud/${pkg}\`.`,
      "",
      `Run: ${runUrl}`,
      what,
      "",
      `The fetch script lives in \`stacks/distilled-submodules/spec-repos/${pkg}/fetch-specs.ts\`. A deploy of the \`distilled-submodules\` stack copies it to the mirror's \`.meta/fetch-specs.ts\`.`,
      "",
      "The mirror's own workflow keeps this issue: each failed run comments here, and the next run that passes closes it.",
      FAILED_MARKER,
    ].join("\n");
    const created = await issues<Issue>(`repos/${issuesRepo}/issues`, {
      method: "POST",
      body: { title: FAILED_TITLE, body },
    });
    log(`opened ${created.html_url}`);
  } else {
    if (issue.state === "closed") {
      await issues(`repos/${issuesRepo}/issues/${issue.number}`, {
        method: "PATCH",
        body: { state: "open" },
      });
      log(`reopened ${issue.html_url}`);
    }
    await comment(
      issue,
      [
        `${issue.state === "closed" ? "Failing again" : "Failed again"} on ${today}: ${runUrl}`,
        "",
        what,
      ].join("\n"),
    );
    log(`commented on ${issue.html_url}`);
  }
}

if (mode === "passed") {
  const issue = await findIssue(FAILED_TITLE, FAILED_MARKER, "open");
  if (issue?.state === "open") {
    await comment(issue, `Passed on ${today}: ${runUrl}`);
    await issues(`repos/${issuesRepo}/issues/${issue.number}`, {
      method: "PATCH",
      body: { state: "closed", state_reason: "completed" },
    });
    log(`closed ${issue.html_url}`);
  } else {
    log("no open fetch-failed issue");
  }
}

if (mode === "updated") {
  const commit = env("COMMIT");
  const commitUrl = `${server}/${mirrorRepo}/commit/${commit}`;
  // `A path`, `M path`, `D path`: the run's commit against its parent, the
  // commit actions/checkout fetched.
  const changes = execFileSync(
    "git",
    ["diff-tree", "--no-commit-id", "--name-status", "-r", commit],
    {
      encoding: "utf8",
    },
  )
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [status, ...path] = line.split("\t");
      return `- ${codeSpan(status ?? "")} ${codeSpan(path.join(" → "))}`;
    });
  const LIMIT = 100;
  const files = [
    ...changes.slice(0, LIMIT),
    ...(changes.length > LIMIT ? [`- … and ${changes.length - LIMIT} more`] : []),
  ];
  const summary = [
    `Commit: ${commitUrl}`,
    "",
    `Changed files (${changes.length}):`,
    "",
    ...files,
  ].join("\n");

  const issue = await findIssue(UPDATED_TITLE, UPDATED_MARKER, "open");
  if (issue?.state === "open") {
    await comment(issue, [`New specs on ${today}.`, "", summary].join("\n"));
    log(`commented on ${issue.html_url}`);
  } else {
    const body = [
      `[${mirrorRepo}](${server}/${mirrorRepo}) has new specs, so \`@distilled.cloud/${pkg}\` is behind its mirror.`,
      "",
      summary,
      "",
      "To update the SDK:",
      "",
      "```sh",
      `pnpm --filter @distilled.cloud/${pkg} run specs:update`,
      `pnpm generate ${pkg}`,
      `pnpm patches:audit ${pkg}`,
      "```",
      "",
      "The mirror's own workflow keeps this issue: each later spec update comments here until the issue is closed.",
      UPDATED_MARKER,
    ].join("\n");
    const created = await issues<Issue>(`repos/${issuesRepo}/issues`, {
      method: "POST",
      body: { title: UPDATED_TITLE, body },
    });
    log(`opened ${created.html_url}`);
  }
}
