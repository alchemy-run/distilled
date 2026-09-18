> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Identity documents

> Which identity documents the API accepts, and the exact file keys to send for each.

Verify a person entirely through the API by sending their identity document photos in the [Create Verification](/api-reference/beta/verifications/create-verification) request. No hosted session, no follow-up calls: one `POST`, then poll for the verdict.

## Which files to send

Pick the `document_type` that matches the document in the photograph. It decides exactly which keys the `documents` object must contain — nothing more, nothing less.

| `document_type`    | Required `documents` keys                                   |
| ------------------ | ----------------------------------------------------------- |
| `ID_CARD`          | `id_card_front`, `id_card_back`, `selfie`                   |
| `DRIVERS`          | `drivers_front`, `drivers_back`, `selfie`                   |
| `RESIDENCE_PERMIT` | `residence_permit_front`, `residence_permit_back`, `selfie` |
| `PASSPORT`         | `passport_front`, `selfie`                                  |

Every value is the file's raw bytes, base64-encoded:

```python theme={null}
import base64

def b64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()
```

## File rules

* Joint Photographic Experts Group (JPEG), Portable Network Graphics (PNG), or PDF. Whop detects the type from the file's actual bytes, so the extension doesn't matter.
* The `selfie` must be a JPEG or PNG photo of the person's face.
* 5MB maximum per file, measured before encoding.
* Send the complete set in one request. A missing, oversized, or unreadable file fails the whole request with an error naming the exact key — fix that file and send the same request again. Nothing partial is ever submitted.

## Full example

```bash theme={null}
curl -X POST "https://api.whop.com/api/v1/verifications?account_id=biz_XXXXXXXX" \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"first_name\": \"Jane\",
    \"last_name\": \"Doe\",
    \"date_of_birth\": \"1990-01-01\",
    \"country\": \"US\",
    \"phone\": \"+15551234567\",
    \"tax_identification_number\": \"123456789\",
    \"address\": { \"line1\": \"123 Main St\", \"city\": \"Austin\", \"state\": \"TX\", \"postal_code\": \"73301\" },
    \"business_website\": \"https://example.com\",
    \"document_type\": \"DRIVERS\",
    \"documents\": {
      \"drivers_front\": \"$(base64 -i front.jpg)\",
      \"drivers_back\": \"$(base64 -i back.jpg)\",
      \"selfie\": \"$(base64 -i selfie.jpg)\"
    }
  }"
```

A `201` means Whop accepted every document and started the review — the response's `required_documents` lists each key as `submitted`. Poll [Retrieve Verification](/api-reference/beta/verifications/retrieve-verification) until `status` becomes `approved` or `rejected`.

<Note>
  `business_website` is optional. When omitted, the account's whop.com page is used for payout setup. If you send one, it must be an external site or social link. Whop store pages are rejected.
</Note>

## If Whop rejects a document

When the reviewer can't accept a photo, `status` returns to `action_required` and the rejected keys appear in `required_documents` as `pending_upload` with a `rejection_reason`. Send the same Create Verification request again with a better photo — the review resumes automatically.

## Country coverage

Whop accepts `ID_CARD`, `DRIVERS`, and `PASSPORT` for people in most countries. The table below lists the exceptions. For a country in this table, only the listed values work. Anything else comes back through the previous rejection flow.

| Country | Accepted `document_type` values           |
| ------- | ----------------------------------------- |
| `AD`    | `DRIVERS`, `RESIDENCE_PERMIT`, `PASSPORT` |
| `AI`    | `DRIVERS`, `PASSPORT`                     |
| `AQ`    | `PASSPORT`                                |
| `AS`    | `DRIVERS`, `PASSPORT`                     |
| `CC`    | `ID_CARD`, `PASSPORT`                     |
| `CK`    | `DRIVERS`, `PASSPORT`                     |
| `CX`    | `DRIVERS`, `PASSPORT`                     |
| `EH`    | `PASSPORT`                                |
| `ER`    | `ID_CARD`, `PASSPORT`                     |
| `FK`    | `PASSPORT`                                |
| `FM`    | `DRIVERS`, `RESIDENCE_PERMIT`, `PASSPORT` |
| `FO`    | `DRIVERS`, `PASSPORT`                     |
| `GF`    | `ID_CARD`, `RESIDENCE_PERMIT`, `PASSPORT` |
| `GL`    | `DRIVERS`, `PASSPORT`                     |
| `HM`    | `PASSPORT`                                |
| `KY`    | `DRIVERS`, `PASSPORT`                     |
| `MS`    | `DRIVERS`, `RESIDENCE_PERMIT`, `PASSPORT` |
| `NF`    | `PASSPORT`                                |
| `PM`    | `ID_CARD`, `PASSPORT`                     |
| `SH`    | `PASSPORT`                                |
| `SJ`    | `PASSPORT`                                |
| `TF`    | `PASSPORT`                                |
| `TK`    | `DRIVERS`, `PASSPORT`                     |
| `TV`    | `DRIVERS`, `PASSPORT`                     |
| `VA`    | `PASSPORT`                                |
| `WF`    | `ID_CARD`, `PASSPORT`                     |
| `YT`    | `ID_CARD`, `PASSPORT`                     |

Whop accepts `RESIDENCE_PERMIT` in most countries too, but its coverage is narrower. Beyond the previous table, Whop **doesn't** accept it for people in:

`AG`, `AW`, `BB`, `BF`, `BI`, `BL`, `BZ`, `CV`, `CW`, `DM`, `GG`, `GI`, `GN`, `GS`, `GU`, `GY`, `IM`, `IO`, `JE`, `KI`, `KM`, `LC`, `LR`, `MF`, `ML`, `MP`, `MQ`, `MU`, `NC`, `NR`, `NU`, `NZ`, `PF`, `PG`, `PN`, `PR`, `PS`, `PW`, `SB`, `SC`, `SM`, `SR`, `ST`, `SX`, `SY`, `SZ`, `TC`, `TL`, `TO`, `VC`, `VI`, `WS`

Whop doesn't offer identity verification to people in these countries and declines every document type:

`AF` (Afghanistan), `BY` (Belarus), `CU` (Cuba), `HT` (Haiti), `IQ` (Iraq), `IR` (Iran), `KP` (North Korea), `LB` (Lebanon), `LY` (Libya), `MM` (Myanmar), `MZ` (Mozambique), `RU` (Russia), `SD` (Sudan), `SO` (Somalia), `SS` (South Sudan)

<Note>
  This table reflects Whop's verification configuration as of July 2026. Country acceptance is applied during review, so a document type that isn't valid for the person's country fails with a `rejection_reason` rather than an upfront error.
</Note>
