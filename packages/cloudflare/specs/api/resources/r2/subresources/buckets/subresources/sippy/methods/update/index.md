---
title: Enable Sippy
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

# Enable Sippy

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/sippy

Sets configuration for Sippy for an existing R2 bucket.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {destination, source } or object {destination, source } or object {destination, source } or object {destination, source }

</summary>

One of the following:

<details>

<summary>

R2EnableSippyAws object {destination, source }

</summary>

<details>

<summary>

destination: optional object {accessKeyId, provider, secretAccessKey }

R2 bucket to copy objects to.

</summary>

accessKeyId: optional string

ID of a Cloudflare API token. This is the value labelled “Access Key ID” when creating an API. token from the <a href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens">R2 dashboard</a>.

Sippy will use this token when writing objects to R2, so it is best to scope this token to the bucket you’re enabling Sippy for.

<a href="#">Link to this property</a>

provider: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

secretAccessKey: optional string

Value of a Cloudflare API token. This is the value labelled “Secret Access Key” when creating an API. token from the <a href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens">R2 dashboard</a>.

Sippy will use this token when writing objects to R2, so it is best to scope this token to the bucket you’re enabling Sippy for.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {accessKeyId, bucket, provider, 2 more }

AWS S3 bucket to copy objects from.

</summary>

accessKeyId: optional string

Access Key ID of an IAM credential (ideally scoped to a single S3 bucket).

<a href="#">Link to this property</a>

bucket: optional string

Name of the AWS S3 bucket.

<a href="#">Link to this property</a>

provider: optional "aws"

<a href="#">Link to this property</a>

region: optional string

Name of the AWS availability zone.

<a href="#">Link to this property</a>

secretAccessKey: optional string

Secret Access Key of an IAM credential (ideally scoped to a single S3 bucket).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2EnableSippyGcs object {destination, source }

</summary>

<details>

<summary>

destination: optional object {accessKeyId, provider, secretAccessKey }

R2 bucket to copy objects to.

</summary>

accessKeyId: optional string

ID of a Cloudflare API token. This is the value labelled “Access Key ID” when creating an API. token from the <a href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens">R2 dashboard</a>.

Sippy will use this token when writing objects to R2, so it is best to scope this token to the bucket you’re enabling Sippy for.

<a href="#">Link to this property</a>

provider: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

secretAccessKey: optional string

Value of a Cloudflare API token. This is the value labelled “Secret Access Key” when creating an API. token from the <a href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens">R2 dashboard</a>.

Sippy will use this token when writing objects to R2, so it is best to scope this token to the bucket you’re enabling Sippy for.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {bucket, clientEmail, privateKey, provider }

GCS bucket to copy objects from.

</summary>

bucket: optional string

Name of the GCS bucket.

<a href="#">Link to this property</a>

clientEmail: optional string

Client email of an IAM credential (ideally scoped to a single GCS bucket).

<a href="#">Link to this property</a>

privateKey: optional string

Private Key of an IAM credential (ideally scoped to a single GCS bucket).

<a href="#">Link to this property</a>

provider: optional "gcs"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2EnableSippyS3 object {destination, source }

</summary>

<details>

<summary>

destination: optional object {accessKeyId, provider, secretAccessKey }

R2 bucket to copy objects to.

</summary>

accessKeyId: optional string

ID of a Cloudflare API token. This is the value labelled “Access Key ID” when creating an API. token from the <a href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens">R2 dashboard</a>.

Sippy will use this token when writing objects to R2, so it is best to scope this token to the bucket you’re enabling Sippy for.

<a href="#">Link to this property</a>

provider: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

secretAccessKey: optional string

Value of a Cloudflare API token. This is the value labelled “Secret Access Key” when creating an API. token from the <a href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens">R2 dashboard</a>.

Sippy will use this token when writing objects to R2, so it is best to scope this token to the bucket you’re enabling Sippy for.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {accessKeyId, bucketUrl, provider, secretAccessKey }

General S3-compatible provider to copy objects from.

</summary>

accessKeyId: optional string

Access Key ID of an IAM credential (ideally scoped to a single S3 bucket).

<a href="#">Link to this property</a>

bucketUrl: optional string

URL to the S3-compatible API of the bucket.

<a href="#">Link to this property</a>

provider: optional "s3"

<a href="#">Link to this property</a>

secretAccessKey: optional string

Secret Access Key of an IAM credential (ideally scoped to a single S3 bucket).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2EnableSippyAzure object {destination, source }

</summary>

<details>

<summary>

destination: optional object {accessKeyId, provider, secretAccessKey }

R2 bucket to copy objects to.

</summary>

accessKeyId: optional string

ID of a Cloudflare API token. This is the value labelled “Access Key ID” when creating an API. token from the <a href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens">R2 dashboard</a>.

Sippy will use this token when writing objects to R2, so it is best to scope this token to the bucket you’re enabling Sippy for.

<a href="#">Link to this property</a>

provider: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

secretAccessKey: optional string

Value of a Cloudflare API token. This is the value labelled “Secret Access Key” when creating an API. token from the <a href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens">R2 dashboard</a>.

Sippy will use this token when writing objects to R2, so it is best to scope this token to the bucket you’re enabling Sippy for.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {accountKey, accountName, container, 2 more }

Azure Blob Storage container to copy objects from.

</summary>

accountKey: optional string

Access key for the Azure Storage account. Mutually exclusive with sasToken.

<a href="#">Link to this property</a>

accountName: optional string

Name of the Azure Storage account.

<a href="#">Link to this property</a>

container: optional string

Name of the Azure Blob Storage container.

<a href="#">Link to this property</a>

provider: optional "azure"

<a href="#">Link to this property</a>

sasToken: optional string

Shared Access Signature token for the Azure Storage account. Mutually exclusive with accountKey.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

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

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Enable Sippy

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/sippy \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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