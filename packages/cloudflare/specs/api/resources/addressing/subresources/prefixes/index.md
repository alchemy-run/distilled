---
title: Prefixes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Prefixes

##### [List Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/list)

GET/accounts/{account\_id}/addressing/prefixes

##### [Prefix Details](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/get)

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}

##### [Add Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/create)

POST/accounts/{account\_id}/addressing/prefixes

##### [Update Prefix Description](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/edit)

PATCH/accounts/{account\_id}/addressing/prefixes/{prefix\_id}

##### [Delete Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/delete)

DELETE/accounts/{account\_id}/addressing/prefixes/{prefix\_id}

##### [Validate Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/validate)

POST/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/validate

##### ModelsExpand Collapse

<details>

<summary>

Prefix object {id, account\_id, advertised, 15 more }

</summary>

id: optional string

Identifier of an IP Prefix.

maxLength32

<a href="#">Link to this property</a>

account\_id: optional string

Identifier of a Cloudflare account.

maxLength32

<a href="#">Link to this property</a>

Deprecatedadvertised: optional boolean

Prefer the <a href="https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/">BGP Prefixes API</a> instead, which allows for advertising multiple BGP routes within a single IP Prefix.

Prefix advertisement status to the Internet. This field is only not ‘null’ if on demand is enabled.

<a href="#">Link to this property</a>

Deprecatedadvertised\_modified\_at: optional string

Prefer the <a href="https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/">BGP Prefixes API</a> instead, which allows for advertising multiple BGP routes within a single IP Prefix.

Last time the advertisement status was changed. This field is only not ‘null’ if on demand is enabled.

formatdate-time

<a href="#">Link to this property</a>

approved: optional string

Approval state of the prefix (P = pending, V = active).

<a href="#">Link to this property</a>

asn: optional number

Autonomous System Number (ASN) the prefix will be advertised under.

<a href="#">Link to this property</a>

cidr: optional string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

delegate\_loa\_creation: optional boolean

Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

<a href="#">Link to this property</a>

description: optional string

Description of the prefix.

maxLength1000

<a href="#">Link to this property</a>

irr\_validation\_state: optional string

State of one kind of validation for an IP prefix.

<a href="#">Link to this property</a>

loa\_document\_id: optional string

Identifier for the uploaded LOA document.

maxLength32

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedon\_demand\_enabled: optional boolean

Prefer the <a href="https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/">BGP Prefixes API</a> instead, which allows for advertising multiple BGP routes within a single IP Prefix.

Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

<a href="#">Link to this property</a>

Deprecatedon\_demand\_locked: optional boolean

Prefer the <a href="https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/">BGP Prefixes API</a> instead, which allows for advertising multiple BGP routes within a single IP Prefix.

Whether advertisement status of the prefix is locked, meaning it cannot be changed.

<a href="#">Link to this property</a>

ownership\_validation\_state: optional string

State of one kind of validation for an IP prefix.

<a href="#">Link to this property</a>

ownership\_validation\_token: optional string

Token provided to demonstrate ownership of the prefix.

<a href="#">Link to this property</a>

rpki\_validation\_state: optional string

State of one kind of validation for an IP prefix.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes%20%3E%20(model)%20prefix%20%3E%20(schema)>)

<details>

<summary>

PrefixDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes%20%3E%20(model)%20prefix_delete_response%20%3E%20(schema)>)

#### PrefixesService Bindings

##### [List Service Bindings](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service_bindings/methods/list)

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bindings

##### [Get Service Binding](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service_bindings/methods/get)

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bindings/{binding\_id}

##### [Create Service Binding](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service_bindings/methods/create)

POST/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bindings

##### [Delete Service Binding](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service_bindings/methods/delete)

DELETE/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bindings/{binding\_id}

##### ModelsExpand Collapse

<details>

<summary>

ServiceBinding object {id, cidr, provisioning, 2 more }

</summary>

id: optional string

Identifier of a Service Binding.

maxLength32

<a href="#">Link to this property</a>

cidr: optional string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

<details>

<summary>

provisioning: optional object {state }

Status of a Service Binding’s deployment to the Cloudflare network

</summary>

<details>

<summary>

state: optional "provisioning"or "active"or "magic\_transit\_route\_missing"

When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

</summary>

One of the following:

"provisioning"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"magic\_transit\_route\_missing"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

service\_id: optional string

Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the **List Services** endpoint.

maxLength32

<a href="#">Link to this property</a>

service\_name: optional string

