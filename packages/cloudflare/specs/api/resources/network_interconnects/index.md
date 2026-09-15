---
title: Network Interconnects
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Network Interconnects

#### Network InterconnectsCNIs

##### [List existing CNI objects](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/cnis/methods/list)

GET/accounts/{account\_id}/cni/cnis

##### [Get information about a CNI object](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/cnis/methods/get)

GET/accounts/{account\_id}/cni/cnis/{cni}

##### [Create a new CNI object](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/cnis/methods/create)

POST/accounts/{account\_id}/cni/cnis

##### [Modify stored information about a CNI object](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/cnis/methods/update)

PUT/accounts/{account\_id}/cni/cnis/{cni}

##### [Delete a specified CNI object](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/cnis/methods/delete)

DELETE/accounts/{account\_id}/cni/cnis/{cni}

##### ModelsExpand Collapse

<details>

<summary>

CNIListResponse object {items, next }

</summary>

<details>

<summary>

items: array of object {id, account, cust\_ip, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

account: string

Customer account tag

<a href="#">Link to this property</a>

cust\_ip: string

Customer end of the point-to-point link

This should always be inside the same prefix as <code>p2p_ip</code>.

formatA.B.C.D/N

<a href="#">Link to this property</a>

interconnect: string

Interconnect identifier hosting this CNI

<a href="#">Link to this property</a>

<details>

<summary>

magic: object {conduit\_name, description, mtu }

</summary>

conduit\_name: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

mtu: number

formatint32

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

p2p\_ip: string

Cloudflare end of the point-to-point link

formatA.B.C.D/N

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, extra\_prefixes, md5\_key }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

extra\_prefixes: array of string

Extra set of static prefixes to advertise to the customer’s end of the session

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_mode: optional "dynamic\_route\_exchange"or "advertise\_only"

The BGP mode for a CNI.

Controls the customer-facing data path:

- <code>DynamicRouteExchange</code> — Full BGP: routes flow through to conduit via CRE / bgp-bridge / bgp-bridge-receiver.
- <code>AdvertiseOnly</code> — static advertisement via taserver, no routes exchanged with Conduit

</summary>

One of the following:

"dynamic\_route\_exchange"

<a href="#">Link to this property</a>

"advertise\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next: optional number

formatint32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_list_response%20%3E%20(schema)>)

<details>

<summary>

CNIGetResponse object {id, account, cust\_ip, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

account: string

Customer account tag

<a href="#">Link to this property</a>

cust\_ip: string

Customer end of the point-to-point link

This should always be inside the same prefix as <code>p2p_ip</code>.

formatA.B.C.D/N

<a href="#">Link to this property</a>

interconnect: string

Interconnect identifier hosting this CNI

<a href="#">Link to this property</a>

<details>

<summary>

magic: object {conduit\_name, description, mtu }

</summary>

conduit\_name: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

mtu: number

formatint32

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

p2p\_ip: string

Cloudflare end of the point-to-point link

formatA.B.C.D/N

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, extra\_prefixes, md5\_key }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

extra\_prefixes: array of string

Extra set of static prefixes to advertise to the customer’s end of the session

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_mode: optional "dynamic\_route\_exchange"or "advertise\_only"

The BGP mode for a CNI.

Controls the customer-facing data path:

- <code>DynamicRouteExchange</code> — Full BGP: routes flow through to conduit via CRE / bgp-bridge / bgp-bridge-receiver.
- <code>AdvertiseOnly</code> — static advertisement via taserver, no routes exchanged with Conduit

</summary>

One of the following:

"dynamic\_route\_exchange"

<a href="#">Link to this property</a>

"advertise\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_get_response%20%3E%20(schema)>)

<details>

<summary>

CNICreateResponse object {id, account, cust\_ip, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

account: string

Customer account tag

<a href="#">Link to this property</a>

cust\_ip: string

Customer end of the point-to-point link

This should always be inside the same prefix as <code>p2p_ip</code>.

formatA.B.C.D/N

<a href="#">Link to this property</a>

interconnect: string

Interconnect identifier hosting this CNI

<a href="#">Link to this property</a>

<details>

<summary>

magic: object {conduit\_name, description, mtu }

</summary>

conduit\_name: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

mtu: number

formatint32

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

p2p\_ip: string

Cloudflare end of the point-to-point link

formatA.B.C.D/N

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, extra\_prefixes, md5\_key }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

extra\_prefixes: array of string

Extra set of static prefixes to advertise to the customer’s end of the session

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_mode: optional "dynamic\_route\_exchange"or "advertise\_only"

The BGP mode for a CNI.

Controls the customer-facing data path:

- <code>DynamicRouteExchange</code> — Full BGP: routes flow through to conduit via CRE / bgp-bridge / bgp-bridge-receiver.
- <code>AdvertiseOnly</code> — static advertisement via taserver, no routes exchanged with Conduit

</summary>

One of the following:

"dynamic\_route\_exchange"

<a href="#">Link to this property</a>

"advertise\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_create_response%20%3E%20(schema)>)

