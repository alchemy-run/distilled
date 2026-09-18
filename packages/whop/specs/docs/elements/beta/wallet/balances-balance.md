> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# BalanceElement

> An account's balance and a chart of how it changed. The total and its change sit at the top, the chart below that, and the time range buttons at the bottom. The viewer can read individual points on the chart and switch the time range themselves.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

<div data-whop-platform="web">
  Mounts inside [`Balances`](/elements/beta/wallet/balances), in [`Wallet`](/elements/beta/wallet/overview). `accountId` and `currency` come from `Wallet`. Pass props and callbacks through the create options or React props.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  Mounts anywhere in your view hierarchy. Takes an `accountId` and loads its own data; `range` picks the time range it opens on. The root is a `VStack`, so it sizes to its content and fills the width you give it.
</div>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="wallet/balances-balance">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Wallet, Balances, BalanceElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Wallet /* options */>
                <Balances>
                  <BalanceElement onRangeChanged={(e) => console.log(e)} onRangeBrushed={(e) => console.log(e)} />
                </Balances>
              </Wallet>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const wallet = window.WhopElements().wallet.create({ /* options */ });
          const balances = wallet.create('balances', { /* options */ });
          balances.create('balance', {
            onRangeChanged: (e) => console.log(e),
            onRangeBrushed: (e) => console.log(e)
          }).mount('#wallet-balances-balance');
        </script>
        ```

        ```swift Swift theme={null}
        import SwiftUI
        import WhopElements

        // WhopSDK.configure(tokenProvider:) runs once at app launch. See Getting started.
        struct WalletScreen: View {
            var body: some View {
                BalanceElement(
                    accountId: "biz_xxxx",
                    range: .oneMonth
                )
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

        <div data-whop-demo-native="element:balances/balance" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
      </div>

      <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/wallet/overview#playground).</p>
    </div>

    <div data-whop-platform="swift" style={{ display: "none" }}>
      <div style={{ width: "22rem", maxWidth: "100%" }}>
        <div data-whop-simulator-shell className="whop-ios-simulator" style={{ position: "relative", aspectRatio: "390 / 800", overflow: "hidden" }}>
          <iframe src={"https://app.revyl.ai/embed/bb0f1c0a-4242-486a-a5f5-03dd9711744c?controls=0"} title="BalanceElement running on an iPhone simulator" loading="lazy" allow="fullscreen; clipboard-read; clipboard-write" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "transparent", display: "block" }} />
        </div>
      </div>
    </div>
  </div>
</div>

