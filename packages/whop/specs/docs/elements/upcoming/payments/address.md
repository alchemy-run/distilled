> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# AddressElement

> Collects a billing or shipping address. Fields, order, and validation follow the selected country. Includes street autocomplete and methods to read or validate the address.

<div data-whop-platform="web">
  Mounts inside [`Payments`](/elements/upcoming/payments/overview). Pass props and callbacks through the create options or React props. Keep the created handle, or React `ref`, to call `validate()` and `getValues()`.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  Mounts anywhere. Keep an `AddressElementManager` near your submit button to read and validate the address.
</div>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="payments/address">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Payments, AddressElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Payments /* options */>
                <AddressElement onChange={(e) => console.log(e)} />
              </Payments>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const payments = window.WhopElements().payments.create({ /* options */ });
          payments.create('address', { onChange: (e) => console.log(e) }).mount('#payments-address');
        </script>
        ```

        ```swift Swift theme={null}
        import SwiftUI
        import WhopElements

        struct CheckoutScreen: View {
            @State private var manager = AddressElementManager()

            var body: some View {
                ScrollView {
                    AddressElement(manager: manager) { snapshot in
                        print(snapshot.isComplete)
                    }
                    .padding()
                }
                .safeAreaInset(edge: .bottom) {
                    Button("Continue") {
                        let snapshot = manager.validate()
                        guard snapshot.isComplete else { return }
                        print(snapshot.address.country, snapshot.address.postalCode ?? "")
                    }
                    .padding()
                }
            }
        }
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-platform="web">
      <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
        <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

        <div data-whop-demo-native="element:payments/address" data-whop-elements-version="" style={{ position: "relative" }} />
      </div>

      <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/upcoming/payments/overview#playground).</p>
    </div>

    <div data-whop-platform="swift" style={{ display: "none" }}>
      <div style={{ width: "22rem", maxWidth: "100%" }}>
        <div data-whop-simulator-shell className="whop-ios-simulator" style={{ position: "relative", aspectRatio: "390 / 800", overflow: "hidden" }}>
          <iframe src={"https://app.revyl.ai/embed/89c536ac-28ef-45d0-b99a-ecfffe579e33?controls=0"} title="AddressElement running on an iPhone simulator" loading="lazy" allow="fullscreen; clipboard-read; clipboard-write" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "transparent", display: "block" }} />
        </div>
      </div>
    </div>
  </div>
</div>

