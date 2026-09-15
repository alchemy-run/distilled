##### [List account or zone rulesets](/api/resources/rulesets/methods/list)

GET/{accounts_or_zones}/{account_or_zone_id}/rulesets

##### [Get an account or zone ruleset](/api/resources/rulesets/methods/get)

GET/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}

##### [Create an account or zone ruleset](/api/resources/rulesets/methods/create)

POST/{accounts_or_zones}/{account_or_zone_id}/rulesets

##### [Update an account or zone ruleset](/api/resources/rulesets/methods/update)

PUT/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}

##### [Delete an account or zone ruleset](/api/resources/rulesets/methods/delete)

DELETE/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}

##### Models

<details>

<summary>

Kind = "managed" or "custom" or "root" or "zone"

The kind of the ruleset.

</summary>

One of the following:

"managed"

[Link to this property](#)

"custom"

[Link to this property](#)

"root"

[Link to this property](#)

"zone"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Phase = "ddos_l4" or "ddos_l7" or "http_config_settings" or 21 more

The phase of the ruleset.

</summary>

One of the following:

"ddos_l4"

[Link to this property](#)

"ddos_l7"

[Link to this property](#)

"http_config_settings"

[Link to this property](#)

"http_custom_errors"

[Link to this property](#)

"http_log_custom_fields"

[Link to this property](#)

"http_ratelimit"

[Link to this property](#)

"http_request_cache_settings"

[Link to this property](#)

"http_request_dynamic_redirect"

[Link to this property](#)

"http_request_firewall_custom"

[Link to this property](#)

"http_request_firewall_managed"

[Link to this property](#)

"http_request_late_transform"

[Link to this property](#)

"http_request_origin"

[Link to this property](#)

"http_request_redirect"

[Link to this property](#)

"http_request_sanitize"

[Link to this property](#)

"http_request_sbfm"

[Link to this property](#)

"http_request_transform"

[Link to this property](#)

"http_response_cache_settings"

[Link to this property](#)

"http_response_compression"

[Link to this property](#)

"http_response_firewall_managed"

[Link to this property](#)

"http_response_headers_transform"

[Link to this property](#)

"magic_transit"

[Link to this property](#)

"magic_transit_ids_managed"

[Link to this property](#)

"magic_transit_managed"

[Link to this property](#)

"magic_transit_ratelimit"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ruleset object { id, last_updated, version, 2 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

name: optional string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RulesetListResponse object { id, kind, last_updated, 4 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RulesetGetResponse object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RulesetCreateResponse = object { id, kind, last_updated, 5 more } or unknown

A result.

</summary>

One of the following:

<details>

<summary>

Ruleset object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

unknown

Returned when dry_run is true.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RulesetUpdateResponse = object { id, kind, last_updated, 5 more } or unknown

A result.

</summary>

One of the following:

<details>

<summary>

Ruleset object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

unknown

Returned when dry_run is true.

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get an account or zone entry point ruleset](/api/resources/rulesets/subresources/phases/methods/get)

GET/{accounts_or_zones}/{account_or_zone_id}/rulesets/phases/{ruleset_phase}/entrypoint

##### [Update an account or zone entry point ruleset](/api/resources/rulesets/subresources/phases/methods/update)

PUT/{accounts_or_zones}/{account_or_zone_id}/rulesets/phases/{ruleset_phase}/entrypoint

##### Models

<details>

<summary>

PhaseGetResponse object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PhaseUpdateResponse = object { id, kind, last_updated, 5 more } or unknown

A result.

</summary>

One of the following:

<details>

<summary>

Ruleset object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

unknown

Returned when dry_run is true.

[Link to this property](#)

</details>

[Link to this property](#)

##### [List an account or zone entry point ruleset's versions](/api/resources/rulesets/subresources/phases/subresources/versions/methods/list)

GET/{accounts_or_zones}/{account_or_zone_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions

##### [Get an account or zone entry point ruleset version](/api/resources/rulesets/subresources/phases/subresources/versions/methods/get)

GET/{accounts_or_zones}/{account_or_zone_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}

##### Models

<details>

<summary>

VersionListResponse object { id, kind, last_updated, 4 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VersionGetResponse object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

##### [Create an account or zone ruleset rule](/api/resources/rulesets/subresources/rules/methods/create)

POST/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/rules

##### [Update an account or zone ruleset rule](/api/resources/rulesets/subresources/rules/methods/edit)

PATCH/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/rules/{rule_id}

##### [Delete an account or zone ruleset rule](/api/resources/rulesets/subresources/rules/methods/delete)

DELETE/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/rules/{rule_id}

##### Models

<details>

<summary>

BlockRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "block"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { response }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

response: optional object { content, content_type, status_code }

The response to show when the block is applied.

</summary>

content: string

The content to return.

minLength1

[Link to this property](#)

content_type: string

The type of the content to return.

minLength1

[Link to this property](#)

status_code: number

The status code to return.

maximum499

minimum400

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CompressResponseRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "compress_response"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { algorithms }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

algorithms: array of object { name }

Custom order for compression algorithms.

</summary>

<details>

<summary>

name: optional "none" or "auto" or "default" or 3 more

Name of the compression algorithm to enable.

</summary>

One of the following:

"none"

[Link to this property](#)

"auto"

[Link to this property](#)

"default"

[Link to this property](#)

"gzip"

[Link to this property](#)

"brotli"

[Link to this property](#)

"zstd"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "ddos_dynamic"

The action to perform when the rule matches.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "execute"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { id, matched_data, overrides }

The parameters configuring the rule’s action.

</summary>

id: string

The ID of the ruleset to execute.

[Link to this property](#)

<details>

<summary>

matched_data: optional object { public_key }

The configuration to use for matched data logging.

</summary>

public_key: string

The public key to encrypt matched data logs with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

overrides: optional object { action, categories, enabled, 2 more }

A set of overrides to apply to the target ruleset.

</summary>

action: optional string

An action to override all rules with. This option has lower precedence than rule and category overrides.

[Link to this property](#)

<details>

<summary>

categories: optional array of object { category, action, enabled, sensitivity_level }

A list of category-level overrides. This option has the second-highest precedence after rule-level overrides.

</summary>

category: string

The name of the category to override.

minLength1

[Link to this property](#)

action: optional string

The action to override rules in the category with.

[Link to this property](#)

enabled: optional boolean

Whether to enable execution of rules in the category.

[Link to this property](#)

<details>

<summary>

sensitivity_level: optional "default" or "medium" or "low" or "eoff"

The sensitivity level to use for rules in the category. This option is only applicable for DDoS phases.

</summary>

One of the following:

"default"

[Link to this property](#)

"medium"

[Link to this property](#)

"low"

[Link to this property](#)

"eoff"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

enabled: optional boolean

Whether to enable execution of all rules. This option has lower precedence than rule and category overrides.

[Link to this property](#)

<details>

<summary>

rules: optional array of object { id, action, enabled, 2 more }

A list of rule-level overrides. This option has the highest precedence.

</summary>

id: string

The ID of the rule to override.

[Link to this property](#)

action: optional string

The action to override the rule with.

[Link to this property](#)

enabled: optional boolean

Whether to enable execution of the rule.

[Link to this property](#)

score_threshold: optional number

The score threshold to use for the rule.

[Link to this property](#)

<details>

<summary>

sensitivity_level: optional "default" or "medium" or "low" or "eoff"

The sensitivity level to use for the rule. This option is only applicable for DDoS phases.

</summary>

One of the following:

"default"

[Link to this property](#)

"medium"

[Link to this property](#)

"low"

[Link to this property](#)

"eoff"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sensitivity_level: optional "default" or "medium" or "low" or "eoff"

A sensitivity level to set for all rules. This option has lower precedence than rule and category overrides and is only applicable for DDoS phases.

</summary>

One of the following:

"default"

[Link to this property](#)

"medium"

[Link to this property](#)

"low"

[Link to this property](#)

"eoff"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "force_connection_close"

The action to perform when the rule matches.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "log_custom_field"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { cookie_fields, raw_response_fields, request_fields, 2 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

cookie_fields: optional array of object { name }

The cookie fields to log.

</summary>

name: string

The name of the cookie.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

raw_response_fields: optional array of object { name, preserve_duplicates }

The raw response fields to log.

</summary>

name: string

The name of the response header.

minLength1

[Link to this property](#)

preserve_duplicates: optional boolean

Whether to log duplicate values of the same header.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

request_fields: optional array of object { name }

The raw request fields to log.

</summary>

name: string

The name of the header.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

response_fields: optional array of object { name, preserve_duplicates }

The transformed response fields to log.

</summary>

name: string

The name of the response header.

minLength1

[Link to this property](#)

preserve_duplicates: optional boolean

Whether to log duplicate values of the same header.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transformed_request_fields: optional array of object { name }

The transformed request fields to log.

</summary>

name: string

The name of the header.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "log"

The action to perform when the rule matches.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Logging object { enabled }

An object configuring the rule’s logging behavior.

</summary>

enabled: boolean

Whether to generate a log when the rule matches.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "managed_challenge"

The action to perform when the rule matches.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "redirect"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { from_list, from_value }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

from_list: optional object { key, name }

A redirect based on a bulk list lookup.

</summary>

key: string

An expression that evaluates to the list lookup key.

minLength1

[Link to this property](#)

name: string

The name of the list to match against.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

from_value: optional object { target_url, preserve_query_string, status_code }

A redirect based on the request properties.

</summary>

<details>

<summary>

target_url: object { expression, value }

A URL to redirect the request to.

</summary>

expression: optional string

An expression that evaluates to a URL to redirect the request to.

minLength1

[Link to this property](#)

value: optional string

A URL to redirect the request to.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

preserve_query_string: optional boolean

Whether to keep the query string of the original request.

[Link to this property](#)

<details>

<summary>

status_code: optional 301 or 302 or 303 or 2 more

The status code to use for the redirect.

</summary>

One of the following:

301

[Link to this property](#)

302

[Link to this property](#)

303

[Link to this property](#)

307

[Link to this property](#)

308

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "rewrite"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { headers, uri }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

headers: optional map[object { operation, value } or object { expression, operation } or object { operation, value } or 2 more]

A map of headers to rewrite.

</summary>

One of the following:

<details>

<summary>

AddStaticHeader object { operation, value }

A header with a static value to add.

</summary>

operation: "add"

The operation to perform on the header.

[Link to this property](#)

value: string

A static value for the header.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddDynamicHeader object { expression, operation }

A header with a dynamic value to add.

</summary>

expression: string

An expression that evaluates to a value for the header.

minLength1

[Link to this property](#)

operation: "add"

The operation to perform on the header.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetStaticHeader object { operation, value }

A header with a static value to set.

</summary>

operation: "set"

The operation to perform on the header.

[Link to this property](#)

value: string

A static value for the header.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetDynamicHeader object { expression, operation }

A header with a dynamic value to set.

</summary>

expression: string

An expression that evaluates to a value for the header.

minLength1

[Link to this property](#)

operation: "set"

The operation to perform on the header.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveHeader object { operation }

A header to remove.

</summary>

operation: "remove"

The operation to perform on the header.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

uri: optional object { path, origin } or object { query, origin }

A URI path rewrite.

</summary>

One of the following:

<details>

<summary>

URIPath object { path, origin }

A URI path rewrite.

</summary>

<details>

<summary>

path: object { expression, value }

A URI path rewrite.

</summary>

expression: optional string

An expression that evaluates to a value to rewrite the URI path to.

minLength1

[Link to this property](#)

value: optional string

A value to rewrite the URI path to.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

origin: optional boolean

Whether to propagate the rewritten URI to origin.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIQuery object { query, origin }

A URI query rewrite.

</summary>

<details>

<summary>

query: object { expression, value }

A URI query rewrite.

</summary>

expression: optional string

An expression that evaluates to a value to rewrite the URI query to.

minLength1

[Link to this property](#)

value: optional string

A value to rewrite the URI query to.

[Link to this property](#)

</details>

[Link to this property](#)

origin: optional boolean

Whether to propagate the rewritten URI to origin.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "route"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { host_header, origin, sni }

The parameters configuring the rule’s action.

</summary>

host_header: optional string

A value to rewrite the HTTP host header to.

minLength1

[Link to this property](#)

<details>

<summary>

origin: optional object { host, port }

An origin to route to.

</summary>

host: optional string

A resolved host to route to.

minLength1

[Link to this property](#)

port: optional number

A destination port to route to.

maximum65535

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sni: optional object { value }

A Server Name Indication (SNI) override.

</summary>

value: string

A value to override the SNI to.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RulesetRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional string

The action to perform when the rule matches.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

Whether the rule should be executed.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "score"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { increment }

The parameters configuring the rule’s action.

</summary>

increment: number

A delta to change the score by, which can be either positive or negative.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "serve_error"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { content, content_type, status_code } or object { asset_name, content_type, status_code }

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

ActionParametersContent object { content, content_type, status_code }

</summary>

content: string

The response content.

minLength1

[Link to this property](#)

<details>

<summary>

content_type: optional "application/json" or "text/html" or "text/plain" or "text/xml"

The content type header to set with the error response.

</summary>

One of the following:

"application/json"

[Link to this property](#)

"text/html"

[Link to this property](#)

"text/plain"

[Link to this property](#)

"text/xml"

[Link to this property](#)

</details>

[Link to this property](#)

status_code: optional number

The status code to use for the error.

maximum999

minimum400

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ActionParametersAsset object { asset_name, content_type, status_code }

</summary>

asset_name: string

The name of a custom asset to serve as the error response.

minLength1

[Link to this property](#)

<details>

<summary>

content_type: optional "application/json" or "text/html" or "text/plain" or "text/xml"

The content type header to set with the error response.

</summary>

One of the following:

"application/json"

[Link to this property](#)

"text/html"

[Link to this property](#)

"text/plain"

[Link to this property](#)

"text/xml"

[Link to this property](#)

</details>

[Link to this property](#)

status_code: optional number

The status code to use for the error.

maximum999

minimum400

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "set_cache_settings"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { additional_cacheable_ports, browser_ttl, cache, 14 more }

The parameters configuring the rule’s action.

</summary>

additional_cacheable_ports: optional array of number

A list of additional ports that caching should be enabled on.

[Link to this property](#)

<details>

<summary>

browser_ttl: optional object { mode, default }

How long client browsers should cache the response. Cloudflare cache purge will not purge content cached on client browsers, so high browser TTLs may lead to stale content.

</summary>

<details>

<summary>

mode: "respect_origin" or "bypass_by_default" or "override_origin" or "bypass"

The browser TTL mode.

</summary>

One of the following:

"respect_origin"

[Link to this property](#)

"bypass_by_default"

[Link to this property](#)

"override_origin"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

default: optional number

The browser TTL (in seconds) if you choose the “override_origin” mode.

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

cache: optional boolean

Whether the request’s response from the origin is eligible for caching. Caching itself will still depend on the cache control header and your other caching configurations.

[Link to this property](#)

<details>

<summary>

cache_key: optional object { cache_by_device_type, cache_deception_armor, custom_key, ignore_query_strings_order }

Which components of the request are included in or excluded from the cache key Cloudflare uses to store the response in cache.

</summary>

cache_by_device_type: optional boolean

Whether to separate cached content based on the visitor’s device type.

[Link to this property](#)

cache_deception_armor: optional boolean

Whether to protect from web cache deception attacks, while allowing static assets to be cached.

[Link to this property](#)

<details>

<summary>

custom_key: optional object { cookie, header, host, 2 more }

Which components of the request are included or excluded from the cache key.

</summary>

<details>

<summary>

cookie: optional object { check_presence, include }

Which cookies to include in the cache key.

</summary>

check_presence: optional array of string

A list of cookies to check for the presence of. The presence of these cookies is included in the cache key.

[Link to this property](#)

include: optional array of string

A list of cookies to include in the cache key.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

header: optional object { check_presence, contains, exclude_origin, include }

Which headers to include in the cache key.

</summary>

check_presence: optional array of string

A list of headers to check for the presence of. The presence of these headers is included in the cache key.

[Link to this property](#)

contains: optional map[array of string]

A mapping of header names to a list of values. If a header is present in the request and contains any of the values provided, its value is included in the cache key.

[Link to this property](#)

exclude_origin: optional boolean

Whether to exclude the origin header in the cache key.

[Link to this property](#)

include: optional array of string

A list of headers to include in the cache key.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

host: optional object { resolved }

How to use the host in the cache key.

</summary>

resolved: optional boolean

Whether to use the resolved host in the cache key.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

query_string: optional object { exclude, include }

Which query string parameters to include in or exclude from the cache key.

</summary>

<details>

<summary>

exclude: optional object { all, list }

Which query string parameters to exclude from the cache key.

</summary>

all: optional true

Whether to exclude all query string parameters from the cache key.

[Link to this property](#)

list: optional array of string

A list of query string parameters to exclude from the cache key.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional object { all, list }

Which query string parameters to include in the cache key.

</summary>

all: optional true

Whether to include all query string parameters in the cache key.

[Link to this property](#)

list: optional array of string

A list of query string parameters to include in the cache key.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

user: optional object { device_type, geo, lang }

How to use characteristics of the request user agent in the cache key.

</summary>

device_type: optional boolean

Whether to use the user agent’s device type in the cache key.

[Link to this property](#)

geo: optional boolean

Whether to use the user agents’s country in the cache key.

[Link to this property](#)

lang: optional boolean

Whether to use the user agent’s language in the cache key.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

ignore_query_strings_order: optional boolean

Whether to treat requests with the same query parameters the same, regardless of the order those query parameters are in.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

cache_reserve: optional object { eligible, minimum_file_size }

Settings to determine whether the request’s response from origin is eligible for Cache Reserve (requires a Cache Reserve add-on plan).

</summary>

eligible: boolean

Whether Cache Reserve is enabled. If this is true and a request meets eligibility criteria, Cloudflare will write the resource to Cache Reserve.

[Link to this property](#)

minimum_file_size: optional number

The minimum file size eligible for storage in Cache Reserve.

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

edge_ttl: optional object { mode, default, status_code_ttl }

How long the Cloudflare edge network should cache the response.

</summary>

<details>

<summary>

mode: "respect_origin" or "bypass_by_default" or "override_origin"

The edge TTL mode.

</summary>

One of the following:

"respect_origin"

[Link to this property](#)

"bypass_by_default"

[Link to this property](#)

"override_origin"

[Link to this property](#)

</details>

[Link to this property](#)

default: optional number

The edge TTL (in seconds) if you choose the “override_origin” mode.

minimum0

[Link to this property](#)

<details>

<summary>

status_code_ttl: optional array of object { value, status_code, status_code_range }

A list of TTLs to apply to specific status codes or status code ranges.

</summary>

value: number

The time to cache the response for (in seconds). A value of 0 is equivalent to setting the cache control header with the value “no-cache”. A value of -1 is equivalent to setting the cache control header with the value of “no-store”.

[Link to this property](#)

status_code: optional number

A single status code to apply the TTL to.

maximum999

minimum100

[Link to this property](#)

<details>

<summary>

status_code_range: optional object { from, to }

A range of status codes to apply the TTL to.

</summary>

from: optional number

The lower bound of the range.

maximum999

minimum100

[Link to this property](#)

to: optional number

The upper bound of the range.

maximum999

minimum100

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

origin_cache_control: optional boolean

Whether Cloudflare will aim to strictly adhere to RFC 7234.

[Link to this property](#)

origin_error_page_passthru: optional boolean

Whether to generate Cloudflare error pages for issues from the origin server.

[Link to this property](#)

<details>

<summary>

origin_range_requests: optional object { mode }

Controls whether Cloudflare fetches a large asset from the origin as a series of range requests instead of one whole-body request.

</summary>

<details>

<summary>

mode: "on" or "off" or "default"

Whether to use range requests. `default` is the behaviour the zone gets without this rule.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"default"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

read_timeout: optional number

A timeout value between two successive read operations to use for your origin server. Historically, the timeout value between two read options from Cloudflare to an origin server is 100 seconds. If you are attempting to reduce HTTP 524 errors because of timeouts from an origin server, try increasing this timeout value.

maximum6000

minimum100

[Link to this property](#)

respect_strong_etags: optional boolean

Whether Cloudflare should respect strong ETag (entity tag) headers. If false, Cloudflare converts strong ETag headers to weak ETag headers.

[Link to this property](#)

<details>

<summary>

serve_stale: optional object { disable_stale_while_updating }

When to serve stale content from cache.

</summary>

disable_stale_while_updating: optional boolean

Whether Cloudflare should disable serving stale content while getting the latest content from the origin.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

shared_dictionary: optional object { match_pattern }

Configuration for shared dictionary compression. When set, Cloudflare injects Use-As-Dictionary headers on matching cacheable responses.

</summary>

match_pattern: string

URL pattern for the Use-As-Dictionary match field. This pattern specifies which URLs can use this response as a dictionary.

maxLength1024

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

strip_etags: optional boolean

Whether to strip ETag headers from the origin response before caching.

[Link to this property](#)

strip_last_modified: optional boolean

Whether to strip Last-Modified headers from the origin response before caching.

[Link to this property](#)

strip_set_cookie: optional boolean

Whether to strip Set-Cookie headers from the origin response before caching.

[Link to this property](#)

<details>

<summary>

vary: optional object { default, headers }

Controls how cached responses vary based on request headers. `default` is required by the API and applies to any Vary response header that does not have a per-header override.

</summary>

<details>

<summary>

default: optional object { action }

Controls how response Vary headers without a per-header override contribute to the cache key.

</summary>

<details>

<summary>

action: "bypass" or "passthrough" or "normalize"

How the header value is treated when building the cache key.

</summary>

One of the following:

"bypass"

[Link to this property](#)

"passthrough"

[Link to this property](#)

"normalize"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

headers: optional map[object { action, languages, media_types } ]

A mapping of lowercase request header names to their vary configuration.

</summary>

<details>

<summary>

action: "bypass" or "passthrough" or "normalize"

How the header value is treated when building the cache key.

</summary>

One of the following:

"bypass"

[Link to this property](#)

"passthrough"

[Link to this property](#)

"normalize"

[Link to this property](#)

</details>

[Link to this property](#)

languages: optional array of string

The set of languages to normalize against. Only valid for the `accept-language` header.

[Link to this property](#)

media_types: optional array of string

The set of media types to normalize against. Only valid for the `accept` header.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "set_config"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { automatic_https_rewrites, autominify, bic, 19 more }

The parameters configuring the rule’s action.

</summary>

automatic_https_rewrites: optional boolean

Whether to enable Automatic HTTPS Rewrites.

[Link to this property](#)

<details>

<summary>

autominify: optional object { css, html, js }

Which file extensions to minify automatically.

</summary>

css: optional boolean

Whether to minify CSS files.

[Link to this property](#)

html: optional boolean

Whether to minify HTML files.

[Link to this property](#)

js: optional boolean

Whether to minify JavaScript files.

[Link to this property](#)

</details>

[Link to this property](#)

bic: optional boolean

Whether to enable Browser Integrity Check (BIC).

[Link to this property](#)

content_converter: optional boolean

Whether to enable content conversion (e.g., HTML to Markdown).

[Link to this property](#)

Deprecateddisable_apps: optional true

Cloudflare Apps are deprected.

Whether to disable Cloudflare Apps.

[Link to this property](#)

disable_pay_per_crawl: optional true

Whether to disable Pay Per Crawl.

[Link to this property](#)

disable_rum: optional true

Whether to disable Real User Monitoring (RUM).

[Link to this property](#)

disable_zaraz: optional true

Whether to disable Zaraz.

[Link to this property](#)

email_obfuscation: optional boolean

Whether to enable Email Obfuscation.

[Link to this property](#)

fonts: optional boolean

Whether to enable Cloudflare Fonts.

[Link to this property](#)

hotlink_protection: optional boolean

Whether to enable Hotlink Protection.

[Link to this property](#)

Deprecatedmirage: optional boolean

Mirage is deprecated. More information at https://developers.cloudflare.com/speed/optimization/images/mirage/.

Whether to enable Mirage.

[Link to this property](#)

opportunistic_encryption: optional boolean

Whether to enable Opportunistic Encryption.

[Link to this property](#)

<details>

<summary>

polish: optional "off" or "lossless" or "lossy" or "webp"

The Polish level to configure.

</summary>

One of the following:

"off"

[Link to this property](#)

"lossless"

[Link to this property](#)

"lossy"

[Link to this property](#)

"webp"

[Link to this property](#)

</details>

[Link to this property](#)

redirects_for_ai_training: optional boolean

Whether to redirect verified AI training crawlers to canonical URLs found in the HTML response.

[Link to this property](#)

<details>

<summary>

request_body_buffering: optional "none" or "standard" or "full"

The request body buffering mode.

</summary>

One of the following:

"none"

[Link to this property](#)

"standard"

[Link to this property](#)

"full"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

response_body_buffering: optional "none" or "standard"

The response body buffering mode.

</summary>

One of the following:

"none"

[Link to this property](#)

"standard"

[Link to this property](#)

</details>

[Link to this property](#)

rocket_loader: optional boolean

Whether to enable Rocket Loader.

[Link to this property](#)

<details>

<summary>

security_level: optional "off" or "essentially_off" or "low" or 3 more

The Security Level to configure.

</summary>

One of the following:

"off"

[Link to this property](#)

"essentially_off"

[Link to this property](#)

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"under_attack"

[Link to this property](#)

</details>

[Link to this property](#)

server_side_excludes: optional boolean

Whether to enable Server-Side Excludes.

[Link to this property](#)

<details>

<summary>

ssl: optional "off" or "flexible" or "full" or 2 more

The SSL level to configure.

</summary>

One of the following:

"off"

[Link to this property](#)

"flexible"

[Link to this property](#)

"full"

[Link to this property](#)

"strict"

[Link to this property](#)

"origin_pull"

[Link to this property](#)

</details>

[Link to this property](#)

Deprecatedsxg: optional boolean

Signed Exchanges (SXG) is deprecated.

Whether to enable Signed Exchanges (SXG).

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule object { last_updated, version, id, 10 more }

</summary>

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

id: optional string

The unique ID of the rule.

[Link to this property](#)

action: optional "skip"

The action to perform when the rule matches.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { phase, phases, products, 3 more }

The parameters configuring the rule’s action.

</summary>

phase: optional "current"

A phase to skip the execution of. This option is only compatible with the products option.

[Link to this property](#)

<details>

<summary>

phases: optional array of [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

A list of phases to skip the execution of. This option is incompatible with the rulesets option.

</summary>

One of the following:

"ddos_l4"

[Link to this property](#)

"ddos_l7"

[Link to this property](#)

"http_config_settings"

[Link to this property](#)

"http_custom_errors"

[Link to this property](#)

"http_log_custom_fields"

[Link to this property](#)

"http_ratelimit"

[Link to this property](#)

"http_request_cache_settings"

[Link to this property](#)

"http_request_dynamic_redirect"

[Link to this property](#)

"http_request_firewall_custom"

[Link to this property](#)

"http_request_firewall_managed"

[Link to this property](#)

"http_request_late_transform"

[Link to this property](#)

"http_request_origin"

[Link to this property](#)

"http_request_redirect"

[Link to this property](#)

"http_request_sanitize"

[Link to this property](#)

"http_request_sbfm"

[Link to this property](#)

"http_request_transform"

[Link to this property](#)

"http_response_cache_settings"

[Link to this property](#)

"http_response_compression"

[Link to this property](#)

"http_response_firewall_managed"

[Link to this property](#)

"http_response_headers_transform"

[Link to this property](#)

"magic_transit"

[Link to this property](#)

"magic_transit_ids_managed"

[Link to this property](#)

"magic_transit_managed"

[Link to this property](#)

"magic_transit_ratelimit"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

products: optional array of "bic" or "hot" or "rateLimit" or 4 more

A list of legacy security products to skip the execution of.

</summary>

One of the following:

"bic"

[Link to this property](#)

"hot"

[Link to this property](#)

"rateLimit"

[Link to this property](#)

"securityLevel"

[Link to this property](#)

"uaBlock"

[Link to this property](#)

"waf"

[Link to this property](#)

"zoneLockdown"

[Link to this property](#)

</details>

[Link to this property](#)

rules: optional map[array of string]

A mapping of ruleset IDs to a list of rule IDs in that ruleset to skip the execution of. This option is incompatible with the ruleset option.

[Link to this property](#)

ruleset: optional "current"

A ruleset to skip the execution of. This option is incompatible with the rulesets option.

[Link to this property](#)

rulesets: optional array of string

A list of ruleset IDs to skip the execution of. This option is incompatible with the ruleset and phases options.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

enabled: optional boolean

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

expression: optional string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

ref: optional string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RuleCreateResponse = object { id, kind, last_updated, 5 more } or unknown

A result.

</summary>

One of the following:

<details>

<summary>

Ruleset object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

unknown

Returned when dry_run is true.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RuleEditResponse = object { id, kind, last_updated, 5 more } or unknown

A result.

</summary>

One of the following:

<details>

<summary>

Ruleset object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

unknown

Returned when dry_run is true.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RuleDeleteResponse = object { id, kind, last_updated, 5 more } or unknown

A result.

</summary>

One of the following:

<details>

<summary>

Ruleset object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

unknown

Returned when dry_run is true.

[Link to this property](#)

</details>

[Link to this property](#)

##### [List an account or zone ruleset's versions](/api/resources/rulesets/subresources/versions/methods/list)

GET/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/versions

##### [Get an account or zone ruleset version](/api/resources/rulesets/subresources/versions/methods/get)

GET/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

##### [Delete an account or zone ruleset version](/api/resources/rulesets/subresources/versions/methods/delete)

DELETE/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

##### Models

<details>

<summary>

VersionListResponse object { id, kind, last_updated, 4 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VersionGetResponse object { id, kind, last_updated, 5 more }

A ruleset object.

</summary>

id: string

The unique ID of the ruleset.

[Link to this property](#)

kind: [Kind](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20kind%20%3E%20(schema))

The kind of the ruleset.

[Link to this property](#)

last_updated: string

The timestamp of when the ruleset was last modified.

formatdate-time

[Link to this property](#)

name: string

The human-readable name of the ruleset.

minLength1

[Link to this property](#)

phase: [Phase](/api/resources/rulesets#(resource)%20rulesets%20%3E%20(model)%20phase%20%3E%20(schema))

The phase of the ruleset.

[Link to this property](#)

<details>

<summary>

rules: array of [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or object { id, action, enabled, 10 more } or [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more } or 18 more

The list of rules in the ruleset.

</summary>

One of the following:

<details>

<summary>

BlockRule = [BlockRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20block_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseCompressionRule = [CompressResponseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20compress_response_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DDoSDynamicRule = [DDoSDynamicRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20ddos_dynamic_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExecuteRule = [ExecuteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20execute_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ForceConnectionCloseRule = [ForceConnectionCloseRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20force_connection_close_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

JavaScriptChallengeRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "js_challenge"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

Whether the rule should be executed.

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

action_parameters: optional unknown

The parameters configuring the rule’s action.

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogRule = [LogRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LogCustomFieldRule = [LogCustomFieldRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20log_custom_field_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ManagedChallengeRule = [ManagedChallengeRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20managed_challenge_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RedirectRule = [RedirectRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20redirect_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RewriteRule = [RewriteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20rewrite_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteRule = [RouteRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20route_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScoreRule = [ScoreRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20score_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServeErrorRule = [ServeErrorRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20serve_error_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheControlRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_control"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }

The parameters configuring the rule’s action.

</summary>

<details>

<summary>

immutable: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"max-age": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"must-understand": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-cache": optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-store": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"no-transform": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

private: optional object { operation, cloudflare_only, qualifiers } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts optional qualifiers (header names).

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only, qualifiers }

Set the directive with optional qualifiers.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

qualifiers: optional array of string

Optional list of header names to qualify the directive (e.g., for “private” or “no-cache” directives).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"proxy-revalidate": optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: optional object { operation, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, cloudflare_only }

Set the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"s-maxage": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-if-error": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

"stale-while-revalidate": optional object { operation, value, cloudflare_only } or object { operation, cloudflare_only }

A cache-control directive configuration that accepts a duration value in seconds.

</summary>

One of the following:

<details>

<summary>

SetDirective object { operation, value, cloudflare_only }

Set the directive with a duration value in seconds.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

The duration value in seconds for the directive.

minimum0

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveDirective object { operation, cloudflare_only }

Remove the directive.

</summary>

<details>

<summary>

operation: "set" or "remove"

The operation to perform on the cache-control directive.

</summary>

One of the following:

"set"

[Link to this property](#)

"remove"

[Link to this property](#)

</details>

[Link to this property](#)

cloudflare_only: optional boolean

Whether the directive should only be applied to the Cloudflare CDN cache.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheSettingsRule = [SetCacheSettingsRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_cache_settings_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "set_cache_tags"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { operation, values } or object { expression, operation } or object { operation, values } or 3 more

The parameters configuring the rule’s action.

</summary>

One of the following:

<details>

<summary>

AddCacheTagsValues object { operation, values }

Add cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddCacheTagsExpression object { expression, operation }

Add cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsValues object { operation, values }

Remove cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RemoveCacheTagsExpression object { expression, operation }

Remove cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsValues object { operation, values }

Set cache tags using a list of values.

</summary>

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

values: array of string

A list of cache tag values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetCacheTagsExpression object { expression, operation }

Set cache tags using an expression.

</summary>

expression: string

An expression that evaluates to an array of cache tag values.

minLength1

[Link to this property](#)

<details>

<summary>

operation: "add" or "remove" or "set"

The operation to perform on the cache tags.

</summary>

One of the following:

"add"

[Link to this property](#)

"remove"

[Link to this property](#)

"set"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SetConfigurationRule = [SetConfigRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20set_config_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SkipRule = [SkipRule](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20skip_rule%20%3E%20(schema)) { last_updated, version, id, 10 more }

</summary>

id: string

[Link to this property](#)

action: string

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

[Link to this property](#)

ref: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TransformResponseHTMLRule object { id, action, enabled, 10 more }

</summary>

id: string

The unique ID of the rule.

[Link to this property](#)

action: "transform_response_html"

The action to perform when the rule matches.

[Link to this property](#)

enabled: boolean

[Link to this property](#)

expression: string

The expression defining which traffic will match the rule.

minLength1

[Link to this property](#)

last_updated: string

The timestamp of when the rule was last modified.

formatdate-time

[Link to this property](#)

ref: string

The reference of the rule (the rule’s ID by default).

minLength1

[Link to this property](#)

version: string

The version of the rule.

[Link to this property](#)

<details>

<summary>

action_parameters: optional object { link_maze }

The parameters configuring the rule’s action.

</summary>

link_maze: unknown

Enables the link maze transformation on the response.

[Link to this property](#)

</details>

[Link to this property](#)

categories: optional array of string

The categories of the rule.

[Link to this property](#)

description: optional string

An informative description of the rule.

[Link to this property](#)

<details>

<summary>

exposed_credential_check: optional object { password_expression, username_expression }

Configuration for exposed credential checking.

</summary>

password_expression: string

An expression that selects the password used in the credentials check.

minLength1

[Link to this property](#)

username_expression: string

An expression that selects the user ID used in the credentials check.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

logging: optional [Logging](/api/resources/rulesets#(resource)%20rulesets.rules%20%3E%20(model)%20logging%20%3E%20(schema)) { enabled }

An object configuring the rule’s logging behavior.

[Link to this property](#)

<details>

<summary>

ratelimit: optional object { characteristics, period, counting_expression, 5 more }

An object configuring the rule’s rate limit behavior.

</summary>

characteristics: array of string

Characteristics of the request on which the rate limit counter will be incremented.

[Link to this property](#)

period: number

Period in seconds over which the counter is being incremented.

minimum0

[Link to this property](#)

counting_expression: optional string

An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule’s expression.

minLength1

[Link to this property](#)

mitigation_timeout: optional number

Period of time in seconds after which the action will be disabled following its first execution.

[Link to this property](#)

requests_per_period: optional number

The threshold of requests per period after which the action will be executed for the first time.

minimum1

[Link to this property](#)

requests_to_origin: optional boolean

Whether counting is only performed when an origin is reached.

[Link to this property](#)

score_per_period: optional number

The score threshold per period for which the action will be executed the first time.

[Link to this property](#)

score_response_header_name: optional string

A response header name provided by the origin, which contains the score to increment rate limit counter with.

minLength1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

version: string

The version of the ruleset.

[Link to this property](#)

description: optional string

An informative description of the ruleset.

[Link to this property](#)

</details>

[Link to this property](#)
