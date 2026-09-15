---
title: Pipelines
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Pipelines

##### [\[DEPRECATED\] List Pipelines](https://developers.cloudflare.com/api/resources/pipelines/methods/list)

Deprecated

GET/accounts/{account\_id}/pipelines

##### [\[DEPRECATED\] Get Pipeline](https://developers.cloudflare.com/api/resources/pipelines/methods/get)

Deprecated

GET/accounts/{account\_id}/pipelines/{pipeline\_name}

##### [\[DEPRECATED\] Create Pipeline](https://developers.cloudflare.com/api/resources/pipelines/methods/create)

Deprecated

POST/accounts/{account\_id}/pipelines

##### [\[DEPRECATED\] Update Pipeline](https://developers.cloudflare.com/api/resources/pipelines/methods/update)

Deprecated

PUT/accounts/{account\_id}/pipelines/{pipeline\_name}

##### [\[DEPRECATED\] Delete Pipeline](https://developers.cloudflare.com/api/resources/pipelines/methods/delete)

Deprecated

DELETE/accounts/{account\_id}/pipelines/{pipeline\_name}

##### [List Pipelines](https://developers.cloudflare.com/api/resources/pipelines/methods/list_v1)

GET/accounts/{account\_id}/pipelines/v1/pipelines

##### [Get Pipeline Details](https://developers.cloudflare.com/api/resources/pipelines/methods/get_v1)

GET/accounts/{account\_id}/pipelines/v1/pipelines/{pipeline\_id}

##### [Create Pipeline](https://developers.cloudflare.com/api/resources/pipelines/methods/create_v1)

POST/accounts/{account\_id}/pipelines/v1/pipelines

##### [Delete Pipeline](https://developers.cloudflare.com/api/resources/pipelines/methods/delete_v1)

DELETE/accounts/{account\_id}/pipelines/v1/pipelines/{pipeline\_id}

##### [Validate SQL](https://developers.cloudflare.com/api/resources/pipelines/methods/validate_sql)

POST/accounts/{account\_id}/pipelines/v1/validate\_sql

##### ModelsExpand Collapse

<details>

<summary>

FieldType = object {type } or object {type } or object {type } or 8 more

</summary>

One of the following:

<details>

<summary>

Int32 object {type }

</summary>

type: "int32"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type }

</summary>

type: "int64"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type }

</summary>

type: "float32"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type }

</summary>

type: "float64"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type }

</summary>

type: "bool"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type }

</summary>

type: "string"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type }

</summary>

type: "binary"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, unit }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type }

</summary>

type: "json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct object {fields, type, name }

</summary>

<details>

<summary>

fields: array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "struct"

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List object {items, type }

</summary>

items: <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

<a href="#">Link to this property</a>

type: "list"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20field_type%20%3E%20(schema)>)

<details>

<summary>

ListField object {items }

</summary>

items: <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)>)

<details>

<summary>

SourceField = object {type, metadata\_key, name, 2 more } or object {type, metadata\_key, name, 2 more } or object {type, metadata\_key, name, 2 more } or 8 more

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)>)

<details>

<summary>

StructField object {fields, name }

</summary>

fields: array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)>)

<details>

<summary>

PipelineListResponse object {result\_info, results, success }

</summary>

<details>

<summary>

result\_info: object {count, page, per\_page, total\_count }

</summary>

count: number

Indicates the number of items on current page.

<a href="#">Link to this property</a>

page: number

Indicates the current page number.

<a href="#">Link to this property</a>

per\_page: number

Indicates the number of items per page.

<a href="#">Link to this property</a>

total\_count: number

Indicates the total number of items.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

results: array of object {id, destination, endpoint, 3 more }

</summary>

id: string

Specifies the pipeline identifier.

<a href="#">Link to this property</a>

<details>

<summary>

destination: object {batch, compression, format, 2 more }

</summary>

<details>

<summary>

batch: object {max\_bytes, max\_duration\_s, max\_rows }

</summary>

max\_bytes: number

Specifies rough maximum size of files.

maximum100000000

minimum1000

<a href="#">Link to this property</a>

max\_duration\_s: number

Specifies duration to wait to aggregate batches files.

maximum300

minimum0.25

<a href="#">Link to this property</a>

max\_rows: number

Specifies rough maximum number of rows per file.

maximum10000000

minimum100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

compression: object {type }

</summary>

<details>

<summary>

type: "none"or "gzip"or "deflate"

Specifies the desired compression algorithm and format.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"deflate"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

format: "json"

Specifies the format of data to deliver.

<a href="#">Link to this property</a>

<details>

<summary>

path: object {bucket, filename, filepath, prefix }

</summary>

bucket: string

Specifies the R2 Bucket to store files.

<a href="#">Link to this property</a>

filename: optional string

Specifies the name pattern to for individual data files.

<a href="#">Link to this property</a>

filepath: optional string

Specifies the name pattern for directory.

<a href="#">Link to this property</a>

prefix: optional string

Specifies the base directory within the bucket.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "r2"

Specifies the type of destination.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endpoint: string

Indicates the endpoint URL to send traffic.

<a href="#">Link to this property</a>

name: string

Defines the name of the pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

source: array of object {format, type, authentication, cors } or object {format, type }

</summary>

One of the following:

<details>

<summary>

CloudflarePipelinesWorkersPipelinesHTTPSource object {format, type, authentication, cors }

