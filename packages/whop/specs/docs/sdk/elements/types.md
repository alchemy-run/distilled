> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Types

> Shared type definitions for Whop embedded components

## Overview

This page documents the shared types used across Whop embedded components.

## EmbeddableElement

| Property  | Type                                             | Required | Default | Description |
| --------- | ------------------------------------------------ | -------- | ------- | ----------- |
| `mount`   | `(element: HTMLElement \| '#${string}') => void` | Yes      | -       | -           |
| `unmount` | `() => void`                                     | Yes      | -       | -           |

## CSSValue

A CSS property value.

```typescript theme={null}

type CSSValue = string

```

## CSSProps

A record of CSS properties and their values.

```typescript theme={null}

type CSSProps = { [x: string]: string; }

```

## Classes

A record of CSS class names to their style definitions.

```typescript theme={null}

type Classes = { [x: string]: CSSProps; }

```

See the [styling reference](/sdk/elements/styling-reference) for the full list of stable class names applied to embedded components.

## Variables

CSS custom properties (variables) that can be used to customize element styles.
Keys must start with `--` prefix.

```typescript theme={null}

type Variables = { [x: `--${string}`]: string; }

```

## AccentColor

Available accent colors for theming elements.

These colors are used for primary UI elements like buttons, links, and highlights.

```typescript theme={null}

type AccentColor = "ruby" | "blue" | "red" | "yellow" | "green" | "gray" | "tomato" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "cyan" | "teal" | "jade" | "grass" | "brown" | "orange" | "indigo" | "sky" | "mint" | "amber" | "lime" | "lemon" | "magenta" | "gold" | "bronze"

```

## Theme

Theme configuration for customizing the visual appearance of elements.

```typescript theme={null}
const theme: Theme = {
  appearance: "dark",
  accentColor: "blue",
  grayColor: "slate",
};
```

| Property       | Type                                                                                 | Required | Default | Description                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `appearance`   | `"light" \| "dark" \| undefined`                                                     | No       | -       | The color scheme to use. - '"light"' - Light mode with dark text on light backgrounds - '"dark"' - Dark mode with light text on dark backgrounds |
| `accentColor`  | [`AccentColor`](#accentcolor) \| undefined                                           | No       | -       | The primary accent color used for interactive elements.                                                                                          |
| `grayColor`    | `"gray" \| "mauve" \| "slate" \| "sage" \| "olive" \| "sand" \| "auto" \| undefined` | No       | -       | The gray color palette to use for neutral elements. Use '"auto"' to automatically match the accent color.                                        |
| `dangerColor`  | `"ruby" \| "red" \| "tomato" \| undefined`                                           | No       | -       | The color used for error states and destructive actions.                                                                                         |
| `warningColor` | `"yellow" \| "amber" \| undefined`                                                   | No       | -       | The color used for warning states.                                                                                                               |
| `successColor` | `"green" \| "teal" \| "jade" \| "grass" \| undefined`                                | No       | -       | The color used for success states.                                                                                                               |
| `infoColor`    | `"blue" \| "sky" \| undefined`                                                       | No       | -       | The color used for informational states.                                                                                                         |

## Appearance

Configuration for customizing the visual appearance of Whop elements.

Use this to match the embedded components to your application's design.

```typescript theme={null}
const appearance: Appearance = {
  theme: {
    appearance: "dark",
    accentColor: "blue",
  },
};

const whopElements = new WhopElements({ appearance });
```

| Property    | Type                                           | Required | Default | Description                                       |
| ----------- | ---------------------------------------------- | -------- | ------- | ------------------------------------------------- |
| `variables` | [`Variables`](#variables) \| null \| undefined | No       | -       | CSS custom properties to override default styles. |
| `classes`   | [`Classes`](#classes) \| null \| undefined     | No       | -       | Custom CSS classes to apply to elements.          |
| `theme`     | [`Theme`](#theme) \| null \| undefined         | No       | -       | Theme settings for colors and appearance mode.    |

## WhopElementsEnvironment

The environment to use for API calls.

* `"production"` - Use the live production API
* `"sandbox"` - Use the sandbox API for testing

```typescript theme={null}

type WhopElementsEnvironment = "production" | "sandbox"

```

## WhopElementsOptions

Configuration options for initializing WhopElements.

```typescript theme={null}
const whopElements = new WhopElements({
  appearance: {
    theme: { appearance: "light" },
  },
  locale: "en",
  environment: "production",
});
```

| Property      | Type                                                                                                | Required | Default      | Description                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `appearance`  | [`Appearance`](#appearance) \| undefined                                                            | No       | -            | Customize the appearance of the Whop embedded Elements. Includes theme settings like light/dark mode and accent colors. |
| `locale`      | `"en" \| "es" \| "zh" \| "nl" \| "pt" \| "de" \| "it" \| "fr" \| "ja" \| "pl" \| "tr" \| undefined` | No       | "en"         | The locale to use for all Elements. Controls the language and formatting of text, dates, and numbers.                   |
| `environment` | [`WhopElementsEnvironment`](#whopelementsenvironment) \| undefined                                  | No       | "production" | The environment to use for API calls. Use '"sandbox"' for testing without affecting production data.                    |
