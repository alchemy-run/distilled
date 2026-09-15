---
title: Shared
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Shared

##### ModelsExpand Collapse

ASN = number

[Link to this property](#)%20%24shared%20%3E%20(model)%20asn%20%3E%20(schema)>)

<details>

<summary>

AuditLog object {id, action, actor, 7 more }

</summary>

id: optional string

A string that uniquely identifies the audit log.

<a href="#">Link to this property</a>

<details>

<summary>

action: optional object {result, type }

</summary>

result: optional boolean

A boolean that indicates if the action attempted was successful.

<a href="#">Link to this property</a>

type: optional string

A short string that describes the action that was performed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

actor: optional object {id, email, ip, type }

</summary>

id: optional string

The ID of the actor that performed the action. If a user performed the action, this will be their User ID.

<a href="#">Link to this property</a>

email: optional string

The email of the user that performed the action.

formatemail

<a href="#">Link to this property</a>

ip: optional string

The IP address of the request that performed the action.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "user"or "admin"or "Cloudflare"

The type of actor, whether a User, Cloudflare Admin, or an Automated System.

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"admin"

<a href="#">Link to this property</a>

"Cloudflare"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface: optional string

The source of the event.

<a href="#">Link to this property</a>

metadata: optional unknown

An object which can lend more context to the action being logged. This is a flexible value and varies between different actions.

<a href="#">Link to this property</a>

newValue: optional string

The new value of the resource that was modified.

<a href="#">Link to this property</a>

oldValue: optional string

The value of the resource before it was modified.

<a href="#">Link to this property</a>

<details>

<summary>

owner: optional object {id }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource: optional object {id, type }

</summary>

id: optional string

An identifier for the resource that was affected by the action.

<a href="#">Link to this property</a>

type: optional string

A short string that describes the resource that was affected by the action.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

when: optional string

A UTC RFC3339 timestamp that specifies when the action being logged occured.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20audit_log%20%3E%20(schema)>)

<details>

<summary>

CertificateCA = "digicert"or "google"or "lets\_encrypt"or "ssl\_com"

The Certificate Authority that will issue the certificate.

</summary>

One of the following:

"digicert"

<a href="#">Link to this property</a>

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20certificate_ca%20%3E%20(schema)>)

<details>

<summary>

CertificateRequestType = "origin-rsa"or "origin-ecc"or "keyless-certificate"

Signature type desired on certificate (“origin-rsa” (rsa), “origin-ecc” (ecdsa), or “keyless-certificate” (for Keyless SSL servers).

</summary>

One of the following:

"origin-rsa"

<a href="#">Link to this property</a>

"origin-ecc"

<a href="#">Link to this property</a>

"keyless-certificate"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20certificate_request_type%20%3E%20(schema)>)

<details>

<summary>

CloudflareTunnel object {id, account\_tag, config\_src, 10 more }

A Cloudflare Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

config\_src: optional "local"or "cloudflare"

Indicates if this is a locally or remotely configured tunnel. If <code>local</code>, manage the tunnel using a YAML file on the origin machine. If <code>cloudflare</code>, manage the tunnel on the Zero Trust dashboard.

</summary>

One of the following:

"local"

<a href="#">Link to this property</a>

"cloudflare"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

The Cloudflare Tunnel connections between your origin and Cloudflare’s edge.

</summary>

id: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

client\_id: optional string

UUID of the Cloudflare Tunnel connector.

formatuuid

maxLength36

<a href="#">Link to this property</a>

client\_version: optional string

The cloudflared version used to establish this connection.

<a href="#">Link to this property</a>

colo\_name: optional string

The Cloudflare data center used for this connection.

<a href="#">Link to this property</a>

Deprecatedis\_pending\_reconnect: optional boolean

This functionality has been removed. The is\_pending\_reconnect field will now always report false.

Cloudflare continues to track connections for several minutes after they disconnect. This is an optimization to improve latency and reliability of reconnecting. If <code>true</code>, the connection has disconnected but is still being tracked. If <code>false</code>, the connection is actively serving traffic.

<a href="#">Link to this property</a>

opened\_at: optional string

Timestamp of when the connection was established.

formatdate-time

<a href="#">Link to this property</a>

origin\_ip: optional string

The public IP address of the host running cloudflared.

<a href="#">Link to this property</a>

uuid: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

Deprecatedremote\_config: optional boolean

Use the config\_src field instead.

If <code>true</code>, the tunnel can be configured remotely from the Zero Trust dashboard. If <code>false</code>, the tunnel must be configured locally on the origin machine.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20cloudflare_tunnel%20%3E%20(schema)>)

<details>

<summary>

ErrorData object {code, documentation\_url, message, source }

</summary>

code: optional number

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

message: optional string

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

[Link to this property](#)%20%24shared%20%3E%20(model)%20error_data%20%3E%20(schema)>)

<details>

<summary>

Identifier object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20identifier%20%3E%20(schema)>)

