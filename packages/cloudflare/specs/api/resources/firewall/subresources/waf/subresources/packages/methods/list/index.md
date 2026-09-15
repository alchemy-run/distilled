---
title: List WAF packages
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[WAF](https://developers.cloudflare.com/api/resources/firewall/subresources/waf)

[Packages](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List WAF packages

Deprecated

GET/zones/{zone\_id}/firewall/waf/packages

Fetches WAF packages for a zone.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

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

`Firewall Services Write``Firewall Services Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

The direction used to sort returned packages.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

<details>

<summary>

match: optional "any"or "all"

When set to <code>all</code>, all the search requirements must match. When set to <code>any</code>, only one of the search requirements has to match.

</summary>

One of the following:

"any"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20match%20%3E%20(schema)>)

name: optional string

The name of the WAF package.

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

order: optional "name"

The field used to sort returned packages.

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

The page number of paginated results.

minimum1

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

The number of packages per page.

maximum100

minimum5

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

FirewallAPIResponseCollection object {errors, messages, result, 2 more }

</summary>

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

<a href="#">Link to this property</a>

result: array of unknown

<a href="#">Link to this property</a>

success: true

Defines whether the API call was successful.

<a href="#">Link to this property</a>

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Defines the total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Defines the current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Defines the number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Defines the total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(variant)%200>)

<details>

<summary>

Result object {result }

</summary>

<details>

<summary>

result: optional array of object {id, description, detection\_mode, 3 more } or object {id, description, detection\_mode, 5 more }

</summary>

One of the following:

<details>

<summary>

FirewallPackageDefinition object {id, description, detection\_mode, 3 more }

</summary>

id: string

Defines an identifier.

maxLength32

<a href="#">Link to this property</a>

description: string

A summary of the purpose/function of the WAF package.

<a href="#">Link to this property</a>

<details>

<summary>

detection\_mode: "anomaly"or "traditional"

The mode that defines how rules within the package are evaluated during the course of a request. When a package uses anomaly detection mode (<code>anomaly</code> value), each rule is given a score when triggered. If the total score of all triggered rules exceeds the sensitivity defined in the WAF package, the action configured in the package will be performed. Traditional detection mode (<code>traditional</code> value) will decide the action to take when it is triggered by the request. If multiple rules are triggered, the action providing the highest protection will be applied (for example, a ‘block’ action will win over a ‘challenge’ action).

</summary>

One of the following:

"anomaly"

<a href="#">Link to this property</a>

"traditional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the WAF package.

<a href="#">Link to this property</a>

zone\_id: string

Defines an identifier.

maxLength32

<a href="#">Link to this property</a>

status: optional "active"

When set to <code>active</code>, indicates that the WAF package will be applied to the zone.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

FirewallAnomalyPackage object {id, description, detection\_mode, 5 more }

</summary>

id: string

Defines an identifier.

maxLength32

<a href="#">Link to this property</a>

description: string

A summary of the purpose/function of the WAF package.

<a href="#">Link to this property</a>

<details>

<summary>

detection\_mode: "anomaly"or "traditional"

When a WAF package uses anomaly detection, each rule is given a score when triggered. If the total score of all triggered rules exceeds the sensitivity defined on the WAF package, the action defined on the package will be taken.

</summary>

One of the following:

"anomaly"

<a href="#">Link to this property</a>

"traditional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the WAF package.

<a href="#">Link to this property</a>

zone\_id: string

Defines an identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action\_mode: optional "simulate"or "block"or "challenge"

The default action performed by the rules in the WAF package.

</summary>

One of the following:

"simulate"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sensitivity: optional "high"or "medium"or "low"or "off"

The sensitivity of the WAF package.

</summary>

One of the following:

"high"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"low"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

status: optional "active"

When set to <code>active</code>, indicates that the WAF package will be applied to the zone.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(variant)%201>)

### List WAF packages

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages \
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
  "result": [
    {}
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
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
  "result": [
    {}
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```