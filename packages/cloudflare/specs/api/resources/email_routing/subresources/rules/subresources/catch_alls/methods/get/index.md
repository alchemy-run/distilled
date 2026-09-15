---
title: Get catch-all rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Routing](https://developers.cloudflare.com/api/resources/email_routing)

[Rules](https://developers.cloudflare.com/api/resources/email_routing/subresources/rules)

[Catch Alls](https://developers.cloudflare.com/api/resources/email_routing/subresources/rules/subresources/catch_alls)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get catch-all rule

GET/zones/{zone\_id}/email/routing/rules/catch\_all

Get information on the default catch-all routing rule.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Email Routing Rules Write``Email Routing Rules Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_routing.rules.catch_alls%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_routing.rules.catch_alls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_routing.rules.catch_alls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_routing.rules.catch_alls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, actions, enabled, 4 more }

</summary>

id: optional string

Routing rule identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

actions: optional array of <a href="https://developers.cloudflare.com/api/resources/email_routing#(resource)%20email_routing.rules.catch_alls%20%3E%20(model)%20catch_all_action%20%3E%20(schema)">CatchAllAction</a> { type, value }

List actions for the catch-all routing rule.

</summary>

<details>

<summary>

type: "drop"or "forward"or "worker"

Type of action for catch-all rule.

</summary>

One of the following:

"drop"

<a href="#">Link to this property</a>

"forward"

<a href="#">Link to this property</a>

"worker"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

enabled: optional trueor false

Routing rule status.

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

matchers: optional array of <a href="https://developers.cloudflare.com/api/resources/email_routing#(resource)%20email_routing.rules.catch_alls%20%3E%20(model)%20catch_all_matcher%20%3E%20(schema)">CatchAllMatcher</a> { type }

List of matchers for the catch-all routing rule.

</summary>

type: "all"

Type of matcher. Default is ‘all’.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Routing rule name.

maxLength256

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "api"or "wrangler"

Who manages the rule. <code>api</code> covers dashboard, generic API, and Terraform; <code>wrangler</code> means the rule is managed by a Worker’s wrangler.jsonc. Defaults to <code>api</code> when omitted on write.

</summary>

One of the following:

"api"

<a href="#">Link to this property</a>

"wrangler"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedtag: optional string

Routing rule tag. (Deprecated, replaced by routing rule identifier)

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_routing.rules.catch_alls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get catch-all rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/catch_all \
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
  "success": true,
  "result": {
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "all"
      }
    ],
    "name": "Send to user@example.net rule.",
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
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
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "all"
      }
    ],
    "name": "Send to user@example.net rule.",
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```