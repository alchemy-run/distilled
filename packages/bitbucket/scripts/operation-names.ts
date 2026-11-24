/**
 * Names for the Bitbucket operations the spec gives no `operationId`, keyed
 * by `METHOD path`. Each name follows the operation's own `summary` in the
 * spec ("List repositories in a workspace" → `listRepositories`). The route
 * alone names them badly: Bitbucket nests every collection under its parents,
 * so `GET /repositories/{workspace}` reads as a get of one repository and
 * `POST /repositories/{workspace}/{repo_slug}` as an update.
 *
 * Operations the spec does name (`getPipelineForRepository`,
 * `create_repository_hook`, ...) keep their `operationId`.
 */
export const operationNames: Record<string, string> = {
  // Connect apps
  "DELETE /addon": "deleteApp",
  "PUT /addon": "updateApp",
  "GET /addon/{addon_key}/client-key": "getAddonClientKey",

  // Repositories
  "GET /repositories/{workspace}": "listRepositories",
  "DELETE /repositories/{workspace}/{repo_slug}": "deleteRepository",
  "GET /repositories/{workspace}/{repo_slug}": "getRepository",
  "POST /repositories/{workspace}/{repo_slug}": "createRepository",
  "PUT /repositories/{workspace}/{repo_slug}": "updateRepository",
  "GET /repositories/{workspace}/{repo_slug}/forks": "listRepositoryForks",
  "POST /repositories/{workspace}/{repo_slug}/forks": "forkRepository",
  "GET /repositories/{workspace}/{repo_slug}/watchers": "listRepositoryWatchers",
  "GET /repositories/{workspace}/{repo_slug}/override-settings": "getRepositoryOverrideSettings",
  "PUT /repositories/{workspace}/{repo_slug}/override-settings": "setRepositoryOverrideSettings",

  // Branch restrictions
  "GET /repositories/{workspace}/{repo_slug}/branch-restrictions": "listBranchRestrictions",
  "POST /repositories/{workspace}/{repo_slug}/branch-restrictions": "createBranchRestriction",
  "DELETE /repositories/{workspace}/{repo_slug}/branch-restrictions/{id}":
    "deleteBranchRestriction",
  "GET /repositories/{workspace}/{repo_slug}/branch-restrictions/{id}": "getBranchRestriction",
  "PUT /repositories/{workspace}/{repo_slug}/branch-restrictions/{id}": "updateBranchRestriction",

  // Branching model
  "GET /repositories/{workspace}/{repo_slug}/branching-model": "getRepositoryBranchingModel",
  "GET /repositories/{workspace}/{repo_slug}/branching-model/settings":
    "getRepositoryBranchingModelSettings",
  "PUT /repositories/{workspace}/{repo_slug}/branching-model/settings":
    "updateRepositoryBranchingModelSettings",
  "GET /repositories/{workspace}/{repo_slug}/effective-branching-model":
    "getEffectiveRepositoryBranchingModel",

  // Commits
  "GET /repositories/{workspace}/{repo_slug}/commit/{commit}": "getCommit",
  "DELETE /repositories/{workspace}/{repo_slug}/commit/{commit}/approve": "unapproveCommit",
  "POST /repositories/{workspace}/{repo_slug}/commit/{commit}/approve": "approveCommit",
  "GET /repositories/{workspace}/{repo_slug}/commit/{commit}/comments": "listCommitComments",
  "POST /repositories/{workspace}/{repo_slug}/commit/{commit}/comments": "createCommitComment",
  "DELETE /repositories/{workspace}/{repo_slug}/commit/{commit}/comments/{comment_id}":
    "deleteCommitComment",
  "GET /repositories/{workspace}/{repo_slug}/commit/{commit}/comments/{comment_id}":
    "getCommitComment",
  "PUT /repositories/{workspace}/{repo_slug}/commit/{commit}/comments/{comment_id}":
    "updateCommitComment",
  "GET /repositories/{workspace}/{repo_slug}/commits": "listCommits",
  "POST /repositories/{workspace}/{repo_slug}/commits": "listCommitsWithIncludeExclude",
  "GET /repositories/{workspace}/{repo_slug}/commits/{revision}": "listCommitsForRevision",
  "POST /repositories/{workspace}/{repo_slug}/commits/{revision}":
    "listCommitsForRevisionWithIncludeExclude",
  "GET /repositories/{workspace}/{repo_slug}/filehistory/{commit}/{path}": "listFileHistory",
  "GET /repositories/{workspace}/{repo_slug}/merge-base/{revspec}": "getMergeBase",

  // Commit statuses
  "GET /repositories/{workspace}/{repo_slug}/commit/{commit}/statuses": "listCommitStatuses",
  "POST /repositories/{workspace}/{repo_slug}/commit/{commit}/statuses/build":
    "createCommitBuildStatus",
  "GET /repositories/{workspace}/{repo_slug}/commit/{commit}/statuses/build/{key}":
    "getCommitBuildStatus",
  "PUT /repositories/{workspace}/{repo_slug}/commit/{commit}/statuses/build/{key}":
    "updateCommitBuildStatus",

  // Default reviewers
  "GET /repositories/{workspace}/{repo_slug}/default-reviewers": "listDefaultReviewers",
  "DELETE /repositories/{workspace}/{repo_slug}/default-reviewers/{target_username}":
    "removeDefaultReviewer",
  "GET /repositories/{workspace}/{repo_slug}/default-reviewers/{target_username}":
    "getDefaultReviewer",
  "PUT /repositories/{workspace}/{repo_slug}/default-reviewers/{target_username}":
    "addDefaultReviewer",
  "GET /repositories/{workspace}/{repo_slug}/effective-default-reviewers":
    "listEffectiveDefaultReviewers",

  // Repository deploy keys
  "GET /repositories/{workspace}/{repo_slug}/deploy-keys": "listRepositoryDeployKeys",
  "POST /repositories/{workspace}/{repo_slug}/deploy-keys": "addRepositoryDeployKey",
  "DELETE /repositories/{workspace}/{repo_slug}/deploy-keys/{key_id}": "deleteRepositoryDeployKey",
  "GET /repositories/{workspace}/{repo_slug}/deploy-keys/{key_id}": "getRepositoryDeployKey",
  "PUT /repositories/{workspace}/{repo_slug}/deploy-keys/{key_id}": "updateRepositoryDeployKey",

  // Diffs and patches
  "GET /repositories/{workspace}/{repo_slug}/diff/{spec}": "getDiff",
  "GET /repositories/{workspace}/{repo_slug}/diffstat/{spec}": "getDiffstat",
  "GET /repositories/{workspace}/{repo_slug}/patch/{spec}": "getPatch",
  "GET /repositories/{workspace}/{repo_slug}/file-conflicts/{spec}": "getFileConflicts",

  // Downloads
  "GET /repositories/{workspace}/{repo_slug}/downloads": "listDownloads",
  "POST /repositories/{workspace}/{repo_slug}/downloads": "uploadDownload",
  "DELETE /repositories/{workspace}/{repo_slug}/downloads/{filename}": "deleteDownload",
  "GET /repositories/{workspace}/{repo_slug}/downloads/{filename}": "getDownload",

  // Repository permissions
  "GET /repositories/{workspace}/{repo_slug}/permissions-config/groups":
    "listRepositoryGroupPermissions",
  "DELETE /repositories/{workspace}/{repo_slug}/permissions-config/groups/{group_slug}":
    "deleteRepositoryGroupPermission",
  "GET /repositories/{workspace}/{repo_slug}/permissions-config/groups/{group_slug}":
    "getRepositoryGroupPermission",
  "PUT /repositories/{workspace}/{repo_slug}/permissions-config/groups/{group_slug}":
    "updateRepositoryGroupPermission",
  "GET /repositories/{workspace}/{repo_slug}/permissions-config/users":
    "listRepositoryUserPermissions",
  "DELETE /repositories/{workspace}/{repo_slug}/permissions-config/users/{selected_user_id}":
    "deleteRepositoryUserPermission",
  "GET /repositories/{workspace}/{repo_slug}/permissions-config/users/{selected_user_id}":
    "getRepositoryUserPermission",
  "PUT /repositories/{workspace}/{repo_slug}/permissions-config/users/{selected_user_id}":
    "updateRepositoryUserPermission",

  // Pull requests
  "GET /repositories/{workspace}/{repo_slug}/pullrequests": "listPullRequests",
  "POST /repositories/{workspace}/{repo_slug}/pullrequests": "createPullRequest",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/activity":
    "listRepositoryPullRequestActivity",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}": "getPullRequest",
  "PUT /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}": "updatePullRequest",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/activity":
    "listPullRequestActivity",
  "DELETE /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/approve":
    "unapprovePullRequest",
  "POST /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/approve":
    "approvePullRequest",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/comments":
    "listPullRequestComments",
  "POST /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/comments":
    "createPullRequestComment",
  "DELETE /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/comments/{comment_id}":
    "deletePullRequestComment",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/comments/{comment_id}":
    "getPullRequestComment",
  "PUT /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/comments/{comment_id}":
    "updatePullRequestComment",
  "DELETE /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/comments/{comment_id}/resolve":
    "reopenPullRequestCommentThread",
  "POST /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/comments/{comment_id}/resolve":
    "resolvePullRequestCommentThread",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/commits":
    "listPullRequestCommits",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/conflicts":
    "getPullRequestConflicts",
  "POST /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/decline":
    "declinePullRequest",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/diff":
    "getPullRequestDiff",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/diffstat":
    "getPullRequestDiffstat",
  "POST /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/merge":
    "mergePullRequest",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/merge/task-status/{task_id}":
    "getPullRequestMergeTaskStatus",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/mergeability/checks":
    "listPullRequestMergeabilityChecks",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/patch":
    "getPullRequestPatch",
  "DELETE /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/request-changes":
    "removePullRequestChangeRequest",
  "POST /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/request-changes":
    "requestPullRequestChanges",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/statuses":
    "listPullRequestStatuses",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/tasks":
    "listPullRequestTasks",
  "POST /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/tasks":
    "createPullRequestTask",
  "DELETE /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/tasks/{task_id}":
    "deletePullRequestTask",
  "GET /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/tasks/{task_id}":
    "getPullRequestTask",
  "PUT /repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/tasks/{task_id}":
    "updatePullRequestTask",

  // Refs
  "GET /repositories/{workspace}/{repo_slug}/refs": "listRefs",
  "GET /repositories/{workspace}/{repo_slug}/refs/branches": "listBranches",
  "POST /repositories/{workspace}/{repo_slug}/refs/branches": "createBranch",
  "DELETE /repositories/{workspace}/{repo_slug}/refs/branches/{name}": "deleteBranch",
  "GET /repositories/{workspace}/{repo_slug}/refs/branches/{name}": "getBranch",
  "GET /repositories/{workspace}/{repo_slug}/refs/tags": "listTags",
  "POST /repositories/{workspace}/{repo_slug}/refs/tags": "createTag",
  "DELETE /repositories/{workspace}/{repo_slug}/refs/tags/{name}": "deleteTag",
  "GET /repositories/{workspace}/{repo_slug}/refs/tags/{name}": "getTag",

  // Source
  "GET /repositories/{workspace}/{repo_slug}/src": "getRootDirectory",
  "POST /repositories/{workspace}/{repo_slug}/src": "createCommitFromFiles",
  "GET /repositories/{workspace}/{repo_slug}/src/{commit}/{path}": "getFileOrDirectory",

  // Snippets
  "POST /snippets": "createSnippet",
  "GET /snippets/{workspace}": "listWorkspaceSnippets",
  "POST /snippets/{workspace}": "createWorkspaceSnippet",
  "DELETE /snippets/{workspace}/{encoded_id}": "deleteSnippet",
  "GET /snippets/{workspace}/{encoded_id}": "getSnippet",
  "PUT /snippets/{workspace}/{encoded_id}": "updateSnippet",
  "GET /snippets/{workspace}/{encoded_id}/comments": "listSnippetComments",
  "POST /snippets/{workspace}/{encoded_id}/comments": "createSnippetComment",
  "DELETE /snippets/{workspace}/{encoded_id}/comments/{comment_id}": "deleteSnippetComment",
  "GET /snippets/{workspace}/{encoded_id}/comments/{comment_id}": "getSnippetComment",
  "PUT /snippets/{workspace}/{encoded_id}/comments/{comment_id}": "updateSnippetComment",
  "GET /snippets/{workspace}/{encoded_id}/commits": "listSnippetChanges",
  "GET /snippets/{workspace}/{encoded_id}/commits/{revision}": "getSnippetChange",
  "GET /snippets/{workspace}/{encoded_id}/files/{path}": "getSnippetFile",
  "DELETE /snippets/{workspace}/{encoded_id}/watch": "unwatchSnippet",
  "GET /snippets/{workspace}/{encoded_id}/watch": "getSnippetWatch",
  "PUT /snippets/{workspace}/{encoded_id}/watch": "watchSnippet",
  "DELETE /snippets/{workspace}/{encoded_id}/{node_id}": "deleteSnippetRevision",
  "GET /snippets/{workspace}/{encoded_id}/{node_id}": "getSnippetRevision",
  "PUT /snippets/{workspace}/{encoded_id}/{node_id}": "updateSnippetRevision",
  "GET /snippets/{workspace}/{encoded_id}/{node_id}/files/{path}": "getSnippetRevisionFile",
  "GET /snippets/{workspace}/{encoded_id}/{revision}/diff": "getSnippetDiff",
  "GET /snippets/{workspace}/{encoded_id}/{revision}/patch": "getSnippetPatch",

  // Users
  "GET /user": "getCurrentUser",
  "GET /user/emails": "listCurrentUserEmails",
  "GET /user/emails/{email}": "getCurrentUserEmail",
  "GET /user/workspaces": "listCurrentUserWorkspaces",
  "GET /user/workspaces/{workspace}/permission": "getCurrentUserWorkspacePermission",
  "GET /user/workspaces/{workspace}/permissions/repositories":
    "listCurrentUserRepositoryPermissions",
  "GET /users/{selected_user}": "getUser",
  "GET /users/{selected_user}/gpg-keys": "listGpgKeys",
  "POST /users/{selected_user}/gpg-keys": "addGpgKey",
  "DELETE /users/{selected_user}/gpg-keys/{fingerprint}": "deleteGpgKey",
  "GET /users/{selected_user}/gpg-keys/{fingerprint}": "getGpgKey",
  "GET /users/{selected_user}/ssh-keys": "listSshKeys",
  "POST /users/{selected_user}/ssh-keys": "addSshKey",
  "DELETE /users/{selected_user}/ssh-keys/{key_id}": "deleteSshKey",
  "GET /users/{selected_user}/ssh-keys/{key_id}": "getSshKey",
  "PUT /users/{selected_user}/ssh-keys/{key_id}": "updateSshKey",

  // Workspaces
  "GET /workspaces/{workspace}": "getWorkspace",
  "POST /workspaces/{workspace}/codesearch": "searchWorkspaceCode",
  "GET /workspaces/{workspace}/members": "listWorkspaceMembers",
  "GET /workspaces/{workspace}/members/{member}": "getWorkspaceMember",
  "GET /workspaces/{workspace}/permissions": "listWorkspacePermissions",
  "GET /workspaces/{workspace}/permissions/repositories": "listWorkspaceRepositoryPermissions",
  "GET /workspaces/{workspace}/permissions/repositories/{repo_slug}":
    "listRepositoryPermissionsForWorkspace",
  "GET /workspaces/{workspace}/pullrequests/{selected_user}": "listWorkspacePullRequestsForUser",
  "GET /workspaces/{workspace}/settings/gpg/public-key": "getWorkspaceGpgPublicKeys",

  // Projects
  "GET /workspaces/{workspace}/projects": "listProjects",
  "POST /workspaces/{workspace}/projects": "createProject",
  "DELETE /workspaces/{workspace}/projects/{project_key}": "deleteProject",
  "GET /workspaces/{workspace}/projects/{project_key}": "getProject",
  "PUT /workspaces/{workspace}/projects/{project_key}": "updateProject",
  "GET /workspaces/{workspace}/projects/{project_key}/branching-model": "getProjectBranchingModel",
  "GET /workspaces/{workspace}/projects/{project_key}/branching-model/settings":
    "getProjectBranchingModelSettings",
  "PUT /workspaces/{workspace}/projects/{project_key}/branching-model/settings":
    "updateProjectBranchingModelSettings",
  "GET /workspaces/{workspace}/projects/{project_key}/default-reviewers":
    "listProjectDefaultReviewers",
  "DELETE /workspaces/{workspace}/projects/{project_key}/default-reviewers/{selected_user}":
    "removeProjectDefaultReviewer",
  "GET /workspaces/{workspace}/projects/{project_key}/default-reviewers/{selected_user}":
    "getProjectDefaultReviewer",
  "PUT /workspaces/{workspace}/projects/{project_key}/default-reviewers/{selected_user}":
    "addProjectDefaultReviewer",
  "GET /workspaces/{workspace}/projects/{project_key}/deploy-keys": "listProjectDeployKeys",
  "POST /workspaces/{workspace}/projects/{project_key}/deploy-keys": "createProjectDeployKey",
  "DELETE /workspaces/{workspace}/projects/{project_key}/deploy-keys/{key_id}":
    "deleteProjectDeployKey",
  "GET /workspaces/{workspace}/projects/{project_key}/deploy-keys/{key_id}": "getProjectDeployKey",
  "GET /workspaces/{workspace}/projects/{project_key}/permissions-config/groups":
    "listProjectGroupPermissions",
  "DELETE /workspaces/{workspace}/projects/{project_key}/permissions-config/groups/{group_slug}":
    "deleteProjectGroupPermission",
  "GET /workspaces/{workspace}/projects/{project_key}/permissions-config/groups/{group_slug}":
    "getProjectGroupPermission",
  "PUT /workspaces/{workspace}/projects/{project_key}/permissions-config/groups/{group_slug}":
    "updateProjectGroupPermission",
  "GET /workspaces/{workspace}/projects/{project_key}/permissions-config/users":
    "listProjectUserPermissions",
  "DELETE /workspaces/{workspace}/projects/{project_key}/permissions-config/users/{selected_user_id}":
    "deleteProjectUserPermission",
  "GET /workspaces/{workspace}/projects/{project_key}/permissions-config/users/{selected_user_id}":
    "getProjectUserPermission",
  "PUT /workspaces/{workspace}/projects/{project_key}/permissions-config/users/{selected_user_id}":
    "updateProjectUserPermission",
};
