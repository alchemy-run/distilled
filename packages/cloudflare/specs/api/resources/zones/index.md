##### [List Zones](/api/resources/zones/methods/list)

GET/zones

##### [Zone Details](/api/resources/zones/methods/get)

GET/zones/{zone_id}

##### [Create Zone](/api/resources/zones/methods/create)

POST/zones

##### [Edit Zone](/api/resources/zones/methods/edit)

PATCH/zones/{zone_id}

##### [Delete Zone](/api/resources/zones/methods/delete)

DELETE/zones/{zone_id}

##### Models

<details>

<summary>

Type = "full" or "partial" or "secondary" or "internal"

A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup.

</summary>

One of the following:

"full"

[Link to this property](#)

"partial"

[Link to this property](#)

"secondary"

[Link to this property](#)

"internal"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Zone object { id, account, activated_on, 20 more }

</summary>

id: string

Identifier

maxLength32

[Link to this property](#)

<details>

<summary>

account: object { id, name }

The account the zone belongs to.

</summary>

id: optional string

Identifier

maxLength32

[Link to this property](#)

name: optional string

The name of the account.

[Link to this property](#)

</details>

[Link to this property](#)

activated_on: string

The last time proof of ownership was detected and the zone was made active.

formatdate-time

[Link to this property](#)

created_on: string

When the zone was created.

formatdate-time

[Link to this property](#)

development_mode: number

The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is 0.

[Link to this property](#)

<details>

<summary>

meta: object { cdn_only, custom_certificate_quota, dns_only, 4 more }

Metadata about the zone.

</summary>

cdn_only: optional boolean

The zone is only configured for CDN.

[Link to this property](#)

custom_certificate_quota: optional number

Number of Custom Certificates the zone can have.

[Link to this property](#)

dns_only: optional boolean

The zone is only configured for DNS.

[Link to this property](#)

foundation_dns: optional boolean

The zone is setup with Foundation DNS.

[Link to this property](#)

page_rule_quota: optional number

Number of Page Rules a zone can have.

[Link to this property](#)

phishing_detected: optional boolean

The zone has been flagged for phishing.

[Link to this property](#)

step: optional number

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the zone was last modified.

formatdate-time

[Link to this property](#)

name: string

The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment (“label”) not exceeding 63 characters.

maxLength253

[Link to this property](#)

name_servers: array of string

The name servers Cloudflare assigns to a zone.

[Link to this property](#)

original_dnshost: string

DNS host at the time of switching to Cloudflare.

maxLength50

[Link to this property](#)

original_name_servers: array of string

Original name servers before moving to Cloudflare.

[Link to this property](#)

original_registrar: string

Registrar for the domain at the time of switching to Cloudflare.

[Link to this property](#)

<details>

<summary>

owner: object { id, name, type }

The owner of the zone.

</summary>

id: optional string

Identifier

maxLength32

[Link to this property](#)

name: optional string

Name of the owner.

[Link to this property](#)

type: optional string

The type of owner.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Deprecatedplan: object { id, can_subscribe, currency, 7 more }

Please use the `/zones/{zone_id}/subscription` API to update a zone’s plan. Changing this value will create/cancel associated subscriptions. To view available plans for this zone, see [Zone Plans](https://developers.cloudflare.com/api/resources/zones/subresources/plans/).

A Zones subscription information.

</summary>

id: optional string

Identifier

maxLength32

[Link to this property](#)

can_subscribe: optional boolean

States if the subscription can be activated.

[Link to this property](#)

currency: optional string

The denomination of the customer.

[Link to this property](#)

externally_managed: optional boolean

If this Zone is managed by another company.

[Link to this property](#)

frequency: optional string

How often the customer is billed.

[Link to this property](#)

is_subscribed: optional boolean

States if the subscription active.

[Link to this property](#)

legacy_discount: optional boolean

If the legacy discount applies to this Zone.

[Link to this property](#)

legacy_id: optional string

The legacy name of the plan.

[Link to this property](#)

name: optional string

Name of the owner.

[Link to this property](#)

price: optional number

How much the customer is paying.

[Link to this property](#)

</details>

[Link to this property](#)

cname_suffix: optional string

Allows the customer to use a custom apex. Tenants Only Configuration.

[Link to this property](#)

paused: optional boolean

Indicates whether the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits.

[Link to this property](#)

Deprecatedpermissions: optional array of string

This has been replaced by Account memberships.

Legacy permissions based on legacy user membership information.

[Link to this property](#)

<details>

<summary>

status: optional "initializing" or "pending" or "active" or "moved"

The zone status on Cloudflare.

</summary>

One of the following:

"initializing"

[Link to this property](#)

"pending"

[Link to this property](#)

"active"

[Link to this property](#)

"moved"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

tenant: optional object { id, name }

The root organizational unit that this zone belongs to (such as a tenant or organization).

</summary>

id: optional string

Identifier

maxLength32

[Link to this property](#)

name: optional string

The name of the Tenant account.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

tenant_unit: optional object { id }

The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).

</summary>

id: optional string

Identifier

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

type: optional [Type](/api/resources/zones#(resource)%20zones%20%3E%20(model)%20type%20%3E%20(schema))

A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup.

[Link to this property](#)

vanity_name_servers: optional array of string

An array of domains used for custom name servers. This is only available for Business and Enterprise plans.

[Link to this property](#)

verification_key: optional string

Verification key for partial zone setup.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZoneDeleteResponse object { id }

</summary>

id: string

Identifier

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

##### [Rerun the Activation Check](/api/resources/zones/subresources/activation_check/methods/trigger)

PUT/zones/{zone_id}/activation_check

##### Models

<details>

<summary>

ActivationCheckTriggerResponse object { id }

</summary>

id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get all zone settings](/api/resources/zones/subresources/settings/methods/list)

GET/zones/{zone_id}/settings

##### [Get zone setting](/api/resources/zones/subresources/settings/methods/get)

GET/zones/{zone_id}/settings/{setting_id}

##### [Edit zone setting](/api/resources/zones/subresources/settings/methods/edit)

PATCH/zones/{zone_id}/settings/{setting_id}

##### [Edit multiple zone settings](/api/resources/zones/subresources/settings/methods/bulk_edit)

PATCH/zones/{zone_id}/settings

##### Models

<details>

<summary>

AdvancedDDoS object { id, value, editable, modified_on }

Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is ‘on’ in the case of Business and Enterprise zones.

</summary>

id: "advanced_ddos"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Aegis object { id, modified_on, value }

Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

</summary>

id: "aegis"

ID of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional object { enabled, pool_id }

Value of the zone setting.

</summary>

enabled: optional boolean

Whether the feature is enabled or not.

[Link to this property](#)

pool_id: optional string

Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AlwaysOnline object { id, value, editable, modified_on }

When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive’s Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

</summary>

id: "always_online"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AlwaysUseHTTPS object { id }

</summary>

id: optional "always_use_https"

If enabled, any `http://`` URL is converted to `https://` through a 301 redirect.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AutomaticHTTPSRewrites object { id, value }

</summary>

id: optional "automatic_https_rewrites"

Turn on or off Automatic HTTPS Rewrites.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Automatic HTTPS Rewrites.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AutomaticPlatformOptimization object { cache_by_device_type, cf, enabled, 3 more }

</summary>

cache_by_device_type: boolean

Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

[Link to this property](#)

cf: boolean

Indicates whether or not Cloudflare proxy is enabled.

[Link to this property](#)

enabled: boolean

Indicates whether or not Automatic Platform Optimization is enabled.

[Link to this property](#)

hostnames: array of string

An array of hostnames where Automatic Platform Optimization for WordPress is activated.

[Link to this property](#)

wordpress: boolean

Indicates whether or not site is powered by WordPress.

[Link to this property](#)

wp_plugin: boolean

Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Brotli object { id, value, editable, modified_on }

When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

</summary>

id: "brotli"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BrowserCacheTTL object { id, value }

</summary>

id: optional "browser_cache_ttl"

Control how long resources cached by client browsers remain valid.

[Link to this property](#)

value: optional number

The number of seconds to cache resources for. Setting this to 0 enables “Respect Existing Headers”.

maximum31536000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BrowserCheck object { id, value }

</summary>

id: optional "browser_check"

Inspect the visitor’s browser for headers commonly associated with spammers and certain bots.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Browser Integrity Check.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CacheLevel object { id, value }

</summary>

id: optional "cache_level"

Apply custom caching based on the option selected.

[Link to this property](#)

<details>

<summary>

value: optional "bypass" or "basic" or "simplified" or 2 more

`bypass`: Cloudflare does not cache.

`basic`: Delivers resources from cache when there is no query string.

`simplified`: Delivers the same resource to everyone independent of the query string.

`aggressive`: Caches all static content that has a query string.

`cache_everything`: Treats all content as static and caches all file types beyond the [Cloudflare default cached content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions).

</summary>

One of the following:

"bypass"

[Link to this property](#)

"basic"

[Link to this property](#)

"simplified"

[Link to this property](#)

"aggressive"

[Link to this property](#)

"cache_everything"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeTTL object { id, value, editable, modified_on }

Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

</summary>

id: "challenge_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 300 or 900 or 1800 or 11 more

Current value of the zone setting.

</summary>

One of the following:

300

[Link to this property](#)

900

[Link to this property](#)

1800

[Link to this property](#)

2700

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

28800

[Link to this property](#)

57600

[Link to this property](#)

86400

[Link to this property](#)

604800

[Link to this property](#)

2592000

[Link to this property](#)

31536000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ciphers object { id, value, editable, modified_on }

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

</summary>

id: "ciphers"

ID of the zone setting.

[Link to this property](#)

value: array of string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DevelopmentMode object { id, value, editable, 2 more }

Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare’s accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

</summary>

id: "development_mode"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

time_remaining: optional number

Value of the zone setting. Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EarlyHints object { id, value, editable, modified_on }

When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

</summary>

id: "early_hints"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailObfuscation object { id, value }

</summary>

id: optional "email_obfuscation"

Turn on or off Email Obfuscation.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Email Obfuscation.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

FontSettings object { id, editable, modified_on, value }

Enhance your website’s font delivery with Cloudflare Fonts. Deliver Google Hosted fonts from your own domain, boost performance, and enhance user privacy. Refer to the Cloudflare Fonts documentation for more information.

</summary>

id: optional "fonts"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

H2Prioritization object { id, value, editable, modified_on }

HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

</summary>

id: "h2_prioritization"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "custom"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"custom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HotlinkProtection object { id, value, editable, modified_on }

When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it’s not another site requesting them. People will still be able to download and view images from your page, but other sites won’t be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

</summary>

id: "hotlink_protection"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP2 object { id, value, editable, modified_on }

HTTP2 enabled for this zone.

</summary>

id: "http2"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP3 object { id, value, editable, modified_on }

HTTP3 enabled for this zone.

</summary>

id: "http3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ImageResizing object { id, value, editable, modified_on }

Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare’s network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

</summary>

id: "image_resizing"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPGeolocation object { id, value }

</summary>

id: optional "ip_geolocation"

Cloudflare adds a CF-IPCountry HTTP header containing the country code that corresponds to the visitor.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of adding the IP Geolocation Header.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPV6 object { id, value, editable, modified_on }

Enable IPv6 on all subdomains that are Cloudflare enabled. (https://support.cloudflare.com/hc/en-us/articles/200168586).

</summary>

id: "ipv6"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MinTLSVersion object { id, value, editable, modified_on }

Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

</summary>

id: "min_tls_version"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "1.0" or "1.1" or "1.2" or "1.3"

Current value of the zone setting.

</summary>

One of the following:

"1.0"

[Link to this property](#)

"1.1"

[Link to this property](#)

"1.2"

[Link to this property](#)

"1.3"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Mirage object { id, value }

</summary>

id: optional "mirage"

Cloudflare Mirage reduces bandwidth used by images in mobile browsers. It can accelerate loading of image-heavy websites on very slow mobile connections and HTTP/1.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Mirage.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NEL object { id, value, editable, modified_on }

Enable Network Error Logging reporting on your zone. (Beta)

</summary>

id: "nel"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: object { enabled }

Current value of the zone setting.

</summary>

enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpportunisticEncryption object { id, value }

</summary>

id: optional "opportunistic_encryption"

Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel. It’s not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Opportunistic Encryption.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpportunisticOnion object { id, value, editable, modified_on }

Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

</summary>

id: "opportunistic_onion"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OrangeToOrange object { id, value, editable, modified_on }

Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

</summary>

id: "orange_to_orange"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

This setting is deprecated. Orange to Orange (O2O) is applied automatically for eligible zones and no longer requires configuration; this setting only controlled the legacy O2O v1 (Managed CNAME) path. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OriginErrorPagePassThru object { id, value }

</summary>

id: optional "origin_error_page_pass_thru"

Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Origin Error Page Passthru.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OriginMaxHTTPVersion object { id, editable, value, modified_on }

</summary>

id: "origin_max_http_version"

The identifier of the caching setting.

[Link to this property](#)

editable: boolean

Whether the setting is editable.

[Link to this property](#)

<details>

<summary>

value: "2" or "1"

Value of the Origin Max HTTP Version Setting.

</summary>

One of the following:

"2"

[Link to this property](#)

"1"

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Polish object { id, value }

</summary>

id: optional "polish"

Apply options from the Polish feature of the Cloudflare Speed app.

[Link to this property](#)

<details>

<summary>

value: optional "off" or "lossless" or "lossy"

The level of Polish you want applied to your origin.

</summary>

One of the following:

"off"

[Link to this property](#)

"lossless"

[Link to this property](#)

"lossy"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrefetchPreload object { id, value, editable, modified_on }

Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

</summary>

id: "prefetch_preload"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ProxyReadTimeout object { id, value, editable, modified_on }

Maximum time between two read operations from origin.

</summary>

id: "proxy_read_timeout"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PseudoIPV4 object { id, value, editable, modified_on }

The value set for the Pseudo IPv4 setting.

</summary>

id: "pseudo_ipv4"

Value of the Pseudo IPv4 setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "add_header" or "overwrite_header"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"add_header"

[Link to this property](#)

"overwrite_header"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ResponseBuffering object { id, value }

</summary>

id: optional "response_buffering"

Turn on or off whether Cloudflare should wait for an entire file from the origin server before forwarding it to the site visitor. By default, Cloudflare sends packets to the client as they arrive from the origin server.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Response Buffering

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RocketLoader object { id, value }

</summary>

id: optional "rocket_loader"

Turn on or off Rocket Loader in the Cloudflare Speed app.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Rocket Loader

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecurityHeaders object { id, value, editable, modified_on }

Cloudflare security header for a zone.

</summary>

id: "security_header"

ID of the zone’s security header.

[Link to this property](#)

<details>

<summary>

value: object { strict_transport_security }

Current value of the zone setting.

</summary>

<details>

<summary>

strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }

Strict Transport Security.

</summary>

enabled: optional boolean

Whether or not strict transport security is enabled.

[Link to this property](#)

include_subdomains: optional boolean

Include all subdomains for strict transport security.

[Link to this property](#)

max_age: optional number

Max age in seconds of the strict transport security.

[Link to this property](#)

nosniff: optional boolean

Whether or not to include ‘X-Content-Type-Options: nosniff’ header.

[Link to this property](#)

preload: optional boolean

Enable automatic preload of the HSTS configuration.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecurityLevel object { id, value }

</summary>

id: optional "security_level"

Control options for the Security Level feature from the Security app.

[Link to this property](#)

<details>

<summary>

value: optional "off" or "essentially_off" or "low" or 3 more

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

</details>

[Link to this property](#)

<details>

<summary>

ServerSideExcludes object { id, value, editable, modified_on }

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: . For example: Bad visitors won’t see my phone number, 555-555-5555 . Note: SSE only will work with HTML. If you have HTML minification enabled, you won’t see the SSE tags in your HTML source when it’s served through Cloudflare. SSE will still function in this case, as Cloudflare’s HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor’s computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

</summary>

id: "server_side_exclude"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SortQueryStringForCache object { id, value }

</summary>

id: optional "sort_query_string_for_cache"

Turn on or off the reordering of query strings. When query strings have the same structure, caching improves.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of Query String Sort

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSL object { id, value }

</summary>

id: optional "ssl"

Control options for the SSL feature of the Edge Certificates tab in the Cloudflare SSL/TLS app.

[Link to this property](#)

<details>

<summary>

value: optional "off" or "flexible" or "full" or 2 more

The encryption mode that Cloudflare uses to connect to your origin server.

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

</details>

[Link to this property](#)

<details>

<summary>

SSLRecommender object { id, enabled }

Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

</summary>

id: optional "ssl_recommender"

Enrollment value for SSL/TLS Recommender.

[Link to this property](#)

enabled: optional boolean

ssl-recommender enrollment setting.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLS1_3 object { id, value, editable, modified_on }

Enables Crypto TLS 1.3 feature for a zone.

</summary>

id: "tls_1_3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "zrt"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"zrt"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSClientAuth object { id, value, editable, modified_on }

TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

</summary>

id: "tls_client_auth"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TrueClientIPHeader object { id, value }

</summary>

id: optional "true_client_ip_header"

Turn on or off the True-Client-IP Header feature of the Cloudflare Network app.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of True Client IP Header.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WAF object { id, value }

</summary>

id: optional "waf"

Turn on or off [WAF managed rules (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/). You cannot enable or disable individual WAF managed rules via Page Rules.

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

The status of WAF managed rules (previous version).

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebP object { id, value, editable, modified_on }

When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

</summary>

id: "webp"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Websocket object { id, value, editable, modified_on }

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

</summary>

id: "websockets"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZeroRTT object { id, value, editable, modified_on }

0-RTT session resumption enabled for this zone.

</summary>

id: "0rtt"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SettingListResponse = [ZeroRTT](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20zero_rtt%20%3E%20(schema)) { id, value, editable, modified_on } or [AdvancedDDoS](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20advanced_ddos%20%3E%20(schema)) { id, value, editable, modified_on } or object { id, modified_on, value } or 62 more

0-RTT session resumption enabled for this zone.

</summary>

One of the following:

<details>

<summary>

ZeroRTT object { id, value, editable, modified_on }

0-RTT session resumption enabled for this zone.

</summary>

id: "0rtt"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AdvancedDDoS object { id, value, editable, modified_on }

Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is ‘on’ in the case of Business and Enterprise zones.

</summary>

id: "advanced_ddos"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesAegis object { id, modified_on, value }

Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

</summary>

id: "aegis"

ID of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional object { enabled, pool_id }

Value of the zone setting.

</summary>

enabled: optional boolean

Whether the feature is enabled or not.

[Link to this property](#)

pool_id: optional string

Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AlwaysOnline object { id, value, editable, modified_on }

When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive’s Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

</summary>

id: "always_online"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesAlwaysUseHTTPS2 object { id, value, editable, modified_on }

Reply to all requests for URLs that use “http” with a 301 redirect to the equivalent “https” URL. If you only want to redirect for a subset of requests, consider creating an “Always use HTTPS” page rule.

</summary>

id: "always_use_https"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesAutomaticHTTPSRewrites2 object { id, value, editable, modified_on }

Enable the Automatic HTTPS Rewrites feature for this zone.

</summary>

id: "automatic_https_rewrites"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Brotli object { id, value, editable, modified_on }

When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

</summary>

id: "brotli"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesBrowserCacheTTL2 object { id, value, editable, modified_on }

Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors’ computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

</summary>

id: "browser_cache_ttl"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

maximum31536000

minimum0

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesBrowserCheck2 object { id, value, editable, modified_on }

Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page. It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

</summary>

id: "browser_check"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheLevel2 object { id, value, editable, modified_on }

Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

</summary>

id: "cache_level"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "aggressive" or "basic" or "simplified"

Current value of the zone setting.

</summary>

One of the following:

"aggressive"

[Link to this property](#)

"basic"

[Link to this property](#)

"simplified"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeTTL object { id, value, editable, modified_on }

Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

</summary>

id: "challenge_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 300 or 900 or 1800 or 11 more

Current value of the zone setting.

</summary>

One of the following:

300

[Link to this property](#)

900

[Link to this property](#)

1800

[Link to this property](#)

2700

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

28800

[Link to this property](#)

57600

[Link to this property](#)

86400

[Link to this property](#)

604800

[Link to this property](#)

2592000

[Link to this property](#)

31536000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ciphers object { id, value, editable, modified_on }

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

</summary>

id: "ciphers"

ID of the zone setting.

[Link to this property](#)

value: array of string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesContentConverter object { id, value, editable, modified_on }

When enabled and the client sends an Accept header requesting text/markdown, Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service. Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

</summary>

id: "content_converter"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCNAMEFlattening object { id, value, editable, modified_on }

Whether or not cname flattening is on.

</summary>

id: "cname_flattening"

How to flatten the cname destination.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "flatten_at_root" or "flatten_all"

This zone setting is deprecated; please use the DNS Settings route instead. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-03-21

Current value of the zone setting.

</summary>

One of the following:

"flatten_at_root"

[Link to this property](#)

"flatten_all"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DevelopmentMode object { id, value, editable, 2 more }

Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare’s accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

</summary>

id: "development_mode"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

time_remaining: optional number

Value of the zone setting. Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EarlyHints object { id, value, editable, modified_on }

When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

</summary>

id: "early_hints"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesEdgeCacheTTL2 object { id, value, editable, modified_on }

Time (in seconds) that a resource will be ensured to remain on Cloudflare’s cache servers.

</summary>

id: "edge_cache_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 30 or 60 or 300 or 18 more

Current value of the zone setting.

</summary>

One of the following:

30

[Link to this property](#)

60

[Link to this property](#)

300

[Link to this property](#)

1200

[Link to this property](#)

1800

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

18000

[Link to this property](#)

28800

[Link to this property](#)

43200

[Link to this property](#)

57600

[Link to this property](#)

72000

[Link to this property](#)

86400

[Link to this property](#)

172800

[Link to this property](#)

259200

[Link to this property](#)

345600

[Link to this property](#)

432000

[Link to this property](#)

518400

[Link to this property](#)

604800

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesEmailObfuscation2 object { id, value, editable, modified_on }

Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

</summary>

id: "email_obfuscation"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

H2Prioritization object { id, value, editable, modified_on }

HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

</summary>

id: "h2_prioritization"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "custom"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"custom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HotlinkProtection object { id, value, editable, modified_on }

When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it’s not another site requesting them. People will still be able to download and view images from your page, but other sites won’t be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

</summary>

id: "hotlink_protection"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP2 object { id, value, editable, modified_on }

HTTP2 enabled for this zone.

</summary>

id: "http2"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP3 object { id, value, editable, modified_on }

HTTP3 enabled for this zone.

</summary>

id: "http3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ImageResizing object { id, value, editable, modified_on }

Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare’s network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

</summary>

id: "image_resizing"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesIPGeolocation2 object { id, value, editable, modified_on }

Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

</summary>

id: "ip_geolocation"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPV6 object { id, value, editable, modified_on }

Enable IPv6 on all subdomains that are Cloudflare enabled. (https://support.cloudflare.com/hc/en-us/articles/200168586).

</summary>

id: "ipv6"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesMaxUpload object { id, value, editable, modified_on }

Maximum size of an allowable upload.

</summary>

id: "max_upload"

identifier of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 100 or 125 or 150 or 23 more

Current value of the zone setting.

</summary>

One of the following:

100

[Link to this property](#)

125

[Link to this property](#)

150

[Link to this property](#)

175

[Link to this property](#)

200

[Link to this property](#)

225

[Link to this property](#)

250

[Link to this property](#)

275

[Link to this property](#)

300

[Link to this property](#)

325

[Link to this property](#)

350

[Link to this property](#)

375

[Link to this property](#)

400

[Link to this property](#)

425

[Link to this property](#)

450

[Link to this property](#)

475

[Link to this property](#)

500

[Link to this property](#)

1000

[Link to this property](#)

1500

[Link to this property](#)

2000

[Link to this property](#)

2500

[Link to this property](#)

3000

[Link to this property](#)

3500

[Link to this property](#)

4000

[Link to this property](#)

4500

[Link to this property](#)

5000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MinTLSVersion object { id, value, editable, modified_on }

Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

</summary>

id: "min_tls_version"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "1.0" or "1.1" or "1.2" or "1.3"

Current value of the zone setting.

</summary>

One of the following:

"1.0"

[Link to this property](#)

"1.1"

[Link to this property](#)

"1.2"

[Link to this property](#)

"1.3"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesMirage2 object { id, value, editable, modified_on }

Automatically optimize image loading for website visitors on mobile devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed) for more information.

</summary>

id: "mirage"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

Mirage is being deprecated. More information at https://developers.cloudflare.com/speed/optimization/images/mirage/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NEL object { id, value, editable, modified_on }

Enable Network Error Logging reporting on your zone. (Beta)

</summary>

id: "nel"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: object { enabled }

Current value of the zone setting.

</summary>

enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesOpportunisticEncryption2 object { id, value, editable, modified_on }

Enables the Opportunistic Encryption feature for a zone.

</summary>

id: "opportunistic_encryption"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpportunisticOnion object { id, value, editable, modified_on }

Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

</summary>

id: "opportunistic_onion"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OrangeToOrange object { id, value, editable, modified_on }

Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

</summary>

id: "orange_to_orange"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

This setting is deprecated. Orange to Orange (O2O) is applied automatically for eligible zones and no longer requires configuration; this setting only controlled the legacy O2O v1 (Managed CNAME) path. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesOriginErrorPagePassThru2 object { id, value, editable, modified_on }

Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

</summary>

id: "origin_error_page_pass_thru"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }

Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

</summary>

id: "origin_h2_max_streams"

Value of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

value: optional number

Value of the Origin H2 Max Streams Setting.

maximum1000

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }

Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is “2” for all plan types except Enterprise where it is “1”.

</summary>

id: "origin_max_http_version"

Value of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional "2" or "1"

Value of the Origin Max HTTP Version Setting.

</summary>

One of the following:

"2"

[Link to this property](#)

"1"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPolish2 object { id, value, editable, modified_on }

Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

</summary>

id: "polish"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "lossless" or "lossy"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"lossless"

[Link to this property](#)

"lossy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrefetchPreload object { id, value, editable, modified_on }

Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

</summary>

id: "prefetch_preload"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPreRender object { id, value, editable, modified_on }

When enabled, Cloudflare serves pre-rendered HTML to eligible search and AI crawlers instead of the origin’s unrendered response.

</summary>

id: "pre_render"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPrivacyPass object { id, value, editable, modified_on }

Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

</summary>

id: "privacy_pass"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

Privacy Pass v1 was deprecated in 2023. (Announcement - https://blog.cloudflare.com/privacy-pass-standard/) and (API deprecation details - https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31)

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ProxyReadTimeout object { id, value, editable, modified_on }

Maximum time between two read operations from origin.

</summary>

id: "proxy_read_timeout"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PseudoIPV4 object { id, value, editable, modified_on }

The value set for the Pseudo IPv4 setting.

</summary>

id: "pseudo_ipv4"

Value of the Pseudo IPv4 setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "add_header" or "overwrite_header"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"add_header"

[Link to this property](#)

"overwrite_header"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesRedirectsForAITraining object { id, value, editable, modified_on }

When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs found in the HTML response, ensuring AI models train on authoritative content.

</summary>

id: "redirects_for_ai_training"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesReplaceInsecureJS object { id, value, editable, modified_on }

Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

</summary>

id: "replace_insecure_js"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesResponseBuffering2 object { id, value, editable, modified_on }

Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

</summary>

id: "response_buffering"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesRocketLoader2 object { id, value, editable, modified_on }

Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site’s Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page’s rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

</summary>

id: "rocket_loader"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }

[Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare’s edge network and caches third-party fonts.

</summary>

id: "automatic_platform_optimization"

ID of the zone setting.

[Link to this property](#)

value: [AutomaticPlatformOptimization](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20automatic_platform_optimization%20%3E%20(schema)) { cache_by_device_type, cf, enabled, 3 more }

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSearchForAgents object { id, value, editable, modified_on }

When enabled, Cloudflare provisions an AI Search instance for the zone and exposes a /.well-known/ai-search endpoint that AI agents can query. Markdown responses also receive an agent: YAML capability block advertising the search endpoint.

</summary>

id: "search_for_agents"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecurityHeaders object { id, value, editable, modified_on }

Cloudflare security header for a zone.

</summary>

id: "security_header"

ID of the zone’s security header.

[Link to this property](#)

<details>

<summary>

value: object { strict_transport_security }

Current value of the zone setting.

</summary>

<details>

<summary>

strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }

Strict Transport Security.

</summary>

enabled: optional boolean

Whether or not strict transport security is enabled.

[Link to this property](#)

include_subdomains: optional boolean

Include all subdomains for strict transport security.

[Link to this property](#)

max_age: optional number

Max age in seconds of the strict transport security.

[Link to this property](#)

nosniff: optional boolean

Whether or not to include ‘X-Content-Type-Options: nosniff’ header.

[Link to this property](#)

preload: optional boolean

Enable automatic preload of the HSTS configuration.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSecurityLevel2 object { id, value, editable, modified_on }

Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

</summary>

id: "security_level"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "essentially_off" or "low" or 3 more

Current value of the zone setting.

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

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServerSideExcludes object { id, value, editable, modified_on }

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: . For example: Bad visitors won’t see my phone number, 555-555-5555 . Note: SSE only will work with HTML. If you have HTML minification enabled, you won’t see the SSE tags in your HTML source when it’s served through Cloudflare. SSE will still function in this case, as Cloudflare’s HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor’s computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

</summary>

id: "server_side_exclude"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSha1Support object { id, value, editable, modified_on }

Allow SHA1 support.

</summary>

id: "sha1_support"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSortQueryStringForCache2 object { id, value, editable, modified_on }

Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

</summary>

id: "sort_query_string_for_cache"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSSL2 object { id, value, editable, modified_on }

SSL encrypts your visitor’s connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don’t need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

</summary>

id: "ssl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "flexible" or "full" or "strict"

Current value of the zone setting.

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

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSLRecommender object { id, enabled }

Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

</summary>

id: optional "ssl_recommender"

Enrollment value for SSL/TLS Recommender.

[Link to this property](#)

enabled: optional boolean

ssl-recommender enrollment setting.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTLS1_2Only object { id, value, editable, modified_on }

Only allows TLS1.2.

</summary>

id: "tls_1_2_only"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLS1_3 object { id, value, editable, modified_on }

Enables Crypto TLS 1.3 feature for a zone.

</summary>

id: "tls_1_3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "zrt"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"zrt"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSClientAuth object { id, value, editable, modified_on }

TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

</summary>

id: "tls_client_auth"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTransformations object { id, value, editable, modified_on }

Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare’s network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

</summary>

id: "transformations"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }

Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare’s network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

</summary>

id: "transformations_allowed_origins"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

[Link to this property](#)

value: string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTrueClientIPHeader2 object { id, value, editable, modified_on }

Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

</summary>

id: "true_client_ip_header"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWAF2 object { id, value, editable, modified_on }

The WAF examines HTTP requests to your website. It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will ‘challenge’ the web visitor with a page that asks them to submit a CAPTCHA successfully to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare’s WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

</summary>

id: "waf"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWebmcpEnabled object { id, value, editable, modified_on }

When enabled, Cloudflare injects the WebMCP bridge (bridge.js) into HTML responses for this zone, exposing DOM and Content Credentials tools to an in-browser AI agent via navigator.modelContext. No origin-side code changes are required. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp_enabled"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWebmcpPacks object { id, value, editable, modified_on }

Optional per-zone override of which bundled WebMCP tool packs the injected bridge.js activates. Only takes effect when webmcp_enabled is on. Leave empty to use the bridge’s default pack set. Unknown pack names are ignored by the bridge. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp_packs"

ID of the zone setting.

[Link to this property](#)

value: string

Current value of the zone setting.

maxLength256

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebP object { id, value, editable, modified_on }

When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

</summary>

id: "webp"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Websocket object { id, value, editable, modified_on }

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

</summary>

id: "websockets"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SettingGetResponse = [ZeroRTT](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20zero_rtt%20%3E%20(schema)) { id, value, editable, modified_on } or [AdvancedDDoS](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20advanced_ddos%20%3E%20(schema)) { id, value, editable, modified_on } or object { id, modified_on, value } or 63 more

0-RTT session resumption enabled for this zone.

</summary>

One of the following:

<details>

<summary>

ZeroRTT object { id, value, editable, modified_on }

0-RTT session resumption enabled for this zone.

</summary>

id: "0rtt"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AdvancedDDoS object { id, value, editable, modified_on }

Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is ‘on’ in the case of Business and Enterprise zones.

</summary>

id: "advanced_ddos"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesAegis object { id, modified_on, value }

Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

</summary>

id: "aegis"

ID of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional object { enabled, pool_id }

Value of the zone setting.

</summary>

enabled: optional boolean

Whether the feature is enabled or not.

[Link to this property](#)

pool_id: optional string

Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AlwaysOnline object { id, value, editable, modified_on }

When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive’s Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

</summary>

id: "always_online"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesAlwaysUseHTTPS2 object { id, value, editable, modified_on }

Reply to all requests for URLs that use “http” with a 301 redirect to the equivalent “https” URL. If you only want to redirect for a subset of requests, consider creating an “Always use HTTPS” page rule.

</summary>

id: "always_use_https"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesAutomaticHTTPSRewrites2 object { id, value, editable, modified_on }

Enable the Automatic HTTPS Rewrites feature for this zone.

</summary>

id: "automatic_https_rewrites"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Brotli object { id, value, editable, modified_on }

When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

</summary>

id: "brotli"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesBrowserCacheTTL2 object { id, value, editable, modified_on }

Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors’ computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

</summary>

id: "browser_cache_ttl"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

maximum31536000

minimum0

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesBrowserCheck2 object { id, value, editable, modified_on }

Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page. It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

</summary>

id: "browser_check"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheLevel2 object { id, value, editable, modified_on }

Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

</summary>

id: "cache_level"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "aggressive" or "basic" or "simplified"

Current value of the zone setting.

</summary>

One of the following:

"aggressive"

[Link to this property](#)

"basic"

[Link to this property](#)

"simplified"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeTTL object { id, value, editable, modified_on }

Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

</summary>

id: "challenge_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 300 or 900 or 1800 or 11 more

Current value of the zone setting.

</summary>

One of the following:

300

[Link to this property](#)

900

[Link to this property](#)

1800

[Link to this property](#)

2700

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

28800

[Link to this property](#)

57600

[Link to this property](#)

86400

[Link to this property](#)

604800

[Link to this property](#)

2592000

[Link to this property](#)

31536000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesChinaNetworkEnabled object { id, value, editable, modified_on }

Determines whether or not the china network is enabled.

</summary>

id: "china_network_enabled"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesContentConverter object { id, value, editable, modified_on }

When enabled and the client sends an Accept header requesting text/markdown, Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service. Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

</summary>

id: "content_converter"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ciphers object { id, value, editable, modified_on }

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

</summary>

id: "ciphers"

ID of the zone setting.

[Link to this property](#)

value: array of string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCNAMEFlattening object { id, value, editable, modified_on }

Whether or not cname flattening is on.

</summary>

id: "cname_flattening"

How to flatten the cname destination.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "flatten_at_root" or "flatten_all"

This zone setting is deprecated; please use the DNS Settings route instead. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-03-21

Current value of the zone setting.

</summary>

One of the following:

"flatten_at_root"

[Link to this property](#)

"flatten_all"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DevelopmentMode object { id, value, editable, 2 more }

Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare’s accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

</summary>

id: "development_mode"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

time_remaining: optional number

Value of the zone setting. Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EarlyHints object { id, value, editable, modified_on }

When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

</summary>

id: "early_hints"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesEdgeCacheTTL2 object { id, value, editable, modified_on }

Time (in seconds) that a resource will be ensured to remain on Cloudflare’s cache servers.

</summary>

id: "edge_cache_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 30 or 60 or 300 or 18 more

Current value of the zone setting.

</summary>

One of the following:

30

[Link to this property](#)

60

[Link to this property](#)

300

[Link to this property](#)

1200

[Link to this property](#)

1800

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

18000

[Link to this property](#)

28800

[Link to this property](#)

43200

[Link to this property](#)

57600

[Link to this property](#)

72000

[Link to this property](#)

86400

[Link to this property](#)

172800

[Link to this property](#)

259200

[Link to this property](#)

345600

[Link to this property](#)

432000

[Link to this property](#)

518400

[Link to this property](#)

604800

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesEmailObfuscation2 object { id, value, editable, modified_on }

Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

</summary>

id: "email_obfuscation"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

H2Prioritization object { id, value, editable, modified_on }

HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

</summary>

id: "h2_prioritization"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "custom"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"custom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HotlinkProtection object { id, value, editable, modified_on }

When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it’s not another site requesting them. People will still be able to download and view images from your page, but other sites won’t be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

</summary>

id: "hotlink_protection"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP2 object { id, value, editable, modified_on }

HTTP2 enabled for this zone.

</summary>

id: "http2"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP3 object { id, value, editable, modified_on }

HTTP3 enabled for this zone.

</summary>

id: "http3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ImageResizing object { id, value, editable, modified_on }

Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare’s network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

</summary>

id: "image_resizing"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesIPGeolocation2 object { id, value, editable, modified_on }

Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

</summary>

id: "ip_geolocation"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPV6 object { id, value, editable, modified_on }

Enable IPv6 on all subdomains that are Cloudflare enabled. (https://support.cloudflare.com/hc/en-us/articles/200168586).

</summary>

id: "ipv6"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesMaxUpload object { id, value, editable, modified_on }

Maximum size of an allowable upload.

</summary>

id: "max_upload"

identifier of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 100 or 125 or 150 or 23 more

Current value of the zone setting.

</summary>

One of the following:

100

[Link to this property](#)

125

[Link to this property](#)

150

[Link to this property](#)

175

[Link to this property](#)

200

[Link to this property](#)

225

[Link to this property](#)

250

[Link to this property](#)

275

[Link to this property](#)

300

[Link to this property](#)

325

[Link to this property](#)

350

[Link to this property](#)

375

[Link to this property](#)

400

[Link to this property](#)

425

[Link to this property](#)

450

[Link to this property](#)

475

[Link to this property](#)

500

[Link to this property](#)

1000

[Link to this property](#)

1500

[Link to this property](#)

2000

[Link to this property](#)

2500

[Link to this property](#)

3000

[Link to this property](#)

3500

[Link to this property](#)

4000

[Link to this property](#)

4500

[Link to this property](#)

5000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MinTLSVersion object { id, value, editable, modified_on }

Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

</summary>

id: "min_tls_version"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "1.0" or "1.1" or "1.2" or "1.3"

Current value of the zone setting.

</summary>

One of the following:

"1.0"

[Link to this property](#)

"1.1"

[Link to this property](#)

"1.2"

[Link to this property](#)

"1.3"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesMirage2 object { id, value, editable, modified_on }

Automatically optimize image loading for website visitors on mobile devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed) for more information.

</summary>

id: "mirage"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

Mirage is being deprecated. More information at https://developers.cloudflare.com/speed/optimization/images/mirage/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NEL object { id, value, editable, modified_on }

Enable Network Error Logging reporting on your zone. (Beta)

</summary>

id: "nel"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: object { enabled }

Current value of the zone setting.

</summary>

enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesOpportunisticEncryption2 object { id, value, editable, modified_on }

Enables the Opportunistic Encryption feature for a zone.

</summary>

id: "opportunistic_encryption"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpportunisticOnion object { id, value, editable, modified_on }

Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

</summary>

id: "opportunistic_onion"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OrangeToOrange object { id, value, editable, modified_on }

Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

</summary>

id: "orange_to_orange"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

This setting is deprecated. Orange to Orange (O2O) is applied automatically for eligible zones and no longer requires configuration; this setting only controlled the legacy O2O v1 (Managed CNAME) path. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesOriginErrorPagePassThru2 object { id, value, editable, modified_on }

Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

</summary>

id: "origin_error_page_pass_thru"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }

Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

</summary>

id: "origin_h2_max_streams"

Value of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

value: optional number

Value of the Origin H2 Max Streams Setting.

maximum1000

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }

Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is “2” for all plan types except Enterprise where it is “1”.

</summary>

id: "origin_max_http_version"

Value of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional "2" or "1"

Value of the Origin Max HTTP Version Setting.

</summary>

One of the following:

"2"

[Link to this property](#)

"1"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPolish2 object { id, value, editable, modified_on }

Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

</summary>

id: "polish"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "lossless" or "lossy"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"lossless"

[Link to this property](#)

"lossy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrefetchPreload object { id, value, editable, modified_on }

Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

</summary>

id: "prefetch_preload"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPreRender object { id, value, editable, modified_on }

When enabled, Cloudflare serves pre-rendered HTML to eligible search and AI crawlers instead of the origin’s unrendered response.

</summary>

id: "pre_render"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPrivacyPass object { id, value, editable, modified_on }

Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

</summary>

id: "privacy_pass"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

Privacy Pass v1 was deprecated in 2023. (Announcement - https://blog.cloudflare.com/privacy-pass-standard/) and (API deprecation details - https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31)

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ProxyReadTimeout object { id, value, editable, modified_on }

Maximum time between two read operations from origin.

</summary>

id: "proxy_read_timeout"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PseudoIPV4 object { id, value, editable, modified_on }

The value set for the Pseudo IPv4 setting.

</summary>

id: "pseudo_ipv4"

Value of the Pseudo IPv4 setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "add_header" or "overwrite_header"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"add_header"

[Link to this property](#)

"overwrite_header"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesRedirectsForAITraining object { id, value, editable, modified_on }

When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs found in the HTML response, ensuring AI models train on authoritative content.

</summary>

id: "redirects_for_ai_training"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesReplaceInsecureJS object { id, value, editable, modified_on }

Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

</summary>

id: "replace_insecure_js"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesResponseBuffering2 object { id, value, editable, modified_on }

Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

</summary>

id: "response_buffering"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesRocketLoader2 object { id, value, editable, modified_on }

Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site’s Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page’s rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

</summary>

id: "rocket_loader"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }

[Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare’s edge network and caches third-party fonts.

</summary>

id: "automatic_platform_optimization"

ID of the zone setting.

[Link to this property](#)

value: [AutomaticPlatformOptimization](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20automatic_platform_optimization%20%3E%20(schema)) { cache_by_device_type, cf, enabled, 3 more }

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSearchForAgents object { id, value, editable, modified_on }

When enabled, Cloudflare provisions an AI Search instance for the zone and exposes a /.well-known/ai-search endpoint that AI agents can query. Markdown responses also receive an agent: YAML capability block advertising the search endpoint.

</summary>

id: "search_for_agents"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecurityHeaders object { id, value, editable, modified_on }

Cloudflare security header for a zone.

</summary>

id: "security_header"

ID of the zone’s security header.

[Link to this property](#)

<details>

<summary>

value: object { strict_transport_security }

Current value of the zone setting.

</summary>

<details>

<summary>

strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }

Strict Transport Security.

</summary>

enabled: optional boolean

Whether or not strict transport security is enabled.

[Link to this property](#)

include_subdomains: optional boolean

Include all subdomains for strict transport security.

[Link to this property](#)

max_age: optional number

Max age in seconds of the strict transport security.

[Link to this property](#)

nosniff: optional boolean

Whether or not to include ‘X-Content-Type-Options: nosniff’ header.

[Link to this property](#)

preload: optional boolean

Enable automatic preload of the HSTS configuration.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSecurityLevel2 object { id, value, editable, modified_on }

Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

</summary>

id: "security_level"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "essentially_off" or "low" or 3 more

Current value of the zone setting.

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

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServerSideExcludes object { id, value, editable, modified_on }

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: . For example: Bad visitors won’t see my phone number, 555-555-5555 . Note: SSE only will work with HTML. If you have HTML minification enabled, you won’t see the SSE tags in your HTML source when it’s served through Cloudflare. SSE will still function in this case, as Cloudflare’s HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor’s computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

</summary>

id: "server_side_exclude"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSha1Support object { id, value, editable, modified_on }

Allow SHA1 support.

</summary>

id: "sha1_support"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSortQueryStringForCache2 object { id, value, editable, modified_on }

Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

</summary>

id: "sort_query_string_for_cache"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSSL2 object { id, value, editable, modified_on }

SSL encrypts your visitor’s connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don’t need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

</summary>

id: "ssl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "flexible" or "full" or "strict"

Current value of the zone setting.

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

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSLRecommender object { id, enabled }

Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

</summary>

id: optional "ssl_recommender"

Enrollment value for SSL/TLS Recommender.

[Link to this property](#)

enabled: optional boolean

ssl-recommender enrollment setting.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTLS1_2Only object { id, value, editable, modified_on }

Only allows TLS1.2.

</summary>

id: "tls_1_2_only"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLS1_3 object { id, value, editable, modified_on }

Enables Crypto TLS 1.3 feature for a zone.

</summary>

id: "tls_1_3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "zrt"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"zrt"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSClientAuth object { id, value, editable, modified_on }

TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

</summary>

id: "tls_client_auth"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTransformations object { id, value, editable, modified_on }

Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare’s network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

</summary>

id: "transformations"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }

Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare’s network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

</summary>

id: "transformations_allowed_origins"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

[Link to this property](#)

value: string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTrueClientIPHeader2 object { id, value, editable, modified_on }

Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

</summary>

id: "true_client_ip_header"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWAF2 object { id, value, editable, modified_on }

The WAF examines HTTP requests to your website. It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will ‘challenge’ the web visitor with a page that asks them to submit a CAPTCHA successfully to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare’s WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

</summary>

id: "waf"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWebmcpEnabled object { id, value, editable, modified_on }

When enabled, Cloudflare injects the WebMCP bridge (bridge.js) into HTML responses for this zone, exposing DOM and Content Credentials tools to an in-browser AI agent via navigator.modelContext. No origin-side code changes are required. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp_enabled"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWebmcpPacks object { id, value, editable, modified_on }

Optional per-zone override of which bundled WebMCP tool packs the injected bridge.js activates. Only takes effect when webmcp_enabled is on. Leave empty to use the bridge’s default pack set. Unknown pack names are ignored by the bridge. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp_packs"

ID of the zone setting.

[Link to this property](#)

value: string

Current value of the zone setting.

maxLength256

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebP object { id, value, editable, modified_on }

When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

</summary>

id: "webp"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Websocket object { id, value, editable, modified_on }

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

</summary>

id: "websockets"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SettingEditResponse = [ZeroRTT](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20zero_rtt%20%3E%20(schema)) { id, value, editable, modified_on } or [AdvancedDDoS](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20advanced_ddos%20%3E%20(schema)) { id, value, editable, modified_on } or object { id, modified_on, value } or 63 more

0-RTT session resumption enabled for this zone.

</summary>

One of the following:

<details>

<summary>

ZeroRTT object { id, value, editable, modified_on }

0-RTT session resumption enabled for this zone.

</summary>

id: "0rtt"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AdvancedDDoS object { id, value, editable, modified_on }

Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is ‘on’ in the case of Business and Enterprise zones.

</summary>

id: "advanced_ddos"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesAegis object { id, modified_on, value }

Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

</summary>

id: "aegis"

ID of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional object { enabled, pool_id }

Value of the zone setting.

</summary>

enabled: optional boolean

Whether the feature is enabled or not.

[Link to this property](#)

pool_id: optional string

Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AlwaysOnline object { id, value, editable, modified_on }

When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive’s Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

</summary>

id: "always_online"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesAlwaysUseHTTPS2 object { id, value, editable, modified_on }

Reply to all requests for URLs that use “http” with a 301 redirect to the equivalent “https” URL. If you only want to redirect for a subset of requests, consider creating an “Always use HTTPS” page rule.

</summary>

id: "always_use_https"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesAutomaticHTTPSRewrites2 object { id, value, editable, modified_on }

Enable the Automatic HTTPS Rewrites feature for this zone.

</summary>

id: "automatic_https_rewrites"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Brotli object { id, value, editable, modified_on }

When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

</summary>

id: "brotli"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesBrowserCacheTTL2 object { id, value, editable, modified_on }

Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors’ computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

</summary>

id: "browser_cache_ttl"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

maximum31536000

minimum0

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesBrowserCheck2 object { id, value, editable, modified_on }

Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page. It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

</summary>

id: "browser_check"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheLevel2 object { id, value, editable, modified_on }

Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

</summary>

id: "cache_level"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "aggressive" or "basic" or "simplified"

Current value of the zone setting.

</summary>

One of the following:

"aggressive"

[Link to this property](#)

"basic"

[Link to this property](#)

"simplified"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeTTL object { id, value, editable, modified_on }

Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

</summary>

id: "challenge_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 300 or 900 or 1800 or 11 more

Current value of the zone setting.

</summary>

One of the following:

300

[Link to this property](#)

900

[Link to this property](#)

1800

[Link to this property](#)

2700

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

28800

[Link to this property](#)

57600

[Link to this property](#)

86400

[Link to this property](#)

604800

[Link to this property](#)

2592000

[Link to this property](#)

31536000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesChinaNetworkEnabled object { id, value, editable, modified_on }

Determines whether or not the china network is enabled.

</summary>

id: "china_network_enabled"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesContentConverter object { id, value, editable, modified_on }

When enabled and the client sends an Accept header requesting text/markdown, Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service. Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

</summary>

id: "content_converter"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ciphers object { id, value, editable, modified_on }

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

</summary>

id: "ciphers"

ID of the zone setting.

[Link to this property](#)

value: array of string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCNAMEFlattening object { id, value, editable, modified_on }

Whether or not cname flattening is on.

</summary>

id: "cname_flattening"

How to flatten the cname destination.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "flatten_at_root" or "flatten_all"

This zone setting is deprecated; please use the DNS Settings route instead. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-03-21

Current value of the zone setting.

</summary>

One of the following:

"flatten_at_root"

[Link to this property](#)

"flatten_all"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DevelopmentMode object { id, value, editable, 2 more }

Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare’s accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

</summary>

id: "development_mode"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

time_remaining: optional number

Value of the zone setting. Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EarlyHints object { id, value, editable, modified_on }

When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

</summary>

id: "early_hints"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesEdgeCacheTTL2 object { id, value, editable, modified_on }

Time (in seconds) that a resource will be ensured to remain on Cloudflare’s cache servers.

</summary>

id: "edge_cache_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 30 or 60 or 300 or 18 more

Current value of the zone setting.

</summary>

One of the following:

30

[Link to this property](#)

60

[Link to this property](#)

300

[Link to this property](#)

1200

[Link to this property](#)

1800

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

18000

[Link to this property](#)

28800

[Link to this property](#)

43200

[Link to this property](#)

57600

[Link to this property](#)

72000

[Link to this property](#)

86400

[Link to this property](#)

172800

[Link to this property](#)

259200

[Link to this property](#)

345600

[Link to this property](#)

432000

[Link to this property](#)

518400

[Link to this property](#)

604800

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesEmailObfuscation2 object { id, value, editable, modified_on }

Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

</summary>

id: "email_obfuscation"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

H2Prioritization object { id, value, editable, modified_on }

HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

</summary>

id: "h2_prioritization"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "custom"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"custom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HotlinkProtection object { id, value, editable, modified_on }

When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it’s not another site requesting them. People will still be able to download and view images from your page, but other sites won’t be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

</summary>

id: "hotlink_protection"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP2 object { id, value, editable, modified_on }

HTTP2 enabled for this zone.

</summary>

id: "http2"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP3 object { id, value, editable, modified_on }

HTTP3 enabled for this zone.

</summary>

id: "http3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ImageResizing object { id, value, editable, modified_on }

Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare’s network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

</summary>

id: "image_resizing"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesIPGeolocation2 object { id, value, editable, modified_on }

Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

</summary>

id: "ip_geolocation"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPV6 object { id, value, editable, modified_on }

Enable IPv6 on all subdomains that are Cloudflare enabled. (https://support.cloudflare.com/hc/en-us/articles/200168586).

</summary>

id: "ipv6"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesMaxUpload object { id, value, editable, modified_on }

Maximum size of an allowable upload.

</summary>

id: "max_upload"

identifier of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 100 or 125 or 150 or 23 more

Current value of the zone setting.

</summary>

One of the following:

100

[Link to this property](#)

125

[Link to this property](#)

150

[Link to this property](#)

175

[Link to this property](#)

200

[Link to this property](#)

225

[Link to this property](#)

250

[Link to this property](#)

275

[Link to this property](#)

300

[Link to this property](#)

325

[Link to this property](#)

350

[Link to this property](#)

375

[Link to this property](#)

400

[Link to this property](#)

425

[Link to this property](#)

450

[Link to this property](#)

475

[Link to this property](#)

500

[Link to this property](#)

1000

[Link to this property](#)

1500

[Link to this property](#)

2000

[Link to this property](#)

2500

[Link to this property](#)

3000

[Link to this property](#)

3500

[Link to this property](#)

4000

[Link to this property](#)

4500

[Link to this property](#)

5000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MinTLSVersion object { id, value, editable, modified_on }

Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

</summary>

id: "min_tls_version"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "1.0" or "1.1" or "1.2" or "1.3"

Current value of the zone setting.

</summary>

One of the following:

"1.0"

[Link to this property](#)

"1.1"

[Link to this property](#)

"1.2"

[Link to this property](#)

"1.3"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesMirage2 object { id, value, editable, modified_on }

Automatically optimize image loading for website visitors on mobile devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed) for more information.

</summary>

id: "mirage"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

Mirage is being deprecated. More information at https://developers.cloudflare.com/speed/optimization/images/mirage/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NEL object { id, value, editable, modified_on }

Enable Network Error Logging reporting on your zone. (Beta)

</summary>

id: "nel"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: object { enabled }

Current value of the zone setting.

</summary>

enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesOpportunisticEncryption2 object { id, value, editable, modified_on }

Enables the Opportunistic Encryption feature for a zone.

</summary>

id: "opportunistic_encryption"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpportunisticOnion object { id, value, editable, modified_on }

Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

</summary>

id: "opportunistic_onion"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OrangeToOrange object { id, value, editable, modified_on }

Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

</summary>

id: "orange_to_orange"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

This setting is deprecated. Orange to Orange (O2O) is applied automatically for eligible zones and no longer requires configuration; this setting only controlled the legacy O2O v1 (Managed CNAME) path. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesOriginErrorPagePassThru2 object { id, value, editable, modified_on }

Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

</summary>

id: "origin_error_page_pass_thru"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }

Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

</summary>

id: "origin_h2_max_streams"

Value of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

value: optional number

Value of the Origin H2 Max Streams Setting.

maximum1000

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }

Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is “2” for all plan types except Enterprise where it is “1”.

</summary>

id: "origin_max_http_version"

Value of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional "2" or "1"

Value of the Origin Max HTTP Version Setting.

</summary>

One of the following:

"2"

[Link to this property](#)

"1"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPolish2 object { id, value, editable, modified_on }

Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

</summary>

id: "polish"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "lossless" or "lossy"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"lossless"

[Link to this property](#)

"lossy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrefetchPreload object { id, value, editable, modified_on }

Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

</summary>

id: "prefetch_preload"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPreRender object { id, value, editable, modified_on }

When enabled, Cloudflare serves pre-rendered HTML to eligible search and AI crawlers instead of the origin’s unrendered response.

</summary>

id: "pre_render"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPrivacyPass object { id, value, editable, modified_on }

Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

</summary>

id: "privacy_pass"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

Privacy Pass v1 was deprecated in 2023. (Announcement - https://blog.cloudflare.com/privacy-pass-standard/) and (API deprecation details - https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31)

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ProxyReadTimeout object { id, value, editable, modified_on }

Maximum time between two read operations from origin.

</summary>

id: "proxy_read_timeout"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PseudoIPV4 object { id, value, editable, modified_on }

The value set for the Pseudo IPv4 setting.

</summary>

id: "pseudo_ipv4"

Value of the Pseudo IPv4 setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "add_header" or "overwrite_header"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"add_header"

[Link to this property](#)

"overwrite_header"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesRedirectsForAITraining object { id, value, editable, modified_on }

When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs found in the HTML response, ensuring AI models train on authoritative content.

</summary>

id: "redirects_for_ai_training"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesReplaceInsecureJS object { id, value, editable, modified_on }

Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

</summary>

id: "replace_insecure_js"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesResponseBuffering2 object { id, value, editable, modified_on }

Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

</summary>

id: "response_buffering"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesRocketLoader2 object { id, value, editable, modified_on }

Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site’s Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page’s rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

</summary>

id: "rocket_loader"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }

[Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare’s edge network and caches third-party fonts.

</summary>

id: "automatic_platform_optimization"

ID of the zone setting.

[Link to this property](#)

value: [AutomaticPlatformOptimization](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20automatic_platform_optimization%20%3E%20(schema)) { cache_by_device_type, cf, enabled, 3 more }

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSearchForAgents object { id, value, editable, modified_on }

When enabled, Cloudflare provisions an AI Search instance for the zone and exposes a /.well-known/ai-search endpoint that AI agents can query. Markdown responses also receive an agent: YAML capability block advertising the search endpoint.

</summary>

id: "search_for_agents"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecurityHeaders object { id, value, editable, modified_on }

Cloudflare security header for a zone.

</summary>

id: "security_header"

ID of the zone’s security header.

[Link to this property](#)

<details>

<summary>

value: object { strict_transport_security }

Current value of the zone setting.

</summary>

<details>

<summary>

strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }

Strict Transport Security.

</summary>

enabled: optional boolean

Whether or not strict transport security is enabled.

[Link to this property](#)

include_subdomains: optional boolean

Include all subdomains for strict transport security.

[Link to this property](#)

max_age: optional number

Max age in seconds of the strict transport security.

[Link to this property](#)

nosniff: optional boolean

Whether or not to include ‘X-Content-Type-Options: nosniff’ header.

[Link to this property](#)

preload: optional boolean

Enable automatic preload of the HSTS configuration.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSecurityLevel2 object { id, value, editable, modified_on }

Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

</summary>

id: "security_level"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "essentially_off" or "low" or 3 more

Current value of the zone setting.

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

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServerSideExcludes object { id, value, editable, modified_on }

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: . For example: Bad visitors won’t see my phone number, 555-555-5555 . Note: SSE only will work with HTML. If you have HTML minification enabled, you won’t see the SSE tags in your HTML source when it’s served through Cloudflare. SSE will still function in this case, as Cloudflare’s HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor’s computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

</summary>

id: "server_side_exclude"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSha1Support object { id, value, editable, modified_on }

Allow SHA1 support.

</summary>

id: "sha1_support"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSortQueryStringForCache2 object { id, value, editable, modified_on }

Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

</summary>

id: "sort_query_string_for_cache"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSSL2 object { id, value, editable, modified_on }

SSL encrypts your visitor’s connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don’t need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

</summary>

id: "ssl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "flexible" or "full" or "strict"

Current value of the zone setting.

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

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSLRecommender object { id, enabled }

Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

</summary>

id: optional "ssl_recommender"

Enrollment value for SSL/TLS Recommender.

[Link to this property](#)

enabled: optional boolean

ssl-recommender enrollment setting.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTLS1_2Only object { id, value, editable, modified_on }

Only allows TLS1.2.

</summary>

id: "tls_1_2_only"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLS1_3 object { id, value, editable, modified_on }

Enables Crypto TLS 1.3 feature for a zone.

</summary>

id: "tls_1_3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "zrt"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"zrt"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSClientAuth object { id, value, editable, modified_on }

TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

</summary>

id: "tls_client_auth"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTransformations object { id, value, editable, modified_on }

Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare’s network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

</summary>

id: "transformations"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }

Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare’s network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

</summary>

id: "transformations_allowed_origins"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

[Link to this property](#)

value: string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTrueClientIPHeader2 object { id, value, editable, modified_on }

Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

</summary>

id: "true_client_ip_header"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWAF2 object { id, value, editable, modified_on }

The WAF examines HTTP requests to your website. It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will ‘challenge’ the web visitor with a page that asks them to submit a CAPTCHA successfully to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare’s WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

</summary>

id: "waf"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWebmcpEnabled object { id, value, editable, modified_on }

When enabled, Cloudflare injects the WebMCP bridge (bridge.js) into HTML responses for this zone, exposing DOM and Content Credentials tools to an in-browser AI agent via navigator.modelContext. No origin-side code changes are required. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp_enabled"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWebmcpPacks object { id, value, editable, modified_on }

Optional per-zone override of which bundled WebMCP tool packs the injected bridge.js activates. Only takes effect when webmcp_enabled is on. Leave empty to use the bridge’s default pack set. Unknown pack names are ignored by the bridge. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp_packs"

ID of the zone setting.

[Link to this property](#)

value: string

Current value of the zone setting.

maxLength256

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebP object { id, value, editable, modified_on }

When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

</summary>

id: "webp"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Websocket object { id, value, editable, modified_on }

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

</summary>

id: "websockets"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SettingBulkEditResponse = [ZeroRTT](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20zero_rtt%20%3E%20(schema)) { id, value, editable, modified_on } or [AdvancedDDoS](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20advanced_ddos%20%3E%20(schema)) { id, value, editable, modified_on } or object { id, modified_on, value } or 62 more

0-RTT session resumption enabled for this zone.

</summary>

One of the following:

<details>

<summary>

ZeroRTT object { id, value, editable, modified_on }

0-RTT session resumption enabled for this zone.

</summary>

id: "0rtt"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AdvancedDDoS object { id, value, editable, modified_on }

Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is ‘on’ in the case of Business and Enterprise zones.

</summary>

id: "advanced_ddos"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesAegis object { id, modified_on, value }

Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

</summary>

id: "aegis"

ID of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional object { enabled, pool_id }

Value of the zone setting.

</summary>

enabled: optional boolean

Whether the feature is enabled or not.

[Link to this property](#)

pool_id: optional string

Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AlwaysOnline object { id, value, editable, modified_on }

When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive’s Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

</summary>

id: "always_online"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesAlwaysUseHTTPS2 object { id, value, editable, modified_on }

Reply to all requests for URLs that use “http” with a 301 redirect to the equivalent “https” URL. If you only want to redirect for a subset of requests, consider creating an “Always use HTTPS” page rule.

</summary>

id: "always_use_https"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesAutomaticHTTPSRewrites2 object { id, value, editable, modified_on }

Enable the Automatic HTTPS Rewrites feature for this zone.

</summary>

id: "automatic_https_rewrites"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Brotli object { id, value, editable, modified_on }

When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

</summary>

id: "brotli"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesBrowserCacheTTL2 object { id, value, editable, modified_on }

Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors’ computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

</summary>

id: "browser_cache_ttl"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

maximum31536000

minimum0

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesBrowserCheck2 object { id, value, editable, modified_on }

Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page. It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

</summary>

id: "browser_check"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheLevel2 object { id, value, editable, modified_on }

Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

</summary>

id: "cache_level"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "aggressive" or "basic" or "simplified"

Current value of the zone setting.

</summary>

One of the following:

"aggressive"

[Link to this property](#)

"basic"

[Link to this property](#)

"simplified"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ChallengeTTL object { id, value, editable, modified_on }

Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

</summary>

id: "challenge_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 300 or 900 or 1800 or 11 more

Current value of the zone setting.

</summary>

One of the following:

300

[Link to this property](#)

900

[Link to this property](#)

1800

[Link to this property](#)

2700

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

28800

[Link to this property](#)

57600

[Link to this property](#)

86400

[Link to this property](#)

604800

[Link to this property](#)

2592000

[Link to this property](#)

31536000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ciphers object { id, value, editable, modified_on }

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

</summary>

id: "ciphers"

ID of the zone setting.

[Link to this property](#)

value: array of string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesContentConverter object { id, value, editable, modified_on }

When enabled and the client sends an Accept header requesting text/markdown, Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service. Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

</summary>

id: "content_converter"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCNAMEFlattening object { id, value, editable, modified_on }

Whether or not cname flattening is on.

</summary>

id: "cname_flattening"

How to flatten the cname destination.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "flatten_at_root" or "flatten_all"

This zone setting is deprecated; please use the DNS Settings route instead. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-03-21

Current value of the zone setting.

</summary>

One of the following:

"flatten_at_root"

[Link to this property](#)

"flatten_all"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DevelopmentMode object { id, value, editable, 2 more }

Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare’s accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

</summary>

id: "development_mode"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

time_remaining: optional number

Value of the zone setting. Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EarlyHints object { id, value, editable, modified_on }

When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

</summary>

id: "early_hints"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesEdgeCacheTTL2 object { id, value, editable, modified_on }

Time (in seconds) that a resource will be ensured to remain on Cloudflare’s cache servers.

</summary>

id: "edge_cache_ttl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 30 or 60 or 300 or 18 more

Current value of the zone setting.

</summary>

One of the following:

30

[Link to this property](#)

60

[Link to this property](#)

300

[Link to this property](#)

1200

[Link to this property](#)

1800

[Link to this property](#)

3600

[Link to this property](#)

7200

[Link to this property](#)

10800

[Link to this property](#)

14400

[Link to this property](#)

18000

[Link to this property](#)

28800

[Link to this property](#)

43200

[Link to this property](#)

57600

[Link to this property](#)

72000

[Link to this property](#)

86400

[Link to this property](#)

172800

[Link to this property](#)

259200

[Link to this property](#)

345600

[Link to this property](#)

432000

[Link to this property](#)

518400

[Link to this property](#)

604800

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesEmailObfuscation2 object { id, value, editable, modified_on }

Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

</summary>

id: "email_obfuscation"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

H2Prioritization object { id, value, editable, modified_on }

HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

</summary>

id: "h2_prioritization"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "custom"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"custom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HotlinkProtection object { id, value, editable, modified_on }

When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it’s not another site requesting them. People will still be able to download and view images from your page, but other sites won’t be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

</summary>

id: "hotlink_protection"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP2 object { id, value, editable, modified_on }

HTTP2 enabled for this zone.

</summary>

id: "http2"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTP3 object { id, value, editable, modified_on }

HTTP3 enabled for this zone.

</summary>

id: "http3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ImageResizing object { id, value, editable, modified_on }

Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare’s network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

</summary>

id: "image_resizing"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesIPGeolocation2 object { id, value, editable, modified_on }

Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

</summary>

id: "ip_geolocation"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPV6 object { id, value, editable, modified_on }

Enable IPv6 on all subdomains that are Cloudflare enabled. (https://support.cloudflare.com/hc/en-us/articles/200168586).

</summary>

id: "ipv6"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesMaxUpload object { id, value, editable, modified_on }

Maximum size of an allowable upload.

</summary>

id: "max_upload"

identifier of the zone setting.

[Link to this property](#)

<details>

<summary>

value: 100 or 125 or 150 or 23 more

Current value of the zone setting.

</summary>

One of the following:

100

[Link to this property](#)

125

[Link to this property](#)

150

[Link to this property](#)

175

[Link to this property](#)

200

[Link to this property](#)

225

[Link to this property](#)

250

[Link to this property](#)

275

[Link to this property](#)

300

[Link to this property](#)

325

[Link to this property](#)

350

[Link to this property](#)

375

[Link to this property](#)

400

[Link to this property](#)

425

[Link to this property](#)

450

[Link to this property](#)

475

[Link to this property](#)

500

[Link to this property](#)

1000

[Link to this property](#)

1500

[Link to this property](#)

2000

[Link to this property](#)

2500

[Link to this property](#)

3000

[Link to this property](#)

3500

[Link to this property](#)

4000

[Link to this property](#)

4500

[Link to this property](#)

5000

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MinTLSVersion object { id, value, editable, modified_on }

Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

</summary>

id: "min_tls_version"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "1.0" or "1.1" or "1.2" or "1.3"

Current value of the zone setting.

</summary>

One of the following:

"1.0"

[Link to this property](#)

"1.1"

[Link to this property](#)

"1.2"

[Link to this property](#)

"1.3"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesMirage2 object { id, value, editable, modified_on }

Automatically optimize image loading for website visitors on mobile devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed) for more information.

</summary>

id: "mirage"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

Mirage is being deprecated. More information at https://developers.cloudflare.com/speed/optimization/images/mirage/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NEL object { id, value, editable, modified_on }

Enable Network Error Logging reporting on your zone. (Beta)

</summary>

id: "nel"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: object { enabled }

Current value of the zone setting.

</summary>

enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesOpportunisticEncryption2 object { id, value, editable, modified_on }

Enables the Opportunistic Encryption feature for a zone.

</summary>

id: "opportunistic_encryption"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpportunisticOnion object { id, value, editable, modified_on }

Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

</summary>

id: "opportunistic_onion"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OrangeToOrange object { id, value, editable, modified_on }

Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

</summary>

id: "orange_to_orange"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

This setting is deprecated. Orange to Orange (O2O) is applied automatically for eligible zones and no longer requires configuration; this setting only controlled the legacy O2O v1 (Managed CNAME) path. More information at https://developers.cloudflare.com/fundamentals/api/reference/deprecations/

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesOriginErrorPagePassThru2 object { id, value, editable, modified_on }

Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

</summary>

id: "origin_error_page_pass_thru"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }

Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

</summary>

id: "origin_h2_max_streams"

Value of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

value: optional number

Value of the Origin H2 Max Streams Setting.

maximum1000

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }

Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is “2” for all plan types except Enterprise where it is “1”.

</summary>

id: "origin_max_http_version"

Value of the zone setting.

[Link to this property](#)

modified_on: optional string

Last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional "2" or "1"

Value of the Origin Max HTTP Version Setting.

</summary>

One of the following:

"2"

[Link to this property](#)

"1"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPolish2 object { id, value, editable, modified_on }

Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

</summary>

id: "polish"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "lossless" or "lossy"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"lossless"

[Link to this property](#)

"lossy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrefetchPreload object { id, value, editable, modified_on }

Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

</summary>

id: "prefetch_preload"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPreRender object { id, value, editable, modified_on }

When enabled, Cloudflare serves pre-rendered HTML to eligible search and AI crawlers instead of the origin’s unrendered response.

</summary>

id: "pre_render"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesPrivacyPass object { id, value, editable, modified_on }

Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

</summary>

id: "privacy_pass"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

Deprecatedvalue: "on" or "off"

Privacy Pass v1 was deprecated in 2023. (Announcement - https://blog.cloudflare.com/privacy-pass-standard/) and (API deprecation details - https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31)

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ProxyReadTimeout object { id, value, editable, modified_on }

Maximum time between two read operations from origin.

</summary>

id: "proxy_read_timeout"

ID of the zone setting.

[Link to this property](#)

value: number

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PseudoIPV4 object { id, value, editable, modified_on }

The value set for the Pseudo IPv4 setting.

</summary>

id: "pseudo_ipv4"

Value of the Pseudo IPv4 setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "add_header" or "overwrite_header"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"add_header"

[Link to this property](#)

"overwrite_header"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesRedirectsForAITraining object { id, value, editable, modified_on }

When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs found in the HTML response, ensuring AI models train on authoritative content.

</summary>

id: "redirects_for_ai_training"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesReplaceInsecureJS object { id, value, editable, modified_on }

Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

</summary>

id: "replace_insecure_js"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesResponseBuffering2 object { id, value, editable, modified_on }

Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

</summary>

id: "response_buffering"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesRocketLoader2 object { id, value, editable, modified_on }

Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site’s Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page’s rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

</summary>

id: "rocket_loader"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }

[Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare’s edge network and caches third-party fonts.

</summary>

id: "automatic_platform_optimization"

ID of the zone setting.

[Link to this property](#)

value: [AutomaticPlatformOptimization](/api/resources/zones#(resource)%20zones.settings%20%3E%20(model)%20automatic_platform_optimization%20%3E%20(schema)) { cache_by_device_type, cf, enabled, 3 more }

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSearchForAgents object { id, value, editable, modified_on }

When enabled, Cloudflare provisions an AI Search instance for the zone and exposes a /.well-known/ai-search endpoint that AI agents can query. Markdown responses also receive an agent: YAML capability block advertising the search endpoint.

</summary>

id: "search_for_agents"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecurityHeaders object { id, value, editable, modified_on }

Cloudflare security header for a zone.

</summary>

id: "security_header"

ID of the zone’s security header.

[Link to this property](#)

<details>

<summary>

value: object { strict_transport_security }

Current value of the zone setting.

</summary>

<details>

<summary>

strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }

Strict Transport Security.

</summary>

enabled: optional boolean

Whether or not strict transport security is enabled.

[Link to this property](#)

include_subdomains: optional boolean

Include all subdomains for strict transport security.

[Link to this property](#)

max_age: optional number

Max age in seconds of the strict transport security.

[Link to this property](#)

nosniff: optional boolean

Whether or not to include ‘X-Content-Type-Options: nosniff’ header.

[Link to this property](#)

preload: optional boolean

Enable automatic preload of the HSTS configuration.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSecurityLevel2 object { id, value, editable, modified_on }

Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

</summary>

id: "security_level"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "essentially_off" or "low" or 3 more

Current value of the zone setting.

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

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServerSideExcludes object { id, value, editable, modified_on }

If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: . For example: Bad visitors won’t see my phone number, 555-555-5555 . Note: SSE only will work with HTML. If you have HTML minification enabled, you won’t see the SSE tags in your HTML source when it’s served through Cloudflare. SSE will still function in this case, as Cloudflare’s HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor’s computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

</summary>

id: "server_side_exclude"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSha1Support object { id, value, editable, modified_on }

Allow SHA1 support.

</summary>

id: "sha1_support"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSortQueryStringForCache2 object { id, value, editable, modified_on }

Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

</summary>

id: "sort_query_string_for_cache"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesSSL2 object { id, value, editable, modified_on }

SSL encrypts your visitor’s connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don’t need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full: SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare — visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You’ll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

</summary>

id: "ssl"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "flexible" or "full" or "strict"

Current value of the zone setting.

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

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSLRecommender object { id, enabled }

Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

</summary>

id: optional "ssl_recommender"

Enrollment value for SSL/TLS Recommender.

[Link to this property](#)

enabled: optional boolean

ssl-recommender enrollment setting.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTLS1_2Only object { id, value, editable, modified_on }

Only allows TLS1.2.

</summary>

id: "tls_1_2_only"

Zone setting identifier.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLS1_3 object { id, value, editable, modified_on }

Enables Crypto TLS 1.3 feature for a zone.

</summary>

id: "tls_1_3"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "zrt"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"zrt"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSClientAuth object { id, value, editable, modified_on }

TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

</summary>

id: "tls_client_auth"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTransformations object { id, value, editable, modified_on }

Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare’s network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

</summary>

id: "transformations"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

[Link to this property](#)

<details>

<summary>

value: "on" or "off" or "open"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

"open"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }

Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare’s network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

</summary>

id: "transformations_allowed_origins"

ID of the zone setting. Shared between Image Transformations and Video Transformations.

[Link to this property](#)

value: string

Current value of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesTrueClientIPHeader2 object { id, value, editable, modified_on }

Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

</summary>

id: "true_client_ip_header"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWAF2 object { id, value, editable, modified_on }

The WAF examines HTTP requests to your website. It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will ‘challenge’ the web visitor with a page that asks them to submit a CAPTCHA successfully to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare’s WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

</summary>

id: "waf"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWebmcpEnabled object { id, value, editable, modified_on }

When enabled, Cloudflare injects the WebMCP bridge (bridge.js) into HTML responses for this zone, exposing DOM and Content Credentials tools to an in-browser AI agent via navigator.modelContext. No origin-side code changes are required. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp_enabled"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ZonesWebmcpPacks object { id, value, editable, modified_on }

Optional per-zone override of which bundled WebMCP tool packs the injected bridge.js activates. Only takes effect when webmcp_enabled is on. Leave empty to use the bridge’s default pack set. Unknown pack names are ignored by the bridge. This setting is currently in beta and its behavior may change.

</summary>

id: "webmcp_packs"

ID of the zone setting.

[Link to this property](#)

value: string

Current value of the zone setting.

maxLength256

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebP object { id, value, editable, modified_on }

When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

</summary>

id: "webp"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Websocket object { id, value, editable, modified_on }

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

</summary>

id: "websockets"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

value: "off" or "on"

Current value of the zone setting.

</summary>

One of the following:

"off"

[Link to this property](#)

"on"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get Image Transformations Allowed Origins setting](/api/resources/zones/subresources/transformations_allowed_origins/methods/get)

GET/zones/{zone_id}/settings/transformations_allowed_origins

##### [Change Image Transformations Allowed Origins setting](/api/resources/zones/subresources/transformations_allowed_origins/methods/edit)

PATCH/zones/{zone_id}/settings/transformations_allowed_origins

##### Models

<details>

<summary>

TransformationsAllowedOrigins object { id, editable, modified_on, value }

Controls which origins are allowed to request image and video transformations.

</summary>

id: optional "image_resizing_allowed_origins"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

Comma-separated list of allowed origin domains for image and video transformations. Use ”*” to allow all origins (default).

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get Image Transformations C2PA setting](/api/resources/zones/subresources/transformations_c2pa/methods/get)

GET/zones/{zone_id}/settings/transformations_c2pa

##### [Change Image Transformations C2PA setting](/api/resources/zones/subresources/transformations_c2pa/methods/edit)

PATCH/zones/{zone_id}/settings/transformations_c2pa

##### Models

<details>

<summary>

TransformationsC2pa object { id, editable, modified_on, value }

Controls C2PA signing for images processed through Cloudflare Image Transformations.

</summary>

id: optional "image_resizing_c2pa"

ID of the zone setting.

[Link to this property](#)

<details>

<summary>

editable: optional true or false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

[Link to this property](#)

false

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: optional string

last time this setting was modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: optional "on" or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

[Link to this property](#)

"off"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get NEL setting](/api/resources/zones/subresources/nel/methods/get)

GET/zones/{zone_id}/settings/nel

##### [Edit NEL setting](/api/resources/zones/subresources/nel/methods/edit)

PATCH/zones/{zone_id}/settings/nel

##### Models

<details>

<summary>

Setting object { id, editable, modified_on, value }

A zone-scoped NEL configuration setting.

</summary>

id: "nel"

Zone setting identifier.

[Link to this property](#)

editable: boolean

Whether the setting is editable. This is false when the zone’s plan does not include NEL or the NEL product feature is not enabled.

[Link to this property](#)

modified_on: string

When the setting was last modified. A zero value (0001-01-01T00:00:00Z) indicates the setting has never been explicitly set and is using the default value.

formatdate-time

[Link to this property](#)

<details>

<summary>

value: object { enabled }

The NEL configuration value.

</summary>

enabled: boolean

Whether Network Error Logging is enabled for the zone. When enabled, browsers report network errors to Cloudflare’s NEL endpoint.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [List zone environments](/api/resources/zones/subresources/environments/methods/list)

GET/zones/{zone_id}/environments

##### [Create zone environments](/api/resources/zones/subresources/environments/methods/create)

POST/zones/{zone_id}/environments

##### [Upsert zone environments](/api/resources/zones/subresources/environments/methods/update)

PUT/zones/{zone_id}/environments

##### [Partially update zone environments](/api/resources/zones/subresources/environments/methods/edit)

PATCH/zones/{zone_id}/environments

##### [Delete zone environment](/api/resources/zones/subresources/environments/methods/delete)

DELETE/zones/{zone_id}/environments/{environment_id}

##### [Roll back zone environment](/api/resources/zones/subresources/environments/methods/rollback)

POST/zones/{zone_id}/environments/{environment_id}/rollback

##### Models

<details>

<summary>

EnvironmentListResponse object { environments }

</summary>

<details>

<summary>

environments: array of object { expression, locked_on_deployment, name, 4 more }

</summary>

expression: string

[Link to this property](#)

locked_on_deployment: boolean

[Link to this property](#)

name: string

[Link to this property](#)

position: [ListCursor](/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)) { after, before }

[Link to this property](#)

ref: string

[Link to this property](#)

version: number

formatint64

[Link to this property](#)

http_application_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EnvironmentCreateResponse object { environments }

</summary>

<details>

<summary>

environments: array of object { expression, locked_on_deployment, name, 4 more }

</summary>

expression: string

[Link to this property](#)

locked_on_deployment: boolean

[Link to this property](#)

name: string

[Link to this property](#)

position: [ListCursor](/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)) { after, before }

[Link to this property](#)

ref: string

[Link to this property](#)

version: number

formatint64

[Link to this property](#)

http_application_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EnvironmentUpdateResponse object { environments }

</summary>

<details>

<summary>

environments: array of object { expression, locked_on_deployment, name, 4 more }

</summary>

expression: string

[Link to this property](#)

locked_on_deployment: boolean

[Link to this property](#)

name: string

[Link to this property](#)

position: [ListCursor](/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)) { after, before }

[Link to this property](#)

ref: string

[Link to this property](#)

version: number

formatint64

[Link to this property](#)

http_application_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EnvironmentEditResponse object { environments }

</summary>

<details>

<summary>

environments: array of object { expression, locked_on_deployment, name, 4 more }

</summary>

expression: string

[Link to this property](#)

locked_on_deployment: boolean

[Link to this property](#)

name: string

[Link to this property](#)

position: [ListCursor](/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)) { after, before }

[Link to this property](#)

ref: string

[Link to this property](#)

version: number

formatint64

[Link to this property](#)

http_application_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EnvironmentDeleteResponse object { environments }

</summary>

<details>

<summary>

environments: array of object { expression, locked_on_deployment, name, 4 more }

</summary>

expression: string

[Link to this property](#)

locked_on_deployment: boolean

[Link to this property](#)

name: string

[Link to this property](#)

position: [ListCursor](/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)) { after, before }

[Link to this property](#)

ref: string

[Link to this property](#)

version: number

formatint64

[Link to this property](#)

http_application_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EnvironmentRollbackResponse object { environments }

</summary>

<details>

<summary>

environments: array of object { expression, locked_on_deployment, name, 4 more }

</summary>

expression: string

[Link to this property](#)

locked_on_deployment: boolean

[Link to this property](#)

name: string

[Link to this property](#)

position: [ListCursor](/api/resources/rules#(resource)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)) { after, before }

[Link to this property](#)

ref: string

[Link to this property](#)

version: number

formatint64

[Link to this property](#)

http_application_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get Account Custom Nameserver Related Zone Metadata](/api/resources/zones/subresources/custom_nameservers/methods/get)

GET/zones/{zone_id}/custom_ns

##### [Set Account Custom Nameserver Related Zone Metadata](/api/resources/zones/subresources/custom_nameservers/methods/update)

PUT/zones/{zone_id}/custom_ns

##### Models

<details>

<summary>

CustomNameserverGetResponse object { errors, messages, success, 3 more }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: true

Whether the API call was successful.

[Link to this property](#)

enabled: optional boolean

Whether zone uses account-level custom nameservers.

[Link to this property](#)

ns_set: optional number

The number of the name server set to assign to the zone.

maximum5

minimum1

[Link to this property](#)

<details>

<summary>

result_info: optional object { count, page, per_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

[Link to this property](#)

page: optional number

Current page within paginated list of results.

[Link to this property](#)

per_page: optional number

Number of results per page of results.

[Link to this property](#)

total_count: optional number

Total results available without any search parameters.

[Link to this property](#)

total_pages: optional number

The number of total pages in the entire result set.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

CustomNameserverUpdateResponse = string

Unused

[Link to this property](#)

##### [Get Zone Hold](/api/resources/zones/subresources/holds/methods/get)

GET/zones/{zone_id}/hold

##### [Create Zone Hold](/api/resources/zones/subresources/holds/methods/create)

POST/zones/{zone_id}/hold

##### [Update Zone Hold](/api/resources/zones/subresources/holds/methods/edit)

PATCH/zones/{zone_id}/hold

##### [Remove Zone Hold](/api/resources/zones/subresources/holds/methods/delete)

DELETE/zones/{zone_id}/hold

##### Models

<details>

<summary>

ZoneHold object { hold, hold_after, include_subdomains }

</summary>

hold: optional boolean

[Link to this property](#)

hold_after: optional string

[Link to this property](#)

include_subdomains: optional string

[Link to this property](#)

</details>

[Link to this property](#)

##### [Zone Subscription Details](/api/resources/zones/subresources/subscriptions/methods/get)

GET/zones/{zone_id}/subscription

##### [Create Zone Subscription](/api/resources/zones/subresources/subscriptions/methods/create)

POST/zones/{zone_id}/subscription

##### [Update Zone Subscription](/api/resources/zones/subresources/subscriptions/methods/update)

PUT/zones/{zone_id}/subscription

##### Models

<details>

<summary>

SubscriptionGetResponse object { id, currency, current_period_end, 5 more }

</summary>

id: optional string

Subscription identifier tag.

maxLength32

[Link to this property](#)

currency: optional string

The monetary unit in which pricing information is displayed.

[Link to this property](#)

current_period_end: optional string

The end of the current period and also when the next billing is due.

formatdate-time

[Link to this property](#)

current_period_start: optional string

When the current billing period started. May match initial_period_start if this is the first period.

formatdate-time

[Link to this property](#)

<details>

<summary>

frequency: optional "weekly" or "monthly" or "quarterly" or 2 more

How often the subscription is renewed automatically.

</summary>

One of the following:

"weekly"

[Link to this property](#)

"monthly"

[Link to this property](#)

"quarterly"

[Link to this property](#)

"yearly"

[Link to this property](#)

"not-applicable"

[Link to this property](#)

</details>

[Link to this property](#)

price: optional number

The price of the subscription that will be billed, in US dollars.

[Link to this property](#)

rate_plan: optional [RatePlan](/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)) { id, currency, externally_managed, 4 more }

The rate plan applied to the subscription.

[Link to this property](#)

<details>

<summary>

state: optional "Trial" or "Provisioned" or "Paid" or 4 more

The state that the subscription is in.

</summary>

One of the following:

"Trial"

[Link to this property](#)

"Provisioned"

[Link to this property](#)

"Paid"

[Link to this property](#)

"AwaitingPayment"

[Link to this property](#)

"Cancelled"

[Link to this property](#)

"Failed"

[Link to this property](#)

"Expired"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SubscriptionCreateResponse object { id, currency, current_period_end, 5 more }

</summary>

id: optional string

Subscription identifier tag.

maxLength32

[Link to this property](#)

currency: optional string

The monetary unit in which pricing information is displayed.

[Link to this property](#)

current_period_end: optional string

The end of the current period and also when the next billing is due.

formatdate-time

[Link to this property](#)

current_period_start: optional string

When the current billing period started. May match initial_period_start if this is the first period.

formatdate-time

[Link to this property](#)

<details>

<summary>

frequency: optional "weekly" or "monthly" or "quarterly" or 2 more

How often the subscription is renewed automatically.

</summary>

One of the following:

"weekly"

[Link to this property](#)

"monthly"

[Link to this property](#)

"quarterly"

[Link to this property](#)

"yearly"

[Link to this property](#)

"not-applicable"

[Link to this property](#)

</details>

[Link to this property](#)

price: optional number

The price of the subscription that will be billed, in US dollars.

[Link to this property](#)

rate_plan: optional [RatePlan](/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)) { id, currency, externally_managed, 4 more }

The rate plan applied to the subscription.

[Link to this property](#)

<details>

<summary>

state: optional "Trial" or "Provisioned" or "Paid" or 4 more

The state that the subscription is in.

</summary>

One of the following:

"Trial"

[Link to this property](#)

"Provisioned"

[Link to this property](#)

"Paid"

[Link to this property](#)

"AwaitingPayment"

[Link to this property](#)

"Cancelled"

[Link to this property](#)

"Failed"

[Link to this property](#)

"Expired"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SubscriptionUpdateResponse object { id, currency, current_period_end, 5 more }

</summary>

id: optional string

Subscription identifier tag.

maxLength32

[Link to this property](#)

currency: optional string

The monetary unit in which pricing information is displayed.

[Link to this property](#)

current_period_end: optional string

The end of the current period and also when the next billing is due.

formatdate-time

[Link to this property](#)

current_period_start: optional string

When the current billing period started. May match initial_period_start if this is the first period.

formatdate-time

[Link to this property](#)

<details>

<summary>

frequency: optional "weekly" or "monthly" or "quarterly" or 2 more

How often the subscription is renewed automatically.

</summary>

One of the following:

"weekly"

[Link to this property](#)

"monthly"

[Link to this property](#)

"quarterly"

[Link to this property](#)

"yearly"

[Link to this property](#)

"not-applicable"

[Link to this property](#)

</details>

[Link to this property](#)

price: optional number

The price of the subscription that will be billed, in US dollars.

[Link to this property](#)

rate_plan: optional [RatePlan](/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)) { id, currency, externally_managed, 4 more }

The rate plan applied to the subscription.

[Link to this property](#)

<details>

<summary>

state: optional "Trial" or "Provisioned" or "Paid" or 4 more

The state that the subscription is in.

</summary>

One of the following:

"Trial"

[Link to this property](#)

"Provisioned"

[Link to this property](#)

"Paid"

[Link to this property](#)

"AwaitingPayment"

[Link to this property](#)

"Cancelled"

[Link to this property](#)

"Failed"

[Link to this property](#)

"Expired"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Available Plans](/api/resources/zones/subresources/plans/methods/list)

GET/zones/{zone_id}/available_plans

##### [Available Plan Details](/api/resources/zones/subresources/plans/methods/get)

GET/zones/{zone_id}/available_plans/{plan_identifier}

##### Models

<details>

<summary>

AvailableRatePlan object { id, can_subscribe, currency, 6 more }

</summary>

id: optional string

Identifier

maxLength32

[Link to this property](#)

can_subscribe: optional boolean

Indicates whether you can subscribe to this plan.

[Link to this property](#)

currency: optional string

The monetary unit in which pricing information is displayed.

[Link to this property](#)

externally_managed: optional boolean

Indicates whether this plan is managed externally.

[Link to this property](#)

<details>

<summary>

frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"

The frequency at which you will be billed for this plan.

</summary>

One of the following:

"weekly"

[Link to this property](#)

"monthly"

[Link to this property](#)

"quarterly"

[Link to this property](#)

"yearly"

[Link to this property](#)

</details>

[Link to this property](#)

is_subscribed: optional boolean

Indicates whether you are currently subscribed to this plan.

[Link to this property](#)

legacy_id: optional string

The legacy identifier for this rate plan, if any.

[Link to this property](#)

name: optional string

The plan name.

maxLength80

[Link to this property](#)

price: optional number

The amount you will be billed for this plan.

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Available Rate Plans](/api/resources/zones/subresources/rate_plans/methods/get)

GET/zones/{zone_id}/available_rate_plans

##### Models

<details>

<summary>

RatePlanGetResponse object { id, components, currency, 3 more }

</summary>

id: optional string

Plan identifier tag.

[Link to this property](#)

<details>

<summary>

components: optional array of object { default, name, unit_price }

Array of available components values for the plan.

</summary>

default: optional number

The default amount allocated.

[Link to this property](#)

<details>

<summary>

name: optional "zones" or "page_rules" or "dedicated_certificates" or "dedicated_certificates_custom"

The unique component.

</summary>

One of the following:

"zones"

[Link to this property](#)

"page_rules"

[Link to this property](#)

"dedicated_certificates"

[Link to this property](#)

"dedicated_certificates_custom"

[Link to this property](#)

</details>

[Link to this property](#)

unit_price: optional number

The unit price of the component.

[Link to this property](#)

</details>

[Link to this property](#)

currency: optional string

The monetary unit in which pricing information is displayed.

[Link to this property](#)

duration: optional number

The duration of the plan subscription.

[Link to this property](#)

<details>

<summary>

frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"

The frequency at which you will be billed for this plan.

</summary>

One of the following:

"weekly"

[Link to this property](#)

"monthly"

[Link to this property](#)

"quarterly"

[Link to this property](#)

"yearly"

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The plan name.

maxLength80

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get CT Alerting Subscription](/api/resources/zones/subresources/ct/subresources/alerting/methods/get)

GET/zones/{zone_id}/ct/alerting

##### [Update CT Alerting Subscription](/api/resources/zones/subresources/ct/subresources/alerting/methods/edit)

PATCH/zones/{zone_id}/ct/alerting

##### Models

<details>

<summary>

CTAlertingSubscription object { enabled, emails }

Certificate Transparency alerting subscription settings for a zone.

</summary>

enabled: boolean

Whether CT alerting is enabled for the zone.

[Link to this property](#)

emails: optional array of string

Email addresses that receive CT alert notifications for the zone. A maximum of 100 addresses may be configured. Each address must be a valid RFC 5322 email address and must not contain a comma.

[Link to this property](#)

</details>

[Link to this property](#)
