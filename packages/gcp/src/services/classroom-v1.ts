// ==========================================================================
// Google Classroom API (classroom v1)
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
  name: "classroom",
  version: "v1",
  rootUrl: "https://classroom.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DriveFolder {
  /** Drive API resource ID. */
  id?: string;
  /** URL that can be used to access the Drive folder. Read-only. */
  alternateLink?: string;
  /** Title of the Drive folder. Read-only. */
  title?: string;
}

export const DriveFolder: Schema.Schema<DriveFolder> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      alternateLink: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DriveFolder",
  }) as any as Schema.Schema<DriveFolder>;

export interface Form {
  /** Title of the Form. Read-only. */
  title?: string;
  /** URL of the form responses document. Only set if responses have been recorded and only when the requesting user is an editor of the form. Read-only. */
  responseUrl?: string;
  /** URL of a thumbnail image of the Form. Read-only. */
  thumbnailUrl?: string;
  /** URL of the form. */
  formUrl?: string;
}

export const Form: Schema.Schema<Form> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      responseUrl: Schema.optional(Schema.String),
      thumbnailUrl: Schema.optional(Schema.String),
      formUrl: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Form" }) as any as Schema.Schema<Form>;

export interface DriveFile {
  /** Title of the Drive item. Read-only. */
  title?: string;
  /** Drive API resource ID. */
  id?: string;
  /** URL that can be used to access the Drive item. Read-only. */
  alternateLink?: string;
  /** URL of a thumbnail image of the Drive item. Read-only. */
  thumbnailUrl?: string;
}

export const DriveFile: Schema.Schema<DriveFile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      alternateLink: Schema.optional(Schema.String),
      thumbnailUrl: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DriveFile" }) as any as Schema.Schema<DriveFile>;

export interface Link {
  /** Title of the target of the URL. Read-only. */
  title?: string;
  /** URL of a thumbnail image of the target URL. Read-only. */
  thumbnailUrl?: string;
  /** URL to link to. This must be a valid UTF-8 string containing between 1 and 2024 characters. */
  url?: string;
}

export const Link: Schema.Schema<Link> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      thumbnailUrl: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface YouTubeVideo {
  /** YouTube API resource ID. */
  id?: string;
  /** URL that can be used to view the YouTube video. Read-only. */
  alternateLink?: string;
  /** URL of a thumbnail image of the YouTube video. Read-only. */
  thumbnailUrl?: string;
  /** Title of the YouTube video. Read-only. */
  title?: string;
}

export const YouTubeVideo: Schema.Schema<YouTubeVideo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      alternateLink: Schema.optional(Schema.String),
      thumbnailUrl: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "YouTubeVideo",
  }) as any as Schema.Schema<YouTubeVideo>;

export interface CourseMaterial {
  /** Google Forms attachment. */
  form?: Form;
  /** Google Drive file attachment. */
  driveFile?: DriveFile;
  /** Link atatchment. */
  link?: Link;
  /** Youtube video attachment. */
  youTubeVideo?: YouTubeVideo;
}

export const CourseMaterial: Schema.Schema<CourseMaterial> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      form: Schema.optional(Form),
      driveFile: Schema.optional(DriveFile),
      link: Schema.optional(Link),
      youTubeVideo: Schema.optional(YouTubeVideo),
    }),
  ).annotate({
    identifier: "CourseMaterial",
  }) as any as Schema.Schema<CourseMaterial>;

export interface CourseMaterialSet {
  /** Title for this set. */
  title?: string;
  /** Materials attached to this set. */
  materials?: Array<CourseMaterial>;
}

export const CourseMaterialSet: Schema.Schema<CourseMaterialSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      materials: Schema.optional(Schema.Array(CourseMaterial)),
    }),
  ).annotate({
    identifier: "CourseMaterialSet",
  }) as any as Schema.Schema<CourseMaterialSet>;

export interface GradeCategory {
  /** ID of the grade category. */
  id?: string;
  /** Name of the grade category. */
  name?: string;
  /** The weight of the category average as part of overall average. A weight of 12.34% is represented as 123400 (100% is 1,000,000). The last two digits should always be zero since we use two decimal precision. Only applicable when grade calculation type is WEIGHTED_CATEGORIES. */
  weight?: number;
  /** Default value of denominator. Only applicable when grade calculation type is TOTAL_POINTS. */
  defaultGradeDenominator?: number;
}

export const GradeCategory: Schema.Schema<GradeCategory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      weight: Schema.optional(Schema.Number),
      defaultGradeDenominator: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GradeCategory",
  }) as any as Schema.Schema<GradeCategory>;

export interface GradebookSettings {
  /** Indicates who can see the overall grade.. */
  displaySetting?:
    | "DISPLAY_SETTING_UNSPECIFIED"
    | "SHOW_OVERALL_GRADE"
    | "HIDE_OVERALL_GRADE"
    | "SHOW_TEACHERS_ONLY"
    | (string & {});
  /** Indicates how the overall grade is calculated. */
  calculationType?:
    | "CALCULATION_TYPE_UNSPECIFIED"
    | "TOTAL_POINTS"
    | "WEIGHTED_CATEGORIES"
    | (string & {});
  /** Grade categories that are available for coursework in the course. */
  gradeCategories?: Array<GradeCategory>;
}

export const GradebookSettings: Schema.Schema<GradebookSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displaySetting: Schema.optional(Schema.String),
      calculationType: Schema.optional(Schema.String),
      gradeCategories: Schema.optional(Schema.Array(GradeCategory)),
    }),
  ).annotate({
    identifier: "GradebookSettings",
  }) as any as Schema.Schema<GradebookSettings>;

export interface Course {
  /** Information about a Drive Folder that is shared with all teachers of the course. This field will only be set for teachers of the course and domain administrators. Read-only. */
  teacherFolder?: DriveFolder;
  /** Identifier for this course assigned by Classroom. When creating a course, you may optionally set this identifier to an alias string in the request to create a corresponding alias. The `id` is still assigned by Classroom and cannot be updated after the course is created. Specifying this field in a course update mask results in an error. */
  id?: string;
  /** Optional. The subject of the course. */
  subject?: string;
  /** Optional room location. For example, "301". If set, this field must be a valid UTF-8 string and no longer than 650 characters. */
  room?: string;
  /** Time of the most recent update to this course. Specifying this field in a course update mask results in an error. Read-only. */
  updateTime?: string;
  /** The email address of a Google group containing all teachers of the course. This group does not accept email and can only be used for permissions. Read-only. */
  teacherGroupEmail?: string;
  /** Name of the course. For example, "10th Grade Biology". The name is required. It must be between 1 and 750 characters and a valid UTF-8 string. */
  name?: string;
  /** Optional heading for the description. For example, "Welcome to 10th Grade Biology." If set, this field must be a valid UTF-8 string and no longer than 3600 characters. */
  descriptionHeading?: string;
  /** Sets of materials that appear on the "about" page of this course. Read-only. */
  courseMaterialSets?: Array<CourseMaterialSet>;
  /** The identifier of the owner of a course. When specified as a parameter of a create course request, this field is required. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user This must be set in a create request. Admins can also specify this field in a patch course request to transfer ownership. In other contexts, it is read-only. */
  ownerId?: string;
  /** State of the course. If unspecified, the default state is `PROVISIONED`. */
  courseState?:
    | "COURSE_STATE_UNSPECIFIED"
    | "ACTIVE"
    | "ARCHIVED"
    | "PROVISIONED"
    | "DECLINED"
    | "SUSPENDED"
    | (string & {});
  /** The email address of a Google group containing all members of the course. This group does not accept email and can only be used for permissions. Read-only. */
  courseGroupEmail?: string;
  /** Whether or not guardian notifications are enabled for this course. Read-only. */
  guardiansEnabled?: boolean;
  /** Absolute link to this course in the Classroom web UI. Read-only. */
  alternateLink?: string;
  /** The gradebook settings that specify how a student's overall grade for the course will be calculated and who it will be displayed to. Read-only. */
  gradebookSettings?: GradebookSettings;
  /** Creation time of the course. Specifying this field in a course update mask results in an error. Read-only. */
  creationTime?: string;
  /** Optional description. For example, "We'll be learning about the structure of living creatures from a combination of textbooks, guest lectures, and lab work. Expect to be excited!" If set, this field must be a valid UTF-8 string and no longer than 30,000 characters. */
  description?: string;
  /** Enrollment code to use when joining this course. Specifying this field in a course update mask results in an error. Read-only. */
  enrollmentCode?: string;
  /** Section of the course. For example, "Period 2". If set, this field must be a valid UTF-8 string and no longer than 2800 characters. */
  section?: string;
  /** The Calendar ID for a calendar that all course members can see, to which Classroom adds events for course work and announcements in the course. The Calendar for a course is created asynchronously when the course is set to `CourseState.ACTIVE` for the first time (at creation time or when it is updated to `ACTIVE` through the UI or the API). The Calendar ID will not be populated until the creation process is completed. Read-only. */
  calendarId?: string;
}

export const Course: Schema.Schema<Course> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      teacherFolder: Schema.optional(DriveFolder),
      id: Schema.optional(Schema.String),
      subject: Schema.optional(Schema.String),
      room: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      teacherGroupEmail: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      descriptionHeading: Schema.optional(Schema.String),
      courseMaterialSets: Schema.optional(Schema.Array(CourseMaterialSet)),
      ownerId: Schema.optional(Schema.String),
      courseState: Schema.optional(Schema.String),
      courseGroupEmail: Schema.optional(Schema.String),
      guardiansEnabled: Schema.optional(Schema.Boolean),
      alternateLink: Schema.optional(Schema.String),
      gradebookSettings: Schema.optional(GradebookSettings),
      creationTime: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      enrollmentCode: Schema.optional(Schema.String),
      section: Schema.optional(Schema.String),
      calendarId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Course" }) as any as Schema.Schema<Course>;

export interface Invitation {
  /** Identifier assigned by Classroom. Read-only. */
  id?: string;
  /** Identifier of the invited user. When specified as a parameter of a request, this identifier can be set to one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Identifier of the course to invite the user to. */
  courseId?: string;
  /** Role to invite the user to have. Must not be `COURSE_ROLE_UNSPECIFIED`. */
  role?:
    | "COURSE_ROLE_UNSPECIFIED"
    | "STUDENT"
    | "TEACHER"
    | "OWNER"
    | (string & {});
}

export const Invitation: Schema.Schema<Invitation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      courseId: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Invitation" }) as any as Schema.Schema<Invitation>;

export interface ListInvitationsResponse {
  /** Invitations that match the list request. */
  invitations?: Array<Invitation>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListInvitationsResponse: Schema.Schema<ListInvitationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      invitations: Schema.optional(Schema.Array(Invitation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListInvitationsResponse",
  }) as any as Schema.Schema<ListInvitationsResponse>;

export interface Name {
  /** The user's last name. Read-only. */
  familyName?: string;
  /** The user's full name formed by concatenating the first and last name values. Read-only. */
  fullName?: string;
  /** The user's first name. Read-only. */
  givenName?: string;
}

export const Name: Schema.Schema<Name> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      familyName: Schema.optional(Schema.String),
      fullName: Schema.optional(Schema.String),
      givenName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Name" }) as any as Schema.Schema<Name>;

export interface GlobalPermission {
  /** Permission value. */
  permission?: "PERMISSION_UNSPECIFIED" | "CREATE_COURSE" | (string & {});
}

export const GlobalPermission: Schema.Schema<GlobalPermission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permission: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GlobalPermission",
  }) as any as Schema.Schema<GlobalPermission>;

export interface UserProfile {
  /** Email address of the user. Must request `https://www.googleapis.com/auth/classroom.profile.emails` scope for this field to be populated in a response body. Read-only. */
  emailAddress?: string;
  /** Represents whether a Google Workspace for Education user's domain administrator has explicitly verified them as being a teacher. This field is always false if the user is not a member of a Google Workspace for Education domain. Read-only */
  verifiedTeacher?: boolean;
  /** Name of the user. Read-only. */
  name?: Name;
  /** URL of user's profile photo. Must request `https://www.googleapis.com/auth/classroom.profile.photos` scope for this field to be populated in a response body. Read-only. */
  photoUrl?: string;
  /** Global permissions of the user. Read-only. */
  permissions?: Array<GlobalPermission>;
  /** Identifier of the user. Read-only. */
  id?: string;
}

export const UserProfile: Schema.Schema<UserProfile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      emailAddress: Schema.optional(Schema.String),
      verifiedTeacher: Schema.optional(Schema.Boolean),
      name: Schema.optional(Name),
      photoUrl: Schema.optional(Schema.String),
      permissions: Schema.optional(Schema.Array(GlobalPermission)),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UserProfile",
  }) as any as Schema.Schema<UserProfile>;

export interface Teacher {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Identifier of the user. When specified as a parameter of a request, this identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Global user information for the teacher. Read-only. */
  profile?: UserProfile;
}

export const Teacher: Schema.Schema<Teacher> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courseId: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      profile: Schema.optional(UserProfile),
    }),
  ).annotate({ identifier: "Teacher" }) as any as Schema.Schema<Teacher>;

export interface ListTeachersResponse {
  /** Teachers who match the list request. */
  teachers?: Array<Teacher>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListTeachersResponse: Schema.Schema<ListTeachersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      teachers: Schema.optional(Schema.Array(Teacher)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListTeachersResponse",
  }) as any as Schema.Schema<ListTeachersResponse>;

export interface Classroom_Date {
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

export const Classroom_Date: Schema.Schema<Classroom_Date> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
      year: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Classroom_Date",
  }) as any as Schema.Schema<Classroom_Date>;

export interface GradingPeriod {
  /** Required. Start date, in UTC, of the grading period. Inclusive. */
  startDate?: Classroom_Date;
  /** Required. Title of the grading period. For example, “Semester 1”. */
  title?: string;
  /** Output only. System generated grading period ID. Read-only. */
  id?: string;
  /** Required. End date, in UTC, of the grading period. Inclusive. */
  endDate?: Classroom_Date;
}

export const GradingPeriod: Schema.Schema<GradingPeriod> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startDate: Schema.optional(Classroom_Date),
      title: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      endDate: Schema.optional(Classroom_Date),
    }),
  ).annotate({
    identifier: "GradingPeriod",
  }) as any as Schema.Schema<GradingPeriod>;

export interface GradingPeriodSettings {
  /** The list of grading periods in a specific course. Grading periods must not have overlapping date ranges and must be listed in chronological order. Each grading period must have a unique title within a course. */
  gradingPeriods?: Array<GradingPeriod>;
  /** Supports toggling the application of grading periods on existing stream items. Once set, this value is persisted meaning that it does not need to be set in every request to update `GradingPeriodSettings`. If not previously set, the default is False. */
  applyToExistingCoursework?: boolean;
}

export const GradingPeriodSettings: Schema.Schema<GradingPeriodSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gradingPeriods: Schema.optional(Schema.Array(GradingPeriod)),
      applyToExistingCoursework: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GradingPeriodSettings",
  }) as any as Schema.Schema<GradingPeriodSettings>;

export interface EmbedUri {
  /** Required. URI to be iframed after being populated with query parameters. This must be a valid UTF-8 string containing between 1 and 1800 characters. */
  uri?: string;
}

export const EmbedUri: Schema.Schema<EmbedUri> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "EmbedUri" }) as any as Schema.Schema<EmbedUri>;

export interface CopyHistory {
  /** Immutable. Identifier of the course. */
  courseId?: string;
  /** Immutable. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Immutable. Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. */
  itemId?: string;
  /** Immutable. Identifier of the attachment. */
  attachmentId?: string;
}

export const CopyHistory: Schema.Schema<CopyHistory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courseId: Schema.optional(Schema.String),
      postId: Schema.optional(Schema.String),
      itemId: Schema.optional(Schema.String),
      attachmentId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CopyHistory",
  }) as any as Schema.Schema<CopyHistory>;

export interface TimeOfDay {
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      seconds: Schema.optional(Schema.Number),
      nanos: Schema.optional(Schema.Number),
      hours: Schema.optional(Schema.Number),
      minutes: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface AddOnAttachment {
  /** Required. URI to show the teacher view of the attachment. The URI will be opened in an iframe with the `courseId`, `itemId`, `itemType`, and `attachmentId` query parameters set. */
  teacherViewUri?: EmbedUri;
  /** Maximum grade for this attachment. Can only be set if `studentWorkReviewUri` is set. Set to a non-zero value to indicate that the attachment supports grade passback. If set, this must be a non-negative integer value. When set to zero, the attachment will not support grade passback. */
  maxPoints?: number;
  /** Immutable. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Required. URI to show the student view of the attachment. The URI will be opened in an iframe with the `courseId`, `itemId`, `itemType`, and `attachmentId` query parameters set. */
  studentViewUri?: EmbedUri;
  /** URI for the teacher to see student work on the attachment, if applicable. The URI will be opened in an iframe with the `courseId`, `itemId`, `itemType`, `attachmentId`, and `submissionId` query parameters set. This is the same `submissionId` returned in the [`AddOnContext.studentContext`](//devsite.google.com/classroom/reference/rest/v1/AddOnContext#StudentContext) field when a student views the attachment. If the URI is omitted or removed, `max_points` will also be discarded. */
  studentWorkReviewUri?: EmbedUri;
  /** Date, in UTC, that work on this attachment is due. This must be specified if `due_time` is specified. */
  dueDate?: Classroom_Date;
  /** Required. Title of this attachment. The title must be between 1 and 1000 characters. */
  title?: string;
  /** Output only. Identifiers of attachments that were previous copies of this attachment. If the attachment was previously copied by virtue of its parent post being copied, this enumerates the identifiers of attachments that were its previous copies in ascending chronological order of copy. */
  copyHistory?: Array<CopyHistory>;
  /** Immutable. Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. Unique per course. */
  itemId?: string;
  /** Time of day, in UTC, that work on this attachment is due. This must be specified if `due_date` is specified. */
  dueTime?: TimeOfDay;
  /** Immutable. Identifier of the course. */
  courseId?: string;
  /** Immutable. Classroom-assigned identifier for this attachment, unique per post. */
  id?: string;
}

export const AddOnAttachment: Schema.Schema<AddOnAttachment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      teacherViewUri: Schema.optional(EmbedUri),
      maxPoints: Schema.optional(Schema.Number),
      postId: Schema.optional(Schema.String),
      studentViewUri: Schema.optional(EmbedUri),
      studentWorkReviewUri: Schema.optional(EmbedUri),
      dueDate: Schema.optional(Classroom_Date),
      title: Schema.optional(Schema.String),
      copyHistory: Schema.optional(Schema.Array(CopyHistory)),
      itemId: Schema.optional(Schema.String),
      dueTime: Schema.optional(TimeOfDay),
      courseId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AddOnAttachment",
  }) as any as Schema.Schema<AddOnAttachment>;

export interface Student {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Identifier of the user. When specified as a parameter of a request, this identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Global user information for the student. Read-only. */
  profile?: UserProfile;
  /** Information about a Drive Folder for this student's work in this course. Only visible to the student and domain administrators. Read-only. */
  studentWorkFolder?: DriveFolder;
}

export const Student: Schema.Schema<Student> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courseId: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      profile: Schema.optional(UserProfile),
      studentWorkFolder: Schema.optional(DriveFolder),
    }),
  ).annotate({ identifier: "Student" }) as any as Schema.Schema<Student>;

export interface NotebookLmNotebook {
  /** Notebook resource id. */
  id?: string;
  /** URL that can be used to access the Notebook. */
  url?: string;
  /** Title of the Notebook. */
  title?: string;
}

export const NotebookLmNotebook: Schema.Schema<NotebookLmNotebook> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NotebookLmNotebook",
  }) as any as Schema.Schema<NotebookLmNotebook>;

export interface GeminiGem {
  /** Gems resource id. */
  id?: string;
  /** URL that can be used to access the Gem. */
  url?: string;
  /** Title of the Gem. */
  title?: string;
}

export const GeminiGem: Schema.Schema<GeminiGem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "GeminiGem" }) as any as Schema.Schema<GeminiGem>;

export interface SharedDriveFile {
  /** Drive file details. */
  driveFile?: DriveFile;
  /** Mechanism by which students access the Drive item. */
  shareMode?:
    | "UNKNOWN_SHARE_MODE"
    | "VIEW"
    | "EDIT"
    | "STUDENT_COPY"
    | (string & {});
}

export const SharedDriveFile: Schema.Schema<SharedDriveFile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      driveFile: Schema.optional(DriveFile),
      shareMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SharedDriveFile",
  }) as any as Schema.Schema<SharedDriveFile>;

export interface Material {
  /** NotebookLM Notebook material. Read-only. */
  notebook?: NotebookLmNotebook;
  /** Google Forms material. Read-only. */
  form?: Form;
  /** Gemini Gem material. Read-only. */
  gem?: GeminiGem;
  /** YouTube video material. */
  youtubeVideo?: YouTubeVideo;
  /** Google Drive file material. */
  driveFile?: SharedDriveFile;
  /** Link material. On creation, this is upgraded to a more appropriate type if possible, and this is reflected in the response. */
  link?: Link;
}

export const Material: Schema.Schema<Material> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      notebook: Schema.optional(NotebookLmNotebook),
      form: Schema.optional(Form),
      gem: Schema.optional(GeminiGem),
      youtubeVideo: Schema.optional(YouTubeVideo),
      driveFile: Schema.optional(SharedDriveFile),
      link: Schema.optional(Link),
    }),
  ).annotate({ identifier: "Material" }) as any as Schema.Schema<Material>;

