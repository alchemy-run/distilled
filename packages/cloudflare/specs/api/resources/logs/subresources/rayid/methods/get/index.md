---
title: Get logs RayIDs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logs](https://developers.cloudflare.com/api/resources/logs)

[RayID](https://developers.cloudflare.com/api/resources/logs/subresources/rayid)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get logs RayIDs

GET/zones/{zone\_id}/logs/rayids/{ray\_id}

The `/rayids` api route allows lookups by specific rayid. The rayids route will return zero, one, or more records (ray ids are not unique).

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

`Logs Write``Logs Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20logs.rayid%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

ray\_id: string

Ray identifier.

maxLength16

[Link to this property](#)%20logs.rayid%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20ray_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

fields: optional string

The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most customers require only a small subset of fields, but that subset varies from customer to customer; 2. Flat schema is much easier to work with downstream (importing into BigTable etc); 3. Performance (time to process, file size). If `?fields=` is not specified, default field set is returned. This default field set may change at any time. When `?fields=` is provided, each record is returned with the specified fields. `fields` must be specified as a comma separated list without any whitespaces, and all fields must exist. The order in which fields are specified does not matter, and the order of fields in the response is not specified.

[Link to this property](#)%20logs.rayid%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20fields%20%3E%20(schema)>)

<details>

<summary>

timestamps: optional "unix"or "unixnano"or "rfc3339"

By default, timestamps in responses are returned as Unix nanosecond integers. The <code>?timestamps=</code> argument can be set to change the format in which response timestamps are returned. Possible values are: <code>unix</code>, <code>unixnano</code>, <code>rfc3339</code>. Note that <code>unix</code> and <code>unixnano</code> return timestamps as integers; <code>rfc3339</code> returns timestamps as strings.

</summary>

One of the following:

"unix"

<a href="#">Link to this property</a>

"unixnano"

<a href="#">Link to this property</a>

"rfc3339"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.rayid%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20timestamps%20%3E%20(schema)>)

##### ReturnsExpand Collapse

string

[Link to this property](#)%20logs.rayid%20%3E%20(model)%20rayid_get_response%20%3E%20(schema)%20%3E%20(variant)%200>)

unknown

[Link to this property](#)%20logs.rayid%20%3E%20(model)%20rayid_get_response%20%3E%20(schema)%20%3E%20(variant)%201>)

### Get logs RayIDs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/rayids/$RAYID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
"{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}"
```

##### Returns Examples

200 example

```
"{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}"
```