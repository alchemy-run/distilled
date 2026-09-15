---
title: Partially update zone environments
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

[Environments](https://developers.cloudflare.com/api/resources/zones/subresources/environments)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Partially update zone environments

PATCH/zones/{zone\_id}/environments

Applies partial updates to zone environments.

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

`Zone Versioning Write`

##### P ath ParametersExpand Collapse

zone\_id: string

[Link to this property](#)%20zones.environments%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

environments: array of object {expression, locked\_on\_deployment, name, 4 more }

</summary>

expression: string

<a href="#">Link to this property</a>

locked\_on\_deployment: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

position: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)">ListCursor</a> { after, before }

</summary>

after: optional string

<a href="#">Link to this property</a>

before: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

http\_application\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.environments%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20environments%20%3E%20(schema)>)

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

[Link to this property](#)%20zones.environments%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zones.environments%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {environments }

</summary>

<details>

<summary>

environments: array of object {expression, locked\_on\_deployment, name, 4 more }

</summary>

expression: string

<a href="#">Link to this property</a>

locked\_on\_deployment: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

position: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)">ListCursor</a> { after, before }

</summary>

after: optional string

<a href="#">Link to this property</a>

before: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

http\_application\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.environments%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20zones.environments%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Partially update zone environments

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "environments": [
            {
              "expression": "expression",
              "locked_on_deployment": true,
              "name": "name",
              "position": {},
              "ref": "ref",
              "version": 0
            }
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
  "result": {
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```