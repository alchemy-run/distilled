// Benchmark past or new commits of distilled's main branch and store each
// run in ./runs, so the dashboard shows how the numbers move over time.
//
//   pnpm history                                  origin/main's tip, if not recorded yet
//   pnpm history -- --since 2026-09-20 --every 2d the last commit of every 2nd day since then
//   pnpm history -- --last 5                      the last 5 commits
//   pnpm history -- 1db06c7e1 cced62a87           these commits
//   pnpm history -- --fetch                       `git fetch origin main` first (the only network use)
//   pnpm history -- --dry-run                     list the commits, run nothing
//
// Every commit runs the *current* benchmark (benches/sdks and its frozen
// targets.json, copied from DISTILLED_REPO) against that commit's packages,
// so all points measure the same programs. The checkout is a detached git
// worktree in ~/.cache/distilled-bench/checkout; its node_modules and lib/
// persist between commits, so later builds are incremental.
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
// Keep the branch commit list current, so new runs land on the branch side of the charts.
process.on("exit", () => {
  try {
    execFileSync("node", [join(import.meta.dirname, "work.mjs")], { stdio: "ignore" });
  } catch {}
});

// Default: the distilled checkout this dashboard lives in (benches/dashboard).
const DEFAULT_REPO = join(import.meta.dirname, "..", "..", "..");
const repo = process.env.DISTILLED_REPO ?? DEFAULT_REPO;
const checkout =
  process.env.DISTILLED_BENCH_CHECKOUT ?? join(homedir(), ".cache", "distilled-bench", "checkout");
const runsDir = join(import.meta.dirname, "..", "runs");
const ref = process.env.DISTILLED_BENCH_REF ?? "origin/main";

const args = process.argv.slice(2).filter((a) => a !== "--");
const opts = {
  since: undefined,
  every: undefined,
  last: undefined,
  fetch: false,
  dryRun: false,
  force: false,
  shas: [],
  bench: [],
};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--since") opts.since = args[++i];
  else if (a === "--every") opts.every = args[++i];
  else if (a === "--last") opts.last = Number(args[++i]);
  else if (a === "--fetch") opts.fetch = true;
  else if (a === "--dry-run") opts.dryRun = true;
  else if (a === "--force") opts.force = true; // re-run commits that already have a run
  else if (a === "--bench") opts.bench.push(...args[++i].split(" ")); // extra run.ts flags
  else if (/^[0-9a-f]{7,40}$/.test(a)) opts.shas.push(a);
  else {
    console.error(`unknown argument ${a}`);
    process.exit(2);
  }
}

const { FORCE_COLOR: _, ...env } = process.env;
const sh = (cmd, cmdArgs, cwd, { quiet = false, allowFail = false } = {}) => {
  const res = spawnSync(cmd, cmdArgs, {
    cwd,
    env,
    encoding: "utf8",
    stdio: quiet ? "pipe" : "inherit",
    maxBuffer: 1 << 28,
  });
  if (res.status !== 0 && !allowFail) {
    if (quiet) console.error(res.stdout?.slice(-3000), res.stderr?.slice(-3000));
    throw new Error(`${cmd} ${cmdArgs.join(" ")} failed in ${cwd} (exit ${res.status})`);
  }
  return res;
};
const git = (...a) => sh("git", a, repo, { quiet: true }).stdout.trim();
const log = (s) => console.log(`[history ${new Date().toISOString().slice(11, 19)}] ${s}`);

//#region pick commits

if (opts.fetch) sh("git", ["fetch", "origin", "main"], repo);

/** Make sure `since` is inside the local (possibly shallow) history. */
const ensureHistory = (since) => {
  const oldest = git("log", "--first-parent", "--format=%cI", ref).split("\n").at(-1);
  if (
    since &&
    oldest &&
    new Date(since) < new Date(oldest) &&
    git("rev-parse", "--is-shallow-repository") === "true"
  ) {
    log(`deepening the shallow clone to ${since}`);
    sh("git", ["fetch", "origin", "main", `--shallow-since=${since}`], repo);
  }
};

