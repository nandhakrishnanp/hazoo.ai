import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Landingpage from "./screens/landing/Landingpage";
import Login from "./screens/login/Login";
import { ToastContainer } from "react-toastify";
import Home from "./screens/dashboard/home";
import Map from "./screens/dashboard/Map";
import Layout from "./components/Layout";
import Hazards from "./screens/dashboard/Hazards";
import Analytics from "./screens/dashboard/Analytics";
import Cctv from "./screens/dashboard/Cctv";
import ResolvedHazards from "./screens/dashboard/ResolvedHazards";
import Team from "./screens/dashboard/Team";
import Bus from "./screens/dashboard/Bus";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="map" element={<Map />} />
          <Route path="hazards" element={<Hazards />} />
          <Route path="resolvedhazards" element={<ResolvedHazards />} />
          <Route path="team" element={<Team />} />
          <Route path="Vehicle" element={<Bus/>} />
        </Route>
      </Routes>
      </>
  );
};

export default App;
