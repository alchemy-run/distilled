---
title: List zone snippets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Snippets](https://developers.cloudflare.com/api/resources/snippets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List zone snippets

GET/zones/{zone\_id}/snippets

Fetches all snippets belonging to the zone.

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

`Snippets Write``Snippets Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Use this field to specify the unique ID of the zone.

[Link to this property](#)%20snippets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Specifies the current page number.

minimum1

[Link to this property](#)%20snippets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Specifies how many results to return per page.

minimum1

[Link to this property](#)%20snippets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code }

Lists error messages.

</summary>

message: string

Describes the message text.

minLength1

<a href="#">Link to this property</a>

code: optional number

Identify the message code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code }

Contain warning messages.

</summary>

message: string

Describes the message text.

minLength1

<a href="#">Link to this property</a>

code: optional number

Identify the message code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {created\_on, snippet\_name, modified\_on }

Contain snippets.

</summary>

created\_on: string

Indicates when the snippet was created.

formatdate-time

<a href="#">Link to this property</a>

snippet\_name: string

Identify the snippet.

<a href="#">Link to this property</a>

modified\_on: optional string

Indicates when the snippet was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20snippets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

Additional information to navigate the results.

</summary>

count: number

Specify the number of results in the current page.

minimum0

<a href="#">Link to this property</a>

page: number

Specifies the current page number.

minimum1

<a href="#">Link to this property</a>

per\_page: number

Specifies how many results to return per page.

minimum1

<a href="#">Link to this property</a>

total\_count: number

Specify the total number of results.

minimum0

<a href="#">Link to this property</a>

total\_pages: number

Specify the total number of pages.

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List zone snippets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "result": [
    {
      "created_on": "2000-01-01T00:00:00Z",
      "snippet_name": "my_snippet",
      "modified_on": "2000-01-01T00:00:00Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 25,
    "total_count": 100,
    "total_pages": 10
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "result": [
    {
      "created_on": "2000-01-01T00:00:00Z",
      "snippet_name": "my_snippet",
      "modified_on": "2000-01-01T00:00:00Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 25,
    "total_count": 100,
    "total_pages": 10
  }
}
```