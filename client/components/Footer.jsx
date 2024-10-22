import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);

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

  return (
    <footer className={`text-white bg-black w-[100%] px-[8vw] pb-4`}>
      <div className="xl:px-[90px] py-24 flex lg:items-center xl:items-start md:flex-row md:flex-nowrap flex-wrap justify-between flex-col xl:gap-[8vw] gap-5">
        <div className="md:w-[40%] xl:w-[30%] flex flex-col flex-shrink-0 md:mx-0 mx-auto text-center md:text-left gap-5 ">
          <Link
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            <Image
              alt="otakufest logo"
              src="/assets/imgs/logo.webp"
              width={80}
              height={80}
            />
            <div className="w-full flex flex-col">
              <span className=" text-2xl">Otaku Festival</span>
              <span className="text-sm text-[#B7002B] ">Itahari, Nepal</span>
            </div>
          </Link>
          <div className="flex flex-col title-font font-medium justify-center md:items-start md:ml-5 items-center text-white">
            <div className="flex flex-col">
              <span className="text-[#B7002B] ">Telephone:</span>
              <a href="tel:9812345678" className="hover:text-[#B7002B] ">
                9804030403
              </a>
              <a href="tel:9812345678" className="hover:text-[#B7002B] ">
                9823727297
              </a>
              <a href="tel:9812345678" className="hover:text-[#B7002B] ">
                9802726403
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-[#B7002B] ">Email:</span>
              <a
                href="mailto:otakufestivalitahari@gmail.com"
                className="hover:text-[#B7002B] "
                target="_blank"
              >
                otakufestivalitahari@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col w-[100%] md:gap-20 lg:gap-40 justify-center text-center md:text-left ">
          <div>
            <div className=" w-full text-[#B7002B] font-semibold text-[1.2rem] ">
              Quick Links
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full ">
              <nav className="list-none text-lg mb-10 flex flex-col  justify-center">
                <li>
                  <Link href="/" className="text-white hover:text-[#B7002B]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white hover:text-[#B7002B]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-white hover:text-[#B7002B]"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white hover:text-[#B7002B]"
                  >
                    Contact
                  </Link>
                </li>
              </nav>
            </div>
          </div>
          {loading ? (
            <></>
          ) : (
            <>
              <div>
                <div className=" w-full text-[#B7002B] font-semibold text-[1.2rem] ">
                  Events
                </div>
                <div className="lg:w-1/3 md:w-1/2 w-full">
                  <nav className="list-none text-lg mb-10 flex flex-col justify-center ">
                    {events &&
                      events.map((event) => (
                        <li key={event._id} className="w-full md:w-max ">
                          <Link
                            href={`/event/${event._id}`}
                            className="text-white hover:text-[#B7002B] "
                          >
                            {event.name}
                          </Link>
                        </li>
                      ))}
                    {/* <li>
                  <Link href="/" className="text-white hover:text-[#B7002B]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white hover:text-[#B7002B]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-white hover:text-[#B7002B]"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white hover:text-[#B7002B]"
                  >
                    Contact
                  </Link>
                </li> */}
                  </nav>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className=" bg-[black] w-[100%] text-white ">
        <div className="container mx-auto py-4 flex flex-wrap flex-col sm:flex-row px-[2vw] xl:px-[6vw]">
          <p className="text-white text-sm text-center sm:text-left">
            © 2023 Otaku Festival, Itahari, Nepal
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start ">
            <a
              href="https://www.facebook.com/profile.php?id=100095562937630&mibextid=ZbWKwL"
              target="_blank"
              className="text-white hover:text-[#B7002B] shadow-lg cursor-pointer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            {/* <a className="ml-3 text-white hover:text-[#B7002B] shadow-lg cursor-pointer">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a> */}
            <a
              href="https://www.instagram.com/otakufestivalitahari/"
              target="_blank"
              className="ml-3 text-white hover:text-[#B7002B] shadow-lg "
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@otakufestivalitahari"
              target="_blank"
              className="ml-3 text-white hover:text-[#B7002B] shadow-lg "
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 34 34"
              >
                <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>{' '}
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
