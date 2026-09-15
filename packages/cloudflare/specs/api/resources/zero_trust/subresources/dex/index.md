---
title: DEX
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# DEX

##### ModelsExpand Collapse

<details>

<summary>

DigitalExperienceMonitor object {id, default, name }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

default: boolean

Whether the policy is the default for the account.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex%20%3E%20(model)%20digital_experience_monitor%20%3E%20(schema)>)

<details>

<summary>

NetworkPath object {slots, sampling }

</summary>

<details>

<summary>

slots: array of object {id, clientToAppRttMs, clientToCfEgressRttMs, 3 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

clientToAppRttMs: number

Round trip time in ms of the client to app mile

<a href="#">Link to this property</a>

clientToCfEgressRttMs: number

Round trip time in ms of the client to Cloudflare egress mile

<a href="#">Link to this property</a>

clientToCfIngressRttMs: number

Round trip time in ms of the client to Cloudflare ingress mile

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

clientToIspRttMs: optional number

Round trip time in ms of the client to ISP mile

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sampling: optional object {unit, value }

Specifies the sampling applied, if any, to the slots response. When sampled, results shown represent the first test run to the start of each sampling interval.

</summary>

unit: "hours"

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex%20%3E%20(model)%20network_path%20%3E%20(schema)>)

<details>

<summary>

NetworkPathResponse object {id, deviceName, interval, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

deviceName: optional string

Name of the device that ran the test.

<a href="#">Link to this property</a>

interval: optional string

The interval at which the Traceroute synthetic application test is set to run.

<a href="#">Link to this property</a>

kind: optional "traceroute"

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

networkPath: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20network_path%20%3E%20(schema)">NetworkPath</a> { slots, sampling }

<a href="#">Link to this property</a>

url: optional string

The host of the Traceroute synthetic application test.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex%20%3E%20(model)%20network_path_response%20%3E%20(schema)>)

<details>

<summary>

Percentiles object {p50, p90, p95, p99 }

</summary>

p50: optional number

p50 observed in the time period.

<a href="#">Link to this property</a>

p90: optional number

p90 observed in the time period.

<a href="#">Link to this property</a>

p95: optional number

p95 observed in the time period.

<a href="#">Link to this property</a>

p99: optional number

p99 observed in the time period.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)>)

#### DEXWARP Change Events

##### [List WARP change events.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/warp_change_events/methods/get)

GET/accounts/{account\_id}/dex/warp-change-events

##### ModelsExpand Collapse

<details>

<summary>

WARPChangeEventGetResponse = array of object {account\_name, account\_tag, device\_id, 7 more } or object {device\_id, device\_registration, from, 6 more }

</summary>

One of the following:

<details>

<summary>

DigitalExperienceMonitoringWARPToggleChangeEvent object {account\_name, account\_tag, device\_id, 7 more }

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

<a href="#">Link to this property</a>

device\_id: optional string

The device ID.

maxLength36

<a href="#">Link to this property</a>

Deprecateddevice\_registration: optional string

Use <code>registration_id</code> instead.

Deprecated: use registration\_id. The device registration ID.

maxLength36

<a href="#">Link to this property</a>

hostname: optional string

The hostname of the machine the event is from.

<a href="#">Link to this property</a>

registration\_id: optional string

The device registration ID.

maxLength36

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number of the machine the event is from.

<a href="#">Link to this property</a>

timestamp: optional string

The event time.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

toggle: optional "on"or "off"

The state of the WARP toggle.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_email: optional string

Email tied to the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DigitalExperienceMonitoringWARPConfigChangeEvent object {device\_id, device\_registration, from, 6 more }

</summary>

device\_id: optional string

The device ID.

maxLength36

<a href="#">Link to this property</a>

Deprecateddevice\_registration: optional string

Use <code>registration_id</code> instead.

Deprecated: use registration\_id. The device registration ID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

from: optional object {account\_name, account\_tag, config\_name }

The details for the WARP configuration that was switched from.

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

maxLength36

<a href="#">Link to this property</a>

config\_name: optional string

The name of the WARP configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hostname: optional string

The hostname of the machine the event is from.

<a href="#">Link to this property</a>

registration\_id: optional string

The device registration ID.

maxLength36

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number of the machine the event is from.

<a href="#">Link to this property</a>

timestamp: optional string

The event time.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

to: optional object {account\_name, account\_tag, config\_name }

The details for the WARP configuration that was switched to.

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

maxLength36

<a href="#">Link to this property</a>

config\_name: optional string

The name of the WARP configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_email: optional string

Email tied to the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(model)%20warp_change_event_get_response%20%3E%20(schema)>)

