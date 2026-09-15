---
title: Sending Domain Restrictions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Sending Domain Restrictions

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