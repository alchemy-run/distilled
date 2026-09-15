---
title: List bots
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Bots](https://developers.cloudflare.com/api/resources/radar/subresources/bots)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List bots

GET/radar/bots

Retrieves a list of bots.

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

`User Details Write``User Details Read`

##### Q uery ParametersExpand Collapse

<details>

<summary>

botCategory: optional "SEARCH\_ENGINE\_CRAWLER"or "SEARCH\_ENGINE\_OPTIMIZATION"or "MONITORING\_AND\_ANALYTICS"or 13 more

Filters results by bot category.

</summary>

One of the following:

"SEARCH\_ENGINE\_CRAWLER"

<a href="#">Link to this property</a>

"SEARCH\_ENGINE\_OPTIMIZATION"

<a href="#">Link to this property</a>

"MONITORING\_AND\_ANALYTICS"

<a href="#">Link to this property</a>

"ADVERTISING\_AND\_MARKETING"

<a href="#">Link to this property</a>

"SOCIAL\_MEDIA\_MARKETING"

<a href="#">Link to this property</a>

"PAGE\_PREVIEW"

<a href="#">Link to this property</a>

"ACADEMIC\_RESEARCH"

<a href="#">Link to this property</a>

"SECURITY"

<a href="#">Link to this property</a>

"ACCESSIBILITY"

<a href="#">Link to this property</a>

"WEBHOOKS"

<a href="#">Link to this property</a>

"FEED\_FETCHER"

<a href="#">Link to this property</a>

"AI\_CRAWLER"

<a href="#">Link to this property</a>

"AGGREGATOR"

<a href="#">Link to this property</a>

"AI\_ASSISTANT"

<a href="#">Link to this property</a>

"AI\_SEARCH"

<a href="#">Link to this property</a>

"ARCHIVER"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20botCategory%20%3E%20(schema)>)

botOperator: optional string

Filters results by bot operator.

maxLength100

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20botOperator%20%3E%20(schema)>)

botVerificationStatus: optional "VERIFIED"

Filters results by bot verification status.

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20botVerificationStatus%20%3E%20(schema)>)

<details>

<summary>

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

<details>

<summary>

kind: optional "AGENT"or "BOT"

Filters results by bot kind. Deprecated: the Verified Bot / Signed Agent distinction is being removed.

</summary>

One of the following:

"AGENT"

<a href="#">Link to this property</a>

"BOT"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20kind%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {bots }

</summary>

<details>

<summary>

bots: array of object {category, description, kind, 4 more }

</summary>

category: string

The category of the bot.

<a href="#">Link to this property</a>

description: string

A summary for the bot (e.g., purpose).

<a href="#">Link to this property</a>

Deprecatedkind: string

The kind of the bot.

<a href="#">Link to this property</a>

name: string

The name of the bot.

<a href="#">Link to this property</a>

operator: string

The organization that owns and operates the bot.

<a href="#">Link to this property</a>

slug: string

A kebab-case identifier derived from the bot name.

<a href="#">Link to this property</a>

userAgentPatterns: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bots%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List bots

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bots \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "bots": [
      {
        "category": "AI_CRAWLER",
        "description": "OpenAI/ChatGPT's web crawler",
        "kind": "AGENT",
        "name": "GPTBot",
        "operator": "OpenAI",
        "slug": "gptbot",
        "userAgentPatterns": [
          "GPTBot"
        ]
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
  "result": {
    "bots": [
      {
        "category": "AI_CRAWLER",
        "description": "OpenAI/ChatGPT's web crawler",
        "kind": "AGENT",
        "name": "GPTBot",
        "operator": "OpenAI",
        "slug": "gptbot",
        "userAgentPatterns": [
          "GPTBot"
        ]
      }
    ]
  },
  "success": true
}
```