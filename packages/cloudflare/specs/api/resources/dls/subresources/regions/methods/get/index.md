---
title: Get a DLS region
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Data Localization Suite](https://developers.cloudflare.com/api/resources/dls)

[Regions](https://developers.cloudflare.com/api/resources/dls/subresources/regions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a DLS region

GET/accounts/{account\_id}/dls/regions/{region\_id}

Get a DLS region

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

Identifier of a Cloudflare account.

maxLength32

minLength32

[Link to this property](#)%20dls.regions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

region\_id: string

UUID of the region (custom or managed) or region\_key of a managed region.

maxLength255

[Link to this property](#)%20dls.regions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20region_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20dls.regions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, created\_on, modified\_on, 4 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

region\_key: string

maxLength128

minLength1

<a href="#">Link to this property</a>

version: number

<a href="#">Link to this property</a>

version\_created\_on: string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dls.regions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20dls.regions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

maxLength0

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

[Link to this property](#)%20dls.regions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

### Get a DLS region

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regions/$REGION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
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
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "region_key": "x",
    "version": 0,
    "version_created_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ]
}
```

##### Returns Examples

200 example

```
{
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
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "region_key": "x",
    "version": 0,
    "version_created_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ]
}
```