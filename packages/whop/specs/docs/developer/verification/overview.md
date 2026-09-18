> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Verification

> Verify your users' identities before they can receive payouts. One API call starts Know Your Customer (KYC) verification, and Whop handles everything else.

## How it works

<Steps>
  <Step title="Start a verification">
    Call `POST /api/v1/verifications` with the account you want to verify. You get back a `session_url`.
  </Step>

  <Step title="Send the user to complete KYC">
    Redirect your user to the `session_url`. They upload their ID, take a selfie, and verify their identity on a hosted page. You don't build any UI for this.
  </Step>

  <Step title="Listen for the result">
    Subscribe to the `identity_profile.updated` webhook — it fires on every change to the profile (approved, rejected, needs action, or a review opening or clearing). The webhook tells you *which* profile changed, not its new state, so call `GET /api/v1/verifications?account_id={biz_ tag}` to read the current status and verified identity data.
  </Step>
</Steps>

## Quick example

```bash cURL theme={null}
curl -X POST "https://api.whop.com/api/v1/verifications?account_id=biz_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"kind": "individual"}'
```

```json Response theme={null}
{
  "id": "idpf_xxxxxxxxxxxxx",
  "kind": "individual",
  "status": "pending",
  "session_url": "https://in.sumsub.com/websdk/p/sbx_xxxxxxxxxxxxx",
  "created_at": "2026-06-03T22:15:00Z",
  "updated_at": "2026-06-03T22:15:00Z"
}
```

<Note>
  You need an Account API key with the `identity:write` scope. Go to your [dashboard](https://whop.com/dashboard) → Settings → API Keys to create one.
</Note>

## Pre-fill the identity verification form

Pass identity fields to skip steps for your user. These seed the verification form so they don't have to retype their name and address:

```bash cURL theme={null}
curl -X POST "https://api.whop.com/api/v1/verifications?account_id=biz_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "kind": "individual",
    "first_name": "Jane",
    "last_name": "Doe",
    "date_of_birth": "1995-01-15",
    "country": "US",
    "tax_identification_number": "123-45-6789",
    "address": {
      "line1": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94105"
    }
  }'
```

<Note>
  `tax_identification_number` is the person's tax identification number — their SSN for US
  individuals — and is **required when `country` is `US`**: the payout account
  can't be created without it. Send it as-is. It's tokenized in transit, and
  the raw value is never stored on Whop's systems.
</Note>

## Reuse a verification you already have

If you already verified this person with Sumsub, send their share token instead of putting them
through KYC a second time. Whop imports the identity your Sumsub account attested and checks it
with Whop's own requirements:

```bash cURL theme={null}
curl -X POST "https://api.whop.com/api/v1/verifications?account_id=biz_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"kind": "individual", "share_token": "_act-sbx-jwt-eyJhbGciOiJub25l"}'
```

```json Response theme={null}
{
  "id": "idpf_xxxxxxxxxxxxx",
  "kind": "individual",
  "status": "approved",
  "first_name": "Jane",
  "last_name": "Doe",
  "created_at": "2026-06-03T22:15:00Z",
  "updated_at": "2026-06-03T22:15:00Z"
}
```

<Steps>
  <Step title="Agree on Reusable KYC with Whop">
    Sumsub only releases applicant data between clients that have a Reusable KYC agreement. Whop
    gives you the client ID to share with once that's in place.
  </Step>

  <Step title="Generate a share token for the applicant">
    Call `POST https://api.sumsub.com/resources/accessTokens/shareToken` on your own Sumsub account
    with the applicant's ID and Whop's client ID as `forClientId`.
  </Step>

  <Step title="Send it to Whop">
    Pass the token as `share_token`. Each token works once.
  </Step>
</Steps>

The response tells you where it landed. `approved` means your verification covered everything Whop
needs and there is nothing left to do. `pending` with a `session_url` means it covered part of it —
send the user to that URL to finish only what's still missing. Whop rejects a token whose data
covers none of the requirements with a `400`.

<Note>
  `share_token` can't be combined with `documents` or `document_type` — each is a complete
  alternative to the hosted flow.
</Note>

## Two types of verification

| Type             | `kind`       | What it verifies    | When to use                              |
| ---------------- | ------------ | ------------------- | ---------------------------------------- |
| Individual (KYC) | `individual` | A person's identity | User wants to withdraw funds             |
| Business (KYB)   | `business`   | A business entity   | Account needs to verify its legal entity |

An account can have one of each — an individual KYC and a business KYB.

## What's next

<CardGroup cols={2}>
  <Card title="Check status" icon="magnifying-glass" href="/developer/verification/retrieve">
    Check verification status and read verified identity data.
  </Card>

  <Card title="Handle RFIs" icon="circle-exclamation" href="/developer/verification/rfis">
    Respond when Whop needs additional information like a bank statement.
  </Card>

  <Card title="Update & delete" icon="pen-to-square" href="/developer/verification/manage">
    Update identity fields or remove a verification.
  </Card>

  <Card title="API Reference" icon="code" href="/api-reference/verifications/verification">
    Full field reference for the verification object.
  </Card>
</CardGroup>
