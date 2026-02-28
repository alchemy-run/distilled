// ==========================================================================
// Google Classroom API (classroom v1)
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
  /** Title of the Drive folder. Read-only. */
  title?: string;
  /** URL that can be used to access the Drive folder. Read-only. */
  alternateLink?: string;
}

export const DriveFolder: Schema.Schema<DriveFolder> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  alternateLink: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveFolder" }) as any as Schema.Schema<DriveFolder>;

export interface DriveFile {
  /** Drive API resource ID. */
  id?: string;
  /** Title of the Drive item. Read-only. */
  title?: string;
  /** URL that can be used to access the Drive item. Read-only. */
  alternateLink?: string;
  /** URL of a thumbnail image of the Drive item. Read-only. */
  thumbnailUrl?: string;
}

export const DriveFile: Schema.Schema<DriveFile> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  alternateLink: Schema.optional(Schema.String),
  thumbnailUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveFile" }) as any as Schema.Schema<DriveFile>;

export interface YouTubeVideo {
  /** YouTube API resource ID. */
  id?: string;
  /** Title of the YouTube video. Read-only. */
  title?: string;
  /** URL that can be used to view the YouTube video. Read-only. */
  alternateLink?: string;
  /** URL of a thumbnail image of the YouTube video. Read-only. */
  thumbnailUrl?: string;
}

export const YouTubeVideo: Schema.Schema<YouTubeVideo> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  alternateLink: Schema.optional(Schema.String),
  thumbnailUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "YouTubeVideo" }) as any as Schema.Schema<YouTubeVideo>;

export interface Link {
  /** URL to link to. This must be a valid UTF-8 string containing between 1 and 2024 characters. */
  url?: string;
  /** Title of the target of the URL. Read-only. */
  title?: string;
  /** URL of a thumbnail image of the target URL. Read-only. */
  thumbnailUrl?: string;
}

export const Link: Schema.Schema<Link> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  thumbnailUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface Form {
  /** URL of the form. */
  formUrl?: string;
  /** URL of the form responses document. Only set if responses have been recorded and only when the requesting user is an editor of the form. Read-only. */
  responseUrl?: string;
  /** Title of the Form. Read-only. */
  title?: string;
  /** URL of a thumbnail image of the Form. Read-only. */
  thumbnailUrl?: string;
}

export const Form: Schema.Schema<Form> = Schema.suspend(() => Schema.Struct({
  formUrl: Schema.optional(Schema.String),
  responseUrl: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  thumbnailUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Form" }) as any as Schema.Schema<Form>;

export interface CourseMaterial {
  /** Google Drive file attachment. */
  driveFile?: DriveFile;
  /** Youtube video attachment. */
  youTubeVideo?: YouTubeVideo;
  /** Link atatchment. */
  link?: Link;
  /** Google Forms attachment. */
  form?: Form;
}

export const CourseMaterial: Schema.Schema<CourseMaterial> = Schema.suspend(() => Schema.Struct({
  driveFile: Schema.optional(DriveFile),
  youTubeVideo: Schema.optional(YouTubeVideo),
  link: Schema.optional(Link),
  form: Schema.optional(Form),
})).annotate({ identifier: "CourseMaterial" }) as any as Schema.Schema<CourseMaterial>;

export interface CourseMaterialSet {
  /** Title for this set. */
  title?: string;
  /** Materials attached to this set. */
  materials?: Array<CourseMaterial>;
}

export const CourseMaterialSet: Schema.Schema<CourseMaterialSet> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  materials: Schema.optional(Schema.Array(CourseMaterial)),
})).annotate({ identifier: "CourseMaterialSet" }) as any as Schema.Schema<CourseMaterialSet>;

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

export const GradeCategory: Schema.Schema<GradeCategory> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  weight: Schema.optional(Schema.Number),
  defaultGradeDenominator: Schema.optional(Schema.Number),
})).annotate({ identifier: "GradeCategory" }) as any as Schema.Schema<GradeCategory>;

export interface GradebookSettings {
  /** Indicates how the overall grade is calculated. */
  calculationType?: "CALCULATION_TYPE_UNSPECIFIED" | "TOTAL_POINTS" | "WEIGHTED_CATEGORIES" | (string & {});
  /** Indicates who can see the overall grade.. */
  displaySetting?: "DISPLAY_SETTING_UNSPECIFIED" | "SHOW_OVERALL_GRADE" | "HIDE_OVERALL_GRADE" | "SHOW_TEACHERS_ONLY" | (string & {});
  /** Grade categories that are available for coursework in the course. */
  gradeCategories?: Array<GradeCategory>;
}

export const GradebookSettings: Schema.Schema<GradebookSettings> = Schema.suspend(() => Schema.Struct({
  calculationType: Schema.optional(Schema.String),
  displaySetting: Schema.optional(Schema.String),
  gradeCategories: Schema.optional(Schema.Array(GradeCategory)),
})).annotate({ identifier: "GradebookSettings" }) as any as Schema.Schema<GradebookSettings>;

export interface Course {
  /** Identifier for this course assigned by Classroom. When creating a course, you may optionally set this identifier to an alias string in the request to create a corresponding alias. The `id` is still assigned by Classroom and cannot be updated after the course is created. Specifying this field in a course update mask results in an error. */
  id?: string;
  /** Name of the course. For example, "10th Grade Biology". The name is required. It must be between 1 and 750 characters and a valid UTF-8 string. */
  name?: string;
  /** Section of the course. For example, "Period 2". If set, this field must be a valid UTF-8 string and no longer than 2800 characters. */
  section?: string;
  /** Optional heading for the description. For example, "Welcome to 10th Grade Biology." If set, this field must be a valid UTF-8 string and no longer than 3600 characters. */
  descriptionHeading?: string;
  /** Optional description. For example, "We'll be learning about the structure of living creatures from a combination of textbooks, guest lectures, and lab work. Expect to be excited!" If set, this field must be a valid UTF-8 string and no longer than 30,000 characters. */
  description?: string;
  /** Optional room location. For example, "301". If set, this field must be a valid UTF-8 string and no longer than 650 characters. */
  room?: string;
  /** The identifier of the owner of a course. When specified as a parameter of a create course request, this field is required. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user This must be set in a create request. Admins can also specify this field in a patch course request to transfer ownership. In other contexts, it is read-only. */
  ownerId?: string;
  /** Creation time of the course. Specifying this field in a course update mask results in an error. Read-only. */
  creationTime?: string;
  /** Time of the most recent update to this course. Specifying this field in a course update mask results in an error. Read-only. */
  updateTime?: string;
  /** Enrollment code to use when joining this course. Specifying this field in a course update mask results in an error. Read-only. */
  enrollmentCode?: string;
  /** State of the course. If unspecified, the default state is `PROVISIONED`. */
  courseState?: "COURSE_STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "PROVISIONED" | "DECLINED" | "SUSPENDED" | (string & {});
  /** Absolute link to this course in the Classroom web UI. Read-only. */
  alternateLink?: string;
  /** The email address of a Google group containing all teachers of the course. This group does not accept email and can only be used for permissions. Read-only. */
  teacherGroupEmail?: string;
  /** The email address of a Google group containing all members of the course. This group does not accept email and can only be used for permissions. Read-only. */
  courseGroupEmail?: string;
  /** Information about a Drive Folder that is shared with all teachers of the course. This field will only be set for teachers of the course and domain administrators. Read-only. */
  teacherFolder?: DriveFolder;
  /** Sets of materials that appear on the "about" page of this course. Read-only. */
  courseMaterialSets?: Array<CourseMaterialSet>;
  /** Whether or not guardian notifications are enabled for this course. Read-only. */
  guardiansEnabled?: boolean;
  /** The Calendar ID for a calendar that all course members can see, to which Classroom adds events for course work and announcements in the course. The Calendar for a course is created asynchronously when the course is set to `CourseState.ACTIVE` for the first time (at creation time or when it is updated to `ACTIVE` through the UI or the API). The Calendar ID will not be populated until the creation process is completed. Read-only. */
  calendarId?: string;
  /** The gradebook settings that specify how a student's overall grade for the course will be calculated and who it will be displayed to. Read-only. */
  gradebookSettings?: GradebookSettings;
  /** Optional. The subject of the course. */
  subject?: string;
}

