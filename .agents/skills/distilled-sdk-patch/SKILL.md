---
name: distilled-sdk-patch
description: Add or change a patch in packages/<pkg>/patches/ to correct a distilled SDK's upstream spec — a missing error response or typed error (status, code, message, body or header matchers), a field that should be nullable or optional, a secret with no sensitive mark, a wrong response schema, or a shared model that needs splitting — then regenerate and read the generated diff to confirm it changes exactly what the patch says. Also for merging, slimming or rebasing an existing patch PR. Use for "patch <pkg>", "type this error", "this field is null on the wire", "mark X sensitive", or any fix that would otherwise be an edit to generated code. Moving to a newer spec and pruning patches is distilled-sdk-update.
---

# Patching a distilled SDK

A patch is a claim that the upstream description is wrong about the wire.
It lives in `packages/<pkg>/patches/` and is committed together with the
`.generated-specs/` and `src/services/` it produces. Every package runs the
same pipeline (engine: `packages/core/src/codegen/patches.ts`):

1. convert the spec to a Smithy model, shapes named the way the spec names
   them;
2. apply the patches: RFC-6902 ops on that model (`/shapes`, `/metadata`),
   in `finalizeConvert`;
3. rename operations to verbNoun;
4. write `.generated-specs/` — the patched, renamed model generate compiles.

A patch never edits the spec (`/paths`, `/components`, `/definitions`);
convert rejects one that does. Stale pointers fail the run, and operation
names are `operationNames` in convert, never a patch (`distilled-sdk`
skill, step 5). Railway's GraphQL patches are the one exception: Railway
has no Smithy model.

## Step 1 — have evidence

Write down the request and the response before writing a patch: status,
headers, body, and which operation. A patch built from reading the spec
alone guesses at the wire, and a wrong patch is worse than none — it gives
callers a type they trust.

- A live call is best. Create throwaway resources, trigger the case, tear
  them down, and never print credentials.
- An upstream error catalogue, a provider SDK's source, or an issue where
  someone pasted the response are acceptable; name the source in the
  description.
- A probe that never reached the code path proves nothing: a 401 or a 404
  on a dummy slug says nothing about what a real request returns.

## Step 2 — pick the file

| Package shape | Where the patch goes |
| --- | --- |
| One model (`planetscale`, `neon`) | flat `patches/<topic>.patch.json` |
| Several models (`posthog`, `kubernetes`, `azure`, `gcp`, `fly-io`) | `patches/<model>/<topic>.json` — `<model>` is the `.generated-specs/<model>.json` it patches. `axiom` passes one patches dir per spec (`patches/v1-edge-ingest/`); follow its `convert.ts` |
| Cloudflare | `patches/<service>/<operation>.json`; error shapes shared by a service go once in `patches/<service>/_errors.json` |
| AWS | `patches/<sdkId>.json` — a typed config for `applyAwsSpecPatches` (`errors`, `syntheticErrors`, `errorCategories`, `enums`, …), not RFC-6902. Follow the neighbours. |

Read the package's existing patches first and extend the file that already
covers the same kind of fix: one file for every omitted error status, one
per shape family for nullability. A new file is for a new kind of fix.
Files apply in name order with `*.manual.json` last; a numbered prefix
(`neon`'s `001-…`) is only needed when one file builds on another.

Every file has a `description` that says what the spec gets wrong, what the
wire does instead, and where that was observed (with a date for live
probes). It is the bug report sent upstream, and it must stay true as the
file changes.

## Step 3 — pick the pointer

Every pointer is `/shapes/<namespace>#<Shape>/…` on the converted model.
Patches apply *before* the verbNoun rename, so they name shapes the way the
spec does (`AppIPAssignmentsCreate`, not the `CreateAppIPAssignment` in
`.generated-specs/`). Find the id with:

```sh
pnpm patches:names <pkg> CreateAppIPAssignment
# machines: com.flyio.machines#CreateAppIPAssignment ← com.flyio.machines#AppIPAssignmentsCreate
```

A shape `names` does not list keeps its `.generated-specs` id. A shape a
patch adds keeps the id the patch gives it — use the final name you want;
one that takes an id the rename needs fails the convert.

A model keeps its own copy of every schema it uses, and convert inlines
some as per-operation shapes (`PaginatedDatabaseBranchDataItem`). A fix to
a shared schema is one op per copy; the generated diff in step 5 shows
every shape a patch touched, so a missed copy is visible.

## Recipes

**Undocumented error status.** Point the operation's `errors` at the
model's error shape for that status (OpenAPI convert names them
`BadRequest`, `Forbidden`, `NotFound`, `Conflict`, `UnprocessableEntity`;
`401`/`429`/`500`/`503` are global). `add …/errors` when the operation has
no list yet, `…/errors/-` when it has one:

