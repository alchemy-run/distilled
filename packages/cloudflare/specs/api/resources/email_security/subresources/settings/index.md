---
title: Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Settings

#### SettingsAllow Policies

##### [List email allow policies](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/allow_policies/methods/list)

GET/accounts/{account\_id}/email-security/settings/allow\_policies

##### [Get an email allow policy](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/allow_policies/methods/get)

GET/accounts/{account\_id}/email-security/settings/allow\_policies/{policy\_id}

##### [Create email allow policy](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/allow_policies/methods/create)

POST/accounts/{account\_id}/email-security/settings/allow\_policies

##### [Update an email allow policy](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/allow_policies/methods/edit)

PATCH/accounts/{account\_id}/email-security/settings/allow\_policies/{policy\_id}

##### [Delete an email allow policy](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/allow_policies/methods/delete)

DELETE/accounts/{account\_id}/email-security/settings/allow\_policies/{policy\_id}

##### [Batch allow policies operations](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/allow_policies/methods/batch)

POST/accounts/{account\_id}/email-security/settings/allow\_policies/batch

##### ModelsExpand Collapse

<details>

<summary>

AllowPolicyListResponse object {id, created\_at, last\_modified, 12 more }

An email allow policy.

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlast\_modified: string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

is\_acceptable\_sender: optional boolean

Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.

<a href="#">Link to this property</a>

is\_exempt\_recipient: optional boolean

Bypasses all detections for messages to this recipient.

<a href="#">Link to this property</a>

Deprecatedis\_recipient: optional boolean

Use <code>is_exempt_recipient</code> instead.

Deprecated as of July 1, 2025. Use <code>is_exempt_recipient</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedis\_sender: optional boolean

Use <code>is_trusted_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_trusted_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

Deprecatedis\_spoof: optional boolean

Use <code>is_acceptable_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_acceptable_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_trusted\_sender: optional boolean

Bypasses all detections and link following for messages from this sender.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verify\_sender: optional boolean

Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(model)%20allow_policy_list_response%20%3E%20(schema)>)

<details>

<summary>

AllowPolicyGetResponse object {id, created\_at, last\_modified, 12 more }

An email allow policy.

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlast\_modified: string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

is\_acceptable\_sender: optional boolean

Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.

<a href="#">Link to this property</a>

is\_exempt\_recipient: optional boolean

Bypasses all detections for messages to this recipient.

<a href="#">Link to this property</a>

Deprecatedis\_recipient: optional boolean

Use <code>is_exempt_recipient</code> instead.

Deprecated as of July 1, 2025. Use <code>is_exempt_recipient</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedis\_sender: optional boolean

Use <code>is_trusted_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_trusted_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

Deprecatedis\_spoof: optional boolean

Use <code>is_acceptable_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_acceptable_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_trusted\_sender: optional boolean

Bypasses all detections and link following for messages from this sender.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verify\_sender: optional boolean

Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(model)%20allow_policy_get_response%20%3E%20(schema)>)

<details>

<summary>

AllowPolicyCreateResponse object {id, created\_at, last\_modified, 12 more }

An email allow policy.

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlast\_modified: string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

is\_acceptable\_sender: optional boolean

Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.

<a href="#">Link to this property</a>

is\_exempt\_recipient: optional boolean

Bypasses all detections for messages to this recipient.

<a href="#">Link to this property</a>

Deprecatedis\_recipient: optional boolean

Use <code>is_exempt_recipient</code> instead.

Deprecated as of July 1, 2025. Use <code>is_exempt_recipient</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedis\_sender: optional boolean

Use <code>is_trusted_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_trusted_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

Deprecatedis\_spoof: optional boolean

Use <code>is_acceptable_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_acceptable_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_trusted\_sender: optional boolean

Bypasses all detections and link following for messages from this sender.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verify\_sender: optional boolean

Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(model)%20allow_policy_create_response%20%3E%20(schema)>)

<details>

<summary>

AllowPolicyEditResponse object {id, created\_at, last\_modified, 12 more }

An email allow policy.

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlast\_modified: string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

is\_acceptable\_sender: optional boolean

Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.

<a href="#">Link to this property</a>

