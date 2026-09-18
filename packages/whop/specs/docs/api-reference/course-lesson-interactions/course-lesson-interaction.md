> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Course Lesson Interaction

> A record of a user's progress on a specific lesson, tracking whether they have completed it.

<ResponseExample>
  ```json Example theme={null}
  {
  	"completed": true,
  	"course": {
  		"experience": {
  			"id": "exp_xxxxxxxxxxxxxx"
  		},
  		"id": "cors_xxxxxxxxxxxxx",
  		"title": "Introduction to Technical Analysis"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"id": "crsli_xxxxxxxxxxxx",
  	"lesson": {
  		"chapter": {
  			"id": "chap_xxxxxxxxxxxxx"
  		},
  		"id": "lesn_xxxxxxxxxxxxx",
  		"title": "Understanding Candlestick Patterns"
  	},
  	"user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="completed" type="boolean" required>
  Whether the user has finished this lesson.
</ResponseField>

<ResponseField name="course" type="object" required>
  The course that contains the tracked lesson.

  <Expandable title="child attributes">
    <ResponseField name="experience" type="object" required>
      The parent experience that this course belongs to.

      <Expandable title="child attributes">
        <ResponseField name="id" type="string" required>
          The unique identifier for the experience.

          Example: `exp_xxxxxxxxxxxxxx`
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the course.

      Example: `cors_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string | null" required>
      The display name of the course shown to students. Null if no title has been set.

      Example: `Introduction to Technical Analysis`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the lesson interaction was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the lesson interaction.

  Example: `crsli_xxxxxxxxxxxx`
</ResponseField>

<ResponseField name="lesson" type="object" required>
  The lesson that this progress record belongs to.

  <Expandable title="child attributes">
    <ResponseField name="chapter" type="object" required>
      The parent chapter that contains this lesson.

      <Expandable title="child attributes">
        <ResponseField name="id" type="string" required>
          The unique identifier for the chapter.

          Example: `chap_xxxxxxxxxxxxx`
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the lesson.

      Example: `lesn_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the lesson shown to students. Maximum 120 characters.

      Example: `Understanding Candlestick Patterns`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="user" type="object" required>
  The user whose progress is being tracked.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the user.

      Example: `user_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The user's display name shown on their public profile.

      Example: `John Doe`
    </ResponseField>

    <ResponseField name="username" type="string" required>
      The user's unique username shown on their public profile.

      Example: `johndoe42`
    </ResponseField>
  </Expandable>
</ResponseField>
