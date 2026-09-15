---
title: Get Object
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

# Get Object

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects/{object\_key}

Retrieves an object from an R2 bucket. Returns the object body along with metadata headers.

For most workloads, we recommend using R2’s [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

object\_key: string

The key (name) of the object to retrieve. May contain slashes for path-like keys. Slashes (`/`) within the key MUST be sent literally and MUST NOT be percent-encoded (i.e. `%2F`); other reserved characters should be percent-encoded as usual.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20object_key%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

"If-Modified-Since": optional string

Returns the object only if it has been modified since the specified time. Must be formatted as an HTTP-date (RFC 7231), e.g. `Tue, 15 Jan 2024 10:30:00 GMT`.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20If-Modified-Since%20%3E%20(schema)>)

"If-None-Match": optional string

Returns the object only if its ETag does not match the given value.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20If-None-Match%20%3E%20(schema)>)

### Get Object

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/$OBJECT_KEY \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples