---
title: Create downloads
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Downloads](https://developers.cloudflare.com/api/resources/stream/subresources/downloads)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create downloads

POST/accounts/{account\_id}/stream/{identifier}/downloads

Creates a download for a video when a video is ready to view. Use `/downloads/{download_type}` instead for type-specific downloads. Available types are `default` and `audio`.

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

Identifier.

maxLength32

[Link to this property](#)%20stream.downloads%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

identifier: string

A Cloudflare-generated unique identifier for a media item.

maxLength32

[Link to this property](#)%20stream.downloads%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

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

[Link to this property](#)%20stream.downloads%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20stream.downloads%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.downloads%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {audio, default }

An object with download type keys. Each key is optional and only present if that download type has been created.

</summary>

<details>

<summary>

audio: optional object {percentComplete, status, url }

The audio-only download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default: optional object {percentComplete, status, url }

The default video download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.downloads%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create downloads

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/downloads \
    -X POST \
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
    "audio": {
      "percentComplete": 0,
      "status": "ready",
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/downloads/default.mp4"
    },
    "default": {
      "percentComplete": 0,
      "status": "ready",
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/downloads/default.mp4"
    }
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
    "audio": {
      "percentComplete": 0,
      "status": "ready",
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/downloads/default.mp4"
    },
    "default": {
      "percentComplete": 0,
      "status": "ready",
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/downloads/default.mp4"
    }
  }
}
```