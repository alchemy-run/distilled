---
title: Namespaces
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[KV](https://developers.cloudflare.com/api/resources/kv)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Namespaces

##### [List Namespaces](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/list)

GET/accounts/{account\_id}/storage/kv/namespaces

##### [Get a Namespace](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/get)

GET/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}

##### [Create a Namespace](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/create)

POST/accounts/{account\_id}/storage/kv/namespaces

##### [Rename a Namespace](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/update)

PUT/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}

##### [Remove a Namespace](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/delete)

DELETE/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}

##### [Write multiple key-value pairs](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/bulk_update)

PUT/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/bulk

##### [Delete multiple key-value pairs](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/bulk_delete)

POST/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/bulk/delete

##### [Get multiple key-value pairs](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/bulk_get)

POST/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/bulk/get

##### ModelsExpand Collapse

<details>

<summary>

Namespace object {id, title, jurisdiction, supports\_url\_encoding }

</summary>

id: string

Namespace identifier tag.

maxLength32

<a href="#">Link to this property</a>

title: string

A human-readable string name for a Namespace.

maxLength512

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "eu"or "fedramp"or "us"

Specify the jurisdiction to restrict the KV namespace to durably store data within. Can only be set at namespace creation time.

</summary>

One of the following:

"eu"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

supports\_url\_encoding: optional boolean

True if keys written on the URL will be URL-decoded before storing. For example, if set to “true”, a key written on the URL as “%3F” will be stored as ”?”.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces%20%3E%20(model)%20namespace%20%3E%20(schema)>)

NamespaceDeleteResponse object {}

[Link to this property](#)%20kv.namespaces%20%3E%20(model)%20namespace_delete_response%20%3E%20(schema)>)

<details>

<summary>

NamespaceBulkUpdateResponse object {successful\_key\_count, unsuccessful\_keys }

</summary>

successful\_key\_count: optional number

Number of keys successfully updated.

<a href="#">Link to this property</a>

unsuccessful\_keys: optional array of string

Name of the keys that failed to be fully updated. They should be retried.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces%20%3E%20(model)%20namespace_bulk_update_response%20%3E%20(schema)>)

<details>

<summary>

NamespaceBulkDeleteResponse object {successful\_key\_count, unsuccessful\_keys }

</summary>

successful\_key\_count: optional number

Number of keys successfully updated.

<a href="#">Link to this property</a>

unsuccessful\_keys: optional array of string

Name of the keys that failed to be fully updated. They should be retried.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces%20%3E%20(model)%20namespace_bulk_delete_response%20%3E%20(schema)>)

<details>

<summary>

NamespaceBulkGetResponse = object {values } or object {values }

</summary>

One of the following:

<details>

<summary>

WorkersKVBulkGetResult object {values }

</summary>

<details>

<summary>

values: optional map\[stringor numberor booleanor map\[unknown]]

Requested keys are paired with their values in an object.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersKVBulkGetResultWithMetadata object {values }

</summary>

<details>

<summary>

values: optional map\[object {metadata, value, expiration } ]

Requested keys are paired with their values and metadata in an object.

</summary>

metadata: unknown

The metadata associated with the key.

<a href="#">Link to this property</a>

value: unknown

The value associated with the key.

<a href="#">Link to this property</a>

expiration: optional number

Expires the key at a certain time, measured in number of seconds since the UNIX epoch.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces%20%3E%20(model)%20namespace_bulk_get_response%20%3E%20(schema)>)

#### NamespacesKeys

##### [List a Namespace's Keys](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/list)

GET/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/keys

##### [Write multiple key-value pairs](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk_update)

Deprecated

PUT/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/bulk

##### [Delete multiple key-value pairs](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk_delete)

Deprecated

POST/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/bulk/delete

##### [Get multiple key-value pairs](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk_get)

Deprecated

POST/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/bulk/get

##### ModelsExpand Collapse

<details>

<summary>

Key object {name, expiration, metadata }

A name for a value. A value stored under a given key may be retrieved via the same key.

</summary>

name: string

A key’s name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.

maxLength512

<a href="#">Link to this property</a>

expiration: optional number

The time, measured in number of seconds since the UNIX epoch, at which the key will expire. This property is omitted for keys that will not expire.

<a href="#">Link to this property</a>

metadata: optional unknown

Arbitrary JSON that is associated with a key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(model)%20key%20%3E%20(schema)>)

<details>

<summary>

KeyBulkUpdateResponse object {successful\_key\_count, unsuccessful\_keys }

</summary>

successful\_key\_count: optional number

Number of keys successfully updated.

<a href="#">Link to this property</a>

unsuccessful\_keys: optional array of string

Name of the keys that failed to be fully updated. They should be retried.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(model)%20key_bulk_update_response%20%3E%20(schema)>)

<details>

<summary>

KeyBulkDeleteResponse object {successful\_key\_count, unsuccessful\_keys }

</summary>

successful\_key\_count: optional number

Number of keys successfully updated.

<a href="#">Link to this property</a>

unsuccessful\_keys: optional array of string

Name of the keys that failed to be fully updated. They should be retried.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(model)%20key_bulk_delete_response%20%3E%20(schema)>)

<details>

<summary>

KeyBulkGetResponse = object {values } or object {values }

</summary>

One of the following:

<details>

<summary>

WorkersKVBulkGetResult object {values }

</summary>

<details>

<summary>

values: optional map\[stringor numberor booleanor map\[unknown]]

Requested keys are paired with their values in an object.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersKVBulkGetResultWithMetadata object {values }

</summary>

<details>

<summary>

values: optional map\[object {metadata, value, expiration } ]

Requested keys are paired with their values and metadata in an object.

</summary>

metadata: unknown

The metadata associated with the key.

<a href="#">Link to this property</a>

value: unknown

The value associated with the key.

<a href="#">Link to this property</a>

expiration: optional number

Expires the key at a certain time, measured in number of seconds since the UNIX epoch.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(model)%20key_bulk_get_response%20%3E%20(schema)>)

#### NamespacesMetadata

##### [Read the metadata for a key](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/metadata/methods/get)

GET/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/metadata/{key\_name}

##### ModelsExpand Collapse

MetadataGetResponse = unknown

Arbitrary JSON that is associated with a key.

[Link to this property](#)%20kv.namespaces.metadata%20%3E%20(model)%20metadata_get_response%20%3E%20(schema)>)

#### NamespacesValues

##### [Read key-value pair](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/values/methods/get)

GET/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/values/{key\_name}

##### [Write key-value pair with optional metadata](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/values/methods/update)

PUT/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/values/{key\_name}

##### [Delete key-value pair](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/values/methods/delete)

DELETE/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/values/{key\_name}

##### ModelsExpand Collapse

ValueUpdateResponse object {}

[Link to this property](#)%20kv.namespaces.values%20%3E%20(model)%20value_update_response%20%3E%20(schema)>)

ValueDeleteResponse object {}

[Link to this property](#)%20kv.namespaces.values%20%3E%20(model)%20value_delete_response%20%3E%20(schema)>)