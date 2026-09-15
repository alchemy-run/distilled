---
title: Delete saved logo queries by ID
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[Logos](https://developers.cloudflare.com/api/resources/brand_protection/subresources/logos)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete saved logo queries by ID

DELETE/accounts/{account\_id}/brand-protection/logos/{logo\_id}

Return a success message after deleting saved logo queries by ID

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Intel Write`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.logos%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

logo\_id: string

minLength1

[Link to this property](#)%20brand_protection.logos%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20logo_id%20%3E%20(schema)>)

### Delete saved logo queries by ID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/logos/$LOGO_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples