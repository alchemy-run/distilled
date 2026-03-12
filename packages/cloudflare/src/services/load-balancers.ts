/**
 * Cloudflare LOAD-BALANCERS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service load-balancers
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// LoadBalancer
// =============================================================================

export interface GetLoadBalancerRequest {
  loadBalancerId: string;
  zoneId: string;
}

export const GetLoadBalancerRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    loadBalancerId: Schema.String.pipe(T.HttpPath("loadBalancerId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/load_balancers/{loadBalancerId}",
  }),
) as unknown as Schema.Schema<GetLoadBalancerRequest>;

export interface GetLoadBalancerResponse {
  id?: string | null;
  /** Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-d */
  adaptiveRouting?: { failoverAcrossPools?: boolean | null } | null;
  /** A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool ma */
  countryPools?: Record<string, unknown> | null;
  createdOn?: string | null;
  /** A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region. */
  defaultPools?: string[] | null;
  /** Object description. */
  description?: string | null;
  /** Whether to enable (the default) this load balancer. */
  enabled?: boolean | null;
  /** The pool ID to use when all other pools are detected as unhealthy. */
  fallbackPool?: string | null;
  /** Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected. */
  locationStrategy?: {
    mode?: "pop" | "resolver_ip" | null;
    preferEcs?: "always" | "never" | "proximity" | "geo" | null;
  } | null;
  modifiedOn?: string | null;
  /** The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used. */
  name?: string | null;
  /** List of networks where Load Balancer or Pool is enabled. */
  networks?: string[] | null;
  /** Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using th */
  popPools?: Record<string, unknown> | null;
  /** Whether the hostname should be gray clouded (false) or orange clouded (true). */
  proxied?: boolean | null;
  /** Configures pool weights.  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights. - `steering_policy="least_outstanding_requests"`: Use pool weights to s */
  randomSteering?: {
    defaultWeight?: number | null;
    poolWeights?: Record<string, unknown> | null;
  } | null;
  /** A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools. */
  regionPools?: Record<string, unknown> | null;
  /** BETA Field Not General Access: A list of rules for this load balancer to execute. */
  rules?:
    | {
        condition?: string | null;
        disabled?: boolean | null;
        fixedResponse?: {
          contentType?: string | null;
          location?: string | null;
          messageBody?: string | null;
          statusCode?: number | null;
        } | null;
        name?: string | null;
        overrides?: {
          adaptiveRouting?: unknown | null;
          countryPools?: Record<string, unknown> | null;
          defaultPools?: string[] | null;
          fallbackPool?: string | null;
          locationStrategy?: unknown | null;
          popPools?: Record<string, unknown> | null;
          randomSteering?: unknown | null;
          regionPools?: Record<string, unknown> | null;
          sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
          sessionAffinityAttributes?: unknown | null;
          sessionAffinityTtl?: number | null;
          steeringPolicy?:
            | ""
            | "off"
            | "geo"
            | "random"
            | "dynamic_latency"
            | "proximity"
            | "least_outstanding_requests"
            | "least_connections"
            | null;
          ttl?: number | null;
        } | null;
        priority?: number | null;
        terminates?: boolean | null;
      }[]
    | null;
  /** Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is ge */
  sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
  /** Configures attributes for session affinity. */
  sessionAffinityAttributes?: {
    drainDuration?: number | null;
    headers?: string[] | null;
    requireAllHeaders?: boolean | null;
    samesite?: "Auto" | "Lax" | "None" | "Strict" | null;
    secure?: "Auto" | "Always" | "Never" | null;
    zeroDowntimeFailover?: "none" | "temporary" | "sticky" | null;
  } | null;
  /** Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `s */
  sessionAffinityTtl?: number | null;
  /** Steering Policy for this load balancer.  - `"off"`: Use `default_pools`. - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determi */
  steeringPolicy?:
    | ""
    | "off"
    | "geo"
    | "random"
    | "dynamic_latency"
    | "proximity"
    | "least_outstanding_requests"
    | "least_connections"
    | null;
  /** Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers. */
  ttl?: number | null;
  zoneName?: string | null;
}

export const GetLoadBalancerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    adaptiveRouting: Schema.optional(
      Schema.Union([
        Schema.Struct({
          failoverAcrossPools: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({ failoverAcrossPools: "failover_across_pools" }),
        ),
        Schema.Null,
      ]),
    ),
    countryPools: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    defaultPools: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    fallbackPool: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    locationStrategy: Schema.optional(
      Schema.Union([
        Schema.Struct({
          mode: Schema.optional(
            Schema.Union([
              Schema.Literals(["pop", "resolver_ip"]),
              Schema.Null,
            ]),
          ),
          preferEcs: Schema.optional(
            Schema.Union([
              Schema.Literals(["always", "never", "proximity", "geo"]),
              Schema.Null,
            ]),
          ),
        }).pipe(Schema.encodeKeys({ mode: "mode", preferEcs: "prefer_ecs" })),
        Schema.Null,
      ]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    networks: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    popPools: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    proxied: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    randomSteering: Schema.optional(
      Schema.Union([
        Schema.Struct({
          defaultWeight: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          poolWeights: Schema.optional(
            Schema.Union([Schema.Struct({}), Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            defaultWeight: "default_weight",
            poolWeights: "pool_weights",
          }),
        ),
        Schema.Null,
      ]),
    ),
    regionPools: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    rules: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            condition: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            disabled: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            fixedResponse: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  contentType: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  location: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  messageBody: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  statusCode: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    contentType: "content_type",
                    location: "location",
                    messageBody: "message_body",
                    statusCode: "status_code",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            overrides: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  adaptiveRouting: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  countryPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  defaultPools: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  fallbackPool: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  locationStrategy: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  popPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  randomSteering: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  regionPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  sessionAffinity: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "none",
                        "cookie",
                        "ip_cookie",
                        "header",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  sessionAffinityAttributes: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  sessionAffinityTtl: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  steeringPolicy: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "",
                        "off",
                        "geo",
                        "random",
                        "dynamic_latency",
                        "proximity",
                        "least_outstanding_requests",
                        "least_connections",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  ttl: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    adaptiveRouting: "adaptive_routing",
                    countryPools: "country_pools",
                    defaultPools: "default_pools",
                    fallbackPool: "fallback_pool",
                    locationStrategy: "location_strategy",
                    popPools: "pop_pools",
                    randomSteering: "random_steering",
                    regionPools: "region_pools",
                    sessionAffinity: "session_affinity",
                    sessionAffinityAttributes: "session_affinity_attributes",
                    sessionAffinityTtl: "session_affinity_ttl",
                    steeringPolicy: "steering_policy",
                    ttl: "ttl",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            priority: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            terminates: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              condition: "condition",
              disabled: "disabled",
              fixedResponse: "fixed_response",
              name: "name",
              overrides: "overrides",
              priority: "priority",
              terminates: "terminates",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    sessionAffinity: Schema.optional(
      Schema.Union([
        Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
        Schema.Null,
      ]),
    ),
    sessionAffinityAttributes: Schema.optional(
      Schema.Union([
        Schema.Struct({
          drainDuration: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          headers: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          requireAllHeaders: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          samesite: Schema.optional(
            Schema.Union([
              Schema.Literals(["Auto", "Lax", "None", "Strict"]),
              Schema.Null,
            ]),
          ),
          secure: Schema.optional(
            Schema.Union([
              Schema.Literals(["Auto", "Always", "Never"]),
              Schema.Null,
            ]),
          ),
          zeroDowntimeFailover: Schema.optional(
            Schema.Union([
              Schema.Literals(["none", "temporary", "sticky"]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            drainDuration: "drain_duration",
            headers: "headers",
            requireAllHeaders: "require_all_headers",
            samesite: "samesite",
            secure: "secure",
            zeroDowntimeFailover: "zero_downtime_failover",
          }),
        ),
        Schema.Null,
      ]),
    ),
    sessionAffinityTtl: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    steeringPolicy: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "",
          "off",
          "geo",
          "random",
          "dynamic_latency",
          "proximity",
          "least_outstanding_requests",
          "least_connections",
        ]),
        Schema.Null,
      ]),
    ),
    ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        adaptiveRouting: "adaptive_routing",
        countryPools: "country_pools",
        createdOn: "created_on",
        defaultPools: "default_pools",
        description: "description",
        enabled: "enabled",
        fallbackPool: "fallback_pool",
        locationStrategy: "location_strategy",
        modifiedOn: "modified_on",
        name: "name",
        networks: "networks",
        popPools: "pop_pools",
        proxied: "proxied",
        randomSteering: "random_steering",
        regionPools: "region_pools",
        rules: "rules",
        sessionAffinity: "session_affinity",
        sessionAffinityAttributes: "session_affinity_attributes",
        sessionAffinityTtl: "session_affinity_ttl",
        steeringPolicy: "steering_policy",
        ttl: "ttl",
        zoneName: "zone_name",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetLoadBalancerResponse>;

export type GetLoadBalancerError = DefaultErrors;

export const getLoadBalancer: API.OperationMethod<
  GetLoadBalancerRequest,
  GetLoadBalancerResponse,
  GetLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLoadBalancerRequest,
  output: GetLoadBalancerResponse,
  errors: [],
}));

export interface ListLoadBalancersRequest {
  zoneId: string;
}

export const ListLoadBalancersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/load_balancers" }),
  ) as unknown as Schema.Schema<ListLoadBalancersRequest>;

export interface ListLoadBalancersResponse {
  result: {
    id?: string | null;
    adaptiveRouting?: { failoverAcrossPools?: boolean | null } | null;
    countryPools?: Record<string, unknown> | null;
    createdOn?: string | null;
    defaultPools?: string[] | null;
    description?: string | null;
    enabled?: boolean | null;
    fallbackPool?: string | null;
    locationStrategy?: {
      mode?: "pop" | "resolver_ip" | null;
      preferEcs?: "always" | "never" | "proximity" | "geo" | null;
    } | null;
    modifiedOn?: string | null;
    name?: string | null;
    networks?: string[] | null;
    popPools?: Record<string, unknown> | null;
    proxied?: boolean | null;
    randomSteering?: {
      defaultWeight?: number | null;
      poolWeights?: Record<string, unknown> | null;
    } | null;
    regionPools?: Record<string, unknown> | null;
    rules?:
      | {
          condition?: string | null;
          disabled?: boolean | null;
          fixedResponse?: {
            contentType?: string | null;
            location?: string | null;
            messageBody?: string | null;
            statusCode?: number | null;
          } | null;
          name?: string | null;
          overrides?: {
            adaptiveRouting?: unknown | null;
            countryPools?: Record<string, unknown> | null;
            defaultPools?: string[] | null;
            fallbackPool?: string | null;
            locationStrategy?: unknown | null;
            popPools?: Record<string, unknown> | null;
            randomSteering?: unknown | null;
            regionPools?: Record<string, unknown> | null;
            sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
            sessionAffinityAttributes?: unknown | null;
            sessionAffinityTtl?: number | null;
            steeringPolicy?:
              | ""
              | "off"
              | "geo"
              | "random"
              | "dynamic_latency"
              | "proximity"
              | "least_outstanding_requests"
              | "least_connections"
              | null;
            ttl?: number | null;
          } | null;
          priority?: number | null;
          terminates?: boolean | null;
        }[]
      | null;
    sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
    sessionAffinityAttributes?: {
      drainDuration?: number | null;
      headers?: string[] | null;
      requireAllHeaders?: boolean | null;
      samesite?: "Auto" | "Lax" | "None" | "Strict" | null;
      secure?: "Auto" | "Always" | "Never" | null;
      zeroDowntimeFailover?: "none" | "temporary" | "sticky" | null;
    } | null;
    sessionAffinityTtl?: number | null;
    steeringPolicy?:
      | ""
      | "off"
      | "geo"
      | "random"
      | "dynamic_latency"
      | "proximity"
      | "least_outstanding_requests"
      | "least_connections"
      | null;
    ttl?: number | null;
    zoneName?: string | null;
  }[];
}

