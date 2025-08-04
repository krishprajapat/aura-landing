
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useStore } from "../contexts/StoreContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<{ [key: string]: string }>({});
  const [selectedColor, setSelectedColor] = useState<{ [key: string]: string }>({});

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedItems.length === wishlist.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlist.map((item) => item.id));
    }
  };

  const handleAddToCart = async (item: any) => {
    if (!item.product) return;
    
    const size = selectedSize[item.id];
    const color = selectedColor[item.id];

    if (item.product.sizes?.length > 0 && !size) {
      alert("Please select a size");
      return;
    }

    if (item.product.colors?.length > 0 && !color) {
      alert("Please select a color");
      return;
    }

    await addToCart(item.product, size, color);
  };

  const addSelectedToCart = async () => {
    const selectedItemsData = wishlist.filter((item) =>
      selectedItems.includes(item.id),
    );

    for (const item of selectedItemsData) {
      if (!item.product) continue;
      
      const size = selectedSize[item.id];
      const color = selectedColor[item.id];

      if (item.product.sizes?.length > 0 && !size) {
        alert(`Please select size for ${item.product.name}`);
        return;
      }

      if (item.product.colors?.length > 0 && !color) {
        alert(`Please select color for ${item.product.name}`);
        return;
      }
    }

    // Add all items to cart
    for (const item of selectedItemsData) {
      if (item.product) {
        await addToCart(item.product, selectedSize[item.id], selectedColor[item.id]);
      }
    }
    
    setSelectedItems([]);
  };

  const removeSelected = async () => {
    for (const itemId of selectedItems) {
      const item = wishlist.find((w) => w.id === itemId);
      if (item) {
        await removeFromWishlist(item.product_id);
      }
    }
    setSelectedItems([]);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 md:px-12 py-16 text-center">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h1 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="font-dm-sans text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
              Start exploring our collection and save your favorite pieces for
              later. Your wishlist helps you keep track of items you love.
            </p>
            <Link
              to="/products"
              className="inline-flex px-8 py-3 bg-brand-sage text-white font-dm-sans font-semibold rounded-md hover:bg-brand-green transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-2">
              My Wishlist
            </h1>
            <p className="font-dm-sans text-gray-600">
              {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved for later
            </p>
          </div>

          {/* Bulk Actions */}
          {wishlist.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={selectAll}
                className="px-4 py-2 text-brand-sage border border-brand-sage rounded-md hover:bg-brand-sage hover:text-white transition-colors font-dm-sans"
              >
                {selectedItems.length === wishlist.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
              {selectedItems.length > 0 && (
                <>
                  <button
                    onClick={addSelectedToCart}
                    className="px-4 py-2 bg-brand-sage text-white rounded-md hover:bg-brand-green transition-colors font-dm-sans"
                  >
                    Add Selected to Cart
                  </button>
                  <button
                    onClick={removeSelected}
                    className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors font-dm-sans"
                  >
                    Remove Selected
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Item Image */}
              <div className="relative">
                <img
                  src={item.product?.image_url || '/placeholder.svg'}
                  alt={item.product?.name || 'Product'}
                  className="w-full h-64 object-cover"
                />

                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="h-5 w-5 text-brand-sage focus:ring-brand-sage border-gray-300 rounded"
                  />
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.product_id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>

                {/* Stock Status */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-dm-sans font-semibold ${
                      item.product?.in_stock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.product?.in_stock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-4">
                <div className="mb-3">
                  <span className="text-xs font-dm-sans text-gray-500 uppercase tracking-wide">
                    {item.product?.category || 'Uncategorized'}
                  </span>
                  <h3 className="font-anonymous text-lg font-bold text-brand-dark-brown mt-1">
                    {item.product?.name || 'Product'}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-dm-sans text-lg font-bold text-brand-sage">
                      ${item.product?.price || 0}
                    </span>
                  </div>
                </div>

                {/* Size Selection */}
                {item.product?.sizes && item.product.sizes.length > 0 && (
                  <div className="mb-3">
                    <label className="block font-dm-sans text-xs font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <select
                      value={selectedSize[item.id] || ""}
                      onChange={(e) =>
                        setSelectedSize((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans text-sm"
                    >
                      <option value="">Select Size</option>
                      {item.product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Color Selection */}
                {item.product?.colors && item.product.colors.length > 0 && (
                  <div className="mb-4">
                    <label className="block font-dm-sans text-xs font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <select
                      value={selectedColor[item.id] || ""}
                      onChange={(e) =>
                        setSelectedColor((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans text-sm"
                    >
                      <option value="">Select Color</option>
                      {item.product.colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.product?.in_stock}
                  className="w-full py-2 bg-brand-sage text-white font-dm-sans font-semibold rounded-md hover:bg-brand-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {item.product?.in_stock ? "Add to Cart" : "Out of Stock"}
                </button>

                {/* Date Added */}
                <div className="mt-3 text-xs font-dm-sans text-gray-500">
                  Added on {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-brand-sage hover:text-brand-green font-dm-sans transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
