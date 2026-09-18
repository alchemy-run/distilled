> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Styling reference

> Stable CSS class names applied to Whop embeddable components

## Overview

The class names below are the **stable styling contract** for Whop embeddable
components. Each name is guaranteed to be applied to a specific element rendered
inside the iframe, so you can target it from `appearance.classes`.

`appearance.classes` accepts any CSS selector string as a key — the value is
emitted verbatim into a stylesheet inside the iframe. That means you can combine
the class names below with any standard CSS selector syntax (`:hover`,
`:focus-visible`, descendant selectors, attribute selectors, etc.). Selectors
that don't match any of the names below will still be emitted, but they're not
part of the stable contract and may stop matching as components evolve.

See [`Appearance`](/sdk/elements/types#appearance) for full configuration.

## Shared

Building blocks reused across multiple elements.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			Chevron: {
				color: "var(--gray-11)",
			},
		},
	},
});
```

| Class           | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `Chevron`       | A shared expand/collapse chevron icon used in breakdown and balance rows. |
| `ConvertButton` | The button to initiate a crypto asset conversion.                         |
| `Icon`          | A step completion icon in the verification navigation.                    |
| `Separator`     | A horizontal divider between address suggestions.                         |

## Address Form

Address form root used by payout-method flows.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			AddressFormRoot: {
				display: "flex",
				flexDirection: "column",
				gap: "12px",
			},
		},
	},
});
```

| Class             | Description                             |
| ----------------- | --------------------------------------- |
| `AddressFormRoot` | The root container of the address form. |

## Auto Withdraw

Automatic withdrawal configuration element.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			AutoWithdrawConfigBody: {
				padding: "16px",
			},
			AutoWithdrawInfoRow: {
				fontSize: "14px",
			},
		},
	},
});
```

| Class                        | Description                                                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `AutoWithdrawConfigBody`     | The main content wrapper of the automatic withdrawal configuration form.                                                            |
| `AutoWithdrawInfoRow`        | An info row displaying a label-value pair in the automatic withdrawal configuration (e.g. Fees, Exchange rate, Estimated delivery). |
| `AutoWithdrawReserveSection` | The section containing the minimum reserve amount input in the automatic withdrawal configuration.                                  |

## Available Cash

Available cash breakdown element.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			AvailableCashBreakdownContainer: {
				padding: "16px",
			},
			AvailableCashSummaryRow: {
				fontWeight: "600",
			},
		},
	},
});
```

| Class                             | Description                                                               |
| --------------------------------- | ------------------------------------------------------------------------- |
| `AvailableCashBreakdownContainer` | The container wrapping available cash breakdown rows.                     |
| `AvailableCashCurrencyRow`        | A currency row in the available cash breakdown.                           |
| `AvailableCashCurrencyRowLeft`    | The left content area of a currency row in the available cash breakdown.  |
| `AvailableCashCurrencyRowRight`   | The right content area of a currency row in the available cash breakdown. |
| `AvailableCashInfoContent`        | The expanded content of the info section in the available cash breakdown. |
| `AvailableCashInfoSection`        | The collapsible information section in the available cash breakdown.      |
| `AvailableCashInfoToggle`         | The toggle button for the info section in the available cash breakdown.   |
| `AvailableCashSummaryRow`         | The summary total row in the available cash breakdown.                    |

## Balance

Single-currency balance element.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			BalanceRoot: {
				padding: "16px",
			},
			BalanceAmount: {
				fontSize: "32px",
				fontWeight: "600",
			},
		},
	},
});
```

| Class                | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `BalanceActions`     | The container for action buttons like withdraw and deposit.         |
| `BalanceAmount`      | The total balance amount display.                                   |
| `BalanceBar`         | The horizontal bar showing the proportion of each balance category. |
| `BalanceBarEmpty`    | The empty state placeholder for the balance bar.                    |
| `BalanceBarSegment`  | A single segment within the balance bar.                            |
| `BalanceHeader`      | The header area containing the title and action buttons.            |
| `BalanceLegend`      | The legend showing the breakdown of balance categories.             |
| `BalanceLegendDot`   | The colored dot indicator in a legend row.                          |
| `BalanceLegendLabel` | The label area of a legend row, including the color dot.            |
| `BalanceLegendRow`   | A single row in the balance legend.                                 |
| `BalanceRoot`        | The root container of the balance element.                          |
| `BalanceTitleGroup`  | The group containing the balance label and amount.                  |

## Balances

Multi-currency balances element.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			BalancesRoot: {
				padding: "16px",
			},
			BalancesSectionTitle: {
				fontSize: "14px",
				fontWeight: "600",
			},
		},
	},
});
```

