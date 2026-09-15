---
title: Deployments
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

[Projects](https://developers.cloudflare.com/api/resources/pages/subresources/projects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Deployments

##### [Get deployments](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/list)

GET/accounts/{account\_id}/pages/projects/{project\_name}/deployments

##### [Get deployment info](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/get)

GET/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}

##### [Create deployment](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/create)

POST/accounts/{account\_id}/pages/projects/{project\_name}/deployments

##### [Delete deployment](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/delete)

DELETE/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}

##### [Retry deployment](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/retry)

POST/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/retry

##### [Rollback deployment](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/rollback)

POST/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/rollback

##### ModelsExpand Collapse

DeploymentDeleteResponse = unknown

[Link to this property](#)%20pages.projects.deployments%20%3E%20(model)%20deployment_delete_response%20%3E%20(schema)>)

#### DeploymentsHistory

#### DeploymentsHistoryLogs

##### [Get deployment logs](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/subresources/history/subresources/logs/methods/get)

GET/accounts/{account\_id}/pages/projects/{project\_name}/deployments/{deployment\_id}/history/logs

##### ModelsExpand Collapse

<details>

<summary>

LogGetResponse object {data, includes\_container\_logs, total }

</summary>

<details>

<summary>

data: array of object {line, ts }

</summary>

line: string

<a href="#">Link to this property</a>

ts: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

includes\_container\_logs: boolean

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.deployments.history.logs%20%3E%20(model)%20log_get_response%20%3E%20(schema)>)

#### DeploymentsTails

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