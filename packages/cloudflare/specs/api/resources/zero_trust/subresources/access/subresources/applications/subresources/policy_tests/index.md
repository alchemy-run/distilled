---
title: Policy Tests
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

# Policy Tests

##### [Get the current status of a given Access policy test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policy_tests/methods/get)

GET/accounts/{account\_id}/access/policy-tests/{policy\_test\_id}

##### [Start Access policy test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policy_tests/methods/create)

POST/accounts/{account\_id}/access/policy-tests

##### ModelsExpand Collapse

<details>

<summary>

PolicyTestGetResponse object {id, percent\_approved, percent\_blocked, 7 more }

</summary>

id: optional string

The UUID of the policy test.

maxLength64

<a href="#">Link to this property</a>

percent\_approved: optional number

The percentage of (processed) users approved based on policy evaluation results.

<a href="#">Link to this property</a>

percent\_blocked: optional number

The percentage of (processed) users blocked based on policy evaluation results.

<a href="#">Link to this property</a>

percent\_errored: optional number

The percentage of (processed) users errored based on policy evaluation results.

<a href="#">Link to this property</a>

percent\_users\_processed: optional number

The percentage of users processed so far (of the entire user base).

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "blocked"or "processing"or "exceeded time"or "complete"

The status of the policy test.

</summary>

One of the following:

"blocked"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"exceeded time"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total\_users: optional number

The total number of users in the user base.

<a href="#">Link to this property</a>

users\_approved: optional number

The number of (processed) users approved based on policy evaluation results.

<a href="#">Link to this property</a>

users\_blocked: optional number

The number of (processed) users blocked based on policy evaluation results.

<a href="#">Link to this property</a>

users\_errored: optional number

The number of (processed) users errored based on policy evaluation results.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.policy_tests%20%3E%20(model)%20policy_test_get_response%20%3E%20(schema)>)

<details>

<summary>

PolicyTestCreateResponse object {id, status }

</summary>

id: optional string

The UUID of the policy test.

maxLength64

<a href="#">Link to this property</a>

status: optional "success"

The status of the policy test request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.policy_tests%20%3E%20(model)%20policy_test_create_response%20%3E%20(schema)>)

#### Policy TestsUsers

##### [Get an Access policy test users page](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policy_tests/subresources/users/methods/list)

GET/accounts/{account\_id}/access/policy-tests/{policy\_test\_id}/users

##### ModelsExpand Collapse

<details>

<summary>

UserListResponse object {id, email, name, status }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

email: optional string

The email of the user.

formatemail

<a href="#">Link to this property</a>

name: optional string

The name of the user.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "approved"or "blocked"or "error"

Policy evaluation result for an individual user.

</summary>

One of the following:

"approved"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.policy_tests.users%20%3E%20(model)%20user_list_response%20%3E%20(schema)>)