---
title: Keys
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Keys

##### [Get the Access key configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/keys/methods/get)

GET/accounts/{account\_id}/access/keys

##### [Update the Access key configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/keys/methods/update)

PUT/accounts/{account\_id}/access/keys

##### [Rotate Access keys](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/keys/methods/rotate)

POST/accounts/{account\_id}/access/keys/rotate

##### ModelsExpand Collapse

<details>

<summary>

KeyGetResponse object {days\_until\_next\_rotation, key\_rotation\_interval\_days, last\_key\_rotation\_at }

</summary>

days\_until\_next\_rotation: optional number

The number of days until the next key rotation.

<a href="#">Link to this property</a>

key\_rotation\_interval\_days: optional number

The number of days between key rotations.

maximum365

minimum21

<a href="#">Link to this property</a>

last\_key\_rotation\_at: optional string

The timestamp of the previous key rotation.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.keys%20%3E%20(model)%20key_get_response%20%3E%20(schema)>)

<details>

<summary>

KeyUpdateResponse object {days\_until\_next\_rotation, key\_rotation\_interval\_days, last\_key\_rotation\_at }

</summary>

days\_until\_next\_rotation: optional number

The number of days until the next key rotation.

<a href="#">Link to this property</a>

key\_rotation\_interval\_days: optional number

The number of days between key rotations.

maximum365

minimum21

<a href="#">Link to this property</a>

last\_key\_rotation\_at: optional string

The timestamp of the previous key rotation.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.keys%20%3E%20(model)%20key_update_response%20%3E%20(schema)>)

<details>

<summary>

KeyRotateResponse object {days\_until\_next\_rotation, key\_rotation\_interval\_days, last\_key\_rotation\_at }

</summary>

days\_until\_next\_rotation: optional number

The number of days until the next key rotation.

<a href="#">Link to this property</a>

key\_rotation\_interval\_days: optional number

The number of days between key rotations.

maximum365

minimum21

<a href="#">Link to this property</a>

last\_key\_rotation\_at: optional string

The timestamp of the previous key rotation.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.keys%20%3E%20(model)%20key_rotate_response%20%3E%20(schema)>)