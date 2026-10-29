// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  published_at?: string | null;
}

// Bidang Layanan (Practice Areas)
export interface BidangLayanan extends CosmicObject {
  type: 'bidang-layanan';
  metadata: {
    nama_layanan?: string;
    deskripsi?: string;
    ikon?: string;
    gambar?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Advokat (Lawyers)
export interface Advokat extends CosmicObject {
  type: 'advokat';
  metadata: {
    nama_lengkap?: string;
    jabatan?: string;
    bidang_keahlian?: string[];
    foto?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    profil_singkat?: string;
  };
}

// Status options for Pengaduan - must match Cosmic content model exactly
export type StatusPengaduan = 'Diterima' | 'Diproses' | 'Selesai' | 'Ditolak';

// Pengaduan (Complaints)
export interface Pengaduan extends CosmicObject {
  type: 'pengaduan';
  metadata: {
    nama_pelapor?: string;
    email?: string;
    nomor_telepon?: string;
    bidang_layanan?: BidangLayanan;
    tanggal_kejadian?: string;
    kronologi?: string;
    dokumen_pendukung?: {
      url: string;
      imgix_url: string;
    };
    status_pengaduan?: StatusPengaduan;
    advokat?: Advokat;
  };
}

// API response shape
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}