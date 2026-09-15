---
title: Update advertisement for rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Network Monitoring](https://developers.cloudflare.com/api/resources/magic_network_monitoring)

[Rules](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules)

[Advertisements](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules/subresources/advertisements)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update advertisement for rule

PATCH/accounts/{account\_id}/mnm/rules/{rule\_id}/advertisement

Update advertisement for rule.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Magic Network Monitoring Admin``Magic Network Monitoring Config Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20magic_network_monitoring.rules.advertisements%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

rule\_id: string

The id of the rule. Must be unique.

[Link to this property](#)%20magic_network_monitoring.rules.advertisements%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20rule_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

body: unknown

[Link to this property](#)%20magic_network_monitoring.rules.advertisements%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_network_monitoring.rules.advertisements%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_network_monitoring.rules.advertisements%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_network_monitoring#(resource)%20magic_network_monitoring.rules.advertisements%20%3E%20(model)%20advertisement%20%3E%20(schema)">Advertisement</a> { automatic\_advertisement }

</summary>

automatic\_advertisement: boolean

Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_network_monitoring.rules.advertisements%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_network_monitoring.rules.advertisements%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update advertisement for rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID/advertisement \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
    "automatic_advertisement": true
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
    "automatic_advertisement": true
  },
  "success": true
}
```