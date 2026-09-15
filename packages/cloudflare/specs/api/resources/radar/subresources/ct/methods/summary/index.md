---
title: Get certificate distribution by dimension
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[CT](https://developers.cloudflare.com/api/resources/radar/subresources/ct)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get certificate distribution by dimension

GET/radar/ct/summary/{dimension}

Retrieves an aggregated summary of certificates grouped by the specified dimension.

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

<details>

<summary>

dimension: "CA"or "CA\_OWNER"or "DURATION"or 11 more

Specifies the certificate attribute by which to group the results.

</summary>

One of the following:

"CA"

<a href="#">Link to this property</a>

"CA\_OWNER"

<a href="#">Link to this property</a>

"DURATION"

<a href="#">Link to this property</a>

"ENTRY\_TYPE"

<a href="#">Link to this property</a>

"EXPIRATION\_STATUS"

<a href="#">Link to this property</a>

"HAS\_IPS"

<a href="#">Link to this property</a>

"HAS\_WILDCARDS"

<a href="#">Link to this property</a>

"LOG"

<a href="#">Link to this property</a>

"LOG\_API"

<a href="#">Link to this property</a>

"LOG\_OPERATOR"

<a href="#">Link to this property</a>

"PUBLIC\_KEY\_ALGORITHM"

<a href="#">Link to this property</a>

"SIGNATURE\_ALGORITHM"

<a href="#">Link to this property</a>

"TLD"

<a href="#">Link to this property</a>

"VALIDATION\_LEVEL"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dimension%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

ca: optional array of string

Filters results by certificate authority.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20ca%20%3E%20(schema)>)

caOwner: optional array of string

Filters results by certificate authority owner.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20caOwner%20%3E%20(schema)>)

dateEnd: optional array of string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`. When requesting comparison series, every series must resolve to the same duration as the main series. Each `dateStart`/`dateEnd` is floored to the nearest 15 minutes before evaluation, so windows whose durations match only before alignment may be rejected.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional array of string

Filters results by relative date range ending at the current time, with each value producing a separate series. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`). Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `7dcontrol` covers days -14 to -7, `10dcontrol` covers days -24 to -14). For example, pass `7d` and `7dcontrol` to compare this week with the previous week. All series must resolve to the same duration as the main series; relative ranges (including `control`) satisfy this automatically. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional array of string

Start of the date range. Alternative to `dateRange`; provide together with `dateEnd`. When requesting comparison series, every series must resolve to the same duration as the main series. Each `dateStart`/`dateEnd` is floored to the nearest 15 minutes before evaluation, so windows whose durations match only before alignment may be rejected.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

<details>

<summary>

duration: optional array of "LTE\_3D"or "GT\_3D\_LTE\_7D"or "GT\_7D\_LTE\_10D"or 4 more

Filters results by certificate duration.

</summary>

One of the following:

"LTE\_3D"

<a href="#">Link to this property</a>

"GT\_3D\_LTE\_7D"

<a href="#">Link to this property</a>

"GT\_7D\_LTE\_10D"

<a href="#">Link to this property</a>

"GT\_10D\_LTE\_47D"

<a href="#">Link to this property</a>

"GT\_47D\_LTE\_100D"

<a href="#">Link to this property</a>

"GT\_100D\_LTE\_200D"

<a href="#">Link to this property</a>

"GT\_200D"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20duration%20%3E%20(schema)>)

<details>

<summary>

entryType: optional array of "PRECERTIFICATE"or "CERTIFICATE"

Filters results by entry type (certificate vs. pre-certificate). Incompatible with the <code>tld</code> filter/dimension.

</summary>

One of the following:

"PRECERTIFICATE"

<a href="#">Link to this property</a>

"CERTIFICATE"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20entryType%20%3E%20(schema)>)

<details>

<summary>

expirationStatus: optional array of "EXPIRED"or "VALID"

Filters results by expiration status (expired vs. valid).

</summary>

One of the following:

"EXPIRED"

