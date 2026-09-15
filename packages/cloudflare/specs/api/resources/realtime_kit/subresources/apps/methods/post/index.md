---
title: Create App
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Apps](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/apps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create App

POST/accounts/{account\_id}/realtime/kit/apps

Create new app for your account

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

[Link to this property](#)%20realtime_kit.apps%20%3E%20(method)%20post%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

minLength1

[Link to this property](#)%20realtime_kit.apps%20%3E%20(method)%20post%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {app }

</summary>

<details>

<summary>

app: optional object {id, created\_at, name }

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.apps%20%3E%20(model)%20app_post_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.apps%20%3E%20(model)%20app_post_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Create App

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "x"
        }'
```

200 example

```
{
  "data": {
    "app": {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-new-app"
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "app": {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-new-app"
    }
  },
  "success": true
}
```