<div data-whop-platform="web">
  ## Props

  <ResponseField name="accessToken" type="string">
    A scoped token for the reads. An account needs `company:balance:read` for the total and `stats:read` for the chart; a user's own balance needs `user:balance:read`. Mint it on your server with `POST /api/v1/access_tokens`, and set a fresh one before it expires. Without it the reads use the viewer's own session, which only works same-origin. Defaults to `""`.
  </ResponseField>

  <ResponseField name="range" type="&#x22;1D&#x22; | &#x22;1W&#x22; | &#x22;1M&#x22; | &#x22;1Y&#x22; | &#x22;ALL&#x22;">
    The time range to open on. The buttons change it from there, or set this prop again to control it yourself. Defaults to `"1M"`.
  </ResponseField>

  <ResponseField name="openedAt" type="string">
    When the account was opened, as an ISO 8601 timestamp. `ALL` starts here instead of at its five-year default, so an account older than that keeps its full history. Defaults to `""`.
  </ResponseField>

  <ResponseField name="accountName" type="string">
    Adds the account name to the label: `Total balance · Acme` normally, and `Acme balance on Jul 9` while the viewer reads a point. Without it the label is just `Total balance`. Defaults to `""`.
  </ResponseField>

  <ResponseField name="brush" type="{ from: string; to: string; } | null">
    The selected range on the chart, as ISO 8601 timestamps. Set it to control the selection yourself, or `null` to clear the one the viewer made. Echo back what `rangeBrushed` reports, and clearing a filter elsewhere on your page clears the selection here too. Defaults to `null`.
  </ResponseField>

  <ResponseField name="markedAt" type="string">
    A moment to mark on the chart, as an ISO 8601 timestamp — the point something else on your page is pointing at, like the row under the pointer in an activity list. It reads like the viewer hovering that point themselves, and is ignored when it falls outside the window on screen or when they are reading the chart. Defaults to `""`.
  </ResponseField>

  <ResponseField name="includeOwnedAccounts" type="boolean">
    For a user, total their own money plus every account they own instead of their own money alone. Ignored for an account, which is a single account already. Defaults to `false`.
  </ResponseField>

  <ResponseField name="hideTotal" type="boolean">
    Hide the total and its change, leaving the chart and the range buttons. Defaults to `false`.
  </ResponseField>

  <ResponseField name="hideChart" type="boolean">
    Hide the chart, leaving the total and the range buttons. Defaults to `false`.
  </ResponseField>

  <ResponseField name="height" type="number">
    How tall the chart is drawn, in pixels. Defaults to `210`.
  </ResponseField>

  ## Events

  Pass callbacks in the create options or React props.

  ### `onRangeChanged`

  The visible time range changed. Mirror it if something else on your page reads the same period.

  **Signature:** `((payload: { range: "1D" | "1W" | "1M" | "1Y" | "ALL"; }) => void)`

  ### `onRangeBrushed`

  The viewer dragged across the chart to select a range, or cleared the selection (`null`). Gives ISO 8601 timestamps plus the range they were read in, so you can filter your own views, like an activity list or a table, to the same period.

  **Signature:** `((payload: { from: string; to: string; range: "1D" | "1W" | "1M" | "1Y" | "ALL"; } | null) => void)`

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

  **Signature:** `(options: Partial<BalanceElementProps>) => void`

  ## Styling

  Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

  | Class                       | Targets                                    |
  | --------------------------- | ------------------------------------------ |
  | `.whop-Balance`             | The total, its line, and the window picker |
  | `.whop-BalanceBrushSummary` | The measured stretch                       |
  | `.whop-BalanceChart`        | The balance line                           |
  | `.whop-BalanceRanges`       | The window picker                          |
  | `.whop-BalanceTotal`        | The total and its move                     |

  ```ts theme={null}
  const wallet = whop.wallet.create({
    appearance: {
      classes: {
        'whop-Balance': { borderRadius: '8px', fontWeight: '600' },
        'whop-BalanceBrushSummary': { borderRadius: '8px', fontWeight: '600' },
        'whop-BalanceChart': { borderRadius: '8px', fontWeight: '600' }
      }
    }
  });

  // 5 classes use this shape
  wallet.update({
    appearance: { classes: { 'whop-Balance': { fontWeight: '700' } } }
  });
  ```

  In React, pass `appearance` to `<Wallet>`. Set it globally with `WhopElements({ appearance })`.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  ## Parameters

  <ResponseField name="accountId" type="String" required>
    The account whose money the view reads. Use an account ID prefixed `biz_`. A user ID prefixed `user_` reads the viewer's own balance and needs viewer authentication (`WhopSDK.configureWithOAuth`), not an account token.
  </ResponseField>

  <ResponseField name="currency" type="String">
    The currency the total and chart are shown in. Defaults to `"usd"`.
  </ResponseField>

  <ResponseField name="range" type="WalletBalanceRange">
    The time range the chart opens on: `.oneDay`, `.oneWeek`, `.oneMonth`, `.oneYear`, `.all`. Defaults to `.oneMonth`, and the viewer can change it with the picker.
  </ResponseField>

  ## States

  Shows a placeholder chart while the data loads. If the comparison period fails, the change is hidden rather than guessed, so any number on screen is one that was actually measured. An account ID that can't be resolved shows `Couldn't load this account.` instead of spinning.

  ## Good to know

  * Press and drag across the chart to scrub it. The headline follows the point under your finger, and returns to the total when you let go.
  * Balance history is available only for account IDs prefixed `biz_`, so a personal account prefixed `user_` renders the total without a chart.
  * Pairs with [`ListElement`](/elements/beta/wallet/balances-list#swift), which breaks the same total into individual holdings.

  <Note>
    Call `WhopSDK.configure(tokenProvider:)` once at launch. Views wait for the token. See [Getting started](/elements/beta/getting-started). Apply a theme with `.whopTheme(_:)`.
  </Note>
</div>
