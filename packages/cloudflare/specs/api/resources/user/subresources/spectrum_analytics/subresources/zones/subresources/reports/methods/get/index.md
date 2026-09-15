---
title: Get zones bandwidth report
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Spectrum Analytics](https://developers.cloudflare.com/api/resources/user/subresources/spectrum_analytics)

[Zones](https://developers.cloudflare.com/api/resources/user/subresources/spectrum_analytics/subresources/zones)

[Reports](https://developers.cloudflare.com/api/resources/user/subresources/spectrum_analytics/subresources/zones/subresources/reports)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get zones bandwidth report

GET/user/spectrum\_analytics/zones/report

Retrieves a list of total bandwidth by zone over a given time period.

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

##### Q uery ParametersExpand Collapse

cdn\_traffic: optional boolean

Include CDN traffic in the bandwidth aggregation.

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20cdn_traffic%20%3E%20(schema)>)

since: optional string

Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

until: optional string

End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20until%20%3E%20(schema)>)

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

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

query: object {since, until }

</summary>

since: string

Start of time interval to query, defaults to <code>until</code> - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

until: string

End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20query>)

<details>

<summary>

result: array of object {totals, zone\_id }

</summary>

<details>

<summary>

totals: object {bandwidth }

</summary>

<details>

<summary>

bandwidth: object {all, egress, ingress }

</summary>

all: number

Sum of ingress and egress bytes transferred.

<a href="#">Link to this property</a>

egress: number

Sum of egress bytes transferred.

<a href="#">Link to this property</a>

ingress: number

Sum of ingress bytes transferred.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get zones bandwidth report

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/spectrum_analytics/zones/report \
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
  "query": {
    "since": "2014-01-01T05:20:00.12345Z",
    "until": "2014-01-01T05:20:00.12345Z"
  },
  "result": [
    {
      "totals": {
        "bandwidth": {
          "all": 0,
          "egress": 0,
          "ingress": 0
        }
      },
      "zone_id": "023e105f4ecef8ad9ca31a8372d0c353"
    }
  ],
  "success": true,
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
  "query": {
    "since": "2014-01-01T05:20:00.12345Z",
    "until": "2014-01-01T05:20:00.12345Z"
  },
  "result": [
    {
      "totals": {
        "bandwidth": {
          "all": 0,
          "egress": 0,
          "ingress": 0
        }
      },
      "zone_id": "023e105f4ecef8ad9ca31a8372d0c353"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```