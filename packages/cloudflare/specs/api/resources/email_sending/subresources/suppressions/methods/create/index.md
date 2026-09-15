---
title: Create account Email Sending suppression
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

[Suppressions](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create account Email Sending suppression

POST/accounts/{account\_id}/email/sending/suppressions

Creates an account-wide suppression. If a mutable legacy zone-linked row already exists, it is promoted without changing its identifier.

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

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

email: string

The email address to suppress.

formatemail

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20email%20%3E%20(schema)>)

expires\_at: optional string

Expiration timestamp for the suppression. Omit or set to null for a permanent suppression that never expires.

formatdate-time

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expires_at%20%3E%20(schema)>)

note: optional string

Advisory note for this suppression. Not enforced or validated beyond length.

maxLength1000

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20note%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id }

</summary>

id: string

The suppression’s identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create account Email Sending suppression

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/sending/suppressions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "user@example.com",
          "expires_at": "2027-01-01T00:00:00Z",
          "note": "Imported from CRM"
        }'
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
    "id": "396a5436-d4b0-42a6-b3fc-48e8fa522321"
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
    "id": "396a5436-d4b0-42a6-b3fc-48e8fa522321"
  },
  "success": true
}
```