/**
 * Azure Datamigration API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DatabaseMigrationsMongoToCosmosDbRUMongoCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
    }),
  );
export type DatabaseMigrationsMongoToCosmosDbRUMongoCreateInput =
  typeof DatabaseMigrationsMongoToCosmosDbRUMongoCreateInput.Type;

// Output Schema
export const DatabaseMigrationsMongoToCosmosDbRUMongoCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsMongoToCosmosDbRUMongoCreateOutput =
  typeof DatabaseMigrationsMongoToCosmosDbRUMongoCreateOutput.Type;

// The operation
/**
 * Create or Update Database Migration resource.
 */
export const DatabaseMigrationsMongoToCosmosDbRUMongoCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsMongoToCosmosDbRUMongoCreateInput,
    outputSchema: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOutput,
  }));
// Input Schema
export const DatabaseMigrationsMongoToCosmosDbRUMongoDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    force: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
    }),
  );
export type DatabaseMigrationsMongoToCosmosDbRUMongoDeleteInput =
  typeof DatabaseMigrationsMongoToCosmosDbRUMongoDeleteInput.Type;

// Output Schema
export const DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOutput =
  typeof DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOutput.Type;

// The operation
/**
 * Delete Database Migration resource.
 *
 * @param force - Optional force delete boolean. If this is provided as true, migration will be deleted even if active.
 */
export const DatabaseMigrationsMongoToCosmosDbRUMongoDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteInput,
    outputSchema: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOutput,
  }));
// Input Schema
export const DatabaseMigrationsMongoToCosmosDbRUMongoGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
    }),
  );
export type DatabaseMigrationsMongoToCosmosDbRUMongoGetInput =
  typeof DatabaseMigrationsMongoToCosmosDbRUMongoGetInput.Type;

// Output Schema
export const DatabaseMigrationsMongoToCosmosDbRUMongoGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsMongoToCosmosDbRUMongoGetOutput =
  typeof DatabaseMigrationsMongoToCosmosDbRUMongoGetOutput.Type;

// The operation
/**
 * Get Database Migration resource.
 */
export const DatabaseMigrationsMongoToCosmosDbRUMongoGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsMongoToCosmosDbRUMongoGetInput,
    outputSchema: DatabaseMigrationsMongoToCosmosDbRUMongoGetOutput,
  }));
// Input Schema
export const DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations",
    }),
  );
export type DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeInput =
  typeof DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeInput.Type;

// Output Schema
export const DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOutput =
  typeof DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOutput.Type;

// The operation
/**
 * Get Database Migration resources for the scope.
 */
export const DatabaseMigrationsMongoToCosmosDbRUMongoGetForScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeInput,
    outputSchema: DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOutput,
  }));
// Input Schema
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
    }),
  );
export type DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateInput =
  typeof DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateInput.Type;

// Output Schema
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOutput =
  typeof DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOutput.Type;

// The operation
/**
 * Create or Update Database Migration resource.
 */
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateInput,
    outputSchema: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOutput,
  }));
// Input Schema
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    force: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
    }),
  );
export type DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteInput =
  typeof DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteInput.Type;

// Output Schema
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOutput =
  typeof DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOutput.Type;

// The operation
/**
 * Delete Database Migration resource.
 *
 * @param force - Optional force delete boolean. If this is provided as true, migration will be deleted even if active.
 */
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteInput,
    outputSchema: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOutput,
  }));
// Input Schema
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
    }),
  );
export type DatabaseMigrationsMongoToCosmosDbvCoreMongoGetInput =
  typeof DatabaseMigrationsMongoToCosmosDbvCoreMongoGetInput.Type;

// Output Schema
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOutput =
  typeof DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOutput.Type;

// The operation
/**
 * Get Database Migration resource.
 */
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsMongoToCosmosDbvCoreMongoGetInput,
    outputSchema: DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOutput,
  }));
// Input Schema
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations",
    }),
  );
export type DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeInput =
  typeof DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeInput.Type;

// Output Schema
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeOutput =
  typeof DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeOutput.Type;

// The operation
/**
 * Get Database Migration resources for the scope.
 */
export const DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeInput,
    outputSchema: DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlDbCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlDbInstanceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/cancel",
    }),
  );
export type DatabaseMigrationsSqlDbCancelInput =
  typeof DatabaseMigrationsSqlDbCancelInput.Type;

// Output Schema
export const DatabaseMigrationsSqlDbCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsSqlDbCancelOutput =
  typeof DatabaseMigrationsSqlDbCancelOutput.Type;

