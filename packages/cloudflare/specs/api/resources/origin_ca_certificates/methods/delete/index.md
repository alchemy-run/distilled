---
title: Revoke Certificate
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Origin CA Certificates](https://developers.cloudflare.com/api/resources/origin_ca_certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Revoke Certificate

DELETE/certificates/{certificate\_id}

Revoke an existing Origin CA certificate by its serial number. You can use an Origin CA Key as your User Service Key or an API token when calling this endpoint ([see above](#requests)).

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>User Service Key</summary>



Used when interacting with the Origin CA certificates API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/#viewchange-your-origin-ca-keys">View/change your key</a>.

**Example:**<code>X-Auth-User-Service-Key: v1.0-144c9defac04969c7bfad8ef-631a41d003a32d25fe878081ef365c49503f7fada600da935e2851a1c7326084b85cbf6429c4b859de8475731dc92a9c329631e6d59e6c73da7b198497172b4cefe071d90d0f5d2719</code>

</details>

##### P ath ParametersExpand Collapse

certificate\_id: string

Identifier.

maxLength32

[Link to this property](#)%20origin_ca_certificates%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20certificate_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: optional object {id, revoked\_at }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

revoked\_at: optional string

When the certificate was revoked.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_ca_certificates%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Revoke Certificate

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/certificates/$CERTIFICATE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "revoked_at": "2024-09-06T18:43:47.928893Z"
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "revoked_at": "2024-09-06T18:43:47.928893Z"
  }
}
```