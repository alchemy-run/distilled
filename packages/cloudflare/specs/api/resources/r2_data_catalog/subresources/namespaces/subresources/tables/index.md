---
title: Tables
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2 Data Catalog](https://developers.cloudflare.com/api/resources/r2_data_catalog)

[Namespaces](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/namespaces)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tables

##### [List tables in namespace](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/namespaces/subresources/tables/methods/list)

GET/accounts/{account\_id}/r2-catalog/{bucket\_name}/namespaces/{namespace}/tables

##### ModelsExpand Collapse

<details>

<summary>

TableListResponse object {identifiers, details, next\_page\_token, table\_uuids }

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

[Link to this property](#)%20r2_data_catalog.namespaces.tables%20%3E%20(model)%20table_list_response%20%3E%20(schema)>)

#### TablesMaintenance Configs

##### [Get table maintenance configuration](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/namespaces/subresources/tables/subresources/maintenance_configs/methods/get)

GET/accounts/{account\_id}/r2-catalog/{bucket\_name}/namespaces/{namespace}/tables/{table\_name}/maintenance-configs

##### [Update table maintenance configuration](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/namespaces/subresources/tables/subresources/maintenance_configs/methods/update)

POST/accounts/{account\_id}/r2-catalog/{bucket\_name}/namespaces/{namespace}/tables/{table\_name}/maintenance-configs

##### ModelsExpand Collapse

<details>

<summary>

MaintenanceConfigGetResponse object {maintenance\_config }

Contains table maintenance configuration.

</summary>

<details>

<summary>

maintenance\_config: object {compaction, interval, snapshot\_expiration }

Configures maintenance for the table.

</summary>

<details>

<summary>

compaction: optional object {state, target\_size\_mb, next\_eligible\_at }

Configures compaction settings for table optimization.

</summary>

<details>

<summary>

state: "enabled"or "disabled"

Specifies the state of maintenance operations.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target\_size\_mb: "64"or "128"or "256"or "512"

Sets the target file size for compaction in megabytes. Defaults to “128”.

</summary>

One of the following:

"64"

<a href="#">Link to this property</a>

"128"

<a href="#">Link to this property</a>

"256"

<a href="#">Link to this property</a>

"512"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_eligible\_at: optional string

Earliest time when the scheduler can claim this operation. Null when disabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

Scheduling interval between normal table maintenance runs.

<a href="#">Link to this property</a>

<details>

<summary>

snapshot\_expiration: optional object {max\_snapshot\_age, min\_snapshots\_to\_keep, state, next\_eligible\_at }

</summary>

max\_snapshot\_age: string

Specifies the maximum age for snapshots.

<a href="#">Link to this property</a>

min\_snapshots\_to\_keep: number

Specifies the minimum number of snapshots to retain. Defaults to 100.

formatint64

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

state: "enabled"or "disabled"

Specifies the state of maintenance operations.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_eligible\_at: optional string

Earliest time when the scheduler can claim this operation. Null when disabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.namespaces.tables.maintenance_configs%20%3E%20(model)%20maintenance_config_get_response%20%3E%20(schema)>)

<details>

<summary>

MaintenanceConfigUpdateResponse object {compaction, interval, snapshot\_expiration }

Configures maintenance for the table.

</summary>

<details>

<summary>

compaction: optional object {state, target\_size\_mb, next\_eligible\_at }

Configures compaction settings for table optimization.

</summary>

<details>

<summary>

state: "enabled"or "disabled"

Specifies the state of maintenance operations.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target\_size\_mb: "64"or "128"or "256"or "512"

Sets the target file size for compaction in megabytes. Defaults to “128”.

</summary>

One of the following:

"64"

<a href="#">Link to this property</a>

"128"

<a href="#">Link to this property</a>

"256"

<a href="#">Link to this property</a>

"512"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_eligible\_at: optional string

Earliest time when the scheduler can claim this operation. Null when disabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

Scheduling interval between normal table maintenance runs.

<a href="#">Link to this property</a>

<details>

<summary>

snapshot\_expiration: optional object {max\_snapshot\_age, min\_snapshots\_to\_keep, state, next\_eligible\_at }

</summary>

max\_snapshot\_age: string

Specifies the maximum age for snapshots.

<a href="#">Link to this property</a>

min\_snapshots\_to\_keep: number

Specifies the minimum number of snapshots to retain. Defaults to 100.

formatint64

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

state: "enabled"or "disabled"

Specifies the state of maintenance operations.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_eligible\_at: optional string

Earliest time when the scheduler can claim this operation. Null when disabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.namespaces.tables.maintenance_configs%20%3E%20(model)%20maintenance_config_update_response%20%3E%20(schema)>)