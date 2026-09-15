---
title: List datasets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Datasets](https://developers.cloudflare.com/api/resources/radar/subresources/datasets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List datasets

GET/radar/datasets

Retrieves a list of datasets.

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

<details>

<summary>

datasetType: optional "RANKING\_BUCKET"or "REPORT"

Filters results by dataset type.

</summary>

One of the following:

"RANKING\_BUCKET"

<a href="#">Link to this property</a>

"REPORT"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetType%20%3E%20(schema)>)

date: optional string

Filters results by the specified date.

formatdate

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {datasets }

</summary>

<details>

<summary>

datasets: array of object {id, description, meta, 3 more }

</summary>

id: number

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

meta: unknown

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.datasets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List datasets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/datasets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "datasets": [
      {
        "id": 3,
        "description": "This dataset contains a list of the op 20000 domains globally",
        "meta": {},
        "tags": [
          "global"
        ],
        "title": "Top bucket 20000 domains",
        "type": "RANKING_BUCKET"
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
    "datasets": [
      {
        "id": 3,
        "description": "This dataset contains a list of the op 20000 domains globally",
        "meta": {},
        "tags": [
          "global"
        ],
        "title": "Top bucket 20000 domains",
        "type": "RANKING_BUCKET"
      }
    ]
  },
  "success": true
}
```