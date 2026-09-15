---
title: Metadata Index
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Vectorize](https://developers.cloudflare.com/api/resources/vectorize)

[Indexes](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Metadata Index

##### [List Metadata Indexes](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/subresources/metadata_index/methods/list)

GET/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/metadata\_index/list

##### [Create Metadata Index](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/subresources/metadata_index/methods/create)

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/metadata\_index/create

##### [Delete Metadata Index](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/subresources/metadata_index/methods/delete)

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/metadata\_index/delete

##### ModelsExpand Collapse

<details>

<summary>

MetadataIndexListResponse object {metadataIndexes }

</summary>

<details>

<summary>

metadataIndexes: optional array of object {indexType, propertyName }

Array of indexed metadata properties.

</summary>

<details>

<summary>

indexType: optional "string"or "number"or "boolean"

Specifies the type of indexed metadata property.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

propertyName: optional string

Specifies the indexed metadata property.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(model)%20metadata_index_list_response%20%3E%20(schema)>)

<details>

<summary>

MetadataIndexCreateResponse object {mutationId }

</summary>

mutationId: optional string

The unique identifier for the async mutation operation containing the changeset.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(model)%20metadata_index_create_response%20%3E%20(schema)>)

<details>

<summary>

MetadataIndexDeleteResponse object {mutationId }

</summary>

mutationId: optional string

The unique identifier for the async mutation operation containing the changeset.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(model)%20metadata_index_delete_response%20%3E%20(schema)>)