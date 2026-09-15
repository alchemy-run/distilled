---
title: Get Vectors By Identifier
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Vectorize](https://developers.cloudflare.com/api/resources/vectorize)

[Indexes](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Vectors By Identifier

POST/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/get\_by\_ids

Get a set of vectors from an index by their vector identifiers.

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get_by_ids%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

index\_name: string

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get_by_ids%20%3E%20(params)%20default%20%3E%20(param)%20index_name%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

ids: optional array of string

A list of vector identifiers to retrieve from the index indicated by the path.

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get_by_ids%20%3E%20(params)%200%20%3E%20(param)%20ids%20%3E%20(schema)>)

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get_by_ids%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get_by_ids%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

result: unknown

Array of vectors with matching ids.

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get_by_ids%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20vectorize.indexes%20%3E%20(method)%20get_by_ids%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Vectors By Identifier

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/get_by_ids \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ids": [
            "5121db81354a40c6aedc3fe1ace51c59",
            "f90eb49c2107486abdfd78c67e853430"
          ]
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
  "result": [
    {
      "id": "some-vector-id",
      "metadata": {
        "another-key": "another-value",
        "customer-id": 442
      },
      "values": [
        0.812,
        0.621,
        0.261
      ]
    },
    {
      "id": "other-vector-id",
      "metadata": {
        "another-key": "with-a-value",
        "customer-id": 2151
      },
      "namespace": "namespaced",
      "values": [
        0.961,
        0.751,
        0.661
      ]
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
  "result": [
    {
      "id": "some-vector-id",
      "metadata": {
        "another-key": "another-value",
        "customer-id": 442
      },
      "values": [
        0.812,
        0.621,
        0.261
      ]
    },
    {
      "id": "other-vector-id",
      "metadata": {
        "another-key": "with-a-value",
        "customer-id": 2151
      },
      "namespace": "namespaced",
      "values": [
        0.961,
        0.751,
        0.661
      ]
    }
  ],
  "success": true
}
```