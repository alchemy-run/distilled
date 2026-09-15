---
title: Incoming
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Incoming

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