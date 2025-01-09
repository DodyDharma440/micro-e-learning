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
- Tanstack Query (fetching and caching)
- Tanstack Table (datatable)
- Axios (http client)

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

## FOLDER STRUCTURE

### .husky

Di dalam project ini saya memasang package `husky pre-commit` yang berguna untuk melakukan pengecekan sebelum commit. Yang saya cek adalah error dari TypeScript untuk memastikan agar sebelum dicommit tidak ada error dari TypeScript. Pengecekan dilakukan dengan command

```
yarn tsc
```

### .vscode

Folder ini berisi konfigurasi vscode sebagai text editor. Disini saya hanya menambahkan beberapa snippets custom, dengan menggunakan ekstensi file `.code-snippets` dan membuat snippets sesuai ketentuan dari vscode.

### prisma

Berisi file untuk konfigurasi prisma, yaitu schema dan script untuk melakukan seeding database.

### public

Folder untuk menyimpan assets yang bersifat public

### src

Berisi seluruh source code dari project ini.

- `common`, Folder untuk menyimpan code yang bersifat general dan yang akan digunakan berulang-ulang.
  - `actions`, Folder untuk menyimpan code yang berkomunikasi ke api/backend
  - `components`, Menyimpan file untuk UI dengan menggunakan file `.tsx` agar bisa menulis jsx syntax di file TypeScript
  - `configs`, Menyimpan file konfigurasi seperti api instance, theme, fonts, dll.
  - `constants`, Menyimpan file yang berisi variable yang tetap
  - `contexts`, Menyimpan file react context yang bersifat global
  - `declarations`, Berisi file TypeScript declaration dengan ekstensi `.d.ts`, untuk melakukan definisi types dari package yang dipakai dari npm secara custom.
  - `hocs`, Hoc adalah singkatan dari higher order components. Jadi folder ini menyimpan file hoc yang bersifat global
  - `hooks`, Menyimpan code untuk custom react hooks
  - `interfaces`, Menyimpan types dan interfaces
  - `layouts`, Mirip seperti components, hanya saja UI pada folder ini memiliki cakupan yang besar, atau sebagai wadah dari app ini.
  - `utils`, Berisi utility functions yang sering digunakan.
- `modules`, Folder yang berisi sub-folder didalamnya berupa folder-folder per fitur. Di dalam fitur, ada folder yang sudah terstruktur yaitu:
  - `actions`, Menyimpan aksi yang melakukan komunikasi dengan api/backend
  - `components`, Menyimpan code yang berisi UI.
  - `constants`, Menyimpan variable yang bersifat tetap
  - `interfaces`, Menyimpan types dan interfaces
  - `contexts` (optional), Menyimpan konfigurasi react context untuk case-case tertentu.
  - `utils` (optional), Berisi utility function yang khusus untuk fitur tersebut.
- `pages`, Default folder dari next.js untuk membuat page routing. Di dalam folder pages ada folder khusus dengan nama `api`, yang dimana di dalam folder `api` inilah semua code backend tersimpan.
- `styles`, Folder yang berisi file css secara global untuk konfigurasi TailwindCSS.
- `middleware.ts`, File untuk middleware api route dari next.js

### .env

File untuk environment variables

### .env.example

File contoh isian dari env variables

### .eslintrc.json

File konfigurasi eslint

### .gitignore

File untuk ignore push ke git

### next.config.mjs

File konfigurasi next.js

### package.json

File yang selalu ada di setiap project menggunakan node js. Dapat berisi informasi penting tentang project ini serta daftar packages dan script npm yang digunakan.

### postcss.config.js

File konfigurasi postcss untuk mendukung TailwindCSS

### README.md

File dokumentasi project

### tailwind.config.js

File konfigurasi TailwindCSS

### tsconfig.json

File konfigurasi TypeScript

### yarn.lock / package-lock.json

Auto generated lockfile. File ini adalah hasil generate setelah melakukan instalasi dependencies

## RUN THIS PROJECT

### Pre requisite

Pastikan di laptop/komputernya sudah terinstall Node.js v20 keatas. <br />
Adapun extension vscode yang perlu diinstall adalah

- Prettier (required)
- Eslint (required/must)
- Prisma (required)
- Error lens (optional)
- Auto rename tag (optional)

### Setup env

Buat file `.env` di root directory. Isian file env ini dapat dilihat dari file `.env.example`

```
DATABASE_URL = <URL dari database PostgreSQL (ex: postgresql://{username}:{password}@{host}:{port}/{db_name}?schema={schema})>

COOKIE_NAME= <Nama cookie untuk menyimpan jwt token (ex: "jwt-token")>
JWT_SECRET= <Secret jwt, boleh menggunakan string random. (ex: "lsjdoejjweqwe")>
NEXT_PUBLIC_API_BASE_URL= <URL dari next.js ini sendiri, (ex: "http://localhost:3000") tanpa trailing slash>

NEXT_PUBLIC_IMAGEKIT_URL= <URL untuk imagekit sebagai storage>
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY= <Public key dari ImageKit>
IMAGEKIT_PRIVATE_KEY= <Secret key ImageKit>

* Untuk imagekit bisa buat akun dulu di https://imagekit.io dan mengikuti docs-nya
```

### Install dependencies

Install dependencies boleh menggunakan `yarn` atau `npm`, namun saya lebih prefer menggunakan `yarn`.

```
yarn
```

atau dengan npm

```
npm install
```

### Buat database & jalankan prisma seed

Buat database postgre dengan nama bebas, untuk di local saya menggunakan nama `e-learning`. <br />
Push database menggunakan prisma, agar melakukan generate database serta generate types untuk prisma client.

```
npx prisma db push
```

Kemudian jalankan seeder database

```
npx prisma db seed
```

### Jalankan next.js app

Jalankan dalam mode development

```
yarn dev

// or

npm run dev
```

Jika ingin menjalankan dalam mode production, dapat menggunakan

```
yarn build && yarn start

// or

npm run build && npm run start
```

Untuk credential login super admin bisa menggunakan: <br />

```
Username: superadmin
Password: admin
```

Data credentials ini dibuat ketika melakukan seeding.
