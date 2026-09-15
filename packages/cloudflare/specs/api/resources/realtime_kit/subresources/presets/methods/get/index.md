---
title: Fetch all presets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Presets](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch all presets

GET/accounts/{account\_id}/realtime/kit/{app\_id}/presets

Fetches all the presets belonging to an App.

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

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page\_no: optional number

The page number from which you want your page search results to be displayed.

minimum0

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20page_no%20%3E%20(schema)>)

per\_page: optional number

Number of results per page

minimum0

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search presets by name.

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: array of object {id, created\_at, name, updated\_at }

</summary>

id: optional string

ID of the preset

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp this preset was created at

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Name of the preset

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp this preset was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_get_response%20%3E%20(schema)%20%3E%20(property)%20data>)

<details>

<summary>

paging: object {end\_offset, start\_offset, total\_count }

</summary>

end\_offset: number

<a href="#">Link to this property</a>

start\_offset: number

<a href="#">Link to this property</a>

total\_count: number

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_get_response%20%3E%20(schema)%20%3E%20(property)%20paging>)

success: boolean

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_get_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch all presets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "updated_at": "2019-12-27T18:11:19.117Z"
    }
  ],
  "paging": {
    "end_offset": 30,
    "start_offset": 1,
    "total_count": 30
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "updated_at": "2019-12-27T18:11:19.117Z"
    }
  ],
  "paging": {
    "end_offset": 30,
    "start_offset": 1,
    "total_count": 30
  },
  "success": true
}
```