export interface IndividualStudentsOptions {
  /** Identifiers for the students that have access to the coursework/announcement. */
  studentIds?: Array<string>;
}

export const IndividualStudentsOptions: Schema.Schema<IndividualStudentsOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      studentIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "IndividualStudentsOptions",
  }) as any as Schema.Schema<IndividualStudentsOptions>;

export interface Announcement {
  /** Optional timestamp when this announcement is scheduled to be published. */
  scheduledTime?: string;
  /** Description of this announcement. The text must be a valid UTF-8 string containing no more than 30,000 characters. */
  text?: string;
  /** Timestamp when this announcement was created. Read-only. */
  creationTime?: string;
  /** Assignee mode of the announcement. If unspecified, the default value is `ALL_STUDENTS`. */
  assigneeMode?:
    | "ASSIGNEE_MODE_UNSPECIFIED"
    | "ALL_STUDENTS"
    | "INDIVIDUAL_STUDENTS"
    | (string & {});
  /** Identifier for the user that created the announcement. Read-only. */
  creatorUserId?: string;
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Classroom-assigned identifier of this announcement, unique per course. Read-only. */
  id?: string;
  /** Additional materials. Announcements must have no more than 20 material items. */
  materials?: Array<Material>;
  /** Status of this announcement. If unspecified, the default state is `DRAFT`. */
  state?:
    | "ANNOUNCEMENT_STATE_UNSPECIFIED"
    | "PUBLISHED"
    | "DRAFT"
    | "DELETED"
    | (string & {});
  /** Absolute link to this announcement in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only. */
  alternateLink?: string;
  /** Identifiers of students with access to the announcement. This field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in this field can see the announcement. */
  individualStudentsOptions?: IndividualStudentsOptions;
  /** Timestamp of the most recent change to this announcement. Read-only. */
  updateTime?: string;
}

export const Announcement: Schema.Schema<Announcement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scheduledTime: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
      creationTime: Schema.optional(Schema.String),
      assigneeMode: Schema.optional(Schema.String),
      creatorUserId: Schema.optional(Schema.String),
      courseId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      materials: Schema.optional(Schema.Array(Material)),
      state: Schema.optional(Schema.String),
      alternateLink: Schema.optional(Schema.String),
      individualStudentsOptions: Schema.optional(IndividualStudentsOptions),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Announcement",
  }) as any as Schema.Schema<Announcement>;

export interface Level {
  /** The title of the level. If the level has no points set, title must be set. */
  title?: string;
  /** The level ID. On creation, an ID is assigned. */
  id?: string;
  /** The description of the level. */
  description?: string;
  /** Optional points associated with this level. If set, all levels within the rubric must specify points and the value must be distinct across all levels within a single criterion. 0 is distinct from no points. */
  points?: number;
}

export const Level: Schema.Schema<Level> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      points: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Level" }) as any as Schema.Schema<Level>;

export interface Criterion {
  /** The list of levels within this criterion. */
  levels?: Array<Level>;
  /** The criterion ID. On creation, an ID is assigned. */
  id?: string;
  /** The description of the criterion. */
  description?: string;
  /** The title of the criterion. */
  title?: string;
}

export const Criterion: Schema.Schema<Criterion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      levels: Schema.optional(Schema.Array(Level)),
      id: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Criterion" }) as any as Schema.Schema<Criterion>;

export interface Rubric {
  /** List of criteria. Each criterion is a dimension on which performance is rated. */
  criteria?: Array<Criterion>;
  /** Output only. Timestamp of the most recent change to this rubric. Read-only. */
  updateTime?: string;
  /** Output only. Timestamp when this rubric was created. Read-only. */
  creationTime?: string;
  /** Input only. Immutable. Google Sheets ID of the spreadsheet. This spreadsheet must contain formatted rubric settings. See [Create or reuse a rubric for an assignment](https://support.google.com/edu/classroom/answer/9335069). Use of this field requires the `https://www.googleapis.com/auth/spreadsheets.readonly` or `https://www.googleapis.com/auth/spreadsheets` scope. */
  sourceSpreadsheetId?: string;
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Classroom-assigned identifier for the rubric. This is unique among rubrics for the relevant course work. Read-only. */
  id?: string;
  /** Identifier for the course work this corresponds to. Read-only. */
  courseWorkId?: string;
}

export const Rubric: Schema.Schema<Rubric> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      criteria: Schema.optional(Schema.Array(Criterion)),
      updateTime: Schema.optional(Schema.String),
      creationTime: Schema.optional(Schema.String),
      sourceSpreadsheetId: Schema.optional(Schema.String),
      courseId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      courseWorkId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Rubric" }) as any as Schema.Schema<Rubric>;

export interface GuardianInvitation {
  /** The time that this invitation was created. Read-only. */
  creationTime?: string;
  /** The state that this invitation is in. */
  state?:
    | "GUARDIAN_INVITATION_STATE_UNSPECIFIED"
    | "PENDING"
    | "COMPLETE"
    | (string & {});
  /** Email address that the invitation was sent to. This field is only visible to domain administrators. */
  invitedEmailAddress?: string;
  /** Unique identifier for this invitation. Read-only. */
  invitationId?: string;
  /** ID of the student (in standard format) */
  studentId?: string;
}

export const GuardianInvitation: Schema.Schema<GuardianInvitation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creationTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      invitedEmailAddress: Schema.optional(Schema.String),
      invitationId: Schema.optional(Schema.String),
      studentId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GuardianInvitation",
  }) as any as Schema.Schema<GuardianInvitation>;

export interface ListGuardianInvitationsResponse {
  /** Guardian invitations that matched the list request. */
  guardianInvitations?: Array<GuardianInvitation>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListGuardianInvitationsResponse: Schema.Schema<ListGuardianInvitationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      guardianInvitations: Schema.optional(Schema.Array(GuardianInvitation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListGuardianInvitationsResponse",
  }) as any as Schema.Schema<ListGuardianInvitationsResponse>;

export interface Guardian {
  /** Identifier for the student to whom the guardian relationship applies. */
  studentId?: string;
  /** Identifier for the guardian. */
  guardianId?: string;
  /** User profile for the guardian. */
  guardianProfile?: UserProfile;
  /** The email address to which the initial guardian invitation was sent. This field is only visible to domain administrators. */
  invitedEmailAddress?: string;
}

export const Guardian: Schema.Schema<Guardian> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      studentId: Schema.optional(Schema.String),
      guardianId: Schema.optional(Schema.String),
      guardianProfile: Schema.optional(UserProfile),
      invitedEmailAddress: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Guardian" }) as any as Schema.Schema<Guardian>;

export interface StudentGroupMember {
  /** The identifier of the course. */
  courseId?: string;
  /** The identifier of the student group. */
  studentGroupId?: string;
  /** Identifier of the student. */
  userId?: string;
}

export const StudentGroupMember: Schema.Schema<StudentGroupMember> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courseId: Schema.optional(Schema.String),
      studentGroupId: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StudentGroupMember",
  }) as any as Schema.Schema<StudentGroupMember>;

export interface CourseAlias {
  /** Alias string. The format of the string indicates the desired alias scoping. * `d:` indicates a domain-scoped alias. Example: `d:math_101` * `p:` indicates a project-scoped alias. Example: `p:abc123` This field has a maximum length of 256 characters. */
  alias?: string;
}

export const CourseAlias: Schema.Schema<CourseAlias> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      alias: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CourseAlias",
  }) as any as Schema.Schema<CourseAlias>;

export interface ListCourseAliasesResponse {
  /** The course aliases. */
  aliases?: Array<CourseAlias>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListCourseAliasesResponse: Schema.Schema<ListCourseAliasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      aliases: Schema.optional(Schema.Array(CourseAlias)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCourseAliasesResponse",
  }) as any as Schema.Schema<ListCourseAliasesResponse>;

export interface ListAddOnAttachmentsResponse {
  /** Attachments under the given post. */
  addOnAttachments?: Array<AddOnAttachment>;
  /** A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAddOnAttachmentsResponse: Schema.Schema<ListAddOnAttachmentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      addOnAttachments: Schema.optional(Schema.Array(AddOnAttachment)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAddOnAttachmentsResponse",
  }) as any as Schema.Schema<ListAddOnAttachmentsResponse>;

export interface ModifyIndividualStudentsOptions {
  /** IDs of students to be removed from having access to this coursework/announcement. */
  removeStudentIds?: Array<string>;
  /** IDs of students to be added as having access to this coursework/announcement. */
  addStudentIds?: Array<string>;
}

export const ModifyIndividualStudentsOptions: Schema.Schema<ModifyIndividualStudentsOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      removeStudentIds: Schema.optional(Schema.Array(Schema.String)),
      addStudentIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ModifyIndividualStudentsOptions",
  }) as any as Schema.Schema<ModifyIndividualStudentsOptions>;

export interface ModifyAnnouncementAssigneesRequest {
  /** Mode of the announcement describing whether it is accessible by all students or specified individual students. */
  assigneeMode?:
    | "ASSIGNEE_MODE_UNSPECIFIED"
    | "ALL_STUDENTS"
    | "INDIVIDUAL_STUDENTS"
    | (string & {});
  /** Set which students can view or cannot view the announcement. Must be specified only when `assigneeMode` is `INDIVIDUAL_STUDENTS`. */
  modifyIndividualStudentsOptions?: ModifyIndividualStudentsOptions;
}

export const ModifyAnnouncementAssigneesRequest: Schema.Schema<ModifyAnnouncementAssigneesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assigneeMode: Schema.optional(Schema.String),
      modifyIndividualStudentsOptions: Schema.optional(
        ModifyIndividualStudentsOptions,
      ),
    }),
  ).annotate({
    identifier: "ModifyAnnouncementAssigneesRequest",
  }) as any as Schema.Schema<ModifyAnnouncementAssigneesRequest>;

export interface CloudPubsubTopic {
  /** The `name` field of a Cloud Pub/Sub [Topic](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#Topic). */
  topicName?: string;
}

export const CloudPubsubTopic: Schema.Schema<CloudPubsubTopic> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topicName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CloudPubsubTopic",
  }) as any as Schema.Schema<CloudPubsubTopic>;

export interface GradeHistory {
  /** The denominator of the grade at this time in the submission grade history. */
  maxPoints?: number;
  /** When the grade of the submission was changed. */
  gradeTimestamp?: string;
  /** The teacher who made the grade change. */
  actorUserId?: string;
  /** The numerator of the grade at this time in the submission grade history. */
  pointsEarned?: number;
  /** The type of grade change at this time in the submission grade history. */
  gradeChangeType?:
    | "UNKNOWN_GRADE_CHANGE_TYPE"
    | "DRAFT_GRADE_POINTS_EARNED_CHANGE"
    | "ASSIGNED_GRADE_POINTS_EARNED_CHANGE"
    | "MAX_POINTS_CHANGE"
    | (string & {});
}

export const GradeHistory: Schema.Schema<GradeHistory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxPoints: Schema.optional(Schema.Number),
      gradeTimestamp: Schema.optional(Schema.String),
      actorUserId: Schema.optional(Schema.String),
      pointsEarned: Schema.optional(Schema.Number),
      gradeChangeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GradeHistory",
  }) as any as Schema.Schema<GradeHistory>;

export interface CourseRosterChangesInfo {
  /** The `course_id` of the course to subscribe to roster changes for. */
  courseId?: string;
}

export const CourseRosterChangesInfo: Schema.Schema<CourseRosterChangesInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courseId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CourseRosterChangesInfo",
  }) as any as Schema.Schema<CourseRosterChangesInfo>;

export interface CourseWorkChangesInfo {
  /** The `course_id` of the course to subscribe to work changes for. */
  courseId?: string;
}

export const CourseWorkChangesInfo: Schema.Schema<CourseWorkChangesInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courseId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CourseWorkChangesInfo",
  }) as any as Schema.Schema<CourseWorkChangesInfo>;

export interface Feed {
  /** Information about a `Feed` with a `feed_type` of `COURSE_ROSTER_CHANGES`. This field must be specified if `feed_type` is `COURSE_ROSTER_CHANGES`. */
  courseRosterChangesInfo?: CourseRosterChangesInfo;
  /** Information about a `Feed` with a `feed_type` of `COURSE_WORK_CHANGES`. This field must be specified if `feed_type` is `COURSE_WORK_CHANGES`. */
  courseWorkChangesInfo?: CourseWorkChangesInfo;
  /** The type of feed. */
  feedType?:
    | "FEED_TYPE_UNSPECIFIED"
    | "DOMAIN_ROSTER_CHANGES"
    | "COURSE_ROSTER_CHANGES"
    | "COURSE_WORK_CHANGES"
    | (string & {});
}

export const Feed: Schema.Schema<Feed> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courseRosterChangesInfo: Schema.optional(CourseRosterChangesInfo),
      courseWorkChangesInfo: Schema.optional(CourseWorkChangesInfo),
      feedType: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Feed" }) as any as Schema.Schema<Feed>;

export interface Assignment {
  /** Drive folder where attachments from student submissions are placed. This is only populated for course teachers and administrators. */
  studentWorkFolder?: DriveFolder;
}

export const Assignment: Schema.Schema<Assignment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      studentWorkFolder: Schema.optional(DriveFolder),
    }),
  ).annotate({ identifier: "Assignment" }) as any as Schema.Schema<Assignment>;

export interface RubricGrade {
  /** Optional. Optional points assigned for this criterion, typically based on the level. Levels might or might not have points. If unset, no points were set for this criterion. */
  points?: number;
  /** Optional. Criterion ID. */
  criterionId?: string;
  /** Optional. Optional level ID of the selected level. If empty, no level was selected. */
  levelId?: string;
}

export const RubricGrade: Schema.Schema<RubricGrade> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      points: Schema.optional(Schema.Number),
      criterionId: Schema.optional(Schema.String),
      levelId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RubricGrade",
  }) as any as Schema.Schema<RubricGrade>;

export interface ShortAnswerSubmission {
  /** Student response to a short-answer question. */
  answer?: string;
}

export const ShortAnswerSubmission: Schema.Schema<ShortAnswerSubmission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answer: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShortAnswerSubmission",
  }) as any as Schema.Schema<ShortAnswerSubmission>;

export interface Attachment {
  /** Google Forms attachment. */
  form?: Form;
  /** Google Drive file attachment. */
  driveFile?: DriveFile;
  /** Link attachment. */
  link?: Link;
  /** Youtube video attachment. */
  youTubeVideo?: YouTubeVideo;
}

export const Attachment: Schema.Schema<Attachment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      form: Schema.optional(Form),
      driveFile: Schema.optional(DriveFile),
      link: Schema.optional(Link),
      youTubeVideo: Schema.optional(YouTubeVideo),
    }),
  ).annotate({ identifier: "Attachment" }) as any as Schema.Schema<Attachment>;

export interface AssignmentSubmission {
  /** Attachments added by the student. Drive files that correspond to materials with a share mode of STUDENT_COPY may not exist yet if the student has not accessed the assignment in Classroom. Some attachment metadata is only populated if the requesting user has permission to access it. Identifier and alternate_link fields are always available, but others (for example, title) may not be. */
  attachments?: Array<Attachment>;
}

export const AssignmentSubmission: Schema.Schema<AssignmentSubmission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attachments: Schema.optional(Schema.Array(Attachment)),
    }),
  ).annotate({
    identifier: "AssignmentSubmission",
  }) as any as Schema.Schema<AssignmentSubmission>;

export interface StateHistory {
  /** The workflow pipeline stage. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATED"
    | "TURNED_IN"
    | "RETURNED"
    | "RECLAIMED_BY_STUDENT"
    | "STUDENT_EDITED_AFTER_TURN_IN"
    | (string & {});
  /** When the submission entered this state. */
  stateTimestamp?: string;
  /** The teacher or student who made the change. */
  actorUserId?: string;
}

export const StateHistory: Schema.Schema<StateHistory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      stateTimestamp: Schema.optional(Schema.String),
      actorUserId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StateHistory",
  }) as any as Schema.Schema<StateHistory>;

export interface SubmissionHistory {
  /** The state history information of the submission, if present. */
  stateHistory?: StateHistory;
  /** The grade history information of the submission, if present. */
  gradeHistory?: GradeHistory;
}

export const SubmissionHistory: Schema.Schema<SubmissionHistory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stateHistory: Schema.optional(StateHistory),
      gradeHistory: Schema.optional(GradeHistory),
    }),
  ).annotate({
    identifier: "SubmissionHistory",
  }) as any as Schema.Schema<SubmissionHistory>;

export interface MultipleChoiceSubmission {
  /** Student's select choice. */
  answer?: string;
}

export const MultipleChoiceSubmission: Schema.Schema<MultipleChoiceSubmission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answer: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MultipleChoiceSubmission",
  }) as any as Schema.Schema<MultipleChoiceSubmission>;

export interface StudentSubmission {
  /** Optional grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places. This may be modified only by course teachers. */
  assignedGrade?: number;
  /** Optional pending grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places. This is only visible to and modifiable by course teachers. */
  draftGrade?: number;
  /** Creation time of this submission. This may be unset if the student has not accessed this item. Read-only. */
  creationTime?: string;
  /** Submission content when course_work_type is SHORT_ANSWER_QUESTION. */
  shortAnswerSubmission?: ShortAnswerSubmission;
  /** Submission content when course_work_type is ASSIGNMENT. Students can modify this content using ModifyAttachments. */
  assignmentSubmission?: AssignmentSubmission;
  /** Pending rubric grades based on the rubric's criteria. This map is empty if there is no rubric attached to this course work or if a rubric is attached, but no grades have been set on any criteria. Entries are only populated for grades that have been set. Key: The rubric's criterion ID. Read-only. */
  draftRubricGrades?: Record<string, RubricGrade>;
  /** Absolute link to the submission in the Classroom web UI. Read-only. */
  alternateLink?: string;
  /** Type of course work this submission is for. Read-only. */
  courseWorkType?:
    | "COURSE_WORK_TYPE_UNSPECIFIED"
    | "ASSIGNMENT"
    | "SHORT_ANSWER_QUESTION"
    | "MULTIPLE_CHOICE_QUESTION"
    | (string & {});
  /** Identifier for the course work this corresponds to. Read-only. */
  courseWorkId?: string;
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Identifier for the student that owns this submission. Read-only. */
  userId?: string;
  /** Assigned rubric grades based on the rubric's Criteria. This map is empty if there is no rubric attached to this course work or if a rubric is attached, but no grades have been set on any Criteria. Entries are only populated for grades that have been set. Key: The rubric's criterion ID. Read-only. */
  assignedRubricGrades?: Record<string, RubricGrade>;
  /** The history of the submission (includes state and grade histories). Read-only. */
  submissionHistory?: Array<SubmissionHistory>;
  /** Last update time of this submission. This may be unset if the student has not accessed this item. Read-only. */
  updateTime?: string;
  /** Whether this submission is late. Read-only. */
  late?: boolean;
  /** Whether this student submission is associated with the Developer Console project making the request. See CreateCourseWork for more details. Read-only. */
  associatedWithDeveloper?: boolean;
  /** State of this submission. Read-only. */
  state?:
    | "SUBMISSION_STATE_UNSPECIFIED"
    | "NEW"
    | "CREATED"
    | "TURNED_IN"
    | "RETURNED"
    | "RECLAIMED_BY_STUDENT"
    | (string & {});
  /** Submission content when course_work_type is MULTIPLE_CHOICE_QUESTION. */
  multipleChoiceSubmission?: MultipleChoiceSubmission;
  /** Classroom-assigned Identifier for the student submission. This is unique among submissions for the relevant course work. Read-only. */
  id?: string;
}

export const StudentSubmission: Schema.Schema<StudentSubmission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assignedGrade: Schema.optional(Schema.Number),
      draftGrade: Schema.optional(Schema.Number),
      creationTime: Schema.optional(Schema.String),
      shortAnswerSubmission: Schema.optional(ShortAnswerSubmission),
      assignmentSubmission: Schema.optional(AssignmentSubmission),
      draftRubricGrades: Schema.optional(
        Schema.Record(Schema.String, RubricGrade),
      ),
      alternateLink: Schema.optional(Schema.String),
      courseWorkType: Schema.optional(Schema.String),
      courseWorkId: Schema.optional(Schema.String),
      courseId: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      assignedRubricGrades: Schema.optional(
        Schema.Record(Schema.String, RubricGrade),
      ),
      submissionHistory: Schema.optional(Schema.Array(SubmissionHistory)),
      updateTime: Schema.optional(Schema.String),
      late: Schema.optional(Schema.Boolean),
      associatedWithDeveloper: Schema.optional(Schema.Boolean),
      state: Schema.optional(Schema.String),
      multipleChoiceSubmission: Schema.optional(MultipleChoiceSubmission),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StudentSubmission",
  }) as any as Schema.Schema<StudentSubmission>;

export interface ListStudentSubmissionsResponse {
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
  /** Student work that matches the request. */
  studentSubmissions?: Array<StudentSubmission>;
}

export const ListStudentSubmissionsResponse: Schema.Schema<ListStudentSubmissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      studentSubmissions: Schema.optional(Schema.Array(StudentSubmission)),
    }),
  ).annotate({
    identifier: "ListStudentSubmissionsResponse",
  }) as any as Schema.Schema<ListStudentSubmissionsResponse>;

