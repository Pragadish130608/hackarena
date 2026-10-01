// test_phase9.mjs — Test suite for PHASE 9: Safety Gate
import { SCHEMES } from './src/data/schemes.js'
import { SCAM_PREVENTION_TIPS, validateSchemeOfficialUrl } from './src/data/safetyTips.js'

console.log('=== VALIKATTI PHASE 9 TEST SUITE ===\n')

let passed = 0
let failed = 0

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`)
    passed++
  } else {
    console.error(`  ✗ FAIL: ${message}`)
    failed++
  }
}

// 1. Scam Prevention Tips Data Integrity
console.log('1. Testing Scam Prevention Tips...')
assert(Array.isArray(SCAM_PREVENTION_TIPS) && SCAM_PREVENTION_TIPS.length >= 5, 'At least 5 scam prevention tips defined')
SCAM_PREVENTION_TIPS.forEach(tip => {
  assert(tip.id && tip.icon && tip.title.en && tip.title.ta && tip.description.en && tip.description.ta,
    `Tip "${tip.id}" has complete bilingual content`)
})

// 2. URL Validation & Security Rules
console.log('\n2. Testing URL Validation & Security Enforcement...')
const sampleScheme = SCHEMES[0] // nmmss-scholarship
const validResult = validateSchemeOfficialUrl(sampleScheme)
assert(validResult.valid === true, `Official URL for "${sampleScheme.id}" is validated successfully (${validResult.url})`)
assert(validResult.isGovDomain === true, `Official URL domain is recognized as gov.in / nic.in`)

// Test arbitrary URL rejection
const fakeUrl = 'https://fake-government-scholarship-scam.xyz/apply'
const fakeResult = validateSchemeOfficialUrl(sampleScheme, fakeUrl)
assert(fakeResult.valid === false, 'Strictly rejects arbitrary or altered URLs not matching verified database')

// Test non-https rejection
const insecureScheme = { ...sampleScheme, officialUrl: 'http://insecure.gov.in' }
const insecureResult = validateSchemeOfficialUrl(insecureScheme)
assert(insecureResult.valid === false, 'Strictly rejects non-HTTPS unencrypted URLs')

// Test scheme with no URL
const noUrlScheme = { ...sampleScheme, officialUrl: '', portalUrl: '' }
const noUrlResult = validateSchemeOfficialUrl(noUrlScheme)
assert(noUrlResult.valid === false, 'Rejects schemes without official URL')

// 3. Database URL audit across all schemes
console.log('\n3. Auditing all schemes in database for Safety Gate compatibility...')
SCHEMES.forEach(s => {
  const res = validateSchemeOfficialUrl(s)
  assert(res.valid === true, `Scheme "${s.id}" has valid official URL (${s.officialUrl || s.portalUrl})`)
  assert(Boolean(s.sourceName), `Scheme "${s.id}" has sourceName for verified source display`)
  assert(Boolean(s.department), `Scheme "${s.id}" has department for department display`)
  assert(Boolean(s.lastVerified), `Scheme "${s.id}" has lastVerified date for trust display`)
})

// 4. Tamil Nadu Schemes Coverage Test
console.log('\n4. Testing Tamil Nadu Schemes Coverage & Search Matching...')
const tnSchemes = SCHEMES.filter(s => s.state === 'Tamil Nadu')
assert(tnSchemes.length >= 20, `At least 20 Tamil Nadu state schemes registered (found ${tnSchemes.length})`)

const expectedTnSchemes = [
  'kalaignar-magalir-urimai',
  'pudhumaipenn-scheme',
  'tamil-pudhalvan',
  'dr-muthulakshmi-maternity',
  'vidiyal-payanam',
  'moovalur-marriage-scheme',
  'cm-breakfast-scheme',
  'naan-mudhalvan',
  'tn-7point5-reservation-fee',
  'tn-cmchis-health',
  'makkalai-thedi-maruthuvam',
  'innuyir-kaappom-48',
  'uyegp-scheme',
  'tnsdc-skill-training',
  'needs-scheme',
  'aabcs-scheme',
  'kagvvt-agriculture',
  'tangedco-free-agri-power',
  'uzhavar-pathukappu-thittam',
  'kalaignar-kanavu-illam',
  'tnuhdb-urban-housing',
  'tn-old-age-pension',
  'tn-destitute-widow-pension',
  'tn-maintenance-allowance-disabled',
  'tn-motorized-scooter-scheme',
]

expectedTnSchemes.forEach(id => {
  const found = SCHEMES.find(s => s.id === id)
  assert(Boolean(found), `Flagship Tamil Nadu scheme "${id}" exists in database`)
})

console.log(`\n========================================`)
console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`)
console.log(`========================================`)

if (failed > 0) {
  process.exit(1)
} else {
  console.log('ALL PHASE 9 SAFETY GATE TESTS PASSED!')
}