export const ListLoadBalancersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        adaptiveRouting: Schema.optional(
          Schema.Union([
            Schema.Struct({
              failoverAcrossPools: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                failoverAcrossPools: "failover_across_pools",
              }),
            ),
            Schema.Null,
          ]),
        ),
        countryPools: Schema.optional(
          Schema.Union([Schema.Struct({}), Schema.Null]),
        ),
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        defaultPools: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        fallbackPool: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        locationStrategy: Schema.optional(
          Schema.Union([
            Schema.Struct({
              mode: Schema.optional(
                Schema.Union([
                  Schema.Literals(["pop", "resolver_ip"]),
                  Schema.Null,
                ]),
              ),
              preferEcs: Schema.optional(
                Schema.Union([
                  Schema.Literals(["always", "never", "proximity", "geo"]),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({ mode: "mode", preferEcs: "prefer_ecs" }),
            ),
            Schema.Null,
          ]),
        ),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        networks: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        popPools: Schema.optional(
          Schema.Union([Schema.Struct({}), Schema.Null]),
        ),
        proxied: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        randomSteering: Schema.optional(
          Schema.Union([
            Schema.Struct({
              defaultWeight: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              poolWeights: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                defaultWeight: "default_weight",
                poolWeights: "pool_weights",
              }),
            ),
            Schema.Null,
          ]),
        ),
        regionPools: Schema.optional(
          Schema.Union([Schema.Struct({}), Schema.Null]),
        ),
        rules: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                condition: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                fixedResponse: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      contentType: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      location: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      messageBody: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      statusCode: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        contentType: "content_type",
                        location: "location",
                        messageBody: "message_body",
                        statusCode: "status_code",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
                name: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                overrides: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      adaptiveRouting: Schema.optional(
                        Schema.Union([Schema.Unknown, Schema.Null]),
                      ),
                      countryPools: Schema.optional(
                        Schema.Union([Schema.Struct({}), Schema.Null]),
                      ),
                      defaultPools: Schema.optional(
                        Schema.Union([
                          Schema.Array(Schema.String),
                          Schema.Null,
                        ]),
                      ),
                      fallbackPool: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      locationStrategy: Schema.optional(
                        Schema.Union([Schema.Unknown, Schema.Null]),
                      ),
                      popPools: Schema.optional(
                        Schema.Union([Schema.Struct({}), Schema.Null]),
                      ),
                      randomSteering: Schema.optional(
                        Schema.Union([Schema.Unknown, Schema.Null]),
                      ),
                      regionPools: Schema.optional(
                        Schema.Union([Schema.Struct({}), Schema.Null]),
                      ),
                      sessionAffinity: Schema.optional(
                        Schema.Union([
                          Schema.Literals([
                            "none",
                            "cookie",
                            "ip_cookie",
                            "header",
                          ]),
                          Schema.Null,
                        ]),
                      ),
                      sessionAffinityAttributes: Schema.optional(
                        Schema.Union([Schema.Unknown, Schema.Null]),
                      ),
                      sessionAffinityTtl: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      steeringPolicy: Schema.optional(
                        Schema.Union([
                          Schema.Literals([
                            "",
                            "off",
                            "geo",
                            "random",
                            "dynamic_latency",
                            "proximity",
                            "least_outstanding_requests",
                            "least_connections",
                          ]),
                          Schema.Null,
                        ]),
                      ),
                      ttl: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        adaptiveRouting: "adaptive_routing",
                        countryPools: "country_pools",
                        defaultPools: "default_pools",
                        fallbackPool: "fallback_pool",
                        locationStrategy: "location_strategy",
                        popPools: "pop_pools",
                        randomSteering: "random_steering",
                        regionPools: "region_pools",
                        sessionAffinity: "session_affinity",
                        sessionAffinityAttributes:
                          "session_affinity_attributes",
                        sessionAffinityTtl: "session_affinity_ttl",
                        steeringPolicy: "steering_policy",
                        ttl: "ttl",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
                priority: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                terminates: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  condition: "condition",
                  disabled: "disabled",
                  fixedResponse: "fixed_response",
                  name: "name",
                  overrides: "overrides",
                  priority: "priority",
                  terminates: "terminates",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        sessionAffinity: Schema.optional(
          Schema.Union([
            Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
            Schema.Null,
          ]),
        ),
        sessionAffinityAttributes: Schema.optional(
          Schema.Union([
            Schema.Struct({
              drainDuration: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              headers: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              requireAllHeaders: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              samesite: Schema.optional(
                Schema.Union([
                  Schema.Literals(["Auto", "Lax", "None", "Strict"]),
                  Schema.Null,
                ]),
              ),
              secure: Schema.optional(
                Schema.Union([
                  Schema.Literals(["Auto", "Always", "Never"]),
                  Schema.Null,
                ]),
              ),
              zeroDowntimeFailover: Schema.optional(
                Schema.Union([
                  Schema.Literals(["none", "temporary", "sticky"]),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                drainDuration: "drain_duration",
                headers: "headers",
                requireAllHeaders: "require_all_headers",
                samesite: "samesite",
                secure: "secure",
                zeroDowntimeFailover: "zero_downtime_failover",
              }),
            ),
            Schema.Null,
          ]),
        ),
        sessionAffinityTtl: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        steeringPolicy: Schema.optional(
          Schema.Union([
            Schema.Literals([
              "",
              "off",
              "geo",
              "random",
              "dynamic_latency",
              "proximity",
              "least_outstanding_requests",
              "least_connections",
            ]),
            Schema.Null,
          ]),
        ),
        ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          adaptiveRouting: "adaptive_routing",
          countryPools: "country_pools",
          createdOn: "created_on",
          defaultPools: "default_pools",
          description: "description",
          enabled: "enabled",
          fallbackPool: "fallback_pool",
          locationStrategy: "location_strategy",
          modifiedOn: "modified_on",
          name: "name",
          networks: "networks",
          popPools: "pop_pools",
          proxied: "proxied",
          randomSteering: "random_steering",
          regionPools: "region_pools",
          rules: "rules",
          sessionAffinity: "session_affinity",
          sessionAffinityAttributes: "session_affinity_attributes",
          sessionAffinityTtl: "session_affinity_ttl",
          steeringPolicy: "steering_policy",
          ttl: "ttl",
          zoneName: "zone_name",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<ListLoadBalancersResponse>;

export type ListLoadBalancersError = DefaultErrors;

export const listLoadBalancers: API.PaginatedOperationMethod<
  ListLoadBalancersRequest,
  ListLoadBalancersResponse,
  ListLoadBalancersError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListLoadBalancersRequest,
  ) => stream.Stream<
    ListLoadBalancersResponse,
    ListLoadBalancersError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListLoadBalancersRequest) => stream.Stream<
    {
      id?: string | null;
      adaptiveRouting?: { failoverAcrossPools?: boolean | null } | null;
      countryPools?: Record<string, unknown> | null;
      createdOn?: string | null;
      defaultPools?: string[] | null;
      description?: string | null;
      enabled?: boolean | null;
      fallbackPool?: string | null;
      locationStrategy?: {
        mode?: "pop" | "resolver_ip" | null;
        preferEcs?: "always" | "never" | "proximity" | "geo" | null;
      } | null;
      modifiedOn?: string | null;
      name?: string | null;
      networks?: string[] | null;
      popPools?: Record<string, unknown> | null;
      proxied?: boolean | null;
      randomSteering?: {
        defaultWeight?: number | null;
        poolWeights?: Record<string, unknown> | null;
      } | null;
      regionPools?: Record<string, unknown> | null;
      rules?:
        | {
            condition?: string | null;
            disabled?: boolean | null;
            fixedResponse?: {
              contentType?: string | null;
              location?: string | null;
              messageBody?: string | null;
              statusCode?: number | null;
            } | null;
            name?: string | null;
            overrides?: {
              adaptiveRouting?: unknown | null;
              countryPools?: Record<string, unknown> | null;
              defaultPools?: string[] | null;
              fallbackPool?: string | null;
              locationStrategy?: unknown | null;
              popPools?: Record<string, unknown> | null;
              randomSteering?: unknown | null;
              regionPools?: Record<string, unknown> | null;
              sessionAffinity?:
                | "none"
                | "cookie"
                | "ip_cookie"
                | "header"
                | null;
              sessionAffinityAttributes?: unknown | null;
              sessionAffinityTtl?: number | null;
              steeringPolicy?:
                | ""
                | "off"
                | "geo"
                | "random"
                | "dynamic_latency"
                | "proximity"
                | "least_outstanding_requests"
                | "least_connections"
                | null;
              ttl?: number | null;
            } | null;
            priority?: number | null;
            terminates?: boolean | null;
          }[]
        | null;
      sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
      sessionAffinityAttributes?: {
        drainDuration?: number | null;
        headers?: string[] | null;
        requireAllHeaders?: boolean | null;
        samesite?: "Auto" | "Lax" | "None" | "Strict" | null;
        secure?: "Auto" | "Always" | "Never" | null;
        zeroDowntimeFailover?: "none" | "temporary" | "sticky" | null;
      } | null;
      sessionAffinityTtl?: number | null;
      steeringPolicy?:
        | ""
        | "off"
        | "geo"
        | "random"
        | "dynamic_latency"
        | "proximity"
        | "least_outstanding_requests"
        | "least_connections"
        | null;
      ttl?: number | null;
      zoneName?: string | null;
    },
    ListLoadBalancersError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLoadBalancersRequest,
  output: ListLoadBalancersResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateLoadBalancerRequest {
  /** Path param: */
  zoneId: string;
  /** Body param: A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region. */
  defaultPools: string[];
  /** Body param: The pool ID to use when all other pools are detected as unhealthy. */
  fallbackPool: string;
  /** Body param: The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will n */
  name: string;
  /** Body param: Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For exa */
  adaptiveRouting?: { failoverAcrossPools?: boolean };
  /** Body param: A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding re */
  countryPools?: Record<string, unknown>;
  /** Body param: Object description. */
  description?: string;
  /** Body param: Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected. */
  locationStrategy?: {
    mode?: "pop" | "resolver_ip";
    preferEcs?: "always" | "never" | "proximity" | "geo";
  };
  /** Body param: List of networks where Load Balancer or Pool is enabled. */
  networks?: string[];
  /** Body param: Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back */
  popPools?: Record<string, unknown>;
  /** Body param: Whether the hostname should be gray clouded (false) or orange clouded (true). */
  proxied?: boolean;
  /** Body param: Configures pool weights.  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights. - `steering_policy="least_outstanding_requests"`: Use pool  */
  randomSteering?: {
    defaultWeight?: number;
    poolWeights?: Record<string, unknown>;
  };
  /** Body param: A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools. */
  regionPools?: Record<string, unknown>;
  /** Body param: BETA Field Not General Access: A list of rules for this load balancer to execute. */
  rules?: {
    condition?: string;
    disabled?: boolean;
    fixedResponse?: {
      contentType?: string;
      location?: string;
      messageBody?: string;
      statusCode?: number;
    };
    name?: string;
    overrides?: {
      adaptiveRouting?: unknown;
      countryPools?: Record<string, unknown>;
      defaultPools?: string[];
      fallbackPool?: string;
      locationStrategy?: unknown;
      popPools?: Record<string, unknown>;
      randomSteering?: unknown;
      regionPools?: Record<string, unknown>;
      sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header";
      sessionAffinityAttributes?: unknown;
      sessionAffinityTtl?: number;
      steeringPolicy?:
        | ""
        | "off"
        | "geo"
        | "random"
        | "dynamic_latency"
        | "proximity"
        | "least_outstanding_requests"
        | "least_connections";
      ttl?: number;
    };
    priority?: number;
    terminates?: boolean;
  }[];
  /** Body param: Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a  */
  sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header";
  /** Body param: Configures attributes for session affinity. */
  sessionAffinityAttributes?: {
    drainDuration?: number;
    headers?: string[];
    requireAllHeaders?: boolean;
    samesite?: "Auto" | "Lax" | "None" | "Strict";
    secure?: "Auto" | "Always" | "Never";
    zeroDowntimeFailover?: "none" | "temporary" | "sticky";
  };
  /** Body param: Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted r */
  sessionAffinityTtl?: number;
  /** Body param: Steering Policy for this load balancer.  - `"off"`: Use `default_pools`. - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools */
  steeringPolicy?:
    | ""
    | "off"
    | "geo"
    | "random"
    | "dynamic_latency"
    | "proximity"
    | "least_outstanding_requests"
    | "least_connections";
  /** Body param: Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers. */
  ttl?: number;
}

export const CreateLoadBalancerRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    defaultPools: Schema.Array(Schema.String),
    fallbackPool: Schema.String,
    name: Schema.String,
    adaptiveRouting: Schema.optional(
      Schema.Struct({
        failoverAcrossPools: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({ failoverAcrossPools: "failover_across_pools" }),
      ),
    ),
    countryPools: Schema.optional(Schema.Struct({})),
    description: Schema.optional(Schema.String),
    locationStrategy: Schema.optional(
      Schema.Struct({
        mode: Schema.optional(Schema.Literals(["pop", "resolver_ip"])),
        preferEcs: Schema.optional(
          Schema.Literals(["always", "never", "proximity", "geo"]),
        ),
      }).pipe(Schema.encodeKeys({ mode: "mode", preferEcs: "prefer_ecs" })),
    ),
    networks: Schema.optional(Schema.Array(Schema.String)),
    popPools: Schema.optional(Schema.Struct({})),
    proxied: Schema.optional(Schema.Boolean),
    randomSteering: Schema.optional(
      Schema.Struct({
        defaultWeight: Schema.optional(Schema.Number),
        poolWeights: Schema.optional(Schema.Struct({})),
      }).pipe(
        Schema.encodeKeys({
          defaultWeight: "default_weight",
          poolWeights: "pool_weights",
        }),
      ),
    ),
    regionPools: Schema.optional(Schema.Struct({})),
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          condition: Schema.optional(Schema.String),
          disabled: Schema.optional(Schema.Boolean),
          fixedResponse: Schema.optional(
            Schema.Struct({
              contentType: Schema.optional(Schema.String),
              location: Schema.optional(Schema.String),
              messageBody: Schema.optional(Schema.String),
              statusCode: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                contentType: "content_type",
                location: "location",
                messageBody: "message_body",
                statusCode: "status_code",
              }),
            ),
          ),
          name: Schema.optional(Schema.String),
          overrides: Schema.optional(
            Schema.Struct({
              adaptiveRouting: Schema.optional(Schema.Unknown),
              countryPools: Schema.optional(Schema.Struct({})),
              defaultPools: Schema.optional(Schema.Array(Schema.String)),
              fallbackPool: Schema.optional(Schema.String),
              locationStrategy: Schema.optional(Schema.Unknown),
              popPools: Schema.optional(Schema.Struct({})),
              randomSteering: Schema.optional(Schema.Unknown),
              regionPools: Schema.optional(Schema.Struct({})),
              sessionAffinity: Schema.optional(
                Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
              ),
              sessionAffinityAttributes: Schema.optional(Schema.Unknown),
              sessionAffinityTtl: Schema.optional(Schema.Number),
              steeringPolicy: Schema.optional(
                Schema.Literals([
                  "",
                  "off",
                  "geo",
                  "random",
                  "dynamic_latency",
                  "proximity",
                  "least_outstanding_requests",
                  "least_connections",
                ]),
              ),
              ttl: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                adaptiveRouting: "adaptive_routing",
                countryPools: "country_pools",
                defaultPools: "default_pools",
                fallbackPool: "fallback_pool",
                locationStrategy: "location_strategy",
                popPools: "pop_pools",
                randomSteering: "random_steering",
                regionPools: "region_pools",
                sessionAffinity: "session_affinity",
                sessionAffinityAttributes: "session_affinity_attributes",
                sessionAffinityTtl: "session_affinity_ttl",
                steeringPolicy: "steering_policy",
                ttl: "ttl",
              }),
            ),
          ),
          priority: Schema.optional(Schema.Number),
          terminates: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            condition: "condition",
            disabled: "disabled",
            fixedResponse: "fixed_response",
            name: "name",
            overrides: "overrides",
            priority: "priority",
            terminates: "terminates",
          }),
        ),
      ),
    ),
    sessionAffinity: Schema.optional(
      Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
    ),
    sessionAffinityAttributes: Schema.optional(
      Schema.Struct({
        drainDuration: Schema.optional(Schema.Number),
        headers: Schema.optional(Schema.Array(Schema.String)),
        requireAllHeaders: Schema.optional(Schema.Boolean),
        samesite: Schema.optional(
          Schema.Literals(["Auto", "Lax", "None", "Strict"]),
        ),
        secure: Schema.optional(Schema.Literals(["Auto", "Always", "Never"])),
        zeroDowntimeFailover: Schema.optional(
          Schema.Literals(["none", "temporary", "sticky"]),
        ),
      }).pipe(
        Schema.encodeKeys({
          drainDuration: "drain_duration",
          headers: "headers",
          requireAllHeaders: "require_all_headers",
          samesite: "samesite",
          secure: "secure",
          zeroDowntimeFailover: "zero_downtime_failover",
        }),
      ),
    ),
    sessionAffinityTtl: Schema.optional(Schema.Number),
    steeringPolicy: Schema.optional(
      Schema.Literals([
        "",
        "off",
        "geo",
        "random",
        "dynamic_latency",
        "proximity",
        "least_outstanding_requests",
        "least_connections",
      ]),
    ),
    ttl: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      defaultPools: "default_pools",
      fallbackPool: "fallback_pool",
      name: "name",
      adaptiveRouting: "adaptive_routing",
      countryPools: "country_pools",
      description: "description",
      locationStrategy: "location_strategy",
      networks: "networks",
      popPools: "pop_pools",
      proxied: "proxied",
      randomSteering: "random_steering",
      regionPools: "region_pools",
      rules: "rules",
      sessionAffinity: "session_affinity",
      sessionAffinityAttributes: "session_affinity_attributes",
      sessionAffinityTtl: "session_affinity_ttl",
      steeringPolicy: "steering_policy",
      ttl: "ttl",
    }),
    T.Http({ method: "POST", path: "/zones/{zone_id}/load_balancers" }),
  ) as unknown as Schema.Schema<CreateLoadBalancerRequest>;

export interface CreateLoadBalancerResponse {
  id?: string | null;
  /** Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-d */
  adaptiveRouting?: { failoverAcrossPools?: boolean | null } | null;
  /** A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool ma */
  countryPools?: Record<string, unknown> | null;
  createdOn?: string | null;
  /** A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region. */
  defaultPools?: string[] | null;
  /** Object description. */
  description?: string | null;
  /** Whether to enable (the default) this load balancer. */
  enabled?: boolean | null;
  /** The pool ID to use when all other pools are detected as unhealthy. */
  fallbackPool?: string | null;
  /** Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected. */
  locationStrategy?: {
    mode?: "pop" | "resolver_ip" | null;
    preferEcs?: "always" | "never" | "proximity" | "geo" | null;
  } | null;
  modifiedOn?: string | null;
  /** The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used. */
  name?: string | null;
  /** List of networks where Load Balancer or Pool is enabled. */
  networks?: string[] | null;
  /** Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using th */
  popPools?: Record<string, unknown> | null;
  /** Whether the hostname should be gray clouded (false) or orange clouded (true). */
  proxied?: boolean | null;
  /** Configures pool weights.  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights. - `steering_policy="least_outstanding_requests"`: Use pool weights to s */
  randomSteering?: {
    defaultWeight?: number | null;
    poolWeights?: Record<string, unknown> | null;
  } | null;
  /** A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools. */
  regionPools?: Record<string, unknown> | null;
  /** BETA Field Not General Access: A list of rules for this load balancer to execute. */
  rules?:
    | {
        condition?: string | null;
        disabled?: boolean | null;
        fixedResponse?: {
          contentType?: string | null;
          location?: string | null;
          messageBody?: string | null;
          statusCode?: number | null;
        } | null;
        name?: string | null;
        overrides?: {
          adaptiveRouting?: unknown | null;
          countryPools?: Record<string, unknown> | null;
          defaultPools?: string[] | null;
          fallbackPool?: string | null;
          locationStrategy?: unknown | null;
          popPools?: Record<string, unknown> | null;
          randomSteering?: unknown | null;
          regionPools?: Record<string, unknown> | null;
          sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
          sessionAffinityAttributes?: unknown | null;
          sessionAffinityTtl?: number | null;
          steeringPolicy?:
            | ""
            | "off"
            | "geo"
            | "random"
            | "dynamic_latency"
            | "proximity"
            | "least_outstanding_requests"
            | "least_connections"
            | null;
          ttl?: number | null;
        } | null;
        priority?: number | null;
        terminates?: boolean | null;
      }[]
    | null;
  /** Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is ge */
  sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
  /** Configures attributes for session affinity. */
  sessionAffinityAttributes?: {
    drainDuration?: number | null;
    headers?: string[] | null;
    requireAllHeaders?: boolean | null;
    samesite?: "Auto" | "Lax" | "None" | "Strict" | null;
    secure?: "Auto" | "Always" | "Never" | null;
    zeroDowntimeFailover?: "none" | "temporary" | "sticky" | null;
  } | null;
  /** Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `s */
  sessionAffinityTtl?: number | null;
  /** Steering Policy for this load balancer.  - `"off"`: Use `default_pools`. - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determi */
  steeringPolicy?:
    | ""
    | "off"
    | "geo"
    | "random"
    | "dynamic_latency"
    | "proximity"
    | "least_outstanding_requests"
    | "least_connections"
    | null;
  /** Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers. */
  ttl?: number | null;
  zoneName?: string | null;
}

export const CreateLoadBalancerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    adaptiveRouting: Schema.optional(
      Schema.Union([
        Schema.Struct({
          failoverAcrossPools: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({ failoverAcrossPools: "failover_across_pools" }),
        ),
        Schema.Null,
      ]),
    ),
    countryPools: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    defaultPools: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    fallbackPool: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    locationStrategy: Schema.optional(
      Schema.Union([
        Schema.Struct({
          mode: Schema.optional(
            Schema.Union([
              Schema.Literals(["pop", "resolver_ip"]),
              Schema.Null,
            ]),
          ),
          preferEcs: Schema.optional(
            Schema.Union([
              Schema.Literals(["always", "never", "proximity", "geo"]),
              Schema.Null,
            ]),
          ),
        }).pipe(Schema.encodeKeys({ mode: "mode", preferEcs: "prefer_ecs" })),
        Schema.Null,
      ]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    networks: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    popPools: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    proxied: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    randomSteering: Schema.optional(
      Schema.Union([
        Schema.Struct({
          defaultWeight: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          poolWeights: Schema.optional(
            Schema.Union([Schema.Struct({}), Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            defaultWeight: "default_weight",
            poolWeights: "pool_weights",
          }),
        ),
        Schema.Null,
      ]),
    ),
    regionPools: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    rules: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            condition: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            disabled: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            fixedResponse: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  contentType: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  location: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  messageBody: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  statusCode: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    contentType: "content_type",
                    location: "location",
                    messageBody: "message_body",
                    statusCode: "status_code",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            overrides: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  adaptiveRouting: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  countryPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  defaultPools: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  fallbackPool: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  locationStrategy: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  popPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  randomSteering: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  regionPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  sessionAffinity: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "none",
                        "cookie",
                        "ip_cookie",
                        "header",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  sessionAffinityAttributes: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  sessionAffinityTtl: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  steeringPolicy: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "",
                        "off",
                        "geo",
                        "random",
                        "dynamic_latency",
                        "proximity",
                        "least_outstanding_requests",
                        "least_connections",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  ttl: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    adaptiveRouting: "adaptive_routing",
                    countryPools: "country_pools",
                    defaultPools: "default_pools",
                    fallbackPool: "fallback_pool",
                    locationStrategy: "location_strategy",
                    popPools: "pop_pools",
                    randomSteering: "random_steering",
                    regionPools: "region_pools",
                    sessionAffinity: "session_affinity",
                    sessionAffinityAttributes: "session_affinity_attributes",
                    sessionAffinityTtl: "session_affinity_ttl",
                    steeringPolicy: "steering_policy",
                    ttl: "ttl",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            priority: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            terminates: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              condition: "condition",
              disabled: "disabled",
              fixedResponse: "fixed_response",
              name: "name",
              overrides: "overrides",
              priority: "priority",
              terminates: "terminates",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    sessionAffinity: Schema.optional(
      Schema.Union([
        Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
        Schema.Null,
      ]),
    ),
    sessionAffinityAttributes: Schema.optional(
      Schema.Union([
        Schema.Struct({
          drainDuration: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          headers: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          requireAllHeaders: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          samesite: Schema.optional(
            Schema.Union([
              Schema.Literals(["Auto", "Lax", "None", "Strict"]),
              Schema.Null,
            ]),
          ),
          secure: Schema.optional(
            Schema.Union([
              Schema.Literals(["Auto", "Always", "Never"]),
              Schema.Null,
            ]),
          ),
          zeroDowntimeFailover: Schema.optional(
            Schema.Union([
              Schema.Literals(["none", "temporary", "sticky"]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            drainDuration: "drain_duration",
            headers: "headers",
            requireAllHeaders: "require_all_headers",
            samesite: "samesite",
            secure: "secure",
            zeroDowntimeFailover: "zero_downtime_failover",
          }),
        ),
        Schema.Null,
      ]),
    ),
    sessionAffinityTtl: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    steeringPolicy: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "",
          "off",
          "geo",
          "random",
          "dynamic_latency",
          "proximity",
          "least_outstanding_requests",
          "least_connections",
        ]),
        Schema.Null,
      ]),
    ),
    ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        adaptiveRouting: "adaptive_routing",
        countryPools: "country_pools",
        createdOn: "created_on",
        defaultPools: "default_pools",
        description: "description",
        enabled: "enabled",
        fallbackPool: "fallback_pool",
        locationStrategy: "location_strategy",
        modifiedOn: "modified_on",
        name: "name",
        networks: "networks",
        popPools: "pop_pools",
        proxied: "proxied",
        randomSteering: "random_steering",
        regionPools: "region_pools",
        rules: "rules",
        sessionAffinity: "session_affinity",
        sessionAffinityAttributes: "session_affinity_attributes",
        sessionAffinityTtl: "session_affinity_ttl",
        steeringPolicy: "steering_policy",
        ttl: "ttl",
        zoneName: "zone_name",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateLoadBalancerResponse>;

export type CreateLoadBalancerError = DefaultErrors;

export const createLoadBalancer: API.OperationMethod<
  CreateLoadBalancerRequest,
  CreateLoadBalancerResponse,
  CreateLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLoadBalancerRequest,
  output: CreateLoadBalancerResponse,
  errors: [],
}));

