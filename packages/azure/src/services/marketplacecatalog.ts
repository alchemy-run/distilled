/**
 * Azure Marketplacecatalog API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CreateApiKeyPostInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  apiKeyAlias: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Marketplace/keys/{apiKeyAlias}/create",
  }),
);
export type CreateApiKeyPostInput = typeof CreateApiKeyPostInput.Type;

// Output Schema
export const CreateApiKeyPostOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    keyAlias: Schema.optional(Schema.String),
    key: Schema.optional(Schema.String),
  },
);
export type CreateApiKeyPostOutput = typeof CreateApiKeyPostOutput.Type;

// The operation
/**
 * Generates an API key, granting access to the full range of Marketplace Catalog APIs. Please note that this API is currently in a preview state and requires sign-up to the 'Discovery Api Key Early Access' preview feature using a valid Azure subscription. For more information on this process please see the documentation for Marketplace Catalog APIs [here](https://learn.microsoft.com/en-us/rest/api/marketplacecatalog/dataplane/products/get?view=rest-marketplacecatalog-dataplane-2023-05-01-preview&tabs=HTTP)
 *
 * @param apiKeyAlias - Alias for new API Key. This alias must be unique and contain only alphanumeric characters separated by dashes.
 * @param x-ms-client-tenant-id - The tenant associated with the subscription.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CreateApiKeyPost = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateApiKeyPostInput,
  outputSchema: CreateApiKeyPostOutput,
}));
// Input Schema
export const EdgeZonesProductsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Marketplace/locations/{location}/edgeZones/{edgeZone}/products",
    }),
  );
export type EdgeZonesProductsListInput = typeof EdgeZonesProductsListInput.Type;

// Output Schema
export const EdgeZonesProductsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextPageLink: Schema.optional(Schema.NullOr(Schema.String)),
    count: Schema.optional(Schema.NullOr(Schema.Number)),
    items: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            language: Schema.String,
            displayName: Schema.optional(Schema.NullOr(Schema.String)),
            hasStandardContractAmendments: Schema.optional(Schema.Boolean),
            publisherMpnId: Schema.optional(Schema.NullOr(Schema.String)),
            sellerId: Schema.optional(Schema.NullOr(Schema.String)),
            publisherId: Schema.optional(Schema.NullOr(Schema.String)),
            partnerCenterId: Schema.optional(Schema.NullOr(Schema.String)),
            publisherDisplayName: Schema.optional(Schema.NullOr(Schema.String)),
            offerId: Schema.String,
            legacyId: Schema.String,
            determinedStorefronts: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Literals([
                    "Appsource",
                    "AMP",
                    "Ibiza",
                    "Cosell",
                    "DakotaDownstream",
                  ]),
                ),
              ),
            ),
            standardContractAmendmentsRevisionId: Schema.optional(
              Schema.String,
            ),
            universalAmendmentUrl: Schema.optional(
              Schema.NullOr(Schema.String),
            ),
            summary: Schema.optional(Schema.NullOr(Schema.String)),
            longSummary: Schema.optional(Schema.NullOr(Schema.String)),
            description: Schema.optional(Schema.NullOr(Schema.String)),
            offerType: Schema.optional(Schema.Struct({})),
            isPrivate: Schema.optional(Schema.Boolean),
            isPreview: Schema.optional(Schema.Boolean),
            isStopSell: Schema.optional(Schema.Boolean),
            stopSellInfo: Schema.optional(
              Schema.Struct({
                startDate: Schema.optional(Schema.NullOr(Schema.String)),
                reason: Schema.optional(Schema.Struct({})),
                alternativeOfferId: Schema.optional(
                  Schema.NullOr(Schema.String),
                ),
                alternativePlanId: Schema.optional(
                  Schema.NullOr(Schema.String),
                ),
              }),
            ),
            fulfillBeforeChargeEligible: Schema.optional(Schema.Boolean),
            marketingMaterial: Schema.optional(
              Schema.Struct({
                path: Schema.optional(Schema.NullOr(Schema.String)),
                learnUri: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
            markets: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            isvContactDetails: Schema.optional(
              Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
            ),
            bigId: Schema.String,
            ocpSolutionId: Schema.optional(Schema.NullOr(Schema.String)),
            legalTermsUri: Schema.optional(Schema.NullOr(Schema.String)),
            cspLegalTermsUri: Schema.optional(Schema.NullOr(Schema.String)),
            legalTermsType: Schema.optional(Schema.Struct({})),
            privacyPolicyUri: Schema.optional(Schema.NullOr(Schema.String)),
            helpLink: Schema.optional(Schema.NullOr(Schema.String)),
            supportUri: Schema.optional(Schema.NullOr(Schema.String)),
            version: Schema.optional(Schema.NullOr(Schema.String)),
            uiDefinitionUri: Schema.optional(Schema.NullOr(Schema.String)),
            categoryIds: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            operatingSystems: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            marketCode: Schema.optional(Schema.NullOr(Schema.String)),
            marketStates: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            industryIds: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            primaryIndustry: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            primaryCategories: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            cloudIndustryCategories: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            primaryProduct: Schema.optional(Schema.NullOr(Schema.String)),
            supportedProducts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            applicableProducts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            serviceType: Schema.optional(Schema.NullOr(Schema.String)),
            competencies: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    competencyName: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    competencyLevel: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                  }),
                ),
              ),
            ),
            hasPrices: Schema.optional(Schema.NullOr(Schema.Boolean)),
            duration: Schema.optional(
              Schema.Struct({
                durationValue: Schema.optional(Schema.Number),
                durationUnit: Schema.optional(Schema.Struct({})),
              }),
            ),
            marketPricingDetails: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    pricing: Schema.optional(
                      Schema.Struct({
                        currencyCode: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        planPrices: Schema.optional(
                          Schema.NullOr(
                            Schema.Array(
                              Schema.Struct({
                                planId: Schema.optional(
                                  Schema.NullOr(Schema.String),
                                ),
                                currencyDecorator: Schema.optional(
                                  Schema.Struct({}),
                                ),
                                price: Schema.optional(Schema.Number),
                              }),
                            ),
                          ),
                        ),
                      }),
                    ),
                    marketCode: Schema.optional(Schema.NullOr(Schema.String)),
                    marketStates: Schema.optional(
                      Schema.NullOr(Schema.Array(Schema.String)),
                    ),
                  }),
                ),
              ),
            ),
            startingPrice: Schema.optional(
              Schema.Struct({
                market: Schema.String,
                termUnits: Schema.optional(Schema.NullOr(Schema.String)),
                meterUnits: Schema.optional(Schema.NullOr(Schema.String)),
                minTermPrice: Schema.optional(Schema.NullOr(Schema.Number)),
                minMeterPrice: Schema.optional(Schema.NullOr(Schema.Number)),
                currency: Schema.String,
              }),
            ),
            pricing: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.NullOr(Schema.String)),
                planPrices: Schema.optional(
                  Schema.NullOr(
                    Schema.Array(
                      Schema.Struct({
                        planId: Schema.optional(Schema.NullOr(Schema.String)),
                        currencyDecorator: Schema.optional(Schema.Struct({})),
                        price: Schema.optional(Schema.Number),
                      }),
                    ),
                  ),
                ),
              }),
            ),
            solutionAreas: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            screenshotUris: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            links: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.NullOr(Schema.String)),
                    displayName: Schema.optional(Schema.NullOr(Schema.String)),
                    uri: Schema.optional(Schema.NullOr(Schema.String)),
                  }),
                ),
              ),
            ),
            filters: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.NullOr(Schema.String)),
                    value: Schema.optional(Schema.NullOr(Schema.String)),
                  }),
                ),
              ),
            ),
            iconFileUris: Schema.optional(
              Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
            ),
            artifacts: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.NullOr(Schema.String)),
                    uri: Schema.optional(Schema.NullOr(Schema.String)),
                    type: Schema.optional(Schema.Struct({})),
                  }),
                ),
              ),
            ),
            metadata: Schema.optional(
              Schema.Struct({
                leadGeneration: Schema.optional(
                  Schema.Struct({
                    productId: Schema.optional(Schema.NullOr(Schema.String)),
                    leadGenEnabled: Schema.optional(
                      Schema.NullOr(Schema.Boolean),
                    ),
                  }),
                ),
                testDrive: Schema.optional(
                  Schema.Struct({
                    description: Schema.optional(Schema.NullOr(Schema.String)),
                    userManual: Schema.optional(Schema.NullOr(Schema.String)),
                    testDriveDuration: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    accessInformation: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    orchestrationType: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    labId: Schema.optional(Schema.NullOr(Schema.String)),
                    demoId: Schema.optional(Schema.NullOr(Schema.String)),
                    video: Schema.optional(
                      Schema.Struct({
                        caption: Schema.optional(Schema.NullOr(Schema.String)),
                        uri: Schema.optional(Schema.NullOr(Schema.String)),
                        videoPurpose: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        previewImage: Schema.optional(
                          Schema.Struct({
                            caption: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            uri: Schema.optional(Schema.NullOr(Schema.String)),
                            imagePurpose: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                          }),
                        ),
                      }),
                    ),
                    powerBiDashboardLink: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                  }),
                ),
              }),
            ),
            properties: Schema.optional(
              Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
            ),
            images: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    context: Schema.optional(Schema.NullOr(Schema.String)),
                    items: Schema.optional(
                      Schema.NullOr(
                        Schema.Array(
                          Schema.Struct({
                            id: Schema.optional(Schema.NullOr(Schema.String)),
                            uri: Schema.optional(Schema.NullOr(Schema.String)),
                            type: Schema.optional(Schema.NullOr(Schema.String)),
                          }),
                        ),
                      ),
                    ),
                  }),
                ),
              ),
            ),
            videos: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    caption: Schema.optional(Schema.NullOr(Schema.String)),
                    uri: Schema.optional(Schema.NullOr(Schema.String)),
                    videoPurpose: Schema.optional(Schema.NullOr(Schema.String)),
                    previewImage: Schema.optional(
                      Schema.Struct({
                        caption: Schema.optional(Schema.NullOr(Schema.String)),
                        uri: Schema.optional(Schema.NullOr(Schema.String)),
                        imagePurpose: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                      }),
                    ),
                  }),
                ),
              ),
            ),
            plans: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.NullOr(Schema.String)),
                    displayName: Schema.optional(Schema.NullOr(Schema.String)),
                    summary: Schema.optional(Schema.NullOr(Schema.String)),
                    description: Schema.optional(Schema.NullOr(Schema.String)),
                    restrictedAudience: Schema.optional(
                      Schema.Struct({
                        subscriptions: Schema.optional(
                          Schema.NullOr(Schema.Array(Schema.String)),
                        ),
                        tenants: Schema.optional(
                          Schema.NullOr(Schema.Array(Schema.String)),
                        ),
                        users: Schema.optional(
                          Schema.NullOr(Schema.Array(Schema.String)),
                        ),
                        groups: Schema.optional(
                          Schema.NullOr(Schema.Array(Schema.String)),
                        ),
                      }),
                    ),
                    skuId: Schema.optional(Schema.NullOr(Schema.String)),
                    planId: Schema.optional(Schema.NullOr(Schema.String)),
                    legacyPlanId: Schema.optional(Schema.NullOr(Schema.String)),
                    keywords: Schema.optional(
                      Schema.NullOr(Schema.Array(Schema.String)),
                    ),
                    type: Schema.optional(Schema.Struct({})),
                    leadGeneration: Schema.optional(
                      Schema.Struct({
                        productId: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        leadGenEnabled: Schema.optional(
                          Schema.NullOr(Schema.Boolean),
                        ),
                      }),
                    ),
                    testDrive: Schema.optional(
                      Schema.Struct({
                        description: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        userManual: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        testDriveDuration: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        accessInformation: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        orchestrationType: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        labId: Schema.optional(Schema.NullOr(Schema.String)),
                        demoId: Schema.optional(Schema.NullOr(Schema.String)),
                        video: Schema.optional(
                          Schema.Struct({
                            caption: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            uri: Schema.optional(Schema.NullOr(Schema.String)),
                            videoPurpose: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            previewImage: Schema.optional(
                              Schema.Struct({
                                caption: Schema.optional(
                                  Schema.NullOr(Schema.String),
                                ),
                                uri: Schema.optional(
                                  Schema.NullOr(Schema.String),
                                ),
                                imagePurpose: Schema.optional(
                                  Schema.NullOr(Schema.String),
                                ),
                              }),
                            ),
                          }),
                        ),
                        powerBiDashboardLink: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                      }),
                    ),
                    availabilities: Schema.optional(
                      Schema.NullOr(
                        Schema.Array(
                          Schema.Struct({
                            id: Schema.optional(Schema.NullOr(Schema.String)),
                            partitionKey: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            ts: Schema.optional(Schema.Number),
                            actions: Schema.optional(
                              Schema.NullOr(Schema.Array(Schema.String)),
                            ),
                            market: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            isPIRequired: Schema.optional(Schema.Boolean),
                            appId: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            planID: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            meterId: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            meter: Schema.optional(
                              Schema.Struct({
                                meterId: Schema.optional(
                                  Schema.NullOr(Schema.String),
                                ),
                                partNumber: Schema.optional(
                                  Schema.NullOr(Schema.String),
                                ),
                                consumptionResourceId: Schema.optional(
                                  Schema.NullOr(Schema.String),
                                ),
                                price: Schema.optional(
                                  Schema.Struct({
                                    currencyCode: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                    isPIRequired: Schema.optional(
                                      Schema.Boolean,
                                    ),
                                    listPrice: Schema.optional(Schema.Number),
                                    msrp: Schema.optional(Schema.Number),
                                  }),
                                ),
                                type: Schema.optional(
                                  Schema.NullOr(Schema.String),
                                ),
                                includedQuantityProperties: Schema.optional(
                                  Schema.NullOr(
                                    Schema.Array(
                                      Schema.Struct({
                                        termId: Schema.optional(
                                          Schema.NullOr(Schema.String),
                                        ),
                                        quantity: Schema.optional(
                                          Schema.NullOr(Schema.String),
                                        ),
                                      }),
                                    ),
                                  ),
                                ),
                              }),
                            ),
                            pricingAudience: Schema.optional(Schema.Struct({})),
                            terms: Schema.optional(
                              Schema.NullOr(
                                Schema.Array(
                                  Schema.Struct({
                                    termDescriptionParameters: Schema.optional(
                                      Schema.NullOr(
                                        Schema.Array(
                                          Schema.Struct({
                                            parameter: Schema.optional(
                                              Schema.NullOr(Schema.String),
                                            ),
                                            value: Schema.optional(
                                              Schema.NullOr(Schema.String),
                                            ),
                                          }),
                                        ),
                                      ),
                                    ),
                                    termId: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                    termUnits: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                    prorationPolicy: Schema.optional(
                                      Schema.Struct({
                                        minimumProratedUnits: Schema.optional(
                                          Schema.NullOr(Schema.String),
                                        ),
                                      }),
                                    ),
                                    termDescription: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                    price: Schema.optional(
                                      Schema.Struct({
                                        currencyCode: Schema.optional(
                                          Schema.NullOr(Schema.String),
                                        ),
                                        isPIRequired: Schema.optional(
                                          Schema.Boolean,
                                        ),
                                        listPrice: Schema.optional(
                                          Schema.Number,
                                        ),
                                        msrp: Schema.optional(Schema.Number),
                                      }),
                                    ),
                                    renewTermId: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                    renewTermUnits: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                    billingPlan: Schema.optional(
                                      Schema.Struct({
                                        billingPeriod: Schema.optional(
                                          Schema.NullOr(Schema.String),
                                        ),
                                        title: Schema.optional(
                                          Schema.NullOr(Schema.String),
                                        ),
                                        description: Schema.optional(
                                          Schema.NullOr(Schema.String),
                                        ),
                                        price: Schema.optional(
                                          Schema.Struct({
                                            currencyCode: Schema.optional(
                                              Schema.NullOr(Schema.String),
                                            ),
                                            isPIRequired: Schema.optional(
                                              Schema.Boolean,
                                            ),
                                            listPrice: Schema.optional(
                                              Schema.Number,
                                            ),
                                            msrp: Schema.optional(
                                              Schema.Number,
                                            ),
                                          }),
                                        ),
                                      }),
                                    ),
                                    renewToTermBillingPlan: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                  }),
                                ),
                              ),
                            ),
                            piFilter: Schema.optional(
                              Schema.Struct({
                                exclusionProperties: Schema.optional(
                                  Schema.NullOr(Schema.Array(Schema.String)),
                                ),
                                inclusionProperties: Schema.optional(
                                  Schema.NullOr(Schema.Array(Schema.String)),
                                ),
                              }),
                            ),
                            isStopSell: Schema.optional(Schema.Boolean),
                            hasFreeTrials: Schema.optional(Schema.Boolean),
                            assetBehaviors: Schema.optional(
                              Schema.NullOr(Schema.Array(Schema.String)),
                            ),
                            consumptionUnitType: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            displayRank: Schema.optional(Schema.Number),
                            remediationRequired: Schema.optional(
                              Schema.Boolean,
                            ),
                            remediations: Schema.optional(
                              Schema.NullOr(
                                Schema.Array(
                                  Schema.Struct({
                                    remediationId: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                    type: Schema.optional(
                                      Schema.NullOr(Schema.String),
                                    ),
                                  }),
                                ),
                              ),
                            ),
                            startDate: Schema.optional(
                              Schema.NullOr(Schema.Number),
                            ),
                            endDate: Schema.optional(
                              Schema.NullOr(Schema.Number),
                            ),
                            planAvailabilities: Schema.optional(
                              Schema.NullOr(Schema.Array(Schema.Unknown)),
                            ),
                          }),
                        ),
                      ),
                    ),
                    categoryIds: Schema.optional(
                      Schema.NullOr(Schema.Array(Schema.String)),
                    ),
                    conversionPaths: Schema.optional(
                      Schema.NullOr(Schema.Array(Schema.String)),
                    ),
                    metadata: Schema.optional(
                      Schema.Struct({
                        properties: Schema.optional(
                          Schema.NullOr(
                            Schema.Record(Schema.String, Schema.Unknown),
                          ),
                        ),
                      }),
                    ),
                    operatingSystem: Schema.optional(
                      Schema.Struct({
                        family: Schema.optional(Schema.NullOr(Schema.String)),
                        type: Schema.optional(Schema.NullOr(Schema.String)),
                        name: Schema.optional(Schema.NullOr(Schema.String)),
                      }),
                    ),
                    uiDefinitionUri: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    artifacts: Schema.optional(
                      Schema.NullOr(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.NullOr(Schema.String)),
                            uri: Schema.optional(Schema.NullOr(Schema.String)),
                            type: Schema.optional(Schema.Struct({})),
                          }),
                        ),
                      ),
                    ),
                    version: Schema.optional(Schema.NullOr(Schema.String)),
                    itemName: Schema.optional(Schema.NullOr(Schema.String)),
                    isPrivate: Schema.optional(Schema.Boolean),
                    isHidden: Schema.optional(Schema.Boolean),
                    hasFreeTrials: Schema.optional(Schema.Boolean),
                    isByol: Schema.optional(Schema.Boolean),
                    isFree: Schema.optional(Schema.Boolean),
                    isPayg: Schema.optional(Schema.Boolean),
                    isStopSell: Schema.optional(Schema.Boolean),
                    stopSellInfo: Schema.optional(
                      Schema.Struct({
                        startDate: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        reason: Schema.optional(Schema.Struct({})),
                        alternativeOfferId: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        alternativePlanId: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                      }),
                    ),
                    altStackReference: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    stackType: Schema.optional(Schema.NullOr(Schema.String)),
                    altArchitectureReference: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    architectureType: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    cspState: Schema.optional(Schema.Struct({})),
                    resourceProviderNamespace: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    resourceType: Schema.optional(Schema.NullOr(Schema.String)),
                    minQuantity: Schema.optional(Schema.NullOr(Schema.Number)),
                    maxQuantity: Schema.optional(Schema.NullOr(Schema.Number)),
                    isQuantifiable: Schema.optional(Schema.Boolean),
                    callToAction: Schema.optional(Schema.NullOr(Schema.String)),
                    redirectUrl: Schema.optional(Schema.NullOr(Schema.String)),
                    serviceIdentifier: Schema.optional(
                      Schema.NullOr(Schema.String),
                    ),
                    vmSecurityType: Schema.optional(Schema.Struct({})),
                    displayRank: Schema.optional(Schema.NullOr(Schema.String)),
                    billingComponents: Schema.optional(
                      Schema.NullOr(
                        Schema.Array(
                          Schema.Struct({
                            billingTag: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            customMeterIds: Schema.optional(
                              Schema.NullOr(
                                Schema.Record(
                                  Schema.String,
                                  Schema.Array(Schema.Number),
                                ),
                              ),
                            ),
                          }),
                        ),
                      ),
                    ),
                    purchaseDurationDiscounts: Schema.optional(
                      Schema.NullOr(
                        Schema.Array(
                          Schema.Struct({
                            duration: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            discountPercentage: Schema.optional(Schema.Number),
                          }),
                        ),
                      ),
                    ),
                    upns: Schema.optional(
                      Schema.NullOr(
                        Schema.Array(
                          Schema.Struct({
                            termId: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            upn: Schema.optional(Schema.NullOr(Schema.String)),
                          }),
                        ),
                      ),
                    ),
                    hasRI: Schema.optional(Schema.Boolean),
                    isHiddenPrivateOffer: Schema.optional(
                      Schema.NullOr(Schema.Boolean),
                    ),
                    certifications: Schema.optional(
                      Schema.NullOr(
                        Schema.Array(
                          Schema.Struct({
                            id: Schema.optional(Schema.NullOr(Schema.String)),
                            displayName: Schema.optional(
                              Schema.NullOr(Schema.String),
                            ),
                            uri: Schema.optional(Schema.NullOr(Schema.String)),
                          }),
                        ),
                      ),
                    ),
                    pricingTypes: Schema.optional(
                      Schema.NullOr(
                        Schema.Array(
                          Schema.Literals([
                            "Free",
                            "FreeTrial",
                            "Byol",
                            "Payg",
                            "Ri",
                          ]),
                        ),
                      ),
                    ),
                  }),
                ),
              ),
            ),
            resourceGroupName: Schema.optional(Schema.NullOr(Schema.String)),
            definitionTemplates: Schema.optional(
              Schema.Struct({
                uiDefinitionFileUri: Schema.optional(
                  Schema.NullOr(Schema.String),
                ),
                defaultDeploymentTemplateId: Schema.optional(
                  Schema.NullOr(Schema.String),
                ),
                deploymentTemplateFileUris: Schema.optional(
                  Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
                ),
                deploymentFragmentFileUris: Schema.optional(
                  Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
                ),
              }),
            ),
            additionalProperties: Schema.optional(
              Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
            ),
            restrictedAudience: Schema.optional(
              Schema.Struct({
                subscriptions: Schema.optional(
                  Schema.NullOr(Schema.Array(Schema.String)),
                ),
                tenants: Schema.optional(
                  Schema.NullOr(Schema.Array(Schema.String)),
                ),
                users: Schema.optional(
                  Schema.NullOr(Schema.Array(Schema.String)),
                ),
                groups: Schema.optional(
                  Schema.NullOr(Schema.Array(Schema.String)),
                ),
              }),
            ),
            isDeleted: Schema.optional(Schema.Boolean),
            isThirdParty: Schema.optional(Schema.Boolean),
            groupId: Schema.optional(Schema.NullOr(Schema.String)),
            hideKeys: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            keywords: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            popularity: Schema.optional(Schema.Number),
            pricingDetailsUri: Schema.optional(Schema.NullOr(Schema.String)),
            hasFreeTrials: Schema.optional(Schema.Boolean),
            isByol: Schema.optional(Schema.Boolean),
            isMacc: Schema.optional(Schema.Boolean),
            hasFreePlans: Schema.optional(Schema.Boolean),
            isQuantifiable: Schema.optional(Schema.Boolean),
            altStackReference: Schema.optional(Schema.NullOr(Schema.String)),
            hasPaygPlans: Schema.optional(Schema.Boolean),
            isReseller: Schema.optional(Schema.Boolean),
            ttl: Schema.optional(Schema.NullOr(Schema.Number)),
            isExcludedFromSearch: Schema.optional(Schema.Boolean),
            applicableStoreFronts: Schema.optional(Schema.Struct({})),
            offerVersion: Schema.optional(Schema.NullOr(Schema.String)),
            isMicrosoftProduct: Schema.optional(Schema.NullOr(Schema.Boolean)),
            productOwnershipSellingMotion: Schema.optional(
              Schema.NullOr(Schema.String),
            ),
            documentLinks: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.NullOr(Schema.String)),
                    displayName: Schema.optional(Schema.NullOr(Schema.String)),
                    uri: Schema.optional(Schema.NullOr(Schema.String)),
                  }),
                ),
              ),
            ),
            offerEnvironment: Schema.optional(Schema.Struct({})),
            linkedAddIns: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            linkedAddInsTypes: Schema.optional(
              Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
            ),
            excludeFromBootstrap: Schema.optional(Schema.Boolean),
            hydrationNotificationReceivedAt: Schema.optional(
              Schema.NullOr(Schema.String),
            ),
            bigCatLastModifiedDate: Schema.optional(
              Schema.NullOr(Schema.String),
            ),
            disableSendEmailOnPurchase: Schema.optional(Schema.Boolean),
            hideFromSaasBlade: Schema.optional(Schema.Boolean),
            integratedWithMicrosoftGraphApi: Schema.optional(Schema.Boolean),
            multiTenantAadAppId: Schema.optional(Schema.NullOr(Schema.String)),
            licenseManagementType: Schema.optional(
              Schema.NullOr(Schema.String),
            ),
            licenseModel: Schema.optional(Schema.NullOr(Schema.String)),
            pbiServicePrincipalIds: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            isCoreVm: Schema.optional(Schema.NullOr(Schema.Boolean)),
            m365CertificationInfo: Schema.optional(
              Schema.Struct({
                m365CertificationType: Schema.optional(Schema.Struct({})),
                m365CertificationDetailsUrl: Schema.optional(
                  Schema.NullOr(Schema.String),
                ),
                m365CertificationId: Schema.optional(
                  Schema.NullOr(Schema.String),
                ),
              }),
            ),
            downloadLink: Schema.optional(Schema.NullOr(Schema.String)),
            downloadSampleLink: Schema.optional(Schema.NullOr(Schema.String)),
            omexAssetId: Schema.optional(Schema.NullOr(Schema.String)),
            mixProductId: Schema.optional(Schema.NullOr(Schema.String)),
            appFreeType: Schema.optional(Schema.NullOr(Schema.String)),
            storeFrontPricings: Schema.optional(
              Schema.NullOr(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    pricingOptions: Schema.optional(Schema.Struct({})),
                    hasPrices: Schema.optional(Schema.NullOr(Schema.Boolean)),
                  }),
                ),
              ),
            ),
            hasRIPlans: Schema.optional(Schema.Boolean),
            enrichedData: Schema.optional(
              Schema.Struct({
                tags: Schema.optional(
                  Schema.NullOr(Schema.Array(Schema.String)),
                ),
                popularity: Schema.optional(
                  Schema.Struct({
                    appSourceCs: Schema.optional(Schema.Number),
                    appSourceApps: Schema.optional(Schema.Number),
                    ampCs: Schema.optional(Schema.Number),
                    ampApps: Schema.optional(Schema.Number),
                    azurePortalApps: Schema.optional(Schema.Number),
                  }),
                ),
                rating: Schema.optional(
                  Schema.Struct({
                    appSource: Schema.optional(
                      Schema.Struct({
                        totalRatings: Schema.optional(Schema.Number),
                        source: Schema.optional(
                          Schema.Literals([
                            "None",
                            "AppSource",
                            "Amp",
                            "Ibiza",
                            "G2",
                            "Internal",
                            "All",
                          ]),
                        ),
                        averageRating: Schema.optional(Schema.Number),
                        createdAt: Schema.optional(Schema.String),
                        externalOfferReference: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        starsDistribution: Schema.optional(
                          Schema.NullOr(
                            Schema.Record(Schema.String, Schema.Number),
                          ),
                        ),
                        buckets: Schema.optional(
                          Schema.NullOr(Schema.Array(Schema.String)),
                        ),
                      }),
                    ),
                    amp: Schema.optional(
                      Schema.Struct({
                        totalRatings: Schema.optional(Schema.Number),
                        source: Schema.optional(
                          Schema.Literals([
                            "None",
                            "AppSource",
                            "Amp",
                            "Ibiza",
                            "G2",
                            "Internal",
                            "All",
                          ]),
                        ),
                        averageRating: Schema.optional(Schema.Number),
                        createdAt: Schema.optional(Schema.String),
                        externalOfferReference: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        starsDistribution: Schema.optional(
                          Schema.NullOr(
                            Schema.Record(Schema.String, Schema.Number),
                          ),
                        ),
                        buckets: Schema.optional(
                          Schema.NullOr(Schema.Array(Schema.String)),
                        ),
                      }),
                    ),
                    azurePortal: Schema.optional(
                      Schema.Struct({
                        totalRatings: Schema.optional(Schema.Number),
                        source: Schema.optional(
                          Schema.Literals([
                            "None",
                            "AppSource",
                            "Amp",
                            "Ibiza",
                            "G2",
                            "Internal",
                            "All",
                          ]),
                        ),
                        averageRating: Schema.optional(Schema.Number),
                        createdAt: Schema.optional(Schema.String),
                        externalOfferReference: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        starsDistribution: Schema.optional(
                          Schema.NullOr(
                            Schema.Record(Schema.String, Schema.Number),
                          ),
                        ),
                        buckets: Schema.optional(
                          Schema.NullOr(Schema.Array(Schema.String)),
                        ),
                      }),
                    ),
                    g2: Schema.optional(
                      Schema.Struct({
                        totalRatings: Schema.optional(Schema.Number),
                        source: Schema.optional(
                          Schema.Literals([
                            "None",
                            "AppSource",
                            "Amp",
                            "Ibiza",
                            "G2",
                            "Internal",
                            "All",
                          ]),
                        ),
                        averageRating: Schema.optional(Schema.Number),
                        createdAt: Schema.optional(Schema.String),
                        externalOfferReference: Schema.optional(
                          Schema.NullOr(Schema.String),
                        ),
                        starsDistribution: Schema.optional(
                          Schema.NullOr(
                            Schema.Record(Schema.String, Schema.Number),
                          ),
                        ),
                        buckets: Schema.optional(
                          Schema.NullOr(Schema.Array(Schema.String)),
                        ),
                      }),
                    ),
                  }),
                ),
                isAzureBenefitEligible: Schema.optional(Schema.Boolean),
                isSolutionMap: Schema.optional(Schema.Boolean),
              }),
            ),
            capabilities: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Literals([
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                  ]),
                ),
              ),
            ),
            releaseDate: Schema.optional(Schema.NullOr(Schema.String)),
            hideFromAdminPortal: Schema.optional(Schema.Boolean),
            awards: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            powerBIVisualId: Schema.optional(Schema.NullOr(Schema.String)),
            pricingTypes: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Literals(["Free", "FreeTrial", "Byol", "Payg", "Ri"]),
                ),
              ),
            ),
            autoRunLaunchEvents: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.String)),
            ),
            service: Schema.optional(Schema.NullOr(Schema.String)),
            serviceId: Schema.optional(Schema.NullOr(Schema.String)),
            productType: Schema.optional(Schema.NullOr(Schema.String)),
            productFamily: Schema.optional(Schema.NullOr(Schema.String)),
            id: Schema.optional(Schema.NullOr(Schema.String)),
            partitionKey: Schema.optional(Schema.NullOr(Schema.String)),
            ts: Schema.optional(Schema.Number),
            searchScore: Schema.optional(Schema.NullOr(Schema.Number)),
          }),
        ),
      ),
    ),
  });
export type EdgeZonesProductsListOutput =
  typeof EdgeZonesProductsListOutput.Type;

// The operation
/**
 * Get a list of edge zone products
 */
