---
title: Get an AI Search instance.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Instances](https://developers.cloudflare.com/api/resources/ai_search/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get an AI Search instance.

GET/accounts/{account\_id}/ai-search/instances/{id}

Retrieve the configuration and status of an AI Search instance.

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

account\_id: string

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20read%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20read%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, created\_at, modified\_at, 36 more }

</summary>

id: string

AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

maxLength64

minLength1

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

ai\_gateway\_id: optional string

<a href="#">Link to this property</a>

ai\_search\_model: optional string

A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or default model.

<a href="#">Link to this property</a>

cache: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

cache\_threshold: optional "super\_strict\_match"or "close\_enough"or "flexible\_friend"or "anything\_goes"

</summary>

One of the following:

"super\_strict\_match"

<a href="#">Link to this property</a>

"close\_enough"

<a href="#">Link to this property</a>

"flexible\_friend"

<a href="#">Link to this property</a>

"anything\_goes"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cache\_ttl: optional 600or 1800or 3600or 7 more

Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

</summary>

One of the following:

600

<a href="#">Link to this property</a>

1800

<a href="#">Link to this property</a>

3600

<a href="#">Link to this property</a>

7200

<a href="#">Link to this property</a>

21600

<a href="#">Link to this property</a>

43200

<a href="#">Link to this property</a>

86400

<a href="#">Link to this property</a>

172800

<a href="#">Link to this property</a>

259200

<a href="#">Link to this property</a>

518400

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

chunk\_overlap: optional number

maximum30

minimum0

<a href="#">Link to this property</a>

chunk\_size: optional number

minimum64

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

<details>

<summary>

custom\_metadata: optional array of object {data\_type, field\_name }

</summary>

<details>

<summary>

data\_type: "text"or "number"or "boolean"or "datetime"

</summary>

One of the following:

"text"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

"datetime"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

field\_name: string

maxLength64

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

embedding\_model: optional string

<a href="#">Link to this property</a>

enable: optional boolean

<a href="#">Link to this property</a>

engine\_version: optional number

<a href="#">Link to this property</a>

<details>

<summary>

fusion\_method: optional "max"or "rrf"

</summary>

One of the following:

"max"

<a href="#">Link to this property</a>

"rrf"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedhybrid\_search\_enabled: optional boolean

Deprecated — use index\_method instead.

<a href="#">Link to this property</a>

<details>

<summary>

index\_method: optional object {keyword, vector }

Controls which storage backends are used during indexing. Defaults to vector-only.

</summary>

keyword: boolean

Enable keyword (BM25) storage backend.

<a href="#">Link to this property</a>

vector: boolean

Enable vector (embedding) storage backend.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

indexing\_options: optional object {keyword\_tokenizer, use\_ocr }

</summary>

<details>

<summary>

keyword\_tokenizer: optional "porter"or "trigram"

Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

</summary>

One of the following:

"porter"

<a href="#">Link to this property</a>

"trigram"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

use\_ocr: optional boolean

Enables OCR ingestion for PDFs and images. Changing this triggers a full re-index. Defaults to false.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_activity: optional string

formatdate-time

<a href="#">Link to this property</a>

max\_num\_results: optional number

maximum50

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional object {created\_from\_aisearch\_wizard, worker\_domain }

</summary>

created\_from\_aisearch\_wizard: optional boolean

<a href="#">Link to this property</a>

worker\_domain: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

namespace: optional string

<a href="#">Link to this property</a>

paused: optional boolean

<a href="#">Link to this property</a>

public\_endpoint\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

public\_endpoint\_params: optional object {authorized\_hosts, chat\_completions\_endpoint, custom\_domains, 5 more }

</summary>

authorized\_hosts: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

chat\_completions\_endpoint: optional object {disabled }

</summary>

disabled: optional boolean

Disable chat completions endpoint for this public endpoint

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

custom\_domains: optional array of string

Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

<a href="#">Link to this property</a>

default\_domain\_enabled: optional boolean

