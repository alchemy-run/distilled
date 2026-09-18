> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a payouts session

> Manages authentication and creates payout elements.

## Overview

Manages authentication and creates payout elements.

The PayoutsSession handles token management, element creation, and provides
convenience methods for showing elements in modals.

## Examples

### Basic usage

```typescript theme={null}
const session = whopElements.createPayoutsSession({
  token: async () => {
    const response = await fetch("/api/token");
    const data = await response.json();
    return data.token;
  },
  companyId: "your-company-id",
  redirectUrl: "https://yourapp.com/callback",
});

session.on("ready", () => {
  console.log("Session is ready");
});
```

### Creating elements

```typescript theme={null}
const balanceElement = session.createElement("balance-element", {});
balanceElement.mount("#balance-container");

const withdrawButton = session.createElement("withdraw-button-element", {
  onWithdraw: () => console.log("Withdrawal initiated"),
});
withdrawButton.mount("#withdraw-button");
```

### Using modal methods

```typescript theme={null}
// No args — the modal auto-closes on completion or dismiss
session.showWithdrawModal();

// Custom callback — runs your handler, then auto-closes
session.showWithdrawModal({
  onWithdraw: () => console.log("Withdrawal submitted"),
});

// preventDefault() opts out of auto-close
session.showWithdrawModal({
  onWithdraw: (ev) => {
    ev.preventDefault(); // modal stays open
    showConfirmation();
  },
});
```

## Options

| Property      | Type                  | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`       | `Token \| GetToken`   | Yes      | -       | The token to use for the session. If a function is provided, it will be called and awaited to get the token. When a function is provided, the token will be refreshed automatically before it expires.  if a string is provided, it will be used as the token and not refreshed automatically. However you can update the token at runtime by calling 'updateOptions' with a new token. |
| `currency`    | `string \| undefined` | No       | "USD"   | The currency to use in the Elements                                                                                                                                                                                                                                                                                                                                                     |
| `companyId`   | `string`              | Yes      | -       | The company ID to use in the Elements                                                                                                                                                                                                                                                                                                                                                   |
| `redirectUrl` | `string`              | Yes      | -       | URL to redirect to after identity verification is completed. This must be an absolute URL (e.g., "[https://yourapp.com/callback](https://yourapp.com/callback)"). Localhost URLs will not work - use ngrok for local development.                                                                                                                                                       |

## Events

Events emitted by the PayoutsSession.

Listen to these events using the `on()` method.

### `optionsUpdated`

Emitted when the session options are updated via `updateOptions()`.

**Callback signature:** (options: `ExpandedPayoutsSessionOptions`) => void

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

| Parameter | Type                           | Description                                                           |
| --------- | ------------------------------ | --------------------------------------------------------------------- |
| `type`    | T \| \{ type: T; }             | The element type (e.g., "balance-element", "withdraw-button-element") |
| `options` | PayoutsSessionElements\[T]\[0] | Element-specific configuration options                                |

**Returns:** `PayoutsSessionElements[T][1]`

```typescript theme={null}
const element = session.createElement("balance-element", {
  onReady: () => console.log("Element ready"),
});
element.mount("#container");
```

### `updateOptions(options)`

Update the session options after initialization.

Changes will be propagated to all active elements.

| Parameter | Type                            | Description                                      |
| --------- | ------------------------------- | ------------------------------------------------ |
| `options` | Partial\<PayoutsSessionOptions> | Partial options object with the values to update |

### `destroy()`

Destroy the session and clean up all mounted elements.

Call this when you no longer need the session to free up resources.

### Modal Methods

#### `showWithdrawModal(options, force)`

Show the withdraw element in a modal overlay.

By default, the modal auto-closes on completion (`onWithdraw`) or dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                             | Description                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `options` | [`WithdrawElementOptions`](/sdk/elements/withdraw-element#withdrawelementoptions) \| ((modal: ModalContainer) => [`WithdrawElementOptions`](/sdk/elements/withdraw-element#withdrawelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                               | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showAddPayoutMethodModal(options, force)`

Show the add payout method element in a modal overlay.

