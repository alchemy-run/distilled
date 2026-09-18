> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Course Lesson

> An individual learning unit within a chapter, which can contain text, video, PDF, or assessment content.

<ResponseExample>
  ```json Example theme={null}
  {
  	"assessment_questions": [
  		{
  			"correct_answer": "<string>",
  			"created_at": "2023-12-01T05:00:00.401Z",
  			"id": "crsaq_xxxxxxxxxxxx",
  			"image": {
  				"content_type": "image/jpeg",
  				"filename": "document.pdf",
  				"id": "<string>",
  				"url": "https://media.whop.com/abc123/optimized.jpg"
  			},
  			"options": [
  				{
  					"id": "crsaqo_xxxxxxxxxxx",
  					"is_correct": true,
  					"option_text": "<string>",
  					"order": 42
  				}
  			],
  			"order": 42,
  			"question_text": "<string>",
  			"question_type": "short_answer"
  		}
  	],
  	"attachments": [
  		{
  			"content_type": "image/jpeg",
  			"filename": "document.pdf",
  			"id": "<string>",
  			"url": "https://media.whop.com/abc123/optimized.jpg"
  		}
  	],
  	"content": "In this lesson, we will cover the basics of technical analysis...",
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"days_from_course_start_until_unlock": 42,
  	"embed_id": "dQw4w9WgXcQ",
  	"embed_type": "youtube",
  	"id": "lesn_xxxxxxxxxxxxx",
  	"lesson_type": "text",
  	"main_pdf": {
  		"content_type": "image/jpeg",
  		"filename": "document.pdf",
  		"id": "<string>",
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"order": 42,
  	"thumbnail": {
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"title": "Understanding Candlestick Patterns",
  	"video_asset": {
  		"asset_id": "<string>",
  		"audio_only": true,
  		"created_at": "2023-12-01T05:00:00.401Z",
  		"duration_seconds": 42,
  		"finished_uploading_at": "2023-12-01T05:00:00.401Z",
  		"id": "mux_xxxxxxxxxxxxxx",
  		"playback_id": "<string>",
  		"signed_playback_id": "<string>",
  		"signed_storyboard_playback_token": "<string>",
  		"signed_thumbnail_playback_token": "<string>",
  		"signed_video_playback_token": "<string>",
  		"status": "uploading",
  		"updated_at": "2023-12-01T05:00:00.401Z"
  	},
  	"visibility": "visible"
  }
  ```
</ResponseExample>

<ResponseField name="assessment_questions" type="array<object>" required>
  The list of questions for quiz or knowledge check lessons. Empty for non-assessment lesson types.

  <Expandable title="child attributes">
    <ResponseField name="correct_answer" type="string | null" required>
      The correct answer for the question. Used for short answer questions. Only
      visible to admins (users with courses:update permission)
    </ResponseField>

    <ResponseField name="created_at" type="string<date-time>" required>
      The datetime the assessment question was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the assessment question.

      Example: `crsaq_xxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="image" type="object | null" required>
      Optional image attachment for the question

      <Expandable title="child attributes">
        <ResponseField name="content_type" type="string | null" required>
          Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

          Example: `image/jpeg`
        </ResponseField>

        <ResponseField name="filename" type="string | null" required>
          The original filename of the uploaded attachment, including its file extension.

          Example: `document.pdf`
        </ResponseField>

        <ResponseField name="id" type="string" required />

        <ResponseField name="url" type="string | null" required>
          A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

          Example: `https://media.whop.com/abc123/optimized.jpg`
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="options" type="array<object>" required>
      The answer options for multiple choice/select questions

      <Expandable title="child attributes">
        <ResponseField name="id" type="string" required>
          The unique identifier for the assessment question option.

          Example: `crsaqo_xxxxxxxxxxx`
        </ResponseField>

        <ResponseField name="is_correct" type="boolean | null" required>
          Whether this option is a correct answer. Only visible to admins (users with
          courses:update permission)
        </ResponseField>

        <ResponseField name="option_text" type="string" required>
          The text of the answer option
        </ResponseField>

        <ResponseField name="order" type="integer" required>
          The order of this option within the question

          Example: `42`
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="order" type="integer" required>
      The order of the question within its lesson

      Example: `42`
    </ResponseField>

    <ResponseField name="question_text" type="string" required>
      The text of the question
    </ResponseField>

    <ResponseField name="question_type" type="CoursesAssessmentQuestionTypes" required>
      The type of the question

      Available options: `short_answer`, `true_false`, `multiple_choice`, `multiple_select`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="attachments" type="array<object>" required>
  All supplementary files attached to this lesson returned as a flat array rather than a paginated connection.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="filename" type="string | null" required>
      The original filename of the uploaded attachment, including its file extension.

      Example: `document.pdf`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="content" type="string | null" required>
  The Markdown content body of the lesson. Null if the lesson has no text content.

  Example: `In this lesson, we will cover the basics of technical ana…`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the lesson was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="days_from_course_start_until_unlock" type="integer | null" required>
  The number of days after a student starts the course before this lesson becomes accessible. Null if the lesson is available immediately.

  Example: `42`
