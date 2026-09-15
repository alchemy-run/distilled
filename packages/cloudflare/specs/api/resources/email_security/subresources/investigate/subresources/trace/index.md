---
title: Trace
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Trace

##### [Get email trace](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/trace/methods/get)

GET/accounts/{account\_id}/email-security/investigate/{investigate\_id}/trace

##### ModelsExpand Collapse

<details>

<summary>

TraceGetResponse object {inbound, outbound }

</summary>

<details>

<summary>

inbound: object {lines, pending }

</summary>

<details>

<summary>

lines: optional array of object {lineno, logged\_at, message, ts }

</summary>

lineno: optional number

Line number in the trace log.

<a href="#">Link to this property</a>

logged\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

Deprecatedts: optional string

Use <code>logged_at</code> instead.

Deprecated, use <code>logged_at</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

pending: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

outbound: object {lines, pending }

</summary>

<details>

<summary>

lines: optional array of object {lineno, logged\_at, message, ts }

</summary>

lineno: optional number

Line number in the trace log.

<a href="#">Link to this property</a>

logged\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

Deprecatedts: optional string

Use <code>logged_at</code> instead.

Deprecated, use <code>logged_at</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

pending: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.trace%20%3E%20(model)%20trace_get_response%20%3E%20(schema)>)