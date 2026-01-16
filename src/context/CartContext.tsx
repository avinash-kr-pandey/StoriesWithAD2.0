"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

// Use your existing Product and CartItem interfaces
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  description: string;
  features: string[];
  dimensions: string;
  material: string;
  warranty: string;
  inStock: boolean;
  stockQuantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Cart State interface
interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  discount: number;
  subtotal: number;
}

// Cart Action types
type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "INCREMENT_QUANTITY"; payload: number }
  | { type: "DECREMENT_QUANTITY"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

// Cart Context Type
interface CartContextType {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  isInCart: (productId: number) => boolean;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Calculate totals function
const calculateTotals = (
  items: CartItem[]
): { subtotal: number; discount: number; total: number } => {
  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0
  );

  const discount = items.reduce((sum: number, item: CartItem) => {
    if (item.product.originalPrice) {
      return (
        sum + (item.product.originalPrice - item.product.price) * item.quantity
      );
    }
    return sum;
  }, 0);

  const total = subtotal;

  return { subtotal, discount, total };
};

// Calculate item count function
const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
};

// Cart Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item: CartItem) => item.product.id === action.payload.id
      );

      let updatedItems: CartItem[];

      if (existingItem) {
        // If item exists, increment quantity but don't exceed stock
        const newQuantity = Math.min(
          existingItem.quantity + 1,
          action.payload.stockQuantity
        );

        updatedItems = state.items.map((item: CartItem) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // If item doesn't exist, add new item with quantity 1
        updatedItems = [
          ...state.items,
          { product: action.payload, quantity: 1 },
        ];
      }

      const totals = calculateTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        ...totals,
        itemCount: calculateItemCount(updatedItems),
      };
    }

    case "REMOVE_FROM_CART": {
      const filteredItems = state.items.filter(
        (item: CartItem) => item.product.id !== action.payload
      );
      const totals = calculateTotals(filteredItems);

      return {
        ...state,
        items: filteredItems,
        ...totals,
        itemCount: calculateItemCount(filteredItems),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, {
          type: "REMOVE_FROM_CART",
          payload: productId,
        });
      }

      // Find the product to check stock quantity
      const product = state.items.find(
        (item) => item.product.id === productId
      )?.product;
      const maxQuantity = product
        ? Math.min(quantity, product.stockQuantity)
        : quantity;

      const updatedItems = state.items.map((item: CartItem) =>
        item.product.id === productId
          ? { ...item, quantity: maxQuantity }
          : item
      );

      const totals = calculateTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        ...totals,
        itemCount: calculateItemCount(updatedItems),
      };
    }

    case "INCREMENT_QUANTITY": {
      const updatedItems = state.items.map((item: CartItem) => {
        if (item.product.id === action.payload) {
          const newQuantity = Math.min(
            item.quantity + 1,
            item.product.stockQuantity
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      const totals = calculateTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        ...totals,
        itemCount: calculateItemCount(updatedItems),
      };
    }

    case "DECREMENT_QUANTITY": {
      const updatedItems = state.items
        .map((item: CartItem) => {
          if (item.product.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item: CartItem) => item.quantity > 0); // Remove items with quantity 0

      const totals = calculateTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        ...totals,
        itemCount: calculateItemCount(updatedItems),
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        itemCount: 0,
        discount: 0,
        subtotal: 0,
      };

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};

// Initial State
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  discount: 0,
  subtotal: 0,
};

// Local Storage Utilities
const cartStorage = {
  saveCart: (cart: CartState) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("furniture-cart", JSON.stringify(cart));
    }
  },

  loadCart: (): CartState => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("furniture-cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error("Error loading cart from localStorage:", error);
        }
      }
    }
    return initialState;
  },

  clearCartStorage: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("furniture-cart");
    }
  },
};

// Cart Provider Component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = cartStorage.loadCart();
    if (savedCart.items.length > 0) {
      dispatch({ type: "LOAD_CART", payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    cartStorage.saveCart(cart);
  }, [cart]);

  // Add product to cart
  const addToCart = (product: Product) => {
    if (!product.inStock) {
      alert("This product is out of stock!");
      return;
    }

    if (product.stockQuantity <= 0) {
      alert("This product is out of stock!");
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  // Update specific quantity
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  // Increment quantity by 1
  const incrementQuantity = (productId: number) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: productId });
  };

  // Decrement quantity by 1
  const decrementQuantity = (productId: number) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: productId });
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Get quantity of specific item
  const getItemQuantity = (productId: number): number => {
    const item = cart.items.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId: number): boolean => {
    return cart.items.some((item) => item.product.id === productId);
  };

  // Get cart total
  const getCartTotal = (): number => {
    return cart.total;
  };

  // Get cart item count
  const getCartItemCount = (): number => {
    return cart.itemCount;
  };

  // Context value
  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