#### DEXCommands

##### [List account commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/methods/list)

GET/accounts/{account\_id}/dex/commands

##### [Create account commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/methods/create)

POST/accounts/{account\_id}/dex/commands

##### ModelsExpand Collapse

<details>

<summary>

CommandListResponse object {commands }

</summary>

<details>

<summary>

commands: optional array of object {id, completed\_date, created\_date, 6 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

completed\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

device\_id: optional string

<a href="#">Link to this property</a>

filename: optional string

<a href="#">Link to this property</a>

registration\_id: optional string

Unique identifier for the device registration

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

user\_email: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(model)%20command_list_response%20%3E%20(schema)>)

<details>

<summary>

CommandCreateResponse object {commands }

</summary>

<details>

<summary>

commands: optional array of object {id, args, device\_id, 3 more }

List of created commands

</summary>

id: optional string

Unique identifier for the command

<a href="#">Link to this property</a>

args: optional map\[string]

Command arguments

<a href="#">Link to this property</a>

device\_id: optional string

Identifier for the device associated with the command

<a href="#">Link to this property</a>

registration\_id: optional string

Unique identifier for the device registration

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING\_EXEC"or "PENDING\_UPLOAD"or "SUCCESS"or "FAILED"

Current status of the command

</summary>

One of the following:

"PENDING\_EXEC"

<a href="#">Link to this property</a>

"PENDING\_UPLOAD"

<a href="#">Link to this property</a>

"SUCCESS"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional string

Type of the command (e.g., “pcap”, “speed-test”, or “warp-diag”)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(model)%20command_create_response%20%3E%20(schema)>)

#### DEXCommandsDevices

##### [List devices eligible for remote captures](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/devices/methods/list)

GET/accounts/{account\_id}/dex/commands/devices

##### ModelsExpand Collapse

<details>

<summary>

DeviceListResponse object {devices }

</summary>

<details>

<summary>

devices: optional array of object {deviceId, deviceName, eligible, 7 more }

List of eligible devices

</summary>

deviceId: optional string

Device identifier (UUID v4)

<a href="#">Link to this property</a>

deviceName: optional string

Device identifier (human readable)

<a href="#">Link to this property</a>

eligible: optional boolean

Whether the device is eligible for remote captures

<a href="#">Link to this property</a>

ineligibleReason: optional string

If the device is not eligible, the reason why.

<a href="#">Link to this property</a>

personEmail: optional string

User contact email address

<a href="#">Link to this property</a>

platform: optional string

Operating system.

<a href="#">Link to this property</a>

registrationId: optional string

Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user’s registration on the device.

<a href="#">Link to this property</a>

status: optional string

Network status.

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

version: optional string

WARP client version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(model)%20device_list_response%20%3E%20(schema)>)

#### DEXCommandsDownloads

##### [Download command output file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/downloads/methods/get)

GET/accounts/{account\_id}/dex/commands/{command\_id}/downloads/{filename}

#### DEXCommandsQuota

##### [Returns account commands usage, quota, and reset time](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/quota/methods/get)

GET/accounts/{account\_id}/dex/commands/quota

##### ModelsExpand Collapse

<details>

<summary>

QuotaGetResponse object {quota, quota\_usage, reset\_time }

</summary>

quota: number

The total number of commands that can be initiated for an account.

<a href="#">Link to this property</a>

quota\_usage: number

The number of commands that have been initiated for an account.

<a href="#">Link to this property</a>

reset\_time: string

The time when the quota resets.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands.quota%20%3E%20(model)%20quota_get_response%20%3E%20(schema)>)

#### DEXColos

##### [List Cloudflare colos](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/colos/methods/list)

GET/accounts/{account\_id}/dex/colos

##### ModelsExpand Collapse

<details>

<summary>

ColoListResponse object {airportCode, city, countryCode }

</summary>

airportCode: string

Airport code

<a href="#">Link to this property</a>

city: string

City

<a href="#">Link to this property</a>

countryCode: string

Country code

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.colos%20%3E%20(model)%20colo_list_response%20%3E%20(schema)>)

#### DEXFleet Status

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

#### DEXFleet StatusDevices

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

#### DEXHTTP Tests

##### [Get details and aggregate metrics for an http test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/http_tests/methods/get)

GET/accounts/{account\_id}/dex/http-tests/{test\_id}

##### ModelsExpand Collapse

<details>

<summary>

HTTPDetails object {host, httpStats, httpStatsByColo, 6 more }

</summary>

host: optional string

The url of the HTTP synthetic application test.

<a href="#">Link to this property</a>

<details>

