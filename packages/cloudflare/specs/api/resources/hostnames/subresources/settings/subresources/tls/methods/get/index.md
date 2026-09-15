---
title: Get TLS setting for hostname
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Hostnames](https://developers.cloudflare.com/api/resources/hostnames)

[Settings](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings)

[TLS](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get TLS setting for hostname

GET/zones/{zone\_id}/hostnames/settings/{setting\_id}/{hostname}

Get the requested TLS setting for the hostname.

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

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

<details>

<summary>

setting\_id: "ciphers"or "min\_tls\_version"or "http2"

The TLS Setting name. The value type depends on the setting:

- <code>ciphers</code>: value is an array of cipher suite strings (e.g., <code>["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]</code>).
- <code>min_tls_version</code>: value is a TLS version string (<code>"1.0"</code>, <code>"1.1"</code>, <code>"1.2"</code>, or <code>"1.3"</code>).
- <code>http2</code>: value is <code>"on"</code> or <code>"off"</code>.

</summary>

One of the following:

"ciphers"

<a href="#">Link to this property</a>

"min\_tls\_version"

<a href="#">Link to this property</a>

"http2"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20setting_id%20%3E%20(schema)>)

hostname: string

The hostname for which the tls settings are set.

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20hostname%20%3E%20(schema)>)

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

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/hostnames#(resource)%20hostnames.settings.tls%20%3E%20(model)%20setting%20%3E%20(schema)">Setting</a> { created\_at, hostname, status, 2 more }

</summary>

created\_at: optional string

This is the time the tls setting was originally created for this hostname.

formatdate-time

<a href="#">Link to this property</a>

hostname: optional string

The hostname for which the tls settings are set.

<a href="#">Link to this property</a>

status: optional string

Deployment status for the given tls setting.

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the tls setting was updated.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: optional <a href="https://developers.cloudflare.com/api/resources/hostnames#(resource)%20hostnames.settings.tls%20%3E%20(model)%20setting_value%20%3E%20(schema)">SettingValue</a>

The TLS setting value. The type depends on the <code>setting_id</code> used in the request path:

- <code>ciphers</code>: an array of allowed cipher suite strings in BoringSSL format (e.g., <code>["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]</code>).
- <code>min_tls_version</code>: a string indicating the minimum TLS version — one of <code>"1.0"</code>, <code>"1.1"</code>, <code>"1.2"</code>, or <code>"1.3"</code> (e.g., <code>"1.2"</code>).
- <code>http2</code>: a string indicating whether HTTP/2 is enabled — <code>"on"</code> or <code>"off"</code> (e.g., <code>"on"</code>).

</summary>

One of the following:

<details>

<summary>

"1.0"or "1.1"or "1.2"or 3 more

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

array of string

Used when <code>setting_id</code> is <code>ciphers</code>. An array of allowed cipher suite strings.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get TLS setting for hostname

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hostnames/settings/$SETTING_ID/$HOSTNAME \
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
    "created_at": "2023-07-10T20:01:50.219171Z",
    "hostname": "app.example.com",
    "status": "pending_deployment",
    "updated_at": "2023-07-10T20:01:50.219171Z",
    "value": [
      "ECDHE-RSA-AES128-GCM-SHA256",
      "AES128-GCM-SHA256"
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
    "created_at": "2023-07-10T20:01:50.219171Z",
    "hostname": "app.example.com",
    "status": "pending_deployment",
    "updated_at": "2023-07-10T20:01:50.219171Z",
    "value": [
      "ECDHE-RSA-AES128-GCM-SHA256",
      "AES128-GCM-SHA256"
    ]
  }
}
```