---
title: List tenant accounts
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Tenants](https://developers.cloudflare.com/api/resources/tenants)

[Accounts](https://developers.cloudflare.com/api/resources/tenants/subresources/accounts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List tenant accounts

GET/tenants/{tenant\_id}/accounts

List of accounts for the Tenant.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

tenant\_id: string

[Link to this property](#)%20tenants.accounts%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tenant_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20tenants.accounts%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20tenants.accounts%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

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

[Link to this property](#)%20tenants.accounts%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20tenants.accounts%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List tenant accounts

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID/accounts \
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
  "success": true
}
```