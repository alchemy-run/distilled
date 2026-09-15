---
title: Predefined
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

# Predefined

##### [Get predefined profile config](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles/subresources/predefined/methods/get)

GET/accounts/{account\_id}/dlp/profiles/predefined/{profile\_id}/config

##### [Update predefined profile config](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles/subresources/predefined/methods/update)

PUT/accounts/{account\_id}/dlp/profiles/predefined/{profile\_id}/config

##### [Delete predefined profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/profiles/subresources/predefined/methods/delete)

DELETE/accounts/{account\_id}/dlp/profiles/predefined/{profile\_id}

##### ModelsExpand Collapse

<details>

<summary>

PredefinedProfile object {id, allowed\_match\_count, confidence\_threshold, 6 more }

</summary>

id: string

The id of the predefined profile (uuid).

formatuuid

<a href="#">Link to this property</a>

allowed\_match\_count: number

formatint32

<a href="#">Link to this property</a>

confidence\_threshold: string

<a href="#">Link to this property</a>

enabled\_entries: array of string

Entries to enable for this predefined profile. Any entries not provided will be disabled.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedentries: array of object {id, created\_at, enabled, 6 more } or object {id, created\_at, enabled, 4 more } or object {id, confidence, enabled, 5 more } or 4 more

This field has been deprecated for <code>enabled_entries</code>.

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

name: string

The name of the predefined profile.

<a href="#">Link to this property</a>

ai\_context\_enabled: optional boolean

<a href="#">Link to this property</a>

ocr\_enabled: optional boolean

<a href="#">Link to this property</a>

open\_access: optional boolean

Whether this profile can be accessed by anyone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.profiles.predefined%20%3E%20(model)%20predefined_profile%20%3E%20(schema)>)

PredefinedDeleteResponse = unknown

[Link to this property](#)%20zero_trust.dlp.profiles.predefined%20%3E%20(model)%20predefined_delete_response%20%3E%20(schema)>)