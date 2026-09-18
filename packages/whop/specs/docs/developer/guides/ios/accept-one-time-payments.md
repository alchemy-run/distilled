> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Accept one-time payments

> Sell physical goods and real-world services with native Apple Pay through Whop (2.7% + $0.30 fees)

<iframe src="https://www.youtube.com/embed/K2e_sht1P1I?rel=0" title="Accept one-time payments on iOS with Whop" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ aspectRatio: "16 / 9", width: "100%", border: 0 }} />

Use `Checkout.ApplePayButton` to accept one-time payments for physical goods or real-world services using Apple Pay. Whop processes payments at **2.7% + \$0.30** instead of Apple's 15–30% in-app purchase fees.

<Tip>
  For web sales, use [checkout links or embedded checkout](/developer/guides/accept-payments) for **100+ payment methods** across **195 countries**.
</Tip>

<Warning>
  **Apple Pay isn't for digital content.** Only use `Checkout.ApplePayButton` if your app sells physical goods (merch, food, hardware) or real-world services (event tickets, deliveries). Apps selling digital content — premium features, subscriptions, in-app currency, content unlocks — must use StoreKit. See the [Apple Pay eligibility](/developer/guides/ios/checkout-reference#apple-pay-eligibility) section for details.
</Warning>

## What you'll build

* A product detail screen with a native Apple Pay button
* A purchase flow that handles success, failure, and cancellation
* Plan configuration in the Whop dashboard for your physical goods

## Prerequisites