```json
{ "op": "add",
  "path": "/shapes/com.neon.api#GetProject/errors",
  "value": [{ "target": "com.neon.api#NotFound" }] }
```

When the model has no shape for that status yet, add one the way the next
recipe does, with `smithy.api#error` and `smithy.api#httpError`.

**Error that needs its own class** — the status is shared by several
failures, the status is not in the map above, or the API reports failure
inside a 2xx. Add an error shape with matchers and append it to the
operation's `errors`:

```json
{ "op": "add",
  "path": "/shapes/com.flyio.machines#NetworkNotFound",
  "value": {
    "type": "structure",
    "members": { "message": { "target": "smithy.api#String" } },
    "traits": {
      "smithy.api#error": "client",
      "com.distilled.openapi#errorMatchers": [
        { "status": 400, "message": { "includes": "network not found" } }
      ] } } },
{ "op": "add",
  "path": "/shapes/com.flyio.machines#AppIPAssignmentsCreate/errors/-",
  "value": { "target": "com.flyio.machines#NetworkNotFound" } }
```

- The trait id is whatever the package's `generate.ts` passes as
  `errorMatchersTrait` (`com.distilled.openapi#errorMatchers` for OpenAPI
  packages; `com.cloudflare.protocols#…`, `com.gcp.protocols#…` elsewhere).
  A generator that sets none ignores matchers — check before relying on
  them.
- A matcher's fields all have to match; separate matchers on one class are
  alternatives. Fields are `code`, `status`, `message` (exact string, or
  `{ includes }` / `{ matches }`), `body` (JSON pointer → scalar or text
  matcher, e.g. `{ "/success": false }`), and `headers` (name →
  text matcher). The most specific match across the operation's classes
  wins, one point per field, so a message matcher beats a bare status
  matcher on the same status. Match on the stable part of the response — a
  numeric code or an error type — before free text.
- The error's category (`BadRequestError`, `ServerError`, `RetryableError`,
  …) comes from `smithy.api#httpError` and `smithy.api#retryable`
  (`errorCategories` in `packages/core/src/codegen/generator.ts`), and
  retry policies act on those categories. Set them deliberately: a client
  error that arrives as a 5xx should not be retried as a server error.
- `add` at an array index inserts (RFC 6902), so `…/errors/0` puts a class
  first; `-` appends.

**Field is null or missing on the wire.** Being nullable and being
required are independent. A field that is sometimes absent loses its
`smithy.api#required` trait (`remove …/members/<name>/traits/smithy.api#required`);
one that is present but sometimes `null` gets the package's nullable trait
(`com.distilled.openapi#nullable` for OpenAPI packages:
`add …/members/<name>/traits/com.distilled.openapi#nullable` with `{}`).
Say which fields changed in the description.

**Secret without a sensitive mark.** `add
…/members/<name>/traits/smithy.api#sensitive` with `{}`. Convert already
marks names matching its default patterns (`password`, `api_token`,
`plain_text`, …; `isSensitiveProperty` in
`packages/core/src/codegen/openapi.ts`), so check the generated type is not
already `Redacted` before adding one.

**One operation returns more than the shared shape promises.** Add a copy
of the shape under a new name, change the copy, and re-point only that
operation's member or output at it, so the other operations keep the shared
one. A response shape that is simply wrong gets its `target` replaced.

## Step 4 — regenerate

```sh
pnpm generate <pkg>
```

Always regenerate with `pnpm generate <pkg>`, even for one service. It
converts, generates and formats; a bare `convert` (with or without
`--resource`) leaves `.generated-specs/` unformatted, and the diff then
shows every file as changed.

Do not add a per-package test for the patch. The generated diff in the next
step shows what the patch changes, and the behaviour it relies on (error
matchers, nullability, sensitive members) is tested once in
`packages/core`. When updating an existing patch PR that added one, delete
that test in the same update.

## Step 5 — check the change

```sh
git diff origin/main -- packages/<pkg>/.generated-specs packages/<pkg>/src/services
```

Diff against `origin/main` so a patch already committed on a PR branch
still shows up. Read the diff against the description:

- exactly the shapes and members meant changed — done.
- nothing changed — the spec already says this (drop the patch), or the
  pointer landed somewhere convert does not read.
- more changed than intended — the patch reaches further than meant (a
  shared shape, say); narrow it.

Do not run `pnpm patches:audit` here. A patch is written to change the
model, and the diff above already shows whether it did. The audit answers
a different question — which patches the spec has absorbed — once the spec
has moved underneath them. That is the `distilled-sdk-update` skill's job.

Then check the generated TypeScript reads the way a caller needs, run
`pnpm exec tsc -b packages/<pkg> --noCheck false`, and commit the patch
with the `.generated-specs/` and `src/services/` it produced, as
`fix(<pkg>): …` naming what callers gain ("type 422s observed on the live
API").
