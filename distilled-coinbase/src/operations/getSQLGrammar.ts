import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSQLGrammarInput = Schema.Struct({

}).pipe(T.Http({ method: "GET", path: "/v2/data/query/grammar" }));
export type GetSQLGrammarInput = typeof GetSQLGrammarInput.Type;

// Output Schema
export const GetSQLGrammarOutput = Schema.String;
export type GetSQLGrammarOutput = typeof GetSQLGrammarOutput.Type;

// The operation
/**
 * Get SQL grammar
 *
 * Retrieve the SQL grammar for the SQL API.
 * The SQL queries that are supported by the SQL API are defined via an ANTLR4 grammar which is evaluated by server before executing the query. This ensures the safety and soundness of the SQL API.
 * This endpoint returns the ANTLR4 grammar that is used to evaluate the SQL queries so that developers can understand the SQL API and build SQL queries with high confidence and correctness. LLMs interact well with ANTLR4 grammar as well.
 */
export const getSQLGrammar = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSQLGrammarInput,
  outputSchema: GetSQLGrammarOutput,
}));
