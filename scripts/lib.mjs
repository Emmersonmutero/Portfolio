const packageLabels = [
  [['next'], 'Next.js'],
  [['react'], 'React'],
  [['vue'], 'Vue'],
  [['nuxt'], 'Nuxt'],
  [['svelte'], 'Svelte'],
  [['@angular/core', 'angular'], 'Angular'],
  [['astro'], 'Astro'],
  [['vite'], 'Vite'],
  [['@react-three/fiber'], 'React Three Fiber'],
  [['three'], 'Three.js'],
  [['gsap'], 'GSAP'],
  [['framer-motion'], 'Framer Motion'],
  [['tailwindcss'], 'Tailwind CSS'],
  [['sass'], 'Sass'],
  [['express'], 'Express'],
  [['@supabase/supabase-js', 'supabase'], 'Supabase'],
  [['firebase'], 'Firebase'],
  [['stripe'], 'Stripe'],
  [['mongodb'], 'MongoDB'],
  [['prisma', '@prisma/client'], 'Prisma'],
  [['zustand'], 'Zustand'],
  [['redux', '@reduxjs/toolkit'], 'Redux'],
  [['recharts'], 'Recharts'],
  [['react-router', 'react-router-dom'], 'React Router'],
  [['typescript'], 'TypeScript'],
]

export const detectStack = (packageJsonText) => {
  if (!packageJsonText) return []

  const packageJson = JSON.parse(packageJsonText)
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
    ...packageJson.optionalDependencies,
  }
  const installed = new Set(Object.keys(dependencies).map((name) => name.toLowerCase()))
  const found = packageLabels
    .filter(([names]) => names.some((name) => installed.has(name)))
    .map(([, label]) => label)

  const filtered = found
    .filter((label) => !(found.includes('Next.js') && ['React', 'Vite'].includes(label)))
    .filter((label) => !(found.includes('React Three Fiber') && label === 'Three.js'))

  return filtered.slice(0, 6)
}

const pythonLabels = [
  [/\bpandas\b/i, 'Pandas'],
  [/\bfpdf(?:2)?\b/i, 'FPDF'],
  [/\bbeautifulsoup(?:4)?\b|\bbs4\b/i, 'BeautifulSoup'],
  [/\brequests\b/i, 'Requests'],
  [/\bselenium\b/i, 'Selenium'],
  [/\bflask\b/i, 'Flask'],
  [/\bdjango\b/i, 'Django'],
  [/\bfastapi\b/i, 'FastAPI'],
  [/\bnumpy\b/i, 'NumPy'],
  [/\bpytest\b/i, 'Pytest'],
]

export const detectPython = (...texts) => {
  const content = texts.filter(Boolean).join('\n')
  return pythonLabels
    .filter(([pattern]) => pattern.test(content))
    .map(([, label]) => label)
}

const isTemplateReadme = (markdown) => {
  const content = markdown.toLowerCase()
  const viteTemplate =
    content.includes('this template provides a minimal setup to get react working in vite') &&
    content.includes('currently, two official plugins are available')
  const craTemplate =
    content.includes('this project was bootstrapped with create react app') &&
    content.includes('## available scripts')

  return viteTemplate || craTemplate
}

const cleanParagraph = (paragraph) =>
  paragraph
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/<img\b[^>]*>/gi, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*~]/g, '')
    .replace(/(?<![A-Za-z0-9])_|_(?![A-Za-z0-9])/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export const readmeSummary = (markdown) => {
  if (!markdown?.trim() || isTemplateReadme(markdown)) return null

  const lines = markdown.replace(/\r\n?/g, '\n').split('\n')
  const paragraphs = []
  let current = []
  let inCodeFence = false

  const flushParagraph = () => {
    if (current.length) paragraphs.push(current.join(' '))
    current = []
  }

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      flushParagraph()
      inCodeFence = !inCodeFence
      continue
    }
    if (inCodeFence) continue

    const trimmed = line.trim()
    if (
      !trimmed ||
      /^#{1,6}\s/.test(trimmed) ||
      /^[-*+]\s/.test(trimmed) ||
      /^\d+[.)]\s/.test(trimmed) ||
      /^>\s?/.test(trimmed) ||
      /^\|/.test(trimmed) ||
      /^<img\b/i.test(trimmed)
    ) {
      flushParagraph()
      continue
    }

    current.push(trimmed)
  }
  flushParagraph()

  for (const paragraph of paragraphs) {
    const cleaned = cleanParagraph(paragraph)
    const sentences = cleaned.match(/[^.!?]+[.!?](?:\s|$)|[^.!?]+$/g) || []

    for (const sentence of sentences) {
      const summary = sentence.trim()
      if (summary.length >= 40 && summary.length <= 220) return summary
    }
  }

  return null
}
