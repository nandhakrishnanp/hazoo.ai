import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import {format} from 'date-fns';

const Home = () => {
  const [hazards, setHazards] = useState(null);
  const greet = () => {
    // based on time say good morning, good afternoon or good evening
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  

  const getallHazards = async () => {
    // fetch all hazards from the backend
    const response = await axiosInstance.get("/hazard/getallhazards");
    const data = await response.data.data;
    const firstFive = data.slice(0,5);
    setHazards(firstFive);


  }


  useEffect(()=>{
    getallHazards()
  },[])
  return (
    <div className=" bg-gray-200 h-screen overflow-y-scroll">
      <div className="p-6">
      <h1 className=" font-Popin text-2xl font-semibold"> {greet()}</h1>
      </div>

      <div className=" px-6 flex  gap-3">
          <div className="flex flex-col w-[25%]   justify-center items-center py-8 rounded-md px-4 bg-[#EE6055] ">
                <p className=" font-Inter text-3xl text-white ">112</p>
               <p className=" font-Inter  font-semibold text-white">Hazards Identified</p>
          </div>
          <div className="flex flex-col w-[25%]   justify-center items-center py-5 rounded-md px-4 bg-[#17B890] ">
                <p className=" font-Inter text-3xl text-white">82</p>
               <p className=" font-Inter  font-semibold text-white">Hazards Resolved</p>
          </div>
          <div className="flex flex-col w-[25%]    justify-center items-center py-5 rounded-md px-4 bg-[#3D405B] ">
                <p className=" font-Inter text-3xl text-white">15</p>
               <p className=" font-Inter  font-semibold text-white"> Active Hazards</p>
          </div>
      </div>

      <div className="px-6 my-4">
      <div className="flex">
      <div className=" bg-white p-4 my-4 w-[60%]  " >
      <h1 className=" font-Popin px-3 text-2xl font-semibold">Recent Hazards</h1>

          {
            hazards && hazards.map((hazard) => (
              <div className="flex justify-between items-center bg-slate-200/80 mx-2 my-2 p-4 py-6  rounded-md ">
                <div>
                  <h1 className=" font-Popin text-xl font-semibold">{hazard.hazard_type}</h1>
                  <p className=" font-Popin text-sm">{ format(hazard.created_at,'dd-MM-yyyy hh-mm a')}</p>
                </div>
                {/* <div>
                  <button className=" bg-red-500 text-white px-4 py-2 rounded-md">Resolve</button>
                </div> */}
              </div>
            ))
          }
      </div>
      <div className=" mx-4 bg-white flex-1 p-4 my-4">
      <h1 className=" font-Popin px-3 text-2xl font-semibold">People Reports</h1>
        <div className=" flex flex-col items-center w-full h-full justify-center">
           <img className=" w-32" src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png" alt="" />
           <p className=" font-Popin font-semibold text-lg">No Reports Available</p>
        </div>
      </div>
      </div>
    
      </div>
    </div>
  );
};

export default Home;