When false, the instance is reachable only via a registered custom domain and the default &lt;public\_endpoint\_id&gt;.search.ai.cloudflare.com host returns 404. Requires at least one custom domain. Defaults to true. public\_endpoint\_params is replaced wholesale on update, so resend default\_domain\_enabled on every update to keep the default host off — omitting it resets to true.

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

mcp: optional object {description, disabled }

</summary>

description: optional string

<a href="#">Link to this property</a>

disabled: optional boolean

Disable MCP endpoint for this public endpoint

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rate\_limit: optional object {period\_ms, requests, technique }

</summary>

period\_ms: optional number

maximum3600000

minimum60000

<a href="#">Link to this property</a>

requests: optional number

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

search\_endpoint: optional object {disabled }

</summary>

disabled: optional boolean

Disable search endpoint for this public endpoint

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

reranking: optional boolean

<a href="#">Link to this property</a>

reranking\_model: optional string

<a href="#">Link to this property</a>

<details>

<summary>

retrieval\_options: optional object {boost\_by, keyword\_match\_mode }

</summary>

<details>

<summary>

boost\_by: optional array of object {field, direction }

Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to ‘asc’ for numeric/datetime fields and ‘exists’ for text/boolean fields. Fields must match ‘timestamp’ or a defined custom\_metadata field.

</summary>

field: string

Metadata field name to boost by. Use ‘timestamp’ for document freshness, or any custom\_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not\_exists); text/boolean fields only support exists/not\_exists.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

direction: optional "asc"or "desc"or "exists"or "not\_exists"

Boost direction. ‘desc’ = higher values rank higher (e.g. newer timestamps). ‘asc’ = lower values rank higher. ‘exists’ = boost chunks that have the field. ‘not\_exists’ = boost chunks that lack the field. Optional — defaults to ‘asc’ for numeric/datetime fields, ‘exists’ for text/boolean fields.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

"exists"

<a href="#">Link to this property</a>

"not\_exists"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

keyword\_match\_mode: optional "and"or "or"

Controls which documents are candidates for BM25 scoring. ‘and’ restricts candidates to documents containing all query terms; ‘or’ includes any document containing at least one term, ranked by BM25 relevance. When omitted on an update, the existing stored value is preserved; when never set, search falls back to ‘and’.

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

rewrite\_model: optional string

A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or default model.

<a href="#">Link to this property</a>

rewrite\_query: optional boolean

<a href="#">Link to this property</a>

score\_threshold: optional number

maximum1

minimum0

<a href="#">Link to this property</a>

source: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source\_params: optional object {exclude\_items, include\_items, prefix, 2 more }

</summary>

exclude\_items: optional array of string

List of path patterns to exclude. Uses micromatch glob syntax: \* matches within a path segment, \*\* matches across path segments (e.g., /admin/\*\* matches /admin/users and /admin/settings/advanced). Most accounts are limited to 10 rules; contact support to raise it.

<a href="#">Link to this property</a>

include\_items: optional array of string

List of path patterns to include. Uses micromatch glob syntax: \* matches within a path segment, \*\* matches across path segments (e.g., /blog/\*\* matches /blog/post and /blog/2024/post). Most accounts are limited to 10 rules; contact support to raise it.

<a href="#">Link to this property</a>

prefix: optional string

<a href="#">Link to this property</a>

r2\_jurisdiction: optional string

<a href="#">Link to this property</a>

<details>

<summary>

web\_crawler: optional object {discover\_options, parse\_options, parse\_type }

</summary>

<details>

<summary>

discover\_options: optional object {depth, include\_external\_links, include\_subdomains, 3 more }

Options for parse\_type ‘discover’, where Browser Run discovers URLs by link following and sitemaps. Ignored for ‘sitemap’.

</summary>

depth: optional number

Maximum link-follow depth from the seed URL.

maximum100000

minimum1

<a href="#">Link to this property</a>

include\_external\_links: optional boolean

Follow links that point outside the source domain. Must stay <code>false</code> — discover crawls are restricted to the zone you own.

<a href="#">Link to this property</a>

include\_subdomains: optional boolean

Follow links to subdomains of the source host.

<a href="#">Link to this property</a>

limit: optional number

Maximum number of pages to crawl (1-100000).

maximum100000

minimum1

