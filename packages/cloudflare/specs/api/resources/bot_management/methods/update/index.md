---
title: Update Zone Bot Management Config
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Bot Management](https://developers.cloudflare.com/api/resources/bot_management)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Zone Bot Management Config

PUT/zones/{zone\_id}/bot\_management

Updates the Bot Management configuration for a zone.

This API is used to update:

- **Bot Fight Mode**
- **Super Bot Fight Mode**
- **Bot Management for Enterprise**

See [Bot Plans](https://developers.cloudflare.com/bots/plans/) for more information on the different plans  
 If you recently upgraded or downgraded your plan, refer to the following examples to clean up old configurations. Copy and paste the example body to remove old zone configurations based on your current plan.

#### Clean up configuration for Bot Fight Mode plan

```json
{
  "sbfm_likely_automated": "allow",
  "sbfm_definitely_automated": "allow",
  "sbfm_verified_bots": "allow",
  "sbfm_static_resource_protection": false,
  "optimize_wordpress": false,
  "suppress_session_score": false
}
```

#### Clean up configuration for SBFM Pro plan

```json
{
  "sbfm_likely_automated": "allow",
  "fight_mode": false
}
```

#### Clean up configuration for SBFM Biz plan

```json
{
  "fight_mode": false
}
```

#### Clean up configuration for BM Enterprise Subscription plan

It is strongly recommended that you ensure you have [custom rules](https://developers.cloudflare.com/waf/custom-rules/) in place to protect your zone before disabling the SBFM rules. Without these protections, your zone is vulnerable to attacks.

```json
{
  "sbfm_likely_automated": "allow",
  "sbfm_definitely_automated": "allow",
  "sbfm_verified_bots": "allow",
  "sbfm_static_resource_protection": false,
  "optimize_wordpress": false,
  "fight_mode": false
}
```

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

`Bot Management Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20bot_management%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20bot_fight_mode_configuration%20%3E%20(schema)">BotFightModeConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 11 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_definitely_configuration%20%3E%20(schema)">SuperBotFightModeDefinitelyConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 14 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_likely_configuration%20%3E%20(schema)">SuperBotFightModeLikelyConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 15 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20subscription_configuration%20%3E%20(schema)">SubscriptionConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 13 more }

</summary>

One of the following:

<details>

<summary>

BotFightModeConfiguration object {ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 11 more }

</summary>

ai\_bots\_migration\_opt\_out: optional boolean

Temporary migration flag tracking zones opted out of AI bots managed-rule updates.

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bots\_protection: optional "block"or "disabled"or "only\_on\_ad\_pages"

Enable rule to block AI Scrapers and Crawlers.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_search: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI search bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_training: optional "disabled"or "disallow"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI model training bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"disallow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_user: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI assistant and agent bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bot\_preference\_sync\_enabled: optional boolean

Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone’s AI Search, AI User, and AI Training preferences.

<a href="#">Link to this property</a>

<details>

<summary>

cf\_robots\_variant: optional "off"or "policy\_only"

Specifies the Robots Access Control License variant to use.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"policy\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_bots\_protection: optional "block"or "disabled"

Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawler\_protection: optional "enabled"or "disabled"

Enable rule to punish AI Scrapers and Crawlers via a link maze.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enable\_js: optional boolean

Use lightweight, invisible JavaScript detections to improve Bot Management. <a href="https://developers.cloudflare.com/bots/reference/javascript-detections/">Learn more about JavaScript Detections</a>.

<a href="#">Link to this property</a>

fight\_mode: optional boolean

Whether to enable Bot Fight Mode.

<a href="#">Link to this property</a>

is\_robots\_txt\_managed: optional boolean

Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

<a href="#">Link to this property</a>

<details>

<summary>

stale\_zone\_configuration: optional object {optimize\_wordpress, sbfm\_definitely\_automated, sbfm\_likely\_automated, 3 more }

A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

</summary>

optimize\_wordpress: optional boolean

Indicates that the zone’s wordpress optimization for SBFM is turned on.

<a href="#">Link to this property</a>

sbfm\_definitely\_automated: optional string

Indicates that the zone’s definitely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

sbfm\_likely\_automated: optional string

Indicates that the zone’s likely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

sbfm\_static\_resource\_protection: optional string

Indicates that the zone’s static resource protection is turned on.

<a href="#">Link to this property</a>

sbfm\_verified\_bots: optional string

Indicates that the zone’s verified bot requests are being blocked.

<a href="#">Link to this property</a>

suppress\_session\_score: optional boolean

Indicates that the zone’s session score tracking is disabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

using\_latest\_model: optional boolean

A read-only field that indicates whether the zone currently is running the latest ML model.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SuperBotFightModeDefinitelyConfiguration object {ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 14 more }

</summary>

ai\_bots\_migration\_opt\_out: optional boolean

Temporary migration flag tracking zones opted out of AI bots managed-rule updates.

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bots\_protection: optional "block"or "disabled"or "only\_on\_ad\_pages"

Enable rule to block AI Scrapers and Crawlers.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_search: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI search bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_training: optional "disabled"or "disallow"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI model training bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"disallow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_user: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI assistant and agent bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bot\_preference\_sync\_enabled: optional boolean

Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone’s AI Search, AI User, and AI Training preferences.

<a href="#">Link to this property</a>

<details>

<summary>

cf\_robots\_variant: optional "off"or "policy\_only"

Specifies the Robots Access Control License variant to use.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"policy\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_bots\_protection: optional "block"or "disabled"

Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawler\_protection: optional "enabled"or "disabled"

Enable rule to punish AI Scrapers and Crawlers via a link maze.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enable\_js: optional boolean

Use lightweight, invisible JavaScript detections to improve Bot Management. <a href="https://developers.cloudflare.com/bots/reference/javascript-detections/">Learn more about JavaScript Detections</a>.

<a href="#">Link to this property</a>

is\_robots\_txt\_managed: optional boolean

Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

<a href="#">Link to this property</a>

optimize\_wordpress: optional boolean

Whether to optimize Super Bot Fight Mode protections for Wordpress.

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_definitely\_automated: optional "allow"or "block"or "managed\_challenge"

Super Bot Fight Mode (SBFM) action to take on definitely automated requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sbfm\_static\_resource\_protection: optional boolean

Super Bot Fight Mode (SBFM) to enable static resource protection. Enable if static resources on your application need bot protection. Note: Static resource protection can also result in legitimate traffic being blocked.

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_verified\_bots: optional "allow"or "block"

Super Bot Fight Mode (SBFM) action to take on verified bots requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stale\_zone\_configuration: optional object {fight\_mode, sbfm\_likely\_automated }

A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

</summary>

fight\_mode: optional boolean

Indicates that the zone’s Bot Fight Mode is turned on.

<a href="#">Link to this property</a>

sbfm\_likely\_automated: optional string

Indicates that the zone’s likely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

using\_latest\_model: optional boolean

A read-only field that indicates whether the zone currently is running the latest ML model.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SuperBotFightModeLikelyConfiguration object {ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 15 more }

</summary>

ai\_bots\_migration\_opt\_out: optional boolean

Temporary migration flag tracking zones opted out of AI bots managed-rule updates.

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bots\_protection: optional "block"or "disabled"or "only\_on\_ad\_pages"

Enable rule to block AI Scrapers and Crawlers.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_search: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI search bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_training: optional "disabled"or "disallow"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI model training bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"disallow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_user: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI assistant and agent bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bot\_preference\_sync\_enabled: optional boolean

Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone’s AI Search, AI User, and AI Training preferences.

<a href="#">Link to this property</a>

<details>

<summary>

cf\_robots\_variant: optional "off"or "policy\_only"

Specifies the Robots Access Control License variant to use.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"policy\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_bots\_protection: optional "block"or "disabled"

Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawler\_protection: optional "enabled"or "disabled"

Enable rule to punish AI Scrapers and Crawlers via a link maze.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enable\_js: optional boolean

Use lightweight, invisible JavaScript detections to improve Bot Management. <a href="https://developers.cloudflare.com/bots/reference/javascript-detections/">Learn more about JavaScript Detections</a>.

<a href="#">Link to this property</a>

is\_robots\_txt\_managed: optional boolean

Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

<a href="#">Link to this property</a>

optimize\_wordpress: optional boolean

Whether to optimize Super Bot Fight Mode protections for Wordpress.

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_definitely\_automated: optional "allow"or "block"or "managed\_challenge"

Super Bot Fight Mode (SBFM) action to take on definitely automated requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_likely\_automated: optional "allow"or "block"or "managed\_challenge"

Super Bot Fight Mode (SBFM) action to take on likely automated requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sbfm\_static\_resource\_protection: optional boolean

Super Bot Fight Mode (SBFM) to enable static resource protection. Enable if static resources on your application need bot protection. Note: Static resource protection can also result in legitimate traffic being blocked.

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_verified\_bots: optional "allow"or "block"

Super Bot Fight Mode (SBFM) action to take on verified bots requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stale\_zone\_configuration: optional object {fight\_mode }

A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

</summary>

fight\_mode: optional boolean

Indicates that the zone’s Bot Fight Mode is turned on.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

using\_latest\_model: optional boolean

A read-only field that indicates whether the zone currently is running the latest ML model.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SubscriptionConfiguration object {ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 13 more }

</summary>

ai\_bots\_migration\_opt\_out: optional boolean

Temporary migration flag tracking zones opted out of AI bots managed-rule updates.

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bots\_protection: optional "block"or "disabled"or "only\_on\_ad\_pages"

Enable rule to block AI Scrapers and Crawlers.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_search: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI search bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_training: optional "disabled"or "disallow"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI model training bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"disallow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_user: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI assistant and agent bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

auto\_update\_model: optional boolean

Automatically update to the newest bot detection models created by Cloudflare as they are released. <a href="https://developers.cloudflare.com/bots/reference/machine-learning-models#model-versions-and-release-notes">Learn more.</a>

<a href="#">Link to this property</a>

bm\_cookie\_enabled: optional boolean

Indicates that the bot management cookie can be placed on end user devices accessing the site. Defaults to true

<a href="#">Link to this property</a>

bot\_preference\_sync\_enabled: optional boolean

Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone’s AI Search, AI User, and AI Training preferences.

<a href="#">Link to this property</a>

<details>

<summary>

cf\_robots\_variant: optional "off"or "policy\_only"

Specifies the Robots Access Control License variant to use.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"policy\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_bots\_protection: optional "block"or "disabled"

Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawler\_protection: optional "enabled"or "disabled"

Enable rule to punish AI Scrapers and Crawlers via a link maze.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enable\_js: optional boolean

Use lightweight, invisible JavaScript detections to improve Bot Management. <a href="https://developers.cloudflare.com/bots/reference/javascript-detections/">Learn more about JavaScript Detections</a>.

<a href="#">Link to this property</a>

is\_robots\_txt\_managed: optional boolean

Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

<a href="#">Link to this property</a>

<details>

<summary>

stale\_zone\_configuration: optional object {fight\_mode, optimize\_wordpress, sbfm\_definitely\_automated, 3 more }

A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

</summary>

fight\_mode: optional boolean

Indicates that the zone’s Bot Fight Mode is turned on.

<a href="#">Link to this property</a>

optimize\_wordpress: optional boolean

Indicates that the zone’s wordpress optimization for SBFM is turned on.

<a href="#">Link to this property</a>

sbfm\_definitely\_automated: optional string

Indicates that the zone’s definitely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

sbfm\_likely\_automated: optional string

Indicates that the zone’s likely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

sbfm\_static\_resource\_protection: optional string

Indicates that the zone’s static resource protection is turned on.

<a href="#">Link to this property</a>

sbfm\_verified\_bots: optional string

Indicates that the zone’s verified bot requests are being blocked.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suppress\_session\_score: optional boolean

Whether to disable tracking the highest bot score for a session in the Bot Management cookie.

<a href="#">Link to this property</a>

using\_latest\_model: optional boolean

A read-only field that indicates whether the zone currently is running the latest ML model.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20bot_management%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20bot_fight_mode_configuration%20%3E%20(schema)">BotFightModeConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 11 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_definitely_configuration%20%3E%20(schema)">SuperBotFightModeDefinitelyConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 14 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_likely_configuration%20%3E%20(schema)">SuperBotFightModeLikelyConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 15 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20subscription_configuration%20%3E%20(schema)">SubscriptionConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 13 more }

</summary>

One of the following:

<details>

<summary>

BotFightModeConfiguration object {ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 11 more }

</summary>

ai\_bots\_migration\_opt\_out: optional boolean

Temporary migration flag tracking zones opted out of AI bots managed-rule updates.

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bots\_protection: optional "block"or "disabled"or "only\_on\_ad\_pages"

Enable rule to block AI Scrapers and Crawlers.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_search: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI search bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_training: optional "disabled"or "disallow"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI model training bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"disallow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_user: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI assistant and agent bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bot\_preference\_sync\_enabled: optional boolean

Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone’s AI Search, AI User, and AI Training preferences.

<a href="#">Link to this property</a>

<details>

<summary>

cf\_robots\_variant: optional "off"or "policy\_only"

Specifies the Robots Access Control License variant to use.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"policy\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_bots\_protection: optional "block"or "disabled"

Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawler\_protection: optional "enabled"or "disabled"

Enable rule to punish AI Scrapers and Crawlers via a link maze.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enable\_js: optional boolean

Use lightweight, invisible JavaScript detections to improve Bot Management. <a href="https://developers.cloudflare.com/bots/reference/javascript-detections/">Learn more about JavaScript Detections</a>.

<a href="#">Link to this property</a>

fight\_mode: optional boolean

Whether to enable Bot Fight Mode.

<a href="#">Link to this property</a>

is\_robots\_txt\_managed: optional boolean

Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

<a href="#">Link to this property</a>

<details>

<summary>

stale\_zone\_configuration: optional object {optimize\_wordpress, sbfm\_definitely\_automated, sbfm\_likely\_automated, 3 more }

A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

</summary>

optimize\_wordpress: optional boolean

Indicates that the zone’s wordpress optimization for SBFM is turned on.

<a href="#">Link to this property</a>

sbfm\_definitely\_automated: optional string

Indicates that the zone’s definitely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

sbfm\_likely\_automated: optional string

Indicates that the zone’s likely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

sbfm\_static\_resource\_protection: optional string

Indicates that the zone’s static resource protection is turned on.

<a href="#">Link to this property</a>

sbfm\_verified\_bots: optional string

Indicates that the zone’s verified bot requests are being blocked.

<a href="#">Link to this property</a>

suppress\_session\_score: optional boolean

Indicates that the zone’s session score tracking is disabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

using\_latest\_model: optional boolean

A read-only field that indicates whether the zone currently is running the latest ML model.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SuperBotFightModeDefinitelyConfiguration object {ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 14 more }

</summary>

ai\_bots\_migration\_opt\_out: optional boolean

Temporary migration flag tracking zones opted out of AI bots managed-rule updates.

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bots\_protection: optional "block"or "disabled"or "only\_on\_ad\_pages"

Enable rule to block AI Scrapers and Crawlers.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_search: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI search bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_training: optional "disabled"or "disallow"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI model training bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"disallow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_user: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI assistant and agent bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bot\_preference\_sync\_enabled: optional boolean

Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone’s AI Search, AI User, and AI Training preferences.

<a href="#">Link to this property</a>

<details>

<summary>

cf\_robots\_variant: optional "off"or "policy\_only"

Specifies the Robots Access Control License variant to use.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"policy\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_bots\_protection: optional "block"or "disabled"

Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawler\_protection: optional "enabled"or "disabled"

Enable rule to punish AI Scrapers and Crawlers via a link maze.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enable\_js: optional boolean

Use lightweight, invisible JavaScript detections to improve Bot Management. <a href="https://developers.cloudflare.com/bots/reference/javascript-detections/">Learn more about JavaScript Detections</a>.

<a href="#">Link to this property</a>

is\_robots\_txt\_managed: optional boolean

Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

<a href="#">Link to this property</a>

optimize\_wordpress: optional boolean

Whether to optimize Super Bot Fight Mode protections for Wordpress.

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_definitely\_automated: optional "allow"or "block"or "managed\_challenge"

Super Bot Fight Mode (SBFM) action to take on definitely automated requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sbfm\_static\_resource\_protection: optional boolean

Super Bot Fight Mode (SBFM) to enable static resource protection. Enable if static resources on your application need bot protection. Note: Static resource protection can also result in legitimate traffic being blocked.

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_verified\_bots: optional "allow"or "block"

Super Bot Fight Mode (SBFM) action to take on verified bots requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stale\_zone\_configuration: optional object {fight\_mode, sbfm\_likely\_automated }

A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

</summary>

fight\_mode: optional boolean

Indicates that the zone’s Bot Fight Mode is turned on.

<a href="#">Link to this property</a>

sbfm\_likely\_automated: optional string

Indicates that the zone’s likely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

using\_latest\_model: optional boolean

A read-only field that indicates whether the zone currently is running the latest ML model.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SuperBotFightModeLikelyConfiguration object {ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 15 more }

</summary>

ai\_bots\_migration\_opt\_out: optional boolean

Temporary migration flag tracking zones opted out of AI bots managed-rule updates.

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bots\_protection: optional "block"or "disabled"or "only\_on\_ad\_pages"

Enable rule to block AI Scrapers and Crawlers.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_search: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI search bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_training: optional "disabled"or "disallow"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI model training bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"disallow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_user: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI assistant and agent bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bot\_preference\_sync\_enabled: optional boolean

Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone’s AI Search, AI User, and AI Training preferences.

<a href="#">Link to this property</a>

<details>

<summary>

cf\_robots\_variant: optional "off"or "policy\_only"

Specifies the Robots Access Control License variant to use.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"policy\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_bots\_protection: optional "block"or "disabled"

Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawler\_protection: optional "enabled"or "disabled"

Enable rule to punish AI Scrapers and Crawlers via a link maze.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enable\_js: optional boolean

Use lightweight, invisible JavaScript detections to improve Bot Management. <a href="https://developers.cloudflare.com/bots/reference/javascript-detections/">Learn more about JavaScript Detections</a>.

<a href="#">Link to this property</a>

is\_robots\_txt\_managed: optional boolean

Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

<a href="#">Link to this property</a>

optimize\_wordpress: optional boolean

Whether to optimize Super Bot Fight Mode protections for Wordpress.

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_definitely\_automated: optional "allow"or "block"or "managed\_challenge"

Super Bot Fight Mode (SBFM) action to take on definitely automated requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_likely\_automated: optional "allow"or "block"or "managed\_challenge"

Super Bot Fight Mode (SBFM) action to take on likely automated requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sbfm\_static\_resource\_protection: optional boolean

Super Bot Fight Mode (SBFM) to enable static resource protection. Enable if static resources on your application need bot protection. Note: Static resource protection can also result in legitimate traffic being blocked.

<a href="#">Link to this property</a>

<details>

<summary>

sbfm\_verified\_bots: optional "allow"or "block"

Super Bot Fight Mode (SBFM) action to take on verified bots requests.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stale\_zone\_configuration: optional object {fight\_mode }

A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

</summary>

fight\_mode: optional boolean

Indicates that the zone’s Bot Fight Mode is turned on.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

using\_latest\_model: optional boolean

A read-only field that indicates whether the zone currently is running the latest ML model.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SubscriptionConfiguration object {ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 13 more }

</summary>

ai\_bots\_migration\_opt\_out: optional boolean

Temporary migration flag tracking zones opted out of AI bots managed-rule updates.

<a href="#">Link to this property</a>

<details>

<summary>

ai\_bots\_protection: optional "block"or "disabled"or "only\_on\_ad\_pages"

Enable rule to block AI Scrapers and Crawlers.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_search: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI search bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_training: optional "disabled"or "disallow"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI model training bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"disallow"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ai\_user: optional "disabled"or "block"or "only\_on\_ad\_pages"

Configure robots.txt policy for AI assistant and agent bots.

</summary>

One of the following:

"disabled"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"only\_on\_ad\_pages"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

auto\_update\_model: optional boolean

Automatically update to the newest bot detection models created by Cloudflare as they are released. <a href="https://developers.cloudflare.com/bots/reference/machine-learning-models#model-versions-and-release-notes">Learn more.</a>

<a href="#">Link to this property</a>

bm\_cookie\_enabled: optional boolean

Indicates that the bot management cookie can be placed on end user devices accessing the site. Defaults to true

<a href="#">Link to this property</a>

bot\_preference\_sync\_enabled: optional boolean

Enable Bot Preference Sync for this zone. When enabled, Cloudflare can serve robots.txt content derived from the zone’s AI Search, AI User, and AI Training preferences.

<a href="#">Link to this property</a>

<details>

<summary>

cf\_robots\_variant: optional "off"or "policy\_only"

Specifies the Robots Access Control License variant to use.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"policy\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_bots\_protection: optional "block"or "disabled"

Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawler\_protection: optional "enabled"or "disabled"

Enable rule to punish AI Scrapers and Crawlers via a link maze.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enable\_js: optional boolean

Use lightweight, invisible JavaScript detections to improve Bot Management. <a href="https://developers.cloudflare.com/bots/reference/javascript-detections/">Learn more about JavaScript Detections</a>.

<a href="#">Link to this property</a>

is\_robots\_txt\_managed: optional boolean

Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

<a href="#">Link to this property</a>

<details>

<summary>

stale\_zone\_configuration: optional object {fight\_mode, optimize\_wordpress, sbfm\_definitely\_automated, 3 more }

A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

</summary>

fight\_mode: optional boolean

Indicates that the zone’s Bot Fight Mode is turned on.

<a href="#">Link to this property</a>

optimize\_wordpress: optional boolean

Indicates that the zone’s wordpress optimization for SBFM is turned on.

<a href="#">Link to this property</a>

sbfm\_definitely\_automated: optional string

Indicates that the zone’s definitely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

sbfm\_likely\_automated: optional string

Indicates that the zone’s likely automated requests are being blocked or challenged.

<a href="#">Link to this property</a>

sbfm\_static\_resource\_protection: optional string

Indicates that the zone’s static resource protection is turned on.

<a href="#">Link to this property</a>

sbfm\_verified\_bots: optional string

Indicates that the zone’s verified bot requests are being blocked.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suppress\_session\_score: optional boolean

Whether to disable tracking the highest bot score for a session in the Bot Management cookie.

<a href="#">Link to this property</a>

using\_latest\_model: optional boolean

A read-only field that indicates whether the zone currently is running the latest ML model.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Zone Bot Management Config

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/bot_management \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ai_bots_protection": "block",
          "ai_search": "block",
          "ai_training": "disallow",
          "ai_user": "only_on_ad_pages",
          "bot_preference_sync_enabled": true,
          "cf_robots_variant": "policy_only",
          "content_bots_protection": "disabled",
          "crawler_protection": "enabled",
          "enable_js": true,
          "fight_mode": true
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "ai_bots_migration_opt_out": false,
    "ai_bots_protection": "block",
    "ai_search": "block",
    "ai_training": "disallow",
    "ai_user": "only_on_ad_pages",
    "bot_preference_sync_enabled": true,
    "cf_robots_variant": "policy_only",
    "content_bots_protection": "disabled",
    "crawler_protection": "enabled",
    "enable_js": true,
    "fight_mode": true,
    "is_robots_txt_managed": false,
    "stale_zone_configuration": {
      "optimize_wordpress": true,
      "sbfm_definitely_automated": "sbfm_definitely_automated",
      "sbfm_likely_automated": "sbfm_likely_automated",
      "sbfm_static_resource_protection": "sbfm_static_resource_protection",
      "sbfm_verified_bots": "sbfm_verified_bots",
      "suppress_session_score": true
    },
    "using_latest_model": true
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "ai_bots_migration_opt_out": false,
    "ai_bots_protection": "block",
    "ai_search": "block",
    "ai_training": "disallow",
    "ai_user": "only_on_ad_pages",
    "bot_preference_sync_enabled": true,
    "cf_robots_variant": "policy_only",
    "content_bots_protection": "disabled",
    "crawler_protection": "enabled",
    "enable_js": true,
    "fight_mode": true,
    "is_robots_txt_managed": false,
    "stale_zone_configuration": {
      "optimize_wordpress": true,
      "sbfm_definitely_automated": "sbfm_definitely_automated",
      "sbfm_likely_automated": "sbfm_likely_automated",
      "sbfm_static_resource_protection": "sbfm_static_resource_protection",
      "sbfm_verified_bots": "sbfm_verified_bots",
      "suppress_session_score": true
    },
    "using_latest_model": true
  }
}
```