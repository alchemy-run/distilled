---
title: Policies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Policies

##### [List policy configurations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies/methods/list)

GET/accounts/{account\_id}/data-security/posture/policies

##### [Create a new policy configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies/methods/create)

POST/accounts/{account\_id}/data-security/posture/policies

##### [Get a policy configuration by ID](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies/methods/get)

GET/accounts/{account\_id}/data-security/posture/policies/{policy\_id}

##### [Update a policy configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies/methods/update)

PUT/accounts/{account\_id}/data-security/posture/policies/{policy\_id}

##### [Delete a policy configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies/methods/delete)

DELETE/accounts/{account\_id}/data-security/posture/policies/{policy\_id}

##### ModelsExpand Collapse

<details>

<summary>

PolicyListResponse object {id, actions, applies\_to\_all\_integrations, 9 more }

Response body for a policy configuration.

</summary>

id: string

Unique identifier for the policy configuration.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

actions: object {remediation\_types, webhook\_configs }

The actions configured for this policy.

</summary>

<details>

<summary>

remediation\_types: array of object {display\_name, remediation\_type, remediation\_type\_id }

List of remediation types that will be executed.

</summary>

display\_name: string

Display name/label of the remediation type.

<a href="#">Link to this property</a>

remediation\_type: string

The system name of the remediation type.

<a href="#">Link to this property</a>

remediation\_type\_id: string

Unique identifier for the remediation type.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhook\_configs: array of object {display\_name, webhook\_config\_id }

List of webhook configurations that will be triggered.

</summary>

display\_name: string

Display name/label of the webhook configuration.

<a href="#">Link to this property</a>

webhook\_config\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

applies\_to\_all\_integrations: boolean

When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration\_ids.

<a href="#">Link to this property</a>

created\_at: string

Timestamp when the policy was created.

formatdate-time

<a href="#">Link to this property</a>

description: string

User-set description of what this policy does. Limited to 1000 characters.

<a href="#">Link to this property</a>

display\_name: string

Display name for the policy configuration. Limited to 255 characters.

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled. Derived from disabled\_at (enabled when disabled\_at is unset).

<a href="#">Link to this property</a>

finding\_type\_id: string

The finding type this policy is associated with. Immutable after creation; changing it replaces the policy.

formatuuid

<a href="#">Link to this property</a>

integration\_ids: array of string

The integrations this policy applies to.

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the policy was last updated.

formatdate-time

<a href="#">Link to this property</a>

disabled\_at: optional string

Timestamp when the policy was disabled. Omitted from the response when the policy is enabled.

formatdate-time

<a href="#">Link to this property</a>

last\_triggered\_at: optional string

Timestamp of the most recent successful policy invocation. Omitted from the response when the policy has never been successfully triggered. Only populated on GET responses; absent on responses from create/update endpoints.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(model)%20policy_list_response%20%3E%20(schema)>)

<details>

<summary>

PolicyCreateResponse object {id, actions, applies\_to\_all\_integrations, 9 more }

Response body for a policy configuration.

</summary>

id: string

Unique identifier for the policy configuration.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

actions: object {remediation\_types, webhook\_configs }

The actions configured for this policy.

</summary>

<details>

<summary>

remediation\_types: array of object {display\_name, remediation\_type, remediation\_type\_id }

List of remediation types that will be executed.

</summary>

display\_name: string

Display name/label of the remediation type.

<a href="#">Link to this property</a>

remediation\_type: string

The system name of the remediation type.

<a href="#">Link to this property</a>

remediation\_type\_id: string

Unique identifier for the remediation type.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhook\_configs: array of object {display\_name, webhook\_config\_id }

List of webhook configurations that will be triggered.

</summary>

display\_name: string

Display name/label of the webhook configuration.

<a href="#">Link to this property</a>

webhook\_config\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

applies\_to\_all\_integrations: boolean

When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration\_ids.

<a href="#">Link to this property</a>

created\_at: string

Timestamp when the policy was created.

formatdate-time

<a href="#">Link to this property</a>

description: string

User-set description of what this policy does. Limited to 1000 characters.

<a href="#">Link to this property</a>

display\_name: string

Display name for the policy configuration. Limited to 255 characters.

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled. Derived from disabled\_at (enabled when disabled\_at is unset).

<a href="#">Link to this property</a>

finding\_type\_id: string

The finding type this policy is associated with. Immutable after creation; changing it replaces the policy.

formatuuid

<a href="#">Link to this property</a>

integration\_ids: array of string

The integrations this policy applies to.

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the policy was last updated.

formatdate-time

<a href="#">Link to this property</a>

disabled\_at: optional string

Timestamp when the policy was disabled. Omitted from the response when the policy is enabled.

formatdate-time

<a href="#">Link to this property</a>

