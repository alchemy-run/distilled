---
title: Generate summary of Transcripts for the session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Sessions](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Generate summary of Transcripts for the session

POST/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/summary

Trigger Summary generation of Transcripts for the session ID.

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20generate_summary_of_transcripts%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20generate_summary_of_transcripts%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

session\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20generate_summary_of_transcripts%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {session\_id, status }

</summary>

session\_id: optional string

formatuuid

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_generate_summary_of_transcripts_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_generate_summary_of_transcripts_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Generate summary of Transcripts for the session

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/summary \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "status": "status"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "status": "status"
  },
  "success": true
}
```