<details>

<summary>

LoadBalancerPreview object {pools, preview\_id }

</summary>

pools: optional map\[string]

Monitored pool IDs mapped to their respective names.

<a href="#">Link to this property</a>

preview\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20load_balancer_preview%20%3E%20(schema)>)

<details>

<summary>

Member object {id, email, policies, 3 more }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of object {id, access, permission\_groups, resource\_groups }

Access policy for the membership

</summary>

id: optional string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

access: optional "allow"or "deny"

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

permission\_groups: optional array of object {id, meta, name }

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

resource\_groups: optional array of object {id, scope, meta, name }

A list of resource groups that the policy applies to.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

roles: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20role%20%3E%20(schema)">Role</a> { id, description, name, permissions }

Roles assigned to this Member.

</summary>

id: string

Role identifier tag.

maxLength32

<a href="#">Link to this property</a>

description: string

Description of role’s permissions.

<a href="#">Link to this property</a>

name: string

Role name.

maxLength120

<a href="#">Link to this property</a>

<details>

<summary>

permissions: object {analytics, billing, cache\_purge, 9 more }

</summary>

analytics: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

billing: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

cache\_purge: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns\_records: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

lb: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

logs: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

organization: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

ssl: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

waf: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zone\_settings: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zones: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"

A member’s status in the account.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user: optional object {email, id, first\_name, 2 more }

Details of the user associated to the membership.

</summary>

email: string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

first\_name: optional string

User’s first name

maxLength60

<a href="#">Link to this property</a>

last\_name: optional string

User’s last name

maxLength60

<a href="#">Link to this property</a>

two\_factor\_authentication\_enabled: optional boolean

Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20member%20%3E%20(schema)>)

<details>

<summary>

PaginationInfo object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20pagination_info%20%3E%20(schema)>)

Permission = string

[Link to this property](#)%20%24shared%20%3E%20(model)%20permission%20%3E%20(schema)>)

<details>

<summary>

PermissionGrant object {read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)>)

<details>

<summary>

RatePlan object {id, currency, externally\_managed, 4 more }

The rate plan applied to the subscription.

</summary>

<details>

<summary>

id: optional "free"or "lite"or "pro"or 7 more

The ID of the rate plan.

</summary>

One of the following:

"free"

<a href="#">Link to this property</a>

"lite"

<a href="#">Link to this property</a>

"pro"

<a href="#">Link to this property</a>

"pro\_plus"

<a href="#">Link to this property</a>

"business"

<a href="#">Link to this property</a>

"enterprise"

<a href="#">Link to this property</a>

"partners\_free"

<a href="#">Link to this property</a>

"partners\_pro"

<a href="#">Link to this property</a>

"partners\_business"

<a href="#">Link to this property</a>

"partners\_enterprise"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

currency: optional string

The currency applied to the rate plan subscription.

<a href="#">Link to this property</a>

externally\_managed: optional boolean

Whether this rate plan is managed externally from Cloudflare.

<a href="#">Link to this property</a>

is\_contract: optional boolean

Whether a rate plan is enterprise-based (or newly adopted term contract).

<a href="#">Link to this property</a>

public\_name: optional string

The full name of the rate plan.

<a href="#">Link to this property</a>

scope: optional string

The scope that this rate plan applies to.

<a href="#">Link to this property</a>

sets: optional array of string

The list of sets this rate plan applies to. Returns array of strings.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)>)

<details>

<summary>

ResponseInfo object {code, message, documentation\_url, source }

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

[Link to this property](#)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)>)

<details>

<summary>

Result = object {errors, messages, result, success } or object {errors, messages, success }

</summary>

One of the following:

<details>

<summary>

object {errors, messages, result, success }

</summary>

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

<a href="#">Link to this property</a>

<details>

<summary>

messages: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

<a href="#">Link to this property</a>

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20audit_log%20%3E%20(schema)">AuditLog</a> { id, action, actor, 7 more }

</summary>

id: optional string

A string that uniquely identifies the audit log.

<a href="#">Link to this property</a>

<details>

<summary>

action: optional object {result, type }

</summary>

result: optional boolean

A boolean that indicates if the action attempted was successful.

<a href="#">Link to this property</a>

type: optional string

A short string that describes the action that was performed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

actor: optional object {id, email, ip, type }

</summary>

id: optional string

The ID of the actor that performed the action. If a user performed the action, this will be their User ID.

<a href="#">Link to this property</a>

email: optional string

The email of the user that performed the action.

formatemail

<a href="#">Link to this property</a>

ip: optional string

The IP address of the request that performed the action.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "user"or "admin"or "Cloudflare"

The type of actor, whether a User, Cloudflare Admin, or an Automated System.

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"admin"

<a href="#">Link to this property</a>

"Cloudflare"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface: optional string

The source of the event.

<a href="#">Link to this property</a>

metadata: optional unknown

An object which can lend more context to the action being logged. This is a flexible value and varies between different actions.

<a href="#">Link to this property</a>

newValue: optional string

The new value of the resource that was modified.

<a href="#">Link to this property</a>

oldValue: optional string

The value of the resource before it was modified.

<a href="#">Link to this property</a>

<details>

<summary>

owner: optional object {id }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource: optional object {id, type }

</summary>

id: optional string

An identifier for the resource that was affected by the action.

<a href="#">Link to this property</a>

type: optional string

A short string that describes the resource that was affected by the action.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

when: optional string

A UTC RFC3339 timestamp that specifies when the action being logged occured.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AaaAPIResponseCommon object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20result%20%3E%20(schema)>)