<details>

<summary>

CNIUpdateResponse object {id, account, cust\_ip, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

account: string

Customer account tag

<a href="#">Link to this property</a>

cust\_ip: string

Customer end of the point-to-point link

This should always be inside the same prefix as <code>p2p_ip</code>.

formatA.B.C.D/N

<a href="#">Link to this property</a>

interconnect: string

Interconnect identifier hosting this CNI

<a href="#">Link to this property</a>

<details>

<summary>

magic: object {conduit\_name, description, mtu }

</summary>

conduit\_name: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

mtu: number

formatint32

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

p2p\_ip: string

Cloudflare end of the point-to-point link

formatA.B.C.D/N

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, extra\_prefixes, md5\_key }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

extra\_prefixes: array of string

Extra set of static prefixes to advertise to the customer’s end of the session

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_mode: optional "dynamic\_route\_exchange"or "advertise\_only"

The BGP mode for a CNI.

Controls the customer-facing data path:

- <code>DynamicRouteExchange</code> — Full BGP: routes flow through to conduit via CRE / bgp-bridge / bgp-bridge-receiver.
- <code>AdvertiseOnly</code> — static advertisement via taserver, no routes exchanged with Conduit

</summary>

One of the following:

"dynamic\_route\_exchange"

<a href="#">Link to this property</a>

"advertise\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)>)

#### Network InterconnectsInterconnects

##### [List existing interconnects](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects/methods/list)

GET/accounts/{account\_id}/cni/interconnects

##### [Get information about an interconnect object](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects/methods/get)

GET/accounts/{account\_id}/cni/interconnects/{icon}

##### [Create a new interconnect](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects/methods/create)

POST/accounts/{account\_id}/cni/interconnects

##### [Delete an interconnect object](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects/methods/delete)

DELETE/accounts/{account\_id}/cni/interconnects/{icon}

##### [Generate the Letter of Authorization (LOA) for a given interconnect](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects/methods/loa)

GET/accounts/{account\_id}/cni/interconnects/{icon}/loa

##### [Get the current status of an interconnect object](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects/methods/status)

GET/accounts/{account\_id}/cni/interconnects/{icon}/status

##### ModelsExpand Collapse

<details>

<summary>

InterconnectListResponse object {items, next }

</summary>

<details>

<summary>

items: array of object {account, facility, name, 7 more } or object {account, name, region, 4 more }

</summary>

One of the following:

<details>

<summary>

NscInterconnectPhysicalBody object {account, facility, name, 7 more }

</summary>

account: string

<a href="#">Link to this property</a>

<details>

<summary>

facility: object {address, name }

</summary>

address: array of string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

site: string

A Cloudflare site name.

<a href="#">Link to this property</a>

slot\_id: string

formatuuid

<a href="#">Link to this property</a>

speed: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: string

formatuuid

<a href="#">Link to this property</a>

ccr\_device\_name: optional string

<a href="#">Link to this property</a>

owner: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NscInterconnectGcpPartnerBody object {account, name, region, 4 more }

</summary>

account: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: string

formatuuid

<a href="#">Link to this property</a>

owner: optional string

<a href="#">Link to this property</a>

<details>

<summary>

speed: optional "50M"or "100M"or "200M"or 9 more

Bandwidth structure as visible through the customer-facing API.

</summary>

One of the following:

"50M"

<a href="#">Link to this property</a>

"100M"

<a href="#">Link to this property</a>

"200M"

<a href="#">Link to this property</a>

"300M"

<a href="#">Link to this property</a>

"400M"

<a href="#">Link to this property</a>

"500M"

<a href="#">Link to this property</a>

"1G"

<a href="#">Link to this property</a>

"2G"

<a href="#">Link to this property</a>

"5G"

<a href="#">Link to this property</a>

"10G"

<a href="#">Link to this property</a>

"20G"

<a href="#">Link to this property</a>

"50G"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next: optional number

formatint32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_list_response%20%3E%20(schema)>)

<details>

<summary>

InterconnectGetResponse = object {account, facility, name, 7 more } or object {account, name, region, 4 more }

</summary>

One of the following:

<details>

<summary>

NscInterconnectPhysicalBody object {account, facility, name, 7 more }

</summary>

account: string

<a href="#">Link to this property</a>

<details>

<summary>

facility: object {address, name }

</summary>

address: array of string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

site: string

A Cloudflare site name.

<a href="#">Link to this property</a>

slot\_id: string

formatuuid

<a href="#">Link to this property</a>

speed: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: string

formatuuid

<a href="#">Link to this property</a>

ccr\_device\_name: optional string

<a href="#">Link to this property</a>

owner: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NscInterconnectGcpPartnerBody object {account, name, region, 4 more }

</summary>

account: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: string

formatuuid

<a href="#">Link to this property</a>

owner: optional string

<a href="#">Link to this property</a>

<details>

<summary>

speed: optional "50M"or "100M"or "200M"or 9 more

Bandwidth structure as visible through the customer-facing API.

</summary>

One of the following:

"50M"

