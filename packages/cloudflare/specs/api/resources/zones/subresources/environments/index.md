---
title: Environments
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Environments

##### [List zone environments](https://developers.cloudflare.com/api/resources/zones/subresources/environments/methods/list)

GET/zones/{zone\_id}/environments

##### [Create zone environments](https://developers.cloudflare.com/api/resources/zones/subresources/environments/methods/create)

POST/zones/{zone\_id}/environments

##### [Upsert zone environments](https://developers.cloudflare.com/api/resources/zones/subresources/environments/methods/update)

PUT/zones/{zone\_id}/environments

##### [Partially update zone environments](https://developers.cloudflare.com/api/resources/zones/subresources/environments/methods/edit)

PATCH/zones/{zone\_id}/environments

##### [Delete zone environment](https://developers.cloudflare.com/api/resources/zones/subresources/environments/methods/delete)

DELETE/zones/{zone\_id}/environments/{environment\_id}

##### [Roll back zone environment](https://developers.cloudflare.com/api/resources/zones/subresources/environments/methods/rollback)

POST/zones/{zone\_id}/environments/{environment\_id}/rollback

##### ModelsExpand Collapse

<details>

<summary>

EnvironmentListResponse object {environments }

</summary>

<details>

<summary>

environments: array of object {expression, locked\_on\_deployment, name, 4 more }

</summary>

expression: string

<a href="#">Link to this property</a>

locked\_on\_deployment: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

position: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)">ListCursor</a> { after, before }

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

http\_application\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.environments%20%3E%20(model)%20environment_list_response%20%3E%20(schema)>)

<details>

<summary>

EnvironmentCreateResponse object {environments }

</summary>

<details>

<summary>

environments: array of object {expression, locked\_on\_deployment, name, 4 more }

</summary>

expression: string

<a href="#">Link to this property</a>

locked\_on\_deployment: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

position: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)">ListCursor</a> { after, before }

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

http\_application\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.environments%20%3E%20(model)%20environment_create_response%20%3E%20(schema)>)

<details>

<summary>

EnvironmentUpdateResponse object {environments }

</summary>

<details>

<summary>

environments: array of object {expression, locked\_on\_deployment, name, 4 more }

</summary>

expression: string

<a href="#">Link to this property</a>

locked\_on\_deployment: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

position: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)">ListCursor</a> { after, before }

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

http\_application\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.environments%20%3E%20(model)%20environment_update_response%20%3E%20(schema)>)

<details>

<summary>

EnvironmentEditResponse object {environments }

</summary>

<details>

<summary>

environments: array of object {expression, locked\_on\_deployment, name, 4 more }

</summary>

expression: string

<a href="#">Link to this property</a>

locked\_on\_deployment: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

position: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)">ListCursor</a> { after, before }

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

http\_application\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.environments%20%3E%20(model)%20environment_edit_response%20%3E%20(schema)>)

<details>

<summary>

EnvironmentDeleteResponse object {environments }

</summary>

<details>

<summary>

environments: array of object {expression, locked\_on\_deployment, name, 4 more }

</summary>

expression: string

<a href="#">Link to this property</a>

locked\_on\_deployment: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

position: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)">ListCursor</a> { after, before }

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

http\_application\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.environments%20%3E%20(model)%20environment_delete_response%20%3E%20(schema)>)

<details>

<summary>

EnvironmentRollbackResponse object {environments }

</summary>

<details>

<summary>

environments: array of object {expression, locked\_on\_deployment, name, 4 more }

</summary>

expression: string

<a href="#">Link to this property</a>

locked\_on\_deployment: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

position: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)">ListCursor</a> { after, before }

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

http\_application\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.environments%20%3E%20(model)%20environment_rollback_response%20%3E%20(schema)>)