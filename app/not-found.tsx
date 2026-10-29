import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-navy-900 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-navy-500 mb-6">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}