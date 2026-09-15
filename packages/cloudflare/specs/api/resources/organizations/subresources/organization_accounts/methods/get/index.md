---
title: Get organization accounts
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Organizations](https://developers.cloudflare.com/api/resources/organizations)

[Organization Accounts](https://developers.cloudflare.com/api/resources/organizations/subresources/organization_accounts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get organization accounts

GET/organizations/{organization\_id}/accounts

Retrieve a list of accounts that belong to a specific organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

organization\_id: string

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20organization_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

account\_pubname: optional object {contains, endsWith, startsWith }

</summary>

contains: optional string

(case-insensitive) Filter the list of accounts to where the account\_pubname contains a particular string.

<a href="#">Link to this property</a>

endsWith: optional string

(case-insensitive) Filter the list of accounts to where the account\_pubname ends with a particular string.

<a href="#">Link to this property</a>

startsWith: optional string

(case-insensitive) Filter the list of accounts to where the account\_pubname starts with a particular string.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_pubname%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Sort direction for the order\_by field. Valid values: <code>asc</code>, <code>desc</code>. Defaults to <code>asc</code> when order\_by is specified.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

include\_tags: optional boolean

Include Account tags from the resource tag mirror. Omit this parameter to preserve the existing Account response shape.

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20include_tags%20%3E%20(schema)>)

include\_total: optional boolean

Whether to calculate and return the exact result\_info.total\_size for cursor pagination. Defaults to true. When false, total\_size is omitted. page\_size and include\_total may change between pages; next\_page\_token remains the authoritative continuation signal. Legacy page/per\_page requests always calculate total\_count.

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20include_total%20%3E%20(schema)>)

<details>

<summary>

name: optional object {contains, endsWith, startsWith }

</summary>

contains: optional string

(case-insensitive) Filter the list of accounts to where the name contains a particular string.

<a href="#">Link to this property</a>

endsWith: optional string

(case-insensitive) Filter the list of accounts to where the name ends with a particular string.

<a href="#">Link to this property</a>

startsWith: optional string

(case-insensitive) Filter the list of accounts to where the name starts with a particular string.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

order\_by: optional "account\_name"

Field to order results by. Currently supported values: `account_name`. When not specified, results are ordered by internal account ID.

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

page\_size: optional number

The amount of items to return. Defaults to 10.

maximum1000

minimum0

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20page_size%20%3E%20(schema)>)

page\_token: optional string

An opaque token returned from the last list response that when provided will retrieve the next page.

Parameters used to filter the retrieved list must remain in subsequent requests with a page token.

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20page_token%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/tenants#(resource)%20tenants.accounts%20%3E%20(model)%20tenant_account%20%3E%20(schema)">TenantAccount</a> { id, created\_on, name, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {abuse\_contact\_email, access\_approval\_expiry, api\_access\_enabled, 3 more }

</summary>

abuse\_contact\_email: string

<a href="#">Link to this property</a>

access\_approval\_expiry: string

formatdate-time

<a href="#">Link to this property</a>

api\_access\_enabled: boolean

<a href="#">Link to this property</a>

Deprecateddefault\_nameservers: string

Use <a href="https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings">DNS Settings</a> instead. Deprecated.

<a href="#">Link to this property</a>

enforce\_twofactor: boolean

<a href="#">Link to this property</a>

Deprecateduse\_account\_custom\_ns\_by\_default: boolean

Use <a href="https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings">DNS Settings</a> instead. Deprecated.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "standard"or "enterprise"

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"enterprise"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional map\[string]

Account tags, present only when <code>include_tags=true</code> is requested.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {next\_page\_token, total\_size }

</summary>

next\_page\_token: optional string

Use this opaque token in the next request to retrieve the next page.

Parameters used to filter the retrieved list must remain in subsequent requests with a page token.

<a href="#">Link to this property</a>

total\_size: optional number

Counts the total amount of items in a list with the applied filters. The API omits next\_page\_token to indicate no more items in a particular list.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: true

[Link to this property](#)%20organizations.organization_accounts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get organization accounts

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/accounts \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [],
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
      "id": "id",
      "created_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "settings": {
        "abuse_contact_email": "abuse_contact_email",
        "access_approval_expiry": "2019-12-27T18:11:19.117Z",
        "api_access_enabled": true,
        "default_nameservers": "default_nameservers",
        "enforce_twofactor": true,
        "use_account_custom_ns_by_default": true
      },
      "type": "standard",
      "tags": {
        "foo": "string"
      }
    }
  ],
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
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
      "id": "id",
      "created_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "settings": {
        "abuse_contact_email": "abuse_contact_email",
        "access_approval_expiry": "2019-12-27T18:11:19.117Z",
        "api_access_enabled": true,
        "default_nameservers": "default_nameservers",
        "enforce_twofactor": true,
        "use_account_custom_ns_by_default": true
      },
      "type": "standard",
      "tags": {
        "foo": "string"
      }
    }
  ],
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
  "success": true
}
```