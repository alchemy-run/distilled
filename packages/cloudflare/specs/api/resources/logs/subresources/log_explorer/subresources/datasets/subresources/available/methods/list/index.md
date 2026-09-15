---
title: List available account or zone datasets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logs](https://developers.cloudflare.com/api/resources/logs)

[Log Explorer](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer)

[Datasets](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets)

[Available](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/datasets/subresources/available)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List available account or zone datasets

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/datasets/available

Returns all dataset types that this account or zone can create. Each entry includes the dataset schema and timestamp field.

The schema shows all possible fields for a dataset. However, not all fields may be available for your account or zone. When creating or updating a dataset, only fields available to your account or zone can be enabled. If you request a field that is not available, you will receive an error.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Logs Write``Logs Read`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20logs.log_explorer.datasets.available%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20logs.log_explorer.datasets.available%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

### List available account or zone datasets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/datasets/available \
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
  "result": [
    {
      "dataset": "dataset",
      "object_type": "account",
      "schema": {
        "properties": {
          "foo": "bar"
        },
        "required": [
          "string"
        ],
        "type": "object"
      },
      "timestamp_field": "timestamp_field"
    }
  ]
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
  "result": [
    {
      "dataset": "dataset",
      "object_type": "account",
      "schema": {
        "properties": {
          "foo": "bar"
        },
        "required": [
          "string"
        ],
        "type": "object"
      },
      "timestamp_field": "timestamp_field"
    }
  ]
}
```