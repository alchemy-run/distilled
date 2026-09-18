> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting started

> Install Whop Elements and mount your first element in React, JavaScript, or Swift.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

<div data-whop-platform="web">
  Whop Elements are hosted, themeable UI components you embed in your own site. Each element renders in an isolated frame served from Whop's CDN. You install a thin, fully typed package and the element code stays up to date on its own.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  Whop Elements are themeable UI components you can import in your iOS app. They ship as a single Swift SPM package. Each one is a plain SwiftUI view that fetches its own data and manages its own state, so a balance screen is a couple of views in a `VStack` instead of a networking layer and a view model. Add the package, tell the SDK how to fetch an access token, and put the elements in your view hierarchy.
</div>

## Install

<div data-whop-platform="swift" style={{ display: "none" }}>
  Add the package to your `Package.swift` (or **File → Add Package Dependencies** in Xcode):
</div>

<CodeGroup>
  ```bash React theme={null}
  npm install @whop/elements-react @whop/elements
  ```

  ```bash JavaScript theme={null}
  npm install @whop/elements
  ```

  ```swift Swift theme={null}
  dependencies: [
      .package(url: "https://github.com/whopio/whopsdk-elements-swift.git", from: "0.1.12")
  ]
  ```
</CodeGroup>

<div data-whop-platform="web">
  ## Requirements

  |                         |                                                                                                        |
  | ----------------------- | ------------------------------------------------------------------------------------------------------ |
  | React                   | `^19`, for `@whop/elements-react`.                                                                     |
  | Content Security Policy | `frame-src https://js.whop.cloud`, plus `script-src https://js.whop.cloud` if you load the script tag. |

  <Warning>Elements render in frames served from `js.whop.cloud`. If your CSP does not allow that origin, you get blank space instead of the element, and the error appears only in the browser console.</Warning>

  ## Before you start

  You need two things:

  1. **An `accountId`.** An account ID, prefixed `biz_`, or a user ID, prefixed `user_`, for the user's own data. Payment surfaces take a plan or amount instead, and each element page says which it needs.
  2. **A server endpoint that creates an access token**, scoped to the elements you mount.

  <Warning>Never put a Whop API key in browser code. It creates tokens, so anyone who opens the browser's developer tools can read the account. Create the token on your server and send only the token.</Warning>

  Your server calls [Create Access Token](/api-reference/access-tokens/create-access-token) with the account and the scopes the elements need:

  ```http theme={null}
  POST https://api.whop.com/api/v1/access_tokens
  Authorization: Bearer <api_key>
  Content-Type: application/json

  { "company_id": "biz_xxxxxxxx", "scoped_actions": ["company:balance:read"] }
  ```
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  ## Requirements

  |           |                       |
  | --------- | --------------------- |
  | Platform  | iOS 18.0+             |
  | Toolchain | Swift 6.0             |
  | Install   | Swift Package Manager |

  ## Before you start

  You need two things:

  1. **An `accountId`.** An account ID, prefixed `biz_`, or a user ID, prefixed `user_`, for the user's own balance.
  2. **A server endpoint that creates an access token** for the account. Never ship a Whop API key in the app. It creates tokens, so anyone who extracts it can read the account. Create the token on your server and return only that.

  A `user_…` tag reads the viewer's own data, so it uses viewer OAuth (`WhopSDK.configureWithOAuth`) instead of a token. The chat views too.

  Your server calls [Create Access Token](/api-reference/access-tokens/create-access-token) with the account and the scope the elements need:

  ```http theme={null}
  POST https://api.whop.com/api/v1/access_tokens
  Authorization: Bearer <api_key>
  Content-Type: application/json

  { "company_id": "biz_xxxxxxxx", "scoped_actions": ["company:balance:read"] }
  ```
</div>

## Mount your first element

<div data-whop-platform="swift" style={{ display: "none" }}>
  A complete app. `configure` runs once at launch, and the elements render a spinner until it lands, so nothing races it:
</div>

