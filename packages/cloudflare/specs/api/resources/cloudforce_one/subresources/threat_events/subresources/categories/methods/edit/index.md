---
title: Updates a category
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

# Updates a category

PATCH/accounts/{account\_id}/cloudforce-one/events/categories/{category\_id}

Partially updates a threat event category in Cloudforce One, modifying specific fields without replacing the entire category.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

category\_id: string

Category UUID.

formatuuid

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20category_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

killChain: optional number

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20killChain%20%3E%20(schema)>)

mitreAttack: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20mitreAttack%20%3E%20(schema)>)

mitreCapec: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20mitreCapec%20%3E%20(schema)>)

name: optional string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

shortname: optional string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20shortname%20%3E%20(schema)>)

##### ReturnsExpand Collapse

killChain: number

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)%20%3E%20(property)%20killChain>)

name: string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)%20%3E%20(property)%20name>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

mitreAttack: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)%20%3E%20(property)%20mitreAttack>)

mitreCapec: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)%20%3E%20(property)%20mitreCapec>)

shortname: optional string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)%20%3E%20(property)%20shortname>)

### Updates a category

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/$CATEGORY_ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "killChain": 0,
  "name": "name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "mitreAttack": [
    "T1234"
  ],
  "mitreCapec": [
    "123"
  ],
  "shortname": "shortname"
}
```

##### Returns Examples

200 example

```
{
  "killChain": 0,
  "name": "name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "mitreAttack": [
    "T1234"
  ],
  "mitreCapec": [
    "123"
  ],
  "shortname": "shortname"
}
```