export interface ListStudentsResponse {
  /** Students who match the list request. */
  students?: Array<Student>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListStudentsResponse: Schema.Schema<ListStudentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      students: Schema.optional(Schema.Array(Student)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListStudentsResponse",
  }) as any as Schema.Schema<ListStudentsResponse>;

export interface ModifyCourseWorkAssigneesRequest {
  /** Mode of the coursework describing whether it will be assigned to all students or specified individual students. */
  assigneeMode?:
    | "ASSIGNEE_MODE_UNSPECIFIED"
    | "ALL_STUDENTS"
    | "INDIVIDUAL_STUDENTS"
    | (string & {});
  /** Set which students are assigned or not assigned to the coursework. Must be specified only when `assigneeMode` is `INDIVIDUAL_STUDENTS`. */
  modifyIndividualStudentsOptions?: ModifyIndividualStudentsOptions;
}

export const ModifyCourseWorkAssigneesRequest: Schema.Schema<ModifyCourseWorkAssigneesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      assigneeMode: Schema.optional(Schema.String),
      modifyIndividualStudentsOptions: Schema.optional(
        ModifyIndividualStudentsOptions,
      ),
    }),
  ).annotate({
    identifier: "ModifyCourseWorkAssigneesRequest",
  }) as any as Schema.Schema<ModifyCourseWorkAssigneesRequest>;

export interface ListStudentGroupMembersResponse {
  /** The student group members. */
  studentGroupMembers?: Array<StudentGroupMember>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListStudentGroupMembersResponse: Schema.Schema<ListStudentGroupMembersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      studentGroupMembers: Schema.optional(Schema.Array(StudentGroupMember)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListStudentGroupMembersResponse",
  }) as any as Schema.Schema<ListStudentGroupMembersResponse>;

export interface CourseWorkMaterial {
  /** Optional timestamp when this course work material is scheduled to be published. */
  scheduledTime?: string;
  /** Identifier for the user that created the course work material. Read-only. */
  creatorUserId?: string;
  /** Title of this course work material. The title must be a valid UTF-8 string containing between 1 and 3000 characters. */
  title?: string;
  /** Status of this course work material. If unspecified, the default state is `DRAFT`. */
  state?:
    | "COURSEWORK_MATERIAL_STATE_UNSPECIFIED"
    | "PUBLISHED"
    | "DRAFT"
    | "DELETED"
    | (string & {});
  /** Classroom-assigned identifier of this course work material, unique per course. Read-only. */
  id?: string;
  /** Timestamp of the most recent change to this course work material. Read-only. */
  updateTime?: string;
  /** Identifier for the topic that this course work material is associated with. Must match an existing topic in the course. */
  topicId?: string;
  /** Timestamp when this course work material was created. Read-only. */
  creationTime?: string;
  /** Assignee mode of the course work material. If unspecified, the default value is `ALL_STUDENTS`. */
  assigneeMode?:
    | "ASSIGNEE_MODE_UNSPECIFIED"
    | "ALL_STUDENTS"
    | "INDIVIDUAL_STUDENTS"
    | (string & {});
  /** Optional description of this course work material. The text must be a valid UTF-8 string containing no more than 30,000 characters. */
  description?: string;
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Additional materials. A course work material must have no more than 20 material items. */
  materials?: Array<Material>;
  /** Absolute link to this course work material in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only. */
  alternateLink?: string;
  /** Identifiers of students with access to the course work material. This field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in this field can see the course work material. */
  individualStudentsOptions?: IndividualStudentsOptions;
}

export const CourseWorkMaterial: Schema.Schema<CourseWorkMaterial> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scheduledTime: Schema.optional(Schema.String),
      creatorUserId: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      topicId: Schema.optional(Schema.String),
      creationTime: Schema.optional(Schema.String),
      assigneeMode: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      courseId: Schema.optional(Schema.String),
      materials: Schema.optional(Schema.Array(Material)),
      alternateLink: Schema.optional(Schema.String),
      individualStudentsOptions: Schema.optional(IndividualStudentsOptions),
    }),
  ).annotate({
    identifier: "CourseWorkMaterial",
  }) as any as Schema.Schema<CourseWorkMaterial>;

export interface ListGuardiansResponse {
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
  /** Guardians on this page of results that met the criteria specified in the request. */
  guardians?: Array<Guardian>;
}

export const ListGuardiansResponse: Schema.Schema<ListGuardiansResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      guardians: Schema.optional(Schema.Array(Guardian)),
    }),
  ).annotate({
    identifier: "ListGuardiansResponse",
  }) as any as Schema.Schema<ListGuardiansResponse>;

export interface MultipleChoiceQuestion {
  /** Possible choices. */
  choices?: Array<string>;
}

export const MultipleChoiceQuestion: Schema.Schema<MultipleChoiceQuestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      choices: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "MultipleChoiceQuestion",
  }) as any as Schema.Schema<MultipleChoiceQuestion>;

export interface CourseWork {
  /** Whether this course work item is associated with the Developer Console project making the request. See CreateCourseWork for more details. Read-only. */
  associatedWithDeveloper?: boolean;
  /** Identifier for the topic that this coursework is associated with. Must match an existing topic in the course. */
  topicId?: string;
  /** Multiple choice question details. For read operations, this field is populated only when `work_type` is `MULTIPLE_CHOICE_QUESTION`. For write operations, this field must be specified when creating course work with a `work_type` of `MULTIPLE_CHOICE_QUESTION`, and it must not be set otherwise. */
  multipleChoiceQuestion?: MultipleChoiceQuestion;
  /** Timestamp of the most recent change to this course work. Read-only. */
  updateTime?: string;
  /** Classroom-assigned identifier of this course work, unique per course. Read-only. */
  id?: string;
  /** Title of this course work. The title must be a valid UTF-8 string containing between 1 and 3000 characters. */
  title?: string;
  /** Status of this course work. If unspecified, the default state is `DRAFT`. */
  state?:
    | "COURSE_WORK_STATE_UNSPECIFIED"
    | "PUBLISHED"
    | "DRAFT"
    | "DELETED"
    | (string & {});
  /** Identifier for the user that created the coursework. Read-only. */
  creatorUserId?: string;
  /** Type of this course work. The type is set when the course work is created and cannot be changed. */
  workType?:
    | "COURSE_WORK_TYPE_UNSPECIFIED"
    | "ASSIGNMENT"
    | "SHORT_ANSWER_QUESTION"
    | "MULTIPLE_CHOICE_QUESTION"
    | (string & {});
  /** Identifier of the grading period associated with the coursework. * At creation, if unspecified, the grading period ID will be set based on the `dueDate` (or `scheduledTime` if no `dueDate` is set). * To indicate no association to any grading period, set this field to an empty string (""). * If specified, it must match an existing grading period ID in the course. */
  gradingPeriodId?: string;
  /** Setting to determine when students are allowed to modify submissions. If unspecified, the default value is `MODIFIABLE_UNTIL_TURNED_IN`. */
  submissionModificationMode?:
    | "SUBMISSION_MODIFICATION_MODE_UNSPECIFIED"
    | "MODIFIABLE_UNTIL_TURNED_IN"
    | "MODIFIABLE"
    | (string & {});
  /** The category that this coursework's grade contributes to. Present only when a category has been chosen for the coursework. May be used in calculating the overall grade. Read-only. */
  gradeCategory?: GradeCategory;
  /** Optional timestamp when this course work is scheduled to be published. */
  scheduledTime?: string;
  /** Absolute link to this course work in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only. */
  alternateLink?: string;
  /** Optional date, in UTC, that submissions for this course work are due. This must be specified if `due_time` is specified. */
  dueDate?: Classroom_Date;
  /** Identifiers of students with access to the coursework. This field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in this field are assigned the coursework. */
  individualStudentsOptions?: IndividualStudentsOptions;
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Additional materials. CourseWork must have no more than 20 material items. */
  materials?: Array<Material>;
  /** Optional time of day, in UTC, that submissions for this course work are due. This must be specified if `due_date` is specified. */
  dueTime?: TimeOfDay;
  /** Maximum grade for this course work. If zero or unspecified, this assignment is considered ungraded. This must be a non-negative integer value. */
  maxPoints?: number;
  /** Optional description of this course work. If set, the description must be a valid UTF-8 string containing no more than 30,000 characters. */
  description?: string;
  /** Assignment details. This is populated only when `work_type` is `ASSIGNMENT`. Read-only. */
  assignment?: Assignment;
  /** Timestamp when this course work was created. Read-only. */
  creationTime?: string;
  /** Assignee mode of the coursework. If unspecified, the default value is `ALL_STUDENTS`. */
  assigneeMode?:
    | "ASSIGNEE_MODE_UNSPECIFIED"
    | "ALL_STUDENTS"
    | "INDIVIDUAL_STUDENTS"
    | (string & {});
}

export const CourseWork: Schema.Schema<CourseWork> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      associatedWithDeveloper: Schema.optional(Schema.Boolean),
      topicId: Schema.optional(Schema.String),
      multipleChoiceQuestion: Schema.optional(MultipleChoiceQuestion),
      updateTime: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      creatorUserId: Schema.optional(Schema.String),
      workType: Schema.optional(Schema.String),
      gradingPeriodId: Schema.optional(Schema.String),
      submissionModificationMode: Schema.optional(Schema.String),
      gradeCategory: Schema.optional(GradeCategory),
      scheduledTime: Schema.optional(Schema.String),
      alternateLink: Schema.optional(Schema.String),
      dueDate: Schema.optional(Classroom_Date),
      individualStudentsOptions: Schema.optional(IndividualStudentsOptions),
      courseId: Schema.optional(Schema.String),
      materials: Schema.optional(Schema.Array(Material)),
      dueTime: Schema.optional(TimeOfDay),
      maxPoints: Schema.optional(Schema.Number),
      description: Schema.optional(Schema.String),
      assignment: Schema.optional(Assignment),
      creationTime: Schema.optional(Schema.String),
      assigneeMode: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CourseWork" }) as any as Schema.Schema<CourseWork>;

export interface ListCourseWorkMaterialResponse {
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
  /** Course work material items that match the request. */
  courseWorkMaterial?: Array<CourseWorkMaterial>;
}

export const ListCourseWorkMaterialResponse: Schema.Schema<ListCourseWorkMaterialResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      courseWorkMaterial: Schema.optional(Schema.Array(CourseWorkMaterial)),
    }),
  ).annotate({
    identifier: "ListCourseWorkMaterialResponse",
  }) as any as Schema.Schema<ListCourseWorkMaterialResponse>;

export interface ListAnnouncementsResponse {
  /** Announcement items that match the request. */
  announcements?: Array<Announcement>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListAnnouncementsResponse: Schema.Schema<ListAnnouncementsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      announcements: Schema.optional(Schema.Array(Announcement)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAnnouncementsResponse",
  }) as any as Schema.Schema<ListAnnouncementsResponse>;

export interface StudentGroup {
  /** The title of the student group. */
  title?: string;
  /** The identifier of the course. */
  courseId?: string;
  /** The identifier of the student group. */
  id?: string;
}

export const StudentGroup: Schema.Schema<StudentGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      courseId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StudentGroup",
  }) as any as Schema.Schema<StudentGroup>;

export interface ListStudentGroupsResponse {
  /** The student groups. */
  studentGroups?: Array<StudentGroup>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListStudentGroupsResponse: Schema.Schema<ListStudentGroupsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      studentGroups: Schema.optional(Schema.Array(StudentGroup)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListStudentGroupsResponse",
  }) as any as Schema.Schema<ListStudentGroupsResponse>;

export interface Topic {
  /** The time the topic was last updated by the system. Read-only. */
  updateTime?: string;
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** The name of the topic, generated by the user. Leading and trailing whitespaces, if any, are trimmed. Also, multiple consecutive whitespaces are collapsed into one inside the name. The result must be a non-empty string. Topic names are case sensitive, and must be no longer than 100 characters. */
  name?: string;
  /** Unique identifier for the topic. Read-only. */
  topicId?: string;
}

export const Topic: Schema.Schema<Topic> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateTime: Schema.optional(Schema.String),
      courseId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      topicId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Topic" }) as any as Schema.Schema<Topic>;

export interface ListTopicResponse {
  /** Topic items that match the request. */
  topic?: Array<Topic>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListTopicResponse: Schema.Schema<ListTopicResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topic: Schema.optional(Schema.Array(Topic)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListTopicResponse",
  }) as any as Schema.Schema<ListTopicResponse>;

export interface ListCoursesResponse {
  /** Courses that match the list request. */
  courses?: Array<Course>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListCoursesResponse: Schema.Schema<ListCoursesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courses: Schema.optional(Schema.Array(Course)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCoursesResponse",
  }) as any as Schema.Schema<ListCoursesResponse>;

export interface ReclaimStudentSubmissionRequest {}

export const ReclaimStudentSubmissionRequest: Schema.Schema<ReclaimStudentSubmissionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ReclaimStudentSubmissionRequest",
  }) as any as Schema.Schema<ReclaimStudentSubmissionRequest>;

export interface StudentContext {
  /** Requesting user's submission id to be used for grade passback and to identify the student when showing student work to the teacher. This is set exactly when `supportsStudentWork` is `true`. */
  submissionId?: string;
}

export const StudentContext: Schema.Schema<StudentContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      submissionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StudentContext",
  }) as any as Schema.Schema<StudentContext>;

export interface TeacherContext {}

export const TeacherContext: Schema.Schema<TeacherContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "TeacherContext",
  }) as any as Schema.Schema<TeacherContext>;

export interface AddOnContext {
  /** Optional. Whether the post allows the teacher to see student work and passback grades. */
  supportsStudentWork?: boolean;
  /** Immutable. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Immutable. Identifier of the course. */
  courseId?: string;
  /** Add-on context corresponding to the requesting user's role as a student. Its presence implies that the requesting user is a student in the course. */
  studentContext?: StudentContext;
  /** Add-on context corresponding to the requesting user's role as a teacher. Its presence implies that the requesting user is a teacher in the course. */
  teacherContext?: TeacherContext;
  /** Immutable. Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. */
  itemId?: string;
}

export const AddOnContext: Schema.Schema<AddOnContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      supportsStudentWork: Schema.optional(Schema.Boolean),
      postId: Schema.optional(Schema.String),
      courseId: Schema.optional(Schema.String),
      studentContext: Schema.optional(StudentContext),
      teacherContext: Schema.optional(TeacherContext),
      itemId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AddOnContext",
  }) as any as Schema.Schema<AddOnContext>;

export interface ListCourseWorkResponse {
  /** Course work items that match the request. */
  courseWork?: Array<CourseWork>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListCourseWorkResponse: Schema.Schema<ListCourseWorkResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      courseWork: Schema.optional(Schema.Array(CourseWork)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCourseWorkResponse",
  }) as any as Schema.Schema<ListCourseWorkResponse>;

export interface Registration {
  /** A server-generated unique identifier for this `Registration`. Read-only. */
  registrationId?: string;
  /** The time until which the `Registration` is effective. This is a read-only field assigned by the server. */
  expiryTime?: string;
  /** Specification for the class of notifications that Classroom should deliver to the destination. */
  feed?: Feed;
  /** The Cloud Pub/Sub topic that notifications are to be sent to. */
  cloudPubsubTopic?: CloudPubsubTopic;
}

export const Registration: Schema.Schema<Registration> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      registrationId: Schema.optional(Schema.String),
      expiryTime: Schema.optional(Schema.String),
      feed: Schema.optional(Feed),
      cloudPubsubTopic: Schema.optional(CloudPubsubTopic),
    }),
  ).annotate({
    identifier: "Registration",
  }) as any as Schema.Schema<Registration>;

export interface ListRubricsResponse {
  /** Rubrics that match the request. */
  rubrics?: Array<Rubric>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListRubricsResponse: Schema.Schema<ListRubricsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rubrics: Schema.optional(Schema.Array(Rubric)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListRubricsResponse",
  }) as any as Schema.Schema<ListRubricsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface TurnInStudentSubmissionRequest {}

export const TurnInStudentSubmissionRequest: Schema.Schema<TurnInStudentSubmissionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "TurnInStudentSubmissionRequest",
  }) as any as Schema.Schema<TurnInStudentSubmissionRequest>;

export interface AddOnAttachmentStudentSubmission {
  /** Submission state of add-on attachment's parent post (i.e. assignment). */
  postSubmissionState?:
    | "SUBMISSION_STATE_UNSPECIFIED"
    | "NEW"
    | "CREATED"
    | "TURNED_IN"
    | "RETURNED"
    | "RECLAIMED_BY_STUDENT"
    | (string & {});
  /** Student grade on this attachment. If unset, no grade was set. */
  pointsEarned?: number;
}

export const AddOnAttachmentStudentSubmission: Schema.Schema<AddOnAttachmentStudentSubmission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postSubmissionState: Schema.optional(Schema.String),
      pointsEarned: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AddOnAttachmentStudentSubmission",
  }) as any as Schema.Schema<AddOnAttachmentStudentSubmission>;

export interface ReturnStudentSubmissionRequest {}

export const ReturnStudentSubmissionRequest: Schema.Schema<ReturnStudentSubmissionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ReturnStudentSubmissionRequest",
  }) as any as Schema.Schema<ReturnStudentSubmissionRequest>;

export interface ModifyAttachmentsRequest {
  /** Attachments to add. A student submission may not have more than 20 attachments. Form attachments are not supported. */
  addAttachments?: Array<Attachment>;
}

export const ModifyAttachmentsRequest: Schema.Schema<ModifyAttachmentsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      addAttachments: Schema.optional(Schema.Array(Attachment)),
    }),
  ).annotate({
    identifier: "ModifyAttachmentsRequest",
  }) as any as Schema.Schema<ModifyAttachmentsRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateRegistrationsRequest {
  /** Request body */
  body?: Registration;
}

export const CreateRegistrationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(Registration).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v1/registrations", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateRegistrationsRequest>;

export type CreateRegistrationsResponse = Registration;
export const CreateRegistrationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Registration;

export type CreateRegistrationsError = DefaultErrors;

/** Creates a `Registration`, causing Classroom to start sending notifications from the provided `feed` to the destination provided in `cloudPubSubTopic`. Returns the created `Registration`. Currently, this will be the same as the argument, but with server-assigned fields such as `expiry_time` and `id` filled in. Note that any value specified for the `expiry_time` or `id` fields will be ignored. While Classroom may validate the `cloudPubSubTopic` and return errors on a best effort basis, it is the caller's responsibility to ensure that it exists and that Classroom has permission to publish to it. This method may return the following error codes: * `PERMISSION_DENIED` if: * the authenticated user does not have permission to receive notifications from the requested field; or * the current user has not granted access to the current Cloud project with the appropriate scope for the requested feed. Note that domain-wide delegation of authority is not currently supported for this purpose. If the request has the appropriate scope, but no grant exists, a Request Errors is returned. * another access error is encountered. * `INVALID_ARGUMENT` if: * no `cloudPubsubTopic` is specified, or the specified `cloudPubsubTopic` is not valid; or * no `feed` is specified, or the specified `feed` is not valid. * `NOT_FOUND` if: * the specified `feed` cannot be located, or the requesting user does not have permission to determine whether or not it exists; or * the specified `cloudPubsubTopic` cannot be located, or Classroom has not been granted permission to publish to it. */
export const createRegistrations: API.OperationMethod<
  CreateRegistrationsRequest,
  CreateRegistrationsResponse,
  CreateRegistrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRegistrationsRequest,
  output: CreateRegistrationsResponse,
  errors: [],
}));

export interface DeleteRegistrationsRequest {
  /** The `registration_id` of the `Registration` to be deleted. */
  registrationId: string;
}

export const DeleteRegistrationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    registrationId: Schema.String.pipe(T.HttpPath("registrationId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v1/registrations/{registrationId}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteRegistrationsRequest>;

export type DeleteRegistrationsResponse = Empty;
export const DeleteRegistrationsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteRegistrationsError = DefaultErrors;

/** Deletes a `Registration`, causing Classroom to stop sending notifications for that `Registration`. */
export const deleteRegistrations: API.OperationMethod<
  DeleteRegistrationsRequest,
  DeleteRegistrationsResponse,
  DeleteRegistrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRegistrationsRequest,
  output: DeleteRegistrationsResponse,
  errors: [],
}));

export interface UpdateCoursesRequest {
  /** Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias. */
  id: string;
  /** Request body */
  body?: Course;
}

export const UpdateCoursesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(Course).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/courses/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCoursesRequest>;

export type UpdateCoursesResponse = Course;
export const UpdateCoursesResponse = /*@__PURE__*/ /*#__PURE__*/ Course;

export type UpdateCoursesError = DefaultErrors;

/** Updates a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to modify the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. * `FAILED_PRECONDITION` for the following request errors: * CourseNotModifiable * CourseTitleCannotContainUrl */
export const updateCourses: API.OperationMethod<
  UpdateCoursesRequest,
  UpdateCoursesResponse,
  UpdateCoursesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCoursesRequest,
  output: UpdateCoursesResponse,
  errors: [],
}));

