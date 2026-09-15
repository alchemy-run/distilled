---
title: Datasets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Datasets

##### [Lists all datasets in an account](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/dataset

##### [Reads a dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}

##### [Creates a dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/dataset/create

##### [Updates an existing dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}

##### [Delete a dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}

##### [Reads raw data for an event by UUID](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/raw)

GET/accounts/{account\_id}/cloudforce-one/events/raw/{dataset\_id}/{event\_id}

##### ModelsExpand Collapse

<details>

<summary>

DatasetListResponse = array of object {indicatorWriteMode, isAnalytics, isPublic, 3 more }

</summary>

<details>

<summary>

indicatorWriteMode: "read\_only"or "create\_only"or "full"

Effective indicator mutation capability after account/dataset authorization and dataset storage capability are applied. API Gateway method permissions are separate and must also allow the requested operation.

</summary>

One of the following:

"read\_only"

<a href="#">Link to this property</a>

"create\_only"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isAnalytics: boolean

<a href="#">Link to this property</a>

isPublic: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

deletedAt: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)>)

<details>

<summary>

DatasetGetResponse object {isAnalytics, isPublic, name, uuid }

</summary>

isAnalytics: boolean

<a href="#">Link to this property</a>

isPublic: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_get_response%20%3E%20(schema)>)

<details>

<summary>

DatasetCreateResponse object {isAnalytics, isPublic, name, uuid }

</summary>

isAnalytics: boolean

<a href="#">Link to this property</a>

isPublic: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_create_response%20%3E%20(schema)>)

<details>

<summary>

DatasetEditResponse object {isAnalytics, isPublic, name, uuid }

</summary>

isAnalytics: boolean

<a href="#">Link to this property</a>

isPublic: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_edit_response%20%3E%20(schema)>)

<details>

<summary>

DatasetDeleteResponse object {name, uuid }

</summary>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_delete_response%20%3E%20(schema)>)

<details>

<summary>

DatasetRawResponse object {id, accountId, created, 3 more }

</summary>

id: number

<a href="#">Link to this property</a>

accountId: number

<a href="#">Link to this property</a>

created: string

<a href="#">Link to this property</a>

data: string

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_raw_response%20%3E%20(schema)>)

#### DatasetsHealth

#### DatasetsEvents

##### [Reads an event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/subresources/events/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/events/{event\_id}

##### ModelsExpand Collapse

<details>

<summary>

EventGetResponse object {attacker, attackerCountry, attackerCountryAlpha3, 26 more }

</summary>

attacker: string

<a href="#">Link to this property</a>

attackerCountry: string

<a href="#">Link to this property</a>

attackerCountryAlpha3: string

<a href="#">Link to this property</a>

category: string

<a href="#">Link to this property</a>

datasetId: string

<a href="#">Link to this property</a>

date: string

<a href="#">Link to this property</a>

event: string

<a href="#">Link to this property</a>

hasChildren: boolean

<a href="#">Link to this property</a>

indicator: string

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

indicatorTypeId: number

<a href="#">Link to this property</a>

killChain: number

<a href="#">Link to this property</a>

mitreAttack: array of string

<a href="#">Link to this property</a>

mitreCapec: array of string

<a href="#">Link to this property</a>

numReferenced: number

<a href="#">Link to this property</a>

numReferences: number

<a href="#">Link to this property</a>

rawId: string

<a href="#">Link to this property</a>

referenced: array of string

<a href="#">Link to this property</a>

referencedIds: array of number

<a href="#">Link to this property</a>

references: array of string

<a href="#">Link to this property</a>

referencesIds: array of number

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

targetCountry: string

<a href="#">Link to this property</a>

targetCountryAlpha3: string

<a href="#">Link to this property</a>

targetIndustry: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

insight: optional string

<a href="#">Link to this property</a>

releasabilityId: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets.events%20%3E%20(model)%20event_get_response%20%3E%20(schema)>)