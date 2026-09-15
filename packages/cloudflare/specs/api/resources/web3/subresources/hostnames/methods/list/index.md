---
title: List Web3 Hostnames
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Web3](https://developers.cloudflare.com/api/resources/web3)

[Hostnames](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Web3 Hostnames

GET/zones/{zone\_id}/web3/hostnames

List Web3 Hostnames

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

`Web3 Hostnames Write``Web3 Hostnames Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Specify the identifier of the hostname.

maxLength32

[Link to this property](#)%20web3.hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20web3.hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20web3.hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/web3#(resource)%20web3.hostnames%20%3E%20(model)%20hostname%20%3E%20(schema)">Hostname</a> { id, created\_on, description, 5 more }

</summary>

id: optional string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specify an optional description of the hostname.

maxLength500

<a href="#">Link to this property</a>

dnslink: optional string

Specify the DNSLink value used if the target is ipfs.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Specify the hostname that points to the target gateway via CNAME.

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "deleting"or "error"

Specifies the status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target: optional "ethereum"or "ipfs"or "ipfs\_universal\_path"

Specify the target gateway of the hostname.

</summary>

One of the following:

"ethereum"

<a href="#">Link to this property</a>

"ipfs"

<a href="#">Link to this property</a>

"ipfs\_universal\_path"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Specifies whether the API call was successful.

[Link to this property](#)%20web3.hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Specifies the total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Specifies the current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Specifies the number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Specifies the total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Web3 Hostnames

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames \
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "description": "This is my IPFS gateway.",
      "dnslink": "/ipns/onboarding.ipfs.cloudflare.com",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "gateway.example.com",
      "status": "active",
      "target": "ipfs"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "description": "This is my IPFS gateway.",
      "dnslink": "/ipns/onboarding.ipfs.cloudflare.com",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "gateway.example.com",
      "status": "active",
      "target": "ipfs"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```