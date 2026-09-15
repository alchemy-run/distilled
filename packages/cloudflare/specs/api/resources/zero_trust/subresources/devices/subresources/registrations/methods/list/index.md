---
title: List registrations
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

# List registrations

GET/accounts/{account\_id}/devices/registrations

Lists WARP registrations.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional array of string

Filter by registration ID.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

cursor: optional string

Opaque token indicating the starting position when requesting the next set of records. A cursor value can be obtained from the result\_info.cursor field in the response.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

device: optional object {id }

</summary>

id: optional string

Filter by WARP device ID.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20device%20%3E%20(schema)>)

include: optional string

Comma-separated list of additional information that should be included in the registration response. Supported values are: “policy”.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include%20%3E%20(schema)>)

per\_page: optional number

The maximum number of devices to return in a single response.

formatuint64

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

policy: optional object {id }

</summary>

id: optional string

Filter by the ID of the device settings profile assigned to the registration.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20policy%20%3E%20(schema)>)

search: optional string

Filter by registration details.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

seen\_after: optional string

Filter by the last\_seen timestamp - returns only registrations last seen after this timestamp.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20seen_after%20%3E%20(schema)>)

seen\_before: optional string

Filter by the last\_seen timestamp - returns only registrations last seen before this timestamp.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20seen_before%20%3E%20(schema)>)

<details>

<summary>

sort\_by: optional "id"or "user.name"or "user.email"or 2 more

The registration field to order results by.

</summary>

One of the following:

"id"

<a href="#">Link to this property</a>

"user.name"

<a href="#">Link to this property</a>

"user.email"

<a href="#">Link to this property</a>

"last\_seen\_at"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "asc"or "desc"

Sort direction.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

<details>

<summary>

status: optional "active"or "all"or "revoked"

Filter by registration status. Defaults to ‘active’.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

"revoked"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

<details>

<summary>

user: optional object {id }

</summary>

id: optional array of string

Filter by user ID.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20user%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, created\_at, device, 11 more }

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

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, cursor, per\_page, total\_count }

V4 public API Pagination/Cursor info.

</summary>

count: number

Number of records in the response.

<a href="#">Link to this property</a>

cursor: string

Opaque token to request the next set of records.

<a href="#">Link to this property</a>

per\_page: number

The limit for the number of records in the response.

<a href="#">Link to this property</a>

total\_count: optional number

Total number of records available.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List registrations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "created_at": "2025-02-14T13:17:00Z",
      "deleted_at": null,
      "device": {
        "client_version": "1.0.0",
        "id": "32aa0404-78f1-49a4-99e0-97f575081356",
        "name": "My Device"
      },
      "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
      "key": "U+QTP50RsWfeLGHF4tlGDnmGeuwtsz46KCHr5OyhWq00Rsdfl45mgnQAuEJ6CO0YrkyTl9FUf5iB0bwYR3g4EEFEHhtu6jFaqfMrBMBSz6itv9HQXkaR9OieKQ==",
      "key_type": "secp256r1",
      "last_seen_at": "2025-02-14T13:17:00Z",
      "revoked_at": null,
      "tunnel_type": "masque",
      "updated_at": "2025-02-14T13:17:00Z",
      "user": {
        "email": "alice@example.org",
        "id": "30323c1f-318d-4ec9-92c7-5a8c4d25c4fc",
        "name": "Alice"
      }
    },
    {
      "created_at": "2025-02-15T10:20:00Z",
      "deleted_at": null,
      "device": {
        "client_version": "1.0.1",
        "id": "43bb1515-8902-50b5-aa01-a88686192467",
        "name": "Bob's Laptop"
      },
      "id": "22eedc7a-4a1d-5417-c5b3-f73a983c277b",
      "key": "V/RSP61StXgfmLHJG5umHEonHfvxtz57LDIs6PziXr11Stegm56nhrRBvFK7DP1ZsLzUm0GVg6jC1cxZS4h5FFGFJiju7kGbrgNsCNCT77juw0IRYlS0QpjgLR==",
      "key_type": "secp256r1",
      "last_seen_at": "2025-02-15T10:25:00Z",
      "revoked_at": null,
      "tunnel_type": "masque",
      "updated_at": "2025-02-15T10:25:00Z",
      "user": {
        "email": "bob@example.com",
        "id": "41434d2a-429e-5fd0-a3d8-6b9d5e36d5ad",
        "name": "Bob"
      }
    }
  ],
  "result_info": {
    "count": 2,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "created_at": "2025-02-14T13:17:00Z",
      "deleted_at": null,
      "device": {
        "client_version": "1.0.0",
        "id": "32aa0404-78f1-49a4-99e0-97f575081356",
        "name": "My Device"
      },
      "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
      "key": "U+QTP50RsWfeLGHF4tlGDnmGeuwtsz46KCHr5OyhWq00Rsdfl45mgnQAuEJ6CO0YrkyTl9FUf5iB0bwYR3g4EEFEHhtu6jFaqfMrBMBSz6itv9HQXkaR9OieKQ==",
      "key_type": "secp256r1",
      "last_seen_at": "2025-02-14T13:17:00Z",
      "revoked_at": null,
      "tunnel_type": "masque",
      "updated_at": "2025-02-14T13:17:00Z",
      "user": {
        "email": "alice@example.org",
        "id": "30323c1f-318d-4ec9-92c7-5a8c4d25c4fc",
        "name": "Alice"
      }
    },
    {
      "created_at": "2025-02-15T10:20:00Z",
      "deleted_at": null,
      "device": {
        "client_version": "1.0.1",
        "id": "43bb1515-8902-50b5-aa01-a88686192467",
        "name": "Bob's Laptop"
      },
      "id": "22eedc7a-4a1d-5417-c5b3-f73a983c277b",
      "key": "V/RSP61StXgfmLHJG5umHEonHfvxtz57LDIs6PziXr11Stegm56nhrRBvFK7DP1ZsLzUm0GVg6jC1cxZS4h5FFGFJiju7kGbrgNsCNCT77juw0IRYlS0QpjgLR==",
      "key_type": "secp256r1",
      "last_seen_at": "2025-02-15T10:25:00Z",
      "revoked_at": null,
      "tunnel_type": "masque",
      "updated_at": "2025-02-15T10:25:00Z",
      "user": {
        "email": "bob@example.com",
        "id": "41434d2a-429e-5fd0-a3d8-6b9d5e36d5ad",
        "name": "Bob"
      }
    }
  ],
  "result_info": {
    "count": 2,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  },
  "success": true
}
```