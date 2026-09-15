---
title: Cloudforce One
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cloudforce One

#### Cloudforce OneScans

#### Cloudforce OneScansResults

##### [Get the Latest Scan Result](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/results/methods/get)

GET/accounts/{account\_id}/cloudforce-one/scans/results/{config\_id}

##### ModelsExpand Collapse

<details>

<summary>

ScanResult object {number, proto, status }

</summary>

number: optional number

<a href="#">Link to this property</a>

proto: optional string

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.results%20%3E%20(model)%20scan_result%20%3E%20(schema)>)

<details>

<summary>

ResultGetResponse object {"1.1.1.1" }

</summary>

<details>

<summary>

"1.1.1.1": array of <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.scans.results%20%3E%20(model)%20scan_result%20%3E%20(schema)">ScanResult</a> { number, proto, status }

</summary>

number: optional number

<a href="#">Link to this property</a>

proto: optional string

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.results%20%3E%20(model)%20result_get_response%20%3E%20(schema)>)

#### Cloudforce OneScansConfig

##### [List Scan Configs](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/methods/list)

GET/accounts/{account\_id}/cloudforce-one/scans/config

##### [Create a new Scan Config](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/methods/create)

POST/accounts/{account\_id}/cloudforce-one/scans/config

##### [Update an existing Scan Config](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/scans/config/{config\_id}

##### [Delete a Scan Config](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/scans/config/{config\_id}

##### ModelsExpand Collapse

<details>

<summary>

ConfigListResponse object {id, account\_id, frequency, 2 more }

</summary>

id: string

Defines the Config ID.

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

frequency: number

Defines the number of days between each scan (0 = One-off scan).

<a href="#">Link to this property</a>

ips: array of string

Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

<a href="#">Link to this property</a>

ports: array of string

Defines a list of ports to scan. Valid values are:“default”, “all”, or a comma-separated list of ports or range of ports (e.g. \[“1-80”, “443”]). “default” scans the 100 most commonly open ports.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(model)%20config_list_response%20%3E%20(schema)>)

<details>

<summary>

ConfigCreateResponse object {id, account\_id, frequency, 2 more }

</summary>

id: string

Defines the Config ID.

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

frequency: number

Defines the number of days between each scan (0 = One-off scan).

<a href="#">Link to this property</a>

ips: array of string

Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

<a href="#">Link to this property</a>

ports: array of string

Defines a list of ports to scan. Valid values are:“default”, “all”, or a comma-separated list of ports or range of ports (e.g. \[“1-80”, “443”]). “default” scans the 100 most commonly open ports.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(model)%20config_create_response%20%3E%20(schema)>)

<details>

<summary>

ConfigEditResponse object {id, account\_id, frequency, 2 more }

</summary>

id: string

Defines the Config ID.

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

frequency: number

Defines the number of days between each scan (0 = One-off scan).

<a href="#">Link to this property</a>

ips: array of string

Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

<a href="#">Link to this property</a>

ports: array of string

Defines a list of ports to scan. Valid values are:“default”, “all”, or a comma-separated list of ports or range of ports (e.g. \[“1-80”, “443”]). “default” scans the 100 most commonly open ports.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(model)%20config_edit_response%20%3E%20(schema)>)

ConfigDeleteResponse = unknown

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(model)%20config_delete_response%20%3E%20(schema)>)

#### Cloudforce OneBinary Storage

##### [Retrieves a file from Binary Storage](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/binary_storage/methods/get)

GET/accounts/{account\_id}/cloudforce-one/binary/{hash}

##### [Posts a file to Binary Storage](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/binary_storage/methods/create)

POST/accounts/{account\_id}/cloudforce-one/binary

##### ModelsExpand Collapse

<details>

<summary>

BinaryStorageCreateResponse object {content\_type, md5, sha1, sha256 }

</summary>

content\_type: string

<a href="#">Link to this property</a>

md5: string

<a href="#">Link to this property</a>

sha1: string

<a href="#">Link to this property</a>

sha256: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.binary_storage%20%3E%20(model)%20binary_storage_create_response%20%3E%20(schema)>)

#### Cloudforce OneRequests

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

#### Cloudforce OneRequestsMessage

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

#### Cloudforce OneRequestsPriority

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

#### Cloudforce OneRequestsAssets

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

#### Cloudforce OneThreat Events

##### [Filter and list events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events

##### [Reads an event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/methods/get)

Deprecated

GET/accounts/{account\_id}/cloudforce-one/events/{event\_id}

##### [Creates a new event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/create

##### [Updates an event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/{event\_id}

##### [Creates bulk events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/methods/bulk_create)

POST/accounts/{account\_id}/cloudforce-one/events/create/bulk

##### [Creates bulk DOS event with relationships and indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/methods/bulk_create_relationships)

Deprecated

POST/accounts/{account\_id}/cloudforce-one/events/create/bulk/relationships

##### ModelsExpand Collapse

<details>

<summary>

ThreatEventListResponse = array of object {attacker, attackerCountry, attackerCountryAlpha3, 26 more }

</summary>

attacker: string

<a href="#">Link to this property</a>

attackerCountry: string

<a href="#">Link to this property</a>

attackerCountryAlpha3: string

<a href="#">Link to this property</a>

category: string

<a href="#">Link to this property</a>

datasetId: string

<a href="#">Link to this property</a>

date: string

<a href="#">Link to this property</a>

event: string

<a href="#">Link to this property</a>

hasChildren: boolean

<a href="#">Link to this property</a>

indicator: string

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

indicatorTypeId: number

<a href="#">Link to this property</a>

killChain: number

<a href="#">Link to this property</a>

mitreAttack: array of string

<a href="#">Link to this property</a>

mitreCapec: array of string

<a href="#">Link to this property</a>

numReferenced: number

<a href="#">Link to this property</a>

numReferences: number

<a href="#">Link to this property</a>

rawId: string

<a href="#">Link to this property</a>

referenced: array of string

<a href="#">Link to this property</a>

referencedIds: array of number

<a href="#">Link to this property</a>

references: array of string

<a href="#">Link to this property</a>

referencesIds: array of number

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

targetCountry: string

<a href="#">Link to this property</a>

targetCountryAlpha3: string

<a href="#">Link to this property</a>

targetIndustry: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

insight: optional string

<a href="#">Link to this property</a>

releasabilityId: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_list_response%20%3E%20(schema)>)

