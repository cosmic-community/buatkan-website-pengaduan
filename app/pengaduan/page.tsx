import type { Metadata } from 'next'
import Link from 'next/link'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, getDateValue } from '@/lib/cosmic'
import ComplaintCard from '@/components/ComplaintCard'
import type { Pengaduan } from '@/types'

export const metadata: Metadata = {
  title: 'Daftar Pengaduan',
  description: 'Daftar pengaduan hukum yang masuk ke LBH Mahaka beserta status penanganannya.',
}

async function getPengaduanList(): Promise<Pengaduan[]> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .find({ type: 'pengaduan' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const objects = response.objects as Pengaduan[]
    return objects.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function PengaduanPage() {
  const pengaduanList = await getPengaduanList()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
            Daftar Pengaduan
          </h1>
          <p className="text-navy-500 mt-3 max-w-xl">
            Pantau status pengaduan hukum yang masuk beserta advokat yang
            ditugaskan untuk menanganinya.
          </p>
        </div>
        <Link
          href="/kontak#form"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 transition-colors whitespace-nowrap"
        >
          Ajukan Pengaduan Baru
        </Link>
      </div>

      {pengaduanList.length === 0 ? (
        <p className="text-center text-navy-500">
          Belum ada pengaduan yang tercatat.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pengaduanList.map((pengaduan) => (
            <ComplaintCard key={pengaduan.id} pengaduan={pengaduan} />
          ))}
        </div>
      )}
    </div>
  )
}