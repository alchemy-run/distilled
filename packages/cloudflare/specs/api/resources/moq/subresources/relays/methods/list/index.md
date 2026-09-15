---
title: List relays
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[MoQ](https://developers.cloudflare.com/api/resources/moq)

[Relays](https://developers.cloudflare.com/api/resources/moq/subresources/relays)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List relays

GET/accounts/{account\_id}/moq/relays

Lists all MoQ relays for the account. Returns only metadata. Config, status, and tokens are omitted.

Results are cursor-paginated (keyset on the `created` timestamp). Use `created_before` / `created_after` with the `created` value of the first/last item in a page to fetch the adjacent page. `result_info` reports the page `count` and the `total` matching the cursor filters.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account identifier.

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

asc: optional boolean

Sort order by `created`. When true, results are returned oldest-first (ascending); otherwise newest-first (descending, the default).

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20asc%20%3E%20(schema)>)

created\_after: optional string

Cursor for pagination. Returns relays created strictly after this RFC 3339 timestamp (typically the `created` value of the last item on the current page, to fetch the next page).

formatdate-time

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20created_after%20%3E%20(schema)>)

created\_before: optional string

Cursor for pagination. Returns relays created strictly before this RFC 3339 timestamp (typically the `created` value of the first item on the current page, to fetch the previous page).

formatdate-time

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20created_before%20%3E%20(schema)>)

per\_page: optional number

Maximum number of relays to return per page. Values above the maximum are clamped to it rather than rejected.

maximum1000

minimum1

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {created, modified, name, uid }

</summary>

created: string

formatdate-time

<a href="#">Link to this property</a>

modified: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, total }

</summary>

count: optional number

<a href="#">Link to this property</a>

total: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List relays

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": [
    {
      "created": "2019-12-27T18:11:19.117Z",
      "modified": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890"
    }
  ],
  "result_info": {
    "count": 0,
    "total": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": [
    {
      "created": "2019-12-27T18:11:19.117Z",
      "modified": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890"
    }
  ],
  "result_info": {
    "count": 0,
    "total": 0
  }
}
```