export const Course: Schema.Schema<Course> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  section: Schema.optional(Schema.String),
  descriptionHeading: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  room: Schema.optional(Schema.String),
  ownerId: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  enrollmentCode: Schema.optional(Schema.String),
  courseState: Schema.optional(Schema.String),
  alternateLink: Schema.optional(Schema.String),
  teacherGroupEmail: Schema.optional(Schema.String),
  courseGroupEmail: Schema.optional(Schema.String),
  teacherFolder: Schema.optional(DriveFolder),
  courseMaterialSets: Schema.optional(Schema.Array(CourseMaterialSet)),
  guardiansEnabled: Schema.optional(Schema.Boolean),
  calendarId: Schema.optional(Schema.String),
  gradebookSettings: Schema.optional(GradebookSettings),
  subject: Schema.optional(Schema.String),
})).annotate({ identifier: "Course" }) as any as Schema.Schema<Course>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListCoursesResponse {
  /** Courses that match the list request. */
  courses?: Array<Course>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListCoursesResponse: Schema.Schema<ListCoursesResponse> = Schema.suspend(() => Schema.Struct({
  courses: Schema.optional(Schema.Array(Course)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCoursesResponse" }) as any as Schema.Schema<ListCoursesResponse>;

export interface StudentGroup {
  /** The identifier of the course. */
  courseId?: string;
  /** The identifier of the student group. */
  id?: string;
  /** The title of the student group. */
  title?: string;
}

export const StudentGroup: Schema.Schema<StudentGroup> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "StudentGroup" }) as any as Schema.Schema<StudentGroup>;

export interface ListStudentGroupsResponse {
  /** The student groups. */
  studentGroups?: Array<StudentGroup>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListStudentGroupsResponse: Schema.Schema<ListStudentGroupsResponse> = Schema.suspend(() => Schema.Struct({
  studentGroups: Schema.optional(Schema.Array(StudentGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListStudentGroupsResponse" }) as any as Schema.Schema<ListStudentGroupsResponse>;

export interface StudentGroupMember {
  /** The identifier of the course. */
  courseId?: string;
  /** The identifier of the student group. */
  studentGroupId?: string;
  /** Identifier of the student. */
  userId?: string;
}

export const StudentGroupMember: Schema.Schema<StudentGroupMember> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  studentGroupId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "StudentGroupMember" }) as any as Schema.Schema<StudentGroupMember>;

export interface ListStudentGroupMembersResponse {
  /** The student group members. */
  studentGroupMembers?: Array<StudentGroupMember>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListStudentGroupMembersResponse: Schema.Schema<ListStudentGroupMembersResponse> = Schema.suspend(() => Schema.Struct({
  studentGroupMembers: Schema.optional(Schema.Array(StudentGroupMember)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListStudentGroupMembersResponse" }) as any as Schema.Schema<ListStudentGroupMembersResponse>;

export interface CourseAlias {
  /** Alias string. The format of the string indicates the desired alias scoping. * `d:` indicates a domain-scoped alias. Example: `d:math_101` * `p:` indicates a project-scoped alias. Example: `p:abc123` This field has a maximum length of 256 characters. */
  alias?: string;
}

export const CourseAlias: Schema.Schema<CourseAlias> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
})).annotate({ identifier: "CourseAlias" }) as any as Schema.Schema<CourseAlias>;

export interface ListCourseAliasesResponse {
  /** The course aliases. */
  aliases?: Array<CourseAlias>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListCourseAliasesResponse: Schema.Schema<ListCourseAliasesResponse> = Schema.suspend(() => Schema.Struct({
  aliases: Schema.optional(Schema.Array(CourseAlias)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCourseAliasesResponse" }) as any as Schema.Schema<ListCourseAliasesResponse>;

export interface Classroom_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Classroom_Date: Schema.Schema<Classroom_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Classroom_Date" }) as any as Schema.Schema<Classroom_Date>;

export interface GradingPeriod {
  /** Output only. System generated grading period ID. Read-only. */
  id?: string;
  /** Required. Title of the grading period. For example, “Semester 1”. */
  title?: string;
  /** Required. Start date, in UTC, of the grading period. Inclusive. */
  startDate?: Classroom_Date;
  /** Required. End date, in UTC, of the grading period. Inclusive. */
  endDate?: Classroom_Date;
}

export const GradingPeriod: Schema.Schema<GradingPeriod> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  startDate: Schema.optional(Classroom_Date),
  endDate: Schema.optional(Classroom_Date),
})).annotate({ identifier: "GradingPeriod" }) as any as Schema.Schema<GradingPeriod>;

export interface GradingPeriodSettings {
  /** The list of grading periods in a specific course. Grading periods must not have overlapping date ranges and must be listed in chronological order. Each grading period must have a unique title within a course. */
  gradingPeriods?: Array<GradingPeriod>;
  /** Supports toggling the application of grading periods on existing stream items. Once set, this value is persisted meaning that it does not need to be set in every request to update `GradingPeriodSettings`. If not previously set, the default is False. */
  applyToExistingCoursework?: boolean;
}

export const GradingPeriodSettings: Schema.Schema<GradingPeriodSettings> = Schema.suspend(() => Schema.Struct({
  gradingPeriods: Schema.optional(Schema.Array(GradingPeriod)),
  applyToExistingCoursework: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GradingPeriodSettings" }) as any as Schema.Schema<GradingPeriodSettings>;

export interface SharedDriveFile {
  /** Drive file details. */
  driveFile?: DriveFile;
  /** Mechanism by which students access the Drive item. */
  shareMode?: "UNKNOWN_SHARE_MODE" | "VIEW" | "EDIT" | "STUDENT_COPY" | (string & {});
}

export const SharedDriveFile: Schema.Schema<SharedDriveFile> = Schema.suspend(() => Schema.Struct({
  driveFile: Schema.optional(DriveFile),
  shareMode: Schema.optional(Schema.String),
})).annotate({ identifier: "SharedDriveFile" }) as any as Schema.Schema<SharedDriveFile>;

export interface GeminiGem {
  /** Gems resource id. */
  id?: string;
  /** Title of the Gem. */
  title?: string;
  /** URL that can be used to access the Gem. */
  url?: string;
}

export const GeminiGem: Schema.Schema<GeminiGem> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GeminiGem" }) as any as Schema.Schema<GeminiGem>;

export interface NotebookLmNotebook {
  /** Notebook resource id. */
  id?: string;
  /** Title of the Notebook. */
  title?: string;
  /** URL that can be used to access the Notebook. */
  url?: string;
}

export const NotebookLmNotebook: Schema.Schema<NotebookLmNotebook> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "NotebookLmNotebook" }) as any as Schema.Schema<NotebookLmNotebook>;

export interface Material {
  /** Google Drive file material. */
  driveFile?: SharedDriveFile;
  /** YouTube video material. */
  youtubeVideo?: YouTubeVideo;
  /** Link material. On creation, this is upgraded to a more appropriate type if possible, and this is reflected in the response. */
  link?: Link;
  /** Google Forms material. Read-only. */
  form?: Form;
  /** Gemini Gem material. Read-only. */
  gem?: GeminiGem;
  /** NotebookLM Notebook material. Read-only. */
  notebook?: NotebookLmNotebook;
}

export const Material: Schema.Schema<Material> = Schema.suspend(() => Schema.Struct({
  driveFile: Schema.optional(SharedDriveFile),
  youtubeVideo: Schema.optional(YouTubeVideo),
  link: Schema.optional(Link),
  form: Schema.optional(Form),
  gem: Schema.optional(GeminiGem),
  notebook: Schema.optional(NotebookLmNotebook),
})).annotate({ identifier: "Material" }) as any as Schema.Schema<Material>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface IndividualStudentsOptions {
  /** Identifiers for the students that have access to the coursework/announcement. */
  studentIds?: Array<string>;
}

export const IndividualStudentsOptions: Schema.Schema<IndividualStudentsOptions> = Schema.suspend(() => Schema.Struct({
  studentIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IndividualStudentsOptions" }) as any as Schema.Schema<IndividualStudentsOptions>;

export interface Assignment {
  /** Drive folder where attachments from student submissions are placed. This is only populated for course teachers and administrators. */
  studentWorkFolder?: DriveFolder;
}

export const Assignment: Schema.Schema<Assignment> = Schema.suspend(() => Schema.Struct({
  studentWorkFolder: Schema.optional(DriveFolder),
})).annotate({ identifier: "Assignment" }) as any as Schema.Schema<Assignment>;

export interface MultipleChoiceQuestion {
  /** Possible choices. */
  choices?: Array<string>;
}

export const MultipleChoiceQuestion: Schema.Schema<MultipleChoiceQuestion> = Schema.suspend(() => Schema.Struct({
  choices: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MultipleChoiceQuestion" }) as any as Schema.Schema<MultipleChoiceQuestion>;

export interface CourseWork {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Classroom-assigned identifier of this course work, unique per course. Read-only. */
  id?: string;
  /** Title of this course work. The title must be a valid UTF-8 string containing between 1 and 3000 characters. */
  title?: string;
  /** Optional description of this course work. If set, the description must be a valid UTF-8 string containing no more than 30,000 characters. */
  description?: string;
  /** Additional materials. CourseWork must have no more than 20 material items. */
  materials?: Array<Material>;
  /** Status of this course work. If unspecified, the default state is `DRAFT`. */
  state?: "COURSE_WORK_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED" | (string & {});
  /** Absolute link to this course work in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only. */
  alternateLink?: string;
  /** Timestamp when this course work was created. Read-only. */
  creationTime?: string;
  /** Timestamp of the most recent change to this course work. Read-only. */
  updateTime?: string;
  /** Optional date, in UTC, that submissions for this course work are due. This must be specified if `due_time` is specified. */
  dueDate?: Classroom_Date;
  /** Optional time of day, in UTC, that submissions for this course work are due. This must be specified if `due_date` is specified. */
  dueTime?: TimeOfDay;
  /** Optional timestamp when this course work is scheduled to be published. */
  scheduledTime?: string;
  /** Maximum grade for this course work. If zero or unspecified, this assignment is considered ungraded. This must be a non-negative integer value. */
  maxPoints?: number;
  /** Type of this course work. The type is set when the course work is created and cannot be changed. */
  workType?: "COURSE_WORK_TYPE_UNSPECIFIED" | "ASSIGNMENT" | "SHORT_ANSWER_QUESTION" | "MULTIPLE_CHOICE_QUESTION" | (string & {});
  /** Whether this course work item is associated with the Developer Console project making the request. See CreateCourseWork for more details. Read-only. */
  associatedWithDeveloper?: boolean;
  /** Assignee mode of the coursework. If unspecified, the default value is `ALL_STUDENTS`. */
  assigneeMode?: "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS" | (string & {});
  /** Identifiers of students with access to the coursework. This field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in this field are assigned the coursework. */
  individualStudentsOptions?: IndividualStudentsOptions;
  /** Setting to determine when students are allowed to modify submissions. If unspecified, the default value is `MODIFIABLE_UNTIL_TURNED_IN`. */
  submissionModificationMode?: "SUBMISSION_MODIFICATION_MODE_UNSPECIFIED" | "MODIFIABLE_UNTIL_TURNED_IN" | "MODIFIABLE" | (string & {});
  /** Assignment details. This is populated only when `work_type` is `ASSIGNMENT`. Read-only. */
  assignment?: Assignment;
  /** Multiple choice question details. For read operations, this field is populated only when `work_type` is `MULTIPLE_CHOICE_QUESTION`. For write operations, this field must be specified when creating course work with a `work_type` of `MULTIPLE_CHOICE_QUESTION`, and it must not be set otherwise. */
  multipleChoiceQuestion?: MultipleChoiceQuestion;
  /** Identifier for the user that created the coursework. Read-only. */
  creatorUserId?: string;
  /** Identifier for the topic that this coursework is associated with. Must match an existing topic in the course. */
  topicId?: string;
  /** The category that this coursework's grade contributes to. Present only when a category has been chosen for the coursework. May be used in calculating the overall grade. Read-only. */
  gradeCategory?: GradeCategory;
  /** Identifier of the grading period associated with the coursework. * At creation, if unspecified, the grading period ID will be set based on the `dueDate` (or `scheduledTime` if no `dueDate` is set). * To indicate no association to any grading period, set this field to an empty string (""). * If specified, it must match an existing grading period ID in the course. */
  gradingPeriodId?: string;
}

export const CourseWork: Schema.Schema<CourseWork> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  materials: Schema.optional(Schema.Array(Material)),
  state: Schema.optional(Schema.String),
  alternateLink: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  dueDate: Schema.optional(Classroom_Date),
  dueTime: Schema.optional(TimeOfDay),
  scheduledTime: Schema.optional(Schema.String),
  maxPoints: Schema.optional(Schema.Number),
  workType: Schema.optional(Schema.String),
  associatedWithDeveloper: Schema.optional(Schema.Boolean),
  assigneeMode: Schema.optional(Schema.String),
  individualStudentsOptions: Schema.optional(IndividualStudentsOptions),
  submissionModificationMode: Schema.optional(Schema.String),
  assignment: Schema.optional(Assignment),
  multipleChoiceQuestion: Schema.optional(MultipleChoiceQuestion),
  creatorUserId: Schema.optional(Schema.String),
  topicId: Schema.optional(Schema.String),
  gradeCategory: Schema.optional(GradeCategory),
  gradingPeriodId: Schema.optional(Schema.String),
})).annotate({ identifier: "CourseWork" }) as any as Schema.Schema<CourseWork>;

export interface ListCourseWorkResponse {
  /** Course work items that match the request. */
  courseWork?: Array<CourseWork>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListCourseWorkResponse: Schema.Schema<ListCourseWorkResponse> = Schema.suspend(() => Schema.Struct({
  courseWork: Schema.optional(Schema.Array(CourseWork)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCourseWorkResponse" }) as any as Schema.Schema<ListCourseWorkResponse>;

export interface Announcement {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Classroom-assigned identifier of this announcement, unique per course. Read-only. */
  id?: string;
  /** Description of this announcement. The text must be a valid UTF-8 string containing no more than 30,000 characters. */
  text?: string;
  /** Additional materials. Announcements must have no more than 20 material items. */
  materials?: Array<Material>;
  /** Status of this announcement. If unspecified, the default state is `DRAFT`. */
  state?: "ANNOUNCEMENT_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED" | (string & {});
  /** Absolute link to this announcement in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only. */
  alternateLink?: string;
  /** Timestamp when this announcement was created. Read-only. */
  creationTime?: string;
  /** Timestamp of the most recent change to this announcement. Read-only. */
  updateTime?: string;
  /** Optional timestamp when this announcement is scheduled to be published. */
  scheduledTime?: string;
  /** Assignee mode of the announcement. If unspecified, the default value is `ALL_STUDENTS`. */
  assigneeMode?: "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS" | (string & {});
  /** Identifiers of students with access to the announcement. This field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in this field can see the announcement. */
  individualStudentsOptions?: IndividualStudentsOptions;
  /** Identifier for the user that created the announcement. Read-only. */
  creatorUserId?: string;
}

export const Announcement: Schema.Schema<Announcement> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  materials: Schema.optional(Schema.Array(Material)),
  state: Schema.optional(Schema.String),
  alternateLink: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  scheduledTime: Schema.optional(Schema.String),
  assigneeMode: Schema.optional(Schema.String),
  individualStudentsOptions: Schema.optional(IndividualStudentsOptions),
  creatorUserId: Schema.optional(Schema.String),
})).annotate({ identifier: "Announcement" }) as any as Schema.Schema<Announcement>;

export interface ListAnnouncementsResponse {
  /** Announcement items that match the request. */
  announcements?: Array<Announcement>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListAnnouncementsResponse: Schema.Schema<ListAnnouncementsResponse> = Schema.suspend(() => Schema.Struct({
  announcements: Schema.optional(Schema.Array(Announcement)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAnnouncementsResponse" }) as any as Schema.Schema<ListAnnouncementsResponse>;

export interface CourseWorkMaterial {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Classroom-assigned identifier of this course work material, unique per course. Read-only. */
  id?: string;
  /** Title of this course work material. The title must be a valid UTF-8 string containing between 1 and 3000 characters. */
  title?: string;
  /** Optional description of this course work material. The text must be a valid UTF-8 string containing no more than 30,000 characters. */
  description?: string;
  /** Additional materials. A course work material must have no more than 20 material items. */
  materials?: Array<Material>;
  /** Status of this course work material. If unspecified, the default state is `DRAFT`. */
  state?: "COURSEWORK_MATERIAL_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED" | (string & {});
  /** Absolute link to this course work material in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only. */
  alternateLink?: string;
  /** Timestamp when this course work material was created. Read-only. */
  creationTime?: string;
  /** Timestamp of the most recent change to this course work material. Read-only. */
  updateTime?: string;
  /** Optional timestamp when this course work material is scheduled to be published. */
  scheduledTime?: string;
  /** Assignee mode of the course work material. If unspecified, the default value is `ALL_STUDENTS`. */
  assigneeMode?: "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS" | (string & {});
  /** Identifiers of students with access to the course work material. This field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in this field can see the course work material. */
  individualStudentsOptions?: IndividualStudentsOptions;
  /** Identifier for the user that created the course work material. Read-only. */
  creatorUserId?: string;
  /** Identifier for the topic that this course work material is associated with. Must match an existing topic in the course. */
  topicId?: string;
}

export const CourseWorkMaterial: Schema.Schema<CourseWorkMaterial> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  materials: Schema.optional(Schema.Array(Material)),
  state: Schema.optional(Schema.String),
  alternateLink: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  scheduledTime: Schema.optional(Schema.String),
  assigneeMode: Schema.optional(Schema.String),
  individualStudentsOptions: Schema.optional(IndividualStudentsOptions),
  creatorUserId: Schema.optional(Schema.String),
  topicId: Schema.optional(Schema.String),
})).annotate({ identifier: "CourseWorkMaterial" }) as any as Schema.Schema<CourseWorkMaterial>;

export interface ListCourseWorkMaterialResponse {
  /** Course work material items that match the request. */
  courseWorkMaterial?: Array<CourseWorkMaterial>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListCourseWorkMaterialResponse: Schema.Schema<ListCourseWorkMaterialResponse> = Schema.suspend(() => Schema.Struct({
  courseWorkMaterial: Schema.optional(Schema.Array(CourseWorkMaterial)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCourseWorkMaterialResponse" }) as any as Schema.Schema<ListCourseWorkMaterialResponse>;

export interface RubricGrade {
  /** Optional. Criterion ID. */
  criterionId?: string;
  /** Optional. Optional level ID of the selected level. If empty, no level was selected. */
  levelId?: string;
  /** Optional. Optional points assigned for this criterion, typically based on the level. Levels might or might not have points. If unset, no points were set for this criterion. */
  points?: number;
}

export const RubricGrade: Schema.Schema<RubricGrade> = Schema.suspend(() => Schema.Struct({
  criterionId: Schema.optional(Schema.String),
  levelId: Schema.optional(Schema.String),
  points: Schema.optional(Schema.Number),
})).annotate({ identifier: "RubricGrade" }) as any as Schema.Schema<RubricGrade>;

export interface Attachment {
  /** Google Drive file attachment. */
  driveFile?: DriveFile;
  /** Youtube video attachment. */
  youTubeVideo?: YouTubeVideo;
  /** Link attachment. */
  link?: Link;
  /** Google Forms attachment. */
  form?: Form;
}

export const Attachment: Schema.Schema<Attachment> = Schema.suspend(() => Schema.Struct({
  driveFile: Schema.optional(DriveFile),
  youTubeVideo: Schema.optional(YouTubeVideo),
  link: Schema.optional(Link),
  form: Schema.optional(Form),
})).annotate({ identifier: "Attachment" }) as any as Schema.Schema<Attachment>;

export interface AssignmentSubmission {
  /** Attachments added by the student. Drive files that correspond to materials with a share mode of STUDENT_COPY may not exist yet if the student has not accessed the assignment in Classroom. Some attachment metadata is only populated if the requesting user has permission to access it. Identifier and alternate_link fields are always available, but others (for example, title) may not be. */
  attachments?: Array<Attachment>;
}

export const AssignmentSubmission: Schema.Schema<AssignmentSubmission> = Schema.suspend(() => Schema.Struct({
  attachments: Schema.optional(Schema.Array(Attachment)),
})).annotate({ identifier: "AssignmentSubmission" }) as any as Schema.Schema<AssignmentSubmission>;

export interface ShortAnswerSubmission {
  /** Student response to a short-answer question. */
  answer?: string;
}

export const ShortAnswerSubmission: Schema.Schema<ShortAnswerSubmission> = Schema.suspend(() => Schema.Struct({
  answer: Schema.optional(Schema.String),
})).annotate({ identifier: "ShortAnswerSubmission" }) as any as Schema.Schema<ShortAnswerSubmission>;

export interface MultipleChoiceSubmission {
  /** Student's select choice. */
  answer?: string;
}

export const MultipleChoiceSubmission: Schema.Schema<MultipleChoiceSubmission> = Schema.suspend(() => Schema.Struct({
  answer: Schema.optional(Schema.String),
})).annotate({ identifier: "MultipleChoiceSubmission" }) as any as Schema.Schema<MultipleChoiceSubmission>;

export interface StateHistory {
  /** The workflow pipeline stage. */
  state?: "STATE_UNSPECIFIED" | "CREATED" | "TURNED_IN" | "RETURNED" | "RECLAIMED_BY_STUDENT" | "STUDENT_EDITED_AFTER_TURN_IN" | (string & {});
  /** When the submission entered this state. */
  stateTimestamp?: string;
  /** The teacher or student who made the change. */
  actorUserId?: string;
}

export const StateHistory: Schema.Schema<StateHistory> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateTimestamp: Schema.optional(Schema.String),
  actorUserId: Schema.optional(Schema.String),
})).annotate({ identifier: "StateHistory" }) as any as Schema.Schema<StateHistory>;

export interface GradeHistory {
  /** The numerator of the grade at this time in the submission grade history. */
  pointsEarned?: number;
  /** The denominator of the grade at this time in the submission grade history. */
  maxPoints?: number;
  /** When the grade of the submission was changed. */
  gradeTimestamp?: string;
  /** The teacher who made the grade change. */
  actorUserId?: string;
  /** The type of grade change at this time in the submission grade history. */
  gradeChangeType?: "UNKNOWN_GRADE_CHANGE_TYPE" | "DRAFT_GRADE_POINTS_EARNED_CHANGE" | "ASSIGNED_GRADE_POINTS_EARNED_CHANGE" | "MAX_POINTS_CHANGE" | (string & {});
}

export const GradeHistory: Schema.Schema<GradeHistory> = Schema.suspend(() => Schema.Struct({
  pointsEarned: Schema.optional(Schema.Number),
  maxPoints: Schema.optional(Schema.Number),
  gradeTimestamp: Schema.optional(Schema.String),
  actorUserId: Schema.optional(Schema.String),
  gradeChangeType: Schema.optional(Schema.String),
})).annotate({ identifier: "GradeHistory" }) as any as Schema.Schema<GradeHistory>;

export interface SubmissionHistory {
  /** The state history information of the submission, if present. */
  stateHistory?: StateHistory;
  /** The grade history information of the submission, if present. */
  gradeHistory?: GradeHistory;
}

export const SubmissionHistory: Schema.Schema<SubmissionHistory> = Schema.suspend(() => Schema.Struct({
  stateHistory: Schema.optional(StateHistory),
  gradeHistory: Schema.optional(GradeHistory),
})).annotate({ identifier: "SubmissionHistory" }) as any as Schema.Schema<SubmissionHistory>;

export interface StudentSubmission {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Identifier for the course work this corresponds to. Read-only. */
  courseWorkId?: string;
  /** Classroom-assigned Identifier for the student submission. This is unique among submissions for the relevant course work. Read-only. */
  id?: string;
  /** Identifier for the student that owns this submission. Read-only. */
  userId?: string;
  /** Creation time of this submission. This may be unset if the student has not accessed this item. Read-only. */
  creationTime?: string;
  /** Last update time of this submission. This may be unset if the student has not accessed this item. Read-only. */
  updateTime?: string;
  /** State of this submission. Read-only. */
  state?: "SUBMISSION_STATE_UNSPECIFIED" | "NEW" | "CREATED" | "TURNED_IN" | "RETURNED" | "RECLAIMED_BY_STUDENT" | (string & {});
  /** Whether this submission is late. Read-only. */
  late?: boolean;
  /** Optional pending grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places. This is only visible to and modifiable by course teachers. */
  draftGrade?: number;
  /** Optional grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places. This may be modified only by course teachers. */
  assignedGrade?: number;
  /** Pending rubric grades based on the rubric's criteria. This map is empty if there is no rubric attached to this course work or if a rubric is attached, but no grades have been set on any criteria. Entries are only populated for grades that have been set. Key: The rubric's criterion ID. Read-only. */
  draftRubricGrades?: Record<string, RubricGrade>;
  /** Assigned rubric grades based on the rubric's Criteria. This map is empty if there is no rubric attached to this course work or if a rubric is attached, but no grades have been set on any Criteria. Entries are only populated for grades that have been set. Key: The rubric's criterion ID. Read-only. */
  assignedRubricGrades?: Record<string, RubricGrade>;
  /** Absolute link to the submission in the Classroom web UI. Read-only. */
  alternateLink?: string;
  /** Type of course work this submission is for. Read-only. */
  courseWorkType?: "COURSE_WORK_TYPE_UNSPECIFIED" | "ASSIGNMENT" | "SHORT_ANSWER_QUESTION" | "MULTIPLE_CHOICE_QUESTION" | (string & {});
  /** Whether this student submission is associated with the Developer Console project making the request. See CreateCourseWork for more details. Read-only. */
  associatedWithDeveloper?: boolean;
  /** Submission content when course_work_type is ASSIGNMENT. Students can modify this content using ModifyAttachments. */
  assignmentSubmission?: AssignmentSubmission;
  /** Submission content when course_work_type is SHORT_ANSWER_QUESTION. */
  shortAnswerSubmission?: ShortAnswerSubmission;
  /** Submission content when course_work_type is MULTIPLE_CHOICE_QUESTION. */
  multipleChoiceSubmission?: MultipleChoiceSubmission;
  /** The history of the submission (includes state and grade histories). Read-only. */
  submissionHistory?: Array<SubmissionHistory>;
}

export const StudentSubmission: Schema.Schema<StudentSubmission> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  courseWorkId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  late: Schema.optional(Schema.Boolean),
  draftGrade: Schema.optional(Schema.Number),
  assignedGrade: Schema.optional(Schema.Number),
  draftRubricGrades: Schema.optional(Schema.Record(Schema.String, RubricGrade)),
  assignedRubricGrades: Schema.optional(Schema.Record(Schema.String, RubricGrade)),
  alternateLink: Schema.optional(Schema.String),
  courseWorkType: Schema.optional(Schema.String),
  associatedWithDeveloper: Schema.optional(Schema.Boolean),
  assignmentSubmission: Schema.optional(AssignmentSubmission),
  shortAnswerSubmission: Schema.optional(ShortAnswerSubmission),
  multipleChoiceSubmission: Schema.optional(MultipleChoiceSubmission),
  submissionHistory: Schema.optional(Schema.Array(SubmissionHistory)),
})).annotate({ identifier: "StudentSubmission" }) as any as Schema.Schema<StudentSubmission>;

export interface ListStudentSubmissionsResponse {
  /** Student work that matches the request. */
  studentSubmissions?: Array<StudentSubmission>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListStudentSubmissionsResponse: Schema.Schema<ListStudentSubmissionsResponse> = Schema.suspend(() => Schema.Struct({
  studentSubmissions: Schema.optional(Schema.Array(StudentSubmission)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListStudentSubmissionsResponse" }) as any as Schema.Schema<ListStudentSubmissionsResponse>;

export interface TurnInStudentSubmissionRequest {
}

export const TurnInStudentSubmissionRequest: Schema.Schema<TurnInStudentSubmissionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TurnInStudentSubmissionRequest" }) as any as Schema.Schema<TurnInStudentSubmissionRequest>;

export interface ReclaimStudentSubmissionRequest {
}

export const ReclaimStudentSubmissionRequest: Schema.Schema<ReclaimStudentSubmissionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReclaimStudentSubmissionRequest" }) as any as Schema.Schema<ReclaimStudentSubmissionRequest>;

export interface ReturnStudentSubmissionRequest {
}

export const ReturnStudentSubmissionRequest: Schema.Schema<ReturnStudentSubmissionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReturnStudentSubmissionRequest" }) as any as Schema.Schema<ReturnStudentSubmissionRequest>;

export interface ModifyAttachmentsRequest {
  /** Attachments to add. A student submission may not have more than 20 attachments. Form attachments are not supported. */
  addAttachments?: Array<Attachment>;
}

export const ModifyAttachmentsRequest: Schema.Schema<ModifyAttachmentsRequest> = Schema.suspend(() => Schema.Struct({
  addAttachments: Schema.optional(Schema.Array(Attachment)),
})).annotate({ identifier: "ModifyAttachmentsRequest" }) as any as Schema.Schema<ModifyAttachmentsRequest>;

export interface ModifyIndividualStudentsOptions {
  /** IDs of students to be added as having access to this coursework/announcement. */
  addStudentIds?: Array<string>;
  /** IDs of students to be removed from having access to this coursework/announcement. */
  removeStudentIds?: Array<string>;
}

export const ModifyIndividualStudentsOptions: Schema.Schema<ModifyIndividualStudentsOptions> = Schema.suspend(() => Schema.Struct({
  addStudentIds: Schema.optional(Schema.Array(Schema.String)),
  removeStudentIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ModifyIndividualStudentsOptions" }) as any as Schema.Schema<ModifyIndividualStudentsOptions>;

export interface ModifyCourseWorkAssigneesRequest {
  /** Mode of the coursework describing whether it will be assigned to all students or specified individual students. */
  assigneeMode?: "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS" | (string & {});
  /** Set which students are assigned or not assigned to the coursework. Must be specified only when `assigneeMode` is `INDIVIDUAL_STUDENTS`. */
  modifyIndividualStudentsOptions?: ModifyIndividualStudentsOptions;
}

export const ModifyCourseWorkAssigneesRequest: Schema.Schema<ModifyCourseWorkAssigneesRequest> = Schema.suspend(() => Schema.Struct({
  assigneeMode: Schema.optional(Schema.String),
  modifyIndividualStudentsOptions: Schema.optional(ModifyIndividualStudentsOptions),
})).annotate({ identifier: "ModifyCourseWorkAssigneesRequest" }) as any as Schema.Schema<ModifyCourseWorkAssigneesRequest>;

export interface ModifyAnnouncementAssigneesRequest {
  /** Mode of the announcement describing whether it is accessible by all students or specified individual students. */
  assigneeMode?: "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS" | (string & {});
  /** Set which students can view or cannot view the announcement. Must be specified only when `assigneeMode` is `INDIVIDUAL_STUDENTS`. */
  modifyIndividualStudentsOptions?: ModifyIndividualStudentsOptions;
}

export const ModifyAnnouncementAssigneesRequest: Schema.Schema<ModifyAnnouncementAssigneesRequest> = Schema.suspend(() => Schema.Struct({
  assigneeMode: Schema.optional(Schema.String),
  modifyIndividualStudentsOptions: Schema.optional(ModifyIndividualStudentsOptions),
})).annotate({ identifier: "ModifyAnnouncementAssigneesRequest" }) as any as Schema.Schema<ModifyAnnouncementAssigneesRequest>;

export interface Topic {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Unique identifier for the topic. Read-only. */
  topicId?: string;
  /** The name of the topic, generated by the user. Leading and trailing whitespaces, if any, are trimmed. Also, multiple consecutive whitespaces are collapsed into one inside the name. The result must be a non-empty string. Topic names are case sensitive, and must be no longer than 100 characters. */
  name?: string;
  /** The time the topic was last updated by the system. Read-only. */
  updateTime?: string;
}

export const Topic: Schema.Schema<Topic> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  topicId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Topic" }) as any as Schema.Schema<Topic>;

export interface ListTopicResponse {
  /** Topic items that match the request. */
  topic?: Array<Topic>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListTopicResponse: Schema.Schema<ListTopicResponse> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.Array(Topic)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTopicResponse" }) as any as Schema.Schema<ListTopicResponse>;

export interface StudentContext {
  /** Requesting user's submission id to be used for grade passback and to identify the student when showing student work to the teacher. This is set exactly when `supportsStudentWork` is `true`. */
  submissionId?: string;
}

export const StudentContext: Schema.Schema<StudentContext> = Schema.suspend(() => Schema.Struct({
  submissionId: Schema.optional(Schema.String),
})).annotate({ identifier: "StudentContext" }) as any as Schema.Schema<StudentContext>;

export interface TeacherContext {
}

export const TeacherContext: Schema.Schema<TeacherContext> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TeacherContext" }) as any as Schema.Schema<TeacherContext>;

export interface AddOnContext {
  /** Immutable. Identifier of the course. */
  courseId?: string;
  /** Immutable. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Immutable. Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. */
  itemId?: string;
  /** Optional. Whether the post allows the teacher to see student work and passback grades. */
  supportsStudentWork?: boolean;
  /** Add-on context corresponding to the requesting user's role as a student. Its presence implies that the requesting user is a student in the course. */
  studentContext?: StudentContext;
  /** Add-on context corresponding to the requesting user's role as a teacher. Its presence implies that the requesting user is a teacher in the course. */
  teacherContext?: TeacherContext;
}

export const AddOnContext: Schema.Schema<AddOnContext> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  postId: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  supportsStudentWork: Schema.optional(Schema.Boolean),
  studentContext: Schema.optional(StudentContext),
  teacherContext: Schema.optional(TeacherContext),
})).annotate({ identifier: "AddOnContext" }) as any as Schema.Schema<AddOnContext>;

export interface EmbedUri {
  /** Required. URI to be iframed after being populated with query parameters. This must be a valid UTF-8 string containing between 1 and 1800 characters. */
  uri?: string;
}

export const EmbedUri: Schema.Schema<EmbedUri> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "EmbedUri" }) as any as Schema.Schema<EmbedUri>;

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

export const CopyHistory: Schema.Schema<CopyHistory> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  postId: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  attachmentId: Schema.optional(Schema.String),
})).annotate({ identifier: "CopyHistory" }) as any as Schema.Schema<CopyHistory>;

export interface AddOnAttachment {
  /** Immutable. Identifier of the course. */
  courseId?: string;
  /** Immutable. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Immutable. Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. Unique per course. */
  itemId?: string;
  /** Immutable. Classroom-assigned identifier for this attachment, unique per post. */
  id?: string;
  /** Required. Title of this attachment. The title must be between 1 and 1000 characters. */
  title?: string;
  /** Required. URI to show the teacher view of the attachment. The URI will be opened in an iframe with the `courseId`, `itemId`, `itemType`, and `attachmentId` query parameters set. */
  teacherViewUri?: EmbedUri;
  /** Required. URI to show the student view of the attachment. The URI will be opened in an iframe with the `courseId`, `itemId`, `itemType`, and `attachmentId` query parameters set. */
  studentViewUri?: EmbedUri;
  /** URI for the teacher to see student work on the attachment, if applicable. The URI will be opened in an iframe with the `courseId`, `itemId`, `itemType`, `attachmentId`, and `submissionId` query parameters set. This is the same `submissionId` returned in the [`AddOnContext.studentContext`](//devsite.google.com/classroom/reference/rest/v1/AddOnContext#StudentContext) field when a student views the attachment. If the URI is omitted or removed, `max_points` will also be discarded. */
  studentWorkReviewUri?: EmbedUri;
  /** Date, in UTC, that work on this attachment is due. This must be specified if `due_time` is specified. */
  dueDate?: Classroom_Date;
  /** Time of day, in UTC, that work on this attachment is due. This must be specified if `due_date` is specified. */
  dueTime?: TimeOfDay;
  /** Maximum grade for this attachment. Can only be set if `studentWorkReviewUri` is set. Set to a non-zero value to indicate that the attachment supports grade passback. If set, this must be a non-negative integer value. When set to zero, the attachment will not support grade passback. */
  maxPoints?: number;
  /** Output only. Identifiers of attachments that were previous copies of this attachment. If the attachment was previously copied by virtue of its parent post being copied, this enumerates the identifiers of attachments that were its previous copies in ascending chronological order of copy. */
  copyHistory?: Array<CopyHistory>;
}

export const AddOnAttachment: Schema.Schema<AddOnAttachment> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  postId: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  teacherViewUri: Schema.optional(EmbedUri),
  studentViewUri: Schema.optional(EmbedUri),
  studentWorkReviewUri: Schema.optional(EmbedUri),
  dueDate: Schema.optional(Classroom_Date),
  dueTime: Schema.optional(TimeOfDay),
  maxPoints: Schema.optional(Schema.Number),
  copyHistory: Schema.optional(Schema.Array(CopyHistory)),
})).annotate({ identifier: "AddOnAttachment" }) as any as Schema.Schema<AddOnAttachment>;

export interface ListAddOnAttachmentsResponse {
  /** Attachments under the given post. */
  addOnAttachments?: Array<AddOnAttachment>;
  /** A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAddOnAttachmentsResponse: Schema.Schema<ListAddOnAttachmentsResponse> = Schema.suspend(() => Schema.Struct({
  addOnAttachments: Schema.optional(Schema.Array(AddOnAttachment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAddOnAttachmentsResponse" }) as any as Schema.Schema<ListAddOnAttachmentsResponse>;

export interface AddOnAttachmentStudentSubmission {
  /** Student grade on this attachment. If unset, no grade was set. */
  pointsEarned?: number;
  /** Submission state of add-on attachment's parent post (i.e. assignment). */
  postSubmissionState?: "SUBMISSION_STATE_UNSPECIFIED" | "NEW" | "CREATED" | "TURNED_IN" | "RETURNED" | "RECLAIMED_BY_STUDENT" | (string & {});
}

export const AddOnAttachmentStudentSubmission: Schema.Schema<AddOnAttachmentStudentSubmission> = Schema.suspend(() => Schema.Struct({
  pointsEarned: Schema.optional(Schema.Number),
  postSubmissionState: Schema.optional(Schema.String),
})).annotate({ identifier: "AddOnAttachmentStudentSubmission" }) as any as Schema.Schema<AddOnAttachmentStudentSubmission>;

export interface GuardianInvitation {
  /** ID of the student (in standard format) */
  studentId?: string;
  /** Unique identifier for this invitation. Read-only. */
  invitationId?: string;
  /** Email address that the invitation was sent to. This field is only visible to domain administrators. */
  invitedEmailAddress?: string;
  /** The state that this invitation is in. */
  state?: "GUARDIAN_INVITATION_STATE_UNSPECIFIED" | "PENDING" | "COMPLETE" | (string & {});
  /** The time that this invitation was created. Read-only. */
  creationTime?: string;
}

export const GuardianInvitation: Schema.Schema<GuardianInvitation> = Schema.suspend(() => Schema.Struct({
  studentId: Schema.optional(Schema.String),
  invitationId: Schema.optional(Schema.String),
  invitedEmailAddress: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GuardianInvitation" }) as any as Schema.Schema<GuardianInvitation>;

export interface ListGuardianInvitationsResponse {
  /** Guardian invitations that matched the list request. */
  guardianInvitations?: Array<GuardianInvitation>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListGuardianInvitationsResponse: Schema.Schema<ListGuardianInvitationsResponse> = Schema.suspend(() => Schema.Struct({
  guardianInvitations: Schema.optional(Schema.Array(GuardianInvitation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGuardianInvitationsResponse" }) as any as Schema.Schema<ListGuardianInvitationsResponse>;

export interface Name {
  /** The user's first name. Read-only. */
  givenName?: string;
  /** The user's last name. Read-only. */
  familyName?: string;
  /** The user's full name formed by concatenating the first and last name values. Read-only. */
  fullName?: string;
}

export const Name: Schema.Schema<Name> = Schema.suspend(() => Schema.Struct({
  givenName: Schema.optional(Schema.String),
  familyName: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
})).annotate({ identifier: "Name" }) as any as Schema.Schema<Name>;

export interface GlobalPermission {
  /** Permission value. */
  permission?: "PERMISSION_UNSPECIFIED" | "CREATE_COURSE" | (string & {});
}

export const GlobalPermission: Schema.Schema<GlobalPermission> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(Schema.String),
})).annotate({ identifier: "GlobalPermission" }) as any as Schema.Schema<GlobalPermission>;

export interface UserProfile {
  /** Identifier of the user. Read-only. */
  id?: string;
  /** Name of the user. Read-only. */
  name?: Name;
  /** Email address of the user. Must request `https://www.googleapis.com/auth/classroom.profile.emails` scope for this field to be populated in a response body. Read-only. */
  emailAddress?: string;
  /** URL of user's profile photo. Must request `https://www.googleapis.com/auth/classroom.profile.photos` scope for this field to be populated in a response body. Read-only. */
  photoUrl?: string;
  /** Global permissions of the user. Read-only. */
  permissions?: Array<GlobalPermission>;
  /** Represents whether a Google Workspace for Education user's domain administrator has explicitly verified them as being a teacher. This field is always false if the user is not a member of a Google Workspace for Education domain. Read-only */
  verifiedTeacher?: boolean;
}

export const UserProfile: Schema.Schema<UserProfile> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Name),
  emailAddress: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(GlobalPermission)),
  verifiedTeacher: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UserProfile" }) as any as Schema.Schema<UserProfile>;

export interface Teacher {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Identifier of the user. When specified as a parameter of a request, this identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Global user information for the teacher. Read-only. */
  profile?: UserProfile;
}

export const Teacher: Schema.Schema<Teacher> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  profile: Schema.optional(UserProfile),
})).annotate({ identifier: "Teacher" }) as any as Schema.Schema<Teacher>;

export interface ListTeachersResponse {
  /** Teachers who match the list request. */
  teachers?: Array<Teacher>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListTeachersResponse: Schema.Schema<ListTeachersResponse> = Schema.suspend(() => Schema.Struct({
  teachers: Schema.optional(Schema.Array(Teacher)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTeachersResponse" }) as any as Schema.Schema<ListTeachersResponse>;

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

export const Student: Schema.Schema<Student> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  profile: Schema.optional(UserProfile),
  studentWorkFolder: Schema.optional(DriveFolder),
})).annotate({ identifier: "Student" }) as any as Schema.Schema<Student>;

export interface ListStudentsResponse {
  /** Students who match the list request. */
  students?: Array<Student>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListStudentsResponse: Schema.Schema<ListStudentsResponse> = Schema.suspend(() => Schema.Struct({
  students: Schema.optional(Schema.Array(Student)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListStudentsResponse" }) as any as Schema.Schema<ListStudentsResponse>;

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

export const Guardian: Schema.Schema<Guardian> = Schema.suspend(() => Schema.Struct({
  studentId: Schema.optional(Schema.String),
  guardianId: Schema.optional(Schema.String),
  guardianProfile: Schema.optional(UserProfile),
  invitedEmailAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "Guardian" }) as any as Schema.Schema<Guardian>;

export interface ListGuardiansResponse {
  /** Guardians on this page of results that met the criteria specified in the request. */
  guardians?: Array<Guardian>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListGuardiansResponse: Schema.Schema<ListGuardiansResponse> = Schema.suspend(() => Schema.Struct({
  guardians: Schema.optional(Schema.Array(Guardian)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGuardiansResponse" }) as any as Schema.Schema<ListGuardiansResponse>;

export interface Invitation {
  /** Identifier assigned by Classroom. Read-only. */
  id?: string;
  /** Identifier of the invited user. When specified as a parameter of a request, this identifier can be set to one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Identifier of the course to invite the user to. */
  courseId?: string;
  /** Role to invite the user to have. Must not be `COURSE_ROLE_UNSPECIFIED`. */
  role?: "COURSE_ROLE_UNSPECIFIED" | "STUDENT" | "TEACHER" | "OWNER" | (string & {});
}

export const Invitation: Schema.Schema<Invitation> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  courseId: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
})).annotate({ identifier: "Invitation" }) as any as Schema.Schema<Invitation>;

export interface ListInvitationsResponse {
  /** Invitations that match the list request. */
  invitations?: Array<Invitation>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListInvitationsResponse: Schema.Schema<ListInvitationsResponse> = Schema.suspend(() => Schema.Struct({
  invitations: Schema.optional(Schema.Array(Invitation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInvitationsResponse" }) as any as Schema.Schema<ListInvitationsResponse>;

export interface CourseRosterChangesInfo {
  /** The `course_id` of the course to subscribe to roster changes for. */
  courseId?: string;
}

export const CourseRosterChangesInfo: Schema.Schema<CourseRosterChangesInfo> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
})).annotate({ identifier: "CourseRosterChangesInfo" }) as any as Schema.Schema<CourseRosterChangesInfo>;

export interface CourseWorkChangesInfo {
  /** The `course_id` of the course to subscribe to work changes for. */
  courseId?: string;
}

export const CourseWorkChangesInfo: Schema.Schema<CourseWorkChangesInfo> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
})).annotate({ identifier: "CourseWorkChangesInfo" }) as any as Schema.Schema<CourseWorkChangesInfo>;

export interface Feed {
  /** The type of feed. */
  feedType?: "FEED_TYPE_UNSPECIFIED" | "DOMAIN_ROSTER_CHANGES" | "COURSE_ROSTER_CHANGES" | "COURSE_WORK_CHANGES" | (string & {});
  /** Information about a `Feed` with a `feed_type` of `COURSE_ROSTER_CHANGES`. This field must be specified if `feed_type` is `COURSE_ROSTER_CHANGES`. */
  courseRosterChangesInfo?: CourseRosterChangesInfo;
  /** Information about a `Feed` with a `feed_type` of `COURSE_WORK_CHANGES`. This field must be specified if `feed_type` is `COURSE_WORK_CHANGES`. */
  courseWorkChangesInfo?: CourseWorkChangesInfo;
}

export const Feed: Schema.Schema<Feed> = Schema.suspend(() => Schema.Struct({
  feedType: Schema.optional(Schema.String),
  courseRosterChangesInfo: Schema.optional(CourseRosterChangesInfo),
  courseWorkChangesInfo: Schema.optional(CourseWorkChangesInfo),
})).annotate({ identifier: "Feed" }) as any as Schema.Schema<Feed>;

export interface CloudPubsubTopic {
  /** The `name` field of a Cloud Pub/Sub [Topic](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#Topic). */
  topicName?: string;
}

export const CloudPubsubTopic: Schema.Schema<CloudPubsubTopic> = Schema.suspend(() => Schema.Struct({
  topicName: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudPubsubTopic" }) as any as Schema.Schema<CloudPubsubTopic>;

export interface Registration {
  /** A server-generated unique identifier for this `Registration`. Read-only. */
  registrationId?: string;
  /** Specification for the class of notifications that Classroom should deliver to the destination. */
  feed?: Feed;
  /** The Cloud Pub/Sub topic that notifications are to be sent to. */
  cloudPubsubTopic?: CloudPubsubTopic;
  /** The time until which the `Registration` is effective. This is a read-only field assigned by the server. */
  expiryTime?: string;
}

export const Registration: Schema.Schema<Registration> = Schema.suspend(() => Schema.Struct({
  registrationId: Schema.optional(Schema.String),
  feed: Schema.optional(Feed),
  cloudPubsubTopic: Schema.optional(CloudPubsubTopic),
  expiryTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Registration" }) as any as Schema.Schema<Registration>;

export interface Level {
  /** The level ID. On creation, an ID is assigned. */
  id?: string;
  /** The title of the level. If the level has no points set, title must be set. */
  title?: string;
  /** The description of the level. */
  description?: string;
  /** Optional points associated with this level. If set, all levels within the rubric must specify points and the value must be distinct across all levels within a single criterion. 0 is distinct from no points. */
  points?: number;
}

export const Level: Schema.Schema<Level> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  points: Schema.optional(Schema.Number),
})).annotate({ identifier: "Level" }) as any as Schema.Schema<Level>;

export interface Criterion {
  /** The criterion ID. On creation, an ID is assigned. */
  id?: string;
  /** The title of the criterion. */
  title?: string;
  /** The description of the criterion. */
  description?: string;
  /** The list of levels within this criterion. */
  levels?: Array<Level>;
}

export const Criterion: Schema.Schema<Criterion> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  levels: Schema.optional(Schema.Array(Level)),
})).annotate({ identifier: "Criterion" }) as any as Schema.Schema<Criterion>;

export interface Rubric {
  /** Identifier of the course. Read-only. */
  courseId?: string;
  /** Identifier for the course work this corresponds to. Read-only. */
  courseWorkId?: string;
  /** Classroom-assigned identifier for the rubric. This is unique among rubrics for the relevant course work. Read-only. */
  id?: string;
  /** Input only. Immutable. Google Sheets ID of the spreadsheet. This spreadsheet must contain formatted rubric settings. See [Create or reuse a rubric for an assignment](https://support.google.com/edu/classroom/answer/9335069). Use of this field requires the `https://www.googleapis.com/auth/spreadsheets.readonly` or `https://www.googleapis.com/auth/spreadsheets` scope. */
  sourceSpreadsheetId?: string;
  /** Output only. Timestamp when this rubric was created. Read-only. */
  creationTime?: string;
  /** Output only. Timestamp of the most recent change to this rubric. Read-only. */
  updateTime?: string;
  /** List of criteria. Each criterion is a dimension on which performance is rated. */
  criteria?: Array<Criterion>;
}

export const Rubric: Schema.Schema<Rubric> = Schema.suspend(() => Schema.Struct({
  courseId: Schema.optional(Schema.String),
  courseWorkId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  sourceSpreadsheetId: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  criteria: Schema.optional(Schema.Array(Criterion)),
})).annotate({ identifier: "Rubric" }) as any as Schema.Schema<Rubric>;

export interface ListRubricsResponse {
  /** Rubrics that match the request. */
  rubrics?: Array<Rubric>;
  /** Token identifying the next page of results to return. If empty, no further results are available. */
  nextPageToken?: string;
}

export const ListRubricsResponse: Schema.Schema<ListRubricsResponse> = Schema.suspend(() => Schema.Struct({
  rubrics: Schema.optional(Schema.Array(Rubric)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListRubricsResponse" }) as any as Schema.Schema<ListRubricsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a course. The user specified in `ownerId` is the owner of the created course and added as a teacher. A non-admin requesting user can only create a course with themselves as the owner. Domain admins can create courses owned by any user within their domain. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create courses or for access errors. * `NOT_FOUND` if the primary teacher is not a valid user. * `FAILED_PRECONDITION` if the course owner's account is disabled or for the following request errors: * UserCannotOwnCourse * UserGroupsMembershipLimitReached * CourseTitleCannotContainUrl * `ALREADY_EXISTS` if an alias was specified in the `id` and already exists. */
export interface CreateCoursesRequest {
  /** Request body */
  body?: Course;
}

export const CreateCoursesRequest = Schema.Struct({
  body: Schema.optional(Course).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesRequest>;

export type CreateCoursesResponse = Course;
export const CreateCoursesResponse = Course;

export type CreateCoursesError = CommonErrors;

export const createCourses: API.OperationMethod<CreateCoursesRequest, CreateCoursesResponse, CreateCoursesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesRequest,
  output: CreateCoursesResponse,
  errors: [],
}));

/** Returns a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. */
export interface GetCoursesRequest {
  /** Identifier of the course to return. This identifier can be either the Classroom-assigned identifier or an alias. */
  id: string;
}

export const GetCoursesRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{id}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesRequest>;

export type GetCoursesResponse = Course;
export const GetCoursesResponse = Course;

export type GetCoursesError = CommonErrors;

export const getCourses: API.OperationMethod<GetCoursesRequest, GetCoursesResponse, GetCoursesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesRequest,
  output: GetCoursesResponse,
  errors: [],
}));

/** Updates a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to modify the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. * `FAILED_PRECONDITION` for the following request errors: * CourseNotModifiable * CourseTitleCannotContainUrl */
export interface UpdateCoursesRequest {
  /** Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias. */
  id: string;
  /** Request body */
  body?: Course;
}

export const UpdateCoursesRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(Course).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/courses/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCoursesRequest>;

export type UpdateCoursesResponse = Course;
export const UpdateCoursesResponse = Course;

export type UpdateCoursesError = CommonErrors;

export const updateCourses: API.OperationMethod<UpdateCoursesRequest, UpdateCoursesResponse, UpdateCoursesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCoursesRequest,
  output: UpdateCoursesResponse,
  errors: [],
}));

/** Updates one or more fields in a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to modify the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. * `INVALID_ARGUMENT` if invalid fields are specified in the update mask or if no update mask is supplied. * `FAILED_PRECONDITION` for the following request errors: * CourseNotModifiable * InactiveCourseOwner * IneligibleOwner * CourseTitleCannotContainUrl */
export interface PatchCoursesRequest {
  /** Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias. */
  id: string;
  /** Mask that identifies which fields on the course to update. This field is required to do an update. The update will fail if invalid fields are specified. The following fields are valid: * `courseState` * `description` * `descriptionHeading` * `name` * `ownerId` * `room` * `section` * `subject` Note: patches to ownerId are treated as being effective immediately, but in practice it may take some time for the ownership transfer of all affected resources to complete. When set in a query parameter, this field should be specified as `updateMask=,,...` */
  updateMask?: string;
  /** Request body */
  body?: Course;
}

export const PatchCoursesRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Course).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesRequest>;

export type PatchCoursesResponse = Course;
export const PatchCoursesResponse = Course;

export type PatchCoursesError = CommonErrors;

export const patchCourses: API.OperationMethod<PatchCoursesRequest, PatchCoursesResponse, PatchCoursesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesRequest,
  output: PatchCoursesResponse,
  errors: [],
}));

/** Deletes a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. */
export interface DeleteCoursesRequest {
  /** Identifier of the course to delete. This identifier can be either the Classroom-assigned identifier or an alias. */
  id: string;
}

export const DeleteCoursesRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesRequest>;

export type DeleteCoursesResponse = Empty;
export const DeleteCoursesResponse = Empty;

export type DeleteCoursesError = CommonErrors;

export const deleteCourses: API.OperationMethod<DeleteCoursesRequest, DeleteCoursesResponse, DeleteCoursesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesRequest,
  output: DeleteCoursesResponse,
  errors: [],
}));

/** Returns a list of courses that the requesting user is permitted to view, restricted to those that match the request. Returned courses are ordered by creation time, with the most recently created coming first. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the query argument is malformed. * `NOT_FOUND` if any users specified in the query arguments do not exist. */
export interface ListCoursesRequest {
  /** Restricts returned courses to those having a student with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  studentId?: string;
  /** Restricts returned courses to those having a teacher with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  teacherId?: string;
  /** Restricts returned courses to those in one of the specified states The default value is ACTIVE, ARCHIVED, PROVISIONED, DECLINED. */
  courseStates?: "COURSE_STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "PROVISIONED" | "DECLINED" | "SUSPENDED" | (string & {})[];
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesRequest = Schema.Struct({
  studentId: Schema.optional(Schema.String).pipe(T.HttpQuery("studentId")),
  teacherId: Schema.optional(Schema.String).pipe(T.HttpQuery("teacherId")),
  courseStates: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("courseStates")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses" }),
  svc,
) as unknown as Schema.Schema<ListCoursesRequest>;

export type ListCoursesResponse_Op = ListCoursesResponse;
export const ListCoursesResponse_Op = ListCoursesResponse;

export type ListCoursesError = CommonErrors;

export const listCourses = API.makePaginated(() => ({
  input: ListCoursesRequest,
  output: ListCoursesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the grading period settings in a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user isn't permitted to access the grading period settings in the requested course or for access errors. * `NOT_FOUND` if the requested course does not exist. */
export interface GetGradingPeriodSettingsCoursesRequest {
  /** Required. The identifier of the course. */
  courseId: string;
}

export const GetGradingPeriodSettingsCoursesRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/gradingPeriodSettings" }),
  svc,
) as unknown as Schema.Schema<GetGradingPeriodSettingsCoursesRequest>;

export type GetGradingPeriodSettingsCoursesResponse = GradingPeriodSettings;
export const GetGradingPeriodSettingsCoursesResponse = GradingPeriodSettings;

export type GetGradingPeriodSettingsCoursesError = CommonErrors;

export const getGradingPeriodSettingsCourses: API.OperationMethod<GetGradingPeriodSettingsCoursesRequest, GetGradingPeriodSettingsCoursesResponse, GetGradingPeriodSettingsCoursesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGradingPeriodSettingsCoursesRequest,
  output: GetGradingPeriodSettingsCoursesResponse,
  errors: [],
}));

/** Updates grading period settings of a course. Individual grading periods can be added, removed, or modified using this method. The requesting user and course owner must be eligible to modify Grading Periods. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/grading-periods/manage-grading-periods#licensing_requirements). This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to modify the grading period settings in a course or for access errors: * UserIneligibleToUpdateGradingPeriodSettings * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export interface UpdateGradingPeriodSettingsCoursesRequest {
  /** Required. The identifier of the course. */
  courseId: string;
  /** Mask that identifies which fields in the GradingPeriodSettings to update. The GradingPeriodSettings `grading_periods` list will be fully replaced by the grading periods specified in the update request. For example: * Grading periods included in the list without an ID are considered additions, and a new ID will be assigned when the request is made. * Grading periods that currently exist, but are missing from the request will be considered deletions. * Grading periods with an existing ID and modified data are considered edits. Unmodified data will be left as is. * Grading periods included with an unknown ID will result in an error. The following fields may be specified: * `grading_periods` * `apply_to_existing_coursework` */
  updateMask?: string;
  /** Request body */
  body?: GradingPeriodSettings;
}

export const UpdateGradingPeriodSettingsCoursesRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GradingPeriodSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/gradingPeriodSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateGradingPeriodSettingsCoursesRequest>;

export type UpdateGradingPeriodSettingsCoursesResponse = GradingPeriodSettings;
export const UpdateGradingPeriodSettingsCoursesResponse = GradingPeriodSettings;

export type UpdateGradingPeriodSettingsCoursesError = CommonErrors;

export const updateGradingPeriodSettingsCourses: API.OperationMethod<UpdateGradingPeriodSettingsCoursesRequest, UpdateGradingPeriodSettingsCoursesResponse, UpdateGradingPeriodSettingsCoursesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateGradingPeriodSettingsCoursesRequest,
  output: UpdateGradingPeriodSettingsCoursesResponse,
  errors: [],
}));

/** Creates a student group for a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create the student group or for access errors. * `NOT_FOUND` if the course does not exist or the requesting user doesn't have access to the course. * `FAILED_PRECONDITION` if creating the student group would exceed the maximum number of student groups per course. */
export interface CreateCoursesStudentGroupsRequest {
  /** Required. The identifier of the course. */
  courseId: string;
  /** Request body */
  body?: StudentGroup;
}

export const CreateCoursesStudentGroupsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  body: Schema.optional(StudentGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/studentGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesStudentGroupsRequest>;

export type CreateCoursesStudentGroupsResponse = StudentGroup;
export const CreateCoursesStudentGroupsResponse = StudentGroup;

export type CreateCoursesStudentGroupsError = CommonErrors;

export const createCoursesStudentGroups: API.OperationMethod<CreateCoursesStudentGroupsRequest, CreateCoursesStudentGroupsResponse, CreateCoursesStudentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesStudentGroupsRequest,
  output: CreateCoursesStudentGroupsResponse,
  errors: [],
}));

/** Deletes a student group. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested student group or for access errors. * `NOT_FOUND` if the student group does not exist or the user does not have access to the student group. */
export interface DeleteCoursesStudentGroupsRequest {
  /** Required. The identifier of the course containing the student group to delete. */
  courseId: string;
  /** Required. The identifier of the student group to delete. */
  id: string;
}

export const DeleteCoursesStudentGroupsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/studentGroups/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesStudentGroupsRequest>;

export type DeleteCoursesStudentGroupsResponse = Empty;
export const DeleteCoursesStudentGroupsResponse = Empty;

export type DeleteCoursesStudentGroupsError = CommonErrors;

export const deleteCoursesStudentGroups: API.OperationMethod<DeleteCoursesStudentGroupsRequest, DeleteCoursesStudentGroupsResponse, DeleteCoursesStudentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesStudentGroupsRequest,
  output: DeleteCoursesStudentGroupsResponse,
  errors: [],
}));

/** Updates one or more fields in a student group. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to modify the requested student group or for access errors. * `NOT_FOUND` if the student group does not exist or the user does not have access to the student group. * `INVALID_ARGUMENT` if invalid fields are specified in the update mask or if no update mask is supplied. */
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

export const PatchCoursesStudentGroupsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(StudentGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/studentGroups/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesStudentGroupsRequest>;

export type PatchCoursesStudentGroupsResponse = StudentGroup;
export const PatchCoursesStudentGroupsResponse = StudentGroup;

export type PatchCoursesStudentGroupsError = CommonErrors;

export const patchCoursesStudentGroups: API.OperationMethod<PatchCoursesStudentGroupsRequest, PatchCoursesStudentGroupsResponse, PatchCoursesStudentGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesStudentGroupsRequest,
  output: PatchCoursesStudentGroupsResponse,
  errors: [],
}));

/** Returns a list of groups in a course. This method returns the following error codes: * `NOT_FOUND` if the course does not exist. */
export interface ListCoursesStudentGroupsRequest {
  /** Required. The identifier of the course. */
  courseId: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum, which is currently set to 75 items. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesStudentGroupsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/studentGroups" }),
  svc,
) as unknown as Schema.Schema<ListCoursesStudentGroupsRequest>;

export type ListCoursesStudentGroupsResponse = ListStudentGroupsResponse;
export const ListCoursesStudentGroupsResponse = ListStudentGroupsResponse;

export type ListCoursesStudentGroupsError = CommonErrors;

export const listCoursesStudentGroups = API.makePaginated(() => ({
  input: ListCoursesStudentGroupsRequest,
  output: ListCoursesStudentGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a student group member for a student group. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create the student group or member for access errors. * `NOT_FOUND` if the student group does not exist or the user does not have access to the student group. * `ALREADY_EXISTS` if the student group member already exists. * `FAILED_PRECONDITION` if attempting to add a member to a student group that has reached its member limit. */
export interface CreateCoursesStudentGroupsStudentGroupMembersRequest {
  /** Required. The identifier of the course. */
  courseId: string;
  /** Required. The identifier of the student group. */
  studentGroupId: string;
  /** Request body */
  body?: StudentGroupMember;
}

export const CreateCoursesStudentGroupsStudentGroupMembersRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  studentGroupId: Schema.String.pipe(T.HttpPath("studentGroupId")),
  body: Schema.optional(StudentGroupMember).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/studentGroups/{studentGroupId}/studentGroupMembers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesStudentGroupsStudentGroupMembersRequest>;

export type CreateCoursesStudentGroupsStudentGroupMembersResponse = StudentGroupMember;
export const CreateCoursesStudentGroupsStudentGroupMembersResponse = StudentGroupMember;

export type CreateCoursesStudentGroupsStudentGroupMembersError = CommonErrors;

export const createCoursesStudentGroupsStudentGroupMembers: API.OperationMethod<CreateCoursesStudentGroupsStudentGroupMembersRequest, CreateCoursesStudentGroupsStudentGroupMembersResponse, CreateCoursesStudentGroupsStudentGroupMembersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesStudentGroupsStudentGroupMembersRequest,
  output: CreateCoursesStudentGroupsStudentGroupMembersResponse,
  errors: [],
}));

/** Deletes a student group member. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested student group member or for access errors. * `NOT_FOUND` if the student group member does not exist or the user does not have access to the student group. */
export interface DeleteCoursesStudentGroupsStudentGroupMembersRequest {
  /** Required. The identifier of the course containing the relevant student group. */
  courseId: string;
  /** Required. The identifier of the student group containing the student group member to delete. */
  studentGroupId: string;
  /** Required. The identifier of the student group member to delete. */
  userId: string;
}

export const DeleteCoursesStudentGroupsStudentGroupMembersRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  studentGroupId: Schema.String.pipe(T.HttpPath("studentGroupId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/studentGroups/{studentGroupId}/studentGroupMembers/{userId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesStudentGroupsStudentGroupMembersRequest>;

export type DeleteCoursesStudentGroupsStudentGroupMembersResponse = Empty;
export const DeleteCoursesStudentGroupsStudentGroupMembersResponse = Empty;

export type DeleteCoursesStudentGroupsStudentGroupMembersError = CommonErrors;

export const deleteCoursesStudentGroupsStudentGroupMembers: API.OperationMethod<DeleteCoursesStudentGroupsStudentGroupMembersRequest, DeleteCoursesStudentGroupsStudentGroupMembersResponse, DeleteCoursesStudentGroupsStudentGroupMembersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesStudentGroupsStudentGroupMembersRequest,
  output: DeleteCoursesStudentGroupsStudentGroupMembersResponse,
  errors: [],
}));

/** Returns a list of students in a group. This method returns the following error codes: * `NOT_FOUND` if the course or student group does not exist. */
export interface ListCoursesStudentGroupsStudentGroupMembersRequest {
  /** Required. The identifier of the course. */
  courseId: string;
  /** Required. The identifier of the student group. */
  studentGroupId: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesStudentGroupsStudentGroupMembersRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  studentGroupId: Schema.String.pipe(T.HttpPath("studentGroupId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/studentGroups/{studentGroupId}/studentGroupMembers" }),
  svc,
) as unknown as Schema.Schema<ListCoursesStudentGroupsStudentGroupMembersRequest>;

export type ListCoursesStudentGroupsStudentGroupMembersResponse = ListStudentGroupMembersResponse;
export const ListCoursesStudentGroupsStudentGroupMembersResponse = ListStudentGroupMembersResponse;

export type ListCoursesStudentGroupsStudentGroupMembersError = CommonErrors;

export const listCoursesStudentGroupsStudentGroupMembers = API.makePaginated(() => ({
  input: ListCoursesStudentGroupsStudentGroupMembersRequest,
  output: ListCoursesStudentGroupsStudentGroupMembersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an alias for a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create the alias or for access errors. * `NOT_FOUND` if the course does not exist. * `ALREADY_EXISTS` if the alias already exists. * `FAILED_PRECONDITION` if the alias requested does not make sense for the requesting user or course (for example, if a user not in a domain attempts to access a domain-scoped alias). */
export interface CreateCoursesAliasesRequest {
  /** Identifier of the course to alias. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: CourseAlias;
}

export const CreateCoursesAliasesRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  body: Schema.optional(CourseAlias).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/aliases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesAliasesRequest>;

export type CreateCoursesAliasesResponse = CourseAlias;
export const CreateCoursesAliasesResponse = CourseAlias;

export type CreateCoursesAliasesError = CommonErrors;

export const createCoursesAliases: API.OperationMethod<CreateCoursesAliasesRequest, CreateCoursesAliasesResponse, CreateCoursesAliasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesAliasesRequest,
  output: CreateCoursesAliasesResponse,
  errors: [],
}));

/** Deletes an alias of a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to remove the alias or for access errors. * `NOT_FOUND` if the alias does not exist. * `FAILED_PRECONDITION` if the alias requested does not make sense for the requesting user or course (for example, if a user not in a domain attempts to delete a domain-scoped alias). */
export interface DeleteCoursesAliasesRequest {
  /** Identifier of the course whose alias should be deleted. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Alias to delete. This may not be the Classroom-assigned identifier. */
  alias: string;
}

export const DeleteCoursesAliasesRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  alias: Schema.String.pipe(T.HttpPath("alias")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/aliases/{alias}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesAliasesRequest>;

export type DeleteCoursesAliasesResponse = Empty;
export const DeleteCoursesAliasesResponse = Empty;

export type DeleteCoursesAliasesError = CommonErrors;

export const deleteCoursesAliases: API.OperationMethod<DeleteCoursesAliasesRequest, DeleteCoursesAliasesResponse, DeleteCoursesAliasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesAliasesRequest,
  output: DeleteCoursesAliasesResponse,
  errors: [],
}));

/** Returns a list of aliases for a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the course or for access errors. * `NOT_FOUND` if the course does not exist. */
export interface ListCoursesAliasesRequest {
  /** The identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesAliasesRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/aliases" }),
  svc,
) as unknown as Schema.Schema<ListCoursesAliasesRequest>;

export type ListCoursesAliasesResponse = ListCourseAliasesResponse;
export const ListCoursesAliasesResponse = ListCourseAliasesResponse;

export type ListCoursesAliasesError = CommonErrors;

export const listCoursesAliases = API.makePaginated(() => ({
  input: ListCoursesAliasesRequest,
  output: ListCoursesAliasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates course work. The resulting course work (and corresponding student submissions) are associated with the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to make the request. Classroom API requests to modify course work and student submissions must be made with an OAuth client ID from the associated Developer Console project. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create course work in the requested course, share a Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. * `FAILED_PRECONDITION` for the following request error: * AttachmentNotVisible */
export interface CreateCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: CourseWork;
}

export const CreateCoursesCourseWorkRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  body: Schema.optional(CourseWork).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWork", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesCourseWorkRequest>;

export type CreateCoursesCourseWorkResponse = CourseWork;
export const CreateCoursesCourseWorkResponse = CourseWork;

export type CreateCoursesCourseWorkError = CommonErrors;

export const createCoursesCourseWork: API.OperationMethod<CreateCoursesCourseWorkRequest, CreateCoursesCourseWorkResponse, CreateCoursesCourseWorkError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesCourseWorkRequest,
  output: CreateCoursesCourseWorkResponse,
  errors: [],
}));

/** Updates one or more fields of a course work. See google.classroom.v1.CourseWork for details of which fields may be updated and who may change them. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the user is not permitted to make the requested modification to the student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if the requested course work has already been deleted. * `NOT_FOUND` if the requested course or course work does not exist. */
export interface PatchCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  id: string;
  /** Mask that identifies which fields on the course work to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `CourseWork` object. If a field that does not support empty values is included in the update mask and not set in the `CourseWork` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `description` * `state` * `due_date` * `due_time` * `max_points` * `scheduled_time` * `submission_modification_mode` * `topic_id` * `grading_period_id` */
  updateMask?: string;
  /** Request body */
  body?: CourseWork;
}

export const PatchCoursesCourseWorkRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CourseWork).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/courseWork/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesCourseWorkRequest>;

export type PatchCoursesCourseWorkResponse = CourseWork;
export const PatchCoursesCourseWorkResponse = CourseWork;

export type PatchCoursesCourseWorkError = CommonErrors;

export const patchCoursesCourseWork: API.OperationMethod<PatchCoursesCourseWorkRequest, PatchCoursesCourseWorkResponse, PatchCoursesCourseWorkError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesCourseWorkRequest,
  output: PatchCoursesCourseWorkResponse,
  errors: [],
}));

