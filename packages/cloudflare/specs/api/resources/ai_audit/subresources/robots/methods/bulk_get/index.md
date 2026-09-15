---
title: Bulk get robots.txt rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Audit](https://developers.cloudflare.com/api/resources/ai_audit)

[Robots](https://developers.cloudflare.com/api/resources/ai_audit/subresources/robots)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bulk get robots.txt rules

POST/zones/{zone\_id}/ai-audit/robots/bulk

Fetches and parses robots.txt files for multiple domains within a zone in a single request. Each domain must belong to the specified zone. Results are keyed by hostname.

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

`Zone Settings Write``Zone Settings Read`

##### P ath ParametersExpand Collapse

zone\_id: string

[Link to this property](#)%20ai_audit.robots%20%3E%20(method)%20bulk_get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

body: array of string

Array of domain hostnames to fetch robots.txt for. Each domain must end with the zone name. Maximum 25 domains per request.

[Link to this property](#)%20ai_audit.robots%20%3E%20(method)%20bulk_get%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20ai_audit.robots%20%3E%20(method)%20bulk_get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20ai_audit.robots%20%3E%20(method)%20bulk_get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20ai_audit.robots%20%3E%20(method)%20bulk_get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional map\[object {userAgents, sitemaps, status } ]

Map of hostname to parsed robots.txt rules.

</summary>

<details>

<summary>

userAgents: map\[object {allow, disallow, contentSignals, crawlDelay } ]

Map of user-agent string to its parsed rules.

</summary>

allow: array of string

List of allowed path patterns.

<a href="#">Link to this property</a>

disallow: array of string

List of disallowed path patterns.

<a href="#">Link to this property</a>

<details>

<summary>

contentSignals: optional object {"ai-input", "ai-train", search }

Content signal directives from robots.txt.

</summary>

<details>

<summary>

"ai-input": optional "yes"or "no"

Whether AI input usage is permitted.

</summary>

One of the following:

"yes"

<a href="#">Link to this property</a>

"no"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"ai-train": optional "yes"or "no"

Whether AI training is permitted.

</summary>

One of the following:

"yes"

<a href="#">Link to this property</a>

"no"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

search: optional "yes"or "no"

Whether search indexing is permitted.

</summary>

One of the following:

"yes"

<a href="#">Link to this property</a>

"no"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

crawlDelay: optional number

Crawl delay in seconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sitemaps: optional array of string

List of sitemap URLs found in robots.txt.

<a href="#">Link to this property</a>

status: optional number

HTTP status code from fetching the robots.txt file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_audit.robots%20%3E%20(method)%20bulk_get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Bulk get robots.txt rules

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ai-audit/robots/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          "example.com",
          "blog.example.com"
        ]'
```

200 example

```
{
  "errors": [],
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
    "foo": {
      "userAgents": {
        "foo": {
          "allow": [
            "string"
          ],
          "disallow": [
            "string"
          ],
          "contentSignals": {
            "ai-input": "yes",
            "ai-train": "yes",
            "search": "yes"
          },
          "crawlDelay": 0
        }
      },
      "sitemaps": [
        "string"
      ],
      "status": 0
    }
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
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
    "foo": {
      "userAgents": {
        "foo": {
          "allow": [
            "string"
          ],
          "disallow": [
            "string"
          ],
          "contentSignals": {
            "ai-input": "yes",
            "ai-train": "yes",
            "search": "yes"
          },
          "crawlDelay": 0
        }
      },
      "sitemaps": [
        "string"
      ],
      "status": 0
    }
  }
}
```