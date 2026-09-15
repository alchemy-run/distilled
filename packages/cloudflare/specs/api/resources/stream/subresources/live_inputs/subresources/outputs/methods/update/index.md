---
title: Update an output
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Live Inputs](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs)

[Outputs](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update an output

PUT/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs/{output\_identifier}

Updates the state of an output.

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

Identifier.

maxLength32

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

live\_input\_identifier: string

A unique identifier for a live input.

maxLength32

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20live_input_identifier%20%3E%20(schema)>)

output\_identifier: string

A unique identifier for the output.

maxLength32

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20output_identifier%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

enabled: boolean

When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

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

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.live_inputs.outputs%20%3E%20(model)%20output%20%3E%20(schema)">Output</a> { enabled, streamKey, uid, url }

</summary>

enabled: optional boolean

When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

<a href="#">Link to this property</a>

streamKey: optional string

The streamKey used to authenticate against an output’s target.

<a href="#">Link to this property</a>

uid: optional string

A unique identifier for the output.

maxLength32

<a href="#">Link to this property</a>

url: optional string

The URL an output uses to restream.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update an output

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs/$OUTPUT_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
        }'
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
    "enabled": true,
    "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
    "uid": "baea4d9c515887b80289d5c33cf01145",
    "url": "rtmp://a.rtmp.youtube.com/live2"
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
    "enabled": true,
    "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
    "uid": "baea4d9c515887b80289d5c33cf01145",
    "url": "rtmp://a.rtmp.youtube.com/live2"
  }
}
```