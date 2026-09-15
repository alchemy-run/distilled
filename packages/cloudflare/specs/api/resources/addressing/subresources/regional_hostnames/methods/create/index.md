---
title: Create Regional Hostname
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[Regional Hostnames](https://developers.cloudflare.com/api/resources/addressing/subresources/regional_hostnames)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Regional Hostname

POST/zones/{zone\_id}/addressing/regional\_hostnames

Create a new Regional Hostname entry. Cloudflare will only use data centers that are physically located within the chosen region to decrypt and service HTTPS traffic. Learn more about [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/get-started/).

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

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

hostname: string

DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20hostname%20%3E%20(schema)>)

region\_key: string

Identifying key for the region

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20region_key%20%3E%20(schema)>)

routing: optional string

Configure which routing method to use for the regional hostname

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20routing%20%3E%20(schema)>)

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

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {created\_on, hostname, region\_key, routing }

</summary>

created\_on: string

When the regional hostname was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g <code>*.example.com</code>

<a href="#">Link to this property</a>

region\_key: string

Identifying key for the region

<a href="#">Link to this property</a>

routing: string

Configure which routing method to use for the regional hostname

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create Regional Hostname

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "foo.example.com",
          "region_key": "ca",
          "routing": "dns"
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
    "created_on": "2014-01-01T05:20:00.12345Z",
    "hostname": "foo.example.com",
    "region_key": "ca",
    "routing": "dns"
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
    "created_on": "2014-01-01T05:20:00.12345Z",
    "hostname": "foo.example.com",
    "region_key": "ca",
    "routing": "dns"
  }
}
```