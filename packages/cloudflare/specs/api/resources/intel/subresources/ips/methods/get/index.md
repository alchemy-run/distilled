---
title: Get IP Overview
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[IPs](https://developers.cloudflare.com/api/resources/intel/subresources/ips)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get IP Overview

GET/accounts/{account\_id}/intel/ip

Gets the geolocation, ASN, infrastructure type of the ASN, and any security threat categories of an IP address. **Must provide ip query parameters.** For example, `/intel/ip?ipv4=1.1.1.1` or `/intel/ip?ipv6=2001:db8::1`.

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

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20intel.ips%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

ipv4: optional string

[Link to this property](#)%20intel.ips%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20ipv4%20%3E%20(schema)>)

ipv6: optional string

[Link to this property](#)%20intel.ips%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20ipv6%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.ips%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.ips%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.ips%20%3E%20(model)%20ip%20%3E%20(schema)">IP</a> { belongs\_to\_ref, ip, risk\_types }

</summary>

<details>

<summary>

belongs\_to\_ref: optional object {id, country, description, 2 more }

Specifies a reference to the autonomous systems (AS) that the IP address belongs to.

</summary>

id: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "hosting\_provider"or "isp"or "organization"

Infrastructure type of this ASN.

</summary>

One of the following:

"hosting\_provider"

<a href="#">Link to this property</a>

"isp"

<a href="#">Link to this property</a>

"organization"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

formatipv4

<a href="#">Link to this property</a>

<details>

<summary>

risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.ips%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.ips%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.ips%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get IP Overview

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/ip \
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
      "belongs_to_ref": {
        "id": "autonomous-system--2fa28d71-3549-5a38-af05-770b79ad6ea8",
        "country": "US",
        "description": "CLOUDFLARENET",
        "type": "hosting_provider",
        "value": "value"
      },
      "ip": "192.0.2.0",
      "risk_types": [
        {
          "id": 131,
          "name": "Phishing",
          "super_category_id": 21
        }
      ]
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
      "belongs_to_ref": {
        "id": "autonomous-system--2fa28d71-3549-5a38-af05-770b79ad6ea8",
        "country": "US",
        "description": "CLOUDFLARENET",
        "type": "hosting_provider",
        "value": "value"
      },
      "ip": "192.0.2.0",
      "risk_types": [
        {
          "id": 131,
          "name": "Phishing",
          "super_category_id": 21
        }
      ]
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