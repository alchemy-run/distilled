---
title: Filter and list events related to specific event
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Relationships](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/relationships)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Filter and list events related to specific event

GET/accounts/{account\_id}/cloudforce-one/events/{event\_id}/relationships

The `event_id` must be defined (to list existing events (and their IDs), use the [`Filter and List Events`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/methods/list/) endpoint). Also, must provide query parameters.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

event\_id: string

Event UUID.

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20event_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

datasetId: string

The dataset ID to search within.

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetId%20%3E%20(schema)>)

<details>

<summary>

direction: optional "ancestors"or "descendants"or "both"

The direction to traverse the graph. Defaults to ‘both’ to search all.

</summary>

One of the following:

"ancestors"

<a href="#">Link to this property</a>

"descendants"

<a href="#">Link to this property</a>

"both"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

includeParent: optional boolean

Whether to include the starting event in the results. Defaults to true.

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20includeParent%20%3E%20(schema)>)

indicatorTypeIds: optional array of string

An optional array of indicator type IDs to filter the results by.

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20indicatorTypeIds%20%3E%20(schema)>)

maxDepth: optional number

The maximum depth to traverse. Defaults to 5.

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20maxDepth%20%3E%20(schema)>)

page: optional number

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

pageSize: optional number

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pageSize%20%3E%20(schema)>)

<details>

<summary>

relationshipTypes: optional stringor array of string

An optional array of relationship types to filter by.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20relationshipTypes%20%3E%20(schema)>)

##### ReturnsExpand Collapse

attacker: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20attacker>)

attackerCountry: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20attackerCountry>)

attackerCountryAlpha3: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20attackerCountryAlpha3>)

category: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20category>)

datasetId: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20datasetId>)

date: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20date>)

event: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20event>)

hasChildren: boolean

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20hasChildren>)

indicator: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20indicator>)

indicatorType: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20indicatorType>)

indicatorTypeId: number

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20indicatorTypeId>)

killChain: number

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20killChain>)

mitreAttack: array of string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20mitreAttack>)

mitreCapec: array of string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20mitreCapec>)

numReferenced: number

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20numReferenced>)

numReferences: number

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20numReferences>)

rawId: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20rawId>)

referenced: array of string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20referenced>)

referencedIds: array of number

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20referencedIds>)

references: array of string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20references>)

referencesIds: array of number

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20referencesIds>)

tags: array of string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20tags>)

targetCountry: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20targetCountry>)

targetCountryAlpha3: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20targetCountryAlpha3>)

targetIndustry: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20targetIndustry>)

tlp: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20tlp>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20uuid>)

insight: optional string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20insight>)

releasabilityId: optional string

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20releasabilityId>)

### Filter and list events related to specific event

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID/relationships \
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