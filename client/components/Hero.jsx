import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formLink } from '@/data/data';

const Hero = () => {
  const letters = Array.from('Otaku Festival');
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <div className="h-screen ">
      <div className=" xl:w-[80vw] h-full mx-auto w-full md:py-0 py-10 md:min-h-[100vh] flex flex-col lg:flex-row gap-5 items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="w-[100%] h-[100vh] absolute top-0 left-0 z-[10] bg-[url('/assets/imgs/herowallpaper2.webp')] bg-no-repeat bg-cover bg-center "
        >
          {/* <Image
            alt="wallpaper"
            width={10}
            height={10}
            src="/assets/imgs/herowallpaper3.jpg"
            className="w-screen h-screen object-cover"
            unoptimized
            priority
          /> */}
        </motion.div>
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center w-[90%] md:w-[60%] z-[20] "
        >
          <Image
            src="/assets/imgs/logo.webp"
            width={20}
            height={20}
            alt="Otaku Festival"
            className="w-[360px] md:w-[400px] object-contain mx-auto pb-5 lg:py-5 lg:mt-16 mt-0 md:my-0 lg:w-[500px]"
            unoptimized
            priority
          />
        </motion.div>

        <div className="px-3 z-[20] ">
          <motion.p
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className={`lg:text-[30px] md:text-[28px] text-[18px] font-medium font-sans `}
          >
            Itahari&apos;s Biggest Anime Festival
          </motion.p>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            // via-[#003893]
            className={`uppercase bg-gradient-to-r from-[#BB002D] from-10% via-[#FE8000] via-50% to-[#BB002D] to-90% text-[2.8rem] sm:text-[48px] md:text-[4.2rem] inline-block text-transparent bg-clip-text  lg:text-[5rem]  w-[100%] font-semibold`}
          >
            {letters.map((letter, index) => (
              <motion.span variants={child} key={index}>
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: 'spring',
              damping: 12,
              stiffness: 100,
            }}
            className="flex flex-col gap-4 mt-4"
          >
            <Link href={`${formLink}`} target="_blank" className="w-max">
              <div
                className={` bg-[#B7002B] w-max  px-5 lg:px-11 py-3 rounded-lg text-base md:text-xl duration-300 hover:text-[#B7002B] hover:bg-white uppercase`}
              >
                Buy Ticket
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
