---
title: Locks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Locks

##### [Get Bucket Lock Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/locks/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/lock

##### [Put Bucket Lock Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/locks/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/lock

##### ModelsExpand Collapse

<details>

<summary>

LockGetResponse object {rules }

</summary>

<details>

<summary>

rules: optional array of object {id, condition, enabled, prefix }

</summary>

id: string

Unique identifier for this rule.

<a href="#">Link to this property</a>

<details>

<summary>

condition: object {maxAgeSeconds, type } or object {date, type } or object {type }

Condition to apply a lock rule to an object for how long in seconds.

</summary>

One of the following:

<details>

<summary>

R2LockRuleAgeCondition object {maxAgeSeconds, type }

Condition to apply a lock rule to an object for how long in seconds.

</summary>

maxAgeSeconds: number

<a href="#">Link to this property</a>

type: "Age"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2LockRuleDateCondition object {date, type }

Condition to apply a lock rule to an object until a specific date.

</summary>

date: string

formatdate-time

<a href="#">Link to this property</a>

type: "Date"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2LockRuleIndefiniteCondition object {type }

Condition to apply a lock rule indefinitely.

</summary>

type: "Indefinite"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether or not this rule is in effect.

<a href="#">Link to this property</a>

prefix: optional string

Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.locks%20%3E%20(model)%20lock_get_response%20%3E%20(schema)>)

LockUpdateResponse = unknown

[Link to this property](#)%20r2.buckets.locks%20%3E%20(model)%20lock_update_response%20%3E%20(schema)>)