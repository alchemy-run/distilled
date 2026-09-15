---
title: Resource Library
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Resource Library

#### Resource LibraryApplications

##### [List applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/applications/methods/list)

GET/accounts/{account\_id}/resource-library/applications

##### [Get application](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/applications/methods/get)

GET/accounts/{account\_id}/resource-library/applications/{id}

##### [Create application](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/applications/methods/create)

POST/accounts/{account\_id}/resource-library/applications

##### [Update application](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/applications/methods/update)

PATCH/accounts/{account\_id}/resource-library/applications/{id}

##### [Delete application](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/applications/methods/delete)

DELETE/accounts/{account\_id}/resource-library/applications/{id}

##### ModelsExpand Collapse

<details>

<summary>

ApplicationListResponse object {id, application\_confidence\_score, application\_score\_composition, 16 more }

Describes one application in a list response. This endpoint returns every property below unless the <code>fields</code> query parameter narrows the response, so treat all of them except <code>id</code> as optional.

</summary>

id: number

Returns the application ID.

formatint64

maximum4294967295

minimum0

<a href="#">Link to this property</a>

application\_confidence\_score: optional number

Confidence score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

application\_score\_composition: optional unknown

Returns the score composition breakdown for the application.

<a href="#">Link to this property</a>

application\_source: optional string

Returns the application source.

<a href="#">Link to this property</a>

application\_type: optional string

Returns the application type.

<a href="#">Link to this property</a>

application\_type\_description: optional string

Returns the application type description.

<a href="#">Link to this property</a>

category\_id: optional number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: optional string

Returns the application creation time.

<a href="#">Link to this property</a>

gen\_ai\_score: optional number

GenAI score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

hostnames: optional array of string

Hostnames matched by the application.

<a href="#">Link to this property</a>

human\_id: optional string

Returns the human readable ID.

<a href="#">Link to this property</a>

ip\_subnets: optional array of string

IP subnets matched by the application.

<a href="#">Link to this property</a>

name: optional string

Returns the application name.

<a href="#">Link to this property</a>

port\_protocols: optional array of string

Port and protocol pairs matched by the application.

<a href="#">Link to this property</a>

<details>

<summary>

review\_status: optional "approved"or "unapproved"or "in\_review"or "unreviewed"

The account-specific Gateway review status. Applications with no assigned review status are returned as <code>unreviewed</code>.

</summary>

One of the following:

"approved"

<a href="#">Link to this property</a>

"unapproved"

<a href="#">Link to this property</a>

"in\_review"

<a href="#">Link to this property</a>

"unreviewed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

support\_domains: optional array of string

Support domains matched by the application.

<a href="#">Link to this property</a>

<details>

<summary>

supported: optional array of "GATEWAY"or "ACCESS"or "CASB"

Cloudflare products that support this application.

</summary>

One of the following:

"GATEWAY"

<a href="#">Link to this property</a>

"ACCESS"

<a href="#">Link to this property</a>

"CASB"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

Returns the application update time.

<a href="#">Link to this property</a>

version: optional string

Returns the application version.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(model)%20application_list_response%20%3E%20(schema)>)

<details>

<summary>

ApplicationGetResponse object {id, application\_confidence\_score, application\_source, 15 more }

</summary>

id: number

Returns the application ID.

formatint64

maximum4294967295

minimum0

<a href="#">Link to this property</a>

application\_confidence\_score: number

Confidence score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

application\_source: string

Returns the application source.

<a href="#">Link to this property</a>

application\_type: string

Returns the application type.

<a href="#">Link to this property</a>

application\_type\_description: string

Returns the application type description.

<a href="#">Link to this property</a>

category\_id: number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: string

Returns the application creation time.

<a href="#">Link to this property</a>

gen\_ai\_score: number

GenAI score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

hostnames: array of string

Hostnames matched by the application.

<a href="#">Link to this property</a>

human\_id: string

Returns the human readable ID.

<a href="#">Link to this property</a>

ip\_subnets: array of string

IP subnets matched by the application.

<a href="#">Link to this property</a>

name: string

Returns the application name.

<a href="#">Link to this property</a>

port\_protocols: array of string

Port and protocol pairs matched by the application.

<a href="#">Link to this property</a>

support\_domains: array of string

Support domains matched by the application.

<a href="#">Link to this property</a>

<details>

<summary>

supported: array of "GATEWAY"or "ACCESS"or "CASB"

Cloudflare products that support this application.

</summary>

One of the following:

"GATEWAY"

<a href="#">Link to this property</a>

"ACCESS"

<a href="#">Link to this property</a>

"CASB"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

Returns the application update time.

<a href="#">Link to this property</a>

version: string

Returns the application version.

<a href="#">Link to this property</a>

