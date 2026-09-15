---
title: Lists all tags (SoT)
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

# Lists all tags (SoT)

GET/accounts/{account\_id}/cloudforce-one/events/tags

Returns all Source-of-Truth tags for an account. Supports legacy free-text `search` on tag value and `categoryUuid` exact match, plus a structured `filters` JSON array for filtering by metadata fields (originCountryISO, actorCategory, motive, priority, etc.). Country values may be passed as alpha-2, alpha-3, name, or common alias.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cache: optional "from-graph"

Cache strategy. ‘from-graph’ serves results from the graph-node KV cache when all requested UUIDs are cached; falls back to normal path on partial/zero hit.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cache%20%3E%20(schema)>)

categoryUuid: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20categoryUuid%20%3E%20(schema)>)

<details>

<summary>

filters: optional array of object {field, op, value }

Structured filters as a JSON array of {field, op, value} objects. Searchable fields: uuid, value, categoryName, description, dateOfDiscovery, tlp, confidence, actorCategory, motive, attributionOrganization, originCountryISO, aliases, externalReferences, opsecLevel, sophisticationLevel, activeDuration, priority, lastSeen, aliasGroupNames. Operators: equals, not, contains, startsWith, endsWith, gt, lt, gte, lte, like, in, find. Use ‘in’ for bulk OR within a single field, e.g. filters=\[{“field”:“originCountryISO”,“op”:“in”,“value”:\[“IR”,“CN”]}]. Multiple entries are AND-joined. Max 10 entries per request, max 100 values per ‘in’. Per-field notes: <code>uuid</code> accepts only ‘equals’ and ‘in’ (other operators throw ValidationError) — matched against the canonical lowercase storage but callers may pass either case (the server lowercases before comparison); index-backed by the column’s UNIQUE constraint and intended for batched UUID → tag resolution. <code>originCountryISO</code> uses its B-tree index for equals/not/in. <code>priority</code> uses its B-tree index for numeric comparisons. Other string columns (<code>actorCategory</code>, <code>motive</code>, etc.) are case-insensitive and unindexed; current catalog size makes this a non-issue. <code>endsWith</code> and <code>aliasGroupNames</code> contains/like are leading-wildcard scans and slow on large result sets. <code>aliasGroupNames</code> matches on the JSON-encoded text, so substrings can cross alias boundaries (a search for “apt28” will also match “apt280” if both appear in the same tag’s alias list).

</summary>

field: string

Tag field to search on. Allowed first-class fields: uuid, value, categoryName, description, dateOfDiscovery, tlp, confidence, actorCategory, motive, attributionOrganization, originCountryISO, aliases, externalReferences, opsecLevel, sophisticationLevel, activeDuration, priority, lastSeen, aliasGroupNames. Also supports properties. to filter on custom field values (matches both raw values and annotated {value,confidence,tlp} shapes via COALESCE), and properties..tlp / properties..confidence to filter directly on annotation sub-fields.

<a href="#">Link to this property</a>

<details>

<summary>

op: "equals"or "not"or "gt"or 9 more

Search operator. Use ‘in’ for bulk OR within a single field.

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

"like"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"startsWith"

<a href="#">Link to this property</a>

"endsWith"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"find"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor numberor array of stringor number

Search value. String or number for most operators. Array for ‘in’ (max 100 items).

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

<details>

<summary>

array of stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20filters%20%3E%20(schema)>)

page: optional number

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

pageSize: optional number

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pageSize%20%3E%20(schema)>)

search: optional string

Free-text substring match on tag value AND custom-field properties. Searches case-insensitively inside both `Tag.value` and the serialized `Tag.properties` JSON blob (keys, values, and annotation metadata like confidence/tlp are all searchable). Same serialized-text tradeoff as `aliasGroupNames` — substrings can cross JSON boundaries.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

pagination: object {page, pageSize, totalCount, totalPages }

</summary>

page: number

<a href="#">Link to this property</a>

pageSize: number

<a href="#">Link to this property</a>

totalCount: number

<a href="#">Link to this property</a>

totalPages: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_list_response%20%3E%20(schema)%20%3E%20(property)%20pagination>)

<details>

<summary>

tags: array of object {uuid, value, activeDuration, 34 more }

</summary>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

activeDuration: optional string

<a href="#">Link to this property</a>

<details>

<summary>

activeDuration\_annotated: optional object {value, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

actorCategory: optional string

<a href="#">Link to this property</a>

<details>

<summary>

actorCategory\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

aliases: optional array of object {value, confidence, tlp }

Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purple are removed for non-CFONE accounts).

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

maximum10

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

aliasGroupNames: optional array of string

<a href="#">Link to this property</a>

aliasGroupNamesInternal: optional array of string

<a href="#">Link to this property</a>

attributionOrganization: optional string

<a href="#">Link to this property</a>

<details>

<summary>

attributionOrganization\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

categoryUuid: optional string

<a href="#">Link to this property</a>

confidence: optional number

Overall tag confidence (1-10).

maximum10

minimum1

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

dateOfDiscovery: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

externalReferenceLinks: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

externalReferences: optional array of object {url, description }

Structured external references ({ url, description }). Public: returned to all accounts.

</summary>

url: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

