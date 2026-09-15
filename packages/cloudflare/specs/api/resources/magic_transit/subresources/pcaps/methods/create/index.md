---
title: Create PCAP request
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[PCAPs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create PCAP request

POST/accounts/{account\_id}/pcaps

Create new PCAP request for account.

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

`Magic Firewall Packet Captures - Write PCAPs API`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {packet\_limit, system, time\_limit, 3 more } or object {colo\_name, destination\_conf, system, 5 more }

</summary>

One of the following:

<details>

<summary>

MagicVisibilityPCAPsPCAPsRequestSimple object {packet\_limit, system, time\_limit, 3 more }

</summary>

packet\_limit: number

The limit of packets contained in a packet capture.

maximum10000

minimum1

<a href="#">Link to this property</a>

system: "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

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

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MagicVisibilityPCAPsPCAPsRequestFull object {colo\_name, destination\_conf, system, 5 more }

</summary>

colo\_name: string

The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

destination\_conf: string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

system: "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: number

The packet capture duration in seconds.

maximum86400

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

byte\_limit: optional number

The maximum number of bytes to capture. This field only applies to <code>full</code> packet captures.

maximum1000000000

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

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

<a href="#">Link to this property</a>

packet\_limit: optional number

The limit of packets contained in a packet capture.

maximum10000

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)">PCAP</a> { id, filter\_v1, offset\_time, 5 more } or object {id, byte\_limit, colo\_name, 10 more }

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

<details>

<summary>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

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

<details>

<summary>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

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

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create PCAP request

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "packet_limit": 10000,
          "system": "magic-transit",
          "time_limit": 300,
          "type": "simple",
          "offset_time": "2020-01-01T08:00:00Z"
        }'
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
    "id": "66802ca5668e47a2b82c2e6746e45037",
    "filter_v1": {
      "destination_address": "1.2.3.4",
      "destination_port": 80,
      "protocol": 6,
      "source_address": "1.2.3.4",
      "source_port": 123
    },
    "offset_time": "2020-01-01T08:00:00Z",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "system": "magic-transit",
    "time_limit": 300,
    "type": "simple"
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
    "id": "66802ca5668e47a2b82c2e6746e45037",
    "filter_v1": {
      "destination_address": "1.2.3.4",
      "destination_port": 80,
      "protocol": 6,
      "source_address": "1.2.3.4",
      "source_port": 123
    },
    "offset_time": "2020-01-01T08:00:00Z",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "system": "magic-transit",
    "time_limit": 300,
    "type": "simple"
  },
  "success": true
}
```