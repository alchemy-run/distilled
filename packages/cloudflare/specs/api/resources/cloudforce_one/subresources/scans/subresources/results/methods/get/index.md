---
title: Get the Latest Scan Result
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Scans](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans)

[Results](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/results)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get the Latest Scan Result

GET/accounts/{account\_id}/cloudforce-one/scans/results/{config\_id}

Retrieves the latest scan results for a Cloudforce One scan configuration, including discovered open ports.

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

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Defines the Account ID.

[Link to this property](#)%20cloudforce_one.scans.results%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

config\_id: string

Defines the Config ID.

[Link to this property](#)%20cloudforce_one.scans.results%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20config_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of string

[Link to this property](#)%20cloudforce_one.scans.results%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20cloudforce_one.scans.results%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {"1.1.1.1" }

</summary>

<details>

<summary>

"1.1.1.1": array of <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.scans.results%20%3E%20(model)%20scan_result%20%3E%20(schema)">ScanResult</a> { number, proto, status }

</summary>

number: optional number

<a href="#">Link to this property</a>

proto: optional string

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.results%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20cloudforce_one.scans.results%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get the Latest Scan Result

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/results/$CONFIG_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    "string"
  ],
  "messages": [
    "string"
  ],
  "result": {
    "1.1.1.1": [
      {
        "number": 8080,
        "proto": "tcp",
        "status": "open"
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    "string"
  ],
  "messages": [
    "string"
  ],
  "result": {
    "1.1.1.1": [
      {
        "number": 8080,
        "proto": "tcp",
        "status": "open"
      }
    ]
  },
  "success": true
}
```