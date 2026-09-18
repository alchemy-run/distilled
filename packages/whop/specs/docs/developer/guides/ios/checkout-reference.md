> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API Reference

> Complete API documentation for WhopCheckout

This page documents all classes, methods, properties, and types available in the WhopCheckout SDK.

<Info>
  For guides, see [Build a
  Paywall](/developer/guides/ios/build-a-paywall) or [Check
  Entitlements](/developer/guides/ios/check-entitlements).
</Info>

## Checkout

The main class for managing in-app purchases. SwiftUI's environment system can use this `@Observable` class.

```swift theme={null}
@MainActor @Observable
public class Checkout
```

***

### `shared`

The shared Checkout instance. Use this singleton to configure the SDK and manage purchases.

```swift theme={null}
static let shared: Checkout
```

**Example:**

```swift theme={null}
import WhopCheckout

// Configure at app startup
try await Checkout.shared.configure(...)

// Pass through SwiftUI environment
ContentView()
    .environment(Checkout.shared)

// Access in views
@Environment(Checkout.self) var checkout
```

***

### configure(companyId:apiKey:planMappings:)

Configures and initializes the SDK. Call this once at app startup.

```swift theme={null}
func configure(
    companyId: String,
    apiKey: String,
    planMappings: [PlanMapping] = []
) async throws
```

**Parameters:**

