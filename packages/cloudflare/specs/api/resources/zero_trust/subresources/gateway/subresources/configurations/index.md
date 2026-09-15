---
title: Configurations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Configurations

##### [Get Zero Trust account configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/configurations/methods/get)

GET/accounts/{account\_id}/gateway/configuration

##### [Update Zero Trust account configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/configurations/methods/update)

PUT/accounts/{account\_id}/gateway/configuration

##### [Patch Zero Trust account configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/configurations/methods/edit)

PATCH/accounts/{account\_id}/gateway/configuration

##### ModelsExpand Collapse

<details>

<summary>

ActivityLogSettings object {enabled }

Specify activity log settings.

</summary>

enabled: optional boolean

Specify whether to log activity.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20activity_log_settings%20%3E%20(schema)>)

<details>

<summary>

AntiVirusSettings object {enabled\_download\_phase, enabled\_upload\_phase, fail\_closed, notification\_settings }

Specify anti-virus settings.

</summary>

enabled\_download\_phase: optional boolean

Specify whether to enable anti-virus scanning on downloads.

<a href="#">Link to this property</a>

enabled\_upload\_phase: optional boolean

Specify whether to enable anti-virus scanning on uploads.

<a href="#">Link to this property</a>

fail\_closed: optional boolean

Specify whether to block requests for unscannable files.

<a href="#">Link to this property</a>

notification\_settings: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20notification_settings%20%3E%20(schema)">NotificationSettings</a> { enabled, include\_context, msg, support\_url }

Configure the message the user’s device shows during an antivirus scan.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20anti_virus_settings%20%3E%20(schema)>)

<details>

<summary>

BlockPageSettings object {background\_color, enabled, footer\_text, 12 more }

Specify block page layout settings.

</summary>

background\_color: optional string

Specify the block page background color in <code>#rrggbb</code> format when the mode is customized\_block\_page.

<a href="#">Link to this property</a>

enabled: optional boolean

Specify whether to enable the custom block page.

<a href="#">Link to this property</a>

footer\_text: optional string

Specify the block page footer text when the mode is customized\_block\_page.

<a href="#">Link to this property</a>

header\_text: optional string

Specify the block page header text when the mode is customized\_block\_page.

<a href="#">Link to this property</a>

include\_context: optional boolean

Specify whether to append context to target\_uri as query parameters. This applies only when the mode is redirect\_uri.

<a href="#">Link to this property</a>

logo\_path: optional string

Specify the full URL to the logo file when the mode is customized\_block\_page.

<a href="#">Link to this property</a>

mailto\_address: optional string

Specify the admin email for users to contact when the mode is customized\_block\_page.

<a href="#">Link to this property</a>

mailto\_subject: optional string

Specify the subject line for emails created from the block page when the mode is customized\_block\_page.

<a href="#">Link to this property</a>

<details>

<summary>

mode: optional ""or "customized\_block\_page"or "redirect\_uri"

Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

</summary>

One of the following:

""

<a href="#">Link to this property</a>

"customized\_block\_page"

<a href="#">Link to this property</a>

"redirect\_uri"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Specify the block page title when the mode is customized\_block\_page.

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicate that this setting was shared via the Orgs API and read only for the current account.

<a href="#">Link to this property</a>

source\_account: optional string

Indicate the account tag of the account that shared this setting.

<a href="#">Link to this property</a>

suppress\_footer: optional boolean

Specify whether to suppress detailed information at the bottom of the block page when the mode is customized\_block\_page.

<a href="#">Link to this property</a>

target\_uri: optional string

Specify the URI to redirect users to when the mode is redirect\_uri.

formaturi

<a href="#">Link to this property</a>

version: optional number

Indicate the version number of the setting.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20block_page_settings%20%3E%20(schema)>)

<details>

<summary>

BodyScanningSettings object {inspection\_mode }

Specify the DLP inspection mode.

</summary>

<details>

<summary>

inspection\_mode: optional "deep"or "shallow"

Specify the inspection mode as either <code>deep</code> or <code>shallow</code>.

