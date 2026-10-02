# Linear GraphQL error contracts

The native GraphQL generator reads the complete mirrored introspection schema,
normalizes it to `.generated-graphql/linear.json`, and applies the RFC 6902
files in this directory in filename order.

Patch schema coordinates, not generated TypeScript or baked query documents:

```json
{
  "description": "Record the exact live response and why this tag applies",
  "patches": [
    {
      "op": "add",
      "path": "/errors/LinearNotFound",
      "value": {
        "description": "An entity the operation references does not exist.",
        "category": "notFound",
        "matchers": [
          { "code": "INPUT_ERROR", "messageIncludes": "Entity not found" }
        ]
      }
    },
    { "op": "replace", "path": "/globalErrors", "value": ["LinearNotFound"] }
  ]
}
```

Matchers support exact `code`, exact `message`, and case-sensitive
`messageIncludes`; a matcher with both code and message wins over one with
code alone. Linear reuses the same `extensions.code` values across the whole
graph, so every tag here is in `globalErrors`. Attach a tag to one coordinate
(`/types/<Type>/fields/<field>/errors/-`) only for an error a single field
raises.

Regenerate after editing a patch:

```sh
pnpm --filter @distilled.cloud/linear run specs:fetch   # once
pnpm generate linear
```

Conversion fails on stale JSON pointers, dangling type references, or unknown
error tags.

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