<a href="#">Link to this property</a>

"VALID"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20expirationStatus%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

hasIps: optional array of boolean

Filters results based on whether the certificates are bound to specific IP addresses.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20hasIps%20%3E%20(schema)>)

hasWildcards: optional array of boolean

Filters results based on whether the certificates contain wildcard domains.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20hasWildcards%20%3E%20(schema)>)

limitPerGroup: optional number

Limits the number of objects per group to the top items within the specified time range. When item count exceeds the limit, extra items appear grouped under an “other” category. Only supported on high-cardinality dimensions; otherwise the request is rejected. Minimum value is 2.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20limitPerGroup%20%3E%20(schema)>)

log: optional array of string

Filters results by certificate log. Incompatible with the `tld` filter/dimension.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20log%20%3E%20(schema)>)

<details>

<summary>

logApi: optional array of "RFC6962"or "STATIC"

Filters results by certificate log API (RFC6962 vs. static). Incompatible with the <code>tld</code> filter/dimension.

</summary>

One of the following:

"RFC6962"

<a href="#">Link to this property</a>

"STATIC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20logApi%20%3E%20(schema)>)

logOperator: optional array of string

Filters results by certificate log operator. Incompatible with the `tld` filter/dimension.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20logOperator%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

normalization: optional "RAW\_VALUES"or "PERCENTAGE"

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20normalization%20%3E%20(schema)>)

<details>

<summary>

publicKeyAlgorithm: optional array of "DSA"or "ECDSA"or "RSA"

Filters results by public key algorithm.

</summary>

One of the following:

"DSA"

<a href="#">Link to this property</a>

"ECDSA"

<a href="#">Link to this property</a>

"RSA"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20publicKeyAlgorithm%20%3E%20(schema)>)

<details>

<summary>

signatureAlgorithm: optional array of "DSA\_SHA\_1"or "DSA\_SHA\_256"or "ECDSA\_SHA\_1"or 12 more

Filters results by signature algorithm.

</summary>

One of the following:

"DSA\_SHA\_1"

<a href="#">Link to this property</a>

"DSA\_SHA\_256"

<a href="#">Link to this property</a>

"ECDSA\_SHA\_1"

<a href="#">Link to this property</a>

"ECDSA\_SHA\_256"

<a href="#">Link to this property</a>

"ECDSA\_SHA\_384"

<a href="#">Link to this property</a>

"ECDSA\_SHA\_512"

<a href="#">Link to this property</a>

"PSS\_SHA\_256"

<a href="#">Link to this property</a>

"PSS\_SHA\_384"

<a href="#">Link to this property</a>

"PSS\_SHA\_512"

<a href="#">Link to this property</a>

"RSA\_MD2"

<a href="#">Link to this property</a>

"RSA\_MD5"

<a href="#">Link to this property</a>

"RSA\_SHA\_1"

<a href="#">Link to this property</a>

"RSA\_SHA\_256"

<a href="#">Link to this property</a>

"RSA\_SHA\_384"

<a href="#">Link to this property</a>

"RSA\_SHA\_512"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20signatureAlgorithm%20%3E%20(schema)>)

tld: optional array of string

Filters results by top-level domain. Incompatible with the `log`, `logApi`, `logOperator`, and `entryType` filters/dimensions.

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20tld%20%3E%20(schema)>)

<details>

<summary>

uniqueEntries: optional array of "true"or "false"

Specifies whether to filter out duplicate certificates and pre-certificates. Set to true for unique entries only.

</summary>

One of the following:

"true"

<a href="#">Link to this property</a>

"false"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20uniqueEntries%20%3E%20(schema)>)

<details>

<summary>

validationLevel: optional array of "DOMAIN"or "ORGANIZATION"or "EXTENDED"

Filters results by validation level.

</summary>

One of the following:

"DOMAIN"

<a href="#">Link to this property</a>

"ORGANIZATION"

<a href="#">Link to this property</a>

"EXTENDED"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20validationLevel%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object {annotations, level }

