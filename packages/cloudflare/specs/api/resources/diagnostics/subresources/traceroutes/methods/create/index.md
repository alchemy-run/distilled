---
title: Traceroute
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Diagnostics](https://developers.cloudflare.com/api/resources/diagnostics)

[Traceroutes](https://developers.cloudflare.com/api/resources/diagnostics/subresources/traceroutes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Traceroute

POST/accounts/{account\_id}/diagnostics/traceroute

Run traceroutes from Cloudflare colos.

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

`Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

targets: array of string

maxLength10

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20targets%20%3E%20(schema)>)

colos: optional array of string

If no source colo names specified, all colos will be used. China colos are unavailable for traceroutes.

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20colos%20%3E%20(schema)>)

<details>

<summary>

options: optional object {max\_ttl, packet\_type, packets\_per\_ttl, 2 more }

</summary>

max\_ttl: optional number

Max TTL.

maximum64

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

packet\_type: optional "icmp"or "tcp"or "udp"or 2 more

Type of packet sent.

</summary>

One of the following:

"icmp"

<a href="#">Link to this property</a>

"tcp"

<a href="#">Link to this property</a>

"udp"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"gre+icmp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

packets\_per\_ttl: optional number

Number of packets sent at each TTL.

maximum10

minimum0

<a href="#">Link to this property</a>

port: optional number

For UDP and TCP, specifies the destination port. For ICMP, specifies the initial ICMP sequence value. Default value 0 will choose the best value to use for each protocol.

maximum65535

minimum0

<a href="#">Link to this property</a>

wait\_time: optional number

Set the time (in seconds) to wait for a response to a probe.

maximum5

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20options%20%3E%20(schema)>)

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

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/diagnostics#(resource)%20diagnostics.traceroutes%20%3E%20(model)%20traceroute%20%3E%20(schema)">Traceroute</a> { colos, target }

</summary>

<details>

<summary>

colos: optional array of object {colo, error, hops, 2 more }

</summary>

<details>

<summary>

colo: optional object {city, name }

</summary>

city: optional string

Source colo city.

<a href="#">Link to this property</a>

name: optional string

Source colo name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

error: optional ""or "Could not gather traceroute data: Code 1"or "Could not gather traceroute data: Code 2"or 2 more

Errors resulting from collecting traceroute from colo to target.

</summary>

One of the following:

""

<a href="#">Link to this property</a>

"Could not gather traceroute data: Code 1"

<a href="#">Link to this property</a>

"Could not gather traceroute data: Code 2"

<a href="#">Link to this property</a>

"Could not gather traceroute data: Code 3"

<a href="#">Link to this property</a>

"Could not gather traceroute data: Code 4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

hops: optional array of object {nodes, packets\_lost, packets\_sent, packets\_ttl }

</summary>

<details>

<summary>

nodes: optional array of object {asn, ip, labels, 6 more }

An array of node objects.

</summary>

asn: optional string

AS number associated with the node object.

<a href="#">Link to this property</a>

ip: optional string

IP address of the node.

<a href="#">Link to this property</a>

labels: optional array of string

Field appears if there is an additional annotation printed when the probe returns. Field also appears when running a GRE+ICMP traceroute to denote which traceroute a node comes from.

<a href="#">Link to this property</a>

max\_rtt\_ms: optional number

Maximum RTT in ms.

<a href="#">Link to this property</a>

mean\_rtt\_ms: optional number

Mean RTT in ms.

<a href="#">Link to this property</a>

min\_rtt\_ms: optional number

Minimum RTT in ms.

<a href="#">Link to this property</a>

name: optional string

Host name of the address, this may be the same as the IP address.

<a href="#">Link to this property</a>

packet\_count: optional number

Number of packets with a response from this node.

<a href="#">Link to this property</a>

std\_dev\_rtt\_ms: optional number

Standard deviation of the RTTs in ms.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

packets\_lost: optional number

Number of packets where no response was received.

<a href="#">Link to this property</a>

packets\_sent: optional number

Number of packets sent with specified TTL.

<a href="#">Link to this property</a>

packets\_ttl: optional number

The time to live (TTL).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

target\_summary: optional unknown

Aggregated statistics from all hops about the target.

<a href="#">Link to this property</a>

traceroute\_time\_ms: optional number

Total time of traceroute in ms.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

target: optional string

The target hostname, IPv6, or IPv6 address.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Traceroute

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/diagnostics/traceroute \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "targets": [
            "203.0.113.1",
            "cloudflare.com"
          ],
          "colos": [
            "den",
            "sin"
          ],
          "options": {
            "max_ttl": 15,
            "packet_type": "icmp"
          }
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
  "success": true,
  "result": [
    {
      "colos": [
        {
          "colo": {
            "city": "Denver, CO, US",
            "name": "den01"
          },
          "error": "",
          "hops": [
            {
              "nodes": [
                {
                  "asn": "AS13335",
                  "ip": "1.1.1.1",
                  "labels": [
                    "string"
                  ],
                  "max_rtt_ms": 0,
                  "mean_rtt_ms": 0,
                  "min_rtt_ms": 0,
                  "name": "one.one.one.one",
                  "packet_count": 3,
                  "std_dev_rtt_ms": 0
                }
              ],
              "packets_lost": 0,
              "packets_sent": 0,
              "packets_ttl": 0
            }
          ],
          "target_summary": {
            "asn": "",
            "ip": "1.1.1.1",
            "max_latency_ms": 0.034,
            "mean_latency_ms": 0.021,
            "min_latency_ms": 0.014,
            "name": "1.1.1.1",
            "packet_count": 3,
            "std_dev_latency_ms": 0.011269427669584647
          },
          "traceroute_time_ms": 0
        }
      ],
      "target": "1.1.1.1"
    }
  ]
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
  "result": [
    {
      "colos": [
        {
          "colo": {
            "city": "Denver, CO, US",
            "name": "den01"
          },
          "error": "",
          "hops": [
            {
              "nodes": [
                {
                  "asn": "AS13335",
                  "ip": "1.1.1.1",
                  "labels": [
                    "string"
                  ],
                  "max_rtt_ms": 0,
                  "mean_rtt_ms": 0,
                  "min_rtt_ms": 0,
                  "name": "one.one.one.one",
                  "packet_count": 3,
                  "std_dev_rtt_ms": 0
                }
              ],
              "packets_lost": 0,
              "packets_sent": 0,
              "packets_ttl": 0
            }
          ],
          "target_summary": {
            "asn": "",
            "ip": "1.1.1.1",
            "max_latency_ms": 0.034,
            "mean_latency_ms": 0.021,
            "min_latency_ms": 0.014,
            "name": "1.1.1.1",
            "packet_count": 3,
            "std_dev_latency_ms": 0.011269427669584647
          },
          "traceroute_time_ms": 0
        }
      ],
      "target": "1.1.1.1"
    }
  ]
}
```