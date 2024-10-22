import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
 
const Login = () => {
  const [message, setMessage] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const formData = {
      email,
      password,
    };
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        }
      );
    } catch (error) {
      return;
    }

    router.push('/admin');
  };

  return (
    <div className={`w-[100%] h-[100%] flex flex-col items-center `}>
      <div className="mt-10 ">
        <Image
          alt="logo"
          src="/assets/imgs/logo.webp"
          width={10}
          height={10}
          className="w-[20rem]"
          unoptimized
        />
      </div>
      <form
        className="w-[30%] rounded-xl mt-20 border-2 py-5 border-gray-300"
        onSubmit={handleSubmit}
      >
        <div
          className={`text-[2rem] font-bold mb-10 w-[100%] flex justify-center mt-5 text-[#BB002D] `}
        >
          ADMIN LOGIN
        </div>
        {message && (
          <>
            <div className="text-red-500 ">{message}</div>
          </>
        )}
        <div className="flex ">
          <label
            htmlFor="email"
            className="flex items-center justify-end w-[25%] font-semibold "
          >
            Email:
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            className="border-2 duration-300 border-gray-300 focus-within:border-[#BB002D] rounded-lg p-2 m-2 w-[50%] outline-none "
            // autoComplete="off"
          />
        </div>
        <div className=" flex ">
          <label
            htmlFor="password"
            className="flex items-center justify-end w-[25%] font-semibold"
          >
            Password:
          </label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className="border-2 border-gray-300 duration-300 rounded-lg p-2 m-2 w-[50%] outline-none focus-within:border-[#BB002D] "
          />
        </div>
        <div className="w-[100%] flex justify-center ">
          <button
            type="submit"
            className="py-3 px-10 border-2 border-gray-300 hover:border-[#BB002D] hover:bg-[#BB002D] hover:text-white m-3 rounded-lg text-lg duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
