# A — OpenTelemetry semantic conventions research for distilled (issue #546)

Research date: 2026-10-24. Baseline: semconv **v1.44.0** (released 2026-08-04), plus unreleased changes on `main` where they matter. Every claim has a URL. "UNCLEAR" means I could not confirm it from a primary source.

Abbreviations used once each: SemConv = semantic conventions; RC = Release Candidate stability; LRO = long-running operation; PII = personally identifiable information.

Issue being answered: https://github.com/alchemy-run/distilled/issues/546 (asks for rpc.system=aws-api, rpc.service, rpc.method, semconv span names, db.system=dynamodb, aws.dynamodb.table_names, aws.s3.*, messaging.*, http status, aws.request_id, traceparent injection for SQS/SNS/EventBridge, error→status, on by default with opt-out).

Existing prototype in this repo: `packages/core/src/telemetry.ts` (levels `off|operation|debug`, env `DISTILLED_TELEMETRY` / `DISTILLED_DEBUG`, layer wins; CLIENT span `S3.GetObject`; `error.type` = error `_tag`; debug spans at Effect trace level `Debug`).

---

## 1. Current semantic conventions (2025–2026)

### 1.1 RPC client spans — renames in v1.38–v1.44 and on main

- RPC conventions became **Release Candidate** in v1.40.0 (core RPC + gRPC + Dubbo). https://github.com/open-telemetry/semantic-conventions/releases (v1.40.0 "Mark core RPC … as release candidate", #3446)
- v1.39.0 breaking renames (https://github.com/open-telemetry/semantic-conventions/releases, v1.39.0):
  - `rpc.system` → `rpc.system.name`; values renamed (`connect_rpc`→`connectrpc`, `apache_dubbo`→`dubbo`; `java_rmi`, `dotnet_wcf`, `onc_rpc` dropped from enum).
  - `rpc.method` + `rpc.service` merged into **fully-qualified `rpc.method`** (e.g. `com.example.ExampleService/exampleMethod`, `EchoService/Echo`); `rpc.service` deprecated.
  - `rpc.grpc.status_code` / `rpc.connect_rpc.error_code` / `rpc.jsonrpc.error_code` → `rpc.response.status_code`.
  - `rpc.client.duration` → `rpc.client.call.duration`, unit ms → s.
  - `server.address` demoted from Required to Conditionally Required.
- v1.40.0: removed `network.protocol.*` and `network.transport` from RPC spans/metrics; `rpc.client.call.duration` changed recommended→required; deprecated `rpc.message` event; added RPC migration guide. https://github.com/open-telemetry/semantic-conventions/releases
- v1.41.0: removed `client.address`/`client.port` from RPC server spans. Same URL.
- v1.44.0: removed tracing-only `rpc.method_original` guidance from shared `rpc.method` definition (#3872). Same URL.
- **Unreleased on main (breaking, will land in the next release):**
  - `rpc.response.status_code` → **`rpc.status_code`** (.chloggen 3921). https://github.com/open-telemetry/semantic-conventions/blob/main/.chloggen/3921.yaml
  - `rpc.request.metadata.<key>` / `rpc.response.metadata.<key>` → `rpc.request.header.<key>`, `rpc.response.header.<key>`, `rpc.response.trailer.<key>` (.chloggen 3924). https://github.com/open-telemetry/semantic-conventions/blob/main/.chloggen/3924.yaml
  - New RPC duration buckets: `[0.0001, 0.0005, 0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10, 50, 100]`. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/rpc/rpc-metrics.md
  - Migration table: https://github.com/open-telemetry/semantic-conventions/blob/main/docs/non-normative/rpc-migration.md
- RPC client span (v1.44, https://opentelemetry.io/docs/specs/semconv/rpc/rpc-spans/):
  - Name: `{rpc.method}`; if unavailable or `_OTHER`, `{rpc.system.name}`. Systems MAY define another format.
  - Kind MUST be `CLIENT`. Span SHOULD cover the whole logical call **including all retries**.
  - Attributes: `rpc.system.name` (RC, Required); `error.type` (Stable, Cond. Req. iff failed); `rpc.method` (RC, Cond. Req.); `rpc.method_original` (RC); `rpc.response.status_code` (RC); `server.address` (Stable, Cond. Req.); `server.port` (Stable); `network.peer.address`/`port` (Stable, Recommended; last contacted address on retries).
  - Sampling-relevant, set **at span creation**: `rpc.method`, `rpc.system.name`, `server.address`, `server.port`.
  - `rpc.system.name` well-known values: `connectrpc`, `dubbo`, `grpc`, `jsonrpc`. **`aws-api` is not in the new enum** (custom values allowed). https://opentelemetry.io/docs/specs/semconv/registry/attributes/rpc/
  - `rpc.method` MUST be `_OTHER` for methods the framework does not recognize. Same URL.
- RPC exception event (Development): log event `rpc.client.call.exception`, severity WARN (13). https://github.com/open-telemetry/semantic-conventions/blob/main/docs/rpc/rpc-exceptions.md

### 1.2 AWS SDK client spans (Development) — still on the OLD rpc attributes

Source: https://opentelemetry.io/docs/specs/semconv/cloud-providers/aws-sdk/

- Span name **MUST** be `Service.Operation`, e.g. `DynamoDB.GetItem`, `S3.ListBuckets`.
- Kind SHOULD be `CLIENT`. Status follows Recording Errors.
- Attributes:
  - `rpc.system` = `aws-api` — Required, but marked **Deprecated (replaced by `rpc.system.name`)**.
  - `rpc.service` (Deprecated) e.g. `DynamoDB`, `S3`; `rpc.method` (RC) e.g. `GetItem` — the AWS page still uses the bare operation name, not the fully-qualified form.
  - `aws.request_id` (Development, Recommended) from `x-amzn-requestid`, `x-amzn-request-id` or `x-amz-request-id`.
  - `aws.extended_request_id` (Development, Cond. Req.) from `x-amz-id-2`.
  - `cloud.region` (Development, Recommended), e.g. `us-east-1`.
- Conflict to note: the AWS page says Required `rpc.system`=`aws-api` (deprecated key) while generic RPC says `rpc.system.name` + fully-qualified `rpc.method`. No AWS-specific `rpc.system.name` value is defined. Go otelaws already emits `rpc.system.name=aws-api`, `rpc.method=S3/PutObject` (see §8). https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/github.com/aws/aws-sdk-go-v2/otelaws/attributes.go
- Unreleased: Lambda, S3, DynamoDB spans re-defined as refinements of AWS SDK client span. https://github.com/open-telemetry/semantic-conventions/blob/main/.chloggen/aws-span-refinements-v2.yaml
- Context propagation guidance (non-normative): use an AWS-supported format (**X-Ray**) in HTTP headers; per-service-call injection for SQS/SNS; **propagation headers must be added before the signature is calculated**; .NET SDK verifies `MD5OfMessageAttributes`; document attribute limits and billing impact. https://opentelemetry.io/docs/specs/semconv/non-normative/compatibility/aws/

#### AWS registry attributes (all Development) — https://opentelemetry.io/docs/specs/semconv/registry/attributes/aws/
- General: `aws.request_id`, `aws.extended_request_id`.
- DynamoDB: `aws.dynamodb.attribute_definitions` (string[] JSON), `attributes_to_get`, `consistent_read`, `consumed_capacity` (JSON), `count`, `exclusive_start_table`, `global_secondary_index_updates` (JSON), `global_secondary_indexes` (JSON), `index_name`, `item_collection_metrics` (JSON), `limit`, `local_secondary_indexes` (JSON), `projection`, `provisioned_read_capacity`, `provisioned_write_capacity`, `scan_forward`, `scanned_count`, `segment`, `select`, `table_count`, `table_names` (string[]), `total_segments`.
- S3: `aws.s3.bucket`, `aws.s3.key`, `aws.s3.copy_source`, `aws.s3.delete`, `aws.s3.part_number`, `aws.s3.upload_id`.
- Kinesis: `aws.kinesis.stream_name`. Lambda: `aws.lambda.invoked_arn`, `aws.lambda.resource_mapping.id`. SNS: `aws.sns.topic.arn`. SQS: `aws.sqs.queue.url`. Secrets Manager: `aws.secretsmanager.secret.arn`. Step Functions: `aws.step_functions.activity.arn`, `aws.step_functions.state_machine.arn`. Bedrock: `aws.bedrock.guardrail.id`, `aws.bedrock.knowledge_base.id`. Logs/ECS/EKS: resource-side, not relevant.

#### DynamoDB (Development) — https://github.com/open-telemetry/semantic-conventions/blob/main/docs/db/dynamodb.md
- Spans for BatchGetItem, BatchWriteItem, CreateTable, DeleteItem, DeleteTable, DescribeTable, GetItem, ListTables, PutItem, Query, Scan, UpdateItem, UpdateTable; follow DB client span conventions.
- **`db.system.name` MUST be `aws.dynamodb`**, set at span creation. (The issue asks `db.system=dynamodb`; JS emits `db.system.name=dynamodb` — mismatch, see §8.)
- `aws.dynamodb.table_names`: keys of `RequestItems` (batch ops) or single-element `[TableName]`.
- Example Query attribute set: rpc.system, aws.extended_request_id, attributes_to_get, consistent_read, consumed_capacity, index_name, limit, projection, scan_forward, select, table_names, aws.request_id, cloud.region, rpc.method, rpc.service.
- Metrics: general DB client metrics with `db.system.name=aws.dynamodb`.

#### S3 (Development) — https://github.com/open-telemetry/semantic-conventions/blob/main/docs/object-stores/s3.md
- Same `Service.Operation` naming, CLIENT kind. Recommended: `aws.s3.bucket`, `aws.s3.key`, `aws.s3.copy_source`, `aws.s3.delete`, `aws.s3.part_number`, `aws.s3.upload_id`, plus the AWS SDK set.

#### SQS / SNS (Development)
- SQS: https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/sqs.md
  - Send span: kind `PRODUCER`; Required `messaging.operation.name` (`send`), `messaging.system` = **`aws_sqs`**; Cond. Req. `error.type`, `messaging.batch.message_count` (batches only), `messaging.destination.name` (`MyQueue`), `messaging.operation.type`=`send`; Recommended `aws.request_id`, `aws.sqs.queue.url`, `messaging.message.id`, `server.address`, `server.port`; Opt-In body/envelope sizes.
  - Receive span: kind **`CLIENT`**, `messaging.operation.type`=`receive`, same attribute family.
  - Process span also defined.
- SNS: https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/sns.md — Send span (producer), `messaging.system` = **`aws.sns`** (note dotted vs SQS underscore), `aws.sns.topic.arn`, `messaging.destination.name` e.g. `MyTopic`. Values confirmed in registry: https://opentelemetry.io/docs/specs/semconv/registry/attributes/messaging/
- No SemConv exists for EventBridge or for Kinesis spans (only `aws.kinesis.stream_name`). UNCLEAR whether one is planned.

#### Generic messaging rules — https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/messaging-spans.md
- Span name SHOULD be `{messaging.operation.name} {destination}` (e.g. `send shop.orders`); destination = template, else name if not temporary/anonymous, else `server.address:server.port`.
- Kind: `create`=PRODUCER; `send`=PRODUCER if its context is the creation context, else CLIENT; `receive`=CLIENT; `process`=CONSUMER; `settle`=CLIENT.
- v1.44.0 defined a span per operation type (#3904). https://github.com/open-telemetry/semantic-conventions/releases
- Migration env values `messaging`, `messaging/dup`.

#### Lambda — https://github.com/open-telemetry/semantic-conventions/blob/main/docs/faas/aws-lambda.md
- SQS-triggered function: event span `<event source> process`, CONSUMER; for each message check **message system attribute `AWSTraceHeader`**, parse with X-Ray propagator, add as **link**.
- `xray-lambda` propagator for X-Ray active tracing.

#### GenAI / Bedrock
- v1.42.0 moved all `gen_ai.*` to https://github.com/open-telemetry/semantic-conventions-genai; Bedrock conventions moved there. https://github.com/open-telemetry/semantic-conventions/releases and https://opentelemetry.io/docs/specs/semconv/cloud-providers/aws-sdk/
- v1.37.0 renamed `gen_ai.system` → `gen_ai.provider.name`. https://github.com/open-telemetry/semantic-conventions/releases

#### cloud.* / error.* / other providers
- `cloud.account.id`, `cloud.availability_zone`, `cloud.platform`, `cloud.provider`, `cloud.region`, `cloud.resource_id` — all Development. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/registry/attributes/cloud.md
- `error.type` Stable; `error.message` deprecated (v1.40.0). https://github.com/open-telemetry/semantic-conventions/blob/main/docs/registry/attributes/error.md
- GCP: `gcp.client.service` (Development), value from the service domain (`foo.googleapis.com` → `foo`). https://github.com/open-telemetry/semantic-conventions/blob/main/docs/registry/attributes/gcp.md
- Azure: `azure.service.request.id`, `azure.client.id`, `azure.resource_provider.namespace` (Development); `az.*` deprecated. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/registry/attributes/azure.md
- GraphQL: only **server** spans are defined (`graphql.operation.name`, `graphql.operation.type`, `graphql.document` Opt-In since v1.41). https://github.com/open-telemetry/semantic-conventions/blob/main/docs/graphql/graphql-spans.md
- Database span name rule: `{db.query.summary}`, else `{db.operation.name} {target}`, else `{db.system.name}`; systems MAY override (DynamoDB uses `Service.Operation`). https://github.com/open-telemetry/semantic-conventions/blob/main/docs/db/database-spans.md

### 1.3 HTTP client spans (Stable) — https://opentelemetry.io/docs/specs/semconv/http/http-spans/
- Name: `{method} {target}` where target = `url.template` (Development, Opt-In) if available; else `{method}`. **MUST NOT default to URI path.**
- Attributes: `http.request.method` (Required), `server.address` (Required, host only), `server.port` (Required), `url.full` (Required), `error.type` (Cond. Req.), `http.request.method_original`, `http.response.status_code` (Cond. Req.), `network.protocol.name`, `http.request.resend_count` (Recommended iff retried; counts every resend incl. redirects/auth), `network.peer.*`, `network.protocol.version`; Opt-In: body sizes, `http.request.header.<key>`, `http.response.header.<key>` (**explicit configuration required**), `url.scheme`, `url.template`, `user_agent.original`.
- `url.full` MUST NOT contain credentials; query values for `X-Amz-Signature`, `X-Amz-Credential`, `X-Amz-Security-Token`, `sig`, `X-Goog-Signature` SHOULD be redacted to `REDACTED`. Unreleased: `AWSAccessKeyId` and `Signature` restored to the list. https://github.com/open-telemetry/semantic-conventions/blob/main/.chloggen/restore-sigv2-cloudfront-redaction.yaml
- Status: 4xx → Error for CLIENT kind; 5xx → Error; intentional cancellation SHOULD NOT be an error (v1.41.0).
- Sampling-relevant at creation: method, server.address, server.port, url.full.
- Unreleased opt-in `http.request.body.content` / `http.response.body.content` (sensitive). https://github.com/open-telemetry/semantic-conventions/blob/main/.chloggen/http-request-response-body.yaml

### 1.4 Span naming rules
- Span name = most general string identifying a **class** of spans; `get_account/42` is wrong, `get_account` is right. https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#span
- Library guide: "Pay special attention to span names … consider cardinality." https://opentelemetry.io/docs/concepts/instrumentation/libraries/

### 1.5 `OTEL_SEMCONV_STABILITY_OPT_IN` mechanics
- Pattern (identical text for http, rpc, messaging, database): existing instrumentations SHOULD NOT change default conventions in their current major version; SHOULD add `OTEL_SEMCONV_STABILITY_OPT_IN` as a comma-separated list; `<area>` = emit stable only; `<area>/dup` = emit both; default = keep old; `/dup` wins over plain; maintain the old major ≥ 6 months after dup; drop the variable in next major. RPC: https://opentelemetry.io/docs/specs/semconv/rpc/rpc-spans/ ; HTTP: https://opentelemetry.io/docs/specs/semconv/http/http-spans/ ; messaging: https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/messaging-spans.md
- Messaging extra: with `messaging/dup`, emit the **new** single-valued items (span name, kind). Same messaging URL.
- `rpc/dup` caveat (my inference): old and new `rpc.method` share one key with different values (`GetItem` vs `DynamoDB/GetItem`), so dup cannot hold both. UNCLEAR how other instrumentations resolve this.
- Declarative-config superset (v1.41.0, #3424): `instrumentation/development.general.<domain>.semconv.{version, experimental, dual_emit}`. https://github.com/open-telemetry/semantic-conventions/pull/3424
- Exceptions: `OTEL_SEMCONV_EXCEPTION_SIGNAL_OPT_IN` = `logs` | `logs/dup`. https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-spans/
- .NET AWS alternative: code option `SemanticConventionVersion` (default pinned `V1_28_0` until next major, or `Latest`). https://github.com/open-telemetry/opentelemetry-dotnet-contrib/blob/main/src/OpenTelemetry.Instrumentation.AWS/README.md
- Schema URL for v1.44.0 resolves: https://opentelemetry.io/schemas/1.44.0

---

## 2. Logical operation span vs HTTP spans; kinds; avoiding duplicates

- HTTP client instrumentations SHOULD create a span **per send attempt**; resends carry `http.request.resend_count`; they SHOULD NOT also emit a logical HTTP span. https://opentelemetry.io/docs/specs/semconv/http/http-spans/
- RPC / AWS SDK / DB logical spans cover the **whole call including retries**. https://opentelemetry.io/docs/specs/semconv/rpc/rpc-spans/
- Nested CLIENT spans are allowed: "A CLIENT span may have a child that is also a CLIENT span"; example: DB CLIENT span with nested HTTP CLIENT spans per call. https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#spankind
- Open semconv issue on nested client spans (DB, messaging, gRPC over HTTP): https://github.com/open-telemetry/semantic-conventions/issues/674
- Kind for the logical op:
  - AWS SemConv: CLIENT (SHOULD). https://opentelemetry.io/docs/specs/semconv/cloud-providers/aws-sdk/
  - Azure SDK conventions: public-API span kind SHOULD be **INTERNAL**, HTTP spans CLIENT; SHOULD NOT record exceptions on spans (use logs). https://github.com/Azure/azure-sdk/blob/main/docs/observability/opentelemetry-conventions.md
  - Azure general guidelines: one span per client method; nested public-method spans suppressed; child span per REST call. https://azure.github.io/azure-sdk/general_implementation.html
- Library guide: create spans only for the logical request; physical network calls belong to the network library; if extra network spans are verbose, put them **behind a config option, disabled by default**; "A generic solution to avoid duplication is under construction." https://opentelemetry.io/docs/concepts/instrumentation/libraries/
- Duplicate-suppression mechanisms:
  - JS: `suppressTracing(context)` / `isTracingSuppressed` in `@opentelemetry/core` (context key `OpenTelemetry SDK Context Key SUPPRESS_TRACING`). https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-core/src/trace/suppress-tracing.ts
  - JS aws-sdk: `suppressInternalInstrumentation` (default false) wraps the SDK handler in `suppressTracing`. https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/aws-sdk.ts
  - Java agent: `otel.instrumentation.experimental.span-suppression-strategy` = `semconv` (default) | `span-kind` | `none`; doc example: DynamoDB AWS SDK span would otherwise get child HTTP spans. https://opentelemetry.io/docs/zero-code/java/agent/disable/
  - Java aws-sdk-2.2 registers its span under `SpanKey.HTTP_CLIENT`, so the underlying HTTP client spans are suppressed. https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/instrumentation/aws-sdk/aws-sdk-2.2/library/src/main/java/io/opentelemetry/instrumentation/awssdk/v2_2/internal/AwsSdkHttpClientSuppressionAttributesExtractor.java
  - Python botocore: always runs the call inside `suppress_http_instrumentation()`. https://github.com/open-telemetry/opentelemetry-python-contrib/blob/main/instrumentation/opentelemetry-instrumentation-botocore/src/opentelemetry/instrumentation/botocore/__init__.py
  - .NET AWS: `SuppressDownstreamInstrumentation` option. https://github.com/open-telemetry/opentelemetry-dotnet-contrib/blob/main/src/OpenTelemetry.Instrumentation.AWS/AWSClientInstrumentationOptions.cs
  - Spec work, all closed without a spec-level solution: #530 "Use Context to stop tracing" (closed 2026-09-03) https://github.com/open-telemetry/opentelemetry-specification/issues/530 ; #1767 "Manual/programmatic and auto instrumentation duplication problem" (closed 2026-09-01) https://github.com/open-telemetry/opentelemetry-specification/issues/1767 ; #3867 scope-level disable https://github.com/open-telemetry/opentelemetry-specification/issues/3867 ; OTEP #172 "Instrumentation layers and suppression" (archived repo; status UNCLEAR).

---

## 3. Library instrumentation guidelines

Source unless noted: https://opentelemetry.io/docs/concepts/instrumentation/libraries/
- Depend on the **API only**; use the earliest stable API; consider shipping instrumentation separately while it stabilizes.
- Get the tracer with library **name and version**; set **`schema_url`**. Tracer API accepts `name`, `version`, `schema_url` (since 1.4.0). https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#get-a-tracer
- What to instrument: public APIs that make network calls; capture serialization etc. as **events**, not extra spans.
- "When in doubt, don't instrument" thin wrappers if network instrumentation exists and no conventions apply. (distilled has conventions → instrument.)
- Check `isRecording` before computing expensive attributes; provide sampling-relevant attributes at creation.
- Make spans active so nested auto-instrumentation and logs correlate; attach events to your own span, not the ambient active span.
- Messaging: inject context into outgoing messages; received batches become **links**.
- Span events are being deprecated: OTEP 4430 deprecates `Span.AddEvent` / `Span.RecordException` in favor of log-based events; existing data keeps working; instrumentations should add opt-in log events now and switch in next major. https://opentelemetry.io/blog/2026/deprecating-span-events/ and OTEP https://github.com/open-telemetry/opentelemetry-specification/blob/fd43145dde7e5192ebc59a20992d98a3e6af5553/oteps/4430-span-event-api-deprecation-plan.md
  - v1.40.0: "Update exception recording guidelines to not use span events"; added `OTEL_SEMCONV_EXCEPTION_SIGNAL_OPT_IN`. https://github.com/open-telemetry/semantic-conventions/releases
  - Exceptions-on-spans doc is **Deprecated**; `exception.escaped` deprecated. https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-spans/
  - Exceptions as logs (Stable doc): attributes `exception.type`, `exception.message` (may be sensitive), `exception.stacktrace`; event name `{operation}.exception`; CLIENT/PRODUCER → severity **WARN (13)**; one WARN log after retries are exhausted, per-attempt logging left to lower layer; don't record artificial exceptions for error status codes. https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/
- Status rules: leave **Unset** on success; instrumentation SHOULD NOT set `Ok` unless configured; `Error` description must be documented and predictable. https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#set-status
- Recording errors (Development): failed = exception thrown or error code returned; **errors that were retried or handled SHOULD NOT be recorded** on the operation span/metric; on failure set status Error + `error.type` + description (exception message, no secrets); don't duplicate `error.type` in description; don't record the same exception twice; same `error.type` on span and metric. https://opentelemetry.io/docs/specs/semconv/general/recording-errors/
- Context-dependent errors: a 404 may not be an error for an existence check; instrumentation with context MAY classify. Same URL; unreleased RPC clarification on configurable error codes: https://github.com/open-telemetry/semantic-conventions/blob/main/.chloggen/clarify-rpc-error-codes.yaml
- Sensitive data: data minimization — only collect what serves observability; credentials, session tokens, PII listed as sensitive. https://opentelemetry.io/docs/security/handling-sensitive-data/
- Headers / metadata capture requires explicit configuration (security risk). https://opentelemetry.io/docs/specs/semconv/http/http-spans/ and https://opentelemetry.io/docs/specs/semconv/registry/attributes/rpc/
- Bodies: request/response body content attributes are opt-in and sensitive (unreleased). https://github.com/open-telemetry/semantic-conventions/blob/main/.chloggen/http-request-response-body.yaml
- Limits: span attribute/event/link count default 128 each; attribute value length **no limit** by default — large JSON attributes are not truncated unless configured. https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/configuration/sdk-environment-variables.md

---

## 4. Metrics for clients

- `http.client.request.duration` — Histogram, `s`, **Stable**, recommended; same value as the HTTP span duration; buckets `[0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10]`; attributes `http.request.method`, `server.address`, `server.port` (Required), `error.type`, `http.response.status_code`, `network.protocol.*`; Opt-In `url.scheme`, `url.template`. Other client metrics (body sizes, open_connections, connection.duration, active_requests) are Development / Opt-In. https://opentelemetry.io/docs/specs/semconv/http/http-metrics/
- `rpc.client.call.duration` — Histogram, `s`, **RC**; same value as RPC span; v1.44 buckets same as HTTP above; main buckets `[0.0001 … 100]` (13 boundaries); attributes `rpc.system.name` (Req), `error.type`, `rpc.method`, `rpc.response.status_code`, `server.address`, `server.port`. The page says "recommended" while the v1.40.0 changelog says changed to required (UNCLEAR which wins). https://opentelemetry.io/docs/specs/semconv/rpc/rpc-metrics/ , https://github.com/open-telemetry/semantic-conventions/releases
- Old names: `rpc.client.duration` (ms) renamed in v1.39.0; `rpc.client.request.size`/`response.size` deprecated v1.40.0; `requests_per_rpc` deprecated v1.38.0. https://github.com/open-telemetry/semantic-conventions/releases
- `db.client.operation.duration` — Histogram, `s`, **Stable**, buckets `[0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10]`; DynamoDB uses `db.system.name=aws.dynamodb`. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/db/database-metrics.md , https://github.com/open-telemetry/semantic-conventions/blob/main/docs/db/dynamodb.md
- `messaging.client.operation.duration` (recommended), `messaging.client.sent.messages` (includes `error.type`). https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/messaging-metrics.md
- Errors on metrics: include `error.type` only on failure; one metric for success + failure. https://opentelemetry.io/docs/specs/semconv/general/recording-errors/
- AWS-native SDK metrics (Go v2 / Smithy), **no-op by default** until a MeterProvider is set: `client.call.duration`, `client.call.attempts`, `client.call.errors`, `client.call.attempt_duration`, `client.call.resolve_endpoint_duration`, `client.call.deserialization_duration`, `client.call.auth.signing_duration`, `client.call.auth.resolve_identity_duration`, plus `client.http.*`; dimensions `rpc.service`, `rpc.method`, `exception.type`, `auth.scheme_id`. https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/configure-observability.html
- Google Go client libraries: primary metric `gcp.client.request.duration`; **opt-in** via `GOOGLE_SDK_GO_METRICS=true`. https://docs.cloud.google.com/go/docs/observability
- JS aws-sdk emits metrics only for Bedrock (`gen_ai.client.token.usage`, `gen_ai.client.operation.duration`). https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/services/bedrock-runtime.ts
- Default on/off: no OTel rule says an SDK must emit metrics by default; the API is no-op without an SDK, so cost is low. The AWS and Google SDKs ship them off/opt-in. https://opentelemetry.io/docs/concepts/instrumentation/libraries/

---

## 5. Trace context propagation into messages

- Messaging: producer SHOULD attach a **creation context** to each message; if no Create span, inject the **Send** span context; Send span links to injected context; Receive/Process spans **link** to each message's creation context (links are the default because batches and ambient contexts make parenting impossible); Process MAY use creation context as parent for single messages only, NOT RECOMMENDED by default inside another span. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/messaging-spans.md
- AWS compat: AWS services natively propagate only **X-Ray** (`X-Amzn-Trace-Id`); other propagators need per-call injection (SQS/SNS message attributes); inject before signing; mind attribute limits and billing. https://opentelemetry.io/docs/specs/semconv/non-normative/compatibility/aws/
- **SQS**
  - `MessageSystemAttributes` supports only `AWSTraceHeader` (X-Ray format, String); does not count toward message size. https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html
  - JS: injects global propagator fields into `MessageAttributes` (`{DataType:"String", StringValue}`) for SendMessage and each SendMessageBatch entry, **only if existing + new ≤ 10**; else warns. ReceiveMessage adds `propagation.fields()` to `MessageAttributeNames`, extracts per message and adds a **link** with `messaging.message.id`; optional `sqsExtractContextPropagationFromPayload` parses `Body.MessageAttributes` (SNS→SQS without raw delivery). https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/services/MessageAttributes.ts , https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/services/sqs.ts , https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/doc/sns.md
  - Java: X-Ray header on HTTP by default; for SendMessageBatch also writes per-entry `AWSTraceHeader`; opt-in `experimental-use-propagator-for-messaging` for SQS SendMessage/Batch and SNS Publish, max 10 attributes. https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/instrumentation/aws-sdk/aws-sdk-2.2/library/README.md
  - Lambda SQS trigger reads `AWSTraceHeader` and adds links. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/faas/aws-lambda.md
- **SNS**: JS injects into Publish `MessageAttributes` (same 10 limit); Python botocore injects into Publish and PublishBatch entries. https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/services/sns.ts , https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation/opentelemetry-instrumentation-botocore/src/opentelemetry/instrumentation/botocore/extensions
- **EventBridge**: `PutEventsRequestEntry.TraceHeader` = X-Ray trace header string, 1–500 chars. No semconv, no JS extension. https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEventsRequestEntry.html — X-Ray header format: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
- **Kinesis**: PutRecord has no per-record metadata map (Data, PartitionKey, ExplicitHashKey, SequenceNumberForOrdering, StreamName/StreamARN); JS only sets stream name. https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html , https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/services/kinesis.ts
- **Lambda Invoke**: JS injects into `ClientContext.custom` (base64 JSON); skips if encoded > 3583 chars. https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/services/lambda.ts
- **HTTP-level**: Go otelaws injects the configured propagator into HTTP headers in the Finalize step (per attempt). https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/github.com/aws/aws-sdk-go-v2/otelaws/aws.go . Python botocore injects X-Ray by default, comment: "Only the x-ray header is propagated by AWS services." https://github.com/open-telemetry/opentelemetry-python-contrib/blob/main/instrumentation/opentelemetry-instrumentation-botocore/src/opentelemetry/instrumentation/botocore/__init__.py
- Google Go libraries propagate context **even when span emission is off**. https://docs.cloud.google.com/go/docs/observability

---

## 6. Pagination, LROs/waiters, retries

- Pagination / waiters: **no OTel SemConv guidance found.** Azure conventions/guidelines also contain no paging/LRO rule (I grepped the conventions doc for page/poll/LRO: no hits). https://github.com/Azure/azure-sdk/blob/main/docs/observability/opentelemetry-conventions.md
- Observed practice (inference from code, not a rule): every paginator page and every waiter poll calls the operation again, so JS, Go, Java, Python each produce **one operation span per page/poll**, with no paginator/waiter span. Based on JS wrapping each middleware-stack `resolve`: https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/aws-sdk.ts . UNCLEAR for waiters in Java/.NET.
- Retries:
  - Logical span covers all retries; HTTP span per attempt with `http.request.resend_count`. https://opentelemetry.io/docs/specs/semconv/rpc/rpc-spans/ , https://opentelemetry.io/docs/specs/semconv/http/http-spans/
  - Retried errors SHOULD NOT be recorded on the logical span. https://opentelemetry.io/docs/specs/semconv/general/recording-errors/
  - AWS Go v2 native tracing: span tree `{Service}.{Op}` (CLIENT) → `RetryLoop` → `Attempt` (property `operation.attempt`), plus `OperationSerializer`, `OperationDeserializer`, `ResolveEndpoint`, `ResolveAuthScheme`, `GetIdentity`, `SignRequest`, `ComputePayloadSHA256`; error properties `exception.type`, `exception.message`, `api.error_code`, `api.error_message`, `api.error_fault`; tracing is a NopTracerProvider by default. https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/api_client.go , https://github.com/aws/aws-sdk-go-v2/blob/main/aws/retry/middleware.go , https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/configure-observability.html
  - Java: opt-in `experimental-record-individual-http-error` records each failed attempt as a span event `HTTP request failure` with `aws.http.error_message`. https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/instrumentation/aws-sdk/README.md
  - Python: sets attribute `retry_attempts` from `ResponseMetadata.RetryAttempts` (non-semconv). https://github.com/open-telemetry/opentelemetry-python-contrib/blob/main/instrumentation/opentelemetry-instrumentation-botocore/src/opentelemetry/instrumentation/botocore/__init__.py
  - Google client libraries: per-attempt HTTP/gRPC spans with `http.request.resend_count` (from a search summary; per-attempt detail UNCLEAR). Logs failed attempts at DEBUG. https://docs.cloud.google.com/go/docs/observability
  - Exceptions-as-logs: single WARN after retries exhausted; per-attempt logging left to lower layer. https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/

---

## 7. Sampling, overhead, opt-in vs opt-out

- API is no-op without an SDK; sampled-out spans are cheap; check `isRecording` before expensive attributes; provide sampling attributes at creation. https://opentelemetry.io/docs/concepts/instrumentation/libraries/
- Library must not block the app or use unbounded memory. https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/performance.md
- Extra network-level spans: behind config, **disabled by default**. https://opentelemetry.io/docs/concepts/instrumentation/libraries/
- Defaults in the field:
  - OTel contrib AWS instrumentations: on once installed (JS, Java, Python, Go, .NET).
  - AWS native SDK tracing/metrics (Go v2): **off** until a provider is configured. https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/configure-observability.html
  - Google client libraries: **opt-in** "to protect sensitive data"; propagation always on. https://docs.cloud.google.com/go/docs/observability
  - Azure: tracing is supported natively and follows OTel when configured; global on/off switch must take effect immediately. https://azure.github.io/azure-sdk/general_implementation.html
- Effect specifics relevant to sampling: `MinimumTraceLevel` forces spans **and their descendants** below the threshold to unsampled; default level `Info`, default minimum `All`; explicit `sampled` bypasses it. https://github.com/Effect-TS/effect-smol/blob/main/packages/effect/src/Tracer.ts

---

## 8. What existing AWS SDK instrumentations emit

### 8.1 `@opentelemetry/instrumentation-aws-sdk` (JS) v0.79.0 (2026-10-20)
Sources: README https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/README.md ; source https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-aws-sdk/src ; changelog https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/CHANGELOG.md

- Hook point: patches the SDK v3 middleware stack `resolve`, so **one span per `client.send()` covering all retries**; HTTP child spans appear unless `suppressInternalInstrumentation`.
- Default span: name `${serviceName}.${commandName}` (e.g. `S3.PutObject`; `Command` suffix stripped, `serviceId` or client name minus `Client`), kind CLIENT.
- Base attributes (all services): `rpc.system`=`aws-api`, `rpc.method`=`PutObject`, `rpc.service`=`S3`, `cloud.region` (async-resolved).
- Response: **`aws.request.id`** (not semconv `aws.request_id`), `http.response.status_code`, **`aws.request.extended_id`** (not semconv `aws.extended_request_id`). https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/enums.ts
- Error: status ERROR with `err.message`, `span.recordException(err)` (span event), same request-id/status attributes, then `exceptionHook`. No `error.type`.
- Config: `preRequestHook(span, {request, moduleVersion})`, `responseHook(span, {response})`, `exceptionHook(span, {request}, err)`, `suppressInternalInstrumentation` (default false), `sqsExtractContextPropagationFromPayload` (default false), `dynamoDBStatementSerializer` (default returns undefined). https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/types.ts
- Semconv: 0.75.0+ "emit the stable semantic conventions"; 0.76.0 breaking "only emit stable http, network and database attributes"; no `OTEL_SEMCONV_STABILITY_OPT_IN` handling in current source (grep found none). CHANGELOG URL above.
- Per-service extensions (registered: SecretsManager, SFN, SQS, SNS, DynamoDB, Lambda, S3, Kinesis, BedrockRuntime). https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/src/services/ServicesExtensions.ts

| Service | Span name / kind | Attributes | Propagation |
| --- | --- | --- | --- |
| SQS | Send/SendBatch: `{queue} send` PRODUCER; Receive: `{queue} receive` **CONSUMER** (semconv says CLIENT); others default | `messaging.system=aws_sqs`, `messaging.destination.name` (last URL segment), `url.full`=queue URL, receive: `messaging.operation.type=receive`, `messaging.batch.message_count`; SendMessage: `messaging.message.id` | inject MessageAttributes; links on receive |
| SNS | Publish: `{topicName or phone_number} send` PRODUCER; other ops `SNS {Command}` (space) CLIENT | `messaging.system=aws.sns`, old `messaging.destination` + `messaging.destination_kind=topic`, `messaging.destination.name`=full ARN, `aws.sns.topic.arn` | inject Publish MessageAttributes |
| DynamoDB | default `DynamoDB.{Op}` | `db.system.name=dynamodb` (semconv: `aws.dynamodb`), `db.namespace`=TableName, `db.operation.name`, `db.query.text` (if serializer), `aws.dynamodb.*` (table_names, capacity, limit, projection, …) | — |
| Lambda | Invoke: `{FunctionName} Invoke` CLIENT | `faas.invoked_name`, `faas.invoked_provider=aws`, `faas.invoked_region`, `faas.execution`=request id | ClientContext.custom |
| S3 | default | `aws.s3.bucket` only | — |
| Kinesis | default | **`aws.kinesis.stream.name`** (semconv: `aws.kinesis.stream_name`) | — |
| Secrets Manager | default | `aws.secretsmanager.secret.arn` only if SecretId is an ARN, or from response `ARN` | — |
| Step Functions (SFN) | default | `aws.step_functions.state_machine.arn`, `aws.step_functions.activity.arn` | — |
| Bedrock Runtime | `chat {modelId}` | `gen_ai.system=aws.bedrock` (old key), `gen_ai.operation.name=chat`, `gen_ai.request.model`, usage; metrics | — |

Per-service sources: https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-aws-sdk/src/services

### 8.2 Go `otelaws` (aws-sdk-go-v2) — already on new RPC semconv (v1.43.0 package)
https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation/github.com/aws/aws-sdk-go-v2/otelaws
- Span `{ServiceID}.{Operation}`, CLIENT, started in Initialize step (outside retry loop).
- `rpc.system.name=aws-api`, **`rpc.method=S3/PutObject`**, **`aws.region`** (custom key, not `cloud.region`), `aws.request_id`, `http.response.status_code`, `error.type` + status Error with `err.Error()`.
- Per-service builders: DynamoDB, S3, SQS, SNS. Options: `WithTracerProvider`, `WithTextMapPropagator`, `WithAttributeBuilder`.

### 8.3 Java aws-sdk-2.2
https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/aws-sdk
- Span `{ServiceName}.{OperationName}`, CLIENT; SQS/SNS use messaging span-name and kind extractors (send PRODUCER/CLIENT, receive, process, settle) and messaging metrics. https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/instrumentation/aws-sdk/aws-sdk-2.2/library/src/main/java/io/opentelemetry/instrumentation/awssdk/v2_2/internal/AwsSdkInstrumenterFactory.java
- `rpc.system`, `rpc.service`, `rpc.method` (old keys); `aws.request_id`; HTTP client attributes on the SDK span; underlying HTTP spans suppressed (HTTP_CLIENT span key); DB/messaging/GenAI exception **log** events.
- Options: `experimental-span-attributes` (false), `experimental-use-propagator-for-messaging` (false), `experimental-record-individual-http-error` (false), `message-create-spans.enabled` (true), `genai.capture-message-content` (false). X-Ray `X-Amzn-Trace-Id` injected by default. https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/instrumentation/aws-sdk/README.md

### 8.4 Python botocore
https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation/opentelemetry-instrumentation-botocore
- Span `{service_id}.{operation}`, CLIENT by default; SNS Publish PRODUCER `{topic} send`.
- `rpc.system=aws-api`, `rpc.service`, `rpc.method`, `cloud.region`, `server.*`; `aws.request_id`, `retry_attempts`, old `http.status_code`.
- Always suppresses HTTP instrumentation; X-Ray propagator by default (override `propagator`); `request_hook`, `response_hook`. ClientError: status Error only if HTTP status maps to error.
- SQS: `messaging.system=aws.sqs` (differs from semconv `aws_sqs`), no context injection in botocore SQS extension; SNS injects.

### 8.5 .NET `OpenTelemetry.Instrumentation.AWS` (Stable package)
https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.AWS
- `SuppressDownstreamInstrumentation`, `SemanticConventionVersion` (default `V1_28_0`), metrics via `MeterProviderBuilderExtensions`. Exact span names/attributes not checked (UNCLEAR).

### 8.6 Effect v4 behavior that distilled inherits (not OTel, but decisive)
- `HttpClient` makes its own CLIENT span per request: name **`http.client {METHOD}`** (semconv: `{METHOD}`), `server.address` = **`url.origin`** (includes scheme; semconv: host only), `server.port`, `url.full` (with query, not redacted), `url.path`, `url.scheme`, `url.query`, **all request/response headers** as `http.request.header.*` (semconv: opt-in only). Redacted header names default: `authorization`, `cookie`, `set-cookie`, `x-api-key` — so **`x-amz-security-token` would be exported**. Controls: `TracerDisabledWhen` (disables span and propagation), `TracerPropagationEnabled` (default true → `traceparent` sent to every provider), `SpanNameGenerator`. https://github.com/Effect-TS/effect-smol/blob/main/packages/effect/src/unstable/http/HttpClient.ts , https://github.com/Effect-TS/effect-smol/blob/main/packages/effect/src/unstable/http/Headers.ts
- `@effect/opentelemetry` OtelTracer: tracer name/version = **resource `service.name`/`service.version`** (not the library) → distilled cannot set its own instrumentation scope; on success sets status **`OK`** (spec: instrumentation SHOULD NOT); interruption → `OK` + `status.interrupted`; failure → `recordException` span events + status Error with first message; keeps OTel context active while effects run (nested undici/http spans parent correctly); does not check `isTracingSuppressed`. https://github.com/Effect-TS/effect-smol/blob/main/packages/opentelemetry/src/OtelTracer.ts
- `Effect.annotateSpans` annotates every child span in scope (usable to set `http.request.resend_count` on Effect's HTTP span). https://github.com/Effect-TS/effect-smol/blob/main/packages/effect/src/Effect.ts

---

## Recommendations for distilled

### R1. Span tree per mode

```
off        (no distilled spans; Effect HttpClient span also disabled for distilled requests — see R6)

operation  S3.PutObject                    CLIENT   ← one span, covers all retries
           (traceparent / X-Ray only where the service carries it; see R5)

debug      S3.PutObject                    CLIENT
           ├─ OperationSerializer          INTERNAL (level Debug)
           ├─ ResolveEndpoint              INTERNAL
           ├─ GetIdentity                  INTERNAL (credential provider)
           ├─ RetryLoop                    INTERNAL
           │  ├─ Attempt                   INTERNAL operation.attempt=0
           │  │  ├─ SignRequest            INTERNAL
           │  │  └─ POST                   CLIENT   HTTP span, http.request.resend_count absent
           │  ├─ Backoff                   INTERNAL retry.delay_ms (custom)
           │  └─ Attempt                   INTERNAL operation.attempt=1
           │     ├─ SignRequest
           │     └─ POST                   CLIENT   http.request.resend_count=1
           └─ OperationDeserializer        INTERNAL
```
The picture leaves out pagination (each page = its own operation span) and message links.
- Internal span names copy AWS SDK Go v2 native tracing so AWS users see familiar names (§6).
- Debug HTTP spans: keep Effect's span but rename to semconv `{METHOD}` via `SpanNameGenerator`, and set `http.request.resend_count` via `Effect.annotateSpans` on attempts ≥ 1 (§1.3, §8.6).

### R2. Operation span (all AWS)
- Name `{ServiceId}.{Operation}` — `S3.PutObject`, `DynamoDB.GetItem`, `SQS.SendMessage`. Matches the AWS SemConv MUST and JS/Java/Python/Go (§1.2, §8). Span names come from the generated operation list, so cardinality is bounded.
- Kind CLIENT; PRODUCER only for ops where distilled injects a creation context (SQS SendMessage/SendMessageBatch, SNS Publish/PublishBatch, EventBridge PutEvents) (§1.2 messaging kinds).
- Attributes set **at creation** (sampling-relevant): `rpc.system`=`aws-api`, `rpc.system.name`=`aws-api`, `rpc.service`, `rpc.method`, `server.address` (host only), `server.port` (only if non-default, matching Effect's pattern; UNCLEAR if semconv wants 443 explicitly — HTTP says Required), `cloud.region`, plus per-service keys below.
- Attributes at end: `http.response.status_code` (last attempt; all four contrib instrumentations do this), `aws.request_id`, `aws.extended_request_id` (S3 `x-amz-id-2`), `error.type` on failure.
- `rpc.method` value — default `PutObject` (AWS page, JS, Java, Python, issue #546). Under `OTEL_SEMCONV_STABILITY_OPT_IN=rpc`: `rpc.method`=`S3/PutObject`, drop `rpc.system` and `rpc.service` (generic RPC RC, Go otelaws). `rpc/dup`: cannot hold both `rpc.method` values (§1.5) — pick the new value and keep `rpc.service`; flag as open question.
- Do **not** emit JS's non-semconv `aws.request.id` / `aws.request.extended_id` / `aws.kinesis.stream.name`; use semconv keys. Note this as an intentional difference from issue #546's "match JS".

### R3. Per-service attributes (operation mode unless marked debug)
- DynamoDB: `db.system.name`=`aws.dynamodb` (semconv; JS uses `dynamodb` — open question), `db.operation.name`, `db.namespace` (TableName, JS parity), `aws.dynamodb.table_names`, `index_name`, `limit`, `select`, `consistent_read`, `scan_forward`, `projection`, `segment`, `total_segments`, `exclusive_start_table`, `count`, `scanned_count`, `table_count`, `provisioned_read/write_capacity`. **Debug only:** the JSON-serialized ones (`consumed_capacity`, `item_collection_metrics`, `attribute_definitions`, `global_secondary_indexes`, `global_secondary_index_updates`, `local_secondary_indexes`) because value length is unlimited by default (§3). Never `db.query.text` from item values.
- S3: `aws.s3.bucket`, `aws.s3.upload_id`, `aws.s3.part_number`. `aws.s3.key`, `aws.s3.copy_source`, `aws.s3.delete` are semconv Recommended but often hold user data → **opt-in** (data minimization, §3). Open question.
- SQS: `messaging.system`=`aws_sqs`, `messaging.operation.name` (`send`/`receive`/`delete`…), `messaging.operation.type`, `messaging.destination.name` (queue name from URL), `aws.sqs.queue.url`, `messaging.message.id` (single message), `messaging.batch.message_count` (batches only).
- SNS: `messaging.system`=`aws.sns`, `aws.sns.topic.arn`, `messaging.destination.name` = topic **name** (semconv example `MyTopic`; JS uses ARN), operation `publish`/type `send`.
- Lambda Invoke: `faas.invoked_name`, `faas.invoked_provider`=`aws`, `faas.invoked_region`.
- Kinesis: `aws.kinesis.stream_name`. Secrets Manager: `aws.secretsmanager.secret.arn` (ARN only, never the secret). Step Functions: `aws.step_functions.state_machine.arn`, `aws.step_functions.activity.arn`.
- Bedrock Runtime: defer; follow https://github.com/open-telemetry/semantic-conventions-genai (`gen_ai.provider.name`, not `gen_ai.system`).
- Implementation: generate a per-operation attribute extractor from the Smithy model (input member → attribute) instead of hand-written service extensions; keep a small override table for SQS/SNS/DynamoDB semantics.

### R4. Non-AWS providers (Cloudflare, Stripe, GCP discovery, GraphQL)
- Name `{Provider}.{operationId}` or the spec's canonical id (GCP discovery `compute.instances.get`), same pattern as Azure `{Namespace}.{Interface}.{OperationName}` (§2). Never raw paths.
- Attributes: `http.request.method`, `url.template` (OpenAPI path template, e.g. `/zones/{zone_id}/dns_records`), `server.address`, `http.response.status_code`, `error.type`; GCP adds `gcp.client.service`. `rpc.system.name` value for REST providers: UNCLEAR (Google lists `rpc.system.name` among its attributes but I did not confirm the value).
- GraphQL: reuse `graphql.operation.name`/`graphql.operation.type` on the CLIENT span (semconv defines them only for server spans); `graphql.document` opt-in only.
- Provider request ids: no generic semconv; candidates `cloudflare.ray_id`, `stripe.request_id` as custom attributes (open question).

### R5. Propagation
- HTTP headers to AWS: inject **X-Ray `X-Amzn-Trace-Id`** (the only format AWS honors), before signing (§1.2 compat). Do not send W3C `traceparent` to AWS by default; it has no effect there.
- Third-party APIs (Cloudflare, Stripe): Effect sends `traceparent` by default. Decide per provider; default **off** for third parties is the privacy-safe choice (open question).
- Messages, on by default, with opt-out:
  - SQS SendMessage/Batch: `MessageAttributes` `traceparent` (+ `tracestate` if present), only if total ≤ 10 (JS rule); optional `AWSTraceHeader` system attribute (X-Ray) so Lambda triggers link (§1.2 Lambda).
  - SNS Publish/PublishBatch: `MessageAttributes`, same limit.
  - EventBridge PutEvents: per-entry `TraceHeader` in X-Ray format (≤ 500 chars).
  - Lambda Invoke: `ClientContext.custom` (JS parity, 3583-char limit).
  - Kinesis: none (no carrier).
- Receive: ReceiveMessage adds the propagation keys to `MessageAttributeNames`, and the CLIENT receive span gets one **link** per message with `messaging.message.id`; never re-parent (§5).
- Effect only formats W3C/B3 (`TraceContext.toHeaders`); distilled needs a small X-Ray formatter (`Root=1-xxxxxxxx-…;Parent=…;Sampled=1`). The global OTel propagator (baggage etc.) is not reachable without depending on `@opentelemetry/api` (open question).

### R6. Duplicate spans
- operation mode: disable Effect's HTTP span for distilled requests (scoped `TracerDisabledWhen`), and copy the useful HTTP facts onto the operation span (Java pattern, §2). Because `TracerDisabledWhen` also disables propagation, distilled must inject its own headers (R5).
- debug mode: enable per-attempt HTTP spans (semconv HTTP rule).
- If the user also runs `@opentelemetry/instrumentation-undici`/`-http`, those spans nest under the operation span (Effect keeps OTel context active). Suppressing them needs the `suppressTracing` context key, which lives in `@opentelemetry/core` (open question).
- Always add `x-amz-security-token` (and `x-amz-content-sha256`, Cloudflare `x-auth-key`, `x-auth-email`) to `Headers.CurrentRedactedNames` for distilled requests, and redact `X-Amz-Signature`/`X-Amz-Credential`/`X-Amz-Security-Token` in presigned `url.full` (§1.3, §8.6). This is a security fix, independent of mode.

### R7. Errors and status
- Status Error only when the operation fails **after** retries; retried attempts never mark the operation span (§3).
- `error.type` = AWS error code / distilled `_tag` (e.g. `ThrottlingException`, `NoSuchKey`), `_OTHER` fallback; transport failures → distilled transport error tag. Document the list (semconv SHOULD).
- Status description = error message (no secrets); don't repeat `error.type`.
- Client 4xx = Error (semconv default). Context-aware exceptions (HeadObject 404 used as existence check) would need caller intent — keep default Error.
- Effect sets `OK` on success and records exceptions as span events (§8.6). Not fixable inside distilled; raise upstream with Effect, or emit `rpc.client.call.exception` WARN logs later behind `OTEL_SEMCONV_EXCEPTION_SIGNAL_OPT_IN` (§3).

### R8. Metrics
- Off by default (AWS and Google SDKs do the same, §4); one Layer flag enables:
  - `rpc.client.call.duration` (s) with `rpc.system.name`, `rpc.method`, `error.type`, `server.address`; or `db.client.operation.duration` for DynamoDB, `messaging.client.operation.duration` for SQS/SNS.
  - debug: AWS-style `client.call.attempts`, `client.call.attempt_duration`, `client.call.auth.signing_duration`.
- Same `error.type` value on span and metric.

### R9. Configuration surface
- Keep `DISTILLED_TELEMETRY=off|operation|debug` and the Layer (layer wins).
- Also read `OTEL_SEMCONV_STABILITY_OPT_IN` (`rpc`, `rpc/dup`, `database`, `messaging`, `http`) to choose attribute sets.
- Layer options: `propagation` (per carrier), `captureSensitive` (S3 keys etc.), `hooks` (`onRequest(span, input)`, `onResponse(span, output)`, `onError(span, error)` — JS `preRequestHook`/`responseHook`/`exceptionHook` parity), `httpSpans` (force on in operation mode).
- Debug spans use Effect level `Debug`, so `MinimumTraceLevel` can drop them in production (§7).

### Open questions
1. `db.system.name`: semconv `aws.dynamodb` vs JS/issue `dynamodb`.
2. `rpc.method` default: `PutObject` (AWS page, JS) vs `S3/PutObject` (generic RPC RC, Go); and how to do `rpc/dup` with one key.
3. SQS/SNS span names: `SQS.SendMessage` (AWS MUST, Go) vs messaging `send {queue}` (generic messaging, Java) vs JS `{queue} send`.
4. Should distilled emit JS's non-semconv keys (`aws.request.id`) as a compatibility dup?
5. S3 `aws.s3.key` default on or off.
6. `traceparent` to third-party APIs: default on (Effect) or off.
7. Instrumentation scope: Effect's OtelTracer uses `service.name`, so spans do not carry `@distilled.cloud/*` scope or a schema URL. Ask Effect for per-span scope, or add a custom attribute.
8. Suppressing user-installed undici/http instrumentation without depending on `@opentelemetry/*`.
9. Effect's `OK` status and exception span events vs the OTel rules.
10. `rpc.system.name` value for REST/GraphQL providers.
11. Waiters: span per poll only, or an INTERNAL waiter span around polls (no guidance found).

---

## Sources (primary, fetched 2026-10-24)
1. https://opentelemetry.io/docs/specs/semconv/rpc/rpc-spans/
2. https://opentelemetry.io/docs/specs/semconv/registry/attributes/rpc/
3. https://opentelemetry.io/docs/specs/semconv/rpc/rpc-metrics/
4. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/non-normative/rpc-migration.md
5. https://github.com/open-telemetry/semantic-conventions/releases
6. https://github.com/open-telemetry/semantic-conventions/tree/main/.chloggen
7. https://opentelemetry.io/docs/specs/semconv/cloud-providers/aws-sdk/
8. https://opentelemetry.io/docs/specs/semconv/non-normative/compatibility/aws/
9. https://opentelemetry.io/docs/specs/semconv/registry/attributes/aws/
10. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/db/dynamodb.md
11. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/object-stores/s3.md
12. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/sqs.md
13. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/sns.md
14. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/messaging-spans.md
15. https://github.com/open-telemetry/semantic-conventions/blob/main/docs/faas/aws-lambda.md
16. https://opentelemetry.io/docs/specs/semconv/http/http-spans/
17. https://opentelemetry.io/docs/specs/semconv/http/http-metrics/
18. https://opentelemetry.io/docs/specs/semconv/general/recording-errors/
19. https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-spans/
20. https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/
21. https://opentelemetry.io/blog/2026/deprecating-span-events/
22. https://opentelemetry.io/docs/concepts/instrumentation/libraries/
23. https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md
24. https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/performance.md
25. https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/configuration/sdk-environment-variables.md
26. https://opentelemetry.io/docs/security/handling-sensitive-data/
27. https://opentelemetry.io/docs/zero-code/java/agent/disable/
28. https://github.com/open-telemetry/opentelemetry-specification/issues/530 , /1767 , /3867 ; https://github.com/open-telemetry/semantic-conventions/issues/674
29. https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-aws-sdk
30. https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation/github.com/aws/aws-sdk-go-v2/otelaws
31. https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/aws-sdk
32. https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation/opentelemetry-instrumentation-botocore
33. https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.AWS
34. https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/configure-observability.html ; https://github.com/aws/aws-sdk-go-v2
35. https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html
36. https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEventsRequestEntry.html
37. https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html
38. https://azure.github.io/azure-sdk/general_implementation.html ; https://github.com/Azure/azure-sdk/blob/main/docs/observability/opentelemetry-conventions.md
39. https://docs.cloud.google.com/go/docs/observability
40. https://github.com/Effect-TS/effect-smol (HttpClient.ts, Headers.ts, Tracer.ts, Effect.ts, packages/opentelemetry/src/OtelTracer.ts)
41. https://github.com/alchemy-run/distilled/issues/546

Left out: .NET span details, Kotlin/Rust AWS SDK span names, and GenAI/Bedrock attribute details (moved to the GenAI repo).
