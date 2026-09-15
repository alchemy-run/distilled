---
title: Delete an account or zone ruleset rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rulesets](https://developers.cloudflare.com/api/resources/rulesets)

[Rules](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete an account or zone ruleset rule

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/rulesets/{ruleset\_id}/rules/{rule\_id}

Deletes an existing rule from an account or zone ruleset.

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

`Mass URL Redirects Write``Magic Firewall Write``L4 DDoS Managed Ruleset Write``Transform Rules Write``Select Configuration Write``Account WAF Write``Account Rulesets Write``Logs Write`

##### P ath ParametersExpand Collapse

ruleset\_id: string

The unique ID of the ruleset.

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20ruleset_id%20%3E%20(schema)>)

rule\_id: string

The unique ID of the rule.

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20rule_id%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

dry\_run: optional boolean

Validates the request without persisting changes when set to `true`. Responses that normally return 200 return `result: null`; endpoints that normally return 204 continue to return 204.

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20dry_run%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code, source }

A list of error messages.

</summary>

message: string

A text description of this message.

minLength1

<a href="#">Link to this property</a>

code: optional number

A unique code for this message.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

The source of this message.

</summary>

pointer: string

A JSON pointer to the field that is the source of the message.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code, source }

A list of warning messages.

</summary>

message: string

A text description of this message.

minLength1

<a href="#">Link to this property</a>

code: optional number

A unique code for this message.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

The source of this message.

</summary>

pointer: string

A JSON pointer to the field that is the source of the message.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, kind, last\_updated, 5 more } or unknown

A result.

</summary>

One of the following:

<details>

<summary>

Ruleset object {id, kind, last\_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

<a href="#">Link to this property</a>

<details>

<summary>

kind: <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema)">Kind</a>

The kind of the ruleset.

</summary>

One of the following:

"managed"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

"root"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The human-readable name of the ruleset.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

phase: <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema)">Phase</a>

The phase of the ruleset.

</summary>

One of the following:

"ddos\_l4"

<a href="#">Link to this property</a>

"ddos\_l7"

<a href="#">Link to this property</a>

"http\_config\_settings"

<a href="#">Link to this property</a>

"http\_custom\_errors"

<a href="#">Link to this property</a>

"http\_log\_custom\_fields"

<a href="#">Link to this property</a>

"http\_ratelimit"

<a href="#">Link to this property</a>

"http\_request\_cache\_settings"

<a href="#">Link to this property</a>

"http\_request\_dynamic\_redirect"

<a href="#">Link to this property</a>

"http\_request\_firewall\_custom"

<a href="#">Link to this property</a>

"http\_request\_firewall\_managed"

<a href="#">Link to this property</a>

"http\_request\_late\_transform"

<a href="#">Link to this property</a>

"http\_request\_origin"

<a href="#">Link to this property</a>

"http\_request\_redirect"

<a href="#">Link to this property</a>

"http\_request\_sanitize"

<a href="#">Link to this property</a>

"http\_request\_sbfm"

<a href="#">Link to this property</a>

"http\_request\_transform"

<a href="#">Link to this property</a>

"http\_response\_cache\_settings"

<a href="#">Link to this property</a>

"http\_response\_compression"

<a href="#">Link to this property</a>

"http\_response\_firewall\_managed"

<a href="#">Link to this property</a>

"http\_response\_headers\_transform"

<a href="#">Link to this property</a>

"magic\_transit"

<a href="#">Link to this property</a>

"magic\_transit\_ids\_managed"

<a href="#">Link to this property</a>

"magic\_transit\_managed"

<a href="#">Link to this property</a>

"magic\_transit\_ratelimit"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rules: array of <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)">BlockRule</a> { last\_updated, version, id, 10 more } or object {id, action, enabled, 10 more } or <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)">CompressResponseRule</a> { last\_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)">BlockRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ChallengeRule object {id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

<a href="#">Link to this property</a>

action: "challenge"

The action to perform when the rule matches.

<a href="#">Link to this property</a>

enabled: boolean

Whether the rule should be executed.

<a href="#">Link to this property</a>

expression: string

The expression defining which traffic will match the rule.

minLength1

<a href="#">Link to this property</a>

last\_updated: string

The timestamp of when the rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

<a href="#">Link to this property</a>

version: string

The version of the rule.

<a href="#">Link to this property</a>

action\_parameters: optional unknown

The parameters configuring the rule’s action.

<a href="#">Link to this property</a>

categories: optional array of string

The categories of the rule.

<a href="#">Link to this property</a>

description: optional string

An informative description of the rule.

<a href="#">Link to this property</a>

