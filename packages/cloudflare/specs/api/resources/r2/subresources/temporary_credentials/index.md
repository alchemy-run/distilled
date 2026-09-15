---
title: Temporary Credentials
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Temporary Credentials

##### [Create Temporary Access Credentials](https://developers.cloudflare.com/api/resources/r2/subresources/temporary_credentials/methods/create)

POST/accounts/{account\_id}/r2/temp-access-credentials

##### ModelsExpand Collapse

<details>

<summary>

TemporaryCredential object {bucket, parentAccessKeyId, permission, 3 more }

</summary>

bucket: string

Name of the R2 bucket.

<a href="#">Link to this property</a>

parentAccessKeyId: string

The parent access key id to use for signing.

<a href="#">Link to this property</a>

<details>

<summary>

permission: "admin-read-write"or "admin-read-only"or "object-read-write"or "object-read-only"

Permissions allowed on the credentials.

</summary>

One of the following:

"admin-read-write"

<a href="#">Link to this property</a>

"admin-read-only"

<a href="#">Link to this property</a>

"object-read-write"

<a href="#">Link to this property</a>

"object-read-only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ttlSeconds: number

How long the credentials will live for in seconds.

maximum604800

<a href="#">Link to this property</a>

objects: optional array of string

Optional object paths to scope the credentials to.

<a href="#">Link to this property</a>

prefixes: optional array of string

Optional prefix paths to scope the credentials to.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(model)%20temporary_credential%20%3E%20(schema)>)

<details>

<summary>

TemporaryCredentialCreateResponse object {accessKeyId, secretAccessKey, sessionToken }

</summary>

accessKeyId: optional string

ID for new access key.

<a href="#">Link to this property</a>

secretAccessKey: optional string

Secret access key.

<a href="#">Link to this property</a>

sessionToken: optional string

Security token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(model)%20temporary_credential_create_response%20%3E%20(schema)>)