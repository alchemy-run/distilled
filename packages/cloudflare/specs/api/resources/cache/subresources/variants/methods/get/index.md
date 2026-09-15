---
title: Get variants setting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

[Variants](https://developers.cloudflare.com/api/resources/cache/subresources/variants)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get variants setting

GET/zones/{zone\_id}/cache/variants

Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the ‘Vary: Accept’ response header. If the origin server sends ‘Vary: Accept’ but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.

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

`Zone Settings Write``Zone Settings Read``Zone Read``Zone Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cache.variants%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20cache.variants%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20cache.variants%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cache.variants%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, editable, value, modified\_on }

</summary>

id: "variants"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {avif, bmp, gif, 8 more }

Value of the zone setting.

</summary>

avif: optional array of string

List of strings with the MIME types of all the variants that should be served for avif.

<a href="#">Link to this property</a>

bmp: optional array of string

List of strings with the MIME types of all the variants that should be served for bmp.

<a href="#">Link to this property</a>

gif: optional array of string

List of strings with the MIME types of all the variants that should be served for gif.

<a href="#">Link to this property</a>

jp2: optional array of string

List of strings with the MIME types of all the variants that should be served for jp2.

<a href="#">Link to this property</a>

jpeg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpeg.

<a href="#">Link to this property</a>

jpg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg.

<a href="#">Link to this property</a>

jpg2: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg2.

<a href="#">Link to this property</a>

png: optional array of string

List of strings with the MIME types of all the variants that should be served for png.

<a href="#">Link to this property</a>

tif: optional array of string

List of strings with the MIME types of all the variants that should be served for tif.

<a href="#">Link to this property</a>

tiff: optional array of string

List of strings with the MIME types of all the variants that should be served for tiff.

<a href="#">Link to this property</a>

webp: optional array of string

List of strings with the MIME types of all the variants that should be served for webp.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get variants setting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants \
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "variants",
    "editable": true,
    "value": {
      "avif": [
        "image/webp",
        "image/jpeg"
      ],
      "bmp": [
        "image/webp",
        "image/jpeg"
      ],
      "gif": [
        "image/webp",
        "image/jpeg"
      ],
      "jp2": [
        "image/webp",
        "image/avif"
      ],
      "jpeg": [
        "image/webp",
        "image/avif"
      ],
      "jpg": [
        "image/webp",
        "image/avif"
      ],
      "jpg2": [
        "image/webp",
        "image/avif"
      ],
      "png": [
        "image/webp",
        "image/avif"
      ],
      "tif": [
        "image/webp",
        "image/avif"
      ],
      "tiff": [
        "image/webp",
        "image/avif"
      ],
      "webp": [
        "image/jpeg",
        "image/avif"
      ]
    },
    "modified_on": "2014-01-01T05:20:00.12345Z"
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "variants",
    "editable": true,
    "value": {
      "avif": [
        "image/webp",
        "image/jpeg"
      ],
      "bmp": [
        "image/webp",
        "image/jpeg"
      ],
      "gif": [
        "image/webp",
        "image/jpeg"
      ],
      "jp2": [
        "image/webp",
        "image/avif"
      ],
      "jpeg": [
        "image/webp",
        "image/avif"
      ],
      "jpg": [
        "image/webp",
        "image/avif"
      ],
      "jpg2": [
        "image/webp",
        "image/avif"
      ],
      "png": [
        "image/webp",
        "image/avif"
      ],
      "tif": [
        "image/webp",
        "image/avif"
      ],
      "tiff": [
        "image/webp",
        "image/avif"
      ],
      "webp": [
        "image/jpeg",
        "image/avif"
      ]
    },
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```