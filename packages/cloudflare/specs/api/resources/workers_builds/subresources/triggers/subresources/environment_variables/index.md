---
title: Environment Variables
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Triggers](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Environment Variables

##### [List build variables](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/subresources/environment_variables/methods/list)

GET/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/environment\_variables

##### [Set build variables](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/subresources/environment_variables/methods/upsert)

PATCH/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/environment\_variables

##### [Delete a build variable](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/subresources/environment_variables/methods/delete)

DELETE/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/environment\_variables/{environment\_variable\_key}

##### ModelsExpand Collapse

<details>

<summary>

EnvironmentVariableListResponse = map\[object {created\_on, is\_secret, value } ]

</summary>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

is\_secret: boolean

Whether to hide the value after it is saved. Secret values remain available to builds but appear as <code>null</code> when you list variables; non-secret values remain visible.

<a href="#">Link to this property</a>

value: optional string

Value is null for secret environment variables

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.triggers.environment_variables%20%3E%20(model)%20environment_variable_list_response%20%3E%20(schema)>)

<details>

<summary>

EnvironmentVariableUpsertResponse = map\[object {created\_on, is\_secret, value } ]

</summary>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

is\_secret: boolean

Whether to hide the value after it is saved. Secret values remain available to builds but appear as <code>null</code> when you list variables; non-secret values remain visible.

<a href="#">Link to this property</a>

value: optional string

Value is null for secret environment variables

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.triggers.environment_variables%20%3E%20(model)%20environment_variable_upsert_response%20%3E%20(schema)>)

EnvironmentVariableDeleteResponse = unknown

[Link to this property](#)%20workers_builds.triggers.environment_variables%20%3E%20(model)%20environment_variable_delete_response%20%3E%20(schema)>)