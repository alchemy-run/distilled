---
title: Edit a token validation configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Token Validation](https://developers.cloudflare.com/api/resources/token_validation)

[Configuration](https://developers.cloudflare.com/api/resources/token_validation/subresources/configuration)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Edit a token validation configuration

PATCH/zones/{zone\_id}/token\_validation/config/{config\_id}

Updates only the supplied fields on a JWT validation configuration.

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

`Account API Gateway``Domain API Gateway`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

config\_id: string

UUID.

maxLength36

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20config_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

description: optional string

maxLength500

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

title: optional string

maxLength50

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20title%20%3E%20(schema)>)

token\_sources: optional array of string

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20token_sources%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, description, title, token\_sources }

</summary>

id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

description: optional string

maxLength500

<a href="#">Link to this property</a>

title: optional string

maxLength50

<a href="#">Link to this property</a>

token\_sources: optional array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Edit a token validation configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config/$CONFIG_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Long description for Token Validation Configuration",
          "title": "Example Token Validation Configuration",
          "token_sources": [
            "http.request.headers[\\"x-auth\\"][0]",
            "http.request.cookies[\\"Authorization\\"][0]"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "Long description for Token Validation Configuration",
    "title": "Example Token Validation Configuration",
    "token_sources": [
      "http.request.headers[\"x-auth\"][0]",
      "http.request.cookies[\"Authorization\"][0]"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "Long description for Token Validation Configuration",
    "title": "Example Token Validation Configuration",
    "token_sources": [
      "http.request.headers[\"x-auth\"][0]",
      "http.request.cookies[\"Authorization\"][0]"
    ]
  },
  "success": true
}
```