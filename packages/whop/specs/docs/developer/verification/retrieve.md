> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Check status

> List verifications for an account and read verified identity data.

## List verifications for an account

Pass the account's `biz_` tag as the `account_id` query parameter to get all verifications for that account. An account has at most two — one individual Know Your Customer (KYC) verification and one Know Your Business (KYB) verification.

```bash cURL theme={null}
curl "https://api.whop.com/api/v1/verifications?account_id=biz_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

```json Response theme={null}
{
  "data": [
    {
      "id": "idpf_xxxxxxxxxxxxx",
      "kind": "individual",
      "status": "approved",
      "first_name": "Jane",
      "last_name": "Doe",
      "date_of_birth": "1995-01-15",
      "country": "US",
      "address": {
        "line1": "123 Main St",
        "city": "San Francisco",
        "state": "CA",
        "postal_code": "94105"
      },
      "requested_information": [],
      "created_at": "2026-06-03T22:15:00Z",
      "updated_at": "2026-06-04T10:00:00Z"
    }
  ]
}
```

## Retrieve a single verification

Pass an `idpf_` tag in the path to read one profile directly.

```bash cURL theme={null}
curl https://api.whop.com/api/v1/verifications/idpf_xxxxxxxxxxxxx \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

The response is a single verification object (the same shape as an entry in the list's `data` array).

## Statuses

| Status            | What it means                      | What to do                                                                                |
| ----------------- | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| `pending`         | User hasn't completed KYC yet      | Send them to `session_url`                                                                |
| `approved`        | Identity verified                  | User can transact                                                                         |
| `rejected`        | KYC declined                       | Create a new verification with `restart: true`                                            |
| `action_required` | Whop needs more information        | Check the `requested_information` array — see [Handle RFIs](/developer/verification/rfis) |
| `not_started`     | Profile exists, no session started | Call create to start                                                                      |

<Note>
  `session_url` only appears when `status` is `pending` — it means the user still needs to complete KYC. Once approved or rejected, the URL is gone.
</Note>

## Response fields

Fields depend on `kind`. Individual verifications return personal fields, business verifications return company fields.

### Individual (`kind: "individual"`)

| Field           | Type     | Description                                                                   |
| --------------- | -------- | ----------------------------------------------------------------------------- |
| `first_name`    | `string` | Verified legal first name                                                     |
| `last_name`     | `string` | Verified legal last name                                                      |
| `date_of_birth` | `string` | International Organization for Standardization (ISO) date (e.g. `1995-01-15`) |
| `country`       | `string` | ISO country code                                                              |
| `address`       | `object` | Verified residential address                                                  |

### Business (`kind: "business"`)

| Field                | Type     | Description                                                                                                                                             |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `business_name`      | `string` | Verified legal entity name                                                                                                                              |
| `business_structure` | `string` | Legal entity structure, such as `private_corporation` or `sole_proprietorship` — see [Business structures](/developer/verification/business-structures) |
| `country`            | `string` | ISO country code                                                                                                                                        |
| `address`            | `object` | Registered business address                                                                                                                             |

## Authentication

Requires an Account API key with the `identity:read` scope.

### Errors

| Status | Message                  | When                                                  |
| ------ | ------------------------ | ----------------------------------------------------- |
| `400`  | `account_id is required` | No `biz_` tag provided                                |
| `401`  | —                        | Missing or invalid API key                            |
| `403`  | —                        | API key lacks `identity:read` scope                   |
| `404`  | `Account not found`      | The `biz_` tag doesn't exist or you don't have access |