* [Install the WhopCheckout SDK](/developer/guides/ios/installation)
* An API key scoped to `iap:read` — see [Create an API key](/developer/guides/ios/installation#step-3-create-an-api-key)
* A Whop product with a one-time plan (see [Step 5](#step-5-set-up-your-plan))

## Step 1: Configure the SDK

Initialize the SDK at app launch. For one-time physical goods you don't need `planMappings` — that's only used for StoreKit fallback on subscriptions.

```swift theme={null}
import SwiftUI
import WhopCheckout

@main
struct DropsApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(Checkout.shared)
                .task {
                    try? await Checkout.shared.configure(
                        // companyId: find in Dashboard URL (starts with biz_)
                        companyId: "biz_xxxxxxxxxxxxxx",
                        // apiKey: create in Dashboard > Developer with iap:read permission
                        apiKey: "your_api_key_here"
                    )
                }
        }
    }
}
```

See the [installation guide](/developer/guides/ios/installation) for the full setup and security notes on the API key.

## Step 2: Add the `Apple Pay` button

Drop `Checkout.ApplePayButton` into your product view. The component renders Apple's official, Human Interface Guidelines-compliant Apple Pay button — you can't substitute a custom-styled button.

```swift theme={null}
import SwiftUI
import WhopCheckout

struct ProductDetailView: View {
    let product: MerchItem
    @State private var purchaseComplete = false

    var body: some View {
        ScrollView {
            // product image, title, price, size picker...

            Checkout.ApplePayButton(
                // planId: find in Dashboard > Products > [product] > Plans
                planId: product.planId,
                label: .buy,
                onCompletion: { result in
                    switch result {
                    case .success(let purchase):
                        // purchase.receiptId, purchase.membership
                        purchaseComplete = true
                    case .failure(let error):
                        print("Purchase failed: \(error.localizedDescription)")
                    }
                }
            )
            .frame(height: 48)
            .padding(.horizontal)
        }
    }
}
```

When the user taps, they get the native Apple Pay sheet. Face ID or double-click confirms, and the payment flows through Whop.

<Info>
  `onCompletion` **isn't called** when the user cancels — the sheet just dismisses. No cleanup needed.
</Info>

## Step 3: Choose a button label

The `label` parameter controls the text on the button. Pick the one that fits the action:

| Label       | Button text          | Use for                                 |
| ----------- | -------------------- | --------------------------------------- |
| `.buy`      | Buy with Apple Pay   | One-time merchandise and physical goods |
| `.checkout` | Check out with…      | Cart-style checkout flows               |
| `.order`    | Order with Apple Pay | Food, deliveries, made-to-order items   |
| `.book`     | Book with Apple Pay  | Reservations, appointments, events      |
| `.continue` | Continue with…       | Multi-step flows where this isn't final |
| `.plain`    | (Apple Pay logo)     | Fallback when no verb fits              |

The full list comes from Apple's `PayWithApplePayButtonLabel` — see [Apple's documentation](https://developer.apple.com/documentation/passkit/paywithapplepaybuttonlabel) for every option.

## Step 4: Handle the purchase result

`onCompletion` receives a `Result<CheckoutPurchaseResult, Error>`. On success you get back:

| Property     | Type                  | Description                                  |
| ------------ | --------------------- | -------------------------------------------- |
| `receiptId`  | `String`              | Unique receipt ID for this purchase          |
| `membership` | `CheckoutMembership?` | The membership Whop created for the purchase |

Use this to show a confirmation screen, kick off shipping, or store the receipt for your own records.

```swift theme={null}
onCompletion: { result in
    switch result {
    case .success(let purchase):
        // Persist the receipt for your fulfillment flow
        OrderStore.shared.record(
            receiptId: purchase.receiptId,
            membershipId: purchase.membership?.id,
            product: product
        )
        showConfirmation = true
    case .failure(let error):
        showError(error.localizedDescription)
    }
}
```

## Step 5: Set up your plan

Each purchasable item needs a plan in your Whop dashboard:

<Steps>
  <Step title="Create a plan">
    Go to your [Dashboard](https://whop.com/dashboard) > Products > select your product > **Plans** > **Create plan**.
  </Step>

  <Step title="Set it to one-time">
    Choose **One-time payment** and set the price.
  </Step>

  <Step title="(Optional) Set inventory limits">
    For limited drops, set a stock cap. The checkout enforces it automatically — when stock runs out, purchases stop.
  </Step>

  <Step title="Copy the plan ID">
    The ID starts with `plan_`. Pass it to `Checkout.ApplePayButton(planId:)`.
  </Step>
</Steps>

## Handle fulfillment with webhooks

<Warning>
  `webhooks.unwrap` is not available in the current `@whop/sdk`. The handler below is kept for reference and will not run as written.
</Warning>

For physical goods, you'll need a server-side webhook to trigger shipping after a successful purchase. Listen for the `payment.succeeded` event:

```typescript theme={null}
import { whopsdk } from "@/lib/whop-sdk";

export async function POST(request: Request) {
  const body = await request.text();
  const headers = Object.fromEntries(request.headers);
  const event = whopsdk.webhooks.unwrap(body, { headers });

  if (event.type === "payment.succeeded") {
    // Trigger your shipping/fulfillment flow
    await fulfillOrder(event.data);
  }

  return new Response("OK", { status: 200 });
}
```

<Info>
  The client-side `onCompletion` callback confirms the payment to the user, but your **server** should handle fulfillment via webhooks — don't rely on the client alone. See the full [webhooks guide](/developer/guides/webhooks) for setup.
</Info>

## Complete example

A minimal merchandise detail view with size selection and Apple Pay:

```swift theme={null}
import SwiftUI
import WhopCheckout

struct ProductDetailView: View {
    let product: MerchItem
    @State private var selectedSize: String?
    @State private var showConfirmation = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                AsyncImage(url: product.imageURL) { image in
                    image.resizable().scaledToFit()
                } placeholder: {
                    Color.gray.opacity(0.1)
                }
                .frame(maxWidth: .infinity)

                Text(product.title)
                    .font(.title)
                    .bold()

                Text(product.price, format: .currency(code: "USD"))
                    .font(.title2)

                // Size picker
                HStack {
                    ForEach(product.sizes, id: \.self) { size in
                        Button(size) {
                            selectedSize = size
                        }
                        .buttonStyle(.bordered)
                        .tint(selectedSize == size ? .accentColor : .secondary)
                    }
                }

                Checkout.ApplePayButton(
                    planId: product.planId,
                    label: .buy,
                    onCompletion: { result in
                        switch result {
                        case .success(let purchase):
                            print("Receipt: \(purchase.receiptId)")
                            showConfirmation = true
                        case .failure(let error):
                            print("Purchase failed: \(error.localizedDescription)")
                        }
                    }
                )
                .frame(height: 48)
                .disabled(selectedSize == nil)
            }
            .padding()
        }
        .sheet(isPresented: $showConfirmation) {
            OrderConfirmationView(product: product, size: selectedSize ?? "")
        }
    }
}
```

## Next steps

<CardGroup cols={2}>
  <Card title="Webhooks" icon="webhook" href="/developer/guides/webhooks">
    Handle payment events and trigger fulfillment
  </Card>

  <Card title="Apple Pay eligibility" icon="shield-check" href="/developer/guides/ios/checkout-reference#apple-pay-eligibility">
    Confirm your app qualifies under App Store Review Guidelines
  </Card>

  <Card title="Build a paywall" icon="credit-card" href="/developer/guides/ios/build-a-paywall">
    Sell subscriptions instead of one-time purchases
  </Card>

  <Card title="API reference" icon="book" href="/developer/guides/ios/checkout-reference">
    Full SDK documentation
  </Card>
</CardGroup>
