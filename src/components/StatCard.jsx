import { useState } from "react";

import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
} from "lucide-react";

const BAR_COLORS = [
  "#00d4ff",
  "#7c3aed",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export default function StatCard({
  title,
  value,
  sub,
  accent,
  icon,
}) {
  return (
    <motion.div
      initial={{ opacity:0, y:16 }}
      animate={{ opacity:1, y:0 }}
      whileHover={{ y:-3 }}
      className="relative bg-[#0d1520] border border-white/[0.07] rounded-2xl p-5 overflow-hidden group"
    >

      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
        style={{ background:accent }}
      />

      <div className="relative">

        <div className="flex items-center justify-between mb-3">

          <span className="text-xl">
            {icon}
          </span>

          <div
            className="h-0.5 w-8 rounded-full"
            style={{ background:accent }}
          />

        </div>

        <p className="text-3xl font-bold text-white tracking-tight">
          {value}
        </p>

        <p className="text-xs text-slate-500 mt-1">
          {title}
        </p>

        {sub && (
          <p
            className="text-[10px] mt-1.5 font-semibold"
            style={{ color:accent }}
          >
            {sub}
          </p>
        )}

      </div>

    </motion.div>
  );
}

/* Toggle */

export function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
        checked ? "bg-[#00d4ff]" : "bg-white/10"
      }`}
    >

      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />

    </button>
  );
}

/* Password Field */

export function PasswordField({
  label,
  value,
  onChange,
  placeholder,
}) {

  const [show, setShow] = useState(false);

  return (
    <div>

      <label className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold block mb-1.5">
        {label}
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-xl outline-none text-sm text-white placeholder-slate-600 focus:border-[#00d4ff]/40 transition-colors"
        />

        <button
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
        >

          {show ? (
            <EyeOff size={14}/>
          ) : (
            <Eye size={14}/>
          )}

        </button>

      </div>

    </div>
  );
}

/* Input Field */

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {

  return (
    <div>

      <label className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold block mb-1.5">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-xl outline-none text-sm text-white placeholder-slate-600 focus:border-[#00d4ff]/40 transition-colors"
      />

    </div>
  );
}

/* Custom Bar */

export const CustomBar = (props) => {

  const {
    x,
    y,
    width,
    height,
    index,
  } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={6}
      fill={BAR_COLORS[index % BAR_COLORS.length]}
      fillOpacity={0.85}
    />
  );
};

/* Tooltip */

export const TooltipStyle = {
  contentStyle: {
    background:"#0d1520",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"10px",
  },
};