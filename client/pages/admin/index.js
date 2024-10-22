import React, { useEffect, useState } from 'react';
// import Cookies from "js-cookie";
import OngoingEvents from '@/components/Admin/OngoingEvents';
// import LatestRegistry from "@/components/Admin/LatestRegistry";
import RegistrationStatus from '@/components/Admin/RegistrationStatus';
// import Image from "next/image";

const AdminPanel = () => {
  const [flag, setFlag] = useState(0);
  return (
    <div className="flex flex-row w-[100vw] bg-gray-100 ">
      <div className="flex flex-col items-center h-[100%] w-[100vw] bg-gray-100">
        <div className="w-[95%] h-max flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:justify-between mt-20  ">
          <OngoingEvents flag={flag} setFlag={setFlag} />
          <RegistrationStatus flag={flag} setFlag={setFlag} />
        </div>
        {/* <div className="flex w-[95%] h-max mt-8 ">
          <LatestRegistry />
        </div> */}
      </div>
    </div>
  );
};

export default AdminPanel;

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

// export const getServerSideProps = async (context) => {
//   const token = context.req.cookies.token;
//   const data = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/isAdmin`,
//     {
//       credentials: "include",
//     }
//   )
//   console.log(data);

//   return { props: {} };
// };
