import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const AdminSideNav = ({ openSideNav, setOpenSideNav }) => {
  const [logoutBox, setLogoutBox] = useState(false);
  const router = useRouter();
  const path = router.pathname;

  const handleLogout = async () => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/admin/logout`,
      {
        method: 'POST',
        credentials: 'include',
      }
    ).then((r) => {
      return r.json();
    });
    if (result.status === 'success') {
      router.push('/login');
    }
  };
  return (
    <div
      className={`relative shadow-lg lg:flex w-full min-h-[100vh] h-max bg-[white]`}
    >
      {logoutBox && (
        <div className="absolute w-[100vw] h-[100%] bg-[#47474736] flex justify-center items-center ">
          <div className=" relative w-[20rem] h-[10rem] border-2 z-[20] bg-white text-center flex flex-col items-center ">
            <div className="w-[100%] flex justify-end p-2 gap-3 cursor-pointer">
              <Image
                alt="close"
                width={20}
                height={20}
                src="/assets/icons/close.png"
                unoptimized
                onClick={() => {
                  setLogoutBox(false);
                }}
              />
            </div>
            <span className="text-2xl mb-5 z-[50]">Are you sure?</span>
            <div className=" w-[100%] h-[100%] items-center space-x-4 justify-center ">
              <button
                onClick={handleLogout}
                className="py-2 px-5 border-2 border-gray-300 duration-300  hover:border-red-700 text-black rounded-xl "
              >
                Logout
              </button>
              <button
                onClick={() => {
                  setLogoutBox(false);
                }}
                className="py-2 px-5 border-2 border-gray-300 duration-300 hover:border-blue-700 text-black rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-[max] w-full shadow-xl ">
        <div>
          <Image
            src="/assets/icons/close.png"
            width={20}
            height={20}
            alt="Close"
            className="cursor-pointer ml-5 mt-3"
            onClick={() => setOpenSideNav(false)}
          />
        </div>
        <div className="flex items-center justify-center pt-6">
          <Image
            src="/assets/imgs/logo.png"
            alt="logo"
            width={20}
            height={20}
            className="w-[20rem] h-[14rem] object-contain"
            unoptimized
          />
        </div>
        <nav className="mt-6 flex flex-col justify-between ">
          <div className=" ">
            <Link href="/admin">
              <div
                className={`flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 ${
                  path == '/admin' &&
                  'border-r-4 border-[#BB002D] text-[#BB002D]'
                }  `}
              >
                <div className="text-left ">
                  <Image
                    src="/assets/icons/dashboard.png"
                    height={20}
                    width={20}
                    alt="Dashboard"
                  />
                </div>
                <div className="mx-4 text-sm duration-300 font-semibold hover:text-[#BB002D]">
                  Dashboard
                </div>
              </div>
            </Link>
            <Link href="/admin/events">
              <div
                className={`flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 ${
                  path == '/admin/events' &&
                  'border-r-4 border-[#BB002D] text-[#BB002D]'
                }  `}
              >
                <div className="text-left ">
                  <Image
                    src="/assets/icons/events.png"
                    height={20}
                    width={20}
                    alt="Events"
                  />
                </div>
                <div className="mx-4 text-sm font-semibold duration-300 hover:text-[#BB002D]">
                  Events
                </div>
              </div>
            </Link>

            <Link href="/admin/gallery">
              <div
                className={`flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 ${
                  path == '/admin/gallery' &&
                  'border-r-4 border-[#BB002D] text-[#BB002D]'
                }  `}
              >
                <div className="text-left ">
                  <Image
                    src="/assets/icons/gallery.png"
                    height={20}
                    width={20}
                    alt="Gallery"
                  />
                </div>
                <div className="mx-4 text-sm duration-300 font-semibold hover:text-[#BB002D]">
                  Gallery
                </div>
              </div>
            </Link>
            <Link href="/admin/sponsers">
              <div
                className={`flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 ${
                  path == '/admin/sponsers' &&
                  'border-r-4 border-[#BB002D] text-[#BB002D]'
                }  `}
              >
                <div className="text-left ">
                  <Image
                    src="/assets/icons/deal.png"
                    height={20}
                    width={20}
                    alt="Sponsors"
                  />
                </div>
                <div className="mx-4 text-sm font-semibold hover:text-[#BB002D] duration-300">
                  Sponsors
                </div>
              </div>
            </Link>

            <Link href="/admin/partners">
              <div
                className={`flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 ${
                  path == '/admin/partners' &&
                  'border-r-4 border-[#BB002D] text-[#BB002D]'
                }  `}
              >
                <div className="text-left ">
                  <Image
                    src="/assets/icons/partner.png"
                    height={20}
                    width={20}
                    alt="Partners"
                  />
                </div>
                <div className="mx-4 text-sm font-semibold hover:text-[#BB002D] duration-300">
                  Partners
                </div>
              </div>
            </Link>

            <Link href="/admin/organizers">
              <div
                className={`flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 ${
                  path == '/admin/orgainzers' &&
                  'border-r-4 border-[#BB002D] text-[#BB002D]'
                }  `}
              >
                <div className="text-left ">
                  <Image
                    src="/assets/icons/organizer.png"
                    height={20}
                    width={20}
                    alt="Organizers"
                  />
                </div>
                <div className="mx-4 text-sm font-semibold hover:text-[#BB002D] duration-300">
                  Organizers
                </div>
              </div>
            </Link>

            {/* <a
              className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500"
              href="#"
            >
              <span className="text-left">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="m-auto"
                  viewBox="0 0 2048 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                </svg>
              </span>
              <span className="mx-4 text-sm font-normal">Projects</span>
            </a>
            <a
              className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500"
              href="#"
            >
              <span className="text-left">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="m-auto"
                  viewBox="0 0 2048 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z"></path>
                </svg>
              </span>
              <span className="mx-4 text-sm font-normal">My tasks</span>
            </a>
            <a
              className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500"
              href="#"
            >
              <span className="text-left">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="m-auto"
                  viewBox="0 0 2048 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M960 0l960 384v128h-128q0 26-20.5 45t-48.5 19h-1526q-28 0-48.5-19t-20.5-45h-128v-128zm-704 640h256v768h128v-768h256v768h128v-768h256v768h128v-768h256v768h59q28 0 48.5 19t20.5 45v64h-1664v-64q0-26 20.5-45t48.5-19h59v-768zm1595 960q28 0 48.5 19t20.5 45v128h-1920v-128q0-26 20.5-45t48.5-19h1782z"></path>
                </svg>
              </span>
              <span className="mx-4 text-sm font-normal">Calendar</span>
            </a>
            <a
              className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500"
              href="#"
            >
              <span className="text-left">
                <svg
                  width="20"
                  height="20"
                  className="m-auto"
                  fill="currentColor"
                  viewBox="0 0 2048 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                </svg>
              </span>
              <span className="mx-4 text-sm font-normal">Time manage</span>
            </a>
            <a
              className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500"
              href="#"
            >
              <span className="text-left">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="m-auto"
                  viewBox="0 0 2048 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                </svg>
              </span>
              <span className="mx-4 text-sm font-normal">Reports</span>
            </a>*/}
          </div>
          <div className="flex items-center justify-start w-full px-4 py-2 font-thin text-gray-500 uppercase transition-colors duration-300 dark:text-gray-200 hover:text-[#BB002D] mt-[94%]">
            <span className="text-left">
              <Image
                src="/assets/icons/logout.png"
                height={20}
                width={20}
                alt="Log Out"
              />
            </span>

            <button
              className="mx-4 text-[1rem] font-semibold"
              onClick={() => {
                setLogoutBox(true);
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminSideNav;
