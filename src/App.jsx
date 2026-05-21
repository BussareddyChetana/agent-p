import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Calls from "./pages/Calls";
import Analytics from "./pages/Analytics";
import Agent from "./pages/Agent";
import Settings from "./pages/Settings";

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-[#060B14] text-white min-h-screen">

      {/* Sidebar */}

      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Topbar */}

        <Topbar setOpen={setOpen} />

        {/* Routes */}

        <main className="flex-1 p-6 overflow-y-auto">

          <Routes>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/campaigns"
              element={<Campaigns />}
            />

            <Route
              path="/calls"
              element={<Calls />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/agent"
              element={<Agent />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            {/* Default Route */}

            <Route
              path="*"
              element={<Navigate to="/dashboard" />}
            />

          </Routes>

        </main>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0d1520",
            color: "#e2e8f0",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: "12px",
          },
        }}
      />

      <Layout />

    </BrowserRouter>
  );
}