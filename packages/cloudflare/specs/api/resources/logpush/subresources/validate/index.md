---
title: Validate
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logpush](https://developers.cloudflare.com/api/resources/logpush)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Validate

##### [Validate destination](https://developers.cloudflare.com/api/resources/logpush/subresources/validate/methods/destination)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/validate/destination

##### [Check destination exists](https://developers.cloudflare.com/api/resources/logpush/subresources/validate/methods/destination_exists)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/validate/destination/exists

##### [Validate origin](https://developers.cloudflare.com/api/resources/logpush/subresources/validate/methods/origin)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/validate/origin

##### ModelsExpand Collapse

<details>

<summary>

ValidateDestinationResponse object {message, valid }

</summary>

message: optional string

<a href="#">Link to this property</a>

valid: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.validate%20%3E%20(model)%20validate_destination_response%20%3E%20(schema)>)

<details>

<summary>

ValidateDestinationExistsResponse object {exists }

</summary>

exists: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.validate%20%3E%20(model)%20validate_destination_exists_response%20%3E%20(schema)>)

<details>

<summary>

ValidateOriginResponse object {message, valid }

</summary>

message: optional string

<a href="#">Link to this property</a>

valid: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.validate%20%3E%20(model)%20validate_origin_response%20%3E%20(schema)>)