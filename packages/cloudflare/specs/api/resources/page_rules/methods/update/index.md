---
title: Update a Page Rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Rules](https://developers.cloudflare.com/api/resources/page_rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a Page Rule

PUT/zones/{zone\_id}/pagerules/{pagerule\_id}

Replaces the configuration of an existing Page Rule. The configuration of the updated Page Rule will exactly match the data passed in the API request.

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

`Zone Write``Page Rules Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

pagerule\_id: string

Identifier.

maxLength32

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20pagerule_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

actions: array of <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20always_use_https%20%3E%20(schema)">AlwaysUseHTTPS</a> { id } or <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20automatic_https_rewrites%20%3E%20(schema)">AutomaticHTTPSRewrites</a> { id, value } or <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20browser_cache_ttl%20%3E%20(schema)">BrowserCacheTTL</a> { id, value } or 31 more

The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both.

</summary>

One of the following:

<details>

<summary>

AlwaysUseHTTPS object {id }

</summary>

id: optional "always\_use\_https"

If enabled, any <code>http://`` URL is converted to</code> https://\` through a 301 redirect.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AutomaticHTTPSRewrites object {id, value }

</summary>

id: optional "automatic\_https\_rewrites"

Turn on or off Automatic HTTPS Rewrites.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Automatic HTTPS Rewrites.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

BrowserCacheTTL object {id, value }

</summary>

id: optional "browser\_cache\_ttl"

Control how long resources cached by client browsers remain valid.

<a href="#">Link to this property</a>

value: optional number

The number of seconds to cache resources for. Setting this to 0 enables “Respect Existing Headers”.

maximum31536000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

BrowserCheck object {id, value }

</summary>

id: optional "browser\_check"

Inspect the visitor’s browser for headers commonly associated with spammers and certain bots.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Browser Integrity Check.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

BypassCacheOnCookie object {id, value }

</summary>

id: optional "bypass\_cache\_on\_cookie"

Bypass cache and fetch resources from the origin server if a regular expression matches against a cookie name present in the request.

<a href="#">Link to this property</a>

value: optional string

The regular expression to use for matching cookie names in the request. Refer to <a href="https://developers.cloudflare.com/rules/page-rules/reference/additional-reference/#bypass-cache-on-cookie-setting">Bypass Cache on Cookie setting</a> to learn about limited regular expression support.

maxLength150

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheByDeviceType object {id, value }

</summary>

id: optional "cache\_by\_device\_type"

Separate cached content based on the visitor’s device type.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Cache By Device Type.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheDeceptionArmor object {id, value }

</summary>

id: optional "cache\_deception\_armor"

Protect from web cache deception attacks while still allowing static assets to be cached. This setting verifies that the URL’s extension matches the returned <code>Content-Type</code>.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Cache Deception Armor.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheKeyFields object {id, value }

</summary>

id: optional "cache\_key\_fields"

Control specifically what variables to include when deciding which resources to cache. This allows customers to determine what to cache based on something other than just the URL.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {cookie, header, host, 2 more }

</summary>

<details>

<summary>

cookie: optional object {check\_presence, include }

Controls which cookies appear in the Cache Key.

</summary>

check\_presence: optional array of string

A list of cookies to check for the presence of, without including their actual values.

<a href="#">Link to this property</a>

include: optional array of string

A list of cookies to include.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

header: optional object {check\_presence, exclude, include }

Controls which headers go into the Cache Key. Exactly one of <code>include</code> or <code>exclude</code> is expected.

</summary>

check\_presence: optional array of string

A list of headers to check for the presence of, without including their actual values.

<a href="#">Link to this property</a>

exclude: optional array of string

A list of headers to ignore.

<a href="#">Link to this property</a>

include: optional array of string

A list of headers to include.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

host: optional object {resolved }

Determines which host header to include in the Cache Key.

</summary>

resolved: optional boolean

Whether to include the Host header in the HTTP request sent to the origin.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

query\_string: optional object {exclude, include }

Controls which URL query string parameters go into the Cache Key. Exactly one of <code>include</code> or <code>exclude</code> is expected.

</summary>

<details>

<summary>

exclude: optional "\*"or array of string

Ignore all query string parameters.

</summary>

One of the following:

"\*"

Ignore all query string parameters.

<a href="#">Link to this property</a>

array of string

A list of query string parameters to ignore.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional "\*"or array of string

Include all query string parameters.

</summary>

One of the following:

"\*"

Include all query string parameters.

<a href="#">Link to this property</a>

array of string

A list of query string parameters to include.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user: optional object {device\_type, geo, lang }

Feature fields to add features about the end-user (client) into the Cache Key.

</summary>

device\_type: optional boolean

Classifies a request as <code>mobile</code>, <code>desktop</code>, or <code>tablet</code> based on the User Agent.

<a href="#">Link to this property</a>

geo: optional boolean

Includes the client’s country, derived from the IP address.

<a href="#">Link to this property</a>

lang: optional boolean

Includes the first language code contained in the <code>Accept-Language</code> header sent by the client.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheLevel object {id, value }

</summary>

id: optional "cache\_level"

Apply custom caching based on the option selected.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "bypass"or "basic"or "simplified"or 2 more

- <code>bypass</code>: Cloudflare does not cache.
- <code>basic</code>: Delivers resources from cache when there is no query string.
- <code>simplified</code>: Delivers the same resource to everyone independent of the query string.
- <code>aggressive</code>: Caches all static content that has a query string.
- <code>cache_everything</code>: Treats all content as static and caches all file types beyond the <a href="https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions">Cloudflare default cached content</a>.

</summary>

One of the following:

"bypass"

<a href="#">Link to this property</a>

"basic"

<a href="#">Link to this property</a>

"simplified"

<a href="#">Link to this property</a>

"aggressive"

<a href="#">Link to this property</a>

"cache\_everything"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheOnCookie object {id, value }

</summary>

id: optional "cache\_on\_cookie"

Apply the Cache Everything option (Cache Level setting) based on a regular expression match against a cookie name.

<a href="#">Link to this property</a>

value: optional string

The regular expression to use for matching cookie names in the request.

maxLength150

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheTTLByStatus object {id, value }

</summary>

id: optional "cache\_ttl\_by\_status"

Enterprise customers can set cache time-to-live (TTL) based on the response status from the origin web server. Cache TTL refers to the duration of a resource in the Cloudflare network before being marked as stale or discarded from cache. Status codes are returned by a resource’s origin. Setting cache TTL based on response status overrides the default cache behavior (standard caching) for static files and overrides cache instructions sent by the origin web server. To cache non-static assets, set a Cache Level of Cache Everything using a Page Rule. Setting no-store Cache-Control or a low TTL (using <code>max-age</code>/<code>s-maxage</code>) increases requests to origin web servers and decreases performance.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional map\["no-cache"or "no-store"or number]

A JSON object containing status codes and their corresponding TTLs. Each key-value pair in the cache TTL by status cache rule has the following syntax

- <code>status_code</code>: An integer value such as 200 or 500. status\_code matches the exact status code from the origin web server. Valid status codes are between 100-999.
- <code>status_code_range</code>: Integer values for from and to. status\_code\_range matches any status code from the origin web server within the specified range.
- <code>value</code>: An integer value that defines the duration an asset is valid in seconds or one of the following strings: no-store (equivalent to -1), no-cache (equivalent to 0).

</summary>

One of the following:

<details>

<summary>

"no-cache"or "no-store"

<code>no-store</code> (equivalent to -1), <code>no-cache</code> (equivalent to 0)

</summary>

One of the following:

"no-cache"

<a href="#">Link to this property</a>

"no-store"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

number

An integer value that defines the duration an asset is valid in seconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DisableApps object {id }

</summary>

id: optional "disable\_apps"

Turn off all active <a href="https://developers.cloudflare.com/support/more-dashboard-apps/cloudflare-apps/">Cloudflare Apps</a> (deprecated).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DisablePerformance object {id }

</summary>

id: optional "disable\_performance"

Turn off <a href="https://developers.cloudflare.com/speed/optimization/content/rocket-loader/">Rocket Loader</a>, and <a href="https://developers.cloudflare.com/images/polish/">Polish</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DisableSecurity object {id }

</summary>

id: optional "disable\_security"

Turn off <a href="https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/">Email Obfuscation</a>, <a href="https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/">Rate Limiting (previous version, deprecated)</a>, <a href="https://developers.cloudflare.com/waf/tools/scrape-shield/">Scrape Shield</a>, <a href="https://developers.cloudflare.com/waf/tools/zone-lockdown/">URL (Zone) Lockdown</a>, and <a href="https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/">WAF managed rules (previous version, deprecated)</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DisableZaraz object {id }

</summary>

id: optional "disable\_zaraz"

Turn off <a href="https://developers.cloudflare.com/zaraz/">Zaraz</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EdgeCacheTTL object {id, value }

</summary>

id: optional "edge\_cache\_ttl"

Specify how long to cache a resource in the Cloudflare global network. *Edge Cache TTL* is not visible in response headers.

<a href="#">Link to this property</a>

value: optional number

maximum31536000

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailObfuscation object {id, value }

</summary>

id: optional "email\_obfuscation"

Turn on or off **Email Obfuscation**.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Email Obfuscation.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExplicitCacheControl object {id, value }

</summary>

id: optional "explicit\_cache\_control"

Origin Cache Control is enabled by default for Free, Pro, and Business domains and disabled by default for Enterprise domains.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Origin Cache Control.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ForwardingURL object {id, value }

</summary>

id: optional "forwarding\_url"

Redirects one URL to another using an <code>HTTP 301/302</code> redirect. Refer to <a href="https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/">Wildcard matching and referencing</a>.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {status\_code, url }

</summary>

<details>

<summary>

status\_code: optional 301or 302

The status code to use for the URL redirect. 301 is a permanent redirect. 302 is a temporary redirect.

</summary>

One of the following:

301

<a href="#">Link to this property</a>

302

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to redirect the request to. Notes: ${num} refers to the position of ’\*’ in the constraint value.

maxLength1500

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HostHeaderOverride object {id, value }

</summary>

id: optional "host\_header\_override"

Apply a specific host header.

<a href="#">Link to this property</a>

value: optional string

The hostname to use in the <code>Host</code> header

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPGeolocation object {id, value }

</summary>

id: optional "ip\_geolocation"

Cloudflare adds a CF-IPCountry HTTP header containing the country code that corresponds to the visitor.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of adding the IP Geolocation Header.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Mirage object {id, value }

</summary>

id: optional "mirage"

Cloudflare Mirage reduces bandwidth used by images in mobile browsers. It can accelerate loading of image-heavy websites on very slow mobile connections and HTTP/1.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Mirage.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OpportunisticEncryption object {id, value }

</summary>

id: optional "opportunistic\_encryption"

Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel. It’s not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Opportunistic Encryption.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OriginErrorPagePassThru object {id, value }

</summary>

id: optional "origin\_error\_page\_pass\_thru"

Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Origin Error Page Passthru.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Polish object {id, value }

</summary>

id: optional "polish"

Apply options from the Polish feature of the Cloudflare Speed app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "off"or "lossless"or "lossy"

The level of Polish you want applied to your origin.

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ResolveOverride object {id, value }

</summary>

id: optional "resolve\_override"

Change the origin address to the value specified in this setting.

<a href="#">Link to this property</a>

value: optional string

The origin address you want to override with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RespectStrongEtag object {id, value }

</summary>

id: optional "respect\_strong\_etag"

Turn on or off byte-for-byte equivalency checks between the Cloudflare cache and the origin server.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Respect Strong ETags

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ResponseBuffering object {id, value }

</summary>

id: optional "response\_buffering"

Turn on or off whether Cloudflare should wait for an entire file from the origin server before forwarding it to the site visitor. By default, Cloudflare sends packets to the client as they arrive from the origin server.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Response Buffering

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RocketLoader object {id, value }

</summary>

id: optional "rocket\_loader"

Turn on or off Rocket Loader in the Cloudflare Speed app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Rocket Loader

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecurityLevel object {id, value }

</summary>

id: optional "security\_level"

Control options for the **Security Level** feature from the **Security** app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "off"or "essentially\_off"or "low"or 3 more

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SortQueryStringForCache object {id, value }

</summary>

id: optional "sort\_query\_string\_for\_cache"

Turn on or off the reordering of query strings. When query strings have the same structure, caching improves.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Query String Sort

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SSL object {id, value }

</summary>

id: optional "ssl"

Control options for the SSL feature of the Edge Certificates tab in the Cloudflare SSL/TLS app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "off"or "flexible"or "full"or 2 more

The encryption mode that Cloudflare uses to connect to your origin server.

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

"origin\_pull"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TrueClientIPHeader object {id, value }

</summary>

id: optional "true\_client\_ip\_header"

Turn on or off the True-Client-IP Header feature of the Cloudflare Network app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of True Client IP Header.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WAF object {id, value }

</summary>

id: optional "waf"

Turn on or off <a href="https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/">WAF managed rules (previous version, deprecated)</a>. You cannot enable or disable individual WAF managed rules via Page Rules.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of WAF managed rules (previous version).

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20actions%20%3E%20(schema)>)

<details>

<summary>

targets: array of <a href="https://developers.cloudflare.com/api/resources/page_rules#(resource)%20page_rules%20%3E%20(model)%20target%20%3E%20(schema)">Target</a> { constraint, target }

The rule targets to evaluate on each request.

</summary>

<details>

<summary>

constraint: optional object {operator, value }

String constraint.

</summary>

<details>

<summary>

operator: "matches"or "contains"or "equals"or 2 more

The matches operator can use asterisks and pipes as wildcard and ‘or’ operators.

</summary>

One of the following:

"matches"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"equals"

<a href="#">Link to this property</a>

"not\_equal"

<a href="#">Link to this property</a>

"not\_contain"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

The URL pattern to match against the current request. The pattern may contain up to four asterisks (’\*’) as placeholders.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

target: optional "url"

A target based on the URL of the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20targets%20%3E%20(schema)>)

priority: optional number

The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: `/images/*`) but want a more specific Page Rule to take precedence (rule B: `/images/special/*`), specify a higher priority for rule B so it overrides rule A.

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20priority%20%3E%20(schema)>)

<details>

<summary>

status: optional "active"or "disabled"

The status of the Page Rule.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/page_rules#(resource)%20page_rules%20%3E%20(model)%20page_rule%20%3E%20(schema)">PageRule</a> { id, actions, created\_on, 4 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

actions: array of <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20always_use_https%20%3E%20(schema)">AlwaysUseHTTPS</a> { id } or <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20automatic_https_rewrites%20%3E%20(schema)">AutomaticHTTPSRewrites</a> { id, value } or <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20browser_cache_ttl%20%3E%20(schema)">BrowserCacheTTL</a> { id, value } or 31 more

The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both.

</summary>

One of the following:

<details>

<summary>

AlwaysUseHTTPS object {id }

</summary>

id: optional "always\_use\_https"

If enabled, any <code>http://`` URL is converted to</code> https://\` through a 301 redirect.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AutomaticHTTPSRewrites object {id, value }

</summary>

id: optional "automatic\_https\_rewrites"

Turn on or off Automatic HTTPS Rewrites.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Automatic HTTPS Rewrites.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

BrowserCacheTTL object {id, value }

</summary>

id: optional "browser\_cache\_ttl"

Control how long resources cached by client browsers remain valid.

<a href="#">Link to this property</a>

value: optional number

The number of seconds to cache resources for. Setting this to 0 enables “Respect Existing Headers”.

maximum31536000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

BrowserCheck object {id, value }

</summary>

id: optional "browser\_check"

Inspect the visitor’s browser for headers commonly associated with spammers and certain bots.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Browser Integrity Check.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

BypassCacheOnCookie object {id, value }

</summary>

id: optional "bypass\_cache\_on\_cookie"

Bypass cache and fetch resources from the origin server if a regular expression matches against a cookie name present in the request.

<a href="#">Link to this property</a>

value: optional string

The regular expression to use for matching cookie names in the request. Refer to <a href="https://developers.cloudflare.com/rules/page-rules/reference/additional-reference/#bypass-cache-on-cookie-setting">Bypass Cache on Cookie setting</a> to learn about limited regular expression support.

maxLength150

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheByDeviceType object {id, value }

</summary>

id: optional "cache\_by\_device\_type"

Separate cached content based on the visitor’s device type.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Cache By Device Type.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheDeceptionArmor object {id, value }

</summary>

id: optional "cache\_deception\_armor"

Protect from web cache deception attacks while still allowing static assets to be cached. This setting verifies that the URL’s extension matches the returned <code>Content-Type</code>.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Cache Deception Armor.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheKeyFields object {id, value }

</summary>

id: optional "cache\_key\_fields"

Control specifically what variables to include when deciding which resources to cache. This allows customers to determine what to cache based on something other than just the URL.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {cookie, header, host, 2 more }

</summary>

<details>

<summary>

cookie: optional object {check\_presence, include }

Controls which cookies appear in the Cache Key.

</summary>

check\_presence: optional array of string

A list of cookies to check for the presence of, without including their actual values.

<a href="#">Link to this property</a>

include: optional array of string

A list of cookies to include.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

header: optional object {check\_presence, exclude, include }

Controls which headers go into the Cache Key. Exactly one of <code>include</code> or <code>exclude</code> is expected.

</summary>

check\_presence: optional array of string

A list of headers to check for the presence of, without including their actual values.

<a href="#">Link to this property</a>

exclude: optional array of string

A list of headers to ignore.

<a href="#">Link to this property</a>

include: optional array of string

A list of headers to include.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

host: optional object {resolved }

Determines which host header to include in the Cache Key.

</summary>

resolved: optional boolean

Whether to include the Host header in the HTTP request sent to the origin.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

query\_string: optional object {exclude, include }

Controls which URL query string parameters go into the Cache Key. Exactly one of <code>include</code> or <code>exclude</code> is expected.

</summary>

<details>

<summary>

exclude: optional "\*"or array of string

Ignore all query string parameters.

</summary>

One of the following:

"\*"

Ignore all query string parameters.

<a href="#">Link to this property</a>

array of string

A list of query string parameters to ignore.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional "\*"or array of string

Include all query string parameters.

</summary>

One of the following:

"\*"

Include all query string parameters.

<a href="#">Link to this property</a>

array of string

A list of query string parameters to include.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user: optional object {device\_type, geo, lang }

Feature fields to add features about the end-user (client) into the Cache Key.

</summary>

device\_type: optional boolean

Classifies a request as <code>mobile</code>, <code>desktop</code>, or <code>tablet</code> based on the User Agent.

<a href="#">Link to this property</a>

geo: optional boolean

Includes the client’s country, derived from the IP address.

<a href="#">Link to this property</a>

lang: optional boolean

Includes the first language code contained in the <code>Accept-Language</code> header sent by the client.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheLevel object {id, value }

</summary>

id: optional "cache\_level"

Apply custom caching based on the option selected.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "bypass"or "basic"or "simplified"or 2 more

- <code>bypass</code>: Cloudflare does not cache.
- <code>basic</code>: Delivers resources from cache when there is no query string.
- <code>simplified</code>: Delivers the same resource to everyone independent of the query string.
- <code>aggressive</code>: Caches all static content that has a query string.
- <code>cache_everything</code>: Treats all content as static and caches all file types beyond the <a href="https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions">Cloudflare default cached content</a>.

</summary>

One of the following:

"bypass"

<a href="#">Link to this property</a>

"basic"

<a href="#">Link to this property</a>

"simplified"

<a href="#">Link to this property</a>

"aggressive"

<a href="#">Link to this property</a>

"cache\_everything"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheOnCookie object {id, value }

</summary>

id: optional "cache\_on\_cookie"

Apply the Cache Everything option (Cache Level setting) based on a regular expression match against a cookie name.

<a href="#">Link to this property</a>

value: optional string

The regular expression to use for matching cookie names in the request.

maxLength150

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CacheTTLByStatus object {id, value }

</summary>

id: optional "cache\_ttl\_by\_status"

Enterprise customers can set cache time-to-live (TTL) based on the response status from the origin web server. Cache TTL refers to the duration of a resource in the Cloudflare network before being marked as stale or discarded from cache. Status codes are returned by a resource’s origin. Setting cache TTL based on response status overrides the default cache behavior (standard caching) for static files and overrides cache instructions sent by the origin web server. To cache non-static assets, set a Cache Level of Cache Everything using a Page Rule. Setting no-store Cache-Control or a low TTL (using <code>max-age</code>/<code>s-maxage</code>) increases requests to origin web servers and decreases performance.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional map\["no-cache"or "no-store"or number]

A JSON object containing status codes and their corresponding TTLs. Each key-value pair in the cache TTL by status cache rule has the following syntax

- <code>status_code</code>: An integer value such as 200 or 500. status\_code matches the exact status code from the origin web server. Valid status codes are between 100-999.
- <code>status_code_range</code>: Integer values for from and to. status\_code\_range matches any status code from the origin web server within the specified range.
- <code>value</code>: An integer value that defines the duration an asset is valid in seconds or one of the following strings: no-store (equivalent to -1), no-cache (equivalent to 0).

</summary>

One of the following:

<details>

<summary>

"no-cache"or "no-store"

<code>no-store</code> (equivalent to -1), <code>no-cache</code> (equivalent to 0)

</summary>

One of the following:

"no-cache"

<a href="#">Link to this property</a>

"no-store"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

number

An integer value that defines the duration an asset is valid in seconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DisableApps object {id }

</summary>

id: optional "disable\_apps"

Turn off all active <a href="https://developers.cloudflare.com/support/more-dashboard-apps/cloudflare-apps/">Cloudflare Apps</a> (deprecated).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DisablePerformance object {id }

</summary>

id: optional "disable\_performance"

Turn off <a href="https://developers.cloudflare.com/speed/optimization/content/rocket-loader/">Rocket Loader</a>, and <a href="https://developers.cloudflare.com/images/polish/">Polish</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DisableSecurity object {id }

</summary>

id: optional "disable\_security"

Turn off <a href="https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/">Email Obfuscation</a>, <a href="https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/">Rate Limiting (previous version, deprecated)</a>, <a href="https://developers.cloudflare.com/waf/tools/scrape-shield/">Scrape Shield</a>, <a href="https://developers.cloudflare.com/waf/tools/zone-lockdown/">URL (Zone) Lockdown</a>, and <a href="https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/">WAF managed rules (previous version, deprecated)</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DisableZaraz object {id }

</summary>

id: optional "disable\_zaraz"

Turn off <a href="https://developers.cloudflare.com/zaraz/">Zaraz</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EdgeCacheTTL object {id, value }

</summary>

id: optional "edge\_cache\_ttl"

Specify how long to cache a resource in the Cloudflare global network. *Edge Cache TTL* is not visible in response headers.

<a href="#">Link to this property</a>

value: optional number

maximum31536000

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailObfuscation object {id, value }

</summary>

id: optional "email\_obfuscation"

Turn on or off **Email Obfuscation**.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Email Obfuscation.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExplicitCacheControl object {id, value }

</summary>

id: optional "explicit\_cache\_control"

Origin Cache Control is enabled by default for Free, Pro, and Business domains and disabled by default for Enterprise domains.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Origin Cache Control.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ForwardingURL object {id, value }

</summary>

id: optional "forwarding\_url"

Redirects one URL to another using an <code>HTTP 301/302</code> redirect. Refer to <a href="https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/">Wildcard matching and referencing</a>.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {status\_code, url }

</summary>

<details>

<summary>

status\_code: optional 301or 302

The status code to use for the URL redirect. 301 is a permanent redirect. 302 is a temporary redirect.

</summary>

One of the following:

301

<a href="#">Link to this property</a>

302

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to redirect the request to. Notes: ${num} refers to the position of ’\*’ in the constraint value.

maxLength1500

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HostHeaderOverride object {id, value }

</summary>

id: optional "host\_header\_override"

Apply a specific host header.

<a href="#">Link to this property</a>

value: optional string

The hostname to use in the <code>Host</code> header

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPGeolocation object {id, value }

</summary>

id: optional "ip\_geolocation"

Cloudflare adds a CF-IPCountry HTTP header containing the country code that corresponds to the visitor.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of adding the IP Geolocation Header.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Mirage object {id, value }

</summary>

id: optional "mirage"

Cloudflare Mirage reduces bandwidth used by images in mobile browsers. It can accelerate loading of image-heavy websites on very slow mobile connections and HTTP/1.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Mirage.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OpportunisticEncryption object {id, value }

</summary>

id: optional "opportunistic\_encryption"

Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel. It’s not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Opportunistic Encryption.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OriginErrorPagePassThru object {id, value }

</summary>

id: optional "origin\_error\_page\_pass\_thru"

Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Origin Error Page Passthru.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Polish object {id, value }

</summary>

id: optional "polish"

Apply options from the Polish feature of the Cloudflare Speed app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "off"or "lossless"or "lossy"

The level of Polish you want applied to your origin.

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ResolveOverride object {id, value }

</summary>

id: optional "resolve\_override"

Change the origin address to the value specified in this setting.

<a href="#">Link to this property</a>

value: optional string

The origin address you want to override with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RespectStrongEtag object {id, value }

</summary>

id: optional "respect\_strong\_etag"

Turn on or off byte-for-byte equivalency checks between the Cloudflare cache and the origin server.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Respect Strong ETags

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ResponseBuffering object {id, value }

</summary>

id: optional "response\_buffering"

Turn on or off whether Cloudflare should wait for an entire file from the origin server before forwarding it to the site visitor. By default, Cloudflare sends packets to the client as they arrive from the origin server.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Response Buffering

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

RocketLoader object {id, value }

</summary>

id: optional "rocket\_loader"

Turn on or off Rocket Loader in the Cloudflare Speed app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Rocket Loader

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecurityLevel object {id, value }

</summary>

id: optional "security\_level"

Control options for the **Security Level** feature from the **Security** app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "off"or "essentially\_off"or "low"or 3 more

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SortQueryStringForCache object {id, value }

</summary>

id: optional "sort\_query\_string\_for\_cache"

Turn on or off the reordering of query strings. When query strings have the same structure, caching improves.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of Query String Sort

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SSL object {id, value }

</summary>

id: optional "ssl"

Control options for the SSL feature of the Edge Certificates tab in the Cloudflare SSL/TLS app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "off"or "flexible"or "full"or 2 more

The encryption mode that Cloudflare uses to connect to your origin server.

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

"origin\_pull"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TrueClientIPHeader object {id, value }

</summary>

id: optional "true\_client\_ip\_header"

Turn on or off the True-Client-IP Header feature of the Cloudflare Network app.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of True Client IP Header.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WAF object {id, value }

</summary>

id: optional "waf"

Turn on or off <a href="https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/">WAF managed rules (previous version, deprecated)</a>. You cannot enable or disable individual WAF managed rules via Page Rules.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

The status of WAF managed rules (previous version).

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

The timestamp of when the Page Rule was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

The timestamp of when the Page Rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

priority: number

The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: <code>/images/*</code>) but want a more specific Page Rule to take precedence (rule B: <code>/images/special/*</code>), specify a higher priority for rule B so it overrides rule A.

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "disabled"

The status of the Page Rule.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

targets: array of <a href="https://developers.cloudflare.com/api/resources/page_rules#(resource)%20page_rules%20%3E%20(model)%20target%20%3E%20(schema)">Target</a> { constraint, target }

The rule targets to evaluate on each request.

</summary>

<details>

<summary>

constraint: optional object {operator, value }

String constraint.

</summary>

<details>

<summary>

operator: "matches"or "contains"or "equals"or 2 more

The matches operator can use asterisks and pipes as wildcard and ‘or’ operators.

</summary>

One of the following:

"matches"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"equals"

<a href="#">Link to this property</a>

"not\_equal"

<a href="#">Link to this property</a>

"not\_contain"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

The URL pattern to match against the current request. The pattern may contain up to four asterisks (’\*’) as placeholders.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

target: optional "url"

A target based on the URL of the request.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_rules%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a Page Rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/pagerules/$PAGERULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "actions": [
            {
              "id": "browser_check",
              "value": "on"
            }
          ],
          "targets": [
            {
              "constraint": {
                "operator": "matches",
                "value": "*example.com/images/*"
              },
              "target": "url"
            }
          ],
          "status": "active"
        }'
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "actions": [
      {
        "id": "browser_check",
        "value": "on"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "priority": 0,
    "status": "active",
    "targets": [
      {
        "constraint": {
          "operator": "matches",
          "value": "*example.com/images/*"
        },
        "target": "url"
      }
    ]
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "actions": [
      {
        "id": "browser_check",
        "value": "on"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "priority": 0,
    "status": "active",
    "targets": [
      {
        "constraint": {
          "operator": "matches",
          "value": "*example.com/images/*"
        },
        "target": "url"
      }
    ]
  }
}
```