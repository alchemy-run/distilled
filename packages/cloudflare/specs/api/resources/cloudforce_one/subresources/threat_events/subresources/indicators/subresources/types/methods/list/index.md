---
title: Lists indicator types across multiple datasets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators)

[Types](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/types)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lists indicator types across multiple datasets

GET/accounts/{account\_id}/cloudforce-one/events/indicator-types

Lists indicator types across multiple datasets

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

datasetIds: optional array of string

Dataset UUIDs to query, or one standalone scope value: ‘all’/’\*’, ‘analytics’ for isAnalytics=true datasets, or ‘operational’ for isAnalytics=false datasets. If not provided, queries all accessible datasets.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetIds%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.types%20%3E%20(model)%20type_list_response%20%3E%20(schema)%20%3E%20(property)%20items>)

type: string

[Link to this property](#)%20cloudforce_one.threat_events.indicators.types%20%3E%20(model)%20type_list_response%20%3E%20(schema)%20%3E%20(property)%20type>)

### Lists indicator types across multiple datasets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/indicator-types \
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