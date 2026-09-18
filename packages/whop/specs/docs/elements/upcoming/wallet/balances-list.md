> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# ListElement

> The holdings behind an account's balance. Every currency and token gets its own row, showing its name and its value in dollars, largest first. Rows can report which one the viewer tapped, so you can open your own screen for it.

<div data-whop-platform="web">
  Mounts inside [`Balances`](/elements/upcoming/wallet/balances), in [`Wallet`](/elements/upcoming/wallet/overview). `accountId` comes from `Wallet`. Pass props and callbacks through the create options or React props.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  Mounts anywhere in your view hierarchy. Takes an `accountId` and loads its own data; pass a closure too and the rows become tappable. The root is a `VStack`, so it sizes to its content and fills the width you give it.
</div>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="wallet/balances-list">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Wallet, Balances, ListElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Wallet /* options */>
                <Balances>
                  <ListElement onBalanceSelected={(e) => console.log(e)} onAccountSelected={(e) => console.log(e)} />
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
          balances.create('list', {
            onBalanceSelected: (e) => console.log(e),
            onAccountSelected: (e) => console.log(e)
          }).mount('#wallet-balances-list');
        </script>
        ```

        ```swift Swift theme={null}
        import SwiftUI
        import WhopElements

        // WhopSDK.configure(tokenProvider:) runs once at app launch. See Getting started.
        struct WalletScreen: View {
            var body: some View {
                ListElement(
                    accountId: "biz_xxxx"
                ) { balance in
                    print(balance.symbol)
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

        <div data-whop-demo-native="element:balances/list" data-whop-elements-version="" style={{ position: "relative" }} />
      </div>

      <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/upcoming/wallet/overview#playground).</p>
    </div>

    <div data-whop-platform="swift" style={{ display: "none" }}>
      <div style={{ width: "22rem", maxWidth: "100%" }}>
        <div data-whop-simulator-shell className="whop-ios-simulator" style={{ position: "relative", aspectRatio: "390 / 800", overflow: "hidden" }}>
          <iframe src={"https://app.revyl.ai/embed/f128a268-f5e0-47c1-8919-86e4f04d6876?controls=0"} title="ListElement running on an iPhone simulator" loading="lazy" allow="fullscreen; clipboard-read; clipboard-write" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "transparent", display: "block" }} />
        </div>
      </div>
    </div>
  </div>
</div>

<div data-whop-platform="web">
  ## Props

  <ResponseField name="accessToken" type="string">
    A scoped token for the read. An account needs `company:balance:read`; a user's holdings or owned-account list needs `user:balance:read`. Mint it on your server with `POST /api/v1/access_tokens`. Without it the read uses the viewer's own session, which only works same-origin.
  </ResponseField>

  <ResponseField name="includeOwnedAccounts" type="boolean">
    For a user's `user_…` account, list their personal balance followed by every owned account the backend returns instead of listing the holdings inside their personal account. Ignored for an account. Defaults to `false`.
  </ResponseField>

  <ResponseField name="showSourceCurrency" type="boolean">
    Show each row in the currency it is held in (€4.20, 0.00000009 cbBTC) and put the dollar value underneath. Off by default, so every row is in dollars. Defaults to `false`.
  </ResponseField>

  <ResponseField name="showUsdEquivalent" type="boolean">
    Keep the dollar value under a holding shown in its own currency. Only applies when `showSourceCurrency` is on. Defaults to `true`.
  </ResponseField>

  <ResponseField name="showPersonalAccount" type="boolean">
    Keep the personal row when `includeOwnedAccounts` is on. Turn it off if your app has no personal account to open. Defaults to `true`.
  </ResponseField>

  ## Events

  Pass callbacks in the create options or React props.

  ### `onBalanceSelected`

  A holding row was clicked, with `includeOwnedAccounts` off. `holding` is `usd` for the combined dollar row, otherwise the holding symbol (`cbBTC`, `EUR`), and `kind` tells you which of the three it is so you can route without classifying symbols yourself. The element never navigates.

  **Signature:** `((payload: { holding: string; kind: "usd" | "cash" | "asset"; }) => void)`

  ### `onAccountSelected`

  An account row was clicked, with `includeOwnedAccounts` on. `accountId` is the personal `user_…` tag or an owned `biz_…` tag, and `kind` lets you route without inspecting it. The element never navigates.

  **Signature:** `((payload: { accountId: string; kind: "personal" | "business"; }) => void)`

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

  **Signature:** `(options: Partial<ListElementProps>) => void`

  ## Styling

  Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

  | Class                   | Targets                                             |
  | ----------------------- | --------------------------------------------------- |
  | `.whop-BalanceRow`      | One balance row — its icon, name, value and chevron |
  | `.whop-BalancesSurface` | The balances list — one row per holding or account  |

  ```ts theme={null}
  const wallet = whop.wallet.create({
    appearance: {
      classes: {
        'whop-BalanceRow': { borderRadius: '8px', fontWeight: '600' },
        'whop-BalancesSurface': { borderRadius: '8px', fontWeight: '600' }
      }
    }
  });

  wallet.update({
    appearance: { classes: { 'whop-BalanceRow': { fontWeight: '700' } } }
  });
  ```

  In React, pass `appearance` to `<Wallet>`. Set it globally with `WhopElements({ appearance })`.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  ## Parameters

  <ResponseField name="accountId" type="String" required>
    The account whose money the view reads. Use an account ID prefixed `biz_`. A user ID prefixed `user_` reads the viewer's own balance and needs viewer authentication (`WhopSDK.configureWithOAuth`), not an account token.
  </ResponseField>

  <ResponseField name="onBalanceSelected" type="((WalletBalance) -> Void)?">
    Called with the row the viewer tapped. Omit it and the rows render without chevrons, and tapping does nothing.
  </ResponseField>

  ## `WalletBalance`

  What a selection hands back:

  * `id: String`: stable per row
  * `symbol: String`: `USD`, `BTC`, …
  * `displayName: String`: the name shown on the row
  * `amountUsd: Decimal`: the row's value in dollars
  * `isCrypto: Bool`: a crypto holding rather than fiat

  ## States

  Shows two placeholder rows while the balances load. An account ID that can't be resolved shows `Couldn't load this account.` If the balance read itself fails, the list renders empty rather than showing an error.

  ## Good to know

  * It doesn't scroll on its own, so put it in a `ScrollView` when it shares a screen with other content.
  * Pairs with [`BalanceElement`](/elements/upcoming/wallet/balances-balance#swift), which shows the same account's total and how it changed.

  <Note>
    Call `WhopSDK.configure(tokenProvider:)` once at launch. Views wait for the token. See [Getting started](/elements/upcoming/getting-started). Apply a theme with `.whopTheme(_:)`.
  </Note>
</div>
