---
title: Subscriptions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Subscriptions

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