<details>

<summary>

ThreatEventGetResponse object {attacker, attackerCountry, attackerCountryAlpha3, 26 more }

</summary>

attacker: string

<a href="#">Link to this property</a>

attackerCountry: string

<a href="#">Link to this property</a>

attackerCountryAlpha3: string

<a href="#">Link to this property</a>

category: string

<a href="#">Link to this property</a>

datasetId: string

<a href="#">Link to this property</a>

date: string

<a href="#">Link to this property</a>

event: string

<a href="#">Link to this property</a>

hasChildren: boolean

<a href="#">Link to this property</a>

indicator: string

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

indicatorTypeId: number

<a href="#">Link to this property</a>

killChain: number

<a href="#">Link to this property</a>

mitreAttack: array of string

<a href="#">Link to this property</a>

mitreCapec: array of string

<a href="#">Link to this property</a>

numReferenced: number

<a href="#">Link to this property</a>

numReferences: number

<a href="#">Link to this property</a>

rawId: string

<a href="#">Link to this property</a>

referenced: array of string

<a href="#">Link to this property</a>

referencedIds: array of number

<a href="#">Link to this property</a>

references: array of string

<a href="#">Link to this property</a>

referencesIds: array of number

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

targetCountry: string

<a href="#">Link to this property</a>

targetCountryAlpha3: string

<a href="#">Link to this property</a>

targetIndustry: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

insight: optional string

<a href="#">Link to this property</a>

releasabilityId: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_get_response%20%3E%20(schema)>)

<details>

<summary>

ThreatEventCreateResponse object {attacker, attackerCountry, attackerCountryAlpha3, 26 more }

</summary>

attacker: string

<a href="#">Link to this property</a>

attackerCountry: string

<a href="#">Link to this property</a>

attackerCountryAlpha3: string

<a href="#">Link to this property</a>

category: string

<a href="#">Link to this property</a>

datasetId: string

<a href="#">Link to this property</a>

date: string

<a href="#">Link to this property</a>

event: string

<a href="#">Link to this property</a>

hasChildren: boolean

<a href="#">Link to this property</a>

indicator: string

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

indicatorTypeId: number

<a href="#">Link to this property</a>

killChain: number

<a href="#">Link to this property</a>

mitreAttack: array of string

<a href="#">Link to this property</a>

mitreCapec: array of string

<a href="#">Link to this property</a>

numReferenced: number

<a href="#">Link to this property</a>

numReferences: number

<a href="#">Link to this property</a>

rawId: string

<a href="#">Link to this property</a>

referenced: array of string

<a href="#">Link to this property</a>

referencedIds: array of number

<a href="#">Link to this property</a>

references: array of string

<a href="#">Link to this property</a>

referencesIds: array of number

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

targetCountry: string

<a href="#">Link to this property</a>

targetCountryAlpha3: string

<a href="#">Link to this property</a>

targetIndustry: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

insight: optional string

<a href="#">Link to this property</a>

releasabilityId: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)>)

<details>

<summary>

ThreatEventEditResponse object {attacker, attackerCountry, attackerCountryAlpha3, 26 more }

</summary>

attacker: string

<a href="#">Link to this property</a>

attackerCountry: string

<a href="#">Link to this property</a>

attackerCountryAlpha3: string

<a href="#">Link to this property</a>

category: string

<a href="#">Link to this property</a>

datasetId: string

<a href="#">Link to this property</a>

date: string

<a href="#">Link to this property</a>

event: string

<a href="#">Link to this property</a>

hasChildren: boolean

<a href="#">Link to this property</a>

indicator: string

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

indicatorTypeId: number

<a href="#">Link to this property</a>

killChain: number

<a href="#">Link to this property</a>

mitreAttack: array of string

<a href="#">Link to this property</a>

mitreCapec: array of string

<a href="#">Link to this property</a>

numReferenced: number

<a href="#">Link to this property</a>

numReferences: number

<a href="#">Link to this property</a>

rawId: string

<a href="#">Link to this property</a>

referenced: array of string

<a href="#">Link to this property</a>

referencedIds: array of number

<a href="#">Link to this property</a>

references: array of string

<a href="#">Link to this property</a>

referencesIds: array of number

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

targetCountry: string

<a href="#">Link to this property</a>

targetCountryAlpha3: string

<a href="#">Link to this property</a>

targetIndustry: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

insight: optional string

<a href="#">Link to this property</a>

releasabilityId: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_edit_response%20%3E%20(schema)>)

<details>

<summary>

ThreatEventBulkCreateResponse object {createdEventsCount, createdTagsCount, errorCount, 4 more }

Detailed result of bulk event creation with auto-tag management

</summary>

createdEventsCount: number

Number of events created

<a href="#">Link to this property</a>

createdTagsCount: number

Number of new tags created in SoT

<a href="#">Link to this property</a>

errorCount: number

Number of errors encountered

<a href="#">Link to this property</a>

queuedIndicatorsCount: number

Number of indicators queued for async processing

<a href="#">Link to this property</a>

createBulkEventsRequestId: optional string

Correlation ID for async indicator processing

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

createdEvents: optional array of object {eventIndex, shardId, uuid }

Array of created events with UUIDs and shard locations. Only present when includeCreatedEvents=true

</summary>

eventIndex: number

Original index in the input data array

<a href="#">Link to this property</a>

shardId: string

Dataset ID of the shard where the event was created

<a href="#">Link to this property</a>

uuid: string

UUID of the created event

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

errors: optional array of object {error, eventIndex }

Array of error details

</summary>

error: string

Error message

<a href="#">Link to this property</a>

eventIndex: number

Index of the event that caused the error

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_bulk_create_response%20%3E%20(schema)>)

<details>

<summary>

ThreatEventBulkCreateRelationshipsResponse object {createdEventsCount, createdIndicatorsCount, createdRelationshipsCount, 2 more }

Result of bulk relationship creation operation

</summary>

createdEventsCount: number

Number of events created

<a href="#">Link to this property</a>

createdIndicatorsCount: number

Number of indicators created

<a href="#">Link to this property</a>

createdRelationshipsCount: number

Number of relationships created

<a href="#">Link to this property</a>

errorCount: number

Number of errors encountered

<a href="#">Link to this property</a>

<details>

<summary>

errors: optional array of object {error, eventIndex }

Array of error details

</summary>

error: string

