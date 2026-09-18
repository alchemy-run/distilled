> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

> Verify the current user and check their access level inside your Whop app.

Whop apps render inside an iframe on `whop.com`. To figure out *who* is making a request to your app, Whop passes a short-lived JSON Web Token (JWT) in the `x-whop-user-token` header on every same-origin request. You verify this token with the SDK to get a user ID, then check what that user can see.

## Verify the iframe user token

<Warning>
  `verifyUserToken` isn't available in the current `@whop/sdk`, so the TypeScript snippets on this page are kept for reference and won't run as written. Python is different: `whop-sdk` ships the helper as `whop_sdk.lib.verify_user_token`, which needs PyJWT installed alongside it (`pip install "pyjwt[crypto]"`). The `whop_sdk` gem ships it too, but as a module function under a different root namespace from the client: `WhopSDK::Helpers::VerifyUserToken.verify_user_token!`, where the client is `Whop_sdk::Client`. It's not a method on the client, and the gem already depends on `jwt`.
</Warning>

Call `verifyUserToken` on each request. It reads the `x-whop-user-token` header, validates the JWT signature and expiry, and returns the user ID. Invalid tokens throw by default. TypeScript and Python also offer a non-throwing variant:

| Language   | Non-throwing variant                                                           |
| ---------- | ------------------------------------------------------------------------------ |
| TypeScript | Pass `{ dontThrow: true }` as the second argument                              |
| Python     | Call `try_verify_user_token`, which returns `None` instead of raising          |
| Ruby       | None. `verify_user_token!` is the only entry point, so rescue `StandardError`. |

<CodeGroup>
  ```typescript JS/TS + NextJS theme={null}
  import { headers } from "next/headers";
  import { whopsdk } from "@/lib/whop-sdk";

  export default async function MyServerRenderedPage() {
  	const { userId } = await whopsdk.verifyUserToken(await headers());

      // ... the rest of your component / api route etc...
  }
  ```

  ```javascript JS/TS + ExpressJS theme={null}
  import express from "express";
  import { whopsdk } from "./lib/whop-sdk";

  const app = express();

  app.get("/my-route", async (req, res) => {
      const { userId } = await whopsdk.verifyUserToken(req.headers);

      // ... the rest of your route handler
  });
  ```

  ```python Python + FastAPI theme={null}
  from fastapi import FastAPI, Request
  from whop_sdk.lib.verify_user_token import verify_user_token

  app = FastAPI()

  @app.get("/my-route")
  async def my_route(request: Request):
      # Synchronous, and app_id is required: it is checked against the token's audience.
      result = verify_user_token(request.headers, app_id="app_xxxxxxxxxxxxx")
      user_id = result.user_id

      # ... the rest of your route handler
  ```

  ```ruby Ruby on Rails theme={null}
  class MyController < ApplicationController
    def my_action
      # Give the helper a token string or a plain Hash, not an ActionDispatch headers object.
      # app_id is optional in Ruby. Pass it to check the token's audience.
      auth_result = WhopSDK::Helpers::VerifyUserToken.verify_user_token!(
        request.headers["x-whop-user-token"],
        app_id: "app_xxxxxxxxxxxxx",
      )
      user_id = auth_result.user_id

      # ... the rest of your controller action
    end
  end
  ```
</CodeGroup>

The token is only attached to requests hitting the `window.location.origin` of your iframe. Examples:

* Relative page navigation: `<a href="/sub_page">...</a>`
* Fetches without a domain: `await fetch("/api/quizzes")`

These resolve to your `App.base_url` domain.

