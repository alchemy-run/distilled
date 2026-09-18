> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SearchElement

> A UI element that allows users to search for messages in a channel, DM, or support chat.

## Overview

A UI element that allows users to search for messages in a channel, DM, or support chat.

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("search-element", {
  onClose: (ev) => {
    console.log("Search element closed");
  },
});

// Mount it to a container
element.mount("#search-container");
```

### Using as a modal

```typescript theme={null}
// Show the element in a modal overlay
const modal = session.showSearchModal({
  channelId: "feed_XXXXXXXXXXXXXX",
  onResultClick: (ev) => {
    console.log("Result clicked!", ev.detail.messageId);
    // Element auto-unmounts by default
  },
});
```

```typescript theme={null}
const element = session.createElement("search-element", {
  channelId: "feed_XXXXXXXXXXXXXX",
  onReady: (element) => {
    console.log("Search element is ready");
  },
});
```

## Events

Events emitted by the SearchElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `SearchElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`SearchElementOptions`](#searchelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`SearchElementSnapshot`](#searchelementsnapshot)) => void

### `close`

Emitted when the user closes the search element.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`any`>) => void

### `resultClick`

Callback fired when the user clicks on a search result.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<\{ messageId: `string`; channelId: `string`; }>) => void

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

| Parameter | Type                                                        | Description                                      |
| --------- | ----------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`SearchElementOptions`](#searchelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`SearchElementSnapshot`](#searchelementsnapshot)

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

### SearchElementOptions

Configuration options for the SearchElement.

| Property        | Type                                                                                  | Required | Default | Description                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `companyId`     | `string \| undefined`                                                                 | No       | -       | The ID of the company to search messages in.                                                                                                                             |
| `channelId`     | `string \| undefined`                                                                 | No       | -       | The ID of the channel, DM, or support chat to search messages in.                                                                                                        |
| `onReady`       | `((element: SearchElement) => void) \| undefined`                                     | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                                 |
| `onClose`       | `((ev: CustomEvent) => void) \| undefined`                                            | No       | -       | Callback fired when the user closes the element. By default, the element will unmount when closed. Call 'ev.preventDefault()' to keep it mounted.                        |
| `onResultClick` | `((ev: CustomEvent<{ messageId: string; channelId: string; }>) => void) \| undefined` | No       | -       | Callback fired when the user clicks on a search result. By default, the element will unmount after the result is clicked. Call 'ev.preventDefault()' to keep it mounted. |

### SearchElementSnapshot

Represents the current state of the SearchElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
