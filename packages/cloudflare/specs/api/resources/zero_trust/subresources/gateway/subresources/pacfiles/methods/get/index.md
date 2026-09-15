---
title: Get a PAC file
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

[Pacfiles](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a PAC file

GET/accounts/{account\_id}/gateway/pacfiles/{pacfile\_id}

Get a single Zero Trust Gateway PAC file.

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

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

pacfile\_id: string

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20pacfile_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, contents, created\_at, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

contents: optional string

Actual contents of the PAC file

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a PAC file

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles/$PACFILE_ID \
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
  }
}
```