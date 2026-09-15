---
title: URL Ignore Patterns
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# URL Ignore Patterns

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