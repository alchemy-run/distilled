---
title: Get latest annotations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Annotations](https://developers.cloudflare.com/api/resources/radar/subresources/annotations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get latest annotations

GET/radar/annotations

Retrieves the latest annotations.

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

asn: optional number

Filters results by Autonomous System. Specify a single Autonomous System Number (ASN) as integer.

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

bot: optional string

Filters results by bot.

maxLength100

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20bot%20%3E%20(schema)>)

ca: optional string

Filters results by certificate authority.

maxLength100

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ca%20%3E%20(schema)>)

<details>

<summary>

dataSource: optional "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Filters results by data source.

</summary>

One of the following:

"ALL"

<a href="#">Link to this property</a>

"AI\_BOTS"

<a href="#">Link to this property</a>

"AI\_GATEWAY"

<a href="#">Link to this property</a>

"BGP"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CONNECTION\_ANOMALY"

<a href="#">Link to this property</a>

"CT"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"DNS\_AS112"

<a href="#">Link to this property</a>

"DOS"

<a href="#">Link to this property</a>

"EMAIL\_ROUTING"

<a href="#">Link to this property</a>

"EMAIL\_SECURITY"

<a href="#">Link to this property</a>

"FW"

<a href="#">Link to this property</a>

"FW\_PG"

<a href="#">Link to this property</a>

"HTTP"

<a href="#">Link to this property</a>

"HTTP\_CONTROL"

<a href="#">Link to this property</a>

"HTTP\_CRAWLER\_REFERER"

<a href="#">Link to this property</a>

"HTTP\_ORIGINS"

<a href="#">Link to this property</a>

"IQI"

<a href="#">Link to this property</a>

"LEAKED\_CREDENTIALS"

<a href="#">Link to this property</a>

"NET"

<a href="#">Link to this property</a>

"ROBOTS\_TXT"

<a href="#">Link to this property</a>

"SPEED"

<a href="#">Link to this property</a>

"WORKERS\_AI"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dataSource%20%3E%20(schema)>)

dateEnd: optional string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`.

formatdate-time

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional string

Filters results by a relative date range ending at the current time. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`), e.g. `7d`. Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `3dcontrol` covers days -10 to -7, `7dcontrol` covers days -14 to -7, `28dcontrol` covers days -56 to -28, and `10dcontrol` covers days -24 to -14). Mutually exclusive with `dateStart`/`dateEnd`.

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional string

Start of the date range (inclusive). Alternative to `dateRange`; provide together with `dateEnd`.

formatdate-time

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

<details>

<summary>

eventType: optional "EVENT"or "GENERAL"or "OUTAGE"or 3 more

Filters results by event type. EVENT is a legacy alias for GENERAL.

</summary>

One of the following:

"EVENT"

<a href="#">Link to this property</a>

"GENERAL"

<a href="#">Link to this property</a>

"OUTAGE"

<a href="#">Link to this property</a>

"PARTIAL\_PROJECTION"

<a href="#">Link to this property</a>

"PIPELINE"

<a href="#">Link to this property</a>

"TRAFFIC\_ANOMALY"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20eventType%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

geoId: optional string

Filters results by geolocation. Refer to [GeoNames](https://download.geonames.org/export/dump/readme.txt).

maxLength100

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20geoId%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

location: optional string

Filters results by location. Specify an alpha-2 location code.

maxLength2

minLength2

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

log: optional string

Filters results by certificate log.

maxLength100

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20log%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

origin: optional string

Filters results by origin.

maxLength100

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20origin%20%3E%20(schema)>)

<details>

<summary>

outageCause: optional "BLOCKING"or "CABLE\_CUT"or "CYBERATTACK"or 14 more

Filters results by outage cause.

</summary>

One of the following:

"BLOCKING"

<a href="#">Link to this property</a>

"CABLE\_CUT"

<a href="#">Link to this property</a>

"CYBERATTACK"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"FIRE"

