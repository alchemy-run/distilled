---
title: Create new saved string queries
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[Queries](https://developers.cloudflare.com/api/resources/brand_protection/subresources/queries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create new saved string queries

POST/accounts/{account\_id}/brand-protection/queries

Return a success message after creating new saved string queries

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Intel Write`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional string

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

scan: optional boolean

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20scan%20%3E%20(schema)>)

tag: optional string

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20tag%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

max\_time: optional string

formatdate-time

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20max_time%20%3E%20(schema)>)

min\_time: optional string

formatdate-time

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20min_time%20%3E%20(schema)>)

scan: optional boolean

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20scan%20%3E%20(schema)>)

string\_matches: optional unknown

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20string_matches%20%3E%20(schema)>)

tag: optional string

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20tag%20%3E%20(schema)>)

### Create new saved string queries

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/queries \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

##### Returns Examples