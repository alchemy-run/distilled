---
title: Get Script Tags
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers For Platforms](https://developers.cloudflare.com/api/resources/workers_for_platforms)

[Dispatch](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch)

[Namespaces](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces)

[Scripts](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts)

[Tags](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts/subresources/tags)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Script Tags

GET/accounts/{account\_id}/workers/dispatch/namespaces/{dispatch\_namespace}/scripts/{script\_name}/tags

Fetch tags from a script uploaded to a Workers for Platforms namespace.

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

`Workers Tail Read``Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dispatch\_namespace: string

Name of the Workers for Platforms dispatch namespace.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dispatch_namespace%20%3E%20(schema)>)

script\_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.tags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.tags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.tags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional array of string

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.tags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Script Tags

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/tags \
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
  "result": [
    "free",
    "customer"
  ]
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
  "result": [
    "free",
    "customer"
  ]
}
```