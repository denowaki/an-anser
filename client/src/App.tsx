import { useState } from 'react'
import {
  ShoppingCart,
  Search,
  Phone,
  Battery,
  Laptop,
  BatteryCharging,
  ShieldCheck,
  Zap,
  Package,
  Truck,
  Star,
  ChevronRight,
  X,
} from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  rating: number
  description: string
}

interface CartItem {
  product: Product
  qty: number
}

const PRODUCTS: Product[] = [
  { id: 'sp1', name: 'Canadian Solar 400W Panel', price: 18999, category: 'solar', image: 'https://picsum.photos/seed/solar1/400/300', rating: 4.6, description: 'High-efficiency monocrystalline panel, 25-year warranty' },
  { id: 'sp2', name: 'Jinko Solar 450W Panel', price: 21999, category: 'solar', image: 'https://picsum.photos/seed/solar2/400/300', rating: 4.7, description: 'Premium 450W bifacial panel for residential setups' },
  { id: 'sp3', name: 'ROCKPals 200W Portable Panel', price: 12999, category: 'solar', image: 'https://picsum.photos/seed/solar3/400/300', rating: 4.4, description: 'Foldable portable solar panel with USB & DC output' },
  { id: 'hi1', name: 'Growatt 3kW Hybrid Inverter', price: 45999, category: 'solar', image: 'https://picsum.photos/seed/inv1/400/300', rating: 4.8, description: 'Hybrid inverter with MPPT, grid/off-grid capable' },
  { id: 'hi2', name: 'Huawei Luna 5kW Hybrid Inverter', price: 67999, category: 'solar', image: 'https://picsum.photos/seed/inv2/400/300', rating: 4.9, description: 'Smart hybrid inverter with app monitoring' },
  { id: 'hi3', name: 'Victron Multiplus 48V 3kW', price: 89999, category: 'solar', image: 'https://picsum.photos/seed/inv3/400/300', rating: 4.7, description: 'Pure sine wave hybrid inverter charger' },
  { id: 'mb1', name: 'Apple MacBook Air M3', price: 149999, category: 'laptops', image: 'https://picsum.photos/seed/mac1/400/300', rating: 4.9, description: '13-inch M3 chip, 8GB RAM, 256GB SSD' },
  { id: 'mb2', name: 'Apple MacBook Pro 14 M3 Pro', price: 249999, category: 'laptops', image: 'https://picsum.photos/seed/mac2/400/300', rating: 4.8, description: '14-inch M3 Pro, 18GB RAM, 512GB SSD' },
  { id: 'mb3', name: 'Apple MacBook Air M2', price: 129999, category: 'laptops', image: 'https://picsum.photos/seed/mac3/400/300', rating: 4.7, description: '13-inch M2 chip, 8GB RAM, 256GB SSD' },
  { id: 'tp1', name: 'Lenovo ThinkPad E14', price: 64999, category: 'laptops', image: 'https://picsum.photos/seed/tp1/400/300', rating: 4.3, description: '14-inch Intel i5, 8GB RAM, 256GB SSD' },
  { id: 'tp2', name: 'Lenovo ThinkPad T14 Gen 4', price: 119999, category: 'laptops', image: 'https://picsum.photos/seed/tp2/400/300', rating: 4.6, description: '14-inch AMD Ryzen 7, 16GB RAM, 512GB SSD' },
  { id: 'tp3', name: 'HP EliteBook 840 G10', price: 139999, category: 'laptops', image: 'https://picsum.photos/seed/tp3/400/300', rating: 4.5, description: '14-inch Intel i7, 16GB RAM, 512GB SSD' },
  { id: 'pb1', name: 'Anker Power Bank 20000mAh', price: 5499, category: 'accessories', image: 'https://picsum.photos/seed/pb1/400/300', rating: 4.6, description: '20000mAh dual USB-C fast charging power bank' },
  { id: 'pb2', name: 'Baseus 100W Power Bank', price: 8999, category: 'accessories', image: 'https://picsum.photos/seed/pb2/400/300', rating: 4.5, description: '100W 20000mAh GaN power bank with LCD' },
  { id: 'pb3', name: 'Samsung 25000mAh Power Bank', price: 7999, category: 'accessories', image: 'https://picsum.photos/seed/pb3/400/300', rating: 4.3, description: '25000mAh triple-output power bank' },
  { id: 'fc1', name: 'Anker 65W GaN Charger', price: 4999, category: 'accessories', image: 'https://picsum.photos/seed/fc1/400/300', rating: 4.5, description: '65W compact GaN charger with 2 USB-C ports' },
  { id: 'fc2', name: 'Ugreen 100W Fast Charger', price: 5999, category: 'accessories', image: 'https://picsum.photos/seed/fc2/400/300', rating: 4.6, description: '100W 4-port USB charger with PD 3.0' },
  { id: 'fc3', name: 'Baseus 120W Super Charger', price: 6999, category: 'accessories', image: 'https://picsum.photos/seed/fc3/400/300', rating: 4.7, description: '120W single-port GaN fast charger' },
]

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'solar', label: 'Solar' },
  { key: 'laptops', label: 'Laptops' },
  { key: 'accessories', label: 'Accessories' },
]

