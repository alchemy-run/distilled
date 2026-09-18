> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Core concepts

> The account model, connected accounts, and how money moves through Whop.

Three ideas carry most of the Whop API.

**Accounts** are the businesses and people everything else attaches to. Your API key acts on behalf of an account, and most resources belong to one. Start with the [Accounts resource](/api-reference/beta/accounts/account).

**Connected accounts** are accounts you enroll and act for when you run a marketplace or platform: you collect payments on their behalf and pay them out. The [platforms quickstart](/developer/platforms/quickstart) walks the whole flow.

**Money movement** runs through ledgers. Money arrives through payments and deposits, sits on a ledger balance, and leaves through payouts and transfers. See [ledger activity](/api-reference/beta/ledgers/ledger-activity) and the Money section of the [API overview](/api-reference/beta/overview).

## Next steps

<CardGroup cols={2}>
  <Card title="Quickstart" icon="rocket" href="/developer/api/quickstart">
    Make your first API call in a few minutes.
  </Card>

  <Card title="Test in sandbox" icon="flask" href="/developer/guides/sandbox">
    Try everything against test data before going live.
  </Card>

  <Card title="API overview" icon="map" href="/api-reference/beta/overview">
    How requests, versioning, and pagination work.
  </Card>

  <Card title="Choose your integration" icon="signs-post" href="/developer/start">
    Jump to the guide for what you're building.
  </Card>
</CardGroup>
