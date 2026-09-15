---
title: Get Zero Trust Gateway rule details.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

[Rules](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Zero Trust Gateway rule details.

GET/accounts/{account\_id}/gateway/rules/{rule\_id}

Get a single Zero Trust Gateway rule.

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

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

rule\_id: string

Identify the API resource with a UUID.

maxLength36

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20rule_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.rules%20%3E%20(model)%20gateway_rule%20%3E%20(schema)">GatewayRule</a> { action, enabled, filters, 18 more }

</summary>

<details>

<summary>

action: "on"or "off"or "allow"or 13 more

Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to <code>true</code>.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"scan"

<a href="#">Link to this property</a>

"noscan"

<a href="#">Link to this property</a>

"safesearch"

<a href="#">Link to this property</a>

"ytrestricted"

<a href="#">Link to this property</a>

"isolate"

<a href="#">Link to this property</a>

"noisolate"

<a href="#">Link to this property</a>

"override"

<a href="#">Link to this property</a>

"l4\_override"

<a href="#">Link to this property</a>

"egress"

<a href="#">Link to this property</a>

"resolve"

<a href="#">Link to this property</a>

"quarantine"

<a href="#">Link to this property</a>

"redirect"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Specify whether the rule is enabled.

<a href="#">Link to this property</a>

<details>

<summary>

filters: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.rules%20%3E%20(model)%20gateway_filter%20%3E%20(schema)">GatewayFilter</a>

Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"dns"

<a href="#">Link to this property</a>

"l4"

<a href="#">Link to this property</a>

"egress"

<a href="#">Link to this property</a>

"dns\_resolver"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Specify the rule name.

<a href="#">Link to this property</a>

precedence: number

Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to <a href="http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform">Order of enforcement</a> to manage precedence via Terraform.

<a href="#">Link to this property</a>

traffic: string

Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

<a href="#">Link to this property</a>

id: optional string

Identify the API resource with a UUID.

maxLength36

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Indicate the date of deletion, if any.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specify the rule description.

<a href="#">Link to this property</a>

device\_posture: optional string

Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

<a href="#">Link to this property</a>

<details>

<summary>

expiration: optional object {expires\_at, duration, expired }

Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy’s <code>schedule</code> configuration, if any. This does not apply to HTTP or network policies. Settable only for <code>dns</code> rules.

</summary>

expires\_at: string

Show the timestamp when the policy expires and stops applying. The value must follow RFC 3339 and include a UTC offset. The system accepts non-zero offsets but converts them to the equivalent UTC+00:00 value and returns timestamps with a trailing Z. Expiration policies ignore client timezones and expire globally at the specified expires\_at time.

formatdate-time

<a href="#">Link to this property</a>

duration: optional number

Defines the default duration a policy active in minutes. Must set in order to use the <code>reset_expiration</code> endpoint on this rule.

minimum5

<a href="#">Link to this property</a>

expired: optional boolean

Indicates whether the policy is expired.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

identity: optional string

Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicate that this rule is shared via the Orgs API and read only.

<a href="#">Link to this property</a>

<details>

<summary>

rule\_settings: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.rules%20%3E%20(model)%20rule_setting%20%3E%20(schema)">RuleSetting</a> { add\_headers, allow\_child\_bypass, audit\_ssh, 25 more }

Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

</summary>

add\_headers: optional map\[array of string]

Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Header values may contain <code>@{selector.name}</code> variable references that are interpolated at the edge. Use <code>@@{</code> to escape a literal <code>@{</code>. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name may not exceed 256 bytes and each header value may not exceed 4 KB. Settable only for <code>http</code> rules with the action set to <code>allow</code>.

<a href="#">Link to this property</a>

allow\_child\_bypass: optional boolean

Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

<a href="#">Link to this property</a>

<details>

<summary>

audit\_ssh: optional object {command\_logging }

Define the settings for the Audit SSH action. Settable only for <code>l4</code> rules with <code>audit_ssh</code> action.

</summary>

command\_logging: optional boolean

Enable SSH command logging.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

biso\_admin\_controls: optional object {copy, dcp, dd, 10 more }

Configure browser isolation behavior. Settable only for <code>http</code> rules with the action set to <code>isolate</code>.

</summary>

<details>

<summary>

copy: optional "enabled"or "disabled"or "remote\_only"

Configure copy behavior. If set to remote\_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == “v2”.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"remote\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dcp: optional boolean

Set to false to enable copy-pasting. Only applies when <code>version == "v1"</code>.

<a href="#">Link to this property</a>

dd: optional boolean

Set to false to enable downloading. Only applies when <code>version == "v1"</code>.

<a href="#">Link to this property</a>

dk: optional boolean

Set to false to enable keyboard usage. Only applies when <code>version == "v1"</code>.

<a href="#">Link to this property</a>

<details>

<summary>

download: optional "enabled"or "disabled"or "remote\_only"

Configure download behavior. When set to remote\_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == “v2”.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"remote\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dp: optional boolean

Set to false to enable printing. Only applies when <code>version == "v1"</code>.

<a href="#">Link to this property</a>

du: optional boolean

Set to false to enable uploading. Only applies when <code>version == "v1"</code>.

<a href="#">Link to this property</a>

<details>

<summary>

keyboard: optional "enabled"or "disabled"

Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == “v2”.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

paste: optional "enabled"or "disabled"or "remote\_only"

Configure paste behavior. If set to remote\_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == “v2”.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"remote\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

printing: optional "enabled"or "disabled"

Configure print behavior. Default, Printing is enabled. Applies only when version == “v2”.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload: optional "enabled"or "disabled"

Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == “v2”.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

version: optional "v1"or "v2"

Indicate which version of the browser isolation controls should apply.

</summary>

One of the following:

"v1"

<a href="#">Link to this property</a>

"v2"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wm\_id: optional string

Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

formatuuid

maxLength36

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

block\_page: optional object {target\_uri, include\_context }

Configure custom block page settings. If missing or null, use the account settings. Settable only for <code>http</code> rules with the action set to <code>block</code>.

</summary>

target\_uri: string

Specify the URI to which the user is redirected.

formaturi

<a href="#">Link to this property</a>

include\_context: optional boolean

Specify whether to pass the context information as query parameters.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

block\_page\_enabled: optional boolean

Enable the custom block page. Settable only for <code>dns</code> rules with action <code>block</code>.

<a href="#">Link to this property</a>

block\_reason: optional string

Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for <code>dns</code>, <code>l4</code>, and <code>http</code> rules when the action set to <code>block</code>.

<a href="#">Link to this property</a>

bypass\_parent\_rule: optional boolean

Set to enable MSP accounts to bypass their parent’s rules. Only MSP child accounts can set this. Settable for all types of rules.

<a href="#">Link to this property</a>

<details>

<summary>

check\_session: optional object {duration, enforce }

Configure session check behavior. Settable only for <code>l4</code> and <code>http</code> rules with the action set to <code>allow</code>.

</summary>

duration: optional string

Sets the required session freshness threshold. The API returns a normalized version of this value.

<a href="#">Link to this property</a>

enforce: optional boolean

Enable session enforcement.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

delete\_headers: optional array of string

Remove headers from allowed requests by name. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name may not exceed 256 bytes. Settable only for <code>http</code> rules with the action set to <code>allow</code>.

<a href="#">Link to this property</a>

<details>

<summary>

dns\_resolvers: optional object {ipv4, ipv6 }

Configure custom resolvers to route queries that match the resolver policy. Unused with ‘resolve\_dns\_through\_cloudflare’ or ‘resolve\_dns\_internally’ settings. DNS queries get routed to the address closest to their origin. Only valid when a rule’s action set to ‘resolve’. Settable only for <code>dns_resolver</code> rules.

</summary>

<details>

<summary>

ipv4: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.rules%20%3E%20(model)%20dns_resolver_settings_v4%20%3E%20(schema)">DNSResolverSettingsV4</a> { ip, port, route\_through\_private\_network, vnet\_id }

</summary>

ip: string

Specify the IPv4 address of the upstream resolver.

<a href="#">Link to this property</a>

port: optional number

Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

<a href="#">Link to this property</a>

route\_through\_private\_network: optional boolean

Indicate whether to connect to this resolver over a private network. Must set when vnet\_id set.

<a href="#">Link to this property</a>

vnet\_id: optional string

Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipv6: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.rules%20%3E%20(model)%20dns_resolver_settings_v6%20%3E%20(schema)">DNSResolverSettingsV6</a> { ip, port, route\_through\_private\_network, vnet\_id }

</summary>

ip: string

Specify the IPv6 address of the upstream resolver.

<a href="#">Link to this property</a>

port: optional number

Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

<a href="#">Link to this property</a>

route\_through\_private\_network: optional boolean

Indicate whether to connect to this resolver over a private network. Must set when vnet\_id set.

<a href="#">Link to this property</a>

vnet\_id: optional string

Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

egress: optional object {ipv4, ipv4\_fallback, ipv6 }

Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for <code>egress</code> rules.

</summary>

ipv4: optional string

Specify the IPv4 address to use for egress.

<a href="#">Link to this property</a>

ipv4\_fallback: optional string

Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set ‘0.0.0.0’ to indicate local egress via WARP IPs.

<a href="#">Link to this property</a>

ipv6: optional string

Specify the IPv6 range to use for egress.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

forensic\_copy: optional object {enabled }

Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

</summary>

enabled: optional boolean

Enable sending the copy to storage.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ignore\_cname\_category\_matches: optional boolean

Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for <code>dns</code> and <code>dns_resolver</code> rules.

<a href="#">Link to this property</a>

insecure\_disable\_dnssec\_validation: optional boolean

Specify whether to disable DNSSEC validation (for Allow actions) \[INSECURE]. Settable only for <code>dns</code> rules.

<a href="#">Link to this property</a>

ip\_categories: optional boolean

Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for <code>dns</code> and <code>dns_resolver</code> rules.

<a href="#">Link to this property</a>

ip\_indicator\_feeds: optional boolean

Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for <code>dns</code> and <code>dns_resolver</code> rules.

<a href="#">Link to this property</a>

<details>

<summary>

l4override: optional object {ip, port }

Send matching traffic to the supplied destination IP address and port. Settable only for <code>l4</code> rules with the action set to <code>l4_override</code>.

</summary>

ip: optional string

Defines the IPv4 or IPv6 address.

<a href="#">Link to this property</a>

port: optional number

Defines a port number to use for TCP/UDP overrides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

notification\_settings: optional object {enabled, include\_context, msg, support\_url }

Configure a notification to display on the user’s device when this rule matched. Settable for all types of rules with the action set to <code>block</code>.

</summary>

enabled: optional boolean

Enable notification.

<a href="#">Link to this property</a>

include\_context: optional boolean

Indicates whether to pass the context information as query parameters.

<a href="#">Link to this property</a>

msg: optional string

Customize the message shown in the notification.

<a href="#">Link to this property</a>

support\_url: optional string

Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

override\_host: optional string

Defines a hostname for override, for the matching DNS queries. Settable only for <code>dns</code> rules with the action set to <code>override</code>.

<a href="#">Link to this property</a>

override\_ips: optional array of string

Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for <code>dns</code> rules with the action set to <code>override</code>.

<a href="#">Link to this property</a>

<details>

<summary>

payload\_log: optional object {enabled }

Configure DLP payload logging. Settable only for <code>http</code> rules.

</summary>

enabled: optional boolean

Enable DLP payload logging for this rule.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quarantine: optional object {file\_types }

Configure settings that apply to quarantine rules. Settable only for <code>http</code> rules.

</summary>

<details>

<summary>

file\_types: optional array of "exe"or "pdf"or "doc"or 10 more

Specify the types of files to sandbox.

</summary>

One of the following:

"exe"

<a href="#">Link to this property</a>

"pdf"

<a href="#">Link to this property</a>

"doc"

<a href="#">Link to this property</a>

"docm"

<a href="#">Link to this property</a>

"docx"

<a href="#">Link to this property</a>

"rtf"

<a href="#">Link to this property</a>

"ppt"

<a href="#">Link to this property</a>

"pptx"

<a href="#">Link to this property</a>

"xls"

<a href="#">Link to this property</a>

"xlsm"

<a href="#">Link to this property</a>

"xlsx"

<a href="#">Link to this property</a>

"zip"

<a href="#">Link to this property</a>

"rar"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

redirect: optional object {target\_uri, include\_context, preserve\_path\_and\_query }

Apply settings to redirect rules. Settable only for <code>http</code> rules with the action set to <code>redirect</code>.

</summary>

target\_uri: string

Specify the URI to which the user is redirected.

formaturi

<a href="#">Link to this property</a>

include\_context: optional boolean

Specify whether to pass the context information as query parameters.

<a href="#">Link to this property</a>

preserve\_path\_and\_query: optional boolean

Specify whether to append the path and query parameters from the original request to target\_uri.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resolve\_dns\_internally: optional object {fallback, view\_id }

Configure to forward the query to the internal DNS service, passing the specified ‘view\_id’ as input. Not used when ‘dns\_resolvers’ is specified or ‘resolve\_dns\_through\_cloudflare’ is set. Only valid when a rule’s action set to ‘resolve’. Settable only for <code>dns_resolver</code> rules.

</summary>

<details>

<summary>

fallback: optional "none"or "public\_dns"

Specify the fallback behavior to apply when the internal DNS response code differs from ‘NOERROR’ or when the response data contains only CNAME records for ‘A’ or ‘AAAA’ queries.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"public\_dns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

view\_id: optional string

Specify the internal DNS view identifier to pass to the internal DNS service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resolve\_dns\_through\_cloudflare: optional boolean

Enable to send queries that match the policy to Cloudflare’s default 1.1.1.1 DNS resolver. Cannot set when ‘dns\_resolvers’ specified or ‘resolve\_dns\_internally’ is set. Only valid when a rule’s action set to ‘resolve’. Settable only for <code>dns_resolver</code> rules.

<a href="#">Link to this property</a>

set\_headers: optional map\[array of string]

Replace existing headers on allowed requests with the specified key-value pairs. If a header does not exist, it is added. Header values may contain <code>@{selector.name}</code> variable references that are interpolated at the edge. Use <code>@@{</code> to escape a literal <code>@{</code>. A maximum of 20 header operations (add + set + delete) is allowed per policy. Each header name may not exceed 256 bytes and each header value may not exceed 4 KB. Settable only for <code>http</code> rules with the action set to <code>allow</code>.

<a href="#">Link to this property</a>

<details>

<summary>

untrusted\_cert: optional object {action }

Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for <code>http</code> rules with the action set to <code>allow</code>.

</summary>

<details>

<summary>

action: optional "pass\_through"or "block"or "error"

Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

</summary>

One of the following:

"pass\_through"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

schedule: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.rules%20%3E%20(model)%20schedule%20%3E%20(schema)">Schedule</a> { fri, mon, sat, 5 more }

Defines the schedule for activating DNS policies. Settable only for <code>dns</code> and <code>dns_resolver</code> rules.

</summary>

fri: optional string

Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

<a href="#">Link to this property</a>

mon: optional string

Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

<a href="#">Link to this property</a>

sat: optional string

Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

<a href="#">Link to this property</a>

sun: optional string

Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

<a href="#">Link to this property</a>

thu: optional string

Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

<a href="#">Link to this property</a>

time\_zone: optional string

Specify the time zone for rule evaluation. When a <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List">valid time zone city name</a> is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user’s IP address. Colo time zone is used when the user’s IP address does not resolve to a location.

<a href="#">Link to this property</a>

tue: optional string

Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

<a href="#">Link to this property</a>

wed: optional string

Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sharable: optional boolean

Indicate that this rule is sharable via the Orgs API.

<a href="#">Link to this property</a>

source\_account: optional string

Provide the account tag of the account that created the rule.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

version: optional number

Indicate the version number of the rule(read-only).

<a href="#">Link to this property</a>

warning\_status: optional string

Indicate a warning for a misconfigured rule, if any.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Zero Trust Gateway rule details.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules/$RULE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "action": "allow",
    "enabled": true,
    "filters": [
      "http"
    ],
    "name": "block bad websites",
    "precedence": 0,
    "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "deleted_at": "2019-12-27T18:11:19.117Z",
    "description": "Block bad websites based on their host name.",
    "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
    "expiration": {
      "expires_at": "2014-01-01T05:20:20Z",
      "duration": 10,
      "expired": false
    },
    "identity": "any(identity.groups.name[*] in {\"finance\"})",
    "read_only": true,
    "rule_settings": {
      "add_headers": {
        "My-Next-Header": [
          "foo",
          "bar"
        ],
        "X-Custom-Header-Name": [
          "somecustomvalue"
        ]
      },
      "allow_child_bypass": false,
      "audit_ssh": {
        "command_logging": false
      },
      "biso_admin_controls": {
        "copy": "remote_only",
        "dcp": true,
        "dd": true,
        "dk": true,
        "download": "enabled",
        "dp": false,
        "du": true,
        "keyboard": "enabled",
        "paste": "enabled",
        "printing": "enabled",
        "upload": "enabled",
        "version": "v1",
        "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
      },
      "block_page": {
        "target_uri": "https://example.com",
        "include_context": true
      },
      "block_page_enabled": true,
      "block_reason": "This website is a security risk",
      "bypass_parent_rule": false,
      "check_session": {
        "duration": "300s",
        "enforce": true
      },
      "delete_headers": [
        "X-Old-Header",
        "X-Remove-Me"
      ],
      "dns_resolvers": {
        "ipv4": [
          {
            "ip": "2.2.2.2",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ],
        "ipv6": [
          {
            "ip": "2001:DB8::",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ]
      },
      "egress": {
        "ipv4": "192.0.2.2",
        "ipv4_fallback": "192.0.2.3",
        "ipv6": "2001:DB8::/64"
      },
      "forensic_copy": {
        "enabled": true
      },
      "ignore_cname_category_matches": true,
      "insecure_disable_dnssec_validation": false,
      "ip_categories": true,
      "ip_indicator_feeds": true,
      "l4override": {
        "ip": "1.1.1.1",
        "port": 0
      },
      "notification_settings": {
        "enabled": true,
        "include_context": true,
        "msg": "msg",
        "support_url": "support_url"
      },
      "override_host": "example.com",
      "override_ips": [
        "1.1.1.1",
        "2.2.2.2"
      ],
      "payload_log": {
        "enabled": true
      },
      "quarantine": {
        "file_types": [
          "exe"
        ]
      },
      "redirect": {
        "target_uri": "https://example.com",
        "include_context": true,
        "preserve_path_and_query": true
      },
      "resolve_dns_internally": {
        "fallback": "none",
        "view_id": "view_id"
      },
      "resolve_dns_through_cloudflare": true,
      "set_headers": {
        "X-User-Identity": [
          "user=@{identity.name}"
        ]
      },
      "untrusted_cert": {
        "action": "error"
      }
    },
    "schedule": {
      "fri": "08:00-12:30,13:30-17:00",
      "mon": "08:00-12:30,13:30-17:00",
      "sat": "08:00-12:30,13:30-17:00",
      "sun": "08:00-12:30,13:30-17:00",
      "thu": "08:00-12:30,13:30-17:00",
      "time_zone": "America/New York",
      "tue": "08:00-12:30,13:30-17:00",
      "wed": "08:00-12:30,13:30-17:00"
    },
    "sharable": true,
    "source_account": "source_account",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "version": 1,
    "warning_status": "warning_status"
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "action": "allow",
    "enabled": true,
    "filters": [
      "http"
    ],
    "name": "block bad websites",
    "precedence": 0,
    "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "deleted_at": "2019-12-27T18:11:19.117Z",
    "description": "Block bad websites based on their host name.",
    "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
    "expiration": {
      "expires_at": "2014-01-01T05:20:20Z",
      "duration": 10,
      "expired": false
    },
    "identity": "any(identity.groups.name[*] in {\"finance\"})",
    "read_only": true,
    "rule_settings": {
      "add_headers": {
        "My-Next-Header": [
          "foo",
          "bar"
        ],
        "X-Custom-Header-Name": [
          "somecustomvalue"
        ]
      },
      "allow_child_bypass": false,
      "audit_ssh": {
        "command_logging": false
      },
      "biso_admin_controls": {
        "copy": "remote_only",
        "dcp": true,
        "dd": true,
        "dk": true,
        "download": "enabled",
        "dp": false,
        "du": true,
        "keyboard": "enabled",
        "paste": "enabled",
        "printing": "enabled",
        "upload": "enabled",
        "version": "v1",
        "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
      },
      "block_page": {
        "target_uri": "https://example.com",
        "include_context": true
      },
      "block_page_enabled": true,
      "block_reason": "This website is a security risk",
      "bypass_parent_rule": false,
      "check_session": {
        "duration": "300s",
        "enforce": true
      },
      "delete_headers": [
        "X-Old-Header",
        "X-Remove-Me"
      ],
      "dns_resolvers": {
        "ipv4": [
          {
            "ip": "2.2.2.2",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ],
        "ipv6": [
          {
            "ip": "2001:DB8::",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ]
      },
      "egress": {
        "ipv4": "192.0.2.2",
        "ipv4_fallback": "192.0.2.3",
        "ipv6": "2001:DB8::/64"
      },
      "forensic_copy": {
        "enabled": true
      },
      "ignore_cname_category_matches": true,
      "insecure_disable_dnssec_validation": false,
      "ip_categories": true,
      "ip_indicator_feeds": true,
      "l4override": {
        "ip": "1.1.1.1",
        "port": 0
      },
      "notification_settings": {
        "enabled": true,
        "include_context": true,
        "msg": "msg",
        "support_url": "support_url"
      },
      "override_host": "example.com",
      "override_ips": [
        "1.1.1.1",
        "2.2.2.2"
      ],
      "payload_log": {
        "enabled": true
      },
      "quarantine": {
        "file_types": [
          "exe"
        ]
      },
      "redirect": {
        "target_uri": "https://example.com",
        "include_context": true,
        "preserve_path_and_query": true
      },
      "resolve_dns_internally": {
        "fallback": "none",
        "view_id": "view_id"
      },
      "resolve_dns_through_cloudflare": true,
      "set_headers": {
        "X-User-Identity": [
          "user=@{identity.name}"
        ]
      },
      "untrusted_cert": {
        "action": "error"
      }
    },
    "schedule": {
      "fri": "08:00-12:30,13:30-17:00",
      "mon": "08:00-12:30,13:30-17:00",
      "sat": "08:00-12:30,13:30-17:00",
      "sun": "08:00-12:30,13:30-17:00",
      "thu": "08:00-12:30,13:30-17:00",
      "time_zone": "America/New York",
      "tue": "08:00-12:30,13:30-17:00",
      "wed": "08:00-12:30,13:30-17:00"
    },
    "sharable": true,
    "source_account": "source_account",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "version": 1,
    "warning_status": "warning_status"
  }
}
```