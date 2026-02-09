# Getting Started

@stacksjs/ts-md is a fast, native Bun-powered markdown parser with frontmatter support. It replaces gray-matter, marked, and yaml with performance-optimized implementations.

## Installation

Install @stacksjs/ts-md using your preferred package manager:

```bash
# Using bun (recommended)
bun add @stacksjs/ts-md

# Using npm
npm install @stacksjs/ts-md

# Using pnpm
pnpm add @stacksjs/ts-md

# Using yarn
yarn add @stacksjs/ts-md
```

## Basic Usage

### Parse Markdown to HTML

```typescript
import { parseMarkdown } from '@stacksjs/ts-md'

const markdown = `
# Welcome to ts-md

This is a **bold** statement with *italic* text.

- Item 1
- Item 2
- Item 3
`

const html = parseMarkdown(markdown)
console.log(html)
```

Output:
```html
<h1 id="welcome-to-ts-md">Welcome to ts-md</h1>
<p>This is a <strong>bold</strong> statement with <em>italic</em> text.</p>
<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ul>
```

### Parse with Frontmatter

```typescript
import { parseFrontmatter } from '@stacksjs/ts-md'

const content = `---
title: My Blog Post
author: John Doe
date: 2024-01-15
tags:
  - typescript
  - markdown
---

# Hello World

Welcome to my blog!`

const { data, content: markdown } = parseFrontmatter(content)

console.log(data)
// { title: 'My Blog Post', author: 'John Doe', date: '2024-01-15', tags: ['typescript', 'markdown'] }

console.log(markdown)
// # Hello World\n\nWelcome to my blog!
```

### Combined Parsing

For convenience, parse both frontmatter and markdown in a single call:

```typescript
import { parseMarkdownWithFrontmatter } from '@stacksjs/ts-md'

const content = `---
title: Quick Start Guide
---

# Getting Started

This is the content.`

const { data, content: markdown, html } = parseMarkdownWithFrontmatter(content)

console.log(data.title) // 'Quick Start Guide'
console.log(html)       // '<h1 id="getting-started">Getting Started</h1>\n<p>This is the content.</p>\n'
```

## Default Export

@stacksjs/ts-md also provides a default export for convenience:

```typescript
import markdownParser from '@stacksjs/ts-md'

// All functions available on the default export
const { data, content, html } = markdownParser.parseMarkdownWithFrontmatter(content)
```

## TypeScript Support

@stacksjs/ts-md is written in TypeScript and provides full type definitions:

```typescript
import type { MarkdownOptions, ParsedMarkdown } from '@stacksjs/ts-md'

// Type your frontmatter data
interface BlogPost {
  title: string
  author: string
  date: string
  tags: string[]
}

const { data } = parseFrontmatter<BlogPost>(content)
// data is typed as BlogPost
```

## CLI Usage

@stacksjs/ts-md includes a command-line interface:

```bash
# Parse a markdown file
md parse input.md

# Parse with output file
md parse input.md -o output.html

# Extract frontmatter only
md frontmatter input.md
```

## Next Steps

- Learn about [Parsing Options](/guide/parsing) for customizing markdown conversion
- Explore [Frontmatter](/guide/frontmatter) extraction with YAML, TOML, and JSON support
- Understand [HTML Conversion](/guide/html) and sanitization options
