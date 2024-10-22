import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import useScrollBlock from '@/customHooks/useScrollBlock';
import { formLink } from '@/data/data';

// const formLink =
//   "https://docs.google.com/forms/d/e/1FAIpQLSc8jVaXB6KgCXTkacMAVVn_UbHewY8OVd7MOY-MpwKxWSVdIQ/viewform";

const Navbar = () => {
  const router = useRouter();
  const path = router.pathname;
  const [openNav, setOpenNav] = useState(false);
  const [openClass, setOpenClass] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const [isScrolled, setIsScrolled] = useState(false);
  // console.log(path);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (openNav) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [openNav]);

  const handleNavChange = (e) => {
    // console.log(e.target.value);
  };

  return (
    <div
      className={`text-white font-medium font-sans flex justify-center fixed duration-500 py-4 w-[100vw] z-[100] bg-black
      `}
      // ${
      //   path === "/" && !isScrolled ? "md:bg-transparent" : "bg-black"
      // }
    >
      <AnimatePresence>
        {openNav && <Sidebar openNav={openNav} setOpenNav={setOpenNav} />}
      </AnimatePresence>
      <AnimatePresence>
        <div
          className={`w-[80%] flex justify-between items-center lg:flex-row 
        `}
        >
          <Link
            href="/"
            className="flex title-font font-medium items-center text-white md:mb-0 my-auto"
          >
            <p className="uppercase xl:text-2xl text-lg my-auto text-white flex flex-col items-center">
              <motion.span
                // initial={{ y: -100 }}
                // animate={{ y: 0 }}
                // transition={{
                //   delay: 0.5,
                //   duration: 0.5,
                //   type: "spring",
                //   damping: 10,
                //   stiffness: 100,
                // }}
                className="text-[14px] leading-none"
              >
                Itahari
              </motion.span>
              <span className="leading-none">
                Otaku{' '}
                <span className="text-[#B7002B] leading-none">Festival </span>{' '}
              </span>
            </p>
          </Link>
          <div
            className="flex lg:hidden cursor-pointer"
            onClick={() => {
              setOpenNav(true);
            }}
          >
            <Image
              width={30}
              height={30}
              src={'/assets/icons/menu-white.png'}
              alt="Menu"
            />
          </div>
          <div className="hidden lg:flex items-center">
            <div className=" flex items-center justify-center text-sm">
              <Link
                href="/"
                className={`${
                  path == '/' && 'text-[#B7002B] hover:border-[#B7002B]'
                } hover:border-b-2  mr-8 text-base  `}
              >
                Home
              </Link>
              <Link
                href="/about"
                value="/about"
                className={`${
                  path == '/about' && 'text-[#B7002B] hover:border-[#B7002B]'
                } relative mr-8 text-base hover:border-b-2 `}
              >
                About
              </Link>
              <Link
                href="/gallery"
                value="/gallery"
                className={`${
                  path.includes('/gallery') &&
                  'text-[#B7002B] hover:border-[#B7002B]'
                } mr-8 text-base hover:border-b-2 `}
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                value="/contact"
                className={`${
                  path == '/contact' && 'text-[#B7002B] hover:border-[#B7002B]'
                } mr-8 text-base hover:border-b-2 `}
              >
                Contact
              </Link>
              <Link
                href={`${formLink}`}
                target="_blank"
                value="/ticket"
                className={`bg-[#B7002B] text-white px-5 py-2 rounded-lg mr-8 text-base hover:text-[#B7002B] hover:bg-white duration-300`}
              >
                Buy Ticket
              </Link>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
