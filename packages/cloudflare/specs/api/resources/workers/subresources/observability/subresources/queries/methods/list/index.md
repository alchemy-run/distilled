---
title: List queries
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Observability](https://developers.cloudflare.com/api/resources/workers/subresources/observability)

[Queries](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/queries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List queries

GET/accounts/{account\_id}/workers/observability/queries

List saved queries.

##### Security

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>User Service Key</summary>



Used when interacting with the Origin CA certificates API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/#viewchange-your-origin-ca-keys">View/change your key</a>.

**Example:**<code>X-Auth-User-Service-Key: v1.0-144c9defac04969c7bfad8ef-631a41d003a32d25fe878081ef365c49503f7fada600da935e2851a1c7326084b85cbf6429c4b859de8475731dc92a9c329631e6d59e6c73da7b198497172b4cefe071d90d0f5d2719</code>

</details>

##### Accepted Permissions (at least one required)

`Workers Observability Write``Workers Observability Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

order: optional "asc"or "desc"

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

<details>

<summary>

orderBy: optional "created"or "updated"

</summary>

One of the following:

"created"

<a href="#">Link to this property</a>

"updated"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20orderBy%20%3E%20(schema)>)

page: optional number

minimum1

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

perPage: optional number

maximum50

minimum5

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20perPage%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message }

</summary>

message: "Successful request"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, adhoc, created, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

adhoc: boolean

If the query wasn’t explcitly saved

<a href="#">Link to this property</a>

created: string

formatdate-time

<a href="#">Link to this property</a>

createdBy: string

<a href="#">Link to this property</a>

description: string

maxLength1000

<a href="#">Link to this property</a>

name: string

Query name

maxLength250

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {calculations, datasets, filterCombination, 6 more }

</summary>

<details>

<summary>

calculations: optional array of object {operator, alias, key, keyType } or object {key, operator, alias, keyType }

Create Calculations to compute as part of the query.

</summary>

One of the following:

<details>

<summary>

object {operator, alias, key, keyType }

</summary>

<details>

<summary>

operator: "count"or "COUNT"

</summary>

One of the following:

"count"

<a href="#">Link to this property</a>

"COUNT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

alias: optional string

<a href="#">Link to this property</a>

key: optional string

<a href="#">Link to this property</a>

<details>

<summary>

keyType: optional "string"or "number"or "boolean"

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {key, operator, alias, keyType }

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

operator: "uniq"or "max"or "min"or 33 more

</summary>

One of the following:

"uniq"

<a href="#">Link to this property</a>

"max"

<a href="#">Link to this property</a>

"min"

<a href="#">Link to this property</a>

"sum"

<a href="#">Link to this property</a>

"avg"

<a href="#">Link to this property</a>

"median"

<a href="#">Link to this property</a>

"p001"

<a href="#">Link to this property</a>

"p01"

<a href="#">Link to this property</a>

"p05"

<a href="#">Link to this property</a>

"p10"

<a href="#">Link to this property</a>

"p25"

<a href="#">Link to this property</a>

"p75"

<a href="#">Link to this property</a>

"p90"

<a href="#">Link to this property</a>

"p95"

<a href="#">Link to this property</a>

"p99"

<a href="#">Link to this property</a>

"p999"

<a href="#">Link to this property</a>

"stddev"

<a href="#">Link to this property</a>

"variance"

<a href="#">Link to this property</a>

"COUNT\_DISTINCT"

<a href="#">Link to this property</a>

"MAX"

<a href="#">Link to this property</a>

"MIN"

<a href="#">Link to this property</a>

"SUM"

<a href="#">Link to this property</a>

"AVG"

<a href="#">Link to this property</a>

"MEDIAN"

<a href="#">Link to this property</a>

"P001"

<a href="#">Link to this property</a>

"P01"

<a href="#">Link to this property</a>

"P05"

<a href="#">Link to this property</a>

"P10"

<a href="#">Link to this property</a>

"P25"

<a href="#">Link to this property</a>

"P75"

<a href="#">Link to this property</a>

"P90"

<a href="#">Link to this property</a>

"P95"

<a href="#">Link to this property</a>

"P99"

<a href="#">Link to this property</a>

"P999"

<a href="#">Link to this property</a>

"STDDEV"

<a href="#">Link to this property</a>

"VARIANCE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

alias: optional string

<a href="#">Link to this property</a>

<details>

<summary>

keyType: optional "string"or "number"or "boolean"

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

datasets: optional array of string

Set the Datasets to query. Leave it empty to query all the datasets.

<a href="#">Link to this property</a>

<details>

<summary>

filterCombination: optional "and"or "or"or "AND"or "OR"

Set a Flag to describe how to combine the filters on the query.

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

filters: optional array of object {filterCombination, filters, kind } or object {key, operation, type, 2 more }

Configure the Filters to apply to the query. Supports nested groups via kind: ‘group’.

</summary>

One of the following:

<details>

<summary>

object {filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and"or "or"or "AND"or "OR"

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filters: array of unknown

<a href="#">Link to this property</a>

kind: "group"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersObservabilityFilterLeaf object {key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

<a href="#">Link to this property</a>

<details>

<summary>

operation: "includes"or "not\_includes"or "starts\_with"or 27 more

Comparison operator. String operators: includes, not\_includes, starts\_with, ends\_with, regex. Existence: exists, is\_null. Set membership: in, not\_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

<a href="#">Link to this property</a>

"not\_includes"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"regex"

<a href="#">Link to this property</a>

"exists"

<a href="#">Link to this property</a>

"is\_null"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

"="

<a href="#">Link to this property</a>

"!="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"INCLUDES"

<a href="#">Link to this property</a>

"DOES\_NOT\_INCLUDE"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"EXISTS"

<a href="#">Link to this property</a>

"DOES\_NOT\_EXIST"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"NOT\_IN"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "string"or "number"or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor numberor boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

groupBys: optional array of object {type, value }

Define how to group the results of the query.

</summary>

<details>

<summary>

type: "string"or "number"or "boolean"

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

havings: optional array of object {key, operation, value }

Configure the Having clauses that filter on calculations in the query result.

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

operation: "eq"or "neq"or "gt"or 3 more

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

limit: optional number

Set a limit on the number of results / records returned by the query

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

needle: optional object {value, isRegex, matchCase }

Define an expression to search using full-text search.

</summary>

<details>

<summary>

value: stringor numberor boolean

maxLength1000

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isRegex: optional boolean

<a href="#">Link to this property</a>

matchCase: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

orderBy: optional object {value, order }

Configure the order of the results returned by the query.

</summary>

value: string

Configure which Calculation to order the results by.

<a href="#">Link to this property</a>

<details>

<summary>

order: optional "asc"or "desc"

Set the order of the results

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated: string

formatdate-time

<a href="#">Link to this property</a>

updatedBy: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workers.observability.queries%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List queries

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/queries \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "id": "id",
      "adhoc": true,
      "created": "2019-12-27T18:11:19.117Z",
      "createdBy": "createdBy",
      "description": "Query description",
      "name": "x",
      "parameters": {
        "calculations": [
          {
            "operator": "count",
            "alias": "alias",
            "key": "key",
            "keyType": "string"
          }
        ],
        "datasets": [
          "string"
        ],
        "filterCombination": "and",
        "filters": [
          {
            "filterCombination": "and",
            "filters": [
              {}
            ],
            "kind": "group"
          }
        ],
        "groupBys": [
          {
            "type": "string",
            "value": "value"
          }
        ],
        "havings": [
          {
            "key": "key",
            "operation": "eq",
            "value": 0
          }
        ],
        "limit": 0,
        "needle": {
          "value": "string",
          "isRegex": true,
          "matchCase": true
        },
        "orderBy": {
          "value": "value",
          "order": "asc"
        }
      },
      "updated": "2019-12-27T18:11:19.117Z",
      "updatedBy": "updatedBy"
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "id": "id",
      "adhoc": true,
      "created": "2019-12-27T18:11:19.117Z",
      "createdBy": "createdBy",
      "description": "Query description",
      "name": "x",
      "parameters": {
        "calculations": [
          {
            "operator": "count",
            "alias": "alias",
            "key": "key",
            "keyType": "string"
          }
        ],
        "datasets": [
          "string"
        ],
        "filterCombination": "and",
        "filters": [
          {
            "filterCombination": "and",
            "filters": [
              {}
            ],
            "kind": "group"
          }
        ],
        "groupBys": [
          {
            "type": "string",
            "value": "value"
          }
        ],
        "havings": [
          {
            "key": "key",
            "operation": "eq",
            "value": 0
          }
        ],
        "limit": 0,
        "needle": {
          "value": "string",
          "isRegex": true,
          "matchCase": true
        },
        "orderBy": {
          "value": "value",
          "order": "asc"
        }
      },
      "updated": "2019-12-27T18:11:19.117Z",
      "updatedBy": "updatedBy"
    }
  ],
  "success": true
}
```