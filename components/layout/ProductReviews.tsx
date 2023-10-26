'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ProductReviewsProps, ReviewProps } from '@/@types/props';
import Border from './Border';
import ReviewStars from '../UI/ReviewStars';
import { getReviewsByProductHandle } from '@/app/api/requests';
import Link from 'next/link';

const ProductReviews: React.FC<ProductReviewsProps> = ({ handle, reviews }) => {
  const [reviewsList, setReviewsList] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 3
  });
  const [totalPages, setTotalPages] = useState(
    Math.ceil(reviews.reviewCount / pagination.perPage)
  );

  const handleChange = (value: string) => {
    if (+value > 10 || +value < 1) return;
    setPagination((prev) => ({
      ...prev,
      perPage: +value
    }))
  }

  useEffect(() => {
    (async () => {
      const response = await getReviewsByProductHandle(
        handle,
        pagination.currentPage,
        pagination.perPage
      );
      if (response) {
        setReviewsList(response);
      }
    })();
    setTotalPages(Math.ceil(reviews.reviewCount / pagination.perPage));
  }, [handle, reviews.reviewCount, pagination.currentPage, pagination.perPage]);

  return (
    <section className='flex flex-col text-primary py-12'>
      <Border />
      <div className='flex flex-col py-12 gap-2'>
        <p className='font-semibold text-4xl'>Product Reviews</p>
        <div className='flex gap-4 items-baseline justify-left'>
          <p className='font-bold text-2xl'>{reviews.rating.toFixed(1)}</p>
          <ReviewStars reviews={reviews} styles='!text-2xl' />
        </div>
      </div>
      <Border />
      <div className='py-12'>
        <p className='font-semibold opacity-75'>{`${reviews.reviewCount} Reviews`}</p>
      </div>
      {reviewsList.length > 0 ? (
        reviewsList.map((review: any) => (
          <Review key={review.id} review={review} />
        ))
      ) : (
        <p className='mb-6'>Be the first to leave a review!</p>
      )}
      <Border />
      <div className='flex justify-between py-4 gap-4 items-center'>
        <div></div>
        <div className='flex items-center gap-4'>
          {Array.from(new Array(totalPages < 10 ? totalPages : 10)).map(
            (_, i) => (
              <div
                key={i}
                className={
                  i + 1 === pagination.currentPage
                    ? 'font-bold text-blue-600 pointer-events-none'
                    : 'cursor-pointer hover:font-bold'
                }
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: i + 1
                  }))
                }
              >
                {i + 1}
              </div>
            )
          )}
        </div>
        <div className='flex items-center gap-4'>
          <p>Reviews Per Page:</p>
          <input
            className='bg-base-200 px-4 py-1 w-12'
            onChange={(e) => handleChange(e.target.value)}
            value={pagination.perPage}
          ></input>
        </div>
      </div>
      <Border />
    </section>
  );
};

export default ProductReviews;

export const Review: React.FC<ReviewProps> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedBody = review.body.slice(0, 384) + '...';
  const reviewBodyRef = useRef<HTMLParagraphElement>(null);

  return (
    <div key={review.id} className='pb-12'>
      <div className='flex gap-4'>
        <div className='avatar'>
          <div className='w-16 rounded-full bg-secondary relative'>
            <p className='absolute left-6 top-4 text-base-100 font-bold text-xl'>
              {review.reviewer.name[0].toUpperCase()}
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <p className='font-semibold'>{review.reviewer.name}</p>
          <ReviewStars
            reviews={{ rating: review.rating, reviewCount: 1 }}
            styles='!text-2xl'
          />
        </div>
      </div>
      <div className='mt-4'>
        <p className='font-semibold text-lg'>{review.title}</p>
        <p className='text-sm'>
          {new Date(review.created_at).toLocaleDateString()}
        </p>
        <p ref={reviewBodyRef} className='mt-4'>
          {isExpanded ? review.body : truncatedBody}
        </p>
      </div>
      <div>
        {!isExpanded ? (
          <p
            className='text-blue-700 font-semibold mt-4 cursor-pointer'
            onClick={() => setIsExpanded(true)}
          >
            Read More
          </p>
        ) : (
          <p
            className='text-blue-700 font-semibold mt-4 cursor-pointer'
            onClick={() => setIsExpanded(false)}
          >
            Show Less
          </p>
        )}
      </div>
    </div>
  );
};