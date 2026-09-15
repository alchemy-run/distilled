---
title: Schema Validation
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Schema Validation

##### [Retrieve operation-level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/schema_validation/methods/get)

Deprecated

GET/zones/{zone\_id}/api\_gateway/operations/{operation\_id}/schema\_validation

##### [Update operation-level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/schema_validation/methods/update)

Deprecated

PUT/zones/{zone\_id}/api\_gateway/operations/{operation\_id}/schema\_validation

##### [Update multiple operation-level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/schema_validation/methods/edit)

Deprecated

PATCH/zones/{zone\_id}/api\_gateway/operations/schema\_validation

##### ModelsExpand Collapse

<details>

<summary>

SettingsMultipleRequest = map\[object {mitigation\_action } ]

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

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

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(model)%20settings_multiple_request%20%3E%20(schema)>)

<details>

<summary>

SchemaValidationGetResponse object {mitigation\_action, operation\_id }

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

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

operation\_id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(model)%20schema_validation_get_response%20%3E%20(schema)>)

<details>

<summary>

SchemaValidationUpdateResponse object {mitigation\_action, operation\_id }

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

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

operation\_id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(model)%20schema_validation_update_response%20%3E%20(schema)>)