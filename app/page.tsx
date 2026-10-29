import Link from 'next/link'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import LawyerCard from '@/components/LawyerCard'
import type { BidangLayanan, Advokat } from '@/types'

async function getHomeData() {
  const { cosmic, previewToken } = await getCosmic()

  let layananList: BidangLayanan[] = []
  let advokatList: Advokat[] = []

  try {
    const query = cosmic.objects
      .find({ type: 'bidang-layanan' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    layananList = response.objects as BidangLayanan[]
  } catch (error) {
    if (!hasStatus(error) || error.status !== 404) {
      throw error
    }
  }

  try {
    const query = cosmic.objects
      .find({ type: 'advokat' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    advokatList = response.objects as Advokat[]
  } catch (error) {
    if (!hasStatus(error) || error.status !== 404) {
      throw error
    }
  }

  return { layananList, advokatList }
}

export default async function HomePage() {
  const { layananList, advokatList } = await getHomeData()

  return (
    <>
      <Hero />

      {/* Trust stats */}
      <section className="bg-navy-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-gold-400">{layananList.length}+</p>
            <p className="text-sm text-navy-200 mt-1">Bidang Layanan</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gold-400">{advokatList.length}+</p>
            <p className="text-sm text-navy-200 mt-1">Advokat Profesional</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gold-400">24/7</p>
            <p className="text-sm text-navy-200 mt-1">Layanan Konsultasi</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gold-400">100%</p>
            <p className="text-sm text-navy-200 mt-1">Kerahasiaan Terjaga</p>
          </div>
        </div>
      </section>

      {/* Bidang Layanan summary */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Bidang Layanan Kami
            </h2>
            <p className="text-navy-500 mt-2">
              Kami menangani berbagai jenis permasalahan hukum dengan tim ahli di bidangnya.
            </p>
          </div>
          <Link
            href="/bidang-layanan"
            className="hidden md:inline-block text-gold-600 font-semibold hover:text-gold-700"
          >
            Lihat Semua &rarr;
          </Link>
        </div>

        {layananList.length === 0 ? (
          <p className="text-navy-500">Belum ada data bidang layanan.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {layananList.slice(0, 3).map((layanan) => (
              <ServiceCard key={layanan.id} layanan={layanan} />
            ))}
          </div>
        )}

        <div className="mt-8 md:hidden">
          <Link href="/bidang-layanan" className="text-gold-600 font-semibold">
            Lihat Semua Layanan &rarr;
          </Link>
        </div>
      </section>

      {/* Advokat preview */}
      <section className="bg-navy-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
                Tim Advokat Kami
              </h2>
              <p className="text-navy-500 mt-2">
                Didukung oleh advokat berpengalaman dan terpercaya.
              </p>
            </div>
            <Link
              href="/advokat"
              className="hidden md:inline-block text-gold-600 font-semibold hover:text-gold-700"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          {advokatList.length === 0 ? (
            <p className="text-navy-500">Belum ada data advokat.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advokatList.slice(0, 3).map((advokat) => (
                <LawyerCard key={advokat.id} advokat={advokat} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
            Mengalami Masalah Hukum?
          </h2>
          <p className="text-navy-500 mt-3 max-w-2xl mx-auto">
            Jangan tunda, ajukan pengaduan Anda sekarang. Tim advokat kami akan
            segera meninjau dan menindaklanjuti permasalahan Anda.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontak#form"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 transition-colors"
            >
              Ajukan Pengaduan Sekarang
            </Link>
            <Link
              href="/pengaduan"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md border-2 border-navy-900 text-navy-900 font-semibold hover:bg-navy-900 hover:text-white transition-colors"
            >
              Lihat Daftar Pengaduan
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}