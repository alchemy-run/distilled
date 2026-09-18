> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# App Build

An App Build is a versioned artifact uploaded for an app — a hosted web archive, or an iOS/Android bundle. Builds start as drafts, go through review, and one approved build per platform is served to users as the production build.

Use the App Builds API to upload a build for an app, list an app's builds with platform and status filters, retrieve a build, and promote a draft or approved build to production.

<Note>
  Replaces the Legacy [App builds](/api-reference/app-builds/app-build)
  resource. Existing Legacy integrations keep working; see [API
  versions](/developer/api/versioning) for the stability contract.
</Note>

## Endpoints

| Endpoint                                                                | Request                                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [List App Builds](/api-reference/beta/app-builds/list-app-builds)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/app_builds`                |
| [Create App Build](/api-reference/beta/app-builds/create-app-build)     | <Badge color="green" size="sm" stroke>POST</Badge> `/app_builds`              |
| [Retrieve App Build](/api-reference/beta/app-builds/retrieve-app-build) | <Badge color="blue" size="sm" stroke>GET</Badge> `/app_builds/{id}`           |
| [Promote App Build](/api-reference/beta/app-builds/promote-app-build)   | <Badge color="green" size="sm" stroke>POST</Badge> `/app_builds/{id}/promote` |