export interface PatchCoursesRequest {
  /** Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias. */
  id: string;
  /** Mask that identifies which fields on the course to update. This field is required to do an update. The update will fail if invalid fields are specified. The following fields are valid: * `courseState` * `description` * `descriptionHeading` * `name` * `ownerId` * `room` * `section` * `subject` Note: patches to ownerId are treated as being effective immediately, but in practice it may take some time for the ownership transfer of all affected resources to complete. When set in a query parameter, this field should be specified as `updateMask=,,...` */
  updateMask?: string;
  /** Request body */
  body?: Course;
}

export const PatchCoursesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Course).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesRequest>;

export type PatchCoursesResponse = Course;
export const PatchCoursesResponse = /*@__PURE__*/ /*#__PURE__*/ Course;

export type PatchCoursesError = DefaultErrors;

/** Updates one or more fields in a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to modify the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. * `INVALID_ARGUMENT` if invalid fields are specified in the update mask or if no update mask is supplied. * `FAILED_PRECONDITION` for the following request errors: * CourseNotModifiable * InactiveCourseOwner * IneligibleOwner * CourseTitleCannotContainUrl */
export const patchCourses: API.OperationMethod<
  PatchCoursesRequest,
  PatchCoursesResponse,
  PatchCoursesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesRequest,
  output: PatchCoursesResponse,
  errors: [],
}));

export interface CreateCoursesRequest {
  /** Request body */
  body?: Course;
}

export const CreateCoursesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  body: Schema.optional(Course).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesRequest>;

export type CreateCoursesResponse = Course;
export const CreateCoursesResponse = /*@__PURE__*/ /*#__PURE__*/ Course;

export type CreateCoursesError = DefaultErrors;

/** Creates a course. The user specified in `ownerId` is the owner of the created course and added as a teacher. A non-admin requesting user can only create a course with themselves as the owner. Domain admins can create courses owned by any user within their domain. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create courses or for access errors. * `NOT_FOUND` if the primary teacher is not a valid user. * `FAILED_PRECONDITION` if the course owner's account is disabled or for the following request errors: * UserCannotOwnCourse * UserGroupsMembershipLimitReached * CourseTitleCannotContainUrl * `ALREADY_EXISTS` if an alias was specified in the `id` and already exists. */
export const createCourses: API.OperationMethod<
  CreateCoursesRequest,
  CreateCoursesResponse,
  CreateCoursesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesRequest,
  output: CreateCoursesResponse,
  errors: [],
}));

export interface GetGradingPeriodSettingsCoursesRequest {
  /** Required. The identifier of the course. */
  courseId: string;
}

export const GetGradingPeriodSettingsCoursesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/gradingPeriodSettings",
    }),
    svc,
  ) as unknown as Schema.Schema<GetGradingPeriodSettingsCoursesRequest>;

export type GetGradingPeriodSettingsCoursesResponse = GradingPeriodSettings;
export const GetGradingPeriodSettingsCoursesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GradingPeriodSettings;

export type GetGradingPeriodSettingsCoursesError = DefaultErrors;

/** Returns the grading period settings in a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user isn't permitted to access the grading period settings in the requested course or for access errors. * `NOT_FOUND` if the requested course does not exist. */
export const getGradingPeriodSettingsCourses: API.OperationMethod<
  GetGradingPeriodSettingsCoursesRequest,
  GetGradingPeriodSettingsCoursesResponse,
  GetGradingPeriodSettingsCoursesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetGradingPeriodSettingsCoursesRequest,
  output: GetGradingPeriodSettingsCoursesResponse,
  errors: [],
}));

export interface GetCoursesRequest {
  /** Identifier of the course to return. This identifier can be either the Classroom-assigned identifier or an alias. */
  id: string;
}

export const GetCoursesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{id}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesRequest>;

export type GetCoursesResponse = Course;
export const GetCoursesResponse = /*@__PURE__*/ /*#__PURE__*/ Course;

export type GetCoursesError = DefaultErrors;

/** Returns a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. */
export const getCourses: API.OperationMethod<
  GetCoursesRequest,
  GetCoursesResponse,
  GetCoursesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesRequest,
  output: GetCoursesResponse,
  errors: [],
}));

export interface UpdateGradingPeriodSettingsCoursesRequest {
  /** Required. The identifier of the course. */
  courseId: string;
  /** Mask that identifies which fields in the GradingPeriodSettings to update. The GradingPeriodSettings `grading_periods` list will be fully replaced by the grading periods specified in the update request. For example: * Grading periods included in the list without an ID are considered additions, and a new ID will be assigned when the request is made. * Grading periods that currently exist, but are missing from the request will be considered deletions. * Grading periods with an existing ID and modified data are considered edits. Unmodified data will be left as is. * Grading periods included with an unknown ID will result in an error. The following fields may be specified: * `grading_periods` * `apply_to_existing_coursework` */
  updateMask?: string;
  /** Request body */
  body?: GradingPeriodSettings;
}

export const UpdateGradingPeriodSettingsCoursesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GradingPeriodSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/gradingPeriodSettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateGradingPeriodSettingsCoursesRequest>;

export type UpdateGradingPeriodSettingsCoursesResponse = GradingPeriodSettings;
export const UpdateGradingPeriodSettingsCoursesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GradingPeriodSettings;

export type UpdateGradingPeriodSettingsCoursesError = DefaultErrors;

/** Updates grading period settings of a course. Individual grading periods can be added, removed, or modified using this method. The requesting user and course owner must be eligible to modify Grading Periods. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/grading-periods/manage-grading-periods#licensing_requirements). This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to modify the grading period settings in a course or for access errors: * UserIneligibleToUpdateGradingPeriodSettings * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export const updateGradingPeriodSettingsCourses: API.OperationMethod<
  UpdateGradingPeriodSettingsCoursesRequest,
  UpdateGradingPeriodSettingsCoursesResponse,
  UpdateGradingPeriodSettingsCoursesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGradingPeriodSettingsCoursesRequest,
  output: UpdateGradingPeriodSettingsCoursesResponse,
  errors: [],
}));

export interface DeleteCoursesRequest {
  /** Identifier of the course to delete. This identifier can be either the Classroom-assigned identifier or an alias. */
  id: string;
}

export const DeleteCoursesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesRequest>;

export type DeleteCoursesResponse = Empty;
export const DeleteCoursesResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesError = DefaultErrors;

/** Deletes a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. */
export const deleteCourses: API.OperationMethod<
  DeleteCoursesRequest,
  DeleteCoursesResponse,
  DeleteCoursesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesRequest,
  output: DeleteCoursesResponse,
  errors: [],
}));

export interface ListCoursesRequest {
  /** Restricts returned courses to those having a student with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  studentId?: string;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Restricts returned courses to those in one of the specified states The default value is ACTIVE, ARCHIVED, PROVISIONED, DECLINED. */
  courseStates?:
    | "COURSE_STATE_UNSPECIFIED"
    | "ACTIVE"
    | "ARCHIVED"
    | "PROVISIONED"
    | "DECLINED"
    | "SUSPENDED"
    | (string & {})[];
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Restricts returned courses to those having a teacher with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  teacherId?: string;
}

export const ListCoursesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  studentId: Schema.optional(Schema.String).pipe(T.HttpQuery("studentId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  courseStates: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("courseStates"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  teacherId: Schema.optional(Schema.String).pipe(T.HttpQuery("teacherId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses" }),
  svc,
) as unknown as Schema.Schema<ListCoursesRequest>;

export type ListCoursesResponse_Op = ListCoursesResponse;
export const ListCoursesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListCoursesResponse;

export type ListCoursesError = DefaultErrors;

/** Returns a list of courses that the requesting user is permitted to view, restricted to those that match the request. Returned courses are ordered by creation time, with the most recently created coming first. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the query argument is malformed. * `NOT_FOUND` if any users specified in the query arguments do not exist. */
export const listCourses: API.PaginatedOperationMethod<
  ListCoursesRequest,
  ListCoursesResponse_Op,
  ListCoursesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesRequest,
  output: ListCoursesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCoursesAliasesRequest {
  /** Identifier of the course to alias. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: CourseAlias;
}

export const CreateCoursesAliasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(CourseAlias).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/aliases",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesAliasesRequest>;

export type CreateCoursesAliasesResponse = CourseAlias;
export const CreateCoursesAliasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CourseAlias;

export type CreateCoursesAliasesError = DefaultErrors;

/** Creates an alias for a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create the alias or for access errors. * `NOT_FOUND` if the course does not exist. * `ALREADY_EXISTS` if the alias already exists. * `FAILED_PRECONDITION` if the alias requested does not make sense for the requesting user or course (for example, if a user not in a domain attempts to access a domain-scoped alias). */
export const createCoursesAliases: API.OperationMethod<
  CreateCoursesAliasesRequest,
  CreateCoursesAliasesResponse,
  CreateCoursesAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesAliasesRequest,
  output: CreateCoursesAliasesResponse,
  errors: [],
}));

export interface DeleteCoursesAliasesRequest {
  /** Identifier of the course whose alias should be deleted. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Alias to delete. This may not be the Classroom-assigned identifier. */
  alias: string;
}

export const DeleteCoursesAliasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    alias: Schema.String.pipe(T.HttpPath("alias")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v1/courses/{courseId}/aliases/{alias}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesAliasesRequest>;

export type DeleteCoursesAliasesResponse = Empty;
export const DeleteCoursesAliasesResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesAliasesError = DefaultErrors;

/** Deletes an alias of a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to remove the alias or for access errors. * `NOT_FOUND` if the alias does not exist. * `FAILED_PRECONDITION` if the alias requested does not make sense for the requesting user or course (for example, if a user not in a domain attempts to delete a domain-scoped alias). */
export const deleteCoursesAliases: API.OperationMethod<
  DeleteCoursesAliasesRequest,
  DeleteCoursesAliasesResponse,
  DeleteCoursesAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesAliasesRequest,
  output: DeleteCoursesAliasesResponse,
  errors: [],
}));

export interface ListCoursesAliasesRequest {
  /** The identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesAliasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/aliases" }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesAliasesRequest>;

export type ListCoursesAliasesResponse = ListCourseAliasesResponse;
export const ListCoursesAliasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCourseAliasesResponse;

export type ListCoursesAliasesError = DefaultErrors;

/** Returns a list of aliases for a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the course or for access errors. * `NOT_FOUND` if the course does not exist. */
export const listCoursesAliases: API.PaginatedOperationMethod<
  ListCoursesAliasesRequest,
  ListCoursesAliasesResponse,
  ListCoursesAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesAliasesRequest,
  output: ListCoursesAliasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCoursesStudentsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const GetCoursesStudentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/students/{userId}" }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesStudentsRequest>;

export type GetCoursesStudentsResponse = Student;
export const GetCoursesStudentsResponse = /*@__PURE__*/ /*#__PURE__*/ Student;

export type GetCoursesStudentsError = DefaultErrors;

/** Returns a student of a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to view students of this course or for access errors. * `NOT_FOUND` if no student of this course has the requested ID or if the course does not exist. */
export const getCoursesStudents: API.OperationMethod<
  GetCoursesStudentsRequest,
  GetCoursesStudentsResponse,
  GetCoursesStudentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesStudentsRequest,
  output: GetCoursesStudentsResponse,
  errors: [],
}));

export interface CreateCoursesStudentsRequest {
  /** Identifier of the course to create the student in. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Enrollment code of the course to create the student in. This code is required if userId corresponds to the requesting user; it may be omitted if the requesting user has administrative permissions to create students for any user. */
  enrollmentCode?: string;
  /** Request body */
  body?: Student;
}

export const CreateCoursesStudentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    enrollmentCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("enrollmentCode"),
    ),
    body: Schema.optional(Student).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/students",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesStudentsRequest>;

export type CreateCoursesStudentsResponse = Student;
export const CreateCoursesStudentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Student;

export type CreateCoursesStudentsError = DefaultErrors;

/** Adds a user as a student of a course. Domain administrators are permitted to [directly add](https://developers.google.com/workspace/classroom/guides/manage-users) users within their domain as students to courses within their domain. Students are permitted to add themselves to a course using an enrollment code. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create students in this course or for access errors. * `NOT_FOUND` if the requested course ID does not exist. * `FAILED_PRECONDITION` if the requested user's account is disabled, for the following request errors: * CourseMemberLimitReached * CourseNotModifiable * UserGroupsMembershipLimitReached * InactiveCourseOwner * `ALREADY_EXISTS` if the user is already a student or teacher in the course. */
export const createCoursesStudents: API.OperationMethod<
  CreateCoursesStudentsRequest,
  CreateCoursesStudentsResponse,
  CreateCoursesStudentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesStudentsRequest,
  output: CreateCoursesStudentsResponse,
  errors: [],
}));

export interface DeleteCoursesStudentsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student to delete. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const DeleteCoursesStudentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/students/{userId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesStudentsRequest>;

export type DeleteCoursesStudentsResponse = Empty;
export const DeleteCoursesStudentsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesStudentsError = DefaultErrors;

/** Deletes a student of a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete students of this course or for access errors. * `NOT_FOUND` if no student of this course has the requested ID or if the course does not exist. */
export const deleteCoursesStudents: API.OperationMethod<
  DeleteCoursesStudentsRequest,
  DeleteCoursesStudentsResponse,
  DeleteCoursesStudentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesStudentsRequest,
  output: DeleteCoursesStudentsResponse,
  errors: [],
}));

export interface ListCoursesStudentsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Maximum number of items to return. The default is 30 if unspecified or `0`. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesStudentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/students" }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesStudentsRequest>;

export type ListCoursesStudentsResponse = ListStudentsResponse;
export const ListCoursesStudentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListStudentsResponse;

export type ListCoursesStudentsError = DefaultErrors;

/** Returns a list of students of this course that the requester is permitted to view. This method returns the following error codes: * `NOT_FOUND` if the course does not exist. * `PERMISSION_DENIED` for access errors. */
export const listCoursesStudents: API.PaginatedOperationMethod<
  ListCoursesStudentsRequest,
  ListCoursesStudentsResponse,
  ListCoursesStudentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesStudentsRequest,
  output: ListCoursesStudentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ModifyAssigneesCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the coursework. */
  id: string;
  /** Request body */
  body?: ModifyCourseWorkAssigneesRequest;
}

export const ModifyAssigneesCoursesCourseWorkRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(ModifyCourseWorkAssigneesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWork/{id}:modifyAssignees",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyAssigneesCoursesCourseWorkRequest>;

export type ModifyAssigneesCoursesCourseWorkResponse = CourseWork;
export const ModifyAssigneesCoursesCourseWorkResponse =
  /*@__PURE__*/ /*#__PURE__*/ CourseWork;

export type ModifyAssigneesCoursesCourseWorkError = DefaultErrors;

/** Modifies assignee mode and options of a coursework. Only a teacher of the course that contains the coursework may call this method. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist. * `FAILED_PRECONDITION` for the following request error: * EmptyAssignees */
export const modifyAssigneesCoursesCourseWork: API.OperationMethod<
  ModifyAssigneesCoursesCourseWorkRequest,
  ModifyAssigneesCoursesCourseWorkResponse,
  ModifyAssigneesCoursesCourseWorkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyAssigneesCoursesCourseWorkRequest,
  output: ModifyAssigneesCoursesCourseWorkResponse,
  errors: [],
}));

export interface PatchCoursesCourseWorkRequest {
  /** Mask that identifies which fields on the course work to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `CourseWork` object. If a field that does not support empty values is included in the update mask and not set in the `CourseWork` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `description` * `state` * `due_date` * `due_time` * `max_points` * `scheduled_time` * `submission_modification_mode` * `topic_id` * `grading_period_id` */
  updateMask?: string;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  id: string;
  /** Request body */
  body?: CourseWork;
}

export const PatchCoursesCourseWorkRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(CourseWork).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/courseWork/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesCourseWorkRequest>;

export type PatchCoursesCourseWorkResponse = CourseWork;
export const PatchCoursesCourseWorkResponse =
  /*@__PURE__*/ /*#__PURE__*/ CourseWork;

export type PatchCoursesCourseWorkError = DefaultErrors;

/** Updates one or more fields of a course work. See google.classroom.v1.CourseWork for details of which fields may be updated and who may change them. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the user is not permitted to make the requested modification to the student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if the requested course work has already been deleted. * `NOT_FOUND` if the requested course or course work does not exist. */
export const patchCoursesCourseWork: API.OperationMethod<
  PatchCoursesCourseWorkRequest,
  PatchCoursesCourseWorkResponse,
  PatchCoursesCourseWorkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesCourseWorkRequest,
  output: PatchCoursesCourseWorkResponse,
  errors: [],
}));

export interface CreateCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: CourseWork;
}

export const CreateCoursesCourseWorkRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(CourseWork).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWork",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesCourseWorkRequest>;

export type CreateCoursesCourseWorkResponse = CourseWork;
export const CreateCoursesCourseWorkResponse =
  /*@__PURE__*/ /*#__PURE__*/ CourseWork;

export type CreateCoursesCourseWorkError = DefaultErrors;

/** Creates course work. The resulting course work (and corresponding student submissions) are associated with the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to make the request. Classroom API requests to modify course work and student submissions must be made with an OAuth client ID from the associated Developer Console project. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create course work in the requested course, share a Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. * `FAILED_PRECONDITION` for the following request error: * AttachmentNotVisible */
export const createCoursesCourseWork: API.OperationMethod<
  CreateCoursesCourseWorkRequest,
  CreateCoursesCourseWorkResponse,
  CreateCoursesCourseWorkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesCourseWorkRequest,
  output: CreateCoursesCourseWorkResponse,
  errors: [],
}));

export interface ListCoursesCourseWorkRequest {
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported fields are `updateTime` and `dueDate`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `dueDate asc,updateTime desc`, `updateTime,dueDate desc` */
  orderBy?: string;
  /** Restriction on the work status to return. Only courseWork that matches is returned. If unspecified, items with a work status of `PUBLISHED` is returned. */
  courseWorkStates?:
    | "COURSE_WORK_STATE_UNSPECIFIED"
    | "PUBLISHED"
    | "DRAFT"
    | "DELETED"
    | (string & {})[];
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
}

export const ListCoursesCourseWorkRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    courseWorkStates: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("courseWorkStates"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork" }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesCourseWorkRequest>;

export type ListCoursesCourseWorkResponse = ListCourseWorkResponse;
export const ListCoursesCourseWorkResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCourseWorkResponse;

export type ListCoursesCourseWorkError = DefaultErrors;

/** Returns a list of course work that the requester is permitted to view. Course students may only view `PUBLISHED` course work. Course teachers and domain administrators may view all course work. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export const listCoursesCourseWork: API.PaginatedOperationMethod<
  ListCoursesCourseWorkRequest,
  ListCoursesCourseWorkResponse,
  ListCoursesCourseWorkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesCourseWorkRequest,
  output: ListCoursesCourseWorkResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  id: string;
}

export const GetCoursesCourseWorkRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{id}" }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesCourseWorkRequest>;

export type GetCoursesCourseWorkResponse = CourseWork;
export const GetCoursesCourseWorkResponse =
  /*@__PURE__*/ /*#__PURE__*/ CourseWork;

export type GetCoursesCourseWorkError = DefaultErrors;

/** Returns course work. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist. */
export const getCoursesCourseWork: API.OperationMethod<
  GetCoursesCourseWorkRequest,
  GetCoursesCourseWorkResponse,
  GetCoursesCourseWorkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesCourseWorkRequest,
  output: GetCoursesCourseWorkResponse,
  errors: [],
}));

export interface GetAddOnContextCoursesCourseWorkRequest {
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. The identifier of the attachment. This field is required for all requests except when the user is in the [Attachment Discovery iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/attachment-discovery-iframe). */
  attachmentId?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. The authorization token is required when neither of the following is true: * The add-on has attachments on the post. * The developer project issuing the request is the same project that created the post. */
  addOnToken?: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const GetAddOnContextCoursesCourseWorkRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("attachmentId"),
    ),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWork/{itemId}/addOnContext",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAddOnContextCoursesCourseWorkRequest>;

export type GetAddOnContextCoursesCourseWorkResponse = AddOnContext;
export const GetAddOnContextCoursesCourseWorkResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnContext;

export type GetAddOnContextCoursesCourseWorkError = DefaultErrors;

/** Gets metadata for Classroom add-ons in the context of a specific post. To maintain the integrity of its own data and permissions model, an add-on should call this to validate query parameters and the requesting user's role whenever the add-on is opened in an [iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/iframes-overview). This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getAddOnContextCoursesCourseWork: API.OperationMethod<
  GetAddOnContextCoursesCourseWorkRequest,
  GetAddOnContextCoursesCourseWorkResponse,
  GetAddOnContextCoursesCourseWorkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAddOnContextCoursesCourseWorkRequest,
  output: GetAddOnContextCoursesCourseWorkResponse,
  errors: [],
}));

export interface UpdateRubricCoursesCourseWorkRequest {
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Identifier of the rubric. */
  id?: string;
  /** Optional. Mask that identifies which fields on the rubric to update. This field is required to do an update. The update fails if invalid fields are specified. There are multiple options to define the criteria of a rubric: the `source_spreadsheet_id` and the `criteria` list. Only one of these can be used at a time to define a rubric. The rubric `criteria` list is fully replaced by the rubric criteria specified in the update request. For example, if a criterion or level is missing from the request, it is deleted. New criteria and levels are added and an ID is assigned. Existing criteria and levels retain the previously assigned ID if the ID is specified in the request. The following fields can be specified by teachers: * `criteria` * `source_spreadsheet_id` */
  updateMask?: string;
  /** Request body */
  body?: Rubric;
}

export const UpdateRubricCoursesCourseWorkRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Rubric).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubric",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateRubricCoursesCourseWorkRequest>;

export type UpdateRubricCoursesCourseWorkResponse = Rubric;
export const UpdateRubricCoursesCourseWorkResponse =
  /*@__PURE__*/ /*#__PURE__*/ Rubric;

export type UpdateRubricCoursesCourseWorkError = DefaultErrors;

/** Updates a rubric. See google.classroom.v1.Rubric for details of which fields can be updated. Rubric update capabilities are [limited](/classroom/rubrics/limitations) once grading has started. The requesting user and course owner must have rubrics creation capabilities. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/rubrics/limitations#license-requirements). This request must be made by the Google Cloud console of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the parent course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project didn't create the corresponding course work, if the user isn't permitted to make the requested modification to the rubric, or for access errors. This error code is also returned if grading has already started on the rubric. * `INVALID_ARGUMENT` if the request is malformed and for the following request error: * `RubricCriteriaInvalidFormat` * `NOT_FOUND` if the requested course, course work, or rubric doesn't exist or if the user doesn't have access to the corresponding course work. * `INTERNAL` if grading has already started on the rubric. */
export const updateRubricCoursesCourseWork: API.OperationMethod<
  UpdateRubricCoursesCourseWorkRequest,
  UpdateRubricCoursesCourseWorkResponse,
  UpdateRubricCoursesCourseWorkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRubricCoursesCourseWorkRequest,
  output: UpdateRubricCoursesCourseWorkResponse,
  errors: [],
}));

export interface DeleteCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work to delete. This identifier is a Classroom-assigned identifier. */
  id: string;
}

export const DeleteCoursesCourseWorkRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v1/courses/{courseId}/courseWork/{id}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesCourseWorkRequest>;

export type DeleteCoursesCourseWorkResponse = Empty;
export const DeleteCoursesCourseWorkResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesCourseWorkError = DefaultErrors;

/** Deletes a course work. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the requesting user is not permitted to delete the requested course or for access errors. * `FAILED_PRECONDITION` if the requested course work has already been deleted. * `NOT_FOUND` if no course exists with the requested ID. */
export const deleteCoursesCourseWork: API.OperationMethod<
  DeleteCoursesCourseWorkRequest,
  DeleteCoursesCourseWorkResponse,
  DeleteCoursesCourseWorkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesCourseWorkRequest,
  output: DeleteCoursesCourseWorkResponse,
  errors: [],
}));

export interface PatchCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Mask that identifies which fields on the student submission to update. This field is required to do an update. The update fails if invalid fields are specified. The following fields may be specified by teachers: * `draft_grade` * `assigned_grade` */
  updateMask?: string;
  /** Request body */
  body?: StudentSubmission;
}

export const PatchCoursesCourseWorkStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(StudentSubmission).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesCourseWorkStudentSubmissionsRequest>;

export type PatchCoursesCourseWorkStudentSubmissionsResponse =
  StudentSubmission;
export const PatchCoursesCourseWorkStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ StudentSubmission;

export type PatchCoursesCourseWorkStudentSubmissionsError = DefaultErrors;

/** Updates one or more fields of a student submission. See google.classroom.v1.StudentSubmission for details of which fields may be updated and who may change them. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the user is not permitted to make the requested modification to the student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export const patchCoursesCourseWorkStudentSubmissions: API.OperationMethod<
  PatchCoursesCourseWorkStudentSubmissionsRequest,
  PatchCoursesCourseWorkStudentSubmissionsResponse,
  PatchCoursesCourseWorkStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesCourseWorkStudentSubmissionsRequest,
  output: PatchCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

export interface ListCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student work to request. This may be set to the string literal `"-"` to request student work for all course work in the specified course. */
  courseWorkId: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Optional argument to restrict returned student work to those owned by the student with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Requested submission states. If specified, returned student submissions match one of the specified submission states. */
  states?:
    | "SUBMISSION_STATE_UNSPECIFIED"
    | "NEW"
    | "CREATED"
    | "TURNED_IN"
    | "RETURNED"
    | "RECLAIMED_BY_STUDENT"
    | (string & {})[];
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Requested lateness value. If specified, returned student submissions are restricted by the requested value. If unspecified, submissions are returned regardless of `late` value. */
  late?:
    | "LATE_VALUES_UNSPECIFIED"
    | "LATE_ONLY"
    | "NOT_LATE_ONLY"
    | (string & {});
}

export const ListCoursesCourseWorkStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    userId: Schema.optional(Schema.String).pipe(T.HttpQuery("userId")),
    states: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("states"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    late: Schema.optional(Schema.String).pipe(T.HttpQuery("late")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesCourseWorkStudentSubmissionsRequest>;

export type ListCoursesCourseWorkStudentSubmissionsResponse =
  ListStudentSubmissionsResponse;
export const ListCoursesCourseWorkStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListStudentSubmissionsResponse;

export type ListCoursesCourseWorkStudentSubmissionsError = DefaultErrors;

/** Returns a list of student submissions that the requester is permitted to view, factoring in the OAuth scopes of the request. A hyphen (`-`) may be specified as the `course_work_id` to include student submissions for multiple course work items. Course students may only view their own work. Course teachers and domain administrators may view all student submissions. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export const listCoursesCourseWorkStudentSubmissions: API.PaginatedOperationMethod<
  ListCoursesCourseWorkStudentSubmissionsRequest,
  ListCoursesCourseWorkStudentSubmissionsResponse,
  ListCoursesCourseWorkStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesCourseWorkStudentSubmissionsRequest,
  output: ListCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ReclaimCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Request body */
  body?: ReclaimStudentSubmissionRequest;
}

export const ReclaimCoursesCourseWorkStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(ReclaimStudentSubmissionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:reclaim",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReclaimCoursesCourseWorkStudentSubmissionsRequest>;

export type ReclaimCoursesCourseWorkStudentSubmissionsResponse = Empty;
export const ReclaimCoursesCourseWorkStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ReclaimCoursesCourseWorkStudentSubmissionsError = DefaultErrors;

/** Reclaims a student submission on behalf of the student that owns it. Reclaiming a student submission transfers ownership of attached Drive files to the student and updates the submission state. Only the student that owns the requested student submission may call this method, and only for a student submission that has been turned in. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, unsubmit the requested student submission, or for access errors. * `FAILED_PRECONDITION` if the student submission has not been turned in. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export const reclaimCoursesCourseWorkStudentSubmissions: API.OperationMethod<
  ReclaimCoursesCourseWorkStudentSubmissionsRequest,
  ReclaimCoursesCourseWorkStudentSubmissionsResponse,
  ReclaimCoursesCourseWorkStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReclaimCoursesCourseWorkStudentSubmissionsRequest,
  output: ReclaimCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

export interface ReturnCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Request body */
  body?: ReturnStudentSubmissionRequest;
}

export const ReturnCoursesCourseWorkStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(ReturnStudentSubmissionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:return",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReturnCoursesCourseWorkStudentSubmissionsRequest>;

export type ReturnCoursesCourseWorkStudentSubmissionsResponse = Empty;
export const ReturnCoursesCourseWorkStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ReturnCoursesCourseWorkStudentSubmissionsError = DefaultErrors;

/** Returns a student submission. Returning a student submission transfers ownership of attached Drive files to the student and may also update the submission state. Unlike the Classroom application, returning a student submission does not set assignedGrade to the draftGrade value. Only a teacher of the course that contains the requested student submission may call this method. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, return the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export const returnCoursesCourseWorkStudentSubmissions: API.OperationMethod<
  ReturnCoursesCourseWorkStudentSubmissionsRequest,
  ReturnCoursesCourseWorkStudentSubmissionsResponse,
  ReturnCoursesCourseWorkStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReturnCoursesCourseWorkStudentSubmissionsRequest,
  output: ReturnCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

export interface ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Request body */
  body?: ModifyAttachmentsRequest;
}

export const ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    body: Schema.optional(ModifyAttachmentsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:modifyAttachments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest>;

export type ModifyAttachmentsCoursesCourseWorkStudentSubmissionsResponse =
  StudentSubmission;
export const ModifyAttachmentsCoursesCourseWorkStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ StudentSubmission;

export type ModifyAttachmentsCoursesCourseWorkStudentSubmissionsError =
  DefaultErrors;

/** Modifies attachments of student submission. Attachments may only be added to student submissions belonging to course work objects with a `workType` of `ASSIGNMENT`. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, if the user is not permitted to modify attachments on the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export const modifyAttachmentsCoursesCourseWorkStudentSubmissions: API.OperationMethod<
  ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest,
  ModifyAttachmentsCoursesCourseWorkStudentSubmissionsResponse,
  ModifyAttachmentsCoursesCourseWorkStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest,
  output: ModifyAttachmentsCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

export interface GetCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student submission. */
  id: string;
}

export const GetCoursesCourseWorkStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesCourseWorkStudentSubmissionsRequest>;

export type GetCoursesCourseWorkStudentSubmissionsResponse = StudentSubmission;
export const GetCoursesCourseWorkStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ StudentSubmission;

export type GetCoursesCourseWorkStudentSubmissionsError = DefaultErrors;

/** Returns a student submission. * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, course work, or student submission or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export const getCoursesCourseWorkStudentSubmissions: API.OperationMethod<
  GetCoursesCourseWorkStudentSubmissionsRequest,
  GetCoursesCourseWorkStudentSubmissionsResponse,
  GetCoursesCourseWorkStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesCourseWorkStudentSubmissionsRequest,
  output: GetCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

export interface TurnInCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Request body */
  body?: TurnInStudentSubmissionRequest;
}

export const TurnInCoursesCourseWorkStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    body: Schema.optional(TurnInStudentSubmissionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:turnIn",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TurnInCoursesCourseWorkStudentSubmissionsRequest>;

export type TurnInCoursesCourseWorkStudentSubmissionsResponse = Empty;
export const TurnInCoursesCourseWorkStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type TurnInCoursesCourseWorkStudentSubmissionsError = DefaultErrors;

/** Turns in a student submission. Turning in a student submission transfers ownership of attached Drive files to the teacher and may also update the submission state. This may only be called by the student that owns the specified student submission. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, turn in the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export const turnInCoursesCourseWorkStudentSubmissions: API.OperationMethod<
  TurnInCoursesCourseWorkStudentSubmissionsRequest,
  TurnInCoursesCourseWorkStudentSubmissionsResponse,
  TurnInCoursesCourseWorkStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TurnInCoursesCourseWorkStudentSubmissionsRequest,
  output: TurnInCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

export interface GetCoursesCourseWorkAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
}

export const GetCoursesCourseWorkAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesCourseWorkAddOnAttachmentsRequest>;

export type GetCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;
export const GetCoursesCourseWorkAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type GetCoursesCourseWorkAddOnAttachmentsError = DefaultErrors;

/** Returns an add-on attachment. Requires the add-on requesting the attachment to be the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getCoursesCourseWorkAddOnAttachments: API.OperationMethod<
  GetCoursesCourseWorkAddOnAttachmentsRequest,
  GetCoursesCourseWorkAddOnAttachmentsResponse,
  GetCoursesCourseWorkAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesCourseWorkAddOnAttachmentsRequest,
  output: GetCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
}));

export interface DeleteCoursesCourseWorkAddOnAttachmentsRequest {
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const DeleteCoursesCourseWorkAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesCourseWorkAddOnAttachmentsRequest>;

export type DeleteCoursesCourseWorkAddOnAttachmentsResponse = Empty;
export const DeleteCoursesCourseWorkAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesCourseWorkAddOnAttachmentsError = DefaultErrors;

/** Deletes an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const deleteCoursesCourseWorkAddOnAttachments: API.OperationMethod<
  DeleteCoursesCourseWorkAddOnAttachmentsRequest,
  DeleteCoursesCourseWorkAddOnAttachmentsResponse,
  DeleteCoursesCourseWorkAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesCourseWorkAddOnAttachmentsRequest,
  output: DeleteCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
}));

export interface ListCoursesCourseWorkAddOnAttachmentsRequest {
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** A page token, received from a previous `ListAddOnAttachments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAddOnAttachments` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Identifier of the post under the course whose attachments to enumerate. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const ListCoursesCourseWorkAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesCourseWorkAddOnAttachmentsRequest>;

export type ListCoursesCourseWorkAddOnAttachmentsResponse =
  ListAddOnAttachmentsResponse;
export const ListCoursesCourseWorkAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAddOnAttachmentsResponse;

export type ListCoursesCourseWorkAddOnAttachmentsError = DefaultErrors;

/** Returns all attachments created by an add-on under the post. Requires the add-on to have active attachments on the post or have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const listCoursesCourseWorkAddOnAttachments: API.PaginatedOperationMethod<
  ListCoursesCourseWorkAddOnAttachmentsRequest,
  ListCoursesCourseWorkAddOnAttachmentsResponse,
  ListCoursesCourseWorkAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesCourseWorkAddOnAttachmentsRequest,
  output: ListCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchCoursesCourseWorkAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the post under which the attachment is attached. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachment` object. If a field that does not support empty values is included in the update mask and not set in the `AddOnAttachment` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `teacher_view_uri` * `student_view_uri` * `student_work_review_uri` * `due_date` * `due_time` * `max_points` */
  updateMask?: string;
  /** Required. Identifier of the post under which the attachment is attached. */
  postId?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const PatchCoursesCourseWorkAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesCourseWorkAddOnAttachmentsRequest>;

export type PatchCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;
export const PatchCoursesCourseWorkAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type PatchCoursesCourseWorkAddOnAttachmentsError = DefaultErrors;

/** Updates an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const patchCoursesCourseWorkAddOnAttachments: API.OperationMethod<
  PatchCoursesCourseWorkAddOnAttachmentsRequest,
  PatchCoursesCourseWorkAddOnAttachmentsResponse,
  PatchCoursesCourseWorkAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesCourseWorkAddOnAttachmentsRequest,
  output: PatchCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
}));

export interface CreateCoursesCourseWorkAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which to create the attachment. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match. */
  addOnToken?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const CreateCoursesCourseWorkAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
    body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesCourseWorkAddOnAttachmentsRequest>;

export type CreateCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;
export const CreateCoursesCourseWorkAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type CreateCoursesCourseWorkAddOnAttachmentsError = DefaultErrors;

/** Creates an add-on attachment under a post. Requires the add-on to have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const createCoursesCourseWorkAddOnAttachments: API.OperationMethod<
  CreateCoursesCourseWorkAddOnAttachmentsRequest,
  CreateCoursesCourseWorkAddOnAttachmentsResponse,
  CreateCoursesCourseWorkAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesCourseWorkAddOnAttachmentsRequest,
  output: CreateCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
}));

export interface PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest {
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachmentStudentSubmission` object. The following fields may be specified by teachers: * `points_earned` */
  updateMask?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the student's submission. */
  submissionId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Request body */
  body?: AddOnAttachmentStudentSubmission;
}

export const PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    submissionId: Schema.String.pipe(T.HttpPath("submissionId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    body: Schema.optional(AddOnAttachmentStudentSubmission).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest>;

export type PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse =
  AddOnAttachmentStudentSubmission;
export const PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachmentStudentSubmission;

export type PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsError =
  DefaultErrors;

/** Updates data associated with an add-on attachment submission. Requires the add-on to have been the original creator of the attachment and the attachment to have a positive `max_points` value set. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const patchCoursesCourseWorkAddOnAttachmentsStudentSubmissions: API.OperationMethod<
  PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest,
  PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse,
  PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest,
  output: PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse,
  errors: [],
}));

export interface GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest {
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the student’s submission. */
  submissionId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    submissionId: Schema.String.pipe(T.HttpPath("submissionId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest>;

export type GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse =
  AddOnAttachmentStudentSubmission;
export const GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachmentStudentSubmission;

export type GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsError =
  DefaultErrors;

/** Returns a student submission for an add-on attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getCoursesCourseWorkAddOnAttachmentsStudentSubmissions: API.OperationMethod<
  GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest,
  GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse,
  GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest,
  output: GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse,
  errors: [],
}));

export interface ListCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** The maximum number of rubrics to return. If unspecified, at most 1 rubric is returned. The maximum value is 1; values above 1 are coerced to 1. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesCourseWorkRubricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesCourseWorkRubricsRequest>;

export type ListCoursesCourseWorkRubricsResponse = ListRubricsResponse;
export const ListCoursesCourseWorkRubricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListRubricsResponse;

export type ListCoursesCourseWorkRubricsError = DefaultErrors;

/** Returns a list of rubrics that the requester is permitted to view. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work doesn't exist or if the user doesn't have access to the corresponding course work. */
export const listCoursesCourseWorkRubrics: API.PaginatedOperationMethod<
  ListCoursesCourseWorkRubricsRequest,
  ListCoursesCourseWorkRubricsResponse,
  ListCoursesCourseWorkRubricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesCourseWorkRubricsRequest,
  output: ListCoursesCourseWorkRubricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the rubric. */
  id: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
}

export const GetCoursesCourseWorkRubricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesCourseWorkRubricsRequest>;

export type GetCoursesCourseWorkRubricsResponse = Rubric;
export const GetCoursesCourseWorkRubricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Rubric;

export type GetCoursesCourseWorkRubricsError = DefaultErrors;

/** Returns a rubric. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or rubric doesn't exist or if the user doesn't have access to the corresponding course work. */
export const getCoursesCourseWorkRubrics: API.OperationMethod<
  GetCoursesCourseWorkRubricsRequest,
  GetCoursesCourseWorkRubricsResponse,
  GetCoursesCourseWorkRubricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesCourseWorkRubricsRequest,
  output: GetCoursesCourseWorkRubricsResponse,
  errors: [],
}));

export interface DeleteCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the rubric. */
  id: string;
}

export const DeleteCoursesCourseWorkRubricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesCourseWorkRubricsRequest>;

export type DeleteCoursesCourseWorkRubricsResponse = Empty;
export const DeleteCoursesCourseWorkRubricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesCourseWorkRubricsError = DefaultErrors;

/** Deletes a rubric. The requesting user and course owner must have rubrics creation capabilities. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/rubrics/limitations#license-requirements). This request must be made by the Google Cloud console of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding rubric. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project didn't create the corresponding rubric, or if the requesting user isn't permitted to delete the requested rubric. * `NOT_FOUND` if no rubric exists with the requested ID or the user does not have access to the course, course work, or rubric. * `INVALID_ARGUMENT` if grading has already started on the rubric. */
export const deleteCoursesCourseWorkRubrics: API.OperationMethod<
  DeleteCoursesCourseWorkRubricsRequest,
  DeleteCoursesCourseWorkRubricsResponse,
  DeleteCoursesCourseWorkRubricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesCourseWorkRubricsRequest,
  output: DeleteCoursesCourseWorkRubricsResponse,
  errors: [],
}));

export interface PatchCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Identifier of the rubric. */
  id: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Optional. Mask that identifies which fields on the rubric to update. This field is required to do an update. The update fails if invalid fields are specified. There are multiple options to define the criteria of a rubric: the `source_spreadsheet_id` and the `criteria` list. Only one of these can be used at a time to define a rubric. The rubric `criteria` list is fully replaced by the rubric criteria specified in the update request. For example, if a criterion or level is missing from the request, it is deleted. New criteria and levels are added and an ID is assigned. Existing criteria and levels retain the previously assigned ID if the ID is specified in the request. The following fields can be specified by teachers: * `criteria` * `source_spreadsheet_id` */
  updateMask?: string;
  /** Request body */
  body?: Rubric;
}

export const PatchCoursesCourseWorkRubricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Rubric).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesCourseWorkRubricsRequest>;

export type PatchCoursesCourseWorkRubricsResponse = Rubric;
export const PatchCoursesCourseWorkRubricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Rubric;

export type PatchCoursesCourseWorkRubricsError = DefaultErrors;

/** Updates a rubric. See google.classroom.v1.Rubric for details of which fields can be updated. Rubric update capabilities are [limited](/classroom/rubrics/limitations) once grading has started. The requesting user and course owner must have rubrics creation capabilities. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/rubrics/limitations#license-requirements). This request must be made by the Google Cloud console of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the parent course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project didn't create the corresponding course work, if the user isn't permitted to make the requested modification to the rubric, or for access errors. This error code is also returned if grading has already started on the rubric. * `INVALID_ARGUMENT` if the request is malformed and for the following request error: * `RubricCriteriaInvalidFormat` * `NOT_FOUND` if the requested course, course work, or rubric doesn't exist or if the user doesn't have access to the corresponding course work. * `INTERNAL` if grading has already started on the rubric. */
export const patchCoursesCourseWorkRubrics: API.OperationMethod<
  PatchCoursesCourseWorkRubricsRequest,
  PatchCoursesCourseWorkRubricsResponse,
  PatchCoursesCourseWorkRubricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesCourseWorkRubricsRequest,
  output: PatchCoursesCourseWorkRubricsResponse,
  errors: [],
}));

export interface CreateCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Request body */
  body?: Rubric;
}

export const CreateCoursesCourseWorkRubricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
    body: Schema.optional(Rubric).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesCourseWorkRubricsRequest>;

export type CreateCoursesCourseWorkRubricsResponse = Rubric;
export const CreateCoursesCourseWorkRubricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Rubric;

export type CreateCoursesCourseWorkRubricsError = DefaultErrors;

