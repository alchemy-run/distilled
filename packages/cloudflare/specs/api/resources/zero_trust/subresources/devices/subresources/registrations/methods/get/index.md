---
title: Get registration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Registrations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/registrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get registration

GET/accounts/{account\_id}/devices/registrations/{registration\_id}

Fetches a single WARP registration.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

registration\_id: string

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20registration_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

include: optional string

Comma-separated list of additional information that should be included in the registration response. Supported values are: “policy”.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20include%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, created\_at, device, 11 more }

A WARP configuration tied to a single user. Multiple registrations can be created from a single WARP device.

</summary>

id: string

The ID of the registration.

<a href="#">Link to this property</a>

created\_at: string

The RFC3339 timestamp when the registration was created.

<a href="#">Link to this property</a>

<details>

<summary>

device: object {id, name, client\_version }

Device details embedded inside of a registration.

</summary>

id: string

The ID of the device.

<a href="#">Link to this property</a>

name: string

The name of the device.

<a href="#">Link to this property</a>

client\_version: optional string

Version of the WARP client.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key: string

The public key used to connect to the Cloudflare network.

<a href="#">Link to this property</a>

last\_seen\_at: string

The RFC3339 timestamp when the registration was last seen.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339 timestamp when the registration was last updated.

<a href="#">Link to this property</a>

deleted\_at: optional string

The RFC3339 timestamp when the registration was deleted.

<a href="#">Link to this property</a>

key\_type: optional string

The type of encryption key used by the WARP client for the active key. Currently ‘curve25519’ for WireGuard and ‘secp256r1’ for MASQUE.

<a href="#">Link to this property</a>

<details>

<summary>

policy: optional object {id, default, deleted, 2 more }

The device settings profile assigned to this registration.

</summary>

id: string

The ID of the device settings profile.

<a href="#">Link to this property</a>

default: boolean

Whether the device settings profile is the default profile for the account.

<a href="#">Link to this property</a>

deleted: boolean

Whether the device settings profile was deleted.

<a href="#">Link to this property</a>

name: string

The name of the device settings profile.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339 timestamp of when the device settings profile last changed for the registration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

revoked\_at: optional string

The RFC3339 timestamp when the registration was revoked.

<a href="#">Link to this property</a>

tunnel\_type: optional string

Type of the tunnel - wireguard or masque.

<a href="#">Link to this property</a>

<details>

<summary>

user: optional object {id, email, name }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

name: optional string

The enrolled device user’s name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

virtual\_ipv4: optional string

The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

<a href="#">Link to this property</a>

virtual\_ipv6: optional string

The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get registration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/$REGISTRATION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
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
  ],
  "result": {
    "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
    "created_at": "2025-02-14T13:17:00Z",
    "device": {
      "id": "32aa0404-78f1-49a4-99e0-97f575081356",
      "name": "My Device",
      "client_version": "1.0.0"
    },
    "key": "U+QTP50RsWfeLGHF4tlGDnmGeuwtsz46KCHr5OyhWq00Rsdfl45mgnQAuEJ6CO0YrkyTl9FUf5iB0bwYR3g4EEFEHhtu6jFaqfMrBMBSz6itv9HQXkaR9OieKQ==",
    "last_seen_at": "2025-02-14T13:17:00Z",
    "updated_at": "2025-02-14T13:17:00Z",
    "deleted_at": "2025-02-14T13:17:00Z",
    "key_type": "secp256r1",
    "policy": {
      "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
      "default": true,
      "deleted": true,
      "name": "name",
      "updated_at": "2025-02-14T13:17:00Z"
    },
    "revoked_at": "2025-02-14T13:17:00Z",
    "tunnel_type": "masque",
    "user": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "user@example.com",
      "name": "John Appleseed"
    },
    "virtual_ipv4": "100.96.0.1",
    "virtual_ipv6": "2606:4700:0cf1:1000::1"
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
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
    "created_at": "2025-02-14T13:17:00Z",
    "device": {
      "id": "32aa0404-78f1-49a4-99e0-97f575081356",
      "name": "My Device",
      "client_version": "1.0.0"
    },
    "key": "U+QTP50RsWfeLGHF4tlGDnmGeuwtsz46KCHr5OyhWq00Rsdfl45mgnQAuEJ6CO0YrkyTl9FUf5iB0bwYR3g4EEFEHhtu6jFaqfMrBMBSz6itv9HQXkaR9OieKQ==",
    "last_seen_at": "2025-02-14T13:17:00Z",
    "updated_at": "2025-02-14T13:17:00Z",
    "deleted_at": "2025-02-14T13:17:00Z",
    "key_type": "secp256r1",
    "policy": {
      "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
      "default": true,
      "deleted": true,
      "name": "name",
      "updated_at": "2025-02-14T13:17:00Z"
    },
    "revoked_at": "2025-02-14T13:17:00Z",
    "tunnel_type": "masque",
    "user": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "user@example.com",
      "name": "John Appleseed"
    },
    "virtual_ipv4": "100.96.0.1",
    "virtual_ipv6": "2606:4700:0cf1:1000::1"
  },
  "success": true
}
```