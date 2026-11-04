# Working in this repo

`distilled` generates Effect-native SDKs for cloud providers from their API
descriptions. Almost everything under `packages/*/src/services/` is generated
and committed — you will spend more time in generators than in SDK code.

## External contributors

Check every rule before you open a pull request. Reviewers cite these rules by
number.

1. **Fix a spec with a patch.** Typed errors, nullability, sensitive marks,
   missing fields and pagination go in `packages/<pkg>/patches/`, then
   `pnpm generate <pkg>`. Example: a Clerk error code is a body matcher,
   `{ "status": 404, "body": { "/errors/0/code": "resource_not_found" } }`.
2. **Do not edit generated files.** `packages/*/src/services/` comes only from
   `pnpm generate`. Example: a `NotFound` added by hand to
   `services/turnstile.ts` is gone after the next generate.
3. **Do not special-case the spec in a script.** A rule in
   `scripts/convert.ts` or the generator that names a member, shape or
   operation is a patch. Example: `if (name === "environment")` that marks a
   field sensitive becomes a patch on that member.
4. **No `throw`, and no `try`/`catch` that hides a failure, in runtime code.**
   An expected failure is a typed Effect failure. `Effect.die` is only for a
   programmer bug. Example: a bad path label fails with core `InvalidInput`;
   `catch { return {} }` around a config file read hides a broken file.
5. **Reuse what core already has.** Search `packages/core/src/` and recently
   merged PRs before you add a helper, trait, error class or schema walker.
   Example: secrets use `core/src/sensitive.ts`, response headers use
   `T.Header`, debug logs use `TelemetryDebug`, HMAC uses
   `@distilled.cloud/core/crypto`.
6. **Fix it where the problem lives.** A problem every SDK has goes in core. A
   rule of one provider stays in that provider. Example: an Azure path rule in
   core `invalidLabel` would refuse valid S3 keys such as `a//b`.
