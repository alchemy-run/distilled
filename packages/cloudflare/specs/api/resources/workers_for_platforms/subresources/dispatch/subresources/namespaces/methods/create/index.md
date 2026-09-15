---
title: Create dispatch namespace
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers For Platforms](https://developers.cloudflare.com/api/resources/workers_for_platforms)

[Dispatch](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch)

[Namespaces](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create dispatch namespace

POST/accounts/{account\_id}/workers/dispatch/namespaces

Create a new Workers for Platforms namespace.

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

`Workers Scripts Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: optional string

The name of the dispatch namespace.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {created\_by, created\_on, modified\_by, 5 more }

</summary>

created\_by: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: optional string

When the script was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_by: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

modified\_on: optional string

When the script was last modified.

formatdate-time

<a href="#">Link to this property</a>

namespace\_id: optional string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

namespace\_name: optional string

Name of the Workers for Platforms dispatch namespace.

<a href="#">Link to this property</a>

script\_count: optional number

The current number of scripts in this Dispatch Namespace.

<a href="#">Link to this property</a>

trusted\_workers: optional boolean

Whether the Workers in the namespace are executed in a “trusted” manner. When a Worker is trusted, it has access to the shared caches for the zone in the Cache API, and has access to the <code>request.cf</code> object on incoming Requests. When a Worker is untrusted, caches are not shared across the zone, and <code>request.cf</code> is undefined. By default, Workers in a namespace are “untrusted”.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create dispatch namespace

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-dispatch-namespace"
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
    "created_by": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2017-01-01T00:00:00Z",
    "modified_by": "023e105f4ecef8ad9ca31a8372d0c353",
    "modified_on": "2017-01-01T00:00:00Z",
    "namespace_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "namespace_name": "my-dispatch-namespace",
    "script_count": 800,
    "trusted_workers": false
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
    "created_by": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2017-01-01T00:00:00Z",
    "modified_by": "023e105f4ecef8ad9ca31a8372d0c353",
    "modified_on": "2017-01-01T00:00:00Z",
    "namespace_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "namespace_name": "my-dispatch-namespace",
    "script_count": 800,
    "trusted_workers": false
  }
}
```