export interface UpdateLoadBalancerRequest {
  loadBalancerId: string;
  /** Path param: */
  zoneId: string;
  /** Body param: A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region. */
  defaultPools: string[];
  /** Body param: The pool ID to use when all other pools are detected as unhealthy. */
  fallbackPool: string;
  /** Body param: The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will n */
  name: string;
  /** Body param: Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For exa */
  adaptiveRouting?: { failoverAcrossPools?: boolean };
  /** Body param: A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding re */
  countryPools?: Record<string, unknown>;
  /** Body param: Object description. */
  description?: string;
  /** Body param: Whether to enable (the default) this load balancer. */
  enabled?: boolean;
  /** Body param: Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected. */
  locationStrategy?: {
    mode?: "pop" | "resolver_ip";
    preferEcs?: "always" | "never" | "proximity" | "geo";
  };
  /** Body param: List of networks where Load Balancer or Pool is enabled. */
  networks?: string[];
  /** Body param: Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back */
  popPools?: Record<string, unknown>;
  /** Body param: Whether the hostname should be gray clouded (false) or orange clouded (true). */
  proxied?: boolean;
  /** Body param: Configures pool weights.  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights. - `steering_policy="least_outstanding_requests"`: Use pool  */
  randomSteering?: {
    defaultWeight?: number;
    poolWeights?: Record<string, unknown>;
  };
  /** Body param: A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools. */
  regionPools?: Record<string, unknown>;
  /** Body param: BETA Field Not General Access: A list of rules for this load balancer to execute. */
  rules?: {
    condition?: string;
    disabled?: boolean;
    fixedResponse?: {
      contentType?: string;
      location?: string;
      messageBody?: string;
      statusCode?: number;
    };
    name?: string;
    overrides?: {
      adaptiveRouting?: unknown;
      countryPools?: Record<string, unknown>;
      defaultPools?: string[];
      fallbackPool?: string;
      locationStrategy?: unknown;
      popPools?: Record<string, unknown>;
      randomSteering?: unknown;
      regionPools?: Record<string, unknown>;
      sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header";
      sessionAffinityAttributes?: unknown;
      sessionAffinityTtl?: number;
      steeringPolicy?:
        | ""
        | "off"
        | "geo"
        | "random"
        | "dynamic_latency"
        | "proximity"
        | "least_outstanding_requests"
        | "least_connections";
      ttl?: number;
    };
    priority?: number;
    terminates?: boolean;
  }[];
  /** Body param: Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a  */
  sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header";
  /** Body param: Configures attributes for session affinity. */
  sessionAffinityAttributes?: {
    drainDuration?: number;
    headers?: string[];
    requireAllHeaders?: boolean;
    samesite?: "Auto" | "Lax" | "None" | "Strict";
    secure?: "Auto" | "Always" | "Never";
    zeroDowntimeFailover?: "none" | "temporary" | "sticky";
  };
  /** Body param: Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted r */
  sessionAffinityTtl?: number;
  /** Body param: Steering Policy for this load balancer.  - `"off"`: Use `default_pools`. - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools */
  steeringPolicy?:
    | ""
    | "off"
    | "geo"
    | "random"
    | "dynamic_latency"
    | "proximity"
    | "least_outstanding_requests"
    | "least_connections";
  /** Body param: Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers. */
  ttl?: number;
}

export const UpdateLoadBalancerRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    loadBalancerId: Schema.String.pipe(T.HttpPath("loadBalancerId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    defaultPools: Schema.Array(Schema.String),
    fallbackPool: Schema.String,
    name: Schema.String,
    adaptiveRouting: Schema.optional(
      Schema.Struct({
        failoverAcrossPools: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({ failoverAcrossPools: "failover_across_pools" }),
      ),
    ),
    countryPools: Schema.optional(Schema.Struct({})),
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    locationStrategy: Schema.optional(
      Schema.Struct({
        mode: Schema.optional(Schema.Literals(["pop", "resolver_ip"])),
        preferEcs: Schema.optional(
          Schema.Literals(["always", "never", "proximity", "geo"]),
        ),
      }).pipe(Schema.encodeKeys({ mode: "mode", preferEcs: "prefer_ecs" })),
    ),
    networks: Schema.optional(Schema.Array(Schema.String)),
    popPools: Schema.optional(Schema.Struct({})),
    proxied: Schema.optional(Schema.Boolean),
    randomSteering: Schema.optional(
      Schema.Struct({
        defaultWeight: Schema.optional(Schema.Number),
        poolWeights: Schema.optional(Schema.Struct({})),
      }).pipe(
        Schema.encodeKeys({
          defaultWeight: "default_weight",
          poolWeights: "pool_weights",
        }),
      ),
    ),
    regionPools: Schema.optional(Schema.Struct({})),
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          condition: Schema.optional(Schema.String),
          disabled: Schema.optional(Schema.Boolean),
          fixedResponse: Schema.optional(
            Schema.Struct({
              contentType: Schema.optional(Schema.String),
              location: Schema.optional(Schema.String),
              messageBody: Schema.optional(Schema.String),
              statusCode: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                contentType: "content_type",
                location: "location",
                messageBody: "message_body",
                statusCode: "status_code",
              }),
            ),
          ),
          name: Schema.optional(Schema.String),
          overrides: Schema.optional(
            Schema.Struct({
              adaptiveRouting: Schema.optional(Schema.Unknown),
              countryPools: Schema.optional(Schema.Struct({})),
              defaultPools: Schema.optional(Schema.Array(Schema.String)),
              fallbackPool: Schema.optional(Schema.String),
              locationStrategy: Schema.optional(Schema.Unknown),
              popPools: Schema.optional(Schema.Struct({})),
              randomSteering: Schema.optional(Schema.Unknown),
              regionPools: Schema.optional(Schema.Struct({})),
              sessionAffinity: Schema.optional(
                Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
              ),
              sessionAffinityAttributes: Schema.optional(Schema.Unknown),
              sessionAffinityTtl: Schema.optional(Schema.Number),
              steeringPolicy: Schema.optional(
                Schema.Literals([
                  "",
                  "off",
                  "geo",
                  "random",
                  "dynamic_latency",
                  "proximity",
                  "least_outstanding_requests",
                  "least_connections",
                ]),
              ),
              ttl: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                adaptiveRouting: "adaptive_routing",
                countryPools: "country_pools",
                defaultPools: "default_pools",
                fallbackPool: "fallback_pool",
                locationStrategy: "location_strategy",
                popPools: "pop_pools",
                randomSteering: "random_steering",
                regionPools: "region_pools",
                sessionAffinity: "session_affinity",
                sessionAffinityAttributes: "session_affinity_attributes",
                sessionAffinityTtl: "session_affinity_ttl",
                steeringPolicy: "steering_policy",
                ttl: "ttl",
              }),
            ),
          ),
          priority: Schema.optional(Schema.Number),
          terminates: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            condition: "condition",
            disabled: "disabled",
            fixedResponse: "fixed_response",
            name: "name",
            overrides: "overrides",
            priority: "priority",
            terminates: "terminates",
          }),
        ),
      ),
    ),
    sessionAffinity: Schema.optional(
      Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
    ),
    sessionAffinityAttributes: Schema.optional(
      Schema.Struct({
        drainDuration: Schema.optional(Schema.Number),
        headers: Schema.optional(Schema.Array(Schema.String)),
        requireAllHeaders: Schema.optional(Schema.Boolean),
        samesite: Schema.optional(
          Schema.Literals(["Auto", "Lax", "None", "Strict"]),
        ),
        secure: Schema.optional(Schema.Literals(["Auto", "Always", "Never"])),
        zeroDowntimeFailover: Schema.optional(
          Schema.Literals(["none", "temporary", "sticky"]),
        ),
      }).pipe(
        Schema.encodeKeys({
          drainDuration: "drain_duration",
          headers: "headers",
          requireAllHeaders: "require_all_headers",
          samesite: "samesite",
          secure: "secure",
          zeroDowntimeFailover: "zero_downtime_failover",
        }),
      ),
    ),
    sessionAffinityTtl: Schema.optional(Schema.Number),
    steeringPolicy: Schema.optional(
      Schema.Literals([
        "",
        "off",
        "geo",
        "random",
        "dynamic_latency",
        "proximity",
        "least_outstanding_requests",
        "least_connections",
      ]),
    ),
    ttl: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      defaultPools: "default_pools",
      fallbackPool: "fallback_pool",
      name: "name",
      adaptiveRouting: "adaptive_routing",
      countryPools: "country_pools",
      description: "description",
      enabled: "enabled",
      locationStrategy: "location_strategy",
      networks: "networks",
      popPools: "pop_pools",
      proxied: "proxied",
      randomSteering: "random_steering",
      regionPools: "region_pools",
      rules: "rules",
      sessionAffinity: "session_affinity",
      sessionAffinityAttributes: "session_affinity_attributes",
      sessionAffinityTtl: "session_affinity_ttl",
      steeringPolicy: "steering_policy",
      ttl: "ttl",
    }),
    T.Http({
      method: "PUT",
      path: "/zones/{zone_id}/load_balancers/{loadBalancerId}",
    }),
  ) as unknown as Schema.Schema<UpdateLoadBalancerRequest>;

export interface UpdateLoadBalancerResponse {
  id?: string | null;
  /** Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-d */
  adaptiveRouting?: { failoverAcrossPools?: boolean | null } | null;
  /** A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool ma */
  countryPools?: Record<string, unknown> | null;
  createdOn?: string | null;
  /** A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region. */
  defaultPools?: string[] | null;
  /** Object description. */
  description?: string | null;
  /** Whether to enable (the default) this load balancer. */
  enabled?: boolean | null;
  /** The pool ID to use when all other pools are detected as unhealthy. */
  fallbackPool?: string | null;
  /** Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected. */
  locationStrategy?: {
    mode?: "pop" | "resolver_ip" | null;
    preferEcs?: "always" | "never" | "proximity" | "geo" | null;
  } | null;
  modifiedOn?: string | null;
  /** The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used. */
  name?: string | null;
  /** List of networks where Load Balancer or Pool is enabled. */
  networks?: string[] | null;
  /** Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using th */
  popPools?: Record<string, unknown> | null;
  /** Whether the hostname should be gray clouded (false) or orange clouded (true). */
  proxied?: boolean | null;
  /** Configures pool weights.  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights. - `steering_policy="least_outstanding_requests"`: Use pool weights to s */
  randomSteering?: {
    defaultWeight?: number | null;
    poolWeights?: Record<string, unknown> | null;
  } | null;
  /** A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools. */
  regionPools?: Record<string, unknown> | null;
  /** BETA Field Not General Access: A list of rules for this load balancer to execute. */
  rules?:
    | {
        condition?: string | null;
        disabled?: boolean | null;
        fixedResponse?: {
          contentType?: string | null;
          location?: string | null;
          messageBody?: string | null;
          statusCode?: number | null;
        } | null;
        name?: string | null;
        overrides?: {
          adaptiveRouting?: unknown | null;
          countryPools?: Record<string, unknown> | null;
          defaultPools?: string[] | null;
          fallbackPool?: string | null;
          locationStrategy?: unknown | null;
          popPools?: Record<string, unknown> | null;
          randomSteering?: unknown | null;
          regionPools?: Record<string, unknown> | null;
          sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
          sessionAffinityAttributes?: unknown | null;
          sessionAffinityTtl?: number | null;
          steeringPolicy?:
            | ""
            | "off"
            | "geo"
            | "random"
            | "dynamic_latency"
            | "proximity"
            | "least_outstanding_requests"
            | "least_connections"
            | null;
          ttl?: number | null;
        } | null;
        priority?: number | null;
        terminates?: boolean | null;
      }[]
    | null;
  /** Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is ge */
  sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
  /** Configures attributes for session affinity. */
  sessionAffinityAttributes?: {
    drainDuration?: number | null;
    headers?: string[] | null;
    requireAllHeaders?: boolean | null;
    samesite?: "Auto" | "Lax" | "None" | "Strict" | null;
    secure?: "Auto" | "Always" | "Never" | null;
    zeroDowntimeFailover?: "none" | "temporary" | "sticky" | null;
  } | null;
  /** Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `s */
  sessionAffinityTtl?: number | null;
  /** Steering Policy for this load balancer.  - `"off"`: Use `default_pools`. - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determi */
  steeringPolicy?:
    | ""
    | "off"
    | "geo"
    | "random"
    | "dynamic_latency"
    | "proximity"
    | "least_outstanding_requests"
    | "least_connections"
    | null;
  /** Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers. */
  ttl?: number | null;
  zoneName?: string | null;
}

export const UpdateLoadBalancerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    adaptiveRouting: Schema.optional(
      Schema.Union([
        Schema.Struct({
          failoverAcrossPools: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({ failoverAcrossPools: "failover_across_pools" }),
        ),
        Schema.Null,
      ]),
    ),
    countryPools: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    defaultPools: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    fallbackPool: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    locationStrategy: Schema.optional(
      Schema.Union([
        Schema.Struct({
          mode: Schema.optional(
            Schema.Union([
              Schema.Literals(["pop", "resolver_ip"]),
              Schema.Null,
            ]),
          ),
          preferEcs: Schema.optional(
            Schema.Union([
              Schema.Literals(["always", "never", "proximity", "geo"]),
              Schema.Null,
            ]),
          ),
        }).pipe(Schema.encodeKeys({ mode: "mode", preferEcs: "prefer_ecs" })),
        Schema.Null,
      ]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    networks: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    popPools: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    proxied: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    randomSteering: Schema.optional(
      Schema.Union([
        Schema.Struct({
          defaultWeight: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          poolWeights: Schema.optional(
            Schema.Union([Schema.Struct({}), Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            defaultWeight: "default_weight",
            poolWeights: "pool_weights",
          }),
        ),
        Schema.Null,
      ]),
    ),
    regionPools: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    rules: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            condition: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            disabled: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            fixedResponse: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  contentType: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  location: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  messageBody: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  statusCode: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    contentType: "content_type",
                    location: "location",
                    messageBody: "message_body",
                    statusCode: "status_code",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            overrides: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  adaptiveRouting: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  countryPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  defaultPools: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  fallbackPool: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  locationStrategy: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  popPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  randomSteering: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  regionPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  sessionAffinity: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "none",
                        "cookie",
                        "ip_cookie",
                        "header",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  sessionAffinityAttributes: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  sessionAffinityTtl: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  steeringPolicy: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "",
                        "off",
                        "geo",
                        "random",
                        "dynamic_latency",
                        "proximity",
                        "least_outstanding_requests",
                        "least_connections",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  ttl: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    adaptiveRouting: "adaptive_routing",
                    countryPools: "country_pools",
                    defaultPools: "default_pools",
                    fallbackPool: "fallback_pool",
                    locationStrategy: "location_strategy",
                    popPools: "pop_pools",
                    randomSteering: "random_steering",
                    regionPools: "region_pools",
                    sessionAffinity: "session_affinity",
                    sessionAffinityAttributes: "session_affinity_attributes",
                    sessionAffinityTtl: "session_affinity_ttl",
                    steeringPolicy: "steering_policy",
                    ttl: "ttl",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            priority: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            terminates: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              condition: "condition",
              disabled: "disabled",
              fixedResponse: "fixed_response",
              name: "name",
              overrides: "overrides",
              priority: "priority",
              terminates: "terminates",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    sessionAffinity: Schema.optional(
      Schema.Union([
        Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
        Schema.Null,
      ]),
    ),
    sessionAffinityAttributes: Schema.optional(
      Schema.Union([
        Schema.Struct({
          drainDuration: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          headers: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          requireAllHeaders: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          samesite: Schema.optional(
            Schema.Union([
              Schema.Literals(["Auto", "Lax", "None", "Strict"]),
              Schema.Null,
            ]),
          ),
          secure: Schema.optional(
            Schema.Union([
              Schema.Literals(["Auto", "Always", "Never"]),
              Schema.Null,
            ]),
          ),
          zeroDowntimeFailover: Schema.optional(
            Schema.Union([
              Schema.Literals(["none", "temporary", "sticky"]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            drainDuration: "drain_duration",
            headers: "headers",
            requireAllHeaders: "require_all_headers",
            samesite: "samesite",
            secure: "secure",
            zeroDowntimeFailover: "zero_downtime_failover",
          }),
        ),
        Schema.Null,
      ]),
    ),
    sessionAffinityTtl: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    steeringPolicy: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "",
          "off",
          "geo",
          "random",
          "dynamic_latency",
          "proximity",
          "least_outstanding_requests",
          "least_connections",
        ]),
        Schema.Null,
      ]),
    ),
    ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        adaptiveRouting: "adaptive_routing",
        countryPools: "country_pools",
        createdOn: "created_on",
        defaultPools: "default_pools",
        description: "description",
        enabled: "enabled",
        fallbackPool: "fallback_pool",
        locationStrategy: "location_strategy",
        modifiedOn: "modified_on",
        name: "name",
        networks: "networks",
        popPools: "pop_pools",
        proxied: "proxied",
        randomSteering: "random_steering",
        regionPools: "region_pools",
        rules: "rules",
        sessionAffinity: "session_affinity",
        sessionAffinityAttributes: "session_affinity_attributes",
        sessionAffinityTtl: "session_affinity_ttl",
        steeringPolicy: "steering_policy",
        ttl: "ttl",
        zoneName: "zone_name",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateLoadBalancerResponse>;

export type UpdateLoadBalancerError = DefaultErrors;

export const updateLoadBalancer: API.OperationMethod<
  UpdateLoadBalancerRequest,
  UpdateLoadBalancerResponse,
  UpdateLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLoadBalancerRequest,
  output: UpdateLoadBalancerResponse,
  errors: [],
}));

