# Working in this repo

`distilled` generates Effect-native SDKs for cloud providers from their API
descriptions. Almost everything under `packages/*/src/services/` is generated
and committed — you will spend more time in generators than in SDK code.

## Getting the repo

```sh
git clone --depth=1 https://github.com/alchemy-run/distilled.git
cd distilled
pnpm install
```

That is a complete checkout: ~840 MB, of which ~770 MB is the committed
generated SDKs. Drop `--depth=1` only if you need history.

**Do not clone with `--recursive`, and never pass `--recursive` to
`git submodule`.** The submodules under `packages/*/specs/` are spec mirrors —
one small repository per package, holding only the description files that
package's generator reads. Recursion and full history are what this layout
exists to avoid; every command below is `--depth=1` and non-recursive, and
`.gitmodules` sets `shallow = true` on every entry.

After a plain clone, `git submodule status` lists 24 mirrors, all
uninitialised, and every `packages/*/specs/spec-mirror-*/` directory is empty.
**That is the correct state, not a broken checkout** — see the next section.

## You probably do not need the specs

CI never checks out a submodule and never runs the generator. The generated
SDKs are committed, so `pnpm install && pnpm typecheck` is a complete,
working checkout for anything that is not a codegen change.

Fetch specs only when you are going to regenerate:

```sh
pnpm specs:sync                                        # all mirrors, tip commit only
pnpm --filter @distilled.cloud/<pkg> run specs:fetch   # just one
pnpm --filter @distilled.cloud/<pkg> run specs:update  # move one to the mirror's latest
```

`pnpm specs:sync` adds ~406 MB across 24 mirrors, so prefer `specs:fetch` for
the one package you are working on. Skipping specs entirely is not an error —
a generator that needs one fails with a message naming the missing path.

If you cannot create a mirror (they live in an org you likely cannot write
to), `pnpm specs:local <pkg>` fetches into a gitignored working copy shaped
exactly like the mirror, and `DISTILLED_SPECS_LOCAL=1 pnpm generate <pkg>`
reads it. Nothing committed may reference that directory; `pnpm specs:check`
enforces it.

## Everyday commands

```sh
pnpm typecheck              # tsc -b — fast, does NOT check generated code (see below)
pnpm typecheck:ci           # tsc -b --noCheck false — what CI runs
pnpm --filter "./stacks/*" run typecheck
pnpm specs:check            # spec-mirror coherence; also a CI gate
pnpm format                 # oxfmt, not prettier
pnpm lint                   # oxlint
pnpm generate [<pkg>…]      # convert + generate + format; all packages if no args
```

Package manager is pnpm 11 (`packageManager` pins it), Node 24
(`.node-version`). Bun runs the scripts under `scripts/` and
`packages/*/scripts/`, so you need both on PATH. A `pre-commit` hook runs
`bun format`.

## Things that will surprise you

- **`tsconfig.base.json` sets `noCheck: true`.** Day-to-day `tsc -b` emits the
  generated SDKs without checking them, because checking 20 generated SDKs
  costs minutes and gigabytes. If you changed a generator, run
  `pnpm typecheck:ci` — that is the gate that catches generator bugs.
- **Never diff a regeneration before formatting.** Generated output is
  committed formatted; `pnpm generate` formats at the end for this reason. Diff
  before that and every file looks changed.
- **Patch the spec, not the generated TypeScript.** Edits under
  `packages/*/src/services/` are erased by the next `pnpm generate`. Patches
  live in `packages/<pkg>/patches/` as RFC-6902 `*.patch.json`.
- **`stacks/*` are workspace members but are not in the root tsconfig's
  project references,** so `tsc -b` never sees them. They have their own
  `typecheck` scripts and their own CI job.
- **Other agents may share this checkout.** `git status` can show hundreds of
  files you did not touch. Stage explicit paths — never `git add -A`.

## Going deeper

- Adding a provider, sourcing a spec, or working on a mirror:
  the `distilled-sdk` skill in `.agents/skills/distilled-sdk/`.
- How the mirrors are created and kept in shape:
  `stacks/distilled-submodules/README.md`.
- Open work: `todo.md`.
