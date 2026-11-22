# manual-specs

Hand-authored Smithy models for Azure APIs that publish no Swagger in
`azure-rest-api-specs`. They are **models, not modules**: `scripts/convert.ts`
copies them into `.generated-specs` before `finalizeConvert`, so
`patches/<module>/` applies to them, and `scripts/generate.ts` compiles them
through the same path as every converted model. The resulting
`src/services/<module>.ts` is generated output.

A file here whose name matches a converted model fails the convert: if Azure
publishes a spec for the API, delete the manual model.

Each model records its source pages in `metadata.note`. Errors are typed per
operation with `com.distilled.openapi#errorMatchers` (status, message and
body matchers). The message texts come from the live services.

| Model                       | Endpoint                                     | Audience                               | Why it is here                                                                                                 |
| --------------------------- | -------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `servicebus-messaging.json` | `https://{namespaceName}.servicebus.windows.net` | `https://servicebus.azure.net/.default` | The Service Bus messaging runtime (send, peek-lock, receive-and-delete, unlock, complete, renew lock) is documented only as REST pages. |
| `eventhubs-messaging.json`  | `https://{namespaceName}.servicebus.windows.net` | `https://eventhubs.azure.net/.default`  | Event Hubs publishing (send, batch, partition, publisher) is documented only as REST pages.                    |
| `cosmos-nosql.json`         | `https://{accountName}.documents.azure.com`  | `https://cosmos.azure.com/.default`    | The Cosmos DB for NoSQL document API has no Swagger. Auth is `type=aad&ver=1.0&sig=<token>` (`authScheme: "cosmos-aad"`). |
| `durabletask-data.json`     | `{endpoint}` (the scheduler endpoint, `https://<scheduler>.<region>.durabletask.io`) | `https://durabletask.io/.default` | The Durable Task Scheduler publishes only its ARM Swagger. The REST data plane (start, read, query, raise events, terminate, purge orchestrations; `x-taskhub` header) is the API its dashboard calls. |
| `kudu.json`                 | `https://{scmHostName}`                      | `https://management.azure.com/.default` | Kudu (OneDeploy, zip deploy, deployment status) has no Swagger. The host is the SCM host, because regional default host names put `scm` after the first label. |
