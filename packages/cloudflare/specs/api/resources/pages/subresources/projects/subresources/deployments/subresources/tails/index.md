---
title: Tails
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

[Projects](https://developers.cloudflare.com/api/resources/pages/subresources/projects)

[Deployments](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tails

##### [Create deployment tail](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/subresources/tails/methods/create)

POST/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/tails

##### [Delete deployment tail](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/subresources/tails/methods/delete)

DELETE/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/tails/{tail\_id}

##### ModelsExpand Collapse

<details>

<summary>

TailCreateResponse object {id, url }

A tail session for streaming logs from a Pages deployment.

</summary>

id: string

Identifier of the tail session.

<a href="#">Link to this property</a>

url: optional string

Optional WebSocket URL to connect to for receiving tail events, when returned by the tail service.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.deployments.tails%20%3E%20(model)%20tail_create_response%20%3E%20(schema)>)

TailDeleteResponse = unknown

[Link to this property](#)%20pages.projects.deployments.tails%20%3E%20(model)%20tail_delete_response%20%3E%20(schema)>)