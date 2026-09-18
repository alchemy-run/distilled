> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get time series

> Stats expose aggregated time series built from your account, the same data that powers the Whop dashboard charts. Each query rolls financial activity into periods (`group_by` day, week, or month) over the `from`–`to` window and returns the total `amount` and `line_count` for each, so you can chart revenue, refunds, fees, or net activity without reconstructing raw transactions. Set `resource_type` to choose what you're measuring (ex. `wallet`), pass `account_id` to read a sub-account, and narrow with `reporting_category`, `grouping`, and `line_category` (applied in that order).


<Note>
  Requires the `company:balance:read` permission. See
  [Permissions](/developer/guides/permissions).
</Note>


## OpenAPI

````yaml openapi/ledger-stats.yaml GET /api/v1/stats/time_series
openapi: 3.1.0
info:
  title: Whop Wallet Stats API
  version: 1.0.0
  description: Financial stats for your account.
servers:
  - url: https://api.whop.com
security: []
paths:
  /api/v1/stats/time_series:
    get:
      summary: Query time series
      description: >
        Stats expose aggregated time series built from your account, the same
        data that powers the Whop dashboard charts. Each query rolls financial
        activity into periods (`group_by` day, week, or month) over the
        `from`–`to` window and returns the total `amount` and `line_count` for
        each, so you can chart revenue, refunds, fees, or net activity without
        reconstructing raw transactions. Set `resource_type` to choose what
        you're measuring (ex. `wallet`), pass `account_id` to read a
        sub-account, and narrow with `reporting_category`, `grouping`, and
        `line_category` (applied in that order).
      operationId: getStatsTimeSeries
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
        - name: account_id
          in: query
          required: false
          description: >
            Query a specific account's wallet instead of the caller's own.

            Pass a `biz_` or `user_` tag. The caller must have
            `company:balance:read`

            permission on the target account.
          schema:
            type: string
            examples:
              - biz_abc123
              - global
        - name: from
          in: query
          required: true
          description: Start date in ISO 8601 format.
          schema:
            type: string
            format: date
            examples:
              - '2025-01-01'
        - name: to
          in: query
          required: true
          description: End date in ISO 8601 format.
          schema:
            type: string
            format: date
            examples:
              - '2025-12-31'
        - name: group_by
          in: query
          required: false
          description: Time bucket granularity.
          schema:
            type: string
            default: month
            enum:
              - day
              - week
              - month
        - name: reporting_category
          in: query
          required: false
          description: >
            Filter to a predefined reporting category. Each category maps to a
            curated set of line categories.

            Call `/stats/schema?resource_type=wallet` to see all reporting
            categories and which line categories each one includes.
          schema:
            type: string
        - name: grouping
          in: query
          required: false
          description: >
            Filter to specific groupings. Pass multiple values to include
            several

            (e.g. `grouping[]=payments&grouping[]=refunds`).

            Call `/stats/schema?resource_type=wallet` to see all groupings and
            which line categories belong to each.
          schema:
            type: array
            items:
              type: string
        - name: line_category
          in: query
          required: false
          description: >
            Filter to specific transaction types. Pass multiple values to
            include several

            (e.g.
            `line_category[]=payment_gross&line_category[]=payment_refund`).

            When omitted, all categories are included.

            Call `/stats/schema?resource_type=wallet` to see all line categories
            with descriptions.
          schema:
            type: array
            items:
              type: string
        - name: currency
          in: query
          required: false
          description: >
            Filter to only include rows denominated in this currency.

            When omitted, rows for all currencies are returned and a `currency`
            field appears on each row.
          schema:
            type: string
            examples:
              - usd
              - eur
              - gbp
        - name: convert_currency
          in: query
          required: false
          description: >
            Convert all amounts to this currency using historical exchange
            rates, collapsing

            multi-currency rows into one row per period. Can be combined with
            `currency` to

            first filter then convert.
          schema:
            type: string
            examples:
              - usd
              - eur
        - name: timezone
          in: query
          required: false
          description: IANA timezone for period boundaries.
          schema:
            type: string
            default: UTC
            examples:
              - UTC
              - America/New_York
              - Europe/London
      responses:
        '200':
          description: Time-series data with metadata.
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      type: object
                      properties:
                        period:
                          type: string
                          format: date
                          description: Start date of the time bucket.
                        amount:
                          type: number
                          description: Total amount for this period.
                        line_count:
                          type: integer
                          description: Number of ledger lines in this period.
                        currency:
                          type: string
                          description: >-
                            Currency code for this row. Present when neither
                            `currency` nor `convert_currency` is set, or when
                            `currency` filters to a single currency without
                            conversion.
                      required:
                        - period
                        - amount
                        - line_count
                  metadata:
                    type: object
                    properties:
                      wallet_id:
                        type: string
                        description: >-
                          The ledger account tag resolved from your API key's
                          auth context.
                      account_id:
                        type: string
                        description: >-
                          Present when account_id was passed as a query
                          parameter.
                      from:
                        type: string
                        format: date
                      to:
                        type: string
                        format: date
                      group_by:
                        type: string
                        enum:
                          - day
                          - week
                          - month
                      currency:
                        type: string
                        nullable: true
                        description: The currency filter applied, if any.
                      convert_currency:
                        type: string
                        nullable: true
                        description: The target conversion currency, if any.
                      timezone:
                        type: string
                      reporting_category:
                        type: string
                        description: >-
                          Present only when the `reporting_category` query param
                          is provided.
                      base_reporting_scope:
                        type: string
                        description: >-
                          The base reporting scope applied to external API keys
                          (e.g. `net_activity`). Absent for admin dashboard
                          sessions.
                      grouping:
                        type: array
                        items:
                          type: string
                        description: >-
                          Present only when the `grouping` query param is
                          provided.
                      line_category:
                        type: array
                        items:
                          type: string
                        description: >-
                          Present only when the `line_category` query param is
                          provided.
              examples:
                monthly:
                  summary: Monthly aggregation
                  value:
                    data:
                      - period: '2025-01-01'
                        amount: 14550.35
                        line_count: 342
                      - period: '2025-02-01'
                        amount: 18200
                        line_count: 410
                    metadata:
                      wallet_id: ldgr_xxx
                      from: '2025-01-01'
                      to: '2025-06-01'
                      group_by: month
                      currency: usd
                      timezone: UTC
                multi_currency:
                  summary: Multi-currency (no currency param)
                  value:
                    data:
                      - period: '2025-01-01'
                        currency: usd
                        amount: 14550.35
                        line_count: 300
                      - period: '2025-01-01'
                        currency: eur
                        amount: 3200
                        line_count: 42
                    metadata:
                      wallet_id: ldgr_xxx
                      from: '2025-01-01'
                      to: '2025-06-01'
                      group_by: month
                      timezone: UTC
        '400':
          description: Invalid parameters.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '401':
          description: Missing or invalid API key.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '403':
          description: >-
            API key lacks `company:balance:read` permission, or
            `account_id=global` without admin access.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
      security:
        - bearerAuth: []
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
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer

````