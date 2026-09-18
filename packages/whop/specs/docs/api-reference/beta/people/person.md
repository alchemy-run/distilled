> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# People

A Person is an identity-linked profile of a visitor or customer of an account, assembled from every [event](/api-reference/beta/events/event) the person generated — pixel page views, ad clicks, leads, identifies, and payments. Each profile carries the person's known identities (names, emails, phones, user IDs), purchase history and LTV, geo/device profile, traffic sources, and the first and last marketing touches that reached them.

Use the People API to list and segment the people of an account — filter by activity, purchases, traffic source, location, or marketing touch, and sort by value — or retrieve one person by person ID, user ID, email address, or phone number.

## Endpoints

| Endpoint                                                      | Request                                                         |
| ------------------------------------------------------------- | --------------------------------------------------------------- |
| [List People](/api-reference/beta/people/list-people)         | <Badge color="blue" size="sm" stroke>GET</Badge> `/people`      |
| [Retrieve Person](/api-reference/beta/people/retrieve-person) | <Badge color="blue" size="sm" stroke>GET</Badge> `/people/{id}` |
