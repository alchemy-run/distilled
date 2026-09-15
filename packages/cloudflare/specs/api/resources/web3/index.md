---
title: Web3
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Web3

#### Web3Hostnames

##### [List Web3 Hostnames](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/list)

GET/zones/{zone\_id}/web3/hostnames

##### [Web3 Hostname Details](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/get)

GET/zones/{zone\_id}/web3/hostnames/{identifier}

##### [Create Web3 Hostname](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/create)

POST/zones/{zone\_id}/web3/hostnames

##### [Edit Web3 Hostname](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/edit)

PATCH/zones/{zone\_id}/web3/hostnames/{identifier}

##### [Delete Web3 Hostname](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/methods/delete)

DELETE/zones/{zone\_id}/web3/hostnames/{identifier}

##### ModelsExpand Collapse

<details>

<summary>

Hostname object {id, created\_on, description, 5 more }

</summary>

id: optional string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specify an optional description of the hostname.

maxLength500

<a href="#">Link to this property</a>

dnslink: optional string

Specify the DNSLink value used if the target is ipfs.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Specify the hostname that points to the target gateway via CNAME.

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "deleting"or "error"

Specifies the status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target: optional "ethereum"or "ipfs"or "ipfs\_universal\_path"

Specify the target gateway of the hostname.

</summary>

One of the following:

"ethereum"

<a href="#">Link to this property</a>

"ipfs"

<a href="#">Link to this property</a>

"ipfs\_universal\_path"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames%20%3E%20(model)%20hostname%20%3E%20(schema)>)

<details>

<summary>

HostnameDeleteResponse object {id }

</summary>

id: string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames%20%3E%20(model)%20hostname_delete_response%20%3E%20(schema)>)

#### Web3HostnamesIPFS Universal Paths

#### Web3HostnamesIPFS Universal PathsContent Lists

##### [IPFS Universal Path Gateway Content List Details](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists/methods/get)

GET/zones/{zone\_id}/web3/hostnames/{identifier}/ipfs\_universal\_path/content\_list

##### [Update IPFS Universal Path Gateway Content List](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists/methods/update)

PUT/zones/{zone\_id}/web3/hostnames/{identifier}/ipfs\_universal\_path/content\_list

##### ModelsExpand Collapse

<details>

<summary>

ContentList object {action }

</summary>

action: optional "block"

Behavior of the content list.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists%20%3E%20(model)%20content_list%20%3E%20(schema)>)

#### Web3HostnamesIPFS Universal PathsContent ListsEntries

##### [List IPFS Universal Path Gateway Content List Entries](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists/subresources/entries/methods/list)

GET/zones/{zone\_id}/web3/hostnames/{identifier}/ipfs\_universal\_path/content\_list/entries

##### [IPFS Universal Path Gateway Content List Entry Details](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists/subresources/entries/methods/get)

GET/zones/{zone\_id}/web3/hostnames/{identifier}/ipfs\_universal\_path/content\_list/entries/{content\_list\_entry\_identifier}

##### [Create IPFS Universal Path Gateway Content List Entry](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists/subresources/entries/methods/create)

POST/zones/{zone\_id}/web3/hostnames/{identifier}/ipfs\_universal\_path/content\_list/entries

##### [Edit IPFS Universal Path Gateway Content List Entry](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists/subresources/entries/methods/update)

PUT/zones/{zone\_id}/web3/hostnames/{identifier}/ipfs\_universal\_path/content\_list/entries/{content\_list\_entry\_identifier}

##### [Delete IPFS Universal Path Gateway Content List Entry](https://developers.cloudflare.com/api/resources/web3/subresources/hostnames/subresources/ipfs_universal_paths/subresources/content_lists/subresources/entries/methods/delete)

DELETE/zones/{zone\_id}/web3/hostnames/{identifier}/ipfs\_universal\_path/content\_list/entries/{content\_list\_entry\_identifier}

##### ModelsExpand Collapse

<details>

<summary>

EntryListResponse object {entries }

</summary>

<details>

<summary>

entries: optional array of object {id, content, created\_on, 3 more }

Provides content list entries.

</summary>

id: optional string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

content: optional string

Specify the CID or content path of content to block.

maxLength500

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specify an optional description of the content list entry.

maxLength500

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "cid"or "content\_path"

Specify the type of content list entry to block.

</summary>

One of the following:

"cid"

<a href="#">Link to this property</a>

"content\_path"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(model)%20entry_list_response%20%3E%20(schema)>)

<details>

<summary>

EntryGetResponse object {id, content, created\_on, 3 more }

Specify a content list entry to block.

</summary>

id: optional string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

content: optional string

Specify the CID or content path of content to block.

maxLength500

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specify an optional description of the content list entry.

maxLength500

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "cid"or "content\_path"

Specify the type of content list entry to block.

</summary>

One of the following:

"cid"

<a href="#">Link to this property</a>

"content\_path"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(model)%20entry_get_response%20%3E%20(schema)>)

<details>

<summary>

EntryCreateResponse object {id, content, created\_on, 3 more }

Specify a content list entry to block.

</summary>

id: optional string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

content: optional string

Specify the CID or content path of content to block.

maxLength500

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specify an optional description of the content list entry.

maxLength500

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "cid"or "content\_path"

Specify the type of content list entry to block.

</summary>

One of the following:

"cid"

<a href="#">Link to this property</a>

"content\_path"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(model)%20entry_create_response%20%3E%20(schema)>)

<details>

<summary>

EntryUpdateResponse object {id, content, created\_on, 3 more }

Specify a content list entry to block.

</summary>

id: optional string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

content: optional string

Specify the CID or content path of content to block.

maxLength500

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Specify an optional description of the content list entry.

maxLength500

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "cid"or "content\_path"

Specify the type of content list entry to block.

</summary>

One of the following:

"cid"

<a href="#">Link to this property</a>

"content\_path"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(model)%20entry_update_response%20%3E%20(schema)>)

<details>

<summary>

EntryDeleteResponse object {id }

</summary>

id: string

Specify the identifier of the hostname.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20web3.hostnames.ipfs_universal_paths.content_lists.entries%20%3E%20(model)%20entry_delete_response%20%3E%20(schema)>)