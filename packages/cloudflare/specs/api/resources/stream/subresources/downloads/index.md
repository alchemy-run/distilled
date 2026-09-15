---
title: Downloads
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Downloads

##### [List downloads](https://developers.cloudflare.com/api/resources/stream/subresources/downloads/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/downloads

##### [Create downloads](https://developers.cloudflare.com/api/resources/stream/subresources/downloads/methods/create)

POST/accounts/{account\_id}/stream/{identifier}/downloads

##### [Delete downloads](https://developers.cloudflare.com/api/resources/stream/subresources/downloads/methods/delete)

DELETE/accounts/{account\_id}/stream/{identifier}/downloads

##### ModelsExpand Collapse

<details>

<summary>

DownloadGetResponse object {audio, default }

An object with download type keys. Each key is optional and only present if that download type has been created.

</summary>

<details>

<summary>

audio: optional object {percentComplete, status, url }

The audio-only download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default: optional object {percentComplete, status, url }

The default video download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.downloads%20%3E%20(model)%20download_get_response%20%3E%20(schema)>)

<details>

<summary>

DownloadCreateResponse object {audio, default }

An object with download type keys. Each key is optional and only present if that download type has been created.

</summary>

<details>

<summary>

audio: optional object {percentComplete, status, url }

The audio-only download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default: optional object {percentComplete, status, url }

The default video download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.downloads%20%3E%20(model)%20download_create_response%20%3E%20(schema)>)

DownloadDeleteResponse = string

[Link to this property](#)%20stream.downloads%20%3E%20(model)%20download_delete_response%20%3E%20(schema)>)