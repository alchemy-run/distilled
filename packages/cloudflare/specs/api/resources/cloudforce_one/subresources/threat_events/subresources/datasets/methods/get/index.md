---
title: Reads a dataset
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Reads a dataset

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}

Retrieves details for a specific threat event dataset.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset\_id: string

Dataset ID.

formatuuid

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

isAnalytics: boolean

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20isAnalytics>)

isPublic: boolean

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20isPublic>)

name: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20name>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

### Reads a dataset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "isAnalytics": true,
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```

##### Returns Examples

200 example

```
{
  "isAnalytics": true,
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```