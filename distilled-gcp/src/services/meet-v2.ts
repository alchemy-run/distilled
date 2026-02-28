// ==========================================================================
// Google Meet API (meet v2)
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
  name: "meet",
  version: "v2",
  rootUrl: "https://meet.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ModerationRestrictions {
  /** Defines who has permission to send chat messages in the meeting space. */
  chatRestriction?: "RESTRICTION_TYPE_UNSPECIFIED" | "HOSTS_ONLY" | "NO_RESTRICTION" | (string & {});
  /** Defines who has permission to send reactions in the meeting space. */
  reactionRestriction?: "RESTRICTION_TYPE_UNSPECIFIED" | "HOSTS_ONLY" | "NO_RESTRICTION" | (string & {});
  /** Defines who has permission to share their screen in the meeting space. */
  presentRestriction?: "RESTRICTION_TYPE_UNSPECIFIED" | "HOSTS_ONLY" | "NO_RESTRICTION" | (string & {});
  /** Defines whether to restrict the default role assigned to users as viewer. */
  defaultJoinAsViewerType?: "DEFAULT_JOIN_AS_VIEWER_TYPE_UNSPECIFIED" | "ON" | "OFF" | (string & {});
}

export const ModerationRestrictions: Schema.Schema<ModerationRestrictions> = Schema.suspend(() => Schema.Struct({
  chatRestriction: Schema.optional(Schema.String),
  reactionRestriction: Schema.optional(Schema.String),
  presentRestriction: Schema.optional(Schema.String),
  defaultJoinAsViewerType: Schema.optional(Schema.String),
})).annotate({ identifier: "ModerationRestrictions" }) as any as Schema.Schema<ModerationRestrictions>;

export interface RecordingConfig {
  /** Defines whether a meeting space is automatically recorded when someone with the privilege to record joins the meeting. */
  autoRecordingGeneration?: "AUTO_GENERATION_TYPE_UNSPECIFIED" | "ON" | "OFF" | (string & {});
}

export const RecordingConfig: Schema.Schema<RecordingConfig> = Schema.suspend(() => Schema.Struct({
  autoRecordingGeneration: Schema.optional(Schema.String),
})).annotate({ identifier: "RecordingConfig" }) as any as Schema.Schema<RecordingConfig>;

export interface TranscriptionConfig {
  /** Defines whether the content of a meeting is automatically transcribed when someone with the privilege to transcribe joins the meeting. */
  autoTranscriptionGeneration?: "AUTO_GENERATION_TYPE_UNSPECIFIED" | "ON" | "OFF" | (string & {});
}

export const TranscriptionConfig: Schema.Schema<TranscriptionConfig> = Schema.suspend(() => Schema.Struct({
  autoTranscriptionGeneration: Schema.optional(Schema.String),
})).annotate({ identifier: "TranscriptionConfig" }) as any as Schema.Schema<TranscriptionConfig>;

export interface SmartNotesConfig {
  /** Defines whether to automatically generate a summary and recap of the meeting for all invitees in the organization when someone with the privilege to enable smart notes joins the meeting. */
  autoSmartNotesGeneration?: "AUTO_GENERATION_TYPE_UNSPECIFIED" | "ON" | "OFF" | (string & {});
}

export const SmartNotesConfig: Schema.Schema<SmartNotesConfig> = Schema.suspend(() => Schema.Struct({
  autoSmartNotesGeneration: Schema.optional(Schema.String),
})).annotate({ identifier: "SmartNotesConfig" }) as any as Schema.Schema<SmartNotesConfig>;

export interface ArtifactConfig {
  /** Configuration for recording. */
  recordingConfig?: RecordingConfig;
  /** Configuration for auto-transcript. */
  transcriptionConfig?: TranscriptionConfig;
  /** Configuration for auto-smart-notes. */
  smartNotesConfig?: SmartNotesConfig;
}

export const ArtifactConfig: Schema.Schema<ArtifactConfig> = Schema.suspend(() => Schema.Struct({
  recordingConfig: Schema.optional(RecordingConfig),
  transcriptionConfig: Schema.optional(TranscriptionConfig),
  smartNotesConfig: Schema.optional(SmartNotesConfig),
})).annotate({ identifier: "ArtifactConfig" }) as any as Schema.Schema<ArtifactConfig>;