<div data-whop-platform="web">
  ## Props

  <ResponseField name="layout" type="&#x22;full&#x22; | &#x22;compact&#x22;">
    `full` (default) stacks labeled fields. `compact` groups placeholder-labeled fields within one border. Defaults to `"full"`.
  </ResponseField>

  <ResponseField name="line2" type="&#x22;never&#x22; | &#x22;toggle&#x22; | &#x22;always&#x22;">
    Address line 2: always visible (default), revealed by a text button (`toggle`), or never collected. Defaults to `"always"`.
  </ResponseField>

  <ResponseField name="name" type="&#x22;split&#x22; | &#x22;combined&#x22; | &#x22;none&#x22;">
    The name row: one full-name field (default), split first/last fields, or none. Defaults to `"combined"`.
  </ResponseField>

  <ResponseField name="mode" type="&#x22;billing&#x22; | &#x22;shipping&#x22;">
    Browser autocomplete purpose: `billing` (default) or `shipping`. Defaults to `"billing"`.
  </ResponseField>

  <ResponseField name="scope" type="&#x22;full&#x22; | &#x22;minimal&#x22;">
    `full` (default) follows the selected country's complete address format. `minimal` collects only country and postal code. `name` independently adds required name fields. Set `name` to `none` to omit them. This element does not add fields required by a payment method. Card confirmation requires a name, country, and postal code, so keep `name` enabled or pass `billingDetails.name`. Defaults to `"full"`.
  </ResponseField>

  <ResponseField name="organization" type="&#x22;name&#x22; | &#x22;none&#x22; | &#x22;name_with_type&#x22;">
    Organization fields: none (default), name only, or name with a business/individual selector. Defaults to `"none"`.
  </ResponseField>

  <ResponseField name="defaultValues" type="{ name?: string | undefined; address?: { name?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; organization?: string | undefined; organization_type?: &#x22;business&#x22; | &#x22;individual&#x22; | undefined; line1?: string | undefined; line2?: string | undefined; city?: string | undefined; state?: string | undefined; postal_code?: string | undefined; country?: string | undefined; } | undefined; }">
    Seed values applied once before first paint (`address.country` is an ISO 3166-1 alpha-2 country code). Takes precedence over IP-country detection.
  </ResponseField>

  <ResponseField name="detectCountry" type="boolean">
    Default the country from the buyer's IP (resolved before first paint). Falls back to the controller's `countryHint`, then US. Defaults to `true`.
  </ResponseField>

  <ResponseField name="allowedCountries" type="string[]">
    Allowed ISO 3166-1 alpha-2 country codes. With one code, the selector remains visible but offers only that country.
  </ResponseField>

  <ResponseField name="autocomplete" type="boolean">
    Enables Google Places suggestions for the street address. If no match appears or Places is blocked, the list reports no matches and lets buyers enter the address manually. Set `false` for a plain input. Defaults to `true`.
  </ResponseField>

  <ResponseField name="customFields" type="({ key: string; label: string; type: &#x22;text&#x22; | &#x22;phone&#x22; | &#x22;select&#x22; | &#x22;date&#x22;; position: &#x22;after_name&#x22; | &#x22;after_organization&#x22; | &#x22;before_country&#x22; | &#x22;after_address&#x22;; required?: boolean | undefined; options?: string[] | undefined; format?: string | undefined; autocomplete?: string | undefined; })[]">
    Additional fields rendered with the address form. Values are validated and emitted in the separate `custom` map.
  </ResponseField>

  <ResponseField name="countryHint" type="string">
    Fallback country after `defaultValues` and IP detection. Use an ISO 3166-1 alpha-2 code. An empty value falls back to `US`. Defaults to `""`.
  </ResponseField>

  ## Events

  Pass callbacks in the create options or React props.

  ### `onChange`

  Fires when the address changes. `complete` is true when all country-specific fields and required custom fields are valid. `address` follows confirmation-token `billing_details` names, including `postal_code`. `country` is an ISO 3166-1 alpha-2 code. Custom values are in `custom`.

  **Signature:** `((payload: { complete: boolean; address: { name?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; organization?: string | undefined; organization_type?: "business" | "individual" | undefined; line1?: string | undefined; line2?: string | undefined; city?: string | undefined; state?: string | undefined; postal_code?: string | undefined; country: string; }; custom: Record<string, string>; }) => void)`

  ### `onLoaderStart`

  Runs after the loading skeleton first paints and before `onReady`.

  **Signature:** `(() => void)`

  ### `onReady`

  Runs after the element's first complete paint.

  **Signature:** `(() => void)`

  ### `onError`

  Runs when the element fails to load or crashes. The fallback remains visible. Use `code` for programmatic handling. `sourceKey` identifies a failed host-state source.

  **Signature:** `((e: { message: string; code?: string | undefined; sourceKey?: string | undefined; }) => void)`

  ## Methods

  Call these on the handle returned by `create`, or through a React `ref`.

  ### `validate`

  Validates the form, reveals all inline errors, and never throws. Returns `complete`, `address`, and `errors`. `errors` is empty exactly when `complete` is true. Keys use contract names such as `postal_code` and `line1`, `custom:<key>` for custom fields, and transient `form` while loading.

  **Signature:** `() => Promise<{ complete: boolean; address: { name?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; organization?: string | undefined; organization_type?: "business" | "individual" | undefined; line1?: string | undefined; line2?: string | undefined; city?: string | undefined; state?: string | undefined; postal_code?: string | undefined; country: string; }; errors: Record<string, string>; }>`

  ### `getValues`

  Returns `address` and `custom` without validation or revealing errors.

  **Signature:** `() => Promise<{ address: { name?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; organization?: string | undefined; organization_type?: "business" | "individual" | undefined; line1?: string | undefined; line2?: string | undefined; city?: string | undefined; state?: string | undefined; postal_code?: string | undefined; country: string; }; custom: Record<string, string>; }>`

  ### `mount`

  Mounts the element in `target` and starts loading. React components mount themselves.

  **Signature:** `(target: string | HTMLElement) => void`

  ### `destroy`

  Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

  **Signature:** `() => void`

  ### `update`

  Merges new props into the mounted element. In React, change the component props instead.

  **Signature:** `(options: Partial<AddressElementProps>) => void`

  ## Styling

  Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

  | Class                            | Targets                                                                                             |
  | -------------------------------- | --------------------------------------------------------------------------------------------------- |
  | `.whop-Address`                  | The address form root                                                                               |
  | `.whop-AddressErrorSummary`      | The summary line shown when validation reveals missing or invalid fields                            |
  | `.whop-AddressField`             | One field cell in the address form                                                                  |
  | `.whop-AddressFieldError`        | The error line under an address field (full layout)                                                 |
  | `.whop-AddressFieldInput`        | A text input in the address form                                                                    |
  | `.whop-AddressFieldInputInvalid` | Added to an address input while it fails validation                                                 |
  | `.whop-AddressFieldInvalid`      | Added to a compact field cell while it fails validation                                             |
  | `.whop-AddressFieldLabel`        | Address field label in full layout                                                                  |
  | `.whop-AddressFieldSelect`       | A select (country, state, organization type) in the address form                                    |
  | `.whop-AddressLine2Toggle`       | Collapsed address line 2 toggle                                                                     |
  | `.whop-AddressManualEntry`       | The "Enter address manually" text button below the collapsed form — expands the full country format |
  | `.whop-AddressSuggestion`        | One suggestion row in the autocomplete overlay                                                      |
  | `.whop-AddressSuggestionActive`  | Added to the keyboard/pointer-active suggestion row                                                 |
  | `.whop-AddressSuggestionManual`  | The "Enter address manually" row closing the suggestions list                                       |
  | `.whop-AddressSuggestions`       | The autocomplete suggestions overlay anchored to the address line 1 field                           |
  | `.whop-AddressSuggestionsEmpty`  | The quiet line shown when the query settled with no address matches                                 |

  ```ts theme={null}
  const payments = whop.payments.create({
    appearance: {
      classes: {
        'whop-Address': { borderRadius: '8px', fontWeight: '600' },
        'whop-AddressErrorSummary': { borderRadius: '8px', fontWeight: '600' },
        'whop-AddressField': { borderRadius: '8px', fontWeight: '600' }
      }
    }
  });

  // 16 classes use this shape
  payments.update({
    appearance: { classes: { 'whop-Address': { fontWeight: '700' } } }
  });
  ```

  In React, pass `appearance` to `<Payments>`. Set it globally with `WhopElements({ appearance })`.
