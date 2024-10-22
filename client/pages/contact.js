import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

const Contact = () => {
  const [message, setMessage] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const text = document.getElementById('message');

    // const formData = new FormData();
    // formData.append("name", name.value);
    // formData.append("email", email.value);
    // formData.append("message", message.value);

    const data = {
      name: name.value,
      email: email.value,
      message: text.value,
    };
    console.log(data);
    if (!name.value || !email.value || !text.value) {
      setMessage('Fill all the fields!!!');
      return;
    }
    try {
      setMessage('Thank you for your response');
      name.value = null;
      email.value = null;
      text.value = null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      ).then((r) => {
        return r.json();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Otaku Festival </title>
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content="Get in touch with us at Otaku Festival! Contact our team for inquiries, support via mail or you can directly contact us through social media. We're here to assist you with any questions or feedback you may have."
        />
      </Head>
      <section
        className={`flex flex-col w-[100%] h-max text-center justify-around items-center pt-[7rem] pb-20 `}
        id="events"
      >
        {/* <div className="fixed top-0 left-0 w-screen h-screen -z-[10] ">
          <div className="fixed top-0 left-0 w-full h-full bg-[#d8d3d357]   "></div>
          <Image
            width={10}
            height={10}
            alt="contact"
            src="/assets/imgs/contactwallpaper.jpg"
            className="fixed top-0 left-0 w-full h-full -z-[2]  "
            unoptimized
            priority
          />
        </div> */}
        <div className=" text-center">
          <h3
            className={`font-extrabold text-[40px] text-center text-[black] border-[#B7002B] border-b-2 mb-8 mx-auto`}
          >
            Contact <span className="text-[#B7002B]">Us</span>
          </h3>
        </div>
        <div className="relative w-full flex justify-center items-center">
          {/* <div className=" ">
            <Image
              alt="zoro and luffy"
              width={20}
              height={20}
              src="/assets/imgs/contactMap.png"
              className="border-2 w-[25rem]"
              unoptimized
              priority
            />
          </div> */}
          <div className="xl:w-[60%] lg:w-[75%] w-[90%] border-2 rounded-lg border-grey-300 mb-20">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d367.80345757671677!2d87.27720424932323!3d26.663020318283326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6df483bde6db%3A0x7ba5885296f16fa7!2sPublic%20Library!5e0!3m2!1sen!2snp!4v1690219297681!5m2!1sen!2snp"
              width="600"
              height="450"
              className="w-[100%]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222.85462576330934!2d87.28499545690184!3d26.658917973315468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6d0c9766dd1b%3A0x8ffe818a3acca47f!2sKirat%20Rai%20Yayokkha%20Tayaripchi%20Bhawan!5e0!3m2!1sen!2snp!4v1691247311634!5m2!1sen!2snp"
              width="600"
              height="450"
              className="w-[100%]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.755558014054!2d87.27308967381694!3d26.656307881807056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6d02680a14fd%3A0x56f3d455bec327db!2sOtaku%20Festival%20Event!5e0!3m2!1sen!2snp!4v1698847787084!5m2!1sen!2snp"
              width="600"
              height="450"
              className="w-[100%]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="relative xl:w-[60%] lg:w-[75%] w-[90%] mx-auto border-2 border-gray-200 pt-8 pb-10 lg:px-20 sm:px-8 px-3 rounded-lg">
          {message && (
            <div className="text-green-500 text-[20px] absolute top-0 left-0 w-full">
              {message}
            </div>
          )}
          <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="flex flex-col items-start gap-2 w-[100%]">
                <label htmlFor="name" className="text-lg">
                  Name
                </label>
                <input
                  placeholder="Enter your name"
                  type="text"
                  id="name"
                  name="name"
                  className="w-[100%] py-2 px-2 border-2 border-gray-300 rounded outline-none focus-within:border-[#B7002B] placeholder:font-semibold"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-[100%]">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>

                <input
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  name="email"
                  className="w-[100%] py-2 px-2 border-2 border-gray-300 rounded outline-none focus-within:border-[#B7002B] placeholder:font-semibold"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 mb-3">
              <label htmlFor="message" className="text-lg">
                Message
              </label>
              <textarea
                placeholder="Enter your message"
                id="message"
                name="message"
                className="w-[100%] h-[100px] py-2 px-2 border-2 border-gray-300 rounded outline-none focus-within:border-[#B7002B] placeholder:font-semibold"
              />
            </div>
            <button
              type="submit"
              className="w-[100%] py-3 px-2 border-2 border-gray-300 rounded outline-none text-[#B7002B] hover:border-[#B7002B] font-bold text-xl"
            >
              Submit
            </button>
          </form>
        </div>
        {/* <div>
          <div>1. </div>
        </div> */}
      </section>
    </>
  );
};

export default Contact;
