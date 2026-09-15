---
title: Delete an output
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

# Delete an output

DELETE/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs/{output\_identifier}

Deletes an output and removes it from the associated live input.

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

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

live\_input\_identifier: string

A unique identifier for a live input.

maxLength32

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20live_input_identifier%20%3E%20(schema)>)

output\_identifier: string

A unique identifier for the output.

maxLength32

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20output_identifier%20%3E%20(schema)>)

### Delete an output

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs/$OUTPUT_IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{}
```

##### Returns Examples

200 example

```
{}
```