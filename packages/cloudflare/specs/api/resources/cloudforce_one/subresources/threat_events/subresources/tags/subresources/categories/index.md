---
title: Categories
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Tags](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Categories

##### [Lists all tag categories (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/tags/categories

##### [Creates a new tag category (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/tags/categories/create

##### [Updates a tag category (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/tags/categories/{category\_uuid}

##### [Deletes a tag category (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/tags/categories/{category\_uuid}

##### ModelsExpand Collapse

<details>

<summary>

CategoryListResponse object {categories }

</summary>

<details>

<summary>

categories: array of object {name, uuid, createdAt, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional array of object {key, kind, allowedValues, 11 more }

Parsed FieldDefinition\[] defining custom fields for this category, or null if none.

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

kind: "string"or "number"or "enum"or 3 more

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"enum"

<a href="#">Link to this property</a>

"date"

<a href="#">Link to this property</a>

"array"

<a href="#">Link to this property</a>

"object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowedValues: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {confidence, tlp }

</summary>

confidence: optional boolean

<a href="#">Link to this property</a>

tlp: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

deprecated: optional boolean

Marks a field as unavailable for new values while retaining its definition for historical values.

<a href="#">Link to this property</a>

deprecatedValues: optional array of string

Enum values unavailable for new writes but retained in allowedValues for historical display.

<a href="#">Link to this property</a>

element: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

enforcement: optional "error"or "warn"or "off"

</summary>

One of the following:

"error"

<a href="#">Link to this property</a>

"warn"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional "date"or "url"or "duration"or "country"

</summary>

One of the following:

"date"

<a href="#">Link to this property</a>

"url"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"country"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

maxLength128

minLength1

<a href="#">Link to this property</a>

maxLength: optional number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

numberConstraint: optional object {integer, max, min }

</summary>

integer: optional boolean

<a href="#">Link to this property</a>

max: optional number

<a href="#">Link to this property</a>

min: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Map of property key to FieldDefinition for object fields. Required when kind is ‘object’. See FieldDefinition (recursive).

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_list_response%20%3E%20(schema)>)

<details>

<summary>

CategoryCreateResponse object {name, uuid, createdAt, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional array of object {key, kind, allowedValues, 11 more }

Parsed FieldDefinition\[] defining custom fields for this category, or null if none.

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

kind: "string"or "number"or "enum"or 3 more

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"enum"

<a href="#">Link to this property</a>

"date"

<a href="#">Link to this property</a>

"array"

<a href="#">Link to this property</a>

"object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowedValues: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {confidence, tlp }

</summary>

confidence: optional boolean

<a href="#">Link to this property</a>

tlp: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

deprecated: optional boolean

Marks a field as unavailable for new values while retaining its definition for historical values.

<a href="#">Link to this property</a>

deprecatedValues: optional array of string

Enum values unavailable for new writes but retained in allowedValues for historical display.

<a href="#">Link to this property</a>

element: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

enforcement: optional "error"or "warn"or "off"

</summary>

One of the following:

"error"

<a href="#">Link to this property</a>

"warn"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional "date"or "url"or "duration"or "country"

</summary>

One of the following:

"date"

<a href="#">Link to this property</a>

"url"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"country"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

maxLength128

minLength1

<a href="#">Link to this property</a>

maxLength: optional number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

numberConstraint: optional object {integer, max, min }

</summary>

integer: optional boolean

<a href="#">Link to this property</a>

max: optional number

<a href="#">Link to this property</a>

min: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Map of property key to FieldDefinition for object fields. Required when kind is ‘object’. See FieldDefinition (recursive).

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)>)

<details>

<summary>

CategoryEditResponse object {name, uuid, createdAt, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional array of object {key, kind, allowedValues, 11 more }

Parsed FieldDefinition\[] defining custom fields for this category, or null if none.

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

kind: "string"or "number"or "enum"or 3 more

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"enum"

<a href="#">Link to this property</a>

"date"

<a href="#">Link to this property</a>

"array"

<a href="#">Link to this property</a>

"object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowedValues: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {confidence, tlp }

</summary>

confidence: optional boolean

<a href="#">Link to this property</a>

tlp: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

deprecated: optional boolean

Marks a field as unavailable for new values while retaining its definition for historical values.

<a href="#">Link to this property</a>

deprecatedValues: optional array of string

Enum values unavailable for new writes but retained in allowedValues for historical display.

<a href="#">Link to this property</a>

element: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

enforcement: optional "error"or "warn"or "off"

</summary>

One of the following:

"error"

<a href="#">Link to this property</a>

"warn"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional "date"or "url"or "duration"or "country"

</summary>

One of the following:

"date"

<a href="#">Link to this property</a>

"url"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"country"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

maxLength128

minLength1

<a href="#">Link to this property</a>

maxLength: optional number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

numberConstraint: optional object {integer, max, min }

</summary>

integer: optional boolean

<a href="#">Link to this property</a>

max: optional number

<a href="#">Link to this property</a>

min: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Map of property key to FieldDefinition for object fields. Required when kind is ‘object’. See FieldDefinition (recursive).

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)>)

<details>

<summary>

CategoryDeleteResponse object {uuid }

</summary>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_delete_response%20%3E%20(schema)>)