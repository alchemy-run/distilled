> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CardFields

> Three separately mountable, PCI-isolated card fields for custom layouts: number, expiration, and security code. Create with `payments.create("cardFields")`, place each field, enable your payment button from `onChange`, and confirm with `payments.createConfirmationToken()`. Card numbers remain in hosted fields.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Payments`](/elements/beta/payments/overview). Create it to get a handle, then mount its elements on that handle. Call `destroy()` to remove the sub-controller and free its slot. Create it again to get a fresh handle.

<Note>**Exclusive.** `CardFields` is an alternative to `PaymentElement` or `CardElement` in this Payments handle. Mount one at a time. Destroy it before mounting another.</Note>

## Preview

A live, interactive demo of this sub-controller's default arrangement with example data:

<div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
  <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

  <div data-whop-demo-native="unit:card-fields" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
</div>

<div data-whop-usage="payments/cardFields">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Payments, CardFields, CardNumberElement, CardExpiryElement, CardCvcElement } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Payments /* options */>
            <CardFields>
              <CardNumberElement />
              <CardExpiryElement />
              <CardCvcElement />
            </CardFields>
          </Payments>
        </WhopElements>
      );
    }
    ```

    ```html JavaScript theme={null}
    <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
    <script type="module">
      const payments = window.WhopElements().payments.create({ /* options */ });
      const cardFields = payments.create('cardFields', { /* options */ });
      cardFields.create('cardNumber').mount('#payments-cardFields-cardNumber');
      cardFields.create('cardExpiry').mount('#payments-cardFields-cardExpiry');
      cardFields.create('cardCvc').mount('#payments-cardFields-cardCvc');
    </script>
    ```
  </CodeGroup>
</div>

## Options

Pass these to `payments.create('cardFields', { … })`, or as props on `<CardFields>` in React. Parent-injected props never appear here.

<ResponseField name="layout" type="&#x22;compact&#x22; | &#x22;stacked&#x22;">
  `stacked` (default) shapes composed fields as a number row above expiration and security code. `compact` shapes one row. Separately mounted fields ignore this layout and render with full borders and rounded corners. Defaults to `"stacked"`.
</ResponseField>

<ResponseField name="publicKey" type="string">
  Advanced Basis Theory publishable key. Omit it to fetch the key automatically.
</ResponseField>

<ResponseField name="networks" type="CardNetworkArt[]">
  The seller's accepted card networks in display order — the matrix card entry's `networks` objects, whose API-served icons drive the number field's brand art. Omit it to fetch alongside the key.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onChange`

Fires when completeness changes. `complete` becomes true after the buyer fills all three fields. Use it to enable confirmation. `brand` is the detected card network. `funding` is the detected funding type (`credit`, `debit`, or `prepaid`), `null` until the number identifies one.

**Signature:** `((payload: { complete: boolean; brand: string; funding: string | null; }) => void)`

## Methods

Call these on the sub handle from `payments.create('cardFields', { … })`.

### `tokenize`

Advanced method that tokenizes the three fields without creating a confirmation token. It emits `tokenized` to the payments controller. Validation errors appear on the failing field, and the method throws. Use `payments.createConfirmationToken()` to confirm a payment.

**Signature:** `(input: { accountId?: string | undefined; }) => Promise<{ token: string; }>`

### `collect`

`payments.createConfirmationToken()` calls this action for `cardFields`. Don't call it directly. It tokenizes the fields and returns the data used to create the confirmation token.

**Signature:** `(input: { billingDetails?: { email?: string | undefined; name?: string | undefined; address?: { country?: string | undefined; line1?: string | undefined; city?: string | undefined; postal_code?: string | undefined; } | undefined; } | undefined; }) => Promise<{ paymentMethod: { type: string; category: string; card: { token: string; }; }; billingDetails: { email: string; name?: string | undefined; address?: { country?: string | undefined; line1?: string | undefined; city?: string | undefined; postal_code?: string | undefined; } | undefined; }; }>`

### `update`

Merges new props and callbacks into the sub-controller.

**Signature:** `(options: Partial<CardFieldsSubOptions>) => void`

### `destroy`

Destroys the sub-controller and its elements, then frees its exclusive slot. A later `create("cardFields")` starts fresh.

**Signature:** `() => void`

## Elements

The elements this sub-controller mounts. Each has its own page:

<CardGroup cols={2}>
  <Card title="CardNumberElement" href="/elements/beta/payments/cardFields-cardNumber">
    PCI-isolated hosted card number field. Card numbers never reach the host page.
  </Card>

  <Card title="CardExpiryElement" href="/elements/beta/payments/cardFields-cardExpiry">
    PCI-isolated hosted card expiration field.
  </Card>

  <Card title="CardCvcElement" href="/elements/beta/payments/cardFields-cardCvc">
    PCI-isolated hosted card security code field.
  </Card>
</CardGroup>