is\_exempt\_recipient: optional boolean

Bypasses all detections for messages to this recipient.

<a href="#">Link to this property</a>

Deprecatedis\_recipient: optional boolean

Use <code>is_exempt_recipient</code> instead.

Deprecated as of July 1, 2025. Use <code>is_exempt_recipient</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedis\_sender: optional boolean

Use <code>is_trusted_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_trusted_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

Deprecatedis\_spoof: optional boolean

Use <code>is_acceptable_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_acceptable_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_trusted\_sender: optional boolean

Bypasses all detections and link following for messages from this sender.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verify\_sender: optional boolean

Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(model)%20allow_policy_edit_response%20%3E%20(schema)>)

<details>

<summary>

AllowPolicyDeleteResponse object {id }

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(model)%20allow_policy_delete_response%20%3E%20(schema)>)

<details>

<summary>

AllowPolicyBatchResponse object {deletes, patches, posts, puts }

</summary>

<details>

<summary>

deletes: optional array of object {id }

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

patches: optional array of object {id, created\_at, last\_modified, 12 more }

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlast\_modified: string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

is\_acceptable\_sender: optional boolean

Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.

<a href="#">Link to this property</a>

is\_exempt\_recipient: optional boolean

Bypasses all detections for messages to this recipient.

<a href="#">Link to this property</a>

Deprecatedis\_recipient: optional boolean

Use <code>is_exempt_recipient</code> instead.

Deprecated as of July 1, 2025. Use <code>is_exempt_recipient</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedis\_sender: optional boolean

Use <code>is_trusted_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_trusted_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

Deprecatedis\_spoof: optional boolean

Use <code>is_acceptable_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_acceptable_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_trusted\_sender: optional boolean

Bypasses all detections and link following for messages from this sender.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verify\_sender: optional boolean

Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

posts: optional array of object {id, created\_at, last\_modified, 12 more }

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlast\_modified: string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

is\_acceptable\_sender: optional boolean

Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.

<a href="#">Link to this property</a>

is\_exempt\_recipient: optional boolean

Bypasses all detections for messages to this recipient.

<a href="#">Link to this property</a>

Deprecatedis\_recipient: optional boolean

Use <code>is_exempt_recipient</code> instead.

Deprecated as of July 1, 2025. Use <code>is_exempt_recipient</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedis\_sender: optional boolean

Use <code>is_trusted_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_trusted_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

Deprecatedis\_spoof: optional boolean

Use <code>is_acceptable_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_acceptable_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_trusted\_sender: optional boolean

Bypasses all detections and link following for messages from this sender.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verify\_sender: optional boolean

Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

puts: optional array of object {id, created\_at, last\_modified, 12 more }

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlast\_modified: string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

is\_acceptable\_sender: optional boolean

Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.

<a href="#">Link to this property</a>

is\_exempt\_recipient: optional boolean

Bypasses all detections for messages to this recipient.

<a href="#">Link to this property</a>

Deprecatedis\_recipient: optional boolean

Use <code>is_exempt_recipient</code> instead.

Deprecated as of July 1, 2025. Use <code>is_exempt_recipient</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedis\_sender: optional boolean

Use <code>is_trusted_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_trusted_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

Deprecatedis\_spoof: optional boolean

Use <code>is_acceptable_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_acceptable_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_trusted\_sender: optional boolean

Bypasses all detections and link following for messages from this sender.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verify\_sender: optional boolean

Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(model)%20allow_policy_batch_response%20%3E%20(schema)>)

#### SettingsBlock Senders

##### [List blocked email senders](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/block_senders/methods/list)

GET/accounts/{account\_id}/email-security/settings/block\_senders

##### [Get a blocked email sender](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/block_senders/methods/get)

GET/accounts/{account\_id}/email-security/settings/block\_senders/{pattern\_id}

##### [Create blocked email sender](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/block_senders/methods/create)

POST/accounts/{account\_id}/email-security/settings/block\_senders

##### [Update a blocked email sender](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/block_senders/methods/edit)

PATCH/accounts/{account\_id}/email-security/settings/block\_senders/{pattern\_id}

