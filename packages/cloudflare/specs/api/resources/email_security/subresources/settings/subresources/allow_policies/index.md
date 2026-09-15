---
title: Allow Policies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Allow Policies

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