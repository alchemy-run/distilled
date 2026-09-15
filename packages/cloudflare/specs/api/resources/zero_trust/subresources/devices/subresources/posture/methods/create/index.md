---
title: Create a device posture rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a device posture rule

POST/accounts/{account\_id}/devices/posture

Creates a new device posture rule.

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

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

The name of the device posture rule.

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

type: "file"or "application"or "tanium"or 20 more

The type of device posture rule.

</summary>

One of the following:

"file"

<a href="#">Link to this property</a>

"application"

<a href="#">Link to this property</a>

"tanium"

<a href="#">Link to this property</a>

"gateway"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"disk\_encryption"

<a href="#">Link to this property</a>

"serial\_number"

<a href="#">Link to this property</a>

"sentinelone"

<a href="#">Link to this property</a>

"carbonblack"

<a href="#">Link to this property</a>

"firewall"

<a href="#">Link to this property</a>

"os\_version"

<a href="#">Link to this property</a>

"domain\_joined"

<a href="#">Link to this property</a>

"client\_certificate"

<a href="#">Link to this property</a>

"client\_certificate\_v2"

<a href="#">Link to this property</a>

"antivirus"

<a href="#">Link to this property</a>

"unique\_client\_id"

<a href="#">Link to this property</a>

"kolide"

<a href="#">Link to this property</a>

"tanium\_s2s"

<a href="#">Link to this property</a>

"crowdstrike\_s2s"

<a href="#">Link to this property</a>

"intune"

<a href="#">Link to this property</a>

"workspace\_one"

<a href="#">Link to this property</a>

"sentinelone\_s2s"

<a href="#">Link to this property</a>

"custom\_s2s"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

description: optional string

The description of the device posture rule.

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

expiration: optional string

Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expiration%20%3E%20(schema)>)

<details>

<summary>

input: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.posture%20%3E%20(model)%20device_input%20%3E%20(schema)">DeviceInput</a>

The value to be checked against.

</summary>

One of the following:

<details>

<summary>

FileInput object {operating\_system, path, exists, 2 more }

</summary>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: string

File path.

<a href="#">Link to this property</a>

exists: optional boolean

Whether or not file exists.

<a href="#">Link to this property</a>

sha256: optional string

SHA-256.

<a href="#">Link to this property</a>

thumbprint: optional string

Signing certificate thumbprint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

UniqueClientIDInput object {id, operating\_system }

</summary>

id: string

List ID.

<a href="#">Link to this property</a>

<details>

<summary>

operating\_system: "android"or "ios"or "chromeos"

Operating System.

</summary>

One of the following:

"android"

<a href="#">Link to this property</a>

"ios"

<a href="#">Link to this property</a>

"chromeos"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DomainJoinedInput object {operating\_system, domain }

</summary>

operating\_system: "windows"

Operating System.

<a href="#">Link to this property</a>

domain: optional string

Domain.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OSVersionInput object {operating\_system, operator, version, 3 more }

</summary>

operating\_system: "windows"

Operating System.

<a href="#">Link to this property</a>

<details>

<summary>

operator: "&lt;"or "&lt;="or "&gt;"or 2 more

Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: string

Version of OS.

<a href="#">Link to this property</a>

os\_distro\_name: optional string

Operating System Distribution Name (linux only).

<a href="#">Link to this property</a>

os\_distro\_revision: optional string

Version of OS Distribution (linux only).

<a href="#">Link to this property</a>

os\_version\_extra: optional string

Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

FirewallInput object {enabled, operating\_system }

</summary>

enabled: boolean

Enabled.

<a href="#">Link to this property</a>

<details>

<summary>

operating\_system: "windows"or "mac"

Operating System.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SentineloneInput object {operating\_system, path, sha256, thumbprint }

</summary>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: string

File path.

<a href="#">Link to this property</a>

sha256: optional string

SHA-256.

<a href="#">Link to this property</a>

thumbprint: optional string

