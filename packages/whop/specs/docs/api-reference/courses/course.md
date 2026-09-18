> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Course

> A structured learning module containing chapters and lessons, belonging to an experience.

<ResponseExample>
  ```json Example theme={null}
  {
  	"certificate_after_completion_enabled": true,
  	"chapters": [
  		{
  			"id": "chap_xxxxxxxxxxxxx",
  			"lessons": [
  				{
  					"id": "lesn_xxxxxxxxxxxxx",
  					"lesson_type": "text",
  					"order": 42,
  					"thumbnail": {
  						"url": "https://media.whop.com/abc123/optimized.jpg"
  					},
  					"title": "Understanding Candlestick Patterns",
  					"video_asset": {
  						"duration_seconds": 42,
  						"signed_playback_id": "<string>",
  						"signed_thumbnail_playback_token": "<string>"
  					}
  				}
  			],
  			"order": 42,
  			"title": "Getting Started"
  		}
  	],
  	"chapters_count": 42,
  	"completed_lessons_count": 42,
  	"cover_image": "https://assets.whop.com/images/course-cover.jpg",
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"description": "Learn advanced trading strategies from industry experts.",
  	"id": "cors_xxxxxxxxxxxxx",
  	"language": "en",
  	"latest_lesson_created_at": "2023-12-01T05:00:00.401Z",
  	"lesson_unlock_days": [42],
  	"order": "123.45",
  	"require_completing_lessons_in_order": true,
  	"resume_lesson": {
  		"id": "lesn_xxxxxxxxxxxxx"
  	},
  	"started_at": "2023-12-01T05:00:00.401Z",
  	"tagline": "Master the fundamentals in 30 days",
  	"thumbnail": {
  		"content_type": "image/jpeg",
  		"filename": "document.pdf",
  		"id": "<string>",
  		"optimized_url": "https://media.whop.com/abc123/optimized.jpg",
  		"source_url": "https://media.whop.com/abc123/original.jpg"
  	},
  	"title": "Introduction to Technical Analysis",
  	"total_duration_seconds": 42,
  	"total_lessons_count": 42,
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"visibility": "visible"
  }
  ```
</ResponseExample>

<ResponseField name="certificate_after_completion_enabled" type="boolean | null" required>
  Whether students receive a PDF certificate after completing all lessons in
  this course. Null if the setting has not been configured.
</ResponseField>

<ResponseField name="chapters" type="array<object>" required>
  An ordered list of all chapters in this course, sorted by their display position.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the chapter.

      Example: `chap_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="lessons" type="array<object>" required>
      An ordered list of lessons in this chapter, sorted by display position. Hidden lessons are excluded for non-admin users.

      <Expandable title="child attributes">
        <ResponseField name="id" type="string" required>
          The unique identifier for the lesson.

          Example: `lesn_xxxxxxxxxxxxx`
        </ResponseField>

        <ResponseField name="lesson_type" type="LessonTypes" required>
          The content format of this lesson. One of: text, video, pdf, multi, quiz, knowledge\_check.

          Available options: `text`, `video`, `pdf`, `multi`, `quiz`, `knowledge_check`
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
            <ResponseField name="duration_seconds" type="integer | null" required>
              The duration of the video in seconds

              Example: `42`
            </ResponseField>

            <ResponseField name="signed_playback_id" type="string | null" required>
              The signed playback ID of the Mux asset
            </ResponseField>

            <ResponseField name="signed_thumbnail_playback_token" type="string | null" required>
              The signed thumbnail playback token of the Mux asset
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="order" type="integer" required>
      The sort position of this chapter within its parent course, starting from zero.

      Example: `42`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the chapter shown to students. Maximum 150 characters.

      Example: `Getting Started`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="chapters_count" type="integer" required>
  The total number of chapters in this course, including chapters whose lessons are all hidden from the current user.

  Example: `42`
</ResponseField>

<ResponseField name="completed_lessons_count" type="integer" required>
  The number of lessons in this course that the current user has marked as completed. Zero when the request is not made on behalf of a user.

  Example: `42`
</ResponseField>

<ResponseField name="cover_image" type="string | null" required>
  The URL of the course cover image shown on preview cards. Null if no cover image has been uploaded.

  Example: `https://assets.whop.com/images/course-cover.jpg`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the course was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="description" type="string | null" required>
  A brief summary of the course content and objectives. Null if no description has been set.

  Example: `Learn advanced trading strategies from industry experts.`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the course.

  Example: `cors_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="language" type="Languages" required>
  The spoken language of the video content, used to generate accurate closed captions. One of: en, es, it, pt, de, fr, pl, ru, nl, ca, tr, sv, uk, no, fi, sk, el, cs, hr, da, ro, bg.

  Available options: `en`, `es`, `it`, `pt`, `de`, `fr`, `pl`, `ru`, `nl`, `ca`, `tr`, `sv`, `uk`, `no`, `fi`, `sk`, `el`, `cs`, `hr`, `da`, `ro`, `bg`
</ResponseField>

<ResponseField name="latest_lesson_created_at" type="string<date-time> | null" required>
  The creation timestamp of the most recently added lesson visible to the current user. Null if the course has no lessons.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="lesson_unlock_days" type="array<integer>" required>
  The distinct drip schedules, in days after the course start, of lessons
  visible to the current user. Combine with startedAt to work out which have
  unlocked. Empty when the user has not started the course or no lesson is on a
  schedule.
</ResponseField>

<ResponseField name="order" type="string" required>
  The sort position of this course within its parent experience, as a decimal for flexible ordering.

  Example: `123.45`
</ResponseField>

<ResponseField name="require_completing_lessons_in_order" type="boolean" required>
  Whether students must complete each lesson sequentially before advancing to
  the next one.
</ResponseField>

<ResponseField name="resume_lesson" type="object | null" required>
  The lesson the current user should continue from: their first incomplete lesson, or the first lesson when they have finished the course, have not started it, or can edit it. Null if the course has no lessons.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the lesson.

      Example: `lesn_xxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="started_at" type="string<date-time> | null" required>
  The earliest time the current user is known to have started this course. Null if they have not started it. Drip unlock schedules are measured from this point.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="tagline" type="string | null" required>
  A short marketing tagline displayed beneath the course title. Null if no tagline has been set.

  Example: `Master the fundamentals in 30 days`
</ResponseField>

<ResponseField name="thumbnail" type="object | null" required>
  The thumbnail image displayed on course cards and previews. Null if no thumbnail has been uploaded.

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

    <ResponseField name="optimized_url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>

    <ResponseField name="source_url" type="string | null" required>
      The original source URL of the attachment, such as a direct link to S3. This should never be displayed on the client and should always be passed through an Imgproxy transformer.

      Example: `https://media.whop.com/abc123/original.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="title" type="string | null" required>
  The display name of the course shown to students. Null if no title has been set.

  Example: `Introduction to Technical Analysis`
</ResponseField>

<ResponseField name="total_duration_seconds" type="integer" required>
  The combined duration in seconds of every hosted video across the lessons visible to the current user.

  Example: `42`
</ResponseField>

<ResponseField name="total_lessons_count" type="integer" required>
  The number of lessons in this course visible to the current user.

  Example: `42`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the course was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="visibility" type="CourseVisibilities" required>
  The visibility setting that controls whether this course appears to students. One of: visible, hidden.

  Available options: `visible`, `hidden`
</ResponseField>
