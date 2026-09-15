---
title: Release
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Release

##### [Release messages from quarantine](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/release/methods/bulk)

POST/accounts/{account\_id}/email-security/investigate/release

##### ModelsExpand Collapse

<details>

<summary>

ReleaseBulkResponse object {id, delivered, failed, 2 more }

</summary>

id: string

Unique identifier for a message retrieved from investigation.

<a href="#">Link to this property</a>

delivered: optional array of string

<a href="#">Link to this property</a>

failed: optional array of string

<a href="#">Link to this property</a>

Deprecatedpostfix\_id: optional string

Use <code>id</code> instead.

Deprecated, use <code>id</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

undelivered: optional array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.release%20%3E%20(model)%20release_bulk_response%20%3E%20(schema)>)