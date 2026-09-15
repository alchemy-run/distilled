---
title: Access Requests
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Logs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Access Requests

##### [Get Access authentication logs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs/subresources/access_requests/methods/list)

GET/accounts/{account\_id}/access/logs/access\_requests

##### ModelsExpand Collapse

<details>

<summary>

AccessRequestListResponse = array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.logs.scim%20%3E%20(model)%20access_request%20%3E%20(schema)">AccessRequest</a> { action, allowed, app\_domain, 6 more }

</summary>

action: optional string

The event that occurred, such as a login attempt.

<a href="#">Link to this property</a>

allowed: optional boolean

The result of the authentication event.

<a href="#">Link to this property</a>

app\_domain: optional string

The URL of the Access application.

<a href="#">Link to this property</a>

app\_uid: optional string

The unique identifier for the Access application.

<a href="#">Link to this property</a>

connection: optional string

The IdP used to authenticate.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

ip\_address: optional string

The IP address of the authenticating user.

<a href="#">Link to this property</a>

ray\_id: optional string

The unique identifier for the request to Cloudflare.

maxLength16

<a href="#">Link to this property</a>

user\_email: optional string

The email address of the authenticating user.

formatemail

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(model)%20access_request_list_response%20%3E%20(schema)>)