Error message

<a href="#">Link to this property</a>

eventIndex: number

Index of the event that caused the error

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_bulk_create_relationships_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsAggregate

##### [Aggregate events by single or multiple columns with optional date filtering](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/aggregate/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/aggregate

##### ModelsExpand Collapse

<details>

<summary>

AggregateListResponse object {aggregateBy, aggregations, total, dateRange }

</summary>

aggregateBy: string

Column(s) that were aggregated by

<a href="#">Link to this property</a>

<details>

<summary>

aggregations: array of object {count, date }

Array of aggregation results with dynamic fields based on aggregateBy columns

</summary>

count: number

Number of events for this aggregation

<a href="#">Link to this property</a>

date: optional string

Date (if groupByDate is true)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total: number

Total number of events in the aggregation

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: optional object {endDate, startDate }

Date range used for filtering

</summary>

endDate: optional string

<a href="#">Link to this property</a>

startDate: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsGraphql

##### [GraphQL endpoint for event aggregation](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/graphql/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/graphql

##### ModelsExpand Collapse

<details>

<summary>

GraphqlCreateResponse object {data, errors }

</summary>

data: optional unknown

<a href="#">Link to this property</a>

errors: optional array of unknown

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.graphql%20%3E%20(model)%20graphql_create_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsGraph

##### [Query graph neighborhood from R2 Data Catalog](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/graph/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/graph

##### ModelsExpand Collapse

<details>

<summary>

GraphListResponse object {edges, node, nodes }

</summary>

<details>

<summary>

edges: array of object {id, relationshipType, source, 5 more }

</summary>

id: string

Deterministic composite edge id (source→target:relationshipType)

<a href="#">Link to this property</a>

relationshipType: string

<a href="#">Link to this property</a>

source: string

Compact id of the source node (type:uuid)

<a href="#">Link to this property</a>

sourceId: string

<a href="#">Link to this property</a>

sourceType: string

<a href="#">Link to this property</a>

target: string

Compact id of the target node (type:uuid)

<a href="#">Link to this property</a>

targetId: string

<a href="#">Link to this property</a>

targetType: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

node: map\[unknown]

Focal node object (legacy single-seed). Null when unavailable.

<a href="#">Link to this property</a>

nodes: array of map\[unknown]

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(model)%20graph_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsQueries

##### [List all saved event queries](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/queries/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/queries

##### [Create a saved event query](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/queries/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/queries/create

##### [Read a saved event query](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/queries/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/queries/{query\_id}

##### [Update a saved event query](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/queries/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/queries/{query\_id}

##### [Delete a saved event query](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/queries/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/queries/{query\_id}

##### ModelsExpand Collapse

<details>

<summary>

QueryListResponse = array of object {id, account\_id, alert\_enabled, 10 more }

</summary>

id: number

Unique identifier for the saved query

<a href="#">Link to this property</a>

account\_id: number

Account ID

<a href="#">Link to this property</a>

alert\_enabled: boolean

Whether alerts are enabled

<a href="#">Link to this property</a>

alert\_rollup\_enabled: boolean

Whether alert rollup is enabled

<a href="#">Link to this property</a>

created\_at: string

Creation timestamp

<a href="#">Link to this property</a>

name: string

Name of the saved query

<a href="#">Link to this property</a>

query\_json: string

JSON string containing the query parameters

<a href="#">Link to this property</a>

rule\_enabled: boolean

Whether rule is enabled

<a href="#">Link to this property</a>

updated\_at: string

Last update timestamp

<a href="#">Link to this property</a>

user\_email: string

Email of the user who created the query

<a href="#">Link to this property</a>

custom\_threat\_feed\_id: optional number

Intel Indicator Feed ID (numeric)

<a href="#">Link to this property</a>

rule\_list\_id: optional string

WAF rules list ID for blocking

<a href="#">Link to this property</a>

rule\_scope: optional string

Scope for the rule

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_list_response%20%3E%20(schema)>)

<details>

<summary>

QueryCreateResponse object {id, account\_id, alert\_enabled, 10 more }

</summary>

id: number

Unique identifier for the saved query

<a href="#">Link to this property</a>

account\_id: number

Account ID

<a href="#">Link to this property</a>

alert\_enabled: boolean

Whether alerts are enabled

<a href="#">Link to this property</a>

alert\_rollup\_enabled: boolean

Whether alert rollup is enabled

<a href="#">Link to this property</a>

created\_at: string

Creation timestamp

<a href="#">Link to this property</a>

name: string

Name of the saved query

<a href="#">Link to this property</a>

query\_json: string

JSON string containing the query parameters

<a href="#">Link to this property</a>

rule\_enabled: boolean

Whether rule is enabled

<a href="#">Link to this property</a>

updated\_at: string

Last update timestamp

<a href="#">Link to this property</a>

user\_email: string

Email of the user who created the query

<a href="#">Link to this property</a>

custom\_threat\_feed\_id: optional number

Intel Indicator Feed ID (numeric)

<a href="#">Link to this property</a>

rule\_list\_id: optional string

WAF rules list ID for blocking

<a href="#">Link to this property</a>

rule\_scope: optional string

Scope for the rule

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_create_response%20%3E%20(schema)>)

<details>

<summary>

QueryGetResponse object {id, account\_id, alert\_enabled, 10 more }

</summary>

id: number

Unique identifier for the saved query

<a href="#">Link to this property</a>

account\_id: number

Account ID

<a href="#">Link to this property</a>

alert\_enabled: boolean

Whether alerts are enabled

<a href="#">Link to this property</a>

alert\_rollup\_enabled: boolean

Whether alert rollup is enabled

<a href="#">Link to this property</a>

created\_at: string

Creation timestamp

<a href="#">Link to this property</a>

name: string

Name of the saved query

<a href="#">Link to this property</a>

query\_json: string

JSON string containing the query parameters

<a href="#">Link to this property</a>

rule\_enabled: boolean

Whether rule is enabled

<a href="#">Link to this property</a>

updated\_at: string

Last update timestamp

<a href="#">Link to this property</a>

user\_email: string

Email of the user who created the query

<a href="#">Link to this property</a>

custom\_threat\_feed\_id: optional number

Intel Indicator Feed ID (numeric)

<a href="#">Link to this property</a>

rule\_list\_id: optional string

WAF rules list ID for blocking

<a href="#">Link to this property</a>

