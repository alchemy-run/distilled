---
name: distilled-sdk-update
description: Move an existing distilled SDK to its mirror's latest spec, regenerate it, audit packages/<pkg>/patches/ with `pnpm patches:audit` and delete or slim the patches the new spec has absorbed, then open the PR. Use for "update <pkg> to the latest spec", "regenerate <pkg>", "audit / remove unused patches", "does the spec still need this patch", or when a provider says they fixed their spec. Building a new SDK is the distilled-sdk skill.
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
```

The audit converts once with every patch, then once per patch with that
patch left out (`DISTILLED_SKIP_PATCHES`, a dev-time seam in
`@distilled.cloud/core/codegen/patches`), and diffs `.generated-specs`:

| Verdict | Meaning | Do |
| --- | --- | --- |
| `🗑 no effect` | the model is byte-identical without it | delete the file |
| `✔ needed` | the model differs; the pointers are listed | keep, and read the diff — it is the patch's description, mechanically |
| `🔗 convert fails without it` | a later patch targets what this one adds | keep both, or delete both |
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
  validation (401/404 on a dummy slug) proves nothing.

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
