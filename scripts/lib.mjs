const stackLabels = [
  [['next'], 'Next.js'],
  [['react'], 'React'],
  [['vue'], 'Vue'],
  [['nuxt'], 'Nuxt'],
  [['svelte'], 'Svelte'],
  [['@angular/core'], 'Angular'],
  [['astro'], 'Astro'],
  [['vite'], 'Vite'],
  [['three'], 'Three.js'],
  [['@react-three/fiber'], 'React Three Fiber'],
  [['gsap'], 'GSAP'],
  [['framer-motion'], 'Framer Motion'],
  [['tailwindcss'], 'Tailwind CSS'],
  [['sass'], 'Sass'],
  [['express'], 'Express'],
  [['@supabase/supabase-js', 'supabase'], 'Supabase'],
  [['firebase', 'firebase-admin'], 'Firebase'],
  [['stripe'], 'Stripe'],
  [['mongodb'], 'MongoDB'],
  [['@prisma/client', 'prisma'], 'Prisma'],
  [['zustand'], 'Zustand'],
  [['@reduxjs/toolkit', 'redux'], 'Redux'],
  [['recharts'], 'Recharts'],
  [['react-router', 'react-router-dom'], 'React Router'],
  [['typescript'], 'TypeScript'],
]

export function detectStack(packageJsonText) {
  let packageJson
  try {
    packageJson = JSON.parse(packageJsonText ?? '')
  } catch {
    return []
  }

  const dependencies = new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ])
  const detected = stackLabels
    .filter(([names]) => names.some((name) => dependencies.has(name)))
    .map(([, label]) => label)

  const hasNext = detected.includes('Next.js')
  const hasReactThreeFiber = detected.includes('React Three Fiber')
  return detected.filter((label) => {
    if (hasNext && ['React', 'Vite'].includes(label)) return false
    if (hasReactThreeFiber && label === 'Three.js') return false
    return true
  }).slice(0, 6)
}

const pythonLibraries = [
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

export function detectPython(...texts) {
  const source = texts.filter((text) => typeof text === 'string').join('\n')
  return pythonLibraries
    .filter(([pattern]) => pattern.test(source))
    .map(([, label]) => label)
}

function isTemplateReadme(markdown) {
  return (
    /this template provides a minimal setup to get react working in vite/i.test(markdown) ||
    (
      /getting started with create react app/i.test(markdown) &&
      /learn react/i.test(markdown)
    )
  )
}

function isIgnoredReadmeLine(line) {
  const trimmed = line.trim()
  return (
    /^#{1,6}\s/.test(trimmed) ||
    /^(?:[-*+]\s|\d+[.)]\s)/.test(trimmed) ||
    /^>\s?/.test(trimmed) ||
    /^[-*_]{3,}$/.test(trimmed) ||
    /^\[[^\]]+\]:/.test(trimmed) ||
    /^<img\b/i.test(trimmed) ||
    trimmed.includes('![')
  )
}

function cleanMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function readmeSummary(markdown) {
  if (typeof markdown !== 'string' || isTemplateReadme(markdown)) return null

  const paragraphs = []
  let currentParagraph = []
  let inCodeFence = false

  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (/^(?:```|~~~)/.test(trimmed)) {
      inCodeFence = !inCodeFence
      continue
    }
    if (inCodeFence) continue
    if (!trimmed) {
      if (currentParagraph.length) {
        paragraphs.push(currentParagraph.join(' '))
        currentParagraph = []
      }
      continue
    }
    if (isIgnoredReadmeLine(line)) continue
    currentParagraph.push(line)
  }
  if (currentParagraph.length) paragraphs.push(currentParagraph.join(' '))

  if (!paragraphs.length) return null

  const paragraph = cleanMarkdown(paragraphs[0])
  const sentences = paragraph.match(/[^.!?]+[.!?]+(?=\s|$)/g) ?? []
  return sentences
    .map((sentence) => sentence.trim())
    .find((sentence) => sentence.length >= 40 && sentence.length <= 220) ?? null
}