</ResponseField>

<ResponseField name="embed_id" type="string | null" required>
  The external video identifier for embedded video lessons, such as a YouTube video ID or Loom share ID. Null if the lesson has no embed.

  Example: `dQw4w9WgXcQ`
</ResponseField>

<ResponseField name="embed_type" type="EmbedTypes | null" required>
  The platform type for the embedded video. One of: youtube, loom. Null if the lesson has no embed.

  Available options: `youtube`, `loom`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the lesson.

  Example: `lesn_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="lesson_type" type="LessonTypes" required>
  The content format of this lesson. One of: text, video, pdf, multi, quiz, knowledge\_check.

  Available options: `text`, `video`, `pdf`, `multi`, `quiz`, `knowledge_check`
</ResponseField>

<ResponseField name="main_pdf" type="object | null" required>
  The primary PDF document for PDF-type lessons. Null if this lesson is not a PDF lesson or no PDF has been uploaded.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="filename" type="string | null" required>
      The original filename of the uploaded attachment, including its file extension.

      Example: `document.pdf`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="order" type="integer" required>
  The sort position of this lesson within its parent chapter, starting from zero.

  Example: `42`
</ResponseField>

<ResponseField name="thumbnail" type="object | null" required>
  The thumbnail image displayed on lesson cards and previews. Null if no thumbnail has been uploaded.

  <Expandable title="child attributes">
    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="title" type="string" required>
  The display name of the lesson shown to students. Maximum 120 characters.

  Example: `Understanding Candlestick Patterns`
</ResponseField>

<ResponseField name="video_asset" type="object | null" required>
  The Mux video asset for video-type lessons, used for streaming playback. Null if this lesson has no hosted video.

  <Expandable title="child attributes">
    <ResponseField name="asset_id" type="string | null" required>
      The Mux-provided ID of the asset
    </ResponseField>

    <ResponseField name="audio_only" type="boolean" required>
      Whether this asset contains only audio
    </ResponseField>

    <ResponseField name="created_at" type="string<date-time>" required>
      The datetime the mux asset was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="duration_seconds" type="integer | null" required>
      The duration of the video in seconds

      Example: `42`
    </ResponseField>

    <ResponseField name="finished_uploading_at" type="string<date-time> | null" required>
      The time at which the video finished uploading

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the mux asset.

      Example: `mux_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="playback_id" type="string | null" required>
      The public playback ID of the Mux asset
    </ResponseField>

    <ResponseField name="signed_playback_id" type="string | null" required>
      The signed playback ID of the Mux asset
    </ResponseField>

    <ResponseField name="signed_storyboard_playback_token" type="string | null" required>
      The signed storyboard playback token of the Mux asset
    </ResponseField>

    <ResponseField name="signed_thumbnail_playback_token" type="string | null" required>
      The signed thumbnail playback token of the Mux asset
    </ResponseField>

    <ResponseField name="signed_video_playback_token" type="string | null" required>
      The signed video playback token of the Mux asset
    </ResponseField>

    <ResponseField name="status" type="MuxAssetStatuses" required>
      The status of the Mux asset

      Available options: `uploading`, `created`, `ready`
    </ResponseField>

    <ResponseField name="updated_at" type="string<date-time>" required>
      The datetime the mux asset was last updated.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="visibility" type="LessonVisibilities" required>
  The visibility setting that controls whether this lesson appears to students. One of: visible, hidden.

  Available options: `visible`, `hidden`
</ResponseField>
