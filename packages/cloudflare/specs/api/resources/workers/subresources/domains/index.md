---
title: Domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Domains

##### [List Domains](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/list)

GET/accounts/{account\_id}/workers/domains

##### [Get Domain](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/get)

GET/accounts/{account\_id}/workers/domains/{domain\_id}

##### [Attach Domain](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/update)

PUT/accounts/{account\_id}/workers/domains

##### [Detach Domain](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/delete)

DELETE/accounts/{account\_id}/workers/domains/{domain\_id}

##### ModelsExpand Collapse

<details>

<summary>

DomainListResponse object {id, cert\_id, environment, 4 more }

</summary>

id: string

Immutable ID of the domain.

<a href="#">Link to this property</a>

cert\_id: string

ID of the TLS certificate issued for the domain.

formatuuid

<a href="#">Link to this property</a>

Deprecatedenvironment: string

Worker environment associated with the domain.

<a href="#">Link to this property</a>

hostname: string

Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

<a href="#">Link to this property</a>

service: string

Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

<a href="#">Link to this property</a>

zone\_id: string

ID of the zone containing the domain hostname.

<a href="#">Link to this property</a>

zone\_name: string

Name of the zone containing the domain hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.domains%20%3E%20(model)%20domain_list_response%20%3E%20(schema)>)

<details>

<summary>

DomainGetResponse object {id, cert\_id, environment, 4 more }

</summary>

id: string

Immutable ID of the domain.

<a href="#">Link to this property</a>

cert\_id: string

ID of the TLS certificate issued for the domain.

formatuuid

<a href="#">Link to this property</a>

Deprecatedenvironment: string

Worker environment associated with the domain.

<a href="#">Link to this property</a>

hostname: string

Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

<a href="#">Link to this property</a>

service: string

Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

<a href="#">Link to this property</a>

zone\_id: string

ID of the zone containing the domain hostname.

<a href="#">Link to this property</a>

zone\_name: string

Name of the zone containing the domain hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.domains%20%3E%20(model)%20domain_get_response%20%3E%20(schema)>)

<details>

<summary>

DomainUpdateResponse object {id, cert\_id, environment, 4 more }

</summary>

id: string

Immutable ID of the domain.

<a href="#">Link to this property</a>

cert\_id: string

ID of the TLS certificate issued for the domain.

formatuuid

<a href="#">Link to this property</a>

Deprecatedenvironment: string

Worker environment associated with the domain.

<a href="#">Link to this property</a>

hostname: string

Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

<a href="#">Link to this property</a>

service: string

Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

<a href="#">Link to this property</a>

zone\_id: string

ID of the zone containing the domain hostname.

<a href="#">Link to this property</a>

zone\_name: string

Name of the zone containing the domain hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.domains%20%3E%20(model)%20domain_update_response%20%3E%20(schema)>)

<details>

<summary>

DomainDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20workers.domains%20%3E%20(model)%20domain_delete_response%20%3E%20(schema)>)