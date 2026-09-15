---
title: Patch zone-level Waiting Room settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

[Settings](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Patch zone-level Waiting Room settings

PATCH/zones/{zone\_id}/waiting\_rooms/settings

Patch zone-level Waiting Room settings.

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

`Waiting Rooms Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20waiting_rooms.settings%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

search\_engine\_crawler\_bypass: optional boolean

Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appear in waiting room analytics.

[Link to this property](#)%20waiting_rooms.settings%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20search_engine_crawler_bypass%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {search\_engine\_crawler\_bypass }

</summary>

search\_engine\_crawler\_bypass: boolean

Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appear in waiting room analytics.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.settings%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Patch zone-level Waiting Room settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "search_engine_crawler_bypass": true
        }'
```

200 example

```
{
  "result": {
    "search_engine_crawler_bypass": true
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "search_engine_crawler_bypass": true
  }
}
```