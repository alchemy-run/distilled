> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Install the Whop pixel

> Add the whop.track snippet to your funnel to measure page views, identify visitors, and attribute conversions from first-party data.

The Whop pixel is a lightweight JavaScript snippet you add to your website. It measures page views, links visitors to their purchases, and attributes conversions back to your ads — using Whop's first-party payment data instead of third-party cookies. Once installed, everything shows up live in your [pixel dashboard](https://whop.com/dashboard/biz_xxxxxxxxxxxxx/pixel).

<Note>
  You only need your **account ID** (`biz_xxxxxxxxxxxxx`) to install the pixel. Find it in the URL of your dashboard, or on the pixel page at `https://whop.com/dashboard/{biz_id}/pixel`.
</Note>

## Install the snippet

Paste this snippet inside the `<head>` of **every page** in your funnel — landing pages, advertorials, checkouts, and thank-you pages, not just your homepage. Replace `biz_xxxxxxxxxxxxx` with your own account ID.

```html Pixel snippet theme={null}
<script>
!function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");
whop.setScope("biz_xxxxxxxxxxxxx");
whop.track("page");
</script>
```

<Tip>
  If your platform (Shopify, Webflow, Framer, WordPress, etc.) has a dedicated field for custom header or `<head>` code, paste the snippet there so it ships on every page template automatically.
</Tip>

<Note>
  For most brands — especially e-commerce stores that send traffic to Whop checkout — this snippet is all you need. Whop automatically tracks page views, checkout views, purchases, subscriptions, and trials. You only need extra event code if you want to track steps Whop can't see, like a lead form on your own site.
</Note>

## Verify the install

Open `https://whop.com/dashboard/{biz_id}/pixel` and watch **Step 1 — Install the pixel**. Page views appear within about a minute of the first visit, and the status turns green once data starts flowing. The page also lists domains that report pixel events.

## Track events

Most brands can skip this section. Add extra `whop.track` calls only when your funnel has an important step outside Whop checkout — for example a lead form, call booking, application, or quiz.

The most common setup is to fire `whop.track("lead")` either:

* when the lead form submits successfully
* on the thank-you page or confirmation page the visitor sees after submitting

```javascript Tracking events theme={null}
whop.track("lead");                                      // a standard event
whop.track("schedule", { value: 50, currency: "USD" });  // optionally with a value
whop.track("quiz_completed");                            // or your own event name
```

### Standard event names

Use these names for common funnel moments. Each one optionally accepts a `value` (number) and `currency` (International Organization for Standardization (ISO) 4217 code).

| Event                   | When to fire it                                    |
| ----------------------- | -------------------------------------------------- |
| `lead`                  | A visitor submits contact info or an opt-in form   |
| `schedule`              | A visitor books a call or appointment              |
| `submit_application`    | A visitor submits an application                   |
| `contact`               | A visitor starts a conversation or contact request |
| `complete_registration` | A signup or registration finishes                  |
| `view_content`          | A visitor views a key page or piece of content     |
| `add_to_cart`           | A visitor adds an item to a cart                   |

### Your own event names

You can track anything else your funnel does under a name you choose — pass it as the event name. It shows up under that name in your ads reporting, and takes the same `value`, `currency`, and customer fields as a standard event.

```javascript Custom event theme={null}
whop.track("watched_vsl");
whop.track("quiz_completed", { value: 25, currency: "USD" });
```

Keep names short and stable, and reuse a small set. Whop stores names up to 250 characters, but forwards only names under about 34 characters to Meta as custom conversions. Longer names still appear in Whop reporting.

<Note>
  The older two-field form, `whop.track("custom", { name: "watched_vsl" })`, still works and reports identically, so existing installs need no changes.
</Note>

<Tip>
  **Where to put the tracking call depends on what happens after the action.**

  * **The action doesn't redirect** (e.g. a form that submits in place and shows an inline success message). Fire the event in the action's success handler, such as the form's `onSubmit` callback, after it succeeds:

  ```javascript Track on submit (no redirect) theme={null}
  form.addEventListener("submit", async (e) => {
  	e.preventDefault();
  	await submitForm();
  	whop.track("watched_vsl");
  });
  ```

  * **The action redirects** (e.g. a form that sends the visitor to a new page on submit). Fire the event on the page they land on, such as the thank-you or confirmation page. Make sure the pixel snippet is installed on that page too.
</Tip>

### Give each event an ID

