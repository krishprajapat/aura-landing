import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="text-center max-w-2xl">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative">
              <h1 className="font-anonymous text-[120px] md:text-[180px] lg:text-[220px] font-bold text-brand-sage opacity-20 leading-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-24 h-24 md:w-32 md:h-32 text-brand-sage"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.952.765-5.369 2.138A17.91 17.91 0 003 12c0-9.539 7.462-17 17-17s17 7.461 17 17a17.91 17.91 0 01-3.631 10.138A7.962 7.962 0 0112 15z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-4">
              Oops! Page Not Found
            </h2>
            <p className="font-dm-sans text-lg text-gray-600 leading-relaxed mb-6">
              The page you're looking for seems to have wandered off. Don't worry, 
              even the best-dressed sometimes lose their way. Let's get you back on track.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link
              to="/"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-brand-sage text-white rounded-lg hover:bg-brand-green transition-colors font-dm-sans font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
            
            <Link
              to="/products"
              className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-brand-sage text-brand-sage rounded-lg hover:bg-brand-sage hover:text-white transition-colors font-dm-sans font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Shop Collection
            </Link>
          </div>

          {/* Popular Links */}
          <div className="mb-8">
            <h3 className="font-anonymous text-xl font-bold text-brand-dark-brown mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/about"
                className="px-4 py-2 text-brand-sage hover:text-brand-green transition-colors font-dm-sans"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-brand-sage hover:text-brand-green transition-colors font-dm-sans"
              >
                Contact
              </Link>
              <Link
                to="/shipping-returns"
                className="px-4 py-2 text-brand-sage hover:text-brand-green transition-colors font-dm-sans"
              >
                Shipping & Returns
              </Link>
              <Link
                to="/account"
                className="px-4 py-2 text-brand-sage hover:text-brand-green transition-colors font-dm-sans"
              >
                My Account
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-dm-sans">
              Can't find what you're looking for? Try searching for it.
            </p>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mt-16 w-full max-w-6xl">
          <h3 className="font-anonymous text-2xl font-bold text-brand-dark-brown text-center mb-8">
            While You're Here, Check These Out
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Classic Blazer",
                price: 320,
                image: "https://api.builder.io/api/v1/image/assets/TEMP/45d1f1251c065c28ca175a8d1d690d4cbd83b842?width=400",
              },
              {
                name: "Designer Cardigan",
                price: 280,
                originalPrice: 350,
                image: "https://api.builder.io/api/v1/image/assets/TEMP/678895d81c15669c94575725cccdc00cf34397d6?width=400",
              },
              {
                name: "Modern Dress Shirt",
                price: 150,
                image: "https://api.builder.io/api/v1/image/assets/TEMP/a888418fe183a8a05e5178e82fd99518b4299b93?width=400",
              },
            ].map((product, index) => (
              <Link
                key={index}
                to="/products"
                className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h4 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-2 group-hover:text-brand-sage transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="font-dm-sans text-lg font-bold text-brand-sage">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-dm-sans text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
