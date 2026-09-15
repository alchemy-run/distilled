---
title: List tables in namespace
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2 Data Catalog](https://developers.cloudflare.com/api/resources/r2_data_catalog)

[Namespaces](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/namespaces)

[Tables](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/namespaces/subresources/tables)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List tables in namespace

GET/accounts/{account\_id}/r2-catalog/{bucket\_name}/namespaces/{namespace}/tables

Returns a list of tables in the specified namespace within an R2 catalog. Supports pagination for efficient traversal of large table collections.

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

`Workers R2 Data Catalog Write``Workers R2 Data Catalog Read`

##### P ath ParametersExpand Collapse

account\_id: string

Use this to identify the account.

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Specifies the R2 bucket name.

maxLength63

minLength3

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

namespace: string

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20namespace%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page\_size: optional number

Maximum number of tables to return per page. Defaults to 100, maximum 1000.

maximum1000

minimum1

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_size%20%3E%20(schema)>)

page\_token: optional string

Opaque pagination token from a previous response. Use this to fetch the next page of results.

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_token%20%3E%20(schema)>)

return\_details: optional boolean

Whether to include additional metadata (timestamps, locations). When true, response includes created\_at, updated\_at, metadata\_locations, and locations arrays.

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20return_details%20%3E%20(schema)>)

return\_uuids: optional boolean

Whether to include table UUIDs in the response. Set to true to receive the table\_uuids array.

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20return_uuids%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

Contains errors if the API call was unsuccessful.

</summary>

code: number

Specifies the error code.

<a href="#">Link to this property</a>

message: string

Describes the error.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

Contains informational messages.

</summary>

code: number

Specifies the message code.

<a href="#">Link to this property</a>

message: string

Contains the message text.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {identifiers, details, next\_page\_token, table\_uuids }

Contains the list of tables with optional pagination.

</summary>

<details>

<summary>

identifiers: array of object {name, namespace }

Lists tables in the namespace.

</summary>

name: string

Specifies the table name.

<a href="#">Link to this property</a>

namespace: array of string

Specifies the hierarchical namespace parts as an array of strings. For example, \[“bronze”, “analytics”] represents the namespace “bronze.analytics”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

details: optional array of object {identifier, table\_uuid, created\_at, 3 more }

Contains detailed metadata for each table when return\_details is true. Each object includes identifier, UUID, timestamps, and locations.

</summary>

<details>

<summary>

identifier: object {name, namespace }

Specifies a unique table identifier within a catalog.

</summary>

name: string

Specifies the table name.

<a href="#">Link to this property</a>

namespace: array of string

Specifies the hierarchical namespace parts as an array of strings. For example, \[“bronze”, “analytics”] represents the namespace “bronze.analytics”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

table\_uuid: string

Contains the UUID that persists across renames.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

Indicates the creation timestamp in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

location: optional string

Specifies the base S3 URI for table storage location.

<a href="#">Link to this property</a>

metadata\_location: optional string

Contains the S3 URI to table metadata file. Null for staged tables.

<a href="#">Link to this property</a>

updated\_at: optional string

Shows the last update timestamp in ISO 8601 format. Null if never updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_page\_token: optional string

Use this opaque token to fetch the next page of results. A null or absent value indicates the last page.

<a href="#">Link to this property</a>

table\_uuids: optional array of string

Contains UUIDs for each table when return\_uuids is true. The order corresponds to the identifiers array.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List tables in namespace

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/namespaces/$NAMESPACE/tables \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "details": [
      {
        "created_at": "2025-10-07T10:00:00Z",
        "identifier": {
          "name": "events",
          "namespace": [
            "bronze"
          ]
        },
        "location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id/",
        "metadata_location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id/metadata/v1.metadata.json",
        "table_uuid": "0199b9a1-28a0-71e0-a73e-b0fc32c8468e",
        "updated_at": "2025-10-07T15:00:00Z"
      },
      {
        "created_at": "2025-10-07T10:30:00Z",
        "identifier": {
          "name": "users",
          "namespace": [
            "bronze"
          ]
        },
        "location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id-2/",
        "metadata_location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id-2/metadata/v2.metadata.json",
        "table_uuid": "0199b9a1-3c74-7731-bf53-d8c67ead079d",
        "updated_at": "2025-10-07T16:00:00Z"
      }
    ],
    "identifiers": [
      {
        "name": "events",
        "namespace": [
          "bronze"
        ]
      },
      {
        "name": "users",
        "namespace": [
          "bronze"
        ]
      }
    ],
    "next_page_token": null,
    "table_uuids": [
      "0199b9a1-28a0-71e0-a73e-b0fc32c8468e",
      "0199b9a1-3c74-7731-bf53-d8c67ead079d"
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "details": [
      {
        "created_at": "2025-10-07T10:00:00Z",
        "identifier": {
          "name": "events",
          "namespace": [
            "bronze"
          ]
        },
        "location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id/",
        "metadata_location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id/metadata/v1.metadata.json",
        "table_uuid": "0199b9a1-28a0-71e0-a73e-b0fc32c8468e",
        "updated_at": "2025-10-07T15:00:00Z"
      },
      {
        "created_at": "2025-10-07T10:30:00Z",
        "identifier": {
          "name": "users",
          "namespace": [
            "bronze"
          ]
        },
        "location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id-2/",
        "metadata_location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id-2/metadata/v2.metadata.json",
        "table_uuid": "0199b9a1-3c74-7731-bf53-d8c67ead079d",
        "updated_at": "2025-10-07T16:00:00Z"
      }
    ],
    "identifiers": [
      {
        "name": "events",
        "namespace": [
          "bronze"
        ]
      },
      {
        "name": "users",
        "namespace": [
          "bronze"
        ]
      }
    ],
    "next_page_token": null,
    "table_uuids": [
      "0199b9a1-28a0-71e0-a73e-b0fc32c8468e",
      "0199b9a1-3c74-7731-bf53-d8c67ead079d"
    ]
  },
  "success": true
}
```