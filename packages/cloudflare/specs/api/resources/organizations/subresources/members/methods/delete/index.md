---
title: Delete organization member
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Organizations](https://developers.cloudflare.com/api/resources/organizations)

[Members](https://developers.cloudflare.com/api/resources/organizations/subresources/members)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete organization member

DELETE/organizations/{organization\_id}/members/{member\_id}

Delete a membership to a particular Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

organization\_id: string

[Link to this property](#)%20organizations.members%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20organization_id%20%3E%20(schema)>)

member\_id: string

Organization Member ID

[Link to this property](#)%20organizations.members%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20member_id%20%3E%20(schema)>)

### Delete organization member

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members/$MEMBER_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

##### Returns Examples