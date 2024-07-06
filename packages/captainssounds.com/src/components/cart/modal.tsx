'use client'

import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

import { createUrl } from '../../lib/utils'
import Price from '../price'

import CloseCart from './closeCart'
import { DeleteItemButton } from './deleteItemButton'
import { EditItemQuantityButton } from './editItemQuantityButton'
import OpenCart from './openCart'

export default function CartModal() {
  const {
    cartDetails,
    cartCount,
    handleCartClick,
    handleCloseCart,
    redirectToCheckout,
    shouldDisplayCart,
    totalPrice
  } = useShoppingCart()

  const quantityRef = useRef(cartCount)

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cartCount !== quantityRef.current) {
      if (!shouldDisplayCart) {
        handleCartClick()
      }
      quantityRef.current = cartCount
    }
  }, [shouldDisplayCart, cartCount, quantityRef, handleCartClick])

  async function checkout(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (cartCount !== undefined && cartCount > 0) {
      // setStatus('loading')
      try {
        const res = await fetch('/api/session', {
          method: 'POST',
          body: JSON.stringify(cartDetails)
        })
        const data = await res.json()
        const result = await redirectToCheckout(data.sessionId)
        if (result?.error) {
          console.error(result)
          // setStatus('redirect-error')
        }
      } catch (error) {
        console.error(error)
        // setStatus('redirect-error')
      }
    } else {
      // setStatus('no-items')
    }
  }

  return (
    <>
      <button type="button" aria-label="Open cart" onClick={handleCartClick}>
        <OpenCart quantity={cartCount} />
      </button>
      <Transition show={shouldDisplayCart}>
        <Dialog onClose={handleCloseCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>

                <button
                  type="button"
                  aria-label="Close cart"
                  onClick={handleCloseCart}
                >
                  <CloseCart />
                </button>
              </div>

              {cartCount === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {Object.values(cartDetails ?? {}).map((item, i) => {
                      const params: Record<string, string> = {}
                      const merchandiseUrl = createUrl(
                        `/product/${item.id}`,
                        new URLSearchParams(params)
                      )

                      return (
                        <li
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton id={item.id} />
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={handleCloseCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={item.name}
                                  src={item.image ?? ''}
                                />
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">
                                  {item.name}
                                </span>
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={item.price.toString()}
                                currencyCode="USD"
                                donation={item.donationware}
                              />
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                <EditItemQuantityButton
                                  id={item.id}
                                  type="minus"
                                />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">
                                    {item.quantity}
                                  </span>
                                </p>
                                <EditItemQuantityButton
                                  id={item.id}
                                  type="plus"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={totalPrice?.toString() ?? '0'}
                        currencyCode={'USD'}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={totalPrice?.toString() ?? '0'}
                        currencyCode={'USD'}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={checkout}
                    className="block w-full cursor-pointer rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
