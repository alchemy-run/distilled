/**
 * Keeps one GitHub issue for the nightly Compatibility run (compat.yml).
 *
 *   OUTCOME=success|failure RUN_ID=... RUN_URL=... SHA=... node scripts/compat/report-issue.ts
 *
 * - A failed night with the issue open updates its body (the last failed
 *   run). It comments only when the set of failing jobs changed, so three
 *   weeks of the same failure is one issue and no new comments.
 * - A failed night with the issue closed (a passing night closed it, or
 *   someone closed it while the run still failed) reopens it with a comment.
 *   The repo gets a second issue only if someone deletes or renames the
 *   first.
 * - A passing night closes the open issue with a comment.
 *
 * Uses the `gh` CLI with GH_TOKEN and GH_REPO.
 */
import { execFileSync } from "node:child_process";

const TITLE = "Nightly compatibility run failed";

const env = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
};
const outcome = env("OUTCOME");
const runId = env("RUN_ID");
const runUrl = env("RUN_URL");
const sha = env("SHA").slice(0, 9);
const today = new Date().toISOString().slice(0, 10);

const gh = (...args: string[]) => execFileSync("gh", args, { encoding: "utf8" });

/** The open issue, else the newest closed one. */
const issue = (
  JSON.parse(
    gh(
      "issue",
      "list",
      "--state",
      "all",
      "--search",
      `"${TITLE}" in:title`,
      "--json",
      "number,title,body,state",
    ),
  ) as Array<{ number: number; title: string; body: string; state: string }>
)
  .filter((i) => i.title === TITLE)
  .sort(
    (a, b) => Number(b.state === "OPEN") - Number(a.state === "OPEN") || b.number - a.number,
  )[0];
const open = issue?.state === "OPEN" ? issue : undefined;

if (outcome === "success") {
  if (open) {
    gh("issue", "comment", String(open.number), "--body", `Passed on ${sha} (${today}): ${runUrl}`);
    gh("issue", "close", String(open.number));
    console.log(`closed #${open.number}`);
  }
  process.exit(0);
}

const jobs = JSON.parse(gh("run", "view", runId, "--json", "jobs")) as {
  jobs: Array<{ name: string; conclusion: string; url: string }>;
};
const failed = jobs.jobs.filter((job) => job.conclusion === "failure");
const key = failed
  .map((job) => job.name)
  .sort()
  .join(" | ");

const marker = (name: string, body: string) =>
  new RegExp(`<!-- ${name}: (.*?) -->`).exec(body)?.[1];
const first = (open && marker("compat-first", open.body)) ?? `${today} on ${sha}: ${runUrl}`;

const body = [
  "The nightly Compatibility run (`.github/workflows/compat.yml`) fails on `main`.",
  "",
  "Failing jobs:",
  ...failed.map((job) => `- [${job.name}](${job.url})`),
  "",
  `First failed: ${first}`,
  `Last failed: ${today} on ${sha}: ${runUrl}`,
  "",
  "The workflow keeps this one issue: it comments only when the failing jobs change, and closes the issue when a nightly run passes.",
  `<!-- compat-failed: ${key} -->`,
  `<!-- compat-first: ${first} -->`,
].join("\n");

if (!issue) {
  console.log(gh("issue", "create", "--title", TITLE, "--body", body).trim());
} else if (!open) {
  gh("issue", "reopen", String(issue.number));
  gh("issue", "edit", String(issue.number), "--body", body);
  gh(
    "issue",
    "comment",
    String(issue.number),
    "--body",
    [
      `Failing again on ${sha} (${today}): ${runUrl}`,
      "",
      ...failed.map((job) => `- ${job.name}`),
    ].join("\n"),
  );
  console.log(`reopened #${issue.number}`);
} else {
  gh("issue", "edit", String(open.number), "--body", body);
  if (marker("compat-failed", open.body) !== key) {
    gh(
      "issue",
      "comment",
      String(open.number),
      "--body",
      [
        `The failing jobs changed on ${sha} (${today}): ${runUrl}`,
        "",
        ...failed.map((job) => `- ${job.name}`),
      ].join("\n"),
    );
  }
  console.log(`updated #${open.number}`);
}
