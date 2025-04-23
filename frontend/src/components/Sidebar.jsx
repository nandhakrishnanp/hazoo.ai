import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dash from "../assets/dash.svg";
import danger from "../assets/danger.svg";
import bottom from "../assets/bottom.svg";
import bell from "../assets/bell.svg";
import cctv  from "../assets/cctv.svg";
import maps from "../assets/maps.svg";
import team from "../assets/team.svg";


const Sidebar = () => {
  const nav = useNavigate();
  const [active, setActive] = React.useState("home");
  return (
    <div className=" w-[18%]   h-screen">
      <div className=" px-4 py-3">
        <p className="text-xl font-Popin font-semibold">Hazoo.ai</p>
      </div>

      <div className=" mx-2 p-1  flex">
        <img
          className=" w-14 h-14"
          src="https://mediaresource.sfo2.digitaloceanspaces.com/wp-content/uploads/2024/04/29180319/tamilnadu-police-logo-A7B0493857-seeklogo.com.png"
          alt=""
        />
        <div className="px-3">
          <p className=" font-Popin text-sm font-bold">
            Coimbatore City Police
          </p>
          <button
            onClick={() => {
              nav("/");
              toast.success("Logged out successfully");
            }}
            className=" bg-primary cursor-pointer text-sm font-Popin px-2 py-[1px] mt-1 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className=" mt-4 px-3 flex flex-col gap-3 ">
        <p className="text-sm font-Popin font-semibold text-gray-500">
          Dashboard
        </p>
        <div onClick={()=>{
          nav('/dashboard/home')
          setActive('home')
        }} className={`flex ${active=='home' ? 'bg-primary/20 rounded-md' :null} items-center p-2  transition-all duration-100  mt-2  cursor-pointer hover:bg-slate-100`}>
          <img className=" w-6 h-6" src={dash} alt="" />
          <p className="cursor-pointer font-Popin ml-2">Home</p>
        </div>
    
        <div onClick={()=>{
          nav('/dashboard/map')
          setActive('map')
        }} className={`flex ${active=='map' ? 'bg-primary/20 rounded-md' :null} items-center p-2  transition-all duration-100  cursor-pointer hover:bg-slate-100`}>
          <img className=" w-6 h-6" src={maps} alt="" />
          <p className="cursor-pointer font-Popin ml-2">Map View</p>
        </div>
        <div onClick={()=>{
          nav('/dashboard/cctv')
          setActive('cctv')
        }} className={`flex ${active=='cctv' ? 'bg-primary/20 rounded-md' :null} items-center p-2  transition-all duration-100   cursor-pointer hover:bg-slate-100`}>
          <img className=" w-6 h-6" src={cctv} alt="" />
          <p className="cursor-pointer font-Popin ml-2">Live Feed</p>
        </div>
        <div onClick={()=>{
          nav('/dashboard/hazards')
          setActive('hazards')
        }}className={`flex ${active=='hazards' ? 'bg-primary/20 rounded-md' :null} items-center p-2  transition-all duration-100   cursor-pointer hover:bg-slate-100`}>
          <img className=" w-6 h-6" src={danger} alt="" />
          <p className="cursor-pointer font-Popin ml-2">Hazards</p>
        </div>
        <div onClick={()=>{
          nav('/dashboard/analytics')
          setActive('analytics')
        }} className={`flex ${active=='analytics' ? 'bg-primary/20 rounded-md' :null} items-center p-2  transition-all duration-100   cursor-pointer hover:bg-slate-100`}>
          <img className=" w-6 h-6" src={bottom} alt="" />
          <p className="cursor-pointer  font-Popin ml-2">Analytics</p>
        </div>
        <div onClick={()=>{
          nav('/dashboard/team')
          setActive('team')
        }} className={`flex ${active=='team' ? 'bg-primary/20 rounded-md' :null} items-center p-2  transition-all duration-100   cursor-pointer hover:bg-slate-100`}>
          <img className=" w-6 h-6" src={team} alt="" />
          <p className="cursor-pointer  font-Popin ml-2">Team</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
