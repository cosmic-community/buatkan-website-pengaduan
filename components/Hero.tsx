import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-navy-900 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #D4AF37 0, transparent 40%), radial-gradient(circle at 80% 80%, #D4AF37 0, transparent 40%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium mb-6">
          Lembaga Bantuan Hukum Terpercaya
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
          Keadilan untuk Semua,{' '}
          <span className="text-gold-400">Pendampingan Hukum</span> Profesional
        </h1>
        <p className="mt-6 text-navy-200 max-w-2xl mx-auto text-base md:text-lg">
          LBH Mahaka hadir untuk membela hak dan kepentingan hukum Anda.
          Ajukan pengaduan secara daring dan dapatkan pendampingan dari
          advokat berpengalaman.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/kontak#form"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 transition-colors"
          >
            Ajukan Pengaduan Sekarang
          </Link>
          <Link
            href="/bidang-layanan"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Lihat Bidang Layanan
          </Link>
        </div>
      </div>
    </section>
  )
}