export const EdgeZonesProductsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EdgeZonesProductsListInput,
    outputSchema: EdgeZonesProductsListOutput,
  }),
);
// Input Schema
export const GetApiKeysListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Marketplace/keys",
  }),
);
export type GetApiKeysListInput = typeof GetApiKeysListInput.Type;

// Output Schema
export const GetApiKeysListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        keyAlias: Schema.optional(Schema.String),
        key: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type GetApiKeysListOutput = typeof GetApiKeysListOutput.Type;

// The operation
/**
 * Retrieves a list of API keys associated with a selected subscription. Please note that this API is currently in a preview state and requires sign-up to the 'Discovery Api Key Early Access' preview feature using a valid Azure subscription. For more information on this process please see the documentation for Marketplace Catalog APIs [here](https://learn.microsoft.com/en-us/rest/api/marketplacecatalog/dataplane/products/get?view=rest-marketplacecatalog-dataplane-2023-05-01-preview&tabs=HTTP)
 *
 * @param x-ms-client-tenant-id - The tenant associated with the subscription.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const GetApiKeysList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetApiKeysListInput,
  outputSchema: GetApiKeysListOutput,
}));
// Input Schema
export const ProductGetGetByBillingAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    includeStopSoldPlans: Schema.optional(Schema.Boolean),
    language: Schema.optional(Schema.String),
    includeHiddenPlans: Schema.optional(Schema.Boolean),
    includeServiceInstructionTemplates: Schema.optional(Schema.Boolean),
    planId: Schema.optional(Schema.String),
    skuId: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Marketplace/products/{productId}",
    }),
  );
export type ProductGetGetByBillingAccountInput =
  typeof ProductGetGetByBillingAccountInput.Type;

// Output Schema
export const ProductGetGetByBillingAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    displayName: Schema.optional(Schema.String),
    popularity: Schema.optional(Schema.Number),
    categoryIds: Schema.optional(Schema.Array(Schema.String)),
    industryIds: Schema.optional(Schema.Array(Schema.String)),
    publisherId: Schema.optional(Schema.String),
    azureBenefit: Schema.optional(Schema.String),
    badges: Schema.optional(Schema.Array(Schema.String)),
    publisherType: Schema.optional(Schema.String),
    publishingStage: Schema.optional(Schema.String),
    uniqueProductId: Schema.String,
    productType: Schema.String,
    productSubType: Schema.optional(Schema.String),
    productFamily: Schema.optional(Schema.String),
    operatingSystems: Schema.optional(Schema.Array(Schema.String)),
    pricingTypes: Schema.optional(Schema.Array(Schema.String)),
    publisherDisplayName: Schema.optional(Schema.String),
    longSummary: Schema.optional(Schema.String),
    summary: Schema.optional(Schema.String),
    smallIconUri: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    cspLegalTermsUri: Schema.optional(Schema.String),
    privacyPolicyUri: Schema.optional(Schema.String),
    ratingBuckets: Schema.optional(Schema.Array(Schema.String)),
    ratingAverage: Schema.optional(Schema.Number),
    ratingCount: Schema.optional(Schema.Number),
    supportedProducts: Schema.optional(Schema.Array(Schema.String)),
    applicableProducts: Schema.optional(Schema.Array(Schema.String)),
    lastModifiedDateTime: Schema.optional(Schema.String),
    locations: Schema.optional(Schema.Array(Schema.String)),
    serviceFamily: Schema.optional(Schema.String),
    service: Schema.optional(Schema.String),
    productId: Schema.optional(Schema.String),
    hasRiPlans: Schema.optional(Schema.Boolean),
    hasMarketplaceFootprint: Schema.optional(Schema.Boolean),
    attributes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    videos: Schema.optional(
      Schema.Array(
        Schema.Struct({
          caption: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
          videoPurpose: Schema.optional(Schema.String),
          previewImage: Schema.optional(
            Schema.Struct({
              caption: Schema.optional(Schema.String),
              uri: Schema.optional(Schema.String),
              imagePurpose: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    images: Schema.optional(
      Schema.Array(
        Schema.Struct({
          context: Schema.optional(Schema.String),
          items: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    linkedAddIns: Schema.optional(Schema.Array(Schema.String)),
    links: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
        }),
      ),
    ),
    language: Schema.optional(Schema.String),
    hasStandardContractAmendments: Schema.optional(Schema.Boolean),
    offerId: Schema.optional(Schema.String),
    standardContractAmendmentsRevisionId: Schema.optional(Schema.String),
    universalAmendmentUrl: Schema.optional(Schema.String),
    isPrivate: Schema.Boolean,
    isStopSell: Schema.Boolean,
    legalTermsUri: Schema.optional(Schema.String),
    legalTermsType: Schema.optional(Schema.String),
    supportUri: Schema.optional(Schema.String),
    uiDefinitionUri: Schema.optional(Schema.String),
    screenshotUris: Schema.optional(Schema.Array(Schema.String)),
    mediumIconUri: Schema.optional(Schema.String),
    largeIconUri: Schema.optional(Schema.String),
    wideIconUri: Schema.optional(Schema.String),
    pricingDetailsUri: Schema.optional(Schema.String),
    isReseller: Schema.optional(Schema.Boolean),
    productOwnershipSellingMotion: Schema.optional(Schema.String),
    disableSendEmailOnPurchase: Schema.optional(Schema.Boolean),
    isCoreVm: Schema.optional(Schema.Boolean),
    stopSellInfo: Schema.optional(
      Schema.Struct({
        startDate: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
        alternativeOfferId: Schema.optional(Schema.String),
        alternativePlanId: Schema.optional(Schema.String),
      }),
    ),
    marketingMaterial: Schema.optional(
      Schema.Struct({
        path: Schema.optional(Schema.String),
        learnUri: Schema.optional(Schema.String),
      }),
    ),
    artifacts: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
          artifactType: Schema.String,
        }),
      ),
    ),
    plans: Schema.optional(
      Schema.Array(
        Schema.Struct({
          planId: Schema.optional(Schema.String),
          uniquePlanId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          vmArchitectureType: Schema.optional(Schema.String),
          cspState: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              generation: Schema.optional(Schema.String),
              altStackReference: Schema.optional(Schema.String),
            }),
          ),
          altStackReference: Schema.optional(Schema.String),
          stackType: Schema.optional(Schema.String),
          altArchitectureReference: Schema.optional(Schema.String),
          categoryIds: Schema.optional(Schema.Array(Schema.String)),
          hasProtectedArtifacts: Schema.optional(Schema.Boolean),
          pricingTypes: Schema.optional(Schema.Array(Schema.String)),
          vmSecuritytypes: Schema.optional(Schema.Array(Schema.String)),
          summary: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          skuId: Schema.optional(Schema.String),
          planType: Schema.String,
          displayRank: Schema.optional(Schema.String),
          isPrivate: Schema.optional(Schema.Boolean),
          hasRi: Schema.optional(Schema.Boolean),
          id: Schema.optional(Schema.String),
          availabilities: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                actions: Schema.optional(Schema.Array(Schema.String)),
                meter: Schema.optional(
                  Schema.Struct({
                    meterId: Schema.optional(Schema.String),
                    partNumber: Schema.optional(Schema.String),
                    consumptionResourceId: Schema.optional(Schema.String),
                    price: Schema.optional(
                      Schema.Struct({
                        currencyCode: Schema.optional(Schema.String),
                        isPiRequired: Schema.Boolean,
                        listPrice: Schema.Number,
                        msrp: Schema.Number,
                      }),
                    ),
                    type: Schema.optional(Schema.String),
                    includedQuantityProperties: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          termId: Schema.optional(Schema.String),
                          quantity: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                pricingAudience: Schema.String,
                terms: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      termDescriptionParameters: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            parameter: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      termId: Schema.optional(Schema.String),
                      termUnit: Schema.optional(Schema.String),
                      prorationPolicy: Schema.optional(
                        Schema.Struct({
                          minimumProratedUnits: Schema.optional(Schema.String),
                        }),
                      ),
                      termDescription: Schema.optional(Schema.String),
                      price: Schema.optional(
                        Schema.Struct({
                          currencyCode: Schema.optional(Schema.String),
                          isPiRequired: Schema.Boolean,
                          listPrice: Schema.Number,
                          msrp: Schema.Number,
                        }),
                      ),
                      renewTermId: Schema.optional(Schema.String),
                      renewTermUnits: Schema.optional(Schema.String),
                      billingPlan: Schema.optional(
                        Schema.Struct({
                          billingPeriod: Schema.optional(Schema.String),
                          title: Schema.optional(Schema.String),
                          description: Schema.optional(Schema.String),
                          price: Schema.optional(
                            Schema.Struct({
                              currencyCode: Schema.optional(Schema.String),
                              isPiRequired: Schema.Boolean,
                              listPrice: Schema.Number,
                              msrp: Schema.Number,
                            }),
                          ),
                        }),
                      ),
                      renewToTermBillingPlan: Schema.optional(Schema.String),
                      isAutorenewable: Schema.optional(Schema.Boolean),
                      lifecyclePolicy: Schema.optional(
                        Schema.Struct({
                          graceDuration: Schema.optional(Schema.String),
                          inactiveDuration: Schema.optional(Schema.String),
                          lockoutDuration: Schema.optional(Schema.String),
                        }),
                      ),
                      productCode: Schema.optional(Schema.String),
                      state: Schema.optional(Schema.String),
                      actions: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                ),
                hasFreeTrials: Schema.Boolean,
                consumptionUnitType: Schema.optional(Schema.String),
                displayRank: Schema.Number,
              }),
            ),
          ),
          uiDefinitionUri: Schema.optional(Schema.String),
          artifacts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
                artifactType: Schema.String,
              }),
            ),
          ),
          version: Schema.optional(Schema.String),
          isHidden: Schema.Boolean,
          isStopSell: Schema.Boolean,
          stopSellInfo: Schema.optional(
            Schema.Struct({
              startDate: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              alternativeOfferId: Schema.optional(Schema.String),
              alternativePlanId: Schema.optional(Schema.String),
            }),
          ),
          minQuantity: Schema.optional(Schema.Number),
          maxQuantity: Schema.optional(Schema.Number),
          isQuantifiable: Schema.Boolean,
          billingComponents: Schema.optional(
            Schema.Array(
              Schema.Struct({
                billingTag: Schema.optional(Schema.String),
              }),
            ),
          ),
          purchaseDurationDiscounts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                duration: Schema.optional(Schema.String),
                discountPercentage: Schema.Number,
              }),
            ),
          ),
          isHiddenPrivateOffer: Schema.optional(Schema.Boolean),
          certifications: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
              }),
            ),
          ),
          customerInstruction: Schema.optional(Schema.String),
          planLabels: Schema.optional(Schema.Array(Schema.String)),
          skuType: Schema.optional(Schema.String),
          skuTitle: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          armRegionName: Schema.optional(Schema.String),
          cloud: Schema.optional(Schema.String),
          locationType: Schema.optional(Schema.String),
          region: Schema.optional(Schema.String),
          skuGroupId: Schema.optional(Schema.String),
          zone: Schema.optional(Schema.String),
          feature: Schema.optional(Schema.String),
          serviceType: Schema.optional(Schema.String),
          skuAttributes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          skuProperties: Schema.optional(
            Schema.Struct({
              category: Schema.optional(Schema.String),
              dataDiskType: Schema.optional(Schema.String),
              diskType: Schema.optional(Schema.String),
              numberOfCores: Schema.optional(Schema.String),
              ram: Schema.optional(Schema.String),
              vCpu: Schema.optional(Schema.String),
              armSkuName: Schema.optional(Schema.String),
              accessTier: Schema.optional(Schema.String),
            }),
          ),
          offeringProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                productCode: Schema.optional(Schema.String),
                termId: Schema.optional(Schema.String),
                meterType: Schema.optional(Schema.String),
                billingMeterId: Schema.optional(Schema.String),
                offeringId: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          hasConsumptionComponents: Schema.optional(Schema.Boolean),
          isEndUserEligible: Schema.optional(Schema.Boolean),
          isAdminEligible: Schema.optional(Schema.Boolean),
          entraIdVersion: Schema.optional(Schema.String),
          technicalRequirements: Schema.optional(Schema.String),
          faqUri: Schema.optional(Schema.String),
          fulfillmentData: Schema.optional(
            Schema.Struct({
              fulfillmentType: Schema.optional(Schema.String),
              attributes: Schema.optional(
                Schema.Struct({
                  fulfillmentTiming: Schema.optional(Schema.String),
                  fulfillmentDelayMitigation: Schema.optional(Schema.String),
                }),
              ),
              additionalProducts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    productSkuId: Schema.optional(Schema.String),
                    defaultKeyActivationCount: Schema.optional(Schema.Number),
                  }),
                ),
              ),
            }),
          ),
          benefits: Schema.optional(
            Schema.Array(
              Schema.Struct({
                benefitType: Schema.optional(Schema.String),
                basePlanId: Schema.optional(Schema.String),
                billingPlan: Schema.optional(Schema.String),
                termDuration: Schema.optional(Schema.String),
              }),
            ),
          ),
          constraintsData: Schema.optional(
            Schema.Struct({
              seatConstraints: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.String),
                    minSeats: Schema.optional(Schema.Number),
                    maxSeats: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              assetOwnershipLimits: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.String),
                    minAssets: Schema.optional(Schema.Number),
                    maxAssets: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              prerequisiteSkus: Schema.optional(
                Schema.Struct({
                  mustHaveAll: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        productId: Schema.optional(Schema.String),
                        skuIds: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                  ),
                  mustHaveAny: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        productId: Schema.optional(Schema.String),
                        skuIds: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                  ),
                  seatConstraints: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        type: Schema.optional(Schema.String),
                        minPercentSeats: Schema.optional(Schema.Number),
                        maxPercentSeats: Schema.optional(Schema.Number),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          meterTypeDescriptions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(
                  Schema.Struct({
                    meterType: Schema.optional(Schema.String),
                    unitOfMeasure: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
          usageUnit: Schema.optional(Schema.String),
          skuName: Schema.optional(Schema.String),
        }),
      ),
    ),
    hasAddOns: Schema.optional(Schema.Boolean),
  });
export type ProductGetGetByBillingAccountOutput =
  typeof ProductGetGetByBillingAccountOutput.Type;

// The operation
/**
 * Gets a single product by billing account.
 *
 * @param api-version - The API version to use for this operation.
 * @param includeStopSoldPlans - Indicates whether to include plans that are no longer available for purchase in the response. By default, includeStopSoldPlans is set to FALSE.
 * @param language - Language to search, ISO 639-1 two-letter code, possible values - 'en,cs,de,es,fr,hu,it,ja,ko,nl,pl,pt-br,pt-pt,ru,sv,tr,id,zh-hans,zh-hant'. Default is "en"
 * @param includeHiddenPlans - Indicates whether to include hidden plans in the response. By default, includeHiddenPlans is set to FALSE.
 * @param includeServiceInstructionTemplates - Indicates whether to include the product's service instruction templates in the response. By default, includeServiceInstructionTemplates is set to FALSE.
 * @param planId - Optional to pass the plan id to filter to a specific plan within the product. If not specified, the response will include all plans of the product.
 * @param skuId - Optional to pass the sku id to filter to a specific sku within the product. If not specified, the response will include all skus of the product.
 */
