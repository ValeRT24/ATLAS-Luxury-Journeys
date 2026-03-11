// =======================================
// QUEBIATH — Base de datos de productos
// Simula tablas MySQL en JavaScript
// =======================================

const DB = {
  // Tabla: productos
  products: [
    {
      id: 1, name: "Vestido Bougainvillea", brand: "Q. Exclusivo",
      price: 2490, originalPrice: 3200, discount: 22,
      category: "vestidos", badge: "sale", isNew: false, isBestseller: true,
      colors: ["#E8929C","#C9626E","#FFFFFF"],
      sizes: ["XS","S","M","L"],
      description: "Vestido midi floral con escote en V y mangas abullonadas. Tela ligera 100% viscosa perfecta para los días más cálidos.",
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80"
      ],
      rating: 4.9, reviews: 87
    },
    {
      id: 2, name: "Blusa Pétalo", brand: "Q. Studio",
      price: 890, originalPrice: null, discount: 0,
      category: "blusas", badge: "new", isNew: true, isBestseller: false,
      colors: ["#F9F4EF","#E8D9C8","#F2C9CE"],
      sizes: ["XS","S","M","L","XL"],
      description: "Blusa de seda con detalles de encaje en el cuello. Elegante y versátil — de la oficina a la noche sin esfuerzo.",
      images: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
      ],
      rating: 4.8, reviews: 34
    },
    {
      id: 3, name: "Palazzo Champagne", brand: "Q. Exclusivo",
      price: 1590, originalPrice: 2100, discount: 24,
      category: "pantalones", badge: "sale", isNew: false, isBestseller: true,
      colors: ["#E8D9C8","#C9A882","#3A2F2F"],
      sizes: ["XS","S","M","L"],
      description: "Pantalón palazzo de tiro alto en satén champagne. Corte amplio que fluye con cada movimiento. Cómodo y ultra femenino.",
      images: [
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1508543936-7b3dbdf7c73e?auto=format&fit=crop&w=600&q=80"
      ],
      rating: 4.7, reviews: 56
    },
    {
      id: 4, name: "Set Primavera Rosa", brand: "Q. Colección",
      price: 3200, originalPrice: null, discount: 0,
      category: "vestidos", badge: "hot", isNew: true, isBestseller: true,
      colors: ["#F2C9CE","#E8929C","#FFFFFF"],
      sizes: ["S","M","L"],
      description: "Conjunto de dos piezas: top crop con lazo y falda midi plisada. La definición de cottage chic.",
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
      ],
      rating: 5.0, reviews: 112
    },
    {
      id: 5, name: "Falda Magnolia", brand: "Q. Studio",
      price: 1190, originalPrice: 1600, discount: 26,
      category: "faldas", badge: "sale", isNew: false, isBestseller: false,
      colors: ["#FFFFFF","#F2C9CE","#E8D9C8"],
      sizes: ["XS","S","M","L","XL"],
      description: "Falda midi plisada con cintura elástica. Ligera como el aire, perfecta para cualquier ocasión.",
      images: [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
      ],
      rating: 4.6, reviews: 29
    },
    {
      id: 6, name: "Bolso Satin Nude", brand: "Q. Accesorios",
      price: 1850, originalPrice: null, discount: 0,
      category: "accesorios", badge: "new", isNew: true, isBestseller: false,
      colors: ["#E8D9C8","#C9A882","#3A2F2F"],
      sizes: ["Única"],
      description: "Bolso mini de satén con correa dorada ajustable. El accesorio que transforma cualquier outfit.",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
      ],
      rating: 4.9, reviews: 67
    },
    {
      id: 7, name: "Vestido Nocturno Vino", brand: "Q. Noche",
      price: 3890, originalPrice: 5200, discount: 25,
      category: "vestidos", badge: "sale", isNew: false, isBestseller: true,
      colors: ["#7A2D3A","#3A2F2F","#C9626E"],
      sizes: ["XS","S","M"],
      description: "Vestido de noche en terciopelo con escote asimétrico. Para la noche que merece ser recordada.",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
      ],
      rating: 4.9, reviews: 43
    },
    {
      id: 8, name: "Blusa Lace Garden", brand: "Q. Studio",
      price: 1290, originalPrice: null, discount: 0,
      category: "blusas", badge: "new", isNew: true, isBestseller: false,
      colors: ["#FFFFFF","#F2C9CE","#E8D9C8"],
      sizes: ["XS","S","M","L"],
      description: "Blusa con bordado floral artesanal en el escote. Romántica y delicada — perfecta para el brunch dominical.",
      images: [
        "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"
      ],
      rating: 4.7, reviews: 21
    }
  ],

  // Tabla: carrito_sesion
  cart: [
    { productId: 1, qty: 1, size: "S", color: "#E8929C" },
    { productId: 4, qty: 1, size: "M", color: "#F2C9CE" },
    { productId: 6, qty: 1, size: "Única", color: "#E8D9C8" }
  ],

  // Tabla: categorias
  categories: [
    { id: "vestidos", name: "Vestidos", count: 87 },
    { id: "blusas", name: "Blusas", count: 124 },
    { id: "pantalones", name: "Pantalones", count: 56 },
    { id: "faldas", name: "Faldas", count: 39 },
    { id: "accesorios", name: "Accesorios", count: 200 }
  ],

  // Métodos que simulan consultas SQL
  query: {
    // SELECT * FROM products LIMIT n
    getAllProducts(limit = 100) {
      return DB.products.slice(0, limit);
    },
    // SELECT * FROM products WHERE isNew = true
    getNewProducts() {
      return DB.products.filter(p => p.isNew);
    },
    // SELECT * FROM products WHERE isBestseller = true
    getBestsellers() {
      return DB.products.filter(p => p.isBestseller);
    },
    // SELECT * FROM products WHERE category = cat
    getByCategory(cat) {
      return DB.products.filter(p => p.category === cat);
    },
    // SELECT * FROM products WHERE id = id LIMIT 1
    getById(id) {
      return DB.products.find(p => p.id === parseInt(id));
    },
    // SELECT SUM(price * qty) FROM cart
    getCartTotal() {
      return DB.cart.reduce((acc, item) => {
        const p = DB.query.getById(item.productId);
        return acc + (p ? p.price * item.qty : 0);
      }, 0);
    },
    // SELECT COUNT(*) FROM cart
    getCartCount() {
      return DB.cart.reduce((acc, item) => acc + item.qty, 0);
    },
    // INSERT INTO cart
    addToCart(productId, size, color) {
      const existing = DB.cart.find(i => i.productId === productId && i.size === size);
      if (existing) { existing.qty++; }
      else { DB.cart.push({ productId, qty: 1, size, color }); }
    },
    // DELETE FROM cart WHERE productId = id
    removeFromCart(productId) {
      const idx = DB.cart.findIndex(i => i.productId === productId);
      if (idx > -1) DB.cart.splice(idx, 1);
    },
    // UPDATE cart SET qty = qty + delta
    updateCartQty(productId, delta) {
      const item = DB.cart.find(i => i.productId === productId);
      if (item) {
        item.qty += delta;
        if (item.qty <= 0) DB.query.removeFromCart(productId);
      }
    },
    // SELECT * FROM products WHERE name LIKE '%query%'
    search(query) {
      const q = query.toLowerCase();
      return DB.products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
  }
};