Name of a service running on the Cloudflare network

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(model)%20service_binding%20%3E%20(schema)>)

<details>

<summary>

ServiceBindingDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(model)%20service_binding_delete_response%20%3E%20(schema)>)

#### PrefixesBGP Prefixes

##### [List BGP Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/list)

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes

##### [Fetch BGP Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/get)

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes/{bgp\_prefix\_id}

##### [Create BGP Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/create)

POST/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes

##### [Update BGP Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/edit)

PATCH/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes/{bgp\_prefix\_id}

##### [Delete BGP Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/delete)

DELETE/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes/{bgp\_prefix\_id}

##### ModelsExpand Collapse

<details>

<summary>

BGPPrefix object {id, asn, asn\_prepend\_count, 6 more }

</summary>

id: optional string

Identifier of BGP Prefix.

maxLength32

<a href="#">Link to this property</a>

asn: optional number

Autonomous System Number (ASN) the prefix will be advertised under.

<a href="#">Link to this property</a>

asn\_prepend\_count: optional number

Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

maximum3

minimum0

<a href="#">Link to this property</a>

auto\_advertise\_withdraw: optional boolean

Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_signal\_opts: optional object {enabled, modified\_at }

</summary>

enabled: optional boolean

Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

<a href="#">Link to this property</a>

modified\_at: optional string

Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cidr: optional string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

on\_demand: optional object {advertised, advertised\_modified\_at, on\_demand\_enabled, on\_demand\_locked }

</summary>

advertised: optional boolean

Prefix advertisement status to the Internet. This field is only not ‘null’ if on demand is enabled.

<a href="#">Link to this property</a>

advertised\_modified\_at: optional string

Last time the advertisement status was changed. This field is only not ‘null’ if on demand is enabled.

formatdate-time

<a href="#">Link to this property</a>

on\_demand\_enabled: optional boolean

Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

<a href="#">Link to this property</a>

on\_demand\_locked: optional boolean

Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(model)%20bgp_prefix%20%3E%20(schema)>)

<details>

<summary>

BGPPrefixDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(model)%20bgp_prefix_delete_response%20%3E%20(schema)>)

#### PrefixesAdvertisement Status

##### [Get Advertisement Status](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement_status/methods/get)

Deprecated

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/status

##### [Update Prefix Dynamic Advertisement Status](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement_status/methods/edit)

Deprecated

PATCH/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/status

##### ModelsExpand Collapse

<details>

<summary>

AdvertisementStatusGetResponse object {advertised, advertised\_modified\_at }

</summary>

advertised: optional boolean

Advertisement status of the prefix. If <code>true</code>, the BGP route for the prefix is advertised to the Internet. If <code>false</code>, the BGP route is withdrawn.

<a href="#">Link to this property</a>

advertised\_modified\_at: optional string

Last time the advertisement status was changed. This field is only not ‘null’ if on demand is enabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.advertisement_status%20%3E%20(model)%20advertisement_status_get_response%20%3E%20(schema)>)

<details>

<summary>

AdvertisementStatusEditResponse object {advertised, advertised\_modified\_at }

</summary>

advertised: optional boolean

Advertisement status of the prefix. If <code>true</code>, the BGP route for the prefix is advertised to the Internet. If <code>false</code>, the BGP route is withdrawn.

<a href="#">Link to this property</a>

advertised\_modified\_at: optional string

Last time the advertisement status was changed. This field is only not ‘null’ if on demand is enabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.advertisement_status%20%3E%20(model)%20advertisement_status_edit_response%20%3E%20(schema)>)

#### PrefixesDelegations

##### [List Prefix Delegations](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/delegations/methods/list)

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/delegations

##### [Create Prefix Delegation](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/delegations/methods/create)

POST/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/delegations

##### [Delete Prefix Delegation](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/delegations/methods/delete)

DELETE/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/delegations/{delegation\_id}

##### ModelsExpand Collapse

<details>

<summary>

Delegations object {id, cidr, created\_at, 3 more }

</summary>

id: optional string

Identifier of a Delegation.

maxLength32

<a href="#">Link to this property</a>

cidr: optional string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

delegated\_account\_id: optional string

Account identifier for the account to which prefix is being delegated.

maxLength32

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

parent\_prefix\_id: optional string

Identifier of an IP Prefix.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(model)%20delegations%20%3E%20(schema)>)

<details>

<summary>

DelegationDeleteResponse object {id }

</summary>

id: optional string

Identifier of a Delegation.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(model)%20delegation_delete_response%20%3E%20(schema)>)