export const ProductGetGetByBillingAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductGetGetByBillingAccountInput,
    outputSchema: ProductGetGetByBillingAccountOutput,
  }));
// Input Schema
export const ProductGetGetByBillingProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    includeStopSoldPlans: Schema.optional(Schema.Boolean),
    language: Schema.optional(Schema.String),
    includeHiddenPlans: Schema.optional(Schema.Boolean),
    includeServiceInstructionTemplates: Schema.optional(Schema.Boolean),
    planId: Schema.optional(Schema.String),
    skuId: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.Marketplace/products/{productId}",
    }),
  );
export type ProductGetGetByBillingProfileInput =
  typeof ProductGetGetByBillingProfileInput.Type;

// Output Schema
export const ProductGetGetByBillingProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    displayName: Schema.optional(Schema.String),
    popularity: Schema.optional(Schema.Number),
    categoryIds: Schema.optional(Schema.Array(Schema.String)),
    industryIds: Schema.optional(Schema.Array(Schema.String)),
    publisherId: Schema.optional(Schema.String),
    azureBenefit: Schema.optional(Schema.String),
    badges: Schema.optional(Schema.Array(Schema.String)),
    publisherType: Schema.optional(Schema.String),
    publishingStage: Schema.optional(Schema.String),
    uniqueProductId: Schema.String,
    productType: Schema.String,
    productSubType: Schema.optional(Schema.String),
    productFamily: Schema.optional(Schema.String),
    operatingSystems: Schema.optional(Schema.Array(Schema.String)),
    pricingTypes: Schema.optional(Schema.Array(Schema.String)),
    publisherDisplayName: Schema.optional(Schema.String),
    longSummary: Schema.optional(Schema.String),
    summary: Schema.optional(Schema.String),
    smallIconUri: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    cspLegalTermsUri: Schema.optional(Schema.String),
    privacyPolicyUri: Schema.optional(Schema.String),
    ratingBuckets: Schema.optional(Schema.Array(Schema.String)),
    ratingAverage: Schema.optional(Schema.Number),
    ratingCount: Schema.optional(Schema.Number),
    supportedProducts: Schema.optional(Schema.Array(Schema.String)),
    applicableProducts: Schema.optional(Schema.Array(Schema.String)),
    lastModifiedDateTime: Schema.optional(Schema.String),
    locations: Schema.optional(Schema.Array(Schema.String)),
    serviceFamily: Schema.optional(Schema.String),
    service: Schema.optional(Schema.String),
    productId: Schema.optional(Schema.String),
    hasRiPlans: Schema.optional(Schema.Boolean),
    hasMarketplaceFootprint: Schema.optional(Schema.Boolean),
    attributes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    videos: Schema.optional(
      Schema.Array(
        Schema.Struct({
          caption: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
          videoPurpose: Schema.optional(Schema.String),
          previewImage: Schema.optional(
            Schema.Struct({
              caption: Schema.optional(Schema.String),
              uri: Schema.optional(Schema.String),
              imagePurpose: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    images: Schema.optional(
      Schema.Array(
        Schema.Struct({
          context: Schema.optional(Schema.String),
          items: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    linkedAddIns: Schema.optional(Schema.Array(Schema.String)),
    links: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
        }),
      ),
    ),
    language: Schema.optional(Schema.String),
    hasStandardContractAmendments: Schema.optional(Schema.Boolean),
    offerId: Schema.optional(Schema.String),
    standardContractAmendmentsRevisionId: Schema.optional(Schema.String),
    universalAmendmentUrl: Schema.optional(Schema.String),
    isPrivate: Schema.Boolean,
    isStopSell: Schema.Boolean,
    legalTermsUri: Schema.optional(Schema.String),
    legalTermsType: Schema.optional(Schema.String),
    supportUri: Schema.optional(Schema.String),
    uiDefinitionUri: Schema.optional(Schema.String),
    screenshotUris: Schema.optional(Schema.Array(Schema.String)),
    mediumIconUri: Schema.optional(Schema.String),
    largeIconUri: Schema.optional(Schema.String),
    wideIconUri: Schema.optional(Schema.String),
    pricingDetailsUri: Schema.optional(Schema.String),
    isReseller: Schema.optional(Schema.Boolean),
    productOwnershipSellingMotion: Schema.optional(Schema.String),
    disableSendEmailOnPurchase: Schema.optional(Schema.Boolean),
    isCoreVm: Schema.optional(Schema.Boolean),
    stopSellInfo: Schema.optional(
      Schema.Struct({
        startDate: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
        alternativeOfferId: Schema.optional(Schema.String),
        alternativePlanId: Schema.optional(Schema.String),
      }),
    ),
    marketingMaterial: Schema.optional(
      Schema.Struct({
        path: Schema.optional(Schema.String),
        learnUri: Schema.optional(Schema.String),
      }),
    ),
    artifacts: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
          artifactType: Schema.String,
        }),
      ),
    ),
    plans: Schema.optional(
      Schema.Array(
        Schema.Struct({
          planId: Schema.optional(Schema.String),
          uniquePlanId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          vmArchitectureType: Schema.optional(Schema.String),
          cspState: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              generation: Schema.optional(Schema.String),
              altStackReference: Schema.optional(Schema.String),
            }),
          ),
          altStackReference: Schema.optional(Schema.String),
          stackType: Schema.optional(Schema.String),
          altArchitectureReference: Schema.optional(Schema.String),
          categoryIds: Schema.optional(Schema.Array(Schema.String)),
          hasProtectedArtifacts: Schema.optional(Schema.Boolean),
          pricingTypes: Schema.optional(Schema.Array(Schema.String)),
          vmSecuritytypes: Schema.optional(Schema.Array(Schema.String)),
          summary: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          skuId: Schema.optional(Schema.String),
          planType: Schema.String,
          displayRank: Schema.optional(Schema.String),
          isPrivate: Schema.optional(Schema.Boolean),
          hasRi: Schema.optional(Schema.Boolean),
          id: Schema.optional(Schema.String),
          availabilities: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                actions: Schema.optional(Schema.Array(Schema.String)),
                meter: Schema.optional(
                  Schema.Struct({
                    meterId: Schema.optional(Schema.String),
                    partNumber: Schema.optional(Schema.String),
                    consumptionResourceId: Schema.optional(Schema.String),
                    price: Schema.optional(
                      Schema.Struct({
                        currencyCode: Schema.optional(Schema.String),
                        isPiRequired: Schema.Boolean,
                        listPrice: Schema.Number,
                        msrp: Schema.Number,
                      }),
                    ),
                    type: Schema.optional(Schema.String),
                    includedQuantityProperties: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          termId: Schema.optional(Schema.String),
                          quantity: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                pricingAudience: Schema.String,
                terms: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      termDescriptionParameters: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            parameter: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      termId: Schema.optional(Schema.String),
                      termUnit: Schema.optional(Schema.String),
                      prorationPolicy: Schema.optional(
                        Schema.Struct({
                          minimumProratedUnits: Schema.optional(Schema.String),
                        }),
                      ),
                      termDescription: Schema.optional(Schema.String),
                      price: Schema.optional(
                        Schema.Struct({
                          currencyCode: Schema.optional(Schema.String),
                          isPiRequired: Schema.Boolean,
                          listPrice: Schema.Number,
                          msrp: Schema.Number,
                        }),
                      ),
                      renewTermId: Schema.optional(Schema.String),
                      renewTermUnits: Schema.optional(Schema.String),
                      billingPlan: Schema.optional(
                        Schema.Struct({
                          billingPeriod: Schema.optional(Schema.String),
                          title: Schema.optional(Schema.String),
                          description: Schema.optional(Schema.String),
                          price: Schema.optional(
                            Schema.Struct({
                              currencyCode: Schema.optional(Schema.String),
                              isPiRequired: Schema.Boolean,
                              listPrice: Schema.Number,
                              msrp: Schema.Number,
                            }),
                          ),
                        }),
                      ),
                      renewToTermBillingPlan: Schema.optional(Schema.String),
                      isAutorenewable: Schema.optional(Schema.Boolean),
                      lifecyclePolicy: Schema.optional(
                        Schema.Struct({
                          graceDuration: Schema.optional(Schema.String),
                          inactiveDuration: Schema.optional(Schema.String),
                          lockoutDuration: Schema.optional(Schema.String),
                        }),
                      ),
                      productCode: Schema.optional(Schema.String),
                      state: Schema.optional(Schema.String),
                      actions: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                ),
                hasFreeTrials: Schema.Boolean,
                consumptionUnitType: Schema.optional(Schema.String),
                displayRank: Schema.Number,
              }),
            ),
          ),
          uiDefinitionUri: Schema.optional(Schema.String),
          artifacts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
                artifactType: Schema.String,
              }),
            ),
          ),
          version: Schema.optional(Schema.String),
          isHidden: Schema.Boolean,
          isStopSell: Schema.Boolean,
          stopSellInfo: Schema.optional(
            Schema.Struct({
              startDate: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              alternativeOfferId: Schema.optional(Schema.String),
              alternativePlanId: Schema.optional(Schema.String),
            }),
          ),
          minQuantity: Schema.optional(Schema.Number),
          maxQuantity: Schema.optional(Schema.Number),
          isQuantifiable: Schema.Boolean,
          billingComponents: Schema.optional(
            Schema.Array(
              Schema.Struct({
                billingTag: Schema.optional(Schema.String),
              }),
            ),
          ),
          purchaseDurationDiscounts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                duration: Schema.optional(Schema.String),
                discountPercentage: Schema.Number,
              }),
            ),
          ),
          isHiddenPrivateOffer: Schema.optional(Schema.Boolean),
          certifications: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
              }),
            ),
          ),
          customerInstruction: Schema.optional(Schema.String),
          planLabels: Schema.optional(Schema.Array(Schema.String)),
          skuType: Schema.optional(Schema.String),
          skuTitle: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          armRegionName: Schema.optional(Schema.String),
          cloud: Schema.optional(Schema.String),
          locationType: Schema.optional(Schema.String),
          region: Schema.optional(Schema.String),
          skuGroupId: Schema.optional(Schema.String),
          zone: Schema.optional(Schema.String),
          feature: Schema.optional(Schema.String),
          serviceType: Schema.optional(Schema.String),
          skuAttributes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          skuProperties: Schema.optional(
            Schema.Struct({
              category: Schema.optional(Schema.String),
              dataDiskType: Schema.optional(Schema.String),
              diskType: Schema.optional(Schema.String),
              numberOfCores: Schema.optional(Schema.String),
              ram: Schema.optional(Schema.String),
              vCpu: Schema.optional(Schema.String),
              armSkuName: Schema.optional(Schema.String),
              accessTier: Schema.optional(Schema.String),
            }),
          ),
          offeringProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                productCode: Schema.optional(Schema.String),
                termId: Schema.optional(Schema.String),
                meterType: Schema.optional(Schema.String),
                billingMeterId: Schema.optional(Schema.String),
                offeringId: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          hasConsumptionComponents: Schema.optional(Schema.Boolean),
          isEndUserEligible: Schema.optional(Schema.Boolean),
          isAdminEligible: Schema.optional(Schema.Boolean),
          entraIdVersion: Schema.optional(Schema.String),
          technicalRequirements: Schema.optional(Schema.String),
          faqUri: Schema.optional(Schema.String),
          fulfillmentData: Schema.optional(
            Schema.Struct({
              fulfillmentType: Schema.optional(Schema.String),
              attributes: Schema.optional(
                Schema.Struct({
                  fulfillmentTiming: Schema.optional(Schema.String),
                  fulfillmentDelayMitigation: Schema.optional(Schema.String),
                }),
              ),
              additionalProducts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    productSkuId: Schema.optional(Schema.String),
                    defaultKeyActivationCount: Schema.optional(Schema.Number),
                  }),
                ),
              ),
            }),
          ),
          benefits: Schema.optional(
            Schema.Array(
              Schema.Struct({
                benefitType: Schema.optional(Schema.String),
                basePlanId: Schema.optional(Schema.String),
                billingPlan: Schema.optional(Schema.String),
                termDuration: Schema.optional(Schema.String),
              }),
            ),
          ),
          constraintsData: Schema.optional(
            Schema.Struct({
              seatConstraints: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.String),
                    minSeats: Schema.optional(Schema.Number),
                    maxSeats: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              assetOwnershipLimits: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.String),
                    minAssets: Schema.optional(Schema.Number),
                    maxAssets: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              prerequisiteSkus: Schema.optional(
                Schema.Struct({
                  mustHaveAll: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        productId: Schema.optional(Schema.String),
                        skuIds: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                  ),
                  mustHaveAny: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        productId: Schema.optional(Schema.String),
                        skuIds: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                  ),
                  seatConstraints: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        type: Schema.optional(Schema.String),
                        minPercentSeats: Schema.optional(Schema.Number),
                        maxPercentSeats: Schema.optional(Schema.Number),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          meterTypeDescriptions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(
                  Schema.Struct({
                    meterType: Schema.optional(Schema.String),
                    unitOfMeasure: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
          usageUnit: Schema.optional(Schema.String),
          skuName: Schema.optional(Schema.String),
        }),
      ),
    ),
    hasAddOns: Schema.optional(Schema.Boolean),
  });
