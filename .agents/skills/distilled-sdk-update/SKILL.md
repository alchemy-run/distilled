---
name: distilled-sdk-update
description: Move an existing distilled SDK to its mirror's latest spec, regenerate it, audit packages/<pkg>/patches/ with `pnpm patches:audit` and delete or slim the patches the new spec has absorbed, then open the PR. Use for "update <pkg> to the latest spec", "regenerate <pkg>", "audit / remove unused patches", "which patches does the new spec no longer need", or when a provider says they fixed their spec. Adding, changing, merging or rebasing a single patch, including "do we still need this patch PR?", is distilled-sdk-patch, which reads the generated diff and runs no audit. When also asked to "look at / go through the open PRs" for that provider, it reconciles them against the new spec (Step 6). Building a new SDK is the distilled-sdk skill.
---

# Updating a distilled SDK to its latest spec

Every patch under `packages/<pkg>/patches/` is a claim that the upstream
description is wrong. Upstreams fix things, so every regeneration is also
the moment to drop the patches that no longer change anything. The two
halves are one job: a spec update that keeps stale patches hides the fix,
and a patch audit against an old spec finds nothing.

Work in a worktree cut from `origin/main` and run `pnpm install` there.
Nothing here needs a full `pnpm specs:sync`; one mirror is enough.

## Step 1 — move the mirror

```sh
pnpm --filter @distilled.cloud/<pkg> run specs:fetch    # initialise at the committed commit
pnpm --filter @distilled.cloud/<pkg> run specs:update   # move to the mirror's tip
git -C packages/<pkg>/specs/spec-mirror-<pkg> log -1 --format='%h %ci'
```

`specs:update` alone skips a submodule that was never initialised, which
is why `specs:fetch` comes first. `git status` now shows the gitlink
(`M packages/<pkg>/specs/spec-mirror-<pkg>`) — that line is part of the
commit; it is how anyone else reproduces the generation.

The mirror refetches daily, so its tip is at most a day behind upstream.
When you need today's upstream (a provider just published a fix), preview
with `pnpm specs:local <pkg>` and `DISTILLED_SPECS_LOCAL=1 pnpm generate
<pkg>`, but commit only a generation from the mirror gitlink — a
`.local` generation is one nobody can reproduce.

## Step 2 — regenerate

```sh
pnpm generate <pkg>
```

A patch whose pointer no longer resolves fails convert with
`❌ bad patch: <file> [<op> <path>]: stale target`. That is the new spec
telling you something moved: either upstream now has what the op added
(delete the op) or the path changed (re-point it). Fix the patch and rerun;
`onStalePatch: "warn"` is how a whole chain once vanished silently.

## Step 3 — audit the patches

```sh
pnpm patches:audit <pkg>          # one verdict per file
pnpm patches:audit <pkg> --ops    # also one per op inside every needed file
pnpm patches:audit <pkg> --only <substring>
pnpm patches:audit <pkg> --jobs <n>   # parallel converts; default from cores and free memory
```

Run the audit only after the mirror has moved (step 1): it answers which
patches the new spec has absorbed, and nothing else. Always name the
package. To check what one patch you just wrote or edited does, read the
generated diff instead (`distilled-sdk-patch`, step 5).

The audit (`@distilled.cloud/core/codegen/patch-audit`) builds the model
once with every patch, then once per patch with that patch left out, and
diffs the result. How it builds the model depends on the package's patch
stage (`distilled.patches` in package.json, see the `distilled-sdk-patch`
skill):

- **convert** — runs `convert` on scratch copies of the package
  (`packages/.audit-<pkg>-<n>`, removed on exit; the package itself is
  never written), so the spec mirror must be fetched (step 1); without it
  the package is reported as skipped. A file whose ops all target the
  Smithy model (`/shapes`, `/metadata`) is judged in memory: one convert,
  then only `finalizeConvert` re-runs per file. All of `cloudflare` (about
  2,850 files) takes under two minutes and `gcp` seconds. A file that
  patches the spec (`/paths`, `/components`) costs one convert each
  (`DISTILLED_SKIP_PATCHES`), spread over `--jobs` copies.
- **generate** — applies `patches/<model>/` to the committed
  `.generated-specs` in memory. No mirror, seconds per package, and CI
  runs it on every PR (`packages/core/src/sdks.test.ts`), so a patch the
  model no longer needs fails the PR that made it dead.

| Verdict | Meaning | Do |
| --- | --- | --- |
| `🗑 no effect` | the model is byte-identical without it | delete the file |
| `✔ needed` | the model differs; the pointers are listed | keep, and read the diff — it is the patch's description, mechanically |
| `🔗 the build fails without it` | a later patch targets what this one adds | keep both, or delete both |
| `op N: no effect` (`--ops`) | one op in a needed file is dead | remove that op |

Verdicts are one-at-a-time. Two patches that add the same thing each look
unused alone; only the second deletion changes the model. So: delete what
it lists, `pnpm generate <pkg>`, audit again, until the list is empty.

Two things the audit cannot judge:

- **Typed patch configs.** `packages/aws/patches/<sdkId>.json` is
  `applyAwsSpecPatches` config, not RFC-6902; the audit reports those files
  as not audited. Judge them by reading the model.
- **Whether a needed patch is *right*.** A patch that still changes the
  model may still be wrong about the wire. Patches that encode observed
  behaviour — error statuses the spec omits, required fields the API
  actually omits, `x-sensitive` marks — are only confirmable against the
  live API. With credentials, probe: create throwaway resources, hit the
  mutating routes with invalid bodies, record the statuses, tear down
  promptly. Add only what you observed; a probe that never reached
  validation (401/404 on a dummy slug) proves nothing. Writing the patch
  that records it is the `distilled-sdk-patch` skill.

