---
title: Create a saved event query
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

# Create a saved event query

POST/accounts/{account\_id}/cloudforce-one/events/queries/create

Create a new saved event query for the account

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

alert\_enabled: boolean

Enable alerts for this query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20alert_enabled%20%3E%20(schema)>)

alert\_rollup\_enabled: boolean

Enable alert rollup for this query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20alert_rollup_enabled%20%3E%20(schema)>)

name: string

Unique name for the saved query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

query\_json: string

JSON string containing the query parameters

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20query_json%20%3E%20(schema)>)

rule\_enabled: boolean

Enable rule for this query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20rule_enabled%20%3E%20(schema)>)

rule\_scope: optional string

Scope for the rule

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20rule_scope%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: number

Unique identifier for the saved query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20id>)

account\_id: number

Account ID

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20account_id>)

alert\_enabled: boolean

Whether alerts are enabled

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20alert_enabled>)

alert\_rollup\_enabled: boolean

Whether alert rollup is enabled

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20alert_rollup_enabled>)

created\_at: string

Creation timestamp

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20created_at>)

name: string

Name of the saved query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20name>)

query\_json: string

JSON string containing the query parameters

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20query_json>)

rule\_enabled: boolean

Whether rule is enabled

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20rule_enabled>)

updated\_at: string

Last update timestamp

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20updated_at>)

user\_email: string

Email of the user who created the query

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20user_email>)

custom\_threat\_feed\_id: optional number

Intel Indicator Feed ID (numeric)

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20custom_threat_feed_id>)

rule\_list\_id: optional string

WAF rules list ID for blocking

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20rule_list_id>)

rule\_scope: optional string

Scope for the rule

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)%20%3E%20(property)%20rule_scope>)

### Create a saved event query

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/queries/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "alert_enabled": true,
          "alert_rollup_enabled": true,
          "name": "name",
          "query_json": "query_json",
          "rule_enabled": true
        }'
```

200 example

```
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
```

##### Returns Examples

200 example

```
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
```