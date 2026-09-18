> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Events

An Event records conversion or engagement activity for an account, such as page views, purchases, or leads. Each event ties the action to the [person](/api-reference/beta/people/person) who took it, so activity can be attributed to the ads and links that drove it.

Use the Events API to send new tracking events, list recent identity-linked events for an account, and inspect the events recorded for a person. The resource also exposes an anonymized read mode — the pulse feed — a platform-wide snapshot of recent purchases that carries nothing identifying. The pulse feed is public; other Events endpoints require authentication and are scoped to an account.

Events are only as good as the pixel sending them, so [Validate Pixel](/api-reference/beta/events/validate-pixel) answers whether an account's pixel is working: it reads the events the pixel has sent, and when you pass a `url` whose page hasn't sent any lately, it fetches that page and looks for the pixel in its source. Use it before launching an ad to confirm its destination is tracked, or in a setup flow to tell a merchant whether their install is live.

## Endpoints

| Endpoint                                                                      | Request                                                                     |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [List Events](/api-reference/beta/events/list-events)                         | <Badge color="blue" size="sm" stroke>GET</Badge> `/events`                  |
| [Create Event](/api-reference/beta/events/create-event)                       | <Badge color="green" size="sm" stroke>POST</Badge> `/events`                |
| [Retrieve the pulse feed](/api-reference/beta/events/retrieve-the-pulse-feed) | <Badge color="blue" size="sm" stroke>GET</Badge> `/events/pulse`            |
| [Validate Pixel](/api-reference/beta/events/validate-pixel)                   | <Badge color="green" size="sm" stroke>POST</Badge> `/events/validate_pixel` |