<a href="#">Link to this property</a>

max\_age: optional number

Maximum content age in seconds to accept (0–604800).

maximum604800

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "all"or "sitemaps"or "links"

Where the crawler looks for URLs: ‘sitemaps’ reads sitemap XML only, ‘links’ follows page links only, ‘all’ does both.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"sitemaps"

<a href="#">Link to this property</a>

"links"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

parse\_options: optional object {content\_selector, include\_headers, include\_images, 2 more }

</summary>

<details>

<summary>

content\_selector: optional array of object {path, selector }

List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

</summary>

path: string

Glob pattern to match against the page URL path. Uses standard glob syntax: \* matches within a segment, \*\* crosses directories.

maxLength200

minLength1

<a href="#">Link to this property</a>

selector: string

CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, \`, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

maxLength200

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

include\_headers: optional map\[string]

Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

<a href="#">Link to this property</a>

include\_images: optional boolean

<a href="#">Link to this property</a>

specific\_sitemaps: optional array of string

List of specific sitemap URLs to use for crawling. Only valid when parse\_type is ‘sitemap’.

<a href="#">Link to this property</a>

use\_browser\_rendering: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

parse\_type: optional "sitemap"or "discover"

How URLs are discovered. ‘sitemap’ reads XML sitemaps; ‘discover’ follows links recursively and requires the source to be a Verified zone on this account.

</summary>

One of the following:

"sitemap"

<a href="#">Link to this property</a>

"discover"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

<details>

<summary>

sync\_interval: optional 900or 1800or 3600or 5 more

Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

</summary>

One of the following:

900

<a href="#">Link to this property</a>

1800

<a href="#">Link to this property</a>

3600

<a href="#">Link to this property</a>

7200

<a href="#">Link to this property</a>

14400

<a href="#">Link to this property</a>

21600

<a href="#">Link to this property</a>

43200

<a href="#">Link to this property</a>

86400

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

token\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "r2"or "web-crawler"

</summary>

One of the following:

"r2"

<a href="#">Link to this property</a>

"web-crawler"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20read%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20read%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get an AI Search instance.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/instances/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "my-ai-search",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "ai_gateway_id": "ai_gateway_id",
    "ai_search_model": "ai_search_model",
    "cache": true,
    "cache_threshold": "super_strict_match",
    "cache_ttl": 600,
    "chunk_overlap": 0,
    "chunk_size": 64,
    "created_by": "created_by",
    "custom_metadata": [
      {
        "data_type": "text",
        "field_name": "x"
      }
    ],
    "embedding_model": "embedding_model",
    "enable": true,
    "engine_version": 0,
    "fusion_method": "max",
    "hybrid_search_enabled": true,
    "index_method": {
      "keyword": true,
      "vector": true
    },
    "indexing_options": {
      "keyword_tokenizer": "porter",
      "use_ocr": true
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "max_num_results": 1,
    "metadata": {
      "created_from_aisearch_wizard": true,
      "worker_domain": "worker_domain"
    },
    "modified_by": "modified_by",
    "namespace": "namespace",
    "paused": true,
    "public_endpoint_id": "public_endpoint_id",
    "public_endpoint_params": {
      "authorized_hosts": [
        "string"
      ],
      "chat_completions_endpoint": {
        "disabled": true
      },
      "custom_domains": [
        "search.example.com"
      ],
      "default_domain_enabled": true,
      "enabled": true,
      "mcp": {
        "description": "description",
        "disabled": true
      },
      "rate_limit": {
        "period_ms": 60000,
        "requests": 1,
        "technique": "fixed"
      },
      "search_endpoint": {
        "disabled": true
      }
    },
    "reranking": true,
    "reranking_model": "reranking_model",
    "retrieval_options": {
      "boost_by": [
        {
          "field": "timestamp",
          "direction": "desc"
        }
      ],
      "keyword_match_mode": "and"
    },
    "rewrite_model": "rewrite_model",
    "rewrite_query": true,
    "score_threshold": 0,
    "source": "source",
    "source_params": {
      "exclude_items": [
        "/admin/**",
        "/private/**",
        "**\\temp\\**"
      ],
      "include_items": [
        "/blog/**",
        "/docs/**/*.html",
        "**\\blog\\**.html"
      ],
      "prefix": "prefix",
      "r2_jurisdiction": "r2_jurisdiction",
      "web_crawler": {
        "discover_options": {
          "depth": 5,
          "include_external_links": false,
          "include_subdomains": false,
          "limit": 10000,
          "max_age": 86400,
          "source": "all"
        },
        "parse_options": {
          "content_selector": [
            {
              "path": "**/blog/**",
              "selector": "article div.post-body"
            },
            {
              "path": "**/docs/**",
              "selector": "main"
            }
          ],
          "include_headers": {
            "cache-control": "no-cache, no-store"
          },
          "include_images": true,
          "specific_sitemaps": [
            "https://example.com/sitemap.xml",
            "https://example.com/blog-sitemap.xml"
          ],
          "use_browser_rendering": true
        },
        "parse_type": "sitemap"
      }
    },
    "status": "status",
    "sync_interval": 900,
    "token_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "type": "r2"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "my-ai-search",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "ai_gateway_id": "ai_gateway_id",
    "ai_search_model": "ai_search_model",
    "cache": true,
    "cache_threshold": "super_strict_match",
    "cache_ttl": 600,
    "chunk_overlap": 0,
    "chunk_size": 64,
    "created_by": "created_by",
    "custom_metadata": [
      {
        "data_type": "text",
        "field_name": "x"
      }
    ],
    "embedding_model": "embedding_model",
    "enable": true,
    "engine_version": 0,
    "fusion_method": "max",
    "hybrid_search_enabled": true,
    "index_method": {
      "keyword": true,
      "vector": true
    },
    "indexing_options": {
      "keyword_tokenizer": "porter",
      "use_ocr": true
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "max_num_results": 1,
    "metadata": {
      "created_from_aisearch_wizard": true,
      "worker_domain": "worker_domain"
    },
    "modified_by": "modified_by",
    "namespace": "namespace",
    "paused": true,
    "public_endpoint_id": "public_endpoint_id",
    "public_endpoint_params": {
      "authorized_hosts": [
        "string"
      ],
      "chat_completions_endpoint": {
        "disabled": true
      },
      "custom_domains": [
        "search.example.com"
      ],
      "default_domain_enabled": true,
      "enabled": true,
      "mcp": {
        "description": "description",
        "disabled": true
      },
      "rate_limit": {
        "period_ms": 60000,
        "requests": 1,
        "technique": "fixed"
      },
      "search_endpoint": {
        "disabled": true
      }
    },
    "reranking": true,
    "reranking_model": "reranking_model",
    "retrieval_options": {
      "boost_by": [
        {
          "field": "timestamp",
          "direction": "desc"
        }
      ],
      "keyword_match_mode": "and"
    },
    "rewrite_model": "rewrite_model",
    "rewrite_query": true,
    "score_threshold": 0,
    "source": "source",
    "source_params": {
      "exclude_items": [
        "/admin/**",
        "/private/**",
        "**\\temp\\**"
      ],
      "include_items": [
        "/blog/**",
        "/docs/**/*.html",
        "**\\blog\\**.html"
      ],
      "prefix": "prefix",
      "r2_jurisdiction": "r2_jurisdiction",
      "web_crawler": {
        "discover_options": {
          "depth": 5,
          "include_external_links": false,
          "include_subdomains": false,
          "limit": 10000,
          "max_age": 86400,
          "source": "all"
        },
        "parse_options": {
          "content_selector": [
            {
              "path": "**/blog/**",
              "selector": "article div.post-body"
            },
            {
              "path": "**/docs/**",
              "selector": "main"
            }
          ],
          "include_headers": {
            "cache-control": "no-cache, no-store"
          },
          "include_images": true,
          "specific_sitemaps": [
            "https://example.com/sitemap.xml",
            "https://example.com/blog-sitemap.xml"
          ],
          "use_browser_rendering": true
        },
        "parse_type": "sitemap"
      }
    },
    "status": "status",
    "sync_interval": 900,
    "token_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "type": "r2"
  },
  "success": true
}
```