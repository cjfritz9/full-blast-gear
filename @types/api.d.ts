interface HeroFields {
  key: 'media';
  value: string;
  reference: {
    sources: {
      url: string;
    }[];
  };
}

interface HomeMetaObjectFields {
  key: string;
  value: string;
  reference: null | MediaImageReference;
}

export interface ShopifyImage {
  url: string;
  altText: string;
}

export interface Product {
  title: string;
  handle: string;
  description: string;
  tags?: string[];
  variants: {
    nodes: { id: string; title: string }[];
  };
  includes?: {
    value: string;
  };
  specs?: {
    value: string;
  };
  images: {
    nodes: ShopifyImage[];
  };
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
      currencyCode: 'USD';
    };
  };
  metafields: {
    nodes: {
      key: 'rating' | 'rating_count';
      value: string;
    }[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface QueryResult {
  title: string;
  handle: string;
  image: string;
}

export interface MediaImageReference {
  image: ShopifyImage;
}

export interface MetaObjectReference {}

export interface HomeContentResponse {
  body: {
    data: {
      metaobjectByHandle: {
        fields: HomeMetaObjectFields[];
      };
    };
  };
}

export interface AboutContentResponse extends HomeContentResponse {
  body: {
    data: {
      metaobjectByHandle: {
        fields: any[];
      };
    };
  };
}

export interface BlogsLayoutContentResponse {
  body: {
    data: {
      metaobjectByHandle: {
        fields: {
          key: string;
          value: string;
          reference: {
            image: ShopifyImage;
          } | null;
        }[];
      };
    };
  };
}

export interface BlogsPageContentResponse {
  body: {
    data: {
      metaobjects: {
        nodes: {
          handle: string;
          title: {
            value: string;
          };
          image: {
            reference: {
              image: ShopifyImage;
            };
          };
        }[];
      };
    };
  };
}

export interface BlogPageContentResponse {
  body: {
    data: {
      metaobjectByHandle: {
        fields: {
          key: string;
          value: string;
          reference: {
            image: ShopifyImage;
          } | null;
        }[];
      };
    };
  };
}

export interface ContactPageContentResponse {
  body: {
    data: {
      metaobjectByHandle: {
        fields: {
          key: string;
          value: string;
          reference: {
            image: ShopifyImage;
          } | null;
        }[];
      };
    };
  };
}

export interface LinkCard {
  title: string;
  image: ShopifyImage;
}

export interface ProductsResponse {
  body: {
    data: {
      products: {
        nodes: Product[];
        pageInfo: PageInfo;
      };
    };
  };
}

export interface ProductByHandleResponse {
  body: {
    data: {
      productByHandle: Product;
    };
  };
}

export interface ProductsByQueryResponse {
  body: {
    data: {
      products: {
        nodes: {
          title: string;
          handle: string;
          images: {
            nodes: ShopifyImage[];
          };
        }[];
      };
    };
  };
}

export interface FormattedProduct {
  title: string;
  handle: string;
  description: string;
  tags?: string[];
  images: { url: string; altText: string }[];
  minPrice: string;
  reviews: {
    rating: number;
    reviewCount: number;
  };
  variants?: {
    id: string;
    title: string;
  }[];
  includes?: string[];
  specs?: string[];
}

export interface FormattedProductResponse {
  pageInfo: PageInfo;
  products: FormattedProduct[];
}
