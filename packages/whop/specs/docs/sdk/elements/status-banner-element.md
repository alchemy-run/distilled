> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# StatusBannerElement

> A UI element that displays a status banner indicating the user's account verification and compliance status.

## Overview

A UI element that displays a status banner indicating the user's account verification and compliance status.

This element automatically shows relevant banners based on the account status:

* KYC (Know Your Customer) verification status
* Compliance requirements
* Information requests
* Review status

The banner includes actionable buttons that open verification flows when clicked.

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("status-banner-element", {
  onReady: () => {
    console.log("Status banner loaded");
  },
});

// Mount it to a container
element.mount("#status-banner-container");
```

### Custom verify click handling

```typescript theme={null}
const element = session.createElement("status-banner-element", {
  onVerifyClick: (ev) => {
    // Prevent default verify modal
    ev.preventDefault();
    // Show your own verification UI
    showCustomVerificationFlow();
  },
});

element.mount("#status-banner-container");
```

### Listening to banner changes

```typescript theme={null}
const element = session.createElement("status-banner-element", {});

element.on("bannerChange", (ev, bannerType) => {
  if (bannerType === "kyc-success") {
    showSuccessNotification("Verification complete!");
  } else if (bannerType === null) {
    console.log("No issues - account in good standing");
  }
});

element.on("snapshot", (snapshot) => {
  console.log("Current banner type:", snapshot.bannerType);
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("status-banner-element", {
  onReady: (element) => {
    console.log("Status banner is ready");
  },
  onVerifyClick: (ev) => {
    // Custom verification flow
    ev.preventDefault();
    openCustomVerificationModal();
  },
  onBannerChange: (ev, bannerType) => {
    console.log("Banner changed to:", bannerType);
  },
});
```

## Events

Events emitted by the StatusBannerElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `StatusBannerElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`StatusBannerElementOptions`](#statusbannerelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`StatusBannerElementSnapshot`](#statusbannerelementsnapshot)) => void

### `verifyClick`

Emitted when the user clicks the verify button on the banner.
By default, opens the verification modal. Call `ev.preventDefault()` to handle this yourself.

**Callback signature:** (ev: `CustomEvent`\<`StatusBannerElement`>) => void

### `bannerChange`

Emitted when the banner type changes (e.g., after verification status updates).

**Callback signature:** (ev: `CustomEvent`\<`StatusBannerElement`>, bannerType: `StatusBannerType`) => void

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

| Parameter | Type                                                                    | Description                                      |
| --------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`StatusBannerElementOptions`](#statusbannerelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`StatusBannerElementSnapshot`](#statusbannerelementsnapshot)

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

### StatusBannerElementOptions

Configuration options for the StatusBannerElement.

| Property         | Type                                                                                          | Required | Default | Description                                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `onReady`        | `((element: StatusBannerElement) => void) \| undefined`                                       | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                           |
| `onVerifyClick`  | `((ev: CustomEvent<StatusBannerElement>) => void) \| undefined`                               | No       | -       | Callback fired when the user clicks the verify button on the banner. By default, opens the verification modal. Call 'ev.preventDefault()' to handle this yourself. |
| `onBannerChange` | `((ev: CustomEvent<StatusBannerElement>, bannerType: StatusBannerType) => void) \| undefined` | No       | -       | Callback fired when the banner type changes (e.g., after verification status updates).                                                                             |

### StatusBannerElementSnapshot

Represents the current state of the StatusBannerElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property     | Type                   | Required | Default | Description                                                                                                                                                                          |
| ------------ | ---------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `state`      | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive                                      |
| `bannerType` | `StatusBannerType`     | Yes      | -       | The type of banner currently being displayed. This indicates the user's current verification/compliance status. Will be 'null' if no banner is needed (account is in good standing). |
