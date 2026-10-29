import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { BidangLayanan } from '@/types'

interface ServiceCardProps {
  layanan: BidangLayanan
}

export default function ServiceCard({ layanan }: ServiceCardProps) {
  if (!layanan) return null

  const nama = getMetafieldValue(layanan.metadata?.nama_layanan) || layanan.title
  const deskripsi = getMetafieldValue(layanan.metadata?.deskripsi)
  const ikon = getMetafieldValue(layanan.metadata?.ikon)
  const gambar = layanan.metadata?.gambar

  return (
    <Link
      href={`/bidang-layanan/${layanan.slug}`}
      className="group block bg-white border border-navy-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      {gambar?.imgix_url ? (
        <img
          src={`${gambar.imgix_url}?w=640&h=360&fit=crop&auto=format,compress`}
          alt={nama}
          width={320}
          height={180}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-navy-50 flex items-center justify-center text-5xl">
          {ikon || '⚖️'}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {ikon && !gambar?.imgix_url ? null : ikon ? (
            <span className="text-xl">{ikon}</span>
          ) : null}
          <h3 className="font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
            {nama}
          </h3>
        </div>
        {deskripsi && (
          <p className="text-navy-500 text-sm line-clamp-3">{deskripsi}</p>
        )}
        <span className="inline-block mt-4 text-gold-600 text-sm font-semibold">
          Pelajari Lebih Lanjut &rarr;
        </span>
      </div>
    </Link>
  )
}