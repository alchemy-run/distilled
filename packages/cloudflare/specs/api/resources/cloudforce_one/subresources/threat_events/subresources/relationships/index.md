---
title: Relationships
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Relationships

##### [Filter and list events related to specific event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/relationships/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/{event\_id}/relationships

##### ModelsExpand Collapse

<details>

<summary>

RelationshipListResponse = array of object {attacker, attackerCountry, attackerCountryAlpha3, 26 more }

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

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)>)