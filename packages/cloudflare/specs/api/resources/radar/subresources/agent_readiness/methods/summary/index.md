---
title: Get agent readiness summary
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Agent Readiness](https://developers.cloudflare.com/api/resources/radar/subresources/agent_readiness)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get agent readiness summary

GET/radar/agent\_readiness/summary/{dimension}

Returns a summary of AI agent readiness scores across scanned domains, grouped by the specified dimension. Data is sourced from weekly bulk scans. All values are raw domain counts.

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

`User Details Write``User Details Read`

##### P ath ParametersExpand Collapse

dimension: "CHECK"

Specifies the agent readiness data dimension by which to group the results.

[Link to this property](#)%20radar.agent_readiness%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dimension%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

date: optional string

Filters results by the specified date.

formatdate

[Link to this property](#)%20radar.agent_readiness%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

domainCategory: optional array of string

Filters results by domain category.

[Link to this property](#)%20radar.agent_readiness%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20domainCategory%20%3E%20(schema)>)

<details>

<summary>

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.agent_readiness%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.agent_readiness%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {date, domainCategories, lastUpdated, 4 more }

</summary>

date: string

Date of the returned scan (YYYY-MM-DD). May differ from the requested date if no scan exists for that exact date.

<a href="#">Link to this property</a>

<details>

<summary>

domainCategories: array of object {name, value }

Available domain sub-categories with their scan counts. Use as filter options for the domainCategory parameter.

</summary>

name: string

Sub-category name.

<a href="#">Link to this property</a>

value: number

Number of successfully scanned domains in this sub-category.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

normalization: "PERCENTAGE"or "MIN0\_MAX"or "MIN\_MAX"or 5 more

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"PERCENTAGE"

<a href="#">Link to this property</a>

"MIN0\_MAX"

<a href="#">Link to this property</a>

"MIN\_MAX"

<a href="#">Link to this property</a>

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE\_CHANGE"

<a href="#">Link to this property</a>

"ROLLING\_AVERAGE"

<a href="#">Link to this property</a>

"OVERLAPPED\_PERCENTAGE"

<a href="#">Link to this property</a>

"RATIO"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

successfulDomains: number

Domains successfully scanned (excludes errors).

<a href="#">Link to this property</a>

totalDomains: number

Total domains attempted in the scan.

<a href="#">Link to this property</a>

<details>

<summary>

units: array of object {name, value }

Measurement units for the results.

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summary\_0: map\[string]

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.agent_readiness%20%3E%20(method)%20summary%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.agent_readiness%20%3E%20(method)%20summary%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get agent readiness summary

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/agent_readiness/summary/$DIMENSION \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "meta": {
      "date": "2026-03-24T00:00:00Z",
      "domainCategories": [
        {
          "name": "News & Media",
          "value": 0
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z",
      "normalization": "PERCENTAGE",
      "successfulDomains": 0,
      "totalDomains": 0,
      "units": [
        {
          "name": "*",
          "value": "requests"
        }
      ]
    },
    "summary_0": {
      "markdownNegotiation": "45000",
      "robotsTxt": "280000"
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "meta": {
      "date": "2026-03-24T00:00:00Z",
      "domainCategories": [
        {
          "name": "News & Media",
          "value": 0
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z",
      "normalization": "PERCENTAGE",
      "successfulDomains": 0,
      "totalDomains": 0,
      "units": [
        {
          "name": "*",
          "value": "requests"
        }
      ]
    },
    "summary_0": {
      "markdownNegotiation": "45000",
      "robotsTxt": "280000"
    }
  },
  "success": true
}
```