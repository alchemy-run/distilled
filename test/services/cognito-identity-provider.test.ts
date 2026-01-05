import { expect } from "@effect/vitest";
import { Effect } from "effect";
import {
  adminAddUserToGroup,
  adminConfirmSignUp,
  adminCreateUser,
  adminDeleteUser,
  adminDisableUser,
  adminEnableUser,
  adminGetUser,
  adminRemoveUserFromGroup,
  adminSetUserPassword,
  createGroup,
  createResourceServer,
  createUserPool,
  createUserPoolClient,
  deleteGroup,
  deleteResourceServer,
  deleteUserPool,
  deleteUserPoolClient,
  describeResourceServer,
  describeUserPool,
  describeUserPoolClient,
  getGroup,
  listGroups,
  listResourceServers,
  listTagsForResource,
  listUserPoolClients,
  listUserPools,
  listUsers,
  listUsersInGroup,
  tagResource,
  untagResource,
  updateGroup,
  updateResourceServer,
  updateUserPool,
  updateUserPoolClient,
} from "../../src/services/cognito-identity-provider.ts";
import { test } from "../test.ts";

// Helper to ensure cleanup happens even on failure
const withUserPool = <A, E, R>(
  poolName: string,
  testFn: (poolId: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    const createResult = yield* createUserPool({
      PoolName: poolName,
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireUppercase: true,
          RequireNumbers: true,
          RequireSymbols: false,
        },
      },
      AutoVerifiedAttributes: ["email"],
    });
    const poolId = createResult.UserPool!.Id!;
    return yield* testFn(poolId).pipe(
      Effect.ensuring(
        deleteUserPool({ UserPoolId: poolId }).pipe(Effect.ignore),
      ),
    );
  });

// Helper for user pool client tests
const withUserPoolClient = <A, E, R>(
  poolId: string,
  clientName: string,
  testFn: (clientId: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    const createResult = yield* createUserPoolClient({
      UserPoolId: poolId,
      ClientName: clientName,
      ExplicitAuthFlows: ["ADMIN_NO_SRP_AUTH", "ALLOW_USER_PASSWORD_AUTH"],
    });
    const clientId = createResult.UserPoolClient!.ClientId!;
    return yield* testFn(clientId).pipe(
      Effect.ensuring(
        deleteUserPoolClient({
          UserPoolId: poolId,
          ClientId: clientId,
        }).pipe(Effect.ignore),
      ),
    );
  });

// Helper for group tests
const withGroup = <A, E, R>(
  poolId: string,
  groupName: string,
  testFn: (groupName: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    yield* createGroup({
      UserPoolId: poolId,
      GroupName: groupName,
      Description: "Test group",
    });
    return yield* testFn(groupName).pipe(
      Effect.ensuring(
        deleteGroup({
          UserPoolId: poolId,
          GroupName: groupName,
        }).pipe(Effect.ignore),
      ),
    );
  });

// Helper for admin user tests
const withAdminUser = <A, E, R>(
  poolId: string,
  username: string,
  testFn: (username: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    yield* adminCreateUser({
      UserPoolId: poolId,
      Username: username,
      TemporaryPassword: "TempPass123!",
      MessageAction: "SUPPRESS", // Don't send email
    });
    return yield* testFn(username).pipe(
      Effect.ensuring(
        adminDeleteUser({
          UserPoolId: poolId,
          Username: username,
        }).pipe(Effect.ignore),
      ),
    );
  });

// ============================================================================
// User Pool Lifecycle Tests
// ============================================================================

test(
  "create user pool, describe, list, and delete",
  withUserPool("itty-cognito-pool-lifecycle", (poolId) =>
    Effect.gen(function* () {
      // Describe the user pool
      const describeResult = yield* describeUserPool({ UserPoolId: poolId });
      expect(describeResult.UserPool?.Id).toEqual(poolId);
      expect(describeResult.UserPool?.Name).toEqual(
        "itty-cognito-pool-lifecycle",
      );

      // List user pools and verify our pool is present
      const listResult = yield* listUserPools({ MaxResults: 10 });
      const foundPool = listResult.UserPools?.find((p) => p.Id === poolId);
      expect(foundPool).toBeDefined();
      expect(foundPool?.Name).toEqual("itty-cognito-pool-lifecycle");
    }),
  ),
);

test(
  "update user pool",
  withUserPool("itty-cognito-pool-update", (poolId) =>
    Effect.gen(function* () {
      // Update the user pool
      yield* updateUserPool({
        UserPoolId: poolId,
        MfaConfiguration: "OFF",
        Policies: {
          PasswordPolicy: {
            MinimumLength: 12,
            RequireLowercase: true,
            RequireUppercase: true,
            RequireNumbers: true,
            RequireSymbols: true,
          },
        },
      });

      // Describe to verify update
      const describeResult = yield* describeUserPool({ UserPoolId: poolId });
      expect(
        describeResult.UserPool?.Policies?.PasswordPolicy?.MinimumLength,
      ).toEqual(12);
      expect(
        describeResult.UserPool?.Policies?.PasswordPolicy?.RequireSymbols,
      ).toEqual(true);
    }),
  ),
);