</summary>

<details>

<summary>

annotations: array of object {dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Data source for annotations.

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

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "GENERAL"or "OUTAGE"or "PARTIAL\_PROJECTION"or 2 more

Event type for annotations.

</summary>

One of the following:

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

<a href="#">Link to this property</a>

isInstantaneous: boolean

Whether event is a single point in time or a time range.

<a href="#">Link to this property</a>

linkedUrl: string

formaturi

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

Provides an indication of how much confidence Cloudflare has in the data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

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

<details>

<summary>

summary\_0: map\[string]or object {rfc6962, static } or object {gt\_121d, gt\_16d\_lte\_31d, gt\_31d\_lte\_91d, 3 more } or 5 more

</summary>

One of the following:

map\[string]

<a href="#">Link to this property</a>

<details>

<summary>

object {rfc6962, static }

</summary>

rfc6962: string

<a href="#">Link to this property</a>

static: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {gt\_121d, gt\_16d\_lte\_31d, gt\_31d\_lte\_91d, 3 more }

</summary>

gt\_121d: string

<a href="#">Link to this property</a>

gt\_16d\_lte\_31d: string

<a href="#">Link to this property</a>

gt\_31d\_lte\_91d: string

<a href="#">Link to this property</a>

gt\_3d\_lte\_16d: string

<a href="#">Link to this property</a>

gt\_91d\_lte\_121d: string

<a href="#">Link to this property</a>

lte\_3d: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {CERTIFICATE, PRECERTIFICATE }

</summary>

CERTIFICATE: string

<a href="#">Link to this property</a>

PRECERTIFICATE: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {EXPIRED, VALID }

</summary>

EXPIRED: string

<a href="#">Link to this property</a>

VALID: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {NEGATIVE, POSITIVE }

</summary>

NEGATIVE: string

<a href="#">Link to this property</a>

POSITIVE: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {DSA, ECDSA, RSA }

</summary>

DSA: string

<a href="#">Link to this property</a>

ECDSA: string

<a href="#">Link to this property</a>

RSA: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {domain, extended, organization, unknown }

</summary>

domain: string

<a href="#">Link to this property</a>

extended: string

<a href="#">Link to this property</a>

organization: string

<a href="#">Link to this property</a>

unknown: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.ct%20%3E%20(method)%20summary%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get certificate distribution by dimension

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/ct/summary/$DIMENSION \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "meta": {
      "confidenceInfo": {
        "annotations": [
          {
            "dataSource": "ALL",
            "description": "Cable cut in Tonga",
            "endDate": "2019-12-27T18:11:19.117Z",
            "eventType": "GENERAL",
            "isInstantaneous": true,
            "linkedUrl": "https://example.com",
            "startDate": "2019-12-27T18:11:19.117Z",
            "tags": [
              "BOT_CLASS"
            ]
          }
        ],
        "level": 0
      },
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z",
      "normalization": "PERCENTAGE",
      "units": [
        {
          "name": "*",
          "value": "requests"
        }
      ]
    },
    "summary_0": {
      "DigiCert": "10.274394",
      "GoDaddy": "8.381743",
      "Internet Security Research Group": "63.40249"
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
      "confidenceInfo": {
        "annotations": [
          {
            "dataSource": "ALL",
            "description": "Cable cut in Tonga",
            "endDate": "2019-12-27T18:11:19.117Z",
            "eventType": "GENERAL",
            "isInstantaneous": true,
            "linkedUrl": "https://example.com",
            "startDate": "2019-12-27T18:11:19.117Z",
            "tags": [
              "BOT_CLASS"
            ]
          }
        ],
        "level": 0
      },
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z",
      "normalization": "PERCENTAGE",
      "units": [
        {
          "name": "*",
          "value": "requests"
        }
      ]
    },
    "summary_0": {
      "DigiCert": "10.274394",
      "GoDaddy": "8.381743",
      "Internet Security Research Group": "63.40249"
    }
  },
  "success": true
}
```