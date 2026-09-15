---
title: List Access application policies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications)

[Policies](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Access application policies

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/policies

Lists Access policies configured for an application. Returns both exclusively scoped and reusable policies used by the application.

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

`Access: Apps and Policies Write``Access: Apps and Policies Read`

##### P ath ParametersExpand Collapse

app\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number of results.

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum1000

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, account\_id, approval\_groups, 15 more } or object {id, connection\_rules, created\_at, 7 more }

</summary>

One of the following:

<details>

<summary>

object {id, account\_id, approval\_groups, 15 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

<a href="#">Link to this property</a>

account\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

approval\_groups: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.policies%20%3E%20(model)%20approval_group%20%3E%20(schema)">ApprovalGroup</a> { approvals\_needed, email\_addresses, email\_list\_uuid }

Administrators who can approve a temporary authentication request.

</summary>

approvals\_needed: number

The number of approvals needed to obtain access.

minimum0

<a href="#">Link to this property</a>

email\_addresses: optional array of string

A list of emails that can approve the access request.

<a href="#">Link to this property</a>

email\_list\_uuid: optional string

The UUID of an re-usable email list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

approval\_required: optional boolean

Requires the user to request access from an administrator at the start of each session.

<a href="#">Link to this property</a>

<details>

<summary>

connection\_rules: optional object {rdp }

The rules that define how users may connect to targets secured by your application.

</summary>

<details>

<summary>

rdp: optional object {allowed\_clipboard\_local\_to\_remote\_formats, allowed\_clipboard\_remote\_to\_local\_formats }

The RDP-specific rules that define clipboard behavior for RDP connections.

</summary>

<details>

<summary>

allowed\_clipboard\_local\_to\_remote\_formats: optional array of "text"or "file"

Clipboard formats allowed when copying from local machine to remote RDP session.

</summary>

One of the following:

"text"

<a href="#">Link to this property</a>

"file"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_clipboard\_remote\_to\_local\_formats: optional array of "text"or "file"

Clipboard formats allowed when copying from remote RDP session to local machine.

</summary>

One of the following:

"text"

<a href="#">Link to this property</a>

"file"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

decision: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema)">Decision</a>

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

"non\_identity"

<a href="#">Link to this property</a>

"bypass"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

exclude: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object {group }

Matches an Access group.

</summary>

<details>

<summary>

group: object {id }

</summary>

id: string

The ID of a previously created Access group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AnyValidServiceTokenRule object {any\_valid\_service\_token }

Matches any valid Access Service Token

</summary>

any\_valid\_service\_token: object {}

