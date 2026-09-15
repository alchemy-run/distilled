---
title: Outgoing
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Outgoing

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

#### OutgoingStatus

##### [Get Outgoing Zone Transfer Status](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/outgoing/subresources/status/methods/get)

GET/zones/{zone\_id}/secondary\_dns/outgoing/status