/** Deletes a course work. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the requesting user is not permitted to delete the requested course or for access errors. * `FAILED_PRECONDITION` if the requested course work has already been deleted. * `NOT_FOUND` if no course exists with the requested ID. */
export interface DeleteCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work to delete. This identifier is a Classroom-assigned identifier. */
  id: string;
}

export const DeleteCoursesCourseWorkRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/courseWork/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesCourseWorkRequest>;

export type DeleteCoursesCourseWorkResponse = Empty;
export const DeleteCoursesCourseWorkResponse = Empty;

export type DeleteCoursesCourseWorkError = CommonErrors;

export const deleteCoursesCourseWork: API.OperationMethod<DeleteCoursesCourseWorkRequest, DeleteCoursesCourseWorkResponse, DeleteCoursesCourseWorkError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesCourseWorkRequest,
  output: DeleteCoursesCourseWorkResponse,
  errors: [],
}));

/** Returns course work. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist. */
export interface GetCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  id: string;
}

export const GetCoursesCourseWorkRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{id}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesCourseWorkRequest>;

export type GetCoursesCourseWorkResponse = CourseWork;
export const GetCoursesCourseWorkResponse = CourseWork;

export type GetCoursesCourseWorkError = CommonErrors;

export const getCoursesCourseWork: API.OperationMethod<GetCoursesCourseWorkRequest, GetCoursesCourseWorkResponse, GetCoursesCourseWorkError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesCourseWorkRequest,
  output: GetCoursesCourseWorkResponse,
  errors: [],
}));

