import React, { useEffect, useState } from 'react';
import { gallery } from '../data/data';
import Image from 'next/image';
import Link from 'next/link';

const Ticket = ({ events }) => {
  const [eventOption, setEventOption] = useState();
  const [ticketPrice, setTicketPrice] = useState();
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const showTicketPrice = () => {
    const matchedEvent = events.find((event) => event._id === eventOption);
    if (matchedEvent) {
      const price = matchedEvent.price;
      setTicketPrice(price);
    }
  };
  useEffect(showTicketPrice, [eventOption, events]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (success === true) {
      setMessage(
        'You have already submitted the form. Refresh the page and fill a new form to register again.'
      );
      return;
    }
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const quantity = document.getElementById('quantity');
    const event = document.getElementById('event');
    const payment = document.getElementById('payment');

    try {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('email', email.value);
      formData.append('phone', phone.value);
      formData.append('quantity', quantity.value);
      formData.append('event', event.value);
      formData.append('payment', payment.files[0]);
      console.log(formData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/user`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((r) => {
        return r.json();
      });
      if (response.status === 'success') {
        setMessage(response.message);
        setSuccess(true);
        setPaymentSuccess(true);
        setTimeout(() => setPaymentSuccess(false), 3000);
      }
    } catch (error) {
      setSuccess(false);
      setMessage('Please try again later');
    }
  };

  return (
    <>
      <section
        className={`relative flex flex-col w-[100%] h-max text-center justify-around items-center pt-[7rem] pb-20 overflow-hidden `}
        id="events"
      >
        {paymentSuccess && (
          <div className="absolute w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-[#0000003a]">
            <Image
              alt="ticket purchased"
              src="/assets/icons/paymentsuccess.gif"
              width={20}
              height={20}
              className="w-[20rem] h-[20rem] object-contain rounded-xl "
            />
            <p className="text-[#ffffff] text-[2rem] ">
              Your form was submitted. You can collect your ticket from counter
              before the event.
            </p>
          </div>
        )}
        <div className=" text-center">
          <h3
            className={`font-extrabold text-[40px] text-center text-[black] border-[#B7002B] border-b-2 mb-5 mx-auto`}
          >
            Buy <span className="text-[#B7002B]">Ticket</span>
          </h3>
        </div>
        <p className="text-lg mb-10">
          Make sure to perform relevant payment at{'  '}
          <span className="text-[#B7002B]">+977-9812345678</span>
        </p>
        {message && (
          <div className={`${success ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
        {ticketPrice && (
          <div className="text-lg mb-10">
            Ticket Price:{' '}
            <span className="text-[#B7002B]"> {ticketPrice} </span>{' '}
          </div>
        )}
        <div className="xl:w-[60%] lg:w-[75%] w-[90%] mx-auto border-2 border-gray-200 pt-8 pb-10 lg:px-20 sm:px-8 px-3 rounded-lg">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="flex flex-col items-start gap-2 w-[100%]">
                <label htmlFor="name" className="text-lg">
                  Name *
                </label>
                <input
                  placeholder="Enter your name"
                  type="text"
                  id="name"
                  name="name"
                  className="w-[100%] py-2 px-2 border-2 border-gray-300 rounded outline-none focus-within:border-[#B7002B] placeholder:font-semibold"
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-[100%]">
                <label htmlFor="email" className="text-lg">
                  Email *
                </label>

                <input
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  name="email"
                  className="w-[100%] py-2 px-2 border-2 border-gray-300 rounded outline-none focus-within:border-[#B7002B] placeholder:font-semibold"
                  required
                />
              </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="flex flex-col items-start gap-2 w-[100%]">
                <label htmlFor="phone" className="text-lg">
                  Phone number *
                </label>
                <input
                  placeholder="Enter your phone number"
                  type="phone"
                  id="phone"
                  name="phone"
                  className="w-[100%] py-2 px-2 border-2 border-gray-300 rounded outline-none focus-within:border-[#B7002B] placeholder:font-semibold"
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-[100%]">
                <label htmlFor="quantity" className="text-lg">
                  No of Tickets *
                </label>
                <input
                  placeholder="Enter amount of tickets to buy"
                  type="number"
                  id="quantity"
                  name="quantity"
                  max={10}
                  min={1}
                  inputMode="off"
                  className="w-[100%] py-2 px-2 border-2 border-gray-300 rounded outline-none focus-within:border-[#B7002B] placeholder:font-semibold"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 mb-3">
              <label htmlFor="event" className="text-lg">
                Event *
              </label>
              <select
                id="event"
                name="event"
                value={eventOption ? eventOption : 0}
                onChange={(e) => {
                  setEventOption(e.target.value);
                }}
                className="w-[100%] py-2 px-2 border-2 border-gray-300 rounded outline-none focus-within:border-[#B7002B] placeholder:font-semibold"
              >
                <option value={0} hidden>
                  Select Event
                </option>
                {events &&
                  events.map((event) => (
                    <option
                      key={event._id}
                      value={event._id}
                      onClick={(e) => {
                        setEventOption(e.target.value);
                      }}
                      className=""
                    >
                      {event.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2 mb-3">
              <label
                htmlFor="payment"
                className="text-lg cursor-pointer border-2 border-gray-300 w-[100%] py-3 rounded hover:border-[#B7002B]"
              >
                Proof of Payment ( Screenshot )*
              </label>
              <input type="file" id="payment" name="payment" className="" />
            </div>
            <button
              type="submit"
              className={`w-[100%] py-3 px-2 border-2 border-gray-300 rounded outline-none text-[#B7002B] hover:border-[#B7002B] font-bold text-xl`}
            >
              Submit
            </button>
          </form>
          <p className="mt-4">
            Do you want to check your{' '}
            <Link
              href="/status"
              className="text-[#B7002B] hover:text-green-700  cursor-pointer"
            >
              payment status?
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Ticket;

export const getServerSideProps = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event`
  ).then((r) => {
    return r.json();
  });
  const events = data.filter((item) => item.isActive === true);

  return {
    props: { events },
  };
};
