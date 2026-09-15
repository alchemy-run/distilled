---
title: Captions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Captions

##### [List captions or subtitles](https://developers.cloudflare.com/api/resources/stream/subresources/captions/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/captions

##### ModelsExpand Collapse

<details>

<summary>

Caption object {generated, label, language, status }

</summary>

generated: optional boolean

Whether the caption was generated via AI.

<a href="#">Link to this property</a>

label: optional string

The language label displayed in the native language to users.

<a href="#">Link to this property</a>

language: optional string

The language tag in BCP 47 format.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "ready"or "inprogress"or "error"

The status of a generated caption.

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

</details>

[Link to this property](#)%20stream.captions%20%3E%20(model)%20caption%20%3E%20(schema)>)

#### CaptionsLanguage

##### [List captions or subtitles for a provided language](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/captions/{language}

##### [Generate captions or subtitles for a provided language via AI](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/methods/create)

POST/accounts/{account\_id}/stream/{identifier}/captions/{language}/generate

##### [Upload captions or subtitles](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/methods/update)

PUT/accounts/{account\_id}/stream/{identifier}/captions/{language}

##### [Delete captions or subtitles](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/methods/delete)

DELETE/accounts/{account\_id}/stream/{identifier}/captions/{language}

##### ModelsExpand Collapse

LanguageDeleteResponse = string

[Link to this property](#)%20stream.captions.language%20%3E%20(model)%20language_delete_response%20%3E%20(schema)>)

#### CaptionsLanguageVtt

##### [Return WebVTT captions for a provided language](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/subresources/vtt/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/captions/{language}/vtt

##### ModelsExpand Collapse

VttGetResponse = string

[Link to this property](#)%20stream.captions.language.vtt%20%3E%20(model)%20vtt_get_response%20%3E%20(schema)>)