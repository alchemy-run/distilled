---
title: Create a content security rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

[Policies](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a content security rule

POST/zones/{zone\_id}/page\_shield/policies

Creates a rule that applies a client-side security action when its filter expression matches.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Page Shield``Domain Page Shield``Zone Settings Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20action%20%3E%20(schema)>)

description: string

A description for the policy

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

enabled: boolean

Whether the policy is enabled

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expression%20%3E%20(schema)>)

value: string

The policy which will be applied

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20value%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### Create a content security rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d "{
          \"action\": \"allow\",
          \"description\": \"Checkout page CSP policy\",
          \"enabled\": true,
          \"expression\": \"ends_with(http.request.uri.path, \\\"/checkout\\\")\",
          \"value\": \"script-src 'none';\"
        }"
```

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "action": "allow",
    "description": "Checkout page CSP policy",
    "enabled": true,
    "expression": "ends_with(http.request.uri.path, \"/checkout\")",
    "value": "script-src 'none';"
  },
  "success": true,
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
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "action": "allow",
    "description": "Checkout page CSP policy",
    "enabled": true,
    "expression": "ends_with(http.request.uri.path, \"/checkout\")",
    "value": "script-src 'none';"
  },
  "success": true,
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
  ]
}
```