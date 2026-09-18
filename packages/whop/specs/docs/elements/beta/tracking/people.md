> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# PeopleElement

> Everyone the account has seen — visitors and customers resolved from pixel activity, with their source, spend, and activity counters. Search, filter by source, event, geography, or device, sort any column, and page through. A row click follows `links.person` when the handle configures it, and otherwise comes back to you as `personOpened`.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Tracking`](/elements/beta/tracking/overview). `accountId` and `accessToken` come from there. Pass props and callbacks through the create options or React props.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="tracking/people">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Tracking, PeopleElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Tracking /* options */>
                <PeopleElement onPeriodChanged={(e) => console.log(e)} onAttributionModelChanged={(e) => console.log(e)} onFiltersChanged={(e) => console.log(e)} onSortChanged={(e) => console.log(e)} onPersonOpened={(e) => console.log(e)} />
              </Tracking>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const tracking = window.WhopElements().tracking.create({ /* options */ });
          tracking.create('people', {
            onPeriodChanged: (e) => console.log(e),
            onAttributionModelChanged: (e) => console.log(e),
            onFiltersChanged: (e) => console.log(e),
            onSortChanged: (e) => console.log(e),
            onPersonOpened: (e) => console.log(e)
          }).mount('#tracking-people');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:tracking/people" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/tracking/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="source" type="string">
  Narrow to people acquired by a traffic source, as a source path — `whop:adcamp_…:*` for one of the account’s campaigns, `ext:*` for ads run elsewhere, `referrer:*`, `direct`. The same value the ads table’s click counts link with, so a page can hydrate this straight from its own URL. Defaults to `""`.
</ResponseField>

<ResponseField name="eventName" type="string">
  Narrow to people who performed an event, by its name — `payment.completed`, `pixel.lead`, `pixel.page`. Defaults to `""`.
</ResponseField>

<ResponseField name="customEvent" type="string">
  Narrow to people who performed a custom pixel event, by its custom name. Pairs with an empty `eventName`. Defaults to `""`.
</ResponseField>

<ResponseField name="utmSource" type="string">
  Narrow by the `utm_source` their traffic carried. Comma-separate to match any of several. Defaults to `""`.
</ResponseField>

<ResponseField name="country" type="string">
  Narrow by ISO 3166-1 alpha-2 country code, such as `US` or `GB`. Defaults to `""`.
</ResponseField>

<ResponseField name="device" type="string">
  Narrow by device class — `desktop`, `mobile`, `tablet`, `bot`. Defaults to `""`.
</ResponseField>

<ResponseField name="browser" type="string">
  Narrow by browser name. Defaults to `""`.
</ResponseField>

<ResponseField name="os" type="string">
  Narrow by operating system name. Defaults to `""`.
</ResponseField>

<ResponseField name="hasPurchased" type="string">
  `true` for customers only, `false` for people who never bought, empty for everyone. Defaults to `""`.
</ResponseField>

<ResponseField name="query" type="string">
  What the search box is filtered to — a name, an email, or an identifier. Defaults to `""`.
</ResponseField>

<ResponseField name="audienceId" type="string">
  Narrow to a saved audience (`adaud_…`) built from people filters. The audience filter menu moves this. Defaults to `""`.
</ResponseField>

<ResponseField name="eventFrom" type="string">
  Pin the event window for `source`/`eventName` filters to an exact ISO 8601 instant instead of the handle’s `period`. Set both `eventFrom` and `eventTo` or neither. Defaults to `""`.
</ResponseField>

<ResponseField name="eventTo" type="string">
  The pinned event window’s end, as an ISO 8601 instant. Defaults to `""`.
</ResponseField>

<ResponseField name="sort" type="string">
  The sorted column: `name`, `email`, `ltv`, `purchase_count`, `event_count`, `first_seen_at`, `last_seen_at`. Defaults to `"last_seen_at"`.
</ResponseField>

<ResponseField name="dir" type="&#x22;asc&#x22; | &#x22;desc&#x22;">
  The sort direction. Defaults to `"desc"`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onPeriodChanged`

The viewer moved the window from the period selector. Every surface under the same handle has already followed it; persist it and pass it back as `period`/`customRange` on the handle, or the window resets on the next mount.

**Signature:** `((payload: { period: "today" | "yesterday" | "last_7_days" | "last_14_days" | "last_30_days" | "last_90_days" | "all_time" | "custom"; customRange: { from: string; to: string; } | null; }) => void)`

### `onAttributionModelChanged`

The viewer changed which touch gets the credit, from the filter row’s Attribution menu. Every surface under the same handle has already re-credited; persist it and pass it back as `attributionModel` on the handle, or it reverts on the next mount.

**Signature:** `((payload: { attributionModel: "last_touch" | "first_touch"; }) => void)`

### `onFiltersChanged`

The viewer moved a filter, the search box, or the audience picker. Carries the entire filter state whichever moved — mirror it into your own URL and pass it back as props to make the view reproducible.

**Signature:** `((payload: PeopleFilterBag) => void)`

### `onSortChanged`

The viewer sorted a column. Persist and pass back as `sort`/`dir`, or sorting resets on the next mount.

**Signature:** `((payload: { sort: string; dir: "asc" | "desc"; }) => void)`

### `onPersonOpened`

The viewer clicked a person row and the handle has no `links.person` to follow — open your own person view with it (`personId` is the stable per-person key; `identifier` is the most human-meaningful one the surface has), or pass `links.person` on the handle to turn rows into real anchors instead.

**Signature:** `((payload: { identifier: string; personId: string; }) => void)`

### `onLoaderStart`

Runs after the loading skeleton first paints and before `onReady`.

**Signature:** `(() => void)`

### `onReady`

Runs after the element's first complete paint.

**Signature:** `(() => void)`

### `onError`

Runs when the element fails to load or crashes. The fallback remains visible. Use `code` for programmatic handling. `sourceKey` identifies a failed host-state source.

**Signature:** `((e: { message: string; code?: string | undefined; sourceKey?: string | undefined; }) => void)`

## Methods

Call these on the handle returned by `create`, or through a React `ref`.

### `mount`

Mounts the element in `target` and starts loading. React components mount themselves.

**Signature:** `(target: string | HTMLElement) => void`

### `destroy`

Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

**Signature:** `() => void`

### `update`

Merges new props into the mounted element. In React, change the component props instead.

**Signature:** `(options: Partial<PeopleElementProps>) => void`

## Styling

This element doesn't expose class names for styling. Use `appearance` (theme, accent color, variables) to restyle it.
