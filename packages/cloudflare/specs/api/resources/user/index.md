---
title: User
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# User

##### [User Details](https://developers.cloudflare.com/api/resources/user/methods/get)

GET/user

##### [Edit User](https://developers.cloudflare.com/api/resources/user/methods/edit)

PATCH/user

##### ModelsExpand Collapse

<details>

<summary>

UserGetResponse object {id, email, betas, 12 more }

</summary>

id: string

Identifier of the user.

<a href="#">Link to this property</a>

email: string

Current email address of the user.

formatemail

<a href="#">Link to this property</a>

betas: optional array of string

Lists the betas that the user is participating in.

<a href="#">Link to this property</a>

country: optional string

The country in which the user lives.

maxLength30

<a href="#">Link to this property</a>

first\_name: optional string

User’s first name

maxLength60

<a href="#">Link to this property</a>

has\_business\_zones: optional boolean

Indicates whether user has any business zones

<a href="#">Link to this property</a>

has\_enterprise\_zones: optional boolean

Indicates whether user has any enterprise zones

<a href="#">Link to this property</a>

has\_pro\_zones: optional boolean

Indicates whether user has any pro zones

<a href="#">Link to this property</a>

last\_name: optional string

User’s last name

maxLength60

<a href="#">Link to this property</a>

<details>

<summary>

organizations: optional array of <a href="https://developers.cloudflare.com/api/resources/user#(resource)%20user.organizations%20%3E%20(model)%20organization%20%3E%20(schema)">Organization</a> { id, name, permissions, 2 more }

</summary>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

name: optional string

Organization name.

maxLength100

<a href="#">Link to this property</a>

permissions: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission%20%3E%20(schema)">Permission</a>

Access permissions for this User.

<a href="#">Link to this property</a>

roles: optional array of string

List of roles that a user has within an organization.

<a href="#">Link to this property</a>

status: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts.members%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Whether the user is a member of the organization or has an invitation pending.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suspended: optional boolean

Indicates whether user has been suspended

<a href="#">Link to this property</a>

telephone: optional string

User’s telephone number

maxLength20

<a href="#">Link to this property</a>

two\_factor\_authentication\_enabled: optional boolean

Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

<a href="#">Link to this property</a>

two\_factor\_authentication\_locked: optional boolean

Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.

<a href="#">Link to this property</a>

zipcode: optional string

The zipcode or postal code where the user lives.

maxLength20

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user%20%3E%20(model)%20user_get_response%20%3E%20(schema)>)

<details>

<summary>

UserEditResponse object {id, email, betas, 12 more }

</summary>

id: string

Identifier of the user.

<a href="#">Link to this property</a>

email: string

Current email address of the user.

formatemail

<a href="#">Link to this property</a>

betas: optional array of string

Lists the betas that the user is participating in.

<a href="#">Link to this property</a>

country: optional string

The country in which the user lives.

maxLength30

<a href="#">Link to this property</a>

first\_name: optional string

User’s first name

maxLength60

<a href="#">Link to this property</a>

has\_business\_zones: optional boolean

Indicates whether user has any business zones

<a href="#">Link to this property</a>

has\_enterprise\_zones: optional boolean

Indicates whether user has any enterprise zones

<a href="#">Link to this property</a>

has\_pro\_zones: optional boolean

Indicates whether user has any pro zones

<a href="#">Link to this property</a>

last\_name: optional string

User’s last name

maxLength60

<a href="#">Link to this property</a>

<details>

<summary>

organizations: optional array of <a href="https://developers.cloudflare.com/api/resources/user#(resource)%20user.organizations%20%3E%20(model)%20organization%20%3E%20(schema)">Organization</a> { id, name, permissions, 2 more }

</summary>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

name: optional string

Organization name.

maxLength100

<a href="#">Link to this property</a>

permissions: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission%20%3E%20(schema)">Permission</a>

Access permissions for this User.

<a href="#">Link to this property</a>

roles: optional array of string

List of roles that a user has within an organization.

<a href="#">Link to this property</a>

status: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts.members%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Whether the user is a member of the organization or has an invitation pending.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suspended: optional boolean

Indicates whether user has been suspended

<a href="#">Link to this property</a>

telephone: optional string

User’s telephone number

maxLength20

<a href="#">Link to this property</a>

two\_factor\_authentication\_enabled: optional boolean

Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

<a href="#">Link to this property</a>

two\_factor\_authentication\_locked: optional boolean

Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.

<a href="#">Link to this property</a>

zipcode: optional string

The zipcode or postal code where the user lives.

maxLength20

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user%20%3E%20(model)%20user_edit_response%20%3E%20(schema)>)

#### UserAudit Logs

