---
title: Run a log query
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logs](https://developers.cloudflare.com/api/resources/logs)

[Log Explorer](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer)

[Query](https://developers.cloudflare.com/api/resources/logs/subresources/log_explorer/subresources/query)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Run a log query

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/logs/explorer/query/sql

Run a SQL query against account or zone-level datasets.

Timestamp fields are RFC3339 strings. Filter with: WHERE {timestamp\_field} >= now() - INTERVAL ‘30’ DAY WHERE {timestamp\_field} >= ‘2026-04-01T00:00:00Z’ WHERE {timestamp\_field} BETWEEN ‘2026-04-01T00:00:00Z’ AND ‘2026-04-30T23:59:59Z’

List configured account or zone datasets to see enabled account or zone-level datasets. Zone-level datasets will not appear here. List available account or zone datasets to inspect their schemas and timestamp fields.

For more information about the datasets, and the meaning of each field, check out https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Logs Write``Logs Read`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20logs.log_explorer.query%20%3E%20(method)%20sql%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20logs.log_explorer.query%20%3E%20(method)%20sql%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersExpand Collapse

body: file

SQL query to execute.

[Link to this property](#)%20logs.log_explorer.query%20%3E%20(method)%20sql%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20logs.log_explorer.query%20%3E%20(method)%20sql%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20logs.log_explorer.query%20%3E%20(method)%20sql%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20logs.log_explorer.query%20%3E%20(method)%20sql%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional array of map\[unknown]

[Link to this property](#)%20logs.log_explorer.query%20%3E%20(method)%20sql%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Run a log query

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/query/sql \
    -H 'Content-Type: text/plain' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'body=@/path/to/body'
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
      "foo": "bar"
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
      "foo": "bar"
    }
  ]
}
```