---
title: Update Field Extractor
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Field Extractors](https://developers.cloudflare.com/api/resources/field_extractors)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Field Extractor

PUT/accounts/{account\_id}/field\_extractors/{extractor}

Replaces all custom extraction rules for an extractor type. Omitted rules are deleted.

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

Cloudflare account ID.

minLength1

[Link to this property](#)%20field_extractors%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

extractor: string

Extractor type.

minLength1

[Link to this property](#)%20field_extractors%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20extractor%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

rules: array of object {fields, ref, description }

</summary>

<details>

<summary>

fields: array of object {expression, name }

</summary>

expression: string

maxLength4096

minLength1

<a href="#">Link to this property</a>

name: string

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ref: string

maxLength64

minLength1

<a href="#">Link to this property</a>

description: optional string

maxLength4096

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20field_extractors%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20rules%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, source }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Points to the offending input as a JSON Pointer into the request body.

</summary>

pointer: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20field_extractors%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

Additional informational messages.

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20field_extractors%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {extractor, rules }

</summary>

extractor: string

Extractor type.

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {fields, ref, description }

</summary>

<details>

<summary>

fields: array of object {expression, name }

</summary>

expression: string

Wirefilter value expression.

<a href="#">Link to this property</a>

name: string

Field name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ref: string

Stable rule identifier.

<a href="#">Link to this property</a>

description: optional string

Human-readable rule description.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20field_extractors%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20field_extractors%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update Field Extractor

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/field_extractors/$EXTRACTOR \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "rules": [
            {
              "fields": [
                {
                  "expression": "x",
                  "name": "x"
                }
              ],
              "ref": "x"
            }
          ]
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "extractor": "llm_prompts",
    "rules": [
      {
        "fields": [
          {
            "expression": "filter(http.request.body.json.strings.values, http.request.body.json.strings.pointers[*] matches \"^/messages/\\\\d+/content$\")",
            "name": "prompt"
          }
        ],
        "ref": "openai-chat",
        "description": "description"
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
  "errors": [
    {
      "code": 0,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "extractor": "llm_prompts",
    "rules": [
      {
        "fields": [
          {
            "expression": "filter(http.request.body.json.strings.values, http.request.body.json.strings.pointers[*] matches \"^/messages/\\\\d+/content$\")",
            "name": "prompt"
          }
        ],
        "ref": "openai-chat",
        "description": "description"
      }
    ]
  },
  "success": true
}
```