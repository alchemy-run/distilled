---
title: Delete IPsec Tunnel
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[IPSEC Tunnels](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete IPsec Tunnel

DELETE/accounts/{account\_id}/magic/ipsec\_tunnels/{ipsec\_tunnel\_id}

Disables and removes a specific static IPsec Tunnel associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

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

Identifier

maxLength32

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

ipsec\_tunnel\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20ipsec_tunnel_id%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

"x-magic-new-hc-target": optional boolean

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20x-magic-new-hc-target%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {deleted, deleted\_ipsec\_tunnel }

</summary>

deleted: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

deleted\_ipsec\_tunnel: optional object {id, cloudflare\_endpoint, interface\_address, 14 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_endpoint: string

The IP address assigned to the Cloudflare side of the IPsec tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the IPsec tunnel. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

allow\_null\_cipher: optional boolean

When <code>true</code>, the tunnel can use a null-cipher (<code>ENCR_NULL</code>) in the ESP tunnel (Phase 2).

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

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

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

custom\_remote\_identities: optional object {fqdn\_id }

</summary>

fqdn\_id: optional string

A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The generated IKE IDs can still be used even if this custom value is specified.

Must be of the form <code>&lt;custom label&gt;.&lt;account ID&gt;.custom.ipsec.cloudflare.com</code>.

This custom ID does not need to be unique. Two IPsec tunnels may have the same custom fqdn\_id. However, if another IPsec tunnel has the same value then the two tunnels cannot have the same cloudflare\_endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_endpoint: optional string

The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

<a href="#">Link to this property</a>

description: optional string

An optional description forthe IPsec tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"mid"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

</summary>

One of the following:

"reply"

<a href="#">Link to this property</a>

"request"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

psk\_metadata: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

</summary>

last\_generated\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

replay\_protection: optional boolean

If <code>true</code>, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete IPsec Tunnel

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/$IPSEC_TUNNEL_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "deleted": true,
    "deleted_ipsec_tunnel": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "cloudflare_endpoint": "203.0.113.1",
      "interface_address": "192.0.2.0/31",
      "name": "IPsec_1",
      "allow_null_cipher": true,
      "automatic_return_routing": true,
      "bgp": {
        "customer_asn": 0,
        "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "extra_prefixes": [
          "string"
        ],
        "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "md5_key": "md5_key"
      },
      "bgp_status": {
        "state": "BGP_DOWN",
        "tcp_established": true,
        "updated_at": "2019-12-27T18:11:19.117Z",
        "bgp_state": "bgp_state",
        "cf_speaker_ip": "192.168.1.1",
        "cf_speaker_port": 1,
        "customer_speaker_ip": "192.168.1.1",
        "customer_speaker_port": 1
      },
      "created_on": "2017-06-14T00:00:00Z",
      "custom_remote_identities": {
        "fqdn_id": "fqdn_id"
      },
      "customer_endpoint": "203.0.113.1",
      "description": "Tunnel for ISP X",
      "health_check": {
        "direction": "bidirectional",
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "psk_metadata": {
        "last_generated_on": "2017-06-14T05:20:00Z"
      },
      "replay_protection": false
    }
  },
  "success": true
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
  "result": {
    "deleted": true,
    "deleted_ipsec_tunnel": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "cloudflare_endpoint": "203.0.113.1",
      "interface_address": "192.0.2.0/31",
      "name": "IPsec_1",
      "allow_null_cipher": true,
      "automatic_return_routing": true,
      "bgp": {
        "customer_asn": 0,
        "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "extra_prefixes": [
          "string"
        ],
        "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "md5_key": "md5_key"
      },
      "bgp_status": {
        "state": "BGP_DOWN",
        "tcp_established": true,
        "updated_at": "2019-12-27T18:11:19.117Z",
        "bgp_state": "bgp_state",
        "cf_speaker_ip": "192.168.1.1",
        "cf_speaker_port": 1,
        "customer_speaker_ip": "192.168.1.1",
        "customer_speaker_port": 1
      },
      "created_on": "2017-06-14T00:00:00Z",
      "custom_remote_identities": {
        "fqdn_id": "fqdn_id"
      },
      "customer_endpoint": "203.0.113.1",
      "description": "Tunnel for ISP X",
      "health_check": {
        "direction": "bidirectional",
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "psk_metadata": {
        "last_generated_on": "2017-06-14T05:20:00Z"
      },
      "replay_protection": false
    }
  },
  "success": true
}
```