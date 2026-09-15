---
title: Retrieves account or zone Audit Log
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Security Center](https://developers.cloudflare.com/api/resources/security_center)

[Insights](https://developers.cloudflare.com/api/resources/security_center/subresources/insights)

[Audit Logs](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/audit_logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Retrieves account or zone Audit Log

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/audit-log

Lists audit log entries for all Security Center insights in the account or zone, showing changes to insight status and classification.

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

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

before: optional string

Filter entries changed before this timestamp (RFC 3339).

formatdate-time

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20before%20%3E%20(schema)>)

changed\_by: optional string

Filter by the actor that made the change.

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20changed_by%20%3E%20(schema)>)

cursor: optional string

Opaque cursor for pagination. Use the cursor value from result\_info of the previous response.

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

field\_changed: optional "status"or "user\_classification"

Filter by the field that was changed.

</summary>

One of the following:

"status"

<a href="#">Link to this property</a>

"user\_classification"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20field_changed%20%3E%20(schema)>)

<details>

<summary>

order: optional "asc"or "desc"

Sort order for results. Use ‘asc’ for oldest first or ‘desc’ for newest first.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum1000

minimum1

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

since: optional string

Filter entries changed at or after this timestamp (RFC 3339).

formatdate-time

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, changed\_at, changed\_by, 6 more }

</summary>

id: optional string

UUIDv7 identifier for the audit log entry, time-ordered.

formatuuid

<a href="#">Link to this property</a>

changed\_at: optional string

The timestamp when the change occurred.

formatdate-time

<a href="#">Link to this property</a>

changed\_by: optional string

The actor that made the change. ‘system’ for automated changes, or a user identifier.

<a href="#">Link to this property</a>

current\_value: optional string

The value of the field after the change. Null if the field was cleared.

<a href="#">Link to this property</a>

<details>

<summary>

field\_changed: optional "status"or "user\_classification"

The field that was changed.

</summary>

One of the following:

"status"

<a href="#">Link to this property</a>

"user\_classification"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

issue\_id: optional string

The ID of the insight this audit log entry relates to.

<a href="#">Link to this property</a>

previous\_value: optional string

The value of the field before the change. Null if the field was not previously set.

<a href="#">Link to this property</a>

rationale: optional string

Optional rationale provided for the change.

<a href="#">Link to this property</a>

zone\_id: optional number

The zone ID associated with the insight. Only present for zone-level insights.

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, cursor, per\_page }

</summary>

count: optional number

The number of items in the current result set.

<a href="#">Link to this property</a>

cursor: optional string

Opaque cursor for the next page of results. Absent when there are no more results.

<a href="#">Link to this property</a>

per\_page: optional number

The requested number of items per page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Retrieves account or zone Audit Log

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/audit-log \
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "changed_at": "2019-12-27T18:11:19.117Z",
      "changed_by": "system",
      "current_value": "current_value",
      "field_changed": "status",
      "issue_id": "issue_id",
      "previous_value": "previous_value",
      "rationale": "rationale",
      "zone_id": 0
    }
  ],
  "result_info": {
    "count": 25,
    "cursor": "cursor",
    "per_page": 25
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "changed_at": "2019-12-27T18:11:19.117Z",
      "changed_by": "system",
      "current_value": "current_value",
      "field_changed": "status",
      "issue_id": "issue_id",
      "previous_value": "previous_value",
      "rationale": "rationale",
      "zone_id": 0
    }
  ],
  "result_info": {
    "count": 25,
    "cursor": "cursor",
    "per_page": 25
  }
}
```