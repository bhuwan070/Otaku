import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const RegistrationStatus = ({ flag, setFlag }) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [statusBox, setStatusBox] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const router = useRouter();
  // State to track the eventId of the event whose status confirmation modal should be shown
  const [statusBoxEventId, setStatusBoxEventId] = useState(null);

  // State to track the eventId of the event whose delete confirmation modal should be shown
  const [deleteBoxEventId, setDeleteBoxEventId] = useState(null);

  const getEvents = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event`
      );
      const filteredData = data.filter(
        (item) => item.isActive === false && item.isCompleted === false
      );
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
      setDeleteBoxEventId(null);
    }
  };

  const handleDeletion = async (id) => {
    console.log(id);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event?id=${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    ).then((r) => {
      return r.json();
    });
    if (result.status === 'success') {
      setFlag(flag + 1);
      setStatusBoxEventId(null);
      setDeleteBoxEventId(null);
    }
  };

  return (
    <div
      className={`lg:w-[45%] flex flex-col items-center rounded-xl  px-3 py-4 border-2  min-h-[15rem] bg-white border-gray-300`}
    >
      <div className={`md:text-[2rem] text-base font-bold text-[#BB002D] `}>
        Registration Status
      </div>
      <div className="w-full flex justify-center mt-4 ">
        <table className="md:w-[95%] w-[100%] text-center ">
          <thead>
            <tr className="font-bold md:text-lg text-sm border-b-2 border-t-2 border-gray-300 pb-2 mb-2">
              {/* <td>Sn</td> */}
              <td>Name</td>
              <td>Price</td>
              <td>Sold</td>
              <td>Status</td>
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
                      <tr key={id} className="md:text-base text-sm">
                        {/* <td>{id + 1}</td> */}
                        <td>{event.name}</td>
                        <td>{event.price}</td>
                        <td>300</td>
                        <td>
                          <div className="flex md:flex-row flex-col justify-center space-x-2 py-2">
                            {/* <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil hover:text-blue-500 cursor-pointer "
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />{" "}
                        </svg>
                      </div> */}
                            <div>
                              <button
                                onClick={() => setStatusBoxEventId(eventId)}
                                className=" border-2 border-[#BB002D] py-1 px-2 rounded-lg hover:text-white hover:bg-[#BB002D] duration-300 text-sm mb-2"
                              >
                                Closed
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() => setDeleteBoxEventId(eventId)}
                                className=" border-2 border-[#BB002D] py-1 px-2  rounded-lg hover:text-white hover:bg-[#BB002D] duration-300 text-sm"
                              >
                                Delete
                              </button>
                            </div>
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
                                Are you sure you want to open the event
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
                        )}
                        {deleteBox && (
                          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-[100] bg-[#47474736] flex justify-center items-center ">
                            <div className=" relative p-2 rounded-lg w-[26rem] h-max bg-white text-center flex flex-col items-center ">
                              <div className="w-[100%] flex justify-end p-2">
                                <span className="w-[90%] text-red-500 font-bold text-[1.5rem] ">
                                  Careful!!!
                                </span>
                                <Image
                                  alt="close"
                                  width={20}
                                  height={20}
                                  src="/assets/icons/close.png"
                                  className="cursor-pointer w-[5%] object-contain "
                                  unoptimized
                                  onClick={() => {
                                    setDeleteBox(false);
                                  }}
                                />
                              </div>
                              <div className="flex flex-col w-[90%] mb-4 ">
                                <span className="text-[1rem]">
                                  Are you sure you want to delete the event ?
                                </span>
                                <span>
                                  It will also delete all the user details who
                                  registered for this event.
                                </span>
                              </div>
                              <div className=" w-[90%] space-x-4 justify-center mb-2 ">
                                <button
                                  onClick={() => {
                                    handleDeletion(eventId);
                                  }}
                                  className="p-3 px-5 bg-red-700 text-white rounded-xl "
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteBox(false);
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
              Are you sure you want to open the event registration ?
            </span>
            <div className=" w-[90%] space-x-4 justify-center mb-2 ">
              <button
                onClick={() => {
                  handleRegistration(statusBoxEventId);
                }}
                className="py-2 px-5 border-2 border-red-700 hover:bg-red-700 hover:text-white rounded-xl "
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setStatusBoxEventId(null);
                }}
                className="py-2 px-6 border-2 border-blue-700 hover:bg-blue-700  hover:text-white rounded-xl"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteBoxEventId && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-[100] bg-[#47474736] flex justify-center items-center ">
          <div className=" relative p-2 rounded-lg w-[26rem] h-max bg-white text-center flex flex-col items-center ">
            <div className="w-[100%] flex justify-end p-2">
              <span className="w-[90%] text-red-500 font-bold text-[1.5rem] ">
                Careful!!!
              </span>
              <Image
                alt="close"
                width={20}
                height={20}
                src="/assets/icons/close.png"
                className="cursor-pointer w-[5%] object-contain "
                unoptimized
                onClick={() => {
                  setDeleteBoxEventId(null);
                }}
              />
            </div>
            <div className="flex flex-col w-[90%] mb-4 ">
              <span className="text-[1rem]">
                Are you sure you want to delete the event ?
              </span>
              <span>
                It will also delete all the user details who registered for this
                event.
              </span>
            </div>
            <div className=" w-[90%] space-x-4 justify-center mb-2 ">
              <button
                onClick={() => {
                  handleDeletion(deleteBoxEventId);
                }}
                className="py-2 px-5 border-2 border-red-700 hover:bg-red-700  hover:text-white rounded-xl "
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setDeleteBoxEventId(null);
                }}
                className="py-2 px-6 border-2 border-blue-700 hover:bg-blue-700 text-black hover:text-white rounded-xl"
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

export default RegistrationStatus;
