---
title: "[DEPRECATED] Create Pipeline"
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pipelines](https://developers.cloudflare.com/api/resources/pipelines)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# \[DEPRECATED] Create Pipeline

Deprecated: Use create\_v1 instead. This endpoint will be removed in the future.

POST/accounts/{account\_id}/pipelines

\[DEPRECATED] Create a new pipeline. Use the new /pipelines/v1/pipelines endpoint instead.

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

[Link to this property](#)%20pipelines%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

destination: object {batch, compression, credentials, 3 more }

</summary>

<details>

<summary>

batch: object {max\_bytes, max\_duration\_s, max\_rows }

</summary>

max\_bytes: optional number

Specifies rough maximum size of files.

maximum100000000

minimum1000

<a href="#">Link to this property</a>

max\_duration\_s: optional number

Specifies duration to wait to aggregate batches files.

maximum300

minimum0.25

<a href="#">Link to this property</a>

max\_rows: optional number

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

type: optional "none"or "gzip"or "deflate"

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

<details>

<summary>

credentials: object {access\_key\_id, endpoint, secret\_access\_key }

</summary>

access\_key\_id: string

Specifies the R2 Bucket Access Key Id.

<a href="#">Link to this property</a>

endpoint: string

Specifies the R2 Endpoint.

<a href="#">Link to this property</a>

secret\_access\_key: string

Specifies the R2 Bucket Secret Access Key.

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

[Link to this property](#)%20pipelines%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20destination%20%3E%20(schema)>)

name: string

Defines the name of the pipeline.

maxLength128

minLength1

[Link to this property](#)%20pipelines%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20pipelines%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20source%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

Deprecatedresult: object {id, destination, endpoint, 3 more }

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

[Link to this property](#)%20pipelines%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20pipelines%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### \[DEPRECATED] Create Pipeline

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination": {
            "batch": {},
            "compression": {},
            "credentials": {
              "access_key_id": "<access key id>",
              "endpoint": "https://123f8a8258064ed892a347f173372359.r2.cloudflarestorage.com",
              "secret_access_key": "<secret key>"
            },
            "format": "json",
            "path": {
              "bucket": "bucket",
              "prefix": "base"
            },
            "type": "r2"
          },
          "name": "sample_pipeline",
          "source": [
            {
              "format": "json",
              "type": "type"
            }
          ]
        }'
```

200 example

```
{
  "result": {
    "id": "123f8a8258064ed892a347f173372359",
    "destination": {
      "batch": {
        "max_bytes": 1000,
        "max_duration_s": 0.25,
        "max_rows": 100
      },
      "compression": {
        "type": "gzip"
      },
      "format": "json",
      "path": {
        "bucket": "bucket",
        "filename": "${slug}${extension}",
        "filepath": "${date}/${hour}",
        "prefix": "base"
      },
      "type": "r2"
    },
    "endpoint": "https://123f8a8258064ed892a347f173372359.pipelines.cloudflare.com",
    "name": "sample_pipeline",
    "source": [
      {
        "format": "json",
        "type": "type",
        "authentication": true,
        "cors": {
          "origins": [
            "*"
          ]
        }
      }
    ],
    "version": 2
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "123f8a8258064ed892a347f173372359",
    "destination": {
      "batch": {
        "max_bytes": 1000,
        "max_duration_s": 0.25,
        "max_rows": 100
      },
      "compression": {
        "type": "gzip"
      },
      "format": "json",
      "path": {
        "bucket": "bucket",
        "filename": "${slug}${extension}",
        "filepath": "${date}/${hour}",
        "prefix": "base"
      },
      "type": "r2"
    },
    "endpoint": "https://123f8a8258064ed892a347f173372359.pipelines.cloudflare.com",
    "name": "sample_pipeline",
    "source": [
      {
        "format": "json",
        "type": "type",
        "authentication": true,
        "cors": {
          "origins": [
            "*"
          ]
        }
      }
    ],
    "version": 2
  },
  "success": true
}
```