---
title: Custom
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Policies](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom

##### [List device settings profiles](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/methods/list)

GET/accounts/{account\_id}/devices/policies

##### [Get device settings profile by ID](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/methods/get)

GET/accounts/{account\_id}/devices/policy/{policy\_id}

##### [Create a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/methods/create)

POST/accounts/{account\_id}/devices/policy

##### [Update a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/methods/edit)

PATCH/accounts/{account\_id}/devices/policy/{policy\_id}

##### [Delete a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/methods/delete)

DELETE/accounts/{account\_id}/devices/policy/{policy\_id}

#### CustomExcludes

##### [Get the Split Tunnel exclude list for a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/subresources/excludes/methods/get)

GET/accounts/{account\_id}/devices/policy/{policy\_id}/exclude

##### [Set the Split Tunnel exclude list for a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/subresources/excludes/methods/update)

PUT/accounts/{account\_id}/devices/policy/{policy\_id}/exclude

#### CustomIncludes

##### [Get the Split Tunnel include list for a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/subresources/includes/methods/get)

GET/accounts/{account\_id}/devices/policy/{policy\_id}/include

##### [Set the Split Tunnel include list for a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/subresources/includes/methods/update)

PUT/accounts/{account\_id}/devices/policy/{policy\_id}/include

#### CustomFallback Domains

##### [Get the Local Domain Fallback list for a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/subresources/fallback_domains/methods/get)

GET/accounts/{account\_id}/devices/policy/{policy\_id}/fallback\_domains

##### [Set the Local Domain Fallback list for a device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom/subresources/fallback_domains/methods/update)

PUT/accounts/{account\_id}/devices/policy/{policy\_id}/fallback\_domains