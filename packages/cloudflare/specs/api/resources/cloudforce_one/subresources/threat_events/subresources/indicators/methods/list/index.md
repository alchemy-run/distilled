---
title: Lists indicators across multiple datasets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lists indicators across multiple datasets

GET/accounts/{account\_id}/cloudforce-one/events/indicators

Retrieves indicators across specified datasets, ordered by createdAt descending then UUID, dataset ID, and shard ID ascending. Use the standalone datasetIds value ‘all’/’\*’ for legacy all-datasets behavior, ‘analytics’ for isAnalytics=true datasets, or ‘operational’ for isAnalytics=false datasets. If no datasetIds are provided, uses the default dataset.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cache: optional "from-graph"

Cache strategy. ‘from-graph’ serves results from the graph-node KV cache when all requested UUIDs are cached; falls back to normal path on partial/zero hit. Cannot be combined with `cursor`.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cache%20%3E%20(schema)>)

createdAfter: optional string

Filter indicators created on or after this date. Must use ISO 8601 format (e.g., ‘2024-01-15T00:00:00Z’).

formatdate-time

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20createdAfter%20%3E%20(schema)>)

createdBefore: optional string

Filter indicators created on or before this date. Must use ISO 8601 format (e.g., ‘2024-12-31T23:59:59Z’).

formatdate-time

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20createdBefore%20%3E%20(schema)>)

cursor: optional string

Opaque cursor from a previous response’s `pagination.cursor`. When provided, all filters, datasetIds, page, `pageSize`, `includeTags` and `relatedEventsLimit` come from the cursor — do not resend them. Sending any filter, `page`, `pageSize`, `includeTags`, `relatedEventsLimit`, `includeTotalCount=true`, or `cache=from-graph` alongside a cursor yields a 400 `CursorFilterConflictError`. A cursor issued for a different entity, an unsupported version, or a dataset that has since been reconfigured as analytics-only yields a 400 `InvalidCursorError`.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

datasetIds: optional array of string

Dataset UUIDs to query, or one standalone scope value: ‘all’/’\*’ for legacy all-datasets behavior, ‘analytics’ for isAnalytics=true datasets, or ‘operational’ for isAnalytics=false datasets. If not provided, uses the default dataset.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetIds%20%3E%20(schema)>)

<details>

<summary>

format: optional "json"or "stix2"or "taxii"

Output format for indicator data. ‘json’ returns the default format, ‘stix2’ returns STIX 2.1 Indicator SDOs, ‘taxii’ returns a TAXII 2.1 Envelope with Content-Type application/taxii+json;version=2.1.

</summary>

One of the following:

"json"

<a href="#">Link to this property</a>

"stix2"

<a href="#">Link to this property</a>

"taxii"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

includeTags: optional boolean

Whether to include full tag details for each indicator. Defaults to true.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20includeTags%20%3E%20(schema)>)

includeTotalCount: optional boolean

Whether to compute total count via COUNT(\*). Defaults to false for performance. total\_count is null unless this is true and the complete fan-out succeeds.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20includeTotalCount%20%3E%20(schema)>)

indicatorType: optional string

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20indicatorType%20%3E%20(schema)>)

name: optional string

Filter indicators by value using substring match (LIKE). Legacy alternative to structured search.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

page: optional number

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

pageSize: optional number

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pageSize%20%3E%20(schema)>)

relatedEvents: optional array of string

Filter by related event IDs

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20relatedEvents%20%3E%20(schema)>)

relatedEventsLimit: optional number

Limit the number of related events returned per indicator. Default: 2. Set to 0 for none, -1 for all events.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20relatedEventsLimit%20%3E%20(schema)>)

<details>

<summary>

search: optional array of object {field, op, value }

Structured search as a JSON array of {field, op, value} objects. Searchable fields: value, indicatorType, uuid. Supports operators: equals, not, contains, startsWith, endsWith, gt, lt, gte, lte, like, in, find. Use the ‘in’ operator with an array value to bulk-check up to 100 indicators in a single request, e.g. search=\[{“field”:“value”,“op”:“in”,“value”:\[“evil.com”,“bad.org”]}]. Multiple conditions are AND’d together. Max 10 conditions per request.

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

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

