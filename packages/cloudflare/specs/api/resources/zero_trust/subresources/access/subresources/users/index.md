---
title: Users
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Users

##### [Get users](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/methods/list)

GET/accounts/{account\_id}/access/users

##### [Get a user](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/methods/get)

GET/accounts/{account\_id}/access/users/{user\_id}

##### [Create a user](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/methods/create)

POST/accounts/{account\_id}/access/users

##### [Update a user](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/methods/update)

PUT/accounts/{account\_id}/access/users/{user\_id}

##### [Delete a user](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/methods/delete)

DELETE/accounts/{account\_id}/access/users/{user\_id}

##### ModelsExpand Collapse

<details>

<summary>

AccessUser object {id, active, displayName, 4 more }

</summary>

id: optional string

The unique Cloudflare-generated Id of the SCIM resource.

<a href="#">Link to this property</a>

active: optional boolean

Determines the status of the SCIM User resource.

<a href="#">Link to this property</a>

displayName: optional string

The name of the SCIM User resource.

<a href="#">Link to this property</a>

<details>

<summary>

emails: optional array of object {primary, type, value }

</summary>

primary: optional boolean

Indicates if the email address is the primary email belonging to the SCIM User resource.

<a href="#">Link to this property</a>

type: optional string

Indicates the type of the email address.

<a href="#">Link to this property</a>

value: optional string

The email address of the SCIM User resource.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

externalId: optional string

The IdP-generated Id of the SCIM resource.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {created, lastModified }

The metadata of the SCIM resource.

</summary>

created: optional string

The timestamp of when the SCIM resource was created.

formatdate-time

<a href="#">Link to this property</a>

lastModified: optional string

The timestamp of when the SCIM resource was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

schemas: optional array of string

The list of URIs which indicate the attributes contained within a SCIM resource.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users%20%3E%20(model)%20access_user%20%3E%20(schema)>)

<details>

<summary>

UserListResponse object {id, access\_seat, active\_device\_count, 8 more }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

access\_seat: optional boolean

True if the user has authenticated with Cloudflare Access.

<a href="#">Link to this property</a>

active\_device\_count: optional number

The number of active devices registered to the user.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

email: optional string

The email of the user.

formatemail

<a href="#">Link to this property</a>

gateway\_seat: optional boolean

True if the user has logged into the WARP client.

<a href="#">Link to this property</a>

last\_successful\_login: optional string

The time at which the user last successfully logged in.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the user.

<a href="#">Link to this property</a>

seat\_uid: optional string

The unique API identifier for the Zero Trust seat.

<a href="#">Link to this property</a>

uid: optional string

The unique API identifier for the user.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users%20%3E%20(model)%20user_list_response%20%3E%20(schema)>)

<details>

<summary>

UserGetResponse object {id, access\_seat, active\_device\_count, 8 more }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

access\_seat: optional boolean

True if the user has authenticated with Cloudflare Access.

<a href="#">Link to this property</a>

active\_device\_count: optional number

The number of active devices registered to the user.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

email: optional string

The email of the user.

formatemail

<a href="#">Link to this property</a>

gateway\_seat: optional boolean

True if the user has logged into the WARP client.

<a href="#">Link to this property</a>

last\_successful\_login: optional string

The time at which the user last successfully logged in.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the user.

<a href="#">Link to this property</a>

seat\_uid: optional string

The unique API identifier for the Zero Trust seat.

<a href="#">Link to this property</a>

uid: optional string

The unique API identifier for the user.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users%20%3E%20(model)%20user_get_response%20%3E%20(schema)>)

<details>

<summary>

UserCreateResponse object {id, access\_seat, active\_device\_count, 8 more }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

access\_seat: optional boolean

True if the user has authenticated with Cloudflare Access.

<a href="#">Link to this property</a>

active\_device\_count: optional number

The number of active devices registered to the user.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

email: optional string

The email of the user.

formatemail

<a href="#">Link to this property</a>

gateway\_seat: optional boolean

True if the user has logged into the WARP client.

<a href="#">Link to this property</a>

last\_successful\_login: optional string

The time at which the user last successfully logged in.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the user.

<a href="#">Link to this property</a>

seat\_uid: optional string

The unique API identifier for the Zero Trust seat.

<a href="#">Link to this property</a>

uid: optional string

The unique API identifier for the user.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users%20%3E%20(model)%20user_create_response%20%3E%20(schema)>)

<details>

<summary>

UserUpdateResponse object {id, access\_seat, active\_device\_count, 8 more }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

access\_seat: optional boolean

True if the user has authenticated with Cloudflare Access.

<a href="#">Link to this property</a>

active\_device\_count: optional number

The number of active devices registered to the user.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

email: optional string

The email of the user.

formatemail

<a href="#">Link to this property</a>

gateway\_seat: optional boolean

True if the user has logged into the WARP client.

<a href="#">Link to this property</a>

last\_successful\_login: optional string

The time at which the user last successfully logged in.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the user.

<a href="#">Link to this property</a>

seat\_uid: optional string

The unique API identifier for the Zero Trust seat.

<a href="#">Link to this property</a>

uid: optional string

The unique API identifier for the user.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users%20%3E%20(model)%20user_update_response%20%3E%20(schema)>)

UserDeleteResponse = unknown

