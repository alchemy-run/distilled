---
title: Prefix Bindings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Data Localization Suite](https://developers.cloudflare.com/api/resources/dls)

[Regional Services](https://developers.cloudflare.com/api/resources/dls/subresources/regional_services)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Prefix Bindings

##### [List DLS prefix bindings for an account](https://developers.cloudflare.com/api/resources/dls/subresources/regional_services/subresources/prefix_bindings/methods/list)

GET/accounts/{account\_id}/dls/regional\_services/prefix\_bindings

##### [Get a DLS prefix binding](https://developers.cloudflare.com/api/resources/dls/subresources/regional_services/subresources/prefix_bindings/methods/get)

GET/accounts/{account\_id}/dls/regional\_services/prefix\_bindings/{binding\_id}

##### [Create a DLS prefix binding](https://developers.cloudflare.com/api/resources/dls/subresources/regional_services/subresources/prefix_bindings/methods/create)

POST/accounts/{account\_id}/dls/regional\_services/prefix\_bindings

##### [Update a DLS prefix binding](https://developers.cloudflare.com/api/resources/dls/subresources/regional_services/subresources/prefix_bindings/methods/edit)

PATCH/accounts/{account\_id}/dls/regional\_services/prefix\_bindings/{binding\_id}

##### [Delete a DLS prefix binding](https://developers.cloudflare.com/api/resources/dls/subresources/regional_services/subresources/prefix_bindings/methods/delete)

DELETE/accounts/{account\_id}/dls/regional\_services/prefix\_bindings/{binding\_id}

##### ModelsExpand Collapse

<details>

<summary>

PrefixBindingListResponse object {id, cidr, prefix\_id, region\_key }

</summary>

id: string

The ID of the binding.

<a href="#">Link to this property</a>

cidr: string

The CIDR that is bound.

<a href="#">Link to this property</a>

prefix\_id: string

The ID of the parent prefix.

<a href="#">Link to this property</a>

region\_key: string

The region key used for the binding.

maxLength128

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(model)%20prefix_binding_list_response%20%3E%20(schema)>)

<details>

<summary>

PrefixBindingGetResponse object {id, cidr, prefix\_id, region\_key }

</summary>

id: string

The ID of the binding.

<a href="#">Link to this property</a>

cidr: string

The CIDR that is bound.

<a href="#">Link to this property</a>

prefix\_id: string

The ID of the parent prefix.

<a href="#">Link to this property</a>

region\_key: string

The region key used for the binding.

maxLength128

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(model)%20prefix_binding_get_response%20%3E%20(schema)>)

<details>

<summary>

PrefixBindingCreateResponse object {id, cidr, prefix\_id, region\_key }

</summary>

id: string

The ID of the binding.

<a href="#">Link to this property</a>

cidr: string

The CIDR that is bound.

<a href="#">Link to this property</a>

prefix\_id: string

The ID of the parent prefix.

<a href="#">Link to this property</a>

region\_key: string

The region key used for the binding.

maxLength128

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(model)%20prefix_binding_create_response%20%3E%20(schema)>)

<details>

<summary>

PrefixBindingEditResponse object {id, cidr, prefix\_id, region\_key }

</summary>

id: string

The ID of the binding.

<a href="#">Link to this property</a>

cidr: string

The CIDR that is bound.

<a href="#">Link to this property</a>

prefix\_id: string

The ID of the parent prefix.

<a href="#">Link to this property</a>

region\_key: string

The region key used for the binding.

maxLength128

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(model)%20prefix_binding_edit_response%20%3E%20(schema)>)

<details>

<summary>

PrefixBindingDeleteResponse object {messages, success, errors }

</summary>

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

success: boolean

<a href="#">Link to this property</a>

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

maxLength0

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

</details>

[Link to this property](#)%20dls.regional_services.prefix_bindings%20%3E%20(model)%20prefix_binding_delete_response%20%3E%20(schema)>)