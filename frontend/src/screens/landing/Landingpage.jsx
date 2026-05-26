import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../src/App.css";

const Landingpage = () => {
  const nav = useNavigate();

  const features = [
    {
      tag: "01",
      title: "Live Hazard Tracking",
      description: "Real-time visualization of road hazards on an interactive map."
    },
    {
      tag: "02",
      title: "Instant Alerts",
      description: "Get immediate notifications about hazards in your area."
    },
    {
      tag: "03",
      title: "Analytics Dashboard",
      description: "Comprehensive insights and reporting for authorities."
    },
    {
      tag: "04",
      title: "AI Detection",
      description: "Advanced computer vision for accurate hazard identification."
    },
    {
      tag: "05",
      title: "Community Reports",
      description: "Citizen contributions enhance safety awareness."
    },
    {
      tag: "06",
      title: "Reward System",
      description: "Earn coins for contributing to road safety."
    }
  ];

  return (
    <div className="w-full bg-slate-950" style={{ fontFamily: "Poppins, sans-serif" }}>
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold text-white tracking-tight">
            Hazoo.ai
          </div>
          <button
            onClick={() => nav("/login")}
            className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 py-20 sm:py-28 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <div aria-hidden="true" className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 left-[-6rem] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-purple-200 border border-white/10">
            Smart infrastructure for safer roads
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl font-semibold text-white leading-tight">
            Road safety powered by<br />real-time AI detection
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Hazoo.ai connects citizens and authorities with live hazard insights, actionable alerts, and a clear path to resolution.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => nav("/login")}
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-700 transition-colors shadow-md"
            >
              Start Monitoring
            </button>
            <button
              onClick={() => nav("/login")}
              className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold text-lg border border-white/20 hover:border-white/40 transition-colors"
            >
              Explore the Dashboard
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-white mb-4">Built for clarity and speed</h2>
            <p className="text-lg text-slate-300">
              A clean workflow for detection, reporting, and resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-slate-800 hover:border-purple-500/60 hover:shadow-lg transition-all bg-slate-900/60"
              >
                <div className="h-10 w-10 rounded-full bg-purple-500/20 text-purple-200 flex items-center justify-center text-sm font-semibold mb-4">
                  {feature.tag}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Hazards Detected", value: "5K+" },
              { label: "Cities Covered", value: "15+" },
              { label: "Uptime", value: "99.9%" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-semibold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-white mb-4">Start with one report</h2>
          <p className="text-lg text-slate-300 mb-8">
            A fast, transparent way to make roads safer for everyone.
          </p>
          <button
            onClick={() => nav("/login")}
            className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            Login to Hazoo.ai
          </button>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">
            <span className="font-semibold text-white">Hazoo.ai</span> - Intelligent Road Safety Solution
          </p>
          <p className="text-sm">
            © 2025 Hazoo.ai. All rights reserved. | Uyir Hackathon Best Project Award
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
