---
title: Target Industries
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Target Industries

##### [Lists target industries across multiple datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/target_industries/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/targetIndustries

##### ModelsExpand Collapse

<details>

<summary>

TargetIndustryListResponse object {items, type }

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

[Link to this property](#)%20cloudforce_one.threat_events.target_industries%20%3E%20(model)%20target_industry_list_response%20%3E%20(schema)>)

#### Target IndustriesBy Dataset

##### [Lists all target industries for a specific dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/target_industries/subresources/by_dataset/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/targetIndustries

##### ModelsExpand Collapse

<details>

<summary>

ByDatasetListResponse object {items, type }

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

[Link to this property](#)%20cloudforce_one.threat_events.target_industries.by_dataset%20%3E%20(model)%20by_dataset_list_response%20%3E%20(schema)>)

#### Target IndustriesCatalog

##### [Lists all target industries from industry map catalog](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/target_industries/subresources/catalog/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/targetIndustries/catalog

##### ModelsExpand Collapse

<details>

<summary>

CatalogListResponse object {items, type }

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

[Link to this property](#)%20cloudforce_one.threat_events.target_industries.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)>)