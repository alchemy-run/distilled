---
title: Update Silences
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

[Silences](https://developers.cloudflare.com/api/resources/alerting/subresources/silences)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Silences

PUT/accounts/{account\_id}/alerting/v3/silences

Updates existing silences for an account.

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

`Notifications Write``Account Settings Write`

##### P ath ParametersExpand Collapse

account\_id: string

The account id

maxLength32

[Link to this property](#)%20alerting.silences%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: array of object {id, end\_time, start\_time }

</summary>

id: optional string

Silence ID

maxLength32

<a href="#">Link to this property</a>

end\_time: optional string

When the silence ends.

<a href="#">Link to this property</a>

start\_time: optional string

When the silence starts.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful

[Link to this property](#)%20alerting.silences%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, created\_at, end\_time, 3 more }

</summary>

id: optional string

Silence ID

maxLength32

<a href="#">Link to this property</a>

created\_at: optional string

When the silence was created.

<a href="#">Link to this property</a>

end\_time: optional string

When the silence ends.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

start\_time: optional string

When the silence starts.

<a href="#">Link to this property</a>

updated\_at: optional string

When the silence was modified.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Silences

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "id": "f878e90c23f44126ae3cfc399f646977",
            "end_time": "2022-01-01T00:00:00Z",
            "start_time": "2022-01-01T00:00:00Z"
          }
        ]'
```

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f878e90c23f44126ae3cfc399f646977",
      "created_at": "2022-01-01T00:00:00Z",
      "end_time": "2022-01-01T00:00:00Z",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "start_time": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f878e90c23f44126ae3cfc399f646977",
      "created_at": "2022-01-01T00:00:00Z",
      "end_time": "2022-01-01T00:00:00Z",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "start_time": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
    }
  ]
}
```