import {
  Menu,
  Search,
  Bell,
} from "lucide-react";

export default function Topbar({ setOpen }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-white/[0.06] bg-[#090f1a]/80 backdrop-blur-xl shrink-0">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button
          className="lg:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(true)}
        >
          <Menu size={20}/>
        </button>

        {/* Search */}

        <div className="hidden md:flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-xl w-72">

          <Search
            size={15}
            className="text-slate-500 shrink-0"
          />

          <input
            type="text"
            placeholder="Search campaigns, calls..."
            className="bg-transparent outline-none text-sm text-slate-300 placeholder-slate-600 w-full"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Notification */}

        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors">

          <Bell
            size={16}
            className="text-slate-400"
          />

          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#00d4ff] rounded-full"/>

        </button>

        {/* User */}

        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-3 py-2 rounded-xl">

          <img
            src="https://i.pravatar.cc/32"
            className="w-7 h-7 rounded-full"
            alt=""
          />

          <div className="hidden sm:block">

            <p className="text-xs font-semibold leading-tight">
              Admin
            </p>

            <p className="text-[10px] text-slate-500 leading-tight">
              Campaign Manager
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}