| Class                     | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| `BalancesBreakdownLabel`  | The label of a breakdown detail row.                                  |
| `BalancesBreakdownRow`    | An expanded breakdown detail row within a currency.                   |
| `BalancesBuyAssetRow`     | A treasury asset row (Bitcoin, Gold, etc.).                           |
| `BalancesCardsBanner`     | A promotional banner for setting up business cards.                   |
| `BalancesCardsRow`        | The cards spending power row.                                         |
| `BalancesCashRow`         | A currency row in the cash section.                                   |
| `BalancesCurrencyFlag`    | The country flag icon displayed next to a currency.                   |
| `BalancesEmptyState`      | The empty state shown when no balances exist.                         |
| `BalancesExpandablePanel` | An expandable panel for showing breakdown details in balance rows.    |
| `BalancesRoot`            | The root container of the balances element.                           |
| `BalancesRowBalance`      | The balance amount column in a balances row.                          |
| `BalancesRowChevron`      | The expand/collapse chevron column in a balances row.                 |
| `BalancesRowName`         | The name column in a balances row.                                    |
| `BalancesRowYield`        | The yield/APY column in a balances row.                               |
| `BalancesSection`         | A section card grouping related balance rows (Cash, Treasury, Cards). |
| `BalancesSectionBody`     | The body content area of a balances section.                          |
| `BalancesSectionTitle`    | The title header of a balances section.                               |
| `BalancesTreasuryRow`     | The treasury balance row.                                             |

## Breakdown

Generic breakdown layout primitives shared across breakdown elements.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			BreakdownItem: {
				padding: "12px 0",
			},
			BreakdownDivider: {
				borderColor: "var(--gray-5)",
			},
		},
	},
});
```

| Class                   | Description                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| `BreakdownDivider`      | A horizontal divider line within the withdrawal breakdown detail view. |
| `BreakdownItem`         | A single line item within a breakdown list.                            |
| `PendingBreakdownRoot`  | The root container of the pending balance breakdown.                   |
| `TreasuryBreakdownRoot` | The root container of the treasury breakdown.                          |

## Dialog

Modal dialog primitives shared across elements.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			DialogContent: {
				borderRadius: "12px",
			},
			DialogTitle: {
				fontSize: "18px",
				fontWeight: "600",
			},
		},
	},
});
```

| Class               | Description                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| `DialogBody`        | The main content area of a dialog.                                            |
| `DialogClose`       | A wrapper that closes the dialog when clicked.                                |
| `DialogCloseButton` | The icon button used to dismiss a dialog.                                     |
| `DialogContent`     | The content panel of a dialog.                                                |
| `DialogFooter`      | The footer area of a dialog, typically containing action buttons.             |
| `DialogHeader`      | The header area of a dialog, typically containing the title and close button. |
| `DialogRoot`        | The root container of a dialog overlay.                                       |
| `DialogTitle`       | The title text of a dialog.                                                   |

## Field

Form field primitives (label, error, description).

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			FieldLabel: {
				fontSize: "14px",
				fontWeight: "500",
			},
			FieldError: {
				color: "var(--red-11)",
			},
		},
	},
});
```

| Class              | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `FieldDescription` | Helper text displayed below a form field.                                              |
| `FieldError`       | The validation error message displayed below a form field.                             |
| `FieldLabel`       | The label text associated with a form field.                                           |
| `FieldRoot`        | The root container of a form field, wrapping the label, input, description, and error. |

## Fieldset

Fieldset primitives for grouped fields.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			FieldsetLegend: {
				fontSize: "14px",
				fontWeight: "600",
			},
			FieldsetGroup: {
				display: "flex",
				flexDirection: "column",
				gap: "12px",
			},
		},
	},
});
```

