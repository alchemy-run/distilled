---
title: Audit SSH Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Audit SSH Settings

##### [Get Zero Trust SSH settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/audit_ssh_settings/methods/get)

GET/accounts/{account\_id}/gateway/audit\_ssh\_settings

##### [Update Zero Trust SSH settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/audit_ssh_settings/methods/update)

PUT/accounts/{account\_id}/gateway/audit\_ssh\_settings

##### [Rotate Zero Trust SSH account seed](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/audit_ssh_settings/methods/rotate_seed)

POST/accounts/{account\_id}/gateway/audit\_ssh\_settings/rotate\_seed

##### ModelsExpand Collapse

<details>

<summary>

GatewaySettings object {created\_at, public\_key, seed\_id, updated\_at }

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

public\_key: optional string

Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging">https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging</a>.

<a href="#">Link to this property</a>

seed\_id: optional string

Identify the seed ID.

maxLength36

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.audit_ssh_settings%20%3E%20(model)%20gateway_settings%20%3E%20(schema)>)