<details>

<summary>

exposed\_credential\_check: optional object {password\_expression, username\_expression }

Configuration for exposed credential checking.

</summary>

password\_expression: string

An expression that selects the password used in the credentials check.

minLength1

<a href="#">Link to this property</a>

username\_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logging: optional <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)">Logging</a> { enabled }

An object configuring the rule’s logging behavior.

</summary>

enabled: boolean

Whether to generate a log when the rule matches.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ratelimit: optional object {characteristics, period, counting\_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

<a href="#">Link to this property</a>

period: number

Period in seconds over which the counter is being incremented.

minimum0

<a href="#">Link to this property</a>

counting\_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

<a href="#">Link to this property</a>

mitigation\_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

<a href="#">Link to this property</a>

requests\_per\_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

<a href="#">Link to this property</a>

requests\_to\_origin: optional boolean

Whether counting is only performed when an origin is reached.

<a href="#">Link to this property</a>

score\_per\_period: optional number

The score threshold per period for which the action will be executed the first time.

<a href="#">Link to this property</a>

score\_response\_header\_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ResponseCompressionRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)">CompressResponseRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DDoSDynamicRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)">DDoSDynamicRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExecuteRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)">ExecuteRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ForceConnectionCloseRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)">ForceConnectionCloseRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

JavaScriptChallengeRule object {id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

<a href="#">Link to this property</a>

action: "js\_challenge"

The action to perform when the rule matches.

<a href="#">Link to this property</a>

enabled: boolean

Whether the rule should be executed.

<a href="#">Link to this property</a>

expression: string

The expression defining which traffic will match the rule.

minLength1

<a href="#">Link to this property</a>

last\_updated: string

The timestamp of when the rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

<a href="#">Link to this property</a>

version: string

The version of the rule.

<a href="#">Link to this property</a>

action\_parameters: optional unknown

The parameters configuring the rule’s action.

<a href="#">Link to this property</a>

categories: optional array of string

The categories of the rule.

<a href="#">Link to this property</a>

description: optional string

An informative description of the rule.

<a href="#">Link to this property</a>

<details>

<summary>

exposed\_credential\_check: optional object {password\_expression, username\_expression }

Configuration for exposed credential checking.

</summary>

password\_expression: string

An expression that selects the password used in the credentials check.

minLength1

<a href="#">Link to this property</a>

username\_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logging: optional <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)">Logging</a> { enabled }

An object configuring the rule’s logging behavior.

</summary>

enabled: boolean