// The operation
/**
 * Stop on going migration for the database.
 */
export const DatabaseMigrationsSqlDbCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlDbCancelInput,
    outputSchema: DatabaseMigrationsSqlDbCancelOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlDbCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlDbInstanceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlDbCreateOrUpdateInput =
  typeof DatabaseMigrationsSqlDbCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseMigrationsSqlDbCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsSqlDbCreateOrUpdateOutput =
  typeof DatabaseMigrationsSqlDbCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update Database Migration resource.
 */
export const DatabaseMigrationsSqlDbCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlDbCreateOrUpdateInput,
    outputSchema: DatabaseMigrationsSqlDbCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlDbDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlDbInstanceName: Schema.String.pipe(T.PathParam()),
    force: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlDbDeleteInput =
  typeof DatabaseMigrationsSqlDbDeleteInput.Type;

// Output Schema
export const DatabaseMigrationsSqlDbDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsSqlDbDeleteOutput =
  typeof DatabaseMigrationsSqlDbDeleteOutput.Type;

// The operation
/**
 * Delete Database Migration resource.
 *
 * @param force - Optional force delete boolean. If this is provided as true, migration will be deleted even if active.
 */
export const DatabaseMigrationsSqlDbDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlDbDeleteInput,
    outputSchema: DatabaseMigrationsSqlDbDeleteOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlDbGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlDbInstanceName: Schema.String.pipe(T.PathParam()),
    migrationOperationId: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlDbGetInput =
  typeof DatabaseMigrationsSqlDbGetInput.Type;

// Output Schema
export const DatabaseMigrationsSqlDbGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsSqlDbGetOutput =
  typeof DatabaseMigrationsSqlDbGetOutput.Type;

// The operation
/**
 * Retrieve the Database Migration resource.
 *
 * @param migrationOperationId - Optional migration operation ID. If this is provided, then details of migration operation for that ID are retrieved. If not provided (default), then details related to most recent or current operation are retrieved.
 * @param $expand - Complete migration details be included in the response.
 */
export const DatabaseMigrationsSqlDbGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseMigrationsSqlDbGetInput,
    outputSchema: DatabaseMigrationsSqlDbGetOutput,
  }),
);
// Input Schema
export const DatabaseMigrationsSqlDbRetryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlDbInstanceName: Schema.String.pipe(T.PathParam()),
    targetDbName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{sqlDbInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/retry",
    }),
  );
export type DatabaseMigrationsSqlDbRetryInput =
  typeof DatabaseMigrationsSqlDbRetryInput.Type;

// Output Schema
export const DatabaseMigrationsSqlDbRetryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsSqlDbRetryOutput =
  typeof DatabaseMigrationsSqlDbRetryOutput.Type;

// The operation
/**
 * Retry on going migration for the database.
 *
 * @param targetDbName - The name of the target database.
 */
export const DatabaseMigrationsSqlDbRetry =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlDbRetryInput,
    outputSchema: DatabaseMigrationsSqlDbRetryOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlMiCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedInstanceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/cancel",
    }),
  );
export type DatabaseMigrationsSqlMiCancelInput =
  typeof DatabaseMigrationsSqlMiCancelInput.Type;

// Output Schema
export const DatabaseMigrationsSqlMiCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsSqlMiCancelOutput =
  typeof DatabaseMigrationsSqlMiCancelOutput.Type;

// The operation
/**
 * Stop in-progress database migration to SQL Managed Instance.
 */
export const DatabaseMigrationsSqlMiCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlMiCancelInput,
    outputSchema: DatabaseMigrationsSqlMiCancelOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlMiCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedInstanceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlMiCreateOrUpdateInput =
  typeof DatabaseMigrationsSqlMiCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseMigrationsSqlMiCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsSqlMiCreateOrUpdateOutput =
  typeof DatabaseMigrationsSqlMiCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new database migration to a given SQL Managed Instance.
 */
export const DatabaseMigrationsSqlMiCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlMiCreateOrUpdateInput,
    outputSchema: DatabaseMigrationsSqlMiCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlMiCutoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedInstanceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/cutover",
    }),
  );
export type DatabaseMigrationsSqlMiCutoverInput =
  typeof DatabaseMigrationsSqlMiCutoverInput.Type;

// Output Schema
export const DatabaseMigrationsSqlMiCutoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsSqlMiCutoverOutput =
  typeof DatabaseMigrationsSqlMiCutoverOutput.Type;

// The operation
/**
 * Initiate cutover for in-progress online database migration to SQL Managed Instance.
 */
export const DatabaseMigrationsSqlMiCutover =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlMiCutoverInput,
    outputSchema: DatabaseMigrationsSqlMiCutoverOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlMiDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    force: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlMiDeleteInput =
  typeof DatabaseMigrationsSqlMiDeleteInput.Type;

// Output Schema
export const DatabaseMigrationsSqlMiDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsSqlMiDeleteOutput =
  typeof DatabaseMigrationsSqlMiDeleteOutput.Type;

// The operation
/**
 * Delete Database Migration resource.
 *
 * @param force - Optional force delete boolean. If this is provided as true, migration will be deleted even if active.
 */
export const DatabaseMigrationsSqlMiDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlMiDeleteInput,
    outputSchema: DatabaseMigrationsSqlMiDeleteOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlMiGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    migrationOperationId: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlMiGetInput =
  typeof DatabaseMigrationsSqlMiGetInput.Type;

// Output Schema
export const DatabaseMigrationsSqlMiGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsSqlMiGetOutput =
  typeof DatabaseMigrationsSqlMiGetOutput.Type;

// The operation
/**
 * Retrieve the specified database migration for a given SQL Managed Instance.
 *
 * @param migrationOperationId - Optional migration operation ID. If this is provided, then details of migration operation for that ID are retrieved. If not provided (default), then details related to most recent or current operation are retrieved.
 * @param $expand - Complete migration details be included in the response.
 */
export const DatabaseMigrationsSqlMiGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseMigrationsSqlMiGetInput,
    outputSchema: DatabaseMigrationsSqlMiGetOutput,
  }),
);
// Input Schema
export const DatabaseMigrationsSqlVmCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/cancel",
    }),
  );
export type DatabaseMigrationsSqlVmCancelInput =
  typeof DatabaseMigrationsSqlVmCancelInput.Type;

// Output Schema
export const DatabaseMigrationsSqlVmCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsSqlVmCancelOutput =
  typeof DatabaseMigrationsSqlVmCancelOutput.Type;

// The operation
/**
 * Stop in-progress database migration to SQL VM.
 */
export const DatabaseMigrationsSqlVmCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlVmCancelInput,
    outputSchema: DatabaseMigrationsSqlVmCancelOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlVmCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlVmCreateOrUpdateInput =
  typeof DatabaseMigrationsSqlVmCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseMigrationsSqlVmCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsSqlVmCreateOrUpdateOutput =
  typeof DatabaseMigrationsSqlVmCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new database migration to a given SQL VM.
 */
export const DatabaseMigrationsSqlVmCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlVmCreateOrUpdateInput,
    outputSchema: DatabaseMigrationsSqlVmCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlVmCutoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}/cutover",
    }),
  );
export type DatabaseMigrationsSqlVmCutoverInput =
  typeof DatabaseMigrationsSqlVmCutoverInput.Type;

// Output Schema
export const DatabaseMigrationsSqlVmCutoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationsSqlVmCutoverOutput =
  typeof DatabaseMigrationsSqlVmCutoverOutput.Type;

// The operation
/**
 * Initiate cutover for in-progress online database migration to SQL VM.
 */
export const DatabaseMigrationsSqlVmCutover =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlVmCutoverInput,
    outputSchema: DatabaseMigrationsSqlVmCutoverOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlVmDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    force: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlVmDeleteInput =
  typeof DatabaseMigrationsSqlVmDeleteInput.Type;

// Output Schema
export const DatabaseMigrationsSqlVmDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsSqlVmDeleteOutput =
  typeof DatabaseMigrationsSqlVmDeleteOutput.Type;

// The operation
/**
 * Delete Database Migration resource.
 *
 * @param force - Optional force delete boolean. If this is provided as true, migration will be deleted even if active.
 */
export const DatabaseMigrationsSqlVmDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationsSqlVmDeleteInput,
    outputSchema: DatabaseMigrationsSqlVmDeleteOutput,
  }));
// Input Schema
export const DatabaseMigrationsSqlVmGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    migrationOperationId: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/providers/Microsoft.DataMigration/databaseMigrations/{targetDbName}",
    }),
  );
export type DatabaseMigrationsSqlVmGetInput =
  typeof DatabaseMigrationsSqlVmGetInput.Type;

// Output Schema
export const DatabaseMigrationsSqlVmGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseMigrationsSqlVmGetOutput =
  typeof DatabaseMigrationsSqlVmGetOutput.Type;

