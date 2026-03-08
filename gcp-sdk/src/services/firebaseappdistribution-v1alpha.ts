// ==========================================================================
// Firebase App Distribution API (firebaseappdistribution v1alpha)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "firebaseappdistribution",
  version: "v1alpha",
  rootUrl: "https://firebaseappdistribution.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleFirebaseAppdistroV1alphaDeviceInteractionBack {}

export const GoogleFirebaseAppdistroV1alphaDeviceInteractionBack: Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionBack> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaDeviceInteractionBack",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionBack>;

export interface AndroidxCrawlerOutputPoint {
  xCoordinate?: number;
  yCoordinate?: number;
}

export const AndroidxCrawlerOutputPoint: Schema.Schema<AndroidxCrawlerOutputPoint> =
  Schema.suspend(() =>
    Schema.Struct({
      xCoordinate: Schema.optional(Schema.Number),
      yCoordinate: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AndroidxCrawlerOutputPoint",
  }) as any as Schema.Schema<AndroidxCrawlerOutputPoint>;

export interface GoogleFirebaseAppdistroV1alphaDeviceInteractionWait {
  /** Output only. The duration of the wait. */
  duration?: string;
}

export const GoogleFirebaseAppdistroV1alphaDeviceInteractionWait: Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionWait> =
  Schema.suspend(() =>
    Schema.Struct({
      duration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaDeviceInteractionWait",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionWait>;

export interface GoogleFirebaseAppdistroV1alphaScreenshot {
  /** Output only. The width of the screenshot, in pixels. */
  width?: number;
  /** Output only. The URI of the screenshot. */
  uri?: string;
  /** Output only. The height of the screenshot, in pixels. */
  height?: number;
}

export const GoogleFirebaseAppdistroV1alphaScreenshot: Schema.Schema<GoogleFirebaseAppdistroV1alphaScreenshot> =
  Schema.suspend(() =>
    Schema.Struct({
      width: Schema.optional(Schema.Number),
      uri: Schema.optional(Schema.String),
      height: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaScreenshot",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaScreenshot>;

export interface GoogleFirebaseAppdistroV1alphaDeviceInteractionDragAndDrop {
  /** Output only. The start point of the drag and drop. */
  start?: AndroidxCrawlerOutputPoint;
  /** Output only. The end point of the drag and drop. */
  end?: AndroidxCrawlerOutputPoint;
}

export const GoogleFirebaseAppdistroV1alphaDeviceInteractionDragAndDrop: Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionDragAndDrop> =
  Schema.suspend(() =>
    Schema.Struct({
      start: Schema.optional(AndroidxCrawlerOutputPoint),
      end: Schema.optional(AndroidxCrawlerOutputPoint),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaDeviceInteractionDragAndDrop",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionDragAndDrop>;

export interface GoogleFirebaseAppdistroV1alphaDeviceInteractionSwipe {
  /** Output only. The start point of the swipe. */
  start?: AndroidxCrawlerOutputPoint;
  /** Output only. The end point of the swipe. */
  end?: AndroidxCrawlerOutputPoint;
}

export const GoogleFirebaseAppdistroV1alphaDeviceInteractionSwipe: Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionSwipe> =
  Schema.suspend(() =>
    Schema.Struct({
      start: Schema.optional(AndroidxCrawlerOutputPoint),
      end: Schema.optional(AndroidxCrawlerOutputPoint),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaDeviceInteractionSwipe",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionSwipe>;

export interface AndroidxCrawlerOutputRectangle {
  right?: number;
  left?: number;
  bottom?: number;
  top?: number;
}

export const AndroidxCrawlerOutputRectangle: Schema.Schema<AndroidxCrawlerOutputRectangle> =
  Schema.suspend(() =>
    Schema.Struct({
      right: Schema.optional(Schema.Number),
      left: Schema.optional(Schema.Number),
      bottom: Schema.optional(Schema.Number),
      top: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AndroidxCrawlerOutputRectangle",
  }) as any as Schema.Schema<AndroidxCrawlerOutputRectangle>;

export interface GoogleFirebaseAppdistroV1alphaDeviceInteractionEnterText {
  /** Output only. The text to enter. */
  text?: string;
  /** Output only. The visible bounds of the element to enter text into. */
  elementBounds?: AndroidxCrawlerOutputRectangle;
}

export const GoogleFirebaseAppdistroV1alphaDeviceInteractionEnterText: Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionEnterText> =
  Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      elementBounds: Schema.optional(AndroidxCrawlerOutputRectangle),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaDeviceInteractionEnterText",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteractionEnterText>;

export interface GoogleFirebaseAppdistroV1alphaDeviceInteraction {
  /** Output only. A back action. */
  backAction?: GoogleFirebaseAppdistroV1alphaDeviceInteractionBack;
  /** Output only. A long press (tap and hold) action. */
  longPress?: AndroidxCrawlerOutputPoint;
  /** Output only. Key code for a key event action. */
  keyCode?: string;
  /** Output only. A wait action. */
  wait?: GoogleFirebaseAppdistroV1alphaDeviceInteractionWait;
  /** Output only. A text input action, that types some text into whatever field is currently focused, if any. Unlike `enter_text` this action requires that the field be brought into focus first, for example by emitting a tap action before this one. */
  textInput?: string;
  /** Output only. The screenshot used in the context of this action. The screen may have changed before the action was actually taken. */
  screenshot?: GoogleFirebaseAppdistroV1alphaScreenshot;
  /** Output only. A tap action. */
  tap?: AndroidxCrawlerOutputPoint;
  /** Output only. A drag and drop action. */
  dragAndDrop?: GoogleFirebaseAppdistroV1alphaDeviceInteractionDragAndDrop;
  /** Output only. A swipe action. */
  swipe?: GoogleFirebaseAppdistroV1alphaDeviceInteractionSwipe;
  /** Output only. A text entry action, that enters text into a particular text field, clearing any existing text in the field. Unlike `text_input` this action does not require any other actions such as a tap to be performed before it can enter the text. */
  enterText?: GoogleFirebaseAppdistroV1alphaDeviceInteractionEnterText;
}

export const GoogleFirebaseAppdistroV1alphaDeviceInteraction: Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteraction> =
  Schema.suspend(() =>
    Schema.Struct({
      backAction: Schema.optional(
        GoogleFirebaseAppdistroV1alphaDeviceInteractionBack,
      ),
      longPress: Schema.optional(AndroidxCrawlerOutputPoint),
      keyCode: Schema.optional(Schema.String),
      wait: Schema.optional(
        GoogleFirebaseAppdistroV1alphaDeviceInteractionWait,
      ),
      textInput: Schema.optional(Schema.String),
      screenshot: Schema.optional(GoogleFirebaseAppdistroV1alphaScreenshot),
      tap: Schema.optional(AndroidxCrawlerOutputPoint),
      dragAndDrop: Schema.optional(
        GoogleFirebaseAppdistroV1alphaDeviceInteractionDragAndDrop,
      ),
      swipe: Schema.optional(
        GoogleFirebaseAppdistroV1alphaDeviceInteractionSwipe,
      ),
      enterText: Schema.optional(
        GoogleFirebaseAppdistroV1alphaDeviceInteractionEnterText,
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaDeviceInteraction",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceInteraction>;

export interface GoogleFirebaseAppdistroV1alphaDeviceAction {
  /** Output only. A short description of the high level action taken by the AI agent. */
  description?: string;
  /** Output only. The interactions made with the device as part of this higher level action taken by the agent, such as taps, text entries, waits, etc. */
  deviceInteractions?: Array<GoogleFirebaseAppdistroV1alphaDeviceInteraction>;
}

export const GoogleFirebaseAppdistroV1alphaDeviceAction: Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceAction> =
  Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      deviceInteractions: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaDeviceInteraction),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaDeviceAction",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceAction>;

export interface GoogleFirebaseAppdistroV1alphaGoalActionDebugInfo {
  /** Output only. Structured data explaining the agent's choice. */
  jsonUri?: string;
  /** Output only. URI of the screenshot with elements labeled which was used by the agent. */
  annotatedScreenshotUri?: string;
}

export const GoogleFirebaseAppdistroV1alphaGoalActionDebugInfo: Schema.Schema<GoogleFirebaseAppdistroV1alphaGoalActionDebugInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      jsonUri: Schema.optional(Schema.String),
      annotatedScreenshotUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaGoalActionDebugInfo",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaGoalActionDebugInfo>;

export interface GoogleFirebaseAppdistroV1alphaTerminalAction {
  /** Output only. The screenshot used in the context of this terminal action. */
  screenshot?: GoogleFirebaseAppdistroV1alphaScreenshot;
  /** Output only. The reason why this goal was ended. */
  reason?:
    | "REASON_UNSPECIFIED"
    | "GOAL_IMPOSSIBLE"
    | "GOAL_COMPLETE"
    | (string & {});
}

export const GoogleFirebaseAppdistroV1alphaTerminalAction: Schema.Schema<GoogleFirebaseAppdistroV1alphaTerminalAction> =
  Schema.suspend(() =>
    Schema.Struct({
      screenshot: Schema.optional(GoogleFirebaseAppdistroV1alphaScreenshot),
      reason: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaTerminalAction",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaTerminalAction>;

export interface GoogleFirebaseAppdistroV1alphaGoalAction {
  /** Output only. An explanation justifying why the action was taken. */
  explanation?: string;
  /** Output only. A high level action taken by the AI on the device. */
  deviceAction?: GoogleFirebaseAppdistroV1alphaDeviceAction;
  /** Output only. The type of caching used to determine the action. */
  cachingType?:
    | "CACHING_TYPE_UNSPECIFIED"
    | "NO_CACHING"
    | "CACHE_AND_MODEL"
    | "CACHE_ONLY"
    | (string & {});
  /** Output only. Debug information explaining why the agent to the specific action. */
  debugInfo?: GoogleFirebaseAppdistroV1alphaGoalActionDebugInfo;
  /** Output only. An action taken by the AI to end the goal. */
  terminalAction?: GoogleFirebaseAppdistroV1alphaTerminalAction;
  /** Output only. The time at which the action started. */
  startTime?: string;
}

export const GoogleFirebaseAppdistroV1alphaGoalAction: Schema.Schema<GoogleFirebaseAppdistroV1alphaGoalAction> =
  Schema.suspend(() =>
    Schema.Struct({
      explanation: Schema.optional(Schema.String),
      deviceAction: Schema.optional(GoogleFirebaseAppdistroV1alphaDeviceAction),
      cachingType: Schema.optional(Schema.String),
      debugInfo: Schema.optional(
        GoogleFirebaseAppdistroV1alphaGoalActionDebugInfo,
      ),
      terminalAction: Schema.optional(
        GoogleFirebaseAppdistroV1alphaTerminalAction,
      ),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaGoalAction",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaGoalAction>;

export interface GoogleFirebaseAppdistroV1alphaGoalDetails {
  /** Output only. The actions taken by the AI while attempting to accomplish the goal. */
  goalActions?: Array<GoogleFirebaseAppdistroV1alphaGoalAction>;
}

export const GoogleFirebaseAppdistroV1alphaGoalDetails: Schema.Schema<GoogleFirebaseAppdistroV1alphaGoalDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      goalActions: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaGoalAction),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaGoalDetails",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaGoalDetails>;

export interface GoogleFirebaseAppdistroV1alphaJwt {
  /** The JWT token (three Base64URL-encoded strings joined by dots). */
  token?: string;
}

export const GoogleFirebaseAppdistroV1alphaJwt: Schema.Schema<GoogleFirebaseAppdistroV1alphaJwt> =
  Schema.suspend(() =>
    Schema.Struct({
      token: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaJwt",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaJwt>;

export interface GoogleFirebaseAppdistroV1alphaAiStep {
  /** Optional. Hint text containing suggestions to help the agent accomplish the goal */
  hint?: string;
  /** An assertion to be checked by the AI */
  assertion?: string;
  /** Optional. A visual description of the screen's expected state after the step has been successfully completed. This is referred to as the "final screen assertion" in the Firebase console and CLI tools. This field must be provided for the last step in a test case, and is optional for all other steps. */
  successCriteria?: string;
  /** A goal to be accomplished by the AI */
  goal?: string;
  /** Output only. The test case that contained this step. Note: The test case may have changed or been deleted since this step was created. Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  testCase?: string;
}

export const GoogleFirebaseAppdistroV1alphaAiStep: Schema.Schema<GoogleFirebaseAppdistroV1alphaAiStep> =
  Schema.suspend(() =>
    Schema.Struct({
      hint: Schema.optional(Schema.String),
      assertion: Schema.optional(Schema.String),
      successCriteria: Schema.optional(Schema.String),
      goal: Schema.optional(Schema.String),
      testCase: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaAiStep",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaAiStep>;

export interface GoogleFirebaseAppdistroV1alphaAiInstructions {
  /** Required. Steps to be accomplished by the AI */
  steps?: Array<GoogleFirebaseAppdistroV1alphaAiStep>;
}

export const GoogleFirebaseAppdistroV1alphaAiInstructions: Schema.Schema<GoogleFirebaseAppdistroV1alphaAiInstructions> =
  Schema.suspend(() =>
    Schema.Struct({
      steps: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaAiStep),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaAiInstructions",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaAiInstructions>;

export interface GoogleFirebaseAppdistroV1alphaTestCase {
  /** Optional. Test case that must be run before this test case. */
  prerequisiteTestCase?: string;
  /** Output only. Timestamp when the test case was created */
  createTime?: string;
  /** Identifier. The name of the test case resource. Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  name?: string;
  /** Optional. Instructions for AI driven test. */
  aiInstructions?: GoogleFirebaseAppdistroV1alphaAiInstructions;
  /** Required. Display name of the test case. */
  displayName?: string;
  /** Output only. Other test cases that depend on this test case as a prerequisite. */
  dependentTestCases?: Array<string>;
}

export const GoogleFirebaseAppdistroV1alphaTestCase: Schema.Schema<GoogleFirebaseAppdistroV1alphaTestCase> =
  Schema.suspend(() =>
    Schema.Struct({
      prerequisiteTestCase: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      aiInstructions: Schema.optional(
        GoogleFirebaseAppdistroV1alphaAiInstructions,
      ),
      displayName: Schema.optional(Schema.String),
      dependentTestCases: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaTestCase",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaTestCase>;

export interface GoogleFirebaseAppdistroV1alphaUpdateTestCaseRequest {
  /** Required. The test case to update. The test case's `name` field is used to identify the test case to update. Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  testCase?: GoogleFirebaseAppdistroV1alphaTestCase;
  /** Optional. If set to true, and the test case is not found, a new test case will be created. */
  allowMissing?: boolean;
}

export const GoogleFirebaseAppdistroV1alphaUpdateTestCaseRequest: Schema.Schema<GoogleFirebaseAppdistroV1alphaUpdateTestCaseRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      testCase: Schema.optional(GoogleFirebaseAppdistroV1alphaTestCase),
      allowMissing: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaUpdateTestCaseRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaUpdateTestCaseRequest>;

export interface GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesRequest {
  /** Required. The update requests. A maximum number of 1000 test cases can be updated in one batch */
  requests?: Array<GoogleFirebaseAppdistroV1alphaUpdateTestCaseRequest>;
}

export const GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesRequest: Schema.Schema<GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaUpdateTestCaseRequest),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesRequest>;

export interface GoogleFirebaseAppdistroV1alphaTestDevice {
  /** Required. The version of the device (API level on Android). */
  version?: string;
  /** Optional. The orientation of the device during the test. */
  orientation?: string;
  /** Optional. The locale of the device (e.g. "en_US" for US English) during the test. */
  locale?: string;
  /** Required. The device model. */
  model?: string;
}

export const GoogleFirebaseAppdistroV1alphaTestDevice: Schema.Schema<GoogleFirebaseAppdistroV1alphaTestDevice> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      orientation: Schema.optional(Schema.String),
      locale: Schema.optional(Schema.String),
      model: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaTestDevice",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaTestDevice>;

export interface GoogleFirebaseAppdistroV1alphaRoboStats {
  /** Output only. Number of distinct screens visited. */
  distinctVisitedScreens?: number;
  /** Output only. Number of actions that crawler performed. */
  actionsPerformed?: number;
  /** Output only. Duration of crawl. */
  crawlDuration?: string;
  /** Output only. Whether the main activity crawl timed out. */
  mainActivityCrawlTimedOut?: boolean;
}

export const GoogleFirebaseAppdistroV1alphaRoboStats: Schema.Schema<GoogleFirebaseAppdistroV1alphaRoboStats> =
  Schema.suspend(() =>
    Schema.Struct({
      distinctVisitedScreens: Schema.optional(Schema.Number),
      actionsPerformed: Schema.optional(Schema.Number),
      crawlDuration: Schema.optional(Schema.String),
      mainActivityCrawlTimedOut: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaRoboStats",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaRoboStats>;

export interface GoogleFirebaseAppdistroV1alphaAppCrash {
  /** Output only. The message associated with the crash. */
  message?: string;
  /** Output only. The raw stack trace. */
  stackTrace?: string;
}

export const GoogleFirebaseAppdistroV1alphaAppCrash: Schema.Schema<GoogleFirebaseAppdistroV1alphaAppCrash> =
  Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      stackTrace: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaAppCrash",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaAppCrash>;

export interface GoogleFirebaseAppdistroV1alphaAssertionDetails {
  /** Output only. An explanation justifying the assertion result. */
  explanation?: string;
  /** Output only. The screenshot used in the context of this assertion. */
  screenshot?: GoogleFirebaseAppdistroV1alphaScreenshot;
  /** Output only. The result of the assertion. */
  result?: boolean;
}

export const GoogleFirebaseAppdistroV1alphaAssertionDetails: Schema.Schema<GoogleFirebaseAppdistroV1alphaAssertionDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      explanation: Schema.optional(Schema.String),
      screenshot: Schema.optional(GoogleFirebaseAppdistroV1alphaScreenshot),
      result: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaAssertionDetails",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaAssertionDetails>;

export interface GoogleFirebaseAppdistroV1alphaAiStepResult {
  /** Required. The step performed by the AI */
  step?: GoogleFirebaseAppdistroV1alphaAiStep;
  /** Output only. The current state of the step */
  state?:
    | "STEP_STATE_UNSPECIFIED"
    | "IN_PROGRESS"
    | "PASSED"
    | "FAILED"
    | "TIMED_OUT"
    | "GOAL_ACTION_LIMIT_REACHED"
    | (string & {});
  /** Output only. Details for an assertion step. */
  assertionDetails?: GoogleFirebaseAppdistroV1alphaAssertionDetails;
  /** Output only. Details for a goal step. */
  goalDetails?: GoogleFirebaseAppdistroV1alphaGoalDetails;
}

export const GoogleFirebaseAppdistroV1alphaAiStepResult: Schema.Schema<GoogleFirebaseAppdistroV1alphaAiStepResult> =
  Schema.suspend(() =>
    Schema.Struct({
      step: Schema.optional(GoogleFirebaseAppdistroV1alphaAiStep),
      state: Schema.optional(Schema.String),
      assertionDetails: Schema.optional(
        GoogleFirebaseAppdistroV1alphaAssertionDetails,
      ),
      goalDetails: Schema.optional(GoogleFirebaseAppdistroV1alphaGoalDetails),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaAiStepResult",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaAiStepResult>;

export interface GoogleFirebaseAppdistroV1alphaDeviceExecution {
  /** Required. The device that the test was run on. */
  device?: GoogleFirebaseAppdistroV1alphaTestDevice;
  /** Output only. The statistics collected during the Robo test. */
  roboStats?: GoogleFirebaseAppdistroV1alphaRoboStats;
  /** Output only. An app crash, if any occurred during the test. */
  appCrash?: GoogleFirebaseAppdistroV1alphaAppCrash;
  /** Identifier. The name of the device execution resource. Format: `projects/{project_number}/apps/{app}/releases/{release}/tests/{test}/deviceExecutions/{device_execution}` */
  name?: string;
  /** Output only. The state of the test. */
  state?:
    | "TEST_STATE_UNSPECIFIED"
    | "IN_PROGRESS"
    | "PASSED"
    | "FAILED"
    | "INCONCLUSIVE"
    | (string & {});
  /** Output only. A URI to a video of the test run. */
  videoUri?: string;
  /** Output only. The reason why the test was inconclusive. */
  inconclusiveReason?:
    | "INCONCLUSIVE_REASON_UNSPECIFIED"
    | "QUOTA_EXCEEDED"
    | "INFRASTRUCTURE_FAILURE"
    | "SERVICE_NOT_ACTIVATED"
    | "NO_SIGNATURE"
    | "NO_LAUNCHER_ACTIVITY"
    | "FORBIDDEN_PERMISSIONS"
    | "DEVICE_ADMIN_RECEIVER"
    | "NO_CODE_APK"
    | "INVALID_APK_PREVIEW_SDK"
    | (string & {});
  /** Output only. The device execution from which cached steps were used during this execution. Note: This field is only populated for ACTION_BASED_REPLAY executions. If the original device execution no longer exists, this field will be empty. Format: `projects/{project_number}/apps/{app}/releases/{release}/tests/{test}/deviceExecutions/{device_execution}` */
  originDeviceExecution?: string;
  /** Output only. Results of the AI steps if passed in */
  aiStepResults?: Array<GoogleFirebaseAppdistroV1alphaAiStepResult>;
  /** Output only. Indicates that the test replayed saved actions and concluded without a final AI assertion. */
  finalAiAssertionMissing?: boolean;
  /** Output only. The time at which the video started recording. */
  videoStartTime?: string;
  /** Output only. The path to a directory in Cloud Storage that will eventually contain the results for this execution. For example, gs://bucket/Nexus5-18-en-portrait. */
  resultsStoragePath?: string;
  /** Output only. The reason why the test failed. */
  failedReason?:
    | "FAILED_REASON_UNSPECIFIED"
    | "CRASHED"
    | "NOT_INSTALLED"
    | "UNABLE_TO_CRAWL"
    | "DEVICE_OUT_OF_MEMORY"
    | "FAILED_AI_STEP"
    | "TIMED_OUT"
    | (string & {});
  /** Output only. A URI to an image of the Robo crawl graph. */
  crawlGraphUri?: string;
  /** Output only. The type of execution for the test. */
  executionType?:
    | "EXECUTION_TYPE_UNSPECIFIED"
    | "AI"
    | "ACTION_BASED_REPLAY"
    | "AI_REPLAY"
    | "RANDOM_CRAWL"
    | (string & {});
  /** Output only. A list of screenshot image URIs taken from the Robo crawl. The file names are numbered by the order in which they were taken. */
  screenshotUris?: Array<string>;
}

export const GoogleFirebaseAppdistroV1alphaDeviceExecution: Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceExecution> =
  Schema.suspend(() =>
    Schema.Struct({
      device: Schema.optional(GoogleFirebaseAppdistroV1alphaTestDevice),
      roboStats: Schema.optional(GoogleFirebaseAppdistroV1alphaRoboStats),
      appCrash: Schema.optional(GoogleFirebaseAppdistroV1alphaAppCrash),
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      videoUri: Schema.optional(Schema.String),
      inconclusiveReason: Schema.optional(Schema.String),
      originDeviceExecution: Schema.optional(Schema.String),
      aiStepResults: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaAiStepResult),
      ),
      finalAiAssertionMissing: Schema.optional(Schema.Boolean),
      videoStartTime: Schema.optional(Schema.String),
      resultsStoragePath: Schema.optional(Schema.String),
      failedReason: Schema.optional(Schema.String),
      crawlGraphUri: Schema.optional(Schema.String),
      executionType: Schema.optional(Schema.String),
      screenshotUris: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaDeviceExecution",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaDeviceExecution>;

export interface GoogleFirebaseAppdistroV1ReleaseNotes {
  /** The text of the release notes. */
  text?: string;
}

export const GoogleFirebaseAppdistroV1ReleaseNotes: Schema.Schema<GoogleFirebaseAppdistroV1ReleaseNotes> =
  Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1ReleaseNotes",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1ReleaseNotes>;

export interface GoogleFirebaseAppdistroV1Release {
  /** Output only. A link to the release in the tester web clip or Android app that lets testers (which were granted access to the app) view release notes and install the app onto their devices. */
  testingUri?: string;
  /** Output only. The time the release was last updated. */
  updateTime?: string;
  /** Output only. Build version of the release. For an Android release, the build version is the `versionCode`. For an iOS release, the build version is the `CFBundleVersion`. */
  buildVersion?: string;
  /** Output only. The time the release was created. */
  createTime?: string;
  /** Output only. The time the release will expire. */
  expireTime?: string;
  /** Output only. A link to the Firebase console displaying a single release. */
  firebaseConsoleUri?: string;
  /** Output only. Display version of the release. For an Android release, the display version is the `versionName`. For an iOS release, the display version is the `CFBundleShortVersionString`. */
  displayVersion?: string;
  /** The name of the release resource. Format: `projects/{project_number}/apps/{app}/releases/{release}` */
  name?: string;
  /** Output only. A signed link (which expires in one hour) to directly download the app binary (IPA/APK/AAB) file. */
  binaryDownloadUri?: string;
  /** Notes of the release. */
  releaseNotes?: GoogleFirebaseAppdistroV1ReleaseNotes;
}

export const GoogleFirebaseAppdistroV1Release: Schema.Schema<GoogleFirebaseAppdistroV1Release> =
  Schema.suspend(() =>
    Schema.Struct({
      testingUri: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      buildVersion: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      firebaseConsoleUri: Schema.optional(Schema.String),
      displayVersion: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      binaryDownloadUri: Schema.optional(Schema.String),
      releaseNotes: Schema.optional(GoogleFirebaseAppdistroV1ReleaseNotes),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1Release",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1Release>;

export interface GoogleFirebaseAppdistroV1UploadReleaseResponse {
  /** Result of upload release. */
  result?:
    | "UPLOAD_RELEASE_RESULT_UNSPECIFIED"
    | "RELEASE_CREATED"
    | "RELEASE_UPDATED"
    | "RELEASE_UNMODIFIED"
    | (string & {});
  /** Release associated with the uploaded binary. */
  release?: GoogleFirebaseAppdistroV1Release;
}

export const GoogleFirebaseAppdistroV1UploadReleaseResponse: Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(Schema.String),
      release: Schema.optional(GoogleFirebaseAppdistroV1Release),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1UploadReleaseResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseResponse>;

export interface GoogleFirebaseAppdistroV1alphaReleaseNotes {
  /** The actual release notes text from the user. */
  releaseNotes?: string;
}

export const GoogleFirebaseAppdistroV1alphaReleaseNotes: Schema.Schema<GoogleFirebaseAppdistroV1alphaReleaseNotes> =
  Schema.suspend(() =>
    Schema.Struct({
      releaseNotes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaReleaseNotes",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaReleaseNotes>;

export interface GoogleFirebaseAppdistroV1alphaCreateReleaseNotesRequest {
  /** The actual release notes body from the user */
  releaseNotes?: GoogleFirebaseAppdistroV1alphaReleaseNotes;
}

export const GoogleFirebaseAppdistroV1alphaCreateReleaseNotesRequest: Schema.Schema<GoogleFirebaseAppdistroV1alphaCreateReleaseNotesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      releaseNotes: Schema.optional(GoogleFirebaseAppdistroV1alphaReleaseNotes),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaCreateReleaseNotesRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaCreateReleaseNotesRequest>;

export interface GoogleFirebaseAppdistroV1alphaLoginCredentialFieldHints {
  /** Required. The Android resource name of the username UI element. For example, in Java: R.string.foo in xml: @string/foo Only the "foo" part is needed. Reference doc: https://developer.android.com/guide/topics/resources/accessing-resources.html */
  usernameResourceName?: string;
  /** Required. The Android resource name of the password UI element. For example, in Java: R.string.foo in xml: @string/foo Only the "foo" part is needed. Reference doc: https://developer.android.com/guide/topics/resources/accessing-resources.html */
  passwordResourceName?: string;
}

export const GoogleFirebaseAppdistroV1alphaLoginCredentialFieldHints: Schema.Schema<GoogleFirebaseAppdistroV1alphaLoginCredentialFieldHints> =
  Schema.suspend(() =>
    Schema.Struct({
      usernameResourceName: Schema.optional(Schema.String),
      passwordResourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaLoginCredentialFieldHints",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaLoginCredentialFieldHints>;

export interface GoogleFirebaseAppdistroV1alphaLoginCredential {
  /** Optional. Password for automated tests */
  password?: string;
  /** Optional. Username for automated tests */
  username?: string;
  /** Optional. Are these credentials for Google? */
  google?: boolean;
  /** Optional. Hints to the crawler for identifying input fields */
  fieldHints?: GoogleFirebaseAppdistroV1alphaLoginCredentialFieldHints;
}

export const GoogleFirebaseAppdistroV1alphaLoginCredential: Schema.Schema<GoogleFirebaseAppdistroV1alphaLoginCredential> =
  Schema.suspend(() =>
    Schema.Struct({
      password: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      google: Schema.optional(Schema.Boolean),
      fieldHints: Schema.optional(
        GoogleFirebaseAppdistroV1alphaLoginCredentialFieldHints,
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaLoginCredential",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaLoginCredential>;

export interface GoogleFirebaseAppdistroV1alphaRoboCrawler {
  /** Optional. Login credential for automated tests */
  loginCredential?: GoogleFirebaseAppdistroV1alphaLoginCredential;
  /** Optional. Instructions for AI driven test */
  aiInstructions?: GoogleFirebaseAppdistroV1alphaAiInstructions;
}

export const GoogleFirebaseAppdistroV1alphaRoboCrawler: Schema.Schema<GoogleFirebaseAppdistroV1alphaRoboCrawler> =
  Schema.suspend(() =>
    Schema.Struct({
      loginCredential: Schema.optional(
        GoogleFirebaseAppdistroV1alphaLoginCredential,
      ),
      aiInstructions: Schema.optional(
        GoogleFirebaseAppdistroV1alphaAiInstructions,
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaRoboCrawler",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaRoboCrawler>;

export interface GoogleFirebaseAppdistroV1alphaTestConfig {
  /** Optional. Tests will be run on this list of devices */
  testDevices?: Array<GoogleFirebaseAppdistroV1alphaTestDevice>;
  /** Identifier. The name of the test configuration resource. Format: `projects/{project_number}/apps/{app}/testConfig` */
  name?: string;
  /** Optional. Display name of the AI driven test. Required if the release test is created with multiple goals. */
  displayName?: string;
  /** Optional. Configuration for Robo crawler */
  roboCrawler?: GoogleFirebaseAppdistroV1alphaRoboCrawler;
}

export const GoogleFirebaseAppdistroV1alphaTestConfig: Schema.Schema<GoogleFirebaseAppdistroV1alphaTestConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      testDevices: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaTestDevice),
      ),
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      roboCrawler: Schema.optional(GoogleFirebaseAppdistroV1alphaRoboCrawler),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaTestConfig",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaTestConfig>;

export interface GoogleFirebaseAppdistroV1alphaReleaseTest {
  /** The name of the release test resource. Format: `projects/{project_number}/apps/{app}/releases/{release}/tests/{test}` */
  name?: string;
  /** Output only. The state of the release test. */
  testState?:
    | "TEST_STATE_UNSPECIFIED"
    | "IN_PROGRESS"
    | "PASSED"
    | "FAILED"
    | "INCONCLUSIVE"
    | (string & {});
  /** Output only. Timestamp when the test was run. */
  createTime?: string;
  /** Optional. Input only. Login credentials for the test. Input only. */
  loginCredential?: GoogleFirebaseAppdistroV1alphaLoginCredential;
  /** Optional. Instructions for AI driven test. */
  aiInstructions?: GoogleFirebaseAppdistroV1alphaAiInstructions;
  /** Required. The results of the test on each device. */
  deviceExecutions?: Array<GoogleFirebaseAppdistroV1alphaDeviceExecution>;
  /** Optional. Display name of the release test. Required if the release test is created with multiple goals. */
  displayName?: string;
  /** Optional. The test case that was used to generate this release test. Note: The test case may have changed or been deleted since the release test was created. Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  testCase?: string;
}

export const GoogleFirebaseAppdistroV1alphaReleaseTest: Schema.Schema<GoogleFirebaseAppdistroV1alphaReleaseTest> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      testState: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      loginCredential: Schema.optional(
        GoogleFirebaseAppdistroV1alphaLoginCredential,
      ),
      aiInstructions: Schema.optional(
        GoogleFirebaseAppdistroV1alphaAiInstructions,
      ),
      deviceExecutions: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaDeviceExecution),
      ),
      displayName: Schema.optional(Schema.String),
      testCase: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaReleaseTest",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaReleaseTest>;

export interface GoogleFirebaseAppdistroV1alphaClearTestCaseCacheResponse {}

export const GoogleFirebaseAppdistroV1alphaClearTestCaseCacheResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaClearTestCaseCacheResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaClearTestCaseCacheResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaClearTestCaseCacheResponse>;

export interface GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseResponse {}

export const GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseResponse>;

export interface GoogleFirebaseAppdistroV1alphaTestQuota {
  /** Output only. Number of `ReleaseTests` run in the current month */
  usage?: string;
  /** Identifier. The name of the `TestQuota` resource. Format: `projects/{project_number}/testQuota` */
  name?: string;
  /** Output only. Maximum number of `ReleaseTests` allotted for the current month. */
  limit?: string;
}

export const GoogleFirebaseAppdistroV1alphaTestQuota: Schema.Schema<GoogleFirebaseAppdistroV1alphaTestQuota> =
  Schema.suspend(() =>
    Schema.Struct({
      usage: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      limit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaTestQuota",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaTestQuota>;

export interface GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesResponse {
  /** The updated test cases. */
  testCases?: Array<GoogleFirebaseAppdistroV1alphaTestCase>;
}

export const GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      testCases: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaTestCase),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesResponse>;

export interface GoogleFirebaseAppdistroV1alphaCancelReleaseTestResponse {}

export const GoogleFirebaseAppdistroV1alphaCancelReleaseTestResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaCancelReleaseTestResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaCancelReleaseTestResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaCancelReleaseTestResponse>;

export interface GoogleFirebaseAppdistroV1alphaTesterUdid {
  /** The name of the tester's device */
  name?: string;
  /** The platform of the tester's device */
  platform?: string;
  /** The UDID of the tester's device */
  udid?: string;
}

export const GoogleFirebaseAppdistroV1alphaTesterUdid: Schema.Schema<GoogleFirebaseAppdistroV1alphaTesterUdid> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      platform: Schema.optional(Schema.String),
      udid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaTesterUdid",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaTesterUdid>;

export interface GoogleFirebaseAppdistroV1UploadReleaseMetadata {}

export const GoogleFirebaseAppdistroV1UploadReleaseMetadata: Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirebaseAppdistroV1UploadReleaseMetadata",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1UploadReleaseMetadata>;

export interface GoogleFirebaseAppdistroV1alphaListTestCasesResponse {
  /** The test cases from the specified app. */
  testCases?: Array<GoogleFirebaseAppdistroV1alphaTestCase>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppdistroV1alphaListTestCasesResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaListTestCasesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      testCases: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaTestCase),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaListTestCasesResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaListTestCasesResponse>;

export interface GoogleFirebaseAppdistroV1alphaClearTestCaseCacheRequest {
  /** Optional. The list of devices for which to clear the cache. If not present, clear all of them. */
  testDevices?: Array<GoogleFirebaseAppdistroV1alphaTestDevice>;
}

export const GoogleFirebaseAppdistroV1alphaClearTestCaseCacheRequest: Schema.Schema<GoogleFirebaseAppdistroV1alphaClearTestCaseCacheRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      testDevices: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaTestDevice),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaClearTestCaseCacheRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaClearTestCaseCacheRequest>;

export interface GoogleFirebaseAppdistroV1alphaRelease {
  /** Release Id */
  id?: string;
  /** Instance id of the release */
  instanceId?: string;
  /** Release build version */
  buildVersion?: string;
  /** Count of testers added to the release */
  testerCount?: number;
  /** Last activity timestamp */
  lastActivityAt?: string;
  /** Number of testers who have open invitations for the release */
  openInvitationCount?: number;
  /** Number of testers who have installed the release */
  testerWithInstallCount?: number;
  /** Timestamp when the release was created */
  distributedAt?: string;
  /** unused. */
  receivedAt?: string;
  /** Release notes summary */
  releaseNotesSummary?: string;
  /** Release version */
  displayVersion?: string;
}

export const GoogleFirebaseAppdistroV1alphaRelease: Schema.Schema<GoogleFirebaseAppdistroV1alphaRelease> =
  Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      instanceId: Schema.optional(Schema.String),
      buildVersion: Schema.optional(Schema.String),
      testerCount: Schema.optional(Schema.Number),
      lastActivityAt: Schema.optional(Schema.String),
      openInvitationCount: Schema.optional(Schema.Number),
      testerWithInstallCount: Schema.optional(Schema.Number),
      distributedAt: Schema.optional(Schema.String),
      receivedAt: Schema.optional(Schema.String),
      releaseNotesSummary: Schema.optional(Schema.String),
      displayVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaRelease",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaRelease>;

export interface GoogleFirebaseAppdistroV1alphaAabCertificate {
  /** MD5 hash of the certificate used to resign the AAB */
  certificateHashMd5?: string;
  /** SHA1 hash of the certificate used to resign the AAB */
  certificateHashSha1?: string;
  /** SHA256 hash of the certificate used to resign the AAB */
  certificateHashSha256?: string;
}

export const GoogleFirebaseAppdistroV1alphaAabCertificate: Schema.Schema<GoogleFirebaseAppdistroV1alphaAabCertificate> =
  Schema.suspend(() =>
    Schema.Struct({
      certificateHashMd5: Schema.optional(Schema.String),
      certificateHashSha1: Schema.optional(Schema.String),
      certificateHashSha256: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaAabCertificate",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaAabCertificate>;

export interface GoogleFirebaseAppdistroV1alphaApp {
  /** Project number of the Firebase project, for example 300830567303. */
  projectNumber?: string;
  /** Developer contact email for testers to reach out to about privacy or support issues. */
  contactEmail?: string;
  /** App bundle state. Only valid for android apps. The app_view field in the request must be set to FULL in order for this to be populated. */
  aabState?:
    | "AAB_STATE_UNSPECIFIED"
    | "ACTIVE"
    | "PLAY_ACCOUNT_NOT_LINKED"
    | "NO_APP_WITH_GIVEN_BUNDLE_ID_IN_PLAY_ACCOUNT"
    | "APP_NOT_PUBLISHED"
    | "AAB_STATE_UNAVAILABLE"
    | "PLAY_IAS_TERMS_NOT_ACCEPTED"
    | (string & {});
  /** App bundle test certificate generated for the app. */
  aabCertificate?: GoogleFirebaseAppdistroV1alphaAabCertificate;
  /** Bundle identifier */
  bundleId?: string;
  /** Firebase gmp app id */
  appId?: string;
  /** iOS or Android */
  platform?: string;
}

export const GoogleFirebaseAppdistroV1alphaApp: Schema.Schema<GoogleFirebaseAppdistroV1alphaApp> =
  Schema.suspend(() =>
    Schema.Struct({
      projectNumber: Schema.optional(Schema.String),
      contactEmail: Schema.optional(Schema.String),
      aabState: Schema.optional(Schema.String),
      aabCertificate: Schema.optional(
        GoogleFirebaseAppdistroV1alphaAabCertificate,
      ),
      bundleId: Schema.optional(Schema.String),
      appId: Schema.optional(Schema.String),
      platform: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaApp",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaApp>;

export interface GoogleFirebaseAppdistroV1alphaGetReleaseByUploadHashResponse {
  /** Release object */
  release?: GoogleFirebaseAppdistroV1alphaRelease;
}

export const GoogleFirebaseAppdistroV1alphaGetReleaseByUploadHashResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaGetReleaseByUploadHashResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      release: Schema.optional(GoogleFirebaseAppdistroV1alphaRelease),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaGetReleaseByUploadHashResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaGetReleaseByUploadHashResponse>;

export interface GoogleFirebaseAppdistroV1alphaListReleaseTestsResponse {
  /** The tests listed. */
  releaseTests?: Array<GoogleFirebaseAppdistroV1alphaReleaseTest>;
  /** A short-lived token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppdistroV1alphaListReleaseTestsResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaListReleaseTestsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      releaseTests: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaReleaseTest),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaListReleaseTestsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaListReleaseTestsResponse>;

export interface GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseRequest {
  /** Optional. Ignored. Used to be build version of the app release if an instance identifier was provided for the release_id. */
  buildVersion?: string;
  /** Optional. An email address which should get access to this release, for example rebeccahe@google.com */
  emails?: Array<string>;
  /** Optional. Ignored. Used to be display version of the app release if an instance identifier was provided for the release_id. */
  displayVersion?: string;
  /** Optional. A repeated list of group aliases to enable access to a release for Note: This field is misnamed, but can't be changed because we need to maintain compatibility with old build tools */
  groupIds?: Array<string>;
}

export const GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseRequest: Schema.Schema<GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      buildVersion: Schema.optional(Schema.String),
      emails: Schema.optional(Schema.Array(Schema.String)),
      displayVersion: Schema.optional(Schema.String),
      groupIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseRequest>;

export interface GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse {
  /** The UDIDs of tester iOS devices in a project */
  testerUdids?: Array<GoogleFirebaseAppdistroV1alphaTesterUdid>;
}

export const GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      testerUdids: Schema.optional(
        Schema.Array(GoogleFirebaseAppdistroV1alphaTesterUdid),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse>;

export interface GoogleFirebaseAppdistroV1alphaGetUploadStatusResponse {
  /** The status of the upload */
  status?:
    | "STATUS_UNSPECIFIED"
    | "IN_PROGRESS"
    | "ALREADY_UPLOADED"
    | "SUCCESS"
    | "ERROR"
    | (string & {});
  /** Any additional context for the given upload status (e.g. error message) Meant to be displayed to the client */
  message?: string;
  /** The error code associated with (only set on "FAILURE") */
  errorCode?:
    | "ERROR_UNSPECIFIED"
    | "INVALID_ZIP"
    | "MISSING_PLIST"
    | "MISSING_PROFILE"
    | "VERSION_TOO_LONG"
    | "MISSING_UUIDS"
    | "MISSING_RESOURCES"
    | "MISSING_MANIFEST"
    | "IOS_METADATA_ERROR"
    | "ANDROID_METADATA_ERROR"
    | "UNSUPPORTED_PLATFORM_TYPE"
    | "BUNDLE_ID_MISMATCH"
    | "APK_NOT_ZIP_ALIGNED"
    | "INVALID_CERTIFICATE"
    | "APK_TOO_LARGE"
    | "AAB_NOT_PUBLISHED"
    | "INVALID_PLIST_DEVICE_FAMILIES"
    | "AAB_TOS_NOT_ACCEPTED"
    | "APP_NAME_TOO_LONG"
    | "AAB_DEVELOPER_ACCOUNT_NOT_LINKED"
    | "AAB_NO_APP_WITH_GIVEN_PACKAGE_NAME_IN_ACCOUNT"
    | "AAB_UPLOAD_ERROR"
    | "APP_NOT_FOUND"
    | (string & {});
  /** The release that was created from the upload (only set on "SUCCESS") */
  release?: GoogleFirebaseAppdistroV1alphaRelease;
}

export const GoogleFirebaseAppdistroV1alphaGetUploadStatusResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaGetUploadStatusResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
      errorCode: Schema.optional(Schema.String),
      release: Schema.optional(GoogleFirebaseAppdistroV1alphaRelease),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaGetUploadStatusResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaGetUploadStatusResponse>;

export interface GoogleFirebaseAppdistroV1alphaCreateReleaseNotesResponse {}

export const GoogleFirebaseAppdistroV1alphaCreateReleaseNotesResponse: Schema.Schema<GoogleFirebaseAppdistroV1alphaCreateReleaseNotesResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaCreateReleaseNotesResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaCreateReleaseNotesResponse>;

export interface GoogleFirebaseAppdistroV1alphaBatchDeleteTestCasesRequest {
  /** Required. The name of the test cases to delete. A maximum number of 1000 test cases can be deleted in one batch Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  names?: Array<string>;
}

export const GoogleFirebaseAppdistroV1alphaBatchDeleteTestCasesRequest: Schema.Schema<GoogleFirebaseAppdistroV1alphaBatchDeleteTestCasesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      names: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppdistroV1alphaBatchDeleteTestCasesRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppdistroV1alphaBatchDeleteTestCasesRequest>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetTestQuotaProjectsRequest {
  /** Required. The name of the `TestQuota` resource to retrieve. Format: `projects/{project_number}/testQuota` */
  name: string;
}

export const GetTestQuotaProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/testQuota" }),
  svc,
) as unknown as Schema.Schema<GetTestQuotaProjectsRequest>;

export type GetTestQuotaProjectsResponse =
  GoogleFirebaseAppdistroV1alphaTestQuota;
export const GetTestQuotaProjectsResponse =
  GoogleFirebaseAppdistroV1alphaTestQuota;

export type GetTestQuotaProjectsError = DefaultErrors;

/** Get information about the quota for `ReleaseTests`. */
export const getTestQuotaProjects: API.OperationMethod<
  GetTestQuotaProjectsRequest,
  GetTestQuotaProjectsResponse,
  GetTestQuotaProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTestQuotaProjectsRequest,
  output: GetTestQuotaProjectsResponse,
  errors: [],
}));

export interface GetUdidsProjectsTestersRequest {
  /** The name of the project, which is the parent of testers Format: `projects/{project_number}` */
  project: string;
  /** Unique id for a Firebase app of the format: {version}:{project_number}:{platform}:{hash(bundle_id)} Example: 1:581234567376:android:aa0a3c7b135e90289 */
  mobilesdkAppId?: string;
}

export const GetUdidsProjectsTestersRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  mobilesdkAppId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("mobilesdkAppId"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/testers:udids",
  }),
  svc,
) as unknown as Schema.Schema<GetUdidsProjectsTestersRequest>;

export type GetUdidsProjectsTestersResponse =
  GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse;
export const GetUdidsProjectsTestersResponse =
  GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse;

export type GetUdidsProjectsTestersError = DefaultErrors;

/** Get UDIDs of tester iOS devices in a project */
export const getUdidsProjectsTesters: API.OperationMethod<
  GetUdidsProjectsTestersRequest,
  GetUdidsProjectsTestersResponse,
  GetUdidsProjectsTestersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetUdidsProjectsTestersRequest,
  output: GetUdidsProjectsTestersResponse,
  errors: [],
}));

export interface UpdateTestConfigProjectsAppsRequest {
  /** Identifier. The name of the test configuration resource. Format: `projects/{project_number}/apps/{app}/testConfig` */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaTestConfig;
}

export const UpdateTestConfigProjectsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppdistroV1alphaTestConfig).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testConfig",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateTestConfigProjectsAppsRequest>;

export type UpdateTestConfigProjectsAppsResponse =
  GoogleFirebaseAppdistroV1alphaTestConfig;
export const UpdateTestConfigProjectsAppsResponse =
  GoogleFirebaseAppdistroV1alphaTestConfig;

export type UpdateTestConfigProjectsAppsError = DefaultErrors;

/** Updates automated test configuration. */
export const updateTestConfigProjectsApps: API.OperationMethod<
  UpdateTestConfigProjectsAppsRequest,
  UpdateTestConfigProjectsAppsResponse,
  UpdateTestConfigProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTestConfigProjectsAppsRequest,
  output: UpdateTestConfigProjectsAppsResponse,
  errors: [],
}));

export interface GetTestConfigProjectsAppsRequest {
  /** Required. The name of the `TestConfig` resource to retrieve. Format: `projects/{project_number}/apps/{app}/testConfig` */
  name: string;
}

export const GetTestConfigProjectsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testConfig",
  }),
  svc,
) as unknown as Schema.Schema<GetTestConfigProjectsAppsRequest>;

export type GetTestConfigProjectsAppsResponse =
  GoogleFirebaseAppdistroV1alphaTestConfig;
export const GetTestConfigProjectsAppsResponse =
  GoogleFirebaseAppdistroV1alphaTestConfig;

export type GetTestConfigProjectsAppsError = DefaultErrors;

/** Gets configuration for automated tests. */
export const getTestConfigProjectsApps: API.OperationMethod<
  GetTestConfigProjectsAppsRequest,
  GetTestConfigProjectsAppsResponse,
  GetTestConfigProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTestConfigProjectsAppsRequest,
  output: GetTestConfigProjectsAppsResponse,
  errors: [],
}));

export interface CreateProjectsAppsTestCasesRequest {
  /** Optional. The ID to use for the test case, which will become the final component of the test case's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. */
  testCaseId?: string;
  /** Required. The parent resource where this test case will be created. Format: `projects/{project_number}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaTestCase;
}

export const CreateProjectsAppsTestCasesRequest = Schema.Struct({
  testCaseId: Schema.optional(Schema.String).pipe(T.HttpQuery("testCaseId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirebaseAppdistroV1alphaTestCase).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testCases",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAppsTestCasesRequest>;

export type CreateProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaTestCase;
export const CreateProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaTestCase;

export type CreateProjectsAppsTestCasesError = DefaultErrors;

/** Create a new test case. */
export const createProjectsAppsTestCases: API.OperationMethod<
  CreateProjectsAppsTestCasesRequest,
  CreateProjectsAppsTestCasesResponse,
  CreateProjectsAppsTestCasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsAppsTestCasesRequest,
  output: CreateProjectsAppsTestCasesResponse,
  errors: [],
}));

export interface DeleteProjectsAppsTestCasesRequest {
  /** Required. The name of the test case resource to delete. Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  name: string;
}

export const DeleteProjectsAppsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testCases/{testCasesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAppsTestCasesRequest>;

export type DeleteProjectsAppsTestCasesResponse = GoogleProtobufEmpty;
export const DeleteProjectsAppsTestCasesResponse = GoogleProtobufEmpty;

export type DeleteProjectsAppsTestCasesError = DefaultErrors;

/** Delete a test case. */
export const deleteProjectsAppsTestCases: API.OperationMethod<
  DeleteProjectsAppsTestCasesRequest,
  DeleteProjectsAppsTestCasesResponse,
  DeleteProjectsAppsTestCasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsAppsTestCasesRequest,
  output: DeleteProjectsAppsTestCasesResponse,
  errors: [],
}));

export interface ClearTestCaseCacheProjectsAppsTestCasesRequest {
  /** Required. The name of the test case resource for which to clear the cache. Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  testCase: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaClearTestCaseCacheRequest;
}

export const ClearTestCaseCacheProjectsAppsTestCasesRequest = Schema.Struct({
  testCase: Schema.String.pipe(T.HttpPath("testCase")),
  body: Schema.optional(
    GoogleFirebaseAppdistroV1alphaClearTestCaseCacheRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testCases/{testCasesId}:clearTestCaseCache",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ClearTestCaseCacheProjectsAppsTestCasesRequest>;

export type ClearTestCaseCacheProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaClearTestCaseCacheResponse;
export const ClearTestCaseCacheProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaClearTestCaseCacheResponse;

export type ClearTestCaseCacheProjectsAppsTestCasesError = DefaultErrors;

/** Clears cached test runs for a specific test case and device(s). */
export const clearTestCaseCacheProjectsAppsTestCases: API.OperationMethod<
  ClearTestCaseCacheProjectsAppsTestCasesRequest,
  ClearTestCaseCacheProjectsAppsTestCasesResponse,
  ClearTestCaseCacheProjectsAppsTestCasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ClearTestCaseCacheProjectsAppsTestCasesRequest,
  output: ClearTestCaseCacheProjectsAppsTestCasesResponse,
  errors: [],
}));

export interface GetProjectsAppsTestCasesRequest {
  /** Required. The name of the test case resource to retrieve. Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  name: string;
}

export const GetProjectsAppsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testCases/{testCasesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsTestCasesRequest>;

export type GetProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaTestCase;
export const GetProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaTestCase;

export type GetProjectsAppsTestCasesError = DefaultErrors;

/** Get a test case. */
export const getProjectsAppsTestCases: API.OperationMethod<
  GetProjectsAppsTestCasesRequest,
  GetProjectsAppsTestCasesResponse,
  GetProjectsAppsTestCasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsAppsTestCasesRequest,
  output: GetProjectsAppsTestCasesResponse,
  errors: [],
}));

export interface ListProjectsAppsTestCasesRequest {
  /** Optional. A page token, received from a previous `ListTestCases` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTestCases` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent resource from which to list test cases. Format: `projects/{project_number}/apps/{app}` */
  parent: string;
  /** Optional. The maximum number of test cases to return. The service may return fewer than this value. If unspecified, at most 50 test cases will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsAppsTestCasesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testCases",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsAppsTestCasesRequest>;

export type ListProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaListTestCasesResponse;
export const ListProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaListTestCasesResponse;

export type ListProjectsAppsTestCasesError = DefaultErrors;

/** List test cases. */
export const listProjectsAppsTestCases: API.PaginatedOperationMethod<
  ListProjectsAppsTestCasesRequest,
  ListProjectsAppsTestCasesResponse,
  ListProjectsAppsTestCasesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsAppsTestCasesRequest,
  output: ListProjectsAppsTestCasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchDeleteProjectsAppsTestCasesRequest {
  /** Required. The parent resource of the test cases being deleted. Format: `projects/{project_number}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaBatchDeleteTestCasesRequest;
}

export const BatchDeleteProjectsAppsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleFirebaseAppdistroV1alphaBatchDeleteTestCasesRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testCases:batchDelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsAppsTestCasesRequest>;

export type BatchDeleteProjectsAppsTestCasesResponse = GoogleProtobufEmpty;
export const BatchDeleteProjectsAppsTestCasesResponse = GoogleProtobufEmpty;

export type BatchDeleteProjectsAppsTestCasesError = DefaultErrors;

/** Deletes multiple test cases. */
export const batchDeleteProjectsAppsTestCases: API.OperationMethod<
  BatchDeleteProjectsAppsTestCasesRequest,
  BatchDeleteProjectsAppsTestCasesResponse,
  BatchDeleteProjectsAppsTestCasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchDeleteProjectsAppsTestCasesRequest,
  output: BatchDeleteProjectsAppsTestCasesResponse,
  errors: [],
}));

export interface PatchProjectsAppsTestCasesRequest {
  /** Identifier. The name of the test case resource. Format: `projects/{project_number}/apps/{app}/testCases/{test_case}` */
  name: string;
  /** Optional. If set to true, and the test case is not found, a new test case will be created. */
  allowMissing?: boolean;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaTestCase;
}

export const PatchProjectsAppsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  body: Schema.optional(GoogleFirebaseAppdistroV1alphaTestCase).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testCases/{testCasesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsTestCasesRequest>;

export type PatchProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaTestCase;
export const PatchProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaTestCase;

export type PatchProjectsAppsTestCasesError = DefaultErrors;

/** Update a test case. */
export const patchProjectsAppsTestCases: API.OperationMethod<
  PatchProjectsAppsTestCasesRequest,
  PatchProjectsAppsTestCasesResponse,
  PatchProjectsAppsTestCasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsAppsTestCasesRequest,
  output: PatchProjectsAppsTestCasesResponse,
  errors: [],
}));

export interface BatchUpdateProjectsAppsTestCasesRequest {
  /** Required. The parent resource of the test cases being updated. Format: `projects/{project_number}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesRequest;
}

export const BatchUpdateProjectsAppsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/testCases:batchUpdate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsAppsTestCasesRequest>;

export type BatchUpdateProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesResponse;
export const BatchUpdateProjectsAppsTestCasesResponse =
  GoogleFirebaseAppdistroV1alphaBatchUpdateTestCasesResponse;

export type BatchUpdateProjectsAppsTestCasesError = DefaultErrors;

/** Updates multiple test cases. */
export const batchUpdateProjectsAppsTestCases: API.OperationMethod<
  BatchUpdateProjectsAppsTestCasesRequest,
  BatchUpdateProjectsAppsTestCasesResponse,
  BatchUpdateProjectsAppsTestCasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchUpdateProjectsAppsTestCasesRequest,
  output: BatchUpdateProjectsAppsTestCasesResponse,
  errors: [],
}));

export interface GetProjectsAppsReleasesTestsRequest {
  /** Required. The name of the release test resource. Format: `projects/{project_number}/apps/{app}/releases/{release}/tests/{test}` */
  name: string;
}

export const GetProjectsAppsReleasesTestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/tests/{testsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsReleasesTestsRequest>;

export type GetProjectsAppsReleasesTestsResponse =
  GoogleFirebaseAppdistroV1alphaReleaseTest;
export const GetProjectsAppsReleasesTestsResponse =
  GoogleFirebaseAppdistroV1alphaReleaseTest;

export type GetProjectsAppsReleasesTestsError = DefaultErrors;

/** Get results for automated test run on release. */
export const getProjectsAppsReleasesTests: API.OperationMethod<
  GetProjectsAppsReleasesTestsRequest,
  GetProjectsAppsReleasesTestsResponse,
  GetProjectsAppsReleasesTestsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsAppsReleasesTestsRequest,
  output: GetProjectsAppsReleasesTestsResponse,
  errors: [],
}));

export interface CancelProjectsAppsReleasesTestsRequest {
  /** Required. The name of the release test resource. Format: `projects/{project_number}/apps/{app}/releases/{release}/tests/{test}` */
  name: string;
}

export const CancelProjectsAppsReleasesTestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/tests/{testsId}:cancel",
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsAppsReleasesTestsRequest>;

export type CancelProjectsAppsReleasesTestsResponse =
  GoogleFirebaseAppdistroV1alphaCancelReleaseTestResponse;
export const CancelProjectsAppsReleasesTestsResponse =
  GoogleFirebaseAppdistroV1alphaCancelReleaseTestResponse;

export type CancelProjectsAppsReleasesTestsError = DefaultErrors;

/** Abort automated test run on release. */
export const cancelProjectsAppsReleasesTests: API.OperationMethod<
  CancelProjectsAppsReleasesTestsRequest,
  CancelProjectsAppsReleasesTestsResponse,
  CancelProjectsAppsReleasesTestsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsAppsReleasesTestsRequest,
  output: CancelProjectsAppsReleasesTestsResponse,
  errors: [],
}));

export interface CreateProjectsAppsReleasesTestsRequest {
  /** Required. The name of the release resource, which is the parent of the test Format: `projects/{project_number}/apps/{app}/releases/{release}` */
  parent: string;
  /** Optional. The ID to use for the test, which will become the final component of the test's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. If it is not provided one will be automatically generated. */
  releaseTestId?: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaReleaseTest;
}

export const CreateProjectsAppsReleasesTestsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  releaseTestId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("releaseTestId"),
  ),
  body: Schema.optional(GoogleFirebaseAppdistroV1alphaReleaseTest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/tests",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAppsReleasesTestsRequest>;

export type CreateProjectsAppsReleasesTestsResponse =
  GoogleFirebaseAppdistroV1alphaReleaseTest;
export const CreateProjectsAppsReleasesTestsResponse =
  GoogleFirebaseAppdistroV1alphaReleaseTest;

export type CreateProjectsAppsReleasesTestsError = DefaultErrors;

/** Run automated test(s) on release. */
export const createProjectsAppsReleasesTests: API.OperationMethod<
  CreateProjectsAppsReleasesTestsRequest,
  CreateProjectsAppsReleasesTestsResponse,
  CreateProjectsAppsReleasesTestsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsAppsReleasesTestsRequest,
  output: CreateProjectsAppsReleasesTestsResponse,
  errors: [],
}));

export interface ListProjectsAppsReleasesTestsRequest {
  /** Required. The name of the release resource, which is the parent of the tests Format: `projects/{project_number}/apps/{app}/releases/{release}` */
  parent: string;
  /** Optional. The maximum number of tests to return. The service may return fewer than this value. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListReleaseTests` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. The requested view on the returned ReleaseTests. Defaults to the basic view. */
  view?:
    | "RELEASE_TEST_VIEW_UNSPECIFIED"
    | "RELEASE_TEST_VIEW_BASIC"
    | "RELEASE_TEST_VIEW_FULL"
    | (string & {});
}

export const ListProjectsAppsReleasesTestsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/projects/{projectsId}/apps/{appsId}/releases/{releasesId}/tests",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsAppsReleasesTestsRequest>;

export type ListProjectsAppsReleasesTestsResponse =
  GoogleFirebaseAppdistroV1alphaListReleaseTestsResponse;
export const ListProjectsAppsReleasesTestsResponse =
  GoogleFirebaseAppdistroV1alphaListReleaseTestsResponse;

export type ListProjectsAppsReleasesTestsError = DefaultErrors;

/** List results for automated tests run on release. */
export const listProjectsAppsReleasesTests: API.PaginatedOperationMethod<
  ListProjectsAppsReleasesTestsRequest,
  ListProjectsAppsReleasesTestsResponse,
  ListProjectsAppsReleasesTestsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsAppsReleasesTestsRequest,
  output: ListProjectsAppsReleasesTestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetJwtAppsRequest {
  /** Required. Unique id for a Firebase app of the format: {version}:{project_number}:{platform}:{hash(bundle_id)} Example: 1:581234567376:android:aa0a3c7b135e90289 */
  mobilesdkAppId: string;
}

export const GetJwtAppsRequest = Schema.Struct({
  mobilesdkAppId: Schema.String.pipe(T.HttpPath("mobilesdkAppId")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/apps/{mobilesdkAppId}/jwt" }),
  svc,
) as unknown as Schema.Schema<GetJwtAppsRequest>;

export type GetJwtAppsResponse = GoogleFirebaseAppdistroV1alphaJwt;
export const GetJwtAppsResponse = GoogleFirebaseAppdistroV1alphaJwt;

export type GetJwtAppsError = DefaultErrors;

/** Get a JWT token */
export const getJwtApps: API.OperationMethod<
  GetJwtAppsRequest,
  GetJwtAppsResponse,
  GetJwtAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetJwtAppsRequest,
  output: GetJwtAppsResponse,
  errors: [],
}));

export interface GetAppsRequest {
  /** Unique id for a Firebase app of the format: {version}:{project_number}:{platform}:{hash(bundle_id)} Example: 1:581234567376:android:aa0a3c7b135e90289 */
  mobilesdkAppId: string;
  /** App view. When unset or set to BASIC, returns an App with everything set except for aab_state. When set to FULL, returns an App with aab_state set. */
  appView?: "APP_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetAppsRequest = Schema.Struct({
  mobilesdkAppId: Schema.String.pipe(T.HttpPath("mobilesdkAppId")),
  appView: Schema.optional(Schema.String).pipe(T.HttpQuery("appView")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/apps/{mobilesdkAppId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsRequest>;

export type GetAppsResponse = GoogleFirebaseAppdistroV1alphaApp;
export const GetAppsResponse = GoogleFirebaseAppdistroV1alphaApp;

export type GetAppsError = DefaultErrors;

/** Get the app, if it exists */
export const getApps: API.OperationMethod<
  GetAppsRequest,
  GetAppsResponse,
  GetAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAppsRequest,
  output: GetAppsResponse,
  errors: [],
}));

export interface GetAppsUpload_statusRequest {
  /** Required. Unique id for a Firebase app of the format: {version}:{project_number}:{platform}:{hash(bundle_id)} Example: 1:581234567376:android:aa0a3c7b135e90289 */
  mobilesdkAppId: string;
  /** Required. The token for the upload */
  uploadToken: string;
}

export const GetAppsUpload_statusRequest = Schema.Struct({
  mobilesdkAppId: Schema.String.pipe(T.HttpPath("mobilesdkAppId")),
  uploadToken: Schema.String.pipe(T.HttpPath("uploadToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/apps/{mobilesdkAppId}/upload_status/{uploadToken}",
  }),
  svc,
) as unknown as Schema.Schema<GetAppsUpload_statusRequest>;

export type GetAppsUpload_statusResponse =
  GoogleFirebaseAppdistroV1alphaGetUploadStatusResponse;
export const GetAppsUpload_statusResponse =
  GoogleFirebaseAppdistroV1alphaGetUploadStatusResponse;

export type GetAppsUpload_statusError = DefaultErrors;

/** GET Binary upload status by token */
export const getAppsUpload_status: API.OperationMethod<
  GetAppsUpload_statusRequest,
  GetAppsUpload_statusResponse,
  GetAppsUpload_statusError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAppsUpload_statusRequest,
  output: GetAppsUpload_statusResponse,
  errors: [],
}));

export interface GetAppsRelease_by_hashRequest {
  /** Required. Unique id for a Firebase app of the format: {version}:{project_number}:{platform}:{hash(bundle_id)} Example: 1:581234567376:android:aa0a3c7b135e90289 */
  mobilesdkAppId: string;
  /** Required. The hash for the upload */
  uploadHash: string;
}

export const GetAppsRelease_by_hashRequest = Schema.Struct({
  mobilesdkAppId: Schema.String.pipe(T.HttpPath("mobilesdkAppId")),
  uploadHash: Schema.String.pipe(T.HttpPath("uploadHash")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/apps/{mobilesdkAppId}/release_by_hash/{uploadHash}",
  }),
  svc,
) as unknown as Schema.Schema<GetAppsRelease_by_hashRequest>;

export type GetAppsRelease_by_hashResponse =
  GoogleFirebaseAppdistroV1alphaGetReleaseByUploadHashResponse;
export const GetAppsRelease_by_hashResponse =
  GoogleFirebaseAppdistroV1alphaGetReleaseByUploadHashResponse;

export type GetAppsRelease_by_hashError = DefaultErrors;

/** GET Release by binary upload hash */
export const getAppsRelease_by_hash: API.OperationMethod<
  GetAppsRelease_by_hashRequest,
  GetAppsRelease_by_hashResponse,
  GetAppsRelease_by_hashError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAppsRelease_by_hashRequest,
  output: GetAppsRelease_by_hashResponse,
  errors: [],
}));

export interface Enable_accessAppsReleasesRequest {
  /** Required. Unique id for a Firebase app of the format: {version}:{project_number}:{platform}:{hash(bundle_id)} Example: 1:581234567376:android:aa0a3c7b135e90289 */
  mobilesdkAppId: string;
  /** Required. Release identifier */
  releaseId: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseRequest;
}

export const Enable_accessAppsReleasesRequest = Schema.Struct({
  mobilesdkAppId: Schema.String.pipe(T.HttpPath("mobilesdkAppId")),
  releaseId: Schema.String.pipe(T.HttpPath("releaseId")),
  body: Schema.optional(
    GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/apps/{mobilesdkAppId}/releases/{releaseId}/enable_access",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<Enable_accessAppsReleasesRequest>;

export type Enable_accessAppsReleasesResponse =
  GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseResponse;
export const Enable_accessAppsReleasesResponse =
  GoogleFirebaseAppdistroV1alphaEnableAccessOnReleaseResponse;

export type Enable_accessAppsReleasesError = DefaultErrors;

/** Enable access on a release for testers. */
export const enable_accessAppsReleases: API.OperationMethod<
  Enable_accessAppsReleasesRequest,
  Enable_accessAppsReleasesResponse,
  Enable_accessAppsReleasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: Enable_accessAppsReleasesRequest,
  output: Enable_accessAppsReleasesResponse,
  errors: [],
}));

export interface CreateAppsReleasesNotesRequest {
  /** Required. Unique id for a Firebase app of the format: {version}:{project_number}:{platform}:{hash(bundle_id)} Example: 1:581234567376:android:aa0a3c7b135e90289 */
  mobilesdkAppId: string;
  /** Required. Release identifier */
  releaseId: string;
  /** Request body */
  body?: GoogleFirebaseAppdistroV1alphaCreateReleaseNotesRequest;
}

export const CreateAppsReleasesNotesRequest = Schema.Struct({
  mobilesdkAppId: Schema.String.pipe(T.HttpPath("mobilesdkAppId")),
  releaseId: Schema.String.pipe(T.HttpPath("releaseId")),
  body: Schema.optional(
    GoogleFirebaseAppdistroV1alphaCreateReleaseNotesRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/apps/{mobilesdkAppId}/releases/{releaseId}/notes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAppsReleasesNotesRequest>;

export type CreateAppsReleasesNotesResponse =
  GoogleFirebaseAppdistroV1alphaCreateReleaseNotesResponse;
export const CreateAppsReleasesNotesResponse =
  GoogleFirebaseAppdistroV1alphaCreateReleaseNotesResponse;

export type CreateAppsReleasesNotesError = DefaultErrors;

/** Create release notes on a release. */
export const createAppsReleasesNotes: API.OperationMethod<
  CreateAppsReleasesNotesRequest,
  CreateAppsReleasesNotesResponse,
  CreateAppsReleasesNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAppsReleasesNotesRequest,
  output: CreateAppsReleasesNotesResponse,
  errors: [],
}));

export interface GetTesterUdidsAppsTestersRequest {
  /** Unique id for a Firebase app of the format: {version}:{project_number}:{platform}:{hash(bundle_id)} Example: 1:581234567376:android:aa0a3c7b135e90289 */
  mobilesdkAppId: string;
  /** The name of the project, which is the parent of testers Format: `projects/{project_number}` */
  project?: string;
}

export const GetTesterUdidsAppsTestersRequest = Schema.Struct({
  mobilesdkAppId: Schema.String.pipe(T.HttpPath("mobilesdkAppId")),
  project: Schema.optional(Schema.String).pipe(T.HttpQuery("project")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/apps/{mobilesdkAppId}/testers:getTesterUdids",
  }),
  svc,
) as unknown as Schema.Schema<GetTesterUdidsAppsTestersRequest>;

export type GetTesterUdidsAppsTestersResponse =
  GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse;
export const GetTesterUdidsAppsTestersResponse =
  GoogleFirebaseAppdistroV1alphaGetTesterUdidsResponse;

export type GetTesterUdidsAppsTestersError = DefaultErrors;

/** Get UDIDs of tester iOS devices in a project */
export const getTesterUdidsAppsTesters: API.OperationMethod<
  GetTesterUdidsAppsTestersRequest,
  GetTesterUdidsAppsTestersResponse,
  GetTesterUdidsAppsTestersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTesterUdidsAppsTestersRequest,
  output: GetTesterUdidsAppsTestersResponse,
  errors: [],
}));
