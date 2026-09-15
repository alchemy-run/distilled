---
title: Content Policies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Content Policies

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