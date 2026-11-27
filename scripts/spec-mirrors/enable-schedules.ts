/**
 * Turns back on the "Update Specs" schedule of every spec mirror where GitHub
 * turned it off (deploy-submodules-stack.yml, on every push to main).
 *
 *   GH_TOKEN=... node scripts/spec-mirrors/enable-schedules.ts [--dry-run]
 *
 * GitHub disables a scheduled workflow in a public repository after 60 days
 * without activity, and a mirror whose upstream does not change makes no
 * commits. A disabled workflow never runs, so it can't report itself. Each
 * mirror files its own issues in alchemy-run/distilled; this script covers the
 * one case a mirror can't.
 *
 * It enables only `disabled_inactivity`. A workflow someone disabled by hand
 * (`disabled_manually`) stays off and is logged. A mirror without the workflow
 * (a blocked mirror, see SpecRepos.ts) is skipped. It exits non-zero if an
 * enable fails, for example when the token lacks Actions: write.
 */

const WORKFLOW = "update-specs.yml";
const CONCURRENCY = 8;

const token = process.env.GH_TOKEN;
if (!token) throw new Error("GH_TOKEN is not set");
const owner = process.env.DISTILLED_REPOS_OWNER?.trim() || "distilled-mirror";
const dryRun = process.argv.includes("--dry-run");

class NotFound extends Error {}

const api = async <T>(path: string, method = "GET"): Promise<T | undefined> => {
  const response = await fetch(`https://api.github.com/${path}`, {
    method,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "x-github-api-version": "2022-11-28",
    },
  });
  if (response.status === 404) throw new NotFound(path);
  if (!response.ok)
    throw new Error(`${method} ${path}: ${response.status} ${await response.text()}`);
  return response.status === 204 ? undefined : ((await response.json()) as T);
};

const repos: string[] = [];
for (let page = 1; ; page++) {
  const batch = (await api<Array<{ name: string; archived: boolean }>>(
    `orgs/${owner}/repos?type=public&per_page=100&page=${page}`,
  ))!;
  repos.push(
    ...batch.filter((r) => r.name.startsWith("spec-mirror-") && !r.archived).map((r) => r.name),
  );
  if (batch.length < 100) break;
}
repos.sort();

const counts = { active: 0, enabled: 0, manual: 0, skipped: 0 };
const failures: string[] = [];

const check = async (repo: string) => {
  const path = `repos/${owner}/${repo}/actions/workflows/${WORKFLOW}`;
  let state: string;
  try {
    state = (await api<{ state: string }>(path))!.state;
  } catch (error) {
    if (error instanceof NotFound) {
      counts.skipped++;
      return;
    }
    throw error;
  }
  if (state === "active") {
    counts.active++;
  } else if (state === "disabled_inactivity") {
    console.log(`${dryRun ? "[dry run] " : ""}${repo}: disabled for inactivity, enabling`);
    if (!dryRun) {
      try {
        await api(`${path}/enable`, "PUT");
      } catch (error) {
        failures.push(`${repo}: ${(error as Error).message}`);
        return;
      }
    }
    counts.enabled++;
  } else {
    console.log(`${repo}: ${state}, left as it is`);
    counts.manual++;
  }
};

let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < repos.length) await check(repos[next++]!);
  }),
);

console.log(
  `${repos.length} mirrors: ${counts.active} active, ${counts.enabled} enabled, ` +
    `${counts.manual} disabled by hand, ${counts.skipped} without ${WORKFLOW}`,
);
if (failures.length > 0) {
  console.error(`Could not enable:\n${failures.join("\n")}`);
  process.exitCode = 1;
}
