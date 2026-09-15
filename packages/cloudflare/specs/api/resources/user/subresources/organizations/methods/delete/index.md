---
title: Leave Organization
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Organizations](https://developers.cloudflare.com/api/resources/user/subresources/organizations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Leave Organization

Deprecated

DELETE/user/organizations/{organization\_id}

Removes association to an organization.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

organization\_id: string

Identifier

maxLength32

minLength32

[Link to this property](#)%20user.organizations%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20organization_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: optional string

Identifier

maxLength32

minLength32

[Link to this property](#)%20user.organizations%20%3E%20(model)%20organization_delete_response%20%3E%20(schema)%20%3E%20(property)%20id>)

### Leave Organization

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/organizations/$ORGANIZATION_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```

##### Returns Examples

200 example

```
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```