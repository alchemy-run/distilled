---
title: Get organization audit logs (Version 2)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Organizations](https://developers.cloudflare.com/api/resources/organizations)

[Logs](https://developers.cloudflare.com/api/resources/organizations/subresources/logs)

[Audit](https://developers.cloudflare.com/api/resources/organizations/subresources/logs/subresources/audit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get organization audit logs (Version 2)

GET/organizations/{organization\_id}/logs/audit

Gets a list of audit logs for an organization.

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

organization\_id: string

The unique id that identifies the organization.

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20organization_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

before: string

Limits the returned results to logs older than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339.

formatdate

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20before%20%3E%20(schema)>)

since: string

Limits the returned results to logs newer than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339.

formatdate

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

<details>

<summary>

id: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by their IDs.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

<details>

<summary>

action\_result: optional object {not }

</summary>

<details>

<summary>

not: optional array of "success"or "failure"

Filters out audit logs by whether the action was successful or not.

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"failure"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20action_result%20%3E%20(schema)>)

<details>

<summary>

action\_type: optional object {not }

</summary>

<details>

<summary>

not: optional array of "create"or "delete"or "view"or "update"

Filters out audit logs by the action type.

</summary>

One of the following:

"create"

<a href="#">Link to this property</a>

"delete"

<a href="#">Link to this property</a>

"view"

<a href="#">Link to this property</a>

"update"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20action_type%20%3E%20(schema)>)

<details>

<summary>

actor\_context: optional object {not }

</summary>

<details>

<summary>

not: optional array of "api"or "api\_key"or "api\_token"or 3 more

Filters out audit logs by the actor context.

- <code>api</code>: The action was performed through the API. The specific credential type was not recorded.
- <code>api_key</code>: The action was authenticated with a Cloudflare Global API Key.
- <code>api_token</code>: The action was authenticated with an API token.
- <code>dash</code>: The action was performed through the Cloudflare dashboard.
- <code>oauth</code>: The action was authenticated with an OAuth token.
- <code>origin_ca_key</code>: The action was authenticated with an Origin CA key.

</summary>

One of the following:

"api"

<a href="#">Link to this property</a>

"api\_key"

<a href="#">Link to this property</a>

"api\_token"

<a href="#">Link to this property</a>

"dash"

<a href="#">Link to this property</a>

"oauth"

<a href="#">Link to this property</a>

"origin\_ca\_key"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20actor_context%20%3E%20(schema)>)

<details>

<summary>

actor\_email: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the actor’s email address.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20actor_email%20%3E%20(schema)>)

<details>

<summary>

actor\_id: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the actor’s user ID.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20actor_id%20%3E%20(schema)>)

<details>

<summary>

actor\_ip\_address: optional object {not }

</summary>

not: optional array of string

Filters out audit logs IP address where the action was initiated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20actor_ip_address%20%3E%20(schema)>)

<details>

<summary>

actor\_token\_id: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the API token ID when the actor context is an api\_token or oauth.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20actor_token_id%20%3E%20(schema)>)

<details>

<summary>

actor\_token\_name: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the API token name when the actor context is an api\_token or oauth.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20actor_token_name%20%3E%20(schema)>)

<details>

<summary>

actor\_type: optional object {not }

</summary>

<details>

<summary>

not: optional array of "cloudflare\_admin"or "system"or "user"

Filters out audit logs by the actor type.

</summary>

One of the following:

"cloudflare\_admin"

<a href="#">Link to this property</a>

"system"

<a href="#">Link to this property</a>

"user"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20actor_type%20%3E%20(schema)>)

cursor: optional string

The cursor is an opaque token used to paginate through large sets of records. It indicates the position from which to continue when requesting the next set of records. A valid cursor value can be obtained from the cursor object in the result\_info structure of a previous response.

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

direction: optional "desc"or "asc"

Sets sorting order.

</summary>

One of the following:

"desc"

<a href="#">Link to this property</a>

"asc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

limit: optional number

The number limits the objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit.

maximum1000

minimum1

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

<details>

<summary>

raw\_cf\_ray\_id: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the response CF Ray ID.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20raw_cf_ray_id%20%3E%20(schema)>)

<details>

<summary>

raw\_method: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the HTTP method for the API call.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20raw_method%20%3E%20(schema)>)

<details>

<summary>

raw\_status\_code: optional object {not }

</summary>

not: optional array of number

Filters out audit logs by the response status code that was returned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20raw_status_code%20%3E%20(schema)>)

<details>

<summary>

raw\_uri: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the request URI.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20raw_uri%20%3E%20(schema)>)

<details>

<summary>

resource\_id: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the resource ID.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20resource_id%20%3E%20(schema)>)

<details>

<summary>

resource\_product: optional object {not }

</summary>

not: optional array of string

Filters out audit logs by the Cloudflare product associated with the changed resource.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20resource_product%20%3E%20(schema)>)

<details>

<summary>

resource\_scope: optional object {not }

</summary>

not: optional array of "organizations"

Filters out audit logs by the resource scope, specifying whether the resource is associated with an organization.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20resource_scope%20%3E%20(schema)>)

<details>

<summary>

resource\_type: optional object {not }

</summary>

not: optional array of string

Filters out audit logs based on the unique type of resource changed by the action.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20resource_type%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

result: optional array of object {id, action, actor, 3 more }

</summary>

id: optional string

A unique identifier for the audit log entry.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: optional object {description, result, time, type }

Provides information about the action performed.

</summary>

description: optional string

A short description of the action performed.

<a href="#">Link to this property</a>

result: optional string

The result of the action, indicating success or failure.

<a href="#">Link to this property</a>

time: optional string

A timestamp indicating when the action was logged.

formatdate-time

<a href="#">Link to this property</a>

type: optional string

A short string that describes the action that was performed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

actor: optional object {id, context, email, 4 more }

Provides details about the actor who performed the action.

</summary>

id: optional string

The ID of the actor who performed the action. If a user performed the action, this will be their User ID.

<a href="#">Link to this property</a>

<details>

<summary>

context: optional "api"or "api\_key"or "api\_token"or 3 more

The context in which the action was initiated.

- <code>api</code>: The action was performed through the API. The specific credential type was not recorded.
- <code>api_key</code>: The action was authenticated with a Cloudflare Global API Key.
- <code>api_token</code>: The action was authenticated with an API token.
- <code>dash</code>: The action was performed through the Cloudflare dashboard.
- <code>oauth</code>: The action was authenticated with an OAuth token.
- <code>origin_ca_key</code>: The action was authenticated with an Origin CA key.

</summary>

One of the following:

"api"

<a href="#">Link to this property</a>

"api\_key"

<a href="#">Link to this property</a>

"api\_token"

<a href="#">Link to this property</a>

"dash"

<a href="#">Link to this property</a>

"oauth"

<a href="#">Link to this property</a>

"origin\_ca\_key"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

email: optional string

The email of the actor who performed the action.

formatemail

<a href="#">Link to this property</a>

ip\_address: optional string

The IP address of the request that performed the action.

<a href="#">Link to this property</a>

token\_id: optional string

The API token ID when the actor context is an api\_token or oauth.

<a href="#">Link to this property</a>

token\_name: optional string

The API token name when the actor context is an api\_token or oauth.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "cloudflare\_admin"or "system"or "user"

The type of actor.

</summary>

One of the following:

"cloudflare\_admin"

<a href="#">Link to this property</a>

"system"

<a href="#">Link to this property</a>

"user"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

organization: optional object {id }

Contains organization related information.

</summary>

id: optional string

A unique identifier for the organization.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

raw: optional object {cf\_ray\_id, method, status\_code, 2 more }

Provides raw information about the request and response.

</summary>

