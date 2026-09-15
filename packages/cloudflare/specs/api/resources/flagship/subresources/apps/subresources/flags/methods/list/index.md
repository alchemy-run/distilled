---
title: List flags
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Flagship](https://developers.cloudflare.com/api/resources/flagship)

[Apps](https://developers.cloudflare.com/api/resources/flagship/subresources/apps)

[Flags](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/flags)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List flags

GET/accounts/{account\_id}/flagship/apps/{app\_id}/flags

Lists an app’s flags ordered by key. Pass `cursor` from `result_info` to page forward; a null cursor indicates the last page.

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

`Flagship Read``Flagship Write`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID.

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

App identifier.

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Pagination cursor from a previous response.

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

limit: optional string

Max items to return (1–200).

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {default\_variation, enabled, key, 6 more }

</summary>

default\_variation: string

Variation the API serves when the flag is off, or when it’s on but no rule matches the context. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

When false, the flag bypasses all rules and always serves <code>default_variation</code>.

<a href="#">Link to this property</a>

key: string

Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of object {conditions, priority, serve\_variation, rollout }

Targeting rules evaluated in ascending <code>priority</code>; the first matching rule wins. An empty array means the flag always serves <code>default_variation</code>.

</summary>

<details>

<summary>

conditions: array of object {attribute, operator, value } or object {clauses, logical\_operator }

Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of object {attribute, operator, value } or object {clauses, logical\_operator }

</summary>

One of the following:

<details>

<summary>

object {attribute, operator, value }

</summary>

attribute: string

maxLength64

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operator: "equals"or "not\_equals"or "greater\_than"or 8 more

</summary>

One of the following:

"equals"

<a href="#">Link to this property</a>

"not\_equals"

<a href="#">Link to this property</a>

"greater\_than"

<a href="#">Link to this property</a>

"less\_than"

<a href="#">Link to this property</a>

"greater\_than\_or\_equals"

<a href="#">Link to this property</a>

"less\_than\_or\_equals"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {clauses, logical\_operator }

</summary>

<details>

<summary>

clauses: array of stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logical\_operator: "AND"or "OR"

</summary>

One of the following:

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: number

Evaluation order: the API evaluates rules with lower numbers first. Must be unique across the flag’s rules.

minimum1

<a href="#">Link to this property</a>

serve\_variation: string

Variation the API serves when this rule matches. Must be a key in <code>variations</code>.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

rollout: optional object {percentage, attribute }

</summary>

percentage: number

Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

maximum100

minimum0

<a href="#">Link to this property</a>

attribute: optional string

Context attribute used for sticky bucketing. Defaults to <code>targetingKey</code>. If absent at evaluation time, bucketing is random per request.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "boolean"or "string"or "number"or "json"

Server-inferred value type shared by all of the flag’s variations.

</summary>

One of the following:

"boolean"

<a href="#">Link to this property</a>

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

variations: map\[stringor numberor booleanor 2 more]

Map of variation name to value. All values share the same type (boolean, string, number, or JSON object/array), and each serialized value stays within 10KB.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

maxLength512

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

updated\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, cursor }

</summary>

count: number

Number of items returned in this page.

minimum0

<a href="#">Link to this property</a>

cursor: string

Cursor to pass back to fetch the next page, or null when this is the last page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20flagship.apps.flags%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List flags

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps/$APP_ID/flags \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "default_variation": "x",
      "enabled": true,
      "key": "x",
      "rules": [
        {
          "conditions": [
            {
              "attribute": "x",
              "operator": "equals",
              "value": "string"
            }
          ],
          "priority": 1,
          "serve_variation": "x",
          "rollout": {
            "percentage": 0,
            "attribute": "x"
          }
        }
      ],
      "type": "boolean",
      "variations": {
        "foo": "string"
      },
      "description": "description",
      "updated_at": "updated_at",
      "updated_by": "updated_by"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor"
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
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "default_variation": "x",
      "enabled": true,
      "key": "x",
      "rules": [
        {
          "conditions": [
            {
              "attribute": "x",
              "operator": "equals",
              "value": "string"
            }
          ],
          "priority": 1,
          "serve_variation": "x",
          "rollout": {
            "percentage": 0,
            "attribute": "x"
          }
        }
      ],
      "type": "boolean",
      "variations": {
        "foo": "string"
      },
      "description": "description",
      "updated_at": "updated_at",
      "updated_by": "updated_by"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor"
  },
  "success": true
}
```