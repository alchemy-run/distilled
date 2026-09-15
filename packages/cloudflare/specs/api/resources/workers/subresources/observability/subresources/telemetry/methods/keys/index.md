---
title: List keys
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Observability](https://developers.cloudflare.com/api/resources/workers/subresources/observability)

[Telemetry](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/telemetry)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List keys

POST/accounts/{account\_id}/workers/observability/telemetry/keys

List all the keys in your telemetry events.

##### Security

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>User Service Key</summary>



Used when interacting with the Origin CA certificates API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/#viewchange-your-origin-ca-keys">View/change your key</a>.

**Example:**<code>X-Auth-User-Service-Key: v1.0-144c9defac04969c7bfad8ef-631a41d003a32d25fe878081ef365c49503f7fada600da935e2851a1c7326084b85cbf6429c4b859de8475731dc92a9c329631e6d59e6c73da7b198497172b4cefe071d90d0f5d2719</code>

</details>

##### Accepted Permissions (at least one required)

`Workers Observability Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

datasets: optional array of string

Leave this empty to use the default datasets

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(params)%200%20%3E%20(param)%20datasets%20%3E%20(schema)>)

<details>

<summary>

filters: optional array of object {filterCombination, filters, kind } or object {key, operation, type, 2 more }

Apply filters to narrow key discovery. Supports nested groups via kind: ‘group’. Maximum nesting depth is 4.

</summary>

One of the following:

<details>

<summary>

object {filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and"or "or"or "AND"or "OR"

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

filters: array of object {filterCombination, filters, kind } or object {key, operation, type, 2 more }

</summary>

One of the following:

<details>

<summary>

object {filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and"or "or"or "AND"or "OR"

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filters: array of unknown

<a href="#">Link to this property</a>

kind: "group"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersObservabilityFilterLeaf object {key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

<a href="#">Link to this property</a>

<details>

<summary>

operation: "includes"or "not\_includes"or "starts\_with"or 27 more

Comparison operator. String operators: includes, not\_includes, starts\_with, ends\_with, regex. Existence: exists, is\_null. Set membership: in, not\_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

<a href="#">Link to this property</a>

"not\_includes"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"regex"

<a href="#">Link to this property</a>

"exists"

<a href="#">Link to this property</a>

"is\_null"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

"="

<a href="#">Link to this property</a>

"!="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"INCLUDES"

<a href="#">Link to this property</a>

"DOES\_NOT\_INCLUDE"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"EXISTS"

<a href="#">Link to this property</a>

"DOES\_NOT\_EXIST"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"NOT\_IN"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "string"or "number"or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor numberor boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

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

</details>

<a href="#">Link to this property</a>

kind: "group"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersObservabilityFilterLeaf object {key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

<a href="#">Link to this property</a>

<details>

<summary>

operation: "includes"or "not\_includes"or "starts\_with"or 27 more

Comparison operator. String operators: includes, not\_includes, starts\_with, ends\_with, regex. Existence: exists, is\_null. Set membership: in, not\_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

<a href="#">Link to this property</a>

"not\_includes"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"regex"

<a href="#">Link to this property</a>

"exists"

<a href="#">Link to this property</a>

"is\_null"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

"="

<a href="#">Link to this property</a>

"!="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"INCLUDES"

<a href="#">Link to this property</a>

"DOES\_NOT\_INCLUDE"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"EXISTS"

<a href="#">Link to this property</a>

"DOES\_NOT\_EXIST"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"NOT\_IN"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "string"or "number"or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor numberor boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

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

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(params)%200%20%3E%20(param)%20filters%20%3E%20(schema)>)

from: optional number

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(params)%200%20%3E%20(param)%20from%20%3E%20(schema)>)

<details>

<summary>

keyNeedle: optional object {value, isRegex, matchCase }

If the user suggests a key, use this to narrow down the list of keys returned. Make sure matchCase is false to avoid case sensitivity issues.

</summary>

<details>

<summary>

value: stringor numberor boolean

The text or pattern to search for.

maxLength1000

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

isRegex: optional boolean

When true, treats the value as a regular expression (RE2 syntax).

<a href="#">Link to this property</a>

matchCase: optional boolean

When true, performs a case-sensitive search. Defaults to case-insensitive.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(params)%200%20%3E%20(param)%20keyNeedle%20%3E%20(schema)>)

limit: optional number

Advanced usage: set limit=1000+ to retrieve comprehensive key options without needing additional filtering.

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(params)%200%20%3E%20(param)%20limit%20%3E%20(schema)>)

<details>

<summary>

needle: optional object {value, isRegex, matchCase }

Search for a specific substring in any of the events

</summary>

<details>

<summary>

value: stringor numberor boolean

The text or pattern to search for.

maxLength1000

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

isRegex: optional boolean

When true, treats the value as a regular expression (RE2 syntax).

<a href="#">Link to this property</a>

matchCase: optional boolean

When true, performs a case-sensitive search. Defaults to case-insensitive.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(params)%200%20%3E%20(param)%20needle%20%3E%20(schema)>)

to: optional number

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(params)%200%20%3E%20(param)%20to%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message }

</summary>

message: "Successful request"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {key, lastSeenAt, type }

</summary>

key: string

<a href="#">Link to this property</a>

lastSeenAt: number

<a href="#">Link to this property</a>

<details>

<summary>

type: "string"or "boolean"or "number"

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(method)%20keys%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List keys

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/keys \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "key": "key",
      "lastSeenAt": 0,
      "type": "string"
    }
  ],
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
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "key": "key",
      "lastSeenAt": 0,
      "type": "string"
    }
  ],
  "success": true
}
```