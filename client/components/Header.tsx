import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { state } = useStore();

  const cartCount = state.cartCount;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="flex w-full h-[70px] px-4 md:px-12 lg:px-[100px] justify-between items-center bg-brand-dark-green relative z-50">
        <div className="flex items-center gap-1">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/355986805122970cba92a9dd1f825e50d9c15678?width=96"
            alt="Vecteur Logo"
            className="w-12 h-12"
          />
          <div className="text-white font-dm-serif text-2xl leading-none">
            Vecteur
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-end items-center gap-4 lg:gap-[30px]">
          <Link
            to="/"
            className="text-[#C2C3BC] font-dm-sans text-sm lg:text-base leading-none hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-[#C2C3BC] font-dm-sans text-sm lg:text-base leading-none hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/products"
            className="text-[#C2C3BC] font-dm-sans text-sm lg:text-base leading-none hover:text-white transition-colors"
          >
            Products
          </Link>
          <Link
            to="/contact"
            className="text-[#C2C3BC] font-dm-sans text-sm lg:text-base leading-none hover:text-white transition-colors"
          >
            Contact
          </Link>
          
          {/* Search */}
          <div className="hidden md:flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-dm-sans w-48 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-[#C2C3BC] hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#C2C3BC] hover:text-white transition-colors"
                title="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3 lg:gap-4 ml-2 lg:ml-4">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-[#C2C3BC] hover:text-white transition-colors"
              title="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 text-[#C2C3BC] hover:text-white transition-colors relative"
              title="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 11-4 0v-5m4 0V8a2 2 0 10-4 0v5"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-dm-sans">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="p-2 text-[#C2C3BC] hover:text-white transition-colors"
              title="My Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>


          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col gap-1 p-2 z-50 relative"
          aria-label="Toggle mobile menu"
        >
          <div
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-brand-dark-green z-40 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-[#C2C3BC] font-dm-sans text-2xl leading-none hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMobileMenu}
            className="text-[#C2C3BC] font-dm-sans text-2xl leading-none hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/products"
            onClick={closeMobileMenu}
            className="text-[#C2C3BC] font-dm-sans text-2xl leading-none hover:text-white transition-colors"
          >
            Products
          </Link>
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="text-[#C2C3BC] font-dm-sans text-2xl leading-none hover:text-white transition-colors"
          >
            Contact
          </Link>

          {/* Mobile Search */}
          <div className="w-full px-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md font-dm-sans bg-white text-gray-900"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Mobile User Actions */}
          <div className="flex flex-col items-center space-y-6">
            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 text-[#C2C3BC] font-dm-sans text-xl leading-none hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Wishlist
            </Link>

            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 text-[#C2C3BC] font-dm-sans text-xl leading-none hover:text-white transition-colors relative"
            >
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 11-4 0v-5m4 0V8a2 2 0 10-4 0v5"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-dm-sans">
                    {cartCount}
                  </span>
                )}
              </div>
              Cart
            </Link>

            <Link
              to="/account"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 text-[#C2C3BC] font-dm-sans text-xl leading-none hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Account
            </Link>

            <Link
              to="/signin"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 text-[#C2C3BC] font-dm-sans text-xl leading-none hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In
            </Link>


          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
}
