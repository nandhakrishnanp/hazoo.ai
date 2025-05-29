import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [hazards, setHazards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats , setStats] = useState({
    hazardsIdentified: 0,
    hazardsResolved: 0,
    activeHazards: 0
  })
  const greet = () => {
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

  const nav = useNavigate();

  const getallHazards = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/hazard/getallhazards");
      const data = await response.data.data;
      const firstFive = data.slice(0, 5);
      setHazards(firstFive);
    } catch (error) {
      console.error("Error fetching hazards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStats = async () => {
    try {
       const response = await axiosInstance.get("/hazard/getstats");
       const data = await response.data;
        setStats({
          hazardsIdentified: data.totalHazards || 0,
          hazardsResolved: data.activeHazards || 0,
          activeHazards: data.resolvedHazards || 0
        });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to fetch stats. Please try again later.");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      nav("/login");
    }
    getallHazards();
    getStats();
  
  }, []);

  const StatCard = ({ value, label, bgColor, icon, isLoading }) => (
    <div className={`flex flex-col w-[25%] justify-center items-center py-8 rounded-xl px-4 ${bgColor} shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="w-12 h-8 bg-white/20 rounded mb-2"></div>
          <div className="w-24 h-4 bg-white/20 rounded"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-2">
            {icon}
            <p className="font-Inter text-3xl text-white font-bold ml-2">{value}</p>
          </div>
          <p className="font-Inter font-semibold text-white text-center text-sm">{label}</p>
        </>
      )}
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex justify-between items-center bg-gray-200 mx-2 my-2 p-4 py-6 rounded-lg">
        <div className="flex-1">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-Popin text-3xl font-bold text-gray-800 mb-1">
                {greet()}
              </h1>
              <p className="text-gray-600 font-Popin">
                Welcome back to your dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="flex gap-4">
          <StatCard
            value={stats.hazardsIdentified}
            label="Hazards Identified"
            bgColor="bg-gradient-to-br from-[#EE6055] to-[#e8554a]"
            isLoading={statsLoading}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            }
          />
          <StatCard
            value={stats.hazardsResolved}
            label="Hazards Resolved"
            bgColor="bg-gradient-to-br from-[#17B890] to-[#15a085]"
            isLoading={statsLoading}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            value={stats.activeHazards}
            label="Active Hazards"
            bgColor="bg-gradient-to-br from-[#3D405B] to-[#2f3142]"
            isLoading={statsLoading}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </div>

        {/* Main Content Grid */}
        <div className="flex gap-6">
          {/* Recent Hazards */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-[60%] overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="font-Popin text-2xl font-bold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Recent Hazards
                </h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Latest 5
                </span>
              </div>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <LoadingSkeleton key={index} />
                  ))}
                </div>
              ) : hazards && hazards.length > 0 ? (
                <div className="space-y-3">
                  {hazards.map((hazard, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 mx-2 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <div>
                          <h1 className="font-Popin text-lg font-semibold text-gray-800 mb-1">
                            {hazard.hazard_type}
                          </h1>
                          <p className="font-Popin text-sm text-gray-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {format(hazard.created_at, 'dd-MM-yyyy hh:mm a')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Pending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="font-Popin font-semibold text-lg text-gray-600">No Hazards Available</p>
                  <p className="font-Popin text-sm text-gray-400 mt-1">All clear for now!</p>
                </div>
              )}
            </div>
          </div>

          {/* People Reports */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex-1 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
              <h1 className="font-Popin text-2xl font-bold text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                People Reports
              </h1>
            </div>
            
            <div className="flex flex-col items-center w-full h-full justify-center p-8">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8 mb-6">
                <img 
                  className="w-24 h-24 opacity-60" 
                  src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png" 
                  alt="No reports" 
                />
              </div>
              <p className="font-Popin font-semibold text-xl text-gray-700 mb-2">No Reports Available</p>
              <p className="font-Popin text-sm text-gray-500 text-center mb-4">
                Reports from community members will appear here
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-Popin font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                Refresh Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;