> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# BalanceElement

> A UI element that displays the user's current balance including available, pending, and reserve amounts with an optional withdraw button.

## Overview

A UI element that displays the user's current balance including available, pending, and reserve amounts with an optional withdraw button.

This element provides a complete balance overview, including:

* Displaying available, pending, and reserve balance amounts
* Optional withdraw button to initiate withdrawals
* Clickable balance rows that open detailed breakdown modals
* Treasury balance display when enabled

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("balance-element", {
  showWithdrawButton: true,
  onWithdraw: (ev) => {
    console.log("User initiated withdrawal");
  },
});

// Mount it to a container
element.mount("#balance-container");
```

### Listening to events

```typescript theme={null}
const element = session.createElement("balance-element", {
  showWithdrawButton: true,
});

element.on("ready", () => {
  console.log("Balance loaded");
});

element.on("withdraw", (ev) => {
  // Prevent the default withdraw modal from opening
  ev.preventDefault();
  // Handle withdrawal with your own UI
  openCustomWithdrawFlow();
});

element.on("verify", (ev) => {
  console.log("Account verification required");
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("balance-element", {
  showWithdrawButton: true,
  onReady: (element) => {
    console.log("Balance element is ready");
  },
  onWithdraw: (ev) => {
    console.log("User clicked withdraw");
  },
  onVerify: (ev) => {
    console.log("User needs to verify their account");
  },
});
```

## Events

Events emitted by the BalanceElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `BalanceElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`BalanceElementOptions`](#balanceelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`BalanceElementSnapshot`](#balanceelementsnapshot)) => void

### `withdraw`

Emitted when the user clicks the withdraw button.
Call `ev.preventDefault()` to prevent the element from automatically opening the withdraw modal.

**Callback signature:** (ev: `CustomEvent`\<`BalanceElement`>) => void

### `verify`

Emitted when the user needs to verify their account before withdrawing.

**Callback signature:** (ev: `CustomEvent`\<`BalanceElement`>) => void

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

| Parameter | Type                                                          | Description                                      |
| --------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`BalanceElementOptions`](#balanceelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`BalanceElementSnapshot`](#balanceelementsnapshot)

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

### BalanceElementOptions

Configuration options for the BalanceElement.

| Property             | Type                                                       | Required | Default | Description                                                                                                                                                                  |
| -------------------- | ---------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showWithdrawButton` | `boolean \| undefined`                                     | No       | -       | Whether to show the withdraw button within the balance element. When enabled, the user can initiate a withdrawal directly from the balance view.                             |
| `onReady`            | `((element: BalanceElement) => void) \| undefined`         | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                                     |
| `onWithdraw`         | `((ev: CustomEvent<BalanceElement>) => void) \| undefined` | No       | -       | Callback fired when the user clicks the withdraw button. By default, the element will open the withdraw modal. Call 'ev.preventDefault()' to handle the withdrawal yourself. |
| `onVerify`           | `((ev: CustomEvent<BalanceElement>) => void) \| undefined` | No       | -       | Callback fired when the user needs to verify their account before withdrawing.                                                                                               |

### BalanceElementSnapshot

Represents the current state of the BalanceElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
