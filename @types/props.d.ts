import { footerLinks, navLinks } from '@/lib/static/links';
import { StaticImageData } from 'next/image';
import React, { PropsWithChildren } from 'react';
import { FormattedProduct, Product, ShopifyImage } from './api';
import { FilterMethods, ProductVariant, SortMethods } from './shop';
import { IconType } from 'react-icons';
import { CheckoutLineItem } from 'shopify-buy';

/**
 * Tailwind CSS style string format
 *
 * DaisyUI component styles can be added here as well
 *
 */
type TailwindCSSStyles = string;

/** Shopify Product Handle */
type ShopifyHandle = string;

export interface ButtonProps extends React.PropsWithChildren {
  styles: TailwindCSSStyles;
  href?: string;
  prefetch?: boolean;
}

export interface BorderProps {
  color?: string;
}

export interface AccordionProps extends React.PropsWithChildren {
  title: string;
  defaultExpanded?: boolean;
}

export interface LogoProps {
  height?: number;
  width?: number;
}

export interface HeroProps {
  title: string;
  image: ShopifyImage | { url: StaticImageData; altText: string };
  subtitle?: string;
  slim?: boolean;
}

/**
 * @type {children} Text content to be rendered aside the image
 *
 * Container Styles for DaisyUI Hero with figure
 *
 * https://daisyui.com/components/hero/#hero-with-figure
 */
export interface ImageWithTextProps extends React.PropsWithChildren {
  imageSrc: StaticImageData | string;
  priority?: boolean;
  styles: TailwindCSSStyles;
  /**
   * OPTIONAL - Reverses the layout
   *
   * [default: image | text]
   *
   * [reversed: text | image]
   */
  alignItems?: string;
  reverse?: boolean;
}

export interface SearchBarProps {
  variant: 'header' | 'drawer';
}

export interface NavLinkProps {
  link: (typeof navLinks)[0];
  styles?: TailwindCSSStyles;
}

/**
 * @type {variants} Icon variants for hover and non hover states
 *
 * variants[0] represents initial state
 *
 * variants[1] represents hover state
 */
export interface NavIconProps {
  variants: [IconType, IconType];
  href?: string;
  styles?: string;
  onClick?: () => void;
}

export interface FooterLinkGroupProps {
  title: string;
  links: typeof footerLinks.companyLinks;
}

export interface SocialMediaIconsProps {
  slim?: boolean;
}

export interface SocialMediaIconProps extends PropsWithChildren {
  link: string;
}

export interface SlideContainerProps extends PropsWithChildren {
  href: string;
}

export interface ProductCardProps {
  priority: boolean;
  title: string;
  handle: ShopifyHandle;
  price: string;
  imageSrc: string;
  imageAlt: string;
  reviews: {
    rating: number;
    reviewCount: number;
  };
}

export interface ProductImagesProps {
  images: ShopifyImage[];
}

export interface ThumbnailImagesProps extends ProductImagesProps {
  onUpdateImage: (index: number) => void;
}

export interface PrimaryImageProps extends ProductImagesProps {
  index: number;
  currentImage: ShopifyImage;
}

/**
 * @type {title} Title to display on the gallery heading
 * @type {subtitle} Short phrase to display beneath the title and link
 * @type {productsTag} Shopify Product Tag to query for
 * @type {length} Number of products to display (Max: 10)
 * @type {link} Link to view more of these kinds of products (optional)
 */
export interface ProductGalleryProps {
  title: string;
  subtitle: string;
  productsTag: string;
  length: number;
  link?: {
    name: string;
    slug: string;
  };
}

export interface ProductPanelProps {
  product: FormattedProduct;
}

export interface ProductVariantsProps {
  variants: ProductVariant[] | undefined;
  selectedVariant: ProductVariant;
  onUpdateVariant: (variant: any) => void;
}

export interface ProductReviews {
  rating: number;
  reviewCount: number;
}

export interface NewReviewModalProps {
  product: FormattedProduct;
  showForm: boolean;
  onToggleReviewForm: () => void;
}

export interface NewReviewFormProps {
  handle: string;
  onClose: () => void;
}

export interface NewReviewRatingProps {
  rating: number;
  onUpdateRating: (rating: number) => void;
}

export interface LineItemProps {
  item: CheckoutLineItem;
}

export interface ReviewStarsProps {
  reviews: ProductReviews;
  styles?: TailwindCSSStyles;
  showCount?: boolean;
}

export interface ProductReviewsProps {
  product: FormattedProduct;
  reviews: ProductReviews;
}

export interface ReviewProps {
  review: {
    id: string;
    reviewer: {
      name: string;
    };
    rating: number;
    title: string;
    body: string;
    created_at: string;
  };
}

export interface ProductMenuProps {
  onUpdateProducts: (
    updatedProducts: FormattedProduct[],
    updatedPageInfo: PageInfo
  ) => void;
  onLoading: (loading: boolean) => void;
}

export interface ProductMenuGroupProps {
  category: string;
  options: string[];
  onMenuSelect:
    | ((option: SortMethods) => Promise<void>)
    | ((option: FilterMethods) => Promise<void>);
}

export interface PaginationBarProps extends ProductMenuProps {
  cursors: [string | null, string | null];
  hasPages: { prev: boolean; next: boolean };
}

export interface PaginationLinkProps extends PropsWithChildren {
  href: string;
}

export interface PageLinkCardsProps {
  slugPrefix: string;
  /** Tailwind CSS text size postfix
   *
   * Appended to "text-"
   */
  showButton: boolean;
  textSize: string;
  cards: {
    title: string;
    image: ShopifyImage;
    slug: string;
  }[];
}

export interface PageLinkCardProps {
  /** Tailwind CSS text size postfix
   *
   * Appended to "text-"
   */
  showButton: boolean;
  textSize: string;
  title: string;
  image: ShopifyImage;
  slug: string;
}

interface AboutSubpageLayoutProps extends PropsWithChildren {
  params: {
    subpage: string;
  };
}

interface AboutSubpageProps {
  params: {
    subpage: string;
  };
}

export interface AboutSubpagesProps {
  subpage: string;
}

export interface ContactLinkProps extends PropsWithChildren {
  href: string;
  tooltip: string;
}

export interface PartnerCardProps {
  name: string;
  handle: string;
  logo: ShopifyImage;
  excerpt: string;
  index: number;
}
