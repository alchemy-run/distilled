---
title: Multi-Instance Chat Completions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Namespaces](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Multi-Instance Chat Completions

POST/accounts/{account\_id}/ai-search/namespaces/{name}/chat/completions

Performs a chat completion request against multiple AI Search instances in parallel, merging retrieved content as context for generating a response.

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

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20chat_completions%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20chat_completions%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

ai\_search\_options: object {instance\_ids, cache, custom\_metadata, 3 more }

</summary>

instance\_ids: array of string

<a href="#">Link to this property</a>

<details>

<summary>

cache: optional object {cache\_threshold, enabled }

</summary>

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

enabled: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

custom\_metadata: optional map\[stringor numberor boolean]

Metadata added to AI Gateway logs for requests triggered by this operation. Accepts up to 2 string, number, or boolean entries. Keys ‘ai-search’, ‘task’, ‘origin’, and keys beginning with ‘cf.’ are reserved.

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

<details>

<summary>

query\_rewrite: optional object {enabled, model, rewrite\_prompt }

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

model: optional string

A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or default model.

<a href="#">Link to this property</a>

rewrite\_prompt: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

reranking: optional object {enabled, match\_threshold, model }

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

match\_threshold: optional number

maximum1

minimum0

<a href="#">Link to this property</a>

model: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

retrieval: optional object {boost\_by, context\_expansion, filters, 6 more }

</summary>

<details>

<summary>

boost\_by: optional array of object {field, direction }

Metadata fields to boost search results by. Overrides the instance-level boost\_by config. Direction defaults to ‘asc’ for numeric/datetime fields, ‘exists’ for text/boolean fields. Fields must match ‘timestamp’ or a defined custom\_metadata field.

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

context\_expansion: optional number

maximum3

minimum0

<a href="#">Link to this property</a>

filters: optional map\[unknown]

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

<details>

<summary>

keyword\_match\_mode: optional "and"or "or"

Controls which documents are candidates for BM25 scoring. ‘and’ restricts candidates to documents containing all query terms; ‘or’ includes any document containing at least one term, ranked by BM25 relevance. When omitted, falls back to the instance-level retrieval\_options.keyword\_match\_mode, then to ‘and’.

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

match\_threshold: optional number

maximum1

minimum0

<a href="#">Link to this property</a>

max\_num\_results: optional number

maximum50

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

retrieval\_type: optional "vector"or "keyword"or "hybrid"

</summary>

One of the following:

"vector"

<a href="#">Link to this property</a>

"keyword"

<a href="#">Link to this property</a>

"hybrid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

return\_on\_failure: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20chat_completions%20%3E%20(params)%200%20%3E%20(param)%20ai_search_options%20%3E%20(schema)>)

<details>

<summary>

messages: array of object {content, role }

</summary>

<details>

<summary>

content: stringor array of object {text, type } or object {image\_url, type } or object {file, type } or string

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

array of object {text, type } or object {image\_url, type } or object {file, type }

</summary>

One of the following:

<details>

<summary>

object {text, type }

</summary>

text: string

minLength1

<a href="#">Link to this property</a>

type: "text"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {image\_url, type }

</summary>

<details>

<summary>

image\_url: object {url }

</summary>

url: string

maxLength20971520

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "image\_url"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {file, type }

</summary>

<details>

<summary>

file: object {filename, file\_data, file\_id }

</summary>

filename: string

maxLength255

minLength1

<a href="#">Link to this property</a>

file\_data: optional string

maxLength13981144

minLength1

<a href="#">Link to this property</a>

file\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "file"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

role: "system"or "developer"or "user"or 2 more

</summary>

One of the following:

"system"

<a href="#">Link to this property</a>

"developer"

<a href="#">Link to this property</a>

"user"

<a href="#">Link to this property</a>

"assistant"

<a href="#">Link to this property</a>

"tool"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20chat_completions%20%3E%20(params)%200%20%3E%20(param)%20messages%20%3E%20(schema)>)

model: optional string

A Workers AI model ID or an AI Gateway model ID compatible with the OpenAI Chat Completions API. An empty string uses the configured or default model.

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20chat_completions%20%3E%20(params)%200%20%3E%20(param)%20model%20%3E%20(schema)>)

stream: optional boolean

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20chat_completions%20%3E%20(params)%200%20%3E%20(param)%20stream%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

choices: array of object {message, index }

</summary>

<details>

<summary>

message: object {content, role }

</summary>

<details>

<summary>

content: stringor array of object {text, type } or object {image\_url, type } or object {file, type } or string

</summary>

One of the following:

string

<a href="#">Link to this property</a>

<details>

<summary>

array of object {text, type } or object {image\_url, type } or object {file, type }

</summary>

One of the following:

<details>

<summary>

object {text, type }

</summary>

text: string

minLength1

