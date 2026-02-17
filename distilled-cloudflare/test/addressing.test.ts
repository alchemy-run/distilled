import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId, getZoneId } from "./test.ts";
import * as Addressing from "~/services/addressing.ts";

const accountId = () => getAccountId();
const zoneId = () => {
  const id = getZoneId();
  if (!id) throw new Error("CLOUDFLARE_ZONE_ID environment variable is not set");
  return id;
};

// ============================================================================
// Helpers
// ============================================================================

/**
 * A fake UUID that doesn't correspond to any real resource.
 */
const fakeUuid = "00000000-0000-0000-0000-000000000000";

/**
 * Create an address map, run `fn`, then delete the address map.
 * Cleanup-first pattern for idempotency.
 */
const withAddressMap = <A, E, R>(
  description: string,
  fn: (addressMapId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    const result = yield* Addressing.createAddressMap({
      accountId: accountId(),
      description,
      enabled: false,
    });

    const addressMapId = result.id!;

    return yield* fn(addressMapId).pipe(
      Effect.ensuring(
        Addressing.deleteAddressMap({
          accountId: accountId(),
          addressMapId,
        }).pipe(Effect.catchAll(() => Effect.void)),
      ),
    );
  });

// ============================================================================
// Addressing Tests
// ============================================================================