export interface PatchLoadBalancerRequest {
  loadBalancerId: string;
  /** Path param: */
  zoneId: string;
  /** Body param: Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For exa */
  adaptiveRouting?: { failoverAcrossPools?: boolean };
  /** Body param: A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding re */
  countryPools?: Record<string, unknown>;
  /** Body param: A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region. */
  defaultPools?: string[];
  /** Body param: Object description. */
  description?: string;
  /** Body param: Whether to enable (the default) this load balancer. */
  enabled?: boolean;
  /** Body param: The pool ID to use when all other pools are detected as unhealthy. */
  fallbackPool?: string;
  /** Body param: Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected. */
  locationStrategy?: {
    mode?: "pop" | "resolver_ip";
    preferEcs?: "always" | "never" | "proximity" | "geo";
  };
  /** Body param: The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will n */
  name?: string;
  /** Body param: Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back */
  popPools?: Record<string, unknown>;
  /** Body param: Whether the hostname should be gray clouded (false) or orange clouded (true). */
  proxied?: boolean;
  /** Body param: Configures pool weights.  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights. - `steering_policy="least_outstanding_requests"`: Use pool  */
  randomSteering?: {
    defaultWeight?: number;
    poolWeights?: Record<string, unknown>;
  };
  /** Body param: A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools. */
  regionPools?: Record<string, unknown>;
  /** Body param: BETA Field Not General Access: A list of rules for this load balancer to execute. */
  rules?: {
    condition?: string;
    disabled?: boolean;
    fixedResponse?: {
      contentType?: string;
      location?: string;
      messageBody?: string;
      statusCode?: number;
    };
    name?: string;
    overrides?: {
      adaptiveRouting?: unknown;
      countryPools?: Record<string, unknown>;
      defaultPools?: string[];
      fallbackPool?: string;
      locationStrategy?: unknown;
      popPools?: Record<string, unknown>;
      randomSteering?: unknown;
      regionPools?: Record<string, unknown>;
      sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header";
      sessionAffinityAttributes?: unknown;
      sessionAffinityTtl?: number;
      steeringPolicy?:
        | ""
        | "off"
        | "geo"
        | "random"
        | "dynamic_latency"
        | "proximity"
        | "least_outstanding_requests"
        | "least_connections";
      ttl?: number;
    };
    priority?: number;
    terminates?: boolean;
  }[];
  /** Body param: Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a  */
  sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header";
  /** Body param: Configures attributes for session affinity. */
  sessionAffinityAttributes?: {
    drainDuration?: number;
    headers?: string[];
    requireAllHeaders?: boolean;
    samesite?: "Auto" | "Lax" | "None" | "Strict";
    secure?: "Auto" | "Always" | "Never";
    zeroDowntimeFailover?: "none" | "temporary" | "sticky";
  };
  /** Body param: Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted r */
  sessionAffinityTtl?: number;
  /** Body param: Steering Policy for this load balancer.  - `"off"`: Use `default_pools`. - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools */
  steeringPolicy?:
    | ""
    | "off"
    | "geo"
    | "random"
    | "dynamic_latency"
    | "proximity"
    | "least_outstanding_requests"
    | "least_connections";
  /** Body param: Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers. */
  ttl?: number;
}

export const PatchLoadBalancerRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    loadBalancerId: Schema.String.pipe(T.HttpPath("loadBalancerId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    adaptiveRouting: Schema.optional(
      Schema.Struct({
        failoverAcrossPools: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({ failoverAcrossPools: "failover_across_pools" }),
      ),
    ),
    countryPools: Schema.optional(Schema.Struct({})),
    defaultPools: Schema.optional(Schema.Array(Schema.String)),
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    fallbackPool: Schema.optional(Schema.String),
    locationStrategy: Schema.optional(
      Schema.Struct({
        mode: Schema.optional(Schema.Literals(["pop", "resolver_ip"])),
        preferEcs: Schema.optional(
          Schema.Literals(["always", "never", "proximity", "geo"]),
        ),
      }).pipe(Schema.encodeKeys({ mode: "mode", preferEcs: "prefer_ecs" })),
    ),
    name: Schema.optional(Schema.String),
    popPools: Schema.optional(Schema.Struct({})),
    proxied: Schema.optional(Schema.Boolean),
    randomSteering: Schema.optional(
      Schema.Struct({
        defaultWeight: Schema.optional(Schema.Number),
        poolWeights: Schema.optional(Schema.Struct({})),
      }).pipe(
        Schema.encodeKeys({
          defaultWeight: "default_weight",
          poolWeights: "pool_weights",
        }),
      ),
    ),
    regionPools: Schema.optional(Schema.Struct({})),
    rules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          condition: Schema.optional(Schema.String),
          disabled: Schema.optional(Schema.Boolean),
          fixedResponse: Schema.optional(
            Schema.Struct({
              contentType: Schema.optional(Schema.String),
              location: Schema.optional(Schema.String),
              messageBody: Schema.optional(Schema.String),
              statusCode: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                contentType: "content_type",
                location: "location",
                messageBody: "message_body",
                statusCode: "status_code",
              }),
            ),
          ),
          name: Schema.optional(Schema.String),
          overrides: Schema.optional(
            Schema.Struct({
              adaptiveRouting: Schema.optional(Schema.Unknown),
              countryPools: Schema.optional(Schema.Struct({})),
              defaultPools: Schema.optional(Schema.Array(Schema.String)),
              fallbackPool: Schema.optional(Schema.String),
              locationStrategy: Schema.optional(Schema.Unknown),
              popPools: Schema.optional(Schema.Struct({})),
              randomSteering: Schema.optional(Schema.Unknown),
              regionPools: Schema.optional(Schema.Struct({})),
              sessionAffinity: Schema.optional(
                Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
              ),
              sessionAffinityAttributes: Schema.optional(Schema.Unknown),
              sessionAffinityTtl: Schema.optional(Schema.Number),
              steeringPolicy: Schema.optional(
                Schema.Literals([
                  "",
                  "off",
                  "geo",
                  "random",
                  "dynamic_latency",
                  "proximity",
                  "least_outstanding_requests",
                  "least_connections",
                ]),
              ),
              ttl: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                adaptiveRouting: "adaptive_routing",
                countryPools: "country_pools",
                defaultPools: "default_pools",
                fallbackPool: "fallback_pool",
                locationStrategy: "location_strategy",
                popPools: "pop_pools",
                randomSteering: "random_steering",
                regionPools: "region_pools",
                sessionAffinity: "session_affinity",
                sessionAffinityAttributes: "session_affinity_attributes",
                sessionAffinityTtl: "session_affinity_ttl",
                steeringPolicy: "steering_policy",
                ttl: "ttl",
              }),
            ),
          ),
          priority: Schema.optional(Schema.Number),
          terminates: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            condition: "condition",
            disabled: "disabled",
            fixedResponse: "fixed_response",
            name: "name",
            overrides: "overrides",
            priority: "priority",
            terminates: "terminates",
          }),
        ),
      ),
    ),
    sessionAffinity: Schema.optional(
      Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
    ),
    sessionAffinityAttributes: Schema.optional(
      Schema.Struct({
        drainDuration: Schema.optional(Schema.Number),
        headers: Schema.optional(Schema.Array(Schema.String)),
        requireAllHeaders: Schema.optional(Schema.Boolean),
        samesite: Schema.optional(
          Schema.Literals(["Auto", "Lax", "None", "Strict"]),
        ),
        secure: Schema.optional(Schema.Literals(["Auto", "Always", "Never"])),
        zeroDowntimeFailover: Schema.optional(
          Schema.Literals(["none", "temporary", "sticky"]),
        ),
      }).pipe(
        Schema.encodeKeys({
          drainDuration: "drain_duration",
          headers: "headers",
          requireAllHeaders: "require_all_headers",
          samesite: "samesite",
          secure: "secure",
          zeroDowntimeFailover: "zero_downtime_failover",
        }),
      ),
    ),
    sessionAffinityTtl: Schema.optional(Schema.Number),
    steeringPolicy: Schema.optional(
      Schema.Literals([
        "",
        "off",
        "geo",
        "random",
        "dynamic_latency",
        "proximity",
        "least_outstanding_requests",
        "least_connections",
      ]),
    ),
    ttl: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      adaptiveRouting: "adaptive_routing",
      countryPools: "country_pools",
      defaultPools: "default_pools",
      description: "description",
      enabled: "enabled",
      fallbackPool: "fallback_pool",
      locationStrategy: "location_strategy",
      name: "name",
      popPools: "pop_pools",
      proxied: "proxied",
      randomSteering: "random_steering",
      regionPools: "region_pools",
      rules: "rules",
      sessionAffinity: "session_affinity",
      sessionAffinityAttributes: "session_affinity_attributes",
      sessionAffinityTtl: "session_affinity_ttl",
      steeringPolicy: "steering_policy",
      ttl: "ttl",
    }),
    T.Http({
      method: "PATCH",
      path: "/zones/{zone_id}/load_balancers/{loadBalancerId}",
    }),
  ) as unknown as Schema.Schema<PatchLoadBalancerRequest>;

export interface PatchLoadBalancerResponse {
  id?: string | null;
  /** Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-d */
  adaptiveRouting?: { failoverAcrossPools?: boolean | null } | null;
  /** A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool ma */
  countryPools?: Record<string, unknown> | null;
  createdOn?: string | null;
  /** A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region. */
  defaultPools?: string[] | null;
  /** Object description. */
  description?: string | null;
  /** Whether to enable (the default) this load balancer. */
  enabled?: boolean | null;
  /** The pool ID to use when all other pools are detected as unhealthy. */
  fallbackPool?: string | null;
  /** Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected. */
  locationStrategy?: {
    mode?: "pop" | "resolver_ip" | null;
    preferEcs?: "always" | "never" | "proximity" | "geo" | null;
  } | null;
  modifiedOn?: string | null;
  /** The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used. */
  name?: string | null;
  /** List of networks where Load Balancer or Pool is enabled. */
  networks?: string[] | null;
  /** Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using th */
  popPools?: Record<string, unknown> | null;
  /** Whether the hostname should be gray clouded (false) or orange clouded (true). */
  proxied?: boolean | null;
  /** Configures pool weights.  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights. - `steering_policy="least_outstanding_requests"`: Use pool weights to s */
  randomSteering?: {
    defaultWeight?: number | null;
    poolWeights?: Record<string, unknown> | null;
  } | null;
  /** A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools. */
  regionPools?: Record<string, unknown> | null;
  /** BETA Field Not General Access: A list of rules for this load balancer to execute. */
  rules?:
    | {
        condition?: string | null;
        disabled?: boolean | null;
        fixedResponse?: {
          contentType?: string | null;
          location?: string | null;
          messageBody?: string | null;
          statusCode?: number | null;
        } | null;
        name?: string | null;
        overrides?: {
          adaptiveRouting?: unknown | null;
          countryPools?: Record<string, unknown> | null;
          defaultPools?: string[] | null;
          fallbackPool?: string | null;
          locationStrategy?: unknown | null;
          popPools?: Record<string, unknown> | null;
          randomSteering?: unknown | null;
          regionPools?: Record<string, unknown> | null;
          sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
          sessionAffinityAttributes?: unknown | null;
          sessionAffinityTtl?: number | null;
          steeringPolicy?:
            | ""
            | "off"
            | "geo"
            | "random"
            | "dynamic_latency"
            | "proximity"
            | "least_outstanding_requests"
            | "least_connections"
            | null;
          ttl?: number | null;
        } | null;
        priority?: number | null;
        terminates?: boolean | null;
      }[]
    | null;
  /** Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is ge */
  sessionAffinity?: "none" | "cookie" | "ip_cookie" | "header" | null;
  /** Configures attributes for session affinity. */
  sessionAffinityAttributes?: {
    drainDuration?: number | null;
    headers?: string[] | null;
    requireAllHeaders?: boolean | null;
    samesite?: "Auto" | "Lax" | "None" | "Strict" | null;
    secure?: "Auto" | "Always" | "Never" | null;
    zeroDowntimeFailover?: "none" | "temporary" | "sticky" | null;
  } | null;
  /** Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `s */
  sessionAffinityTtl?: number | null;
  /** Steering Policy for this load balancer.  - `"off"`: Use `default_pools`. - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determi */
  steeringPolicy?:
    | ""
    | "off"
    | "geo"
    | "random"
    | "dynamic_latency"
    | "proximity"
    | "least_outstanding_requests"
    | "least_connections"
    | null;
  /** Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers. */
  ttl?: number | null;
  zoneName?: string | null;
}

export const PatchLoadBalancerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    adaptiveRouting: Schema.optional(
      Schema.Union([
        Schema.Struct({
          failoverAcrossPools: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({ failoverAcrossPools: "failover_across_pools" }),
        ),
        Schema.Null,
      ]),
    ),
    countryPools: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    defaultPools: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    fallbackPool: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    locationStrategy: Schema.optional(
      Schema.Union([
        Schema.Struct({
          mode: Schema.optional(
            Schema.Union([
              Schema.Literals(["pop", "resolver_ip"]),
              Schema.Null,
            ]),
          ),
          preferEcs: Schema.optional(
            Schema.Union([
              Schema.Literals(["always", "never", "proximity", "geo"]),
              Schema.Null,
            ]),
          ),
        }).pipe(Schema.encodeKeys({ mode: "mode", preferEcs: "prefer_ecs" })),
        Schema.Null,
      ]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    networks: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    popPools: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    proxied: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    randomSteering: Schema.optional(
      Schema.Union([
        Schema.Struct({
          defaultWeight: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          poolWeights: Schema.optional(
            Schema.Union([Schema.Struct({}), Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            defaultWeight: "default_weight",
            poolWeights: "pool_weights",
          }),
        ),
        Schema.Null,
      ]),
    ),
    regionPools: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    rules: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            condition: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            disabled: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            fixedResponse: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  contentType: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  location: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  messageBody: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  statusCode: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    contentType: "content_type",
                    location: "location",
                    messageBody: "message_body",
                    statusCode: "status_code",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            overrides: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  adaptiveRouting: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  countryPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  defaultPools: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  fallbackPool: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  locationStrategy: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  popPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  randomSteering: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  regionPools: Schema.optional(
                    Schema.Union([Schema.Struct({}), Schema.Null]),
                  ),
                  sessionAffinity: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "none",
                        "cookie",
                        "ip_cookie",
                        "header",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  sessionAffinityAttributes: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  sessionAffinityTtl: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  steeringPolicy: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "",
                        "off",
                        "geo",
                        "random",
                        "dynamic_latency",
                        "proximity",
                        "least_outstanding_requests",
                        "least_connections",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                  ttl: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    adaptiveRouting: "adaptive_routing",
                    countryPools: "country_pools",
                    defaultPools: "default_pools",
                    fallbackPool: "fallback_pool",
                    locationStrategy: "location_strategy",
                    popPools: "pop_pools",
                    randomSteering: "random_steering",
                    regionPools: "region_pools",
                    sessionAffinity: "session_affinity",
                    sessionAffinityAttributes: "session_affinity_attributes",
                    sessionAffinityTtl: "session_affinity_ttl",
                    steeringPolicy: "steering_policy",
                    ttl: "ttl",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            priority: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            terminates: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              condition: "condition",
              disabled: "disabled",
              fixedResponse: "fixed_response",
              name: "name",
              overrides: "overrides",
              priority: "priority",
              terminates: "terminates",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    sessionAffinity: Schema.optional(
      Schema.Union([
        Schema.Literals(["none", "cookie", "ip_cookie", "header"]),
        Schema.Null,
      ]),
    ),
    sessionAffinityAttributes: Schema.optional(
      Schema.Union([
        Schema.Struct({
          drainDuration: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          headers: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          requireAllHeaders: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          samesite: Schema.optional(
            Schema.Union([
              Schema.Literals(["Auto", "Lax", "None", "Strict"]),
              Schema.Null,
            ]),
          ),
          secure: Schema.optional(
            Schema.Union([
              Schema.Literals(["Auto", "Always", "Never"]),
              Schema.Null,
            ]),
          ),
          zeroDowntimeFailover: Schema.optional(
            Schema.Union([
              Schema.Literals(["none", "temporary", "sticky"]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            drainDuration: "drain_duration",
            headers: "headers",
            requireAllHeaders: "require_all_headers",
            samesite: "samesite",
            secure: "secure",
            zeroDowntimeFailover: "zero_downtime_failover",
          }),
        ),
        Schema.Null,
      ]),
    ),
    sessionAffinityTtl: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    steeringPolicy: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "",
          "off",
          "geo",
          "random",
          "dynamic_latency",
          "proximity",
          "least_outstanding_requests",
          "least_connections",
        ]),
        Schema.Null,
      ]),
    ),
    ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        adaptiveRouting: "adaptive_routing",
        countryPools: "country_pools",
        createdOn: "created_on",
        defaultPools: "default_pools",
        description: "description",
        enabled: "enabled",
        fallbackPool: "fallback_pool",
        locationStrategy: "location_strategy",
        modifiedOn: "modified_on",
        name: "name",
        networks: "networks",
        popPools: "pop_pools",
        proxied: "proxied",
        randomSteering: "random_steering",
        regionPools: "region_pools",
        rules: "rules",
        sessionAffinity: "session_affinity",
        sessionAffinityAttributes: "session_affinity_attributes",
        sessionAffinityTtl: "session_affinity_ttl",
        steeringPolicy: "steering_policy",
        ttl: "ttl",
        zoneName: "zone_name",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchLoadBalancerResponse>;

export type PatchLoadBalancerError = DefaultErrors;

export const patchLoadBalancer: API.OperationMethod<
  PatchLoadBalancerRequest,
  PatchLoadBalancerResponse,
  PatchLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchLoadBalancerRequest,
  output: PatchLoadBalancerResponse,
  errors: [],
}));

export interface DeleteLoadBalancerRequest {
  loadBalancerId: string;
  zoneId: string;
}

export const DeleteLoadBalancerRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    loadBalancerId: Schema.String.pipe(T.HttpPath("loadBalancerId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/zones/{zone_id}/load_balancers/{loadBalancerId}",
    }),
  ) as unknown as Schema.Schema<DeleteLoadBalancerRequest>;

export interface DeleteLoadBalancerResponse {
  id?: string | null;
}

export const DeleteLoadBalancerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteLoadBalancerResponse>;

export type DeleteLoadBalancerError = DefaultErrors;

export const deleteLoadBalancer: API.OperationMethod<
  DeleteLoadBalancerRequest,
  DeleteLoadBalancerResponse,
  DeleteLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLoadBalancerRequest,
  output: DeleteLoadBalancerResponse,
  errors: [],
}));

// =============================================================================
// Monitor
// =============================================================================

