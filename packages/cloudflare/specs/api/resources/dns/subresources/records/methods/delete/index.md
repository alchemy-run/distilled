---
title: Delete DNS Record
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Records](https://developers.cloudflare.com/api/resources/dns/subresources/records)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete DNS Record

DELETE/zones/{zone\_id}/dns\_records/{dns\_record\_id}

Permanently removes a DNS record from the zone.

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

`DNS Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.records%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

dns\_record\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.records%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20dns_record_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: optional object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete DNS Record

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$DNS_RECORD_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```