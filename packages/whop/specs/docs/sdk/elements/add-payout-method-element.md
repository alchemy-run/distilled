> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# AddPayoutMethodElement

> A UI element that allows users to add a new payout method (bank account, PayPal, etc.) to their account.

## Overview

A UI element that allows users to add a new payout method (bank account, PayPal, etc.) to their account.

This element handles the complete flow for adding payout methods, including:

* Selecting the payout method type
* Entering account details
* Validating the information
* Saving the payout method

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("add-payout-method-element", {
  onComplete: () => {
    console.log("Payout method added!");
  },
});

// Mount it to a container
element.mount("#payout-method-container");
```

### Using as a modal

```typescript theme={null}
// Show the element in a modal overlay
const modal = session.showAddPayoutMethodModal({
  onComplete: (ev) => {
    ev.preventDefault(); // Prevent auto-close
    showSuccessMessage();
    setTimeout(() => modal.close(), 2000);
  },
});
```

### Listening to events

```typescript theme={null}
const element = session.createElement("add-payout-method-element", {});

element.on("ready", () => {
  console.log("Element loaded");
});

element.on("complete", (ev) => {
  console.log("Success!");
});

element.on("close", (ev) => {
  // Prevent unmount and show confirmation dialog
  ev.preventDefault();
  if (confirm("Are you sure you want to cancel?")) {
    element.unmount();
  }
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("add-payout-method-element", {
  onReady: (element) => {
    console.log("Element is ready");
  },
  onComplete: (ev) => {
    console.log("Payout method added successfully!");
    // Optionally prevent auto-unmount to show a success message
    // ev.preventDefault();
  },
  onClose: (ev) => {
    console.log("User closed the form");
  },
});
```

## Events

Events emitted by the AddPayoutMethodElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `AddPayoutMethodElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`AddPayoutMethodElementOptions`](#addpayoutmethodelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`AddPayoutMethodElementSnapshot`](#addpayoutmethodelementsnapshot)) => void

### `close`

Emitted when the user closes the payout method form without completing it.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`any`>) => void

### `complete`

Emitted when the user successfully adds a new payout method.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`AddPayoutMethodElement`>) => void

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

| Parameter | Type                                                                          | Description                                      |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`AddPayoutMethodElementOptions`](#addpayoutmethodelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`AddPayoutMethodElementSnapshot`](#addpayoutmethodelementsnapshot)

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

### AddPayoutMethodElementOptions

Configuration options for the AddPayoutMethodElement.

| Property     | Type                                                               | Required | Default | Description                                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onReady`    | `((element: AddPayoutMethodElement) => void) \| undefined`         | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                                      |
| `onClose`    | `((ev: CustomEvent) => void) \| undefined`                         | No       | -       | Callback fired when the user closes the form without adding a payout method. By default, the element will unmount when closed. Call 'ev.preventDefault()' to keep it mounted. |
| `onComplete` | `((ev: CustomEvent<AddPayoutMethodElement>) => void) \| undefined` | No       | -       | Callback fired when the user successfully adds a new payout method. By default, the element will unmount after completion. Call 'ev.preventDefault()' to keep it mounted.     |

### AddPayoutMethodElementSnapshot

Represents the current state of the AddPayoutMethodElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
