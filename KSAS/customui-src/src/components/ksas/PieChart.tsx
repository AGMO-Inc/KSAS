const RADIUS = 105
const SIZE = RADIUS * 2

export type PieSegment = {
  label: string
  value: number
  color: string
}

/** Point on the circle at `angle` degrees, measured clockwise from 12 o'clock. */
function pointAt(angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return {
    x: RADIUS + RADIUS * Math.cos(radians),
    y: RADIUS + RADIUS * Math.sin(radians),
  }
}

type PieChartProps = {
  segments: readonly PieSegment[]
  className?: string
}

/**
 * Work-breakdown pie. The design ships a flattened SVG whose wedges do not match
 * its own legend numbers, so the wedges are drawn from the data instead.
 */
export function PieChart({ segments, className }: PieChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  const drawn = segments.filter((segment) => segment.value > 0)

  if (total <= 0 || drawn.length === 0) {
    return (
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={className}
        aria-hidden="true"
      >
        <circle cx={RADIUS} cy={RADIUS} r={RADIUS} fill="#495156" />
      </svg>
    )
  }

  let angle = 0
  const wedges = drawn.map((segment) => {
    const from = angle
    angle += (segment.value / total) * 360
    return { segment, from, to: angle }
  })

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      role="img"
      aria-label={drawn
        .map(
          (segment) =>
            `${segment.label} ${Math.round((segment.value / total) * 100)}%`,
        )
        .join(', ')}
    >
      {wedges.length === 1 ? (
        <circle
          cx={RADIUS}
          cy={RADIUS}
          r={RADIUS}
          fill={wedges[0]!.segment.color}
        />
      ) : (
        wedges.map(({ segment, from, to }) => {
          const start = pointAt(from)
          const end = pointAt(to)
          const largeArc = to - from > 180 ? 1 : 0
          return (
            <path
              key={segment.label}
              fill={segment.color}
              d={`M ${RADIUS} ${RADIUS} L ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)} Z`}
            />
          )
        })
      )}
    </svg>
  )
}