const recorded = new Set(
  readdirSync(runsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(runsDir, f), "utf8")))
    .filter((r) => !r.partial && r.git?.sha)
    .map((r) => r.git.sha),
);

const parseEvery = (s) => {
  const m = /^(\d+)([hd])$/.exec(s ?? "");
  if (!m) throw new Error(`--every wants e.g. 12h or 2d, got ${s}`);
  return Number(m[1]) * (m[2] === "d" ? 86_400_000 : 3_600_000);
};

let commits; // [{ sha, date, subject }], oldest first
const list = (...a) =>
  git("log", "--first-parent", "--format=%H%x09%cI%x09%s", ...a)
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const [sha, date, subject] = l.split("\t");
      return { sha, date, subject };
    })
    .reverse();

if (opts.shas.length) {
  commits = opts.shas.map((s) => {
    const [sha, date, subject] = git("log", "-1", "--format=%H%x09%cI%x09%s", s).split("\t");
    return { sha, date, subject };
  });
} else if (opts.since) {
  ensureHistory(opts.since);
  const all = list(`--since=${opts.since}`, ref);
  if (opts.every) {
    // The last commit of every window, counting back from the newest commit.
    const step = parseEvery(opts.every);
    const picked = new Map();
    const end = new Date(all.at(-1).date).getTime();
    for (const c of all) picked.set(Math.floor((end - new Date(c.date).getTime()) / step), c);
    commits = [...picked.values()].sort((a, z) => a.date.localeCompare(z.date));
  } else commits = all;
} else if (opts.last) {
  commits = list(`-${opts.last}`, ref);
} else {
  commits = list("-1", ref);
}
const todo = commits.filter((c) => opts.force || !recorded.has(c.sha));
log(
  `${commits.length} commit(s) selected, ${commits.length - todo.length} already recorded, ${todo.length} to run`,
);
for (const c of todo) console.log(`  ${c.sha.slice(0, 9)} ${c.date.slice(0, 16)} ${c.subject}`);
if (opts.dryRun || todo.length === 0) process.exit(0);

//#endregion

//#region checkout + run

if (!existsSync(join(checkout, ".git"))) {
  mkdirSync(join(checkout, ".."), { recursive: true });
  log(`creating worktree ${checkout}`);
  sh("git", ["worktree", "add", "--detach", checkout, todo[0].sha], repo);
}

const benchSrc = join(repo, "benches", "sdks");
const benchDst = join(checkout, "benches", "sdks");
let failures = 0;

for (const [i, c] of todo.entries()) {
  const t0 = Date.now();
  log(`(${i + 1}/${todo.length}) ${c.sha.slice(0, 9)} ${c.date.slice(0, 10)} ${c.subject}`);
  try {
    sh("git", ["checkout", "--force", "--detach", c.sha], checkout, { quiet: true });
    // Untracked files from the previous commit (and the bench copy) go; ignored ones (node_modules, lib/) stay.
    sh("git", ["clean", "-fdq"], checkout, { quiet: true });
    rmSync(benchDst, { recursive: true, force: true });
    cpSync(benchSrc, benchDst, {
      recursive: true,
      filter: (p) => !/[\\/](node_modules|\.out)$/.test(p),
    });
    log("pnpm install");
    sh(
      "pnpm",
      ["install", "--prefer-offline", "--no-frozen-lockfile", "--config.confirmModulesPurge=false"],
      checkout,
      { quiet: true },
    );
    log("tsc -b + benchmark");
    sh(
      "node",
      [
        join(benchDst, "run.ts"),
        "--build",
        "--history",
        runsDir,
        "--note",
        "history",
        ...opts.bench,
      ],
      checkout,
    );
    log(`done in ${Math.round((Date.now() - t0) / 60000)} min`);
  } catch (e) {
    failures++;
    log(`FAILED ${c.sha.slice(0, 9)}: ${e.message}`);
  }
}
// Leave the checkout's worktree clean so `git status` there does not confuse anyone.
sh("git", ["checkout", "--force", "--detach", todo.at(-1).sha], checkout, {
  quiet: true,
  allowFail: true,
});
log(`finished: ${todo.length - failures} recorded, ${failures} failed`);
process.exit(failures ? 1 : 0);

//#endregion
