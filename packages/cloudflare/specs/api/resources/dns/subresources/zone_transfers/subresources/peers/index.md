---
title: Peers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Peers

##### [List Peers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/peers/methods/list)

GET/accounts/{account\_id}/secondary\_dns/peers

##### [Peer Details](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/peers/methods/get)

GET/accounts/{account\_id}/secondary\_dns/peers/{peer\_id}

##### [Create Peer](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/peers/methods/create)

POST/accounts/{account\_id}/secondary\_dns/peers

##### [Update Peer](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/peers/methods/update)

PUT/accounts/{account\_id}/secondary\_dns/peers/{peer\_id}

##### [Delete Peer](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/peers/methods/delete)

DELETE/accounts/{account\_id}/secondary\_dns/peers/{peer\_id}

##### ModelsExpand Collapse

<details>

<summary>

Peer object {id, name, ip, 3 more }

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

[Link to this property](#)%20dns.zone_transfers.peers%20%3E%20(model)%20peer%20%3E%20(schema)>)

<details>

<summary>

PeerDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.peers%20%3E%20(model)%20peer_delete_response%20%3E%20(schema)>)