rule\_scope: optional string

Scope for the rule

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_get_response%20%3E%20(schema)>)

<details>

<summary>

QueryEditResponse object {id, account\_id, alert\_enabled, 10 more }

</summary>

id: number

Unique identifier for the saved query

<a href="#">Link to this property</a>

account\_id: number

Account ID

<a href="#">Link to this property</a>

alert\_enabled: boolean

Whether alerts are enabled

<a href="#">Link to this property</a>

alert\_rollup\_enabled: boolean

Whether alert rollup is enabled

<a href="#">Link to this property</a>

created\_at: string

Creation timestamp

<a href="#">Link to this property</a>

name: string

Name of the saved query

<a href="#">Link to this property</a>

query\_json: string

JSON string containing the query parameters

<a href="#">Link to this property</a>

rule\_enabled: boolean

Whether rule is enabled

<a href="#">Link to this property</a>

updated\_at: string

Last update timestamp

<a href="#">Link to this property</a>

user\_email: string

Email of the user who created the query

<a href="#">Link to this property</a>

custom\_threat\_feed\_id: optional number

Intel Indicator Feed ID (numeric)

<a href="#">Link to this property</a>

rule\_list\_id: optional string

WAF rules list ID for blocking

<a href="#">Link to this property</a>

rule\_scope: optional string

Scope for the rule

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.queries%20%3E%20(model)%20query_edit_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsRelationships

##### [Filter and list events related to specific event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/relationships/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/{event\_id}/relationships

##### ModelsExpand Collapse

<details>

<summary>

RelationshipListResponse = array of object {attacker, attackerCountry, attackerCountryAlpha3, 26 more }

</summary>

attacker: string

<a href="#">Link to this property</a>

attackerCountry: string

<a href="#">Link to this property</a>

attackerCountryAlpha3: string

<a href="#">Link to this property</a>

category: string

<a href="#">Link to this property</a>

datasetId: string

<a href="#">Link to this property</a>

date: string

<a href="#">Link to this property</a>

event: string

<a href="#">Link to this property</a>

hasChildren: boolean

<a href="#">Link to this property</a>

indicator: string

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

indicatorTypeId: number

<a href="#">Link to this property</a>

killChain: number

<a href="#">Link to this property</a>

mitreAttack: array of string

<a href="#">Link to this property</a>

mitreCapec: array of string

<a href="#">Link to this property</a>

numReferenced: number

<a href="#">Link to this property</a>

numReferences: number

<a href="#">Link to this property</a>

rawId: string

<a href="#">Link to this property</a>

referenced: array of string

<a href="#">Link to this property</a>

referencedIds: array of number

<a href="#">Link to this property</a>

references: array of string

<a href="#">Link to this property</a>

referencesIds: array of number

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

targetCountry: string

<a href="#">Link to this property</a>

targetCountryAlpha3: string

<a href="#">Link to this property</a>

targetIndustry: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

insight: optional string

<a href="#">Link to this property</a>

releasabilityId: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.relationships%20%3E%20(model)%20relationship_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsIndicators

##### [Lists indicators across multiple datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/indicators

##### ModelsExpand Collapse

<details>

<summary>

IndicatorListResponse object {properties, type }

</summary>

<details>

<summary>

properties: object {completeness, indicators, pagination }

</summary>

<details>

<summary>

completeness: object {properties, type }

</summary>

<details>

<summary>

properties: object {complete, failedDatasets, failedShards, warnings }

</summary>

<details>

<summary>

complete: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

failedDatasets: object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

failedShards: object {items, type }

</summary>

<details>

<summary>

items: object {properties, type }

</summary>

<details>

<summary>

properties: object {datasetId, shardId }

</summary>

<details>

<summary>

datasetId: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

shardId: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

warnings: object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

indicators: object {items, type }

</summary>

<details>

<summary>

