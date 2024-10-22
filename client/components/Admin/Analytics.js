import React, { useState } from "react";
// FD980A
// 003893
const Analytics = () => {
  const [ticketSold, setTicketSold] = useState(0);
  const [sales, setSales] = useState(0);
  const [currentEvent, setCurrentEvent] = useState("Anime Festival");
  return (
    <div className=" w-full justify-between h-[10rem] flex ">
      <div className="w-[30%] h-full border-2 border-[#BB002D] flex flex-col items-center justify-center rounded-xl ">
        <div className="text-[3rem] font-bold text-[#003893] ">
          {ticketSold}
        </div>
        <div className="text-[1.5rem] font-bold text-[#4e4e4e]">
          Ticket Sold
        </div>
      </div>
      <div className="w-[30%] h-full border-2 border-[#BB002D] flex flex-col items-center justify-center rounded-xl ">
        <div className="text-[3rem] font-bold text-[#003893] ">{sales}</div>
        <div className="text-[1.5rem] font-bold text-[#4e4e4e]">
          Total Sales
        </div>
      </div>
      <div className="w-[30%] h-full border-2 border-[#BB002D] flex flex-col items-center justify-center rounded-xl ">
        <div className="text-[2.5rem] font-bold text-[#BB002D] ">
          {currentEvent}
        </div>
        {/* <div className="text-[1rem] font-bold text-[#4e4e4e]">
          Current Event
        </div> */}
      </div>
    </div>
  );
};

export default Analytics;