##### [Get user audit logs](https://developers.cloudflare.com/api/resources/user/subresources/audit_logs/methods/list)

GET/user/audit\_logs

#### UserBilling

#### UserBillingHistory

##### [Billing History Details](https://developers.cloudflare.com/api/resources/user/subresources/billing/subresources/history/methods/list)

Deprecated

GET/user/billing/history

##### ModelsExpand Collapse

<details>

<summary>

BillingHistory object {id, action, amount, 5 more }

</summary>

id: string

Billing item identifier tag.

maxLength32

<a href="#">Link to this property</a>

action: string

The billing item action.

maxLength30

<a href="#">Link to this property</a>

amount: number

The amount associated with this billing item.

<a href="#">Link to this property</a>

currency: string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

description: string

The billing item description.

maxLength255

<a href="#">Link to this property</a>

occurred\_at: string

When the billing item was created.

formatdate-time

<a href="#">Link to this property</a>

type: string

The billing item type.

maxLength30

<a href="#">Link to this property</a>

<details>

<summary>

zone: object {name }

</summary>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.billing.history%20%3E%20(model)%20billing_history%20%3E%20(schema)>)

#### UserBillingProfile

##### [Billing Profile Details](https://developers.cloudflare.com/api/resources/user/subresources/billing/subresources/profile/methods/get)

Deprecated

GET/user/billing/profile

##### ModelsExpand Collapse

<details>

<summary>

ProfileGetResponse object {id, account\_type, address, 35 more }

</summary>

id: optional string

Billing item identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_type: optional string

<a href="#">Link to this property</a>

address: optional string

<a href="#">Link to this property</a>

address2: optional string

<a href="#">Link to this property</a>

balance: optional string

<a href="#">Link to this property</a>

card\_expiry\_month: optional number

<a href="#">Link to this property</a>

card\_expiry\_year: optional number

<a href="#">Link to this property</a>

card\_number: optional string

<a href="#">Link to this property</a>

city: optional string

<a href="#">Link to this property</a>

company: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

device\_data: optional string

<a href="#">Link to this property</a>

edited\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

enterprise\_billing\_email: optional string

<a href="#">Link to this property</a>

enterprise\_primary\_email: optional string

<a href="#">Link to this property</a>

first\_name: optional string

<a href="#">Link to this property</a>

is\_partner: optional boolean

<a href="#">Link to this property</a>

last\_name: optional string

<a href="#">Link to this property</a>

next\_bill\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

payment\_address: optional string

<a href="#">Link to this property</a>

payment\_address2: optional string

<a href="#">Link to this property</a>

payment\_city: optional string

<a href="#">Link to this property</a>

payment\_country: optional string

<a href="#">Link to this property</a>

payment\_email: optional string

<a href="#">Link to this property</a>

payment\_first\_name: optional string

<a href="#">Link to this property</a>

payment\_gateway: optional string

<a href="#">Link to this property</a>

payment\_last\_name: optional string

<a href="#">Link to this property</a>

payment\_nonce: optional string

<a href="#">Link to this property</a>

payment\_state: optional string

<a href="#">Link to this property</a>

payment\_zipcode: optional string

<a href="#">Link to this property</a>

primary\_email: optional string

<a href="#">Link to this property</a>

state: optional string

<a href="#">Link to this property</a>

tax\_id\_type: optional string

<a href="#">Link to this property</a>

telephone: optional string

<a href="#">Link to this property</a>

validation\_code: optional string

<a href="#">Link to this property</a>

vat: optional string

<a href="#">Link to this property</a>

zipcode: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.billing.profile%20%3E%20(model)%20profile_get_response%20%3E%20(schema)>)

#### UserInvites

##### [List Invitations](https://developers.cloudflare.com/api/resources/user/subresources/invites/methods/list)

GET/user/invites

##### [Invitation Details](https://developers.cloudflare.com/api/resources/user/subresources/invites/methods/get)

GET/user/invites/{invite\_id}

##### [Respond to Invitation](https://developers.cloudflare.com/api/resources/user/subresources/invites/methods/edit)

PATCH/user/invites/{invite\_id}

##### ModelsExpand Collapse

<details>

<summary>

Invite object {invited\_member\_id, organization\_id, id, 8 more }

</summary>

invited\_member\_id: string

ID of the user to add to the organization.

maxLength32

<a href="#">Link to this property</a>

organization\_id: string

ID of the organization the user will be added to.

maxLength32

<a href="#">Link to this property</a>

id: optional string

Invite identifier tag.

maxLength32

<a href="#">Link to this property</a>

expires\_on: optional string

When the invite is no longer active.

formatdate-time

<a href="#">Link to this property</a>

invited\_by: optional string

The email address of the user who created the invite.

maxLength90

<a href="#">Link to this property</a>

