# Neon backend verification

Observed on 2026-09-17. This report contains fixture values only, not credentials, signed URLs, connection strings, or customer resource identifiers.

## SDK scope and verification

- Refreshed only the shallow, nonrecursive Neon mirror to `1a4da76784698f871455315a81cd8c1e25a18479`. The mirrored OpenAPI document matched the public upstream at verification time.
- Regenerated 163 operations, preserving all 158 existing operation names and adding trigger create/get/list/update/delete.
- ZIP inputs support `Blob`, `Uint8Array`, and `ArrayBuffer`. The multipart environment is one JSON string; empty deletion values are preserved on the wire.
- Credential issue/reveal/rotate secrets and presigned URLs are redacted. Debug logging excludes payloads and resolved URLs. Cross-origin redirect coverage verifies account authorization is not forwarded.
- Binary downloads return `Uint8Array`, without UTF-8 conversion. Nullable Function/deployment fields and both trigger discriminants have schema regressions.
- Before the Auth email follow-up below, the core and SDK regression run passed **330 tests, zero failures**. Earlier isolated live acceptance passed twice, including native Function invocation, credential recovery/revocation, both trigger types, presigned upload, byte-exact binary download, and cleanup. These passes do **not** establish update propagation.

Commands run from the Distilled root:

```sh
timeout 240 bun test packages/core/src packages/neon/src/backend.test.ts packages/neon/src/backend.types.test.ts stacks/distilled-submodules/spec-repos/neon/fetch-specs.test.ts --timeout 90000
NEON_SDK_LIVE=1 timeout 240 bun test packages/neon/src/backend.live.test.ts --timeout 120000
bun scripts/specs.ts check
```

Regeneration runs from `packages/neon` with `bun scripts/convert.ts && bun scripts/generate.ts`. The generator formats its output. Two consecutive convert/generate/format runs after the independent-review fixes produced identical hashes for `.generated-specs/neon.json`, `src/services/neon.ts`, and `src/services/index.ts`.

## Compile history: SDK and generator verified before the Auth follow-up

The coordinator's authoritative workspace check reported unknown Effect requirements from generated `S.Schema<T>` annotations and inference errors in a mixed Function/Trigger effect array. In Effect 4, `Schema<T>` leaves decoding services unspecified.

The generator now offers an opt-in `schemaType: "Codec"`. Neon uses service-free `S.Codec<T>` annotations for generated structures, lists, maps, raw responses, and its custom union/binary schemas. Other providers retain their existing default. The heterogeneous test calls are separate, and compile assertions require the relevant schemas' decoding services to be `never`.

No downstream service casts or suppressions were added. `noCheck: false` remains enabled for Neon. The coordinator reran `pnpm --config.verify-deps-before-run=false exec tsc -b submodules/distilled/packages/neon/tsconfig.json submodules/distilled/packages/neon/tsconfig.scripts.json` successfully (exit 0). The broader Alchemy workspace still has integration errors; that is a separate gate. Bun's passing runtime tests alone do not verify TypeScript assertions. Integration review and live update propagation remain outstanding.

`getProjectBranch` already declares and constructs `NotFound`. No SDK error change was needed for the Alchemy Branch helper's redundant catch.

## Independent-review corrections

- `DeleteProjectBranchRequest.hard_delete?: boolean` is restored by `004-branch-hard-delete-compatibility.patch.json`. The pinned mirror's delete-operation parameters are empty and its update commit supplies no removal rationale. This patch preserves the prior SDK source/wire contract; it does not establish current server acceptance or entitlement for the preview parameter. No cloud probe was run. Wire tests verify `true`/`false` go in the query, omission stays omitted, and no request body is added. Compile fixtures retain the optional boolean contract.
- Sensitive values now use genuine plain-string/`Schema.Redacted(Schema.String)` unions before nullability and protocol annotations, via Neon's opt-in member-schema generator hook. Validation and same-type encoding preserve returned credential secrets, presigned URLs, and redacted environment values. Invalid redacted inner values are rejected. Generic JSON encoding refuses redacted secrets; the authenticated protocol remains responsible for explicit wire unwrapping.
- Binary response detection dereferences a component schema to inspect `format`, then converts the original schema. Both inline and referenced binary responses have regressions; the reference-site nullability survives conversion.

