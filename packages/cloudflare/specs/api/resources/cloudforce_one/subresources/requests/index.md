---
title: Requests
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Requests

##### [List Requests](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/methods/list)

POST/accounts/{account\_id}/cloudforce-one/requests

##### [Get a Request](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/methods/get)

GET/accounts/{account\_id}/cloudforce-one/requests/{request\_id}

##### [Create a New Request.](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/methods/create)

POST/accounts/{account\_id}/cloudforce-one/requests/new

##### [Update a Request](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/methods/update)

PUT/accounts/{account\_id}/cloudforce-one/requests/{request\_id}

##### [Delete a Request](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/requests/{request\_id}

##### [Get Request Quota](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/methods/quota)

GET/accounts/{account\_id}/cloudforce-one/requests/quota

##### [Get Request Types](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/methods/types)

GET/accounts/{account\_id}/cloudforce-one/requests/types

##### [Get Request Priority, Status, and TLP constants](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/methods/constants)

GET/accounts/{account\_id}/cloudforce-one/requests/constants

##### ModelsExpand Collapse

<details>

<summary>

Item object {id, content, created, 10 more }

</summary>

id: string

UUID.

maxLength36

<a href="#">Link to this property</a>

content: string

Request content.

<a href="#">Link to this property</a>

created: string

formatdate-time

<a href="#">Link to this property</a>

priority: string

formatdate-time

<a href="#">Link to this property</a>

request: string

Requested information from request.

<a href="#">Link to this property</a>

summary: string

Brief description of the request.

<a href="#">Link to this property</a>

<details>

<summary>

tlp: "clear"or "amber"or "amber-strict"or 2 more

The CISA defined Traffic Light Protocol (TLP).

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated: string

formatdate-time

<a href="#">Link to this property</a>

completed: optional string

formatdate-time

<a href="#">Link to this property</a>

message\_tokens: optional number

Tokens for the request messages.

<a href="#">Link to this property</a>

readable\_id: optional string

Readable Request ID.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "open"or "accepted"or "reported"or 3 more

Request Status.

</summary>

One of the following:

"open"

<a href="#">Link to this property</a>

"accepted"

<a href="#">Link to this property</a>

"reported"

<a href="#">Link to this property</a>

"approved"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"declined"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tokens: optional number

Tokens for the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(model)%20item%20%3E%20(schema)>)

<details>

<summary>

ListItem object {id, created, priority, 9 more }

</summary>

id: string

UUID.

maxLength36

<a href="#">Link to this property</a>

created: string

Request creation time.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

priority: "routine"or "high"or "urgent"

</summary>

One of the following:

"routine"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"urgent"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

request: string

Requested information from request.

<a href="#">Link to this property</a>

summary: string

Brief description of the request.

<a href="#">Link to this property</a>

<details>

<summary>

tlp: "clear"or "amber"or "amber-strict"or 2 more

The CISA defined Traffic Light Protocol (TLP).

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated: string

Request last updated time.

formatdate-time

<a href="#">Link to this property</a>

completed: optional string

Request completion time.

formatdate-time

<a href="#">Link to this property</a>

message\_tokens: optional number

Tokens for the request messages.

<a href="#">Link to this property</a>

readable\_id: optional string

Readable Request ID.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "open"or "accepted"or "reported"or 3 more

Request Status.

</summary>

One of the following:

"open"

<a href="#">Link to this property</a>

"accepted"

<a href="#">Link to this property</a>

"reported"

<a href="#">Link to this property</a>

"approved"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"declined"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tokens: optional number

Tokens for the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(model)%20list_item%20%3E%20(schema)>)

<details>

<summary>

Quota object {anniversary\_date, quarter\_anniversary\_date, quota, remaining }

</summary>

anniversary\_date: optional string

Anniversary date is when annual quota limit is refreshed.

formatdate-time

<a href="#">Link to this property</a>

quarter\_anniversary\_date: optional string

Quarter anniversary date is when quota limit is refreshed each quarter.

formatdate-time

<a href="#">Link to this property</a>

quota: optional number

Tokens for the quarter.

<a href="#">Link to this property</a>

remaining: optional number

Tokens remaining for the quarter.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(model)%20quota%20%3E%20(schema)>)

<details>

<summary>

RequestConstants object {priority, status, tlp }

</summary>

<details>

<summary>

priority: optional array of "routine"or "high"or "urgent"

</summary>

One of the following:

"routine"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"urgent"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional array of "open"or "accepted"or "reported"or 3 more

</summary>

One of the following:

"open"

<a href="#">Link to this property</a>

"accepted"

<a href="#">Link to this property</a>

"reported"

<a href="#">Link to this property</a>

"approved"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"declined"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional array of "clear"or "amber"or "amber-strict"or 2 more

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(model)%20request_constants%20%3E%20(schema)>)

RequestTypes = array of string

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(model)%20request_types%20%3E%20(schema)>)

<details>

<summary>

RequestDeleteResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(model)%20request_delete_response%20%3E%20(schema)>)

RequestTypesResponse = string

Request Types.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(model)%20request_types_response%20%3E%20(schema)>)

#### RequestsMessage