</summary>

One of the following:

"deep"

<a href="#">Link to this property</a>

"shallow"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20body_scanning_settings%20%3E%20(schema)>)

<details>

<summary>

BrowserIsolationSettings object {non\_identity\_enabled, url\_browser\_isolation\_enabled }

Specify Clientless Browser Isolation settings.

</summary>

non\_identity\_enabled: optional boolean

Specify whether to enable non-identity onramp support for Browser Isolation.

<a href="#">Link to this property</a>

url\_browser\_isolation\_enabled: optional boolean

Specify whether to enable Clientless Browser Isolation.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20browser_isolation_settings%20%3E%20(schema)>)

<details>

<summary>

CustomCertificateSettings object {enabled, id, binding\_status, updated\_at }

Specify custom certificate settings for BYO-PKI. This field is deprecated; use <code>certificate</code> instead.

</summary>

enabled: boolean

Specify whether to enable a custom certificate authority for signing Gateway traffic.

<a href="#">Link to this property</a>

id: optional string

Specify the UUID of the certificate (ID from MTLS certificate store).

<a href="#">Link to this property</a>

binding\_status: optional string

Indicate the internal certificate status.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20custom_certificate_settings%20%3E%20(schema)>)

<details>

<summary>

ExtendedEmailMatching object {enabled, read\_only, source\_account, version }

Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses <code>.</code> or <code>+</code> modifiers.

</summary>

enabled: optional boolean

Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

<a href="#">Link to this property</a>

read\_only: optional boolean

Indicate that this setting was shared via the Orgs API and read only for the current account.

<a href="#">Link to this property</a>

source\_account: optional string

Indicate the account tag of the account that shared this setting.

<a href="#">Link to this property</a>

version: optional number

Indicate the version number of the setting.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20extended_email_matching%20%3E%20(schema)>)

<details>

<summary>

FipsSettings object {tls }

Specify FIPS settings.

</summary>

tls: optional boolean

Enforce cipher suites and TLS versions compliant with FIPS 140-2.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20fips_settings%20%3E%20(schema)>)

<details>

<summary>

GatewayConfigurationSettings object {activity\_log, antivirus, block\_page, 12 more }

Specify account settings.

</summary>

activity\_log: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20activity_log_settings%20%3E%20(schema)">ActivityLogSettings</a> { enabled }

Specify activity log settings.

<a href="#">Link to this property</a>

antivirus: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20anti_virus_settings%20%3E%20(schema)">AntiVirusSettings</a> { enabled\_download\_phase, enabled\_upload\_phase, fail\_closed, notification\_settings }

Specify anti-virus settings.

<a href="#">Link to this property</a>

block\_page: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20block_page_settings%20%3E%20(schema)">BlockPageSettings</a> { background\_color, enabled, footer\_text, 12 more }

Specify block page layout settings.

<a href="#">Link to this property</a>

body\_scanning: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20body_scanning_settings%20%3E%20(schema)">BodyScanningSettings</a> { inspection\_mode }

Specify the DLP inspection mode.

<a href="#">Link to this property</a>

browser\_isolation: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20browser_isolation_settings%20%3E%20(schema)">BrowserIsolationSettings</a> { non\_identity\_enabled, url\_browser\_isolation\_enabled }

Specify Clientless Browser Isolation settings.

<a href="#">Link to this property</a>

<details>

<summary>

certificate: optional object {id }

Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

</summary>

id: string

Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called ‘active’). A nil UUID directs Cloudflare to use the Root CA.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedcustom\_certificate: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20custom_certificate_settings%20%3E%20(schema)">CustomCertificateSettings</a> { enabled, id, binding\_status, updated\_at }

Specify custom certificate settings for BYO-PKI. This field is deprecated; use <code>certificate</code> instead.

<a href="#">Link to this property</a>

extended\_email\_matching: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20extended_email_matching%20%3E%20(schema)">ExtendedEmailMatching</a> { enabled, read\_only, source\_account, version }

Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses <code>.</code> or <code>+</code> modifiers.

<a href="#">Link to this property</a>

