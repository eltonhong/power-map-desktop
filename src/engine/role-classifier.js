export function classifyRole(power, attitude) {
  if (attitude >= 3) return 'champion'
  if (attitude <= -3) return 'blocker'
  if (power >= 6) return 'mover'
  return 'bystander'
}

export const ROLE_LABELS = {
  champion: 'Champion',
  mover: 'Mover',
  blocker: 'Blocker',
  bystander: 'Bystander'
}

export const ROLE_COLORS = {
  champion: '#ff4d4f',
  mover: '#3b82f6',
  blocker: '#1e1e1e',
  bystander: '#6b7280'
}
