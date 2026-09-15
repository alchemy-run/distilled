---
title: Gateway
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Gateway

##### [Get Zero Trust account information](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/methods/list)

GET/accounts/{account\_id}/gateway

##### [Create Zero Trust account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/methods/create)

POST/accounts/{account\_id}/gateway

##### ModelsExpand Collapse

<details>

<summary>

GatewayListResponse object {id, gateway\_tag, provider\_name }

</summary>

id: optional string

Specify the Cloudflare account ID.

maxLength32

<a href="#">Link to this property</a>

gateway\_tag: optional string

Specify the gateway internal ID.

maxLength32

<a href="#">Link to this property</a>

provider\_name: optional string

Specify the provider name (usually Cloudflare).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway%20%3E%20(model)%20gateway_list_response%20%3E%20(schema)>)

<details>

<summary>

GatewayCreateResponse object {id, gateway\_tag, provider\_name }

</summary>

id: optional string

Specify the Cloudflare account ID.

maxLength32

<a href="#">Link to this property</a>

gateway\_tag: optional string

Specify the gateway internal ID.

maxLength32

<a href="#">Link to this property</a>

provider\_name: optional string

Specify the provider name (usually Cloudflare).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway%20%3E%20(model)%20gateway_create_response%20%3E%20(schema)>)

#### GatewayAudit SSH Settings

##### [Get Zero Trust SSH settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/audit_ssh_settings/methods/get)

GET/accounts/{account\_id}/gateway/audit\_ssh\_settings

##### [Update Zero Trust SSH settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/audit_ssh_settings/methods/update)

PUT/accounts/{account\_id}/gateway/audit\_ssh\_settings

##### [Rotate Zero Trust SSH account seed](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/audit_ssh_settings/methods/rotate_seed)

POST/accounts/{account\_id}/gateway/audit\_ssh\_settings/rotate\_seed

##### ModelsExpand Collapse

<details>

<summary>

GatewaySettings object {created\_at, public\_key, seed\_id, updated\_at }

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

public\_key: optional string

Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging">https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging</a>.

<a href="#">Link to this property</a>

seed\_id: optional string

Identify the seed ID.

maxLength36

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.audit_ssh_settings%20%3E%20(model)%20gateway_settings%20%3E%20(schema)>)

#### GatewayCategories

##### [List categories](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/categories/methods/list)

GET/accounts/{account\_id}/gateway/categories

##### ModelsExpand Collapse

<details>

<summary>

Category object {id, beta, class, 3 more }

</summary>

id: optional number

Identify this category. Only one category per ID.

<a href="#">Link to this property</a>

beta: optional boolean

Indicate whether the category is in beta and subject to change.

<a href="#">Link to this property</a>

<details>

<summary>

class: optional "free"or "premium"or "blocked"or 2 more

Specify which account types can create policies for this category. <code>blocked</code> Blocks unconditionally for all accounts. <code>removalPending</code> Allows removal from policies but disables addition. <code>noBlock</code> Prevents blocking.

</summary>

One of the following:

"free"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"removalPending"

<a href="#">Link to this property</a>

"noBlock"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

Provide a short summary of domains in the category.

<a href="#">Link to this property</a>

name: optional string

Specify the category name.

<a href="#">Link to this property</a>

<details>

<summary>

subcategories: optional array of object {id, beta, class, 2 more }

Provide all subcategories for this category.

</summary>

id: optional number

Identify this category. Only one category per ID.

<a href="#">Link to this property</a>

beta: optional boolean

Indicate whether the category is in beta and subject to change.

<a href="#">Link to this property</a>

<details>

<summary>

class: optional "free"or "premium"or "blocked"or 2 more

Specify which account types can create policies for this category. <code>blocked</code> Blocks unconditionally for all accounts. <code>removalPending</code> Allows removal from policies but disables addition. <code>noBlock</code> Prevents blocking.

</summary>

One of the following:

"free"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"removalPending"

<a href="#">Link to this property</a>

"noBlock"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

