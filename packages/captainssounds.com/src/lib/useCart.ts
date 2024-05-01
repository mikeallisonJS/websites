import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Product } from '@prisma/client'

type CartStore = {
  cart: Array<{ id: string; quantity: number }>
  products: Record<string, Product>
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
}
export const useCart = create(
  persist<CartStore>(
    (set) => ({
      cart: [],
      products: {},
      addToCart: (id: string) =>
        set((state) =>
          state.cart.findIndex((item) => item.id === id) === -1
            ? { cart: [...state.cart, { id, quantity: 1 }] }
            : {
                cart: state.cart.map((item) =>
                  item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              }
        ),
      removeFromCart: (id: string) =>
        set((state) => {
          const index = state.cart.findIndex((item) => item.id === id)
          if (index === -1) return state
          const newCart = [...state.cart]
          newCart[index].quantity -= 1
          if (newCart[index].quantity === 0) newCart.splice(index, 1)
          return { cart: newCart }
        }),
      setProducts: (products: Product[]) => {
        const productsMap = products.reduce(
          (acc, product) => ({ ...acc, [product.id]: product }),
          {}
        )
        set({ products: productsMap })
      }
    }),
    {
      name: 'captainssounds-cart', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ cart: state.cart }) // (optional) only persist the 'cart' slice
    }
  )
)
