---
title: Deployment Groups
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Deployment Groups

##### [List deployment groups](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/deployment_groups/methods/list)

GET/accounts/{account\_id}/devices/deployment-groups

##### [Get deployment group](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/deployment_groups/methods/get)

GET/accounts/{account\_id}/devices/deployment-groups/{group\_id}

##### [Create deployment group](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/deployment_groups/methods/create)

POST/accounts/{account\_id}/devices/deployment-groups

##### [Update deployment group](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/deployment_groups/methods/edit)

PATCH/accounts/{account\_id}/devices/deployment-groups/{group\_id}

##### [Delete deployment group](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/deployment_groups/methods/delete)

DELETE/accounts/{account\_id}/devices/deployment-groups/{group\_id}

##### ModelsExpand Collapse

<details>

<summary>

DeploymentGroup object {id, created\_at, name, 3 more }

</summary>

id: string

The ID of the deployment group.

<a href="#">Link to this property</a>

created\_at: string

The RFC3339Nano timestamp when the deployment group was created.

<a href="#">Link to this property</a>

name: string

A user-friendly name for the deployment group.

maxLength255

minLength1

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339Nano timestamp when the deployment group was last updated.

<a href="#">Link to this property</a>

<details>

<summary>

version\_config: array of object {target\_environment, version }

Contains version configurations for different target environments.

</summary>

target\_environment: string

The target environment for the client version (e.g., windows, macos).

<a href="#">Link to this property</a>

version: string

The specific client version to deploy.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

policy\_ids: optional array of string

Contains a list of policy IDs assigned to this deployment group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(model)%20deployment_group%20%3E%20(schema)>)

<details>

<summary>

DeploymentGroupDeleteResponse object {id }

</summary>

id: optional string

The ID of a deleted deployment group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(model)%20deployment_group_delete_response%20%3E%20(schema)>)