\[DEPRECATED] HTTP source configuration. Use the new streams API instead.

</summary>

format: "json"

Specifies the format of source data.

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

authentication: optional boolean

Specifies whether authentication is required to send to this pipeline via HTTP.

<a href="#">Link to this property</a>

<details>

<summary>

cors: optional object {origins }

</summary>

origins: optional array of string

Specifies allowed origins to allow Cross Origin HTTP Requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CloudflarePipelinesWorkersPipelinesBindingSource object {format, type }

\[DEPRECATED] Worker binding source configuration. Use the new streams API instead.

</summary>

format: "json"

Specifies the format of source data.

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: number

Indicates the version number of last saved configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: boolean

Indicates whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_list_response%20%3E%20(schema)>)

<details>

<summary>

PipelineGetResponse object {id, destination, endpoint, 3 more }

\[DEPRECATED] Describes the configuration of a pipeline. Use the new streams/sinks/pipelines API instead.

</summary>

id: string

Specifies the pipeline identifier.

<a href="#">Link to this property</a>

<details>

<summary>

destination: object {batch, compression, format, 2 more }

</summary>

<details>

<summary>

batch: object {max\_bytes, max\_duration\_s, max\_rows }

</summary>

max\_bytes: number

Specifies rough maximum size of files.

maximum100000000

minimum1000

<a href="#">Link to this property</a>

max\_duration\_s: number

Specifies duration to wait to aggregate batches files.

maximum300

minimum0.25

<a href="#">Link to this property</a>

max\_rows: number

Specifies rough maximum number of rows per file.

maximum10000000

minimum100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

compression: object {type }

</summary>

<details>

<summary>

type: "none"or "gzip"or "deflate"

Specifies the desired compression algorithm and format.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"deflate"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

format: "json"

Specifies the format of data to deliver.

<a href="#">Link to this property</a>

<details>

<summary>

path: object {bucket, filename, filepath, prefix }

</summary>

bucket: string

Specifies the R2 Bucket to store files.

<a href="#">Link to this property</a>

filename: optional string

Specifies the name pattern to for individual data files.

<a href="#">Link to this property</a>

filepath: optional string

Specifies the name pattern for directory.

<a href="#">Link to this property</a>

prefix: optional string

Specifies the base directory within the bucket.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "r2"

Specifies the type of destination.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endpoint: string

Indicates the endpoint URL to send traffic.

<a href="#">Link to this property</a>

name: string

Defines the name of the pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

source: array of object {format, type, authentication, cors } or object {format, type }

</summary>

One of the following:

<details>

<summary>

CloudflarePipelinesWorkersPipelinesHTTPSource object {format, type, authentication, cors }

\[DEPRECATED] HTTP source configuration. Use the new streams API instead.

</summary>

format: "json"

Specifies the format of source data.

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

authentication: optional boolean

Specifies whether authentication is required to send to this pipeline via HTTP.

<a href="#">Link to this property</a>

<details>

<summary>

cors: optional object {origins }

</summary>

origins: optional array of string

Specifies allowed origins to allow Cross Origin HTTP Requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CloudflarePipelinesWorkersPipelinesBindingSource object {format, type }

\[DEPRECATED] Worker binding source configuration. Use the new streams API instead.

</summary>

format: "json"

Specifies the format of source data.

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: number

Indicates the version number of last saved configuration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_get_response%20%3E%20(schema)>)

<details>

<summary>

PipelineCreateResponse object {id, destination, endpoint, 3 more }

\[DEPRECATED] Describes the configuration of a pipeline. Use the new streams/sinks/pipelines API instead.

</summary>

id: string

Specifies the pipeline identifier.

<a href="#">Link to this property</a>

<details>

<summary>

destination: object {batch, compression, format, 2 more }

</summary>

<details>

<summary>

batch: object {max\_bytes, max\_duration\_s, max\_rows }

</summary>

max\_bytes: number

Specifies rough maximum size of files.

maximum100000000

minimum1000

<a href="#">Link to this property</a>

max\_duration\_s: number

Specifies duration to wait to aggregate batches files.

maximum300

minimum0.25

<a href="#">Link to this property</a>

max\_rows: number

Specifies rough maximum number of rows per file.

maximum10000000

minimum100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

compression: object {type }

</summary>

<details>

<summary>

type: "none"or "gzip"or "deflate"

Specifies the desired compression algorithm and format.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"deflate"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

format: "json"

Specifies the format of data to deliver.

<a href="#">Link to this property</a>

<details>

<summary>

path: object {bucket, filename, filepath, prefix }

</summary>

bucket: string

Specifies the R2 Bucket to store files.

<a href="#">Link to this property</a>

filename: optional string

Specifies the name pattern to for individual data files.

<a href="#">Link to this property</a>

filepath: optional string

Specifies the name pattern for directory.

<a href="#">Link to this property</a>

prefix: optional string

Specifies the base directory within the bucket.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "r2"

Specifies the type of destination.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endpoint: string

Indicates the endpoint URL to send traffic.

<a href="#">Link to this property</a>

name: string

Defines the name of the pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

source: array of object {format, type, authentication, cors } or object {format, type }

</summary>

One of the following:

<details>

<summary>

CloudflarePipelinesWorkersPipelinesHTTPSource object {format, type, authentication, cors }

\[DEPRECATED] HTTP source configuration. Use the new streams API instead.

</summary>

format: "json"

Specifies the format of source data.

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

