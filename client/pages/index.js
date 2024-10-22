import Hero from '@/components/Hero';
import Events from '@/components/Events';
import Sponsors from '@/components/Sponsors';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useScrollBlock from '@/customHooks/useScrollBlock';
import Organizers from '@/components/Organizers';
import Head from 'next/head';

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    setTimeout(() => {
      setLoading(false);
      allowScroll();
    }, 700);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Otaku Festival | Itahari&apos;s Biggest Anime Festival</title>
        <meta
          name="description"
          content="Experience the best otaku events online with Otaku Festival. Get access to exciting anime conventions, cosplay gatherings, and more. Buy tickets and join the event with your favourite anime costumes and character!"
        />
        <meta
          property="og:description"
          content="Experience the best otaku events online with Otaku Festival. Get access to exciting anime conventions, cosplay gatherings, and more. Buy tickets and join the event with your favourite anime costumes and character!"
        />
        <meta property="og:type" content="website" />
      </Head>
      <main
        className={`relative flex min-h-screen bg-black flex-col items-center justify-between `}
      >
        {loading ? (
          <div className="absolute w-screen h-screen top-0 left-0 z-[50] flex justify-center items-center bg-black ">
            <div className="flex flex-col items-center ">
              <Image
                alt="loader"
                src="/assets/imgs/logo.webp"
                width={20}
                height={20}
                className=" w-[30rem] object-contain animate-ping "
                unoptimized
                priority
              />
              {/* <Image
              alt="loader"
              src="/assets/loader/giphy.webp"
              width={20}
              height={20}
              className=" w-[12rem] object-contain absolute "
              unoptimized
            /> */}
            </div>
          </div>
        ) : (
          <>
            <a href="#">
              <motion.div
                className={`border-2 border-[#BB002D] hover:bg-[#BB002D] hover:text-white text-[#BB002D] animate-bounce duration-300 z-[200] fixed ml-[35vw] md:ml-[43vw] lg:ml-[45vw] mt-[90vh] rounded-lg ${
                  showButton ? 'p-2' : 'hidden'
                }`}
                initial={{ y: 0 }}
                animate={{ y: 10 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                  damping: 12,
                  stiffness: 100,
                }}
              >
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                >
                  <path
                    d="M1 10l6.5-7 6.5 7"
                    stroke="currentColor"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </motion.div>
            </a>
            {/* <Navbar /> */}
            <Hero />
            <Events />
            <Sponsors />
            <Partners />
            <Organizers />
          </>
        )}
      </main>
    </>
  );
}

// export const getServerSideProps = async () => {

//   return {
//     props: {},
//   };
// };
