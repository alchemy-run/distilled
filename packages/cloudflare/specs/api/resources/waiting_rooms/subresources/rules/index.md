---
title: Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rules

##### [List Waiting Room Rules](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/rules/methods/get)

GET/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/rules

##### [Create Waiting Room Rule](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/rules/methods/create)

POST/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/rules

##### [Replace Waiting Room Rules](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/rules/methods/update)

PUT/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/rules

##### [Patch Waiting Room Rule](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/rules/methods/edit)

PATCH/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/rules/{rule\_id}

##### [Delete Waiting Room Rule](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/rules/methods/delete)

DELETE/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/rules/{rule\_id}

##### ModelsExpand Collapse

<details>

<summary>

WaitingRoomRule object {id, action, description, 4 more }

</summary>

id: optional string

The ID of the rule.

<a href="#">Link to this property</a>

action: optional "bypass\_waiting\_room"

The action to take when the expression matches.

<a href="#">Link to this property</a>

description: optional string

The description of the rule.

<a href="#">Link to this property</a>

enabled: optional boolean

When set to true, the rule is enabled.

<a href="#">Link to this property</a>

expression: optional string

Criteria defining when there is a match for the current rule.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The version of the rule.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(model)%20waiting_room_rule%20%3E%20(schema)>)