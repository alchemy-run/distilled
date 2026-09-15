---
title: Get indicator feed data
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Indicator Feeds](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get indicator feed data

GET/accounts/{account\_id}/intel/indicator-feeds/{feed\_id}/data

Retrieves the raw data entries in a custom threat indicator feed.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20data%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

feed\_id: number

Indicator feed ID

[Link to this property](#)%20intel.indicator_feeds%20%3E%20(method)%20data%20%3E%20(params)%20default%20%3E%20(param)%20feed_id%20%3E%20(schema)>)

### Get indicator feed data

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID/data \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

##### Returns Examples