import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <span className="text-gold-400 text-2xl">⚖️</span>
            LBH Mahaka
          </Link>
          <p className="text-sm text-navy-400">
            Lembaga bantuan hukum terpercaya yang siap membela hak dan
            kepentingan hukum Anda.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/bidang-layanan" className="hover:text-gold-400">Bidang Layanan</Link></li>
            <li><Link href="/advokat" className="hover:text-gold-400">Advokat</Link></li>
            <li><Link href="/pengaduan" className="hover:text-gold-400">Pengaduan</Link></li>
            <li><Link href="/kontak" className="hover:text-gold-400">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Kontak</h4>
          <ul className="space-y-2 text-sm text-navy-400">
            <li>Jl. Keadilan No. 17, Jakarta Selatan</li>
            <li>(021) 555-0199</li>
            <li>pengaduan@lbhmahaka.id</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Jam Operasional</h4>
          <ul className="space-y-2 text-sm text-navy-400">
            <li>Senin - Jumat: 09.00 - 17.00</li>
            <li>Sabtu: 09.00 - 13.00</li>
            <li>Minggu & Hari Libur: Tutup</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800 py-6 text-center text-xs text-navy-500">
        &copy; {year} LBH Mahaka. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  )
}