externalReferences\_annotated: optional array of object {value, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

internalAliases: optional array of object {value, confidence, tlp }

Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

maximum10

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

internalDescription: optional string

<a href="#">Link to this property</a>

lastSeen: optional string

<a href="#">Link to this property</a>

motive: optional string

<a href="#">Link to this property</a>

<details>

<summary>

motive\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

opsecLevel: optional string

<a href="#">Link to this property</a>

<details>

<summary>

opsecLevel\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

originCountryISO: optional string

ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.

<a href="#">Link to this property</a>

<details>

<summary>

originCountryISO\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

<details>

<summary>

priority\_annotated: optional object {value, tlp }

</summary>

value: number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Parsed custom field values. Null when the tag has no custom fields.

<a href="#">Link to this property</a>

sophisticationLevel: optional string

<a href="#">Link to this property</a>

<details>

<summary>

sophisticationLevel\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

Tag-level TLP handling marking.

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_list_response%20%3E%20(schema)%20%3E%20(property)%20tags>)

### Lists all tags (SoT)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/tags \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "pagination": {
    "page": 0,
    "pageSize": 0,
    "totalCount": 0,
    "totalPages": 0
  },
  "tags": [
    {
      "uuid": "12345678-1234-1234-1234-1234567890ab",
      "value": "APT28",
      "activeDuration": "activeDuration",
      "activeDuration_annotated": {
        "value": "value",
        "tlp": "red"
      },
      "actorCategory": "actorCategory",
      "actorCategory_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "aliases": [
        {
          "value": "Fancy Bear",
          "confidence": 8,
          "tlp": "amber"
        }
      ],
      "aliasGroupNames": [
        "string"
      ],
      "aliasGroupNamesInternal": [
        "string"
      ],
      "attributionOrganization": "attributionOrganization",
      "attributionOrganization_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "categoryName": "Actor",
      "categoryUuid": "12345678-1234-1234-1234-1234567890ab",
      "confidence": 8,
      "createdAt": "createdAt",
      "dateOfDiscovery": "2024-01-15T00:00:00Z",
      "description": "description",
      "externalReferenceLinks": [
        "string"
      ],
      "externalReferences": [
        {
          "url": "https://example.com/report",
          "description": "Vendor threat report"
        }
      ],
      "externalReferences_annotated": [
        {
          "value": "value",
          "tlp": "red"
        }
      ],
      "internalAliases": [
        {
          "value": "Fancy Bear",
          "confidence": 8,
          "tlp": "amber"
        }
      ],
      "internalDescription": "internalDescription",
      "lastSeen": "lastSeen",
      "motive": "motive",
      "motive_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "opsecLevel": "opsecLevel",
      "opsecLevel_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "originCountryISO": "originCountryISO",
      "originCountryISO_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "priority": 0,
      "priority_annotated": {
        "value": 0,
        "tlp": "red"
      },
      "properties": {
        "foo": "bar"
      },
      "sophisticationLevel": "sophisticationLevel",
      "sophisticationLevel_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "tlp": "amber",
      "updatedAt": "updatedAt",
      "version": 0
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "pagination": {
    "page": 0,
    "pageSize": 0,
    "totalCount": 0,
    "totalPages": 0
  },
  "tags": [
    {
      "uuid": "12345678-1234-1234-1234-1234567890ab",
      "value": "APT28",
      "activeDuration": "activeDuration",
      "activeDuration_annotated": {
        "value": "value",
        "tlp": "red"
      },
      "actorCategory": "actorCategory",
      "actorCategory_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "aliases": [
        {
          "value": "Fancy Bear",
          "confidence": 8,
          "tlp": "amber"
        }
      ],
      "aliasGroupNames": [
        "string"
      ],
      "aliasGroupNamesInternal": [
        "string"
      ],
      "attributionOrganization": "attributionOrganization",
      "attributionOrganization_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "categoryName": "Actor",
      "categoryUuid": "12345678-1234-1234-1234-1234567890ab",
      "confidence": 8,
      "createdAt": "createdAt",
      "dateOfDiscovery": "2024-01-15T00:00:00Z",
      "description": "description",
      "externalReferenceLinks": [
        "string"
      ],
      "externalReferences": [
        {
          "url": "https://example.com/report",
          "description": "Vendor threat report"
        }
      ],
      "externalReferences_annotated": [
        {
          "value": "value",
          "tlp": "red"
        }
      ],
      "internalAliases": [
        {
          "value": "Fancy Bear",
          "confidence": 8,
          "tlp": "amber"
        }
      ],
      "internalDescription": "internalDescription",
      "lastSeen": "lastSeen",
      "motive": "motive",
      "motive_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "opsecLevel": "opsecLevel",
      "opsecLevel_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "originCountryISO": "originCountryISO",
      "originCountryISO_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "priority": 0,
      "priority_annotated": {
        "value": 0,
        "tlp": "red"
      },
      "properties": {
        "foo": "bar"
      },
      "sophisticationLevel": "sophisticationLevel",
      "sophisticationLevel_annotated": {
        "value": "value",
        "confidence": 0,
        "tlp": "red"
      },
      "tlp": "amber",
      "updatedAt": "updatedAt",
      "version": 0
    }
  ]
}
```