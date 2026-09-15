---
title: Insert logo query
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[V2](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2)

[Logos](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logos)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Insert logo query

POST/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/queries

Create a new saved brand protection logo query for visual similarity matching

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

image\_data: string

Base64 encoded image data. Can include data URI prefix (e.g., ‘data:image/png;base64,…’) or just the base64 string.

minLength1

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20image_data%20%3E%20(schema)>)

similarity\_threshold: number

Minimum similarity score (0-1) required for visual matches

maximum1

minimum0

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20similarity_threshold%20%3E%20(schema)>)

tag: string

Unique identifier for the logo query

minLength1

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20tag%20%3E%20(schema)>)

search\_lookback: optional boolean

If true, search historic scanned images for matches above the similarity threshold

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20search_lookback%20%3E%20(schema)>)

##### ReturnsExpand Collapse

message: string

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)%20%3E%20(property)%20message>)

success: boolean

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)%20%3E%20(property)%20success>)

query\_id: optional number

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)%20%3E%20(property)%20query_id>)

### Insert logo query

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/logo/queries \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "image_data": "x",
          "similarity_threshold": 0,
          "tag": "x"
        }'
```

200 example

```
{
  "message": "message",
  "success": true,
  "query_id": 0
}
```

##### Returns Examples

200 example

```
{
  "message": "message",
  "success": true,
  "query_id": 0
}
```