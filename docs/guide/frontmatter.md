# Frontmatter Extraction

@stacksjs/ts-md provides a fast frontmatter parser that supports YAML, TOML, and JSON formats. It's a high-performance replacement for gray-matter.

## Basic Usage

```typescript
import { parseFrontmatter } from '@stacksjs/ts-md'

const content = `---
title: My Post
date: 2024-01-15
---

# Content here`

const { data, content: markdown } = parseFrontmatter(content)

console.log(data.title) // 'My Post'
console.log(markdown)   // '# Content here'
```

## Supported Formats

### YAML Frontmatter

YAML frontmatter uses `---` delimiters:

```markdown
---
title: My Post
author: John Doe
date: 2024-01-15
tags:

  - typescript
  - markdown

published: true
---

Content starts here.
```

### TOML Frontmatter

TOML frontmatter uses `+++` delimiters:

```markdown
+++
title = "My Post"
author = "John Doe"
date = "2024-01-15"
tags = ["typescript", "markdown"]
published = true
+++

Content starts here.
```

## Typed Frontmatter

Use TypeScript generics to type your frontmatter data:

```typescript
import { parseFrontmatter } from '@stacksjs/ts-md'

interface BlogPost {
  title: string
  author: string
  date: string
  tags: string[]
  published: boolean
  category?: string
}

const { data, content } = parseFrontmatter<BlogPost>(rawContent)

// data is fully typed
console.log(data.title)     // string
console.log(data.tags)      // string[]
console.log(data.published) // boolean
```

## Return Value

The `parseFrontmatter` function returns a `ParsedMarkdown` object:

```typescript
interface ParsedMarkdown<T = Record<string, any>> {
  data: T           // Parsed frontmatter as object
  content: string   // Markdown content without frontmatter
  original: string  // Original input string
  matter?: string   // Raw frontmatter string (without delimiters)
}
```

Example:

```typescript
const { data, content, original, matter } = parseFrontmatter(input)

console.log(data)     // { title: 'My Post', date: '2024-01-15' }
console.log(content)  // '# Content here'
console.log(matter)   // 'title: My Post\ndate: 2024-01-15'
```

## Utility Functions

### Check for Frontmatter

```typescript
import { hasFrontmatter } from '@stacksjs/ts-md/frontmatter'

if (hasFrontmatter(content)) {
  const { data } = parseFrontmatter(content)
  // Process frontmatter
}
```

### Extract Raw Frontmatter

```typescript
import { extractFrontmatter } from '@stacksjs/ts-md/frontmatter'

const rawFrontmatter = extractFrontmatter(content)
// Returns the raw frontmatter string without delimiters, or null if none found
```

### Stringify Frontmatter

Convert an object back to frontmatter format:

```typescript
import { stringifyFrontmatter } from '@stacksjs/ts-md'

const data = {
  title: 'My Post',
  date: '2024-01-15',
  tags: ['typescript', 'markdown']
}

const content = '# Hello World'

// Create markdown with YAML frontmatter
const result = stringifyFrontmatter(data, content, 'yaml')
/*
---
title: My Post
date: 2024-01-15
tags:

  - typescript
  - markdown

---
# Hello World
*/

// Or with TOML frontmatter
const tomlResult = stringifyFrontmatter(data, content, 'toml')
/*
+++
title = "My Post"
date = "2024-01-15"
tags = ["typescript", "markdown"]
+++
# Hello World
*/
```

## YAML Utilities

@stacksjs/ts-md includes a built-in YAML parser:

```typescript
import { parseYaml, stringifyYaml } from '@stacksjs/ts-md'

// Parse YAML string
const obj = parseYaml(`
title: My Post
tags:

  - typescript
  - markdown

`)

// Stringify object to YAML
const yaml = stringifyYaml({
  title: 'My Post',
  tags: ['typescript', 'markdown']
})
```

## Combined Parsing

Parse frontmatter and convert markdown to HTML in one call:

```typescript
import { parseMarkdownWithFrontmatter } from '@stacksjs/ts-md'

const result = parseMarkdownWithFrontmatter<BlogPost>(content)

console.log(result.data)    // Frontmatter object
console.log(result.content) // Raw markdown (without frontmatter)
console.log(result.html)    // Converted HTML
```

## Error Handling

Invalid frontmatter is handled gracefully:

```typescript
// Missing closing delimiter - returns empty data
const { data } = parseFrontmatter(`---
title: Incomplete
# No closing delimiter`)
// data = {}

// Invalid YAML - returns empty data
const { data } = parseFrontmatter(`---
invalid: yaml: syntax
---
content`)
// data = {}
```

## Performance

The frontmatter parser uses regex-based extraction with minimal allocations:

- Fast detection using character-based checks
- Lazy parsing - only parses when valid frontmatter is detected
- Efficient substring operations
- No intermediate object creation

Benchmark results:
```
@stacksjs/ts-md frontmatter:  1.2M ops/sec
gray-matter:        450K ops/sec
```

## API Reference

### `parseFrontmatter<T>(content)`

Extract and parse frontmatter from markdown content.

**Parameters:**

- `content: string` - The full markdown content with frontmatter

**Returns:** `ParsedMarkdown<T>`

### `stringifyFrontmatter<T>(data, content, format?)`

Create markdown content with frontmatter.

**Parameters:**

- `data: T` - Object to convert to frontmatter
- `content: string` - Markdown content
- `format?: 'yaml' | 'toml'` - Frontmatter format (default: 'yaml')

**Returns:** `string`

### `hasFrontmatter(content)`

Check if content has frontmatter.

**Parameters:**

- `content: string` - Content to check

**Returns:** `boolean`

### `extractFrontmatter(content)`

Extract raw frontmatter without parsing.

**Parameters:**

- `content: string` - Content to extract from

**Returns:** `string | null`
