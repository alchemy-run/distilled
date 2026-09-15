---
title: Lists all tag categories (SoT)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Tags](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags)

[Categories](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lists all tag categories (SoT)

GET/accounts/{account\_id}/cloudforce-one/events/tags/categories

Returns all Source-of-Truth tag categories for an account.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

search: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_list_response%20%3E%20(schema)%20%3E%20(property)%20categories>)

### Lists all tag categories (SoT)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/tags/categories \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "categories": [
    {
      "name": "Actor",
      "uuid": "12345678-1234-1234-1234-1234567890ab",
      "createdAt": "createdAt",
      "description": "description",
      "schema": [
        {
          "key": "family",
          "kind": "string",
          "allowedValues": [
            "low",
            "medium",
            "high",
            "critical"
          ],
          "annotations": {
            "confidence": true,
            "tlp": true
          },
          "deprecated": true,
          "deprecatedValues": [
            "string"
          ],
          "element": {},
          "enforcement": "error",
          "format": "date",
          "label": "Attacker Name",
          "maxLength": 1,
          "numberConstraint": {
            "integer": true,
            "max": 0,
            "min": 0
          },
          "properties": {
            "foo": "bar"
          },
          "required": true
        }
      ],
      "updatedAt": "updatedAt"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "categories": [
    {
      "name": "Actor",
      "uuid": "12345678-1234-1234-1234-1234567890ab",
      "createdAt": "createdAt",
      "description": "description",
      "schema": [
        {
          "key": "family",
          "kind": "string",
          "allowedValues": [
            "low",
            "medium",
            "high",
            "critical"
          ],
          "annotations": {
            "confidence": true,
            "tlp": true
          },
          "deprecated": true,
          "deprecatedValues": [
            "string"
          ],
          "element": {},
          "enforcement": "error",
          "format": "date",
          "label": "Attacker Name",
          "maxLength": 1,
          "numberConstraint": {
            "integer": true,
            "max": 0,
            "min": 0
          },
          "properties": {
            "foo": "bar"
          },
          "required": true
        }
      ],
      "updatedAt": "updatedAt"
    }
  ]
}
```