---
title: Update target
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

# Update target

PUT/accounts/{account\_id}/infrastructure/targets/{target\_id}

Updates an existing infrastructure access target by its ID.

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

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

target\_id: string

Target identifier

formatuuid

maxLength36

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20target_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

hostname: string

A non-unique field that refers to a target. Case insensitive, maximum length of 255 characters, supports the use of special characters dash and period, does not support spaces, and must start and end with an alphanumeric character.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20hostname%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20ip%20%3E%20(schema)>)

tags: optional map\[string]

Optional tags to associate with the target. Keys and values are user-defined strings.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20tags%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, hostname, 3 more }

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

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update target

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/$TARGET_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "infra-access-target",
          "ip": {}
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
  "success": true,
  "result": {
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
}
```