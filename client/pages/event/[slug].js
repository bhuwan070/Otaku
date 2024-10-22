import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const EventSlug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [events, setEvents] = useState();
  const [whatsappBox, setWhatsappBox] = useState(true);
  const [loading, setLoading] = useState();
  const [hover, setHover] = useState(false);

  const getEvents = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event/${slug}`
      ).then((r) => {
        return r.json();
      });
      // console.log(data);
      setEvents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (slug) {
      getEvents();
    }
  }, [slug]);

  return (
    <div
      className={`relative flex items-center w-full bg-white text-black min-h-[80vh] mt-20 justify-center mb-10 `}
    >
      <AnimatePresence>
        {whatsappBox && (
          <Link target="_blank" href={`${events?.whatsappUrl}`}>
            <motion.div
              layout
              initial={{ width: '4rem' }}
              whileHover={{ width: '12rem' }}
              className="group w-[4rem] h-[4rem] hover:w-[5rem] fixed right-4 lg:right-0 cursor-pointer hover:rounded-e-none duration-200 rounded-full bg-[#2ecc19] hidden md:flex justify-start items-center "
            >
              <Image
                alt="whatsapp"
                src="/assets/icons/whatsapp.png"
                width={20}
                height={20}
                className=" w-[4rem] h-[4rem] cursor-pointer"
                unoptimized
                priority
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-[8rem] group-hover:flex hidden absolute font-bold text-[1.2rem] ml-[4.4rem] text-white"
              >
                Join group
              </motion.div>
            </motion.div>
          </Link>
        )}
      </AnimatePresence>

      {events && (
        <div className="flex border-2 flex-col items-center justify-center  rounded-lg w-[80%] h-full">
          <div className="flex lg:flex-row flex-col-reverse w-full justify-around mt-10 ">
            <div className="flex flex-col gap-5 mt-10 lg:mt-0 w-full ">
              <h2
                className={`mx-auto font-bold sm:text-[40px] text-xl mb-5 lg:mb-20 `}
              >
                {events?.name}
              </h2>
              <div className="flex flex-col  gap-5 ml-10">
                <div className="flex gap-5 xl:gap-10 items-center  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    {' '}
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />{' '}
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />{' '}
                  </svg>
                  <p className={`md:text-xl text-lg font-medium `}>
                    Registration :{' '}
                    <span
                      className={`${
                        events?.isActive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >{`${events?.isActive ? 'Open' : 'Closed'}`}</span>
                  </p>
                </div>
                <div className="flex gap-5 xl:gap-10 items-center">
                  <svg
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                  >
                    <path
                      d="M.5 7.5l-.354-.354a.5.5 0 000 .708L.5 7.5zm7 7l-.354.354a.5.5 0 00.708 0L7.5 14.5zm7-7l.354.354A.5.5 0 0015 7.5h-.5zm-7-7V0a.5.5 0 00-.354.146L7.5.5zM.146 7.854l7 7 .708-.708-7-7-.708.708zm7.708 7l7-7-.708-.708-7 7 .708.708zM15 7.5v-6h-1v6h1zM13.5 0h-6v1h6V0zM7.146.146l-7 7 .708.708 7-7-.708-.708zM15 1.5A1.5 1.5 0 0013.5 0v1a.5.5 0 01.5.5h1zM10.5 5a.5.5 0 01-.5-.5H9A1.5 1.5 0 0010.5 6V5zm.5-.5a.5.5 0 01-.5.5v1A1.5 1.5 0 0012 4.5h-1zm-.5-.5a.5.5 0 01.5.5h1A1.5 1.5 0 0010.5 3v1zm0-1A1.5 1.5 0 009 4.5h1a.5.5 0 01.5-.5V3z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <p className="md:text-xl text-lg font-medium">
                    Registration Fee :{' '}
                    <span className="font-semibold">NRs. {events?.price}</span>
                  </p>
                </div>
                {/* <div className="flex gap-5 xl:gap-10 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-book"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />{" "}
                  </svg>
                  <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${events?.rulebook}`}
                  >
                    <p className="md:text-xl text-lg font-medium hover:underline">
                      Check Rulebook
                    </p>
                  </Link>
                </div> */}
                <div className="flex gap-5 xl:gap-10 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-whatsapp"
                    viewBox="0 0 16 16"
                  >
                    {' '}
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />{' '}
                  </svg>
                  <Link target="_blank" href={`${events?.whatsappUrl}`}>
                    <p className="md:text-xl text-lg underline md:no-underline font-medium hover:underline">
                      Join our whatsapp group
                    </p>
                  </Link>
                </div>
                <div className="flex gap-5 xl:gap-10 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-menu-app-fill"
                    viewBox="0 0 16 16"
                  >
                    {' '}
                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v2A1.5 1.5 0 0 1 3.5 5h-2A1.5 1.5 0 0 1 0 3.5v-2zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />{' '}
                  </svg>
                  <Link target="_blank" href={`${events?.formUrl}`}>
                    <p className="md:text-xl text-lg underline md:no-underline font-medium hover:underline">
                      Register for the event
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="  lg:w-[80%] flex justify-center ">
              <div className=" w-[80%] h-max flex justify-center  ">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${events?.poster}`}
                  width={500}
                  height={200}
                  alt={events?.name}
                  className="w-full object-cover rounded-xl shadow-xl border-2 border-gray-300 "
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>
          <div className="w-[80%] flex justify-center mt-5 ">
            <Link
              href={`${events?.formUrl}`}
              target="_blank"
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              className=" border-[2px] shadow-xl px-10 h-[64px] relative text-[30px] cursor-pointer border-black text-black hover:text-white mb-4 flex justify-center items-end "
            >
              <AnimatePresence>
                {hover && (
                  <motion.span
                    initial={{ height: 0 }}
                    whileInView={{ height: 62 }}
                    exit={{ height: 0 }}
                    className="w-full bg-black absolute -bottom-0 "
                  ></motion.span>
                )}
              </AnimatePresence>
              <span className="z-10 h-full flex items-center">Register</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSlug;
