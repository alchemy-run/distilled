> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# EmailElement

> Collects the buyer's email and passes it to `payments.createConfirmationToken()` while mounted. Explicit `billingDetails.email` wins. A matching Whop account shows optional sign-in with code verification. Successful sign-in unlocks saved payment methods in the payment element. Buyers can continue as guests.

Mounts inside [`Payments`](/elements/upcoming/payments/overview). Pass props and callbacks through the create options or React props.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="payments/email">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Payments, EmailElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Payments /* options */>
                <EmailElement onChange={(e) => console.log(e)} />
              </Payments>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const payments = window.WhopElements().payments.create({ /* options */ });
          payments.create('email', { onChange: (e) => console.log(e) }).mount('#payments-email');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:payments/email" data-whop-elements-version="" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/upcoming/payments/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="label" type="boolean">
  Shows the localized label. Set `false` when supplying your own. The input retains a localized `aria-label`. Defaults to `true`.
</ResponseField>

<ResponseField name="defaultValue" type="string">
  Seed value applied once at mount. Defaults to `""`.
</ResponseField>

<ResponseField name="placeholder" type="string">
  Placeholder text for the email input. Empty (default) renders `you@example.com`. Defaults to `""`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onChange`

Fires when the email changes. `complete` is true when plausible. Sign-in fires it with the signed-in email, which also feeds `createConfirmationToken()`.

**Signature:** `((payload: { email: string; complete: boolean; }) => void)`

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

**Signature:** `(options: Partial<EmailElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                     | Targets                               |
| ------------------------- | ------------------------------------- |
| `.whop-Email`             | Email element root                    |
| `.whop-EmailError`        | Invalid email message                 |
| `.whop-EmailInput`        | The email input                       |
| `.whop-EmailInputInvalid` | Email input with an implausible value |
| `.whop-EmailLabel`        | Email field label                     |
| `.whop-EmailSignedIn`     | Signed-in buyer row                   |
| `.whop-EmailSignIn`       | Welcome back sign-in control          |
| `.whop-EmailSignInError`  | Sign-in error message                 |
| `.whop-EmailSignOut`      | Choose a different email control      |

```ts theme={null}
const payments = whop.payments.create({
  appearance: {
    classes: {
      'whop-Email': { borderRadius: '8px', fontWeight: '600' },
      'whop-EmailError': { borderRadius: '8px', fontWeight: '600' },
      'whop-EmailInput': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

// 9 classes use this shape
payments.update({
  appearance: { classes: { 'whop-Email': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Payments>`. Set it globally with `WhopElements({ appearance })`.