export interface GetMonitorRequest {
  monitorId: string;
  /** Identifier. */
  accountId: string;
}

export const GetMonitorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  monitorId: Schema.String.pipe(T.HttpPath("monitorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/monitors/{monitorId}",
  }),
) as unknown as Schema.Schema<GetMonitorRequest>;

export interface GetMonitorResponse {
  id?: string | null;
  /** Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean | null;
  /** To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number | null;
  /** To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number | null;
  createdOn?: string | null;
  /** Object description. */
  description?: string | null;
  /** A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedBody?: string | null;
  /** The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string | null;
  /** Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean | null;
  /** The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS mo */
  header?: Record<string, unknown> | null;
  /** The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number | null;
  /** The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string | null;
  modifiedOn?: string | null;
  /** The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string | null;
  /** The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: d */
  port?: number | null;
  /** Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string | null;
  /** The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number | null;
  /** The timeout (in seconds) before marking the health check as failed. */
  timeout?: number | null;
  /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp" | null;
}

export const GetMonitorResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  allowInsecure: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  consecutiveDown: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  consecutiveUp: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expectedBody: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expectedCodes: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  followRedirects: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  header: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
  interval: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  method: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  probeZone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  retries: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  timeout: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  type: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "http",
        "https",
        "tcp",
        "udp_icmp",
        "icmp_ping",
        "smtp",
      ]),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      allowInsecure: "allow_insecure",
      consecutiveDown: "consecutive_down",
      consecutiveUp: "consecutive_up",
      createdOn: "created_on",
      description: "description",
      expectedBody: "expected_body",
      expectedCodes: "expected_codes",
      followRedirects: "follow_redirects",
      header: "header",
      interval: "interval",
      method: "method",
      modifiedOn: "modified_on",
      path: "path",
      port: "port",
      probeZone: "probe_zone",
      retries: "retries",
      timeout: "timeout",
      type: "type",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetMonitorResponse>;

export type GetMonitorError = DefaultErrors;

export const getMonitor: API.OperationMethod<
  GetMonitorRequest,
  GetMonitorResponse,
  GetMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMonitorRequest,
  output: GetMonitorResponse,
  errors: [],
}));

export interface ListMonitorsRequest {
  /** Identifier. */
  accountId: string;
}

export const ListMonitorsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/monitors",
  }),
) as unknown as Schema.Schema<ListMonitorsRequest>;

export interface ListMonitorsResponse {
  result: {
    id?: string | null;
    allowInsecure?: boolean | null;
    consecutiveDown?: number | null;
    consecutiveUp?: number | null;
    createdOn?: string | null;
    description?: string | null;
    expectedBody?: string | null;
    expectedCodes?: string | null;
    followRedirects?: boolean | null;
    header?: Record<string, unknown> | null;
    interval?: number | null;
    method?: string | null;
    modifiedOn?: string | null;
    path?: string | null;
    port?: number | null;
    probeZone?: string | null;
    retries?: number | null;
    timeout?: number | null;
    type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp" | null;
  }[];
}

export const ListMonitorsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      allowInsecure: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      consecutiveDown: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      consecutiveUp: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      expectedBody: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      expectedCodes: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      followRedirects: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      header: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
      interval: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      method: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      probeZone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      retries: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      timeout: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      type: Schema.optional(
        Schema.Union([
          Schema.Literals([
            "http",
            "https",
            "tcp",
            "udp_icmp",
            "icmp_ping",
            "smtp",
          ]),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        allowInsecure: "allow_insecure",
        consecutiveDown: "consecutive_down",
        consecutiveUp: "consecutive_up",
        createdOn: "created_on",
        description: "description",
        expectedBody: "expected_body",
        expectedCodes: "expected_codes",
        followRedirects: "follow_redirects",
        header: "header",
        interval: "interval",
        method: "method",
        modifiedOn: "modified_on",
        path: "path",
        port: "port",
        probeZone: "probe_zone",
        retries: "retries",
        timeout: "timeout",
        type: "type",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListMonitorsResponse>;

export type ListMonitorsError = DefaultErrors;

export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsRequest,
  ListMonitorsResponse,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListMonitorsRequest,
  ) => stream.Stream<
    ListMonitorsResponse,
    ListMonitorsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListMonitorsRequest) => stream.Stream<
    {
      id?: string | null;
      allowInsecure?: boolean | null;
      consecutiveDown?: number | null;
      consecutiveUp?: number | null;
      createdOn?: string | null;
      description?: string | null;
      expectedBody?: string | null;
      expectedCodes?: string | null;
      followRedirects?: boolean | null;
      header?: Record<string, unknown> | null;
      interval?: number | null;
      method?: string | null;
      modifiedOn?: string | null;
      path?: string | null;
      port?: number | null;
      probeZone?: string | null;
      retries?: number | null;
      timeout?: number | null;
      type?:
        | "http"
        | "https"
        | "tcp"
        | "udp_icmp"
        | "icmp_ping"
        | "smtp"
        | null;
    },
    ListMonitorsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMonitorsRequest,
  output: ListMonitorsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateMonitorRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean;
  /** Body param: To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number;
  /** Body param: To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number;
  /** Body param: Object description. */
  description?: string;
  /** Body param: A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitor */
  expectedBody?: string;
  /** Body param: The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string;
  /** Body param: Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean;
  /** Body param: The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP  */
  header?: Record<string, unknown>;
  /** Body param: The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number;
  /** Body param: The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string;
  /** Body param: The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string;
  /** Body param: The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default  */
  port?: number | null;
  /** Body param: Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string;
  /** Body param: The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number;
  /** Body param: The timeout (in seconds) before marking the health check as failed. */
  timeout?: number;
  /** Body param: The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp";
}

export const CreateMonitorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  allowInsecure: Schema.optional(Schema.Boolean),
  consecutiveDown: Schema.optional(Schema.Number),
  consecutiveUp: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  expectedBody: Schema.optional(Schema.String),
  expectedCodes: Schema.optional(Schema.String),
  followRedirects: Schema.optional(Schema.Boolean),
  header: Schema.optional(Schema.Struct({})),
  interval: Schema.optional(Schema.Number),
  method: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  probeZone: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  timeout: Schema.optional(Schema.Number),
  type: Schema.optional(
    Schema.Literals(["http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp"]),
  ),
}).pipe(
  Schema.encodeKeys({
    allowInsecure: "allow_insecure",
    consecutiveDown: "consecutive_down",
    consecutiveUp: "consecutive_up",
    description: "description",
    expectedBody: "expected_body",
    expectedCodes: "expected_codes",
    followRedirects: "follow_redirects",
    header: "header",
    interval: "interval",
    method: "method",
    path: "path",
    port: "port",
    probeZone: "probe_zone",
    retries: "retries",
    timeout: "timeout",
    type: "type",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/load_balancers/monitors",
  }),
) as unknown as Schema.Schema<CreateMonitorRequest>;

export interface CreateMonitorResponse {
  id?: string | null;
  /** Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean | null;
  /** To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number | null;
  /** To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number | null;
  createdOn?: string | null;
  /** Object description. */
  description?: string | null;
  /** A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedBody?: string | null;
  /** The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string | null;
  /** Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean | null;
  /** The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS mo */
  header?: Record<string, unknown> | null;
  /** The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number | null;
  /** The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string | null;
  modifiedOn?: string | null;
  /** The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string | null;
  /** The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: d */
  port?: number | null;
  /** Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string | null;
  /** The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number | null;
  /** The timeout (in seconds) before marking the health check as failed. */
  timeout?: number | null;
  /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp" | null;
}

export const CreateMonitorResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  allowInsecure: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  consecutiveDown: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  consecutiveUp: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expectedBody: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expectedCodes: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  followRedirects: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  header: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
  interval: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  method: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  probeZone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  retries: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  timeout: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  type: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "http",
        "https",
        "tcp",
        "udp_icmp",
        "icmp_ping",
        "smtp",
      ]),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      allowInsecure: "allow_insecure",
      consecutiveDown: "consecutive_down",
      consecutiveUp: "consecutive_up",
      createdOn: "created_on",
      description: "description",
      expectedBody: "expected_body",
      expectedCodes: "expected_codes",
      followRedirects: "follow_redirects",
      header: "header",
      interval: "interval",
      method: "method",
      modifiedOn: "modified_on",
      path: "path",
      port: "port",
      probeZone: "probe_zone",
      retries: "retries",
      timeout: "timeout",
      type: "type",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateMonitorResponse>;

export type CreateMonitorError = DefaultErrors;

export const createMonitor: API.OperationMethod<
  CreateMonitorRequest,
  CreateMonitorResponse,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMonitorRequest,
  output: CreateMonitorResponse,
  errors: [],
}));

export interface UpdateMonitorRequest {
  monitorId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean;
  /** Body param: To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number;
  /** Body param: To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number;
  /** Body param: Object description. */
  description?: string;
  /** Body param: A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitor */
  expectedBody?: string;
  /** Body param: The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string;
  /** Body param: Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean;
  /** Body param: The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP  */
  header?: Record<string, unknown>;
  /** Body param: The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number;
  /** Body param: The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string;
  /** Body param: The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string;
  /** Body param: The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default  */
  port?: number | null;
  /** Body param: Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string;
  /** Body param: The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number;
  /** Body param: The timeout (in seconds) before marking the health check as failed. */
  timeout?: number;
  /** Body param: The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp";
}

export const UpdateMonitorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  monitorId: Schema.String.pipe(T.HttpPath("monitorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  allowInsecure: Schema.optional(Schema.Boolean),
  consecutiveDown: Schema.optional(Schema.Number),
  consecutiveUp: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  expectedBody: Schema.optional(Schema.String),
  expectedCodes: Schema.optional(Schema.String),
  followRedirects: Schema.optional(Schema.Boolean),
  header: Schema.optional(Schema.Struct({})),
  interval: Schema.optional(Schema.Number),
  method: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  probeZone: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  timeout: Schema.optional(Schema.Number),
  type: Schema.optional(
    Schema.Literals(["http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp"]),
  ),
}).pipe(
  Schema.encodeKeys({
    allowInsecure: "allow_insecure",
    consecutiveDown: "consecutive_down",
    consecutiveUp: "consecutive_up",
    description: "description",
    expectedBody: "expected_body",
    expectedCodes: "expected_codes",
    followRedirects: "follow_redirects",
    header: "header",
    interval: "interval",
    method: "method",
    path: "path",
    port: "port",
    probeZone: "probe_zone",
    retries: "retries",
    timeout: "timeout",
    type: "type",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/load_balancers/monitors/{monitorId}",
  }),
) as unknown as Schema.Schema<UpdateMonitorRequest>;

export interface UpdateMonitorResponse {
  id?: string | null;
  /** Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean | null;
  /** To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number | null;
  /** To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number | null;
  createdOn?: string | null;
  /** Object description. */
  description?: string | null;
  /** A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedBody?: string | null;
  /** The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string | null;
  /** Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean | null;
  /** The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS mo */
  header?: Record<string, unknown> | null;
  /** The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number | null;
  /** The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string | null;
  modifiedOn?: string | null;
  /** The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string | null;
  /** The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: d */
  port?: number | null;
  /** Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string | null;
  /** The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number | null;
  /** The timeout (in seconds) before marking the health check as failed. */
  timeout?: number | null;
  /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp" | null;
}

export const UpdateMonitorResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  allowInsecure: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  consecutiveDown: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  consecutiveUp: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expectedBody: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expectedCodes: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  followRedirects: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  header: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
  interval: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  method: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  probeZone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  retries: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  timeout: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  type: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "http",
        "https",
        "tcp",
        "udp_icmp",
        "icmp_ping",
        "smtp",
      ]),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      allowInsecure: "allow_insecure",
      consecutiveDown: "consecutive_down",
      consecutiveUp: "consecutive_up",
      createdOn: "created_on",
      description: "description",
      expectedBody: "expected_body",
      expectedCodes: "expected_codes",
      followRedirects: "follow_redirects",
      header: "header",
      interval: "interval",
      method: "method",
      modifiedOn: "modified_on",
      path: "path",
      port: "port",
      probeZone: "probe_zone",
      retries: "retries",
      timeout: "timeout",
      type: "type",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateMonitorResponse>;

export type UpdateMonitorError = DefaultErrors;

export const updateMonitor: API.OperationMethod<
  UpdateMonitorRequest,
  UpdateMonitorResponse,
  UpdateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMonitorRequest,
  output: UpdateMonitorResponse,
  errors: [],
}));

export interface PatchMonitorRequest {
  monitorId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean;
  /** Body param: To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number;
  /** Body param: To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number;
  /** Body param: Object description. */
  description?: string;
  /** Body param: A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitor */
  expectedBody?: string;
  /** Body param: The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string;
  /** Body param: Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean;
  /** Body param: The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP  */
  header?: Record<string, unknown>;
  /** Body param: The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number;
  /** Body param: The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string;
  /** Body param: The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string;
  /** Body param: The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default  */
  port?: number | null;
  /** Body param: Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string;
  /** Body param: The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number;
  /** Body param: The timeout (in seconds) before marking the health check as failed. */
  timeout?: number;
  /** Body param: The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp";
}

export const PatchMonitorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  monitorId: Schema.String.pipe(T.HttpPath("monitorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  allowInsecure: Schema.optional(Schema.Boolean),
  consecutiveDown: Schema.optional(Schema.Number),
  consecutiveUp: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  expectedBody: Schema.optional(Schema.String),
  expectedCodes: Schema.optional(Schema.String),
  followRedirects: Schema.optional(Schema.Boolean),
  header: Schema.optional(Schema.Struct({})),
  interval: Schema.optional(Schema.Number),
  method: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  probeZone: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  timeout: Schema.optional(Schema.Number),
  type: Schema.optional(
    Schema.Literals(["http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp"]),
  ),
}).pipe(
  Schema.encodeKeys({
    allowInsecure: "allow_insecure",
    consecutiveDown: "consecutive_down",
    consecutiveUp: "consecutive_up",
    description: "description",
    expectedBody: "expected_body",
    expectedCodes: "expected_codes",
    followRedirects: "follow_redirects",
    header: "header",
    interval: "interval",
    method: "method",
    path: "path",
    port: "port",
    probeZone: "probe_zone",
    retries: "retries",
    timeout: "timeout",
    type: "type",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/load_balancers/monitors/{monitorId}",
  }),
) as unknown as Schema.Schema<PatchMonitorRequest>;

export interface PatchMonitorResponse {
  id?: string | null;
  /** Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean | null;
  /** To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number | null;
  /** To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number | null;
  createdOn?: string | null;
  /** Object description. */
  description?: string | null;
  /** A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedBody?: string | null;
  /** The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string | null;
  /** Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean | null;
  /** The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS mo */
  header?: Record<string, unknown> | null;
  /** The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number | null;
  /** The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string | null;
  modifiedOn?: string | null;
  /** The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string | null;
  /** The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: d */
  port?: number | null;
  /** Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string | null;
  /** The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number | null;
  /** The timeout (in seconds) before marking the health check as failed. */
  timeout?: number | null;
  /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp" | null;
}

export const PatchMonitorResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  allowInsecure: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  consecutiveDown: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  consecutiveUp: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expectedBody: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expectedCodes: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  followRedirects: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  header: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
  interval: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  method: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  probeZone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  retries: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  timeout: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  type: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "http",
        "https",
        "tcp",
        "udp_icmp",
        "icmp_ping",
        "smtp",
      ]),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      allowInsecure: "allow_insecure",
      consecutiveDown: "consecutive_down",
      consecutiveUp: "consecutive_up",
      createdOn: "created_on",
      description: "description",
      expectedBody: "expected_body",
      expectedCodes: "expected_codes",
      followRedirects: "follow_redirects",
      header: "header",
      interval: "interval",
      method: "method",
      modifiedOn: "modified_on",
      path: "path",
      port: "port",
      probeZone: "probe_zone",
      retries: "retries",
      timeout: "timeout",
      type: "type",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchMonitorResponse>;

export type PatchMonitorError = DefaultErrors;

export const patchMonitor: API.OperationMethod<
  PatchMonitorRequest,
  PatchMonitorResponse,
  PatchMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchMonitorRequest,
  output: PatchMonitorResponse,
  errors: [],
}));

export interface DeleteMonitorRequest {
  monitorId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteMonitorRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  monitorId: Schema.String.pipe(T.HttpPath("monitorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/load_balancers/monitors/{monitorId}",
  }),
) as unknown as Schema.Schema<DeleteMonitorRequest>;

export interface DeleteMonitorResponse {
  id?: string | null;
}

export const DeleteMonitorResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<DeleteMonitorResponse>;

export type DeleteMonitorError = DefaultErrors;

export const deleteMonitor: API.OperationMethod<
  DeleteMonitorRequest,
  DeleteMonitorResponse,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMonitorRequest,
  output: DeleteMonitorResponse,
  errors: [],
}));

// =============================================================================
// MonitorGroup
// =============================================================================

export interface GetMonitorGroupRequest {
  monitorGroupId: string;
  /** Identifier. */
  accountId: string;
}

export const GetMonitorGroupRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    monitorGroupId: Schema.String.pipe(T.HttpPath("monitorGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/monitor_groups/{monitorGroupId}",
  }),
) as unknown as Schema.Schema<GetMonitorGroupRequest>;

export interface GetMonitorGroupResponse {
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  id: string;
  /** A short description of the monitor group */
  description: string;
  /** List of monitors in this group */
  members: {
    enabled: boolean;
    monitorId: string;
    monitoringOnly: boolean;
    mustBeHealthy: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  }[];
  /** The timestamp of when the monitor group was created */
  createdAt?: string | null;
  /** The timestamp of when the monitor group was last updated */
  updatedAt?: string | null;
}

export const GetMonitorGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    description: Schema.String,
    members: Schema.Array(
      Schema.Struct({
        enabled: Schema.Boolean,
        monitorId: Schema.String,
        monitoringOnly: Schema.Boolean,
        mustBeHealthy: Schema.Boolean,
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          monitorId: "monitor_id",
          monitoringOnly: "monitoring_only",
          mustBeHealthy: "must_be_healthy",
          createdAt: "created_at",
          updatedAt: "updated_at",
        }),
      ),
    ),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        description: "description",
        members: "members",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetMonitorGroupResponse>;

export type GetMonitorGroupError = DefaultErrors;

export const getMonitorGroup: API.OperationMethod<
  GetMonitorGroupRequest,
  GetMonitorGroupResponse,
  GetMonitorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMonitorGroupRequest,
  output: GetMonitorGroupResponse,
  errors: [],
}));

export interface ListMonitorGroupsRequest {
  /** Identifier. */
  accountId: string;
}

export const ListMonitorGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/load_balancers/monitor_groups",
    }),
  ) as unknown as Schema.Schema<ListMonitorGroupsRequest>;

