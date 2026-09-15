---
title: Delete Single Certificate And Key For Custom Hostname
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames)

[Certificate Pack](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/certificate_pack)

[Certificates](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/certificate_pack/subresources/certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete Single Certificate And Key For Custom Hostname

DELETE/zones/{zone\_id}/custom\_hostnames/{custom\_hostname\_id}/certificate\_pack/{certificate\_pack\_id}/certificates/{certificate\_id}

Delete a single custom certificate from a certificate pack that contains two bundled certificates. Deletion is subject to the following constraints. You cannot delete a certificate if it is the only remaining certificate in the pack. At least one certificate must remain in the pack.

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

`SSL and Certificates Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20custom_hostnames.certificate_pack.certificates%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

custom\_hostname\_id: string

Identifier.

maxLength32

[Link to this property](#)%20custom_hostnames.certificate_pack.certificates%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20custom_hostname_id%20%3E%20(schema)>)

certificate\_pack\_id: string

Identifier.

maxLength32

[Link to this property](#)%20custom_hostnames.certificate_pack.certificates%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20certificate_pack_id%20%3E%20(schema)>)

certificate\_id: string

Identifier.

maxLength32

[Link to this property](#)%20custom_hostnames.certificate_pack.certificates%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20certificate_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: optional string

Identifier.

maxLength32

[Link to this property](#)%20custom_hostnames.certificate_pack.certificates%20%3E%20(model)%20certificate_delete_response%20%3E%20(schema)%20%3E%20(property)%20id>)

### Delete Single Certificate And Key For Custom Hostname

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID/certificate_pack/$CERTIFICATE_PACK_ID/certificates/$CERTIFICATE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```

##### Returns Examples

200 example

```
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```