// ============================================================================
// User Pool Client Tests
// ============================================================================

test(
  "create user pool client, describe, list, and delete",
  withUserPool("itty-cognito-client-lifecycle", (poolId) =>
    withUserPoolClient(poolId, "itty-test-client", (clientId) =>
      Effect.gen(function* () {
        // Describe the client
        const describeResult = yield* describeUserPoolClient({
          UserPoolId: poolId,
          ClientId: clientId,
        });
        expect(describeResult.UserPoolClient?.ClientId).toEqual(clientId);
        expect(describeResult.UserPoolClient?.ClientName).toEqual(
          "itty-test-client",
        );

        // List clients and verify our client is present
        const listResult = yield* listUserPoolClients({
          UserPoolId: poolId,
          MaxResults: 10,
        });
        const foundClient = listResult.UserPoolClients?.find(
          (c) => c.ClientId === clientId,
        );
        expect(foundClient).toBeDefined();
      }),
    ),
  ),
);

test(
  "update user pool client",
  withUserPool("itty-cognito-client-update", (poolId) =>
    withUserPoolClient(poolId, "itty-client-update", (clientId) =>
      Effect.gen(function* () {
        // Update the client
        yield* updateUserPoolClient({
          UserPoolId: poolId,
          ClientId: clientId,
          ClientName: "itty-client-updated",
          RefreshTokenValidity: 7,
          ExplicitAuthFlows: [
            "ADMIN_NO_SRP_AUTH",
            "ALLOW_USER_PASSWORD_AUTH",
            "ALLOW_REFRESH_TOKEN_AUTH",
          ],
        });

        // Describe to verify update
        const describeResult = yield* describeUserPoolClient({
          UserPoolId: poolId,
          ClientId: clientId,
        });
        expect(describeResult.UserPoolClient?.ClientName).toEqual(
          "itty-client-updated",
        );
        expect(describeResult.UserPoolClient?.RefreshTokenValidity).toEqual(7);
      }),
    ),
  ),
);

// ============================================================================
// Group Tests
// ============================================================================

test(
  "create group, get, list, and delete",
  withUserPool("itty-cognito-group-lifecycle", (poolId) =>
    withGroup(poolId, "itty-test-group", (groupName) =>
      Effect.gen(function* () {
        // Get the group
        const getResult = yield* getGroup({
          UserPoolId: poolId,
          GroupName: groupName,
        });
        expect(getResult.Group?.GroupName).toEqual(groupName);
        expect(getResult.Group?.Description).toEqual("Test group");

        // List groups and verify our group is present
        const listResult = yield* listGroups({
          UserPoolId: poolId,
          Limit: 10,
        });
        const foundGroup = listResult.Groups?.find(
          (g) => g.GroupName === groupName,
        );
        expect(foundGroup).toBeDefined();
      }),
    ),
  ),
);

test(
  "update group",
  withUserPool("itty-cognito-group-update", (poolId) =>
    withGroup(poolId, "itty-group-update", (groupName) =>
      Effect.gen(function* () {
        // Update the group
        yield* updateGroup({
          UserPoolId: poolId,
          GroupName: groupName,
          Description: "Updated description",
          Precedence: 10,
        });

        // Get to verify update
        const getResult = yield* getGroup({
          UserPoolId: poolId,
          GroupName: groupName,
        });
        expect(getResult.Group?.Description).toEqual("Updated description");
        expect(getResult.Group?.Precedence).toEqual(10);
      }),
    ),
  ),
);

// ============================================================================
// Admin User Tests
// ============================================================================

test(
  "admin create user, get, list, and delete",
  withUserPool("itty-cognito-user-lifecycle", (poolId) =>
    withAdminUser(poolId, "testuser", (username) =>
      Effect.gen(function* () {
        // Get the user
        const getResult = yield* adminGetUser({
          UserPoolId: poolId,
          Username: username,
        });
        expect(getResult.Username).toEqual(username);
        expect(getResult.UserStatus).toBeDefined();

        // List users and verify our user is present
        const listResult = yield* listUsers({
          UserPoolId: poolId,
          Limit: 10,
        });
        const foundUser = listResult.Users?.find(
          (u) => u.Username === username,
        );
        expect(foundUser).toBeDefined();
      }),
    ),
  ),
);

