import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { cancelDeployRequest } from "../src/operations/cancelDeployRequest";
import { closeDeployRequest } from "../src/operations/closeDeployRequest";
import { completeErroredDeploy } from "../src/operations/completeErroredDeploy";
import { completeGatedDeployRequest } from "../src/operations/completeGatedDeployRequest";
import { completeRevert } from "../src/operations/completeRevert";
import { createDeployRequest } from "../src/operations/createDeployRequest";
import { getDeployment } from "../src/operations/getDeployment";
import { getDeployQueue } from "../src/operations/getDeployQueue";
import { getDeployRequest } from "../src/operations/getDeployRequest";
import { getDeployRequestThrottler } from "../src/operations/getDeployRequestThrottler";
import { listDeployOperations } from "../src/operations/listDeployOperations";
import { listDeployRequestReviews } from "../src/operations/listDeployRequestReviews";
import { listDeployRequests } from "../src/operations/listDeployRequests";
import { queueDeployRequest } from "../src/operations/queueDeployRequest";
import { reviewDeployRequest } from "../src/operations/reviewDeployRequest";
import { skipRevertPeriod } from "../src/operations/skipRevertPeriod";
import { updateAutoApply } from "../src/operations/updateAutoApply";
import { updateAutoDeleteBranch } from "../src/operations/updateAutoDeleteBranch";
import { updateDeployRequestThrottler } from "../src/operations/updateDeployRequestThrottler";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "deploy-requests";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_DEPLOY_REQUEST_NUMBER = 99999999;

/**
 * Helper to check if an error is an expected "not found" type error.
 * PlanetScale API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Helper to check if an error is any API error type.
 * Includes both specific error types and the generic PlanetScaleApiError.
 */
const isApiError = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof Forbidden ||
  error instanceof PlanetScaleApiError ||
  (error !== null && typeof error === "object" && "_tag" in error);

describe("deploy-requests", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listDeployRequests
  // ============================================================================

  describe("listDeployRequests", () => {
    it("can list deploy requests", async () => {
      const db = getDb();
      const result = await runEffect(
        listDeployRequests({
          organization: db.organization,
          database: db.name,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBeDefined();
    });

    it("can list deploy requests with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listDeployRequests({
          organization: db.organization,
          database: db.name,
          page: 1,
          per_page: 10,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("can filter deploy requests by state", async () => {
      const db = getDb();
      const result = await runEffect(
        listDeployRequests({
          organization: db.organization,
          database: db.name,
          state: "open",
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        listDeployRequests({
          organization: db.organization,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listDeployRequests({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // getDeployRequest
  // ============================================================================

  describe("getDeployRequest", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        getDeployRequest({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getDeployRequest({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getDeployRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // createDeployRequest
  // ============================================================================

  describe("createDeployRequest", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        createDeployRequest({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          into_branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        createDeployRequest({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "dev",
          into_branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        createDeployRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "dev",
          into_branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // getDeployQueue
  // ============================================================================

  describe("getDeployQueue", () => {
    it("can get deploy queue", async () => {
      const db = getDb();
      const result = await runEffect(
        getDeployQueue({
          organization: db.organization,
          database: db.name,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBeDefined();
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getDeployQueue({
          organization: db.organization,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getDeployQueue({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // getDeployment
  // ============================================================================

  describe("getDeployment", () => {
    it("returns NotFound for non-existent deployment", async () => {
      const db = getDb();
      const error = await runEffect(
        getDeployment({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getDeployment({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // getDeployRequestThrottler
  // ============================================================================

  describe("getDeployRequestThrottler", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        getDeployRequestThrottler({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getDeployRequestThrottler({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // listDeployOperations
  // ============================================================================

  describe("listDeployOperations", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        listDeployOperations({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listDeployOperations({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // listDeployRequestReviews
  // ============================================================================

  describe("listDeployRequestReviews", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        listDeployRequestReviews({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listDeployRequestReviews({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // cancelDeployRequest
  // ============================================================================

  describe("cancelDeployRequest", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        cancelDeployRequest({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        cancelDeployRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // closeDeployRequest
  // ============================================================================

  describe("closeDeployRequest", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        closeDeployRequest({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        closeDeployRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // completeErroredDeploy
  // ============================================================================

  describe("completeErroredDeploy", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        completeErroredDeploy({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        completeErroredDeploy({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // completeGatedDeployRequest
  // ============================================================================

  describe("completeGatedDeployRequest", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        completeGatedDeployRequest({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        completeGatedDeployRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // completeRevert
  // ============================================================================

  describe("completeRevert", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        completeRevert({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        completeRevert({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // queueDeployRequest
  // ============================================================================

  describe("queueDeployRequest", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        queueDeployRequest({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        queueDeployRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // reviewDeployRequest
  // ============================================================================

  describe("reviewDeployRequest", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        reviewDeployRequest({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
          state: "approved",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        reviewDeployRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
          state: "approved",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // skipRevertPeriod
  // ============================================================================

  describe("skipRevertPeriod", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        skipRevertPeriod({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        skipRevertPeriod({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateAutoApply
  // ============================================================================

  describe("updateAutoApply", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        updateAutoApply({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
          enable: true,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateAutoApply({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
          enable: true,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateAutoDeleteBranch
  // ============================================================================

  describe("updateAutoDeleteBranch", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        updateAutoDeleteBranch({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
          enable: true,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateAutoDeleteBranch({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
          enable: true,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateDeployRequestThrottler
  // ============================================================================

  describe("updateDeployRequestThrottler", () => {
    it("returns NotFound for non-existent deploy request", async () => {
      const db = getDb();
      const error = await runEffect(
        updateDeployRequestThrottler({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_DEPLOY_REQUEST_NUMBER,
          ratio: 0,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateDeployRequestThrottler({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
          ratio: 0,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });
});
