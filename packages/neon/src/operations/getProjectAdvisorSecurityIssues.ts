import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectAdvisorSecurityIssuesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    project_id: Schema.String.pipe(T.PathParam()),
    branch_id: Schema.optional(Schema.String),
    database_name: Schema.optional(Schema.String),
    category: Schema.optional(Schema.String),
    min_severity: Schema.optional(Schema.Literals(["INFO", "WARN", "ERROR"])),
  }).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/advisors" }));
export type GetProjectAdvisorSecurityIssuesInput =
  typeof GetProjectAdvisorSecurityIssuesInput.Type;

// Output Schema
export const GetProjectAdvisorSecurityIssuesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    issues: Schema.Array(
      Schema.Struct({
        name: Schema.String,
        title: Schema.String,
        level: Schema.String,
        facing: Schema.Literals(["EXTERNAL", "INTERNAL"]),
        categories: Schema.Array(Schema.Literals(["SECURITY", "PERFORMANCE"])),
        description: Schema.String,
        detail: Schema.String,
        remediation: Schema.String,
        metadata: Schema.Record(Schema.String, Schema.Unknown),
        cache_key: Schema.String,
      }),
    ),
  });
export type GetProjectAdvisorSecurityIssuesOutput =
  typeof GetProjectAdvisorSecurityIssuesOutput.Type;

// The operation
/**
 * Get advisor issues
 *
 * Analyzes the database for security and performance issues.
 * Returns a list of issues categorized by severity (ERROR, WARN, INFO).
 * Requires read access to the project.
 *
 * @param project_id - Neon project ID
 * @param branch_id - Branch ID to analyze. If not specified, the project's default branch is used.
 * @param database_name - Database name to analyze. Required if branch has multiple databases.
 * @param category - Filter issues by category
 * @param min_severity - Minimum severity level to include. For example, WARN returns WARN and ERROR issues, excluding INFO.
 */
export const getProjectAdvisorSecurityIssues =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetProjectAdvisorSecurityIssuesInput,
    outputSchema: GetProjectAdvisorSecurityIssuesOutput,
  }));
