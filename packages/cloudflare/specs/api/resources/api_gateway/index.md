---
title: API Gateway
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# API Gateway

#### API GatewayConfigurations

##### [Get session identifier settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/configurations/methods/get)

GET/zones/{zone\_id}/api\_gateway/configuration

##### [Update session identifier settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/configurations/methods/update)

PUT/zones/{zone\_id}/api\_gateway/configuration

##### ModelsExpand Collapse

<details>

<summary>

Configuration object {auth\_id\_characteristics }

</summary>

<details>

<summary>

auth\_id\_characteristics: array of object {name, type } or object {name, type }

</summary>

One of the following:

<details>

<summary>

APIShieldAuthIDCharacteristic object {name, type }

Auth ID Characteristic

</summary>

name: string

The name of the characteristic field, i.e., the header or cookie name.

maxLength128

<a href="#">Link to this property</a>

<details>

<summary>

type: "header"or "cookie"

The type of characteristic.

</summary>

One of the following:

"header"

<a href="#">Link to this property</a>

"cookie"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldAuthIDCharacteristicJWTClaim object {name, type }

Auth ID Characteristic extracted from JWT Token Claims

</summary>

name: string

Claim location expressed as <code>$(token_config_id):$(json_path)</code>, where <code>token_config_id</code> is the ID of the token configuration used in validating the JWT, and <code>json_path</code> is a RFC 9535 JSONPath (<a href="https://goessner.net/articles/JsonPath/">https://goessner.net/articles/JsonPath/</a>, <a href="https://www.rfc-editor.org/rfc/rfc9535.html">https://www.rfc-editor.org/rfc/rfc9535.html</a>). The JSONPath expression may be in dot or bracket notation, may only specify literal keys or array indexes, and must return a singleton value, which will be interpreted as a string.

maxLength128

<a href="#">Link to this property</a>

type: "jwt"

The type of characteristic.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.configurations%20%3E%20(model)%20configuration%20%3E%20(schema)>)

#### API GatewayDiscovery

##### [Export discovered API operations as OpenAPI schemas](https://developers.cloudflare.com/api/resources/api_gateway/subresources/discovery/methods/get)

GET/zones/{zone\_id}/api\_gateway/discovery

##### ModelsExpand Collapse

<details>

<summary>

DiscoveryOperation object {id, endpoint, host, 5 more }

</summary>

id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

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

<details>

<summary>

origin: array of "ML"or "SessionIdentifier"or "LabelDiscovery"

API discovery engine(s) that discovered this operation

</summary>

One of the following:

"ML"

<a href="#">Link to this property</a>

"SessionIdentifier"

<a href="#">Link to this property</a>

"LabelDiscovery"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

state: "review"or "saved"or "ignored"

State of operation in API Discovery

- <code>review</code> - Operation is not saved into API Shield Endpoint Management
- <code>saved</code> - Operation is saved into API Shield Endpoint Management
- <code>ignored</code> - Operation is marked as ignored

</summary>

One of the following:

"review"

<a href="#">Link to this property</a>

"saved"

<a href="#">Link to this property</a>

"ignored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

features: optional object {traffic\_stats }

</summary>

<details>

<summary>

traffic\_stats: optional object {last\_updated, period\_seconds, requests }

</summary>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

period\_seconds: number

The period in seconds these statistics were computed over

<a href="#">Link to this property</a>

requests: number

The average number of requests seen during this period

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery%20%3E%20(model)%20discovery_operation%20%3E%20(schema)>)

<details>

<summary>

DiscoveryGetResponse object {schemas, timestamp }

</summary>

schemas: array of unknown

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery%20%3E%20(model)%20discovery_get_response%20%3E%20(schema)>)

#### API GatewayDiscoveryOperations

##### [List discovered web and API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/discovery/subresources/operations/methods/list)

GET/zones/{zone\_id}/api\_gateway/discovery/operations

##### [Edit discovered web and API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/discovery/subresources/operations/methods/bulk_edit)

PATCH/zones/{zone\_id}/api\_gateway/discovery/operations

##### ModelsExpand Collapse

<details>

<summary>

OperationBulkEditResponse = map\[object {state } ]

</summary>

<details>

<summary>

state: optional "review"or "ignored"

Mark state of operation in API Discovery

- <code>review</code> - Mark operation as for review
- <code>ignored</code> - Mark operation as ignored

</summary>

One of the following:

"review"

<a href="#">Link to this property</a>

"ignored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(model)%20operation_bulk_edit_response%20%3E%20(schema)>)

#### API GatewayLabels

##### [List operation labels](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/methods/list)

GET/zones/{zone\_id}/api\_gateway/labels

##### ModelsExpand Collapse

<details>

<summary>

LabelListResponse object {created\_at, description, last\_updated, 4 more }

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

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels%20%3E%20(model)%20label_list_response%20%3E%20(schema)>)

#### API GatewayLabelsUser

##### [Create user-defined operation labels](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/bulk_create)

POST/zones/{zone\_id}/api\_gateway/labels/user

##### [Delete user-defined operation labels](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/bulk_delete)

DELETE/zones/{zone\_id}/api\_gateway/labels/user

##### [Get a user-defined operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/get)

GET/zones/{zone\_id}/api\_gateway/labels/user/{name}

##### [Update a user-defined operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/update)

PUT/zones/{zone\_id}/api\_gateway/labels/user/{name}

##### [Edit a user-defined operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/edit)

