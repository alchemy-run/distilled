---
title: Policies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Policies

##### [List content security rules](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/list)

GET/zones/{zone\_id}/page\_shield/policies

##### [Get a content security rule](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/get)

GET/zones/{zone\_id}/page\_shield/policies/{policy\_id}

##### [Create a content security rule](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/create)

POST/zones/{zone\_id}/page\_shield/policies

##### [Update a content security rule](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/update)

PUT/zones/{zone\_id}/page\_shield/policies/{policy\_id}

##### [Delete a content security rule](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies/methods/delete)

DELETE/zones/{zone\_id}/page\_shield/policies/{policy\_id}

##### ModelsExpand Collapse

<details>

<summary>

PolicyListResponse object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(model)%20policy_list_response%20%3E%20(schema)>)

<details>

<summary>

PolicyGetResponse object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(model)%20policy_get_response%20%3E%20(schema)>)

<details>

<summary>

PolicyCreateResponse object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(model)%20policy_create_response%20%3E%20(schema)>)

<details>

<summary>

PolicyUpdateResponse object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(model)%20policy_update_response%20%3E%20(schema)>)