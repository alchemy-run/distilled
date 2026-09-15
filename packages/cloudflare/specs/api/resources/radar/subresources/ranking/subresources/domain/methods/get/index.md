---
title: Get domain rank details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Ranking](https://developers.cloudflare.com/api/resources/radar/subresources/ranking)

[Domain](https://developers.cloudflare.com/api/resources/radar/subresources/ranking/subresources/domain)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get domain rank details

GET/radar/ranking/domain/{domain}

Retrieves domain rank details. Cloudflare provides an ordered rank for the top 100 domains, but for the remainder it only provides ranking buckets like top 200 thousand, top one million, etc.. These are available through Radar datasets endpoints.

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

domain: string

Domain name.

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

date: optional array of string

Filters results by the specified array of dates.

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

includeTopLocations: optional boolean

Includes top locations in the response.

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20includeTopLocations%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20rankingType%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {details\_0, meta }

</summary>

<details>

<summary>

details\_0: object {categories, bucket, rank, top\_locations }

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

bucket: optional string

Only available in POPULAR ranking for the most recent ranking.

<a href="#">Link to this property</a>

rank: optional number

<a href="#">Link to this property</a>

<details>

<summary>

top\_locations: optional array of object {locationCode, locationName, rank }

</summary>

locationCode: string

<a href="#">Link to this property</a>

locationName: string

<a href="#">Link to this property</a>

rank: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dateRange }

</summary>

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

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.ranking.domain%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get domain rank details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/ranking/domain/$DOMAIN \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "details_0": {
      "categories": [
        {
          "id": 81,
          "name": "Content Servers",
          "superCategoryId": 26
        }
      ],
      "bucket": "2000",
      "rank": 3,
      "top_locations": [
        {
          "locationCode": "US",
          "locationName": "United States",
          "rank": 1
        }
      ]
    },
    "meta": {
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ]
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
    "details_0": {
      "categories": [
        {
          "id": 81,
          "name": "Content Servers",
          "superCategoryId": 26
        }
      ],
      "bucket": "2000",
      "rank": 3,
      "top_locations": [
        {
          "locationCode": "US",
          "locationName": "United States",
          "rank": 1
        }
      ]
    },
    "meta": {
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ]
    }
  },
  "success": true
}
```