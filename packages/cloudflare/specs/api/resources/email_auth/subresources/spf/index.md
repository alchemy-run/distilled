---
title: SPF
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Auth](https://developers.cloudflare.com/api/resources/email_auth)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# SPF

#### SPFInspect

##### [Inspect SPF Record](https://developers.cloudflare.com/api/resources/email_auth/subresources/spf/subresources/inspect/methods/get)

GET/zones/{zone\_id}/email/auth/spf/inspect

##### ModelsExpand Collapse

<details>

<summary>

InspectGetResponse object {components, domain, record, 2 more }

Recursive SPF inspection tree

</summary>

components: array of unknown

Parsed SPF components (mechanisms)

<a href="#">Link to this property</a>

domain: string

Domain being inspected

<a href="#">Link to this property</a>

record: string

Raw SPF record content

<a href="#">Link to this property</a>

total\_lookups: number

Total number of DNS lookups performed across all includes

<a href="#">Link to this property</a>

<details>

<summary>

errors: optional array of object {code, domain, message, details }

All errors encountered during inspection, collected from the entire tree. This includes errors from nested includes at any depth, providing a quick overview of all issues without needing to traverse the nested structure. Each error includes a <code>domain</code> field to identify where it occurred. Empty array if no errors (omitted from JSON when empty).

</summary>

code: string

Error code. Known values:

- <code>lookup_failed</code> — DNS TXT lookup failed
- <code>spf_not_found</code> — no SPF record found
- <code>invalid_spf</code> — record does not start with <code>v=spf1</code>
- <code>invalid_domain</code> — PSL validation failed
- <code>loop_detected</code> — include/redirect cycle detected
- <code>invalid_mechanism</code> — unrecognised or malformed mechanism
- <code>resource_limit_exceeded</code> — internal resource protection limits exceeded (recursion depth or query budget)
- <code>max_lookups</code> — RFC 7208 10-lookup limit exceeded

<a href="#">Link to this property</a>

domain: string

Domain where the error occurred

<a href="#">Link to this property</a>

message: string

Human-readable error message

<a href="#">Link to this property</a>

details: optional string

Additional error-specific details (optional).

- For <code>invalid_domain</code> errors: the invalid domain string
- For <code>invalid_mechanism</code> errors: the invalid mechanism text (e.g., “invalidmech123”)
- For <code>loop_detected</code> errors: the domain that caused the loop
- For other error types: not present

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_auth.spf.inspect%20%3E%20(model)%20inspect_get_response%20%3E%20(schema)>)