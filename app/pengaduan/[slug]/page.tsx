// app/pengaduan/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, getMetafieldValue, formatTanggal } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'
import type { Pengaduan } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPengaduan(slug: string): Promise<Pengaduan | null> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .findOne({ type: 'pengaduan', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.object as Pengaduan
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pengaduan = await getPengaduan(slug)
  if (!pengaduan) {
    return { title: 'Pengaduan Tidak Ditemukan' }
  }
  return {
    title: `Pengaduan: ${getMetafieldValue(pengaduan.metadata?.nama_pelapor) || pengaduan.title}`,
    other: {
      'cosmic-context': JSON.stringify({
        object_id: pengaduan.id,
        object_type: pengaduan.type,
      }),
    },
  }
}

export default async function PengaduanDetailPage({ params }: PageProps) {
  const { slug } = await params
  const pengaduan = await getPengaduan(slug)

  if (!pengaduan) {
    notFound()
  }

  const namaPelapor = getMetafieldValue(pengaduan.metadata?.nama_pelapor)
  const email = getMetafieldValue(pengaduan.metadata?.email)
  const telepon = getMetafieldValue(pengaduan.metadata?.nomor_telepon)
  const kronologi = getMetafieldValue(pengaduan.metadata?.kronologi)
  const tanggalKejadian = pengaduan.metadata?.tanggal_kejadian
  const status = pengaduan.metadata?.status_pengaduan
  const bidangLayanan = pengaduan.metadata?.bidang_layanan
  const advokat = pengaduan.metadata?.advokat
  const dokumen = pengaduan.metadata?.dokumen_pendukung

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/pengaduan" className="text-gold-600 font-semibold">
        &larr; Kembali ke Daftar Pengaduan
      </Link>

      <div className="mt-6 bg-white border border-navy-100 rounded-xl shadow-sm p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">
              Pengaduan dari {namaPelapor || 'Pelapor'}
            </h1>
            {bidangLayanan && (
              <p className="text-navy-500 mt-1">
                Kategori:{' '}
                <Link
                  href={`/bidang-layanan/${bidangLayanan.slug}`}
                  className="text-gold-600 font-medium hover:underline"
                >
                  {getMetafieldValue(bidangLayanan.metadata?.nama_layanan) ||
                    bidangLayanan.title}
                </Link>
              </p>
            )}
          </div>
          {status && <StatusBadge status={status} />}
        </div>

        <dl className="grid sm:grid-cols-2 gap-4 text-sm mb-8">
          <div>
            <dt className="text-navy-400">Email Pelapor</dt>
            <dd className="text-navy-800 font-medium">{email || '-'}</dd>
          </div>
          <div>
            <dt className="text-navy-400">Nomor Telepon</dt>
            <dd className="text-navy-800 font-medium">{telepon || '-'}</dd>
          </div>
          <div>
            <dt className="text-navy-400">Tanggal Kejadian</dt>
            <dd className="text-navy-800 font-medium">
              {formatTanggal(tanggalKejadian)}
            </dd>
          </div>
          <div>
            <dt className="text-navy-400">Advokat Penanggung Jawab</dt>
            <dd className="text-navy-800 font-medium">
              {advokat ? (
                <Link
                  href={`/advokat/${advokat.slug}`}
                  className="text-gold-600 hover:underline"
                >
                  {getMetafieldValue(advokat.metadata?.nama_lengkap) ||
                    advokat.title}
                </Link>
              ) : (
                'Belum ditugaskan'
              )}
            </dd>
          </div>
        </dl>

        <div>
          <h2 className="font-semibold text-navy-900 mb-2">Kronologi</h2>
          <p className="text-navy-600 leading-relaxed whitespace-pre-line">
            {kronologi || 'Tidak ada kronologi yang dicantumkan.'}
          </p>
        </div>

        {dokumen?.url && (
          <div className="mt-6">
            <a
              href={dokumen.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600"
            >
              📎 Lihat Dokumen Pendukung
            </a>
          </div>
        )}
      </div>
    </div>
  )
}