> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CLI

> Install the Whop CLI, sign in, and choose or create the business you want to manage from your terminal.

The Whop CLI (`whop`) lets you build and manage your Whop business from the terminal. Deploy apps, create products, set pricing, get shareable checkout links, run ads, and pull your stats — every command also works non-interactively for scripts and AI agents.

## Install

<CodeGroup>
  ```bash macOS / Linux theme={null}
  curl -fsSL https://whop.com/install.sh | sh
  ```

  ```bash Homebrew theme={null}
  brew install whopio/tap/whop
  ```

  ```bash npm theme={null}
  npm install -g @whop/cli
  ```
</CodeGroup>

<Note>
  Prebuilt binaries cover macOS and Linux. On other platforms, install via npm (requires Node.js 22 or later).
</Note>

Confirm it works:

```bash theme={null}
whop --version
```

## Get started

Run the CLI with no arguments:

```bash theme={null}
whop
```

That's it — it signs you in through your browser and lets you choose or create the business the CLI should use.

Run `whop quickstart` later to select a different business or create another one. Then use `whop --help` to choose a workflow, such as deploying an app with `whop apps deploy` or managing products and pricing directly.

## Everyday commands

```bash theme={null}
whop --help                  # all commands
whop products list           # what you're selling
whop plans create --help     # options for any command
whop checkout-configurations create --plan_id plan_xxx   # shareable checkout link
whop stats time_series       # your numbers
whop accounts get jordan                # retrieve a business by route
```

Every command takes `--format json` for structured output, and most groups follow the same shape: `whop <resource> list|get|create|update`.

Commands that act on one account take the business's `biz_` ID or public route positionally. Account-scoped commands use the selected business by default. Pass `--account_id` to choose a different scope. Account preferences and reserves remain account-scoped.

| Command group                         | What it manages                                             |
| ------------------------------------- | ----------------------------------------------------------- |
| `products`, `plans`                   | The things you sell and their pricing                       |
| `checkout-configurations`             | Shareable, prefilled checkout links                         |
| `members`, `memberships`              | Who bought from you, and the access they hold               |
| `payouts`, `transfers`, `ledgers`     | Moving money and reading balances                           |
| `disputes`, `resolution-center-cases` | Chargebacks and buyer–merchant cases                        |
| `stats`, `exports`                    | Financial time series, and CSV dumps of any dashboard table |
| `notifications`                       | The user's feed, and sends from your app                    |
| `apps`                                | Fully hosted web apps on `*.whop.app`                       |
| `ads`, `ad-campaigns`, `ad-groups`    | Paid acquisition                                            |
| `auth`                                | Profiles, switching accounts, API keys                      |

## Deploy an app

```bash theme={null}
whop apps deploy
```

One command verifies that the current directory contains a Whop-ready Vite app. If not, it offers to scaffold a new app or link an existing one. It then builds, type-checks, uploads, and promotes the build to production. Pass `--preview` to upload a preview build and `whop apps builds promote <build_id>` to ship it later.

For a site visitors browse at `<route>.whop.app`, see [Websites](/developer/websites/overview).

After a deploy, pass the app ID to read its server-runtime logs — every `console.log`, uncaught exception, and failed request, kept for 7 days:

```bash theme={null}
whop apps logs app_xxxxxxxx
whop apps logs app_xxxxxxxx --level error
whop apps logs app_xxxxxxxx --query "checkout"
```

Use `--created_after` and `--created_before` with ISO 8601 timestamps to select a time window.

<Note>
  `whop apps logs` captures the hosted server runtime. Check your browser's developer console for client-side JavaScript errors.
</Note>

## Manage app secrets

App secrets are key-value environment bindings for your app. They're encrypted at rest and injected into the hosted server runtime. `whop apps dev` also injects them locally, except names that control the local runtime.

```bash theme={null}
whop apps secrets list
whop apps secrets set --secret MAIL_API_KEY=mail-key-123
whop apps secrets unset --key MAIL_API_KEY
```

Run these commands inside a linked project, or pass `--app app_xxxxxxxx` to target an app explicitly. During `whop apps dev`, an environment variable exported on your machine takes precedence over a stored app secret.

<Note>
  App secrets are runtime configuration, not app API keys. `whop apps secrets` doesn't create or rotate the app's `WHOP_API_KEY`. See [App API keys](/developer/api/getting-started#app-api-keys) to find that credential.
</Note>

## Use it with coding assistants

The CLI is self-describing, so agents can discover and drive every command:

```bash theme={null}
whop --llms          # machine-readable manifest of all commands
whop mcp add         # automatically register with supported coding agents
whop skills add      # install the Whop agent skill
```

For non-interactive use — CI, scripts, or headless agents — set `WHOP_API_KEY` instead of logging in. For API commands, it takes precedence over any saved CLI profile for that invocation. Create a key under **Developer → API keys** in your [dashboard](https://whop.com/dashboard).

```bash theme={null}
WHOP_API_KEY=whop_xxx whop products list --format json
```

<Note>
  `whop api-keys permissions` lists the permissions that can be assigned to API keys. Creating, listing, updating, rotating, and revoking keys requires a first-party dashboard session, so those operations aren't exposed by the CLI. Manage keys in your [Whop dashboard](https://whop.com/dashboard).
</Note>

## Update

The CLI keeps itself up to date in the background. To update immediately:

```bash theme={null}
whop upgrade
```