export interface ListMonitorGroupsResponse {
  result: {
    id: string;
    description: string;
    members: {
      enabled: boolean;
      monitorId: string;
      monitoringOnly: boolean;
      mustBeHealthy: boolean;
      createdAt?: string | null;
      updatedAt?: string | null;
    }[];
    createdAt?: string | null;
    updatedAt?: string | null;
  }[];
}

export const ListMonitorGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        description: Schema.String,
        members: Schema.Array(
          Schema.Struct({
            enabled: Schema.Boolean,
            monitorId: Schema.String,
            monitoringOnly: Schema.Boolean,
            mustBeHealthy: Schema.Boolean,
            createdAt: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            updatedAt: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              enabled: "enabled",
              monitorId: "monitor_id",
              monitoringOnly: "monitoring_only",
              mustBeHealthy: "must_be_healthy",
              createdAt: "created_at",
              updatedAt: "updated_at",
            }),
          ),
        ),
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          description: "description",
          members: "members",
          createdAt: "created_at",
          updatedAt: "updated_at",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<ListMonitorGroupsResponse>;

export type ListMonitorGroupsError = DefaultErrors;

export const listMonitorGroups: API.PaginatedOperationMethod<
  ListMonitorGroupsRequest,
  ListMonitorGroupsResponse,
  ListMonitorGroupsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListMonitorGroupsRequest,
  ) => stream.Stream<
    ListMonitorGroupsResponse,
    ListMonitorGroupsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListMonitorGroupsRequest) => stream.Stream<
    {
      id: string;
      description: string;
      members: {
        enabled: boolean;
        monitorId: string;
        monitoringOnly: boolean;
        mustBeHealthy: boolean;
        createdAt?: string | null;
        updatedAt?: string | null;
      }[];
      createdAt?: string | null;
      updatedAt?: string | null;
    },
    ListMonitorGroupsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMonitorGroupsRequest,
  output: ListMonitorGroupsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateMonitorGroupRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The ID of the Monitor Group to use for checking the health of origins within this pool. */
  id: string;
  /** Body param: A short description of the monitor group */
  description: string;
  /** Body param: List of monitors in this group */
  members: {
    enabled: boolean;
    monitorId: string;
    monitoringOnly: boolean;
    mustBeHealthy: boolean;
  }[];
}

export const CreateMonitorGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    id: Schema.String,
    description: Schema.String,
    members: Schema.Array(
      Schema.Struct({
        enabled: Schema.Boolean,
        monitorId: Schema.String,
        monitoringOnly: Schema.Boolean,
        mustBeHealthy: Schema.Boolean,
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          monitorId: "monitor_id",
          monitoringOnly: "monitoring_only",
          mustBeHealthy: "must_be_healthy",
        }),
      ),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/load_balancers/monitor_groups",
    }),
  ) as unknown as Schema.Schema<CreateMonitorGroupRequest>;

export interface CreateMonitorGroupResponse {
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  id: string;
  /** A short description of the monitor group */
  description: string;
  /** List of monitors in this group */
  members: {
    enabled: boolean;
    monitorId: string;
    monitoringOnly: boolean;
    mustBeHealthy: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  }[];
  /** The timestamp of when the monitor group was created */
  createdAt?: string | null;
  /** The timestamp of when the monitor group was last updated */
  updatedAt?: string | null;
}

export const CreateMonitorGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    description: Schema.String,
    members: Schema.Array(
      Schema.Struct({
        enabled: Schema.Boolean,
        monitorId: Schema.String,
        monitoringOnly: Schema.Boolean,
        mustBeHealthy: Schema.Boolean,
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          monitorId: "monitor_id",
          monitoringOnly: "monitoring_only",
          mustBeHealthy: "must_be_healthy",
          createdAt: "created_at",
          updatedAt: "updated_at",
        }),
      ),
    ),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        description: "description",
        members: "members",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateMonitorGroupResponse>;

export type CreateMonitorGroupError = DefaultErrors;

export const createMonitorGroup: API.OperationMethod<
  CreateMonitorGroupRequest,
  CreateMonitorGroupResponse,
  CreateMonitorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMonitorGroupRequest,
  output: CreateMonitorGroupResponse,
  errors: [],
}));

export interface UpdateMonitorGroupRequest {
  monitorGroupId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The ID of the Monitor Group to use for checking the health of origins within this pool. */
  id: string;
  /** Body param: A short description of the monitor group */
  description: string;
  /** Body param: List of monitors in this group */
  members: {
    enabled: boolean;
    monitorId: string;
    monitoringOnly: boolean;
    mustBeHealthy: boolean;
  }[];
}

export const UpdateMonitorGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    monitorGroupId: Schema.String.pipe(T.HttpPath("monitorGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    id: Schema.String,
    description: Schema.String,
    members: Schema.Array(
      Schema.Struct({
        enabled: Schema.Boolean,
        monitorId: Schema.String,
        monitoringOnly: Schema.Boolean,
        mustBeHealthy: Schema.Boolean,
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          monitorId: "monitor_id",
          monitoringOnly: "monitoring_only",
          mustBeHealthy: "must_be_healthy",
        }),
      ),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/load_balancers/monitor_groups/{monitorGroupId}",
    }),
  ) as unknown as Schema.Schema<UpdateMonitorGroupRequest>;

export interface UpdateMonitorGroupResponse {
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  id: string;
  /** A short description of the monitor group */
  description: string;
  /** List of monitors in this group */
  members: {
    enabled: boolean;
    monitorId: string;
    monitoringOnly: boolean;
    mustBeHealthy: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  }[];
  /** The timestamp of when the monitor group was created */
  createdAt?: string | null;
  /** The timestamp of when the monitor group was last updated */
  updatedAt?: string | null;
}

export const UpdateMonitorGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    description: Schema.String,
    members: Schema.Array(
      Schema.Struct({
        enabled: Schema.Boolean,
        monitorId: Schema.String,
        monitoringOnly: Schema.Boolean,
        mustBeHealthy: Schema.Boolean,
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          monitorId: "monitor_id",
          monitoringOnly: "monitoring_only",
          mustBeHealthy: "must_be_healthy",
          createdAt: "created_at",
          updatedAt: "updated_at",
        }),
      ),
    ),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        description: "description",
        members: "members",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateMonitorGroupResponse>;

export type UpdateMonitorGroupError = DefaultErrors;

export const updateMonitorGroup: API.OperationMethod<
  UpdateMonitorGroupRequest,
  UpdateMonitorGroupResponse,
  UpdateMonitorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMonitorGroupRequest,
  output: UpdateMonitorGroupResponse,
  errors: [],
}));

export interface PatchMonitorGroupRequest {
  monitorGroupId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The ID of the Monitor Group to use for checking the health of origins within this pool. */
  id: string;
  /** Body param: A short description of the monitor group */
  description: string;
  /** Body param: List of monitors in this group */
  members: {
    enabled: boolean;
    monitorId: string;
    monitoringOnly: boolean;
    mustBeHealthy: boolean;
  }[];
}

export const PatchMonitorGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    monitorGroupId: Schema.String.pipe(T.HttpPath("monitorGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    id: Schema.String,
    description: Schema.String,
    members: Schema.Array(
      Schema.Struct({
        enabled: Schema.Boolean,
        monitorId: Schema.String,
        monitoringOnly: Schema.Boolean,
        mustBeHealthy: Schema.Boolean,
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          monitorId: "monitor_id",
          monitoringOnly: "monitoring_only",
          mustBeHealthy: "must_be_healthy",
        }),
      ),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/load_balancers/monitor_groups/{monitorGroupId}",
    }),
  ) as unknown as Schema.Schema<PatchMonitorGroupRequest>;

export interface PatchMonitorGroupResponse {
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  id: string;
  /** A short description of the monitor group */
  description: string;
  /** List of monitors in this group */
  members: {
    enabled: boolean;
    monitorId: string;
    monitoringOnly: boolean;
    mustBeHealthy: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  }[];
  /** The timestamp of when the monitor group was created */
  createdAt?: string | null;
  /** The timestamp of when the monitor group was last updated */
  updatedAt?: string | null;
}

export const PatchMonitorGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    description: Schema.String,
    members: Schema.Array(
      Schema.Struct({
        enabled: Schema.Boolean,
        monitorId: Schema.String,
        monitoringOnly: Schema.Boolean,
        mustBeHealthy: Schema.Boolean,
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          monitorId: "monitor_id",
          monitoringOnly: "monitoring_only",
          mustBeHealthy: "must_be_healthy",
          createdAt: "created_at",
          updatedAt: "updated_at",
        }),
      ),
    ),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        description: "description",
        members: "members",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchMonitorGroupResponse>;

export type PatchMonitorGroupError = DefaultErrors;

export const patchMonitorGroup: API.OperationMethod<
  PatchMonitorGroupRequest,
  PatchMonitorGroupResponse,
  PatchMonitorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchMonitorGroupRequest,
  output: PatchMonitorGroupResponse,
  errors: [],
}));

export interface DeleteMonitorGroupRequest {
  monitorGroupId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteMonitorGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    monitorGroupId: Schema.String.pipe(T.HttpPath("monitorGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/load_balancers/monitor_groups/{monitorGroupId}",
    }),
  ) as unknown as Schema.Schema<DeleteMonitorGroupRequest>;

export interface DeleteMonitorGroupResponse {
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  id: string;
  /** A short description of the monitor group */
  description: string;
  /** List of monitors in this group */
  members: {
    enabled: boolean;
    monitorId: string;
    monitoringOnly: boolean;
    mustBeHealthy: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  }[];
  /** The timestamp of when the monitor group was created */
  createdAt?: string | null;
  /** The timestamp of when the monitor group was last updated */
  updatedAt?: string | null;
}

export const DeleteMonitorGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    description: Schema.String,
    members: Schema.Array(
      Schema.Struct({
        enabled: Schema.Boolean,
        monitorId: Schema.String,
        monitoringOnly: Schema.Boolean,
        mustBeHealthy: Schema.Boolean,
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          monitorId: "monitor_id",
          monitoringOnly: "monitoring_only",
          mustBeHealthy: "must_be_healthy",
          createdAt: "created_at",
          updatedAt: "updated_at",
        }),
      ),
    ),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        description: "description",
        members: "members",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteMonitorGroupResponse>;

export type DeleteMonitorGroupError = DefaultErrors;

export const deleteMonitorGroup: API.OperationMethod<
  DeleteMonitorGroupRequest,
  DeleteMonitorGroupResponse,
  DeleteMonitorGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMonitorGroupRequest,
  output: DeleteMonitorGroupResponse,
  errors: [],
}));

// =============================================================================
// MonitorPreview
// =============================================================================

export interface CreateMonitorPreviewRequest {
  monitorId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean;
  /** Body param: To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number;
  /** Body param: To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number;
  /** Body param: Object description. */
  description?: string;
  /** Body param: A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitor */
  expectedBody?: string;
  /** Body param: The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string;
  /** Body param: Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean;
  /** Body param: The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP  */
  header?: Record<string, unknown>;
  /** Body param: The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number;
  /** Body param: The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string;
  /** Body param: The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string;
  /** Body param: The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default  */
  port?: number | null;
  /** Body param: Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string;
  /** Body param: The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number;
  /** Body param: The timeout (in seconds) before marking the health check as failed. */
  timeout?: number;
  /** Body param: The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp";
}

export const CreateMonitorPreviewRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    monitorId: Schema.String.pipe(T.HttpPath("monitorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    allowInsecure: Schema.optional(Schema.Boolean),
    consecutiveDown: Schema.optional(Schema.Number),
    consecutiveUp: Schema.optional(Schema.Number),
    description: Schema.optional(Schema.String),
    expectedBody: Schema.optional(Schema.String),
    expectedCodes: Schema.optional(Schema.String),
    followRedirects: Schema.optional(Schema.Boolean),
    header: Schema.optional(Schema.Struct({})),
    interval: Schema.optional(Schema.Number),
    method: Schema.optional(Schema.String),
    path: Schema.optional(Schema.String),
    port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    probeZone: Schema.optional(Schema.String),
    retries: Schema.optional(Schema.Number),
    timeout: Schema.optional(Schema.Number),
    type: Schema.optional(
      Schema.Literals([
        "http",
        "https",
        "tcp",
        "udp_icmp",
        "icmp_ping",
        "smtp",
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      allowInsecure: "allow_insecure",
      consecutiveDown: "consecutive_down",
      consecutiveUp: "consecutive_up",
      description: "description",
      expectedBody: "expected_body",
      expectedCodes: "expected_codes",
      followRedirects: "follow_redirects",
      header: "header",
      interval: "interval",
      method: "method",
      path: "path",
      port: "port",
      probeZone: "probe_zone",
      retries: "retries",
      timeout: "timeout",
      type: "type",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/load_balancers/monitors/{monitorId}/preview",
    }),
  ) as unknown as Schema.Schema<CreateMonitorPreviewRequest>;

export interface CreateMonitorPreviewResponse {
  /** Monitored pool IDs mapped to their respective names. */
  pools?: Record<string, unknown> | null;
  previewId?: string | null;
}

export const CreateMonitorPreviewResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pools: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    previewId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(Schema.encodeKeys({ pools: "pools", previewId: "preview_id" }))
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateMonitorPreviewResponse>;

export type CreateMonitorPreviewError = DefaultErrors;

export const createMonitorPreview: API.OperationMethod<
  CreateMonitorPreviewRequest,
  CreateMonitorPreviewResponse,
  CreateMonitorPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMonitorPreviewRequest,
  output: CreateMonitorPreviewResponse,
  errors: [],
}));

// =============================================================================
// MonitorReference
// =============================================================================

export interface GetMonitorReferenceRequest {
  monitorId: string;
  /** Identifier. */
  accountId: string;
}

export const GetMonitorReferenceRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    monitorId: Schema.String.pipe(T.HttpPath("monitorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/load_balancers/monitors/{monitorId}/references",
    }),
  ) as unknown as Schema.Schema<GetMonitorReferenceRequest>;

export interface GetMonitorReferenceResponse {
  result: {
    referenceType?: "*" | "referral" | "referrer" | null;
    resourceId?: string | null;
    resourceName?: string | null;
    resourceType?: string | null;
  }[];
}

export const GetMonitorReferenceResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        referenceType: Schema.optional(
          Schema.Union([
            Schema.Literals(["*", "referral", "referrer"]),
            Schema.Null,
          ]),
        ),
        resourceId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        resourceName: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        resourceType: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          referenceType: "reference_type",
          resourceId: "resource_id",
          resourceName: "resource_name",
          resourceType: "resource_type",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<GetMonitorReferenceResponse>;

export type GetMonitorReferenceError = DefaultErrors;

export const getMonitorReference: API.PaginatedOperationMethod<
  GetMonitorReferenceRequest,
  GetMonitorReferenceResponse,
  GetMonitorReferenceError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetMonitorReferenceRequest,
  ) => stream.Stream<
    GetMonitorReferenceResponse,
    GetMonitorReferenceError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: GetMonitorReferenceRequest) => stream.Stream<
    {
      referenceType?: "*" | "referral" | "referrer" | null;
      resourceId?: string | null;
      resourceName?: string | null;
      resourceType?: string | null;
    },
    GetMonitorReferenceError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetMonitorReferenceRequest,
  output: GetMonitorReferenceResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// Pool
// =============================================================================

export interface GetPoolRequest {
  poolId: string;
  /** Identifier. */
  accountId: string;
}

export const GetPoolRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  poolId: Schema.String.pipe(T.HttpPath("poolId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/pools/{poolId}",
  }),
) as unknown as Schema.Schema<GetPoolRequest>;

export interface GetPoolResponse {
  id?: string | null;
  /** A list of regions from which to run health checks. Null means every Cloudflare data center. */
  checkRegions?:
    | (
        | "WNAM"
        | "ENAM"
        | "WEU"
        | "EEU"
        | "NSAM"
        | "SSAM"
        | "OC"
        | "ME"
        | "NAF"
        | "SAF"
        | "SEAS"
        | "NEAS"
        | "ALL_REGIONS"
        | "SAS"
      )[]
    | null;
  createdOn?: string | null;
  /** A human-readable description of the pool. */
  description?: string | null;
  /** This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at. */
  disabledAt?: string | null;
  /** Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover t */
  enabled?: boolean | null;
  /** The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set. */
  latitude?: number | null;
  /** Configures load shedding policies and percentages for the pool. */
  loadShedding?: unknown | null;
  /** The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set. */
  longitude?: number | null;
  /** The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the  */
  minimumOrigins?: number | null;
  modifiedOn?: string | null;
  /** The ID of the Monitor to use for checking the health of origins within this pool. */
  monitor?: string | null;
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  monitorGroup?: string | null;
  /** A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed. */
  name?: string | null;
  /** List of networks where Load Balancer or Pool is enabled. */
  networks?: string[] | null;
  /** This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send health status  */
  notificationEmail?: string | null;
  /** Filter pool and origin health notifications by resource type or health status. Use null to reset. */
  notificationFilter?: unknown | null;
  /** Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity. */
  originSteering?: unknown | null;
  /** The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy. */
  origins?: unknown[] | null;
}

export const GetPoolResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  checkRegions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Literals([
          "WNAM",
          "ENAM",
          "WEU",
          "EEU",
          "NSAM",
          "SSAM",
          "OC",
          "ME",
          "NAF",
          "SAF",
          "SEAS",
          "NEAS",
          "ALL_REGIONS",
          "SAS",
        ]),
      ),
      Schema.Null,
    ]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  disabledAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  latitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  loadShedding: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  longitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  minimumOrigins: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  monitor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  monitorGroup: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  networks: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  notificationEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  notificationFilter: Schema.optional(
    Schema.Union([Schema.Unknown, Schema.Null]),
  ),
  originSteering: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  origins: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      checkRegions: "check_regions",
      createdOn: "created_on",
      description: "description",
      disabledAt: "disabled_at",
      enabled: "enabled",
      latitude: "latitude",
      loadShedding: "load_shedding",
      longitude: "longitude",
      minimumOrigins: "minimum_origins",
      modifiedOn: "modified_on",
      monitor: "monitor",
      monitorGroup: "monitor_group",
      name: "name",
      networks: "networks",
      notificationEmail: "notification_email",
      notificationFilter: "notification_filter",
      originSteering: "origin_steering",
      origins: "origins",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetPoolResponse>;

export type GetPoolError = DefaultErrors;

export const getPool: API.OperationMethod<
  GetPoolRequest,
  GetPoolResponse,
  GetPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPoolRequest,
  output: GetPoolResponse,
  errors: [],
}));

export interface ListPoolsRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: The ID of the Monitor to use for checking the health of origins within this pool. */
  monitor?: string;
}

