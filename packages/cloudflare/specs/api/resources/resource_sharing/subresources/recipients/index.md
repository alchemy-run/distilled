---
title: Recipients
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Sharing](https://developers.cloudflare.com/api/resources/resource_sharing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Recipients

##### [List share recipients by share ID](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/recipients/methods/list)

GET/accounts/{account\_id}/shares/{share\_id}/recipients

##### [Get share recipient by ID](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/recipients/methods/get)

GET/accounts/{account\_id}/shares/{share\_id}/recipients/{recipient\_id}

##### [Create a new share recipient](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/recipients/methods/create)

POST/accounts/{account\_id}/shares/{share\_id}/recipients

##### [Delete a share recipient](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/recipients/methods/delete)

DELETE/accounts/{account\_id}/shares/{share\_id}/recipients/{recipient\_id}

##### ModelsExpand Collapse

<details>

<summary>

RecipientListResponse object {id, account\_id, association\_status, 3 more }

A recipient of a share. The <code>association_status</code> field tracks the lifecycle of the shared resources in the recipient account. All recipients are returned by the list endpoint regardless of status; filter client-side if only active recipients are needed.

</summary>

id: string

Share Recipient identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

association\_status: "associating"or "associated"or "disassociating"or "disassociated"

The current state of the recipient relative to the share. The <code>desired_association_status</code> (not exposed in the response) tracks the target state set by the API; the background reconciliation workflow drives <code>current_association_status</code> toward it.

- <code>associating</code> — The recipient was recently added; the workflow is pushing shared resources into the recipient account.
- <code>associated</code> — Shared resources have been successfully applied to the recipient account.
- <code>disassociating</code> — The recipient was removed (via DELETE or PUT replacement); the workflow is removing shared resources from the recipient account.
- <code>disassociated</code> — Shared resources have been removed from the recipient account. The recipient record remains in the database.

</summary>

One of the following:

"associating"

<a href="#">Link to this property</a>

"associated"

<a href="#">Link to this property</a>

"disassociating"

<a href="#">Link to this property</a>

"disassociated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

resources: optional array of object {error, resource\_id, resource\_version, terminal }

</summary>

error: string

Share Recipient error message.

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

terminal: boolean

Whether the error is terminal or will be continually retried.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(model)%20recipient_list_response%20%3E%20(schema)>)

<details>

<summary>

RecipientGetResponse object {id, account\_id, association\_status, 3 more }

A recipient of a share. The <code>association_status</code> field tracks the lifecycle of the shared resources in the recipient account. All recipients are returned by the list endpoint regardless of status; filter client-side if only active recipients are needed.

</summary>

id: string

Share Recipient identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

association\_status: "associating"or "associated"or "disassociating"or "disassociated"

The current state of the recipient relative to the share. The <code>desired_association_status</code> (not exposed in the response) tracks the target state set by the API; the background reconciliation workflow drives <code>current_association_status</code> toward it.

- <code>associating</code> — The recipient was recently added; the workflow is pushing shared resources into the recipient account.
- <code>associated</code> — Shared resources have been successfully applied to the recipient account.
- <code>disassociating</code> — The recipient was removed (via DELETE or PUT replacement); the workflow is removing shared resources from the recipient account.
- <code>disassociated</code> — Shared resources have been removed from the recipient account. The recipient record remains in the database.

</summary>

One of the following:

"associating"

<a href="#">Link to this property</a>

"associated"

<a href="#">Link to this property</a>

"disassociating"

<a href="#">Link to this property</a>

"disassociated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

resources: optional array of object {error, resource\_id, resource\_version, terminal }

</summary>

error: string

Share Recipient error message.

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

terminal: boolean

Whether the error is terminal or will be continually retried.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(model)%20recipient_get_response%20%3E%20(schema)>)

<details>

<summary>

RecipientCreateResponse object {id, account\_id, association\_status, 3 more }

A recipient of a share. The <code>association_status</code> field tracks the lifecycle of the shared resources in the recipient account. All recipients are returned by the list endpoint regardless of status; filter client-side if only active recipients are needed.

</summary>

id: string

Share Recipient identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

association\_status: "associating"or "associated"or "disassociating"or "disassociated"

The current state of the recipient relative to the share. The <code>desired_association_status</code> (not exposed in the response) tracks the target state set by the API; the background reconciliation workflow drives <code>current_association_status</code> toward it.

- <code>associating</code> — The recipient was recently added; the workflow is pushing shared resources into the recipient account.
- <code>associated</code> — Shared resources have been successfully applied to the recipient account.
- <code>disassociating</code> — The recipient was removed (via DELETE or PUT replacement); the workflow is removing shared resources from the recipient account.
- <code>disassociated</code> — Shared resources have been removed from the recipient account. The recipient record remains in the database.

</summary>

One of the following:

"associating"

<a href="#">Link to this property</a>

"associated"

<a href="#">Link to this property</a>

"disassociating"

<a href="#">Link to this property</a>

"disassociated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

resources: optional array of object {error, resource\_id, resource\_version, terminal }

</summary>

error: string

Share Recipient error message.

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

terminal: boolean

Whether the error is terminal or will be continually retried.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(model)%20recipient_create_response%20%3E%20(schema)>)

<details>

<summary>

RecipientDeleteResponse object {id, account\_id, association\_status, 3 more }

A recipient of a share. The <code>association_status</code> field tracks the lifecycle of the shared resources in the recipient account. All recipients are returned by the list endpoint regardless of status; filter client-side if only active recipients are needed.

</summary>

id: string

Share Recipient identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

association\_status: "associating"or "associated"or "disassociating"or "disassociated"

The current state of the recipient relative to the share. The <code>desired_association_status</code> (not exposed in the response) tracks the target state set by the API; the background reconciliation workflow drives <code>current_association_status</code> toward it.

- <code>associating</code> — The recipient was recently added; the workflow is pushing shared resources into the recipient account.
- <code>associated</code> — Shared resources have been successfully applied to the recipient account.
- <code>disassociating</code> — The recipient was removed (via DELETE or PUT replacement); the workflow is removing shared resources from the recipient account.
- <code>disassociated</code> — Shared resources have been removed from the recipient account. The recipient record remains in the database.

</summary>

One of the following:

"associating"

<a href="#">Link to this property</a>

"associated"

<a href="#">Link to this property</a>

"disassociating"

<a href="#">Link to this property</a>

"disassociated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

resources: optional array of object {error, resource\_id, resource\_version, terminal }

</summary>

error: string

Share Recipient error message.

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

terminal: boolean

Whether the error is terminal or will be continually retried.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(model)%20recipient_delete_response%20%3E%20(schema)>)