| Class            | Description                                               |
| ---------------- | --------------------------------------------------------- |
| `FieldsetGroup`  | A group of fields within a fieldset.                      |
| `FieldsetLegend` | The legend (title) of a fieldset group.                   |
| `FieldsetRoot`   | The root container grouping related form fields together. |

## Input

Text input primitives.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			InputRoot: {
				borderRadius: "8px",
				border: "1px solid var(--gray-7)",
			},
			Input: {
				padding: "8px 12px",
			},
		},
	},
});
```

| Class       | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| `Input`     | The text input element.                                                         |
| `InputRoot` | The outer container wrapping the input element and its slots.                   |
| `InputSlot` | A slot within the input root for icons or other adornments alongside the input. |

## Payout Details

Payout method details card.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			PayoutDetailsCard: {
				padding: "16px",
				borderRadius: "12px",
			},
			PayoutDetailsRow: {
				fontSize: "14px",
			},
		},
	},
});
```

| Class                  | Description                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `PayoutDetailsCard`    | The bordered card containing payout detail sections in the edit payout details modal.                   |
| `PayoutDetailsContent` | The content wrapper of the edit payout details modal.                                                   |
| `PayoutDetailsRow`     | A single section row within the payout details card (e.g. Bank details, Mailing address, Phone number). |

## Payout Method

Payout method form.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			PayoutMethodForm: {
				display: "flex",
				flexDirection: "column",
				gap: "16px",
			},
		},
	},
});
```

| Class              | Description                              |
| ------------------ | ---------------------------------------- |
| `PayoutMethodForm` | The form for adding a new payout method. |

## Pending

Pending breakdown element.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			PendingCurrencySection: {
				padding: "12px 0",
			},
			PendingSummaryRow: {
				fontWeight: "600",
			},
		},
	},
});
```

| Class                     | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `PendingCurrencyRow`      | A currency row in the pending breakdown.                                |
| `PendingCurrencyRowLeft`  | The left content area of a currency row in the pending breakdown.       |
| `PendingCurrencyRowRight` | The right content area of a currency row in the pending breakdown.      |
| `PendingCurrencySection`  | A currency section group in the pending breakdown.                      |
| `PendingIndentedRow`      | An indented sub-row within the pending breakdown.                       |
| `PendingIndentedRowRight` | The right content area of an indented sub-row in the pending breakdown. |
| `PendingInfoContent`      | The expanded content of the info section in the pending breakdown.      |
| `PendingInfoSection`      | The collapsible information section in the pending breakdown.           |
| `PendingInfoToggle`       | The toggle button for the info section in the pending breakdown.        |
| `PendingSummaryRow`       | The summary total row in the pending breakdown.                         |

## Phone

Phone input primitive.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			PhoneInput: {
				borderRadius: "8px",
			},
		},
	},
});
```

| Class        | Description                                        |
| ------------ | -------------------------------------------------- |
| `PhoneInput` | A phone number input with a country code selector. |

## Receipt

Generated withdrawal receipt header.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			ReceiptHeader: {
				padding: "16px",
				borderBottom: "1px solid var(--gray-5)",
			},
		},
	},
});
```

| Class           | Description                                  |
| --------------- | -------------------------------------------- |
| `ReceiptHeader` | The header of the withdrawal receipt dialog. |

## Reserve

Reserve breakdown element.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			ReserveCurrencyRow: {
				padding: "8px 0",
			},
		},
	},
});
```

| Class                | Description                              |
| -------------------- | ---------------------------------------- |
| `ReserveCurrencyRow` | A currency row in the reserve breakdown. |

## Select

Select / dropdown primitives.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			SelectTrigger: {
				borderRadius: "8px",
				padding: "8px 12px",
			},
			SelectPopup: {
				borderRadius: "8px",
			},
		},
	},
});
```

