// ==========================================
// MONGODB SCRIPT - KATALOG PRODUK E-COMMERCE
// Dibuat oleh: Andi Putra Malba Syaggaf
// ==========================================

// 1. Membuat Database dan Collection
use ecommerce_db;
db.createCollection("produk");

// 2. Memasukkan Data (Create - insertMany)
db.produk.insertMany([
  {
    produk_id: "P001",
    nama_produk: "Smartphone X Pro",
    kategori: "Elektronik",
    harga: 3500000,
    stok: 50,
    spesifikasi: { ram: "8GB", storage: "128GB", garansi: "1 Tahun" },
    tags: ["gadget", "smartphone", "terlaris"]
  },
  {
    produk_id: "P002",
    nama_produk: "Laptop Slim 14",
    kategori: "Elektronik",
    harga: 8500000,
    stok: 20,
    spesifikasi: { processor: "Core i5", ram: "16GB", storage: "512GB SSD" },
    tags: ["laptop", "komputer", "work"]
  },
  {
    produk_id: "P003",
    nama_produk: "Kaos Polos Cotton Combed",
    kategori: "Pakaian",
    harga: 75000,
    stok: 200,
    ukuran: ["S", "M", "L", "XL"],
    warna: ["Hitam", "Putih", "Navy"],
    tags: ["fashion", "pakaian pria"]
  },
  {
    produk_id: "P004",
    nama_produk: "Sepatu Running Casual",
    kategori: "Olahraga",
    harga: 450000,
    stok: 75,
    ukuran: [40, 41, 42, 43],
    tags: ["sepatu", "sport", "running"]
  },
  {
    produk_id: "P005",
    nama_produk: "Headphone Bluetooth Wireless",
    kategori: "Elektronik",
    harga: 350000,
    stok: 40,
    spesifikasi: { konektivitas: "Bluetooth 5.0", baterai: "20 Jam" },
    tags: ["audio", "gadget"]
  },
  {
    produk_id: "P006",
    nama_produk: "Kemeja Flanel Kotak",
    kategori: "Pakaian",
    harga: 120000,
    stok: 90,
    ukuran: ["M", "L", "XL"],
    tags: ["fashion", "pakaian pria"]
  },
  {
    produk_id: "P007",
    nama_produk: "Smartwatch Sport Edition",
    kategori: "Elektronik",
    harga: 750000,
    stok: 30,
    spesifikasi: { layar: "AMOLED", waterproof: "IP68" },
    tags: ["gadget", "wearable"]
  },
  {
    produk_id: "P008",
    nama_produk: "Tas Ransel Laptop",
    kategori: "Aksesoris",
    harga: 220000,
    stok: 60,
    kapasitas: "25 Liter",
    tags: ["tas", "travel"]
  },
  {
    produk_id: "P009",
    nama_produk: "Celana Chinos Panjang",
    kategori: "Pakaian",
    harga: 160000,
    stok: 110,
    ukuran: ["29", "30", "32", "34"],
    tags: ["fashion", "pakaian pria"]
  },
  {
    produk_id: "P010",
    nama_produk: "Tumbler Stainless Steel",
    kategori: "Lifestyle",
    harga: 95000,
    stok: 150,
    kapasitas: "500 ml",
    tags: ["botol", "rumah tangga"]
  }
]);

// 3. Membaca dan Mencari Data (Read)
// A. Menampilkan seluruh dokumen
db.produk.find().pretty();

// B. Mencari produk kategori Elektronik
db.produk.find({ kategori: "Elektronik" });

// C. Mencari produk dengan harga minimal 500.000 ($gte)
db.produk.find({ harga: { $gte: 500000 } });

// D. Projection (Menampilkan nama dan harga saja)
db.produk.find({}, { _id: 0, nama_produk: 1, harga: 1 });

// 4. Mengubah Data (Update)
db.produk.updateOne(
  { produk_id: "P003" },
  { $set: { harga: 80000, status_diskon: true } }
);

// 5. Menghapus Data (Delete)
db.produk.deleteOne({ produk_id: "P010" });

// 6. Aggregation (Mengelompokkan berdasarkan kategori & menghitung rata-rata harga)
db.produk.aggregate([
  {
    $group: {
      _id: "$kategori",
      jumlahProduk: { $sum: 1 },
      rataRataHarga: { $avg: "$harga" }
    }
  }
]);