An empty object which matches on all service tokens.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessAuthContextRule object {auth\_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth\_context: object {id, ac\_id, identity\_provider\_id }

</summary>

id: string

The ID of an Authentication context.

<a href="#">Link to this property</a>

ac\_id: string

The ACID of an Authentication context.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AuthenticationMethodRule object {auth\_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth\_method: object {auth\_method }

</summary>

auth\_method: string

The type of authentication method <a href="https://datatracker.ietf.org/doc/html/rfc8176#section-2">https://datatracker.ietf.org/doc/html/rfc8176#section-2</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AzureGroupRule object {azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object {id, identity\_provider\_id }

</summary>

id: string

The ID of an Azure group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CertificateRule object {certificate }

Matches any valid client certificate.

</summary>

certificate: object {}

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCommonNameRule object {common\_name }

Matches a specific common name.

</summary>

<details>

<summary>

common\_name: object {common\_name }

</summary>

common\_name: string

The common name to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CountryRule object {geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object {country\_code }

</summary>

country\_code: string

The country code that should be matched.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessDevicePostureRule object {device\_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device\_posture: object {integration\_uid, account\_id }

</summary>

integration\_uid: string

The ID of a device posture integration.

<a href="#">Link to this property</a>

account\_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DomainRule object {email\_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email\_domain: object {domain }

</summary>

domain: string

The email domain to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailListRule object {email\_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email\_list: object {id }

</summary>

id: string

The ID of a previously created email list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailRule object {email }

Matches a specific email.

</summary>

<details>

<summary>

email: object {email }

</summary>

email: string

The email of the user.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EveryoneRule object {everyone }

Matches everyone.

</summary>

everyone: object {}

An empty object which matches on all users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExternalEvaluationRule object {external\_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external\_evaluation: object {evaluate\_url, keys\_url }

</summary>

evaluate\_url: string

The API endpoint containing your business logic.

<a href="#">Link to this property</a>

keys\_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GitHubOrganizationRule object {"github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object {identity\_provider\_id, name, team }

</summary>

identity\_provider\_id: string

The ID of your Github identity provider.

<a href="#">Link to this property</a>

name: string

The name of the organization.

<a href="#">Link to this property</a>

team: optional string

The name of the team

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GSuiteGroupRule object {gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object {email, identity\_provider\_id }

</summary>

email: string

The email of the Google Workspace group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Google Workspace identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLoginMethodRule object {login\_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login\_method: object {id }

</summary>

id: string

The ID of an identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPListRule object {ip\_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip\_list: object {id }

</summary>

id: string

The ID of a previously created IP list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPRule object {ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object {ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OktaGroupRule object {okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object {identity\_provider\_id, name }

</summary>

identity\_provider\_id: string

The ID of your Okta identity provider.

<a href="#">Link to this property</a>

name: string

The name of the Okta group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SAMLGroupRule object {saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object {attribute\_name, attribute\_value, identity\_provider\_id }

</summary>

attribute\_name: string

The name of the SAML attribute.

<a href="#">Link to this property</a>

attribute\_value: string

The SAML attribute value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your SAML identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOIDCClaimRule object {oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object {claim\_name, claim\_value, identity\_provider\_id }

</summary>

claim\_name: string

The name of the OIDC claim.

<a href="#">Link to this property</a>

claim\_value: string

The OIDC claim value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your OIDC identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ServiceTokenRule object {service\_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service\_token: object {token\_id }

</summary>

token\_id: string

The ID of a Service Token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLinkedAppTokenRule object {linked\_app\_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non\_identity and bypass decisions.

</summary>

<details>

<summary>

linked\_app\_token: object {app\_uid }

</summary>

app\_uid: string

The ID of an Access OIDC SaaS application

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessUserRiskScoreRule object {user\_risk\_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user\_risk\_score: object {user\_risk\_score }

</summary>

<details>

<summary>

user\_risk\_score: array of "low"or "medium"or "high"or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"unscored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCloudflareAccountMemberRule object {cloudflare\_account\_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare\_account\_member: object {account\_id }

</summary>

account\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object {group }

Matches an Access group.

</summary>

<details>

<summary>

group: object {id }

</summary>

id: string

The ID of a previously created Access group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AnyValidServiceTokenRule object {any\_valid\_service\_token }

Matches any valid Access Service Token

</summary>

any\_valid\_service\_token: object {}

An empty object which matches on all service tokens.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessAuthContextRule object {auth\_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth\_context: object {id, ac\_id, identity\_provider\_id }

</summary>

id: string

The ID of an Authentication context.

<a href="#">Link to this property</a>

ac\_id: string

The ACID of an Authentication context.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AuthenticationMethodRule object {auth\_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth\_method: object {auth\_method }

</summary>

auth\_method: string

The type of authentication method <a href="https://datatracker.ietf.org/doc/html/rfc8176#section-2">https://datatracker.ietf.org/doc/html/rfc8176#section-2</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AzureGroupRule object {azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object {id, identity\_provider\_id }

</summary>

id: string

The ID of an Azure group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CertificateRule object {certificate }

Matches any valid client certificate.

</summary>

certificate: object {}

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCommonNameRule object {common\_name }

Matches a specific common name.

</summary>

<details>

<summary>

common\_name: object {common\_name }

</summary>

common\_name: string

The common name to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CountryRule object {geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object {country\_code }

</summary>

country\_code: string

The country code that should be matched.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessDevicePostureRule object {device\_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device\_posture: object {integration\_uid, account\_id }

</summary>

integration\_uid: string

The ID of a device posture integration.

<a href="#">Link to this property</a>

account\_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DomainRule object {email\_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email\_domain: object {domain }

</summary>

domain: string

The email domain to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailListRule object {email\_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email\_list: object {id }

</summary>

id: string

The ID of a previously created email list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailRule object {email }

Matches a specific email.

</summary>

<details>

<summary>

email: object {email }

</summary>

email: string

The email of the user.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EveryoneRule object {everyone }

Matches everyone.

</summary>

everyone: object {}

An empty object which matches on all users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExternalEvaluationRule object {external\_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external\_evaluation: object {evaluate\_url, keys\_url }

</summary>

evaluate\_url: string

The API endpoint containing your business logic.

<a href="#">Link to this property</a>

keys\_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GitHubOrganizationRule object {"github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object {identity\_provider\_id, name, team }

</summary>

identity\_provider\_id: string

The ID of your Github identity provider.

<a href="#">Link to this property</a>

name: string

The name of the organization.

<a href="#">Link to this property</a>

team: optional string

The name of the team

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GSuiteGroupRule object {gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object {email, identity\_provider\_id }

</summary>

email: string

The email of the Google Workspace group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Google Workspace identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLoginMethodRule object {login\_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login\_method: object {id }

</summary>

id: string

The ID of an identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPListRule object {ip\_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip\_list: object {id }

</summary>

id: string

The ID of a previously created IP list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPRule object {ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object {ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OktaGroupRule object {okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object {identity\_provider\_id, name }

</summary>

identity\_provider\_id: string

The ID of your Okta identity provider.

<a href="#">Link to this property</a>

name: string

The name of the Okta group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SAMLGroupRule object {saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object {attribute\_name, attribute\_value, identity\_provider\_id }

</summary>

attribute\_name: string

The name of the SAML attribute.

<a href="#">Link to this property</a>

attribute\_value: string

The SAML attribute value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your SAML identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOIDCClaimRule object {oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object {claim\_name, claim\_value, identity\_provider\_id }

</summary>

claim\_name: string

The name of the OIDC claim.

<a href="#">Link to this property</a>

claim\_value: string

The OIDC claim value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your OIDC identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ServiceTokenRule object {service\_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service\_token: object {token\_id }

</summary>

token\_id: string

The ID of a Service Token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLinkedAppTokenRule object {linked\_app\_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non\_identity and bypass decisions.

</summary>

<details>

<summary>

linked\_app\_token: object {app\_uid }

</summary>

app\_uid: string

The ID of an Access OIDC SaaS application

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessUserRiskScoreRule object {user\_risk\_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user\_risk\_score: object {user\_risk\_score }

</summary>

<details>

<summary>

user\_risk\_score: array of "low"or "medium"or "high"or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"unscored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCloudflareAccountMemberRule object {cloudflare\_account\_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare\_account\_member: object {account\_id }

</summary>

account\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isolation\_required: optional boolean

Require this application to be served in an isolated browser for users matching this policy. ‘Client Web Isolation’ must be on for the account in order to use this feature.

<a href="#">Link to this property</a>

<details>

<summary>

mfa\_config: optional object {allowed\_authenticators, mfa\_disabled, session\_duration }

Configures multi-factor authentication (MFA) settings.

</summary>

<details>

<summary>

allowed\_authenticators: optional array of "totp"or "biometrics"or "security\_key"

Lists the MFA methods that users can authenticate with.

</summary>

One of the following:

"totp"

<a href="#">Link to this property</a>

"biometrics"

<a href="#">Link to this property</a>

"security\_key"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mfa\_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

<a href="#">Link to this property</a>

session\_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:<code>5m</code> or <code>24h</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

The name of the Access policy.

<a href="#">Link to this property</a>

precedence: optional number

The order of execution for this policy. Must be unique for each policy within an app.

<a href="#">Link to this property</a>

purpose\_justification\_prompt: optional string

A custom message that will appear on the purpose justification screen.

<a href="#">Link to this property</a>

purpose\_justification\_required: optional boolean

Require users to enter a justification when they log in to the application.

<a href="#">Link to this property</a>

<details>

<summary>

require: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object {group }

Matches an Access group.

</summary>

<details>

<summary>

group: object {id }

</summary>

id: string

The ID of a previously created Access group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AnyValidServiceTokenRule object {any\_valid\_service\_token }

Matches any valid Access Service Token

</summary>

any\_valid\_service\_token: object {}

An empty object which matches on all service tokens.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessAuthContextRule object {auth\_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth\_context: object {id, ac\_id, identity\_provider\_id }

</summary>

id: string

The ID of an Authentication context.

<a href="#">Link to this property</a>

ac\_id: string

The ACID of an Authentication context.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AuthenticationMethodRule object {auth\_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth\_method: object {auth\_method }

</summary>

auth\_method: string

The type of authentication method <a href="https://datatracker.ietf.org/doc/html/rfc8176#section-2">https://datatracker.ietf.org/doc/html/rfc8176#section-2</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AzureGroupRule object {azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object {id, identity\_provider\_id }

</summary>

id: string

The ID of an Azure group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CertificateRule object {certificate }

Matches any valid client certificate.

</summary>

certificate: object {}

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCommonNameRule object {common\_name }

Matches a specific common name.

</summary>

<details>

<summary>

common\_name: object {common\_name }

</summary>

common\_name: string

The common name to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CountryRule object {geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object {country\_code }

</summary>

country\_code: string

The country code that should be matched.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessDevicePostureRule object {device\_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device\_posture: object {integration\_uid, account\_id }

</summary>

integration\_uid: string

The ID of a device posture integration.

<a href="#">Link to this property</a>

account\_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DomainRule object {email\_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email\_domain: object {domain }

</summary>

domain: string

The email domain to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailListRule object {email\_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email\_list: object {id }

</summary>

id: string

The ID of a previously created email list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailRule object {email }

Matches a specific email.

</summary>

<details>

<summary>

email: object {email }

</summary>

email: string

The email of the user.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EveryoneRule object {everyone }

Matches everyone.

</summary>

everyone: object {}

An empty object which matches on all users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExternalEvaluationRule object {external\_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external\_evaluation: object {evaluate\_url, keys\_url }

</summary>

evaluate\_url: string

The API endpoint containing your business logic.

<a href="#">Link to this property</a>

keys\_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GitHubOrganizationRule object {"github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object {identity\_provider\_id, name, team }

</summary>

identity\_provider\_id: string

The ID of your Github identity provider.

<a href="#">Link to this property</a>

name: string

The name of the organization.

<a href="#">Link to this property</a>

team: optional string

The name of the team

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GSuiteGroupRule object {gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object {email, identity\_provider\_id }

</summary>

email: string

The email of the Google Workspace group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Google Workspace identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLoginMethodRule object {login\_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login\_method: object {id }

</summary>

id: string

The ID of an identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPListRule object {ip\_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip\_list: object {id }

</summary>

id: string

The ID of a previously created IP list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPRule object {ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object {ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OktaGroupRule object {okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object {identity\_provider\_id, name }

</summary>

identity\_provider\_id: string

The ID of your Okta identity provider.

<a href="#">Link to this property</a>

name: string

The name of the Okta group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SAMLGroupRule object {saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object {attribute\_name, attribute\_value, identity\_provider\_id }

</summary>

attribute\_name: string

The name of the SAML attribute.

<a href="#">Link to this property</a>

attribute\_value: string

The SAML attribute value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your SAML identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOIDCClaimRule object {oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object {claim\_name, claim\_value, identity\_provider\_id }

</summary>

claim\_name: string

The name of the OIDC claim.

<a href="#">Link to this property</a>

claim\_value: string

The OIDC claim value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your OIDC identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ServiceTokenRule object {service\_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service\_token: object {token\_id }

</summary>

token\_id: string

The ID of a Service Token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLinkedAppTokenRule object {linked\_app\_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non\_identity and bypass decisions.

</summary>

<details>

<summary>

linked\_app\_token: object {app\_uid }

</summary>

app\_uid: string

The ID of an Access OIDC SaaS application

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessUserRiskScoreRule object {user\_risk\_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user\_risk\_score: object {user\_risk\_score }

</summary>

<details>

<summary>

user\_risk\_score: array of "low"or "medium"or "high"or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"unscored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCloudflareAccountMemberRule object {cloudflare\_account\_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare\_account\_member: object {account\_id }

</summary>

account\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_duration: optional string

The amount of time that tokens issued for the application will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>. Valid time units are: ns, us (or µs), ms, s, m, h.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, connection\_rules, created\_at, 7 more }

</summary>

id: optional string

The UUID of the policy

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

connection\_rules: optional object {ssh }

The rules that define how users may connect to the targets secured by your application.

</summary>

<details>

<summary>

ssh: optional object {usernames, allow\_email\_alias }

The SSH-specific rules that define how users may connect to the targets secured by your application.

</summary>

usernames: array of string

Contains the Unix usernames that may be used when connecting over SSH.

<a href="#">Link to this property</a>

allow\_email\_alias: optional boolean

Enables using Identity Provider email alias as SSH username.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

decision: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications%20%3E%20(model)%20decision%20%3E%20(schema)">Decision</a>

The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

"non\_identity"

<a href="#">Link to this property</a>

"bypass"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

exclude: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object {group }

Matches an Access group.

</summary>

<details>

<summary>

group: object {id }

</summary>

id: string

The ID of a previously created Access group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AnyValidServiceTokenRule object {any\_valid\_service\_token }

Matches any valid Access Service Token

</summary>

any\_valid\_service\_token: object {}

An empty object which matches on all service tokens.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessAuthContextRule object {auth\_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth\_context: object {id, ac\_id, identity\_provider\_id }

</summary>

id: string

The ID of an Authentication context.

<a href="#">Link to this property</a>

ac\_id: string

The ACID of an Authentication context.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AuthenticationMethodRule object {auth\_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth\_method: object {auth\_method }

</summary>

auth\_method: string

The type of authentication method <a href="https://datatracker.ietf.org/doc/html/rfc8176#section-2">https://datatracker.ietf.org/doc/html/rfc8176#section-2</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AzureGroupRule object {azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object {id, identity\_provider\_id }

</summary>

id: string

The ID of an Azure group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CertificateRule object {certificate }

Matches any valid client certificate.

</summary>

certificate: object {}

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCommonNameRule object {common\_name }

Matches a specific common name.

</summary>

<details>

<summary>

common\_name: object {common\_name }

</summary>

common\_name: string

The common name to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CountryRule object {geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object {country\_code }

</summary>

country\_code: string

The country code that should be matched.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessDevicePostureRule object {device\_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device\_posture: object {integration\_uid, account\_id }

</summary>

integration\_uid: string

The ID of a device posture integration.

<a href="#">Link to this property</a>

account\_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DomainRule object {email\_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email\_domain: object {domain }

</summary>

domain: string

The email domain to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailListRule object {email\_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email\_list: object {id }

</summary>

id: string

The ID of a previously created email list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailRule object {email }

Matches a specific email.

</summary>

<details>

<summary>

email: object {email }

</summary>

email: string

The email of the user.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EveryoneRule object {everyone }

Matches everyone.

</summary>

everyone: object {}

An empty object which matches on all users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExternalEvaluationRule object {external\_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external\_evaluation: object {evaluate\_url, keys\_url }

</summary>

evaluate\_url: string

The API endpoint containing your business logic.

<a href="#">Link to this property</a>

keys\_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GitHubOrganizationRule object {"github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object {identity\_provider\_id, name, team }

</summary>

identity\_provider\_id: string

The ID of your Github identity provider.

<a href="#">Link to this property</a>

name: string

The name of the organization.

<a href="#">Link to this property</a>

team: optional string

The name of the team

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GSuiteGroupRule object {gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object {email, identity\_provider\_id }

</summary>

email: string

The email of the Google Workspace group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Google Workspace identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLoginMethodRule object {login\_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login\_method: object {id }

</summary>

id: string

The ID of an identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPListRule object {ip\_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip\_list: object {id }

</summary>

id: string

The ID of a previously created IP list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPRule object {ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object {ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OktaGroupRule object {okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object {identity\_provider\_id, name }

</summary>

identity\_provider\_id: string

The ID of your Okta identity provider.

<a href="#">Link to this property</a>

name: string

The name of the Okta group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SAMLGroupRule object {saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object {attribute\_name, attribute\_value, identity\_provider\_id }

</summary>

attribute\_name: string

The name of the SAML attribute.

<a href="#">Link to this property</a>

attribute\_value: string

The SAML attribute value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your SAML identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOIDCClaimRule object {oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object {claim\_name, claim\_value, identity\_provider\_id }

</summary>

claim\_name: string

The name of the OIDC claim.

<a href="#">Link to this property</a>

claim\_value: string

The OIDC claim value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your OIDC identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ServiceTokenRule object {service\_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service\_token: object {token\_id }

</summary>

token\_id: string

The ID of a Service Token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLinkedAppTokenRule object {linked\_app\_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non\_identity and bypass decisions.

</summary>

<details>

<summary>

linked\_app\_token: object {app\_uid }

</summary>

app\_uid: string

The ID of an Access OIDC SaaS application

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessUserRiskScoreRule object {user\_risk\_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user\_risk\_score: object {user\_risk\_score }

</summary>

<details>

<summary>

user\_risk\_score: array of "low"or "medium"or "high"or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"unscored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCloudflareAccountMemberRule object {cloudflare\_account\_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare\_account\_member: object {account\_id }

</summary>

account\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object {group }

Matches an Access group.

</summary>

<details>

<summary>

group: object {id }

</summary>

id: string

The ID of a previously created Access group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AnyValidServiceTokenRule object {any\_valid\_service\_token }

Matches any valid Access Service Token

</summary>

any\_valid\_service\_token: object {}

An empty object which matches on all service tokens.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessAuthContextRule object {auth\_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth\_context: object {id, ac\_id, identity\_provider\_id }

</summary>

id: string

The ID of an Authentication context.

<a href="#">Link to this property</a>

ac\_id: string

The ACID of an Authentication context.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AuthenticationMethodRule object {auth\_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth\_method: object {auth\_method }

</summary>

auth\_method: string

The type of authentication method <a href="https://datatracker.ietf.org/doc/html/rfc8176#section-2">https://datatracker.ietf.org/doc/html/rfc8176#section-2</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AzureGroupRule object {azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object {id, identity\_provider\_id }

</summary>

id: string

The ID of an Azure group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CertificateRule object {certificate }

Matches any valid client certificate.

</summary>

certificate: object {}

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCommonNameRule object {common\_name }

Matches a specific common name.

</summary>

<details>

<summary>

common\_name: object {common\_name }

</summary>

common\_name: string

The common name to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CountryRule object {geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object {country\_code }

</summary>

country\_code: string

The country code that should be matched.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessDevicePostureRule object {device\_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device\_posture: object {integration\_uid, account\_id }

</summary>

integration\_uid: string

The ID of a device posture integration.

<a href="#">Link to this property</a>

account\_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DomainRule object {email\_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email\_domain: object {domain }

</summary>

domain: string

The email domain to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailListRule object {email\_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email\_list: object {id }

</summary>

id: string

The ID of a previously created email list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailRule object {email }

Matches a specific email.

</summary>

<details>

<summary>

email: object {email }

</summary>

email: string

The email of the user.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EveryoneRule object {everyone }

Matches everyone.

</summary>

everyone: object {}

An empty object which matches on all users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExternalEvaluationRule object {external\_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external\_evaluation: object {evaluate\_url, keys\_url }

</summary>

evaluate\_url: string

The API endpoint containing your business logic.

<a href="#">Link to this property</a>

keys\_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GitHubOrganizationRule object {"github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object {identity\_provider\_id, name, team }

</summary>

identity\_provider\_id: string

The ID of your Github identity provider.

<a href="#">Link to this property</a>

name: string

The name of the organization.

<a href="#">Link to this property</a>

team: optional string

The name of the team

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GSuiteGroupRule object {gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object {email, identity\_provider\_id }

</summary>

email: string

The email of the Google Workspace group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Google Workspace identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLoginMethodRule object {login\_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login\_method: object {id }

</summary>

id: string

The ID of an identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPListRule object {ip\_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip\_list: object {id }

</summary>

id: string

The ID of a previously created IP list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPRule object {ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object {ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OktaGroupRule object {okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object {identity\_provider\_id, name }

</summary>

identity\_provider\_id: string

The ID of your Okta identity provider.

<a href="#">Link to this property</a>

name: string

The name of the Okta group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SAMLGroupRule object {saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object {attribute\_name, attribute\_value, identity\_provider\_id }

</summary>

attribute\_name: string

The name of the SAML attribute.

<a href="#">Link to this property</a>

attribute\_value: string

The SAML attribute value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your SAML identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOIDCClaimRule object {oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object {claim\_name, claim\_value, identity\_provider\_id }

</summary>

claim\_name: string

The name of the OIDC claim.

<a href="#">Link to this property</a>

claim\_value: string

The OIDC claim value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your OIDC identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ServiceTokenRule object {service\_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service\_token: object {token\_id }

</summary>

token\_id: string

The ID of a Service Token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLinkedAppTokenRule object {linked\_app\_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non\_identity and bypass decisions.

</summary>

<details>

<summary>

linked\_app\_token: object {app\_uid }

</summary>

app\_uid: string

The ID of an Access OIDC SaaS application

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessUserRiskScoreRule object {user\_risk\_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user\_risk\_score: object {user\_risk\_score }

</summary>

<details>

<summary>

user\_risk\_score: array of "low"or "medium"or "high"or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"unscored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCloudflareAccountMemberRule object {cloudflare\_account\_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare\_account\_member: object {account\_id }

</summary>

account\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mfa\_config: optional object {allowed\_authenticators, mfa\_disabled, session\_duration }

Configures multi-factor authentication (MFA) settings for infrastructure applications.

</summary>

<details>

<summary>

allowed\_authenticators: optional array of "piv\_key"or "ssh\_fido2\_key"

Lists the MFA methods that users can authenticate with. For infrastructure applications, supported values are <code>piv_key</code> and <code>ssh_fido2_key</code>.

</summary>

One of the following:

"piv\_key"

<a href="#">Link to this property</a>

"ssh\_fido2\_key"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mfa\_disabled: optional boolean

Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

<a href="#">Link to this property</a>

session\_duration: optional string

Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples: <code>5m</code> or <code>24h</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

The name of the Access policy.

<a href="#">Link to this property</a>

<details>

<summary>

require: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

</summary>

One of the following:

<details>

<summary>

GroupRule object {group }

Matches an Access group.

</summary>

<details>

<summary>

group: object {id }

</summary>

id: string

The ID of a previously created Access group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AnyValidServiceTokenRule object {any\_valid\_service\_token }

Matches any valid Access Service Token

</summary>

any\_valid\_service\_token: object {}

An empty object which matches on all service tokens.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessAuthContextRule object {auth\_context }

Matches an Azure Authentication Context. Requires an Azure identity provider.

</summary>

<details>

<summary>

auth\_context: object {id, ac\_id, identity\_provider\_id }

</summary>

id: string

The ID of an Authentication context.

<a href="#">Link to this property</a>

ac\_id: string

The ACID of an Authentication context.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AuthenticationMethodRule object {auth\_method }

Enforce different MFA options

</summary>

<details>

<summary>

auth\_method: object {auth\_method }

</summary>

auth\_method: string

The type of authentication method <a href="https://datatracker.ietf.org/doc/html/rfc8176#section-2">https://datatracker.ietf.org/doc/html/rfc8176#section-2</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AzureGroupRule object {azureAD }

Matches an Azure group. Requires an Azure identity provider.

</summary>

<details>

<summary>

azureAD: object {id, identity\_provider\_id }

</summary>

id: string

The ID of an Azure group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Azure identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CertificateRule object {certificate }

Matches any valid client certificate.

</summary>

certificate: object {}

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCommonNameRule object {common\_name }

Matches a specific common name.

</summary>

<details>

<summary>

common\_name: object {common\_name }

</summary>

common\_name: string

The common name to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CountryRule object {geo }

Matches a specific country

</summary>

<details>

<summary>

geo: object {country\_code }

</summary>

country\_code: string

The country code that should be matched.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessDevicePostureRule object {device\_posture }

Enforces a device posture rule has run successfully

</summary>

<details>

<summary>

device\_posture: object {integration\_uid, account\_id }

</summary>

integration\_uid: string

The ID of a device posture integration.

<a href="#">Link to this property</a>

account\_id: optional string

The ID of the account that owns the device posture integration.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DomainRule object {email\_domain }

Match an entire email domain.

</summary>

<details>

<summary>

email\_domain: object {domain }

</summary>

domain: string

The email domain to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailListRule object {email\_list }

Matches an email address from a list.

</summary>

<details>

<summary>

email\_list: object {id }

</summary>

id: string

The ID of a previously created email list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EmailRule object {email }

Matches a specific email.

</summary>

<details>

<summary>

email: object {email }

</summary>

email: string

The email of the user.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

EveryoneRule object {everyone }

Matches everyone.

</summary>

everyone: object {}

An empty object which matches on all users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ExternalEvaluationRule object {external\_evaluation }

Create Allow or Block policies which evaluate the user based on custom criteria.

</summary>

<details>

<summary>

external\_evaluation: object {evaluate\_url, keys\_url }

</summary>

evaluate\_url: string

The API endpoint containing your business logic.

<a href="#">Link to this property</a>

keys\_url: string

The API endpoint containing the key that Access uses to verify that the response came from your API.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GitHubOrganizationRule object {"github-organization" }

Matches a Github organization. Requires a Github identity provider.

</summary>

<details>

<summary>

"github-organization": object {identity\_provider\_id, name, team }

</summary>

identity\_provider\_id: string

The ID of your Github identity provider.

<a href="#">Link to this property</a>

name: string

The name of the organization.

<a href="#">Link to this property</a>

team: optional string

The name of the team

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GSuiteGroupRule object {gsuite }

Matches a group in Google Workspace. Requires a Google Workspace identity provider.

</summary>

<details>

<summary>

gsuite: object {email, identity\_provider\_id }

</summary>

email: string

The email of the Google Workspace group.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your Google Workspace identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLoginMethodRule object {login\_method }

Matches a specific identity provider id.

</summary>

<details>

<summary>

login\_method: object {id }

</summary>

id: string

The ID of an identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPListRule object {ip\_list }

Matches an IP address from a list.

</summary>

<details>

<summary>

ip\_list: object {id }

</summary>

id: string

The ID of a previously created IP list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPRule object {ip }

Matches an IP address block.

</summary>

<details>

<summary>

ip: object {ip }

</summary>

ip: string

An IPv4 or IPv6 CIDR block.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OktaGroupRule object {okta }

Matches an Okta group. Requires an Okta identity provider.

</summary>

<details>

<summary>

okta: object {identity\_provider\_id, name }

</summary>

identity\_provider\_id: string

The ID of your Okta identity provider.

<a href="#">Link to this property</a>

name: string

The name of the Okta group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SAMLGroupRule object {saml }

Matches a SAML group. Requires a SAML identity provider.

</summary>

<details>

<summary>

saml: object {attribute\_name, attribute\_value, identity\_provider\_id }

</summary>

attribute\_name: string

The name of the SAML attribute.

<a href="#">Link to this property</a>

attribute\_value: string

The SAML attribute value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your SAML identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessOIDCClaimRule object {oidc }

Matches an OIDC claim. Requires an OIDC identity provider.

</summary>

<details>

<summary>

oidc: object {claim\_name, claim\_value, identity\_provider\_id }

</summary>

claim\_name: string

The name of the OIDC claim.

<a href="#">Link to this property</a>

claim\_value: string

The OIDC claim value to look for.

<a href="#">Link to this property</a>

identity\_provider\_id: string

The ID of your OIDC identity provider.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ServiceTokenRule object {service\_token }

Matches a specific Access Service Token

</summary>

<details>

<summary>

service\_token: object {token\_id }

</summary>

token\_id: string

The ID of a Service Token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessLinkedAppTokenRule object {linked\_app\_token }

Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non\_identity and bypass decisions.

</summary>

<details>

<summary>

linked\_app\_token: object {app\_uid }

</summary>

app\_uid: string

The ID of an Access OIDC SaaS application

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessUserRiskScoreRule object {user\_risk\_score }

Matches a user’s risk score.

</summary>

<details>

<summary>

user\_risk\_score: object {user\_risk\_score }

</summary>

<details>

<summary>

user\_risk\_score: array of "low"or "medium"or "high"or "unscored"

A list of risk score levels to match. Values can be low, medium, high, or unscored.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"unscored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessCloudflareAccountMemberRule object {cloudflare\_account\_member }

Matches users who are members of a specific Cloudflare account. Requires a Cloudflare identity provider.

</summary>

<details>

<summary>

cloudflare\_account\_member: object {account\_id }

</summary>

account\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Access application policies

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/apps/$APP_ID/policies \
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "approval_groups": [
        {
          "approvals_needed": 1,
          "email_addresses": [
            "test1@cloudflare.com",
            "test2@cloudflare.com"
          ],
          "email_list_uuid": "email_list_uuid"
        },
        {
          "approvals_needed": 3,
          "email_addresses": [
            "test@cloudflare.com",
            "test2@cloudflare.com"
          ],
          "email_list_uuid": "597147a1-976b-4ef2-9af0-81d5d007fc34"
        }
      ],
      "approval_required": true,
      "connection_rules": {
        "rdp": {
          "allowed_clipboard_local_to_remote_formats": [
            "text",
            "file"
          ],
          "allowed_clipboard_remote_to_local_formats": [
            "text",
            "file"
          ]
        }
      },
      "created_at": "2014-01-01T05:20:00.12345Z",
      "decision": "allow",
      "exclude": [
        {
          "certificate": {}
        }
      ],
      "include": [
        {
          "certificate": {}
        }
      ],
      "isolation_required": false,
      "mfa_config": {
        "allowed_authenticators": [
          "totp",
          "biometrics",
          "security_key"
        ],
        "mfa_disabled": false,
        "session_duration": "24h"
      },
      "name": "Allow devs",
      "precedence": 0,
      "purpose_justification_prompt": "Please enter a justification for entering this protected domain.",
      "purpose_justification_required": true,
      "require": [
        {
          "certificate": {}
        }
      ],
      "session_duration": "24h",
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "approval_groups": [
        {
          "approvals_needed": 1,
          "email_addresses": [
            "test1@cloudflare.com",
            "test2@cloudflare.com"
          ],
          "email_list_uuid": "email_list_uuid"
        },
        {
          "approvals_needed": 3,
          "email_addresses": [
            "test@cloudflare.com",
            "test2@cloudflare.com"
          ],
          "email_list_uuid": "597147a1-976b-4ef2-9af0-81d5d007fc34"
        }
      ],
      "approval_required": true,
      "connection_rules": {
        "rdp": {
          "allowed_clipboard_local_to_remote_formats": [
            "text",
            "file"
          ],
          "allowed_clipboard_remote_to_local_formats": [
            "text",
            "file"
          ]
        }
      },
      "created_at": "2014-01-01T05:20:00.12345Z",
      "decision": "allow",
      "exclude": [
        {
          "certificate": {}
        }
      ],
      "include": [
        {
          "certificate": {}
        }
      ],
      "isolation_required": false,
      "mfa_config": {
        "allowed_authenticators": [
          "totp",
          "biometrics",
          "security_key"
        ],
        "mfa_disabled": false,
        "session_duration": "24h"
      },
      "name": "Allow devs",
      "precedence": 0,
      "purpose_justification_prompt": "Please enter a justification for entering this protected domain.",
      "purpose_justification_required": true,
      "require": [
        {
          "certificate": {}
        }
      ],
      "session_duration": "24h",
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```