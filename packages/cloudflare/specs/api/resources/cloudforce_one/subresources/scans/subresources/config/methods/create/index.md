---
title: Create a new Scan Config
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Scans](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans)

[Config](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a new Scan Config

POST/accounts/{account\_id}/cloudforce-one/scans/config

Creates a new scan configuration for Cloudforce One’s network scanning service.

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

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Defines the Account ID.

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

ips: array of string

Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ips%20%3E%20(schema)>)

frequency: optional number

Defines the number of days between each scan (0 = One-off scan).

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20frequency%20%3E%20(schema)>)

ports: optional array of string

Defines a list of ports to scan. Valid values are:“default”, “all”, or a comma-separated list of ports or range of ports (e.g. \[“1-80”, “443”]). “default” scans the 100 most commonly open ports.

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ports%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, account\_id, frequency, 2 more }

</summary>

id: string

Defines the Config ID.

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

frequency: number

Defines the number of days between each scan (0 = One-off scan).

<a href="#">Link to this property</a>

ips: array of string

Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

<a href="#">Link to this property</a>

ports: array of string

Defines a list of ports to scan. Valid values are:“default”, “all”, or a comma-separated list of ports or range of ports (e.g. \[“1-80”, “443”]). “default” scans the 100 most commonly open ports.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a new Scan Config

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/config \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ips": [
            "1.1.1.1",
            "2606:4700:4700::1111"
          ],
          "frequency": 7,
          "ports": [
            "default"
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
    "id": "uuid",
    "account_id": "abcd1234abcd1234abcd1234abcd1234",
    "frequency": 7,
    "ips": [
      "1.1.1.1",
      "2606:4700:4700::1111"
    ],
    "ports": [
      "default"
    ]
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
    "id": "uuid",
    "account_id": "abcd1234abcd1234abcd1234abcd1234",
    "frequency": 7,
    "ips": [
      "1.1.1.1",
      "2606:4700:4700::1111"
    ],
    "ports": [
      "default"
    ]
  }
}
```