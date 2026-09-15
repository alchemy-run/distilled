---
title: Reads raw data for an event by UUID
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

# Reads raw data for an event by UUID

GET/accounts/{account\_id}/cloudforce-one/events/raw/{dataset\_id}/{event\_id}

Retrieves the raw data associated with an event. Searches across all shards in the dataset.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20raw%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset\_id: string

Dataset ID.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20raw%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

event\_id: string

Event ID.

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(method)%20raw%20%3E%20(params)%20default%20%3E%20(param)%20event_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: number

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_raw_response%20%3E%20(schema)%20%3E%20(property)%20id>)

accountId: number

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_raw_response%20%3E%20(schema)%20%3E%20(property)%20accountId>)

created: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_raw_response%20%3E%20(schema)%20%3E%20(property)%20created>)

data: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_raw_response%20%3E%20(schema)%20%3E%20(property)%20data>)

source: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_raw_response%20%3E%20(schema)%20%3E%20(property)%20source>)

tlp: string

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_raw_response%20%3E%20(schema)%20%3E%20(property)%20tlp>)

### Reads raw data for an event by UUID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/raw/$DATASET_ID/$EVENT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "id": 1,
  "accountId": 1234,
  "created": "1970-01-01T00:00:00Z",
  "data": "{\"foo\": \"bar\"}",
  "source": "https://example.com",
  "tlp": "amber"
}
```

##### Returns Examples

200 example

```
{
  "id": 1,
  "accountId": 1234,
  "created": "1970-01-01T00:00:00Z",
  "data": "{\"foo\": \"bar\"}",
  "source": "https://example.com",
  "tlp": "amber"
}
```