Provide a short summary of domains in the category.

<a href="#">Link to this property</a>

name: optional string

Specify the category name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.categories%20%3E%20(model)%20category%20%3E%20(schema)>)

#### GatewayApp Types

##### [List application and application type mappings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/app_types/methods/list)

GET/accounts/{account\_id}/gateway/app\_types

##### ModelsExpand Collapse

<details>

<summary>

AppType = object {id, application\_type\_id, created\_at, name } or object {id, created\_at, description, name }

</summary>

One of the following:

<details>

<summary>

ZeroTrustGatewayApplication object {id, application\_type\_id, created\_at, name }

</summary>

id: optional number

Identify this application. Only one application per ID.

<a href="#">Link to this property</a>

application\_type\_id: optional number

Identify the type of this application. Multiple applications can share the same type. Refers to the <code>id</code> of a returned application type.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Specify the name of the application or application type.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZeroTrustGatewayApplicationType object {id, created\_at, description, name }

</summary>

id: optional number

Identify the type of this application. Multiple applications can share the same type. Refers to the <code>id</code> of a returned application type.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide a short summary of applications with this type.

<a href="#">Link to this property</a>

name: optional string

Specify the name of the application or application type.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.app_types%20%3E%20(model)%20app_type%20%3E%20(schema)>)

#### GatewayConfigurations

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

#### GatewayConfigurationsCustom Certificate

##### [Get Zero Trust certificate configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/configurations/subresources/custom_certificate/methods/get)

Deprecated

GET/accounts/{account\_id}/gateway/configuration/custom\_certificate

#### GatewayLists

##### [List Zero Trust lists](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/list)

GET/accounts/{account\_id}/gateway/lists

##### [Get Zero Trust list details](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/get)

GET/accounts/{account\_id}/gateway/lists/{list\_id}

##### [Create Zero Trust list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/create)

POST/accounts/{account\_id}/gateway/lists

##### [Update Zero Trust list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/update)

PUT/accounts/{account\_id}/gateway/lists/{list\_id}

##### [Patch Zero Trust list.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/edit)

PATCH/accounts/{account\_id}/gateway/lists/{list\_id}

##### [Delete Zero Trust list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/delete)

DELETE/accounts/{account\_id}/gateway/lists/{list\_id}

##### ModelsExpand Collapse

<details>

<summary>

GatewayItem object {created\_at, description, value }

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide the list item description (optional).

minimum0

<a href="#">Link to this property</a>

value: optional string

Specify the item value.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(model)%20gateway_item%20%3E%20(schema)>)

<details>

<summary>

GatewayList object {id, count, created\_at, 5 more }

</summary>

id: optional string

Identify the API resource with a UUID.

maxLength36

<a href="#">Link to this property</a>

count: optional number

Indicate the number of items in the list.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide the list description.

<a href="#">Link to this property</a>

<details>

<summary>

items: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.lists%20%3E%20(model)%20gateway_item%20%3E%20(schema)">GatewayItem</a> { created\_at, description, value }

Provide the list items.

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide the list item description (optional).

minimum0

<a href="#">Link to this property</a>

value: optional string

Specify the item value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Specify the list name.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "SERIAL"or "URL"or "DOMAIN"or 6 more

Specify the list type.

</summary>

One of the following:

"SERIAL"

<a href="#">Link to this property</a>

"URL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"EMAIL"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"CATEGORY"

<a href="#">Link to this property</a>

"LOCATION"

<a href="#">Link to this property</a>

"DEVICE"

<a href="#">Link to this property</a>

"AAGUID"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(model)%20gateway_list%20%3E%20(schema)>)

<details>

<summary>

ListCreateResponse object {id, created\_at, description, 4 more }

</summary>

id: optional string

Identify the API resource with a UUID.

maxLength36

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide the list description.

<a href="#">Link to this property</a>

<details>

<summary>

items: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.lists%20%3E%20(model)%20gateway_item%20%3E%20(schema)">GatewayItem</a> { created\_at, description, value }

