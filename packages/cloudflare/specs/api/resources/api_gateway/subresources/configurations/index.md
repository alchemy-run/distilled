---
title: Configurations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Configurations

##### [Get session identifier settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/configurations/methods/get)

GET/zones/{zone\_id}/api\_gateway/configuration

##### [Update session identifier settings](https://developers.cloudflare.com/api/resources/api_gateway/subresources/configurations/methods/update)

PUT/zones/{zone\_id}/api\_gateway/configuration

##### ModelsExpand Collapse

<details>

<summary>

Configuration object {auth\_id\_characteristics }

</summary>

<details>

<summary>

auth\_id\_characteristics: array of object {name, type } or object {name, type }

</summary>

One of the following:

<details>

<summary>

APIShieldAuthIDCharacteristic object {name, type }

Auth ID Characteristic

</summary>

name: string

The name of the characteristic field, i.e., the header or cookie name.

maxLength128

<a href="#">Link to this property</a>

<details>

<summary>

type: "header"or "cookie"

The type of characteristic.

</summary>

One of the following:

"header"

<a href="#">Link to this property</a>

"cookie"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldAuthIDCharacteristicJWTClaim object {name, type }

Auth ID Characteristic extracted from JWT Token Claims

</summary>

name: string

Claim location expressed as <code>$(token_config_id):$(json_path)</code>, where <code>token_config_id</code> is the ID of the token configuration used in validating the JWT, and <code>json_path</code> is a RFC 9535 JSONPath (<a href="https://goessner.net/articles/JsonPath/">https://goessner.net/articles/JsonPath/</a>, <a href="https://www.rfc-editor.org/rfc/rfc9535.html">https://www.rfc-editor.org/rfc/rfc9535.html</a>). The JSONPath expression may be in dot or bracket notation, may only specify literal keys or array indexes, and must return a singleton value, which will be interpreted as a string.

maxLength128

<a href="#">Link to this property</a>

type: "jwt"

The type of characteristic.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.configurations%20%3E%20(model)%20configuration%20%3E%20(schema)>)