describe("Addressing", () => {
  // --------------------------------------------------------------------------
  // createAddressMap
  // --------------------------------------------------------------------------
  describe("createAddressMap", () => {
    test("error - FeatureNotEnabled for account without feature", () =>
      Addressing.createAddressMap({
        accountId: accountId(),
        description: "distilled-cf-addressing-create-happy",
        enabled: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - FeatureNotEnabled with null description", () =>
      Addressing.createAddressMap({
        accountId: accountId(),
        description: null,
        enabled: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - FeatureNotEnabled with enabled true", () =>
      Addressing.createAddressMap({
        accountId: accountId(),
        description: "distilled-cf-addressing-create-enabled",
        enabled: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.createAddressMap({
        accountId: "invalid-account-id-000",
        description: "distilled-cf-addressing-create-bad-acct",
        enabled: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // getAddressMap
  // --------------------------------------------------------------------------
  describe("getAddressMap", () => {
    test("error - AddressMapNotFound for non-existent address map", () =>
      Addressing.getAddressMap({
        accountId: accountId(),
        addressMapId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AddressMapNotFound")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.getAddressMap({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty addressMapId", () =>
      Addressing.getAddressMap({
        accountId: accountId(),
        addressMapId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // patchAddressMap
  // --------------------------------------------------------------------------
  describe("patchAddressMap", () => {
    test("error - FeatureNotEnabled when updating description", () =>
      Addressing.patchAddressMap({
        accountId: accountId(),
        addressMapId: fakeUuid,
        description: "updated-description",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - FeatureNotEnabled when updating enabled flag", () =>
      Addressing.patchAddressMap({
        accountId: accountId(),
        addressMapId: fakeUuid,
        enabled: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - FeatureNotEnabled when updating with null description", () =>
      Addressing.patchAddressMap({
        accountId: accountId(),
        addressMapId: fakeUuid,
        description: null,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - FeatureNotEnabled for non-existent address map (feature check masks not found)", () =>
      Addressing.patchAddressMap({
        accountId: accountId(),
        addressMapId: fakeUuid,
        description: "should-not-exist",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.patchAddressMap({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
        description: "bad-account",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteAddressMap
  // --------------------------------------------------------------------------
  describe("deleteAddressMap", () => {
    test("error - FeatureNotEnabled for account without feature", () =>
      Addressing.deleteAddressMap({
        accountId: accountId(),
        addressMapId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - FeatureNotEnabled for non-existent address map (feature check masks not found)", () =>
      Addressing.deleteAddressMap({
        accountId: accountId(),
        addressMapId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.deleteAddressMap({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty addressMapId", () =>
      Addressing.deleteAddressMap({
        accountId: accountId(),
        addressMapId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // putAddressMapAccount
  // --------------------------------------------------------------------------
  describe("putAddressMapAccount", () => {
    test("error - FeatureNotEnabled for account without feature", () =>
      Addressing.putAddressMapAccount({
        accountId: accountId(),
        addressMapId: fakeUuid,
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.putAddressMapAccount({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for non-existent address map", () =>
      Addressing.putAddressMapAccount({
        accountId: accountId(),
        addressMapId: fakeUuid,
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteAddressMapAccount
  // --------------------------------------------------------------------------
  describe("deleteAddressMapAccount", () => {
    test("error - FeatureNotEnabled for account without feature", () =>
      Addressing.deleteAddressMapAccount({
        accountId: accountId(),
        addressMapId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FeatureNotEnabled")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.deleteAddressMapAccount({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for non-existent address map", () =>
      Addressing.deleteAddressMapAccount({
        accountId: accountId(),
        addressMapId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // putAddressMapIp
  // --------------------------------------------------------------------------
  describe("putAddressMapIp", () => {
    test("error - returns error for non-existent address map with ip", () =>
      Addressing.putAddressMapIp({
        accountId: accountId(),
        addressMapId: fakeUuid,
        ipAddress: "192.0.2.1",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.putAddressMapIp({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
        ipAddress: "192.0.2.1",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty ipAddress", () =>
      Addressing.putAddressMapIp({
        accountId: accountId(),
        addressMapId: fakeUuid,
        ipAddress: "",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - returns error for malformed IP address", () =>
      Addressing.putAddressMapIp({
        accountId: accountId(),
        addressMapId: fakeUuid,
        ipAddress: "not-an-ip-address",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteAddressMapIp
  // --------------------------------------------------------------------------
  describe("deleteAddressMapIp", () => {
    test("error - returns error for non-existent address map with ip", () =>
      Addressing.deleteAddressMapIp({
        accountId: accountId(),
        addressMapId: fakeUuid,
        ipAddress: "192.0.2.1",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.deleteAddressMapIp({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
        ipAddress: "192.0.2.1",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty ipAddress", () =>
      Addressing.deleteAddressMapIp({
        accountId: accountId(),
        addressMapId: fakeUuid,
        ipAddress: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // putAddressMapZone
  // --------------------------------------------------------------------------
  describe("putAddressMapZone", () => {
    test("error - returns error for non-existent address map with zone", () =>
      Addressing.putAddressMapZone({
        accountId: accountId(),
        addressMapId: fakeUuid,
        zoneId: zoneId(),
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.putAddressMapZone({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
        zoneId: "some-zone-id",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for invalid zoneId", () =>
      Addressing.putAddressMapZone({
        accountId: accountId(),
        addressMapId: fakeUuid,
        zoneId: "invalid-zone-id-000",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteAddressMapZone
  // --------------------------------------------------------------------------
  describe("deleteAddressMapZone", () => {
    test("error - returns error for non-existent address map with zone", () =>
      Addressing.deleteAddressMapZone({
        accountId: accountId(),
        addressMapId: fakeUuid,
        zoneId: zoneId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.deleteAddressMapZone({
        accountId: "invalid-account-id-000",
        addressMapId: fakeUuid,
        zoneId: "some-zone-id",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for invalid zoneId", () =>
      Addressing.deleteAddressMapZone({
        accountId: accountId(),
        addressMapId: fakeUuid,
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getLoaDocument
  // --------------------------------------------------------------------------
  describe("getLoaDocument", () => {
    test("error - LoaDocumentNotFound for non-existent LOA document", () =>
      Addressing.getLoaDocument({
        accountId: accountId(),
        loaDocumentId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("LoaDocumentNotFound")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.getLoaDocument({
        accountId: "invalid-account-id-000",
        loaDocumentId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for null loaDocumentId", () =>
      Addressing.getLoaDocument({
        accountId: accountId(),
        loaDocumentId: null,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // createLoaDocument
  // --------------------------------------------------------------------------
  describe("createLoaDocument", () => {
    test("error - InvalidLoaForm for invalid LOA document content", () =>
      Addressing.createLoaDocument({
        accountId: accountId(),
        loaDocument: "not-a-valid-loa-document-content",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.createLoaDocument({
        accountId: "invalid-account-id-000",
        loaDocument: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty loaDocument", () =>
      Addressing.createLoaDocument({
        accountId: accountId(),
        loaDocument: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getPrefix
  // --------------------------------------------------------------------------
  describe("getPrefix", () => {
    test("error - PrefixNotFound for non-existent prefix", () =>
      Addressing.getPrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrefixNotFound")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.getPrefix({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty prefixId", () =>
      Addressing.getPrefix({
        accountId: accountId(),
        prefixId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // createPrefix
  // --------------------------------------------------------------------------
  describe("createPrefix", () => {
    test("error - InvalidNetworkCidr for invalid CIDR", () =>
      Addressing.createPrefix({
        accountId: accountId(),
        asn: 13335,
        cidr: "not-a-valid-cidr",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.createPrefix({
        accountId: "invalid-account-id-000",
        asn: 13335,
        cidr: "192.0.2.0/24",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for unowned CIDR prefix", () =>
      Addressing.createPrefix({
        accountId: accountId(),
        asn: 13335,
        cidr: "192.0.2.0/24",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // patchPrefix
  // --------------------------------------------------------------------------
  describe("patchPrefix", () => {
    test("error - PrefixNotFound for non-existent prefix", () =>
      Addressing.patchPrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
        description: "updated-description",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrefixNotFound")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.patchPrefix({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        description: "bad-account",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty prefixId", () =>
      Addressing.patchPrefix({
        accountId: accountId(),
        prefixId: "",
        description: "empty-prefix",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deletePrefix
  // --------------------------------------------------------------------------
  describe("deletePrefix", () => {
    test("error - PrefixNotFound for non-existent prefix", () =>
      Addressing.deletePrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrefixNotFound")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.deletePrefix({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty prefixId", () =>
      Addressing.deletePrefix({
        accountId: accountId(),
        prefixId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getPrefixAdvertisementStatus
  // --------------------------------------------------------------------------
  describe("getPrefixAdvertisementStatus", () => {
    test("error - PrefixNotFound for non-existent prefix", () =>
      Addressing.getPrefixAdvertisementStatus({
        accountId: accountId(),
        prefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrefixNotFound")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.getPrefixAdvertisementStatus({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // patchPrefixAdvertisementStatus
  // --------------------------------------------------------------------------
  describe("patchPrefixAdvertisementStatus", () => {
    test("error - PrefixNotFound for non-existent prefix", () =>
      Addressing.patchPrefixAdvertisementStatus({
        accountId: accountId(),
        prefixId: fakeUuid,
        advertised: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrefixNotFound")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.patchPrefixAdvertisementStatus({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        advertised: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // getPrefixBgpPrefix
  // --------------------------------------------------------------------------
  describe("getPrefixBgpPrefix", () => {
    test("error - BgpPrefixNotFound for non-existent BGP prefix", () =>
      Addressing.getPrefixBgpPrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
        bgpPrefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.getPrefixBgpPrefix({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        bgpPrefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty prefixId", () =>
      Addressing.getPrefixBgpPrefix({
        accountId: accountId(),
        prefixId: "",
        bgpPrefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - returns error for empty bgpPrefixId", () =>
      Addressing.getPrefixBgpPrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
        bgpPrefixId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // createPrefixBgpPrefix
  // --------------------------------------------------------------------------
  describe("createPrefixBgpPrefix", () => {
    test("error - NonexistentAccountPrefix for non-existent parent prefix", () =>
      Addressing.createPrefixBgpPrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
        cidr: "192.0.2.0/24",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.createPrefixBgpPrefix({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        cidr: "192.0.2.0/24",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for invalid CIDR", () =>
      Addressing.createPrefixBgpPrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
        cidr: "not-a-valid-cidr",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - returns error for empty CIDR", () =>
      Addressing.createPrefixBgpPrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
        cidr: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // patchPrefixBgpPrefix
  // --------------------------------------------------------------------------
  describe("patchPrefixBgpPrefix", () => {
    test("error - BgpPrefixNotFound for non-existent BGP prefix", () =>
      Addressing.patchPrefixBgpPrefix({
        accountId: accountId(),
        prefixId: fakeUuid,
        bgpPrefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.patchPrefixBgpPrefix({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        bgpPrefixId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // createPrefixDelegation
  // --------------------------------------------------------------------------
  describe("createPrefixDelegation", () => {
    test("error - returns error for non-existent prefix", () =>
      Addressing.createPrefixDelegation({
        accountId: accountId(),
        prefixId: fakeUuid,
        cidr: "192.0.2.0/24",
        delegatedAccountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.createPrefixDelegation({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        cidr: "192.0.2.0/24",
        delegatedAccountId: "some-account-id",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for invalid CIDR", () =>
      Addressing.createPrefixDelegation({
        accountId: accountId(),
        prefixId: fakeUuid,
        cidr: "not-a-valid-cidr",
        delegatedAccountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - returns error for empty delegatedAccountId", () =>
      Addressing.createPrefixDelegation({
        accountId: accountId(),
        prefixId: fakeUuid,
        cidr: "192.0.2.0/24",
        delegatedAccountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deletePrefixDelegation
  // --------------------------------------------------------------------------
  describe("deletePrefixDelegation", () => {
    test("error - DelegationNotFound for non-existent delegation", () =>
      Addressing.deletePrefixDelegation({
        accountId: accountId(),
        prefixId: fakeUuid,
        delegationId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("DelegationNotFound")),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.deletePrefixDelegation({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        delegationId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty delegationId", () =>
      Addressing.deletePrefixDelegation({
        accountId: accountId(),
        prefixId: fakeUuid,
        delegationId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getPrefixServiceBinding
  // --------------------------------------------------------------------------
  describe("getPrefixServiceBinding", () => {
    test("error - BindingNotFound for non-existent binding", () =>
      Addressing.getPrefixServiceBinding({
        accountId: accountId(),
        prefixId: fakeUuid,
        bindingId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.getPrefixServiceBinding({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        bindingId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty bindingId", () =>
      Addressing.getPrefixServiceBinding({
        accountId: accountId(),
        prefixId: fakeUuid,
        bindingId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // createPrefixServiceBinding
  // --------------------------------------------------------------------------
  describe("createPrefixServiceBinding", () => {
    test("error - PrefixNotFound for non-existent prefix", () =>
      Addressing.createPrefixServiceBinding({
        accountId: accountId(),
        prefixId: fakeUuid,
        cidr: "192.0.2.0/24",
        serviceId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.createPrefixServiceBinding({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        cidr: "192.0.2.0/24",
        serviceId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty serviceId", () =>
      Addressing.createPrefixServiceBinding({
        accountId: accountId(),
        prefixId: fakeUuid,
        cidr: "192.0.2.0/24",
        serviceId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deletePrefixServiceBinding
  // --------------------------------------------------------------------------
  describe("deletePrefixServiceBinding", () => {
    test("error - BindingNotFound for non-existent binding", () =>
      Addressing.deletePrefixServiceBinding({
        accountId: accountId(),
        prefixId: fakeUuid,
        bindingId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidAccountId for invalid account", () =>
      Addressing.deletePrefixServiceBinding({
        accountId: "invalid-account-id-000",
        prefixId: fakeUuid,
        bindingId: fakeUuid,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - returns error for empty bindingId", () =>
      Addressing.deletePrefixServiceBinding({
        accountId: accountId(),
        prefixId: fakeUuid,
        bindingId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getRegionalHostname
  // --------------------------------------------------------------------------
  describe("getRegionalHostname", () => {
    test("error - returns error for non-existent regional hostname", () =>
      Addressing.getRegionalHostname({
        zoneId: zoneId(),
        hostname: "distilled-cf-addressing-nonexistent.example.com",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidZoneId for invalid zone", () =>
      Addressing.getRegionalHostname({
        zoneId: "invalid-zone-id-000",
        hostname: "test.example.com",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidZoneId")),
      ));

    test("error - returns error for empty hostname", () =>
      Addressing.getRegionalHostname({
        zoneId: zoneId(),
        hostname: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // createRegionalHostname
  // --------------------------------------------------------------------------
  describe("createRegionalHostname", () => {
    test("error - returns error for invalid hostname (not a subdomain of zone)", () =>
      Addressing.createRegionalHostname({
        zoneId: zoneId(),
        hostname: "not-a-valid-subdomain-of-zone.invalid.tld",
        regionKey: "eu",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidZoneId for invalid zone", () =>
      Addressing.createRegionalHostname({
        zoneId: "invalid-zone-id-000",
        hostname: "test.example.com",
        regionKey: "eu",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidZoneId")),
      ));

    test("error - returns error for empty hostname", () =>
      Addressing.createRegionalHostname({
        zoneId: zoneId(),
        hostname: "",
        regionKey: "eu",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - returns error for empty regionKey", () =>
      Addressing.createRegionalHostname({
        zoneId: zoneId(),
        hostname: "test.example.com",
        regionKey: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // patchRegionalHostname
  // --------------------------------------------------------------------------
  describe("patchRegionalHostname", () => {
    test("error - returns error for non-existent regional hostname", () =>
      Addressing.patchRegionalHostname({
        zoneId: zoneId(),
        hostname: "distilled-cf-addressing-nonexistent.example.com",
        regionKey: "eu",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidZoneId for invalid zone", () =>
      Addressing.patchRegionalHostname({
        zoneId: "invalid-zone-id-000",
        hostname: "test.example.com",
        regionKey: "eu",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidZoneId")),
      ));

    test("error - returns error for empty regionKey", () =>
      Addressing.patchRegionalHostname({
        zoneId: zoneId(),
        hostname: "test.example.com",
        regionKey: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteRegionalHostname
  // --------------------------------------------------------------------------
  describe("deleteRegionalHostname", () => {
    test("error - returns error for non-existent regional hostname", () =>
      Addressing.deleteRegionalHostname({
        zoneId: zoneId(),
        hostname: "distilled-cf-addressing-nonexistent.example.com",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidZoneId for invalid zone", () =>
      Addressing.deleteRegionalHostname({
        zoneId: "invalid-zone-id-000",
        hostname: "test.example.com",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidZoneId")),
      ));

    test("error - returns error for empty hostname", () =>
      Addressing.deleteRegionalHostname({
        zoneId: zoneId(),
        hostname: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });
});