</div>

<div data-whop-platform="swift" style={{ display: "none" }}>
  ## Parameters

  <ResponseField name="manager" type="AddressElementManager?">
    Reads and validates the address outside the view. Keep one with `@State`, then call `validate()` before submitting.
  </ResponseField>

  <ResponseField name="layout" type="AddressElement.Layout">
    `.full` labels every field and stacks them; `.compact` moves the labels into placeholders. Defaults to `.full`.
  </ResponseField>

  <ResponseField name="scope" type="AddressElement.Scope">
    `.full` collects the country's whole address format; `.minimal` collects country and postal code only. Defaults to `.full`.
  </ResponseField>

  <ResponseField name="name" type="AddressElement.NameFields">
    `.combined` for one full-name field, `.split` for first and last, `.none` to leave the name out. Defaults to `.combined`.
  </ResponseField>

  <ResponseField name="organization" type="AddressElement.OrganizationFields">
    `.none`, `.name` for an organization name, or `.nameWithType` to also ask whether it is a business or an individual. Defaults to `.none`.
  </ResponseField>

  <ResponseField name="line2" type="AddressElement.Line2Field">
    `.always` shows the second line, `.toggle` reveals it with a button, `.never` leaves it out. Defaults to `.always`.
  </ResponseField>

  <ResponseField name="defaultValues" type="WhopAddress?">
    Values to start from. Its `country` is an ISO 3166-1 alpha-2 code and takes precedence over country detection.
  </ResponseField>

  <ResponseField name="detectCountry" type="Bool">
    Uses the device region when `true`. Falls back to `countryHint`, then US. Defaults to `true`.
  </ResponseField>

  <ResponseField name="allowedCountries" type="[String]?">
    Restrict the country picker to these ISO 3166-1 alpha-2 codes. Defaults to every country.
  </ResponseField>

  <ResponseField name="countryHint" type="String?">
    ISO 3166-1 alpha-2 fallback for the country chain, for example one derived from the buyer's currency.
  </ResponseField>

  <ResponseField name="autocomplete" type="Bool">
    Shows street suggestions as the buyer types. Disable it to show every field immediately. Defaults to `true`.
  </ResponseField>

  <ResponseField name="onChange" type="((WhopAddressSnapshot) -> Void)?">
    Called on every edit with the current snapshot.
  </ResponseField>

  ## `WhopAddressSnapshot`

  What a selection hands back:

  * `isComplete: Bool`: every field the country requires is filled and valid
  * `address: WhopAddress`: what the buyer has entered so far
  * `errors: [WhopAddressField: WhopAddressFieldError]`: empty exactly when `isComplete` is true

  ## States

  The form renders immediately. `manager.validate()` reveals field errors and returns the current snapshot. `errors` is empty when `isComplete` is true. With autocomplete at `.full` scope, locality fields appear after a suggestion or manual entry. Disable autocomplete to show every field immediately.

  ## Good to know

  * MapKit provides street suggestions on-device. Whop doesn't receive the buyer's query as they type.
  * `defaultValues.country` overrides detection. Detection falls back to `countryHint`, then US.
  * `WhopAddress` uses the web payload and confirmation-token `billing_details` keys. The same JSON works across platforms.

  <Note>
    Call `WhopSDK.configure(tokenProvider:)` once at launch. Views wait for the token. See [Getting started](/elements/upcoming/getting-started). Apply a theme with `.whopTheme(_:)`.
  </Note>
</div>