invited\_member\_email: optional string

Email address of the user to add to the organization.

maxLength90

<a href="#">Link to this property</a>

invited\_on: optional string

When the invite was sent.

formatdate-time

<a href="#">Link to this property</a>

organization\_is\_enforcing\_twofactor: optional boolean

<a href="#">Link to this property</a>

organization\_name: optional string

Organization name.

maxLength100

<a href="#">Link to this property</a>

roles: optional array of string

List of role names the membership has for this account.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "pending"or "accepted"or "rejected"or "expired"

Current status of the invitation.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"accepted"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.invites%20%3E%20(model)%20invite%20%3E%20(schema)>)

#### UserOrganizations

##### [List Organizations](https://developers.cloudflare.com/api/resources/user/subresources/organizations/methods/list)

Deprecated

GET/user/organizations

##### [Organization Details](https://developers.cloudflare.com/api/resources/user/subresources/organizations/methods/get)

Deprecated

GET/user/organizations/{organization\_id}

##### [Leave Organization](https://developers.cloudflare.com/api/resources/user/subresources/organizations/methods/delete)

Deprecated

DELETE/user/organizations/{organization\_id}

##### ModelsExpand Collapse

<details>

<summary>

Organization object {id, name, permissions, 2 more }

</summary>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

name: optional string

Organization name.

maxLength100

<a href="#">Link to this property</a>

permissions: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission%20%3E%20(schema)">Permission</a>

Access permissions for this User.

<a href="#">Link to this property</a>

roles: optional array of string

List of roles that a user has within an organization.

<a href="#">Link to this property</a>

status: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts.members%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Whether the user is a member of the organization or has an invitation pending.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.organizations%20%3E%20(model)%20organization%20%3E%20(schema)>)

OrganizationGetResponse = unknown

[Link to this property](#)%20user.organizations%20%3E%20(model)%20organization_get_response%20%3E%20(schema)>)

<details>

<summary>

OrganizationDeleteResponse object {id }

</summary>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.organizations%20%3E%20(model)%20organization_delete_response%20%3E%20(schema)>)

#### UserSpectrum Analytics

#### UserSpectrum AnalyticsZones

#### UserSpectrum AnalyticsZonesReports

##### [Get zones bandwidth report](https://developers.cloudflare.com/api/resources/user/subresources/spectrum_analytics/subresources/zones/subresources/reports/methods/get)

GET/user/spectrum\_analytics/zones/report

##### ModelsExpand Collapse

<details>

<summary>

ReportGetResponse = array of object {totals, zone\_id }

</summary>

<details>

<summary>

totals: object {bandwidth }

</summary>

<details>

<summary>

bandwidth: object {all, egress, ingress }

</summary>

all: number

Sum of ingress and egress bytes transferred.

<a href="#">Link to this property</a>

egress: number

Sum of egress bytes transferred.

<a href="#">Link to this property</a>

ingress: number

Sum of ingress bytes transferred.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(model)%20report_get_response%20%3E%20(schema)>)

#### UserSubscriptions

##### [Get User Subscriptions](https://developers.cloudflare.com/api/resources/user/subresources/subscriptions/methods/get)

GET/user/subscriptions

##### [Update User Subscription](https://developers.cloudflare.com/api/resources/user/subresources/subscriptions/methods/update)

PUT/user/subscriptions/{identifier}

##### [Delete User Subscription](https://developers.cloudflare.com/api/resources/user/subresources/subscriptions/methods/delete)

DELETE/user/subscriptions/{identifier}

##### ModelsExpand Collapse

<details>

<summary>

SubscriptionUpdateResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.subscriptions%20%3E%20(model)%20subscription_update_response%20%3E%20(schema)>)

<details>

<summary>

SubscriptionDeleteResponse object {subscription\_id }

</summary>

subscription\_id: optional string

Subscription identifier tag.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.subscriptions%20%3E%20(model)%20subscription_delete_response%20%3E%20(schema)>)

#### UserTenants

##### [List user tenants](https://developers.cloudflare.com/api/resources/user/subresources/tenants/methods/list)

GET/user/tenants

#### UserTokens

##### [List Tokens](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/list)

GET/user/tokens

##### [Token Details](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/get)

GET/user/tokens/{token\_id}

##### [Create Token](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/create)

POST/user/tokens

##### [Update Token](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/update)

PUT/user/tokens/{token\_id}

##### [Delete Token](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/delete)

DELETE/user/tokens/{token\_id}

##### [Verify Token](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/verify)

GET/user/tokens/verify

##### ModelsExpand Collapse

<details>

<summary>

TokenCreateResponse object {id, condition, expires\_on, 8 more }

</summary>

id: optional string

Token identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