##### [List Request Messages](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/message/methods/get)

POST/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/message

##### [Create a New Request Message](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/message/methods/create)

POST/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/message/new

##### [Update a Request Message](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/message/methods/update)

PUT/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/message/{message\_id}

##### [Delete a Request Message](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/message/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/message/{message\_id}

##### ModelsExpand Collapse

<details>

<summary>

Message object {id, author, content, 3 more }

</summary>

id: number

Message ID.

<a href="#">Link to this property</a>

author: string

Author of message.

<a href="#">Link to this property</a>

content: string

Content of message.

<a href="#">Link to this property</a>

is\_follow\_on\_request: boolean

Whether the message is a follow-on request.

<a href="#">Link to this property</a>

updated: string

Defines the message last updated time.

formatdate-time

<a href="#">Link to this property</a>

created: optional string

Defines the message creation time.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(model)%20message%20%3E%20(schema)>)

<details>

<summary>

MessageDeleteResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(model)%20message_delete_response%20%3E%20(schema)>)

#### RequestsPriority

##### [Get a Priority Intelligence Requirement](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/priority/methods/get)

GET/accounts/{account\_id}/cloudforce-one/requests/priority/{priority\_id}

##### [Create a New Priority Intelligence Requirement](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/priority/methods/create)

POST/accounts/{account\_id}/cloudforce-one/requests/priority/new

##### [Update a Priority Intelligence Requirement](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/priority/methods/update)

PUT/accounts/{account\_id}/cloudforce-one/requests/priority/{priority\_id}

##### [Delete a Priority Intelligence Requirement](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/priority/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/requests/priority/{priority\_id}

##### [Get Priority Intelligence Requirement Quota](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/priority/methods/quota)

GET/accounts/{account\_id}/cloudforce-one/requests/priority/quota

##### ModelsExpand Collapse

Label = string

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(model)%20label%20%3E%20(schema)>)

<details>

<summary>

Priority object {id, created, labels, 4 more }

</summary>

id: string

UUID.

maxLength36

<a href="#">Link to this property</a>

created: string

Priority creation time.

formatdate-time

<a href="#">Link to this property</a>

labels: array of <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests.priority%20%3E%20(model)%20label%20%3E%20(schema)">Label</a>

List of labels.

<a href="#">Link to this property</a>

priority: number

Priority.

<a href="#">Link to this property</a>

requirement: string

Requirement.

<a href="#">Link to this property</a>

<details>

<summary>

tlp: "clear"or "amber"or "amber-strict"or 2 more

The CISA defined Traffic Light Protocol (TLP).

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated: string

Priority last updated time.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(model)%20priority%20%3E%20(schema)>)

<details>

<summary>

PriorityEdit object {labels, priority, requirement, tlp }

</summary>

labels: array of <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests.priority%20%3E%20(model)%20label%20%3E%20(schema)">Label</a>

List of labels.

<a href="#">Link to this property</a>

priority: number

Priority.

<a href="#">Link to this property</a>

requirement: string

Requirement.

<a href="#">Link to this property</a>

<details>

<summary>

tlp: "clear"or "amber"or "amber-strict"or 2 more

The CISA defined Traffic Light Protocol (TLP).

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(model)%20priority_edit%20%3E%20(schema)>)

<details>

<summary>

PriorityDeleteResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(model)%20priority_delete_response%20%3E%20(schema)>)

#### RequestsAssets

##### [Get a Request Asset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/assets/methods/get)

GET/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/asset/{asset\_id}

##### [List Request Assets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/assets/methods/create)

POST/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/asset

##### [Update a Request Asset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/assets/methods/update)

PUT/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/asset/{asset\_id}

##### [Delete a Request Asset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/assets/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/asset/{asset\_id}

##### ModelsExpand Collapse

<details>

<summary>

AssetGetResponse object {id, name, created, 2 more }

</summary>

id: number

Asset ID.

<a href="#">Link to this property</a>

name: string

Asset name.

<a href="#">Link to this property</a>

created: optional string

Defines the asset creation time.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Asset description.

<a href="#">Link to this property</a>

file\_type: optional string

Asset file type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(model)%20asset_get_response%20%3E%20(schema)>)

<details>

<summary>

AssetCreateResponse object {id, name, created, 2 more }

</summary>

id: number

Asset ID.

<a href="#">Link to this property</a>

name: string

Asset name.

<a href="#">Link to this property</a>

created: optional string

Defines the asset creation time.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Asset description.

<a href="#">Link to this property</a>

file\_type: optional string

Asset file type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(model)%20asset_create_response%20%3E%20(schema)>)

<details>

<summary>

AssetUpdateResponse object {id, name, created, 2 more }

</summary>

id: number

Asset ID.

<a href="#">Link to this property</a>

name: string

Asset name.

<a href="#">Link to this property</a>

created: optional string

Defines the asset creation time.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Asset description.

<a href="#">Link to this property</a>

file\_type: optional string

Asset file type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(model)%20asset_update_response%20%3E%20(schema)>)

<details>

<summary>

AssetDeleteResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(model)%20asset_delete_response%20%3E%20(schema)>)