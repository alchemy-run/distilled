---
title: List Vectors
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Vectorize](https://developers.cloudflare.com/api/resources/vectorize)

[Indexes](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Vectors

GET/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/list

Returns a paginated list of vector identifiers from the specified index.

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20list_vectors%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

index\_name: string

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20list_vectors%20%3E%20(params)%20default%20%3E%20(param)%20index_name%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

count: optional number

Maximum number of vectors to return

maximum1000

minimum1

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20list_vectors%20%3E%20(params)%20default%20%3E%20(param)%20count%20%3E%20(schema)>)

cursor: optional string

Cursor for pagination to get the next page of results

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20list_vectors%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20list_vectors%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20list_vectors%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {count, isTruncated, totalCount, 3 more }

</summary>

count: number

Number of vectors returned in this response

<a href="#">Link to this property</a>

isTruncated: boolean

Whether there are more vectors available beyond this response

<a href="#">Link to this property</a>

totalCount: number

Total number of vectors in the index

<a href="#">Link to this property</a>

<details>

<summary>

vectors: array of object {id }

Array of vector items

</summary>

id: string

Identifier for a Vector

maxLength64

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cursorExpirationTimestamp: optional string

When the cursor expires as an ISO8601 string

formatdate-time

<a href="#">Link to this property</a>

nextCursor: optional string

Cursor for the next page of results

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20list_vectors%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20list_vectors%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Vectors

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/list \
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
    "count": 100,
    "isTruncated": true,
    "totalCount": 500,
    "vectors": [
      {
        "id": "some-vector-id-023e105f4ecef8ad9ca31a8372d0c353"
      }
    ],
    "cursorExpirationTimestamp": "2025-08-12T20:32:52.469144957Z",
    "nextCursor": "suUTaDY5PFUiRweVccnzyt9n75suNPbXHPshvCzue5mHjtj7Letjvzlza9eGj099"
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
    "count": 100,
    "isTruncated": true,
    "totalCount": 500,
    "vectors": [
      {
        "id": "some-vector-id-023e105f4ecef8ad9ca31a8372d0c353"
      }
    ],
    "cursorExpirationTimestamp": "2025-08-12T20:32:52.469144957Z",
    "nextCursor": "suUTaDY5PFUiRweVccnzyt9n75suNPbXHPshvCzue5mHjtj7Letjvzlza9eGj099"
  },
  "success": true
}
```