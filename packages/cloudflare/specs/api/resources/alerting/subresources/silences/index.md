---
title: Silences
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Silences

##### [List Silences](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/list)

GET/accounts/{account\_id}/alerting/v3/silences

##### [Get Silence](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/get)

GET/accounts/{account\_id}/alerting/v3/silences/{silence\_id}

##### [Create Silences](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/create)

POST/accounts/{account\_id}/alerting/v3/silences

##### [Update Silences](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/update)

PUT/accounts/{account\_id}/alerting/v3/silences

##### [Delete Silence](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/delete)

DELETE/accounts/{account\_id}/alerting/v3/silences/{silence\_id}

##### ModelsExpand Collapse

<details>

<summary>

SilenceListResponse object {id, created\_at, end\_time, 3 more }

</summary>

id: optional string

Silence ID

maxLength32

<a href="#">Link to this property</a>

created\_at: optional string

When the silence was created.

<a href="#">Link to this property</a>

end\_time: optional string

When the silence ends.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

start\_time: optional string

When the silence starts.

<a href="#">Link to this property</a>

updated\_at: optional string

When the silence was modified.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_list_response%20%3E%20(schema)>)

<details>

<summary>

SilenceGetResponse object {id, created\_at, end\_time, 3 more }

</summary>

id: optional string

Silence ID

maxLength32

<a href="#">Link to this property</a>

created\_at: optional string

When the silence was created.

<a href="#">Link to this property</a>

end\_time: optional string

When the silence ends.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

start\_time: optional string

When the silence starts.

<a href="#">Link to this property</a>

updated\_at: optional string

When the silence was modified.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_get_response%20%3E%20(schema)>)

<details>

<summary>

SilenceCreateResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_create_response%20%3E%20(schema)>)

<details>

<summary>

SilenceUpdateResponse object {id, created\_at, end\_time, 3 more }

</summary>

id: optional string

Silence ID

maxLength32

<a href="#">Link to this property</a>

created\_at: optional string

When the silence was created.

<a href="#">Link to this property</a>

end\_time: optional string

When the silence ends.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

start\_time: optional string

When the silence starts.

<a href="#">Link to this property</a>

updated\_at: optional string

When the silence was modified.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_update_response%20%3E%20(schema)>)

<details>

<summary>

SilenceDeleteResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_delete_response%20%3E%20(schema)>)