/** Creates a rubric. The requesting user and course owner must have rubrics creation capabilities. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/rubrics/limitations#license-requirements). For further details, see [Rubrics structure and known limitations](/classroom/rubrics/limitations). This request must be made by the Google Cloud console of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the parent course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user isn't permitted to create rubrics for course work in the requested course. * `INTERNAL` if the request has insufficient OAuth scopes. * `INVALID_ARGUMENT` if the request is malformed and for the following request error: * `RubricCriteriaInvalidFormat` * `NOT_FOUND` if the requested course or course work don't exist or the user doesn't have access to the course or course work. * `FAILED_PRECONDITION` for the following request error: * `AttachmentNotVisible` */
export const createCoursesCourseWorkRubrics: API.OperationMethod<
  CreateCoursesCourseWorkRubricsRequest,
  CreateCoursesCourseWorkRubricsResponse,
  CreateCoursesCourseWorkRubricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesCourseWorkRubricsRequest,
  output: CreateCoursesCourseWorkRubricsResponse,
  errors: [],
}));

export interface CreateCoursesTeachersRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: Teacher;
}

export const CreateCoursesTeachersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(Teacher).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/teachers",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesTeachersRequest>;

export type CreateCoursesTeachersResponse = Teacher;
export const CreateCoursesTeachersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Teacher;

export type CreateCoursesTeachersError = DefaultErrors;

/** Creates a teacher of a course. Domain administrators are permitted to [directly add](https://developers.google.com/workspace/classroom/guides/manage-users) users within their domain as teachers to courses within their domain. Non-admin users should send an Invitation instead. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create teachers in this course or for access errors. * `NOT_FOUND` if the requested course ID does not exist. * `FAILED_PRECONDITION` if the requested user's account is disabled, for the following request errors: * CourseMemberLimitReached * CourseNotModifiable * CourseTeacherLimitReached * UserGroupsMembershipLimitReached * InactiveCourseOwner * `ALREADY_EXISTS` if the user is already a teacher or student in the course. */
export const createCoursesTeachers: API.OperationMethod<
  CreateCoursesTeachersRequest,
  CreateCoursesTeachersResponse,
  CreateCoursesTeachersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesTeachersRequest,
  output: CreateCoursesTeachersResponse,
  errors: [],
}));

export interface DeleteCoursesTeachersRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the teacher to delete. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const DeleteCoursesTeachersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/teachers/{userId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesTeachersRequest>;

export type DeleteCoursesTeachersResponse = Empty;
export const DeleteCoursesTeachersResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesTeachersError = DefaultErrors;

/** Removes the specified teacher from the specified course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete teachers of this course or for access errors. * `NOT_FOUND` if no teacher of this course has the requested ID or if the course does not exist. * `FAILED_PRECONDITION` if the requested ID belongs to the primary teacher of this course. * `FAILED_PRECONDITION` if the requested ID belongs to the owner of the course Drive folder. * `FAILED_PRECONDITION` if the course no longer has an active owner. */
export const deleteCoursesTeachers: API.OperationMethod<
  DeleteCoursesTeachersRequest,
  DeleteCoursesTeachersResponse,
  DeleteCoursesTeachersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesTeachersRequest,
  output: DeleteCoursesTeachersResponse,
  errors: [],
}));

export interface GetCoursesTeachersRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the teacher to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const GetCoursesTeachersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/teachers/{userId}" }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesTeachersRequest>;

export type GetCoursesTeachersResponse = Teacher;
export const GetCoursesTeachersResponse = /*@__PURE__*/ /*#__PURE__*/ Teacher;

export type GetCoursesTeachersError = DefaultErrors;

/** Returns a teacher of a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to view teachers of this course or for access errors. * `NOT_FOUND` if no teacher of this course has the requested ID or if the course does not exist. */
export const getCoursesTeachers: API.OperationMethod<
  GetCoursesTeachersRequest,
  GetCoursesTeachersResponse,
  GetCoursesTeachersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesTeachersRequest,
  output: GetCoursesTeachersResponse,
  errors: [],
}));

export interface ListCoursesTeachersRequest {
  /** Maximum number of items to return. The default is 30 if unspecified or `0`. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesTeachersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/teachers" }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesTeachersRequest>;

export type ListCoursesTeachersResponse = ListTeachersResponse;
export const ListCoursesTeachersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListTeachersResponse;

export type ListCoursesTeachersError = DefaultErrors;

/** Returns a list of teachers of this course that the requester is permitted to view. This method returns the following error codes: * `NOT_FOUND` if the course does not exist. * `PERMISSION_DENIED` for access errors. */
export const listCoursesTeachers: API.PaginatedOperationMethod<
  ListCoursesTeachersRequest,
  ListCoursesTeachersResponse,
  ListCoursesTeachersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesTeachersRequest,
  output: ListCoursesTeachersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListCoursesCourseWorkMaterialsRequest {
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Optional filtering for course work material with at least one link material whose URL partially matches the provided string. */
  materialLink?: string;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Optional filtering for course work material with at least one Drive material whose ID matches the provided string. If `material_link` is also specified, course work material must have materials matching both filters. */
  materialDriveId?: string;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Restriction on the work status to return. Only course work material that matches is returned. If unspecified, items with a work status of `PUBLISHED` is returned. */
  courseWorkMaterialStates?:
    | "COURSEWORK_MATERIAL_STATE_UNSPECIFIED"
    | "PUBLISHED"
    | "DRAFT"
    | "DELETED"
    | (string & {})[];
  /** Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported field is `updateTime`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `updateTime asc`, `updateTime` */
  orderBy?: string;
}

export const ListCoursesCourseWorkMaterialsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    materialLink: Schema.optional(Schema.String).pipe(
      T.HttpQuery("materialLink"),
    ),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    materialDriveId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("materialDriveId"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    courseWorkMaterialStates: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("courseWorkMaterialStates"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWorkMaterials",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesCourseWorkMaterialsRequest>;

export type ListCoursesCourseWorkMaterialsResponse =
  ListCourseWorkMaterialResponse;
export const ListCoursesCourseWorkMaterialsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCourseWorkMaterialResponse;

export type ListCoursesCourseWorkMaterialsError = DefaultErrors;

/** Returns a list of course work material that the requester is permitted to view. Course students may only view `PUBLISHED` course work material. Course teachers and domain administrators may view all course work material. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export const listCoursesCourseWorkMaterials: API.PaginatedOperationMethod<
  ListCoursesCourseWorkMaterialsRequest,
  ListCoursesCourseWorkMaterialsResponse,
  ListCoursesCourseWorkMaterialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesCourseWorkMaterialsRequest,
  output: ListCoursesCourseWorkMaterialsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCoursesCourseWorkMaterialsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work material. */
  id: string;
}

export const GetCoursesCourseWorkMaterialsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWorkMaterials/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesCourseWorkMaterialsRequest>;

export type GetCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;
export const GetCoursesCourseWorkMaterialsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CourseWorkMaterial;

export type GetCoursesCourseWorkMaterialsError = DefaultErrors;

/** Returns a course work material. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work material, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work material does not exist. */
export const getCoursesCourseWorkMaterials: API.OperationMethod<
  GetCoursesCourseWorkMaterialsRequest,
  GetCoursesCourseWorkMaterialsResponse,
  GetCoursesCourseWorkMaterialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesCourseWorkMaterialsRequest,
  output: GetCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

export interface GetAddOnContextCoursesCourseWorkMaterialsRequest {
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. The authorization token is required when neither of the following is true: * The add-on has attachments on the post. * The developer project issuing the request is the same project that created the post. */
  addOnToken?: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. The identifier of the attachment. This field is required for all requests except when the user is in the [Attachment Discovery iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/attachment-discovery-iframe). */
  attachmentId?: string;
  /** Required. Identifier of the course. */
  courseId: string;
}

export const GetAddOnContextCoursesCourseWorkMaterialsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("attachmentId"),
    ),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnContext",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAddOnContextCoursesCourseWorkMaterialsRequest>;

export type GetAddOnContextCoursesCourseWorkMaterialsResponse = AddOnContext;
export const GetAddOnContextCoursesCourseWorkMaterialsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnContext;

export type GetAddOnContextCoursesCourseWorkMaterialsError = DefaultErrors;

/** Gets metadata for Classroom add-ons in the context of a specific post. To maintain the integrity of its own data and permissions model, an add-on should call this to validate query parameters and the requesting user's role whenever the add-on is opened in an [iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/iframes-overview). This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getAddOnContextCoursesCourseWorkMaterials: API.OperationMethod<
  GetAddOnContextCoursesCourseWorkMaterialsRequest,
  GetAddOnContextCoursesCourseWorkMaterialsResponse,
  GetAddOnContextCoursesCourseWorkMaterialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAddOnContextCoursesCourseWorkMaterialsRequest,
  output: GetAddOnContextCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

export interface DeleteCoursesCourseWorkMaterialsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work material to delete. This identifier is a Classroom-assigned identifier. */
  id: string;
}

export const DeleteCoursesCourseWorkMaterialsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/courseWorkMaterials/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesCourseWorkMaterialsRequest>;

export type DeleteCoursesCourseWorkMaterialsResponse = Empty;
export const DeleteCoursesCourseWorkMaterialsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesCourseWorkMaterialsError = DefaultErrors;

/** Deletes a course work material. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work material item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work material, if the requesting user is not permitted to delete the requested course or for access errors. * `FAILED_PRECONDITION` if the requested course work material has already been deleted. * `NOT_FOUND` if no course exists with the requested ID. */
export const deleteCoursesCourseWorkMaterials: API.OperationMethod<
  DeleteCoursesCourseWorkMaterialsRequest,
  DeleteCoursesCourseWorkMaterialsResponse,
  DeleteCoursesCourseWorkMaterialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesCourseWorkMaterialsRequest,
  output: DeleteCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

export interface PatchCoursesCourseWorkMaterialsRequest {
  /** Mask that identifies which fields on the course work material to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the course work material object. If a field that does not support empty values is included in the update mask and not set in the course work material object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `description` * `state` * `scheduled_time` * `topic_id` */
  updateMask?: string;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work material. */
  id: string;
  /** Request body */
  body?: CourseWorkMaterial;
}

export const PatchCoursesCourseWorkMaterialsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(CourseWorkMaterial).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/courseWorkMaterials/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesCourseWorkMaterialsRequest>;

export type PatchCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;
export const PatchCoursesCourseWorkMaterialsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CourseWorkMaterial;

export type PatchCoursesCourseWorkMaterialsError = DefaultErrors;

/** Updates one or more fields of a course work material. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if the requested course work material has already been deleted. * `NOT_FOUND` if the requested course or course work material does not exist */
export const patchCoursesCourseWorkMaterials: API.OperationMethod<
  PatchCoursesCourseWorkMaterialsRequest,
  PatchCoursesCourseWorkMaterialsResponse,
  PatchCoursesCourseWorkMaterialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesCourseWorkMaterialsRequest,
  output: PatchCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

export interface CreateCoursesCourseWorkMaterialsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: CourseWorkMaterial;
}

export const CreateCoursesCourseWorkMaterialsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(CourseWorkMaterial).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWorkMaterials",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesCourseWorkMaterialsRequest>;

export type CreateCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;
export const CreateCoursesCourseWorkMaterialsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CourseWorkMaterial;

export type CreateCoursesCourseWorkMaterialsError = DefaultErrors;

/** Creates a course work material. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create course work material in the requested course, share a Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request is malformed or if more than 20 * materials are provided. * `NOT_FOUND` if the requested course does not exist. * `FAILED_PRECONDITION` for the following request error: * AttachmentNotVisible */
export const createCoursesCourseWorkMaterials: API.OperationMethod<
  CreateCoursesCourseWorkMaterialsRequest,
  CreateCoursesCourseWorkMaterialsResponse,
  CreateCoursesCourseWorkMaterialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesCourseWorkMaterialsRequest,
  output: CreateCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

export interface PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Required. Identifier of the post under which the attachment is attached. */
  postId?: string;
  /** Identifier of the post under which the attachment is attached. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachment` object. If a field that does not support empty values is included in the update mask and not set in the `AddOnAttachment` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `teacher_view_uri` * `student_view_uri` * `student_work_review_uri` * `due_date` * `due_time` * `max_points` */
  updateMask?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments/{attachmentId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type PatchCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  AddOnAttachment;
export const PatchCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type PatchCoursesCourseWorkMaterialsAddOnAttachmentsError =
  DefaultErrors;

/** Updates an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const patchCoursesCourseWorkMaterialsAddOnAttachments: API.OperationMethod<
  PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  PatchCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  PatchCoursesCourseWorkMaterialsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: PatchCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
}));

export interface CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which to create the attachment. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match. */
  addOnToken?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
    body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type CreateCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  AddOnAttachment;
export const CreateCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type CreateCoursesCourseWorkMaterialsAddOnAttachmentsError =
  DefaultErrors;

/** Creates an add-on attachment under a post. Requires the add-on to have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const createCoursesCourseWorkMaterialsAddOnAttachments: API.OperationMethod<
  CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  CreateCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  CreateCoursesCourseWorkMaterialsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: CreateCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
}));

export interface ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Optional. Identifier of the post under the course whose attachments to enumerate. Deprecated, use `item_id` instead. */
  postId?: string;
  /** A page token, received from a previous `ListAddOnAttachments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAddOnAttachments` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
}

export const ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type ListCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  ListAddOnAttachmentsResponse;
export const ListCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAddOnAttachmentsResponse;

export type ListCoursesCourseWorkMaterialsAddOnAttachmentsError = DefaultErrors;

/** Returns all attachments created by an add-on under the post. Requires the add-on to have active attachments on the post or have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const listCoursesCourseWorkMaterialsAddOnAttachments: API.PaginatedOperationMethod<
  ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  ListCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  ListCoursesCourseWorkMaterialsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: ListCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
}

export const GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments/{attachmentId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type GetCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  AddOnAttachment;
export const GetCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type GetCoursesCourseWorkMaterialsAddOnAttachmentsError = DefaultErrors;

/** Returns an add-on attachment. Requires the add-on requesting the attachment to be the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getCoursesCourseWorkMaterialsAddOnAttachments: API.OperationMethod<
  GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  GetCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  GetCoursesCourseWorkMaterialsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: GetCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
}));

export interface DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments/{attachmentId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type DeleteCoursesCourseWorkMaterialsAddOnAttachmentsResponse = Empty;
export const DeleteCoursesCourseWorkMaterialsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesCourseWorkMaterialsAddOnAttachmentsError =
  DefaultErrors;

/** Deletes an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const deleteCoursesCourseWorkMaterialsAddOnAttachments: API.OperationMethod<
  DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  DeleteCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  DeleteCoursesCourseWorkMaterialsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: DeleteCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
}));

export interface PatchCoursesTopicsRequest {
  /** Mask that identifies which fields on the topic to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the Topic object. If a field that does not support empty values is included in the update mask and not set in the Topic object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified: * `name` */
  updateMask?: string;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the topic. */
  id: string;
  /** Request body */
  body?: Topic;
}

export const PatchCoursesTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(Topic).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/topics/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesTopicsRequest>;

export type PatchCoursesTopicsResponse = Topic;
export const PatchCoursesTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Topic;

export type PatchCoursesTopicsError = DefaultErrors;

/** Updates one or more fields of a topic. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding topic or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if there exists a topic in the course with the same name. * `NOT_FOUND` if the requested course or topic does not exist */
export const patchCoursesTopics: API.OperationMethod<
  PatchCoursesTopicsRequest,
  PatchCoursesTopicsResponse,
  PatchCoursesTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesTopicsRequest,
  output: PatchCoursesTopicsResponse,
  errors: [],
}));

export interface CreateCoursesTopicsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: Topic;
}

export const CreateCoursesTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(Topic).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/topics",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesTopicsRequest>;

export type CreateCoursesTopicsResponse = Topic;
export const CreateCoursesTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Topic;

export type CreateCoursesTopicsError = DefaultErrors;

/** Creates a topic. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create a topic in the requested course, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `ALREADY_EXISTS` if there exists a topic in the course with the same name. * `FAILED_PRECONDITION` for the following request error: * CourseTopicLimitReached * `NOT_FOUND` if the requested course does not exist. */
export const createCoursesTopics: API.OperationMethod<
  CreateCoursesTopicsRequest,
  CreateCoursesTopicsResponse,
  CreateCoursesTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesTopicsRequest,
  output: CreateCoursesTopicsResponse,
  errors: [],
}));

export interface GetCoursesTopicsRequest {
  /** Identifier of the course. */
  courseId: string;
  /** Identifier of the topic. */
  id: string;
}

export const GetCoursesTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/topics/{id}" }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesTopicsRequest>;

export type GetCoursesTopicsResponse = Topic;
export const GetCoursesTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Topic;

export type GetCoursesTopicsError = DefaultErrors;

/** Returns a topic. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or topic, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or topic does not exist. */
export const getCoursesTopics: API.OperationMethod<
  GetCoursesTopicsRequest,
  GetCoursesTopicsResponse,
  GetCoursesTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesTopicsRequest,
  output: GetCoursesTopicsResponse,
  errors: [],
}));

export interface DeleteCoursesTopicsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the topic to delete. */
  id: string;
}

export const DeleteCoursesTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v1/courses/{courseId}/topics/{id}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesTopicsRequest>;

export type DeleteCoursesTopicsResponse = Empty;
export const DeleteCoursesTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesTopicsError = DefaultErrors;

/** Deletes a topic. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not allowed to delete the requested topic or for access errors. * `FAILED_PRECONDITION` if the requested topic has already been deleted. * `NOT_FOUND` if no course or topic exists with the requested ID. */
export const deleteCoursesTopics: API.OperationMethod<
  DeleteCoursesTopicsRequest,
  DeleteCoursesTopicsResponse,
  DeleteCoursesTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesTopicsRequest,
  output: DeleteCoursesTopicsResponse,
  errors: [],
}));

export interface ListCoursesTopicsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/topics" }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesTopicsRequest>;

export type ListCoursesTopicsResponse = ListTopicResponse;
export const ListCoursesTopicsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListTopicResponse;

export type ListCoursesTopicsError = DefaultErrors;

/** Returns the list of topics that the requester is permitted to view. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export const listCoursesTopics: API.PaginatedOperationMethod<
  ListCoursesTopicsRequest,
  ListCoursesTopicsResponse,
  ListCoursesTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesTopicsRequest,
  output: ListCoursesTopicsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAddOnContextCoursesPostsRequest {
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. The authorization token is required when neither of the following is true: * The add-on has attachments on the post. * The developer project issuing the request is the same project that created the post. */
  addOnToken?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** Optional. The identifier of the attachment. This field is required for all requests except when the user is in the [Attachment Discovery iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/attachment-discovery-iframe). */
  attachmentId?: string;
}

export const GetAddOnContextCoursesPostsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    postId: Schema.String.pipe(T.HttpPath("postId")),
    addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
    attachmentId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("attachmentId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/posts/{postId}/addOnContext",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAddOnContextCoursesPostsRequest>;

export type GetAddOnContextCoursesPostsResponse = AddOnContext;
export const GetAddOnContextCoursesPostsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnContext;

export type GetAddOnContextCoursesPostsError = DefaultErrors;

/** Gets metadata for Classroom add-ons in the context of a specific post. To maintain the integrity of its own data and permissions model, an add-on should call this to validate query parameters and the requesting user's role whenever the add-on is opened in an [iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/iframes-overview). This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getAddOnContextCoursesPosts: API.OperationMethod<
  GetAddOnContextCoursesPostsRequest,
  GetAddOnContextCoursesPostsResponse,
  GetAddOnContextCoursesPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAddOnContextCoursesPostsRequest,
  output: GetAddOnContextCoursesPostsResponse,
  errors: [],
}));

export interface ListCoursesPostsAddOnAttachmentsRequest {
  /** Optional. Identifier of the post under the course whose attachments to enumerate. Deprecated, use `item_id` instead. */
  postId: string;
  /** A page token, received from a previous `ListAddOnAttachments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAddOnAttachments` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
}

export const ListCoursesPostsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    postId: Schema.String.pipe(T.HttpPath("postId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesPostsAddOnAttachmentsRequest>;

export type ListCoursesPostsAddOnAttachmentsResponse =
  ListAddOnAttachmentsResponse;
export const ListCoursesPostsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAddOnAttachmentsResponse;

export type ListCoursesPostsAddOnAttachmentsError = DefaultErrors;

/** Returns all attachments created by an add-on under the post. Requires the add-on to have active attachments on the post or have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const listCoursesPostsAddOnAttachments: API.PaginatedOperationMethod<
  ListCoursesPostsAddOnAttachmentsRequest,
  ListCoursesPostsAddOnAttachmentsResponse,
  ListCoursesPostsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesPostsAddOnAttachmentsRequest,
  output: ListCoursesPostsAddOnAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCoursesPostsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
}

export const GetCoursesPostsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesPostsAddOnAttachmentsRequest>;

export type GetCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;
export const GetCoursesPostsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type GetCoursesPostsAddOnAttachmentsError = DefaultErrors;

/** Returns an add-on attachment. Requires the add-on requesting the attachment to be the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getCoursesPostsAddOnAttachments: API.OperationMethod<
  GetCoursesPostsAddOnAttachmentsRequest,
  GetCoursesPostsAddOnAttachmentsResponse,
  GetCoursesPostsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesPostsAddOnAttachmentsRequest,
  output: GetCoursesPostsAddOnAttachmentsResponse,
  errors: [],
}));

export interface DeleteCoursesPostsAddOnAttachmentsRequest {
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
}

export const DeleteCoursesPostsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesPostsAddOnAttachmentsRequest>;

export type DeleteCoursesPostsAddOnAttachmentsResponse = Empty;
export const DeleteCoursesPostsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesPostsAddOnAttachmentsError = DefaultErrors;

/** Deletes an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const deleteCoursesPostsAddOnAttachments: API.OperationMethod<
  DeleteCoursesPostsAddOnAttachmentsRequest,
  DeleteCoursesPostsAddOnAttachmentsResponse,
  DeleteCoursesPostsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesPostsAddOnAttachmentsRequest,
  output: DeleteCoursesPostsAddOnAttachmentsResponse,
  errors: [],
}));

export interface PatchCoursesPostsAddOnAttachmentsRequest {
  /** Required. Identifier of the post under which the attachment is attached. */
  postId: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachment` object. If a field that does not support empty values is included in the update mask and not set in the `AddOnAttachment` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `teacher_view_uri` * `student_view_uri` * `student_work_review_uri` * `due_date` * `due_time` * `max_points` */
  updateMask?: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Identifier of the post under which the attachment is attached. */
  itemId?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const PatchCoursesPostsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    postId: Schema.String.pipe(T.HttpPath("postId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesPostsAddOnAttachmentsRequest>;

export type PatchCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;
export const PatchCoursesPostsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type PatchCoursesPostsAddOnAttachmentsError = DefaultErrors;

/** Updates an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const patchCoursesPostsAddOnAttachments: API.OperationMethod<
  PatchCoursesPostsAddOnAttachmentsRequest,
  PatchCoursesPostsAddOnAttachmentsResponse,
  PatchCoursesPostsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesPostsAddOnAttachmentsRequest,
  output: PatchCoursesPostsAddOnAttachmentsResponse,
  errors: [],
}));

export interface CreateCoursesPostsAddOnAttachmentsRequest {
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which to create the attachment. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match. */
  addOnToken?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const CreateCoursesPostsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
    addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
    body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesPostsAddOnAttachmentsRequest>;

export type CreateCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;
export const CreateCoursesPostsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type CreateCoursesPostsAddOnAttachmentsError = DefaultErrors;

/** Creates an add-on attachment under a post. Requires the add-on to have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const createCoursesPostsAddOnAttachments: API.OperationMethod<
  CreateCoursesPostsAddOnAttachmentsRequest,
  CreateCoursesPostsAddOnAttachmentsResponse,
  CreateCoursesPostsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesPostsAddOnAttachmentsRequest,
  output: CreateCoursesPostsAddOnAttachmentsResponse,
  errors: [],
}));

export interface PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest {
  /** Required. Identifier of the student's submission. */
  submissionId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachmentStudentSubmission` object. The following fields may be specified by teachers: * `points_earned` */
  updateMask?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Request body */
  body?: AddOnAttachmentStudentSubmission;
}

export const PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    submissionId: Schema.String.pipe(T.HttpPath("submissionId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(AddOnAttachmentStudentSubmission).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest>;

export type PatchCoursesPostsAddOnAttachmentsStudentSubmissionsResponse =
  AddOnAttachmentStudentSubmission;
export const PatchCoursesPostsAddOnAttachmentsStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachmentStudentSubmission;

export type PatchCoursesPostsAddOnAttachmentsStudentSubmissionsError =
  DefaultErrors;

/** Updates data associated with an add-on attachment submission. Requires the add-on to have been the original creator of the attachment and the attachment to have a positive `max_points` value set. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const patchCoursesPostsAddOnAttachmentsStudentSubmissions: API.OperationMethod<
  PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest,
  PatchCoursesPostsAddOnAttachmentsStudentSubmissionsResponse,
  PatchCoursesPostsAddOnAttachmentsStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest,
  output: PatchCoursesPostsAddOnAttachmentsStudentSubmissionsResponse,
  errors: [],
}));

export interface GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest {
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the student’s submission. */
  submissionId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
}

export const GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    submissionId: Schema.String.pipe(T.HttpPath("submissionId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest>;

export type GetCoursesPostsAddOnAttachmentsStudentSubmissionsResponse =
  AddOnAttachmentStudentSubmission;
export const GetCoursesPostsAddOnAttachmentsStudentSubmissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachmentStudentSubmission;

export type GetCoursesPostsAddOnAttachmentsStudentSubmissionsError =
  DefaultErrors;

/** Returns a student submission for an add-on attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getCoursesPostsAddOnAttachmentsStudentSubmissions: API.OperationMethod<
  GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest,
  GetCoursesPostsAddOnAttachmentsStudentSubmissionsResponse,
  GetCoursesPostsAddOnAttachmentsStudentSubmissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest,
  output: GetCoursesPostsAddOnAttachmentsStudentSubmissionsResponse,
  errors: [],
}));

export interface ModifyAssigneesCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the announcement. */
  id: string;
  /** Request body */
  body?: ModifyAnnouncementAssigneesRequest;
}

export const ModifyAssigneesCoursesAnnouncementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(ModifyAnnouncementAssigneesRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/announcements/{id}:modifyAssignees",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyAssigneesCoursesAnnouncementsRequest>;

export type ModifyAssigneesCoursesAnnouncementsResponse = Announcement;
export const ModifyAssigneesCoursesAnnouncementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Announcement;

export type ModifyAssigneesCoursesAnnouncementsError = DefaultErrors;

/** Modifies assignee mode and options of an announcement. Only a teacher of the course that contains the announcement may call this method. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist. * `FAILED_PRECONDITION` for the following request error: * EmptyAssignees */
export const modifyAssigneesCoursesAnnouncements: API.OperationMethod<
  ModifyAssigneesCoursesAnnouncementsRequest,
  ModifyAssigneesCoursesAnnouncementsResponse,
  ModifyAssigneesCoursesAnnouncementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyAssigneesCoursesAnnouncementsRequest,
  output: ModifyAssigneesCoursesAnnouncementsResponse,
  errors: [],
}));

export interface CreateCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: Announcement;
}

export const CreateCoursesAnnouncementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(Announcement).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/announcements",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesAnnouncementsRequest>;

export type CreateCoursesAnnouncementsResponse = Announcement;
export const CreateCoursesAnnouncementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Announcement;

export type CreateCoursesAnnouncementsError = DefaultErrors;

/** Creates an announcement. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create announcements in the requested course, share a Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. * `FAILED_PRECONDITION` for the following request error: * AttachmentNotVisible */
export const createCoursesAnnouncements: API.OperationMethod<
  CreateCoursesAnnouncementsRequest,
  CreateCoursesAnnouncementsResponse,
  CreateCoursesAnnouncementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesAnnouncementsRequest,
  output: CreateCoursesAnnouncementsResponse,
  errors: [],
}));

export interface PatchCoursesAnnouncementsRequest {
  /** Mask that identifies which fields on the announcement to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the Announcement object. If a field that does not support empty values is included in the update mask and not set in the Announcement object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `text` * `state` * `scheduled_time` */
  updateMask?: string;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the announcement. */
  id: string;
  /** Request body */
  body?: Announcement;
}

export const PatchCoursesAnnouncementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(Announcement).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/announcements/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesAnnouncementsRequest>;

export type PatchCoursesAnnouncementsResponse = Announcement;
export const PatchCoursesAnnouncementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Announcement;

export type PatchCoursesAnnouncementsError = DefaultErrors;

/** Updates one or more fields of an announcement. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding announcement or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if the requested announcement has already been deleted. * `NOT_FOUND` if the requested course or announcement does not exist */
export const patchCoursesAnnouncements: API.OperationMethod<
  PatchCoursesAnnouncementsRequest,
  PatchCoursesAnnouncementsResponse,
  PatchCoursesAnnouncementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesAnnouncementsRequest,
  output: PatchCoursesAnnouncementsResponse,
  errors: [],
}));

export interface ListCoursesAnnouncementsRequest {
  /** Restriction on the `state` of announcements returned. If this argument is left unspecified, the default value is `PUBLISHED`. */
  announcementStates?:
    | "ANNOUNCEMENT_STATE_UNSPECIFIED"
    | "PUBLISHED"
    | "DRAFT"
    | "DELETED"
    | (string & {})[];
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported field is `updateTime`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `updateTime asc`, `updateTime` */
  orderBy?: string;
}

export const ListCoursesAnnouncementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    announcementStates: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("announcementStates"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/announcements" }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesAnnouncementsRequest>;

export type ListCoursesAnnouncementsResponse = ListAnnouncementsResponse;
export const ListCoursesAnnouncementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAnnouncementsResponse;

export type ListCoursesAnnouncementsError = DefaultErrors;

/** Returns a list of announcements that the requester is permitted to view. Course students may only view `PUBLISHED` announcements. Course teachers and domain administrators may view all announcements. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export const listCoursesAnnouncements: API.PaginatedOperationMethod<
  ListCoursesAnnouncementsRequest,
  ListCoursesAnnouncementsResponse,
  ListCoursesAnnouncementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesAnnouncementsRequest,
  output: ListCoursesAnnouncementsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the announcement to delete. This identifier is a Classroom-assigned identifier. */
  id: string;
}

export const DeleteCoursesAnnouncementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/announcements/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesAnnouncementsRequest>;

export type DeleteCoursesAnnouncementsResponse = Empty;
export const DeleteCoursesAnnouncementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesAnnouncementsError = DefaultErrors;

/** Deletes an announcement. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding announcement item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding announcement, if the requesting user is not permitted to delete the requested course or for access errors. * `FAILED_PRECONDITION` if the requested announcement has already been deleted. * `NOT_FOUND` if no course exists with the requested ID. */
export const deleteCoursesAnnouncements: API.OperationMethod<
  DeleteCoursesAnnouncementsRequest,
  DeleteCoursesAnnouncementsResponse,
  DeleteCoursesAnnouncementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesAnnouncementsRequest,
  output: DeleteCoursesAnnouncementsResponse,
  errors: [],
}));

export interface GetCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the announcement. */
  id: string;
}

export const GetCoursesAnnouncementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/announcements/{id}" }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesAnnouncementsRequest>;

export type GetCoursesAnnouncementsResponse = Announcement;
export const GetCoursesAnnouncementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Announcement;

export type GetCoursesAnnouncementsError = DefaultErrors;

/** Returns an announcement. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or announcement, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or announcement does not exist. */
export const getCoursesAnnouncements: API.OperationMethod<
  GetCoursesAnnouncementsRequest,
  GetCoursesAnnouncementsResponse,
  GetCoursesAnnouncementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesAnnouncementsRequest,
  output: GetCoursesAnnouncementsResponse,
  errors: [],
}));

export interface GetAddOnContextCoursesAnnouncementsRequest {
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. The authorization token is required when neither of the following is true: * The add-on has attachments on the post. * The developer project issuing the request is the same project that created the post. */
  addOnToken?: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. The identifier of the attachment. This field is required for all requests except when the user is in the [Attachment Discovery iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/attachment-discovery-iframe). */
  attachmentId?: string;
  /** Required. Identifier of the course. */
  courseId: string;
}

export const GetAddOnContextCoursesAnnouncementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("attachmentId"),
    ),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/announcements/{itemId}/addOnContext",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAddOnContextCoursesAnnouncementsRequest>;

export type GetAddOnContextCoursesAnnouncementsResponse = AddOnContext;
export const GetAddOnContextCoursesAnnouncementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnContext;

export type GetAddOnContextCoursesAnnouncementsError = DefaultErrors;

/** Gets metadata for Classroom add-ons in the context of a specific post. To maintain the integrity of its own data and permissions model, an add-on should call this to validate query parameters and the requesting user's role whenever the add-on is opened in an [iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/iframes-overview). This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getAddOnContextCoursesAnnouncements: API.OperationMethod<
  GetAddOnContextCoursesAnnouncementsRequest,
  GetAddOnContextCoursesAnnouncementsResponse,
  GetAddOnContextCoursesAnnouncementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAddOnContextCoursesAnnouncementsRequest,
  output: GetAddOnContextCoursesAnnouncementsResponse,
  errors: [],
}));

export interface CreateCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which to create the attachment. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match. */
  addOnToken?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const CreateCoursesAnnouncementsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesAnnouncementsAddOnAttachmentsRequest>;

export type CreateCoursesAnnouncementsAddOnAttachmentsResponse =
  AddOnAttachment;
export const CreateCoursesAnnouncementsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type CreateCoursesAnnouncementsAddOnAttachmentsError = DefaultErrors;

/** Creates an add-on attachment under a post. Requires the add-on to have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const createCoursesAnnouncementsAddOnAttachments: API.OperationMethod<
  CreateCoursesAnnouncementsAddOnAttachmentsRequest,
  CreateCoursesAnnouncementsAddOnAttachmentsResponse,
  CreateCoursesAnnouncementsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesAnnouncementsAddOnAttachmentsRequest,
  output: CreateCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
}));

export interface PatchCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Required. Identifier of the post under which the attachment is attached. */
  postId?: string;
  /** Identifier of the post under which the attachment is attached. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachment` object. If a field that does not support empty values is included in the update mask and not set in the `AddOnAttachment` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `teacher_view_uri` * `student_view_uri` * `student_work_review_uri` * `due_date` * `due_time` * `max_points` */
  updateMask?: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const PatchCoursesAnnouncementsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments/{attachmentId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesAnnouncementsAddOnAttachmentsRequest>;

export type PatchCoursesAnnouncementsAddOnAttachmentsResponse = AddOnAttachment;
export const PatchCoursesAnnouncementsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type PatchCoursesAnnouncementsAddOnAttachmentsError = DefaultErrors;

/** Updates an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const patchCoursesAnnouncementsAddOnAttachments: API.OperationMethod<
  PatchCoursesAnnouncementsAddOnAttachmentsRequest,
  PatchCoursesAnnouncementsAddOnAttachmentsResponse,
  PatchCoursesAnnouncementsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesAnnouncementsAddOnAttachmentsRequest,
  output: PatchCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
}));

export interface ListCoursesAnnouncementsAddOnAttachmentsRequest {
  /** A page token, received from a previous `ListAddOnAttachments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAddOnAttachments` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Identifier of the post under the course whose attachments to enumerate. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the course. */
  courseId: string;
  /** The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
}

export const ListCoursesAnnouncementsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesAnnouncementsAddOnAttachmentsRequest>;

export type ListCoursesAnnouncementsAddOnAttachmentsResponse =
  ListAddOnAttachmentsResponse;
export const ListCoursesAnnouncementsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAddOnAttachmentsResponse;

export type ListCoursesAnnouncementsAddOnAttachmentsError = DefaultErrors;

/** Returns all attachments created by an add-on under the post. Requires the add-on to have active attachments on the post or have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const listCoursesAnnouncementsAddOnAttachments: API.PaginatedOperationMethod<
  ListCoursesAnnouncementsAddOnAttachmentsRequest,
  ListCoursesAnnouncementsAddOnAttachmentsResponse,
  ListCoursesAnnouncementsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesAnnouncementsAddOnAttachmentsRequest,
  output: ListCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
}

export const DeleteCoursesAnnouncementsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments/{attachmentId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesAnnouncementsAddOnAttachmentsRequest>;

export type DeleteCoursesAnnouncementsAddOnAttachmentsResponse = Empty;
export const DeleteCoursesAnnouncementsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesAnnouncementsAddOnAttachmentsError = DefaultErrors;

/** Deletes an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const deleteCoursesAnnouncementsAddOnAttachments: API.OperationMethod<
  DeleteCoursesAnnouncementsAddOnAttachmentsRequest,
  DeleteCoursesAnnouncementsAddOnAttachmentsResponse,
  DeleteCoursesAnnouncementsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesAnnouncementsAddOnAttachmentsRequest,
  output: DeleteCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
}));

export interface GetCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
}

export const GetCoursesAnnouncementsAddOnAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments/{attachmentId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCoursesAnnouncementsAddOnAttachmentsRequest>;

export type GetCoursesAnnouncementsAddOnAttachmentsResponse = AddOnAttachment;
export const GetCoursesAnnouncementsAddOnAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AddOnAttachment;

export type GetCoursesAnnouncementsAddOnAttachmentsError = DefaultErrors;

/** Returns an add-on attachment. Requires the add-on requesting the attachment to be the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export const getCoursesAnnouncementsAddOnAttachments: API.OperationMethod<
  GetCoursesAnnouncementsAddOnAttachmentsRequest,
  GetCoursesAnnouncementsAddOnAttachmentsResponse,
  GetCoursesAnnouncementsAddOnAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCoursesAnnouncementsAddOnAttachmentsRequest,
  output: GetCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
}));

export interface PatchCoursesStudentGroupsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the student group. */
  id: string;
  /** Required. Mask that identifies which fields on the student group to update. This field is required to do an update. The update fails if invalid fields are specified. The following fields can be specified by teachers: * `title` */
  updateMask?: string;
  /** Request body */
  body?: StudentGroup;
}

export const PatchCoursesStudentGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(StudentGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/courses/{courseId}/studentGroups/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchCoursesStudentGroupsRequest>;

export type PatchCoursesStudentGroupsResponse = StudentGroup;
export const PatchCoursesStudentGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ StudentGroup;

export type PatchCoursesStudentGroupsError = DefaultErrors;

/** Updates one or more fields in a student group. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to modify the requested student group or for access errors. * `NOT_FOUND` if the student group does not exist or the user does not have access to the student group. * `INVALID_ARGUMENT` if invalid fields are specified in the update mask or if no update mask is supplied. */
export const patchCoursesStudentGroups: API.OperationMethod<
  PatchCoursesStudentGroupsRequest,
  PatchCoursesStudentGroupsResponse,
  PatchCoursesStudentGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchCoursesStudentGroupsRequest,
  output: PatchCoursesStudentGroupsResponse,
  errors: [],
}));

export interface CreateCoursesStudentGroupsRequest {
  /** Required. The identifier of the course. */
  courseId: string;
  /** Request body */
  body?: StudentGroup;
}

export const CreateCoursesStudentGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    body: Schema.optional(StudentGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/studentGroups",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesStudentGroupsRequest>;

export type CreateCoursesStudentGroupsResponse = StudentGroup;
export const CreateCoursesStudentGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ StudentGroup;

export type CreateCoursesStudentGroupsError = DefaultErrors;

/** Creates a student group for a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create the student group or for access errors. * `NOT_FOUND` if the course does not exist or the requesting user doesn't have access to the course. * `FAILED_PRECONDITION` if creating the student group would exceed the maximum number of student groups per course. */
export const createCoursesStudentGroups: API.OperationMethod<
  CreateCoursesStudentGroupsRequest,
  CreateCoursesStudentGroupsResponse,
  CreateCoursesStudentGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesStudentGroupsRequest,
  output: CreateCoursesStudentGroupsResponse,
  errors: [],
}));

export interface DeleteCoursesStudentGroupsRequest {
  /** Required. The identifier of the course containing the student group to delete. */
  courseId: string;
  /** Required. The identifier of the student group to delete. */
  id: string;
}

export const DeleteCoursesStudentGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/studentGroups/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesStudentGroupsRequest>;

export type DeleteCoursesStudentGroupsResponse = Empty;
export const DeleteCoursesStudentGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesStudentGroupsError = DefaultErrors;

/** Deletes a student group. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested student group or for access errors. * `NOT_FOUND` if the student group does not exist or the user does not have access to the student group. */
export const deleteCoursesStudentGroups: API.OperationMethod<
  DeleteCoursesStudentGroupsRequest,
  DeleteCoursesStudentGroupsResponse,
  DeleteCoursesStudentGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesStudentGroupsRequest,
  output: DeleteCoursesStudentGroupsResponse,
  errors: [],
}));

export interface ListCoursesStudentGroupsRequest {
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum, which is currently set to 75 items. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Required. The identifier of the course. */
  courseId: string;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesStudentGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/courses/{courseId}/studentGroups" }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesStudentGroupsRequest>;

export type ListCoursesStudentGroupsResponse = ListStudentGroupsResponse;
export const ListCoursesStudentGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListStudentGroupsResponse;

export type ListCoursesStudentGroupsError = DefaultErrors;

/** Returns a list of groups in a course. This method returns the following error codes: * `NOT_FOUND` if the course does not exist. */
export const listCoursesStudentGroups: API.PaginatedOperationMethod<
  ListCoursesStudentGroupsRequest,
  ListCoursesStudentGroupsResponse,
  ListCoursesStudentGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesStudentGroupsRequest,
  output: ListCoursesStudentGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCoursesStudentGroupsStudentGroupMembersRequest {
  /** Required. The identifier of the course. */
  courseId: string;
  /** Required. The identifier of the student group. */
  studentGroupId: string;
  /** Request body */
  body?: StudentGroupMember;
}

export const CreateCoursesStudentGroupsStudentGroupMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    studentGroupId: Schema.String.pipe(T.HttpPath("studentGroupId")),
    body: Schema.optional(StudentGroupMember).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/courses/{courseId}/studentGroups/{studentGroupId}/studentGroupMembers",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateCoursesStudentGroupsStudentGroupMembersRequest>;

export type CreateCoursesStudentGroupsStudentGroupMembersResponse =
  StudentGroupMember;
export const CreateCoursesStudentGroupsStudentGroupMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ StudentGroupMember;

export type CreateCoursesStudentGroupsStudentGroupMembersError = DefaultErrors;

/** Creates a student group member for a student group. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create the student group or member for access errors. * `NOT_FOUND` if the student group does not exist or the user does not have access to the student group. * `ALREADY_EXISTS` if the student group member already exists. * `FAILED_PRECONDITION` if attempting to add a member to a student group that has reached its member limit. */
export const createCoursesStudentGroupsStudentGroupMembers: API.OperationMethod<
  CreateCoursesStudentGroupsStudentGroupMembersRequest,
  CreateCoursesStudentGroupsStudentGroupMembersResponse,
  CreateCoursesStudentGroupsStudentGroupMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCoursesStudentGroupsStudentGroupMembersRequest,
  output: CreateCoursesStudentGroupsStudentGroupMembersResponse,
  errors: [],
}));

