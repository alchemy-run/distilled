---
title: Delete a share recipient
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Sharing](https://developers.cloudflare.com/api/resources/resource_sharing)

[Recipients](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/recipients)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a share recipient

DELETE/accounts/{account\_id}/shares/{share\_id}/recipients/{recipient\_id}

Performs a **soft delete**: sets the recipient’s `desired_association_status` to `disassociated`, which signals the background reconciliation workflow (Temporal) to remove the shared resources from the recipient account. The recipient record remains in the database for audit purposes and is still returned by `GET /accounts/{account_id}/shares/{share_id}/recipients` with its updated status.

Resource access is not fully removed until the workflow completes and `current_association_status` transitions to `disassociated`. The recipient record itself is never physically deleted.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier.

maxLength32

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

share\_id: string

Share identifier tag.

maxLength32

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20share_id%20%3E%20(schema)>)

recipient\_id: string

Share Recipient identifier tag.

maxLength32

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20recipient_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, account\_id, association\_status, 3 more }

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

[Link to this property](#)%20resource_sharing.recipients%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete a share recipient

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/recipients/$RECIPIENT_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "3fd85f74b32742f1bff64a85009dda07",
    "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "association_status": "associating",
    "created": "2023-09-21T18:56:32.624632Z",
    "modified": "2023-09-21T18:56:32.624632Z",
    "resources": [
      {
        "error": "Recipient is missing necessary entitlement",
        "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "resource_version": 0,
        "terminal": true
      }
    ]
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "3fd85f74b32742f1bff64a85009dda07",
    "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "association_status": "associating",
    "created": "2023-09-21T18:56:32.624632Z",
    "modified": "2023-09-21T18:56:32.624632Z",
    "resources": [
      {
        "error": "Recipient is missing necessary entitlement",
        "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "resource_version": 0,
        "terminal": true
      }
    ]
  }
}
```