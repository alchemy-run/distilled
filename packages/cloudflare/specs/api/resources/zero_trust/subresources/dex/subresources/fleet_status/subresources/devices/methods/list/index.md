---
title: List details of devices using WARP.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Fleet Status](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List details of devices using WARP.

GET/accounts/{account\_id}/dex/fleet-status/devices

List details of devices using WARP.

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

`Cloudflare DEX Write``Cloudflare DEX Read``Zero Trust Report``Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

from: string

Start of the time range to query. Timestamp can be provided in ISO 8601 datetime format or milliseconds since epoch.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

page: number

Page number of paginated results.

minimum1

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: number

Number of results per page.

maximum50

minimum1

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

to: string

End of the time range to query. Timestamp can be provided in ISO 8601 datetime format or milliseconds since epoch.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

colo: optional string

Cloudflare colo airport code.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20colo%20%3E%20(schema)>)

device\_id: optional string

Device-specific ID, given as UUID.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20device_id%20%3E%20(schema)>)

mode: optional string

The mode under which the WARP client is run.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20mode%20%3E%20(schema)>)

platform: optional string

Operating system.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20platform%20%3E%20(schema)>)

<details>

<summary>

sort\_by: optional "colo"or "device\_id"or "mode"or 4 more

Dimension to sort results by.

</summary>

One of the following:

"colo"

<a href="#">Link to this property</a>

"device\_id"

<a href="#">Link to this property</a>

"mode"

<a href="#">Link to this property</a>

"platform"

<a href="#">Link to this property</a>

"status"

<a href="#">Link to this property</a>

"timestamp"

<a href="#">Link to this property</a>

"version"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

<details>

<summary>

source: optional "last\_seen"or "hourly"or "raw"

Source:

- <code>hourly</code> - device details aggregated hourly, up to 7 days prior
- <code>last_seen</code> - device details, up to 60 minutes prior. Time windows exceeding 60 minutes will be rejected from June 1st, 2026. Please use ‘hourly’ or ‘raw’ instead for longer time ranges.
- <code>raw</code> - device details, up to 7 days prior

</summary>

One of the following:

"last\_seen"

<a href="#">Link to this property</a>

"hourly"

<a href="#">Link to this property</a>

"raw"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20source%20%3E%20(schema)>)

status: optional string

Network status.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

version: optional string

WARP client version.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20version%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {colo, deviceId, mode, 40 more }

</summary>

colo: string

Cloudflare colo airport code.

<a href="#">Link to this property</a>

deviceId: string

Device identifier (UUID v4)

<a href="#">Link to this property</a>

mode: string

The mode under which the WARP client is run.

<a href="#">Link to this property</a>

platform: string

Operating system.

<a href="#">Link to this property</a>

status: string

Network status.

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

version: string

WARP client version.

<a href="#">Link to this property</a>

alwaysOn: optional boolean

<a href="#">Link to this property</a>

batteryCharging: optional boolean

<a href="#">Link to this property</a>

batteryCycles: optional number

formatint64

<a href="#">Link to this property</a>

batteryPct: optional number

formatfloat

<a href="#">Link to this property</a>

connectionType: optional string

<a href="#">Link to this property</a>

cpuPct: optional number

formatfloat

<a href="#">Link to this property</a>

<details>

<summary>

cpuPctByApp: optional array of object {cpu\_pct, name }

</summary>

cpu\_pct: optional number

CPU usage percentage, on a scale of 0 to 100.

formatfloat

maximum100

minimum0

<a href="#">Link to this property</a>

name: optional string

Application name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

deviceIpv4: optional object {address, asn, aso, 4 more }

</summary>

address: optional string

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

country\_iso: optional string

<a href="#">Link to this property</a>

state\_iso: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

netmask: optional string

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

deviceIpv6: optional object {address, asn, aso, 4 more }

</summary>

address: optional string

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

country\_iso: optional string

<a href="#">Link to this property</a>

state\_iso: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

netmask: optional string

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

deviceName: optional string

Device identifier (human readable).

<a href="#">Link to this property</a>

DeprecateddeviceRegistration: optional string

Use <code>registrationId</code> instead.

Deprecated: use registrationId. Device registration identifier (UUID).

<a href="#">Link to this property</a>

diskReadBps: optional number

formatint64

<a href="#">Link to this property</a>

diskUsagePct: optional number

formatfloat

<a href="#">Link to this property</a>

diskWriteBps: optional number

formatint64

<a href="#">Link to this property</a>

dohSubdomain: optional string

<a href="#">Link to this property</a>

estimatedLossPct: optional number

formatfloat

<a href="#">Link to this property</a>

firewallEnabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

gatewayIpv4: optional object {address, asn, aso, 4 more }

</summary>

address: optional string

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

country\_iso: optional string

<a href="#">Link to this property</a>

state\_iso: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

netmask: optional string

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

gatewayIpv6: optional object {address, asn, aso, 4 more }

</summary>

address: optional string

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

country\_iso: optional string

<a href="#">Link to this property</a>

state\_iso: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

netmask: optional string

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

handshakeLatencyMs: optional number

formatint64

<a href="#">Link to this property</a>

<details>

<summary>

ispIpv4: optional object {address, asn, aso, 4 more }

</summary>

address: optional string

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

country\_iso: optional string

<a href="#">Link to this property</a>

state\_iso: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

netmask: optional string

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ispIpv6: optional object {address, asn, aso, 4 more }

</summary>

address: optional string

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

country\_iso: optional string

<a href="#">Link to this property</a>

state\_iso: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

netmask: optional string

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

metal: optional string

<a href="#">Link to this property</a>

networkRcvdBps: optional number

formatint64

<a href="#">Link to this property</a>

networkSentBps: optional number

formatint64

<a href="#">Link to this property</a>

networkSsid: optional string

<a href="#">Link to this property</a>

personEmail: optional string

User contact email address

<a href="#">Link to this property</a>

ramAvailableKb: optional number

formatint64

<a href="#">Link to this property</a>

ramUsedPct: optional number

formatfloat

<a href="#">Link to this property</a>

<details>

<summary>

ramUsedPctByApp: optional array of object {name, ram\_used\_pct }

</summary>

name: optional string

Application name.

<a href="#">Link to this property</a>

ram\_used\_pct: optional number

RAM usage percentage, on a scale of 0 to 100.

formatfloat

maximum100

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registrationId: optional string

Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user’s registration on the device.

<a href="#">Link to this property</a>

<details>

<summary>

rtt: optional object {minRttUs, rttUs, rttVarUs }

Round-trip time statistics for the WARP tunnel.

</summary>

<details>

<summary>

minRttUs: optional object {downstream, upstream }

Minimum round-trip time in microseconds.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rttUs: optional object {downstream, upstream }

Round-trip time in microseconds.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rttVarUs: optional object {downstream, upstream }

Round-trip time variance in microseconds.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

switchLocked: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

tunnelStats: optional object {bytesLost, bytesReceived, bytesRetransmitted, 6 more }

WARP tunnel packet and byte counters.

</summary>

<details>

<summary>

bytesLost: optional object {downstream, upstream }

Number of bytes lost, split by direction.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bytesReceived: optional object {downstream, upstream }

Number of bytes received, split by direction.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bytesRetransmitted: optional object {downstream, upstream }

Number of bytes retransmitted, split by direction.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bytesSent: optional object {downstream, upstream }

Number of bytes sent, split by direction.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

packetsLost: optional object {downstream, upstream }

Number of packets lost, split by direction.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

packetsReceived: optional object {downstream, upstream }

Number of packets received, split by direction.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

packetsRetransmitted: optional object {downstream, upstream }

Number of packets retransmitted, split by direction.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

packetsSent: optional object {downstream, upstream }

Number of packets sent, split by direction.

</summary>

downstream: optional number

<a href="#">Link to this property</a>

upstream: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

statsWindowMs: optional number

The measurement window duration in milliseconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tunnelType: optional string

<a href="#">Link to this property</a>

wifiStrengthDbm: optional number

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List details of devices using WARP.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/fleet-status/devices \
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
  "result": [
    {
      "colo": "SJC",
      "deviceId": "deviceId",
      "mode": "proxy",
      "platform": "windows",
      "status": "connected",
      "timestamp": "2023-10-11 00:00:00+00",
      "version": "1.0.0",
      "alwaysOn": true,
      "batteryCharging": true,
      "batteryCycles": 0,
      "batteryPct": 0,
      "connectionType": "connectionType",
      "cpuPct": 0,
      "cpuPctByApp": [
        {
          "cpu_pct": 0,
          "name": "name"
        }
      ],
      "deviceIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "deviceIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "deviceName": "deviceName",
      "deviceRegistration": "deviceRegistration",
      "diskReadBps": 0,
      "diskUsagePct": 0,
      "diskWriteBps": 0,
      "dohSubdomain": "dohSubdomain",
      "estimatedLossPct": 0,
      "firewallEnabled": true,
      "gatewayIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "gatewayIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "handshakeLatencyMs": 0,
      "ispIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "ispIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "metal": "metal",
      "networkRcvdBps": 0,
      "networkSentBps": 0,
      "networkSsid": "networkSsid",
      "personEmail": "personEmail",
      "ramAvailableKb": 0,
      "ramUsedPct": 0,
      "ramUsedPctByApp": [
        {
          "name": "name",
          "ram_used_pct": 0
        }
      ],
      "registrationId": "registrationId",
      "rtt": {
        "minRttUs": {
          "downstream": 0,
          "upstream": 0
        },
        "rttUs": {
          "downstream": 0,
          "upstream": 0
        },
        "rttVarUs": {
          "downstream": 0,
          "upstream": 0
        }
      },
      "switchLocked": true,
      "tunnelStats": {
        "bytesLost": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesReceived": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesRetransmitted": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesSent": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsLost": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsReceived": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsRetransmitted": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsSent": {
          "downstream": 0,
          "upstream": 0
        },
        "statsWindowMs": 0
      },
      "tunnelType": "tunnelType",
      "wifiStrengthDbm": 0
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
      "colo": "SJC",
      "deviceId": "deviceId",
      "mode": "proxy",
      "platform": "windows",
      "status": "connected",
      "timestamp": "2023-10-11 00:00:00+00",
      "version": "1.0.0",
      "alwaysOn": true,
      "batteryCharging": true,
      "batteryCycles": 0,
      "batteryPct": 0,
      "connectionType": "connectionType",
      "cpuPct": 0,
      "cpuPctByApp": [
        {
          "cpu_pct": 0,
          "name": "name"
        }
      ],
      "deviceIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "deviceIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "deviceName": "deviceName",
      "deviceRegistration": "deviceRegistration",
      "diskReadBps": 0,
      "diskUsagePct": 0,
      "diskWriteBps": 0,
      "dohSubdomain": "dohSubdomain",
      "estimatedLossPct": 0,
      "firewallEnabled": true,
      "gatewayIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "gatewayIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "handshakeLatencyMs": 0,
      "ispIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "ispIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "metal": "metal",
      "networkRcvdBps": 0,
      "networkSentBps": 0,
      "networkSsid": "networkSsid",
      "personEmail": "personEmail",
      "ramAvailableKb": 0,
      "ramUsedPct": 0,
      "ramUsedPctByApp": [
        {
          "name": "name",
          "ram_used_pct": 0
        }
      ],
      "registrationId": "registrationId",
      "rtt": {
        "minRttUs": {
          "downstream": 0,
          "upstream": 0
        },
        "rttUs": {
          "downstream": 0,
          "upstream": 0
        },
        "rttVarUs": {
          "downstream": 0,
          "upstream": 0
        }
      },
      "switchLocked": true,
      "tunnelStats": {
        "bytesLost": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesReceived": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesRetransmitted": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesSent": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsLost": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsReceived": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsRetransmitted": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsSent": {
          "downstream": 0,
          "upstream": 0
        },
        "statsWindowMs": 0
      },
      "tunnelType": "tunnelType",
      "wifiStrengthDbm": 0
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```