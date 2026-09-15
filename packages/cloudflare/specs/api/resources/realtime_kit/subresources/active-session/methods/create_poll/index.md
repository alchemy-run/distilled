---
title: Create a poll
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Active Session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a poll

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-session/poll

Creates a new poll in an active session for the given meeting ID.

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

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20create_poll%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20create_poll%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20create_poll%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

options: array of string

Different options for the question

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20create_poll%20%3E%20(params)%200%20%3E%20(param)%20options%20%3E%20(schema)>)

question: string

Question of the poll

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20create_poll%20%3E%20(params)%200%20%3E%20(param)%20question%20%3E%20(schema)>)

anonymous: optional boolean

if voters on a poll are anonymous

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20create_poll%20%3E%20(params)%200%20%3E%20(param)%20anonymous%20%3E%20(schema)>)

hide\_votes: optional boolean

if votes on an option are visible before a person votes

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20create_poll%20%3E%20(params)%200%20%3E%20(param)%20hide_votes%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {action, poll }

</summary>

action: optional string

<a href="#">Link to this property</a>

<details>

<summary>

poll: optional object {id, options, question, 4 more }

</summary>

id: string

ID of the poll

<a href="#">Link to this property</a>

<details>

<summary>

options: array of object {count, text, votes }

Answer options

</summary>

count: number

<a href="#">Link to this property</a>

text: string

Text of the answer option

<a href="#">Link to this property</a>

<details>

<summary>

votes: array of object {id, name }

</summary>

id: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

question: string

Question asked by the poll

<a href="#">Link to this property</a>

anonymous: optional boolean

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

hide\_votes: optional boolean

<a href="#">Link to this property</a>

voted: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_create_poll_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_create_poll_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Create a poll

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/poll \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "options": [
            "string"
          ],
          "question": "question"
        }'
```

200 example

```
{
  "data": {
    "action": "action",
    "poll": {
      "id": "id",
      "options": [
        {
          "count": 0,
          "text": "text",
          "votes": [
            {
              "id": "id",
              "name": "name"
            }
          ]
        }
      ],
      "question": "question",
      "anonymous": true,
      "created_by": "created_by",
      "hide_votes": true,
      "voted": [
        "string"
      ]
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
    "action": "action",
    "poll": {
      "id": "id",
      "options": [
        {
          "count": 0,
          "text": "text",
          "votes": [
            {
              "id": "id",
              "name": "name"
            }
          ]
        }
      ],
      "question": "question",
      "anonymous": true,
      "created_by": "created_by",
      "hide_votes": true,
      "voted": [
        "string"
      ]
    }
  },
  "success": true
}
```