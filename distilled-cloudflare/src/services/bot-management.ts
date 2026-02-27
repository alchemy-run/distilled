/**
 * Cloudflare BOT-MANAGEMENT API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service bot-management
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// BotManagement
// =============================================================================

export interface GetBotManagementRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetBotManagementRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/bot_management" }),
) as unknown as Schema.Schema<GetBotManagementRequest>;

export type GetBotManagementResponse =
  | {
      zoneId: string;
      aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
      cfRobotsVariant?: "off" | "policy_only";
      crawlerProtection?: "enabled" | "disabled";
      enableJs?: boolean;
      fightMode?: boolean;
      isRobotsTxtManaged?: boolean;
    }
  | {
      zoneId: string;
      aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
      cfRobotsVariant?: "off" | "policy_only";
      crawlerProtection?: "enabled" | "disabled";
      enableJs?: boolean;
      isRobotsTxtManaged?: boolean;
      optimizeWordpress?: boolean;
      sbfmDefinitelyAutomated?: "allow" | "block" | "managed_challenge";
      sbfmStaticResourceProtection?: boolean;
      sbfmVerifiedBots?: "allow" | "block";
    }
  | {
      zoneId: string;
      aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
      cfRobotsVariant?: "off" | "policy_only";
      crawlerProtection?: "enabled" | "disabled";
      enableJs?: boolean;
      isRobotsTxtManaged?: boolean;
      optimizeWordpress?: boolean;
      sbfmDefinitelyAutomated?: "allow" | "block" | "managed_challenge";
      sbfmLikelyAutomated?: "allow" | "block" | "managed_challenge";
      sbfmStaticResourceProtection?: boolean;
      sbfmVerifiedBots?: "allow" | "block";
    }
  | {
      zoneId: string;
      aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
      autoUpdateModel?: boolean;
      bmCookieEnabled?: boolean;
      cfRobotsVariant?: "off" | "policy_only";
      crawlerProtection?: "enabled" | "disabled";
      enableJs?: boolean;
      isRobotsTxtManaged?: boolean;
      suppressSessionScore?: boolean;
    };

export const GetBotManagementResponse = Schema.Union([
  Schema.Struct({
    zoneId: Schema.String,
    aiBotsProtection: Schema.optional(
      Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
    ),
    cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
    crawlerProtection: Schema.optional(
      Schema.Literals(["enabled", "disabled"]),
    ),
    enableJs: Schema.optional(Schema.Boolean),
    fightMode: Schema.optional(Schema.Boolean),
    isRobotsTxtManaged: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      zoneId: "zone_id",
      aiBotsProtection: "ai_bots_protection",
      cfRobotsVariant: "cf_robots_variant",
      crawlerProtection: "crawler_protection",
      enableJs: "enable_js",
      fightMode: "fight_mode",
      isRobotsTxtManaged: "is_robots_txt_managed",
    }),
  ),
  Schema.Struct({
    zoneId: Schema.String,
    aiBotsProtection: Schema.optional(
      Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
    ),
    cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
    crawlerProtection: Schema.optional(
      Schema.Literals(["enabled", "disabled"]),
    ),
    enableJs: Schema.optional(Schema.Boolean),
    isRobotsTxtManaged: Schema.optional(Schema.Boolean),
    optimizeWordpress: Schema.optional(Schema.Boolean),
    sbfmDefinitelyAutomated: Schema.optional(
      Schema.Literals(["allow", "block", "managed_challenge"]),
    ),
    sbfmStaticResourceProtection: Schema.optional(Schema.Boolean),
    sbfmVerifiedBots: Schema.optional(Schema.Literals(["allow", "block"])),
  }).pipe(
    Schema.encodeKeys({
      zoneId: "zone_id",
      aiBotsProtection: "ai_bots_protection",
      cfRobotsVariant: "cf_robots_variant",
      crawlerProtection: "crawler_protection",
      enableJs: "enable_js",
      isRobotsTxtManaged: "is_robots_txt_managed",
      optimizeWordpress: "optimize_wordpress",
      sbfmDefinitelyAutomated: "sbfm_definitely_automated",
      sbfmStaticResourceProtection: "sbfm_static_resource_protection",
      sbfmVerifiedBots: "sbfm_verified_bots",
    }),
  ),
  Schema.Struct({
    zoneId: Schema.String,
    aiBotsProtection: Schema.optional(
      Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
    ),
    cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
    crawlerProtection: Schema.optional(
      Schema.Literals(["enabled", "disabled"]),
    ),
    enableJs: Schema.optional(Schema.Boolean),
    isRobotsTxtManaged: Schema.optional(Schema.Boolean),
    optimizeWordpress: Schema.optional(Schema.Boolean),
    sbfmDefinitelyAutomated: Schema.optional(
      Schema.Literals(["allow", "block", "managed_challenge"]),
    ),
    sbfmLikelyAutomated: Schema.optional(
      Schema.Literals(["allow", "block", "managed_challenge"]),
    ),
    sbfmStaticResourceProtection: Schema.optional(Schema.Boolean),
    sbfmVerifiedBots: Schema.optional(Schema.Literals(["allow", "block"])),
  }).pipe(
    Schema.encodeKeys({
      zoneId: "zone_id",
      aiBotsProtection: "ai_bots_protection",
      cfRobotsVariant: "cf_robots_variant",
      crawlerProtection: "crawler_protection",
      enableJs: "enable_js",
      isRobotsTxtManaged: "is_robots_txt_managed",
      optimizeWordpress: "optimize_wordpress",
      sbfmDefinitelyAutomated: "sbfm_definitely_automated",
      sbfmLikelyAutomated: "sbfm_likely_automated",
      sbfmStaticResourceProtection: "sbfm_static_resource_protection",
      sbfmVerifiedBots: "sbfm_verified_bots",
    }),
  ),
  Schema.Struct({
    zoneId: Schema.String,
    aiBotsProtection: Schema.optional(
      Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
    ),
    autoUpdateModel: Schema.optional(Schema.Boolean),
    bmCookieEnabled: Schema.optional(Schema.Boolean),
    cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
    crawlerProtection: Schema.optional(
      Schema.Literals(["enabled", "disabled"]),
    ),
    enableJs: Schema.optional(Schema.Boolean),
    isRobotsTxtManaged: Schema.optional(Schema.Boolean),
    suppressSessionScore: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      zoneId: "zone_id",
      aiBotsProtection: "ai_bots_protection",
      autoUpdateModel: "auto_update_model",
      bmCookieEnabled: "bm_cookie_enabled",
      cfRobotsVariant: "cf_robots_variant",
      crawlerProtection: "crawler_protection",
      enableJs: "enable_js",
      isRobotsTxtManaged: "is_robots_txt_managed",
      suppressSessionScore: "suppress_session_score",
    }),
  ),
]) as unknown as Schema.Schema<GetBotManagementResponse>;

export type GetBotManagementError = CommonErrors;

export const getBotManagement: API.OperationMethod<
  GetBotManagementRequest,
  GetBotManagementResponse,
  GetBotManagementError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBotManagementRequest,
  output: GetBotManagementResponse,
  errors: [],
}));

export interface PutBotManagementRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Enable rule to block AI Scrapers and Crawlers. Please note the value `only_on_ad_pages` is currently not available for Enterprise customers. */
  aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
  /** Body param: Specifies the Robots Access Control License variant to use. */
  cfRobotsVariant?: "off" | "policy_only";
  /** Body param: Enable rule to punish AI Scrapers and Crawlers via a link maze. */
  crawlerProtection?: "enabled" | "disabled";
  /** Body param: Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.cloudflare.com/bots/reference/javascript-detections/ */
  enableJs?: boolean;
  /** Body param: Whether to enable Bot Fight Mode. */
  fightMode?: boolean;
  /** Body param: Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt. */
  isRobotsTxtManaged?: boolean;
}

