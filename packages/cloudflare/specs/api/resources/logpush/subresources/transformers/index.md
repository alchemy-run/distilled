---
title: Transformers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logpush](https://developers.cloudflare.com/api/resources/logpush)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Transformers

##### [List transformers](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers/methods/list)

GET/accounts/{account\_id}/logpush/transformers

##### [Get transformer](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers/methods/get)

GET/accounts/{account\_id}/logpush/transformers/{transformer\_id}

##### [Create transformer](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers/methods/create)

POST/accounts/{account\_id}/logpush/transformers

##### [Update transformer](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers/methods/update)

PUT/accounts/{account\_id}/logpush/transformers/{transformer\_id}

##### [Delete transformer](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers/methods/delete)

DELETE/accounts/{account\_id}/logpush/transformers/{transformer\_id}

##### [Preview transformer](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers/methods/preview)

POST/accounts/{account\_id}/logpush/transformers/preview

##### ModelsExpand Collapse

<details>

<summary>

TransformerListResponse object {id, associated\_jobs, created\_at, 4 more }

</summary>

id: optional number

The transformer ID.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

associated\_jobs: optional array of object {id, name, object\_tag, object\_type }

Logpush jobs that reference this transformer.

</summary>

id: optional number

The logpush job ID.

<a href="#">Link to this property</a>

name: optional string

The logpush job destination name.

<a href="#">Link to this property</a>

object\_tag: optional string

The zone or account tag.

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: optional "zone"or "account"

Whether the job is zone-scoped or account-scoped.

</summary>

One of the following:

"zone"

<a href="#">Link to this property</a>

"account"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

When the transformer was created (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

dataset: optional string

The dataset this transformer operates on, derived from the SQL query’s FROM clause. Informational only. May be absent if the dataset cannot be determined from the query.

<a href="#">Link to this property</a>

description: optional string

Optional customer-provided description.

maxLength4096

<a href="#">Link to this property</a>

name: optional string

Customer-provided name for identification.

maxLength255

<a href="#">Link to this property</a>

updated\_at: optional string

When the transformer was last modified (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.transformers%20%3E%20(model)%20transformer_list_response%20%3E%20(schema)>)

<details>

<summary>

TransformerGetResponse object {id, associated\_jobs, created\_at, 4 more }

</summary>

id: optional number

The transformer ID.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

associated\_jobs: optional array of object {id, name, object\_tag, object\_type }

Logpush jobs that reference this transformer.

</summary>

id: optional number

The logpush job ID.

<a href="#">Link to this property</a>

name: optional string

The logpush job destination name.

<a href="#">Link to this property</a>

object\_tag: optional string

The zone or account tag.

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: optional "zone"or "account"

Whether the job is zone-scoped or account-scoped.

</summary>

One of the following:

"zone"

<a href="#">Link to this property</a>

"account"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

When the transformer was created (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

dataset: optional string

The dataset this transformer operates on, derived from the SQL query’s FROM clause. Informational only. May be absent if the dataset cannot be determined from the query.

<a href="#">Link to this property</a>

description: optional string

Optional customer-provided description.

maxLength4096

<a href="#">Link to this property</a>

name: optional string

Customer-provided name for identification.

maxLength255

<a href="#">Link to this property</a>

updated\_at: optional string

When the transformer was last modified (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.transformers%20%3E%20(model)%20transformer_get_response%20%3E%20(schema)>)

<details>

<summary>

TransformerCreateResponse object {id, associated\_jobs, created\_at, 4 more }

</summary>

id: optional number

The transformer ID.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

associated\_jobs: optional array of object {id, name, object\_tag, object\_type }

Logpush jobs that reference this transformer.

</summary>

id: optional number

The logpush job ID.

<a href="#">Link to this property</a>

name: optional string

The logpush job destination name.

<a href="#">Link to this property</a>

object\_tag: optional string

The zone or account tag.

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: optional "zone"or "account"

Whether the job is zone-scoped or account-scoped.

</summary>

One of the following:

"zone"

<a href="#">Link to this property</a>

"account"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

When the transformer was created (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

dataset: optional string

The dataset this transformer operates on, derived from the SQL query’s FROM clause. Informational only. May be absent if the dataset cannot be determined from the query.

<a href="#">Link to this property</a>

description: optional string

Optional customer-provided description.

maxLength4096

<a href="#">Link to this property</a>

name: optional string

Customer-provided name for identification.

maxLength255

<a href="#">Link to this property</a>

updated\_at: optional string

When the transformer was last modified (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.transformers%20%3E%20(model)%20transformer_create_response%20%3E%20(schema)>)

<details>

<summary>

TransformerUpdateResponse object {id, associated\_jobs, created\_at, 4 more }

</summary>

id: optional number

The transformer ID.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

associated\_jobs: optional array of object {id, name, object\_tag, object\_type }

Logpush jobs that reference this transformer.

</summary>

id: optional number

The logpush job ID.

<a href="#">Link to this property</a>

name: optional string

The logpush job destination name.

<a href="#">Link to this property</a>

object\_tag: optional string

The zone or account tag.

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: optional "zone"or "account"

Whether the job is zone-scoped or account-scoped.

</summary>

One of the following:

"zone"

<a href="#">Link to this property</a>

"account"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

When the transformer was created (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

dataset: optional string

The dataset this transformer operates on, derived from the SQL query’s FROM clause. Informational only. May be absent if the dataset cannot be determined from the query.

<a href="#">Link to this property</a>

description: optional string

Optional customer-provided description.

maxLength4096

<a href="#">Link to this property</a>

name: optional string

Customer-provided name for identification.

maxLength255

<a href="#">Link to this property</a>

updated\_at: optional string

When the transformer was last modified (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.transformers%20%3E%20(model)%20transformer_update_response%20%3E%20(schema)>)

<details>

<summary>

TransformerDeleteResponse object {id }

</summary>

id: optional number

The deleted transformer’s ID.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.transformers%20%3E%20(model)%20transformer_delete_response%20%3E%20(schema)>)

TransformerPreviewResponse = map\[unknown]

[Link to this property](#)%20logpush.transformers%20%3E%20(model)%20transformer_preview_response%20%3E%20(schema)>)

#### TransformersContent

##### [Get transformer content](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers/subresources/content/methods/get)

GET/accounts/{account\_id}/logpush/transformers/{transformer\_id}/content

##### ModelsExpand Collapse

<details>

<summary>

ContentGetResponse object {content }

</summary>

content: optional string

The SQL query content.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.transformers.content%20%3E%20(model)%20content_get_response%20%3E%20(schema)>)

#### TransformersVersions

##### [List transformer versions](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers/subresources/versions/methods/list)

GET/accounts/{account\_id}/logpush/transformers/{transformer\_id}/versions

##### ModelsExpand Collapse

<details>

<summary>

VersionListResponse object {id, created\_at, version }

</summary>

id: optional number

Unique identifier for this version.

formatint64

minimum1

<a href="#">Link to this property</a>

created\_at: optional string

When this version was created (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

version: optional number

Sequential version number.

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.transformers.versions%20%3E%20(model)%20version_list_response%20%3E%20(schema)>)