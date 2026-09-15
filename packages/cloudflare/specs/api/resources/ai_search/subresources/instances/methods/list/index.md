---
title: List AI Search instances.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Instances](https://developers.cloudflare.com/api/resources/ai_search/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List AI Search instances.

GET/accounts/{account\_id}/ai-search/instances

List all AI Search instances in the account.

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

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

namespace: optional string

Filter by namespace.

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20namespace%20%3E%20(schema)>)

order\_by: optional "created\_at"

Field to order results by.

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

<details>

<summary>

order\_by\_direction: optional "asc"or "desc"

Order direction.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by_direction%20%3E%20(schema)>)

page: optional number

Page number (1-indexed).

minimum1

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum100

minimum1

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Filter instances whose id contains this string (case-insensitive).

maxLength64

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, ai\_gateway\_id, ai\_search\_model, 42 more }

</summary>

id: string

<a href="#">Link to this property</a>

ai\_gateway\_id: string

<a href="#">Link to this property</a>

ai\_search\_model: string

<a href="#">Link to this property</a>

cache: boolean

<a href="#">Link to this property</a>

<details>

<summary>

cache\_threshold: "super\_strict\_match"or "close\_enough"or "flexible\_friend"or "anything\_goes"

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

cache\_ttl: 600or 1800or 3600or 7 more

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

chunk: boolean

<a href="#">Link to this property</a>

chunk\_overlap: number

<a href="#">Link to this property</a>

chunk\_size: number

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

created\_by: string

<a href="#">Link to this property</a>

<details>

<summary>

custom\_metadata: array of object {data\_type, field\_name }

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

embedding\_model: string

<a href="#">Link to this property</a>

enable: boolean

<a href="#">Link to this property</a>

engine\_version: number

<a href="#">Link to this property</a>

<details>

<summary>

fusion\_method: "max"or "rrf"

</summary>

One of the following:

"max"

<a href="#">Link to this property</a>

"rrf"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hybrid\_search\_enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

index\_method: object {keyword, vector }

</summary>

keyword: boolean

<a href="#">Link to this property</a>

vector: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

indexing\_options: object {keyword\_tokenizer, use\_ocr }

</summary>

<details>

<summary>

keyword\_tokenizer: optional "porter"or "trigram"

</summary>

One of the following:

"porter"

<a href="#">Link to this property</a>

"trigram"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

use\_ocr: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_activity: string

formatdate-time

<a href="#">Link to this property</a>

max\_num\_results: number

<a href="#">Link to this property</a>

<details>

<summary>

metadata: object {created\_from\_aisearch\_wizard, worker\_domain }

</summary>

created\_from\_aisearch\_wizard: optional boolean

<a href="#">Link to this property</a>

worker\_domain: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_by: string

<a href="#">Link to this property</a>

namespace: string

<a href="#">Link to this property</a>

paused: boolean

<a href="#">Link to this property</a>

public\_endpoint\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

public\_endpoint\_params: object {authorized\_hosts, chat\_completions\_endpoint, custom\_domains, 5 more }

</summary>

authorized\_hosts: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

chat\_completions\_endpoint: optional object {disabled }

</summary>

disabled: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

custom\_domains: optional array of string

<a href="#">Link to this property</a>

default\_domain\_enabled: optional boolean

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

reranking: boolean

<a href="#">Link to this property</a>

reranking\_model: string

<a href="#">Link to this property</a>

<details>

<summary>

retrieval\_options: object {boost\_by, keyword\_match\_mode }

</summary>

<details>

<summary>

boost\_by: optional array of object {field, dataType, direction }

</summary>

field: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

dataType: optional "number"or "datetime"or "text"or "boolean"

</summary>

One of the following:

"number"

<a href="#">Link to this property</a>

"datetime"

<a href="#">Link to this property</a>

"text"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

direction: optional "asc"or "desc"or "exists"or "not\_exists"

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

rewrite\_model: string

<a href="#">Link to this property</a>

rewrite\_query: boolean

<a href="#">Link to this property</a>

score\_threshold: number

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

<details>

<summary>

source\_params: object {exclude\_items, include\_items, prefix, 2 more }

</summary>

exclude\_items: optional array of string

<a href="#">Link to this property</a>

include\_items: optional array of string

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

</summary>

depth: optional number

maximum100000

minimum1

<a href="#">Link to this property</a>

include\_external\_links: optional boolean

<a href="#">Link to this property</a>

include\_subdomains: optional boolean

<a href="#">Link to this property</a>

limit: optional number

Maximum number of pages to crawl. New values are capped at 100000; instances configured before that cap may report a higher stored value, which the crawler clamps at run time.

maximum100000

minimum1

<a href="#">Link to this property</a>

max\_age: optional number

maximum604800

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "all"or "sitemaps"or "links"

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

</summary>

path: string

maxLength200

minLength1

<a href="#">Link to this property</a>

