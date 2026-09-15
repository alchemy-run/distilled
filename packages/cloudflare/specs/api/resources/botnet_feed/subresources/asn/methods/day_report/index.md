---
title: Get daily report
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Botnet Feed](https://developers.cloudflare.com/api/resources/botnet_feed)

[ASN](https://developers.cloudflare.com/api/resources/botnet_feed/subresources/asn)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get daily report

GET/accounts/{account\_id}/botnet\_feed/asn/{asn\_id}/day\_report

Gets all the data the botnet tracking database has for a given ASN registered to user account for given date. If no date is given, it will return results for the previous day.

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

`DDoS Botnet Feed Write``DDoS Botnet Feed Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20botnet_feed.asn%20%3E%20(method)%20day_report%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

asn\_id: number

[Link to this property](#)%20botnet_feed.asn%20%3E%20(method)%20day_report%20%3E%20(params)%20default%20%3E%20(param)%20asn_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

date: optional string

formatdate-time

[Link to this property](#)%20botnet_feed.asn%20%3E%20(method)%20day_report%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

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

[Link to this property](#)%20botnet_feed.asn%20%3E%20(method)%20day_report%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20botnet_feed.asn%20%3E%20(method)%20day_report%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20botnet_feed.asn%20%3E%20(method)%20day_report%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {cidr, date, offense\_count }

</summary>

cidr: optional string

<a href="#">Link to this property</a>

date: optional string

formatdate-time

<a href="#">Link to this property</a>

offense\_count: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20botnet_feed.asn%20%3E%20(method)%20day_report%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get daily report

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/botnet_feed/asn/$ASN_ID/day_report \
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
  "result": {
    "cidr": "1.1.1.1/32",
    "date": "2014-01-01T05:20:00.12345Z",
    "offense_count": 1000
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
    "cidr": "1.1.1.1/32",
    "date": "2014-01-01T05:20:00.12345Z",
    "offense_count": 1000
  }
}
```