export type ProductGetGetByBillingProfileOutput =
  typeof ProductGetGetByBillingProfileOutput.Type;

// The operation
/**
 * Gets a single product by billing profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param includeStopSoldPlans - Indicates whether to include plans that are no longer available for purchase in the response. By default, includeStopSoldPlans is set to FALSE.
 * @param language - Language to search, ISO 639-1 two-letter code, possible values - 'en,cs,de,es,fr,hu,it,ja,ko,nl,pl,pt-br,pt-pt,ru,sv,tr,id,zh-hans,zh-hant'. Default is "en"
 * @param includeHiddenPlans - Indicates whether to include hidden plans in the response. By default, includeHiddenPlans is set to FALSE.
 * @param includeServiceInstructionTemplates - Indicates whether to include the product's service instruction templates in the response. By default, includeServiceInstructionTemplates is set to FALSE.
 * @param planId - Optional to pass the plan id to filter to a specific plan within the product. If not specified, the response will include all plans of the product.
 * @param skuId - Optional to pass the sku id to filter to a specific sku within the product. If not specified, the response will include all skus of the product.
 */
export const ProductGetGetByBillingProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductGetGetByBillingProfileInput,
    outputSchema: ProductGetGetByBillingProfileOutput,
  }));
// Input Schema
export const ProductGetGetBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    includeStopSoldPlans: Schema.optional(Schema.Boolean),
    language: Schema.optional(Schema.String),
    includeHiddenPlans: Schema.optional(Schema.Boolean),
    includeServiceInstructionTemplates: Schema.optional(Schema.Boolean),
    planId: Schema.optional(Schema.String),
    skuId: Schema.optional(Schema.String),
    lookUpOfferInTenantLevel: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Marketplace/products/{productId}",
    }),
  );
