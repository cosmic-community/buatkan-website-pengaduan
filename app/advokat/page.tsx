import type { Metadata } from 'next'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import LawyerCard from '@/components/LawyerCard'
import type { Advokat } from '@/types'

export const metadata: Metadata = {
  title: 'Advokat',
  description: 'Tim advokat profesional dan berpengalaman LBH Mahaka.',
}

async function getAdvokatList(): Promise<Advokat[]> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .find({ type: 'advokat' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as Advokat[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function AdvokatPage() {
  const advokatList = await getAdvokatList()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
          Tim Advokat
        </h1>
        <p className="text-navy-500 mt-3">
          Dipimpin oleh para advokat yang berdedikasi dan profesional dalam
          menangani setiap kasus hukum klien kami.
        </p>
      </div>

      {advokatList.length === 0 ? (
        <p className="text-center text-navy-500">
          Belum ada data advokat tersedia.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advokatList.map((advokat) => (
            <LawyerCard key={advokat.id} advokat={advokat} />
          ))}
        </div>
      )}
    </div>
  )
}