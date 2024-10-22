import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Organizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const loader = [1, 2, 3];

  const getOrganizers = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/organizer`
      ).then((r) => {
        return r.json();
      });
      setOrganizers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizers();
  }, []);
  return (
    <>
      <section
        id="organizers"
        className="relative flex flex-col w-full h-max text-center justify-around items-center bg-[#000000] mb-[2px] border-t-2 border-b-2 border-white"
      >
        <div className=" text-center mb-4 mt-4 ">
          <h3 className="font-extrabold text-[40px]  text-center text-[#B7002B] border-[#B7002B] border-b-2">
            Organizers
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-3 ml-4 mr-4 mb-10 gap-5 md:gap-20 ">
          {organizers?.map((item, i) => (
            <div
              className="h-[8rem] md:h-[14rem] bg-white rounded-lg "
              key={item._id}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${item.image}`}
                width={20}
                height={20}
                alt={item ? item.name : 'Organizers'}
                unoptimized
                priority
                className="rounded-lg border-gray-300 duration-300 mx-auto w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Organizers;