const SUBCATEGORY_LABELS: Record<string, string> = {
  solar: 'Solar Panels & Hybrid Inverters',
  laptops: 'MacBooks & ThinkPads',
  accessories: 'Power Banks & Fast Chargers',
}

const formatKES = (n: number) => `KSh ${n.toLocaleString('en-KE')}`

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  )
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        )
      }
      return [...prev, { product, qty: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === productId)
      if (!existing) return prev
      if (existing.qty <= 1) return prev.filter((i) => i.product.id !== productId)
      return prev.map((i) =>
        i.product.id === productId ? { ...i, qty: i.qty - 1 } : i,
      )
    })
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const groupedBySubcategory = filteredProducts.reduce<Record<string, Product[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Value Proposition Banner ─── */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Same-day Nairobi delivery</span>
          </div>
          <span className="hidden sm:inline text-blue-200">|</span>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>M-Pesa integration</span>
          </div>
          <span className="hidden sm:inline text-blue-200">|</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Local warranty</span>
          </div>
        </div>
      </div>

      {/* ─── Header ─── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <BatteryCharging className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">AL Anser</h1>
              <p className="text-[10px] text-gray-500">Nairobi, Kenya</p>
            </div>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="tel:+254700000000" className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">+254 700 000 000</span>
            </a>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Cart">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* ─── Hero ─── */}
        <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl overflow-hidden text-white py-12 px-6 md:py-16 md:px-10">
          <div className="max-w-lg">
            <p className="text-blue-100 text-sm font-medium mb-2">AL Anser Electronics</p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
              Solar, Laptops & Accessories
            </h2>
            <p className="text-blue-100 mb-6">
              Quality electronics and solar products delivered to your door in Nairobi and across Kenya. Pay via M-Pesa.
            </p>
            <a href="#products" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Shop Now <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block opacity-10">
            <BatteryCharging className="w-full h-full p-10" />
          </div>
        </section>

        {/* ─── Category Filters ─── */}
        <div className="flex gap-2 overflow-x-auto pb-2" id="products">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ─── Search Results Info ─── */}
        {searchQuery && (
          <p className="text-sm text-gray-500">
            Searching "&bull;{searchQuery}&bull;" — {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* ─── Product Sections ─── */}
        {activeCategory !== 'all' ? (
          <section className="space-y-8">
            {Object.entries(groupedBySubcategory).map(([cat, products]) => (
              <div key={cat}>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  {cat === 'solar' && <BatteryCharging className="w-5 h-5 text-blue-600" />}
                  {cat === 'laptops' && <Laptop className="w-5 h-5 text-blue-600" />}
                  {cat === 'accessories' && <Package className="w-5 h-5 text-blue-600" />}
                  {SUBCATEGORY_LABELS[cat] || cat}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(groupedBySubcategory).length === 0 && (
              <p className="text-center text-gray-500 py-12">No products found</p>
            )}
          </section>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="products">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
            ))}
          </section>
        )}

        {/* ─── Cart Drawer ─── */}
        {cart.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                Cart ({cartCount} item{cartCount !== 1 ? 's' : ''})
              </h2>
              <span className="text-xl font-bold text-gray-900">{formatKES(cartTotal)}</span>
            </div>
            <div className="space-y-2">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-gray-500">{formatKES(product.price)} × {qty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{formatKES(product.price * qty)}</span>
                    <button onClick={() => removeFromCart(product.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
              Proceed to Checkout (M-Pesa)
            </button>
          </section>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BatteryCharging className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold">AL Anser Electronics</span>
            </div>
            <p className="text-sm">Nairobi, Kenya — Your trusted source for electronics and solar products.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Solar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Laptops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +254 700 000 000</li>
              <li>info@alanser.ke</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 text-xs text-center">
          © {new Date().getFullYear()} AL Anser Electronics. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
        <StarRating rating={product.rating} />
        <div className="mt-auto pt-3">
          <span className="text-lg font-bold text-gray-900">{formatKES(product.price)}</span>
          <button
            onClick={onAdd}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
