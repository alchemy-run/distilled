> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ads

> An advertising account. Scope it to a Whop account with `accountId` — the ad account underneath is assigned server-side and never surfaces here — then mount `reporting` for what the account spent and what came back, or `campaign-creator` to build a campaign.

## Playground

Assemble the elements with example data. Drive the controls, add and arrange elements, and watch events fire live:

<div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
  <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

  <div data-whop-demo-native="playground:ads" data-whop-elements-version="" style={{ position: "relative" }} />
</div>

<div data-whop-usage="ads/playground">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Ads } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Ads /* options */>
            {/* mount elements here */}
          </Ads>
        </WhopElements>
      );
    }
    ```

    ```html JavaScript theme={null}
    <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
    <script type="module">
      const ads = window.WhopElements().ads.create({ /* options */ });
    </script>
    ```
  </CodeGroup>
</div>

## Options

Pass these to `whop.ads.create({ … })`, or as props on `<Ads>` in React.

<ResponseField name="accountId" type="string">
  Whop account ID, prefixed `biz_`, whose advertising this reads. Required; this is not an ad account ID. Defaults to `""`.
</ResponseField>

<ResponseField name="accessToken" type="string">
  A scoped token every surface under this handle reads and writes with. **Mint one token for the whole handle, not one per element.** Work out the scopes of every element you are going to mount, request them on a single token, and set it here — the handle projects that one credential into each element's frame, so a second token per surface buys nothing and leaves you several expiration dates to track instead of one. Mint it on your server with `POST /api/v1/access_tokens` and set a fresh one with `update({ accessToken })` before it expires. Mounting everything needs `ad_campaign:read`/`:create`, `ad_group:read`, `ad:read`, `stats:read`, the `:update`/`:delete` scopes the table's row actions use, `company:basic:read` for the pixel checks `campaign-creator` runs, and `payment:charge` plus `user:email:read` to add an ad-spend card; the billing slots list stored cards and spendable wallets with `member:payment_methods:read`. Mounting fewer surfaces can ask for fewer scopes — still on the one token. Omitted, the calls carry the viewer's own session, which only answers same-origin.
</ResponseField>

<ResponseField name="links" type="CrossLinksConfig">
  Where the reporting `table`’s click and result counts link on your site — typically the pages where you mounted the `tracking` namespace’s `people` and `events` elements. `people` and `events` are absolute base URLs (`https://…`); the table appends the same query params those elements take as props (`?source=whop:adcamp_…:*&event=…&from=…&to=…`), so the target page can hydrate its element straight from its URL. A relative URL would resolve against the element frame, so one is treated as unset; unset links render the counts as plain figures. Defaults to `{}`.
</ResponseField>

<ResponseField name="appearance" type="Appearance">
  Visual customization for this group's elements. Overrides the global `WhopElements({ appearance })`. Change it live with `update({ appearance })`.
</ResponseField>

<ResponseField name="locale" type="WhopElementsLocale">
  Locale for this group's element UI text. Set it to one of the app's built locales to override the global configuration. Any other value falls back to the default locale.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onBillingChanged`

The account's ad-spend payment methods changed and the change is saved. Slot values are the method IDs themselves — `payt_…` for a card, `ldgr_…` for a balance; an empty `backup` means none is set.

**Signature:** `((payload: { primary: string; backup: string; }) => void)`

### `onLoadingChange`

Runs when the grouped loading state changes. The value is `true` while any mounted element is still loading.

**Signature:** `((loading: boolean) => void)`

## Methods

Call these on the Ads handle from `whop.ads.create({ … })` or `useAds()`.

### `update`

Merges new handle options into every mounted element. In React, change the namespace props instead.

**Signature:** `(options: Partial<AdsOptions>) => void`

### `destroy`

Destroys every element and sub-controller this handle created, removes the controller frame, and releases its subscriptions. You can call it more than once, but a destroyed handle refuses any other call — create a new handle to start over. React removes the group automatically when the provider unmounts.

**Signature:** `() => void`

## Types

Named types used throughout this page.

## `CrossLinksConfig`

The consumer-facing shape of an element's `links` prop. `people`/`events` are base URLs the canonical query params are appended to; `person` is a template whose `{personId}` and `{identifier}` placeholders are replaced with the row's URL-encoded values.

### `people`

**Signature:** `string | undefined`

### `events`

**Signature:** `string | undefined`

### `person`

**Signature:** `string | undefined`

## `AdsEditTarget`

What a builder href asks to edit, once it has been read back out of the route.

### `campaignId`

**Signature:** `string`

### `adGroupId`

**Signature:** `string | undefined`

### `adId`

**Signature:** `string | undefined`

## `CustomMetricDefinition`

A computed column as anyone outside this module needs it. `id` is deliberately absent — it is a within-render column key (`customMetricColumnVisibility`), never persisted and never meaningful to a caller, so it is minted on the way in rather than carried around.

### `name`

**Signature:** `string`

### `formula`

**Signature:** `string`

### `format`

**Signature:** `"number" | "currency" | "percent"`

### `enabled`

**Signature:** `boolean`

## Elements

The elements this group mounts. Each has its own page:

<CardGroup cols={2}>
  <Card title="Reporting" href="/elements/upcoming/ads/reporting">
    An advertising account's reporting: what it spent and what came back, over a window, at whatever level you narrow to. Mount `chart`, `table`, or both — they read the same window, the same credit rule, and the same selection, so two surfaces side by side can never disagree about what they are showing. The `ads` handle's `links` configuration wires the table's click and result counts to your own pages — the ones where you mounted the `tracking` namespace's `people` and `events`. *(sub-controller, 3 elements)*
  </Card>

  <Card title="BillingSetupElement" href="/elements/upcoming/ads/billing-setup">
    Which payment methods ad spend bills against: a primary used first, and an optional backup for when it fails. Both are chosen from the methods already saved on the account, and picking one saves it immediately — there is no separate submit. Adding a card opens a card form over your page and returns to the slot that asked for it. The account's own balance appears alongside its cards wherever the account has one.
  </Card>

  <Card title="CampaignCreatorElement" href="/elements/upcoming/ads/campaign-creator">
    The advertising campaign builder: objective and budget, ad groups with their targeting and schedule, and the ads themselves with their creative — the whole flow through to launch. Opens empty to build a new campaign, or on an existing one when you pass `campaignId`. It runs the pixel checker too: a launch is gated on the ad group’s conversion event being live on the destination URL, and the `pixel-setup` wizard opens inside this element to fix an install that is missing. The one token you set on the `ads` handle must carry the pixel scopes alongside the campaign scopes — `ad_campaign:create` and `company:basic:read` — rather than using a separate token per element.
  </Card>
</CardGroup>

## Flow surfaces

These internal elements open automatically during guided flows. They aren't part of the consumer API, so you don't mount or configure them.

* **AddCardElement** (`add-card`): Saves a card for ad spend without collecting a payment, in a dialog over the page. Collects the card and the billing details needed to save it, then reports the saved method to the slot that asked. Opened by the billing slots — not mounted directly.
