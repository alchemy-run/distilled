> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatElement

> A UI element that displays a chat interface.

## Overview

A UI element that displays a chat interface.

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("chat-element", {
  channelId: "feed_XXXXXXXXXXXXXX",
  onReady: () => {
    console.log("Chat element is ready");
  },
});

// Mount it to a container
element.mount("#chat-container");
```

### Listening to events

```typescript theme={null}
const element = session.createElement("chat-element", {
  channelId: "feed_XXXXXXXXXXXXXX",
});

element.on("ready", () => {
  console.log("Chat element is ready");
});

element.on("profileClick", (ev) => {
  console.log("Profile clicked:", ev.detail.id);
});

element.on("linkClick", (ev) => {
  console.log("Link clicked:", ev.detail.url);
});

element.on("messageSent", (ev) => {
  console.log("Message sent:", ev.detail.id, ev.detail.content, ev.detail.channelId);
});

element.on("messageDeleted", (ev) => {
  console.log("Message deleted:", ev.detail.id);
});

element.on("experienceClick", (ev) => {
  console.log("Experience clicked:", ev.detail.id);
});

element.mount("#chat-container");
```

```typescript theme={null}
const element = session.createElement("chat-element", {
  channelId: "feed_XXXXXXXXXXXXXX",
  onReady: (element) => {
    console.log("Chat element is ready");
  },
});
```

## Events

Events emitted by the ChatElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `ChatElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`ChatElementOptions`](#chatelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`ChatElementSnapshot`](#chatelementsnapshot)) => void

### `profileClick`

Emitted when the user clicks on a profile.

**Callback signature:** (ev: `CustomEvent`\<\{ id: `string`; }>) => void

### `linkClick`

Emitted when the user clicks on a link.

**Callback signature:** (ev: `CustomEvent`\<\{ url: `string`; }>) => void

### `messageSent`

Emitted when the user sends a message.

**Callback signature:** (ev: `CustomEvent`\<\{ id: `string`; content: `string`; channelId: `string`; }>) => void

### `messageDeleted`

Emitted when the user deletes a message.

**Callback signature:** (ev: `CustomEvent`\<\{ id: `string`; }>) => void

### `experienceClick`

Emitted when the user clicks on an experience mention.

**Callback signature:** (ev: `CustomEvent`\<\{ id: `string`; }>) => void

### `attachmentClick`

Emitted when the user clicks on an attachment.

**Callback signature:** (ev: `CustomEvent`\<\{ messageId: `string`; attachments: `AttachmentClickEventAttachment`\[]; }>) => void

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

| Parameter | Type                                                    | Description                                      |
| --------- | ------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`ChatElementOptions`](#chatelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`ChatElementSnapshot`](#chatelementsnapshot)

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

### ChatElementOptions

Configuration options for the ChatElement.

| Property            | Type                                                                                                                  | Required | Default    | Description                                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `channelId`         | `string`                                                                                                              | Yes      | -          | The ID of the channel, DM, or support chat to connect to.                                                                                |
| `deeplinkToPostId`  | `string \| undefined`                                                                                                 | No       | -          | The ID of the message to deep link to.                                                                                                   |
| `disableNavigation` | `boolean \| undefined`                                                                                                | No       | false      | Disables link navigation. Listen to the 'linkClick' event to handle navigation yourself.                                                 |
| `emptyState`        | `EmptyStateOptions \| undefined`                                                                                      | No       | -          | Custom empty state displayed when there are no messages.                                                                                 |
| `style`             | `"imessage" \| "discord" \| undefined`                                                                                | No       | 'imessage' | The style of the chat.                                                                                                                   |
| `features`          | `{ banUser?: boolean; muteUser?: boolean; previewAttachments?: boolean; mentionExperiences?: boolean; } \| undefined` | No       | -          | Configure which features are available in chat.                                                                                          |
| `onReady`           | `((element: ChatElement) => void) \| undefined`                                                                       | No       | -          | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event. |
| `onEvent`           | `((event: ChatElementEvent) => void) \| undefined`                                                                    | No       | -          | Callback fired when a chat element event is emitted.                                                                                     |

### ChatElementSnapshot

Represents the current state of the ChatElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
