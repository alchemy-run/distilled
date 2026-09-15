---
title: Proxy Endpoints
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Proxy Endpoints

##### [List proxy endpoints](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/list)

GET/accounts/{account\_id}/gateway/proxy\_endpoints

##### [Get a proxy endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/get)

GET/accounts/{account\_id}/gateway/proxy\_endpoints/{proxy\_endpoint\_id}

##### [Create a proxy endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/create)

POST/accounts/{account\_id}/gateway/proxy\_endpoints

##### [Update a proxy endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/edit)

PATCH/accounts/{account\_id}/gateway/proxy\_endpoints/{proxy\_endpoint\_id}

##### [Delete a proxy endpoint](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints/methods/delete)

DELETE/accounts/{account\_id}/gateway/proxy\_endpoints/{proxy\_endpoint\_id}

##### ModelsExpand Collapse

GatewayIPs = string

Specify an IPv4 or IPv6 CIDR. Limit IPv6 to a maximum of /109 and IPv4 to a maximum of /25.

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20gateway_ips%20%3E%20(schema)>)

<details>

<summary>

ProxyEndpoint = object {ips, name, id, 4 more } or object {kind, name, id, 3 more }

</summary>

One of the following:

<details>

<summary>

IP object {ips, name, id, 4 more }

</summary>

ips: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20gateway_ips%20%3E%20(schema)">GatewayIPs</a>

Specify the list of CIDRs to restrict ingress connections.

<a href="#">Link to this property</a>

name: string

Specify the name of the proxy endpoint.

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

kind: optional "ip"

The proxy endpoint kind

<a href="#">Link to this property</a>

subdomain: optional string

Specify the subdomain to use as the destination in the proxy client.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Identity object {kind, name, id, 3 more }

</summary>

kind: "identity"

The proxy endpoint kind

<a href="#">Link to this property</a>

name: string

Specify the name of the proxy endpoint.

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

subdomain: optional string

Specify the subdomain to use as the destination in the proxy client.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20proxy_endpoint%20%3E%20(schema)>)

ProxyEndpointDeleteResponse = unknown

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20proxy_endpoint_delete_response%20%3E%20(schema)>)