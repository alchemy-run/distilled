---
title: Get WHOIS Record
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Whois](https://developers.cloudflare.com/api/resources/intel/subresources/whois)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get WHOIS Record

GET/accounts/{account\_id}/intel/whois

Retrieves WHOIS registration data for a domain, including registrant and nameserver information.

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

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

Use to uniquely identify or reference the resource.

maxLength32

[Link to this property](#)%20intel.whois%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

domain: optional string

[Link to this property](#)%20intel.whois%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20intel.whois%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20intel.whois%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Returns a boolean for the success/failure of the API call.

[Link to this property](#)%20intel.whois%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {dnssec, domain, extension, 84 more }

</summary>

dnssec: boolean

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

extension: string

<a href="#">Link to this property</a>

found: boolean

<a href="#">Link to this property</a>

nameservers: array of string

<a href="#">Link to this property</a>

punycode: string

<a href="#">Link to this property</a>

registrant: string

<a href="#">Link to this property</a>

registrar: string

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

administrative\_city: optional string

<a href="#">Link to this property</a>

administrative\_country: optional string

<a href="#">Link to this property</a>

administrative\_email: optional string

<a href="#">Link to this property</a>

administrative\_fax: optional string

<a href="#">Link to this property</a>

administrative\_fax\_ext: optional string

<a href="#">Link to this property</a>

administrative\_id: optional string

<a href="#">Link to this property</a>

administrative\_name: optional string

<a href="#">Link to this property</a>

administrative\_org: optional string

<a href="#">Link to this property</a>

administrative\_phone: optional string

<a href="#">Link to this property</a>

administrative\_phone\_ext: optional string

<a href="#">Link to this property</a>

administrative\_postal\_code: optional string

<a href="#">Link to this property</a>

administrative\_province: optional string

<a href="#">Link to this property</a>

administrative\_referral\_url: optional string

<a href="#">Link to this property</a>

administrative\_street: optional string

<a href="#">Link to this property</a>

billing\_city: optional string

<a href="#">Link to this property</a>

billing\_country: optional string

<a href="#">Link to this property</a>

billing\_email: optional string

<a href="#">Link to this property</a>

billing\_fax: optional string

<a href="#">Link to this property</a>

billing\_fax\_ext: optional string

<a href="#">Link to this property</a>

billing\_id: optional string

<a href="#">Link to this property</a>

billing\_name: optional string

<a href="#">Link to this property</a>

billing\_org: optional string

<a href="#">Link to this property</a>

billing\_phone: optional string

<a href="#">Link to this property</a>

billing\_phone\_ext: optional string

<a href="#">Link to this property</a>

billing\_postal\_code: optional string

<a href="#">Link to this property</a>

billing\_province: optional string

<a href="#">Link to this property</a>

billing\_referral\_url: optional string

<a href="#">Link to this property</a>

billing\_street: optional string

<a href="#">Link to this property</a>

created\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_date\_raw: optional string

<a href="#">Link to this property</a>

expiration\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

expiration\_date\_raw: optional string

<a href="#">Link to this property</a>

registrant\_city: optional string

<a href="#">Link to this property</a>

registrant\_country: optional string

<a href="#">Link to this property</a>

registrant\_email: optional string

<a href="#">Link to this property</a>

registrant\_fax: optional string

<a href="#">Link to this property</a>

registrant\_fax\_ext: optional string

<a href="#">Link to this property</a>

registrant\_id: optional string

<a href="#">Link to this property</a>

registrant\_name: optional string

<a href="#">Link to this property</a>

registrant\_org: optional string

<a href="#">Link to this property</a>

registrant\_phone: optional string

<a href="#">Link to this property</a>

registrant\_phone\_ext: optional string

<a href="#">Link to this property</a>

registrant\_postal\_code: optional string

<a href="#">Link to this property</a>

registrant\_province: optional string

<a href="#">Link to this property</a>

registrant\_referral\_url: optional string

<a href="#">Link to this property</a>

registrant\_street: optional string

<a href="#">Link to this property</a>

registrar\_city: optional string

<a href="#">Link to this property</a>

registrar\_country: optional string

<a href="#">Link to this property</a>

registrar\_email: optional string

<a href="#">Link to this property</a>

registrar\_fax: optional string

<a href="#">Link to this property</a>

registrar\_fax\_ext: optional string

<a href="#">Link to this property</a>

registrar\_id: optional string

<a href="#">Link to this property</a>

registrar\_name: optional string

<a href="#">Link to this property</a>

registrar\_org: optional string

<a href="#">Link to this property</a>

registrar\_phone: optional string

<a href="#">Link to this property</a>

registrar\_phone\_ext: optional string

<a href="#">Link to this property</a>

registrar\_postal\_code: optional string

<a href="#">Link to this property</a>

registrar\_province: optional string

<a href="#">Link to this property</a>

registrar\_referral\_url: optional string

<a href="#">Link to this property</a>

registrar\_street: optional string

<a href="#">Link to this property</a>

status: optional array of string

<a href="#">Link to this property</a>

technical\_city: optional string

<a href="#">Link to this property</a>

technical\_country: optional string

<a href="#">Link to this property</a>

technical\_email: optional string

<a href="#">Link to this property</a>

technical\_fax: optional string

<a href="#">Link to this property</a>

technical\_fax\_ext: optional string

<a href="#">Link to this property</a>

technical\_id: optional string

<a href="#">Link to this property</a>

technical\_name: optional string

<a href="#">Link to this property</a>

technical\_org: optional string

<a href="#">Link to this property</a>

technical\_phone: optional string

<a href="#">Link to this property</a>

technical\_phone\_ext: optional string

<a href="#">Link to this property</a>

technical\_postal\_code: optional string

<a href="#">Link to this property</a>

technical\_province: optional string

<a href="#">Link to this property</a>

technical\_referral\_url: optional string

<a href="#">Link to this property</a>

technical\_street: optional string

<a href="#">Link to this property</a>

updated\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

updated\_date\_raw: optional string

<a href="#">Link to this property</a>

whois\_server: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.whois%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get WHOIS Record

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/whois \
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
  "success": true,
  "result": {
    "dnssec": true,
    "domain": "cloudflare.com",
    "extension": "com",
    "found": true,
    "nameservers": [
      "ns3.cloudflare.com",
      "ns4.cloudflare.com",
      "ns5.cloudflare.com",
      "ns6.cloudflare.com",
      "ns7.cloudflare.com"
    ],
    "punycode": "cloudflare.com",
    "registrant": "registrant",
    "registrar": "Cloudflare, Inc.",
    "id": "1542998887_DOMAIN_COM-VRSN",
    "administrative_city": "administrative_city",
    "administrative_country": "administrative_country",
    "administrative_email": "administrative_email",
    "administrative_fax": "administrative_fax",
    "administrative_fax_ext": "administrative_fax_ext",
    "administrative_id": "administrative_id",
    "administrative_name": "administrative_name",
    "administrative_org": "administrative_org",
    "administrative_phone": "administrative_phone",
    "administrative_phone_ext": "administrative_phone_ext",
    "administrative_postal_code": "administrative_postal_code",
    "administrative_province": "administrative_province",
    "administrative_referral_url": "administrative_referral_url",
    "administrative_street": "administrative_street",
    "billing_city": "billing_city",
    "billing_country": "billing_country",
    "billing_email": "billing_email",
    "billing_fax": "billing_fax",
    "billing_fax_ext": "billing_fax_ext",
    "billing_id": "billing_id",
    "billing_name": "billing_name",
    "billing_org": "billing_org",
    "billing_phone": "billing_phone",
    "billing_phone_ext": "billing_phone_ext",
    "billing_postal_code": "billing_postal_code",
    "billing_province": "billing_province",
    "billing_referral_url": "billing_referral_url",
    "billing_street": "billing_street",
    "created_date": "2009-02-17T22:07:54Z",
    "created_date_raw": "2009-02-17T22:07:54Z",
    "expiration_date": "2033-02-17T22:07:54Z",
    "expiration_date_raw": "2033-02-17T22:07:54Z",
    "registrant_city": "registrant_city",
    "registrant_country": "registrant_country",
    "registrant_email": "registrant_email",
    "registrant_fax": "registrant_fax",
    "registrant_fax_ext": "registrant_fax_ext",
    "registrant_id": "registrant_id",
    "registrant_name": "registrant_name",
    "registrant_org": "registrant_org",
    "registrant_phone": "registrant_phone",
    "registrant_phone_ext": "registrant_phone_ext",
    "registrant_postal_code": "registrant_postal_code",
    "registrant_province": "registrant_province",
    "registrant_referral_url": "registrant_referral_url",
    "registrant_street": "registrant_street",
    "registrar_city": "registrar_city",
    "registrar_country": "registrar_country",
    "registrar_email": "registrar_email",
    "registrar_fax": "registrar_fax",
    "registrar_fax_ext": "registrar_fax_ext",
    "registrar_id": "registrar_id",
    "registrar_name": "registrar_name",
    "registrar_org": "registrar_org",
    "registrar_phone": "registrar_phone",
    "registrar_phone_ext": "registrar_phone_ext",
    "registrar_postal_code": "registrar_postal_code",
    "registrar_province": "registrar_province",
    "registrar_referral_url": "registrar_referral_url",
    "registrar_street": "registrar_street",
    "status": [
      "clientdeleteprohibited",
      "clienttransferprohibited",
      "clientupdateprohibited",
      "serverdeleteprohibited",
      "servertransferprohibited",
      "serverupdateprohibited"
    ],
    "technical_city": "technical_city",
    "technical_country": "technical_country",
    "technical_email": "technical_email",
    "technical_fax": "technical_fax",
    "technical_fax_ext": "technical_fax_ext",
    "technical_id": "technical_id",
    "technical_name": "technical_name",
    "technical_org": "technical_org",
    "technical_phone": "technical_phone",
    "technical_phone_ext": "technical_phone_ext",
    "technical_postal_code": "technical_postal_code",
    "technical_province": "technical_province",
    "technical_referral_url": "technical_referral_url",
    "technical_street": "technical_street",
    "updated_date": "2024-01-09T16:45:28Z",
    "updated_date_raw": "2024-01-09T16:45:28Z",
    "whois_server": "whois.cloudflare.com"
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
  "success": true,
  "result": {
    "dnssec": true,
    "domain": "cloudflare.com",
    "extension": "com",
    "found": true,
    "nameservers": [
      "ns3.cloudflare.com",
      "ns4.cloudflare.com",
      "ns5.cloudflare.com",
      "ns6.cloudflare.com",
      "ns7.cloudflare.com"
    ],
    "punycode": "cloudflare.com",
    "registrant": "registrant",
    "registrar": "Cloudflare, Inc.",
    "id": "1542998887_DOMAIN_COM-VRSN",
    "administrative_city": "administrative_city",
    "administrative_country": "administrative_country",
    "administrative_email": "administrative_email",
    "administrative_fax": "administrative_fax",
    "administrative_fax_ext": "administrative_fax_ext",
    "administrative_id": "administrative_id",
    "administrative_name": "administrative_name",
    "administrative_org": "administrative_org",
    "administrative_phone": "administrative_phone",
    "administrative_phone_ext": "administrative_phone_ext",
    "administrative_postal_code": "administrative_postal_code",
    "administrative_province": "administrative_province",
    "administrative_referral_url": "administrative_referral_url",
    "administrative_street": "administrative_street",
    "billing_city": "billing_city",
    "billing_country": "billing_country",
    "billing_email": "billing_email",
    "billing_fax": "billing_fax",
    "billing_fax_ext": "billing_fax_ext",
    "billing_id": "billing_id",
    "billing_name": "billing_name",
    "billing_org": "billing_org",
    "billing_phone": "billing_phone",
    "billing_phone_ext": "billing_phone_ext",
    "billing_postal_code": "billing_postal_code",
    "billing_province": "billing_province",
    "billing_referral_url": "billing_referral_url",
    "billing_street": "billing_street",
    "created_date": "2009-02-17T22:07:54Z",
    "created_date_raw": "2009-02-17T22:07:54Z",
    "expiration_date": "2033-02-17T22:07:54Z",
    "expiration_date_raw": "2033-02-17T22:07:54Z",
    "registrant_city": "registrant_city",
    "registrant_country": "registrant_country",
    "registrant_email": "registrant_email",
    "registrant_fax": "registrant_fax",
    "registrant_fax_ext": "registrant_fax_ext",
    "registrant_id": "registrant_id",
    "registrant_name": "registrant_name",
    "registrant_org": "registrant_org",
    "registrant_phone": "registrant_phone",
    "registrant_phone_ext": "registrant_phone_ext",
    "registrant_postal_code": "registrant_postal_code",
    "registrant_province": "registrant_province",
    "registrant_referral_url": "registrant_referral_url",
    "registrant_street": "registrant_street",
    "registrar_city": "registrar_city",
    "registrar_country": "registrar_country",
    "registrar_email": "registrar_email",
    "registrar_fax": "registrar_fax",
    "registrar_fax_ext": "registrar_fax_ext",
    "registrar_id": "registrar_id",
    "registrar_name": "registrar_name",
    "registrar_org": "registrar_org",
    "registrar_phone": "registrar_phone",
    "registrar_phone_ext": "registrar_phone_ext",
    "registrar_postal_code": "registrar_postal_code",
    "registrar_province": "registrar_province",
    "registrar_referral_url": "registrar_referral_url",
    "registrar_street": "registrar_street",
    "status": [
      "clientdeleteprohibited",
      "clienttransferprohibited",
      "clientupdateprohibited",
      "serverdeleteprohibited",
      "servertransferprohibited",
      "serverupdateprohibited"
    ],
    "technical_city": "technical_city",
    "technical_country": "technical_country",
    "technical_email": "technical_email",
    "technical_fax": "technical_fax",
    "technical_fax_ext": "technical_fax_ext",
    "technical_id": "technical_id",
    "technical_name": "technical_name",
    "technical_org": "technical_org",
    "technical_phone": "technical_phone",
    "technical_phone_ext": "technical_phone_ext",
    "technical_postal_code": "technical_postal_code",
    "technical_province": "technical_province",
    "technical_referral_url": "technical_referral_url",
    "technical_street": "technical_street",
    "updated_date": "2024-01-09T16:45:28Z",
    "updated_date_raw": "2024-01-09T16:45:28Z",
    "whois_server": "whois.cloudflare.com"
  }
}
```