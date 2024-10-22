import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// import { partners } from '@/data/data';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const loader = [1, 2, 3];

  const getPartners = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/partner`
      ).then((r) => {
        return r.json();
      });
      setPartners(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);
  return (
    <>
      <section
        id="partners"
        className="relative flex flex-col w-full h-max text-center justify-around items-center bg-[#ffffff] "
      >
        <div className=" text-center mb-4 mt-4 ">
          <h3 className="font-extrabold text-[40px]  text-center text-[black] border-[#B7002B] border-b-2">
            Our <span className="text-[#B7002B]">Partners</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-center items-center mb-8 ">
          {partners?.map((item, i) => (
            <div
              className="h-max p-4 flex justify-center bg-[#e7e4e4f] "
              key={item._id}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${item.image}`}
                width={200}
                height={200}
                alt={item ? item.name : 'Partners'}
                unoptimized
                priority
                className="h-[12rem] md:h-[16rem] lg:h-[20rem] w-[12rem] md:w-[16rem] lg:w-[20rem] object-cover z-[50] shadow-lg rounded-xl"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Partners;
