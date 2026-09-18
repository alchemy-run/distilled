> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Tracking

> An account's tracked audience: everyone its pixel has seen, and every event they performed. Scope it to an account with `accountId`, then mount `people`, `events`, or both — they read the same window and the same credit rule, so two surfaces side by side can never disagree about what they are showing. `links` wires their person links to your own pages.

## Playground

Assemble the elements with example data. Drive the controls, add and arrange elements, and watch events fire live:

<div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
  <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

  <div data-whop-demo-native="playground:tracking" data-whop-elements-version="" style={{ position: "relative" }} />
</div>

<div data-whop-usage="tracking/playground">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Tracking } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Tracking /* options */>
            {/* mount elements here */}
          </Tracking>
        </WhopElements>
      );
    }
    ```

    ```html JavaScript theme={null}
    <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
    <script type="module">
      const tracking = window.WhopElements().tracking.create({ /* options */ });
    </script>
    ```
  </CodeGroup>
</div>

## Options

Pass these to `whop.tracking.create({ … })`, or as props on `<Tracking>` in React.

<ResponseField name="accountId" type="string">
  Account ID, prefixed `biz_`, whose people and events this reads. Required. Defaults to `""`.
</ResponseField>

<ResponseField name="accessToken" type="string">
  A scoped token both surfaces read with. Mint one token for the whole handle on your server with `POST /api/v1/access_tokens`, and set a fresh one with `update({ accessToken })` before it expires. Reading the lists needs `member:basic:read` or `company:basic:read`; the filter menus' option counts additionally use `stats:read`, and the People table's saved-audience filter uses `audience:basic:read` — without those the menus simply show fewer options. Omitted, the calls carry the viewer's own session, which only answers same-origin.
</ResponseField>

<ResponseField name="links" type="CrossLinksConfig">
  Where person links lead on your site. `person` is an absolute-URL template with two placeholders, each replaced URL-encoded per row: `{personId}` is the stable `prsn_…` ID, identical for the same person on every surface — key your page on it; `{identifier}` is the most human-meaningful identifier the surface has (a user ID or email where known), so it can differ across surfaces. It must be absolute (`https://…`) — inside an element frame a relative URL would resolve against the frame, so one is treated as unset. Unset, a person click raises `personOpened` on its element instead. `people` and `events` base URLs are accepted for symmetry with the ads handle but nothing under this handle renders them. Defaults to `{}`.
</ResponseField>

<ResponseField name="period" type="&#x22;today&#x22; | &#x22;yesterday&#x22; | &#x22;last_7_days&#x22; | &#x22;last_14_days&#x22; | &#x22;last_30_days&#x22; | &#x22;last_90_days&#x22; | &#x22;all_time&#x22; | &#x22;custom&#x22;">
  The window both surfaces cover: `today`, `yesterday`, `last_7_days`, `last_14_days`, `last_30_days`, `last_90_days`, `all_time`, or `custom` (pair it with `customRange`). The elements carry the picker and move this; read it back off `periodChanged`. Defaults to `"last_14_days"`.
</ResponseField>

<ResponseField name="customRange" type="{ from: string; to: string; } | null">
  The explicit window, as ISO 8601 instants, used when `period` is `custom`. Ignored otherwise. Defaults to `null`.
</ResponseField>

<ResponseField name="timezone" type="&#x22;account&#x22; | &#x22;local&#x22;">
  Which of two zones the window resolves in: `account`, the account's own scheduling zone, or `local`, whichever zone the viewer's browser is in. `account` falls back to the viewer's own when the account has set none. Defaults to `"account"`.
</ResponseField>

<ResponseField name="attributionModel" type="&#x22;last_touch&#x22; | &#x22;first_touch&#x22;">
  Which touch in a person’s journey gets the credit when filtering by source: `last_touch`, the default, or `first_touch`. The elements carry the picker and move this, so a host can drive it and read it back off `attributionModelChanged`. Defaults to `"last_touch"`.
</ResponseField>

<ResponseField name="appearance" type="Appearance">
  Visual customization for this group's elements. Overrides the global `WhopElements({ appearance })`. Change it live with `update({ appearance })`.
</ResponseField>

<ResponseField name="locale" type="WhopElementsLocale">
  Locale for this group's element UI text. Set it to one of the app's built locales to override the global configuration. Any other value falls back to the default locale.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onLoadingChange`

Runs when the grouped loading state changes. The value is `true` while any mounted element is still loading.

**Signature:** `((loading: boolean) => void)`

## Methods

Call these on the Tracking handle from `whop.tracking.create({ … })` or `useTracking()`.

### `update`

Merges new handle options into every mounted element. In React, change the namespace props instead.

**Signature:** `(options: Partial<TrackingOptions>) => void`

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

## `PeopleFilterBag`

Consumer-facing filters for the People element. The element maps these camelCase options to `/api/v1/people` query parameters.

### `source`

**Signature:** `string`

### `eventName`

**Signature:** `string`

### `customEvent`

**Signature:** `string`

### `utmSource`

**Signature:** `string`

### `country`

**Signature:** `string`

### `device`

**Signature:** `string`

### `browser`

**Signature:** `string`

### `os`

**Signature:** `string`

### `hasPurchased`

**Signature:** `string`

### `query`

**Signature:** `string`

### `audienceId`

**Signature:** `string`

### `eventFrom`

**Signature:** `string`

### `eventTo`

**Signature:** `string`

## `EventsFilterBag`

Consumer-facing filters for the Events element. The element maps these camelCase options to `/api/v1/events` query parameters.

### `identifier`

**Signature:** `string`

### `event`

**Signature:** `string`

### `source`

**Signature:** `string`

### `country`

**Signature:** `string`

### `utmSource`

**Signature:** `string`

### `device`

**Signature:** `string`

### `browser`

**Signature:** `string`

### `os`

**Signature:** `string`

### `from`

**Signature:** `string`

### `to`

**Signature:** `string`

## Elements

The elements this group mounts. Each has its own page:

<CardGroup cols={2}>
  <Card title="PeopleElement" href="/elements/upcoming/tracking/people">
    Everyone the account has seen — visitors and customers resolved from pixel activity, with their source, spend, and activity counters. Search, filter by source, event, geography, or device, sort any column, and page through. A row click follows `links.person` when the handle configures it, and otherwise comes back to you as `personOpened`.
  </Card>

  <Card title="EventsElement" href="/elements/upcoming/tracking/events">
    Every event the account measured — page views, leads, purchases, and custom pixel events — as a raw, filterable stream. The rows behind any metric: filter by event, source, geography, or device over the handle’s window, or search one person’s identifier to read their whole journey. A person cell follows `links.person` when the handle configures it, and otherwise comes back to you as `personOpened`.
  </Card>
</CardGroup>
