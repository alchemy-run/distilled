> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# App

An App is software you build on Whop. It can be a hosted web app served at `<route>.whop.app` or an API integration installed as an experience, and it belongs to the account that owns its credentials, settings, builds, and runtime logs.

Use the Apps API to manage app configuration, deploy an app's working copy and follow the run on the app's `deployment` field, and, for hosted apps, read server runtime logs for console output, uncaught exceptions, and failed requests. Logs are retained for 7 days and can be filtered by build, level, time window, and message text.

Apps are also reusable blueprints. List official blueprints with `app_type=website&verified=true&order=template_usage`, or community blueprints with `app_type=website&verified=false&recommended=true&order=template_usage`. Pass the returned App `id` as `blueprint_id` when creating an Account.

<Note>
  Replaces the Legacy [Apps](/api-reference/apps/app) resource. Existing Legacy
  integrations keep working; see [API versions](/developer/api/versioning) for
  the stability contract.
</Note>

## Endpoints

| Endpoint                                                                  | Request                                                                       |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [List Apps](/api-reference/beta/apps/list-apps)                           | <Badge color="blue" size="sm" stroke>GET</Badge> `/apps`                      |
| [Create App](/api-reference/beta/apps/create-app)                         | <Badge color="green" size="sm" stroke>POST</Badge> `/apps`                    |
| [Retrieve App](/api-reference/beta/apps/retrieve-app)                     | <Badge color="blue" size="sm" stroke>GET</Badge> `/apps/{id}`                 |
| [Update App](/api-reference/beta/apps/update-app)                         | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/apps/{id}`             |
| [Delete App](/api-reference/beta/apps/delete-app)                         | <Badge color="red" size="sm" stroke>DELETE</Badge> `/apps/{id}`               |
| [Deploy App](/api-reference/beta/apps/deploy-app)                         | <Badge color="green" size="sm" stroke>POST</Badge> `/apps/{id}/deploy`        |
| [List App Logs](/api-reference/beta/apps/list-app-logs)                   | <Badge color="blue" size="sm" stroke>GET</Badge> `/apps/{id}/logs`            |
| [Update App Permissions](/api-reference/beta/apps/update-app-permissions) | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/apps/{id}/permissions` |
