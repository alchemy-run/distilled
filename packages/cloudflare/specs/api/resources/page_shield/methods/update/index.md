---
title: Update client-side security settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update client-side security settings

PUT/zones/{zone\_id}/page\_shield

Updates client-side security enablement and reporting behaviors for the zone.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Page Shield``Domain Page Shield``Zone Settings Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

enabled: optional boolean

When true, indicates that Client-Side Security is enabled.

[Link to this property](#)%20page_shield%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

use\_cloudflare\_reporting\_endpoint: optional boolean

When true, CSP reports will be sent to [https://csp-reporting.cloudflare.com/cdn-cgi/script\_monitor/report](https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report)

[Link to this property](#)%20page_shield%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20use_cloudflare_reporting_endpoint%20%3E%20(schema)>)

use\_connection\_url\_path: optional boolean

When true, the paths associated with connections URLs will also be analyzed.

[Link to this property](#)%20page_shield%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20use_connection_url_path%20%3E%20(schema)>)

##### ReturnsExpand Collapse

success: true

Whether the API call was successful

[Link to this property](#)%20page_shield%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional object {enabled, updated\_at, use\_cloudflare\_reporting\_endpoint, use\_connection\_url\_path }

</summary>

enabled: boolean

When true, indicates that Client-Side Security is enabled.

<a href="#">Link to this property</a>

updated\_at: string

The timestamp of when Client-Side Security was last updated.

<a href="#">Link to this property</a>

use\_cloudflare\_reporting\_endpoint: boolean

When true, CSP reports will be sent to <a href="https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report">https://csp-reporting.cloudflare.com/cdn-cgi/script\_monitor/report</a>

<a href="#">Link to this property</a>

use\_connection\_url\_path: boolean

When true, the paths associated with connections URLs will also be analyzed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update client-side security settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "enabled": true,
          "use_cloudflare_reporting_endpoint": true,
          "use_connection_url_path": true
        }'
```

200 example

```
{
  "success": true,
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
  "result": {
    "enabled": true,
    "updated_at": "2022-10-12T17:56:52.083582+01:00",
    "use_cloudflare_reporting_endpoint": true,
    "use_connection_url_path": true
  }
}
```

##### Returns Examples

200 example

```
{
  "success": true,
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
  "result": {
    "enabled": true,
    "updated_at": "2022-10-12T17:56:52.083582+01:00",
    "use_cloudflare_reporting_endpoint": true,
    "use_connection_url_path": true
  }
}
```