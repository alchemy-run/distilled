---
title: List Objects
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

# List Objects

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects

Lists objects in an R2 bucket. Returns object metadata including key, size, etag, last modified date, HTTP metadata, and custom metadata.

For most workloads, we recommend using R2’s [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Pagination cursor received from a previous List Objects call. Used to retrieve the next page of results.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

delimiter: optional string

A single character used to group keys. All keys that contain the delimiter between the prefix and the first occurrence of the delimiter after the prefix are grouped under a single result element.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20delimiter%20%3E%20(schema)>)

per\_page: optional number

Maximum number of objects to return per page.

maximum1000

minimum1

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

prefix: optional string

Restricts results to only those objects whose keys begin with the specified prefix.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20prefix%20%3E%20(schema)>)

start\_after: optional string

Returns objects with keys that come after the specified key in lexicographic order.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20start_after%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {custom\_metadata, etag, http\_metadata, 5 more }

</summary>

custom\_metadata: optional map\[string]

Custom metadata key-value pairs associated with the object.

<a href="#">Link to this property</a>

etag: optional string

The entity tag for the object. In JSON list/get responses this is the raw hex digest (without surrounding quotes). The HTTP <code>ETag</code> response header on Get Object follows RFC 7232 and IS wrapped in surrounding double-quotes.

<a href="#">Link to this property</a>

<details>

<summary>

http\_metadata: optional object {cacheControl, cacheExpiry, contentDisposition, 3 more }

HTTP metadata associated with an R2 object.

</summary>

cacheControl: optional string

Specifies caching behavior for the object.

<a href="#">Link to this property</a>

cacheExpiry: optional string

The date and time at which the object’s cache entry expires.

formatdate-time

<a href="#">Link to this property</a>

contentDisposition: optional string

Specifies presentational information for the object.

<a href="#">Link to this property</a>

contentEncoding: optional string

Specifies the content encoding applied to the object.

<a href="#">Link to this property</a>

contentLanguage: optional string

The language of the object content.

<a href="#">Link to this property</a>

contentType: optional string

The MIME type of the object.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key: optional string

The object key (name).

<a href="#">Link to this property</a>

last\_modified: optional string

The date and time the object was last modified.

formatdate-time

<a href="#">Link to this property</a>

size: optional number

The size of the object in bytes.

<a href="#">Link to this property</a>

ssec: optional boolean

Whether the object is encrypted with a customer-supplied encryption key.

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

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {cursor, delimited, is\_truncated, per\_page }

Pagination information for list objects responses.

</summary>

cursor: optional string

Pagination cursor to use in the next List Objects call to retrieve the next page of results.

<a href="#">Link to this property</a>

delimited: optional array of string

Common prefixes found when a delimiter is specified. Each entry represents a group of keys sharing a common prefix up to the delimiter. Equivalent to S3’s <code>CommonPrefixes</code> in <code>ListObjectsV2</code>; the field name differs because of the existing R2 API wire format.

<a href="#">Link to this property</a>

is\_truncated: optional boolean

Whether the result was truncated. If true, use the cursor to retrieve the next page.

<a href="#">Link to this property</a>

per\_page: optional number

The maximum number of objects returned per page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Objects

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects \
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
  "result": [
    {
      "custom_metadata": {},
      "etag": "d41d8cd98f00b204e9800998ecf8427e",
      "http_metadata": {
        "cacheControl": "max-age=3600",
        "cacheExpiry": "2024-12-31T23:59:59Z",
        "contentDisposition": "attachment; filename=\"example.jpg\"",
        "contentEncoding": "gzip",
        "contentLanguage": "en-US",
        "contentType": "image/jpeg"
      },
      "key": "path/to/my-object.txt",
      "last_modified": "2024-01-15T10:30:00Z",
      "size": 1048576,
      "ssec": false,
      "storage_class": "Standard"
    }
  ],
  "success": true,
  "result_info": {
    "cursor": "eyJrZXkiOiJwYXRoL3RvL215LW9iamVjdC50eHQifQ==",
    "delimited": [
      "path/to/",
      "another/path/"
    ],
    "is_truncated": true,
    "per_page": 20
  }
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
  "result": [
    {
      "custom_metadata": {},
      "etag": "d41d8cd98f00b204e9800998ecf8427e",
      "http_metadata": {
        "cacheControl": "max-age=3600",
        "cacheExpiry": "2024-12-31T23:59:59Z",
        "contentDisposition": "attachment; filename=\"example.jpg\"",
        "contentEncoding": "gzip",
        "contentLanguage": "en-US",
        "contentType": "image/jpeg"
      },
      "key": "path/to/my-object.txt",
      "last_modified": "2024-01-15T10:30:00Z",
      "size": 1048576,
      "ssec": false,
      "storage_class": "Standard"
    }
  ],
  "success": true,
  "result_info": {
    "cursor": "eyJrZXkiOiJwYXRoL3RvL215LW9iamVjdC50eHQifQ==",
    "delimited": [
      "path/to/",
      "another/path/"
    ],
    "is_truncated": true,
    "per_page": 20
  }
}
```