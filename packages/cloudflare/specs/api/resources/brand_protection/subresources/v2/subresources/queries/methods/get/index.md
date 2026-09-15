---
title: Get queries
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[V2](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2)

[Queries](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/queries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get queries

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/domain/queries

Get all saved brand protection queries for an account

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

minLength1

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional string

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

page: optional number

Optional page number for paginated list requests. Defaults to 1 when only per\_page is supplied. Omit page and per\_page to preserve the legacy full-list response.

exclusiveMinimum

maximum1000000

minimum0

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Optional number of queries per page for paginated list requests. Defaults to 100 when only page is supplied. Maximum 100. Omit page and per\_page to preserve the legacy full-list response.

exclusiveMinimum

maximum100

minimum0

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

code: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

code: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {created, parameters, query\_id, 3 more } or object {created, parameters, query\_id, 3 more }

</summary>

One of the following:

<details>

<summary>

array of object {created, parameters, query\_id, 3 more }

</summary>

created: string

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {string\_matches, max\_time, min\_time }

</summary>

<details>

<summary>

string\_matches: array of object {pattern }

</summary>

pattern: string

maxLength200

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_time: optional string

<a href="#">Link to this property</a>

min\_time: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

<a href="#">Link to this property</a>

scan: boolean

<a href="#">Link to this property</a>

updated: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {created, parameters, query\_id, 3 more }

</summary>

created: string

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {string\_matches, max\_time, min\_time }

</summary>

<details>

<summary>

string\_matches: array of object {pattern }

</summary>

pattern: string

maxLength200

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_time: optional string

<a href="#">Link to this property</a>

min\_time: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

<a href="#">Link to this property</a>

scan: boolean

<a href="#">Link to this property</a>

updated: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

Present on paginated list responses when page or per\_page is supplied.

</summary>

count: number

minimum0

<a href="#">Link to this property</a>

page: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

per\_page: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

total\_count: number

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get queries

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/domain/queries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": "string"
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": "string"
    }
  ],
  "result": [
    {
      "created": "created",
      "parameters": {
        "string_matches": [
          {
            "pattern": "x"
          }
        ],
        "max_time": "max_time",
        "min_time": "min_time"
      },
      "query_id": 0,
      "query_tag": "query_tag",
      "scan": true,
      "updated": "updated"
    }
  ],
  "success": true,
  "result_info": {
    "count": 0,
    "page": 1,
    "per_page": 1,
    "total_count": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": "string"
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": "string"
    }
  ],
  "result": [
    {
      "created": "created",
      "parameters": {
        "string_matches": [
          {
            "pattern": "x"
          }
        ],
        "max_time": "max_time",
        "min_time": "min_time"
      },
      "query_id": 0,
      "query_tag": "query_tag",
      "scan": true,
      "updated": "updated"
    }
  ],
  "success": true,
  "result_info": {
    "count": 0,
    "page": 1,
    "per_page": 1,
    "total_count": 0
  }
}
```