<CodeGroup>
  ```tsx React theme={null}
  import { WhopElements, Payments, PaymentElement, AddressElement, CardElement, EmailElement, TaxIdElement, BrandingElement } from "@whop/elements-react";
  import { loadWhop } from "@whop/elements";

  function Example() {
    return (
      <WhopElements elements={loadWhop()}>
        <Payments /* options */>
          <PaymentElement />
          <AddressElement />
          <CardElement />
          <EmailElement />
          <TaxIdElement />
          <BrandingElement />
        </Payments>
      </WhopElements>
    );
  }
  ```

  ```html JavaScript theme={null}
  <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
  <script type="module">
    const payments = window.WhopElements().payments.create({ /* options */ });
    payments.create('payment').mount('#payments-payment');
    payments.create('address').mount('#payments-address');
    payments.create('card').mount('#payments-card');
    payments.create('email').mount('#payments-email');
    payments.create('taxId').mount('#payments-taxId');
    payments.create('branding').mount('#payments-branding');
  </script>
  ```

  ```swift Swift theme={null}
  import SwiftUI
  import WhopElements

  /// The SDK calls this again before the token expires, so fetch rather than cache.
  final class WalletTokenProvider: WhopTokenProvider {
      func getToken() async -> WhopTokenResponse {
          WhopTokenResponse(accessToken: await myBackend.whopAccessToken())
      }
  }

  @main
  struct MyApp: App {
      var body: some Scene {
          WindowGroup {
              WalletScreen()
                  .task { await WhopSDK.configure(tokenProvider: WalletTokenProvider()) }
          }
      }
  }

  struct WalletScreen: View {
      var body: some View {
          ScrollView {
              VStack(spacing: 24) {
                  BalanceElement(accountId: "biz_xxxxxxxx")
                  ListElement(accountId: "biz_xxxxxxxx")
              }
              .padding()
          }
      }
  }
  ```
</CodeGroup>

