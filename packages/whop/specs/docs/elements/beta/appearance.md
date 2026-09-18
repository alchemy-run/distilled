> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Appearance

> Theme, CSS variables, and per-part styling for every element.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

One `appearance` object styles every element. Pass it globally at construction, per group at `create()` (or as React props), and change it live at any point with `update({ appearance })`. Mounted elements restyle in place.

```ts theme={null}
const payments = whop.payments.create({
  appearance: {
    theme: { appearance: 'dark', accentColor: 'blue' },
    variables: { '--radius': '8px' },
    classes: { /* per-part declarations, see below */ }
  }
});
```

## Theme

The high-level design tokens. Every field is optional and fully typed. The values below are enumerated from the source types:

<ResponseField name="appearance" type="&#x22;light&#x22; | &#x22;dark&#x22;">
  The color scheme to use. - `"light"` - Light mode with dark text on light backgrounds - `"dark"` - Dark mode with light text on dark backgrounds
</ResponseField>

<ResponseField name="accentColor" type="AccentColor">
  The primary accent color used for interactive elements. One of `ruby`, `blue`, `red`, `yellow`, `green`, `gray`, `tomato`, `crimson`, `pink`, `plum`, `purple`, `violet`, `iris`, `cyan`, `teal`, `jade`, `grass`, `brown`, `orange`, `indigo`, `sky`, `mint`, `amber`, `lime`, `lemon`, `magenta`, `gold`, `bronze`.
</ResponseField>

<ResponseField name="grayColor" type="&#x22;gray&#x22; | &#x22;mauve&#x22; | &#x22;slate&#x22; | &#x22;sage&#x22; | &#x22;olive&#x22; | &#x22;sand&#x22; | &#x22;auto&#x22;">
  The gray color palette to use for neutral elements. Use `"auto"` to automatically match the accent color.
</ResponseField>

<ResponseField name="dangerColor" type="&#x22;ruby&#x22; | &#x22;red&#x22; | &#x22;tomato&#x22;">
  The color used for error states and destructive actions.
</ResponseField>

<ResponseField name="warningColor" type="&#x22;yellow&#x22; | &#x22;amber&#x22;">
  The color used for warning states.
</ResponseField>

<ResponseField name="successColor" type="&#x22;green&#x22; | &#x22;teal&#x22; | &#x22;jade&#x22; | &#x22;grass&#x22;">
  The color used for success states.
</ResponseField>

<ResponseField name="infoColor" type="&#x22;sky&#x22; | &#x22;blue&#x22;">
  The color used for informational states.
</ResponseField>

## Variables

CSS custom properties (variables) that can be used to customize element styles. Keys must start with `--` prefix.

```ts theme={null}
appearance: { variables: { "--radius": "8px" } }
```

## Classes

Style declarations for each `whop-*` class name. Each entry restyles one documented part of an element. See the Styling section on each element page for its class list. The framework checks each declaration, then injects the sanitized result inside the element's frame because page stylesheets cannot reach it.

A style declaration object that maps CSS properties to values, like React's `CSSProperties`. Property names can use camel case (`fontWeight`) or kebab case (`font-weight`). The framework normalizes each name and checks it against the list of safe properties before applying it.

```ts theme={null}
appearance: {
  classes: {
    "whop-SomePart": { borderRadius: "8px", fontWeight: "600" },
  },
}
```

Find each element's part list in the **Styling** section of its page.