<a href="#">Link to this property</a>

"GOVERNMENT\_DIRECTED"

<a href="#">Link to this property</a>

"MAINTENANCE"

<a href="#">Link to this property</a>

"MECHANICAL"

<a href="#">Link to this property</a>

"MILITARY\_ACTION"

<a href="#">Link to this property</a>

"MISCONFIGURATION"

<a href="#">Link to this property</a>

"NATURAL\_DISASTER"

<a href="#">Link to this property</a>

"NETWORK\_PROBLEM"

<a href="#">Link to this property</a>

"POWER\_OUTAGE"

<a href="#">Link to this property</a>

"SOFTWARE"

<a href="#">Link to this property</a>

"TECHNICAL\_PROBLEM"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"WEATHER"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20outageCause%20%3E%20(schema)>)

<details>

<summary>

outageType: optional "NATIONWIDE"or "REGIONAL"or "NETWORK"or "PLATFORM"

Filters results by outage type.

</summary>

One of the following:

"NATIONWIDE"

<a href="#">Link to this property</a>

"REGIONAL"

<a href="#">Link to this property</a>

"NETWORK"

<a href="#">Link to this property</a>

"PLATFORM"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20outageType%20%3E%20(schema)>)

query: optional string

Filters results by a free-text match on the annotation description, id, or linked entities (location, ASN, origin).

maxLength100

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20query%20%3E%20(schema)>)

<details>

<summary>

tags: optional array of "ADM1"or "ADM2"or "API\_TRAFFIC"or 93 more

Filters results by annotation tag. Matches annotations carrying at least one of the given tags.

</summary>

One of the following:

"ADM1"

<a href="#">Link to this property</a>

"ADM2"

<a href="#">Link to this property</a>

"API\_TRAFFIC"

<a href="#">Link to this property</a>

"ARC"

<a href="#">Link to this property</a>

"AS"

<a href="#">Link to this property</a>

"ASN"

<a href="#">Link to this property</a>

"ATTACKS"

<a href="#">Link to this property</a>

"AUTHOR"

<a href="#">Link to this property</a>

"BANDWIDTH"

<a href="#">Link to this property</a>

"BITRATE"

<a href="#">Link to this property</a>

"BOT"

<a href="#">Link to this property</a>

"BOT\_CATEGORY"

<a href="#">Link to this property</a>

"BOT\_CLASS"

<a href="#">Link to this property</a>

"BOT\_KIND"

<a href="#">Link to this property</a>

"BOT\_OPERATOR"

<a href="#">Link to this property</a>

"BROWSER"

<a href="#">Link to this property</a>

"BROWSER\_FAMILY"

<a href="#">Link to this property</a>

"BYTES"

<a href="#">Link to this property</a>

"CA"

<a href="#">Link to this property</a>

"CACHE\_HIT"

<a href="#">Link to this property</a>

"CA\_OWNER"

<a href="#">Link to this property</a>

"CHECK\_RESULT"

<a href="#">Link to this property</a>

"CLIENT\_TYPE"

<a href="#">Link to this property</a>

"COMPROMISED"

<a href="#">Link to this property</a>

"CONTENT\_TYPE"

<a href="#">Link to this property</a>

"CRAWL\_PURPOSE"

<a href="#">Link to this property</a>

"CRAWL\_REFER\_RATIO"

<a href="#">Link to this property</a>

"DEVICE\_TYPE"

<a href="#">Link to this property</a>

"DKIM"

<a href="#">Link to this property</a>

"DMARC"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNSSEC"

<a href="#">Link to this property</a>

"DNSSEC\_AWARE"

<a href="#">Link to this property</a>

"DNSSEC\_E2E"

<a href="#">Link to this property</a>

"DOMAIN\_CATEGORY"

<a href="#">Link to this property</a>

"DURATION"

<a href="#">Link to this property</a>

"EDNS"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"ENTRY\_TYPE"

