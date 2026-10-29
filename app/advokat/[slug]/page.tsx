// app/advokat/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, getMetafieldValue } from '@/lib/cosmic'
import type { Advokat } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getAdvokat(slug: string): Promise<Advokat | null> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .findOne({ type: 'advokat', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.object as Advokat
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const advokat = await getAdvokat(slug)
  if (!advokat) {
    return { title: 'Advokat Tidak Ditemukan' }
  }
  const nama = getMetafieldValue(advokat.metadata?.nama_lengkap) || advokat.title
  return {
    title: nama,
    description: getMetafieldValue(advokat.metadata?.profil_singkat) || undefined,
    other: {
      'cosmic-context': JSON.stringify({
        object_id: advokat.id,
        object_type: advokat.type,
      }),
    },
  }
}

export default async function AdvokatDetailPage({ params }: PageProps) {
  const { slug } = await params
  const advokat = await getAdvokat(slug)

  if (!advokat) {
    notFound()
  }

  const nama = getMetafieldValue(advokat.metadata?.nama_lengkap) || advokat.title
  const jabatan = getMetafieldValue(advokat.metadata?.jabatan)
  const email = getMetafieldValue(advokat.metadata?.email)
  const profil = getMetafieldValue(advokat.metadata?.profil_singkat)
  const foto = advokat.metadata?.foto
  const keahlian = Array.isArray(advokat.metadata?.bidang_keahlian)
    ? advokat.metadata.bidang_keahlian
    : []

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link href="/advokat" className="text-gold-600 font-semibold">
        &larr; Kembali ke Tim Advokat
      </Link>

      <div className="mt-6 grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          {foto?.imgix_url ? (
            <img
              src={`${foto.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={nama}
              width={300}
              height={300}
              className="w-full aspect-square object-cover rounded-xl"
            />
          ) : (
            <div className="w-full aspect-square rounded-xl bg-navy-100 flex items-center justify-center text-5xl">
              👨‍⚖️
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-navy-900">{nama}</h1>
          {jabatan && (
            <p className="text-gold-600 font-semibold mt-1">{jabatan}</p>
          )}

          {keahlian.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {keahlian.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-navy-100 text-navy-700"
                >
                  {getMetafieldValue(item)}
                </span>
              ))}
            </div>
          )}

          {profil && (
            <p className="text-navy-600 leading-relaxed mt-6">{profil}</p>
          )}

          {email && (
            <div className="mt-6">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600"
              >
                ✉️ {email}
              </a>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/kontak#form"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 transition-colors"
            >
              Konsultasikan Kasus Anda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}