| Class                 | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `SelectArrow`         | The arrow pointer on the custom select popup.                             |
| `SelectBackdrop`      | The overlay backdrop behind an open custom select dropdown.               |
| `SelectChevron`       | The dropdown chevron icon inside a custom select trigger.                 |
| `SelectGroup`         | A group of related items within a custom select.                          |
| `SelectGroupLabel`    | The label for a group of items within a custom select.                    |
| `SelectIcon`          | The dropdown indicator icon in a custom select trigger.                   |
| `SelectItem`          | An individual option within a custom select dropdown.                     |
| `SelectItemIndicator` | The checkmark or indicator shown on the selected item.                    |
| `SelectItemText`      | The text label of a custom select item.                                   |
| `SelectList`          | The scrollable list container inside a custom select popup.               |
| `SelectOption`        | An option within a native select element.                                 |
| `SelectPopup`         | The floating dropdown panel of a custom select.                           |
| `SelectPortal`        | The portal container for a custom select dropdown.                        |
| `SelectPositioner`    | The positioning wrapper for the custom select popup.                      |
| `SelectRoot`          | The root container of a native select element.                            |
| `SelectScrollDown`    | The scroll-down indicator shown when the custom select list overflows.    |
| `SelectScrollUp`      | The scroll-up indicator shown when the custom select list overflows.      |
| `SelectSeparator`     | A visual divider between groups of items in a custom select.              |
| `SelectTrigger`       | The button that opens a custom select dropdown.                           |
| `SelectValue`         | The display text showing the currently selected value in a custom select. |

## Status Banner

Account status banner element.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			StatusBannerRoot: {
				padding: "16px",
				borderRadius: "8px",
			},
			StatusBannerCallout: {
				fontWeight: "600",
			},
		},
	},
});
```

| Class                        | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `StatusBannerAction`         | The action button within a status banner callout.            |
| `StatusBannerApproved`       | The approval confirmation banner.                            |
| `StatusBannerApprovedAction` | The action button in the approval banner.                    |
| `StatusBannerApprovedIcon`   | The icon in the approval banner.                             |
| `StatusBannerApprovedText`   | The text content in the approval banner.                     |
| `StatusBannerAwaitingReview` | The awaiting review status banner.                           |
| `StatusBannerBadgeGroup`     | A group of status badges within a banner.                    |
| `StatusBannerCallout`        | A callout banner displaying account status information.      |
| `StatusBannerDismiss`        | The dismiss button to close a status banner.                 |
| `StatusBannerHourglassIcon`  | The hourglass icon in the awaiting review banner.            |
| `StatusBannerInfoContent`    | The content area of the information required banner.         |
| `StatusBannerInfoRequired`   | The information required status banner.                      |
| `StatusBannerPendingContent` | The content area of a pending status banner.                 |
| `StatusBannerRoot`           | The root container of the status banner element.             |
| `StatusBannerWarningIcon`    | The warning icon in a status banner.                         |
| `StatusBannerWarningImage`   | The warning illustration in the information required banner. |

## Treasury

Treasury breakdown element.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			TreasuryAssetRow: {
				padding: "12px 0",
			},
			TreasurySummaryRow: {
				fontWeight: "600",
			},
		},
	},
});
```

| Class                  | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `TreasuryAssetIconSvg` | The icon for a treasury asset.                                      |
| `TreasuryAssetRow`     | An asset row in the treasury breakdown.                             |
| `TreasuryAssetRowLeft` | The left content area of a treasury asset row.                      |
| `TreasuryIndentedRow`  | An indented sub-row within the treasury breakdown.                  |
| `TreasuryInfoContent`  | The expanded content of the info section in the treasury breakdown. |
| `TreasuryInfoSection`  | The collapsible information section in the treasury breakdown.      |
| `TreasuryInfoToggle`   | The toggle button for the info section in the treasury breakdown.   |
| `TreasurySummaryRow`   | The summary total row in the treasury breakdown.                    |

## Verify

