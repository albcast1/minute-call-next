/**
 * Minimal, dependency-free YAML 1.2 emitter for plain JSON values.
 * Covers exactly what an OpenAPI document needs: maps, sequences, strings,
 * numbers, booleans and null. Ambiguous strings are double-quoted, which is
 * always valid YAML because double-quoted style is a superset of JSON strings.
 */

const SAFE_PLAIN = /^[A-Za-z_][A-Za-z0-9_.-]*$/
const YAML_RESERVED = new Set([
  'y', 'Y', 'yes', 'Yes', 'YES', 'n', 'N', 'no', 'No', 'NO',
  'true', 'True', 'TRUE', 'false', 'False', 'FALSE',
  'on', 'On', 'ON', 'off', 'Off', 'OFF', 'null', 'Null', 'NULL', '~',
])

type Scalar = string | number | boolean | null

function isScalar(value: unknown): value is Scalar {
  return value === null || ['string', 'number', 'boolean'].includes(typeof value)
}

function scalar(value: Scalar): string {
  if (value === null) return 'null'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'null'
  if (value === '') return '""'
  if (YAML_RESERVED.has(value)) return JSON.stringify(value)
  if (!SAFE_PLAIN.test(value)) return JSON.stringify(value)
  return value
}

function emitKey(key: string): string {
  return SAFE_PLAIN.test(key) && !YAML_RESERVED.has(key) ? key : JSON.stringify(key)
}

function emitBlock(value: unknown, indent: number): string[] {
  const pad = ' '.repeat(indent)

  if (Array.isArray(value)) {
    const lines: string[] = []
    for (const item of value) {
      if (isScalar(item)) {
        lines.push(`${pad}- ${scalar(item)}`)
        continue
      }
      const sub = emitBlock(item, indent + 2)
      if (sub.length === 0) {
        lines.push(`${pad}- ${Array.isArray(item) ? '[]' : '{}'}`)
        continue
      }
      lines.push(`${pad}- ${sub[0].slice(indent + 2)}`)
      lines.push(...sub.slice(1))
    }
    return lines
  }

  if (value !== null && typeof value === 'object') {
    const lines: string[] = []
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      if (item === undefined) continue
      if (isScalar(item)) {
        lines.push(`${pad}${emitKey(key)}: ${scalar(item)}`)
        continue
      }
      const sub = emitBlock(item, indent + 2)
      if (sub.length === 0) {
        lines.push(`${pad}${emitKey(key)}: ${Array.isArray(item) ? '[]' : '{}'}`)
        continue
      }
      lines.push(`${pad}${emitKey(key)}:`)
      lines.push(...sub)
    }
    return lines
  }

  return [`${pad}${scalar(value as Scalar)}`]
}

/** Serialise a JSON-compatible value to a YAML document. */
export function toYaml(value: unknown): string {
  const lines = emitBlock(value, 0)
  return lines.length === 0 ? '{}\n' : `${lines.join('\n')}\n`
}
