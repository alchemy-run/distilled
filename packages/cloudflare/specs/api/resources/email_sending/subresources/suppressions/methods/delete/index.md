---
title: Delete account Email Sending suppression
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

[Suppressions](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete account Email Sending suppression

DELETE/accounts/{account\_id}/email/sending/suppressions/{suppression\_id}

Deletes the suppression, its note, and every legacy internal zone membership, allowing future delivery attempts to the address.

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

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

suppression\_id: string

The suppression’s identifier.

formatuuid

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20suppression_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id }

</summary>

id: string

The suppression’s identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete account Email Sending suppression

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/sending/suppressions/$SUPPRESSION_ID \
    -X DELETE \
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