By default, the modal auto-closes on completion (`onComplete`) or dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                           | Description                                                     |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `options` | [`AddPayoutMethodElementOptions`](/sdk/elements/add-payout-method-element#addpayoutmethodelementoptions) \| ((modal: ModalContainer) => [`AddPayoutMethodElementOptions`](/sdk/elements/add-payout-method-element#addpayoutmethodelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                                                                             | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showAutomaticWithdrawModal(options, force)`

Show the automatic withdraw settings element in a modal overlay.

By default, the modal auto-closes on completion (`onComplete`) or dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                                     | Description                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `options` | [`AutomaticWithdrawElementOptions`](/sdk/elements/automatic-withdraw-element#automaticwithdrawelementoptions) \| ((modal: ModalContainer) => [`AutomaticWithdrawElementOptions`](/sdk/elements/automatic-withdraw-element#automaticwithdrawelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                                                                                       | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showVerifyModal(options, force)`

Show the identity verification element in a modal overlay.

By default, the modal auto-closes on completion (`onVerificationSubmitted`) or dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                 | Description                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `options` | [`VerifyElementOptions`](/sdk/elements/verify-element#verifyelementoptions) \| ((modal: ModalContainer) => [`VerifyElementOptions`](/sdk/elements/verify-element#verifyelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                   | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showWithdrawalBreakdownModal(options, force)`

Show the withdrawal breakdown element in a modal overlay.

By default, the modal auto-closes on dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                                    | Description                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `options` | [`WithdrawalBreakdownElementOptions`](/sdk/elements/withdrawal-breakdown-element#withdrawalbreakdownelementoptions) \| ((modal: ModalContainer) => [`WithdrawalBreakdownElementOptions`](/sdk/elements/withdrawal-breakdown-element#withdrawalbreakdownelementoptions)) | Element options or a callback that receives the modal container. Must include 'withdrawalId'. |
| `force`   | Force \| undefined                                                                                                                                                                                                                                                      | -                                                                                             |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showChangeAccountCountryModal(options, force)`

Show the change account country element in a modal overlay.

By default, the modal auto-closes on completion (`onCountryChanged`) or dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                                                         | Description                                                     |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `options` | [`ChangeAccountCountryElementOptions`](/sdk/elements/change-account-country-element#changeaccountcountryelementoptions) \| ((modal: ModalContainer) => [`ChangeAccountCountryElementOptions`](/sdk/elements/change-account-country-element#changeaccountcountryelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                                                                                                           | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showResetAccountModal(options, force)`

Show the reset account element in a modal overlay.

By default, the modal auto-closes on completion (`onReset`) or dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                       | Description                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `options` | [`ResetAccountElementOptions`](/sdk/elements/reset-account-element#resetaccountelementoptions) \| ((modal: ModalContainer) => [`ResetAccountElementOptions`](/sdk/elements/reset-account-element#resetaccountelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                                                         | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showAvailableCashBreakdownModal(options, force)`

Show the available cash breakdown element in a modal overlay.

By default, the modal auto-closes on dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                                                                     | Description                                                     |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `options` | [`AvailableCashBreakdownElementOptions`](/sdk/elements/available-cash-breakdown-element#availablecashbreakdownelementoptions) \| ((modal: ModalContainer) => [`AvailableCashBreakdownElementOptions`](/sdk/elements/available-cash-breakdown-element#availablecashbreakdownelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                                                                                                                       | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showGenerateWithdrawalReceiptModal(options, force)`

Show the generate withdrawal receipt element in a modal overlay.

By default, the modal auto-closes on completion (`onReceiptRequested`) or dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                                                                          | Description                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `options` | [`GenerateWithdrawalReceiptElementOptions`](/sdk/elements/generate-withdrawal-receipt-element#generatewithdrawalreceiptelementoptions) \| ((modal: ModalContainer) => [`GenerateWithdrawalReceiptElementOptions`](/sdk/elements/generate-withdrawal-receipt-element#generatewithdrawalreceiptelementoptions)) | Element options or a callback that receives the modal container. Must include 'withdrawalId'. |
| `force`   | Force \| undefined                                                                                                                                                                                                                                                                                            | -                                                                                             |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showPendingBreakdownModal(options, force)`

Show the pending breakdown element in a modal overlay.

By default, the modal auto-closes on dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                               | Description                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `options` | [`PendingBreakdownElementOptions`](/sdk/elements/pending-breakdown-element#pendingbreakdownelementoptions) \| ((modal: ModalContainer) => [`PendingBreakdownElementOptions`](/sdk/elements/pending-breakdown-element#pendingbreakdownelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                                                                                 | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showReserveBreakdownModal(options, force)`

Show the reserve breakdown element in a modal overlay.

By default, the modal auto-closes on dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                               | Description                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `options` | [`ReserveBreakdownElementOptions`](/sdk/elements/reserve-breakdown-element#reservebreakdownelementoptions) \| ((modal: ModalContainer) => [`ReserveBreakdownElementOptions`](/sdk/elements/reserve-breakdown-element#reservebreakdownelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                                                                                 | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`

#### `showTreasuryBreakdownModal(options, force)`

Show the treasury breakdown element in a modal overlay.

By default, the modal auto-closes on dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                                                                                                     | Description                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `options` | [`TreasuryBreakdownElementOptions`](/sdk/elements/treasury-breakdown-element#treasurybreakdownelementoptions) \| ((modal: ModalContainer) => [`TreasuryBreakdownElementOptions`](/sdk/elements/treasury-breakdown-element#treasurybreakdownelementoptions)) \| undefined | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                                                                                                       | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`
