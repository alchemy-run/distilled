> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update & delete

> Update identity fields before verification, or remove a verification entirely.

## Update a verification

Update fields on a verification that Whop hasn't approved yet. Use this to correct pre-filled data before the user completes Know Your Customer (KYC) verification.

```bash cURL theme={null}
curl -X PATCH https://api.whop.com/api/v1/verifications/idpf_xxxxxxxxxxxxx \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Janet",
    "last_name": "Smith"
  }'
```

### Updatable fields

| Field                | Description                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `first_name`         | Legal first name                                                                                                             |
| `last_name`          | Legal last name                                                                                                              |
| `date_of_birth`      | International Organization for Standardization (ISO) date                                                                    |
| `country`            | ISO alpha-2 country code                                                                                                     |
| `personal_address`   | Residential address object                                                                                                   |
| `business_name`      | Legal business name                                                                                                          |
| `business_address`   | Registered business address                                                                                                  |
| `business_structure` | Legal entity structure — every value and its countries in [Business structures](/developer/verification/business-structures) |

<Warning>
  You can't update a verification that's already `approved`. The identity data is locked once verified. Delete it and create a new one if you need to start over.
</Warning>

## Delete a verification

Remove a verification from an account. Whop retains the data but detaches the verification and removes it from the list.

```bash cURL theme={null}
curl -X DELETE https://api.whop.com/api/v1/verifications/idpf_xxxxxxxxxxxxx \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

```json Response theme={null}
{
  "id": "idpf_xxxxxxxxxxxxx",
  "deleted": true
}
```

After deleting, call `POST /api/v1/verifications` to start fresh with a new verification.

<Note>
  Deleting doesn't cancel an in-flight KYC session — it removes the verification link from the account. The session expires on its own.
</Note>

## Restart a verification

If Whop declined a user's KYC verification or they need to redo it, you don't need to delete and recreate it. Call create with `restart: true`:

```bash cURL theme={null}
curl -X POST https://api.whop.com/api/v1/verifications \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": "biz_xxxxxxxxxxxxx",
    "kind": "individual",
    "restart": true
  }'
```

This abandons the old session and gives you a fresh `session_url`.

## Authentication

All write endpoints require an Account API key with the `identity:write` scope.

### Errors

| Status | Message                                   | When                                          |
| ------ | ----------------------------------------- | --------------------------------------------- |
| `400`  | `Cannot update an approved verification.` | Profile is already verified                   |
| `400`  | `at least one field is required`          | Empty request body                            |
| `401`  | —                                         | Missing or invalid API key                    |
| `403`  | —                                         | API key lacks `identity:write` scope          |
| `404`  | `Verification not found`                  | The `idpf_` ID doesn't exist or isn't visible |