authentication: optional boolean

Specifies whether authentication is required to send to this pipeline via HTTP.

<a href="#">Link to this property</a>

<details>

<summary>

cors: optional object {origins }

</summary>

origins: optional array of string

Specifies allowed origins to allow Cross Origin HTTP Requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CloudflarePipelinesWorkersPipelinesBindingSource object {format, type }

\[DEPRECATED] Worker binding source configuration. Use the new streams API instead.

</summary>

format: "json"

Specifies the format of source data.

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: number

Indicates the version number of last saved configuration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_create_response%20%3E%20(schema)>)

<details>

<summary>

PipelineUpdateResponse object {id, destination, endpoint, 3 more }

\[DEPRECATED] Describes the configuration of a pipeline. Use the new streams/sinks/pipelines API instead.

</summary>

id: string

Specifies the pipeline identifier.

<a href="#">Link to this property</a>

<details>

<summary>

destination: object {batch, compression, format, 2 more }

</summary>

<details>

<summary>

batch: object {max\_bytes, max\_duration\_s, max\_rows }

</summary>

max\_bytes: number

Specifies rough maximum size of files.

maximum100000000

minimum1000

<a href="#">Link to this property</a>

max\_duration\_s: number

Specifies duration to wait to aggregate batches files.

maximum300

minimum0.25

<a href="#">Link to this property</a>

max\_rows: number

Specifies rough maximum number of rows per file.

maximum10000000

minimum100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

compression: object {type }

</summary>

<details>

<summary>

type: "none"or "gzip"or "deflate"

Specifies the desired compression algorithm and format.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"deflate"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

format: "json"

Specifies the format of data to deliver.

<a href="#">Link to this property</a>

<details>

<summary>

path: object {bucket, filename, filepath, prefix }

</summary>

bucket: string

Specifies the R2 Bucket to store files.

<a href="#">Link to this property</a>

filename: optional string

Specifies the name pattern to for individual data files.

<a href="#">Link to this property</a>

filepath: optional string

Specifies the name pattern for directory.

<a href="#">Link to this property</a>

prefix: optional string

Specifies the base directory within the bucket.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "r2"

Specifies the type of destination.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endpoint: string

Indicates the endpoint URL to send traffic.

<a href="#">Link to this property</a>

name: string

Defines the name of the pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

source: array of object {format, type, authentication, cors } or object {format, type }

</summary>

One of the following:

<details>

<summary>

CloudflarePipelinesWorkersPipelinesHTTPSource object {format, type, authentication, cors }

\[DEPRECATED] HTTP source configuration. Use the new streams API instead.

</summary>

format: "json"

Specifies the format of source data.

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

authentication: optional boolean

Specifies whether authentication is required to send to this pipeline via HTTP.

<a href="#">Link to this property</a>

<details>

<summary>

cors: optional object {origins }

</summary>

origins: optional array of string

Specifies allowed origins to allow Cross Origin HTTP Requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CloudflarePipelinesWorkersPipelinesBindingSource object {format, type }

\[DEPRECATED] Worker binding source configuration. Use the new streams API instead.

</summary>

format: "json"

Specifies the format of source data.

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: number

Indicates the version number of last saved configuration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_update_response%20%3E%20(schema)>)

<details>

<summary>

PipelineListV1Response object {id, created\_at, modified\_at, 3 more }

</summary>

id: string

Indicates a unique identifier for this pipeline.

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

modified\_at: string

<a href="#">Link to this property</a>

name: string

Indicates the name of the Pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

sql: string

Specifies SQL for the Pipeline processing flow.

<a href="#">Link to this property</a>

status: string

Indicates the current status of the Pipeline.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_list_v1_response%20%3E%20(schema)>)

<details>

<summary>

PipelineGetV1Response object {id, created\_at, modified\_at, 5 more }

</summary>

id: string

Indicates a unique identifier for this pipeline.

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

modified\_at: string

<a href="#">Link to this property</a>

name: string

Indicates the name of the Pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

sql: string

Specifies SQL for the Pipeline processing flow.

<a href="#">Link to this property</a>

status: string

Indicates the current status of the Pipeline.

<a href="#">Link to this property</a>

<details>

<summary>

tables: array of object {id, latest, name, 2 more }

List of streams and sinks used by this pipeline.

</summary>

id: string

Unique identifier for the connection (stream or sink).

<a href="#">Link to this property</a>

latest: number

Latest available version of the connection.

<a href="#">Link to this property</a>

name: string

Name of the connection.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

type: "stream"or "sink"

Type of the connection.

</summary>

One of the following:

"stream"

<a href="#">Link to this property</a>

"sink"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: number

Current version of the connection used by this pipeline.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

failure\_reason: optional string

Indicates the reason for the failure of the Pipeline.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_get_v1_response%20%3E%20(schema)>)

<details>

<summary>

PipelineCreateV1Response object {id, created\_at, modified\_at, 3 more }

</summary>

id: string

Indicates a unique identifier for this pipeline.

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

modified\_at: string

<a href="#">Link to this property</a>

name: string

Indicates the name of the Pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

sql: string

Specifies SQL for the Pipeline processing flow.

<a href="#">Link to this property</a>

status: string

Indicates the current status of the Pipeline.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_create_v1_response%20%3E%20(schema)>)

PipelineDeleteV1Response = unknown

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_delete_v1_response%20%3E%20(schema)>)

<details>

<summary>

