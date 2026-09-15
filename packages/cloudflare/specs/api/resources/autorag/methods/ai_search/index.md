---
title: AI Search
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AutoRAG](https://developers.cloudflare.com/api/resources/autorag)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# AI Search

Deprecated: Use AI Search instead.

POST/accounts/{account\_id}/autorag/rags/{id}/ai-search

Runs an AI Search query against an AutoRAG.

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

`Auto Rag Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

rag id

maxLength32

minLength1

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

query: string

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20query%20%3E%20(schema)>)

<details>

<summary>

filters: optional object {key, type, value } or object {filters, type }

</summary>

One of the following:

<details>

<summary>

object {key, type, value }

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "eq"or "ne"or "gt"or 3 more

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"ne"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor boolean

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {filters, type }

</summary>

<details>

<summary>

filters: array of object {key, type, value }

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "eq"or "ne"or "gt"or 3 more

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"ne"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor boolean

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "and"or "or"

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

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20filters%20%3E%20(schema)>)

max\_num\_results: optional number

maximum50

minimum1

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20max_num_results%20%3E%20(schema)>)

<details>

<summary>

model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast"or "@cf/meta/llama-3.1-8b-instruct-fast"or "@cf/meta/llama-3.1-8b-instruct-fp8"or 23 more

</summary>

One of the following:

"@cf/meta/llama-3.3-70b-instruct-fp8-fast"

<a href="#">Link to this property</a>

"@cf/meta/llama-3.1-8b-instruct-fast"

<a href="#">Link to this property</a>

"@cf/meta/llama-3.1-8b-instruct-fp8"

<a href="#">Link to this property</a>

"@cf/meta/llama-4-scout-17b-16e-instruct"

<a href="#">Link to this property</a>

"@cf/qwen/qwen3-30b-a3b-fp8"

<a href="#">Link to this property</a>

"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"

<a href="#">Link to this property</a>

"@cf/moonshotai/kimi-k2-instruct"

<a href="#">Link to this property</a>

"anthropic/claude-3-7-sonnet"

<a href="#">Link to this property</a>

"anthropic/claude-sonnet-4"

<a href="#">Link to this property</a>

"anthropic/claude-opus-4"

<a href="#">Link to this property</a>

"anthropic/claude-3-5-haiku"

<a href="#">Link to this property</a>

"cerebras/qwen-3-235b-a22b-instruct"

<a href="#">Link to this property</a>

"cerebras/qwen-3-235b-a22b-thinking"

<a href="#">Link to this property</a>

"cerebras/llama-3.3-70b"

<a href="#">Link to this property</a>

"cerebras/llama-4-maverick-17b-128e-instruct"

<a href="#">Link to this property</a>

"cerebras/llama-4-scout-17b-16e-instruct"

<a href="#">Link to this property</a>

"cerebras/gpt-oss-120b"

<a href="#">Link to this property</a>

"google-ai-studio/gemini-2.5-flash"

<a href="#">Link to this property</a>

"google-ai-studio/gemini-2.5-pro"

<a href="#">Link to this property</a>

"grok/grok-4"

<a href="#">Link to this property</a>

"groq/llama-3.3-70b-versatile"

<a href="#">Link to this property</a>

"groq/llama-3.1-8b-instant"

<a href="#">Link to this property</a>

"openai/gpt-5"

<a href="#">Link to this property</a>

"openai/gpt-5-mini"

<a href="#">Link to this property</a>

"openai/gpt-5-nano"

<a href="#">Link to this property</a>

""

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20model%20%3E%20(schema)>)

<details>

<summary>

ranking\_options: optional object {ranker, score\_threshold }

</summary>

ranker: optional string

<a href="#">Link to this property</a>

score\_threshold: optional number

maximum1

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20ranking_options%20%3E%20(schema)>)

<details>

<summary>

reranking: optional object {enabled, model }

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

model: optional "@cf/baai/bge-reranker-base"or ""

</summary>

One of the following:

"@cf/baai/bge-reranker-base"

<a href="#">Link to this property</a>

""

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20reranking%20%3E%20(schema)>)

rewrite\_query: optional boolean

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20rewrite_query%20%3E%20(schema)>)

stream: optional boolean

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20stream%20%3E%20(schema)>)

system\_prompt: optional string

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(params)%200%20%3E%20(param)%20system_prompt%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {response, search\_query, data, 3 more }

</summary>

response: string

<a href="#">Link to this property</a>

search\_query: string

<a href="#">Link to this property</a>

<details>

<summary>

data: optional array of object {score, attributes, content, 2 more }

</summary>

score: number

<a href="#">Link to this property</a>

attributes: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

content: optional array of object {text, type }

</summary>

text: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

file\_id: optional string

<a href="#">Link to this property</a>

filename: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_more: optional boolean

<a href="#">Link to this property</a>

next\_page: optional string

<a href="#">Link to this property</a>

object: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20autorag%20%3E%20(method)%20ai_search%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### AI Search

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/ai-search \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "query": "query"
        }'
```

200 example

```
{
  "result": {
    "response": "response",
    "search_query": "search_query",
    "data": [
      {
        "score": 0,
        "attributes": {},
        "content": [
          {
            "text": "text",
            "type": "type"
          }
        ],
        "file_id": "file_id",
        "filename": "filename"
      }
    ],
    "has_more": true,
    "next_page": "next_page",
    "object": "object"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "response": "response",
    "search_query": "search_query",
    "data": [
      {
        "score": 0,
        "attributes": {},
        "content": [
          {
            "text": "text",
            "type": "type"
          }
        ],
        "file_id": "file_id",
        "filename": "filename"
      }
    ],
    "has_more": true,
    "next_page": "next_page",
    "object": "object"
  },
  "success": true
}
```