tags: optional array of string

Filter by tag values or UUIDs. Indicators must have at least one of the specified tags (OR logic). Supports both tag UUID and tag value.

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tags%20%3E%20(schema)>)

<details>

<summary>

tagSearch: optional array of object {field, op, value }

Structured tag-metadata filter as a JSON array of {field, op, value} objects. Operates against the per-dataset IndicatorTag mirror so you can find indicators by tag attributes (origin country, motive, sophistication, priority, etc.) without a separate Tags lookup. Common dashboard usage: drill from a country into indicators, e.g. tagSearch=\[{“field”:“originCountryISO”,“op”:“in”,“value”:\[“IR”,“CN”]}]. Country values may be passed as alpha-2, alpha-3, name, or alias (e.g. “iran”). Operators: equals, not, gt/gte/lt/lte (numeric only), contains/like/find/startsWith/endsWith (string only), in. AND-joined across entries; combined with <code>tags</code>, a matching tag must satisfy both. Max 10 entries per request, max 100 values per ‘in’. Performance notes: <code>originCountryISO</code> uses its B-tree index for equals/not/in. <code>priority</code> uses its B-tree index for numeric comparisons. Other string columns (<code>actorCategory</code>, <code>motive</code>, etc.) are case-insensitive and unindexed; current catalog size makes this a non-issue. <code>endsWith</code> and <code>aliasGroupNames</code> contains/like are leading-wildcard scans and slow on large result sets. <code>aliasGroupNames</code> matches on the JSON-encoded text, so substrings can cross alias boundaries (“apt28” also matches “apt280” when both appear in the same tag’s alias list).

</summary>

<details>

<summary>

field: "value"or "categoryId"or "actorCategory"or 9 more

Tag mirror field to filter on. Allowed: value, categoryId, actorCategory, aliasGroupNames, attributionConfidence, attributionOrganization, motive, opsecLevel, originCountryISO, sophisticationLevel, priority, analyticPriority. Filters operate against the per-dataset IndicatorTag mirror (which is kept in sync with the Tags SoT by the tag-propagation workflow).

</summary>

One of the following:

"value"

<a href="#">Link to this property</a>

"categoryId"

<a href="#">Link to this property</a>

"actorCategory"

<a href="#">Link to this property</a>

"aliasGroupNames"

<a href="#">Link to this property</a>

"attributionConfidence"

<a href="#">Link to this property</a>

"attributionOrganization"

<a href="#">Link to this property</a>

"motive"

<a href="#">Link to this property</a>

"opsecLevel"

<a href="#">Link to this property</a>

"originCountryISO"

<a href="#">Link to this property</a>

"sophisticationLevel"

<a href="#">Link to this property</a>

"priority"

<a href="#">Link to this property</a>

"analyticPriority"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

op: "equals"or "not"or "gt"or 9 more

Search operator. Use ‘in’ for bulk OR within a single field, e.g. {field:“originCountryISO”, op:“in”, value:\[“IR”,“CN”]}.

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

value: optional stringor numberor array of stringor number

Search value. String or number for most operators. Array for ‘in’ (max 100 items). Country values may be passed as alpha-2, alpha-3, name, or common alias (e.g. “iran”, “IR”, “IRN”) and are normalized to alpha-2 server-side.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

<details>

<summary>

array of stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tagSearch%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

properties: object {completeness, indicators, pagination }

</summary>

<details>

<summary>

completeness: object {properties, type }

</summary>

<details>

<summary>

properties: object {complete, failedDatasets, failedShards, warnings }

</summary>

<details>

<summary>

complete: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

failedDatasets: object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

failedShards: object {items, type }

</summary>

<details>

<summary>

items: object {properties, type }

</summary>

<details>

<summary>

properties: object {datasetId, shardId }

