# Parsing Markdown

@stacksjs/ts-md provides a powerful markdown parser with support for GitHub Flavored Markdown (GFM) and various customization options.

## Basic Parsing

```typescript
import { parseMarkdown } from '@stacksjs/ts-md'

const html = parseMarkdown('# Hello **world**')
// <h1 id="hello-world">Hello <strong>world</strong></h1>
```

## Parser Options

Configure the parser with various options:

```typescript
import { parseMarkdown } from '@stacksjs/ts-md'

const html = parseMarkdown(markdown, {
  gfm: true,              // GitHub Flavored Markdown (default: true)
  breaks: false,          // Convert \n to <br> (default: false)
  headerIds: true,        // Generate header IDs (default: true)
  headerPrefix: '',       // Prefix for header IDs (default: '')
  pedantic: false,        // Strict markdown parsing (default: false)
  smartLists: true,       // Smart list behavior (default: true)
  smartypants: false,     // Smart typography (default: false)
  sanitize: false,        // Sanitize HTML output (default: false)
  highlight: (code, lang) => {
    // Custom syntax highlighting
    return highlightedCode
  }
})
```

## Supported Markdown Features

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

All headings automatically receive ID attributes based on their content:

```html
<h1 id="heading-1">Heading 1</h1>
<h2 id="heading-2">Heading 2</h2>
```

### Emphasis

```markdown
*italic* or _italic_
**bold** or __bold__
***bold and italic***
~~strikethrough~~
```

### Links and Images

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title")
![Image alt](image.png)
![Image with title](image.png "Title")
```

### Code

Inline code:
```markdown
Use `code` inline
```

Code blocks with syntax highlighting:
````markdown
```javascript
const greeting = 'Hello World'
console.log(greeting)
```
````

### Lists

Unordered lists:
```markdown
- Item 1
- Item 2
  - Nested item
- Item 3
```

Ordered lists:
```markdown
1. First item
2. Second item
3. Third item
```

Task lists (GFM):
```markdown
- [x] Completed task
- [ ] Incomplete task
```

### Tables (GFM)

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| Cell     | Cell     | Cell     |
```

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
```

### Horizontal Rules

```markdown
---
***
___
```

## Custom Syntax Highlighting

Integrate with syntax highlighters:

```typescript
import { parseMarkdown } from '@stacksjs/ts-md'
import { highlight } from 'ts-syntax-highlighter'

const html = parseMarkdown(markdown, {
  highlight: (code, lang) => {
    if (lang) {
      return highlight(code, { language: lang })
    }
    return code
  }
})
```

## Synchronous Parsing

For synchronous parsing (same API as async):

```typescript
import { parseMarkdownSync } from '@stacksjs/ts-md'

const html = parseMarkdownSync(markdown, options)
```

## Performance Tips

1. **Reuse options objects** - Create options once and reuse them
2. **Batch processing** - Parse multiple documents in sequence
3. **Disable unused features** - Turn off GFM if not needed

```typescript
// Optimized for speed
const fastOptions = {
  gfm: false,
  headerIds: false,
  smartLists: false,
}

const html = parseMarkdown(markdown, fastOptions)
```

## Error Handling

The parser is designed to be lenient and will not throw errors on malformed markdown. Instead, it will render the content as plain text where parsing fails.

```typescript
// Malformed markdown is handled gracefully
const html = parseMarkdown('[broken link')
// <p>[broken link</p>
```

## API Reference

### `parseMarkdown(markdown, options?)`

Converts markdown to HTML.

**Parameters:**
- `markdown: string` - The markdown content to parse
- `options?: MarkdownOptions` - Optional parsing configuration

**Returns:** `string` - The generated HTML

### `parseMarkdownSync(markdown, options?)`

Synchronous version of `parseMarkdown`.

### MarkdownOptions Interface

```typescript
interface MarkdownOptions {
  gfm?: boolean              // Enable GFM extensions
  breaks?: boolean           // Convert newlines to <br>
  headerIds?: boolean        // Generate header IDs
  headerPrefix?: string      // Prefix for header IDs
  pedantic?: boolean         // Strict parsing mode
  smartLists?: boolean       // Smart list behavior
  smartypants?: boolean      // Smart typography
  sanitize?: boolean         // Sanitize HTML output
  highlight?: (code: string, lang: string) => string
}
```