PipelineValidateSqlResponse object {tables, graph }

</summary>

<details>

<summary>

tables: map\[object {id, name, type, version } ]

Indicates tables involved in the processing.

</summary>

id: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

version: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

graph: optional object {edges, nodes }

Indicates the processing flow to implement the SQL.

</summary>

<details>

<summary>

edges: array of object {dest\_id, edge\_type, key\_type, 2 more }

</summary>

dest\_id: number

formatint32

minimum0

<a href="#">Link to this property</a>

edge\_type: string

<a href="#">Link to this property</a>

key\_type: string

<a href="#">Link to this property</a>

src\_id: number

formatint32

minimum0

<a href="#">Link to this property</a>

value\_type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

nodes: array of object {description, node\_id, operator, parallelism }

</summary>

description: string

<a href="#">Link to this property</a>

node\_id: number

formatint32

minimum0

<a href="#">Link to this property</a>

operator: string

<a href="#">Link to this property</a>

parallelism: number

formatint32

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(model)%20pipeline_validate_sql_response%20%3E%20(schema)>)

#### PipelinesSinks

##### [List Sinks](https://developers.cloudflare.com/api/resources/pipelines/subresources/sinks/methods/list)

GET/accounts/{account\_id}/pipelines/v1/sinks

##### [Get Sink Details](https://developers.cloudflare.com/api/resources/pipelines/subresources/sinks/methods/get)

GET/accounts/{account\_id}/pipelines/v1/sinks/{sink\_id}

##### [Create Sink](https://developers.cloudflare.com/api/resources/pipelines/subresources/sinks/methods/create)

POST/accounts/{account\_id}/pipelines/v1/sinks

##### [Delete Sink](https://developers.cloudflare.com/api/resources/pipelines/subresources/sinks/methods/delete)

DELETE/accounts/{account\_id}/pipelines/v1/sinks/{sink\_id}

##### ModelsExpand Collapse

<details>

<summary>

SinkListResponse object {id, created\_at, modified\_at, 5 more }

</summary>

id: string

Indicates a unique identifier for this sink.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

Defines the name of the Sink.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

type: "r2"or "r2\_data\_catalog"

Specifies the type of sink.

</summary>

One of the following:

"r2"

<a href="#">Link to this property</a>

"r2\_data\_catalog"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {account\_id, bucket, file\_naming, 4 more } or object {account\_id, bucket, table\_name, 2 more }

Defines the configuration of the R2 Sink.

</summary>

One of the following:

<details>

<summary>

CloudflarePipelinesR2TablePublic object {account\_id, bucket, file\_naming, 4 more }

R2 Sink public configuration.

</summary>

account\_id: string

Cloudflare Account ID for the bucket

<a href="#">Link to this property</a>

bucket: string

R2 Bucket to write to

<a href="#">Link to this property</a>

<details>

<summary>

file\_naming: optional object {prefix, strategy, suffix }

Controls filename prefix/suffix and strategy.

</summary>

prefix: optional string

The prefix to use in file name. i.e prefix-.parquet

<a href="#">Link to this property</a>

<details>

<summary>

strategy: optional "serial"or "uuid"or "uuid\_v7"or "ulid"

Filename generation strategy.

</summary>

One of the following:

"serial"

<a href="#">Link to this property</a>

"uuid"

<a href="#">Link to this property</a>

"uuid\_v7"

<a href="#">Link to this property</a>

"ulid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suffix: optional string

This will overwrite the default file suffix. i.e .parquet, use with caution

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

jurisdiction: optional string

Jurisdiction this bucket is hosted in

<a href="#">Link to this property</a>

<details>

<summary>

partitioning: optional object {time\_pattern }

Data-layout partitioning for sinks.

</summary>

time\_pattern: optional string

The pattern of the date string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

Subpath within the bucket to write to

<a href="#">Link to this property</a>

<details>

<summary>

rolling\_policy: optional object {file\_size\_bytes, inactivity\_seconds, interval\_seconds }

Rolling policy for file sinks (when &amp; why to close a file and open a new one).

</summary>

file\_size\_bytes: optional number

Files will be rolled after reaching this number of bytes

formatuint64

minimum0

<a href="#">Link to this property</a>

inactivity\_seconds: optional number

Number of seconds of inactivity to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

interval\_seconds: optional number

Number of seconds to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CloudflarePipelinesR2DataCatalogTablePublic object {account\_id, bucket, table\_name, 2 more }

R2 Data Catalog Sink public configuration.

</summary>

account\_id: string

Cloudflare Account ID

formaturi

<a href="#">Link to this property</a>

bucket: string

The R2 Bucket that hosts this catalog

<a href="#">Link to this property</a>

table\_name: string

Table name

<a href="#">Link to this property</a>

namespace: optional string

Table namespace

<a href="#">Link to this property</a>

<details>

<summary>

rolling\_policy: optional object {file\_size\_bytes, inactivity\_seconds, interval\_seconds }

Rolling policy for file sinks (when &amp; why to close a file and open a new one).

</summary>

file\_size\_bytes: optional number

Files will be rolled after reaching this number of bytes

formatuint64

minimum0

<a href="#">Link to this property</a>

inactivity\_seconds: optional number

Number of seconds of inactivity to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

interval\_seconds: optional number

Number of seconds to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional object {type, compression, decimal\_encoding, 2 more } or object {type, compression, row\_group\_bytes }

Defines the output data format of a sink.

