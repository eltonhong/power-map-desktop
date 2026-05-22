import { KNOWLEDGE } from './knowledge-base'

export function getStrategy(roleType, scene) {
  const key = `${roleType}_${scene}`
  return KNOWLEDGE[key] || KNOWLEDGE[roleType] || null
}
