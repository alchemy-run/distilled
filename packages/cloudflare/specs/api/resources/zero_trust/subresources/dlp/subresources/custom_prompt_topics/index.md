---
title: Custom Prompt Topics
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom Prompt Topics

##### [List custom prompt topics](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/custom_prompt_topics/methods/list)

GET/accounts/{account\_id}/dlp/custom\_prompt\_topics

##### [Get custom prompt topic](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/custom_prompt_topics/methods/get)

GET/accounts/{account\_id}/dlp/custom\_prompt\_topics/{entry\_id}

##### [Create custom prompt topic](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/custom_prompt_topics/methods/create)

POST/accounts/{account\_id}/dlp/custom\_prompt\_topics

##### [Update custom prompt topic](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/custom_prompt_topics/methods/update)

PUT/accounts/{account\_id}/dlp/custom\_prompt\_topics/{entry\_id}

##### [Delete custom prompt topic](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/custom_prompt_topics/methods/delete)

DELETE/accounts/{account\_id}/dlp/custom\_prompt\_topics/{entry\_id}

##### ModelsExpand Collapse

<details>

<summary>

CustomPromptTopic object {id, created\_at, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

topic: string

maxLength50

minLength2

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.custom_prompt_topics%20%3E%20(model)%20custom_prompt_topic%20%3E%20(schema)>)

CustomPromptTopicDeleteResponse = unknown

[Link to this property](#)%20zero_trust.dlp.custom_prompt_topics%20%3E%20(model)%20custom_prompt_topic_delete_response%20%3E%20(schema)>)