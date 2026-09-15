# stacks/distilled-submodules

An [Alchemy](https://alchemy.run) stack that manages this monorepo's spec
mirrors: one `distilled-mirror/spec-mirror-<name>` repository per `packages/*`
directory that consumes an API spec, **and the exact set of files inside each
one**.

## Why

Several spec submodules are enormous relative to what we read from them:

| package | upstream | checked out | what the generator reads |
| --- | --- | --- | --- |
| `github` | `github/rest-api-description` | ~6.7 GB | 1 file, 13 MB |
| `kubernetes` | `kubernetes/kubernetes` | ~1.5 GB | 1 file, 4.3 MB |
| `azure` | `Azure/azure-rest-api-specs` | 338k files | ~780 files, 56 MB |
| `stripe` | `stripe/openapi` | whole repo | 1 file, 7.3 MB |

`specs:sync` at the repo root used to be a recursive `submodule update --init`
over every one of those. Each package now submodules its mirror instead, which
holds the subset — so a full `pnpm specs:sync` is 406 MB of working tree,
shallow (`--depth=1`, `shallow = true` on every entry) and non-recursive.
`pnpm specs:check` fails if a package drops back onto an upstream or an entry
loses `shallow`.

## How it works

- [`SpecRepos.ts`](./SpecRepos.ts) is the manifest: which packages have a
  mirror, and where each mirror's files come from on disk.
- [`Scaffold.ts`](./Scaffold.ts) defines `SyncScaffold`, an
  [Action](https://alchemy.run/infrastructure-as-code/action/) that commits a
  repository's file set through the git data API. It is authoritative in both
  directions: it writes the managed files **and deletes anything else** that
  appears under a managed prefix (`.github/`, `.meta/`). `specs/` is
  deliberately not managed — that is the payload each mirror's own workflow
  produces.
- [`alchemy.run.ts`](./alchemy.run.ts) converges the repositories and applies
  the scaffold to each. It fails the deploy if a package has a `specs/`
  directory but no mirror, so a new SDK cannot quietly stay on a
  multi-gigabyte upstream submodule.
- `GitHub.Repository` converges against the live repository: existing repos
  are adopted and their settings synced, never duplicated. The default removal
  policy is `retain`, so nothing here can delete a repository.
- State lives in the remote Cloudflare state store (`Cloudflare.state()`) —
  the same store the alchemy monorepo uses — so local and CI deploys converge
  one shared stack.
- The target org is `vars.DISTILLED_REPOS_OWNER`, falling back to
  `distilled-mirror`.
- This directory is a workspace member, but pins `alchemy` and `effect` to
  exact versions rather than taking `catalog:effect` — the alchemy CLI is
  built against one `effect` prerelease and the SDK packages track another.
  pnpm's isolated `node_modules` keeps both resolutions apart. It is not in
  the root tsconfig's project references, so `tsc -b` never sees it; CI
  checks it through the `typecheck-stacks` job instead.

## The file set

Every mirror gets exactly:

```
.github/workflows/update-specs.yml   # shared — refetch + commit, daily
.gitignore                           # shared
.meta/tsconfig.json                  # shared
.meta/fetch-specs.ts                 # per repo
.meta/package.json                   # per repo
readme.md                            # per repo
```

plus `.meta/bun.lock`, which the mirror's own workflow commits and the stack
never touches.

Shared files live in [`scaffold/`](./scaffold); per-repository files live in
[`spec-repos/<package>/`](./spec-repos). **There is no generic fetch script** —
no two upstreams publish their specs the same way. The existing ones are a
plain URL fetch (`planetscale`, `neon`, `supabase`, …), a GraphQL
introspection (`railway`), a discovery-directory crawl (`gcp`), a raw file
download (`github`, `kubernetes`, `stripe`, `turso`, …), and a sparse partial
clone (`aws`, `azure`).

`spec-repos/` is outside this stack's TypeScript program on purpose: those
files are shipped verbatim into the mirrors, where they run under Bun against
each mirror's own dependencies. They are data to this stack, not part of it.

### The sparse-clone mirrors

`aws` and `azure` cannot use a raw download — they need directories, not
files. Both clone `--filter=blob:none --no-checkout`, which gets the commit and
its trees but not one byte of file content, decide which paths to keep from the
tree listing alone, then narrow the sparse checkout to exactly those paths.
Fetching content is the last step, not the first, so the multi-gigabyte working
tree never exists.

`azure` additionally selects the latest stable api-version per resource
provider and closes the selection over external `$ref`s, so the mirror is
self-contained: 338,547 upstream paths in, 777 documents out.

## Working on a mirror locally

The mirrors live in an org most contributors cannot write to, and a new one
does not exist until this stack deploys on merge to `main`. So the same fetch
script is runnable here, into a gitignored copy of the mirror:

```bash
pnpm specs:local <package>                       # scaffold + fetch into
                                                 # packages/<pkg>/specs/.local
DISTILLED_SPECS_LOCAL=1 pnpm generate <package>  # generate against it
pnpm specs:link <package>                        # add the .gitmodules entry
pnpm specs:check                                 # the CI gate
```

`specs:local` copies the same `scaffold/` + `spec-repos/<package>/` file set
this stack commits and runs `fetch-specs.ts` from its `.meta` directory, so
the result is byte-identical to a checkout of the real mirror. That is the
point: local iteration on a fetch script tests the thing that will run in the
mirror's workflow, not an approximation of it.

Local mode is an environment variable rather than an edit to the package's
spec path. Nothing committed points at `.local` — `specs:check` fails the
build if anything does — so there is no local-only reference to forget to
revert, and a package that reads from a gitignored directory can never reach
`main`. See `@distilled.cloud/core/codegen/spec-path` and
`.claude/skills/distilled-sdk`.

## Deploying

Runs automatically on every push to `main` via
[`.github/workflows/deploy-submodules-stack.yml`](../../.github/workflows/deploy-submodules-stack.yml).
CI reads `ALCHEMY_GITHUB_TOKEN`, `STACKS_CLOUDFLARE_API_TOKEN`,
`STACKS_CLOUDFLARE_ACCOUNT_ID` (secrets) and `DISTILLED_REPOS_OWNER`
(variable) — all provisioned as code by
[`stacks/distilled-monorepo`](../distilled-monorepo), never pasted by hand.

```bash
cd stacks/distilled-submodules
pnpm exec alchemy deploy --stage prod --profile <profile>
```

Because `SyncScaffold` is an Action, it re-runs only when its input digest
changes. If a mirror drifts (someone edits a managed file by hand), re-run the
deploy with `--force` to make the stack reassert the file set.

The token needs to be a fine-grained PAT owned by the `distilled-mirror` org,
scoped to **All repositories**, with **Administration: Read and write** (create
repositories, settings, topics), **Contents: Read and write** (commit the
scaffold) and **Workflows: Read and write** (the scaffold includes
`.github/workflows/update-specs.yml`). No organization permissions are needed.
