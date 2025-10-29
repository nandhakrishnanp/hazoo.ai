import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axiosInstance from "../../../axiosConfig";
import { format } from "date-fns";
import { useFetcher } from "react-router-dom";
import locationIcon from "../../assets/location.png";
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

const Map = () => {
  const [hazards, setHazards] = useState(null);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const fetchHazards = async () => {
    try {
      const response = await axiosInstance.get("/hazard/getallhazards");
      const data = await response.data;
      setHazards(data.data);
    } catch (error) {
      console.error("Failed to fetch hazards:", error);
    }
  };

  const customIcon = L.icon({
    iconUrl: locationIcon,
    iconSize: [38, 38], // Size of your icon in pixels (width, height)
    iconAnchor: [19, 38], // Point of the icon corresponding to the marker's location (x, y)
    popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
  });

  const getAddress = async (latitude, longitude) => {
    try {
      setIsLoadingAddress(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch (error) {
      console.error("Error fetching address:", error);
    } finally {
      setIsLoadingAddress(false);
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

  useEffect(() => {
    fetchHazards();
  }, []);

  useEffect(() => {
    if (selected) {
      setAddress(null);
      getAddress(selected.location.latitude, selected.location.longitude);
    }
  }, [selected]);

  return (
    <div className="relative">
      {isImageFullScreen && selected && (
        <div className=" absolute  z-50   top-11 rounded-sm left-32">
          <button
            className="
             absolute  right-5 top-5 bg-black rounded-full
           "
            onClick={() => {
              setIsImageFullScreen(false);
            }}
          >
            <X className="w-6 h-6  text-white m-2 cursor-pointer" />
          </button>

          <img
            className=" rounded-md p-4"
            src={selected.image}
            alt="Hazard Fullscreen"
          />
        </div>
      )}
      {selected && (
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="relative">
              <img
                onClick={() => {
                  setIsImageFullScreen(true);
                }}
                className="w-full h-64 object-cover cursor-pointer"
                src={selected.image}
                alt="Hazard"
              />

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

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
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

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
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

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
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
              </div>
            </div>
          </div>
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
              icon={customIcon}
              key={hazard.id}
              position={[hazard.location.latitude, hazard.location.longitude]}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-blue-600" />
                      <p className="font-bold font-Popin text-gray-800">
                        {hazard.vehicle_id}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <p className="font-semibold font-Popin text-gray-700">
                        {hazard.hazard_type}
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-full bg-primary hover:bg-primary/80 text-white py-2 px-3 rounded-md cursor-pointer font-Popin text-sm font-medium transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(hazard);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
