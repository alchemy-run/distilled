---
title: List account shares
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Sharing](https://developers.cloudflare.com/api/resources/resource_sharing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List account shares

GET/accounts/{account\_id}/shares

Lists all account shares.

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

Direction to sort objects.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

include\_recipient\_counts: optional boolean

Include recipient counts in the response.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include_recipient_counts%20%3E%20(schema)>)

include\_resources: optional boolean

Include resources in the response.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include_resources%20%3E%20(schema)>)

<details>

<summary>

kind: optional "sent"or "received"

Filter shares by kind.

</summary>

One of the following:

"sent"

<a href="#">Link to this property</a>

"received"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20kind%20%3E%20(schema)>)

<details>

<summary>

order: optional "name"or "created"

Order shares by values in the given field.

</summary>

One of the following:

"name"

<a href="#">Link to this property</a>

"created"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number. Defaults to `1` when `per_page` is supplied without `page`. May be omitted entirely along with `per_page` to receive a non-paginated response.

minimum1

multipleOf1

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of objects to return per page. Defaults to `20` when `page` is supplied without `per_page`. May be omitted entirely along with `page` to receive a non-paginated response.

maximum100

minimum1

multipleOf1

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

resource\_types: optional array of "custom-ruleset"or "gateway-policy"or "gateway-destination-ip"or 4 more

Filter share resources by resource\_types.

</summary>

One of the following:

"custom-ruleset"

<a href="#">Link to this property</a>

"gateway-policy"

<a href="#">Link to this property</a>

"gateway-destination-ip"

<a href="#">Link to this property</a>

"gateway-block-page-settings"

<a href="#">Link to this property</a>

"gateway-extended-email-matching"

<a href="#">Link to this property</a>

"idp-federation-grant"

<a href="#">Link to this property</a>

"trust-grant"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20resource_types%20%3E%20(schema)>)

<details>

<summary>

status: optional "active"or "deleting"or "deleted"

Filter shares by status.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

tag: optional array of string

Filter shares by tag. Each value is either `key=value` (matches shares whose tags contain that key/value pair) or `key` alone (matches shares that have any value for that key). May be repeated; multiple `tag` parameters are ANDed together. Maximum 20 `tag` parameters per request.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tag%20%3E%20(schema)>)

<details>

<summary>

target\_type: optional "account"or "organization"

Filter shares by target\_type.

</summary>

One of the following:

"account"

<a href="#">Link to this property</a>

"organization"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20target_type%20%3E%20(schema)>)

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, account\_id, account\_name, 12 more }

</summary>

id: string

Share identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

account\_name: string

The display name of an account.

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the share.

<a href="#">Link to this property</a>

organization\_id: string

Organization identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "deleting"or "deleted"

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target\_type: "account"or "organization"

</summary>

One of the following:

"account"

<a href="#">Link to this property</a>

"organization"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

associated\_recipient\_count: optional number

The number of recipients in the ‘associated’ state. This field is only included when requested via the ‘include\_recipient\_counts’ parameter.

<a href="#">Link to this property</a>

associating\_recipient\_count: optional number

The number of recipients in the ‘associating’ state. This field is only included when requested via the ‘include\_recipient\_counts’ parameter.

<a href="#">Link to this property</a>

disassociated\_recipient\_count: optional number

The number of recipients in the ‘disassociated’ state. This field is only included when requested via the ‘include\_recipient\_counts’ parameter.

<a href="#">Link to this property</a>

disassociating\_recipient\_count: optional number

The number of recipients in the ‘disassociating’ state. This field is only included when requested via the ‘include\_recipient\_counts’ parameter.

<a href="#">Link to this property</a>

<details>

<summary>

kind: optional "sent"or "received"

</summary>

One of the following:

"sent"

<a href="#">Link to this property</a>

"received"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resources: optional array of object {id, created, meta, 6 more }

A list of resources that are part of the share. This field is only included when requested via the ‘include\_resources’ parameter.

</summary>

id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

meta: unknown

Resource Metadata.

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

resource\_account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "custom-ruleset"or "gateway-policy"or "gateway-destination-ip"or 4 more

Resource Type.

</summary>

One of the following:

"custom-ruleset"

<a href="#">Link to this property</a>

"gateway-policy"

<a href="#">Link to this property</a>

"gateway-destination-ip"

<a href="#">Link to this property</a>

"gateway-block-page-settings"

<a href="#">Link to this property</a>

"gateway-extended-email-matching"

<a href="#">Link to this property</a>

"idp-federation-grant"

<a href="#">Link to this property</a>

"trust-grant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "deleting"or "deleted"

Resource Status.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List account shares

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares \
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
      "account_name": "Account A",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "name": "My Shared WAF Managed Rule",
      "organization_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "status": "active",
      "target_type": "account",
      "associated_recipient_count": 10,
      "associating_recipient_count": 1,
      "disassociated_recipient_count": 0,
      "disassociating_recipient_count": 0,
      "kind": "sent",
      "resources": [
        {
          "id": "023e105f4ecef8ad9ca31a8372d0c353",
          "created": "2023-09-21T18:56:32.624632Z",
          "meta": {},
          "modified": "2023-09-21T18:56:32.624632Z",
          "resource_account_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_type": "custom-ruleset",
          "resource_version": 0,
          "status": "active"
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
      "account_name": "Account A",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "name": "My Shared WAF Managed Rule",
      "organization_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "status": "active",
      "target_type": "account",
      "associated_recipient_count": 10,
      "associating_recipient_count": 1,
      "disassociated_recipient_count": 0,
      "disassociating_recipient_count": 0,
      "kind": "sent",
      "resources": [
        {
          "id": "023e105f4ecef8ad9ca31a8372d0c353",
          "created": "2023-09-21T18:56:32.624632Z",
          "meta": {},
          "modified": "2023-09-21T18:56:32.624632Z",
          "resource_account_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_type": "custom-ruleset",
          "resource_version": 0,
          "status": "active"
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