</summary>

One of the following:

<details>

<summary>

Json object {type, compression, decimal\_encoding, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "gzip"

Specifies the compression applied to JSON sink output.

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

decimal\_encoding: optional "number"or "string"or "bytes"

</summary>

One of the following:

"number"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"bytes"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timestamp\_format: optional "rfc3339"or "unix\_millis"

</summary>

One of the following:

"rfc3339"

<a href="#">Link to this property</a>

"unix\_millis"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unstructured: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Parquet object {type, compression, row\_group\_bytes }

</summary>

type: "parquet"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "snappy"or "gzip"or 2 more

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"snappy"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"zstd"

<a href="#">Link to this property</a>

"lz4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

row\_group\_bytes: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional object {fields, inferred }

Defines the schema of the events in the data stream.

</summary>

<details>

<summary>

fields: optional array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inferred: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines.sinks%20%3E%20(model)%20sink_list_response%20%3E%20(schema)>)

<details>

<summary>

SinkGetResponse object {id, created\_at, modified\_at, 5 more }

</summary>

id: string

Indicates a unique identifier for this sink.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

Defines the name of the Sink.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

type: "r2"or "r2\_data\_catalog"

Specifies the type of sink.

</summary>

One of the following:

"r2"

<a href="#">Link to this property</a>

"r2\_data\_catalog"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {account\_id, bucket, file\_naming, 4 more } or object {account\_id, bucket, table\_name, 2 more }

Defines the configuration of the R2 Sink.

</summary>

One of the following:

<details>

<summary>

CloudflarePipelinesR2TablePublic object {account\_id, bucket, file\_naming, 4 more }

R2 Sink public configuration.

</summary>

account\_id: string

Cloudflare Account ID for the bucket

<a href="#">Link to this property</a>

bucket: string

R2 Bucket to write to

<a href="#">Link to this property</a>

<details>

<summary>

file\_naming: optional object {prefix, strategy, suffix }

Controls filename prefix/suffix and strategy.

</summary>

prefix: optional string

The prefix to use in file name. i.e prefix-.parquet

<a href="#">Link to this property</a>

<details>

<summary>

strategy: optional "serial"or "uuid"or "uuid\_v7"or "ulid"

Filename generation strategy.

</summary>

One of the following:

"serial"

<a href="#">Link to this property</a>

"uuid"

<a href="#">Link to this property</a>

"uuid\_v7"

<a href="#">Link to this property</a>

"ulid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suffix: optional string

This will overwrite the default file suffix. i.e .parquet, use with caution

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

jurisdiction: optional string

Jurisdiction this bucket is hosted in

<a href="#">Link to this property</a>

<details>

<summary>

partitioning: optional object {time\_pattern }

Data-layout partitioning for sinks.

</summary>

time\_pattern: optional string

The pattern of the date string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

Subpath within the bucket to write to

<a href="#">Link to this property</a>

<details>

<summary>

rolling\_policy: optional object {file\_size\_bytes, inactivity\_seconds, interval\_seconds }

Rolling policy for file sinks (when &amp; why to close a file and open a new one).

</summary>

file\_size\_bytes: optional number

Files will be rolled after reaching this number of bytes

formatuint64

minimum0

<a href="#">Link to this property</a>

inactivity\_seconds: optional number

Number of seconds of inactivity to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

interval\_seconds: optional number

Number of seconds to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CloudflarePipelinesR2DataCatalogTablePublic object {account\_id, bucket, table\_name, 2 more }

R2 Data Catalog Sink public configuration.

</summary>

account\_id: string

Cloudflare Account ID

formaturi

<a href="#">Link to this property</a>

bucket: string

The R2 Bucket that hosts this catalog

<a href="#">Link to this property</a>

table\_name: string

Table name

<a href="#">Link to this property</a>

namespace: optional string

Table namespace

<a href="#">Link to this property</a>

<details>

<summary>

rolling\_policy: optional object {file\_size\_bytes, inactivity\_seconds, interval\_seconds }

Rolling policy for file sinks (when &amp; why to close a file and open a new one).

</summary>

file\_size\_bytes: optional number

Files will be rolled after reaching this number of bytes

formatuint64

minimum0

<a href="#">Link to this property</a>

inactivity\_seconds: optional number

Number of seconds of inactivity to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

interval\_seconds: optional number

Number of seconds to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional object {type, compression, decimal\_encoding, 2 more } or object {type, compression, row\_group\_bytes }

Defines the output data format of a sink.

</summary>

One of the following:

<details>

<summary>

Json object {type, compression, decimal\_encoding, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "gzip"

Specifies the compression applied to JSON sink output.

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

decimal\_encoding: optional "number"or "string"or "bytes"

</summary>

One of the following:

"number"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"bytes"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timestamp\_format: optional "rfc3339"or "unix\_millis"

</summary>

One of the following:

"rfc3339"

<a href="#">Link to this property</a>

"unix\_millis"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unstructured: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Parquet object {type, compression, row\_group\_bytes }

</summary>

type: "parquet"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "snappy"or "gzip"or 2 more

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"snappy"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"zstd"

<a href="#">Link to this property</a>

"lz4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

row\_group\_bytes: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional object {fields, inferred }

Defines the schema of the events in the data stream.

</summary>

<details>

<summary>

fields: optional array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inferred: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines.sinks%20%3E%20(model)%20sink_get_response%20%3E%20(schema)>)

<details>

