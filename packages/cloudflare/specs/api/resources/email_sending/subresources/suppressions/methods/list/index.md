---
title: List account Email Sending suppressions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

[Suppressions](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List account Email Sending suppressions

GET/accounts/{account\_id}/email/sending/suppressions

Lists every active Email Sending suppression owned by the account, including legacy rows with internal zone memberships.

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

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Opaque pagination cursor returned as `result_info.next_cursor`. It carries the filters that produced it.

maxLength2048

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

email: optional string

Exact email-address filter.

formatemail

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20email%20%3E%20(schema)>)

per\_page: optional number

Maximum number of suppressions to return per page.

maximum1000

minimum1

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

reason: optional "manual"or "complaint"or "hard\_bounce"or 2 more

Filter to suppressions with this reason.

</summary>

One of the following:

"manual"

<a href="#">Link to this property</a>

"complaint"

<a href="#">Link to this property</a>

"hard\_bounce"

<a href="#">Link to this property</a>

"soft\_bounce"

<a href="#">Link to this property</a>

"policy"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20reason%20%3E%20(schema)>)

search: optional string

A complete address is an exact match; a value ending in `@` matches that username across every domain. Prefix searches may return short intermediate pages while the bounded account scan advances.

maxLength320

minLength1

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, created\_at, email, 4 more }

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

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, next\_cursor, per\_page }

Pagination metadata.

</summary>

count: number

Number of suppressions in this page.

<a href="#">Link to this property</a>

next\_cursor: string

Opaque cursor for the next page. Pass it back as the <code>cursor</code> query parameter and continue until it is <code>null</code>. A bounded large-account scan may return a short intermediate page.

<a href="#">Link to this property</a>

per\_page: number

Maximum number of suppressions requested per page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List account Email Sending suppressions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/sending/suppressions \
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
  "result": [
    {
      "id": "396a5436-d4b0-42a6-b3fc-48e8fa522321",
      "created_at": "2026-01-02T02:20:00Z",
      "email": "user@example.com",
      "expires_at": "2027-01-01T00:00:00Z",
      "read_only": false,
      "reason": "hard_bounce",
      "note": "Imported from CRM"
    }
  ],
  "result_info": {
    "count": 1,
    "next_cursor": null,
    "per_page": 100
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
  "result": [
    {
      "id": "396a5436-d4b0-42a6-b3fc-48e8fa522321",
      "created_at": "2026-01-02T02:20:00Z",
      "email": "user@example.com",
      "expires_at": "2027-01-01T00:00:00Z",
      "read_only": false,
      "reason": "hard_bounce",
      "note": "Imported from CRM"
    }
  ],
  "result_info": {
    "count": 1,
    "next_cursor": null,
    "per_page": 100
  },
  "success": true
}
```