<summary>

httpStats: optional object {availabilityPct, dnsResponseTimeMs, httpStatusCode, 3 more }

</summary>

<details>

<summary>

availabilityPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dnsResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

<details>

<summary>

httpStatusCode: array of object {status200, status300, status400, 2 more }

</summary>

status200: number

<a href="#">Link to this property</a>

status300: number

<a href="#">Link to this property</a>

status400: number

<a href="#">Link to this property</a>

status500: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resourceFetchTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

serverResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

uniqueDevicesTotal: number

Count of unique devices that have run this test in the given time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

httpStatsByColo: optional array of object {availabilityPct, colo, dnsResponseTimeMs, 4 more }

</summary>

<details>

<summary>

availabilityPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

colo: string

<a href="#">Link to this property</a>

dnsResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

<details>

<summary>

httpStatusCode: array of object {status200, status300, status400, 2 more }

</summary>

status200: number

<a href="#">Link to this property</a>

status300: number

<a href="#">Link to this property</a>

status400: number

<a href="#">Link to this property</a>

status500: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resourceFetchTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

serverResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

uniqueDevicesTotal: number

Count of unique devices that have run this test in the given time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

The interval at which the HTTP synthetic application test is set to run.

<a href="#">Link to this property</a>

kind: optional "http"

<a href="#">Link to this property</a>

method: optional string

The HTTP method to use when running the test.

<a href="#">Link to this property</a>

name: optional string

The name of the HTTP synthetic application test.

<a href="#">Link to this property</a>

<details>

<summary>

target\_policies: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20digital_experience_monitor%20%3E%20(schema)">DigitalExperienceMonitor</a> { id, default, name }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

default: boolean

Whether the policy is the default for the account.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

targeted: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(model)%20http_details%20%3E%20(schema)>)

#### DEXHTTP TestsPercentiles

##### [Get percentiles for an http test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/http_tests/subresources/percentiles/methods/get)

GET/accounts/{account\_id}/dex/http-tests/{test\_id}/percentiles

##### ModelsExpand Collapse

<details>

<summary>

HTTPDetailsPercentiles object {dnsResponseTimeMs, resourceFetchTimeMs, serverResponseTimeMs }

</summary>

dnsResponseTimeMs: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

resourceFetchTimeMs: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

serverResponseTimeMs: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20http_details_percentiles%20%3E%20(schema)>)

<details>

<summary>

TestStatOverTime object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)>)

#### DEXTests

##### [List DEX test analytics](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/tests/methods/list)

GET/accounts/{account\_id}/dex/tests/overview

##### ModelsExpand Collapse

<details>

<summary>

AggregateTimePeriod object {units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)>)

<details>

<summary>

Tests object {overviewMetrics, tests }

</summary>

<details>

<summary>

overviewMetrics: object {testsTotal, avgHttpAvailabilityPct, avgTracerouteAvailabilityPct }

</summary>

testsTotal: number

number of tests.

<a href="#">Link to this property</a>

avgHttpAvailabilityPct: optional number

percentage availability for all HTTP test results in response.

formatfloat

<a href="#">Link to this property</a>

avgTracerouteAvailabilityPct: optional number

percentage availability for all traceroutes results in response.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tests: array of object {id, created, description, 13 more }

array of test results objects.

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created: string

date the test was created.

<a href="#">Link to this property</a>

description: string

the test description defined during configuration

<a href="#">Link to this property</a>

enabled: boolean

if true, then the test will run on targeted devices. Else, the test will not run.

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

interval: string

The interval at which the synthetic application test is set to run.

<a href="#">Link to this property</a>

<details>

<summary>

kind: "http"or "traceroute"

test type, http or traceroute

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"traceroute"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

name given to this test

<a href="#">Link to this property</a>

updated: string

<a href="#">Link to this property</a>

<details>

<summary>

httpResults: optional object {resourceFetchTime }

</summary>

<details>

<summary>

resourceFetchTime: object {history, avgMs, overTime }

</summary>

<details>

<summary>

history: array of object {timePeriod, avgMs, deltaPct }

</summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

deltaPct: optional number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

overTime: optional object {timePeriod, values }

</summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

<a href="#">Link to this property</a>

<details>

<summary>

values: array of object {avgMs, timestamp }

</summary>

avgMs: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

httpResultsByColo: optional array of object {colo, resourceFetchTime }

</summary>

colo: string

Cloudflare colo

<a href="#">Link to this property</a>

<details>

<summary>

resourceFetchTime: object {history, avgMs, overTime }

</summary>

<details>

<summary>

history: array of object {timePeriod, avgMs, deltaPct }

</summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

deltaPct: optional number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

overTime: optional object {timePeriod, values }

</summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

<a href="#">Link to this property</a>

<details>

<summary>

values: array of object {avgMs, timestamp }

</summary>

avgMs: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

method: optional string

for HTTP, the method to use when running the test

<a href="#">Link to this property</a>

<details>

<summary>

target\_policies: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20digital_experience_monitor%20%3E%20(schema)">DigitalExperienceMonitor</a> { id, default, name }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

default: boolean

Whether the policy is the default for the account.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

targeted: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

tracerouteResults: optional object {roundTripTime }

</summary>

<details>

<summary>

roundTripTime: object {history, avgMs, overTime }

</summary>

<details>

<summary>

history: array of object {timePeriod, avgMs, deltaPct }

</summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

deltaPct: optional number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

overTime: optional object {timePeriod, values }

</summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

<a href="#">Link to this property</a>

<details>

<summary>

values: array of object {avgMs, timestamp }

</summary>

avgMs: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tracerouteResultsByColo: optional array of object {colo, roundTripTime }

</summary>

colo: string

Cloudflare colo

<a href="#">Link to this property</a>

<details>

<summary>

roundTripTime: object {history, avgMs, overTime }

</summary>

<details>

<summary>

history: array of object {timePeriod, avgMs, deltaPct }

</summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

deltaPct: optional number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

overTime: optional object {timePeriod, values }

</summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

<a href="#">Link to this property</a>

<details>

<summary>

values: array of object {avgMs, timestamp }

</summary>

avgMs: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(model)%20tests%20%3E%20(schema)>)

#### DEXTestsUnique Devices

##### [Get count of devices targeted](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/tests/subresources/unique_devices/methods/list)

GET/accounts/{account\_id}/dex/tests/unique-devices

##### ModelsExpand Collapse

<details>

<summary>

UniqueDevices object {uniqueDevicesTotal }

</summary>

uniqueDevicesTotal: number

total number of unique devices

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.tests.unique_devices%20%3E%20(model)%20unique_devices%20%3E%20(schema)>)

#### DEXTraceroute Test Results

#### DEXTraceroute Test ResultsNetwork Path

##### [Get details for a specific traceroute test run](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/traceroute_test_results/subresources/network_path/methods/get)

GET/accounts/{account\_id}/dex/traceroute-test-results/{test\_result\_id}/network-path

##### ModelsExpand Collapse

<details>

<summary>

NetworkPathGetResponse object {hops, resultId, colo, 6 more }

</summary>

<details>

<summary>

hops: array of object {ttl, asn, aso, 6 more }

An array of the hops taken by the device to reach the end destination.

</summary>

ttl: number

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

ipAddress: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, state, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

state: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mile: optional "client-to-app"or "client-to-cf-egress"or "client-to-cf-ingress"or "client-to-isp"

</summary>

One of the following:

"client-to-app"

<a href="#">Link to this property</a>

"client-to-cf-egress"

<a href="#">Link to this property</a>

"client-to-cf-ingress"

<a href="#">Link to this property</a>

"client-to-isp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

packetLossPct: optional number

formatfloat

<a href="#">Link to this property</a>

rttMs: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resultId: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

colo: optional string

Cloudflare colo airport code.

<a href="#">Link to this property</a>

deviceName: optional string

Name of the device associated with this network path response.

<a href="#">Link to this property</a>

<details>

<summary>

execution\_context: optional "EXECUTION\_CONTEXT\_INVALID"or "OUT\_OF\_TUNNEL"or "IN\_TUNNEL"

Whether the test was run inside or outside of the WARP tunnel.

</summary>

One of the following:

"EXECUTION\_CONTEXT\_INVALID"

<a href="#">Link to this property</a>

"OUT\_OF\_TUNNEL"

<a href="#">Link to this property</a>

"IN\_TUNNEL"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

testId: optional string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

testName: optional string

Name of the traceroute test.

<a href="#">Link to this property</a>

time\_start: optional string

Timestamp indicating when the traceroute test execution began.

<a href="#">Link to this property</a>

tunnel\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.traceroute_test_results.network_path%20%3E%20(model)%20network_path_get_response%20%3E%20(schema)>)

#### DEXTraceroute Tests

##### [Get details and aggregate metrics for a traceroute test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/traceroute_tests/methods/get)

GET/accounts/{account\_id}/dex/traceroute-tests/{test\_id}

##### [Get percentiles for a traceroute test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/traceroute_tests/methods/percentiles)

GET/accounts/{account\_id}/dex/traceroute-tests/{test\_id}/percentiles