<div data-whop-platform="web">
  Prefer npm over the script tag? `loadWhop()` injects the same hosted script and resolves the global constructor:

  ```ts theme={null}
  import { loadWhop } from "@whop/elements";

  const whop = (await loadWhop())({ locale: "en" });
  const payments = whop.payments.create({ /* options */ });
  ```

  ## Authentication

  Pass an `accessToken` when you create the handle. **Use one token for the whole handle, not one per element.** The handle sends that token to every element under it, so ask for all the scopes you need on that one token. Each element page lists the scopes it reads.

  <CodeGroup>
    ```tsx React theme={null}
    <Ads accountId="biz_xxxxxxxx" accessToken={token}>
      {/* elements */}
    </Ads>
    ```

    ```ts JavaScript theme={null}
    const ads = whop.ads.create({ accountId: "biz_xxxxxxxx", accessToken });
    ```
  </CodeGroup>

  The token is a value you set, not a callback the SDK calls. Set a new one before it expires:

  ```ts theme={null}
  ads.update({ accessToken: await createAccessToken() });
  ```

  <Note>If you omit `accessToken`, requests use the viewer's session cookie instead. This works **only on whop.com**. The API does not send `Access-Control-Allow-Credentials` on cross-origin preflights, so a page on your own domain has no session to fall back to and must pass a token.</Note>

  ## Global configuration

  Everything you pass at construction applies to every element group created from that instance (a handle's own options can override per group):

  <ResponseField name="appearance" type="Appearance">
    Visual customization for every element — `theme` (light/dark + palettes), `variables` (CSS custom properties), and `classes` (per-part style declarations). The color scheme is applied before an element's first paint, so dark pages never flash light. See [Appearance](/elements/beta/appearance).
  </ResponseField>

  <ResponseField name="locale" type="&#x22;en&#x22; | &#x22;es&#x22; | &#x22;zh&#x22; | &#x22;nl&#x22; | &#x22;pt&#x22; | &#x22;de&#x22; | &#x22;it&#x22; | &#x22;fr&#x22; | &#x22;ja&#x22; | &#x22;pl&#x22; | &#x22;tr&#x22;">
    Locale for element UI text — one of the app's built locales; any other value falls back to the default locale. Defaults to `"en"`.
  </ResponseField>

  <ResponseField name="environment" type="&#x22;production&#x22; | &#x22;sandbox&#x22;">
    Which Whop API environment the elements talk to — `"sandbox"` targets the sandbox API (test data; no real money moves). Choosing an environment is the only way to change where the elements send what a buyer types, and both environments are Whop's own. The sandbox environment is not yet generally available. Defaults to `"production"`.
  </ResponseField>

  <ResponseField name="toasts" type="boolean">
    Whether elements may show toast notifications on your page — brief status messages ("Payment method added", "Payment failed") rendered in the bottom-right corner. Set `false` to turn them off entirely. Defaults to `true`.
  </ResponseField>

  ```ts theme={null}
  const whop = WhopElements({
    locale: 'es',
    appearance: { theme: { appearance: 'dark', accentColor: 'blue' } }
  });
  ```

  In React, the same object rides `<WhopElements appearance={…} locale={…}>`.

  The `toasts` global is live on this page — the button below sends one through the same rail elements use, themed by this page's `appearance`:

  <div data-whop-demo-shell style={{ position: "relative", minHeight: "40px", transition: "min-height 200ms ease" }}>
    <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

    <div data-whop-demo-native="toast:button" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
  </div>

  ## What the elements handle, and what you own

  Each element fetches its own data and renders its own loading, empty, and error states.

  You handle **navigation and storage**. Elements report selections and results as events, and never write to your database.

  The exception is a flow that leaves the page. Where an element takes a `returnUrl`, it navigates the tab there, so the buyer can end up off your page. Fulfill from webhooks rather than from a browser callback.

  Elements run in frames, so only serializable values cross the boundary. There is no shared DOM, and object identity is not preserved.

  ## Troubleshooting

  | What you see                       | Why                                                                                                    |
  | ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
  | Blank space instead of the element | Your CSP blocks `js.whop.cloud`. Add it to `frame-src`, and to `script-src` if you use the script tag. |
  | `mount()` does nothing             | The selector matched no node. The target must already be in the DOM.                                   |
  | The element loads but stays empty  | The token is missing a scope that element reads. Check the scopes listed on the element's page.        |
  | Requests fail on your own domain   | No token was passed. The session fallback works only on whop.com.                                      |
  | It worked, then stopped            | The token expired. Create a new one and pass it with `update({ accessToken })`.                        |

  ## Available elements

  <CardGroup cols={2}>
    <Card title="Payments" href="/elements/beta/payments/overview">
      Collect a payment from a `plan_` ID or inline currency and amount.
    </Card>

    <Card title="Checkout" href="/elements/beta/checkout/overview">
      Drives a full hosted checkout for one plan — price summary, promo codes, the currency the buyer pays in, and the whole payment collection surface (the payments elements, composed inside) — against the Whop checkout sessions API.
    </Card>

    <Card title="Ads" href="/elements/beta/ads/overview">
      An advertising account.
    </Card>

    <Card title="Tracking" href="/elements/beta/tracking/overview">
      An account's tracked audience: everyone its pixel has seen, and every event they performed.
    </Card>

    <Card title="Wallet" href="/elements/beta/wallet/overview">
      Drives an account's money surfaces.
    </Card>

    <Card title="Websites" href="/elements/beta/websites/overview">
      An account's websites: every site built on whop.app plus every domain the Whop Pixel reports, with traffic and attributed revenue per domain.
    </Card>
  </CardGroup>

  ## Next

  * [Appearance](/elements/beta/appearance): theming, CSS variables, and per-part restyling
  * [Create Access Token](/api-reference/access-tokens/create-access-token): the endpoint your server mints from
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  ## Authentication

  `getToken()` is your only integration point, and the SDK calls it **again before the token expires**, so return a fresh token each time rather than caching one:

  ```swift theme={null}
  final class WalletTokenProvider: WhopTokenProvider {
      func getToken() async -> WhopTokenResponse {
          // your backend, not the Whop API directly
          WhopTokenResponse(accessToken: await myBackend.whopAccessToken())
      }
  }
  ```

  Configure once, anywhere above the elements. `WhopSDK` is process-wide, so a second call is only needed when the account changes:

  ```swift theme={null}
  await WhopSDK.configure(tokenProvider: WalletTokenProvider())
  ```

  Chat and DMs authenticate the **viewer** instead of an account, through OAuth: `WhopSDK.configureWithOAuth(appId:)`.

  ## Theming

  `.whopTheme(_:)` propagates through the SwiftUI environment, so one call themes every element beneath it. Six roles, each a `WhopTint`:

  ```swift theme={null}
  ListElement(accountId: "biz_xxxxxxxx")
      .whopTheme(WhopTheme(accent: .blue, danger: .red, success: .green))
  ```

  Defaults are `accent: .blue`, `neutral: .gray`, `danger: .red`, `info: .sky`, `success: .green`, `warning: .amber`. `WhopTheme.default` is all six. Views follow the system light/dark appearance on their own.

  ## What the elements handle, and what you own

  Each view fetches its own data and renders its own loading, empty and error states, including a retry. You own **navigation**: the selection callbacks hand you a value and never push a screen.

  ```swift theme={null}
  ListElement(accountId: account) { balance in
      path.append(Route.asset(balance.symbol))   // your router, your screen
  }
  ```

  ## Troubleshooting

  | What you see                 | Why                                                                                                                                                                                                  |
  | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `Authentication failed`      | The token is missing, expired, or is an **API key** rather than an access token. `getToken()` must return a token minted by [Create Access Token](/api-reference/access-tokens/create-access-token). |
  | A view stays empty           | The token is valid but not scoped for that read. Balances need `company:balance:read`.                                                                                                               |
  | `Couldn't load this account` | The `accountId` is not one this token can read.                                                                                                                                                      |
  | A chart with no line         | Balance history is available only for account IDs prefixed `biz_`, not personal accounts prefixed `user_`.                                                                                           |

  ## Available on iOS

  The wallet views, each with a live simulator on its page:

  * [`BalanceElement`](/elements/beta/wallet/balances-balance#swift): the total balance, its trend, and the range picker
  * [`ListElement`](/elements/beta/wallet/balances-list#swift): the holdings list
  * [`ActivityElement`](/elements/beta/wallet/activity#swift): the ledger activity feed

  `WhopChatView` and `WhopDMsListView` ship in the same package for viewer-authenticated chat. See the [README](https://github.com/whopio/whopsdk-elements-swift).
</div>