export const ListPoolsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  monitor: Schema.optional(Schema.String).pipe(T.HttpQuery("monitor")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/pools",
  }),
) as unknown as Schema.Schema<ListPoolsRequest>;

export interface ListPoolsResponse {
  result: {
    id?: string | null;
    checkRegions?:
      | (
          | "WNAM"
          | "ENAM"
          | "WEU"
          | "EEU"
          | "NSAM"
          | "SSAM"
          | "OC"
          | "ME"
          | "NAF"
          | "SAF"
          | "SEAS"
          | "NEAS"
          | "ALL_REGIONS"
          | "SAS"
        )[]
      | null;
    createdOn?: string | null;
    description?: string | null;
    disabledAt?: string | null;
    enabled?: boolean | null;
    latitude?: number | null;
    loadShedding?: unknown | null;
    longitude?: number | null;
    minimumOrigins?: number | null;
    modifiedOn?: string | null;
    monitor?: string | null;
    monitorGroup?: string | null;
    name?: string | null;
    networks?: string[] | null;
    notificationEmail?: string | null;
    notificationFilter?: unknown | null;
    originSteering?: unknown | null;
    origins?: unknown[] | null;
  }[];
}

export const ListPoolsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      checkRegions: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Literals([
              "WNAM",
              "ENAM",
              "WEU",
              "EEU",
              "NSAM",
              "SSAM",
              "OC",
              "ME",
              "NAF",
              "SAF",
              "SEAS",
              "NEAS",
              "ALL_REGIONS",
              "SAS",
            ]),
          ),
          Schema.Null,
        ]),
      ),
      createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      disabledAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      latitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      loadShedding: Schema.optional(
        Schema.Union([Schema.Unknown, Schema.Null]),
      ),
      longitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      minimumOrigins: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      monitor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      monitorGroup: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      networks: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      notificationEmail: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      notificationFilter: Schema.optional(
        Schema.Union([Schema.Unknown, Schema.Null]),
      ),
      originSteering: Schema.optional(
        Schema.Union([Schema.Unknown, Schema.Null]),
      ),
      origins: Schema.optional(
        Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        checkRegions: "check_regions",
        createdOn: "created_on",
        description: "description",
        disabledAt: "disabled_at",
        enabled: "enabled",
        latitude: "latitude",
        loadShedding: "load_shedding",
        longitude: "longitude",
        minimumOrigins: "minimum_origins",
        modifiedOn: "modified_on",
        monitor: "monitor",
        monitorGroup: "monitor_group",
        name: "name",
        networks: "networks",
        notificationEmail: "notification_email",
        notificationFilter: "notification_filter",
        originSteering: "origin_steering",
        origins: "origins",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListPoolsResponse>;

export type ListPoolsError = DefaultErrors;

export const listPools: API.PaginatedOperationMethod<
  ListPoolsRequest,
  ListPoolsResponse,
  ListPoolsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListPoolsRequest,
  ) => stream.Stream<
    ListPoolsResponse,
    ListPoolsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListPoolsRequest) => stream.Stream<
    {
      id?: string | null;
      checkRegions?:
        | (
            | "WNAM"
            | "ENAM"
            | "WEU"
            | "EEU"
            | "NSAM"
            | "SSAM"
            | "OC"
            | "ME"
            | "NAF"
            | "SAF"
            | "SEAS"
            | "NEAS"
            | "ALL_REGIONS"
            | "SAS"
          )[]
        | null;
      createdOn?: string | null;
      description?: string | null;
      disabledAt?: string | null;
      enabled?: boolean | null;
      latitude?: number | null;
      loadShedding?: unknown | null;
      longitude?: number | null;
      minimumOrigins?: number | null;
      modifiedOn?: string | null;
      monitor?: string | null;
      monitorGroup?: string | null;
      name?: string | null;
      networks?: string[] | null;
      notificationEmail?: string | null;
      notificationFilter?: unknown | null;
      originSteering?: unknown | null;
      origins?: unknown[] | null;
    },
    ListPoolsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPoolsRequest,
  output: ListPoolsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreatePoolRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed. */
  name: string;
  /** Body param: The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy. */
  origins: unknown[];
  /** Body param: A human-readable description of the pool. */
  description?: string;
  /** Body param: Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it t */
  enabled?: boolean;
  /** Body param: The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set. */
  latitude?: number;
  /** Body param: Configures load shedding policies and percentages for the pool. */
  loadShedding?: unknown | null;
  /** Body param: The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set. */
  longitude?: number;
  /** Body param: The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will fail */
  minimumOrigins?: number;
  /** Body param: The ID of the Monitor to use for checking the health of origins within this pool. */
  monitor?: string;
  /** Body param: The ID of the Monitor Group to use for checking the health of origins within this pool. */
  monitorGroup?: string;
  /** Body param: This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send he */
  notificationEmail?: string;
  /** Body param: Filter pool and origin health notifications by resource type or health status. Use null to reset. */
  notificationFilter?: unknown | null;
  /** Body param: Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity. */
  originSteering?: unknown | null;
}

export const CreatePoolRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  origins: Schema.Array(Schema.Unknown),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  latitude: Schema.optional(Schema.Number),
  loadShedding: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  longitude: Schema.optional(Schema.Number),
  minimumOrigins: Schema.optional(Schema.Number),
  monitor: Schema.optional(Schema.String),
  monitorGroup: Schema.optional(Schema.String),
  notificationEmail: Schema.optional(Schema.String),
  notificationFilter: Schema.optional(
    Schema.Union([Schema.Unknown, Schema.Null]),
  ),
  originSteering: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    origins: "origins",
    description: "description",
    enabled: "enabled",
    latitude: "latitude",
    loadShedding: "load_shedding",
    longitude: "longitude",
    minimumOrigins: "minimum_origins",
    monitor: "monitor",
    monitorGroup: "monitor_group",
    notificationEmail: "notification_email",
    notificationFilter: "notification_filter",
    originSteering: "origin_steering",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/load_balancers/pools",
  }),
) as unknown as Schema.Schema<CreatePoolRequest>;

export interface CreatePoolResponse {
  id?: string | null;
  /** A list of regions from which to run health checks. Null means every Cloudflare data center. */
  checkRegions?:
    | (
        | "WNAM"
        | "ENAM"
        | "WEU"
        | "EEU"
        | "NSAM"
        | "SSAM"
        | "OC"
        | "ME"
        | "NAF"
        | "SAF"
        | "SEAS"
        | "NEAS"
        | "ALL_REGIONS"
        | "SAS"
      )[]
    | null;
  createdOn?: string | null;
  /** A human-readable description of the pool. */
  description?: string | null;
  /** This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at. */
  disabledAt?: string | null;
  /** Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover t */
  enabled?: boolean | null;
  /** The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set. */
  latitude?: number | null;
  /** Configures load shedding policies and percentages for the pool. */
  loadShedding?: unknown | null;
  /** The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set. */
  longitude?: number | null;
  /** The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the  */
  minimumOrigins?: number | null;
  modifiedOn?: string | null;
  /** The ID of the Monitor to use for checking the health of origins within this pool. */
  monitor?: string | null;
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  monitorGroup?: string | null;
  /** A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed. */
  name?: string | null;
  /** List of networks where Load Balancer or Pool is enabled. */
  networks?: string[] | null;
  /** This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send health status  */
  notificationEmail?: string | null;
  /** Filter pool and origin health notifications by resource type or health status. Use null to reset. */
  notificationFilter?: unknown | null;
  /** Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity. */
  originSteering?: unknown | null;
  /** The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy. */
  origins?: unknown[] | null;
}

export const CreatePoolResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  checkRegions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Literals([
          "WNAM",
          "ENAM",
          "WEU",
          "EEU",
          "NSAM",
          "SSAM",
          "OC",
          "ME",
          "NAF",
          "SAF",
          "SEAS",
          "NEAS",
          "ALL_REGIONS",
          "SAS",
        ]),
      ),
      Schema.Null,
    ]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  disabledAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  latitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  loadShedding: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  longitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  minimumOrigins: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  monitor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  monitorGroup: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  networks: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  notificationEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  notificationFilter: Schema.optional(
    Schema.Union([Schema.Unknown, Schema.Null]),
  ),
  originSteering: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  origins: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      checkRegions: "check_regions",
      createdOn: "created_on",
      description: "description",
      disabledAt: "disabled_at",
      enabled: "enabled",
      latitude: "latitude",
      loadShedding: "load_shedding",
      longitude: "longitude",
      minimumOrigins: "minimum_origins",
      modifiedOn: "modified_on",
      monitor: "monitor",
      monitorGroup: "monitor_group",
      name: "name",
      networks: "networks",
      notificationEmail: "notification_email",
      notificationFilter: "notification_filter",
      originSteering: "origin_steering",
      origins: "origins",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreatePoolResponse>;

export type CreatePoolError = DefaultErrors;

export const createPool: API.OperationMethod<
  CreatePoolRequest,
  CreatePoolResponse,
  CreatePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePoolRequest,
  output: CreatePoolResponse,
  errors: [],
}));

export interface UpdatePoolRequest {
  poolId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed. */
  name: string;
  /** Body param: The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy. */
  origins: unknown[];
  /** Body param: A list of regions from which to run health checks. Null means every Cloudflare data center. */
  checkRegions?:
    | (
        | "WNAM"
        | "ENAM"
        | "WEU"
        | "EEU"
        | "NSAM"
        | "SSAM"
        | "OC"
        | "ME"
        | "NAF"
        | "SAF"
        | "SEAS"
        | "NEAS"
        | "ALL_REGIONS"
        | "SAS"
      )[]
    | null;
  /** Body param: A human-readable description of the pool. */
  description?: string;
  /** Body param: Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it t */
  enabled?: boolean;
  /** Body param: The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set. */
  latitude?: number;
  /** Body param: Configures load shedding policies and percentages for the pool. */
  loadShedding?: unknown | null;
  /** Body param: The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set. */
  longitude?: number;
  /** Body param: The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will fail */
  minimumOrigins?: number;
  /** Body param: The ID of the Monitor to use for checking the health of origins within this pool. */
  monitor?: string;
  /** Body param: The ID of the Monitor Group to use for checking the health of origins within this pool. */
  monitorGroup?: string;
  /** Body param: This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send he */
  notificationEmail?: string;
  /** Body param: Filter pool and origin health notifications by resource type or health status. Use null to reset. */
  notificationFilter?: unknown | null;
  /** Body param: Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity. */
  originSteering?: unknown | null;
}

export const UpdatePoolRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  poolId: Schema.String.pipe(T.HttpPath("poolId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  origins: Schema.Array(Schema.Unknown),
  checkRegions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Literals([
          "WNAM",
          "ENAM",
          "WEU",
          "EEU",
          "NSAM",
          "SSAM",
          "OC",
          "ME",
          "NAF",
          "SAF",
          "SEAS",
          "NEAS",
          "ALL_REGIONS",
          "SAS",
        ]),
      ),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  latitude: Schema.optional(Schema.Number),
  loadShedding: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  longitude: Schema.optional(Schema.Number),
  minimumOrigins: Schema.optional(Schema.Number),
  monitor: Schema.optional(Schema.String),
  monitorGroup: Schema.optional(Schema.String),
  notificationEmail: Schema.optional(Schema.String),
  notificationFilter: Schema.optional(
    Schema.Union([Schema.Unknown, Schema.Null]),
  ),
  originSteering: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    origins: "origins",
    checkRegions: "check_regions",
    description: "description",
    enabled: "enabled",
    latitude: "latitude",
    loadShedding: "load_shedding",
    longitude: "longitude",
    minimumOrigins: "minimum_origins",
    monitor: "monitor",
    monitorGroup: "monitor_group",
    notificationEmail: "notification_email",
    notificationFilter: "notification_filter",
    originSteering: "origin_steering",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/load_balancers/pools/{poolId}",
  }),
) as unknown as Schema.Schema<UpdatePoolRequest>;

export interface UpdatePoolResponse {
  id?: string | null;
  /** A list of regions from which to run health checks. Null means every Cloudflare data center. */
  checkRegions?:
    | (
        | "WNAM"
        | "ENAM"
        | "WEU"
        | "EEU"
        | "NSAM"
        | "SSAM"
        | "OC"
        | "ME"
        | "NAF"
        | "SAF"
        | "SEAS"
        | "NEAS"
        | "ALL_REGIONS"
        | "SAS"
      )[]
    | null;
  createdOn?: string | null;
  /** A human-readable description of the pool. */
  description?: string | null;
  /** This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at. */
  disabledAt?: string | null;
  /** Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover t */
  enabled?: boolean | null;
  /** The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set. */
  latitude?: number | null;
  /** Configures load shedding policies and percentages for the pool. */
  loadShedding?: unknown | null;
  /** The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set. */
  longitude?: number | null;
  /** The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the  */
  minimumOrigins?: number | null;
  modifiedOn?: string | null;
  /** The ID of the Monitor to use for checking the health of origins within this pool. */
  monitor?: string | null;
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  monitorGroup?: string | null;
  /** A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed. */
  name?: string | null;
  /** List of networks where Load Balancer or Pool is enabled. */
  networks?: string[] | null;
  /** This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send health status  */
  notificationEmail?: string | null;
  /** Filter pool and origin health notifications by resource type or health status. Use null to reset. */
  notificationFilter?: unknown | null;
  /** Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity. */
  originSteering?: unknown | null;
  /** The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy. */
  origins?: unknown[] | null;
}

export const UpdatePoolResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  checkRegions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Literals([
          "WNAM",
          "ENAM",
          "WEU",
          "EEU",
          "NSAM",
          "SSAM",
          "OC",
          "ME",
          "NAF",
          "SAF",
          "SEAS",
          "NEAS",
          "ALL_REGIONS",
          "SAS",
        ]),
      ),
      Schema.Null,
    ]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  disabledAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  latitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  loadShedding: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  longitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  minimumOrigins: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  monitor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  monitorGroup: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  networks: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  notificationEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  notificationFilter: Schema.optional(
    Schema.Union([Schema.Unknown, Schema.Null]),
  ),
  originSteering: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  origins: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      checkRegions: "check_regions",
      createdOn: "created_on",
      description: "description",
      disabledAt: "disabled_at",
      enabled: "enabled",
      latitude: "latitude",
      loadShedding: "load_shedding",
      longitude: "longitude",
      minimumOrigins: "minimum_origins",
      modifiedOn: "modified_on",
      monitor: "monitor",
      monitorGroup: "monitor_group",
      name: "name",
      networks: "networks",
      notificationEmail: "notification_email",
      notificationFilter: "notification_filter",
      originSteering: "origin_steering",
      origins: "origins",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdatePoolResponse>;

export type UpdatePoolError = DefaultErrors;

export const updatePool: API.OperationMethod<
  UpdatePoolRequest,
  UpdatePoolResponse,
  UpdatePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePoolRequest,
  output: UpdatePoolResponse,
  errors: [],
}));

export interface PatchPoolRequest {
  poolId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A list of regions from which to run health checks. Null means every Cloudflare data center. */
  checkRegions?:
    | (
        | "WNAM"
        | "ENAM"
        | "WEU"
        | "EEU"
        | "NSAM"
        | "SSAM"
        | "OC"
        | "ME"
        | "NAF"
        | "SAF"
        | "SEAS"
        | "NEAS"
        | "ALL_REGIONS"
        | "SAS"
      )[]
    | null;
  /** Body param: A human-readable description of the pool. */
  description?: string;
  /** Body param: Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it t */
  enabled?: boolean;
  /** Body param: The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set. */
  latitude?: number;
  /** Body param: Configures load shedding policies and percentages for the pool. */
  loadShedding?: unknown | null;
  /** Body param: The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set. */
  longitude?: number;
  /** Body param: The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will fail */
  minimumOrigins?: number;
  /** Body param: The ID of the Monitor to use for checking the health of origins within this pool. */
  monitor?: string;
  /** Body param: The ID of the Monitor Group to use for checking the health of origins within this pool. */
  monitorGroup?: string;
  /** Body param: A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed. */
  name?: string;
  /** Body param: This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send he */
  notificationEmail?: string;
  /** Body param: Filter pool and origin health notifications by resource type or health status. Use null to reset. */
  notificationFilter?: unknown | null;
  /** Body param: Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity. */
  originSteering?: unknown | null;
  /** Body param: The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy. */
  origins?: unknown[];
}

export const PatchPoolRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  poolId: Schema.String.pipe(T.HttpPath("poolId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  checkRegions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Literals([
          "WNAM",
          "ENAM",
          "WEU",
          "EEU",
          "NSAM",
          "SSAM",
          "OC",
          "ME",
          "NAF",
          "SAF",
          "SEAS",
          "NEAS",
          "ALL_REGIONS",
          "SAS",
        ]),
      ),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  latitude: Schema.optional(Schema.Number),
  loadShedding: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  longitude: Schema.optional(Schema.Number),
  minimumOrigins: Schema.optional(Schema.Number),
  monitor: Schema.optional(Schema.String),
  monitorGroup: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  notificationEmail: Schema.optional(Schema.String),
  notificationFilter: Schema.optional(
    Schema.Union([Schema.Unknown, Schema.Null]),
  ),
  originSteering: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  origins: Schema.optional(Schema.Array(Schema.Unknown)),
}).pipe(
  Schema.encodeKeys({
    checkRegions: "check_regions",
    description: "description",
    enabled: "enabled",
    latitude: "latitude",
    loadShedding: "load_shedding",
    longitude: "longitude",
    minimumOrigins: "minimum_origins",
    monitor: "monitor",
    monitorGroup: "monitor_group",
    name: "name",
    notificationEmail: "notification_email",
    notificationFilter: "notification_filter",
    originSteering: "origin_steering",
    origins: "origins",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/load_balancers/pools/{poolId}",
  }),
) as unknown as Schema.Schema<PatchPoolRequest>;

export interface PatchPoolResponse {
  id?: string | null;
  /** A list of regions from which to run health checks. Null means every Cloudflare data center. */
  checkRegions?:
    | (
        | "WNAM"
        | "ENAM"
        | "WEU"
        | "EEU"
        | "NSAM"
        | "SSAM"
        | "OC"
        | "ME"
        | "NAF"
        | "SAF"
        | "SEAS"
        | "NEAS"
        | "ALL_REGIONS"
        | "SAS"
      )[]
    | null;
  createdOn?: string | null;
  /** A human-readable description of the pool. */
  description?: string | null;
  /** This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at. */
  disabledAt?: string | null;
  /** Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover t */
  enabled?: boolean | null;
  /** The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set. */
  latitude?: number | null;
  /** Configures load shedding policies and percentages for the pool. */
  loadShedding?: unknown | null;
  /** The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set. */
  longitude?: number | null;
  /** The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the  */
  minimumOrigins?: number | null;
  modifiedOn?: string | null;
  /** The ID of the Monitor to use for checking the health of origins within this pool. */
  monitor?: string | null;
  /** The ID of the Monitor Group to use for checking the health of origins within this pool. */
  monitorGroup?: string | null;
  /** A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed. */
  name?: string | null;
  /** List of networks where Load Balancer or Pool is enabled. */
  networks?: string[] | null;
  /** This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send health status  */
  notificationEmail?: string | null;
  /** Filter pool and origin health notifications by resource type or health status. Use null to reset. */
  notificationFilter?: unknown | null;
  /** Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity. */
  originSteering?: unknown | null;
  /** The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy. */
  origins?: unknown[] | null;
}

