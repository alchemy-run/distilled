---
title: Payload Logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Payload Logs

##### [Get payload log settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/payload_logs/methods/get)

GET/accounts/{account\_id}/dlp/payload\_log

##### [Set payload log settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/payload_logs/methods/update)

PUT/accounts/{account\_id}/dlp/payload\_log

##### ModelsExpand Collapse

<details>

<summary>

PayloadLogGetResponse object {updated\_at, masking\_level, public\_key }

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

[Link to this property](#)%20zero_trust.dlp.payload_logs%20%3E%20(model)%20payload_log_get_response%20%3E%20(schema)>)

<details>

<summary>

PayloadLogUpdateResponse object {updated\_at, masking\_level, public\_key }

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

[Link to this property](#)%20zero_trust.dlp.payload_logs%20%3E%20(model)%20payload_log_update_response%20%3E%20(schema)>)