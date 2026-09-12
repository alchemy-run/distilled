import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as GitHub from "alchemy/GitHub";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { makeSyncScaffold, scaffoldDigest } from "./Scaffold.ts";
import { repositoryName, SPEC_REPOS } from "./SpecRepos.ts";
import { loadScaffolds } from "./SpecRepos.ts";

/**
 * One spec-mirror repository per spec-consuming SDK package.
 *
 * Every `packages/*` directory that has a `specs/` folder gets a
 * `spec-mirror-<name>` repository in the `distilled-mirror` org, holding the
 * spec files that package's generator reads plus a workflow that refreshes
 * them every 24 hours — and nothing else.
 *
 * That "nothing else" is the point. Several upstream spec repositories are
 * submoduled today for a handful of files: github/rest-api-description is
 * ~6.7 GB checked out for one 13 MB document, kubernetes/kubernetes ~1.5 GB
 * for one 4 MB document, Azure/azure-rest-api-specs 338,000+ files for about
 * 780. `specs:sync` at the repo root materialises every one of them in full.
 * A mirror holds the subset instead, so submoduling it costs what the specs
 * cost.
 *
 * The stack owns two things per repository:
 *
 *   - the repository itself (`GitHub.Repository`), which converges against
 *     the live repository — existing repositories are adopted and their
 *     settings synced, never duplicated. The default removal policy is
 *     `retain`, so nothing here can delete a repository.
 *   - its file set (`SyncScaffold`, an Alchemy Action), which commits the
 *     scaffold and deletes anything else that appears under a managed prefix.
 *
 * State lives in the remote Cloudflare state store (the same one the alchemy
 * monorepo uses), so every deploy — local or CI — converges the same stack.
 */

/**
 * The GitHub org the mirrors live in. Overridable via
 * `DISTILLED_REPOS_OWNER` so the workflow can point elsewhere without a code
 * change.
 */
const Owner = Config.string("DISTILLED_REPOS_OWNER").pipe(
  // An unset repository variable reaches the workflow as an empty string, so
  // treat empty the same as missing.
  Config.withDefault(""),
  Config.map((owner) =>
    owner.trim() === "" ? "distilled-mirror" : owner.trim(),
  ),
);

/**
 * Fail if a package consumes specs but has no mirror defined, rather than
 * silently leaving it on its multi-gigabyte upstream submodule. A new SDK
 * package needs a `spec-repos/<name>/` entry — there is no generic fetch
 * script, because no two upstreams publish their specs the same way.
 */
const checkCoverage = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const packagesDir = path.join(import.meta.dirname, "..", "..", "packages");

  const covered = new Set(SPEC_REPOS.map((specRepo) => specRepo.package));
  const missing: string[] = [];
  for (const entry of (yield* fs.readDirectory(packagesDir)).toSorted()) {
    if (covered.has(entry)) continue;
    const consumesSpecs = yield* fs.exists(
      path.join(packagesDir, entry, "specs"),
    );
    if (consumesSpecs) missing.push(entry);
  }

  if (missing.length > 0) {
    return yield* Effect.die(
      new Error(
        `packages/{${missing.join(", ")}} consume specs but have no mirror. ` +
          `Add an entry to SPEC_REPOS and a spec-repos/<name>/ directory ` +
          `(fetch-specs.ts, package.json, readme.md).`,
      ),
    );
  }
}).pipe(Effect.orDie);

export default Alchemy.Stack(
  "distilled-submodules",
  {
    providers: GitHub.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const owner = yield* Owner;
    yield* checkCoverage;

    // The scaffold is read off disk once and reaches the action through its
    // closure, so the state store holds a digest per repository rather than
    // 21 copies of the file set.
    const scaffolds = yield* loadScaffolds;
    const SyncScaffold = makeSyncScaffold(
      (repository) => scaffolds[repository]!,
    );

    const mirrors = yield* Effect.all(
      SPEC_REPOS.map((specRepo) =>
        Effect.gen(function* () {
          const pkg = specRepo.package;
          const name = repositoryName(specRepo);

          const repository = yield* GitHub.Repository(pkg, {
            owner,
            name,
            description:
              `Mirror of raw api specs for ${pkg} designed for distilled SDK use ` +
              `(@distilled.cloud/${pkg}). ⚠️ these are unpatched and are not an ` +
              `accurate representation of actual api behavior; ` +
              `https://github.com/alchemy-run/distilled contains patched smithy ` +
              `specs for this api`,
            visibility: "public",
            // Without a first commit there is no branch for the scaffold to
            // land on. Ignored for the repositories that already exist.
            autoInit: true,
            hasIssues: false,
            hasProjects: false,
            hasWiki: false,
            deleteBranchOnMerge: true,
            topics: ["distilled", "alchemy", "effect", "sdk", pkg],
          });

          // A blocked mirror gets its repository (so its settings and state
          // stay converged) but no fetch machinery — see SpecRepo.blocked.
          if (specRepo.blocked === undefined) {
            const files = scaffolds[name]!;
            // `fullName` and `defaultBranch` are the repository resource's
            // OUTPUTS, not the plain strings above, and that is deliberate:
            // the dependency graph is built from the Outputs an input
            // references. Hand it `owner`/`name` literals and the Action has
            // no upstream, so it runs alongside the repository it means to
            // commit into and 404s on a from-scratch deploy.
            yield* SyncScaffold(`scaffold-${pkg}`, {
              fullName: repository.fullName,
              branch: repository.defaultBranch,
              paths: Object.keys(files).sort(),
              digest: scaffoldDigest(files),
            });
          }

          return [pkg, repository.htmlUrl] as const;
        }),
      ),
      { concurrency: 5 },
    );

    return { mirrors: Object.fromEntries(mirrors) };
  }),
);
