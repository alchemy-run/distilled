---
title: Lists all target industries from industry map catalog
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Target Industries](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/target_industries)

[Catalog](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/target_industries/subresources/catalog)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lists all target industries from industry map catalog

GET/accounts/{account\_id}/cloudforce-one/events/targetIndustries/catalog

Lists all target industries from industry map catalog

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.target_industries.catalog%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.target_industries.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)%20%3E%20(property)%20items>)

type: string

[Link to this property](#)%20cloudforce_one.threat_events.target_industries.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)%20%3E%20(property)%20type>)

### Lists all target industries from industry map catalog

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/targetIndustries/catalog \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```

##### Returns Examples

200 example

```
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```