Signing certificate thumbprint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesCarbonblackInputRequest object {operating\_system, path, sha256, thumbprint }

</summary>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: string

File path.

<a href="#">Link to this property</a>

sha256: optional string

SHA-256.

<a href="#">Link to this property</a>

thumbprint: optional string

Signing certificate thumbprint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesAccessSerialNumberListInputRequest object {id }

</summary>

id: string

UUID of Access List.

maxLength36

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DiskEncryptionInput object {checkDisks, requireAll }

</summary>

checkDisks: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.posture%20%3E%20(model)%20carbonblack_input%20%3E%20(schema)">CarbonblackInput</a>

List of volume names to be checked for encryption.

<a href="#">Link to this property</a>

requireAll: optional boolean

Whether to check all disks for encryption.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesApplicationInputRequest object {operating\_system, path, sha256, thumbprint }

</summary>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: string

Path for the application.

<a href="#">Link to this property</a>

sha256: optional string

SHA-256.

<a href="#">Link to this property</a>

thumbprint: optional string

Signing certificate thumbprint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ClientCertificateInput object {certificate\_id, cn }

</summary>

certificate\_id: string

UUID of Cloudflare managed certificate.

maxLength36

<a href="#">Link to this property</a>

cn: string

Common Name that is protected by the certificate.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesClientCertificateV2InputRequest object {certificate\_id, check\_private\_key, operating\_system, 4 more }

</summary>

certificate\_id: string

UUID of Cloudflare managed certificate.

maxLength36

<a href="#">Link to this property</a>

check\_private\_key: boolean

Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

<a href="#">Link to this property</a>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cn: optional string

Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial\_number} and ${hostname} are valid variables.

<a href="#">Link to this property</a>

<details>

<summary>

extended\_key\_usage: optional array of "clientAuth"or "emailProtection"

List of values indicating purposes for which the certificate public key can be used.

</summary>

One of the following:

"clientAuth"

<a href="#">Link to this property</a>

"emailProtection"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

locations: optional object {paths, trust\_stores }

</summary>

paths: optional array of string

List of paths to check for client certificate on linux.

<a href="#">Link to this property</a>

<details>

<summary>

trust\_stores: optional array of "system"or "user"

List of trust stores to check for client certificate.

</summary>

One of the following:

"system"

<a href="#">Link to this property</a>

"user"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

subject\_alternative\_names: optional array of string

List of certificate Subject Alternative Names.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesAntivirusInputRequest object {update\_window\_days }

</summary>

update\_window\_days: optional number

Number of days that the antivirus should be updated within.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkspaceOneInput object {compliance\_status, connection\_id }

</summary>

<details>

<summary>

compliance\_status: "compliant"or "noncompliant"or "unknown"

Compliance Status.

</summary>

One of the following:

"compliant"

<a href="#">Link to this property</a>

"noncompliant"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CrowdstrikeInput object {connection\_id, last\_seen, operator, 6 more }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

last\_seen: optional string

For more details on last seen, please refer to the Crowdstrike documentation.

<a href="#">Link to this property</a>

<details>

<summary>

operator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

os: optional string

Os Version.

<a href="#">Link to this property</a>

overall: optional string

Overall.

<a href="#">Link to this property</a>

sensor\_config: optional string

SensorConfig.

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "online"or "offline"or "unknown"

For more details on state, please refer to the Crowdstrike documentation.

</summary>

One of the following:

"online"

<a href="#">Link to this property</a>

"offline"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: optional string

Version.

<a href="#">Link to this property</a>

<details>

<summary>

versionOperator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Version Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IntuneInput object {compliance\_status, connection\_id }

</summary>

<details>

<summary>

compliance\_status: "compliant"or "noncompliant"or "unknown"or 3 more

Compliance Status.

</summary>

One of the following:

"compliant"

<a href="#">Link to this property</a>

"noncompliant"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

"notapplicable"

<a href="#">Link to this property</a>

