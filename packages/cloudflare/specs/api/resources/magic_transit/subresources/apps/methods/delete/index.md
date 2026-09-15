---
title: Delete Account App
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Apps](https://developers.cloudflare.com/api/resources/magic_transit/subresources/apps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete Account App

DELETE/accounts/{account\_id}/magic/apps/{account\_app\_id}

Deletes specific Account App.

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

`Magic WAN Write``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.apps%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

account\_app\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.apps%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_app_id%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.apps%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.apps%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {account\_app\_id, hostnames, ip\_subnets, 3 more }

Custom app defined for an account.

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

hostnames: optional array of string

FQDNs to associate with traffic decisions.

<a href="#">Link to this property</a>

ip\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

name: optional string

Display name for the app.

<a href="#">Link to this property</a>

source\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

type: optional string

Category of the app.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.apps%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.apps%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete Account App

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps/$ACCOUNT_APP_ID \
    -X DELETE \
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
  "result": {
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "hostnames": [
      "auth.cloudflare.com"
    ],
    "ip_subnets": [
      "192.0.2.0/24"
    ],
    "name": "Cloudflare Dashboard",
    "source_subnets": [
      "192.0.2.0/24"
    ],
    "type": "Development"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "hostnames": [
      "auth.cloudflare.com"
    ],
    "ip_subnets": [
      "192.0.2.0/24"
    ],
    "name": "Cloudflare Dashboard",
    "source_subnets": [
      "192.0.2.0/24"
    ],
    "type": "Development"
  },
  "success": true
}
```