---
title: User Policy Checks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# User Policy Checks

##### [Test Access policies](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/user_policy_checks/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/user\_policy\_checks

##### ModelsExpand Collapse

<details>

<summary>

UserPolicyCheckListResponse object {app\_state, user\_identity }

</summary>

<details>

<summary>

app\_state: optional object {app\_uid, aud, hostname, 3 more }

</summary>

app\_uid: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

aud: optional string

<a href="#">Link to this property</a>

hostname: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

policies: optional array of unknown

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user\_identity: optional object {id, account\_id, device\_sessions, 8 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

account\_id: optional string

<a href="#">Link to this property</a>

device\_sessions: optional unknown

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

is\_gateway: optional boolean

<a href="#">Link to this property</a>

is\_warp: optional boolean

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

user\_uuid: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.user_policy_checks%20%3E%20(model)%20user_policy_check_list_response%20%3E%20(schema)>)