> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Permissions

> Configure the permissions your app needs and request approval from the creators who install it.

Apps use permissions to access account data and act on behalf of users. Every API call requires the matching permission. You declare the ones you need in your app's settings, creators approve them at install, and your SDK calls succeed only after creators grant those permissions.

<Tip>
  Find the required permissions for any endpoint in the API reference. Each operation page lists them under "Required permissions."
</Tip>

## Required and optional permissions

You can mark each permission as required or optional. The choice changes the install experience for creators.

| Type         | Creator can disable at install | Use when                                                                   |
| ------------ | ------------------------------ | -------------------------------------------------------------------------- |
| **Required** | No                             | The app can't function without this scope                                  |
| **Optional** | Yes                            | The scope powers a side feature, not the core flow (e.g. analytics opt-in) |

Optional permissions are good for opt-in functionality. If a creator declines an optional permission, your app should still work, just without that feature.

## Set up permissions

<Warning>
  The permissions flow is required even for testing on your own account. Same flow on install or self-test, so you catch missing scopes early.
</Warning>

<Steps>
  <Step title="Open your app's permissions tab">
    1. Go to the [Developer dashboard](https://whop.com/dashboard/developer).
    2. Select or create an app.
    3. Select the **Permissions** tab.

    <Frame>
      <img src="https://mintcdn.com/whop/CTin6M1qeROeLXJs/images/app-permissions-settings.png?fit=max&auto=format&n=CTin6M1qeROeLXJs&q=85&s=514a98987e714d5a2542b3d7665020f7" alt="Permissions Settings" width="2120" height="722" data-path="images/app-permissions-settings.png" />
    </Frame>
  </Step>

  <Step title="Add the permissions you need">
    Select **Add permissions**, select what your app needs, and confirm.

    Cross-reference the API endpoints you plan to call and add every permission they require.
  </Step>

  <Step title="Configure each permission">
    For each one:

    1. Write a short justification explaining why the app needs it. Creators see this at install.
    2. Mark it **required** or **optional**.

    <Frame>
      <img src="https://mintcdn.com/whop/CTin6M1qeROeLXJs/images/app-permissions-settings-justification.png?fit=max&auto=format&n=CTin6M1qeROeLXJs&q=85&s=93ec46a13be088ad236a7fe69f6f6ad2" alt="Permissions Justification" width="2120" height="722" data-path="images/app-permissions-settings-justification.png" />
    </Frame>
  </Step>

  <Step title="Save">
    <Frame>
      <img src="https://mintcdn.com/whop/CTin6M1qeROeLXJs/images/app-permissions-settings-save.png?fit=max&auto=format&n=CTin6M1qeROeLXJs&q=85&s=683b42f4dcfed0eeee535d82dcce3e5f" alt="Save Permissions Settings" width="1074" height="178" data-path="images/app-permissions-settings-save.png" />
    </Frame>
  </Step>

  <Step title="Install on a test account">
    Visit your direct install link: `https://whop.com/apps/app_xxxxxxxxx/install`.

    Pick an account, review the permission prompt, and approve.

    <Frame>
      <img src="https://mintcdn.com/whop/CTin6M1qeROeLXJs/images/app-permissions-oauth.png?fit=max&auto=format&n=CTin6M1qeROeLXJs&q=85&s=4b427b52f269ee6b92fcf7434069ad43" alt="Permissions Prompt" width="2176" height="2222" data-path="images/app-permissions-oauth.png" />
    </Frame>
  </Step>
</Steps>

## Update permissions later

Permissions can change as the app evolves. When you add a new one:

* Existing installs see a **Re-approve** button next to your app.
* API calls that need the new permission fail until each creator re-approves.

<Note>
  When you add a permission, re-approve on your own test account too. New scopes don't carry over until you accept them in [Authorized apps](https://whop.com/dashboard/settings/authorized-apps).
</Note>

Creators can manage granted permissions any time at `Dashboard → Settings → Authorized apps`.

<video controls className="rounded-xl" src="https://mintcdn.com/whop/_aQsA39rzB5Zq8ZK/how-to-videos/configure-app-permissions.mp4?fit=max&auto=format&n=_aQsA39rzB5Zq8ZK&q=85&s=dff99f10fb43e8914fdcd1b0eb4bd044" data-path="how-to-videos/configure-app-permissions.mp4" />

## Frequently asked questions

<AccordionGroup>
  <Accordion title="How many permissions can an app request?">
    Up to 100 per app.
  </Accordion>

  <Accordion title="Where are the required permissions for an endpoint listed?">
    Each endpoint in the [API reference](/api-reference/payments/list-payments) lists its required permissions inline.

    <Frame>
      <img src="https://mintcdn.com/whop/purcney6SuEUQzS5/images/sdk-reference-required-permissions.png?fit=max&auto=format&n=purcney6SuEUQzS5&q=85&s=141d5a09a00942f216c98d233824dcf9" alt="SDK Reference Permissions" width="1478" height="358" data-path="images/sdk-reference-required-permissions.png" />
    </Frame>
  </Accordion>

  <Accordion title="Can an app request additional permissions afterward?">
    Yes. You can request additional permissions and the creator will be asked to re-approve them.

    <Note>
      Until the permissions are re-approved, API requests requiring the **newly requested** permissions will fail. Make sure your code handles these errors and provides a useful fallback.
    </Note>

    <Warning>
      When developing your app, make sure you re-approve the permissions yourself in your [Authorized apps](https://whop.com/dashboard/settings/authorized-apps) settings.

      See [Configure your permissions](/developer/guides/permissions#updating-your-permissions) for more information.
    </Warning>
  </Accordion>
</AccordionGroup>

## Next steps

<CardGroup cols={2}>
  <Card title="Authentication" href="/developer/guides/authentication">
    Verify the user behind a request and check their access level.
  </Card>

  <Card title="Listen to webhooks" href="/developer/guides/webhooks">
    Receive payment, membership, and entry events. Webhooks need their own `webhook_receive:*` scopes.
  </Card>

  <Card title="Build app views" href="/developer/guides/app-views">
    Set up dashboard views, experiences, and discover listings.
  </Card>

  <Card title="Run a local development proxy" href="/developer/guides/dev-proxy">
    Match the production iframe + cookie setup on localhost.
  </Card>
</CardGroup>