test(
  "admin disable and enable user",
  withUserPool("itty-cognito-user-disable", (poolId) =>
    withAdminUser(poolId, "disableuser", (username) =>
      Effect.gen(function* () {
        // Disable the user
        yield* adminDisableUser({
          UserPoolId: poolId,
          Username: username,
        });

        // Verify user is disabled
        const disabledUser = yield* adminGetUser({
          UserPoolId: poolId,
          Username: username,
        });
        expect(disabledUser.Enabled).toEqual(false);

        // Enable the user
        yield* adminEnableUser({
          UserPoolId: poolId,
          Username: username,
        });

        // Verify user is enabled
        const enabledUser = yield* adminGetUser({
          UserPoolId: poolId,
          Username: username,
        });
        expect(enabledUser.Enabled).toEqual(true);
      }),
    ),
  ),
);

test(
  "admin set user password",
  withUserPool("itty-cognito-user-password", (poolId) =>
    withAdminUser(poolId, "passworduser", (username) =>
      Effect.gen(function* () {
        // Set permanent password for the user
        yield* adminSetUserPassword({
          UserPoolId: poolId,
          Username: username,
          Password: "NewPermanentPass123!",
          Permanent: true,
        });

        // Verify user status changed
        const user = yield* adminGetUser({
          UserPoolId: poolId,
          Username: username,
        });
        // User should now be CONFIRMED (or at least not FORCE_CHANGE_PASSWORD)
        expect(user.UserStatus).not.toEqual("FORCE_CHANGE_PASSWORD");
      }),
    ),
  ),
);

// ============================================================================
// User-Group Membership Tests
// ============================================================================

test(
  "add and remove user from group",
  withUserPool("itty-cognito-membership", (poolId) =>
    withGroup(poolId, "itty-membership-group", (groupName) =>
      withAdminUser(poolId, "memberuser", (username) =>
        Effect.gen(function* () {
          // Add user to group
          yield* adminAddUserToGroup({
            UserPoolId: poolId,
            GroupName: groupName,
            Username: username,
          });

          // Verify user is in group
          const usersInGroup = yield* listUsersInGroup({
            UserPoolId: poolId,
            GroupName: groupName,
            Limit: 10,
          });
          const foundUser = usersInGroup.Users?.find(
            (u) => u.Username === username,
          );
          expect(foundUser).toBeDefined();

          // Remove user from group
          yield* adminRemoveUserFromGroup({
            UserPoolId: poolId,
            GroupName: groupName,
            Username: username,
          });

          // Verify user is no longer in group
          const usersAfterRemove = yield* listUsersInGroup({
            UserPoolId: poolId,
            GroupName: groupName,
            Limit: 10,
          });
          const userStillInGroup = usersAfterRemove.Users?.find(
            (u) => u.Username === username,
          );
          expect(userStillInGroup).toBeUndefined();
        }),
      ),
    ),
  ),
);

// ============================================================================
// Resource Server Tests
// ============================================================================

test(
  "create resource server, describe, list, update, and delete",
  withUserPool("itty-cognito-resource-server", (poolId) =>
    Effect.gen(function* () {
      const identifier = "https://itty-resource-server.example.com";

      // Create resource server
      const createResult = yield* createResourceServer({
        UserPoolId: poolId,
        Identifier: identifier,
        Name: "itty-resource-server",
        Scopes: [
          {
            ScopeName: "read",
            ScopeDescription: "Read access",
          },
          {
            ScopeName: "write",
            ScopeDescription: "Write access",
          },
        ],
      });
      expect(createResult.ResourceServer?.Identifier).toEqual(identifier);

      try {
        // Describe resource server
        const describeResult = yield* describeResourceServer({
          UserPoolId: poolId,
          Identifier: identifier,
        });
        expect(describeResult.ResourceServer?.Name).toEqual(
          "itty-resource-server",
        );
        expect(describeResult.ResourceServer?.Scopes?.length).toEqual(2);

        // List resource servers
        const listResult = yield* listResourceServers({
          UserPoolId: poolId,
          MaxResults: 10,
        });
        const foundServer = listResult.ResourceServers?.find(
          (rs) => rs.Identifier === identifier,
        );
        expect(foundServer).toBeDefined();

        // Update resource server
        yield* updateResourceServer({
          UserPoolId: poolId,
          Identifier: identifier,
          Name: "itty-resource-server-updated",
          Scopes: [
            {
              ScopeName: "read",
              ScopeDescription: "Read access",
            },
            {
              ScopeName: "write",
              ScopeDescription: "Write access",
            },
            {
              ScopeName: "delete",
              ScopeDescription: "Delete access",
            },
          ],
        });

        // Verify update
        const updatedResult = yield* describeResourceServer({
          UserPoolId: poolId,
          Identifier: identifier,
        });
        expect(updatedResult.ResourceServer?.Name).toEqual(
          "itty-resource-server-updated",
        );
        expect(updatedResult.ResourceServer?.Scopes?.length).toEqual(3);
      } finally {
        // Clean up
        yield* Effect.ignore(
          deleteResourceServer({
            UserPoolId: poolId,
            Identifier: identifier,
          }),
        );
      }
    }),
  ),
);

