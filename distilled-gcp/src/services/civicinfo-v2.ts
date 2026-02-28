// ==========================================================================
// Google Civic Information API (civicinfo v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "civicinfo",
  version: "v2",
  rootUrl: "https://civicinfo.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface CivicinfoSchemaV2SimpleAddressType {
  /** The US two letter state abbreviation of the address. */
  state?: string;
  /** The third line of the address, if needed. */
  line3?: string;
  /** The name of the location. */
  locationName?: string;
  /** The US Postal Zip Code of the address. */
  zip?: string;
  /** The second line the address, if needed. */
  line2?: string;
  addressLine?: Array<string>;
  /** The city or town for the address. */
  city?: string;
  /** The street name and number of this address. */
  line1?: string;
}

export const CivicinfoSchemaV2SimpleAddressType: Schema.Schema<CivicinfoSchemaV2SimpleAddressType> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  line3: Schema.optional(Schema.String),
  locationName: Schema.optional(Schema.String),
  zip: Schema.optional(Schema.String),
  line2: Schema.optional(Schema.String),
  addressLine: Schema.optional(Schema.Array(Schema.String)),
  city: Schema.optional(Schema.String),
  line1: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoSchemaV2SimpleAddressType" }) as any as Schema.Schema<CivicinfoSchemaV2SimpleAddressType>;

export interface CivicinfoSchemaV2ElectionOfficial {
  /** The email address of the election official. */
  emailAddress?: string;
  /** The fax number of the election official. */
  faxNumber?: string;
  /** The title of the election official. */
  title?: string;
  /** The full name of the election official. */
  name?: string;
  /** The office phone number of the election official. */
  officePhoneNumber?: string;
}

export const CivicinfoSchemaV2ElectionOfficial: Schema.Schema<CivicinfoSchemaV2ElectionOfficial> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
  faxNumber: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  officePhoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoSchemaV2ElectionOfficial" }) as any as Schema.Schema<CivicinfoSchemaV2ElectionOfficial>;

export interface CivicinfoSchemaV2AdministrativeBody {
  /** A URL provided by this administrative body for confirming that the voter is registered to vote. */
  electionRegistrationConfirmationUrl?: string;
  /** A last minute or emergency notification text provided by this administrative body. */
  electionNoticeText?: string;
  /** The physical address of this administrative body. */
  physicalAddress?: CivicinfoSchemaV2SimpleAddressType;
  /** A URL provided by this administrative body for additional information related to the last minute or emergency notification. */
  electionNoticeUrl?: string;
  /** A description of the hours of operation for this administrative body. */
  hoursOfOperation?: string;
  /** The name of this election administrative body. */
  name?: string;
  /** The mailing address of this administrative body. */
  correspondenceAddress?: CivicinfoSchemaV2SimpleAddressType;
  /** A URL provided by this administrative body for information on absentee voting. */
  absenteeVotingInfoUrl?: string;
  /** A description of the services this administrative body may provide. */
  voter_services?: Array<string>;
  /** A URL provided by this administrative body for looking up how to register to vote. */
  electionRegistrationUrl?: string;
  /** A URL provided by this administrative body to give contest information to the voter. */
  ballotInfoUrl?: string;
  /** The election officials for this election administrative body. */
  electionOfficials?: Array<CivicinfoSchemaV2ElectionOfficial>;
  /** A URL provided by this administrative body describing election rules to the voter. */
  electionRulesUrl?: string;
  /** A URL provided by this administrative body for looking up general election information. */
  electionInfoUrl?: string;
  /** A URL provided by this administrative body for looking up where to vote. */
  votingLocationFinderUrl?: string;
}