PATCH/zones/{zone\_id}/api\_gateway/labels/user/{name}

##### [Delete a user-defined operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/delete)

DELETE/zones/{zone\_id}/api\_gateway/labels/user/{name}

##### ModelsExpand Collapse

<details>

<summary>

UserBulkCreateResponse object {created\_at, description, last\_updated, 3 more }

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

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_bulk_create_response%20%3E%20(schema)>)

<details>

<summary>

UserBulkDeleteResponse object {created\_at, description, last\_updated, 3 more }

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

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_bulk_delete_response%20%3E%20(schema)>)

<details>

<summary>

UserGetResponse object {created\_at, description, last\_updated, 4 more }

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

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_get_response%20%3E%20(schema)>)

<details>

<summary>

UserUpdateResponse object {created\_at, description, last\_updated, 3 more }

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

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_update_response%20%3E%20(schema)>)

<details>

<summary>

UserEditResponse object {created\_at, description, last\_updated, 3 more }

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

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_edit_response%20%3E%20(schema)>)

<details>

<summary>

UserDeleteResponse object {created\_at, description, last\_updated, 3 more }

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

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_delete_response%20%3E%20(schema)>)

#### API GatewayLabelsUserResources

#### API GatewayLabelsUserResourcesOperation

##### [Replace operations attached to a user-defined label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/subresources/resources/subresources/operation/methods/update)

PUT/zones/{zone\_id}/api\_gateway/labels/user/{name}/resources/operation

##### ModelsExpand Collapse

<details>

<summary>

OperationUpdateResponse object {created\_at, description, last\_updated, 4 more }

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

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(model)%20operation_update_response%20%3E%20(schema)>)

#### API GatewayLabelsManaged

##### [Get a managed operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/managed/methods/get)

GET/zones/{zone\_id}/api\_gateway/labels/managed/{name}

##### ModelsExpand Collapse

<details>

<summary>

ManagedGetResponse object {created\_at, description, last\_updated, 4 more }

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

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.managed%20%3E%20(model)%20managed_get_response%20%3E%20(schema)>)

#### API GatewayLabelsManagedResources

#### API GatewayLabelsManagedResourcesOperation

##### [Replace operations attached to a managed label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/managed/subresources/resources/subresources/operation/methods/update)

PUT/zones/{zone\_id}/api\_gateway/labels/managed/{name}/resources/operation

##### ModelsExpand Collapse

<details>

<summary>

OperationUpdateResponse object {created\_at, description, last\_updated, 4 more }

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

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.managed.resources.operation%20%3E%20(model)%20operation_update_response%20%3E%20(schema)>)

#### API GatewayOperations

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

#### API GatewayOperationsLabels

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

#### API GatewayOperationsSchema Validation

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

#### API GatewaySchemas

##### [Export web and API operations as OpenAPI schemas](https://developers.cloudflare.com/api/resources/api_gateway/subresources/schemas/methods/list)

GET/zones/{zone\_id}/api\_gateway/schemas

##### ModelsExpand Collapse

<details>

<summary>

SchemaListResponse object {schemas, timestamp }

</summary>

schemas: optional array of unknown

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.schemas%20%3E%20(model)%20schema_list_response%20%3E%20(schema)>)

#### API GatewaySettings

##### ModelsExpand Collapse

<details>

<summary>

Settings object {validation\_default\_mitigation\_action, validation\_override\_mitigation\_action }

</summary>

<details>

<summary>

validation\_default\_mitigation\_action: optional "none"or "log"or "block"

The default mitigation action used when there is no mitigation action defined on the operation

Mitigation actions are as follows:

- <code>log</code> - log request when request does not conform to schema
- <code>block</code> - deny access to the site when request does not conform to schema

A special value of of <code>none</code> will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

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

validation\_override\_mitigation\_action: optional "none"

When set, this overrides both zone level and operation level mitigation actions.

- <code>none</code> will skip running schema validation entirely for the request
- <code>null</code> indicates that no override is in place

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.settings%20%3E%20(model)%20settings%20%3E%20(schema)>)

#### API GatewaySettingsSchema Validation

##### [Retrieve zone level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/settings/subresources/schema_validation/methods/get)

Deprecated

GET/zones/{zone\_id}/api\_gateway/settings/schema\_validation

##### [Update zone level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/settings/subresources/schema_validation/methods/update)

Deprecated

PUT/zones/{zone\_id}/api\_gateway/settings/schema\_validation

##### [Update zone level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/settings/subresources/schema_validation/methods/edit)

Deprecated

PATCH/zones/{zone\_id}/api\_gateway/settings/schema\_validation

#### API GatewayUser Schemas

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

#### API GatewayUser SchemasOperations

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

#### API GatewayUser SchemasHosts

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

#### API GatewayExpression Template

#### API GatewayExpression TemplateFallthrough

##### [Generate a fallthrough WAF expression template](https://developers.cloudflare.com/api/resources/api_gateway/subresources/expression_template/subresources/fallthrough/methods/create)

Deprecated

POST/zones/{zone\_id}/api\_gateway/expression-template/fallthrough

##### ModelsExpand Collapse

<details>

<summary>

FallthroughCreateResponse object {expression, title }

</summary>

expression: string

WAF Expression for fallthrough

<a href="#">Link to this property</a>

title: string

Title for the expression

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.expression_template.fallthrough%20%3E%20(model)%20fallthrough_create_response%20%3E%20(schema)>)