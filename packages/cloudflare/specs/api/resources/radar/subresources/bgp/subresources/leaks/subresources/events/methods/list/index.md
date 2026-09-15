---
title: Get BGP route leak events
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[Leaks](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/leaks)

[Events](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/leaks/subresources/events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get BGP route leak events

GET/radar/bgp/leaks/events

Retrieves the BGP route leak events.

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

dateEnd: optional string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`.

formatdate-time

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional string

Filters results by a relative date range ending at the current time. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`), e.g. `7d`. Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `3dcontrol` covers days -10 to -7, `7dcontrol` covers days -14 to -7, `28dcontrol` covers days -56 to -28, and `10dcontrol` covers days -24 to -14). Mutually exclusive with `dateStart`/`dateEnd`.

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional string

Start of the date range (inclusive). Alternative to `dateRange`; provide together with `dateEnd`.

formatdate-time

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

eventId: optional number

The unique identifier of a event.

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20eventId%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

involvedAsn: optional number

ASN that is causing or affected by a route leak event.

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20involvedAsn%20%3E%20(schema)>)

involvedCountry: optional string

Country code of a involved ASN in a route leak event.

maxLength2

minLength2

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20involvedCountry%20%3E%20(schema)>)

leakAsn: optional number

The leaking AS of a route leak event.

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20leakAsn%20%3E%20(schema)>)

page: optional number

Current page number, starting from 1.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of entries per page.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

sortBy: optional "ID"or "LEAKS"or "PEERS"or 3 more

Sorts results by the specified field.

</summary>

One of the following:

"ID"

<a href="#">Link to this property</a>

"LEAKS"

<a href="#">Link to this property</a>

"PEERS"

<a href="#">Link to this property</a>

"PREFIXES"

<a href="#">Link to this property</a>

"ORIGINS"

<a href="#">Link to this property</a>

"TIME"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sortBy%20%3E%20(schema)>)

<details>

<summary>

sortOrder: optional "ASC"or "DESC"

Sort order.

</summary>

One of the following:

"ASC"

<a href="#">Link to this property</a>

"DESC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sortOrder%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {asn\_info, events }

</summary>

<details>

<summary>

asn\_info: array of object {asn, country\_code, org\_name }

</summary>

asn: number

<a href="#">Link to this property</a>

country\_code: string

<a href="#">Link to this property</a>

org\_name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

events: array of object {id, countries, detected\_ts, 10 more }

</summary>

id: number

<a href="#">Link to this property</a>

countries: array of string

<a href="#">Link to this property</a>

detected\_ts: string

<a href="#">Link to this property</a>

finished: boolean

<a href="#">Link to this property</a>

leak\_asn: number

<a href="#">Link to this property</a>

leak\_count: number

<a href="#">Link to this property</a>

leak\_seg: array of number

<a href="#">Link to this property</a>

leak\_type: number

<a href="#">Link to this property</a>

max\_ts: string

<a href="#">Link to this property</a>

min\_ts: string

<a href="#">Link to this property</a>

origin\_count: number

<a href="#">Link to this property</a>

peer\_count: number

<a href="#">Link to this property</a>

prefix\_count: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, per\_page, total\_count }

</summary>

count: number

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20radar.bgp.leaks.events%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get BGP route leak events

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/leaks/events \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "asn_info": [
      {
        "asn": 0,
        "country_code": "country_code",
        "org_name": "org_name"
      }
    ],
    "events": [
      {
        "id": 0,
        "countries": [
          "string"
        ],
        "detected_ts": "detected_ts",
        "finished": true,
        "leak_asn": 0,
        "leak_count": 0,
        "leak_seg": [
          0
        ],
        "leak_type": 0,
        "max_ts": "max_ts",
        "min_ts": "min_ts",
        "origin_count": 0,
        "peer_count": 0,
        "prefix_count": 0
      }
    ]
  },
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "asn_info": [
      {
        "asn": 0,
        "country_code": "country_code",
        "org_name": "org_name"
      }
    ],
    "events": [
      {
        "id": 0,
        "countries": [
          "string"
        ],
        "detected_ts": "detected_ts",
        "finished": true,
        "leak_asn": 0,
        "leak_count": 0,
        "leak_seg": [
          0
        ],
        "leak_type": 0,
        "max_ts": "max_ts",
        "min_ts": "min_ts",
        "origin_count": 0,
        "peer_count": 0,
        "prefix_count": 0
      }
    ]
  },
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```