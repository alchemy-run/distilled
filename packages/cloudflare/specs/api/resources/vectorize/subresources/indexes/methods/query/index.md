---
title: Query Vectors
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Vectorize](https://developers.cloudflare.com/api/resources/vectorize)

[Indexes](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Query Vectors

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/query

Finds vectors closest to a given vector in an index.

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

index\_name: string

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(params)%20default%20%3E%20(param)%20index_name%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

vector: array of number

The search vector that will be used to find the nearest neighbors.

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(params)%200%20%3E%20(param)%20vector%20%3E%20(schema)>)

filter: optional unknown

A metadata filter expression used to limit nearest neighbor results.

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(params)%200%20%3E%20(param)%20filter%20%3E%20(schema)>)

<details>

<summary>

returnMetadata: optional "none"or "indexed"or "all"

Whether to return no metadata, indexed metadata or all metadata associated with the closest vectors.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"indexed"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(params)%200%20%3E%20(param)%20returnMetadata%20%3E%20(schema)>)

returnValues: optional boolean

Whether to return the values associated with the closest vectors.

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(params)%200%20%3E%20(param)%20returnValues%20%3E%20(schema)>)

topK: optional number

The number of nearest neighbors to find.

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(params)%200%20%3E%20(param)%20topK%20%3E%20(schema)>)

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {count, matches }

</summary>

count: optional number

Specifies the count of vectors returned by the search

<a href="#">Link to this property</a>

<details>

<summary>

matches: optional array of object {id, metadata, namespace, 2 more }

Array of vectors matched by the search

</summary>

id: optional string

Identifier for a Vector

maxLength64

<a href="#">Link to this property</a>

metadata: optional unknown

<a href="#">Link to this property</a>

namespace: optional string

<a href="#">Link to this property</a>

score: optional number

The score of the vector according to the index’s distance metric

<a href="#">Link to this property</a>

values: optional array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20query%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Query Vectors

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/query \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "vector": [
            0.5,
            0.5,
            0.5
          ],
          "filter": {
            "has_viewed": {
              "$ne": true
            },
            "streaming_platform": "netflix"
          },
          "topK": 5
        }'
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
    "count": 0,
    "matches": [
      {
        "id": "some-vector-id-023e105f4ecef8ad9ca31a8372d0c353",
        "metadata": {},
        "namespace": "namespace",
        "score": 0,
        "values": [
          0
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
    "count": 0,
    "matches": [
      {
        "id": "some-vector-id-023e105f4ecef8ad9ca31a8372d0c353",
        "metadata": {},
        "namespace": "namespace",
        "score": 0,
        "values": [
          0
        ]
      }
    ]
  },
  "success": true
}
```