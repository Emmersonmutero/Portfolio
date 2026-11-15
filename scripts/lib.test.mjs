import assert from 'node:assert/strict'
import test from 'node:test'
import { detectPython, detectStack, readmeSummary } from './lib.mjs'

test('detectStack maps dependencies, removes redundant labels, and caps output', () => {
  const packageJson = JSON.stringify({
    dependencies: {
      next: '*',
      react: '*',
      vite: '*',
      '@react-three/fiber': '*',
      three: '*',
      'framer-motion': '*',
      tailwindcss: '*',
      zustand: '*',
      recharts: '*',
    },
  })

  assert.deepEqual(detectStack(packageJson), [
    'Next.js',
    'React Three Fiber',
    'Framer Motion',
    'Tailwind CSS',
    'Zustand',
    'Recharts',
  ])
  assert.deepEqual(detectStack('not-json'), [])
})

test('detectPython finds libraries in requirements and README text', () => {
  assert.deepEqual(
    detectPython('pandas==2.0\nbeautifulsoup4>=4.0\n', 'Uses pytest and FastAPI.'),
    ['Pandas', 'BeautifulSoup', 'FastAPI', 'Pytest'],
  )
})

test('readmeSummary ignores boilerplate, badges, lists, and code fences', () => {
  const readme = [
    '# Example',
    '![build](badge.png)',
    '',
    '- Not the project summary.',
    '```sh',
    'echo "ignore this code paragraph"',
    '```',
    '',
    'This project builds useful tools for creators and developers, with a focus on simple workflows and clear documentation.',
  ].join('\n')

  assert.equal(
    readmeSummary(readme),
    'This project builds useful tools for creators and developers, with a focus on simple workflows and clear documentation.',
  )
})

test('readmeSummary preserves underscores and returns null for starter templates', () => {
  const summary = readmeSummary(
    'A lightweight tool for managing my_project files and automating repeated tasks for small teams.',
  )
  assert.equal(summary, 'A lightweight tool for managing my_project files and automating repeated tasks for small teams.')
  assert.equal(
    readmeSummary('This template provides a minimal setup to get React working in Vite.'),
    null,
  )
})