Provide the list items.

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide the list item description (optional).

minimum0

<a href="#">Link to this property</a>

value: optional string

Specify the item value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Specify the list name.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "SERIAL"or "URL"or "DOMAIN"or 6 more

Specify the list type.

</summary>

One of the following:

"SERIAL"

<a href="#">Link to this property</a>

"URL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"EMAIL"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"CATEGORY"

<a href="#">Link to this property</a>

"LOCATION"

<a href="#">Link to this property</a>

"DEVICE"

<a href="#">Link to this property</a>

"AAGUID"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(model)%20list_create_response%20%3E%20(schema)>)

ListDeleteResponse = unknown

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(model)%20list_delete_response%20%3E%20(schema)>)

#### GatewayListsItems

##### [Get Zero Trust list items](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/subresources/items/methods/list)

GET/accounts/{account\_id}/gateway/lists/{list\_id}/items

#### GatewayLocations

##### [List Zero Trust Gateway locations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/list)

GET/accounts/{account\_id}/gateway/locations

##### [Get Zero Trust Gateway location details](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/get)

GET/accounts/{account\_id}/gateway/locations/{location\_id}

##### [Create a Zero Trust Gateway location](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/create)

POST/accounts/{account\_id}/gateway/locations

##### [Update a Zero Trust Gateway location](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/update)

PUT/accounts/{account\_id}/gateway/locations/{location\_id}

##### [Delete a Zero Trust Gateway location](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/delete)

DELETE/accounts/{account\_id}/gateway/locations/{location\_id}

##### ModelsExpand Collapse

<details>

<summary>

DOHEndpoint object {enabled, networks, require\_token }

</summary>

enabled: optional boolean

Indicate whether the DOH endpoint is enabled for this location.

<a href="#">Link to this property</a>

<details>

<summary>

networks: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ip_network%20%3E%20(schema)">IPNetwork</a> { network }

Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

</summary>

network: string

Specify the IP address or IP CIDR.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_token: optional boolean

Specify whether the DOH endpoint requires user identity authentication.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20doh_endpoint%20%3E%20(schema)>)

<details>

<summary>

DOTEndpoint object {enabled, networks }

</summary>

enabled: optional boolean

Indicate whether the DOT endpoint is enabled for this location.

<a href="#">Link to this property</a>

<details>

<summary>

networks: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ip_network%20%3E%20(schema)">IPNetwork</a> { network }

Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

</summary>

network: string

Specify the IP address or IP CIDR.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20dot_endpoint%20%3E%20(schema)>)

<details>

<summary>

Endpoint object {doh, dot, ipv4, ipv6 }

Configure the destination endpoints for this location.

</summary>

doh: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20doh_endpoint%20%3E%20(schema)">DOHEndpoint</a> { enabled, networks, require\_token }

<a href="#">Link to this property</a>

dot: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20dot_endpoint%20%3E%20(schema)">DOTEndpoint</a> { enabled, networks }

<a href="#">Link to this property</a>

ipv4: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv4_endpoint%20%3E%20(schema)">IPV4Endpoint</a> { enabled }

<a href="#">Link to this property</a>

ipv6: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_endpoint%20%3E%20(schema)">IPV6Endpoint</a> { enabled, networks }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20endpoint%20%3E%20(schema)>)

<details>

<summary>

IPNetwork object {network }

</summary>

network: string

Specify the IP address or IP CIDR.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20ip_network%20%3E%20(schema)>)

<details>

<summary>

IPV4Endpoint object {enabled }

</summary>

enabled: optional boolean

Indicate whether the IPv4 endpoint is enabled for this location.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv4_endpoint%20%3E%20(schema)>)

<details>

<summary>

IPV6Endpoint object {enabled, networks }

</summary>

enabled: optional boolean

Indicate whether the IPV6 endpoint is enabled for this location.

<a href="#">Link to this property</a>

<details>

<summary>

networks: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_network%20%3E%20(schema)">IPV6Network</a> { network }

Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

</summary>

network: string

