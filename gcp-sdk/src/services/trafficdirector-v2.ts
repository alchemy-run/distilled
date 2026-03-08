// ==========================================================================
// Traffic Director API (trafficdirector v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "trafficdirector",
  version: "v2",
  rootUrl: "https://trafficdirector.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface StaticRouteConfig {
  /** The route config. */
  routeConfig?: Record<string, unknown>;
  /** The timestamp when the Route was last updated. */
  lastUpdated?: string;
}

export const StaticRouteConfig: Schema.Schema<StaticRouteConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      routeConfig: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      lastUpdated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StaticRouteConfig",
  }) as any as Schema.Schema<StaticRouteConfig>;

export interface SemanticVersion {
  patch?: number;
  majorNumber?: number;
  minorNumber?: number;
}

export const SemanticVersion: Schema.Schema<SemanticVersion> = Schema.suspend(
  () =>
    Schema.Struct({
      patch: Schema.optional(Schema.Number),
      majorNumber: Schema.optional(Schema.Number),
      minorNumber: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "SemanticVersion",
}) as any as Schema.Schema<SemanticVersion>;

export interface BuildVersion {
  /** Free-form build information. Envoy defines several well known keys in the source/common/version/version.h file */
  metadata?: Record<string, unknown>;
  /** SemVer version of extension. */
  version?: SemanticVersion;
}

export const BuildVersion: Schema.Schema<BuildVersion> = Schema.suspend(() =>
  Schema.Struct({
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    version: Schema.optional(SemanticVersion),
  }),
).annotate({
  identifier: "BuildVersion",
}) as any as Schema.Schema<BuildVersion>;

export interface Extension {
  /** The version is a property of the extension and maintained independently of other extensions and the Envoy API. This field is not set when extension did not provide version information. */
  version?: BuildVersion;
  /** [#not-implemented-hide:] Type descriptor of extension configuration proto. [#comment: */
  typeDescriptor?: string;
  /** This is the name of the Envoy filter as specified in the Envoy configuration, e.g. envoy.filters.http.router, com.acme.widget. */
  name?: string;
  /** Indicates that the extension is present but was disabled via dynamic configuration. */
  disabled?: boolean;
  /** Category of the extension. Extension category names use reverse DNS notation. For instance "envoy.filters.listener" for Envoy's built-in listener filters or "com.acme.filters.http" for HTTP filters from acme.com vendor. [#comment: */
  category?: string;
}

export const Extension: Schema.Schema<Extension> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(BuildVersion),
    typeDescriptor: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    category: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Extension" }) as any as Schema.Schema<Extension>;

export interface StaticCluster {
  /** The cluster config. */
  cluster?: Record<string, unknown>;
  /** The timestamp when the Cluster was last updated. */
  lastUpdated?: string;
}

export const StaticCluster: Schema.Schema<StaticCluster> = Schema.suspend(() =>
  Schema.Struct({
    cluster: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    lastUpdated: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "StaticCluster",
}) as any as Schema.Schema<StaticCluster>;

export interface DynamicCluster {
  /** The timestamp when the Cluster was last updated. */
  lastUpdated?: string;
  /** This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the cluster was loaded. In the future, discrete per-cluster versions may be supported by the API. */
  versionInfo?: string;
  /** The cluster config. */
  cluster?: Record<string, unknown>;
}

export const DynamicCluster: Schema.Schema<DynamicCluster> = Schema.suspend(
  () =>
    Schema.Struct({
      lastUpdated: Schema.optional(Schema.String),
      versionInfo: Schema.optional(Schema.String),
      cluster: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
).annotate({
  identifier: "DynamicCluster",
}) as any as Schema.Schema<DynamicCluster>;

export interface ClustersConfigDump {
  /** This is the :ref:`version_info ` in the last processed CDS discovery response. If there are only static bootstrap clusters, this field will be "". */
  versionInfo?: string;
  /** The statically loaded cluster configs. */
  staticClusters?: Array<StaticCluster>;
  /** The dynamically loaded active clusters. These are clusters that are available to service data plane traffic. */
  dynamicActiveClusters?: Array<DynamicCluster>;
  /** The dynamically loaded warming clusters. These are clusters that are currently undergoing warming in preparation to service data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the warming clusters should generally be discarded. */
  dynamicWarmingClusters?: Array<DynamicCluster>;
}

export const ClustersConfigDump: Schema.Schema<ClustersConfigDump> =
  Schema.suspend(() =>
    Schema.Struct({
      versionInfo: Schema.optional(Schema.String),
      staticClusters: Schema.optional(Schema.Array(StaticCluster)),
      dynamicActiveClusters: Schema.optional(Schema.Array(DynamicCluster)),
      dynamicWarmingClusters: Schema.optional(Schema.Array(DynamicCluster)),
    }),
  ).annotate({
    identifier: "ClustersConfigDump",
  }) as any as Schema.Schema<ClustersConfigDump>;

export interface Pipe {
  /** The mode for the Pipe. Not applicable for abstract sockets. */
  mode?: number;
  /** Unix Domain Socket path. On Linux, paths starting with '@' will use the abstract namespace. The starting '@' is replaced by a null byte by Envoy. Paths starting with '@' will result in an error in environments other than Linux. */
  path?: string;
}

export const Pipe: Schema.Schema<Pipe> = Schema.suspend(() =>
  Schema.Struct({
    mode: Schema.optional(Schema.Number),
    path: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Pipe" }) as any as Schema.Schema<Pipe>;

export interface SocketAddress {
  protocol?: "TCP" | "UDP" | (string & {});
  /** This is only valid if :ref:`resolver_name ` is specified below and the named resolver is capable of named port resolution. */
  namedPort?: string;
  /** The address for this socket. :ref:`Listeners ` will bind to the address. An empty address is not allowed. Specify ``0.0.0.0`` or ``::`` to bind to any address. [#comment:TODO(zuercher) reinstate when implemented: It is possible to distinguish a Listener address via the prefix/suffix matching in :ref:`FilterChainMatch `.] When used within an upstream :ref:`BindConfig `, the address controls the source address of outbound connections. For :ref:`clusters `, the cluster type determines whether the address must be an IP (*STATIC* or *EDS* clusters) or a hostname resolved by DNS (*STRICT_DNS* or *LOGICAL_DNS* clusters). Address resolution can be customized via :ref:`resolver_name `. */
  address?: string;
  /** The name of the custom resolver. This must have been registered with Envoy. If this is empty, a context dependent default applies. If the address is a concrete IP address, no resolution will occur. If address is a hostname this should be set for resolution other than DNS. Specifying a custom resolver with *STRICT_DNS* or *LOGICAL_DNS* will generate an error at runtime. */
  resolverName?: string;
  /** When binding to an IPv6 address above, this enables `IPv4 compatibility `_. Binding to ``::`` will allow both IPv4 and IPv6 connections, with peer IPv4 addresses mapped into IPv6 space as ``::FFFF:``. */
  ipv4Compat?: boolean;
  portValue?: number;
}

export const SocketAddress: Schema.Schema<SocketAddress> = Schema.suspend(() =>
  Schema.Struct({
    protocol: Schema.optional(Schema.String),
    namedPort: Schema.optional(Schema.String),
    address: Schema.optional(Schema.String),
    resolverName: Schema.optional(Schema.String),
    ipv4Compat: Schema.optional(Schema.Boolean),
    portValue: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "SocketAddress",
}) as any as Schema.Schema<SocketAddress>;

export interface Address {
  pipe?: Pipe;
  socketAddress?: SocketAddress;
}

export const Address: Schema.Schema<Address> = Schema.suspend(() =>
  Schema.Struct({
    pipe: Schema.optional(Pipe),
    socketAddress: Schema.optional(SocketAddress),
  }),
).annotate({ identifier: "Address" }) as any as Schema.Schema<Address>;

export interface DynamicRouteConfig {
  /** This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the route configuration was loaded. */
  versionInfo?: string;
  /** The route config. */
  routeConfig?: Record<string, unknown>;
  /** The timestamp when the Route was last updated. */
  lastUpdated?: string;
}

export const DynamicRouteConfig: Schema.Schema<DynamicRouteConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      versionInfo: Schema.optional(Schema.String),
      routeConfig: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      lastUpdated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DynamicRouteConfig",
  }) as any as Schema.Schema<DynamicRouteConfig>;

export interface RoutesConfigDump {
  /** The dynamically loaded route configs. */
  dynamicRouteConfigs?: Array<DynamicRouteConfig>;
  /** The statically loaded route configs. */
  staticRouteConfigs?: Array<StaticRouteConfig>;
}

export const RoutesConfigDump: Schema.Schema<RoutesConfigDump> = Schema.suspend(
  () =>
    Schema.Struct({
      dynamicRouteConfigs: Schema.optional(Schema.Array(DynamicRouteConfig)),
      staticRouteConfigs: Schema.optional(Schema.Array(StaticRouteConfig)),
    }),
).annotate({
  identifier: "RoutesConfigDump",
}) as any as Schema.Schema<RoutesConfigDump>;

export interface StaticListener {
  /** The listener config. */
  listener?: Record<string, unknown>;
  /** The timestamp when the Listener was last successfully updated. */
  lastUpdated?: string;
}

export const StaticListener: Schema.Schema<StaticListener> = Schema.suspend(
  () =>
    Schema.Struct({
      listener: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      lastUpdated: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "StaticListener",
}) as any as Schema.Schema<StaticListener>;

export interface GoogleRE2 {
  /** This field controls the RE2 "program size" which is a rough estimate of how complex a compiled regex is to evaluate. A regex that has a program size greater than the configured value will fail to compile. In this case, the configured max program size can be increased or the regex can be simplified. If not specified, the default is 100. This field is deprecated; regexp validation should be performed on the management server instead of being done by each individual client. */
  maxProgramSize?: number;
}

export const GoogleRE2: Schema.Schema<GoogleRE2> = Schema.suspend(() =>
  Schema.Struct({
    maxProgramSize: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "GoogleRE2" }) as any as Schema.Schema<GoogleRE2>;

export interface RegexMatcher {
  /** The regex match string. The string must be supported by the configured engine. */
  regex?: string;
  /** Google's RE2 regex engine. */
  googleRe2?: GoogleRE2;
}

export const RegexMatcher: Schema.Schema<RegexMatcher> = Schema.suspend(() =>
  Schema.Struct({
    regex: Schema.optional(Schema.String),
    googleRe2: Schema.optional(GoogleRE2),
  }),
).annotate({
  identifier: "RegexMatcher",
}) as any as Schema.Schema<RegexMatcher>;

export interface InlineScopedRouteConfigs {
  /** The timestamp when the scoped route config set was last updated. */
  lastUpdated?: string;
  /** The scoped route configurations. */
  scopedRouteConfigs?: Array<Record<string, unknown>>;
  /** The name assigned to the scoped route configurations. */
  name?: string;
}

export const InlineScopedRouteConfigs: Schema.Schema<InlineScopedRouteConfigs> =
  Schema.suspend(() =>
    Schema.Struct({
      lastUpdated: Schema.optional(Schema.String),
      scopedRouteConfigs: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InlineScopedRouteConfigs",
  }) as any as Schema.Schema<InlineScopedRouteConfigs>;

export interface Locality {
  /** Defines the local service zone where Envoy is running. Though optional, it should be set if discovery service routing is used and the discovery service exposes :ref:`zone data `, either in this message or via :option:`--service-zone`. The meaning of zone is context dependent, e.g. `Availability Zone (AZ) `_ on AWS, `Zone `_ on GCP, etc. */
  zone?: string;
  /** Region this :ref:`zone ` belongs to. */
  region?: string;
  /** When used for locality of upstream hosts, this field further splits zone into smaller chunks of sub-zones so they can be load balanced independently. */
  subZone?: string;
}

export const Locality: Schema.Schema<Locality> = Schema.suspend(() =>
  Schema.Struct({
    zone: Schema.optional(Schema.String),
    region: Schema.optional(Schema.String),
    subZone: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Locality" }) as any as Schema.Schema<Locality>;

export interface StringMatcher {
  /** The input string must match the regular expression specified here. The regex grammar is defined `here `_. Examples: * The regex ``\d{3}`` matches the value *123* * The regex ``\d{3}`` does not match the value *1234* * The regex ``\d{3}`` does not match the value *123.456* .. attention:: This field has been deprecated in favor of `safe_regex` as it is not safe for use with untrusted input in all cases. */
  regex?: string;
  /** The input string must match exactly the string specified here. Examples: * *abc* only matches the value *abc*. */
  exact?: string;
  /** If true, indicates the exact/prefix/suffix matching should be case insensitive. This has no effect for the safe_regex match. For example, the matcher *data* will match both input string *Data* and *data* if set to true. */
  ignoreCase?: boolean;
  /** The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * *abc* matches the value *abc.xyz* */
  prefix?: string;
  /** The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * *abc* matches the value *xyz.abc* */
  suffix?: string;
  /** The input string must match the regular expression specified here. */
  safeRegex?: RegexMatcher;
}

export const StringMatcher: Schema.Schema<StringMatcher> = Schema.suspend(() =>
  Schema.Struct({
    regex: Schema.optional(Schema.String),
    exact: Schema.optional(Schema.String),
    ignoreCase: Schema.optional(Schema.Boolean),
    prefix: Schema.optional(Schema.String),
    suffix: Schema.optional(Schema.String),
    safeRegex: Schema.optional(RegexMatcher),
  }),
).annotate({
  identifier: "StringMatcher",
}) as any as Schema.Schema<StringMatcher>;

export interface Node {
  /** Locality specifying where the Envoy instance is running. */
  locality?: Locality;
  /** Defines the local service cluster name where Envoy is running. Though optional, it should be set if any of the following features are used: :ref:`statsd `, :ref:`health check cluster verification `, :ref:`runtime override directory `, :ref:`user agent addition `, :ref:`HTTP global rate limiting `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message or via :option:`--service-cluster`. */
  cluster?: string;
  /** List of extensions and their versions supported by the node. */
  extensions?: Array<Extension>;
  /** Opaque metadata extending the node identifier. Envoy will pass this directly to the management server. */
  metadata?: Record<string, unknown>;
  /** Free-form string that identifies the entity requesting config. E.g. "envoy" or "grpc" */
  userAgentName?: string;
  /** This is motivated by informing a management server during canary which version of Envoy is being tested in a heterogeneous fleet. This will be set by Envoy in management server RPCs. This field is deprecated in favor of the user_agent_name and user_agent_version values. */
  buildVersion?: string;
  /** Free-form string that identifies the version of the entity requesting config. E.g. "1.12.2" or "abcd1234", or "SpecialEnvoyBuild" */
  userAgentVersion?: string;
  /** Client feature support list. These are well known features described in the Envoy API repository for a given major version of an API. Client features use reverse DNS naming scheme, for example `com.acme.feature`. See :ref:`the list of features ` that xDS client may support. */
  clientFeatures?: Array<string>;
  /** Known listening ports on the node as a generic hint to the management server for filtering :ref:`listeners ` to be returned. For example, if there is a listener bound to port 80, the list can optionally contain the SocketAddress `(0.0.0.0,80)`. The field is optional and just a hint. */
  listeningAddresses?: Array<Address>;
  /** An opaque node identifier for the Envoy node. This also provides the local service node name. It should be set if any of the following features are used: :ref:`statsd `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message or via :option:`--service-node`. */
  id?: string;
  /** Structured version of the entity requesting config. */
  userAgentBuildVersion?: BuildVersion;
}

export const Node: Schema.Schema<Node> = Schema.suspend(() =>
  Schema.Struct({
    locality: Schema.optional(Locality),
    cluster: Schema.optional(Schema.String),
    extensions: Schema.optional(Schema.Array(Extension)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    userAgentName: Schema.optional(Schema.String),
    buildVersion: Schema.optional(Schema.String),
    userAgentVersion: Schema.optional(Schema.String),
    clientFeatures: Schema.optional(Schema.Array(Schema.String)),
    listeningAddresses: Schema.optional(Schema.Array(Address)),
    id: Schema.optional(Schema.String),
    userAgentBuildVersion: Schema.optional(BuildVersion),
  }),
).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface DynamicListenerState {
  /** The timestamp when the Listener was last successfully updated. */
  lastUpdated?: string;
  /** The listener config. */
  listener?: Record<string, unknown>;
  /** This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the listener was loaded. In the future, discrete per-listener versions may be supported by the API. */
  versionInfo?: string;
}

export const DynamicListenerState: Schema.Schema<DynamicListenerState> =
  Schema.suspend(() =>
    Schema.Struct({
      lastUpdated: Schema.optional(Schema.String),
      listener: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      versionInfo: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DynamicListenerState",
  }) as any as Schema.Schema<DynamicListenerState>;

export interface UpdateFailureState {
  /** What the component configuration would have been if the update had succeeded. */
  failedConfiguration?: Record<string, unknown>;
  /** Time of the latest failed update attempt. */
  lastUpdateAttempt?: string;
  /** Details about the last failed update attempt. */
  details?: string;
}

export const UpdateFailureState: Schema.Schema<UpdateFailureState> =
  Schema.suspend(() =>
    Schema.Struct({
      failedConfiguration: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      lastUpdateAttempt: Schema.optional(Schema.String),
      details: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateFailureState",
  }) as any as Schema.Schema<UpdateFailureState>;

export interface DynamicListener {
  /** The listener state for any active listener by this name. These are listeners that are available to service data plane traffic. */
  activeState?: DynamicListenerState;
  /** The listener state for any warming listener by this name. These are listeners that are currently undergoing warming in preparation to service data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the warming listeners should generally be discarded. */
  warmingState?: DynamicListenerState;
  /** The name or unique id of this listener, pulled from the DynamicListenerState config. */
  name?: string;
  /** The listener state for any draining listener by this name. These are listeners that are currently undergoing draining in preparation to stop servicing data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the draining listeners should generally be discarded. */
  drainingState?: DynamicListenerState;
  /** Set if the last update failed, cleared after the next successful update. */
  errorState?: UpdateFailureState;
}

export const DynamicListener: Schema.Schema<DynamicListener> = Schema.suspend(
  () =>
    Schema.Struct({
      activeState: Schema.optional(DynamicListenerState),
      warmingState: Schema.optional(DynamicListenerState),
      name: Schema.optional(Schema.String),
      drainingState: Schema.optional(DynamicListenerState),
      errorState: Schema.optional(UpdateFailureState),
    }),
).annotate({
  identifier: "DynamicListener",
}) as any as Schema.Schema<DynamicListener>;

export interface ListenersConfigDump {
  /** The statically loaded listener configs. */
  staticListeners?: Array<StaticListener>;
  /** State for any warming, active, or draining listeners. */
  dynamicListeners?: Array<DynamicListener>;
  /** This is the :ref:`version_info ` in the last processed LDS discovery response. If there are only static bootstrap listeners, this field will be "". */
  versionInfo?: string;
}

export const ListenersConfigDump: Schema.Schema<ListenersConfigDump> =
  Schema.suspend(() =>
    Schema.Struct({
      staticListeners: Schema.optional(Schema.Array(StaticListener)),
      dynamicListeners: Schema.optional(Schema.Array(DynamicListener)),
      versionInfo: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListenersConfigDump",
  }) as any as Schema.Schema<ListenersConfigDump>;

export interface DynamicScopedRouteConfigs {
  /** The timestamp when the scoped route config set was last updated. */
  lastUpdated?: string;
  /** The name assigned to the scoped route configurations. */
  name?: string;
  /** The scoped route configurations. */
  scopedRouteConfigs?: Array<Record<string, unknown>>;
  /** This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the scoped routes configuration was loaded. */
  versionInfo?: string;
}

export const DynamicScopedRouteConfigs: Schema.Schema<DynamicScopedRouteConfigs> =
  Schema.suspend(() =>
    Schema.Struct({
      lastUpdated: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      scopedRouteConfigs: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      versionInfo: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DynamicScopedRouteConfigs",
  }) as any as Schema.Schema<DynamicScopedRouteConfigs>;

export interface ScopedRoutesConfigDump {
  /** The dynamically loaded scoped route configs. */
  dynamicScopedRouteConfigs?: Array<DynamicScopedRouteConfigs>;
  /** The statically loaded scoped route configs. */
  inlineScopedRouteConfigs?: Array<InlineScopedRouteConfigs>;
}

export const ScopedRoutesConfigDump: Schema.Schema<ScopedRoutesConfigDump> =
  Schema.suspend(() =>
    Schema.Struct({
      dynamicScopedRouteConfigs: Schema.optional(
        Schema.Array(DynamicScopedRouteConfigs),
      ),
      inlineScopedRouteConfigs: Schema.optional(
        Schema.Array(InlineScopedRouteConfigs),
      ),
    }),
  ).annotate({
    identifier: "ScopedRoutesConfigDump",
  }) as any as Schema.Schema<ScopedRoutesConfigDump>;

export interface PerXdsConfig {
  status?:
    | "UNKNOWN"
    | "SYNCED"
    | "NOT_SENT"
    | "STALE"
    | "ERROR"
    | (string & {});
  routeConfig?: RoutesConfigDump;
  listenerConfig?: ListenersConfigDump;
  scopedRouteConfig?: ScopedRoutesConfigDump;
  clusterConfig?: ClustersConfigDump;
}

export const PerXdsConfig: Schema.Schema<PerXdsConfig> = Schema.suspend(() =>
  Schema.Struct({
    status: Schema.optional(Schema.String),
    routeConfig: Schema.optional(RoutesConfigDump),
    listenerConfig: Schema.optional(ListenersConfigDump),
    scopedRouteConfig: Schema.optional(ScopedRoutesConfigDump),
    clusterConfig: Schema.optional(ClustersConfigDump),
  }),
).annotate({
  identifier: "PerXdsConfig",
}) as any as Schema.Schema<PerXdsConfig>;

export interface ClientConfig {
  /** Node for a particular client. */
  node?: Node;
  xdsConfig?: Array<PerXdsConfig>;
}

export const ClientConfig: Schema.Schema<ClientConfig> = Schema.suspend(() =>
  Schema.Struct({
    node: Schema.optional(Node),
    xdsConfig: Schema.optional(Schema.Array(PerXdsConfig)),
  }),
).annotate({
  identifier: "ClientConfig",
}) as any as Schema.Schema<ClientConfig>;

export interface ClientStatusResponse {
  /** Client configs for the clients specified in the ClientStatusRequest. */
  config?: Array<ClientConfig>;
}

export const ClientStatusResponse: Schema.Schema<ClientStatusResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      config: Schema.optional(Schema.Array(ClientConfig)),
    }),
  ).annotate({
    identifier: "ClientStatusResponse",
  }) as any as Schema.Schema<ClientStatusResponse>;

export interface NullMatch {}

export const NullMatch: Schema.Schema<NullMatch> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "NullMatch" }) as any as Schema.Schema<NullMatch>;

export interface DoubleRange {
  /** start of the range (inclusive) */
  start?: number;
  /** end of the range (exclusive) */
  end?: number;
}

export const DoubleRange: Schema.Schema<DoubleRange> = Schema.suspend(() =>
  Schema.Struct({
    start: Schema.optional(Schema.Number),
    end: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "DoubleRange" }) as any as Schema.Schema<DoubleRange>;

export interface DoubleMatcher {
  /** If specified, the input double value must be equal to the value specified here. */
  exact?: number;
  /** If specified, the input double value must be in the range specified here. Note: The range is using half-open interval semantics [start, end). */
  range?: DoubleRange;
}

export const DoubleMatcher: Schema.Schema<DoubleMatcher> = Schema.suspend(() =>
  Schema.Struct({
    exact: Schema.optional(Schema.Number),
    range: Schema.optional(DoubleRange),
  }),
).annotate({
  identifier: "DoubleMatcher",
}) as any as Schema.Schema<DoubleMatcher>;

export interface ListMatcher {
  /** If specified, at least one of the values in the list must match the value specified. */
  oneOf?: ValueMatcher;
}

export const ListMatcher: Schema.Schema<ListMatcher> = Schema.suspend(() =>
  Schema.Struct({
    oneOf: Schema.optional(ValueMatcher),
  }),
).annotate({ identifier: "ListMatcher" }) as any as Schema.Schema<ListMatcher>;

export interface ValueMatcher {
  /** If specified, a match occurs if and only if the target value is a NullValue. */
  nullMatch?: NullMatch;
  /** If specified, a match occurs if and only if the target value is a double value and is matched to this field. */
  doubleMatch?: DoubleMatcher;
  /** If specified, value match will be performed based on whether the path is referring to a valid primitive value in the metadata. If the path is referring to a non-primitive value, the result is always not matched. */
  presentMatch?: boolean;
  /** If specified, a match occurs if and only if the target value is a string value and is matched to this field. */
  stringMatch?: StringMatcher;
  /** If specified, a match occurs if and only if the target value is a list value and is matched to this field. */
  listMatch?: ListMatcher;
  /** If specified, a match occurs if and only if the target value is a bool value and is equal to this field. */
  boolMatch?: boolean;
}

export const ValueMatcher: Schema.Schema<ValueMatcher> = Schema.suspend(() =>
  Schema.Struct({
    nullMatch: Schema.optional(NullMatch),
    doubleMatch: Schema.optional(DoubleMatcher),
    presentMatch: Schema.optional(Schema.Boolean),
    stringMatch: Schema.optional(StringMatcher),
    listMatch: Schema.optional(ListMatcher),
    boolMatch: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "ValueMatcher",
}) as any as Schema.Schema<ValueMatcher>;

export interface PathSegment {
  /** If specified, use the key to retrieve the value in a Struct. */
  key?: string;
}

export const PathSegment: Schema.Schema<PathSegment> = Schema.suspend(() =>
  Schema.Struct({
    key: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "PathSegment" }) as any as Schema.Schema<PathSegment>;

export interface StructMatcher {
  /** The StructMatcher is matched if the value retrieved by path is matched to this value. */
  value?: ValueMatcher;
  /** The path to retrieve the Value from the Struct. */
  path?: Array<PathSegment>;
}

export const StructMatcher: Schema.Schema<StructMatcher> = Schema.suspend(() =>
  Schema.Struct({
    value: Schema.optional(ValueMatcher),
    path: Schema.optional(Schema.Array(PathSegment)),
  }),
).annotate({
  identifier: "StructMatcher",
}) as any as Schema.Schema<StructMatcher>;

export interface NodeMatcher {
  /** Specifies match criteria on the node metadata. */
  nodeMetadatas?: Array<StructMatcher>;
  /** Specifies match criteria on the node id. */
  nodeId?: StringMatcher;
}

export const NodeMatcher: Schema.Schema<NodeMatcher> = Schema.suspend(() =>
  Schema.Struct({
    nodeMetadatas: Schema.optional(Schema.Array(StructMatcher)),
    nodeId: Schema.optional(StringMatcher),
  }),
).annotate({ identifier: "NodeMatcher" }) as any as Schema.Schema<NodeMatcher>;

export interface ClientStatusRequest {
  /** Management server can use these match criteria to identify clients. The match follows OR semantics. */
  nodeMatchers?: Array<NodeMatcher>;
}

export const ClientStatusRequest: Schema.Schema<ClientStatusRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeMatchers: Schema.optional(Schema.Array(NodeMatcher)),
    }),
  ).annotate({
    identifier: "ClientStatusRequest",
  }) as any as Schema.Schema<ClientStatusRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface Client_statusDiscoveryRequest {
  /** Request body */
  body?: ClientStatusRequest;
}

export const Client_statusDiscoveryRequest = Schema.Struct({
  body: Schema.optional(ClientStatusRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/discovery:client_status", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Client_statusDiscoveryRequest>;

export type Client_statusDiscoveryResponse = ClientStatusResponse;
export const Client_statusDiscoveryResponse = ClientStatusResponse;

export type Client_statusDiscoveryError = DefaultErrors;

export const client_statusDiscovery: API.OperationMethod<
  Client_statusDiscoveryRequest,
  Client_statusDiscoveryResponse,
  Client_statusDiscoveryError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: Client_statusDiscoveryRequest,
  output: Client_statusDiscoveryResponse,
  errors: [],
}));
