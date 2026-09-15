---
title: Initiate video uploads using TUS
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Initiate video uploads using TUS

POST/accounts/{account\_id}/stream

Initiates a video upload using the TUS protocol. On success, the server responds with a status code 201 (created) and includes a `location` header to indicate where the content should be uploaded. Refer to https://tus.io for protocol details.

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

`Stream Write`

##### P ath ParametersExpand Collapse

account\_id: string

The account identifier tag.

maxLength32

[Link to this property](#)%20stream%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

direct\_user: optional boolean

Provisions a URL to let your end users upload videos directly to Cloudflare Stream without exposing your API token to clients.

[Link to this property](#)%20stream%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20direct_user%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

"Tus-Resumable": "1.0.0"

Specifies the TUS protocol version. This value must be included in every upload request. Notes: The only supported version of TUS protocol is 1.0.0.

[Link to this property](#)%20stream%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20Tus-Resumable%20%3E%20(schema)>)

"Upload-Length": number

Indicates the size of the entire upload in bytes. The value must be a non-negative integer.

minimum0

[Link to this property](#)%20stream%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20Upload-Length%20%3E%20(schema)>)

"Upload-Creator": optional string

A user-defined identifier for the media creator.

maxLength64

[Link to this property](#)%20stream%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20Upload-Creator%20%3E%20(schema)>)

"Upload-Metadata": optional string

Comma-separated key-value pairs following the TUS protocol specification. Values are Base-64 encoded. Supported keys: `name`, `requiresignedurls`, `allowedorigins`, `thumbnailtimestamppct`, `watermark`, `scheduleddeletion`, `maxdurationseconds`.

[Link to this property](#)%20stream%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20Upload-Metadata%20%3E%20(schema)>)

### Initiate video uploads using TUS

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples