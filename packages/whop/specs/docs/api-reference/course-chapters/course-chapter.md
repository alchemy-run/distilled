> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Course Chapter

> A grouping of related lessons within a course, used to organize content into sections.

<ResponseExample>
  ```json Example theme={null}
  {
  	"id": "chap_xxxxxxxxxxxxx",
  	"lessons": [
  		{
  			"id": "lesn_xxxxxxxxxxxxx",
  			"order": 42,
  			"title": "Understanding Candlestick Patterns"
  		}
  	],
  	"order": 42,
  	"title": "Getting Started"
  }
  ```
</ResponseExample>

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

    <ResponseField name="order" type="integer" required>
      The sort position of this lesson within its parent chapter, starting from zero.

      Example: `42`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the lesson shown to students. Maximum 120 characters.

      Example: `Understanding Candlestick Patterns`
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
