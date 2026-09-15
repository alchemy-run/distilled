---
title: Unrevoke registrations
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

# Unrevoke registrations

POST/accounts/{account\_id}/devices/registrations/unrevoke

Unrevokes a list of WARP registrations.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20unrevoke%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: array of string

A list of registration IDs to unrevoke.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20unrevoke%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20unrevoke%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20unrevoke%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

result: unknown

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20unrevoke%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20unrevoke%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20zero_trust.devices.registrations%20%3E%20(method)%20unrevoke%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Unrevoke registrations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/unrevoke \
    -X POST \
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
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
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
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```