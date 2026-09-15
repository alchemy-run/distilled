---
title: Revoke all Access tokens for a user
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Organizations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/organizations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Revoke all Access tokens for a user

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/organizations/revoke\_user

Revokes a user’s access across all applications.

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

`Access: Organizations, Identity Providers, and Groups Write`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

devices: optional boolean

When set to `true`, all devices associated with the user will be revoked.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(params)%20default%20%3E%20(param)%20devices%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

email: string

The email of the user to revoke.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(params)%200%20%3E%20(param)%20email%20%3E%20(schema)>)

devices: optional boolean

When set to `true`, all devices associated with the user will be revoked.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(params)%200%20%3E%20(param)%20devices%20%3E%20(schema)>)

user\_uid: optional string

The uuid of the user to revoke.

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(params)%200%20%3E%20(param)%20user_uid%20%3E%20(schema)>)

warp\_session\_reauth: optional boolean

When set to `true`, the user will be required to re-authenticate to WARP for all Gateway policies that enforce a WARP client session duration. When `false`, the user’s WARP session will remain active

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(params)%200%20%3E%20(param)%20warp_session_reauth%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: optional trueor false

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20zero_trust.organizations%20%3E%20(method)%20revoke_users%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Revoke all Access tokens for a user

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/organizations/revoke_user \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "test@example.com",
          "devices": true,
          "user_uid": "699d98642c564d2e855e9661899b7252",
          "warp_session_reauth": true
        }'
```

200 example

```
{
  "result": true,
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": true,
  "success": true
}
```