export const CivicinfoSchemaV2AdministrativeBody: Schema.Schema<CivicinfoSchemaV2AdministrativeBody> = Schema.suspend(() => Schema.Struct({
  electionRegistrationConfirmationUrl: Schema.optional(Schema.String),
  electionNoticeText: Schema.optional(Schema.String),
  physicalAddress: Schema.optional(CivicinfoSchemaV2SimpleAddressType),
  electionNoticeUrl: Schema.optional(Schema.String),
  hoursOfOperation: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  correspondenceAddress: Schema.optional(CivicinfoSchemaV2SimpleAddressType),
  absenteeVotingInfoUrl: Schema.optional(Schema.String),
  voter_services: Schema.optional(Schema.Array(Schema.String)),
  electionRegistrationUrl: Schema.optional(Schema.String),
  ballotInfoUrl: Schema.optional(Schema.String),
  electionOfficials: Schema.optional(Schema.Array(CivicinfoSchemaV2ElectionOfficial)),
  electionRulesUrl: Schema.optional(Schema.String),
  electionInfoUrl: Schema.optional(Schema.String),
  votingLocationFinderUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoSchemaV2AdministrativeBody" }) as any as Schema.Schema<CivicinfoSchemaV2AdministrativeBody>;

export interface CivicinfoSchemaV2Election {
  /** The unique ID of this election. */
  id?: string;
  /** Day of the election in YYYY-MM-DD format. */
  electionDay?: string;
  /** A displayable name for the election. */
  name?: string;
  shapeLookupBehavior?: "shapeLookupDefault" | "shapeLookupDisabled" | "shapeLookupEnabled" | (string & {});
  /** The political division of the election. Represented as an OCD Division ID. Voters within these political jurisdictions are covered by this election. This is typically a state such as ocd-division/country:us/state:ca or for the midterms or general election the entire US (i.e. ocd-division/country:us). */
  ocdDivisionId?: string;
}

export const CivicinfoSchemaV2Election: Schema.Schema<CivicinfoSchemaV2Election> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  electionDay: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  shapeLookupBehavior: Schema.optional(Schema.String),
  ocdDivisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoSchemaV2Election" }) as any as Schema.Schema<CivicinfoSchemaV2Election>;

export interface CivicinfoSchemaV2Source {
  /** Whether this data comes from an official government source. */
  official?: boolean;
  /** The name of the data source. */
  name?: string;
}

export const CivicinfoSchemaV2Source: Schema.Schema<CivicinfoSchemaV2Source> = Schema.suspend(() => Schema.Struct({
  official: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoSchemaV2Source" }) as any as Schema.Schema<CivicinfoSchemaV2Source>;

export interface CivicinfoSchemaV2PollingLocation {
  /** Notes about this location (e.g. accessibility ramp or entrance to use). */
  notes?: string;
  /** The last date that this early vote site or drop off location may be used. This field is not populated for polling locations. */
  endDate?: string;
  /** The first date that this early vote site or drop off location may be used. This field is not populated for polling locations. */
  startDate?: string;
  /** A description of when this location is open. */
  pollingHours?: string;
  /** The name of the early vote site or drop off location. This field is not populated for polling locations. */
  name?: string;
  /** The services provided by this early vote site or drop off location. This field is not populated for polling locations. */
  voterServices?: string;
  /** Latitude of the location, in degrees north of the equator. Note this field may not be available for some locations. */
  latitude?: number;
  /** A list of sources for this location. If multiple sources are listed the data has been aggregated from those sources. */
  sources?: Array<CivicinfoSchemaV2Source>;
  /** Longitude of the location, in degrees east of the Prime Meridian. Note this field may not be available for some locations. */
  longitude?: number;
  /** The address of the location. */
  address?: CivicinfoSchemaV2SimpleAddressType;
}

export const CivicinfoSchemaV2PollingLocation: Schema.Schema<CivicinfoSchemaV2PollingLocation> = Schema.suspend(() => Schema.Struct({
  notes: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  pollingHours: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  voterServices: Schema.optional(Schema.String),
  latitude: Schema.optional(Schema.Number),
  sources: Schema.optional(Schema.Array(CivicinfoSchemaV2Source)),
  longitude: Schema.optional(Schema.Number),
  address: Schema.optional(CivicinfoSchemaV2SimpleAddressType),
})).annotate({ identifier: "CivicinfoSchemaV2PollingLocation" }) as any as Schema.Schema<CivicinfoSchemaV2PollingLocation>;

export interface CivicinfoSchemaV2Precinct {
  /** ID(s) of the Contest message(s) for this precinct. */
  contestId?: Array<string>;
  /** If present, this proto corresponds to one portion of split precinct. Other portions of this precinct are guaranteed to have the same `name`. If not present, this proto represents a full precicnt. */
  splitName?: string;
  /** ID(s) of the PollingLocation message(s) for this precinct. */
  pollingLocationId?: Array<string>;
  /** Specifies the ward the precinct is contained within. */
  ward?: string;
  /** Specifies if the precinct runs mail-only elections. */
  mailOnly?: boolean;
  /** Required. The name of the precinct. */
  name?: string;
  /** The number of the precinct. */
  number?: string;
  /** Required. A unique identifier for this precinct. */
  id?: string;
  /** Encouraged. The OCD ID of the precinct */
  ocdId?: Array<string>;
  /** Required. Dataset ID. What datasets our Precincts come from. */
  datasetId?: string;
  /** ID(s) of the PollingLocation message(s) for this precinct. */
  earlyVoteSiteId?: Array<string>;
  /** ID of the AdministrationRegion message for this precinct. Corresponds to LocalityId xml tag. */
  administrationRegionId?: string;
  /** ID(s) of the ElectoralDistrict message(s) for this precinct. */
  electoralDistrictId?: Array<string>;
  /** ID(s) of the SpatialBoundary message(s) for this precinct. Used to specify a geometrical boundary of the precinct. */
  spatialBoundaryId?: Array<string>;
}

export const CivicinfoSchemaV2Precinct: Schema.Schema<CivicinfoSchemaV2Precinct> = Schema.suspend(() => Schema.Struct({
  contestId: Schema.optional(Schema.Array(Schema.String)),
  splitName: Schema.optional(Schema.String),
  pollingLocationId: Schema.optional(Schema.Array(Schema.String)),
  ward: Schema.optional(Schema.String),
  mailOnly: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  number: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  ocdId: Schema.optional(Schema.Array(Schema.String)),
  datasetId: Schema.optional(Schema.String),
  earlyVoteSiteId: Schema.optional(Schema.Array(Schema.String)),
  administrationRegionId: Schema.optional(Schema.String),
  electoralDistrictId: Schema.optional(Schema.Array(Schema.String)),
  spatialBoundaryId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CivicinfoSchemaV2Precinct" }) as any as Schema.Schema<CivicinfoSchemaV2Precinct>;

export interface CivicinfoSchemaV2AdministrationRegion {
  /** A list of sources for this area. If multiple sources are listed the data has been aggregated from those sources. */
  sources?: Array<CivicinfoSchemaV2Source>;
  /** The name of the jurisdiction. */
  name?: string;
  /** The election administration body for this area. */
  electionAdministrationBody?: CivicinfoSchemaV2AdministrativeBody;
  /** The city or county that provides election information for this voter. This object can have the same elements as state. */
  local_jurisdiction?: CivicinfoSchemaV2AdministrationRegion;
}

export const CivicinfoSchemaV2AdministrationRegion: Schema.Schema<CivicinfoSchemaV2AdministrationRegion> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(CivicinfoSchemaV2Source)),
  name: Schema.optional(Schema.String),
  electionAdministrationBody: Schema.optional(CivicinfoSchemaV2AdministrativeBody),
  local_jurisdiction: Schema.optional(CivicinfoSchemaV2AdministrationRegion),
})).annotate({ identifier: "CivicinfoSchemaV2AdministrationRegion" }) as any as Schema.Schema<CivicinfoSchemaV2AdministrationRegion>;

export interface CivicinfoSchemaV2ElectoralDistrict {
  /** An identifier for this district, relative to its scope. For example, the 34th State Senate district would have id "34" and a scope of stateUpper. */
  id?: string;
  /** The geographic scope of this district. If unspecified the district's geography is not known. One of: national, statewide, congressional, stateUpper, stateLower, countywide, judicial, schoolBoard, cityWide, township, countyCouncil, cityCouncil, ward, special */
  scope?: "statewide" | "congressional" | "stateUpper" | "stateLower" | "countywide" | "judicial" | "schoolBoard" | "citywide" | "special" | "countyCouncil" | "township" | "ward" | "cityCouncil" | "national" | (string & {});
  /** The name of the district. */
  name?: string;
}

export const CivicinfoSchemaV2ElectoralDistrict: Schema.Schema<CivicinfoSchemaV2ElectoralDistrict> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoSchemaV2ElectoralDistrict" }) as any as Schema.Schema<CivicinfoSchemaV2ElectoralDistrict>;

export interface CivicinfoSchemaV2Channel {
  /** The type of channel. The following is a list of types of channels, but is not exhaustive. More channel types may be added at a later time. One of: GooglePlus, YouTube, Facebook, Twitter */
  type?: string;
  /** The unique public identifier for the candidate's channel. */
  id?: string;
}

export const CivicinfoSchemaV2Channel: Schema.Schema<CivicinfoSchemaV2Channel> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoSchemaV2Channel" }) as any as Schema.Schema<CivicinfoSchemaV2Channel>;

export interface CivicinfoSchemaV2Candidate {
  /** The candidate's name. If this is a joint ticket it will indicate the name of the candidate at the top of a ticket followed by a / and that name of candidate at the bottom of the ticket. e.g. "Mitt Romney / Paul Ryan" */
  name?: string;
  /** A URL for a photo of the candidate. */
  photoUrl?: string;
  /** The full name of the party the candidate is a member of. */
  party?: string;
  /** The email address for the candidate's campaign. */
  email?: string;
  /** The voice phone number for the candidate's campaign office. */
  phone?: string;
  /** The URL for the candidate's campaign web site. */
  candidateUrl?: string;
  /** The order the candidate appears on the ballot for this contest. */
  orderOnBallot?: string;
  /** A list of known (social) media channels for this candidate. */
  channels?: Array<CivicinfoSchemaV2Channel>;
}

export const CivicinfoSchemaV2Candidate: Schema.Schema<CivicinfoSchemaV2Candidate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  party: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  phone: Schema.optional(Schema.String),
  candidateUrl: Schema.optional(Schema.String),
  orderOnBallot: Schema.optional(Schema.String),
  channels: Schema.optional(Schema.Array(CivicinfoSchemaV2Channel)),
})).annotate({ identifier: "CivicinfoSchemaV2Candidate" }) as any as Schema.Schema<CivicinfoSchemaV2Candidate>;

export interface CivicinfoSchemaV2Contest {
  /** The set of ballot responses for the referendum. A ballot response represents a line on the ballot. Common examples might include "yes" or "no" for referenda. This field is only populated for contests of type 'Referendum'. */
  referendumBallotResponses?: Array<string>;
  /** The type of contest. Usually this will be 'General', 'Primary', or 'Run-off' for contests with candidates. For referenda this will be 'Referendum'. For Retention contests this will typically be 'Retention'. */
  type?: string;
  /** Specifies what effect abstaining (not voting) on the proposition will have (i.e. whether abstaining is considered a vote against it). This field is only populated for contests of type 'Referendum'. */
  referendumEffectOfAbstain?: string;
  /** The official title on the ballot for this contest, only where available. */
  ballotTitle?: string;
  /** A description of any additional eligibility requirements for voting in this contest. */
  electorateSpecifications?: string;
  /** If this is a partisan election, the name of the party/parties it is for. */
  primaryParties?: Array<string>;
  /** Information about the electoral district that this contest is in. */
  district?: CivicinfoSchemaV2ElectoralDistrict;
  /** The levels of government of the office for this contest. There may be more than one in cases where a jurisdiction effectively acts at two different levels of government; for example, the mayor of the District of Columbia acts at "locality" level, but also effectively at both "administrative-area-2" and "administrative-area-1". */
  level?: Array<"international" | "country" | "administrativeArea1" | "regional" | "administrativeArea2" | "locality" | "subLocality1" | "subLocality2" | "special" | (string & {})>;
  /** The threshold of votes that the referendum needs in order to pass, e.g. "two-thirds". This field is only populated for contests of type 'Referendum'. */
  referendumPassageThreshold?: string;
  /** Specifies a short summary of the referendum that is typically on the ballot below the title but above the text. This field is only populated for contests of type 'Referendum'. */
  referendumBrief?: string;
  /** A link to the referendum. This field is only populated for contests of type 'Referendum'. */
  referendumUrl?: string;
  /** The full text of the referendum. This field is only populated for contests of type 'Referendum'. */
  referendumText?: string;
  /** The title of the referendum (e.g. 'Proposition 42'). This field is only populated for contests of type 'Referendum'. */
  referendumTitle?: string;
  /** The number of candidates that will be elected to office in this contest. */
  numberElected?: string;
  /** The number of candidates that a voter may vote for in this contest. */
  numberVotingFor?: string;
  /** A statement in opposition to the referendum. It does not necessarily appear on the ballot. This field is only populated for contests of type 'Referendum'. */
  referendumConStatement?: string;
  /** "Yes" or "No" depending on whether this a contest being held outside the normal election cycle. */
  special?: string;
  /** A number specifying the position of this contest on the voter's ballot. */
  ballotPlacement?: string;
  /** A statement in favor of the referendum. It does not necessarily appear on the ballot. This field is only populated for contests of type 'Referendum'. */
  referendumProStatement?: string;
  /** A brief description of the referendum. This field is only populated for contests of type 'Referendum'. */
  referendumSubtitle?: string;
  /** A list of sources for this contest. If multiple sources are listed, the data has been aggregated from those sources. */
  sources?: Array<CivicinfoSchemaV2Source>;
  /** The name of the office for this contest. */
  office?: string;
  /** The candidate choices for this contest. */
  candidates?: Array<CivicinfoSchemaV2Candidate>;
  /** The roles which this office fulfills. */
  roles?: Array<"headOfState" | "headOfGovernment" | "deputyHeadOfGovernment" | "governmentOfficer" | "executiveCouncil" | "legislatorUpperBody" | "legislatorLowerBody" | "highestCourtJudge" | "judge" | "schoolBoard" | "specialPurposeOfficer" | "otherRole" | (string & {})>;
}

export const CivicinfoSchemaV2Contest: Schema.Schema<CivicinfoSchemaV2Contest> = Schema.suspend(() => Schema.Struct({
  referendumBallotResponses: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
  referendumEffectOfAbstain: Schema.optional(Schema.String),
  ballotTitle: Schema.optional(Schema.String),
  electorateSpecifications: Schema.optional(Schema.String),
  primaryParties: Schema.optional(Schema.Array(Schema.String)),
  district: Schema.optional(CivicinfoSchemaV2ElectoralDistrict),
  level: Schema.optional(Schema.Array(Schema.String)),
  referendumPassageThreshold: Schema.optional(Schema.String),
  referendumBrief: Schema.optional(Schema.String),
  referendumUrl: Schema.optional(Schema.String),
  referendumText: Schema.optional(Schema.String),
  referendumTitle: Schema.optional(Schema.String),
  numberElected: Schema.optional(Schema.String),
  numberVotingFor: Schema.optional(Schema.String),
  referendumConStatement: Schema.optional(Schema.String),
  special: Schema.optional(Schema.String),
  ballotPlacement: Schema.optional(Schema.String),
  referendumProStatement: Schema.optional(Schema.String),
  referendumSubtitle: Schema.optional(Schema.String),
  sources: Schema.optional(Schema.Array(CivicinfoSchemaV2Source)),
  office: Schema.optional(Schema.String),
  candidates: Schema.optional(Schema.Array(CivicinfoSchemaV2Candidate)),
  roles: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CivicinfoSchemaV2Contest" }) as any as Schema.Schema<CivicinfoSchemaV2Contest>;

export interface CivicinfoApiprotosV2VoterInfoResponse {
  /** The election that was queried. */
  election?: CivicinfoSchemaV2Election;
  /** When there are multiple elections for a voter address, the otherElections field is populated in the API response and there are two possibilities: 1. If the earliest election is not the intended election, specify the election ID of the desired election in a second API request using the electionId field. 2. If these elections occur on the same day, the API doesn?t return any polling location, contest, or election official information to ensure that an additional query is made. For user-facing applications, we recommend displaying these elections to the user to disambiguate. A second API request using the electionId field should be made for the election that is relevant to the user. */
  otherElections?: Array<CivicinfoSchemaV2Election>;
  /** Locations where a voter is eligible to drop off a completed ballot. The voter must have received and completed a ballot prior to arriving at the location. The location may not have ballots available on the premises. These locations could be open on or before election day as indicated in the pollingHours field. */
  dropOffLocations?: Array<CivicinfoSchemaV2PollingLocation>;
  /** Locations where the voter is eligible to vote on election day. */
  pollingLocations?: Array<CivicinfoSchemaV2PollingLocation>;
  /** The normalized version of the requested address */
  normalizedInput?: CivicinfoSchemaV2SimpleAddressType;
  /** Identifies what kind of resource this is. Value: the fixed string "civicinfo#voterInfoResponse". */
  kind?: string;
  /** Locations where the voter is eligible to vote early, prior to election day. */
  earlyVoteSites?: Array<CivicinfoSchemaV2PollingLocation>;
  /** The precincts that match this voter's address. Will only be returned for project IDs which have been allowlisted as "partner projects". */
  precincts?: Array<CivicinfoSchemaV2Precinct>;
  /** Local Election Information for the state that the voter votes in. For the US, there will only be one element in this array. */
  state?: Array<CivicinfoSchemaV2AdministrationRegion>;
  precinctId?: string;
  /** Specifies whether voters in the precinct vote only by mailing their ballots (with the possible option of dropping off their ballots as well). */
  mailOnly?: boolean;
  /** Contests that will appear on the voter's ballot. */
  contests?: Array<CivicinfoSchemaV2Contest>;
}

export const CivicinfoApiprotosV2VoterInfoResponse: Schema.Schema<CivicinfoApiprotosV2VoterInfoResponse> = Schema.suspend(() => Schema.Struct({
  election: Schema.optional(CivicinfoSchemaV2Election),
  otherElections: Schema.optional(Schema.Array(CivicinfoSchemaV2Election)),
  dropOffLocations: Schema.optional(Schema.Array(CivicinfoSchemaV2PollingLocation)),
  pollingLocations: Schema.optional(Schema.Array(CivicinfoSchemaV2PollingLocation)),
  normalizedInput: Schema.optional(CivicinfoSchemaV2SimpleAddressType),
  kind: Schema.optional(Schema.String),
  earlyVoteSites: Schema.optional(Schema.Array(CivicinfoSchemaV2PollingLocation)),
  precincts: Schema.optional(Schema.Array(CivicinfoSchemaV2Precinct)),
  state: Schema.optional(Schema.Array(CivicinfoSchemaV2AdministrationRegion)),
  precinctId: Schema.optional(Schema.String),
  mailOnly: Schema.optional(Schema.Boolean),
  contests: Schema.optional(Schema.Array(CivicinfoSchemaV2Contest)),
})).annotate({ identifier: "CivicinfoApiprotosV2VoterInfoResponse" }) as any as Schema.Schema<CivicinfoApiprotosV2VoterInfoResponse>;

export interface CivicinfoSchemaV2GeographicDivision {
  /** Any other valid OCD IDs that refer to the same division.\n\nBecause OCD IDs are meant to be human-readable and at least somewhat predictable, there are occasionally several identifiers for a single division. These identifiers are defined to be equivalent to one another, and one is always indicated as the primary identifier. The primary identifier will be returned in ocd_id above, and any other equivalent valid identifiers will be returned in this list.\n\nFor example, if this division's OCD ID is ocd-division/country:us/district:dc, this will contain ocd-division/country:us/state:dc. */
  alsoKnownAs?: Array<string>;
  /** List of indices in the offices array, one for each office elected from this division. Will only be present if includeOffices was true (or absent) in the request. */
  officeIndices?: Array<number>;
  /** The name of the division. */
  name?: string;
}

export const CivicinfoSchemaV2GeographicDivision: Schema.Schema<CivicinfoSchemaV2GeographicDivision> = Schema.suspend(() => Schema.Struct({
  alsoKnownAs: Schema.optional(Schema.Array(Schema.String)),
  officeIndices: Schema.optional(Schema.Array(Schema.Number)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoSchemaV2GeographicDivision" }) as any as Schema.Schema<CivicinfoSchemaV2GeographicDivision>;

export interface CivicinfoApiprotosV2DivisionSearchResult {
  /** The name of the division. */
  name?: string;
  /** Other Open Civic Data identifiers that refer to the same division -- for example, those that refer to other political divisions whose boundaries are defined to be coterminous with this one. For example, ocd-division/country:us/state:wy will include an alias of ocd-division/country:us/state:wy/cd:1, since Wyoming has only one Congressional district. */
  aliases?: Array<string>;
  /** The unique Open Civic Data identifier for this division */
  ocdId?: string;
}

export const CivicinfoApiprotosV2DivisionSearchResult: Schema.Schema<CivicinfoApiprotosV2DivisionSearchResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  aliases: Schema.optional(Schema.Array(Schema.String)),
  ocdId: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoApiprotosV2DivisionSearchResult" }) as any as Schema.Schema<CivicinfoApiprotosV2DivisionSearchResult>;

export interface CivicinfoApiprotosV2DivisionSearchResponse {
  results?: Array<CivicinfoApiprotosV2DivisionSearchResult>;
  /** Identifies what kind of resource this is. Value: the fixed string "civicinfo#divisionSearchResponse". */
  kind?: string;
}

export const CivicinfoApiprotosV2DivisionSearchResponse: Schema.Schema<CivicinfoApiprotosV2DivisionSearchResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(CivicinfoApiprotosV2DivisionSearchResult)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoApiprotosV2DivisionSearchResponse" }) as any as Schema.Schema<CivicinfoApiprotosV2DivisionSearchResponse>;

export interface CivicinfoApiprotosV2ElectionsQueryResponse {
  /** A list of available elections */
  elections?: Array<CivicinfoSchemaV2Election>;
  /** Identifies what kind of resource this is. Value: the fixed string "civicinfo#electionsQueryResponse". */
  kind?: string;
}

export const CivicinfoApiprotosV2ElectionsQueryResponse: Schema.Schema<CivicinfoApiprotosV2ElectionsQueryResponse> = Schema.suspend(() => Schema.Struct({
  elections: Schema.optional(Schema.Array(CivicinfoSchemaV2Election)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CivicinfoApiprotosV2ElectionsQueryResponse" }) as any as Schema.Schema<CivicinfoApiprotosV2ElectionsQueryResponse>;

export interface CivicinfoApiprotosV2DivisionByAddressResponse {
  /** The normalized version of the requested address. */
  normalizedInput?: CivicinfoSchemaV2SimpleAddressType;
  divisions?: Record<string, CivicinfoSchemaV2GeographicDivision>;
}

export const CivicinfoApiprotosV2DivisionByAddressResponse: Schema.Schema<CivicinfoApiprotosV2DivisionByAddressResponse> = Schema.suspend(() => Schema.Struct({
  normalizedInput: Schema.optional(CivicinfoSchemaV2SimpleAddressType),
  divisions: Schema.optional(Schema.Record(Schema.String, CivicinfoSchemaV2GeographicDivision)),
})).annotate({ identifier: "CivicinfoApiprotosV2DivisionByAddressResponse" }) as any as Schema.Schema<CivicinfoApiprotosV2DivisionByAddressResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Searches for political divisions by their natural name or OCD ID. */
export interface SearchDivisionsRequest {
  /** The search query. Queries can cover any parts of a OCD ID or a human readable division name. All words given in the query are treated as required patterns. In addition to that, most query operators of the Apache Lucene library are supported. See http://lucene.apache.org/core/2_9_4/queryparsersyntax.html */
  query?: string;
}

export const SearchDivisionsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "civicinfo/v2/divisions" }),
  svc,
) as unknown as Schema.Schema<SearchDivisionsRequest>;

export type SearchDivisionsResponse = CivicinfoApiprotosV2DivisionSearchResponse;
export const SearchDivisionsResponse = CivicinfoApiprotosV2DivisionSearchResponse;

export type SearchDivisionsError = CommonErrors;

export const searchDivisions: API.OperationMethod<SearchDivisionsRequest, SearchDivisionsResponse, SearchDivisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchDivisionsRequest,
  output: SearchDivisionsResponse,
  errors: [],
}));

/** Lookup OCDIDs and names for divisions related to an address. */
export interface QueryDivisionByAddressDivisionsRequest {
  address?: string;
}

export const QueryDivisionByAddressDivisionsRequest = Schema.Struct({
  address: Schema.optional(Schema.String).pipe(T.HttpQuery("address")),
}).pipe(
  T.Http({ method: "GET", path: "civicinfo/v2/divisionsByAddress" }),
  svc,
) as unknown as Schema.Schema<QueryDivisionByAddressDivisionsRequest>;

export type QueryDivisionByAddressDivisionsResponse = CivicinfoApiprotosV2DivisionByAddressResponse;
export const QueryDivisionByAddressDivisionsResponse = CivicinfoApiprotosV2DivisionByAddressResponse;

export type QueryDivisionByAddressDivisionsError = CommonErrors;

export const queryDivisionByAddressDivisions: API.OperationMethod<QueryDivisionByAddressDivisionsRequest, QueryDivisionByAddressDivisionsResponse, QueryDivisionByAddressDivisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryDivisionByAddressDivisionsRequest,
  output: QueryDivisionByAddressDivisionsResponse,
  errors: [],
}));

/** Looks up information relevant to a voter based on the voter's registered address. */
export interface VoterInfoQueryElectionsRequest {
  /** If set to true, the query will return the success code and include any partial information when it is unable to determine a matching address or unable to determine the election for electionId=0 queries. */
  returnAllAvailableData?: boolean;
  /** Whether to include data that has not been vetted yet. Should only be made available to internal IPs or trusted partners. This is a non-discoverable parameter in the One Platform API config. */
  productionDataOnly?: boolean;
  /** The unique ID of the election to look up. A list of election IDs can be obtained at https://www.googleapis.com/civicinfo/{version}/elections. If no election ID is specified in the query and there is more than one election with data for the given voter, the additional elections are provided in the otherElections response field. */
  electionId?: string;
  /** The registered address of the voter to look up. */
  address?: string;
  /** If set to true, only data from official state sources will be returned. */
  officialOnly?: boolean;
}

export const VoterInfoQueryElectionsRequest = Schema.Struct({
  returnAllAvailableData: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnAllAvailableData")),
  productionDataOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("productionDataOnly")),
  electionId: Schema.optional(Schema.String).pipe(T.HttpQuery("electionId")),
  address: Schema.optional(Schema.String).pipe(T.HttpQuery("address")),
  officialOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("officialOnly")),
}).pipe(
  T.Http({ method: "GET", path: "civicinfo/v2/voterinfo" }),
  svc,
) as unknown as Schema.Schema<VoterInfoQueryElectionsRequest>;

export type VoterInfoQueryElectionsResponse = CivicinfoApiprotosV2VoterInfoResponse;
export const VoterInfoQueryElectionsResponse = CivicinfoApiprotosV2VoterInfoResponse;

export type VoterInfoQueryElectionsError = CommonErrors;

export const voterInfoQueryElections: API.OperationMethod<VoterInfoQueryElectionsRequest, VoterInfoQueryElectionsResponse, VoterInfoQueryElectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VoterInfoQueryElectionsRequest,
  output: VoterInfoQueryElectionsResponse,
  errors: [],
}));

/** List of available elections to query. */
export interface ElectionQueryElectionsRequest {
  /** Whether to include data that has not been allowlisted yet */
  productionDataOnly?: boolean;
}

export const ElectionQueryElectionsRequest = Schema.Struct({
  productionDataOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("productionDataOnly")),
}).pipe(
  T.Http({ method: "GET", path: "civicinfo/v2/elections" }),
  svc,
) as unknown as Schema.Schema<ElectionQueryElectionsRequest>;

export type ElectionQueryElectionsResponse = CivicinfoApiprotosV2ElectionsQueryResponse;
export const ElectionQueryElectionsResponse = CivicinfoApiprotosV2ElectionsQueryResponse;

export type ElectionQueryElectionsError = CommonErrors;

export const electionQueryElections: API.OperationMethod<ElectionQueryElectionsRequest, ElectionQueryElectionsResponse, ElectionQueryElectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ElectionQueryElectionsRequest,
  output: ElectionQueryElectionsResponse,
  errors: [],
}));

