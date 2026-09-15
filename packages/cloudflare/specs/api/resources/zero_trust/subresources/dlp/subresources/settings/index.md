---
title: Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Settings

##### [Get DLP account-level settings.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/settings/methods/get)

GET/accounts/{account\_id}/dlp/settings

##### [Update DLP account-level settings (full replacement).](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/settings/methods/update)

PUT/accounts/{account\_id}/dlp/settings

##### [Partially update DLP account-level settings.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/settings/methods/edit)

PATCH/accounts/{account\_id}/dlp/settings

##### [Delete (reset) DLP account-level settings to initial values.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/settings/methods/delete)

DELETE/accounts/{account\_id}/dlp/settings

##### ModelsExpand Collapse

<details>

<summary>

DLPSettings object {ai\_context\_analysis, ocr, payload\_logging }

DLP account-level settings response.

</summary>

ai\_context\_analysis: boolean

Whether AI context analysis is enabled at the account level.

<a href="#">Link to this property</a>

ocr: boolean

Whether OCR is enabled at the account level.

<a href="#">Link to this property</a>

<details>

<summary>

payload\_logging: object {updated\_at, masking\_level, public\_key }

</summary>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

masking\_level: optional "full"or "partial"or "clear"or "default"

Masking level for payload logs.

- <code>full</code>: The entire payload is masked.
- <code>partial</code>: Only partial payload content is masked.
- <code>clear</code>: No masking is applied to the payload content.
- <code>default</code>: DLP uses its default masking behavior.

</summary>

One of the following:

"full"

<a href="#">Link to this property</a>

"partial"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

public\_key: optional string

Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(model)%20dlp_settings%20%3E%20(schema)>)