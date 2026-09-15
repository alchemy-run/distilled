---
title: Delete Sink
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pipelines](https://developers.cloudflare.com/api/resources/pipelines)

[Sinks](https://developers.cloudflare.com/api/resources/pipelines/subresources/sinks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete Sink

DELETE/accounts/{account\_id}/pipelines/v1/sinks/{sink\_id}

Delete Sink in Account.

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

##### P ath ParametersExpand Collapse

account\_id: string

Specifies the public ID of the account.

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

sink\_id: string

Specifies the publid ID of the sink.

maxLength32

minLength32

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20sink_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

result: unknown

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20pipelines.sinks%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete Sink

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/sinks/$SINK_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {},
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {},
  "success": true
}
```