// The operation
/**
 * Retrieve the specified database migration for a given SQL VM.
 *
 * @param migrationOperationId - Optional migration operation ID. If this is provided, then details of migration operation for that ID are retrieved. If not provided (default), then details related to most recent or current operation are retrieved.
 * @param $expand - Complete migration details be included in the response.
 */
export const DatabaseMigrationsSqlVmGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseMigrationsSqlVmGetInput,
    outputSchema: DatabaseMigrationsSqlVmGetOutput,
  }),
);
// Input Schema
export const FilesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}",
  }),
);
export type FilesDeleteInput = typeof FilesDeleteInput.Type;

// Output Schema
export const FilesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FilesDeleteOutput = typeof FilesDeleteOutput.Type;

// The operation
/**
 * Delete file
 *
 * This method deletes a file.
 */
export const FilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FilesDeleteInput,
  outputSchema: FilesDeleteOutput,
}));
// Input Schema
export const FilesReadInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}/read",
  }),
);
export type FilesReadInput = typeof FilesReadInput.Type;

// Output Schema
export const FilesReadOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  uri: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type FilesReadOutput = typeof FilesReadOutput.Type;

// The operation
/**
 * Request storage information for downloading the file content
 *
 * This method is used for requesting storage information using which contents of the file can be downloaded.
 *
 * @param subscriptionId - Subscription ID that identifies an Azure subscription.
 */
export const FilesRead = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FilesReadInput,
  outputSchema: FilesReadOutput,
}));
// Input Schema
export const FilesReadWriteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/files/{fileName}/readwrite",
  }),
);
export type FilesReadWriteInput = typeof FilesReadWriteInput.Type;

// Output Schema
export const FilesReadWriteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  uri: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type FilesReadWriteOutput = typeof FilesReadWriteOutput.Type;

// The operation
/**
 * Request information for reading and writing file content.
 *
 * This method is used for requesting information for reading and writing the file content.
 *
 * @param subscriptionId - Subscription ID that identifies an Azure subscription.
 */
export const FilesReadWrite = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FilesReadWriteInput,
  outputSchema: FilesReadWriteOutput,
}));
// Input Schema
export const MigrationServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}",
    }),
  );
export type MigrationServicesCreateOrUpdateInput =
  typeof MigrationServicesCreateOrUpdateInput.Type;

// Output Schema
export const MigrationServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MigrationServicesCreateOrUpdateOutput =
  typeof MigrationServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update Database Migration Service.
 */
export const MigrationServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrationServicesCreateOrUpdateInput,
    outputSchema: MigrationServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const MigrationServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}",
    }),
  );
export type MigrationServicesDeleteInput =
  typeof MigrationServicesDeleteInput.Type;

// Output Schema
export const MigrationServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MigrationServicesDeleteOutput =
  typeof MigrationServicesDeleteOutput.Type;

// The operation
/**
 * Delete Database Migration Service.
 */
export const MigrationServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MigrationServicesDeleteInput,
    outputSchema: MigrationServicesDeleteOutput,
  }),
);
// Input Schema
export const MigrationServicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}",
    }),
  );
export type MigrationServicesGetInput = typeof MigrationServicesGetInput.Type;

// Output Schema
export const MigrationServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MigrationServicesGetOutput = typeof MigrationServicesGetOutput.Type;

// The operation
/**
 * Retrieve the Database Migration Service
 */
export const MigrationServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MigrationServicesGetInput,
    outputSchema: MigrationServicesGetOutput,
  }),
);
// Input Schema
export const MigrationServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices",
    }),
  );
export type MigrationServicesListByResourceGroupInput =
  typeof MigrationServicesListByResourceGroupInput.Type;

// Output Schema
export const MigrationServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MigrationServicesListByResourceGroupOutput =
  typeof MigrationServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieve all migration services in the resource group.
 */
export const MigrationServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrationServicesListByResourceGroupInput,
    outputSchema: MigrationServicesListByResourceGroupOutput,
  }));
// Input Schema
export const MigrationServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataMigration/migrationServices",
    }),
  );
export type MigrationServicesListBySubscriptionInput =
  typeof MigrationServicesListBySubscriptionInput.Type;

// Output Schema
export const MigrationServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MigrationServicesListBySubscriptionOutput =
  typeof MigrationServicesListBySubscriptionOutput.Type;

// The operation
/**
 * Retrieve all migration services in the subscriptions.
 */
