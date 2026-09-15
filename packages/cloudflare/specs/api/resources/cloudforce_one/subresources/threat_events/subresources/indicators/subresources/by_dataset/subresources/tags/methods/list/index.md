---
title: List mirrored tags for an indicator dataset
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators)

[By Dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset)

[Tags](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset/subresources/tags)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List mirrored tags for an indicator dataset

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators/tags

Returns all mirrored tags from the indicator dataset (DO mirror table). No pagination.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset\_id: string

Dataset ID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

### List mirrored tags for an indicator dataset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID/indicators/tags \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
  {}
]
```

##### Returns Examples

200 example

```
[
  {}
]
```