<details>

<summary>

Role object {id, description, name, permissions }

</summary>

id: string

Role identifier tag.

maxLength32

<a href="#">Link to this property</a>

description: string

Description of role’s permissions.

<a href="#">Link to this property</a>

name: string

Role name.

maxLength120

<a href="#">Link to this property</a>

<details>

<summary>

permissions: object {analytics, billing, cache\_purge, 9 more }

</summary>

analytics: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

billing: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

cache\_purge: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns\_records: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

lb: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

logs: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

organization: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

ssl: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

waf: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zone\_settings: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zones: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20role%20%3E%20(schema)>)

<details>

<summary>

SortDirection = "asc"or "desc"

Direction to order DNS records in.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20sort_direction%20%3E%20(schema)>)

<details>

<summary>

Subscription object {id, currency, current\_period\_end, 5 more }

</summary>

id: optional string

Subscription identifier tag.

maxLength32

<a href="#">Link to this property</a>

currency: optional string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

current\_period\_end: optional string

The end of the current period and also when the next billing is due.

formatdate-time

<a href="#">Link to this property</a>

current\_period\_start: optional string

When the current billing period started. May match initial\_period\_start if this is the first period.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

frequency: optional "weekly"or "monthly"or "quarterly"or "yearly"

How often the subscription is renewed automatically.

</summary>

One of the following:

"weekly"

<a href="#">Link to this property</a>

"monthly"

<a href="#">Link to this property</a>

"quarterly"

<a href="#">Link to this property</a>

"yearly"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

price: optional number

The price of the subscription that will be billed, in US dollars.

<a href="#">Link to this property</a>

rate\_plan: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)">RatePlan</a> { id, currency, externally\_managed, 4 more }

The rate plan applied to the subscription.

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "Trial"or "Provisioned"or "Paid"or 4 more

The state that the subscription is in.

</summary>

One of the following:

"Trial"

<a href="#">Link to this property</a>

"Provisioned"

<a href="#">Link to this property</a>

"Paid"

<a href="#">Link to this property</a>

"AwaitingPayment"

<a href="#">Link to this property</a>

"Cancelled"

<a href="#">Link to this property</a>

"Failed"

<a href="#">Link to this property</a>

"Expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20subscription%20%3E%20(schema)>)

<details>

<summary>

SubscriptionComponent object {default, display\_name, kind, 3 more }

A component value for a subscription.

</summary>

default: optional number

The default amount assigned.

<a href="#">Link to this property</a>

display\_name: optional string

A human-readable version of the component name.

<a href="#">Link to this property</a>

<details>

<summary>

kind: optional "enum"or "sum"or "usage"

The type of component value. “enum” for discrete values (including boolean on/off toggles where 0=off and 1=on), “sum” for countable quantities, “usage” for metered billing components.

</summary>

One of the following:

"enum"

<a href="#">Link to this property</a>

"sum"

<a href="#">Link to this property</a>

"usage"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

The name of the component value.

<a href="#">Link to this property</a>

price: optional number

The unit price for the component value.

<a href="#">Link to this property</a>

value: optional number

The amount of the component value assigned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20subscription_component%20%3E%20(schema)>)

<details>

<summary>

SubscriptionZone object {id, name }

A simple zone object. May have null properties if not a zone subscription.

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

name: optional string

The domain name

maxLength253

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20subscription_zone%20%3E%20(schema)>)

<details>

<summary>

Token object {id, condition, expires\_on, 7 more }

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

</details>

[Link to this property](#)%20%24shared%20%3E%20(model)%20token%20%3E%20(schema)>)

TokenConditionCIDRList = string

IPv4/IPv6 CIDR.

[Link to this property](#)%20%24shared%20%3E%20(model)%20token_condition_cidr_list%20%3E%20(schema)>)

<details>

<summary>

TokenPolicy object {id, effect, permission\_groups, resources }

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

[Link to this property](#)%20%24shared%20%3E%20(model)%20token_policy%20%3E%20(schema)>)

TokenValue = string

The token value.

[Link to this property](#)%20%24shared%20%3E%20(model)%20token_value%20%3E%20(schema)>)