---
title: AI
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# AI

##### [Execute AI model](https://developers.cloudflare.com/api/resources/ai/methods/run)

POST/accounts/{account\_id}/ai/run/{model\_name}

##### ModelsExpand Collapse

<details>

<summary>

AIRunResponse = array of object {label, score } or stringor object {audio } or 12 more

An array of classification results for the input text

</summary>

One of the following:

<details>

<summary>

TextClassification = array of object {label, score }

An array of classification results for the input text

</summary>

label: optional string

The classification label assigned to the text (e.g., ‘POSITIVE’ or ‘NEGATIVE’)

<a href="#">Link to this property</a>

score: optional number

Confidence score indicating the likelihood that the text belongs to the specified label

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

TextToImage = string

The generated image in PNG format

<a href="#">Link to this property</a>

<details>

<summary>

Audio object {audio }

</summary>

audio: optional string

The generated audio in MP3 format, base64-encoded

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

The generated audio in MP3 format

<a href="#">Link to this property</a>

<details>

<summary>

TextEmbeddings object {data, shape }

</summary>

data: optional array of array of number

Embeddings of the requested text values

<a href="#">Link to this property</a>

shape: optional array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AutomaticSpeechRecognition object {text, vtt, word\_count, words }

</summary>

text: string

The transcription

<a href="#">Link to this property</a>

vtt: optional string

<a href="#">Link to this property</a>

word\_count: optional number

<a href="#">Link to this property</a>

<details>

<summary>

words: optional array of object {end, start, word }

</summary>

end: optional number

The ending second when the word completes

<a href="#">Link to this property</a>

start: optional number

The second this word begins in the recording

<a href="#">Link to this property</a>

word: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ImageClassification = array of object {label, score }

</summary>

label: optional string

The predicted category or class for the input image based on analysis

<a href="#">Link to this property</a>

score: optional number

A confidence value, between 0 and 1, indicating how certain the model is about the predicted label

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ObjectDetection = array of object {box, label, score }

An array of detected objects within the input image

</summary>

<details>

<summary>

box: optional object {xmax, xmin, ymax, ymin }

Coordinates defining the bounding box around the detected object

</summary>

xmax: optional number

The x-coordinate of the bottom-right corner of the bounding box

<a href="#">Link to this property</a>

xmin: optional number

The x-coordinate of the top-left corner of the bounding box

<a href="#">Link to this property</a>

ymax: optional number

The y-coordinate of the bottom-right corner of the bounding box

<a href="#">Link to this property</a>

ymin: optional number

The y-coordinate of the top-left corner of the bounding box

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

The class label or name of the detected object

<a href="#">Link to this property</a>

score: optional number

Confidence score indicating the likelihood that the detection is correct

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {response, tool\_calls, usage }

</summary>

response: string

The generated text response from the model

<a href="#">Link to this property</a>

<details>

<summary>

tool\_calls: optional array of object {arguments, name }

An array of tool calls requests made during the response generation

</summary>

arguments: optional unknown

The arguments passed to be passed to the tool call request

<a href="#">Link to this property</a>

name: optional string

The name of the tool to be called

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

usage: optional object {completion\_tokens, prompt\_tokens, total\_tokens }

Usage statistics for the inference request

</summary>

completion\_tokens: optional number

Total number of tokens in output

<a href="#">Link to this property</a>

prompt\_tokens: optional number

Total number of tokens in input

<a href="#">Link to this property</a>

total\_tokens: optional number

Total number of input and output tokens

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

<details>

<summary>

Translation object {translated\_text }

</summary>

translated\_text: optional string

The translated text in the target language

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Summarization object {summary }

</summary>

summary: optional string

The summarized version of the input text

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ImageToText object {description }

</summary>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ImageTextToText object {description }

</summary>

description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MultimodalEmbeddings object {data, shape }

</summary>

data: optional array of array of number

<a href="#">Link to this property</a>

shape: optional array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai%20%3E%20(model)%20ai_run_response%20%3E%20(schema)>)

#### AIFinetunes

##### [List Finetunes](https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/methods/list)

GET/accounts/{account\_id}/ai/finetunes

