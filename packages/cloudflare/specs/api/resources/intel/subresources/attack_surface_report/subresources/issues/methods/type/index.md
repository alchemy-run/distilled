---
title: Retrieves Security Center Issue Counts by Type
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Attack Surface Report](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report)

[Issues](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Retrieves Security Center Issue Counts by Type

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues/type

Retrieves Security Center issue counts aggregated by issue type.

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

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

dismissed: optional boolean

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20dismissed%20%3E%20(schema)>)

issue\_class: optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20issue_class%20%3E%20(schema)>)

"issue\_class\~neq": optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20issue_class~neq%20%3E%20(schema)>)

<details>

<summary>

issue\_type: optional array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type%20%3E%20(schema)">IssueType</a>

</summary>

One of the following:

"compliance\_violation"

<a href="#">Link to this property</a>

"email\_security"

<a href="#">Link to this property</a>

"exposed\_infrastructure"

<a href="#">Link to this property</a>

"insecure\_configuration"

<a href="#">Link to this property</a>

"weak\_authentication"

<a href="#">Link to this property</a>

"configuration\_suggestion"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20issue_type%20%3E%20(schema)>)

<details>

<summary>

"issue\_type\~neq": optional array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type%20%3E%20(schema)">IssueType</a>

</summary>

One of the following:

"compliance\_violation"

<a href="#">Link to this property</a>

"email\_security"

<a href="#">Link to this property</a>

"exposed\_infrastructure"

<a href="#">Link to this property</a>

"insecure\_configuration"

<a href="#">Link to this property</a>

"weak\_authentication"

<a href="#">Link to this property</a>

"configuration\_suggestion"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20issue_type~neq%20%3E%20(schema)>)

product: optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20product%20%3E%20(schema)>)

"product\~neq": optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20product~neq%20%3E%20(schema)>)

<details>

<summary>

severity: optional array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.attack_surface_report.issues%20%3E%20(model)%20severity_query_param%20%3E%20(schema)">SeverityQueryParam</a>

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"moderate"

<a href="#">Link to this property</a>

"critical"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20severity%20%3E%20(schema)>)

<details>

<summary>

"severity\~neq": optional array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.attack_surface_report.issues%20%3E%20(model)%20severity_query_param%20%3E%20(schema)">SeverityQueryParam</a>

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"moderate"

<a href="#">Link to this property</a>

"critical"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20severity~neq%20%3E%20(schema)>)

<details>

<summary>

source: optional array of "cloudflare"or "riskrecon"

</summary>

One of the following:

"cloudflare"

<a href="#">Link to this property</a>

"riskrecon"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20source%20%3E%20(schema)>)

subject: optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20subject%20%3E%20(schema)>)

"subject\~neq": optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(params)%20default%20%3E%20(param)%20subject~neq%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20type%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Retrieves Security Center Issue Counts by Type

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues/type \
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
  "result": [
    {
      "count": 1,
      "value": "value"
    }
  ]
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
  "result": [
    {
      "count": 1,
      "value": "value"
    }
  ]
}
```