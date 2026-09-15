---
title: List Versions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

[Versions](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Versions

GET/accounts/{account\_id}/workers/scripts/{script\_name}/versions

List of Worker Versions. The first version in the list is the latest version.

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

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

script\_name: string

Name of the script.

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

deployable: optional boolean

Only return versions that can be used in a deployment. Ignores pagination.

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20deployable%20%3E%20(schema)>)

page: optional number

Current page.

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Items per-page.

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {items }

</summary>

<details>

<summary>

items: optional array of object {id, metadata, number }

</summary>

id: optional string

Unique identifier for the version.

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional object {author\_email, author\_id, created\_on, 3 more }

</summary>

author\_email: optional string

Email of the user who created the version.

<a href="#">Link to this property</a>

author\_id: optional string

Identifier of the user who created the version.

<a href="#">Link to this property</a>

created\_on: optional string

When the version was created.

<a href="#">Link to this property</a>

hasPreview: optional boolean

Whether the version can be previewed.

<a href="#">Link to this property</a>

modified\_on: optional string

When the version was last modified.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "unknown"or "api"or "wrangler"or 8 more

The source of the version upload.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"wrangler"

<a href="#">Link to this property</a>

"terraform"

<a href="#">Link to this property</a>

"dash"

<a href="#">Link to this property</a>

"cf\_cli"

<a href="#">Link to this property</a>

"dash\_template"

<a href="#">Link to this property</a>

"integration"

<a href="#">Link to this property</a>

"quick\_editor"

<a href="#">Link to this property</a>

"playground"

<a href="#">Link to this property</a>

"workersci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

number: optional number

Sequential version number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Versions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/versions \
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
  "result": {
    "items": [
      {
        "id": "18f97339-c287-4872-9bdd-e2135c07ec12",
        "metadata": {
          "author_email": "user@example.com",
          "author_id": "408cbcdfd4dda4617efef40b04d168a1",
          "created_on": "2022-11-08T17:19:29.176266Z",
          "hasPreview": true,
          "modified_on": "2022-11-08T17:19:29.176266Z",
          "source": "api"
        },
        "number": 1
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
    "items": [
      {
        "id": "18f97339-c287-4872-9bdd-e2135c07ec12",
        "metadata": {
          "author_email": "user@example.com",
          "author_id": "408cbcdfd4dda4617efef40b04d168a1",
          "created_on": "2022-11-08T17:19:29.176266Z",
          "hasPreview": true,
          "modified_on": "2022-11-08T17:19:29.176266Z",
          "source": "api"
        },
        "number": 1
      }
    ]
  },
  "success": true
}
```