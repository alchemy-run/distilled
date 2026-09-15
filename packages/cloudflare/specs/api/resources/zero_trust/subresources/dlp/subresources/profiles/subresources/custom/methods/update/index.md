---
title: Update custom profile
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Profiles](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles)

[Custom](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles/subresources/custom)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update custom profile

PUT/accounts/{account\_id}/dlp/profiles/custom/{profile\_id}

Updates a DLP custom profile.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

profile\_id: string

formatuuid

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20profile_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

ai\_context\_enabled: optional boolean

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20ai_context_enabled%20%3E%20(schema)>)

allowed\_match\_count: optional number

formatint32

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20allowed_match_count%20%3E%20(schema)>)

confidence\_threshold: optional string

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20confidence_threshold%20%3E%20(schema)>)

<details>

<summary>

Deprecatedcontext\_awareness: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles%20%3E%20(model)%20context_awareness%20%3E%20(schema)">ContextAwareness</a> { enabled, skip }

Scan the context of predefined entries to only return matches surrounded by keywords.

</summary>

enabled: boolean

If true, scan the context of predefined entries to only return matches surrounded by keywords.

<a href="#">Link to this property</a>

<details>

<summary>

skip: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles%20%3E%20(model)%20skip_configuration%20%3E%20(schema)">SkipConfiguration</a> { files }

Content types to exclude from context analysis and return all matches.

</summary>

files: boolean

If the content type is a file, skip context analysis and return all matches.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20context_awareness%20%3E%20(schema)>)

data\_classes: optional array of string

Data class IDs to associate with the profile. If omitted, existing associations are unchanged.

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20data_classes%20%3E%20(schema)>)

data\_tags: optional array of string

Data tag IDs to associate with the profile. If omitted, existing associations are unchanged.

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20data_tags%20%3E%20(schema)>)

description: optional string

The description of the profile.

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

<details>

<summary>

Deprecatedentries: optional array of object {enabled, entry\_id, name, 2 more } or object {enabled, name, pattern, description }

Custom entries from this profile. If this field is omitted, entries owned by this profile will not be changed.

</summary>

One of the following:

<details>

<summary>

DLPNewCustomEntryWithID object {enabled, entry\_id, name, 2 more }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

entry\_id: string

formatuuid

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

</summary>

regex: string

<a href="#">Link to this property</a>

Deprecatedvalidation: optional "luhn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DLPNewCustomEntry object {enabled, name, pattern, description }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

</summary>

regex: string

<a href="#">Link to this property</a>

Deprecatedvalidation: optional "luhn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20entries%20%3E%20(schema)>)

ocr\_enabled: optional boolean

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20ocr_enabled%20%3E%20(schema)>)

<details>

<summary>

sensitivity\_levels: optional array of object {group\_id, level\_id }

Sensitivity levels to associate with the profile. If omitted, existing associations are unchanged.

</summary>

group\_id: string

formatuuid

<a href="#">Link to this property</a>

level\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20sensitivity_levels%20%3E%20(schema)>)

<details>

<summary>

shared\_entries: optional array of object {enabled, entry\_id }

Other entries, e.g. predefined or integration.

</summary>

enabled: boolean

<a href="#">Link to this property</a>

entry\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20shared_entries%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles%20%3E%20(model)%20profile%20%3E%20(schema)">Profile</a>

</summary>

One of the following:

<details>

<summary>

CustomProfile object {id, allowed\_match\_count, created\_at, 13 more }

</summary>

id: string

The id of the profile (uuid).

formatuuid

<a href="#">Link to this property</a>

allowed\_match\_count: number

Related DLP policies will trigger when the match count exceeds the number set.

formatint32

maximum1000

minimum0

<a href="#">Link to this property</a>

created\_at: string

When the profile was created.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the profile.

<a href="#">Link to this property</a>

ocr\_enabled: boolean

<a href="#">Link to this property</a>

type: "custom"

<a href="#">Link to this property</a>

updated\_at: string

When the profile was lasted updated.

formatdate-time

<a href="#">Link to this property</a>

ai\_context\_enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

confidence\_threshold: optional "low"or "medium"or "high"or "very\_high"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"very\_high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedcontext\_awareness: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles%20%3E%20(model)%20context_awareness%20%3E%20(schema)">ContextAwareness</a> { enabled, skip }

Scan the context of predefined entries to only return matches surrounded by keywords.

</summary>

enabled: boolean

If true, scan the context of predefined entries to only return matches surrounded by keywords.

<a href="#">Link to this property</a>

