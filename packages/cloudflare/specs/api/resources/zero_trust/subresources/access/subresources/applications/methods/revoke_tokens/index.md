---
title: Revoke application tokens
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Revoke application tokens

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/revoke\_tokens

Revokes all tokens issued for an application.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Access: Apps and Policies Revoke``Access: Apps and Policies Write`

##### P ath ParametersExpand Collapse

app\_id: [AppID](<https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20app_id%20%3E%20(schema)>)

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.access.applications%20%3E%20(method)%20revoke_tokens%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20zero_trust.access.applications%20%3E%20(method)%20revoke_tokens%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20zero_trust.access.applications%20%3E%20(method)%20revoke_tokens%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

result: optional unknown

[Link to this property](#)%20zero_trust.access.applications%20%3E%20(method)%20revoke_tokens%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

success: optional trueor false

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications%20%3E%20(method)%20revoke_tokens%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Revoke application tokens

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/apps/$APP_ID/revoke_tokens \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {},
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {},
  "success": true
}
```