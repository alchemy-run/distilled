---
title: Email
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Email

#### EmailAccount Mapping

##### [Get mapping](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/account_mapping/methods/get)

GET/accounts/{account\_id}/dlp/email/account\_mapping

##### [Create mapping](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/account_mapping/methods/create)

POST/accounts/{account\_id}/dlp/email/account\_mapping

##### ModelsExpand Collapse

<details>

<summary>

AccountMappingGetResponse object {addin\_identifier\_token, auth\_requirements }

</summary>

addin\_identifier\_token: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

auth\_requirements: object {allowed\_microsoft\_organizations, type } or object {type }

</summary>

One of the following:

<details>

<summary>

object {allowed\_microsoft\_organizations, type }

</summary>

allowed\_microsoft\_organizations: array of string

<a href="#">Link to this property</a>

type: "Org"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Type object {type }

</summary>

type: "NoAuth"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.account_mapping%20%3E%20(model)%20account_mapping_get_response%20%3E%20(schema)>)

<details>

<summary>

AccountMappingCreateResponse object {addin\_identifier\_token, auth\_requirements }

</summary>

addin\_identifier\_token: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

auth\_requirements: object {allowed\_microsoft\_organizations, type } or object {type }

</summary>

One of the following:

<details>

<summary>

object {allowed\_microsoft\_organizations, type }

</summary>

allowed\_microsoft\_organizations: array of string

<a href="#">Link to this property</a>

type: "Org"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Type object {type }

</summary>

type: "NoAuth"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.account_mapping%20%3E%20(model)%20account_mapping_create_response%20%3E%20(schema)>)

#### EmailRules

##### [List all email scanner rules](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/rules/methods/list)

GET/accounts/{account\_id}/dlp/email/rules

##### [Get an email scanner rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/rules/methods/get)

GET/accounts/{account\_id}/dlp/email/rules/{rule\_id}

##### [Create email scanner rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/rules/methods/create)

POST/accounts/{account\_id}/dlp/email/rules

##### [Update email scanner rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/rules/methods/update)

PUT/accounts/{account\_id}/dlp/email/rules/{rule\_id}

##### [Delete email scanner rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/rules/methods/delete)

DELETE/accounts/{account\_id}/dlp/email/rules/{rule\_id}

##### [Update email scanner rule priorities](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/rules/methods/bulk_edit)

PATCH/accounts/{account\_id}/dlp/email/rules

##### ModelsExpand Collapse

<details>

<summary>

RuleListResponse object {action, conditions, created\_at, 6 more }

</summary>

<details>

<summary>

action: object {action, message }

</summary>

action: "Block"

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

conditions: array of object {operator, selector, value }

Triggered if all conditions match.

</summary>

<details>

<summary>

operator: "InList"or "NotInList"or "MatchRegex"or "NotMatchRegex"

</summary>

One of the following:

"InList"

<a href="#">Link to this property</a>

"NotInList"

<a href="#">Link to this property</a>

"MatchRegex"

<a href="#">Link to this property</a>

"NotMatchRegex"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

selector: "Recipients"or "Sender"or "DLPProfiles"

</summary>

One of the following:

"Recipients"

<a href="#">Link to this property</a>

"Sender"

<a href="#">Link to this property</a>

"DLPProfiles"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: array of stringor string

</summary>

One of the following:

array of string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

priority: number

formatint32

minimum0

<a href="#">Link to this property</a>

rule\_id: string

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.rules%20%3E%20(model)%20rule_list_response%20%3E%20(schema)>)

<details>

<summary>

RuleGetResponse object {action, conditions, created\_at, 6 more }

</summary>

<details>

<summary>

action: object {action, message }

</summary>

action: "Block"

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

conditions: array of object {operator, selector, value }

Triggered if all conditions match.

</summary>

<details>

<summary>

operator: "InList"or "NotInList"or "MatchRegex"or "NotMatchRegex"

</summary>

One of the following:

"InList"

<a href="#">Link to this property</a>

"NotInList"

<a href="#">Link to this property</a>

"MatchRegex"

<a href="#">Link to this property</a>

"NotMatchRegex"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

selector: "Recipients"or "Sender"or "DLPProfiles"

</summary>

One of the following:

"Recipients"

<a href="#">Link to this property</a>

"Sender"

<a href="#">Link to this property</a>

"DLPProfiles"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: array of stringor string

</summary>

One of the following:

array of string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

priority: number

formatint32

minimum0

<a href="#">Link to this property</a>