export const PutBotManagementRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  aiBotsProtection: Schema.optional(
    Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
  ),
  cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
  crawlerProtection: Schema.optional(Schema.Literals(["enabled", "disabled"])),
  enableJs: Schema.optional(Schema.Boolean),
  fightMode: Schema.optional(Schema.Boolean),
  isRobotsTxtManaged: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    aiBotsProtection: "ai_bots_protection",
    cfRobotsVariant: "cf_robots_variant",
    crawlerProtection: "crawler_protection",
    enableJs: "enable_js",
    fightMode: "fight_mode",
    isRobotsTxtManaged: "is_robots_txt_managed",
  }),
  T.Http({ method: "PUT", path: "/zones/{zone_id}/bot_management" }),
) as unknown as Schema.Schema<PutBotManagementRequest>;

export type PutBotManagementResponse =
  | {
      zoneId: string;
      aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
      cfRobotsVariant?: "off" | "policy_only";
      crawlerProtection?: "enabled" | "disabled";
      enableJs?: boolean;
      fightMode?: boolean;
      isRobotsTxtManaged?: boolean;
    }
  | {
      zoneId: string;
      aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
      cfRobotsVariant?: "off" | "policy_only";
      crawlerProtection?: "enabled" | "disabled";
      enableJs?: boolean;
      isRobotsTxtManaged?: boolean;
      optimizeWordpress?: boolean;
      sbfmDefinitelyAutomated?: "allow" | "block" | "managed_challenge";
      sbfmStaticResourceProtection?: boolean;
      sbfmVerifiedBots?: "allow" | "block";
    }
  | {
      zoneId: string;
      aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
      cfRobotsVariant?: "off" | "policy_only";
      crawlerProtection?: "enabled" | "disabled";
      enableJs?: boolean;
      isRobotsTxtManaged?: boolean;
      optimizeWordpress?: boolean;
      sbfmDefinitelyAutomated?: "allow" | "block" | "managed_challenge";
      sbfmLikelyAutomated?: "allow" | "block" | "managed_challenge";
      sbfmStaticResourceProtection?: boolean;
      sbfmVerifiedBots?: "allow" | "block";
    }
  | {
      zoneId: string;
      aiBotsProtection?: "block" | "disabled" | "only_on_ad_pages";
      autoUpdateModel?: boolean;
      bmCookieEnabled?: boolean;
      cfRobotsVariant?: "off" | "policy_only";
      crawlerProtection?: "enabled" | "disabled";
      enableJs?: boolean;
      isRobotsTxtManaged?: boolean;
      suppressSessionScore?: boolean;
    };

