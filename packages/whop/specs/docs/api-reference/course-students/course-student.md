> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Course Student

> An enrollment record for a student in a course, including progress and completion metrics.

<ResponseExample>
  ```json Example theme={null}
  {
  	"completed_lessons_count": 42,
  	"completion_rate": 6.9,
  	"course": {
  		"experience": {
  			"id": "exp_xxxxxxxxxxxxxx"
  		},
  		"id": "cors_xxxxxxxxxxxxx",
  		"title": "Introduction to Technical Analysis"
  	},
  	"first_interaction_at": "2023-12-01T05:00:00.401Z",
  	"id": "<string>",
  	"last_interaction_at": "2023-12-01T05:00:00.401Z",
  	"total_lessons_count": 42,
  	"user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="completed_lessons_count" type="integer" required>
  The total number of lessons this student has marked as completed in the course.

  Example: `42`
</ResponseField>

<ResponseField name="completion_rate" type="number" required>
  The percentage of available lessons the student has completed, as a value from 0 to 100 rounded to two decimal places.

  Example: `6.9`
</ResponseField>

<ResponseField name="course" type="object" required>
  The course this student is enrolled in.

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

<ResponseField name="first_interaction_at" type="string<date-time>" required>
  The timestamp when the student first interacted with this course, as a Unix timestamp.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the course student type.
</ResponseField>

<ResponseField name="last_interaction_at" type="string<date-time>" required>
  The timestamp when the student most recently interacted with this course, as a Unix timestamp.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="total_lessons_count" type="integer" required>
  The total number of visible lessons available to this student in the course.

  Example: `42`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user profile of the enrolled student.

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