"ingraceperiod"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

KolideInput object {connection\_id, auth\_state, countOperator, issue\_count }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

<details>

<summary>

auth\_state: optional array of "Good"or "Notified"or "Will Block"or "Blocked"

The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

</summary>

One of the following:

"Good"

<a href="#">Link to this property</a>

"Notified"

<a href="#">Link to this property</a>

"Will Block"

<a href="#">Link to this property</a>

"Blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

countOperator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Count Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

issue\_count: optional string

The Number of Issues.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TaniumInput object {connection\_id, eid\_last\_seen, operator, 3 more }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

eid\_last\_seen: optional string

For more details on eid last seen, refer to the Tanium documentation.

<a href="#">Link to this property</a>

<details>

<summary>

operator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Operator to evaluate risk\_level or eid\_last\_seen.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

risk\_level: optional "low"or "medium"or "high"or "critical"

For more details on risk level, refer to the Tanium documentation.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"critical"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scoreOperator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Score Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total\_score: optional number

For more details on total score, refer to the Tanium documentation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SentineloneS2sInput object {connection\_id, active\_threats, infected, 4 more }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

active\_threats: optional number

The Number of active threats.

<a href="#">Link to this property</a>

infected: optional boolean

Whether device is infected.

<a href="#">Link to this property</a>

is\_active: optional boolean

Whether device is active.

<a href="#">Link to this property</a>

<details>

<summary>

network\_status: optional "connected"or "disconnected"or "disconnecting"or "connecting"

Network status of device.

</summary>

One of the following:

"connected"

<a href="#">Link to this property</a>

"disconnected"

<a href="#">Link to this property</a>

"disconnecting"

<a href="#">Link to this property</a>

"connecting"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

operational\_state: optional "na"or "partially\_disabled"or "auto\_fully\_disabled"or 4 more

Agent operational state.

</summary>

One of the following:

"na"

<a href="#">Link to this property</a>

"partially\_disabled"

<a href="#">Link to this property</a>

"auto\_fully\_disabled"

<a href="#">Link to this property</a>

"fully\_disabled"

<a href="#">Link to this property</a>

"auto\_partially\_disabled"

<a href="#">Link to this property</a>

"disabled\_error"

<a href="#">Link to this property</a>

"db\_corruption"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

operator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesCustomS2sInputRequest object {connection\_id, operator, score }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

<details>

<summary>

operator: "&lt;"or "&lt;="or "&gt;"or 2 more

Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

score: number

A value between 0-100 assigned to devices set by the 3rd party posture provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20input%20%3E%20(schema)>)

<details>

<summary>

match: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.posture%20%3E%20(model)%20device_match%20%3E%20(schema)">DeviceMatch</a> { platform }

The conditions that the client must match to run the rule.

</summary>

<details>

<summary>

platform: optional "windows"or "mac"or "linux"or 3 more

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"android"

<a href="#">Link to this property</a>

"ios"

<a href="#">Link to this property</a>

"chromeos"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20match%20%3E%20(schema)>)

schedule: optional string

Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20schedule%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.posture%20%3E%20(model)%20device_posture_rule%20%3E%20(schema)">DevicePostureRule</a> { id, description, enabled, 6 more }

</summary>

id: optional string

API UUID.

maxLength36

<a href="#">Link to this property</a>

description: optional string

The description of the device posture rule.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the rule is enabled. This is a computed, read-only value. It is false for deprecated Kolide posture rules that still use the issue\_count input, and true otherwise.

<a href="#">Link to this property</a>

expiration: optional string

Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

<a href="#">Link to this property</a>

<details>

<summary>

input: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.posture%20%3E%20(model)%20device_input%20%3E%20(schema)">DeviceInput</a>

The value to be checked against.

</summary>

One of the following:

<details>

<summary>

FileInput object {operating\_system, path, exists, 2 more }

</summary>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: string

File path.

<a href="#">Link to this property</a>

exists: optional boolean

