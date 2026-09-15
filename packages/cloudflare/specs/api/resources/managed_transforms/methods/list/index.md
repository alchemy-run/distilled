---
title: List Managed Transforms
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Managed Transforms](https://developers.cloudflare.com/api/resources/managed_transforms)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Managed Transforms

GET/zones/{zone\_id}/managed\_headers

Fetches a list of all Managed Transforms.

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

`Response Compression Write``Response Compression Read``Config Settings Write``Config Settings Read``Dynamic URL Redirects Write``Dynamic URL Redirects Read``Cache Settings Write``Cache Settings Read``Custom Errors Write``Custom Errors Read``Origin Write``Origin Read``Managed headers Write``Managed headers Read``Zone Transform Rules Write``Zone Transform Rules Read``Mass URL Redirects Write``Mass URL Redirects Read``Magic Firewall Write``Magic Firewall Read``L4 DDoS Managed Ruleset Write``L4 DDoS Managed Ruleset Read``HTTP DDoS Managed Ruleset Write``HTTP DDoS Managed Ruleset Read``Sanitize Write``Sanitize Read``Transform Rules Write``Transform Rules Read``Select Configuration Write``Select Configuration Read``Bot Management Write``Bot Management Read``Zone WAF Write``Zone WAF Read``Account WAF Write``Account WAF Read``Account Rulesets Read``Account Rulesets Write``Logs Write``Logs Read``Logs Write``Logs Read`

##### P ath ParametersExpand Collapse

zone\_id: string

The unique ID of the zone.

[Link to this property](#)%20managed_transforms%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code, source }

A list of error messages.

</summary>

message: string

A text description of this message.

minLength1

<a href="#">Link to this property</a>

code: optional number

A unique code for this message.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

The source of this message.

</summary>

pointer: string

A JSON pointer to the field that is the source of the message.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20managed_transforms%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code, source }

A list of warning messages.

</summary>

message: string

A text description of this message.

minLength1

<a href="#">Link to this property</a>

code: optional number

A unique code for this message.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

The source of this message.

</summary>

pointer: string

A JSON pointer to the field that is the source of the message.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20managed_transforms%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {managed\_request\_headers, managed\_response\_headers }

A result.

</summary>

<details>

<summary>

managed\_request\_headers: array of object {id, enabled, has\_conflict, conflicts\_with }

The list of Managed Request Transforms.

</summary>

id: string

The human-readable identifier of the Managed Transform.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

Whether the Managed Transform is enabled.

<a href="#">Link to this property</a>

has\_conflict: boolean

Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

<a href="#">Link to this property</a>

conflicts\_with: optional array of string

The Managed Transforms that this Managed Transform conflicts with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

managed\_response\_headers: array of object {id, enabled, has\_conflict, conflicts\_with }

The list of Managed Response Transforms.

</summary>

id: string

The human-readable identifier of the Managed Transform.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

Whether the Managed Transform is enabled.

<a href="#">Link to this property</a>

has\_conflict: boolean

Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

<a href="#">Link to this property</a>

conflicts\_with: optional array of string

The Managed Transforms that this Managed Transform conflicts with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20managed_transforms%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20managed_transforms%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Managed Transforms

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/managed_headers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "managed_request_headers": [
      {
        "id": "add_bot_protection_headers",
        "enabled": true,
        "has_conflict": false,
        "conflicts_with": [
          "add_true_client_ip_headers"
        ]
      }
    ],
    "managed_response_headers": [
      {
        "id": "add_security_headers",
        "enabled": true,
        "has_conflict": false,
        "conflicts_with": [
          "add_true_client_ip_headers"
        ]
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
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "managed_request_headers": [
      {
        "id": "add_bot_protection_headers",
        "enabled": true,
        "has_conflict": false,
        "conflicts_with": [
          "add_true_client_ip_headers"
        ]
      }
    ],
    "managed_response_headers": [
      {
        "id": "add_security_headers",
        "enabled": true,
        "has_conflict": false,
        "conflicts_with": [
          "add_true_client_ip_headers"
        ]
      }
    ]
  },
  "success": true
}
```