7. **Show the failing call.** The PR body names the operation, the request
   and the real response, and each patch has evidence (a live response, the
   provider's docs, or its official client). Example: do not add error codes
   that no response has returned.
8. **Use the official spec, through its mirror.** Every SDK is generated from
   the provider's own published API description, pinned in its spec mirror.
   Example: do not hand-write a spec from docs pages, or generate from an
   unmirrored local or beta file.
9. **No tests for patches or one-line fixes.** Core already tests error
   matchers, nullability and sensitive marks. Ask first before you add a test
   for new runtime behaviour. Example: delete a new
   `packages/<pkg>/test/*.test.ts` that only checks a patch's generated shape.
10. **One change per PR.** Do not carry another open PR's commits, and do not
    mix a spec fix with a runtime change. Example: patches plus a new
    credentials precedence are two PRs.
11. **Mark a breaking change with `!`.** A changed public type, a removed
    operation or a new error type in a signature gets `!` in the
    conventional-commit title. Example: `fix(axiom)!: redact API tokens`
    (`string` becomes `string | Redacted<string>`).
12. **Regenerate, stamp and format.** Commit the `pnpm generate <pkg>` output
    with its `distilled.generatedAt` stamp in `package.json`, and let the
    pre-commit hook run `pnpm format`. Use the repo's tools: Node scripts,
    vitest and pnpm. Example: `import.meta.dir` and `bun:test` fail CI.
13. **Pair an Alchemy-facing change with an Alchemy PR.** If the change breaks
    a type that alchemy-run/alchemy uses, link the companion PR there.
    Example: moving an operation to `unstable/` needs the Alchemy resource
    moved too.
14. **Allow edits by maintainers.** Keep the box ticked so a maintainer can
    merge `main` and regenerate. Example: a fork PR without it waits until
    the author rebases it.

## Getting the repo

```sh
git clone --depth=1 https://github.com/alchemy-run/distilled.git
cd distilled
pnpm install
```

That is a complete checkout: ~490 MB, of which ~400 MB is the committed
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
pnpm typecheck              # tsrs -b — fast, does NOT check generated code (see below)
pnpm typecheck:ci           # tsrs -b --noCheck false — what CI runs
pnpm --filter "./stacks/*" run typecheck
pnpm specs:check            # spec-mirror coherence; also a CI gate
pnpm format                 # oxfmt, not prettier
pnpm lint                   # oxlint
pnpm generate [<pkg>…]      # convert + generate + format; all packages if no args
pnpm patches:audit <pkg>    # which of packages/<pkg>/patches/ the spec no longer needs
pnpm patches:names <pkg>    # final ← upstream shape ids (patches use upstream ids)
```

Package manager is pnpm 12 (`packageManager` pins it), Node 24
(`.node-version`). Node runs the scripts under `scripts/` and
`packages/*/scripts/` directly (native TypeScript type stripping). A script
that imports a workspace package (`@distilled.cloud/*`) runs with
`node --conditions=bun`, which resolves it to `src/*.ts` through the `bun`
export condition; without the flag Node picks the tsrs-built `lib/`. Keep the
flag off scripts that don't need it and out of workspace-wide `NODE_OPTIONS`:
third-party packages (srvx, h3, alchemy, …) ship Bun-only builds under the
same condition. Tests use vitest: `pnpm vitest run
<paths>`. A `pre-commit` hook runs `pnpm format`.

## Things that will surprise you

- **The generator is its own package.** `packages/dev`
  (`@distilled.cloud/dev`, private, never published) holds the codegen
  (`src/codegen/`) and the SDK test helpers (`src/testing.ts`). Packages list
  it in `devDependencies`; no SDK imports it at runtime. `@distilled.cloud/core`
  is the runtime only.

- **`tsconfig.base.json` sets `noCheck: true`.** Day-to-day `tsrs -b` emits the
  generated SDKs without checking them, because checking 20 generated SDKs
  costs minutes and gigabytes. If you changed a generator, run
  `pnpm typecheck:ci` — that is the gate that catches generator bugs.
- **Never diff a regeneration before formatting.** Generated output is
  committed formatted; `pnpm generate` formats at the end for this reason. Diff
  before that and every file looks changed.
- **Every successful generate stamps `distilled.generatedAt` and
  `distilled.specUpdatedAt`** (UTC `YYYY-MM-DD`) in the package's
  `package.json`: when the SDK was generated, and when its spec last changed
  in the mirror. Commit them with the regenerated code. The spec date needs
  the mirror checked out; the generator deepens the shallow submodule (no
  file content) to find it.
- **Patch the model, not the generated TypeScript.** Edits under
  `packages/*/src/services/` are erased by the next `pnpm generate`. Patches
  live in `packages/<pkg>/patches/` as RFC-6902 ops on the converted Smithy
  model, under the names the spec gives (`pnpm patches:names <pkg>`).
  The converted models are not committed: `generate` keeps them in memory.
  To read them, run the package's `convert`, which writes them to the
  gitignored `.generated-specs/`.
- **`stacks/*` are workspace members but are not in the root tsconfig's
  project references,** so `tsrs -b` never sees them. They have their own
  `typecheck` scripts and their own CI job.
- **Other agents may share this checkout.** `git status` can show hundreds of
  files you did not touch. Stage explicit paths — never `git add -A`.

## Going deeper

- Adding a provider, sourcing a spec, or working on a mirror:
  the `distilled-sdk` skill in `.agents/skills/distilled-sdk/`.
- Updating a provider to its latest spec and pruning patches it no longer
  needs (`pnpm patches:audit <pkg>`): the `distilled-sdk-update` skill in
  `.agents/skills/distilled-sdk-update/`.
- Correcting a spec with a patch (typed errors, nullability, sensitive
  fields, response shapes): the `distilled-sdk-patch` skill in
  `.agents/skills/distilled-sdk-patch/`.
- How the mirrors are created and kept in shape:
  `stacks/distilled-submodules/README.md`.
- Open work: `todo.md`.