application\_score\_composition: optional unknown

Returns the score composition breakdown for the application.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(model)%20application_get_response%20%3E%20(schema)>)

<details>

<summary>

ApplicationCreateResponse object {id, application\_confidence\_score, application\_source, 15 more }

</summary>

id: number

Returns the application ID.

formatint64

maximum4294967295

minimum0

<a href="#">Link to this property</a>

application\_confidence\_score: number

Confidence score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

application\_source: string

Returns the application source.

<a href="#">Link to this property</a>

application\_type: string

Returns the application type.

<a href="#">Link to this property</a>

application\_type\_description: string

Returns the application type description.

<a href="#">Link to this property</a>

category\_id: number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: string

Returns the application creation time.

<a href="#">Link to this property</a>

gen\_ai\_score: number

GenAI score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

hostnames: array of string

Hostnames matched by the application.

<a href="#">Link to this property</a>

human\_id: string

Returns the human readable ID.

<a href="#">Link to this property</a>

ip\_subnets: array of string

IP subnets matched by the application.

<a href="#">Link to this property</a>

name: string

Returns the application name.

<a href="#">Link to this property</a>

port\_protocols: array of string

Port and protocol pairs matched by the application.

<a href="#">Link to this property</a>

support\_domains: array of string

Support domains matched by the application.

<a href="#">Link to this property</a>

<details>

<summary>

supported: array of "GATEWAY"or "ACCESS"or "CASB"

Cloudflare products that support this application.

</summary>

One of the following:

"GATEWAY"

<a href="#">Link to this property</a>

"ACCESS"

<a href="#">Link to this property</a>

"CASB"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

Returns the application update time.

<a href="#">Link to this property</a>

version: string

Returns the application version.

<a href="#">Link to this property</a>

application\_score\_composition: optional unknown

Returns the score composition breakdown for the application.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(model)%20application_create_response%20%3E%20(schema)>)

<details>

<summary>

ApplicationUpdateResponse object {id, application\_confidence\_score, application\_source, 15 more }

</summary>

id: number

Returns the application ID.

formatint64

maximum4294967295

minimum0

<a href="#">Link to this property</a>

application\_confidence\_score: number

Confidence score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

application\_source: string

Returns the application source.

<a href="#">Link to this property</a>

application\_type: string

Returns the application type.

<a href="#">Link to this property</a>

application\_type\_description: string

Returns the application type description.

<a href="#">Link to this property</a>

category\_id: number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: string

Returns the application creation time.

<a href="#">Link to this property</a>

gen\_ai\_score: number

GenAI score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

hostnames: array of string

Hostnames matched by the application.

<a href="#">Link to this property</a>

human\_id: string

Returns the human readable ID.

<a href="#">Link to this property</a>

ip\_subnets: array of string

IP subnets matched by the application.

<a href="#">Link to this property</a>

name: string

Returns the application name.

<a href="#">Link to this property</a>

port\_protocols: array of string

Port and protocol pairs matched by the application.

<a href="#">Link to this property</a>

support\_domains: array of string

Support domains matched by the application.

<a href="#">Link to this property</a>

<details>

<summary>

supported: array of "GATEWAY"or "ACCESS"or "CASB"

Cloudflare products that support this application.

</summary>

One of the following:

"GATEWAY"

<a href="#">Link to this property</a>

"ACCESS"

<a href="#">Link to this property</a>

"CASB"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

Returns the application update time.

<a href="#">Link to this property</a>

version: string

Returns the application version.

<a href="#">Link to this property</a>

application\_score\_composition: optional unknown

Returns the score composition breakdown for the application.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(model)%20application_update_response%20%3E%20(schema)>)

ApplicationDeleteResponse = unknown

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(model)%20application_delete_response%20%3E%20(schema)>)

#### Resource LibraryCategories

##### [List application categories](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/categories/methods/list)

GET/accounts/{account\_id}/resource-library/categories

##### [Get application category](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/categories/methods/get)

GET/accounts/{account\_id}/resource-library/categories/{id}

##### ModelsExpand Collapse

<details>

<summary>

CategoryListResponse object {id, created\_at, description, name }

</summary>

id: number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: string

Returns the category creation time.

<a href="#">Link to this property</a>

description: string

Returns the category description.

<a href="#">Link to this property</a>

name: string

Returns the category name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.categories%20%3E%20(model)%20category_list_response%20%3E%20(schema)>)

<details>

<summary>

CategoryGetResponse object {id, created\_at, description, name }

</summary>

id: number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: string

Returns the category creation time.

<a href="#">Link to this property</a>

description: string

Returns the category description.

<a href="#">Link to this property</a>

name: string

Returns the category name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.categories%20%3E%20(model)%20category_get_response%20%3E%20(schema)>)