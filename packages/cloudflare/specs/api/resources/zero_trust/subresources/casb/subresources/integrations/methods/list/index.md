---
title: List integrations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Integrations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/integrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List integrations

GET/accounts/{account\_id}/one/integrations

Returns a paginated list of integrations for the account.

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

account\_id: string

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

application: optional string

Filter by application/vendor (e.g., GOOGLE\_WORKSPACE, MICROSOFT\_INTERNAL).

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20application%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order results.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

dlp\_enabled: optional boolean

Filter by DLP enabled status (true/false).

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dlp_enabled%20%3E%20(schema)>)

<details>

<summary>

order: optional "application"or "created"or "name"or "status"

Field to order results by.

</summary>

One of the following:

"application"

<a href="#">Link to this property</a>

"created"

<a href="#">Link to this property</a>

"name"

<a href="#">Link to this property</a>

"status"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number within the paginated result set.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

page\_size: optional number

Number of results per page.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_size%20%3E%20(schema)>)

search: optional string

Search integrations by name or application.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

status: optional "Healthy"or "Initializing"or "Offline"or "Unhealthy"

Filter by integration status.

</summary>

One of the following:

"Healthy"

<a href="#">Link to this property</a>

"Initializing"

<a href="#">Link to this property</a>

"Offline"

<a href="#">Link to this property</a>

"Unhealthy"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

use\_cases: optional string

Filter by enabled use cases (e.g., casb, ces). Matches integrations enrolled in any of the specified values. Can be specified multiple times.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20use_cases%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

List of errors.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

List of messages.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, application, created, 4 more }

List of items.

</summary>

id: string

Integration ID.

formatuuid

<a href="#">Link to this property</a>

application: map\[string]

<a href="#">Link to this property</a>

created: string

When the integration was created.

formatdate-time

<a href="#">Link to this property</a>

is\_paused: boolean

Whether the user paused the integration.

<a href="#">Link to this property</a>

name: string

Name of the integration.

<a href="#">Link to this property</a>

status: string

Integration status.

<a href="#">Link to this property</a>

updated: string

When the integration was last updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, next, page, 3 more }

Pagination metadata.

</summary>

count: optional number

Number of items in current page.

<a href="#">Link to this property</a>

next: optional string

URL for next page.

formaturi

<a href="#">Link to this property</a>

page: optional number

Current page number.

<a href="#">Link to this property</a>

per\_page: optional number

Number of items per page.

<a href="#">Link to this property</a>

previous: optional string

URL for previous page.

formaturi

<a href="#">Link to this property</a>

total\_count: optional number

Total number of items.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Whether the request succeeded.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List integrations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "application": {
        "category": "Productivity",
        "display_name": "Google Workspace",
        "logo": "https://dash.cloudflare.com/v2/static/google_workspace.png"
      },
      "created": "2025-01-15T10:00:00Z",
      "id": "019d2e6a-d995-7185-afbd-4feead9e42ec",
      "is_paused": false,
      "name": "My Google Workspace",
      "status": "Healthy",
      "updated": "2025-04-10T08:30:00Z"
    }
  ],
  "result_info": {
    "count": 1,
    "next": null,
    "page": 1,
    "per_page": 10,
    "previous": null,
    "total_count": 1
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "application": {
        "category": "Productivity",
        "display_name": "Google Workspace",
        "logo": "https://dash.cloudflare.com/v2/static/google_workspace.png"
      },
      "created": "2025-01-15T10:00:00Z",
      "id": "019d2e6a-d995-7185-afbd-4feead9e42ec",
      "is_paused": false,
      "name": "My Google Workspace",
      "status": "Healthy",
      "updated": "2025-04-10T08:30:00Z"
    }
  ],
  "result_info": {
    "count": 1,
    "next": null,
    "page": 1,
    "per_page": 10,
    "previous": null,
    "total_count": 1
  },
  "success": true
}
```