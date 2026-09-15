---
title: Log Explorer
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logs](https://developers.cloudflare.com/api/resources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Log Explorer

#### Log ExplorerQuery

##### [Run a log query](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/query/methods/sql)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/query/sql

##### ModelsExpand Collapse

QuerySqlResponse = map\[unknown]

[Link to this property](#)%20logs.log_explorer.query%20%3E%20(model)%20query_sql_response%20%3E%20(schema)>)

#### Log ExplorerDatasets

##### [List account or zone datasets](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/datasets

##### [Get an account or zone dataset](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/datasets/{dataset\_id}

##### [Create an account or zone dataset](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/datasets

##### [Update an account or zone dataset](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/datasets/{dataset\_id}

##### [Delete an account or zone dataset](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/datasets/{dataset\_id}

##### ModelsExpand Collapse

<details>

<summary>

CreateRequest object {dataset, fields, filter }

</summary>

dataset: string

Dataset type name to create (e.g. <code>http_requests</code>).

<a href="#">Link to this property</a>

<details>

<summary>

fields: optional array of object {enabled, name }

Controls which fields the API ingests. Defaults to all available fields when absent.

</summary>

enabled: boolean

Whether the API includes this field in log ingest.

<a href="#">Link to this property</a>

name: string

Field name in lowercase.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filter: optional string

Optional Logpush filter predicate to restrict which events are ingested. If provided, replaces the dataset’s default filter entirely. See <a href="https://developers.cloudflare.com/logs/reference/filters/">Logpush filters</a> for syntax and examples.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(model)%20create_request%20%3E%20(schema)>)

<details>

<summary>

Dataset object {created\_at, dataset, dataset\_id, 7 more }

A Log Explorer dataset summary. List endpoints return this type and omit field configuration; use the single-dataset endpoint to retrieve it.

</summary>

created\_at: string

RFC3339 timestamp recording when the API created this dataset.

formatdate-time

<a href="#">Link to this property</a>

dataset: string

Dataset type name (e.g. <code>http_requests</code>).

<a href="#">Link to this property</a>

dataset\_id: string

Unique dataset ID.

<a href="#">Link to this property</a>

deletion\_protection: boolean

Whether deletion is blocked. Set to <code>false</code> before deleting the dataset.

<a href="#">Link to this property</a>

enabled: boolean

Whether log ingest is currently active for this dataset.

<a href="#">Link to this property</a>

<details>

<summary>

fields: array of object {enabled, name }

The field configuration for this dataset.

</summary>

enabled: boolean

Whether the API includes this field in log ingest.

<a href="#">Link to this property</a>

name: string

Field name in lowercase.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

object\_id: string

Public ID of the account or zone that owns this dataset.

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: "account"or "zone"

Whether this dataset belongs to an account or a zone.

</summary>

One of the following:

"account"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

RFC3339 timestamp recording when the API last updated this dataset.

formatdate-time

<a href="#">Link to this property</a>

filter: optional string

The Logpush filter predicate applied to this dataset. Omitted when no filter is set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(model)%20dataset%20%3E%20(schema)>)

<details>

<summary>

DatasetSummary object {created\_at, dataset, dataset\_id, 5 more }

A Log Explorer dataset summary. List endpoints return this type and omit field configuration; use the single-dataset endpoint to retrieve it.

</summary>

created\_at: string

RFC3339 timestamp recording when the API created this dataset.

formatdate-time

<a href="#">Link to this property</a>

dataset: string

Dataset type name (e.g. <code>http_requests</code>).

<a href="#">Link to this property</a>

dataset\_id: string

Unique dataset ID.

<a href="#">Link to this property</a>

deletion\_protection: boolean

Whether deletion is blocked. Set to <code>false</code> before deleting the dataset.

<a href="#">Link to this property</a>

enabled: boolean

Whether log ingest is currently active for this dataset.

<a href="#">Link to this property</a>

object\_id: string

Public ID of the account or zone that owns this dataset.

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: "account"or "zone"

Whether this dataset belongs to an account or a zone.

</summary>

One of the following:

"account"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

RFC3339 timestamp recording when the API last updated this dataset.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(model)%20dataset_summary%20%3E%20(schema)>)

<details>

<summary>

UpdateRequest object {enabled, deletion\_protection, fields, filter }

</summary>

enabled: boolean

Whether to enable or disable log ingest for this dataset.

<a href="#">Link to this property</a>

deletion\_protection: optional boolean

Set to <code>false</code> to allow deletion of this dataset.

<a href="#">Link to this property</a>

<details>

<summary>

fields: optional array of object {enabled, name }

Controls which fields the API ingests after the update. Defaults to all available fields when absent.

</summary>

enabled: boolean

Whether the API includes this field in log ingest.

<a href="#">Link to this property</a>

name: string

Field name in lowercase.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filter: optional string

Optional Logpush filter predicate to restrict which events are ingested. If omitted, the existing filter is left unchanged. Set to an empty string (<code>""</code>) to clear the filter. Otherwise, replaces the dataset’s filter entirely. See <a href="https://developers.cloudflare.com/logs/reference/filters/">Logpush filters</a> for syntax and examples.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(model)%20update_request%20%3E%20(schema)>)

#### Log ExplorerDatasetsAvailable

##### [List available account or zone datasets](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets/subresources/available/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/datasets/available

##### ModelsExpand Collapse

<details>

<summary>

AvailableDataset object {dataset, object\_type, schema, timestamp\_field }

A dataset type that the account or zone can create.

</summary>

dataset: string

Dataset type name (e.g. <code>http_requests</code>).

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: "account"or "zone"

Whether this dataset type is account-scoped or zone-scoped.

</summary>

One of the following:

"account"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: object {properties, required, type }

JSON Schema that describes the fields this dataset exposes.

</summary>

properties: optional map\[unknown]

<a href="#">Link to this property</a>

required: optional array of string

<a href="#">Link to this property</a>

type: optional "object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp\_field: string

The primary timestamp field name for this dataset.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.log_explorer.datasets.available%20%3E%20(model)%20available_dataset%20%3E%20(schema)>)

<details>

<summary>

AvailableList object {errors, messages, success, result }

</summary>

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

<a href="#">Link to this property</a>

messages: array of string

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/logs#(resource)%20logs.log_explorer.datasets.available%20%3E%20(model)%20available_dataset%20%3E%20(schema)">AvailableDataset</a> { dataset, object\_type, schema, timestamp\_field }

</summary>

dataset: string

Dataset type name (e.g. <code>http_requests</code>).

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: "account"or "zone"

Whether this dataset type is account-scoped or zone-scoped.

</summary>

One of the following:

"account"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schema: object {properties, required, type }

JSON Schema that describes the fields this dataset exposes.

</summary>

properties: optional map\[unknown]

<a href="#">Link to this property</a>

required: optional array of string

<a href="#">Link to this property</a>

type: optional "object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp\_field: string

The primary timestamp field name for this dataset.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.log_explorer.datasets.available%20%3E%20(model)%20available_list%20%3E%20(schema)>)