/** Returns a list of course work that the requester is permitted to view. Course students may only view `PUBLISHED` course work. Course teachers and domain administrators may view all course work. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export interface ListCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Restriction on the work status to return. Only courseWork that matches is returned. If unspecified, items with a work status of `PUBLISHED` is returned. */
  courseWorkStates?: "COURSE_WORK_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED" | (string & {})[];
  /** Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported fields are `updateTime` and `dueDate`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `dueDate asc,updateTime desc`, `updateTime,dueDate desc` */
  orderBy?: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesCourseWorkRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkStates: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("courseWorkStates")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork" }),
  svc,
) as unknown as Schema.Schema<ListCoursesCourseWorkRequest>;

export type ListCoursesCourseWorkResponse = ListCourseWorkResponse;
export const ListCoursesCourseWorkResponse = ListCourseWorkResponse;

export type ListCoursesCourseWorkError = CommonErrors;

export const listCoursesCourseWork = API.makePaginated(() => ({
  input: ListCoursesCourseWorkRequest,
  output: ListCoursesCourseWorkResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Modifies assignee mode and options of a coursework. Only a teacher of the course that contains the coursework may call this method. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist. * `FAILED_PRECONDITION` for the following request error: * EmptyAssignees */
export interface ModifyAssigneesCoursesCourseWorkRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the coursework. */
  id: string;
  /** Request body */
  body?: ModifyCourseWorkAssigneesRequest;
}

export const ModifyAssigneesCoursesCourseWorkRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(ModifyCourseWorkAssigneesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWork/{id}:modifyAssignees", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyAssigneesCoursesCourseWorkRequest>;

export type ModifyAssigneesCoursesCourseWorkResponse = CourseWork;
export const ModifyAssigneesCoursesCourseWorkResponse = CourseWork;

export type ModifyAssigneesCoursesCourseWorkError = CommonErrors;

export const modifyAssigneesCoursesCourseWork: API.OperationMethod<ModifyAssigneesCoursesCourseWorkRequest, ModifyAssigneesCoursesCourseWorkResponse, ModifyAssigneesCoursesCourseWorkError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyAssigneesCoursesCourseWorkRequest,
  output: ModifyAssigneesCoursesCourseWorkResponse,
  errors: [],
}));

/** Gets metadata for Classroom add-ons in the context of a specific post. To maintain the integrity of its own data and permissions model, an add-on should call this to validate query parameters and the requesting user's role whenever the add-on is opened in an [iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/iframes-overview). This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetAddOnContextCoursesCourseWorkRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. The authorization token is required when neither of the following is true: * The add-on has attachments on the post. * The developer project issuing the request is the same project that created the post. */
  addOnToken?: string;
  /** Optional. The identifier of the attachment. This field is required for all requests except when the user is in the [Attachment Discovery iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/attachment-discovery-iframe). */
  attachmentId?: string;
}

export const GetAddOnContextCoursesCourseWorkRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
  attachmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("attachmentId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{itemId}/addOnContext" }),
  svc,
) as unknown as Schema.Schema<GetAddOnContextCoursesCourseWorkRequest>;

export type GetAddOnContextCoursesCourseWorkResponse = AddOnContext;
export const GetAddOnContextCoursesCourseWorkResponse = AddOnContext;

export type GetAddOnContextCoursesCourseWorkError = CommonErrors;

export const getAddOnContextCoursesCourseWork: API.OperationMethod<GetAddOnContextCoursesCourseWorkRequest, GetAddOnContextCoursesCourseWorkResponse, GetAddOnContextCoursesCourseWorkError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAddOnContextCoursesCourseWorkRequest,
  output: GetAddOnContextCoursesCourseWorkResponse,
  errors: [],
}));

