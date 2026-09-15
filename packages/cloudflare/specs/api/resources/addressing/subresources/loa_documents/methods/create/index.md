---
title: Upload LOA Document
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[LOA Documents](https://developers.cloudflare.com/api/resources/addressing/subresources/loa_documents)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Upload LOA Document

POST/accounts/{account\_id}/addressing/loa\_documents

Submit LOA document (pdf format) under the account.

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

`Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier of a Cloudflare account.

maxLength32

[Link to this property](#)%20addressing.loa_documents%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersForm DataExpand Collapse

loa\_document: string

LOA document to upload.

[Link to this property](#)%20addressing.loa_documents%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20loa_document%20%3E%20(schema)>)

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

[Link to this property](#)%20addressing.loa_documents%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20addressing.loa_documents%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20addressing.loa_documents%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, account\_id, auto\_generated, 5 more }

</summary>

id: optional string

Identifier for the uploaded LOA document.

maxLength32

<a href="#">Link to this property</a>

account\_id: optional string

Identifier of a Cloudflare account.

maxLength32

<a href="#">Link to this property</a>

auto\_generated: optional boolean

Whether the LOA has been auto-generated for the prefix owner by Cloudflare.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

filename: optional string

Name of LOA document. Max file size 10MB, and supported filetype is pdf.

<a href="#">Link to this property</a>

size\_bytes: optional number

File size of the uploaded LOA document.

<a href="#">Link to this property</a>

verified: optional boolean

Whether the LOA has been verified by Cloudflare staff.

<a href="#">Link to this property</a>

verified\_at: optional string

Timestamp of the moment the LOA was marked as validated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.loa_documents%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Upload LOA Document

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/loa_documents \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F loa_document=@document.pdf
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
    "id": "d933b1530bc56c9953cf8ce166da8004",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "auto_generated": true,
    "created": "2014-01-01T05:20:00.12345Z",
    "filename": "site_loa_doc.pdf",
    "size_bytes": 444,
    "verified": true,
    "verified_at": "2019-12-27T18:11:19.117Z"
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
    "id": "d933b1530bc56c9953cf8ce166da8004",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "auto_generated": true,
    "created": "2014-01-01T05:20:00.12345Z",
    "filename": "site_loa_doc.pdf",
    "size_bytes": 444,
    "verified": true,
    "verified_at": "2019-12-27T18:11:19.117Z"
  }
}
```