##### [Delete a blocked email sender](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/block_senders/methods/delete)

DELETE/accounts/{account\_id}/email-security/settings/block\_senders/{pattern\_id}

##### [Batch blocked senders operations](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/block_senders/methods/batch)

POST/accounts/{account\_id}/email-security/settings/block\_senders/batch

##### ModelsExpand Collapse

<details>

<summary>

BlockSenderListResponse object {id, comments, created\_at, 5 more }

A blocked sender pattern.

</summary>

id: optional string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(model)%20block_sender_list_response%20%3E%20(schema)>)

<details>

<summary>

BlockSenderGetResponse object {id, comments, created\_at, 5 more }

A blocked sender pattern.

</summary>

id: optional string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(model)%20block_sender_get_response%20%3E%20(schema)>)

<details>

<summary>

BlockSenderCreateResponse object {id, comments, created\_at, 5 more }

A blocked sender pattern.

</summary>

id: optional string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(model)%20block_sender_create_response%20%3E%20(schema)>)

<details>

<summary>

BlockSenderEditResponse object {id, comments, created\_at, 5 more }

A blocked sender pattern.

</summary>

id: optional string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(model)%20block_sender_edit_response%20%3E%20(schema)>)

<details>

<summary>

BlockSenderDeleteResponse object {id }

</summary>

id: string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(model)%20block_sender_delete_response%20%3E%20(schema)>)

<details>

<summary>

BlockSenderBatchResponse object {deletes, patches, posts, puts }

</summary>

<details>

<summary>

deletes: optional array of object {id }

</summary>

id: string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

patches: optional array of object {id, comments, created\_at, 5 more }

</summary>

id: optional string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

posts: optional array of object {id, comments, created\_at, 5 more }

</summary>

id: optional string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

puts: optional array of object {id, comments, created\_at, 5 more }

</summary>

id: optional string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(model)%20block_sender_batch_response%20%3E%20(schema)>)

#### SettingsContent Policies

##### [List content policies](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/content_policies/methods/list)

GET/accounts/{account\_id}/email-security/settings/content\_policies

##### [Get a content policy](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/content_policies/methods/get)

GET/accounts/{account\_id}/email-security/settings/content\_policies/{policy\_id}

##### [Create a content policy](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/content_policies/methods/create)

POST/accounts/{account\_id}/email-security/settings/content\_policies

##### [Update a content policy](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/content_policies/methods/edit)

PATCH/accounts/{account\_id}/email-security/settings/content\_policies/{policy\_id}

##### [Delete a content policy](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/content_policies/methods/delete)

DELETE/accounts/{account\_id}/email-security/settings/content\_policies/{policy\_id}

##### [Batch content policy operations](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/content_policies/methods/batch)

POST/accounts/{account\_id}/email-security/settings/content\_policies/batch

##### ModelsExpand Collapse

<details>

<summary>

ContentPolicyListResponse object {id, created\_at, enabled, 5 more }

A content policy pattern that matches against the subject or body of an email.

</summary>

id: optional string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength256

minLength1

<a href="#">Link to this property</a>

notes: optional string

maxLength4096

<a href="#">Link to this property</a>

pattern: optional string

maxLength2048

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

targets: optional array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(model)%20content_policy_list_response%20%3E%20(schema)>)

<details>

<summary>

ContentPolicyGetResponse object {id, created\_at, enabled, 5 more }

A content policy pattern that matches against the subject or body of an email.

</summary>

id: optional string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength256

minLength1

<a href="#">Link to this property</a>

notes: optional string

maxLength4096

<a href="#">Link to this property</a>

pattern: optional string

maxLength2048

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

targets: optional array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(model)%20content_policy_get_response%20%3E%20(schema)>)

<details>

<summary>

ContentPolicyCreateResponse object {id, created\_at, enabled, 5 more }

A content policy pattern that matches against the subject or body of an email.

</summary>

id: optional string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength256

minLength1

<a href="#">Link to this property</a>

notes: optional string

maxLength4096

<a href="#">Link to this property</a>

pattern: optional string

maxLength2048

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

targets: optional array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(model)%20content_policy_create_response%20%3E%20(schema)>)

