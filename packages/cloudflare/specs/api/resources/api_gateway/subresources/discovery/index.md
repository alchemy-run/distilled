---
title: Discovery
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Discovery

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

#### DiscoveryOperations

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