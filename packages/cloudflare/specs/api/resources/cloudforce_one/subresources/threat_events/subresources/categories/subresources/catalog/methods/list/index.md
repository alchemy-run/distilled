---
title: Lists categories
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Categories](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories)

[Catalog](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/subresources/catalog)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lists categories

GET/accounts/{account\_id}/cloudforce-one/events/categories/catalog

Lists categories

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

killChain: number

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20killChain>)

name: string

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20name>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20uuid>)

mitreAttack: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20mitreAttack>)

mitreCapec: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20mitreCapec>)

shortname: optional string

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20shortname>)

### Lists categories

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/catalog \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
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
]
```

##### Returns Examples

200 example

```
[
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
]
```