---
title: Delete a custom asset
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Pages](https://developers.cloudflare.com/api/resources/custom_pages)

[Assets](https://developers.cloudflare.com/api/resources/custom_pages/subresources/assets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a custom asset

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/assets/{asset\_name}

Deletes an existing custom asset.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

asset\_name: string

The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (\_).

minLength1

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20asset_name%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

### Delete a custom asset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets/$ASSET_NAME \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

##### Returns Examples