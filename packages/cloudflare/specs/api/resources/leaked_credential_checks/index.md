---
title: Leaked Credential Checks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Leaked Credential Checks

##### [Get the Leaked Credential Checks status for a zone.](https://developers.cloudflare.com/api/resources/leaked_credential_checks/methods/get)

GET/zones/{zone\_id}/leaked-credential-checks

##### [Update the Leaked Credential Checks status for a zone.](https://developers.cloudflare.com/api/resources/leaked_credential_checks/methods/create)

POST/zones/{zone\_id}/leaked-credential-checks

##### ModelsExpand Collapse

<details>

<summary>

LeakedCredentialCheckGetResponse object {enabled }

Defines the overall status for Leaked Credential Checks.

</summary>

enabled: optional boolean

Determines whether or not Leaked Credential Checks are enabled.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20leaked_credential_checks%20%3E%20(model)%20leaked_credential_check_get_response%20%3E%20(schema)>)

<details>

<summary>

LeakedCredentialCheckCreateResponse object {enabled }

Defines the overall status for Leaked Credential Checks.

</summary>

enabled: optional boolean

Determines whether or not Leaked Credential Checks are enabled.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20leaked_credential_checks%20%3E%20(model)%20leaked_credential_check_create_response%20%3E%20(schema)>)

#### Leaked Credential ChecksDetections

##### [List the custom detection locations of a zone.](https://developers.cloudflare.com/api/resources/leaked_credential_checks/subresources/detections/methods/list)

GET/zones/{zone\_id}/leaked-credential-checks/detections

##### [Create a custom detection location for a zone.](https://developers.cloudflare.com/api/resources/leaked_credential_checks/subresources/detections/methods/create)

POST/zones/{zone\_id}/leaked-credential-checks/detections

##### [Get a custom detection location of a zone.](https://developers.cloudflare.com/api/resources/leaked_credential_checks/subresources/detections/methods/get)

GET/zones/{zone\_id}/leaked-credential-checks/detections/{detection\_id}

##### [Update a custom detection location of a zone.](https://developers.cloudflare.com/api/resources/leaked_credential_checks/subresources/detections/methods/update)

PUT/zones/{zone\_id}/leaked-credential-checks/detections/{detection\_id}

##### [Delete a custom detection location from a zone.](https://developers.cloudflare.com/api/resources/leaked_credential_checks/subresources/detections/methods/delete)

DELETE/zones/{zone\_id}/leaked-credential-checks/detections/{detection\_id}

##### ModelsExpand Collapse

<details>

<summary>

DetectionListResponse object {id, password, username }

Defines a custom set of username/password expressions to match Leaked Credential Checks on.

</summary>

id: optional string

Defines the unique ID for this custom detection.

maxLength32

<a href="#">Link to this property</a>

password: optional string

Defines ehe ruleset expression to use in matching the password in a request.

<a href="#">Link to this property</a>

username: optional string

Defines the ruleset expression to use in matching the username in a request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(model)%20detection_list_response%20%3E%20(schema)>)

<details>

<summary>

DetectionCreateResponse object {id, password, username }

Defines a custom set of username/password expressions to match Leaked Credential Checks on.

</summary>

id: optional string

Defines the unique ID for this custom detection.

maxLength32

<a href="#">Link to this property</a>

password: optional string

Defines ehe ruleset expression to use in matching the password in a request.

<a href="#">Link to this property</a>

username: optional string

Defines the ruleset expression to use in matching the username in a request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(model)%20detection_create_response%20%3E%20(schema)>)

<details>

<summary>

DetectionGetResponse object {id, password, username }

Defines a custom set of username/password expressions to match Leaked Credential Checks on.

</summary>

id: optional string

Defines the unique ID for this custom detection.

maxLength32

<a href="#">Link to this property</a>

password: optional string

Defines ehe ruleset expression to use in matching the password in a request.

<a href="#">Link to this property</a>

username: optional string

Defines the ruleset expression to use in matching the username in a request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(model)%20detection_get_response%20%3E%20(schema)>)

<details>

<summary>

DetectionUpdateResponse object {id, password, username }

Defines a custom set of username/password expressions to match Leaked Credential Checks on.

</summary>

id: optional string

Defines the unique ID for this custom detection.

maxLength32

<a href="#">Link to this property</a>

password: optional string

Defines ehe ruleset expression to use in matching the password in a request.

<a href="#">Link to this property</a>

username: optional string

Defines the ruleset expression to use in matching the username in a request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(model)%20detection_update_response%20%3E%20(schema)>)

DetectionDeleteResponse = unknown

[Link to this property](#)%20leaked_credential_checks.detections%20%3E%20(model)%20detection_delete_response%20%3E%20(schema)>)