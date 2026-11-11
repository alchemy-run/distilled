import { selectSchema, type GraphQLSelection } from "./graphql-selection.ts";

/**
 * The remote-builders subset of Fly's GraphQL schema: the mutation `flyctl`
 * calls to start a Depot build for an app. It returns a single-use build
 * token that acquires a BuildKit machine from Depot, which builds the image
 * next to Fly's registry and pushes it there.
 */
export const BUILDERS_SELECTION: GraphQLSelection = {
  String: null,
  ID: null,
  EnsureDepotRemoteBuilderInput: {
    appName: null,
    organizationId: null,
    region: null,
    builderScope: null,
    clientMutationId: null,
  },
  EnsureDepotRemoteBuilderPayload: { buildId: null, buildToken: null, clientMutationId: null },
  Mutations: { ensureDepotRemoteBuilder: null },
};

/** The schema reduced to {@link BUILDERS_SELECTION}, in selection order. */
export const selectBuilders = (schema: any): any =>
  selectSchema(schema, BUILDERS_SELECTION, "builders");
