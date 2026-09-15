---
title: Trusted Domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Trusted Domains

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