##### [Get network path breakdown for a traceroute test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/traceroute_tests/methods/network_path)

GET/accounts/{account\_id}/dex/traceroute-tests/{test\_id}/network-path

##### ModelsExpand Collapse

<details>

<summary>

Traceroute object {host, interval, kind, 5 more }

</summary>

host: string

The host of the Traceroute synthetic application test.

<a href="#">Link to this property</a>

interval: string

The interval at which the Traceroute synthetic application test is set to run.

<a href="#">Link to this property</a>

kind: "traceroute"

<a href="#">Link to this property</a>

name: string

The name of the Traceroute synthetic application test.

<a href="#">Link to this property</a>

<details>

<summary>

target\_policies: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20digital_experience_monitor%20%3E%20(schema)">DigitalExperienceMonitor</a> { id, default, name }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

default: boolean

Whether the policy is the default for the account.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

targeted: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

tracerouteStats: optional object {availabilityPct, hopsCount, packetLossPct, 2 more }

</summary>

<details>

<summary>

availabilityPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hopsCount: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

<details>

<summary>

packetLossPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

roundTripTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

uniqueDevicesTotal: number

Count of unique devices that have run this test in the given time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tracerouteStatsByColo: optional array of object {availabilityPct, colo, hopsCount, 3 more }

</summary>

<details>

<summary>

availabilityPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

colo: string

<a href="#">Link to this property</a>

hopsCount: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

<details>

<summary>

packetLossPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

roundTripTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

uniqueDevicesTotal: number

Count of unique devices that have run this test in the given time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(model)%20traceroute%20%3E%20(schema)>)

<details>

<summary>

TracerouteTestPercentilesResponse object {hopsCount, packetLossPct, roundTripTimeMs }

</summary>

hopsCount: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

packetLossPct: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

roundTripTimeMs: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(model)%20traceroute_test_percentiles_response%20%3E%20(schema)>)

#### DEXRules

##### [Get DEX Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/get)

GET/accounts/{account\_id}/dex/rules/{rule\_id}

##### [Delete a DEX Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/delete)

DELETE/accounts/{account\_id}/dex/rules/{rule\_id}

##### [Update a DEX Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/update)

PATCH/accounts/{account\_id}/dex/rules/{rule\_id}

##### [Create a DEX Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/create)

POST/accounts/{account\_id}/dex/rules

##### [List DEX Rules](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/list)

GET/accounts/{account\_id}/dex/rules

##### ModelsExpand Collapse

<details>

<summary>

RuleGetResponse object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_get_response%20%3E%20(schema)>)

RuleDeleteResponse = boolean

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_delete_response%20%3E%20(schema)>)

<details>

<summary>

RuleUpdateResponse object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_update_response%20%3E%20(schema)>)

<details>

<summary>

RuleCreateResponse object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_create_response%20%3E%20(schema)>)

<details>

<summary>

RuleListResponse object {rules }

</summary>

<details>

<summary>

rules: optional array of object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_list_response%20%3E%20(schema)>)

#### DEXDevices

#### DEXDevicesISPs

##### [List device ISPs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/devices/subresources/isps/methods/list)

GET/accounts/{account\_id}/dex/devices/{device\_id}/isps

##### ModelsExpand Collapse

<details>

<summary>

ISPs object {isps }

</summary>

<details>

<summary>

isps: array of object {test\_id, test\_result\_id, time\_start, ip }

</summary>

test\_id: string

The test that generated this result.

<a href="#">Link to this property</a>

test\_result\_id: string

The specific test result.

<a href="#">Link to this property</a>

time\_start: string

Timestamp of when the ISP was observed.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ip: optional object {address, asn, aso, 4 more }

IP address information for the ISP hop. Fields marked as PII-gated (<code>name</code>, <code>address</code>, <code>netmask</code>, and all <code>location</code> sub-fields) will be returned as the literal string <code>"REDACTED"</code> for callers that do not have the PII permission. <code>asn</code>, <code>aso</code>, and <code>version</code> are always returned regardless of PII access.

</summary>

address: optional string

IP address. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

asn: optional number

Autonomous System Number.

<a href="#">Link to this property</a>

aso: optional string

Autonomous System Organization name.

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

Geographic location information. All fields are returned as the literal string <code>"REDACTED"</code> for callers that do not have the PII permission.

</summary>

city: optional string

City name. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

country\_iso: optional string

Country ISO code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

state\_iso: optional string

State/province ISO code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

zip: optional string

ZIP/postal code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Named IP address (reverse DNS hostname when available). Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

netmask: optional string

Network mask. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(model)%20isps%20%3E%20(schema)>)