---
title: Get Multiple Domain Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Domains](https://developers.cloudflare.com/api/resources/intel/subresources/domains)

[Bulks](https://developers.cloudflare.com/api/resources/intel/subresources/domains/subresources/bulks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Multiple Domain Details

GET/accounts/{account\_id}/intel/domain/bulk

Returns security details and statistics about multiple domains in a single request.

**Behavior change — domain ranking is becoming opt-in.** This endpoint previously included domain ranking data in every response and accepted a `skip_ranking=true` query parameter to opt out. That parameter is being deprecated and ranking will no longer be returned by default. Callers that want ranking data must pass `include_ranking=true`. The `skip_ranking` parameter will be silently ignored once the change ships.

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

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

domain: optional array of string

Accepts multiple values like `?domain=cloudflare.com&domain=example.com`.

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain%20%3E%20(schema)>)

include\_ranking: optional boolean

Whether to include domain ranking data in the response. Defaults to `false` — ranking lookups are expensive at bulk scale and most callers do not need them. Set to `true` to opt in. This parameter replaces the deprecated `skip_ranking` (see below).

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20include_ranking%20%3E%20(schema)>)

skip\_ranking: optional boolean

**Deprecated.** Previously controlled whether the ranking lookup was skipped (defaulted to `false`, meaning ranking ran). The endpoint’s default behavior is being flipped — ranking is now opt-in via `include_ranking=true` — and this parameter will be silently ignored. Remove it from your callers and use `include_ranking` instead.

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20skip_ranking%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {additional\_information, application, content\_categories, 7 more }

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

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

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

</details>

[Link to this property](#)%20intel.domains.bulks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get Multiple Domain Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/domain/bulk \
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
      "risk_score": 0,
      "risk_types": [
        {
          "id": 0,
          "name": "name",
          "super_category_id": 0
        }
      ]
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
      "risk_score": 0,
      "risk_types": [
        {
          "id": 0,
          "name": "name",
          "super_category_id": 0
        }
      ]
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