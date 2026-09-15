---
title: Bulk import account Email Sending suppressions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

[Suppressions](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bulk import account Email Sending suppressions

POST/accounts/{account\_id}/email/sending/suppressions/bulk

Imports up to 1,000 account-level Email Sending suppressions in one request.

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

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20import%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

items: array of object {email, expires\_at, note }

Suppressions to import. Items with a duplicate email address are deduplicated before processing.

</summary>

email: string

The email address to suppress.

<a href="#">Link to this property</a>

expires\_at: optional string

Expiration timestamp for the suppression. Omit or set to null for a permanent suppression that never expires.

formatdate-time

<a href="#">Link to this property</a>

note: optional string

Advisory note for this suppression. Not enforced or validated beyond length.

maxLength1000

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20import%20%3E%20(params)%200%20%3E%20(param)%20items%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20import%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of unknown

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20import%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {deduplicated, errors, invalid, 4 more }

</summary>

deduplicated: number

Number of items dropped because their email address repeated an earlier item in this request. Counted once and excluded from <code>items</code>.

<a href="#">Link to this property</a>

errors: number

Number of items that failed to import due to an unexpected error.

<a href="#">Link to this property</a>

invalid: number

Number of items with an invalid email address.

<a href="#">Link to this property</a>

<details>

<summary>

items: array of object {index, status, id, 2 more }

Per-item results, in the same order as the request body.

</summary>

index: number

Zero-based index of this item in the request body.

<a href="#">Link to this property</a>

<details>

<summary>

status: "processed"or "invalid"or "error"or "skipped"

Outcome for this item.

</summary>

One of the following:

"processed"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

The created or promoted suppression’s identifier. Present when <code>status</code> is <code>processed</code>.

formatuuid

<a href="#">Link to this property</a>

email: optional string

The submitted email address for this item.

formatemail

<a href="#">Link to this property</a>

error: optional string

Human-readable error message. Present when <code>status</code> is <code>invalid</code>, <code>error</code>, or <code>skipped</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

processed: number

Number of items successfully created or promoted.

<a href="#">Link to this property</a>

skipped: number

Number of items skipped because the existing suppression is not customer-managed (for example, a read-only policy suppression).

<a href="#">Link to this property</a>

total: number

Total number of items in the request body, including duplicates.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20import%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20email_sending.suppressions%20%3E%20(method)%20import%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Bulk import account Email Sending suppressions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/sending/suppressions/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "items": [
            {
              "email": "user@example.com"
            },
            {
              "email": "other@example.com",
              "expires_at": "2027-01-01T00:00:00Z",
              "note": "Imported from CRM"
            }
          ]
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
    "deduplicated": 1,
    "errors": 0,
    "invalid": 1,
    "items": [
      {
        "index": 0,
        "status": "processed",
        "id": "396a5436-d4b0-42a6-b3fc-48e8fa522321",
        "email": "user@example.com",
        "error": "Invalid email"
      }
    ],
    "processed": 2,
    "skipped": 0,
    "total": 4
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
    "deduplicated": 1,
    "errors": 0,
    "invalid": 1,
    "items": [
      {
        "index": 0,
        "status": "processed",
        "id": "396a5436-d4b0-42a6-b3fc-48e8fa522321",
        "email": "user@example.com",
        "error": "Invalid email"
      }
    ],
    "processed": 2,
    "skipped": 0,
    "total": 4
  },
  "success": true
}
```