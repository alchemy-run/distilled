---
title: Update image
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Images](https://developers.cloudflare.com/api/resources/images)

[V1](https://developers.cloudflare.com/api/resources/images/subresources/v1)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update image

PATCH/accounts/{account\_id}/images/v1/{image\_id}

Update a CF Images image’s metadata, creator, or access control. On access control change, all copies of the image are purged from cache.

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

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

image\_id: string

Image unique identifier.

maxLength32

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20image_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

creator: optional string

Can set the creator field with an internal user ID.

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20creator%20%3E%20(schema)>)

metadata: optional unknown

User modifiable key-value store. Can be used for keeping references to another system of record for managing images. No change if not specified.

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20metadata%20%3E%20(schema)>)

requireSignedURLs: optional boolean

Indicates whether the image can be accessed using only its UID. If set to `true`, a signed token needs to be generated with a signing key to view the image. Returns a new UID on a change. No change if not specified.

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20requireSignedURLs%20%3E%20(schema)>)

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

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1%20%3E%20(model)%20image%20%3E%20(schema)">Image</a> { id, creator, filename, 4 more }

</summary>

id: optional string

Image unique identifier.

maxLength32

<a href="#">Link to this property</a>

creator: optional string

Can set the creator field with an internal user ID.

maxLength1024

<a href="#">Link to this property</a>

filename: optional string

Image file name.

maxLength255

<a href="#">Link to this property</a>

meta: optional unknown

User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes.

<a href="#">Link to this property</a>

requireSignedURLs: optional boolean

Indicates whether the image can be a accessed only using it’s UID. If set to true, a signed token needs to be generated with a signing key to view the image.

<a href="#">Link to this property</a>

uploaded: optional string

When the media item was uploaded.

formatdate-time

<a href="#">Link to this property</a>

variants: optional array of string

Object specifying available variants for an image.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20images.v1%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update image

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/$IMAGE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "requireSignedURLs": true
        }'
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
    "creator": "107b9558-dd06-4bbd-5fef-9c2c16bb7900",
    "filename": "logo.png",
    "meta": {
      "key": "value"
    },
    "requireSignedURLs": true,
    "uploaded": "2014-01-02T02:20:00.123Z",
    "variants": [
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/thumbnail",
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/hero",
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/original"
    ]
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
    "creator": "107b9558-dd06-4bbd-5fef-9c2c16bb7900",
    "filename": "logo.png",
    "meta": {
      "key": "value"
    },
    "requireSignedURLs": true,
    "uploaded": "2014-01-02T02:20:00.123Z",
    "variants": [
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/thumbnail",
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/hero",
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/original"
    ]
  },
  "success": true
}
```