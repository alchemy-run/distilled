---
title: Modify stored information about a CNI object
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Network Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects)

[CNIs](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/cnis)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Modify stored information about a CNI object

PUT/accounts/{account\_id}/cni/cnis/{cni}

Updates the configuration of an existing Cloud Network Interconnect (CNI), including connection parameters and routing settings.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Magic WAN Write``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Customer account tag

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

cni: string

formatuuid

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20cni%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

id: string

formatuuid

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20id%20%3E%20(schema)>)

account: string

Customer account tag

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20account%20%3E%20(schema)>)

cust\_ip: string

Customer end of the point-to-point link

This should always be inside the same prefix as `p2p_ip`.

formatA.B.C.D/N

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20cust_ip%20%3E%20(schema)>)

interconnect: string

Interconnect identifier hosting this CNI

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20interconnect%20%3E%20(schema)>)

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

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20magic%20%3E%20(schema)>)

p2p\_ip: string

Cloudflare end of the point-to-point link

formatA.B.C.D/N

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20p2p_ip%20%3E%20(schema)>)

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

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20bgp%20%3E%20(schema)>)

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

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20bgp_mode%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: string

formatuuid

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)%20%3E%20(property)%20id>)

account: string

Customer account tag

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)%20%3E%20(property)%20account>)

cust\_ip: string

Customer end of the point-to-point link

This should always be inside the same prefix as `p2p_ip`.

formatA.B.C.D/N

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)%20%3E%20(property)%20cust_ip>)

interconnect: string

Interconnect identifier hosting this CNI

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)%20%3E%20(property)%20interconnect>)

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

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)%20%3E%20(property)%20magic>)

p2p\_ip: string

Cloudflare end of the point-to-point link

formatA.B.C.D/N

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)%20%3E%20(property)%20p2p_ip>)

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

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)%20%3E%20(property)%20bgp>)

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

[Link to this property](#)%20network_interconnects.cnis%20%3E%20(model)%20cni_update_response%20%3E%20(schema)%20%3E%20(property)%20bgp_mode>)

### Modify stored information about a CNI object

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/cnis/$CNI \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "account": "account",
          "cust_ip": "192.168.3.4/31",
          "interconnect": "interconnect",
          "magic": {
            "conduit_name": "conduit_name",
            "description": "description",
            "mtu": 0
          },
          "p2p_ip": "192.168.3.4/31"
        }'
```

200 example

```
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "account": "account",
  "cust_ip": "192.168.3.4/31",
  "interconnect": "interconnect",
  "magic": {
    "conduit_name": "conduit_name",
    "description": "description",
    "mtu": 0
  },
  "p2p_ip": "192.168.3.4/31",
  "bgp": {
    "customer_asn": 0,
    "extra_prefixes": [
      "string"
    ],
    "md5_key": "md5_key"
  },
  "bgp_mode": "dynamic_route_exchange"
}
```

##### Returns Examples

200 example

```
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "account": "account",
  "cust_ip": "192.168.3.4/31",
  "interconnect": "interconnect",
  "magic": {
    "conduit_name": "conduit_name",
    "description": "description",
    "mtu": 0
  },
  "p2p_ip": "192.168.3.4/31",
  "bgp": {
    "customer_asn": 0,
    "extra_prefixes": [
      "string"
    ],
    "md5_key": "md5_key"
  },
  "bgp_mode": "dynamic_route_exchange"
}
```