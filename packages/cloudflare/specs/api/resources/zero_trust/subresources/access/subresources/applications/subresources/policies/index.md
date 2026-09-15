##### [List Access application policies](/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policies/methods/list)

GET/{accounts_or_zones}/{account_or_zone_id}/access/apps/{app_id}/policies

##### [Get an Access application policy](/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policies/methods/get)

GET/{accounts_or_zones}/{account_or_zone_id}/access/apps/{app_id}/policies/{policy_id}

##### [Create an Access application policy](/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policies/methods/create)

POST/{accounts_or_zones}/{account_or_zone_id}/access/apps/{app_id}/policies

##### [Update an Access application policy](/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policies/methods/update)

PUT/{accounts_or_zones}/{account_or_zone_id}/access/apps/{app_id}/policies/{policy_id}

##### [Delete an Access application policy](/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policies/methods/delete)

DELETE/{accounts_or_zones}/{account_or_zone_id}/access/apps/{app_id}/policies/{policy_id}

##### Models

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

AccessRule = [GroupRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20group_rule%20%3E%20(schema)) { group } or [AnyValidServiceTokenRule](/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20any_valid_service_token_rule%20%3E%20(schema)) { any_valid_service_token } or object { auth_context } or 23 more

Matches an Access group.

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

PolicyListResponse = object { id, account_id, approval_groups, 15 more } or object { id, connection_rules, created_at, 7 more }

</summary>

One of the following:

<details>

<summary>

object { id, account_id, approval_groups, 15 more }

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

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

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

object { id, connection_rules, created_at, 7 more }

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

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

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

PolicyGetResponse = object { id, account_id, approval_groups, 15 more } or object { id, connection_rules, created_at, 7 more }

</summary>

One of the following:

<details>

<summary>

object { id, account_id, approval_groups, 15 more }

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

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

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

object { id, connection_rules, created_at, 7 more }

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

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

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

PolicyCreateResponse = object { id, account_id, approval_groups, 15 more } or object { id, connection_rules, created_at, 7 more }

</summary>

One of the following:

<details>

<summary>

object { id, account_id, approval_groups, 15 more }

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

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

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

object { id, connection_rules, created_at, 7 more }

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

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

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

PolicyUpdateResponse = object { id, account_id, approval_groups, 15 more } or object { id, connection_rules, created_at, 7 more }

</summary>

One of the following:

<details>

<summary>

object { id, account_id, approval_groups, 15 more }

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

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

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

object { id, connection_rules, created_at, 7 more }

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

decision: optional [Decision](/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema))

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

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

PolicyDeleteResponse object { id }

</summary>

id: optional string

UUID.

maxLength36

[Link to this property](#)

</details>

[Link to this property](#)
