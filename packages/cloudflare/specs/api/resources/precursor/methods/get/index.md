---
title: Get Zone Precursor Config
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Precursor](https://developers.cloudflare.com/api/resources/precursor)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Zone Precursor Config

GET/zones/{zone\_id}/precursor

Retrieve a zone’s Precursor configuration: the zone-level `default_mode` and the ordered list of `enforcement_rules`.

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

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20precursor%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20precursor%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20precursor%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20precursor%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/precursor#(resource)%20precursor%20%3E%20(model)%20precursor_config%20%3E%20(schema)">PrecursorConfig</a> { default\_mode, enforcement\_rules }

</summary>

<details>

<summary>

Deprecateddefault\_mode: optional "off"or "min-friction"or "max-security"

The zone-level Precursor enforcement mode applied to requests that do not match a more specific enforcement rule.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"min-friction"

<a href="#">Link to this property</a>

"max-security"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedenforcement\_rules: optional array of <a href="https://developers.cloudflare.com/api/resources/precursor#(resource)%20precursor%20%3E%20(model)%20enforcement_rule%20%3E%20(schema)">EnforcementRule</a> { expression, mode, id, 2 more }

The ordered list of enforcement rules for the zone.

</summary>

expression: string

The filter expression that determines which requests the rule matches.

maxLength4000

<a href="#">Link to this property</a>

<details>

<summary>

mode: "min-friction"or "max-security"

The override mode Precursor applies to requests matching an enforcement rule. Unlike <code>default_mode</code>, this cannot be <code>off</code>.

</summary>

One of the following:

"min-friction"

<a href="#">Link to this property</a>

"max-security"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

The read-only identifier that Cloudflare assigns to the rule.

<a href="#">Link to this property</a>

description: optional string

An informative description of the rule.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the rule is active.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20precursor%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Zone Precursor Config

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/precursor \
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
    "default_mode": "min-friction",
    "enforcement_rules": [
      {
        "expression": "http.request.uri.path eq \"/shop\"",
        "mode": "max-security",
        "id": "3a03d665bac043e3a684e0d385a4b1e2",
        "description": "Enforce max-security on the shop page",
        "enabled": true
      }
    ]
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
    "default_mode": "min-friction",
    "enforcement_rules": [
      {
        "expression": "http.request.uri.path eq \"/shop\"",
        "mode": "max-security",
        "id": "3a03d665bac043e3a684e0d385a4b1e2",
        "description": "Enforce max-security on the shop page",
        "enabled": true
      }
    ]
  }
}
```