---
title: Get IP address details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Entities](https://developers.cloudflare.com/api/resources/radar/subresources/entities)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get IP address details

GET/radar/entities/ip

Retrieves IP address information.

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

`User Details Write``User Details Read`

##### Q uery ParametersExpand Collapse

ip: string

IP address.

formatip

[Link to this property](#)%20radar.entities%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20ip%20%3E%20(schema)>)

<details>

<summary>

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {ip }

</summary>

<details>

<summary>

ip: object {asn, asnLocation, asnName, 5 more }

</summary>

asn: string

<a href="#">Link to this property</a>

asnLocation: string

<a href="#">Link to this property</a>

asnName: string

<a href="#">Link to this property</a>

asnOrgName: string

<a href="#">Link to this property</a>

ip: string

<a href="#">Link to this property</a>

ipVersion: string

<a href="#">Link to this property</a>

location: string

<a href="#">Link to this property</a>

locationName: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.entities%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get IP address details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/entities/ip \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "ip": {
      "asn": "15169",
      "asnLocation": "US",
      "asnName": "GOOGLE",
      "asnOrgName": "Google LLC",
      "ip": "8.8.8.8",
      "ipVersion": "IPv4",
      "location": "GB",
      "locationName": "United Kingdom"
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "ip": {
      "asn": "15169",
      "asnLocation": "US",
      "asnName": "GOOGLE",
      "asnOrgName": "Google LLC",
      "ip": "8.8.8.8",
      "ipVersion": "IPv4",
      "location": "GB",
      "locationName": "United Kingdom"
    }
  },
  "success": true
}
```