export type ProductGetGetBySubscriptionInput =
  typeof ProductGetGetBySubscriptionInput.Type;

// Output Schema
export const ProductGetGetBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    displayName: Schema.optional(Schema.String),
    popularity: Schema.optional(Schema.Number),
    categoryIds: Schema.optional(Schema.Array(Schema.String)),
    industryIds: Schema.optional(Schema.Array(Schema.String)),
    publisherId: Schema.optional(Schema.String),
    azureBenefit: Schema.optional(Schema.String),
    badges: Schema.optional(Schema.Array(Schema.String)),
    publisherType: Schema.optional(Schema.String),
    publishingStage: Schema.optional(Schema.String),
    uniqueProductId: Schema.String,
    productType: Schema.String,
    productSubType: Schema.optional(Schema.String),
    productFamily: Schema.optional(Schema.String),
    operatingSystems: Schema.optional(Schema.Array(Schema.String)),
    pricingTypes: Schema.optional(Schema.Array(Schema.String)),
    publisherDisplayName: Schema.optional(Schema.String),
    longSummary: Schema.optional(Schema.String),
    summary: Schema.optional(Schema.String),
    smallIconUri: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    cspLegalTermsUri: Schema.optional(Schema.String),
    privacyPolicyUri: Schema.optional(Schema.String),
    ratingBuckets: Schema.optional(Schema.Array(Schema.String)),
    ratingAverage: Schema.optional(Schema.Number),
    ratingCount: Schema.optional(Schema.Number),
    supportedProducts: Schema.optional(Schema.Array(Schema.String)),
    applicableProducts: Schema.optional(Schema.Array(Schema.String)),
    lastModifiedDateTime: Schema.optional(Schema.String),
    locations: Schema.optional(Schema.Array(Schema.String)),
    serviceFamily: Schema.optional(Schema.String),
    service: Schema.optional(Schema.String),
    productId: Schema.optional(Schema.String),
    hasRiPlans: Schema.optional(Schema.Boolean),
    hasMarketplaceFootprint: Schema.optional(Schema.Boolean),
    attributes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    videos: Schema.optional(
      Schema.Array(
        Schema.Struct({
          caption: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
          videoPurpose: Schema.optional(Schema.String),
          previewImage: Schema.optional(
            Schema.Struct({
              caption: Schema.optional(Schema.String),
              uri: Schema.optional(Schema.String),
              imagePurpose: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    images: Schema.optional(
      Schema.Array(
        Schema.Struct({
          context: Schema.optional(Schema.String),
          items: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    linkedAddIns: Schema.optional(Schema.Array(Schema.String)),
    links: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
        }),
      ),
    ),
    language: Schema.optional(Schema.String),
    hasStandardContractAmendments: Schema.optional(Schema.Boolean),
    offerId: Schema.optional(Schema.String),
    standardContractAmendmentsRevisionId: Schema.optional(Schema.String),
    universalAmendmentUrl: Schema.optional(Schema.String),
    isPrivate: Schema.Boolean,
    isStopSell: Schema.Boolean,
    legalTermsUri: Schema.optional(Schema.String),
    legalTermsType: Schema.optional(Schema.String),
    supportUri: Schema.optional(Schema.String),
    uiDefinitionUri: Schema.optional(Schema.String),
    screenshotUris: Schema.optional(Schema.Array(Schema.String)),
    mediumIconUri: Schema.optional(Schema.String),
    largeIconUri: Schema.optional(Schema.String),
    wideIconUri: Schema.optional(Schema.String),
    pricingDetailsUri: Schema.optional(Schema.String),
    isReseller: Schema.optional(Schema.Boolean),
    productOwnershipSellingMotion: Schema.optional(Schema.String),
    disableSendEmailOnPurchase: Schema.optional(Schema.Boolean),
    isCoreVm: Schema.optional(Schema.Boolean),
    stopSellInfo: Schema.optional(
      Schema.Struct({
        startDate: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
        alternativeOfferId: Schema.optional(Schema.String),
        alternativePlanId: Schema.optional(Schema.String),
      }),
    ),
    marketingMaterial: Schema.optional(
      Schema.Struct({
        path: Schema.optional(Schema.String),
        learnUri: Schema.optional(Schema.String),
      }),
    ),
    artifacts: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
          artifactType: Schema.String,
        }),
      ),
    ),
    plans: Schema.optional(
      Schema.Array(
        Schema.Struct({
          planId: Schema.optional(Schema.String),
          uniquePlanId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          vmArchitectureType: Schema.optional(Schema.String),
          cspState: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              generation: Schema.optional(Schema.String),
              altStackReference: Schema.optional(Schema.String),
            }),
          ),
          altStackReference: Schema.optional(Schema.String),
          stackType: Schema.optional(Schema.String),
          altArchitectureReference: Schema.optional(Schema.String),
          categoryIds: Schema.optional(Schema.Array(Schema.String)),
          hasProtectedArtifacts: Schema.optional(Schema.Boolean),
          pricingTypes: Schema.optional(Schema.Array(Schema.String)),
          vmSecuritytypes: Schema.optional(Schema.Array(Schema.String)),
          summary: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          skuId: Schema.optional(Schema.String),
          planType: Schema.String,
          displayRank: Schema.optional(Schema.String),
          isPrivate: Schema.optional(Schema.Boolean),
          hasRi: Schema.optional(Schema.Boolean),
          id: Schema.optional(Schema.String),
          availabilities: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                actions: Schema.optional(Schema.Array(Schema.String)),
                meter: Schema.optional(
                  Schema.Struct({
                    meterId: Schema.optional(Schema.String),
                    partNumber: Schema.optional(Schema.String),
                    consumptionResourceId: Schema.optional(Schema.String),
                    price: Schema.optional(
                      Schema.Struct({
                        currencyCode: Schema.optional(Schema.String),
                        isPiRequired: Schema.Boolean,
                        listPrice: Schema.Number,
                        msrp: Schema.Number,
                      }),
                    ),
                    type: Schema.optional(Schema.String),
                    includedQuantityProperties: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          termId: Schema.optional(Schema.String),
                          quantity: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                pricingAudience: Schema.String,
                terms: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      termDescriptionParameters: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            parameter: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      termId: Schema.optional(Schema.String),
                      termUnit: Schema.optional(Schema.String),
                      prorationPolicy: Schema.optional(
                        Schema.Struct({
                          minimumProratedUnits: Schema.optional(Schema.String),
                        }),
                      ),
                      termDescription: Schema.optional(Schema.String),
                      price: Schema.optional(
                        Schema.Struct({
                          currencyCode: Schema.optional(Schema.String),
                          isPiRequired: Schema.Boolean,
                          listPrice: Schema.Number,
                          msrp: Schema.Number,
                        }),
                      ),
                      renewTermId: Schema.optional(Schema.String),
                      renewTermUnits: Schema.optional(Schema.String),
                      billingPlan: Schema.optional(
                        Schema.Struct({
                          billingPeriod: Schema.optional(Schema.String),
                          title: Schema.optional(Schema.String),
                          description: Schema.optional(Schema.String),
                          price: Schema.optional(
                            Schema.Struct({
                              currencyCode: Schema.optional(Schema.String),
                              isPiRequired: Schema.Boolean,
                              listPrice: Schema.Number,
                              msrp: Schema.Number,
                            }),
                          ),
                        }),
                      ),
                      renewToTermBillingPlan: Schema.optional(Schema.String),
                      isAutorenewable: Schema.optional(Schema.Boolean),
                      lifecyclePolicy: Schema.optional(
                        Schema.Struct({
                          graceDuration: Schema.optional(Schema.String),
                          inactiveDuration: Schema.optional(Schema.String),
                          lockoutDuration: Schema.optional(Schema.String),
                        }),
                      ),
                      productCode: Schema.optional(Schema.String),
                      state: Schema.optional(Schema.String),
                      actions: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                ),
                hasFreeTrials: Schema.Boolean,
                consumptionUnitType: Schema.optional(Schema.String),
                displayRank: Schema.Number,
              }),
            ),
          ),
          uiDefinitionUri: Schema.optional(Schema.String),
          artifacts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
                artifactType: Schema.String,
              }),
            ),
          ),
          version: Schema.optional(Schema.String),
          isHidden: Schema.Boolean,
          isStopSell: Schema.Boolean,
          stopSellInfo: Schema.optional(
            Schema.Struct({
              startDate: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              alternativeOfferId: Schema.optional(Schema.String),
              alternativePlanId: Schema.optional(Schema.String),
            }),
          ),
          minQuantity: Schema.optional(Schema.Number),
          maxQuantity: Schema.optional(Schema.Number),
          isQuantifiable: Schema.Boolean,
          billingComponents: Schema.optional(
            Schema.Array(
              Schema.Struct({
                billingTag: Schema.optional(Schema.String),
              }),
            ),
          ),
          purchaseDurationDiscounts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                duration: Schema.optional(Schema.String),
                discountPercentage: Schema.Number,
              }),
            ),
          ),
          isHiddenPrivateOffer: Schema.optional(Schema.Boolean),
          certifications: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
              }),
            ),
          ),
          customerInstruction: Schema.optional(Schema.String),
          planLabels: Schema.optional(Schema.Array(Schema.String)),
          skuType: Schema.optional(Schema.String),
          skuTitle: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          armRegionName: Schema.optional(Schema.String),
          cloud: Schema.optional(Schema.String),
          locationType: Schema.optional(Schema.String),
          region: Schema.optional(Schema.String),
          skuGroupId: Schema.optional(Schema.String),
          zone: Schema.optional(Schema.String),
          feature: Schema.optional(Schema.String),
          serviceType: Schema.optional(Schema.String),
          skuAttributes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          skuProperties: Schema.optional(
            Schema.Struct({
              category: Schema.optional(Schema.String),
              dataDiskType: Schema.optional(Schema.String),
              diskType: Schema.optional(Schema.String),
              numberOfCores: Schema.optional(Schema.String),
              ram: Schema.optional(Schema.String),
              vCpu: Schema.optional(Schema.String),
              armSkuName: Schema.optional(Schema.String),
              accessTier: Schema.optional(Schema.String),
            }),
          ),
          offeringProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                productCode: Schema.optional(Schema.String),
                termId: Schema.optional(Schema.String),
                meterType: Schema.optional(Schema.String),
                billingMeterId: Schema.optional(Schema.String),
                offeringId: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          hasConsumptionComponents: Schema.optional(Schema.Boolean),
          isEndUserEligible: Schema.optional(Schema.Boolean),
          isAdminEligible: Schema.optional(Schema.Boolean),
          entraIdVersion: Schema.optional(Schema.String),
          technicalRequirements: Schema.optional(Schema.String),
          faqUri: Schema.optional(Schema.String),
          fulfillmentData: Schema.optional(
            Schema.Struct({
              fulfillmentType: Schema.optional(Schema.String),
              attributes: Schema.optional(
                Schema.Struct({
                  fulfillmentTiming: Schema.optional(Schema.String),
                  fulfillmentDelayMitigation: Schema.optional(Schema.String),
                }),
              ),
              additionalProducts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    productSkuId: Schema.optional(Schema.String),
                    defaultKeyActivationCount: Schema.optional(Schema.Number),
                  }),
                ),
              ),
            }),
          ),
          benefits: Schema.optional(
            Schema.Array(
              Schema.Struct({
                benefitType: Schema.optional(Schema.String),
                basePlanId: Schema.optional(Schema.String),
                billingPlan: Schema.optional(Schema.String),
                termDuration: Schema.optional(Schema.String),
              }),
            ),
          ),
          constraintsData: Schema.optional(
            Schema.Struct({
              seatConstraints: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.String),
                    minSeats: Schema.optional(Schema.Number),
                    maxSeats: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              assetOwnershipLimits: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.String),
                    minAssets: Schema.optional(Schema.Number),
                    maxAssets: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              prerequisiteSkus: Schema.optional(
                Schema.Struct({
                  mustHaveAll: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        productId: Schema.optional(Schema.String),
                        skuIds: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                  ),
                  mustHaveAny: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        productId: Schema.optional(Schema.String),
                        skuIds: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                  ),
                  seatConstraints: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        type: Schema.optional(Schema.String),
                        minPercentSeats: Schema.optional(Schema.Number),
                        maxPercentSeats: Schema.optional(Schema.Number),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          meterTypeDescriptions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(
                  Schema.Struct({
                    meterType: Schema.optional(Schema.String),
                    unitOfMeasure: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
          usageUnit: Schema.optional(Schema.String),
          skuName: Schema.optional(Schema.String),
        }),
      ),
    ),
    hasAddOns: Schema.optional(Schema.Boolean),
  });