Account verification flow.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			VerifyLayout: {
				display: "grid",
				gap: "16px",
			},
			VerifyHeader: {
				fontSize: "20px",
				fontWeight: "600",
			},
		},
	},
});
```

| Class            | Description                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `VerifyAside`    | The sidebar navigation area of the verification flow.                                         |
| `VerifyContent`  | The content column wrapper of the verification flow, containing step views and the footer.    |
| `VerifyFooter`   | The footer area with navigation buttons in the verification flow.                             |
| `VerifyHeader`   | The header area of the verification flow.                                                     |
| `VerifyInfoForm` | The additional information form within the verification flow.                                 |
| `VerifyLayout`   | The main flex layout container holding the sidebar and content area of the verification flow. |
| `VerifyNav`      | The step navigation list in the verification sidebar.                                         |
| `VerifyNavItem`  | A single step item in the verification navigation.                                            |

## Withdraw

Withdraw flow element and currency picker.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			WithdrawFormRoot: {
				padding: "16px",
			},
			WithdrawHeader: {
				fontSize: "18px",
				fontWeight: "600",
			},
		},
	},
});
```

| Class                      | Description                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `WithdrawCreateTokenPanel` | The panel containing the create payout token form within the withdrawal view.                                    |
| `WithdrawCurrencyInfo`     | The currency detail text in a withdrawal currency row.                                                           |
| `WithdrawCurrencyList`     | The currency picker list in the withdrawal flow.                                                                 |
| `WithdrawCurrencyRow`      | A single currency option in the withdrawal currency picker.                                                      |
| `WithdrawCurrencyRowLeft`  | The left content area of a withdrawal currency row.                                                              |
| `WithdrawFormPanel`        | The main form panel within the withdrawal request view.                                                          |
| `WithdrawFormRoot`         | The root container of the withdrawal request form.                                                               |
| `WithdrawHeader`           | The header of the withdrawal dialog.                                                                             |
| `WithdrawInfoRow`          | An info row displaying a label-value pair in the withdrawal form (e.g. Fees, Exchange rate, Estimated delivery). |
| `WithdrawSpeedFooter`      | The footer area of the withdrawal speed selector.                                                                |
| `WithdrawSpeedFooterText`  | The footer description text of the withdrawal speed selector.                                                    |
| `WithdrawSpeedHeader`      | The header of a withdrawal speed option.                                                                         |
| `WithdrawSpeedPrimary`     | The primary label of a withdrawal speed option.                                                                  |
| `WithdrawSpeedRoot`        | The root container of the withdrawal speed selector.                                                             |
| `WithdrawSpeedSecondary`   | The secondary description of a withdrawal speed option.                                                          |
| `WithdrawSpeedText`        | The text container within a withdrawal speed option.                                                             |

## Withdrawals

Withdrawals history table.

```typescript theme={null}
new WhopElements({
	appearance: {
		classes: {
			WithdrawalsRow: {
				borderBottom: "1px solid var(--gray-5)",
			},
			"WithdrawalsRow:hover": {
				backgroundColor: "var(--gray-2)",
			},
		},
	},
});
```

| Class                        | Description                                                               |
| ---------------------------- | ------------------------------------------------------------------------- |
| `WithdrawalsAmountCell`      | The amount column cell in the withdrawals table.                          |
| `WithdrawalsArrivalCell`     | The estimated arrival column cell in the withdrawals table.               |
| `WithdrawalsBody`            | The body section of the withdrawals table.                                |
| `WithdrawalsCell`            | A data cell in the withdrawals table.                                     |
| `WithdrawalsDateCell`        | The date column cell in the withdrawals table.                            |
| `WithdrawalsDestinationCell` | The destination column cell in the withdrawals table.                     |
| `WithdrawalsFooter`          | The footer area of the withdrawals table, containing pagination controls. |
| `WithdrawalsHeaderCell`      | A column header cell in the withdrawals table.                            |
| `WithdrawalsNoteCell`        | The creator-notes column cell in the withdrawals table.                   |
| `WithdrawalsReceiptCell`     | The receipt column cell in the withdrawals table.                         |
| `WithdrawalsRow`             | A row in the withdrawals table representing a single withdrawal.          |
| `WithdrawalsStatusCell`      | The status column cell in the withdrawals table.                          |
