---
title: Service Tokens
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Service Tokens

##### [List service tokens](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/service\_tokens

##### [Get a service token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/service\_tokens/{service\_token\_id}

##### [Create a service token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/service\_tokens

##### [Update a service token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/service\_tokens/{service\_token\_id}

##### [Delete a service token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/service\_tokens/{service\_token\_id}

##### [Refresh a service token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/refresh)

POST/accounts/{account\_id}/access/service\_tokens/{service\_token\_id}/refresh

##### [Rotate a service token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens/methods/rotate)

POST/accounts/{account\_id}/access/service\_tokens/{service\_token\_id}/rotate

##### ModelsExpand Collapse

<details>

<summary>

ServiceToken object {id, client\_id, duration, 3 more }

</summary>

id: optional string

The ID of the service token.

maxLength36

<a href="#">Link to this property</a>

client\_id: optional string

The Client ID for the service token. Access will check for this value in the <code>CF-Access-Client-ID</code> request header.

<a href="#">Link to this property</a>

duration: optional string

The duration for how long the service token will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>, or the special value <code>forever</code> for non-expiring tokens. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous <code>client_secret</code> stop being accepted, but the token itself is preserved and can be re-enabled at any time. Defaults to enabled when omitted on create.

<a href="#">Link to this property</a>

expires\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the service token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(model)%20service_token%20%3E%20(schema)>)

<details>

<summary>

ServiceTokenCreateResponse object {id, client\_id, client\_secret, 3 more }

</summary>

id: optional string

The ID of the service token.

<a href="#">Link to this property</a>

client\_id: optional string

The Client ID for the service token. Access will check for this value in the <code>CF-Access-Client-ID</code> request header.

<a href="#">Link to this property</a>

client\_secret: optional string

The Client Secret for the service token. Access will check for this value in the <code>CF-Access-Client-Secret</code> request header.

<a href="#">Link to this property</a>

duration: optional string

The duration for how long the service token will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>, or the special value <code>forever</code> for non-expiring tokens. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous <code>client_secret</code> stop being accepted, but the token itself is preserved and can be re-enabled at any time. Defaults to enabled when omitted on create.

<a href="#">Link to this property</a>

name: optional string

The name of the service token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(model)%20service_token_create_response%20%3E%20(schema)>)

<details>

<summary>

ServiceTokenRotateResponse object {id, client\_id, client\_secret, 3 more }

</summary>

id: optional string

The ID of the service token.

<a href="#">Link to this property</a>

client\_id: optional string

The Client ID for the service token. Access will check for this value in the <code>CF-Access-Client-ID</code> request header.

<a href="#">Link to this property</a>

client\_secret: optional string

The Client Secret for the service token. Access will check for this value in the <code>CF-Access-Client-Secret</code> request header.

<a href="#">Link to this property</a>

duration: optional string

The duration for how long the service token will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>, or the special value <code>forever</code> for non-expiring tokens. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous <code>client_secret</code> stop being accepted, but the token itself is preserved and can be re-enabled at any time. Defaults to enabled when omitted on create.

<a href="#">Link to this property</a>

name: optional string

The name of the service token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(model)%20service_token_rotate_response%20%3E%20(schema)>)