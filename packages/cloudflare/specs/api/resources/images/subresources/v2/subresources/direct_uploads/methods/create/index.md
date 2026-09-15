---
title: Create authenticated direct upload URL V2
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Images](https://developers.cloudflare.com/api/resources/images)

[V2](https://developers.cloudflare.com/api/resources/images/subresources/v2)

[Direct Uploads](https://developers.cloudflare.com/api/resources/images/subresources/v2/subresources/direct_uploads)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create authenticated direct upload URL V2

POST/accounts/{account\_id}/images/v2/direct\_upload

Direct uploads allow users to upload images without API keys. A common use case are web apps, client-side applications, or mobile devices where users upload content directly to Cloudflare Images. This method creates a draft record for a future image. It returns an upload URL and an image identifier. To verify if the image itself has been uploaded, send an image details request (accounts/:account\_identifier/images/v1/:identifier), and check that the `draft: true` property is not present.

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

`Images Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersForm DataExpand Collapse

id: optional string

Optional Image Custom ID. Up to 1024 chars. Can include any number of subpaths, and utf8 characters. Cannot start nor end with a / (forward slash). Cannot be a UUID.

maxLength1024

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20id%20%3E%20(schema)>)

creator: optional string

Can set the creator field with an internal user ID.

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20creator%20%3E%20(schema)>)

expiry: optional string

The date after which the upload will not be accepted. Minimum: Now + 2 minutes. Maximum: Now + 6 hours.

formatdate-time

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expiry%20%3E%20(schema)>)

metadata: optional unknown

User modifiable key-value store. Can be used for keeping references to another system of record, for managing images.

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20metadata%20%3E%20(schema)>)

requireSignedURLs: optional boolean

Indicates whether the image requires a signature token to be accessed.

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20requireSignedURLs%20%3E%20(schema)>)

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

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, uploadURL }

</summary>

id: optional string

Image unique identifier.

maxLength32

<a href="#">Link to this property</a>

uploadURL: optional string

The URL the unauthenticated upload can be performed to using a single HTTP POST (multipart/form-data) request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create authenticated direct upload URL V2

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v2/direct_upload \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F id=this/is/my-customid \
    -F expiry=2021-01-02T02:20:00Z \
    -F requireSignedURLs=true
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
  "result": {
    "id": "id",
    "uploadURL": "https://upload.imagedelivery.net/FxUufywByo0m2v3xhKSiU8/e22e9e6b-c02b-42fd-c405-6c32af5fe600"
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "id",
    "uploadURL": "https://upload.imagedelivery.net/FxUufywByo0m2v3xhKSiU8/e22e9e6b-c02b-42fd-c405-6c32af5fe600"
  },
  "success": true
}
```