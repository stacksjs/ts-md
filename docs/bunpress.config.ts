import type { BunpressConfig } from 'bunpress'

const config: BunpressConfig = {
  name: 'ts-md',
  description: 'A fast, native Bun-powered markdown parser with frontmatter support',
  url: 'https://ts-md.netlify.app',

  theme: {
    primaryColor: '#3178c6',
  },

  sidebar: [
    { text: 'Introduction', link: '/' },
    {
      text: 'Guide',
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Parsing Markdown', link: '/guide/parsing' },
        { text: 'Frontmatter', link: '/guide/frontmatter' },
        { text: 'HTML Conversion', link: '/guide/html' },
      ],
    },
    {
      text: 'Features',
      items: [
        { text: 'GFM Support', link: '/features/gfm' },
        { text: 'Code Blocks', link: '/features/code-blocks' },
        { text: 'Tables', link: '/features/tables' },
        { text: 'Custom Containers', link: '/features/containers' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Custom Renderers', link: '/advanced/renderers' },
        { text: 'Plugin System', link: '/advanced/plugins' },
        { text: 'AST Manipulation', link: '/advanced/ast' },
        { text: 'Performance', link: '/advanced/performance' },
      ],
    },
  ],

  navbar: [
    { text: 'Guide', link: '/guide/getting-started' },
    { text: 'GitHub', link: 'https://github.com/stacksjs/ts-markdown' },
  ],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'og:title', content: 'ts-md' }],
    ['meta', { name: 'og:description', content: 'A fast, native Bun-powered markdown parser with frontmatter support' }],
  ],
}

export default config
