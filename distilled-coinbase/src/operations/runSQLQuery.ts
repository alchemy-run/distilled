import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidSqlQuery, TimedOut } from "../errors";

// Input Schema
export const RunSQLQueryInput = Schema.Struct({
  sql: Schema.String,
  cache: Schema.optional(
    Schema.Struct({
      maxAgeMs: Schema.optional(Schema.Number),
    }),
  ),
}).pipe(T.Http({ method: "POST", path: "/v2/data/query/run" }));
export type RunSQLQueryInput = typeof RunSQLQueryInput.Type;

// Output Schema
export const RunSQLQueryOutput = Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Unknown)),
  schema: Schema.optional(
    Schema.Struct({
      columns: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            type: Schema.optional(
              Schema.Literals([
                "String",
                "UInt8",
                "UInt16",
                "UInt32",
                "UInt64",
                "UInt128",
                "UInt256",
                "Int8",
                "Int16",
                "Int32",
                "Int64",
                "Int128",
                "Int256",
                "Float32",
                "Float64",
                "Bool",
                "Date",
                "DateTime",
                "DateTime64",
                "UUID",
              ]),
            ),
          }),
        ),
      ),
    }),
  ),
  metadata: Schema.optional(
    Schema.Struct({
      cached: Schema.optional(Schema.Boolean),
      executionTimestamp: Schema.optional(Schema.String),
      executionTimeMs: Schema.optional(Schema.Number),
      rowCount: Schema.optional(Schema.Number),
    }),
  ),
});
export type RunSQLQueryOutput = typeof RunSQLQueryOutput.Type;

// The operation
/**
 * Run SQL Query
 *
 * Run a read-only SQL query against indexed blockchain data including transactions, events, and decoded logs.
 * This endpoint provides direct SQL access to comprehensive blockchain data across supported networks.
 * Queries are executed against optimized data structures for high-performance analytics.
 * ### Allowed Queries
 * - Standard SQL syntax (ClickHouse dialect)
 * - Read-only queries (SELECT statements)
 * - No DDL or DML operations
 * - No cartesian products
 * ### Supported Tables
 * - `base.events` - Base mainnet decoded event logs with parameters, event signature, topics, and more.
 * - `base.transactions` - Base mainnet transaction data including hash, block number, gas usage.
 * - `base.blocks` - Base mainnet block information.
 * - `base.encoded_logs` - Encoded log data of event logs that aren't able to be decoded by our event decoder (ex: log0 opcode).
 * - `base.transfers` - All event logs with event signature `Transfer(address,address,uint256)`. ERC-20, ERC-721, and ERC-1155 transfers are all included.
 * ### Query Limits
 * - Maximum result set: 100,000 rows
 * - Query timeout: 30 seconds
 */
export const runSQLQuery = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RunSQLQueryInput,
  outputSchema: RunSQLQueryOutput,
  errors: [InvalidSqlQuery, TimedOut],
}));
