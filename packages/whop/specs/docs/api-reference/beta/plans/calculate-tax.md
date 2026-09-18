> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Calculate Tax

> Previews tax for a plan before checkout, based on the buyer's location.

Use it in a checkout preview to show the buyer their subtotal, tax, and total. The request only reads data. It doesn't create a checkout, reserve inventory, or charge the buyer.


## OpenAPI

````yaml openapi/api-v1-native.json POST /plans/{id}/calculate_tax
openapi: 3.1.0
info:
  description: >-
    The Whop REST API. Please see
    https://docs.whop.com/developer/api/getting-started for more details.
  termsOfService: https://whop.com/tos-developer-api/
  title: Whop API
  version: 1.0.0
  x-api-version-date: 2026-08-25-2
servers:
  - description: Production Whop API
    url: https://api.whop.com/api/v1
  - description: Sandbox Whop API
    url: https://sandbox-api.whop.com/api/v1
security: []
tags:
  - description: >
      An Account represents a person or business on Whop that can have its own
      profile, wallet, and account-scoped settings. Use accounts for customers,
      creators, merchants, sellers, or connected businesses your integration
      supports.


      Use the Accounts API to create accounts, list accounts visible to your
      credentials, retrieve or update an account, and retrieve the account
      associated with the current API key.
    name: Accounts
    x-whop-summary: 'A business on Whop: profile, wallet, capabilities, settings.'
  - description: >
      A User represents a person on Whop. Users have a public profile and can
      buy products, join accounts, and access experiences.


      Use the Users API to search for users, retrieve or update profiles, and
      check whether a user has access to an account, product, or experience.
    name: Users
    x-whop-summary: 'A person on Whop: profile and connected identities.'
  - description: >
      A Team Member is a member of an account's team: the link between a user
      and an account, carrying the role that controls what they can do. Roles
      are either system roles (like `admin` or `moderator`) or `custom` roles
      managed from the dashboard.


      Use the Team Members API to list an account's team, add a user to the team
      with a system role, change a member's role, and remove members. Adding a
      user who has not yet accepted sends an invitation instead.
    name: Team Members
    x-whop-summary: An account's team members and the roles that scope their access.
  - description: >
      A Member is one buyer's relationship with an account — one record per
      customer regardless of how many memberships they hold. It carries
      relationship-level state: whether they have joined or left, their access
      level (`customer`, `admin`, or `no_access`), when they joined, and when
      they last opened the account's content.


      Use the Members API to list an account's members with filtering by access
      level, status, join date, and name or username search, and to retrieve a
      single member. Member rows are created and maintained by the membership
      lifecycle; to grant or revoke access, work with memberships instead.
    name: Members
    x-whop-summary: One buyer's relationship with an account, across all their purchases.
  - name: Webhooks
    x-whop-summary: Event notifications pushed to your server as things happen.
  - description: >
      Stats represent aggregated activity for an account over time. They help
      you understand revenue, transactions, disputes, members, referrals, and
      advertising performance across reporting periods like days, weeks, or
      months.


      Use the Stats API to list available metrics and their filterable
      properties, then retrieve time-series values for a date range.
    name: Stats
    x-whop-summary: Aggregated financial, audience, and traffic reporting.
  - description: >
      A Verification represents a legal identity for a person or business.
      Accounts and users complete verification when Whop needs to confirm who
      they are before enabling payouts or compliance-sensitive workflows.


      Use the Verifications API to start or resume a hosted verification
      session, check review status, and submit requested details or documents.
      If `requested_information` contains items, submit answers with [Update
      Verification](/api-reference/beta/verifications/update-verification).
    name: Verifications
    x-whop-summary: Legal identity required before payouts and card issuing.
  - description: >
      An Export is an asynchronous CSV of one resource for one account —
      members, payments, disputes, ads, and the other tables the Whop dashboard
      can export. Generating a full table takes longer than a request, so an
      export is created in `pending`, moves through `processing`, and lands on
      `completed` with a download link. Each resource requires that resource's
      own export scope.


      Use the Exports API to start an export, poll it until `download_url` is
      set, and list the exports already requested for an account. Finished CSVs
      are retained for 30 days, after which the file is deleted and the export
      moves to `expired`.
    name: Exports
    x-whop-summary: Asynchronous CSV dumps of an account's dashboard data.
  - description: >
      A Notification is a message delivered to a user — a new post, a payment, a
      mention. Every notification comes from an experience the user belongs to
      or a team they are on, and users control what they receive with
      notification preferences.


      Every notification belongs to a topic: the category it falls under, such
      as new sales or account activity. Topics carry a default, so a user only
      needs a preference row where they diverge from it. `GET
      /notifications/topics` lists the platform's visible topics, and a topic's
      `id` is what the notification preference endpoints take as `topic_id` —
      the catalog is the only place those ids come from, so read it rather than
      hardcoding. Each topic also carries an `identifier` such as
      `new-follower`, which is stable across environments and is the value to
      match on in code.


      Use the Notifications API to list the authenticated user's feed, read
      per-experience unread badges, mark an experience (or everything) as read,
      send notifications from your app to an experience's users or an account's
      team, and list the topic catalog.
    name: Notifications
    x-whop-summary: >-
      The user's notification feed: unread badges, mark-read, app sends, and the
      topic catalog.
  - description: >
      A Payment is one charge against a buyer. Create it with a payment method
      already on file, or with a `confirmation_token` describing a method the
      buyer has just supplied.


      Collection runs in the background, so the create response is not the
      outcome. Poll [Retrieve
      status](/api-reference/beta/payments/retrieve-status) for how far the
      payment has got and, while it is `requires_action`, what the buyer must do
      next — follow a redirect, complete 3D Secure, display transfer
      instructions, or link a bank account. Use the return_url operation to
      change where they land afterwards, up until they come back.
    name: Payments
    x-whop-summary: A charge against a buyer, and the step they still owe.
  - description: >
      A Setup Intent saves a buyer's payment method for later without taking
      money now. It runs the same collection flow a payment does, so the buyer
      may still owe a step — 3D Secure on a card, a hosted enrollment, or
      linking a bank account.


      Poll [Retrieve status](/api-reference/beta/setup-intents/retrieve-status)
      for how far the setup has got and what is outstanding. Once it reaches
      `succeeded` the method is on file and can be charged.
    name: Setup Intents
    x-whop-summary: Saving a buyer's payment method without charging it.
  - description: >
      A Ledger Activity row is a single financial event on an account's ledger —
      a payment, payout, refund, transfer, on-chain deposit, swap, or card
      transaction. Each row is derived from the underlying ledger lines and
      carries a typed `resource` and `source` so you can present and link the
      event without extra lookups.


      Use Ledger Activity to build a statement or transaction feed for an
      account or user. Reconcile against your own records with `amount` (signed,
      in the currency's smallest precision units) and `posted_at`, and use
      `available_at` to know when inflows became withdrawable.
    name: Ledgers
    x-whop-summary: The activity feed behind an account or user's balance.
  - description: >
      Payouts represent money sent from an account or user balance to an
      external destination, such as a bank account, wallet, or other saved
      payout method.


      Use the Payouts API to create and track payouts, manage saved payout
      methods, and show expected arrival details for funds leaving Whop.
    name: Payouts
    x-whop-summary: Send money from a balance to a bank or wallet.
  - description: >
      Cards represent Whop-issued virtual payment cards that spend from an
      account or user balance. Cards can be assigned to cardholders and
      configured with spending limits for controlled spending.


      Use the Cards API to issue cards, list cards for an account or user, and
      retrieve active card details such as the card number and CVC.
    name: Cards
    x-whop-summary: Issue cards that spend from a balance.
  - description: >
      Transfers move value between identities on Whop. They are used for
      account-to-account money movement, user payouts inside Whop, crypto
      transfers, and claim links depending on the destination type.


      Use the Transfers API to create a transfer, list previous transfers, and
      retrieve a transfer by ID when reconciling money movement between accounts
      or users.
    name: Transfers
    x-whop-summary: Move funds between Whop accounts and users.
  - description: >
      A Dispute is a chargeback a customer files against a payment through their
      bank, or an inquiry that may become one. It carries the disputed payment,
      a deadline to respond, your evidence, and the outcome once the processor
      rules.


      Use the Disputes API to list disputes, edit the evidence packet while a
      dispute is still contestable, and submit it for review.
    name: Disputes
    x-whop-summary: Chargebacks filed against an account, with evidence and outcomes.
  - description: >
      A Dispute alert is an early warning from a card issuer that a settled
      payment is being questioned, ahead of any chargeback. `type` separates
      fraud reports (`early_fraud_warning`), pre-dispute notices
      (`dispute_alert`), and Visa RDR cases the network already closed by
      refunding (`rapid_dispute_resolution`).


      Use the Dispute alerts API to list alerts for an account, filter them by
      type or payment, and read `actionable` to see whether refunding can still
      avoid the chargeback.
    name: Dispute alerts
    x-whop-summary: Issuer warnings that arrive before a chargeback does.
  - description: >
      Deposits describe ways to add funds to an account balance, including
      hosted deposit pages, bank deposit instructions, and supported crypto
      wallet addresses.


      Use the Deposits API to create deposit instructions for an account.
    name: Deposits
    x-whop-summary: Add funds to a balance.
  - description: >
      Swaps convert value between supported tokens, chains, or wallet
      destinations for an account. A swap quote describes the expected output,
      fees, and approval requirements before you create the swap.


      Use the Swaps API to quote a conversion, create the swap, list recent
      swaps, and retrieve status until the transaction completes.
    name: Swaps
    x-whop-summary: Convert a balance between currencies.
  - description: >
      A Resolution Center Case is opened by a buyer when something is wrong with
      a purchase — an unwanted renewal, an item that never arrived, or a charge
      they don't recognize. It is the step before a chargeback: the two sides
      work it out directly, and Whop decides the case if they can't. Each case
      carries a reason, a status naming which side it is waiting on, a timeline
      of events, and the actions available to whoever is reading it.


      Use the Resolution Center Cases API from either side: as the buyer, open a
      case, reply, appeal a decision, or withdraw it; as the merchant, accept it
      (refunding the payment), deny it, or ask the buyer for more information.
      Both sides read the same case, page its timeline, and summarize the cases
      they can see.
    name: Resolution Center Cases
    x-whop-summary: File or respond to a case against a payment, as the buyer or the merchant.
  - description: >
      A Product is a digital good or service sold on Whop. Products may contain
      plans for pricing and/or experiences for content delivery.


      Use the Products API to search the public marketplace, list an account's
      products, retrieve a product, and create, update, or delete products.
    name: Products
    x-whop-summary: The things you sell. Each owns plans and a store page.
  - description: >
      A Plan defines how customers buy a product. It controls pricing, billing
      cadence, availability, tax behavior, checkout fields, and purchase
      visibility.


      Use the Plans API to create plans for products, list existing plans,
      retrieve or update plan configuration, calculate tax for checkout, and
      delete plans that should no longer be offered.
    name: Plans
    x-whop-summary: 'Pricing for a product: one-time, recurring, trials, stock.'
  - name: Promo Codes
    x-whop-summary: Discounts that creators configure for checkout.
  - description: >
      A Membership is a customer's purchase of a plan: the subscription or
      one-time grant that gives them access to a product. It tracks billing
      state (`active`, `trialing`, `past_due`, and so on), the current period,
      pending cancellations, custom metadata, and the software license key when
      the product includes licensing.


      Use the Memberships API to list an account's memberships or the caller's
      own, retrieve one by ID or license key, invite a recipient to join through
      a free plan, and manage the lifecycle: cancel immediately or at period
      end, reverse a scheduled period-end cancellation, pause and resume payment
      collection, extend with free days, generate a transfer link, and update
      metadata.
    name: Memberships
    x-whop-summary: A customer's purchase of a plan, from checkout through cancellation.
  - description: >
      A Checkout Configuration is a reusable checkout link owned by an account.
      In `payment` mode it sells a specific plan; in `setup` mode it collects
      and saves payment details without charging. Each configuration can also
      override which payment methods are accepted and how 3D Secure is enforced
      for that checkout.


      Use the Checkout Configurations API to create checkout links for an
      existing or inline plan, list configurations for an account, retrieve the
      configuration behind a checkout URL, and delete links that should no
      longer be used.
    name: Checkout Configurations
    x-whop-summary: Turn a plan into a shareable, prefilled checkout link.
  - description: >
      A Payment Method Domain registers a hostname with a wallet provider so its
      payment methods can appear at a checkout served from that domain. The
      domain proves ownership by hosting the provider's association file — for
      Apple Pay, at `/.well-known/apple-developer-merchantid-domain-association`
      — and `status` reports whether verification has completed.


      Use the Payment Method Domains API to register domains for your account or
      its connected accounts, retry verification once the association file is
      hosted, and remove domains that should no longer serve wallet payments. A
      domain a platform shares with its connected accounts at checkout is listed
      on the platform's account, not on each connected account.
    name: Payment Method Domains
    x-whop-summary: >-
      Domains verified to show wallet payment methods like Apple Pay at
      checkout.
  - description: >
      A Shipment attaches a carrier tracking number to a payment and follows the
      package from label creation to delivery, exposing the current delivery
      status and a customer-facing tracking URL.


      Use the Shipments API to list an account's shipments, retrieve one by its
      id or the payment it fulfills, attach a tracking number to a payment, and
      update the tracking number on an existing shipment.
    name: Shipments
    x-whop-summary: Track the delivery of an order by its carrier tracking number.
  - description: >
      The Partners API covers your Whop partner activity: the users you referred
      onto Whop, the businesses you referred and the earnings generated from
      their processing volume, and the partner leaderboard.


      Use it to enroll as a Whop partner, list the users you referred, list your
      referred businesses and review their earnings, and see the partner
      leaderboard.
    name: Partners
    x-whop-summary: >-
      The users and businesses you referred to Whop, and what you earn from
      them.
  - description: >
      A Bounty is a paid task posted by an account or user. The reward is held
      in escrow when the bounty publishes, workers submit proof of completed
      work, and each accepted submission is paid out until every winner slot
      fills.


      Use the Bounties API to create and publish a bounty, list an account's
      bounties for reporting or dashboards, list the bounties a user can work or
      has participated in, and retrieve a single bounty by ID.
    name: Bounties
    x-whop-summary: Paid tasks with reviewed submissions and escrowed rewards.
  - description: >
      A Bounty Submission is one worker's attempt on a bounty. It starts as an
      in-progress attempt, enters the review queue when proof is submitted, and
      ends approved (paid from the bounty's escrowed pool) or denied.


      Use the Bounty Submissions API to submit proof of completed work to a
      bounty, list the submissions you authored, and review the submissions on
      your bounties — across every bounty or narrowed to one.
    name: Bounty Submissions
    x-whop-summary: Work submitted to a bounty, from attempt to payout.
  - description: >
      A Person is an identity-linked profile of a visitor or customer of an
      account, assembled from every [event](/api-reference/beta/events/event)
      the person generated — pixel page views, ad clicks, leads, identifies, and
      payments. Each profile carries the person's known identities (names,
      emails, phones, user IDs), purchase history and LTV, geo/device profile,
      traffic sources, and the first and last marketing touches that reached
      them.


      Use the People API to list and segment the people of an account — filter
      by activity, purchases, traffic source, location, or marketing touch, and
      sort by value — or retrieve one person by person ID, user ID, email
      address, or phone number.
    name: People
    x-whop-summary: >-
      Visitors and customers of an account, with identity, purchase, and traffic
      profiles.
  - description: >
      An Event records conversion or engagement activity for an account, such as
      page views, purchases, or leads. Each event ties the action to the
      [person](/api-reference/beta/people/person) who took it, so activity can
      be attributed to the ads and links that drove it.


      Use the Events API to send new tracking events, list recent
      identity-linked events for an account, and inspect the events recorded for
      a person. The resource also exposes an anonymized read mode — the pulse
      feed — a platform-wide snapshot of recent purchases that carries nothing
      identifying. The pulse feed is public; other Events endpoints require
      authentication and are scoped to an account.


      Events are only as good as the pixel sending them, so [Validate
      Pixel](/api-reference/beta/events/validate-pixel) answers whether an
      account's pixel is working: it reads the events the pixel has sent, and
      when you pass a `url` whose page hasn't sent any lately, it fetches that
      page and looks for the pixel in its source. Use it before launching an ad
      to confirm its destination is tracked, or in a setup flow to tell a
      merchant whether their install is live.
    name: Events
    x-whop-summary: Conversion and engagement events tracked for attribution.
  - description: >
      A Recommended Action Chain is a short, ordered sequence of dashboard
      actions — create a product, price it, publish it — suggested for an
      account based on what it already has. Seeded chains come from hand-written
      presets; generated chains, produced per account, share the same shape.


      Use the Recommended Actions API to list the chains recommended for an
      account and to record that a chain was run. Running a chain executes
      nothing server-side — the client follows each step's CTA itself; the run
      endpoint records the `recommended_action_chain.executed` analytics event.
    name: Recommended Actions
    x-whop-summary: Suggested next-step action chains for an account.
  - description: >
      An Ad is the individual creative unit delivered by an [ad
      group](/api-reference/beta/ad-groups/ad-group). It holds the copy,
      creative assets, and destination URL for one ad.


      Use the Ads API to list ads for an account, create ads inside ad groups,
      retrieve or update creative details, delete ads that should stop running,
      and pause or resume delivery.
    name: Ads
    x-whop-summary: 'The creative: copy, assets, and destination URL.'
  - description: >
      An Ad Campaign is the top-level container for paid ads on an ad network.
      It sets the platform, objective, and budget strategy shared by its [ad
      groups](/api-reference/beta/ad-groups/ad-group) and ads.


      Use the Ad Campaigns API to create campaigns, list campaigns for an
      account, retrieve or update campaign settings, and pause or resume
      campaign delivery.
    name: Ad Campaigns
    x-whop-summary: Platform, objective, and budget for a set of ads.
  - description: >
      An Ad Group sits inside an [ad
      campaign](/api-reference/beta/ad-campaigns/ad-campaign) and controls
      delivery for [ads](/api-reference/beta/ads/ad). It sets the audience,
      placements, schedule, budget, and optimization goal for its ads.


      Use the Ad Groups API to create ad groups in campaigns, list or retrieve
      targeting and delivery settings, update budgets or targeting, delete
      groups that should stop running, and pause or resume delivery. It can also
      search the ad platform's targeting taxonomy for options to target and
      estimate how many people a draft targeting spec can reach.
    name: Ad Groups
    x-whop-summary: Audience, placements, and schedule within a campaign.
  - description: >
      An Audience represents a customer list uploaded to Whop for ad targeting.
      Audiences belong to an account and sync to supported ad platforms as
      custom audiences.


      Use the Audiences API to create audiences from CSV uploads, monitor
      processing status, and list or delete audiences for an account. Created
      audiences are usable for targeting after processing reaches `ready` or
      `partial`.
    name: Audiences
    x-whop-summary: Reusable targeting lists for ad groups.
  - description: >
      A File is an uploaded document or media object, identified by a `file_`
      ID. Creating a file returns a presigned destination; upload the bytes
      there and the file becomes `ready`.


      Use the Files API to create a file, upload its content directly to storage
      (in one PUT, or in parts for large files), and retrieve it while polling
      for readiness. A ready file's ID can be attached wherever Whop accepts
      files.
    name: Files
    x-whop-summary: Upload files and attach them wherever Whop accepts documents.
  - description: >
      A Media Asset is an AI-generated image or video created from a prompt and
      billed from an account balance. When generation finishes, the asset
      includes a file that can be attached anywhere Whop accepts files.


      Use the Media API to start a generation job and retrieve the asset while
      it processes or after it is ready.
    name: Media
    x-whop-summary: >-
      AI-generated assets, billed from a balance, attachable wherever files are
      accepted.
  - description: >
      A Social Account represents an external profile connected to a Whop
      account or user, such as a Facebook page or Instagram account. Connecting
      a social account lets Whop run [ads](/api-reference/beta/ads/ad) under
      that profile's identity and promote its existing posts.


      Use the Social Accounts API to list connected accounts, create a
      Whop-managed Facebook page, start an OAuth connection, disconnect a social
      account, and list a connected profile's posts or a Facebook page's lead
      forms.
    name: Social Accounts
    x-whop-summary: Connected Facebook and Instagram accounts that run ads.
  - description: >
      An App is software you build on Whop. It can be a hosted web app served at
      `<route>.whop.app` or an API integration installed as an experience, and
      it belongs to the account that owns its credentials, settings, builds, and
      runtime logs.


      Use the Apps API to manage app configuration, deploy an app's working copy
      and follow the run on the app's `deployment` field, and, for hosted apps,
      read server runtime logs for console output, uncaught exceptions, and
      failed requests. Logs are retained for 7 days and can be filtered by
      build, level, time window, and message text.


      Apps are also reusable blueprints. List official blueprints with
      `app_type=website&verified=true&order=template_usage`, or community
      blueprints with
      `app_type=website&verified=false&recommended=true&order=template_usage`.
      Pass the returned App `id` as `blueprint_id` when creating an Account.
    name: Apps
    x-whop-summary: 'Apps you build on Whop: metadata, hosted builds, runtime logs.'
  - description: >
      An App Build is a versioned artifact uploaded for an app — a hosted web
      archive, or an iOS/Android bundle. Builds start as drafts, go through
      review, and one approved build per platform is served to users as the
      production build.


      Use the App Builds API to upload a build for an app, list an app's builds
      with platform and status filters, retrieve a build, and promote a draft or
      approved build to production.
    name: App Builds
    x-whop-summary: Versioned build artifacts deployed to an app's platforms.
  - description: >
      An API Key is a programmatic credential owned by an account or app. Each
      key carries its own permissions policy — explicit permission statements or
      an inherited system role — and can be restricted with an expiration date
      and an IP allowlist.


      Use the API Keys API to list an account or app's keys, create a key (the
      full secret is returned once, on creation), inspect a key's effective
      grants, update its name or restrictions, rotate its secret, and revoke it.
      These endpoints require a user session — they cannot be called with an API
      key.
    name: API Keys
    x-whop-summary: Programmatic credentials for an account or app.
  - description: >
      A Permission is one action, such as `stats:read`, paired with whether your
      credential is granted it on a given resource. It answers for whatever you
      authenticated with, so you can decide what to show or attempt instead of
      discovering a `403`.


      Use the Permissions API to check an account, product, experience, or app,
      narrowing to the actions you care about. It reports only your own access —
      to manage who else can reach an account, use the Team Members API.
    name: Permissions
    x-whop-summary: What your credential is allowed to do on a resource.