items: object {createdAt, indicatorType, sources, 7 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

<details>

<summary>

sources: array of object {resourceId, resourceType, system }

RSS article sources from which this indicator was extracted.

</summary>

resourceId: string

formatuuid

<a href="#">Link to this property</a>

resourceType: "article"

<a href="#">Link to this property</a>

system: "threat-signals"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: string

formatdate-time

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

<a href="#">Link to this property</a>

<details>

<summary>

relatedEvents: optional array of object {datasetId, eventId, eventDate }

</summary>

datasetId: string

<a href="#">Link to this property</a>

eventId: string

<a href="#">Link to this property</a>

eventDate: optional string

ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {categoryId, categoryName, uuid, value }

</summary>

categoryId: optional string

The UUID of the tag category, or null when the tag is uncategorized.

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

uuid: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pagination: object {properties, type }

</summary>

<details>

<summary>

properties: object {count, cursor, has\_more, 4 more }

</summary>

<details>

<summary>

count: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cursor: object {description, nullable, type }

</summary>

description: string

<a href="#">Link to this property</a>

nullable: boolean

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

has\_more: object {description, type }

</summary>

description: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

page: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

per\_page: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

total\_count: object {description, nullable, type }

</summary>

description: string

<a href="#">Link to this property</a>

nullable: boolean

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

total\_count\_is\_exact: object {description, type }

</summary>

description: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators%20%3E%20(model)%20indicator_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsIndicatorsAggregate

##### [Aggregate indicators by column(s)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/aggregate/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/indicators/aggregate

##### ModelsExpand Collapse

<details>

<summary>

AggregateListResponse object {aggregateBy, aggregations, failedDatasets, total }

</summary>

aggregateBy: string

Column(s) that were aggregated by

<a href="#">Link to this property</a>

<details>

<summary>

aggregations: array of object {count }

Array of aggregation results with dynamic fields based on aggregateBy columns

</summary>

count: number

Number of indicators for this aggregation

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

failedDatasets: number

Number of datasets whose aggregation failed and were excluded from the result

<a href="#">Link to this property</a>

total: number

Total count in the aggregation: indicator rows when measure=indicators, or linked-event rows when measure=relationships

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsIndicatorsTypes

##### [Lists indicator types across multiple datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/types/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/indicator-types

##### ModelsExpand Collapse

<details>

<summary>

TypeListResponse object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.types%20%3E%20(model)%20type_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsIndicatorsBy Dataset

##### [Lists indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset/methods/list)

Deprecated

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators

##### [Reads an indicator](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators/{indicator\_id}

##### ModelsExpand Collapse

<details>

<summary>

ByDatasetListResponse object {indicators, pagination }

</summary>

<details>

<summary>

indicators: array of object {createdAt, indicatorType, sources, 7 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

<details>

<summary>

sources: array of object {resourceId, resourceType, system }

RSS article sources from which this indicator was extracted.

</summary>

resourceId: string

formatuuid

<a href="#">Link to this property</a>

resourceType: "article"

<a href="#">Link to this property</a>

system: "threat-signals"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: string

formatdate-time

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

<a href="#">Link to this property</a>

<details>

<summary>

relatedEvents: optional array of object {datasetId, eventId, eventDate }

</summary>

datasetId: string

<a href="#">Link to this property</a>

eventId: string

<a href="#">Link to this property</a>

eventDate: optional string

ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {categoryId, categoryName, uuid, value }

</summary>

categoryId: optional string

The UUID of the tag category, or null when the tag is uncategorized.

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

uuid: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pagination: object {page, pageSize, totalCount, totalPages }

</summary>

page: number

<a href="#">Link to this property</a>

pageSize: number

<a href="#">Link to this property</a>

totalCount: number

<a href="#">Link to this property</a>

totalPages: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_list_response%20%3E%20(schema)>)

<details>

<summary>

ByDatasetGetResponse object {createdAt, indicatorType, updatedAt, 6 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

updatedAt: string

formatdate-time

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

<a href="#">Link to this property</a>

<details>

<summary>

relatedEvents: optional array of object {datasetId, eventId, eventDate }

</summary>

datasetId: string

<a href="#">Link to this property</a>

eventId: string

<a href="#">Link to this property</a>

eventDate: optional string

ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {categoryId, categoryName, uuid, value }

</summary>

categoryId: optional string

The UUID of the tag category, or null when the tag is uncategorized.

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

uuid: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset%20%3E%20(model)%20by_dataset_get_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsIndicatorsBy DatasetTags

##### [List mirrored tags for an indicator dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/by_dataset/subresources/tags/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/indicators/tags

##### ModelsExpand Collapse

TagListResponse = array of unknown

Array of mirror tag rows

[Link to this property](#)%20cloudforce_one.threat_events.indicators.by_dataset.tags%20%3E%20(model)%20tag_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsAttackers

##### [Lists attackers across multiple datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/attackers/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/attackers

##### ModelsExpand Collapse

<details>

<summary>

AttackerListResponse object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.attackers%20%3E%20(model)%20attacker_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsCategories

##### [Lists categories across multiple datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/categories

##### [Reads a category](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/categories/{category\_id}

##### [Creates a new category](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/categories/create

##### [Updates a category](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/categories/{category\_id}

##### [Deletes a category](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/categories/{category\_id}

##### ModelsExpand Collapse

<details>

<summary>

CategoryListResponse = array of object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_list_response%20%3E%20(schema)>)

<details>

<summary>

CategoryGetResponse object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_get_response%20%3E%20(schema)>)

<details>

<summary>

CategoryCreateResponse object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)>)

<details>

<summary>

CategoryEditResponse object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)>)

<details>

<summary>

CategoryDeleteResponse object {uuid }

</summary>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_delete_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsCategoriesCatalog

##### [Lists categories](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/subresources/catalog/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/categories/catalog

##### ModelsExpand Collapse

<details>

<summary>

CatalogListResponse = array of object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsCountries

##### [Retrieves countries information for all countries](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/countries/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/countries

##### ModelsExpand Collapse

<details>

<summary>

CountryListResponse = array of object {result, success }

</summary>

<details>

<summary>

result: array of object {alpha2, alpha3, name }

</summary>

alpha2: string

<a href="#">Link to this property</a>

alpha3: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.countries%20%3E%20(model)%20country_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsCrons

#### Cloudforce OneThreat EventsDatasets

##### [Lists all datasets in an account](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/dataset

##### [Reads a dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}

##### [Creates a dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/dataset/create

##### [Updates an existing dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}

##### [Delete a dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}

##### [Reads raw data for an event by UUID](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/raw)

GET/accounts/{account\_id}/cloudforce-one/events/raw/{dataset\_id}/{event\_id}

##### ModelsExpand Collapse

<details>

<summary>

DatasetListResponse = array of object {indicatorWriteMode, isAnalytics, isPublic, 3 more }

</summary>

<details>

<summary>

indicatorWriteMode: "read\_only"or "create\_only"or "full"

Effective indicator mutation capability after account/dataset authorization and dataset storage capability are applied. API Gateway method permissions are separate and must also allow the requested operation.

</summary>

One of the following:

"read\_only"

<a href="#">Link to this property</a>

"create\_only"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isAnalytics: boolean

<a href="#">Link to this property</a>

isPublic: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

deletedAt: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)>)

<details>

<summary>

DatasetGetResponse object {isAnalytics, isPublic, name, uuid }

</summary>

isAnalytics: boolean

<a href="#">Link to this property</a>

isPublic: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_get_response%20%3E%20(schema)>)

<details>

<summary>

DatasetCreateResponse object {isAnalytics, isPublic, name, uuid }

</summary>

isAnalytics: boolean

<a href="#">Link to this property</a>

isPublic: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_create_response%20%3E%20(schema)>)

<details>

<summary>

DatasetEditResponse object {isAnalytics, isPublic, name, uuid }

</summary>

isAnalytics: boolean

<a href="#">Link to this property</a>

isPublic: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_edit_response%20%3E%20(schema)>)

<details>

<summary>

DatasetDeleteResponse object {name, uuid }

</summary>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_delete_response%20%3E%20(schema)>)

<details>

<summary>

DatasetRawResponse object {id, accountId, created, 3 more }

</summary>

id: number

<a href="#">Link to this property</a>

accountId: number

<a href="#">Link to this property</a>

created: string

<a href="#">Link to this property</a>

data: string

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets%20%3E%20(model)%20dataset_raw_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsDatasetsHealth

#### Cloudforce OneThreat EventsDatasetsEvents

##### [Reads an event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/subresources/events/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/events/{event\_id}

##### ModelsExpand Collapse

<details>

<summary>

EventGetResponse object {attacker, attackerCountry, attackerCountryAlpha3, 26 more }

</summary>

attacker: string

<a href="#">Link to this property</a>

attackerCountry: string

<a href="#">Link to this property</a>

