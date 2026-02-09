---
layout: home

hero:
  name: "ts-md"
  text: "Fast Markdown Parser"
  tagline: "A native Bun-powered markdown parser with frontmatter support"
  image: /images/logo-white.png
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/stacksjs/ts-markdown

features:
  - title: "High Performance"
    icon: "lightning"
    details: "2-3x faster than markdown-it, optimized for Bun with flat token stream architecture."
  - title: "GFM Support"
    icon: "github"
    details: "Full GitHub Flavored Markdown including tables, task lists, and strikethrough."
  - title: "Frontmatter Parsing"
    icon: "file-text"
    details: "Extract YAML, TOML, or JSON frontmatter with typed support."
  - title: "HTML Sanitization"
    icon: "shield"
    details: "Built-in XSS protection with configurable sanitization rules."
---

## Overview

@stacksjs/ts-md is a high-performance markdown parser and sanitizer built for Bun. It provides a complete solution for parsing markdown with frontmatter support.

## Quick Start

```bash
bun add @stacksjs/ts-md
```

```typescript
import { parseMarkdown, parseFrontmatter } from '@stacksjs/ts-md'

// Parse markdown to HTML
const html = parseMarkdown('# Hello **world**')

// Extract frontmatter
const { data, content } = parseFrontmatter(`---
title: My Post
---
# Content`)
```

## Performance

| Document Size | @stacksjs/ts-md | markdown-it | marked |
|---------------|-------|-------------|--------|
| Small (< 1KB) | 324B ops/sec | 112B ops/sec | 26B ops/sec |
| Medium (~3KB) | 34.7B ops/sec | 17.7B ops/sec | 2.8B ops/sec |
| Large (~50KB) | 1.81B ops/sec | 1.25B ops/sec | 16M ops/sec |

## API Reference

| Function | Description |
|----------|-------------|
| `parseMarkdown(md, options?)` | Convert markdown to HTML |
| `parseFrontmatter(content)` | Extract frontmatter and content |
| `parseMarkdownWithFrontmatter(content)` | Parse both in one call |
| `sanitizeHtml(html, options?)` | Sanitize HTML output |
| `parseYaml(yaml)` | Parse YAML string to object |
| `stringifyYaml(obj)` | Convert object to YAML string |
