---
title: Get Vectorize Index
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Vectorize](https://developers.cloudflare.com/api/resources/vectorize)

[Indexes](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Vectorize Index

GET/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}

Returns the specified Vectorize Index.

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

`Vectorize Write``Vectorize Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

index\_name: string

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20index_name%20%3E%20(schema)>)

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/vectorize#(resource)%20vectorize.indexes%20%3E%20(model)%20create_index%20%3E%20(schema)">CreateIndex</a> { config, created\_on, description, 2 more }

</summary>

<details>

<summary>

config: optional <a href="https://developers.cloudflare.com/api/resources/vectorize#(resource)%20vectorize.indexes%20%3E%20(model)%20index_dimension_configuration%20%3E%20(schema)">IndexDimensionConfiguration</a> { dimensions, metric }

</summary>

dimensions: number

Specifies the number of dimensions for the index

maximum1536

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

metric: "cosine"or "euclidean"or "dot-product"

Specifies the type of metric to use calculating distance.

</summary>

One of the following:

"cosine"

<a href="#">Link to this property</a>

"euclidean"

<a href="#">Link to this property</a>

"dot-product"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

Specifies the timestamp the resource was created as an ISO8601 string.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specifies the description of the index.

<a href="#">Link to this property</a>

modified\_on: optional string

Specifies the timestamp the resource was modified as an ISO8601 string.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Vectorize Index

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME \
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "config": {
      "dimensions": 768,
      "metric": "cosine"
    },
    "created_on": "2022-11-15T18:25:44.442097Z",
    "description": "This is my example index.",
    "modified_on": "2022-11-15T18:25:44.442097Z",
    "name": "example-index"
  },
  "success": true
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "config": {
      "dimensions": 768,
      "metric": "cosine"
    },
    "created_on": "2022-11-15T18:25:44.442097Z",
    "description": "This is my example index.",
    "modified_on": "2022-11-15T18:25:44.442097Z",
    "name": "example-index"
  },
  "success": true
}
```