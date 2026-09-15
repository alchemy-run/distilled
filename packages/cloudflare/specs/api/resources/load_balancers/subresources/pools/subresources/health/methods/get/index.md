---
title: Pool Health Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

[Pools](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools)

[Health](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/subresources/health)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Pool Health Details

GET/accounts/{account\_id}/load\_balancers/pools/{pool\_id}/health

Fetch the latest pool health status for a single pool.

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

`Load Balancing: Monitors and Pools Write``Load Balancing: Monitors and Pools Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

pool\_id: string

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20pool_id%20%3E%20(schema)>)

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

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {pool\_id, pop\_health }

A list of regions from which to run health checks. Null means every Cloudflare data center.

</summary>

pool\_id: optional string

Pool ID.

<a href="#">Link to this property</a>

<details>

<summary>

pop\_health: optional object {healthy, origins }

List of regions and associated health status.

</summary>

healthy: optional boolean

Whether health check in region is healthy.

<a href="#">Link to this property</a>

<details>

<summary>

origins: optional array of object {ip }

</summary>

<details>

<summary>

ip: optional object {failure\_reason, healthy, response\_code, rtt }

</summary>

failure\_reason: optional string

Failure reason.

<a href="#">Link to this property</a>

healthy: optional boolean

Origin health status.

<a href="#">Link to this property</a>

response\_code: optional number

Response code from origin health check.

<a href="#">Link to this property</a>

rtt: optional string

Origin RTT (Round Trip Time) response.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Pool Health Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID/health \
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
    "pool_id": "17b5962d775c646f3f9725cbc7a53df4",
    "pop_health": {
      "healthy": true,
      "origins": [
        {
          "ip": {
            "failure_reason": "No failure reasons",
            "healthy": true,
            "response_code": 200,
            "rtt": "201.5ms"
          }
        }
      ]
    }
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
    "pool_id": "17b5962d775c646f3f9725cbc7a53df4",
    "pop_health": {
      "healthy": true,
      "origins": [
        {
          "ip": {
            "failure_reason": "No failure reasons",
            "healthy": true,
            "response_code": 200,
            "rtt": "201.5ms"
          }
        }
      ]
    }
  },
  "success": true
}
```