---
title: Snippets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Snippets

##### [List zone snippets](https://developers.cloudflare.com/api/resources/snippets/methods/list)

GET/zones/{zone\_id}/snippets

##### [Get a zone snippet](https://developers.cloudflare.com/api/resources/snippets/methods/get)

GET/zones/{zone\_id}/snippets/{snippet\_name}

##### [Update a zone snippet](https://developers.cloudflare.com/api/resources/snippets/methods/update)

PUT/zones/{zone\_id}/snippets/{snippet\_name}

##### [Delete a zone snippet](https://developers.cloudflare.com/api/resources/snippets/methods/delete)

DELETE/zones/{zone\_id}/snippets/{snippet\_name}

##### ModelsExpand Collapse

<details>

<summary>

SnippetListResponse object {created\_on, snippet\_name, modified\_on }

Define a snippet.

</summary>

created\_on: string

Indicates when the snippet was created.

formatdate-time

<a href="#">Link to this property</a>

snippet\_name: string

Identify the snippet.

<a href="#">Link to this property</a>

modified\_on: optional string

Indicates when the snippet was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(model)%20snippet_list_response%20%3E%20(schema)>)

<details>

<summary>

SnippetGetResponse object {created\_on, snippet\_name, modified\_on }

Contain the response result.

</summary>

created\_on: string

Indicates when the snippet was created.

formatdate-time

<a href="#">Link to this property</a>

snippet\_name: string

Identify the snippet.

<a href="#">Link to this property</a>

modified\_on: optional string

Indicates when the snippet was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(model)%20snippet_get_response%20%3E%20(schema)>)

<details>

<summary>

SnippetUpdateResponse object {created\_on, snippet\_name, modified\_on }

Contain the response result.

</summary>

created\_on: string

Indicates when the snippet was created.

formatdate-time

<a href="#">Link to this property</a>

snippet\_name: string

Identify the snippet.

<a href="#">Link to this property</a>

modified\_on: optional string

Indicates when the snippet was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20snippets%20%3E%20(model)%20snippet_update_response%20%3E%20(schema)>)

SnippetDeleteResponse = unknown

Contain the response result.

[Link to this property](#)%20snippets%20%3E%20(model)%20snippet_delete_response%20%3E%20(schema)>)

#### SnippetsContent

##### [Get a zone snippet content](https://developers.cloudflare.com/api/resources/snippets/subresources/content/methods/get)

GET/zones/{zone\_id}/snippets/{snippet\_name}/content

#### SnippetsRules

##### [List zone snippet rules](https://developers.cloudflare.com/api/resources/snippets/subresources/rules/methods/get)

GET/zones/{zone\_id}/snippets/snippet\_rules

##### [List zone snippet rules](https://developers.cloudflare.com/api/resources/snippets/subresources/rules/methods/list)

GET/zones/{zone\_id}/snippets/snippet\_rules

##### [Update zone snippet rules](https://developers.cloudflare.com/api/resources/snippets/subresources/rules/methods/update)

PUT/zones/{zone\_id}/snippets/snippet\_rules

##### [Delete zone snippet rules](https://developers.cloudflare.com/api/resources/snippets/subresources/rules/methods/delete)

DELETE/zones/{zone\_id}/snippets/snippet\_rules

##### ModelsExpand Collapse

RuleGetResponse = unknown

Contain the response result.

[Link to this property](#)%20snippets.rules%20%3E%20(model)%20rule_get_response%20%3E%20(schema)>)

RuleListResponse = unknown

Contain the response result.

[Link to this property](#)%20snippets.rules%20%3E%20(model)%20rule_list_response%20%3E%20(schema)>)

RuleUpdateResponse = unknown

Contain the response result.

[Link to this property](#)%20snippets.rules%20%3E%20(model)%20rule_update_response%20%3E%20(schema)>)

RuleDeleteResponse = unknown

Contain the response result.

[Link to this property](#)%20snippets.rules%20%3E%20(model)%20rule_delete_response%20%3E%20(schema)>)