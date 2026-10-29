# LBH Mahaka - Portal Pengaduan Hukum
![App Preview](https://imgix.cosmicjs.com/b9a1f770-d375-11f1-9fa3-370253126ebb-autopilot-photo-1589829545856-d10d557cf95f-1793263800263.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

Website pengaduan hukum untuk kantor hukum LBH Mahaka, dibangun dengan Next.js dan Cosmic CMS.

## Features

- ⚖️ Beranda profesional dengan hero, ringkasan layanan, dan CTA pengaduan
- 📚 Daftar & detail Bidang Layanan hukum
- 👨‍⚖️ Daftar & profil Advokat lengkap dengan bidang keahlian
- 📋 Daftar Pengaduan dengan badge status (Diterima/Diproses/Selesai/Ditolak) dan advokat penanggung jawab
- 📝 Formulir pengaduan publik yang menulis langsung ke Cosmic CMS
- 📞 Halaman Kontak dengan panduan mengajukan pengaduan
- 📱 Desain responsif navy & emas, cepat, dan mudah diakses

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ae308721e644ce3ac71fd27&clone_repository=6ae30b111e644ce3ac71fdb4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: buatkan website pengaduan hukum LBH MAHAKA"

### Code Generation Prompt

> Build a Next.js application for a company website called "Buatkan Website Pengaduan". The content is managed in Cosmic CMS with the following object types: bidang-layanan, advokat, pengaduan. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> Website pengaduan hukum (legal complaint portal) dalam Bahasa Indonesia untuk sebuah kantor hukum. Gunakan content types yang sudah ada: Bidang Layanan (practice areas), Advokat (lawyers), dan Pengaduan (complaints dengan status Diterima/Diproses/Selesai/Ditolak serta advokat yang ditugaskan). Halaman: Beranda dengan hero, ringkasan layanan, dan ajakan untuk mengajukan pengaduan; halaman daftar & detail Bidang Layanan; halaman daftar & profil Advokat; halaman Pengaduan yang menampilkan daftar pengaduan beserta badge status dan advokat yang menangani, serta halaman detail pengaduan; halaman Kontak/cara mengajukan pengaduan. Desain profesional, terpercaya, bersih, responsif, warna navy dan emas.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — App Router, Server Components & Server Actions
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cosmic](https://www.cosmicjs.com) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with this bucket's content model

### Installation

```bash
bun install
```

Set the following environment variables (create a `.env.local` file):

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all practice areas
const { objects: layanan } = await cosmic.objects
  .find({ type: 'bidang-layanan' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a complaint with related lawyer and practice area
const { object: pengaduan } = await cosmic.objects
  .findOne({ type: 'pengaduan', slug: 'contoh-slug' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Create a new complaint
await cosmic.objects.insertOne({
  type: 'pengaduan',
  title: 'Pengaduan dari Budi Santoso',
  metadata: {
    nama_pelapor: 'Budi Santoso',
    email: 'budi@example.com',
    status_pengaduan: 'Diterima'
  }
})
```

## Cosmic CMS Integration

This app reads and writes to three Cosmic object types:

- **bidang-layanan** — practice areas (`nama_layanan`, `deskripsi`, `ikon`, `gambar`)
- **advokat** — lawyers (`nama_lengkap`, `jabatan`, `bidang_keahlian`, `foto`, `email`, `profil_singkat`)
- **pengaduan** — complaints (`nama_pelapor`, `email`, `nomor_telepon`, `bidang_layanan`, `tanggal_kejadian`, `kronologi`, `dokumen_pendukung`, `status_pengaduan`, `advokat`)

Learn more about the Cosmic SDK in the [official documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the environment variables in the Netlify dashboard
5. Deploy
<!-- README_END -->