<a href="#">Link to this property</a>

"EXPIRATION\_STATUS"

<a href="#">Link to this property</a>

"HAS\_IPS"

<a href="#">Link to this property</a>

"HAS\_MATCHING\_ANSWER"

<a href="#">Link to this property</a>

"HAS\_WILDCARDS"

<a href="#">Link to this property</a>

"HTTP\_METHOD"

<a href="#">Link to this property</a>

"HTTP\_PROTOCOL"

<a href="#">Link to this property</a>

"HTTP\_VERSION"

<a href="#">Link to this property</a>

"INDUSTRY"

<a href="#">Link to this property</a>

"IP\_VERSION"

<a href="#">Link to this property</a>

"JITTER"

<a href="#">Link to this property</a>

"KEY\_AGREEMENT"

<a href="#">Link to this property</a>

"LATENCY"

<a href="#">Link to this property</a>

"LOCATION"

<a href="#">Link to this property</a>

"LOCATION\_LATENCY"

<a href="#">Link to this property</a>

"LOG"

<a href="#">Link to this property</a>

"LOG\_API"

<a href="#">Link to this property</a>

"LOG\_OPERATOR"

<a href="#">Link to this property</a>

"MALICIOUS"

<a href="#">Link to this property</a>

"MANAGED\_RULES"

<a href="#">Link to this property</a>

"MITIGATION\_PRODUCT"

<a href="#">Link to this property</a>

"MODEL"

<a href="#">Link to this property</a>

"NAMESERVER\_LATENCY"

<a href="#">Link to this property</a>

"ORIGIN"

<a href="#">Link to this property</a>

"ORIGIN\_AS"

<a href="#">Link to this property</a>

"ORIGIN\_LOCATION"

<a href="#">Link to this property</a>

"ORIGIN\_TARGET\_LOCATION\_PAIR"

<a href="#">Link to this property</a>

"OS"

<a href="#">Link to this property</a>

"PERCENTILE"

<a href="#">Link to this property</a>

"POST\_QUANTUM"

<a href="#">Link to this property</a>

"PREFIX"

<a href="#">Link to this property</a>

"PRODUCT"

<a href="#">Link to this property</a>

"PROTOCOL"

<a href="#">Link to this property</a>

"PROVIDER"

<a href="#">Link to this property</a>

"PUBLIC\_KEY\_ALGORITHM"

<a href="#">Link to this property</a>

"QUERY\_TYPE"

<a href="#">Link to this property</a>

"REFERER"

<a href="#">Link to this property</a>

"REGION"

<a href="#">Link to this property</a>

"RESPONSE\_CODE"

<a href="#">Link to this property</a>

"RESPONSE\_STATUS"

<a href="#">Link to this property</a>

"RESPONSE\_STATUS\_CATEGORY"

<a href="#">Link to this property</a>

"RESPONSE\_TTL"

<a href="#">Link to this property</a>

"SIGNATURE\_ALGORITHM"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"SPF"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SUCCESS\_RATE"

<a href="#">Link to this property</a>

"TARGET\_LOCATION"

<a href="#">Link to this property</a>

"TASK"

<a href="#">Link to this property</a>

"THREAT\_CATEGORY"

<a href="#">Link to this property</a>

"TLD"

<a href="#">Link to this property</a>

"TLD\_DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"TLS\_VERSION"

<a href="#">Link to this property</a>

"UPDATE\_TYPE"

<a href="#">Link to this property</a>

"USER\_AGENT"

<a href="#">Link to this property</a>

"VALIDATION\_LEVEL"

<a href="#">Link to this property</a>

"VECTOR"

<a href="#">Link to this property</a>

"VERTICAL"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tags%20%3E%20(schema)>)

tld: optional string

Filters results by top-level domain.

maxLength63

minLength2

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tld%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {annotations }

</summary>

<details>

<summary>

annotations: array of object {id, asns, asnsDetails, 15 more }