<details>

<summary>

ContentPolicyEditResponse object {id, created\_at, enabled, 5 more }

A content policy pattern that matches against the subject or body of an email.

</summary>

id: optional string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength256

minLength1

<a href="#">Link to this property</a>

notes: optional string

maxLength4096

<a href="#">Link to this property</a>

pattern: optional string

maxLength2048

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

targets: optional array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(model)%20content_policy_edit_response%20%3E%20(schema)>)

<details>

<summary>

ContentPolicyDeleteResponse object {id }

</summary>

id: string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(model)%20content_policy_delete_response%20%3E%20(schema)>)

<details>

<summary>

ContentPolicyBatchResponse object {deletes, patches, posts, puts }

</summary>

<details>

<summary>

deletes: optional array of object {id }

</summary>

id: string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

patches: optional array of object {id, created\_at, enabled, 5 more }

</summary>

id: optional string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength256

minLength1

<a href="#">Link to this property</a>

notes: optional string

maxLength4096

<a href="#">Link to this property</a>

pattern: optional string

maxLength2048

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

targets: optional array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

posts: optional array of object {id, created\_at, enabled, 5 more }

</summary>

id: optional string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength256

minLength1

<a href="#">Link to this property</a>

notes: optional string

maxLength4096

<a href="#">Link to this property</a>

pattern: optional string

maxLength2048

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

targets: optional array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

puts: optional array of object {id, created\_at, enabled, 5 more }

</summary>

id: optional string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength256

minLength1

<a href="#">Link to this property</a>

notes: optional string

maxLength4096

<a href="#">Link to this property</a>

pattern: optional string

maxLength2048

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

targets: optional array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(model)%20content_policy_batch_response%20%3E%20(schema)>)

#### SettingsDomains

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

#### SettingsImpersonation Registry

##### [List entries in impersonation registry](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/impersonation_registry/methods/list)

GET/accounts/{account\_id}/email-security/settings/impersonation\_registry

##### [Get an impersonation registry entry](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/impersonation_registry/methods/get)

GET/accounts/{account\_id}/email-security/settings/impersonation\_registry/{impersonation\_registry\_id}

##### [Create impersonation registry entry](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/impersonation_registry/methods/create)

POST/accounts/{account\_id}/email-security/settings/impersonation\_registry

##### [Update an impersonation registry entry](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/impersonation_registry/methods/edit)

PATCH/accounts/{account\_id}/email-security/settings/impersonation\_registry/{impersonation\_registry\_id}

##### [Delete an impersonation registry entry](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/impersonation_registry/methods/delete)

DELETE/accounts/{account\_id}/email-security/settings/impersonation\_registry/{impersonation\_registry\_id}

##### ModelsExpand Collapse

<details>

<summary>

ImpersonationRegistryListResponse object {id, comments, created\_at, 9 more }

An impersonation registry entry.

</summary>

id: optional string

Impersonation registry entry identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

directory\_id: optional number

<a href="#">Link to this property</a>

directory\_node\_id: optional number

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

Deprecatedexternal\_directory\_node\_id: optional string

This field is deprecated.

<a href="#">Link to this property</a>

is\_email\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

provenance: optional "A1S\_INTERNAL"or "SNOOPY-CASB\_OFFICE\_365"or "SNOOPY-OFFICE\_365"or "SNOOPY-GOOGLE\_DIRECTORY"

</summary>

One of the following:

"A1S\_INTERNAL"

<a href="#">Link to this property</a>

"SNOOPY-CASB\_OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-GOOGLE\_DIRECTORY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(model)%20impersonation_registry_list_response%20%3E%20(schema)>)

<details>

<summary>

ImpersonationRegistryGetResponse object {id, comments, created\_at, 9 more }

An impersonation registry entry.

</summary>

id: optional string

Impersonation registry entry identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

directory\_id: optional number

<a href="#">Link to this property</a>

directory\_node\_id: optional number

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

Deprecatedexternal\_directory\_node\_id: optional string

This field is deprecated.

<a href="#">Link to this property</a>

is\_email\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

