---
title: Delete a dataset
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

# Delete a dataset

DELETE/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}

Soft-deletes a dataset given a datasetId.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset\_id: string

Dataset ID to delete

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

name: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_delete_response%20%3E%20(schema)%20%3E%20(property)%20name>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_delete_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

### Delete a dataset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```

##### Returns Examples

200 example

```
{
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```