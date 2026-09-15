---
title: Account
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Account

##### [Show DNS Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/methods/get)

GET/accounts/{account\_id}/dns\_settings

##### [Update DNS Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/methods/edit)

PATCH/accounts/{account\_id}/dns\_settings

##### ModelsExpand Collapse

<details>

<summary>

AccountGetResponse object {zone\_defaults, enforce\_dns\_only }

</summary>

<details>

<summary>

zone\_defaults: object {flatten\_all\_cnames, foundation\_dns, internal\_dns, 6 more }

</summary>

flatten\_all\_cnames: boolean

Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattened.

<a href="#">Link to this property</a>

Deprecatedfoundation\_dns: boolean

foundation\_dns is deprecated. Use nameservers.type: cloudflare.advanced to turn on Advanced Nameservers and cloudflare.standard to turn it off. This field will be removed in a future API version.

Deprecated. Use nameservers.type to configure Advanced Nameservers.

<a href="#">Link to this property</a>

<details>

<summary>

internal\_dns: object {reference\_zone\_id }

Settings for this internal zone.

</summary>

reference\_zone\_id: optional string

The ID of the zone to fallback to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

multi\_provider: boolean

Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect NS records at the zone apex during outbound zone transfers.

<a href="#">Link to this property</a>

<details>

<summary>

nameservers: object {type }

Settings determining the nameservers through which the zone should be available.

</summary>

<details>

<summary>

type: "cloudflare.standard"or "cloudflare.advanced"or "cloudflare.standard.random"or 2 more

Nameserver type

</summary>

One of the following:

"cloudflare.standard"

<a href="#">Link to this property</a>

"cloudflare.advanced"

<a href="#">Link to this property</a>

"cloudflare.standard.random"

<a href="#">Link to this property</a>

"custom.account"

<a href="#">Link to this property</a>

"custom.tenant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ns\_ttl: number

The time to live (TTL) of the zone’s nameserver (NS) records.

maximum86400

minimum30

<a href="#">Link to this property</a>

secondary\_overrides: boolean

Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.

<a href="#">Link to this property</a>

<details>

<summary>

soa: object {expire, min\_ttl, mname, 4 more }

Components of the zone’s SOA record.

</summary>

expire: optional number

Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.

maximum2419200

minimum86400

<a href="#">Link to this property</a>

min\_ttl: optional number

The time to live (TTL) for negative caching of records within the zone.

maximum86400

minimum60

<a href="#">Link to this property</a>

mname: optional string

The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.

<a href="#">Link to this property</a>

refresh: optional number

Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.

maximum86400

minimum600

<a href="#">Link to this property</a>

retry: optional number

Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.

maximum86400

minimum600

<a href="#">Link to this property</a>

rname: optional string

The email address of the zone administrator, with the first label representing the local part of the email address.

<a href="#">Link to this property</a>

ttl: optional number

The time to live (TTL) of the SOA record itself.

maximum86400

minimum300

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zone\_mode: "standard"or "cdn\_only"or "dns\_only"

Whether the zone mode is a regular or CDN/DNS only zone.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"cdn\_only"

<a href="#">Link to this property</a>

"dns\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enforce\_dns\_only: optional boolean

When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record’s individual proxy setting. Note that this account-level override does not modify the records themselves; it only affects how they are served at the edge. See more on <a href="https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only">Enforce DNS-only</a>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account%20%3E%20(model)%20account_get_response%20%3E%20(schema)>)

<details>

<summary>

AccountEditResponse object {zone\_defaults, enforce\_dns\_only }

</summary>

<details>

<summary>

zone\_defaults: object {flatten\_all\_cnames, foundation\_dns, internal\_dns, 6 more }

</summary>

flatten\_all\_cnames: boolean

Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattened.

<a href="#">Link to this property</a>

Deprecatedfoundation\_dns: boolean

foundation\_dns is deprecated. Use nameservers.type: cloudflare.advanced to turn on Advanced Nameservers and cloudflare.standard to turn it off. This field will be removed in a future API version.

Deprecated. Use nameservers.type to configure Advanced Nameservers.

<a href="#">Link to this property</a>

<details>

<summary>

internal\_dns: object {reference\_zone\_id }

Settings for this internal zone.

</summary>

reference\_zone\_id: optional string

The ID of the zone to fallback to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

multi\_provider: boolean

Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect NS records at the zone apex during outbound zone transfers.

<a href="#">Link to this property</a>

<details>

<summary>

nameservers: object {type }

Settings determining the nameservers through which the zone should be available.

</summary>

<details>

<summary>

type: "cloudflare.standard"or "cloudflare.advanced"or "cloudflare.standard.random"or 2 more

Nameserver type

</summary>

One of the following:

"cloudflare.standard"

<a href="#">Link to this property</a>

"cloudflare.advanced"

<a href="#">Link to this property</a>

"cloudflare.standard.random"

<a href="#">Link to this property</a>

"custom.account"

<a href="#">Link to this property</a>

"custom.tenant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ns\_ttl: number

The time to live (TTL) of the zone’s nameserver (NS) records.

maximum86400

minimum30

<a href="#">Link to this property</a>

secondary\_overrides: boolean

Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.

<a href="#">Link to this property</a>

<details>

<summary>

soa: object {expire, min\_ttl, mname, 4 more }

Components of the zone’s SOA record.

</summary>

expire: optional number

Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.

maximum2419200

minimum86400

<a href="#">Link to this property</a>

min\_ttl: optional number

The time to live (TTL) for negative caching of records within the zone.

maximum86400

minimum60

<a href="#">Link to this property</a>

mname: optional string

The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.

<a href="#">Link to this property</a>

refresh: optional number

Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.

maximum86400

minimum600

<a href="#">Link to this property</a>

retry: optional number

Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.

maximum86400

minimum600

<a href="#">Link to this property</a>

rname: optional string

The email address of the zone administrator, with the first label representing the local part of the email address.

<a href="#">Link to this property</a>

ttl: optional number

The time to live (TTL) of the SOA record itself.

maximum86400

minimum300

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zone\_mode: "standard"or "cdn\_only"or "dns\_only"

Whether the zone mode is a regular or CDN/DNS only zone.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"cdn\_only"

<a href="#">Link to this property</a>

"dns\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enforce\_dns\_only: optional boolean

When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record’s individual proxy setting. Note that this account-level override does not modify the records themselves; it only affects how they are served at the edge. See more on <a href="https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only">Enforce DNS-only</a>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account%20%3E%20(model)%20account_edit_response%20%3E%20(schema)>)

#### AccountViews

##### [List Internal DNS Views](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/list)

GET/accounts/{account\_id}/dns\_settings/views

##### [DNS Internal View Details](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/get)

GET/accounts/{account\_id}/dns\_settings/views/{view\_id}

##### [Create Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/create)

POST/accounts/{account\_id}/dns\_settings/views

##### [Update Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/edit)

PATCH/accounts/{account\_id}/dns\_settings/views/{view\_id}

##### [Delete Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/delete)

DELETE/accounts/{account\_id}/dns\_settings/views/{view\_id}

##### ModelsExpand Collapse

<details>

<summary>

ViewListResponse object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_list_response%20%3E%20(schema)>)

<details>

<summary>

ViewGetResponse object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_get_response%20%3E%20(schema)>)

<details>

<summary>

ViewCreateResponse object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_create_response%20%3E%20(schema)>)

<details>

<summary>

ViewEditResponse object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_edit_response%20%3E%20(schema)>)

<details>

<summary>

ViewDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_delete_response%20%3E%20(schema)>)