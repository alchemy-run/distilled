---
title: Update Address Map
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[Address Maps](https://developers.cloudflare.com/api/resources/addressing/subresources/address_maps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Address Map

PATCH/accounts/{account\_id}/addressing/address\_maps/{address\_map\_id}

Modify properties of an address map owned by the account.

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

`Address Maps Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier of a Cloudflare account.

maxLength32

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

address\_map\_id: string

Identifier of an Address Map.

maxLength32

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20address_map_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

default\_sni: optional string

If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20default_sni%20%3E%20(schema)>)

description: optional string

An optional description field which may be used to describe the types of IPs or zones on the map.

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

enabled: optional boolean

Whether the Address Map is enabled or not. Cloudflare’s DNS will not respond with IP addresses on an Address Map until the map is enabled.

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

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

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/addressing#(resource)%20addressing.address_maps%20%3E%20(model)%20address_map%20%3E%20(schema)">AddressMap</a> { id, can\_delete, can\_modify\_ips, 5 more }

</summary>

id: optional string

Identifier of an Address Map.

maxLength32

<a href="#">Link to this property</a>

can\_delete: optional boolean

If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

<a href="#">Link to this property</a>

can\_modify\_ips: optional boolean

If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

default\_sni: optional string

If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

<a href="#">Link to this property</a>

description: optional string

An optional description field which may be used to describe the types of IPs or zones on the map.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the Address Map is enabled or not. Cloudflare’s DNS will not respond with IP addresses on an Address Map until the map is enabled.

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.address_maps%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Address Map

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "default_sni": "*.example.com",
          "description": "My Ecommerce zones",
          "enabled": true
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
  "result": {
    "id": "055817b111884e0227e1be16a0be6ee0",
    "can_delete": true,
    "can_modify_ips": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "default_sni": "*.example.com",
    "description": "My Ecommerce zones",
    "enabled": true,
    "modified_at": "2014-01-01T05:20:00.12345Z"
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
  "result": {
    "id": "055817b111884e0227e1be16a0be6ee0",
    "can_delete": true,
    "can_modify_ips": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "default_sni": "*.example.com",
    "description": "My Ecommerce zones",
    "enabled": true,
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```