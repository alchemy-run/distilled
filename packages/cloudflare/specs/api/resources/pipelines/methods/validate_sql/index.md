---
title: Validate SQL
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pipelines](https://developers.cloudflare.com/api/resources/pipelines)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Validate SQL

POST/accounts/{account\_id}/pipelines/v1/validate\_sql

Validates that the Pipelines SQL is correct.

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

`Pipelines Write`

##### P ath ParametersExpand Collapse

account\_id: string

Specifies the public ID of the account.

[Link to this property](#)%20pipelines%20%3E%20(method)%20validate_sql%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

sql: string

Specifies SQL to validate.

[Link to this property](#)%20pipelines%20%3E%20(method)%20validate_sql%20%3E%20(params)%200%20%3E%20(param)%20sql%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {tables, graph }

</summary>

<details>

<summary>

tables: map\[object {id, name, type, version } ]

Indicates tables involved in the processing.

</summary>

id: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

version: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

graph: optional object {edges, nodes }

Indicates the processing flow to implement the SQL.

</summary>

<details>

<summary>

edges: array of object {dest\_id, edge\_type, key\_type, 2 more }

</summary>

dest\_id: number

formatint32

minimum0

<a href="#">Link to this property</a>

edge\_type: string

<a href="#">Link to this property</a>

key\_type: string

<a href="#">Link to this property</a>

src\_id: number

formatint32

minimum0

<a href="#">Link to this property</a>

value\_type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

nodes: array of object {description, node\_id, operator, parallelism }

</summary>

description: string

<a href="#">Link to this property</a>

node\_id: number

formatint32

minimum0

<a href="#">Link to this property</a>

operator: string

<a href="#">Link to this property</a>

parallelism: number

formatint32

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(method)%20validate_sql%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20pipelines%20%3E%20(method)%20validate_sql%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Validate SQL

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/validate_sql \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "sql": "insert into sink select * from source;"
        }'
```

200 example

```
{
  "result": {
    "tables": {
      "foo": {
        "id": "id",
        "name": "name",
        "type": "type",
        "version": 0
      }
    },
    "graph": {
      "edges": [
        {
          "dest_id": 0,
          "edge_type": "edge_type",
          "key_type": "key_type",
          "src_id": 0,
          "value_type": "value_type"
        }
      ],
      "nodes": [
        {
          "description": "description",
          "node_id": 0,
          "operator": "operator",
          "parallelism": 0
        }
      ]
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "tables": {
      "foo": {
        "id": "id",
        "name": "name",
        "type": "type",
        "version": 0
      }
    },
    "graph": {
      "edges": [
        {
          "dest_id": 0,
          "edge_type": "edge_type",
          "key_type": "key_type",
          "src_id": 0,
          "value_type": "value_type"
        }
      ],
      "nodes": [
        {
          "description": "description",
          "node_id": 0,
          "operator": "operator",
          "parallelism": 0
        }
      ]
    }
  },
  "success": true
}
```