provenance: optional "A1S\_INTERNAL"or "SNOOPY-CASB\_OFFICE\_365"or "SNOOPY-OFFICE\_365"or "SNOOPY-GOOGLE\_DIRECTORY"

</summary>

One of the following:

"A1S\_INTERNAL"

<a href="#">Link to this property</a>

"SNOOPY-CASB\_OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-GOOGLE\_DIRECTORY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(model)%20impersonation_registry_get_response%20%3E%20(schema)>)

<details>

<summary>

ImpersonationRegistryCreateResponse object {id, comments, created\_at, 9 more }

An impersonation registry entry.

</summary>

id: optional string

Impersonation registry entry identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

directory\_id: optional number

<a href="#">Link to this property</a>

directory\_node\_id: optional number

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

Deprecatedexternal\_directory\_node\_id: optional string

This field is deprecated.

<a href="#">Link to this property</a>

is\_email\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

provenance: optional "A1S\_INTERNAL"or "SNOOPY-CASB\_OFFICE\_365"or "SNOOPY-OFFICE\_365"or "SNOOPY-GOOGLE\_DIRECTORY"

</summary>

One of the following:

"A1S\_INTERNAL"

<a href="#">Link to this property</a>

"SNOOPY-CASB\_OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-GOOGLE\_DIRECTORY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(model)%20impersonation_registry_create_response%20%3E%20(schema)>)

<details>

<summary>

ImpersonationRegistryEditResponse object {id, comments, created\_at, 9 more }

An impersonation registry entry.

</summary>

id: optional string

Impersonation registry entry identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

directory\_id: optional number

<a href="#">Link to this property</a>

directory\_node\_id: optional number

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

Deprecatedexternal\_directory\_node\_id: optional string

This field is deprecated.

<a href="#">Link to this property</a>

is\_email\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

provenance: optional "A1S\_INTERNAL"or "SNOOPY-CASB\_OFFICE\_365"or "SNOOPY-OFFICE\_365"or "SNOOPY-GOOGLE\_DIRECTORY"

</summary>

One of the following:

"A1S\_INTERNAL"

<a href="#">Link to this property</a>

"SNOOPY-CASB\_OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-OFFICE\_365"

<a href="#">Link to this property</a>

"SNOOPY-GOOGLE\_DIRECTORY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(model)%20impersonation_registry_edit_response%20%3E%20(schema)>)

<details>

<summary>

ImpersonationRegistryDeleteResponse object {id }

</summary>

id: string

Impersonation registry entry identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.impersonation_registry%20%3E%20(model)%20impersonation_registry_delete_response%20%3E%20(schema)>)

#### SettingsSending Domain Restrictions

##### [List sending domain restrictions](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/sending_domain_restrictions/methods/list)

GET/accounts/{account\_id}/email-security/settings/sending\_domain\_restrictions

##### [Get a sending domain restriction](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/sending_domain_restrictions/methods/get)

GET/accounts/{account\_id}/email-security/settings/sending\_domain\_restrictions/{sending\_domain\_restriction\_id}

##### [Create a sending domain restriction](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/sending_domain_restrictions/methods/create)

POST/accounts/{account\_id}/email-security/settings/sending\_domain\_restrictions

##### [Update a sending domain restriction](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/sending_domain_restrictions/methods/edit)

PATCH/accounts/{account\_id}/email-security/settings/sending\_domain\_restrictions/{sending\_domain\_restriction\_id}

##### [Delete a sending domain restriction](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/sending_domain_restrictions/methods/delete)

DELETE/accounts/{account\_id}/email-security/settings/sending\_domain\_restrictions/{sending\_domain\_restriction\_id}

##### ModelsExpand Collapse

<details>

<summary>

SendingDomainRestrictionListResponse object {id, comments, created\_at, 4 more }

A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, the system drops mail without TLS from the specified domain.

</summary>

id: optional string

Sending domain restriction identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

domain: optional string

Domain that requires TLS enforcement.

<a href="#">Link to this property</a>

exclude: optional array of string

Subdomains to exempt from TLS requirements.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(model)%20sending_domain_restriction_list_response%20%3E%20(schema)>)

