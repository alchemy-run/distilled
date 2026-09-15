---
title: Get Sippy Configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[Sippy](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/sippy)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Sippy Configuration

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/sippy

Gets configuration for Sippy for an existing R2 bucket.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

<details>

<summary>

"cf-r2-jurisdiction": optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

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

"fedramp-high"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20sippy%20%3E%20(schema)">Sippy</a> { destination, enabled, source }

</summary>

<details>

<summary>

destination: optional object {accessKeyId, account, bucket, provider }

Details about the configured destination bucket.

</summary>

accessKeyId: optional string

ID of the Cloudflare API token used when writing objects to this bucket.

<a href="#">Link to this property</a>

account: optional string

<a href="#">Link to this property</a>

bucket: optional string

Name of the bucket on the provider.

<a href="#">Link to this property</a>

provider: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

State of Sippy for this bucket.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {bucket, bucketUrl, container, 2 more }

Details about the configured source bucket.

</summary>

bucket: optional string

Name of the bucket on the provider (AWS, GCS only).

<a href="#">Link to this property</a>

bucketUrl: optional string

S3-compatible URL (Generic S3-compatible providers only).

<a href="#">Link to this property</a>

container: optional string

Name of the Azure Blob Storage container (Azure only).

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional "aws"or "gcs"or "s3"or "azure"

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"s3"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

region: optional string

Region where the bucket resides (AWS only).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Sippy Configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/sippy \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
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
    "destination": {
      "accessKeyId": "accessKeyId",
      "account": "account",
      "bucket": "bucket",
      "provider": "r2"
    },
    "enabled": true,
    "source": {
      "bucket": "bucket",
      "bucketUrl": "bucketUrl",
      "container": "container",
      "provider": "aws",
      "region": "region"
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
      "code": 1000,
      "message": "message",
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
    "destination": {
      "accessKeyId": "accessKeyId",
      "account": "account",
      "bucket": "bucket",
      "provider": "r2"
    },
    "enabled": true,
    "source": {
      "bucket": "bucket",
      "bucketUrl": "bucketUrl",
      "container": "container",
      "provider": "aws",
      "region": "region"
    }
  },
  "success": true
}
```