rule\_id: string

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.rules%20%3E%20(model)%20rule_get_response%20%3E%20(schema)>)

<details>

<summary>

RuleCreateResponse object {action, conditions, created\_at, 6 more }

</summary>

<details>

<summary>

action: object {action, message }

</summary>

action: "Block"

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

conditions: array of object {operator, selector, value }

Triggered if all conditions match.

</summary>

<details>

<summary>

operator: "InList"or "NotInList"or "MatchRegex"or "NotMatchRegex"

</summary>

One of the following:

"InList"

<a href="#">Link to this property</a>

"NotInList"

<a href="#">Link to this property</a>

"MatchRegex"

<a href="#">Link to this property</a>

"NotMatchRegex"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

selector: "Recipients"or "Sender"or "DLPProfiles"

</summary>

One of the following:

"Recipients"

<a href="#">Link to this property</a>

"Sender"

<a href="#">Link to this property</a>

"DLPProfiles"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: array of stringor string

</summary>

One of the following:

array of string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

priority: number

formatint32

minimum0

<a href="#">Link to this property</a>

rule\_id: string

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.rules%20%3E%20(model)%20rule_create_response%20%3E%20(schema)>)

<details>

<summary>

RuleUpdateResponse object {action, conditions, created\_at, 6 more }

</summary>

<details>

<summary>

action: object {action, message }

</summary>

action: "Block"

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

conditions: array of object {operator, selector, value }

Triggered if all conditions match.

</summary>

<details>

<summary>

operator: "InList"or "NotInList"or "MatchRegex"or "NotMatchRegex"

</summary>

One of the following:

"InList"

<a href="#">Link to this property</a>

"NotInList"

<a href="#">Link to this property</a>

"MatchRegex"

<a href="#">Link to this property</a>

"NotMatchRegex"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

selector: "Recipients"or "Sender"or "DLPProfiles"

</summary>

One of the following:

"Recipients"

<a href="#">Link to this property</a>

"Sender"

<a href="#">Link to this property</a>

"DLPProfiles"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: array of stringor string

</summary>

One of the following:

array of string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

priority: number

formatint32

minimum0

<a href="#">Link to this property</a>

rule\_id: string

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.rules%20%3E%20(model)%20rule_update_response%20%3E%20(schema)>)

<details>

<summary>

RuleDeleteResponse object {action, conditions, created\_at, 6 more }

</summary>

<details>

<summary>

action: object {action, message }

</summary>

action: "Block"

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

conditions: array of object {operator, selector, value }

Triggered if all conditions match.

</summary>

<details>

<summary>

operator: "InList"or "NotInList"or "MatchRegex"or "NotMatchRegex"

</summary>

One of the following:

"InList"

<a href="#">Link to this property</a>

"NotInList"

<a href="#">Link to this property</a>

"MatchRegex"

<a href="#">Link to this property</a>

"NotMatchRegex"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

selector: "Recipients"or "Sender"or "DLPProfiles"

</summary>

One of the following:

"Recipients"

<a href="#">Link to this property</a>

"Sender"

<a href="#">Link to this property</a>

"DLPProfiles"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: array of stringor string

</summary>

One of the following:

array of string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

priority: number

formatint32

minimum0

<a href="#">Link to this property</a>

rule\_id: string

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.rules%20%3E%20(model)%20rule_delete_response%20%3E%20(schema)>)

<details>

<summary>

RuleBulkEditResponse object {action, conditions, created\_at, 6 more }

</summary>

<details>

<summary>

action: object {action, message }

</summary>

action: "Block"

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

conditions: array of object {operator, selector, value }

Triggered if all conditions match.

</summary>

<details>

<summary>

operator: "InList"or "NotInList"or "MatchRegex"or "NotMatchRegex"

</summary>

One of the following:

"InList"

<a href="#">Link to this property</a>

"NotInList"

<a href="#">Link to this property</a>

"MatchRegex"

<a href="#">Link to this property</a>

"NotMatchRegex"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

selector: "Recipients"or "Sender"or "DLPProfiles"

</summary>

One of the following:

"Recipients"

<a href="#">Link to this property</a>

"Sender"

<a href="#">Link to this property</a>

"DLPProfiles"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: array of stringor string

</summary>

One of the following:

array of string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

priority: number

formatint32

minimum0

<a href="#">Link to this property</a>

rule\_id: string

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.rules%20%3E%20(model)%20rule_bulk_edit_response%20%3E%20(schema)>)