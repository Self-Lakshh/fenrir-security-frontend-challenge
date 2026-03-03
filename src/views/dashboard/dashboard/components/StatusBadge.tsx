import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"
import type { Scan } from "@/mock/data/scans"

interface Props {
  status: Scan["status"]
}

const StatusBadge = ({ status }: Props) => {
  const base =
    "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border"

  switch (status) {
    case "Completed":
      return (
        <span className={`${base} bg-green-500/10 text-green-600 border-green-500/20`}>
          <CheckCircle2 className="w-3 h-3" />
          {status}
        </span>
      )

    case "Scheduled":
      return (
        <span className={`${base} bg-blue-500/10 text-blue-600 border-blue-500/20`}>
          <Clock className="w-3 h-3" />
          {status}
        </span>
      )

    case "Failed":
      return (
        <span className={`${base} bg-red-500/10 text-red-600 border-red-500/20`}>
          <XCircle className="w-3 h-3" />
          {status}
        </span>
      )

    case "In Progress":
      return (
        <span className={`${base} bg-yellow-500/10 text-yellow-600 border-yellow-500/20`}>
          <AlertCircle className="w-3 h-3" />
          {status}
        </span>
      )

    default:
      return null
  }
}

export default StatusBadge