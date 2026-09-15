---
title: Peer Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers)

[Peers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/peers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Peer Details

GET/accounts/{account\_id}/secondary\_dns/peers/{peer\_id}

Get Peer.

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

`Account Settings Write``Account Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20dns.zone_transfers.peers%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

peer\_id: string

[Link to this property](#)%20dns.zone_transfers.peers%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20peer_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20dns.zone_transfers.peers%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20dns.zone_transfers.peers%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.zone_transfers.peers%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.zone_transfers.peers%20%3E%20(model)%20peer%20%3E%20(schema)">Peer</a> { id, name, ip, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

name: string

The name of the peer.

<a href="#">Link to this property</a>

ip: optional string

IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.

<a href="#">Link to this property</a>

ixfr\_enable: optional boolean

Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.

<a href="#">Link to this property</a>

port: optional number

DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.

<a href="#">Link to this property</a>

tsig\_id: optional string

TSIG authentication will be used for zone transfer if configured.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.peers%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Peer Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/peers/$PEER_ID \
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa",
    "name": "my-peer-1",
    "ip": "192.0.2.53",
    "ixfr_enable": false,
    "port": 53,
    "tsig_id": "69cd1e104af3e6ed3cb344f263fd0d5a"
  }
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa",
    "name": "my-peer-1",
    "ip": "192.0.2.53",
    "ixfr_enable": false,
    "port": 53,
    "tsig_id": "69cd1e104af3e6ed3cb344f263fd0d5a"
  }
}
```