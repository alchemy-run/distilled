---
title: Get job details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Super Slurper](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper)

[Jobs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get job details

GET/accounts/{account\_id}/slurper/jobs/{job\_id}

Retrieves detailed status and configuration for a specific R2 Super Slurper migration job.

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

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

job\_id: string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20job_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

minLength1

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

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: optional array of string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional object {id, createdAt, finishedAt, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

finishedAt: optional string

<a href="#">Link to this property</a>

overwrite: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {bucket, endpoint, keys, 2 more } or object {bucket, keys, pathPrefix, vendor } or object {bucket, jurisdiction, keys, 2 more }

</summary>

One of the following:

<details>

<summary>

S3SourceResponseSchema object {bucket, endpoint, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

endpoint: optional string

formaturi

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "s3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GcsSourceResponseSchema object {bucket, keys, pathPrefix, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "gcs"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2SourceResponseSchema object {bucket, jurisdiction, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "running"or "paused"or "aborted"or "completed"

</summary>

One of the following:

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"aborted"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {bucket, jurisdiction, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: optional true

Indicates if the API call was successful or not.

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get job details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "id": "id",
    "createdAt": "createdAt",
    "finishedAt": "finishedAt",
    "overwrite": true,
    "source": {
      "bucket": "bucket",
      "endpoint": "https://example.com",
      "keys": [
        "string"
      ],
      "pathPrefix": "pathPrefix",
      "vendor": "s3"
    },
    "status": "running",
    "target": {
      "bucket": "bucket",
      "jurisdiction": "default",
      "vendor": "r2"
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "id": "id",
    "createdAt": "createdAt",
    "finishedAt": "finishedAt",
    "overwrite": true,
    "source": {
      "bucket": "bucket",
      "endpoint": "https://example.com",
      "keys": [
        "string"
      ],
      "pathPrefix": "pathPrefix",
      "vendor": "s3"
    },
    "status": "running",
    "target": {
      "bucket": "bucket",
      "jurisdiction": "default",
      "vendor": "r2"
    }
  },
  "success": true
}
```