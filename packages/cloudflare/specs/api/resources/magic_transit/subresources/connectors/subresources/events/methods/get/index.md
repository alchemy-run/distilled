---
title: Get Event
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Connectors](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors)

[Events](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Event

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/events/{event\_t}.{event\_n}

Gets Magic WAN Connector Telemetry Event

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

`Magic WAN Write``Magic WAN Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier

maxLength32

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

connector\_id: string

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20connector_id%20%3E%20(schema)>)

event\_t: number

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20event_t%20%3E%20(schema)>)

event\_n: number

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20event_n%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {e, n, t, v }

Recorded Event

</summary>

<details>

<summary>

e: object {k }

Event kind plus event-specific payload fields.

Event kinds:

- <code>Init</code>: Initialized process
- <code>Leave</code>: Stopped process
- <code>StartAttestation</code>: Started attestation
- <code>FinishAttestationSuccess</code>: Finished attestation
- <code>FinishAttestationFailure</code>: Failed attestation
- <code>StartRotateCryptKey</code>: Started crypt key rotation
- <code>FinishRotateCryptKeySuccess</code>: Finished crypt key rotation
- <code>FinishRotateCryptKeyFailure</code>: Failed crypt key rotation
- <code>StartRotatePki</code>: Started PKI rotation
- <code>FinishRotatePkiSuccess</code>: Finished PKI rotation
- <code>FinishRotatePkiFailure</code>: Failed PKI rotation
- <code>StartUpgrade</code>: Started upgrade
- <code>FinishUpgradeSuccess</code>: Finished upgrade
- <code>FinishUpgradeFailure</code>: Failed upgrade
- <code>BlessSlotSuccess</code>: Blessed boot entry slot
- <code>BlessSlotPending</code>: Boot entry slot is not yet blessed
- <code>BlessSlotFailure</code>: Failed to bless boot entry slot
- <code>Reconcile</code>: Reconciled
- <code>ConfigureCloudflaredTunnel</code>: Configured Cloudflared tunnel
- <code>RekeyInstallBoth</code>: Installed initial inbound and outbound keys
- <code>RekeyStart</code>: Installed new inbound key, kept old outbound
- <code>RekeyRestart</code>: Restarted in-progress rekey with newer key material
- <code>RekeyAdvance</code>: Confirmed traffic on new inbound key, swapped outbound to new
- <code>RekeyComplete</code>: Deleted old keys
- <code>RekeyReset</code>: Deleted all keys after receiving an unexpected key
- <code>HaTransition</code>: Completed HA state transition
- <code>HaError</code>: Received unexpected HA error
- <code>HaInit</code>: Initialized HA subsystem
- <code>HaLeave</code>: Stopped HA subsystem

</summary>

<details>

<summary>

k: "Init"or "Leave"or "StartAttestation"or 26 more

Event kind

</summary>

One of the following:

"Init"

<a href="#">Link to this property</a>

"Leave"

<a href="#">Link to this property</a>

"StartAttestation"

<a href="#">Link to this property</a>

"FinishAttestationSuccess"

<a href="#">Link to this property</a>

"FinishAttestationFailure"

<a href="#">Link to this property</a>

"StartRotateCryptKey"

<a href="#">Link to this property</a>

"FinishRotateCryptKeySuccess"

<a href="#">Link to this property</a>

"FinishRotateCryptKeyFailure"

<a href="#">Link to this property</a>

"StartRotatePki"

<a href="#">Link to this property</a>

"FinishRotatePkiSuccess"

<a href="#">Link to this property</a>

"FinishRotatePkiFailure"

<a href="#">Link to this property</a>

"StartUpgrade"

<a href="#">Link to this property</a>

"FinishUpgradeSuccess"

<a href="#">Link to this property</a>

"FinishUpgradeFailure"

<a href="#">Link to this property</a>

"BlessSlotSuccess"

<a href="#">Link to this property</a>

"BlessSlotPending"

<a href="#">Link to this property</a>

"BlessSlotFailure"

<a href="#">Link to this property</a>

"Reconcile"

<a href="#">Link to this property</a>

"ConfigureCloudflaredTunnel"

<a href="#">Link to this property</a>

"RekeyInstallBoth"

<a href="#">Link to this property</a>

"RekeyStart"

<a href="#">Link to this property</a>

"RekeyRestart"

<a href="#">Link to this property</a>

"RekeyAdvance"

<a href="#">Link to this property</a>

"RekeyComplete"

<a href="#">Link to this property</a>

"RekeyReset"

<a href="#">Link to this property</a>

"HaTransition"

<a href="#">Link to this property</a>

"HaError"

<a href="#">Link to this property</a>

"HaInit"

<a href="#">Link to this property</a>

"HaLeave"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

n: number

Sequence number, used to order events with the same timestamp

<a href="#">Link to this property</a>

t: number

Time the Event was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

v: optional string

Version

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### Get Event

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/events/$EVENT_T.$EVENT_N \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "e": {
      "k": "Init"
    },
    "n": 0,
    "t": 0,
    "v": "v"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "e": {
      "k": "Init"
    },
    "n": 0,
    "t": 0,
    "v": "v"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```