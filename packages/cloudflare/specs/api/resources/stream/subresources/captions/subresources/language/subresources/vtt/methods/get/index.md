---
title: Return WebVTT captions for a provided language
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Captions](https://developers.cloudflare.com/api/resources/stream/subresources/captions)

[Language](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language)

[Vtt](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/subresources/vtt)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Return WebVTT captions for a provided language

GET/accounts/{account\_id}/stream/{identifier}/captions/{language}/vtt

Return WebVTT captions for a provided language.

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

[Link to this property](#)%20stream.captions.language.vtt%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

identifier: string

A Cloudflare-generated unique identifier for a media item.

maxLength32

[Link to this property](#)%20stream.captions.language.vtt%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

language: string

The language tag in BCP 47 format.

[Link to this property](#)%20stream.captions.language.vtt%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20language%20%3E%20(schema)>)

### Return WebVTT captions for a provided language

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE/vtt \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples