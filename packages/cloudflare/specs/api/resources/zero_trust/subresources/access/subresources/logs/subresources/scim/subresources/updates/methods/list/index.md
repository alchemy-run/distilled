---
title: List Access SCIM update logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Logs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs)

[SCIM](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs/subresources/scim)

[Updates](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs/subresources/scim/subresources/updates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Access SCIM update logs

GET/accounts/{account\_id}/access/logs/scim/updates

Lists Access SCIM update logs that maintain a record of updates made to User and Group resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).

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

`Access: SCIM Logs Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

idp\_id: array of string

The unique Id of the IdP that has SCIM enabled.

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20idp_id%20%3E%20(schema)>)

cf\_resource\_id: optional array of string

The unique Cloudflare-generated Id of the SCIM resource. Pass once for a single lookup (`?cf_resource_id=A`) or repeat the parameter (`?cf_resource_id=A&cf_resource_id=B`) to filter by multiple resources in one request.

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cf_resource_id%20%3E%20(schema)>)

<details>

<summary>

direction: optional "desc"or "asc"

The chronological order used to sort the logs.

</summary>

One of the following:

"desc"

<a href="#">Link to this property</a>

"asc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

idp\_resource\_id: optional array of string

The IdP-generated Id of the SCIM resource. Pass once for a single lookup (`?idp_resource_id=A`) or repeat the parameter (`?idp_resource_id=A&idp_resource_id=B`) to filter by multiple resources in one request.

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20idp_resource_id%20%3E%20(schema)>)

limit: optional number

The maximum number of update logs to retrieve.

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

page: optional number

Page number of results.

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum1000

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

request\_method: optional array of "DELETE"or "PATCH"or "POST"or "PUT"

The request method of the SCIM request.

</summary>

One of the following:

"DELETE"

<a href="#">Link to this property</a>

"PATCH"

<a href="#">Link to this property</a>

"POST"

<a href="#">Link to this property</a>

"PUT"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20request_method%20%3E%20(schema)>)

resource\_group\_name: optional array of string

The display name of the SCIM Group resource. Pass once for a single lookup (`?resource_group_name=A`) or repeat the parameter (`?resource_group_name=A&resource_group_name=B`) to filter by multiple group names in one request.

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20resource_group_name%20%3E%20(schema)>)

<details>

<summary>

resource\_type: optional array of "USER"or "GROUP"

The resource type of the SCIM request.

</summary>

One of the following:

"USER"

<a href="#">Link to this property</a>

"GROUP"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20resource_type%20%3E%20(schema)>)

resource\_user\_email: optional array of string

The email address of the SCIM User resource. Pass once for a single lookup (`?resource_user_email=A`) or repeat the parameter (`?resource_user_email=A&resource_user_email=B`) to filter by multiple emails in one request.

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20resource_user_email%20%3E%20(schema)>)

since: optional string

the timestamp of the earliest update log.

formatdate-time

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

<details>

<summary>

status: optional array of "FAILURE"or "SUCCESS"

The status of the SCIM request.

</summary>

One of the following:

"FAILURE"

<a href="#">Link to this property</a>

"SUCCESS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

until: optional string

the timestamp of the most-recent update log.

formatdate-time

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20until%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {cf\_resource\_id, error\_description, idp\_id, 8 more }

</summary>

cf\_resource\_id: optional string

The unique Cloudflare-generated Id of the SCIM resource.

<a href="#">Link to this property</a>

error\_description: optional string

The error message which is generated when the status of the SCIM request is ‘FAILURE’.

<a href="#">Link to this property</a>

idp\_id: optional string

The unique Id of the IdP that has SCIM enabled.

<a href="#">Link to this property</a>

idp\_resource\_id: optional string

The IdP-generated Id of the SCIM resource.

<a href="#">Link to this property</a>

logged\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

request\_body: optional string

The JSON-encoded string body of the SCIM request.

<a href="#">Link to this property</a>

request\_method: optional string

The request method of the SCIM request.

<a href="#">Link to this property</a>

resource\_group\_name: optional string

The display name of the SCIM Group resource if it exists.

<a href="#">Link to this property</a>

resource\_type: optional string

The resource type of the SCIM request.

<a href="#">Link to this property</a>

resource\_user\_email: optional string

The email address of the SCIM User resource if it exists.

formatemail

<a href="#">Link to this property</a>

status: optional string

The status of the SCIM request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Access SCIM update logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/logs/scim/updates \
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
      "cf_resource_id": "bd97ef8d-7986-43e3-9ee0-c25dda33e4b0",
      "error_description": "Invalid JSON body",
      "idp_id": "df7e2w5f-02b7-4d9d-af26-8d1988fca630",
      "idp_resource_id": "all_employees",
      "logged_at": "2014-01-01T05:20:00.12345Z",
      "request_body": "{}}",
      "request_method": "DELETE",
      "resource_group_name": "ALL_EMPLOYEES",
      "resource_type": "GROUP",
      "resource_user_email": "john.smith@example.com",
      "status": "FAILURE"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
      "cf_resource_id": "bd97ef8d-7986-43e3-9ee0-c25dda33e4b0",
      "error_description": "Invalid JSON body",
      "idp_id": "df7e2w5f-02b7-4d9d-af26-8d1988fca630",
      "idp_resource_id": "all_employees",
      "logged_at": "2014-01-01T05:20:00.12345Z",
      "request_body": "{}}",
      "request_method": "DELETE",
      "resource_group_name": "ALL_EMPLOYEES",
      "resource_type": "GROUP",
      "resource_user_email": "john.smith@example.com",
      "status": "FAILURE"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```