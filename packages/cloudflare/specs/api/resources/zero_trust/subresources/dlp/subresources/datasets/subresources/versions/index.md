---
title: Versions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Datasets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/datasets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Versions

##### [Sets the column information for a multi-column upload](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/datasets/subresources/versions/methods/create)

POST/accounts/{account\_id}/dlp/datasets/{dataset\_id}/versions/{version}

##### ModelsExpand Collapse

<details>

<summary>

VersionCreateResponse object {entry\_id, header\_name, num\_cells, upload\_status }

</summary>

entry\_id: string

formatuuid

<a href="#">Link to this property</a>

header\_name: string

<a href="#">Link to this property</a>

num\_cells: number

formatint64

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(model)%20version_create_response%20%3E%20(schema)>)

#### VersionsEntries

##### [Upload a new version of a multi-column dataset](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/datasets/subresources/versions/subresources/entries/methods/create)

POST/accounts/{account\_id}/dlp/datasets/{dataset\_id}/versions/{version}/entries/{entry\_id}

##### ModelsExpand Collapse

<details>

<summary>

EntryCreateResponse object {entry\_id, header\_name, num\_cells, upload\_status }

</summary>

entry\_id: string

formatuuid

<a href="#">Link to this property</a>

header\_name: string

<a href="#">Link to this property</a>

num\_cells: number

formatint64

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.datasets.versions.entries%20%3E%20(model)%20entry_create_response%20%3E%20(schema)>)