</summary>

<details>

<summary>

datasetId: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

shardId: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

warnings: object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

indicators: object {items, type }

</summary>

<details>

<summary>

items: object {createdAt, indicatorType, sources, 7 more }

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

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pagination: object {properties, type }

</summary>

<details>

<summary>

properties: object {count, cursor, has\_more, 4 more }

</summary>

<details>

<summary>

count: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cursor: object {description, nullable, type }

</summary>

description: string

<a href="#">Link to this property</a>

nullable: boolean

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

has\_more: object {description, type }

</summary>

description: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

page: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

per\_page: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

total\_count: object {description, nullable, type }

</summary>

description: string

<a href="#">Link to this property</a>

nullable: boolean

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

total\_count\_is\_exact: object {description, type }

</summary>

description: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(model)%20indicator_list_response%20%3E%20(schema)%20%3E%20(property)%20properties>)

type: string

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(model)%20indicator_list_response%20%3E%20(schema)%20%3E%20(property)%20type>)

### Lists indicators across multiple datasets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/indicators \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "properties": {
    "completeness": {
      "properties": {
        "complete": {
          "type": "boolean"
        },
        "failedDatasets": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "failedShards": {
          "items": {
            "properties": {
              "datasetId": {
                "type": "string"
              },
              "shardId": {
                "type": "string"
              }
            },
            "type": "object"
          },
          "type": "array"
        },
        "warnings": {
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "type": "object"
    },
    "indicators": {
      "items": {
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
      },
      "type": "array"
    },
    "pagination": {
      "properties": {
        "count": {
          "type": "number"
        },
        "cursor": {
          "description": "Opaque cursor for the next page. Pass back as the `cursor` query param on the next request. `null` when the sequence has ended, when the encoded cursor would exceed the safe URL length, or when this endpoint served the request from a backend that does not support cursor pagination (analytics R2 path).",
          "nullable": true,
          "type": "string"
        },
        "has_more": {
          "description": "True when more pages exist after this one. Present on both offset and cursor paths.",
          "type": "boolean"
        },
        "page": {
          "type": "number"
        },
        "per_page": {
          "type": "number"
        },
        "total_count": {
          "description": "Exact matching count when requested and fan-out is complete; otherwise null.",
          "nullable": true,
          "type": "number"
        },
        "total_count_is_exact": {
          "description": "Whether total_count is exact across the complete query fan-out.",
          "type": "boolean"
        }
      },
      "type": "object"
    }
  },
  "type": "object"
}
```

##### Returns Examples

200 example

```
{
  "properties": {
    "completeness": {
      "properties": {
        "complete": {
          "type": "boolean"
        },
        "failedDatasets": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "failedShards": {
          "items": {
            "properties": {
              "datasetId": {
                "type": "string"
              },
              "shardId": {
                "type": "string"
              }
            },
            "type": "object"
          },
          "type": "array"
        },
        "warnings": {
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "type": "object"
    },
    "indicators": {
      "items": {
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
      },
      "type": "array"
    },
    "pagination": {
      "properties": {
        "count": {
          "type": "number"
        },
        "cursor": {
          "description": "Opaque cursor for the next page. Pass back as the `cursor` query param on the next request. `null` when the sequence has ended, when the encoded cursor would exceed the safe URL length, or when this endpoint served the request from a backend that does not support cursor pagination (analytics R2 path).",
          "nullable": true,
          "type": "string"
        },
        "has_more": {
          "description": "True when more pages exist after this one. Present on both offset and cursor paths.",
          "type": "boolean"
        },
        "page": {
          "type": "number"
        },
        "per_page": {
          "type": "number"
        },
        "total_count": {
          "description": "Exact matching count when requested and fan-out is complete; otherwise null.",
          "nullable": true,
          "type": "number"
        },
        "total_count_is_exact": {
          "description": "Whether total_count is exact across the complete query fan-out.",
          "type": "boolean"
        }
      },
      "type": "object"
    }
  },
  "type": "object"
}
```