import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SponserTable = ({ flag, setFlag }) => {
  const [sponsers, setSponsers] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const getSponsers = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/sponser`
      ).then((r) => {
        return r.json();
      });
      setSponsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSponsers();
  }, [flag]);
  const handleDeleteSponser = async (id) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/sponser?id=${id}`,
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
    }
  };

  return (
    <div
      className={`max-h-[30rem] md:w-[60%] w-[95%] border-2 overflow-auto border-gray-300 rounded-lg mb-4 bg-white `}
    >
      <div
        className={`w-full flex justify-center items-center font-bold md:text-[2rem] text-lg text-[#BB002D] py-4 `}
      >
        Name of Sponsors
      </div>
      <table className="md:w-[90%] w-[100%] text-center mx-auto mb-4 ">
        <thead>
          <tr className="font-bold border-t-2 border-b-2 md:text-lg text-sm">
            <td>Sn</td>
            <td>Name</td>
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
              {sponsers && sponsers.length > 0 ? (
                sponsers.map((sponser, id) => (
                  <tr key={id} className="md:text-base text-sm">
                    <td>{id + 1}</td>
                    <td>{sponser.name}</td>
                    <td>
                      <div className="w-full flex justify-center mt-1">
                        <div
                          onClick={() => handleDeleteSponser(sponser._id)}
                          className=" text-sm duration-300 hover:bg-[#BB002D] hover:text-white border-2 border-[#BB002D] md:px-3 px-1 py-1 rounded-md cursor-pointer "
                        >
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
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
  );
};

export default SponserTable;
