---
title: Reads an indicator
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators)

[By Dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Reads an indicator

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators/{indicator\_id}

Retrieves a specific indicator by its UUID.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset\_id: string

Dataset ID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

indicator\_id: string

Indicator UUID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20indicator_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

createdAt: string

formatdate-time

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20createdAt>)

indicatorType: string

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20indicatorType>)

updatedAt: string

formatdate-time

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20updatedAt>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

value: string

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20value>)

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20datasetId>)

<details>

<summary>

relatedEvents: optional array of object {datasetId, eventId, eventDate }

</summary>

datasetId: string

<a href="#">Link to this property</a>

eventId: string

<a href="#">Link to this property</a>

eventDate: optional string

ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20relatedEvents>)

<details>

<summary>

tags: optional array of object {categoryId, categoryName, uuid, value }

</summary>

categoryId: optional string

The UUID of the tag category, or null when the tag is uncategorized.

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

uuid: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20tags>)

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)%20%3E%20(property)%20tlp>)

### Reads an indicator

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID/indicators/$INDICATOR_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "createdAt": "2022-04-01T00:00:00Z",
  "indicatorType": "domain",
  "updatedAt": "2022-04-01T00:00:00Z",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "value": "malicious-domain.com",
  "datasetId": "dataset-uuid-123",
  "relatedEvents": [
    {
      "datasetId": "dataset-uuid-123",
      "eventId": "event-uuid-456",
      "eventDate": "2024-06-15T00:00:00Z"
    }
  ],
  "tags": [
    {
      "categoryId": "categoryId",
      "categoryName": "categoryName",
      "uuid": "uuid",
      "value": "value"
    }
  ],
  "tlp": "AMBER"
}
```

##### Returns Examples

200 example

```
{
  "createdAt": "2022-04-01T00:00:00Z",
  "indicatorType": "domain",
  "updatedAt": "2022-04-01T00:00:00Z",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "value": "malicious-domain.com",
  "datasetId": "dataset-uuid-123",
  "relatedEvents": [
    {
      "datasetId": "dataset-uuid-123",
      "eventId": "event-uuid-456",
      "eventDate": "2024-06-15T00:00:00Z"
    }
  ],
  "tags": [
    {
      "categoryId": "categoryId",
      "categoryName": "categoryName",
      "uuid": "uuid",
      "value": "value"
    }
  ],
  "tlp": "AMBER"
}
```