</summary>

id: string

<a href="#">Link to this property</a>

asns: array of number

<a href="#">Link to this property</a>

<details>

<summary>

asnsDetails: array of object {asn, location, name }

</summary>

asn: string

<a href="#">Link to this property</a>

<details>

<summary>

location: object {code, name }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dataSource: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

<a href="#">Link to this property</a>

<details>

<summary>

entities: array of object {entityName, entityType, entityValue }

</summary>

entityName: string

<a href="#">Link to this property</a>

entityType: string

<a href="#">Link to this property</a>

entityValue: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

eventType: string

<a href="#">Link to this property</a>

geoIds: array of string

<a href="#">Link to this property</a>

linkedUrl: string

<a href="#">Link to this property</a>

locations: array of string

<a href="#">Link to this property</a>

<details>

<summary>

locationsDetails: array of object {code, name }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

origins: array of string

<a href="#">Link to this property</a>

<details>

<summary>

originsDetails: array of object {name, origin }

</summary>

name: string

<a href="#">Link to this property</a>

origin: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

outage: object {outageCause, outageType }

</summary>

outageCause: string

<a href="#">Link to this property</a>

outageType: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scope: string

<a href="#">Link to this property</a>

startDate: string

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.annotations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get latest annotations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/annotations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "annotations": [
      {
        "id": "550",
        "asns": [
          189
        ],
        "asnsDetails": [
          {
            "asn": "189",
            "location": {
              "code": "US",
              "name": "United States"
            },
            "name": "LUMEN-LEGACY-L3-PARTITION"
          }
        ],
        "dataSource": "ALL",
        "description": "example",
        "endDate": "2022-09-08T10:00:28Z",
        "entities": [
          {
            "entityName": "GPTBot",
            "entityType": "BOT",
            "entityValue": "gptbot"
          }
        ],
        "eventType": "OUTAGE",
        "geoIds": [
          "2267057"
        ],
        "linkedUrl": "http://example.com",
        "locations": [
          "US"
        ],
        "locationsDetails": [
          {
            "code": "US",
            "name": "United States"
          }
        ],
        "origins": [
          "amazon-us-east-1"
        ],
        "originsDetails": [
          {
            "name": "us-east-1 Amazon Web Services",
            "origin": "amazon-us-east-1"
          }
        ],
        "outage": {
          "outageCause": "CABLE_CUT",
          "outageType": "NATIONWIDE"
        },
        "scope": "Colima, Michoacán, México",
        "startDate": "2022-09-06T10:00:28Z",
        "tags": [
          "string"
        ]
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "annotations": [
      {
        "id": "550",
        "asns": [
          189
        ],
        "asnsDetails": [
          {
            "asn": "189",
            "location": {
              "code": "US",
              "name": "United States"
            },
            "name": "LUMEN-LEGACY-L3-PARTITION"
          }
        ],
        "dataSource": "ALL",
        "description": "example",
        "endDate": "2022-09-08T10:00:28Z",
        "entities": [
          {
            "entityName": "GPTBot",
            "entityType": "BOT",
            "entityValue": "gptbot"
          }
        ],
        "eventType": "OUTAGE",
        "geoIds": [
          "2267057"
        ],
        "linkedUrl": "http://example.com",
        "locations": [
          "US"
        ],
        "locationsDetails": [
          {
            "code": "US",
            "name": "United States"
          }
        ],
        "origins": [
          "amazon-us-east-1"
        ],
        "originsDetails": [
          {
            "name": "us-east-1 Amazon Web Services",
            "origin": "amazon-us-east-1"
          }
        ],
        "outage": {
          "outageCause": "CABLE_CUT",
          "outageType": "NATIONWIDE"
        },
        "scope": "Colima, Michoacán, México",
        "startDate": "2022-09-06T10:00:28Z",
        "tags": [
          "string"
        ]
      }
    ]
  },
  "success": true
}
```