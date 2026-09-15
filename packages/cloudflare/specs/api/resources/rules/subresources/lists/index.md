---
title: Lists
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rules Lists](https://developers.cloudflare.com/api/resources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lists

##### [Get lists](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/list)

GET/accounts/{account\_id}/rules/lists

##### [Get a list](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/get)

GET/accounts/{account\_id}/rules/lists/{list\_id}

##### [Create a list](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/create)

POST/accounts/{account\_id}/rules/lists

##### [Update a list](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/update)

PUT/accounts/{account\_id}/rules/lists/{list\_id}

##### [Delete a list](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/delete)

DELETE/accounts/{account\_id}/rules/lists/{list\_id}

##### ModelsExpand Collapse

<details>

<summary>

Hostname object {url\_hostname, exclude\_exact\_hostname }

Hostnames support ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (\*), and the hyphen (-).

</summary>

url\_hostname: string

<a href="#">Link to this property</a>

exclude\_exact\_hostname: optional boolean

Only applies to wildcard hostnames (e.g., \*.example.com). When true (default), the rule blocks only subdomains. When false, the rule blocks both the root domain and subdomains.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists%20%3E%20(model)%20hostname%20%3E%20(schema)>)

<details>

<summary>

ListsList object {id, created\_on, kind, 5 more }

</summary>

id: string

The unique ID of the list.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

<details>

<summary>

kind: "ip"or "redirect"or "hostname"or "asn"

The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

</summary>

One of the following:

"ip"

<a href="#">Link to this property</a>

"redirect"

<a href="#">Link to this property</a>

"hostname"

<a href="#">Link to this property</a>

"asn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

name: string

An informative name for the list. Use this name in filter and rule expressions.

maxLength50

<a href="#">Link to this property</a>

num\_items: number

The number of items in the list.

<a href="#">Link to this property</a>

num\_referencing\_filters: number

The number of <a href="https://developers.cloudflare.com/api/resources/filters/">filters</a> referencing the list.

<a href="#">Link to this property</a>

description: optional string

An informative summary of the list.

maxLength500

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists%20%3E%20(model)%20lists_list%20%3E%20(schema)>)

<details>

<summary>

Redirect object {source\_url, target\_url, include\_subdomains, 4 more }

The definition of the redirect.

</summary>

source\_url: string

<a href="#">Link to this property</a>

target\_url: string

<a href="#">Link to this property</a>

include\_subdomains: optional boolean

<a href="#">Link to this property</a>

preserve\_path\_suffix: optional boolean

<a href="#">Link to this property</a>

preserve\_query\_string: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

status\_code: optional 301or 302or 307or 308

</summary>

One of the following:

301

<a href="#">Link to this property</a>

302

<a href="#">Link to this property</a>

307

<a href="#">Link to this property</a>

308

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

subpath\_matching: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists%20%3E%20(model)%20redirect%20%3E%20(schema)>)

<details>

<summary>

ListGetResponse object {id, created\_on, kind, 5 more }

</summary>

id: string

The unique ID of the list.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

<details>

<summary>

kind: "ip"or "redirect"or "hostname"or "asn"

The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

</summary>

One of the following:

"ip"

<a href="#">Link to this property</a>

"redirect"

<a href="#">Link to this property</a>

"hostname"

<a href="#">Link to this property</a>

"asn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

name: string

An informative name for the list. Use this name in filter and rule expressions.

maxLength50

<a href="#">Link to this property</a>

num\_items: number

The number of items in the list.

<a href="#">Link to this property</a>

num\_referencing\_filters: number

The number of <a href="https://developers.cloudflare.com/api/resources/filters/">filters</a> referencing the list.

<a href="#">Link to this property</a>

description: optional string

An informative summary of the list.

maxLength500

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists%20%3E%20(model)%20list_get_response%20%3E%20(schema)>)

<details>

<summary>

ListCreateResponse object {id, created\_on, kind, 5 more }

</summary>

id: string

The unique ID of the list.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

<details>

<summary>

kind: "ip"or "redirect"or "hostname"or "asn"

The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

</summary>

One of the following:

"ip"

<a href="#">Link to this property</a>

"redirect"

<a href="#">Link to this property</a>

"hostname"

<a href="#">Link to this property</a>

"asn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

name: string

An informative name for the list. Use this name in filter and rule expressions.

maxLength50

<a href="#">Link to this property</a>

num\_items: number

The number of items in the list.

<a href="#">Link to this property</a>

num\_referencing\_filters: number

The number of <a href="https://developers.cloudflare.com/api/resources/filters/">filters</a> referencing the list.

<a href="#">Link to this property</a>

description: optional string

An informative summary of the list.

maxLength500

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists%20%3E%20(model)%20list_create_response%20%3E%20(schema)>)

<details>

<summary>

ListUpdateResponse object {id, created\_on, kind, 5 more }

</summary>

id: string

The unique ID of the list.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

<details>

<summary>

kind: "ip"or "redirect"or "hostname"or "asn"

The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

</summary>

One of the following:

"ip"

<a href="#">Link to this property</a>

"redirect"

<a href="#">Link to this property</a>

"hostname"

<a href="#">Link to this property</a>

"asn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

name: string

An informative name for the list. Use this name in filter and rule expressions.

maxLength50

<a href="#">Link to this property</a>

num\_items: number

The number of items in the list.

<a href="#">Link to this property</a>

num\_referencing\_filters: number

The number of <a href="https://developers.cloudflare.com/api/resources/filters/">filters</a> referencing the list.

<a href="#">Link to this property</a>

description: optional string

An informative summary of the list.

maxLength500

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists%20%3E%20(model)%20list_update_response%20%3E%20(schema)>)

<details>

<summary>

ListDeleteResponse object {id }

</summary>

id: string

The unique ID of the list.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists%20%3E%20(model)%20list_delete_response%20%3E%20(schema)>)

#### ListsBulk Operations

##### [Get bulk operation status](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/bulk_operations/methods/get)

GET/accounts/{account\_id}/rules/lists/bulk\_operations/{operation\_id}

##### ModelsExpand Collapse

<details>

<summary>

BulkOperationGetResponse = object {id, status } or object {id, completed, status } or object {id, completed, error, status }

</summary>

One of the following:

<details>

<summary>

ListsBulkOperationPendingOrRunning object {id, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "running"

The current status of the asynchronous operation.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsBulkOperationCompleted object {id, completed, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

completed: string

The RFC 3339 timestamp of when the operation was completed.

<a href="#">Link to this property</a>

status: "completed"

The current status of the asynchronous operation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsBulkOperationFailed object {id, completed, error, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

completed: string

The RFC 3339 timestamp of when the operation was completed.

<a href="#">Link to this property</a>

error: string

A message describing the error when the status is <code>failed</code>.

<a href="#">Link to this property</a>

status: "failed"

The current status of the asynchronous operation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.bulk_operations%20%3E%20(model)%20bulk_operation_get_response%20%3E%20(schema)>)

#### ListsItems

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