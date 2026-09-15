---
title: Get Billing Profile
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

[Profiles](https://developers.cloudflare.com/api/resources/billing/subresources/profiles)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Billing Profile

GET/accounts/{account\_id}/billing/profile

Gets the current billing profile for the account.

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

[Link to this property](#)%20billing.profiles%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20billing.profiles%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20billing.profiles%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, account\_type, address, 35 more }

</summary>

id: optional string

Billing item identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_type: optional string

<a href="#">Link to this property</a>

address: optional string

<a href="#">Link to this property</a>

address2: optional string

<a href="#">Link to this property</a>

balance: optional string

<a href="#">Link to this property</a>

card\_expiry\_month: optional number

<a href="#">Link to this property</a>

card\_expiry\_year: optional number

<a href="#">Link to this property</a>

card\_number: optional string

<a href="#">Link to this property</a>

city: optional string

<a href="#">Link to this property</a>

company: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

device\_data: optional string

<a href="#">Link to this property</a>

edited\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

enterprise\_billing\_email: optional string

<a href="#">Link to this property</a>

enterprise\_primary\_email: optional string

<a href="#">Link to this property</a>

first\_name: optional string

<a href="#">Link to this property</a>

is\_partner: optional boolean

<a href="#">Link to this property</a>

last\_name: optional string

<a href="#">Link to this property</a>

next\_bill\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

payment\_address: optional string

<a href="#">Link to this property</a>

payment\_address2: optional string

<a href="#">Link to this property</a>

payment\_city: optional string

<a href="#">Link to this property</a>

payment\_country: optional string

<a href="#">Link to this property</a>

payment\_email: optional string

<a href="#">Link to this property</a>

payment\_first\_name: optional string

<a href="#">Link to this property</a>

payment\_gateway: optional string

<a href="#">Link to this property</a>

payment\_last\_name: optional string

<a href="#">Link to this property</a>

payment\_nonce: optional string

<a href="#">Link to this property</a>

payment\_state: optional string

<a href="#">Link to this property</a>

payment\_zipcode: optional string

<a href="#">Link to this property</a>

primary\_email: optional string

<a href="#">Link to this property</a>

state: optional string

<a href="#">Link to this property</a>

tax\_id\_type: optional string

<a href="#">Link to this property</a>

telephone: optional string

<a href="#">Link to this property</a>

validation\_code: optional string

<a href="#">Link to this property</a>

vat: optional string

<a href="#">Link to this property</a>

zipcode: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.profiles%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20billing.profiles%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Billing Profile

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/billing/profile \
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
  "result": {
    "id": "b69a9f3492637782896352daae219e7d",
    "account_type": "type",
    "address": "123 Main Street",
    "address2": "Apt 1",
    "balance": "0",
    "card_expiry_month": 12,
    "card_expiry_year": 2099,
    "card_number": "4242424242424242",
    "city": "Anytown",
    "company": "Company",
    "country": "Anycountry",
    "created_on": "2014-03-01T12:21:59.3456Z",
    "edited_on": "2014-03-01T12:21:59.3456Z",
    "enterprise_billing_email": "johndoe@gmail.com",
    "enterprise_primary_email": "johndoe@gmail.com",
    "first_name": "John",
    "is_partner": false,
    "last_name": "Doe",
    "next_bill_date": "2014-03-01T12:21:59.3456Z",
    "payment_address": "123 Main Street",
    "payment_address2": "Apt 1",
    "payment_city": "Anytown",
    "payment_country": "Anycountry",
    "payment_email": "johndoe@gmail.com",
    "payment_first_name": "John",
    "payment_last_name": "Doe",
    "payment_state": "state",
    "payment_zipcode": "12345",
    "primary_email": "johndoe@gmail.com",
    "state": "AnyState",
    "tax_id_type": "type",
    "telephone": "1234567899",
    "validation_code": "1111",
    "vat": "GB123456789",
    "zipcode": "12345"
  },
  "success": true
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
  "result": {
    "id": "b69a9f3492637782896352daae219e7d",
    "account_type": "type",
    "address": "123 Main Street",
    "address2": "Apt 1",
    "balance": "0",
    "card_expiry_month": 12,
    "card_expiry_year": 2099,
    "card_number": "4242424242424242",
    "city": "Anytown",
    "company": "Company",
    "country": "Anycountry",
    "created_on": "2014-03-01T12:21:59.3456Z",
    "edited_on": "2014-03-01T12:21:59.3456Z",
    "enterprise_billing_email": "johndoe@gmail.com",
    "enterprise_primary_email": "johndoe@gmail.com",
    "first_name": "John",
    "is_partner": false,
    "last_name": "Doe",
    "next_bill_date": "2014-03-01T12:21:59.3456Z",
    "payment_address": "123 Main Street",
    "payment_address2": "Apt 1",
    "payment_city": "Anytown",
    "payment_country": "Anycountry",
    "payment_email": "johndoe@gmail.com",
    "payment_first_name": "John",
    "payment_last_name": "Doe",
    "payment_state": "state",
    "payment_zipcode": "12345",
    "primary_email": "johndoe@gmail.com",
    "state": "AnyState",
    "tax_id_type": "type",
    "telephone": "1234567899",
    "validation_code": "1111",
    "vat": "GB123456789",
    "zipcode": "12345"
  },
  "success": true
}
```