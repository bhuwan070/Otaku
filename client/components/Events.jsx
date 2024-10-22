import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import { events } from "@/data/data";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AnimatePresence, motion } from 'framer-motion';

const Events = () => {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  const loader = [1, 2, 3, 4, 5, 6];

  const getEvents = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event`
      ).then((r) => {
        return r.json();
      });
      const result = data.filter((item) => item.isCompleted === false);
      setEvents(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // const itemVariants = {
  //   initial: { x: -100, opacity: 0 },
  //   animate: { x: 0, opacity: 1 },
  // };

  // const containerVariants = {
  //   animate: {
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  return (
    <>
      <section
        className="relative flex flex-col w-[100%] min-h-[100vh] h-max text-center items-center bg-[#F3F4F6]"
        id="events"
      >
        <div className="absolute w-full h-full  ">
          <div className="absolute w-full h-full bg-[#ffffffe7] "></div>
          <Image
            alt="event"
            src="/assets/imgs/eventbackground.jpg"
            width={100}
            height={100}
            className="w-max h-full object-cover"
            unoptimized
            priority
          />
        </div>
        <div className=" text-center mt-4 z-20 ">
          <h3 className="font-extrabold text-[40px]  text-center text-[black] border-[#B7002B] border-b-2 mb-12 mx-auto">
            Major <span className="text-[#B7002B]">Events</span>
          </h3>
        </div>

        {/* <div className="w-[80%] min-h-[60vh] h-max border-2 border-red-500 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 xl:gap-[5%] "> */}
        <motion.div className="w-[80%] min-h-[60vh] h-max flex flex-wrap justify-left ">
          <AnimatePresence>
            {loading ? (
              loader.map((item, i) => (
                <div key={i} className="w-full md:w-[45%] lg:w-[30%] mb-10 ">
                  <Skeleton className="h-[24rem]" />
                  {/* <Skeleton className="h-[3rem]" width={"70%"} /> */}
                </div>
              ))
            ) : (
              <>
                {events &&
                  events?.map((item, id) => (
                    <motion.div
                      // drag
                      // dragConstraints={{
                      //   left: -0,
                      //   right: 0,
                      //   top: -0,
                      //   bottom: 0,
                      // }}
                      key={id}
                      className=" w-full md:w-[45%] lg:w-[30%] mb-10 z-40 md:mr-[5%] lg:mr-[3%]"
                    >
                      <div>
                        <div className="group relative flex flex-col gap-3 border-gray-300 w-[95%] h-max object-cover duration-500 overflow-hidden border-2 rounded-xl shadow-xl">
                          <div className="w-[100%] h-max bg-black rounded-lg ">
                            <Link href={`/event/${item._id}`}>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${item.poster}`}
                                width={20}
                                height={20}
                                alt={item ? item.name : 'Event Card'}
                                className="w-full h-full md:object-contain lg:object-cover rounded-lg "
                                unoptimized
                                priority
                              />
                            </Link>
                          </div>
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, y: 200 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 0.5,
                              }}
                              className="group-hover:hidden w-full h-full font-bold hidden md:group-hover:flex flex-col absolute bg-gradient-to-t from-[#05050583] to-transparent text-white "
                            >
                              <div className="w-[100%] h-full flex justify-center items-end mb-4">
                                <Link
                                  href={`/event/${item._id}`}
                                  className="w-max h-max flex justify-center items-end"
                                >
                                  <motion.div className="flex px-2 py-2 justify-center items-center  duration-300 border-2 hover:border-[#BB002D] bg-[#BB002D] cursor-pointer">
                                    <svg
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      className="animate-bounce mr-2"
                                    >
                                      <path
                                        d="M7 14l7-6.5L7 1M1.5 14l7-6.5-7-6.5"
                                        stroke="#f7f7f7"
                                        strokeLinecap="square"
                                      ></path>
                                    </svg>
                                    <p className="text-[#ffffff] ">
                                      Click to see more
                                    </p>
                                  </motion.div>
                                </Link>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
};

export default Events;