export const PatchPoolResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  checkRegions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Literals([
          "WNAM",
          "ENAM",
          "WEU",
          "EEU",
          "NSAM",
          "SSAM",
          "OC",
          "ME",
          "NAF",
          "SAF",
          "SEAS",
          "NEAS",
          "ALL_REGIONS",
          "SAS",
        ]),
      ),
      Schema.Null,
    ]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  disabledAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  latitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  loadShedding: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  longitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  minimumOrigins: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  monitor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  monitorGroup: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  networks: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  notificationEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  notificationFilter: Schema.optional(
    Schema.Union([Schema.Unknown, Schema.Null]),
  ),
  originSteering: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  origins: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      checkRegions: "check_regions",
      createdOn: "created_on",
      description: "description",
      disabledAt: "disabled_at",
      enabled: "enabled",
      latitude: "latitude",
      loadShedding: "load_shedding",
      longitude: "longitude",
      minimumOrigins: "minimum_origins",
      modifiedOn: "modified_on",
      monitor: "monitor",
      monitorGroup: "monitor_group",
      name: "name",
      networks: "networks",
      notificationEmail: "notification_email",
      notificationFilter: "notification_filter",
      originSteering: "origin_steering",
      origins: "origins",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchPoolResponse>;

export type PatchPoolError = DefaultErrors;

export const patchPool: API.OperationMethod<
  PatchPoolRequest,
  PatchPoolResponse,
  PatchPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchPoolRequest,
  output: PatchPoolResponse,
  errors: [],
}));

export interface DeletePoolRequest {
  poolId: string;
  /** Identifier. */
  accountId: string;
}

export const DeletePoolRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  poolId: Schema.String.pipe(T.HttpPath("poolId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/load_balancers/pools/{poolId}",
  }),
) as unknown as Schema.Schema<DeletePoolRequest>;

export interface DeletePoolResponse {
  id?: string | null;
}

export const DeletePoolResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<DeletePoolResponse>;

export type DeletePoolError = DefaultErrors;

export const deletePool: API.OperationMethod<
  DeletePoolRequest,
  DeletePoolResponse,
  DeletePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePoolRequest,
  output: DeletePoolResponse,
  errors: [],
}));

export interface BulkPatchPoolsRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The email address to send health status notifications to. This field is now deprecated in favor of Cloudflare Notifications for Load Balancing, so only resetting this field with an empty s */
  notificationEmail?: "";
}

export const BulkPatchPoolsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  notificationEmail: Schema.optional(Schema.Literal("")),
}).pipe(
  Schema.encodeKeys({ notificationEmail: "notification_email" }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/load_balancers/pools",
  }),
) as unknown as Schema.Schema<BulkPatchPoolsRequest>;

export interface BulkPatchPoolsResponse {
  result: {
    id?: string | null;
    checkRegions?:
      | (
          | "WNAM"
          | "ENAM"
          | "WEU"
          | "EEU"
          | "NSAM"
          | "SSAM"
          | "OC"
          | "ME"
          | "NAF"
          | "SAF"
          | "SEAS"
          | "NEAS"
          | "ALL_REGIONS"
          | "SAS"
        )[]
      | null;
    createdOn?: string | null;
    description?: string | null;
    disabledAt?: string | null;
    enabled?: boolean | null;
    latitude?: number | null;
    loadShedding?: unknown | null;
    longitude?: number | null;
    minimumOrigins?: number | null;
    modifiedOn?: string | null;
    monitor?: string | null;
    monitorGroup?: string | null;
    name?: string | null;
    networks?: string[] | null;
    notificationEmail?: string | null;
    notificationFilter?: unknown | null;
    originSteering?: unknown | null;
    origins?: unknown[] | null;
  }[];
}

export const BulkPatchPoolsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        checkRegions: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "WNAM",
                "ENAM",
                "WEU",
                "EEU",
                "NSAM",
                "SSAM",
                "OC",
                "ME",
                "NAF",
                "SAF",
                "SEAS",
                "NEAS",
                "ALL_REGIONS",
                "SAS",
              ]),
            ),
            Schema.Null,
          ]),
        ),
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        disabledAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        latitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        loadShedding: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        longitude: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        minimumOrigins: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        monitor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        monitorGroup: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        networks: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        notificationEmail: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        notificationFilter: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        originSteering: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        origins: Schema.optional(
          Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          checkRegions: "check_regions",
          createdOn: "created_on",
          description: "description",
          disabledAt: "disabled_at",
          enabled: "enabled",
          latitude: "latitude",
          loadShedding: "load_shedding",
          longitude: "longitude",
          minimumOrigins: "minimum_origins",
          modifiedOn: "modified_on",
          monitor: "monitor",
          monitorGroup: "monitor_group",
          name: "name",
          networks: "networks",
          notificationEmail: "notification_email",
          notificationFilter: "notification_filter",
          originSteering: "origin_steering",
          origins: "origins",
        }),
      ),
    ),
  },
) as unknown as Schema.Schema<BulkPatchPoolsResponse>;

export type BulkPatchPoolsError = DefaultErrors;

export const bulkPatchPools: API.PaginatedOperationMethod<
  BulkPatchPoolsRequest,
  BulkPatchPoolsResponse,
  BulkPatchPoolsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: BulkPatchPoolsRequest,
  ) => stream.Stream<
    BulkPatchPoolsResponse,
    BulkPatchPoolsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: BulkPatchPoolsRequest) => stream.Stream<
    {
      id?: string | null;
      checkRegions?:
        | (
            | "WNAM"
            | "ENAM"
            | "WEU"
            | "EEU"
            | "NSAM"
            | "SSAM"
            | "OC"
            | "ME"
            | "NAF"
            | "SAF"
            | "SEAS"
            | "NEAS"
            | "ALL_REGIONS"
            | "SAS"
          )[]
        | null;
      createdOn?: string | null;
      description?: string | null;
      disabledAt?: string | null;
      enabled?: boolean | null;
      latitude?: number | null;
      loadShedding?: unknown | null;
      longitude?: number | null;
      minimumOrigins?: number | null;
      modifiedOn?: string | null;
      monitor?: string | null;
      monitorGroup?: string | null;
      name?: string | null;
      networks?: string[] | null;
      notificationEmail?: string | null;
      notificationFilter?: unknown | null;
      originSteering?: unknown | null;
      origins?: unknown[] | null;
    },
    BulkPatchPoolsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: BulkPatchPoolsRequest,
  output: BulkPatchPoolsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// PoolHealth
// =============================================================================

export interface GetPoolHealthRequest {
  poolId: string;
  /** Identifier. */
  accountId: string;
}

export const GetPoolHealthRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  poolId: Schema.String.pipe(T.HttpPath("poolId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/pools/{poolId}/health",
  }),
) as unknown as Schema.Schema<GetPoolHealthRequest>;

export interface GetPoolHealthResponse {
  /** Pool ID. */
  poolId?: string | null;
  /** List of regions and associated health status. */
  popHealth?: {
    healthy?: boolean | null;
    origins?:
      | {
          ip?: {
            failureReason?: string | null;
            healthy?: boolean | null;
            responseCode?: number | null;
            rtt?: string | null;
          } | null;
        }[]
      | null;
  } | null;
}

export const GetPoolHealthResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  poolId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  popHealth: Schema.optional(
    Schema.Union([
      Schema.Struct({
        healthy: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        origins: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                ip: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      failureReason: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      healthy: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      responseCode: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      rtt: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        failureReason: "failure_reason",
                        healthy: "healthy",
                        responseCode: "response_code",
                        rtt: "rtt",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
  ),
})
  .pipe(Schema.encodeKeys({ poolId: "pool_id", popHealth: "pop_health" }))
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetPoolHealthResponse>;

export type GetPoolHealthError = DefaultErrors;

export const getPoolHealth: API.OperationMethod<
  GetPoolHealthRequest,
  GetPoolHealthResponse,
  GetPoolHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPoolHealthRequest,
  output: GetPoolHealthResponse,
  errors: [],
}));

export interface CreatePoolHealthRequest {
  poolId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors. */
  allowInsecure?: boolean;
  /** Body param: To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times. */
  consecutiveDown?: number;
  /** Body param: To be marked healthy the monitored origin must pass this healthcheck N consecutive times. */
  consecutiveUp?: number;
  /** Body param: Object description. */
  description?: string;
  /** Body param: A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitor */
  expectedBody?: string;
  /** Body param: The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors. */
  expectedCodes?: string;
  /** Body param: Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors. */
  followRedirects?: boolean;
  /** Body param: The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP  */
  header?: Record<string, unknown>;
  /** Body param: The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations. */
  interval?: number;
  /** Body param: The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks. */
  method?: string;
  /** Body param: The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors. */
  path?: string;
  /** Body param: The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default  */
  port?: number | null;
  /** Body param: Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors. */
  probeZone?: string;
  /** Body param: The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately. */
  retries?: number;
  /** Body param: The timeout (in seconds) before marking the health check as failed. */
  timeout?: number;
  /** Body param: The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'. */
  type?: "http" | "https" | "tcp" | "udp_icmp" | "icmp_ping" | "smtp";
}

export const CreatePoolHealthRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    poolId: Schema.String.pipe(T.HttpPath("poolId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    allowInsecure: Schema.optional(Schema.Boolean),
    consecutiveDown: Schema.optional(Schema.Number),
    consecutiveUp: Schema.optional(Schema.Number),
    description: Schema.optional(Schema.String),
    expectedBody: Schema.optional(Schema.String),
    expectedCodes: Schema.optional(Schema.String),
    followRedirects: Schema.optional(Schema.Boolean),
    header: Schema.optional(Schema.Struct({})),
    interval: Schema.optional(Schema.Number),
    method: Schema.optional(Schema.String),
    path: Schema.optional(Schema.String),
    port: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    probeZone: Schema.optional(Schema.String),
    retries: Schema.optional(Schema.Number),
    timeout: Schema.optional(Schema.Number),
    type: Schema.optional(
      Schema.Literals([
        "http",
        "https",
        "tcp",
        "udp_icmp",
        "icmp_ping",
        "smtp",
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      allowInsecure: "allow_insecure",
      consecutiveDown: "consecutive_down",
      consecutiveUp: "consecutive_up",
      description: "description",
      expectedBody: "expected_body",
      expectedCodes: "expected_codes",
      followRedirects: "follow_redirects",
      header: "header",
      interval: "interval",
      method: "method",
      path: "path",
      port: "port",
      probeZone: "probe_zone",
      retries: "retries",
      timeout: "timeout",
      type: "type",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/load_balancers/pools/{poolId}/preview",
    }),
  ) as unknown as Schema.Schema<CreatePoolHealthRequest>;

export interface CreatePoolHealthResponse {
  /** Monitored pool IDs mapped to their respective names. */
  pools?: Record<string, unknown> | null;
  previewId?: string | null;
}

export const CreatePoolHealthResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pools: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    previewId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(Schema.encodeKeys({ pools: "pools", previewId: "preview_id" }))
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreatePoolHealthResponse>;

export type CreatePoolHealthError = DefaultErrors;

export const createPoolHealth: API.OperationMethod<
  CreatePoolHealthRequest,
  CreatePoolHealthResponse,
  CreatePoolHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePoolHealthRequest,
  output: CreatePoolHealthResponse,
  errors: [],
}));

// =============================================================================
// PoolReference
// =============================================================================

export interface GetPoolReferenceRequest {
  poolId: string;
  /** Identifier. */
  accountId: string;
}

export const GetPoolReferenceRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    poolId: Schema.String.pipe(T.HttpPath("poolId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/load_balancers/pools/{poolId}/references",
    }),
  ) as unknown as Schema.Schema<GetPoolReferenceRequest>;

export interface GetPoolReferenceResponse {
  result: {
    referenceType?: "*" | "referral" | "referrer" | null;
    resourceId?: string | null;
    resourceName?: string | null;
    resourceType?: string | null;
  }[];
}

export const GetPoolReferenceResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        referenceType: Schema.optional(
          Schema.Union([
            Schema.Literals(["*", "referral", "referrer"]),
            Schema.Null,
          ]),
        ),
        resourceId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        resourceName: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        resourceType: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          referenceType: "reference_type",
          resourceId: "resource_id",
          resourceName: "resource_name",
          resourceType: "resource_type",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<GetPoolReferenceResponse>;

export type GetPoolReferenceError = DefaultErrors;

export const getPoolReference: API.PaginatedOperationMethod<
  GetPoolReferenceRequest,
  GetPoolReferenceResponse,
  GetPoolReferenceError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetPoolReferenceRequest,
  ) => stream.Stream<
    GetPoolReferenceResponse,
    GetPoolReferenceError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: GetPoolReferenceRequest) => stream.Stream<
    {
      referenceType?: "*" | "referral" | "referrer" | null;
      resourceId?: string | null;
      resourceName?: string | null;
      resourceType?: string | null;
    },
    GetPoolReferenceError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetPoolReferenceRequest,
  output: GetPoolReferenceResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// Preview
// =============================================================================

export interface GetPreviewRequest {
  previewId: string;
  /** Identifier. */
  accountId: string;
}

export const GetPreviewRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  previewId: Schema.String.pipe(T.HttpPath("previewId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/preview/{previewId}",
  }),
) as unknown as Schema.Schema<GetPreviewRequest>;

export type GetPreviewResponse = Record<string, unknown>;

export const GetPreviewResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetPreviewResponse>;

export type GetPreviewError = DefaultErrors;

export const getPreview: API.OperationMethod<
  GetPreviewRequest,
  GetPreviewResponse,
  GetPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPreviewRequest,
  output: GetPreviewResponse,
  errors: [],
}));

// =============================================================================
// Region
// =============================================================================

export interface GetRegionRequest {
  regionId:
    | "WNAM"
    | "ENAM"
    | "WEU"
    | "EEU"
    | "NSAM"
    | "SSAM"
    | "OC"
    | "ME"
    | "NAF"
    | "SAF"
    | "SAS"
    | "SEAS"
    | "NEAS";
  /** Identifier. */
  accountId: string;
}

export const GetRegionRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  regionId: Schema.Literals([
    "WNAM",
    "ENAM",
    "WEU",
    "EEU",
    "NSAM",
    "SSAM",
    "OC",
    "ME",
    "NAF",
    "SAF",
    "SAS",
    "SEAS",
    "NEAS",
  ]).pipe(T.HttpPath("regionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/regions/{regionId}",
  }),
) as unknown as Schema.Schema<GetRegionRequest>;

export type GetRegionResponse = string | null;

export const GetRegionResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.String,
  Schema.Null,
]).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetRegionResponse>;

export type GetRegionError = DefaultErrors;

export const getRegion: API.OperationMethod<
  GetRegionRequest,
  GetRegionResponse,
  GetRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRegionRequest,
  output: GetRegionResponse,
  errors: [],
}));

export interface ListRegionsRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Two-letter alpha-2 country code followed in ISO 3166-1. */
  countryCodeA2?: string;
  /** Query param: Two-letter subdivision code followed in ISO 3166-2. */
  subdivisionCode?: string;
  /** Query param: Two-letter subdivision code followed in ISO 3166-2. */
  subdivisionCodeA2?: string;
}

export const ListRegionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  countryCodeA2: Schema.optional(Schema.String).pipe(
    T.HttpQuery("country_code_a2"),
  ),
  subdivisionCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("subdivision_code"),
  ),
  subdivisionCodeA2: Schema.optional(Schema.String).pipe(
    T.HttpQuery("subdivision_code_a2"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/regions",
  }),
) as unknown as Schema.Schema<ListRegionsRequest>;

export type ListRegionsResponse = string | null;

export const ListRegionsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.String,
  Schema.Null,
]).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<ListRegionsResponse>;

export type ListRegionsError = DefaultErrors;

export const listRegions: API.OperationMethod<
  ListRegionsRequest,
  ListRegionsResponse,
  ListRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListRegionsRequest,
  output: ListRegionsResponse,
  errors: [],
}));

// =============================================================================
// Search
// =============================================================================

export interface ListSearchesRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Search query term. */
  query?: string;
  /** Query param: The type of references to include. "\ " to include both referral and referrer references. "" to not include any reference information. */
  references?: "" | "*" | "referral" | "referrer";
}

export const ListSearchesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  references: Schema.optional(
    Schema.Literals(["", "*", "referral", "referrer"]),
  ).pipe(T.HttpQuery("references")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/load_balancers/search",
  }),
) as unknown as Schema.Schema<ListSearchesRequest>;

export interface ListSearchesResponse {
  result: {
    items?:
      | {
          resources?:
            | {
                referenceType?: "referral" | "referrer" | null;
                references?: unknown[] | null;
                resourceId?: string | null;
                resourceName?: string | null;
                resourceType?: "load_balancer" | "monitor" | "pool" | null;
              }[]
            | null;
        }[]
      | null;
  };
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListSearchesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Struct({
    items: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            resources: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    referenceType: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["referral", "referrer"]),
                        Schema.Null,
                      ]),
                    ),
                    references: Schema.optional(
                      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
                    ),
                    resourceId: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    resourceName: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    resourceType: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["load_balancer", "monitor", "pool"]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      referenceType: "reference_type",
                      references: "references",
                      resourceId: "resource_id",
                      resourceName: "resource_name",
                      resourceType: "resource_type",
                    }),
                  ),
                ),
                Schema.Null,
              ]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  resultInfo: Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      page: "page",
      perPage: "per_page",
      totalCount: "total_count",
    }),
  ),
}).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListSearchesResponse>;

export type ListSearchesError = DefaultErrors;

export const listSearches: API.PaginatedOperationMethod<
  ListSearchesRequest,
  ListSearchesResponse,
  ListSearchesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSearchesRequest,
  ) => stream.Stream<
    ListSearchesResponse,
    ListSearchesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListSearchesRequest) => stream.Stream<
    {
      resources?:
        | {
            referenceType?: "referral" | "referrer" | null;
            references?: unknown[] | null;
            resourceId?: string | null;
            resourceName?: string | null;
            resourceType?: "load_balancer" | "monitor" | "pool" | null;
          }[]
        | null;
    },
    ListSearchesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSearchesRequest,
  output: ListSearchesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result.items",
    pageSize: "perPage",
  } as const,
}));