After these review corrections, the coordinator reran the Neon source and scripts build-mode typecheck and checked shared core with `tsc --noEmit --noCheck false -p submodules/distilled/packages/core/tsconfig.json`; both exited 0. An independent coordinator regression run passed all 330 tests across 10 files. `README.md`, public import paths, and existing live-probe results were preserved. No additional live probe ran.

## Auth email discriminator follow-up

The public [OpenAPI document](https://neon.com/api_spec/release/v2.json) still matched the pinned mirror. It and the [email-provider API documentation](https://api-docs.neon.tech/reference/updateneonauthemailprovider) declare `type` mappings of `standard` and `shared` for both email configuration unions, but omit that member from their constituent schemas. `005-auth-email-discriminators.patch.json` adds the evidenced required literal to `StandardEmailServer`, `StandardEmailServerResponse`, and `SharedEmailServer`. Existing optional PATCH fields, required response fields, and sensitivity remain unchanged; no nullable fields were changed or invented.

Neon's generator now emits service-free, literal-discriminated codecs for both email configuration unions instead of `S.Unknown`. Initial wire regressions exposed a separate shared REST defect: `wrapSensitive` skipped multi-arm unions, returning the SMTP password as plaintext. The walker now conservatively redacts members marked sensitive by any arm, including incomplete responses. Coverage includes nested arrays, optional/nullable wrappers, and repeated redaction.

The required bounded regression command above passed **338 tests across 10 files, zero failures** (630 assertions). The eight added tests cover redacted-password PATCH serialization, omitted fields, response redaction through codecs/JSON/inspection/debug diagnostics, required discriminator validation, generic JSON encoding protection, compile fixtures, and the shared union walker. The compile fixture adds 13 assertions for discriminator narrowing, optional inputs, required outputs, sensitive types, and service-free codecs. Bun does not typecheck these assertions.

Only Neon was regenerated, retaining **163 operations** and producing **748 shapes**. Two consecutive convert/generate/format runs produced identical SHA-256 hashes:

- `.generated-specs/neon.json`: `17dbb3038c53c206f87b888cd05a9989f22a7d6ccea2023f85ba6a0b9c0e5b29`
- `src/services/neon.ts`: `6d58ee039d01ec3b43e972f7b2c1972b83f171f2683b8b4cc0b14537a9dc2450`
- `src/services/index.ts`: `d520cc0aaf5fcb931962e09fc5dd4ecd27f9993fb6ee19231139f6a90a693403`

The coordinator independently reran the Neon source/scripts build-mode typecheck and shared core's `tsc --noEmit --noCheck false` check after this follow-up; both exited 0. The independent bounded regression run passed all **338 tests across 10 files**. `README.md`, the mirror revision, and prior live-probe history remain unchanged. No additional typed API error gap was observed. The existing Function update-propagation blocker below is unchanged and was not retested.

## S3-compatible storage server-error follow-up

Repeated Alchemy `WriteObject` calls isolated an S3 PUT response with HTTP 500 and an HTML body without a structured error code. AWS REST-XML decoding turned that response into `ParseError`, preventing the existing bounded transient-error retry policy from applying. The upstream cause of the HTTP 500 remains unknown.

The REST-XML error decoder now returns the existing `InternalError` classification for code-less 5xx bodies, including HTML, JSON, plain text, incomplete XML errors, and otherwise unmapped empty-body server failures. Structured codes and malformed 4xx behavior remain unchanged. The fallback retains no raw response body. This is a protocol correction; no generated AWS model or Neon management API shape changed.

`timeout 240 bun test packages/aws/src/client/response-parser.test.ts --timeout 90000` passed 34 tests (95 assertions), including the existing Lambda error regressions. After the correction, Alchemy's combined live storage run passed all five tests covering native and Effect Functions, RPC-backed local Functions, Workers and Lambda, with eight consecutive typed writes and normal stack cleanup. This passing run does not identify the upstream server fault or prove it cannot recur.

## Main integration (2026-09-20)

Merged main `71455a8c2` into the companion branch. The remaining diff is scoped to Neon, its shared generator/protocol/pagination support, and the S3-compatible storage error correction described above. Incoming Boat, Daytona, STACKIT, Fly, and Cloudflare changes remain main history rather than additions in the PR diff.

The merged regression run exposed strict XML parsing failures before the existing code-less 5xx fallback. The decoder now handles typed `ParseError` only for server-error responses; malformed 4xx responses still fail parsing, structured error codes remain intact, and server-error fallback values retain no response body. Added malformed XML to the same server/client error matrix. All **607 tests across 15 files** passed (845 assertions), and a strict scoped check of the generator, Neon type fixtures, and AWS parser/tests passed. Full SDK CI remains the publication gate.

## Observed API details

- A missing Function returns `NotFound: function not visible on branch`.
- A missing trigger returns `NotFound: function trigger not visible on branch`.
- Both observed 404 responses are declared in the OpenAPI patch chain.
- Revoked credentials remain in `listCredentials` with `revoked_at`; a retained metadata row is not evidence that a credential is active.

## Blocker: config-only environment updates

The initial native Function returned `{"ok":true,"value":"first"}`. A config-only deployment containing `{"DISTILLED_PROBE":"second"}` received a new deployment ID, and the control plane reported that ID active. Invocation nevertheless returned `{"ok":true,"value":"first"}` after eight two-second polls.

A separate empty-string deletion, `{"DISTILLED_PROBE":""}`, also retained `first` instead of the expected `null`. The wire regression confirms the SDK submits exactly one environment part with the expected JSON and omits ZIP for a config-only change.

The runtime assertion remains explicitly gated by `NEON_SDK_VERIFY_ENV_UPDATES=1`. The ordinary live acceptance checks deployment metadata, not successful runtime environment replacement. No typed API rejection or entitlement error occurred: the API calls succeeded and the invocation assertions failed.

## One bounded full-ZIP probe

To distinguish an environment-only defect from general invocation staleness, one additional probe used a separate deterministic project, `distilled-neon-backend-companion-full`, and three distinct checked-in ZIP fixtures. Each native handler reports its own code version and `process.env.DISTILLED_PROBE ?? null`.

| Stage | Submitted ZIP code | Submitted environment value | Expected invocation | Observed invocation |
| --- | --- | --- | --- | --- |
| Initial deployment | `v1` | `first` | `{"code":"v1","value":"first"}` | `{"code":"v1","value":"first"}` |
| Full replacement | `v2` | `second` | `{"code":"v2","value":"second"}` | `{"code":"v1","value":"first"}` |
| Full replacement and removal | `v3` | empty string | `{"code":"v3","value":null}` | `{"code":"v1","value":"first"}` |

All three active-deployment ID assertions passed. Each update invocation exhausted eight one-second polls. The probe collected all three observations before asserting, deleted its owned project, and verified zero matching projects remained. It failed the final invocation assertion after about 21 seconds. It was run **once**, without a blind retry:

```sh
NEON_SDK_LIVE=1 NEON_SDK_FULL_REDEPLOY=1 timeout 240 bun test packages/neon/src/backend.live.test.ts -t 'full ZIP redeployment' --timeout 120000
```

**Conclusion:** Including a fresh ZIP did not establish a working update path within this bounded probe. The stale code marker means the failure is not proven to be environment-specific. Do not claim that always attaching ZIP fixes Alchemy environment updates. The precise platform/routing/cache cause and longer-term convergence remain unverified. The failing probe is opt-in through `NEON_SDK_FULL_REDEPLOY=1`.

No credits were purchased, account settings changed, or existing user resources mutated. Every probe created its own project, refused to take over an existing project with that name, and cleaned up its owned resources.