paths:
  /plans/{id}/calculate_tax:
    parameters:
      - description: Plan ID, prefixed `plan_`.
        in: path
        name: id
        required: true
        schema:
          type: string
    post:
      tags:
        - Plans
      summary: Calculate Tax
      description: Previews tax for a plan before checkout, based on the buyer's location.
      operationId: calculatePlanTax
      parameters:
        - $ref: '#/components/parameters/IdempotencyKey'
      requestBody:
        content:
          application/json:
            schema:
              example:
                address:
                  country: DE
                  postal_code: '10115'
              properties:
                address:
                  description: >-
                    Buyer billing address used for tax calculation. Provide
                    either `address.country` or `ip_address`; include state and
                    postal code when available for more accurate results.
                  properties:
                    city:
                      description: City name.
                      example: Austin
                      type:
                        - string
                        - 'null'
                    country:
                      description: >-
                        ISO 3166-1 alpha-2 country code, such as `US`, `DE`, or
                        `GB`.
                      example: US
                      type: string
                    line1:
                      description: First line of the street address.
                      example: 4180 Burnet Rd
                      type:
                        - string
                        - 'null'
                    line2:
                      description: Second line of the street address.
                      example: Suite 2
                      type:
                        - string
                        - 'null'
                    postal_code:
                      description: Postal or ZIP code.
                      example: '78756'
                      type:
                        - string
                        - 'null'
                    state:
                      description: State, province, or region code, such as `CA`.
                      example: TX
                      type:
                        - string
                        - 'null'
                  required:
                    - country
                  type:
                    - object
                    - 'null'
                ip_address:
                  description: >-
                    Buyer IP address used to infer location when no billing
                    address is provided.
                  example: 1.2.3.4
                  type: string
                tax_ids:
                  description: >-
                    Optional buyer tax ID for B2B exemptions. At most one entry
                    is supported.
                  items:
                    properties:
                      type:
                        description: Tax ID type, such as `eu_vat` for an EU VAT number.
                        enum:
                          - ad_nrt
                          - ao_tin
                          - ar_cuit
                          - al_tin
                          - am_tin
                          - aw_tin
                          - au_abn
                          - au_arn
                          - eu_vat
                          - az_tin
                          - bs_tin
                          - bh_vat
                          - bd_bin
                          - bb_tin
                          - by_tin
                          - bj_ifu
                          - bo_tin
                          - ba_tin
                          - br_cnpj
                          - br_cpf
                          - bg_uic
                          - bf_ifu
                          - kh_tin
                          - cm_niu
                          - ca_bn
                          - ca_gst_hst
                          - ca_pst_bc
                          - ca_pst_mb
                          - ca_pst_sk
                          - ca_qst
                          - cv_nif
                          - cl_tin
                          - cn_tin
                          - co_nit
                          - cd_nif
                          - cr_tin
                          - hr_oib
                          - do_rcn
                          - ec_ruc
                          - eg_tin
                          - sv_nit
                          - et_tin
                          - eu_oss_vat
                          - ge_vat
                          - gh_tin
                          - de_stn
                          - gb_vat
                          - gn_nif
                          - hk_br
                          - hu_tin
                          - is_vat
                          - in_gst
                          - id_npwp
                          - il_vat
                          - jp_cn
                          - jp_rn
                          - jp_trn
                          - kz_bin
                          - ke_pin
                          - kg_tin
                          - la_tin
                          - li_uid
                          - li_vat
                          - my_frp
                          - my_itn
                          - my_sst
                          - mr_nif
                          - mx_rfc
                          - md_vat
                          - me_pib
                          - ma_vat
                          - np_pan
                          - nz_gst
                          - ng_tin
                          - mk_vat
                          - no_vat
                          - no_voec
                          - om_vat
                          - pe_ruc
                          - ph_tin
                          - ro_tin
                          - ru_inn
                          - ru_kpp
                          - sa_vat
                          - sn_ninea
                          - rs_pib
                          - sg_gst
                          - sg_uen
                          - si_tin
                          - za_vat
                          - kr_brn
                          - es_cif
                          - ch_uid
                          - ch_vat
                          - tw_vat
                          - tj_tin
                          - tz_vat
                          - th_vat
                          - tr_tin
                          - ug_tin
                          - ua_vat
                          - ae_trn
                          - us_ein
                          - uy_ruc
                          - uz_tin
                          - uz_vat
                          - ve_rif
                          - vn_tin
                          - zm_tin
                          - zw_tin
                          - sr_fin
                        example: us_ein
                        type: string
                      value:
                        description: Tax ID value, for example `DE123456789`.
                        example: 12-3456789
                        type: string
                    type: object
                  maxItems: 1
                  type:
                    - array
                    - 'null'
              type: object
        required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                example:
                  currency: usd
                  status: calculated
                  subtotal: 1000
                  tax_amount: 70
                  tax_behavior: exclusive
                  total: 1070
                properties:
                  currency:
                    description: >-
                      Three-letter ISO 4217 currency code for the returned
                      amounts.
                    example: usd
                    type: string
                  status:
                    description: >-
                      Whether Whop calculated tax for this preview.
                      `not_calculated` means no tax could be determined, so
                      `tax_amount` is 0 and `total` equals `subtotal`.
                    enum:
                      - calculated
                      - not_calculated
                    example: calculated
                    type: string
                  subtotal:
                    description: >-
                      Plan price in the currency's smallest unit, for example
                      cents. For exclusive tax, this is the pre-tax amount; for
                      inclusive tax, it already includes tax and equals the
                      total.
                    example: 1000
                    type: integer
                  tax_amount:
                    description: >-
                      Calculated tax amount in the currency's smallest unit. For
                      exclusive tax, this is added on top of the subtotal; for
                      inclusive tax, it is the portion of the subtotal that is
                      tax.
                    example: 70
                    type: integer
                  tax_behavior:
                    description: >-
                      Whether tax is added on top of the plan price or already
                      included in it for this buyer's location.
                    enum:
                      - exclusive
                      - inclusive
                    example: exclusive
                    type: string
                  total:
                    description: >-
                      Amount the buyer would pay in the currency's smallest
                      unit.
                    example: 1070
                    type: integer
                required:
                  - currency
                  - tax_behavior
                  - subtotal
                  - tax_amount
                  - total
                  - status
                type: object
          description: tax calculated
        '400':
          $ref: '#/components/responses/InvalidParameters'
          description: request is invalid
        '401':
          $ref: '#/components/responses/Unauthorized'
          description: missing or invalid authentication
        '403':
          $ref: '#/components/responses/Forbidden'
          description: credential lacks the plan read scope
        '404':
          $ref: '#/components/responses/NotFound'
          description: plan not found
        '409':
          $ref: '#/components/responses/Conflict'
      security:
        - bearerAuth:
            - plan:basic:read
      x-codeSamples:
        - lang: JavaScript
          source: |-
            import Whop from '@whop/sdk';

            const client = new Whop({
              apiKey: process.env['WHOP_API_KEY'], // This is the default and can be omitted
            });

            const response = await client.plans.calculateTax('id');

            console.log(response.currency);
