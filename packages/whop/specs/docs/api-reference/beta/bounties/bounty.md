> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Bounty

A Bounty is a paid task posted by an account or user. The reward is held in escrow when the bounty publishes, workers submit proof of completed work, and each accepted submission is paid out until every winner slot fills.

Use the Bounties API to create and publish a bounty, list an account's bounties for reporting or dashboards, list the bounties a user can work or has participated in, and retrieve a single bounty by ID.

## Endpoints

| Endpoint                                                                              | Request                                                                                   |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [List Bounties](/api-reference/beta/bounties/list-bounties)                           | <Badge color="blue" size="sm" stroke>GET</Badge> `/bounties`                              |
| [Create Bounty](/api-reference/beta/bounties/create-bounty)                           | <Badge color="green" size="sm" stroke>POST</Badge> `/bounties`                            |
| [Retrieve Bounty](/api-reference/beta/bounties/retrieve-bounty)                       | <Badge color="blue" size="sm" stroke>GET</Badge> `/bounties/{id}`                         |
| [Update Bounty](/api-reference/beta/bounties/update-bounty)                           | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/bounties/{id}`                     |
| [Cancel](/api-reference/beta/bounties/cancel)                                         | <Badge color="green" size="sm" stroke>POST</Badge> `/bounties/{id}/cancel`                |
| [List Public Submissions](/api-reference/beta/bounties/list-public-submissions)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/bounties/{bounty_id}/submissions`      |
| [Retrieve Public Submission](/api-reference/beta/bounties/retrieve-public-submission) | <Badge color="blue" size="sm" stroke>GET</Badge> `/bounties/{bounty_id}/submissions/{id}` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Bounty ID, prefixed `bnty_`.
    </ResponseField>

    <ResponseField name="accepted_deliverable_types" type="string[]" required>
      The deliverable shapes this bounty accepts. Every bounty accepts any combination of `content_url` (posted links) and `media` (uploaded files), except `data_capture` bounties, whose proof is clips recorded in the Whop app that accumulate on the attempt.

      Available options: `content_url`, `media`, `data_capture`
    </ResponseField>

    <ResponseField name="accepted_submissions_count" type="integer" required>
      Submissions accepted so far.
    </ResponseField>

    <ResponseField name="accepted_submissions_limit" type="integer" required>
      Number of submissions that can be accepted (winner slots).
    </ResponseField>

    <ResponseField name="accepted_submissions_per_user_limit" type="integer" required>
      How many winner slots one worker can win. Defaults to `1`. Wins plus proofs
      awaiting review never exceed this number, and a worker runs one attempt at a
      time. Cannot exceed `accepted_submissions_limit`.
    </ResponseField>

    <ResponseField name="active_proof_livestream_feeds" type="object[]" required>
      Proof livestreams live on this bounty right now, newest first — workers streaming their attempts. Empty when nothing is live.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Livestream feed ID.
        </ResponseField>

        <ResponseField name="host" type="object | null" required>
          User hosting the proof livestream — the worker streaming their attempt. `null` if the host account no longer exists.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              User ID, prefixed `user_`.
            </ResponseField>

            <ResponseField name="name" type="string | null" required>
              Display name.
            </ResponseField>

            <ResponseField name="profile_picture" type="object" required>
              Avatar wrapper; its `url` is always present, using a generated placeholder when the user set no picture.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="url" type="string" required>
                  Avatar image URL. Always present — a generated placeholder when the user set no picture.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="username" type="string" required>
              Public username.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Display title for the proof livestream.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="affiliate_share_amount" type="number" required>
      What a referrer earns per accepted submission when the worker arrived through
      their affiliate link, in whole currency units, at the standard platform fee
      rate. Taken out of the worker's post-fee reward rather than added on top. `0`
      when the bounty pays no affiliate share, including bounties tied to no
      account, which cannot record a referral.
    </ResponseField>

    <ResponseField name="allowed_country_codes" type="string[]" required>
      Countries whose residents can work the bounty, as ISO 3166 alpha-2 codes.
      Empty means worldwide.
    </ResponseField>

    <ResponseField name="awaiting_review_submissions_count" type="integer" required>
      Submissions delivered and waiting on review. A subset of
      `unresolved_submissions_count`, which also counts attempts still in progress.
    </ResponseField>

    <ResponseField name="budget_amount" type="number" required>
      Total gross budget committed to the bounty: `gross_reward_amount` times
      `accepted_submissions_limit`.
    </ResponseField>

    <ResponseField name="business_goal_type" type="string | null" required>
      What the poster wants the work to achieve, declared once at create. `null` for bounties created before the taxonomy rolled out.

      Available options: `clipping`, `post_engagement`, `owned_account_growth`, `ugc_content`, `local_activation`, `data_capture`, `other`
    </ResponseField>

    <ResponseField name="cancel_requested_at" type="string | null" required>
      When cancellation was requested, as an ISO 8601 timestamp. On a `closed`
      bounty this means the cancel is pending: submissions are stopped and the
      bounty cancels once in-flight submissions resolve. On a `canceled` bounty it
      records when the cancellation was requested. `null` when no cancellation was
      ever requested.
    </ResponseField>

    <ResponseField name="capture_spec" type="object | null" required>
      The technical contract footage must be recorded against. Present only on `data_capture` bounties; `null` for every other goal type.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="filename_pattern" type="string" required>
          The naming convention for uploaded files, built from the required metadata
          fields.
        </ResponseField>

        <ResponseField name="imu" type="object" required>
          Inertial measurement unit (IMU) recording requirements.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="device_motion_units" type="string" required>
              Units for the device-motion channels, as a compact key=unit string.
            </ResponseField>

            <ResponseField name="magnetometer_units" type="string" required>
              Units for the magnetometer channel.
            </ResponseField>

            <ResponseField name="min_rate_hz" type="number" required>
              Minimum sustained IMU sample rate in hertz for a clip to pass validation.
            </ResponseField>

            <ResponseField name="target_rate_hz" type="integer" required>
              Target IMU sample rate in hertz.
            </ResponseField>

            <ResponseField name="warmup_min_rate_hz" type="number" required>
              Minimum IMU sample rate in hertz tolerated during the warmup window.
            </ResponseField>

            <ResponseField name="warmup_ns" type="integer" required>
              Startup window, in nanoseconds, during which the relaxed warmup rate applies.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="manifest_schema_version" type="integer" required>
          Schema version the client must stamp on the capture manifest it uploads.
        </ResponseField>

        <ResponseField name="min_clip_duration_seconds" type="integer" required>
          Minimum length of a single clip, in seconds.
        </ResponseField>

        <ResponseField name="min_total_verified_duration_seconds" type="integer" required>
          Total verified footage a submission must accumulate across all its clips
          before it can be submitted, in seconds. Always a whole number of hours.
        </ResponseField>

        <ResponseField name="required_metadata_fields" type="string[]" required>
          Metadata fields a submission must provide, matching the `metadata` object on
          the submissions API.
        </ResponseField>

        <ResponseField name="single_continuous_take" type="boolean" required>
          Whether each clip must be one uninterrupted recording rather than stitched
          segments.
        </ResponseField>

        <ResponseField name="video" type="object" required>
          Video recording requirements.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="bitrate_ceiling_mbps" type="integer" required>
              Maximum acceptable average bitrate, in megabits per second.
            </ResponseField>

            <ResponseField name="bitrate_floor_mbps" type="integer" required>
              Minimum acceptable average bitrate, in megabits per second.
            </ResponseField>

            <ResponseField name="bitrate_target_mbps" type="integer" required>
              Recommended average bitrate to encode at, in megabits per second.
            </ResponseField>

            <ResponseField name="camera_lens" type="string" required>
              Which physical lens to record with.
            </ResponseField>

            <ResponseField name="codecs" type="string[]" required>
              Accepted video codecs, in preference order.
            </ResponseField>

            <ResponseField name="embed_camera_metadata" type="boolean" required>
              Whether the client must also write the camera make and model into the video
              container's metadata. When `false`, the capture manifest and export CSV are
              the metadata carrier.
            </ResponseField>

            <ResponseField name="fps" type="integer" required>
              Target capture frame rate.
            </ResponseField>

            <ResponseField name="frame_gap_tolerance_ms" type="integer" required>
              Longest stall between consecutive frames a clip may contain before the client
              rejects it, in milliseconds. Every frame is timestamped in the frame log, so a
              stall stays alignable downstream — this bounds how broken a capture may be,
              not how evenly it must be paced.
            </ResponseField>

            <ResponseField name="height" type="integer" required>
              Required frame height in pixels — recorded footage must match exactly.
            </ResponseField>

            <ResponseField name="min_fov_degrees" type="integer" required>
              Minimum acceptable horizontal field of view, in degrees.
            </ResponseField>

            <ResponseField name="orientation" type="string" required>
              Device orientation to record in.
            </ResponseField>

            <ResponseField name="preferred_fov_degrees" type="integer" required>
              Preferred horizontal field of view, in degrees.
            </ResponseField>

            <ResponseField name="stabilization_mode" type="string" required>
              How the client must configure video stabilization: `off` disables EIS so raw motion is preserved for pose extraction, `on` requires it, `any` leaves the device default.

              Available options: `off`, `on`, `any`
            </ResponseField>

            <ResponseField name="stabilization_required" type="boolean" required>
              Whether hardware/software stabilization must be enabled. True exactly when
              stabilization\_mode is `on`.
            </ResponseField>

            <ResponseField name="width" type="integer" required>
              Required frame width in pixels — recorded footage must match exactly.
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the bounty was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="currency" type="string" required>
      Currency for all amounts on the bounty, as a lowercase ISO 4217 code.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `cny`, `kzt`, `awg`
    </ResponseField>

    <ResponseField name="denied_submissions_count" type="integer" required>
      Submissions reviewed and turned down.
    </ResponseField>

    <ResponseField name="description" type="string" required>
      Full task instructions shown to workers.
    </ResponseField>

    <ResponseField name="discussion_experience_id" type="string | null" required>
      Experience the bounty's discussion thread lives in, prefixed `exp_`. Read this
      — not `experience_id` — to open the thread: a platform-wide bounty has no
      hosting experience of its own but its discussion still lives in one.
    </ResponseField>

    <ResponseField name="discussion_feed_id" type="string | null" required>
      Forum feed containing the bounty's discussion thread. `null` for a bounty with
      no forum post.
    </ResponseField>

    <ResponseField name="discussion_post_id" type="string | null" required>
      Forum post anchoring the bounty's discussion thread. Read together with
      `discussion_experience_id` to address the thread. `null` for a bounty with no
      forum post.
    </ResponseField>

    <ResponseField name="experience_id" type="string | null" required>
      Experience the bounty is hosted in, prefixed `exp_`. `null` for platform-wide
      bounties; may belong to a different account than the funder.
    </ResponseField>

    <ResponseField name="funding_account" type="object | null" required>
      Account whose balance funds the bounty pool, or `null` when a user funds it personally. May differ from the account hosting `experience_id`.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Account ID, prefixed `biz_`.
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Account display name.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="gross_paid_out_amount" type="number" required>
      Gross amount paid out from the bounty pool across accepted submissions —
      worker payouts, platform fees, and affiliate shares together. Tips and
      reviewer rewards are excluded.
    </ResponseField>

    <ResponseField name="gross_reward_amount" type="number" required>
      Gross bounty-pool amount allocated per accepted submission, in whole currency
      units.
    </ResponseField>

    <ResponseField name="hosting_account" type="object | null" required>
      Account hosting the bounty's forum — the one whose `route` and `experience_id` address its discussion thread, and where its submissions dashboard lives. `null` for a platform-wide bounty with no host. May differ from `funding_account`.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Account ID, prefixed `biz_`.
        </ResponseField>

        <ResponseField name="route" type="string" required>
          Account public route identifier — the `whop.com/\{route}` storefront path.
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Account display name.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="net_reward_amount" type="number" required>
      What a worker is quoted per accepted submission after the platform fee, in
      whole currency units. The exact post-fee figure, at the standard platform fee
      rate — a worker who locked a different rate, or who arrived through an
      affiliate link, is paid a different amount.
    </ResponseField>

    <ResponseField name="poster" type="object" required>
      User who posted the bounty — the account owner when created with an account API key.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          User ID, prefixed `user_`.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          Display name.
        </ResponseField>

        <ResponseField name="profile_picture" type="object" required>
          Avatar wrapper; its `url` is always present, using a generated placeholder when the user set no picture.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="url" type="string" required>
              Avatar image URL. Always present — a generated placeholder when the user set no picture.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="username" type="string" required>
          Public username.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="scheduled_frequency" type="string | null" required>
      How often the schedule creates a new bounty. Each occurrence is a separate bounty; the original is not republished.

      Available options: `once`, `hourly`, `daily`, `weekly`, `monthly`
    </ResponseField>

    <ResponseField name="scheduled_publish_at" type="string | null" required>
      When a scheduled bounty will publish, as an ISO 8601 timestamp. `null` once
      published, for bounties that were never scheduled, and for terminally failed
      drafts parked for manual rescheduling.
    </ResponseField>

    <ResponseField name="spots_remaining" type="integer" required>
      Unfilled winner capacity: `accepted_submissions_limit` minus
      `accepted_submissions_count`, clamped to zero. Not on its own a signal that
      the bounty accepts new claims — read `status` for that: only an `open` bounty
      takes new submissions.
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Lifecycle state. `scheduled` bounties are unpublished drafts, visible to their poster and the account's authorized managers; `open` bounties accept new submissions; `closed` bounties are live but no longer accept new submissions; `completed` bounties paid out every winner slot; `canceled` bounties ended before filling their slots.

      Available options: `scheduled`, `open`, `closed`, `completed`, `canceled`
    </ResponseField>

    <ResponseField name="submissions_closed_at" type="string | null" required>
      When new submissions stopped being accepted, as an ISO 8601 timestamp. Set
      when a cancellation is requested on a bounty with work in flight, so in-flight
      submissions can resolve before the bounty cancels. `null` when submissions
      were never stopped — including completed bounties that simply filled every
      winner slot.
    </ResponseField>

    <ResponseField name="title" type="string" required>
      Short name of the task shown to workers.
    </ResponseField>

    <ResponseField name="unresolved_submissions_count" type="integer" required>
      Submissions still awaiting an outcome: in progress or pending review.
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the bounty was last updated, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="viewer_accepted_submissions_count" type="integer" required>
      How many winner slots the authenticated user has already won on this bounty.
      Read against `accepted_submissions_per_user_limit` to show a worker their
      remaining allowance. `0` when the request has no authenticated user.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Bounty theme={null}
      {
      	"id": "bnty_xxxxxxxxxxxxx",
      	"title": "Clip our Tuesday livestream",
      	"description": "Record a 30-60 second clip of the stream's best moment and post it with the campaign hashtag.",
      	"status": "open",
      	"currency": "usd",
      	"gross_reward_amount": 25,
      	"net_reward_amount": 17.5,
      	"affiliate_share_amount": 3.5,
      	"budget_amount": 125,
      	"gross_paid_out_amount": 50,
      	"accepted_submissions_limit": 5,
      	"accepted_submissions_per_user_limit": 2,
      	"accepted_submissions_count": 2,
      	"viewer_accepted_submissions_count": 1,
      	"unresolved_submissions_count": 1,
      	"awaiting_review_submissions_count": 1,
      	"denied_submissions_count": 1,
      	"spots_remaining": 3,
      	"business_goal_type": "clipping",
      	"accepted_deliverable_types": ["content_url", "media"],
      	"capture_spec": null,
      	"allowed_country_codes": ["US", "MX"],
      	"submissions_closed_at": null,
      	"cancel_requested_at": null,
      	"scheduled_publish_at": null,
      	"scheduled_frequency": null,
      	"experience_id": "exp_xxxxxxxxxxxxx",
      	"discussion_post_id": "post_xxxxxxxxxxxxx",
      	"discussion_feed_id": "feed_xxxxxxxxxxxxx",
      	"discussion_experience_id": "exp_xxxxxxxxxxxxx",
      	"active_proof_livestream_feeds": [
      		{
      			"id": "lfeed_xxxxxxxxxxxxx",
      			"title": "Clipping the Tuesday stream live",
      			"host": {
      				"id": "user_xxxxxxxxxxxx",
      				"username": "clip_worker",
      				"name": "Worker Name",
      				"profile_picture": {
      					"url": "https://img.whop.com/worker.png"
      				}
      			}
      		}
      	],
      	"hosting_account": {
      		"id": "biz_xxxxxxxxxxxxx",
      		"title": "Acme Studio",
      		"route": "acme-studio"
      	},
      	"poster": {
      		"id": "user_xxxxxxxxxxxx",
      		"username": "acme_studio",
      		"name": "Creator Name",
      		"profile_picture": {
      			"url": "https://img.whop.com/creator.png"
      		}
      	},
      	"funding_account": {
      		"id": "biz_xxxxxxxxxxxxx",
      		"title": "Acme Studio"
      	},
      	"created_at": "2026-07-01T00:00:00.000Z",
      	"updated_at": "2026-07-08T00:00:00.000Z"
      }
      ```
    </div>
  </Column>
</Columns>
