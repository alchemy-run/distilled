---
title: Create Sink
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pipelines](https://developers.cloudflare.com/api/resources/pipelines)

[Sinks](https://developers.cloudflare.com/api/resources/pipelines/subresources/sinks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Sink

POST/accounts/{account\_id}/pipelines/v1/sinks

Create a new Sink.

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

`Pipelines Write`

##### P ath ParametersExpand Collapse

account\_id: string

Specifies the public ID of the account.

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

Defines the name of the Sink.

maxLength128

minLength1

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

<details>

<summary>

config: optional object {account\_id, bucket, credentials, 5 more } or object {token, account\_id, bucket, 3 more }

Defines the configuration of the R2 Sink.

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

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20config%20%3E%20(schema)>)

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

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20format%20%3E%20(schema)>)

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

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20schema%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, created\_at, modified\_at, 5 more }

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

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create Sink

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/sinks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my_sink",
          "type": "r2"
        }'
```

200 example

```
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "my_sink",
    "type": "r2",
    "config": {
      "account_id": "account_id",
      "bucket": "bucket",
      "credentials": {
        "access_key_id": "access_key_id",
        "secret_access_key": "secret_access_key"
      },
      "file_naming": {
        "prefix": "prefix",
        "strategy": "serial",
        "suffix": "suffix"
      },
      "jurisdiction": "jurisdiction",
      "partitioning": {
        "time_pattern": "year=%Y/month=%m/day=%d/hour=%H"
      },
      "path": "path",
      "rolling_policy": {
        "file_size_bytes": 0,
        "inactivity_seconds": 1,
        "interval_seconds": 1
      }
    },
    "format": {
      "type": "json",
      "compression": "uncompressed",
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
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "my_sink",
    "type": "r2",
    "config": {
      "account_id": "account_id",
      "bucket": "bucket",
      "credentials": {
        "access_key_id": "access_key_id",
        "secret_access_key": "secret_access_key"
      },
      "file_naming": {
        "prefix": "prefix",
        "strategy": "serial",
        "suffix": "suffix"
      },
      "jurisdiction": "jurisdiction",
      "partitioning": {
        "time_pattern": "year=%Y/month=%m/day=%d/hour=%H"
      },
      "path": "path",
      "rolling_policy": {
        "file_size_bytes": 0,
        "inactivity_seconds": 1,
        "interval_seconds": 1
      }
    },
    "format": {
      "type": "json",
      "compression": "uncompressed",
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
  },
  "success": true
}
```