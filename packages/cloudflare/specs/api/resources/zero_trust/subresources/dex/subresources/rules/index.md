---
title: Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rules

##### [Get DEX Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/get)

GET/accounts/{account\_id}/dex/rules/{rule\_id}

##### [Delete a DEX Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/delete)

DELETE/accounts/{account\_id}/dex/rules/{rule\_id}

##### [Update a DEX Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/update)

PATCH/accounts/{account\_id}/dex/rules/{rule\_id}

##### [Create a DEX Rule](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/create)

POST/accounts/{account\_id}/dex/rules

##### [List DEX Rules](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules/methods/list)

GET/accounts/{account\_id}/dex/rules

##### ModelsExpand Collapse

<details>

<summary>

RuleGetResponse object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_get_response%20%3E%20(schema)>)

RuleDeleteResponse = boolean

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_delete_response%20%3E%20(schema)>)

<details>

<summary>

RuleUpdateResponse object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_update_response%20%3E%20(schema)>)

<details>

<summary>

RuleCreateResponse object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_create_response%20%3E%20(schema)>)

<details>

<summary>

RuleListResponse object {rules }

</summary>

<details>

<summary>

rules: optional array of object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(model)%20rule_list_response%20%3E%20(schema)>)