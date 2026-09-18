> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Iframe SDK

> Interact with the whop website from within your app.

Whop embeds apps into the site using iframes. This SDK provides a type-safe way for you to communicate with the Whop application through a request-and-response API that uses `window.postMessage`.

Since this package relies on `window.postMessage`, it only works in **Client Components** or client-side JavaScript.

### Relevant packages

* `@whop/iframe` - The main package for the iframe SDK.
* `@whop/react` - A React wrapper for Whop Apps including helpers for the iframe SDK.

***

## Setup

The main function exported from the `@whop/iframe` package is the `createSdk` function. When called, this function sets up a listener for messages from the main Whop site, using `window.on('message', ...)`. It's also exposed through the `WhopIframeSdkProvider` component from `@whop/react`.

### React

If you use React, add the `WhopIframeSdkProvider` component from `@whop/react` to provide the iframe SDK to all child components.

<Steps>
  <Step title="Mount provider in root layout">
    ```javascript theme={null}
    // app/layout.tsx
    import { WhopIframeSdkProvider } from "@whop/react";

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode,
    }) {
      return (
        <html lang="en">
          <body>
            <WhopIframeSdkProvider>{children}</WhopIframeSdkProvider>
          </body>
        </html>
      );
    }
    ```
  </Step>

  <Step title="Consume the iframe SDK in a component">
    ```javascript theme={null}
    // components/example.tsx
    import { useIframeSdk } from "@whop/react";

    export const Example = () => {
      const iframeSdk = useIframeSdk();

      return (
        <button
          onClick={() => iframeSdk.openExternalUrl({ url: "https://example.com" })}
        >
          Open External URL
        </button>
      );
    };
    ```
  </Step>
</Steps>

### Other frameworks

For other frameworks, you can use the `createSdk` function from `@whop/iframe` to create an instance of the iframe SDK.

<Steps>
  <Step title="Create the iframe SDK instance">
    ```javascript theme={null}
    // lib/iframe-sdk.ts
    import { createSdk } from "@whop/iframe";

    export const iframeSdk = createSdk({
      appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
    });
    ```
  </Step>

  <Step title="Use the iframe SDK instance">
    ```javascript theme={null}
    // index.ts
    import { iframeSdk } from "@/lib/iframe-sdk";

    const navigationButtonElement = document.querySelector("button");

    if (navigationButtonElement) {
      navigationButtonElement.addEventListener("click", () => {
        iframeSdk.openExternalUrl({ url: "https://example.com" });
      });
    }
    ```
  </Step>
</Steps>

<Check>The SDK and iframe are now set up.</Check>

## Opening external links

After you initialize the iframe SDK, you can use it to open external links. This closes your app and navigates to a new website.

<CodeGroup>
  ```javascript React theme={null}
  "use client";
  import { useIframeSdk } from "@whop/react";

  export default function Home() {
  	const iframeSdk = useIframeSdk();

      function openLink() {
      	iframeSdk.openExternalUrl({ url: "https://google.com" });
      }

      return <button onClick={openLink}>Click me to open Google</button>;

  }

  ```

  ```javascript Vanilla JS theme={null}
  import { iframeSdk } from "@/lib/iframe-sdk";

  const navigationButtonElement = document.querySelector("button");

  if (navigationButtonElement) {
    navigationButtonElement.addEventListener("click", () => {
      iframeSdk.openExternalUrl({ url: "https://google.com" });
    });
  }
  ```
</CodeGroup>

### Opening user profiles

If you want to display a Whop user profile, you can use the `openExternalUrl` method and pass their profile page link which looks like `https://whop.com/@username`.

The Whop app will intercept this and display a modal containing their user profile instead of navigating away.

<CodeGroup>
  ```javascript React theme={null}
  "use client";
  import { useIframeSdk } from "@whop/react";

  export default function Home() {
  	const iframeSdk = useIframeSdk();

      function openProfile() {
      	iframeSdk.openExternalUrl({ url: "https://whop.com/@j" });
      }

      return <button onClick={openProfile}>View Profile</button>;

  }

  ```

  ```javascript Vanilla JS theme={null}
  import { iframeSdk } from "@/lib/iframe-sdk";

  const profileButtonElement = document.querySelector("button");

  if (profileButtonElement) {
    profileButtonElement.addEventListener("click", () => {
      iframeSdk.openExternalUrl({ url: "https://whop.com/@j" });
    });
  }
  ```
</CodeGroup>

<Info>
  You can also use a user ID instead of username. The final link should look
  like this: `https://whop.com/@user_XXXXXXXX`
</Info>

## In-app purchases

The iframe SDK provides a method to trigger in-app purchases directly within your app. This lets you accept payments for one-time purchases or subscriptions using Whop's checkout.

To process in-app purchases, you'll need to:

1. Create a checkout configuration on your server (with plan details and metadata)
2. Use the `inAppPurchase` method from the iframe SDK to open the payment modal
3. Handle the response and validate the payment via webhooks

<CodeGroup>
  ```tsx React theme={null}
  "use client";
  import { useIframeSdk } from "@whop/react";
  import { useState } from "react";

  export default function PaymentButton() {
      const iframeSdk = useIframeSdk();
      const [paymentId, setPaymentId] = useState<string>();

      async function handlePurchase() {
          // 1. Create checkout configuration on server
          //    (in this example this is a nextjs server action, but it could also be a plain API route)
          const checkoutConfiguration = await createCheckoutConfiguration(/* can pass options here */);

          // 2. Open payment modal
          const res = await iframeSdk.inAppPurchase({
              planId: checkoutConfiguration.plan.id,
              id: checkoutConfiguration.id
          });

          if (res.status === "ok") {
              setPaymentId(res.data.receipt_id);
          } else {
              // handle errors
          }
      }

      return <button onClick={handlePurchase}>Purchase</button>;

  }

  ```

  ```javascript Vanilla JS theme={null}
  import { iframeSdk } from "@/lib/iframe-sdk";

  const paymentButton = document.querySelector("button#payment-button");

  paymentButton.addEventListener(
      "click",
      async function onPaymentButtonClick() {
          // 1. Create checkout configuration on server
          const checkoutConfiguration = await createCheckoutConfiguration(/* can pass options here */);

          // 2. Open payment modal
          const res = await iframeSdk.inAppPurchase({
              planId: checkoutConfiguration.plan.id,
              id: checkoutConfiguration.id
          });

          if (res.status === "ok") {
              const paymentId = res.data.receipt_id;
              // Send this id to your backend to validate, or rely on webhooks.
              // User has purchased the item, and it can be unlocked.
          } else {
              // handle errors
          }
      }
  );
  ```
</CodeGroup>

<Info>
  For a complete guide on setting up in-app purchases including creating
  checkout configurations, handling webhooks, and validating payments, see the
  [Accept payments documentation](/developer/guides/accept-payments).
</Info>
