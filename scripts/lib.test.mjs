import test from 'node:test'
import assert from 'node:assert/strict'
import { detectPython, detectStack, readmeSummary } from './lib.mjs'

test('detectStack maps package names and removes redundant React and Vite', () => {
  const stack = detectStack(JSON.stringify({
    dependencies: {
      next: '14',
      react: '18',
      vite: '5',
      three: '0.1',
      '@react-three/fiber': '8',
      tailwindcss: '3',
    },
  }))

  assert.deepEqual(stack, ['Next.js', 'React Three Fiber', 'Tailwind CSS'])
})

test('detectStack returns no more than six labels', () => {
  const packageJson = Object.fromEntries([
    'vue', 'nuxt', 'svelte', '@angular/core', 'astro', 'vite', 'three', 'gsap',
  ].map((name) => [name, '1']))

  assert.equal(detectStack(JSON.stringify({ dependencies: packageJson })).length, 6)
})

test('detectPython finds supported packages across requirements and README text', () => {
  assert.deepEqual(
    detectPython('beautifulsoup4==4.12\nrequests>=2', 'Uses Pandas, FastAPI and pytest.'),
    ['Pandas', 'BeautifulSoup', 'Requests', 'FastAPI', 'Pytest'],
  )
})

test('readmeSummary skips headings, badges, lists, and code fences without stripping underscores', () => {
  const summary = readmeSummary([
    '# Project',
    '[![Build](https://example.com/badge.svg)](https://example.com)',
    '',
    'This project creates an accessible experience for people who need useful tools like my_project_name.',
    '',
    '- A list item that should be ignored.',
    '```',
    'This code example should not be used as the summary.',
    '```',
  ].join('\n'))

  assert.equal(summary, 'This project creates an accessible experience for people who need useful tools like my_project_name.')
  assert.equal(readmeSummary('# React + Vite\n\nThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.\n\nCurrently, two official plugins are available.'), null)
})
