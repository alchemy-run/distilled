> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a Paywall

> Display subscription plans and handle purchases in your iOS app

This guide shows you how to build a paywall that displays your subscription plans and handles the purchase flow. By the end, you'll have a working paywall that lets users subscribe to your product.

## What you'll build

* A paywall screen that displays available plans with pricing
* A purchase flow that handles payments through Whop
* Error handling for cancelled or failed purchases

## Prerequisites

* [Install the SDK](/developer/guides/ios/installation)
* A Whop account with at least one product and plan
* An API key scoped to `iap:read` — see [Create an API key](/developer/guides/ios/installation#step-3-create-an-api-key) for setup

<Info>
  The `iap:read` permission is designed for client-side use and only grants access to in-app purchase operations. It's safe to embed in your app bundle. Never ship a key with broader permissions.
</Info>

## Step 1: Configure the SDK

Initialize the SDK in your app's entry point with your API key:

```swift theme={null}
import SwiftUI
import WhopCheckout

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(Checkout.shared)
                .task {
                    try? await Checkout.shared.configure(
                        // companyId: find in Dashboard URL (starts with biz_)
                        companyId: "biz_xxxxxxxxxxxxxx",
                        // apiKey: create in Dashboard > Developer with iap:read permission
                        apiKey: "your_api_key_here",
                        planMappings: [
                            .init(whopId: "plan_xxxxx", appleId: "monthly_sub"),
                            .init(whopId: "plan_yyyyy", appleId: "yearly_sub")
                        ]
                    )
                }
        }
    }
}
```

<Info>
  Find your account ID in the URL of your [Whop
  Dashboard](https://whop.com/dashboard) (starts with `biz_`). Find your plan
  IDs in the Products tab under each plan (starts with `plan_`).
</Info>

## Step 2: Display available plans

Use the `plans` property to show available subscription options:

```swift theme={null}
struct PaywallView: View {
    @Environment(Checkout.self) var checkout

    var body: some View {
        VStack(spacing: 20) {
            Text("Choose a Plan")
                .font(.title)
                .bold()

            ForEach(checkout.plans) { plan in
                PlanCard(plan: plan)
            }
        }
        .padding()
    }
}

struct PlanCard: View {
    let plan: CheckoutPlan
    @Environment(Checkout.self) var checkout

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(plan.title ?? "Plan")
                .font(.headline)

            Text(plan.initialPrice, format: .currency(code: plan.baseCurrency))
                .font(.title2)
                .bold()

            Button("Subscribe") {
                Task {
                    await purchase(plan)
                }
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
        .background(.ultraThinMaterial)
        .cornerRadius(12)
    }

    func purchase(_ plan: CheckoutPlan) async {
        do {
            let result = try await checkout.purchase(plan.id)
            // Purchase successful!
            print("Purchased: \(result.receiptId)")
        } catch WhopCheckoutError.cancelled {
            // User dismissed the checkout
        } catch {
            // Handle other errors
            print("Purchase failed: \(error)")
        }
    }
}
```

## Step 3: Handle the purchase flow

When a user selects **Subscribe**, the SDK automatically:

1. Presents a checkout sheet with the Whop payment flow
2. Handles payment processing
3. Dismisses the sheet when complete
4. Returns the result or throws an error

```swift theme={null}
func purchase(_ planId: String) async {
    do {
        let result = try await checkout.purchase(planId)
        // Success - user now has an active membership
        print("Receipt ID: \(result.receiptId)")
    } catch WhopCheckoutError.cancelled {
        // User dismissed the checkout sheet
    } catch WhopCheckoutError.paymentFailed(let message) {
        // Payment failed - show error to user
        showError(message)
    } catch {
        // Other errors
        showError("Something went wrong. Please try again.")
    }
}
```

## Complete example

Here's a full paywall implementation:

```swift theme={null}
struct PaywallView: View {
    @Environment(Checkout.self) var checkout
    @Environment(\.dismiss) var dismiss
    @State private var selectedPlanId: String?
    @State private var isPurchasing = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 8) {
                        Image(systemName: "crown.fill")
                            .font(.system(size: 48))
                            .foregroundStyle(.yellow)

                        Text("Unlock Premium")
                            .font(.title)
                            .bold()

                        Text("Get access to all features")
                            .foregroundStyle(.secondary)
                    }
                    .padding(.top, 32)

                    // Plans
                    ForEach(checkout.plans) { plan in
                        Button {
                            selectedPlanId = plan.id
                        } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(plan.title ?? "Plan")
                                        .font(.headline)
                                    Text(plan.initialPrice, format: .currency(code: plan.baseCurrency))
                                        .foregroundStyle(.secondary)
                                }
                                Spacer()
                            }
                            .padding()
                            .background(plan.id == selectedPlanId ? Color.accentColor.opacity(0.1) : Color(.secondarySystemBackground))
                            .cornerRadius(12)
                            .overlay {
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(plan.id == selectedPlanId ? Color.accentColor : .clear, lineWidth: 2)
                            }
                        }
                        .buttonStyle(.plain)
                    }

                    // Purchase button
                    Button {
                        guard let planId = selectedPlanId else { return }
                        Task { await purchase(planId) }
                    } label: {
                        Group {
                            if isPurchasing {
                                ProgressView().tint(.white)
                            } else {
                                Text("Continue")
                            }
                        }
                        .font(.headline)
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Color.accentColor, in: RoundedRectangle(cornerRadius: 12))
                    }
                    .disabled(selectedPlanId == nil || isPurchasing)
                    .opacity(selectedPlanId == nil ? 0.5 : 1)
                }
                .padding()
            }
            .navigationTitle("Subscribe")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") { dismiss() }
                }
            }
        }
    }

    func purchase(_ planId: String) async {
        isPurchasing = true
        defer { isPurchasing = false }

        do {
            _ = try await checkout.purchase(planId)
            dismiss()
        } catch WhopCheckoutError.cancelled {
            // User cancelled
        } catch {
            print("Purchase failed: \(error.localizedDescription)")
        }
    }
}
```

## Next steps

<CardGroup cols={2}>
  <Card title="Check Entitlements" icon="shield-check" href="/developer/guides/ios/check-entitlements">
    Learn how to gate content based on subscription status
  </Card>

  <Card title="API Reference" icon="book" href="/developer/guides/ios/checkout-reference">
    Explore all available methods and properties
  </Card>
</CardGroup>