[Link to this property](#)%20zero_trust.access.users%20%3E%20(model)%20user_delete_response%20%3E%20(schema)>)

#### UsersActive Sessions

##### [Get active sessions](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/subresources/active_sessions/methods/list)

GET/accounts/{account\_id}/access/users/{user\_id}/active\_sessions

##### [Get single active session](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/subresources/active_sessions/methods/get)

GET/accounts/{account\_id}/access/users/{user\_id}/active\_sessions/{nonce}

##### ModelsExpand Collapse

<details>

<summary>

ActiveSessionListResponse object {expiration, metadata, name }

</summary>

expiration: optional number

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional object {apps, expires, iat, 2 more }

</summary>

<details>

<summary>

apps: optional map\[object {hostname, name, type, uid } ]

</summary>

hostname: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

uid: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires: optional number

<a href="#">Link to this property</a>

iat: optional number

<a href="#">Link to this property</a>

nonce: optional string

<a href="#">Link to this property</a>

ttl: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users.active_sessions%20%3E%20(model)%20active_session_list_response%20%3E%20(schema)>)

<details>

<summary>

ActiveSessionGetResponse object {account\_id, auth\_status, common\_name, 16 more }

</summary>

account\_id: optional string

<a href="#">Link to this property</a>

auth\_status: optional string

<a href="#">Link to this property</a>

common\_name: optional string

<a href="#">Link to this property</a>

device\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

device\_sessions: optional map\[object {last\_authenticated } ]

</summary>

last\_authenticated: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

devicePosture: optional map\[object {id, check, data, 6 more } ]

</summary>

id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

check: optional object {exists, path }

</summary>

exists: optional boolean

<a href="#">Link to this property</a>

path: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data: optional unknown

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

rule\_name: optional string

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

<details>

<summary>

geo: optional object {country }

</summary>

country: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

iat: optional number

<a href="#">Link to this property</a>

<details>

<summary>

idp: optional object {id, type }

</summary>

id: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

<a href="#">Link to this property</a>

is\_gateway: optional boolean

<a href="#">Link to this property</a>

is\_warp: optional boolean

<a href="#">Link to this property</a>

isActive: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

mtls\_auth: optional object {auth\_status, cert\_issuer\_dn, cert\_issuer\_ski, 2 more }

</summary>

auth\_status: optional string

<a href="#">Link to this property</a>

cert\_issuer\_dn: optional string

<a href="#">Link to this property</a>

cert\_issuer\_ski: optional string

<a href="#">Link to this property</a>

cert\_presented: optional boolean

<a href="#">Link to this property</a>

cert\_serial: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

service\_token\_id: optional string

<a href="#">Link to this property</a>

service\_token\_status: optional boolean

<a href="#">Link to this property</a>

user\_uuid: optional string

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users.active_sessions%20%3E%20(model)%20active_session_get_response%20%3E%20(schema)>)

#### UsersLast Seen Identity

##### [Get last seen identity](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/subresources/last_seen_identity/methods/get)

GET/accounts/{account\_id}/access/users/{user\_id}/last\_seen\_identity

##### ModelsExpand Collapse

<details>

<summary>

Identity object {account\_id, auth\_status, common\_name, 15 more }

</summary>

account\_id: optional string

<a href="#">Link to this property</a>

auth\_status: optional string

<a href="#">Link to this property</a>

common\_name: optional string

<a href="#">Link to this property</a>

device\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

device\_sessions: optional map\[object {last\_authenticated } ]

</summary>

last\_authenticated: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

devicePosture: optional map\[object {id, check, data, 6 more } ]

</summary>

id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

check: optional object {exists, path }

</summary>

exists: optional boolean

<a href="#">Link to this property</a>

path: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data: optional unknown

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

rule\_name: optional string

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

<details>

<summary>

geo: optional object {country }

</summary>

country: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

iat: optional number

<a href="#">Link to this property</a>

<details>

<summary>

idp: optional object {id, type }

</summary>

id: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

<a href="#">Link to this property</a>

is\_gateway: optional boolean

<a href="#">Link to this property</a>

is\_warp: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

mtls\_auth: optional object {auth\_status, cert\_issuer\_dn, cert\_issuer\_ski, 2 more }

</summary>

auth\_status: optional string

<a href="#">Link to this property</a>

cert\_issuer\_dn: optional string

<a href="#">Link to this property</a>

cert\_issuer\_ski: optional string

<a href="#">Link to this property</a>

cert\_presented: optional boolean

<a href="#">Link to this property</a>

cert\_serial: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

service\_token\_id: optional string

<a href="#">Link to this property</a>

service\_token\_status: optional boolean

<a href="#">Link to this property</a>

user\_uuid: optional string

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users.last_seen_identity%20%3E%20(model)%20identity%20%3E%20(schema)>)

#### UsersFailed Logins

##### [Get failed logins](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/subresources/failed_logins/methods/list)

GET/accounts/{account\_id}/access/users/{user\_id}/failed\_logins

##### ModelsExpand Collapse

<details>

<summary>

FailedLoginListResponse object {expiration, metadata }

</summary>

expiration: optional number

<a href="#">Link to this property</a>

metadata: optional unknown

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users.failed_logins%20%3E%20(model)%20failed_login_list_response%20%3E%20(schema)>)