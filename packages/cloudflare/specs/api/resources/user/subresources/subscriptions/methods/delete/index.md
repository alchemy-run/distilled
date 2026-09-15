---
title: Delete User Subscription
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Subscriptions](https://developers.cloudflare.com/api/resources/user/subresources/subscriptions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete User Subscription

DELETE/user/subscriptions/{identifier}

Deletes a user’s subscription.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Billing Write`

##### P ath ParametersExpand Collapse

identifier: string

Subscription identifier tag.

maxLength32

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

##### ReturnsExpand Collapse

subscription\_id: optional string

Subscription identifier tag.

maxLength32

[Link to this property](#)%20user.subscriptions%20%3E%20(model)%20subscription_delete_response%20%3E%20(schema)%20%3E%20(property)%20subscription_id>)

### Delete User Subscription

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/subscriptions/$IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "subscription_id": "506e3185e9c882d175a2d0cb0093d9f2"
}
```

##### Returns Examples

200 example

```
{
  "subscription_id": "506e3185e9c882d175a2d0cb0093d9f2"
}
```