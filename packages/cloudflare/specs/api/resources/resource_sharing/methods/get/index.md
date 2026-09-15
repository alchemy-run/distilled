---
title: Get account share by ID
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Sharing](https://developers.cloudflare.com/api/resources/resource_sharing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get account share by ID

GET/accounts/{account\_id}/shares/{share\_id}

Fetches share by ID.

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

share\_id: string

Share identifier tag.

maxLength32

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20share_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

include\_recipient\_counts: optional boolean

Include recipient counts in the response.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20include_recipient_counts%20%3E%20(schema)>)

include\_resources: optional boolean

Include resources in the response.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20include_resources%20%3E%20(schema)>)

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, account\_id, account\_name, 12 more }

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get account share by ID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID \
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
  "result": {
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
  "result": {
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
}
```