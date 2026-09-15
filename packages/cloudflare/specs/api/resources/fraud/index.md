---
title: Fraud
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fraud

##### [Get Fraud Detection Settings](https://developers.cloudflare.com/api/resources/fraud/methods/get)

GET/zones/{zone\_id}/fraud\_detection/settings

##### [Update Fraud Detection Settings](https://developers.cloudflare.com/api/resources/fraud/methods/update)

PUT/zones/{zone\_id}/fraud\_detection/settings

##### ModelsExpand Collapse

<details>

<summary>

FraudSettings object {authentication\_settings, user\_profiles, username\_expressions }

</summary>

<details>

<summary>

authentication\_settings: optional object {failure\_criteria, success\_criteria }

Configuration for classifying login authentication outcomes based on the origin response. Requires <code>user_profiles</code> to be enabled.

- Success and failure criteria are independently updatable — sending only <code>success_criteria</code> leaves failure codes untouched, and vice versa.
- Omit <code>authentication_settings</code> entirely to leave both unchanged.
- Status codes must not overlap between success and failure criteria.

</summary>

<details>

<summary>

failure\_criteria: optional object {kind, status\_codes }

Criterion for identifying failed login responses.

</summary>

kind: "status\_code"

The type of criterion. Currently only <code>status_code</code> is supported.

<a href="#">Link to this property</a>

status\_codes: optional array of number

HTTP status codes to match against the origin response.

- Maximum of 10 codes per criterion.
- Each code must be a valid HTTP status code (100-599).
- Codes are deduplicated and sorted on save.
- Omit to leave unchanged on update.
- Provide an empty array <code>[]</code> to clear codes on update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

success\_criteria: optional object {kind, status\_codes }

Criterion for identifying successful login responses.

</summary>

kind: "status\_code"

The type of criterion. Currently only <code>status_code</code> is supported.

<a href="#">Link to this property</a>

status\_codes: optional array of number

HTTP status codes to match against the origin response.

- Maximum of 10 codes per criterion.
- Each code must be a valid HTTP status code (100-599).
- Codes are deduplicated and sorted on save.
- Omit to leave unchanged on update.
- Provide an empty array <code>[]</code> to clear codes on update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user\_profiles: optional "enabled"or "disabled"

Whether Fraud User Profiles is enabled for the zone.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username\_expressions: optional array of string

List of expressions to detect usernames in write HTTP requests.

- Maximum of 10 expressions.
- Omit or set to null to leave unchanged on update.
- Provide an empty array <code>[]</code> to clear all expressions on update.
- Invalid expressions will result in a 10400 Bad Request with details in the <code>messages</code> array.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20fraud%20%3E%20(model)%20fraud_settings%20%3E%20(schema)>)