cf\_ray\_id: optional string

The Cloudflare Ray ID for the request.

<a href="#">Link to this property</a>

method: optional string

The HTTP method of the request.

<a href="#">Link to this property</a>

status\_code: optional number

The HTTP response status code returned by the API.

<a href="#">Link to this property</a>

uri: optional string

The URI of the request.

<a href="#">Link to this property</a>

user\_agent: optional string

The client’s user agent string sent with the request.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource: optional object {id, product, request, 3 more }

Provides details about the affected resource.

</summary>

id: optional string

The unique identifier for the affected resource.

<a href="#">Link to this property</a>

product: optional string

The Cloudflare product associated with the resource.

<a href="#">Link to this property</a>

request: optional unknown

<a href="#">Link to this property</a>

response: optional unknown

<a href="#">Link to this property</a>

scope: optional unknown

The scope of the resource.

<a href="#">Link to this property</a>

type: optional string

The type of the resource.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, cursor }

Provides information about the result of the request, including count and cursor.

</summary>

count: optional string

The number of records returned in the response.

<a href="#">Link to this property</a>

cursor: optional string

The cursor token used for pagination.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: optional true

Indicates whether the API call was successful

[Link to this property](#)%20organizations.logs.audit%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get organization audit logs (Version 2)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/logs/audit \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "action": {
        "description": "Add Member",
        "result": "success",
        "time": "2024-04-26T17:31:07Z",
        "type": "create"
      },
      "actor": {
        "id": "f6b5de0326bb5182b8a4840ee01ec774",
        "context": "dash",
        "email": "alice@example.com",
        "ip_address": "198.41.129.166",
        "token_id": "token_id",
        "token_name": "token_name",
        "type": "user"
      },
      "organization": {
        "id": "019c4f65e7607d8c9f6f6b58aa3aff50"
      },
      "raw": {
        "cf_ray_id": "8e9b1c60ef9e1c9a",
        "method": "POST",
        "status_code": 200,
        "uri": "/accounts/4bb334f7c94c4a29a045f03944f072e5/members",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15"
      },
      "resource": {
        "id": "id",
        "product": "organizations",
        "request": {},
        "response": {},
        "scope": {},
        "type": "type"
      }
    }
  ],
  "result_info": {
    "count": "1",
    "cursor": "ASqdKd7dKgxh-aZ8bm0mZos1BtW4BdEqifCzNkEeGRzi_5SN_-362Y8sF-C1TRn60_6rd3z2dIajf9EAPyQ_NmIeAMkacmaJPXipqvP7PLU4t72wyqBeJfjmjdE="
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "action": {
        "description": "Add Member",
        "result": "success",
        "time": "2024-04-26T17:31:07Z",
        "type": "create"
      },
      "actor": {
        "id": "f6b5de0326bb5182b8a4840ee01ec774",
        "context": "dash",
        "email": "alice@example.com",
        "ip_address": "198.41.129.166",
        "token_id": "token_id",
        "token_name": "token_name",
        "type": "user"
      },
      "organization": {
        "id": "019c4f65e7607d8c9f6f6b58aa3aff50"
      },
      "raw": {
        "cf_ray_id": "8e9b1c60ef9e1c9a",
        "method": "POST",
        "status_code": 200,
        "uri": "/accounts/4bb334f7c94c4a29a045f03944f072e5/members",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15"
      },
      "resource": {
        "id": "id",
        "product": "organizations",
        "request": {},
        "response": {},
        "scope": {},
        "type": "type"
      }
    }
  ],
  "result_info": {
    "count": "1",
    "cursor": "ASqdKd7dKgxh-aZ8bm0mZos1BtW4BdEqifCzNkEeGRzi_5SN_-362Y8sF-C1TRn60_6rd3z2dIajf9EAPyQ_NmIeAMkacmaJPXipqvP7PLU4t72wyqBeJfjmjdE="
  },
  "success": true
}
```