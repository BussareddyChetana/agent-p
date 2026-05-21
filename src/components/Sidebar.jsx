import {
  LayoutDashboard,
  Megaphone,
  Phone,
  BarChart3,
  Settings,
  Bot,
  X,
  Radio,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { name:"Dashboard", path:"/dashboard", icon:<LayoutDashboard size={18}/> },
  { name:"Campaigns", path:"/campaigns", icon:<Megaphone size={18}/> },
  { name:"Calls", path:"/calls", icon:<Phone size={18}/> },
  { name:"Analytics", path:"/analytics", icon:<BarChart3 size={18}/> },
  { name:"AI Agent", path:"/agent", icon:<Bot size={18}/> },
  { name:"Settings", path:"/settings", icon:<Settings size={18}/> },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static z-50 top-0 left-0 h-screen w-64 flex flex-col
        bg-[#090f1a] border-r border-white/[0.06] transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >

        {/* Logo */}

        <div className="flex items-center justify-between px-6 py-6 border-b border-white/[0.06]">

          <div>
            
            <h1 className="text-2xl font-bold tracking-tight text-[#00d4ff]">
             AI AGENT
            </h1>
            <p className="text-[10px] text-slate-500 mt-0.5 tracking-widest uppercase">
            Election Campaign Dashboard
            </p>
          </div>

          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X size={18}/>
          </button>

        </div>

        {/* Nav */}

        <nav className="flex-1 px-3 mt-5 space-y-1">

          {NAV_LINKS.map((l) => (

            <NavLink
              key={l.name}
              to={l.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`
              }
            >
              {l.icon}
              {l.name}
            </NavLink>

          ))}

        </nav>

        {/* User */}

        <div className="px-4 py-4 border-t border-white/[0.06]">

          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03]">

            <img
              src="https://i.pravatar.cc/32"
              className="w-8 h-8 rounded-full ring-2 ring-[#00d4ff]/30"
              alt=""
            />

            <div className="flex-1 min-w-0">

              <p className="text-sm font-semibold text-white">
                Admin
              </p>

              <p className="text-[10px] text-slate-500">
                Campaign Manager
              </p>

            </div>

            <Radio size={14} className="text-emerald-400 shrink-0"/>

          </div>

        </div>

      </div>
    </>
  );
}