> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Websites

> An account's websites: every site built on whop.app plus every domain the Whop Pixel reports, with traffic and attributed revenue per domain. Mount `websites` and it lists them with visitors, page views, sales, revenue, trend, and most-viewed pages. Mount `pixel-setup` alongside it and a site whose pixel the wizard just proved live gets a waiting row automatically, because its first events take a few minutes to reach the stats API and the site would otherwise look lost — you wire nothing up for that, and the row is kept on your page so it is still there if the merchant reloads. Reading stats is privileged, so it needs an `accessToken` — except inside Whop's own app, where the viewer's session carries the read.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

## Playground

Assemble the elements with example data. Drive the controls, add and arrange elements, and watch events fire live:

<div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
  <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

  <div data-whop-demo-native="playground:websites" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
</div>

<div data-whop-usage="websites/playground">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Websites } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Websites /* options */>
            {/* mount elements here */}
          </Websites>
        </WhopElements>
      );
    }
    ```

    ```html JavaScript theme={null}
    <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
    <script type="module">
      const websites = window.WhopElements().websites.create({ /* options */ });
    </script>
    ```
  </CodeGroup>
</div>

## Options

Pass these to `whop.websites.create({ … })`, or as props on `<Websites>` in React.

<ResponseField name="windowDays" type="number">
  How many days of traffic the table covers, from 1 to 90. @default 30 Defaults to `30`.
</ResponseField>

<ResponseField name="includeApps" type="boolean">
  List websites built on whop.app from the moment they exist, with zeros until traffic arrives. Turn off to show only domains the pixel reports. @default true Defaults to `true`.
</ResponseField>

<ResponseField name="pendingWebsites" type="PendingWebsite[]">
  Websites you have just added that are not live yet — `{ domain, kind }`, where `kind` is `deploy` for a whop.app site waiting on its first deploy or `events` for a site waiting on its first pixel events. They render as waiting rows so a site never looks lost right after setup, and the table polls while any is outstanding. Sites the mounted `pixel-setup` wizard proves live are added for you, kept across a reload, and are NOT your job — this is for the waits the handle cannot see for itself, above all a whop.app site you just created, which no element here reports. Entries you add are yours to remove: a row stops being drawn once its domain reaches the table, but the list itself only changes when you change it, so drop an entry when `websitesLoaded` names its domain and give the rest a timeout of your own. Defaults to `[]`.
</ResponseField>

<ResponseField name="showVerify" type="boolean">
  Add a pixel-check button to each row. The element only reports the press through `onVerifyRequested` — opening the site and deciding the outcome is yours, because a popup opened by your own page is the one browsers trust. Defaults to `false`.
</ResponseField>

<ResponseField name="showSettings" type="boolean">
  Add a settings button to whop.app rows. The element only reports the press through `onSettingsRequested` — the editing surface is yours. Defaults to `false`.
</ResponseField>

<ResponseField name="showEdit" type="boolean">
  Add an edit button to whop.app rows, styled as the row’s primary action. The element only reports the press through `onEditRequested` — the editing surface is yours. Defaults to `false`.
</ResponseField>

<ResponseField name="verifyTarget" type="string">
  Which row the check in progress belongs to — the `target` from the `verifyRequested` event you are handling. Defaults to `""`.
</ResponseField>

<ResponseField name="verifyStatus" type="&#x22;idle&#x22; | &#x22;waiting&#x22; | &#x22;connected&#x22; | &#x22;not-detected&#x22; | &#x22;blocked&#x22;">
  How the check in progress is going, shown on that row’s button: `waiting`, `connected`, `not-detected`, or `blocked` when the popup was blocked. Defaults to `"idle"`.
</ResponseField>

<ResponseField name="accessToken" type="string">
  A scoped token for the reads — stats need `stats:read`, and the whop.app website list reads apps (rows degrade to traffic-only if the token can’t). Mint it on your server with `POST /api/v1/access_tokens` and set a fresh one before it expires. `pixel-setup` is the one child this is not projected into — it authenticates its own scans from its own `accessToken` — so mint a single token carrying both sets of scopes and pass that same string to both, rather than one token per element. Omitted, the reads carry the viewer’s own session, which only answers same-origin.
</ResponseField>

<ResponseField name="accountId" type="string" required>
  Account ID, prefixed `biz_`, whose websites these surfaces read.
</ResponseField>

<ResponseField name="appearance" type="Appearance">
  Visual customization for this group's elements. Overrides the global `WhopElements({ appearance })`. Change it live with `update({ appearance })`.
</ResponseField>

<ResponseField name="locale" type="WhopElementsLocale">
  Locale for this group's element UI text. Set it to one of the app's built locales to override the global configuration. Any other value falls back to the default locale.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onLoadingChange`

Runs when the grouped loading state changes. The value is `true` while any mounted element is still loading.

**Signature:** `((loading: boolean) => void)`

## Methods

Call these on the Websites handle from `whop.websites.create({ … })` or `useWebsites()`.

### `update`

Merges new handle options into every mounted element. In React, change the namespace props instead.

**Signature:** `(options: Partial<WebsitesOptions>) => void`

### `destroy`

Destroys every element and sub-controller this handle created, removes the controller frame, and releases its subscriptions. You can call it more than once, but a destroyed handle refuses any other call — create a new handle to start over. React removes the group automatically when the provider unmounts.

**Signature:** `() => void`

## Types

Named types used throughout this page.

## `PendingWebsite`

Fields on `PendingWebsite`.

### `domain`

**Signature:** `string`

### `kind`

**Signature:** `"events" | "deploy"`

## Elements

The elements this group mounts. Each has its own page:

<CardGroup cols={2}>
  <Card title="WebsitesElement" href="/elements/beta/websites/websites">
    An account's websites in one table: every site built on whop.app — listed from the moment it exists, zeros until traffic arrives — merged by hostname with every domain the Whop Pixel reports. Rows for the whop.app sites carry a Whop mark, so the two sources stay apart even when both have traffic. Each row shows a page-view trend, unique visitors, page views, attributed sales, USD revenue, and the last day an event arrived. Expanding a domain loads its most-viewed pages, and each page-view figure opens the breakdown of which events made it up. Set `showVerify` to add a per-row button that asks the page hosting this element to open the site and confirm the pixel is firing; set `showSettings` to add a settings button on whop.app rows that reports the click through `onSettingsRequested`, and `showEdit` to add a primary edit button reporting through `onEditRequested` — your page owns the actual editing.
  </Card>

  <Card title="PixelSetupElement" href="/elements/beta/websites/pixel-setup">
    Installs the Whop Pixel and wires conversion events: copy the snippet, check a page for it, confirm the events fire. Mount it inline, or inside your own overlay.
  </Card>
</CardGroup>
