import { defineFragment, type Fragment } from "../fragment.ts";

/**
 * Role type - a collection of permissions and responsibilities.
 * Extends Fragment for template support.
 */
export interface Role<
  ID extends string = string,
  References extends any[] = any[],
> extends Fragment<"role", ID, References> {}

/**
 * Create a Role - a collection of permissions and responsibilities.
 *
 * Roles can contain:
 * - Tools/Toolkits: Agents with this role gain access to these tools
 * - Other Roles: Inheritance - gains parent role's tools
 *
 * When an Agent references a Role, that Agent gains all the tools
 * from the Role and any inherited Roles.
 *
 * @example
 * ```typescript
 * // Define a tool
 * const CodeReviewTool = tool("code-review")`Review code ${input("code", S.String)}`;
 *
 * // Create a role with the tool
 * class Reviewer extends Role("reviewer")`
 *   Code review capabilities.
 *   ${CodeReviewTool}
 * ` {}
 *
 * // Role inheritance
 * class Admin extends Role("admin")`
 *   Full access. Inherits ${Reviewer}.
 *   ${AuditTool}
 * ` {}
 *
 * // Agent with role
 * class Alice extends Agent("alice")`
 *   Senior engineer with review access.
 *   ${Reviewer}
 * ` {}
 * ```
 */
export const Role = defineFragment("role")();

/**
 * Type guard for Role entities
 */
export const isRole = Role.is<Role>;