// ============================================================================
// Tagging Tests
// ============================================================================

test(
  "tag and untag user pool",
  withUserPool("itty-cognito-tagging", (poolId) =>
    Effect.gen(function* () {
      // Get the user pool ARN
      const describeResult = yield* describeUserPool({ UserPoolId: poolId });
      const poolArn = describeResult.UserPool?.Arn;
      expect(poolArn).toBeDefined();

      // Tag the resource
      yield* tagResource({
        ResourceArn: poolArn!,
        Tags: {
          Environment: "Test",
          Project: "itty-aws",
          Team: "Platform",
        },
      });

      // List tags
      const tagsResult = yield* listTagsForResource({
        ResourceArn: poolArn!,
      });
      expect(tagsResult.Tags?.Environment).toEqual("Test");
      expect(tagsResult.Tags?.Project).toEqual("itty-aws");
      expect(tagsResult.Tags?.Team).toEqual("Platform");

      // Untag the resource
      yield* untagResource({
        ResourceArn: poolArn!,
        TagKeys: ["Project"],
      });

      // Verify tag was removed
      const finalTags = yield* listTagsForResource({
        ResourceArn: poolArn!,
      });
      expect(finalTags.Tags?.Project).toBeUndefined();
      expect(finalTags.Tags?.Environment).toEqual("Test");
    }),
  ),
);

// ============================================================================
// User Confirmation Tests
// ============================================================================

test(
  "admin confirm sign up",
  withUserPool("itty-cognito-confirm", (poolId) =>
    withAdminUser(poolId, "confirmuser", (username) =>
      Effect.gen(function* () {
        // Admin confirm the user
        yield* adminConfirmSignUp({
          UserPoolId: poolId,
          Username: username,
        });

        // Verify user is confirmed
        const user = yield* adminGetUser({
          UserPoolId: poolId,
          Username: username,
        });
        expect(user.UserStatus).toEqual("CONFIRMED");
      }),
    ),
  ),
);

// ============================================================================
// Complex Scenario Tests
// ============================================================================

test(
  "create full Cognito structure: pool, client, groups, and users",
  Effect.gen(function* () {
    const poolName = "itty-cognito-full-test";
    const clientName = "itty-full-test-client";
    const groupName = "itty-full-test-group";
    const username = "fulltestuser";

    // Create user pool
    const poolResult = yield* createUserPool({
      PoolName: poolName,
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireUppercase: true,
          RequireNumbers: true,
          RequireSymbols: false,
        },
      },
    });
    const poolId = poolResult.UserPool!.Id!;

    try {
      // Create client
      const clientResult = yield* createUserPoolClient({
        UserPoolId: poolId,
        ClientName: clientName,
        ExplicitAuthFlows: ["ADMIN_NO_SRP_AUTH", "ALLOW_USER_PASSWORD_AUTH"],
      });
      const clientId = clientResult.UserPoolClient!.ClientId!;

      try {
        // Create group
        yield* createGroup({
          UserPoolId: poolId,
          GroupName: groupName,
          Description: "Full test group",
        });

        try {
          // Create user
          yield* adminCreateUser({
            UserPoolId: poolId,
            Username: username,
            TemporaryPassword: "TempPass123!",
            MessageAction: "SUPPRESS",
          });

          try {
            // Add user to group
            yield* adminAddUserToGroup({
              UserPoolId: poolId,
              GroupName: groupName,
              Username: username,
            });

            // Verify setup
            const describePool = yield* describeUserPool({
              UserPoolId: poolId,
            });
            expect(describePool.UserPool?.Name).toEqual(poolName);

            const describeClient = yield* describeUserPoolClient({
              UserPoolId: poolId,
              ClientId: clientId,
            });
            expect(describeClient.UserPoolClient?.ClientName).toEqual(
              clientName,
            );

            const usersInGroup = yield* listUsersInGroup({
              UserPoolId: poolId,
              GroupName: groupName,
              Limit: 10,
            });
            expect(
              usersInGroup.Users?.find((u) => u.Username === username),
            ).toBeDefined();
          } finally {
            yield* Effect.ignore(
              adminDeleteUser({ UserPoolId: poolId, Username: username }),
            );
          }
        } finally {
          yield* Effect.ignore(
            deleteGroup({ UserPoolId: poolId, GroupName: groupName }),
          );
        }
      } finally {
        yield* Effect.ignore(
          deleteUserPoolClient({ UserPoolId: poolId, ClientId: clientId }),
        );
      }
    } finally {
      yield* Effect.ignore(deleteUserPool({ UserPoolId: poolId }));
    }
  }),
);
