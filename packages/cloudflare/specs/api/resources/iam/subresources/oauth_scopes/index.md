---
title: OAuth Scopes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IAM](https://developers.cloudflare.com/api/resources/iam)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# OAuth Scopes

##### [List OAuth Scopes](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_scopes/methods/list)

GET/oauth/scopes

##### ModelsExpand Collapse

<details>

<summary>

OAuthScopeListResponse object {id, name, category, scopes }

An available OAuth scope that can be assigned to an OAuth client.

</summary>

id: string

The scope label to use in the scopes array when creating or updating an OAuth client.

<a href="#">Link to this property</a>

name: string

Human-readable name of the OAuth scope.

<a href="#">Link to this property</a>

category: optional string

Category for grouping scopes in the UI.

<a href="#">Link to this property</a>

scopes: optional array of string

The underlying resource scopes (Bach scopes) that define which resources this OAuth scope can act upon.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_scopes%20%3E%20(model)%20oauth_scope_list_response%20%3E%20(schema)>)