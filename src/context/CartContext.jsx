import { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newItems;
      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 0
        ),
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 0
        ),
      };
    }

    // 🔥 TAMBAHAN INCREMENT
    case 'INCREMENT': {
      const newItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        items: newItems,
        totalItems: newItems.reduce((s, i) => s + i.quantity, 0),
        totalPrice: newItems.reduce((s, i) => s + i.price * i.quantity, 0),
      };
    }

    // 🔥 TAMBAHAN DECREMENT
    case 'DECREMENT': {
      const newItems = state.items
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0); // hapus kalau 0

      return {
        items: newItems,
        totalItems: newItems.reduce((s, i) => s + i.quantity, 0),
        totalPrice: newItems.reduce((s, i) => s + i.price * i.quantity, 0),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

// Create context
const CartContext = createContext();

// Provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // 🔥 FUNCTION BARU
  const increment = (id) => {
    dispatch({ type: 'INCREMENT', payload: id });
  };

  const decrement = (id) => {
    dispatch({ type: 'DECREMENT', payload: id });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      clearCart,
      increment,
      decrement
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}