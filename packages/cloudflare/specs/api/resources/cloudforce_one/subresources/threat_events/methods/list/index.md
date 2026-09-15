---
title: Filter and list events
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Filter and list events

GET/accounts/{account\_id}/cloudforce-one/events

Use `datasetId=all` or `datasetId=*` for the legacy all-datasets scope, `datasetId=analytics` for datasets with `isAnalytics=true`, or `datasetId=operational` for datasets with `isAnalytics=false` (limited to 50). Scope values must be used alone. When `datasetId` is unspecified, events are listed from the default Cloudforce One Threat Events dataset. To list existing datasets, use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cache: optional "from-graph"

Cache strategy. ‘from-graph’ serves results from the graph-node KV cache when all requested UUIDs are cached; falls back to normal path on partial/zero hit.

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cache%20%3E%20(schema)>)

cursor: optional string

Cursor for pagination. When provided, filters are embedded in the cursor so you only need to pass cursor and pageSize. Returned in the previous response’s result\_info.cursor field. Use cursor-based pagination for deep pagination (beyond 100,000 records) or for optimal performance.

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

datasetId: optional array of string

Dataset UUIDs to query, or one standalone scope value: ‘all’/’\*’ for the legacy all-datasets behavior, ‘analytics’ for isAnalytics=true datasets, or ‘operational’ for isAnalytics=false datasets. If not provided, uses the default dataset.

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetId%20%3E%20(schema)>)

forceRefresh: optional boolean

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20forceRefresh%20%3E%20(schema)>)

<details>

<summary>

format: optional "json"or "stix2"or "taxii"

</summary>

One of the following:

"json"

<a href="#">Link to this property</a>

"stix2"

<a href="#">Link to this property</a>

"taxii"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

<details>

<summary>

order: optional "asc"or "desc"

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

orderBy: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20orderBy%20%3E%20(schema)>)

page: optional number

Page number (1-indexed) for offset-based pagination. Limited to offset of 100,000 records. For deep pagination, use cursor-based pagination instead.

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

pageSize: optional number

Number of results per page. Maximum 25,000.

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pageSize%20%3E%20(schema)>)

<details>

<summary>

search: optional array of object {field, op, value } or object {field, op, value } or object {field, op, value } or 3 more

</summary>

One of the following:

<details>

<summary>

object {field, op, value }

</summary>

<details>

<summary>

field: "attacker"or "attackerCountry"or "category"or 12 more

</summary>

One of the following:

"attacker"

<a href="#">Link to this property</a>

"attackerCountry"

<a href="#">Link to this property</a>

"category"

<a href="#">Link to this property</a>

"createdAt"

<a href="#">Link to this property</a>

"date"

<a href="#">Link to this property</a>

"event"

<a href="#">Link to this property</a>

"indicator"

<a href="#">Link to this property</a>

"indicatorType"

<a href="#">Link to this property</a>

"mitreAttack"

<a href="#">Link to this property</a>

"mitreCapec"

<a href="#">Link to this property</a>

"tags"

<a href="#">Link to this property</a>

"targetCountry"

<a href="#">Link to this property</a>

"targetIndustry"

<a href="#">Link to this property</a>

"tlp"

<a href="#">Link to this property</a>

"uuid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

op: "equals"or "not"or "gt"or 8 more

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

"find"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

maxLength512

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {field, op, value }

</summary>

<details>

<summary>

field: "attacker"or "attackerCountry"or "category"or 12 more

</summary>

One of the following:

"attacker"

<a href="#">Link to this property</a>

"attackerCountry"

<a href="#">Link to this property</a>

"category"

<a href="#">Link to this property</a>

"createdAt"

<a href="#">Link to this property</a>

"date"

<a href="#">Link to this property</a>

"event"

<a href="#">Link to this property</a>

"indicator"

<a href="#">Link to this property</a>

"indicatorType"

<a href="#">Link to this property</a>

"mitreAttack"

<a href="#">Link to this property</a>

"mitreCapec"

<a href="#">Link to this property</a>

"tags"

<a href="#">Link to this property</a>

"targetCountry"

<a href="#">Link to this property</a>

"targetIndustry"

<a href="#">Link to this property</a>

"tlp"

<a href="#">Link to this property</a>