components:
  parameters:
    IdempotencyKey:
      description: >-
        A unique key that makes this request safe to retry. See [Idempotent
        requests](https://docs.whop.com/developer/api/idempotency).
      in: header
      name: Idempotency-Key
      required: false
      schema:
        example: d9105228-4a08-46b1-8b91-42fed586d383
        maxLength: 255
        type: string
  responses:
    InvalidParameters:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/V1ErrorResponse'
      description: Invalid Parameters
    Unauthorized:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/V1ErrorResponse'
      description: Unauthorized
    Forbidden:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/V1ErrorResponse'
      description: Forbidden
    NotFound:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/V1ErrorResponse'
      description: Resource not found
    Conflict:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/V1ErrorResponse'
      description: Conflict
  schemas:
    V1ErrorResponse:
      properties:
        error:
          properties:
            code:
              description: >-
                Machine-readable reason for this specific refusal, such as
                `bank_warning_not_acknowledged`. Only present when the error
                carries one.
              type: string
            message:
              description: Human-readable error message.
              example: account_id is required
              type: string
            type:
              description: Machine-readable error code.
              example: bad_request
              type: string
          required:
            - type
            - message
          type: object
      required:
        - error
      type: object
  securitySchemes:
    bearerAuth:
      bearerFormat: auth-scheme
      description: >-
        An Account API key, account-scoped JWT, App API key, or user OAuth
        token. Prepend the key or token with `Bearer`, for example `Bearer
        ***************************`.
      scheme: bearer
      type: http

````