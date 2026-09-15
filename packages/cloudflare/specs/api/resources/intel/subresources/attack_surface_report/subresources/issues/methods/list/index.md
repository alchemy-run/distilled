---
title: Retrieves Security Center Issues
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

# Retrieves Security Center Issues

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues

Lists all Security Center issues for the account, showing active security problems requiring attention.

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

dismissed: optional boolean

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20dismissed%20%3E%20(schema)>)

issue\_class: optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20issue_class%20%3E%20(schema)>)

"issue\_class\~neq": optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20issue_class~neq%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20issue_type%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20issue_type~neq%20%3E%20(schema)>)

page: optional number

Specifies the current page within paginated list of results.

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Sets the number of results per page of results.

maximum1000

minimum1

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

product: optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20product%20%3E%20(schema)>)

"product\~neq": optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20product~neq%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20severity%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20severity~neq%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20source%20%3E%20(schema)>)

subject: optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20subject%20%3E%20(schema)>)

"subject\~neq": optional array of string

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20subject~neq%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {count, issues, page, per\_page }

</summary>

count: optional number

Indicates the total number of results.

<a href="#">Link to this property</a>

<details>

<summary>

issues: optional array of object {id, dismissed, has\_extended\_context, 11 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

dismissed: optional boolean

<a href="#">Link to this property</a>

has\_extended\_context: optional boolean

Indicates whether the insight has a large payload that requires fetching via the context endpoint.

<a href="#">Link to this property</a>

issue\_class: optional string

<a href="#">Link to this property</a>

<details>

<summary>

issue\_type: optional <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type%20%3E%20(schema)">IssueType</a>

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

<a href="#">Link to this property</a>

<details>

<summary>

payload: optional object {detection\_method, zone\_tag }

</summary>

detection\_method: optional string

Describes the method used to detect insight.

<a href="#">Link to this property</a>

zone\_tag: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resolve\_link: optional string

<a href="#">Link to this property</a>

resolve\_text: optional string

<a href="#">Link to this property</a>

<details>

<summary>

severity: optional "Low"or "Moderate"or "Critical"

</summary>

One of the following:

"Low"

<a href="#">Link to this property</a>

"Moderate"

<a href="#">Link to this property</a>

"Critical"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

since: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "resolved"

The current status of the insight.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"resolved"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

subject: optional string

<a href="#">Link to this property</a>

timestamp: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

user\_classification: optional "false\_positive"or "accept\_risk"or "other"

User-defined classification for the insight. Can be ‘false\_positive’, ‘accept\_risk’, ‘other’, or null.

</summary>

One of the following:

"false\_positive"

<a href="#">Link to this property</a>

"accept\_risk"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

page: optional number

Specifies the current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Sets the number of results per page of results.

maximum1000

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Retrieves Security Center Issues

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues \
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
    "count": 1,
    "issues": [
      {
        "id": "id",
        "dismissed": false,
        "has_extended_context": false,
        "issue_class": "always_use_https_not_enabled",
        "issue_type": "compliance_violation",
        "payload": {
          "detection_method": "We detected security rules referencing multiple IP addresses directly in the rules.",
          "zone_tag": "zone_tag"
        },
        "resolve_link": "resolve_link",
        "resolve_text": "resolve_text",
        "severity": "Low",
        "since": "2019-12-27T18:11:19.117Z",
        "status": "active",
        "subject": "example.com",
        "timestamp": "2019-12-27T18:11:19.117Z",
        "user_classification": "false_positive"
      }
    ],
    "page": 1,
    "per_page": 25
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
    "count": 1,
    "issues": [
      {
        "id": "id",
        "dismissed": false,
        "has_extended_context": false,
        "issue_class": "always_use_https_not_enabled",
        "issue_type": "compliance_violation",
        "payload": {
          "detection_method": "We detected security rules referencing multiple IP addresses directly in the rules.",
          "zone_tag": "zone_tag"
        },
        "resolve_link": "resolve_link",
        "resolve_text": "resolve_text",
        "severity": "Low",
        "since": "2019-12-27T18:11:19.117Z",
        "status": "active",
        "subject": "example.com",
        "timestamp": "2019-12-27T18:11:19.117Z",
        "user_classification": "false_positive"
      }
    ],
    "page": 1,
    "per_page": 25
  }
}
```