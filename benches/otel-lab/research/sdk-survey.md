# B — How SDKs and libraries do tracing, metrics, and debug toggles

Research for `distilled` telemetry design (one span per operation by default; a debug mode, set by an environment variable or an Effect Layer, where the explicit Layer always wins).

Date of research: 2026-10-24. Every claim links to its source. Where I could not confirm a fact, I mark it UNCLEAR.

Note: the worktree already has a prototype at `packages/core/src/telemetry.ts` (levels `off | operation | debug`, env `DISTILLED_TELEMETRY` / `DISTILLED_DEBUG`, a `Context.Reference` whose default reads the env once, and a Layer that wins). The ideas at the end are written against that prototype.

---

## 1. AWS SDK for Go v2 (smithy-go)

This is the most complete design in the survey, and the closest match to what distilled wants.

**How it is enabled**
- Two client options: `TracerProvider` and `MeterProvider`. The default for both is a no-op, so no data is collected until you set a provider. ([AWS Go guide](https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/configure-observability.html))
- The interfaces live in smithy-go and do not depend on OTel. Two separate adapter modules connect a real OTel provider: `smithyoteltracing.Adapt(provider)` and `smithyotelmetrics.Adapt(provider)`. ([guide](https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/configure-observability.html), [tracing.go](https://github.com/aws/smithy-go/blob/main/tracing/tracing.go), [adapt.go](https://github.com/aws/smithy-go/blob/main/tracing/smithyoteltracing/adapt.go))
- No environment variable turns tracing on. Debug logging is a separate bit field, `ClientLogMode`, with these bits: `LogSigning`, `LogRetries`, `LogRequest`, `LogRequestWithBody`, `LogResponse`, `LogResponseWithBody`, `LogDeprecatedUsage`, `LogRequestEventMessage`, `LogResponseEventMessage`. ([aws/logging.go](https://github.com/aws/aws-sdk-go-v2/blob/main/aws/logging.go))

**Span names and hierarchy.** I took these from the generated SQS client and the shared middleware:
```
SQS.SendMessage            CLIENT; rpc.system=aws-api, rpc.method, rpc.service
├─ ResolveAuthScheme       auth.scheme_id
├─ OperationSerializer
└─ RetryLoop
   └─ Attempt              operation.attempt = N   (one per try)
      ├─ GetIdentity
      ├─ ResolveEndpoint   client.call.resolved_endpoint
      ├─ ComputePayloadSHA256
      ├─ SignRequest
      ├─ DoHTTPRequest     http.method, http.request_content_length, http.status_code,
      │                    http.response_content_length, net.protocol.version, net.peer.*
      └─ OperationDeserializer
```
- The operation span name is `fmt.Sprintf("%s.%s", ServiceID, opID)`. ([sqs/api_client.go](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/api_client.go))
- On an error, the operation span gets `exception.type`, `exception.message`, `api.error_code`, `api.error_message`, `api.error_fault`, and `error=true`. Then the status is set to OK or Error. ([api_client.go](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/api_client.go))
- `ResolveAuthScheme`, `GetIdentity` and `SignRequest` come from [sqs/auth.go](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/auth.go). `ResolveEndpoint` comes from [sqs/endpoints.go](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/endpoints.go). `RetryLoop` and `Attempt` come from [aws/retry/middleware.go](https://github.com/aws/aws-sdk-go-v2/blob/main/aws/retry/middleware.go). `ComputePayloadSHA256` comes from [aws/signer/v4/middleware.go](https://github.com/aws/aws-sdk-go-v2/blob/main/aws/signer/v4/middleware.go). `DoHTTPRequest` comes from [smithy-go transport/http/client.go](https://github.com/aws/smithy-go/blob/main/transport/http/client.go). The `net.peer.*` attributes come from [aws/transport/http/client.go](https://github.com/aws/aws-sdk-go-v2/blob/main/aws/transport/http/client.go).
- Go has no detail levels. All of these spans exist whenever a TracerProvider is set.

**Metrics: the full list.** All durations are histograms in seconds. The attributes are `rpc.service` and `rpc.method`. Auth metrics add `auth.scheme_id`, and errors add `exception.type`.

| Metric | Type | What it measures |
|---|---|---|
| `client.call.duration` | histogram | whole call, including retries |
| `client.call.attempts` | counter `{attempt}` | attempts per operation |
| `client.call.errors` | counter `{error}` | errors per operation |
| `client.call.attempt_duration` | histogram | connect + send + get status and headers, including time in the queue |
| `client.call.resolve_endpoint_duration` | histogram | endpoint resolver (not DNS) |
| `client.call.serialization_duration` | histogram | serialize the body (in the code; missing from the docs table) |
| `client.call.deserialization_duration` | histogram | deserialize the body |
| `client.call.auth.signing_duration` | histogram | sign the request |
| `client.call.auth.resolve_identity_duration` | histogram | get credentials or a token |
| `client.http.connections.acquire_duration` | histogram | get a connection |
| `client.http.connections.dns_lookup_duration` | histogram | DNS |
| `client.http.connections.tls_handshake_duration` | histogram | TLS |
| `client.http.connections.usage` | up/down counter, `state` | pool state (only `acquired` is recorded) |
| `client.http.do_request_duration` | histogram | the whole HTTP transaction |
| `client.http.time_to_first_byte` | histogram | time to the first response byte |

Sources: [guide](https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/configure-observability.html), [api_client.go](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/api_client.go) (the serialization metric), [attempt_metrics.go](https://github.com/aws/aws-sdk-go-v2/blob/main/aws/retry/attempt_metrics.go), [transport/http/metrics.go](https://github.com/aws/smithy-go/blob/main/transport/http/metrics.go). The code comment says `idle` is not recorded because "we can't determine when something is truly idle" ([metrics.go](https://github.com/aws/smithy-go/blob/main/transport/http/metrics.go)).

**How Go avoids overhead when telemetry is off**
- `withOperationMetrics` returns early if the provider is `metrics.NopMeterProvider`. `startMetricTimer` and `timeOperationMetric` return `func(){}` or call `fn()` directly when the context holds no metrics struct. ([api_client.go](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/api_client.go))
- The HTTP metrics skip `httptrace.WithClientTrace` for a `NopMeter`. The code comment says it is "an expensive operation". ([metrics.go](https://github.com/aws/smithy-go/blob/main/transport/http/metrics.go))
- The no-op tracer returns the same context and an empty span struct ([nop.go](https://github.com/aws/smithy-go/blob/main/tracing/nop.go)). Spans travel on the context as a "lineage" stack ([context.go](https://github.com/aws/smithy-go/blob/main/tracing/context.go)).

## 2. AWS SDK for Kotlin (smithy-kotlin) — names for comparison

Kotlin uses the same metric set with a `smithy.` prefix: `smithy.client.call.duration`, `…attempts`, `…errors`, `…attempt_duration`, `…resolve_endpoint_duration`, `…serialization_duration`, `…deserialization_duration`, `…auth.signing_duration`, `…auth.resolve_identity_duration`. It adds these HTTP metrics: `smithy.client.http.connections.limit`, `…uptime`, `…requests.usage` (queued / in-flight), `…requests.queued_duration`, `…bytes_sent`, `…bytes_received`. ([Kotlin metrics](https://docs.aws.amazon.com/sdk-for-kotlin/latest/developer-guide/observability-telemetry-metrics.html)) UNCLEAR: the exact Kotlin span tree and default providers. I did not fetch the Kotlin tracing page.

## 3. AWS SDK for Rust (smithy-rs)

- Rust uses the `tracing` crate. You turn output on with a subscriber plus `RUST_LOG`, for example `RUST_LOG=aws_smithy_runtime=trace`. The documented module filters are: `aws_smithy_runtime` (wire), `aws_config` (credentials), `aws_sigv4` (signing). ([Rust logging](https://docs.aws.amazon.com/sdk-for-rust/latest/dg/logging.html))
- Every span is at `debug` level, so the debug detail is gated by the subscriber's level filter. The generator creates the top span `debug_span!("$serviceName.$operationName", rpc.service, rpc.method, sdk_invocation_id = random 7-digit)` ([OperationGenerator.kt](https://github.com/smithy-lang/smithy-rs/blob/main/codegen-client/src/main/kotlin/software/amazon/smithy/rust/codegen/client/smithy/generators/OperationGenerator.kt)). Older docs show the same span as `invoke{service=s3 operation=ListBuckets sdk_invocation_id=…}` ([Rust logging](https://docs.aws.amazon.com/sdk-for-rust/latest/dg/logging.html)).
- An integration test pins the span tree ([spans.rs](https://github.com/smithy-lang/smithy-rs/blob/main/aws/sdk/integration-tests/telemetry/tests/spans.rs), [orchestrator.rs](https://github.com/smithy-lang/smithy-rs/blob/main/rust-runtime/aws-smithy-runtime/src/client/orchestrator.rs)):
```
S3.GetObject
├─ apply_configuration
├─ try_op
│  ├─ serialization
│  ├─ try_attempt  (attempt = i; one per retry; the test asserts exactly 2 for one retry)
│  │  ├─ lazy_load_identity
│  │  ├─ orchestrate_endpoint
│  │  ├─ deserialization / deserialize_streaming / deserialize_nonstreaming / read_body
│  └─ finally_attempt
└─ finally_op
```
- The log lines inside the orchestrator are debug-level narration, for example "beginning attempt #{i}", "delaying for {delay:?}", and "request cannot be retried since the request body cannot be cloned" ([orchestrator.rs](https://github.com/smithy-lang/smithy-rs/blob/main/rust-runtime/aws-smithy-runtime/src/client/orchestrator.rs)).
- Metrics go through the `aws-smithy-observability` crate, which has a global `set_telemetry_provider` / `get_telemetry_provider` ([global.rs](https://github.com/smithy-lang/smithy-rs/blob/main/rust-runtime/aws-smithy-observability/src/global.rs)). The instruments are `smithy.client.call.duration`, `smithy.client.call.attempt.duration`, `smithy.client.http.connections.acquire_duration`, `smithy.client.call.request.size`, `smithy.client.call.response.size` ([metrics.rs](https://github.com/smithy-lang/smithy-rs/blob/main/rust-runtime/aws-smithy-runtime/src/client/metrics.rs)). Rust writes `attempt.duration` where Go and Kotlin write `attempt_duration`, so the SDKs do not agree.

## 4. AWS SDK for JavaScript v3 (smithy-typescript)

- **No native spans.** Tracing comes from `@opentelemetry/instrumentation-aws-sdk`, which patches the middleware stack and emits `Service.Operation` spans. Its option `suppressInternalInstrumentation: true` hides the HTTP child spans. ([README](https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/README.md)) The patching has broken on SDK updates: [#1596 "aws-sdk 3.363.0 breaks v3 instrumentation"](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1596) (2023) and [#3219 "instrumentation not applying patch"](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/3219) (2025-11).
- **Metrics (new).** On 2026-09-11 smithy-typescript added a per-request `MetricsRecorder`, used as `client.send(command, { metricsRecorder })` ([PR #2149](https://github.com/smithy-lang/smithy-typescript/pull/2149)). The interface is backend-neutral: `begin`, `end`, `recordRequestOutcome`, `addCount`, `addTime`, `addLevel`, `addMetric`, `addRatio`, `setProperty`, and `getMetrics(): Native` (for example an OTel Meter) ([metrics.ts](https://github.com/smithy-lang/smithy-typescript/blob/main/packages/types/src/metrics.ts)). UNCLEAR: which phase timings the client middleware records into it.
- **Logging.** The `logger` client option takes `{trace?, debug, info, warn, error}` ([logger.ts](https://github.com/smithy-lang/smithy-typescript/blob/main/packages/types/src/logger.ts)). One middleware in the `initialize` step logs `{clientName, commandName, input, output, metadata}` at `info`, and the same shape at `error` on failure. Input and output pass through `inputFilterSensitiveLog` / `outputFilterSensitiveLog` first ([loggerMiddleware.ts](https://github.com/aws/aws-sdk-js-v3/blob/main/packages-internal/core/src/submodules/client/middleware-logger/loggerMiddleware.ts)). No environment variable turns it on.
- **Retry visibility without tracing.** `$metadata` carries `httpStatusCode`, `requestId`, `extendedRequestId`, `cfId`, `attempts`, `totalRetryDelay` ([response.ts](https://github.com/smithy-lang/smithy-typescript/blob/main/packages/types/src/response.ts)).

## 5. AWS SDK for Java v2

- **Metrics are off by default.** You add a `MetricPublisher` with `overrideConfiguration(c -> c.addMetricPublisher(pub))`. The publishers ship as `CloudWatchMetricPublisher`, `EmfMetricLoggingPublisher` (for Lambda), and `LoggingMetricPublisher` (for development). ([Java metrics](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/metrics.html))
- **Zero cost when off.** The generated code does `metricPublishers.isEmpty() ? NoOpMetricCollector.create() : MetricCollector.create("ApiCall")` ([generated client test fixture](https://github.com/aws/aws-sdk-java-v2/blob/master/codegen/src/test/resources/software/amazon/awssdk/codegen/poet/client/test-rpcv2-sync.java), [MetricUtils.java](https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/internal/util/MetricUtils.java)).
- **Metrics are nested by scope**: per call, per attempt, and HTTP ([metrics-list](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/metrics-list.html)).
  - Per call: `ApiCallDuration`, `ApiCallSuccessful`, `CredentialsFetchDuration`, `TokenFetchDuration`, `EndpointResolveDuration`, `MarshallingDuration`, `RetryCount`, `ServiceId`, `OperationName`, `ServiceEndpoint`.
  - Per attempt: `BackoffDelayDuration`, `SigningDuration`, `ServiceCallDuration`, `UnmarshallingDuration`, `TimeToFirstByte`, `TimeToLastByte`, `ReadThroughput`, `WriteThroughput`, `AwsRequestId`, `AwsExtendedRequestId`, `ErrorType` (`Throttling | ServerError | ConfiguredTimeout | IO | Other`).
  - HTTP: `HttpClientName`, `MaxConcurrency`, `AvailableConcurrency`, `LeasedConcurrency`, `PendingConcurrencyAcquires`, `HttpStatusCode`, `ConcurrencyAcquireDuration`, plus the HTTP/2 window sizes. ([CoreMetric.java](https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/metrics/CoreMetric.java), [HttpMetric.java](https://github.com/aws/aws-sdk-java-v2/blob/master/http-client-spi/src/main/java/software/amazon/awssdk/http/HttpMetric.java))
- **A documented sum.** `API_CALL_DURATION ≈ CREDENTIALS_FETCH + MARSHALLING + ENDPOINT_RESOLVE + Σ BACKOFF_DELAY + Σ SIGNING + Σ SERVICE_CALL + Σ UNMARSHALLING`. The doc says compression and checksums have no metric of their own ([CoreMetric.java](https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/metrics/CoreMetric.java)).
- **Hooks.** `ExecutionInterceptor` has `beforeExecution`, `modifyRequest`, `beforeMarshalling`, `afterMarshalling`, `modifyHttpRequest`, `beforeTransmission`, `afterTransmission`, `modifyHttpResponse`, `beforeUnmarshalling`, `afterUnmarshalling`, `modifyResponse`, `afterExecution`, `modifyException`, `onExecutionFailure` ([ExecutionInterceptor.java](https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/interceptor/ExecutionInterceptor.java)). OTel tracing plugs in through one of these hooks, `TracingExecutionInterceptor` ([otel-java aws-sdk-2.2](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/aws-sdk/aws-sdk-2.2/library/src/main/java/io/opentelemetry/instrumentation/awssdk/v2_2)). The SDK has no native OTel module: `metric-publishers/` holds only the CloudWatch and EMF publishers ([repo](https://github.com/aws/aws-sdk-java-v2/tree/master/metric-publishers)).

## 6. AWS SDK for Python (botocore / boto3)

- Botocore has no native tracing. Its extension points are hierarchical events, with the order `creating-client-class`, `provide-client-params`, `before-call`, `request-created`, `before-send`, `needs-retry`, `after-call`, `after-call-error`. The names nest (`provide-client-params.s3.ListObjectsV2`) and accept wildcards (`provide-client-params.s3.*`). ([boto3 events](https://docs.aws.amazon.com/boto3/latest/guide/events.html))
- Debug output: `boto3.set_stream_logger('botocore', logging.DEBUG)`. The docs warn: "when logging anything from 'botocore' the full wire trace will appear in your logs… should not be used in production." ([boto3 reference](https://docs.aws.amazon.com/boto3/latest/reference/core/boto3.html))

## 7. Azure SDK guidelines and implementations

**Tracing rules from the general guidelines** ([general_implementation](https://azure.github.io/azure-sdk/general_implementation.html)):
- Support OpenTelemetry. Accept a context from the caller for the parent span, and propagate `traceparent` / `tracestate`.
- "Create only one span for client method that user code calls." If a client method calls other public SDK methods, those inner spans "MUST be suppressed". REST calls are children of the outer span.
- Start the method span before any slow work that can fail. End it only after all IO is done. Create one child span per REST call, in the HTTP pipeline.

**Conventions** ([opentelemetry-conventions.md](https://github.com/Azure/azure-sdk/blob/main/docs/observability/opentelemetry-conventions.md)):
- Method span name: `{Namespace}.{Interface}.{OperationName}` (the TypeSpec `crossLanguageDefinitionId`). The older `{client.method}` form is deprecated. Kind: `INTERNAL`.
- Status stays unset on success and is `Error` on failure. "Azure client libraries SHOULD NOT record exceptions on spans and SHOULD record them using logging."
- The span SHOULD include argument validation and (de)serialization.
- HTTP span: one per attempt and per redirect, named `{http.request.method}`, kind `CLIENT`.
- Attributes: `az.namespace`, `az.client_request_id` (the same across retries), `az.service_request_id`. The `az.*` names are deprecated in favor of `azure.*` (`azure.resource_provider.namespace`, `azure.client.request.id`, `azure.service.request.id`).
- `http.request.method`, `server.address` and `server.port` SHOULD be set at span creation, because samplers use them.

**JS implementation**
- `@azure/core-tracing` holds a global instrumenter. It is a no-op until `useInstrumenter()` is called by `@azure/opentelemetry-instrumentation-azure-sdk` ([instrumenter.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-tracing/src/instrumenter.ts), [instrumentation README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/instrumentation/opentelemetry-instrumentation-azure-sdk/README.md)).
- `createTracingClient().startSpan` stamps `az.namespace` ([tracingClient.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-tracing/src/tracingClient.ts)).
- The HTTP policy names its span `HTTP ${method}` and returns early: "If the span is not recording, don't do any more work." ([tracingPolicy.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/src/policies/tracingPolicy.ts))

**Logging**
- Levels: Verbose, Informational, Warning, Error.
  - Log the request line and headers at Info: method, URL, query, headers, an SDK request ID, and the attempt count.
  - Log the response at Info: status and time to first byte.
  - Log exceptions at Warning, with the stack only at Verbose.
  - Do not log self-healing events, such as a retry, as warnings.
- Header and query values are redacted unless they are on an allow-list. ([general_implementation](https://azure.github.io/azure-sdk/general_implementation.html))
- In JS, logging uses `debug`-style channels `azure:<service>:{error,warning,info,verbose}`. Secrets appear only on Verbose. ([typescript_implementation](https://azure.github.io/azure-sdk/typescript_implementation.html))
- `@azure/logger` can be turned on by `AZURE_LOG_LEVEL`, `setLogLevel()`, `enable()`, or `DEBUG`. "AZURE_LOG_LEVEL, if set, takes precedence over DEBUG." It never logs bodies. ([logger README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/logger/README.md))

**Global switches and precedence**
- The env var table has `AZURE_LOG_LEVEL`, `AZURE_TRACING_DISABLED`, and `AZURE_TELEMETRY_DISABLED` (the last one is for User-Agent telemetry) ([azurecore](https://azure.github.io/azure-sdk/general_azurecore.html)).
- "Allow all global configuration settings to be overridden by client-provided options." Users can "opt out of all global configuration settings at once".
- Config changes after a client is built must not change its behavior, with two exceptions: log level and tracing on/off "must take effect immediately". ([typescript_implementation](https://azure.github.io/azure-sdk/typescript_implementation.html))
- Python makes the order explicit in `PrioritizedSetting`: (4) immediate value > (3) value set by the user > (2) env var > (1) system default. It covers `AZURE_LOG_LEVEL`, `AZURE_TRACING_ENABLED`, and `AZURE_SDK_TRACING_IMPLEMENTATION`. ([settings.py](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/core/azure-core/azure/core/settings.py))
- In .NET, some tracing is opt-in as experimental: `AZURE_EXPERIMENTAL_ENABLE_ACTIVITY_SOURCE=true`, or `AppContext.SetSwitch("Azure.Experimental.EnableActivitySource", true)`.
- .NET logs bodies only at Verbose and with `IsLoggingContentEnabled`. It documents how to avoid double HTTP spans with generic HTTP instrumentation. "Azure client libraries do not collect HTTP-level metrics." ([Diagnostics.md](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md))

## 8. Google Cloud client libraries

**Go (2026).** Telemetry is opt-in and set by env vars ([Go observability](https://docs.cloud.google.com/go/docs/observability), updated 2026-10-22):
- `GOOGLE_SDK_GO_TRACING=true`, `GOOGLE_SDK_GO_METRICS=true`, `GOOGLE_SDK_GO_LOGGING=true`. The page says signals are "disabled by default" "to protect sensitive data".
- Traces are low-level HTTP/gRPC spans. The main metric is `gcp.client.request.duration`. The logs are "actionable error logs at DEBUG… for failed requests at the transport layer, even if they are eventually retried successfully".
- Attributes: `gcp.client.service`, `gcp.client.repo`, `gcp.client.version`, `gcp.client.artifact`, `gcp.resource.destination.id`, `gcp.errors.domain`, `gcp.errors.metadata.<key>`.
- Trace context is propagated "even if trace generation is disabled".
- Logs need a `*slog.Logger` passed with `option.WithLogger()`.

Older and still current ([debug.md](https://github.com/googleapis/google-cloud-go/blob/main/debug.md)):
- `GOOGLE_SDK_GO_LOGGING_LEVEL=debug` dumps requests and responses. The page warns that these logs "contain sensitive information, including headers, request/response payloads, and authentication tokens" and have "a minor performance impact".
- It says generated clients make no spans of their own; only six hand-written clients do. UNCLEAR: how this fits with the newer `GOOGLE_SDK_GO_TRACING` page.
- In gax-go, an explicit logger wins: `New(l)` returns `l` if it is not nil. Otherwise it builds a logger that is a no-op handler unless the env var is set. Request bodies are wrapped in lazy `slog.LogValuer`s. ([internallog.go](https://github.com/googleapis/gax-go/blob/main/v2/internallog/internallog.go), [internal.go](https://github.com/googleapis/gax-go/blob/main/v2/internallog/internal/internal.go))

**Node.**
- `GOOGLE_SDK_NODE_LOGGING` takes namespace filters, the same syntax as `util.debuglog`. If it is unset, `log()` returns a shared `placeholder` no-op function. A programmatic `setBackend()` (debug package, structured JSON, or `null` to disable) also turns logging on, without the env var. ([logging-utils.ts](https://github.com/googleapis/google-cloud-node-core/blob/main/packages/logging-utils/src/logging-utils.ts))

**Java (gax).**
- `ApiTracer` hooks: `attemptStarted(request, n)`, `attemptFailed(error, delay)`, `attemptFailedRetriesExhausted`, `attemptPermanentFailure`, `requestSent`, `responseReceived`, `lroStart*`, `batchRequestSent` ([ApiTracer.java](https://github.com/googleapis/sdk-platform-java/blob/main/gax-java/gax/src/main/java/com/google/api/gax/tracing/ApiTracer.java)).
- Metrics: `{service}/operation_latency`, `{service}/attempt_latency` (ms), `{service}/attempt_count`, `{service}/operation_count` ([OpenTelemetryMetricsRecorder.java](https://github.com/googleapis/sdk-platform-java/blob/main/gax-java/gax/src/main/java/com/google/api/gax/tracing/OpenTelemetryMetricsRecorder.java)). The newer "golden signals" metric is `gcp.client.request.duration` in seconds ([GoldenSignalsMetricsRecorder.java](https://github.com/googleapis/sdk-platform-java/blob/main/gax-java/gax/src/main/java/com/google/api/gax/tracing/GoldenSignalsMetricsRecorder.java)).
- Each attempt span is kind CLIENT and carries a `resend_count` attribute on retries ([SpanTracer.java](https://github.com/googleapis/sdk-platform-java/blob/main/gax-java/gax/src/main/java/com/google/api/gax/tracing/SpanTracer.java)).
- Logging is on with `GOOGLE_SDK_JAVA_LOGGING`, read once into a static field. A `setLoggingEnabled` method exists for tests. ([LoggingUtils.java](https://github.com/googleapis/sdk-platform-java/blob/main/gax-java/gax/src/main/java/com/google/api/gax/logging/LoggingUtils.java))
- UNCLEAR: the Python env var name (`GOOGLE_SDK_PYTHON_LOGGING_SCOPE`). I could not fetch the source.

## 9. Prisma — the closest model of "operation span + debug detail"

**Span tree** ([Prisma tracing](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/opentelemetry-tracing)):
```
prisma:client:operation          model + method
├─ prisma:client:connect
├─ prisma:client:serialize       validate + build the query
└─ prisma:engine:query
   ├─ prisma:engine:connection
   ├─ prisma:engine:db_query     (one per SQL statement; the query text is in attributes)
   ├─ prisma:engine:serialize
   └─ prisma:engine:response_json_serialization
```
Interactive transactions add `prisma:client:transaction` and `prisma:engine:itx_runner`.

**How it is enabled**
- Register `new PrismaInstrumentation({ ignoreSpanTypes })`. Its `enable()` writes a helper to `globalThis.V{major}_PRISMA_INSTRUMENTATION` and `globalThis.PRISMA_INSTRUMENTATION`. `disable()` deletes them. ([PrismaInstrumentation.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/instrumentation/src/PrismaInstrumentation.ts), [global.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/instrumentation-contract/src/global.ts))
- The client reads that global on every call through a `DynamicTracingHelper`, so tracing can be turned on or off at runtime. When it is off, a `disabledTracingHelper` runs the callback directly, and its `getTraceParent` returns the not-sampled `00-10-10-00`. ([TracingHelper.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/client/src/runtime/core/tracing/TracingHelper.ts))

**The debug-detail gate**
- A span option `internal: true` means "Internal spans are not shown unless PRISMA_SHOW_ALL_TRACES=true env var is set" ([types.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/instrumentation-contract/src/types.ts)).
- The env var is read once at module load ([ActiveTracingHelper.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/instrumentation/src/ActiveTracingHelper.ts)). `ignoreSpanTypes` (string or RegExp) drops spans by name.
- Internal client spans include `connect`, `disconnect`, `compile`, and `serialize` ([ClientEngine.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/client/src/runtime/core/engines/client/ClientEngine.ts), [getPrismaClient.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/client/src/runtime/getPrismaClient.ts)). UNCLEAR: exactly which of these are marked `internal`.

**Logging** is separate. It uses `log: ['query','info','warn','error']`, either to stdout or as events through `$on('query', e => e.duration)`, and `DEBUG` for debug output ([Prisma logging](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging)). The docs warn that many spans have "a significant performance impact" and recommend BatchSpanProcessor and sampling.

Note: `prisma/prisma` `main` is now a different codebase. The v7 code is on branch `7.9.x` ([branches](https://github.com/prisma/prisma/branches)).

## 10. Other database and network clients

- **Drizzle.**
  - It defines spans `drizzle.operation`, `drizzle.prepareQuery`, `drizzle.buildSQL`, `drizzle.execute`, `drizzle.driver.execute`, `drizzle.mapResponse`.
  - But the `import('@opentelemetry/api')` is commented out, so `otel` is always undefined and the spans never fire ([tracing.ts](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/tracing.ts)).
  - Logging is a `logger` option ([logger.ts](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/logger.ts)).
- **MongoDB driver OTel spec** ([open-telemetry.md](https://github.com/mongodb/specifications/blob/master/source/open-telemetry/open-telemetry.md)):
  - Off by default. Depend on the OTel API only, never the SDK.
  - The env var is `OTEL_{LANG}_INSTRUMENTATION_MONGODB_ENABLED`. The client option `tracing: { enabled, query_text_max_length }` "MUST override" the env var.
  - "MUST NOT try to detect whether the OpenTelemetry SDK library is available, and enable tracing based on this."
  - No URI option, because "copying… a connection string that enables tracing may have unexpected negative outcome".
  - Query text is off by default (max length 0).
  - Span names: the operation span is `{command} {db.collection}` and the command span is `{command}`. A cursor the driver iterates internally gets one operation span with the `getMore` command spans nested under it. A cursor the user iterates gets a new operation span per `getMore`. A resume "MUST NOT extend the failed" span.
  - `error.type` is low-cardinality and is not set on success.
  - UNCLEAR: whether the Node driver ships this yet. A web search said no. I did not check the driver source.
- **MongoDB logging spec** ([logging.md](https://github.com/mongodb/specifications/blob/master/source/logging/logging.md)):
  - Env vars: `MONGODB_LOG_ALL`, `MONGODB_LOG_COMMAND`, `MONGODB_LOG_TOPOLOGY`, `MONGODB_LOG_SERVER_SELECTION`, `MONGODB_LOG_CONNECTION`, `MONGODB_LOG_PATH`, `MONGODB_LOG_MAX_DOCUMENT_LENGTH`. A component var beats `ALL`.
  - "Programmatic configuration MUST take precedence over environment variables". Drivers must document how a user can make the env var win instead. Reasons given: apps built on drivers need full control, programmatic config already beats connection-string options, and unsetting an env var from code is hard in some languages.
- **node-postgres.** No native hooks were found in the repo tree. OTel instruments it by patching (`InstrumentationNodeModuleDefinition('pg')` plus `_wrap`) ([instrumentation-pg](https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-pg/src/instrumentation.ts)).
- **node-redis (v5).**
  - It publishes TracingChannels `node-redis:command`, `node-redis:batch`, `node-redis:connect`, plus point channels such as `node-redis:connection:ready` and `node-redis:pool:connection-wait` ([diagnostics-channel.md](https://github.com/redis/node-redis/blob/master/docs/diagnostics-channel.md)).
  - It traces only when `hasSubscribers !== false` ([tracing.ts](https://github.com/redis/node-redis/blob/master/packages/client/lib/client/tracing.ts)).
  - Native OTel metrics are opt-in with `OpenTelemetry.init({ metrics: { enabled: true, enabledMetricGroups } })`. The groups are `command`, `connection-basic`, `connection-advanced`, `resiliency`, `pubsub`, `streaming`, `client-side-caching`, and the default is `['connection-basic','resiliency']` ([otel-metrics.md](https://github.com/redis/node-redis/blob/master/docs/otel-metrics.md)).
- **ioredis.** It ships `lib/tracing.ts` with argument sanitization adapted from OTel: unlisted commands redact all arguments ([tracing.ts](https://github.com/redis/ioredis/blob/main/lib/tracing.ts)). UNCLEAR: ioredis channel names.
- **mysql2.** TracingChannels `mysql2:query`, `mysql2:execute`, `mysql2:connect`, `mysql2:pool:connect`. "On older versions where TracingChannel is not available, tracing is silently disabled with no overhead." ([tracing-channels.mdx](https://github.com/sidorares/node-mysql2/blob/master/website/docs/documentation/tracing-channels.mdx))

## 11. Node diagnostics_channel and TracingChannel — the "zero cost when nobody listens" pattern

- **Node's guidance to module authors**:
  - Create channels once at the top level ("acquired at runtime… not encouraged due to the additional overhead").
  - Document the channel names and message shapes.
  - Prefix names with the module name.
  - Gate work with `channel.hasSubscribers`. Channels are "optimized to reduce overhead".
  - ([diagnostics_channel](https://nodejs.org/api/diagnostics_channel.html))
- **TracingChannel**:
  - It became Stable in Node v26.8.0.
  - It has five sub-channels: `start`, `end`, `asyncStart`, `asyncEnd`, `error`. All events of one action share one context object.
  - Use `tracePromise` for async functions.
  - The naming pattern is `tracing:module.class.method:start`.
  - "Events should only be published if subscribers are present prior to starting the trace."
  - `tracingChannel.hasSubscribers` gives one aggregate check.
  - ([diagnostics_channel](https://nodejs.org/api/diagnostics_channel.html))
- **undici (and so Node's built-in fetch)** publishes, among others, `undici:request:create`, `undici:request:bodySent`, `undici:request:headers`, `undici:request:trailers`, `undici:request:error`, `undici:client:sendHeaders`, `undici:client:beforeConnect`, `undici:client:connected`, `undici:client:connectError` ([DiagnosticsChannel.md](https://github.com/nodejs/undici/blob/main/docs/docs/api/DiagnosticsChannel.md)).
- **Who subscribes**:
  - OTel `instrumentation-undici` subscribes to those channels and does not patch undici ([undici.ts](https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-undici/src/undici.ts)).
  - dd-trace subscribes to undici's native channels when the undici version is at least `>=4.7.0 <5.0.0 || >=5.1.0`, and falls back to wrapping `fetch` otherwise ([dd-trace undici.js](https://github.com/DataDog/dd-trace-js/blob/master/packages/datadog-instrumentations/src/undici.js)).
  - Inside dd-trace, patches also publish to `apm:*` channels that its plugins consume, for example `apm:mysql2:query:start` ([mysql2.js](https://github.com/DataDog/dd-trace-js/blob/master/packages/datadog-instrumentations/src/mysql2.js)).
- **graphql-js 17**:
  - It publishes `graphql:parse`, `graphql:validate`, `graphql:execute`, `graphql:execute:rootSelectionSet`, `graphql:execute:variableCoercion`, `graphql:subscribe`, `graphql:resolve`.
  - It loads `node:diagnostics_channel` through `process.getBuiltinModule`, and does nothing on runtimes that lack it.
  - It keeps "the no-subscriber fast path to a single property access plus a hasSubscribers check (no function calls, no closures)".
  - ([diagnostics.ts](https://github.com/graphql/graphql-js/blob/17.x.x/src/diagnostics.ts))

## 12. Other libraries

- **OpenTelemetry's own advice to library authors** ([libraries.md](https://github.com/open-telemetry/opentelemetry.io/blob/main/content/en/docs/concepts/instrumentation/libraries.md)):
  - Depend only on the API. "Unless your application imports the OpenTelemetry SDK, your instrumentation does nothing and does not impact application performance."
  - Make spans for the logical call. Prefer "capturing other activities, like object/data serialization as span events, rather than as additional spans".
  - If extra spans are verbose, "put them behind a configuration option and disable them by default".
  - Trace individual network tries when you wrap an RPC API.
  - Set sampling attributes at creation time, and add expensive ones only `if (span.isRecording())`.
- **Semantic conventions.**
  - AWS SDK span name "MUST be of the format `Service.Operation`", kind CLIENT.
  - `rpc.system` is now deprecated for `rpc.system.name`, and `rpc.service` is deprecated in favor of a fully qualified `rpc.method`.
  - `aws.request_id` and `cloud.region` are recommended.
  - ([aws-sdk.md](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/cloud-providers/aws-sdk.md))
  - The RPC client metric is `rpc.client.call.duration` in seconds ([rpc-metrics.md](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/rpc/rpc-metrics.md)).
- **Stripe Node.**
  - `telemetry: true` is the default. It sends request latency to Stripe and can be disabled with `telemetry: false`.
  - `stripe.on('request' | 'response')` events carry `method`, `path`, `status`, `request_id`, `elapsed`, `request_start_time`, `request_end_time`. Bodies appear only if `emitEventBodies` is set.
  - `STRIPE_SUPPRESS_NOTICES` is an env var.
  - ([README](https://github.com/stripe/stripe-node/blob/master/README.md))
  - Stripe Python adds `STRIPE_LOG=debug|info` or `stripe.log = 'debug'` ([README](https://github.com/stripe/stripe-python/blob/master/README.md)).
- **Octokit.**
  - `log.debug` and `log.info` are no-ops by default.
  - Hooks: `hook.before`, `after`, `error`, `wrap("request")`.
  - `@octokit/plugin-request-log` logs `METHOD path - status with id <x-github-request-id> in Nms` ([core README](https://github.com/octokit/core.js/blob/main/README.md), [plugin-request-log](https://github.com/octokit/plugin-request-log.js/blob/main/src/index.ts)).
- **Sentry.**
  - `debug: false` is the default and turns on SDK self-logging ([options.mdx](https://github.com/getsentry/sentry-docs/blob/master/docs/platforms/javascript/common/configuration/options.mdx)).
  - Span ops are low-cardinality snake_case categories, for example `http.client` and `serialize` ([span-operations.mdx](https://github.com/getsentry/sentry-docs/blob/master/develop-docs/sdk/telemetry/traces/span-operations.mdx)).
- **tRPC.** No built-in OTel. `loggerLink({ enabled: (opts) => … })` is a predicate per call; the docs example is dev mode or errors ([loggerLink.md](https://github.com/trpc/trpc/blob/main/www/docs/client/links/loggerLink.md)).
- **Apollo Server.** Plugin hooks follow the request lifecycle: `requestDidStart`, `didResolveSource`, `parsingDidStart`, `validationDidStart`, `didResolveOperation`, `executionDidStart`, `willResolveField`, `didEncounterErrors`, `willSendResponse`, and others ([plugins-event-reference](https://github.com/apollographql/apollo-server/blob/main/docs/source/integrations/plugins-event-reference.mdx)).
- **Temporal TS.**
  - The OTel interceptors live in a contrib package.
  - Span names are verb + noun joined with `:`, for example `StartWorkflow:<type>`, `RunWorkflow`, `StartActivity`, `RunActivity`, `SignalWorkflow`, `HandleQuery` ([definitions.ts](https://github.com/temporalio/sdk-typescript/blob/main/contrib/interceptors-opentelemetry/src/workflow/definitions.ts)).
- **Effect v4** (what distilled builds on):
  - `References.TracerEnabled` and `References.TracerTimingEnabled` are `Context.Reference<boolean>`s you can turn off per scope ([References.ts](https://github.com/Effect-TS/effect-smol/blob/main/packages/effect/src/References.ts)).
  - `Context.Reference(key, { defaultValue: () => … })` takes a lazy default ([Context.ts](https://github.com/Effect-TS/effect-smol/blob/main/packages/effect/src/Context.ts)).
  - `Effect.withSpan`, `useSpan`, `fn`, `annotateCurrentSpan`, and `withTracerEnabled` exist ([Effect.ts](https://github.com/Effect-TS/effect-smol/blob/main/packages/effect/src/Effect.ts)).
  - OTel export goes through `@effect/opentelemetry` (`NodeSdk`, `OtelTracer`, `OtelMetrics`, `OtelLogger`) ([packages/opentelemetry](https://github.com/Effect-TS/effect-smol/tree/main/packages/opentelemetry/src)).

## 13. Debug environment variable conventions

| Variable | Owner | Syntax | Source |
|---|---|---|---|
| `DEBUG` | `debug` package | namespaces, `*` wildcard, `-ns` to exclude; `DEBUG_DEPTH`, `DEBUG_COLORS`, `DEBUG_HIDE_DATE`; `debug.enabled` check; libraries should use `lib:feature` | [debug README](https://github.com/debug-js/debug/blob/master/README.md) |
| `NODE_DEBUG` | Node `util.debuglog` | comma list, `foo*`; `debuglog().enabled` for a cheap check | [util docs](https://nodejs.org/api/util.html) |
| `OTEL_LOG_LEVEL` | OTel SDK | the SDK's own internal logger, default `info`; `OTEL_SDK_DISABLED=false` default | [sdk-environment-variables.md](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/configuration/sdk-environment-variables.md) |
| `AZURE_LOG_LEVEL`, `AZURE_TRACING_DISABLED` | Azure | level name; boolean | [azurecore](https://azure.github.io/azure-sdk/general_azurecore.html) |
| `GOOGLE_SDK_GO_LOGGING_LEVEL`, `GOOGLE_SDK_GO_{TRACING,METRICS,LOGGING}`, `GOOGLE_SDK_NODE_LOGGING`, `GOOGLE_SDK_JAVA_LOGGING` | Google | level; booleans; namespace filters; boolean | §8 |
| `GRPC_TRACE` / `GRPC_NODE_TRACE`, `GRPC_VERBOSITY` | grpc-js | comma list of named tracers (`channel`, `dns_resolver`, `subchannel`…), `all`, and `-name` to exclude; verbosity `DEBUG|INFO|ERROR` (default ERROR) | [environment_variables.md](https://github.com/grpc/grpc-node/blob/master/doc/environment_variables.md) |
| `TF_LOG`, `TF_LOG_CORE`, `TF_LOG_PROVIDER`, `TF_LOG_PATH` | Terraform | `TRACE|DEBUG|INFO|WARN|ERROR`, or `JSON` (= TRACE as JSON, "not considered a stable interface"); per-component variables; `PATH` needs `TF_LOG` | [Terraform debugging](https://developer.hashicorp.com/terraform/internals/debugging) |
| `-v=N`, `--logtostderr`, `--logflow`, `--otel-traces` | Pulumi CLI | flags; "anything >3 is very verbose"; `--logflow` passes the setting to plugins | [pulumi.go](https://github.com/pulumi/pulumi/blob/master/pkg/cmd/pulumi/pulumi.go) |
| `RUST_LOG` | AWS Rust | `module=level,…` | [Rust logging](https://docs.aws.amazon.com/sdk-for-rust/latest/dg/logging.html) |
| `PRISMA_SHOW_ALL_TRACES` | Prisma | `true` shows internal spans | [ActiveTracingHelper.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/instrumentation/src/ActiveTracingHelper.ts) |
| `STRIPE_LOG` | Stripe Python | `debug|info` | [stripe-python](https://github.com/stripe/stripe-python/blob/master/README.md) |
| AWS JS v3 | — | no env var; the `logger` option only | [loggerMiddleware.ts](https://github.com/aws/aws-sdk-js-v3/blob/main/packages-internal/core/src/submodules/client/middleware-logger/loggerMiddleware.ts) |

**Who wins between env and code**
- Code wins in: MongoDB (a MUST, with the reasons written down), Azure (client options override globals; Python order immediate > user-set > env > default), gax-go (an explicit logger wins), and Google Node (`setBackend` works without the env var).
- `@azure/logger` has one env-vs-env rule: `AZURE_LOG_LEVEL` beats `DEBUG`.
- No surveyed SDK lets an env var override explicit code config.

---

## 14. Comparison table

| SDK / library | How you turn it on | Default | Detail levels | Per-phase breakdown | Metrics |
|---|---|---|---|---|---|
| AWS Go v2 | `TracerProvider` / `MeterProvider` client options + OTel adapters; `ClientLogMode` bits for logs | off (no-op) | none; all spans exist once a provider is set; log bits per area | spans + histograms: resolve auth, identity, endpoint, serialize, sign, retry loop, attempt, HTTP, deserialize | yes: `client.call.*`, `client.http.*` (15 listed in §1) |
| AWS Kotlin | telemetry provider (UNCLEAR details) | traces and metrics no-op (UNCLEAR) | UNCLEAR | same phases as Go | yes: `smithy.client.*` (17) |
| AWS Rust | `tracing` subscriber + `RUST_LOG`; global telemetry provider for metrics | nothing until a subscriber exists | level filter per module (`debug`, `trace`) | `debug` spans: apply_configuration, try_op, serialization, try_attempt, lazy_load_identity, orchestrate_endpoint, deserialization | yes: 5 instruments |
| AWS JS v3 | `logger` option; OTel by monkey patching; `metricsRecorder` per request (2026-09) | off | none | none native; `$metadata.attempts`, `totalRetryDelay` | new, backend-neutral recorder |
| AWS Java v2 | `addMetricPublisher`; `ExecutionInterceptor`; OTel through an interceptor | off (`NoOpMetricCollector`) | scopes: call > attempt > HTTP | durations: credentials, marshall, endpoint, backoff, sign, service call, unmarshall, TTFB, TTLB | yes: 21 core + 7 HTTP |
| botocore | event handlers; `set_stream_logger` | off | Python log levels | events, not timings | no |
| Azure (all) | OTel plugin (`useInstrumenter`) / ActivitySource; `AZURE_LOG_LEVEL`, `AZURE_TRACING_DISABLED` | tracing on once OTel is set up; .NET some experimental opt-in | logs: verbose / info / warning / error; spans: method + HTTP only | none beyond the HTTP span per attempt | no HTTP metrics (.NET) |
| Google Go | `GOOGLE_SDK_GO_{TRACING,METRICS,LOGGING}`; `GOOGLE_SDK_GO_LOGGING_LEVEL=debug` | off | debug only, for now | HTTP/gRPC spans per attempt | `gcp.client.request.duration` |
| Google Java/Node | `GOOGLE_SDK_JAVA_LOGGING`; `GOOGLE_SDK_NODE_LOGGING=ns,…` or `setBackend` | off | namespaces (Node) | attempt spans, operation/attempt latency | yes |
| Prisma | `PrismaInstrumentation`; `PRISMA_SHOW_ALL_TRACES`; `ignoreSpanTypes`; `log: [...]`; `DEBUG` | off | public spans vs `internal` spans | serialize, compile, connect, engine query, db_query, result serialize | no native |
| Drizzle | none that works | off | — | span names defined but inactive | no |
| MongoDB spec | client `tracing.enabled` > `OTEL_{LANG}_INSTRUMENTATION_MONGODB_ENABLED` | off | query text by max length | operation > command spans | — |
| node-redis / mysql2 / undici / graphql-js | TracingChannel subscription; node-redis `OpenTelemetry.init` | free until someone subscribes | node-redis metric groups | per command / connect / pool; graphql parse, validate, execute, resolve | node-redis yes |
| Stripe Node | `stripe.on('request'/'response')`; `telemetry` | events off; telemetry to Stripe on | `emitEventBodies` | `elapsed` only | sends latency to Stripe |
| Octokit | `log` option; `hook.wrap` | debug/info no-op | log levels | none | no |

## 15. A span tree distilled could adopt

```
S3.GetObject                    CLIENT   (always, level "operation")
│  rpc.system.name, rpc.method, cloud.region, aws.request_id, http.response.status_code, error.type
│
└─ debug level only (INTERNAL, trace level Debug):
   ├─ distilled.lazy_load        first call only: load the operation / schema module
   ├─ distilled.resolve_endpoint
   ├─ distilled.resolve_identity  (credentials)
   ├─ distilled.serialize        (encode + schema validation of input)
   └─ distilled.attempt          attempt = N, one per try
      ├─ distilled.sign
      ├─ http.client span         (Effect HttpClient's own span)
      ├─ distilled.read_body
      └─ distilled.deserialize   (decode + schema validation of output)
   └─ distilled.backoff          between attempts, delay_ms; or a span event
   pagination: distilled.page    page = N, when distilled drives the stream internally
```
This tree is a proposal. Each node maps to a phase that Go, Rust, Java or Prisma already names (§1, §3, §5, §9). It does not cover streaming bodies, waiters, or metrics.

## 16. Ten things distilled should copy

1. **Name the operation span `Service.Operation`, kind CLIENT.** Set `rpc.system.name`, a fully qualified `rpc.method`, `cloud.region`, `aws.request_id` ([OTel AWS semconv](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/cloud-providers/aws-sdk.md); Go and Rust use the same name: [api_client.go](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/api_client.go), [OperationGenerator.kt](https://github.com/smithy-lang/smithy-rs/blob/main/codegen-client/src/main/kotlin/software/amazon/smithy/rust/codegen/client/smithy/generators/OperationGenerator.kt)).
   - For non-AWS providers, use a stable spec-derived name like Azure's `{Namespace}.{Interface}.{Operation}` ([Azure conventions](https://github.com/Azure/azure-sdk/blob/main/docs/observability/opentelemetry-conventions.md)).
   - On failure, set a low-cardinality `error.type` (the error `_tag`). Put the service error code in a separate attribute, the way Go does with `api.error_code` ([api_client.go](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/api_client.go)).
   - The prototype already does the `_tag` part.

2. **Use one span per public call and suppress nested public calls.** This is Azure's rule ([general_implementation](https://azure.github.io/azure-sdk/general_implementation.html)). For pagination, copy MongoDB's cursor rule ([open-telemetry.md](https://github.com/mongodb/specifications/blob/master/source/open-telemetry/open-telemetry.md)):
   - When distilled collects all pages itself, it makes one operation span with a child per page.
   - When the user pulls a `Stream`, each page request gets its own operation span under the user's current span. It is not nested under the first page.

3. **Gate debug detail as "internal" spans with a fixed vocabulary.** Prisma's `internal: true` + `PRISMA_SHOW_ALL_TRACES` is the closest existing design ([types.ts](https://github.com/prisma/prisma/blob/7.9.x/packages/instrumentation-contract/src/types.ts)). The phase names follow Go and Rust (§1, §3). OTel says such spans should sit "behind a configuration option and disable them by default" ([libraries.md](https://github.com/open-telemetry/opentelemetry.io/blob/main/content/en/docs/concepts/instrumentation/libraries.md)). Add an `ignoreSpanTypes`-style filter later if users ask for one.

4. **Precedence: explicit Layer > env var > built-in default.** This is what MongoDB requires (with the reasons written down), what Azure Python's `PrioritizedSetting` does, and what gax-go does ([logging.md](https://github.com/mongodb/specifications/blob/master/source/logging/logging.md), [settings.py](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/core/azure-core/azure/core/settings.py), [internallog.go](https://github.com/googleapis/gax-go/blob/main/v2/internallog/internallog.go)).
   - Implement it as a `Context.Reference` whose lazy `defaultValue` reads the env once ([Context.ts](https://github.com/Effect-TS/effect-smol/blob/main/packages/effect/src/Context.ts)). The prototype already does this.
   - Copy MongoDB's other duty too: document a short snippet that lets the env var win, for users who want that.

5. **Emit the smithy metric set with the same names** through Effect `Metric`, but only when a meter layer is present ([Go guide](https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/configure-observability.html)):
   - `client.call.duration`, `.attempts`, `.errors`, `.attempt_duration`, `.serialization_duration`, `.deserialization_duration`, `.resolve_endpoint_duration`, `.auth.signing_duration`, `.auth.resolve_identity_duration`.
   - Units are seconds. Attributes are `rpc.service`, `rpc.method`, `exception.type`.
   - Existing dashboards for Go and Kotlin would then work as is. Choose with or without the `smithy.` prefix once. Rust shows what happens if you don't: it uses `attempt.duration` where the others use `attempt_duration` ([metrics.rs](https://github.com/smithy-lang/smithy-rs/blob/main/rust-runtime/aws-smithy-runtime/src/client/metrics.rs)).

6. **Make "off" cost one check per operation.**
   - Read the level once at the operation boundary and pass a boolean down. Do not look it up per phase.
   - Skip expensive wiring entirely when nothing listens. Go skips `httptrace` for a no-op meter ([metrics.go](https://github.com/aws/smithy-go/blob/main/transport/http/metrics.go)). Java skips the collector when no publisher is set ([MetricUtils.java](https://github.com/aws/aws-sdk-java-v2/blob/master/core/sdk-core/src/main/java/software/amazon/awssdk/core/internal/util/MetricUtils.java)).
   - Build attribute objects only when the span is recording ([Azure tracingPolicy.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/src/policies/tracingPolicy.ts)).
   - Format payloads lazily ([gax-go LogValuer](https://github.com/googleapis/gax-go/blob/main/v2/internallog/internallog.go)).
   - Set a benchmark target like graphql-js: "a single property access plus a hasSubscribers check" ([diagnostics.ts](https://github.com/graphql/graphql-js/blob/17.x.x/src/diagnostics.ts)).

7. **Make retries visible at every level.**
   - Debug level: one `attempt` span per try with an attempt-number attribute ([Go retry](https://github.com/aws/aws-sdk-go-v2/blob/main/aws/retry/middleware.go), [Rust try_attempt](https://github.com/smithy-lang/smithy-rs/blob/main/aws/sdk/integration-tests/telemetry/tests/spans.rs)). Record the backoff delay ([Java BackoffDelayDuration](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/metrics-list.html)).
   - Operation level, even with debug off: put the attempt count and total retry delay on the span, as JS v3 does in `$metadata` ([response.ts](https://github.com/smithy-lang/smithy-typescript/blob/main/packages/types/src/response.ts)).
   - Log failed attempts that were later retried at debug, like Google's "actionable errors… even if they are eventually retried successfully" ([Go observability](https://docs.cloud.google.com/go/docs/observability)). Azure does not log them as warnings ([general_implementation](https://azure.github.io/azure-sdk/general_implementation.html)).

8. **Redact by allow-list. Show bodies only with a second, explicit opt-in.**
   - Azure logs only allow-listed headers and never bodies ([@azure/logger](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/logger/README.md)). .NET needs `IsLoggingContentEnabled` ([Diagnostics.md](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md)). Stripe needs `emitEventBodies` ([stripe-node](https://github.com/stripe/stripe-node/blob/master/README.md)). ioredis redacts arguments of unknown commands ([tracing.ts](https://github.com/redis/ioredis/blob/main/lib/tracing.ts)).
   - Distilled already has sensitive-field marks in its schemas. Reuse them the way JS v3 reuses `filterSensitiveLog` ([loggerMiddleware.ts](https://github.com/aws/aws-sdk-js-v3/blob/main/packages-internal/core/src/submodules/client/middleware-logger/loggerMiddleware.ts)).
   - Debug mode must never put the `Authorization` header or a signature on a span.

9. **Allow per-component debug selection, not only on/off.**
   - Precedents: `GRPC_TRACE=channel,dns_resolver`, `all`, and `-x` to exclude ([grpc-node](https://github.com/grpc/grpc-node/blob/master/doc/environment_variables.md)); `TF_LOG_CORE` / `TF_LOG_PROVIDER` ([Terraform](https://developer.hashicorp.com/terraform/internals/debugging)); `RUST_LOG=aws_sigv4=trace` ([Rust](https://docs.aws.amazon.com/sdk-for-rust/latest/dg/logging.html)); node-redis `enabledMetricGroups` ([otel-metrics.md](https://github.com/redis/node-redis/blob/master/docs/otel-metrics.md)).
   - Possible shape: `DISTILLED_DEBUG=1` for everything, or `DISTILLED_DEBUG=sign,http,retry`, with the same set accepted by the Layer. This is a proposal, not something an existing SDK does under this name.

10. **Give users a way to see the tree without OTel, and pin the tree in tests.**
    - Java ships `LoggingMetricPublisher` for development ([Java metrics](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/metrics.html)). Rust's log lines show the span path, with `sdk_invocation_id` for correlation ([Rust logging](https://docs.aws.amazon.com/sdk-for-rust/latest/dg/logging.html)). A `Telemetry.console` Layer that prints the span tree would give distilled the same thing.
    - smithy-rs has an integration test that asserts span names, nesting and attempt counts ([spans.rs](https://github.com/smithy-lang/smithy-rs/blob/main/aws/sdk/integration-tests/telemetry/tests/spans.rs)). Copy it, so a generator change cannot silently rename or drop spans.

Not taken: diagnostics_channel publishing (§11). It is the right tool for plain Node libraries. Distilled's spans already reach OTel through Effect's tracer and `@effect/opentelemetry`, so a channel would be an extra surface. Revisit only if dd-trace or OTel users ask for spans without an Effect tracer.

## 17. Anti-patterns to avoid

- **Monkey patching from outside.** The OTel AWS SDK v3 instrumentation broke when smithy internals changed ([#1596](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1596), [#3219](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/3219)). Native spans avoid this.
- **Dormant tracing code.** Drizzle defines six span names, but the OTel import is commented out, so they never fire ([tracing.ts](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/tracing.ts)). Ship it working or don't ship it.
- **Detail spans on by default.** OTel says to keep them off by default ([libraries.md](https://github.com/open-telemetry/opentelemetry.io/blob/main/content/en/docs/concepts/instrumentation/libraries.md)). Prisma warns about "significant performance impact" from many spans ([Prisma tracing](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/opentelemetry-tracing)). Go has no level at all, so every user who sets a provider pays for about 10 spans per call ([§1](https://github.com/aws/aws-sdk-go-v2/blob/main/service/sqs/api_client.go)).
- **Auto-enabling because an OTel SDK is installed, or configuring the OTel SDK from the library.** MongoDB says both "MUST NOT" ([open-telemetry.md](https://github.com/mongodb/specifications/blob/master/source/open-telemetry/open-telemetry.md)). Depend on the API only ([libraries.md](https://github.com/open-telemetry/opentelemetry.io/blob/main/content/en/docs/concepts/instrumentation/libraries.md)).
- **High-cardinality names.** Do not put IDs, URLs, or bucket names in span names. Span ops should be low-cardinality ([Sentry](https://github.com/getsentry/sentry-docs/blob/master/develop-docs/sdk/telemetry/traces/span-operations.mdx)), and `error.type` should be low-cardinality ([MongoDB](https://github.com/mongodb/specifications/blob/master/source/open-telemetry/open-telemetry.md)).
- **Exceptions with stacks recorded on spans.** Azure says SHOULD NOT; log them instead ([Azure conventions](https://github.com/Azure/azure-sdk/blob/main/docs/observability/opentelemetry-conventions.md)).
- **Wire dumps that include secrets.** boto3 and Google both warn that their debug output contains full payloads and tokens ([boto3](https://docs.aws.amazon.com/boto3/latest/reference/core/boto3.html), [debug.md](https://github.com/googleapis/google-cloud-go/blob/main/debug.md)). Distilled's debug mode should be safe to turn on in production for a short time.
- **Double HTTP spans.** If a user also runs generic HTTP instrumentation, each request appears twice. Azure documents workarounds ([Diagnostics.md](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md)), and the AWS instrumentation has `suppressInternalInstrumentation` ([README](https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/instrumentation-aws-sdk/README.md)). Rely on Effect HttpClient's single span, and do not add a second HTTP span of your own.
- **An env var that silently beats code.** No surveyed SDK does this. MongoDB explains why code must win ([logging.md](https://github.com/mongodb/specifications/blob/master/source/logging/logging.md)).
- **Treating debug output as a stable API.** Terraform marks its JSON logs "not considered a stable interface" ([Terraform](https://developer.hashicorp.com/terraform/internals/debugging)). Say the same about distilled's debug span names and log text, but keep the operation span name and metric names stable.
- **Extending a failed span on retry or resume.** MongoDB forbids it ([open-telemetry.md](https://github.com/mongodb/specifications/blob/master/source/open-telemetry/open-telemetry.md)). Each attempt gets its own span.
- **Note on Azure's live-toggle rule.** Azure requires log level and tracing on/off to take effect immediately ([typescript_implementation](https://azure.github.io/azure-sdk/typescript_implementation.html)), and Prisma checks a global on each call. Reading the env var once, as the prototype does, is a deliberate difference. A Layer still changes it per scope.

## 18. UNCLEAR items

- The Kotlin span tree and default provider. I did not fetch them.
- Which phases the new smithy-typescript `MetricsRecorder` records on the client side.
- Whether the MongoDB Node driver ships native OTel yet.
- Which Prisma client spans are flagged `internal`.
- How Google Go's newer `GOOGLE_SDK_GO_TRACING` fits with the older debug.md statement that generated clients make no spans.
- The Google Python logging env var name.
- ioredis channel names.
