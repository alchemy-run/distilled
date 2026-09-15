---
title: Create a new share
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Sharing](https://developers.cloudflare.com/api/resources/resource_sharing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a new share

POST/accounts/{account\_id}/shares

Creates a new resource share for sharing Cloudflare resources with other accounts or organizations.

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

The name of the share.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

recipients: array of object {account\_id, organization\_id, recipient\_account\_id }

</summary>

Deprecatedaccount\_id: optional string

This field has been renamed to <code>recipient_account_id</code>. Both names are accepted during the deprecation period.

Deprecated alias for <code>recipient_account_id</code>. Use <code>recipient_account_id</code> instead. The body field collided with the URL path parameter of the same name, which prevented SDK generators from distinguishing the source account (in the URL) from the recipient account (in the body). Both names will continue to be accepted until 2027-05-26 (see <code>x-sunset</code>).

maxLength32

<a href="#">Link to this property</a>

organization\_id: optional string

Organization identifier.

maxLength32

<a href="#">Link to this property</a>

recipient\_account\_id: optional string

The account that will receive the share.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20recipients%20%3E%20(schema)>)

<details>

<summary>

resources: array of object {meta, resource\_account\_id, resource\_id, resource\_type }

</summary>

meta: unknown

Resource Metadata.

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

</details>

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20resources%20%3E%20(schema)>)

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20resource_sharing%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a new share

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "My Shared WAF Managed Rule",
          "recipients": [
            {}
          ],
          "resources": [
            {
              "meta": {},
              "resource_account_id": "023e105f4ecef8ad9ca31a8372d0c353",
              "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
              "resource_type": "custom-ruleset"
            }
          ]
        }'
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