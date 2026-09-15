---
title: Networks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Networks

##### [List your device managed networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/networks/methods/list)

GET/accounts/{account\_id}/devices/networks

##### [Get device managed network details](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/networks/methods/get)

GET/accounts/{account\_id}/devices/networks/{network\_id}

##### [Create a device managed network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/networks/methods/create)

POST/accounts/{account\_id}/devices/networks

##### [Update a device managed network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/networks/methods/update)

PUT/accounts/{account\_id}/devices/networks/{network\_id}

##### [Delete a device managed network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/networks/methods/delete)

DELETE/accounts/{account\_id}/devices/networks/{network\_id}

##### ModelsExpand Collapse

<details>

<summary>

DeviceNetwork object {config, name, network\_id, type }

</summary>

<details>

<summary>

config: optional object {tls\_sockaddr, sha256 }

The configuration object containing information for the WARP client to detect the managed network.

</summary>

tls\_sockaddr: string

A network address of the form “host:port” that the WARP client will use to detect the presence of a TLS host.

<a href="#">Link to this property</a>

sha256: optional string

The SHA-256 hash of the TLS certificate presented by the host found at tls\_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

The name of the device managed network. This name must be unique.

<a href="#">Link to this property</a>

network\_id: optional string

API UUID.

maxLength36

<a href="#">Link to this property</a>

type: optional "tls"

The type of device managed network.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.networks%20%3E%20(model)%20device_network%20%3E%20(schema)>)