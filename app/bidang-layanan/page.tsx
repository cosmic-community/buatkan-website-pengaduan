import type { Metadata } from 'next'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import type { BidangLayanan } from '@/types'

export const metadata: Metadata = {
  title: 'Bidang Layanan',
  description: 'Daftar bidang layanan hukum yang ditangani oleh LBH Mahaka.',
}

async function getLayananList(): Promise<BidangLayanan[]> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .find({ type: 'bidang-layanan' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as BidangLayanan[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function BidangLayananPage() {
  const layananList = await getLayananList()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
          Bidang Layanan
        </h1>
        <p className="text-navy-500 mt-3">
          Kami menyediakan layanan hukum komprehensif yang ditangani langsung
          oleh advokat berpengalaman di bidangnya masing-masing.
        </p>
      </div>

      {layananList.length === 0 ? (
        <p className="text-center text-navy-500">
          Belum ada data bidang layanan tersedia.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {layananList.map((layanan) => (
            <ServiceCard key={layanan.id} layanan={layanan} />
          ))}
        </div>
      )}
    </div>
  )
}