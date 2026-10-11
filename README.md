# Arsitektur-Basis-Data-NoSQL-untuk-Pengelolaan-Data-Berskala-Besar
# Tugas Individu Praktikum Big Data: Implementasi NoSQL (MongoDB)
Repositori ini berisi laporan, skrip query, dan dokumentasi implementasi basis data NoSQL menggunakan MongoDB untuk studi kasus **Katalog Produk E-commerce**.

## Identitas Pembuat
- **Nama:** Andi Putra Malba Syaggaf
- **Mata Kuliah:** Big Data
- **Topik:** Arsitektur Basis Data NoSQL (MongoDB & Operasi CRUD)

## Struktur Direktori
- `queries/`: Berisi file script `.js` untuk pembuatan database, collection, CRUD, dan Aggregation MongoDB.
- `docs/`: Berisi diagram arsitektur sistem dan dokumentasi pendukung.

## Studi Kasus & Alasan Pemilihan NoSQL
Sistem *e-commerce* membutuhkan struktur data produk yang dinamis dan bervariasi (misalnya: produk elektronik memerlukan spesifikasi RAM/storage, sedangkan pakaian memerlukan ukuran dan warna). Basis data relasional (SQL) kurang fleksibel untuk mengakomodasi atribut yang bervariasi ini, sehingga dipilih **MongoDB (NoSQL)** berbasis dokumen BSON yang fleksibel, dinamis, dan mudah diskalakan.

## Cara Menjalankan Query MongoDB
1. Hubungkan `mongosh` atau MongoDB Atlas Data Explorer ke cluster Anda.
2. Jalankan skrip yang ada di dalam folder `queries/ecommerce_queries.js`.

## 1.Membuat database dan collection
test> use ecommerce_db
switched to db ecommerce_db
ecommerce_db> db.createCollection("produk")
{ ok: 1 }

## 2.insertMany
ecommerce_db> db.produk.insertMany([ ... ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6709a1f2c3d4e5f600000001'),
    '1': ObjectId('6709a1f2c3d4e5f600000002'),
    '2': ObjectId('6709a1f2c3d4e5f600000003'),
    '3': ObjectId('6709a1f2c3d4e5f600000004'),
    '4': ObjectId('6709a1f2c3d4e5f600000005'),
    '5': ObjectId('6709a1f2c3d4e5f600000006'),
    '6': ObjectId('6709a1f2c3d4e5f600000007'),
    '7': ObjectId('6709a1f2c3d4e5f600000008'),
    '8': ObjectId('6709a1f2c3d4e5f600000009'),
    '9': ObjectId('6709a1f2c3d4e5f60000000a')
  }
}

## 3A. find().pretty(): menampilkan 10 dokumen, contoh dua yang pertama:
[
  {
    _id: ObjectId('6709a1f2c3d4e5f600000001'),
    produk_id: 'P001',
    nama_produk: 'Smartphone X Pro',
    kategori: 'Elektronik',
    harga: 3500000,
    stok: 50,
    spesifikasi: { ram: '8GB', storage: '128GB', garansi: '1 Tahun' },
    tags: [ 'gadget', 'smartphone', 'terlaris' ]
  },
  {
    _id: ObjectId('6709a1f2c3d4e5f600000002'),
    produk_id: 'P002',
    nama_produk: 'Laptop Slim 14',
    kategori: 'Elektronik',
    harga: 8500000,
    stok: 20,
    spesifikasi: { processor: 'Core i5', ram: '16GB', storage: '512GB SSD' },
    tags: [ 'laptop', 'komputer', 'work' ]
  },
  ... (8 dokumen lainnya, P003 sampai P010)
]

## 3B. Kategori Elektronik: 4 dokumen (P001, P002, P005, P007)
[
  { produk_id: 'P001', nama_produk: 'Smartphone X Pro', kategori: 'Elektronik', harga: 3500000, ... },
  { produk_id: 'P002', nama_produk: 'Laptop Slim 14', kategori: 'Elektronik', harga: 8500000, ... },
  { produk_id: 'P005', nama_produk: 'Headphone Bluetooth Wireless', kategori: 'Elektronik', harga: 350000, ... },
  { produk_id: 'P007', nama_produk: 'Smartwatch Sport Edition', kategori: 'Elektronik', harga: 750000, ... }
]

## 3C. Harga ≥ 500.000: 3 dokumen (P001, P002, P007)
[
  { produk_id: 'P001', nama_produk: 'Smartphone X Pro', harga: 3500000, ... },
  { produk_id: 'P002', nama_produk: 'Laptop Slim 14', harga: 8500000, ... },
  { produk_id: 'P007', nama_produk: 'Smartwatch Sport Edition', harga: 750000, ... }
]

## 3D. Projection 
[
  { nama_produk: 'Smartphone X Pro', harga: 3500000 },
  { nama_produk: 'Laptop Slim 14', harga: 8500000 },
  { nama_produk: 'Kaos Polos Cotton Combed', harga: 75000 },
  { nama_produk: 'Sepatu Running Casual', harga: 450000 },
  { nama_produk: 'Headphone Bluetooth Wireless', harga: 350000 },
  { nama_produk: 'Kemeja Flanel Kotak', harga: 120000 },
  { nama_produk: 'Smartwatch Sport Edition', harga: 750000 },
  { nama_produk: 'Tas Ransel Laptop', harga: 220000 },
  { nama_produk: 'Celana Chinos Panjang', harga: 160000 },
  { nama_produk: 'Tumbler Stainless Steel', harga: 95000 }
]
## 4. updateOne
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

## 5. deleteOne
{ acknowledged: true, deletedCount: 1 }

## 6. Aggregation (urutan grup bisa berbeda). Hasil ini sudah memperhitungkan update P003 (harga 80.000) dan penghapusan P010, sehingga kategori Lifestyle tidak muncul.
[
  { _id: 'Elektronik', jumlahProduk: 4, rataRataHarga: 3275000 },
  { _id: 'Pakaian', jumlahProduk: 3, rataRataHarga: 120000 },
  { _id: 'Olahraga', jumlahProduk: 1, rataRataHarga: 450000 },
  { _id: 'Aksesoris', jumlahProduk: 1, rataRataHarga: 220000 }
]