<a href="#">Link to this property</a>

"100M"

<a href="#">Link to this property</a>

"200M"

<a href="#">Link to this property</a>

"300M"

<a href="#">Link to this property</a>

"400M"

<a href="#">Link to this property</a>

"500M"

<a href="#">Link to this property</a>

"1G"

<a href="#">Link to this property</a>

"2G"

<a href="#">Link to this property</a>

"5G"

<a href="#">Link to this property</a>

"10G"

<a href="#">Link to this property</a>

"20G"

<a href="#">Link to this property</a>

"50G"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_get_response%20%3E%20(schema)>)

<details>

<summary>

InterconnectCreateResponse = object {account, facility, name, 7 more } or object {account, name, region, 4 more }

</summary>

One of the following:

<details>

<summary>

NscInterconnectPhysicalBody object {account, facility, name, 7 more }

</summary>

account: string

<a href="#">Link to this property</a>

<details>

<summary>

facility: object {address, name }

</summary>

address: array of string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

site: string

A Cloudflare site name.

<a href="#">Link to this property</a>

slot\_id: string

formatuuid

<a href="#">Link to this property</a>

speed: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: string

formatuuid

<a href="#">Link to this property</a>

ccr\_device\_name: optional string

<a href="#">Link to this property</a>

owner: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NscInterconnectGcpPartnerBody object {account, name, region, 4 more }

</summary>

account: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: string

formatuuid

<a href="#">Link to this property</a>

owner: optional string

<a href="#">Link to this property</a>

<details>

<summary>

speed: optional "50M"or "100M"or "200M"or 9 more

Bandwidth structure as visible through the customer-facing API.

</summary>

One of the following:

"50M"

<a href="#">Link to this property</a>

"100M"

<a href="#">Link to this property</a>

"200M"

<a href="#">Link to this property</a>

"300M"

<a href="#">Link to this property</a>

"400M"

<a href="#">Link to this property</a>

"500M"

<a href="#">Link to this property</a>

"1G"

<a href="#">Link to this property</a>

"2G"

<a href="#">Link to this property</a>

"5G"

<a href="#">Link to this property</a>

"10G"

<a href="#">Link to this property</a>

"20G"

<a href="#">Link to this property</a>

"50G"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_create_response%20%3E%20(schema)>)

<details>

<summary>

InterconnectStatusResponse = object {state } or object {state, reason } or object {state, reason } or object {state }

</summary>

One of the following:

<details>

<summary>

Pending object {state }

</summary>

state: "Pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Down object {state, reason }

</summary>

state: "Down"

<a href="#">Link to this property</a>

reason: optional string

Diagnostic information, if available

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Unhealthy object {state, reason }

</summary>

state: "Unhealthy"

<a href="#">Link to this property</a>

reason: optional string

Diagnostic information, if available

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Healthy object {state }

</summary>

state: "Healthy"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_status_response%20%3E%20(schema)>)

#### Network InterconnectsSettings

##### [Get the current settings for the active account](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/settings/methods/get)

GET/accounts/{account\_id}/cni/settings

##### [Update the current settings for the active account](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/settings/methods/update)

PUT/accounts/{account\_id}/cni/settings

##### ModelsExpand Collapse

<details>

<summary>

SettingGetResponse object {default\_asn }

</summary>

default\_asn: number

formatint32

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.settings%20%3E%20(model)%20setting_get_response%20%3E%20(schema)>)

<details>

<summary>

SettingUpdateResponse object {default\_asn }

</summary>

default\_asn: number

formatint32

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.settings%20%3E%20(model)%20setting_update_response%20%3E%20(schema)>)

#### Network InterconnectsSlots

##### [Retrieve a list of all slots matching the specified parameters](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/slots/methods/list)

GET/accounts/{account\_id}/cni/slots

##### [Get information about the specified slot](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/slots/methods/get)

GET/accounts/{account\_id}/cni/slots/{slot}

##### ModelsExpand Collapse

<details>

<summary>

SlotListResponse object {items, next }

</summary>

<details>

<summary>

items: array of object {id, facility, occupied, 4 more }

</summary>

id: string

Slot ID

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

facility: object {address, name }

</summary>

address: array of string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

occupied: boolean

Whether the slot is occupied or not

<a href="#">Link to this property</a>

site: string

<a href="#">Link to this property</a>

speed: string

<a href="#">Link to this property</a>

account: optional string

Customer account tag

<a href="#">Link to this property</a>

ccr\_device\_name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next: optional number

formatint32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_list_response%20%3E%20(schema)>)

<details>

<summary>

SlotGetResponse object {id, facility, occupied, 4 more }

</summary>

id: string

Slot ID

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

facility: object {address, name }

</summary>

address: array of string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

occupied: boolean

Whether the slot is occupied or not

<a href="#">Link to this property</a>

site: string

<a href="#">Link to this property</a>

speed: string

<a href="#">Link to this property</a>

account: optional string

Customer account tag

<a href="#">Link to this property</a>

ccr\_device\_name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_get_response%20%3E%20(schema)>)