/** Updates a rubric. See google.classroom.v1.Rubric for details of which fields can be updated. Rubric update capabilities are [limited](/classroom/rubrics/limitations) once grading has started. The requesting user and course owner must have rubrics creation capabilities. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/rubrics/limitations#license-requirements). This request must be made by the Google Cloud console of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the parent course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project didn't create the corresponding course work, if the user isn't permitted to make the requested modification to the rubric, or for access errors. This error code is also returned if grading has already started on the rubric. * `INVALID_ARGUMENT` if the request is malformed and for the following request error: * `RubricCriteriaInvalidFormat` * `NOT_FOUND` if the requested course, course work, or rubric doesn't exist or if the user doesn't have access to the corresponding course work. * `INTERNAL` if grading has already started on the rubric. */
export interface UpdateRubricCoursesCourseWorkRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Optional. Identifier of the rubric. */
  id?: string;
  /** Optional. Mask that identifies which fields on the rubric to update. This field is required to do an update. The update fails if invalid fields are specified. There are multiple options to define the criteria of a rubric: the `source_spreadsheet_id` and the `criteria` list. Only one of these can be used at a time to define a rubric. The rubric `criteria` list is fully replaced by the rubric criteria specified in the update request. For example, if a criterion or level is missing from the request, it is deleted. New criteria and levels are added and an ID is assigned. Existing criteria and levels retain the previously assigned ID if the ID is specified in the request. The following fields can be specified by teachers: * `criteria` * `source_spreadsheet_id` */
  updateMask?: string;
  /** Request body */
  body?: Rubric;
}

export const UpdateRubricCoursesCourseWorkRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Rubric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubric", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRubricCoursesCourseWorkRequest>;

export type UpdateRubricCoursesCourseWorkResponse = Rubric;
export const UpdateRubricCoursesCourseWorkResponse = Rubric;

export type UpdateRubricCoursesCourseWorkError = CommonErrors;

export const updateRubricCoursesCourseWork: API.OperationMethod<UpdateRubricCoursesCourseWorkRequest, UpdateRubricCoursesCourseWorkResponse, UpdateRubricCoursesCourseWorkError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRubricCoursesCourseWorkRequest,
  output: UpdateRubricCoursesCourseWorkResponse,
  errors: [],
}));

/** Returns a student submission. * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, course work, or student submission or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export interface GetCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the student submission. */
  id: string;
}

export const GetCoursesCourseWorkStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesCourseWorkStudentSubmissionsRequest>;

export type GetCoursesCourseWorkStudentSubmissionsResponse = StudentSubmission;
export const GetCoursesCourseWorkStudentSubmissionsResponse = StudentSubmission;

export type GetCoursesCourseWorkStudentSubmissionsError = CommonErrors;

export const getCoursesCourseWorkStudentSubmissions: API.OperationMethod<GetCoursesCourseWorkStudentSubmissionsRequest, GetCoursesCourseWorkStudentSubmissionsResponse, GetCoursesCourseWorkStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesCourseWorkStudentSubmissionsRequest,
  output: GetCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

/** Updates one or more fields of a student submission. See google.classroom.v1.StudentSubmission for details of which fields may be updated and who may change them. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the user is not permitted to make the requested modification to the student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export interface PatchCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Mask that identifies which fields on the student submission to update. This field is required to do an update. The update fails if invalid fields are specified. The following fields may be specified by teachers: * `draft_grade` * `assigned_grade` */
  updateMask?: string;
  /** Request body */
  body?: StudentSubmission;
}

export const PatchCoursesCourseWorkStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(StudentSubmission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesCourseWorkStudentSubmissionsRequest>;

export type PatchCoursesCourseWorkStudentSubmissionsResponse = StudentSubmission;
export const PatchCoursesCourseWorkStudentSubmissionsResponse = StudentSubmission;

export type PatchCoursesCourseWorkStudentSubmissionsError = CommonErrors;

export const patchCoursesCourseWorkStudentSubmissions: API.OperationMethod<PatchCoursesCourseWorkStudentSubmissionsRequest, PatchCoursesCourseWorkStudentSubmissionsResponse, PatchCoursesCourseWorkStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesCourseWorkStudentSubmissionsRequest,
  output: PatchCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

/** Returns a list of student submissions that the requester is permitted to view, factoring in the OAuth scopes of the request. A hyphen (`-`) may be specified as the `course_work_id` to include student submissions for multiple course work items. Course students may only view their own work. Course teachers and domain administrators may view all student submissions. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export interface ListCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student work to request. This may be set to the string literal `"-"` to request student work for all course work in the specified course. */
  courseWorkId: string;
  /** Optional argument to restrict returned student work to those owned by the student with the specified identifier. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Requested submission states. If specified, returned student submissions match one of the specified submission states. */
  states?: "SUBMISSION_STATE_UNSPECIFIED" | "NEW" | "CREATED" | "TURNED_IN" | "RETURNED" | "RECLAIMED_BY_STUDENT" | (string & {})[];
  /** Requested lateness value. If specified, returned student submissions are restricted by the requested value. If unspecified, submissions are returned regardless of `late` value. */
  late?: "LATE_VALUES_UNSPECIFIED" | "LATE_ONLY" | "NOT_LATE_ONLY" | (string & {});
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesCourseWorkStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  userId: Schema.optional(Schema.String).pipe(T.HttpQuery("userId")),
  states: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("states")),
  late: Schema.optional(Schema.String).pipe(T.HttpQuery("late")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions" }),
  svc,
) as unknown as Schema.Schema<ListCoursesCourseWorkStudentSubmissionsRequest>;

export type ListCoursesCourseWorkStudentSubmissionsResponse = ListStudentSubmissionsResponse;
export const ListCoursesCourseWorkStudentSubmissionsResponse = ListStudentSubmissionsResponse;

export type ListCoursesCourseWorkStudentSubmissionsError = CommonErrors;

export const listCoursesCourseWorkStudentSubmissions = API.makePaginated(() => ({
  input: ListCoursesCourseWorkStudentSubmissionsRequest,
  output: ListCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Turns in a student submission. Turning in a student submission transfers ownership of attached Drive files to the teacher and may also update the submission state. This may only be called by the student that owns the specified student submission. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, turn in the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export interface TurnInCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Request body */
  body?: TurnInStudentSubmissionRequest;
}

export const TurnInCoursesCourseWorkStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(TurnInStudentSubmissionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:turnIn", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TurnInCoursesCourseWorkStudentSubmissionsRequest>;

export type TurnInCoursesCourseWorkStudentSubmissionsResponse = Empty;
export const TurnInCoursesCourseWorkStudentSubmissionsResponse = Empty;

export type TurnInCoursesCourseWorkStudentSubmissionsError = CommonErrors;

export const turnInCoursesCourseWorkStudentSubmissions: API.OperationMethod<TurnInCoursesCourseWorkStudentSubmissionsRequest, TurnInCoursesCourseWorkStudentSubmissionsResponse, TurnInCoursesCourseWorkStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TurnInCoursesCourseWorkStudentSubmissionsRequest,
  output: TurnInCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

/** Reclaims a student submission on behalf of the student that owns it. Reclaiming a student submission transfers ownership of attached Drive files to the student and updates the submission state. Only the student that owns the requested student submission may call this method, and only for a student submission that has been turned in. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, unsubmit the requested student submission, or for access errors. * `FAILED_PRECONDITION` if the student submission has not been turned in. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export interface ReclaimCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Request body */
  body?: ReclaimStudentSubmissionRequest;
}

export const ReclaimCoursesCourseWorkStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(ReclaimStudentSubmissionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:reclaim", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReclaimCoursesCourseWorkStudentSubmissionsRequest>;

export type ReclaimCoursesCourseWorkStudentSubmissionsResponse = Empty;
export const ReclaimCoursesCourseWorkStudentSubmissionsResponse = Empty;

export type ReclaimCoursesCourseWorkStudentSubmissionsError = CommonErrors;

export const reclaimCoursesCourseWorkStudentSubmissions: API.OperationMethod<ReclaimCoursesCourseWorkStudentSubmissionsRequest, ReclaimCoursesCourseWorkStudentSubmissionsResponse, ReclaimCoursesCourseWorkStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReclaimCoursesCourseWorkStudentSubmissionsRequest,
  output: ReclaimCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

/** Returns a student submission. Returning a student submission transfers ownership of attached Drive files to the student and may also update the submission state. Unlike the Classroom application, returning a student submission does not set assignedGrade to the draftGrade value. Only a teacher of the course that contains the requested student submission may call this method. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, return the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export interface ReturnCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Request body */
  body?: ReturnStudentSubmissionRequest;
}

export const ReturnCoursesCourseWorkStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(ReturnStudentSubmissionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:return", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReturnCoursesCourseWorkStudentSubmissionsRequest>;

export type ReturnCoursesCourseWorkStudentSubmissionsResponse = Empty;
export const ReturnCoursesCourseWorkStudentSubmissionsResponse = Empty;

export type ReturnCoursesCourseWorkStudentSubmissionsError = CommonErrors;

export const returnCoursesCourseWorkStudentSubmissions: API.OperationMethod<ReturnCoursesCourseWorkStudentSubmissionsRequest, ReturnCoursesCourseWorkStudentSubmissionsResponse, ReturnCoursesCourseWorkStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReturnCoursesCourseWorkStudentSubmissionsRequest,
  output: ReturnCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

/** Modifies attachments of student submission. Attachments may only be added to student submissions belonging to course work objects with a `workType` of `ASSIGNMENT`. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, if the user is not permitted to modify attachments on the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist. */
export interface ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work. */
  courseWorkId: string;
  /** Identifier of the student submission. */
  id: string;
  /** Request body */
  body?: ModifyAttachmentsRequest;
}

export const ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(ModifyAttachmentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/studentSubmissions/{id}:modifyAttachments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest>;

export type ModifyAttachmentsCoursesCourseWorkStudentSubmissionsResponse = StudentSubmission;
export const ModifyAttachmentsCoursesCourseWorkStudentSubmissionsResponse = StudentSubmission;

export type ModifyAttachmentsCoursesCourseWorkStudentSubmissionsError = CommonErrors;

export const modifyAttachmentsCoursesCourseWorkStudentSubmissions: API.OperationMethod<ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest, ModifyAttachmentsCoursesCourseWorkStudentSubmissionsResponse, ModifyAttachmentsCoursesCourseWorkStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyAttachmentsCoursesCourseWorkStudentSubmissionsRequest,
  output: ModifyAttachmentsCoursesCourseWorkStudentSubmissionsResponse,
  errors: [],
}));

/** Returns an add-on attachment. Requires the add-on requesting the attachment to be the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetCoursesCourseWorkAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const GetCoursesCourseWorkAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesCourseWorkAddOnAttachmentsRequest>;

export type GetCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;
export const GetCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;

export type GetCoursesCourseWorkAddOnAttachmentsError = CommonErrors;

export const getCoursesCourseWorkAddOnAttachments: API.OperationMethod<GetCoursesCourseWorkAddOnAttachmentsRequest, GetCoursesCourseWorkAddOnAttachmentsResponse, GetCoursesCourseWorkAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesCourseWorkAddOnAttachmentsRequest,
  output: GetCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
}));

/** Returns all attachments created by an add-on under the post. Requires the add-on to have active attachments on the post or have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface ListCoursesCourseWorkAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Identifier of the post under the course whose attachments to enumerate. Deprecated, use `item_id` instead. */
  postId?: string;
  /** The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** A page token, received from a previous `ListAddOnAttachments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAddOnAttachments` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListCoursesCourseWorkAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments" }),
  svc,
) as unknown as Schema.Schema<ListCoursesCourseWorkAddOnAttachmentsRequest>;

export type ListCoursesCourseWorkAddOnAttachmentsResponse = ListAddOnAttachmentsResponse;
export const ListCoursesCourseWorkAddOnAttachmentsResponse = ListAddOnAttachmentsResponse;

export type ListCoursesCourseWorkAddOnAttachmentsError = CommonErrors;

export const listCoursesCourseWorkAddOnAttachments = API.makePaginated(() => ({
  input: ListCoursesCourseWorkAddOnAttachmentsRequest,
  output: ListCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an add-on attachment under a post. Requires the add-on to have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface CreateCoursesCourseWorkAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which to create the attachment. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match. */
  addOnToken?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const CreateCoursesCourseWorkAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
  body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesCourseWorkAddOnAttachmentsRequest>;

export type CreateCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;
export const CreateCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;

export type CreateCoursesCourseWorkAddOnAttachmentsError = CommonErrors;

export const createCoursesCourseWorkAddOnAttachments: API.OperationMethod<CreateCoursesCourseWorkAddOnAttachmentsRequest, CreateCoursesCourseWorkAddOnAttachmentsResponse, CreateCoursesCourseWorkAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesCourseWorkAddOnAttachmentsRequest,
  output: CreateCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
}));

/** Updates an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface PatchCoursesCourseWorkAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the post under which the attachment is attached. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the post under which the attachment is attached. */
  postId?: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachment` object. If a field that does not support empty values is included in the update mask and not set in the `AddOnAttachment` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `teacher_view_uri` * `student_view_uri` * `student_work_review_uri` * `due_date` * `due_time` * `max_points` */
  updateMask?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const PatchCoursesCourseWorkAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesCourseWorkAddOnAttachmentsRequest>;

export type PatchCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;
export const PatchCoursesCourseWorkAddOnAttachmentsResponse = AddOnAttachment;

export type PatchCoursesCourseWorkAddOnAttachmentsError = CommonErrors;

export const patchCoursesCourseWorkAddOnAttachments: API.OperationMethod<PatchCoursesCourseWorkAddOnAttachmentsRequest, PatchCoursesCourseWorkAddOnAttachmentsResponse, PatchCoursesCourseWorkAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesCourseWorkAddOnAttachmentsRequest,
  output: PatchCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
}));

/** Deletes an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface DeleteCoursesCourseWorkAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const DeleteCoursesCourseWorkAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesCourseWorkAddOnAttachmentsRequest>;

export type DeleteCoursesCourseWorkAddOnAttachmentsResponse = Empty;
export const DeleteCoursesCourseWorkAddOnAttachmentsResponse = Empty;

export type DeleteCoursesCourseWorkAddOnAttachmentsError = CommonErrors;

export const deleteCoursesCourseWorkAddOnAttachments: API.OperationMethod<DeleteCoursesCourseWorkAddOnAttachmentsRequest, DeleteCoursesCourseWorkAddOnAttachmentsResponse, DeleteCoursesCourseWorkAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesCourseWorkAddOnAttachmentsRequest,
  output: DeleteCoursesCourseWorkAddOnAttachmentsResponse,
  errors: [],
}));

/** Updates data associated with an add-on attachment submission. Requires the add-on to have been the original creator of the attachment and the attachment to have a positive `max_points` value set. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the student's submission. */
  submissionId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachmentStudentSubmission` object. The following fields may be specified by teachers: * `points_earned` */
  updateMask?: string;
  /** Request body */
  body?: AddOnAttachmentStudentSubmission;
}

export const PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  submissionId: Schema.String.pipe(T.HttpPath("submissionId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AddOnAttachmentStudentSubmission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest>;

export type PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse = AddOnAttachmentStudentSubmission;
export const PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse = AddOnAttachmentStudentSubmission;

export type PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsError = CommonErrors;

export const patchCoursesCourseWorkAddOnAttachmentsStudentSubmissions: API.OperationMethod<PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest, PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse, PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest,
  output: PatchCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse,
  errors: [],
}));

/** Returns a student submission for an add-on attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the student’s submission. */
  submissionId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  submissionId: Schema.String.pipe(T.HttpPath("submissionId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{itemId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest>;

export type GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse = AddOnAttachmentStudentSubmission;
export const GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse = AddOnAttachmentStudentSubmission;

export type GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsError = CommonErrors;

export const getCoursesCourseWorkAddOnAttachmentsStudentSubmissions: API.OperationMethod<GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest, GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse, GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsRequest,
  output: GetCoursesCourseWorkAddOnAttachmentsStudentSubmissionsResponse,
  errors: [],
}));

/** Updates a rubric. See google.classroom.v1.Rubric for details of which fields can be updated. Rubric update capabilities are [limited](/classroom/rubrics/limitations) once grading has started. The requesting user and course owner must have rubrics creation capabilities. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/rubrics/limitations#license-requirements). This request must be made by the Google Cloud console of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the parent course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project didn't create the corresponding course work, if the user isn't permitted to make the requested modification to the rubric, or for access errors. This error code is also returned if grading has already started on the rubric. * `INVALID_ARGUMENT` if the request is malformed and for the following request error: * `RubricCriteriaInvalidFormat` * `NOT_FOUND` if the requested course, course work, or rubric doesn't exist or if the user doesn't have access to the corresponding course work. * `INTERNAL` if grading has already started on the rubric. */
export interface PatchCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Optional. Identifier of the rubric. */
  id: string;
  /** Optional. Mask that identifies which fields on the rubric to update. This field is required to do an update. The update fails if invalid fields are specified. There are multiple options to define the criteria of a rubric: the `source_spreadsheet_id` and the `criteria` list. Only one of these can be used at a time to define a rubric. The rubric `criteria` list is fully replaced by the rubric criteria specified in the update request. For example, if a criterion or level is missing from the request, it is deleted. New criteria and levels are added and an ID is assigned. Existing criteria and levels retain the previously assigned ID if the ID is specified in the request. The following fields can be specified by teachers: * `criteria` * `source_spreadsheet_id` */
  updateMask?: string;
  /** Request body */
  body?: Rubric;
}

export const PatchCoursesCourseWorkRubricsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Rubric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesCourseWorkRubricsRequest>;

export type PatchCoursesCourseWorkRubricsResponse = Rubric;
export const PatchCoursesCourseWorkRubricsResponse = Rubric;

export type PatchCoursesCourseWorkRubricsError = CommonErrors;

export const patchCoursesCourseWorkRubrics: API.OperationMethod<PatchCoursesCourseWorkRubricsRequest, PatchCoursesCourseWorkRubricsResponse, PatchCoursesCourseWorkRubricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesCourseWorkRubricsRequest,
  output: PatchCoursesCourseWorkRubricsResponse,
  errors: [],
}));

/** Creates a rubric. The requesting user and course owner must have rubrics creation capabilities. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/rubrics/limitations#license-requirements). For further details, see [Rubrics structure and known limitations](/classroom/rubrics/limitations). This request must be made by the Google Cloud console of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the parent course work item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user isn't permitted to create rubrics for course work in the requested course. * `INTERNAL` if the request has insufficient OAuth scopes. * `INVALID_ARGUMENT` if the request is malformed and for the following request error: * `RubricCriteriaInvalidFormat` * `NOT_FOUND` if the requested course or course work don't exist or the user doesn't have access to the course or course work. * `FAILED_PRECONDITION` for the following request error: * `AttachmentNotVisible` */
export interface CreateCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Request body */
  body?: Rubric;
}

export const CreateCoursesCourseWorkRubricsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  body: Schema.optional(Rubric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesCourseWorkRubricsRequest>;

export type CreateCoursesCourseWorkRubricsResponse = Rubric;
export const CreateCoursesCourseWorkRubricsResponse = Rubric;

export type CreateCoursesCourseWorkRubricsError = CommonErrors;

export const createCoursesCourseWorkRubrics: API.OperationMethod<CreateCoursesCourseWorkRubricsRequest, CreateCoursesCourseWorkRubricsResponse, CreateCoursesCourseWorkRubricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesCourseWorkRubricsRequest,
  output: CreateCoursesCourseWorkRubricsResponse,
  errors: [],
}));

/** Returns a rubric. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or rubric doesn't exist or if the user doesn't have access to the corresponding course work. */
export interface GetCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Required. Identifier of the rubric. */
  id: string;
}

export const GetCoursesCourseWorkRubricsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesCourseWorkRubricsRequest>;

export type GetCoursesCourseWorkRubricsResponse = Rubric;
export const GetCoursesCourseWorkRubricsResponse = Rubric;

export type GetCoursesCourseWorkRubricsError = CommonErrors;

export const getCoursesCourseWorkRubrics: API.OperationMethod<GetCoursesCourseWorkRubricsRequest, GetCoursesCourseWorkRubricsResponse, GetCoursesCourseWorkRubricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesCourseWorkRubricsRequest,
  output: GetCoursesCourseWorkRubricsResponse,
  errors: [],
}));

/** Returns a list of rubrics that the requester is permitted to view. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work doesn't exist or if the user doesn't have access to the corresponding course work. */
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

export const ListCoursesCourseWorkRubricsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics" }),
  svc,
) as unknown as Schema.Schema<ListCoursesCourseWorkRubricsRequest>;

export type ListCoursesCourseWorkRubricsResponse = ListRubricsResponse;
export const ListCoursesCourseWorkRubricsResponse = ListRubricsResponse;

export type ListCoursesCourseWorkRubricsError = CommonErrors;

