import React from 'react';

const Announcement: React.FC = () => {
  return (
    <div
      className='w-full px-44 py-4 bg-base-300 z-[16] text-white hidden lg:flex justify-center
       align-center font-normal top-0'
    >
      <span className='flex gap-1'>
        <p>MADE IN THE USA | Free Shipping On Orders Over $100 To The Continental USA* | Minimum 2
Year Warranty*</p>
      </span>
    </div>
  );
};

export default Announcement;
