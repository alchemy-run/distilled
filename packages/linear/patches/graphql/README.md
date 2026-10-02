# Linear GraphQL error contracts

The native GraphQL generator reads the complete mirrored introspection schema,
normalizes it to `.generated-graphql/linear.json`, and applies the RFC 6902
files in this directory in filename order. The patch format and matcher rules
are the same as Railway's; see
[`packages/railway/patches/graphql/README.md`](../../../railway/patches/graphql/README.md).

Regenerate after editing a patch (drop `DISTILLED_SPECS_LOCAL=1` once
`spec-mirror-linear` exists):

```sh
pnpm specs:local linear
DISTILLED_SPECS_LOCAL=1 pnpm generate linear
```

## Evidence

Observed against `api.linear.app/graphql` on 2026-10-02 with a personal API
key for a test workspace, unless noted.

| Tag | Wire | Observed response |
| --- | --- | --- |
| `LinearAuthenticationError` | `extensions.code: "AUTHENTICATION_ERROR"`, no path | HTTP 401, message `Authentication required, not authenticated`, `extensions.type: "authentication error"`. |
| `LinearRateLimited` | `extensions.code: "RATELIMITED"` | Not observed. Documented at [linear.app/developers/rate-limiting](https://linear.app/developers/rate-limiting): HTTP 400, no `Retry-After`; reset times are epoch milliseconds in `X-RateLimit-Requests-Reset` and `X-RateLimit-Complexity-Reset`. Retryable, so queries are retried with the client's bounded backoff. |
| `LinearValidationError` | `extensions.code: "GRAPHQL_VALIDATION_FAILED"`, no path | HTTP 400 for a selection of an unknown field. |
| `LinearInvalidInput` | `extensions.code: "INVALID_INPUT"` or `"INPUT_ERROR"`, path is the root field | HTTP 200, `data: null`. `INVALID_INPUT` (message `Argument Validation Error`) carries `extensions.validationErrors[]` per input property. |
| `LinearNotFound` | `extensions.code: "INPUT_ERROR"` and message containing `Entity not found` | HTTP 200, `data: null`, message `Entity not found: Team` for `team(id:)` and `Entity not found: IssueLabel` for `issueLabelDelete(id:)`. |

Every error also carries `extensions.type`, `extensions.userError` and
`extensions.userPresentableMessage`, which stay available on the tagged
error's `extensions`.