export const listCoursesCourseWorkRubrics = API.makePaginated(() => ({
  input: ListCoursesCourseWorkRubricsRequest,
  output: ListCoursesCourseWorkRubricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a rubric. The requesting user and course owner must have rubrics creation capabilities. For details, see [licensing requirements](https://developers.google.com/workspace/classroom/rubrics/limitations#license-requirements). This request must be made by the Google Cloud console of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding rubric. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project didn't create the corresponding rubric, or if the requesting user isn't permitted to delete the requested rubric. * `NOT_FOUND` if no rubric exists with the requested ID or the user does not have access to the course, course work, or rubric. * `INVALID_ARGUMENT` if grading has already started on the rubric. */
export interface DeleteCoursesCourseWorkRubricsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the course work. */
  courseWorkId: string;
  /** Required. Identifier of the rubric. */
  id: string;
}

export const DeleteCoursesCourseWorkRubricsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkId: Schema.String.pipe(T.HttpPath("courseWorkId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesCourseWorkRubricsRequest>;

export type DeleteCoursesCourseWorkRubricsResponse = Empty;
export const DeleteCoursesCourseWorkRubricsResponse = Empty;

export type DeleteCoursesCourseWorkRubricsError = CommonErrors;

export const deleteCoursesCourseWorkRubrics: API.OperationMethod<DeleteCoursesCourseWorkRubricsRequest, DeleteCoursesCourseWorkRubricsResponse, DeleteCoursesCourseWorkRubricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesCourseWorkRubricsRequest,
  output: DeleteCoursesCourseWorkRubricsResponse,
  errors: [],
}));

/** Deletes an announcement. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding announcement item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding announcement, if the requesting user is not permitted to delete the requested course or for access errors. * `FAILED_PRECONDITION` if the requested announcement has already been deleted. * `NOT_FOUND` if no course exists with the requested ID. */
export interface DeleteCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the announcement to delete. This identifier is a Classroom-assigned identifier. */
  id: string;
}

export const DeleteCoursesAnnouncementsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/announcements/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesAnnouncementsRequest>;

export type DeleteCoursesAnnouncementsResponse = Empty;
export const DeleteCoursesAnnouncementsResponse = Empty;

export type DeleteCoursesAnnouncementsError = CommonErrors;

export const deleteCoursesAnnouncements: API.OperationMethod<DeleteCoursesAnnouncementsRequest, DeleteCoursesAnnouncementsResponse, DeleteCoursesAnnouncementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesAnnouncementsRequest,
  output: DeleteCoursesAnnouncementsResponse,
  errors: [],
}));

/** Creates an announcement. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create announcements in the requested course, share a Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. * `FAILED_PRECONDITION` for the following request error: * AttachmentNotVisible */
export interface CreateCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: Announcement;
}

export const CreateCoursesAnnouncementsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  body: Schema.optional(Announcement).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/announcements", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesAnnouncementsRequest>;

export type CreateCoursesAnnouncementsResponse = Announcement;
export const CreateCoursesAnnouncementsResponse = Announcement;

export type CreateCoursesAnnouncementsError = CommonErrors;

export const createCoursesAnnouncements: API.OperationMethod<CreateCoursesAnnouncementsRequest, CreateCoursesAnnouncementsResponse, CreateCoursesAnnouncementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesAnnouncementsRequest,
  output: CreateCoursesAnnouncementsResponse,
  errors: [],
}));

/** Returns an announcement. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or announcement, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or announcement does not exist. */
export interface GetCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the announcement. */
  id: string;
}

export const GetCoursesAnnouncementsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/announcements/{id}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesAnnouncementsRequest>;

export type GetCoursesAnnouncementsResponse = Announcement;
export const GetCoursesAnnouncementsResponse = Announcement;

export type GetCoursesAnnouncementsError = CommonErrors;

export const getCoursesAnnouncements: API.OperationMethod<GetCoursesAnnouncementsRequest, GetCoursesAnnouncementsResponse, GetCoursesAnnouncementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesAnnouncementsRequest,
  output: GetCoursesAnnouncementsResponse,
  errors: [],
}));

/** Returns a list of announcements that the requester is permitted to view. Course students may only view `PUBLISHED` announcements. Course teachers and domain administrators may view all announcements. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export interface ListCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Restriction on the `state` of announcements returned. If this argument is left unspecified, the default value is `PUBLISHED`. */
  announcementStates?: "ANNOUNCEMENT_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED" | (string & {})[];
  /** Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported field is `updateTime`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `updateTime asc`, `updateTime` */
  orderBy?: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesAnnouncementsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  announcementStates: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("announcementStates")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/announcements" }),
  svc,
) as unknown as Schema.Schema<ListCoursesAnnouncementsRequest>;

export type ListCoursesAnnouncementsResponse = ListAnnouncementsResponse;
export const ListCoursesAnnouncementsResponse = ListAnnouncementsResponse;

export type ListCoursesAnnouncementsError = CommonErrors;

export const listCoursesAnnouncements = API.makePaginated(() => ({
  input: ListCoursesAnnouncementsRequest,
  output: ListCoursesAnnouncementsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates one or more fields of an announcement. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding announcement or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if the requested announcement has already been deleted. * `NOT_FOUND` if the requested course or announcement does not exist */
export interface PatchCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the announcement. */
  id: string;
  /** Mask that identifies which fields on the announcement to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the Announcement object. If a field that does not support empty values is included in the update mask and not set in the Announcement object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `text` * `state` * `scheduled_time` */
  updateMask?: string;
  /** Request body */
  body?: Announcement;
}

export const PatchCoursesAnnouncementsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Announcement).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/announcements/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesAnnouncementsRequest>;

export type PatchCoursesAnnouncementsResponse = Announcement;
export const PatchCoursesAnnouncementsResponse = Announcement;

export type PatchCoursesAnnouncementsError = CommonErrors;

export const patchCoursesAnnouncements: API.OperationMethod<PatchCoursesAnnouncementsRequest, PatchCoursesAnnouncementsResponse, PatchCoursesAnnouncementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesAnnouncementsRequest,
  output: PatchCoursesAnnouncementsResponse,
  errors: [],
}));

/** Modifies assignee mode and options of an announcement. Only a teacher of the course that contains the announcement may call this method. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist. * `FAILED_PRECONDITION` for the following request error: * EmptyAssignees */
export interface ModifyAssigneesCoursesAnnouncementsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the announcement. */
  id: string;
  /** Request body */
  body?: ModifyAnnouncementAssigneesRequest;
}

export const ModifyAssigneesCoursesAnnouncementsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  body: Schema.optional(ModifyAnnouncementAssigneesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/announcements/{id}:modifyAssignees", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyAssigneesCoursesAnnouncementsRequest>;

export type ModifyAssigneesCoursesAnnouncementsResponse = Announcement;
export const ModifyAssigneesCoursesAnnouncementsResponse = Announcement;

export type ModifyAssigneesCoursesAnnouncementsError = CommonErrors;

export const modifyAssigneesCoursesAnnouncements: API.OperationMethod<ModifyAssigneesCoursesAnnouncementsRequest, ModifyAssigneesCoursesAnnouncementsResponse, ModifyAssigneesCoursesAnnouncementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyAssigneesCoursesAnnouncementsRequest,
  output: ModifyAssigneesCoursesAnnouncementsResponse,
  errors: [],
}));

/** Gets metadata for Classroom add-ons in the context of a specific post. To maintain the integrity of its own data and permissions model, an add-on should call this to validate query parameters and the requesting user's role whenever the add-on is opened in an [iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/iframes-overview). This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetAddOnContextCoursesAnnouncementsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. The authorization token is required when neither of the following is true: * The add-on has attachments on the post. * The developer project issuing the request is the same project that created the post. */
  addOnToken?: string;
  /** Optional. The identifier of the attachment. This field is required for all requests except when the user is in the [Attachment Discovery iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/attachment-discovery-iframe). */
  attachmentId?: string;
}

export const GetAddOnContextCoursesAnnouncementsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
  attachmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("attachmentId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/announcements/{itemId}/addOnContext" }),
  svc,
) as unknown as Schema.Schema<GetAddOnContextCoursesAnnouncementsRequest>;

export type GetAddOnContextCoursesAnnouncementsResponse = AddOnContext;
export const GetAddOnContextCoursesAnnouncementsResponse = AddOnContext;

export type GetAddOnContextCoursesAnnouncementsError = CommonErrors;

export const getAddOnContextCoursesAnnouncements: API.OperationMethod<GetAddOnContextCoursesAnnouncementsRequest, GetAddOnContextCoursesAnnouncementsResponse, GetAddOnContextCoursesAnnouncementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAddOnContextCoursesAnnouncementsRequest,
  output: GetAddOnContextCoursesAnnouncementsResponse,
  errors: [],
}));

/** Returns an add-on attachment. Requires the add-on requesting the attachment to be the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const GetCoursesAnnouncementsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments/{attachmentId}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesAnnouncementsAddOnAttachmentsRequest>;

export type GetCoursesAnnouncementsAddOnAttachmentsResponse = AddOnAttachment;
export const GetCoursesAnnouncementsAddOnAttachmentsResponse = AddOnAttachment;

export type GetCoursesAnnouncementsAddOnAttachmentsError = CommonErrors;

export const getCoursesAnnouncementsAddOnAttachments: API.OperationMethod<GetCoursesAnnouncementsAddOnAttachmentsRequest, GetCoursesAnnouncementsAddOnAttachmentsResponse, GetCoursesAnnouncementsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesAnnouncementsAddOnAttachmentsRequest,
  output: GetCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
}));

/** Returns all attachments created by an add-on under the post. Requires the add-on to have active attachments on the post or have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface ListCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Identifier of the post under the course whose attachments to enumerate. Deprecated, use `item_id` instead. */
  postId?: string;
  /** The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** A page token, received from a previous `ListAddOnAttachments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAddOnAttachments` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListCoursesAnnouncementsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments" }),
  svc,
) as unknown as Schema.Schema<ListCoursesAnnouncementsAddOnAttachmentsRequest>;

export type ListCoursesAnnouncementsAddOnAttachmentsResponse = ListAddOnAttachmentsResponse;
export const ListCoursesAnnouncementsAddOnAttachmentsResponse = ListAddOnAttachmentsResponse;

export type ListCoursesAnnouncementsAddOnAttachmentsError = CommonErrors;

export const listCoursesAnnouncementsAddOnAttachments = API.makePaginated(() => ({
  input: ListCoursesAnnouncementsAddOnAttachmentsRequest,
  output: ListCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an add-on attachment under a post. Requires the add-on to have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface CreateCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which to create the attachment. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match. */
  addOnToken?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const CreateCoursesAnnouncementsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
  body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesAnnouncementsAddOnAttachmentsRequest>;

export type CreateCoursesAnnouncementsAddOnAttachmentsResponse = AddOnAttachment;
export const CreateCoursesAnnouncementsAddOnAttachmentsResponse = AddOnAttachment;

export type CreateCoursesAnnouncementsAddOnAttachmentsError = CommonErrors;

export const createCoursesAnnouncementsAddOnAttachments: API.OperationMethod<CreateCoursesAnnouncementsAddOnAttachmentsRequest, CreateCoursesAnnouncementsAddOnAttachmentsResponse, CreateCoursesAnnouncementsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesAnnouncementsAddOnAttachmentsRequest,
  output: CreateCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
}));

/** Updates an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface PatchCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the post under which the attachment is attached. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the post under which the attachment is attached. */
  postId?: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachment` object. If a field that does not support empty values is included in the update mask and not set in the `AddOnAttachment` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `teacher_view_uri` * `student_view_uri` * `student_work_review_uri` * `due_date` * `due_time` * `max_points` */
  updateMask?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const PatchCoursesAnnouncementsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments/{attachmentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesAnnouncementsAddOnAttachmentsRequest>;

export type PatchCoursesAnnouncementsAddOnAttachmentsResponse = AddOnAttachment;
export const PatchCoursesAnnouncementsAddOnAttachmentsResponse = AddOnAttachment;

export type PatchCoursesAnnouncementsAddOnAttachmentsError = CommonErrors;

export const patchCoursesAnnouncementsAddOnAttachments: API.OperationMethod<PatchCoursesAnnouncementsAddOnAttachmentsRequest, PatchCoursesAnnouncementsAddOnAttachmentsResponse, PatchCoursesAnnouncementsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesAnnouncementsAddOnAttachmentsRequest,
  output: PatchCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
}));

/** Deletes an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface DeleteCoursesAnnouncementsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const DeleteCoursesAnnouncementsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/announcements/{itemId}/addOnAttachments/{attachmentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesAnnouncementsAddOnAttachmentsRequest>;

export type DeleteCoursesAnnouncementsAddOnAttachmentsResponse = Empty;
export const DeleteCoursesAnnouncementsAddOnAttachmentsResponse = Empty;

export type DeleteCoursesAnnouncementsAddOnAttachmentsError = CommonErrors;

export const deleteCoursesAnnouncementsAddOnAttachments: API.OperationMethod<DeleteCoursesAnnouncementsAddOnAttachmentsRequest, DeleteCoursesAnnouncementsAddOnAttachmentsResponse, DeleteCoursesAnnouncementsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesAnnouncementsAddOnAttachmentsRequest,
  output: DeleteCoursesAnnouncementsAddOnAttachmentsResponse,
  errors: [],
}));

/** Creates a course work material. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create course work material in the requested course, share a Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request is malformed or if more than 20 * materials are provided. * `NOT_FOUND` if the requested course does not exist. * `FAILED_PRECONDITION` for the following request error: * AttachmentNotVisible */
export interface CreateCoursesCourseWorkMaterialsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: CourseWorkMaterial;
}

export const CreateCoursesCourseWorkMaterialsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  body: Schema.optional(CourseWorkMaterial).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWorkMaterials", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesCourseWorkMaterialsRequest>;

export type CreateCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;
export const CreateCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;

export type CreateCoursesCourseWorkMaterialsError = CommonErrors;

export const createCoursesCourseWorkMaterials: API.OperationMethod<CreateCoursesCourseWorkMaterialsRequest, CreateCoursesCourseWorkMaterialsResponse, CreateCoursesCourseWorkMaterialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesCourseWorkMaterialsRequest,
  output: CreateCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

/** Returns a course work material. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work material, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work material does not exist. */
export interface GetCoursesCourseWorkMaterialsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work material. */
  id: string;
}

export const GetCoursesCourseWorkMaterialsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWorkMaterials/{id}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesCourseWorkMaterialsRequest>;

export type GetCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;
export const GetCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;

export type GetCoursesCourseWorkMaterialsError = CommonErrors;

export const getCoursesCourseWorkMaterials: API.OperationMethod<GetCoursesCourseWorkMaterialsRequest, GetCoursesCourseWorkMaterialsResponse, GetCoursesCourseWorkMaterialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesCourseWorkMaterialsRequest,
  output: GetCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

/** Returns a list of course work material that the requester is permitted to view. Course students may only view `PUBLISHED` course work material. Course teachers and domain administrators may view all course work material. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export interface ListCoursesCourseWorkMaterialsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Restriction on the work status to return. Only course work material that matches is returned. If unspecified, items with a work status of `PUBLISHED` is returned. */
  courseWorkMaterialStates?: "COURSEWORK_MATERIAL_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED" | (string & {})[];
  /** Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported field is `updateTime`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `updateTime asc`, `updateTime` */
  orderBy?: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Optional filtering for course work material with at least one link material whose URL partially matches the provided string. */
  materialLink?: string;
  /** Optional filtering for course work material with at least one Drive material whose ID matches the provided string. If `material_link` is also specified, course work material must have materials matching both filters. */
  materialDriveId?: string;
}

export const ListCoursesCourseWorkMaterialsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  courseWorkMaterialStates: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("courseWorkMaterialStates")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  materialLink: Schema.optional(Schema.String).pipe(T.HttpQuery("materialLink")),
  materialDriveId: Schema.optional(Schema.String).pipe(T.HttpQuery("materialDriveId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWorkMaterials" }),
  svc,
) as unknown as Schema.Schema<ListCoursesCourseWorkMaterialsRequest>;

export type ListCoursesCourseWorkMaterialsResponse = ListCourseWorkMaterialResponse;
export const ListCoursesCourseWorkMaterialsResponse = ListCourseWorkMaterialResponse;

export type ListCoursesCourseWorkMaterialsError = CommonErrors;

export const listCoursesCourseWorkMaterials = API.makePaginated(() => ({
  input: ListCoursesCourseWorkMaterialsRequest,
  output: ListCoursesCourseWorkMaterialsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates one or more fields of a course work material. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if the requested course work material has already been deleted. * `NOT_FOUND` if the requested course or course work material does not exist */
export interface PatchCoursesCourseWorkMaterialsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work material. */
  id: string;
  /** Mask that identifies which fields on the course work material to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the course work material object. If a field that does not support empty values is included in the update mask and not set in the course work material object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `description` * `state` * `scheduled_time` * `topic_id` */
  updateMask?: string;
  /** Request body */
  body?: CourseWorkMaterial;
}

export const PatchCoursesCourseWorkMaterialsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CourseWorkMaterial).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/courseWorkMaterials/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesCourseWorkMaterialsRequest>;

export type PatchCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;
export const PatchCoursesCourseWorkMaterialsResponse = CourseWorkMaterial;

export type PatchCoursesCourseWorkMaterialsError = CommonErrors;

export const patchCoursesCourseWorkMaterials: API.OperationMethod<PatchCoursesCourseWorkMaterialsRequest, PatchCoursesCourseWorkMaterialsResponse, PatchCoursesCourseWorkMaterialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesCourseWorkMaterialsRequest,
  output: PatchCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

/** Deletes a course work material. This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work material item. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work material, if the requesting user is not permitted to delete the requested course or for access errors. * `FAILED_PRECONDITION` if the requested course work material has already been deleted. * `NOT_FOUND` if no course exists with the requested ID. */
export interface DeleteCoursesCourseWorkMaterialsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the course work material to delete. This identifier is a Classroom-assigned identifier. */
  id: string;
}

export const DeleteCoursesCourseWorkMaterialsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/courseWorkMaterials/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesCourseWorkMaterialsRequest>;

export type DeleteCoursesCourseWorkMaterialsResponse = Empty;
export const DeleteCoursesCourseWorkMaterialsResponse = Empty;

export type DeleteCoursesCourseWorkMaterialsError = CommonErrors;

export const deleteCoursesCourseWorkMaterials: API.OperationMethod<DeleteCoursesCourseWorkMaterialsRequest, DeleteCoursesCourseWorkMaterialsResponse, DeleteCoursesCourseWorkMaterialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesCourseWorkMaterialsRequest,
  output: DeleteCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

/** Gets metadata for Classroom add-ons in the context of a specific post. To maintain the integrity of its own data and permissions model, an add-on should call this to validate query parameters and the requesting user's role whenever the add-on is opened in an [iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/iframes-overview). This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetAddOnContextCoursesCourseWorkMaterialsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. The authorization token is required when neither of the following is true: * The add-on has attachments on the post. * The developer project issuing the request is the same project that created the post. */
  addOnToken?: string;
  /** Optional. The identifier of the attachment. This field is required for all requests except when the user is in the [Attachment Discovery iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/attachment-discovery-iframe). */
  attachmentId?: string;
}

export const GetAddOnContextCoursesCourseWorkMaterialsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
  attachmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("attachmentId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnContext" }),
  svc,
) as unknown as Schema.Schema<GetAddOnContextCoursesCourseWorkMaterialsRequest>;

export type GetAddOnContextCoursesCourseWorkMaterialsResponse = AddOnContext;
export const GetAddOnContextCoursesCourseWorkMaterialsResponse = AddOnContext;

export type GetAddOnContextCoursesCourseWorkMaterialsError = CommonErrors;

export const getAddOnContextCoursesCourseWorkMaterials: API.OperationMethod<GetAddOnContextCoursesCourseWorkMaterialsRequest, GetAddOnContextCoursesCourseWorkMaterialsResponse, GetAddOnContextCoursesCourseWorkMaterialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAddOnContextCoursesCourseWorkMaterialsRequest,
  output: GetAddOnContextCoursesCourseWorkMaterialsResponse,
  errors: [],
}));

/** Returns an add-on attachment. Requires the add-on requesting the attachment to be the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments/{attachmentId}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type GetCoursesCourseWorkMaterialsAddOnAttachmentsResponse = AddOnAttachment;
export const GetCoursesCourseWorkMaterialsAddOnAttachmentsResponse = AddOnAttachment;

export type GetCoursesCourseWorkMaterialsAddOnAttachmentsError = CommonErrors;

export const getCoursesCourseWorkMaterialsAddOnAttachments: API.OperationMethod<GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest, GetCoursesCourseWorkMaterialsAddOnAttachmentsResponse, GetCoursesCourseWorkMaterialsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: GetCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
}));

/** Returns all attachments created by an add-on under the post. Requires the add-on to have active attachments on the post or have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Identifier of the post under the course whose attachments to enumerate. Deprecated, use `item_id` instead. */
  postId?: string;
  /** The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** A page token, received from a previous `ListAddOnAttachments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAddOnAttachments` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments" }),
  svc,
) as unknown as Schema.Schema<ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type ListCoursesCourseWorkMaterialsAddOnAttachmentsResponse = ListAddOnAttachmentsResponse;
export const ListCoursesCourseWorkMaterialsAddOnAttachmentsResponse = ListAddOnAttachmentsResponse;

export type ListCoursesCourseWorkMaterialsAddOnAttachmentsError = CommonErrors;

export const listCoursesCourseWorkMaterialsAddOnAttachments = API.makePaginated(() => ({
  input: ListCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: ListCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an add-on attachment under a post. Requires the add-on to have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which to create the attachment. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match. */
  addOnToken?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
  body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type CreateCoursesCourseWorkMaterialsAddOnAttachmentsResponse = AddOnAttachment;
export const CreateCoursesCourseWorkMaterialsAddOnAttachmentsResponse = AddOnAttachment;

export type CreateCoursesCourseWorkMaterialsAddOnAttachmentsError = CommonErrors;

export const createCoursesCourseWorkMaterialsAddOnAttachments: API.OperationMethod<CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest, CreateCoursesCourseWorkMaterialsAddOnAttachmentsResponse, CreateCoursesCourseWorkMaterialsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: CreateCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
}));

/** Updates an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the post under which the attachment is attached. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the post under which the attachment is attached. */
  postId?: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachment` object. If a field that does not support empty values is included in the update mask and not set in the `AddOnAttachment` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `teacher_view_uri` * `student_view_uri` * `student_work_review_uri` * `due_date` * `due_time` * `max_points` */
  updateMask?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments/{attachmentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type PatchCoursesCourseWorkMaterialsAddOnAttachmentsResponse = AddOnAttachment;
export const PatchCoursesCourseWorkMaterialsAddOnAttachmentsResponse = AddOnAttachment;

export type PatchCoursesCourseWorkMaterialsAddOnAttachmentsError = CommonErrors;

export const patchCoursesCourseWorkMaterialsAddOnAttachments: API.OperationMethod<PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest, PatchCoursesCourseWorkMaterialsAddOnAttachmentsResponse, PatchCoursesCourseWorkMaterialsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: PatchCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
}));

