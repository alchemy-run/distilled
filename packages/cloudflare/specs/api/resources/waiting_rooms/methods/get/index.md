---
title: Waiting room details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Waiting room details

GET/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}

Fetches a single configured waiting room.

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

`Waiting Rooms Read``Waiting Rooms Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20waiting_rooms%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

waiting\_room\_id: string

[Link to this property](#)%20waiting_rooms%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20waiting_room_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/waiting_rooms#(resource)%20waiting_rooms%20%3E%20(model)%20waiting_room%20%3E%20(schema)">WaitingRoom</a> { id, additional\_routes, cookie\_attributes, 23 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

additional\_routes: optional array of <a href="https://developers.cloudflare.com/api/resources/waiting_rooms#(resource)%20waiting_rooms%20%3E%20(model)%20additional_routes%20%3E%20(schema)">AdditionalRoutes</a> { host, path }

Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

</summary>

host: optional string

The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

<a href="#">Link to this property</a>

path: optional string

Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cookie\_attributes: optional <a href="https://developers.cloudflare.com/api/resources/waiting_rooms#(resource)%20waiting_rooms%20%3E%20(model)%20cookie_attributes%20%3E%20(schema)">CookieAttributes</a> { samesite, secure }

Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user’s status in the waiting room, such as queue position.

</summary>

<details>

<summary>

samesite: optional "auto"or "lax"or "none"or "strict"

Configures the SameSite attribute on the waiting room cookie. Value <code>auto</code> will be translated to <code>lax</code> or <code>none</code> depending if **Always Use HTTPS** is enabled. Note that when using value <code>none</code>, the secure attribute cannot be set to <code>never</code>.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"lax"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

secure: optional "auto"or "always"or "never"

Configures the Secure attribute on the waiting room cookie. Value <code>always</code> indicates that the Secure attribute will be set in the Set-Cookie header, <code>never</code> indicates that the Secure attribute will not be set, and <code>auto</code> will set the Secure attribute depending if **Always Use HTTPS** is enabled.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"always"

<a href="#">Link to this property</a>

"never"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cookie\_suffix: optional string

Appends a ’\_’ + a custom suffix to the end of Cloudflare Waiting Room’s cookie name(\_\_cf\_waitingroom). If <code>cookie_suffix</code> is “abcd”, the cookie name will be <code>__cf_waitingroom_abcd</code>. This field is required if using <code>additional_routes</code>.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

custom\_page\_html: optional string

Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom\_page\_html is provided, the default waiting room will be used. The template is based on mustache ( <a href="https://mustache.github.io/">https://mustache.github.io/</a> ). There are several variables that are evaluated by the Cloudflare edge:

1. {{<code>waitTimeKnown</code>}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue\_all is **true**.
2. {{<code>waitTimeFormatted</code>}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
3. {{<code>waitTime</code>}} Number of minutes of estimated wait for a user.
4. {{<code>waitTimeHours</code>}} Number of hours of estimated wait for a user (<code>Math.floor(waitTime/60)</code>).
5. {{<code>waitTimeHourMinutes</code>}} Number of minutes above the <code>waitTimeHours</code> value (<code>waitTime%60</code>).
6. {{<code>queueIsFull</code>}} Changes to **true** when no more people can be added to the queue.

To view the full list of variables, look at the <code>cfWaitingRoom</code> object described under the <code>json_response_enabled</code> property in other Waiting Room API calls.

<a href="#">Link to this property</a>

<details>

<summary>

default\_template\_language: optional "en-US"or "es-ES"or "de-DE"or 35 more

The language of the default page template. If no default\_template\_language is provided, then <code>en-US</code> (English) will be used.

</summary>

One of the following:

"en-US"

<a href="#">Link to this property</a>

"es-ES"

<a href="#">Link to this property</a>

"de-DE"

<a href="#">Link to this property</a>

"fr-FR"

<a href="#">Link to this property</a>

"it-IT"

<a href="#">Link to this property</a>

"ja-JP"

<a href="#">Link to this property</a>

"ko-KR"

<a href="#">Link to this property</a>

"pt-BR"

<a href="#">Link to this property</a>

"zh-CN"

<a href="#">Link to this property</a>

"zh-TW"

<a href="#">Link to this property</a>

"nl-NL"

<a href="#">Link to this property</a>

"pl-PL"

<a href="#">Link to this property</a>

"id-ID"

<a href="#">Link to this property</a>

"tr-TR"

<a href="#">Link to this property</a>

"ar-EG"

<a href="#">Link to this property</a>

"ru-RU"

<a href="#">Link to this property</a>

"fa-IR"

<a href="#">Link to this property</a>

"bg-BG"

<a href="#">Link to this property</a>

"hr-HR"

<a href="#">Link to this property</a>

"cs-CZ"

<a href="#">Link to this property</a>

"da-DK"

<a href="#">Link to this property</a>

"fi-FI"

<a href="#">Link to this property</a>

"lt-LT"

<a href="#">Link to this property</a>

"ms-MY"

<a href="#">Link to this property</a>

"nb-NO"

<a href="#">Link to this property</a>

"ro-RO"

<a href="#">Link to this property</a>

"el-GR"

<a href="#">Link to this property</a>

"he-IL"

<a href="#">Link to this property</a>

"hi-IN"

<a href="#">Link to this property</a>

"hu-HU"

<a href="#">Link to this property</a>

"sr-BA"

<a href="#">Link to this property</a>

"sk-SK"

<a href="#">Link to this property</a>

"sl-SI"

<a href="#">Link to this property</a>

"sv-SE"

<a href="#">Link to this property</a>

"tl-PH"

<a href="#">Link to this property</a>

"th-TH"

<a href="#">Link to this property</a>

"uk-UA"

<a href="#">Link to this property</a>

"vi-VN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

A note that you can use to add more details about the waiting room.

<a href="#">Link to this property</a>

disable\_session\_renewal: optional boolean

Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If <code>true</code>, an accepted user will have session\_duration minutes to browse the site. After that, they will have to go through the waiting room again. If <code>false</code>, a user’s session cookie will be automatically renewed on every request.

<a href="#">Link to this property</a>

enabled\_origin\_commands: optional array of "revoke"

A list of enabled origin commands.

<a href="#">Link to this property</a>

host: optional string

The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

<a href="#">Link to this property</a>

json\_response\_enabled: optional boolean

Only available for the Waiting Room Advanced subscription. If <code>true</code>, requests to the waiting room with the header <code>Accept: application/json</code> will receive a JSON response object with information on the user’s status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property <code>cfWaitingRoom</code> which is an object containing the following fields:

1. <code>inWaitingRoom</code>: Boolean indicating if the user is in the waiting room (always **true**).
2. <code>waitTimeKnown</code>: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
3. <code>waitTime</code>: Valid only when <code>waitTimeKnown</code> is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When <code>queueingMethod</code> is **random**, this is set to <code>waitTime50Percentile</code>.
4. <code>waitTime25Percentile</code>: Valid only when <code>queueingMethod</code> is **random** and <code>waitTimeKnown</code> is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
5. <code>waitTime50Percentile</code>: Valid only when <code>queueingMethod</code> is **random** and <code>waitTimeKnown</code> is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before <code>waitTime50Percentile</code> and half are expected to be let in after it.
6. <code>waitTime75Percentile</code>: Valid only when <code>queueingMethod</code> is **random** and <code>waitTimeKnown</code> is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
7. <code>waitTimeFormatted</code>: String displaying the <code>waitTime</code> formatted in English for users. If <code>waitTimeKnown</code> is **false**, <code>waitTimeFormatted</code> will display **unavailable**.
8. <code>queueIsFull</code>: Boolean indicating if the waiting room’s queue is currently full and not accepting new users at the moment.
9. <code>queueAll</code>: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
10. <code>lastUpdated</code>: String displaying the timestamp as an ISO 8601 string of the user’s last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after <code>refreshIntervalSeconds</code> past this time. If the user makes a request too soon, it will be ignored and <code>lastUpdated</code> will not change.
11. <code>refreshIntervalSeconds</code>: Integer indicating the number of seconds after <code>lastUpdated</code> until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the <code>queueingMethod</code> is <code>reject</code>, there is no specified refresh time —\_it will always be **zero**.
12. <code>queueingMethod</code>: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
13. <code>isFIFOQueue</code>: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
14. <code>isRandomQueue</code>: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
15. <code>isPassthroughQueue</code>: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when <code>queueAll</code> is **true** or <code>isEventPrequeueing</code> is **true** because in all other cases requests will go directly to the origin.
16. <code>isRejectQueue</code>: Boolean indicating if the waiting room uses a reject queue.
17. <code>isEventActive</code>: Boolean indicating if an event is currently occurring. Events are able to change a waiting room’s behavior during a specified period of time. For additional information, look at the event properties <code>prequeue_start_time</code>, <code>event_start_time</code>, and <code>event_end_time</code> in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
18. <code>isEventPrequeueing</code>: Valid only when <code>isEventActive</code> is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
19. <code>timeUntilEventStart</code>: Valid only when <code>isEventPrequeueing</code> is **true**. Integer indicating the number of minutes until the event starts.
20. <code>timeUntilEventStartFormatted</code>: String displaying the <code>timeUntilEventStart</code> formatted in English for users. If <code>isEventPrequeueing</code> is **false**, <code>timeUntilEventStartFormatted</code> will display **unavailable**.
21. <code>timeUntilEventEnd</code>: Valid only when <code>isEventActive</code> is **true**. Integer indicating the number of minutes until the event ends.
22. <code>timeUntilEventEndFormatted</code>: String displaying the <code>timeUntilEventEnd</code> formatted in English for users. If <code>isEventActive</code> is **false**, <code>timeUntilEventEndFormatted</code> will display **unavailable**.
23. <code>shuffleAtEventStart</code>: Valid only when <code>isEventActive</code> is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
24. <code>turnstile</code>: Empty when turnstile isn’t enabled. String displaying an html tag to display the Turnstile widget. Please add the <code>{{{turnstile}}}</code> tag to the <code>custom_html</code> template to ensure the Turnstile widget appears.
25. <code>infiniteQueue</code>: Boolean indicating whether the response is for a user in the infinite queue.

An example cURL to a waiting room could be:

```plaintext
curl -X GET "https://example.com/waitingroom" \
	-H "Accept: application/json"