export type ProductGetGetBySubscriptionOutput =
  typeof ProductGetGetBySubscriptionOutput.Type;

// The operation
/**
 * Gets a single product by subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param includeStopSoldPlans - Indicates whether to include plans that are no longer available for purchase in the response. By default, includeStopSoldPlans is set to FALSE.
 * @param language - Language to search, ISO 639-1 two-letter code, possible values - 'en,cs,de,es,fr,hu,it,ja,ko,nl,pl,pt-br,pt-pt,ru,sv,tr,id,zh-hans,zh-hant'. Default is "en"
 * @param includeHiddenPlans - Indicates whether to include hidden plans in the response. By default, includeHiddenPlans is set to FALSE.
 * @param includeServiceInstructionTemplates - Indicates whether to include the product's service instruction templates in the response. By default, includeServiceInstructionTemplates is set to FALSE.
 * @param planId - Optional to pass the plan id to filter to a specific plan within the product. If not specified, the response will include all plans of the product.
 * @param skuId - Optional to pass the sku id to filter to a specific sku within the product. If not specified, the response will include all skus of the product.
 * @param lookUpOfferInTenantLevel - Indicates whether to use the tenant in context to fetch the product. By default, lookUpOfferInTenantLevel is set to FALSE.
 */
export const ProductGetGetBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProductGetGetBySubscriptionInput,
    outputSchema: ProductGetGetBySubscriptionOutput,
  }),
);
// Input Schema
export const ProductGetGetByTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    market: Schema.String,
    includeStopSoldPlans: Schema.optional(Schema.Boolean),
    language: Schema.optional(Schema.String),
    pricingAudience: Schema.optional(Schema.String),
    includeHiddenPlans: Schema.optional(Schema.Boolean),
    includeServiceInstructionTemplates: Schema.optional(Schema.Boolean),
    planId: Schema.optional(Schema.String),
    skuId: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/products/{productId}",
    }),
  );
export type ProductGetGetByTenantInput = typeof ProductGetGetByTenantInput.Type;

// Output Schema
export const ProductGetGetByTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    displayName: Schema.optional(Schema.String),
    popularity: Schema.optional(Schema.Number),
    categoryIds: Schema.optional(Schema.Array(Schema.String)),
    industryIds: Schema.optional(Schema.Array(Schema.String)),
    publisherId: Schema.optional(Schema.String),
    azureBenefit: Schema.optional(Schema.String),
    badges: Schema.optional(Schema.Array(Schema.String)),
    publisherType: Schema.optional(Schema.String),
    publishingStage: Schema.optional(Schema.String),
    uniqueProductId: Schema.String,
    productType: Schema.String,
    productSubType: Schema.optional(Schema.String),
    productFamily: Schema.optional(Schema.String),
    operatingSystems: Schema.optional(Schema.Array(Schema.String)),
    pricingTypes: Schema.optional(Schema.Array(Schema.String)),
    publisherDisplayName: Schema.optional(Schema.String),
    longSummary: Schema.optional(Schema.String),
    summary: Schema.optional(Schema.String),
    smallIconUri: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    cspLegalTermsUri: Schema.optional(Schema.String),
    privacyPolicyUri: Schema.optional(Schema.String),
    ratingBuckets: Schema.optional(Schema.Array(Schema.String)),
    ratingAverage: Schema.optional(Schema.Number),
    ratingCount: Schema.optional(Schema.Number),
    supportedProducts: Schema.optional(Schema.Array(Schema.String)),
    applicableProducts: Schema.optional(Schema.Array(Schema.String)),
    lastModifiedDateTime: Schema.optional(Schema.String),
    locations: Schema.optional(Schema.Array(Schema.String)),
    serviceFamily: Schema.optional(Schema.String),
    service: Schema.optional(Schema.String),
    productId: Schema.optional(Schema.String),
    hasRiPlans: Schema.optional(Schema.Boolean),
    hasMarketplaceFootprint: Schema.optional(Schema.Boolean),
    attributes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    videos: Schema.optional(
      Schema.Array(
        Schema.Struct({
          caption: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
          videoPurpose: Schema.optional(Schema.String),
          previewImage: Schema.optional(
            Schema.Struct({
              caption: Schema.optional(Schema.String),
              uri: Schema.optional(Schema.String),
              imagePurpose: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    images: Schema.optional(
      Schema.Array(
        Schema.Struct({
          context: Schema.optional(Schema.String),
          items: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    linkedAddIns: Schema.optional(Schema.Array(Schema.String)),
    links: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
        }),
      ),
    ),
    language: Schema.optional(Schema.String),
    hasStandardContractAmendments: Schema.optional(Schema.Boolean),
    offerId: Schema.optional(Schema.String),
    standardContractAmendmentsRevisionId: Schema.optional(Schema.String),
    universalAmendmentUrl: Schema.optional(Schema.String),
    isPrivate: Schema.Boolean,
    isStopSell: Schema.Boolean,
    legalTermsUri: Schema.optional(Schema.String),
    legalTermsType: Schema.optional(Schema.String),
    supportUri: Schema.optional(Schema.String),
    uiDefinitionUri: Schema.optional(Schema.String),
    screenshotUris: Schema.optional(Schema.Array(Schema.String)),
    mediumIconUri: Schema.optional(Schema.String),
    largeIconUri: Schema.optional(Schema.String),
    wideIconUri: Schema.optional(Schema.String),
    pricingDetailsUri: Schema.optional(Schema.String),
    isReseller: Schema.optional(Schema.Boolean),
    productOwnershipSellingMotion: Schema.optional(Schema.String),
    disableSendEmailOnPurchase: Schema.optional(Schema.Boolean),
    isCoreVm: Schema.optional(Schema.Boolean),
    stopSellInfo: Schema.optional(
      Schema.Struct({
        startDate: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
        alternativeOfferId: Schema.optional(Schema.String),
        alternativePlanId: Schema.optional(Schema.String),
      }),
    ),
    marketingMaterial: Schema.optional(
      Schema.Struct({
        path: Schema.optional(Schema.String),
        learnUri: Schema.optional(Schema.String),
      }),
    ),
    artifacts: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          uri: Schema.optional(Schema.String),
          artifactType: Schema.String,
        }),
      ),
    ),
    plans: Schema.optional(
      Schema.Array(
        Schema.Struct({
          planId: Schema.optional(Schema.String),
          uniquePlanId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          vmArchitectureType: Schema.optional(Schema.String),
          cspState: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              generation: Schema.optional(Schema.String),
              altStackReference: Schema.optional(Schema.String),
            }),
          ),
          altStackReference: Schema.optional(Schema.String),
          stackType: Schema.optional(Schema.String),
          altArchitectureReference: Schema.optional(Schema.String),
          categoryIds: Schema.optional(Schema.Array(Schema.String)),
          hasProtectedArtifacts: Schema.optional(Schema.Boolean),
          pricingTypes: Schema.optional(Schema.Array(Schema.String)),
          vmSecuritytypes: Schema.optional(Schema.Array(Schema.String)),
          summary: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          skuId: Schema.optional(Schema.String),
          planType: Schema.String,
          displayRank: Schema.optional(Schema.String),
          isPrivate: Schema.optional(Schema.Boolean),
          hasRi: Schema.optional(Schema.Boolean),
          id: Schema.optional(Schema.String),
          availabilities: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                actions: Schema.optional(Schema.Array(Schema.String)),
                meter: Schema.optional(
                  Schema.Struct({
                    meterId: Schema.optional(Schema.String),
                    partNumber: Schema.optional(Schema.String),
                    consumptionResourceId: Schema.optional(Schema.String),
                    price: Schema.optional(
                      Schema.Struct({
                        currencyCode: Schema.optional(Schema.String),
                        isPiRequired: Schema.Boolean,
                        listPrice: Schema.Number,
                        msrp: Schema.Number,
                      }),
                    ),
                    type: Schema.optional(Schema.String),
                    includedQuantityProperties: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          termId: Schema.optional(Schema.String),
                          quantity: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
                pricingAudience: Schema.String,
                terms: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      termDescriptionParameters: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            parameter: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      termId: Schema.optional(Schema.String),
                      termUnit: Schema.optional(Schema.String),
                      prorationPolicy: Schema.optional(
                        Schema.Struct({
                          minimumProratedUnits: Schema.optional(Schema.String),
                        }),
                      ),
                      termDescription: Schema.optional(Schema.String),
                      price: Schema.optional(
                        Schema.Struct({
                          currencyCode: Schema.optional(Schema.String),
                          isPiRequired: Schema.Boolean,
                          listPrice: Schema.Number,
                          msrp: Schema.Number,
                        }),
                      ),
                      renewTermId: Schema.optional(Schema.String),
                      renewTermUnits: Schema.optional(Schema.String),
                      billingPlan: Schema.optional(
                        Schema.Struct({
                          billingPeriod: Schema.optional(Schema.String),
                          title: Schema.optional(Schema.String),
                          description: Schema.optional(Schema.String),
                          price: Schema.optional(
                            Schema.Struct({
                              currencyCode: Schema.optional(Schema.String),
                              isPiRequired: Schema.Boolean,
                              listPrice: Schema.Number,
                              msrp: Schema.Number,
                            }),
                          ),
                        }),
                      ),
                      renewToTermBillingPlan: Schema.optional(Schema.String),
                      isAutorenewable: Schema.optional(Schema.Boolean),
                      lifecyclePolicy: Schema.optional(
                        Schema.Struct({
                          graceDuration: Schema.optional(Schema.String),
                          inactiveDuration: Schema.optional(Schema.String),
                          lockoutDuration: Schema.optional(Schema.String),
                        }),
                      ),
                      productCode: Schema.optional(Schema.String),
                      state: Schema.optional(Schema.String),
                      actions: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                ),
                hasFreeTrials: Schema.Boolean,
                consumptionUnitType: Schema.optional(Schema.String),
                displayRank: Schema.Number,
              }),
            ),
          ),
          uiDefinitionUri: Schema.optional(Schema.String),
          artifacts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
                artifactType: Schema.String,
              }),
            ),
          ),
          version: Schema.optional(Schema.String),
          isHidden: Schema.Boolean,
          isStopSell: Schema.Boolean,
          stopSellInfo: Schema.optional(
            Schema.Struct({
              startDate: Schema.optional(Schema.String),
              reason: Schema.optional(Schema.String),
              alternativeOfferId: Schema.optional(Schema.String),
              alternativePlanId: Schema.optional(Schema.String),
            }),
          ),
          minQuantity: Schema.optional(Schema.Number),
          maxQuantity: Schema.optional(Schema.Number),
          isQuantifiable: Schema.Boolean,
          billingComponents: Schema.optional(
            Schema.Array(
              Schema.Struct({
                billingTag: Schema.optional(Schema.String),
              }),
            ),
          ),
          purchaseDurationDiscounts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                duration: Schema.optional(Schema.String),
                discountPercentage: Schema.Number,
              }),
            ),
          ),
          isHiddenPrivateOffer: Schema.optional(Schema.Boolean),
          certifications: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                uri: Schema.optional(Schema.String),
              }),
            ),
          ),
          customerInstruction: Schema.optional(Schema.String),
          planLabels: Schema.optional(Schema.Array(Schema.String)),
          skuType: Schema.optional(Schema.String),
          skuTitle: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          armRegionName: Schema.optional(Schema.String),
          cloud: Schema.optional(Schema.String),
          locationType: Schema.optional(Schema.String),
          region: Schema.optional(Schema.String),
          skuGroupId: Schema.optional(Schema.String),
          zone: Schema.optional(Schema.String),
          feature: Schema.optional(Schema.String),
          serviceType: Schema.optional(Schema.String),
          skuAttributes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          skuProperties: Schema.optional(
            Schema.Struct({
              category: Schema.optional(Schema.String),
              dataDiskType: Schema.optional(Schema.String),
              diskType: Schema.optional(Schema.String),
              numberOfCores: Schema.optional(Schema.String),
              ram: Schema.optional(Schema.String),
              vCpu: Schema.optional(Schema.String),
              armSkuName: Schema.optional(Schema.String),
              accessTier: Schema.optional(Schema.String),
            }),
          ),
          offeringProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                productCode: Schema.optional(Schema.String),
                termId: Schema.optional(Schema.String),
                meterType: Schema.optional(Schema.String),
                billingMeterId: Schema.optional(Schema.String),
                offeringId: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          hasConsumptionComponents: Schema.optional(Schema.Boolean),
          isEndUserEligible: Schema.optional(Schema.Boolean),
          isAdminEligible: Schema.optional(Schema.Boolean),
          entraIdVersion: Schema.optional(Schema.String),
          technicalRequirements: Schema.optional(Schema.String),
          faqUri: Schema.optional(Schema.String),
          fulfillmentData: Schema.optional(
            Schema.Struct({
              fulfillmentType: Schema.optional(Schema.String),
              attributes: Schema.optional(
                Schema.Struct({
                  fulfillmentTiming: Schema.optional(Schema.String),
                  fulfillmentDelayMitigation: Schema.optional(Schema.String),
                }),
              ),
              additionalProducts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    productSkuId: Schema.optional(Schema.String),
                    defaultKeyActivationCount: Schema.optional(Schema.Number),
                  }),
                ),
              ),
            }),
          ),
          benefits: Schema.optional(
            Schema.Array(
              Schema.Struct({
                benefitType: Schema.optional(Schema.String),
                basePlanId: Schema.optional(Schema.String),
                billingPlan: Schema.optional(Schema.String),
                termDuration: Schema.optional(Schema.String),
              }),
            ),
          ),
          constraintsData: Schema.optional(
            Schema.Struct({
              seatConstraints: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.String),
                    minSeats: Schema.optional(Schema.Number),
                    maxSeats: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              assetOwnershipLimits: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    type: Schema.optional(Schema.String),
                    minAssets: Schema.optional(Schema.Number),
                    maxAssets: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              prerequisiteSkus: Schema.optional(
                Schema.Struct({
                  mustHaveAll: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        productId: Schema.optional(Schema.String),
                        skuIds: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                  ),
                  mustHaveAny: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        productId: Schema.optional(Schema.String),
                        skuIds: Schema.optional(Schema.Array(Schema.String)),
                      }),
                    ),
                  ),
                  seatConstraints: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        type: Schema.optional(Schema.String),
                        minPercentSeats: Schema.optional(Schema.Number),
                        maxPercentSeats: Schema.optional(Schema.Number),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
          meterTypeDescriptions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(
                  Schema.Struct({
                    meterType: Schema.optional(Schema.String),
                    unitOfMeasure: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
          usageUnit: Schema.optional(Schema.String),
          skuName: Schema.optional(Schema.String),
        }),
      ),
    ),
    hasAddOns: Schema.optional(Schema.Boolean),
  });
