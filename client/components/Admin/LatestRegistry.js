import axios from "axios"
import React, { useEffect, useState } from "react"

const LatestRegistry = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("")

  const getEvents = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/event`
    )
    const filteredData = data.filter((item) => item.isCompleted === false)
    setEvents(data)
  }
  useEffect(() => {
    getEvents()
  }, [])

  const getUsers = async (pageNumber, search, eventFilter) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/user?page=${pageNumber}&limit=10&search=${search}&event=${eventFilter}`
      )
      if (pageNumber === 1) {
        setUsers(data.users)
      } else {
        setUsers((prevUsers) => [...prevUsers, ...data.users])
      }
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }
  const handleEventFilter = (event) => {
    setLoading(true)
    setUsers([])
    setPage(1)
    setSelectedEvent(event)
    getUsers(1, searchQuery, event)
  }
  useEffect(() => {
    getUsers(page, searchQuery, selectedEvent)
  }, [page, searchQuery, selectedEvent])

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handleSearch = (event) => {
    setLoading(true)
    setUsers([])
    setPage(1)
    getUsers(1, searchQuery, selectedEvent)
  }

  return (
    <div
      className={`w-[100%] flex flex-col items-center rounded-xl p-5 border-2 mb-8 border-gray-300 bg-white`}>
      <div
        className={`md:text-[2rem] text-base font-bold text-[#BB002D] mb-5 `}>
        Latest Registry
      </div>
      <div className=" relative w-full gap-3 flex md:flex-row flex-col items-center justify-center ">
        <div className="md:w-[45%] w-[100%] flex justify-center">
          <input
            type="search"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 p-2 md:w-[80%] w-[100%] border-gray-300 outline-none focus-within:border-[#BB002D] duration-300 rounded-lg md:text-lg text-sm"
          />
          <button
            className="ml-2 md:px-4 md:py-2 px-2 py-1 border-2 border-[#BB002D] hover:bg-[#BB002D] hover:text-white rounded-lg duration-300"
            onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="md:absolute md:right-0 md:w-[20%] w-[40%] h-[3rem] flex justify-center">
          <select
            value={selectedEvent}
            onChange={(e) => handleEventFilter(e.target.value)}
            className="border-2 p-2 w-[80%] border-gray-300 outline-none focus-within:border-[#BB002D] rounded-lg duration-300">
            <option value="">All</option>

            {events &&
              events.map((event) => (
                <option
                  key={event._id}
                  value={event._id}
                  onClick={(e) => {
                    setSelectedEvent(e.target.value)
                  }}
                  className="">
                  {event.name}
                </option>
              ))}
            {/* Add more events as needed */}
          </select>
        </div>
      </div>

      <div className="w-full flex mt-4 flex-col items-center ">
        <div className=" w-full max-h-[300px] min-h-[300px] overflow-y-auto ">
          {/* {loading && (
            <div className="absolute top-0 left-0 text-black z-[20] w-[100vw] h-[100vh] bg-[#7979794f] flex justify-center items-center ">
              <div>Loading...</div>
            </div>
          )} */}

          <table className="w-[100%] text-center md:border-b-0 border-b-2">
            <thead>
              <tr className="font-bold md:text-lg text-sm border-b-2 border-t-2 border-gray-300 pb-2 mb-2 ">
                <td className="md:border-r-0 border-r-2">Sn</td>
                <td className="md:border-r-0 border-r-2">Name</td>
                <td className="md:border-r-0 border-r-2">Event Name</td>
                <td className="md:border-r-0 border-r-2">Ticket Price</td>
                <td className="md:border-r-0 border-r-2">Ticket Bought</td>
                <td className="md:border-r-0 border-r-2">Phone No</td>
                <td className="md:border-r-0 border-r-2">Transaction</td>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : (
                <>
                  {users && users.length > 0 ? (
                    users.map((user, id) => (
                      <tr key={id} className="md:text-base text-sm">
                        <td className="md:border-r-0 border-r-2">{id + 1}</td>
                        <td className="md:border-r-0 border-r-2">
                          {user.name}
                        </td>
                        <td className="md:border-r-0 border-r-2">
                          {user.eventDetails?.name}
                        </td>
                        <td className="md:border-r-0 border-r-2">
                          {user.eventDetails?.price}
                        </td>
                        <td className="md:border-r-0 border-r-2">
                          {user.quantity}
                        </td>
                        <td className="md:border-r-0 border-r-2">
                          {user.phone_number}
                        </td>
                        <td className="pb-3 md:border-r-0 border-r-2">
                          <a
                            href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/${user.image}`}
                            className="underline text-[#BB002D] uppercase"
                            target="__blank">
                            image
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No data to show</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        {page < totalPages && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LatestRegistry