last\_triggered\_at: optional string

Timestamp of the most recent successful policy invocation. Omitted from the response when the policy has never been successfully triggered. Only populated on GET responses; absent on responses from create/update endpoints.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(model)%20policy_create_response%20%3E%20(schema)>)

<details>

<summary>

PolicyGetResponse object {id, actions, applies\_to\_all\_integrations, 9 more }

Response body for a policy configuration.

</summary>

id: string

Unique identifier for the policy configuration.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

actions: object {remediation\_types, webhook\_configs }

The actions configured for this policy.

</summary>

<details>

<summary>

remediation\_types: array of object {display\_name, remediation\_type, remediation\_type\_id }

List of remediation types that will be executed.

</summary>

display\_name: string

Display name/label of the remediation type.

<a href="#">Link to this property</a>

remediation\_type: string

The system name of the remediation type.

<a href="#">Link to this property</a>

remediation\_type\_id: string

Unique identifier for the remediation type.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhook\_configs: array of object {display\_name, webhook\_config\_id }

List of webhook configurations that will be triggered.

</summary>

display\_name: string

Display name/label of the webhook configuration.

<a href="#">Link to this property</a>

webhook\_config\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

applies\_to\_all\_integrations: boolean

When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration\_ids.

<a href="#">Link to this property</a>

created\_at: string

Timestamp when the policy was created.

formatdate-time

<a href="#">Link to this property</a>

description: string

User-set description of what this policy does. Limited to 1000 characters.

<a href="#">Link to this property</a>

display\_name: string

Display name for the policy configuration. Limited to 255 characters.

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled. Derived from disabled\_at (enabled when disabled\_at is unset).

<a href="#">Link to this property</a>

finding\_type\_id: string

The finding type this policy is associated with. Immutable after creation; changing it replaces the policy.

formatuuid

<a href="#">Link to this property</a>

integration\_ids: array of string

The integrations this policy applies to.

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the policy was last updated.

formatdate-time

<a href="#">Link to this property</a>

disabled\_at: optional string

Timestamp when the policy was disabled. Omitted from the response when the policy is enabled.

formatdate-time

<a href="#">Link to this property</a>

last\_triggered\_at: optional string

Timestamp of the most recent successful policy invocation. Omitted from the response when the policy has never been successfully triggered. Only populated on GET responses; absent on responses from create/update endpoints.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(model)%20policy_get_response%20%3E%20(schema)>)

<details>

<summary>

PolicyUpdateResponse object {id, actions, applies\_to\_all\_integrations, 9 more }

Response body for a policy configuration.

</summary>

id: string

Unique identifier for the policy configuration.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

actions: object {remediation\_types, webhook\_configs }

The actions configured for this policy.

</summary>

<details>

<summary>

remediation\_types: array of object {display\_name, remediation\_type, remediation\_type\_id }

List of remediation types that will be executed.

</summary>

display\_name: string

Display name/label of the remediation type.

<a href="#">Link to this property</a>

remediation\_type: string

The system name of the remediation type.

<a href="#">Link to this property</a>

remediation\_type\_id: string

Unique identifier for the remediation type.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhook\_configs: array of object {display\_name, webhook\_config\_id }

List of webhook configurations that will be triggered.

</summary>

display\_name: string

Display name/label of the webhook configuration.

<a href="#">Link to this property</a>

webhook\_config\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

applies\_to\_all\_integrations: boolean

When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration\_ids.

<a href="#">Link to this property</a>

created\_at: string

Timestamp when the policy was created.

formatdate-time

<a href="#">Link to this property</a>

description: string

User-set description of what this policy does. Limited to 1000 characters.

<a href="#">Link to this property</a>

display\_name: string

Display name for the policy configuration. Limited to 255 characters.

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled. Derived from disabled\_at (enabled when disabled\_at is unset).

<a href="#">Link to this property</a>

finding\_type\_id: string

The finding type this policy is associated with. Immutable after creation; changing it replaces the policy.

formatuuid

<a href="#">Link to this property</a>

integration\_ids: array of string

The integrations this policy applies to.

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the policy was last updated.

formatdate-time

<a href="#">Link to this property</a>

disabled\_at: optional string

Timestamp when the policy was disabled. Omitted from the response when the policy is enabled.

formatdate-time

<a href="#">Link to this property</a>

last\_triggered\_at: optional string

Timestamp of the most recent successful policy invocation. Omitted from the response when the policy has never been successfully triggered. Only populated on GET responses; absent on responses from create/update endpoints.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(model)%20policy_update_response%20%3E%20(schema)>)

<details>

<summary>

PolicyDeleteResponse object {id }

Response from DeletePolicy operation.

</summary>

id: string

ID of the policy deleted.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(model)%20policy_delete_response%20%3E%20(schema)>)