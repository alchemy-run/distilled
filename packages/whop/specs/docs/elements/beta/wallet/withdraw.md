> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# WithdrawElement

> Collects a payout amount and saved payout method, groups standard and instant delivery choices with live fees and arrival estimates, collects a new payout method when needed, and presents a confirmation screen before emitting the final payout request.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Wallet`](/elements/beta/wallet/overview). Pass props and callbacks through the create options or React props.

<Note>You can mount this element **inline** (`create`) or open it as a **modal** overlay (`createOverlay`).</Note>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="wallet/withdraw">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Wallet, WithdrawElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Wallet /* options */>
                <WithdrawElement onAmountChanged={(e) => console.log(e)} onCountryChanged={(e) => console.log(e)} onSupportedMethodChanged={(e) => console.log(e)} onAddMethodRequested={(e) => console.log(e)} onPlaidLinkRequested={(e) => console.log(e)} onMethodVerificationCompleted={(e) => console.log(e)} onRenameMethodRequested={(e) => console.log(e)} onRemoveMethodRequested={(e) => console.log(e)} onWithdrawalRequested={(e) => console.log(e)} onDone={(e) => console.log(e)} />
              </Wallet>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const wallet = window.WhopElements().wallet.create({ /* options */ });
          wallet.create('withdraw', {
            onAmountChanged: (e) => console.log(e),
            onCountryChanged: (e) => console.log(e),
            onSupportedMethodChanged: (e) => console.log(e),
            onAddMethodRequested: (e) => console.log(e),
            onPlaidLinkRequested: (e) => console.log(e),
            onMethodVerificationCompleted: (e) => console.log(e),
            onRenameMethodRequested: (e) => console.log(e),
            onRemoveMethodRequested: (e) => console.log(e),
            onWithdrawalRequested: (e) => console.log(e),
            onDone: (e) => console.log(e)
          }).mount('#wallet-withdraw');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:wallet/withdraw" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/wallet/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="succeeded" type="boolean">
  Whether the confirmed payout was created successfully. Defaults to `false`.
</ResponseField>

<ResponseField name="methods" type="WithdrawalMethod[]">
  Saved payout methods with quotes for the current amount. Defaults to `[]`.
</ResponseField>

<ResponseField name="availableBalance" type="number">
  Settled balance available to standard payout methods. Defaults to `0`.
</ResponseField>

<ResponseField name="pendingBalance" type="number">
  Pending balance that may be available to instant payout methods. Defaults to `0`.
</ResponseField>

<ResponseField name="payoutCountry" type="string">
  The payout account's ISO 3166-1 alpha-2 country. Defaults to `"US"`.
</ResponseField>

<ResponseField name="supportedMethods" type="WithdrawalSupportedMethod[]">
  Payout methods available to add in the selected country, including required fields. Defaults to `[]`.
</ResponseField>

<ResponseField name="supportedMethodsLoading" type="boolean">
  Whether supported payout methods are loading for the selected country. Defaults to `false`.
</ResponseField>

<ResponseField name="limits" type="WithdrawalLimits">
  Live standard and instant payout limits. Defaults to `{"standard":{"maxAmount":0},"instant":{"maxAmount":0}}`.
</ResponseField>

<ResponseField name="loading" type="boolean">
  Whether payout methods and limits are loading. Defaults to `false`.
</ResponseField>

<ResponseField name="quoteLoading" type="boolean">
  Whether the current amount is being repriced. Defaults to `false`.
</ResponseField>

<ResponseField name="savingMethod" type="boolean">
  Whether a new payout method is being saved. Defaults to `false`.
</ResponseField>

<ResponseField name="submitting" type="boolean">
  Whether the confirmed payout is being created. Defaults to `false`.
</ResponseField>

<ResponseField name="error" type="string">
  A host-side error to show inside the current screen. Defaults to `""`.
</ResponseField>

<ResponseField name="bankWarning" type="boolean">
  True when the last payout was refused because the bank could not confirm the account holder name. Shows a fix-or-confirm choice; confirming re-emits withdrawalRequested with acknowledgeBankWarning set. Set this back to false when handling each withdrawalRequested — the choice appears on the change to true, so a flag left true hides every later refusal. Defaults to `false`.
</ResponseField>

<ResponseField name="createdMethodId" type="string">
  The most recently created method, selected when it appears in methods. Defaults to `""`.
</ResponseField>

<ResponseField name="plaidUnavailable" type="boolean">
  Set when the payer backed out of Plaid Link or it failed to open. Unlocks manual entry on a rail that otherwise requires linking. Defaults to `false`.
</ResponseField>

<ResponseField name="linkingBank" type="boolean">
  Whether a bank link is in progress — the Plaid session is open, or the linked method is being saved. Defaults to `false`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onAmountChanged`

The amount changed and should be repriced.

**Signature:** `((payload: { amount: number; }) => void)`

### `onCountryChanged`

The add-method country changed and supported methods should be refreshed.

**Signature:** `((payload: { country: string; }) => void)`

### `onSupportedMethodChanged`

A supported payout method was selected and its exact required fields should be loaded.

**Signature:** `((payload: { country: string; supportedPayoutMethodId: string; destinationCurrency: string; }) => void)`

### `onAddMethodRequested`

The payer submitted the dynamic add-payout-method form.

**Signature:** `((payload: WithdrawalCreateMethodInput) => void)`

### `onPlaidLinkRequested`

The payer chose to link their bank through Plaid instead of typing details. Open Plaid Link on receipt.

**Signature:** `((payload: { country: string; supportedPayoutMethodId: string; destinationCurrency: string; }) => void)`

### `onMethodVerificationCompleted`

The newly added payout method finished its verification step.

**Signature:** `((payload: Record<string, never>) => void)`

### `onRenameMethodRequested`

The payer requested to rename a saved payout method.

**Signature:** `((payload: { methodId: string; }) => void)`

### `onRemoveMethodRequested`

The payer requested to remove a saved payout method.

**Signature:** `((payload: { methodId: string; }) => void)`

### `onWithdrawalRequested`

The payer confirmed the final payout details. Create the payout on receipt.

**Signature:** `((payload: WithdrawalRequest) => void)`

### `onDone`

The payer finished reviewing a successful payout.

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

### `mount`

Mounts the element in `target` and starts loading. React components mount themselves.

**Signature:** `(target: string | HTMLElement) => void`

### `destroy`

Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

**Signature:** `() => void`

### `update`

Merges new props into the mounted element. In React, change the component props instead.

**Signature:** `(options: Partial<WithdrawElementProps>) => void`

## Styling

This element doesn't expose class names for styling. Use `appearance` (theme, accent color, variables) to restyle it.