Whether or not file exists.

<a href="#">Link to this property</a>

sha256: optional string

SHA-256.

<a href="#">Link to this property</a>

thumbprint: optional string

Signing certificate thumbprint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

UniqueClientIDInput object {id, operating\_system }

</summary>

id: string

List ID.

<a href="#">Link to this property</a>

<details>

<summary>

operating\_system: "android"or "ios"or "chromeos"

Operating System.

</summary>

One of the following:

"android"

<a href="#">Link to this property</a>

"ios"

<a href="#">Link to this property</a>

"chromeos"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DomainJoinedInput object {operating\_system, domain }

</summary>

operating\_system: "windows"

Operating System.

<a href="#">Link to this property</a>

domain: optional string

Domain.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OSVersionInput object {operating\_system, operator, version, 3 more }

</summary>

operating\_system: "windows"

Operating System.

<a href="#">Link to this property</a>

<details>

<summary>

operator: "&lt;"or "&lt;="or "&gt;"or 2 more

Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: string

Version of OS.

<a href="#">Link to this property</a>

os\_distro\_name: optional string

Operating System Distribution Name (linux only).

<a href="#">Link to this property</a>

os\_distro\_revision: optional string

Version of OS Distribution (linux only).

<a href="#">Link to this property</a>

os\_version\_extra: optional string

Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

FirewallInput object {enabled, operating\_system }

</summary>

enabled: boolean

Enabled.

<a href="#">Link to this property</a>

<details>

<summary>

operating\_system: "windows"or "mac"

Operating System.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SentineloneInput object {operating\_system, path, sha256, thumbprint }

</summary>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: string

File path.

<a href="#">Link to this property</a>

sha256: optional string

SHA-256.

<a href="#">Link to this property</a>

thumbprint: optional string

Signing certificate thumbprint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesCarbonblackInputRequest object {operating\_system, path, sha256, thumbprint }

</summary>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: string

File path.

<a href="#">Link to this property</a>

sha256: optional string

SHA-256.

<a href="#">Link to this property</a>

thumbprint: optional string

Signing certificate thumbprint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesAccessSerialNumberListInputRequest object {id }

</summary>

id: string

UUID of Access List.

maxLength36

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DiskEncryptionInput object {checkDisks, requireAll }

</summary>

checkDisks: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.posture%20%3E%20(model)%20carbonblack_input%20%3E%20(schema)">CarbonblackInput</a>

List of volume names to be checked for encryption.

<a href="#">Link to this property</a>

requireAll: optional boolean

Whether to check all disks for encryption.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesApplicationInputRequest object {operating\_system, path, sha256, thumbprint }

</summary>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: string

Path for the application.

<a href="#">Link to this property</a>

sha256: optional string

SHA-256.

<a href="#">Link to this property</a>

thumbprint: optional string

Signing certificate thumbprint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ClientCertificateInput object {certificate\_id, cn }

</summary>

certificate\_id: string

UUID of Cloudflare managed certificate.

maxLength36

<a href="#">Link to this property</a>

cn: string

Common Name that is protected by the certificate.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesClientCertificateV2InputRequest object {certificate\_id, check\_private\_key, operating\_system, 4 more }

</summary>

certificate\_id: string

UUID of Cloudflare managed certificate.

maxLength36

<a href="#">Link to this property</a>

check\_private\_key: boolean

Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

<a href="#">Link to this property</a>

<details>

<summary>

operating\_system: "windows"or "linux"or "mac"

Operating system.

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cn: optional string

Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial\_number} and ${hostname} are valid variables.

<a href="#">Link to this property</a>

<details>

<summary>

extended\_key\_usage: optional array of "clientAuth"or "emailProtection"

List of values indicating purposes for which the certificate public key can be used.

</summary>

One of the following:

"clientAuth"

<a href="#">Link to this property</a>

"emailProtection"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

locations: optional object {paths, trust\_stores }

</summary>

