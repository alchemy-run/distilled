> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# WithdrawElement

> A UI element that provides a complete withdrawal form for users to request fund transfers.

## Overview

A UI element that provides a complete withdrawal form for users to request fund transfers.

This element handles the full withdrawal flow, including:

* Displaying available balance
* Selecting withdrawal amount
* Choosing payout method
* Confirming and submitting the withdrawal request

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("withdraw-element", {
  onWithdraw: () => {
    console.log("Withdrawal submitted!");
  },
});

// Mount it to a container
element.mount("#withdraw-container");
```

### Using as a modal

```typescript theme={null}
// Show the withdrawal form in a modal overlay
const modal = session.showWithdrawModal({
  onWithdraw: (ev) => {
    console.log("Withdrawal submitted!");
    // Element auto-unmounts by default
  },
  onClose: (ev) => {
    ev.preventDefault();
    modal.close();
  },
});
```

### Listening to events

```typescript theme={null}
const element = session.createElement("withdraw-element", {});

element.on("ready", () => {
  console.log("Form loaded");
});

element.on("withdraw", (ev) => {
  console.log("Withdrawal submitted!");
  ev.preventDefault(); // Keep mounted
  showSuccessMessage();
});

element.on("close", (ev) => {
  console.log("User cancelled");
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("withdraw-element", {
  onReady: (element) => {
    console.log("Withdrawal form is ready");
  },
  onWithdraw: (ev) => {
    console.log("Withdrawal requested!");
  },
  onClose: (ev) => {
    console.log("User cancelled");
  },
});
```

## Events

Events emitted by the WithdrawElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `WithdrawElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`WithdrawElementOptions`](#withdrawelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`WithdrawElementSnapshot`](#withdrawelementsnapshot)) => void

### `close`

Emitted when the user closes the withdrawal form without completing it.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`any`>) => void

### `withdraw`

Emitted when the user successfully submits a withdrawal request.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`any`>) => void

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

| Parameter | Type                                                            | Description                                      |
| --------- | --------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`WithdrawElementOptions`](#withdrawelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`WithdrawElementSnapshot`](#withdrawelementsnapshot)

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

### WithdrawElementOptions

Configuration options for the WithdrawElement.

| Property               | Type                                                | Required | Default | Description                                                                                                                                                                                                                                                                   |
| ---------------------- | --------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onReady`              | `((element: WithdrawElement) => void) \| undefined` | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                                                                                                                                      |
| `onWithdraw`           | `((ev: CustomEvent) => void) \| undefined`          | No       | -       | Callback fired when the user successfully submits a withdrawal request. By default, the element will unmount after the request. Call 'ev.preventDefault()' to keep it mounted.                                                                                                |
| `onClose`              | `((ev: CustomEvent) => void) \| undefined`          | No       | -       | Callback fired when the user closes the withdrawal form without completing it. By default, the element will unmount when closed. Call 'ev.preventDefault()' to keep it mounted.                                                                                               |
| `showCurrencySelector` | `boolean \| undefined`                              | No       | -       | When true, shows a currency picker before the withdrawal form. This allows the user to choose which currency to withdraw from when they have balances in multiple currencies. The session's default currency will be omitted so the picker can display all available options. |

### WithdrawElementSnapshot

Represents the current state of the WithdrawElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
