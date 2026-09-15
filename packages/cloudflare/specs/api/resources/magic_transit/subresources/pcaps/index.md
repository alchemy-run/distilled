---
title: PCAPs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# PCAPs

##### [List packet capture requests](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/methods/list)

GET/accounts/{account\_id}/pcaps

##### [Get PCAP request](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/methods/get)

GET/accounts/{account\_id}/pcaps/{pcap\_id}

##### [Create PCAP request](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/methods/create)

POST/accounts/{account\_id}/pcaps

##### [Stop full PCAP](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/methods/stop)

PUT/accounts/{account\_id}/pcaps/{pcap\_id}/stop

##### ModelsExpand Collapse

<details>

<summary>

PCAP object {id, filter\_v1, offset\_time, 5 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)>)

<details>

<summary>

PCAPFilter object {destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

</summary>

destination\_address: optional string

The destination IP address of the packet.

<a href="#">Link to this property</a>

destination\_port: optional number

The destination port of the packet.

<a href="#">Link to this property</a>

protocol: optional number

The protocol number of the packet.

<a href="#">Link to this property</a>

source\_address: optional string

The source IP address of the packet.

<a href="#">Link to this property</a>

source\_port: optional number

The source port of the packet.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)>)

<details>

<summary>

PCAPListResponse = <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)">PCAP</a> { id, filter\_v1, offset\_time, 5 more } or object {id, byte\_limit, colo\_name, 10 more }

</summary>

One of the following:

<details>

<summary>

PCAP object {id, filter\_v1, offset\_time, 5 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MagicVisibilityPCAPsPCAPsResponseFull object {id, byte\_limit, colo\_name, 10 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

byte\_limit: optional number

The maximum number of bytes to capture. This field only applies to <code>full</code> packet captures.

maximum1000000000

minimum1

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

destination\_conf: optional string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

error\_message: optional string

An error message that describes why the packet capture failed. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

packets\_captured: optional number

The number of packets captured.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stop\_requested: optional string

The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to <code>full</code> packet captures.

formatdate-time

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum86400

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap_list_response%20%3E%20(schema)>)

<details>

<summary>

PCAPGetResponse = <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)">PCAP</a> { id, filter\_v1, offset\_time, 5 more } or object {id, byte\_limit, colo\_name, 10 more }

</summary>

One of the following:

<details>

<summary>

PCAP object {id, filter\_v1, offset\_time, 5 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MagicVisibilityPCAPsPCAPsResponseFull object {id, byte\_limit, colo\_name, 10 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

byte\_limit: optional number

The maximum number of bytes to capture. This field only applies to <code>full</code> packet captures.

maximum1000000000

minimum1

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

destination\_conf: optional string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

error\_message: optional string

An error message that describes why the packet capture failed. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

packets\_captured: optional number

The number of packets captured.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stop\_requested: optional string

The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to <code>full</code> packet captures.

formatdate-time

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum86400

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap_get_response%20%3E%20(schema)>)

<details>

<summary>

PCAPCreateResponse = <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)">PCAP</a> { id, filter\_v1, offset\_time, 5 more } or object {id, byte\_limit, colo\_name, 10 more }

</summary>

One of the following:

<details>

<summary>

PCAP object {id, filter\_v1, offset\_time, 5 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MagicVisibilityPCAPsPCAPsResponseFull object {id, byte\_limit, colo\_name, 10 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

byte\_limit: optional number

The maximum number of bytes to capture. This field only applies to <code>full</code> packet captures.

maximum1000000000

minimum1

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

destination\_conf: optional string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

error\_message: optional string

An error message that describes why the packet capture failed. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

packets\_captured: optional number

The number of packets captured.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stop\_requested: optional string

The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to <code>full</code> packet captures.

formatdate-time

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum86400

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap_create_response%20%3E%20(schema)>)

#### PCAPsOwnership

##### [List PCAPs Bucket Ownership](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership/methods/get)

GET/accounts/{account\_id}/pcaps/ownership

##### [Add buckets for full packet captures](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership/methods/create)

POST/accounts/{account\_id}/pcaps/ownership

##### [Delete buckets for full packet captures](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership/methods/delete)

DELETE/accounts/{account\_id}/pcaps/ownership/{ownership\_id}

##### [Validate buckets for full packet captures](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership/methods/validate)

POST/accounts/{account\_id}/pcaps/ownership/validate

##### ModelsExpand Collapse

<details>

<summary>

Ownership object {id, destination\_conf, filename, 3 more }

</summary>

id: string

The bucket ID associated with the packet captures API.

maxLength32

minLength32

<a href="#">Link to this property</a>

destination\_conf: string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filename: string

The ownership challenge filename stored in the bucket.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "success"or "failed"

The status of the ownership challenge. Can be pending, success or failed.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: string

The RFC 3339 timestamp when the bucket was added to packet captures API.

<a href="#">Link to this property</a>

validated: optional string

The RFC 3339 timestamp when the bucket was validated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps.ownership%20%3E%20(model)%20ownership%20%3E%20(schema)>)

#### PCAPsDownload

##### [Download Simple PCAP](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/download/methods/get)

GET/accounts/{account\_id}/pcaps/{pcap\_id}/download