```

If <code>json_response_enabled</code> is **true** and the request hits the waiting room, an example JSON response when <code>queueingMethod</code> is **fifo** and no event is active could be:

```plaintext
{
	"cfWaitingRoom": {
		"inWaitingRoom": true,
		"waitTimeKnown": true,
		"waitTime": 10,
		"waitTime25Percentile": 0,
		"waitTime50Percentile": 0,
		"waitTime75Percentile": 0,
		"waitTimeFormatted": "10 minutes",
		"queueIsFull": false,
		"queueAll": false,
		"lastUpdated": "2020-08-03T23:46:00.000Z",
		"refreshIntervalSeconds": 20,
		"queueingMethod": "fifo",
		"isFIFOQueue": true,
		"isRandomQueue": false,
		"isPassthroughQueue": false,
		"isRejectQueue": false,
		"isEventActive": false,
		"isEventPrequeueing": false,
		"timeUntilEventStart": 0,
		"timeUntilEventStartFormatted": "unavailable",
		"timeUntilEventEnd": 0,
		"timeUntilEventEndFormatted": "unavailable",
		"shuffleAtEventStart": false
	}
}
```

If <code>json_response_enabled</code> is **true** and the request hits the waiting room, an example JSON response when <code>queueingMethod</code> is **random** and an event is active could be:

```plaintext
{
	"cfWaitingRoom": {
		"inWaitingRoom": true,
		"waitTimeKnown": true,
		"waitTime": 10,
		"waitTime25Percentile": 5,
		"waitTime50Percentile": 10,
		"waitTime75Percentile": 15,
		"waitTimeFormatted": "5 minutes to 15 minutes",
		"queueIsFull": false,
		"queueAll": false,
		"lastUpdated": "2020-08-03T23:46:00.000Z",
		"refreshIntervalSeconds": 20,
		"queueingMethod": "random",
		"isFIFOQueue": false,
		"isRandomQueue": true,
		"isPassthroughQueue": false,
		"isRejectQueue": false,
		"isEventActive": true,
		"isEventPrequeueing": false,
		"timeUntilEventStart": 0,
		"timeUntilEventStartFormatted": "unavailable",
		"timeUntilEventEnd": 15,
		"timeUntilEventEndFormatted": "15 minutes",
		"shuffleAtEventStart": true
	}
}
```

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

<a href="#">Link to this property</a>

new\_users\_per\_minute: optional number

Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

maximum2147483647

minimum200

<a href="#">Link to this property</a>

next\_event\_prequeue\_start\_time: optional string

An ISO 8601 timestamp that marks when the next event will begin queueing.

<a href="#">Link to this property</a>

next\_event\_start\_time: optional string

An ISO 8601 timestamp that marks when the next event will start.

<a href="#">Link to this property</a>

path: optional string

Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

<a href="#">Link to this property</a>

queue\_all: optional boolean

If queue\_all is <code>true</code>, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

<a href="#">Link to this property</a>

<details>

<summary>

queueing\_method: optional "fifo"or "random"or "passthrough"or "reject"

Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if <code>queue_all</code> is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

1. <code>fifo</code> **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
2. <code>random</code>: Random queue where customers gain access randomly, regardless of arrival time.
3. <code>passthrough</code>: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with <code>suspended</code>) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
4. <code>reject</code>: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses <code>reject</code>, and its events override this with <code>fifo</code>, <code>random</code>, or <code>passthrough</code>. When this queueing method is enabled and neither <code>queueAll</code> is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

</summary>

One of the following:

"fifo"

<a href="#">Link to this property</a>

"random"

<a href="#">Link to this property</a>

"passthrough"

<a href="#">Link to this property</a>

"reject"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

queueing\_status\_code: optional 200or 202or 429

HTTP status code returned to a user while in the queue.

</summary>

One of the following:

200

<a href="#">Link to this property</a>

202

<a href="#">Link to this property</a>

429

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_duration: optional number

Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

maximum30

minimum1

<a href="#">Link to this property</a>

suspended: optional boolean

Suspends or allows traffic going to the waiting room. If set to <code>true</code>, the traffic will not go to the waiting room.

<a href="#">Link to this property</a>

total\_active\_users: optional number

Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

maximum2147483647

minimum200

<a href="#">Link to this property</a>

<details>

<summary>

turnstile\_action: optional "log"or "infinite\_queue"

Which action to take when a bot is detected using Turnstile. <code>log</code> will have no impact on queueing behavior, simply keeping track of how many bots are detected in Waiting Room Analytics. <code>infinite_queue</code> will send bots to a false queueing state, where they will never reach your origin. <code>infinite_queue</code> requires Advanced Waiting Room.

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"infinite\_queue"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

turnstile\_mode: optional "off"or "invisible"or "visible\_non\_interactive"or "visible\_managed"

Which Turnstile widget type to use for detecting bot traffic. See <a href="https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types">the Turnstile documentation</a> for the definitions of these widget types. Set to <code>off</code> to disable the Turnstile integration entirely. Setting this to anything other than <code>off</code> or <code>invisible</code> requires Advanced Waiting Room.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"invisible"

<a href="#">Link to this property</a>

"visible\_non\_interactive"

<a href="#">Link to this property</a>

"visible\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Waiting room details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252",
    "additional_routes": [
      {
        "host": "shop2.example.com",
        "path": "/shop2/checkout"
      }
    ],
    "cookie_attributes": {
      "samesite": "auto",
      "secure": "auto"
    },
    "cookie_suffix": "abcd",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
    "default_template_language": "es-ES",
    "description": "Production - DO NOT MODIFY",
    "disable_session_renewal": false,
    "enabled_origin_commands": [
      "revoke"
    ],
    "host": "shop.example.com",
    "json_response_enabled": false,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar",
    "new_users_per_minute": 200,
    "next_event_prequeue_start_time": "2021-09-28T15:00:00Z",
    "next_event_start_time": "2021-09-28T15:00:00Z",
    "path": "/shop/checkout",
    "queue_all": true,
    "queueing_method": "fifo",
    "queueing_status_code": 202,
    "session_duration": 1,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252",
    "additional_routes": [
      {
        "host": "shop2.example.com",
        "path": "/shop2/checkout"
      }
    ],
    "cookie_attributes": {
      "samesite": "auto",
      "secure": "auto"
    },
    "cookie_suffix": "abcd",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
    "default_template_language": "es-ES",
    "description": "Production - DO NOT MODIFY",
    "disable_session_renewal": false,
    "enabled_origin_commands": [
      "revoke"
    ],
    "host": "shop.example.com",
    "json_response_enabled": false,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar",
    "new_users_per_minute": 200,
    "next_event_prequeue_start_time": "2021-09-28T15:00:00Z",
    "next_event_start_time": "2021-09-28T15:00:00Z",
    "path": "/shop/checkout",
    "queue_all": true,
    "queueing_method": "fifo",
    "queueing_status_code": 202,
    "session_duration": 1,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```