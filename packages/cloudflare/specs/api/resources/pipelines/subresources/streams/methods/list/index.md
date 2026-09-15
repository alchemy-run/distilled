---
title: List Streams
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pipelines](https://developers.cloudflare.com/api/resources/pipelines)

[Streams](https://developers.cloudflare.com/api/resources/pipelines/subresources/streams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Streams

GET/accounts/{account\_id}/pipelines/v1/streams

List/Filter Streams in Account.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Pipelines Write``Pipelines Read`

##### P ath ParametersExpand Collapse

account\_id: string

Specifies the public ID of the account.

[Link to this property](#)%20pipelines.streams%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

name: optional string

Filters streams by name (case-insensitive substring).

maxLength128

minLength1

[Link to this property](#)%20pipelines.streams%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

page: optional number

[Link to this property](#)%20pipelines.streams%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

[Link to this property](#)%20pipelines.streams%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

pipeline\_id: optional string

Specifies the public ID of the pipeline.

maxLength32

minLength32

[Link to this property](#)%20pipelines.streams%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pipeline_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, created\_at, http, 7 more }

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

[Link to this property](#)%20pipelines.streams%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20pipelines.streams%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20pipelines.streams%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Streams

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/streams \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "01234567890123457689012345678901",
      "created_at": "2019-12-27T18:11:19.117Z",
      "http": {
        "authentication": false,
        "enabled": true,
        "cors": {
          "origins": [
            "string"
          ]
        }
      },
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "my_stream",
      "version": 3,
      "worker_binding": {
        "enabled": true
      },
      "endpoint": "https://01234567890123457689012345678901.ingest.cloudflare.com/v1",
      "format": {
        "type": "json",
        "decimal_encoding": "number",
        "timestamp_format": "rfc3339",
        "unstructured": true
      },
      "schema": {
        "fields": [
          {
            "type": "int32",
            "metadata_key": "metadata_key",
            "name": "name",
            "required": true,
            "sql_name": "sql_name"
          }
        ],
        "inferred": true
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": [
    {
      "id": "01234567890123457689012345678901",
      "created_at": "2019-12-27T18:11:19.117Z",
      "http": {
        "authentication": false,
        "enabled": true,
        "cors": {
          "origins": [
            "string"
          ]
        }
      },
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "my_stream",
      "version": 3,
      "worker_binding": {
        "enabled": true
      },
      "endpoint": "https://01234567890123457689012345678901.ingest.cloudflare.com/v1",
      "format": {
        "type": "json",
        "decimal_encoding": "number",
        "timestamp_format": "rfc3339",
        "unstructured": true
      },
      "schema": {
        "fields": [
          {
            "type": "int32",
            "metadata_key": "metadata_key",
            "name": "name",
            "required": true,
            "sql_name": "sql_name"
          }
        ],
        "inferred": true
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
  },
  "success": true
}
```