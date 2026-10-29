'use server'

import { cosmic } from '@/lib/cosmic'
import { revalidatePath } from 'next/cache'

export interface SubmitState {
  success: boolean
  message: string
}

export async function submitPengaduan(
  _prevState: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const nama_pelapor = String(formData.get('nama_pelapor') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const nomor_telepon = String(formData.get('nomor_telepon') || '').trim()
  const bidang_layanan = String(formData.get('bidang_layanan') || '').trim()
  const tanggal_kejadian = String(formData.get('tanggal_kejadian') || '').trim()
  const kronologi = String(formData.get('kronologi') || '').trim()

  if (!nama_pelapor || !email || !bidang_layanan || !kronologi) {
    return {
      success: false,
      message: 'Mohon lengkapi semua kolom yang wajib diisi (bertanda *).',
    }
  }

  try {
    await cosmic.objects.insertOne({
      type: 'pengaduan',
      title: `Pengaduan dari ${nama_pelapor}`,
      metadata: {
        nama_pelapor,
        email,
        nomor_telepon,
        bidang_layanan,
        tanggal_kejadian,
        kronologi,
        dokumen_pendukung: '',
        status_pengaduan: 'Diterima',
        advokat: '',
      },
    })

    revalidatePath('/pengaduan')

    return {
      success: true,
      message:
        'Pengaduan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda melalui email atau telepon yang tercantum.',
    }
  } catch (error) {
    console.error('Error submitting pengaduan:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengirim pengaduan. Silakan coba lagi.',
    }
  }
}