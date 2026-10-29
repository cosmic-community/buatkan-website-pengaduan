import Link from 'next/link'
import { getMetafieldValue, formatTanggal } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'
import type { Pengaduan } from '@/types'

interface ComplaintCardProps {
  pengaduan: Pengaduan
}

export default function ComplaintCard({ pengaduan }: ComplaintCardProps) {
  if (!pengaduan) return null

  const namaPelapor = getMetafieldValue(pengaduan.metadata?.nama_pelapor)
  const status = pengaduan.metadata?.status_pengaduan
  const bidangLayanan = pengaduan.metadata?.bidang_layanan
  const advokat = pengaduan.metadata?.advokat
  const tanggalKejadian = pengaduan.metadata?.tanggal_kejadian

  return (
    <Link
      href={`/pengaduan/${pengaduan.slug}`}
      className="block bg-white border border-navy-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-navy-900">
          {namaPelapor || 'Pelapor'}
        </h3>
        {status && <StatusBadge status={status} />}
      </div>

      {bidangLayanan && (
        <p className="text-sm text-navy-500 mb-1">
          Kategori:{' '}
          <span className="font-medium text-navy-700">
            {getMetafieldValue(bidangLayanan.metadata?.nama_layanan) ||
              bidangLayanan.title}
          </span>
        </p>
      )}

      <p className="text-sm text-navy-500 mb-1">
        Tanggal Kejadian:{' '}
        <span className="font-medium text-navy-700">
          {formatTanggal(tanggalKejadian)}
        </span>
      </p>

      <p className="text-sm text-navy-500">
        Advokat:{' '}
        <span className="font-medium text-navy-700">
          {advokat
            ? getMetafieldValue(advokat.metadata?.nama_lengkap) || advokat.title
            : 'Belum ditugaskan'}
        </span>
      </p>

      <span className="inline-block mt-4 text-gold-600 text-sm font-semibold">
        Lihat Detail &rarr;
      </span>
    </Link>
  )
}