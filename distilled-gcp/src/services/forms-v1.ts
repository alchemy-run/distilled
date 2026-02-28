// ==========================================================================
// Google Forms API (forms v1)
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
  name: "forms",
  version: "v1",
  rootUrl: "https://forms.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Info {
  /** Required. The title of the form which is visible to responders. */
  title?: string;
  /** Output only. The title of the document which is visible in Drive. If Info.title is empty, `document_title` may appear in its place in the Google Forms UI and be visible to responders. `document_title` can be set on create, but cannot be modified by a batchUpdate request. Please use the [Google Drive API](https://developers.google.com/drive/api/v3/reference/files/update) if you need to programmatically update `document_title`. */
  documentTitle?: string;
  /** The description of the form. */
  description?: string;
}

export const Info: Schema.Schema<Info> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  documentTitle: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Info" }) as any as Schema.Schema<Info>;

export interface QuizSettings {
  /** Whether this form is a quiz or not. When true, responses are graded based on question Grading. Upon setting to false, all question Grading is deleted. */
  isQuiz?: boolean;
}

export const QuizSettings: Schema.Schema<QuizSettings> = Schema.suspend(() => Schema.Struct({
  isQuiz: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "QuizSettings" }) as any as Schema.Schema<QuizSettings>;

export interface FormSettings {
  /** Settings related to quiz forms and grading. */
  quizSettings?: QuizSettings;
  /** Optional. The setting that determines whether the form collects email addresses from respondents. */
  emailCollectionType?: "EMAIL_COLLECTION_TYPE_UNSPECIFIED" | "DO_NOT_COLLECT" | "VERIFIED" | "RESPONDER_INPUT" | (string & {});
}

export const FormSettings: Schema.Schema<FormSettings> = Schema.suspend(() => Schema.Struct({
  quizSettings: Schema.optional(QuizSettings),
  emailCollectionType: Schema.optional(Schema.String),
})).annotate({ identifier: "FormSettings" }) as any as Schema.Schema<FormSettings>;

export interface MediaProperties {
  /** Position of the media. */
  alignment?: "ALIGNMENT_UNSPECIFIED" | "LEFT" | "RIGHT" | "CENTER" | (string & {});
  /** The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source. */
  width?: number;
}

export const MediaProperties: Schema.Schema<MediaProperties> = Schema.suspend(() => Schema.Struct({
  alignment: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
})).annotate({ identifier: "MediaProperties" }) as any as Schema.Schema<MediaProperties>;

export interface Image {
  /** Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched. */
  sourceUri?: string;
  /** Output only. A URI from which you can download the image; this is valid only for a limited time. */
  contentUri?: string;
  /** A description of the image that is shown on hover and read by screenreaders. */
  altText?: string;
  /** Properties of an image. */
  properties?: MediaProperties;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  sourceUri: Schema.optional(Schema.String),
  contentUri: Schema.optional(Schema.String),
  altText: Schema.optional(Schema.String),
  properties: Schema.optional(MediaProperties),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface Option {
  /** Section navigation type. */
  goToAction?: "GO_TO_ACTION_UNSPECIFIED" | "NEXT_SECTION" | "RESTART_FORM" | "SUBMIT_FORM" | (string & {});
  /** Item ID of section header to go to. */
  goToSectionId?: string;
  /** Required. The choice as presented to the user. */
  value?: string;
  /** Display image as an option. */
  image?: Image;
  /** Whether the option is "other". Currently only applies to `RADIO` and `CHECKBOX` choice types, but is not allowed in a QuestionGroupItem. */
  isOther?: boolean;
}

export const Option: Schema.Schema<Option> = Schema.suspend(() => Schema.Struct({
  goToAction: Schema.optional(Schema.String),
  goToSectionId: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  image: Schema.optional(Image),
  isOther: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Option" }) as any as Schema.Schema<Option>;

export interface ChoiceQuestion {
  /** Required. The type of choice question. */
  type?: "CHOICE_TYPE_UNSPECIFIED" | "RADIO" | "CHECKBOX" | "DROP_DOWN" | (string & {});
  /** Required. List of options that a respondent must choose from. */
  options?: Array<Option>;
  /** Whether the options should be displayed in random order for different instances of the quiz. This is often used to prevent cheating by respondents who might be looking at another respondent's screen, or to address bias in a survey that might be introduced by always putting the same options first or last. */
  shuffle?: boolean;
}

export const ChoiceQuestion: Schema.Schema<ChoiceQuestion> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  shuffle: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ChoiceQuestion" }) as any as Schema.Schema<ChoiceQuestion>;

export interface TextQuestion {
  /** Whether the question is a paragraph question or not. If not, the question is a short text question. */
  paragraph?: boolean;
}

export const TextQuestion: Schema.Schema<TextQuestion> = Schema.suspend(() => Schema.Struct({
  paragraph: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TextQuestion" }) as any as Schema.Schema<TextQuestion>;

export interface ScaleQuestion {
  /** Required. The lowest possible value for the scale. */
  low?: number;
  /** Required. The highest possible value for the scale. */
  high?: number;
  /** The label to display describing the lowest point on the scale. */
  lowLabel?: string;
  /** The label to display describing the highest point on the scale. */
  highLabel?: string;
}

export const ScaleQuestion: Schema.Schema<ScaleQuestion> = Schema.suspend(() => Schema.Struct({
  low: Schema.optional(Schema.Number),
  high: Schema.optional(Schema.Number),
  lowLabel: Schema.optional(Schema.String),
  highLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "ScaleQuestion" }) as any as Schema.Schema<ScaleQuestion>;

export interface DateQuestion {
  /** Whether to include the time as part of the question. */
  includeTime?: boolean;
  /** Whether to include the year as part of the question. */
  includeYear?: boolean;
}

export const DateQuestion: Schema.Schema<DateQuestion> = Schema.suspend(() => Schema.Struct({
  includeTime: Schema.optional(Schema.Boolean),
  includeYear: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DateQuestion" }) as any as Schema.Schema<DateQuestion>;

export interface TimeQuestion {
  /** `true` if the question is about an elapsed time. Otherwise it is about a time of day. */
  duration?: boolean;
}

export const TimeQuestion: Schema.Schema<TimeQuestion> = Schema.suspend(() => Schema.Struct({
  duration: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TimeQuestion" }) as any as Schema.Schema<TimeQuestion>;

export interface FileUploadQuestion {
  /** Required. The ID of the Drive folder where uploaded files are stored. */
  folderId?: string;
  /** File types accepted by this question. */
  types?: Array<"FILE_TYPE_UNSPECIFIED" | "ANY" | "DOCUMENT" | "PRESENTATION" | "SPREADSHEET" | "DRAWING" | "PDF" | "IMAGE" | "VIDEO" | "AUDIO" | (string & {})>;
  /** Maximum number of files that can be uploaded for this question in a single response. */
  maxFiles?: number;
  /** Maximum number of bytes allowed for any single file uploaded to this question. */
  maxFileSize?: string;
}

export const FileUploadQuestion: Schema.Schema<FileUploadQuestion> = Schema.suspend(() => Schema.Struct({
  folderId: Schema.optional(Schema.String),
  types: Schema.optional(Schema.Array(Schema.String)),
  maxFiles: Schema.optional(Schema.Number),
  maxFileSize: Schema.optional(Schema.String),
})).annotate({ identifier: "FileUploadQuestion" }) as any as Schema.Schema<FileUploadQuestion>;

export interface RowQuestion {
  /** Required. The title for the single row in the QuestionGroupItem. */
  title?: string;
}

export const RowQuestion: Schema.Schema<RowQuestion> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "RowQuestion" }) as any as Schema.Schema<RowQuestion>;

export interface RatingQuestion {
  /** Required. The rating scale level of the rating question. */
  ratingScaleLevel?: number;
  /** Required. The icon type to use for the rating. */
  iconType?: "RATING_ICON_TYPE_UNSPECIFIED" | "STAR" | "HEART" | "THUMB_UP" | (string & {});
}

export const RatingQuestion: Schema.Schema<RatingQuestion> = Schema.suspend(() => Schema.Struct({
  ratingScaleLevel: Schema.optional(Schema.Number),
  iconType: Schema.optional(Schema.String),
})).annotate({ identifier: "RatingQuestion" }) as any as Schema.Schema<RatingQuestion>;

export interface CorrectAnswer {
  /** Required. The correct answer value. See the documentation for TextAnswer.value for details on how various value types are formatted. */
  value?: string;
}

export const CorrectAnswer: Schema.Schema<CorrectAnswer> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "CorrectAnswer" }) as any as Schema.Schema<CorrectAnswer>;

export interface CorrectAnswers {
  /** A list of correct answers. A quiz response can be automatically graded based on these answers. For single-valued questions, a response is marked correct if it matches any value in this list (in other words, multiple correct answers are possible). For multiple-valued (`CHECKBOX`) questions, a response is marked correct if it contains exactly the values in this list. */
  answers?: Array<CorrectAnswer>;
}

export const CorrectAnswers: Schema.Schema<CorrectAnswers> = Schema.suspend(() => Schema.Struct({
  answers: Schema.optional(Schema.Array(CorrectAnswer)),
})).annotate({ identifier: "CorrectAnswers" }) as any as Schema.Schema<CorrectAnswers>;

export interface TextLink {
  /** Required. The URI. */
  uri?: string;
  /** Required. Display text for the URI. */
  displayText?: string;
}

export const TextLink: Schema.Schema<TextLink> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  displayText: Schema.optional(Schema.String),
})).annotate({ identifier: "TextLink" }) as any as Schema.Schema<TextLink>;

export interface VideoLink {
  /** The URI of a YouTube video. */
  youtubeUri?: string;
  /** Required. The display text for the link. */
  displayText?: string;
}

export const VideoLink: Schema.Schema<VideoLink> = Schema.suspend(() => Schema.Struct({
  youtubeUri: Schema.optional(Schema.String),
  displayText: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoLink" }) as any as Schema.Schema<VideoLink>;

export interface ExtraMaterial {
  /** Text feedback. */
  link?: TextLink;
  /** Video feedback. */
  video?: VideoLink;
}

export const ExtraMaterial: Schema.Schema<ExtraMaterial> = Schema.suspend(() => Schema.Struct({
  link: Schema.optional(TextLink),
  video: Schema.optional(VideoLink),
})).annotate({ identifier: "ExtraMaterial" }) as any as Schema.Schema<ExtraMaterial>;

export interface Feedback {
  /** Required. The main text of the feedback. */
  text?: string;
  /** Additional information provided as part of the feedback, often used to point the respondent to more reading and resources. */
  material?: Array<ExtraMaterial>;
}

export const Feedback: Schema.Schema<Feedback> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  material: Schema.optional(Schema.Array(ExtraMaterial)),
})).annotate({ identifier: "Feedback" }) as any as Schema.Schema<Feedback>;

export interface Grading {
  /** Required. The maximum number of points a respondent can automatically get for a correct answer. This must not be negative. */
  pointValue?: number;
  /** Required. The answer key for the question. Responses are automatically graded based on this field. */
  correctAnswers?: CorrectAnswers;
  /** The feedback displayed for correct responses. This feedback can only be set for multiple choice questions that have correct answers provided. */
  whenRight?: Feedback;
  /** The feedback displayed for incorrect responses. This feedback can only be set for multiple choice questions that have correct answers provided. */
  whenWrong?: Feedback;
  /** The feedback displayed for all answers. This is commonly used for short answer questions when a quiz owner wants to quickly give respondents some sense of whether they answered the question correctly before they've had a chance to officially grade the response. General feedback cannot be set for automatically graded multiple choice questions. */
  generalFeedback?: Feedback;
}

export const Grading: Schema.Schema<Grading> = Schema.suspend(() => Schema.Struct({
  pointValue: Schema.optional(Schema.Number),
  correctAnswers: Schema.optional(CorrectAnswers),
  whenRight: Schema.optional(Feedback),
  whenWrong: Schema.optional(Feedback),
  generalFeedback: Schema.optional(Feedback),
})).annotate({ identifier: "Grading" }) as any as Schema.Schema<Grading>;

export interface Question {
  /** A respondent can choose from a pre-defined set of options. */
  choiceQuestion?: ChoiceQuestion;
  /** A respondent can enter a free text response. */
  textQuestion?: TextQuestion;
  /** A respondent can choose a number from a range. */
  scaleQuestion?: ScaleQuestion;
  /** A respondent can enter a date. */
  dateQuestion?: DateQuestion;
  /** A respondent can enter a time. */
  timeQuestion?: TimeQuestion;
  /** A respondent can upload one or more files. */
  fileUploadQuestion?: FileUploadQuestion;
  /** A row of a QuestionGroupItem. */
  rowQuestion?: RowQuestion;
  /** A respondent can choose a rating from a pre-defined set of icons. */
  ratingQuestion?: RatingQuestion;
  /** Read only. The question ID. On creation, it can be provided but the ID must not be already used in the form. If not provided, a new ID is assigned. */
  questionId?: string;
  /** Whether the question must be answered in order for a respondent to submit their response. */
  required?: boolean;
  /** Grading setup for the question. */
  grading?: Grading;
}

export const Question: Schema.Schema<Question> = Schema.suspend(() => Schema.Struct({
  choiceQuestion: Schema.optional(ChoiceQuestion),
  textQuestion: Schema.optional(TextQuestion),
  scaleQuestion: Schema.optional(ScaleQuestion),
  dateQuestion: Schema.optional(DateQuestion),
  timeQuestion: Schema.optional(TimeQuestion),
  fileUploadQuestion: Schema.optional(FileUploadQuestion),
  rowQuestion: Schema.optional(RowQuestion),
  ratingQuestion: Schema.optional(RatingQuestion),
  questionId: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  grading: Schema.optional(Grading),
})).annotate({ identifier: "Question" }) as any as Schema.Schema<Question>;

export interface QuestionItem {
  /** Required. The displayed question. */
  question?: Question;
  /** The image displayed within the question. */
  image?: Image;
}

export const QuestionItem: Schema.Schema<QuestionItem> = Schema.suspend(() => Schema.Struct({
  question: Schema.optional(Question),
  image: Schema.optional(Image),
})).annotate({ identifier: "QuestionItem" }) as any as Schema.Schema<QuestionItem>;

export interface Grid {
  /** Required. The choices shared by each question in the grid. In other words, the values of the columns. Only `CHECK_BOX` and `RADIO` choices are allowed. */
  columns?: ChoiceQuestion;
  /** If `true`, the questions are randomly ordered. In other words, the rows appear in a different order for every respondent. */
  shuffleQuestions?: boolean;
}

export const Grid: Schema.Schema<Grid> = Schema.suspend(() => Schema.Struct({
  columns: Schema.optional(ChoiceQuestion),
  shuffleQuestions: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Grid" }) as any as Schema.Schema<Grid>;

export interface QuestionGroupItem {
  /** The question group is a grid with rows of multiple choice questions that share the same options. When `grid` is set, all questions in the group must be of kind `row`. */
  grid?: Grid;
  /** Required. A list of questions that belong in this question group. A question must only belong to one group. The `kind` of the group may affect what types of questions are allowed. */
  questions?: Array<Question>;
  /** The image displayed within the question group above the specific questions. */
  image?: Image;
}

export const QuestionGroupItem: Schema.Schema<QuestionGroupItem> = Schema.suspend(() => Schema.Struct({
  grid: Schema.optional(Grid),
  questions: Schema.optional(Schema.Array(Question)),
  image: Schema.optional(Image),
})).annotate({ identifier: "QuestionGroupItem" }) as any as Schema.Schema<QuestionGroupItem>;

export interface PageBreakItem {
}

export const PageBreakItem: Schema.Schema<PageBreakItem> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PageBreakItem" }) as any as Schema.Schema<PageBreakItem>;

export interface TextItem {
}

export const TextItem: Schema.Schema<TextItem> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TextItem" }) as any as Schema.Schema<TextItem>;

export interface ImageItem {
  /** Required. The image displayed in the item. */
  image?: Image;
}

export const ImageItem: Schema.Schema<ImageItem> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Image),
})).annotate({ identifier: "ImageItem" }) as any as Schema.Schema<ImageItem>;

export interface Video {
  /** Required. A YouTube URI. */
  youtubeUri?: string;
  /** Properties of a video. */
  properties?: MediaProperties;
}

export const Video: Schema.Schema<Video> = Schema.suspend(() => Schema.Struct({
  youtubeUri: Schema.optional(Schema.String),
  properties: Schema.optional(MediaProperties),
})).annotate({ identifier: "Video" }) as any as Schema.Schema<Video>;

export interface VideoItem {
  /** Required. The video displayed in the item. */
  video?: Video;
  /** The text displayed below the video. */
  caption?: string;
}

export const VideoItem: Schema.Schema<VideoItem> = Schema.suspend(() => Schema.Struct({
  video: Schema.optional(Video),
  caption: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoItem" }) as any as Schema.Schema<VideoItem>;

export interface Item {
  /** Poses a question to the user. */
  questionItem?: QuestionItem;
  /** Poses one or more questions to the user with a single major prompt. */
  questionGroupItem?: QuestionGroupItem;
  /** Starts a new page with a title. */
  pageBreakItem?: PageBreakItem;
  /** Displays a title and description on the page. */
  textItem?: TextItem;
  /** Displays an image on the page. */
  imageItem?: ImageItem;
  /** Displays a video on the page. */
  videoItem?: VideoItem;
  /** The item ID. On creation, it can be provided but the ID must not be already used in the form. If not provided, a new ID is assigned. */
  itemId?: string;
  /** The title of the item. */
  title?: string;
  /** The description of the item. */
  description?: string;
}

export const Item: Schema.Schema<Item> = Schema.suspend(() => Schema.Struct({
  questionItem: Schema.optional(QuestionItem),
  questionGroupItem: Schema.optional(QuestionGroupItem),
  pageBreakItem: Schema.optional(PageBreakItem),
  textItem: Schema.optional(TextItem),
  imageItem: Schema.optional(ImageItem),
  videoItem: Schema.optional(VideoItem),
  itemId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Item" }) as any as Schema.Schema<Item>;

export interface PublishState {
  /** Required. Whether the form is published and visible to others. */
  isPublished?: boolean;
  /** Required. Whether the form accepts responses. If `is_published` is set to `false`, this field is forced to `false`. */
  isAcceptingResponses?: boolean;
}

export const PublishState: Schema.Schema<PublishState> = Schema.suspend(() => Schema.Struct({
  isPublished: Schema.optional(Schema.Boolean),
  isAcceptingResponses: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PublishState" }) as any as Schema.Schema<PublishState>;

export interface PublishSettings {
  /** Optional. The publishing state of a form. When updating `publish_state`, both `is_published` and `is_accepting_responses` must be set. However, setting `is_accepting_responses` to `true` and `is_published` to `false` isn't supported and returns an error. */
  publishState?: PublishState;
}

export const PublishSettings: Schema.Schema<PublishSettings> = Schema.suspend(() => Schema.Struct({
  publishState: Schema.optional(PublishState),
})).annotate({ identifier: "PublishSettings" }) as any as Schema.Schema<PublishSettings>;

export interface Form {
  /** Output only. The form ID. */
  formId?: string;
  /** Required. The title and description of the form. */
  info?: Info;
  /** The form's settings. This must be updated with UpdateSettingsRequest; it is ignored during CreateForm and UpdateFormInfoRequest. */
  settings?: FormSettings;
  /** Required. A list of the form's items, which can include section headers, questions, embedded media, etc. */
  items?: Array<Item>;
  /** Output only. The revision ID of the form. Used in the WriteControl in update requests to identify the revision on which the changes are based. The format of the revision ID may change over time, so it should be treated opaquely. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the form *content* has not changed. Conversely, a changed ID (for the same form and user) usually means the form *content* has been updated; however, a changed ID can also be due to internal factors such as ID format changes. Form content excludes form metadata, including: * sharing settings (who has access to the form) * publish_settings (if the form supports publishing and if it is published) */
  revisionId?: string;
  /** Output only. The form URI to share with responders. This opens a page that allows the user to submit responses but not edit the questions. For forms that have publish_settings value set, this is the published form URI. */
  responderUri?: string;
  /** Output only. The ID of the linked Google Sheet which is accumulating responses from this Form (if such a Sheet exists). */
  linkedSheetId?: string;
  /** Output only. The publishing settings for a form. This field isn't set for legacy forms because they don't have the publish_settings field. All newly created forms support publish settings. Forms with publish_settings value set can call SetPublishSettings API to publish or unpublish the form. */
  publishSettings?: PublishSettings;
}

export const Form: Schema.Schema<Form> = Schema.suspend(() => Schema.Struct({
  formId: Schema.optional(Schema.String),
  info: Schema.optional(Info),
  settings: Schema.optional(FormSettings),
  items: Schema.optional(Schema.Array(Item)),
  revisionId: Schema.optional(Schema.String),
  responderUri: Schema.optional(Schema.String),
  linkedSheetId: Schema.optional(Schema.String),
  publishSettings: Schema.optional(PublishSettings),
})).annotate({ identifier: "Form" }) as any as Schema.Schema<Form>;

export interface TextAnswer {
  /** Output only. The answer value. Formatting used for different kinds of question: * ChoiceQuestion * `RADIO` or `DROP_DOWN`: A single string corresponding to the option that was selected. * `CHECKBOX`: Multiple strings corresponding to each option that was selected. * TextQuestion: The text that the user entered. * ScaleQuestion: A string containing the number that was selected. * DateQuestion * Without time or year: MM-DD e.g. "05-19" * With year: YYYY-MM-DD e.g. "1986-05-19" * With time: MM-DD HH:MM e.g. "05-19 14:51" * With year and time: YYYY-MM-DD HH:MM e.g. "1986-05-19 14:51" * TimeQuestion: String with time or duration in HH:MM format e.g. "14:51" * RowQuestion within QuestionGroupItem: The answer for each row of a QuestionGroupItem is represented as a separate Answer. Each will contain one string for `RADIO`-type choices or multiple strings for `CHECKBOX` choices. */
  value?: string;
}

export const TextAnswer: Schema.Schema<TextAnswer> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "TextAnswer" }) as any as Schema.Schema<TextAnswer>;

export interface TextAnswers {
  /** Output only. Answers to a question. For multiple-value ChoiceQuestions, each answer is a separate value. */
  answers?: Array<TextAnswer>;
}

export const TextAnswers: Schema.Schema<TextAnswers> = Schema.suspend(() => Schema.Struct({
  answers: Schema.optional(Schema.Array(TextAnswer)),
})).annotate({ identifier: "TextAnswers" }) as any as Schema.Schema<TextAnswers>;

export interface FileUploadAnswer {
  /** Output only. The ID of the Google Drive file. */
  fileId?: string;
  /** Output only. The file name, as stored in Google Drive on upload. */
  fileName?: string;
  /** Output only. The MIME type of the file, as stored in Google Drive on upload. */
  mimeType?: string;
}

export const FileUploadAnswer: Schema.Schema<FileUploadAnswer> = Schema.suspend(() => Schema.Struct({
  fileId: Schema.optional(Schema.String),
  fileName: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "FileUploadAnswer" }) as any as Schema.Schema<FileUploadAnswer>;

export interface FileUploadAnswers {
  /** Output only. All submitted files for a FileUpload question. */
  answers?: Array<FileUploadAnswer>;
}

export const FileUploadAnswers: Schema.Schema<FileUploadAnswers> = Schema.suspend(() => Schema.Struct({
  answers: Schema.optional(Schema.Array(FileUploadAnswer)),
})).annotate({ identifier: "FileUploadAnswers" }) as any as Schema.Schema<FileUploadAnswers>;

export interface Grade {
  /** Output only. The numeric score awarded for the answer. */
  score?: number;
  /** Output only. Whether the question was answered correctly or not. A zero-point score is not enough to infer incorrectness, since a correctly answered question could be worth zero points. */
  correct?: boolean;
  /** Output only. Additional feedback given for an answer. */
  feedback?: Feedback;
}

export const Grade: Schema.Schema<Grade> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  correct: Schema.optional(Schema.Boolean),
  feedback: Schema.optional(Feedback),
})).annotate({ identifier: "Grade" }) as any as Schema.Schema<Grade>;

export interface Answer {
  /** Output only. The specific answers as text. */
  textAnswers?: TextAnswers;
  /** Output only. The answers to a file upload question. */
  fileUploadAnswers?: FileUploadAnswers;
  /** Output only. The question's ID. See also Question.question_id. */
  questionId?: string;
  /** Output only. The grade for the answer if the form was a quiz. */
  grade?: Grade;
}

export const Answer: Schema.Schema<Answer> = Schema.suspend(() => Schema.Struct({
  textAnswers: Schema.optional(TextAnswers),
  fileUploadAnswers: Schema.optional(FileUploadAnswers),
  questionId: Schema.optional(Schema.String),
  grade: Schema.optional(Grade),
})).annotate({ identifier: "Answer" }) as any as Schema.Schema<Answer>;

export interface FormResponse {
  /** Output only. The form ID. */
  formId?: string;
  /** Output only. The response ID. */
  responseId?: string;
  /** Output only. Timestamp for the first time the response was submitted. */
  createTime?: string;
  /** Output only. Timestamp for the most recent time the response was submitted. Does not track changes to grades. */
  lastSubmittedTime?: string;
  /** Output only. The email address (if collected) for the respondent. */
  respondentEmail?: string;
  /** Output only. The actual answers to the questions, keyed by question_id. */
  answers?: Record<string, Answer>;
  /** Output only. The total number of points the respondent received for their submission Only set if the form was a quiz and the response was graded. This includes points automatically awarded via autograding adjusted by any manual corrections entered by the form owner. */
  totalScore?: number;
}

export const FormResponse: Schema.Schema<FormResponse> = Schema.suspend(() => Schema.Struct({
  formId: Schema.optional(Schema.String),
  responseId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastSubmittedTime: Schema.optional(Schema.String),
  respondentEmail: Schema.optional(Schema.String),
  answers: Schema.optional(Schema.Record(Schema.String, Answer)),
  totalScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "FormResponse" }) as any as Schema.Schema<FormResponse>;

export interface ListFormResponsesResponse {
  /** The returned form responses. Note: The `formId` field is not returned in the `FormResponse` object for list requests. */
  responses?: Array<FormResponse>;
  /** If set, there are more responses. To get the next page of responses, provide this as `page_token` in a future request. */
  nextPageToken?: string;
}

export const ListFormResponsesResponse: Schema.Schema<ListFormResponsesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(FormResponse)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFormResponsesResponse" }) as any as Schema.Schema<ListFormResponsesResponse>;

export interface UpdateFormInfoRequest {
  /** The info to update. */
  info?: Info;
  /** Required. Only values named in this mask are changed. At least one field must be specified. The root `info` is implied and should not be specified. A single `"*"` can be used as short-hand for updating every field. */
  updateMask?: string;
}

export const UpdateFormInfoRequest: Schema.Schema<UpdateFormInfoRequest> = Schema.suspend(() => Schema.Struct({
  info: Schema.optional(Info),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateFormInfoRequest" }) as any as Schema.Schema<UpdateFormInfoRequest>;

export interface UpdateSettingsRequest {
  /** Required. The settings to update with. */
  settings?: FormSettings;
  /** Required. Only values named in this mask are changed. At least one field must be specified. The root `settings` is implied and should not be specified. A single `"*"` can be used as short-hand for updating every field. */
  updateMask?: string;
}

export const UpdateSettingsRequest: Schema.Schema<UpdateSettingsRequest> = Schema.suspend(() => Schema.Struct({
  settings: Schema.optional(FormSettings),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateSettingsRequest" }) as any as Schema.Schema<UpdateSettingsRequest>;

export interface Location {
  /** The index of an item in the form. This must be in the range [0..*N*), where *N* is the number of items in the form. */
  index?: number;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.Number),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface CreateItemRequest {
  /** Required. The item to create. */
  item?: Item;
  /** Required. Where to place the new item. */
  location?: Location;
}

export const CreateItemRequest: Schema.Schema<CreateItemRequest> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(Item),
  location: Schema.optional(Location),
})).annotate({ identifier: "CreateItemRequest" }) as any as Schema.Schema<CreateItemRequest>;

export interface MoveItemRequest {
  /** Required. The location of the item to move. */
  originalLocation?: Location;
  /** Required. The new location for the item. */
  newLocation?: Location;
}

export const MoveItemRequest: Schema.Schema<MoveItemRequest> = Schema.suspend(() => Schema.Struct({
  originalLocation: Schema.optional(Location),
  newLocation: Schema.optional(Location),
})).annotate({ identifier: "MoveItemRequest" }) as any as Schema.Schema<MoveItemRequest>;

export interface DeleteItemRequest {
  /** Required. The location of the item to delete. */
  location?: Location;
}

export const DeleteItemRequest: Schema.Schema<DeleteItemRequest> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Location),
})).annotate({ identifier: "DeleteItemRequest" }) as any as Schema.Schema<DeleteItemRequest>;

export interface UpdateItemRequest {
  /** Required. New values for the item. Note that item and question IDs are used if they are provided (and are in the field mask). If an ID is blank (and in the field mask) a new ID is generated. This means you can modify an item by getting the form via forms.get, modifying your local copy of that item to be how you want it, and using UpdateItemRequest to write it back, with the IDs being the same (or not in the field mask). */
  item?: Item;
  /** Required. The location identifying the item to update. */
  location?: Location;
  /** Required. Only values named in this mask are changed. */
  updateMask?: string;
}

export const UpdateItemRequest: Schema.Schema<UpdateItemRequest> = Schema.suspend(() => Schema.Struct({
  item: Schema.optional(Item),
  location: Schema.optional(Location),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateItemRequest" }) as any as Schema.Schema<UpdateItemRequest>;

export interface Request {
  /** Update Form's Info. */
  updateFormInfo?: UpdateFormInfoRequest;
  /** Updates the Form's settings. */
  updateSettings?: UpdateSettingsRequest;
  /** Create a new item. */
  createItem?: CreateItemRequest;
  /** Move an item to a specified location. */
  moveItem?: MoveItemRequest;
  /** Delete an item. */
  deleteItem?: DeleteItemRequest;
  /** Update an item. */
  updateItem?: UpdateItemRequest;
}

export const Request: Schema.Schema<Request> = Schema.suspend(() => Schema.Struct({
  updateFormInfo: Schema.optional(UpdateFormInfoRequest),
  updateSettings: Schema.optional(UpdateSettingsRequest),
  createItem: Schema.optional(CreateItemRequest),
  moveItem: Schema.optional(MoveItemRequest),
  deleteItem: Schema.optional(DeleteItemRequest),
  updateItem: Schema.optional(UpdateItemRequest),
})).annotate({ identifier: "Request" }) as any as Schema.Schema<Request>;

export interface WriteControl {
  /** The revision ID of the form that the write request is applied to. If this is not the latest revision of the form, the request is not processed and returns a 400 bad request error. */
  requiredRevisionId?: string;
  /** The target revision ID of the form that the write request is applied to. If changes have occurred after this revision, the changes in this update request are transformed against those changes. This results in a new revision of the form that incorporates both the changes in the request and the intervening changes, with the server resolving conflicting changes. The target revision ID may only be used to write to recent versions of a form. If the target revision is too far behind the latest revision, the request is not processed and returns a 400 (Bad Request Error). The request may be retried after reading the latest version of the form. In most cases a target revision ID remains valid for several minutes after it is read, but for frequently-edited forms this window may be shorter. */
  targetRevisionId?: string;
}

export const WriteControl: Schema.Schema<WriteControl> = Schema.suspend(() => Schema.Struct({
  requiredRevisionId: Schema.optional(Schema.String),
  targetRevisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "WriteControl" }) as any as Schema.Schema<WriteControl>;

export interface BatchUpdateFormRequest {
  /** Whether to return an updated version of the model in the response. */
  includeFormInResponse?: boolean;
  /** Required. The update requests of this batch. */
  requests?: Array<Request>;
  /** Provides control over how write requests are executed. */
  writeControl?: WriteControl;
}

export const BatchUpdateFormRequest: Schema.Schema<BatchUpdateFormRequest> = Schema.suspend(() => Schema.Struct({
  includeFormInResponse: Schema.optional(Schema.Boolean),
  requests: Schema.optional(Schema.Array(Request)),
  writeControl: Schema.optional(WriteControl),
})).annotate({ identifier: "BatchUpdateFormRequest" }) as any as Schema.Schema<BatchUpdateFormRequest>;

export interface CreateItemResponse {
  /** The ID of the created item. */
  itemId?: string;
  /** The ID of the question created as part of this item, for a question group it lists IDs of all the questions created for this item. */
  questionId?: Array<string>;
}

export const CreateItemResponse: Schema.Schema<CreateItemResponse> = Schema.suspend(() => Schema.Struct({
  itemId: Schema.optional(Schema.String),
  questionId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CreateItemResponse" }) as any as Schema.Schema<CreateItemResponse>;

export interface Response {
  /** The result of creating an item. */
  createItem?: CreateItemResponse;
}

export const Response: Schema.Schema<Response> = Schema.suspend(() => Schema.Struct({
  createItem: Schema.optional(CreateItemResponse),
})).annotate({ identifier: "Response" }) as any as Schema.Schema<Response>;

export interface BatchUpdateFormResponse {
  /** Based on the bool request field `include_form_in_response`, a form with all applied mutations/updates is returned or not. This may be later than the revision ID created by these changes. */
  form?: Form;
  /** The reply of the updates. This maps 1:1 with the update requests, although replies to some requests may be empty. */
  replies?: Array<Response>;
  /** The updated write control after applying the request. */
  writeControl?: WriteControl;
}

export const BatchUpdateFormResponse: Schema.Schema<BatchUpdateFormResponse> = Schema.suspend(() => Schema.Struct({
  form: Schema.optional(Form),
  replies: Schema.optional(Schema.Array(Response)),
  writeControl: Schema.optional(WriteControl),
})).annotate({ identifier: "BatchUpdateFormResponse" }) as any as Schema.Schema<BatchUpdateFormResponse>;

export interface CloudPubsubTopic {
  /** Required. A fully qualified Pub/Sub topic name to publish the events to. This topic must be owned by the calling project and already exist in Pub/Sub. */
  topicName?: string;
}

export const CloudPubsubTopic: Schema.Schema<CloudPubsubTopic> = Schema.suspend(() => Schema.Struct({
  topicName: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudPubsubTopic" }) as any as Schema.Schema<CloudPubsubTopic>;

export interface WatchTarget {
  /** A Pub/Sub topic. To receive notifications, the topic must grant publish privileges to the Forms service account `serviceAccount:forms-notifications@system.gserviceaccount.com`. Only the project that owns a topic may create a watch with it. Pub/Sub delivery guarantees should be considered. */
  topic?: CloudPubsubTopic;
}

export const WatchTarget: Schema.Schema<WatchTarget> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(CloudPubsubTopic),
})).annotate({ identifier: "WatchTarget" }) as any as Schema.Schema<WatchTarget>;

export interface Watch {
  /** Output only. The ID of this watch. See notes on CreateWatchRequest.watch_id. */
  id?: string;
  /** Required. Where to send the notification. */
  target?: WatchTarget;
  /** Required. Which event type to watch for. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "SCHEMA" | "RESPONSES" | (string & {});
  /** Output only. Timestamp of when this was created. */
  createTime?: string;
  /** Output only. Timestamp for when this will expire. Each watches.renew call resets this to seven days in the future. */
  expireTime?: string;
  /** Output only. The most recent error type for an attempted delivery. To begin watching the form again a call can be made to watches.renew which also clears this error information. */
  errorType?: "ERROR_TYPE_UNSPECIFIED" | "PROJECT_NOT_AUTHORIZED" | "NO_USER_ACCESS" | "OTHER_ERRORS" | (string & {});
  /** Output only. The current state of the watch. Additional details about suspended watches can be found by checking the `error_type`. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "SUSPENDED" | (string & {});
}

export const Watch: Schema.Schema<Watch> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  target: Schema.optional(WatchTarget),
  eventType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  errorType: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Watch" }) as any as Schema.Schema<Watch>;

export interface CreateWatchRequest {
  /** Required. The watch object. No ID should be set on this object; use `watch_id` instead. */
  watch?: Watch;
  /** The ID to use for the watch. If specified, the ID must not already be in use. If not specified, an ID is generated. This value should be 4-63 characters, and valid characters are /a-z-/. */
  watchId?: string;
}

export const CreateWatchRequest: Schema.Schema<CreateWatchRequest> = Schema.suspend(() => Schema.Struct({
  watch: Schema.optional(Watch),
  watchId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateWatchRequest" }) as any as Schema.Schema<CreateWatchRequest>;

export interface ListWatchesResponse {
  /** The returned watches. */
  watches?: Array<Watch>;
}

export const ListWatchesResponse: Schema.Schema<ListWatchesResponse> = Schema.suspend(() => Schema.Struct({
  watches: Schema.optional(Schema.Array(Watch)),
})).annotate({ identifier: "ListWatchesResponse" }) as any as Schema.Schema<ListWatchesResponse>;

export interface RenewWatchRequest {
}

export const RenewWatchRequest: Schema.Schema<RenewWatchRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RenewWatchRequest" }) as any as Schema.Schema<RenewWatchRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface SetPublishSettingsRequest {
  /** Required. The desired publish settings to apply to the form. */
  publishSettings?: PublishSettings;
  /** Optional. The `publish_settings` fields to update. This field mask accepts the following values: * `publish_state`: Updates or replaces all `publish_state` settings. * `"*"`: Updates or replaces all `publish_settings` fields. */
  updateMask?: string;
}

export const SetPublishSettingsRequest: Schema.Schema<SetPublishSettingsRequest> = Schema.suspend(() => Schema.Struct({
  publishSettings: Schema.optional(PublishSettings),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetPublishSettingsRequest" }) as any as Schema.Schema<SetPublishSettingsRequest>;

export interface SetPublishSettingsResponse {
  /** Required. The ID of the Form. This is same as the Form.form_id field. */
  formId?: string;
  /** The publish settings of the form. */
  publishSettings?: PublishSettings;
}

export const SetPublishSettingsResponse: Schema.Schema<SetPublishSettingsResponse> = Schema.suspend(() => Schema.Struct({
  formId: Schema.optional(Schema.String),
  publishSettings: Schema.optional(PublishSettings),
})).annotate({ identifier: "SetPublishSettingsResponse" }) as any as Schema.Schema<SetPublishSettingsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Create a new form using the title given in the provided form message in the request. *Important:* Only the form.info.title and form.info.document_title fields are copied to the new form. All other fields including the form description, items and settings are disallowed. To create a new form and add items, you must first call forms.create to create an empty form with a title and (optional) document title, and then call forms.update to add the items. */
export interface CreateFormsRequest {
  /** Optional. Whether the form is unpublished. If set to `true`, the form doesn't accept responses. If set to `false` or unset, the form is published and accepts responses. */
  unpublished?: boolean;
  /** Request body */
  body?: Form;
}

export const CreateFormsRequest = Schema.Struct({
  unpublished: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("unpublished")),
  body: Schema.optional(Form).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/forms", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFormsRequest>;

export type CreateFormsResponse = Form;
export const CreateFormsResponse = Form;

export type CreateFormsError = CommonErrors;

export const createForms: API.OperationMethod<CreateFormsRequest, CreateFormsResponse, CreateFormsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFormsRequest,
  output: CreateFormsResponse,
  errors: [],
}));

/** Get a form. */
export interface GetFormsRequest {
  /** Required. The form ID. */
  formId: string;
}

export const GetFormsRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/forms/{formId}" }),
  svc,
) as unknown as Schema.Schema<GetFormsRequest>;

export type GetFormsResponse = Form;
export const GetFormsResponse = Form;

export type GetFormsError = CommonErrors;

export const getForms: API.OperationMethod<GetFormsRequest, GetFormsResponse, GetFormsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFormsRequest,
  output: GetFormsResponse,
  errors: [],
}));

/** Change the form with a batch of updates. */
export interface BatchUpdateFormsRequest {
  /** Required. The form ID. */
  formId: string;
  /** Request body */
  body?: BatchUpdateFormRequest;
}

export const BatchUpdateFormsRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
  body: Schema.optional(BatchUpdateFormRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/forms/{formId}:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateFormsRequest>;

export type BatchUpdateFormsResponse = BatchUpdateFormResponse;
export const BatchUpdateFormsResponse = BatchUpdateFormResponse;

export type BatchUpdateFormsError = CommonErrors;

export const batchUpdateForms: API.OperationMethod<BatchUpdateFormsRequest, BatchUpdateFormsResponse, BatchUpdateFormsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateFormsRequest,
  output: BatchUpdateFormsResponse,
  errors: [],
}));

/** Updates the publish settings of a form. Legacy forms aren't supported because they don't have the `publish_settings` field. */
export interface SetPublishSettingsFormsRequest {
  /** Required. The ID of the form. You can get the id from Form.form_id field. */
  formId: string;
  /** Request body */
  body?: SetPublishSettingsRequest;
}

export const SetPublishSettingsFormsRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
  body: Schema.optional(SetPublishSettingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/forms/{formId}:setPublishSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetPublishSettingsFormsRequest>;

export type SetPublishSettingsFormsResponse = SetPublishSettingsResponse;
export const SetPublishSettingsFormsResponse = SetPublishSettingsResponse;

export type SetPublishSettingsFormsError = CommonErrors;

export const setPublishSettingsForms: API.OperationMethod<SetPublishSettingsFormsRequest, SetPublishSettingsFormsResponse, SetPublishSettingsFormsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetPublishSettingsFormsRequest,
  output: SetPublishSettingsFormsResponse,
  errors: [],
}));

/** Get one response from the form. */
export interface GetFormsResponsesRequest {
  /** Required. The form ID. */
  formId: string;
  /** Required. The response ID within the form. */
  responseId: string;
}

export const GetFormsResponsesRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
  responseId: Schema.String.pipe(T.HttpPath("responseId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/forms/{formId}/responses/{responseId}" }),
  svc,
) as unknown as Schema.Schema<GetFormsResponsesRequest>;

export type GetFormsResponsesResponse = FormResponse;
export const GetFormsResponsesResponse = FormResponse;

export type GetFormsResponsesError = CommonErrors;

export const getFormsResponses: API.OperationMethod<GetFormsResponsesRequest, GetFormsResponsesResponse, GetFormsResponsesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFormsResponsesRequest,
  output: GetFormsResponsesResponse,
  errors: [],
}));

/** List a form's responses. */
export interface ListFormsResponsesRequest {
  /** Required. ID of the Form whose responses to list. */
  formId: string;
  /** Which form responses to return. Currently, the only supported filters are: * timestamp > *N* which means to get all form responses submitted after (but not at) timestamp *N*. * timestamp >= *N* which means to get all form responses submitted at and after timestamp *N*. For both supported filters, timestamp must be formatted in RFC3339 UTC "Zulu" format. Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z". */
  filter?: string;
  /** The maximum number of responses to return. The service may return fewer than this value. If unspecified or zero, at most 5000 responses are returned. */
  pageSize?: number;
  /** A page token returned by a previous list response. If this field is set, the form and the values of the filter must be the same as for the original request. */
  pageToken?: string;
}

export const ListFormsResponsesRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/forms/{formId}/responses" }),
  svc,
) as unknown as Schema.Schema<ListFormsResponsesRequest>;

export type ListFormsResponsesResponse = ListFormResponsesResponse;
export const ListFormsResponsesResponse = ListFormResponsesResponse;

export type ListFormsResponsesError = CommonErrors;

export const listFormsResponses = API.makePaginated(() => ({
  input: ListFormsResponsesRequest,
  output: ListFormsResponsesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a new watch. If a watch ID is provided, it must be unused. For each invoking project, the per form limit is one watch per Watch.EventType. A watch expires seven days after it is created (see Watch.expire_time). */
export interface CreateFormsWatchesRequest {
  /** Required. ID of the Form to watch. */
  formId: string;
  /** Request body */
  body?: CreateWatchRequest;
}

export const CreateFormsWatchesRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
  body: Schema.optional(CreateWatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/forms/{formId}/watches", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFormsWatchesRequest>;

export type CreateFormsWatchesResponse = Watch;
export const CreateFormsWatchesResponse = Watch;

export type CreateFormsWatchesError = CommonErrors;

export const createFormsWatches: API.OperationMethod<CreateFormsWatchesRequest, CreateFormsWatchesResponse, CreateFormsWatchesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFormsWatchesRequest,
  output: CreateFormsWatchesResponse,
  errors: [],
}));

/** Return a list of the watches owned by the invoking project. The maximum number of watches is two: For each invoker, the limit is one for each event type per form. */
export interface ListFormsWatchesRequest {
  /** Required. ID of the Form whose watches to list. */
  formId: string;
}

export const ListFormsWatchesRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/forms/{formId}/watches" }),
  svc,
) as unknown as Schema.Schema<ListFormsWatchesRequest>;

export type ListFormsWatchesResponse = ListWatchesResponse;
export const ListFormsWatchesResponse = ListWatchesResponse;

export type ListFormsWatchesError = CommonErrors;

export const listFormsWatches: API.OperationMethod<ListFormsWatchesRequest, ListFormsWatchesResponse, ListFormsWatchesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListFormsWatchesRequest,
  output: ListFormsWatchesResponse,
  errors: [],
}));

/** Renew an existing watch for seven days. The state of the watch after renewal is `ACTIVE`, and the `expire_time` is seven days from the renewal. Renewing a watch in an error state (e.g. `SUSPENDED`) succeeds if the error is no longer present, but fail otherwise. After a watch has expired, RenewWatch returns `NOT_FOUND`. */
export interface RenewFormsWatchesRequest {
  /** Required. The ID of the Form. */
  formId: string;
  /** Required. The ID of the Watch to renew. */
  watchId: string;
  /** Request body */
  body?: RenewWatchRequest;
}

export const RenewFormsWatchesRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
  watchId: Schema.String.pipe(T.HttpPath("watchId")),
  body: Schema.optional(RenewWatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/forms/{formId}/watches/{watchId}:renew", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenewFormsWatchesRequest>;

export type RenewFormsWatchesResponse = Watch;
export const RenewFormsWatchesResponse = Watch;

export type RenewFormsWatchesError = CommonErrors;

export const renewFormsWatches: API.OperationMethod<RenewFormsWatchesRequest, RenewFormsWatchesResponse, RenewFormsWatchesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenewFormsWatchesRequest,
  output: RenewFormsWatchesResponse,
  errors: [],
}));

/** Delete a watch. */
export interface DeleteFormsWatchesRequest {
  /** Required. The ID of the Form. */
  formId: string;
  /** Required. The ID of the Watch to delete. */
  watchId: string;
}

export const DeleteFormsWatchesRequest = Schema.Struct({
  formId: Schema.String.pipe(T.HttpPath("formId")),
  watchId: Schema.String.pipe(T.HttpPath("watchId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/forms/{formId}/watches/{watchId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFormsWatchesRequest>;

export type DeleteFormsWatchesResponse = Empty;
export const DeleteFormsWatchesResponse = Empty;

export type DeleteFormsWatchesError = CommonErrors;

export const deleteFormsWatches: API.OperationMethod<DeleteFormsWatchesRequest, DeleteFormsWatchesResponse, DeleteFormsWatchesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFormsWatchesRequest,
  output: DeleteFormsWatchesResponse,
  errors: [],
}));