export const MigrationServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrationServicesListBySubscriptionInput,
    outputSchema: MigrationServicesListBySubscriptionOutput,
  }));
// Input Schema
export const MigrationServicesListMigrationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}/listMigrations",
    }),
  );
export type MigrationServicesListMigrationsInput =
  typeof MigrationServicesListMigrationsInput.Type;

// Output Schema
export const MigrationServicesListMigrationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type MigrationServicesListMigrationsOutput =
  typeof MigrationServicesListMigrationsOutput.Type;

// The operation
/**
 * Retrieve the List of database migrations attached to the service.
 */
export const MigrationServicesListMigrations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrationServicesListMigrationsInput,
    outputSchema: MigrationServicesListMigrationsOutput,
  }));
// Input Schema
export const MigrationServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/migrationServices/{migrationServiceName}",
    }),
  );
export type MigrationServicesUpdateInput =
  typeof MigrationServicesUpdateInput.Type;

// Output Schema
export const MigrationServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MigrationServicesUpdateOutput =
  typeof MigrationServicesUpdateOutput.Type;

// The operation
/**
 * Update Database Migration Service.
 */
export const MigrationServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MigrationServicesUpdateInput,
    outputSchema: MigrationServicesUpdateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.DataMigration/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        isDataAction: Schema.optional(Schema.Boolean),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
        origin: Schema.optional(Schema.Literals(["user", "system"])),
        properties: Schema.optional(
          Schema.Record(Schema.String, Schema.Unknown),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available SQL Migration REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ProjectsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}",
    }),
  );
export type ProjectsCreateOrUpdateInput =
  typeof ProjectsCreateOrUpdateInput.Type;

// Output Schema
export const ProjectsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ProjectsCreateOrUpdateOutput =
  typeof ProjectsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update project
 *
 * The project resource is a nested resource representing a stored migration project. The PUT method creates a new project or updates an existing one.
 */
export const ProjectsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectsCreateOrUpdateInput,
    outputSchema: ProjectsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ProjectsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}",
  }),
);
export type ProjectsDeleteInput = typeof ProjectsDeleteInput.Type;

// Output Schema
export const ProjectsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectsDeleteOutput = typeof ProjectsDeleteOutput.Type;

// The operation
/**
 * Delete project
 *
 * The project resource is a nested resource representing a stored migration project. The DELETE method deletes a project.
 */
export const ProjectsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsDeleteInput,
  outputSchema: ProjectsDeleteOutput,
}));
// Input Schema
export const ProjectsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}",
  }),
);
export type ProjectsGetInput = typeof ProjectsGetInput.Type;

// Output Schema
export const ProjectsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ProjectsGetOutput = typeof ProjectsGetOutput.Type;

// The operation
/**
 * Get project information
 *
 * The project resource is a nested resource representing a stored migration project. The GET method retrieves information about a project.
 */
export const ProjectsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsGetInput,
  outputSchema: ProjectsGetOutput,
}));
// Input Schema
export const ProjectsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}",
  }),
);
export type ProjectsUpdateInput = typeof ProjectsUpdateInput.Type;

// Output Schema
export const ProjectsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ProjectsUpdateOutput = typeof ProjectsUpdateOutput.Type;

// The operation
/**
 * Update project
 *
 * The project resource is a nested resource representing a stored migration project. The PATCH method updates an existing project.
 */
export const ProjectsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsUpdateInput,
  outputSchema: ProjectsUpdateOutput,
}));
// Input Schema
export const ServicesCheckChildrenNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/checkNameAvailability",
    }),
  );
export type ServicesCheckChildrenNameAvailabilityInput =
  typeof ServicesCheckChildrenNameAvailabilityInput.Type;

// Output Schema
export const ServicesCheckChildrenNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["AlreadyExists", "Invalid"])),
    message: Schema.optional(Schema.String),
  });
export type ServicesCheckChildrenNameAvailabilityOutput =
  typeof ServicesCheckChildrenNameAvailabilityOutput.Type;

// The operation
/**
 * Check nested resource name validity and availability
 *
 * This method checks whether a proposed nested resource name is valid and available.
 *
 * @param subscriptionId - Subscription ID that identifies an Azure subscription.
 */
export const ServicesCheckChildrenNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesCheckChildrenNameAvailabilityInput,
    outputSchema: ServicesCheckChildrenNameAvailabilityOutput,
  }));
// Input Schema
export const ServicesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataMigration/locations/{location}/checkNameAvailability",
    }),
  );
