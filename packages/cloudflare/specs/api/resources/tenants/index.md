---
title: Tenants
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tenants

##### [Get tenant](https://developers.cloudflare.com/api/resources/tenants/methods/get)

GET/tenants/{tenant\_id}

##### ModelsExpand Collapse

<details>

<summary>

Tenant object {cdate, edate, tenant\_contacts, 9 more }

</summary>

cdate: string

formatdate-time

<a href="#">Link to this property</a>

edate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

tenant\_contacts: object {email, website }

</summary>

email: optional string

<a href="#">Link to this property</a>

website: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tenant\_labels: array of string

<a href="#">Link to this property</a>

<details>

<summary>

tenant\_metadata: object {dns }

</summary>

<details>

<summary>

dns: optional object {ns\_pool }

</summary>

<details>

<summary>

ns\_pool: object {primary, secondary }

</summary>

primary: optional string

<a href="#">Link to this property</a>

secondary: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tenant\_name: string

<a href="#">Link to this property</a>

tenant\_network: unknown

<a href="#">Link to this property</a>

tenant\_status: string

<a href="#">Link to this property</a>

tenant\_tag: string

<a href="#">Link to this property</a>

tenant\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

tenant\_units: array of object {unit\_memberships, unit\_metadata, unit\_name, 2 more }

</summary>

unit\_memberships: array of unknown

<a href="#">Link to this property</a>

unit\_metadata: unknown

<a href="#">Link to this property</a>

unit\_name: string

<a href="#">Link to this property</a>

unit\_status: string

<a href="#">Link to this property</a>

unit\_tag: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20tenants%20%3E%20(model)%20tenant%20%3E%20(schema)>)

#### TenantsAccount Types

##### [Get tenant account types](https://developers.cloudflare.com/api/resources/tenants/subresources/account_types/methods/list)

GET/tenants/{tenant\_id}/account\_types

##### ModelsExpand Collapse

AccountTypeListResponse = string

[Link to this property](#)%20tenants.account_types%20%3E%20(model)%20account_type_list_response%20%3E%20(schema)>)

#### TenantsAccounts

##### [List tenant accounts](https://developers.cloudflare.com/api/resources/tenants/subresources/accounts/methods/list)

GET/tenants/{tenant\_id}/accounts

##### ModelsExpand Collapse

<details>

<summary>

TenantAccount object {id, created\_on, name, 3 more }

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

[Link to this property](#)%20tenants.accounts%20%3E%20(model)%20tenant_account%20%3E%20(schema)>)

#### TenantsEntitlements

##### [List tenant entitlements](https://developers.cloudflare.com/api/resources/tenants/subresources/entitlements/methods/get)

GET/tenants/{tenant\_id}/entitlements

##### ModelsExpand Collapse

<details>

<summary>

TenantEntitlements object {allow\_add\_subdomain, allow\_auto\_accept\_invites, cname\_setup\_allowed, 3 more }

</summary>

<details>

<summary>

allow\_add\_subdomain: object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

allow\_auto\_accept\_invites: object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cname\_setup\_allowed: object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

custom\_entitlements: array of object {allocation, feature }

</summary>

<details>

<summary>

allocation: object {type, value } or object {type, value } or object {type, value }

</summary>

One of the following:

<details>

<summary>

OrganizationsAPIMaxCountAllocation object {type, value }

</summary>

type: "max\_count"

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OrganizationsAPIBoolAllocation object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OrganizationsAPINullAllocation object {type, value }

</summary>

type: ""

<a href="#">Link to this property</a>

value: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

feature: object {key }

</summary>

key: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mhs\_certificate\_count: object {type, value }

</summary>

type: "max\_count"

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

partial\_setup\_allowed: object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20tenants.entitlements%20%3E%20(model)%20tenant_entitlements%20%3E%20(schema)>)

#### TenantsMemberships

##### [List tenant memberships](https://developers.cloudflare.com/api/resources/tenants/subresources/memberships/methods/list)

GET/tenants/{tenant\_id}/memberships

##### ModelsExpand Collapse

<details>

<summary>

TenantMembership object {user\_email, user\_name, user\_tag }

</summary>

user\_email: string

<a href="#">Link to this property</a>

user\_name: string

<a href="#">Link to this property</a>

user\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20tenants.memberships%20%3E%20(model)%20tenant_membership%20%3E%20(schema)>)