| Parameter      | Type            | Description                                                                                                                                                                       |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `companyId`    | `String`        | Your Whop account ID (starts with `biz_`)                                                                                                                                         |
| `apiKey`       | `String`        | Your API key. Give it only the `iap:read` scope — see [Create an API key](/developer/guides/ios/installation#step-3-create-an-api-key) for why this is safe to embed in your app. |
| `planMappings` | `[PlanMapping]` | Mapping of Whop plan IDs to Apple StoreKit product IDs. Pass an empty array if you don't need StoreKit fallback.                                                                  |

**Example:**

```swift theme={null}
try await Checkout.shared.configure(
    companyId: "biz_xxxxxxxxxxxxxx",
    apiKey: "your_api_key_here",
    planMappings: [
        .init(whopId: "plan_xxxxx", appleId: "monthly_sub"),
        .init(whopId: "plan_yyyyy", appleId: "yearly_sub")
    ]
)
```

***

### isInitialized

Indicates whether the SDK has finished initializing.

```swift theme={null}
var isInitialized: Bool { get }
```

**Example:**

```swift theme={null}
if checkout.isInitialized {
    // SDK ready to use
}
```

***

### deviceId

The unique device identifier managed by the SDK. Persists across app launches using the iOS Keychain.

```swift theme={null}
var deviceId: String { get }
```

***

### appUserId

The current user's ID, or `nil` for a guest.

```swift theme={null}
var appUserId: String? { get }
```

***

### `plans`

Array of available subscription plans for the configured products.

```swift theme={null}
var plans: [CheckoutPlan] { get }
```

**Example:**

```swift theme={null}
ForEach(checkout.plans) { plan in
    Text(plan.title ?? "Plan")
}
```

***

### `memberships`

Array of active memberships for the current user or device.

```swift theme={null}
var memberships: [CheckoutMembership] { get }
```

***

### `isSubscribed`

Whether the user has any active membership.

```swift theme={null}
var isSubscribed: Bool { get }
```

**Example:**

```swift theme={null}
if checkout.isSubscribed {
    // Show premium content
}
```

***

### `supportsExternalPurchases`

Whether the current App Store region supports external (non-StoreKit) purchases. Currently `true` for users in the United States and `false` elsewhere.

```swift theme={null}
var supportsExternalPurchases: Bool { get }
```

When `true`, the SDK defaults to Whop web checkout (lower fees). When `false`, it defaults to StoreKit.

***

### `refreshPlans()`

Refreshes the available plans from the server.

```swift theme={null}
@discardableResult
func refreshPlans() async throws -> [CheckoutPlan]
```

**Returns:** The refreshed plans with current pricing.

**Throws:** `WhopCheckoutError` if the refresh fails.

Call this to update pricing or plan availability after initialization. This also updates the `plans` property with the latest data.

**Example:**

```swift theme={null}
// Refresh and use the return value
let plans = try await Checkout.shared.refreshPlans()

// Or just refresh (plans property updates automatically)
try await Checkout.shared.refreshPlans()
```

***

### `hasAccess(to:)`

Checks if the user has access to a specific product.

```swift theme={null}
func hasAccess(to productId: String) -> Bool
```

**Parameters:**

| Parameter   | Type     | Description                                   |
| ----------- | -------- | --------------------------------------------- |
| `productId` | `String` | The product ID to check (starts with `prod_`) |

**Returns:** `true` if the user has an active membership for the product

**Example:**

```swift theme={null}
// Replace with your product ID from the Whop dashboard
if checkout.hasAccess(to: "prod_xxxxxxxxxxxxxx") {
    // Show pro features
}
```

***

### purchase(\_:method:)

Initiates a purchase flow for a plan. By default, uses Whop web checkout in the United States (lower fees) and StoreKit elsewhere.

```swift theme={null}
func purchase(_ whopPlanId: String, method: PaymentMethod? = nil) async throws -> CheckoutPurchaseResult
```

**Parameters:**

| Parameter    | Type             | Description                                            |
| ------------ | ---------------- | ------------------------------------------------------ |
| `whopPlanId` | `String`         | The Whop plan ID to purchase (starts with `plan_`)     |
| `method`     | `PaymentMethod?` | Override the payment method. Defaults based on region. |

**Returns:** `CheckoutPurchaseResult` containing the receipt ID and membership information

**Throws:**

* `WhopCheckoutError.cancelled` if the user dismisses the checkout
* `WhopCheckoutError.notConfigured` if the SDK isn't configured
* `WhopCheckoutError.paymentFailed(String)` if the payment fails

**Example:**

```swift theme={null}
do {
    // Use default payment method (Whop in US, StoreKit elsewhere)
    let result = try await checkout.purchase("plan_xxxxxxxxxxxxxx")
    print("Success! Receipt: \(result.receiptId)")
} catch WhopCheckoutError.cancelled {
    // User cancelled
} catch {
    // Handle error
}

// Or explicitly choose a payment method
let result = try await checkout.purchase("plan_xxx", method: .storeKit)
```

<Info>
  For Apple Pay, use [`Checkout.ApplePayButton`](#checkoutapplepaybutton), or
  [`presentApplePay(_:)`](#presentapplepay) when your UI triggers Apple Pay
  from a custom interaction.
</Info>

***

### logIn(appUserId:)

Logs in a user and claims any unclaimed memberships associated with the device.

```swift theme={null}
func logIn(appUserId: String) async throws
```

**Parameters:**

| Parameter   | Type     | Description                                             |
| ----------- | -------- | ------------------------------------------------------- |
| `appUserId` | `String` | Your app's user ID (shouldn't change for the same user) |

**Example:**

```swift theme={null}
try await checkout.logIn(appUserId: "user_123")
```

***

### `logOut()`

Logs out the current user and clears their memberships from the local state.

```swift theme={null}
func logOut()
```

**Example:**

```swift theme={null}
checkout.logOut()
```

***

### `restorePurchases()`

Restores purchases from both StoreKit and Whop.

```swift theme={null}
func restorePurchases() async throws -> Bool
```

**Returns:** `true` if the SDK found an active subscription

**Example:**

```swift theme={null}
Button("Restore Purchases") {
    Task {
        let restored = try await checkout.restorePurchases()
        if restored {
            print("Purchases restored!")
        }
    }
}
```

***

## Types

### `CheckoutPurchaseResult`

The result of a successful purchase.

```swift theme={null}
struct CheckoutPurchaseResult {
    let receiptId: String
    let membership: CheckoutMembership?
}
```

| Property     | Type                  | Description                             |
| ------------ | --------------------- | --------------------------------------- |
| `receiptId`  | `String`              | The unique receipt ID for this purchase |
| `membership` | `CheckoutMembership?` | The membership created by this purchase |

<Accordion title="When's membership nil?">
  The `membership` property depends on the payment method used:

  | Payment Method    | Region     | `membership` value    |
  | ----------------- | ---------- | --------------------- |
  | Whop web checkout | US         | Populated immediately |
  | StoreKit          | Outside US | `nil` initially       |

  **Why StoreKit purchases return nil:**
  StoreKit transactions are processed asynchronously by Apple. When the purchase completes, the SDK may not yet have the Whop membership synced. The SDK also tracks StoreKit entitlements, so `checkout.isSubscribed` will still return `true`.

  **How to handle both cases:**

  ```swift theme={null}
  do {
      let result = try await checkout.purchase("plan_xxx")

      // Always check isSubscribed - works for both payment methods
      if checkout.isSubscribed {
          // Grant access
      }

      // Optionally use membership details if available
      if let membership = result.membership {
          print("Membership ID: \(membership.id)")
          print("Expires: \(membership.expiresAt?.formatted() ?? "N/A")")
      }
  } catch WhopCheckoutError.cancelled {
      // User cancelled
  }
  ```

  **Key point:** Don't rely on `membership` being non-nil to grant access. Always use `checkout.isSubscribed` or `checkout.hasAccess(to:)` to check subscription status.
</Accordion>

***

### `PlanMapping`

A mapping between a Whop plan and an Apple StoreKit product, used during SDK configuration. This tells the SDK which Apple product to use for StoreKit purchases outside the United States.

<Info>
  **PlanMapping vs CheckoutPlan:** `PlanMapping` is for SDK configuration
  (mapping IDs). `CheckoutPlan` is what you display in your UI (has pricing,
  titles, etc.). You create `PlanMapping` objects in `configure()`, then access
  `CheckoutPlan` objects via `checkout.plans`.
</Info>

```swift theme={null}
struct PlanMapping: Sendable {
    let whopId: String
    let appleId: String

    init(whopId: String, appleId: String)
}
```

| Property  | Type     | Description                                                               |
| --------- | -------- | ------------------------------------------------------------------------- |
| `whopId`  | `String` | The Whop plan ID (e.g., `plan_xxx`)                                       |
| `appleId` | `String` | The Apple product ID from App Store Connect (e.g., `com.yourapp.monthly`) |

**Example:**

```swift theme={null}
// Used in configure() - just maps IDs
try await Checkout.shared.configure(
    companyId: "biz_xxx",
    apiKey: "your_key",
    planMappings: [
        .init(whopId: "plan_monthly", appleId: "com.app.monthly"),
        .init(whopId: "plan_yearly", appleId: "com.app.yearly")
    ]
)

// After configuration, use checkout.plans (CheckoutPlan array) for UI
ForEach(checkout.plans) { plan in  // These are CheckoutPlan objects
    Text(plan.title ?? "Plan")
    Text(plan.whopDisplayPrice)
}
```

<Tip>
  Your Whop plans and Apple products should have matching pricing and billing
  periods. See [Plan mapping configuration](/developer/guides/ios/checkout-reference#planmapping) for details.
</Tip>

***

### `PaymentMethod`

The payment method to use for a purchase.

```swift theme={null}
enum PaymentMethod: Sendable {
    case whop      // Web checkout via Whop (lower fees)
    case storeKit  // StoreKit in-app purchase via the App Store
}
```

| Case       | Description                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `whop`     | Web checkout through Whop. 2.7% + \$0.30 fees (versus Apple's 15-30%). Available in the United States.    |
| `storeKit` | StoreKit in-app purchase through the App Store (15-30% fees). Used as fallback outside the United States. |

<Info>
  Apple Pay isn't included in `PaymentMethod` — it has its own surfaces:
  [`Checkout.ApplePayButton`](#checkoutapplepaybutton) and
  [`presentApplePay(_:)`](#presentapplepay).
</Info>

***

### `Checkout.ApplePayButton`

A pre-built SwiftUI view that renders Apple's official Apple Pay button and handles the entire purchase flow. **You must use this component** (or `PKPaymentButton` / `PayWithApplePayButton`) when offering Apple Pay — custom-styled buttons aren't permitted by Apple's Human Interface Guidelines.

```swift theme={null}
struct ApplePayButton: View {
    init(
        planId: String,
        label: PayWithApplePayButtonLabel = .plain,
        onCompletion: @escaping (Result<CheckoutPurchaseResult, Error>) -> Void
    )
}
```

**Parameters:**

| Parameter      | Type                         | Description                                                                              |
| -------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `planId`       | `String`                     | The Whop plan ID to purchase                                                             |
| `label`        | `PayWithApplePayButtonLabel` | Button label style: `.plain`, `.buy`, `.subscribe`, `.checkout`, `.book`, `.order`, etc. |
| `onCompletion` | `(Result) -> Void`           | Called on success or failure. **Not called** when the user cancels.                      |

**Example:**

```swift theme={null}
Checkout.ApplePayButton(planId: "plan_xxx", label: .subscribe) { result in
    switch result {
    case .success(let purchase):
        print("Receipt: \(purchase.receiptId)")
    case .failure(let error):
        showError(error.localizedDescription)
    }
}
.frame(height: 48)
```

<Warning>
  **Apple Pay isn't for digital content.** Only use `Checkout.ApplePayButton`
  if your app sells physical goods or real-world services. Apps selling digital
  content (subscriptions to premium features, in-app currency, etc.) must use
  StoreKit. See the [Apple Pay eligibility](#apple-pay-eligibility) section
  below.
</Warning>

### `presentApplePay(_:)`

Presents the Apple Pay sheet directly, for UIs that initiate Apple Pay from a custom interaction (for example a slide-to-pay control) instead of the pre-built button.

```swift theme={null}
func presentApplePay(_ planId: String) async throws -> CheckoutPurchaseResult
```

Call it only in direct response to a user interaction — Apple permits presenting a payment sheet only when the user has explicitly asked to pay. Throws `WhopCheckoutError.cancelled` when the user dismisses the sheet.

```swift theme={null}
let result = try await checkout.presentApplePay("plan_xxx")
```

The same [Apple Pay eligibility](#apple-pay-eligibility) rules apply as for `Checkout.ApplePayButton`.

***

### `CheckoutPlan` display model

A subscription plan available for purchase, accessed via `checkout.plans`. Use this for displaying plan information in your UI and for making purchases.

<Info>
  **CheckoutPlan vs Plan:** `CheckoutPlan` contains full plan details (pricing,
  titles, trial info) for your UI. `Plan` is just an ID mapping used during SDK
  configuration. You never create `CheckoutPlan` objects—they come from
  `checkout.plans` after configuration.
</Info>

```swift theme={null}
struct CheckoutPlan: Identifiable {
    let id: String
    let productId: String?
    let title: String?
    let description: String?
    let planType: PlanType
    let billingPeriodDays: Int?
    let baseCurrency: String
    let initialPrice: Double
    let renewalPrice: Double
    let trialPeriodDays: Int?

    var renewalPeriod: RenewalPeriod? { get }
    var whopDisplayPrice: String { get }
    var appleDisplayPrice: String? { get }
}

enum PlanType: String {
    case oneTime = "one_time"
    case renewal
    case unknown
}

enum RenewalPeriod: Equatable {
    case weekly      // 7 days
    case monthly     // 30 days
    case quarterly   // 90 days
    case semiAnnual  // 180 days
    case yearly      // 365 days
    case custom(Int) // Custom period in days
}
```

| Property            | Type             | Description                                                  |
| ------------------- | ---------------- | ------------------------------------------------------------ |
| `id`                | `String`         | The plan ID                                                  |
| `productId`         | `String?`        | The product this plan belongs to                             |
| `title`             | `String?`        | Display name of the plan                                     |
| `description`       | `String?`        | Description text for the plan                                |
| `planType`          | `PlanType`       | Whether this is a one-time or recurring plan                 |
| `billingPeriodDays` | `Int?`           | Number of days in billing cycle (30 = monthly, 365 = yearly) |
| `baseCurrency`      | `String`         | Currency code (e.g., `usd`)                                  |
| `initialPrice`      | `Double`         | Initial price of the plan                                    |
| `renewalPrice`      | `Double`         | Price for renewals                                           |
| `trialPeriodDays`   | `Int?`           | Number of days in trial period                               |
| `renewalPeriod`     | `RenewalPeriod?` | Computed renewal period (`.monthly`, `.yearly`, etc.)        |
| `whopDisplayPrice`  | `String`         | Formatted Whop price (e.g., "\$9.99")                        |
| `appleDisplayPrice` | `String?`        | Localized StoreKit price, if a plan mapping exists           |

***

### `CheckoutMembership`

An active subscription membership.

```swift theme={null}
struct CheckoutMembership: Identifiable {
    let id: String
    let productId: String
    let planId: String
    let status: Status
    let isClaimed: Bool
    let createdAt: Date
    let expiresAt: Date?
    let renewalPeriodEnd: Date?
    let cancelAtPeriodEnd: Bool
    let receiptId: String?

    var isActive: Bool { get }
}

enum Status: String {
    case active
    case canceled
    case canceling
    case completed
    case drafted
    case expired
    case pastDue = "past_due"
    case trialing
    case unresolved
    case unknown
}
```

| Property            | Type      | Description                                                                                               |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `id`                | `String`  | The membership ID                                                                                         |
| `productId`         | `String`  | The product this membership belongs to                                                                    |
| `planId`            | `String`  | The plan this membership is for                                                                           |
| `status`            | `Status`  | Current status of the membership                                                                          |
| `isActive`          | `Bool`    | Whether the membership grants access (true for `active`, `trialing`, `canceling`, `pastDue`, `completed`) |
| `isClaimed`         | `Bool`    | Whether a user has claimed the membership                                                                 |
| `createdAt`         | `Date`    | When Whop created the membership                                                                          |
| `expiresAt`         | `Date?`   | When the membership expires                                                                               |
| `renewalPeriodEnd`  | `Date?`   | End of the current renewal period                                                                         |
| `cancelAtPeriodEnd` | `Bool`    | Whether the membership will cancel at period end                                                          |
| `receiptId`         | `String?` | The receipt ID for this membership                                                                        |

***

### WhopCheckoutError

Errors thrown by the SDK.

```swift theme={null}
enum WhopCheckoutError: Error {
    case cancelled
    case notConfigured
    case paymentFailed(String)
}
```

| Case                    | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `cancelled`             | User dismissed the checkout sheet without completing purchase     |
| `notConfigured`         | SDK isn't configured. Call `Checkout.shared.configure()` first.   |
| `paymentFailed(String)` | Payment failed. The associated string contains the error message. |

***

## `Apple Pay` eligibility

<Warning>
  **Most apps shouldn't use Apple Pay.** Apple Pay via the WhopCheckout SDK is
  only for apps that sell physical goods or real-world services — not digital
  content, subscriptions to app features, or in-app currency.
</Warning>

### `App Store` review guidelines

Apple's [App Store Review Guideline 3.1.1](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase) requires that **digital goods and services** (premium features, subscriptions, content unlocks, virtual currency) must use In-App Purchase (StoreKit). Apple Pay is explicitly prohibited for these transactions.

[Guideline 3.1.3(e)](https://developer.apple.com/app-store/review/guidelines/#multiplatform-services) and the [Apple Pay guidelines](https://developer.apple.com/apple-pay/) permit Apple Pay for purchasing **physical goods and real-world services**.

### Qualifying apps

Apps that **can** use Apple Pay (`Checkout.ApplePayButton`):

| Category              | Examples                                             |
| --------------------- | ---------------------------------------------------- |
| E-commerce            | Clothing, electronics, physical merchandise          |
| Food & delivery       | Meal delivery, grocery orders                        |
| Transportation        | Ride-hailing, car rentals, parking                   |
| Travel & hospitality  | Hotel bookings, flight tickets, event tickets        |
| Professional services | Tutoring sessions, consulting, home repair bookings  |
| Fitness & wellness    | In-person class bookings, personal training sessions |

Apps that **must** use StoreKit (`.storeKit`) or Whop web checkout (`.whop`):

| Category              | Examples                                   |
| --------------------- | ------------------------------------------ |
| Digital subscriptions | Premium app features, pro tiers            |
| Digital content       | E-books, music, video streaming            |
| Virtual goods         | In-app currency, cosmetic items, power-ups |
| Online courses        | Video courses, digital workshops           |
| SaaS features         | Cloud storage upgrades, API access tiers   |

### How to choose

```
Is the user paying for a physical good or real-world service?
├── YES → You can use Checkout.ApplePayButton (or .whop / .storeKit)
└── NO  → You must use .whop or .storeKit (not Apple Pay)
```

If your app qualifies, use `Checkout.ApplePayButton`. If you're unsure whether your app qualifies, default to `.whop` (United States) or `.storeKit` (elsewhere). The SDK handles this automatically when you call `purchase()` without specifying a method.

***

## Requirements

* iOS 17.0+
* Xcode 15.0+
* Swift 5.10+
