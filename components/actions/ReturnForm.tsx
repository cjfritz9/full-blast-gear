'use client';

import { ReturnFormFields } from '@/@types/shop';
import { postCaptchaResult, postMail } from '@/app/api/requests';
import { useReCaptcha } from 'next-recaptcha-v3';
import Script from 'next/script';
import React, { ChangeEvent, useCallback, useState } from 'react';

const formFields: ReturnFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  orderNumber: '',
  message: ''
};

const ReturnForm: React.FC = () => {
  const [fields, setFields] = useState<ReturnFormFields>(formFields);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { executeRecaptcha } = useReCaptcha();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationResponse = validateForm(fields);

      if (!validationResponse.isValid) {
        setError(validationResponse.message);
        return;
      }
      setIsSubmitting(true);

      const token = await executeRecaptcha('form_submit');

      const captchaResult = await postCaptchaResult(token);

      const mailResult = await postMail({
        subject: 'New Product Return Request - Full Blast USA',
        ...fields
      });

      setIsSubmitting(false);

      if (!captchaResult.success) {
        setError(
          '❌ reCAPTCHA error: use the email link beneath the map to contact us'
        );
        return;
      }

      if (captchaResult.score < 0.5) {
        setError('reCAPTCHA validation failed - try again');
        return;
      }

      if (!mailResult || mailResult.error) {
        setError(
          '❌ Mail error: We had an issue sending your message - please send your request to: support@fullblastgear.com'
        );
        return;
      } else {
        setSuccess('✔️ Your message was sent, we will reply to you ASAP');
        resetForm();
      }
    },
    [executeRecaptcha, fields]
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetError = () => {
    setError('');
  };

  const resetForm = () => {
    setFields(formFields);
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <form
      className='w-full'
      onSubmit={(e) => handleSubmit(e)}
      data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
      data-callback='onSubmit'
      data-action='submit'
    >
      <div className='form-control'>
        <div className='flex-col gap-8'>
          <h3 className='text-3xl'>Return Form</h3>
          <div className='flex flex-col xl:flex-row xl:gap-8'>
            <div className='flex flex-col w-full'>
              <label className='label'>
                <span className='label-text'>First Name</span>
              </label>
              <input
                type='text'
                name='firstName'
                value={fields.firstName}
                className='input input-bordered w-full'
                onChange={handleChange}
                onFocus={handleResetError}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label className='label'>
                <span className='label-text'>Last Name</span>
              </label>
              <input
                type='text'
                name='lastName'
                value={fields.lastName}
                className='input input-bordered w-full'
                onChange={handleChange}
                onFocus={handleResetError}
              />
            </div>
          </div>
          <div className='flex flex-col xl:flex-row xl:gap-8'>
            <div className='flex flex-col w-full'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='text'
                name='email'
                value={fields.email}
                className='input input-bordered w-full'
                onChange={handleChange}
                onFocus={handleResetError}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label className='label'>
                <span className='label-text'>Order Number</span>
              </label>
              <input
                type='text'
                name='orderNumber'
                value={fields.orderNumber}
                className='input input-bordered w-full'
                onChange={handleChange}
                onFocus={handleResetError}
              />
            </div>
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Message</span>
            </label>
            <textarea
              name='message'
              value={fields.message}
              className='textarea textarea-bordered h-24 lg:h-64'
              onChange={handleChange}
              onFocus={handleResetError}
            />
          </div>
          <div className='h-6'>{error || success}</div>
        </div>
        <button
          className='btn btn-primary w-fit mt-2 min-w-[90px]'
          type='submit'
        >
          {isSubmitting ? (
            <div className='loading loading-spinner loading-md' />
          ) : (
            'SUBMIT'
          )}
        </button>
      </div>
    </form>
  );
};

const validateForm = (fields: ReturnFormFields) => {
  for (const field in fields) {
    if (field === 'email') {
      if (!fields[field].includes('@') || !fields[field].includes('.')) {
        return {
          isValid: false,
          message: '❌ Please enter a valid Email Address'
        };
      }
    }
    if (fields[field as keyof typeof fields].length === 0) {
      return {
        isValid: false,
        message: '❌ Fill out all required fields before submitting'
      };
    }
  }

  return {
    isValid: true,
    message: ''
  };
};

export default ReturnForm;
