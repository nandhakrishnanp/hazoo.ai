import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dash from "../assets/dash.svg";
import danger from "../assets/danger.svg";
import maps from "../assets/maps.svg";
import bus from "../assets/bus.svg";
const Sidebar = () => {
  const nav = useNavigate();
  const [active, setActive] = React.useState("home");

  const handleLogOut = () => {
    toast.success("Logged out successfully");
    localStorage.clear();
    nav("/");
  };

  return (
    <div className=" w-[18%]   h-screen">
      <div className=" px-4 py-3">
        <p className="text-xl font-Popin font-semibold">Hazoo.ai</p>
      </div>

      <div className=" mx-2 p-1  flex">
        <img
          className=" w-14 h-14"
          src="https://upload.wikimedia.org/wikipedia/commons/d/df/K1Af86T5-1.jpg"
          alt=""
        />
        <div className="px-3">
          <p className=" font-Popin text-sm font-bold">
            Coimbatore City Corporation
          </p>
          <button
            onClick={() => {
               handleLogOut()
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
        <div
          onClick={() => {
            nav("/dashboard/home");
            setActive("home");
          }}
          className={`flex ${
            active == "home" ? "bg-primary/20 rounded-md" : null
          } items-center p-2  transition-all duration-100  mt-2  cursor-pointer hover:bg-slate-100`}
        >
          <img className=" w-6 h-6" src={dash} alt="" />
          <p className="cursor-pointer font-Popin ml-2">Home</p>
        </div>

        <div
          onClick={() => {
            nav("/dashboard/map");
            setActive("map");
          }}
          className={`flex ${
            active == "map" ? "bg-primary/20 rounded-md" : null
          } items-center p-2  transition-all duration-100  cursor-pointer hover:bg-slate-100`}
        >
          <img className=" w-6 h-6" src={maps} alt="" />
          <p className="cursor-pointer font-Popin ml-2">Map View</p>
        </div>

        <div
          onClick={() => {
            nav("/dashboard/hazards");
            setActive("hazards");
          }}
          className={`flex ${
            active == "hazards" ? "bg-primary/20 rounded-md" : null
          } items-center p-2  transition-all duration-100   cursor-pointer hover:bg-slate-100`}
        >
          <img className=" w-6 h-6" src={danger} alt="" />
          <p className="cursor-pointer font-Popin ml-2">Hazards</p>
        </div>
        <div
          onClick={() => {
            nav("/dashboard/Vehicle");
            setActive("analytics");
          }}
          className={`flex ${
            active == "analytics" ? "bg-primary/20 rounded-md" : null
          } items-center p-2  transition-all duration-100   cursor-pointer hover:bg-slate-100`}
        >
          <img className=" w-6 h-6" src={bus} alt="" />
          <p className="cursor-pointer font-Popin ml-2">Vehicle</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
