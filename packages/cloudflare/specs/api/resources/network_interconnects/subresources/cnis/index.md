---
title: CNIs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Network Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# CNIs

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