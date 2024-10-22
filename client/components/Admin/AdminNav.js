import Image from 'next/image';
import React from 'react';

const AdminNav = () => {
  return (
    <header className="z-40 items-center w-full h-16">
      <div
        className={`relative z-20 flex flex-col justify-center h-full px-3 flex-center`}
      >
        <div className="relative flex items-center w-full h-full pl-1 py-9 lg:max-w-68 sm:pr-2 sm:ml-0">
          <h3 className="text-[40px] font-extrabold mx-auto text-[#BB002D]">
            Admin Panel
          </h3>
        </div>
      </div>
    </header>
  );
};

export default AdminNav;
