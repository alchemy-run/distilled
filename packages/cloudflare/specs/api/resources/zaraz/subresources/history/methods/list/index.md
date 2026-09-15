---
title: List Zaraz historical configuration records
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zaraz](https://developers.cloudflare.com/api/resources/zaraz)

[History](https://developers.cloudflare.com/api/resources/zaraz/subresources/history)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Zaraz historical configuration records

GET/zones/{zone\_id}/settings/zaraz/history

Lists a history of published Zaraz configuration records for a zone.

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

`Zaraz Edit``Zaraz Read``Zaraz Admin`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

limit: optional number

Maximum amount of results to list. Default value is 10.

minimum1

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

Ordinal number to start listing the results with. Default value is 0.

minimum0

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

<details>

<summary>

sortField: optional "id"or "user\_id"or "description"or 2 more

The field to sort by. Default is updated\_at.

</summary>

One of the following:

"id"

<a href="#">Link to this property</a>

"user\_id"

<a href="#">Link to this property</a>

"description"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

"updated\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sortField%20%3E%20(schema)>)

<details>

<summary>

sortOrder: optional "DESC"or "ASC"

Sorting order. Default is DESC.

</summary>

One of the following:

"DESC"

<a href="#">Link to this property</a>

"ASC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sortOrder%20%3E%20(schema)>)

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

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, createdAt, description, 2 more }

</summary>

id: number

ID of the configuration.

<a href="#">Link to this property</a>

createdAt: string

Date and time the configuration was created.

formatdate-time

<a href="#">Link to this property</a>

description: string

Configuration description provided by the user who published this configuration.

<a href="#">Link to this property</a>

updatedAt: string

Date and time the configuration was last updated.

formatdate-time

<a href="#">Link to this property</a>

userId: string

Alpha-numeric ID of the account user who published the configuration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zaraz.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Zaraz historical configuration records

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/zaraz/history \
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
  "result": [
    {
      "id": 0,
      "createdAt": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "updatedAt": "2019-12-27T18:11:19.117Z",
      "userId": "userId"
    }
  ],
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
  "result": [
    {
      "id": 0,
      "createdAt": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "updatedAt": "2019-12-27T18:11:19.117Z",
      "userId": "userId"
    }
  ],
  "success": true
}
```