fips: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20fips_settings%20%3E%20(schema)">FipsSettings</a> { tls }

Specify FIPS settings.

<a href="#">Link to this property</a>

<details>

<summary>

host\_selector: optional object {enabled }

Enable host selection in egress policies.

</summary>

enabled: optional boolean

Specify whether to enable filtering via hosts for egress policies.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inspection: optional object {mode }

Define the proxy inspection mode.

</summary>

<details>

<summary>

mode: optional "static"or "dynamic"

Define the proxy inspection mode. 1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443). 2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

</summary>

One of the following:

"static"

<a href="#">Link to this property</a>

"dynamic"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_ttl\_secs: optional number

Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location <code>max_ttl</code> setting.

maximum36000

minimum60

<a href="#">Link to this property</a>

protocol\_detection: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20protocol_detection%20%3E%20(schema)">ProtocolDetection</a> { enabled }

Specify whether to detect protocols from the initial bytes of client traffic.

<a href="#">Link to this property</a>

<details>

<summary>

sandbox: optional object {enabled, fallback\_action }

Specify whether to enable the sandbox.

</summary>

enabled: optional boolean

Specify whether to enable the sandbox.

<a href="#">Link to this property</a>

<details>

<summary>

fallback\_action: optional "allow"or "block"

Specify the action to take when the system cannot scan the file.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tls\_decrypt: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20tls_settings%20%3E%20(schema)">TLSSettings</a> { enabled }

Specify whether to inspect encrypted HTTP traffic.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20gateway_configuration_settings%20%3E%20(schema)>)

<details>

<summary>

NotificationSettings object {enabled, include\_context, msg, support\_url }

Configure the message the user’s device shows during an antivirus scan.

</summary>

enabled: optional boolean

Specify whether to enable notifications.

<a href="#">Link to this property</a>

include\_context: optional boolean

Specify whether to include context information as query parameters.

<a href="#">Link to this property</a>

msg: optional string

Specify the message to show in the notification.

<a href="#">Link to this property</a>

support\_url: optional string

Specify a URL that directs users to more information. If unset, the notification opens a block page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20notification_settings%20%3E%20(schema)>)

<details>

<summary>

ProtocolDetection object {enabled }

Specify whether to detect protocols from the initial bytes of client traffic.

</summary>

enabled: optional boolean

Specify whether to detect protocols from the initial bytes of client traffic.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20protocol_detection%20%3E%20(schema)>)

<details>

<summary>

TLSSettings object {enabled }

Specify whether to inspect encrypted HTTP traffic.

</summary>

enabled: optional boolean

Specify whether to inspect encrypted HTTP traffic.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20tls_settings%20%3E%20(schema)>)

<details>

<summary>

ConfigurationGetResponse object {created\_at, settings, updated\_at }

Specify account settings.

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

settings: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20gateway_configuration_settings%20%3E%20(schema)">GatewayConfigurationSettings</a> { activity\_log, antivirus, block\_page, 12 more }

Specify account settings.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20configuration_get_response%20%3E%20(schema)>)

<details>

<summary>

ConfigurationUpdateResponse object {created\_at, settings, updated\_at }

Specify account settings.

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

settings: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20gateway_configuration_settings%20%3E%20(schema)">GatewayConfigurationSettings</a> { activity\_log, antivirus, block\_page, 12 more }

Specify account settings.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20configuration_update_response%20%3E%20(schema)>)

<details>

<summary>

ConfigurationEditResponse object {created\_at, settings, updated\_at }

Specify account settings.

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

settings: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.configurations%20%3E%20(model)%20gateway_configuration_settings%20%3E%20(schema)">GatewayConfigurationSettings</a> { activity\_log, antivirus, block\_page, 12 more }

Specify account settings.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20configuration_edit_response%20%3E%20(schema)>)

#### ConfigurationsCustom Certificate

##### [Get Zero Trust certificate configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/configurations/subresources/custom_certificate/methods/get)

Deprecated

GET/accounts/{account\_id}/gateway/configuration/custom\_certificate