paths: optional array of string

List of paths to check for client certificate on linux.

<a href="#">Link to this property</a>

<details>

<summary>

trust\_stores: optional array of "system"or "user"

List of trust stores to check for client certificate.

</summary>

One of the following:

"system"

<a href="#">Link to this property</a>

"user"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

subject\_alternative\_names: optional array of string

List of certificate Subject Alternative Names.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesAntivirusInputRequest object {update\_window\_days }

</summary>

update\_window\_days: optional number

Number of days that the antivirus should be updated within.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkspaceOneInput object {compliance\_status, connection\_id }

</summary>

<details>

<summary>

compliance\_status: "compliant"or "noncompliant"or "unknown"

Compliance Status.

</summary>

One of the following:

"compliant"

<a href="#">Link to this property</a>

"noncompliant"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CrowdstrikeInput object {connection\_id, last\_seen, operator, 6 more }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

last\_seen: optional string

For more details on last seen, please refer to the Crowdstrike documentation.

<a href="#">Link to this property</a>

<details>

<summary>

operator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

os: optional string

Os Version.

<a href="#">Link to this property</a>

overall: optional string

Overall.

<a href="#">Link to this property</a>

sensor\_config: optional string

SensorConfig.

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "online"or "offline"or "unknown"

For more details on state, please refer to the Crowdstrike documentation.

</summary>

One of the following:

"online"

<a href="#">Link to this property</a>

"offline"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: optional string

Version.

<a href="#">Link to this property</a>

<details>

<summary>

versionOperator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Version Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IntuneInput object {compliance\_status, connection\_id }

</summary>

<details>

<summary>

compliance\_status: "compliant"or "noncompliant"or "unknown"or 3 more

Compliance Status.

</summary>

One of the following:

"compliant"

<a href="#">Link to this property</a>

"noncompliant"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

"notapplicable"

<a href="#">Link to this property</a>

"ingraceperiod"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

KolideInput object {connection\_id, auth\_state, countOperator, issue\_count }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

<details>

<summary>

auth\_state: optional array of "Good"or "Notified"or "Will Block"or "Blocked"

The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

</summary>

One of the following:

"Good"

<a href="#">Link to this property</a>

"Notified"

<a href="#">Link to this property</a>

"Will Block"

<a href="#">Link to this property</a>

"Blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

countOperator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Count Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

issue\_count: optional string

The Number of Issues.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TaniumInput object {connection\_id, eid\_last\_seen, operator, 3 more }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

eid\_last\_seen: optional string

For more details on eid last seen, refer to the Tanium documentation.

<a href="#">Link to this property</a>

<details>

<summary>

operator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Operator to evaluate risk\_level or eid\_last\_seen.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

risk\_level: optional "low"or "medium"or "high"or "critical"

For more details on risk level, refer to the Tanium documentation.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"critical"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scoreOperator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Score Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total\_score: optional number

For more details on total score, refer to the Tanium documentation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SentineloneS2sInput object {connection\_id, active\_threats, infected, 4 more }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

active\_threats: optional number

The Number of active threats.

<a href="#">Link to this property</a>

infected: optional boolean

Whether device is infected.

<a href="#">Link to this property</a>

is\_active: optional boolean

Whether device is active.

<a href="#">Link to this property</a>

<details>

<summary>

network\_status: optional "connected"or "disconnected"or "disconnecting"or "connecting"

Network status of device.

</summary>

One of the following:

"connected"

<a href="#">Link to this property</a>

"disconnected"

<a href="#">Link to this property</a>

"disconnecting"

<a href="#">Link to this property</a>

"connecting"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

operational\_state: optional "na"or "partially\_disabled"or "auto\_fully\_disabled"or 4 more

Agent operational state.

</summary>

One of the following:

"na"

<a href="#">Link to this property</a>

"partially\_disabled"

<a href="#">Link to this property</a>

"auto\_fully\_disabled"

<a href="#">Link to this property</a>

