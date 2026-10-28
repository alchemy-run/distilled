# Telemetry traits (`com.distilled.telemetry`)

What a distilled operation's trace span carries is stated in the Smithy
model, so a different generator reading the same model produces the same
spans. Three traits do it. Every converted model in `.generated-specs/`
carries them; `codegen/telemetry.ts` stamps them as the last convert step,
after patches, keeping every field a patch already set.

## `com.distilled.telemetry#service`

On the service shape. A model with no service shape (GCP discovery models)
carries it in `metadata` under the same key.

```json
{
  "system": "aws-api",
  "attributes": { "db.system.name": "aws.dynamodb" },
  "responseHeaders": [
    { "header": "x-amzn-requestid", "name": "aws.request_id" },
    { "header": "cf-ray", "name": "http.response.header.cf-ray", "transform": "list" }
  ]
}
```

| Field | Meaning |
| --- | --- |
| `system` | `rpc.system.name` of every operation span. |
| `attributes` | Fixed attributes on every operation span. |
| `responseHeaders` | Response headers recorded on the span when present: lower-case `header`, attribute `name`, optional `transform`. Several rules may name one attribute; the last header present wins. |
| `propagation` | How every request carries the span's context: `w3c`, a `traceparent` header (`00-<trace>-<span>-<flags>`), the default for every provider; `xray`, an `X-Amzn-Trace-Id` header (`Root=1-<8 hex>-<24 hex>;Parent=<span>;Sampled=<0\|1>`, the W3C trace id split after 8 digits), set for AWS. Sent only when a span is recorded. |
| `hosts` | Facts for requests to a host ending in `suffix` (an S3-compatible service reached through the S3 SDK): fixed `attributes`, `hostLabel` (the attribute for the host label just before the suffix) and `copy` (`{ from: to }`: attribute values recorded under a second name). |

S3's trait, so R2 through the S3 SDK records what the Cloudflare SDK's R2
operations record:

```json
"hosts": [{
  "suffix": ".r2.cloudflarestorage.com",
  "hostLabel": "cloudflare.account_id",
  "copy": { "aws.s3.bucket": "cloudflare.r2.bucket", "aws.s3.key": "cloudflare.r2.object_key" }
}]
```

## `com.distilled.telemetry#operation`

On each operation shape.

```json
{
  "name": "SQS.SendMessage",
  "nameTemplate": "send {messaging.destination.name}",
  "method": "SQS/SendMessage",
  "kind": "producer",
  "attributes": { "messaging.operation.type": "send" },
  "inject": { "format": "awsMessageAttributes", "member": "MessageAttributes" }
}
```

| Field | Meaning |
| --- | --- |
| `name` | Span name. |
| `nameTemplate` | Span name with `{attribute}` placeholders, filled from the call's input attributes when the span starts; `name` when any is missing. Messaging operations use `{operation} {destination}` (`send orders`). |
| `method` | `rpc.method`, `{service}/{operation}` (semantic conventions v1.44). |
| `kind` | `client` (default), `producer` or `consumer`. |
| `attributes` | Fixed attributes, applied after the service's. Operations with `smithy.api#http` carry `url.template`, the path of its `uri`. |
| `copy` | `{ from: to }`: attributes recorded under a second name once the request is built (Lambda `Invoke`: `cloud.region` -> `faas.invoked_region`). |
| `inject` | Write the span's trace context into the request's messages (see below). |
| `extract` | Link the span to the trace context the response's messages carry (see below). |

### Message trace context

`inject` and `extract` name, by Smithy member, where messages carry trace
context: `member` of the input (or output), or `member` of every element of
the `list` member. The caller's input object is not changed, and a value
the caller set is kept. Formats:

- `awsMessageAttributes`: a map of `{ DataType, StringValue }` (SQS and SNS
  message attributes). `inject` adds `traceparent: { DataType: "String",
  StringValue: "00-<trace>-<span>-<flags>" }`, the operation span's context,
  unless the map already has `traceparent` or holds 10 attributes (the SQS
  and SNS limit). `extract` adds `traceparent` to the input list member
  `request` (unless it asks for `All` or `.*`), then links the span to every
  well-formed `traceparent` in the output's messages. Optional extract
  fields: `envelope`, a body member read as an SNS notification (JSON whose
  `MessageAttributes.traceparent.Value` is the publisher's context, SNS to
  SQS without raw delivery); `system`, a system-attributes member whose
  `AWSTraceHeader` is an X-Ray header, asked for through the input list
  member `systemRequest`; `messageId`, the message's id member, recorded on
  each link as `messaging.message.id`.
