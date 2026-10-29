import type { Metadata } from 'next'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import ComplaintForm from '@/components/ComplaintForm'
import type { BidangLayanan } from '@/types'

export const metadata: Metadata = {
  title: 'Kontak & Ajukan Pengaduan',
  description: 'Hubungi LBH Mahaka dan ajukan pengaduan hukum Anda secara daring.',
}

async function getLayananList(): Promise<BidangLayanan[]> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .find({ type: 'bidang-layanan' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as BidangLayanan[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

const langkah = [
  {
    title: 'Isi Formulir',
    desc: 'Lengkapi formulir pengaduan dengan data diri dan kronologi kejadian secara jelas.',
  },
  {
    title: 'Verifikasi Tim',
    desc: 'Tim kami akan meninjau pengaduan Anda dan menentukan advokat yang sesuai.',
  },
  {
    title: 'Penugasan Advokat',
    desc: 'Advokat yang ditugaskan akan menghubungi Anda untuk konsultasi lebih lanjut.',
  },
  {
    title: 'Proses Penanganan',
    desc: 'Pantau status pengaduan Anda melalui halaman Daftar Pengaduan.',
  },
]

export default async function KontakPage() {
  const layananList = await getLayananList()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
          Kontak & Pengaduan
        </h1>
        <p className="text-navy-500 mt-3">
          Hubungi kami atau ajukan pengaduan hukum Anda langsung melalui
          formulir di bawah ini.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mb-16">
        <div className="bg-navy-900 text-white rounded-xl p-6">
          <h3 className="font-semibold text-gold-400 mb-2">📍 Alamat</h3>
          <p className="text-navy-100 text-sm">
            Jl. Keadilan No. 17, Jakarta Selatan, DKI Jakarta, Indonesia
          </p>
        </div>
        <div className="bg-navy-900 text-white rounded-xl p-6">
          <h3 className="font-semibold text-gold-400 mb-2">📞 Telepon</h3>
          <p className="text-navy-100 text-sm">(021) 555-0199</p>
          <p className="text-navy-100 text-sm">Senin - Jumat, 09.00 - 17.00</p>
        </div>
        <div className="bg-navy-900 text-white rounded-xl p-6">
          <h3 className="font-semibold text-gold-400 mb-2">✉️ Email</h3>
          <p className="text-navy-100 text-sm">pengaduan@lbhmahaka.id</p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">
          Cara Mengajukan Pengaduan
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {langkah.map((item, index) => (
            <div
              key={item.title}
              className="bg-white border border-navy-100 rounded-xl p-6 text-center shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500 text-navy-900 font-bold flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">
                {item.title}
              </h3>
              <p className="text-navy-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="form" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">
          Formulir Pengaduan
        </h2>
        <ComplaintForm layananList={layananList} />
      </div>
    </div>
  )
}