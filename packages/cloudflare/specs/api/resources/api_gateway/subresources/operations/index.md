---
title: Operations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Operations

##### [List web and API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/methods/list)

GET/zones/{zone\_id}/api\_gateway/operations

##### [Get a web or API operation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/methods/get)

GET/zones/{zone\_id}/api\_gateway/operations/{operation\_id}

##### [Create a web or API operation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/methods/create)

POST/zones/{zone\_id}/api\_gateway/operations/item

##### [Delete a web or API operation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/methods/delete)

DELETE/zones/{zone\_id}/api\_gateway/operations/{operation\_id}

##### [Create web or API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/methods/bulk_create)

POST/zones/{zone\_id}/api\_gateway/operations

##### [Delete web or API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/methods/bulk_delete)

DELETE/zones/{zone\_id}/api\_gateway/operations

##### ModelsExpand Collapse

<details>

<summary>

APIShield object {endpoint, host, last\_updated, 2 more }

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

</details>

[Link to this property](#)%20api_gateway.operations%20%3E%20(model)%20api-shield%20%3E%20(schema)>)

<details>

<summary>

OperationListResponse object {endpoint, host, last\_updated, 3 more }

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

[Link to this property](#)%20api_gateway.operations%20%3E%20(model)%20operation_list_response%20%3E%20(schema)>)

<details>

<summary>

OperationGetResponse object {endpoint, host, last\_updated, 4 more }

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

<details>

<summary>

schemas: optional object {learned, uploaded }

OpenAPI JSON schemas for an operation, including both user-uploaded and Cloudflare-learned schemas.

</summary>

<details>

<summary>

learned: optional object {parameters, requestBody }

An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

</summary>

parameters: optional array of map\[unknown]

OpenAPI parameter objects describing path, query, header, or cookie parameters.

<a href="#">Link to this property</a>

requestBody: optional map\[unknown]

OpenAPI request body object describing the expected request payload.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

uploaded: optional object {parameters, requestBody }

An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

</summary>

parameters: optional array of map\[unknown]

OpenAPI parameter objects describing path, query, header, or cookie parameters.

<a href="#">Link to this property</a>

requestBody: optional map\[unknown]

OpenAPI request body object describing the expected request payload.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations%20%3E%20(model)%20operation_get_response%20%3E%20(schema)>)

<details>

<summary>

OperationCreateResponse object {endpoint, host, last\_updated, 4 more }

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

<details>

<summary>

schemas: optional object {learned, uploaded }

OpenAPI JSON schemas for an operation, including both user-uploaded and Cloudflare-learned schemas.

</summary>

<details>

<summary>

learned: optional object {parameters, requestBody }

An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

</summary>

parameters: optional array of map\[unknown]

OpenAPI parameter objects describing path, query, header, or cookie parameters.

<a href="#">Link to this property</a>

requestBody: optional map\[unknown]

OpenAPI request body object describing the expected request payload.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

uploaded: optional object {parameters, requestBody }

An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

</summary>

parameters: optional array of map\[unknown]

OpenAPI parameter objects describing path, query, header, or cookie parameters.

<a href="#">Link to this property</a>

requestBody: optional map\[unknown]

OpenAPI request body object describing the expected request payload.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations%20%3E%20(model)%20operation_create_response%20%3E%20(schema)>)

<details>

<summary>

OperationDeleteResponse object {errors, messages, success }

</summary>

errors: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

<a href="#">Link to this property</a>

messages: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations%20%3E%20(model)%20operation_delete_response%20%3E%20(schema)>)

<details>

<summary>

OperationBulkCreateResponse object {endpoint, host, last\_updated, 3 more }

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

[Link to this property](#)%20api_gateway.operations%20%3E%20(model)%20operation_bulk_create_response%20%3E%20(schema)>)

<details>

<summary>

OperationBulkDeleteResponse object {errors, messages, success }

</summary>

errors: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

<a href="#">Link to this property</a>

messages: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations%20%3E%20(model)%20operation_bulk_delete_response%20%3E%20(schema)>)

#### OperationsLabels

##### [Replace labels on a web or API operation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/labels/methods/update)

PUT/zones/{zone\_id}/api\_gateway/operations/{operation\_id}/labels

##### [Attach labels to a web or API operation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/labels/methods/create)

POST/zones/{zone\_id}/api\_gateway/operations/{operation\_id}/labels

##### [Remove labels from a web or API operation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/labels/methods/delete)

DELETE/zones/{zone\_id}/api\_gateway/operations/{operation\_id}/labels

##### [Replace labels on web or API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/labels/methods/bulk_update)

PUT/zones/{zone\_id}/api\_gateway/operations/labels

##### [Attach labels to web or API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/labels/methods/bulk_create)

POST/zones/{zone\_id}/api\_gateway/operations/labels

##### [Remove labels from web or API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/labels/methods/bulk_delete)

DELETE/zones/{zone\_id}/api\_gateway/operations/labels

##### ModelsExpand Collapse

<details>

<summary>

LabelUpdateResponse object {endpoint, host, last\_updated, 3 more }

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

labels: optional array of object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.labels%20%3E%20(model)%20label_update_response%20%3E%20(schema)>)

<details>

<summary>

LabelCreateResponse object {endpoint, host, last\_updated, 3 more }

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

labels: optional array of object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.labels%20%3E%20(model)%20label_create_response%20%3E%20(schema)>)

<details>

<summary>

LabelDeleteResponse object {endpoint, host, last\_updated, 3 more }

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

labels: optional array of object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.labels%20%3E%20(model)%20label_delete_response%20%3E%20(schema)>)

<details>

<summary>

LabelBulkUpdateResponse object {endpoint, host, last\_updated, 3 more }

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

labels: optional array of object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.labels%20%3E%20(model)%20label_bulk_update_response%20%3E%20(schema)>)

<details>

<summary>

LabelBulkCreateResponse object {endpoint, host, last\_updated, 3 more }

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

labels: optional array of object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.labels%20%3E%20(model)%20label_bulk_create_response%20%3E%20(schema)>)

<details>

<summary>

LabelBulkDeleteResponse object {endpoint, host, last\_updated, 3 more }

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

labels: optional array of object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.labels%20%3E%20(model)%20label_bulk_delete_response%20%3E%20(schema)>)

#### OperationsSchema Validation

##### [Retrieve operation-level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/schema_validation/methods/get)

Deprecated

GET/zones/{zone\_id}/api\_gateway/operations/{operation\_id}/schema\_validation

##### [Update operation-level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/schema_validation/methods/update)

Deprecated

PUT/zones/{zone\_id}/api\_gateway/operations/{operation\_id}/schema\_validation

##### [Update multiple operation-level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/schema_validation/methods/edit)

Deprecated

PATCH/zones/{zone\_id}/api\_gateway/operations/schema\_validation

##### ModelsExpand Collapse

<details>

<summary>

SettingsMultipleRequest = map\[object {mitigation\_action } ]

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(model)%20settings_multiple_request%20%3E%20(schema)>)

<details>

<summary>

SchemaValidationGetResponse object {mitigation\_action, operation\_id }

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

operation\_id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(model)%20schema_validation_get_response%20%3E%20(schema)>)

<details>

<summary>

SchemaValidationUpdateResponse object {mitigation\_action, operation\_id }

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

operation\_id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(model)%20schema_validation_update_response%20%3E%20(schema)>)