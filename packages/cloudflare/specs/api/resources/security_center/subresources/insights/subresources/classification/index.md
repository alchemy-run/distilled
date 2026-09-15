---
title: Classification
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Security Center](https://developers.cloudflare.com/api/resources/security_center)

[Insights](https://developers.cloudflare.com/api/resources/security_center/subresources/insights)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Classification

##### [Updates Security Center Insight Classification](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/classification/methods/update)

PATCH/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/{issue\_id}/classification

##### ModelsExpand Collapse

<details>

<summary>

ClassificationUpdateResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.classification%20%3E%20(model)%20classification_update_response%20%3E%20(schema)>)