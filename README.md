## PROJECT WILDCARD PEMROGRAMAN WEB

## DESKRIPSI

Aplikasi e-course ini dirancang untuk pegawai internal perusahaan, memungkinkan mereka untuk mengikuti kursus secara fleksibel. Fitur utama aplikasi meliputi pemantauan progres oleh admin maupun trainer yang memungkinkan untuk melihat kemajuan pembelajaran, serta forum diskusi untuk setiap kursus, memfasilitasi interaksi dan kolaborasi antar peserta. Aplikasi ini mendukung pengelolaan kursus yang mudah dan memberikan pengalaman pembelajaran yang efektif dan terorganisir.
Aplikasi ini dibuat menggunakan Next.js secara fullstack, dengan backend yang memanfaatkan Next.js api routes.

## TECH STACK

- Next.js (web framework)
- TypeScript (bahasa pemrograman)
- Prisma (ORM)
- NextUI & TailwindCSS (UI framework)
- ImageKit (file storage)

## ROLE USER

- Admin
  - CRUD course
  - Membuat lesson
  - Melihat progress peserta
  - Melihat dan menulis forum dengan tag `Admin`
  - CRUD user
  - CRUD jabatan
  - Dashboard
- Trainer
  - CRUD course
  - Membuat lesson
  - Melihat progress peserta
  - Melihat dan menulis forum dengan tag `Trainer`
- User
  - Melihat list course yang sudah di-assign
  - Mengikuti pembelajaran dalam course
