# List Access applications

GET/{accounts_or_zones}/{account_or_zone_id}/access/apps

Lists all Access applications in an account or zone.

##### Path Parameters

account_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)

zone_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)

##### Query Parameters

aud: optional string

The aud of the app.

[Link to this property](#)

domain: optional string

The domain of the app.

[Link to this property](#)

exact: optional boolean

True for only exact string matches against passed name/domain query parameters.

[Link to this property](#)

name: optional string

The name of the app.

[Link to this property](#)

page: optional number

Page number of results.

[Link to this property](#)

per_page: optional number

Number of results per page.

maximum1000

[Link to this property](#)

search: optional string

Search for apps by other listed query parameters.

[Link to this property](#)

target_attributes: optional string

Target Criteria attributes in key=value format.

[Link to this property](#)

##### Returns

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

<details>

<summary>

result: optional array of object { domain, type, id, 31 more } or object { id, allowed_idps, app_launcher_visible, 10 more } or object { domain, type, id, 31 more } or 10 more

</summary>

One of the following:

<details>

<summary>

SelfHostedApplication object { domain, type, id, 31 more }

</summary>

domain: string

The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

[Link to this property](#)

<details>

<summary>

type: [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allow_authenticate_via_warp: optional boolean

When set to true, users can authenticate to this application using their WARP session. When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

[Link to this property](#)

allow_iframe: optional boolean

Enables loading application content in an iFrame.

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

app_launcher_visible: optional boolean

Displays the application in the App Launcher.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

<details>

<summary>

cors_headers: optional [CORSHeaders](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20cors_headers%20%3E%20(schema)) { allow_all_headers, allow_all_methods, allow_all_origins, 5 more }

</summary>

allow_all_headers: optional boolean

Allows all HTTP request headers.

[Link to this property](#)

allow_all_methods: optional boolean

Allows all HTTP request methods.

[Link to this property](#)

allow_all_origins: optional boolean

Allows all origins.

[Link to this property](#)

allow_credentials: optional boolean

When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.

[Link to this property](#)

allowed_headers: optional array of [AllowedHeaders](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_headers%20%3E%20(schema))

Allowed HTTP request headers.

[Link to this property](#)

<details>

<summary>

allowed_methods: optional array of [AllowedMethods](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_methods%20%3E%20(schema))

Allowed HTTP request methods.

</summary>

One of the following:

"GET"

[Link to this property](#)

"POST"

[Link to this property](#)

"HEAD"

[Link to this property](#)

"PUT"

[Link to this property](#)

"DELETE"

[Link to this property](#)

"CONNECT"

[Link to this property](#)

"OPTIONS"

[Link to this property](#)

"TRACE"

[Link to this property](#)

"PATCH"

[Link to this property](#)

</details>

[Link to this property](#)

allowed_origins: optional array of [AllowedOrigins](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_origins%20%3E%20(schema))

Allowed origins.

[Link to this property](#)

max_age: optional number

The maximum number of seconds the results of a preflight request can be cached.

maximum86400

minimum-1

[Link to this property](#)

</details>

[Link to this property](#)

custom_deny_message: optional string

The custom error message shown to a user when they are denied access to the application.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

<details>

<summary>

destinations: optional array of object { type, uri } or object { cidr, hostname, l4_protocol, 3 more } or object { mcp_server_id, type } or 4 more

List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

</summary>

One of the following:

<details>

<summary>

PublicDestination object { type, uri }

A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard ’*’ can be used in the definition.

</summary>

type: optional "public"

[Link to this property](#)

uri: optional string

The URI of the destination. Public destinations’ URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrivateDestination object { cidr, hostname, l4_protocol, 3 more }

</summary>

cidr: optional string

The CIDR range of the destination. Single IPs will be computed as /32.

[Link to this property](#)

hostname: optional string

The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

[Link to this property](#)

<details>

<summary>

l4_protocol: optional "tcp" or "udp"

The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

</summary>

One of the following:

"tcp"

[Link to this property](#)

"udp"

[Link to this property](#)

</details>

[Link to this property](#)

port_range: optional string

The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

[Link to this property](#)

type: optional "private"

[Link to this property](#)

vnet_id: optional string

The VNET ID to match the destination. When omitted, all VNETs will match.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ViaMcpServerPortalDestination object { mcp_server_id, type }

A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

</summary>

mcp_server_id: optional string

The MCP server id configured in ai-controls.

[Link to this property](#)

type: optional "via_mcp_server_portal"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkerDestination object { type, worker_id }

A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker’s previews or specific paths.

</summary>

type: "worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PreviewWorkerDestination object { type, worker_id }

A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

</summary>

type: "preview_worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker whose preview deployments to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllWorkersDestination object { type }

Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_workers"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllPreviewWorkersDestination object { type }

Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_preview_workers"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

eager_redirect_cookie_setting: optional boolean

Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain, rather than setting it lazily on first visit. Defaults to true. Set to false to disable the eager redirect cookie behavior.

[Link to this property](#)

enable_binding_cookie: optional boolean

Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.

[Link to this property](#)

http_only_cookie_attribute: optional boolean

Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

[Link to this property](#)

logo_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

oauth_configuration: optional object { dynamic_client_registration, enabled, grant }

Beta: Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

</summary>

<details>

<summary>

dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }

Settings for OAuth dynamic client registration.

</summary>

allow_any_on_localhost: optional boolean

Allows any client with redirect URIs on localhost.

[Link to this property](#)

allow_any_on_loopback: optional boolean

Allows any client with redirect URIs on 127.0.0.1.

[Link to this property](#)

allowed_uris: optional array of string

The URIs that are allowed as redirect URIs for dynamically registered clients. HTTP and HTTPS paths may end in `/*` to match all sub-paths. Custom-scheme URIs must be explicitly configured and match exactly.

[Link to this property](#)

enabled: optional boolean

Whether dynamic client registration is enabled.

[Link to this property](#)

</details>

[Link to this property](#)

enabled: optional boolean

Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

[Link to this property](#)

<details>

<summary>

grant: optional object { access_token_lifetime, session_duration }

Settings for OAuth grant behavior.

</summary>

access_token_lifetime: optional string

The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

session_duration: optional string

The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

options_preflight_bypass: optional boolean

Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

[Link to this property](#)

path_cookie_attribute: optional boolean

Enables cookie paths to scope an application’s JWT to the application path. If disabled, the JWT will scope to the hostname by default

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

read_service_tokens_from_header: optional string

Allows matching Access Service Tokens passed HTTP in a single header with this name. This works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers. The header value will be interpreted as a json object similar to: { “cf-access-client-id”: “88bf3b6d86161464f6509f7219099e57.access.example.com”, “cf-access-client-secret”: “bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5” }

[Link to this property](#)

same_site_cookie_attribute: optional string

Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

[Link to this property](#)

<details>

<summary>

scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }

Configuration for provisioning to this application via SCIM. This is currently in closed beta.

</summary>

idp_uid: string

The UID of the IdP to use as the source for SCIM resources to provision to this application.

[Link to this property](#)

remote_uri: string

The base URI for the application’s SCIM-compatible API.

[Link to this property](#)

<details>

<summary>

authentication: optional [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or 2 more

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigMultiAuthentication = array of [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or object { client_id, client_secret, scheme }

Multiple authentication schemes

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

deactivate_on_delete: optional boolean

If false, propagates DELETE requests to the target application for SCIM resources. If true, sets ‘active’ to false on the SCIM resource. Note: Some targets do not support DELETE operations.

[Link to this property](#)

enabled: optional boolean

Whether SCIM provisioning is turned on for this application.

[Link to this property](#)

<details>

<summary>

mappings: optional array of [SCIMConfigMapping](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_mapping%20%3E%20(schema)) { schema, enabled, filter, 3 more }

A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

</summary>

schema: string

Which SCIM resource type this mapping applies to.

[Link to this property](#)

enabled: optional boolean

Whether or not this mapping is enabled.

[Link to this property](#)

filter: optional string

A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

[Link to this property](#)

<details>

<summary>

operations: optional object { create, delete, update }

Whether or not this mapping applies to creates, updates, or deletes.

</summary>

create: optional boolean

Whether or not this mapping applies to create (POST) operations.

[Link to this property](#)

delete: optional boolean

Whether or not this mapping applies to DELETE operations.

[Link to this property](#)

update: optional boolean

Whether or not this mapping applies to update (PATCH/PUT) operations.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

strictness: optional "strict" or "passthrough"

The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

</summary>

One of the following:

"strict"

[Link to this property](#)

"passthrough"

[Link to this property](#)

</details>

[Link to this property](#)

transform_jsonata: optional string

A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

Deprecatedself_hosted_domains: optional array of [SelfHostedDomains](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20self_hosted_domains%20%3E%20(schema))

List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until November 21, 2025. If `destinations` are provided, then `self_hosted_domains` will be ignored.

[Link to this property](#)

service_auth_401_redirect: optional boolean

Returns a 401 status code when the request is blocked by a Service Auth policy.

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

skip_interstitial: optional boolean

Enables automatic authentication through cloudflared.

[Link to this property](#)

tags: optional array of string

The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

[Link to this property](#)

use_clientless_isolation_app_launcher_url: optional boolean

Determines if users can access this application via a clientless browser isolation URL. This allows users to access private domains without connecting to Gateway. The option requires Clientless Browser Isolation to be set up with policies that allow users of this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SaaSApplication object { id, allowed_idps, app_launcher_visible, 10 more }

</summary>

id: optional string

UUID.

maxLength36

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

app_launcher_visible: optional boolean

Displays the application in the App Launcher.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

logo_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

saas_app: optional [SAMLSaaSApp](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20saml_saas_app%20%3E%20(schema)) { auth_type, consumer_service_url, custom_attributes, 8 more } or [OIDCSaaSApp](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20oidc_saas_app%20%3E%20(schema)) { access_token_lifetime, allow_pkce_without_client_secret, app_launcher_url, 11 more }

</summary>

One of the following:

<details>

<summary>

SAMLSaaSApp object { auth_type, consumer_service_url, custom_attributes, 8 more }

</summary>

<details>

<summary>

auth_type: optional "saml" or "oidc"

Optional identifier indicating the authentication protocol used for the saas app. Required for OIDC. Default if unset is “saml”

</summary>

One of the following:

"saml"

[Link to this property](#)

"oidc"

[Link to this property](#)

</details>

[Link to this property](#)

consumer_service_url: optional string

The service provider’s endpoint that is responsible for receiving and parsing a SAML assertion.

[Link to this property](#)

<details>

<summary>

custom_attributes: optional array of object { friendly_name, name, name_format, 2 more }

</summary>

friendly_name: optional string

The SAML FriendlyName of the attribute.

[Link to this property](#)

name: optional string

The name of the attribute.

[Link to this property](#)

<details>

<summary>

name_format: optional "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified" or "urn:oasis:names:tc:SAML:2.0:attrname-format:basic" or "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"

A globally unique name for an identity or service provider.

</summary>

One of the following:

"urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"

[Link to this property](#)

"urn:oasis:names:tc:SAML:2.0:attrname-format:basic"

[Link to this property](#)

"urn:oasis:names:tc:SAML:2.0:attrname-format:uri"

[Link to this property](#)

</details>

[Link to this property](#)

required: optional boolean

If the attribute is required when building a SAML assertion.

[Link to this property](#)

<details>

<summary>

source: optional object { name, name_by_idp }

</summary>

name: optional string

The name of the IdP attribute.

[Link to this property](#)

<details>

<summary>

name_by_idp: optional array of object { idp_id, source_name }

A mapping from IdP ID to attribute name.

</summary>

idp_id: optional string

The UID of the IdP.

[Link to this property](#)

source_name: optional string

The name of the IdP provided attribute.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

default_relay_state: optional string

The URL that the user will be redirected to after a successful login for IDP initiated logins.

[Link to this property](#)

idp_entity_id: optional string

The unique identifier for your SaaS application.

[Link to this property](#)

<details>

<summary>

name_id_format: optional [SaaSAppNameIDFormat](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20saas_app_name_id_format%20%3E%20(schema))

The format of the name identifier sent to the SaaS application.

</summary>

One of the following:

"id"

[Link to this property](#)

"email"

[Link to this property](#)

</details>

[Link to this property](#)

name_id_transform_jsonata: optional string

A [JSONata](https://jsonata.org/) expression that transforms an application’s user identities into a NameID value for its SAML assertion. This expression should evaluate to a singular string. The output of this expression can override the `name_id_format` setting.

[Link to this property](#)

public_key: optional string

The Access public certificate that will be used to verify your identity.

[Link to this property](#)

saml_attribute_transform_jsonata: optional string

A [JSONata] (https://jsonata.org/) expression that transforms an application’s user identities into attribute assertions in the SAML response. The expression can transform id, email, name, and groups values. It can also transform fields listed in the saml_attributes or oidc_fields of the identity provider used to authenticate. The output of this expression must be a JSON object.

[Link to this property](#)

sp_entity_id: optional string

A globally unique name for an identity or service provider.

[Link to this property](#)

sso_endpoint: optional string

The endpoint where your SaaS application will send login requests.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OIDCSaaSApp object { access_token_lifetime, allow_pkce_without_client_secret, app_launcher_url, 11 more }

</summary>

access_token_lifetime: optional string

The lifetime of the OIDC Access Token after creation. Valid units are m,h. Must be greater than or equal to 1m and less than or equal to 24h.

[Link to this property](#)

allow_pkce_without_client_secret: optional boolean

If client secret should be required on the token endpoint when authorization_code_with_pkce grant is used.

[Link to this property](#)

app_launcher_url: optional string

The URL where this applications tile redirects users

[Link to this property](#)

<details>

<summary>

auth_type: optional "saml" or "oidc"

Identifier of the authentication protocol used for the saas app. Required for OIDC.

</summary>

One of the following:

"saml"

[Link to this property](#)

"oidc"

[Link to this property](#)

</details>

[Link to this property](#)

client_id: optional string

The application client id

[Link to this property](#)

client_secret: optional string

The application client secret, only returned on POST request.

[Link to this property](#)

<details>

<summary>

custom_claims: optional array of object { name, required, scope, source }

</summary>

name: optional string

The name of the claim.

[Link to this property](#)

required: optional boolean

If the claim is required when building an OIDC token.

[Link to this property](#)

<details>

<summary>

scope: optional "groups" or "profile" or "email" or "openid"

The scope of the claim.

</summary>

One of the following:

"groups"

[Link to this property](#)

"profile"

[Link to this property](#)

"email"

[Link to this property](#)

"openid"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { name, name_by_idp }

</summary>

name: optional string

The name of the IdP claim.

[Link to this property](#)

name_by_idp: optional map[string]

A mapping from IdP ID to claim name.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

grant_types: optional array of "authorization_code" or "authorization_code_with_pkce" or "refresh_tokens" or 2 more

The OIDC flows supported by this application

</summary>

One of the following:

"authorization_code"

[Link to this property](#)

"authorization_code_with_pkce"

[Link to this property](#)

"refresh_tokens"

[Link to this property](#)

"hybrid"

[Link to this property](#)

"implicit"

[Link to this property](#)

</details>

[Link to this property](#)

group_filter_regex: optional string

A regex to filter Cloudflare groups returned in ID token and userinfo endpoint

[Link to this property](#)

<details>

<summary>

hybrid_and_implicit_options: optional object { return_access_token_from_authorization_endpoint, return_id_token_from_authorization_endpoint }

</summary>

return_access_token_from_authorization_endpoint: optional boolean

If an Access Token should be returned from the OIDC Authorization endpoint

[Link to this property](#)

return_id_token_from_authorization_endpoint: optional boolean

If an ID Token should be returned from the OIDC Authorization endpoint

[Link to this property](#)

</details>

[Link to this property](#)

public_key: optional string

The Access public certificate that will be used to verify your identity.

[Link to this property](#)

redirect_uris: optional array of string

The permitted URL’s for Cloudflare to return Authorization codes and Access/ID tokens

[Link to this property](#)

<details>

<summary>

refresh_token_options: optional object { lifetime }

</summary>

lifetime: optional string

How long a refresh token will be valid for after creation. Valid units are m,h,d. Must be longer than 1m.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scopes: optional array of "openid" or "groups" or "email" or "profile"

Define the user information shared with access, “offline_access” scope will be automatically enabled if refresh tokens are enabled

</summary>

One of the following:

"openid"

[Link to this property](#)

"groups"

[Link to this property](#)

"email"

[Link to this property](#)

"profile"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }

Configuration for provisioning to this application via SCIM. This is currently in closed beta.

</summary>

idp_uid: string

The UID of the IdP to use as the source for SCIM resources to provision to this application.

[Link to this property](#)

remote_uri: string

The base URI for the application’s SCIM-compatible API.

[Link to this property](#)

<details>

<summary>

authentication: optional [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or 2 more

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigMultiAuthentication = array of [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or object { client_id, client_secret, scheme }

Multiple authentication schemes

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

deactivate_on_delete: optional boolean

If false, propagates DELETE requests to the target application for SCIM resources. If true, sets ‘active’ to false on the SCIM resource. Note: Some targets do not support DELETE operations.

[Link to this property](#)

enabled: optional boolean

Whether SCIM provisioning is turned on for this application.

[Link to this property](#)

<details>

<summary>

mappings: optional array of [SCIMConfigMapping](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_mapping%20%3E%20(schema)) { schema, enabled, filter, 3 more }

A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

</summary>

schema: string

Which SCIM resource type this mapping applies to.

[Link to this property](#)

enabled: optional boolean

Whether or not this mapping is enabled.

[Link to this property](#)

filter: optional string

A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

[Link to this property](#)

<details>

<summary>

operations: optional object { create, delete, update }

Whether or not this mapping applies to creates, updates, or deletes.

</summary>

create: optional boolean

Whether or not this mapping applies to create (POST) operations.

[Link to this property](#)

delete: optional boolean

Whether or not this mapping applies to DELETE operations.

[Link to this property](#)

update: optional boolean

Whether or not this mapping applies to update (PATCH/PUT) operations.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

strictness: optional "strict" or "passthrough"

The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

</summary>

One of the following:

"strict"

[Link to this property](#)

"passthrough"

[Link to this property](#)

</details>

[Link to this property](#)

transform_jsonata: optional string

A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of string

The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

[Link to this property](#)

<details>

<summary>

type: optional [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BrowserSSHApplication object { domain, type, id, 31 more }

</summary>

domain: string

The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

[Link to this property](#)

<details>

<summary>

type: "self_hosted" or "saas" or "ssh" or 11 more

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allow_authenticate_via_warp: optional boolean

When set to true, users can authenticate to this application using their WARP session. When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

[Link to this property](#)

allow_iframe: optional boolean

Enables loading application content in an iFrame.

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

app_launcher_visible: optional boolean

Displays the application in the App Launcher.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

<details>

<summary>

cors_headers: optional [CORSHeaders](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20cors_headers%20%3E%20(schema)) { allow_all_headers, allow_all_methods, allow_all_origins, 5 more }

</summary>

allow_all_headers: optional boolean

Allows all HTTP request headers.

[Link to this property](#)

allow_all_methods: optional boolean

Allows all HTTP request methods.

[Link to this property](#)

allow_all_origins: optional boolean

Allows all origins.

[Link to this property](#)

allow_credentials: optional boolean

When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.

[Link to this property](#)

allowed_headers: optional array of [AllowedHeaders](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_headers%20%3E%20(schema))

Allowed HTTP request headers.

[Link to this property](#)

<details>

<summary>

allowed_methods: optional array of [AllowedMethods](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_methods%20%3E%20(schema))

Allowed HTTP request methods.

</summary>

One of the following:

"GET"

[Link to this property](#)

"POST"

[Link to this property](#)

"HEAD"

[Link to this property](#)

"PUT"

[Link to this property](#)

"DELETE"

[Link to this property](#)

"CONNECT"

[Link to this property](#)

"OPTIONS"

[Link to this property](#)

"TRACE"

[Link to this property](#)

"PATCH"

[Link to this property](#)

</details>

[Link to this property](#)

allowed_origins: optional array of [AllowedOrigins](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_origins%20%3E%20(schema))

Allowed origins.

[Link to this property](#)

max_age: optional number

The maximum number of seconds the results of a preflight request can be cached.

maximum86400

minimum-1

[Link to this property](#)

</details>

[Link to this property](#)

custom_deny_message: optional string

The custom error message shown to a user when they are denied access to the application.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

<details>

<summary>

destinations: optional array of object { type, uri } or object { cidr, hostname, l4_protocol, 3 more } or object { mcp_server_id, type } or 4 more

List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

</summary>

One of the following:

<details>

<summary>

PublicDestination object { type, uri }

A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard ’*’ can be used in the definition.

</summary>

type: optional "public"

[Link to this property](#)

uri: optional string

The URI of the destination. Public destinations’ URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrivateDestination object { cidr, hostname, l4_protocol, 3 more }

</summary>

cidr: optional string

The CIDR range of the destination. Single IPs will be computed as /32.

[Link to this property](#)

hostname: optional string

The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

[Link to this property](#)

<details>

<summary>

l4_protocol: optional "tcp" or "udp"

The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

</summary>

One of the following:

"tcp"

[Link to this property](#)

"udp"

[Link to this property](#)

</details>

[Link to this property](#)

port_range: optional string

The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

[Link to this property](#)

type: optional "private"

[Link to this property](#)

vnet_id: optional string

The VNET ID to match the destination. When omitted, all VNETs will match.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ViaMcpServerPortalDestination object { mcp_server_id, type }

A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

</summary>

mcp_server_id: optional string

The MCP server id configured in ai-controls.

[Link to this property](#)

type: optional "via_mcp_server_portal"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkerDestination object { type, worker_id }

A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker’s previews or specific paths.

</summary>

type: "worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PreviewWorkerDestination object { type, worker_id }

A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

</summary>

type: "preview_worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker whose preview deployments to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllWorkersDestination object { type }

Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_workers"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllPreviewWorkersDestination object { type }

Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_preview_workers"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

eager_redirect_cookie_setting: optional boolean

Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain, rather than setting it lazily on first visit. Defaults to true. Set to false to disable the eager redirect cookie behavior.

[Link to this property](#)

enable_binding_cookie: optional boolean

Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.

[Link to this property](#)

http_only_cookie_attribute: optional boolean

Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

[Link to this property](#)

logo_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

oauth_configuration: optional object { dynamic_client_registration, enabled, grant }

Beta: Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

</summary>

<details>

<summary>

dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }

Settings for OAuth dynamic client registration.

</summary>

allow_any_on_localhost: optional boolean

Allows any client with redirect URIs on localhost.

[Link to this property](#)

allow_any_on_loopback: optional boolean

Allows any client with redirect URIs on 127.0.0.1.

[Link to this property](#)

allowed_uris: optional array of string

The URIs that are allowed as redirect URIs for dynamically registered clients. HTTP and HTTPS paths may end in `/*` to match all sub-paths. Custom-scheme URIs must be explicitly configured and match exactly.

[Link to this property](#)

enabled: optional boolean

Whether dynamic client registration is enabled.

[Link to this property](#)

</details>

[Link to this property](#)

enabled: optional boolean

Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

[Link to this property](#)

<details>

<summary>

grant: optional object { access_token_lifetime, session_duration }

Settings for OAuth grant behavior.

</summary>

access_token_lifetime: optional string

The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

session_duration: optional string

The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

options_preflight_bypass: optional boolean

Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

[Link to this property](#)

path_cookie_attribute: optional boolean

Enables cookie paths to scope an application’s JWT to the application path. If disabled, the JWT will scope to the hostname by default

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

read_service_tokens_from_header: optional string

Allows matching Access Service Tokens passed HTTP in a single header with this name. This works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers. The header value will be interpreted as a json object similar to: { “cf-access-client-id”: “88bf3b6d86161464f6509f7219099e57.access.example.com”, “cf-access-client-secret”: “bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5” }

[Link to this property](#)

same_site_cookie_attribute: optional string

Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

[Link to this property](#)

<details>

<summary>

scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }

Configuration for provisioning to this application via SCIM. This is currently in closed beta.

</summary>

idp_uid: string

The UID of the IdP to use as the source for SCIM resources to provision to this application.

[Link to this property](#)

remote_uri: string

The base URI for the application’s SCIM-compatible API.

[Link to this property](#)

<details>

<summary>

authentication: optional [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or 2 more

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigMultiAuthentication = array of [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or object { client_id, client_secret, scheme }

Multiple authentication schemes

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

deactivate_on_delete: optional boolean

If false, propagates DELETE requests to the target application for SCIM resources. If true, sets ‘active’ to false on the SCIM resource. Note: Some targets do not support DELETE operations.

[Link to this property](#)

enabled: optional boolean

Whether SCIM provisioning is turned on for this application.

[Link to this property](#)

<details>

<summary>

mappings: optional array of [SCIMConfigMapping](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_mapping%20%3E%20(schema)) { schema, enabled, filter, 3 more }

A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

</summary>

schema: string

Which SCIM resource type this mapping applies to.

[Link to this property](#)

enabled: optional boolean

Whether or not this mapping is enabled.

[Link to this property](#)

filter: optional string

A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

[Link to this property](#)

<details>

<summary>

operations: optional object { create, delete, update }

Whether or not this mapping applies to creates, updates, or deletes.

</summary>

create: optional boolean

Whether or not this mapping applies to create (POST) operations.

[Link to this property](#)

delete: optional boolean

Whether or not this mapping applies to DELETE operations.

[Link to this property](#)

update: optional boolean

Whether or not this mapping applies to update (PATCH/PUT) operations.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

strictness: optional "strict" or "passthrough"

The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

</summary>

One of the following:

"strict"

[Link to this property](#)

"passthrough"

[Link to this property](#)

</details>

[Link to this property](#)

transform_jsonata: optional string

A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

Deprecatedself_hosted_domains: optional array of [SelfHostedDomains](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20self_hosted_domains%20%3E%20(schema))

List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until November 21, 2025. If `destinations` are provided, then `self_hosted_domains` will be ignored.

[Link to this property](#)

service_auth_401_redirect: optional boolean

Returns a 401 status code when the request is blocked by a Service Auth policy.

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

skip_interstitial: optional boolean

Enables automatic authentication through cloudflared.

[Link to this property](#)

tags: optional array of string

The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

[Link to this property](#)

use_clientless_isolation_app_launcher_url: optional boolean

Determines if users can access this application via a clientless browser isolation URL. This allows users to access private domains without connecting to Gateway. The option requires Clientless Browser Isolation to be set up with policies that allow users of this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BrowserVNCApplication object { domain, type, id, 31 more }

</summary>

domain: string

The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

[Link to this property](#)

<details>

<summary>

type: "self_hosted" or "saas" or "ssh" or 11 more

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allow_authenticate_via_warp: optional boolean

When set to true, users can authenticate to this application using their WARP session. When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

[Link to this property](#)

allow_iframe: optional boolean

Enables loading application content in an iFrame.

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

app_launcher_visible: optional boolean

Displays the application in the App Launcher.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

<details>

<summary>

cors_headers: optional [CORSHeaders](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20cors_headers%20%3E%20(schema)) { allow_all_headers, allow_all_methods, allow_all_origins, 5 more }

</summary>

allow_all_headers: optional boolean

Allows all HTTP request headers.

[Link to this property](#)

allow_all_methods: optional boolean

Allows all HTTP request methods.

[Link to this property](#)

allow_all_origins: optional boolean

Allows all origins.

[Link to this property](#)

allow_credentials: optional boolean

When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.

[Link to this property](#)

allowed_headers: optional array of [AllowedHeaders](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_headers%20%3E%20(schema))

Allowed HTTP request headers.

[Link to this property](#)

<details>

<summary>

allowed_methods: optional array of [AllowedMethods](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_methods%20%3E%20(schema))

Allowed HTTP request methods.

</summary>

One of the following:

"GET"

[Link to this property](#)

"POST"

[Link to this property](#)

"HEAD"

[Link to this property](#)

"PUT"

[Link to this property](#)

"DELETE"

[Link to this property](#)

"CONNECT"

[Link to this property](#)

"OPTIONS"

[Link to this property](#)

"TRACE"

[Link to this property](#)

"PATCH"

[Link to this property](#)

</details>

[Link to this property](#)

allowed_origins: optional array of [AllowedOrigins](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_origins%20%3E%20(schema))

Allowed origins.

[Link to this property](#)

max_age: optional number

The maximum number of seconds the results of a preflight request can be cached.

maximum86400

minimum-1

[Link to this property](#)

</details>

[Link to this property](#)

custom_deny_message: optional string

The custom error message shown to a user when they are denied access to the application.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

<details>

<summary>

destinations: optional array of object { type, uri } or object { cidr, hostname, l4_protocol, 3 more } or object { mcp_server_id, type } or 4 more

List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

</summary>

One of the following:

<details>

<summary>

PublicDestination object { type, uri }

A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard ’*’ can be used in the definition.

</summary>

type: optional "public"

[Link to this property](#)

uri: optional string

The URI of the destination. Public destinations’ URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrivateDestination object { cidr, hostname, l4_protocol, 3 more }

</summary>

cidr: optional string

The CIDR range of the destination. Single IPs will be computed as /32.

[Link to this property](#)

hostname: optional string

The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

[Link to this property](#)

<details>

<summary>

l4_protocol: optional "tcp" or "udp"

The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

</summary>

One of the following:

"tcp"

[Link to this property](#)

"udp"

[Link to this property](#)

</details>

[Link to this property](#)

port_range: optional string

The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

[Link to this property](#)

type: optional "private"

[Link to this property](#)

vnet_id: optional string

The VNET ID to match the destination. When omitted, all VNETs will match.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ViaMcpServerPortalDestination object { mcp_server_id, type }

A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

</summary>

mcp_server_id: optional string

The MCP server id configured in ai-controls.

[Link to this property](#)

type: optional "via_mcp_server_portal"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkerDestination object { type, worker_id }

A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker’s previews or specific paths.

</summary>

type: "worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PreviewWorkerDestination object { type, worker_id }

A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

</summary>

type: "preview_worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker whose preview deployments to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllWorkersDestination object { type }

Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_workers"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllPreviewWorkersDestination object { type }

Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_preview_workers"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

eager_redirect_cookie_setting: optional boolean

Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain, rather than setting it lazily on first visit. Defaults to true. Set to false to disable the eager redirect cookie behavior.

[Link to this property](#)

enable_binding_cookie: optional boolean

Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.

[Link to this property](#)

http_only_cookie_attribute: optional boolean

Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

[Link to this property](#)

logo_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

oauth_configuration: optional object { dynamic_client_registration, enabled, grant }

Beta: Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

</summary>

<details>

<summary>

dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }

Settings for OAuth dynamic client registration.

</summary>

allow_any_on_localhost: optional boolean

Allows any client with redirect URIs on localhost.

[Link to this property](#)

allow_any_on_loopback: optional boolean

Allows any client with redirect URIs on 127.0.0.1.

[Link to this property](#)

allowed_uris: optional array of string

The URIs that are allowed as redirect URIs for dynamically registered clients. HTTP and HTTPS paths may end in `/*` to match all sub-paths. Custom-scheme URIs must be explicitly configured and match exactly.

[Link to this property](#)

enabled: optional boolean

Whether dynamic client registration is enabled.

[Link to this property](#)

</details>

[Link to this property](#)

enabled: optional boolean

Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

[Link to this property](#)

<details>

<summary>

grant: optional object { access_token_lifetime, session_duration }

Settings for OAuth grant behavior.

</summary>

access_token_lifetime: optional string

The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

session_duration: optional string

The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

options_preflight_bypass: optional boolean

Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

[Link to this property](#)

path_cookie_attribute: optional boolean

Enables cookie paths to scope an application’s JWT to the application path. If disabled, the JWT will scope to the hostname by default

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

read_service_tokens_from_header: optional string

Allows matching Access Service Tokens passed HTTP in a single header with this name. This works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers. The header value will be interpreted as a json object similar to: { “cf-access-client-id”: “88bf3b6d86161464f6509f7219099e57.access.example.com”, “cf-access-client-secret”: “bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5” }

[Link to this property](#)

same_site_cookie_attribute: optional string

Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

[Link to this property](#)

<details>

<summary>

scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }

Configuration for provisioning to this application via SCIM. This is currently in closed beta.

</summary>

idp_uid: string

The UID of the IdP to use as the source for SCIM resources to provision to this application.

[Link to this property](#)

remote_uri: string

The base URI for the application’s SCIM-compatible API.

[Link to this property](#)

<details>

<summary>

authentication: optional [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or 2 more

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigMultiAuthentication = array of [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or object { client_id, client_secret, scheme }

Multiple authentication schemes

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

deactivate_on_delete: optional boolean

If false, propagates DELETE requests to the target application for SCIM resources. If true, sets ‘active’ to false on the SCIM resource. Note: Some targets do not support DELETE operations.

[Link to this property](#)

enabled: optional boolean

Whether SCIM provisioning is turned on for this application.

[Link to this property](#)

<details>

<summary>

mappings: optional array of [SCIMConfigMapping](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_mapping%20%3E%20(schema)) { schema, enabled, filter, 3 more }

A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

</summary>

schema: string

Which SCIM resource type this mapping applies to.

[Link to this property](#)

enabled: optional boolean

Whether or not this mapping is enabled.

[Link to this property](#)

filter: optional string

A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

[Link to this property](#)

<details>

<summary>

operations: optional object { create, delete, update }

Whether or not this mapping applies to creates, updates, or deletes.

</summary>

create: optional boolean

Whether or not this mapping applies to create (POST) operations.

[Link to this property](#)

delete: optional boolean

Whether or not this mapping applies to DELETE operations.

[Link to this property](#)

update: optional boolean

Whether or not this mapping applies to update (PATCH/PUT) operations.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

strictness: optional "strict" or "passthrough"

The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

</summary>

One of the following:

"strict"

[Link to this property](#)

"passthrough"

[Link to this property](#)

</details>

[Link to this property](#)

transform_jsonata: optional string

A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

Deprecatedself_hosted_domains: optional array of [SelfHostedDomains](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20self_hosted_domains%20%3E%20(schema))

List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until November 21, 2025. If `destinations` are provided, then `self_hosted_domains` will be ignored.

[Link to this property](#)

service_auth_401_redirect: optional boolean

Returns a 401 status code when the request is blocked by a Service Auth policy.

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

skip_interstitial: optional boolean

Enables automatic authentication through cloudflared.

[Link to this property](#)

tags: optional array of string

The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

[Link to this property](#)

use_clientless_isolation_app_launcher_url: optional boolean

Determines if users can access this application via a clientless browser isolation URL. This allows users to access private domains without connecting to Gateway. The option requires Clientless Browser Isolation to be set up with policies that allow users of this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AppLauncherApplication object { type, id, allowed_idps, 15 more }

</summary>

<details>

<summary>

type: "self_hosted" or "saas" or "ssh" or 11 more

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

app_launcher_logo_url: optional string

The image URL of the logo shown in the App Launcher header.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

bg_color: optional string

The background color of the App Launcher page.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

domain: optional string

The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

[Link to this property](#)

<details>

<summary>

footer_links: optional array of object { name, url }

The links in the App Launcher footer.

</summary>

name: string

The hypertext in the footer link.

[Link to this property](#)

url: string

the hyperlink in the footer link.

[Link to this property](#)

</details>

[Link to this property](#)

header_bg_color: optional string

The background color of the App Launcher header.

[Link to this property](#)

<details>

<summary>

landing_page_design: optional object { button_color, button_text_color, image_url, 2 more }

The design of the App Launcher landing page shown to users when they log in.

</summary>

button_color: optional string

The background color of the log in button on the landing page.

[Link to this property](#)

button_text_color: optional string

The color of the text in the log in button on the landing page.

[Link to this property](#)

image_url: optional string

The URL of the image shown on the landing page.

[Link to this property](#)

message: optional string

The message shown on the landing page.

[Link to this property](#)

title: optional string

The title shown on the landing page.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

skip_app_launcher_login_page: optional boolean

Determines when to skip the App Launcher landing page.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DeviceEnrollmentPermissionsApplication object { type, id, allowed_idps, 9 more }

</summary>

<details>

<summary>

type: [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

domain: optional string

The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BrowserIsolationPermissionsApplication object { type, id, allowed_idps, 9 more }

</summary>

<details>

<summary>

type: [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

domain: optional string

The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GatewayIdentityProxyEndpointApplication object { type, id, allowed_idps, 9 more }

</summary>

<details>

<summary>

type: [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

domain: optional string

The proxy endpoint domain in the format: 10 alphanumeric characters followed by .proxy.cloudflare-gateway.com

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BookmarkApplication object { id, app_launcher_visible, aud, 6 more }

</summary>

id: optional string

UUID.

maxLength36

[Link to this property](#)

app_launcher_visible: optional boolean

Displays the application in the App Launcher.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

domain: optional string

The URL or domain of the bookmark.

[Link to this property](#)

logo_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of string

The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

[Link to this property](#)

<details>

<summary>

type: optional [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

InfrastructureApplication object { target_criteria, type, id, 4 more }

</summary>

<details>

<summary>

target_criteria: array of object { port, protocol, exclude, 3 more }

</summary>

port: number

The port that the targets use for the chosen communication protocol. A port cannot be assigned to multiple protocols.

[Link to this property](#)

protocol: "SSH"

The communication protocol your application secures.

[Link to this property](#)

<details>

<summary>

exclude: optional object { tags, target_attributes }

Target is excluded when any selector in this rule matches.

</summary>

tags: optional map[array of string]

Map of target tag keys to values. Values within a key are OR’d.

[Link to this property](#)

<details>

<summary>

target_attributes: optional object { hostname }

Hostname selector map for include, require, or exclude rules. This is distinct from the deprecated top-level target_attributes field and only supports the hostname key.

</summary>

hostname: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional object { tags, target_attributes }

Target matches when any selector in this rule matches.

</summary>

tags: optional map[array of string]

Map of target tag keys to values. Values within a key are OR’d.

[Link to this property](#)

<details>

<summary>

target_attributes: optional object { hostname }

Hostname selector map for include, require, or exclude rules. This is distinct from the deprecated top-level target_attributes field and only supports the hostname key.

</summary>

hostname: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

require: optional object { tags, target_attributes }

Target matches only when every selector in this rule matches.

</summary>

tags: optional map[array of string]

Map of target tag keys to values. Values within a key are OR’d.

[Link to this property](#)

<details>

<summary>

target_attributes: optional object { hostname }

Hostname selector map for include, require, or exclude rules. This is distinct from the deprecated top-level target_attributes field and only supports the hostname key.

</summary>

hostname: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

Deprecatedtarget_attributes: optional map[array of string]

Contains a map of target attribute keys to target attribute values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings for infrastructure applications.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "piv_key" or "ssh_fido2_key"

Lists the MFA methods that users can authenticate with. For infrastructure applications, supported values are `piv_key` and `ssh_fido2_key`.

</summary>

One of the following:

"piv_key"

[Link to this property](#)

"ssh_fido2_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples: `5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, connection_rules, created_at, 7 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { ssh }

The rules that define how users may connect to the targets secured by your application.

</summary>

<details>

<summary>

ssh: optional object { usernames, allow_email_alias }

The SSH-specific rules that define how users may connect to the targets secured by your application.

</summary>

usernames: array of string

Contains the Unix usernames that may be used when connecting over SSH.

[Link to this property](#)

allow_email_alias: optional boolean

Enables using Identity Provider email alias as SSH username.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings for infrastructure applications.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "piv_key" or "ssh_fido2_key"

Lists the MFA methods that users can authenticate with. For infrastructure applications, supported values are `piv_key` and `ssh_fido2_key`.

</summary>

One of the following:

"piv_key"

[Link to this property](#)

"ssh_fido2_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples: `5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BrowserRDPApplication object { domain, target_criteria, type, 32 more }

</summary>

domain: string

The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

[Link to this property](#)

<details>

<summary>

target_criteria: array of object { port, protocol, exclude, 3 more }

</summary>

port: number

The port that the targets use for the chosen communication protocol. A port cannot be assigned to multiple protocols.

[Link to this property](#)

protocol: "RDP"

The communication protocol your application secures.

[Link to this property](#)

<details>

<summary>

exclude: optional object { tags, target_attributes }

Target is excluded when any selector in this rule matches.

</summary>

tags: optional map[array of string]

Map of target tag keys to values. Values within a key are OR’d.

[Link to this property](#)

<details>

<summary>

target_attributes: optional object { hostname }

Hostname selector map for include, require, or exclude rules. This is distinct from the deprecated top-level target_attributes field and only supports the hostname key.

</summary>

hostname: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional object { tags, target_attributes }

Target matches when any selector in this rule matches.

</summary>

tags: optional map[array of string]

Map of target tag keys to values. Values within a key are OR’d.

[Link to this property](#)

<details>

<summary>

target_attributes: optional object { hostname }

Hostname selector map for include, require, or exclude rules. This is distinct from the deprecated top-level target_attributes field and only supports the hostname key.

</summary>

hostname: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

require: optional object { tags, target_attributes }

Target matches only when every selector in this rule matches.

</summary>

tags: optional map[array of string]

Map of target tag keys to values. Values within a key are OR’d.

[Link to this property](#)

<details>

<summary>

target_attributes: optional object { hostname }

Hostname selector map for include, require, or exclude rules. This is distinct from the deprecated top-level target_attributes field and only supports the hostname key.

</summary>

hostname: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

Deprecatedtarget_attributes: optional map[array of string]

Contains a map of target attribute keys to target attribute values.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allow_authenticate_via_warp: optional boolean

When set to true, users can authenticate to this application using their WARP session. When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

[Link to this property](#)

allow_iframe: optional boolean

Enables loading application content in an iFrame.

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

app_launcher_visible: optional boolean

Displays the application in the App Launcher.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

<details>

<summary>

cors_headers: optional [CORSHeaders](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20cors_headers%20%3E%20(schema)) { allow_all_headers, allow_all_methods, allow_all_origins, 5 more }

</summary>

allow_all_headers: optional boolean

Allows all HTTP request headers.

[Link to this property](#)

allow_all_methods: optional boolean

Allows all HTTP request methods.

[Link to this property](#)

allow_all_origins: optional boolean

Allows all origins.

[Link to this property](#)

allow_credentials: optional boolean

When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.

[Link to this property](#)

allowed_headers: optional array of [AllowedHeaders](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_headers%20%3E%20(schema))

Allowed HTTP request headers.

[Link to this property](#)

<details>

<summary>

allowed_methods: optional array of [AllowedMethods](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_methods%20%3E%20(schema))

Allowed HTTP request methods.

</summary>

One of the following:

"GET"

[Link to this property](#)

"POST"

[Link to this property](#)

"HEAD"

[Link to this property](#)

"PUT"

[Link to this property](#)

"DELETE"

[Link to this property](#)

"CONNECT"

[Link to this property](#)

"OPTIONS"

[Link to this property](#)

"TRACE"

[Link to this property](#)

"PATCH"

[Link to this property](#)

</details>

[Link to this property](#)

allowed_origins: optional array of [AllowedOrigins](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_origins%20%3E%20(schema))

Allowed origins.

[Link to this property](#)

max_age: optional number

The maximum number of seconds the results of a preflight request can be cached.

maximum86400

minimum-1

[Link to this property](#)

</details>

[Link to this property](#)

custom_deny_message: optional string

The custom error message shown to a user when they are denied access to the application.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

<details>

<summary>

destinations: optional array of object { type, uri } or object { cidr, hostname, l4_protocol, 3 more } or object { mcp_server_id, type } or 4 more

List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

</summary>

One of the following:

<details>

<summary>

PublicDestination object { type, uri }

A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard ’*’ can be used in the definition.

</summary>

type: optional "public"

[Link to this property](#)

uri: optional string

The URI of the destination. Public destinations’ URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrivateDestination object { cidr, hostname, l4_protocol, 3 more }

</summary>

cidr: optional string

The CIDR range of the destination. Single IPs will be computed as /32.

[Link to this property](#)

hostname: optional string

The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

[Link to this property](#)

<details>

<summary>

l4_protocol: optional "tcp" or "udp"

The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

</summary>

One of the following:

"tcp"

[Link to this property](#)

"udp"

[Link to this property](#)

</details>

[Link to this property](#)

port_range: optional string

The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

[Link to this property](#)

type: optional "private"

[Link to this property](#)

vnet_id: optional string

The VNET ID to match the destination. When omitted, all VNETs will match.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ViaMcpServerPortalDestination object { mcp_server_id, type }

A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

</summary>

mcp_server_id: optional string

The MCP server id configured in ai-controls.

[Link to this property](#)

type: optional "via_mcp_server_portal"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkerDestination object { type, worker_id }

A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker’s previews or specific paths.

</summary>

type: "worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PreviewWorkerDestination object { type, worker_id }

A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

</summary>

type: "preview_worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker whose preview deployments to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllWorkersDestination object { type }

Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_workers"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllPreviewWorkersDestination object { type }

Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_preview_workers"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

eager_redirect_cookie_setting: optional boolean

Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain, rather than setting it lazily on first visit. Defaults to true. Set to false to disable the eager redirect cookie behavior.

[Link to this property](#)

enable_binding_cookie: optional boolean

Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.

[Link to this property](#)

http_only_cookie_attribute: optional boolean

Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

[Link to this property](#)

logo_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

oauth_configuration: optional object { dynamic_client_registration, enabled, grant }

Beta: Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

</summary>

<details>

<summary>

dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }

Settings for OAuth dynamic client registration.

</summary>

allow_any_on_localhost: optional boolean

Allows any client with redirect URIs on localhost.

[Link to this property](#)

allow_any_on_loopback: optional boolean

Allows any client with redirect URIs on 127.0.0.1.

[Link to this property](#)

allowed_uris: optional array of string

The URIs that are allowed as redirect URIs for dynamically registered clients. HTTP and HTTPS paths may end in `/*` to match all sub-paths. Custom-scheme URIs must be explicitly configured and match exactly.

[Link to this property](#)

enabled: optional boolean

Whether dynamic client registration is enabled.

[Link to this property](#)

</details>

[Link to this property](#)

enabled: optional boolean

Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

[Link to this property](#)

<details>

<summary>

grant: optional object { access_token_lifetime, session_duration }

Settings for OAuth grant behavior.

</summary>

access_token_lifetime: optional string

The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

session_duration: optional string

The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

options_preflight_bypass: optional boolean

Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

[Link to this property](#)

path_cookie_attribute: optional boolean

Enables cookie paths to scope an application’s JWT to the application path. If disabled, the JWT will scope to the hostname by default

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

read_service_tokens_from_header: optional string

Allows matching Access Service Tokens passed HTTP in a single header with this name. This works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers. The header value will be interpreted as a json object similar to: { “cf-access-client-id”: “88bf3b6d86161464f6509f7219099e57.access.example.com”, “cf-access-client-secret”: “bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5” }

[Link to this property](#)

same_site_cookie_attribute: optional string

Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

[Link to this property](#)

<details>

<summary>

scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }

Configuration for provisioning to this application via SCIM. This is currently in closed beta.

</summary>

idp_uid: string

The UID of the IdP to use as the source for SCIM resources to provision to this application.

[Link to this property](#)

remote_uri: string

The base URI for the application’s SCIM-compatible API.

[Link to this property](#)

<details>

<summary>

authentication: optional [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or 2 more

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigMultiAuthentication = array of [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or object { client_id, client_secret, scheme }

Multiple authentication schemes

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

deactivate_on_delete: optional boolean

If false, propagates DELETE requests to the target application for SCIM resources. If true, sets ‘active’ to false on the SCIM resource. Note: Some targets do not support DELETE operations.

[Link to this property](#)

enabled: optional boolean

Whether SCIM provisioning is turned on for this application.

[Link to this property](#)

<details>

<summary>

mappings: optional array of [SCIMConfigMapping](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_mapping%20%3E%20(schema)) { schema, enabled, filter, 3 more }

A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

</summary>

schema: string

Which SCIM resource type this mapping applies to.

[Link to this property](#)

enabled: optional boolean

Whether or not this mapping is enabled.

[Link to this property](#)

filter: optional string

A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

[Link to this property](#)

<details>

<summary>

operations: optional object { create, delete, update }

Whether or not this mapping applies to creates, updates, or deletes.

</summary>

create: optional boolean

Whether or not this mapping applies to create (POST) operations.

[Link to this property](#)

delete: optional boolean

Whether or not this mapping applies to DELETE operations.

[Link to this property](#)

update: optional boolean

Whether or not this mapping applies to update (PATCH/PUT) operations.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

strictness: optional "strict" or "passthrough"

The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

</summary>

One of the following:

"strict"

[Link to this property](#)

"passthrough"

[Link to this property](#)

</details>

[Link to this property](#)

transform_jsonata: optional string

A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

Deprecatedself_hosted_domains: optional array of [SelfHostedDomains](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20self_hosted_domains%20%3E%20(schema))

List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until November 21, 2025. If `destinations` are provided, then `self_hosted_domains` will be ignored.

[Link to this property](#)

service_auth_401_redirect: optional boolean

Returns a 401 status code when the request is blocked by a Service Auth policy.

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

skip_interstitial: optional boolean

Enables automatic authentication through cloudflared.

[Link to this property](#)

tags: optional array of string

The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

[Link to this property](#)

use_clientless_isolation_app_launcher_url: optional boolean

Determines if users can access this application via a clientless browser isolation URL. This allows users to access private domains without connecting to Gateway. The option requires Clientless Browser Isolation to be set up with policies that allow users of this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McpServerApplication object { type, id, allow_authenticate_via_warp, 18 more }

</summary>

<details>

<summary>

type: [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allow_authenticate_via_warp: optional boolean

When set to true, users can authenticate to this application using their WARP session. When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

custom_deny_message: optional string

The custom error message shown to a user when they are denied access to the application.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

<details>

<summary>

destinations: optional array of object { type, uri } or object { cidr, hostname, l4_protocol, 3 more } or object { mcp_server_id, type } or 4 more

List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

</summary>

One of the following:

<details>

<summary>

PublicDestination object { type, uri }

A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard ’*’ can be used in the definition.

</summary>

type: optional "public"

[Link to this property](#)

uri: optional string

The URI of the destination. Public destinations’ URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrivateDestination object { cidr, hostname, l4_protocol, 3 more }

</summary>

cidr: optional string

The CIDR range of the destination. Single IPs will be computed as /32.

[Link to this property](#)

hostname: optional string

The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

[Link to this property](#)

<details>

<summary>

l4_protocol: optional "tcp" or "udp"

The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

</summary>

One of the following:

"tcp"

[Link to this property](#)

"udp"

[Link to this property](#)

</details>

[Link to this property](#)

port_range: optional string

The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

[Link to this property](#)

type: optional "private"

[Link to this property](#)

vnet_id: optional string

The VNET ID to match the destination. When omitted, all VNETs will match.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ViaMcpServerPortalDestination object { mcp_server_id, type }

A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

</summary>

mcp_server_id: optional string

The MCP server id configured in ai-controls.

[Link to this property](#)

type: optional "via_mcp_server_portal"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkerDestination object { type, worker_id }

A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker’s previews or specific paths.

</summary>

type: "worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PreviewWorkerDestination object { type, worker_id }

A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

</summary>

type: "preview_worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker whose preview deployments to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllWorkersDestination object { type }

Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_workers"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllPreviewWorkersDestination object { type }

Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_preview_workers"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

http_only_cookie_attribute: optional boolean

Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

[Link to this property](#)

logo_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

oauth_configuration: optional object { dynamic_client_registration, enabled, grant }

Beta: Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

</summary>

<details>

<summary>

dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }

Settings for OAuth dynamic client registration.

</summary>

allow_any_on_localhost: optional boolean

Allows any client with redirect URIs on localhost.

[Link to this property](#)

allow_any_on_loopback: optional boolean

Allows any client with redirect URIs on 127.0.0.1.

[Link to this property](#)

allowed_uris: optional array of string

The URIs that are allowed as redirect URIs for dynamically registered clients. HTTP and HTTPS paths may end in `/*` to match all sub-paths. Custom-scheme URIs must be explicitly configured and match exactly.

[Link to this property](#)

enabled: optional boolean

Whether dynamic client registration is enabled.

[Link to this property](#)

</details>

[Link to this property](#)

enabled: optional boolean

Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

[Link to this property](#)

<details>

<summary>

grant: optional object { access_token_lifetime, session_duration }

Settings for OAuth grant behavior.

</summary>

access_token_lifetime: optional string

The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

session_duration: optional string

The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

options_preflight_bypass: optional boolean

Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

same_site_cookie_attribute: optional string

Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

[Link to this property](#)

<details>

<summary>

scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }

Configuration for provisioning to this application via SCIM. This is currently in closed beta.

</summary>

idp_uid: string

The UID of the IdP to use as the source for SCIM resources to provision to this application.

[Link to this property](#)

remote_uri: string

The base URI for the application’s SCIM-compatible API.

[Link to this property](#)

<details>

<summary>

authentication: optional [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or 2 more

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigMultiAuthentication = array of [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or object { client_id, client_secret, scheme }

Multiple authentication schemes

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

deactivate_on_delete: optional boolean

If false, propagates DELETE requests to the target application for SCIM resources. If true, sets ‘active’ to false on the SCIM resource. Note: Some targets do not support DELETE operations.

[Link to this property](#)

enabled: optional boolean

Whether SCIM provisioning is turned on for this application.

[Link to this property](#)

<details>

<summary>

mappings: optional array of [SCIMConfigMapping](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_mapping%20%3E%20(schema)) { schema, enabled, filter, 3 more }

A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

</summary>

schema: string

Which SCIM resource type this mapping applies to.

[Link to this property](#)

enabled: optional boolean

Whether or not this mapping is enabled.

[Link to this property](#)

filter: optional string

A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

[Link to this property](#)

<details>

<summary>

operations: optional object { create, delete, update }

Whether or not this mapping applies to creates, updates, or deletes.

</summary>

create: optional boolean

Whether or not this mapping applies to create (POST) operations.

[Link to this property](#)

delete: optional boolean

Whether or not this mapping applies to DELETE operations.

[Link to this property](#)

update: optional boolean

Whether or not this mapping applies to update (PATCH/PUT) operations.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

strictness: optional "strict" or "passthrough"

The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

</summary>

One of the following:

"strict"

[Link to this property](#)

"passthrough"

[Link to this property](#)

</details>

[Link to this property](#)

transform_jsonata: optional string

A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

tags: optional array of string

The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McpServerPortalApplication object { type, id, allow_authenticate_via_warp, 19 more }

</summary>

<details>

<summary>

type: [ApplicationType](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20application_type%20%3E%20(schema))

The application type.

</summary>

One of the following:

"self_hosted"

[Link to this property](#)

"saas"

[Link to this property](#)

"ssh"

[Link to this property](#)

"vnc"

[Link to this property](#)

"app_launcher"

[Link to this property](#)

"warp"

[Link to this property](#)

"biso"

[Link to this property](#)

"bookmark"

[Link to this property](#)

"dash_sso"

[Link to this property](#)

"infrastructure"

[Link to this property](#)

"rdp"

[Link to this property](#)

"mcp"

[Link to this property](#)

"mcp_portal"

[Link to this property](#)

"proxy_endpoint"

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

UUID.

maxLength36

[Link to this property](#)

allow_authenticate_via_warp: optional boolean

When set to true, users can authenticate to this application using their WARP session. When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

[Link to this property](#)

allowed_idps: optional array of [AllowedIdPs](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20allowed_idps%20%3E%20(schema))

The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

[Link to this property](#)

aud: optional string

Audience tag.

maxLength64

[Link to this property](#)

auto_redirect_to_identity: optional boolean

When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

[Link to this property](#)

custom_deny_message: optional string

The custom error message shown to a user when they are denied access to the application.

[Link to this property](#)

custom_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

[Link to this property](#)

custom_non_identity_deny_url: optional string

The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

[Link to this property](#)

custom_pages: optional array of string

The custom pages that will be displayed when applicable for this application

[Link to this property](#)

<details>

<summary>

destinations: optional array of object { type, uri } or object { cidr, hostname, l4_protocol, 3 more } or object { mcp_server_id, type } or 4 more

List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

</summary>

One of the following:

<details>

<summary>

PublicDestination object { type, uri }

A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard ’*’ can be used in the definition.

</summary>

type: optional "public"

[Link to this property](#)

uri: optional string

The URI of the destination. Public destinations’ URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PrivateDestination object { cidr, hostname, l4_protocol, 3 more }

</summary>

cidr: optional string

The CIDR range of the destination. Single IPs will be computed as /32.

[Link to this property](#)

hostname: optional string

The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

[Link to this property](#)

<details>

<summary>

l4_protocol: optional "tcp" or "udp"

The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

</summary>

One of the following:

"tcp"

[Link to this property](#)

"udp"

[Link to this property](#)

</details>

[Link to this property](#)

port_range: optional string

The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

[Link to this property](#)

type: optional "private"

[Link to this property](#)

vnet_id: optional string

The VNET ID to match the destination. When omitted, all VNETs will match.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ViaMcpServerPortalDestination object { mcp_server_id, type }

A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

</summary>

mcp_server_id: optional string

The MCP server id configured in ai-controls.

[Link to this property](#)

type: optional "via_mcp_server_portal"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkerDestination object { type, worker_id }

A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker’s previews or specific paths.

</summary>

type: "worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PreviewWorkerDestination object { type, worker_id }

A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

</summary>

type: "preview_worker"

[Link to this property](#)

worker_id: string

The ID of the Cloudflare Worker whose preview deployments to protect with Access.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllWorkersDestination object { type }

Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_workers"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AllPreviewWorkersDestination object { type }

Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

</summary>

type: "all_preview_workers"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

domain: optional string

The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

[Link to this property](#)

http_only_cookie_attribute: optional boolean

Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

[Link to this property](#)

logo_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

[Link to this property](#)

name: optional string

The name of the application.

[Link to this property](#)

<details>

<summary>

oauth_configuration: optional object { dynamic_client_registration, enabled, grant }

Beta: Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

</summary>

<details>

<summary>

dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }

Settings for OAuth dynamic client registration.

</summary>

allow_any_on_localhost: optional boolean

Allows any client with redirect URIs on localhost.

[Link to this property](#)

allow_any_on_loopback: optional boolean

Allows any client with redirect URIs on 127.0.0.1.

[Link to this property](#)

allowed_uris: optional array of string

The URIs that are allowed as redirect URIs for dynamically registered clients. HTTP and HTTPS paths may end in `/*` to match all sub-paths. Custom-scheme URIs must be explicitly configured and match exactly.

[Link to this property](#)

enabled: optional boolean

Whether dynamic client registration is enabled.

[Link to this property](#)

</details>

[Link to this property](#)

enabled: optional boolean

Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

[Link to this property](#)

<details>

<summary>

grant: optional object { access_token_lifetime, session_duration }

Settings for OAuth grant behavior.

</summary>

access_token_lifetime: optional string

The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

session_duration: optional string

The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

options_preflight_bypass: optional boolean

Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

[Link to this property](#)

<details>

<summary>

policies: optional array of object { id, account_id, approval_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

[Link to this property](#)

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

<details>

<summary>

approval_groups: optional array of [ApprovalGroup](/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)) { approvals_needed, email_addresses, email_list_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals_needed: number

The number of approvals needed to obtain access.

minimum0

[Link to this property](#)

email_addresses: optional array of string

A list of emails that can approve the access request.

[Link to this property](#)

email_list_uuid: optional string

The UUID of an re-usable email list.

[Link to this property](#)

</details>

[Link to this property](#)

approval_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

[Link to this property](#)

<details>

<summary>

connection_rules: optional object { rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed_clipboard_local_to_remote_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

allowed_clipboard_remote_to_local_formats: optional array of "text" or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

[Link to this property](#)

"file"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

<details>

<summary>

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

[Link to this property](#)

"deny"

[Link to this property](#)

"non_identity"

[Link to this property](#)

"bypass"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exclude: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

include: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

isolation_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

[Link to this property](#)

<details>

<summary>

mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

[Link to this property](#)

"biometrics"

[Link to this property](#)

"security_key"

[Link to this property](#)

</details>

[Link to this property](#)

mfa_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

[Link to this property](#)

session_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

The name of the Access policy.

[Link to this property](#)

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

[Link to this property](#)

purpose_justification_prompt: optional string

A custom message that will appear on the purpose justification screen.

[Link to this property](#)

purpose_justification_required: optional boolean

Require users to enter a justification when they log in to the application.

[Link to this property](#)

<details>

<summary>

require: optional array of [AccessRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema))

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object { group }

Matches an Access group.

</summary>

<details>

<summary>

group: object { id }

</summary>

id: string

The ID of a previously created Access group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnyValidServiceTokenRule object { any_valid_service_token }

Matches any valid Access Service Token

</summary>

any_valid_service_token: object { }

An empty object which matches on all service tokens.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessAuthContextRule object { auth_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth_context: object { id, ac_id, identity_provider_id }

</summary>

id: string

The ID of an Authentication context.

[Link to this property](#)

ac_id: string

The ACID of an Authentication context.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AuthenticationMethodRule object { auth_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth_method: object { auth_method }

</summary>

auth_method: string

The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AzureGroupRule object { azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object { id, identity_provider_id }

</summary>

id: string

The ID of an Azure group.

[Link to this property](#)

identity_provider_id: string

The ID of your Azure identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CertificateRule object { certificate }

Matches any valid client certificate.

</summary>

certificate: object { }

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCommonNameRule object { common_name }

Matches a specific common name.

</summary>

<details>

<summary>

common_name: object { common_name }

</summary>

common_name: string

The common name to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CountryRule object { geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object { country_code }

</summary>

country_code: string

The country code that should be matched.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessDevicePostureRule object { device_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device_posture: object { integration_uid, account_id }

</summary>

integration_uid: string

The ID of a device posture integration.

[Link to this property](#)

account_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainRule object { email_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email_domain: object { domain }

</summary>

domain: string

The email domain to match.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailListRule object { email_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email_list: object { id }

</summary>

id: string

The ID of a previously created email list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EmailRule object { email }

Matches a specific email.

</summary>

<details>

<summary>

email: object { email }

</summary>

email: string

The email of the user.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

EveryoneRule object { everyone }

Matches everyone.

</summary>

everyone: object { }

An empty object which matches on all users.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ExternalEvaluationRule object { external_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external_evaluation: object { evaluate_url, keys_url }

</summary>

evaluate_url: string

The API endpoint containing your business logic.

[Link to this property](#)

keys_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GitHubOrganizationRule object { "github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object { identity_provider_id, name, team }

</summary>

identity_provider_id: string

The ID of your Github identity provider.

[Link to this property](#)

name: string

The name of the organization.

[Link to this property](#)

team: optional string

The name of the team

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

GSuiteGroupRule object { gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object { email, identity_provider_id }

</summary>

email: string

The email of the Google Workspace group.

[Link to this property](#)

identity_provider_id: string

The ID of your Google Workspace identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLoginMethodRule object { login_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login_method: object { id }

</summary>

id: string

The ID of an identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPListRule object { ip_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip_list: object { id }

</summary>

id: string

The ID of a previously created IP list.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

IPRule object { ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object { ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OktaGroupRule object { okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object { identity_provider_id, name }

</summary>

identity_provider_id: string

The ID of your Okta identity provider.

[Link to this property](#)

name: string

The name of the Okta group.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SAMLGroupRule object { saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object { attribute_name, attribute_value, identity_provider_id }

</summary>

attribute_name: string

The name of the SAML attribute.

[Link to this property](#)

attribute_value: string

The SAML attribute value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your SAML identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessOIDCClaimRule object { oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object { claim_name, claim_value, identity_provider_id }

</summary>

claim_name: string

The name of the OIDC claim.

[Link to this property](#)

claim_value: string

The OIDC claim value to look for.

[Link to this property](#)

identity_provider_id: string

The ID of your OIDC identity provider.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ServiceTokenRule object { service_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service_token: object { token_id }

</summary>

token_id: string

The ID of a Service Token.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessLinkedAppTokenRule object { linked_app_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

</summary>

<details>

<summary>

linked_app_token: object { app_uid }

</summary>

app_uid: string

The ID of an Access OIDC SaaS application

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessUserRiskScoreRule object { user_risk_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user_risk_score: object { user_risk_score }

</summary>

<details>

<summary>

user_risk_score: array of "low" or "medium" or "high" or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

[Link to this property](#)

"medium"

[Link to this property](#)

"high"

[Link to this property](#)

"unscored"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessCloudflareAccountMemberRule object { cloudflare_account_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare_account_member: object { account_id }

</summary>

account_id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

[Link to this property](#)

updated_at: optional string

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

same_site_cookie_attribute: optional string

Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

[Link to this property](#)

<details>

<summary>

scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }

Configuration for provisioning to this application via SCIM. This is currently in closed beta.

</summary>

idp_uid: string

The UID of the IdP to use as the source for SCIM resources to provision to this application.

[Link to this property](#)

remote_uri: string

The base URI for the application’s SCIM-compatible API.

[Link to this property](#)

<details>

<summary>

authentication: optional [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or 2 more

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigMultiAuthentication = array of [SCIMConfigAuthenticationHTTPBasic](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_http_basic%20%3E%20(schema)) { password, scheme, user } or [SCIMConfigAuthenticationOAuthBearerToken](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth_bearer_token%20%3E%20(schema)) { token, scheme } or [SCIMConfigAuthenticationOauth2](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_authentication_oauth2%20%3E%20(schema)) { authorization_url, client_id, client_secret, 3 more } or object { client_id, client_secret, scheme }

Multiple authentication schemes

</summary>

One of the following:

<details>

<summary>

SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }

Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

</summary>

password: string

Password used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "httpbasic"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

user: string

User name used to authenticate with the remote SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }

Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

</summary>

token: string

Token used to authenticate with the remote SCIM service.

[Link to this property](#)

scheme: "oauthbearertoken"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }

Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

</summary>

authorization_url: string

URL used to generate the auth code used during token generation.

[Link to this property](#)

client_id: string

Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

[Link to this property](#)

client_secret: string

Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

[Link to this property](#)

scheme: "oauth2"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

token_url: string

URL used to generate the token used to authenticate with the remote SCIM service.

[Link to this property](#)

scopes: optional array of string

The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }

Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

</summary>

client_id: string

Client ID of the Access service token used to authenticate with the remote service.

[Link to this property](#)

client_secret: string

Client secret of the Access service token used to authenticate with the remote service.

[Link to this property](#)

scheme: "access_service_token"

The authentication scheme to use when making SCIM requests to this application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

deactivate_on_delete: optional boolean

If false, propagates DELETE requests to the target application for SCIM resources. If true, sets ‘active’ to false on the SCIM resource. Note: Some targets do not support DELETE operations.

[Link to this property](#)

enabled: optional boolean

Whether SCIM provisioning is turned on for this application.

[Link to this property](#)

<details>

<summary>

mappings: optional array of [SCIMConfigMapping](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20scim_config_mapping%20%3E%20(schema)) { schema, enabled, filter, 3 more }

A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

</summary>

schema: string

Which SCIM resource type this mapping applies to.

[Link to this property](#)

enabled: optional boolean

Whether or not this mapping is enabled.

[Link to this property](#)

filter: optional string

A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

[Link to this property](#)

<details>

<summary>

operations: optional object { create, delete, update }

Whether or not this mapping applies to creates, updates, or deletes.

</summary>

create: optional boolean

Whether or not this mapping applies to create (POST) operations.

[Link to this property](#)

delete: optional boolean

Whether or not this mapping applies to DELETE operations.

[Link to this property](#)

update: optional boolean

Whether or not this mapping applies to update (PATCH/PUT) operations.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

strictness: optional "strict" or "passthrough"

The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

</summary>

One of the following:

"strict"

[Link to this property](#)

"passthrough"

[Link to this property](#)

</details>

[Link to this property](#)

transform_jsonata: optional string

A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_duration: optional string

The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

[Link to this property](#)

tags: optional array of string

The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

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
