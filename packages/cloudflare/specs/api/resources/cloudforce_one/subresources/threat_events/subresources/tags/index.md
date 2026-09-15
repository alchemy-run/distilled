---
title: Tags
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tags

##### [Lists all tags (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/tags

##### [Creates a new tag](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/tags/create

##### [Updates a tag (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/tags/{tag\_uuid}

##### [Deletes a tag (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/tags/{tag\_uuid}

##### ModelsExpand Collapse

<details>

<summary>

TagListResponse object {pagination, tags }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_list_response%20%3E%20(schema)>)

<details>

<summary>

TagCreateResponse object {uuid, value, activeDuration, 34 more }

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)>)

<details>

<summary>

TagEditResponse object {uuid, value, activeDuration, 34 more }

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_edit_response%20%3E%20(schema)>)

<details>

<summary>

TagDeleteResponse object {uuid }

</summary>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_delete_response%20%3E%20(schema)>)

#### TagsCategories

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

#### TagsIndicators

##### [List indicators related to a tag](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/indicators/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/tags/{tag\_uuid}/indicators

##### ModelsExpand Collapse

<details>

<summary>

IndicatorListResponse object {indicators, pagination }

</summary>

<details>

<summary>

indicators: array of object {createdAt, indicatorType, updatedAt, 6 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

updatedAt: string

formatdate-time

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

<a href="#">Link to this property</a>

<details>

<summary>

relatedEvents: optional array of object {datasetId, eventId, eventDate }

</summary>

datasetId: string

<a href="#">Link to this property</a>

eventId: string

<a href="#">Link to this property</a>

eventDate: optional string

ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {categoryId, categoryName, uuid, value }

</summary>

categoryId: optional string

The UUID of the tag category, or null when the tag is uncategorized.

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

uuid: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(model)%20indicator_list_response%20%3E%20(schema)>)

#### TagsIndicatorsBy Dataset

##### [List indicators related to a tag within a dataset (deprecated)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/indicators/subresources/by_dataset/methods/list)

Deprecated

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/tags/{tag\_uuid}/indicators

##### ModelsExpand Collapse

<details>

<summary>

ByDatasetListResponse object {indicators, pagination }

</summary>

<details>

<summary>

indicators: array of object {createdAt, indicatorType, updatedAt, 6 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

updatedAt: string

formatdate-time

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

<a href="#">Link to this property</a>

<details>

<summary>

relatedEvents: optional array of object {datasetId, eventId, eventDate }

</summary>

datasetId: string

<a href="#">Link to this property</a>

eventId: string

<a href="#">Link to this property</a>

eventDate: optional string

ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {categoryId, categoryName, uuid, value }

</summary>

categoryId: optional string

The UUID of the tag category, or null when the tag is uncategorized.

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

uuid: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators.by_dataset%20%3E%20(model)%20by_dataset_list_response%20%3E%20(schema)>)