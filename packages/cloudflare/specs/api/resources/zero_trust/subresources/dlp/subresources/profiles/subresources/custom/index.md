---
title: Custom
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Profiles](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom

##### [Get custom profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles/subresources/custom/methods/get)

GET/accounts/{account\_id}/dlp/profiles/custom/{profile\_id}

##### [Create custom profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles/subresources/custom/methods/create)

POST/accounts/{account\_id}/dlp/profiles/custom

##### [Update custom profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles/subresources/custom/methods/update)

PUT/accounts/{account\_id}/dlp/profiles/custom/{profile\_id}

##### [Delete custom profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles/subresources/custom/methods/delete)

DELETE/accounts/{account\_id}/dlp/profiles/custom/{profile\_id}

##### ModelsExpand Collapse

<details>

<summary>

CustomProfile object {id, allowed\_match\_count, created\_at, 12 more }

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

Deprecatedcontext\_awareness: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles%20%3E%20(model)%20context_awareness%20%3E%20(schema)">ContextAwareness</a> { enabled, skip }

Scan the context of predefined entries to only return matches surrounded by keywords.

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

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

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

pattern: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)">Pattern</a> { regex, validation }

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

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20custom_profile%20%3E%20(schema)>)

<details>

<summary>

Pattern object {regex, validation }

</summary>

regex: string

<a href="#">Link to this property</a>

Deprecatedvalidation: optional "luhn"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20pattern%20%3E%20(schema)>)

CustomDeleteResponse = unknown

[Link to this property](#)%20zero_trust.dlp.profiles.custom%20%3E%20(model)%20custom_delete_response%20%3E%20(schema)>)