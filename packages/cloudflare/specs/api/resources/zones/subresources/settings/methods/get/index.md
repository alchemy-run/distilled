---
title: Get zone setting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

[Settings](https://developers.cloudflare.com/api/resources/zones/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get zone setting

GET/zones/{zone\_id}/settings/{setting\_id}

Fetch a single zone setting by name

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

`Zone Settings Write``Zone Settings Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier

maxLength32

[Link to this property](#)%20zones.settings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

setting\_id: string

Setting name

[Link to this property](#)%20zones.settings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20setting_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zones.settings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zones.settings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful

[Link to this property](#)%20zones.settings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20zero_rtt%20%3E%20(schema)">ZeroRTT</a> { id, value, editable, modified\_on } or <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20advanced_ddos%20%3E%20(schema)">AdvancedDDoS</a> { id, value, editable, modified\_on } or object {id, modified\_on, value } or 63 more

0-RTT session resumption enabled for this zone.

</summary>

One of the following:

<details>

<summary>

ZeroRTT object {id, value, editable, modified\_on }

0-RTT session resumption enabled for this zone.

</summary>

id: "0rtt"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AdvancedDDoS object {id, value, editable, modified\_on }

Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is ‘on’ in the case of Business and Enterprise zones.

</summary>

id: "advanced\_ddos"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesCacheRulesAegis object {id, modified\_on, value }

Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

</summary>

id: "aegis"

ID of the zone setting.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {enabled, pool\_id }

Value of the zone setting.

</summary>

enabled: optional boolean

Whether the feature is enabled or not.

<a href="#">Link to this property</a>

pool\_id: optional string

Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AlwaysOnline object {id, value, editable, modified\_on }

When enabled, Cloudflare serves limited copies of web pages available from the <a href="https://archive.org/web/">Internet Archive’s Wayback Machine</a> if your server is offline. Refer to <a href="https://developers.cloudflare.com/cache/about/always-online">Always Online</a> for more information.

</summary>

id: "always\_online"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesAlwaysUseHTTPS2 object {id, value, editable, modified\_on }

Reply to all requests for URLs that use “http” with a 301 redirect to the equivalent “https” URL. If you only want to redirect for a subset of requests, consider creating an “Always use HTTPS” page rule.

</summary>

id: "always\_use\_https"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesAutomaticHTTPSRewrites2 object {id, value, editable, modified\_on }

Enable the Automatic HTTPS Rewrites feature for this zone.

</summary>

id: "automatic\_https\_rewrites"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Brotli object {id, value, editable, modified\_on }

When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

</summary>

id: "brotli"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesBrowserCacheTTL2 object {id, value, editable, modified\_on }

Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors’ computers. Cloudflare will honor any larger times specified by your server. (<a href="https://support.cloudflare.com/hc/en-us/articles/200168276">https://support.cloudflare.com/hc/en-us/articles/200168276</a>).

</summary>

id: "browser\_cache\_ttl"

ID of the zone setting.

<a href="#">Link to this property</a>

value: number

Current value of the zone setting.

maximum31536000

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesBrowserCheck2 object {id, value, editable, modified\_on }

Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page. It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (<a href="https://support.cloudflare.com/hc/en-us/articles/200170086">https://support.cloudflare.com/hc/en-us/articles/200170086</a>).

</summary>

id: "browser\_check"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesCacheLevel2 object {id, value, editable, modified\_on }

Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (<a href="https://support.cloudflare.com/hc/en-us/articles/200168256">https://support.cloudflare.com/hc/en-us/articles/200168256</a>).

</summary>

id: "cache\_level"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "aggressive"or "basic"or "simplified"

Current value of the zone setting.

</summary>

One of the following:

"aggressive"

<a href="#">Link to this property</a>

"basic"

<a href="#">Link to this property</a>

"simplified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ChallengeTTL object {id, value, editable, modified\_on }

Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (<a href="https://support.cloudflare.com/hc/en-us/articles/200170136">https://support.cloudflare.com/hc/en-us/articles/200170136</a>).

</summary>

id: "challenge\_ttl"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: 300or 900or 1800or 11 more

Current value of the zone setting.

</summary>

One of the following:

300

<a href="#">Link to this property</a>

900

<a href="#">Link to this property</a>

1800

<a href="#">Link to this property</a>

2700

<a href="#">Link to this property</a>

3600

<a href="#">Link to this property</a>

7200

<a href="#">Link to this property</a>

10800

<a href="#">Link to this property</a>

14400

<a href="#">Link to this property</a>

28800

<a href="#">Link to this property</a>

57600

<a href="#">Link to this property</a>

86400

<a href="#">Link to this property</a>

604800

<a href="#">Link to this property</a>

2592000

<a href="#">Link to this property</a>

31536000

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesChinaNetworkEnabled object {id, value, editable, modified\_on }

Determines whether or not the china network is enabled.

</summary>

id: "china\_network\_enabled"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesContentConverter object {id, value, editable, modified\_on }

When enabled and the client sends an Accept header requesting text/markdown, Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service. Refer to the <a href="https://developers.cloudflare.com/workers-ai/features/markdown-conversion/">developer documentation</a> for more information.

</summary>

id: "content\_converter"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Ciphers object {id, value, editable, modified\_on }

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

</summary>

id: "ciphers"

ID of the zone setting.

<a href="#">Link to this property</a>

value: array of string

Current value of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesCNAMEFlattening object {id, value, editable, modified\_on }

Whether or not cname flattening is on.

</summary>

id: "cname\_flattening"

How to flatten the cname destination.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedvalue: "flatten\_at\_root"or "flatten\_all"

This zone setting is deprecated; please use the DNS Settings route instead. More information at <a href="https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-03-21">https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-03-21</a>

Current value of the zone setting.

</summary>

One of the following:

"flatten\_at\_root"

<a href="#">Link to this property</a>

"flatten\_all"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DevelopmentMode object {id, value, editable, 2 more }

Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare’s accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

</summary>

id: "development\_mode"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

time\_remaining: optional number

Value of the zone setting. Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EarlyHints object {id, value, editable, modified\_on }

When enabled, Cloudflare will attempt to speed up overall page loads by serving <code>103</code> responses with <code>Link</code> headers from the final response. Refer to <a href="https://developers.cloudflare.com/cache/about/early-hints">Early Hints</a> for more information.

</summary>

id: "early\_hints"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesEdgeCacheTTL2 object {id, value, editable, modified\_on }

Time (in seconds) that a resource will be ensured to remain on Cloudflare’s cache servers.

</summary>

id: "edge\_cache\_ttl"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: 30or 60or 300or 18 more

Current value of the zone setting.

</summary>

One of the following:

30

<a href="#">Link to this property</a>

60

<a href="#">Link to this property</a>

300

<a href="#">Link to this property</a>

1200

<a href="#">Link to this property</a>

1800

<a href="#">Link to this property</a>

3600

<a href="#">Link to this property</a>

7200

<a href="#">Link to this property</a>

10800

<a href="#">Link to this property</a>

14400

<a href="#">Link to this property</a>

18000

<a href="#">Link to this property</a>

28800

<a href="#">Link to this property</a>

43200

<a href="#">Link to this property</a>

57600

<a href="#">Link to this property</a>

72000

<a href="#">Link to this property</a>

86400

<a href="#">Link to this property</a>

172800

<a href="#">Link to this property</a>

259200

<a href="#">Link to this property</a>

345600

<a href="#">Link to this property</a>

432000

<a href="#">Link to this property</a>

518400

<a href="#">Link to this property</a>

604800

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesEmailObfuscation2 object {id, value, editable, modified\_on }

Encrypt email adresses on your web page from bots, while keeping them visible to humans. (<a href="https://support.cloudflare.com/hc/en-us/articles/200170016">https://support.cloudflare.com/hc/en-us/articles/200170016</a>).

</summary>

id: "email\_obfuscation"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

H2Prioritization object {id, value, editable, modified\_on }

HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

</summary>

id: "h2\_prioritization"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"or "custom"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HotlinkProtection object {id, value, editable, modified\_on }

When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it’s not another site requesting them. People will still be able to download and view images from your page, but other sites won’t be able to steal them for use on their own pages. (<a href="https://support.cloudflare.com/hc/en-us/articles/200170026">https://support.cloudflare.com/hc/en-us/articles/200170026</a>).

</summary>

id: "hotlink\_protection"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HTTP2 object {id, value, editable, modified\_on }

HTTP2 enabled for this zone.

</summary>

id: "http2"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HTTP3 object {id, value, editable, modified\_on }

HTTP3 enabled for this zone.

</summary>

id: "http3"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ImageResizing object {id, value, editable, modified\_on }

Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare’s network. Refer to the <a href="https://developers.cloudflare.com/images/">Image Transformations documentation</a> for more information.

</summary>

id: "image\_resizing"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesIPGeolocation2 object {id, value, editable, modified\_on }

Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (<a href="https://support.cloudflare.com/hc/en-us/articles/200168236">https://support.cloudflare.com/hc/en-us/articles/200168236</a>).

</summary>

id: "ip\_geolocation"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPV6 object {id, value, editable, modified\_on }

Enable IPv6 on all subdomains that are Cloudflare enabled. (<a href="https://support.cloudflare.com/hc/en-us/articles/200168586">https://support.cloudflare.com/hc/en-us/articles/200168586</a>).

</summary>

id: "ipv6"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesMaxUpload object {id, value, editable, modified\_on }

Maximum size of an allowable upload.

</summary>

id: "max\_upload"

identifier of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: 100or 125or 150or 23 more

Current value of the zone setting.

</summary>

One of the following:

100

<a href="#">Link to this property</a>

125

<a href="#">Link to this property</a>

150

<a href="#">Link to this property</a>

175

<a href="#">Link to this property</a>

200

<a href="#">Link to this property</a>

225

<a href="#">Link to this property</a>

250

<a href="#">Link to this property</a>

275

<a href="#">Link to this property</a>

300

<a href="#">Link to this property</a>

325

<a href="#">Link to this property</a>

350

<a href="#">Link to this property</a>

375

<a href="#">Link to this property</a>

400

<a href="#">Link to this property</a>

425

<a href="#">Link to this property</a>

450

<a href="#">Link to this property</a>

475

<a href="#">Link to this property</a>

500

<a href="#">Link to this property</a>

1000

<a href="#">Link to this property</a>

1500

<a href="#">Link to this property</a>

2000

<a href="#">Link to this property</a>

2500

<a href="#">Link to this property</a>

3000

<a href="#">Link to this property</a>

3500

<a href="#">Link to this property</a>

4000

<a href="#">Link to this property</a>

4500

<a href="#">Link to this property</a>

5000

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MinTLSVersion object {id, value, editable, modified\_on }

Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

</summary>

id: "min\_tls\_version"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "1.0"or "1.1"or "1.2"or "1.3"

Current value of the zone setting.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesMirage2 object {id, value, editable, modified\_on }

Automatically optimize image loading for website visitors on mobile devices. Refer to <a href="http://blog.cloudflare.com/mirage2-solving-mobile-speed">our blog post</a> for more information.

</summary>

id: "mirage"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedvalue: "on"or "off"

Mirage is being deprecated. More information at <a href="https://developers.cloudflare.com/speed/optimization/images/mirage/">https://developers.cloudflare.com/speed/optimization/images/mirage/</a>

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NEL object {id, value, editable, modified\_on }

Enable Network Error Logging reporting on your zone. (Beta)

</summary>

id: "nel"

Zone setting identifier.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {enabled }

Current value of the zone setting.

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesOpportunisticEncryption2 object {id, value, editable, modified\_on }

Enables the Opportunistic Encryption feature for a zone.

</summary>

id: "opportunistic\_encryption"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OpportunisticOnion object {id, value, editable, modified\_on }

Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

</summary>

id: "opportunistic\_onion"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OrangeToOrange object {id, value, editable, modified\_on }

Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

</summary>

id: "orange\_to\_orange"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedvalue: "on"or "off"

This setting is deprecated. Orange to Orange (O2O) is applied automatically for eligible zones and no longer requires configuration; this setting only controlled the legacy O2O v1 (Managed CNAME) path. More information at <a href="https://developers.cloudflare.com/fundamentals/api/reference/deprecations/">https://developers.cloudflare.com/fundamentals/api/reference/deprecations/</a>

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesOriginErrorPagePassThru2 object {id, value, editable, modified\_on }

Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

</summary>

id: "origin\_error\_page\_pass\_thru"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesCacheRulesOriginH2MaxStreams object {id, modified\_on, value }

Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is <code>100</code> for all plan types except Enterprise where it is <code>1</code>. <code>1</code> means that H2 multiplexing is disabled.

</summary>

id: "origin\_h2\_max\_streams"

Value of the zone setting.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

value: optional number

Value of the Origin H2 Max Streams Setting.

maximum1000

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesCacheRulesOriginMaxHTTPVersion object {id, modified\_on, value }

Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to <a href="https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/">Enable HTTP/2 to Origin</a>, for more information.). The default value is “2” for all plan types except Enterprise where it is “1”.

</summary>

id: "origin\_max\_http\_version"

Value of the zone setting.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "2"or "1"

Value of the Origin Max HTTP Version Setting.

</summary>

One of the following:

"2"

<a href="#">Link to this property</a>

"1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesPolish2 object {id, value, editable, modified\_on }

Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

</summary>

id: "polish"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "lossless"or "lossy"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"lossless"

<a href="#">Link to this property</a>

"lossy"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PrefetchPreload object {id, value, editable, modified\_on }

Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

</summary>

id: "prefetch\_preload"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesPreRender object {id, value, editable, modified\_on }

When enabled, Cloudflare serves pre-rendered HTML to eligible search and AI crawlers instead of the origin’s unrendered response.

</summary>

id: "pre\_render"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesPrivacyPass object {id, value, editable, modified\_on }

Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (<a href="https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass">https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass</a>).

</summary>

id: "privacy\_pass"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedvalue: "on"or "off"

Privacy Pass v1 was deprecated in 2023. (Announcement - <a href="https://blog.cloudflare.com/privacy-pass-standard/">https://blog.cloudflare.com/privacy-pass-standard/</a>) and (API deprecation details - <a href="https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31">https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31</a>)

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ProxyReadTimeout object {id, value, editable, modified\_on }

Maximum time between two read operations from origin.

</summary>

id: "proxy\_read\_timeout"

ID of the zone setting.

<a href="#">Link to this property</a>

value: number

Current value of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PseudoIPV4 object {id, value, editable, modified\_on }

The value set for the Pseudo IPv4 setting.

</summary>

id: "pseudo\_ipv4"

Value of the Pseudo IPv4 setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "add\_header"or "overwrite\_header"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"add\_header"

<a href="#">Link to this property</a>

"overwrite\_header"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesRedirectsForAITraining object {id, value, editable, modified\_on }

When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs found in the HTML response, ensuring AI models train on authoritative content.

</summary>

id: "redirects\_for\_ai\_training"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesReplaceInsecureJS object {id, value, editable, modified\_on }

Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

</summary>

id: "replace\_insecure\_js"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesResponseBuffering2 object {id, value, editable, modified\_on }

Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

</summary>

id: "response\_buffering"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesRocketLoader2 object {id, value, editable, modified\_on }

Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site’s Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page’s rendering time sometimes measured as Time to First Paint (TTFP), and also the <code>window.onload</code> time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to <a href="https://support.cloudflare.com/hc/articles/200168056">Understanding Rocket Loader</a> for more information.

</summary>

id: "rocket\_loader"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesSchemasAutomaticPlatformOptimization object {id, value, editable, modified\_on }

<a href="https://developers.cloudflare.com/automatic-platform-optimization/">Automatic Platform Optimization for WordPress</a> serves your WordPress site from Cloudflare’s edge network and caches third-party fonts.

</summary>

id: "automatic\_platform\_optimization"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20automatic_platform_optimization%20%3E%20(schema)">AutomaticPlatformOptimization</a> { cache\_by\_device\_type, cf, enabled, 3 more }

Current value of the zone setting.

</summary>

cache\_by\_device\_type: boolean

Indicates whether or not <a href="https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/">cache by device type</a> is enabled.

<a href="#">Link to this property</a>

cf: boolean

Indicates whether or not Cloudflare proxy is enabled.

<a href="#">Link to this property</a>

enabled: boolean

Indicates whether or not Automatic Platform Optimization is enabled.

<a href="#">Link to this property</a>

hostnames: array of string

An array of hostnames where Automatic Platform Optimization for WordPress is activated.

<a href="#">Link to this property</a>

wordpress: boolean

Indicates whether or not site is powered by WordPress.

<a href="#">Link to this property</a>

wp\_plugin: boolean

Indicates whether or not <a href="https://wordpress.org/plugins/cloudflare/">Cloudflare for WordPress plugin</a> is installed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesSearchForAgents object {id, value, editable, modified\_on }

When enabled, Cloudflare provisions an AI Search instance for the zone and exposes a /.well-known/ai-search endpoint that AI agents can query. Markdown responses also receive an agent: YAML capability block advertising the search endpoint.

</summary>

id: "search\_for\_agents"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecurityHeaders object {id, value, editable, modified\_on }

Cloudflare security header for a zone.

</summary>

id: "security\_header"

ID of the zone’s security header.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {strict\_transport\_security }

Current value of the zone setting.

</summary>

<details>

<summary>

strict\_transport\_security: optional object {enabled, include\_subdomains, max\_age, 2 more }

Strict Transport Security.

</summary>

enabled: optional boolean

Whether or not strict transport security is enabled.

<a href="#">Link to this property</a>

include\_subdomains: optional boolean

Include all subdomains for strict transport security.

<a href="#">Link to this property</a>

max\_age: optional number

Max age in seconds of the strict transport security.

<a href="#">Link to this property</a>

nosniff: optional boolean

Whether or not to include ‘X-Content-Type-Options: nosniff’ header.

<a href="#">Link to this property</a>

preload: optional boolean

Enable automatic preload of the HSTS configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesSecurityLevel2 object {id, value, editable, modified\_on }

Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (<a href="https://support.cloudflare.com/hc/en-us/articles/200170056">https://support.cloudflare.com/hc/en-us/articles/200170056</a>).

</summary>

id: "security\_level"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "essentially\_off"or "low"or 3 more

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"essentially\_off"

<a href="#">Link to this property</a>

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"under\_attack"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ServerSideExcludes object {id, value, editable, modified\_on }

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: . For example: Bad visitors won’t see my phone number, 555-555-5555 . Note: SSE only will work with HTML. If you have HTML minification enabled, you won’t see the SSE tags in your HTML source when it’s served through Cloudflare. SSE will still function in this case, as Cloudflare’s HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor’s computer. (<a href="https://support.cloudflare.com/hc/en-us/articles/200170036">https://support.cloudflare.com/hc/en-us/articles/200170036</a>).

</summary>

id: "server\_side\_exclude"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesSha1Support object {id, value, editable, modified\_on }

Allow SHA1 support.

</summary>

id: "sha1\_support"

Zone setting identifier.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesSortQueryStringForCache2 object {id, value, editable, modified\_on }

Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

</summary>

id: "sort\_query\_string\_for\_cache"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesSSL2 object {id, value, editable, modified\_on }

SSL encrypts your visitor’s connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don’t need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (<a href="https://support.cloudflare.com/hc/en-us/articles/200170416">https://support.cloudflare.com/hc/en-us/articles/200170416</a>).

</summary>

id: "ssl"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "flexible"or "full"or "strict"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"flexible"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SSLRecommender object {id, enabled }

Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

</summary>

id: optional "ssl\_recommender"

Enrollment value for SSL/TLS Recommender.

<a href="#">Link to this property</a>

enabled: optional boolean

ssl-recommender enrollment setting.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesTLS1\_2Only object {id, value, editable, modified\_on }

Only allows TLS1.2.

</summary>

id: "tls\_1\_2\_only"

Zone setting identifier.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TLS1\_3 object {id, value, editable, modified\_on }

Enables Crypto TLS 1.3 feature for a zone.

</summary>

id: "tls\_1\_3"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"or "zrt"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

"zrt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TLSClientAuth object {id, value, editable, modified\_on }

TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

</summary>

id: "tls\_client\_auth"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesTransformations object {id, value, editable, modified\_on }

Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare’s network. Refer to the <a href="https://developers.cloudflare.com/images/">Image Transformations</a> and <a href="https://developers.cloudflare.com/stream/transform-videos/#getting-started">Video Transformations</a> documentation for more information.

</summary>

id: "transformations"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesTransformationsAllowedOrigins object {id, value, editable, modified\_on }

Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare’s network. Refer to the <a href="https://developers.cloudflare.com/images/">Image Transformations</a> and <a href="https://developers.cloudflare.com/stream/transform-videos/#getting-started">Video Transformations</a> documentation for more information.

</summary>

id: "transformations\_allowed\_origins"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

<a href="#">Link to this property</a>

value: string

Current value of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesTrueClientIPHeader2 object {id, value, editable, modified\_on }

Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

</summary>

id: "true\_client\_ip\_header"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesWAF2 object {id, value, editable, modified\_on }

The WAF examines HTTP requests to your website. It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will ‘challenge’ the web visitor with a page that asks them to submit a CAPTCHA successfully to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare’s WAF will block any traffic identified as illegitimate before it reaches your origin web server. (<a href="https://support.cloudflare.com/hc/en-us/articles/200172016">https://support.cloudflare.com/hc/en-us/articles/200172016</a>).

</summary>

id: "waf"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesWebmcpEnabled object {id, value, editable, modified\_on }

When enabled, Cloudflare injects the WebMCP bridge (bridge.js) into HTML responses for this zone, exposing DOM and Content Credentials tools to an in-browser AI agent via navigator.modelContext. No origin-side code changes are required. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp\_enabled"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZonesWebmcpPacks object {id, value, editable, modified\_on }

Optional per-zone override of which bundled WebMCP tool packs the injected bridge.js activates. Only takes effect when webmcp\_enabled is on. Leave empty to use the bridge’s default pack set. Unknown pack names are ignored by the bridge. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp\_packs"

ID of the zone setting.

<a href="#">Link to this property</a>

value: string

Current value of the zone setting.

maxLength256

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WebP object {id, value, editable, modified\_on }

When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

</summary>

id: "webp"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Websocket object {id, value, editable, modified\_on }

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to <a href="https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-">Can I use Cloudflare with Websockets</a>.

</summary>

id: "websockets"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

value: "off"or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.settings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get zone setting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/$SETTING_ID \
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
    "id": "0rtt",
    "value": "on",
    "editable": true,
    "modified_on": "2014-01-01T05:20:00.12345Z"
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
    "id": "0rtt",
    "value": "on",
    "editable": true,
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```