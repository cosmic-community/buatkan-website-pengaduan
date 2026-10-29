import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { Advokat } from '@/types'

interface LawyerCardProps {
  advokat: Advokat
}

export default function LawyerCard({ advokat }: LawyerCardProps) {
  if (!advokat) return null

  const nama = getMetafieldValue(advokat.metadata?.nama_lengkap) || advokat.title
  const jabatan = getMetafieldValue(advokat.metadata?.jabatan)
  const foto = advokat.metadata?.foto
  const keahlian = Array.isArray(advokat.metadata?.bidang_keahlian)
    ? advokat.metadata.bidang_keahlian.slice(0, 3)
    : []

  return (
    <Link
      href={`/advokat/${advokat.slug}`}
      className="group block bg-white border border-navy-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow p-5 text-center"
    >
      {foto?.imgix_url ? (
        <img
          src={`${foto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
          alt={nama}
          width={160}
          height={160}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-navy-100 flex items-center justify-center text-3xl mx-auto mb-4">
          👨‍⚖️
        </div>
      )}
      <h3 className="font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
        {nama}
      </h3>
      {jabatan && <p className="text-gold-600 text-sm mt-1">{jabatan}</p>}

      {keahlian.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {keahlian.map((item, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-navy-50 text-navy-600"
            >
              {getMetafieldValue(item)}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}