<summary>

SinkCreateResponse object {id, created\_at, modified\_at, 5 more }

</summary>

id: string

Indicates a unique identifier for this sink.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

Defines the name of the Sink.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

type: "r2"or "r2\_data\_catalog"

Specifies the type of sink.

</summary>

One of the following:

"r2"

<a href="#">Link to this property</a>

"r2\_data\_catalog"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {account\_id, bucket, credentials, 5 more } or object {token, account\_id, bucket, 3 more }

R2 Data Catalog Sink

</summary>

One of the following:

<details>

<summary>

CloudflarePipelinesR2Table object {account\_id, bucket, credentials, 5 more }

</summary>

account\_id: string

Cloudflare Account ID for the bucket

<a href="#">Link to this property</a>

bucket: string

R2 Bucket to write to

<a href="#">Link to this property</a>

<details>

<summary>

credentials: object {access\_key\_id, secret\_access\_key }

</summary>

access\_key\_id: string

Cloudflare Account ID for the bucket

formatvar-str

<a href="#">Link to this property</a>

secret\_access\_key: string

Cloudflare Account ID for the bucket

formatvar-str

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

file\_naming: optional object {prefix, strategy, suffix }

Controls filename prefix/suffix and strategy.

</summary>

prefix: optional string

The prefix to use in file name. i.e prefix-.parquet

<a href="#">Link to this property</a>

<details>

<summary>

strategy: optional "serial"or "uuid"or "uuid\_v7"or "ulid"

Filename generation strategy.

</summary>

One of the following:

"serial"

<a href="#">Link to this property</a>

"uuid"

<a href="#">Link to this property</a>

"uuid\_v7"

<a href="#">Link to this property</a>

"ulid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suffix: optional string

This will overwrite the default file suffix. i.e .parquet, use with caution

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

jurisdiction: optional string

Jurisdiction this bucket is hosted in

<a href="#">Link to this property</a>

<details>

<summary>

partitioning: optional object {time\_pattern }

Data-layout partitioning for sinks.

</summary>

time\_pattern: optional string

The pattern of the date string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

Subpath within the bucket to write to

<a href="#">Link to this property</a>

<details>

<summary>

rolling\_policy: optional object {file\_size\_bytes, inactivity\_seconds, interval\_seconds }

Rolling policy for file sinks (when &amp; why to close a file and open a new one).

</summary>

file\_size\_bytes: optional number

Files will be rolled after reaching this number of bytes

formatuint64

minimum0

<a href="#">Link to this property</a>

inactivity\_seconds: optional number

Number of seconds of inactivity to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

interval\_seconds: optional number

Number of seconds to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CloudflarePipelinesR2DataCatalogTable object {token, account\_id, bucket, 3 more }

R2 Data Catalog Sink

</summary>

token: string

Authentication token

formatvar-str

<a href="#">Link to this property</a>

account\_id: string

Cloudflare Account ID

formaturi

<a href="#">Link to this property</a>

bucket: string

The R2 Bucket that hosts this catalog

<a href="#">Link to this property</a>

table\_name: string

Table name

<a href="#">Link to this property</a>

namespace: optional string

Table namespace

<a href="#">Link to this property</a>

<details>

<summary>

rolling\_policy: optional object {file\_size\_bytes, inactivity\_seconds, interval\_seconds }

Rolling policy for file sinks (when &amp; why to close a file and open a new one).

</summary>

file\_size\_bytes: optional number

Files will be rolled after reaching this number of bytes

formatuint64

minimum0

<a href="#">Link to this property</a>

inactivity\_seconds: optional number

Number of seconds of inactivity to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

interval\_seconds: optional number

Number of seconds to wait before rolling over to a new file

formatuint64

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional object {type, compression, decimal\_encoding, 2 more } or object {type, compression, row\_group\_bytes }

Defines the output data format of a sink.

</summary>

One of the following:

<details>

<summary>

Json object {type, compression, decimal\_encoding, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "gzip"

Specifies the compression applied to JSON sink output.

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

decimal\_encoding: optional "number"or "string"or "bytes"

</summary>

One of the following:

"number"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"bytes"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timestamp\_format: optional "rfc3339"or "unix\_millis"

</summary>

One of the following:

"rfc3339"

<a href="#">Link to this property</a>

"unix\_millis"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unstructured: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Parquet object {type, compression, row\_group\_bytes }

</summary>

type: "parquet"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "snappy"or "gzip"or 2 more

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"snappy"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"zstd"

<a href="#">Link to this property</a>

"lz4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

row\_group\_bytes: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional object {fields, inferred }

Defines the schema of the events in the data stream.

</summary>

<details>

<summary>

fields: optional array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inferred: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines.sinks%20%3E%20(model)%20sink_create_response%20%3E%20(schema)>)

SinkDeleteResponse = unknown

