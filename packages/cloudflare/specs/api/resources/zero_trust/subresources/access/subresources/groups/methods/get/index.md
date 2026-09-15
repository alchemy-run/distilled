---
title: Get an Access group
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Groups](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/groups)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get an Access group

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/groups/{group\_id}

Fetches a single Access group.

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

`Access: Organizations, Identity Providers, and Groups Write``Access: Organizations, Identity Providers, and Groups Read`

##### P ath ParametersExpand Collapse

group\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.access.groups%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20group_id%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20zero_trust.access.groups%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20zero_trust.access.groups%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.groups%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.groups%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.groups%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, exclude, include, 3 more }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

exclude: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with a NOT logical operator. To match a policy, a user cannot meet any of the Exclude rules.

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

is\_default: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with an AND logical operator. To match a policy, a user must meet all of the Require rules.

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

name: optional string

The name of the Access group.

<a href="#">Link to this property</a>

<details>

<summary>

require: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.applications.policies%20%3E%20(model)%20access_rule%20%3E%20(schema)">AccessRule</a>

Rules evaluated with an AND logical operator. To match a policy, a user must meet all of the Require rules.

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

</details>

[Link to this property](#)%20zero_trust.access.groups%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get an Access group

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/groups/$GROUP_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
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
    "is_default": [
      {
        "certificate": {}
      }
    ],
    "name": "Allow devs",
    "require": [
      {
        "certificate": {}
      }
    ],
    "updated_at": "2014-01-01T05:20:00.12345Z"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
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
    "is_default": [
      {
        "certificate": {}
      }
    ],
    "name": "Allow devs",
    "require": [
      {
        "certificate": {}
      }
    ],
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```