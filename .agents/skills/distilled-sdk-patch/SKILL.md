---
name: distilled-sdk-patch
description: Add or change a patch in packages/<pkg>/patches/ to correct a distilled SDK's upstream spec — a missing error response or typed error (status, code, message, body or header matchers), a field that should be nullable or optional, a secret with no sensitive mark, a wrong response schema, or a shared model that needs splitting — then regenerate and prove the patch does exactly what it says with `pnpm patches:audit`. Use for "patch <pkg>", "type this error", "this field is null on the wire", "mark X sensitive", or any fix that would otherwise be an edit to generated code. Moving to a newer spec and pruning patches is distilled-sdk-update.
---

# Patching a distilled SDK

A patch is a claim that the upstream description is wrong about the wire.
It lives in `packages/<pkg>/patches/`, applies during `convert`, and is
committed together with the `.generated-specs/` and `src/services/` it
produces. How convert applies patches (OpenAPI pointers before convert,
Smithy pointers after, stale pointers fail the run, operation names are
`operationNames` in convert and never a patch) is in the `distilled-sdk`
skill, step 5.

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
| One OpenAPI spec (`planetscale`, `neon`) | flat `patches/<topic>.patch.json` |
| Several specs in one package (`fly-io`, `gcp`, `axiom`) | a subdirectory per spec — whichever one the package's `convert.ts` passes as its patches dir (`patches/machines/`, `patches/aiplatform_v1/`, `patches/v1-edge-ingest/`) |
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

Patch the **spec** (`/paths`, `/components`, `/definitions`) when the fix is
something the spec's own language can say — a response status, `nullable`,
a `required` list, `x-sensitive`, a schema. The next spec update audits
these naturally: when upstream publishes the same fix, the patch stops
changing the model and `pnpm patches:audit` flags it.

Patch the **Smithy model** (`/shapes/<namespace>#<Shape>`) for what the
spec cannot say — mostly typed errors with matchers. Smithy shape names are
derived by convert (inline schemas become names like
`PaginatedDatabaseDataItem`), so open `.generated-specs/<model>.json` and
copy the exact id rather than guessing it.

Schemas the spec inlines are separate copies. A fix on
`/definitions/ServiceToken` does not reach the inlined item schema of
`PaginatedServiceToken`; patch each copy (the audit diff in step 5 lists
every shape a patch touched, so missing copies are visible).

## Recipes

**Undocumented error status that maps to a standard class.** OpenAPI
convert turns `400`/`403`/`404`/`409`/`422` responses into `BadRequest`,
`Forbidden`, `NotFound`, `Conflict` and `UnprocessableEntity`, and treats
`401`/`429`/`500`/`503` as global. Add the response to the spec:

```json
{ "op": "add",
  "path": "/paths/~1databases~1{id}/delete/responses/422",
  "value": { "description": "Unprocessable Entity" } }
```

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
  "path": "/shapes/com.flyio.machines#CreateAppIPAssignment/errors/-",
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

**Field is null or missing on the wire.** In the spec:
`x-nullable: true` (Swagger 2.0), `nullable: true` (OpenAPI 3.0), or `null`
in the `type` array (3.1). Being nullable and being required are
independent: a field that is always present but sometimes null keeps its
`required` entry; a field that is sometimes absent leaves the `required`
list (a `replace` of the whole list — say which fields left in the
description).

**Secret without a sensitive mark.** `x-sensitive: true` on the string
property. Convert already marks names matching its default patterns
(`password`, `api_token`, `plain_text`, …; `isSensitiveProperty` in
`packages/core/src/codegen/openapi.ts`), so check the generated type is not
already `Redacted` before adding one.

**One operation returns more than the shared schema promises.** Copy the
schema to a new name, change the copy, and re-point only that operation's
response — the PlanetScale `password-with-secret` patch gives create and
renew a `plain_text` that is never null while get and list keep the shared
nullable one. A response schema that is simply wrong gets its `$ref`
replaced.

## Step 4 — regenerate

```sh
pnpm generate <pkg>
```

For a failure a caller will branch on (a typed error, a response split),
add a fixture test next to the package source that stubs the HTTP response
and asserts the class or the decoded shape — `packages/neon/src/branch.test.ts`
is the pattern. It keeps the classification when a later regeneration
moves things.

## Step 5 — prove the patch

```sh
pnpm patches:audit <pkg> --only <file> --ops
```

The audit (`distilled-sdk-update`, step 3) converts with and without the
file and lists every pointer in the model that changed. Read that list
against the description:

- **needed**, and the changed shapes are exactly the ones meant — done.
- **no effect** — the spec already says this (delete the patch) or the
  pointer landed somewhere convert does not read.
- extra shapes changed — the patch reaches further than intended; narrow it.
- an op reported with no effect under `--ops` — remove it.

Then check the generated TypeScript reads the way a caller needs, run
`pnpm exec tsc -b packages/<pkg> --noCheck false`, and commit the patch
with the `.generated-specs/` and `src/services/` it produced, as
`fix(<pkg>): …` naming what callers gain ("type 422s observed on the live
API").