Specify the IPv6 address or IPv6 CIDR.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_endpoint%20%3E%20(schema)>)

<details>

<summary>

IPV6Network object {network }

</summary>

network: string

Specify the IPv6 address or IPv6 CIDR.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_network%20%3E%20(schema)>)

<details>

<summary>

Location object {id, client\_default, created\_at, 12 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

client\_default: optional boolean

Indicate whether this location is the default location.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

dns\_destination\_ips\_id: optional string

Indicate the identifier of the pair of IPv4 addresses assigned to this location.

<a href="#">Link to this property</a>

dns\_destination\_ipv6\_block\_id: optional string

Specify the UUID of the IPv6 block brought to the gateway so that this location’s IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.

<a href="#">Link to this property</a>

doh\_subdomain: optional string

Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.

<a href="#">Link to this property</a>

ecs\_support: optional boolean

Indicate whether the location must resolve EDNS queries.

<a href="#">Link to this property</a>

endpoints: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20endpoint%20%3E%20(schema)">Endpoint</a> { doh, dot, ipv4, ipv6 }

Configure the destination endpoints for this location.

<a href="#">Link to this property</a>

ip: optional string

Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.

<a href="#">Link to this property</a>

ipv4\_destination: optional string

Show the primary destination IPv4 address from the pair identified dns\_destination\_ips\_id. This field read-only.

<a href="#">Link to this property</a>

ipv4\_destination\_backup: optional string

Show the backup destination IPv4 address from the pair identified dns\_destination\_ips\_id. This field read-only.

<a href="#">Link to this property</a>

<details>

<summary>

max\_ttl: optional object {mode, ttl\_secs }

Controls how DNS response TTLs are capped for this location relative to the account <code>max_ttl_secs</code> setting. Omitting <code>max_ttl</code> on update resets it to <code>inherit</code>.

</summary>

<details>

<summary>

mode: "inherit"or "override"or "disabled"

<code>inherit</code> uses the account <code>max_ttl_secs</code>. <code>override</code> uses this location’s <code>ttl_secs</code>. <code>disabled</code> leaves returned TTLs unchanged.

</summary>

One of the following:

"inherit"

<a href="#">Link to this property</a>

"override"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ttl\_secs: optional number

Location-specific cap on DNS response TTLs, in seconds. Required when <code>mode</code> is <code>override</code>. Must be omitted when <code>mode</code> is <code>inherit</code> or <code>disabled</code>.

maximum36000

minimum60

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Specify the location name.

<a href="#">Link to this property</a>

<details>

<summary>

networks: optional array of object {network }

Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

</summary>

network: string

Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20location%20%3E%20(schema)>)

LocationDeleteResponse = unknown

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20location_delete_response%20%3E%20(schema)>)

#### GatewayLogging

##### [Get logging settings for the Zero Trust account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/logging/methods/get)

GET/accounts/{account\_id}/gateway/logging

##### [Update Zero Trust account logging settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/logging/methods/update)

PUT/accounts/{account\_id}/gateway/logging

##### ModelsExpand Collapse

<details>

<summary>

LoggingSetting object {redact\_pii, settings\_by\_rule\_type }

</summary>

redact\_pii: optional boolean

Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, device ID, URL, referrer, and user agent).

<a href="#">Link to this property</a>

<details>

<summary>

settings\_by\_rule\_type: optional object {dns, http, l4 }

Configure logging settings for each rule type.

</summary>

<details>

<summary>

dns: optional object {log\_all, log\_blocks }

Configure logging settings for DNS firewall.

</summary>

log\_all: optional boolean

Specify whether to log all requests to this service.

<a href="#">Link to this property</a>

log\_blocks: optional boolean

Specify whether to log only blocking requests to this service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http: optional object {log\_all, log\_blocks }

Configure logging settings for HTTP/HTTPS firewall.

</summary>

log\_all: optional boolean

Specify whether to log all requests to this service.

<a href="#">Link to this property</a>

log\_blocks: optional boolean

Specify whether to log only blocking requests to this service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

