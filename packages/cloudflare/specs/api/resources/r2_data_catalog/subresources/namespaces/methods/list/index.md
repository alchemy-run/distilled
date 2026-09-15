---
title: List namespaces in catalog
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2 Data Catalog](https://developers.cloudflare.com/api/resources/r2_data_catalog)

[Namespaces](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/namespaces)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List namespaces in catalog

GET/accounts/{account\_id}/r2-catalog/{bucket\_name}/namespaces

Returns a list of namespaces in the specified R2 catalog. Supports hierarchical filtering and pagination for efficient traversal of large namespace hierarchies.

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

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Specifies the R2 bucket name.

maxLength63

minLength3

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page\_size: optional number

Maximum number of namespaces to return per page. Defaults to 100, maximum 1000.

maximum1000

minimum1

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_size%20%3E%20(schema)>)

page\_token: optional string

Opaque pagination token from a previous response. Use this to fetch the next page of results.

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_token%20%3E%20(schema)>)

parent: optional string

Parent namespace to filter by. Only returns direct children of this namespace. For nested namespaces, use %1F as separator (e.g., “bronze%1Fanalytics”). Omit this parameter to list top-level namespaces.

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20parent%20%3E%20(schema)>)

return\_details: optional boolean

Whether to include additional metadata (timestamps). When true, response includes created\_at and updated\_at arrays.

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20return_details%20%3E%20(schema)>)

return\_uuids: optional boolean

Whether to include namespace UUIDs in the response. Set to true to receive the namespace\_uuids array.

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20return_uuids%20%3E%20(schema)>)

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

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {namespaces, details, namespace\_uuids, next\_page\_token }

Contains the list of namespaces with optional pagination.

</summary>

namespaces: array of array of string

Lists namespaces in the catalog.

<a href="#">Link to this property</a>

<details>

<summary>

details: optional array of object {namespace, namespace\_uuid, created\_at, updated\_at }

Contains detailed metadata for each namespace when return\_details is true. Each object includes the namespace, UUID, and timestamps.

</summary>

namespace: array of string

Specifies the hierarchical namespace parts as an array of strings. For example, \[“bronze”, “analytics”] represents the namespace “bronze.analytics”.

<a href="#">Link to this property</a>

namespace\_uuid: string

Contains the UUID that persists across renames.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

Indicates the creation timestamp in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

Shows the last update timestamp in ISO 8601 format. Null if never updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

namespace\_uuids: optional array of string

Contains UUIDs for each namespace when return\_uuids is true. The order corresponds to the namespaces array.

<a href="#">Link to this property</a>

next\_page\_token: optional string

Use this opaque token to fetch the next page of results. A null or absent value indicates the last page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List namespaces in catalog

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/namespaces \
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
        "namespace": [
          "bronze"
        ],
        "namespace_uuid": "0199b999-6869-7383-bb1f-d30e059d5326",
        "updated_at": "2025-10-07T12:00:00Z"
      },
      {
        "created_at": "2025-10-07T10:15:00Z",
        "namespace": [
          "silver"
        ],
        "namespace_uuid": "0199b99b-2c88-73b3-8dbb-421e0e8f2757",
        "updated_at": null
      },
      {
        "created_at": "2025-10-07T10:30:00Z",
        "namespace": [
          "gold"
        ],
        "namespace_uuid": "0199b99c-3d99-73c4-9dcc-532f1f9f3868",
        "updated_at": "2025-10-07T11:00:00Z"
      }
    ],
    "namespace_uuids": [
      "0199b999-6869-7383-bb1f-d30e059d5326",
      "0199b99b-2c88-73b3-8dbb-421e0e8f2757",
      "0199b99c-3d99-73c4-9dcc-532f1f9f3868"
    ],
    "namespaces": [
      [
        "bronze"
      ],
      [
        "silver"
      ],
      [
        "gold"
      ]
    ],
    "next_page_token": null
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
        "namespace": [
          "bronze"
        ],
        "namespace_uuid": "0199b999-6869-7383-bb1f-d30e059d5326",
        "updated_at": "2025-10-07T12:00:00Z"
      },
      {
        "created_at": "2025-10-07T10:15:00Z",
        "namespace": [
          "silver"
        ],
        "namespace_uuid": "0199b99b-2c88-73b3-8dbb-421e0e8f2757",
        "updated_at": null
      },
      {
        "created_at": "2025-10-07T10:30:00Z",
        "namespace": [
          "gold"
        ],
        "namespace_uuid": "0199b99c-3d99-73c4-9dcc-532f1f9f3868",
        "updated_at": "2025-10-07T11:00:00Z"
      }
    ],
    "namespace_uuids": [
      "0199b999-6869-7383-bb1f-d30e059d5326",
      "0199b99b-2c88-73b3-8dbb-421e0e8f2757",
      "0199b99c-3d99-73c4-9dcc-532f1f9f3868"
    ],
    "namespaces": [
      [
        "bronze"
      ],
      [
        "silver"
      ],
      [
        "gold"
      ]
    ],
    "next_page_token": null
  },
  "success": true
}
```