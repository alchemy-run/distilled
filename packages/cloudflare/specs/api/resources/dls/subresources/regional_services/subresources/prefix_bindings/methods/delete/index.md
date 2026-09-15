---
title: Delete a DLS prefix binding
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Data Localization Suite](https://developers.cloudflare.com/api/resources/dls)

[Regional Services](https://developers.cloudflare.com/api/resources/dls/subresources/regional_services)

[Prefix Bindings](https://developers.cloudflare.com/api/resources/dls/subresources/regional_services/subresources/prefix_bindings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a DLS prefix binding

DELETE/accounts/{account\_id}/dls/regional\_services/prefix\_bindings/{binding\_id}

Delete a DLS prefix binding

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

Identifier of a Cloudflare account.

maxLength32

minLength32

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

binding\_id: string

Unique identifier for the prefix binding.

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20binding_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(model)%20prefix_binding_delete_response%20%3E%20(schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(model)%20prefix_binding_delete_response%20%3E%20(schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

maxLength0

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

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(model)%20prefix_binding_delete_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

### Delete a DLS prefix binding

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regional_services/prefix_bindings/$BINDING_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
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
  "errors": [
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
  "errors": [
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