selector: string

maxLength200

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

include\_headers: optional map\[string]

<a href="#">Link to this property</a>

include\_images: optional boolean

<a href="#">Link to this property</a>

specific\_sitemaps: optional array of string

<a href="#">Link to this property</a>

use\_browser\_rendering: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

parse\_type: optional "sitemap"or "discover"

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

status: string

<a href="#">Link to this property</a>

summarization: boolean

<a href="#">Link to this property</a>

summarization\_model: string

<a href="#">Link to this property</a>

<details>

<summary>

sync\_interval: 900or 1800or 3600or 5 more

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

system\_prompt\_ai\_search: string

<a href="#">Link to this property</a>

system\_prompt\_index\_summarization: string

<a href="#">Link to this property</a>

system\_prompt\_rewrite\_query: string

<a href="#">Link to this property</a>

token\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "r2"or "web-crawler"

</summary>

One of the following:

"r2"

<a href="#">Link to this property</a>

"web-crawler"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, per\_page, total\_count }

</summary>

count: number

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: true

[Link to this property](#)%20ai_search.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List AI Search instances.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/instances \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "id",
      "ai_gateway_id": "ai_gateway_id",
      "ai_search_model": "ai_search_model",
      "cache": true,
      "cache_threshold": "super_strict_match",
      "cache_ttl": 600,
      "chunk": true,
      "chunk_overlap": 0,
      "chunk_size": 0,
      "created_at": "2019-12-27T18:11:19.117Z",
      "created_by": "created_by",
      "custom_metadata": [
        {
          "data_type": "text",
          "field_name": "field_name"
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
      "max_num_results": 0,
      "metadata": {
        "created_from_aisearch_wizard": true,
        "worker_domain": "worker_domain"
      },
      "modified_at": "2019-12-27T18:11:19.117Z",
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
          "x"
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
            "field": "x",
            "dataType": "number",
            "direction": "asc"
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
          "string"
        ],
        "include_items": [
          "string"
        ],
        "prefix": "prefix",
        "r2_jurisdiction": "r2_jurisdiction",
        "web_crawler": {
          "discover_options": {
            "depth": 1,
            "include_external_links": true,
            "include_subdomains": true,
            "limit": 1,
            "max_age": 0,
            "source": "all"
          },
          "parse_options": {
            "content_selector": [
              {
                "path": "x",
                "selector": "x"
              }
            ],
            "include_headers": {
              "foo": "string"
            },
            "include_images": true,
            "specific_sitemaps": [
              "https://example.com"
            ],
            "use_browser_rendering": true
          },
          "parse_type": "sitemap"
        }
      },
      "status": "status",
      "summarization": true,
      "summarization_model": "summarization_model",
      "sync_interval": 900,
      "system_prompt_ai_search": "system_prompt_ai_search",
      "system_prompt_index_summarization": "system_prompt_index_summarization",
      "system_prompt_rewrite_query": "system_prompt_rewrite_query",
      "token_id": "token_id",
      "type": "r2"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": [
    {
      "id": "id",
      "ai_gateway_id": "ai_gateway_id",
      "ai_search_model": "ai_search_model",
      "cache": true,
      "cache_threshold": "super_strict_match",
      "cache_ttl": 600,
      "chunk": true,
      "chunk_overlap": 0,
      "chunk_size": 0,
      "created_at": "2019-12-27T18:11:19.117Z",
      "created_by": "created_by",
      "custom_metadata": [
        {
          "data_type": "text",
          "field_name": "field_name"
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
      "max_num_results": 0,
      "metadata": {
        "created_from_aisearch_wizard": true,
        "worker_domain": "worker_domain"
      },
      "modified_at": "2019-12-27T18:11:19.117Z",
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
          "x"
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
            "field": "x",
            "dataType": "number",
            "direction": "asc"
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
          "string"
        ],
        "include_items": [
          "string"
        ],
        "prefix": "prefix",
        "r2_jurisdiction": "r2_jurisdiction",
        "web_crawler": {
          "discover_options": {
            "depth": 1,
            "include_external_links": true,
            "include_subdomains": true,
            "limit": 1,
            "max_age": 0,
            "source": "all"
          },
          "parse_options": {
            "content_selector": [
              {
                "path": "x",
                "selector": "x"
              }
            ],
            "include_headers": {
              "foo": "string"
            },
            "include_images": true,
            "specific_sitemaps": [
              "https://example.com"
            ],
            "use_browser_rendering": true
          },
          "parse_type": "sitemap"
        }
      },
      "status": "status",
      "summarization": true,
      "summarization_model": "summarization_model",
      "sync_interval": 900,
      "system_prompt_ai_search": "system_prompt_ai_search",
      "system_prompt_index_summarization": "system_prompt_index_summarization",
      "system_prompt_rewrite_query": "system_prompt_rewrite_query",
      "token_id": "token_id",
      "type": "r2"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```