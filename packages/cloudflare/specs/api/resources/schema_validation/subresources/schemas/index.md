---
title: Schemas
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Schema Validation](https://developers.cloudflare.com/api/resources/schema_validation)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Schemas

##### [List all uploaded schemas](https://developers.cloudflare.com/api/resources/schema_validation/subresources/schemas/methods/list)

GET/zones/{zone\_id}/schema\_validation/schemas

##### [Get details of a schema](https://developers.cloudflare.com/api/resources/schema_validation/subresources/schemas/methods/get)

GET/zones/{zone\_id}/schema\_validation/schemas/{schema\_id}

##### [Upload a schema](https://developers.cloudflare.com/api/resources/schema_validation/subresources/schemas/methods/create)

POST/zones/{zone\_id}/schema\_validation/schemas

##### [Set schema validation state](https://developers.cloudflare.com/api/resources/schema_validation/subresources/schemas/methods/edit)

PATCH/zones/{zone\_id}/schema\_validation/schemas/{schema\_id}

##### [Delete a schema](https://developers.cloudflare.com/api/resources/schema_validation/subresources/schemas/methods/delete)

DELETE/zones/{zone\_id}/schema\_validation/schemas/{schema\_id}

##### ModelsExpand Collapse

<details>

<summary>

PublicSchema object {created\_at, kind, name, 3 more }

A schema used in schema validation

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

kind: "openapi\_v3"

The kind of the schema

<a href="#">Link to this property</a>

name: string

A human-readable name for the schema

<a href="#">Link to this property</a>

schema\_id: string

A unique identifier of this schema

maxLength36

minLength36

formatuuid

<a href="#">Link to this property</a>

source: string

The raw schema, e.g., the OpenAPI schema, either as JSON or YAML

<a href="#">Link to this property</a>

validation\_enabled: optional boolean

An indicator if this schema is enabled

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.schemas%20%3E%20(model)%20public_schema%20%3E%20(schema)>)

SchemaDeleteResponse = unknown

Schema deletion returns no result body.

[Link to this property](#)%20schema_validation.schemas%20%3E%20(model)%20schema_delete_response%20%3E%20(schema)>)