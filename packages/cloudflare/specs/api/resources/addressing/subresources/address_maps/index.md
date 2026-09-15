---
title: Address Maps
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Address Maps

##### [List Address Maps](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/methods/list)

GET/accounts/{account\_id}/addressing/address\_maps

##### [Address Map Details](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/methods/get)

GET/accounts/{account\_id}/addressing/address\_maps/{address\_map\_id}

##### [Create Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/methods/create)

POST/accounts/{account\_id}/addressing/address\_maps

##### [Update Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/methods/edit)

PATCH/accounts/{account\_id}/addressing/address\_maps/{address\_map\_id}

##### [Delete Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/methods/delete)

DELETE/accounts/{account\_id}/addressing/address\_maps/{address\_map\_id}

##### ModelsExpand Collapse

<details>

<summary>

AddressMap object {id, can\_delete, can\_modify\_ips, 5 more }

</summary>

id: optional string

Identifier of an Address Map.

maxLength32

<a href="#">Link to this property</a>

can\_delete: optional boolean

If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

<a href="#">Link to this property</a>

can\_modify\_ips: optional boolean

If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

default\_sni: optional string

If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

<a href="#">Link to this property</a>

description: optional string

An optional description field which may be used to describe the types of IPs or zones on the map.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the Address Map is enabled or not. Cloudflare’s DNS will not respond with IP addresses on an Address Map until the map is enabled.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps%20%3E%20(model)%20address_map%20%3E%20(schema)>)

<details>

<summary>

Kind = "zone"or "account"

The type of the membership.

</summary>

One of the following:

"zone"

<a href="#">Link to this property</a>

"account"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps%20%3E%20(model)%20kind%20%3E%20(schema)>)

<details>

<summary>

AddressMapGetResponse object {id, can\_delete, can\_modify\_ips, 7 more }

</summary>

id: optional string

Identifier of an Address Map.

maxLength32

<a href="#">Link to this property</a>

can\_delete: optional boolean

If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

<a href="#">Link to this property</a>

can\_modify\_ips: optional boolean

If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

default\_sni: optional string

If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

<a href="#">Link to this property</a>

description: optional string

An optional description field which may be used to describe the types of IPs or zones on the map.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the Address Map is enabled or not. Cloudflare’s DNS will not respond with IP addresses on an Address Map until the map is enabled.

<a href="#">Link to this property</a>

ips: optional <a href="https://developers.cloudflare.com/api/resources/ips#(resource)%20ips%20%3E%20(model)%20ips%20%3E%20(schema)">IPs</a> { created\_at, ip }

The set of IPs on the Address Map.

<a href="#">Link to this property</a>

<details>

<summary>

memberships: optional array of object {can\_delete, created\_at, identifier, kind }

Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.

</summary>

can\_delete: optional boolean

Controls whether the membership can be deleted via the API or not.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

identifier: optional string

The identifier for the membership (eg. a zone or account tag).

maxLength32

<a href="#">Link to this property</a>

kind: optional <a href="https://developers.cloudflare.com/api/resources/addressing#(resource)%20addressing.address_maps%20%3E%20(model)%20kind%20%3E%20(schema)">Kind</a>

The type of the membership.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps%20%3E%20(model)%20address_map_get_response%20%3E%20(schema)>)

<details>

<summary>

AddressMapCreateResponse object {id, can\_delete, can\_modify\_ips, 7 more }

</summary>

id: optional string

Identifier of an Address Map.

maxLength32

<a href="#">Link to this property</a>

can\_delete: optional boolean

If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

<a href="#">Link to this property</a>

can\_modify\_ips: optional boolean

If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

default\_sni: optional string

If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

<a href="#">Link to this property</a>

description: optional string

An optional description field which may be used to describe the types of IPs or zones on the map.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the Address Map is enabled or not. Cloudflare’s DNS will not respond with IP addresses on an Address Map until the map is enabled.

<a href="#">Link to this property</a>

ips: optional <a href="https://developers.cloudflare.com/api/resources/ips#(resource)%20ips%20%3E%20(model)%20ips%20%3E%20(schema)">IPs</a> { created\_at, ip }

The set of IPs on the Address Map.

<a href="#">Link to this property</a>

<details>

<summary>

memberships: optional array of object {can\_delete, created\_at, identifier, kind }

Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.

</summary>

can\_delete: optional boolean

Controls whether the membership can be deleted via the API or not.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

identifier: optional string

The identifier for the membership (eg. a zone or account tag).

maxLength32

<a href="#">Link to this property</a>

kind: optional <a href="https://developers.cloudflare.com/api/resources/addressing#(resource)%20addressing.address_maps%20%3E%20(model)%20kind%20%3E%20(schema)">Kind</a>

The type of the membership.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps%20%3E%20(model)%20address_map_create_response%20%3E%20(schema)>)

<details>

<summary>

AddressMapDeleteResponse object {errors, messages, success, result\_info }

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

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps%20%3E%20(model)%20address_map_delete_response%20%3E%20(schema)>)

#### Address MapsAccounts

#### Address MapsIPs

##### [Add an IP to an Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/subresources/ips/methods/update)

PUT/accounts/{account\_id}/addressing/address\_maps/{address\_map\_id}/ips/{ip\_address}

##### [Remove an IP from an Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/subresources/ips/methods/delete)

DELETE/accounts/{account\_id}/addressing/address\_maps/{address\_map\_id}/ips/{ip\_address}

##### ModelsExpand Collapse

<details>

<summary>

IPUpdateResponse object {errors, messages, success, result\_info }

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

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps.ips%20%3E%20(model)%20ip_update_response%20%3E%20(schema)>)

<details>

<summary>

IPDeleteResponse object {errors, messages, success, result\_info }

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

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps.ips%20%3E%20(model)%20ip_delete_response%20%3E%20(schema)>)

#### Address MapsZones

##### [Add a zone membership to an Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/subresources/zones/methods/update)

PUT/accounts/{account\_id}/addressing/address\_maps/{address\_map\_id}/zones/{zone\_id}

##### [Remove a zone membership from an Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps/subresources/zones/methods/delete)

DELETE/accounts/{account\_id}/addressing/address\_maps/{address\_map\_id}/zones/{zone\_id}

##### ModelsExpand Collapse

<details>

<summary>

ZoneUpdateResponse object {errors, messages, success, result\_info }

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

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps.zones%20%3E%20(model)%20zone_update_response%20%3E%20(schema)>)

<details>

<summary>

ZoneDeleteResponse object {errors, messages, success, result\_info }

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

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps.zones%20%3E%20(model)%20zone_delete_response%20%3E%20(schema)>)