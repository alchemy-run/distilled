---
title: Get raw response
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[URL Scanner](https://developers.cloudflare.com/api/resources/url_scanner)

[Responses](https://developers.cloudflare.com/api/resources/url_scanner/subresources/responses)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get raw response

GET/accounts/{account\_id}/urlscanner/v2/responses/{response\_id}

Returns the raw response of the network request. Find the `response_id` in the `data.requests.response.hash`.

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

`URL Scanner Write``URL Scanner Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20url_scanner.responses%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

response\_id: string

Response hash.

[Link to this property](#)%20url_scanner.responses%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20response_id%20%3E%20(schema)>)

### Get raw response

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/responses/$RESPONSE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples