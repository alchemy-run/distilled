---
title: Logging
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Logging

##### [Get logging settings for the Zero Trust account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/logging/methods/get)

GET/accounts/{account\_id}/gateway/logging

##### [Update Zero Trust account logging settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/logging/methods/update)

PUT/accounts/{account\_id}/gateway/logging

##### ModelsExpand Collapse

<details>

<summary>

LoggingSetting object {redact\_pii, settings\_by\_rule\_type }

</summary>

redact\_pii: optional boolean

Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, device ID, URL, referrer, and user agent).

<a href="#">Link to this property</a>

<details>

<summary>

settings\_by\_rule\_type: optional object {dns, http, l4 }

Configure logging settings for each rule type.

</summary>

<details>

<summary>

dns: optional object {log\_all, log\_blocks }

Configure logging settings for DNS firewall.

</summary>

log\_all: optional boolean

Specify whether to log all requests to this service.

<a href="#">Link to this property</a>

log\_blocks: optional boolean

Specify whether to log only blocking requests to this service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http: optional object {log\_all, log\_blocks }

Configure logging settings for HTTP/HTTPS firewall.

</summary>

log\_all: optional boolean

Specify whether to log all requests to this service.

<a href="#">Link to this property</a>

log\_blocks: optional boolean

Specify whether to log only blocking requests to this service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

l4: optional object {log\_all, log\_blocks }

Configure logging settings for Network firewall.

</summary>

log\_all: optional boolean

Specify whether to log all requests to this service.

<a href="#">Link to this property</a>

log\_blocks: optional boolean

Specify whether to log only blocking requests to this service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.logging%20%3E%20(model)%20logging_setting%20%3E%20(schema)>)