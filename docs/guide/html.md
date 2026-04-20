# HTML Conversion

@stacksjs/ts-md converts markdown to clean, semantic HTML with support for sanitization and custom rendering.

## Basic Conversion

```typescript
import { parseMarkdown } from '@stacksjs/ts-md'

const markdown = `
# Hello World

This is **bold** and *italic* text.

- List item 1
- List item 2

`

const html = parseMarkdown(markdown)
```

Output:
```html
<h1 id="hello-world">Hello World</h1>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
<li>List item 1</li>
<li>List item 2</li>
</ul>
```

## HTML Sanitization

Protect against XSS attacks by sanitizing HTML output:

```typescript
import { sanitizeHtml } from '@stacksjs/ts-md'

const userInput = '<script>alert("XSS")</script><p>Safe content</p>'

const clean = sanitizeHtml(userInput, {
  allowedTags: ['p', 'strong', 'em', 'a', 'code'],
  allowedAttributes: {
    a: ['href', 'title']
  },
  allowedSchemes: ['http', 'https', 'mailto']
})

console.log(clean)
// <p>Safe content</p>
```

### Sanitization Options

```typescript
interface SanitizeOptions {
  // Tags allowed in output
  allowedTags?: string[]

  // Attributes allowed per tag
  allowedAttributes?: Record<string, string[]>

  // URL schemes allowed in href/src
  allowedSchemes?: string[]

  // Remove all tags (returns plain text)
  stripAllTags?: boolean
}
```

### Default Allowed Tags

When no options are provided, these tags are allowed:

- Block: `p`, `div`, `h1`-`h6`, `blockquote`, `pre`, `ul`, `ol`, `li`
- Inline: `a`, `strong`, `em`, `code`, `span`, `br`
- Media: `img`
- Table: `table`, `thead`, `tbody`, `tr`, `th`, `td`

## Header ID Generation

Headers automatically receive ID attributes for anchor linking:

```typescript
const html = parseMarkdown('# Hello World')
// <h1 id="hello-world">Hello World</h1>

const html = parseMarkdown('## Getting Started Guide')
// <h2 id="getting-started-guide">Getting Started Guide</h2>
```

### Customize Header IDs

```typescript
const html = parseMarkdown(markdown, {
  headerIds: true,
  headerPrefix: 'section-'
})

// # My Header -> <h1 id="section-my-header">My Header</h1>
```

Disable header IDs:

```typescript
const html = parseMarkdown(markdown, {
  headerIds: false
})

// # My Header -> <h1>My Header</h1>
```

## HTML Escaping

Content is automatically escaped to prevent XSS:

```typescript
const markdown = 'Use <script> tags carefully'
const html = parseMarkdown(markdown)
// <p>Use &lt;script&gt; tags carefully</p>
```

The following characters are escaped:

- `&` -> `&amp;`
- `<` -> `&lt;`
- `>` -> `&gt;`
- `"` -> `&quot;`
- `'` -> `&#39;`

## Code Block Rendering

Code blocks are rendered with language classes:

````typescript
const markdown = `
\`\`\`javascript
const greeting = 'Hello'
console.log(greeting)
\`\`\`
`

const html = parseMarkdown(markdown)
````

Output:
```html
<pre><code class="language-javascript">const greeting = 'Hello'
console.log(greeting)</code></pre>
```

### Custom Syntax Highlighting

Integrate with syntax highlighters:

```typescript
import { parseMarkdown } from '@stacksjs/ts-md'
import { highlight } from 'ts-syntax-highlighter'

const html = parseMarkdown(markdown, {
  highlight: (code, lang) => {
    if (lang) {
      try {
        return highlight(code, { language: lang })
      } catch {
        return code
      }
    }
    return code
  }
})
```

## Table Rendering

GFM tables are converted to HTML tables:

```markdown
| Name | Age | City |
|------|-----|------|
| John | 30  | NYC  |
| Jane | 25  | LA   |
```

Output:
```html
<table>
<thead>
<tr>
<th>Name</th>
<th>Age</th>
<th>City</th>
</tr>
</thead>
<tbody>
<tr>
<td>John</td>
<td>30</td>
<td>NYC</td>
</tr>
<tr>
<td>Jane</td>
<td>25</td>
<td>LA</td>
</tr>
</tbody>
</table>
```

### Table Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    |   C    |     R |
```

Output:
```html
<th align="left">Left</th>
<th align="center">Center</th>
<th align="right">Right</th>
```

## Task List Rendering

GFM task lists render as checkboxes:

```markdown

- [x] Completed task
- [ ] Incomplete task

```

Output:
```html
<ul>
<li><input type="checkbox" checked disabled> Completed task</li>
<li><input type="checkbox" disabled> Incomplete task</li>
</ul>
```

## Line Breaks

Control how newlines are handled:

```typescript
// Default: newlines ignored within paragraphs
parseMarkdown('Line 1\nLine 2')
// <p>Line 1 Line 2</p>

// With breaks enabled
parseMarkdown('Line 1\nLine 2', { breaks: true })
// <p>Line 1<br>Line 2</p>
```

## Combined Parsing with HTML

Parse frontmatter and get HTML in one call:

```typescript
import { parseMarkdownWithFrontmatter } from '@stacksjs/ts-md'

const content = `---
title: My Post
---

# Hello World

Content here.`

const { data, content: markdown, html } = parseMarkdownWithFrontmatter(content)

console.log(data.title) // 'My Post'
console.log(html)       // '<h1 id="hello-world">Hello World</h1>\n<p>Content here.</p>\n'
```

## API Reference

### `sanitizeHtml(html, options?)`

Sanitize HTML to prevent XSS attacks.

**Parameters:**

- `html: string` - HTML content to sanitize
- `options?: SanitizeOptions` - Sanitization configuration

**Returns:** `string` - Sanitized HTML

### SanitizeOptions Interface

```typescript
interface SanitizeOptions {
  allowedTags?: string[]
  allowedAttributes?: Record<string, string[]>
  allowedSchemes?: string[]
  stripAllTags?: boolean
}
```

### Common Sanitization Presets

```typescript
// Strict - text only
const strictOptions = {
  allowedTags: ['p', 'br'],
  allowedAttributes: {}
}

// Basic formatting
const basicOptions = {
  allowedTags: ['p', 'strong', 'em', 'br', 'ul', 'ol', 'li'],
  allowedAttributes: {}
}

// Rich content
const richOptions = {
  allowedTags: ['p', 'h1', 'h2', 'h3', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code'],
  allowedAttributes: {
    a: ['href', 'title'],
    img: ['src', 'alt', 'title']
  },
  allowedSchemes: ['http', 'https']
}
```
