---
title: Get Account Custom Nameserver Related Zone Metadata
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

[Custom Nameservers](https://developers.cloudflare.com/api/resources/zones/subresources/custom_nameservers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Account Custom Nameserver Related Zone Metadata

Deprecated: Use \[DNS settings API](https://developers.cloudflare.com/api/resources/dns/subresources/settings/methods/get/) instead.

GET/zones/{zone\_id}/custom\_ns

Get metadata for account-level custom nameservers on a zone.

Deprecated in favor of [Show DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-list-dns-settings).

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

`Trust and Safety Write``Trust and Safety Read``Zero Trust: PII Read``Zaraz Edit``Zaraz Read``Zaraz Admin``Access: Apps and Policies Revoke``Access: Apps and Policies Write``Access: Apps and Policies Read``Access: Apps and Policies Revoke``Access: Mutual TLS Certificates Write``Access: Organizations, Identity Providers, and Groups Write``Zone Settings Write``Zone Settings Read``Zone Read``DNS Read``Workers Scripts Write``Workers Scripts Read``Zone Write``Workers Routes Write``Workers Routes Read``Stream Write``Stream Read``SSL and Certificates Write``SSL and Certificates Read``Logs Write``Logs Read``Cache Purge``Page Rules Write``Page Rules Read``Load Balancers Write``Load Balancers Read``Firewall Services Write``Firewall Services Read``DNS Write``Apps Write``Analytics Read``Access: Apps and Policies Write``Access: Apps and Policies Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(model)%20custom_nameserver_get_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(model)%20custom_nameserver_get_response%20%3E%20(schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(model)%20custom_nameserver_get_response%20%3E%20(schema)%20%3E%20(property)%20success>)

enabled: optional boolean

Whether zone uses account-level custom nameservers.

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(model)%20custom_nameserver_get_response%20%3E%20(schema)%20%3E%20(property)%20enabled>)

ns\_set: optional number

The number of the name server set to assign to the zone.

maximum5

minimum1

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(model)%20custom_nameserver_get_response%20%3E%20(schema)%20%3E%20(property)%20ns_set>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(model)%20custom_nameserver_get_response%20%3E%20(schema)%20%3E%20(property)%20result_info>)

### Get Account Custom Nameserver Related Zone Metadata

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_ns \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "enabled": true,
  "ns_set": 1,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "enabled": true,
  "ns_set": 1,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```