[Link to this property](#)%20pipelines.sinks%20%3E%20(model)%20sink_delete_response%20%3E%20(schema)>)

#### PipelinesStreams

##### [List Streams](https://developers.cloudflare.com/api/resources/pipelines/subresources/streams/methods/list)

GET/accounts/{account\_id}/pipelines/v1/streams

##### [Get Stream Details](https://developers.cloudflare.com/api/resources/pipelines/subresources/streams/methods/get)

GET/accounts/{account\_id}/pipelines/v1/streams/{stream\_id}

##### [Create Stream](https://developers.cloudflare.com/api/resources/pipelines/subresources/streams/methods/create)

POST/accounts/{account\_id}/pipelines/v1/streams

##### [Update Stream](https://developers.cloudflare.com/api/resources/pipelines/subresources/streams/methods/update)

PATCH/accounts/{account\_id}/pipelines/v1/streams/{stream\_id}

##### [Delete Stream](https://developers.cloudflare.com/api/resources/pipelines/subresources/streams/methods/delete)

DELETE/accounts/{account\_id}/pipelines/v1/streams/{stream\_id}

##### ModelsExpand Collapse

<details>

<summary>

StreamListResponse object {id, created\_at, http, 7 more }

</summary>

id: string

Indicates a unique identifier for this stream.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

http: object {authentication, enabled, cors }

</summary>

authentication: boolean

Indicates that authentication is required for the HTTP endpoint.

<a href="#">Link to this property</a>

enabled: boolean

Indicates that the HTTP endpoint is enabled.

<a href="#">Link to this property</a>

<details>

<summary>

cors: optional object {origins }

Specifies the CORS options for the HTTP endpoint.

</summary>

origins: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

Indicates the name of the Stream.

maxLength128

minLength1

<a href="#">Link to this property</a>

version: number

Indicates the current version of this stream.

<a href="#">Link to this property</a>

<details>

<summary>

worker\_binding: object {enabled }

</summary>

enabled: boolean

Indicates that the worker binding is enabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endpoint: optional string

Indicates the endpoint URL of this stream.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

format: optional object {type, decimal\_encoding, timestamp\_format, unstructured } or object {type, compression, row\_group\_bytes }

Defines the data format of the events.

</summary>

One of the following:

<details>

<summary>

Json object {type, decimal\_encoding, timestamp\_format, unstructured }

</summary>

type: "json"

<a href="#">Link to this property</a>

<details>

<summary>

decimal\_encoding: optional "number"or "string"or "bytes"

</summary>

One of the following:

"number"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"bytes"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timestamp\_format: optional "rfc3339"or "unix\_millis"

</summary>

One of the following:

"rfc3339"

<a href="#">Link to this property</a>

"unix\_millis"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unstructured: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Parquet object {type, compression, row\_group\_bytes }

</summary>

type: "parquet"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "snappy"or "gzip"or 2 more

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"snappy"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"zstd"

<a href="#">Link to this property</a>

"lz4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

row\_group\_bytes: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional object {fields, inferred }

Defines the schema of the events in the data stream.

</summary>

<details>

<summary>

fields: optional array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inferred: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines.streams%20%3E%20(model)%20stream_list_response%20%3E%20(schema)>)

<details>

<summary>

StreamGetResponse object {id, created\_at, http, 7 more }

</summary>

id: string

Indicates a unique identifier for this stream.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

http: object {authentication, enabled, cors }

</summary>

authentication: boolean

Indicates that authentication is required for the HTTP endpoint.

<a href="#">Link to this property</a>

enabled: boolean

Indicates that the HTTP endpoint is enabled.

<a href="#">Link to this property</a>

<details>

<summary>

cors: optional object {origins }

Specifies the CORS options for the HTTP endpoint.

</summary>

origins: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

Indicates the name of the Stream.

maxLength128

minLength1

<a href="#">Link to this property</a>

version: number

Indicates the current version of this stream.

<a href="#">Link to this property</a>

<details>

<summary>

worker\_binding: object {enabled }

</summary>

enabled: boolean

Indicates that the worker binding is enabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endpoint: optional string

Indicates the endpoint URL of this stream.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

format: optional object {type, decimal\_encoding, timestamp\_format, unstructured } or object {type, compression, row\_group\_bytes }

Defines the data format of the events.

</summary>

One of the following:

<details>

<summary>

Json object {type, decimal\_encoding, timestamp\_format, unstructured }

</summary>

type: "json"

<a href="#">Link to this property</a>

<details>

<summary>

decimal\_encoding: optional "number"or "string"or "bytes"

</summary>

One of the following:

"number"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"bytes"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timestamp\_format: optional "rfc3339"or "unix\_millis"

</summary>

One of the following:

"rfc3339"

<a href="#">Link to this property</a>

"unix\_millis"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unstructured: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Parquet object {type, compression, row\_group\_bytes }

</summary>

type: "parquet"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "snappy"or "gzip"or 2 more

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"snappy"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"zstd"

<a href="#">Link to this property</a>

"lz4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

row\_group\_bytes: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional object {fields, inferred }

Defines the schema of the events in the data stream.

</summary>

<details>

<summary>

fields: optional array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inferred: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines.streams%20%3E%20(model)%20stream_get_response%20%3E%20(schema)>)

<details>

<summary>

StreamCreateResponse object {id, created\_at, http, 7 more }

</summary>

id: string

Indicates a unique identifier for this stream.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

http: object {authentication, enabled, cors }

</summary>

authentication: boolean

Indicates that authentication is required for the HTTP endpoint.

<a href="#">Link to this property</a>

enabled: boolean

Indicates that the HTTP endpoint is enabled.

<a href="#">Link to this property</a>

<details>

<summary>

cors: optional object {origins }

Specifies the CORS options for the HTTP endpoint.

</summary>

origins: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

Indicates the name of the Stream.

maxLength128

minLength1

<a href="#">Link to this property</a>

version: number

Indicates the current version of this stream.

<a href="#">Link to this property</a>

