import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axiosInstance from "../../../axiosConfig";
import {
  Camera,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";

const Hazards = () => {
  const [hazards, setHazards] = useState(null);
  const [address, setAddress] = useState(null);
  const [isOPen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [discription, setDiscription] = useState("");

  const [filter, setFilter] = useState("all");
  const [filteredHazards, setFilteredHazards] = useState(null);
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const fetchHazards = async () => {
    try {
      const response = await axiosInstance.get("/hazard/getallhazards");
      const data = await response.data.data;
      setHazards(data);
      setFilteredHazards(data);
      console.log(data);
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "active":
        return "text-red-600 bg-red-50 border-red-200";
      case "pending":
        return "text-amber-600 bg-amber-50 border-amber-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "active":
        return <Activity className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const resolveHazards = async (id) => {
    try {
      const res = await axiosInstance.post("/hazard/resolveHazard", {
        id,
        discription,
      });

      console.log(res.data);
      toast.success("Hazard Resolved Successfully");
      fetchHazards();
    } catch (error) {
      console.error("Failed to resolve hazard:", error);
      toast.error("Failed to resolve hazard");
    }
  };

  const area = [
    "Mettupalayam",
    "Pollachi",
    "Valparai",
    "Karamadai",
    "Karumathampatti",
    "Madukkarai",
  ];


  useEffect(() => {
    fetchHazards();
  }, []);

  return (
    <div className=" w-full  overflow-hidden  h-screen bg-gray-100">
      {isOPen &&  (  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-Popin font-bold mb-4">Resolve Hazard</h2>
        <textarea
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
          className="w-full h-24 p-2  border border-gray-300 rounded-md mb-4"
          placeholder="Enter resolution description"
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              resolveHazards(selected._id);
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Resolve
          </button>
        </div>
      </div>
    </div> )
      }
      <h1 className=" text-2xl font-Popin font-bold p-4">Active Hazards</h1>

      <div className="px-4 flex gap-2">
        <p>Filter Hazards</p>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            if (e.target.value === "all") {
              setFilteredHazards(hazards);
            } else {
              setFilteredHazards(
                hazards.filter((item) => item.status === e.target.value)
              );
            }
          }}
          className=" rounded-md cursor-pointer px-2 my-1"
        >
          <option value="all">All</option>
          <option value="Resolved">Resolved</option>
          <option value="Active">Unresolved</option>
        </select>
        <p>Filter By Municipality</p>
        <select
          value={selectedHazard}
          onChange={(e) => {
            setSelectedHazard(e.target.value);
            if (e.target.value === "all") {
              setFilteredHazards(hazards);
            } else {
              setFilteredHazards(
                hazards.filter((item) => item.location.area === e.target.value)
              );
            }
          }}
          className=" rounded-md cursor-pointer px-2 my-1"
        >
          <option value="all">All</option>
          {area.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className=" flex gap-9 ">
        <div className=" w-1/2 h-screen overflow-y-scroll ">
          {filteredHazards &&
            filteredHazards.map((item) => (
              <div
                onClick={() => {
                  setAddress(null);
                  setSelected(item);
                  getAddress(item.location);
                }}
                className={`px-5 py-2 m-2 rounded-md flex items-center justify-between gap-5  hover:cursor-pointer  font-Inter ${
                  selected == item ? "bg-primary/30" : "bg-white"
                }`}
              >
                <div>
                  <p>{item.hazard_type}</p>
                  <p className="">
                    {format(item.created_at, "dd-MM-yyyy hh-mm a")}
                  </p>
                </div>
                <div className="">
                  <div
                    className={`flex items-center  gap-2 p-2 rounded-lg border ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {getStatusIcon(item.status)}
                    <div className="flex  items-center">
                      <p
                        className={`font-bold font-Popin ${
                          getStatusColor(item.status).split(" ")[0]
                        }`}
                      >
                        {item.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {selected && (
          <div className="fixed right-0 top-0 bottom-0 w-1/3 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={selected.image}
                  alt="Hazard"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white font-bold text-xl font-Popin mb-2">
                    Hazard Details
                  </h2>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Camera className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                            Source
                          </p>
                          <p className="font-bold text-gray-800 font-Popin">
                            {selected.vehicle_id}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`flex items-center gap-2 p-3 rounded-lg border ${getStatusColor(
                          selected.status
                        )}`}
                      >
                        {getStatusIcon(selected.status)}
                        <div>
                          <p
                            className={`text-xs font-medium uppercase tracking-wide ${
                              getStatusColor(selected.status).split(" ")[0]
                            }`}
                          >
                            Status
                          </p>
                          <p
                            className={`font-bold font-Popin ${
                              getStatusColor(selected.status).split(" ")[0]
                            }`}
                          >
                            {selected.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                          Hazard Type
                        </p>
                        <p className="font-bold text-gray-800 font-Popin text-lg">
                          {selected.hazard_type}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                          Identified On
                        </p>
                        <p className="font-bold text-gray-800 font-Popin">
                          {format(selected.created_at, "dd-MM-yyyy hh:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                          Location
                        </p>
                        {isLoadingAddress ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                            <p className="text-gray-700 font-Popin">
                              Loading address...
                            </p>
                          </div>
                        ) : (
                          <p className="font-semibold text-gray-800 font-Popin text-sm leading-relaxed">
                            {address || "Address not available"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {selected.status !== "Resolved" && (
                    <button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className="bg-primary text-white px-3 py-1  rounded-xl"
                    >
                      Resolve Hazard
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hazards;
