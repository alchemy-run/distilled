---
title: Get account profile
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Account Profile](https://developers.cloudflare.com/api/resources/accounts/subresources/account_profile)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get account profile

GET/accounts/{account\_id}/profile

Retrieves the profile information for a specific Cloudflare account, including organization details, settings, and metadata. This endpoint is commonly used to verify account access and retrieve account-level configuration.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Trust and Safety Write``Trust and Safety Read``DNS View Write``DNS View Read``SCIM Provisioning``Load Balancers Account Write``Load Balancers Account Read``Zero Trust: PII Read``DDoS Botnet Feed Write``DDoS Botnet Feed Read``Workers R2 Storage Write``Workers R2 Storage Read``DDoS Protection Write``DDoS Protection Read``Workers Tail Read``Workers KV Storage Write``Workers KV Storage Read``Workers Scripts Write``Workers Scripts Read``Load Balancing: Monitors and Pools Write``Load Balancing: Monitors and Pools Read``Account Firewall Access Rules Write``Account Firewall Access Rules Read``DNS Firewall Write``DNS Firewall Read``Billing Write``Billing Read``Account Settings Write``Account Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts.account_profile%20%3E%20(model)%20account_profile%20%3E%20(schema)">AccountProfile</a> { business\_address, business\_email, business\_name, 2 more }

</summary>

business\_address: string

<a href="#">Link to this property</a>

business\_email: string

<a href="#">Link to this property</a>

business\_name: string

<a href="#">Link to this property</a>

business\_phone: string

<a href="#">Link to this property</a>

external\_metadata: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20accounts.account_profile%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get account profile

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/profile \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [],
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
    "business_address": "business_address",
    "business_email": "business_email",
    "business_name": "business_name",
    "business_phone": "business_phone",
    "external_metadata": "external_metadata"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
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
    "business_address": "business_address",
    "business_email": "business_email",
    "business_name": "business_name",
    "business_phone": "business_phone",
    "external_metadata": "external_metadata"
  },
  "success": true
}
```