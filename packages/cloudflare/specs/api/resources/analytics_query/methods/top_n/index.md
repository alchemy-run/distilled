---
title: Query analytics top-N
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Analytics Query](https://developers.cloudflare.com/api/resources/analytics_query)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Query analytics top-N

POST/accounts/{account\_id}/analytics/query/{dataset}/top-n

Returns the top N results for a dataset by a specified stat. Includes an array of result rows, each containing the requested stats and group-by dimensions.

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

`Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset: string

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%20default%20%3E%20(param)%20dataset%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

filters: array of object {name, op, values }

Filters to apply before aggregating results.

</summary>

name: string

Specifies the column name to filter on. Requires a valid column for the target dataset (e.g. <code>country</code>, <code>allowed</code>, <code>appId</code>).

<a href="#">Link to this property</a>

op: string

Filter operator. Common values: <code>eq</code>, <code>neq</code>, <code>in</code>, <code>not_in</code>, <code>gt</code>, <code>lt</code>, <code>gte</code>, <code>lte</code>.

<a href="#">Link to this property</a>

<details>

<summary>

values: array of stringor booleanor number

Values to match against. Type depends on the column.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%200%20%3E%20(param)%20filters%20%3E%20(schema)>)

from: string

The start of the query time range (inclusive). RFC3339 format with timezone is required (e.g. `2024-11-05T00:00:00Z`).

formatdate-time

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%200%20%3E%20(param)%20from%20%3E%20(schema)>)

groupBy: array of string

Specifies the column names to group results by. Requires valid columns for the target dataset.

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%200%20%3E%20(param)%20groupBy%20%3E%20(schema)>)

n: number

Maximum number of results to return.

formatint64

minimum1

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%200%20%3E%20(param)%20n%20%3E%20(schema)>)

orderBy: string

Specifies the stat name for sorting results in descending order. Requires a valid stat for the target dataset.

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%200%20%3E%20(param)%20orderBy%20%3E%20(schema)>)

stats: array of string

Specifies the stat names to include in results. Requires valid stats for the target dataset (e.g. `attemptsTotal`, `bytesTotal`).

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%200%20%3E%20(param)%20stats%20%3E%20(schema)>)

to: string

Specifies the end of the query time range (exclusive). Requires RFC3339 format with timezone.

formatdate-time

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(params)%200%20%3E%20(param)%20to%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

result: array of map\[unknown]

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20analytics_query%20%3E%20(method)%20top_n%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Query analytics top-N

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/analytics/query/$DATASET/top-n \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "filters": [
            {
              "name": "country",
              "op": "in",
              "values": [
                "US",
                "CA",
                "GB"
              ]
            }
          ],
          "from": "2024-11-05T00:00:00Z",
          "groupBy": [
            "appName",
            "appCategory"
          ],
          "n": 10,
          "orderBy": "bytesTotal",
          "stats": [
            "bytesTotal",
            "requestsTotal"
          ],
          "to": "2024-11-06T00:00:00Z"
        }'
```

200 example

400 example

400 example

401 example

403 example

403 example

```
{
  "errors": [],
  "messages": [
    {
      "code": 1000,
      "message": "API in beta: expect breaking changes."
    }
  ],
  "result": [
    {
      "appCategory": "Collaboration",
      "appName": "Slack",
      "bytesTotal": 10485760,
      "requestsTotal": 1024
    },
    {
      "appCategory": "File Storage",
      "appName": "Dropbox",
      "bytesTotal": 5242880,
      "requestsTotal": 512
    }
  ],
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 11005,
      "message": "art.api.parameter.invalid"
    }
  ],
  "messages": [
    {
      "code": 1002,
      "message": "Parameter 'from' has invalid value '2024-11-05 00:00:00'. Should be of type: 'RFC3339'"
    }
  ],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11005,
      "message": "art.api.parameter.invalid"
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "API in beta: expect breaking changes."
    }
  ],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

400 example

400 example

401 example

403 example

403 example

```
{
  "errors": [],
  "messages": [
    {
      "code": 1000,
      "message": "API in beta: expect breaking changes."
    }
  ],
  "result": [
    {
      "appCategory": "Collaboration",
      "appName": "Slack",
      "bytesTotal": 10485760,
      "requestsTotal": 1024
    },
    {
      "appCategory": "File Storage",
      "appName": "Dropbox",
      "bytesTotal": 5242880,
      "requestsTotal": 512
    }
  ],
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 11005,
      "message": "art.api.parameter.invalid"
    }
  ],
  "messages": [
    {
      "code": 1002,
      "message": "Parameter 'from' has invalid value '2024-11-05 00:00:00'. Should be of type: 'RFC3339'"
    }
  ],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11005,
      "message": "art.api.parameter.invalid"
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "API in beta: expect breaking changes."
    }
  ],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 11003,
      "message": "art.api.resource.insufficient_permissions"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```