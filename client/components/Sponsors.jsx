import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Sponsors = () => {
  const [sponsers, setSponsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const loader = [1, 2, 3];

  const getSponsers = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/sponser`
      ).then((r) => {
        return r.json();
      });
      setSponsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSponsers();
  }, []);
  console.log(sponsers);

  return (
    <>
      <section
        id="sponsors"
        className="flex flex-col w-[100%] h-max text-center justify-around items-center bg-black text-white  "
      >
        <div className=" text-center mt-4 ">
          <h3 className="font-extrabold text-[40px]  text-center text-[white] border-[#B7002B] border-b-2 mb-10">
            Our <span className="text-[#B7002B]">Sponsors</span>
          </h3>
        </div>
        <div className="flex flex-row mb-16">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            autoplay={{ delay: 2000 }}
            // freeMode={true}
            scrollbar={{ draggable: true }}
            parallax
            // slidesPerView={3}
            breakpoints={{
              360: {
                slidesPerView: 2,
              },
              680: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
            className="flex flex-col h-max w-[90vw] "
          >
            {loading ? (
              <div
                // key={i}
                className="flex h-[80%] w-[100%] justify-between "
              >
                {loader.map((item, i) => (
                  <Skeleton
                    key={i}
                    className=" h-[12rem]"
                    width={'14rem'}
                    baseColor="#8f8c8c"
                    highlightColor="#bbbabaff"
                    borderRadius={'1rem'}
                  />
                ))}
              </div>
            ) : (
              <>
                {sponsers &&
                  sponsers?.map((sponser) => (
                    <SwiperSlide
                      key={sponser._id}
                      className="flex items-center justify-center h-[80%] w-[80%]  "
                    >
                      <div className="flex justify-center ml-4 h-[8rem] md:h-[14rem] g:h-[16rem] bg-white rounded-lg p-4 ">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${sponser.image}`}
                          width={200}
                          height={200}
                          alt={sponser ? sponser.name : 'Sponsers'}
                          className="h-full w-max object-contain z-[50]  "
                          unoptimized
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </>
            )}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Sponsors;
