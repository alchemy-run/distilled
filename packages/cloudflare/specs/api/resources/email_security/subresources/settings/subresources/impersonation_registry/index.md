---
title: Impersonation Registry
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Impersonation Registry

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