attackerCountryAlpha3: string

<a href="#">Link to this property</a>

category: string

<a href="#">Link to this property</a>

datasetId: string

<a href="#">Link to this property</a>

date: string

<a href="#">Link to this property</a>

event: string

<a href="#">Link to this property</a>

hasChildren: boolean

<a href="#">Link to this property</a>

indicator: string

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

indicatorTypeId: number

<a href="#">Link to this property</a>

killChain: number

<a href="#">Link to this property</a>

mitreAttack: array of string

<a href="#">Link to this property</a>

mitreCapec: array of string

<a href="#">Link to this property</a>

numReferenced: number

<a href="#">Link to this property</a>

numReferences: number

<a href="#">Link to this property</a>

rawId: string

<a href="#">Link to this property</a>

referenced: array of string

<a href="#">Link to this property</a>

referencedIds: array of number

<a href="#">Link to this property</a>

references: array of string

<a href="#">Link to this property</a>

referencesIds: array of number

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

targetCountry: string

<a href="#">Link to this property</a>

targetCountryAlpha3: string

<a href="#">Link to this property</a>

targetIndustry: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

insight: optional string

<a href="#">Link to this property</a>

releasabilityId: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.datasets.events%20%3E%20(model)%20event_get_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsRaw

##### [Reads data for a raw event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/raw/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/{event\_id}/raw/{raw\_id}

##### [Updates a raw event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/raw/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/{event\_id}/raw/{raw\_id}

##### ModelsExpand Collapse

<details>

<summary>

RawGetResponse object {id, accountId, created, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

accountId: number

<a href="#">Link to this property</a>

created: string

<a href="#">Link to this property</a>

data: unknown

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_get_response%20%3E%20(schema)>)

<details>

<summary>

RawEditResponse object {id, data }

</summary>

id: string

<a href="#">Link to this property</a>

data: unknown

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_edit_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsRelate

##### [Removes an event reference](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/relate/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/relate/{event\_id}

##### ModelsExpand Collapse

<details>

<summary>

RelateDeleteResponse object {success }

</summary>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.relate%20%3E%20(model)%20relate_delete_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsTags

##### [Lists all tags (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/tags

##### [Creates a new tag](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/tags/create

##### [Updates a tag (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/tags/{tag\_uuid}

##### [Deletes a tag (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/tags/{tag\_uuid}

##### ModelsExpand Collapse

<details>

<summary>

TagListResponse object {pagination, tags }

</summary>

<details>

<summary>

pagination: object {page, pageSize, totalCount, totalPages }

</summary>

page: number

<a href="#">Link to this property</a>

pageSize: number

<a href="#">Link to this property</a>

totalCount: number

<a href="#">Link to this property</a>

totalPages: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tags: array of object {uuid, value, activeDuration, 34 more }

</summary>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

activeDuration: optional string

<a href="#">Link to this property</a>

<details>

<summary>

activeDuration\_annotated: optional object {value, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

actorCategory: optional string

<a href="#">Link to this property</a>

<details>

<summary>

actorCategory\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

aliases: optional array of object {value, confidence, tlp }

Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purple are removed for non-CFONE accounts).

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

maximum10

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

aliasGroupNames: optional array of string

<a href="#">Link to this property</a>

aliasGroupNamesInternal: optional array of string

<a href="#">Link to this property</a>

attributionOrganization: optional string

<a href="#">Link to this property</a>

<details>

<summary>

attributionOrganization\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

categoryUuid: optional string

<a href="#">Link to this property</a>

confidence: optional number

Overall tag confidence (1-10).

maximum10

minimum1

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

dateOfDiscovery: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

externalReferenceLinks: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

externalReferences: optional array of object {url, description }

Structured external references ({ url, description }). Public: returned to all accounts.

</summary>

url: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

externalReferences\_annotated: optional array of object {value, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

internalAliases: optional array of object {value, confidence, tlp }

Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

maximum10

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

internalDescription: optional string

<a href="#">Link to this property</a>

lastSeen: optional string

<a href="#">Link to this property</a>

motive: optional string

<a href="#">Link to this property</a>

<details>

<summary>

motive\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

opsecLevel: optional string

<a href="#">Link to this property</a>

<details>

<summary>

opsecLevel\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

originCountryISO: optional string

ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.

<a href="#">Link to this property</a>

<details>

<summary>

originCountryISO\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

<details>

<summary>

priority\_annotated: optional object {value, tlp }

</summary>

value: number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Parsed custom field values. Null when the tag has no custom fields.

<a href="#">Link to this property</a>

sophisticationLevel: optional string

<a href="#">Link to this property</a>

<details>

<summary>

sophisticationLevel\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

Tag-level TLP handling marking.

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_list_response%20%3E%20(schema)>)

<details>

<summary>

TagCreateResponse object {uuid, value, activeDuration, 34 more }

</summary>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

activeDuration: optional string

<a href="#">Link to this property</a>

<details>

<summary>

activeDuration\_annotated: optional object {value, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

actorCategory: optional string

<a href="#">Link to this property</a>

<details>

<summary>

actorCategory\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

aliases: optional array of object {value, confidence, tlp }

Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purple are removed for non-CFONE accounts).

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

maximum10

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

aliasGroupNames: optional array of string

<a href="#">Link to this property</a>

aliasGroupNamesInternal: optional array of string

<a href="#">Link to this property</a>

attributionOrganization: optional string

<a href="#">Link to this property</a>

<details>

<summary>

attributionOrganization\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

categoryUuid: optional string

<a href="#">Link to this property</a>

confidence: optional number

Overall tag confidence (1-10).

maximum10

minimum1

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

dateOfDiscovery: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

externalReferenceLinks: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

externalReferences: optional array of object {url, description }

Structured external references ({ url, description }). Public: returned to all accounts.

</summary>

url: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

externalReferences\_annotated: optional array of object {value, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

internalAliases: optional array of object {value, confidence, tlp }

Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

maximum10

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

internalDescription: optional string

<a href="#">Link to this property</a>

lastSeen: optional string

<a href="#">Link to this property</a>

motive: optional string

<a href="#">Link to this property</a>

<details>

<summary>

motive\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

opsecLevel: optional string

<a href="#">Link to this property</a>

<details>

<summary>

opsecLevel\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

originCountryISO: optional string

ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.

<a href="#">Link to this property</a>

<details>

<summary>

originCountryISO\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

<details>

<summary>

priority\_annotated: optional object {value, tlp }

</summary>

value: number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Parsed custom field values. Null when the tag has no custom fields.

<a href="#">Link to this property</a>

sophisticationLevel: optional string

<a href="#">Link to this property</a>

<details>

<summary>

sophisticationLevel\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

Tag-level TLP handling marking.

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_create_response%20%3E%20(schema)>)

