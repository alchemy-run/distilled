---
title: Deletes a category
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Categories](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Deletes a category

DELETE/accounts/{account\_id}/cloudforce-one/events/categories/{category\_id}

Removes a threat event category from Cloudforce One.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

category\_id: string

Category UUID.

formatuuid

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20category_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_delete_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

### Deletes a category

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/$CATEGORY_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```

##### Returns Examples

200 example

```
{
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```