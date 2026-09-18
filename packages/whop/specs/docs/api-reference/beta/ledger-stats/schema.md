> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Schema

> Returns the full structure of reporting categories, groupings, and line categories
with human-readable descriptions. Use this to discover valid filter values for
the time_series endpoint and understand what each value means.

**Call this first** before constructing time_series queries to understand the
available filters and what financial data each one represents.


No authentication required. Call this endpoint to discover all available filter values
for the [time\_series](/api-reference/beta/ledger-stats/time-series) endpoint with
human-readable descriptions.


## OpenAPI

````yaml openapi/ledger-stats.yaml GET /api/v1/stats/schema
openapi: 3.1.0
info:
  title: Whop Wallet Stats API
  version: 1.0.0
  description: Financial stats for your account.
servers:
  - url: https://api.whop.com
security: []
paths:
  /api/v1/stats/schema:
    get:
      summary: Describe available filters
      description: >
        Returns the full structure of reporting categories, groupings, and line
        categories

        with human-readable descriptions. Use this to discover valid filter
        values for

        the time_series endpoint and understand what each value means.


        **Call this first** before constructing time_series queries to
        understand the

        available filters and what financial data each one represents.
      operationId: getStatsSchema
      parameters:
        - name: resource_type
          in: query
          required: true
          description: |
            The type of resource to query. Currently only `wallet` is supported.
          schema:
            type: string
            enum:
              - wallet
      responses:
        '200':
          description: Full taxonomy of wallet stats filter values.
          content:
            application/json:
              schema:
                type: object
                properties:
                  reporting_categories:
                    type: array
                    description: >
                      Predefined report scopes. Each maps to a curated set of
                      line categories.

                      Pass a reporting_category name to the time_series endpoint
                      to filter to that scope.
                    items:
                      type: object
                      properties:
                        name:
                          type: string
                          description: The reporting_category value to pass to time_series.
                        line_categories:
                          type: array
                          items:
                            type: string
                          description: The line_category keys included in this report.
                      required:
                        - name
                        - line_categories
                  groupings:
                    type: array
                    description: >
                      Logical groupings of line categories (e.g. payments,
                      refunds, disputes).

                      Pass grouping names to the time_series endpoint to filter
                      by grouping.
                    items:
                      type: object
                      properties:
                        name:
                          type: string
                          description: The grouping value to pass to time_series.
                        line_categories:
                          type: array
                          items:
                            type: string
                          description: The active line_category keys in this grouping.
                      required:
                        - name
                        - line_categories
                  line_categories:
                    type: array
                    description: >
                      Every active line category with its description, grouping,
                      and which

                      reporting categories it belongs to. This is the most
                      granular filter

                      available on the time_series endpoint.
                    items:
                      type: object
                      properties:
                        key:
                          type: string
                          description: The line_category value to pass to time_series.
                        description:
                          type: string
                          description: >-
                            Human-readable explanation of what this line
                            category represents.
                        grouping:
                          type: string
                          description: Which grouping this line category belongs to.
                        reporting_categories:
                          type: array
                          items:
                            type: string
                          description: >-
                            Which reporting categories include this line
                            category.
                      required:
                        - key
                        - description
                        - grouping
                        - reporting_categories
              example:
                reporting_categories:
                  - name: gross_income
                    line_categories:
                      - payment_gross
                      - passthrough_gmv
                      - platform_balance_transfer_incoming
                groupings:
                  - name: payments
                    line_categories:
                      - psp_payment_receivable
                      - payment_gross
                      - topup
                line_categories:
                  - key: payment_gross
                    description: >-
                      A settlement for a card or lpm payment into a wallet. This
                      is the gross amount of the payment, not including any
                      fees.
                    grouping: payments
                    reporting_categories:
                      - net_activity
                      - gtv
                      - gross_income
                      - net_income
        '400':
          description: Invalid parameters (missing or invalid resource_type).
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
components:
  schemas:
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            type:
              type: string
            message:
              type: string

````