Pass an `event_id` with any event that could reach Whop more than once. Whop counts each `event_name` and `event_id` pair once, so a retry, a page refresh, or the same conversion sent from two places collapses into a single event.

```javascript Event with an ID theme={null}
whop.track("lead", { event_id: "lead_8f21c0" }); // one visitor's form submission
whop.track("lead", { event_id: "lead_2b94de" }); // a different visitor's
```

**The ID identifies one single event, not the type of event.** Every lead needs its own. Send `"lead"` as the ID for every lead and Whop treats them all as one event, so hundreds of leads show up as one.

Use a value your own system already has for that one action — a lead ID, order number, or form submission ID. Reuse that value only when you're sending that same action again. A retry counts as the same action. So does the same conversion mirrored from your server. A value made up at fire time is new every time, so it won't stop duplicates.

If the same conversion can come from both your website and your server, send the same `event_id` from both so it lands as one event.

<Note>
  You can leave `event_id` out. Whop then assigns one for you, which keeps the event valid. That assigned value is new on every request, so repeat sends of the same action can't be matched to each other.
</Note>

### Attach customer fields

You usually **don't** need to attach extra customer fields. Whop can often match events from the pixel, checkout activity, browser signals, and first-party payment data automatically.

If you already have customer details available when an event fires, you can attach them for extra matching coverage. It doesn't hurt to include them, and it can improve matching. You can attach these fields to any event type and send only the fields you have.

```javascript Lead with customer fields theme={null}
whop.track("lead", {
  email: "visitor@example.com",
  first_name: "Jane",
  last_name: "Doe",
  name: "Jane Doe",
  phone: "+15551234567",
  external_id: "customer_123",
  city: "New York",
  state: "NY",
  postal_code: "10001",
  country: "US",
});
```

| Field         | Description                  |
| ------------- | ---------------------------- |
| `email`       | Visitor's email address      |
| `first_name`  | Visitor's first name         |
| `last_name`   | Visitor's last name          |
| `name`        | Visitor's full display name  |
| `phone`       | Visitor's phone number       |
| `external_id` | Your own user/customer ID    |
| `city`        | Visitor's city               |
| `state`       | Visitor's state or region    |
| `postal_code` | Visitor's postal or ZIP code |
| `country`     | Visitor's country            |

<Warning>
  Send these as plain text. A hashed email gets dropped because it isn't a valid address. A hashed phone number gets stored as meaningless digits and matches nobody.
</Warning>

<Note>
  **Don't track purchases, subscriptions, or trials.** Whop records every checkout view, purchase, subscription, and trial start server-side with zero configuration. The pixel won't accept duplicates. Only send events Whop can't see. Examples include leads and bookings on your own infrastructure.
</Note>

## Send events from your server

You can send events from your backend instead of the browser or alongside it. Ad blockers can't touch server-side events, and these events are more reliable for high-value conversions. Use the [Events API](/api-reference/beta/events/create-event). Attach as much customer information as you have so the event attributes correctly.

If you run browser and server tags side by side for the same conversion, send the same `event_id` from both. That's what keeps it from being counted twice.

<Card title="Events API reference" href="/api-reference/beta/events/create-event" icon="server">
  Create conversion events from your server with an API key. Full endpoint, fields, and examples.
</Card>

## Advanced: Multiple accounts on one page

Most brands can ignore this. It only applies if the same website or landing page is intentionally tracking events for more than one Whop business.

In that case, define a default scope with multiple IDs, or scope an individual call.

```javascript Scoping theme={null}
// Default scope for every subsequent event
whop.setScope("biz_accountA", "biz_accountB");
whop.track("lead");

// Or scope a single call
whop.scope("biz_accountA").track("lead");
```

## Next steps

<CardGroup cols={2}>
  <Card title="Events API" href="/api-reference/beta/events/create-event">
    Send conversions from your server when browser tracking isn't enough. Ad blockers can't touch them.
  </Card>

  <Card title="Whop Ads & the Whop Pixel" href="/manage-your-business/growth-marketing/ads">
    How first-party attribution powers ad measurement.
  </Card>

  <Card title="Tracking integrations" href="/manage-your-business/growth-marketing/tracking-integrations">
    Pipe Whop sales data into Meta, Google, Hyros, and other platforms.
  </Card>

  <Card title="Tracking links" href="/manage-your-business/growth-marketing/tracking-links">
    Build branded links to attribute traffic and conversions across channels.
  </Card>
</CardGroup>