export type ProductGetGetByTenantOutput =
  typeof ProductGetGetByTenantOutput.Type;

// The operation
/**
 * Gets a single product by tenant.
 *
 * @param api-version - The API version to use for this operation.
 * @param market - Product market value that will be used to fetch the product and affect the returning result.Possible values can be found at https://docs.microsoft.com/en-us/azure/marketplace/marketplace-geo-availability-currencies. Example: 'US'
 * @param includeStopSoldPlans - Indicates whether to include plans that are no longer available for purchase in the response. By default, includeStopSoldPlans is set to FALSE.
 * @param language - Language to search, ISO 639-1 two-letter code, possible values - 'en,cs,de,es,fr,hu,it,ja,ko,nl,pl,pt-br,pt-pt,ru,sv,tr,id,zh-hans,zh-hant'. Default is "en"
 * @param pricingAudience - Direct-Commercial or Partner-Commercial. This value is used to determine the pricing audience for the product. If not specified, the default value is Direct-Commercial.
 * @param includeHiddenPlans - Indicates whether to include hidden plans in the response. By default, includeHiddenPlans is set to FALSE.
 * @param includeServiceInstructionTemplates - Indicates whether to include the product's service instruction templates in the response. By default, includeServiceInstructionTemplates is set to FALSE.
 * @param planId - Optional to pass the plan id to filter to a specific plan within the product. If not specified, the response will include all plans of the product.
 * @param skuId - Optional to pass the sku id to filter to a specific sku within the product. If not specified, the response will include all skus of the product.
 */
export const ProductGetGetByTenant = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProductGetGetByTenantInput,
    outputSchema: ProductGetGetByTenantOutput,
  }),
);
// Input Schema
export const ProductListListByBillingAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    language: Schema.optional(Schema.String),
    excludePublicOffersAndPublicPlans: Schema.optional(Schema.Boolean),
    locations: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $select: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $orderBy: Schema.optional(Schema.String),
    $search: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Marketplace/products",
    }),
  );
export type ProductListListByBillingAccountInput =
  typeof ProductListListByBillingAccountInput.Type;

// Output Schema
export const ProductListListByBillingAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        popularity: Schema.optional(Schema.Number),
        categoryIds: Schema.optional(Schema.Array(Schema.String)),
        industryIds: Schema.optional(Schema.Array(Schema.String)),
        publisherId: Schema.optional(Schema.String),
        azureBenefit: Schema.optional(Schema.String),
        badges: Schema.optional(Schema.Array(Schema.String)),
        publisherType: Schema.optional(Schema.String),
        publishingStage: Schema.optional(Schema.String),
        uniqueProductId: Schema.String,
        productType: Schema.String,
        productSubType: Schema.optional(Schema.String),
        productFamily: Schema.optional(Schema.String),
        operatingSystems: Schema.optional(Schema.Array(Schema.String)),
        pricingTypes: Schema.optional(Schema.Array(Schema.String)),
        publisherDisplayName: Schema.optional(Schema.String),
        longSummary: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.String),
        smallIconUri: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        cspLegalTermsUri: Schema.optional(Schema.String),
        privacyPolicyUri: Schema.optional(Schema.String),
        ratingBuckets: Schema.optional(Schema.Array(Schema.String)),
        ratingAverage: Schema.optional(Schema.Number),
        ratingCount: Schema.optional(Schema.Number),
        supportedProducts: Schema.optional(Schema.Array(Schema.String)),
        applicableProducts: Schema.optional(Schema.Array(Schema.String)),
        lastModifiedDateTime: Schema.optional(Schema.String),
        locations: Schema.optional(Schema.Array(Schema.String)),
        serviceFamily: Schema.optional(Schema.String),
        service: Schema.optional(Schema.String),
        productId: Schema.optional(Schema.String),
        hasRiPlans: Schema.optional(Schema.Boolean),
        hasMarketplaceFootprint: Schema.optional(Schema.Boolean),
        attributes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
        plans: Schema.optional(
          Schema.Array(
            Schema.Struct({
              planId: Schema.optional(Schema.String),
              uniquePlanId: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              vmArchitectureType: Schema.optional(Schema.String),
              cspState: Schema.optional(Schema.String),
              metadata: Schema.optional(
                Schema.Struct({
                  generation: Schema.optional(Schema.String),
                  altStackReference: Schema.optional(Schema.String),
                }),
              ),
              altStackReference: Schema.optional(Schema.String),
              stackType: Schema.optional(Schema.String),
              altArchitectureReference: Schema.optional(Schema.String),
              categoryIds: Schema.optional(Schema.Array(Schema.String)),
              hasProtectedArtifacts: Schema.optional(Schema.Boolean),
              pricingTypes: Schema.optional(Schema.Array(Schema.String)),
              vmSecuritytypes: Schema.optional(Schema.Array(Schema.String)),
              summary: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              skuId: Schema.optional(Schema.String),
              planType: Schema.String,
              displayRank: Schema.optional(Schema.String),
              isPrivate: Schema.optional(Schema.Boolean),
              hasRi: Schema.optional(Schema.Boolean),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductListListByBillingAccountOutput =
  typeof ProductListListByBillingAccountOutput.Type;

// The operation
/**
 * Lists products for billing account.
 *
 * @param api-version - The API version to use for this operation.
 * @param language - Language to search, ISO 639-1 two-letter code, possible values - 'en,cs,de,es,fr,hu,it,ja,ko,nl,pl,pt-br,pt-pt,ru,sv,tr,id,zh-hans,zh-hant'. Default is "en"
 * @param excludePublicOffersAndPublicPlans - Whether to exclude public offers and public plans from the response. Default is false, which means that public offers and public plans are included in the response. If set to true, only private plans will be returned.
 * @param locations - Return products available in selected location. Enumeration of the Azure datacenter regions. See https://azure.microsoft.com/regions/
 * @param $filter - Filters the results, based on a Boolean condition. Example: $filter=productType eq 'VirtualMachine'. Fields that can be filtered by are:
- `displayName`
- `productId`
- `popularity`
- `categoryIds`
- `industryIds`
- `publisherId`
- `uniqueProductId`
- `productType`
- `operatingSystems`
- `pricingTypes`
- `publisherDisplayName`
- `longSummary`
- `summary`
- `linkedAddinsTypes`
- `description`
- `supportedProducts`
- `applicableProducts`
- `lastModifiedDateTime`
- `plan.planId`
- `plan.displayName`
- `plan.cspState`
- `plan.altStackReference`
- `plan.stackType`
- `plan.categoryIds`
- `plan.hasProtectedArtifacts`
- `plan.pricingTypes`
- `plan.summary`
- `plan.description`
- `plan.skuId`
- `plan.displayRank`
- `plan.isPrivate`
 * @param $select - Selects which properties to include in the results. Example: $select=displayName
 * @param $expand - Expands related entities inline
 * @param $orderBy - Ordering expression for the results using OData notation. Avoid using orderby unless essential as this may impact the latency of your request.  Example: $orderby=displayName desc.This API only supports ordering by a single field. Fields that can be ordered by are:
- `lastModifiedDateTime`
- `uniqueProductId`
- `productType`
- `displayName`
- `publisherId`'
 * @param $search - Optional search by display name, publisher display name, or keywords. Example $search=Microsoft
 */
export const ProductListListByBillingAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductListListByBillingAccountInput,
    outputSchema: ProductListListByBillingAccountOutput,
  }));
// Input Schema
export const ProductListListByBillingProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    language: Schema.optional(Schema.String),
    excludePublicOffersAndPublicPlans: Schema.optional(Schema.Boolean),
    locations: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $select: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $orderBy: Schema.optional(Schema.String),
    $search: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.Marketplace/products",
    }),
  );
export type ProductListListByBillingProfileInput =
  typeof ProductListListByBillingProfileInput.Type;

// Output Schema
export const ProductListListByBillingProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        popularity: Schema.optional(Schema.Number),
        categoryIds: Schema.optional(Schema.Array(Schema.String)),
        industryIds: Schema.optional(Schema.Array(Schema.String)),
        publisherId: Schema.optional(Schema.String),
        azureBenefit: Schema.optional(Schema.String),
        badges: Schema.optional(Schema.Array(Schema.String)),
        publisherType: Schema.optional(Schema.String),
        publishingStage: Schema.optional(Schema.String),
        uniqueProductId: Schema.String,
        productType: Schema.String,
        productSubType: Schema.optional(Schema.String),
        productFamily: Schema.optional(Schema.String),
        operatingSystems: Schema.optional(Schema.Array(Schema.String)),
        pricingTypes: Schema.optional(Schema.Array(Schema.String)),
        publisherDisplayName: Schema.optional(Schema.String),
        longSummary: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.String),
        smallIconUri: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        cspLegalTermsUri: Schema.optional(Schema.String),
        privacyPolicyUri: Schema.optional(Schema.String),
        ratingBuckets: Schema.optional(Schema.Array(Schema.String)),
        ratingAverage: Schema.optional(Schema.Number),
        ratingCount: Schema.optional(Schema.Number),
        supportedProducts: Schema.optional(Schema.Array(Schema.String)),
        applicableProducts: Schema.optional(Schema.Array(Schema.String)),
        lastModifiedDateTime: Schema.optional(Schema.String),
        locations: Schema.optional(Schema.Array(Schema.String)),
        serviceFamily: Schema.optional(Schema.String),
        service: Schema.optional(Schema.String),
        productId: Schema.optional(Schema.String),
        hasRiPlans: Schema.optional(Schema.Boolean),
        hasMarketplaceFootprint: Schema.optional(Schema.Boolean),
        attributes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
        plans: Schema.optional(
          Schema.Array(
            Schema.Struct({
              planId: Schema.optional(Schema.String),
              uniquePlanId: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              vmArchitectureType: Schema.optional(Schema.String),
              cspState: Schema.optional(Schema.String),
              metadata: Schema.optional(
                Schema.Struct({
                  generation: Schema.optional(Schema.String),
                  altStackReference: Schema.optional(Schema.String),
                }),
              ),
              altStackReference: Schema.optional(Schema.String),
              stackType: Schema.optional(Schema.String),
              altArchitectureReference: Schema.optional(Schema.String),
              categoryIds: Schema.optional(Schema.Array(Schema.String)),
              hasProtectedArtifacts: Schema.optional(Schema.Boolean),
              pricingTypes: Schema.optional(Schema.Array(Schema.String)),
              vmSecuritytypes: Schema.optional(Schema.Array(Schema.String)),
              summary: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              skuId: Schema.optional(Schema.String),
              planType: Schema.String,
              displayRank: Schema.optional(Schema.String),
              isPrivate: Schema.optional(Schema.Boolean),
              hasRi: Schema.optional(Schema.Boolean),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductListListByBillingProfileOutput =
  typeof ProductListListByBillingProfileOutput.Type;

// The operation
/**
 * Lists products for billing profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param language - Language to search, ISO 639-1 two-letter code, possible values - 'en,cs,de,es,fr,hu,it,ja,ko,nl,pl,pt-br,pt-pt,ru,sv,tr,id,zh-hans,zh-hant'. Default is "en"
 * @param excludePublicOffersAndPublicPlans - Whether to exclude public offers and public plans from the response. Default is false, which means that public offers and public plans are included in the response. If set to true, only private plans will be returned.
 * @param locations - Return products available in selected location. Enumeration of the Azure datacenter regions. See https://azure.microsoft.com/regions/
 * @param $filter - Filters the results, based on a Boolean condition. Example: $filter=productType eq 'VirtualMachine'. Fields that can be filtered by are:
- `displayName`
- `productId`
- `popularity`
- `categoryIds`
- `industryIds`
- `publisherId`
- `uniqueProductId`
- `productType`
- `operatingSystems`
- `pricingTypes`
- `publisherDisplayName`
- `longSummary`
- `summary`
- `linkedAddinsTypes`
- `description`
- `supportedProducts`
- `applicableProducts`
- `lastModifiedDateTime`
- `plan.planId`
- `plan.displayName`
- `plan.cspState`
- `plan.altStackReference`
- `plan.stackType`
- `plan.categoryIds`
- `plan.hasProtectedArtifacts`
- `plan.pricingTypes`
- `plan.summary`
- `plan.description`
- `plan.skuId`
- `plan.displayRank`
- `plan.isPrivate`
 * @param $select - Selects which properties to include in the results. Example: $select=displayName
 * @param $expand - Expands related entities inline
 * @param $orderBy - Ordering expression for the results using OData notation. Avoid using orderby unless essential as this may impact the latency of your request.  Example: $orderby=displayName desc.This API only supports ordering by a single field. Fields that can be ordered by are:
- `lastModifiedDateTime`
- `uniqueProductId`
- `productType`
- `displayName`
- `publisherId`'
 * @param $search - Optional search by display name, publisher display name, or keywords. Example $search=Microsoft
 */
export const ProductListListByBillingProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductListListByBillingProfileInput,
    outputSchema: ProductListListByBillingProfileOutput,
  }));
// Input Schema
export const ProductListListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    language: Schema.optional(Schema.String),
    excludePublicOffersAndPublicPlans: Schema.optional(Schema.Boolean),
    $filter: Schema.optional(Schema.String),
    $select: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $orderBy: Schema.optional(Schema.String),
    $search: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Marketplace/products",
    }),
  );
export type ProductListListBySubscriptionInput =
  typeof ProductListListBySubscriptionInput.Type;

