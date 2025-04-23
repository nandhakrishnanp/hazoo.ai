import React from "react";
import logo from "../../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "../../../src/App.css";
const Landingpage = () => {
  const nav = useNavigate();

  
  const Features = [
    {
      title: "AI-Powered Hazard Detection",
      description: "Detects accidents, potholes, and debris using CCTV footage.",
      icon: "🚧"
    },
    {
      title: "Interactive Live Map",
      description: "View and track road hazards in real time.",
      icon: "🗺️"
    },
    {
      title: "Citizen Reporting & Uyir Coins",
      description: "Community participation with rewards for reporting hazards.",
      icon: "💰"
    },
    {
      title: "Automated Alerts & Notifications",
      description: "Stay informed about nearby road hazards instantly.",
      icon: "🔔"
    },
    {
      title: "Efficient Maintenance Tracking",
      description: "Assign, monitor, and resolve hazards efficiently.",
      icon: "🛠️"
    }
  ]
  



  return (
    <div className="  w-full ">
      <div className=" bg-cover bg-[url('https://static.vecteezy.com/system/resources/thumbnails/051/267/033/small_2x/abstract-blur-mist-smoke-texture-on-black-background-gradient-wave-curve-lines-with-blend-colorful-neon-glow-for-overlay-element-free-video.jpg')]">
        <nav className="p-4 ">
          <p className="text-2xl text-white font-Inter font-semibold">
            Hazoo.ai
          </p>
        </nav>
        <div className="h-screen w-full    flex flex-col items-center justify-center ">
          <p className=" text-white text-5xl font-Inter font-bold ">
            Redefining Road Safety with Artificial Intelligence
          </p>
          <p className=" text-xl text-white p-3 font-Inter">
            Real-time road hazard detection to ensure safer journeys for
            everyone
          </p>
          <button
            onClick={() => {
              nav("/login");
            }}
            className=" bg-slate-50 py-1 text-violet-800 font-bold font-Inter rounded-lg px-4"
          >
            Login
          </button>
        </div>





      </div>


     <div className=" flex flex-wrap text-center  min-h-screen items-center justify-center">
       
        {
          Features && Features.map((feature) => (
       
              <div className="items-center justify-center   max-w-[350px] flex flex-col p-5">
                <p className="text-4xl py-1 font-bold font-Inter">{feature.icon}</p>
                <p className="text font-bold font-Inter">{feature.title}</p>
                <p className="text font-Inter">{feature.description}</p>
            </div>
          ))
        }
        
        
     </div>



      {/* <div className=" h-screen flex  flex-col  items-center justify-center">
        <div className="flex gap-2">
          <img
            className=" w-44  h-44 rounded-full  border-2  object-contain border-purple-800"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZBwmIgtsBN10WIQslSrwQrSILs-ICtZPAA&s"
            alt=""
          />
            <img
            className="  w-44  h-44 rounded-full  border-2  object-contain border-purple-800"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMcCuz569WplPQBQs_A3_XuVNLW9D-VTgKdQ&s"
            alt=""
          />
        </div>
        <p className="pt-4 font-Inter font-bold text-xl">"Capable of Integrating 15,000+ CCTV Cameras Across Coimbatore to</p>
        <p className=" font-Inter font-bold text-xl">Detect Hazards in Real-Time"</p>

      </div> */}
    </div>
  );
};

export default Landingpage;
