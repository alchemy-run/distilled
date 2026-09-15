---
title: Get user audit logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Audit Logs](https://developers.cloudflare.com/api/resources/user/subresources/audit_logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get user audit logs

GET/user/audit\_logs

Gets a list of audit logs for a user account. Can be filtered by who made the change, on which zone, and the timeframe of the change.

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

`Account Settings Write``Account Settings Read`

##### Q uery ParametersExpand Collapse

id: optional string

Finds a specific log by its ID.

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

<details>

<summary>

action: optional object {type }

</summary>

type: optional string

Filters by the action type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20action%20%3E%20(schema)>)

<details>

<summary>

actor: optional object {email, ip }

</summary>

email: optional string

Filters by the email address of the actor that made the change.

formatemail

<a href="#">Link to this property</a>

ip: optional string

Filters by the IP address of the request that made the change by specific IP address or valid CIDR Range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20actor%20%3E%20(schema)>)

<details>

<summary>

before: optional stringor string

Limits the returned results to logs older than the specified date. A <code>full-date</code> that conforms to RFC3339.

</summary>

One of the following:

FullDate = string

Limits the returned results to logs older than the specified date. A <code>full-date</code> that conforms to RFC3339.

<a href="#">Link to this property</a>

DateTime = string

Limits the returned results to logs older than the specified date. A <code>date-time</code> that conforms to RFC3339.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20before%20%3E%20(schema)>)

<details>

<summary>

direction: optional "desc"or "asc"

Changes the direction of the chronological sorting.

</summary>

One of the following:

"desc"

<a href="#">Link to this property</a>

"asc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

export: optional boolean

Indicates that this request is an export of logs in CSV format.

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20export%20%3E%20(schema)>)

hide\_user\_logs: optional boolean

Indicates whether or not to hide user level audit logs.

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hide_user_logs%20%3E%20(schema)>)

page: optional number

Defines which page of results to return.

minimum1

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Sets the number of results to return per page.

maximum1000

minimum1

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

since: optional stringor string

Limits the returned results to logs newer than the specified date. A <code>full-date</code> that conforms to RFC3339.

</summary>

One of the following:

FullDate = string

Limits the returned results to logs newer than the specified date. A <code>full-date</code> that conforms to RFC3339.

<a href="#">Link to this property</a>

DateTime = string

Limits the returned results to logs newer than the specified date. A <code>date-time</code> that conforms to RFC3339.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

<details>

<summary>

zone: optional object {name }

</summary>

name: optional string

Filters by the name of the zone associated to the change.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

object {errors, messages, result, success }

</summary>

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

<details>

<summary>

messages: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20audit_log%20%3E%20(schema)">AuditLog</a> { id, action, actor, 7 more }

</summary>

id: optional string

A string that uniquely identifies the audit log.

<a href="#">Link to this property</a>

<details>

<summary>

action: optional object {result, type }

</summary>

result: optional boolean

A boolean that indicates if the action attempted was successful.

<a href="#">Link to this property</a>

type: optional string

A short string that describes the action that was performed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

actor: optional object {id, email, ip, type }

</summary>

id: optional string

The ID of the actor that performed the action. If a user performed the action, this will be their User ID.

<a href="#">Link to this property</a>

email: optional string

The email of the user that performed the action.

formatemail

<a href="#">Link to this property</a>

ip: optional string

The IP address of the request that performed the action.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "user"or "admin"or "Cloudflare"

The type of actor, whether a User, Cloudflare Admin, or an Automated System.

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"admin"

<a href="#">Link to this property</a>

"Cloudflare"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface: optional string

The source of the event.

<a href="#">Link to this property</a>

metadata: optional unknown

An object which can lend more context to the action being logged. This is a flexible value and varies between different actions.

<a href="#">Link to this property</a>

newValue: optional string

The new value of the resource that was modified.

<a href="#">Link to this property</a>

oldValue: optional string

The value of the resource before it was modified.

<a href="#">Link to this property</a>

<details>

<summary>

owner: optional object {id }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource: optional object {id, type }

</summary>

id: optional string

An identifier for the resource that was affected by the action.

<a href="#">Link to this property</a>

type: optional string

A short string that describes the resource that was affected by the action.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

when: optional string

A UTC RFC3339 timestamp that specifies when the action being logged occured.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(variant)%200>)

<details>

<summary>

AaaAPIResponseCommon object {errors, messages, success }

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

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.audit_logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(variant)%201>)

### Get user audit logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/audit_logs \
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
  "result": [
    {
      "id": "d5b0f326-1232-4452-8858-1089bd7168ef",
      "action": {
        "result": true,
        "type": "change_setting"
      },
      "actor": {
        "id": "f6b5de0326bb5182b8a4840ee01ec774",
        "email": "michelle@example.com",
        "ip": "198.41.129.166",
        "type": "user"
      },
      "interface": "API",
      "metadata": {
        "name": "security_level",
        "type": "firewall",
        "value": "high",
        "zone_name": "example.com"
      },
      "newValue": "low",
      "oldValue": "high",
      "owner": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353"
      },
      "resource": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "type": "zone"
      },
      "when": "2017-04-26T17:31:07Z"
    }
  ],
  "success": true
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
  "result": [
    {
      "id": "d5b0f326-1232-4452-8858-1089bd7168ef",
      "action": {
        "result": true,
        "type": "change_setting"
      },
      "actor": {
        "id": "f6b5de0326bb5182b8a4840ee01ec774",
        "email": "michelle@example.com",
        "ip": "198.41.129.166",
        "type": "user"
      },
      "interface": "API",
      "metadata": {
        "name": "security_level",
        "type": "firewall",
        "value": "high",
        "zone_name": "example.com"
      },
      "newValue": "low",
      "oldValue": "high",
      "owner": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353"
      },
      "resource": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "type": "zone"
      },
      "when": "2017-04-26T17:31:07Z"
    }
  ],
  "success": true
}
```