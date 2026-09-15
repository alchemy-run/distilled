---
title: Creates a new tag
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

# Creates a new tag

POST/accounts/{account\_id}/cloudforce-one/events/tags/create

Creates a new tag to be used accross threat events.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

value: string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20value%20%3E%20(schema)>)

<details>

<summary>

activeDuration: optional stringor object {value, confidence, tlp }

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

object {value, confidence, tlp }

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

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20activeDuration%20%3E%20(schema)>)

<details>

<summary>

actorCategory: optional stringor object {value, confidence, tlp }

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

object {value, confidence, tlp }

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

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20actorCategory%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20aliases%20%3E%20(schema)>)

aliasGroupNames: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20aliasGroupNames%20%3E%20(schema)>)

aliasGroupNamesInternal: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20aliasGroupNamesInternal%20%3E%20(schema)>)

<details>

<summary>

attributionOrganization: optional stringor object {value, confidence, tlp }

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

object {value, confidence, tlp }

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

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20attributionOrganization%20%3E%20(schema)>)

categoryUuid: optional string

Tag type (category) UUID. Optional — when present, `properties` is validated against this category’s schema. When absent, the tag is typeless and properties are accepted free-form.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20categoryUuid%20%3E%20(schema)>)

confidence: optional number

Overall tag confidence (1-10). Optional.

maximum10

minimum1

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20confidence%20%3E%20(schema)>)

dateOfDiscovery: optional string

Date of discovery (ISO YYYY-MM-DD). Optional.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20dateOfDiscovery%20%3E%20(schema)>)

description: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

externalReferenceLinks: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20externalReferenceLinks%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20externalReferences%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20internalAliases%20%3E%20(schema)>)

internalDescription: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20internalDescription%20%3E%20(schema)>)

lastSeen: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20lastSeen%20%3E%20(schema)>)

<details>

<summary>

motive: optional stringor object {value, confidence, tlp }

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

object {value, confidence, tlp }

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

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20motive%20%3E%20(schema)>)

<details>

<summary>

opsecLevel: optional stringor object {value, confidence, tlp }

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

object {value, confidence, tlp }

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

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20opsecLevel%20%3E%20(schema)>)

<details>

<summary>

originCountryISO: optional stringor object {value, confidence, tlp }

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

object {value, confidence, tlp }

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

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20originCountryISO%20%3E%20(schema)>)

<details>

<summary>

priority: optional numberor object {value, confidence, tlp }

</summary>

One of the following:

number

<a href="#">Link to this property</a>

<details>

<summary>

object {value, confidence, tlp }

</summary>

value: number

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

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20priority%20%3E%20(schema)>)

properties: optional map\[unknown]

Structured metadata blob. Optional. When `categoryUuid` is given, validated against this category’s schema on write. When typeless, accepted free-form. Use `{}` for a tag with no custom data.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20properties%20%3E%20(schema)>)

<details>

<summary>

sophisticationLevel: optional stringor object {value, confidence, tlp }

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

object {value, confidence, tlp }

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

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20sophisticationLevel%20%3E%20(schema)>)

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

Tag-level TLP handling marking. Optional. Allowed values: red, amber, amber-strict, green, clear, purple, amber+strict.

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20tlp%20%3E%20(schema)>)

##### ReturnsExpand Collapse

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

value: string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20value>)

activeDuration: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20activeDuration>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20activeDuration_annotated>)

actorCategory: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20actorCategory>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20actorCategory_annotated>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20aliases>)

aliasGroupNames: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20aliasGroupNames>)

aliasGroupNamesInternal: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20aliasGroupNamesInternal>)

attributionOrganization: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20attributionOrganization>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20attributionOrganization_annotated>)

categoryName: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20categoryName>)

categoryUuid: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20categoryUuid>)

confidence: optional number

Overall tag confidence (1-10).

maximum10

minimum1

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20confidence>)

createdAt: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20createdAt>)

dateOfDiscovery: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20dateOfDiscovery>)

description: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20description>)

externalReferenceLinks: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20externalReferenceLinks>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20externalReferences>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20externalReferences_annotated>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20internalAliases>)

internalDescription: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20internalDescription>)

lastSeen: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20lastSeen>)

motive: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20motive>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20motive_annotated>)

opsecLevel: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20opsecLevel>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20opsecLevel_annotated>)

originCountryISO: optional string

ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20originCountryISO>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20originCountryISO_annotated>)

priority: optional number

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20priority>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20priority_annotated>)

properties: optional map\[unknown]

Parsed custom field values. Null when the tag has no custom fields.

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20properties>)

sophisticationLevel: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20sophisticationLevel>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20sophisticationLevel_annotated>)

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

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20tlp>)

updatedAt: optional string

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20updatedAt>)

version: optional number

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)%20%3E%20(property)%20version>)

### Creates a new tag

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/tags/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "APT28",
          "categoryUuid": "12345678-1234-1234-1234-1234567890ab",
          "confidence": 8,
          "dateOfDiscovery": "2024-01-15T00:00:00Z",
          "description": "A suspected state-sponsored group.",
          "tlp": "amber"
        }'
```

200 example

```
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
```

##### Returns Examples

200 example

```
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
```