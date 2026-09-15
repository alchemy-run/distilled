---
title: Items
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rules Lists](https://developers.cloudflare.com/api/resources/rules)

[Lists](https://developers.cloudflare.com/api/resources/rules/subresources/lists)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Items

##### [Get list items](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/list)

GET/accounts/{account\_id}/rules/lists/{list\_id}/items

##### [Get a list item](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/get)

GET/accounts/{account\_id}/rules/lists/{list\_id}/items/{item\_id}

##### [Create list items](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/create)

POST/accounts/{account\_id}/rules/lists/{list\_id}/items

##### [Update all list items](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/update)

PUT/accounts/{account\_id}/rules/lists/{list\_id}/items

##### [Delete list items](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/rules/lists/{list\_id}/items

##### ModelsExpand Collapse

<details>

<summary>

ListCursor object {after, before }

</summary>

after: optional string

<a href="#">Link to this property</a>

before: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.items%20%3E%20(model)%20list_cursor%20%3E%20(schema)>)

<details>

<summary>

ListItem object {operation\_id }

</summary>

operation\_id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.items%20%3E%20(model)%20list_item%20%3E%20(schema)>)

<details>

<summary>

ItemListResponse = object {id, created\_on, ip, 2 more } or object {id, created\_on, hostname, 2 more } or object {id, created\_on, modified\_on, 2 more } or object {id, asn, created\_on, 2 more }

</summary>

One of the following:

<details>

<summary>

ListsListItemIPFull object {id, created\_on, ip, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

ip: string

An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemHostnameFull object {id, created\_on, hostname, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

hostname: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists%20%3E%20(model)%20hostname%20%3E%20(schema)">Hostname</a> { url\_hostname, exclude\_exact\_hostname }

Hostnames support ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (\*), and the hyphen (-).

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemRedirectFull object {id, created\_on, modified\_on, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

redirect: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists%20%3E%20(model)%20redirect%20%3E%20(schema)">Redirect</a> { source\_url, target\_url, include\_subdomains, 4 more }

The definition of the redirect.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemASNFull object {id, asn, created\_on, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

asn: number

Defines a non-negative 32 bit integer.

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.items%20%3E%20(model)%20item_list_response%20%3E%20(schema)>)

<details>

<summary>

ItemGetResponse = object {id, created\_on, ip, 2 more } or object {id, created\_on, hostname, 2 more } or object {id, created\_on, modified\_on, 2 more } or object {id, asn, created\_on, 2 more }

</summary>

One of the following:

<details>

<summary>

ListsListItemIPFull object {id, created\_on, ip, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

ip: string

An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemHostnameFull object {id, created\_on, hostname, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

hostname: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists%20%3E%20(model)%20hostname%20%3E%20(schema)">Hostname</a> { url\_hostname, exclude\_exact\_hostname }

Hostnames support ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (\*), and the hyphen (-).

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemRedirectFull object {id, created\_on, modified\_on, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

redirect: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists%20%3E%20(model)%20redirect%20%3E%20(schema)">Redirect</a> { source\_url, target\_url, include\_subdomains, 4 more }

The definition of the redirect.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemASNFull object {id, asn, created\_on, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

asn: number

Defines a non-negative 32 bit integer.

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemCreateResponse object {operation\_id }

</summary>

operation\_id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.items%20%3E%20(model)%20item_create_response%20%3E%20(schema)>)

<details>

<summary>

ItemUpdateResponse object {operation\_id }

</summary>

operation\_id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.items%20%3E%20(model)%20item_update_response%20%3E%20(schema)>)

<details>

<summary>

ItemDeleteResponse object {operation\_id }

</summary>

operation\_id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)