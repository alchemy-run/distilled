---
title: Fleet Status
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fleet Status

##### [Get live aggregate device details by dimension](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/methods/live)

GET/accounts/{account\_id}/dex/fleet-status/live

##### [Get over time aggregate details for devices by dimension](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/methods/over_time)

GET/accounts/{account\_id}/dex/fleet-status/over-time

##### ModelsExpand Collapse

<details>

<summary>

LiveStat object {uniqueDevicesTotal, value }

</summary>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(model)%20live_stat%20%3E%20(schema)>)

<details>

<summary>

FleetStatusLiveResponse object {deviceStats }

</summary>

<details>

<summary>

deviceStats: optional object {byColo, byMode, byPlatform, 3 more }

</summary>

<details>

<summary>

byColo: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.fleet_status%20%3E%20(model)%20live_stat%20%3E%20(schema)">LiveStat</a> { uniqueDevicesTotal, value }

</summary>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

byMode: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.fleet_status%20%3E%20(model)%20live_stat%20%3E%20(schema)">LiveStat</a> { uniqueDevicesTotal, value }

</summary>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

byPlatform: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.fleet_status%20%3E%20(model)%20live_stat%20%3E%20(schema)">LiveStat</a> { uniqueDevicesTotal, value }

</summary>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

byStatus: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.fleet_status%20%3E%20(model)%20live_stat%20%3E%20(schema)">LiveStat</a> { uniqueDevicesTotal, value }

</summary>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

byVersion: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.fleet_status%20%3E%20(model)%20live_stat%20%3E%20(schema)">LiveStat</a> { uniqueDevicesTotal, value }

</summary>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(model)%20fleet_status_live_response%20%3E%20(schema)>)

<details>

<summary>

FleetStatusOverTimeResponse object {deviceStats }

</summary>

<details>

<summary>

deviceStats: optional object {byMode, byStatus, uniqueDevicesTotal }

</summary>

<details>

<summary>

byMode: optional array of object {timestamp, uniqueDevicesTotal, value }

</summary>

timestamp: optional string

<a href="#">Link to this property</a>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

byStatus: optional array of object {timestamp, uniqueDevicesTotal, value }

</summary>

timestamp: optional string

<a href="#">Link to this property</a>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(model)%20fleet_status_over_time_response%20%3E%20(schema)>)

#### Fleet StatusDevices

##### [List details of devices using WARP.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices/methods/list)

GET/accounts/{account\_id}/dex/fleet-status/devices

##### ModelsExpand Collapse

<details>

<summary>

DeviceListResponse object {colo, deviceId, mode, 40 more }

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

[Link to this property](#)%20zero_trust.dex.fleet_status.devices%20%3E%20(model)%20device_list_response%20%3E%20(schema)>)