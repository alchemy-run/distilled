> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a wallet session

> Manages authentication and creates wallet elements.

## Overview

Manages authentication and creates wallet elements.

The WalletSession handles token management, element creation, and provides
convenience methods for showing wallet elements in modals.

For v1, mint the token via the existing `whop.accessTokens.create({ company_id })` flow —
the same backend mutation that powers `PayoutsSession`. No new mutation is required.

## Examples

### Basic usage

```typescript theme={null}
const session = whopElements.createWalletSession({
  companyId: "biz_xxx",
  token: async () => {
    const response = await fetch("/api/wallet-token");
    const data = await response.json();
    return data.token;
  },
});

session.on("ready", () => {
  console.log("Wallet session is ready");
});
```

## Options

| Property    | Type                  | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`     | `Token \| GetToken`   | Yes      | -       | The token to use for the session. If a function is provided, it will be called and awaited to get the token. When a function is provided, the token will be refreshed automatically before it expires.  if a string is provided, it will be used as the token and not refreshed automatically. However you can update the token at runtime by calling 'updateOptions' with a new token.  For v1, mint this token from your backend with the existing 'whop.accessTokens.create({ company_id })' call — the same approach used by 'PayoutsSession'. A dedicated 'wallet:\*' scope set is on the roadmap. |
| `companyId` | `string`              | Yes      | -       | The company ID that owns the wallet.  Accepts a 'biz\_\*' ID. The wallet's underlying ledger account is resolved server-side from this value. (A polymorphic 'ledger\_account\_id' parameter is on the roadmap once 'wallet:session:create' ships.)                                                                                                                                                                                                                                                                                                                                                     |
| `currency`  | `string \| undefined` | No       | "USD"   | The currency to format display amounts in.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## Events

Events emitted by the WalletSession.

Listen to these events using the `on()` method.

### `optionsUpdated`

Emitted when the session options are updated via `updateOptions()`.

**Callback signature:** (options: `ExpandedWalletSessionOptions`) => void

### `tokenRefreshed`

Emitted when the authentication token is refreshed.

**Callback signature:** (token: `string`) => void

### `tokenRefreshError`

Emitted when token refresh fails.

**Callback signature:** (error: `unknown`) => void

### `error`

Emitted when an error occurs during session operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the session is ready and authenticated.

**Callback signature:** (`void`) => void

## Methods

### `createElement(type, options)`

Create a new element instance.

| Parameter | Type                          | Description                                |
| --------- | ----------------------------- | ------------------------------------------ |
| `type`    | T \| \{ type: T; }            | The element type (e.g., "deposit-element") |
| `options` | WalletSessionElements\[T]\[0] | Element-specific configuration options     |

**Returns:** `WalletSessionElements[T][1]`

```typescript theme={null}
const element = session.createElement("deposit-element", {
  onDeposit: () => console.log("Deposit flow finished"),
});
element.mount("#container");
```

### `updateOptions(options)`

Update the session options after initialization.

Changes will be propagated to all active elements.

| Parameter | Type                           | Description                                      |
| --------- | ------------------------------ | ------------------------------------------------ |
| `options` | Partial\<WalletSessionOptions> | Partial options object with the values to update |

### `destroy()`

Destroy the session and clean up all mounted elements.

Call this when you no longer need the session to free up resources.

### Modal Methods

#### `showDepositModal(options, force)`

Show the deposit element in a modal overlay.

By default, the modal auto-closes on dismiss (`onClose`). `onDeposit` fires
when the user continues past amount entry and keeps the modal open so the
transfer instructions stay visible.
Call `ev.preventDefault()` in the close callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                   | Description                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `options` | [`DepositElementOptions`](/elements/upcoming/wallet/deposit) \| ((modal: ModalContainer) => [`DepositElementOptions`](/elements/upcoming/wallet/deposit)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                     | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`
