---
title: By Dataset
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

# By Dataset

##### [Lists indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset/methods/list)

Deprecated

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators

##### [Reads an indicator](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators/{indicator\_id}

##### ModelsExpand Collapse

<details>

<summary>

ByDatasetListResponse object {indicators, pagination }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_list_response%20%3E%20(schema)>)

<details>

<summary>

ByDatasetGetResponse object {createdAt, indicatorType, updatedAt, 6 more }

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

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)>)

#### By DatasetTags

##### [List mirrored tags for an indicator dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset/subresources/tags/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators/tags

##### ModelsExpand Collapse

TagListResponse = array of unknown

Array of mirror tag rows

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset.tags%20%3E%20(model)%20tag_list_response%20%3E%20(schema)>)