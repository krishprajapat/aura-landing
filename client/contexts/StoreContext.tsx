
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  sizes: string[];
  colors: string[];
  in_stock: boolean;
  created_at?: string;
  updated_at?: string;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  size?: string;
  color?: string;
  product?: Product;
}

interface WishlistItem {
  id: string;
  product_id: string;
  product?: Product;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  loading: boolean;
  addToCart: (product: Product, size?: string, color?: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
  total: number;
  cartItemsCount: number;
  loadProducts: () => Promise<void>;
  loadCart: () => Promise<void>;
  loadWishlist: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Load products from Supabase
  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('in_stock', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading products:', error);
        toast.error('Failed to load products');
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Load cart from Supabase
  const loadCart = async () => {
    if (!currentUser) {
      setCart([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', currentUser.uid);

      if (error) {
        console.error('Error loading cart:', error);
        return;
      }

      setCart(data || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  // Load wishlist from Supabase
  const loadWishlist = async () => {
    if (!currentUser) {
      setWishlist([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', currentUser.uid);

      if (error) {
        console.error('Error loading wishlist:', error);
        return;
      }

      setWishlist(data || []);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  // Add item to cart
  const addToCart = async (product: Product, size?: string, color?: string) => {
    if (!currentUser) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      // Check if item already exists in cart with same size/color
      const existingItem = cart.find(
        item => item.product_id === product.id && 
        item.size === size && 
        item.color === color
      );

      if (existingItem) {
        // Update quantity
        await updateCartItemQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: currentUser.uid,
            product_id: product.id,
            quantity: 1,
            size,
            color
          });

        if (error) {
          console.error('Error adding to cart:', error);
          toast.error('Failed to add item to cart');
          return;
        }

        toast.success('Added to cart');
        await loadCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) {
        console.error('Error removing from cart:', error);
        toast.error('Failed to remove item from cart');
        return;
      }

      toast.success('Item removed from cart');
      await loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  // Update cart item quantity
  const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId);

      if (error) {
        console.error('Error updating cart quantity:', error);
        toast.error('Failed to update quantity');
        return;
      }

      await loadCart();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', currentUser.uid);

      if (error) {
        console.error('Error clearing cart:', error);
        toast.error('Failed to clear cart');
        return;
      }

      toast.success('Cart cleared');
      await loadCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Add item to wishlist
  const addToWishlist = async (product: Product) => {
    if (!currentUser) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }

    try {
      const { error } = await supabase
        .from('wishlist')
        .insert({
          user_id: currentUser.uid,
          product_id: product.id
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('Item already in wishlist');
        } else {
          console.error('Error adding to wishlist:', error);
          toast.error('Failed to add to wishlist');
        }
        return;
      }

      toast.success('Added to wishlist');
      await loadWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId: string) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', currentUser.uid)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from wishlist:', error);
        toast.error('Failed to remove from wishlist');
        return;
      }

      toast.success('Removed from wishlist');
      await loadWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product_id === productId);
  };

  // Check if product is in cart
  const isInCart = (productId: string) => {
    return cart.some(item => item.product_id === productId);
  };

  // Calculate total price
  const total = cart.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + (price * item.quantity);
  }, 0);

  // Calculate total items count
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Load data when user changes or component mounts
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadCart();
      loadWishlist();
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [currentUser]);

  const value: StoreContextType = {
    products,
    cart,
    wishlist,
    loading,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
    total,
    cartItemsCount,
    loadProducts,
    loadCart,
    loadWishlist,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
