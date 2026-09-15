---
title: List indicators related to a tag
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Tags](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags)

[Indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/indicators)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List indicators related to a tag

GET/accounts/{account\_id}/cloudforce-one/events/tags/{tag\_uuid}/indicators

Returns indicators associated with the provided tag UUID, with pagination. By default fans out across every indicator dataset the account can read; pass datasetIds to scope to UUIDs, analytics datasets, or operational datasets. Analytics datasets do not expose tag associations, so the analytics scope returns an empty result.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

tag\_uuid: string

Tag UUID.

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tag_uuid%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

datasetIds: optional array of string

Dataset UUIDs to scope to (repeat the param for multiple), or one standalone scope: ‘all’/’\*’, ‘analytics’ for isAnalytics=true datasets, or ‘operational’ for isAnalytics=false datasets. Analytics datasets do not expose tag associations, so ‘analytics’ returns an empty result. Omit to search all readable datasets.

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetIds%20%3E%20(schema)>)

indicatorType: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20indicatorType%20%3E%20(schema)>)

page: optional number

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

pageSize: optional number

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pageSize%20%3E%20(schema)>)

relatedEvent: optional array of string

Filter indicators by related event UUID(s). Multiple UUIDs can be provided by repeating the parameter.

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20relatedEvent%20%3E%20(schema)>)

<details>

<summary>

search: optional array of object {field, op, value }

Structured search as a JSON array of {field, op, value} objects. Searchable fields: value, indicatorType. Multiple conditions are AND’d together. Max 10 conditions per request.

</summary>

<details>

<summary>

field: "value"or "indicatorType"or "uuid"

The indicator field to search on. Allowed: value, indicatorType, uuid.

</summary>

One of the following:

"value"

<a href="#">Link to this property</a>

"indicatorType"

<a href="#">Link to this property</a>

"uuid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

op: "equals"or "not"or "gt"or 9 more

Search operator. Use ‘in’ for bulk lookup of up to 100 values at once, e.g. {field:‘value’, op:‘in’, value:\[‘evil.com’,‘bad.org’]}.

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

"like"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"startsWith"

<a href="#">Link to this property</a>

"endsWith"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"find"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor array of string

Search value. String for most operators. Array of strings for ‘in’ operator (max 100 items).

</summary>

One of the following:

string

<a href="#">Link to this property</a>

array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

indicators: array of object {createdAt, indicatorType, updatedAt, 6 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

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

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(model)%20indicator_list_response%20%3E%20(schema)%20%3E%20(property)%20indicators>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(model)%20indicator_list_response%20%3E%20(schema)%20%3E%20(property)%20pagination>)

### List indicators related to a tag

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/tags/$TAG_UUID/indicators \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "indicators": [
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