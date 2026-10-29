'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-4">⚖️</p>
        <h1 className="text-2xl font-bold text-navy-900 mb-2">
          Terjadi Kesalahan
        </h1>
        <p className="text-navy-500 mb-6">
          Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
}