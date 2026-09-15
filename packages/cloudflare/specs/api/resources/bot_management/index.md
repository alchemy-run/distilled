---
title: Bot Management
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bot Management

##### [Get Zone Bot Management Config](https://developers.cloudflare.com/api/resources/bot_management/methods/get)

GET/zones/{zone\_id}/bot\_management

##### [Update Zone Bot Management Config](https://developers.cloudflare.com/api/resources/bot_management/methods/update)

PUT/zones/{zone\_id}/bot\_management

##### ModelsExpand Collapse

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

[Link to this property](#)%20bot_management%20%3E%20(model)%20bot_fight_mode_configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20bot_management%20%3E%20(model)%20subscription_configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_definitely_configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_likely_configuration%20%3E%20(schema)>)

<details>

<summary>

BotManagementGetResponse = <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20bot_fight_mode_configuration%20%3E%20(schema)">BotFightModeConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 11 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_definitely_configuration%20%3E%20(schema)">SuperBotFightModeDefinitelyConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 14 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_likely_configuration%20%3E%20(schema)">SuperBotFightModeLikelyConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 15 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20subscription_configuration%20%3E%20(schema)">SubscriptionConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 13 more }

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

[Link to this property](#)%20bot_management%20%3E%20(model)%20bot_management_get_response%20%3E%20(schema)>)

<details>

<summary>

BotManagementUpdateResponse = <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20bot_fight_mode_configuration%20%3E%20(schema)">BotFightModeConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 11 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_definitely_configuration%20%3E%20(schema)">SuperBotFightModeDefinitelyConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 14 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20super_bot_fight_mode_likely_configuration%20%3E%20(schema)">SuperBotFightModeLikelyConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 15 more } or <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management%20%3E%20(model)%20subscription_configuration%20%3E%20(schema)">SubscriptionConfiguration</a> { ai\_bots\_migration\_opt\_out, ai\_bots\_protection, ai\_search, 13 more }

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

[Link to this property](#)%20bot_management%20%3E%20(model)%20bot_management_update_response%20%3E%20(schema)>)

#### Bot ManagementFeedback

##### [List zone feedback reports](https://developers.cloudflare.com/api/resources/bot_management/subresources/feedback/methods/list)

GET/zones/{zone\_id}/bot\_management/feedback

##### [Submit a feedback report](https://developers.cloudflare.com/api/resources/bot_management/subresources/feedback/methods/create)

POST/zones/{zone\_id}/bot\_management/feedback

##### ModelsExpand Collapse

<details>

<summary>

FeedbackReport object {description, expression, first\_request\_seen\_at, 8 more }

</summary>

description: string

<a href="#">Link to this property</a>

expression: string

Wirefilter expression describing the traffic being reported.

<a href="#">Link to this property</a>

first\_request\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

last\_request\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

requests: number

formatint64

<a href="#">Link to this property</a>

requests\_by\_attribute: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_attribute%20%3E%20(schema)">RequestsByAttribute</a> { metric, requests }

Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

<a href="#">Link to this property</a>

requests\_by\_score: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_score%20%3E%20(schema)">RequestsByScore</a>

Map of bot scores (1-99) to request counts. Sum must equal <code>requests</code>.

<a href="#">Link to this property</a>

requests\_by\_score\_src: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_score_src%20%3E%20(schema)">RequestsByScoreSrc</a>

Map of score source to request counts. Sum must equal <code>requests</code>.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20feedback_type%20%3E%20(schema)">FeedbackType</a>

Type of feedback report.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

subtype: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)>)

<details>

<summary>

FeedbackType = "false\_positive"or "false\_negative"

Type of feedback report.

</summary>

One of the following:

"false\_positive"

<a href="#">Link to this property</a>

"false\_negative"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_type%20%3E%20(schema)>)

<details>

<summary>

MetricRequests object {metric, requests }

</summary>

metric: string

<a href="#">Link to this property</a>

requests: number

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20metric_requests%20%3E%20(schema)>)

<details>

<summary>

RequestsByAttribute = map\[array of <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20metric_requests%20%3E%20(schema)">MetricRequests</a> { metric, requests } ]

Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

</summary>

metric: string

<a href="#">Link to this property</a>

requests: number

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20requests_by_attribute%20%3E%20(schema)>)

RequestsByScore = map\[number]

Map of bot scores (1-99) to request counts. Sum must equal `requests`.

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20requests_by_score%20%3E%20(schema)>)

RequestsByScoreSrc = map\[number]

Map of score source to request counts. Sum must equal `requests`.

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20requests_by_score_src%20%3E%20(schema)>)

<details>

<summary>

FeedbackListResponse = array of <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)">FeedbackReport</a> { description, expression, first\_request\_seen\_at, 8 more }

</summary>

description: string

<a href="#">Link to this property</a>

expression: string

Wirefilter expression describing the traffic being reported.

<a href="#">Link to this property</a>

first\_request\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

last\_request\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

requests: number

formatint64

<a href="#">Link to this property</a>

requests\_by\_attribute: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_attribute%20%3E%20(schema)">RequestsByAttribute</a> { metric, requests }

Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

<a href="#">Link to this property</a>

requests\_by\_score: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_score%20%3E%20(schema)">RequestsByScore</a>

Map of bot scores (1-99) to request counts. Sum must equal <code>requests</code>.

<a href="#">Link to this property</a>

requests\_by\_score\_src: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_score_src%20%3E%20(schema)">RequestsByScoreSrc</a>

Map of score source to request counts. Sum must equal <code>requests</code>.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20feedback_type%20%3E%20(schema)">FeedbackType</a>

Type of feedback report.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

subtype: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_list_response%20%3E%20(schema)>)