import { getCart } from '../../lib/shopify';
import { cookies } from 'next/headers';
import CartModal from './modal';
import { ReactElement } from 'react';

export default async function Cart(): Promise<ReactElement> {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartModal cart={cart} />;
}
