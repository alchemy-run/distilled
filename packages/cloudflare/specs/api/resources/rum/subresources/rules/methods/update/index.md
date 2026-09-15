---
title: Update a Web Analytics rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[RUM](https://developers.cloudflare.com/api/resources/rum)

[Rules](https://developers.cloudflare.com/api/resources/rum/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a Web Analytics rule

PUT/accounts/{account\_id}/rum/v2/{ruleset\_id}/rule/{rule\_id}

Updates a rule in a Web Analytics ruleset.

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

Identifier.

maxLength32

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

ruleset\_id: string

The Web Analytics ruleset identifier.

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20ruleset_id%20%3E%20(schema)>)

rule\_id: string

The Web Analytics rule identifier.

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20rule_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

host: optional string

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20host%20%3E%20(schema)>)

inclusive: optional boolean

Whether the rule includes or excludes traffic from being measured.

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20inclusive%20%3E%20(schema)>)

is\_paused: optional boolean

Whether the rule is paused or not.

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20is_paused%20%3E%20(schema)>)

paths: optional array of string

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20paths%20%3E%20(schema)>)

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

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/rum#(resource)%20rum.rules%20%3E%20(model)%20rum_rule%20%3E%20(schema)">RUMRule</a> { id, created, host, 4 more }

</summary>

id: optional string

The Web Analytics rule identifier.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

host: optional string

The hostname the rule will be applied to.

<a href="#">Link to this property</a>

inclusive: optional boolean

Whether the rule includes or excludes traffic from being measured.

<a href="#">Link to this property</a>

is\_paused: optional boolean

Whether the rule is paused or not.

<a href="#">Link to this property</a>

paths: optional array of string

The paths the rule will be applied to.

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rum.rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a Web Analytics rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/v2/$RULESET_ID/rule/$RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": "example.com",
          "inclusive": true,
          "paths": [
            "*"
          ]
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created": "2014-01-01T05:20:00.12345Z",
    "host": "example.com",
    "inclusive": true,
    "is_paused": false,
    "paths": [
      "*"
    ],
    "priority": 1000
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created": "2014-01-01T05:20:00.12345Z",
    "host": "example.com",
    "inclusive": true,
    "is_paused": false,
    "paths": [
      "*"
    ],
    "priority": 1000
  }
}
```