<Accordion title="The API is on a different domain">
  If your frontend runs on `example.com` but your API runs on `api.example.com`, reverse-proxy API requests through `example.com/api` so they carry the `x-whop-user-token` header.

  * **Cloudflare**: create an ["origin rule"](https://developers.cloudflare.com/rules/origin-rules/features/#dns-record) from `/api` on `example.com` to rewrite to `api.example.com/api`.
  * **Next.js**: add a [rewrite](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites) in `next.config.mjs`.
  * **nginx / Caddy**: use the rewrite primitive in your server config.

  <Note>
    This setup is required because of strict browser cross-origin cookie policies.
  </Note>
</Accordion>

## Local setup

Whop ships a local reverse proxy that matches the production iframe and cookie behavior, so the code you write works identically on `localhost` and in production. See the [development proxy guide](/developer/guides/dev-proxy) for setup.

## Check access

Now that you know who's making the request, check what they're allowed to see. Use the [`checkAccess`](/api-reference/beta/users/check-user-access) method to verify access to an Experience, Account, or Product.

<CodeGroup>
  ```typescript JS/TS theme={null}
  import { whopsdk } from "@/lib/whop-sdk";

  const response = await whopsdk.users.checkAccess({
      id: "user_xxxxxxxxxxxxx",
      resource_id: "resource_id",
  });

  // Response:
  // {
  //   "has_access": true,
  //   "access_level": "customer"
  // }
  ```

  ```python Python theme={null}
  response = whopsdk.users.check_access(
      resource_id="resource_id",
      id="user_xxxxxxxxxxxxx",
  )

  # Response:
  # {
  #   "has_access": True,
  #   "access_level": "customer"
  # }
  ```

  ```ruby Ruby theme={null}
  response = whopsdk.users.check_access(
    resource_id: "resource_id",
    id: "user_xxxxxxxxxxxxx",
  )

  # Response:
  # {
  #   "has_access": true,
  #   "access_level": "customer"
  # }
  ```

  ```bash cURL theme={null}
  curl --request GET \
    --url https://api.whop.com/api/v1/users/{id}/access/{resource_id} \
    --header 'Authorization: Bearer <token>'
  ```
</CodeGroup>

### Resource IDs and access levels

| `resource_id` prefix | Checks access to |
| -------------------- | ---------------- |
| `biz_xxxx`           | Account          |
| `prod_xxxx`          | Product          |
| `exp_xxxx`           | Experience       |

The response's `access_level` is one of:

| Level       | Meaning                                                                                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customer`  | User has a valid membership. For an experience, they have a membership to any product connected to it. For a product, to that specific product. For an account, to any product on it. |
| `admin`     | User is a team member of the account (any role, including moderator).                                                                                                                 |
| `no_access` | User has no access (`has_access` is `false`).                                                                                                                                         |

### Customer app (experience view)

Customer apps should gate on the `experienceId` passed in path params. Return `no_access` or redirect if the viewer doesn't have a valid membership.

```typescript theme={null}
import { headers } from "next/headers";
import { whopsdk } from "@/lib/whop-sdk";

export default async function ExperiencePage({
    params,
}: {
    params: Promise<{ experienceId: string }>;
}) {
    const { experienceId } = await params;
    const { userId } = await whopsdk.verifyUserToken(await headers());

    const access = await whopsdk.users.checkAccess({
        id: userId,
        resource_id: experienceId,
    });

    if (!access.has_access) {
        return <div>Access denied</div>;
    }

    return <div>Welcome to the experience!</div>;
}
```

The same pattern works in an API route. Swap `headers()` for `request.headers` and return a `403 Response` instead of JSX.

### Dashboard app (dashboard view)

Dashboard apps should gate on `access_level === "admin"` so only account team members can load the view.

```typescript theme={null}
import { headers } from "next/headers";
import { whopsdk } from "@/lib/whop-sdk";

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ companyId: string }>;
}) {
    const { companyId } = await params;
    const { userId } = await whopsdk.verifyUserToken(await headers());

    const access = await whopsdk.users.checkAccess({
        id: userId,
        resource_id: companyId,
    });

    if (access.access_level !== "admin") {
        return <div>Admin access required</div>;
    }

    return <div>Welcome to the dashboard!</div>;
}
```

Same pattern in an API route. Swap `headers()` for `request.headers` and return a `403 Response` instead of JSX.

## Next steps

<CardGroup cols={2}>
  <Card title="Run a local development proxy" href="/developer/guides/dev-proxy">
    Match the production iframe + cookie setup on localhost.
  </Card>

  <Card title="Request permissions" href="/developer/guides/permissions">
    Add the scopes your app needs before publishing.
  </Card>

  <Card title="Listen to webhooks" href="/developer/guides/webhooks">
    Receive payment, membership, and entry events on your server.
  </Card>

  <Card title="Build an app view" href="/developer/guides/app-views">
    Set up dashboard views, experiences, and discover listings.
  </Card>
</CardGroup>
