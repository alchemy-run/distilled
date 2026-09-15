---
title: Get logs received
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logs](https://developers.cloudflare.com/api/resources/logs)

[Received](https://developers.cloudflare.com/api/resources/logs/subresources/received)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get logs received

GET/zones/{zone\_id}/logs/received

The `/received` api route allows customers to retrieve their edge HTTP logs. The basic access pattern is “give me all the logs for zone Z for minute M”, where the minute M refers to the time records were received at Cloudflare’s central data center. `start` is inclusive, and `end` is exclusive. Because of that, to get all data, at minutely cadence, starting at 10AM, the proper values are: `start=2018-05-20T10:00:00Z&end=2018-05-20T10:01:00Z`, then `start=2018-05-20T10:01:00Z&end=2018-05-20T10:02:00Z` and so on; the overlap will be handled properly.

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

[Link to this property](#)%20logs.received%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

end: stringor number

Sets the (exclusive) end of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. <code>end</code> must be at least five minutes earlier than now and must be later than <code>start</code>. Difference between <code>start</code> and <code>end</code> must be not greater than one hour.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.received%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20end%20%3E%20(schema)>)

count: optional number

When `?count=` is provided, the response will contain up to `count` results. Since results are not sorted, you are likely to get different data for repeated requests. `count` must be an integer > 0.

minimum1

[Link to this property](#)%20logs.received%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20count%20%3E%20(schema)>)

fields: optional string

The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most customers require only a small subset of fields, but that subset varies from customer to customer; 2. Flat schema is much easier to work with downstream (importing into BigTable etc); 3. Performance (time to process, file size). If `?fields=` is not specified, default field set is returned. This default field set may change at any time. When `?fields=` is provided, each record is returned with the specified fields. `fields` must be specified as a comma separated list without any whitespaces, and all fields must exist. The order in which fields are specified does not matter, and the order of fields in the response is not specified.

[Link to this property](#)%20logs.received%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20fields%20%3E%20(schema)>)

sample: optional number

When `?sample=` is provided, a sample of matching records is returned. If `sample=0.1` then 10% of records will be returned. Sampling is random: repeated calls will not only return different records, but likely will also vary slightly in number of returned records. When `?count=` is also specified, `count` is applied to the number of returned records, not the sampled records. So, with `sample=0.05` and `count=7`, when there is a total of 100 records available, approximately five will be returned. When there are 1000 records, seven will be returned. When there are 10,000 records, seven will be returned.

maximum1

minimum0

[Link to this property](#)%20logs.received%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20sample%20%3E%20(schema)>)

<details>

<summary>

start: optional stringor number

Sets the (inclusive) beginning of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. At this point in time, it cannot exceed a time in the past greater than seven days.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.received%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20start%20%3E%20(schema)>)

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

[Link to this property](#)%20logs.received%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20timestamps%20%3E%20(schema)>)

##### ReturnsExpand Collapse

string

[Link to this property](#)%20logs.received%20%3E%20(model)%20received_get_response%20%3E%20(schema)%20%3E%20(variant)%200>)

unknown

[Link to this property](#)%20logs.received%20%3E%20(model)%20received_get_response%20%3E%20(schema)%20%3E%20(variant)%201>)

### Get logs received

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/received \
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