export type ServicesCheckNameAvailabilityInput =
  typeof ServicesCheckNameAvailabilityInput.Type;

// Output Schema
export const ServicesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["AlreadyExists", "Invalid"])),
    message: Schema.optional(Schema.String),
  });
export type ServicesCheckNameAvailabilityOutput =
  typeof ServicesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check name validity and availability
 *
 * This method checks whether a proposed top-level resource name is valid and available.
 *
 * @param subscriptionId - Subscription ID that identifies an Azure subscription.
 */
export const ServicesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesCheckNameAvailabilityInput,
    outputSchema: ServicesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ServicesCheckStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/checkStatus",
    }),
  );
export type ServicesCheckStatusInput = typeof ServicesCheckStatusInput.Type;

// Output Schema
export const ServicesCheckStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    agentVersion: Schema.optional(Schema.String),
    agentConfiguration: Schema.optional(Schema.Unknown),
    status: Schema.optional(Schema.String),
    vmSize: Schema.optional(Schema.String),
    supportedTaskTypes: Schema.optional(Schema.Array(Schema.String)),
  });
export type ServicesCheckStatusOutput = typeof ServicesCheckStatusOutput.Type;

// The operation
/**
 * Check service health status
 *
 * The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action performs a health check and returns the status of the service and virtual machine size.
 *
 * @param subscriptionId - Subscription ID that identifies an Azure subscription.
 */
export const ServicesCheckStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesCheckStatusInput,
  outputSchema: ServicesCheckStatusOutput,
}));
// Input Schema
export const ServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}",
    }),
  );
export type ServicesCreateOrUpdateInput =
  typeof ServicesCreateOrUpdateInput.Type;

// Output Schema
export const ServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServicesCreateOrUpdateOutput =
  typeof ServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update DMS (classic) Instance
 *
 * The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The PUT method creates a new service or updates an existing one. When a service is updated, existing child resources (i.e. tasks) are unaffected. Services currently support a single kind, "vm", which refers to a VM-based service, although other kinds may be added in the future. This method can change the kind, SKU, and network of the service, but if tasks are currently running (i.e. the service is busy), this will fail with 400 Bad Request ("ServiceIsBusy"). The provider will reply when successful with 200 OK or 201 Created. Long-running operations use the provisioningState property.
 */
export const ServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesCreateOrUpdateInput,
    outputSchema: ServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Delete DMS (classic) Service Instance
 *
 * The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The DELETE method deletes a service. Any running tasks will be canceled.
 */
export const ServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Get DMS (classic) Service Instance
 *
 * The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The GET method retrieves information about a service instance.
 */
export const ServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/start",
  }),
);
export type ServicesStartInput = typeof ServicesStartInput.Type;

// Output Schema
export const ServicesStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesStartOutput = typeof ServicesStartOutput.Type;

// The operation
/**
 * Start service
 *
 * The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action starts the service and the service can be used for data migration.
 *
 * @param subscriptionId - Subscription ID that identifies an Azure subscription.
 */
export const ServicesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesStartInput,
  outputSchema: ServicesStartOutput,
}));
// Input Schema
export const ServicesStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/stop",
  }),
);
export type ServicesStopInput = typeof ServicesStopInput.Type;

// Output Schema
export const ServicesStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesStopOutput = typeof ServicesStopOutput.Type;

// The operation
/**
 * Stop service
 *
 * The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This action stops the service and the service cannot be used for data migration. The service owner won't be billed when the service is stopped.
 *
 * @param subscriptionId - Subscription ID that identifies an Azure subscription.
 */
export const ServicesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesStopInput,
  outputSchema: ServicesStopOutput,
}));
// Input Schema
export const ServicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}",
  }),
);
export type ServicesUpdateInput = typeof ServicesUpdateInput.Type;

// Output Schema
export const ServicesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServicesUpdateOutput = typeof ServicesUpdateOutput.Type;

// The operation
/**
 * Create or update DMS (classic) Service Instance
 *
 * The services resource is the top-level resource that represents the Azure Database Migration Service (classic). The PATCH method updates an existing service. This method can change the kind, SKU, and network of the service, but if tasks are currently running (i.e. the service is busy), this will fail with 400 Bad Request ("ServiceIsBusy").
 */
export const ServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesUpdateInput,
  outputSchema: ServicesUpdateOutput,
}));
// Input Schema
export const ServiceTasksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/serviceTasks/{taskName}",
    }),
  );
export type ServiceTasksDeleteInput = typeof ServiceTasksDeleteInput.Type;