export interface SpaceConfig {
  /** Access type of the meeting space that determines who can join without knocking. Default: The user's default access settings. Controlled by the user's admin for enterprise users or RESTRICTED. */
  accessType?: "ACCESS_TYPE_UNSPECIFIED" | "OPEN" | "TRUSTED" | "RESTRICTED" | (string & {});
  /** Defines the entry points that can be used to join meetings hosted in this meeting space. Default: EntryPointAccess.ALL */
  entryPointAccess?: "ENTRY_POINT_ACCESS_UNSPECIFIED" | "ALL" | "CREATOR_APP_ONLY" | (string & {});
  /** The pre-configured moderation mode for the Meeting. Default: Controlled by the user's policies. */
  moderation?: "MODERATION_UNSPECIFIED" | "OFF" | "ON" | (string & {});
  /** When moderation.ON, these restrictions go into effect for the meeting. When moderation.OFF, will be reset to default ModerationRestrictions. */
  moderationRestrictions?: ModerationRestrictions;
  /** Whether attendance report is enabled for the meeting space. */
  attendanceReportGenerationType?: "ATTENDANCE_REPORT_GENERATION_TYPE_UNSPECIFIED" | "GENERATE_REPORT" | "DO_NOT_GENERATE" | (string & {});
  /** Configuration pertaining to the auto-generated artifacts that the meeting supports. */
  artifactConfig?: ArtifactConfig;
}

export const SpaceConfig: Schema.Schema<SpaceConfig> = Schema.suspend(() => Schema.Struct({
  accessType: Schema.optional(Schema.String),
  entryPointAccess: Schema.optional(Schema.String),
  moderation: Schema.optional(Schema.String),
  moderationRestrictions: Schema.optional(ModerationRestrictions),
  attendanceReportGenerationType: Schema.optional(Schema.String),
  artifactConfig: Schema.optional(ArtifactConfig),
})).annotate({ identifier: "SpaceConfig" }) as any as Schema.Schema<SpaceConfig>;

export interface ActiveConference {
  /** Output only. Reference to 'ConferenceRecord' resource. Format: `conferenceRecords/{conference_record}` where `{conference_record}` is a unique ID for each instance of a call within a space. */
  conferenceRecord?: string;
}

export const ActiveConference: Schema.Schema<ActiveConference> = Schema.suspend(() => Schema.Struct({
  conferenceRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "ActiveConference" }) as any as Schema.Schema<ActiveConference>;

export interface Space {
  /** Immutable. Resource name of the space. Format: `spaces/{space}`. `{space}` is the resource identifier for the space. It's a unique, server-generated ID and is case sensitive. For example, `jQCFfuBOdN5z`. For more information, see [How Meet identifies a meeting space](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#identify-meeting-space). */
  name?: string;
  /** Output only. URI used to join meetings consisting of `https://meet.google.com/` followed by the `meeting_code`. For example, `https://meet.google.com/abc-mnop-xyz`. */
  meetingUri?: string;
  /** Output only. Type friendly unique string used to join the meeting. Format: `[a-z]+-[a-z]+-[a-z]+`. For example, `abc-mnop-xyz`. The maximum length is 128 characters. Can only be used as an alias of the space name to get the space. */
  meetingCode?: string;
  /** Configuration pertaining to the meeting space. */
  config?: SpaceConfig;
  /** Active conference, if it exists. */
  activeConference?: ActiveConference;
}

export const Space: Schema.Schema<Space> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  meetingUri: Schema.optional(Schema.String),
  meetingCode: Schema.optional(Schema.String),
  config: Schema.optional(SpaceConfig),
  activeConference: Schema.optional(ActiveConference),
})).annotate({ identifier: "Space" }) as any as Schema.Schema<Space>;

export interface EndActiveConferenceRequest {
}

export const EndActiveConferenceRequest: Schema.Schema<EndActiveConferenceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EndActiveConferenceRequest" }) as any as Schema.Schema<EndActiveConferenceRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ConferenceRecord {
  /** Identifier. Resource name of the conference record. Format: `conferenceRecords/{conference_record}` where `{conference_record}` is a unique ID for each instance of a call within a space. */
  name?: string;
  /** Output only. Timestamp when the conference started. Always set. */
  startTime?: string;
  /** Output only. Timestamp when the conference ended. Set for past conferences. Unset if the conference is ongoing. */
  endTime?: string;
  /** Output only. Server enforced expiration time for when this conference record resource is deleted. The resource is deleted 30 days after the conference ends. */
  expireTime?: string;
  /** Output only. The space where the conference was held. */
  space?: string;
}

export const ConferenceRecord: Schema.Schema<ConferenceRecord> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  space: Schema.optional(Schema.String),
})).annotate({ identifier: "ConferenceRecord" }) as any as Schema.Schema<ConferenceRecord>;

export interface ListConferenceRecordsResponse {
  /** List of conferences in one page. */
  conferenceRecords?: Array<ConferenceRecord>;
  /** Token to be circulated back for further List call if current List does NOT include all the Conferences. Unset if all conferences have been returned. */
  nextPageToken?: string;
}

