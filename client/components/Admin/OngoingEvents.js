import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const OngoingEvents = ({ flag, setFlag }) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState();
  const [statusBox, setStatusBox] = useState(false);
  const router = useRouter();

  // State to track the eventId of the event whose status confirmation modal should be shown
  const [statusBoxEventId, setStatusBoxEventId] = useState(null);

  const getEvents = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event`
      );
      const filteredData = data.filter((item) => item.isActive === true);
      setEvents(filteredData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getEvents();
  }, [flag]);

  const handleRegistration = async (id) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event/changeeventstatus?id=${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
        credentials: 'include',
      }
    ).then((r) => {
      return r.json();
    });
    if (result.status === 'success') {
      setFlag(flag + 1);
      setStatusBoxEventId(null);
    }
  };

  // const handleDeleteEvent = async (id) => {
  //   const result = await fetch(
  //     `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event/changeeventstatus?id=${id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: id,
  //       }),
  //       credentials: "include",
  //     }
  //   ).then((r) => {
  //     return r.json();
  //   });
  //   console.log(result);
  // };

  return (
    <div
      className={`lg:w-[52%] flex flex-col items-center rounded-xl px-3 py-4 border-2  min-h-[15rem] shadow-[0_0_10px-gray-300] bg-white border-gray-300`}
    >
      <div className={`md:text-[2rem] text-base font-bold text-[#BB002D] `}>
        Ongoing Events
      </div>
      <div className="w-full flex justify-center mt-4 ">
        <table className="md:w-[95%] w-[100%] text-center">
          <thead>
            <tr className="font-bold md:text-lg text-sm border-b-2 border-t-2 border-gray-300 pb-2 mb-2">
              {/* <td>Sn</td> */}
              <td>Name</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : (
              <>
                {events && events.length > 0 ? (
                  events.map((event, id) => {
                    let eventId = event._id;
                    return (
                      <tr key={id} className="md:text-base text-sm ">
                        {/* <td>{id + 1}</td> */}
                        <td>{event.name}</td>
                        <td>{event.price}</td>
                        <td>
                          <div className="flex justify-center space-x-2 py-2">
                            <div>
                              <button
                                onClick={() => setStatusBoxEventId(eventId)}
                                className="border-2 border-[#36cb36] sm:px-3 sm:py-1 p-1  rounded-lg hover:text-white hover:bg-[#36cb36] duration-300"
                              >
                                Open
                              </button>
                            </div>
                            {/* <div
                        onClick={() => {
                          handleDeleteEvent(event._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash hover:text-red-500 cursor-pointer"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />{" "}
                        </svg>
                      </div> */}
                            {/* {statusBox && (
                          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-[100] bg-[#47474736] flex justify-center items-center ">
                            <div className=" relative p-2 rounded-lg w-[26rem] h-max bg-white text-center flex flex-col items-center ">
                              <div className="w-[100%] flex justify-end p-2">
                                <Image
                                  alt="close"
                                  width={20}
                                  height={20}
                                  src="/assets/icons/close.png"
                                  className="cursor-pointer"
                                  unoptimized
                                  onClick={() => {
                                    setStatusBox(false);
                                  }}
                                />
                              </div>
                              <span className="text-[1rem] mb-4">
                                Are you sure you want to close the event
                                registration ?
                              </span>
                              <div className=" w-[90%] space-x-4 justify-center mb-2 ">
                                <button
                                  onClick={() => {
                                    handleRegistration(eventId);
                                  }}
                                  className="p-3 px-5 bg-red-700 text-white rounded-xl "
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => {
                                    setStatusBox(false);
                                  }}
                                  className="p-3 px-6 bg-blue-700 text-white rounded-xl"
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          </div>
                        )} */}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7">No data to show</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      {statusBoxEventId && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-[100] bg-[#47474736] flex justify-center items-center ">
          <div className=" relative p-2 rounded-lg w-[26rem] h-max bg-white text-center flex flex-col items-center ">
            <div className="w-[100%] flex justify-end p-2">
              <Image
                alt="close"
                width={20}
                height={20}
                src="/assets/icons/close.png"
                className="cursor-pointer"
                unoptimized
                onClick={() => {
                  setStatusBoxEventId(null);
                }}
              />
            </div>
            <span className="text-[1rem] mb-4">
              Are you sure you want to close the event registration ?
            </span>
            <div className=" w-[90%] space-x-4 justify-center mb-2 ">
              <button
                onClick={() => {
                  handleRegistration(statusBoxEventId);
                }}
                className="py-2 px-5 border-2 border-[#BB002D] text-black hover:text-white hover:bg-[#BB002D] rounded-xl duration-300 font-semibold"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setStatusBoxEventId(null);
                }}
                className="py-2 px-5 border-2 border-blue-700 text-black hover:text-white hover:bg-blue-700 rounded-xl duration-300 font-semibold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingEvents;
