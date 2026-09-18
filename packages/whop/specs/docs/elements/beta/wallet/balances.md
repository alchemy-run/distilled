> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Balances

> Two views of an account's money. The balance view shows the total, a chart of how it changed, and a picker for the time range. The list view shows the holdings that make up that total, valued in dollars.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

<div data-whop-platform="web">
  Mounts inside [`Wallet`](/elements/beta/wallet/overview). Create it to get a handle, then mount its elements on that handle. Call `destroy()` to remove the sub-controller. Create it again to get a fresh handle.

  ## Preview

  A live, interactive demo of this sub-controller's default arrangement with example data:

  <div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
    <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

    <div data-whop-demo-native="unit:balances" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
  </div>
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  Mounts anywhere in your view hierarchy. [`BalanceElement`](/elements/beta/wallet/balances-balance#swift) and [`ListElement`](/elements/beta/wallet/balances-list#swift) are independent, so use one alone or both on one screen. Each takes an `accountId` and loads its own data.

  ## Preview

  Running on an iPhone, in the example app:

  <div style={{ width: "22rem", maxWidth: "100%" }}>
    <div data-whop-simulator-shell className="whop-ios-simulator" style={{ position: "relative", aspectRatio: "390 / 800", overflow: "hidden" }}>
      <iframe src={"https://app.revyl.ai/embed/c1954726-8f9b-483d-9f50-247fa7bfb007?controls=0"} title="BalanceElement running on an iPhone simulator" loading="lazy" allow="fullscreen; clipboard-read; clipboard-write" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "transparent", display: "block" }} />
    </div>
  </div>
</div>

<div data-whop-usage="wallet/balances">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Wallet, Balances, BalanceElement, ListElement } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Wallet /* options */>
            <Balances>
              <BalanceElement />
              <ListElement />
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
      balances.create('balance').mount('#wallet-balances-balance');
      balances.create('list').mount('#wallet-balances-list');
    </script>
    ```

    ```swift Swift theme={null}
    import SwiftUI
    import WhopElements

    // WhopSDK.configure(tokenProvider:) runs once at app launch. See Getting started.
    struct WalletScreen: View {
        let account = "biz_xxxx"

        var body: some View {
            ScrollView {
                VStack(spacing: 24) {
                    BalanceElement(accountId: account)
                    ListElement(accountId: account)
                }
                .padding()
            }
        }
    }
    ```
  </CodeGroup>
</div>

<div data-whop-platform="web">
  ## Options

  Pass these to `wallet.create('balances', { … })`, or as props on `<Balances>` in React. Parent-injected props never appear here.

  *Balances takes no options.*

  ## Methods

  Call these on the sub handle from `wallet.create('balances', { … })`.

  ### `update`

  Merges new props and callbacks into the sub-controller.

  **Signature:** `(options: Partial<BalancesSubOptions>) => void`

  ### `destroy`

  Destroys the sub-controller and its elements, then frees its exclusive slot. A later `create("balances")` starts fresh.

  **Signature:** `() => void`
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  ## Parameters

  <ResponseField name="accountId" type="String" required>
    The account whose money the view reads. Use an account ID prefixed `biz_`. A user ID prefixed `user_` reads the viewer's own balance and needs viewer authentication (`WhopSDK.configureWithOAuth`), not an account token.
  </ResponseField>

  ## States

  Each view manages its own states, so neither blocks the other from rendering.

  ## Good to know

  * They share no state and load independently, so you can use one alone or both as below.
  * Read the detail on [`BalanceElement`](/elements/beta/wallet/balances-balance#swift) and [`ListElement`](/elements/beta/wallet/balances-list#swift); [`ActivityElement`](/elements/beta/wallet/activity#swift) lists the movements behind them.

  <Note>
    Call `WhopSDK.configure(tokenProvider:)` once at launch. Views wait for the token. See [Getting started](/elements/beta/getting-started). Apply a theme with `.whopTheme(_:)`.
  </Note>
</div>

## Elements

The elements this sub-controller mounts. Each has its own page:

<CardGroup cols={2}>
  <Card title="BalanceElement" href="/elements/beta/wallet/balances-balance">
    An account's balance and a chart of how it changed. The total and its change sit at the top, the chart below that, and the time range buttons at the bottom. The viewer can read individual points on the chart and switch the time range themselves.
  </Card>

  <Card title="ListElement" href="/elements/beta/wallet/balances-list">
    The holdings behind an account's balance. Every currency and token gets its own row, showing its name and its value in dollars, largest first. Rows can report which one the viewer tapped, so you can open your own screen for it.
  </Card>
</CardGroup>
