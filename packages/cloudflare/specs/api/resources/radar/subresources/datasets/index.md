---
title: Datasets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Datasets

##### [List datasets](https://developers.cloudflare.com/api/resources/radar/subresources/datasets/methods/list)

GET/radar/datasets

##### [Get dataset CSV stream](https://developers.cloudflare.com/api/resources/radar/subresources/datasets/methods/get)

GET/radar/datasets/{alias}

##### [Get dataset download URL](https://developers.cloudflare.com/api/resources/radar/subresources/datasets/methods/download)

POST/radar/datasets/download

##### ModelsExpand Collapse

<details>

<summary>

DatasetListResponse object {datasets }

</summary>

<details>

<summary>

datasets: array of object {id, description, meta, 3 more }

</summary>

id: number

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

meta: unknown

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)>)

DatasetGetResponse = string

[Link to this property](#)%20radar.datasets%20%3E%20(model)%20dataset_get_response%20%3E%20(schema)>)

<details>

<summary>

DatasetDownloadResponse object {dataset }

</summary>

<details>

<summary>

dataset: object {url }

</summary>

url: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.datasets%20%3E%20(model)%20dataset_download_response%20%3E%20(schema)>)