---
title: Watermark profile details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Watermarks](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Watermark profile details

GET/accounts/{account\_id}/stream/watermarks/{identifier}

Retrieves details for a single watermark profile.

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

`Stream Write``Stream Read`

##### P ath ParametersExpand Collapse

account\_id: string

The account identifier tag.

maxLength32

[Link to this property](#)%20stream.watermarks%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

identifier: string

The unique identifier for a watermark profile.

maxLength32

[Link to this property](#)%20stream.watermarks%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20stream.watermarks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20stream.watermarks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.watermarks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.watermarks%20%3E%20(model)%20watermark%20%3E%20(schema)">Watermark</a> { created, downloadedFrom, height, 8 more }

</summary>

created: optional string

The date and a time a watermark profile was created.

formatdate-time

<a href="#">Link to this property</a>

downloadedFrom: optional string

The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.

<a href="#">Link to this property</a>

height: optional number

The height of the image in pixels.

<a href="#">Link to this property</a>

name: optional string

A short description of the watermark profile.

<a href="#">Link to this property</a>

opacity: optional number

The translucency of the image. A value of <code>0.0</code> makes the image completely transparent, and <code>1.0</code> makes the image completely opaque. Note that if the image is already semi-transparent, setting this to <code>1.0</code> will not make the image completely opaque.

maximum1

minimum0

<a href="#">Link to this property</a>

padding: optional number

The whitespace between the adjacent edges (determined by position) of the video and the image. <code>0.0</code> indicates no padding, and <code>1.0</code> indicates a fully padded video width or length, as determined by the algorithm.

maximum1

minimum0

<a href="#">Link to this property</a>

position: optional string

The location of the image. Valid positions are: <code>upperRight</code>, <code>upperLeft</code>, <code>lowerLeft</code>, <code>lowerRight</code>, and <code>center</code>. Note that <code>center</code> ignores the <code>padding</code> parameter.

<a href="#">Link to this property</a>

scale: optional number

The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. <code>0.0</code> indicates no scaling (use the size of the image as-is), and <code>1.0</code> fills the entire video.

maximum1

minimum0

<a href="#">Link to this property</a>

size: optional number

The size of the image in bytes.

<a href="#">Link to this property</a>

uid: optional string

The unique identifier for a watermark profile.

maxLength32

<a href="#">Link to this property</a>

width: optional number

The width of the image in pixels.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.watermarks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Watermark profile details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/watermarks/$IDENTIFIER \
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
    "created": "2014-01-02T02:20:00Z",
    "downloadedFrom": "https://company.com/logo.png",
    "height": 0,
    "name": "Marketing Videos",
    "opacity": 0.75,
    "padding": 0.1,
    "position": "center",
    "scale": 0.1,
    "size": 29472,
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "width": 0
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
    "created": "2014-01-02T02:20:00Z",
    "downloadedFrom": "https://company.com/logo.png",
    "height": 0,
    "name": "Marketing Videos",
    "opacity": 0.75,
    "padding": 0.1,
    "position": "center",
    "scale": 0.1,
    "size": 29472,
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "width": 0
  }
}
```