export interface DeleteCoursesStudentGroupsStudentGroupMembersRequest {
  /** Required. The identifier of the course containing the relevant student group. */
  courseId: string;
  /** Required. The identifier of the student group containing the student group member to delete. */
  studentGroupId: string;
  /** Required. The identifier of the student group member to delete. */
  userId: string;
}

export const DeleteCoursesStudentGroupsStudentGroupMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    studentGroupId: Schema.String.pipe(T.HttpPath("studentGroupId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/courses/{courseId}/studentGroups/{studentGroupId}/studentGroupMembers/{userId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCoursesStudentGroupsStudentGroupMembersRequest>;

export type DeleteCoursesStudentGroupsStudentGroupMembersResponse = Empty;
export const DeleteCoursesStudentGroupsStudentGroupMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCoursesStudentGroupsStudentGroupMembersError = DefaultErrors;

/** Deletes a student group member. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested student group member or for access errors. * `NOT_FOUND` if the student group member does not exist or the user does not have access to the student group. */
export const deleteCoursesStudentGroupsStudentGroupMembers: API.OperationMethod<
  DeleteCoursesStudentGroupsStudentGroupMembersRequest,
  DeleteCoursesStudentGroupsStudentGroupMembersResponse,
  DeleteCoursesStudentGroupsStudentGroupMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCoursesStudentGroupsStudentGroupMembersRequest,
  output: DeleteCoursesStudentGroupsStudentGroupMembersResponse,
  errors: [],
}));

export interface ListCoursesStudentGroupsStudentGroupMembersRequest {
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Required. The identifier of the course. */
  courseId: string;
  /** Required. The identifier of the student group. */
  studentGroupId: string;
}

export const ListCoursesStudentGroupsStudentGroupMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    courseId: Schema.String.pipe(T.HttpPath("courseId")),
    studentGroupId: Schema.String.pipe(T.HttpPath("studentGroupId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/courses/{courseId}/studentGroups/{studentGroupId}/studentGroupMembers",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCoursesStudentGroupsStudentGroupMembersRequest>;

export type ListCoursesStudentGroupsStudentGroupMembersResponse =
  ListStudentGroupMembersResponse;
export const ListCoursesStudentGroupsStudentGroupMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListStudentGroupMembersResponse;

export type ListCoursesStudentGroupsStudentGroupMembersError = DefaultErrors;

/** Returns a list of students in a group. This method returns the following error codes: * `NOT_FOUND` if the course or student group does not exist. */
export const listCoursesStudentGroupsStudentGroupMembers: API.PaginatedOperationMethod<
  ListCoursesStudentGroupsStudentGroupMembersRequest,
  ListCoursesStudentGroupsStudentGroupMembersResponse,
  ListCoursesStudentGroupsStudentGroupMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoursesStudentGroupsStudentGroupMembersRequest,
  output: ListCoursesStudentGroupsStudentGroupMembersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetUserProfilesRequest {
  /** Identifier of the profile to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const GetUserProfilesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    userId: Schema.String.pipe(T.HttpPath("userId")),
  },
).pipe(
  T.Http({ method: "GET", path: "v1/userProfiles/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetUserProfilesRequest>;

export type GetUserProfilesResponse = UserProfile;
export const GetUserProfilesResponse = /*@__PURE__*/ /*#__PURE__*/ UserProfile;

export type GetUserProfilesError = DefaultErrors;

/** Returns a user profile. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access this user profile, if no profile exists with the requested ID, or for access errors. */
export const getUserProfiles: API.OperationMethod<
  GetUserProfilesRequest,
  GetUserProfilesResponse,
  GetUserProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUserProfilesRequest,
  output: GetUserProfilesResponse,
  errors: [],
}));

export interface ListUserProfilesGuardianInvitationsRequest {
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** The ID of the student whose guardian invitations are to be returned. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for all students that the requesting user is permitted to view guardian invitations. */
  studentId: string;
  /** If specified, only results with the specified `state` values are returned. Otherwise, results with a `state` of `PENDING` are returned. */
  states?:
    | "GUARDIAN_INVITATION_STATE_UNSPECIFIED"
    | "PENDING"
    | "COMPLETE"
    | (string & {})[];
  /** If specified, only results with the specified `invited_email_address` are returned. */
  invitedEmailAddress?: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
}

export const ListUserProfilesGuardianInvitationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    studentId: Schema.String.pipe(T.HttpPath("studentId")),
    states: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("states"),
    ),
    invitedEmailAddress: Schema.optional(Schema.String).pipe(
      T.HttpQuery("invitedEmailAddress"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/userProfiles/{studentId}/guardianInvitations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListUserProfilesGuardianInvitationsRequest>;

export type ListUserProfilesGuardianInvitationsResponse =
  ListGuardianInvitationsResponse;
export const ListUserProfilesGuardianInvitationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListGuardianInvitationsResponse;

export type ListUserProfilesGuardianInvitationsError = DefaultErrors;

/** Returns a list of guardian invitations that the requesting user is permitted to view, filtered by the parameters provided. This method returns the following error codes: * `PERMISSION_DENIED` if a `student_id` is specified, and the requesting user is not permitted to view guardian invitations for that student, if `"-"` is specified as the `student_id` and the user is not a domain administrator, if guardians are not enabled for the domain in question, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API, nor the literal string `me`). May also be returned if an invalid `page_token` or `state` is provided. * `NOT_FOUND` if a `student_id` is specified, and its format can be recognized, but Classroom has no record of that student. */
export const listUserProfilesGuardianInvitations: API.PaginatedOperationMethod<
  ListUserProfilesGuardianInvitationsRequest,
  ListUserProfilesGuardianInvitationsResponse,
  ListUserProfilesGuardianInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUserProfilesGuardianInvitationsRequest,
  output: ListUserProfilesGuardianInvitationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateUserProfilesGuardianInvitationsRequest {
  /** ID of the student (in standard format) */
  studentId: string;
  /** Request body */
  body?: GuardianInvitation;
}

export const CreateUserProfilesGuardianInvitationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    studentId: Schema.String.pipe(T.HttpPath("studentId")),
    body: Schema.optional(GuardianInvitation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/userProfiles/{studentId}/guardianInvitations",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUserProfilesGuardianInvitationsRequest>;

export type CreateUserProfilesGuardianInvitationsResponse = GuardianInvitation;
export const CreateUserProfilesGuardianInvitationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GuardianInvitation;

export type CreateUserProfilesGuardianInvitationsError = DefaultErrors;

/** Creates a guardian invitation, and sends an email to the guardian asking them to confirm that they are the student's guardian. Once the guardian accepts the invitation, their `state` will change to `COMPLETED` and they will start receiving guardian notifications. A `Guardian` resource will also be created to represent the active guardian. The request object must have the `student_id` and `invited_email_address` fields set. Failing to set these fields, or setting any other fields in the request, will result in an error. This method returns the following error codes: * `PERMISSION_DENIED` if the current user does not have permission to manage guardians, if the guardian in question has already rejected too many requests for that student, if guardians are not enabled for the domain in question, or for other access errors. * `RESOURCE_EXHAUSTED` if the student or guardian has exceeded the guardian link limit. * `INVALID_ARGUMENT` if the guardian email address is not valid (for example, if it is too long), or if the format of the student ID provided cannot be recognized (it is not an email address, nor a `user_id` from this API). This error will also be returned if read-only fields are set, or if the `state` field is set to to a value other than `PENDING`. * `NOT_FOUND` if the student ID provided is a valid student ID, but Classroom has no record of that student. * `ALREADY_EXISTS` if there is already a pending guardian invitation for the student and `invited_email_address` provided, or if the provided `invited_email_address` matches the Google account of an existing `Guardian` for this user. */
export const createUserProfilesGuardianInvitations: API.OperationMethod<
  CreateUserProfilesGuardianInvitationsRequest,
  CreateUserProfilesGuardianInvitationsResponse,
  CreateUserProfilesGuardianInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUserProfilesGuardianInvitationsRequest,
  output: CreateUserProfilesGuardianInvitationsResponse,
  errors: [],
}));

export interface GetUserProfilesGuardianInvitationsRequest {
  /** The ID of the student whose guardian invitation is being requested. */
  studentId: string;
  /** The `id` field of the `GuardianInvitation` being requested. */
  invitationId: string;
}

export const GetUserProfilesGuardianInvitationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    studentId: Schema.String.pipe(T.HttpPath("studentId")),
    invitationId: Schema.String.pipe(T.HttpPath("invitationId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/userProfiles/{studentId}/guardianInvitations/{invitationId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUserProfilesGuardianInvitationsRequest>;

export type GetUserProfilesGuardianInvitationsResponse = GuardianInvitation;
export const GetUserProfilesGuardianInvitationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GuardianInvitation;

export type GetUserProfilesGuardianInvitationsError = DefaultErrors;

/** Returns a specific guardian invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to view guardian invitations for the student identified by the `student_id`, if guardians are not enabled for the domain in question, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API, nor the literal string `me`). * `NOT_FOUND` if Classroom cannot find any record of the given student or `invitation_id`. May also be returned if the student exists, but the requesting user does not have access to see that student. */
export const getUserProfilesGuardianInvitations: API.OperationMethod<
  GetUserProfilesGuardianInvitationsRequest,
  GetUserProfilesGuardianInvitationsResponse,
  GetUserProfilesGuardianInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUserProfilesGuardianInvitationsRequest,
  output: GetUserProfilesGuardianInvitationsResponse,
  errors: [],
}));

export interface PatchUserProfilesGuardianInvitationsRequest {
  /** The ID of the student whose guardian invitation is to be modified. */
  studentId: string;
  /** The `id` field of the `GuardianInvitation` to be modified. */
  invitationId: string;
  /** Mask that identifies which fields on the course to update. This field is required to do an update. The update fails if invalid fields are specified. The following fields are valid: * `state` When set in a query parameter, this field should be specified as `updateMask=,,...` */
  updateMask?: string;
  /** Request body */
  body?: GuardianInvitation;
}

export const PatchUserProfilesGuardianInvitationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    studentId: Schema.String.pipe(T.HttpPath("studentId")),
    invitationId: Schema.String.pipe(T.HttpPath("invitationId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GuardianInvitation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/userProfiles/{studentId}/guardianInvitations/{invitationId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchUserProfilesGuardianInvitationsRequest>;

export type PatchUserProfilesGuardianInvitationsResponse = GuardianInvitation;
export const PatchUserProfilesGuardianInvitationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GuardianInvitation;

export type PatchUserProfilesGuardianInvitationsError = DefaultErrors;

/** Modifies a guardian invitation. Currently, the only valid modification is to change the `state` from `PENDING` to `COMPLETE`. This has the effect of withdrawing the invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the current user does not have permission to manage guardians, if guardians are not enabled for the domain in question or for other access errors. * `FAILED_PRECONDITION` if the guardian link is not in the `PENDING` state. * `INVALID_ARGUMENT` if the format of the student ID provided cannot be recognized (it is not an email address, nor a `user_id` from this API), or if the passed `GuardianInvitation` has a `state` other than `COMPLETE`, or if it modifies fields other than `state`. * `NOT_FOUND` if the student ID provided is a valid student ID, but Classroom has no record of that student, or if the `id` field does not refer to a guardian invitation known to Classroom. */
export const patchUserProfilesGuardianInvitations: API.OperationMethod<
  PatchUserProfilesGuardianInvitationsRequest,
  PatchUserProfilesGuardianInvitationsResponse,
  PatchUserProfilesGuardianInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchUserProfilesGuardianInvitationsRequest,
  output: PatchUserProfilesGuardianInvitationsResponse,
  errors: [],
}));

export interface ListUserProfilesGuardiansRequest {
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Filter results by the student who the guardian is linked to. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for all students that the requesting user has access to view. */
  studentId: string;
  /** Filter results by the email address that the original invitation was sent to, resulting in this guardian link. This filter can only be used by domain administrators. */
  invitedEmailAddress?: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
}

export const ListUserProfilesGuardiansRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    studentId: Schema.String.pipe(T.HttpPath("studentId")),
    invitedEmailAddress: Schema.optional(Schema.String).pipe(
      T.HttpQuery("invitedEmailAddress"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/userProfiles/{studentId}/guardians" }),
    svc,
  ) as unknown as Schema.Schema<ListUserProfilesGuardiansRequest>;

export type ListUserProfilesGuardiansResponse = ListGuardiansResponse;
export const ListUserProfilesGuardiansResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListGuardiansResponse;

export type ListUserProfilesGuardiansError = DefaultErrors;

/** Returns a list of guardians that the requesting user is permitted to view, restricted to those that match the request. To list guardians for any student that the requesting user may view guardians for, use the literal character `-` for the student ID. This method returns the following error codes: * `PERMISSION_DENIED` if a `student_id` is specified, and the requesting user is not permitted to view guardian information for that student, if `"-"` is specified as the `student_id` and the user is not a domain administrator, if guardians are not enabled for the domain in question, if the `invited_email_address` filter is set by a user who is not a domain administrator, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API, nor the literal string `me`). May also be returned if an invalid `page_token` is provided. * `NOT_FOUND` if a `student_id` is specified, and its format can be recognized, but Classroom has no record of that student. */
export const listUserProfilesGuardians: API.PaginatedOperationMethod<
  ListUserProfilesGuardiansRequest,
  ListUserProfilesGuardiansResponse,
  ListUserProfilesGuardiansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUserProfilesGuardiansRequest,
  output: ListUserProfilesGuardiansResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetUserProfilesGuardiansRequest {
  /** The student whose guardian is being requested. One of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  studentId: string;
  /** The `id` field from a `Guardian`. */
  guardianId: string;
}

export const GetUserProfilesGuardiansRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    studentId: Schema.String.pipe(T.HttpPath("studentId")),
    guardianId: Schema.String.pipe(T.HttpPath("guardianId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/userProfiles/{studentId}/guardians/{guardianId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUserProfilesGuardiansRequest>;

export type GetUserProfilesGuardiansResponse = Guardian;
export const GetUserProfilesGuardiansResponse =
  /*@__PURE__*/ /*#__PURE__*/ Guardian;

export type GetUserProfilesGuardiansError = DefaultErrors;

/** Returns a specific guardian. This method returns the following error codes: * `PERMISSION_DENIED` if no user that matches the provided `student_id` is visible to the requesting user, if the requesting user is not permitted to view guardian information for the student identified by the `student_id`, if guardians are not enabled for the domain in question, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API, nor the literal string `me`). * `NOT_FOUND` if the requesting user is permitted to view guardians for the requested `student_id`, but no `Guardian` record exists for that student that matches the provided `guardian_id`. */
export const getUserProfilesGuardians: API.OperationMethod<
  GetUserProfilesGuardiansRequest,
  GetUserProfilesGuardiansResponse,
  GetUserProfilesGuardiansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUserProfilesGuardiansRequest,
  output: GetUserProfilesGuardiansResponse,
  errors: [],
}));

export interface DeleteUserProfilesGuardiansRequest {
  /** The student whose guardian is to be deleted. One of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  studentId: string;
  /** The `id` field from a `Guardian`. */
  guardianId: string;
}

export const DeleteUserProfilesGuardiansRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    studentId: Schema.String.pipe(T.HttpPath("studentId")),
    guardianId: Schema.String.pipe(T.HttpPath("guardianId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/userProfiles/{studentId}/guardians/{guardianId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUserProfilesGuardiansRequest>;

export type DeleteUserProfilesGuardiansResponse = Empty;
export const DeleteUserProfilesGuardiansResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteUserProfilesGuardiansError = DefaultErrors;

/** Deletes a guardian. The guardian will no longer receive guardian notifications and the guardian will no longer be accessible via the API. This method returns the following error codes: * `PERMISSION_DENIED` if no user that matches the provided `student_id` is visible to the requesting user, if the requesting user is not permitted to manage guardians for the student identified by the `student_id`, if guardians are not enabled for the domain in question, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API). * `NOT_FOUND` if the requesting user is permitted to modify guardians for the requested `student_id`, but no `Guardian` record exists for that student with the provided `guardian_id`. */
export const deleteUserProfilesGuardians: API.OperationMethod<
  DeleteUserProfilesGuardiansRequest,
  DeleteUserProfilesGuardiansResponse,
  DeleteUserProfilesGuardiansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUserProfilesGuardiansRequest,
  output: DeleteUserProfilesGuardiansResponse,
  errors: [],
}));

export interface AcceptInvitationsRequest {
  /** Identifier of the invitation to accept. */
  id: string;
}

export const AcceptInvitationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/invitations/{id}:accept",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AcceptInvitationsRequest>;

export type AcceptInvitationsResponse = Empty;
export const AcceptInvitationsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type AcceptInvitationsError = DefaultErrors;

/** Accepts an invitation, removing it and adding the invited user to the teachers or students (as appropriate) of the specified course. Only the invited user may accept an invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to accept the requested invitation or for access errors. * `FAILED_PRECONDITION` for the following request errors: * CourseMemberLimitReached * CourseNotModifiable * CourseTeacherLimitReached * UserGroupsMembershipLimitReached * `NOT_FOUND` if no invitation exists with the requested ID. */
export const acceptInvitations: API.OperationMethod<
  AcceptInvitationsRequest,
  AcceptInvitationsResponse,
  AcceptInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcceptInvitationsRequest,
  output: AcceptInvitationsResponse,
  errors: [],
}));

export interface CreateInvitationsRequest {
  /** Request body */
  body?: Invitation;
}

export const CreateInvitationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(Invitation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v1/invitations", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateInvitationsRequest>;

export type CreateInvitationsResponse = Invitation;
export const CreateInvitationsResponse = /*@__PURE__*/ /*#__PURE__*/ Invitation;

export type CreateInvitationsError = DefaultErrors;

/** Creates an invitation. Only one invitation for a user and course may exist at a time. Delete and re-create an invitation to make changes. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create invitations for this course or for access errors. * `NOT_FOUND` if the course or the user does not exist. * `FAILED_PRECONDITION`: * if the requested user's account is disabled. * if the user already has this role or a role with greater permissions. * for the following request errors: * IneligibleOwner * `ALREADY_EXISTS` if an invitation for the specified user and course already exists. */
export const createInvitations: API.OperationMethod<
  CreateInvitationsRequest,
  CreateInvitationsResponse,
  CreateInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInvitationsRequest,
  output: CreateInvitationsResponse,
  errors: [],
}));

export interface ListInvitationsRequest {
  /** Maximum number of items to return. The default is 500 if unspecified or `0`. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** Restricts returned invitations to those for a specific user. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Restricts returned invitations to those for a course with the specified identifier. */
  courseId?: string;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListInvitationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    userId: Schema.optional(Schema.String).pipe(T.HttpQuery("userId")),
    courseId: Schema.optional(Schema.String).pipe(T.HttpQuery("courseId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({ method: "GET", path: "v1/invitations" }),
  svc,
) as unknown as Schema.Schema<ListInvitationsRequest>;

export type ListInvitationsResponse_Op = ListInvitationsResponse;
export const ListInvitationsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListInvitationsResponse;

export type ListInvitationsError = DefaultErrors;

/** Returns a list of invitations that the requesting user is permitted to view, restricted to those that match the list request. *Note:* At least one of `user_id` or `course_id` must be supplied. Both fields can be supplied. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsRequest,
  ListInvitationsResponse_Op,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInvitationsRequest,
  output: ListInvitationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteInvitationsRequest {
  /** Identifier of the invitation to delete. */
  id: string;
}

export const DeleteInvitationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v1/invitations/{id}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteInvitationsRequest>;

export type DeleteInvitationsResponse = Empty;
export const DeleteInvitationsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteInvitationsError = DefaultErrors;

/** Deletes an invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested invitation or for access errors. * `NOT_FOUND` if no invitation exists with the requested ID. */
export const deleteInvitations: API.OperationMethod<
  DeleteInvitationsRequest,
  DeleteInvitationsResponse,
  DeleteInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInvitationsRequest,
  output: DeleteInvitationsResponse,
  errors: [],
}));

export interface GetInvitationsRequest {
  /** Identifier of the invitation to return. */
  id: string;
}

export const GetInvitationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/invitations/{id}" }),
  svc,
) as unknown as Schema.Schema<GetInvitationsRequest>;

export type GetInvitationsResponse = Invitation;
export const GetInvitationsResponse = /*@__PURE__*/ /*#__PURE__*/ Invitation;

export type GetInvitationsError = DefaultErrors;

/** Returns an invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to view the requested invitation or for access errors. * `NOT_FOUND` if no invitation exists with the requested ID. */
export const getInvitations: API.OperationMethod<
  GetInvitationsRequest,
  GetInvitationsResponse,
  GetInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInvitationsRequest,
  output: GetInvitationsResponse,
  errors: [],
}));
