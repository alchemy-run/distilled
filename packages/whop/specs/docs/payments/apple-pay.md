> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable Apple Pay

> Enable Apple Pay for your embedded checkout by verifying your domain

Apple Pay lets customers pay using their Apple Wallet, providing a seamless checkout experience on Safari and iOS devices. To enable Apple Pay on your embedded checkout, you need to verify ownership of your domain.

<Note>
  Domain verification is only required for [embedded
  checkout](/payments/checkout-embed). Whop-hosted checkout pages already
  support Apple Pay without any additional setup.
</Note>

## Prerequisites

Before setting up Apple Pay, check that you have:

* A domain where you're hosting the embedded checkout
* Access to your domain's DNS settings (for Whop-hosted verification) or file hosting (for self-hosted verification)
* `@whop/checkout@0.0.43` or later if using the `hideSubmitButton` option in React

## Choose a verification method

There are two ways to verify your domain for Apple Pay:

<CardGroup cols={2}>
  <Card title="Whop-hosted verification" icon="wand-magic-sparkles" href="#whop-hosted-verification">
    Recommended for most users. Whop handles the verification file hosting - you
    just need to add DNS records.
  </Card>

  <Card title="Self-hosted verification" icon="server" href="#self-hosted-verification">
    For advanced users who prefer to host the verification file themselves.
  </Card>
</CardGroup>

## Whop-hosted verification

This method lets Whop host the Apple Pay verification file on your behalf. You'll temporarily point your domain to Whop's servers to complete verification, then revert your DNS settings.

<Warning>
  This method requires temporary DNS changes that will cause your domain to be
  unavailable for a few minutes during verification. Plan accordingly.
</Warning>

<Note>
  **Before you begin:** Take a screenshot or export your current DNS records for
  the domain you're verifying. While the verification wizard will show revert
  instructions after completion, these are best-effort and may not capture all
  edge cases. Having your own backup ensures you can restore your DNS
  configuration accurately.
</Note>

### Step 0: Lower your <abbr title="Domain Name System">DNS</abbr> <abbr title="time to live">TTL</abbr> (optional)

If the domain actively serves traffic, consider lowering the TTL (time to live) on its existing DNS record before starting. This change helps DNS updates propagate faster when you switch and revert records. If you skip this step, downtime may last longer while DNS caches expire.

<Accordion title="How to lower your TTL">
  1. Find the existing A or CNAME record for the domain you want to verify
     (e.g., the record for `checkout.yoursite.com`) 2. Lower its TTL to 60-300
     seconds 3. Wait for the previous TTL duration to pass (e.g., if it was 1 hour,
     wait 1 hour) so all DNS caches refresh 4. Then proceed with the verification
     steps below
</Accordion>

### Step 1: Open payment domains settings

