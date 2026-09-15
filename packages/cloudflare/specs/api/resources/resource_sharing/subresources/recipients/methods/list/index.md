---
title: List share recipients by share ID
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Sharing](https://developers.cloudflare.com/api/resources/resource_sharing)

[Recipients](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/recipients)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List share recipients by share ID

GET/accounts/{account\_id}/shares/{share\_id}/recipients

List share recipients by share ID. Returns **all** recipients regardless of their `association_status` (associating, associated, disassociating, disassociated). Callers that want only “active” recipients must filter client-side on the `association_status` field.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier.

maxLength32

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

share\_id: string

Share identifier tag.

maxLength32

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20share_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

include\_resources: optional boolean

Include resources in the response.

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include_resources%20%3E%20(schema)>)

page: optional number

Page number. Defaults to `1` when `per_page` is supplied without `page`. May be omitted entirely along with `per_page` to receive a non-paginated response.

minimum1

multipleOf1

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of objects to return per page. Defaults to `20` when `page` is supplied without `per_page`. May be omitted entirely along with `page` to receive a non-paginated response.

maximum100

minimum1

multipleOf1

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, account\_id, association\_status, 3 more }

</summary>

id: string

Share Recipient identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

association\_status: "associating"or "associated"or "disassociating"or "disassociated"

The current state of the recipient relative to the share. The <code>desired_association_status</code> (not exposed in the response) tracks the target state set by the API; the background reconciliation workflow drives <code>current_association_status</code> toward it.

- <code>associating</code> — The recipient was recently added; the workflow is pushing shared resources into the recipient account.
- <code>associated</code> — Shared resources have been successfully applied to the recipient account.
- <code>disassociating</code> — The recipient was removed (via DELETE or PUT replacement); the workflow is removing shared resources from the recipient account.
- <code>disassociated</code> — Shared resources have been removed from the recipient account. The recipient record remains in the database.

</summary>

One of the following:

"associating"

<a href="#">Link to this property</a>

"associated"

<a href="#">Link to this property</a>

"disassociating"

<a href="#">Link to this property</a>

"disassociated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

resources: optional array of object {error, resource\_id, resource\_version, terminal }

</summary>

error: string

Share Recipient error message.

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

terminal: boolean

Whether the error is terminal or will be continually retried.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

Total number of pages using the given per page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List share recipients by share ID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/recipients \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true,
  "result": [
    {
      "id": "3fd85f74b32742f1bff64a85009dda07",
      "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "association_status": "associating",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "resources": [
        {
          "error": "Recipient is missing necessary entitlement",
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_version": 0,
          "terminal": true
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 50
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
  "success": true,
  "result": [
    {
      "id": "3fd85f74b32742f1bff64a85009dda07",
      "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "association_status": "associating",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "resources": [
        {
          "error": "Recipient is missing necessary entitlement",
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_version": 0,
          "terminal": true
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 50
  }
}
```