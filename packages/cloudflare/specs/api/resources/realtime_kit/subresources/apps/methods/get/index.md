---
title: Fetch all apps
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Apps](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/apps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch all apps

GET/accounts/{account\_id}/realtime/kit/apps

Fetch all apps for your account

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Realtime Admin``Realtime`

##### P ath ParametersExpand Collapse

account\_id: string

The account identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.apps%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page\_no: optional number

The page number from which you want your page search results to be displayed.

minimum1

[Link to this property](#)%20realtime_kit.apps%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20page_no%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

minimum1

[Link to this property](#)%20realtime_kit.apps%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search string that matches apps by name.

maxLength125

[Link to this property](#)%20realtime_kit.apps%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "ASC"or "DESC"

Sort order for apps by creation time.

</summary>

One of the following:

"ASC"

<a href="#">Link to this property</a>

"DESC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.apps%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional array of object {id, created\_at, name }

</summary>

id: optional string

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.apps%20%3E%20(model)%20app_get_response%20%3E%20(schema)%20%3E%20(property)%20data>)

<details>

<summary>

paging: optional object {end\_offset, start\_offset, total\_count }

</summary>

end\_offset: optional number

<a href="#">Link to this property</a>

start\_offset: optional number

<a href="#">Link to this property</a>

total\_count: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.apps%20%3E%20(model)%20app_get_response%20%3E%20(schema)%20%3E%20(property)%20paging>)

success: optional boolean

[Link to this property](#)%20realtime_kit.apps%20%3E%20(model)%20app_get_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch all apps

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/apps \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": [
    {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-first-app"
    }
  ],
  "paging": {
    "end_offset": 1,
    "start_offset": 1,
    "total_count": 1
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": [
    {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-first-app"
    }
  ],
  "paging": {
    "end_offset": 1,
    "start_offset": 1,
    "total_count": 1
  },
  "success": true
}
```