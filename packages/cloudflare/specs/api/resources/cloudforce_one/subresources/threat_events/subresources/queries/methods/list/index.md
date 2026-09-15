---
title: List all saved event queries
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Queries](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/queries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List all saved event queries

GET/accounts/{account\_id}/cloudforce-one/events/queries

Retrieve all saved event queries for the account

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: number

Unique identifier for the saved query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20id>)

account\_id: number

Account ID

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20account_id>)

alert\_enabled: boolean

Whether alerts are enabled

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20alert_enabled>)

alert\_rollup\_enabled: boolean

Whether alert rollup is enabled

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20alert_rollup_enabled>)

created\_at: string

Creation timestamp

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20created_at>)

name: string

Name of the saved query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20name>)

query\_json: string

JSON string containing the query parameters

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20query_json>)

rule\_enabled: boolean

Whether rule is enabled

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20rule_enabled>)

updated\_at: string

Last update timestamp

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20updated_at>)

user\_email: string

Email of the user who created the query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20user_email>)

custom\_threat\_feed\_id: optional number

Intel Indicator Feed ID (numeric)

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20custom_threat_feed_id>)

rule\_list\_id: optional string

WAF rules list ID for blocking

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20rule_list_id>)

rule\_scope: optional string

Scope for the rule

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20rule_scope>)

### List all saved event queries

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/queries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
  {
    "id": 0,
    "account_id": 0,
    "alert_enabled": true,
    "alert_rollup_enabled": true,
    "created_at": "created_at",
    "name": "name",
    "query_json": "query_json",
    "rule_enabled": true,
    "updated_at": "updated_at",
    "user_email": "user_email",
    "custom_threat_feed_id": 0,
    "rule_list_id": "rule_list_id",
    "rule_scope": "rule_scope"
  }
]
```

##### Returns Examples

200 example

```
[
  {
    "id": 0,
    "account_id": 0,
    "alert_enabled": true,
    "alert_rollup_enabled": true,
    "created_at": "created_at",
    "name": "name",
    "query_json": "query_json",
    "rule_enabled": true,
    "updated_at": "updated_at",
    "user_email": "user_email",
    "custom_threat_feed_id": 0,
    "rule_list_id": "rule_list_id",
    "rule_scope": "rule_scope"
  }
]
```