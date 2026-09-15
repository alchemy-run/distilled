---
title: Streams
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pipelines](https://developers.cloudflare.com/api/resources/pipelines)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Streams

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