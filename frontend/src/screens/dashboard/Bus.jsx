import React, { useEffect, useState } from "react";
import {
  Car,
  Bike,
  Bus,
  Truck,
  Wifi,
  WifiOff,
  AlertCircle,
  Loader2,
  RefreshCw,
  X,
  EyeClosed,
  Eye,
} from "lucide-react";
import axiosInstance from "../../../axiosConfig";
import { toast } from "react-toastify";

const BusComponent = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/vehicle");
      if (res.status === 200) {
        setVehicles(res.data);
        console.log("Fetched vehicles:", res.data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to fetch vehicles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "connected":
        return "bg-green-50 text-green-700 border-green-200";
      case "disconnected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    return status?.toLowerCase() === "active" ? (
      <Wifi className="h-4 w-4 text-green-600" />
    ) : (
      <WifiOff className="h-4 w-4 text-red-600" />
    );
  };

  const getVehicleIcon = (type) => {
    const iconProps = { className: "h-6 w-6 text-blue-600" };
    switch (type?.toLowerCase()) {
      case "twowheller":
      case "twowheeler":
        return <Bike {...iconProps} />;
      case "car":
        return <Car {...iconProps} />;
      case "bus":
        return <Bus {...iconProps} />;
      case "truck":
        return <Truck {...iconProps} />;
      default:
        return <Car {...iconProps} />;
    }
  };

  const formatVehicleType = (type) => {
    if (type === "twowheller") return "Two Wheeler";
    return type?.charAt(0).toUpperCase() + type?.slice(1) || "Unknown";
  };

  const updateVehicleDetails = async (vehicleId, updatedData) => {
    try {
      const res = await axiosInstance.put(
        `/vehicle/${vehicleId}/config`,
        updatedData
      );
      if (res.status === 200) {
        fetchVehicles(); // Refresh the vehicle list after update
        setSelectedVehicle(null);
        console.log("Vehicle details updated successfully:", res.data);
        toast.success("Vehicle details updated successfully");
      }
    } catch (error) {
      console.error("Error updating vehicle details:", error);
      setError("Failed to update vehicle details. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading vehicles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchVehicles}
            className="mt-3 inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 font-Inter bg-gray-100 min-h-screen overflow-y-scroll">
      {selectedVehicle && (
        <div className=" absolute flex items-center justify-center bg-black/10  w-screen h-screen left-0 top-0 backdrop-blur-sm z-40 ">
          <div className="w-1/2 h-auto bg-white rounded-lg shadow-lg p-6 relative">
            <X
              onClick={() => setSelectedVehicle(null)}
              size={24}
              className="text-primary absolute top-4 right-4 cursor-pointer"
            />

            <h3 className="text-2xl font-semibold mb-4">Vehicle Details</h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {getVehicleIcon(selectedVehicle.vehicle_type)}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {selectedVehicle.vehicle_number}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formatVehicleType(selectedVehicle.vehicle_type)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-medium">Vehicle ID:</span>
                <span className="text-gray-900">
                  {selectedVehicle.vehicle_id}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-medium">Status:</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                    selectedVehicle.status
                  )}`}
                >
                  {getStatusIcon(selectedVehicle.status)}
                  <span className="ml-1">{selectedVehicle.status}</span>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-medium">Last Updated:</span>
                <span className="text-gray-600">
                  {new Date(selectedVehicle.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* // edit mode and  username and password */}
            <VehicleConfigEditor
              vehicle={selectedVehicle}
              onSave={updateVehicleDetails}
              onCancel={() => setSelectedVehicle(null)}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Fleet</h1>
        <button
          onClick={fetchVehicles}
          className="inline-flex items-center px-4 py-2 border border-blue-300 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {vehicles.length > 0 ? (
        <div className=" w-1/2 ">
          {vehicles.map((vehicle) => (
            <div
              onClick={() => setSelectedVehicle(vehicle)}
              key={vehicle._id}
              className="bg-white cursor-pointer border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getVehicleIcon(vehicle.vehicle_type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {vehicle.vehicle_number}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatVehicleType(vehicle.vehicle_type)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      vehicle.status
                    )}`}
                  >
                    {getStatusIcon(vehicle.status)}
                    <span className="ml-1">{vehicle.status}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-3">
                    <span>Vehicle ID:</span>
                    <span className="font-medium text-gray-900">
                      {vehicle.vehicle_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No vehicles found
          </h3>
          <p className="text-gray-600">
            There are no vehicles in your fleet yet.
          </p>
        </div>
      )}
    </div>
  );

  // Add this component inside your file, above export default BusComponent;
  function VehicleConfigEditor({ vehicle, onSave, onCancel }) {
    const [mode, setMode] = useState(vehicle.mode || "");
    const [range, setRange] = useState(vehicle.range || "");
    const [username, setUsername] = useState(vehicle.rtsp?.username || "");
    const [password, setPassword] = useState(vehicle.rtsp?.password || "");
    const [ip, setIp] = useState(vehicle.rtsp?.ip || "");
    const [saving, setSaving] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    useEffect(() => {
      setMode(vehicle.mode || "");
      setRange(vehicle.range || "");
      setUsername(vehicle.rtsp?.username || "");
      setPassword(vehicle.rtsp?.password || "");
    }, [vehicle]);

    const handleSave = async () => {
      setSaving(true);
      await onSave(vehicle.vehicle_id, {
        mode,
        range,
        rtsp: { username, password , ip },
      });
      setSaving(false);
    };

    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Edit Configuration</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium w-32">Mode:</span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          {mode === "Manual" && (
            <div className="flex items-center space-x-2">
              <span className="font-medium w-32">Range:</span>
              <input
                className="border rounded px-2 py-1 flex-1"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder="Range (in m) "
              />
            </div>
          )}
              <div className="flex items-center space-x-2">
            <span className="font-medium w-32">RTSP IP:</span>
            <input
              className="border rounded px-2 py-1 flex-1"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="RTSP IP Address"
            />
            </div>
          <div className="flex items-center space-x-2">

            <span className="font-medium w-32">RTSP Username:</span>
            <input
              className="border rounded px-2 py-1 flex-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium w-32">RTSP Password:</span>
            <div className="relative flex-1">
              <input
                type={isShowPassword ? "text" : "password"}
                className="border rounded px-2 py-1 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {isShowPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeClosed className="h-4 w-4 " />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/95"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
};

export default BusComponent;
