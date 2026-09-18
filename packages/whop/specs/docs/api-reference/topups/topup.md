> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Topup

> A payment represents a completed or attempted charge. Payments track the amount, status, currency, and payment method used.

<ResponseExample>
  ```json Example theme={null}
  {
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "usd",
  	"failure_message": "<string>",
  	"id": "pay_xxxxxxxxxxxxxx",
  	"paid_at": "2023-12-01T05:00:00.401Z",
  	"status": "draft",
  	"total": 6.9
  }
  ```
</ResponseExample>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the payment was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="Currencies | null" required>
  The three-letter ISO currency code for this payment (e.g., 'usd', 'eur').

  Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
</ResponseField>

<ResponseField name="failure_message" type="string | null" required>
  If the payment failed, the reason for the failure.
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the payment.

  Example: `pay_xxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="paid_at" type="string<date-time> | null" required>
  The time at which this payment was successfully collected. Null if the payment has not yet succeeded. As a Unix timestamp.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="status" type="ReceiptStatus | null" required>
  The current lifecycle state of this payment (e.g., 'draft', 'open', 'paid', 'void').

  Available options: `draft`, `open`, `paid`, `pending`, `uncollectible`, `unresolved`, `void`
</ResponseField>

<ResponseField name="total" type="number | null" required>
  The total to show to the creator (excluding buyer fees).

  Example: `6.9`
</ResponseField>
