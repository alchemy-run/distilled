> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# ActivityElement

> An account's ledger activity: every movement of money in or out, newest first. The list pages as the viewer scrolls, and rows report which one was tapped instead of navigating, so you can open your own detail screen.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

<div data-whop-platform="web">
  Mounts inside [`Wallet`](/elements/beta/wallet/overview). `accountId` comes from there. Pass props and callbacks through the create options or React props. Keep the created handle, or React `ref`, to call `refresh()` and `setDateRange()`.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  Mounts anywhere in your view hierarchy. Takes an `accountId` and loads its own data; pass a closure too and you get the row the viewer tapped.
</div>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="wallet/activity">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Wallet, ActivityElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Wallet /* options */>
                <ActivityElement onActivitySelected={(e) => console.log(e)} onActivityHovered={(e) => console.log(e)} onDateRangeChanged={(e) => console.log(e)} />
              </Wallet>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const wallet = window.WhopElements().wallet.create({ /* options */ });
          wallet.create('activity', {
            onActivitySelected: (e) => console.log(e),
            onActivityHovered: (e) => console.log(e),
            onDateRangeChanged: (e) => console.log(e)
          }).mount('#wallet-activity');
        </script>
        ```

        ```swift Swift theme={null}
        import SwiftUI
        import WhopElements

        // WhopSDK.configure(tokenProvider:) runs once at app launch. See Getting started.
        struct ActivityScreen: View {
            var body: some View {
                ScrollView {
                    ActivityElement(
                        accountId: "biz_xxxx"
                    ) { activity in
                        print(activity.title, activity.amount)
                    }
                    .padding()
                }
            }
        }
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-platform="web">
      <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
        <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

        <div data-whop-demo-native="element:wallet/activity" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
      </div>

      <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/wallet/overview#playground).</p>
    </div>

    <div data-whop-platform="swift" style={{ display: "none" }}>
      <div style={{ width: "22rem", maxWidth: "100%" }}>
        <div data-whop-simulator-shell className="whop-ios-simulator" style={{ position: "relative", aspectRatio: "390 / 800", overflow: "hidden" }}>
          <iframe src={"https://app.revyl.ai/embed/7289cae9-8eaf-4d14-a771-fb05c879c6c5?controls=0"} title="ActivityElement running on an iPhone simulator" loading="lazy" allow="fullscreen; clipboard-read; clipboard-write" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "transparent", display: "block" }} />
        </div>
      </div>
    </div>
  </div>
</div>

<div data-whop-platform="web">
  ## Props

  <ResponseField name="currency" type="string">
    Only show activity for this currency. Without it, activity from every currency is shown.
  </ResponseField>

  <ResponseField name="accessToken" type="string">
    A scoped token for the read. An account needs `company:balance:read`, and a user needs `user:balance:read`. Mint it on your server with `POST /api/v1/access_tokens`. Without it the read uses the viewer's own session, which only works same-origin.
  </ResponseField>

  <ResponseField name="canOpenCardTransactionDetails" type="boolean">
    When off, card transaction rows render inert (no click, no hover) instead of firing `activitySelected`. Use it when you know the viewer isn't allowed to see those details. Defaults to `true`.
  </ResponseField>

  ## Events

  Pass callbacks in the create options or React props.

  ### `onActivitySelected`

  A row was clicked. Open your own detail view or route for it; the element never navigates.

  **Signature:** `((payload: { activity: LedgerActivity; }) => void)`

  ### `onActivityHovered`

  The pointer entered a row, or left one (`null`). Point something of your own at the same moment, like marking the row on a balance chart.

  **Signature:** `((payload: { activity: LedgerActivity; } | null) => void)`

  ### `onDateRangeChanged`

  The viewer changed the date filter through the filter row rather than through `setDateRange`. Clear any range selection of your own, like a chart brush, that no longer matches.

  **Signature:** `((payload: { dateRange: { start: string; end: string; } | null; }) => void)`

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

  ### `refresh`

  Re-fetch the account's activity from the first page. Call it after a mutation made elsewhere (a deposit, a send) so the list reflects it without waiting for the cache to expire.

  **Signature:** `() => Promise<void>`

  ### `setDateRange`

  Set the date filter from outside the element, for example wiring a chart brush selection into the list. Pass `null` to clear it.

  **Signature:** `(input: ActivityDateRangeOverride | null) => Promise<void>`

  ### `mount`

  Mounts the element in `target` and starts loading. React components mount themselves.

  **Signature:** `(target: string | HTMLElement) => void`

  ### `destroy`

  Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

  **Signature:** `() => void`

  ### `update`

  Merges new props into the mounted element. In React, change the component props instead.

  **Signature:** `(options: Partial<ActivityElementProps>) => void`

  ## Styling

  Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

  | Class                   | Targets                                                          |
  | ----------------------- | ---------------------------------------------------------------- |
  | `.whop-ActivityRow`     | One ledger activity row — its icon, title, timestamp, and amount |
  | `.whop-ActivitySurface` | The activity feed — title, filters, and up to every fetched row  |

  ```ts theme={null}
  const wallet = whop.wallet.create({
    appearance: {
      classes: {
        'whop-ActivityRow': { borderRadius: '8px', fontWeight: '600' },
        'whop-ActivitySurface': { borderRadius: '8px', fontWeight: '600' }
      }
    }
  });

  wallet.update({
    appearance: { classes: { 'whop-ActivityRow': { fontWeight: '700' } } }
  });
  ```

  In React, pass `appearance` to `<Wallet>`. Set it globally with `WhopElements({ appearance })`.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  ## Parameters

  <ResponseField name="accountId" type="String" required>
    Whose ledger to list. Use an account ID prefixed `biz_` or a user ID prefixed `user_`. Both work directly because the feed reads the ID without resolving a ledger first.
  </ResponseField>

  <ResponseField name="showsTitle" type="Bool">
    Shows the built-in "Activity" heading. Defaults to `true`. Turn it off when your screen already has one.
  </ResponseField>

  <ResponseField name="onActivitySelected" type="((WalletActivity) -> Void)?">
    Called with the row the viewer tapped. The view never navigates, so route to your own detail screen.
  </ResponseField>

  ## `WalletActivity`

  What a selection hands back:

  * `id: String`: stable per row
  * `title: String` / `subtitle: String`: the row's two lines
  * `amount: Decimal`: signed, negative for money out
  * `currencyCode: String`
  * `postedAt: Date`
  * `isIncoming: Bool`

  ## States

  Shows a skeleton list while the first page loads, `No activity found` when the ledger has no movements, and the failure message with a `Try again` button when the read fails. If a later page fails, the rows already loaded stay on screen and a `Try again` appears at the bottom.

  ## Good to know

  * **Give it a scroll container.** The feed is a `LazyVStack` and pages as its last row appears, so outside a `ScrollView` it renders page one and never loads another.
  * Takes `biz_…` and `user_…` tags directly, so unlike the other wallet views it never has to resolve a ledger first.

  <Note>
    Call `WhopSDK.configure(tokenProvider:)` once at launch. Views wait for the token. See [Getting started](/elements/beta/getting-started). Apply a theme with `.whopTheme(_:)`.
  </Note>
</div>
