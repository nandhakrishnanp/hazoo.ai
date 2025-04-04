import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axiosInstance from "../../../axiosConfig";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { format } from "date-fns";
import { toast } from "react-toastify";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
const Hazards = () => {
  const [hazards, setHazards] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [address, setAddress] = useState(null);
  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "Id" },
    { field: "type", headerName: "Type" },
    {
      field: "date",
      headerName: "Identified On",
      valueGetter: (val) => format(new Date(val.data.date), "dd-MM-yy hh-mm a"),
    },
    { field: "status", headerName: "Status" },
  ]);
  const [isOPen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [discription, setDiscription] = useState("");

  const [filter, setFilter] = useState("all");
   const [filteredHazards, setFilteredHazards] = useState(null);
   const [selectedHazard, setSelectedHazard] = useState(null);
  const fetchHazards = async () => {
    try {
      const response = await axiosInstance.get("/hazard/getallhazards");
      const data = await response.data.data;
      setHazards(data);
      setFilteredHazards(data);
      console.log(data);

      // const rowvalues = data.map((haz,index)=>{
      //   return {
      //       id : haz._id,
      //       type:haz.hazard_type,
      //       date:haz.created_at,
      //       status:haz.status
      //   }
      // })
      // console.log(rowvalues);

      // setRowData(rowvalues)
    } catch (error) {
      console.error("Failed to fetch hazards:", error);
    }
  };

  const getAddress = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`
      );
      const data = await response.json();
      setAddress(data.display_name); // You can choose a specific property like `address` or `display_name`
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  
  const resolveHazards = async (id) => {
    try {
        
      const res = await axiosInstance.post('/hazard/resolveHazard',{
          id,
          discription
      })

      console.log(res.data);
      toast.success("Hazard Resolved Successfully");
      fetchHazards();

    } catch (error) {
      console.error("Failed to resolve hazard:", error);
      toast.error("Failed to resolve hazard");
    }
  }

  const area = [
    "Mettupalayam",
    "Pollachi",
    "Valparai",
    "Karamadai",
    "Karumathampatti",
    "Madukkarai"
  ]
  

  useEffect(() => {
    fetchHazards();
  }, []);

  return (
    <div className=" w-full  bg-gray-200">

      
      <h1 className=" text-2xl font-Popin font-bold p-4">Active Hazards</h1>

       <div className="px-4 flex gap-2">
         
         <p>Filter Hazards</p>
          <select value={filter} onChange={(e)=>{
            setFilter(e.target.value)
            if(e.target.value === 'all'){
              setFilteredHazards(hazards)
            }
            else{
              setFilteredHazards(hazards.filter((item)=>item.status === e.target.value))
            }
          }} className=" rounded-md cursor-pointer px-2 my-1">
            <option value="all">All</option>
            <option value="Resolved">Resolved</option>
            <option value="Active">Unresolved</option>
          </select>

          <p>Filter By Municipality</p>
          <select value={selectedHazard} onChange={(e)=>{
            setSelectedHazard(e.target.value)
            if(e.target.value === 'all'){
              setFilteredHazards(hazards)
            }
            else{
              setFilteredHazards(hazards.filter((item)=>item.location.area === e.target.value))
            }
          }} className=" rounded-md cursor-pointer px-2 my-1">
            <option value="all">All</option>
            {
              area.map((item,index)=>(
                <option key={index} value={item}>{item}</option>
              ))
            }
          </select>

       </div>

      <div className=" flex gap-3 ">
        <div className="  w-[80%] mx-4 overflow-scroll h-screen no-scrool">
          {filteredHazards &&
            filteredHazards.map((item) => (
              <div
                onClick={() => {
                  setAddress(null);
                  setSelected(item);
                  getAddress(item.location);
                }}
                className={`px-5 py-2 m-2 rounded-md hover:bg-gray-100 hover:cursor-pointer  font-Inter ${selected==item ?'bg-primary/50' :'bg-white'}`}
              >
                <div>
                  <p>{item.hazard_type}</p>
                  <p>{format(item.created_at, "dd-MM-yyyy")}</p>
                </div>
              </div>
            ))}
        </div>
        {selected ? (
          <div className=" bg-white  m-2  w-full ">
            <div className="m-3 rounded-lg">
              {selected.image ? (
                <img src={selected.image} className=" w-[500px] h-[300px] object-cover  rounded-md " alt="" />
              ) : (
                <p>No Image</p>
              )}
            </div>
            <div className=" font-Inter m-3">
              <h3 className="flex">
                {" "}
                <p className=" font-bold"> Hazard Detected : </p>{" "}
                {selected.hazard_type}
              </h3>
              <div className=" flex gap-4 font-Popin">
                <p className="flex g-1">
                  <p className=" font-bold"> Identified On : </p>
                  {format(selected.created_at, "dd-MM-yyyy")}
                </p>
                <p className="flex g-1">
                  {" "}
                  <p className=" font-bold"> Status : </p> {selected.status}
                </p>
              </div>
              <div>
                   {
                    address ? (
                      <p>
                        <p className=" font-bold"> Address : </p> {address}
                      </p>
                    ) : (
                      <p>Loading Address...</p>
                    )
                   }
              </div>
              {
                selected.status === 'Resolved' ? (
                  <div>
                    <p className=" text-lg font-Inter font-bold">Action Taken : </p>
                    <p className="  font-Popin"> {selected.discription} </p>
                  </div>
                ) :    <div className="py-2">
                <p className=" text-primary">Hazard Resolved ?</p>
              
                {isOPen ? (
                  <div className="my-1">
                    <textarea
                    value={discription}
                    onChange={(e)=>setDiscription(e.target.value)}
                    className="w-full h-24 border-2 border-gray-300 rounded-lg p-2"
                      placeholder="Enter the resolution details"
                    ></textarea>
                    <button onClick={()=>{
                      if(discription.length > 10){
                      resolveHazards(selected._id)
                      setIsOpen(false)}
                      else{
                        toast.error("Discription should be atleast 10 characters long")
                      }
                    }} className=" bg-primary hover:bg-primary/90 py-1 px-2 cursor-pointer rounded-lg  text-white font-Inter">
                      Submit
                    </button>
                  </div>
                ) : null}

                {!isOPen && (
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className="bg-primary py-1 px-2 cursor-pointer rounded-lg my-3 text-white font-Inter"
                  >
                    Resolve Hazard
                  </button>
                )}
              </div>
              }
           
            </div>
          </div>
        ) : (
          <div className=" bg-white  w-full h-screen"></div>
        )}
      </div>
    </div>
  );
};

export default Hazards;
