---
title: Upload Object
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[Objects](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Upload Object

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects/{object\_key}

Uploads an object to an R2 bucket. The object body is provided as the request body. Returns metadata about the uploaded object.

The maximum upload size for this endpoint is 300 MB. For most workloads, we recommend using R2’s [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

object\_key: string

The key (name) to assign to the object. May contain slashes for path-like keys. Slashes (`/`) within the key MUST be sent literally and MUST NOT be percent-encoded (i.e. `%2F`); other reserved characters should be percent-encoded as usual.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(params)%20default%20%3E%20(param)%20object_key%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

<details>

<summary>

"cf-r2-storage-class": optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(params)%20default%20%3E%20(param)%20cf-r2-storage-class%20%3E%20(schema)>)

##### Body ParametersExpand Collapse

body: file

The object body to upload.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {etag, key, size, 3 more }

Result of a successful object upload.

</summary>

etag: optional string

The entity tag for the uploaded object.

<a href="#">Link to this property</a>

key: optional string

The key (name) of the uploaded object.

<a href="#">Link to this property</a>

size: optional string

The size of the uploaded object in bytes (as a string).

<a href="#">Link to this property</a>

<details>

<summary>

storage\_class: optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded: optional string

The date and time the object was uploaded.

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The version UUID of the uploaded object.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20upload%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Upload Object

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/$OBJECT_KEY \
    -X PUT \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'body=@/path/to/body'
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
    "etag": "d41d8cd98f00b204e9800998ecf8427e",
    "key": "path/to/my-object.txt",
    "size": "1048576",
    "storage_class": "Standard",
    "uploaded": "2024-01-15T10:30:00Z",
    "version": "3fd5b4a8-1234-5678-abcd-ef0123456789"
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
    "etag": "d41d8cd98f00b204e9800998ecf8427e",
    "key": "path/to/my-object.txt",
    "size": "1048576",
    "storage_class": "Standard",
    "uploaded": "2024-01-15T10:30:00Z",
    "version": "3fd5b4a8-1234-5678-abcd-ef0123456789"
  },
  "success": true
}
```