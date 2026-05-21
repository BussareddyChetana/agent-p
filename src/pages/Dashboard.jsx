import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import StatCard, {
  CustomBar,
  TooltipStyle,
} from "../components/StatCard";

import {
  CALLS_DATA,
  sentimentData,
  barData,
  SENT_COLORS,
  STATUS_BADGE,
} from "../data/data";

export default function Dashboard() {
const navigate = useNavigate();
const recentCalls = CALLS_DATA.slice(0,4).map(c=>({...c}));
return (
<div className="space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h1 className="text-2xl font-bold text-white">Dashboard</h1>
<p className="text-sm text-slate-500 mt-0.5">Campaign overview & live monitoring</p>
</div>
<div className="flex gap-3">
<button onClick={()=>navigate("/campaigns")}
className="px-4 py-2 text-sm rounded-xl border border-white/10 text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">
+ New Campaign
</button>
<button onClick={()=>navigate("/agent")}
className="px-4 py-2 text-sm rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-all flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse"/>Live Monitor
</button>
</div>
</div>
{/* Stats */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
<StatCard title="Total Calls" value="12,540" sub="↑ 8% this week" accent="#00d4ff" icon="📞"/>
<StatCard title="Active Campaigns" value="18" sub="3 starting today" accent="#7c3aed" icon="📡"/>
<StatCard title="Answered Calls" value="9,840" sub="78% connect rate" accent="#10b981" icon="✅"/>
<StatCard title="Avg Duration" value="2m 45s" sub="Per connected call" accent="#f59e0b" icon="⏱️"/>
</div>
{/* Charts */}
<div className="grid lg:grid-cols-2 gap-6">
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<h2 className="text-base font-semibold text-white mb-4">Live Sentiment Analysis</h2>
<div className="flex items-center gap-6">
<ResponsiveContainer width="100%" height={200}>
<PieChart>
<Pie data={sentimentData} dataKey="value" outerRadius={80} innerRadius={45} paddingAngle={3} label={false}>
{sentimentData.map((_,i)=><Cell key={i} fill={SENT_COLORS[i]}/>)}
</Pie>
<Tooltip {...TooltipStyle} formatter={(v,n)=>[`${v}%`,n]}/>
</PieChart>
</ResponsiveContainer>
<div className="space-y-3 shrink-0">
{sentimentData.map((d,i)=>(
<div key={d.name} className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full shrink-0" style={{background:SENT_COLORS[i]}}/>
<div>
<p className="text-xs text-slate-300">{d.name}</p>
<p className="text-xs font-bold" style={{color:SENT_COLORS[i]}}>{d.value}%</p>
</div>
</div>
))}
</div>
</div>
</div>
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<h2 className="text-base font-semibold text-white mb-4">Top Public Issues</h2>
<ResponsiveContainer width="100%" height={200}>
<BarChart data={barData} barSize={32}>
<XAxis dataKey="name" stroke="#475569" tick={{fontSize:11}}/>
<YAxis stroke="#475569" tick={{fontSize:11}}/>
<Tooltip {...TooltipStyle} cursor={{fill:"rgba(255,255,255,0.03)"}}/>
<Bar dataKey="value" shape={<CustomBar/>} label={{position:"top",fill:"#94a3b8",fontSize:10}}/>
</BarChart>
</ResponsiveContainer>
</div>
</div>
{/* Progress + Recent */}
<div className="grid lg:grid-cols-3 gap-6">
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<div className="flex items-center justify-between mb-3">
<h2 className="text-base font-semibold text-white">Campaign Progress</h2>
<span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">LIVE</span>
</div>
<p className="text-xs text-slate-400 mb-3">Election Awareness Drive</p>
<div className="grid grid-cols-2 gap-3 mb-4">
{[{l:"Called",v:"9,840",c:"#00d4ff"},{l:"Completed",v:"7,200",c:"#10b981"},{l:"Failed",v:"2,640",c:"#ef4444"},{l:"Remaining",v:"2,700",c:"#f59e0b"}].map(s=>(
<div key={s.l} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
<p className="text-lg font-bold" style={{color:s.c}}>{s.v}</p>
<p className="text-[10px] text-slate-500 mt-0.5">{s.l}</p>
</div>
))}
</div>
<div className="h-2 rounded-full bg-white/[0.06]">
<div className="h-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-violet-500" style={{width:"78%"}}/>
</div>
<p className="text-[10px] text-slate-500 mt-1.5 text-right">78% — 9,840 / 12,540</p>
</div>
<div className="lg:col-span-2 bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<div className="flex items-center justify-between mb-4">
<h2 className="text-base font-semibold text-white">Recent Calls</h2>
<button onClick={()=>navigate("/calls")} className="text-xs text-[#00d4ff] hover:underline">View All →</button>
</div>
<table className="w-full">
<thead>
<tr className="border-b border-white/[0.06]">
{["Name","Status","Sentiment","Time"].map(h=>(
<th key={h} className="pb-3 text-left text-[10px] tracking-widest text-slate-500 uppercase font-semibold px-2">{h}</th>
))}
</tr>
</thead>
<tbody>
{recentCalls.map((c,i)=>(
<motion.tr key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.07}}
className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
<td className="py-3 px-2 text-sm font-medium text-white">{c.name}</td>
<td className="py-3 px-2"><span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${STATUS_BADGE[c.status]||"text-slate-400"}`}>{c.status}</span></td>
<td className={`py-3 px-2 text-sm font-semibold ${c.sentiment==="Supporter"?"text-emerald-400":c.sentiment==="Opposed"?"text-red-400":c.sentiment==="Neutral"?"text-amber-400":"text-slate-500"}`}>{c.sentiment}</td>
<td className="py-3 px-2 text-xs text-slate-500">{c.date}</td>
</motion.tr>
))}
</tbody>
</table>
</div>
</div>
</div>
);
}