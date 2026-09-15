---
title: List all targets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Infrastructure](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure)

[Targets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List all targets

GET/accounts/{account\_id}/infrastructure/targets

Lists and sorts an account’s targets. Filters are optional and are ANDed together.

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

Account identifier

maxLength32

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

created\_after: optional string

Date and time at which the target was created after (inclusive)

formatdate-time

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20created_after%20%3E%20(schema)>)

created\_before: optional string

Date and time at which the target was created before (inclusive)

formatdate-time

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20created_before%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

The sorting direction.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

hostname: optional string

Hostname of a target

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hostname%20%3E%20(schema)>)

hostname\_contains: optional string

Partial match to the hostname of a target

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hostname_contains%20%3E%20(schema)>)

ip\_like: optional string

Filters for targets whose IP addresses look like the specified string. Supports `*` as a wildcard character

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ip_like%20%3E%20(schema)>)

ip\_v4: optional string

IPv4 address of the target

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ip_v4%20%3E%20(schema)>)

ip\_v6: optional string

IPv6 address of the target

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ip_v6%20%3E%20(schema)>)

ips: optional array of string

Filters for targets that have any of the following IP addresses. Specify `ips` multiple times in query parameter to build list of candidates.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ips%20%3E%20(schema)>)

ipv4\_end: optional string

Defines an IPv4 filter range’s ending value (inclusive). Requires `ipv4_start` to be specified as well.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ipv4_end%20%3E%20(schema)>)

ipv4\_start: optional string

Defines an IPv4 filter range’s starting value (inclusive). Requires `ipv4_end` to be specified as well.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ipv4_start%20%3E%20(schema)>)

ipv6\_end: optional string

Defines an IPv6 filter range’s ending value (inclusive). Requires `ipv6_start` to be specified as well.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ipv6_end%20%3E%20(schema)>)

ipv6\_start: optional string

Defines an IPv6 filter range’s starting value (inclusive). Requires `ipv6_end` to be specified as well.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ipv6_start%20%3E%20(schema)>)

modified\_after: optional string

Date and time at which the target was modified after (inclusive)

formatdate-time

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20modified_after%20%3E%20(schema)>)

modified\_before: optional string

Date and time at which the target was modified before (inclusive)

formatdate-time

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20modified_before%20%3E%20(schema)>)

<details>

<summary>

order: optional "hostname"or "created\_at"

The field to sort by.

</summary>

One of the following:

"hostname"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Current page in the response

formatint32

minimum1

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Max amount of entries returned per page

formatint32

maximum1000

minimum1

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

tag: optional array of string

Filter by tag key:value pairs. Multiple `tag` params are AND’d. Format: `tag=key:value` (e.g., `tag=environment:production`). Key and value must both be non-empty; `tag=:value` and `tag=key:` return 400.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tag%20%3E%20(schema)>)

target\_ids: optional array of string

Filters for targets that have any of the following UUIDs. Specify `target_ids` multiple times in query parameter to build list of candidates.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20target_ids%20%3E%20(schema)>)

virtual\_network\_id: optional string

Private virtual network identifier of the target

formatuuid

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20virtual_network_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, created\_at, hostname, 3 more }

</summary>

id: string

Target identifier

formatuuid

maxLength36

<a href="#">Link to this property</a>

created\_at: string

Date and time at which the target was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

A non-unique field that refers to a target

<a href="#">Link to this property</a>

<details>

<summary>

ip: object {ipv4, ipv6 }

The IPv4/IPv6 address that identifies where to reach a target

</summary>

<details>

<summary>

ipv4: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv4 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipv6: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv6 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

Date and time at which the target was modified

formatdate-time

<a href="#">Link to this property</a>

tags: optional map\[string]

Tags assigned to the target. Empty when no tags are assigned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

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

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List all targets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets \
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
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-08-24T14:15:22Z",
      "hostname": "infra-access-target",
      "ip": {
        "ipv4": {
          "ip_addr": "187.26.29.249",
          "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
        },
        "ipv6": {
          "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
          "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
        }
      },
      "modified_at": "2019-08-24T14:15:22Z",
      "tags": {
        "foo": "string"
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-08-24T14:15:22Z",
      "hostname": "infra-access-target",
      "ip": {
        "ipv4": {
          "ip_addr": "187.26.29.249",
          "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
        },
        "ipv6": {
          "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
          "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
        }
      },
      "modified_at": "2019-08-24T14:15:22Z",
      "tags": {
        "foo": "string"
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```