<details>

<summary>

TagEditResponse object {uuid, value, activeDuration, 34 more }

</summary>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

activeDuration: optional string

<a href="#">Link to this property</a>

<details>

<summary>

activeDuration\_annotated: optional object {value, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

actorCategory: optional string

<a href="#">Link to this property</a>

<details>

<summary>

actorCategory\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

aliases: optional array of object {value, confidence, tlp }

Structured aliases ({ value, confidence 1-10, tlp }). Public: returned to all accounts with per-entry TLP filtering (entries with tlp: purple are removed for non-CFONE accounts).

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

maximum10

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

aliasGroupNames: optional array of string

<a href="#">Link to this property</a>

aliasGroupNamesInternal: optional array of string

<a href="#">Link to this property</a>

attributionOrganization: optional string

<a href="#">Link to this property</a>

<details>

<summary>

attributionOrganization\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

categoryUuid: optional string

<a href="#">Link to this property</a>

confidence: optional number

Overall tag confidence (1-10).

maximum10

minimum1

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

dateOfDiscovery: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

externalReferenceLinks: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

externalReferences: optional array of object {url, description }

Structured external references ({ url, description }). Public: returned to all accounts.

</summary>

url: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

externalReferences\_annotated: optional array of object {value, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

internalAliases: optional array of object {value, confidence, tlp }

Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

maximum10

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

internalDescription: optional string

<a href="#">Link to this property</a>

lastSeen: optional string

<a href="#">Link to this property</a>

motive: optional string

<a href="#">Link to this property</a>

<details>

<summary>

motive\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

opsecLevel: optional string

<a href="#">Link to this property</a>

<details>

<summary>

opsecLevel\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

originCountryISO: optional string

ISO country code (alpha-2 or alpha-3). Normalized to uppercase on read. Null when stored value is blank/whitespace.

<a href="#">Link to this property</a>

<details>

<summary>

originCountryISO\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

<details>

<summary>

priority\_annotated: optional object {value, tlp }

</summary>

value: number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Parsed custom field values. Null when the tag has no custom fields.

<a href="#">Link to this property</a>

sophisticationLevel: optional string

<a href="#">Link to this property</a>

<details>

<summary>

sophisticationLevel\_annotated: optional object {value, confidence, tlp }

</summary>

value: string

<a href="#">Link to this property</a>

confidence: optional number

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tlp: optional "red"or "amber"or "amber-strict"or 4 more

Tag-level TLP handling marking.

</summary>

One of the following:

"red"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"purple"

<a href="#">Link to this property</a>

"amber+strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_edit_response%20%3E%20(schema)>)

<details>

<summary>

TagDeleteResponse object {uuid }

</summary>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags%20%3E%20(model)%20tag_delete_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsTagsCategories

##### [Lists all tag categories (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/tags/categories

##### [Creates a new tag category (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/tags/categories/create

##### [Updates a tag category (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/tags/categories/{category\_uuid}

##### [Deletes a tag category (SoT)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/categories/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/tags/categories/{category\_uuid}

##### ModelsExpand Collapse

<details>

<summary>

CategoryListResponse object {categories }

</summary>

<details>

<summary>

categories: array of object {name, uuid, createdAt, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional array of object {key, kind, allowedValues, 11 more }

Parsed FieldDefinition\[] defining custom fields for this category, or null if none.

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

kind: "string"or "number"or "enum"or 3 more

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"enum"

<a href="#">Link to this property</a>

"date"

<a href="#">Link to this property</a>

"array"

<a href="#">Link to this property</a>

"object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowedValues: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {confidence, tlp }

</summary>

confidence: optional boolean

<a href="#">Link to this property</a>

tlp: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

deprecated: optional boolean

Marks a field as unavailable for new values while retaining its definition for historical values.

<a href="#">Link to this property</a>

deprecatedValues: optional array of string

Enum values unavailable for new writes but retained in allowedValues for historical display.

<a href="#">Link to this property</a>

element: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

enforcement: optional "error"or "warn"or "off"

</summary>

One of the following:

"error"

<a href="#">Link to this property</a>

"warn"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional "date"or "url"or "duration"or "country"

</summary>

One of the following:

"date"

<a href="#">Link to this property</a>

"url"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"country"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

maxLength128

minLength1

<a href="#">Link to this property</a>

maxLength: optional number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

numberConstraint: optional object {integer, max, min }

</summary>

integer: optional boolean

<a href="#">Link to this property</a>

max: optional number

<a href="#">Link to this property</a>

min: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Map of property key to FieldDefinition for object fields. Required when kind is ‘object’. See FieldDefinition (recursive).

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_list_response%20%3E%20(schema)>)

<details>

<summary>

CategoryCreateResponse object {name, uuid, createdAt, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional array of object {key, kind, allowedValues, 11 more }

Parsed FieldDefinition\[] defining custom fields for this category, or null if none.

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

kind: "string"or "number"or "enum"or 3 more

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"enum"

<a href="#">Link to this property</a>

"date"

<a href="#">Link to this property</a>

"array"

<a href="#">Link to this property</a>

"object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowedValues: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {confidence, tlp }

</summary>

confidence: optional boolean

<a href="#">Link to this property</a>

tlp: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

deprecated: optional boolean

Marks a field as unavailable for new values while retaining its definition for historical values.

<a href="#">Link to this property</a>

deprecatedValues: optional array of string

Enum values unavailable for new writes but retained in allowedValues for historical display.

<a href="#">Link to this property</a>

element: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

enforcement: optional "error"or "warn"or "off"

</summary>

One of the following:

"error"

<a href="#">Link to this property</a>

"warn"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional "date"or "url"or "duration"or "country"

</summary>

One of the following:

"date"

<a href="#">Link to this property</a>

"url"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"country"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

maxLength128

minLength1

<a href="#">Link to this property</a>

maxLength: optional number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

numberConstraint: optional object {integer, max, min }

</summary>

integer: optional boolean

<a href="#">Link to this property</a>

max: optional number

<a href="#">Link to this property</a>

min: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Map of property key to FieldDefinition for object fields. Required when kind is ‘object’. See FieldDefinition (recursive).

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)>)

<details>

<summary>

CategoryEditResponse object {name, uuid, createdAt, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

schema: optional array of object {key, kind, allowedValues, 11 more }

Parsed FieldDefinition\[] defining custom fields for this category, or null if none.

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

kind: "string"or "number"or "enum"or 3 more

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"enum"

<a href="#">Link to this property</a>

"date"

<a href="#">Link to this property</a>

"array"

<a href="#">Link to this property</a>

"object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowedValues: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {confidence, tlp }

</summary>

confidence: optional boolean

<a href="#">Link to this property</a>

tlp: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

deprecated: optional boolean

Marks a field as unavailable for new values while retaining its definition for historical values.

<a href="#">Link to this property</a>

deprecatedValues: optional array of string

Enum values unavailable for new writes but retained in allowedValues for historical display.

<a href="#">Link to this property</a>

element: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

enforcement: optional "error"or "warn"or "off"

</summary>

One of the following:

"error"

<a href="#">Link to this property</a>

"warn"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

format: optional "date"or "url"or "duration"or "country"

</summary>

One of the following:

"date"

<a href="#">Link to this property</a>

"url"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"country"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

maxLength128

minLength1

<a href="#">Link to this property</a>

maxLength: optional number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

numberConstraint: optional object {integer, max, min }

</summary>

integer: optional boolean

<a href="#">Link to this property</a>

max: optional number

<a href="#">Link to this property</a>

min: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

properties: optional map\[unknown]

Map of property key to FieldDefinition for object fields. Required when kind is ‘object’. See FieldDefinition (recursive).

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedAt: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)>)

