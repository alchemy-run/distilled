---
title: Get BGP hijack events
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[Hijacks](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/hijacks)

[Events](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/hijacks/subresources/events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get BGP hijack events

GET/radar/bgp/hijacks/events

Retrieves the BGP hijack events.

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

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional string

Filters results by a relative date range ending at the current time. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`), e.g. `7d`. Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `3dcontrol` covers days -10 to -7, `7dcontrol` covers days -14 to -7, `28dcontrol` covers days -56 to -28, and `10dcontrol` covers days -24 to -14). Mutually exclusive with `dateStart`/`dateEnd`.

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional string

Start of the date range (inclusive). Alternative to `dateRange`; provide together with `dateEnd`.

formatdate-time

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

eventId: optional number

The unique identifier of a event.

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20eventId%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

hijackerAsn: optional number

The potential hijacker AS of a BGP hijack event.

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hijackerAsn%20%3E%20(schema)>)

involvedAsn: optional number

The potential hijacker or victim AS of a BGP hijack event.

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20involvedAsn%20%3E%20(schema)>)

involvedCountry: optional string

The country code of the potential hijacker or victim AS of a BGP hijack event.

maxLength2

minLength2

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20involvedCountry%20%3E%20(schema)>)

maxConfidence: optional number

Filters events by maximum confidence score (1-4 low, 5-7 mid, 8+ high).

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20maxConfidence%20%3E%20(schema)>)

minConfidence: optional number

Filters events by minimum confidence score (1-4 low, 5-7 mid, 8+ high).

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20minConfidence%20%3E%20(schema)>)

page: optional number

Current page number, starting from 1.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of entries per page.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

prefix: optional string

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20prefix%20%3E%20(schema)>)

<details>

<summary>

sortBy: optional "ID"or "TIME"or "CONFIDENCE"

Sorts results by the specified field.

</summary>

One of the following:

"ID"

<a href="#">Link to this property</a>

"TIME"

<a href="#">Link to this property</a>

"CONFIDENCE"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sortBy%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sortOrder%20%3E%20(schema)>)

victimAsn: optional number

The potential victim AS of a BGP hijack event.

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20victimAsn%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {asn\_info, events, total\_monitors }

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

events: array of object {id, confidence\_score, duration, 15 more }

</summary>

id: number

<a href="#">Link to this property</a>

confidence\_score: number

<a href="#">Link to this property</a>

duration: number

<a href="#">Link to this property</a>

event\_type: number

<a href="#">Link to this property</a>

hijack\_msgs\_count: number

<a href="#">Link to this property</a>

hijacker\_asn: number

<a href="#">Link to this property</a>

hijacker\_country: string

<a href="#">Link to this property</a>

is\_stale: boolean

<a href="#">Link to this property</a>

max\_hijack\_ts: string

<a href="#">Link to this property</a>

max\_msg\_ts: string

<a href="#">Link to this property</a>

min\_hijack\_ts: string

<a href="#">Link to this property</a>

on\_going\_count: number

<a href="#">Link to this property</a>

peer\_asns: array of number

<a href="#">Link to this property</a>

peer\_ip\_count: number

<a href="#">Link to this property</a>

prefixes: array of string

<a href="#">Link to this property</a>

<details>

<summary>

tags: array of object {name, score }

</summary>

name: string

<a href="#">Link to this property</a>

score: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

victim\_asns: array of number

<a href="#">Link to this property</a>

victim\_countries: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total\_monitors: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get BGP hijack events

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/hijacks/events \
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
        "confidence_score": 0,
        "duration": 0,
        "event_type": 0,
        "hijack_msgs_count": 0,
        "hijacker_asn": 0,
        "hijacker_country": "hijacker_country",
        "is_stale": true,
        "max_hijack_ts": "max_hijack_ts",
        "max_msg_ts": "max_msg_ts",
        "min_hijack_ts": "min_hijack_ts",
        "on_going_count": 0,
        "peer_asns": [
          0
        ],
        "peer_ip_count": 0,
        "prefixes": [
          "string"
        ],
        "tags": [
          {
            "name": "name",
            "score": 0
          }
        ],
        "victim_asns": [
          0
        ],
        "victim_countries": [
          "string"
        ]
      }
    ],
    "total_monitors": 0
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
        "confidence_score": 0,
        "duration": 0,
        "event_type": 0,
        "hijack_msgs_count": 0,
        "hijacker_asn": 0,
        "hijacker_country": "hijacker_country",
        "is_stale": true,
        "max_hijack_ts": "max_hijack_ts",
        "max_msg_ts": "max_msg_ts",
        "min_hijack_ts": "min_hijack_ts",
        "on_going_count": 0,
        "peer_asns": [
          0
        ],
        "peer_ip_count": 0,
        "prefixes": [
          "string"
        ],
        "tags": [
          {
            "name": "name",
            "score": 0
          }
        ],
        "victim_asns": [
          0
        ],
        "victim_countries": [
          "string"
        ]
      }
    ],
    "total_monitors": 0
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