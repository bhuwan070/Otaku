import Link from 'next/link';
import React from 'react';

const Status = () => {
  return (
    <>
      <section
        className={`flex flex-col w-[100%] h-max text-center justify-around items-center pt-[7rem] min-h-[55vh] pb-20`}
        id="events"
      >
        <div className=" text-center">
          <h3
            className={`font-extrabold text-[40px]  text-center text-[black] border-[#B7002B] border-b-2 mb-8 mx-auto`}
          >
            Payment <span className="text-[#B7002B]">Status</span>
          </h3>
        </div>
        <div className="w-[60vw] mx-auto py-5 text-lg">
          Your payment has been{' '}
          <span className="text-[green]">verified 😊.</span> Make sure to enjoy
          the festival.
        </div>
        <div className="w-[60vw] mx-auto py-5 text-lg">
          Your payment verification is{' '}
          <span className="text-[#B7002B]">pending ☹️.</span> Make sure to check
          again in a couple of hours.
        </div>
        <div>
          <p className="text-lg mt-5">
            In the meantime, learn more{' '}
            <Link href="/about" className="text-[#B7002B]">
              about us!
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Status;