// Output Schema
export const ProductListListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        popularity: Schema.optional(Schema.Number),
        categoryIds: Schema.optional(Schema.Array(Schema.String)),
        industryIds: Schema.optional(Schema.Array(Schema.String)),
        publisherId: Schema.optional(Schema.String),
        azureBenefit: Schema.optional(Schema.String),
        badges: Schema.optional(Schema.Array(Schema.String)),
        publisherType: Schema.optional(Schema.String),
        publishingStage: Schema.optional(Schema.String),
        uniqueProductId: Schema.String,
        productType: Schema.String,
        productSubType: Schema.optional(Schema.String),
        productFamily: Schema.optional(Schema.String),
        operatingSystems: Schema.optional(Schema.Array(Schema.String)),
        pricingTypes: Schema.optional(Schema.Array(Schema.String)),
        publisherDisplayName: Schema.optional(Schema.String),
        longSummary: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.String),
        smallIconUri: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        cspLegalTermsUri: Schema.optional(Schema.String),
        privacyPolicyUri: Schema.optional(Schema.String),
        ratingBuckets: Schema.optional(Schema.Array(Schema.String)),
        ratingAverage: Schema.optional(Schema.Number),
        ratingCount: Schema.optional(Schema.Number),
        supportedProducts: Schema.optional(Schema.Array(Schema.String)),
        applicableProducts: Schema.optional(Schema.Array(Schema.String)),
        lastModifiedDateTime: Schema.optional(Schema.String),
        locations: Schema.optional(Schema.Array(Schema.String)),
        serviceFamily: Schema.optional(Schema.String),
        service: Schema.optional(Schema.String),
        productId: Schema.optional(Schema.String),
        hasRiPlans: Schema.optional(Schema.Boolean),
        hasMarketplaceFootprint: Schema.optional(Schema.Boolean),
        attributes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
        plans: Schema.optional(
          Schema.Array(
            Schema.Struct({
              planId: Schema.optional(Schema.String),
              uniquePlanId: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              vmArchitectureType: Schema.optional(Schema.String),
              cspState: Schema.optional(Schema.String),
              metadata: Schema.optional(
                Schema.Struct({
                  generation: Schema.optional(Schema.String),
                  altStackReference: Schema.optional(Schema.String),
                }),
              ),
              altStackReference: Schema.optional(Schema.String),
              stackType: Schema.optional(Schema.String),
              altArchitectureReference: Schema.optional(Schema.String),
              categoryIds: Schema.optional(Schema.Array(Schema.String)),
              hasProtectedArtifacts: Schema.optional(Schema.Boolean),
              pricingTypes: Schema.optional(Schema.Array(Schema.String)),
              vmSecuritytypes: Schema.optional(Schema.Array(Schema.String)),
              summary: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              skuId: Schema.optional(Schema.String),
              planType: Schema.String,
              displayRank: Schema.optional(Schema.String),
              isPrivate: Schema.optional(Schema.Boolean),
              hasRi: Schema.optional(Schema.Boolean),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductListListBySubscriptionOutput =
  typeof ProductListListBySubscriptionOutput.Type;

// The operation
/**
 * Lists products for subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param language - Language to search, ISO 639-1 two-letter code, possible values - 'en,cs,de,es,fr,hu,it,ja,ko,nl,pl,pt-br,pt-pt,ru,sv,tr,id,zh-hans,zh-hant'. Default is "en"
 * @param excludePublicOffersAndPublicPlans - Whether to exclude public offers and public plans from the response. Default is false, which means that public offers and public plans are included in the response. If set to true, only private plans will be returned.
 * @param $filter - Filters the results, based on a Boolean condition. Example: $filter=productType eq 'VirtualMachine'. Fields that can be filtered by are:
- `displayName`
- `productId`
- `popularity`
- `categoryIds`
- `industryIds`
- `publisherId`
- `uniqueProductId`
- `productType`
- `operatingSystems`
- `pricingTypes`
- `publisherDisplayName`
- `longSummary`
- `summary`
- `linkedAddinsTypes`
- `description`
- `supportedProducts`
- `applicableProducts`
- `lastModifiedDateTime`
- `plan.planId`
- `plan.displayName`
- `plan.cspState`
- `plan.altStackReference`
- `plan.stackType`
- `plan.categoryIds`
- `plan.hasProtectedArtifacts`
- `plan.pricingTypes`
- `plan.summary`
- `plan.description`
- `plan.skuId`
- `plan.displayRank`
- `plan.isPrivate`
 * @param $select - Selects which properties to include in the results. Example: $select=displayName
 * @param $expand - Expands related entities inline
 * @param $orderBy - Ordering expression for the results using OData notation. Avoid using orderby unless essential as this may impact the latency of your request.  Example: $orderby=displayName desc.This API only supports ordering by a single field. Fields that can be ordered by are:
- `lastModifiedDateTime`
- `uniqueProductId`
- `productType`
- `displayName`
- `publisherId`'
 * @param $search - Optional search by display name, publisher display name, or keywords. Example $search=Microsoft
 */
export const ProductListListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductListListBySubscriptionInput,
    outputSchema: ProductListListBySubscriptionOutput,
  }));
// Input Schema
export const ProductListListByTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    market: Schema.optional(Schema.String),
    language: Schema.optional(Schema.String),
    excludePublicOffersAndPublicPlans: Schema.optional(Schema.Boolean),
    $filter: Schema.optional(Schema.String),
    $select: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $orderBy: Schema.optional(Schema.String),
    $search: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/products",
    }),
  );
export type ProductListListByTenantInput =
  typeof ProductListListByTenantInput.Type;

// Output Schema
export const ProductListListByTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        popularity: Schema.optional(Schema.Number),
        categoryIds: Schema.optional(Schema.Array(Schema.String)),
        industryIds: Schema.optional(Schema.Array(Schema.String)),
        publisherId: Schema.optional(Schema.String),
        azureBenefit: Schema.optional(Schema.String),
        badges: Schema.optional(Schema.Array(Schema.String)),
        publisherType: Schema.optional(Schema.String),
        publishingStage: Schema.optional(Schema.String),
        uniqueProductId: Schema.String,
        productType: Schema.String,
        productSubType: Schema.optional(Schema.String),
        productFamily: Schema.optional(Schema.String),
        operatingSystems: Schema.optional(Schema.Array(Schema.String)),
        pricingTypes: Schema.optional(Schema.Array(Schema.String)),
        publisherDisplayName: Schema.optional(Schema.String),
        longSummary: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.String),
        smallIconUri: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        cspLegalTermsUri: Schema.optional(Schema.String),
        privacyPolicyUri: Schema.optional(Schema.String),
        ratingBuckets: Schema.optional(Schema.Array(Schema.String)),
        ratingAverage: Schema.optional(Schema.Number),
        ratingCount: Schema.optional(Schema.Number),
        supportedProducts: Schema.optional(Schema.Array(Schema.String)),
        applicableProducts: Schema.optional(Schema.Array(Schema.String)),
        lastModifiedDateTime: Schema.optional(Schema.String),
        locations: Schema.optional(Schema.Array(Schema.String)),
        serviceFamily: Schema.optional(Schema.String),
        service: Schema.optional(Schema.String),
        productId: Schema.optional(Schema.String),
        hasRiPlans: Schema.optional(Schema.Boolean),
        hasMarketplaceFootprint: Schema.optional(Schema.Boolean),
        attributes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
        plans: Schema.optional(
          Schema.Array(
            Schema.Struct({
              planId: Schema.optional(Schema.String),
              uniquePlanId: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              vmArchitectureType: Schema.optional(Schema.String),
              cspState: Schema.optional(Schema.String),
              metadata: Schema.optional(
                Schema.Struct({
                  generation: Schema.optional(Schema.String),
                  altStackReference: Schema.optional(Schema.String),
                }),
              ),
              altStackReference: Schema.optional(Schema.String),
              stackType: Schema.optional(Schema.String),
              altArchitectureReference: Schema.optional(Schema.String),
              categoryIds: Schema.optional(Schema.Array(Schema.String)),
              hasProtectedArtifacts: Schema.optional(Schema.Boolean),
              pricingTypes: Schema.optional(Schema.Array(Schema.String)),
              vmSecuritytypes: Schema.optional(Schema.Array(Schema.String)),
              summary: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              skuId: Schema.optional(Schema.String),
              planType: Schema.String,
              displayRank: Schema.optional(Schema.String),
              isPrivate: Schema.optional(Schema.Boolean),
              hasRi: Schema.optional(Schema.Boolean),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductListListByTenantOutput =
  typeof ProductListListByTenantOutput.Type;

// The operation
/**
 * Lists products for tenant.
 *
 * @param api-version - The API version to use for this operation.
 * @param market - Product market value  (the response will include only products that can be sold in the specified market)
Possible values can be found at https://docs.microsoft.com/en-us/azure/marketplace/marketplace-geo-availability-currencies. Example: 'US'
 * @param language - Language to search, ISO 639-1 two-letter code, possible values - 'en,cs,de,es,fr,hu,it,ja,ko,nl,pl,pt-br,pt-pt,ru,sv,tr,id,zh-hans,zh-hant'. Default is "en"
 * @param excludePublicOffersAndPublicPlans - Whether to exclude public offers and public plans from the response. Default is false, which means that public offers and public plans are included in the response. If set to true, only private plans will be returned.
 * @param $filter - Filters the results, based on a Boolean condition. Example: $filter=productType eq 'VirtualMachine'. Fields that can be filtered by are:
- `displayName`
- `productId`
- `popularity`
- `categoryIds`
- `industryIds`
- `publisherId`
- `uniqueProductId`
- `productType`
- `operatingSystems`
- `pricingTypes`
- `publisherDisplayName`
- `longSummary`
- `summary`
- `linkedAddinsTypes`
- `description`
- `supportedProducts`
- `applicableProducts`
- `lastModifiedDateTime`
- `plan.planId`
- `plan.displayName`
- `plan.cspState`
- `plan.altStackReference`
- `plan.stackType`
- `plan.categoryIds`
- `plan.hasProtectedArtifacts`
- `plan.pricingTypes`
- `plan.summary`
- `plan.description`
- `plan.skuId`
- `plan.displayRank`
- `plan.isPrivate`
 * @param $select - Selects which properties to include in the results. Example: $select=displayName
 * @param $expand - Expands related entities inline
 * @param $orderBy - Ordering expression for the results using OData notation. Avoid using orderby unless essential as this may impact the latency of your request.  Example: $orderby=displayName desc.This API only supports ordering by a single field. Fields that can be ordered by are:
- `lastModifiedDateTime`
- `uniqueProductId`
- `productType`
- `displayName`
- `publisherId`'
 * @param $search - Optional search by display name, publisher display name, or keywords. Example $search=Microsoft
 */
export const ProductListListByTenant = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProductListListByTenantInput,
    outputSchema: ProductListListByTenantOutput,
  }),
);
// Input Schema
export const RevokeApiKeyPostInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  apiKeyAlias: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Marketplace/keys/{apiKeyAlias}/revoke",
  }),
);
export type RevokeApiKeyPostInput = typeof RevokeApiKeyPostInput.Type;

// Output Schema
export const RevokeApiKeyPostOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RevokeApiKeyPostOutput = typeof RevokeApiKeyPostOutput.Type;

// The operation
/**
 * Revokes an active API key. Please note that this API is currently in a preview state and requires sign-up to the 'Discovery Api Key Early Access' preview feature using a valid Azure subscription. For more information on this process please see the documentation for Marketplace Catalog APIs [here](https://learn.microsoft.com/en-us/rest/api/marketplacecatalog/dataplane/products/get?view=rest-marketplacecatalog-dataplane-2023-05-01-preview&tabs=HTTP)
 *
 * @param apiKeyAlias - The alias of your API key.
 * @param x-ms-client-tenant-id - The tenant associated with the subscription.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RevokeApiKeyPost = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RevokeApiKeyPostInput,
  outputSchema: RevokeApiKeyPostOutput,
}));
// Input Schema
export const SearchPostArmInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "POST", path: "/providers/Microsoft.Marketplace/search" }),
);
export type SearchPostArmInput = typeof SearchPostArmInput.Type;

// Output Schema
export const SearchPostArmOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  facets: Schema.optional(
    Schema.Array(
      Schema.Struct({
        facetName: Schema.optional(Schema.String),
        facetValues: Schema.optional(
          Schema.Array(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              count: Schema.optional(Schema.Number),
            }),
          ),
        ),
      }),
    ),
  ),
  results: Schema.optional(
    Schema.Array(
      Schema.Struct({
        ampAppsPopularity: Schema.optional(Schema.Number),
        ampCsPopularity: Schema.optional(Schema.Number),
        applicableProducts: Schema.optional(Schema.Array(Schema.String)),
        appSourceAppsPopularity: Schema.optional(Schema.Number),
        appSourceCategories: Schema.optional(Schema.Array(Schema.String)),
        appSourceCsPopularity: Schema.optional(Schema.Number),
        appSourceIndustries: Schema.optional(Schema.Array(Schema.String)),
        azureCategories: Schema.optional(Schema.Array(Schema.String)),
        azurePortalCategories: Schema.optional(Schema.Array(Schema.String)),
        azureIndustries: Schema.optional(Schema.Array(Schema.String)),
        bigId: Schema.optional(Schema.String),
        cspStates: Schema.optional(Schema.Array(Schema.String)),
        determinedStorefronts: Schema.optional(Schema.Array(Schema.String)),
        displayName: Schema.optional(Schema.String),
        isAzureBenefitEligible: Schema.optional(Schema.Boolean),
        isCoreVm: Schema.optional(Schema.Boolean),
        isPreferredSolution: Schema.optional(Schema.Boolean),
        isAdditionalPurchaseRequired: Schema.optional(Schema.Boolean),
        isPowerBICertified: Schema.optional(Schema.Boolean),
        isIndustryCloud: Schema.optional(Schema.Boolean),
        isMicrosoftProduct: Schema.optional(Schema.Boolean),
        isPreview: Schema.optional(Schema.Boolean),
        language: Schema.optional(Schema.String),
        legacyId: Schema.optional(Schema.String),
        offerType: Schema.optional(Schema.String),
        operatingSystems: Schema.optional(Schema.Array(Schema.String)),
        plans: Schema.optional(
          Schema.Array(
            Schema.Struct({
              cspState: Schema.optional(Schema.String),
              legacyPlanId: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              architectureType: Schema.optional(Schema.String),
              metadata: Schema.optional(
                Schema.Struct({
                  generation: Schema.optional(Schema.String),
                }),
              ),
              operatingSystem: Schema.optional(
                Schema.Struct({
                  family: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
        pricingTypes: Schema.optional(Schema.Array(Schema.String)),
        publisherDisplayName: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.String),
        vmGenerations: Schema.optional(Schema.Array(Schema.String)),
        vmImageTypes: Schema.optional(Schema.Array(Schema.String)),
        vmSecurityTypes: Schema.optional(Schema.Array(Schema.String)),
        smallIconUri: Schema.optional(Schema.String),
        mediumIconUri: Schema.optional(Schema.String),
        largeIconUri: Schema.optional(Schema.String),
        wideIconUri: Schema.optional(Schema.String),
        heroIconUri: Schema.optional(Schema.String),
      }),
    ),
  ),
  totalCount: Schema.optional(Schema.Number),
});
export type SearchPostArmOutput = typeof SearchPostArmOutput.Type;

// The operation
/**
 * Returns a list of azure private store marketplace catalog offers and total count and facets
 *
 * @param api-version - The API version to use for this operation.
 */
export const SearchPostArm = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SearchPostArmInput,
  outputSchema: SearchPostArmOutput,
}));