"fully\_disabled"

<a href="#">Link to this property</a>

"auto\_partially\_disabled"

<a href="#">Link to this property</a>

"disabled\_error"

<a href="#">Link to this property</a>

"db\_corruption"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

operator: optional "&lt;"or "&lt;="or "&gt;"or 2 more

Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesCustomS2sInputRequest object {connection\_id, operator, score }

</summary>

connection\_id: string

Posture Integration ID.

<a href="#">Link to this property</a>

<details>

<summary>

operator: "&lt;"or "&lt;="or "&gt;"or 2 more

Operator.

</summary>

One of the following:

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"=="

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

score: number

A value between 0-100 assigned to devices set by the 3rd party posture provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

match: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.posture%20%3E%20(model)%20device_match%20%3E%20(schema)">DeviceMatch</a> { platform }

The conditions that the client must match to run the rule.

</summary>

<details>

<summary>

platform: optional "windows"or "mac"or "linux"or 3 more

</summary>

One of the following:

"windows"

<a href="#">Link to this property</a>

"mac"

<a href="#">Link to this property</a>

"linux"

<a href="#">Link to this property</a>

"android"

<a href="#">Link to this property</a>

"ios"

<a href="#">Link to this property</a>

"chromeos"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

The name of the device posture rule.

<a href="#">Link to this property</a>

schedule: optional string

Polling frequency for the WARP client posture check. Default: <code>5m</code> (poll every five minutes). Minimum: <code>1m</code>.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "file"or "application"or "tanium"or 20 more

The type of device posture rule.

</summary>

One of the following:

"file"

<a href="#">Link to this property</a>

"application"

<a href="#">Link to this property</a>

"tanium"

<a href="#">Link to this property</a>

"gateway"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"disk\_encryption"

<a href="#">Link to this property</a>

"serial\_number"

<a href="#">Link to this property</a>

"sentinelone"

<a href="#">Link to this property</a>

"carbonblack"

<a href="#">Link to this property</a>

"firewall"

<a href="#">Link to this property</a>

"os\_version"

<a href="#">Link to this property</a>

"domain\_joined"

<a href="#">Link to this property</a>

"client\_certificate"

<a href="#">Link to this property</a>

"client\_certificate\_v2"

<a href="#">Link to this property</a>

"antivirus"

<a href="#">Link to this property</a>

"unique\_client\_id"

<a href="#">Link to this property</a>

"kolide"

<a href="#">Link to this property</a>

"tanium\_s2s"

<a href="#">Link to this property</a>

"crowdstrike\_s2s"

<a href="#">Link to this property</a>

"intune"

<a href="#">Link to this property</a>

"workspace\_one"

<a href="#">Link to this property</a>

"sentinelone\_s2s"

<a href="#">Link to this property</a>

"custom\_s2s"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.posture%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create a device posture rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "type": "file",
          "description": "The rule for admin serial numbers",
          "expiration": "1h",
          "input": {
            "operating_system": "linux",
            "path": "/bin/cat",
            "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
          },
          "schedule": "1h"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "The rule for admin serial numbers",
    "enabled": true,
    "expiration": "1h",
    "input": {
      "operating_system": "linux",
      "path": "/bin/cat",
      "exists": true,
      "sha256": "https://api.us-2.crowdstrike.com",
      "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
    },
    "match": [
      {
        "platform": "windows"
      }
    ],
    "name": "Admin Serial Numbers",
    "schedule": "1h",
    "type": "file"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "The rule for admin serial numbers",
    "enabled": true,
    "expiration": "1h",
    "input": {
      "operating_system": "linux",
      "path": "/bin/cat",
      "exists": true,
      "sha256": "https://api.us-2.crowdstrike.com",
      "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
    },
    "match": [
      {
        "platform": "windows"
      }
    ],
    "name": "Admin Serial Numbers",
    "schedule": "1h",
    "type": "file"
  },
  "success": true
}
```