> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Swaps

Swaps convert value between supported tokens, chains, or wallet destinations for an account. A swap quote describes the expected output, fees, and approval requirements before you create the swap.

Use the Swaps API to quote a conversion, create the swap, list recent swaps, and retrieve status until the transaction completes.

## Endpoints

| Endpoint                                                         | Request                                                           |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| [List Swaps](/api-reference/beta/swaps/list-swaps)               | <Badge color="blue" size="sm" stroke>GET</Badge> `/swaps`         |
| [Create Swap](/api-reference/beta/swaps/create-swap)             | <Badge color="green" size="sm" stroke>POST</Badge> `/swaps`       |
| [Retrieve Swap](/api-reference/beta/swaps/retrieve-swap)         | <Badge color="blue" size="sm" stroke>GET</Badge> `/swaps/{id}`    |
| [Create Swap Quote](/api-reference/beta/swaps/create-swap-quote) | <Badge color="green" size="sm" stroke>POST</Badge> `/swaps/quote` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Swap ID.
    </ResponseField>

    <ResponseField name="account_id" type="string" required>
      Account ID that owns the wallet used for the swap.
    </ResponseField>

    <ResponseField name="error" type="string | null">
      Latest error returned for a failed swap.
    </ResponseField>

    <ResponseField name="object" type="string" required />

    <ResponseField name="status" type="string" required>
      Current swap status. `complete` and `failed` are terminal.

      Available options: `queued`, `working`, `complete`, `failed`
    </ResponseField>

    <ResponseField name="tx_hashes" type="string[]" required>
      On-chain transaction hashes produced by the swap.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Swap theme={null}
      {
      	"id": "swap_xxxxxxxxxxxx",
      	"account_id": "biz_xxxxxxxxxxxxxx",
      	"error": null,
      	"object": "swap",
      	"status": "complete",
      	"tx_hashes": ["0x1234567890abcdef"]
      }
      ```
    </div>
  </Column>
</Columns>
