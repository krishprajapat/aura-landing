import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  inStock: boolean;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  sizes: string[];
  colors: string[];
  dateAdded: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartCount: number;
  wishlistCount: number;
}

type StoreAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string; color: string; quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: { product: Product } }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: { productId: string } }
  | { type: 'MOVE_TO_CART'; payload: { wishlistItemId: string; size: string; color: string } }
  | { type: 'MOVE_TO_WISHLIST'; payload: { cartItemId: string } }
  | { type: 'LOAD_STATE'; payload: StoreState };

const initialState: StoreState = {
  cart: [],
  wishlist: [],
  cartCount: 0,
  wishlistCount: 0,
};

// Load state from localStorage
const loadState = (): StoreState => {
  try {
    const savedCart = localStorage.getItem('vecteur_cart');
    const savedWishlist = localStorage.getItem('vecteur_wishlist');
    
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    
    return {
      cart,
      wishlist,
      cartCount: cart.length,
      wishlistCount: wishlist.length,
    };
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return initialState;
  }
};

// Save state to localStorage
const saveState = (state: StoreState) => {
  try {
    localStorage.setItem('vecteur_cart', JSON.stringify(state.cart));
    localStorage.setItem('vecteur_wishlist', JSON.stringify(state.wishlist));
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
  let newState: StoreState;

  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color, quantity = 1 } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        item => item.productId === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += quantity;
        newState = {
          ...state,
          cart: updatedCart,
          cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0),
        };
      } else {
        // Add new item to cart
        const newCartItem: CartItem = {
          id: `cart_${Date.now()}_${Math.random()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          size,
          color,
          quantity,
          inStock: product.inStock,
        };
        const updatedCart = [...state.cart, newCartItem];
        newState = {
          ...state,
          cart: updatedCart,
          cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0),
        };
      }
      break;
    }

    case 'REMOVE_FROM_CART': {
      const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      newState = {
        ...state,
        cart: updatedCart,
        cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0),
      };
      break;
    }

    case 'UPDATE_CART_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const updatedCart = state.cart.filter(item => item.id !== id);
        newState = {
          ...state,
          cart: updatedCart,
          cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0),
        };
      } else {
        const updatedCart = state.cart.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        newState = {
          ...state,
          cart: updatedCart,
          cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0),
        };
      }
      break;
    }

    case 'CLEAR_CART': {
      newState = {
        ...state,
        cart: [],
        cartCount: 0,
      };
      break;
    }

    case 'ADD_TO_WISHLIST': {
      const { product } = action.payload;
      const existingItem = state.wishlist.find(item => item.productId === product.id);
      
      if (!existingItem) {
        const newWishlistItem: WishlistItem = {
          id: `wishlist_${Date.now()}_${Math.random()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          inStock: product.inStock,
          sizes: product.sizes,
          colors: product.colors,
          dateAdded: new Date().toISOString(),
        };
        newState = {
          ...state,
          wishlist: [...state.wishlist, newWishlistItem],
          wishlistCount: state.wishlistCount + 1,
        };
      } else {
        newState = state; // Item already in wishlist
      }
      break;
    }

    case 'REMOVE_FROM_WISHLIST': {
      const updatedWishlist = state.wishlist.filter(item => item.productId !== action.payload.productId);
      newState = {
        ...state,
        wishlist: updatedWishlist,
        wishlistCount: updatedWishlist.length,
      };
      break;
    }

    case 'MOVE_TO_CART': {
      const { wishlistItemId, size, color } = action.payload;
      const wishlistItem = state.wishlist.find(item => item.id === wishlistItemId);
      
      if (wishlistItem) {
        // Convert wishlist item to product format
        const product: Product = {
          id: wishlistItem.productId,
          name: wishlistItem.name,
          price: wishlistItem.price,
          originalPrice: wishlistItem.originalPrice,
          image: wishlistItem.image,
          category: wishlistItem.category,
          description: '',
          sizes: wishlistItem.sizes,
          colors: wishlistItem.colors,
          inStock: wishlistItem.inStock,
        };

        // Add to cart
        const existingCartItemIndex = state.cart.findIndex(
          item => item.productId === wishlistItem.productId && item.size === size && item.color === color
        );

        let updatedCart;
        if (existingCartItemIndex >= 0) {
          updatedCart = [...state.cart];
          updatedCart[existingCartItemIndex].quantity += 1;
        } else {
          const newCartItem: CartItem = {
            id: `cart_${Date.now()}_${Math.random()}`,
            productId: wishlistItem.productId,
            name: wishlistItem.name,
            price: wishlistItem.price,
            originalPrice: wishlistItem.originalPrice,
            image: wishlistItem.image,
            size,
            color,
            quantity: 1,
            inStock: wishlistItem.inStock,
          };
          updatedCart = [...state.cart, newCartItem];
        }

        // Remove from wishlist
        const updatedWishlist = state.wishlist.filter(item => item.id !== wishlistItemId);

        newState = {
          ...state,
          cart: updatedCart,
          wishlist: updatedWishlist,
          cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0),
          wishlistCount: updatedWishlist.length,
        };
      } else {
        newState = state;
      }
      break;
    }

    case 'MOVE_TO_WISHLIST': {
      const { cartItemId } = action.payload;
      const cartItem = state.cart.find(item => item.id === cartItemId);
      
      if (cartItem) {
        // Check if already in wishlist
        const existingWishlistItem = state.wishlist.find(item => item.productId === cartItem.productId);
        
        let updatedWishlist = state.wishlist;
        if (!existingWishlistItem) {
          const newWishlistItem: WishlistItem = {
            id: `wishlist_${Date.now()}_${Math.random()}`,
            productId: cartItem.productId,
            name: cartItem.name,
            price: cartItem.price,
            originalPrice: cartItem.originalPrice,
            image: cartItem.image,
            category: '', // We don't have category in cart item
            inStock: cartItem.inStock,
            sizes: [], // We don't have all sizes in cart item
            colors: [], // We don't have all colors in cart item
            dateAdded: new Date().toISOString(),
          };
          updatedWishlist = [...state.wishlist, newWishlistItem];
        }

        // Remove from cart
        const updatedCart = state.cart.filter(item => item.id !== cartItemId);

        newState = {
          ...state,
          cart: updatedCart,
          wishlist: updatedWishlist,
          cartCount: updatedCart.reduce((total, item) => total + item.quantity, 0),
          wishlistCount: updatedWishlist.length,
        };
      } else {
        newState = state;
      }
      break;
    }

    case 'LOAD_STATE': {
      newState = action.payload;
      break;
    }

    default:
      newState = state;
  }

  // Save to localStorage whenever state changes
  if (newState !== state) {
    saveState(newState);
  }

  return newState;
};

// Context
const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
  // Helper functions
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (wishlistItemId: string, size: string, color: string) => void;
  moveToWishlist: (cartItemId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
} | null>(null);

// Provider
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = loadState();
    dispatch({ type: 'LOAD_STATE', payload: savedState });
  }, []);

  // Helper functions
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, color, quantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: { product } });
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { productId } });
  };

  const moveToCart = (wishlistItemId: string, size: string, color: string) => {
    dispatch({ type: 'MOVE_TO_CART', payload: { wishlistItemId, size, color } });
  };

  const moveToWishlist = (cartItemId: string) => {
    dispatch({ type: 'MOVE_TO_WISHLIST', payload: { cartItemId } });
  };

  const isInWishlist = (productId: string) => {
    return state.wishlist.some(item => item.productId === productId);
  };

  const isInCart = (productId: string) => {
    return state.cart.some(item => item.productId === productId);
  };

  return (
    <StoreContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      moveToCart,
      moveToWishlist,
      isInWishlist,
      isInCart,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
