---
title: List Payment Methods
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Payment Methods](https://developers.cloudflare.com/api/resources/accounts/subresources/payment_methods)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Payment Methods

GET/accounts/{account\_id}/payment-methods

Lists all payment methods for an account.

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

`Billing Write``Billing Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20accounts.payment_methods%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20accounts.payment_methods%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of items per page.

minimum1

[Link to this property](#)%20accounts.payment_methods%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, address, address2, 22 more }

</summary>

id: optional string

Payment method identifier.

<a href="#">Link to this property</a>

address: optional string

Billing address line 1.

<a href="#">Link to this property</a>

address2: optional string

Billing address line 2.

<a href="#">Link to this property</a>

bank\_account\_type: optional string

Bank account type.

<a href="#">Link to this property</a>

bank\_code: optional string

Bank code.

<a href="#">Link to this property</a>

bank\_country: optional string

Bank country.

<a href="#">Link to this property</a>

bank\_name: optional string

Bank name for bank-based payment methods.

<a href="#">Link to this property</a>

bank\_routing\_number: optional string

Bank routing number.

<a href="#">Link to this property</a>

cashapp\_cash\_tag: optional string

Cash App cash tag.

<a href="#">Link to this property</a>

city: optional string

Billing city.

<a href="#">Link to this property</a>

country: optional string

Billing country.

<a href="#">Link to this property</a>

default: optional boolean

Whether this is the default payment method.

<a href="#">Link to this property</a>

device\_data: optional string

Device data for fraud prevention.

<a href="#">Link to this property</a>

expiration\_date: optional string

Card expiration date.

<a href="#">Link to this property</a>

first\_name: optional string

Billing first name.

<a href="#">Link to this property</a>

last\_four: optional string

Last four digits of the card number.

<a href="#">Link to this property</a>

last\_name: optional string

Billing last name.

<a href="#">Link to this property</a>

nick\_name: optional string

A nickname for the payment method.

<a href="#">Link to this property</a>

payment\_account\_email: optional string

Email associated with the payment account.

<a href="#">Link to this property</a>

payment\_email: optional string

Payment email address.

<a href="#">Link to this property</a>

payment\_gateway: optional string

The payment gateway used.

<a href="#">Link to this property</a>

payment\_nonce: optional string

Payment nonce for tokenized payments.

<a href="#">Link to this property</a>

state: optional string

Billing state.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CREDIT\_CARD"or "PAYPAL"or "CASHAPP"or 3 more

The payment method type.

</summary>

One of the following:

"CREDIT\_CARD"

<a href="#">Link to this property</a>

"PAYPAL"

<a href="#">Link to this property</a>

"CASHAPP"

<a href="#">Link to this property</a>

"SEPA\_DEBIT"

<a href="#">Link to this property</a>

"LINK"

<a href="#">Link to this property</a>

"ACH\_DIRECT\_DEBIT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zipcode: optional string

Billing zip code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20accounts.payment_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Payment Methods

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/payment-methods \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "id",
      "address": "address",
      "address2": "address2",
      "bank_account_type": "bank_account_type",
      "bank_code": "bank_code",
      "bank_country": "bank_country",
      "bank_name": "bank_name",
      "bank_routing_number": "bank_routing_number",
      "cashapp_cash_tag": "cashapp_cash_tag",
      "city": "city",
      "country": "country",
      "default": true,
      "expiration_date": "expiration_date",
      "first_name": "first_name",
      "last_four": "4242",
      "last_name": "last_name",
      "nick_name": "nick_name",
      "payment_account_email": "payment_account_email",
      "payment_email": "payment_email",
      "state": "state",
      "type": "CREDIT_CARD",
      "zipcode": "zipcode"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "id",
      "address": "address",
      "address2": "address2",
      "bank_account_type": "bank_account_type",
      "bank_code": "bank_code",
      "bank_country": "bank_country",
      "bank_name": "bank_name",
      "bank_routing_number": "bank_routing_number",
      "cashapp_cash_tag": "cashapp_cash_tag",
      "city": "city",
      "country": "country",
      "default": true,
      "expiration_date": "expiration_date",
      "first_name": "first_name",
      "last_four": "4242",
      "last_name": "last_name",
      "nick_name": "nick_name",
      "payment_account_email": "payment_account_email",
      "payment_email": "payment_email",
      "state": "state",
      "type": "CREDIT_CARD",
      "zipcode": "zipcode"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```