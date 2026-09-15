---
title: Modify account profile
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Account Profile](https://developers.cloudflare.com/api/resources/accounts/subresources/account_profile)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Modify account profile

PUT/accounts/{account\_id}/profile

Updates the profile information for a Cloudflare account. Allows modification of account-level settings and organizational details. Requires Account Settings Write permission.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Account Settings Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

business\_address: string

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20business_address%20%3E%20(schema)>)

business\_email: string

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20business_email%20%3E%20(schema)>)

business\_name: string

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20business_name%20%3E%20(schema)>)

business\_phone: string

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20business_phone%20%3E%20(schema)>)

external\_metadata: string

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20external_metadata%20%3E%20(schema)>)

### Modify account profile

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/profile \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "business_address": "business_address",
          "business_email": "business_email",
          "business_name": "business_name",
          "business_phone": "business_phone",
          "external_metadata": "external_metadata"
        }'
```

##### Returns Examples