---
title: Field Extractors
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Field Extractors

##### [Get Field Extractor](https://developers.cloudflare.com/api/resources/field_extractors/methods/get)

GET/accounts/{account\_id}/field\_extractors/{extractor}

##### [Update Field Extractor](https://developers.cloudflare.com/api/resources/field_extractors/methods/update)

PUT/accounts/{account\_id}/field\_extractors/{extractor}

##### [Delete Field Extractor](https://developers.cloudflare.com/api/resources/field_extractors/methods/delete)

DELETE/accounts/{account\_id}/field\_extractors/{extractor}

##### ModelsExpand Collapse

<details>

<summary>

FieldExtractorGetResponse object {extractor, rules }

</summary>

extractor: string

Extractor type.

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {fields, ref, description }

</summary>

<details>

<summary>

fields: array of object {expression, name }

</summary>

expression: string

Wirefilter value expression.

<a href="#">Link to this property</a>

name: string

Field name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ref: string

Stable rule identifier.

<a href="#">Link to this property</a>

description: optional string

Human-readable rule description.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20field_extractors%20%3E%20(model)%20field_extractor_get_response%20%3E%20(schema)>)

<details>

<summary>

FieldExtractorUpdateResponse object {extractor, rules }

</summary>

extractor: string

Extractor type.

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {fields, ref, description }

</summary>

<details>

<summary>

fields: array of object {expression, name }

</summary>

expression: string

Wirefilter value expression.

<a href="#">Link to this property</a>

name: string

Field name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ref: string

Stable rule identifier.

<a href="#">Link to this property</a>

description: optional string

Human-readable rule description.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20field_extractors%20%3E%20(model)%20field_extractor_update_response%20%3E%20(schema)>)

FieldExtractorDeleteResponse = unknown

Result is null.

[Link to this property](#)%20field_extractors%20%3E%20(model)%20field_extractor_delete_response%20%3E%20(schema)>)