---
title: Get top or trending domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Ranking](https://developers.cloudflare.com/api/resources/radar/subresources/ranking)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get top or trending domains

GET/radar/ranking/top

Retrieves the top or trending domains based on their rank. Popular domains are domains of broad appeal based on how people use the Internet. Trending domains are domains that are generating a surge in interest. For more information on top domains, see https://blog.cloudflare.com/radar-domain-rankings/.

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

date: optional array of string

Filters results by the specified array of dates.

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

domainCategory: optional array of string

Filters results by domain category.

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(params)%20default%20%3E%20(param)%20domainCategory%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

location: optional array of string

Filters results by location. Specify a comma-separated list of alpha-2 location codes.

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

rankingType: optional "POPULAR"or "TRENDING\_RISE"or "TRENDING\_STEADY"

The ranking type.

</summary>

One of the following:

"POPULAR"

<a href="#">Link to this property</a>

"TRENDING\_RISE"

<a href="#">Link to this property</a>

"TRENDING\_STEADY"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(params)%20default%20%3E%20(param)%20rankingType%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, top\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

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

top\_0: array of object {categories, domain, rank, pctRankChange }

</summary>

<details>

<summary>

categories: array of object {id, name, superCategoryId }

</summary>

id: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

superCategoryId: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

rank: number

<a href="#">Link to this property</a>

pctRankChange: optional number

Only available in TRENDING rankings.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.ranking%20%3E%20(method)%20top%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get top or trending domains

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/ranking/top \
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
    "top_0": [
      {
        "categories": [
          {
            "id": 81,
            "name": "Content Servers",
            "superCategoryId": 26
          }
        ],
        "domain": "google.com",
        "rank": 1,
        "pctRankChange": 10.8
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
    "top_0": [
      {
        "categories": [
          {
            "id": 81,
            "name": "Content Servers",
            "superCategoryId": 26
          }
        ],
        "domain": "google.com",
        "rank": 1,
        "pctRankChange": 10.8
      }
    ]
  },
  "success": true
}
```