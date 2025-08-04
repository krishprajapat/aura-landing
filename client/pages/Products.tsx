import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useStore, Product } from "../contexts/StoreContext";

const categories = [
  "All",
  "Outerwear",
  "Blazers", 
  "Suits",
  "Knitwear",
  "Shirts",
  "Trousers",
  "Casual",
  "Tops",
  "Bottoms"
];

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, addToWishlist, isInWishlist, isInCart } = useStore();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedSize, selectedColor);
      }
      setSelectedSize("");
      setSelectedColor("");
      setQuantity(1);
    }
  };

  const handleWishlistToggle = () => {
    if (!isInWishlist(product.id)) {
      addToWishlist(product);
    }
  };

  // Mock additional images for demo
  const productImages = [product.image, product.image, product.image];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-brand-green text-white px-3 py-1 rounded-full text-xs font-dm-sans font-semibold">
                    NEW
                  </div>
                )}
                {product.isSale && (
                  <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-dm-sans font-semibold">
                    SALE
                  </div>
                )}
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-[400px] lg:h-[500px] object-cover rounded-xl"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-brand-sage' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-dm-sans text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <button
                    onClick={handleWishlistToggle}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                      }`}
                      fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                <h1 className="font-anonymous text-2xl lg:text-3xl font-bold text-brand-dark-brown mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-dm-sans text-2xl font-bold text-brand-sage">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="font-dm-sans text-lg text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-dm-sans font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                <p className="font-dm-sans text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-3">
                  Product Features
                </h3>
                <ul className="space-y-2 font-dm-sans text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-sage" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Premium quality materials
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-sage" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Professional tailoring
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-sage" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Easy care instructions
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-sage" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sustainable sourcing
                  </li>
                </ul>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-3">
                  Size *
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-3 border rounded-lg font-dm-sans text-sm font-semibold transition-all hover:scale-105 ${
                        selectedSize === size
                          ? "border-brand-sage bg-brand-sage text-white shadow-lg"
                          : "border-gray-300 hover:border-brand-sage hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-3">
                  Color *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.colors.map((color) => (
                    <label key={color} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={selectedColor === color}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="h-4 w-4 text-brand-sage focus:ring-brand-sage border-gray-300"
                      />
                      <span className="ml-3 font-dm-sans text-sm font-medium">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="font-dm-sans text-lg font-semibold px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className="w-full py-4 bg-brand-sage text-white font-dm-sans text-lg font-semibold rounded-xl hover:bg-brand-green transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                >
                  {isInCart(product.id) ? 'Add More to Cart' : 'Add to Cart'} - ${(product.price * quantity).toFixed(2)}
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className="w-full py-3 border border-brand-sage text-brand-sage font-dm-sans font-semibold rounded-xl hover:bg-brand-sage hover:text-white transition-colors"
                >
                  {isInWishlist(product.id) ? 'Already in Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm font-dm-sans text-gray-600">
                  <svg className="w-5 h-5 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Free shipping on orders over $200
                </div>
                <div className="flex items-center gap-3 text-sm font-dm-sans text-gray-600">
                  <svg className="w-5 h-5 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  30-day return policy
                </div>
                <div className="flex items-center gap-3 text-sm font-dm-sans text-gray-600">
                  <svg className="w-5 h-5 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  2-year warranty included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { products, addToCart, addToWishlist, isInWishlist, isInCart, loading } = useStore();

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory,
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });



  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      // Remove from wishlist - this would need a removeFromWishlist function
      console.log("Remove from wishlist (not implemented in this demo)");
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[350px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-brand-sage to-brand-green flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="font-anonymous text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            Our Collection
          </h1>
          <p className="font-dm-sans text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover premium clothing that combines timeless style with
            exceptional comfort
          </p>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-6 md:py-8 px-4 md:px-12 lg:px-40 bg-brand-warm-beige">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 py-2 rounded-full font-dm-sans text-xs md:text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-brand-sage text-white"
                      : "bg-white text-brand-sage hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4">
              <label className="font-dm-sans text-sm md:text-base text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 md:px-4 py-2 border border-gray-300 rounded-md font-dm-sans text-sm md:text-base bg-white"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-12 lg:px-40">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-sage"></div>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
                No products found
              </h3>
              <p className="font-dm-sans text-gray-600">
                Try adjusting your filters or check back later for new arrivals.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg overflow-hidden border border-gray-200"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden">
                  {product.in_stock && (
                    <div className="absolute top-3 left-3 z-10 bg-brand-green text-white px-2 md:px-3 py-1 rounded-full text-xs font-dm-sans font-semibold">
                      IN STOCK
                    </div>
                  )}
                  
                  {/* Wishlist Heart */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-3 right-3 z-20 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    style={{ right: product.isSale ? '60px' : '12px' }}
                  >
                    <svg
                      className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                      fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-[280px] md:h-[350px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* View Details Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 px-6 py-3 bg-white text-brand-sage font-dm-sans font-semibold rounded-lg hover:bg-brand-sage hover:text-white shadow-lg">
                      View Details
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-xs font-dm-sans text-gray-500 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="font-anonymous text-lg md:text-xl font-bold text-brand-dark-brown group-hover:text-brand-sage transition-colors mt-1">
                      {product.name}
                    </h3>
                    <p className="font-dm-sans text-gray-600 text-xs md:text-sm leading-relaxed mt-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-dm-sans text-base md:text-lg font-bold text-brand-sage">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-dm-sans text-xs md:text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {isInCart(product.id) && (
                      <span className="text-xs font-dm-sans text-brand-green font-semibold">
                        In Cart
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="w-full mt-3 md:mt-4 py-2 md:py-3 bg-brand-sage text-white font-dm-sans text-sm md:text-base font-semibold rounded-md hover:bg-brand-green transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 px-4 md:px-12 lg:px-40 bg-brand-sage">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anonymous text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Stay Updated
          </h2>
          <p className="font-dm-sans text-lg text-[#D4DBD3] leading-relaxed mb-10 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive offers, and
            styling tips from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md font-dm-sans"
            />
            <button className="px-8 py-3 bg-white text-brand-sage font-dm-sans font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct!}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Footer />
    </div>
  );
}
