---
title: Get the latest status of a device.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Fleet Status](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/fleet_status)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get the latest status of a device.

GET/accounts/{account\_id}/dex/devices/{device\_id}/fleet-status/live

Get the latest status of a device given device\_id from the device\_state table.

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

device\_id: string

Unique identifier for the physical device (UUID).

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20device_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

since\_minutes: number

Number of minutes before current time.

maximum60

minimum1

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20since_minutes%20%3E%20(schema)>)

colo: optional string

List of data centers to filter results.

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20colo%20%3E%20(schema)>)

time\_now: optional string

Current time in ISO format.

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20time_now%20%3E%20(schema)>)

##### ReturnsExpand Collapse

colo: string

Cloudflare colo airport code.

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20colo>)

deviceId: string

Device identifier (UUID v4)

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20deviceId>)

mode: string

The mode under which the WARP client is run.

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20mode>)

platform: string

Operating system.

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20platform>)

status: string

Network status.

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20status>)

timestamp: string

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20timestamp>)

version: string

WARP client version.

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20version>)

alwaysOn: optional boolean

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20alwaysOn>)

batteryCharging: optional boolean

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20batteryCharging>)

batteryCycles: optional number

formatint64

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20batteryCycles>)

batteryPct: optional number

formatfloat

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20batteryPct>)

connectionType: optional string

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20connectionType>)

cpuPct: optional number

formatfloat

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20cpuPct>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20cpuPctByApp>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20deviceIpv4>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20deviceIpv6>)

deviceName: optional string

Device identifier (human readable).

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20deviceName>)

DeprecateddeviceRegistration: optional string

Use `registrationId` instead.

Deprecated: use registrationId. Device registration identifier (UUID).

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20deviceRegistration>)

diskReadBps: optional number

formatint64

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20diskReadBps>)

diskUsagePct: optional number

formatfloat

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20diskUsagePct>)

diskWriteBps: optional number

formatint64

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20diskWriteBps>)

dohSubdomain: optional string

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20dohSubdomain>)

estimatedLossPct: optional number

formatfloat

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20estimatedLossPct>)

firewallEnabled: optional boolean

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20firewallEnabled>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20gatewayIpv4>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20gatewayIpv6>)

handshakeLatencyMs: optional number

formatint64

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20handshakeLatencyMs>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20ispIpv4>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20ispIpv6>)

metal: optional string

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20metal>)

networkRcvdBps: optional number

formatint64

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20networkRcvdBps>)

networkSentBps: optional number

formatint64

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20networkSentBps>)

networkSsid: optional string

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20networkSsid>)

personEmail: optional string

User contact email address

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20personEmail>)

ramAvailableKb: optional number

formatint64

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20ramAvailableKb>)

ramUsedPct: optional number

formatfloat

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20ramUsedPct>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20ramUsedPctByApp>)

registrationId: optional string

Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user’s registration on the device.

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20registrationId>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20rtt>)

switchLocked: optional boolean

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20switchLocked>)

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

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20tunnelStats>)

tunnelType: optional string

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20tunnelType>)

wifiStrengthDbm: optional number

formatint64

[Link to this property](#)%20zero_trust.devices.fleet_status%20%3E%20(model)%20fleet_status_get_response%20%3E%20(schema)%20%3E%20(property)%20wifiStrengthDbm>)

### Get the latest status of a device.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/$DEVICE_ID/fleet-status/live \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
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
```

##### Returns Examples

200 example

```
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
```