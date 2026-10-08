/**
 * The add-ons subset of Fly's GraphQL schema (the spec mirror's
 * `graphql.json`, the full introspection of https://api.fly.io/graphql).
 *
 * The add-ons service is a thin client for managed extensions (Tigris,
 * Upstash Redis, …), so convert keeps only these types and, per type, only
 * these fields. A field maps to `null` to keep all of its arguments, or to
 * the argument names to keep. Everything about a kept field (type,
 * nullability, arguments) comes from the schema.
 */
export const ADDONS_SELECTION: Readonly<
  Record<string, Readonly<Record<string, readonly string[] | null>> | null>
> = {
  String: null,
  ID: null,
  Int: null,
  Boolean: null,
  JSON: null,
  ISO8601DateTime: null,
  AddOnType: null,
  PageInfo: { hasNextPage: null, hasPreviousPage: null, startCursor: null, endCursor: null },
  AddOnPlan: {
    id: null,
    name: null,
    displayName: null,
    description: null,
    maxDataSize: null,
    pricePerMonth: null,
  },
  AddOnPlanEdge: { cursor: null, node: null },
  AddOnPlanConnection: { edges: null, nodes: null, pageInfo: null, totalCount: null },
  AddOnProvider: {
    id: null,
    name: null,
    displayName: null,
    tosUrl: null,
    tosAgreement: null,
    asyncProvisioning: null,
    autoProvision: null,
    beta: null,
    internal: null,
    selectName: null,
    selectRegion: null,
    selectReplicaRegions: null,
    detectPlatform: null,
    resourceName: null,
    nameSuffix: null,
    provisioningInstructions: null,
  },
  App: { id: null, name: null },
  Organization: {
    id: null,
    name: null,
    slug: null,
    rawSlug: null,
    paidPlan: null,
    billable: null,
    provisionsBetaExtensions: null,
    // The organization's add-ons are listed through the root `addOns` query.
    addOns: [],
  },
  AddOn: {
    id: null,
    name: null,
    primaryRegion: null,
    readRegions: null,
    status: null,
    errorMessage: null,
    publicUrl: null,
    privateIp: null,
    password: null,
    ssoLink: null,
    environment: null,
    options: null,
    metadata: null,
    createdAt: null,
    updatedAt: null,
    addOnPlan: null,
    addOnPlanName: null,
    addOnProvider: null,
    organization: null,
    app: null,
  },
  AddOnEdge: { cursor: null, node: null },
  AddOnConnection: { edges: null, nodes: null, pageInfo: null, totalCount: null },
  CreateAddOnInput: {
    type: null,
    name: null,
    organizationId: null,
    appId: null,
    planId: null,
    primaryRegion: null,
    readRegions: null,
    options: null,
    organizationPlanId: null,
    clientMutationId: null,
  },
  UpdateAddOnInput: {
    addOnId: null,
    name: null,
    provider: null,
    planId: null,
    readRegions: null,
    options: null,
    metadata: null,
    prodPack: null,
    clientMutationId: null,
  },
  DeleteAddOnInput: { addOnId: null, name: null, provider: null, clientMutationId: null },
  CreateExtensionTosAgreementInput: {
    addOnProviderName: null,
    organizationId: null,
    clientMutationId: null,
  },
  ResetAddOnPasswordInput: { name: null, clientMutationId: null },
  CreateAddOnPayload: { addOn: null, clientMutationId: null },
  UpdateAddOnPayload: { addOn: null, clientMutationId: null },
  DeleteAddOnPayload: { deletedAddOnName: null, clientMutationId: null },
  CreateExtensionTosAgreementPayload: { clientMutationId: null },
  ResetAddOnPasswordPayload: { addOn: null, clientMutationId: null },
  Queries: {
    addOn: null,
    addOns: null,
    addOnPlans: null,
    addOnProvider: null,
    organization: null,
  },
  Mutations: {
    createAddOn: null,
    updateAddOn: null,
    deleteAddOn: null,
    createExtensionTosAgreement: null,
    resetAddOnPassword: null,
  },
};

/** The schema reduced to {@link ADDONS_SELECTION}, in selection order. */
export const selectAddons = (schema: any): any => {
  const byName = new Map<string, any>(schema.types.map((t: any) => [t.name, t]));
  const types = Object.entries(ADDONS_SELECTION).map(([name, fields]) => {
    const type = byName.get(name);
    if (type === undefined)
      throw new Error(`add-ons: type ${name} is not in the Fly GraphQL schema`);
    if (fields === null) return type;
    const key = type.inputFields ? "inputFields" : "fields";
    const byField = new Map<string, any>(type[key].map((f: any) => [f.name, f]));
    return {
      ...type,
      [key]: Object.entries(fields).map(([fieldName, args]) => {
        const field = byField.get(fieldName);
        if (field === undefined) {
          throw new Error(`add-ons: ${name}.${fieldName} is not in the Fly GraphQL schema`);
        }
        return args === null
          ? field
          : { ...field, args: field.args.filter((a: any) => args.includes(a.name)) };
      }),
    };
  });
  return { ...schema, types };
};