<details>

<summary>

worker\_binding: object {enabled }

</summary>

enabled: boolean

Indicates that the worker binding is enabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endpoint: optional string

Indicates the endpoint URL of this stream.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

format: optional object {type, decimal\_encoding, timestamp\_format, unstructured } or object {type, compression, row\_group\_bytes }

Defines the data format of the events.

</summary>

One of the following:

<details>

<summary>

Json object {type, decimal\_encoding, timestamp\_format, unstructured }

</summary>

type: "json"

<a href="#">Link to this property</a>

<details>

<summary>

decimal\_encoding: optional "number"or "string"or "bytes"

</summary>

One of the following:

"number"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"bytes"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timestamp\_format: optional "rfc3339"or "unix\_millis"

</summary>

One of the following:

"rfc3339"

<a href="#">Link to this property</a>

"unix\_millis"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unstructured: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Parquet object {type, compression, row\_group\_bytes }

</summary>

type: "parquet"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "snappy"or "gzip"or 2 more

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"snappy"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"zstd"

<a href="#">Link to this property</a>

"lz4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

row\_group\_bytes: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional object {fields, inferred }

Defines the schema of the events in the data stream.

</summary>

<details>

<summary>

fields: optional array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inferred: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines.streams%20%3E%20(model)%20stream_create_response%20%3E%20(schema)>)

<details>

<summary>

StreamUpdateResponse object {id, created\_at, http, 7 more }

</summary>

id: string

Indicates a unique identifier for this stream.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

http: object {authentication, enabled, cors }

</summary>

authentication: boolean

Indicates that authentication is required for the HTTP endpoint.

<a href="#">Link to this property</a>

enabled: boolean

Indicates that the HTTP endpoint is enabled.

<a href="#">Link to this property</a>

<details>

<summary>

cors: optional object {origins }

Specifies the CORS options for the HTTP endpoint.

</summary>

origins: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

Indicates the name of the Stream.

maxLength128

minLength1

<a href="#">Link to this property</a>

version: number

Indicates the current version of this stream.

<a href="#">Link to this property</a>

<details>

<summary>

worker\_binding: object {enabled }

</summary>

enabled: boolean

Indicates that the worker binding is enabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endpoint: optional string

Indicates the endpoint URL of this stream.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

format: optional object {type, decimal\_encoding, timestamp\_format, unstructured } or object {type, compression, row\_group\_bytes }

Defines the data format of the events.

</summary>

One of the following:

<details>

<summary>

Json object {type, decimal\_encoding, timestamp\_format, unstructured }

</summary>

type: "json"

<a href="#">Link to this property</a>

<details>

<summary>

decimal\_encoding: optional "number"or "string"or "bytes"

</summary>

One of the following:

"number"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"bytes"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timestamp\_format: optional "rfc3339"or "unix\_millis"

</summary>

One of the following:

"rfc3339"

<a href="#">Link to this property</a>

"unix\_millis"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unstructured: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Parquet object {type, compression, row\_group\_bytes }

</summary>

type: "parquet"

<a href="#">Link to this property</a>

<details>

<summary>

compression: optional "uncompressed"or "snappy"or "gzip"or 2 more

</summary>

One of the following:

"uncompressed"

<a href="#">Link to this property</a>

"snappy"

<a href="#">Link to this property</a>

"gzip"

<a href="#">Link to this property</a>

"zstd"

<a href="#">Link to this property</a>

"lz4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

row\_group\_bytes: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional object {fields, inferred }

Defines the schema of the events in the data stream.

</summary>

<details>

<summary>

fields: optional array of <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20source_field%20%3E%20(schema)">SourceField</a>

</summary>

One of the following:

<details>

<summary>

Int32 object {type, metadata\_key, name, 2 more }

</summary>

type: "int32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Int64 object {type, metadata\_key, name, 2 more }

</summary>

type: "int64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float32 object {type, metadata\_key, name, 2 more }

</summary>

type: "float32"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Float64 object {type, metadata\_key, name, 2 more }

</summary>

type: "float64"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Bool object {type, metadata\_key, name, 2 more }

</summary>

type: "bool"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

String object {type, metadata\_key, name, 2 more }

</summary>

type: "string"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Binary object {type, metadata\_key, name, 2 more }

</summary>

type: "binary"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Timestamp object {type, metadata\_key, name, 3 more }

</summary>

type: "timestamp"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

unit: optional "second"or "millisecond"or "microsecond"or "nanosecond"

</summary>

One of the following:

"second"

<a href="#">Link to this property</a>

"millisecond"

<a href="#">Link to this property</a>

"microsecond"

<a href="#">Link to this property</a>

"nanosecond"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {type, metadata\_key, name, 2 more }

</summary>

type: "json"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Struct = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20struct_field%20%3E%20(schema)">StructField</a> { fields, name }

</summary>

type: "struct"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

List = <a href="https://developers.cloudflare.com/api/resources/pipelines#(resource)%20pipelines%20%3E%20(model)%20list_field%20%3E%20(schema)">ListField</a> { items }

</summary>

type: "list"

<a href="#">Link to this property</a>

metadata\_key: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

sql\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inferred: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines.streams%20%3E%20(model)%20stream_update_response%20%3E%20(schema)>)

StreamDeleteResponse = unknown

[Link to this property](#)%20pipelines.streams%20%3E%20(model)%20stream_delete_response%20%3E%20(schema)>)