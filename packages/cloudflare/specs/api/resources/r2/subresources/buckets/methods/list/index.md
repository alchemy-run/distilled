---
title: List Buckets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Buckets

GET/accounts/{account\_id}/r2/buckets

Lists all R2 buckets on your account.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Workers R2 Storage Write``Workers R2 Storage Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Pagination cursor received during the last List Buckets call. R2 buckets are paginated using cursors instead of page numbers.

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order buckets.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

name\_contains: optional string

Bucket names to filter by. Only buckets with this phrase in their name will be returned.

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name_contains%20%3E%20(schema)>)

order: optional "name"

Field to order buckets by.

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

per\_page: optional number

Maximum number of buckets to return in a single call.

maximum1000

minimum1

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

start\_after: optional string

Bucket name to start searching after. Buckets are ordered lexicographically.

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20start_after%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

<details>

<summary>

"cf-r2-jurisdiction": optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {buckets }

</summary>

<details>

<summary>

buckets: optional array of <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets%20%3E%20(model)%20bucket%20%3E%20(schema)">Bucket</a> { creation\_date, jurisdiction, location, 2 more }

</summary>

creation\_date: optional string

Creation timestamp.

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

location: optional "apac"or "eeur"or "enam"or 3 more

Location of the bucket.

</summary>

One of the following:

"apac"

<a href="#">Link to this property</a>

"eeur"

<a href="#">Link to this property</a>

"enam"

<a href="#">Link to this property</a>

"weur"

<a href="#">Link to this property</a>

"wnam"

<a href="#">Link to this property</a>

"oc"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the bucket.

maxLength64

minLength3

<a href="#">Link to this property</a>

<details>

<summary>

storage\_class: optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {cursor, per\_page }

</summary>

cursor: optional string

A continuation token that should be used to fetch the next page of results.

<a href="#">Link to this property</a>

per\_page: optional number

Maximum number of results on this page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Buckets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "buckets": [
      {
        "creation_date": "creation_date",
        "jurisdiction": "default",
        "location": "apac",
        "name": "example-bucket",
        "storage_class": "Standard"
      }
    ]
  },
  "success": true,
  "result_info": {
    "cursor": "1-JTdCJTIydiUyMiUzQTElMkMlMjJzdGFydEFmdGVyJTIyJTNBJTIyZGF2aWRwdWJsaWMlMjIlN0Q=",
    "per_page": 20
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "buckets": [
      {
        "creation_date": "creation_date",
        "jurisdiction": "default",
        "location": "apac",
        "name": "example-bucket",
        "storage_class": "Standard"
      }
    ]
  },
  "success": true,
  "result_info": {
    "cursor": "1-JTdCJTIydiUyMiUzQTElMkMlMjJzdGFydEFmdGVyJTIyJTNBJTIyZGF2aWRwdWJsaWMlMjIlN0Q=",
    "per_page": 20
  }
}
```