<details>

<summary>

SendingDomainRestrictionGetResponse object {id, comments, created\_at, 4 more }

A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, the system drops mail without TLS from the specified domain.

</summary>

id: optional string

Sending domain restriction identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

domain: optional string

Domain that requires TLS enforcement.

<a href="#">Link to this property</a>

exclude: optional array of string

Subdomains to exempt from TLS requirements.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(model)%20sending_domain_restriction_get_response%20%3E%20(schema)>)

<details>

<summary>

SendingDomainRestrictionCreateResponse object {id, comments, created\_at, 4 more }

A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, the system drops mail without TLS from the specified domain.

</summary>

id: optional string

Sending domain restriction identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

domain: optional string

Domain that requires TLS enforcement.

<a href="#">Link to this property</a>

exclude: optional array of string

Subdomains to exempt from TLS requirements.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(model)%20sending_domain_restriction_create_response%20%3E%20(schema)>)

<details>

<summary>

SendingDomainRestrictionEditResponse object {id, comments, created\_at, 4 more }

A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, the system drops mail without TLS from the specified domain.

</summary>

id: optional string

Sending domain restriction identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

domain: optional string

Domain that requires TLS enforcement.

<a href="#">Link to this property</a>

exclude: optional array of string

Subdomains to exempt from TLS requirements.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(model)%20sending_domain_restriction_edit_response%20%3E%20(schema)>)

<details>

<summary>

SendingDomainRestrictionDeleteResponse object {id }

</summary>

id: string

Sending domain restriction identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(model)%20sending_domain_restriction_delete_response%20%3E%20(schema)>)

#### SettingsTrusted Domains

##### [List trusted email domains](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/trusted_domains/methods/list)

GET/accounts/{account\_id}/email-security/settings/trusted\_domains

##### [Get a trusted email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/trusted_domains/methods/get)

GET/accounts/{account\_id}/email-security/settings/trusted\_domains/{trusted\_domain\_id}

##### [Create trusted email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/trusted_domains/methods/create)

POST/accounts/{account\_id}/email-security/settings/trusted\_domains

##### [Update a trusted email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/trusted_domains/methods/edit)

PATCH/accounts/{account\_id}/email-security/settings/trusted\_domains/{trusted\_domain\_id}

##### [Delete a trusted email domain](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/trusted_domains/methods/delete)

DELETE/accounts/{account\_id}/email-security/settings/trusted\_domains/{trusted\_domain\_id}

##### [Batch trusted domains operations](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/trusted_domains/methods/batch)

POST/accounts/{account\_id}/email-security/settings/trusted\_domains/batch

##### ModelsExpand Collapse

<details>

<summary>

TrustedDomainListResponse object {id, comments, created\_at, 6 more }

A trusted email domain.

</summary>

id: optional string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_recent: optional boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

is\_similarity: optional boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

maxLength1024

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(model)%20trusted_domain_list_response%20%3E%20(schema)>)

<details>

<summary>

TrustedDomainGetResponse object {id, comments, created\_at, 6 more }

A trusted email domain.

</summary>

id: optional string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_recent: optional boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

is\_similarity: optional boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

maxLength1024

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(model)%20trusted_domain_get_response%20%3E%20(schema)>)

<details>

<summary>

TrustedDomainCreateResponse object {id, comments, created\_at, 6 more }

A trusted email domain.

</summary>

id: optional string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_recent: optional boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

is\_similarity: optional boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

maxLength1024

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(model)%20trusted_domain_create_response%20%3E%20(schema)>)

<details>

<summary>

TrustedDomainEditResponse object {id, comments, created\_at, 6 more }

A trusted email domain.

</summary>

id: optional string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_recent: optional boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

is\_similarity: optional boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

maxLength1024

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(model)%20trusted_domain_edit_response%20%3E%20(schema)>)

<details>

<summary>

TrustedDomainDeleteResponse object {id }

</summary>

id: string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(model)%20trusted_domain_delete_response%20%3E%20(schema)>)

<details>

<summary>

