---
title: Indexes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Vectorize](https://developers.cloudflare.com/api/resources/vectorize)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Indexes

##### [List Vectorize Indexes](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/list)

GET/accounts/{account\_id}/vectorize/v2/indexes

##### [Get Vectorize Index](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/get)

GET/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}

##### [Create Vectorize Index](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/create)

POST/accounts/{account\_id}/vectorize/v2/indexes

##### [Delete Vectorize Index](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/delete)

DELETE/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}

##### [Insert Vectors](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/insert)

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/insert

##### [Query Vectors](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/query)

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/query

##### [Upsert Vectors](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/upsert)

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/upsert

##### [Delete Vectors By Identifier](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/delete_by_ids)

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/delete\_by\_ids

##### [Get Vectors By Identifier](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/get_by_ids)

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/get\_by\_ids

##### [Get Vectorize Index Info](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/info)

GET/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/info

##### [List Vectors](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/list_vectors)

GET/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/list

##### ModelsExpand Collapse

<details>

<summary>

CreateIndex object {config, created\_on, description, 2 more }

</summary>

config: optional <a href="https://developers.cloudflare.com/api/resources/vectorize#(resource)%20vectorize.indexes%20%3E%20(model)%20index_dimension_configuration%20%3E%20(schema)">IndexDimensionConfiguration</a> { dimensions, metric }

<a href="#">Link to this property</a>

created\_on: optional string

Specifies the timestamp the resource was created as an ISO8601 string.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specifies the description of the index.

<a href="#">Link to this property</a>

modified\_on: optional string

Specifies the timestamp the resource was modified as an ISO8601 string.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20create_index%20%3E%20(schema)>)

<details>

<summary>

IndexDeleteVectorsByID object {count, ids }

</summary>

count: optional number

The count of the vectors successfully deleted.

<a href="#">Link to this property</a>

ids: optional array of string

Array of vector identifiers of the vectors that were successfully processed for deletion.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_delete_vectors_by_id%20%3E%20(schema)>)

<details>

<summary>

IndexDimensionConfiguration object {dimensions, metric }

</summary>

dimensions: number

Specifies the number of dimensions for the index

maximum1536

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

metric: "cosine"or "euclidean"or "dot-product"

Specifies the type of metric to use calculating distance.

</summary>

One of the following:

"cosine"

<a href="#">Link to this property</a>

"euclidean"

<a href="#">Link to this property</a>

"dot-product"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_dimension_configuration%20%3E%20(schema)>)

<details>

<summary>

IndexInsert object {count, ids }

</summary>

count: optional number

Specifies the count of the vectors successfully inserted.

<a href="#">Link to this property</a>

ids: optional array of string

Array of vector identifiers of the vectors successfully inserted.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_insert%20%3E%20(schema)>)

<details>

<summary>

IndexQuery object {count, matches }

</summary>

count: optional number

Specifies the count of vectors returned by the search

<a href="#">Link to this property</a>

<details>

<summary>

matches: optional array of object {id, metadata, score, values }

Array of vectors matched by the search

</summary>

id: optional string

Identifier for a Vector

maxLength64

<a href="#">Link to this property</a>

metadata: optional unknown

<a href="#">Link to this property</a>

score: optional number

The score of the vector according to the index’s distance metric

<a href="#">Link to this property</a>

values: optional array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_query%20%3E%20(schema)>)

<details>

<summary>

IndexUpsert object {count, ids }

</summary>

count: optional number

Specifies the count of the vectors successfully inserted.

<a href="#">Link to this property</a>

ids: optional array of string

Array of vector identifiers of the vectors successfully inserted.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_upsert%20%3E%20(schema)>)

<details>

<summary>

IndexDeleteResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_delete_response%20%3E%20(schema)>)

<details>

<summary>

IndexInsertResponse object {mutationId }

</summary>

mutationId: optional string

The unique identifier for the async mutation operation containing the changeset.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_insert_response%20%3E%20(schema)>)

<details>

<summary>

IndexQueryResponse object {count, matches }

</summary>

count: optional number

Specifies the count of vectors returned by the search

<a href="#">Link to this property</a>

<details>

<summary>

matches: optional array of object {id, metadata, namespace, 2 more }

Array of vectors matched by the search

</summary>

id: optional string

Identifier for a Vector

maxLength64

<a href="#">Link to this property</a>

metadata: optional unknown

<a href="#">Link to this property</a>

namespace: optional string

<a href="#">Link to this property</a>

score: optional number

The score of the vector according to the index’s distance metric

<a href="#">Link to this property</a>

values: optional array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_query_response%20%3E%20(schema)>)

<details>

<summary>

IndexUpsertResponse object {mutationId }

</summary>

mutationId: optional string

The unique identifier for the async mutation operation containing the changeset.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_upsert_response%20%3E%20(schema)>)

<details>

<summary>

IndexDeleteByIDsResponse object {mutationId }

</summary>

mutationId: optional string

The unique identifier for the async mutation operation containing the changeset.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_delete_by_ids_response%20%3E%20(schema)>)

IndexGetByIDsResponse = unknown

Array of vectors with matching ids.

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_get_by_ids_response%20%3E%20(schema)>)

<details>

<summary>

IndexInfoResponse object {dimensions, processedUpToDatetime, processedUpToMutation, vectorCount }

</summary>

dimensions: optional number

Specifies the number of dimensions for the index

maximum1536

minimum1

<a href="#">Link to this property</a>

processedUpToDatetime: optional string

Specifies the timestamp the last mutation batch was processed as an ISO8601 string.

formatdate-time

<a href="#">Link to this property</a>

processedUpToMutation: optional string

The unique identifier for the async mutation operation containing the changeset.

maxLength36

<a href="#">Link to this property</a>

vectorCount: optional number

Specifies the number of vectors present in the index

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_info_response%20%3E%20(schema)>)

<details>

<summary>

IndexListVectorsResponse object {count, isTruncated, totalCount, 3 more }

</summary>

count: number

Number of vectors returned in this response

<a href="#">Link to this property</a>

isTruncated: boolean

Whether there are more vectors available beyond this response

<a href="#">Link to this property</a>

totalCount: number

Total number of vectors in the index

<a href="#">Link to this property</a>

<details>

<summary>

vectors: array of object {id }

Array of vector items

</summary>

id: string

Identifier for a Vector

maxLength64

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cursorExpirationTimestamp: optional string

When the cursor expires as an ISO8601 string

formatdate-time

<a href="#">Link to this property</a>

nextCursor: optional string

Cursor for the next page of results

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(model)%20index_list_vectors_response%20%3E%20(schema)>)

#### IndexesMetadata Index

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