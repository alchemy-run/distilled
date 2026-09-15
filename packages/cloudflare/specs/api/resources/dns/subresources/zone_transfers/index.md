---
title: Zone Transfers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Zone Transfers

#### Zone TransfersForce AXFR

##### [Force AXFR](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/force_axfr/methods/create)

POST/zones/{zone\_id}/secondary\_dns/force\_axfr

##### ModelsExpand Collapse

ForceAXFR = string

When force\_axfr query parameter is set to true, the response is a simple string.

[Link to this property](#)%20dns.zone_transfers.force_axfr%20%3E%20(model)%20force_axfr%20%3E%20(schema)>)

#### Zone TransfersIncoming

##### [Secondary Zone Configuration Details](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/incoming/methods/get)

GET/zones/{zone\_id}/secondary\_dns/incoming

##### [Create Secondary Zone Configuration](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/incoming/methods/create)

POST/zones/{zone\_id}/secondary\_dns/incoming

##### [Update Secondary Zone Configuration](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/incoming/methods/update)

PUT/zones/{zone\_id}/secondary\_dns/incoming

##### [Delete Secondary Zone Configuration](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/incoming/methods/delete)

DELETE/zones/{zone\_id}/secondary\_dns/incoming

##### ModelsExpand Collapse

<details>

<summary>

Incoming object {id, auto\_refresh\_seconds, checked\_time, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

auto\_refresh\_seconds: optional number

How often should a secondary zone auto refresh regardless of DNS NOTIFY. Not applicable for primary zones.

minimum300

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

modified\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(model)%20incoming%20%3E%20(schema)>)

<details>

<summary>

IncomingGetResponse object {id, auto\_refresh\_seconds, checked\_time, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

auto\_refresh\_seconds: optional number

How often should a secondary zone auto refresh regardless of DNS NOTIFY. Not applicable for primary zones.

minimum300

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

modified\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(model)%20incoming_get_response%20%3E%20(schema)>)

<details>

<summary>

IncomingCreateResponse object {id, auto\_refresh\_seconds, checked\_time, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

auto\_refresh\_seconds: optional number

How often should a secondary zone auto refresh regardless of DNS NOTIFY. Not applicable for primary zones.

minimum300

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

modified\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(model)%20incoming_create_response%20%3E%20(schema)>)

<details>

<summary>

IncomingUpdateResponse object {id, auto\_refresh\_seconds, checked\_time, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

auto\_refresh\_seconds: optional number

How often should a secondary zone auto refresh regardless of DNS NOTIFY. Not applicable for primary zones.

minimum300

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

modified\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(model)%20incoming_update_response%20%3E%20(schema)>)

<details>

<summary>

IncomingDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(model)%20incoming_delete_response%20%3E%20(schema)>)

#### Zone TransfersOutgoing

##### [Primary Zone Configuration Details](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/methods/get)

GET/zones/{zone\_id}/secondary\_dns/outgoing

##### [Create Primary Zone Configuration](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/methods/create)

POST/zones/{zone\_id}/secondary\_dns/outgoing

##### [Update Primary Zone Configuration](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/methods/update)

PUT/zones/{zone\_id}/secondary\_dns/outgoing

##### [Delete Primary Zone Configuration](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/methods/delete)

DELETE/zones/{zone\_id}/secondary\_dns/outgoing

##### [Disable Outgoing Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/methods/disable)

POST/zones/{zone\_id}/secondary\_dns/outgoing/disable

##### [Enable Outgoing Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/methods/enable)

POST/zones/{zone\_id}/secondary\_dns/outgoing/enable

##### [Force DNS NOTIFY](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/methods/force_notify)

POST/zones/{zone\_id}/secondary\_dns/outgoing/force\_notify

##### ModelsExpand Collapse

DisableTransfer = string

The zone transfer status of a primary zone.

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20disable_transfer%20%3E%20(schema)>)

EnableTransfer = string

The zone transfer status of a primary zone.

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20enable_transfer%20%3E%20(schema)>)

<details>

<summary>

Outgoing object {id, checked\_time, created\_time, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

last\_transferred\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20outgoing%20%3E%20(schema)>)

OutgoingStatus = string

The zone transfer status of a primary zone.

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20outgoing_status%20%3E%20(schema)>)

<details>

<summary>

OutgoingGetResponse object {id, checked\_time, created\_time, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

last\_transferred\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20outgoing_get_response%20%3E%20(schema)>)

<details>

<summary>

OutgoingCreateResponse object {id, checked\_time, created\_time, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

last\_transferred\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20outgoing_create_response%20%3E%20(schema)>)

<details>

<summary>

OutgoingUpdateResponse object {id, checked\_time, created\_time, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

last\_transferred\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20outgoing_update_response%20%3E%20(schema)>)

<details>

<summary>

OutgoingDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20outgoing_delete_response%20%3E%20(schema)>)

OutgoingForceNotifyResponse = string

When force\_notify query parameter is set to true, the response is a simple string.

[Link to this property](#)%20dns.zone_transfers.outgoing%20%3E%20(model)%20outgoing_force_notify_response%20%3E%20(schema)>)

#### Zone TransfersOutgoingStatus

##### [Get Outgoing Zone Transfer Status](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/subresources/status/methods/get)

GET/zones/{zone\_id}/secondary\_dns/outgoing/status

#### Zone TransfersACLs

##### [List ACLs](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/list)

GET/accounts/{account\_id}/secondary\_dns/acls

##### [ACL Details](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/get)

GET/accounts/{account\_id}/secondary\_dns/acls/{acl\_id}

##### [Create ACL](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/create)

POST/accounts/{account\_id}/secondary\_dns/acls

##### [Update ACL](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/update)

PUT/accounts/{account\_id}/secondary\_dns/acls/{acl\_id}

##### [Delete ACL](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/delete)

DELETE/accounts/{account\_id}/secondary\_dns/acls/{acl\_id}

##### ModelsExpand Collapse

<details>

<summary>

ACL object {id, ip\_range, name }

</summary>

id: string

<a href="#">Link to this property</a>

ip\_range: string

Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

<a href="#">Link to this property</a>

name: string

The name of the acl.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.acls%20%3E%20(model)%20acl%20%3E%20(schema)>)

<details>

<summary>

ACLDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.acls%20%3E%20(model)%20acl_delete_response%20%3E%20(schema)>)

#### Zone TransfersPeers

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

#### Zone TransfersTSIGs

##### [List TSIGs](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/list)

GET/accounts/{account\_id}/secondary\_dns/tsigs

##### [TSIG Details](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/get)

GET/accounts/{account\_id}/secondary\_dns/tsigs/{tsig\_id}

##### [Create TSIG](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/create)

POST/accounts/{account\_id}/secondary\_dns/tsigs

##### [Update TSIG](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/update)

PUT/accounts/{account\_id}/secondary\_dns/tsigs/{tsig\_id}

##### [Delete TSIG](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/delete)

DELETE/accounts/{account\_id}/secondary\_dns/tsigs/{tsig\_id}

##### ModelsExpand Collapse

<details>

<summary>

TSIG object {id, algo, name, secret }

</summary>

id: string

<a href="#">Link to this property</a>

algo: string

TSIG algorithm.

<a href="#">Link to this property</a>

name: string

TSIG key name.

<a href="#">Link to this property</a>

secret: string

TSIG secret.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.tsigs%20%3E%20(model)%20tsig%20%3E%20(schema)>)

<details>

<summary>

TSIGDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.tsigs%20%3E%20(model)%20tsig_delete_response%20%3E%20(schema)>)