---
title: Create a User Agent Blocking rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[UA Rules](https://developers.cloudflare.com/api/resources/firewall/subresources/ua_rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a User Agent Blocking rule

POST/zones/{zone\_id}/firewall/ua\_rules

Creates a new User Agent Blocking rule in a zone.

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

`Firewall Services Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

configuration: object {target, value }

</summary>

target: optional "ua"

The configuration target. You must set the target to <code>ua</code> when specifying a user agent in the rule.

<a href="#">Link to this property</a>

value: optional string

the user agent to exactly match

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20configuration%20%3E%20(schema)>)

<details>

<summary>

mode: "block"or "challenge"or "whitelist"or 2 more

The action to apply to a matched request.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

"whitelist"

<a href="#">Link to this property</a>

"js\_challenge"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20mode%20%3E%20(schema)>)

description: optional string

An informative summary of the rule. This value is sanitized and any tags will be removed.

maxLength1024

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

paused: optional boolean

When true, indicates that the rule is currently paused.

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20paused%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, configuration, description, 2 more }

</summary>

id: optional string

The unique identifier of the User Agent Blocking rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

configuration: optional object {target, value }

The configuration object for the current rule.

</summary>

target: optional string

The configuration target for this rule. You must set the target to <code>ua</code> for User Agent Blocking rules.

<a href="#">Link to this property</a>

value: optional string

The exact user agent string to match. This value will be compared to the received <code>User-Agent</code> HTTP header value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

An informative summary of the rule.

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

mode: optional "block"or "challenge"or "js\_challenge"or "managed\_challenge"

The action to apply to a matched request.

maxLength12

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

"js\_challenge"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20firewall.ua_rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create a User Agent Blocking rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/ua_rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "configuration": {},
          "mode": "challenge",
          "description": "Prevent multiple login failures to mitigate brute force attacks"
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
  "result": {
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configuration": {
      "target": "ua",
      "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
    },
    "description": "Prevent access from abusive clients identified by this User Agent to mitigate a DDoS attack",
    "mode": "js_challenge",
    "paused": false
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configuration": {
      "target": "ua",
      "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
    },
    "description": "Prevent access from abusive clients identified by this User Agent to mitigate a DDoS attack",
    "mode": "js_challenge",
    "paused": false
  },
  "success": true
}
```