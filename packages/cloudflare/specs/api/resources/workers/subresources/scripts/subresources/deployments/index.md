---
title: Deployments
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Deployments

##### [List Deployments](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/deployments/methods/list)

GET/accounts/{account\_id}/workers/scripts/{script\_name}/deployments

##### [Create Deployment](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/deployments/methods/create)

POST/accounts/{account\_id}/workers/scripts/{script\_name}/deployments

##### [Get Deployment](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/deployments/methods/get)

GET/accounts/{account\_id}/workers/scripts/{script\_name}/deployments/{deployment\_id}

##### [Delete Deployment](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/deployments/methods/delete)

DELETE/accounts/{account\_id}/workers/scripts/{script\_name}/deployments/{deployment\_id}

##### ModelsExpand Collapse

<details>

<summary>

Deployment object {id, created\_on, source, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

strategy: "percentage"

<a href="#">Link to this property</a>

<details>

<summary>

versions: array of object {percentage, version\_id }

</summary>

percentage: number

maximum100

minimum0.01

<a href="#">Link to this property</a>

version\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {"workers/message", "workers/triggered\_by" }

</summary>

"workers/message": optional string

Human-readable message about the deployment. Truncated to 1000 bytes if longer.

maxLength1000

<a href="#">Link to this property</a>

"workers/triggered\_by": optional string

Operation that triggered the creation of the deployment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

author\_email: optional string

formatemail

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(model)%20deployment%20%3E%20(schema)>)

<details>

<summary>

DeploymentListResponse object {deployments }

</summary>

<details>

<summary>

deployments: array of <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers.scripts.deployments%20%3E%20(model)%20deployment%20%3E%20(schema)">Deployment</a> { id, created\_on, source, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

strategy: "percentage"

<a href="#">Link to this property</a>

<details>

<summary>

versions: array of object {percentage, version\_id }

</summary>

percentage: number

maximum100

minimum0.01

<a href="#">Link to this property</a>

version\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {"workers/message", "workers/triggered\_by" }

</summary>

"workers/message": optional string

Human-readable message about the deployment. Truncated to 1000 bytes if longer.

maxLength1000

<a href="#">Link to this property</a>

"workers/triggered\_by": optional string

Operation that triggered the creation of the deployment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

author\_email: optional string

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(model)%20deployment_list_response%20%3E%20(schema)>)

<details>

<summary>

DeploymentDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20workers.scripts.deployments%20%3E%20(model)%20deployment_delete_response%20%3E%20(schema)>)