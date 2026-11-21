# @distilled.cloud/core

The shared runtime behind every [distilled](https://distilled.cloud) SDK. It
sends the requests, decodes the responses, retries, paginates and turns
provider errors into typed Effect failures.

You do not need to install it yourself. Each SDK, for example
`@distilled.cloud/aws` or `@distilled.cloud/cloudflare`, depends on it. To get
started, read the [root README](https://github.com/alchemy-run/distilled#readme)
and the README of the SDK you use.

## What it holds

Each module is its own import path, `@distilled.cloud/core/<module>`.

| Module | What it does |
|---|---|
| `retry` | Retry policies and backoff. Each SDK re-exports them as its own `Retry` |
| `category` | Error categories (`AuthError`, `ThrottlingError`, `NotFoundError` and the rest) with `is*` and `catch*` helpers |
| `errors` | Shared HTTP errors such as `Unauthorized`, `NotFound` and `TooManyRequests` |
| `sdk-error` | `SdkError`, the failure for a call this SDK cannot make |
| `sensitive` | Redaction of fields the spec marks as secrets |
| `pagination` | Paginated operations as a `Stream` |
| `telemetry`, `telemetry-metrics` | A span for each call, and opt-in call metrics |
| `crypto` | HMAC and hashing for request signing |
| `protocol-rest`, `protocol-http`, `protocol-grpc`, `xml`, `query`, `protobuf`, `graphql` | The wire protocols the generated SDKs use |

The generated SDKs call these modules. Most programs use them only through an
SDK.

## License

[Apache-2.0](https://github.com/alchemy-run/distilled/blob/main/LICENSE)
