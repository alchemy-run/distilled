---
title: Domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Domains

##### [List protected email domains](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains/methods/list)

GET/accounts/{account\_id}/email-security/settings/domains

##### [Get an email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains/methods/get)

GET/accounts/{account\_id}/email-security/settings/domains/{domain\_id}

##### [Replace an email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains/methods/update)

PUT/accounts/{account\_id}/email-security/settings/domains/{domain\_id}

##### [Update an email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains/methods/edit)

PATCH/accounts/{account\_id}/email-security/settings/domains/{domain\_id}

##### [Add a new email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains/methods/create)

POST/accounts/{account\_id}/email-security/settings/domains

##### [Unprotect an email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains/methods/delete)

DELETE/accounts/{account\_id}/email-security/settings/domains/{domain\_id}

##### [Batch domain operations](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains/methods/batch)

POST/accounts/{account\_id}/email-security/settings/domains/batch

##### [Unprotect multiple email domains](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains/methods/bulk_delete)

Deprecated

DELETE/accounts/{account\_id}/email-security/settings/domains

##### ModelsExpand Collapse

<details>

<summary>

DomainListResponse object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(model)%20domain_list_response%20%3E%20(schema)>)

<details>

<summary>

DomainGetResponse object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(model)%20domain_get_response%20%3E%20(schema)>)

<details>

<summary>

DomainUpdateResponse object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(model)%20domain_update_response%20%3E%20(schema)>)

<details>

<summary>

DomainEditResponse object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(model)%20domain_edit_response%20%3E%20(schema)>)

<details>

<summary>

DomainCreateResponse object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(model)%20domain_create_response%20%3E%20(schema)>)

<details>

<summary>

DomainDeleteResponse object {id }

</summary>

id: string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(model)%20domain_delete_response%20%3E%20(schema)>)

<details>

<summary>

DomainBatchResponse object {deletes, patches, posts, puts }

</summary>

<details>

<summary>

deletes: array of object {id }

</summary>

id: string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

patches: array of object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

posts: array of object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

puts: array of object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(model)%20domain_batch_response%20%3E%20(schema)>)

<details>

<summary>

DomainBulkDeleteResponse object {id }

</summary>

id: string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(model)%20domain_bulk_delete_response%20%3E%20(schema)>)