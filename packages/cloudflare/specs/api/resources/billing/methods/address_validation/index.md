---
title: Validate Billing Address
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Validate Billing Address

POST/billing/address-validation

Validates a billing address and returns validated address suggestions. Authentication is not enforced to support pre-signup address validation flows, so credentials are accepted but not required.

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

##### Body ParametersJSONExpand Collapse

address: optional string

Address line 1.

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(params)%200%20%3E%20(param)%20address%20%3E%20(schema)>)

address2: optional string

Address line 2.

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(params)%200%20%3E%20(param)%20address2%20%3E%20(schema)>)

city: optional string

City.

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(params)%200%20%3E%20(param)%20city%20%3E%20(schema)>)

country: optional string

Country code.

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(params)%200%20%3E%20(param)%20country%20%3E%20(schema)>)

state: optional string

State or province.

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(params)%200%20%3E%20(param)%20state%20%3E%20(schema)>)

zipcode: optional string

Postal or zip code.

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(params)%200%20%3E%20(param)%20zipcode%20%3E%20(schema)>)

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

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {validated\_addresses }

</summary>

<details>

<summary>

validated\_addresses: optional array of object {address, address2, city, 4 more }

List of validated address suggestions.

</summary>

address: optional string

Validated address line 1.

<a href="#">Link to this property</a>

address2: optional string

Validated address line 2.

<a href="#">Link to this property</a>

city: optional string

Validated city.

<a href="#">Link to this property</a>

country: optional string

Validated country code.

<a href="#">Link to this property</a>

state: optional string

Validated state or province.

<a href="#">Link to this property</a>

validation\_code: optional string

The validation result code.

<a href="#">Link to this property</a>

zipcode: optional string

Validated postal or zip code.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20billing%20%3E%20(method)%20address_validation%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Validate Billing Address

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/billing/address-validation \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "validated_addresses": [
      {
        "address": "address",
        "address2": "address2",
        "city": "city",
        "country": "country",
        "state": "state",
        "validation_code": "validation_code",
        "zipcode": "zipcode"
      }
    ]
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
    "validated_addresses": [
      {
        "address": "address",
        "address2": "address2",
        "city": "city",
        "country": "country",
        "state": "state",
        "validation_code": "validation_code",
        "zipcode": "zipcode"
      }
    ]
  },
  "success": true
}
```