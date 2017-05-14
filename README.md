# Markdown Enricher
Small online tool to annotate a markdown text with HTML comments.

Namely:
- Document tags like:
  - Title
  - Type (one of: Transcript, Translation, Compilation)
  - Source
  - Tags
- Paragraph tags with id

Example

This text:
```
#Hello World

This is a simple paragraph. Nothing
unusual about it.

This is the second paragraph... well, counting headlines as paragraphs like this tool does, its actually the 3rd one.

```

Could be transformed in to this easily:

```
<!-- title="Hello World Doc" -->
<!-- type="Translation" -->
<!-- source="Tutorial for Hello World texts" -->
<!-- tags="nonsense, intro" -->

#Hello World
<!-- id="Tutorial for Hello World texts[0]" tags=""-->

This is a simple paragraph. Nothing
unusual about it.
<!-- id="Tutorial for Hello World texts[1]" tags=""-->

This is the second paragraph... well, counting headlines as paragraphs like this tool does, its actually the 3rd one.
<!-- id="Tutorial for Hello World texts[2]" tags=""-->

```
