> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ad

An Ad is the individual creative unit delivered by an [ad group](/api-reference/beta/ad-groups/ad-group). It holds the copy, creative assets, and destination URL for one ad.

Use the Ads API to list ads for an account, create ads inside ad groups, retrieve or update creative details, delete ads that should stop running, and pause or resume delivery.

## Endpoints

| Endpoint                                                   | Request                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| [List Ads](/api-reference/beta/ads/list-ads)               | <Badge color="blue" size="sm" stroke>GET</Badge> `/ads`                  |
| [Create an Ad](/api-reference/beta/ads/create-an-ad)       | <Badge color="green" size="sm" stroke>POST</Badge> `/ads`                |
| [Retrieve an Ad](/api-reference/beta/ads/retrieve-an-ad)   | <Badge color="blue" size="sm" stroke>GET</Badge> `/ads/{id}`             |
| [Update an Ad](/api-reference/beta/ads/update-an-ad)       | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/ads/{id}`         |
| [Delete an Ad](/api-reference/beta/ads/delete-an-ad)       | <Badge color="red" size="sm" stroke>DELETE</Badge> `/ads/{id}`           |
| [Duplicate an Ad](/api-reference/beta/ads/duplicate-an-ad) | <Badge color="green" size="sm" stroke>POST</Badge> `/ads/{id}/duplicate` |
| [Pause an Ad](/api-reference/beta/ads/pause-an-ad)         | <Badge color="green" size="sm" stroke>POST</Badge> `/ads/{id}/pause`     |
| [Unpause an Ad](/api-reference/beta/ads/unpause-an-ad)     | <Badge color="green" size="sm" stroke>POST</Badge> `/ads/{id}/unpause`   |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Unique identifier for the ad, prefixed `ad_`.
    </ResponseField>

    <ResponseField name="ad_campaign" type="object" required>
      The ad campaign this ad belongs to.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The referenced entity's id.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="ad_group" type="object" required>
      The ad group this ad belongs to.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The referenced entity's id.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="added_to_cart_value" type="number" required>
      USD value attributed to add-to-cart events. Sums the value sent with each
      event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="added_to_carts" type="number" required>
      Whop pixel-attributed add-to-cart events, last-click.
    </ResponseField>

    <ResponseField name="call_to_action" type="string | null" required>
      The call-to-action button shown on the ad.

      Available options: `learn_more`, `shop_now`, `sign_up`, `subscribe`, `get_started`, `book_now`, `apply_now`, `contact_us`, `download`, `order_now`, `buy_now`, `get_quote`, `message_page`, `whatsapp_message`, `instagram_message`, `call_now`, `get_directions`, `send_updates`, `get_offer`, `watch_more`, `listen_now`, `play_game`, `open_link`, `no_button`, `get_offer_view`, `get_event_tickets`, `see_menu`, `request_time`, `event_rsvp`, `see_details`, `view_instagram_profile`
    </ResponseField>

    <ResponseField name="click_through_rate" type="number" required>
      Clicks divided by impressions, between 0 and 1.
    </ResponseField>

    <ResponseField name="clicks" type="number" required>
      The number of clicks.
    </ResponseField>

    <ResponseField name="completed_registration_value" type="number" required>
      USD value attributed to complete-registration events. Sums the value sent with
      each event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="completed_registrations" type="number" required>
      Whop pixel-attributed complete-registration events, last-click.
    </ResponseField>

    <ResponseField name="contact_value" type="number" required>
      USD value attributed to contact events. Sums the value sent with each event,
      normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="contacts" type="number" required>
      Whop pixel-attributed contact events, last-click.
    </ResponseField>

    <ResponseField name="cost_per_added_to_cart" type="number | null" required>
      Spend divided by attributed add-to-cart events; null when they are not the
      goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_click" type="number" required>
      Spend divided by clicks; 0 when there are no clicks.
    </ResponseField>

    <ResponseField name="cost_per_completed_registration" type="number | null" required>
      Spend divided by attributed complete-registration events; null when they are
      not the goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_contact" type="number | null" required>
      Spend divided by attributed contact events; null when contacts are not the
      goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_lead" type="number | null" required>
      Spend divided by attributed leads; null when leads are not a goal and none are
      attributed.
    </ResponseField>

    <ResponseField name="cost_per_mille" type="number" required>
      Spend per 1,000 impressions; 0 when there are no impressions.
    </ResponseField>

    <ResponseField name="cost_per_purchase" type="number | null" required>
      Spend divided by attributed purchases; null when purchases are not a goal and
      none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_result" type="number | null" required>
      Spend divided by Whop pixel-attributed results; null when nothing
      Whop-attributable is being optimized for.
    </ResponseField>

    <ResponseField name="cost_per_schedule" type="number | null" required>
      Spend divided by attributed schedule events; null when schedules are not the
      goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_submitted_application" type="number | null" required>
      Spend divided by attributed submit-application events; null when they are not
      the goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_unique_click" type="number | null" required>
      Spend divided by unique clicks; null when there are no unique clicks.
    </ResponseField>

    <ResponseField name="cost_per_viewed_content" type="number | null" required>
      Spend divided by attributed view-content events; null when they are not the
      goal and none are attributed.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the ad was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="creatives" type="object[]" required>
      The creative assets used by this ad. The original asset has a null format; square, vertical, and horizontal entries are placement-specific variants. A carousel ad returns one format-null entry per attachment, in order.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The creative attachment's file id.
        </ResponseField>

        <ResponseField name="crop" type="object | null" required>
          The saved crop window for this creative, in source image pixels. Null for the original asset or a format that has not been cropped.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="height" type="number" required>
              Height of the crop window in source pixels.
            </ResponseField>

            <ResponseField name="width" type="number" required>
              Width of the crop window in source pixels.
            </ResponseField>

            <ResponseField name="x" type="number" required>
              Left edge of the crop window in source pixels.
            </ResponseField>

            <ResponseField name="y" type="number" required>
              Top edge of the crop window in source pixels.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="format" type="string | null" required>
          The placement variant this asset covers, or null for the original asset.

          Available options: `square`, `vertical`, `horizontal`
        </ResponseField>

        <ResponseField name="media_type" type="string | null" required>
          The kind of asset, image or video.
        </ResponseField>

        <ResponseField name="url" type="string | null" required>
          CDN url of the asset.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="custom_conversions" type="number" required>
      Whop pixel-attributed custom (merchant-defined) conversion events, last-click,
      across all custom event names.
    </ResponseField>

    <ResponseField name="custom_event_counts" type="object" required>
      Whop pixel-attributed custom conversions, keyed by your event name with its
      last-click count as the value. Empty when no named custom events are
      attributed. Custom events fired without a name are counted in
      custom\_conversions but omitted here, so these values sum to at most
      custom\_conversions.
    </ResponseField>

    <ResponseField name="custom_event_values" type="object" required>
      Conversion value attributed to each custom event, keyed by event name like
      custom\_event\_counts. Sums the value passed to whop.track, normalized to USD;
      events fired without a value contribute 0.
    </ResponseField>

    <ResponseField name="delivery_status" type="string" required>
      Whether the ad is delivering right now, and if not, why. When several states apply at once, the highest-precedence one is returned.

      Available options: `rejected`, `in_review`, `draft`, `campaign_paused`, `ad_group_paused`, `paused`, `processing`, `issues`, `scheduled`, `learning_limited`, `learning`, `active`
    </ResponseField>

    <ResponseField name="descriptions" type="string[]" required>
      The description variants shown on the ad.
    </ResponseField>

    <ResponseField name="existing_post_id" type="string | null" required>
      The post you pointed this ad at, when it promotes one you already published —
      a Facebook post, Instagram media, or TikTok video ID. `null` when the ad uses
      uploaded creatives.
    </ResponseField>

    <ResponseField name="frequency" type="number | null" required>
      Platform-reported impressions divided by reach.
    </ResponseField>

    <ResponseField name="headlines" type="string[]" required>
      The headline variants shown on the ad.
    </ResponseField>

    <ResponseField name="impressions" type="number" required>
      The number of impressions.
    </ResponseField>

    <ResponseField name="issues" type="object[]" required>
      Open issues affecting this ad. Empty when there are none.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Unique identifier for the issue.
        </ResponseField>

        <ResponseField name="message" type="string" required>
          A description of what the issue is and how it can be resolved.
        </ResponseField>

        <ResponseField name="resource_id" type="string | null" required>
          The ID of the campaign, ad group, or ad the issue is attached to.
        </ResponseField>

        <ResponseField name="resource_type" type="string" required>
          The type of resource the issue is attached to.

          Available options: `ad_campaign`, `ad_group`, `ad`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="lead_form" type="object | null">
      The instant lead form shown when someone taps this ad. `null` when the ad group's conversion\_location is not an instant-form destination.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="completion" type="object | null" required>
          Screen shown after the form is submitted. `null` when the form uses the default.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="button_text" type="string | null" required>
              Text of the follow-up button.
            </ResponseField>

            <ResponseField name="description" type="string | null" required>
              Body text under the headline.
            </ResponseField>

            <ResponseField name="headline" type="string | null" required>
              Headline of the completion screen.
            </ResponseField>

            <ResponseField name="url" type="string | null" required>
              Website the follow-up button opens. `null` when the screen has no button.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="disclaimer" type="object | null" required>
          Custom consent disclaimer shown before submission. `null` when the form has none.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="body" type="string | null" required>
              Disclaimer text.
            </ResponseField>

            <ResponseField name="checkboxes" type="object[]" required>
              Consent checkboxes the person can tick. Empty when the disclaimer is text-only.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="checked_by_default" type="boolean | null" required>
                  Whether the checkbox starts ticked.
                </ResponseField>

                <ResponseField name="key" type="string | null" required>
                  Stable identifier consent responses are stored under.
                </ResponseField>

                <ResponseField name="required" type="boolean | null" required>
                  Whether the checkbox must be ticked to submit the form.
                </ResponseField>

                <ResponseField name="text" type="string" required>
                  Consent text next to the checkbox.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="title" type="string | null" required>
              Disclaimer title.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="form_type" type="string" required>
          `more_volume` is quickest to submit; `higher_intent` adds a confirmation step before submission.

          Available options: `more_volume`, `higher_intent`
        </ResponseField>

        <ResponseField name="intro" type="object | null" required>
          Intro screen shown before the questions. `null` when the form has none.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="description" type="string | null" required>
              Body text under the headline.
            </ResponseField>

            <ResponseField name="headline" type="string | null" required>
              Headline of the intro screen.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          Internal name of the form.
        </ResponseField>

        <ResponseField name="phone_verification" type="boolean" required>
          Whether the phone number must be verified by SMS before submitting.
        </ResponseField>

        <ResponseField name="privacy_policy" type="object | null" required>
          Your privacy policy, linked from the form. `null` when unset.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="link_text" type="string | null" required>
              Link text shown for the policy. `null` uses the platform default.
            </ResponseField>

            <ResponseField name="url" type="string" required>
              URL of your privacy policy.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="questions" type="object[]" required>
          Questions on the form, in order.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="format" type="string">
              Answer format for `custom` questions: `short_answer`, `multiple_choice`, or
              `appointment`. Absent otherwise.
            </ResponseField>

            <ResponseField name="label" type="string">
              Question text for `custom` questions. Absent for standard prefill questions.
            </ResponseField>

            <ResponseField name="options" type="object[]">
              Choices for `multiple_choice` questions. Absent for other formats.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="key" type="string | null">
                  Stable identifier the choice's answers are stored under. Absent for simple
                  choices.
                </ResponseField>

                <ResponseField name="logic" type="object">
                  Where the form goes when this choice is selected. Absent when the form just continues to the next question.

                  <Accordion title="Properties" defaultOpen={true}>
                    <ResponseField name="action" type="string" required>
                      What happens when the choice is selected.

                      Available options: `go_to_question`, `submit_form`, `close_form`
                    </ResponseField>

                    <ResponseField name="target_end_page_index" type="number">
                      Zero-based index of the ending screen to jump to.
                    </ResponseField>

                    <ResponseField name="target_question_index" type="number">
                      Zero-based index of the question to jump to, for `go_to_question`.
                    </ResponseField>
                  </Accordion>
                </ResponseField>

                <ResponseField name="value" type="string" required>
                  Choice text shown to the person.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="type" type="string" required>
              Question type: a standard prefill type such as `email`, `phone`, or `full_name`, or `custom` for your own question.
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="lead_form_id" type="string | null">
      The ad platform's ID for the instant form the ad uses. Set when the ad
      references an existing form via `lead_form_id`, or once a form built from
      `lead_form` has been created on the platform.
    </ResponseField>

    <ResponseField name="lead_value" type="number" required>
      USD value attributed to lead events. Sums the value sent with each event,
      normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="leads" type="number" required>
      Whop pixel-attributed leads, last-click.
    </ResponseField>

    <ResponseField name="messaging_config" type="object | null">
      Welcome message for click-to-message ads, shown when the conversation opens. `null` when the ad has none.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="keyword" type="string | null" required>
          Suggested reply the person can tap to start the conversation.
        </ResponseField>

        <ResponseField name="message" type="string | null" required>
          Greeting shown when the conversation opens.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="multi_advertiser_ads" type="boolean">
      Whether the ad can appear alongside other advertisers' ads in the same unit.
      Defaults to true.
    </ResponseField>

    <ResponseField name="post_id" type="string | null" required>
      The post the ad network serves for this ad, as `pageID_postID` on Meta — the
      post Meta created for an uploaded creative, or the post being promoted. Use it
      to open the live post, or to promote the same post from another ad. `null`
      until the network has created the post.
    </ResponseField>

    <ResponseField name="post_source" type="string | null" required>
      Identifies the network that owns `existing_post_id`; `null` when the ad uses uploaded creatives.

      Available options: `facebook`, `instagram`
    </ResponseField>

    <ResponseField name="post_thumbnail_url" type="string | null" required>
      Preview image of the post named by `existing_post_id`. `null` for ads that use
      uploaded creatives, or until the post's media has been fetched from the
      network.
    </ResponseField>

    <ResponseField name="primary_texts" type="string[]" required>
      The primary text variants shown in the ad body.
    </ResponseField>

    <ResponseField name="purchase_value" type="number" required>
      USD value of pixel-attributed purchases.
    </ResponseField>

    <ResponseField name="purchases" type="number" required>
      Whop pixel-attributed purchases, last-click.
    </ResponseField>

    <ResponseField name="reach" type="number" required>
      The number of unique people who saw this.
    </ResponseField>

    <ResponseField name="result_event" type="string | null" required>
      The Whop pixel conversion event whose attributed count represents results — the optimization goal, or the highest-volume attributed event for campaigns that budget per ad group. Null when the goal isn't a Whop-attributed event.

      Available options: `purchase`, `lead`, `schedule`, `submit_application`, `contact`, `complete_registration`, `view_content`, `add_to_cart`, `custom`, `messaging_conversation`
    </ResponseField>

    <ResponseField name="result_event_name" type="string | null" required>
      The merchant-defined event name when result\_event is custom; null for the
      standard events.
    </ResponseField>

    <ResponseField name="results" type="number | null" required>
      The Whop pixel-attributed count behind result\_event. When a campaign's ad
      groups optimize different goals there is no single result\_event (it is null),
      and this is instead the sum of each ad group's own attributed results. Null
      when nothing Whop-attributable is being optimized for.
    </ResponseField>

    <ResponseField name="return_on_ad_spend" type="number" required>
      Purchase value divided by spend, both in USD (a currency-neutral ratio); 0
      when there is no spend.
    </ResponseField>

    <ResponseField name="schedule_value" type="number" required>
      USD value attributed to schedule events. Sums the value sent with each event,
      normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="schedules" type="number" required>
      Whop pixel-attributed schedule events, last-click.
    </ResponseField>

    <ResponseField name="social_accounts" type="object[]" required>
      The social accounts the ad runs under — its Facebook page and Instagram profile — each referenced by ID, prefixed `sacc_`.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The referenced entity's id.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="spend" type="number" required>
      The amount charged, in spend\_currency.
    </ResponseField>

    <ResponseField name="spend_currency" type="string | null" required>
      The ISO 4217 currency code of all monetary metrics.
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Whether the ad is enabled. `active` and `paused` are set by you; `in_review` and `rejected` come from ad review.

      Available options: `active`, `paused`, `in_review`, `rejected`
    </ResponseField>

    <ResponseField name="submitted_application_value" type="number" required>
      USD value attributed to submit-application events. Sums the value sent with
      each event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="submitted_applications" type="number" required>
      Whop pixel-attributed submit-application events, last-click.
    </ResponseField>

    <ResponseField name="title" type="string | null" required>
      Display title of the ad.
    </ResponseField>

    <ResponseField name="unique_click_through_rate" type="number | null" required>
      Unique clicks divided by impressions, between 0 and 1.
    </ResponseField>

    <ResponseField name="unique_clicks" type="number" required>
      People who clicked, reported by the Whop pixel, counted once per person.
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the ad was last updated, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="url" type="string | null" required>
      The URL the ad links to, without its query string. Parameters belong in
      `url_parameters`; any you send on `url` are moved there.
    </ResponseField>

    <ResponseField name="url_parameters" type="object" required>
      Every query parameter appended to the URL, keyed by parameter name — including
      any you sent on `url` itself. Whop adds its own click-attribution parameters
      on top; those are reserved and rejected if you set them (utm\_meta\_ad\_id,
      utm\_meta\_adset\_id, utm\_meta\_campaign\_id, utm\_source, utm\_placement,
      utm\_medium, utm\_content, utm\_adset, utm\_whop, wacid, wasid, waid, tw\_source,
      tw\_adid).
    </ResponseField>

    <ResponseField name="viewed_content_value" type="number" required>
      USD value attributed to view-content events. Sums the value sent with each
      event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="viewed_contents" type="number" required>
      Whop pixel-attributed view-content events, last-click.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Ad theme={null}
      {
      	"id": "ad_xxxxxxxxxxxxx",
      	"ad_campaign": {
      		"id": "adcamp_xxxxxxxxxx"
      	},
      	"ad_group": {
      		"id": "adgrp_xxxxxxxxxxx"
      	},
      	"added_to_cart_value": 540,
      	"added_to_carts": 18,
      	"call_to_action": "shop_now",
      	"click_through_rate": 0.034,
      	"clicks": 420,
      	"completed_registration_value": 0,
      	"completed_registrations": 12,
      	"contact_value": 0,
      	"contacts": 8,
      	"cost_per_added_to_cart": 7.22,
      	"cost_per_click": 0.31,
      	"cost_per_completed_registration": 10.83,
      	"cost_per_contact": 16.25,
      	"cost_per_lead": 9.29,
      	"cost_per_mille": 14.5,
      	"cost_per_purchase": 21.67,
      	"cost_per_result": 21.67,
      	"cost_per_schedule": null,
      	"cost_per_submitted_application": null,
      	"cost_per_unique_click": 0.37,
      	"cost_per_viewed_content": 0.54,
      	"created_at": "2026-06-01T12:00:00Z",
      	"creatives": [
      		{
      			"id": "file_xxxxxxxxxxxx",
      			"crop": {
      				"height": 1080,
      				"width": 1080,
      				"x": 120,
      				"y": 0
      			},
      			"format": "square",
      			"media_type": "image",
      			"url": "https://img.whop.com/file_xxxxxxxxxxxx.jpg"
      		}
      	],
      	"custom_conversions": 4,
      	"custom_event_counts": {
      		"QualifiedCall": 3,
      		"BookedDemo": 1
      	},
      	"custom_event_values": {
      		"QualifiedCall": 1500,
      		"BookedDemo": 0
      	},
      	"delivery_status": "issues",
      	"descriptions": ["Limited spots available this week."],
      	"frequency": 1.8,
      	"headlines": ["Join Pickaxe Pro"],
      	"impressions": 9000,
      	"issues": [
      		{
      			"id": "adiss_xxxxxxxxxxx",
      			"message": "The ad's creative violates the ad network's policies. Edit the creative and resubmit for review.",
      			"resource_id": "ad_xxxxxxxxxxxxx",
      			"resource_type": "ad"
      		}
      	],
      	"lead_form": null,
      	"lead_form_id": null,
      	"lead_value": 700,
      	"leads": 14,
      	"messaging_config": null,
      	"multi_advertiser_ads": true,
      	"post_id": "102938475601928_5647382910",
      	"existing_post_id": null,
      	"post_source": null,
      	"post_thumbnail_url": null,
      	"primary_texts": ["Build sharper trading habits with daily lessons."],
      	"purchase_value": 1820,
      	"purchases": 6,
      	"reach": 5000,
      	"result_event": "purchase",
      	"result_event_name": null,
      	"results": 6,
      	"return_on_ad_spend": 14,
      	"schedule_value": 0,
      	"schedules": 0,
      	"social_accounts": [
      		{
      			"id": "sacc_xxxxxxxxxxxx"
      		}
      	],
      	"spend": 130,
      	"spend_currency": "usd",
      	"status": "active",
      	"submitted_application_value": 0,
      	"submitted_applications": 0,
      	"title": "Pickaxe Pro launch ad",
      	"unique_click_through_rate": 0.028,
      	"unique_clicks": 350,
      	"updated_at": "2026-06-02T12:00:00Z",
      	"url": "https://whop.com/pickaxe",
      	"url_parameters": {
      		"utm_campaign": "pickaxe-launch"
      	},
      	"viewed_content_value": 0,
      	"viewed_contents": 240
      }
      ```
    </div>
  </Column>
</Columns>
