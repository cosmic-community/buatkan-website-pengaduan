import { getMetafieldValue } from '@/lib/cosmic'

interface StatusBadgeProps {
  status: unknown
}

const statusStyles: Record<string, string> = {
  Diterima: 'bg-blue-100 text-blue-700',
  Diproses: 'bg-amber-100 text-amber-700',
  Selesai: 'bg-green-100 text-green-700',
  Ditolak: 'bg-red-100 text-red-700',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = getMetafieldValue(status)
  if (!label) return null

  const style = statusStyles[label] || 'bg-navy-100 text-navy-700'

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${style}`}
    >
      {label}
    </span>
  )
}