l4: optional object {log\_all, log\_blocks }

Configure logging settings for Network firewall.

</summary>

log\_all: optional boolean

Specify whether to log all requests to this service.

<a href="#">Link to this property</a>

log\_blocks: optional boolean

Specify whether to log only blocking requests to this service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.logging%20%3E%20(model)%20logging_setting%20%3E%20(schema)>)

#### GatewayProxy Endpoints

##### [List proxy endpoints](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/list)

GET/accounts/{account\_id}/gateway/proxy\_endpoints

##### [Get a proxy endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/get)

GET/accounts/{account\_id}/gateway/proxy\_endpoints/{proxy\_endpoint\_id}

##### [Create a proxy endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/create)

POST/accounts/{account\_id}/gateway/proxy\_endpoints

##### [Update a proxy endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/edit)

PATCH/accounts/{account\_id}/gateway/proxy\_endpoints/{proxy\_endpoint\_id}

##### [Delete a proxy endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/delete)

DELETE/accounts/{account\_id}/gateway/proxy\_endpoints/{proxy\_endpoint\_id}

##### ModelsExpand Collapse

GatewayIPs = string

Specify an IPv4 or IPv6 CIDR. Limit IPv6 to a maximum of /109 and IPv4 to a maximum of /25.

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20gateway_ips%20%3E%20(schema)>)

<details>

<summary>

ProxyEndpoint = object {ips, name, id, 4 more } or object {kind, name, id, 3 more }

</summary>

One of the following:

<details>

<summary>

IP object {ips, name, id, 4 more }

</summary>

ips: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20gateway_ips%20%3E%20(schema)">GatewayIPs</a>

Specify the list of CIDRs to restrict ingress connections.

<a href="#">Link to this property</a>

name: string

Specify the name of the proxy endpoint.

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

kind: optional "ip"

The proxy endpoint kind

<a href="#">Link to this property</a>

subdomain: optional string

Specify the subdomain to use as the destination in the proxy client.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Identity object {kind, name, id, 3 more }

</summary>

kind: "identity"

The proxy endpoint kind

<a href="#">Link to this property</a>

name: string

Specify the name of the proxy endpoint.

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

subdomain: optional string

Specify the subdomain to use as the destination in the proxy client.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20proxy_endpoint%20%3E%20(schema)>)

ProxyEndpointDeleteResponse = unknown

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20proxy_endpoint_delete_response%20%3E%20(schema)>)

#### GatewayRules

##### [List Zero Trust Gateway rules](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/rules/methods/list)

GET/accounts/{account\_id}/gateway/rules

##### [Get Zero Trust Gateway rule details.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/rules/methods/get)

GET/accounts/{account\_id}/gateway/rules/{rule\_id}

##### [Create a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/rules/methods/create)

POST/accounts/{account\_id}/gateway/rules

##### [Update a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/rules/methods/update)

PUT/accounts/{account\_id}/gateway/rules/{rule\_id}

##### [Delete a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/rules/methods/delete)

DELETE/accounts/{account\_id}/gateway/rules/{rule\_id}

##### [List Zero Trust Gateway rules inherited from the parent account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/rules/methods/list_tenant)

GET/accounts/{account\_id}/gateway/rules/tenant

##### [Reset the expiration of a Zero Trust Gateway Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/rules/methods/reset_expiration)

POST/accounts/{account\_id}/gateway/rules/{rule\_id}/reset\_expiration

##### ModelsExpand Collapse

<details>

<summary>

DNSResolverSettingsV4 object {ip, port, route\_through\_private\_network, vnet\_id }

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

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(model)%20dns_resolver_settings_v4%20%3E%20(schema)>)

<details>

<summary>

DNSResolverSettingsV6 object {ip, port, route\_through\_private\_network, vnet\_id }

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

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(model)%20dns_resolver_settings_v6%20%3E%20(schema)>)

<details>

<summary>

GatewayFilter = "http"or "dns"or "l4"or 2 more

Specify the protocol or layer to use.

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

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(model)%20gateway_filter%20%3E%20(schema)>)

