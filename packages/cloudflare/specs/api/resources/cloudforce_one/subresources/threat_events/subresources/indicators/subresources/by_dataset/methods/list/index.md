---
title: Lists indicators
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

# Lists indicators

Deprecated: Use indicators.list instead (GET /accounts/{account\_id}/cloudforce-one/events/indicators).

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators

This method is deprecated. Please use /events/indicators to retrieve a paginated list of indicators.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset\_id: string

Dataset UUID.

formatuuid

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

indicatorType: optional string

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20indicatorType%20%3E%20(schema)>)

name: optional string

Filter by indicator value (substring match)

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

page: optional number

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

pageSize: optional number

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pageSize%20%3E%20(schema)>)

relatedEvent: optional array of string

Filter indicators by related event UUID(s). Multiple UUIDs can be provided by repeating the parameter.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20relatedEvent%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

indicators: array of object {createdAt, indicatorType, sources, 7 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

<details>

<summary>

sources: array of object {resourceId, resourceType, system }

RSS article sources from which this indicator was extracted.

</summary>

resourceId: string

formatuuid

<a href="#">Link to this property</a>

resourceType: "article"

<a href="#">Link to this property</a>

system: "threat-signals"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: string

formatdate-time

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_list_response%20%3E%20(schema)%20%3E%20(property)%20indicators>)

<details>

<summary>

pagination: object {page, pageSize, totalCount, totalPages }

</summary>

page: number

<a href="#">Link to this property</a>

pageSize: number

<a href="#">Link to this property</a>

totalCount: number

<a href="#">Link to this property</a>

totalPages: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_list_response%20%3E%20(schema)%20%3E%20(property)%20pagination>)

### Lists indicators

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID/indicators \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "indicators": [
    {
      "createdAt": "2022-04-01T00:00:00Z",
      "indicatorType": "domain",
      "sources": [
        {
          "resourceId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "resourceType": "article",
          "system": "threat-signals"
        }
      ],
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
  ],
  "pagination": {
    "page": 0,
    "pageSize": 0,
    "totalCount": 0,
    "totalPages": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "indicators": [
    {
      "createdAt": "2022-04-01T00:00:00Z",
      "indicatorType": "domain",
      "sources": [
        {
          "resourceId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "resourceType": "article",
          "system": "threat-signals"
        }
      ],
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
  ],
  "pagination": {
    "page": 0,
    "pageSize": 0,
    "totalCount": 0,
    "totalPages": 0
  }
}
```