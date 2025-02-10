import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axiosInstance from "../../../axiosConfig";
import { format } from "date-fns";
import { useFetcher } from "react-router-dom";

const Map = () => {
  const [hazards, setHazards] = useState(null);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState(null);
  const fetchHazards = async () => {
    try {
      const response = await axiosInstance.get("/hazard/getallhazards");
      const data = await response.data;
      setHazards(data.data);
    } catch (error) {
      console.error("Failed to fetch hazards:", error);
    }
  };

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setAddress(data.display_name); // You can choose a specific property like `address` or `display_name`
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    fetchHazards();
  }, []);
  useEffect(() => {
    if (selected) {
      getAddress(selected.location.latitude, selected.location.longitude);
    }
  }, [selected]);
  return (
    <div>
      {selected && (
        <div className="  flex flex-col  shadow-inner shadow-gray-400  bg-white right-0 p-4  bottom-0 z-50 w-[400px] h-screen absolute">
          <img
            className=" w-full h-[300px] rounded-md object-cover "
            src={selected.image}
            alt=""
          />
          <div className=" flex">

          <p className=" font-Popin py-1 px-2">Source : <span className=" font-semibold text-red-500">{selected.cctv_id}</span></p>
          <p className=" font-Popin py-1 px-2">Status : <span  className=" font-semibold text-green-800">{selected.status}</span></p>
          </div>

          <div className="flex gap-2 py-2 items-center">
            <img
              className=" w-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMp4cw0x6MIOuQJJVod3FWTw2CZWeIrhtObw&s"
              alt=""
            />

            <p className=" font-Popin ">
              {" "}
              Hazard Identified :{" "}
              <span className=" font-semibold">
                {selected.hazard_type}
              </span>{" "}
            </p>
          </div>
          <div className="flex gap-2 py-2 items-center">
            <img
              className=" w-8 object-contain"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyQmpOibhuAsDDojC-xkbfOz-h9X6gdr1KZA&s"
              alt=""
            />

            <p className=" font-Popin ">
              {" "}
              Identified on :{" "}
              <span className="font-semibold">
                {format(selected.created_at, "dd-MM-yyyy hh-mm a")}
              </span>{" "}
            </p>
          </div>

          <div className="flex gap-1 py-2 items-center">
            <img
              className=" w-10 object-contain"
              src="https://png.pngtree.com/png-vector/20230106/ourmid/pngtree-flat-red-location-sign-png-image_6553065.png"
              alt=""
            />
            {address ? (
              <p className=" font-Popin ">
                {" "}
                Location : <span className=" font-semibold">
                  {address}
                </span>{" "}
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <button
            onClick={() => {
              setSelected(null); // Example: Close the popup
            }}
            className="bg-primary font-poppins font-bold px-3 py-2 rounded-md text-cyan-50"
          >
            Close
          </button>
        </div>
      )}
      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={12}
        className="z-0"
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {hazards &&
          hazards.map((hazard) => (
            <Marker
              key={hazard.id} // Ensure a unique key
              position={[hazard.location.latitude, hazard.location.longitude]}
            >
              <Popup>
                <div>
                  <p className=" font-Popin font-bold ">{hazard.cctv_id}</p>
                  <p className=" font-Popin font-bold">{hazard.hazard_type}</p>
                  <p
                    className=" bg-primary text-center rounded-sm text-white py-1 px-2 cursor-pointer font-Popin text-md hover:underline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      setSelected(hazard); // Set the selected hazard
                    }}
                  >
                    More details
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