/** Deletes an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId?: string;
}

export const DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/courseWorkMaterials/{itemId}/addOnAttachments/{attachmentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest>;

export type DeleteCoursesCourseWorkMaterialsAddOnAttachmentsResponse = Empty;
export const DeleteCoursesCourseWorkMaterialsAddOnAttachmentsResponse = Empty;

export type DeleteCoursesCourseWorkMaterialsAddOnAttachmentsError = CommonErrors;

export const deleteCoursesCourseWorkMaterialsAddOnAttachments: API.OperationMethod<DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest, DeleteCoursesCourseWorkMaterialsAddOnAttachmentsResponse, DeleteCoursesCourseWorkMaterialsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesCourseWorkMaterialsAddOnAttachmentsRequest,
  output: DeleteCoursesCourseWorkMaterialsAddOnAttachmentsResponse,
  errors: [],
}));

/** Creates a topic. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create a topic in the requested course, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `ALREADY_EXISTS` if there exists a topic in the course with the same name. * `FAILED_PRECONDITION` for the following request error: * CourseTopicLimitReached * `NOT_FOUND` if the requested course does not exist. */
export interface CreateCoursesTopicsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: Topic;
}

export const CreateCoursesTopicsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  body: Schema.optional(Topic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/topics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesTopicsRequest>;

export type CreateCoursesTopicsResponse = Topic;
export const CreateCoursesTopicsResponse = Topic;

export type CreateCoursesTopicsError = CommonErrors;

export const createCoursesTopics: API.OperationMethod<CreateCoursesTopicsRequest, CreateCoursesTopicsResponse, CreateCoursesTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesTopicsRequest,
  output: CreateCoursesTopicsResponse,
  errors: [],
}));

/** Updates one or more fields of a topic. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding topic or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if there exists a topic in the course with the same name. * `NOT_FOUND` if the requested course or topic does not exist */
export interface PatchCoursesTopicsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the topic. */
  id: string;
  /** Mask that identifies which fields on the topic to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the Topic object. If a field that does not support empty values is included in the update mask and not set in the Topic object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified: * `name` */
  updateMask?: string;
  /** Request body */
  body?: Topic;
}

export const PatchCoursesTopicsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Topic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/topics/{id}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesTopicsRequest>;

export type PatchCoursesTopicsResponse = Topic;
export const PatchCoursesTopicsResponse = Topic;

export type PatchCoursesTopicsError = CommonErrors;

export const patchCoursesTopics: API.OperationMethod<PatchCoursesTopicsRequest, PatchCoursesTopicsResponse, PatchCoursesTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesTopicsRequest,
  output: PatchCoursesTopicsResponse,
  errors: [],
}));

/** Deletes a topic. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not allowed to delete the requested topic or for access errors. * `FAILED_PRECONDITION` if the requested topic has already been deleted. * `NOT_FOUND` if no course or topic exists with the requested ID. */
export interface DeleteCoursesTopicsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the topic to delete. */
  id: string;
}

export const DeleteCoursesTopicsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/topics/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesTopicsRequest>;

export type DeleteCoursesTopicsResponse = Empty;
export const DeleteCoursesTopicsResponse = Empty;

export type DeleteCoursesTopicsError = CommonErrors;

export const deleteCoursesTopics: API.OperationMethod<DeleteCoursesTopicsRequest, DeleteCoursesTopicsResponse, DeleteCoursesTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesTopicsRequest,
  output: DeleteCoursesTopicsResponse,
  errors: [],
}));

/** Returns a topic. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or topic, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or topic does not exist. */
export interface GetCoursesTopicsRequest {
  /** Identifier of the course. */
  courseId: string;
  /** Identifier of the topic. */
  id: string;
}

export const GetCoursesTopicsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/topics/{id}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesTopicsRequest>;

export type GetCoursesTopicsResponse = Topic;
export const GetCoursesTopicsResponse = Topic;

export type GetCoursesTopicsError = CommonErrors;

export const getCoursesTopics: API.OperationMethod<GetCoursesTopicsRequest, GetCoursesTopicsResponse, GetCoursesTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesTopicsRequest,
  output: GetCoursesTopicsResponse,
  errors: [],
}));

/** Returns the list of topics that the requester is permitted to view. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. */
export interface ListCoursesTopicsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesTopicsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/topics" }),
  svc,
) as unknown as Schema.Schema<ListCoursesTopicsRequest>;

export type ListCoursesTopicsResponse = ListTopicResponse;
export const ListCoursesTopicsResponse = ListTopicResponse;

export type ListCoursesTopicsError = CommonErrors;

export const listCoursesTopics = API.makePaginated(() => ({
  input: ListCoursesTopicsRequest,
  output: ListCoursesTopicsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets metadata for Classroom add-ons in the context of a specific post. To maintain the integrity of its own data and permissions model, an add-on should call this to validate query parameters and the requesting user's role whenever the add-on is opened in an [iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/iframes-overview). This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetAddOnContextCoursesPostsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. The authorization token is required when neither of the following is true: * The add-on has attachments on the post. * The developer project issuing the request is the same project that created the post. */
  addOnToken?: string;
  /** Optional. The identifier of the attachment. This field is required for all requests except when the user is in the [Attachment Discovery iframe](https://developers.google.com/workspace/classroom/add-ons/get-started/iframes/attachment-discovery-iframe). */
  attachmentId?: string;
}

export const GetAddOnContextCoursesPostsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
  addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
  attachmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("attachmentId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/posts/{postId}/addOnContext" }),
  svc,
) as unknown as Schema.Schema<GetAddOnContextCoursesPostsRequest>;

export type GetAddOnContextCoursesPostsResponse = AddOnContext;
export const GetAddOnContextCoursesPostsResponse = AddOnContext;

export type GetAddOnContextCoursesPostsError = CommonErrors;

export const getAddOnContextCoursesPosts: API.OperationMethod<GetAddOnContextCoursesPostsRequest, GetAddOnContextCoursesPostsResponse, GetAddOnContextCoursesPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAddOnContextCoursesPostsRequest,
  output: GetAddOnContextCoursesPostsResponse,
  errors: [],
}));

/** Returns an add-on attachment. Requires the add-on requesting the attachment to be the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
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

export const GetCoursesPostsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesPostsAddOnAttachmentsRequest>;

export type GetCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;
export const GetCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;

export type GetCoursesPostsAddOnAttachmentsError = CommonErrors;

export const getCoursesPostsAddOnAttachments: API.OperationMethod<GetCoursesPostsAddOnAttachmentsRequest, GetCoursesPostsAddOnAttachmentsResponse, GetCoursesPostsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesPostsAddOnAttachmentsRequest,
  output: GetCoursesPostsAddOnAttachmentsResponse,
  errors: [],
}));

/** Returns all attachments created by an add-on under the post. Requires the add-on to have active attachments on the post or have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface ListCoursesPostsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Identifier of the post under the course whose attachments to enumerate. Deprecated, use `item_id` instead. */
  postId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** A page token, received from a previous `ListAddOnAttachments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAddOnAttachments` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListCoursesPostsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments" }),
  svc,
) as unknown as Schema.Schema<ListCoursesPostsAddOnAttachmentsRequest>;

export type ListCoursesPostsAddOnAttachmentsResponse = ListAddOnAttachmentsResponse;
export const ListCoursesPostsAddOnAttachmentsResponse = ListAddOnAttachmentsResponse;

export type ListCoursesPostsAddOnAttachmentsError = CommonErrors;

export const listCoursesPostsAddOnAttachments = API.makePaginated(() => ({
  input: ListCoursesPostsAddOnAttachmentsRequest,
  output: ListCoursesPostsAddOnAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an add-on attachment under a post. Requires the add-on to have permission to create new attachments on the post. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface CreateCoursesPostsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which to create the attachment. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match. */
  addOnToken?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const CreateCoursesPostsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
  addOnToken: Schema.optional(Schema.String).pipe(T.HttpQuery("addOnToken")),
  body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesPostsAddOnAttachmentsRequest>;

export type CreateCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;
export const CreateCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;

export type CreateCoursesPostsAddOnAttachmentsError = CommonErrors;

export const createCoursesPostsAddOnAttachments: API.OperationMethod<CreateCoursesPostsAddOnAttachmentsRequest, CreateCoursesPostsAddOnAttachmentsResponse, CreateCoursesPostsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesPostsAddOnAttachmentsRequest,
  output: CreateCoursesPostsAddOnAttachmentsResponse,
  errors: [],
}));