While slimming, keep each file's `description` true to what is left, and
fold files of the same kind together when they shrink to a few ops (two
files that both only add omitted `422`s are one file). The description is
the bug report you will send upstream.

## Step 4 — check the delta

```sh
git diff --stat -- packages/<pkg>
pnpm exec tsc -b packages/<pkg> --noCheck false   # the root typecheck:ci is heavy
pnpm lint
```

Read `git diff -- packages/<pkg>/src/services` for what upstream changed
underneath you, beyond the patches:

- **Renamed or removed operations.** An upstream `operationId` change
  renames an export; a removed path removes one. Both are breaking and
  belong in the PR body by name, old → new.
- **Nullability and required flips** on shapes callers already use —
  `T` → `T | null` in an output is a type break too.
- **Operation count** before and after, as one line.

## Step 5 — commit and PR

Stage explicit paths — the gitlink, `.generated-specs/`, `patches/`,
`src/services/`, and `README.md` if an example changed:

```sh
git add -- packages/<pkg>/specs/spec-mirror-<pkg> packages/<pkg>/.generated-specs \
  packages/<pkg>/patches packages/<pkg>/src/services
git commit -m "feat(<pkg>): regenerate from the <YYYY-MM-DD> spec"
```

The PR body records what the next person needs to reproduce and review:

- mirror commit before → after, and the date of the spec
- operations before → after
- patches deleted, one line each with *why* (already in the spec, never
  read by convert, overwrote what upstream now publishes)
- patches kept, one line each with what the spec still gets wrong
- renamed / removed operations

That "patches kept" list, with each file's description and a link to it on
the branch, is also the message to send the provider. Group it by kind —
missing `x-nullable`, shared models with too many `required` fields,
undocumented error statuses, a wrong response schema, secrets with no
sensitive mark — because that is how they will fix it.

## Step 6 — reconcile open PRs for the provider (when asked)

Open PRs that patch `packages/<pkg>` were written against the old spec, so
they are reviewed after the update has merged, never before. The new spec
decides each one. The authors' commits should land with their names on
them: update their branches and merge, and close only what the spec or
another PR already covers.

**Find them.**

```sh
gh pr list --state open --limit 300 --json number,title,author,files \
  --jq '.[] | select(any(.files[]; .path | startswith("packages/<pkg>/")))
        | "#\(.number) \(.author.login): \(.title)"'
```

Filter on changed files: titles miss PRs scoped to `core` or to a sibling
package that also patch this one.

Read each body and its `patches/` diff. If the user excludes a PR or an API,
leave it untouched: no push, no comment, no close.

**Judge each against the regenerated model** (`.generated-specs/`, not the
TypeScript):

| Finding | Do |
| --- | --- |
| The spec now has it: same operations, members or shapes | close with a comment naming the spec commit and the generated symbols |
| Another open PR does the same, or it already merged | merge the most complete one; close the rest with a link to it |
| Part is in the spec now | trim the PR to what the spec still lacks |
| None of it is in the spec | update and merge as is |
| The spec has it, but the converter generates it wrong | fix the converter in its own PR, merge it, then close |

Usually reading the regenerated model answers it: search
`.generated-specs/` for the operations, members or shapes the PR adds. When
it does not, merge `main` into the PR's branch and run `pnpm generate
<pkg>`: a stale target means the spec moved underneath the patch, and the
generated diff against `main` shows what the patch still adds. Reach for
`pnpm patches:audit <pkg> --only <file> --ops` only when that diff cannot
tell you which ops are dead.

**Update a branch in place.** Maintainers can push to forks when
`maintainerCanModify` is true; for a fork, fetch `refs/pull/<n>/head`,
since `origin/<branch>` does not exist:

```sh
git fetch origin main "refs/pull/<n>/head:refs/remotes/pr/<n>"
git checkout -B pr-<n> pr/<n>
git merge --no-edit origin/main            # merge, never rebase: keep their commits
pnpm generate <pkg>                        # resolve generated-file conflicts by regenerating
pnpm exec tsc -b packages/<pkg> --noCheck false
pnpm vitest run packages/<pkg>/src/<their>.test.ts
git push https://github.com/<owner>/<repo>.git pr-<n>:<headRefName>
```

- Conflicts in `.generated-specs/` or `src/services/` are not edits to
  resolve by hand: take either side and regenerate. Conflicts in `patches/`
  are real; read both sides. Two PRs adding the same shape merge into
  duplicate ops or duplicate JSON keys without a textual conflict, so check
  the patch parses with no repeated keys.
- Delete a test the PR added that only checks the patch's generated shape;
  patches carry no per-package tests (`distilled-sdk-patch`, step 4).
  Other tests that predate repo changes (`bun:test` → `vitest`, `Redacted`
  credentials) get fixed in a separate commit on their branch.
- When a PR was trimmed, say so in a comment on it: what was dropped and why.

**Merge in dependency order.** PRs that regenerate the same service conflict
with each other once one lands. Merge the independent ones first, then
re-merge `main` into each remaining branch and regenerate before queueing
it. `main` uses a merge queue; enqueue with the GraphQL
`enqueuePullRequest` mutation (with `expectedHeadOid`) after the checks
pass.

**Ask before** closing anyone's PR, or before a change beyond patches,
such as a converter or runtime fix. Every close carries a comment that
thanks the author and names what superseded it, by PR number or spec
commit.