<details>

<summary>

GatewayRule object {action, enabled, filters, 18 more }

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

rule\_settings: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.rules%20%3E%20(model)%20rule_setting%20%3E%20(schema)">RuleSetting</a> { add\_headers, allow\_child\_bypass, audit\_ssh, 25 more }

Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

<a href="#">Link to this property</a>

schedule: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.rules%20%3E%20(model)%20schedule%20%3E%20(schema)">Schedule</a> { fri, mon, sat, 5 more }

Defines the schedule for activating DNS policies. Settable only for <code>dns</code> and <code>dns_resolver</code> rules.

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

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(model)%20gateway_rule%20%3E%20(schema)>)

<details>

<summary>

RuleSetting object {add\_headers, allow\_child\_bypass, audit\_ssh, 25 more }

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

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(model)%20rule_setting%20%3E%20(schema)>)

<details>

<summary>

Schedule object {fri, mon, sat, 5 more }

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

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(model)%20schedule%20%3E%20(schema)>)

RuleDeleteResponse = unknown

[Link to this property](#)%20zero_trust.gateway.rules%20%3E%20(model)%20rule_delete_response%20%3E%20(schema)>)

#### GatewayCertificates

##### [List Zero Trust certificates](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/list)

GET/accounts/{account\_id}/gateway/certificates

##### [Get Zero Trust certificate details](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/get)

GET/accounts/{account\_id}/gateway/certificates/{certificate\_id}

##### [Create Zero Trust certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/create)

POST/accounts/{account\_id}/gateway/certificates

##### [Delete Zero Trust certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/delete)

DELETE/accounts/{account\_id}/gateway/certificates/{certificate\_id}

##### [Activate a Zero Trust certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/activate)

POST/accounts/{account\_id}/gateway/certificates/{certificate\_id}/activate

##### [Deactivate a Zero Trust certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/deactivate)

POST/accounts/{account\_id}/gateway/certificates/{certificate\_id}/deactivate

##### ModelsExpand Collapse

<details>

<summary>

CertificateListResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_list_response%20%3E%20(schema)>)

<details>

<summary>

CertificateGetResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_get_response%20%3E%20(schema)>)

<details>

<summary>

CertificateCreateResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_create_response%20%3E%20(schema)>)

<details>

<summary>

CertificateDeleteResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_delete_response%20%3E%20(schema)>)

<details>

<summary>

CertificateActivateResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_activate_response%20%3E%20(schema)>)

<details>

<summary>

CertificateDeactivateResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_deactivate_response%20%3E%20(schema)>)

#### GatewayPacfiles

##### [List PAC files](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/list)

GET/accounts/{account\_id}/gateway/pacfiles

##### [Get a PAC file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/get)

GET/accounts/{account\_id}/gateway/pacfiles/{pacfile\_id}

##### [Create a PAC file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/create)

POST/accounts/{account\_id}/gateway/pacfiles

##### [Update a Zero Trust Gateway PAC file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/update)

PUT/accounts/{account\_id}/gateway/pacfiles/{pacfile\_id}

##### [Delete a PAC file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/delete)

DELETE/accounts/{account\_id}/gateway/pacfiles/{pacfile\_id}

##### ModelsExpand Collapse

<details>

<summary>

PacfileListResponse object {id, created\_at, description, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_list_response%20%3E%20(schema)>)

<details>

<summary>

PacfileGetResponse object {id, contents, created\_at, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

contents: optional string

Actual contents of the PAC file

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_get_response%20%3E%20(schema)>)

<details>

<summary>

PacfileCreateResponse object {id, contents, created\_at, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

contents: optional string

Actual contents of the PAC file

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_create_response%20%3E%20(schema)>)

<details>

<summary>

PacfileUpdateResponse object {id, contents, created\_at, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

contents: optional string

Actual contents of the PAC file

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_update_response%20%3E%20(schema)>)

PacfileDeleteResponse = unknown

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_delete_response%20%3E%20(schema)>)