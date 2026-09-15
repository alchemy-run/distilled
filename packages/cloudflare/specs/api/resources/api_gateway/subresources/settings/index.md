---
title: Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Settings

##### ModelsExpand Collapse

<details>

<summary>

Settings object {validation\_default\_mitigation\_action, validation\_override\_mitigation\_action }

</summary>

<details>

<summary>

validation\_default\_mitigation\_action: optional "none"or "log"or "block"

The default mitigation action used when there is no mitigation action defined on the operation

Mitigation actions are as follows:

- <code>log</code> - log request when request does not conform to schema
- <code>block</code> - deny access to the site when request does not conform to schema

A special value of of <code>none</code> will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validation\_override\_mitigation\_action: optional "none"

When set, this overrides both zone level and operation level mitigation actions.

- <code>none</code> will skip running schema validation entirely for the request
- <code>null</code> indicates that no override is in place

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.settings%20%3E%20(model)%20settings%20%3E%20(schema)>)

#### SettingsSchema Validation

##### [Retrieve zone level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/settings/subresources/schema_validation/methods/get)

Deprecated

GET/zones/{zone\_id}/api\_gateway/settings/schema\_validation

##### [Update zone level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/settings/subresources/schema_validation/methods/update)

Deprecated

PUT/zones/{zone\_id}/api\_gateway/settings/schema\_validation

##### [Update zone level schema validation settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/settings/subresources/schema_validation/methods/edit)

Deprecated

PATCH/zones/{zone\_id}/api\_gateway/settings/schema\_validation