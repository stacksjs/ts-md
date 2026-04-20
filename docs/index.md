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