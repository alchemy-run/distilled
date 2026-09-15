---
title: List Metadata Indexes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Vectorize](https://developers.cloudflare.com/api/resources/vectorize)

[Indexes](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes)

[Metadata Index](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/subresources/metadata_index)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Metadata Indexes

GET/accounts/{account\_id}/vectorize/v2/indexes/{index\_name}/metadata\_index/list

List Metadata Indexes for the specified Vectorize Index.

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

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

index\_name: string

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20index_name%20%3E%20(schema)>)

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

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {metadataIndexes }

</summary>

<details>

<summary>

metadataIndexes: optional array of object {indexType, propertyName }

Array of indexed metadata properties.

</summary>

<details>

<summary>

indexType: optional "string"or "number"or "boolean"

Specifies the type of indexed metadata property.

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

propertyName: optional string

Specifies the indexed metadata property.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20vectorize.indexes.metadata_index%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Metadata Indexes

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/metadata_index/list \
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
    "metadataIndexes": [
      {
        "indexType": "number",
        "propertyName": "some-num-prop"
      },
      {
        "indexType": "string",
        "propertyName": "some-str-prop"
      },
      {
        "indexType": "boolean",
        "propertyName": "some-bool-prop"
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
    "metadataIndexes": [
      {
        "indexType": "number",
        "propertyName": "some-num-prop"
      },
      {
        "indexType": "string",
        "propertyName": "some-str-prop"
      },
      {
        "indexType": "boolean",
        "propertyName": "some-bool-prop"
      }
    ]
  },
  "success": true
}
```