"uuid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

op: "in"

<a href="#">Link to this property</a>

value: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {field, op, value }

</summary>

field: "killChain"

<a href="#">Link to this property</a>

<details>

<summary>

op: "equals"or "not"or "gt"or 3 more

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: numberor string

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {field, op, value }

</summary>

field: "killChain"

<a href="#">Link to this property</a>

op: "in"

<a href="#">Link to this property</a>

<details>

<summary>

value: array of numberor string

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {field, op, value }

</summary>

field: "hasChildren"

<a href="#">Link to this property</a>

<details>

<summary>

op: "equals"or "not"or "gt"or 3 more

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: unknownor boolean

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {field, op, value }

</summary>

field: "hasChildren"

<a href="#">Link to this property</a>

op: "in"

<a href="#">Link to this property</a>

<details>

<summary>

value: array of unknownor boolean

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

attacker: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20attacker>)

attackerCountry: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20attackerCountry>)

attackerCountryAlpha3: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20attackerCountryAlpha3>)

category: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20category>)

datasetId: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20datasetId>)

date: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20date>)

event: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20event>)

hasChildren: boolean

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20hasChildren>)

indicator: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20indicator>)

indicatorType: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20indicatorType>)

indicatorTypeId: number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20indicatorTypeId>)

killChain: number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20killChain>)

mitreAttack: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20mitreAttack>)

mitreCapec: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20mitreCapec>)

numReferenced: number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20numReferenced>)

numReferences: number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20numReferences>)

rawId: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20rawId>)

referenced: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20referenced>)

referencedIds: array of number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20referencedIds>)

references: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20references>)

referencesIds: array of number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20referencesIds>)

tags: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20tags>)

targetCountry: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20targetCountry>)

targetCountryAlpha3: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20targetCountryAlpha3>)

targetIndustry: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20targetIndustry>)

tlp: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20tlp>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20uuid>)

insight: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20insight>)

releasabilityId: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20releasabilityId>)

### Filter and list events

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
  {
    "attacker": "Flying Yeti",
    "attackerCountry": "CN",
    "attackerCountryAlpha3": "CHN",
    "category": "Domain Resolution",
    "datasetId": "dataset-example-id",
    "date": "2022-04-01T00:00:00Z",
    "event": "An attacker registered the domain domain.com",
    "hasChildren": true,
    "indicator": "domain.com",
    "indicatorType": "domain",
    "indicatorTypeId": 5,
    "killChain": 0,
    "mitreAttack": [
      " "
    ],
    "mitreCapec": [
      " "
    ],
    "numReferenced": 0,
    "numReferences": 0,
    "rawId": "453gw34w3",
    "referenced": [
      " "
    ],
    "referencedIds": [
      0
    ],
    "references": [
      " "
    ],
    "referencesIds": [
      0
    ],
    "tags": [
      "malware"
    ],
    "targetCountry": "US",
    "targetCountryAlpha3": "USA",
    "targetIndustry": "Agriculture",
    "tlp": "amber",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "insight": "insight",
    "releasabilityId": "releasabilityId"
  }
]
```

##### Returns Examples

200 example

```
[
  {
    "attacker": "Flying Yeti",
    "attackerCountry": "CN",
    "attackerCountryAlpha3": "CHN",
    "category": "Domain Resolution",
    "datasetId": "dataset-example-id",
    "date": "2022-04-01T00:00:00Z",
    "event": "An attacker registered the domain domain.com",
    "hasChildren": true,
    "indicator": "domain.com",
    "indicatorType": "domain",
    "indicatorTypeId": 5,
    "killChain": 0,
    "mitreAttack": [
      " "
    ],
    "mitreCapec": [
      " "
    ],
    "numReferenced": 0,
    "numReferences": 0,
    "rawId": "453gw34w3",
    "referenced": [
      " "
    ],
    "referencedIds": [
      0
    ],
    "references": [
      " "
    ],
    "referencesIds": [
      0
    ],
    "tags": [
      "malware"
    ],
    "targetCountry": "US",
    "targetCountryAlpha3": "USA",
    "targetIndustry": "Agriculture",
    "tlp": "amber",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "insight": "insight",
    "releasabilityId": "releasabilityId"
  }
]
```