---
title: Language
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Captions](https://developers.cloudflare.com/api/resources/stream/subresources/captions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Language

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

#### LanguageVtt

##### [Return WebVTT captions for a provided language](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/subresources/vtt/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/captions/{language}/vtt

##### ModelsExpand Collapse

VttGetResponse = string

[Link to this property](#)%20stream.captions.language.vtt%20%3E%20(model)%20vtt_get_response%20%3E%20(schema)>)