/** Updates an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface PatchCoursesPostsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Required. Identifier of the post under which the attachment is attached. */
  postId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Identifier of the post under which the attachment is attached. */
  itemId?: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachment` object. If a field that does not support empty values is included in the update mask and not set in the `AddOnAttachment` object, an `INVALID_ARGUMENT` error is returned. The following fields may be specified by teachers: * `title` * `teacher_view_uri` * `student_view_uri` * `student_work_review_uri` * `due_date` * `due_time` * `max_points` */
  updateMask?: string;
  /** Request body */
  body?: AddOnAttachment;
}

export const PatchCoursesPostsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AddOnAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesPostsAddOnAttachmentsRequest>;

export type PatchCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;
export const PatchCoursesPostsAddOnAttachmentsResponse = AddOnAttachment;

export type PatchCoursesPostsAddOnAttachmentsError = CommonErrors;

export const patchCoursesPostsAddOnAttachments: API.OperationMethod<PatchCoursesPostsAddOnAttachmentsRequest, PatchCoursesPostsAddOnAttachmentsResponse, PatchCoursesPostsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesPostsAddOnAttachmentsRequest,
  output: PatchCoursesPostsAddOnAttachmentsResponse,
  errors: [],
}));

/** Deletes an add-on attachment. Requires the add-on to have been the original creator of the attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface DeleteCoursesPostsAddOnAttachmentsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
}

export const DeleteCoursesPostsAddOnAttachmentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesPostsAddOnAttachmentsRequest>;

export type DeleteCoursesPostsAddOnAttachmentsResponse = Empty;
export const DeleteCoursesPostsAddOnAttachmentsResponse = Empty;

export type DeleteCoursesPostsAddOnAttachmentsError = CommonErrors;

export const deleteCoursesPostsAddOnAttachments: API.OperationMethod<DeleteCoursesPostsAddOnAttachmentsRequest, DeleteCoursesPostsAddOnAttachmentsResponse, DeleteCoursesPostsAddOnAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesPostsAddOnAttachmentsRequest,
  output: DeleteCoursesPostsAddOnAttachmentsResponse,
  errors: [],
}));

/** Updates data associated with an add-on attachment submission. Requires the add-on to have been the original creator of the attachment and the attachment to have a positive `max_points` value set. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the student's submission. */
  submissionId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
  /** Required. Mask that identifies which fields on the attachment to update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the `AddOnAttachmentStudentSubmission` object. The following fields may be specified by teachers: * `points_earned` */
  updateMask?: string;
  /** Request body */
  body?: AddOnAttachmentStudentSubmission;
}

export const PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  submissionId: Schema.String.pipe(T.HttpPath("submissionId")),
  itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AddOnAttachmentStudentSubmission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest>;

export type PatchCoursesPostsAddOnAttachmentsStudentSubmissionsResponse = AddOnAttachmentStudentSubmission;
export const PatchCoursesPostsAddOnAttachmentsStudentSubmissionsResponse = AddOnAttachmentStudentSubmission;

export type PatchCoursesPostsAddOnAttachmentsStudentSubmissionsError = CommonErrors;

export const patchCoursesPostsAddOnAttachmentsStudentSubmissions: API.OperationMethod<PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest, PatchCoursesPostsAddOnAttachmentsStudentSubmissionsResponse, PatchCoursesPostsAddOnAttachmentsStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCoursesPostsAddOnAttachmentsStudentSubmissionsRequest,
  output: PatchCoursesPostsAddOnAttachmentsStudentSubmissionsResponse,
  errors: [],
}));

/** Returns a student submission for an add-on attachment. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if one of the identified resources does not exist. */
export interface GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest {
  /** Required. Identifier of the course. */
  courseId: string;
  /** Optional. Deprecated, use `item_id` instead. */
  postId: string;
  /** Required. Identifier of the attachment. */
  attachmentId: string;
  /** Required. Identifier of the student’s submission. */
  submissionId: string;
  /** Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. This field is required, but is not marked as such while we are migrating from post_id. */
  itemId?: string;
}

export const GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  attachmentId: Schema.String.pipe(T.HttpPath("attachmentId")),
  submissionId: Schema.String.pipe(T.HttpPath("submissionId")),
  itemId: Schema.optional(Schema.String).pipe(T.HttpQuery("itemId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest>;

export type GetCoursesPostsAddOnAttachmentsStudentSubmissionsResponse = AddOnAttachmentStudentSubmission;
export const GetCoursesPostsAddOnAttachmentsStudentSubmissionsResponse = AddOnAttachmentStudentSubmission;

export type GetCoursesPostsAddOnAttachmentsStudentSubmissionsError = CommonErrors;

export const getCoursesPostsAddOnAttachmentsStudentSubmissions: API.OperationMethod<GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest, GetCoursesPostsAddOnAttachmentsStudentSubmissionsResponse, GetCoursesPostsAddOnAttachmentsStudentSubmissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesPostsAddOnAttachmentsStudentSubmissionsRequest,
  output: GetCoursesPostsAddOnAttachmentsStudentSubmissionsResponse,
  errors: [],
}));

/** Creates a teacher of a course. Domain administrators are permitted to [directly add](https://developers.google.com/workspace/classroom/guides/manage-users) users within their domain as teachers to courses within their domain. Non-admin users should send an Invitation instead. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create teachers in this course or for access errors. * `NOT_FOUND` if the requested course ID does not exist. * `FAILED_PRECONDITION` if the requested user's account is disabled, for the following request errors: * CourseMemberLimitReached * CourseNotModifiable * CourseTeacherLimitReached * UserGroupsMembershipLimitReached * InactiveCourseOwner * `ALREADY_EXISTS` if the user is already a teacher or student in the course. */
export interface CreateCoursesTeachersRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Request body */
  body?: Teacher;
}

export const CreateCoursesTeachersRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  body: Schema.optional(Teacher).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/teachers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesTeachersRequest>;

export type CreateCoursesTeachersResponse = Teacher;
export const CreateCoursesTeachersResponse = Teacher;

export type CreateCoursesTeachersError = CommonErrors;

export const createCoursesTeachers: API.OperationMethod<CreateCoursesTeachersRequest, CreateCoursesTeachersResponse, CreateCoursesTeachersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesTeachersRequest,
  output: CreateCoursesTeachersResponse,
  errors: [],
}));

/** Returns a teacher of a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to view teachers of this course or for access errors. * `NOT_FOUND` if no teacher of this course has the requested ID or if the course does not exist. */
export interface GetCoursesTeachersRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the teacher to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const GetCoursesTeachersRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/teachers/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesTeachersRequest>;

export type GetCoursesTeachersResponse = Teacher;
export const GetCoursesTeachersResponse = Teacher;

export type GetCoursesTeachersError = CommonErrors;

export const getCoursesTeachers: API.OperationMethod<GetCoursesTeachersRequest, GetCoursesTeachersResponse, GetCoursesTeachersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesTeachersRequest,
  output: GetCoursesTeachersResponse,
  errors: [],
}));

/** Removes the specified teacher from the specified course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete teachers of this course or for access errors. * `NOT_FOUND` if no teacher of this course has the requested ID or if the course does not exist. * `FAILED_PRECONDITION` if the requested ID belongs to the primary teacher of this course. * `FAILED_PRECONDITION` if the requested ID belongs to the owner of the course Drive folder. * `FAILED_PRECONDITION` if the course no longer has an active owner. */
export interface DeleteCoursesTeachersRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the teacher to delete. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const DeleteCoursesTeachersRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/teachers/{userId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesTeachersRequest>;

export type DeleteCoursesTeachersResponse = Empty;
export const DeleteCoursesTeachersResponse = Empty;

export type DeleteCoursesTeachersError = CommonErrors;

export const deleteCoursesTeachers: API.OperationMethod<DeleteCoursesTeachersRequest, DeleteCoursesTeachersResponse, DeleteCoursesTeachersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesTeachersRequest,
  output: DeleteCoursesTeachersResponse,
  errors: [],
}));

/** Returns a list of teachers of this course that the requester is permitted to view. This method returns the following error codes: * `NOT_FOUND` if the course does not exist. * `PERMISSION_DENIED` for access errors. */
export interface ListCoursesTeachersRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Maximum number of items to return. The default is 30 if unspecified or `0`. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesTeachersRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/teachers" }),
  svc,
) as unknown as Schema.Schema<ListCoursesTeachersRequest>;

export type ListCoursesTeachersResponse = ListTeachersResponse;
export const ListCoursesTeachersResponse = ListTeachersResponse;

export type ListCoursesTeachersError = CommonErrors;

export const listCoursesTeachers = API.makePaginated(() => ({
  input: ListCoursesTeachersRequest,
  output: ListCoursesTeachersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Adds a user as a student of a course. Domain administrators are permitted to [directly add](https://developers.google.com/workspace/classroom/guides/manage-users) users within their domain as students to courses within their domain. Students are permitted to add themselves to a course using an enrollment code. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create students in this course or for access errors. * `NOT_FOUND` if the requested course ID does not exist. * `FAILED_PRECONDITION` if the requested user's account is disabled, for the following request errors: * CourseMemberLimitReached * CourseNotModifiable * UserGroupsMembershipLimitReached * InactiveCourseOwner * `ALREADY_EXISTS` if the user is already a student or teacher in the course. */
export interface CreateCoursesStudentsRequest {
  /** Identifier of the course to create the student in. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Enrollment code of the course to create the student in. This code is required if userId corresponds to the requesting user; it may be omitted if the requesting user has administrative permissions to create students for any user. */
  enrollmentCode?: string;
  /** Request body */
  body?: Student;
}

export const CreateCoursesStudentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  enrollmentCode: Schema.optional(Schema.String).pipe(T.HttpQuery("enrollmentCode")),
  body: Schema.optional(Student).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/courses/{courseId}/students", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCoursesStudentsRequest>;

export type CreateCoursesStudentsResponse = Student;
export const CreateCoursesStudentsResponse = Student;

export type CreateCoursesStudentsError = CommonErrors;

export const createCoursesStudents: API.OperationMethod<CreateCoursesStudentsRequest, CreateCoursesStudentsResponse, CreateCoursesStudentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCoursesStudentsRequest,
  output: CreateCoursesStudentsResponse,
  errors: [],
}));

/** Returns a student of a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to view students of this course or for access errors. * `NOT_FOUND` if no student of this course has the requested ID or if the course does not exist. */
export interface GetCoursesStudentsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const GetCoursesStudentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/students/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetCoursesStudentsRequest>;

export type GetCoursesStudentsResponse = Student;
export const GetCoursesStudentsResponse = Student;

export type GetCoursesStudentsError = CommonErrors;

export const getCoursesStudents: API.OperationMethod<GetCoursesStudentsRequest, GetCoursesStudentsResponse, GetCoursesStudentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCoursesStudentsRequest,
  output: GetCoursesStudentsResponse,
  errors: [],
}));

/** Deletes a student of a course. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete students of this course or for access errors. * `NOT_FOUND` if no student of this course has the requested ID or if the course does not exist. */
export interface DeleteCoursesStudentsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Identifier of the student to delete. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const DeleteCoursesStudentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/courses/{courseId}/students/{userId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCoursesStudentsRequest>;

export type DeleteCoursesStudentsResponse = Empty;
export const DeleteCoursesStudentsResponse = Empty;

export type DeleteCoursesStudentsError = CommonErrors;

export const deleteCoursesStudents: API.OperationMethod<DeleteCoursesStudentsRequest, DeleteCoursesStudentsResponse, DeleteCoursesStudentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCoursesStudentsRequest,
  output: DeleteCoursesStudentsResponse,
  errors: [],
}));

/** Returns a list of students of this course that the requester is permitted to view. This method returns the following error codes: * `NOT_FOUND` if the course does not exist. * `PERMISSION_DENIED` for access errors. */
export interface ListCoursesStudentsRequest {
  /** Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias. */
  courseId: string;
  /** Maximum number of items to return. The default is 30 if unspecified or `0`. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListCoursesStudentsRequest = Schema.Struct({
  courseId: Schema.String.pipe(T.HttpPath("courseId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/courses/{courseId}/students" }),
  svc,
) as unknown as Schema.Schema<ListCoursesStudentsRequest>;

export type ListCoursesStudentsResponse = ListStudentsResponse;
export const ListCoursesStudentsResponse = ListStudentsResponse;

export type ListCoursesStudentsError = CommonErrors;

export const listCoursesStudents = API.makePaginated(() => ({
  input: ListCoursesStudentsRequest,
  output: ListCoursesStudentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a user profile. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to access this user profile, if no profile exists with the requested ID, or for access errors. */
export interface GetUserProfilesRequest {
  /** Identifier of the profile to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId: string;
}

export const GetUserProfilesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/userProfiles/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetUserProfilesRequest>;

export type GetUserProfilesResponse = UserProfile;
export const GetUserProfilesResponse = UserProfile;

export type GetUserProfilesError = CommonErrors;

export const getUserProfiles: API.OperationMethod<GetUserProfilesRequest, GetUserProfilesResponse, GetUserProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserProfilesRequest,
  output: GetUserProfilesResponse,
  errors: [],
}));

/** Returns a list of guardian invitations that the requesting user is permitted to view, filtered by the parameters provided. This method returns the following error codes: * `PERMISSION_DENIED` if a `student_id` is specified, and the requesting user is not permitted to view guardian invitations for that student, if `"-"` is specified as the `student_id` and the user is not a domain administrator, if guardians are not enabled for the domain in question, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API, nor the literal string `me`). May also be returned if an invalid `page_token` or `state` is provided. * `NOT_FOUND` if a `student_id` is specified, and its format can be recognized, but Classroom has no record of that student. */
export interface ListUserProfilesGuardianInvitationsRequest {
  /** The ID of the student whose guardian invitations are to be returned. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for all students that the requesting user is permitted to view guardian invitations. */
  studentId: string;
  /** If specified, only results with the specified `invited_email_address` are returned. */
  invitedEmailAddress?: string;
  /** If specified, only results with the specified `state` values are returned. Otherwise, results with a `state` of `PENDING` are returned. */
  states?: "GUARDIAN_INVITATION_STATE_UNSPECIFIED" | "PENDING" | "COMPLETE" | (string & {})[];
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
}

export const ListUserProfilesGuardianInvitationsRequest = Schema.Struct({
  studentId: Schema.String.pipe(T.HttpPath("studentId")),
  invitedEmailAddress: Schema.optional(Schema.String).pipe(T.HttpQuery("invitedEmailAddress")),
  states: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("states")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/userProfiles/{studentId}/guardianInvitations" }),
  svc,
) as unknown as Schema.Schema<ListUserProfilesGuardianInvitationsRequest>;

export type ListUserProfilesGuardianInvitationsResponse = ListGuardianInvitationsResponse;
export const ListUserProfilesGuardianInvitationsResponse = ListGuardianInvitationsResponse;

export type ListUserProfilesGuardianInvitationsError = CommonErrors;

export const listUserProfilesGuardianInvitations = API.makePaginated(() => ({
  input: ListUserProfilesGuardianInvitationsRequest,
  output: ListUserProfilesGuardianInvitationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a specific guardian invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to view guardian invitations for the student identified by the `student_id`, if guardians are not enabled for the domain in question, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API, nor the literal string `me`). * `NOT_FOUND` if Classroom cannot find any record of the given student or `invitation_id`. May also be returned if the student exists, but the requesting user does not have access to see that student. */
export interface GetUserProfilesGuardianInvitationsRequest {
  /** The ID of the student whose guardian invitation is being requested. */
  studentId: string;
  /** The `id` field of the `GuardianInvitation` being requested. */
  invitationId: string;
}

export const GetUserProfilesGuardianInvitationsRequest = Schema.Struct({
  studentId: Schema.String.pipe(T.HttpPath("studentId")),
  invitationId: Schema.String.pipe(T.HttpPath("invitationId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/userProfiles/{studentId}/guardianInvitations/{invitationId}" }),
  svc,
) as unknown as Schema.Schema<GetUserProfilesGuardianInvitationsRequest>;

export type GetUserProfilesGuardianInvitationsResponse = GuardianInvitation;
export const GetUserProfilesGuardianInvitationsResponse = GuardianInvitation;

export type GetUserProfilesGuardianInvitationsError = CommonErrors;

export const getUserProfilesGuardianInvitations: API.OperationMethod<GetUserProfilesGuardianInvitationsRequest, GetUserProfilesGuardianInvitationsResponse, GetUserProfilesGuardianInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserProfilesGuardianInvitationsRequest,
  output: GetUserProfilesGuardianInvitationsResponse,
  errors: [],
}));

/** Creates a guardian invitation, and sends an email to the guardian asking them to confirm that they are the student's guardian. Once the guardian accepts the invitation, their `state` will change to `COMPLETED` and they will start receiving guardian notifications. A `Guardian` resource will also be created to represent the active guardian. The request object must have the `student_id` and `invited_email_address` fields set. Failing to set these fields, or setting any other fields in the request, will result in an error. This method returns the following error codes: * `PERMISSION_DENIED` if the current user does not have permission to manage guardians, if the guardian in question has already rejected too many requests for that student, if guardians are not enabled for the domain in question, or for other access errors. * `RESOURCE_EXHAUSTED` if the student or guardian has exceeded the guardian link limit. * `INVALID_ARGUMENT` if the guardian email address is not valid (for example, if it is too long), or if the format of the student ID provided cannot be recognized (it is not an email address, nor a `user_id` from this API). This error will also be returned if read-only fields are set, or if the `state` field is set to to a value other than `PENDING`. * `NOT_FOUND` if the student ID provided is a valid student ID, but Classroom has no record of that student. * `ALREADY_EXISTS` if there is already a pending guardian invitation for the student and `invited_email_address` provided, or if the provided `invited_email_address` matches the Google account of an existing `Guardian` for this user. */
export interface CreateUserProfilesGuardianInvitationsRequest {
  /** ID of the student (in standard format) */
  studentId: string;
  /** Request body */
  body?: GuardianInvitation;
}

export const CreateUserProfilesGuardianInvitationsRequest = Schema.Struct({
  studentId: Schema.String.pipe(T.HttpPath("studentId")),
  body: Schema.optional(GuardianInvitation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/userProfiles/{studentId}/guardianInvitations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateUserProfilesGuardianInvitationsRequest>;

export type CreateUserProfilesGuardianInvitationsResponse = GuardianInvitation;
export const CreateUserProfilesGuardianInvitationsResponse = GuardianInvitation;

export type CreateUserProfilesGuardianInvitationsError = CommonErrors;

export const createUserProfilesGuardianInvitations: API.OperationMethod<CreateUserProfilesGuardianInvitationsRequest, CreateUserProfilesGuardianInvitationsResponse, CreateUserProfilesGuardianInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateUserProfilesGuardianInvitationsRequest,
  output: CreateUserProfilesGuardianInvitationsResponse,
  errors: [],
}));

/** Modifies a guardian invitation. Currently, the only valid modification is to change the `state` from `PENDING` to `COMPLETE`. This has the effect of withdrawing the invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the current user does not have permission to manage guardians, if guardians are not enabled for the domain in question or for other access errors. * `FAILED_PRECONDITION` if the guardian link is not in the `PENDING` state. * `INVALID_ARGUMENT` if the format of the student ID provided cannot be recognized (it is not an email address, nor a `user_id` from this API), or if the passed `GuardianInvitation` has a `state` other than `COMPLETE`, or if it modifies fields other than `state`. * `NOT_FOUND` if the student ID provided is a valid student ID, but Classroom has no record of that student, or if the `id` field does not refer to a guardian invitation known to Classroom. */
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

export const PatchUserProfilesGuardianInvitationsRequest = Schema.Struct({
  studentId: Schema.String.pipe(T.HttpPath("studentId")),
  invitationId: Schema.String.pipe(T.HttpPath("invitationId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GuardianInvitation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/userProfiles/{studentId}/guardianInvitations/{invitationId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUserProfilesGuardianInvitationsRequest>;

export type PatchUserProfilesGuardianInvitationsResponse = GuardianInvitation;
export const PatchUserProfilesGuardianInvitationsResponse = GuardianInvitation;

export type PatchUserProfilesGuardianInvitationsError = CommonErrors;

export const patchUserProfilesGuardianInvitations: API.OperationMethod<PatchUserProfilesGuardianInvitationsRequest, PatchUserProfilesGuardianInvitationsResponse, PatchUserProfilesGuardianInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUserProfilesGuardianInvitationsRequest,
  output: PatchUserProfilesGuardianInvitationsResponse,
  errors: [],
}));

/** Returns a list of guardians that the requesting user is permitted to view, restricted to those that match the request. To list guardians for any student that the requesting user may view guardians for, use the literal character `-` for the student ID. This method returns the following error codes: * `PERMISSION_DENIED` if a `student_id` is specified, and the requesting user is not permitted to view guardian information for that student, if `"-"` is specified as the `student_id` and the user is not a domain administrator, if guardians are not enabled for the domain in question, if the `invited_email_address` filter is set by a user who is not a domain administrator, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API, nor the literal string `me`). May also be returned if an invalid `page_token` is provided. * `NOT_FOUND` if a `student_id` is specified, and its format can be recognized, but Classroom has no record of that student. */
export interface ListUserProfilesGuardiansRequest {
  /** Filter results by the student who the guardian is linked to. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for all students that the requesting user has access to view. */
  studentId: string;
  /** Filter results by the email address that the original invitation was sent to, resulting in this guardian link. This filter can only be used by domain administrators. */
  invitedEmailAddress?: string;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
  /** Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results. */
  pageSize?: number;
}

export const ListUserProfilesGuardiansRequest = Schema.Struct({
  studentId: Schema.String.pipe(T.HttpPath("studentId")),
  invitedEmailAddress: Schema.optional(Schema.String).pipe(T.HttpQuery("invitedEmailAddress")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/userProfiles/{studentId}/guardians" }),
  svc,
) as unknown as Schema.Schema<ListUserProfilesGuardiansRequest>;

export type ListUserProfilesGuardiansResponse = ListGuardiansResponse;
export const ListUserProfilesGuardiansResponse = ListGuardiansResponse;

export type ListUserProfilesGuardiansError = CommonErrors;

export const listUserProfilesGuardians = API.makePaginated(() => ({
  input: ListUserProfilesGuardiansRequest,
  output: ListUserProfilesGuardiansResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a specific guardian. This method returns the following error codes: * `PERMISSION_DENIED` if no user that matches the provided `student_id` is visible to the requesting user, if the requesting user is not permitted to view guardian information for the student identified by the `student_id`, if guardians are not enabled for the domain in question, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API, nor the literal string `me`). * `NOT_FOUND` if the requesting user is permitted to view guardians for the requested `student_id`, but no `Guardian` record exists for that student that matches the provided `guardian_id`. */
export interface GetUserProfilesGuardiansRequest {
  /** The student whose guardian is being requested. One of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  studentId: string;
  /** The `id` field from a `Guardian`. */
  guardianId: string;
}

export const GetUserProfilesGuardiansRequest = Schema.Struct({
  studentId: Schema.String.pipe(T.HttpPath("studentId")),
  guardianId: Schema.String.pipe(T.HttpPath("guardianId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/userProfiles/{studentId}/guardians/{guardianId}" }),
  svc,
) as unknown as Schema.Schema<GetUserProfilesGuardiansRequest>;

export type GetUserProfilesGuardiansResponse = Guardian;
export const GetUserProfilesGuardiansResponse = Guardian;

export type GetUserProfilesGuardiansError = CommonErrors;

export const getUserProfilesGuardians: API.OperationMethod<GetUserProfilesGuardiansRequest, GetUserProfilesGuardiansResponse, GetUserProfilesGuardiansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserProfilesGuardiansRequest,
  output: GetUserProfilesGuardiansResponse,
  errors: [],
}));

/** Deletes a guardian. The guardian will no longer receive guardian notifications and the guardian will no longer be accessible via the API. This method returns the following error codes: * `PERMISSION_DENIED` if no user that matches the provided `student_id` is visible to the requesting user, if the requesting user is not permitted to manage guardians for the student identified by the `student_id`, if guardians are not enabled for the domain in question, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot be recognized (it is not an email address, nor a `student_id` from the API). * `NOT_FOUND` if the requesting user is permitted to modify guardians for the requested `student_id`, but no `Guardian` record exists for that student with the provided `guardian_id`. */
export interface DeleteUserProfilesGuardiansRequest {
  /** The student whose guardian is to be deleted. One of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  studentId: string;
  /** The `id` field from a `Guardian`. */
  guardianId: string;
}

export const DeleteUserProfilesGuardiansRequest = Schema.Struct({
  studentId: Schema.String.pipe(T.HttpPath("studentId")),
  guardianId: Schema.String.pipe(T.HttpPath("guardianId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/userProfiles/{studentId}/guardians/{guardianId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUserProfilesGuardiansRequest>;

export type DeleteUserProfilesGuardiansResponse = Empty;
export const DeleteUserProfilesGuardiansResponse = Empty;

export type DeleteUserProfilesGuardiansError = CommonErrors;

export const deleteUserProfilesGuardians: API.OperationMethod<DeleteUserProfilesGuardiansRequest, DeleteUserProfilesGuardiansResponse, DeleteUserProfilesGuardiansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUserProfilesGuardiansRequest,
  output: DeleteUserProfilesGuardiansResponse,
  errors: [],
}));

/** Creates an invitation. Only one invitation for a user and course may exist at a time. Delete and re-create an invitation to make changes. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to create invitations for this course or for access errors. * `NOT_FOUND` if the course or the user does not exist. * `FAILED_PRECONDITION`: * if the requested user's account is disabled. * if the user already has this role or a role with greater permissions. * for the following request errors: * IneligibleOwner * `ALREADY_EXISTS` if an invitation for the specified user and course already exists. */
export interface CreateInvitationsRequest {
  /** Request body */
  body?: Invitation;
}

export const CreateInvitationsRequest = Schema.Struct({
  body: Schema.optional(Invitation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/invitations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInvitationsRequest>;

export type CreateInvitationsResponse = Invitation;
export const CreateInvitationsResponse = Invitation;

export type CreateInvitationsError = CommonErrors;

export const createInvitations: API.OperationMethod<CreateInvitationsRequest, CreateInvitationsResponse, CreateInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInvitationsRequest,
  output: CreateInvitationsResponse,
  errors: [],
}));

/** Returns an invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to view the requested invitation or for access errors. * `NOT_FOUND` if no invitation exists with the requested ID. */
export interface GetInvitationsRequest {
  /** Identifier of the invitation to return. */
  id: string;
}

export const GetInvitationsRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/invitations/{id}" }),
  svc,
) as unknown as Schema.Schema<GetInvitationsRequest>;

export type GetInvitationsResponse = Invitation;
export const GetInvitationsResponse = Invitation;

export type GetInvitationsError = CommonErrors;

export const getInvitations: API.OperationMethod<GetInvitationsRequest, GetInvitationsResponse, GetInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInvitationsRequest,
  output: GetInvitationsResponse,
  errors: [],
}));

/** Deletes an invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested invitation or for access errors. * `NOT_FOUND` if no invitation exists with the requested ID. */
export interface DeleteInvitationsRequest {
  /** Identifier of the invitation to delete. */
  id: string;
}

export const DeleteInvitationsRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/invitations/{id}" }),
  svc,
) as unknown as Schema.Schema<DeleteInvitationsRequest>;

export type DeleteInvitationsResponse = Empty;
export const DeleteInvitationsResponse = Empty;

export type DeleteInvitationsError = CommonErrors;

export const deleteInvitations: API.OperationMethod<DeleteInvitationsRequest, DeleteInvitationsResponse, DeleteInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInvitationsRequest,
  output: DeleteInvitationsResponse,
  errors: [],
}));

/** Returns a list of invitations that the requesting user is permitted to view, restricted to those that match the list request. *Note:* At least one of `user_id` or `course_id` must be supplied. Both fields can be supplied. This method returns the following error codes: * `PERMISSION_DENIED` for access errors. */
export interface ListInvitationsRequest {
  /** Restricts returned invitations to those for a specific user. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user */
  userId?: string;
  /** Restricts returned invitations to those for a course with the specified identifier. */
  courseId?: string;
  /** Maximum number of items to return. The default is 500 if unspecified or `0`. The server may return fewer than the specified number of results. */
  pageSize?: number;
  /** nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned. The list request must be otherwise identical to the one that resulted in this token. */
  pageToken?: string;
}

export const ListInvitationsRequest = Schema.Struct({
  userId: Schema.optional(Schema.String).pipe(T.HttpQuery("userId")),
  courseId: Schema.optional(Schema.String).pipe(T.HttpQuery("courseId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/invitations" }),
  svc,
) as unknown as Schema.Schema<ListInvitationsRequest>;

export type ListInvitationsResponse_Op = ListInvitationsResponse;
export const ListInvitationsResponse_Op = ListInvitationsResponse;

export type ListInvitationsError = CommonErrors;

export const listInvitations = API.makePaginated(() => ({
  input: ListInvitationsRequest,
  output: ListInvitationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Accepts an invitation, removing it and adding the invited user to the teachers or students (as appropriate) of the specified course. Only the invited user may accept an invitation. This method returns the following error codes: * `PERMISSION_DENIED` if the requesting user is not permitted to accept the requested invitation or for access errors. * `FAILED_PRECONDITION` for the following request errors: * CourseMemberLimitReached * CourseNotModifiable * CourseTeacherLimitReached * UserGroupsMembershipLimitReached * `NOT_FOUND` if no invitation exists with the requested ID. */
export interface AcceptInvitationsRequest {
  /** Identifier of the invitation to accept. */
  id: string;
}

export const AcceptInvitationsRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "POST", path: "v1/invitations/{id}:accept", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcceptInvitationsRequest>;

export type AcceptInvitationsResponse = Empty;
export const AcceptInvitationsResponse = Empty;

export type AcceptInvitationsError = CommonErrors;

export const acceptInvitations: API.OperationMethod<AcceptInvitationsRequest, AcceptInvitationsResponse, AcceptInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcceptInvitationsRequest,
  output: AcceptInvitationsResponse,
  errors: [],
}));

/** Creates a `Registration`, causing Classroom to start sending notifications from the provided `feed` to the destination provided in `cloudPubSubTopic`. Returns the created `Registration`. Currently, this will be the same as the argument, but with server-assigned fields such as `expiry_time` and `id` filled in. Note that any value specified for the `expiry_time` or `id` fields will be ignored. While Classroom may validate the `cloudPubSubTopic` and return errors on a best effort basis, it is the caller's responsibility to ensure that it exists and that Classroom has permission to publish to it. This method may return the following error codes: * `PERMISSION_DENIED` if: * the authenticated user does not have permission to receive notifications from the requested field; or * the current user has not granted access to the current Cloud project with the appropriate scope for the requested feed. Note that domain-wide delegation of authority is not currently supported for this purpose. If the request has the appropriate scope, but no grant exists, a Request Errors is returned. * another access error is encountered. * `INVALID_ARGUMENT` if: * no `cloudPubsubTopic` is specified, or the specified `cloudPubsubTopic` is not valid; or * no `feed` is specified, or the specified `feed` is not valid. * `NOT_FOUND` if: * the specified `feed` cannot be located, or the requesting user does not have permission to determine whether or not it exists; or * the specified `cloudPubsubTopic` cannot be located, or Classroom has not been granted permission to publish to it. */
export interface CreateRegistrationsRequest {
  /** Request body */
  body?: Registration;
}

export const CreateRegistrationsRequest = Schema.Struct({
  body: Schema.optional(Registration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/registrations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateRegistrationsRequest>;

export type CreateRegistrationsResponse = Registration;
export const CreateRegistrationsResponse = Registration;

export type CreateRegistrationsError = CommonErrors;

export const createRegistrations: API.OperationMethod<CreateRegistrationsRequest, CreateRegistrationsResponse, CreateRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateRegistrationsRequest,
  output: CreateRegistrationsResponse,
  errors: [],
}));

/** Deletes a `Registration`, causing Classroom to stop sending notifications for that `Registration`. */
export interface DeleteRegistrationsRequest {
  /** The `registration_id` of the `Registration` to be deleted. */
  registrationId: string;
}

export const DeleteRegistrationsRequest = Schema.Struct({
  registrationId: Schema.String.pipe(T.HttpPath("registrationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/registrations/{registrationId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRegistrationsRequest>;

export type DeleteRegistrationsResponse = Empty;
export const DeleteRegistrationsResponse = Empty;

export type DeleteRegistrationsError = CommonErrors;

export const deleteRegistrations: API.OperationMethod<DeleteRegistrationsRequest, DeleteRegistrationsResponse, DeleteRegistrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRegistrationsRequest,
  output: DeleteRegistrationsResponse,
  errors: [],
}));

