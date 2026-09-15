---
title: Fetch the complete transcript for a session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Sessions](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch the complete transcript for a session

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/transcript

Returns a URL to download the transcript for the session ID in CSV format.

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_transcripts%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_transcripts%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

session\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_transcripts%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

format: optional "SRT"or "VTT"or "JSON"or "CSV"

Transcript file format to fetch.

</summary>

One of the following:

"SRT"

<a href="#">Link to this property</a>

"VTT"

<a href="#">Link to this property</a>

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_transcripts%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {sessionId, transcript\_download\_url, transcript\_download\_url\_expiry }

</summary>

sessionId: string

<a href="#">Link to this property</a>

transcript\_download\_url: string

URL where the transcript can be downloaded

<a href="#">Link to this property</a>

transcript\_download\_url\_expiry: string

Time when the download URL will expire

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_transcripts_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_transcripts_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch the complete transcript for a session

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/transcript \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "sessionId": "sessionId",
    "transcript_download_url": "transcript_download_url",
    "transcript_download_url_expiry": "transcript_download_url_expiry"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "sessionId": "sessionId",
    "transcript_download_url": "transcript_download_url",
    "transcript_download_url_expiry": "transcript_download_url_expiry"
  },
  "success": true
}
```