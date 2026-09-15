---
title: Get URL Normalization settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[URL Normalization](https://developers.cloudflare.com/api/resources/url_normalization)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get URL Normalization settings

GET/zones/{zone\_id}/url\_normalization

Fetches the current URL Normalization settings.

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

`Response Compression Write``Response Compression Read``Config Settings Write``Config Settings Read``Dynamic URL Redirects Write``Dynamic URL Redirects Read``Cache Settings Write``Cache Settings Read``Custom Errors Write``Custom Errors Read``Origin Write``Origin Read``Managed headers Write``Managed headers Read``Zone Transform Rules Write``Zone Transform Rules Read``Mass URL Redirects Write``Mass URL Redirects Read``Magic Firewall Write``Magic Firewall Read``L4 DDoS Managed Ruleset Write``L4 DDoS Managed Ruleset Read``HTTP DDoS Managed Ruleset Write``HTTP DDoS Managed Ruleset Read``Sanitize Write``Sanitize Read``Transform Rules Write``Transform Rules Read``Select Configuration Write``Select Configuration Read``Bot Management Write``Bot Management Read``Zone WAF Write``Zone WAF Read``Account WAF Write``Account WAF Read``Account Rulesets Read``Account Rulesets Write``Logs Write``Logs Read``Logs Write``Logs Read`

##### P ath ParametersExpand Collapse

zone\_id: string

The unique ID of the zone.

[Link to this property](#)%20url_normalization%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code, source }

A list of error messages.

</summary>

message: string

A text description of this message.

minLength1

<a href="#">Link to this property</a>

code: optional number

A unique code for this message.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

The source of this message.

</summary>

pointer: string

A JSON pointer to the field that is the source of the message.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_normalization%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code, source }

A list of warning messages.

</summary>

message: string

A text description of this message.

minLength1

<a href="#">Link to this property</a>

code: optional number

A unique code for this message.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

The source of this message.

</summary>

pointer: string

A JSON pointer to the field that is the source of the message.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_normalization%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {scope, type }

A result.

</summary>

<details>

<summary>

scope: "incoming"or "both"or "none"

The scope of the URL normalization.

</summary>

One of the following:

"incoming"

<a href="#">Link to this property</a>

"both"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "cloudflare"or "rfc3986"

The type of URL normalization performed by Cloudflare.

</summary>

One of the following:

"cloudflare"

<a href="#">Link to this property</a>

"rfc3986"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_normalization%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20url_normalization%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get URL Normalization settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/url_normalization \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "scope": "incoming",
    "type": "cloudflare"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "scope": "incoming",
    "type": "cloudflare"
  },
  "success": true
}
```