import React from "react";

const Cctv = () => {
  return (
    <div className=" bg-gray-200 w-full min-h-screen ">
      <p className=" text-xl font-bold font-Popin p-6">Live CCTV Feed</p>
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px]  flex flex-col items-center justify-center ">
          <img className="w-[350px] h-[350px]  " src="http://172.16.44.116:5000/video_feed" alt="cctv_1" />
            {/* <p className=" text-gray-100">Not Available</p> */}
          </div>
        </div>
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px]  bg-slate-700 flex flex-col items-center justify-center ">
            <p className=" text-white text-lg font-bold font-Popin">CCTV02</p>
            <p className=" text-gray-100">Not Available</p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px] bg-slate-700  flex flex-col items-center justify-center ">
            <p className=" text-white text-lg font-bold font-Popin">CCTV03</p>
            <p className=" text-gray-100">Not Available</p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px] bg-slate-700  flex flex-col items-center justify-center ">
            <p className=" text-white text-lg font-bold font-Popin">CCTV04</p>
            <p className=" text-gray-100">Not Available</p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px] bg-slate-700  flex flex-col items-center justify-center ">
            <p className=" text-white text-lg font-bold font-Popin">CCTV05</p>
            <p className=" text-gray-100">Not Available</p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px] bg-slate-700  flex flex-col items-center justify-center ">
            <p className=" text-white text-lg font-bold font-Popin">CCTV06</p>
            <p className=" text-gray-100">Not Available</p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px] bg-slate-700  flex flex-col items-center justify-center ">
            <p className=" text-white text-lg font-bold font-Popin">CCTV07</p>
            <p className=" text-gray-100">Not Available</p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px] bg-slate-700  flex flex-col items-center justify-center ">
            <p className=" text-white text-lg font-bold font-Popin">CCTV08</p>
            <p className=" text-gray-100">Not Available</p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-2">
          <div className=" w-[200px] h-[200px] bg-slate-700  flex flex-col items-center justify-center ">
            <p className=" text-white text-lg font-bold font-Popin">CCTV09</p>
            <p className=" text-gray-100">Not Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cctv;