// Output Schema
export const ServiceTasksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServiceTasksDeleteOutput = typeof ServiceTasksDeleteOutput.Type;

// The operation
/**
 * Delete service task
 *
 * The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a service task, canceling it first if it's running.
 */
export const ServiceTasksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceTasksDeleteInput,
  outputSchema: ServiceTasksDeleteOutput,
}));
// Input Schema
export const SqlMigrationServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}",
    }),
  );
export type SqlMigrationServicesCreateOrUpdateInput =
  typeof SqlMigrationServicesCreateOrUpdateInput.Type;

// Output Schema
export const SqlMigrationServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlMigrationServicesCreateOrUpdateOutput =
  typeof SqlMigrationServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update Database Migration Service.
 */
export const SqlMigrationServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlMigrationServicesCreateOrUpdateInput,
    outputSchema: SqlMigrationServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlMigrationServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}",
    }),
  );
export type SqlMigrationServicesDeleteInput =
  typeof SqlMigrationServicesDeleteInput.Type;

// Output Schema
export const SqlMigrationServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlMigrationServicesDeleteOutput =
  typeof SqlMigrationServicesDeleteOutput.Type;

// The operation
/**
 * Delete Database Migration Service.
 */
export const SqlMigrationServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlMigrationServicesDeleteInput,
    outputSchema: SqlMigrationServicesDeleteOutput,
  }),
);
// Input Schema
export const SqlMigrationServicesDeleteNodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/deleteNode",
    }),
  );
export type SqlMigrationServicesDeleteNodeInput =
  typeof SqlMigrationServicesDeleteNodeInput.Type;

// Output Schema
export const SqlMigrationServicesDeleteNodeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nodeName: Schema.optional(Schema.String),
    integrationRuntimeName: Schema.optional(Schema.String),
  });
export type SqlMigrationServicesDeleteNodeOutput =
  typeof SqlMigrationServicesDeleteNodeOutput.Type;

// The operation
/**
 * Delete the integration runtime node.
 */
export const SqlMigrationServicesDeleteNode =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlMigrationServicesDeleteNodeInput,
    outputSchema: SqlMigrationServicesDeleteNodeOutput,
  }));
// Input Schema
export const SqlMigrationServicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}",
    }),
  );
export type SqlMigrationServicesGetInput =
  typeof SqlMigrationServicesGetInput.Type;

// Output Schema
export const SqlMigrationServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlMigrationServicesGetOutput =
  typeof SqlMigrationServicesGetOutput.Type;

// The operation
/**
 * Retrieve the Database Migration Service
 */
export const SqlMigrationServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlMigrationServicesGetInput,
    outputSchema: SqlMigrationServicesGetOutput,
  }),
);
// Input Schema
export const SqlMigrationServicesListAuthKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/listAuthKeys",
    }),
  );
export type SqlMigrationServicesListAuthKeysInput =
  typeof SqlMigrationServicesListAuthKeysInput.Type;

// Output Schema
export const SqlMigrationServicesListAuthKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    authKey1: Schema.optional(Schema.String),
    authKey2: Schema.optional(Schema.String),
  });
export type SqlMigrationServicesListAuthKeysOutput =
  typeof SqlMigrationServicesListAuthKeysOutput.Type;

// The operation
/**
 * Retrieve the List of Authentication Keys for Self Hosted Integration Runtime.
 */
export const SqlMigrationServicesListAuthKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlMigrationServicesListAuthKeysInput,
    outputSchema: SqlMigrationServicesListAuthKeysOutput,
  }));
// Input Schema
export const SqlMigrationServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices",
    }),
  );
export type SqlMigrationServicesListByResourceGroupInput =
  typeof SqlMigrationServicesListByResourceGroupInput.Type;

// Output Schema
export const SqlMigrationServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlMigrationServicesListByResourceGroupOutput =
  typeof SqlMigrationServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieve all SQL migration services in the resource group.
 */
export const SqlMigrationServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlMigrationServicesListByResourceGroupInput,
    outputSchema: SqlMigrationServicesListByResourceGroupOutput,
  }));
// Input Schema
export const SqlMigrationServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataMigration/sqlMigrationServices",
    }),
  );
export type SqlMigrationServicesListBySubscriptionInput =
  typeof SqlMigrationServicesListBySubscriptionInput.Type;

