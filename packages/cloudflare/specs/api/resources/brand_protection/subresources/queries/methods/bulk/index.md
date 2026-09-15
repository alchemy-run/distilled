---
title: Create new saved string queries in bulk
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[Queries](https://developers.cloudflare.com/api/resources/brand_protection/subresources/queries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create new saved string queries in bulk

POST/accounts/{account\_id}/brand-protection/queries/bulk

Return a success message after creating new saved string queries in bulk

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Intel Write`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20bulk%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

queries: optional array of map\[unknown]

[Link to this property](#)%20brand_protection.queries%20%3E%20(method)%20bulk%20%3E%20(params)%200%20%3E%20(param)%20queries%20%3E%20(schema)>)

### Create new saved string queries in bulk

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/queries/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

##### Returns Examples