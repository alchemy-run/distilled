---
title: Delete a content security rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

[Policies](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a content security rule

DELETE/zones/{zone\_id}/page\_shield/policies/{policy\_id}

Permanently deletes a content security rule by ID.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Page Shield``Domain Page Shield``Zone Settings Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

policy\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20policy_id%20%3E%20(schema)>)

### Delete a content security rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies/$POLICY_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

##### Returns Examples