TrustedDomainBatchResponse object {deletes, patches, posts, puts }

</summary>

<details>

<summary>

deletes: optional array of object {id }

</summary>

id: string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

patches: optional array of object {id, comments, created\_at, 6 more }

</summary>

id: optional string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_recent: optional boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

is\_similarity: optional boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

maxLength1024

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

posts: optional array of object {id, comments, created\_at, 6 more }

</summary>

id: optional string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_recent: optional boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

is\_similarity: optional boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

maxLength1024

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

puts: optional array of object {id, comments, created\_at, 6 more }

</summary>

id: optional string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_recent: optional boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

is\_similarity: optional boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

maxLength1024

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(model)%20trusted_domain_batch_response%20%3E%20(schema)>)

#### SettingsURL Ignore Patterns

##### [List URL ignore patterns](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/url_ignore_patterns/methods/list)

GET/accounts/{account\_id}/email-security/settings/url\_ignore\_patterns

##### [Get a URL ignore pattern](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/url_ignore_patterns/methods/get)

GET/accounts/{account\_id}/email-security/settings/url\_ignore\_patterns/{pattern\_id}

##### [Create a URL ignore pattern](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/url_ignore_patterns/methods/create)

POST/accounts/{account\_id}/email-security/settings/url\_ignore\_patterns

##### [Update a URL ignore pattern](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/url_ignore_patterns/methods/edit)

PATCH/accounts/{account\_id}/email-security/settings/url\_ignore\_patterns/{pattern\_id}

##### [Delete a URL ignore pattern](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/url_ignore_patterns/methods/delete)

DELETE/accounts/{account\_id}/email-security/settings/url\_ignore\_patterns/{pattern\_id}

##### ModelsExpand Collapse

<details>

<summary>

URLIgnorePatternListResponse object {id, created\_at, pattern, 3 more }

A URL ignore pattern that exempts matching URLs from Email Security’s URL rewriting.

</summary>

id: string

URL ignore pattern identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

pattern: string

Regular expression identifying URLs to exempt from rewriting.

maxLength1024

minLength1

<a href="#">Link to this property</a>

comments: optional string

Optional note describing the reason for the ignore pattern.

maxLength1024

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(model)%20url_ignore_pattern_list_response%20%3E%20(schema)>)

<details>

<summary>

URLIgnorePatternGetResponse object {id, created\_at, pattern, 3 more }

A URL ignore pattern that exempts matching URLs from Email Security’s URL rewriting.

</summary>

id: string

URL ignore pattern identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

pattern: string

Regular expression identifying URLs to exempt from rewriting.

maxLength1024

minLength1

<a href="#">Link to this property</a>

comments: optional string

Optional note describing the reason for the ignore pattern.

maxLength1024

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(model)%20url_ignore_pattern_get_response%20%3E%20(schema)>)

<details>

<summary>

URLIgnorePatternCreateResponse object {id, created\_at, pattern, 3 more }

A URL ignore pattern that exempts matching URLs from Email Security’s URL rewriting.

</summary>

id: string

URL ignore pattern identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

pattern: string

Regular expression identifying URLs to exempt from rewriting.

maxLength1024

minLength1

<a href="#">Link to this property</a>

comments: optional string

Optional note describing the reason for the ignore pattern.

maxLength1024

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(model)%20url_ignore_pattern_create_response%20%3E%20(schema)>)

<details>

<summary>

URLIgnorePatternEditResponse object {id, created\_at, pattern, 3 more }

A URL ignore pattern that exempts matching URLs from Email Security’s URL rewriting.

</summary>

id: string

URL ignore pattern identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

pattern: string

Regular expression identifying URLs to exempt from rewriting.

maxLength1024

minLength1

<a href="#">Link to this property</a>

comments: optional string

Optional note describing the reason for the ignore pattern.

maxLength1024

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(model)%20url_ignore_pattern_edit_response%20%3E%20(schema)>)

<details>

<summary>

URLIgnorePatternDeleteResponse object {id }

</summary>

id: string

URL ignore pattern identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(model)%20url_ignore_pattern_delete_response%20%3E%20(schema)>)