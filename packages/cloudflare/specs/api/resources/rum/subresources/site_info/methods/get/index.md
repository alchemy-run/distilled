---
title: Get a Web Analytics site
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[RUM](https://developers.cloudflare.com/api/resources/rum)

[Site Info](https://developers.cloudflare.com/api/resources/rum/subresources/site_info)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a Web Analytics site

GET/accounts/{account\_id}/rum/site\_info/{site\_id}

Retrieves a Web Analytics site.

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

`Account Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20rum.site_info%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

site\_id: string

Identifier.

maxLength32

[Link to this property](#)%20rum.site_info%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20site_id%20%3E%20(schema)>)

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

[Link to this property](#)%20rum.site_info%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20rum.site_info%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20rum.site_info%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/rum#(resource)%20rum.site_info%20%3E%20(model)%20site%20%3E%20(schema)">Site</a> { auto\_install, created, rules, 4 more }

</summary>

auto\_install: optional boolean

If enabled, the JavaScript snippet is automatically injected for orange-clouded sites.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of <a href="https://developers.cloudflare.com/api/resources/rum#(resource)%20rum.rules%20%3E%20(model)%20rum_rule%20%3E%20(schema)">RUMRule</a> { id, created, host, 4 more }

A list of rules.

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

<a href="#">Link to this property</a>

<details>

<summary>

ruleset: optional object {id, enabled, zone\_name, zone\_tag }

</summary>

id: optional string

The Web Analytics ruleset identifier.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the ruleset is enabled.

<a href="#">Link to this property</a>

zone\_name: optional string

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone identifier.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

site\_tag: optional string

The Web Analytics site identifier.

<a href="#">Link to this property</a>

site\_token: optional string

The Web Analytics site token.

<a href="#">Link to this property</a>

snippet: optional string

Encoded JavaScript snippet.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rum.site_info%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a Web Analytics site

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/site_info/$SITE_ID \
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
    "auto_install": true,
    "created": "2014-01-01T05:20:00.12345Z",
    "rules": [
      {
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
    ],
    "ruleset": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "enabled": true,
      "zone_name": "example.com",
      "zone_tag": "023e105f4ecef8ad9ca31a8372d0c353"
    },
    "site_tag": "023e105f4ecef8ad9ca31a8372d0c353",
    "site_token": "023e105f4ecef8ad9ca31a8372d0c353",
    "snippet": "<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{\"token\": \"bc40a2d1b5834453aba85c1b9a3054da\"}'></script><!-- End Cloudflare Web Analytics -->"
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
    "auto_install": true,
    "created": "2014-01-01T05:20:00.12345Z",
    "rules": [
      {
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
    ],
    "ruleset": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "enabled": true,
      "zone_name": "example.com",
      "zone_tag": "023e105f4ecef8ad9ca31a8372d0c353"
    },
    "site_tag": "023e105f4ecef8ad9ca31a8372d0c353",
    "site_token": "023e105f4ecef8ad9ca31a8372d0c353",
    "snippet": "<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{\"token\": \"bc40a2d1b5834453aba85c1b9a3054da\"}'></script><!-- End Cloudflare Web Analytics -->"
  }
}
```