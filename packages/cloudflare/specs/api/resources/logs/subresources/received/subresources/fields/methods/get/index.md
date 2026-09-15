---
title: List fields
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logs](https://developers.cloudflare.com/api/resources/logs)

[Received](https://developers.cloudflare.com/api/resources/logs/subresources/received)

[Fields](https://developers.cloudflare.com/api/resources/logs/subresources/received/subresources/fields)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List fields

GET/zones/{zone\_id}/logs/received/fields

Lists all fields available. The response is json object with key-value pairs, where keys are field names, and values are descriptions.

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

`Logs Write``Logs Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20logs.received.fields%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

key: optional string

[Link to this property](#)%20logs.received.fields%20%3E%20(model)%20field_get_response%20%3E%20(schema)%20%3E%20(property)%20key>)

### List fields

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/received/fields \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "key": "value"
}
```

##### Returns Examples

200 example

```
{
  "key": "value"
}
```