<details>

<summary>

CategoryDeleteResponse object {uuid }

</summary>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.categories%20%3E%20(model)%20category_delete_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsTagsIndicators

##### [List indicators related to a tag](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/indicators/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/tags/{tag\_uuid}/indicators

##### ModelsExpand Collapse

<details>

<summary>

IndicatorListResponse object {indicators, pagination }

</summary>

<details>

<summary>

indicators: array of object {createdAt, indicatorType, updatedAt, 6 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

updatedAt: string

formatdate-time

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

<a href="#">Link to this property</a>

<details>

<summary>

relatedEvents: optional array of object {datasetId, eventId, eventDate }

</summary>

datasetId: string

<a href="#">Link to this property</a>

eventId: string

<a href="#">Link to this property</a>

eventDate: optional string

ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {categoryId, categoryName, uuid, value }

</summary>

categoryId: optional string

The UUID of the tag category, or null when the tag is uncategorized.

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

uuid: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pagination: object {page, pageSize, totalCount, totalPages }

</summary>

page: number

<a href="#">Link to this property</a>

pageSize: number

<a href="#">Link to this property</a>

totalCount: number

<a href="#">Link to this property</a>

totalPages: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators%20%3E%20(model)%20indicator_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsTagsIndicatorsBy Dataset

##### [List indicators related to a tag within a dataset (deprecated)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/tags/subresources/indicators/subresources/by_dataset/methods/list)

Deprecated

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/tags/{tag\_uuid}/indicators

##### ModelsExpand Collapse

<details>

<summary>

ByDatasetListResponse object {indicators, pagination }

</summary>

<details>

<summary>

indicators: array of object {createdAt, indicatorType, updatedAt, 6 more }

</summary>

createdAt: string

formatdate-time

<a href="#">Link to this property</a>

indicatorType: string

<a href="#">Link to this property</a>

updatedAt: string

formatdate-time

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

datasetId: optional string

The dataset ID this indicator belongs to. Included in list responses.

<a href="#">Link to this property</a>

<details>

<summary>

relatedEvents: optional array of object {datasetId, eventId, eventDate }

</summary>

datasetId: string

<a href="#">Link to this property</a>

eventId: string

<a href="#">Link to this property</a>

eventDate: optional string

ISO 8601 date of the related event. Null for legacy relationships created before event-date tracking was added.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {categoryId, categoryName, uuid, value }

</summary>

categoryId: optional string

The UUID of the tag category, or null when the tag is uncategorized.

<a href="#">Link to this property</a>

categoryName: optional string

<a href="#">Link to this property</a>

uuid: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tlp: optional string

Traffic Light Protocol designation. UPPERCASE. Possible values: CLEAR, GREEN, AMBER, AMBER-STRICT, RED, PURPLE. Null when not set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pagination: object {page, pageSize, totalCount, totalPages }

</summary>

page: number

<a href="#">Link to this property</a>

pageSize: number

<a href="#">Link to this property</a>

totalCount: number

<a href="#">Link to this property</a>

totalPages: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.tags.indicators.by_dataset%20%3E%20(model)%20by_dataset_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsEvent Tags

##### [Adds a tag to an event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/event_tags/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/event\_tag/{event\_id}/create

##### [Removes a tag from an event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/event_tags/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/event\_tag/{event\_id}

##### ModelsExpand Collapse

<details>

<summary>

EventTagCreateResponse object {success }

</summary>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.event_tags%20%3E%20(model)%20event_tag_create_response%20%3E%20(schema)>)

<details>

<summary>

EventTagDeleteResponse object {success }

</summary>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.event_tags%20%3E%20(model)%20event_tag_delete_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsTarget Industries

##### [Lists target industries across multiple datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/target_industries/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/targetIndustries

##### ModelsExpand Collapse

<details>

<summary>

TargetIndustryListResponse object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.target_industries%20%3E%20(model)%20target_industry_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsTarget IndustriesBy Dataset

##### [Lists all target industries for a specific dataset](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/target_industries/subresources/by_dataset/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/dataset/{dataset\_id}/targetIndustries

##### ModelsExpand Collapse

<details>

<summary>

ByDatasetListResponse object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.target_industries.by_dataset%20%3E%20(model)%20by_dataset_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsTarget IndustriesCatalog

##### [Lists all target industries from industry map catalog](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/target_industries/subresources/catalog/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/targetIndustries/catalog

##### ModelsExpand Collapse

<details>

<summary>

CatalogListResponse object {items, type }

</summary>

<details>

<summary>

items: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.target_industries.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)>)

#### Cloudforce OneThreat EventsInsights