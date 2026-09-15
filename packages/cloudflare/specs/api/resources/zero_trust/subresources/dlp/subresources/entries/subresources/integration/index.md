---
title: Integration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Entries](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/entries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Integration

##### [Create integration entry](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/entries/subresources/integration/methods/create)

POST/accounts/{account\_id}/dlp/entries/integration

##### [Update integration entry](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/entries/subresources/integration/methods/update)

PUT/accounts/{account\_id}/dlp/entries/integration/{entry\_id}

##### [Delete integration entry](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/entries/subresources/integration/methods/delete)

DELETE/accounts/{account\_id}/dlp/entries/integration/{entry\_id}

##### [Get DLP Entry](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/entries/subresources/integration/methods/get)

GET/accounts/{account\_id}/dlp/entries/{entry\_id}

##### [List all entries](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/entries/subresources/integration/methods/list)

GET/accounts/{account\_id}/dlp/entries

##### ModelsExpand Collapse

<details>

<summary>

IntegrationCreateResponse object {id, created\_at, enabled, 3 more }

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

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.entries.integration%20%3E%20(model)%20integration_create_response%20%3E%20(schema)>)

<details>

<summary>

IntegrationUpdateResponse object {id, created\_at, enabled, 3 more }

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

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

profile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.entries.integration%20%3E%20(model)%20integration_update_response%20%3E%20(schema)>)

IntegrationDeleteResponse = unknown

[Link to this property](#)%20zero_trust.dlp.entries.integration%20%3E%20(model)%20integration_delete_response%20%3E%20(schema)>)

<details>

<summary>

IntegrationGetResponse = object {id, created\_at, enabled, 8 more } or object {id, created\_at, enabled, 6 more } or object {id, confidence, enabled, 7 more } or 4 more

</summary>

One of the following:

<details>

<summary>

object {id, created\_at, enabled, 8 more }

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

<details>

<summary>

profiles: optional array of object {id, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, created\_at, enabled, 6 more }

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

<details>

<summary>

profiles: optional array of object {id, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, confidence, enabled, 7 more }

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

profiles: optional array of object {id, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

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

object {id, created\_at, enabled, 6 more }

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

<details>

<summary>

profiles: optional array of object {id, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, case\_sensitive, created\_at, 8 more }

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

<details>

<summary>

profiles: optional array of object {id, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, created\_at, enabled, 6 more }

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

<details>

<summary>

profiles: optional array of object {id, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, created\_at, enabled, 7 more }

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

<details>

<summary>

profiles: optional array of object {id, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.entries.integration%20%3E%20(model)%20integration_get_response%20%3E%20(schema)>)

<details>

<summary>

IntegrationListResponse = object {id, created\_at, enabled, 7 more } or object {id, created\_at, enabled, 5 more } or object {id, confidence, enabled, 6 more } or 4 more

</summary>

One of the following:

<details>

<summary>

object {id, created\_at, enabled, 7 more }

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

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, created\_at, enabled, 5 more }

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

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, confidence, enabled, 6 more }

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

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

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

object {id, created\_at, enabled, 5 more }

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

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, case\_sensitive, created\_at, 7 more }

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

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, created\_at, enabled, 5 more }

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

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, created\_at, enabled, 6 more }

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

<details>

<summary>

upload\_status: optional "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.entries.integration%20%3E%20(model)%20integration_list_response%20%3E%20(schema)>)