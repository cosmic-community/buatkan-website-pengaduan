// app/bidang-layanan/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, getMetafieldValue } from '@/lib/cosmic'
import type { BidangLayanan } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getLayanan(slug: string): Promise<BidangLayanan | null> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .findOne({ type: 'bidang-layanan', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.object as BidangLayanan
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const layanan = await getLayanan(slug)
  if (!layanan) {
    return { title: 'Bidang Layanan Tidak Ditemukan' }
  }
  const nama = getMetafieldValue(layanan.metadata?.nama_layanan) || layanan.title
  return {
    title: nama,
    description: getMetafieldValue(layanan.metadata?.deskripsi) || undefined,
    other: {
      'cosmic-context': JSON.stringify({
        object_id: layanan.id,
        object_type: layanan.type,
      }),
    },
  }
}

export default async function BidangLayananDetailPage({ params }: PageProps) {
  const { slug } = await params
  const layanan = await getLayanan(slug)

  if (!layanan) {
    notFound()
  }

  const nama = getMetafieldValue(layanan.metadata?.nama_layanan) || layanan.title
  const deskripsi = getMetafieldValue(layanan.metadata?.deskripsi)
  const ikon = getMetafieldValue(layanan.metadata?.ikon)
  const gambar = layanan.metadata?.gambar

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link href="/bidang-layanan" className="text-gold-600 font-semibold">
        &larr; Kembali ke Bidang Layanan
      </Link>

      <div className="mt-6">
        {gambar?.imgix_url && (
          <img
            src={`${gambar.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={nama}
            width={800}
            height={400}
            className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
          />
        )}

        <div className="flex items-center gap-3 mb-4">
          {ikon && <span className="text-4xl">{ikon}</span>}
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
            {nama}
          </h1>
        </div>

        {deskripsi && (
          <p className="text-navy-600 text-lg leading-relaxed">{deskripsi}</p>
        )}

        <div className="mt-10 bg-navy-50 border border-navy-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-navy-900">
              Butuh bantuan terkait layanan ini?
            </p>
            <p className="text-navy-500 text-sm mt-1">
              Ajukan pengaduan Anda sekarang, tim advokat kami siap membantu.
            </p>
          </div>
          <Link
            href="/kontak#form"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 transition-colors whitespace-nowrap"
          >
            Ajukan Pengaduan
          </Link>
        </div>
      </div>
    </div>
  )
}