condition: optional object {request\_ip }

</summary>

<details>

<summary>

request\_ip: optional object {in, not\_in }

Client IP restrictions.

</summary>

in: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token_condition_cidr_list%20%3E%20(schema)">TokenConditionCIDRList</a>

List of IPv4/IPv6 CIDR addresses.

<a href="#">Link to this property</a>

not\_in: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token_condition_cidr_list%20%3E%20(schema)">TokenConditionCIDRList</a>

List of IPv4/IPv6 CIDR addresses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The expiration time on or after which the JWT MUST NOT be accepted for processing.

formatdate-time

<a href="#">Link to this property</a>

issued\_on: optional string

The time on which the token was created.

formatdate-time

<a href="#">Link to this property</a>

last\_used\_on: optional string

Last time the token was used.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Last time the token was modified.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Token name.

maxLength120

<a href="#">Link to this property</a>

not\_before: optional string

The time before which the token MUST NOT be accepted for processing.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token_policy%20%3E%20(schema)">TokenPolicy</a> { id, effect, permission\_groups, resources }

List of access policies assigned to the token.

</summary>

id: string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

effect: "allow"or "deny"

Allow or deny operations against the resources.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

permission\_groups: array of object {id, meta, name }

A set of permission groups that are specified to the policy.

</summary>

id: string

Identifier of the permission group.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the permission group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the permission group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resources: map\[string]or map\[map\[string]]

A list of resource names that the policy applies to.

</summary>

One of the following:

IAMResourcesTypeObjectString = map\[string]

Map of simple string resource permissions

<a href="#">Link to this property</a>

IAMResourcesTypeObjectNested = map\[map\[string]]

Map of nested resource permissions

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "disabled"or "expired"

Status of the token.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token_value%20%3E%20(schema)">TokenValue</a>

The token value.

maxLength80

minLength40

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.tokens%20%3E%20(model)%20token_create_response%20%3E%20(schema)>)

<details>

<summary>

TokenDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.tokens%20%3E%20(model)%20token_delete_response%20%3E%20(schema)>)

<details>

<summary>

TokenVerifyResponse object {id, status, expires\_on, not\_before }

</summary>

id: string

Token identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "disabled"or "expired"

Status of the token.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The expiration time on or after which the JWT MUST NOT be accepted for processing.

formatdate-time

<a href="#">Link to this property</a>

not\_before: optional string

The time before which the token MUST NOT be accepted for processing.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.tokens%20%3E%20(model)%20token_verify_response%20%3E%20(schema)>)

#### UserTokensPermission Groups

##### [List Token Permission Groups](https://developers.cloudflare.com/api/resources/user/subresources/tokens/subresources/permission_groups/methods/list)

GET/user/tokens/permission\_groups

##### ModelsExpand Collapse

<details>

<summary>

PermissionGroupListResponse object {id, category, name, scopes }

</summary>

id: optional string

Public ID.

<a href="#">Link to this property</a>

<details>

<summary>

category: optional "developer\_platform"or "ai\_and\_machine\_learning"or "dns\_and\_zones"or 10 more

Product category that this permission group belongs to.

</summary>

One of the following:

"developer\_platform"

<a href="#">Link to this property</a>

"ai\_and\_machine\_learning"

<a href="#">Link to this property</a>

"dns\_and\_zones"

<a href="#">Link to this property</a>

"app\_security"

<a href="#">Link to this property</a>

"rules\_and\_configuration"

<a href="#">Link to this property</a>

"cloudflare\_one\_and\_zero\_trust"

<a href="#">Link to this property</a>

"analytics\_and\_logs"

<a href="#">Link to this property</a>

"network\_services"

<a href="#">Link to this property</a>

"media"

<a href="#">Link to this property</a>

"email\_and\_messaging"

<a href="#">Link to this property</a>

"cache\_and\_performance"

<a href="#">Link to this property</a>

"account\_and\_billing"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Permission Group Name

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "com.cloudflare.api.account"or "com.cloudflare.api.account.zone"or "com.cloudflare.api.user"or "com.cloudflare.edge.r2.bucket"

Resources to which the Permission Group is scoped

</summary>

One of the following:

"com.cloudflare.api.account"

<a href="#">Link to this property</a>

"com.cloudflare.api.account.zone"

<a href="#">Link to this property</a>

"com.cloudflare.api.user"

<a href="#">Link to this property</a>

"com.cloudflare.edge.r2.bucket"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.tokens.permission_groups%20%3E%20(model)%20permission_group_list_response%20%3E%20(schema)>)

#### UserTokensValue

##### [Roll Token](https://developers.cloudflare.com/api/resources/user/subresources/tokens/subresources/value/methods/update)

PUT/user/tokens/{token\_id}/value