Navigate to your [checkout settings](https://whop.com/dashboard/settings/checkout/) and find the **Apple Pay for embedded checkout** section. Select **Configure** to open the domain management panel.

<Frame>
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/payment-domains-settings.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=2797c1311a2bbd28cdef5e86929eb25f" alt="Payment domains settings showing the Configure button" width="2868" height="1654" data-path="images/apple-pay/payment-domains-settings.png" />
</Frame>

### Step 2: Add your domain

Select the **+** button (or **Add payment domain** if no domains exist yet). From the dropdown menu, select **Whop-hosted verification**.

<Frame>
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/dropdown-whop-hosted-verification.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=f1650433be75f04aa48fac1f336380ad" alt="Add domain dropdown menu with Whop-hosted option" width="1262" height="902" data-path="images/apple-pay/dropdown-whop-hosted-verification.png" />
</Frame>

Enter the domain where you're hosting the embedded checkout (e.g., `checkout.yoursite.com` or `yoursite.com`). Acknowledge that your domain will experience temporary downtime by selecting the confirmation checkbox. Then select **Start verification**.

<Frame>
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/add-domain-dialog.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=2cb42e439775b661dcbc84a5ea0092f7" alt="Add domain dialog for Whop-hosted verification" width="2278" height="1326" data-path="images/apple-pay/add-domain-dialog.png" />
</Frame>

### Step 3: Add DNS records

<Warning>
  This step will cause downtime for your domain. Your domain will point to
  Whop's servers until you revert the DNS records after verification. **If you
  haven't already, take a screenshot of your current DNS settings now** before
  making any changes.
</Warning>

After adding your domain, you'll see the DNS records to add in your domain's DNS settings. These records typically include:

* **A record** or **CNAME record** - Points your domain to Whop's verification servers
* (optional) **TXT record** - Proves domain ownership

  <Tip>
    Use a low TTL (60-300 seconds) so you can revert quickly after verification.
  </Tip>

<Frame>
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/dns-records.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=afb3e74290f7cc89b5ff2a5d8e6b74f0" alt="DNS records to add for domain verification" width="1202" height="788" data-path="images/apple-pay/dns-records.png" />
</Frame>

If your domain already has an A or CNAME record, **edit or replace it** with the values shown. Don't add a second record. Find these settings in your DNS provider's dashboard (e.g., Cloudflare, Namecheap, GoDaddy, Route 53).

<Frame caption="Example DNS configuration in Cloudflare">
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/dns-records-cf.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=c1ff43b3cf54e6a04edcdf395460d8af" alt="DNS records configured in Cloudflare" width="2204" height="232" data-path="images/apple-pay/dns-records-cf.png" />
</Frame>

### Step 4: Wait for DNS propagation

DNS changes can take anywhere from a few minutes to 48 hours to propagate, though most changes appear within 5–15 minutes. The verification wizard automatically detects the configured DNS records.

### Step 5: Complete verification

After Whop verifies the DNS records, it will:

1. Issue an SSL certificate for your domain
2. Host the Apple Pay verification file
3. Register your domain with Apple

### Step 6: Revert DNS settings

After verification, revert your DNS settings to point back to your original hosting. The Apple Pay verification will remain valid. The wizard will show you the records to delete and restore.

<Warning>
  The revert instructions shown in the wizard are **best-effort** and may not be
  100% accurate in all cases. Always refer to your own DNS backup (screenshot or
  export) to make sure you restore the correct values. If you're unsure, check with
  your hosting provider for the correct DNS configuration.
</Warning>

<Frame>
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/verification-complete.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=0808edbf3d3498a9b445d5c10cf719e2" alt="Domain verification complete with revert instructions" width="1194" height="1328" data-path="images/apple-pay/verification-complete.png" />
</Frame>

## Self-hosted verification

If you prefer to host the verification file yourself, you can do so by serving the Apple Pay merchant ID domain association file at a specific path on your domain.

### Step 1: Download the verification file

Download the [Apple Pay verification file](https://whop.com/.well-known/apple-platform-integrator/apple-developer-merchantid-domain-association).

### Step 2: Host the file

Host this file at the following path on your domain:

```
https://<your-domain>/.well-known/apple-developer-merchantid-domain-association
```

The file must be:

* Served over HTTPS
* Accessible without authentication
* Served with the correct content (no modifications)

<Tabs>
  <Tab title="Next.js">
    Place the file in your `public` folder:

    ```
    public/
    └── .well-known/
        └── apple-developer-merchantid-domain-association
    ```
  </Tab>

  <Tab title="Nginx">
    Add a location block to serve the file:

    ```nginx theme={null}
    location /.well-known/apple-developer-merchantid-domain-association {
        alias /path/to/apple-developer-merchantid-domain-association;
        default_type application/octet-stream;
    }
    ```
  </Tab>

  <Tab title="Vercel">
    Create a `vercel.json` with a rewrite rule that proxies to the Whop-hosted file:

    ```json theme={null}
    {
      "rewrites": [
        {
          "source": "/.well-known/apple-developer-merchantid-domain-association",
          "destination": "https://whop.com/.well-known/apple-platform-integrator/apple-developer-merchantid-domain-association"
        }
      ]
    }
    ```
  </Tab>

  <Tab title="Cloudflare Pages">
    Place the file in your output directory:

    ```
    dist/
    └── .well-known/
        └── apple-developer-merchantid-domain-association
    ```
  </Tab>
</Tabs>

### Step 3: Verify file access

Test that you can access the file by visiting:

```
https://<your-domain>/.well-known/apple-developer-merchantid-domain-association
```

The file should download or display its contents without any errors.

### Step 4: Open payment domains settings

Navigate to your [checkout settings](https://whop.com/dashboard/settings/checkout/) and find the **Apple Pay for embedded checkout** section. Select **Configure** to open the domain management panel.

<Frame>
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/payment-domains-settings.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=2797c1311a2bbd28cdef5e86929eb25f" alt="Payment domains settings showing the Configure button" width="2868" height="1654" data-path="images/apple-pay/payment-domains-settings.png" />
</Frame>

### Step 5: Register your domain

Select the **+** button (or **Add payment domain** if no domains exist yet). From the dropdown menu, select **Self-hosted verification**.

<Frame>
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/dropdown-self-hosted-verification.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=e9f392d465afa3a683828dc386f7a3bc" alt="Add domain dropdown menu with self-hosted option" width="1262" height="902" data-path="images/apple-pay/dropdown-self-hosted-verification.png" />
</Frame>

Enter your domain. Whop will verify access to the file before registering your domain with Apple.

<Frame>
  <img src="https://mintcdn.com/whop/qJMsh85qcrvhDnDi/images/apple-pay/add-domain-self-hosted.png?fit=max&auto=format&n=qJMsh85qcrvhDnDi&q=85&s=cbb7f1aa2b9d605470356ee4d058f7cd" alt="Add domain dialog for self-hosted verification" width="2608" height="1246" data-path="images/apple-pay/add-domain-self-hosted.png" />
</Frame>

## Troubleshooting

<AccordionGroup>
  <Accordion title="Apple Pay button doesn't appear">
    * Make sure your domain is fully verified in the payment domains settings.
    * Check that you're using `@whop/checkout@0.0.43` or later.
    * Use a supported browser (Safari) and device (iOS or macOS).
    * Test on an actual Apple device, not in a simulator.
    * If using **Framer**, make sure you
      are loading the checkout SDK via Custom Code in your site headers, not via
      the Embed component. Framer's Embed component uses a `srcdoc` iframe which
      Safari treats as an insecure context, blocking Apple Pay. See the [Framer
      checkout
      guide](/payments/checkout-embed) for the
      correct setup.
  </Accordion>

  <Accordion title="DNS verification is taking too long">
    * DNS propagation can take up to 48 hours.
    * Use a tool like
      [dnschecker.org](https://dnschecker.org) to verify your records have
      propagated.
    * Make sure you've added the records to the correct DNS zone.
    * If using Cloudflare, use "DNS only" (gray cloud) for the DNS record,
      not "Proxied" (orange cloud), during verification
  </Accordion>

  <Accordion title="SSL certificate verification failed">
    * Make sure your DNS records point to the correct values.
    * Wait a few minutes while the certificate authority issues the certificate.
    * If the issue persists, try
      removing and re-adding the domain
  </Accordion>

  <Accordion title="Self-hosted file returns 404">
    * Verify the file is in the correct location:
      `/.well-known/apple-developer-merchantid-domain-association`.
    * Check that your web server serves files without extensions.
    * Make sure your hosting configuration doesn't block the `.well-known` directory.
  </Accordion>
</AccordionGroup>

## Next steps

<CardGroup cols={2}>
  <Card title="Embedded Checkout" icon="code" href="/payments/checkout-embed">
    Learn how to embed Whop checkout on your website
  </Card>

  <Card title="Checkout Links" icon="link" href="/payments/create-checkout-link">
    Create shareable checkout links for your products
  </Card>
</CardGroup>
