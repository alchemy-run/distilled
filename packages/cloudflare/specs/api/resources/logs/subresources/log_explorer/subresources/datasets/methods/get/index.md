---
title: Get an account or zone dataset
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logs](https://developers.cloudflare.com/api/resources/logs)

[Log Explorer](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer)

[Datasets](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get an account or zone dataset

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/datasets/{dataset\_id}

Retrieve a single Log Explorer dataset by ID for the account or zone.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Logs Write`

##### P ath ParametersExpand Collapse

dataset\_id: string

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/logs#(resource)%20logs.log_explorer.datasets%20%3E%20(model)%20dataset%20%3E%20(schema)">Dataset</a> { created\_at, dataset, dataset\_id, 7 more }

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

[Link to this property](#)%20logs.log_explorer.datasets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get an account or zone dataset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/datasets/$DATASET_ID \
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
    "string"
  ],
  "success": true,
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "dataset": "dataset",
    "dataset_id": "dataset_id",
    "deletion_protection": true,
    "enabled": true,
    "fields": [
      {
        "enabled": true,
        "name": "name"
      }
    ],
    "object_id": "object_id",
    "object_type": "account",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "filter": "filter"
  }
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
    "string"
  ],
  "success": true,
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "dataset": "dataset",
    "dataset_id": "dataset_id",
    "deletion_protection": true,
    "enabled": true,
    "fields": [
      {
        "enabled": true,
        "name": "name"
      }
    ],
    "object_id": "object_id",
    "object_type": "account",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "filter": "filter"
  }
}
```