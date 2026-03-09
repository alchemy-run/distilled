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

export interface DynamicRouteConfig {
  /** The route config. */
  routeConfig?: Record<string, unknown>;
  /** This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the route configuration was loaded. */
  versionInfo?: string;
  /** The timestamp when the Route was last updated. */
  lastUpdated?: string;
}

export const DynamicRouteConfig: Schema.Schema<DynamicRouteConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      routeConfig: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      versionInfo: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DynamicRouteConfig",
  }) as any as Schema.Schema<DynamicRouteConfig>;

export interface PathSegment {
  /** If specified, use the key to retrieve the value in a Struct. */
  key?: string;
}

export const PathSegment: Schema.Schema<PathSegment> = Schema.suspend(() =>
  Schema.Struct({
    key: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "PathSegment" }) as any as Schema.Schema<PathSegment>;

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

export interface NullMatch {}

export const NullMatch: Schema.Schema<NullMatch> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "NullMatch" }) as any as Schema.Schema<NullMatch>;

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
  /** Google's RE2 regex engine. */
  googleRe2?: GoogleRE2;
  /** The regex match string. The string must be supported by the configured engine. */
  regex?: string;
}

export const RegexMatcher: Schema.Schema<RegexMatcher> = Schema.suspend(() =>
  Schema.Struct({
    googleRe2: Schema.optional(GoogleRE2),
    regex: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "RegexMatcher",
}) as any as Schema.Schema<RegexMatcher>;

export interface StringMatcher {
  /** The input string must match the regular expression specified here. The regex grammar is defined `here `_. Examples: * The regex ``\d{3}`` matches the value *123* * The regex ``\d{3}`` does not match the value *1234* * The regex ``\d{3}`` does not match the value *123.456* .. attention:: This field has been deprecated in favor of `safe_regex` as it is not safe for use with untrusted input in all cases. */
  regex?: string;
  /** The input string must match exactly the string specified here. Examples: * *abc* only matches the value *abc*. */
  exact?: string;
  /** The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * *abc* matches the value *xyz.abc* */
  suffix?: string;
  /** If true, indicates the exact/prefix/suffix matching should be case insensitive. This has no effect for the safe_regex match. For example, the matcher *data* will match both input string *Data* and *data* if set to true. */
  ignoreCase?: boolean;
  /** The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * *abc* matches the value *abc.xyz* */
  prefix?: string;
  /** The input string must match the regular expression specified here. */
  safeRegex?: RegexMatcher;
}

export const StringMatcher: Schema.Schema<StringMatcher> = Schema.suspend(() =>
  Schema.Struct({
    regex: Schema.optional(Schema.String),
    exact: Schema.optional(Schema.String),
    suffix: Schema.optional(Schema.String),
    ignoreCase: Schema.optional(Schema.Boolean),
    prefix: Schema.optional(Schema.String),
    safeRegex: Schema.optional(RegexMatcher),
  }),
).annotate({
  identifier: "StringMatcher",
}) as any as Schema.Schema<StringMatcher>;

export interface ValueMatcher {
  /** If specified, a match occurs if and only if the target value is a double value and is matched to this field. */
  doubleMatch?: DoubleMatcher;
  /** If specified, a match occurs if and only if the target value is a list value and is matched to this field. */
  listMatch?: ListMatcher;
  /** If specified, a match occurs if and only if the target value is a bool value and is equal to this field. */
  boolMatch?: boolean;
  /** If specified, a match occurs if and only if the target value is a NullValue. */
  nullMatch?: NullMatch;
  /** If specified, value match will be performed based on whether the path is referring to a valid primitive value in the metadata. If the path is referring to a non-primitive value, the result is always not matched. */
  presentMatch?: boolean;
  /** If specified, a match occurs if and only if the target value is a string value and is matched to this field. */
  stringMatch?: StringMatcher;
}

export const ValueMatcher: Schema.Schema<ValueMatcher> = Schema.suspend(() =>
  Schema.Struct({
    doubleMatch: Schema.optional(DoubleMatcher),
    listMatch: Schema.optional(ListMatcher),
    boolMatch: Schema.optional(Schema.Boolean),
    nullMatch: Schema.optional(NullMatch),
    presentMatch: Schema.optional(Schema.Boolean),
    stringMatch: Schema.optional(StringMatcher),
  }),
).annotate({
  identifier: "ValueMatcher",
}) as any as Schema.Schema<ValueMatcher>;

export interface StructMatcher {
  /** The path to retrieve the Value from the Struct. */
  path?: Array<PathSegment>;
  /** The StructMatcher is matched if the value retrieved by path is matched to this value. */
  value?: ValueMatcher;
}

export const StructMatcher: Schema.Schema<StructMatcher> = Schema.suspend(() =>
  Schema.Struct({
    path: Schema.optional(Schema.Array(PathSegment)),
    value: Schema.optional(ValueMatcher),
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

export interface Locality {
  /** Region this :ref:`zone ` belongs to. */
  region?: string;
  /** When used for locality of upstream hosts, this field further splits zone into smaller chunks of sub-zones so they can be load balanced independently. */
  subZone?: string;
  /** Defines the local service zone where Envoy is running. Though optional, it should be set if discovery service routing is used and the discovery service exposes :ref:`zone data `, either in this message or via :option:`--service-zone`. The meaning of zone is context dependent, e.g. `Availability Zone (AZ) `_ on AWS, `Zone `_ on GCP, etc. */
  zone?: string;
}

export const Locality: Schema.Schema<Locality> = Schema.suspend(() =>
  Schema.Struct({
    region: Schema.optional(Schema.String),
    subZone: Schema.optional(Schema.String),
    zone: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Locality" }) as any as Schema.Schema<Locality>;

export interface InlineScopedRouteConfigs {
  /** The name assigned to the scoped route configurations. */
  name?: string;
  /** The scoped route configurations. */
  scopedRouteConfigs?: Array<Record<string, unknown>>;
  /** The timestamp when the scoped route config set was last updated. */
  lastUpdated?: string;
}

export const InlineScopedRouteConfigs: Schema.Schema<InlineScopedRouteConfigs> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      scopedRouteConfigs: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      lastUpdated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InlineScopedRouteConfigs",
  }) as any as Schema.Schema<InlineScopedRouteConfigs>;

export interface DynamicScopedRouteConfigs {
  /** The scoped route configurations. */
  scopedRouteConfigs?: Array<Record<string, unknown>>;
  /** The name assigned to the scoped route configurations. */
  name?: string;
  /** This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the scoped routes configuration was loaded. */
  versionInfo?: string;
  /** The timestamp when the scoped route config set was last updated. */
  lastUpdated?: string;
}

export const DynamicScopedRouteConfigs: Schema.Schema<DynamicScopedRouteConfigs> =
  Schema.suspend(() =>
    Schema.Struct({
      scopedRouteConfigs: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      name: Schema.optional(Schema.String),
      versionInfo: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DynamicScopedRouteConfigs",
  }) as any as Schema.Schema<DynamicScopedRouteConfigs>;

export interface ScopedRoutesConfigDump {
  /** The statically loaded scoped route configs. */
  inlineScopedRouteConfigs?: Array<InlineScopedRouteConfigs>;
  /** The dynamically loaded scoped route configs. */
  dynamicScopedRouteConfigs?: Array<DynamicScopedRouteConfigs>;
}

export const ScopedRoutesConfigDump: Schema.Schema<ScopedRoutesConfigDump> =
  Schema.suspend(() =>
    Schema.Struct({
      inlineScopedRouteConfigs: Schema.optional(
        Schema.Array(InlineScopedRouteConfigs),
      ),
      dynamicScopedRouteConfigs: Schema.optional(
        Schema.Array(DynamicScopedRouteConfigs),
      ),
    }),
  ).annotate({
    identifier: "ScopedRoutesConfigDump",
  }) as any as Schema.Schema<ScopedRoutesConfigDump>;

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

export interface RoutesConfigDump {
  /** The statically loaded route configs. */
  staticRouteConfigs?: Array<StaticRouteConfig>;
  /** The dynamically loaded route configs. */
  dynamicRouteConfigs?: Array<DynamicRouteConfig>;
}

export const RoutesConfigDump: Schema.Schema<RoutesConfigDump> = Schema.suspend(
  () =>
    Schema.Struct({
      staticRouteConfigs: Schema.optional(Schema.Array(StaticRouteConfig)),
      dynamicRouteConfigs: Schema.optional(Schema.Array(DynamicRouteConfig)),
    }),
).annotate({
  identifier: "RoutesConfigDump",
}) as any as Schema.Schema<RoutesConfigDump>;

export interface DynamicListenerState {
  /** This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the listener was loaded. In the future, discrete per-listener versions may be supported by the API. */
  versionInfo?: string;
  /** The listener config. */
  listener?: Record<string, unknown>;
  /** The timestamp when the Listener was last successfully updated. */
  lastUpdated?: string;
}

export const DynamicListenerState: Schema.Schema<DynamicListenerState> =
  Schema.suspend(() =>
    Schema.Struct({
      versionInfo: Schema.optional(Schema.String),
      listener: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      lastUpdated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DynamicListenerState",
  }) as any as Schema.Schema<DynamicListenerState>;

export interface DynamicListener {
  /** The listener state for any draining listener by this name. These are listeners that are currently undergoing draining in preparation to stop servicing data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the draining listeners should generally be discarded. */
  drainingState?: DynamicListenerState;
  /** The listener state for any warming listener by this name. These are listeners that are currently undergoing warming in preparation to service data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the warming listeners should generally be discarded. */
  warmingState?: DynamicListenerState;
  /** The name or unique id of this listener, pulled from the DynamicListenerState config. */
  name?: string;
  /** The listener state for any active listener by this name. These are listeners that are available to service data plane traffic. */
  activeState?: DynamicListenerState;
  /** Set if the last update failed, cleared after the next successful update. */
  errorState?: UpdateFailureState;
}

export const DynamicListener: Schema.Schema<DynamicListener> = Schema.suspend(
  () =>
    Schema.Struct({
      drainingState: Schema.optional(DynamicListenerState),
      warmingState: Schema.optional(DynamicListenerState),
      name: Schema.optional(Schema.String),
      activeState: Schema.optional(DynamicListenerState),
      errorState: Schema.optional(UpdateFailureState),
    }),
).annotate({
  identifier: "DynamicListener",
}) as any as Schema.Schema<DynamicListener>;

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

export interface ListenersConfigDump {
  /** State for any warming, active, or draining listeners. */
  dynamicListeners?: Array<DynamicListener>;
  /** The statically loaded listener configs. */
  staticListeners?: Array<StaticListener>;
  /** This is the :ref:`version_info ` in the last processed LDS discovery response. If there are only static bootstrap listeners, this field will be "". */
  versionInfo?: string;
}

export const ListenersConfigDump: Schema.Schema<ListenersConfigDump> =
  Schema.suspend(() =>
    Schema.Struct({
      dynamicListeners: Schema.optional(Schema.Array(DynamicListener)),
      staticListeners: Schema.optional(Schema.Array(StaticListener)),
      versionInfo: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListenersConfigDump",
  }) as any as Schema.Schema<ListenersConfigDump>;

export interface DynamicCluster {
  /** This is the per-resource version information. This version is currently taken from the :ref:`version_info ` field at the time that the cluster was loaded. In the future, discrete per-cluster versions may be supported by the API. */
  versionInfo?: string;
  /** The cluster config. */
  cluster?: Record<string, unknown>;
  /** The timestamp when the Cluster was last updated. */
  lastUpdated?: string;
}

export const DynamicCluster: Schema.Schema<DynamicCluster> = Schema.suspend(
  () =>
    Schema.Struct({
      versionInfo: Schema.optional(Schema.String),
      cluster: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      lastUpdated: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "DynamicCluster",
}) as any as Schema.Schema<DynamicCluster>;

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

export interface ClustersConfigDump {
  /** This is the :ref:`version_info ` in the last processed CDS discovery response. If there are only static bootstrap clusters, this field will be "". */
  versionInfo?: string;
  /** The dynamically loaded warming clusters. These are clusters that are currently undergoing warming in preparation to service data plane traffic. Note that if attempting to recreate an Envoy configuration from a configuration dump, the warming clusters should generally be discarded. */
  dynamicWarmingClusters?: Array<DynamicCluster>;
  /** The dynamically loaded active clusters. These are clusters that are available to service data plane traffic. */
  dynamicActiveClusters?: Array<DynamicCluster>;
  /** The statically loaded cluster configs. */
  staticClusters?: Array<StaticCluster>;
}

export const ClustersConfigDump: Schema.Schema<ClustersConfigDump> =
  Schema.suspend(() =>
    Schema.Struct({
      versionInfo: Schema.optional(Schema.String),
      dynamicWarmingClusters: Schema.optional(Schema.Array(DynamicCluster)),
      dynamicActiveClusters: Schema.optional(Schema.Array(DynamicCluster)),
      staticClusters: Schema.optional(Schema.Array(StaticCluster)),
    }),
  ).annotate({
    identifier: "ClustersConfigDump",
  }) as any as Schema.Schema<ClustersConfigDump>;

export interface PerXdsConfig {
  routeConfig?: RoutesConfigDump;
  scopedRouteConfig?: ScopedRoutesConfigDump;
  listenerConfig?: ListenersConfigDump;
  clusterConfig?: ClustersConfigDump;
  status?:
    | "UNKNOWN"
    | "SYNCED"
    | "NOT_SENT"
    | "STALE"
    | "ERROR"
    | (string & {});
}

export const PerXdsConfig: Schema.Schema<PerXdsConfig> = Schema.suspend(() =>
  Schema.Struct({
    routeConfig: Schema.optional(RoutesConfigDump),
    scopedRouteConfig: Schema.optional(ScopedRoutesConfigDump),
    listenerConfig: Schema.optional(ListenersConfigDump),
    clusterConfig: Schema.optional(ClustersConfigDump),
    status: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "PerXdsConfig",
}) as any as Schema.Schema<PerXdsConfig>;

export interface SocketAddress {
  /** The name of the custom resolver. This must have been registered with Envoy. If this is empty, a context dependent default applies. If the address is a concrete IP address, no resolution will occur. If address is a hostname this should be set for resolution other than DNS. Specifying a custom resolver with *STRICT_DNS* or *LOGICAL_DNS* will generate an error at runtime. */
  resolverName?: string;
  /** This is only valid if :ref:`resolver_name ` is specified below and the named resolver is capable of named port resolution. */
  namedPort?: string;
  portValue?: number;
  protocol?: "TCP" | "UDP" | (string & {});
  /** The address for this socket. :ref:`Listeners ` will bind to the address. An empty address is not allowed. Specify ``0.0.0.0`` or ``::`` to bind to any address. [#comment:TODO(zuercher) reinstate when implemented: It is possible to distinguish a Listener address via the prefix/suffix matching in :ref:`FilterChainMatch `.] When used within an upstream :ref:`BindConfig `, the address controls the source address of outbound connections. For :ref:`clusters `, the cluster type determines whether the address must be an IP (*STATIC* or *EDS* clusters) or a hostname resolved by DNS (*STRICT_DNS* or *LOGICAL_DNS* clusters). Address resolution can be customized via :ref:`resolver_name `. */
  address?: string;
  /** When binding to an IPv6 address above, this enables `IPv4 compatibility `_. Binding to ``::`` will allow both IPv4 and IPv6 connections, with peer IPv4 addresses mapped into IPv6 space as ``::FFFF:``. */
  ipv4Compat?: boolean;
}

export const SocketAddress: Schema.Schema<SocketAddress> = Schema.suspend(() =>
  Schema.Struct({
    resolverName: Schema.optional(Schema.String),
    namedPort: Schema.optional(Schema.String),
    portValue: Schema.optional(Schema.Number),
    protocol: Schema.optional(Schema.String),
    address: Schema.optional(Schema.String),
    ipv4Compat: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "SocketAddress",
}) as any as Schema.Schema<SocketAddress>;

export interface Pipe {
  /** Unix Domain Socket path. On Linux, paths starting with '@' will use the abstract namespace. The starting '@' is replaced by a null byte by Envoy. Paths starting with '@' will result in an error in environments other than Linux. */
  path?: string;
  /** The mode for the Pipe. Not applicable for abstract sockets. */
  mode?: number;
}

export const Pipe: Schema.Schema<Pipe> = Schema.suspend(() =>
  Schema.Struct({
    path: Schema.optional(Schema.String),
    mode: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Pipe" }) as any as Schema.Schema<Pipe>;

export interface Address {
  socketAddress?: SocketAddress;
  pipe?: Pipe;
}

export const Address: Schema.Schema<Address> = Schema.suspend(() =>
  Schema.Struct({
    socketAddress: Schema.optional(SocketAddress),
    pipe: Schema.optional(Pipe),
  }),
).annotate({ identifier: "Address" }) as any as Schema.Schema<Address>;

export interface SemanticVersion {
  majorNumber?: number;
  patch?: number;
  minorNumber?: number;
}

export const SemanticVersion: Schema.Schema<SemanticVersion> = Schema.suspend(
  () =>
    Schema.Struct({
      majorNumber: Schema.optional(Schema.Number),
      patch: Schema.optional(Schema.Number),
      minorNumber: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "SemanticVersion",
}) as any as Schema.Schema<SemanticVersion>;

export interface BuildVersion {
  /** SemVer version of extension. */
  version?: SemanticVersion;
  /** Free-form build information. Envoy defines several well known keys in the source/common/version/version.h file */
  metadata?: Record<string, unknown>;
}

export const BuildVersion: Schema.Schema<BuildVersion> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(SemanticVersion),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({
  identifier: "BuildVersion",
}) as any as Schema.Schema<BuildVersion>;

export interface Extension {
  /** [#not-implemented-hide:] Type descriptor of extension configuration proto. [#comment: */
  typeDescriptor?: string;
  /** The version is a property of the extension and maintained independently of other extensions and the Envoy API. This field is not set when extension did not provide version information. */
  version?: BuildVersion;
  /** Category of the extension. Extension category names use reverse DNS notation. For instance "envoy.filters.listener" for Envoy's built-in listener filters or "com.acme.filters.http" for HTTP filters from acme.com vendor. [#comment: */
  category?: string;
  /** Indicates that the extension is present but was disabled via dynamic configuration. */
  disabled?: boolean;
  /** This is the name of the Envoy filter as specified in the Envoy configuration, e.g. envoy.filters.http.router, com.acme.widget. */
  name?: string;
}

export const Extension: Schema.Schema<Extension> = Schema.suspend(() =>
  Schema.Struct({
    typeDescriptor: Schema.optional(Schema.String),
    version: Schema.optional(BuildVersion),
    category: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Extension" }) as any as Schema.Schema<Extension>;

export interface Node {
  /** Free-form string that identifies the version of the entity requesting config. E.g. "1.12.2" or "abcd1234", or "SpecialEnvoyBuild" */
  userAgentVersion?: string;
  /** An opaque node identifier for the Envoy node. This also provides the local service node name. It should be set if any of the following features are used: :ref:`statsd `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message or via :option:`--service-node`. */
  id?: string;
  /** Known listening ports on the node as a generic hint to the management server for filtering :ref:`listeners ` to be returned. For example, if there is a listener bound to port 80, the list can optionally contain the SocketAddress `(0.0.0.0,80)`. The field is optional and just a hint. */
  listeningAddresses?: Array<Address>;
  /** Locality specifying where the Envoy instance is running. */
  locality?: Locality;
  /** List of extensions and their versions supported by the node. */
  extensions?: Array<Extension>;
  /** Free-form string that identifies the entity requesting config. E.g. "envoy" or "grpc" */
  userAgentName?: string;
  /** Structured version of the entity requesting config. */
  userAgentBuildVersion?: BuildVersion;
  /** Client feature support list. These are well known features described in the Envoy API repository for a given major version of an API. Client features use reverse DNS naming scheme, for example `com.acme.feature`. See :ref:`the list of features ` that xDS client may support. */
  clientFeatures?: Array<string>;
  /** Defines the local service cluster name where Envoy is running. Though optional, it should be set if any of the following features are used: :ref:`statsd `, :ref:`health check cluster verification `, :ref:`runtime override directory `, :ref:`user agent addition `, :ref:`HTTP global rate limiting `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message or via :option:`--service-cluster`. */
  cluster?: string;
  /** This is motivated by informing a management server during canary which version of Envoy is being tested in a heterogeneous fleet. This will be set by Envoy in management server RPCs. This field is deprecated in favor of the user_agent_name and user_agent_version values. */
  buildVersion?: string;
  /** Opaque metadata extending the node identifier. Envoy will pass this directly to the management server. */
  metadata?: Record<string, unknown>;
}

export const Node: Schema.Schema<Node> = Schema.suspend(() =>
  Schema.Struct({
    userAgentVersion: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    listeningAddresses: Schema.optional(Schema.Array(Address)),
    locality: Schema.optional(Locality),
    extensions: Schema.optional(Schema.Array(Extension)),
    userAgentName: Schema.optional(Schema.String),
    userAgentBuildVersion: Schema.optional(BuildVersion),
    clientFeatures: Schema.optional(Schema.Array(Schema.String)),
    cluster: Schema.optional(Schema.String),
    buildVersion: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface ClientConfig {
  xdsConfig?: Array<PerXdsConfig>;
  /** Node for a particular client. */
  node?: Node;
}

export const ClientConfig: Schema.Schema<ClientConfig> = Schema.suspend(() =>
  Schema.Struct({
    xdsConfig: Schema.optional(Schema.Array(PerXdsConfig)),
    node: Schema.optional(Node),
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
