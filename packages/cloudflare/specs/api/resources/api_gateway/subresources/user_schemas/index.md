---
title: User Schemas
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# User Schemas

##### [Retrieve information about all schemas on a zone](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas/methods/list)

Deprecated

GET/zones/{zone\_id}/api\_gateway/user\_schemas

##### [Retrieve information about a specific schema on a zone](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas/methods/get)

Deprecated

GET/zones/{zone\_id}/api\_gateway/user\_schemas/{schema\_id}

##### [Upload a legacy schema](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas/methods/create)

Deprecated

POST/zones/{zone\_id}/api\_gateway/user\_schemas

##### [Enable validation for a schema](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas/methods/edit)

Deprecated

PATCH/zones/{zone\_id}/api\_gateway/user\_schemas/{schema\_id}

##### [Delete a schema](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas/methods/delete)

Deprecated

DELETE/zones/{zone\_id}/api\_gateway/user\_schemas/{schema\_id}

##### ModelsExpand Collapse

<details>

<summary>

Message = array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)>)

<details>

<summary>

OldPublicSchema object {created\_at, kind, name, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

kind: "openapi\_v3"

Kind of schema

<a href="#">Link to this property</a>

name: string

Name of the schema

<a href="#">Link to this property</a>

schema\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

source: optional string

Source of the schema

<a href="#">Link to this property</a>

validation\_enabled: optional boolean

Flag whether schema is enabled for validation.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(model)%20old_public_schema%20%3E%20(schema)>)

<details>

<summary>

UserSchemaCreateResponse object {schema, upload\_details }

</summary>

schema: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20old_public_schema%20%3E%20(schema)">OldPublicSchema</a> { created\_at, kind, name, 3 more }

<a href="#">Link to this property</a>

<details>

<summary>

upload\_details: optional object {warnings }

</summary>

<details>

<summary>

warnings: optional array of object {code, locations, message }

Diagnostic warning events that occurred during processing. These events are non-critical errors found within the schema.

</summary>

code: number

Code that identifies the event that occurred.

<a href="#">Link to this property</a>

locations: optional array of string

JSONPath location(s) in the schema where these events were encountered. See <a href="https://goessner.net/articles/JsonPath/">https://goessner.net/articles/JsonPath/</a> for JSONPath specification.

<a href="#">Link to this property</a>

message: optional string

Diagnostic message that describes the event.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(model)%20user_schema_create_response%20%3E%20(schema)>)

<details>

<summary>

UserSchemaDeleteResponse object {errors, messages, success }

</summary>

errors: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

<a href="#">Link to this property</a>

messages: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(model)%20user_schema_delete_response%20%3E%20(schema)>)

#### User SchemasOperations

##### [Retrieve all operations from a schema](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas/subresources/operations/methods/list)

Deprecated

GET/zones/{zone\_id}/api\_gateway/user\_schemas/{schema\_id}/operations

##### ModelsExpand Collapse

<details>

<summary>

OperationListResponse = object {endpoint, host, last\_updated, 3 more } or object {endpoint, host, method }

</summary>

One of the following:

<details>

<summary>

APIShieldOperation object {endpoint, host, last\_updated, 3 more }

</summary>

endpoint: string

The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: <a href="https://developers.cloudflare.com/rules/normalization/how-it-works/">https://developers.cloudflare.com/rules/normalization/how-it-works/</a>.

formaturi-template

maxLength4096

<a href="#">Link to this property</a>

host: string

RFC3986-compliant host.

formathostname

maxLength255

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

method: "GET"or "POST"or "HEAD"or 6 more

The HTTP method used to access the endpoint.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"POST"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

"OPTIONS"

<a href="#">Link to this property</a>

"PUT"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

"CONNECT"

<a href="#">Link to this property</a>

"PATCH"

<a href="#">Link to this property</a>

"TRACE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

operation\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

<details>

<summary>

features: optional object {thresholds } or object {parameter\_schemas } or object {api\_routing } or 2 more

</summary>

One of the following:

<details>

<summary>

APIShieldOperationFeatureThresholds object {thresholds }

</summary>

<details>

<summary>

thresholds: optional object {auth\_id\_tokens, data\_points, last\_updated, 6 more }

</summary>

auth\_id\_tokens: optional number

The total number of auth-ids seen across this calculation.

