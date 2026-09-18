> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Permission

A Permission is one action, such as `stats:read`, paired with whether your credential is granted it on a given resource. It answers for whatever you authenticated with, so you can decide what to show or attempt instead of discovering a `403`.

Use the Permissions API to check an account, product, experience, or app, narrowing to the actions you care about. It reports only your own access — to manage who else can reach an account, use the Team Members API.

## Endpoints

| Endpoint                                                               | Request                                                         |
| ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| [Check Permissions](/api-reference/beta/permissions/check-permissions) | <Badge color="blue" size="sm" stroke>GET</Badge> `/permissions` |
