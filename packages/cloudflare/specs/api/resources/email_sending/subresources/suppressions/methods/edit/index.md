---
title: Update account Email Sending suppression
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

[Suppressions](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update account Email Sending suppression

PATCH/accounts/{account\_id}/email/sending/suppressions/{suppression\_id}

Updates expiry or advisory note fields without changing legacy internal zone memberships.

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

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID.

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

suppression\_id: string

The suppression’s identifier.

formatuuid

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20suppression_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

expires\_at: optional string

New expiry. Send `null` to make the suppression permanent; omit to leave it unchanged.

formatdate-time

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20expires_at%20%3E%20(schema)>)

note: optional string

Replacement advisory note. Send an empty string to clear it; omit to leave it unchanged.

maxLength1000

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20note%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, created\_at, email, 4 more }

</summary>

id: string

Unique identifier for this suppression.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the suppression was created.

formatdate-time

<a href="#">Link to this property</a>

email: string

The suppressed email address.

formatemail

<a href="#">Link to this property</a>

expires\_at: string

When the suppression expires. Null for a permanent suppression.

formatdate-time

<a href="#">Link to this property</a>

read\_only: boolean

Whether clients may mutate this suppression. This is determined by the server and must not be inferred from <code>reason</code>.

<a href="#">Link to this property</a>

reason: string

Why the address is suppressed: <code>manual</code>, <code>complaint</code>, <code>hard_bounce</code>, <code>soft_bounce</code>, or <code>policy</code>.

<a href="#">Link to this property</a>

note: optional string

Advisory note for this suppression, if any.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update account Email Sending suppression

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/sending/suppressions/$SUPPRESSION_ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {}
  ],
  "messages": [
    {}
  ],
  "result": {
    "id": "396a5436-d4b0-42a6-b3fc-48e8fa522321",
    "created_at": "2026-01-02T02:20:00Z",
    "email": "user@example.com",
    "expires_at": "2027-01-01T00:00:00Z",
    "read_only": false,
    "reason": "hard_bounce",
    "note": "Imported from CRM"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {}
  ],
  "messages": [
    {}
  ],
  "result": {
    "id": "396a5436-d4b0-42a6-b3fc-48e8fa522321",
    "created_at": "2026-01-02T02:20:00Z",
    "email": "user@example.com",
    "expires_at": "2027-01-01T00:00:00Z",
    "read_only": false,
    "reason": "hard_bounce",
    "note": "Imported from CRM"
  },
  "success": true
}
```