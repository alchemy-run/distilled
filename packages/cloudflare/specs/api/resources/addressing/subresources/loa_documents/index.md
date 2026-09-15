---
title: LOA Documents
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# LOA Documents

##### [Download LOA Document](https://developers.cloudflare.com/api/resources/addressing/subresources/loa_documents/methods/get)

GET/accounts/{account\_id}/addressing/loa\_documents/{loa\_document\_id}/download

##### [Upload LOA Document](https://developers.cloudflare.com/api/resources/addressing/subresources/loa_documents/methods/create)

POST/accounts/{account\_id}/addressing/loa\_documents

##### ModelsExpand Collapse

<details>

<summary>

LOADocumentCreateResponse object {id, account\_id, auto\_generated, 5 more }

</summary>

id: optional string

Identifier for the uploaded LOA document.

maxLength32

<a href="#">Link to this property</a>

account\_id: optional string

Identifier of a Cloudflare account.

maxLength32

<a href="#">Link to this property</a>

auto\_generated: optional boolean

Whether the LOA has been auto-generated for the prefix owner by Cloudflare.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

filename: optional string

Name of LOA document. Max file size 10MB, and supported filetype is pdf.

<a href="#">Link to this property</a>

size\_bytes: optional number

File size of the uploaded LOA document.

<a href="#">Link to this property</a>

verified: optional boolean

Whether the LOA has been verified by Cloudflare staff.

<a href="#">Link to this property</a>

verified\_at: optional string

Timestamp of the moment the LOA was marked as validated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.loa_documents%20%3E%20(model)%20loa_document_create_response%20%3E%20(schema)>)