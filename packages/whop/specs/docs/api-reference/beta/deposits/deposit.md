> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Deposits

Deposits describe ways to add funds to an account balance, including hosted deposit pages, bank deposit instructions, and supported crypto wallet addresses.

Use the Deposits API to create deposit instructions for an account.

## Endpoints

| Endpoint                                                      | Request                                                        |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| [Create Deposit](/api-reference/beta/deposits/create-deposit) | <Badge color="green" size="sm" stroke>POST</Badge> `/deposits` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="account_id" type="string | null" required>
      Account ID of the destination owner. Null for raw wallet address destinations.
    </ResponseField>

    <ResponseField name="amount" type="string">
      Requested deposit amount.
    </ResponseField>

    <ResponseField name="hosted_url" type="string | null" required>
      URL of the hosted deposit page. Only present for business destinations.
    </ResponseField>

    <ResponseField name="metadata" type="object" required>
      Metadata from the request.
    </ResponseField>

    <ResponseField name="methods" type="object" required>
      Available deposit methods for destination.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="bank" type="object | null" required>
          Bank deposit details. Only present when bank deposits are active for the destination account.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="currencies" type="object[]" required>
              Bank transfer currencies available for this deposit.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="account_number" type="string | null" required>
                  Bank account number for deposits in this currency.
                </ResponseField>

                <ResponseField name="currency" type="string" required>
                  Currency supported by these bank instructions.
                </ResponseField>

                <ResponseField name="deposit_bank_address" type="string | null" required>
                  Receiving bank address.
                </ResponseField>

                <ResponseField name="deposit_bank_name" type="string | null" required>
                  Receiving bank name.
                </ResponseField>

                <ResponseField name="deposit_beneficiary_name" type="string | null" required>
                  Beneficiary name to use for transfer.
                </ResponseField>

                <ResponseField name="deposit_reference" type="string | null" required>
                  Reference to include with bank transfer.
                </ResponseField>

                <ResponseField name="rails" type="string[]" required>
                  Active deposit rails for this currency.

                  Available options: `ach`, `wire`, `sepa`, `fps`, `chaps`
                </ResponseField>

                <ResponseField name="routing_number" type="string | null" required>
                  Bank routing number for deposits in this currency.
                </ResponseField>

                <ResponseField name="swift_bic" type="string | null" required>
                  SWIFT/BIC code for international wires, when available.
                </ResponseField>
              </Accordion>
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="crypto" type="object[]" required>
          Crypto networks available for this deposit, each with its on-chain deposit address and the tokens accepted on that network.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="deposit_address" type="string | null" required>
              Address to send funds to on this network. Null when the provider has not
              issued one yet.
            </ResponseField>

            <ResponseField name="icon_url" type="string | null" required>
              Network icon URL.
            </ResponseField>

            <ResponseField name="name" type="string" required>
              Network display name.

              Available options: `Ethereum`, `Solana`, `Base`, `BNB Smart Chain`, `Hyperliquid`, `Hypercore`, `MegaETH`, `Polygon`, `Plasma`, `Arbitrum`
            </ResponseField>

            <ResponseField name="supported_currencies" type="object[]" required>
              Tokens accepted for deposit on this network.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="icon_url" type="string | null" required>
                  Token icon URL. Null when no icon is available.
                </ResponseField>

                <ResponseField name="name" type="string" required>
                  Token symbol.

                  Available options: `ARB`, `BNB`, `ETH`, `EURC`, `HYPE`, `PYUSD`, `SOL`, `USD1`, `USDC`, `USDC.e`, `USDG`, `USDT`, `USDT0`, `USDe`, `USDm`, `XO`, `XPL`, `pUSD`, `wETH`
                </ResponseField>
              </Accordion>
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="object" type="string" required />
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Deposit theme={null}
      {
      	"account_id": "biz_xxxxxxxxxxxxxx",
      	"amount": "250.00",
      	"hosted_url": "https://whop.com/deposit/example/?amount=250.00",
      	"metadata": {},
      	"methods": {
      		"bank": {
      			"currencies": [
      				{
      					"account_number": "123456789012",
      					"currency": "usd",
      					"deposit_bank_address": "885 Example Road, Teaneck, NJ 07666",
      					"deposit_bank_name": "Example Bank",
      					"deposit_beneficiary_name": "Example Business Inc.",
      					"deposit_reference": "WHOPDEP123",
      					"rails": ["ach", "wire"],
      					"routing_number": "021000021",
      					"swift_bic": "EXAMUS33XXX"
      				}
      			]
      		},
      		"crypto": [
      			{
      				"deposit_address": "0x1234abcd5678ef901234abcd5678ef901234abcd",
      				"icon_url": "https://whop.com/images/networks/ethereum.png",
      				"name": "Ethereum",
      				"supported_currencies": [
      					{
      						"icon_url": "https://whop.com/images/tokens/usdc.png",
      						"name": "USDC"
      					}
      				]
      			}
      		]
      	},
      	"object": "deposit"
      }
      ```
    </div>
  </Column>
</Columns>
