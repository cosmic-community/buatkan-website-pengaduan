'use client'

import { useActionState } from 'react'
import { submitPengaduan } from '@/lib/actions'
import type { SubmitState } from '@/lib/actions'
import { getMetafieldValue } from '@/lib/cosmic'
import type { BidangLayanan } from '@/types'

interface ComplaintFormProps {
  layananList: BidangLayanan[]
}

const initialState: SubmitState = { success: false, message: '' }

export default function ComplaintForm({ layananList }: ComplaintFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitPengaduan,
    initialState
  )

  return (
    <div className="max-w-2xl mx-auto bg-white border border-navy-100 rounded-xl shadow-sm p-6 md:p-8">
      {state.message && (
        <div
          className={`mb-6 rounded-md px-4 py-3 text-sm font-medium ${
            state.success
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nama_pelapor" className="block text-sm font-medium text-navy-700 mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              id="nama_pelapor"
              name="nama_pelapor"
              type="text"
              required
              className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="Nama Anda"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="nama@email.com"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nomor_telepon" className="block text-sm font-medium text-navy-700 mb-1">
              Nomor Telepon
            </label>
            <input
              id="nomor_telepon"
              name="nomor_telepon"
              type="tel"
              className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div>
            <label htmlFor="tanggal_kejadian" className="block text-sm font-medium text-navy-700 mb-1">
              Tanggal Kejadian
            </label>
            <input
              id="tanggal_kejadian"
              name="tanggal_kejadian"
              type="date"
              className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bidang_layanan" className="block text-sm font-medium text-navy-700 mb-1">
            Bidang Layanan <span className="text-red-500">*</span>
          </label>
          <select
            id="bidang_layanan"
            name="bidang_layanan"
            required
            defaultValue=""
            className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <option value="" disabled>
              Pilih bidang layanan
            </option>
            {layananList.map((layanan) => (
              <option key={layanan.id} value={layanan.id}>
                {getMetafieldValue(layanan.metadata?.nama_layanan) || layanan.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="kronologi" className="block text-sm font-medium text-navy-700 mb-1">
            Kronologi Kejadian <span className="text-red-500">*</span>
          </label>
          <textarea
            id="kronologi"
            name="kronologi"
            required
            rows={5}
            className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            placeholder="Jelaskan kronologi kejadian secara detail..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Mengirim...' : 'Kirim Pengaduan'}
        </button>
      </form>
    </div>
  )
}