##### [Create a new Finetune](https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/methods/create)

POST/accounts/{account\_id}/ai/finetunes

##### ModelsExpand Collapse

<details>

<summary>

FinetuneListResponse object {id, created\_at, model, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

model: string

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.finetunes%20%3E%20(model)%20finetune_list_response%20%3E%20(schema)>)

<details>

<summary>

FinetuneCreateResponse object {id, created\_at, model, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

model: string

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

public: boolean

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.finetunes%20%3E%20(model)%20finetune_create_response%20%3E%20(schema)>)

#### AIFinetunesAssets

##### [Upload a Finetune Asset](https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/subresources/assets/methods/create)

POST/accounts/{account\_id}/ai/finetunes/{finetune\_id}/finetune-assets

##### ModelsExpand Collapse

<details>

<summary>

AssetCreateResponse object {success }

</summary>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.finetunes.assets%20%3E%20(model)%20asset_create_response%20%3E%20(schema)>)

#### AIFinetunesPublic

##### [List Public Finetunes](https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/subresources/public/methods/list)

GET/accounts/{account\_id}/ai/finetunes/public

##### ModelsExpand Collapse

<details>

<summary>

PublicListResponse object {id, created\_at, model, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

model: string

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

public: boolean

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.finetunes.public%20%3E%20(model)%20public_list_response%20%3E%20(schema)>)

#### AIAuthors

##### [Author Search](https://developers.cloudflare.com/api/resources/ai/subresources/authors/methods/list)

GET/accounts/{account\_id}/ai/authors/search

##### ModelsExpand Collapse

AuthorListResponse = unknown

[Link to this property](#)%20ai.authors%20%3E%20(model)%20author_list_response%20%3E%20(schema)>)

#### AITasks

##### [Task Search](https://developers.cloudflare.com/api/resources/ai/subresources/tasks/methods/list)

GET/accounts/{account\_id}/ai/tasks/search

##### ModelsExpand Collapse

TaskListResponse = unknown

[Link to this property](#)%20ai.tasks%20%3E%20(model)%20task_list_response%20%3E%20(schema)>)

#### AIModels

##### [Model Search](https://developers.cloudflare.com/api/resources/ai/subresources/models/methods/list)

GET/accounts/{account\_id}/ai/models/search

##### ModelsExpand Collapse

ModelListResponse = unknown

[Link to this property](#)%20ai.models%20%3E%20(model)%20model_list_response%20%3E%20(schema)>)

#### AIModelsSchema

##### [Get Model Schema](https://developers.cloudflare.com/api/resources/ai/subresources/models/subresources/schema/methods/get)

GET/accounts/{account\_id}/ai/models/schema

##### ModelsExpand Collapse

<details>

<summary>

SchemaGetResponse object {input, output }

</summary>

<details>

<summary>

input: object {additionalProperties, description, type }

</summary>

additionalProperties: boolean

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

output: object {additionalProperties, description, type }

</summary>

additionalProperties: boolean

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.models.schema%20%3E%20(model)%20schema_get_response%20%3E%20(schema)>)

#### AITo Markdown

##### [Convert Files into Markdown](https://developers.cloudflare.com/api/resources/ai/subresources/to_markdown/methods/transform)

POST/accounts/{account\_id}/ai/tomarkdown

##### [Get all converted formats supported](https://developers.cloudflare.com/api/resources/ai/subresources/to_markdown/methods/supported)

GET/accounts/{account\_id}/ai/tomarkdown/supported

##### ModelsExpand Collapse

<details>

<summary>

ToMarkdownTransformResponse object {data, format, mimeType, 2 more }

</summary>

data: string

<a href="#">Link to this property</a>

format: string

<a href="#">Link to this property</a>

mimeType: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

tokens: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.to_markdown%20%3E%20(model)%20to_markdown_transform_response%20%3E%20(schema)>)

<details>

<summary>

ToMarkdownSupportedResponse object {extension, mimeType }

</summary>

extension: string

<a href="#">Link to this property</a>

mimeType: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.to_markdown%20%3E%20(model)%20to_markdown_supported_response%20%3E%20(schema)>)