import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// import { useOutsideClick } from "@/customHooks/useOutsideClick"
import { useRouter } from 'next/router';
import { formLink } from '@/data/data';

const Sidebar = ({ openNav, setOpenNav }) => {
  const [openClass, setOpenClass] = useState(false);

  const handleClickOutside = () => {
    setOpenClass(false);
  };
  //   const ref = useOutsideClick(handleClickOutside)

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      setOpenNav(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.25 }}
      className={`absolute flex top-0 left-0 items-center justify-center w-[100vw] h-[100vh] bg-black z-[100]  `}
    >
      <div
        className="absolute left-10 top-10 cursor-pointer"
        onClick={() => {
          setOpenNav(false);
        }}
      >
        <Image
          alt="closebtn"
          width={30}
          height={20}
          src="/assets/icons/close-white.png"
        />
      </div>
      <div className="relative flex flex-col text-white">
        <div className="flex justify-center items-center mb-20">
          <Image
            alt="otaku festival logo"
            src="/assets/imgs/logo.png"
            width={250}
            height={250}
            priority
            unoptimized
          />
        </div>
        <div className="relative flex flex-col items-center text-base justify-center ">
          <Link
            href="/"
            className="w-[15rem] flex justify-center items-center h-[3rem] border-white py-2"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="w-[15rem] flex justify-center items-center h-[3rem] border-white py-2"
          >
            About
          </Link>
          <Link
            href="/gallery"
            className="w-[15rem] flex justify-center items-center h-[3rem] border-white py-2"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className="w-[15rem] flex justify-center items-center h-[3rem] border-white py-2 mb-3"
          >
            Contact
          </Link>
          <Link
            href={`${formLink}`}
            target="__blank"
            className="w-[15rem] flex justify-center items-center h-[3rem] bg-[#B7002B] px-7 py-2 duration-300 hover:bg-white hover:text-[#B7002B] rounded-lg"
          >
            Buy Ticket
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