- `xrayTraceHeader` (inject): the X-Ray trace header in a string member
  (EventBridge `PutEvents` entries' `TraceHeader`).
- `lambdaClientContext` (inject): `custom.traceparent` in a base64 JSON
  Lambda client context, unless it is there already, the value is not base64
  JSON, or the result would pass Lambda's 3583-byte cap.

Nothing is injected or linked when no span is recorded (no exporter
installed).

## `com.distilled.telemetry#attributes`

On a member of an operation's input structure: a list of attributes read
from the value the caller passes for that member. On a member of an output
structure: read from the response, recorded when the call succeeds.

```json
[
  { "name": "aws.dynamodb.table_names", "transform": "list" },
  { "name": "db.namespace" }
]
```

A rule's `field` is a dotted path into the member's value, read before the
transform: `{ "name": "gen_ai.request.max_tokens", "field": "maxTokens" }` on
Bedrock's `inferenceConfig`.

A member whose value is absent or `null` records nothing. The defaults never
put this trait on a sensitive member (`smithy.api#sensitive` on the member
or its target), and a redacted value records nothing.

## Transforms

A closed set, so every generator implements the same ones. A value the
transform does not apply to records nothing.

| `transform` | Value → attribute |
| --- | --- |
| (none) | a string, number or boolean, or a non-empty array of them, as is |
| `list` | a string `s` → `[s]` |
| `keys` | an object → its keys |
| `count` | an array → its length |
| `lastPathSegment` | a string → the text after its last `/` |
| `arnResource` | a string → the text after its last `:` |
| `arn` | a string that starts with `arn:`, as is |
| `jsonList` | an object → `[JSON]`; an array → each element as JSON |
| `nonZero` | a number other than 0 |

## Attributes every span gets

Besides the traits, the operation span always carries:

- `rpc.system.name` (service `system`) and `rpc.method` (operation `method`);
- `http.request.method`, `server.address` (host only) and `server.port` of
  the request, recorded when it is sent;
- `http.response.status_code` of the response;
- `error.type`: the failed call's error tag;
- on a retried call, `distilled.attempts`, `distilled.retry.errors` (the tag
  of each failed try) and `distilled.retry.delay_ms` (total backoff);
- AWS only: `cloud.region`, the region the call was signed for.

## Defaults

`finalizeConvert` stamps, per package (`providerDefaults` in
`codegen/telemetry.ts`):

- `system`: `<package>-api` (`cloudflare-api`), and `propagation: "w3c"`;
- span name `<Provider>.<Operation>` (`Cloudflare.ListZones`), where the
  provider is the package's display name, or each model's service for
  packages of separate products (GCP: `Compute.GetInstance`);
- `method`: `<service shape>/<Operation>` (`Zones/ListZones`);
- each `smithy.api#httpLabel` input member: `<package>.<member in
  snake_case>` (`cloudflare.zone_id`);
- `responseHeaders`: `x-request-id` and `request-id`, plus the provider's own
  request id header (`cf-ray`, `x-github-request-id`, ...), as
  `http.response.header.<name>`;
- GCP: `gcp.client.service` (the first label of the model's
  `*.googleapis.com` host); Azure: `azure.resource_group.name` for the
  `resourceGroupName` label, `azure.resource_provider.namespace` (the
  last `/providers/<Namespace>/` of the operation's path) and
  `azure.service.request.id` (`x-ms-request-id`).

AWS (`packages/aws/scripts/telemetry.ts`) follows the OpenTelemetry AWS SDK
conventions instead: `<sdkId>.<Operation>`, `aws-api`, `aws.request_id`,
X-Ray propagation, and per-service attributes such as `aws.s3.bucket`,
`aws.dynamodb.table_names` (and, from the response, `aws.dynamodb.count`
and `consumed_capacity`), `aws.secretsmanager.secret.arn`; SQS and SNS
messaging spans; Bedrock `Converse` / `ConverseStream` as a GenAI
`chat {model}` span (GenAI conventions, now in
`open-telemetry/semantic-conventions-genai`) with `gen_ai.request.stream`,
stop sequences, `aws.bedrock.guardrail.id`, cache token usage, and
`gen_ai.*` request and usage attributes; Lambda `Invoke` and EventBridge
`PutEvents` with trace context in the request. GraphQL operations add `graphql.operation.name`
and `graphql.operation.type`.

## Generated code

Generators keep the traits as data, with one exception: the fields few
operations use become calls into their own core module, imported only by
the generated modules that use them, so a program that never calls such an
operation never bundles that code:

| Trait field | Module | Generated |
| --- | --- | --- |
| `#operation` `nameTemplate` | `core/telemetry-name-template` | `rename: TxName.nameTemplate("send {messaging.destination.name}")` |
| `#operation` `inject` (`awsMessageAttributes`) | `core/telemetry-message-context` | `inject: TxMessage.injectAwsMessageAttributes({ member, list? })` |
| `#operation` `extract` (`awsMessageAttributes`) | `core/telemetry-message-context` | `extract: TxMessage.extractAwsMessageAttributes({ member, list?, request? })` |
| `#operation` `inject` (`xrayTraceHeader`) | `core/telemetry-xray` | `inject: TxXray.injectTraceHeader({ member, list? })` |
| `#operation` `inject` (`lambdaClientContext`) | `core/telemetry-lambda-context` | `inject: TxLambda.injectLambdaClientContext({ member })` |
| `#service` `hosts` | `core/telemetry-host-rules` | `onRequest: TxHost.hostRules([...])` |
| `#service` `propagation` (`xray`) | `core/telemetry-xray` | `propagate: TxXray.propagate` |
| `#service` `propagation` (`w3c`) | (core) | `propagate: "w3c"` |

Member names in `inject` and `extract` are the generated property names.

### Compact `span` config

The traits stay complete in the model. distilled's generator writes, per
operation, only what the runtime cannot derive (`Telemetry.operationInfo`):

- the module's `TELEMETRY` const adds the rules most of its operations
  follow, inferred from the traits: `prefix` (span name `<prefix>.<op>`),
  `service` (`rpc.method` `<service>/<op>`), `labels` (each `T.Label`
  property as `<labels>.<snake_case>`, or as `labelNames[property]` when most
  operations name it another way), `templates: false` when most
  operations have no `url.template`, and in its `attributes` every
  operation attribute more than half of its operations share;
- an operation that follows them is `span: "GetProject"`, its model name;
- otherwise `span: { op, ...what differs }`: `name`, `method`, `kind`,
  `attributes` (a `url.template` other than the input's `T.Http` path, a
  shared attribute with another value, or `null` for a shared attribute the
  operation does not have), `output` rules,
  `input` entries that replace a derived label (`[]` records nothing), and
  `template: false` for an operation without one.

This is an encoding of the same facts, checked by comparing the runtime's
span facts for every generated operation before and after; another
generator may write the full traits instead.

## GraphQL client models

A GraphQL client model (`.generated-graphql/<name>.json`, Railway) has no
Smithy shapes; it carries the same facts in one `telemetry` entry, stamped
by `applyGraphQLTelemetry` after its patches and generated into
`src/graphql-telemetry.ts`:

```json
{
  "system": "railway-api",
  "prefix": "Railway",
  "responseHeaders": [ ... ],
  "fields": { "query.project": { "id": [{ "name": "railway.project_id" }] } }
}
```

Each document gets one span: `<prefix>.<rootField>` (`Railway.project`), or
`<prefix>.<kind>` when it selects several root fields, with
`graphql.operation.type`, `graphql.operation.name` (single root) and the
attributes `fields` names for the root arguments. The defaults name an `id`
argument after the object type its field returns (`railway.project_id`) and
an argument ending in `Id` after itself (`projectId` → `railway.project_id`).

A patch overrides any of it under the upstream shape names; for example,
this stops recording a label:

```json
{
  "op": "add",
  "path": "/shapes/com.example#GetThingRequest/members/owner_id/traits/com.distilled.telemetry#attributes",
  "value": []
}
```

## Opt-in layers

Not traits: what an app installs, each in its own module so programs that
do not use it never bundle it.

| Layer | Adds |
| --- | --- |
| `TelemetryDebug.layer` (`core/telemetry-debug`) | spans for distilled's internals; `layerWith({ logRequests: true })` also logs each request to stderr |
| `TelemetryMetrics.layer` (`core/telemetry-metrics`) | the `rpc.client.call.duration` histogram (seconds) per call, with `rpc.system.name`, `rpc.method`, `error.type` |
| `TelemetryHooks.layer({ onStart, onEnd })` (`core/telemetry-hooks`) | app callbacks on each recorded operation span |
