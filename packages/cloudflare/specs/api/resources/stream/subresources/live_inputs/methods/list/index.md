---
title: List live inputs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Live Inputs](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List live inputs

GET/accounts/{account\_id}/stream/live\_inputs

Lists the live inputs created for an account. To get the credentials needed to stream to a specific live input, request a single live input.

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

`Stream Write``Stream Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

include\_counts: optional boolean

Includes the total number of videos associated with the submitted query parameters.

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include_counts%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {liveInputs, range, total }

</summary>

<details>

<summary>

liveInputs: optional array of object {created, deleteRecordingAfterDays, enabled, 3 more }

</summary>

created: optional string

The date and time the live input was created.

formatdate-time

<a href="#">Link to this property</a>

deleteRecordingAfterDays: optional number

Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a <code>null</code> value to remove an existing scheduled deletion.

minimum30

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether the live input is enabled and can accept streams.

<a href="#">Link to this property</a>

meta: optional unknown

A user modifiable key-value store used to reference other systems of record for managing live inputs.

<a href="#">Link to this property</a>

modified: optional string

The date and time the live input was last modified.

formatdate-time

<a href="#">Link to this property</a>

uid: optional string

A unique identifier for a live input.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

range: optional number

The total number of remaining live inputs based on cursor position.

<a href="#">Link to this property</a>

total: optional number

The total number of live inputs that match the provided filters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List live inputs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "liveInputs": [
      {
        "created": "2014-01-02T02:20:00Z",
        "deleteRecordingAfterDays": 45,
        "enabled": true,
        "meta": {
          "name": "test stream 1"
        },
        "modified": "2014-01-02T02:20:00Z",
        "uid": "66be4bf738797e01e1fca35a7bdecdcd"
      }
    ],
    "range": 1000,
    "total": 35586
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "liveInputs": [
      {
        "created": "2014-01-02T02:20:00Z",
        "deleteRecordingAfterDays": 45,
        "enabled": true,
        "meta": {
          "name": "test stream 1"
        },
        "modified": "2014-01-02T02:20:00Z",
        "uid": "66be4bf738797e01e1fca35a7bdecdcd"
      }
    ],
    "range": 1000,
    "total": 35586
  }
}
```