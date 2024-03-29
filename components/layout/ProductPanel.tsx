'use client';

import { ProductPanelProps, ProductVariantsProps } from '@/@types/props';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import ReviewStars from '../UI/ReviewStars';
import Border from './Border';
import Button from '../actions/Button';
import { Listbox, Transition } from '@headlessui/react';
import { HiChevronUpDown, HiOutlineCheckBadge } from 'react-icons/hi2';
import Accordion from '../actions/Accordion';
import { CartContext } from '@/context/CartContext';
import { CartInterface, ProductVariant } from '@/@types/shop';

/** Implements Listbox from '@headlessui/react'
 *
 * Uses listbox conditionally when a product has more than one variant
 *
 * https://headlessui.com/react/listbox
 */
const ProductPanel: React.FC<ProductPanelProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants
      ? product.variants[0]
      : { id: product.variants![0].id, title: product.variants![0].title }
  );
  const [amountInCart, setAmountInCart] = useState(0);
  const { checkout, addLineItem, updateLineItem } = useContext(
    CartContext
  ) as CartInterface;

  const onUpdateVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  useEffect(() => {
    if (checkout) {
      const cartInstance = checkout.lineItems.find(
        (item) => item.title === product.title
      );
      if (cartInstance) {
        setAmountInCart(cartInstance.quantity);
      } else {
        setAmountInCart(0);
      }
    }
  }, [checkout, product]);

  return (
    <div className='flex flex-col gap-8 xl:max-w-[32rem]'>
      <div>
        <h2 className='text-4xl font-bold'>{product.title}</h2>
        <ReviewStars reviews={product.reviews} styles='!text-2xl' showCount />
      </div>
      <ProductVariants
        variants={product.variants}
        selectedVariant={selectedVariant}
        onUpdateVariant={onUpdateVariant}
      />
      <h4 className='text-2xl font-bold tracking-widest'>
        ${product.minPrice}
      </h4>
      <div className='-my-4'>
        <Border />
      </div>
      <div className='flex flex-col gap-4 py-4 sticky top-0 z-10 bg-base-100 outline-none'>
        <div className='flex gap-4'>
          <div className='grow w-full'>
            {amountInCart > 0 ? (
              <div className='flex gap-4'>
                <div
                  onClick={() =>
                    updateLineItem(checkout!.id, [
                      {
                        id: checkout!.lineItems.find(
                          (item) => item.title === product.title
                        )!.id,
                        variantId: product.variants![0].id,
                        quantity:
                          checkout!.lineItems.find(
                            (item) => item.title === product.title
                          )!.quantity - 1
                      }
                    ])
                  }
                >
                  <Button styles='btn-base-200 !w-16 h-16 font-bold text-lg hover:bg-base-200 hover:border-0 hover:brightness-95 border-0'>
                    {'-'}
                  </Button>
                </div>
                <div className='grow'>
                  <Button styles='btn-primary !w-full h-16 font-bold text-lg pointer-events-none'>
                    {amountInCart} IN CART
                  </Button>
                </div>
                <div
                  onClick={() =>
                    addLineItem(checkout!.id, product.variants![0].id, 1)
                  }
                >
                  <Button styles='btn-base-200 !w-16 h-16 font-bold text-lg hover:bg-base-200 hover:border-0 hover:brightness-95 border-0'>
                    {'+'}
                  </Button>
                </div>
              </div>
            ) : product.status === 'DRAFT' ? (
              <Button styles={`btn-disabled !w-full h-16 font-bold text-lg`}>
                OUT OF STOCK
              </Button>
            ) : (
                  <div
                onClick={() => addLineItem(checkout!.id, selectedVariant.id, 1)}
              >
                <Button styles={`btn-primary !w-full h-16 font-bold text-lg`}>
                  ADD TO CART
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='-my-4'>
        <Border />
      </div>
      <div>
        <Accordion title='DESCRIPTION' defaultExpanded>
          <p>{product.description}</p>
        </Accordion>
      </div>
      {product.includes && product.includes.length > 0 && (
        <>
          <div className='-my-4'>
            <Border />
          </div>
          <Accordion title='INCLUDED ITEMS'>
            <ul className='custom-scroll list-disc pl-5 overflow-y-auto text-lg'>
              {product.includes.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          </Accordion>
        </>
      )}
      {product.specs && product.specs.length > 0 && (
        <>
          <div className='-my-4'>
            <Border />
          </div>
          <Accordion title='SPECS'>
            <ul className='custom-scroll list-disc pl-5 overflow-y-auto text-lg'>
              {product.specs.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          </Accordion>
        </>
      )}
    </div>
  );
};

const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  selectedVariant,
  onUpdateVariant
}) => {
  if (!variants || variants.length <= 1) return null;

  return (
    <>
      <div className='-my-4'>
        <Border />
      </div>
      <p className='uppercase font-semibold text-xl'>SELECT OPTION</p>
      <Listbox value={selectedVariant} onChange={onUpdateVariant}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full rounded-md bg-base-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-lg'>
            <span className='block truncate'>{selectedVariant.title}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <HiChevronUpDown
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg z-50'>
              {variants.map((variant: any) => (
                <Listbox.Option
                  key={variant.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={variant}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {variant.title}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                          <HiOutlineCheckBadge
                            className='h-5 w-5'
                            aria-hidden='true'
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default ProductPanel;
