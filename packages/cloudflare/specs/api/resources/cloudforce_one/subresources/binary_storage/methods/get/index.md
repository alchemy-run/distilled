---
title: Retrieves a file from Binary Storage
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Binary Storage](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/binary_storage)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Retrieves a file from Binary Storage

GET/accounts/{account\_id}/cloudforce-one/binary/{hash}

Retrieves a binary file from the Cloudforce One binary storage for analysis.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

hash: string

hash of the binary

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20hash%20%3E%20(schema)>)

### Retrieves a file from Binary Storage

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/binary/$HASH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples