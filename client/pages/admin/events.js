// import ClickAwayListener from "@mui/base/ClickAwayListener";
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useRouter } from 'next/router';

const Events = () => {
  const [box, setBox] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventName = document.getElementById('name');
    const ticketPrice = document.getElementById('price');
    const googleform = document.getElementById('googleform');
    const whatsapp = document.getElementById('whatsapp');
    const poster = document.getElementById('poster');
    // const rulebook = document.getElementById("rulebook");
    if (!eventName || !poster || !price) {
      setMessage('Please fill all the fields!!!');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', eventName.value);
      formData.append('price', ticketPrice.value);
      formData.append('googleform', googleform.value);
      formData.append('whatsapp', whatsapp.value);
      formData.append('poster', poster.files[0]);
      // formData.append("rulebook", rulebook.files[0]);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((r) => {
        return r.json();
      });
    } catch (error) {
      console.log(error);
    } finally {
      eventName.value = null;
      ticketPrice.value = null;
      googleform.value = null;
      whatsapp.value = null;
      poster.value = null;
      // rulebook.value = null;
      setBox(true);
    }
  };

  return (
    <div className=" border-gray-300 min-h-[100vh] h-max rounded-lg w-[100vw] flex justify-center  bg-[#F3F4F6] ">
      <div
        className={`w-[80%] h-max flex flex-col items-center  bg-white py-10 mt-10 border-2 rounded-lg`}
      >
        <div className="w-full h-[4rem] flex justify-center ">
          <div className={`sm:text-[3rem] text-3xl text-[#BB002D] font-bold `}>
            Add Event
          </div>
        </div>
        <AnimatePresence>
          {box && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="fixed top-[88%] right-10 h-24 w-96 border-2 p-4 bg-[#5b4beb] text-white "
            >
              <div className="w-full flex justify-end ">
                <button onClick={() => setBox(!box)}>
                  <Image
                    width={20}
                    height={20}
                    src="/assets/icons/close.png"
                    alt="close"
                  />
                </button>
              </div>
              <span>Event added successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
        {message && <div>{message}</div>}
        <form
          className="flex flex-col w-[100%] items-center space-y-8 mt-10 md:px-10 px-2 "
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="w-[100%] flex md:flex-row flex-col justify-center ">
            <label
              className="flex md:mr-5 md:w-[15%] justify-start w-[100%] md:justify-end items-center text-lg"
              htmlFor="name"
            >
              Event Title:
            </label>
            <input
              className=" md:w-[40%] w-[100%] rounded-lg border-2 border-gray-300 p-2 focus-within:border-[#BB002D] outline-none duration-300"
              type="text"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="w-[100%] flex md:flex-row flex-col justify-center ">
            <label
              className="flex md:mr-5 md:w-[15%] justify-start w-[100%] md:justify-end items-center text-lg"
              htmlFor="price"
            >
              Ticket Price:
            </label>
            <input
              className=" md:w-[40%] w-[100%] outline-none rounded-lg border-gray-300 border-2 p-2 focus-within:border-[#BB002D] duration-300"
              type="number"
              name="price"
              id="price"
              required
            />
          </div>
          {/* asdfa;sldf */}
          <div className="w-[100%] flex md:flex-row flex-col justify-center ">
            <label
              className="flex md:mr-5 md:w-[15%] justify-start w-[100%] md:justify-end items-center text-lg "
              htmlFor="googleform"
            >
              Google Form Url:
            </label>
            <input
              className=" md:w-[40%] w-[100%] outline-none rounded-lg border-gray-300 border-2 p-2 focus-within:border-[#BB002D] duration-300"
              type="text"
              name="googleform"
              id="googleform"
              required
            />
          </div>
          <div className="w-[100%] flex md:flex-row flex-col justify-center ">
            <label
              className="flex md:mr-5 md:w-[15%] justify-start w-[100%] md:justify-end items-center text-lg"
              htmlFor="whatsapp"
            >
              Whatsapp Url:
            </label>
            <input
              className=" md:w-[40%] w-[100%] outline-none rounded-lg border-gray-300 border-2 p-2 focus-within:border-[#BB002D] duration-300"
              type="text"
              name="whatsapp"
              id="whatsapp"
              required
            />
          </div>
          {/* aslkdfjas */}
          <div className="w-[100%] flex justify-center ">
            <label
              className="md:w-[55%] w-[100%] flex justify-center items-center text-lg border-2 border-gray-300 py-2 duration-300 rounded-lg cursor-pointer hover:border-[#BB002D]"
              htmlFor="poster"
            >
              Add Poster
            </label>
            <input
              className=" w-[40%] hidden"
              type="file"
              id="poster"
              name="poster"
              accept="image/*"
              required
            />
          </div>
          {/* <div className="w-[100%] flex justify-center ">
            <label
              className="md:w-[55%] w-[100%] flex justify-center items-center text-lg border-2 border-gray-300 py-2 duration-300 rounded-lg cursor-pointer hover:border-[#BB002D]"
              htmlFor="rulebook"
            >
              Add Rulebook
            </label>
            <input
              className=" w-[40%] hidden"
              type="file"
              id="rulebook"
              name="rulebook"
              required
            />
          </div> */}

          <div className="p-3 md:px-20 px-5 border-2 border-gray-300 hover:border-[#BB002D] rounded-lg font-semibold sm:text-lg text-base duration-300">
            <button type="submit">Post Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Events;

// export const getServerSideProps = async (context) => {
//   const token = context.req.cookies.token;
//   // console.log(context.req.cookies.token);
//   const data = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/isAdmin`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         token: token,
//       }),
//     }
//   ).then((r) => {
//     return r.json();
//   });
//   console.log(data);
//   if (data.status === "error") {
//     return {
//       redirect: {
//         destination: "/login",
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
