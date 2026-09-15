---
title: Get ASN Subnets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[ASN](https://developers.cloudflare.com/api/resources/intel/subresources/asn)

[Subnets](https://developers.cloudflare.com/api/resources/intel/subresources/asn/subresources/subnets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get ASN Subnets

GET/accounts/{account\_id}/intel/asn/{asn}/subnets

Get ASN Subnets.

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

Identifier.

maxLength32

[Link to this property](#)%20intel.asn.subnets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

asn: [ASN](<https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20asn%20%3E%20(schema)>)

[Link to this property](#)%20intel.asn.subnets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

##### ReturnsExpand Collapse

asn: optional [ASN](<https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20asn%20%3E%20(schema)>)

[Link to this property](#)%20intel.asn.subnets%20%3E%20(model)%20subnet_get_response%20%3E%20(schema)%20%3E%20(property)%20asn>)

count: optional number

Total results returned based on your search parameters.

[Link to this property](#)%20intel.asn.subnets%20%3E%20(model)%20subnet_get_response%20%3E%20(schema)%20%3E%20(property)%20count>)

ip\_count\_total: optional number

[Link to this property](#)%20intel.asn.subnets%20%3E%20(model)%20subnet_get_response%20%3E%20(schema)%20%3E%20(property)%20ip_count_total>)

page: optional number

Current page within paginated list of results.

[Link to this property](#)%20intel.asn.subnets%20%3E%20(model)%20subnet_get_response%20%3E%20(schema)%20%3E%20(property)%20page>)

per\_page: optional number

Number of results per page of results.

[Link to this property](#)%20intel.asn.subnets%20%3E%20(model)%20subnet_get_response%20%3E%20(schema)%20%3E%20(property)%20per_page>)

subnets: optional array of string

[Link to this property](#)%20intel.asn.subnets%20%3E%20(model)%20subnet_get_response%20%3E%20(schema)%20%3E%20(property)%20subnets>)

### Get ASN Subnets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/asn/$ASN/subnets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "asn": 0,
  "count": 1,
  "ip_count_total": 0,
  "page": 1,
  "per_page": 20,
  "subnets": [
    "192.0.2.0/24",
    "2001:DB8::/32"
  ]
}
```

##### Returns Examples

200 example

```
{
  "asn": 0,
  "count": 1,
  "ip_count_total": 0,
  "page": 1,
  "per_page": 20,
  "subnets": [
    "192.0.2.0/24",
    "2001:DB8::/32"
  ]
}
```