> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# WithdrawButtonElement

> A UI element that renders a button for initiating withdrawals.

## Overview

A UI element that renders a button for initiating withdrawals.

This element provides a convenient one-click withdrawal experience:

* Shows current available balance
* Automatically handles verification if required
* Opens withdrawal modal when clicked
* Supports customizable styling

The button intelligently routes users to verification or withdrawal based on their account status.

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("withdraw-button-element", {
  onWithdrawalRequested: () => {
    console.log("Withdrawal initiated!");
  },
});

// Mount it to a container
element.mount("#withdraw-button-container");
```

### Customized button

```typescript theme={null}
const element = session.createElement("withdraw-button-element", {
  size: "4",
  variant: "solid",
  highContrast: true,
  onWithdrawalRequested: (ev) => {
    console.log("Withdrawal requested!");
  },
});

element.mount("#withdraw-button-container");
```

### Handling verification

```typescript theme={null}
const element = session.createElement("withdraw-button-element", {
  onVerificationSubmitted: (ev) => {
    console.log("User completed verification!");
  },
  onWithdrawalRequested: (ev) => {
    console.log("Withdrawal requested!");
  },
});

// Custom verify handling
element.on("verify", (ev) => {
  ev.preventDefault(); // Handle verification yourself
  showCustomVerificationFlow();
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("withdraw-button-element", {
  size: "3",
  variant: "solid",
  onReady: (element) => {
    console.log("Button is ready");
  },
  onWithdrawalRequested: (ev) => {
    console.log("Withdrawal requested!");
  },
});
```

## Events

Events emitted by the WithdrawButtonElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `WithdrawButtonElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`WithdrawButtonElementOptions`](#withdrawbuttonelementoptions)) => void

### `verify`

Emitted when the user clicks the button and needs to verify their identity first.
By default, opens the verification modal. Call `ev.preventDefault()` to handle this yourself.

**Callback signature:** (ev: `CustomEvent`\<`WithdrawButtonElement`>) => void

### `withdraw`

Emitted when the user clicks the button to initiate a withdrawal.
By default, opens the withdrawal modal. Call `ev.preventDefault()` to handle this yourself.

**Callback signature:** (ev: `CustomEvent`\<`WithdrawButtonElement`>) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`WithdrawButtonElementSnapshot`](#withdrawbuttonelementsnapshot)) => void

### `verificationSubmitted`

Emitted when the user successfully submits verification through the modal opened by this button.

**Callback signature:** (ev: `CustomEvent`\<`WithdrawButtonElement`>) => void

### `withdrawalRequested`

Emitted when the user successfully requests a withdrawal through the modal opened by this button.

**Callback signature:** (ev: `CustomEvent`\<`WithdrawButtonElement`>) => void

## Methods

### `mount(container)`

Mount the element to a DOM container.

The container must be an empty element. The element will be appended as a child.
If the element is already mounted, this method will log a warning and return.

| Parameter   | Type                              | Description                                               |
| ----------- | --------------------------------- | --------------------------------------------------------- |
| `container` | `HTMLElement` \| `#$\{`string`\}` | The container element or a CSS selector starting with '#' |

```typescript theme={null}
// Using a selector
element.mount("#my-container");

// Using an element reference
const container = document.getElementById("my-container");
element.mount(container);
```

### `unmount()`

Remove the element from the DOM and clean up all event listeners.

After unmounting, the element instance should not be reused.
Create a new element instance if you need to mount again.

```typescript theme={null}
// Unmount when done
element.unmount();

// Commonly used in event handlers
element.on("complete", () => {
  element.unmount();
});
```

### `updateOptions(options)`

Update the element's configuration options after creation.

Only the provided options will be updated; other options remain unchanged.
The element will re-render with the new options.

| Parameter | Type                                                                        | Description                                      |
| --------- | --------------------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`WithdrawButtonElementOptions`](#withdrawbuttonelementoptions)> | Partial options object with the values to update |

```typescript theme={null}
// Update a single option
element.updateOptions({
  onComplete: (ev) => {
    console.log("New handler!");
  },
});
```

### `getSnapshot()`

Get the current state snapshot of the element.

The snapshot contains the element's current internal state, such as
loading status, form values, or other element-specific data.

**Returns:** [`WithdrawButtonElementSnapshot`](#withdrawbuttonelementsnapshot)

```typescript theme={null}
const snapshot = element.getSnapshot();
console.log("Current state:", snapshot.state);

// Or listen for changes
element.on("snapshot", (snapshot) => {
  console.log("State changed:", snapshot);
});
```

## Styling

Customize this element with `appearance.classes`. See the [styling reference](/sdk/elements/styling-reference) for the full list of stable class names and example snippets.

## Types

### WithdrawButtonElementOptions

Configuration options for the WithdrawButtonElement.

| Property                  | Type                                                                  | Required | Default | Description                                                                                                                                                                                                                                                                                         |
| ------------------------- | --------------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hidePendingBalance`      | `boolean \| undefined`                                                | No       | false   | Whether to hide the pending balance from the button display.                                                                                                                                                                                                                                        |
| `onReady`                 | `((element: WithdrawButtonElement) => void) \| undefined`             | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                                                                                                                                                            |
| `onVerificationSubmitted` | `((ev: CustomEvent<WithdrawButtonElement>) => void) \| undefined`     | No       | -       | Callback fired when the user successfully submits verification through this button's flow.                                                                                                                                                                                                          |
| `onWithdrawalRequested`   | `((ev: CustomEvent<WithdrawButtonElement>) => void) \| undefined`     | No       | -       | Callback fired when the user successfully requests a withdrawal through this button's flow.                                                                                                                                                                                                         |
| `size`                    | `"1" \| "2" \| "3" \| "4" \| undefined`                               | No       | -       | The size of the button. - '"1"' - Extra small - '"2"' - Small - '"3"' - Medium (default) - '"4"' - Large                                                                                                                                                                                            |
| `variant`                 | `"solid" \| "soft" \| "surface" \| "ghost" \| "classic" \| undefined` | No       | -       | The visual variant of the button. - '"solid"' - Filled background - '"soft"' - Subtle background - '"surface"' - Surface-level emphasis - '"ghost"' - No background - '"classic"' - Traditional button style                                                                                        |
| `color`                   | `AccentColor \| undefined`                                            | No       | -       | The accent color for the button.                                                                                                                                                                                                                                                                    |
| `highContrast`            | `boolean \| undefined`                                                | No       | false   | Whether to use high contrast mode for better accessibility.                                                                                                                                                                                                                                         |
| `showIcon`                | `boolean \| undefined`                                                | No       | false   | Whether to show an icon in the button.                                                                                                                                                                                                                                                              |
| `showCurrencySelector`    | `boolean \| undefined`                                                | No       | -       | When true, the withdrawal modal opened by this button shows a currency picker first. This allows the user to choose which currency to withdraw from when they have balances in multiple currencies. The session's default currency will be omitted so the picker can display all available options. |

### WithdrawButtonElementSnapshot

Represents the current state of the WithdrawButtonElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
