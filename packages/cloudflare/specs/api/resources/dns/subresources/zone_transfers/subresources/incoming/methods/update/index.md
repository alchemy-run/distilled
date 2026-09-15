---
title: Update Secondary Zone Configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers)

[Incoming](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/incoming)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Secondary Zone Configuration

PUT/zones/{zone\_id}/secondary\_dns/incoming

Update secondary zone configuration for incoming zone transfers.

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

`Zone Settings Write``Zone Write``DNS Write`

##### P ath ParametersExpand Collapse

zone\_id: string

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

auto\_refresh\_seconds: number

How often should a secondary zone auto refresh regardless of DNS NOTIFY. Not applicable for primary zones.

minimum300

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20auto_refresh_seconds%20%3E%20(schema)>)

name: string

Zone name.

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

peers: array of string

A list of peer tags.

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20peers%20%3E%20(schema)>)

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

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, auto\_refresh\_seconds, checked\_time, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

auto\_refresh\_seconds: optional number

How often should a secondary zone auto refresh regardless of DNS NOTIFY. Not applicable for primary zones.

minimum300

<a href="#">Link to this property</a>

checked\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

created\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

modified\_time: optional string

The time for a specific event.

<a href="#">Link to this property</a>

name: optional string

Zone name.

<a href="#">Link to this property</a>

peers: optional array of string

A list of peer tags.

<a href="#">Link to this property</a>

soa\_serial: optional number

The serial number of the SOA for the given zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.incoming%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Secondary Zone Configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/incoming \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auto_refresh_seconds": 86400,
          "name": "www.example.com.",
          "peers": [
            "23ff594956f20c2a721606e94745a8aa",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ]
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
    "id": "269d8f4853475ca241c4e730be286b20",
    "auto_refresh_seconds": 86400,
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "modified_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
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
    "id": "269d8f4853475ca241c4e730be286b20",
    "auto_refresh_seconds": 86400,
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "modified_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
  }
}
```