<a href="#">Link to this property</a>

data\_points: optional number

The number of data points used for the threshold suggestion calculation.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

p50: optional number

The p50 quantile of requests (in period\_seconds).

<a href="#">Link to this property</a>

p90: optional number

The p90 quantile of requests (in period\_seconds).

<a href="#">Link to this property</a>

p99: optional number

The p99 quantile of requests (in period\_seconds).

<a href="#">Link to this property</a>

period\_seconds: optional number

The period over which this threshold is suggested.

<a href="#">Link to this property</a>

requests: optional number

The estimated number of requests covered by these calculations.

<a href="#">Link to this property</a>

suggested\_threshold: optional number

The suggested threshold in requests done by the same auth\_id or period\_seconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldOperationFeatureParameterSchemas object {parameter\_schemas }

</summary>

<details>

<summary>

parameter\_schemas: object {last\_updated, parameter\_schemas }

</summary>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

parameter\_schemas: optional object {parameters, responses }

An operation schema object containing a response.

</summary>

parameters: optional array of unknown

An array containing the learned parameter schemas.

<a href="#">Link to this property</a>

responses: optional unknown

An empty response object. This field is required to yield a valid operation schema.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldOperationFeatureAPIRouting object {api\_routing }

</summary>

<details>

<summary>

api\_routing: optional object {last\_updated, route }

API Routing settings on endpoint.

</summary>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

route: optional string

Target route.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldOperationFeatureConfidenceIntervals object {confidence\_intervals }

</summary>

<details>

<summary>

confidence\_intervals: optional object {last\_updated, suggested\_threshold }

</summary>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

suggested\_threshold: optional object {confidence\_intervals, mean }

</summary>

<details>

<summary>

confidence\_intervals: optional object {p90, p95, p99 }

</summary>

<details>

<summary>

p90: optional object {lower, upper }

Upper and lower bound for percentile estimate

</summary>

lower: optional number

Lower bound for percentile estimate

<a href="#">Link to this property</a>

upper: optional number

Upper bound for percentile estimate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

p95: optional object {lower, upper }

Upper and lower bound for percentile estimate

</summary>

lower: optional number

Lower bound for percentile estimate

<a href="#">Link to this property</a>

upper: optional number

Upper bound for percentile estimate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

p99: optional object {lower, upper }

Upper and lower bound for percentile estimate

</summary>

lower: optional number

Lower bound for percentile estimate

<a href="#">Link to this property</a>

upper: optional number

Upper bound for percentile estimate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mean: optional number

Suggested threshold.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldOperationFeatureSchemaInfo object {schema\_info }

</summary>

<details>

<summary>

schema\_info: optional object {active\_schema, mitigation\_action }

</summary>

<details>

<summary>

active\_schema: optional object {id, created\_at, name }

Schema active on endpoint.

</summary>

id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Schema file name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mitigation\_action: optional "none"or "log"or "block"

Action taken on requests failing validation.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldBasicOperation object {endpoint, host, method }

</summary>

endpoint: string

The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: <a href="https://developers.cloudflare.com/rules/normalization/how-it-works/">https://developers.cloudflare.com/rules/normalization/how-it-works/</a>.

formaturi-template

maxLength4096

<a href="#">Link to this property</a>

host: string

RFC3986-compliant host.

formathostname

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

method: "GET"or "POST"or "HEAD"or 6 more

The HTTP method used to access the endpoint.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"POST"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

"OPTIONS"

<a href="#">Link to this property</a>

"PUT"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

"CONNECT"

<a href="#">Link to this property</a>

"PATCH"

<a href="#">Link to this property</a>

"TRACE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas.operations%20%3E%20(model)%20operation_list_response%20%3E%20(schema)>)

#### User SchemasHosts

##### [Retrieve schema hosts in a zone](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas/subresources/hosts/methods/list)

Deprecated

GET/zones/{zone\_id}/api\_gateway/user\_schemas/hosts

##### ModelsExpand Collapse

<details>

<summary>

HostListResponse object {created\_at, hosts, name, schema\_id }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

hosts: array of string

Hosts serving the schema, e.g zone.host.com

<a href="#">Link to this property</a>

name: string

Name of the schema

<a href="#">Link to this property</a>

schema\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas.hosts%20%3E%20(model)%20host_list_response%20%3E%20(schema)>)