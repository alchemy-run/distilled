---
title: Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Schema Validation](https://developers.cloudflare.com/api/resources/schema_validation)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Settings

##### [Get global schema validation settings](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/methods/get)

GET/zones/{zone\_id}/schema\_validation/settings

##### [Update global schema validation settings](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/methods/update)

PUT/zones/{zone\_id}/schema\_validation/settings

##### [Edit global schema validation settings](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/methods/edit)

PATCH/zones/{zone\_id}/schema\_validation/settings

##### ModelsExpand Collapse

<details>

<summary>

SettingGetResponse object {validation\_default\_mitigation\_action, validation\_override\_mitigation\_action }

</summary>

<details>

<summary>

validation\_default\_mitigation\_action: "none"or "log"or "block"

The default mitigation action used

Mitigation actions are as follows:

- <code>log</code> - log request when request does not conform to schema
- <code>block</code> - deny access to the site when request does not conform to schema
- <code>none</code> - skip running schema validation

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validation\_override\_mitigation\_action: optional "none"

When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

- <code>"none"</code> will skip running schema validation entirely for the request

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings%20%3E%20(model)%20setting_get_response%20%3E%20(schema)>)

<details>

<summary>

SettingUpdateResponse object {validation\_default\_mitigation\_action, validation\_override\_mitigation\_action }

</summary>

<details>

<summary>

validation\_default\_mitigation\_action: "none"or "log"or "block"

The default mitigation action used

Mitigation actions are as follows:

- <code>log</code> - log request when request does not conform to schema
- <code>block</code> - deny access to the site when request does not conform to schema
- <code>none</code> - skip running schema validation

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validation\_override\_mitigation\_action: optional "none"

When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

- <code>"none"</code> will skip running schema validation entirely for the request

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings%20%3E%20(model)%20setting_update_response%20%3E%20(schema)>)

<details>

<summary>

SettingEditResponse object {validation\_default\_mitigation\_action, validation\_override\_mitigation\_action }

</summary>

<details>

<summary>

validation\_default\_mitigation\_action: "none"or "log"or "block"

The default mitigation action used

Mitigation actions are as follows:

- <code>log</code> - log request when request does not conform to schema
- <code>block</code> - deny access to the site when request does not conform to schema
- <code>none</code> - skip running schema validation

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validation\_override\_mitigation\_action: optional "none"

When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

- <code>"none"</code> will skip running schema validation entirely for the request

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings%20%3E%20(model)%20setting_edit_response%20%3E%20(schema)>)

#### SettingsOperations

##### [List per-operation schema validation settings](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/subresources/operations/methods/list)

GET/zones/{zone\_id}/schema\_validation/settings/operations

##### [Get per-operation schema validation setting](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/subresources/operations/methods/get)

GET/zones/{zone\_id}/schema\_validation/settings/operations/{operation\_id}

##### [Update per-operation schema validation setting](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/subresources/operations/methods/update)

PUT/zones/{zone\_id}/schema\_validation/settings/operations/{operation\_id}

##### [Bulk edit per-operation schema validation settings](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/subresources/operations/methods/bulk_edit)

PATCH/zones/{zone\_id}/schema\_validation/settings/operations

##### [Delete per-operation schema validation setting](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/subresources/operations/methods/delete)

DELETE/zones/{zone\_id}/schema\_validation/settings/operations/{operation\_id}

##### ModelsExpand Collapse

<details>

<summary>

OperationListResponse object {mitigation\_action, operation\_id }

</summary>

<details>

<summary>

mitigation\_action: "log"or "block"or "none"

When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

- <code>"log"</code> - log request when request does not conform to schema for this operation
- <code>"block"</code> - deny access to the site when request does not conform to schema for this operation
- <code>"none"</code> - will skip mitigation for this operation

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

operation\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(model)%20operation_list_response%20%3E%20(schema)>)

<details>

<summary>

OperationGetResponse object {mitigation\_action, operation\_id }

</summary>

<details>

<summary>

mitigation\_action: "log"or "block"or "none"

When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

- <code>"log"</code> - log request when request does not conform to schema for this operation
- <code>"block"</code> - deny access to the site when request does not conform to schema for this operation
- <code>"none"</code> - will skip mitigation for this operation

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

operation\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(model)%20operation_get_response%20%3E%20(schema)>)

<details>

<summary>

OperationUpdateResponse object {mitigation\_action, operation\_id }

</summary>

<details>

<summary>

mitigation\_action: "log"or "block"or "none"

When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

- <code>"log"</code> - log request when request does not conform to schema for this operation
- <code>"block"</code> - deny access to the site when request does not conform to schema for this operation
- <code>"none"</code> - will skip mitigation for this operation

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

operation\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(model)%20operation_update_response%20%3E%20(schema)>)

<details>

<summary>

OperationBulkEditResponse = map\[object {mitigation\_action } ]

Operation ID to updated mitigation action mapping

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>"log"</code> - log request when request does not conform to schema for this operation
- <code>"block"</code> - deny access to the site when request does not conform to schema for this operation
- <code>"none"</code> - will skip mitigation for this operation
- <code>null</code> - clears any mitigation action

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(model)%20operation_bulk_edit_response%20%3E%20(schema)>)

<details>

<summary>

OperationDeleteResponse object {operation\_id }

</summary>

operation\_id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(model)%20operation_delete_response%20%3E%20(schema)>)