export const PutBotManagementResponse = Schema.Union([
  Schema.Struct({
    zoneId: Schema.String,
    aiBotsProtection: Schema.optional(
      Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
    ),
    cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
    crawlerProtection: Schema.optional(
      Schema.Literals(["enabled", "disabled"]),
    ),
    enableJs: Schema.optional(Schema.Boolean),
    fightMode: Schema.optional(Schema.Boolean),
    isRobotsTxtManaged: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      zoneId: "zone_id",
      aiBotsProtection: "ai_bots_protection",
      cfRobotsVariant: "cf_robots_variant",
      crawlerProtection: "crawler_protection",
      enableJs: "enable_js",
      fightMode: "fight_mode",
      isRobotsTxtManaged: "is_robots_txt_managed",
    }),
  ),
  Schema.Struct({
    zoneId: Schema.String,
    aiBotsProtection: Schema.optional(
      Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
    ),
    cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
    crawlerProtection: Schema.optional(
      Schema.Literals(["enabled", "disabled"]),
    ),
    enableJs: Schema.optional(Schema.Boolean),
    isRobotsTxtManaged: Schema.optional(Schema.Boolean),
    optimizeWordpress: Schema.optional(Schema.Boolean),
    sbfmDefinitelyAutomated: Schema.optional(
      Schema.Literals(["allow", "block", "managed_challenge"]),
    ),
    sbfmStaticResourceProtection: Schema.optional(Schema.Boolean),
    sbfmVerifiedBots: Schema.optional(Schema.Literals(["allow", "block"])),
  }).pipe(
    Schema.encodeKeys({
      zoneId: "zone_id",
      aiBotsProtection: "ai_bots_protection",
      cfRobotsVariant: "cf_robots_variant",
      crawlerProtection: "crawler_protection",
      enableJs: "enable_js",
      isRobotsTxtManaged: "is_robots_txt_managed",
      optimizeWordpress: "optimize_wordpress",
      sbfmDefinitelyAutomated: "sbfm_definitely_automated",
      sbfmStaticResourceProtection: "sbfm_static_resource_protection",
      sbfmVerifiedBots: "sbfm_verified_bots",
    }),
  ),
  Schema.Struct({
    zoneId: Schema.String,
    aiBotsProtection: Schema.optional(
      Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
    ),
    cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
    crawlerProtection: Schema.optional(
      Schema.Literals(["enabled", "disabled"]),
    ),
    enableJs: Schema.optional(Schema.Boolean),
    isRobotsTxtManaged: Schema.optional(Schema.Boolean),
    optimizeWordpress: Schema.optional(Schema.Boolean),
    sbfmDefinitelyAutomated: Schema.optional(
      Schema.Literals(["allow", "block", "managed_challenge"]),
    ),
    sbfmLikelyAutomated: Schema.optional(
      Schema.Literals(["allow", "block", "managed_challenge"]),
    ),
    sbfmStaticResourceProtection: Schema.optional(Schema.Boolean),
    sbfmVerifiedBots: Schema.optional(Schema.Literals(["allow", "block"])),
  }).pipe(
    Schema.encodeKeys({
      zoneId: "zone_id",
      aiBotsProtection: "ai_bots_protection",
      cfRobotsVariant: "cf_robots_variant",
      crawlerProtection: "crawler_protection",
      enableJs: "enable_js",
      isRobotsTxtManaged: "is_robots_txt_managed",
      optimizeWordpress: "optimize_wordpress",
      sbfmDefinitelyAutomated: "sbfm_definitely_automated",
      sbfmLikelyAutomated: "sbfm_likely_automated",
      sbfmStaticResourceProtection: "sbfm_static_resource_protection",
      sbfmVerifiedBots: "sbfm_verified_bots",
    }),
  ),
  Schema.Struct({
    zoneId: Schema.String,
    aiBotsProtection: Schema.optional(
      Schema.Literals(["block", "disabled", "only_on_ad_pages"]),
    ),
    autoUpdateModel: Schema.optional(Schema.Boolean),
    bmCookieEnabled: Schema.optional(Schema.Boolean),
    cfRobotsVariant: Schema.optional(Schema.Literals(["off", "policy_only"])),
    crawlerProtection: Schema.optional(
      Schema.Literals(["enabled", "disabled"]),
    ),
    enableJs: Schema.optional(Schema.Boolean),
    isRobotsTxtManaged: Schema.optional(Schema.Boolean),
    suppressSessionScore: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      zoneId: "zone_id",
      aiBotsProtection: "ai_bots_protection",
      autoUpdateModel: "auto_update_model",
      bmCookieEnabled: "bm_cookie_enabled",
      cfRobotsVariant: "cf_robots_variant",
      crawlerProtection: "crawler_protection",
      enableJs: "enable_js",
      isRobotsTxtManaged: "is_robots_txt_managed",
      suppressSessionScore: "suppress_session_score",
    }),
  ),
]) as unknown as Schema.Schema<PutBotManagementResponse>;

export type PutBotManagementError = CommonErrors;

export const putBotManagement: API.OperationMethod<
  PutBotManagementRequest,
  PutBotManagementResponse,
  PutBotManagementError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutBotManagementRequest,
  output: PutBotManagementResponse,
  errors: [],
}));
