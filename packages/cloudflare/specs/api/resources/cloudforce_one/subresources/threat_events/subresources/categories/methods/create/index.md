---
title: Creates a new category
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

# Creates a new category

POST/accounts/{account\_id}/cloudforce-one/events/categories/create

Creates a new threat event category in Cloudforce One for organizing and classifying threat events.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

killChain: number

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20killChain%20%3E%20(schema)>)

name: string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

mitreAttack: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20mitreAttack%20%3E%20(schema)>)

mitreCapec: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20mitreCapec%20%3E%20(schema)>)

shortname: optional string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20shortname%20%3E%20(schema)>)

##### ReturnsExpand Collapse

killChain: number

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)%20%3E%20(property)%20killChain>)

name: string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)%20%3E%20(property)%20name>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

mitreAttack: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)%20%3E%20(property)%20mitreAttack>)

mitreCapec: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)%20%3E%20(property)%20mitreCapec>)

shortname: optional string

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)%20%3E%20(property)%20shortname>)

### Creates a new category

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "killChain": 0,
          "name": "name",
          "shortname": "shortname"
        }'
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