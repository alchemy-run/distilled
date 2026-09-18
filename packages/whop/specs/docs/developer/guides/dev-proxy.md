> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Development Proxy

> Run the Whop development proxy to replicate production authentication and iframe behavior during development.

In production, your app runs inside the Whop iframe behind a reverse proxy that injects the `x-whop-user-token` header on every request. Every Whop app verifies that token through [`whopsdk.verifyUserToken`](/developer/guides/authentication), so you need the same header on `localhost` to test with real users. The development proxy injects it for you.

<Warning>
  `verifyUserToken` is not available in the current `@whop/sdk`. The header described here is still injected as documented.
</Warning>

## Pick your setup

There are two installation modes. Both ship the same proxy binary. The difference is whether the proxy spawns your development server or runs alongside it.

|                 | Wrapped (Node/JS)                                               | Standalone                                                       |
| --------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Best for**    | Next.js, Express, anything with a node-based development script | Python, Ruby, Go, anything non-JS                                |
| **How it runs** | `whop-proxy --command 'next dev'` spawns your server            | Your server runs on a port, and the proxy forwards to it         |
| **Port**        | One port (proxy + server)                                       | Two ports (proxy on 3000, server on e.g. 5000)                   |
| **Install**     | `pnpm add -D @whop-apps/dev-proxy`                              | `pnpm dlx @whop-apps/dev-proxy --standalone` (no install needed) |

## `Next.js` and `JavaScript` app

<Steps>
  <Step title="Add the proxy as a development dependency">
    <CodeGroup>
      ```bash pnpm theme={null}
      pnpm add -D @whop-apps/dev-proxy
      ```

      ```bash bun theme={null}
      bun install -D @whop-apps/dev-proxy
      ```

      ```bash npm theme={null}
      npm install -D @whop-apps/dev-proxy
      ```

      ```bash yarn theme={null}
      yarn add -D @whop-apps/dev-proxy
      ```
    </CodeGroup>
  </Step>

  <Step title="Update the dev script in package.json">
    Update the `dev` script in `package.json` to include the proxy.

    ```json theme={null}
    "scripts": {
        "dev": "whop-proxy --command 'next dev --turbopack'",
    }
    ```

    <Note>
      You can update the `dev` command to match your framework requirements.
      You can also wrap other commands with the proxy in a similar way.
    </Note>
  </Step>

  <Step title="Run the proxy">
    <CodeGroup>
      ```bash pnpm theme={null}
      pnpm dev
      ```

      ```bash npm theme={null}
      npm run dev
      ```

      ```bash yarn theme={null}
      yarn dev
      ```
    </CodeGroup>
  </Step>
</Steps>

## Standalone mode (other frameworks)

<Steps>
  <Step title="Run your app locally">
    Run your app on your local machine on some port, for example 5000.

    <CodeGroup>
      ```bash Python + FastAPI theme={null}
      uvicorn main:app --port 5000
      ```

      ```bash Ruby on Rails theme={null}
      rails server -p 5000
      ```

      ```bash Go theme={null}
      go run main.go --port 5000
      ```
    </CodeGroup>
  </Step>

  <Step title="Run the proxy in standalone mode">
    <CodeGroup>
      ```bash pnpm theme={null}
      pnpm dlx @whop-apps/dev-proxy --standalone --upstreamPort=5000 --proxyPort=3000
      ```

      ```bash bun theme={null}
      bunx @whop-apps/dev-proxy --standalone --upstreamPort=5000 --proxyPort=3000
      ```

      ```bash npm theme={null}
      npx @whop-apps/dev-proxy --standalone --upstreamPort=5000 --proxyPort=3000
      ```

      ```bash yarn theme={null}
      yarn dlx @whop-apps/dev-proxy --standalone --upstreamPort=5000 --proxyPort=3000
      ```
    </CodeGroup>

    <Note>
      This will run the proxy as an independent process. It will start a server on
      port 3000 and forward requests to port 5000 and append the user token in the
      headers.
    </Note>
  </Step>
</Steps>

## Proxy command options

Configure the proxy with the following command-line options:

```bash theme={null}
Usage: pnpm dlx @whop-apps/dev-proxy [options]

Options:

--proxyPort <port>      The port the proxy should listen on (3000 by default)
--upstreamPort <port>   The port the upstream server is listening on (set automatically by default)
--npmCommand <command>  The npm command to run to start the upstream server (dev by default)
--command <command>     The command to run to start the upstream server (npm run dev by default)
--standalone            Run the proxy as an independent process proxying requests from one port to another port. Ignores the command / npmCommand options.
```

## Next steps

<CardGroup cols={2}>
  <Card title="Authentication" href="/developer/guides/authentication">
    Verify the iframe user token in the same code locally and in production.
  </Card>

  <Card title="Listen to webhooks" href="/developer/guides/webhooks">
    Forward Whop webhooks to localhost while developing (use ngrok or Cloudflare Tunnel).
  </Card>

  <Card title="Build app views" href="/developer/guides/app-views">
    Set up the iframe entry points your app will render inside.
  </Card>

  <Card title="Request permissions" href="/developer/guides/permissions">
    Configure the scopes your app needs before publishing.
  </Card>
</CardGroup>
