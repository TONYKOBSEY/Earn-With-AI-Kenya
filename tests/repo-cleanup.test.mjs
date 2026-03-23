import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')

const checks = [
  [
    'stale nested starter project has been removed',
    () => {
      const nestedProjectPath = path.join(repoRoot, 'earn-with-ai-kenya')
      assert.equal(
        fs.existsSync(nestedProjectPath),
        false,
        `Expected duplicate starter folder to be removed: ${nestedProjectPath}`,
      )
    },
  ],
  [
    'source TypeScript files stay ASCII-safe',
    () => {
      const sourceRoot = path.join(repoRoot, 'src')
      const offenders = []

      scanDirectory(sourceRoot, (filePath) => {
        if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
          return
        }

        const content = fs.readFileSync(filePath, 'utf8')
        const lines = content.split(/\r?\n/)

        lines.forEach((line, index) => {
          if (/[^\x00-\x7F]/.test(line)) {
            offenders.push(`${path.relative(repoRoot, filePath)}:${index + 1}: ${line.trim()}`)
          }
        })
      })

      assert.deepEqual(
        offenders,
        [],
        `Expected ASCII-only TypeScript source files, found:\n${offenders.join('\n')}`,
      )
    },
  ],
  [
    'payment CTAs use explicit Google click tracking',
    () => {
      const analyticsPath = path.join(repoRoot, 'src', 'lib', 'analytics.ts')
      const analyticsContent = fs.readFileSync(analyticsPath, 'utf8')

      assert.match(analyticsContent, /'click_payment'/)
      assert.match(analyticsContent, /event_category:\s*'engagement'/)
      assert.match(analyticsContent, /event_label:\s*'mpesa_payment'/)
      assert.match(analyticsContent, /event_callback:/)

      const trackedCtaPaths = [
        path.join(repoRoot, 'src', 'components', 'ProductCard.tsx'),
        path.join(repoRoot, 'src', 'pages', 'Product.tsx'),
        path.join(repoRoot, 'src', 'pages', 'Checkout.tsx'),
      ]

      trackedCtaPaths.forEach((filePath) => {
        const content = fs.readFileSync(filePath, 'utf8')

        assert.match(
          content,
          /openTrackedPaymentLink\(/,
          `Expected tracked payment navigation in ${path.relative(repoRoot, filePath)}`,
        )
        assert.doesNotMatch(
          content,
          /window\.location\.assign\([^)]*paystackPaymentUrl/,
          `Expected raw Paystack navigation to be removed from ${path.relative(repoRoot, filePath)}`,
        )
      })
    },
  ],
  [
    'Microsoft Clarity is installed in the global head',
    () => {
      const indexPath = path.join(repoRoot, 'index.html')
      const indexContent = fs.readFileSync(indexPath, 'utf8')

      assert.match(indexContent, /https:\/\/www\.clarity\.ms\/tag\/"\s*\+\s*i/)
      assert.match(indexContent, /"clarity", "script", "w05ek2rtlt"/)
      assert.match(indexContent, /<head>[\s\S]*<script type="text\/javascript">/)
    },
  ],
]

let failures = 0

for (const [name, run] of checks) {
  try {
    run()
    console.log(`ok - ${name}`)
  } catch (error) {
    failures += 1
    console.error(`not ok - ${name}`)
    console.error(error instanceof Error ? error.message : String(error))
  }
}

if (failures > 0) {
  process.exitCode = 1
}

function scanDirectory(dirPath, visitFile) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      scanDirectory(entryPath, visitFile)
      continue
    }

    visitFile(entryPath)
  }
}
