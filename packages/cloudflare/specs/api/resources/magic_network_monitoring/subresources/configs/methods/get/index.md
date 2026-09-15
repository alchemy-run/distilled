---
title: List account configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Network Monitoring](https://developers.cloudflare.com/api/resources/magic_network_monitoring)

[Configs](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List account configuration

GET/accounts/{account\_id}/mnm/config

Lists default sampling, router IPs and warp devices for account.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Magic Network Monitoring Admin``Magic Network Monitoring Config Write``Magic Network Monitoring Config Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20magic_network_monitoring.configs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_network_monitoring.configs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_network_monitoring.configs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_network_monitoring#(resource)%20magic_network_monitoring.configs%20%3E%20(model)%20configuration%20%3E%20(schema)">Configuration</a> { default\_sampling, name, router\_ips, warp\_devices }

</summary>

default\_sampling: number

Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

minimum1

<a href="#">Link to this property</a>

name: string

The account name.

<a href="#">Link to this property</a>

router\_ips: array of string

<a href="#">Link to this property</a>

<details>

<summary>

warp\_devices: array of object {id, name, router\_ip }

</summary>

id: string

Unique identifier for the warp device.

<a href="#">Link to this property</a>

name: string

Name of the warp device.

<a href="#">Link to this property</a>

router\_ip: string

IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_network_monitoring.configs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_network_monitoring.configs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List account configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/config \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "default_sampling": 1,
    "name": "cloudflare user's account",
    "router_ips": [
      "203.0.113.1"
    ],
    "warp_devices": [
      {
        "id": "5360368d-b351-4791-abe1-93550dabd351",
        "name": "My warp device",
        "router_ip": "203.0.113.1"
      }
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
    "default_sampling": 1,
    "name": "cloudflare user's account",
    "router_ips": [
      "203.0.113.1"
    ],
    "warp_devices": [
      {
        "id": "5360368d-b351-4791-abe1-93550dabd351",
        "name": "My warp device",
        "router_ip": "203.0.113.1"
      }
    ]
  },
  "success": true
}
```