<a href="#">Link to this property</a>

type: "text"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {image\_url, type }

</summary>

<details>

<summary>

image\_url: object {url }

</summary>

url: string

maxLength20971520

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "image\_url"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {file, type }

</summary>

<details>

<summary>

file: object {filename, file\_data, file\_id }

</summary>

filename: string

maxLength255

minLength1

<a href="#">Link to this property</a>

file\_data: optional string

maxLength13981144

minLength1

<a href="#">Link to this property</a>

file\_id: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "file"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

role: "system"or "developer"or "user"or 2 more

</summary>

One of the following:

"system"

<a href="#">Link to this property</a>

"developer"

<a href="#">Link to this property</a>

"user"

<a href="#">Link to this property</a>

"assistant"

<a href="#">Link to this property</a>

"tool"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

index: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces%20%3E%20(model)%20namespace_chat_completions_response%20%3E%20(schema)%20%3E%20(property)%20choices>)

<details>

<summary>

chunks: array of object {id, instance\_id, score, 4 more }

</summary>

id: string

<a href="#">Link to this property</a>

instance\_id: string

<a href="#">Link to this property</a>

score: number

maximum1

minimum0

<a href="#">Link to this property</a>

text: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

<details>

<summary>

item: optional object {key, metadata, timestamp }

</summary>

key: string

<a href="#">Link to this property</a>

metadata: optional map\[unknown]

<a href="#">Link to this property</a>

timestamp: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scoring\_details: optional object {fusion\_method, keyword\_rank, keyword\_score, 3 more }

</summary>

<details>

<summary>

fusion\_method: optional "rrf"or "max"

</summary>

One of the following:

"rrf"

<a href="#">Link to this property</a>

"max"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

keyword\_rank: optional number

<a href="#">Link to this property</a>

keyword\_score: optional number

minimum0

<a href="#">Link to this property</a>

reranking\_score: optional number

maximum1

minimum0

<a href="#">Link to this property</a>

vector\_rank: optional number

<a href="#">Link to this property</a>

vector\_score: optional number

maximum1

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces%20%3E%20(model)%20namespace_chat_completions_response%20%3E%20(schema)%20%3E%20(property)%20chunks>)

id: optional string

[Link to this property](#)%20ai_search.namespaces%20%3E%20(model)%20namespace_chat_completions_response%20%3E%20(schema)%20%3E%20(property)%20id>)

<details>

<summary>

errors: optional array of object {instance\_id, message }

</summary>

instance\_id: string

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces%20%3E%20(model)%20namespace_chat_completions_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

model: optional string

[Link to this property](#)%20ai_search.namespaces%20%3E%20(model)%20namespace_chat_completions_response%20%3E%20(schema)%20%3E%20(property)%20model>)

object: optional string

[Link to this property](#)%20ai_search.namespaces%20%3E%20(model)%20namespace_chat_completions_response%20%3E%20(schema)%20%3E%20(property)%20object>)

### Multi-Instance Chat Completions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/chat/completions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ai_search_options": {
            "instance_ids": [
              "my-ai-search"
            ]
          },
          "messages": [
            {
              "content": "string",
              "role": "system"
            }
          ]
        }'
```

200 example

```
{
  "choices": [
    {
      "message": {
        "content": "string",
        "role": "system"
      },
      "index": 0
    }
  ],
  "chunks": [
    {
      "id": "id",
      "instance_id": "instance_id",
      "score": 0,
      "text": "text",
      "type": "type",
      "item": {
        "key": "key",
        "metadata": {
          "foo": "bar"
        },
        "timestamp": 0
      },
      "scoring_details": {
        "fusion_method": "rrf",
        "keyword_rank": 0,
        "keyword_score": 0,
        "reranking_score": 0,
        "vector_rank": 0,
        "vector_score": 0
      }
    }
  ],
  "id": "id",
  "errors": [
    {
      "instance_id": "instance_id",
      "message": "message"
    }
  ],
  "model": "model",
  "object": "object"
}
```

##### Returns Examples

200 example

```
{
  "choices": [
    {
      "message": {
        "content": "string",
        "role": "system"
      },
      "index": 0
    }
  ],
  "chunks": [
    {
      "id": "id",
      "instance_id": "instance_id",
      "score": 0,
      "text": "text",
      "type": "type",
      "item": {
        "key": "key",
        "metadata": {
          "foo": "bar"
        },
        "timestamp": 0
      },
      "scoring_details": {
        "fusion_method": "rrf",
        "keyword_rank": 0,
        "keyword_score": 0,
        "reranking_score": 0,
        "vector_rank": 0,
        "vector_score": 0
      }
    }
  ],
  "id": "id",
  "errors": [
    {
      "instance_id": "instance_id",
      "message": "message"
    }
  ],
  "model": "model",
  "object": "object"
}
```