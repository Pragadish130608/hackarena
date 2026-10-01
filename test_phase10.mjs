/**
 * test_phase10.mjs — Comprehensive automated tests for Phase 10: Scheme Comparison
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

console.log('🧪 Starting Phase 10: Scheme Comparison verification suite...\n')

let passed = 0
let failed = 0

function assert(cond, msg) {
  if (cond) {
    passed++
    console.log(`  ✓ ${msg}`)
  } else {
    failed++
    console.error(`  ✗ FAIL: ${msg}`)
  }
}

// 1. Check AppContext.jsx translations
const appContextContent = readFileSync(resolve('src/context/AppContext.jsx'), 'utf-8')

assert(appContextContent.includes('p10_decision_notice'), 'AppContext contains p10_decision_notice key')
assert(appContextContent.includes('Here are the differences to help you make your own decision.'), 'English decision notice is exact match')
assert(appContextContent.includes('நீங்கள் சொந்தமாக முடிவெடுக்க உதவ'), 'Tamil decision notice translation is present')
assert(appContextContent.includes('p10_btn_view_scheme'), 'p10_btn_view_scheme key present')
assert(appContextContent.includes('View Scheme'), 'View Scheme English label present')
assert(appContextContent.includes('p10_btn_save_scheme'), 'p10_btn_save_scheme key present')
assert(appContextContent.includes('Save Scheme'), 'Save Scheme English label present')

// 2. Check strict neutrality constraint: no declaration of winners/best scheme
const rawComparisonPageContent = readFileSync(resolve('src/pages/SchemeComparisonPage.jsx'), 'utf-8')
const comparisonPageContent = rawComparisonPageContent
// Strip comments to test actual code/JSX
const codeWithoutComments = rawComparisonPageContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')

assert(rawComparisonPageContent.includes('p10_decision_notice'), 'SchemeComparisonPage renders neutral decision notice')
assert(!codeWithoutComments.includes('Winner') && !codeWithoutComments.includes('winner'), 'SchemeComparisonPage does not declare a Winner')
assert(!codeWithoutComments.includes('Best Scheme') && !codeWithoutComments.includes('best scheme'), 'SchemeComparisonPage does not declare a Best scheme')
assert(!codeWithoutComments.includes('Better Scheme') && !codeWithoutComments.includes('better scheme'), 'SchemeComparisonPage does not declare a Better scheme')
assert(!codeWithoutComments.includes('Number One') && !codeWithoutComments.includes('number one'), 'SchemeComparisonPage does not declare a Number one')

// 3. Check 8 required comparison dimensions
const requiredDimensions = [
  { key: 'p10_feature_purpose', name: 'Purpose' },
  { key: 'p10_feature_gov_level', name: 'Government Level' },
  { key: 'p10_feature_beneficiaries', name: 'Target Beneficiaries' },
  { key: 'p10_feature_eligibility', name: 'Eligibility' },
  { key: 'p10_feature_benefits', name: 'Benefits' },
  { key: 'p10_feature_documents', name: 'Documents' },
  { key: 'p10_feature_application', name: 'Application Method' },
  { key: 'p10_feature_source', name: 'Official Source' },
]

for (const dim of requiredDimensions) {
  assert(comparisonPageContent.includes(dim.key), `Comparison criteria "${dim.name}" (${dim.key}) is present`)
}

// 4. Check View Scheme & Save Scheme buttons
assert(comparisonPageContent.includes('p10_btn_view_scheme'), 'View Scheme button translation used')
assert(comparisonPageContent.includes('p10_btn_save_scheme'), 'Save Scheme button translation used')
assert(comparisonPageContent.includes('toggleSaveScheme'), 'toggleSaveScheme hook wired to bookmark button')
assert(comparisonPageContent.includes('navigate(`/schemes/${scheme.id}`)') || comparisonPageContent.includes('navigate(`/schemes/${s.id}`)'), 'View Scheme navigates to individual scheme detail')

// 5. Check Mobile Responsiveness
assert(comparisonPageContent.includes('mobileViewMode'), 'mobileViewMode toggle implemented')
assert(comparisonPageContent.includes('mobileActiveTab'), 'mobileActiveTab implemented for mobile cards')
assert(comparisonPageContent.includes('sm:hidden'), 'Tailwind mobile-responsive responsive classes used')
assert(comparisonPageContent.includes('overflow-x-auto'), 'Horizontal scrolling enabled for wide tables')

// 6. Check Routing in App.jsx
const appContent = readFileSync(resolve('src/App.jsx'), 'utf-8')
assert(appContent.includes('/compare'), 'Route /compare registered in App.jsx')
assert(appContent.includes('SchemeComparisonPage'), 'SchemeComparisonPage imported in App.jsx')

// 7. Check Header.jsx navigation item
const headerContent = readFileSync(resolve('src/components/layout/Header.jsx'), 'utf-8')
assert(headerContent.includes("to: '/compare'"), 'Header contains /compare NavLink')
assert(headerContent.includes('nav_compare'), 'Header references nav_compare translation key')

// 8. Check Schemes data availability for comparison
const { SCHEMES } = await import('./src/data/schemes.js')
assert(SCHEMES.length >= 40, `Scheme database contains ${SCHEMES.length} schemes (>= 40 required)`)
for (const s of SCHEMES) {
  assert(s.id && s.purpose && s.governmentLevel && s.beneficiaries && s.eligibility && s.benefits && s.documents && s.applicationSteps && (s.officialUrl || s.portalUrl), `Scheme ${s.id} contains all 8 comparison fields`)
}

// 9. Check local dev server HTTP response for /compare
try {
  const res = await fetch('http://localhost:5173/compare')
  assert(res.status === 200, `Dev server responds with HTTP 200 at /compare (got ${res.status})`)
  const html = await res.text()
  assert(html.includes('<div id="root">'), 'HTML contains root mounting element')
} catch (e) {
  console.warn('  ⚠️ Dev server fetch note:', e.message)
}

console.log(`\nResults: ${passed} assertions passed, ${failed} failed.`)
if (failed > 0) process.exit(1)