export const ListConferenceRecordsResponse: Schema.Schema<ListConferenceRecordsResponse> = Schema.suspend(() => Schema.Struct({
  conferenceRecords: Schema.optional(Schema.Array(ConferenceRecord)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConferenceRecordsResponse" }) as any as Schema.Schema<ListConferenceRecordsResponse>;

export interface SignedinUser {
  /** Output only. Unique ID for the user. Interoperable with Admin SDK API and People API. Format: `users/{user}` */
  user?: string;
  /** Output only. For a personal device, it's the user's first name and last name. For a robot account, it's the administrator-specified device name. For example, "Altostrat Room". */
  displayName?: string;
}

export const SignedinUser: Schema.Schema<SignedinUser> = Schema.suspend(() => Schema.Struct({
  user: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "SignedinUser" }) as any as Schema.Schema<SignedinUser>;

export interface AnonymousUser {
  /** Output only. User provided name when they join a conference anonymously. */
  displayName?: string;
}

export const AnonymousUser: Schema.Schema<AnonymousUser> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AnonymousUser" }) as any as Schema.Schema<AnonymousUser>;

export interface PhoneUser {
  /** Output only. Partially redacted user's phone number when calling. */
  displayName?: string;
}

export const PhoneUser: Schema.Schema<PhoneUser> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "PhoneUser" }) as any as Schema.Schema<PhoneUser>;

export interface Participant {
  /** Signed-in user. */
  signedinUser?: SignedinUser;
  /** Anonymous user. */
  anonymousUser?: AnonymousUser;
  /** User calling from their phone. */
  phoneUser?: PhoneUser;
  /** Output only. Resource name of the participant. Format: `conferenceRecords/{conference_record}/participants/{participant}` */
  name?: string;
  /** Output only. Time when the participant first joined the meeting. */
  earliestStartTime?: string;
  /** Output only. Time when the participant left the meeting for the last time. This can be null if it's an active meeting. */
  latestEndTime?: string;
}

export const Participant: Schema.Schema<Participant> = Schema.suspend(() => Schema.Struct({
  signedinUser: Schema.optional(SignedinUser),
  anonymousUser: Schema.optional(AnonymousUser),
  phoneUser: Schema.optional(PhoneUser),
  name: Schema.optional(Schema.String),
  earliestStartTime: Schema.optional(Schema.String),
  latestEndTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Participant" }) as any as Schema.Schema<Participant>;

export interface ListParticipantsResponse {
  /** List of participants in one page. */
  participants?: Array<Participant>;
  /** Token to be circulated back for further List call if current List doesn't include all the participants. Unset if all participants are returned. */
  nextPageToken?: string;
  /** Total, exact number of `participants`. By default, this field isn't included in the response. Set the field mask in [SystemParameterContext](https://cloud.google.com/apis/docs/system-parameters) to receive this field in the response. */
  totalSize?: number;
}

export const ListParticipantsResponse: Schema.Schema<ListParticipantsResponse> = Schema.suspend(() => Schema.Struct({
  participants: Schema.optional(Schema.Array(Participant)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListParticipantsResponse" }) as any as Schema.Schema<ListParticipantsResponse>;

export interface ParticipantSession {
  /** Identifier. Session id. */
  name?: string;
  /** Output only. Timestamp when the user session starts. */
  startTime?: string;
  /** Output only. Timestamp when the user session ends. Unset if the user session hasn’t ended. */
  endTime?: string;
}

export const ParticipantSession: Schema.Schema<ParticipantSession> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ParticipantSession" }) as any as Schema.Schema<ParticipantSession>;

export interface ListParticipantSessionsResponse {
  /** List of participants in one page. */
  participantSessions?: Array<ParticipantSession>;
  /** Token to be circulated back for further List call if current List doesn't include all the participants. Unset if all participants are returned. */
  nextPageToken?: string;
}

export const ListParticipantSessionsResponse: Schema.Schema<ListParticipantSessionsResponse> = Schema.suspend(() => Schema.Struct({
  participantSessions: Schema.optional(Schema.Array(ParticipantSession)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListParticipantSessionsResponse" }) as any as Schema.Schema<ListParticipantSessionsResponse>;

export interface DriveDestination {
  /** Output only. The `fileId` for the underlying MP4 file. For example, "1kuceFZohVoCh6FulBHxwy6I15Ogpc4hP". Use `$ GET https://www.googleapis.com/drive/v3/files/{$fileId}?alt=media` to download the blob. For more information, see https://developers.google.com/drive/api/v3/reference/files/get. */
  file?: string;
  /** Output only. Link used to play back the recording file in the browser. For example, `https://drive.google.com/file/d/{$fileId}/view`. */
  exportUri?: string;
}

export const DriveDestination: Schema.Schema<DriveDestination> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(Schema.String),
  exportUri: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveDestination" }) as any as Schema.Schema<DriveDestination>;

export interface Recording {
  /** Output only. Recording is saved to Google Drive as an MP4 file. The `drive_destination` includes the Drive `fileId` that can be used to download the file using the `files.get` method of the Drive API. */
  driveDestination?: DriveDestination;
  /** Output only. Resource name of the recording. Format: `conferenceRecords/{conference_record}/recordings/{recording}` where `{recording}` is a 1:1 mapping to each unique recording session during the conference. */
  name?: string;
  /** Output only. Current state. */
  state?: "STATE_UNSPECIFIED" | "STARTED" | "ENDED" | "FILE_GENERATED" | (string & {});
  /** Output only. Timestamp when the recording started. */
  startTime?: string;
  /** Output only. Timestamp when the recording ended. */
  endTime?: string;
}

export const Recording: Schema.Schema<Recording> = Schema.suspend(() => Schema.Struct({
  driveDestination: Schema.optional(DriveDestination),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Recording" }) as any as Schema.Schema<Recording>;

export interface ListRecordingsResponse {
  /** List of recordings in one page. */
  recordings?: Array<Recording>;
  /** Token to be circulated back for further List call if current List doesn't include all the recordings. Unset if all recordings are returned. */
  nextPageToken?: string;
}

export const ListRecordingsResponse: Schema.Schema<ListRecordingsResponse> = Schema.suspend(() => Schema.Struct({
  recordings: Schema.optional(Schema.Array(Recording)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListRecordingsResponse" }) as any as Schema.Schema<ListRecordingsResponse>;

export interface DocsDestination {
  /** Output only. The document ID for the underlying Google Docs transcript file. For example, "1kuceFZohVoCh6FulBHxwy6I15Ogpc4hP". Use the `documents.get` method of the Google Docs API (https://developers.google.com/docs/api/reference/rest/v1/documents/get) to fetch the content. */
  document?: string;
  /** Output only. URI for the Google Docs transcript file. Use `https://docs.google.com/document/d/{$DocumentId}/view` to browse the transcript in the browser. */
  exportUri?: string;
}

export const DocsDestination: Schema.Schema<DocsDestination> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(Schema.String),
  exportUri: Schema.optional(Schema.String),
})).annotate({ identifier: "DocsDestination" }) as any as Schema.Schema<DocsDestination>;

export interface Transcript {
  /** Output only. Where the Google Docs transcript is saved. */
  docsDestination?: DocsDestination;
  /** Output only. Resource name of the transcript. Format: `conferenceRecords/{conference_record}/transcripts/{transcript}`, where `{transcript}` is a 1:1 mapping to each unique transcription session of the conference. */
  name?: string;
  /** Output only. Current state. */
  state?: "STATE_UNSPECIFIED" | "STARTED" | "ENDED" | "FILE_GENERATED" | (string & {});
  /** Output only. Timestamp when the transcript started. */
  startTime?: string;
  /** Output only. Timestamp when the transcript stopped. */
  endTime?: string;
}

export const Transcript: Schema.Schema<Transcript> = Schema.suspend(() => Schema.Struct({
  docsDestination: Schema.optional(DocsDestination),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Transcript" }) as any as Schema.Schema<Transcript>;

export interface ListTranscriptsResponse {
  /** List of transcripts in one page. */
  transcripts?: Array<Transcript>;
  /** Token to be circulated back for further List call if current List doesn't include all the transcripts. Unset if all transcripts are returned. */
  nextPageToken?: string;
}

export const ListTranscriptsResponse: Schema.Schema<ListTranscriptsResponse> = Schema.suspend(() => Schema.Struct({
  transcripts: Schema.optional(Schema.Array(Transcript)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTranscriptsResponse" }) as any as Schema.Schema<ListTranscriptsResponse>;

export interface TranscriptEntry {
  /** Output only. Resource name of the entry. Format: "conferenceRecords/{conference_record}/transcripts/{transcript}/entries/{entry}" */
  name?: string;
  /** Output only. Refers to the participant who speaks. */
  participant?: string;
  /** Output only. The transcribed text of the participant's voice, at maximum 10K words. Note that the limit is subject to change. */
  text?: string;
  /** Output only. Language of spoken text, such as "en-US". IETF BCP 47 syntax (https://tools.ietf.org/html/bcp47) */
  languageCode?: string;
  /** Output only. Timestamp when the transcript entry started. */
  startTime?: string;
  /** Output only. Timestamp when the transcript entry ended. */
  endTime?: string;
}

export const TranscriptEntry: Schema.Schema<TranscriptEntry> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  participant: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TranscriptEntry" }) as any as Schema.Schema<TranscriptEntry>;

export interface ListTranscriptEntriesResponse {
  /** List of TranscriptEntries in one page. */
  transcriptEntries?: Array<TranscriptEntry>;
  /** Token to be circulated back for further List call if current List doesn't include all the transcript entries. Unset if all entries are returned. */
  nextPageToken?: string;
}

export const ListTranscriptEntriesResponse: Schema.Schema<ListTranscriptEntriesResponse> = Schema.suspend(() => Schema.Struct({
  transcriptEntries: Schema.optional(Schema.Array(TranscriptEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTranscriptEntriesResponse" }) as any as Schema.Schema<ListTranscriptEntriesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a space. */
export interface CreateSpacesRequest {
  /** Request body */
  body?: Space;
}

export const CreateSpacesRequest = Schema.Struct({
  body: Schema.optional(Space).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/spaces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSpacesRequest>;

export type CreateSpacesResponse = Space;
export const CreateSpacesResponse = Space;

export type CreateSpacesError = CommonErrors;

export const createSpaces: API.OperationMethod<CreateSpacesRequest, CreateSpacesResponse, CreateSpacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSpacesRequest,
  output: CreateSpacesResponse,
  errors: [],
}));

/** Gets details about a meeting space. For an example, see [Get a meeting space](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#get-meeting-space). */
export interface GetSpacesRequest {
  /** Required. Resource name of the space. Format: `spaces/{space}` or `spaces/{meetingCode}`. `{space}` is the resource identifier for the space. It's a unique, server-generated ID and is case sensitive. For example, `jQCFfuBOdN5z`. `{meetingCode}` is an alias for the space. It's a typeable, unique character string and is non-case sensitive. For example, `abc-mnop-xyz`. The maximum length is 128 characters. A `meetingCode` shouldn't be stored long term as it can become dissociated from a meeting space and can be reused for different meeting spaces in the future. Generally, a `meetingCode` expires 365 days after last use. For more information, see [Learn about meeting codes in Google Meet](https://support.google.com/meet/answer/10710509). For more information, see [How Meet identifies a meeting space](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#identify-meeting-space). */
  name: string;
}

export const GetSpacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/spaces/{spacesId}" }),
  svc,
) as unknown as Schema.Schema<GetSpacesRequest>;

export type GetSpacesResponse = Space;
export const GetSpacesResponse = Space;

export type GetSpacesError = CommonErrors;

export const getSpaces: API.OperationMethod<GetSpacesRequest, GetSpacesResponse, GetSpacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSpacesRequest,
  output: GetSpacesResponse,
  errors: [],
}));

/** Updates details about a meeting space. For an example, see [Update a meeting space](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#update-meeting-space). */
export interface PatchSpacesRequest {
  /** Immutable. Resource name of the space. Format: `spaces/{space}`. `{space}` is the resource identifier for the space. It's a unique, server-generated ID and is case sensitive. For example, `jQCFfuBOdN5z`. For more information, see [How Meet identifies a meeting space](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#identify-meeting-space). */
  name: string;
  /** Optional. Field mask used to specify the fields to be updated in the space. If update_mask isn't provided(not set, set with empty paths, or only has "" as paths), it defaults to update all fields provided with values in the request. Using "*" as update_mask will update all fields, including deleting fields not set in the request. */
  updateMask?: string;
  /** Request body */
  body?: Space;
}

export const PatchSpacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Space).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/spaces/{spacesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSpacesRequest>;

export type PatchSpacesResponse = Space;
export const PatchSpacesResponse = Space;

export type PatchSpacesError = CommonErrors;

export const patchSpaces: API.OperationMethod<PatchSpacesRequest, PatchSpacesResponse, PatchSpacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchSpacesRequest,
  output: PatchSpacesResponse,
  errors: [],
}));

/** Ends an active conference (if there's one). For an example, see [End active conference](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#end-active-conference). */
export interface EndActiveConferenceSpacesRequest {
  /** Required. Resource name of the space. Format: `spaces/{space}`. `{space}` is the resource identifier for the space. It's a unique, server-generated ID and is case sensitive. For example, `jQCFfuBOdN5z`. For more information, see [How Meet identifies a meeting space](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#identify-meeting-space). */
  name: string;
  /** Request body */
  body?: EndActiveConferenceRequest;
}

export const EndActiveConferenceSpacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EndActiveConferenceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/spaces/{spacesId}:endActiveConference", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EndActiveConferenceSpacesRequest>;

export type EndActiveConferenceSpacesResponse = Empty;
export const EndActiveConferenceSpacesResponse = Empty;

export type EndActiveConferenceSpacesError = CommonErrors;

export const endActiveConferenceSpaces: API.OperationMethod<EndActiveConferenceSpacesRequest, EndActiveConferenceSpacesResponse, EndActiveConferenceSpacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EndActiveConferenceSpacesRequest,
  output: EndActiveConferenceSpacesResponse,
  errors: [],
}));

/** Gets a conference record by conference ID. */
export interface GetConferenceRecordsRequest {
  /** Required. Resource name of the conference. */
  name: string;
}

export const GetConferenceRecordsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}" }),
  svc,
) as unknown as Schema.Schema<GetConferenceRecordsRequest>;

export type GetConferenceRecordsResponse = ConferenceRecord;
export const GetConferenceRecordsResponse = ConferenceRecord;

export type GetConferenceRecordsError = CommonErrors;

export const getConferenceRecords: API.OperationMethod<GetConferenceRecordsRequest, GetConferenceRecordsResponse, GetConferenceRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConferenceRecordsRequest,
  output: GetConferenceRecordsResponse,
  errors: [],
}));

/** Lists the conference records. By default, ordered by start time and in descending order. */
export interface ListConferenceRecordsRequest {
  /** Optional. Maximum number of conference records to return. The service might return fewer than this value. If unspecified, at most 25 conference records are returned. The maximum value is 100; values above 100 are coerced to 100. Maximum might change in the future. */
  pageSize?: number;
  /** Optional. Page token returned from previous List Call. */
  pageToken?: string;
  /** Optional. User specified filtering condition in [EBNF format](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form). The following are the filterable fields: * `space.meeting_code` * `space.name` * `start_time` * `end_time` For example, consider the following filters: * `space.name = "spaces/NAME"` * `space.meeting_code = "abc-mnop-xyz"` * `start_time>="2024-01-01T00:00:00.000Z" AND start_time<="2024-01-02T00:00:00.000Z"` * `end_time IS NULL` */
  filter?: string;
}

export const ListConferenceRecordsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords" }),
  svc,
) as unknown as Schema.Schema<ListConferenceRecordsRequest>;

export type ListConferenceRecordsResponse_Op = ListConferenceRecordsResponse;
export const ListConferenceRecordsResponse_Op = ListConferenceRecordsResponse;

export type ListConferenceRecordsError = CommonErrors;

export const listConferenceRecords = API.makePaginated(() => ({
  input: ListConferenceRecordsRequest,
  output: ListConferenceRecordsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a participant by participant ID. */
export interface GetConferenceRecordsParticipantsRequest {
  /** Required. Resource name of the participant. */
  name: string;
}

export const GetConferenceRecordsParticipantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/participants/{participantsId}" }),
  svc,
) as unknown as Schema.Schema<GetConferenceRecordsParticipantsRequest>;

export type GetConferenceRecordsParticipantsResponse = Participant;
export const GetConferenceRecordsParticipantsResponse = Participant;

export type GetConferenceRecordsParticipantsError = CommonErrors;

export const getConferenceRecordsParticipants: API.OperationMethod<GetConferenceRecordsParticipantsRequest, GetConferenceRecordsParticipantsResponse, GetConferenceRecordsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConferenceRecordsParticipantsRequest,
  output: GetConferenceRecordsParticipantsResponse,
  errors: [],
}));

/** Lists the participants in a conference record. By default, ordered by join time and in descending order. This API supports `fields` as standard parameters like every other API. However, when the `fields` request parameter is omitted, this API defaults to `'participants/*, next_page_token'`. */
export interface ListConferenceRecordsParticipantsRequest {
  /** Required. Format: `conferenceRecords/{conference_record}` */
  parent: string;
  /** Maximum number of participants to return. The service might return fewer than this value. If unspecified, at most 100 participants are returned. The maximum value is 250; values above 250 are coerced to 250. Maximum might change in the future. */
  pageSize?: number;
  /** Page token returned from previous List Call. */
  pageToken?: string;
  /** Optional. User specified filtering condition in [EBNF format](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form). The following are the filterable fields: * `earliest_start_time` * `latest_end_time` For example, `latest_end_time IS NULL` returns active participants in the conference. */
  filter?: string;
}

export const ListConferenceRecordsParticipantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/participants" }),
  svc,
) as unknown as Schema.Schema<ListConferenceRecordsParticipantsRequest>;

export type ListConferenceRecordsParticipantsResponse = ListParticipantsResponse;
export const ListConferenceRecordsParticipantsResponse = ListParticipantsResponse;

export type ListConferenceRecordsParticipantsError = CommonErrors;

export const listConferenceRecordsParticipants = API.makePaginated(() => ({
  input: ListConferenceRecordsParticipantsRequest,
  output: ListConferenceRecordsParticipantsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a participant session by participant session ID. */
export interface GetConferenceRecordsParticipantsParticipantSessionsRequest {
  /** Required. Resource name of the participant. */
  name: string;
}

export const GetConferenceRecordsParticipantsParticipantSessionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/participants/{participantsId}/participantSessions/{participantSessionsId}" }),
  svc,
) as unknown as Schema.Schema<GetConferenceRecordsParticipantsParticipantSessionsRequest>;

export type GetConferenceRecordsParticipantsParticipantSessionsResponse = ParticipantSession;
export const GetConferenceRecordsParticipantsParticipantSessionsResponse = ParticipantSession;

export type GetConferenceRecordsParticipantsParticipantSessionsError = CommonErrors;

export const getConferenceRecordsParticipantsParticipantSessions: API.OperationMethod<GetConferenceRecordsParticipantsParticipantSessionsRequest, GetConferenceRecordsParticipantsParticipantSessionsResponse, GetConferenceRecordsParticipantsParticipantSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConferenceRecordsParticipantsParticipantSessionsRequest,
  output: GetConferenceRecordsParticipantsParticipantSessionsResponse,
  errors: [],
}));

/** Lists the participant sessions of a participant in a conference record. By default, ordered by join time and in descending order. This API supports `fields` as standard parameters like every other API. However, when the `fields` request parameter is omitted this API defaults to `'participantsessions/*, next_page_token'`. */
export interface ListConferenceRecordsParticipantsParticipantSessionsRequest {
  /** Required. Format: `conferenceRecords/{conference_record}/participants/{participant}` */
  parent: string;
  /** Optional. Maximum number of participant sessions to return. The service might return fewer than this value. If unspecified, at most 100 participants are returned. The maximum value is 250; values above 250 are coerced to 250. Maximum might change in the future. */
  pageSize?: number;
  /** Optional. Page token returned from previous List Call. */
  pageToken?: string;
  /** Optional. User specified filtering condition in [EBNF format](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form). The following are the filterable fields: * `start_time` * `end_time` For example, `end_time IS NULL` returns active participant sessions in the conference record. */
  filter?: string;
}

export const ListConferenceRecordsParticipantsParticipantSessionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/participants/{participantsId}/participantSessions" }),
  svc,
) as unknown as Schema.Schema<ListConferenceRecordsParticipantsParticipantSessionsRequest>;

export type ListConferenceRecordsParticipantsParticipantSessionsResponse = ListParticipantSessionsResponse;
export const ListConferenceRecordsParticipantsParticipantSessionsResponse = ListParticipantSessionsResponse;

export type ListConferenceRecordsParticipantsParticipantSessionsError = CommonErrors;

export const listConferenceRecordsParticipantsParticipantSessions = API.makePaginated(() => ({
  input: ListConferenceRecordsParticipantsParticipantSessionsRequest,
  output: ListConferenceRecordsParticipantsParticipantSessionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a recording by recording ID. */
export interface GetConferenceRecordsRecordingsRequest {
  /** Required. Resource name of the recording. */
  name: string;
}

export const GetConferenceRecordsRecordingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/recordings/{recordingsId}" }),
  svc,
) as unknown as Schema.Schema<GetConferenceRecordsRecordingsRequest>;

export type GetConferenceRecordsRecordingsResponse = Recording;
export const GetConferenceRecordsRecordingsResponse = Recording;

export type GetConferenceRecordsRecordingsError = CommonErrors;

export const getConferenceRecordsRecordings: API.OperationMethod<GetConferenceRecordsRecordingsRequest, GetConferenceRecordsRecordingsResponse, GetConferenceRecordsRecordingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConferenceRecordsRecordingsRequest,
  output: GetConferenceRecordsRecordingsResponse,
  errors: [],
}));

/** Lists the recording resources from the conference record. By default, ordered by start time and in ascending order. */
export interface ListConferenceRecordsRecordingsRequest {
  /** Required. Format: `conferenceRecords/{conference_record}` */
  parent: string;
  /** Maximum number of recordings to return. The service might return fewer than this value. If unspecified, at most 10 recordings are returned. The maximum value is 100; values above 100 are coerced to 100. Maximum might change in the future. */
  pageSize?: number;
  /** Page token returned from previous List Call. */
  pageToken?: string;
}

export const ListConferenceRecordsRecordingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/recordings" }),
  svc,
) as unknown as Schema.Schema<ListConferenceRecordsRecordingsRequest>;

export type ListConferenceRecordsRecordingsResponse = ListRecordingsResponse;
export const ListConferenceRecordsRecordingsResponse = ListRecordingsResponse;

export type ListConferenceRecordsRecordingsError = CommonErrors;

export const listConferenceRecordsRecordings = API.makePaginated(() => ({
  input: ListConferenceRecordsRecordingsRequest,
  output: ListConferenceRecordsRecordingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a transcript by transcript ID. */
export interface GetConferenceRecordsTranscriptsRequest {
  /** Required. Resource name of the transcript. */
  name: string;
}

export const GetConferenceRecordsTranscriptsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/transcripts/{transcriptsId}" }),
  svc,
) as unknown as Schema.Schema<GetConferenceRecordsTranscriptsRequest>;

export type GetConferenceRecordsTranscriptsResponse = Transcript;
export const GetConferenceRecordsTranscriptsResponse = Transcript;

export type GetConferenceRecordsTranscriptsError = CommonErrors;

export const getConferenceRecordsTranscripts: API.OperationMethod<GetConferenceRecordsTranscriptsRequest, GetConferenceRecordsTranscriptsResponse, GetConferenceRecordsTranscriptsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConferenceRecordsTranscriptsRequest,
  output: GetConferenceRecordsTranscriptsResponse,
  errors: [],
}));

/** Lists the set of transcripts from the conference record. By default, ordered by start time and in ascending order. */
export interface ListConferenceRecordsTranscriptsRequest {
  /** Required. Format: `conferenceRecords/{conference_record}` */
  parent: string;
  /** Maximum number of transcripts to return. The service might return fewer than this value. If unspecified, at most 10 transcripts are returned. The maximum value is 100; values above 100 are coerced to 100. Maximum might change in the future. */
  pageSize?: number;
  /** Page token returned from previous List Call. */
  pageToken?: string;
}

export const ListConferenceRecordsTranscriptsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/transcripts" }),
  svc,
) as unknown as Schema.Schema<ListConferenceRecordsTranscriptsRequest>;

export type ListConferenceRecordsTranscriptsResponse = ListTranscriptsResponse;
export const ListConferenceRecordsTranscriptsResponse = ListTranscriptsResponse;

export type ListConferenceRecordsTranscriptsError = CommonErrors;

export const listConferenceRecordsTranscripts = API.makePaginated(() => ({
  input: ListConferenceRecordsTranscriptsRequest,
  output: ListConferenceRecordsTranscriptsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a `TranscriptEntry` resource by entry ID. Note: The transcript entries returned by the Google Meet API might not match the transcription found in the Google Docs transcript file. This can occur when 1) we have interleaved speakers within milliseconds, or 2) the Google Docs transcript file is modified after generation. */
export interface GetConferenceRecordsTranscriptsEntriesRequest {
  /** Required. Resource name of the `TranscriptEntry`. */
  name: string;
}

export const GetConferenceRecordsTranscriptsEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/transcripts/{transcriptsId}/entries/{entriesId}" }),
  svc,
) as unknown as Schema.Schema<GetConferenceRecordsTranscriptsEntriesRequest>;

export type GetConferenceRecordsTranscriptsEntriesResponse = TranscriptEntry;
export const GetConferenceRecordsTranscriptsEntriesResponse = TranscriptEntry;

export type GetConferenceRecordsTranscriptsEntriesError = CommonErrors;

export const getConferenceRecordsTranscriptsEntries: API.OperationMethod<GetConferenceRecordsTranscriptsEntriesRequest, GetConferenceRecordsTranscriptsEntriesResponse, GetConferenceRecordsTranscriptsEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConferenceRecordsTranscriptsEntriesRequest,
  output: GetConferenceRecordsTranscriptsEntriesResponse,
  errors: [],
}));

/** Lists the structured transcript entries per transcript. By default, ordered by start time and in ascending order. Note: The transcript entries returned by the Google Meet API might not match the transcription found in the Google Docs transcript file. This can occur when 1) we have interleaved speakers within milliseconds, or 2) the Google Docs transcript file is modified after generation. */
export interface ListConferenceRecordsTranscriptsEntriesRequest {
  /** Required. Format: `conferenceRecords/{conference_record}/transcripts/{transcript}` */
  parent: string;
  /** Maximum number of entries to return. The service might return fewer than this value. If unspecified, at most 10 entries are returned. The maximum value is 100; values above 100 are coerced to 100. Maximum might change in the future. */
  pageSize?: number;
  /** Page token returned from previous List Call. */
  pageToken?: string;
}

export const ListConferenceRecordsTranscriptsEntriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/conferenceRecords/{conferenceRecordsId}/transcripts/{transcriptsId}/entries" }),
  svc,
) as unknown as Schema.Schema<ListConferenceRecordsTranscriptsEntriesRequest>;

export type ListConferenceRecordsTranscriptsEntriesResponse = ListTranscriptEntriesResponse;
export const ListConferenceRecordsTranscriptsEntriesResponse = ListTranscriptEntriesResponse;

export type ListConferenceRecordsTranscriptsEntriesError = CommonErrors;

export const listConferenceRecordsTranscriptsEntries = API.makePaginated(() => ({
  input: ListConferenceRecordsTranscriptsEntriesRequest,
  output: ListConferenceRecordsTranscriptsEntriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

