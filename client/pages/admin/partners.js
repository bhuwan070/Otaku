import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import PartnerTable from '@/components/Admin/PartnerTable';

const Partners = () => {
  const [box, setBox] = useState(false);
  const [message, setMessage] = useState(null);
  const [flag, setFlag] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const file = document.getElementById('file');

    try {
      const formData = new FormData();

      formData.append('name', name.value);
      formData.append('file', file.files[0]);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/partner`,
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
      name.value = null;
      file.value = null;
      setBox(true);
      setFlag(flag + 1);
    }
  };
  return (
    <div
      className={` rounded-lg min-h-[100vh] h-max w-[100vw] bg-[#F3F4F6] flex flex-col items-center `}
    >
      <div className="w-[60%] flex flex-col justify-center items-center border-2 border-gray-300 py-10 mt-10 rounded-lg bg-white ">
        <div className=" h-[4rem] flex justify-center ">
          <div className={`sm:text-[3rem] text-3xl text-[#BB002D] font-bold `}>
            Partners
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
              <span>Partners added successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="w-[100%] lg:w-[80%] flex flex-col items-center justify-center space-y-10 md:px-10 px-2"
        >
          <div className=" mt-10 w-[100%] flex md:flex-row flex-col items-center md:mx-auto justify-start">
            <label
              htmlFor="name"
              className="flex md:mr-5 justify-start items-center text-lg"
            >
              Partner Name:
            </label>
            <input
              className=" md:w-[79%] w-[100%] rounded-lg border-2 border-gray-300 p-2  outline-none focus-within:border-[#BB002D] duration-300"
              name="name"
              id="name"
              type="text"
              required
            />
          </div>
          <div className="mt-5 w-[100%] flex items-center  ">
            <label
              htmlFor="file"
              className="w-[100%] flex justify-center items-center text-lg border-2 border-gray-300 py-2 duration-300 rounded-lg cursor-pointer hover:border-[#BB002D]"
            >
              Select Image
            </label>
            <input
              className="hidden"
              id="file"
              type="file"
              name="file"
              accept="image/*"
              required
            />
          </div>
          <div className="mt-10 flex justify-center w-[80%]">
            <button
              type="submit"
              className="p-3 md:px-20 px-5 border-2 border-gray-300 hover:border-[#BB002D] rounded-lg font-semibold sm:text-lg text-base duration-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      <div className="w-[100%] mt-20 mx-auto flex justify-center ">
        <PartnerTable flag={flag} setFlag={setFlag} />
      </div>
    </div>
  );
};

export default Partners;