<details>

<summary>

skip: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles%20%3E%20(model)%20skip_configuration%20%3E%20(schema)">SkipConfiguration</a> { files }

Content types to exclude from context analysis and return all matches.

</summary>

files: boolean

If the content type is a file, skip context analysis and return all matches.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data\_classes: optional array of string

Data classes associated with this profile.

<a href="#">Link to this property</a>

data\_tags: optional array of string

Data tags associated with this profile.

<a href="#">Link to this property</a>

description: optional string

The description of the profile.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedentries: optional array of object {id, created\_at, enabled, 6 more } or object {id, created\_at, enabled, 4 more } or object {id, confidence, enabled, 5 more } or 4 more

</summary>

One of the following:

<details>

<summary>

CustomEntry object {id, created\_at, enabled, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

</summary>

regex: string

<a href="#">Link to this property</a>

Deprecatedvalidation: optional "luhn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "custom"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CustomPromptTopicEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "custom\_prompt\_topic"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the custom prompt topic entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PredefinedEntry object {id, confidence, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

confidence: object {ai\_context\_available, available }

</summary>

ai\_context\_available: boolean

Indicates whether this entry has AI remote service validation.

<a href="#">Link to this property</a>

available: boolean

Indicates whether this entry has any form of validation that is not an AI remote service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "predefined"

<a href="#">Link to this property</a>

deprecated: optional boolean

Whether this entry is deprecated for new use. This is computed from the static catalog and emitted only when true.

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

variant: optional object {topic\_type, type, description } or object {type, description }

A Predefined AI prompt classification topic entry.

</summary>

One of the following:

<details>

<summary>

object {topic\_type, type, description }

A Predefined AI prompt classification topic entry.

</summary>

<details>

<summary>

topic\_type: "Intent"or "Content"

</summary>

One of the following:

"Intent"

<a href="#">Link to this property</a>

"Content"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "PromptTopic"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined AI prompt topic represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {type, description }

A general predefined entry.

</summary>

type: "General"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined entry represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IntegrationEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "integration"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExactDataEntry object {id, case\_sensitive, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

case\_sensitive: boolean

Only applies to custom word lists. Determines if the words should be matched in a case-sensitive manner Cannot be set to false if secret is true

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

secret: boolean

<a href="#">Link to this property</a>

type: "exact\_data"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the exact data entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DocumentFingerprintEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "document\_fingerprint"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the document fingerprint entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WordListEntry object {id, created\_at, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "word\_list"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

word\_list: unknown

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sensitivity\_levels: optional array of object {group\_id, level\_id }

Sensitivity levels associated with this profile.

</summary>

group\_id: string

formatuuid

<a href="#">Link to this property</a>

level\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

shared\_entries: optional array of object {id, created\_at, enabled, 6 more } or object {id, created\_at, enabled, 4 more } or object {id, confidence, enabled, 5 more } or 4 more

</summary>

One of the following:

<details>

<summary>

CustomEntry object {id, created\_at, enabled, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

</summary>

regex: string

<a href="#">Link to this property</a>

Deprecatedvalidation: optional "luhn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "custom"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CustomPromptTopicEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "custom\_prompt\_topic"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the custom prompt topic entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PredefinedEntry object {id, confidence, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

confidence: object {ai\_context\_available, available }

</summary>

ai\_context\_available: boolean

Indicates whether this entry has AI remote service validation.

<a href="#">Link to this property</a>

available: boolean

Indicates whether this entry has any form of validation that is not an AI remote service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "predefined"

<a href="#">Link to this property</a>

deprecated: optional boolean

Whether this entry is deprecated for new use. This is computed from the static catalog and emitted only when true.

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

variant: optional object {topic\_type, type, description } or object {type, description }

A Predefined AI prompt classification topic entry.

</summary>

One of the following:

<details>

<summary>

object {topic\_type, type, description }

A Predefined AI prompt classification topic entry.

</summary>

<details>

<summary>

topic\_type: "Intent"or "Content"

</summary>

One of the following:

"Intent"

<a href="#">Link to this property</a>

"Content"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "PromptTopic"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined AI prompt topic represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {type, description }

A general predefined entry.

</summary>

type: "General"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined entry represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IntegrationEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "integration"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExactDataEntry object {id, case\_sensitive, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

case\_sensitive: boolean

Only applies to custom word lists. Determines if the words should be matched in a case-sensitive manner Cannot be set to false if secret is true

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

secret: boolean

<a href="#">Link to this property</a>

type: "exact\_data"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the exact data entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DocumentFingerprintEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "document\_fingerprint"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the document fingerprint entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WordListEntry object {id, created\_at, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "word\_list"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

word\_list: unknown

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PredefinedProfile object {id, allowed\_match\_count, entries, 7 more }

</summary>

id: string

The id of the predefined profile (uuid).

formatuuid

<a href="#">Link to this property</a>

allowed\_match\_count: number

formatint32

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedentries: array of object {id, created\_at, enabled, 6 more } or object {id, created\_at, enabled, 4 more } or object {id, confidence, enabled, 5 more } or 4 more

</summary>

One of the following:

<details>

<summary>

CustomEntry object {id, created\_at, enabled, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

</summary>

regex: string

<a href="#">Link to this property</a>

Deprecatedvalidation: optional "luhn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "custom"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CustomPromptTopicEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "custom\_prompt\_topic"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the custom prompt topic entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PredefinedEntry object {id, confidence, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

confidence: object {ai\_context\_available, available }

</summary>

ai\_context\_available: boolean

Indicates whether this entry has AI remote service validation.

<a href="#">Link to this property</a>

available: boolean

Indicates whether this entry has any form of validation that is not an AI remote service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "predefined"

<a href="#">Link to this property</a>

deprecated: optional boolean

Whether this entry is deprecated for new use. This is computed from the static catalog and emitted only when true.

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

variant: optional object {topic\_type, type, description } or object {type, description }

A Predefined AI prompt classification topic entry.

</summary>

One of the following:

<details>

<summary>

object {topic\_type, type, description }

A Predefined AI prompt classification topic entry.

</summary>

<details>

<summary>

topic\_type: "Intent"or "Content"

</summary>

One of the following:

"Intent"

<a href="#">Link to this property</a>

"Content"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "PromptTopic"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined AI prompt topic represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {type, description }

A general predefined entry.

</summary>

type: "General"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined entry represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IntegrationEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "integration"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExactDataEntry object {id, case\_sensitive, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

case\_sensitive: boolean

Only applies to custom word lists. Determines if the words should be matched in a case-sensitive manner Cannot be set to false if secret is true

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

secret: boolean

<a href="#">Link to this property</a>

type: "exact\_data"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the exact data entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DocumentFingerprintEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "document\_fingerprint"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the document fingerprint entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WordListEntry object {id, created\_at, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "word\_list"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

word\_list: unknown

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the predefined profile.

<a href="#">Link to this property</a>

type: "predefined"

<a href="#">Link to this property</a>

ai\_context\_enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

confidence\_threshold: optional "low"or "medium"or "high"or "very\_high"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"very\_high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedcontext\_awareness: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles%20%3E%20(model)%20context_awareness%20%3E%20(schema)">ContextAwareness</a> { enabled, skip }

Scan the context of predefined entries to only return matches surrounded by keywords.

</summary>

enabled: boolean

If true, scan the context of predefined entries to only return matches surrounded by keywords.

<a href="#">Link to this property</a>

<details>

<summary>

skip: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles%20%3E%20(model)%20skip_configuration%20%3E%20(schema)">SkipConfiguration</a> { files }

Content types to exclude from context analysis and return all matches.

</summary>

files: boolean

If the content type is a file, skip context analysis and return all matches.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ocr\_enabled: optional boolean

<a href="#">Link to this property</a>

open\_access: optional boolean

Whether this profile can be accessed by anyone.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IntegrationProfile object {id, created\_at, entries, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedentries: array of object {id, created\_at, enabled, 6 more } or object {id, created\_at, enabled, 4 more } or object {id, confidence, enabled, 5 more } or 4 more

</summary>

One of the following:

<details>

<summary>

CustomEntry object {id, created\_at, enabled, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

</summary>

regex: string

<a href="#">Link to this property</a>

Deprecatedvalidation: optional "luhn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "custom"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CustomPromptTopicEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "custom\_prompt\_topic"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the custom prompt topic entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PredefinedEntry object {id, confidence, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

confidence: object {ai\_context\_available, available }

</summary>

ai\_context\_available: boolean

Indicates whether this entry has AI remote service validation.

<a href="#">Link to this property</a>

available: boolean

Indicates whether this entry has any form of validation that is not an AI remote service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "predefined"

<a href="#">Link to this property</a>

deprecated: optional boolean

Whether this entry is deprecated for new use. This is computed from the static catalog and emitted only when true.

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

variant: optional object {topic\_type, type, description } or object {type, description }

A Predefined AI prompt classification topic entry.

</summary>

One of the following:

<details>

<summary>

object {topic\_type, type, description }

A Predefined AI prompt classification topic entry.

</summary>

<details>

<summary>

topic\_type: "Intent"or "Content"

</summary>

One of the following:

"Intent"

<a href="#">Link to this property</a>

"Content"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "PromptTopic"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined AI prompt topic represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {type, description }

A general predefined entry.

</summary>

type: "General"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined entry represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IntegrationEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "integration"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExactDataEntry object {id, case\_sensitive, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

case\_sensitive: boolean

Only applies to custom word lists. Determines if the words should be matched in a case-sensitive manner Cannot be set to false if secret is true

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

secret: boolean

<a href="#">Link to this property</a>

type: "exact\_data"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the exact data entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DocumentFingerprintEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "document\_fingerprint"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the document fingerprint entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WordListEntry object {id, created\_at, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "word\_list"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

word\_list: unknown

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

shared\_entries: array of object {id, created\_at, enabled, 6 more } or object {id, created\_at, enabled, 4 more } or object {id, confidence, enabled, 5 more } or 4 more

</summary>

One of the following:

<details>

<summary>

CustomEntry object {id, created\_at, enabled, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

</summary>

regex: string

<a href="#">Link to this property</a>

Deprecatedvalidation: optional "luhn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "custom"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CustomPromptTopicEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedenabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "custom\_prompt\_topic"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the custom prompt topic entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PredefinedEntry object {id, confidence, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

confidence: object {ai\_context\_available, available }

</summary>

ai\_context\_available: boolean

Indicates whether this entry has AI remote service validation.

<a href="#">Link to this property</a>

available: boolean

Indicates whether this entry has any form of validation that is not an AI remote service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "predefined"

<a href="#">Link to this property</a>

deprecated: optional boolean

Whether this entry is deprecated for new use. This is computed from the static catalog and emitted only when true.

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

variant: optional object {topic\_type, type, description } or object {type, description }

A Predefined AI prompt classification topic entry.

</summary>

One of the following:

<details>

<summary>

object {topic\_type, type, description }

A Predefined AI prompt classification topic entry.

</summary>

<details>

<summary>

topic\_type: "Intent"or "Content"

</summary>

One of the following:

"Intent"

<a href="#">Link to this property</a>

"Content"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "PromptTopic"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined AI prompt topic represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {type, description }

A general predefined entry.

</summary>

type: "General"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined entry represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IntegrationEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "integration"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExactDataEntry object {id, case\_sensitive, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

case\_sensitive: boolean

Only applies to custom word lists. Determines if the words should be matched in a case-sensitive manner Cannot be set to false if secret is true

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

secret: boolean

<a href="#">Link to this property</a>

type: "exact\_data"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the exact data entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DocumentFingerprintEntry object {id, created\_at, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "document\_fingerprint"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The optional description of the document fingerprint entry.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WordListEntry object {id, created\_at, enabled, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "word\_list"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

word\_list: unknown

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "integration"

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

The description of the profile.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update custom profile

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles/custom/$PROFILE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "name"
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "allowed_match_count": 5,
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "ocr_enabled": true,
    "type": "custom",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_context_enabled": true,
    "confidence_threshold": "low",
    "context_awareness": {
      "enabled": true,
      "skip": {
        "files": true
      }
    },
    "data_classes": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "description": "description",
    "entries": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "enabled": true,
        "name": "name",
        "pattern": {
          "regex": "regex",
          "validation": "luhn"
        },
        "type": "custom",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description",
        "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "shared_entries": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "enabled": true,
        "name": "name",
        "pattern": {
          "regex": "regex",
          "validation": "luhn"
        },
        "type": "custom",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description",
        "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ]
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "allowed_match_count": 5,
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "ocr_enabled": true,
    "type": "custom",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_context_enabled": true,
    "confidence_threshold": "low",
    "context_awareness": {
      "enabled": true,
      "skip": {
        "files": true
      }
    },
    "data_classes": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "description": "description",
    "entries": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "enabled": true,
        "name": "name",
        "pattern": {
          "regex": "regex",
          "validation": "luhn"
        },
        "type": "custom",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description",
        "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "shared_entries": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "enabled": true,
        "name": "name",
        "pattern": {
          "regex": "regex",
          "validation": "luhn"
        },
        "type": "custom",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description",
        "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ]
  }
}
```