// Output Schema
export const SqlMigrationServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlMigrationServicesListBySubscriptionOutput =
  typeof SqlMigrationServicesListBySubscriptionOutput.Type;

// The operation
/**
 * Retrieve all SQL migration services in the subscriptions.
 */
export const SqlMigrationServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlMigrationServicesListBySubscriptionInput,
    outputSchema: SqlMigrationServicesListBySubscriptionOutput,
  }));
// Input Schema
export const SqlMigrationServicesListMigrationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/listMigrations",
    }),
  );
export type SqlMigrationServicesListMigrationsInput =
  typeof SqlMigrationServicesListMigrationsInput.Type;

// Output Schema
export const SqlMigrationServicesListMigrationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlMigrationServicesListMigrationsOutput =
  typeof SqlMigrationServicesListMigrationsOutput.Type;

// The operation
/**
 * Retrieve the List of database migrations attached to the service.
 */
export const SqlMigrationServicesListMigrations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlMigrationServicesListMigrationsInput,
    outputSchema: SqlMigrationServicesListMigrationsOutput,
  }));
// Input Schema
export const SqlMigrationServicesListMonitoringDataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/listMonitoringData",
    }),
  );
export type SqlMigrationServicesListMonitoringDataInput =
  typeof SqlMigrationServicesListMonitoringDataInput.Type;

// Output Schema
export const SqlMigrationServicesListMonitoringDataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    nodes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          additionalProperties: Schema.optional(
            Schema.Record(Schema.String, Schema.Unknown),
          ),
          nodeName: Schema.optional(Schema.String),
          availableMemoryInMB: Schema.optional(Schema.Number),
          cpuUtilization: Schema.optional(Schema.Number),
          concurrentJobsLimit: Schema.optional(Schema.Number),
          concurrentJobsRunning: Schema.optional(Schema.Number),
          maxConcurrentJobs: Schema.optional(Schema.Number),
          sentBytes: Schema.optional(Schema.Number),
          receivedBytes: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type SqlMigrationServicesListMonitoringDataOutput =
  typeof SqlMigrationServicesListMonitoringDataOutput.Type;

// The operation
/**
 * Retrieve the registered Integration Runtime nodes and their monitoring data for a given Database Migration Service.
 */
export const SqlMigrationServicesListMonitoringData =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlMigrationServicesListMonitoringDataInput,
    outputSchema: SqlMigrationServicesListMonitoringDataOutput,
  }));
// Input Schema
export const SqlMigrationServicesRegenerateAuthKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}/regenerateAuthKeys",
    }),
  );
export type SqlMigrationServicesRegenerateAuthKeysInput =
  typeof SqlMigrationServicesRegenerateAuthKeysInput.Type;

// Output Schema
export const SqlMigrationServicesRegenerateAuthKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keyName: Schema.optional(Schema.String),
    authKey1: Schema.optional(Schema.String),
    authKey2: Schema.optional(Schema.String),
  });
export type SqlMigrationServicesRegenerateAuthKeysOutput =
  typeof SqlMigrationServicesRegenerateAuthKeysOutput.Type;

// The operation
/**
 * Regenerate a new set of Authentication Keys for Self Hosted Integration Runtime.
 */
export const SqlMigrationServicesRegenerateAuthKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlMigrationServicesRegenerateAuthKeysInput,
    outputSchema: SqlMigrationServicesRegenerateAuthKeysOutput,
  }));
// Input Schema
export const SqlMigrationServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataMigration/sqlMigrationServices/{sqlMigrationServiceName}",
    }),
  );
export type SqlMigrationServicesUpdateInput =
  typeof SqlMigrationServicesUpdateInput.Type;

// Output Schema
export const SqlMigrationServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlMigrationServicesUpdateOutput =
  typeof SqlMigrationServicesUpdateOutput.Type;

// The operation
/**
 * Update Database Migration Service.
 */
export const SqlMigrationServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlMigrationServicesUpdateInput,
    outputSchema: SqlMigrationServicesUpdateOutput,
  }),
);
// Input Schema
export const TasksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.DataMigration/services/{serviceName}/projects/{projectName}/tasks/{taskName}",
  }),
);
export type TasksDeleteInput = typeof TasksDeleteInput.Type;

// Output Schema
export const TasksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TasksDeleteOutput = typeof TasksDeleteOutput.Type;

// The operation
/**
 * Delete task
 *
 * The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a task, canceling it first if it's running.
 */
export const TasksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TasksDeleteInput,
  outputSchema: TasksDeleteOutput,
}));
