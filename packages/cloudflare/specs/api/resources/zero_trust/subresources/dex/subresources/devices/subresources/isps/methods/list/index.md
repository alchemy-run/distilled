---
title: List device ISPs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/devices)

[ISPs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/devices/subresources/isps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List device ISPs

GET/accounts/{account\_id}/dex/devices/{device\_id}/isps

List ISP information observed for a specific device during traceroute tests.

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

`Cloudflare DEX Write``Cloudflare DEX Read``Zero Trust Report``Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

device\_id: string

API Resource UUID tag.

maxLength36

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20device_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

per\_page: number

Number of items per page

maximum50

minimum1

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

cursor: optional string

Cursor for cursor-based pagination. Mutually exclusive with page.

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

from: optional string

Start time for the query in ISO 8601 format.

formatdate-time

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

page: optional number

Page number of paginated results. Mutually exclusive with cursor.

minimum1

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

sort\_by: optional "time\_start"

The field to sort results by.

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "ASC"or "DESC"

The order to sort results.

</summary>

One of the following:

"ASC"

<a href="#">Link to this property</a>

"DESC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

to: optional string

End time for the query in ISO 8601 format.

formatdate-time

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.devices.isps%20%3E%20(model)%20isps%20%3E%20(schema)">ISPs</a> { isps }

</summary>

<details>

<summary>

isps: array of object {test\_id, test\_result\_id, time\_start, ip }

</summary>

test\_id: string

The test that generated this result.

<a href="#">Link to this property</a>

test\_result\_id: string

The specific test result.

<a href="#">Link to this property</a>

time\_start: string

Timestamp of when the ISP was observed.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ip: optional object {address, asn, aso, 4 more }

IP address information for the ISP hop. Fields marked as PII-gated (<code>name</code>, <code>address</code>, <code>netmask</code>, and all <code>location</code> sub-fields) will be returned as the literal string <code>"REDACTED"</code> for callers that do not have the PII permission. <code>asn</code>, <code>aso</code>, and <code>version</code> are always returned regardless of PII access.

</summary>

address: optional string

IP address. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

asn: optional number

Autonomous System Number.

<a href="#">Link to this property</a>

aso: optional string

Autonomous System Organization name.

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

Geographic location information. All fields are returned as the literal string <code>"REDACTED"</code> for callers that do not have the PII permission.

</summary>

city: optional string

City name. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

country\_iso: optional string

Country ISO code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

state\_iso: optional string

State/province ISO code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

zip: optional string

ZIP/postal code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Named IP address (reverse DNS hostname when available). Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

netmask: optional string

Network mask. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List device ISPs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/$DEVICE_ID/isps \
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
    "isps": [
      {
        "test_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "test_result_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "time_start": "2024-06-01T12:00:00Z",
        "ip": {
          "address": "203.0.113.1",
          "asn": 13335,
          "aso": "CLOUDFLARENET",
          "location": {
            "city": "San Francisco",
            "country_iso": "US",
            "state_iso": "CA",
            "zip": "94107"
          },
          "name": "isp-gateway.example.com",
          "netmask": "255.255.255.0",
          "version": 1
        }
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
    "isps": [
      {
        "test_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "test_result_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "time_start": "2024-06-01T12:00:00Z",
        "ip": {
          "address": "203.0.113.1",
          "asn": 13335,
          "aso": "CLOUDFLARENET",
          "location": {
            "city": "San Francisco",
            "country_iso": "US",
            "state_iso": "CA",
            "zip": "94107"
          },
          "name": "isp-gateway.example.com",
          "netmask": "255.255.255.0",
          "version": 1
        }
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```