interface Props {
  count: number
  type: "critical" | "high" | "medium" | "low"
}

const VulnBadge = ({ count, type }: Props) => {
  const colorMap = {
    critical: "bg-red-500 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-green-500 text-white",
  }

  if (count === 0) {
    return (
      <span className="w-6 h-6 flex items-center justify-center text-[10px] font-semibold rounded-md bg-secondary text-muted-foreground">
        -
      </span>
    )
  }

  return (
    <span
      className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-md ${colorMap[type]}`}
    >
      {count}
    </span>
  )
}

export default VulnBadge