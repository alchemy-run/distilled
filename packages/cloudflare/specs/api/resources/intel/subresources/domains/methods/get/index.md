---
title: Get Domain Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Domains](https://developers.cloudflare.com/api/resources/intel/subresources/domains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Domain Details

GET/accounts/{account\_id}/intel/domain

Gets security details and statistics about a domain.

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

[Link to this property](#)%20intel.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

domain: optional string

[Link to this property](#)%20intel.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain%20%3E%20(schema)>)

skip\_dns: optional boolean

Skip DNS resolution lookups for faster response.

[Link to this property](#)%20intel.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20skip_dns%20%3E%20(schema)>)

skip\_ranking: optional boolean

Skip the domain ranking lookup for faster responses. Defaults to `false` (ranking is included). Set to `true` to opt out — primarily used by callers like Cloudflare Radar that need to avoid a circular dependency when building the domain details page. Note: the bulk endpoint (`/intel/domain/bulk`) uses opposite defaults — see `include_ranking` there.

[Link to this property](#)%20intel.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20skip_ranking%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.domains%20%3E%20(model)%20domain%20%3E%20(schema)">Domain</a> { additional\_information, application, content\_categories, 8 more }

</summary>

<details>

<summary>

additional\_information: optional object {suspected\_malware\_family }

Additional information related to the host name.

</summary>

suspected\_malware\_family: optional string

Suspected DGA malware family.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

application: optional object {id, name }

Application that the hostname belongs to.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_categories: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

inherited\_content\_categories: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inherited\_from: optional string

Domain from which <code>inherited_content_categories</code> and <code>inherited_risk_types</code> are inherited, if applicable.

<a href="#">Link to this property</a>

<details>

<summary>

inherited\_risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

popularity\_rank: optional number

Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 100,000.

<a href="#">Link to this property</a>

<details>

<summary>

resolves\_to\_refs: optional array of object {id, value }

Specifies a list of references to one or more IP addresses or domain names that the domain name currently resolves to.

</summary>

id: optional string

STIX 2.1 identifier: <a href="https://docs.oasis-open.org/cti/stix/v2.1/cs02/stix-v2.1-cs02.html#_64yvzeku5a5c">https://docs.oasis-open.org/cti/stix/v2.1/cs02/stix-v2.1-cs02.html#\_64yvzeku5a5c</a>.

<a href="#">Link to this property</a>

value: optional string

IP address or domain name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

risk\_score: optional number

Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk).

<a href="#">Link to this property</a>

<details>

<summary>

risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Domain Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/domain \
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
    "additional_information": {
      "suspected_malware_family": ""
    },
    "application": {
      "id": 0,
      "name": "CLOUDFLARE"
    },
    "content_categories": [
      {
        "id": 155,
        "name": "Technology",
        "super_category_id": 26
      }
    ],
    "domain": "cloudflare.com",
    "inherited_content_categories": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ],
    "inherited_from": "inherited_from",
    "inherited_risk_types": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ],
    "popularity_rank": 0,
    "resolves_to_refs": [
      {
        "id": "ipv4-addr--baa568ec-6efe-5902-be55-0663833db537",
        "value": "192.0.2.0"
      }
    ],
    "risk_score": 0,
    "risk_types": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ]
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
    "additional_information": {
      "suspected_malware_family": ""
    },
    "application": {
      "id": 0,
      "name": "CLOUDFLARE"
    },
    "content_categories": [
      {
        "id": 155,
        "name": "Technology",
        "super_category_id": 26
      }
    ],
    "domain": "cloudflare.com",
    "inherited_content_categories": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ],
    "inherited_from": "inherited_from",
    "inherited_risk_types": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ],
    "popularity_rank": 0,
    "resolves_to_refs": [
      {
        "id": "ipv4-addr--baa568ec-6efe-5902-be55-0663833db537",
        "value": "192.0.2.0"
      }
    ],
    "risk_score": 0,
    "risk_types": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ]
  }
}
```