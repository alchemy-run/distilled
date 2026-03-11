import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupClusterPerformanceAdvisorSchemaAdviceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/performanceAdvisor/schemaAdvice",
    }),
  );
export type ListGroupClusterPerformanceAdvisorSchemaAdviceInput =
  typeof ListGroupClusterPerformanceAdvisorSchemaAdviceInput.Type;

// Output Schema
export const ListGroupClusterPerformanceAdvisorSchemaAdviceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupClusterPerformanceAdvisorSchemaAdviceOutput =
  typeof ListGroupClusterPerformanceAdvisorSchemaAdviceOutput.Type;

// The operation
/**
 * Return Schema Advice
 *
 * Returns the schema suggestions that the Performance Advisor detects. The Performance Advisor provides holistic schema recommendations for your cluster by sampling documents in your most active collections and collections with slow-running queries. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 */
export const listGroupClusterPerformanceAdvisorSchemaAdvice =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupClusterPerformanceAdvisorSchemaAdviceInput,
    outputSchema: ListGroupClusterPerformanceAdvisorSchemaAdviceOutput,
  }));
