---
title: Calls
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Calls

#### CallsSFU

##### [List apps](https://developers.cloudflare.com/api/resources/calls/subresources/sfu/methods/list)

GET/accounts/{account\_id}/calls/apps

##### [Retrieve app details](https://developers.cloudflare.com/api/resources/calls/subresources/sfu/methods/get)

GET/accounts/{account\_id}/calls/apps/{app\_id}

##### [Create a new app](https://developers.cloudflare.com/api/resources/calls/subresources/sfu/methods/create)

POST/accounts/{account\_id}/calls/apps

##### [Edit app details](https://developers.cloudflare.com/api/resources/calls/subresources/sfu/methods/update)

PUT/accounts/{account\_id}/calls/apps/{app\_id}

##### [Delete app](https://developers.cloudflare.com/api/resources/calls/subresources/sfu/methods/delete)

DELETE/accounts/{account\_id}/calls/apps/{app\_id}

##### ModelsExpand Collapse

<details>

<summary>

SFUListResponse object {created, modified, name, uid }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.sfu%20%3E%20(model)%20sfu_list_response%20%3E%20(schema)>)

<details>

<summary>

SFUGetResponse object {created, modified, name, uid }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.sfu%20%3E%20(model)%20sfu_get_response%20%3E%20(schema)>)

<details>

<summary>

SFUCreateResponse object {created, modified, name, 2 more }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

secret: string

Bearer token

maxLength64

minLength64

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.sfu%20%3E%20(model)%20sfu_create_response%20%3E%20(schema)>)

<details>

<summary>

SFUUpdateResponse object {created, modified, name, uid }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.sfu%20%3E%20(model)%20sfu_update_response%20%3E%20(schema)>)

<details>

<summary>

SFUDeleteResponse object {created, modified, name, uid }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.sfu%20%3E%20(model)%20sfu_delete_response%20%3E%20(schema)>)

#### CallsTURN

##### [List TURN Keys](https://developers.cloudflare.com/api/resources/calls/subresources/turn/methods/list)

GET/accounts/{account\_id}/calls/turn\_keys

##### [Retrieve TURN key details](https://developers.cloudflare.com/api/resources/calls/subresources/turn/methods/get)

GET/accounts/{account\_id}/calls/turn\_keys/{key\_id}

##### [Create a new TURN key](https://developers.cloudflare.com/api/resources/calls/subresources/turn/methods/create)

POST/accounts/{account\_id}/calls/turn\_keys

##### [Edit TURN key details](https://developers.cloudflare.com/api/resources/calls/subresources/turn/methods/update)

PUT/accounts/{account\_id}/calls/turn\_keys/{key\_id}

##### [Delete TURN key](https://developers.cloudflare.com/api/resources/calls/subresources/turn/methods/delete)

DELETE/accounts/{account\_id}/calls/turn\_keys/{key\_id}

##### ModelsExpand Collapse

<details>

<summary>

TURNListResponse object {created, modified, name, uid }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.turn%20%3E%20(model)%20turn_list_response%20%3E%20(schema)>)

<details>

<summary>

TURNGetResponse object {created, modified, name, uid }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.turn%20%3E%20(model)%20turn_get_response%20%3E%20(schema)>)

<details>

<summary>

TURNCreateResponse object {created, key, modified, 2 more }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

key: string

Bearer token

maxLength64

minLength64

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of a TURN key, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.turn%20%3E%20(model)%20turn_create_response%20%3E%20(schema)>)

<details>

<summary>

TURNUpdateResponse object {created, modified, name, uid }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.turn%20%3E%20(model)%20turn_update_response%20%3E%20(schema)>)

<details>

<summary>

TURNDeleteResponse object {created, modified, name, uid }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.turn%20%3E%20(model)%20turn_delete_response%20%3E%20(schema)>)