Whether to generate a log when the rule matches.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ratelimit: optional object {characteristics, period, counting\_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

<a href="#">Link to this property</a>

period: number

Period in seconds over which the counter is being incremented.

minimum0

<a href="#">Link to this property</a>

counting\_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

<a href="#">Link to this property</a>

mitigation\_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

<a href="#">Link to this property</a>

requests\_per\_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

<a href="#">Link to this property</a>

requests\_to\_origin: optional boolean

Whether counting is only performed when an origin is reached.

<a href="#">Link to this property</a>

score\_per\_period: optional number

The score threshold per period for which the action will be executed the first time.

<a href="#">Link to this property</a>

score\_response\_header\_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LogRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)">LogRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LogCustomFieldRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)">LogCustomFieldRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedChallengeRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)">ManagedChallengeRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RedirectRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)">RedirectRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RewriteRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)">RewriteRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RouteRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)">RouteRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ScoreRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)">ScoreRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ServeErrorRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)">ServeErrorRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SetCacheControlRule object {id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

<a href="#">Link to this property</a>

action: "set\_cache\_control"

The action to perform when the rule matches.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

The expression defining which traffic will match the rule.

minLength1

<a href="#">Link to this property</a>

last\_updated: string

The timestamp of when the rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

<a href="#">Link to this property</a>

version: string

The version of the rule.

<a href="#">Link to this property</a>

<details>

<summary>

action\_parameters: optional object {immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object {operation, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"max-age": optional object {operation, value, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, value, cloudflare\_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

The duration value in seconds for the directive.

minimum0

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"must-revalidate": optional object {operation, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"must-understand": optional object {operation, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"no-cache": optional object {operation, cloudflare\_only, qualifiers } or object {operation, cloudflare\_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"no-store": optional object {operation, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"no-transform": optional object {operation, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

private: optional object {operation, cloudflare\_only, qualifiers } or object {operation, cloudflare\_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"proxy-revalidate": optional object {operation, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

public: optional object {operation, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, cloudflare\_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"s-maxage": optional object {operation, value, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, value, cloudflare\_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

The duration value in seconds for the directive.

minimum0

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"stale-if-error": optional object {operation, value, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, value, cloudflare\_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

The duration value in seconds for the directive.

minimum0

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

"stale-while-revalidate": optional object {operation, value, cloudflare\_only } or object {operation, cloudflare\_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object {operation, value, cloudflare\_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

The duration value in seconds for the directive.

minimum0

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveDirective object {operation, cloudflare\_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set"or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

categories: optional array of string

The categories of the rule.

<a href="#">Link to this property</a>

description: optional string

An informative description of the rule.

<a href="#">Link to this property</a>

<details>

<summary>

exposed\_credential\_check: optional object {password\_expression, username\_expression }

Configuration for exposed credential checking.

</summary>

password\_expression: string

An expression that selects the password used in the credentials check.

minLength1

<a href="#">Link to this property</a>

username\_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logging: optional <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)">Logging</a> { enabled }

An object configuring the rule’s logging behavior.

</summary>

enabled: boolean

Whether to generate a log when the rule matches.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ratelimit: optional object {characteristics, period, counting\_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

<a href="#">Link to this property</a>

period: number

Period in seconds over which the counter is being incremented.

minimum0

<a href="#">Link to this property</a>

counting\_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

<a href="#">Link to this property</a>

mitigation\_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

<a href="#">Link to this property</a>

requests\_per\_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

<a href="#">Link to this property</a>

requests\_to\_origin: optional boolean

Whether counting is only performed when an origin is reached.

<a href="#">Link to this property</a>

score\_per\_period: optional number

The score threshold per period for which the action will be executed the first time.

<a href="#">Link to this property</a>

score\_response\_header\_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SetCacheSettingsRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)">SetCacheSettingsRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SetCacheTagsRule object {id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

<a href="#">Link to this property</a>

action: "set\_cache\_tags"

The action to perform when the rule matches.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

The expression defining which traffic will match the rule.

minLength1

<a href="#">Link to this property</a>

last\_updated: string

The timestamp of when the rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

<a href="#">Link to this property</a>

version: string

The version of the rule.

<a href="#">Link to this property</a>

<details>

<summary>

action\_parameters: optional object {operation, values } or object {expression, operation } or object {operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object {operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add"or "remove"or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

"set"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

values: array of string

A list of cache tag values.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AddCacheTagsExpression object {expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operation: "add"or "remove"or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

"set"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveCacheTagsValues object {operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add"or "remove"or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

"set"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

values: array of string

A list of cache tag values.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RemoveCacheTagsExpression object {expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operation: "add"or "remove"or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

"set"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SetCacheTagsValues object {operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add"or "remove"or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

"set"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

values: array of string

A list of cache tag values.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SetCacheTagsExpression object {expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

operation: "add"or "remove"or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

<a href="#">Link to this property</a>

"remove"

<a href="#">Link to this property</a>

"set"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

categories: optional array of string

The categories of the rule.

<a href="#">Link to this property</a>

description: optional string

An informative description of the rule.

<a href="#">Link to this property</a>

<details>

<summary>

exposed\_credential\_check: optional object {password\_expression, username\_expression }

Configuration for exposed credential checking.

</summary>

password\_expression: string

An expression that selects the password used in the credentials check.

minLength1

<a href="#">Link to this property</a>

username\_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logging: optional <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)">Logging</a> { enabled }

An object configuring the rule’s logging behavior.

</summary>

enabled: boolean

Whether to generate a log when the rule matches.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ratelimit: optional object {characteristics, period, counting\_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

<a href="#">Link to this property</a>

period: number

Period in seconds over which the counter is being incremented.

minimum0

<a href="#">Link to this property</a>

counting\_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

<a href="#">Link to this property</a>

mitigation\_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

<a href="#">Link to this property</a>

requests\_per\_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

<a href="#">Link to this property</a>

requests\_to\_origin: optional boolean

Whether counting is only performed when an origin is reached.

<a href="#">Link to this property</a>

score\_per\_period: optional number

The score threshold per period for which the action will be executed the first time.

<a href="#">Link to this property</a>

score\_response\_header\_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SetConfigurationRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)">SetConfigRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SkipRule = <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)">SkipRule</a> { last\_updated, version, id, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

action: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

ref: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TransformResponseHTMLRule object {id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

<a href="#">Link to this property</a>

action: "transform\_response\_html"

The action to perform when the rule matches.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

expression: string

The expression defining which traffic will match the rule.

minLength1

<a href="#">Link to this property</a>

last\_updated: string

The timestamp of when the rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

<a href="#">Link to this property</a>

version: string

The version of the rule.

<a href="#">Link to this property</a>

<details>

<summary>

action\_parameters: optional object {link\_maze }

The parameters configuring the rule’s action.

</summary>

link\_maze: unknown

Enables the link maze transformation on the response.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

categories: optional array of string

The categories of the rule.

<a href="#">Link to this property</a>

description: optional string

An informative description of the rule.

<a href="#">Link to this property</a>

<details>

<summary>

exposed\_credential\_check: optional object {password\_expression, username\_expression }

Configuration for exposed credential checking.

</summary>

password\_expression: string

An expression that selects the password used in the credentials check.

minLength1

<a href="#">Link to this property</a>

username\_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logging: optional <a href="https://developers.cloudflare.com/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)">Logging</a> { enabled }

An object configuring the rule’s logging behavior.

</summary>

enabled: boolean

Whether to generate a log when the rule matches.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ratelimit: optional object {characteristics, period, counting\_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

<a href="#">Link to this property</a>

period: number

Period in seconds over which the counter is being incremented.

minimum0

<a href="#">Link to this property</a>

counting\_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

<a href="#">Link to this property</a>

mitigation\_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

<a href="#">Link to this property</a>

requests\_per\_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

<a href="#">Link to this property</a>

requests\_to\_origin: optional boolean

Whether counting is only performed when an origin is reached.

<a href="#">Link to this property</a>

score\_per\_period: optional number

The score threshold per period for which the action will be executed the first time.

<a href="#">Link to this property</a>

score\_response\_header\_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: string

The version of the ruleset.

<a href="#">Link to this property</a>

description: optional string

An informative description of the ruleset.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unknown

Returned when dry\_run is true.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20rulesets.rules%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete an account or zone ruleset rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/rulesets/$RULESET_ID/rules/$RULE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "id": "2f2feab2026849078ba485f918791bdc",
    "kind": "root",
    "last_updated": "2000-01-01T00:00:00Z",
    "name": "My ruleset",
    "phase": "http_request_firewall_custom",
    "rules": [
      {
        "last_updated": "2000-01-01T00:00:00Z",
        "version": "1",
        "id": "id",
        "action": "action",
        "action_parameters": {
          "response": {
            "content": "{\n  \"success\": false,\n  \"error\": \"you have been blocked\"\n}",
            "content_type": "application/json",
            "status_code": 400
          }
        },
        "categories": [
          "directory-traversal"
        ],
        "description": "Block the request.",
        "enabled": true,
        "exposed_credential_check": {
          "password_expression": "url_decode(http.request.body.form[\\\"password\\\"][0])",
          "username_expression": "url_decode(http.request.body.form[\\\"username\\\"][0])"
        },
        "expression": "expression",
        "logging": {
          "enabled": true
        },
        "ratelimit": {
          "characteristics": [
            "cf.colo.id"
          ],
          "period": 60,
          "counting_expression": "http.request.body.raw eq \"abcd\"",
          "mitigation_timeout": 600,
          "requests_per_period": 1000,
          "requests_to_origin": true,
          "score_per_period": 400,
          "score_response_header_name": "my-score"
        },
        "ref": "ref"
      }
    ],
    "version": "1",
    "description": "A description for my ruleset."
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
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "id": "2f2feab2026849078ba485f918791bdc",
    "kind": "root",
    "last_updated": "2000-01-01T00:00:00Z",
    "name": "My ruleset",
    "phase": "http_request_firewall_custom",
    "rules": [
      {
        "last_updated": "2000-01-01T00:00:00Z",
        "version": "1",
        "id": "id",
        "action": "action",
        "action_parameters": {
          "response": {
            "content": "{\n  \"success\": false,\n  \"error\": \"you have been blocked\"\n}",
            "content_type": "application/json",
            "status_code": 400
          }
        },
        "categories": [
          "directory-traversal"
        ],
        "description": "Block the request.",
        "enabled": true,
        "exposed_credential_check": {
          "password_expression": "url_decode(http.request.body.form[\\\"password\\\"][0])",
          "username_expression": "url_decode(http.request.body.form[\\\"username\\\"][0])"
        },
        "expression": "expression",
        "logging": {
          "enabled": true
        },
        "ratelimit": {
          "characteristics": [
            "cf.colo.id"
          ],
          "period": 60,
          "counting_expression": "http.request.body.raw eq \"abcd\"",
          "mitigation_timeout": 600,
          "requests_per_period": 1000,
          "requests_to_origin": true,
          "score_per_period": 400,
          "score_response_header_name": "my-score"
        },
        "ref": "ref"
      }
    ],
    "version": "1",
    "description": "A description for my ruleset."
  },
  "success": true
}
```