> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# DepositElement

> Funds a Whop account. Renders an amount field and the account's live funding rails — crypto (a per-network deposit address with its QR) and bank transfer (the wire fields for each settlement currency) — resolved from the account ID with no credentials, so it works on any page. Cards and platform balance are opt-in: pass `savedCards`, `allowNewCard`, or `showPlatformBalance` and the element collects the amount and the choice, then emits `cardDepositRequested` / `addCardRequested` / `platformBalanceSelected` and waits for you to call `showStep({ step: 'amount' })` when your own screen is done.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Wallet`](/elements/beta/wallet/overview). Pass props and callbacks through the create options or React props. Keep the created handle, or React `ref`, to call `showStep()` and `refresh()`.

<Note>You can mount this element **inline** (`create`) or open it as a **modal** overlay (`createOverlay`).</Note>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="wallet/deposit">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Wallet, DepositElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Wallet /* options */>
                <DepositElement onDepositInitiated={(e) => console.log(e)} onCardDepositRequested={(e) => console.log(e)} onAddCardRequested={(e) => console.log(e)} onBankSelected={(e) => console.log(e)} onPlatformBalanceSelected={(e) => console.log(e)} onDepositConfirmed={(e) => console.log(e)} onStepChanged={(e) => console.log(e)} onDismissed={(e) => console.log(e)} />
              </Wallet>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const wallet = window.WhopElements().wallet.create({ /* options */ });
          wallet.create('deposit', {
            onDepositInitiated: (e) => console.log(e),
            onCardDepositRequested: (e) => console.log(e),
            onAddCardRequested: (e) => console.log(e),
            onBankSelected: (e) => console.log(e),
            onPlatformBalanceSelected: (e) => console.log(e),
            onDepositConfirmed: (e) => console.log(e),
            onStepChanged: (e) => console.log(e),
            onDismissed: (e) => console.log(e)
          }).mount('#wallet-deposit');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:wallet/deposit" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/wallet/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="amount" type="string">
  Prefill the amount and make it read-only — for flows that already know what is owed. An amount at or below zero is ignored, as is one longer than 12 whole digits; the rest is rounded to the currency’s decimal places. Defaults to `""`.
</ResponseField>

<ResponseField name="showCrypto" type="boolean">
  Offer the crypto rail when the account has a deposit address. Defaults to `true`.
</ResponseField>

<ResponseField name="showBank" type="boolean">
  Offer the bank-transfer rail when the account has wire instructions. Defaults to `true`.
</ResponseField>

<ResponseField name="savedCards" type="DepositSavedCard[]">
  Cards you already hold for this payer, rendered as funding rows. Choosing one emits `cardDepositRequested` with the amount — the element never collects a card payment. Defaults to `[]`.
</ResponseField>

<ResponseField name="allowNewCard" type="boolean">
  Add an "Add card" row that emits `addCardRequested` so you can open your own card-collection flow. Defaults to `false`.
</ResponseField>

<ResponseField name="showPlatformBalance" type="boolean">
  Offer a "Platform balance" row that emits `platformBalanceSelected` immediately, with no amount step. Defaults to `false`.
</ResponseField>

<ResponseField name="cardFee" type="DepositCardFee | null">
  Processing fees to preview under the amount when a card row is selected. `percentageFee` is in percentage POINTS (`2.9` is 2.9%); `fixedFee` and `radarFee` are major units (`0.3` is \$0.30). Defaults to `null`.
</ResponseField>

<ResponseField name="preferredMethodId" type="string">
  Preselect a rail by id (`bank`, `crypto`, `platform_balance`, or a saved card id). Continue stays disabled while that rail is not yet offered, rather than funding through another one. Defaults to `""`.
</ResponseField>

<ResponseField name="deferBankToHost" type="boolean">
  Emit `bankSelected` and stay on the amount screen instead of showing the wire fields — for hosts that run their own step (a verification, an onboarding) first. Because that host owns the rail, the row is then offered even before the account has instructions to show. Defaults to `false`.
</ResponseField>

<ResponseField name="confirmCryptoDeposit" type="boolean">
  Show an "I have deposited my funds" button on the crypto screen that emits `depositConfirmed`, so you can start watching for the transfer. Defaults to `false`.
</ResponseField>

<ResponseField name="initialStep" type="&#x22;amount&#x22; | &#x22;bank&#x22; | &#x22;crypto&#x22;">
  Open straight onto a rail instead of the picker. `crypto` and `bank` need no amount; their back button emits `dismissed` because there is no picker behind them. Defaults to `"amount"`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onDepositInitiated`

The payer confirmed an amount and a rail. Fires for every rail, before any instructions render — the analytics/funnel hook.

**Signature:** `((payload: { method: "card" | "bank" | "crypto" | "platform_balance"; amount: number; currency: string; paymentMethodId?: string | undefined; }) => void)`

### `onCardDepositRequested`

A saved card was chosen. Collect the payment on your side, then call `showStep({ step: "amount" })` to return the element to the picker.

**Signature:** `((payload: { amount: number; currency: string; paymentMethodId: string; }) => void)`

### `onAddCardRequested`

The "Add card" row was picked — open your card-collection flow.

**Signature:** `((payload: Record<string, never>) => void)`

### `onBankSelected`

The bank rail was chosen while `deferBankToHost` is set — run your step, then show the fields yourself or call `showStep({ step: "bank" })`.

**Signature:** `((payload: Record<string, never>) => void)`

### `onPlatformBalanceSelected`

The platform-balance row was picked. It carries no amount — your own screen collects that.

**Signature:** `((payload: Record<string, never>) => void)`

### `onDepositConfirmed`

The payer said they sent the crypto. `since` is a unix-seconds floor to start matching incoming transfers from (it looks slightly back in time, so a transfer sent moments before the click still matches).

**Signature:** `((payload: { network: string; token: string; networkLabel: string; since: number; }) => void)`

### `onStepChanged`

The visible screen changed.

**Signature:** `((payload: { step: "amount" | "bank" | "crypto"; }) => void)`

### `onDismissed`

The payer backed out of a rail the element was opened directly onto — close the surface holding it.

**Signature:** `((payload: Record<string, never>) => void)`

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

### `showStep`

Move the element to a screen. `{ step: "amount" }` is how you hand control back after settling a card or platform-balance deposit on your side.

**Signature:** `(input: { step: "amount" | "bank" | "crypto"; }) => Promise<void>`

### `refresh`

Re-resolve the account's funding rails. Call it after anything on your side changes what the account can offer — finishing bank onboarding, for instance — so the new rail appears without waiting for the cache to expire.

**Signature:** `() => Promise<void>`

### `mount`

Mounts the element in `target` and starts loading. React components mount themselves.

**Signature:** `(target: string | HTMLElement) => void`

### `destroy`

Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

**Signature:** `() => void`

### `update`

Merges new props into the mounted element. In React, change the component props instead.

**Signature:** `(options: Partial<DepositElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                  | Targets                                         |
| ---------------------- | ----------------------------------------------- |
| `.whop-DepositSurface` | The deposit element root — one screen at a time |

```ts theme={null}
const wallet = whop.wallet.create({
  appearance: {
    classes: {
      'whop-DepositSurface': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

wallet.update({
  appearance: {
    classes: { 'whop-DepositSurface': { fontWeight: '700' } }
  }
});
```

In React, pass `appearance` to `<Wallet>`. Set it globally with `WhopElements({ appearance })`.
